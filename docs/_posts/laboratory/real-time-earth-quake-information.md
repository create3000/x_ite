---
title: Real Time Earth Quake Information
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [Real Time, Earth Quake, Laboratory]
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

.viewer-column-70 {
   flex: 70%;
   width: 70%;
   height: 100%;
}

.viewer-column-30 {
   flex: 30%;
   width: 30%;
   height: 100%;
   padding-left: 2rem;
}

.quakes {
   height: 100%;
   overflow: hidden;
}

.quakes p {
   padding-right: 1rem;
}

.locations {
   height: calc(100% - 4rem);
}

.link-list {
   overflow-y: scroll;
   height: 100%;
   user-select: none;
}

x3d-canvas {
   display: block;
   width: 100%;
   height: 100%;
   aspect-ratio: unset;
}
</style>

<script type="module" src="/x_ite/assets/laboratory/earthquakes/earthquakes.mjs"></script>

<p>This page uses data from the <a href="https://earthquake.usgs.gov" target="_blank">USGS Earthquakes Hazards Program (EHP)</a> to provide real-time earthquake information.</p>

<div class="viewer">
   <div class="viewer-row">
      <div class="viewer-column-70"><x3d-canvas src="/x_ite/assets/laboratory/earthquakes/earthquakes.x3d" splashScreen="false"></x3d-canvas></div>
      <div class="viewer-column-30">
         <div class="quakes">
            <p>
               <select id="time" class="select">
                  <option value="3">Past 30 Days</option>
                  <option value="2">Past 7 Days</option>
                  <option value="1" selected>Past Day</option>
                  <option value="0">Past Hour</option>
               </select>
            </p>
            <div class="locations"></div>
         </div>
      </div>
   </div>
</div>
