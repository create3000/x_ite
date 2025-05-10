---
title: Accessing the External Browser
date: 2022-11-28
nav: main
categories: []
tags: [Accessing, External, Browser, Authoring, Interface]
---

## Overview

X_ITE is designed to provide access to the internal X3D browser and its contained scene graph via JavaScript, either within an internal X3D Script node or an external HTML script.

If you want combine DOM access with X3D access in your JavaScript functions then you probably want to access the external browser object if you want include an external JavaScript file in your HTML page and you don't want to do it directly in a [Script](/x_ite/components/scripting/script/) node.

## Usage

This script initializes an X3D canvas within an HTML page, configuring it to contain a scene, a camera and a geometric cube with default material properties. It then animates the rotation of the cube within the scene, ensuring that the camera captures the dynamic action.

### Declarative Syntax

```html
<script defer src="https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
<x3d-canvas update="auto" contentScale="auto">
  <X3D profile='Interchange' version='{{ site.x3d_latest_version }}'>
    <head>
      <unit category='angle' name='degree' conversionFactor='0.017453292519943295'></unit>
    </head>
    <Scene>
      <Viewpoint
          description='Initial View'
          position='2.869677 3.854335 8.769781'
          orientation='-0.7765887 0.6177187 0.1238285 28.9476440862198'></Viewpoint>
      <Transform DEF='Box'
          rotation='0 1 0 0'>
        <Shape>
          <Appearance>
            <Material></Material>
          </Appearance>
          <Box></Box>
        </Shape>
      </Transform>
      <TimeSensor DEF='Timer'
          cycleInterval='10'
          loop='true'></TimeSensor>
      <OrientationInterpolator DEF='Rotor'
          key='0, 0.25, 0.5, 0.75, 1'
          keyValue='0 1 0 0, 0 1 0 90, 0 1 0 180, 0 1 0 270, 0 1 0 0'></OrientationInterpolator>
      <ROUTE fromNode='Timer' fromField='fraction_changed' toNode='Rotor' toField='set_fraction'></ROUTE>
      <ROUTE fromNode='Rotor' fromField='value_changed' toNode='Box' toField='set_rotation'></ROUTE>
    </Scene>
  </X3D>
</x3d-canvas>
```

### Pure JavaScript

The same scene can also be created using pure JavaScript.

Outside of a [Script](/x_ite/components/scripting/script/) node context, you can access **all** objects through the X3D object, which can then be used as a namespace, eg. `new X3D .MFString ("foo")`.

```html
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";

const
   canvas  = document .getElementById ("x_ite"),
   browser = canvas .browser,
   scene   = await browser .createScene (browser .getProfile ("Interchange"), browser .getComponent ("Interpolation", 1));

// Change attributes:

canvas .setAttribute ("update",       "auto");
canvas .setAttribute ("contentScale", "auto");

// Create Viewpoint:

const viewpointNode = scene .createNode ("Viewpoint");

viewpointNode .set_bind    = true;
viewpointNode .description = "Initial View";
viewpointNode .position    = new X3D .SFVec3f (2.869677, 3.854335, 8.769781);
viewpointNode .orientation = new X3D .SFRotation (-0.7765887, 0.6177187, 0.1238285, 0.5052317);

scene .rootNodes .push (viewpointNode);

// Create Box:

const
   transformNode  = scene .createNode ("Transform"),
   shapeNode      = scene .createNode ("Shape"),
   appearanceNode = scene .createNode ("Appearance"),
   materialNode   = scene .createNode ("Material"),
   boxNode        = scene .createNode ("Box");

appearanceNode .material = materialNode;

shapeNode .appearance = appearanceNode;
shapeNode .geometry   = boxNode;

transformNode .children .push (shapeNode);

scene .rootNodes .push (transformNode);

// Give the node a name if you like.
scene .addNamedNode ("Box", transformNode);

// Create animation:

const
   timeSensorNode   = scene .createNode ("TimeSensor"),
   interpolatorNode = scene .createNode ("OrientationInterpolator");

timeSensorNode .cycleInterval = 10;
timeSensorNode .loop          = true;

for (let i = 0; i < 5; ++ i)
{
  interpolatorNode .key [i]      = i / 4;
  interpolatorNode .keyValue [i] = new X3D .SFRotation (0, 1, 0, Math .PI / 2 * i);
}

scene .rootNodes .push (timeSensorNode, interpolatorNode);

// Add routes:

scene .addRoute (timeSensorNode,   "fraction_changed", interpolatorNode, "set_fraction");
scene .addRoute (interpolatorNode, "value_changed",    transformNode,    "set_rotation");

// Show scene.

await browser .replaceWorld (scene);
</script>
<!-- x3d-canvas element comes here: -->
<x3d-canvas id="x_ite"></x3d-canvas>
```

### Example

And here you can see the result:

