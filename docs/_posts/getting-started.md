---
title: Getting Started
date: 2022-11-28
nav: main
categories: []
tags: [Getting Started]
permalink: /
---
[![npm Version](https://badgen.net/npm/v/x_ite)](https://www.npmjs.com/package/x_ite){: .badge-link }
[![Build Size](/assets/img/badges/compressed.svg)](/x_ite/features/){: .badge-link }
[![jsDelivr Hits](https://badgen.net/jsdelivr/hits/npm/x_ite)](https://www.jsdelivr.com/package/npm/x_ite){: .badge-link }
[![npm Downloads](https://badgen.net/npm/dm/x_ite)](https://npmtrends.com/x_ite){: .badge-link }
[![DeepScan grade](https://deepscan.io/api/teams/23540/projects/26814/branches/855447/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23540&pid=26814&bid=855447){: .badge-link }

<x3d-canvas
    class="teaser"
    src="/x_ite/assets/teaser/pluto/pluto.x3d"
    update="auto"
    splashScreen="false"
    contextMenu="false"
    notifications="false"
    timings="false"
    contentScale="auto"
    xrSessionMode="NONE">
</x3d-canvas>
<div class="mascot-wrapper">
  <x3d-canvas
      class="mascot"
      src="/x_ite/assets/teaser/pluto/palm.x3d"
      update="auto"
      splashScreen="false"
      contextMenu="false"
      notifications="false"
      timings="false"
      contentScale="auto"
      xrSessionMode="NONE"
      style="visibility: hidden;"
      oninitialized="this .style .visibility = 'visible';">
  </x3d-canvas>
</div>
Credits: [mqumboz](https://sketchfab.com/mqumboz) (Palm)
{: .small }

## Overview

X_ITE is a comprehensive 3D library entirely written in JavaScript and uses WebGL for 3D rendering. Authors can publish X3D, VRML, glTF and other 3D file formats online within an HTML5 page with X_ITE that works with web browsers **without** prior plug-in installation. This gives authors the ability to displays content in 3D, using WebGL 3D graphics technology to display X3D and glTF content in several different browsers across several different operating systems. Since X3D is backwardly compatible, X_ITE can also be used as a VRML viewer.

X3D is an ISO-ratified, royalty-free open standards file format and run-time architecture to represent and communicate 3D scenes and objects specified by the [Web3D® Consortium](https://www.web3d.org). X3D has evolved from its beginnings as the Virtual Reality Modeling Language (VRML) to the considerably more mature and refined ISO X3D standard. X3D provides a system for the storage, retrieval and playback of real time 3D scene in multiple applications, all within an open architecture to support a wide array of domains and user scenarios.

glTF (GL Transmission Format) is an open standard file format designed for efficient transmission and loading of 3D models in real-time applications, such as web and mobile platforms. It optimizes the storage and rendering of 3D assets, including geometry, textures, materials, and animations, while minimizing file sizes and loading times.

>**Tip:** If you ever run into trouble, please [report a bug or just ask a question](/x_ite/report-a-bug/).
{: .prompt-tip }

### Become a Patreon of X_ITE

Yeah, tell me!

X_ITE needs your support, with a small contribution you can make a big difference, or simply subscribe to receive the latest news.

[<i class="fa-solid fa-heart"></i> Support us on Patreon](https://patreon.com/X_ITE){: .patreon }

## X3D Examples

<script type="module" src="assets/js/examples.js"></script>

<table class="examples">
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Apartment/Apartment.x3d" title="X3D » Apartment" componentName="X3D" typeName="Apartment" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Apartment/screenshot-small.png" alt="Apartment" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Approach/Approach.x3d" title="X3D » Approach" componentName="X3D" typeName="Approach" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Approach/screenshot-small.png" alt="Approach" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Arcadia/Arcadia.x3d" title="X3D » Arcadia" componentName="X3D" typeName="Arcadia" doc="false" xrButtonPosition="bl"><img src="https://create3000.github.io/media/examples/X3D/Arcadia/screenshot-small.png" alt="Arcadia" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Astronomy/Astronomy.x3d" title="X3D » Astronomy" componentName="X3D" typeName="Astronomy" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Astronomy/screenshot-small.png" alt="Astronomy" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/BIC/BIC.x3d" title="X3D » BIC" componentName="X3D" typeName="BIC" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/BIC/screenshot-small.png" alt="BIC" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/BeyondGermany/BeyondGermany.x3d" title="X3D » BeyondGermany" componentName="X3D" typeName="BeyondGermany" doc="false" xrButtonPosition="tl"><img src="https://create3000.github.io/media/examples/X3D/BeyondGermany/screenshot-small.png" alt="BeyondGermany" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Capone/Capone.x3d" title="X3D » Capone" componentName="X3D" typeName="Capone" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Capone/screenshot-small.png" alt="Capone" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Chomp/Chomp.x3d" title="X3D » Chomp" componentName="X3D" typeName="Chomp" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Chomp/screenshot-small.png" alt="Chomp" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Circles/Circles.x3d" title="X3D » Circles" componentName="X3D" typeName="Circles" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Circles/screenshot-small.png" alt="Circles" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/CrazySpiral/CrazySpiral.x3d" title="X3D » CrazySpiral" componentName="X3D" typeName="CrazySpiral" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/CrazySpiral/screenshot-small.png" alt="CrazySpiral" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Currencies/Currencies.x3d" title="X3D » Currencies" componentName="X3D" typeName="Currencies" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Currencies/screenshot-small.png" alt="Currencies" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/FlashingLights/FlashingLights.x3d" title="X3D » FlashingLights" componentName="X3D" typeName="FlashingLights" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/FlashingLights/screenshot-small.png" alt="FlashingLights" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/FoldUp/FoldUp.x3d" title="X3D » FoldUp" componentName="X3D" typeName="FoldUp" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/FoldUp/screenshot-small.png" alt="FoldUp" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/LogoPieces/LogoPieces.x3d" title="X3D » LogoPieces" componentName="X3D" typeName="LogoPieces" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/LogoPieces/screenshot-small.png" alt="LogoPieces" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/LustForLife/LustForLife.x3d" title="X3D » LustForLife" componentName="X3D" typeName="LustForLife" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/LustForLife/screenshot-small.png" alt="LustForLife" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/MagicMushrooms/MagicMushrooms.x3d" title="X3D » MagicMushrooms" componentName="X3D" typeName="MagicMushrooms" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/MagicMushrooms/screenshot-small.png" alt="MagicMushrooms" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/MilkyWayAndBeyond/MilkyWayAndBeyond.x3d" title="X3D » MilkyWayAndBeyond" componentName="X3D" typeName="MilkyWayAndBeyond" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/MilkyWayAndBeyond/screenshot-small.png" alt="MilkyWayAndBeyond" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/NYC/NYC.x3d" title="X3D » NYC" componentName="X3D" typeName="NYC" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/NYC/screenshot-small.png" alt="NYC" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Pong/Pong.x3d" title="X3D » Pong" componentName="X3D" typeName="Pong" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Pong/screenshot-small.png" alt="Pong" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/SecretLabyrinth/SecretLabyrinth.x3d" title="X3D » SecretLabyrinth" componentName="X3D" typeName="SecretLabyrinth" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/SecretLabyrinth/screenshot-small.png" alt="SecretLabyrinth" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/SlidingPuzzle/SlidingPuzzle.x3d" title="X3D » SlidingPuzzle" componentName="X3D" typeName="SlidingPuzzle" doc="false" xrButtonPosition="tl"><img src="https://create3000.github.io/media/examples/X3D/SlidingPuzzle/screenshot-small.png" alt="SlidingPuzzle" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/SmartyBubbles/SmartyBubbles.x3d" title="X3D » SmartyBubbles" componentName="X3D" typeName="SmartyBubbles" doc="false" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/X3D/SmartyBubbles/screenshot-small.png" alt="SmartyBubbles" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/SmashingBoxes/SmashingBoxes.x3d" title="X3D » SmashingBoxes" componentName="X3D" typeName="SmashingBoxes" doc="false" xrButtonPosition="bl"><img src="https://create3000.github.io/media/examples/X3D/SmashingBoxes/screenshot-small.png" alt="SmashingBoxes" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/SugarSmack/SugarSmack.x3d" title="X3D » SugarSmack" componentName="X3D" typeName="SugarSmack" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/SugarSmack/screenshot-small.png" alt="SugarSmack" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/TikiWorld/TikiWorld.x3d" title="X3D » TikiWorld" componentName="X3D" typeName="TikiWorld" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/TikiWorld/screenshot-small.png" alt="TikiWorld" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/TreasureIsland/TreasureIsland.x3d" title="X3D » TreasureIsland" componentName="X3D" typeName="TreasureIsland" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/TreasureIsland/screenshot-small.png" alt="TreasureIsland" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/Vattenfall/Vattenfall.x3d" title="X3D » Vattenfall" componentName="X3D" typeName="Vattenfall" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X3D/Vattenfall/screenshot-small.png" alt="Vattenfall" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X3D/WaterQuality/WaterQuality.x3d" title="X3D » WaterQuality" componentName="X3D" typeName="WaterQuality" doc="false" xrButtonPosition="cr"><img src="https://create3000.github.io/media/examples/X3D/WaterQuality/screenshot-small.png" alt="WaterQuality" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/CADGeometry/QuadSet/QuadSet.x3d" title="CADGeometry » QuadSet" componentName="CADGeometry" typeName="QuadSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/CADGeometry/QuadSet/screenshot-small.png" alt="QuadSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Core/OBJ/OBJ.x3d" title="Core » OBJ" componentName="Core" typeName="OBJ" doc="false" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/Core/OBJ/screenshot-small.png" alt="OBJ" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Core/STL/STL.x3d" title="Core » STL" componentName="Core" typeName="STL" doc="false" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/Core/STL/screenshot-small.png" alt="STL" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Core/glTF/glTF.x3d" title="Core » glTF" componentName="Core" typeName="glTF" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Core/glTF/screenshot-small.png" alt="glTF" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.x3d" title="CubeMapTexturing » ComposedCubeMapTexture" componentName="CubeMapTexturing" typeName="ComposedCubeMapTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/screenshot-small.png" alt="ComposedCubeMapTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d" title="CubeMapTexturing » GeneratedCubeMapTexture" componentName="CubeMapTexturing" typeName="GeneratedCubeMapTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/screenshot-small.png" alt="GeneratedCubeMapTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalEffects/Background/Background.x3d" title="EnvironmentalEffects » Background" componentName="EnvironmentalEffects" typeName="Background" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EnvironmentalEffects/Background/screenshot-small.png" alt="Background" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/Fog.x3d" title="EnvironmentalEffects » Fog" componentName="EnvironmentalEffects" typeName="Fog" doc="true" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/screenshot-small.png" alt="Fog" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalEffects/LocalFog/LocalFog.x3d" title="EnvironmentalEffects » LocalFog" componentName="EnvironmentalEffects" typeName="LocalFog" doc="true" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/EnvironmentalEffects/LocalFog/screenshot-small.png" alt="LocalFog" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/TextureBackground.x3d" title="EnvironmentalEffects » TextureBackground" componentName="EnvironmentalEffects" typeName="TextureBackground" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/screenshot-small.png" alt="TextureBackground" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalSensor/ProximitySensor/ProximitySensor.x3d" title="EnvironmentalSensor » ProximitySensor" componentName="EnvironmentalSensor" typeName="ProximitySensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EnvironmentalSensor/ProximitySensor/screenshot-small.png" alt="ProximitySensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/TransformSensor.x3d" title="EnvironmentalSensor » TransformSensor" componentName="EnvironmentalSensor" typeName="TransformSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/screenshot-small.png" alt="TransformSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EnvironmentalSensor/VisibilitySensor/VisibilitySensor.x3d" title="EnvironmentalSensor » VisibilitySensor" componentName="EnvironmentalSensor" typeName="VisibilitySensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EnvironmentalSensor/VisibilitySensor/screenshot-small.png" alt="VisibilitySensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/EventUtilities/IntegerSequencer/IntegerSequencer.x3d" title="EventUtilities » IntegerSequencer" componentName="EventUtilities" typeName="IntegerSequencer" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/EventUtilities/IntegerSequencer/screenshot-small.png" alt="IntegerSequencer" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Followers/ColorChaser/ColorChaser.x3d" title="Followers » ColorChaser" componentName="Followers" typeName="ColorChaser" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Followers/ColorChaser/screenshot-small.png" alt="ColorChaser" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Followers/ColorDamper/ColorDamper.x3d" title="Followers » ColorDamper" componentName="Followers" typeName="ColorDamper" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Followers/ColorDamper/screenshot-small.png" alt="ColorDamper" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Followers/CoordinateChaser/CoordinateChaser.x3d" title="Followers » CoordinateChaser" componentName="Followers" typeName="CoordinateChaser" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Followers/CoordinateChaser/screenshot-small.png" alt="CoordinateChaser" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Followers/ScalarChaser/ScalarChaser.x3d" title="Followers » ScalarChaser" componentName="Followers" typeName="ScalarChaser" doc="true" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/Followers/ScalarChaser/screenshot-small.png" alt="ScalarChaser" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Arc2D/Arc2D.x3d" title="Geometry2D » Arc2D" componentName="Geometry2D" typeName="Arc2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Arc2D/screenshot-small.png" alt="Arc2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/ArcClose2D/ArcClose2D.x3d" title="Geometry2D » ArcClose2D" componentName="Geometry2D" typeName="ArcClose2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/ArcClose2D/screenshot-small.png" alt="ArcClose2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Circle2D/Circle2D.x3d" title="Geometry2D » Circle2D" componentName="Geometry2D" typeName="Circle2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Circle2D/screenshot-small.png" alt="Circle2D" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Disk2D/Disk2D.x3d" title="Geometry2D » Disk2D" componentName="Geometry2D" typeName="Disk2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Disk2D/screenshot-small.png" alt="Disk2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Polyline2D/Polyline2D.x3d" title="Geometry2D » Polyline2D" componentName="Geometry2D" typeName="Polyline2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Polyline2D/screenshot-small.png" alt="Polyline2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/Polypoint2D.x3d" title="Geometry2D » Polypoint2D" componentName="Geometry2D" typeName="Polypoint2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/screenshot-small.png" alt="Polypoint2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/Rectangle2D/Rectangle2D.x3d" title="Geometry2D » Rectangle2D" componentName="Geometry2D" typeName="Rectangle2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/Rectangle2D/screenshot-small.png" alt="Rectangle2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry2D/TriangleSet2D/TriangleSet2D.x3d" title="Geometry2D » TriangleSet2D" componentName="Geometry2D" typeName="TriangleSet2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry2D/TriangleSet2D/screenshot-small.png" alt="TriangleSet2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/Box/Box.x3d" title="Geometry3D » Box" componentName="Geometry3D" typeName="Box" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/Box/screenshot-small.png" alt="Box" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/Cone/Cone.x3d" title="Geometry3D » Cone" componentName="Geometry3D" typeName="Cone" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/Cone/screenshot-small.png" alt="Cone" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/Cylinder/Cylinder.x3d" title="Geometry3D » Cylinder" componentName="Geometry3D" typeName="Cylinder" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/Cylinder/screenshot-small.png" alt="Cylinder" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/ElevationGrid/ElevationGrid.x3d" title="Geometry3D » ElevationGrid" componentName="Geometry3D" typeName="ElevationGrid" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/ElevationGrid/screenshot-small.png" alt="ElevationGrid" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/Extrusion/Extrusion.x3d" title="Geometry3D » Extrusion" componentName="Geometry3D" typeName="Extrusion" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/Extrusion/screenshot-small.png" alt="Extrusion" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/IndexedFaceSet.x3d" title="Geometry3D » IndexedFaceSet" componentName="Geometry3D" typeName="IndexedFaceSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/screenshot-small.png" alt="IndexedFaceSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geometry3D/Sphere/Sphere.x3d" title="Geometry3D » Sphere" componentName="Geometry3D" typeName="Sphere" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geometry3D/Sphere/screenshot-small.png" alt="Sphere" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/GeoElevationGrid.x3d" title="Geospatial » GeoElevationGrid" componentName="Geospatial" typeName="GeoElevationGrid" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/screenshot-small.png" alt="GeoElevationGrid" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Geospatial/GeoLOD/GeoLOD.x3d" title="Geospatial » GeoLOD" componentName="Geospatial" typeName="GeoLOD" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geospatial/GeoLOD/screenshot-small.png" alt="GeoLOD" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/GeoViewpoint.x3d" title="Geospatial » GeoViewpoint" componentName="Geospatial" typeName="GeoViewpoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/screenshot-small.png" alt="GeoViewpoint" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Grouping/Group/Group.x3d" title="Grouping » Group" componentName="Grouping" typeName="Group" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Grouping/Group/screenshot-small.png" alt="Group" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Grouping/StaticGroup/StaticGroup.x3d" title="Grouping » StaticGroup" componentName="Grouping" typeName="StaticGroup" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Grouping/StaticGroup/screenshot-small.png" alt="StaticGroup" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Grouping/Switch/Switch.x3d" title="Grouping » Switch" componentName="Grouping" typeName="Switch" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Grouping/Switch/screenshot-small.png" alt="Switch" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Grouping/Transform/Transform.x3d" title="Grouping » Transform" componentName="Grouping" typeName="Transform" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Grouping/Transform/screenshot-small.png" alt="Transform" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/HAnimHumanoid.x3d" title="HAnim » HAnimHumanoid" componentName="HAnim" typeName="HAnimHumanoid" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/screenshot-small.png" alt="HAnimHumanoid" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/HAnim/HAnimInstancedShape/HAnimInstancedShape.x3d" title="HAnim » HAnimInstancedShape" componentName="HAnim" typeName="HAnimInstancedShape" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/HAnim/HAnimInstancedShape/screenshot-small.png" alt="HAnimInstancedShape" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/HAnim/HAnimParticleSystem/HAnimParticleSystem.x3d" title="HAnim » HAnimParticleSystem" componentName="HAnim" typeName="HAnimParticleSystem" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/HAnim/HAnimParticleSystem/screenshot-small.png" alt="HAnimParticleSystem" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/ColorInterpolator/ColorInterpolator.x3d" title="Interpolation » ColorInterpolator" componentName="Interpolation" typeName="ColorInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/ColorInterpolator/screenshot-small.png" alt="ColorInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/CoordinateInterpolator/CoordinateInterpolator.x3d" title="Interpolation » CoordinateInterpolator" componentName="Interpolation" typeName="CoordinateInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/CoordinateInterpolator/screenshot-small.png" alt="CoordinateInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/OrientationInterpolator/OrientationInterpolator.x3d" title="Interpolation » OrientationInterpolator" componentName="Interpolation" typeName="OrientationInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/OrientationInterpolator/screenshot-small.png" alt="OrientationInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator/PositionInterpolator.x3d" title="Interpolation » PositionInterpolator" componentName="Interpolation" typeName="PositionInterpolator" doc="true" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator/screenshot-small.png" alt="PositionInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/PositionInterpolator2D.x3d" title="Interpolation » PositionInterpolator2D" componentName="Interpolation" typeName="PositionInterpolator2D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/screenshot-small.png" alt="PositionInterpolator2D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/ScalarInterpolator/ScalarInterpolator.x3d" title="Interpolation » ScalarInterpolator" componentName="Interpolation" typeName="ScalarInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/ScalarInterpolator/screenshot-small.png" alt="ScalarInterpolator" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/SplineScalarInterpolator/SplineScalarInterpolator.x3d" title="Interpolation » SplineScalarInterpolator" componentName="Interpolation" typeName="SplineScalarInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/SplineScalarInterpolator/screenshot-small.png" alt="SplineScalarInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/SquadOrientationInterpolator.x3d" title="Interpolation » SquadOrientationInterpolator" componentName="Interpolation" typeName="SquadOrientationInterpolator" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/screenshot-small.png" alt="SquadOrientationInterpolator" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/KeyDeviceSensor/KeySensor/KeySensor.x3d" title="KeyDeviceSensor » KeySensor" componentName="KeyDeviceSensor" typeName="KeySensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/KeyDeviceSensor/KeySensor/screenshot-small.png" alt="KeySensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/KeyDeviceSensor/StringSensor/StringSensor.x3d" title="KeyDeviceSensor » StringSensor" componentName="KeyDeviceSensor" typeName="StringSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/KeyDeviceSensor/StringSensor/screenshot-small.png" alt="StringSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d" title="Layering » LayerSet" componentName="Layering" typeName="LayerSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Layering/LayerSet/screenshot-small.png" alt="LayerSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Layering/Viewport/Viewport.x3d" title="Layering » Viewport" componentName="Layering" typeName="Viewport" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Layering/Viewport/screenshot-small.png" alt="Viewport" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.x3d" title="Layout » ScreenFontStyle" componentName="Layout" typeName="ScreenFontStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Layout/ScreenFontStyle/screenshot-small.png" alt="ScreenFontStyle" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Lighting/DirectionalLight/DirectionalLight.x3d" title="Lighting » DirectionalLight" componentName="Lighting" typeName="DirectionalLight" doc="true" xrButtonPosition="bl"><img src="https://create3000.github.io/media/examples/Lighting/DirectionalLight/screenshot-small.png" alt="DirectionalLight" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Lighting/PointLight/PointLight.x3d" title="Lighting » PointLight" componentName="Lighting" typeName="PointLight" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Lighting/PointLight/screenshot-small.png" alt="PointLight" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Lighting/Shadows/Shadows.x3d" title="Lighting » Shadows" componentName="Lighting" typeName="Shadows" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Lighting/Shadows/screenshot-small.png" alt="Shadows" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Lighting/SpotLight/SpotLight.x3d" title="Lighting » SpotLight" componentName="Lighting" typeName="SpotLight" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Lighting/SpotLight/screenshot-small.png" alt="SpotLight" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d" title="NURBS » NurbsCurve" componentName="NURBS" typeName="NurbsCurve" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/screenshot-small.png" alt="NurbsCurve" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/NurbsPatchSurface.x3d" title="NURBS » NurbsPatchSurface" componentName="NURBS" typeName="NurbsPatchSurface" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/screenshot-small.png" alt="NurbsPatchSurface" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/NURBS/NurbsSweptSurface/NurbsSweptSurface.x3d" title="NURBS » NurbsSweptSurface" componentName="NURBS" typeName="NurbsSweptSurface" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/NURBS/NurbsSweptSurface/screenshot-small.png" alt="NurbsSweptSurface" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/NURBS/NurbsTrimmedSurface/NurbsTrimmedSurface.x3d" title="NURBS » NurbsTrimmedSurface" componentName="NURBS" typeName="NurbsTrimmedSurface" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/NURBS/NurbsTrimmedSurface/screenshot-small.png" alt="NurbsTrimmedSurface" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/Billboard/Billboard.x3d" title="Navigation » Billboard" componentName="Navigation" typeName="Billboard" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/Billboard/screenshot-small.png" alt="Billboard" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/Collision/Collision.x3d" title="Navigation » Collision" componentName="Navigation" typeName="Collision" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/Collision/screenshot-small.png" alt="Collision" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/LogarithmicDepthBuffer/LogarithmicDepthBuffer.x3d" title="Navigation » LogarithmicDepthBuffer" componentName="Navigation" typeName="LogarithmicDepthBuffer" doc="false" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/LogarithmicDepthBuffer/screenshot-small.png" alt="LogarithmicDepthBuffer" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/NavigationInfo/NavigationInfo.x3d" title="Navigation » NavigationInfo" componentName="Navigation" typeName="NavigationInfo" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/NavigationInfo/screenshot-small.png" alt="NavigationInfo" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.x3d" title="Navigation » OrthoViewpoint" componentName="Navigation" typeName="OrthoViewpoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/screenshot-small.png" alt="OrthoViewpoint" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Navigation/Viewpoint/Viewpoint.x3d" title="Navigation » Viewpoint" componentName="Navigation" typeName="Viewpoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Navigation/Viewpoint/screenshot-small.png" alt="Viewpoint" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Networking/Anchor/Anchor.x3d" title="Networking » Anchor" componentName="Networking" typeName="Anchor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Networking/Anchor/screenshot-small.png" alt="Anchor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Networking/Inline/Inline.x3d" title="Networking » Inline" componentName="Networking" typeName="Inline" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Networking/Inline/screenshot-small.png" alt="Inline" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Networking/LoadSensor/LoadSensor.x3d" title="Networking » LoadSensor" componentName="Networking" typeName="LoadSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Networking/LoadSensor/screenshot-small.png" alt="LoadSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.x3d" title="ParticleSystems » BoundedPhysicsModel" componentName="ParticleSystems" typeName="BoundedPhysicsModel" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/screenshot-small.png" alt="BoundedPhysicsModel" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/ConeEmitter/ConeEmitter.x3d" title="ParticleSystems » ConeEmitter" componentName="ParticleSystems" typeName="ConeEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/ConeEmitter/screenshot-small.png" alt="ConeEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/ExplosionEmitter.x3d" title="ParticleSystems » ExplosionEmitter" componentName="ParticleSystems" typeName="ExplosionEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/screenshot-small.png" alt="ExplosionEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/ForcePhysicsModel.x3d" title="ParticleSystems » ForcePhysicsModel" componentName="ParticleSystems" typeName="ForcePhysicsModel" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/screenshot-small.png" alt="ForcePhysicsModel" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/ParticleSystem.x3d" title="ParticleSystems » ParticleSystem" componentName="ParticleSystems" typeName="ParticleSystem" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/screenshot-small.png" alt="ParticleSystem" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/PointEmitter/PointEmitter.x3d" title="ParticleSystems » PointEmitter" componentName="ParticleSystems" typeName="PointEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/PointEmitter/screenshot-small.png" alt="PointEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/PolylineEmitter.x3d" title="ParticleSystems » PolylineEmitter" componentName="ParticleSystems" typeName="PolylineEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/screenshot-small.png" alt="PolylineEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/SurfaceEmitter/SurfaceEmitter.x3d" title="ParticleSystems » SurfaceEmitter" componentName="ParticleSystems" typeName="SurfaceEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/SurfaceEmitter/screenshot-small.png" alt="SurfaceEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/VolumeEmitter.x3d" title="ParticleSystems » VolumeEmitter" componentName="ParticleSystems" typeName="VolumeEmitter" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/screenshot-small.png" alt="VolumeEmitter" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/ParticleSystems/WindPhysicsModel/WindPhysicsModel.x3d" title="ParticleSystems » WindPhysicsModel" componentName="ParticleSystems" typeName="WindPhysicsModel" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/ParticleSystems/WindPhysicsModel/screenshot-small.png" alt="WindPhysicsModel" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Picking/LinePickSensor/LinePickSensor.x3d" title="Picking » LinePickSensor" componentName="Picking" typeName="LinePickSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Picking/LinePickSensor/screenshot-small.png" alt="LinePickSensor" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Picking/PointPickSensor/PointPickSensor.x3d" title="Picking » PointPickSensor" componentName="Picking" typeName="PointPickSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Picking/PointPickSensor/screenshot-small.png" alt="PointPickSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Picking/PrimitivePickSensor/PrimitivePickSensor.x3d" title="Picking » PrimitivePickSensor" componentName="Picking" typeName="PrimitivePickSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Picking/PrimitivePickSensor/screenshot-small.png" alt="PrimitivePickSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/PointingDeviceSensor/CylinderSensor/CylinderSensor.x3d" title="PointingDeviceSensor » CylinderSensor" componentName="PointingDeviceSensor" typeName="CylinderSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/PointingDeviceSensor/CylinderSensor/screenshot-small.png" alt="CylinderSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/PlaneSensor.x3d" title="PointingDeviceSensor » PlaneSensor" componentName="PointingDeviceSensor" typeName="PlaneSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/screenshot-small.png" alt="PlaneSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/PointingDeviceSensor/TouchSensor/TouchSensor.x3d" title="PointingDeviceSensor » TouchSensor" componentName="PointingDeviceSensor" typeName="TouchSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/PointingDeviceSensor/TouchSensor/screenshot-small.png" alt="TouchSensor" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/ClipPlane/ClipPlane.x3d" title="Rendering » ClipPlane" componentName="Rendering" typeName="ClipPlane" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/ClipPlane/screenshot-small.png" alt="ClipPlane" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/Color/Color.x3d" title="Rendering » Color" componentName="Rendering" typeName="Color" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/Color/screenshot-small.png" alt="Color" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/ColorRGBA/ColorRGBA.x3d" title="Rendering » ColorRGBA" componentName="Rendering" typeName="ColorRGBA" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/ColorRGBA/screenshot-small.png" alt="ColorRGBA" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.x3d" title="Rendering » Coordinate" componentName="Rendering" typeName="Coordinate" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/Coordinate/screenshot-small.png" alt="Coordinate" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d" title="Rendering » IndexedLineSet" componentName="Rendering" typeName="IndexedLineSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/screenshot-small.png" alt="IndexedLineSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/IndexedTriangleFanSet/IndexedTriangleFanSet.x3d" title="Rendering » IndexedTriangleFanSet" componentName="Rendering" typeName="IndexedTriangleFanSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/IndexedTriangleFanSet/screenshot-small.png" alt="IndexedTriangleFanSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/IndexedTriangleSet/IndexedTriangleSet.x3d" title="Rendering » IndexedTriangleSet" componentName="Rendering" typeName="IndexedTriangleSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/IndexedTriangleSet/screenshot-small.png" alt="IndexedTriangleSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/LineSet/LineSet.x3d" title="Rendering » LineSet" componentName="Rendering" typeName="LineSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/LineSet/screenshot-small.png" alt="LineSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/OrderIndependentTransparency/OrderIndependentTransparency.x3d" title="Rendering » OrderIndependentTransparency" componentName="Rendering" typeName="OrderIndependentTransparency" doc="false" xrButtonPosition="tr"><img src="https://create3000.github.io/media/examples/Rendering/OrderIndependentTransparency/screenshot-small.png" alt="OrderIndependentTransparency" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d" title="Rendering » PointSet" componentName="Rendering" typeName="PointSet" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Rendering/PointSet/screenshot-small.png" alt="PointSet" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/BallJoint.x3d" title="RigidBodyPhysics » BallJoint" componentName="RigidBodyPhysics" typeName="BallJoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/screenshot-small.png" alt="BallJoint" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/CollidableShape.x3d" title="RigidBodyPhysics » CollidableShape" componentName="RigidBodyPhysics" typeName="CollidableShape" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/screenshot-small.png" alt="CollidableShape" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/CollisionCollection/CollisionCollection.x3d" title="RigidBodyPhysics » CollisionCollection" componentName="RigidBodyPhysics" typeName="CollisionCollection" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollisionCollection/screenshot-small.png" alt="CollisionCollection" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d" title="RigidBodyPhysics » RigidBody" componentName="RigidBodyPhysics" typeName="RigidBody" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/screenshot-small.png" alt="RigidBody" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.x3d" title="RigidBodyPhysics » RigidBodyCollection" componentName="RigidBodyPhysics" typeName="RigidBodyCollection" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/screenshot-small.png" alt="RigidBodyCollection" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d" title="RigidBodyPhysics » SingleAxisHingeJoint" componentName="RigidBodyPhysics" typeName="SingleAxisHingeJoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/screenshot-small.png" alt="SingleAxisHingeJoint" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/RigidBodyPhysics/SliderJoint/SliderJoint.x3d" title="RigidBodyPhysics » SliderJoint" componentName="RigidBodyPhysics" typeName="SliderJoint" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/RigidBodyPhysics/SliderJoint/screenshot-small.png" alt="SliderJoint" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shaders/ComposedShader/ComposedShader.x3d" title="Shaders » ComposedShader" componentName="Shaders" typeName="ComposedShader" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shaders/ComposedShader/screenshot-small.png" alt="ComposedShader" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/FloatVertexAttribute.x3d" title="Shaders » FloatVertexAttribute" componentName="Shaders" typeName="FloatVertexAttribute" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/screenshot-small.png" alt="FloatVertexAttribute" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shaders/ShaderPart/ShaderPart.x3d" title="Shaders » ShaderPart" componentName="Shaders" typeName="ShaderPart" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shaders/ShaderPart/screenshot-small.png" alt="ShaderPart" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shape/Appearance/Appearance.x3d" title="Shape » Appearance" componentName="Shape" typeName="Appearance" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shape/Appearance/screenshot-small.png" alt="Appearance" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shape/FillProperties/FillProperties.x3d" title="Shape » FillProperties" componentName="Shape" typeName="FillProperties" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shape/FillProperties/screenshot-small.png" alt="FillProperties" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shape/LineProperties/LineProperties.x3d" title="Shape » LineProperties" componentName="Shape" typeName="LineProperties" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shape/LineProperties/screenshot-small.png" alt="LineProperties" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Shape/Material/Material.x3d" title="Shape » Material" componentName="Shape" typeName="Material" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shape/Material/screenshot-small.png" alt="Material" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/TwoSidedMaterial.x3d" title="Shape » TwoSidedMaterial" componentName="Shape" typeName="TwoSidedMaterial" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/screenshot-small.png" alt="TwoSidedMaterial" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Sound/AudioClip/AudioClip.x3d" title="Sound » AudioClip" componentName="Sound" typeName="AudioClip" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Sound/AudioClip/screenshot-small.png" alt="AudioClip" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Sound/MicrophoneSource/MicrophoneSource.x3d" title="Sound » MicrophoneSource" componentName="Sound" typeName="MicrophoneSource" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Sound/MicrophoneSource/screenshot-small.png" alt="MicrophoneSource" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Text/FontStyle/FontStyle.x3d" title="Text » FontStyle" componentName="Text" typeName="FontStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Text/FontStyle/screenshot-small.png" alt="FontStyle" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Text/Text/Text.x3d" title="Text » Text" componentName="Text" typeName="Text" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Text/Text/screenshot-small.png" alt="Text" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/TextureProjection/TextureProjector/TextureProjector.x3d" title="TextureProjection » TextureProjector" componentName="TextureProjection" typeName="TextureProjector" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/TextureProjection/TextureProjector/screenshot-small.png" alt="TextureProjector" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing/ImageTexture/ImageTexture.x3d" title="Texturing » ImageTexture" componentName="Texturing" typeName="ImageTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing/ImageTexture/screenshot-small.png" alt="ImageTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing/MovieTexture/MovieTexture.x3d" title="Texturing » MovieTexture" componentName="Texturing" typeName="MovieTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing/MovieTexture/screenshot-small.png" alt="MovieTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing/MultiTexture/MultiTexture.x3d" title="Texturing » MultiTexture" componentName="Texturing" typeName="MultiTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing/MultiTexture/screenshot-small.png" alt="MultiTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing/PixelTexture/PixelTexture.x3d" title="Texturing » PixelTexture" componentName="Texturing" typeName="PixelTexture" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing/PixelTexture/screenshot-small.png" alt="PixelTexture" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/ImageTexture3D.x3d" title="Texturing3D » ImageTexture3D" componentName="Texturing3D" typeName="ImageTexture3D" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/screenshot-small.png" alt="ImageTexture3D" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/ImageTextureAtlas.x3d" title="Texturing3D » ImageTextureAtlas" componentName="Texturing3D" typeName="ImageTextureAtlas" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/screenshot-small.png" alt="ImageTextureAtlas" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/Time/TimeSensor/TimeSensor.x3d" title="Time » TimeSensor" componentName="Time" typeName="TimeSensor" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/Time/TimeSensor/screenshot-small.png" alt="TimeSensor" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.x3d" title="VolumeRendering » EdgeEnhancementVolumeStyle" componentName="VolumeRendering" typeName="EdgeEnhancementVolumeStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/screenshot-small.png" alt="EdgeEnhancementVolumeStyle" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/IsoSurfaceVolumeData.x3d" title="VolumeRendering » IsoSurfaceVolumeData" componentName="VolumeRendering" typeName="IsoSurfaceVolumeData" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/screenshot-small.png" alt="IsoSurfaceVolumeData" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/ProjectionVolumeStyle.x3d" title="VolumeRendering » ProjectionVolumeStyle" componentName="VolumeRendering" typeName="ProjectionVolumeStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/screenshot-small.png" alt="ProjectionVolumeStyle" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/SegmentedVolumeData/SegmentedVolumeData.x3d" title="VolumeRendering » SegmentedVolumeData" componentName="VolumeRendering" typeName="SegmentedVolumeData" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/SegmentedVolumeData/screenshot-small.png" alt="SegmentedVolumeData" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/ShadedVolumeStyle.x3d" title="VolumeRendering » ShadedVolumeStyle" componentName="VolumeRendering" typeName="ShadedVolumeStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/screenshot-small.png" alt="ShadedVolumeStyle" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d" title="VolumeRendering » ToneMappedVolumeStyle" componentName="VolumeRendering" typeName="ToneMappedVolumeStyle" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/screenshot-small.png" alt="ToneMappedVolumeStyle" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/VolumeRendering/VolumeData/VolumeData.x3d" title="VolumeRendering » VolumeData" componentName="VolumeRendering" typeName="VolumeData" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/VolumeRendering/VolumeData/screenshot-small.png" alt="VolumeData" width="110" height="62"/></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d" title="X_ITE » BlendMode" componentName="X_ITE" typeName="BlendMode" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X_ITE/BlendMode/screenshot-small.png" alt="BlendMode" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.x3d" title="X_ITE » DepthMode" componentName="X_ITE" typeName="DepthMode" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X_ITE/DepthMode/screenshot-small.png" alt="DepthMode" width="110" height="62"/></a>
    </td>
    <td>
      <a href="https://create3000.github.io/media/examples/X_ITE/InstancedShape/InstancedShape.x3d" title="X_ITE » InstancedShape" componentName="X_ITE" typeName="InstancedShape" doc="true" xrButtonPosition="br"><img src="https://create3000.github.io/media/examples/X_ITE/InstancedShape/screenshot-small.png" alt="InstancedShape" width="110" height="62"/></a>
    </td>
  </tr>
</table>

>**Tip:** If you still haven't had enough and would like to see even more models, then take a look at the [glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/). There are a lot of models from simple to advanced.
><br><br>[![Teaser1](/assets/laboratory/gltf-sample-viewer/teaser/light-image1.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF/ChronographWatch.gltf){: .light .img-link .w-25 }[![Teaser2](/assets/laboratory/gltf-sample-viewer/teaser/light-image2.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF/BoomBox.gltf){: .light .img-link .w-25 }[![Teaser3](/assets/laboratory/gltf-sample-viewer/teaser/light-image3.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF/SunglassesKhronos.gltf){: .light .img-link .w-25 }[![Teaser4](/assets/laboratory/gltf-sample-viewer/teaser/light-image4.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf){: .light .img-link .w-25 }[![Teaser5](/assets/laboratory/gltf-sample-viewer/teaser/light-image5.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenWoodLeatherSofa/glTF/SheenWoodLeatherSofa.gltf){: .light .img-link .w-25 }[![Teaser6](/assets/laboratory/gltf-sample-viewer/teaser/light-image6.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF/DiffuseTransmissionTeacup.gltf){: .light .img-link .w-25 }[![Teaser7](/assets/laboratory/gltf-sample-viewer/teaser/light-image7.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CommercialRefrigerator/glTF/CommercialRefrigerator.gltf){: .light .img-link .w-25 }[![Teaser8](/assets/laboratory/gltf-sample-viewer/teaser/light-image8.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF/CarConcept.gltf){: .light .img-link .w-25 }[![Teaser1](/assets/laboratory/gltf-sample-viewer/teaser/dark-image1.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF/ChronographWatch.gltf){: .dark .img-link .w-25 }[![Teaser2](/assets/laboratory/gltf-sample-viewer/teaser/dark-image2.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF/BoomBox.gltf){: .dark .img-link .w-25 }[![Teaser3](/assets/laboratory/gltf-sample-viewer/teaser/dark-image3.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF/SunglassesKhronos.gltf){: .dark .img-link .w-25 }[![Teaser4](/assets/laboratory/gltf-sample-viewer/teaser/dark-image4.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf){: .dark .img-link .w-25 }[![Teaser5](/assets/laboratory/gltf-sample-viewer/teaser/dark-image5.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenWoodLeatherSofa/glTF/SheenWoodLeatherSofa.gltf){: .dark .img-link .w-25 }[![Teaser6](/assets/laboratory/gltf-sample-viewer/teaser/dark-image6.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF/DiffuseTransmissionTeacup.gltf){: .dark .img-link .w-25 }[![Teaser7](/assets/laboratory/gltf-sample-viewer/teaser/dark-image7.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CommercialRefrigerator/glTF/CommercialRefrigerator.gltf){: .dark .img-link .w-25 }[![Teaser8](/assets/laboratory/gltf-sample-viewer/teaser/dark-image8.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF/CarConcept.gltf){: .dark .img-link .w-25 }
{: .prompt-tip }

## Download X_ITE v{{ site.x_ite_latest_version }}

There is a ZIP archive available to locally install X_ITE on your server. Compressed and uncompressed copies of X_ITE files are available. The uncompressed file (x_ite.js) is best used during development or debugging; the compressed file (x_ite.min.js) saves bandwidth and improves performance in production.

[Download X_ITE ZIP archive](https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.zip)

### Using X_ITE with a CDN

CDNs can offer a performance benefit by hosting X_ITE on servers spread across the globe. This also offers an advantage that if the visitor to your webpage has already downloaded a copy of X_ITE from the same CDN, it won't have to be re-downloaded. To use the X_ITE CDN, just reference the JavaScript file in the script element directly from the [jsDelivr](https://www.jsdelivr.com) or [UNPKG](https://www.unpkg.com) CDN domain.

If you are going to use X_ITE in a production environment, you should always use a **fixed** version of X_ITE. You can get a list of all available versions [here on npm](https://www.npmjs.com/package/x_ite?activeTab=versions), and here a list of all [CDNs](/x_ite/releases/).

#### jsDelivr CDN

jsDelivr is an open-source content delivery network (CDN) renowned for its no-cost access, swift performance, and reliable service.

```html
<script defer src="https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";
</script>
```

>**Info:** It is no longer necessary to include the CSS file.
{: .prompt-info }

{% details Subresource Integrity Hash Values %}
If you want to do an [integrity check](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) for the JavaScript file, here are the corresponding hash values. Keep in mind that these values will change from version to version.

| File          | Integrity Attribute Value        |
|---------------|----------------------------------|
| x_ite.js      |{{ site.x_ite_js_integrity }}     |
| x_ite.min.js  |{{ site.x_ite_min_js_integrity }} |
| x_ite.mjs     |{{ site.x_ite_mjs_integrity }}    |
| x_ite.min.mjs |{{ site.x_ite_min_mjs_integrity }}|
{% enddetails %}

### You Can Also Get it from NPM

You can find more information about X_ITE on its [npm page](https://www.npmjs.com/package/x_ite).

To install, use the following command:

```console
$ npm install x_ite
```

Maybe you are curious now [how to use X_ITE with Electron](/x_ite/how-to-use-x-ite-with-electron/)?

Also try [x_ite-node](https://www.npmjs.com/package/x_ite-node), a pure Node.js version, without any dependencies on Electron or any browser. Suitable for just reading 3D files, analyzing, processing and generating X3D.

```console
$ npm install x_ite-node
```

### VS Code Extensions

Discover the [X_ITE VS Code Extension](https://marketplace.visualstudio.com/items?itemName=create3000.x-ite-vscode) and [X_ITE VS Code Formatter](https://marketplace.visualstudio.com/items?itemName=create3000.x-ite-vscode-formatter) on the VS Code Marketplace.

## Embedding X_ITE within a Web Page

To display your X3D scene in a HTML5 page, you must first obtain a file in one of the [supported formats](#supported-file-formats).

The HTML5 page is quite easy to create, the HTML5 code below shows you the minimum requirements. The path to the X3D scene is specified in the *src* attribute of the \<x3d-canvas\> element.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script defer src="https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
    <style>
x3d-canvas {
  width: 768px;
  height: 432px;
}
    </style>
  </head>
  <body>
    <x3d-canvas src="path/to/your/X3D/world.x3d"></x3d-canvas>
  </body>
</html>
```

To get X_ITE working you need to include the JavaScript file »x_ite.min.js«. Once X_ITE has loaded successfully, a new HTML element \<x3d-canvas\> will be available on your page. You can style the \<x3d-canvas\> element with CSS just like any other HTML element, and you can place it anywhere in the DOM tree. Once the scene is displayed, you may wonder [how to navigate in a the scene](/x_ite/tutorials/how-to-navigate-in-a-scene/).

>**Tip:** To test a page locally on your desktop computer, [setup a localhost server](/x_ite/setup-a-localhost-server/) to load files via *src* attribute or Inline node, or [directly combine HTML with X3D](/x_ite/dom-integration/).
{: .prompt-tip }

### Supported File Formats

X_ITE can load several file formats, either directly as the source of the \<x3d-canvas\> element or as the source of an Inline node, as well as using API methods of the [Browser object](/x_ite/reference/browser-services/). Foreign formats such as glTF are converted internally to X3D and then made available to the scene graph.

| Encoding         | File Extension | MIME Type       |
|------------------|----------------|-----------------|
| X3D XML          | .x3d, .x3dz    | model/x3d+xml   |
| X3D JSON         | .x3dj, .x3djz  | model/x3d+json  |
| X3D Classic VRML | .x3dv, .x3dvz  | model/x3d+vrml  |
| VRML             | .wrl, .wrz     | model/vrml      |
| glTF             | .gltf, .glb    | model/gltf+json |
| Wavefront OBJ    | .obj           | model/obj       |
| STL              | .stl           | model/stl       |
| PLY              | .ply           | model/ply       |
| SVG Document     | .svg, .svgz    | image/svg+xml   |

>**Tip:** All files can be compressed using GZip compression (usually denoted by a 'z' at the end of the filename suffix). This saves bandwidth and speeds up download time.
{: .prompt-tip }

If you have an own web-server see [how to configure your web server](/x_ite/how-to-configure-your-web-server/). If you are looking for an online X3D file format converter [see here](/x_ite/laboratory/x3d-file-converter/).

### Fallback Content

The \<x3d-canvas\> element is equal to the \<canvas\> element in that, it is easy to define some fallback content, to be displayed in older browsers not supporting it. You should always provide fallback content to be displayed by those browsers.

Providing fallback content is very straightforward: just insert the alternate content inside the \<x3d-canvas\> element. Browsers that don't support \<x3d-canvas\> will ignore the container and render the fallback content inside it. Browsers that do support \<x3d-canvas\> will ignore the content inside the container, and just render the canvas normally.

For example, we could provide a text description of the X3D element or provide a static image of the dynamically rendered content. This can look something like this:

```html
<x3d-canvas src="world.x3d">
  <p>Current stock price: $3.15 +0.15</p>
</x3d-canvas>
```

```html
<x3d-canvas src="world.x3dv">
  <img src="images/clock.png"/>
</x3d-canvas>
```

## Attributes of the \<x3d-canvas\> Element

The HTML **\<x3d-canvas\>** element defines the main content of the X3D document. The \<x3d-canvas\> element has several attributes that define different behaviors. All of these attributes are optional and all can be changed during runtime except *preserveDrawingBuffer*.

antialiased
: A Boolean value (`true` or `false`) to indicate whether rendering should use hardware antialiasing if available. The default value for the *antialiased* attribute is `true`.

>**Tip:** Set CSS property »image-rendering« of \<x3d-canvas\> element to »pixelated«, if no filtering is desired in addition.
{: .prompt-tip }

baseURL
: A String value containing the URL against which relative URLs are resolved. By default, this is the address of the web page itself. Although this feature is rarely needed, it can be useful when loading a `data:` or `blob:` URL with the *src* attribute, or with `Browser.loadURL`, or when using `Browser.createX3DFromString`. The value of *baseURL* will only be used with the external browser.

cache
: A Boolean value (`true` or `false`) to indicate whether files transferred over the internet should be cached on the local computer. The default value for the *cache* attribute is `true`. It works by appending "_={timestamp}" to the GET parameters of every request.

colorSpace
: A String value that specifies the color space in which color calculations take place. The default value for the *colorSpace* attribute is `LINEAR_WHEN_PHYSICAL_MATERIAL`. For a list of possible values see [browser options](/x_ite/reference/browser-services/#browser-options).

contentScale
: A Float value that specifies how much higher the physical resolution of the internal \<canvas\> element is. The default value for the *contentScale* attribute is `1.0`, which is sufficient for most cases. A higher value increases the resolution of the internal \<canvas\> element and can be used to increase the anti-aliasing effect, making the rendered image sharper. If set to `auto`, contentScale will match »window.devicePixelRatio«, which is useful for HiDPI or Retina displays. A value between `0.0` and `1.0` will result in a pixelated image, see also the *antialiased* attribute.

contextMenu
: A Boolean value (`true` or `false`) to indicate whether a context menu should be displayed on right click. The default value for the *contextMenu* attribute is `true`. The context menu can also be extended, [see here](#extending-the-context-menu).

debug
: A Boolean value (`true` or `false`) to indicate whether additional debug message should be printed into the web browsers console and whether additional context menu items should be enabled. The default value for the *debug* attribute is `false`.

exposure
: A Float value that describes the amount of light that is captured. The default value for the *exposure* attribute is `1`.

logarithmicDepthBuffer
: A Boolean value (`true` or `false`) to indicate whether logarithmic depth buffer rendering technique should be used. The default value for the *logarithmicDepthBuffer* attribute is `false`.

multisampling
: An Integer value that specifies the number of samples used by multisampling. The default value is 4, which is sufficient for most cases. A higher value increases the effect of anti-aliasing. Check the [rendering property](/x_ite/reference/browser-services/#rendering-properties) »MaxSamples«, which is browser dependent.

notifications
: A Boolean value (`true` or `false`) to indicate whether the notification bubble should be displayed. The default value for the *notifications* attribute is `true`.

onerror
: Type: script code. This event is sent to an \<x3d-canvas\> element when an error occurs loading a scene.

oninitialized, onload
: Type: script code. This event handler will be called on the \<x3d-canvas\> element when a scene has finished loading. This applies whether the scene is applied via the *src* attribute or when a scene is loaded or replaced by another world. If you change the scene, the event will fire again when the new scene loads. This event will not bubble up the element tree.

: The onload event handler will also be called at the very beginning when the initial empty scene is loaded.

onshutdown
: Type: script code. This event handler will be called on the \<x3d-canvas\> element when a scene is unloaded or replaced by another world.

preserveDrawingBuffer
: A Boolean value (`true` or `false`). If the value is true the drawing buffers will not be cleared and will preserve their values. The default value for the *preserveDrawingBuffer* attribute is `false`. Set *preserveDrawingBuffer* to `true` if you want to save images from the internal canvas. Keep in mind setting *preserveDrawingBuffer* to true can have performance implications.

orderIndependentTransparency
: A Boolean value (`true` or `false`) to indicate whether order independent transparency rendering technique should be used. The default value for the *orderIndependentTransparency* attribute is `false`.

splashScreen
: A Boolean value (`true` or `false`) to indicate whether the splash screen should be displayed. The default value for the *splashScreen* attribute is `true`. The display of the splash screen can also be toggled via the browser option »SplashScreen« in JavaScript. Call `Browser .setBrowserOption ("SplashScreen", booleanValue)` to toggle the display of the splash screen.

src
: A String value containing the URL to load on page load. If no *src* attribute is specified or the *src* attribute is empty, an empty scene will be displayed.

textCompression
: A string value that determines how [Text](/x_ite/components/text/text/).*length* and [Text](/x_ite/components/text/text/).*maxExtent* are handled, ie. either by adjusting char spacing or by scaling. The default value for the *textCompression* attribute is `CHAR_SPACING`. For a list of possible values see [browser options](/x_ite/reference/browser-services/#browser-options).

theme
: A string value that determines what color theme should be used for the user interface (context menu, notifications, ...). The default value for the *theme* attribute is `auto`. Possible values are `light`, `dark` and `auto`.

timings
: A Boolean value (`true` or `false`) to indicate whether the Timings Panel should be displayed. The default value for the *timings* attribute is restored from the previous session, otherwise it is `false`.

toneMapping
: A String value that indicates whether tone mapping should be applied. The default value for the *toneMapping* attribute is `NONE`. For a list of possible values see [browser options](/x_ite/reference/browser-services/#browser-options).

update
: A Boolean value (`true`, `false` or `auto`) to indicate whether browser events should be processed. The default value for the *update* attribute is `true`. A value of `true` will enable event processing, a value of `false` will stop event processing and all animations will be disabled. If the value is `auto`, the effective value is determined by the visibility of the \<x3d-canvas\> element and the document itself.

url
: An MFString value of URLs to load on page load. If no *url* attribute is specified or the attribute is empty, an empty scene will be displayed. If both *src* and *url* attributes are given, the last given attribute takes precedence.

xrSessionMode
: A String value that specifies what kind of WebXR session should be created. The default value for the *xrSessionMode* attribute is `IMMERSIVE_VR`. A value of `NONE` completely disables the possibility to use WebXR. For a list of possible values see [browser options](/x_ite/reference/browser-services/#browser-options).

>**Tip:** If you want to change the position of the WebXR button, use the CSS `x3d-canvas::part(xr-button)` selector.
{: .prompt-tip }

### Example of Use

```html
<x3d-canvas src="path/to/your/X3D/world.x3d" cache="true" update="auto"></x3d-canvas>
```

### More Options

More options can be adjusted using the [Browser object](/x_ite/reference/browser-services/#browser-object) and [browser options](/x_ite/reference/browser-services/#browser-options) for scene specific adjustments.

## Keyboard Shortcuts

If the \<x3d-canvas\> element is focused, the following keyboard shortcuts are available.

Home (Pos 1)
: Go to first viewpoint.

End
: Go to last viewpoint.

Page Up
: Go to previous viewpoint.

Page Down
: Go to next viewpoint.

Ctrl++
: Display browser timings.

Shift+F8
: Copy the the current viewpoint of the active layer to clipboard.

Ctrl+S
: If \<x3d-canvas\> attribute *debug* is `true`, toggle begin/end update of browser.

Ctrl+1
: If \<x3d-canvas\> attribute *debug* is `true`, set shading to POINT.

Ctrl+2
: If \<x3d-canvas\> attribute *debug* is `true`, set shading to WIREFRAME.

Ctrl+3
: If \<x3d-canvas\> attribute *debug* is `true`, set shading to FLAT.

Ctrl+4
: If \<x3d-canvas\> attribute *debug* is `true`, set shading to GOURAUD.

Ctrl+5
: If \<x3d-canvas\> attribute *debug* is `true`, set shading to PHONG.

## Extending the Context Menu

The context menu is similar to the jQuery context menu plugin, but is more lightweight, and it can be extended using the `items` syntax. Basically `Browser .contextMenu .userMenu` is being assigned a function that returns a menu object. The full documentation [can be found here](https://swisnl.github.io/jQuery-contextMenu/docs/items.html).

### Example

```js
Browser .contextMenu .userMenu = () =>
{
  return {
    "command-1": {
      name: "Command 1",
      callback: (event) =>
      {
        console .log ("Clicked on Command 1");
      },
    },
  };
};
```
