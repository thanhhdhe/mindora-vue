---
name: build-ar-page
description: 'Build and optimize a Vue + MindAR + A-Frame AR page with start modal, camera permission, marker-based video playback, immersive mode, and jitter reduction. Use for web AR pages similar to Mindora ArPage.'
argument-hint: 'target-count=<number> videos=<path1,path2> marker-db=<path>'
user-invocable: true
---

# Build AR Page (Vue + MindAR + A-Frame)

## What This Skill Does
This skill provides a repeatable workflow to build an AR page that:
- shows a start modal before camera access
- requests camera permission only after user interaction
- tracks image targets with MindAR
- plays mapped video content on target found
- reduces jitter during scan by smoothing tracking and debouncing playback events
- supports immersive mode (hide global header/footer while AR is active)
- cleans up properly on route change/unmount

## When to Use
Use this skill when you need to:
- create a new AR page in a Vue app
- migrate from static AR UI to functional tracking + media playback
- fix stutter/flicker caused by rapid targetFound/targetLost events
- implement mobile-safe autoplay behavior for AR video

## Inputs To Confirm Before Coding
1. AR runtime stack: `A-Frame + MindAR` from CDN or npm package.
2. Marker database path (example: `/targets.mind`).
3. Video assets list and mapping rule:
- explicit map (targetIndex -> file)
- fallback map (modulo over a short list)
4. UX rules:
- start modal content and CTA
- whether to hide global header/footer in AR mode

## Prerequisites
- `index.html` includes required scripts if using CDN:
- A-Frame
- MindAR image A-Frame build
- (optional) aframe-extras
- Vue compiler treats `a-*` tags as custom elements in `vite.config.js`.
- Marker database is present in `public/` and reachable by URL.

## Procedure

### 1. Prepare AR Component Skeleton
In page component (example: `src/components/ArPage.vue`):
- add refs for UI and media state:
- `showPopup`, `hasStarted`, `isStarting`, `errorMessage`
- `videoRef`, `sceneRef`, `canPlayHandler`
- add constants:
- `TARGET_COUNT`
- `TARGET_LOST_GRACE_MS`
- `SOURCE_SWITCH_COOLDOWN_MS`

### 2. Add Start Flow (Permission Gate)
Implement `startAR()`:
1. guard against double click while starting
2. call `navigator.mediaDevices.getUserMedia({ video: true, audio: false })`
3. stop temp stream tracks immediately (permission preflight)
4. set started flags and hide popup
5. load video element after `nextTick()`
6. on failure, show user-facing error text

Why: user gesture is required for stable autoplay behavior on mobile Safari/Chrome.

### 3. Build A-Frame Scene Template
Use:
- `<a-scene mindar-image="..." embedded ...>`
- `<a-assets><video id="main-video" ... /></a-assets>`
- `<a-camera ... />`
- repeated `<a-entity :mindar-image-target="targetIndex: ...">`
- event bindings:
- `@targetFound="..."`
- `@targetLost="..."`

Recommended MindAR tuning in `mindar-image`:
- `missTolerance`
- `filterMinCF`
- `filterBeta`

These reduce tracking noise and event flapping.

### 4. Implement Video Mapping
Use one of two patterns:

1. Explicit mapping:
```js
const map = {
  0: 'xx.mp4',
  1: 'xxx.mp4'
}
const nextSrc = map[targetIndex] ?? 'xxx.mp4'
```

2. Fallback mapping (short list):
```js
const videos = ['xx.mp4', 'xxx.mp4']
const nextSrc = videos[Math.abs(targetIndex) % videos.length]
```

### 5. Reduce Playback Jitter (Critical)
In `onTargetFound`:
- cancel pending lost timer
- avoid switching source too frequently with cooldown
- skip reload if source is already active
- only call `video.play()` when paused

In `onTargetLost`:
- do not pause immediately
- start a short grace timer (example: 350-700 ms)
- if target returns quickly, cancel timer and continue playback

Why: marker confidence may oscillate frame-to-frame; immediate pause/reset causes visible stutter.


### 7. Cleanup On Unmount
In `onBeforeUnmount`:
- clear canplay listener
- clear lost timer
- pause video
- clear source if needed
- stop MindAR system if available
- restore hidden app shell state

## Validation Checklist
1. `npm run build` passes.
2. Start modal appears; no camera prompt before click.
3. Click start -> camera prompt appears.
4. Target found -> correct video plays.
5. Brief target loss does not immediately stutter/pause.
6. Sustained target loss pauses playback gracefully.
7. Route leave/return works without leaked listeners or frozen camera.
8. Mobile test (iOS + Android): autoplay and audio behavior are acceptable.

## Common Issues And Fixes
- Unknown custom element `a-scene`:
- configure Vue compiler `isCustomElement: tag => tag.startsWith('a-')`.

- 404 marker database:
- verify URL path from `public/` output (`/targets.mind` vs `/ar/targets.mind`).

- Video restarts too often:
- increase `TARGET_LOST_GRACE_MS`
- increase `SOURCE_SWITCH_COOLDOWN_MS`
- keep source stable unless actually changed.

- Audio blocked after play:
- keep video muted at first play and unmute only after confirmed user interaction.

## Mindora Reference Targets
- page component: `src/components/ArPage.vue`
- shell layout with global header/footer: `src/App.vue`
- marker database: `public/targets.mind`
- sample videos: `public/ar/solar_system.mp4`, `public/ar/life_of_butterfly.mp4`
- custom element compiler config: `vite.config.js`
