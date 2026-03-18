/**
 * Mindora PreOrder form endpoint for Google Apps Script.
 *
 * Deploy this project as a Web App and use the /exec URL
 * as VITE_GOOGLE_APPS_SCRIPT_URL in the frontend.
 */

const DEFAULT_SHEET_NAME = 'PreOrders'
const REQUIRED_FIELDS = ['name', 'email', 'phone']

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'mindora-preorder-form',
    timestamp: new Date().toISOString()
  })
}

function doPost(e) {
  try {
    const payload = parsePayload_(e)
    const normalized = normalizePayload_(payload)

    validatePayload_(normalized)

    const sheet = getTargetSheet_()
    ensureHeaderRow_(sheet)

    sheet.appendRow([
      new Date(),
      normalized.name,
      normalized.email,
      normalized.phone,
      normalized.message,
      normalized.source,
      normalized.submittedAt,
      JSON.stringify(normalized.raw)
    ])

    return jsonResponse_({ ok: true, message: 'Saved' })
  } catch (error) {
    console.error('[doPost] error', error)
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : 'Unknown error'
    })
  }
}

/**
 * Optional helper: run once in Apps Script editor to set Script Properties.
 */
function setupScriptProperties() {
  PropertiesService.getScriptProperties().setProperties(
    {
      SPREADSHEET_ID: 'PASTE_SPREADSHEET_ID_HERE',
      SHEET_NAME: DEFAULT_SHEET_NAME
    },
    true
  )
}

function parsePayload_(e) {
  const params = e && e.parameter ? e.parameter : {}

  if (Object.keys(params).length > 0) {
    return params
  }

  const raw = e && e.postData && e.postData.contents ? e.postData.contents : ''

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw)
  } catch (error) {
    const parsed = {}

    raw.split('&').forEach((pair) => {
      if (!pair) {
        return
      }

      const [rawKey, rawValue = ''] = pair.split('=')

      if (!rawKey) {
        return
      }

      const key = decodeURIComponent(rawKey)
      const value = decodeURIComponent(rawValue.replace(/\+/g, ' '))
      parsed[key] = value
    })

    return parsed
  }
}

function normalizePayload_(payload) {
  return {
    name: cleanString_(payload.name),
    email: cleanString_(payload.email),
    phone: cleanString_(payload.phone),
    message: cleanString_(payload.message),
    source: cleanString_(payload.source) || 'mindora-preorder-form',
    submittedAt: cleanString_(payload.submittedAt) || new Date().toISOString(),
    raw: payload
  }
}

function validatePayload_(data) {
  REQUIRED_FIELDS.forEach((field) => {
    if (!data[field]) {
      throw new Error('Missing required field: ' + field)
    }
  })

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(data.email)) {
    throw new Error('Invalid email format')
  }
}

function getTargetSheet_() {
  const props = PropertiesService.getScriptProperties()
  const spreadsheetId = cleanString_(props.getProperty('SPREADSHEET_ID'))
  const sheetName = cleanString_(props.getProperty('SHEET_NAME')) || DEFAULT_SHEET_NAME

  let spreadsheet

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  }

  if (!spreadsheet) {
    throw new Error('Cannot find spreadsheet. Set SPREADSHEET_ID in Script Properties.')
  }

  let sheet = spreadsheet.getSheetByName(sheetName)

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName)
  }

  return sheet
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) {
    return
  }

  sheet.appendRow([
    'receivedAt',
    'name',
    'email',
    'phone',
    'message',
    'source',
    'submittedAt',
    'rawPayload'
  ])
}

function cleanString_(value) {
  return String(value || '').trim()
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}
