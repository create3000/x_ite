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
   overflow: scroll;
   background-color: var(--list-color);
   padding: 1rem;
}

.viewer-column2 div {
   color: var(--h2-color);
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

#options i {
   cursor: pointer;
}

#options label {
   cursor: pointer;
   margin: 0;
   padding-left: 0.5rem;
}

#animations {
   display: none;
}
</style>

<script defer src="/x_ite/assets/js/gltf-sample-viewer.js"></script>

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
            <br>
            <i id="ibl" class="fa-regular fa-circle"></i><label for="ibl">Image Based Lighting</label>
            <br>
            <i id="headlight" class="fa-regular fa-circle"></i><label for="headlight">Headlight</label>
         </div>
         <div id="animations"></div>
      </div>
   </div>
   <div class="viewer-column2"></div>
</div>
