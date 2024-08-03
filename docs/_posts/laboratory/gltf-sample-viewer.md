---
title: glTF Sample Viewer
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [glTF, Sample, Viewer, Laboratory]
---
<style>
/* Viewer */

@media (prefers-color-scheme: dark) {
	html:not([data-mode]), html[data-mode=dark] {
	 	--list-color: rgba(0, 0, 0, 0.3);
	}

	html[data-mode=light] {
		--list-color: rgba(0, 0, 0, 0.03);
   }
}

@media (prefers-color-scheme: light) {
	html[data-mode=dark] {
		--list-color: rgba(0, 0, 0, 0.3);
   }

   html:not([data-mode]), html[data-mode=light] {
      --list-color: rgba(0, 0, 0, 0.03);
   }
}

.viewer-row {
   display: flex;
   height: calc(100vh - 128px);
}

.viewer-column1 {
   position: relative;
   flex: 80%;
   width: 80%;
   height: 100%;
}

.viewer-column2 {
   flex: 20%;
   width: 20%;
   height: 100%;
   overflow-y: scroll;
   background-color: var(--list-color);
   padding: 1rem;
}

x3d-canvas {
   display: block;
   width: 100%;
   height: 100%;
   aspect-ratio: unset;
}

#options {
   -webkit-user-select: none; /* Safari */
   -ms-user-select: none; /* IE 10 and IE 11 */
   user-select: none;
   position: absolute;
   right: 5px;
   bottom: 5px;
   min-width: 200px;
   padding: 10px 20px;
   background-color: var(--main-bg);
   border: 1px solid var(--nav-border-color);
   border-radius: 0.8rem;
}

#options b {
   display: block;
}

#options button {
   display: block;
}

#scenes,
#animations {
   display: none;
}
</style>

<script type="module" src="/x_ite/assets/laboratory/gltf-sample-viewer/gltf-sample-viewer.mjs"></script>

<div class="viewer viewer-row">
   <div class="viewer-column1">
      <x3d-canvas>
         <X3D profile='Interchange' version='4.0'>
            <head>
               <component name='Text' level='1'></component>
            </head>
            <Scene>
               <Shape>
                  <Text string='"glTF Sample Viewer"'>
                     <FontStyle justify='"MIDDLE", "MIDDLE"'></FontStyle>
                  </Text>
               </Shape>
            </Scene>
         </X3D>
      </x3d-canvas>
      <div id="options">
         <div id="lighting">
            <b>Lighting</b>
            <button class="check" for="ibl"><i id="ibl" class="fa-solid fa-xmark"></i>Image Based Lighting</button>
            <button class="check" for="headlight"><i id="headlight" class="fa-solid fa-xmark"></i>Headlight</button>
         </div>
         <div>
            <b>Tone Mapping</b>
            <button class="check" for="exposure"><span class="reset">Exposure</span> <input id="exposure" class="range" type="range" min="0" max="5" step="0.01" value="1"></button>
            <select id="tone-mapping" class="select">
               <option value="KHR_PBR_NEUTRAL">KHR PBR Neutral</option>
               <option value="ACES_HILL_EXPOSURE_BOOST">ACES Hill Exposure Boost</option>
               <option value="ACES_HILL">ACES Hill</option>
               <option value="ACES_NARKOWICZ">ACES Narkowicz</option>
               <option value="NONE" selected>None</option>
            </select>
         </div>
         <div id="background">
            <b>Background</b>
            <button class="check" for="summer"><i id="summer" class="fa-solid fa-xmark"></i>Show Background</button>
         </div>
         <div id="scenes"></div>
         <div id="viewpoints"></div>
         <div id="material-variants"></div>
         <div id="animations"></div>
      </div>
   </div>
   <div class="viewer-column2"></div>
</div>
