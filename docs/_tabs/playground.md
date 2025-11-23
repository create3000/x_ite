---
title: Playground
date: 2022-11-28
layout: wide
icon: fas fa-rocket
order: 4
monaco: true
---
<style>
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block);
@import url(https://cdn.jsdelivr.net/npm/material-icons@1.13.14/iconfont/material-icons.min.css);

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.material-symbols-outlined,
.material-icons {
  font-size: 21px;
  position: relative;
  top: 5px;
}

/* Table */
.playground {
  box-sizing: border-box;
  height: 100%;
  height: calc(100vh - 128px);
}

.toolbar {
  overflow: hidden;
  padding: 0 2rem;
  height: 30px;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.toolbar button:not(:first-child) {
  padding-left: 0.4rem;
}

.toolbar button:not(:last-child) {
  padding-right: 0.4rem;
}

.toolbar span.dot::before {
  content: "·";
  margin: 0 3px 0 4px;
  color: var(--text-color);
}

.toolbar span.separator {
  border-left: 1px solid var(--text-color);
  margin: 0 5px 0 10px;
}

.toolbar span.separator + span.separator {
  display: none;
}

.viewer-row {
  display: flex;
  height: calc(100% - 30px);
  border-top: 1px solid var(--main-border-color);
}

.viewer-column {
  flex: 50%;
  width: 50%;
  height: 100%;
}

/* Editor */

#editor, .console {
  position: relative; /* fix monaco tooltips */
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  white-space: pre;
}

.content x3d-canvas, x3d-canvas {
  display: block;
  width: 100%;
  height: 50%;
  aspect-ratio: unset;
}

/* Console */

.console {
  overflow: scroll;
  background: var(--system-gray7);
  height: 50%;
  padding: 0.5rem;
}

.console p {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  margin: 0;
  padding: 1px 2px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-family: monospace;
  font-size: 8pt;
}

.console p:where(.warn, .error):before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  display: block;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.console p:first-child {
  margin-top: 0px;
}

.console .info {
  color: var(--system-blue);
}

.console p.warn {
  border-top: 1px solid var(--system-yellow);
  border-bottom: 1px solid var(--system-yellow);
  color: black;
}

.console p.warn:before {
  background-color: color-mix(in srgb, color-mix(in srgb, var(--system-yellow), white 50%), transparent 30%);
}

.console p.error {
  border-top: 1px solid var(--system-red);
  border-bottom: 1px solid var(--system-red);
  color: black;
}

.console p.error:before {
  background-color: color-mix(in srgb, color-mix(in srgb, var(--system-red), white 50%), transparent 30%);
}

.console p.warn:has(+ p.warn),
.console p.error:has(+ p.error) {
  border-bottom: none;
}

.console p.warn + p.warn,
.console p.error + p.error {
  border-top: none;
}

.console p.warn:not(:has(+ p.warn)),
.console p.error:not(:has(+ p.error)) {
  margin-bottom: 2px;
}

.console p.splitter {
  margin: 5px 0px;
  border-top: 1px solid var(--system-gray3);
  padding: 0px;
}

.console p.splitter:first-child {
  display: none;
}
</style>

<!-- Also change version in playground.js! -->
<script type="module" src="../assets/playground/playground.mjs"></script>

<div class="playground">
  <div class="toolbar"></div>
  <div class="viewer-row">
     <div class="viewer-column1 viewer-column">
       <x3d-canvas splashScreen="false" debug="true" contentScale="auto" xrSessionMode="IMMERSIVE_AR"></x3d-canvas>
       <div class="console"></div>
     </div>
     <div class="viewer-column2 viewer-column"><div id="editor"></div></div>
  </div>
</div>
