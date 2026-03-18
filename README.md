# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Google Apps Script Form Integration

The PreOrder form in [src/components/PreorderSection.vue](src/components/PreorderSection.vue) sends data to a Google Apps Script Web App endpoint.

Apps Script code template is available at [apps-script/Code.gs](apps-script/Code.gs).

### 1. Configure endpoint URL

Create `.env.local` from `.env.example` and set your Web App URL:

```bash
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec
```

### 2. Deploy Apps Script as Web App

1. Create a new Apps Script project.
2. Copy code from [apps-script/Code.gs](apps-script/Code.gs) into your Apps Script editor.
3. In Apps Script, open **Project Settings** > **Script properties** and set:

- `SPREADSHEET_ID`: your target Google Sheet ID
- `SHEET_NAME`: optional (default is `PreOrders`)

4. Deploy as **Web app**.
5. Set access to **Anyone** (or as required by your use case).
6. Copy the `/exec` URL into `VITE_GOOGLE_APPS_SCRIPT_URL`.

### 3. Payload fields sent by frontend

- `name`
- `email`
- `phone`
- `message`
- `source` (`mindora-preorder-form`)
- `submittedAt` (ISO datetime)

### 4. Quick Test

After deployment, open the Web App `/exec` URL in browser:
- if setup is correct, it returns a small JSON health response from `doGet()`.
