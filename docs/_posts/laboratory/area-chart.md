---
title: Area Chart
date: 2025-03-28
layout: wide
categories: [Laboratory]
tags: [Area Chart, Laboratory]
---
<style>
/* Paragraph */
article > p {
  padding: 0 2rem;
}

p {
  margin: 1rem 0;
}

/* Viewer */
.viewer {
  box-sizing: border-box;
  height: 100%;
  border-top: 1px solid var(--main-border-color);
  height: calc(100vh - 128px - 3.8rem);
}

.viewer-row {
  display: flex;
  height: 100%;
}

.viewer-column-100 {
  flex: 100%;
  width: 100%;
  height: 100%;
}

x3d-canvas {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: unset;
}
</style>

<script type="module" src="/x_ite/assets/laboratory/area-chart/area-chart.mjs"></script>

<p>This page automatically generates an area chart from a set of areas and heights. Try to <a id="rebuild" href="#">rebuild</a> this chart, or download <a download href="/x_ite/assets/laboratory/area-chart/area-chart.mjs">area-chart.mjs</a>.</p>

<div class="viewer">
  <div class="viewer-row">
    <div class="viewer-column-100"><x3d-canvas id="chart" splashScreen="false"></x3d-canvas></div>
  </div>
</div>