<x3d-canvas update="auto" contentScale="auto">
  <X3D profile='Interchange' version='{{ site.x3d_latest_version }}'>
    <head>
      <unit category='angle' name='degree' conversionFactor='0.017453292519943295'></unit>
    </head>
    <Scene>
      <Viewpoint
          description='Initial View'
          position='2.869677 3.854335 8.769781'
          orientation='-0.7765887 0.6177187 0.1238285 28.9476440862198'></Viewpoint>
      <Transform DEF='Box'
          rotation='0 1 0 0'>
        <Shape>
          <Appearance>
            <Material></Material>
          </Appearance>
          <Box></Box>
        </Shape>
      </Transform>
      <TimeSensor DEF='Timer'
          cycleInterval='10'
          loop='true'></TimeSensor>
      <OrientationInterpolator DEF='Rotor'
          key='0, 0.25, 0.5, 0.75, 1'
          keyValue='0 1 0 0, 0 1 0 90, 0 1 0 180, 0 1 0 270, 0 1 0 0'></OrientationInterpolator>
      <ROUTE fromNode='Timer' fromField='fraction_changed' toNode='Rotor' toField='set_fraction'></ROUTE>
      <ROUTE fromNode='Rotor' fromField='value_changed' toNode='Box' toField='set_rotation'></ROUTE>
    </Scene>
  </X3D>
</x3d-canvas>

## Documentation

A complete function reference for the X3DBrowser object and all other X3D JavaScript objects can be found in [ECMAScript Object and Function Definitions](/x_ite/reference/ecmascript-object-and-function-definitions/).

## Second Example

<iframe src="https://create3000.github.io/media/x_ite/external-browser/adrenaline.html"></iframe>

Adding HTML controls to your scene is no rocket science. We have added some HTML buttons below the x3d-canvas, which on click call a callback function.

### The JavaScript

```html
<script defer src="https://code.jquery.com/jquery-latest.js"></script>
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";

// Get X3DBrowser instance from x3d-canvas with class "browser".
const Browser = X3D .getBrowser (".browser");

// Fires when scene is loaded.
Browser .addBrowserCallback ("init", X3D .X3DConstants .INITIALIZED_EVENT, init);

function init ()
{
  const
    scene = Browser .currentScene,                      // Get the scene.
    timer = scene .getNamedNode ("SpinAnimationTimer"); // Get box TouchSensor node.

  $("#center")            .on ("click",  center);
  $("#change-style")      .on ("change", changeStyle);
  $("#change-background") .on ("change", changeBackground);
  $("#spin")              .on ("click",  spin);

  // Add a field callback to be notified when cycleTime is fired. "check" is an
  // arbitrary string to identify the callback, especially if you want to
  // remove the callback later.
  timer .addFieldCallback ("check", "cycleTime", value =>
  {
    console .log (`cycleTime: ${value}`);
  });

  changeStyle ();
  changeBackground ();
};

function center ()
{
  // Rebind viewpoint and remove user offsets.
  Browser .changeViewpoint ("Viewpoint");
}

function changeStyle ()
{
  const
    scene      = Browser .currentScene,                   // Get the scene.
    switchNode = scene .getNamedNode ("Adrenaline");      // Get Switch node.

  // Change styles.

  switchNode .whichChoice = parseInt ($("#change-style") .val ());
}

function changeBackground ()
{
  const
    scene          = Browser .currentScene,              // Get the scene.
    backgroundNode = scene .getNamedNode ("Background"); // Get Background node.

  switch (parseInt ($("#change-background") .val ()))
  {
    case 0:
      backgroundNode .skyColor [0] = new X3D .SFColor (1, 1, 1);
      break;
    case 1:
      backgroundNode .skyColor [0] = new X3D .SFColor (0, 0, 0);
      break;
  }
}

function spin ()
{
  const
    scene = Browser .currentScene,                      // Get the scene.
    timer = scene .getNamedNode ("SpinAnimationTimer"); // Get TimeSensor node.

  if (timer .isPaused)
    timer .resumeTime = Date .now () / 1000;
  else
    timer .pauseTime = Date .now () / 1000;
}
</script>
```

### The HTML

```html
<x3d-canvas src="external-browser.x3d"></x3d-canvas>

<div class="buttons">
  <button id="center" class="button">Center</button>
  <select id="change-style" class="button">
    <option value="0">Balls</option>
    <option value="1">Sticks And Balls</option>
    <option value="2">Sticks</option>
    <option value="3">Line</option>
  </select>
  <select id="change-background" class="button">
    <option value="0">White Background</option>
    <option value="1">Black Background</option>
  </select>
  <button id="spin" class="button">Spin</button>
</div>
```

The init function is called when the scene is loaded and installs a field callback that is called when the models are clicked. The various callback functions first obtains the different nodes and then alter a field of the nodes.

### Download

The scene defines different named nodes with the »DEF« attribute, which can be accessed later. Download <a download href="https://create3000.github.io/media/x_ite/external-browser/adrenaline.html">adrenaline.html</a> and <a download href="https://create3000.github.io/media/x_ite/external-browser/adrenaline.x3d">adrenaline.x3d</a>.

## See Also

* Another good example of using an external script is [Area Chart](/x_ite/laboratory/area-chart/). Here an entire scene is generated from data using only JavaScript.
