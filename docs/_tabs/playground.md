---
title: Playground
date: 2022-11-28
layout: wide
icon: fas fa-rocket
order: 4
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
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  white-space: pre;
}

.monaco-editor,
.monaco-editor .margin,
.monaco-editor-background,
canvas.minimap-decorations-layer {
  outline: none;
  background-color: inherit;
}

.console {
  background: var(--playground-console-background);
  padding: 0.5rem;
  height: 50%;
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
}

span.info {
  color: var(--system-blue);
}

span.warn {
  color: var(--system-yellow);
}

span.error {
  color: var(--system-red);
}
</style>

<!-- Also change version in playground.js! -->
<script defer src="https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs/loader.js"></script>
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
