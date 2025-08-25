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
     --list-color: rgba(0, 0, 0, 0.1);
  }

  html[data-mode=light] {
    --list-color: rgba(0, 0, 0, 0.02);
  }
}

@media (prefers-color-scheme: light) {
  html[data-mode=dark] {
    --list-color: rgba(0, 0, 0, 0.1);
  }

  html:not([data-mode]), html[data-mode=light] {
    --list-color: rgba(0, 0, 0, 0.02);
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
  -ms-user-select: none; /* IE 10 and IE 11 */
  -webkit-user-select: none; /* Safari */
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
  -ms-user-select: auto; /* IE 10 and IE 11 */
  -webkit-user-select: auto; /* Safari */
  user-select: auto;
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
    <x3d-canvas class="xr-button-tr" debug="true" contentScale="auto" update="auto" toneMapping="KHR_PBR_NEUTRAL">
      <X3D profile='Interchange' version='4.0'>
        <head>
          <component name='Scripting' level='1'></component>
          <component name='Text' level='1'></component>
        </head>
        <Scene>
          <ProtoDeclare name='ColorScheme'>
            <ProtoInterface>
              <field accessType='outputOnly' type='SFBool' name='light'></field>
              <field accessType='outputOnly' type='SFBool' name='dark'></field>
            </ProtoInterface>
            <ProtoBody>
              <Script type='model/x3d+xml' DEF='ColorSchemeScript'>
                <field accessType='outputOnly' type='SFBool' name='light'></field>
                <field accessType='outputOnly' type='SFBool' name='dark'></field>
                <IS>
                  <connect nodeField='light' protoField='light'></connect>
                  <connect nodeField='dark' protoField='dark'></connect>
                </IS>
<![CDATA[ecmascript:

function initialize ()
{
   const colorScheme = window .matchMedia ("(prefers-color-scheme: light)");

   colorScheme .addEventListener ("change", event => changeColorScheme (event));

   changeColorScheme (colorScheme);
}

function changeColorScheme (event)
{
   light = event .matches;

   if (typeof $ !== "undefined")
   {
      if ($("html") .attr ("data-mode") === "light")
         light = true;

      if ($("html") .attr ("data-mode") === "dark")
         light = false;
   }

   dark = !light;
}
]]>
              </Script>
            </ProtoBody>
          </ProtoDeclare>
          <ProtoInstance name='ColorScheme' DEF='_1'></ProtoInstance>
          <Background DEF='White'
              skyColor='1 1 1'></Background>
          <Background DEF='Black'></Background>
          <Shape DEF='Light'
              visible='false'>
            <Appearance>
              <UnlitMaterial
                  emissiveColor='0 0 0'></UnlitMaterial>
            </Appearance>
            <Text DEF='_2'
                string='"glTF Sample Viewer"'>
              <FontStyle
                  justify='"MIDDLE", "MIDDLE"'></FontStyle>
            </Text>
          </Shape>
          <Shape DEF='Dark'>
            <Text USE='_2'></Text>
          </Shape>
          <ROUTE fromNode='_1' fromField='light' toNode='Light' toField='set_visible'></ROUTE>
          <ROUTE fromNode='_1' fromField='light' toNode='White' toField='set_bind'></ROUTE>
          <ROUTE fromNode='_1' fromField='dark' toNode='Dark' toField='set_visible'></ROUTE>
          <ROUTE fromNode='_1' fromField='dark' toNode='Black' toField='set_bind'></ROUTE>
        </Scene>
      </X3D>
    </x3d-canvas>
    <div id="options">
      <div id="lighting">
        <b>Image Based Lighting</b>
        <select id="ibl" class="select">
          <option value="" selected>None</option>
          <option value="cannon-exterior:2">Cannon Exterior</option>
          <option value="helipad:1">Helipad Goldenhour</option>
          <option value="footprint-court:1">Footprint Court</option>
        </select>
        <button class="check" for="headlight"><i id="headlight" class="fa-solid fa-xmark"></i>Headlight</button>
      </div>
      <div>
        <b>Tone Mapping</b>
        <select id="tone-mapping" class="select">
          <option value="KHR_PBR_NEUTRAL">KHR PBR Neutral</option>
          <option value="ACES_HILL_EXPOSURE_BOOST">ACES Hill Exposure Boost</option>
          <option value="ACES_HILL">ACES Hill</option>
          <option value="ACES_NARKOWICZ">ACES Narkowicz</option>
          <option value="NONE" selected>None</option>
        </select>
        <button class="check" for="exposure"><span class="reset">Exposure</span> <input id="exposure" class="range" type="range" min="0" max="5" step="0.01" value="1"></button>
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
