---
title: glTF Sample Viewer
date: 2023-02-21
layout: wide
categories: [Laboratory]
tags: [glTF, Sample, Viewer, Laboratory]
---
<style>
#topbar-wrapper {
   border-bottom: 1px solid var(--main-border-color);
}

.row {
   margin: 0 !important;
}

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

@media all and (max-width: 849px)
{
   .viewer {
      border-bottom: 1px solid var(--main-border-color);
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

#animations {
   display: none;
   position: absolute;
   right: 0;
   bottom: 5px;
   min-width: 200px;
   padding: 10px 20px;
   background-color: var(--main-bg);
   border-bottom: 5px solid var(--text-color);
}

#animations label {
   margin: 0;
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
      <div id="animations"></div>
   </div>
   <div class="viewer-column2"></div>
</div>
