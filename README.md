# [X_ITE](https://create3000.github.io/x_ite/) X3D Browser

[![npm Version](https://badgen.net/npm/v/x_ite)](https://www.npmjs.com/package/x_ite)
[![Build Size](https://create3000.github.io/x_ite/assets/img/badges/compressed.svg)](https://create3000.github.io/x_ite/features/)
[![jsDelivr Hits](https://badgen.net/jsdelivr/hits/npm/x_ite)](https://www.jsdelivr.com/package/npm/x_ite)
[![npm Downloads](https://badgen.net/npm/dm/x_ite)](https://npmtrends.com/x_ite)
[![DeepScan grade](https://deepscan.io/api/teams/23540/projects/26814/branches/855447/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23540&pid=26814&bid=855447)

## Introduction

X_ITE is a robust X3D JavaScript WebGL browser that is compatible with all major web browsers and can be used as a [full standard](https://www.web3d.org/standards) X3D browser as well as a glTF and VRML viewer and for [other 3D file formats](https://create3000.github.io/x_ite/#supported-file-formats).

🚀 For more information and a live preview, please visit our [home page](https://create3000.github.io/x_ite/).

## Funding

X_ITE needs your support. If you become a [Patreon](https://patreon.com/X_ITE), we can improve X_ITE even better.

## Quick Links

* [Getting Started](https://create3000.github.io/x_ite/)
* [Supported Nodes](https://create3000.github.io/x_ite/supported-nodes)
* [Accessing the External Browser](https://create3000.github.io/x_ite/accessing-the-external-browser)
* [DOM Integration](https://create3000.github.io/x_ite/dom-integration)
* [Custom Shaders](https://create3000.github.io/x_ite/custom-shaders)
* [glTF Sample Viewer](https://create3000.github.io/x_ite/laboratory/gltf-sample-viewer/)

## Using X_ITE with a CDN

Using a CDN improves website performance, reliability, and security by caching content closer to users, distributing traffic loads, and providing protection against attacks.

If you are going to use X_ITE in a production environment, you should use a fixed version of X_ITE. You can get a list of all available versions [here on npm](https://www.npmjs.com/package/x_ite?activeTab=versions).

### jsDelivr CDN

jsDelivr is an open-source content delivery network (CDN) renowned for its no-cost access, swift performance, and reliable service.

```html
<script src="https://cdn.jsdelivr.net/npm/x_ite@10.5.3/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@10.5.3/dist/x_ite.min.mjs";
</script>
```

>**Info:** It is no longer necessary to include the CSS file.

## Get it from NPM

To install, use the following command:

```console
$ npm install x_ite
```

Maybe you are curious now [how to use X_ITE with Electron](https://create3000.github.io/x_ite/how-to-use-x-ite-with-electron)?

## Usage

This script initializes an X3D canvas within an HTML page, configuring it to contain a scene, a camera and a geometric cube with default material properties. It then animates the rotation of the cube within the scene, ensuring that the camera captures the dynamic action.

### Declarative Syntax

```html
<script src="https://cdn.jsdelivr.net/npm/x_ite@10.5.3/dist/x_ite.min.js"></script>
<x3d-canvas>
  <X3D profile='Interchange' version='4.0'>
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

The same scene can also be created using pure JavaScript:

```html
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@10.5.3/dist/x_ite.min.mjs";

const
   browser = X3D .getBrowser (),
   scene   = browser .currentScene;

scene .setProfile (browser .getProfile ("Interchange"));
scene .addComponent (browser .getComponent ("Interpolation", 1));

await browser .loadComponents (scene);

// Viewpoint

const viewpointNode = scene .createNode ("Viewpoint");

viewpointNode .set_bind    = true;
viewpointNode .description = "Initial View";
viewpointNode .position    = new X3D .SFVec3f (2.869677, 3.854335, 8.769781);
viewpointNode .orientation = new X3D .SFRotation (-0.7765887, 0.6177187, 0.1238285, 0.5052317);

scene .rootNodes .push (viewpointNode);

// Box

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

// Animation

const
   timeSensorNode   = scene .createNode ("TimeSensor"),
   interpolatorNode = scene .createNode ("OrientationInterpolator");

timeSensorNode .cycleInterval = 10;
timeSensorNode .loop          = true;

for (let i = 0; i < 5; ++ i)
{
  interpolatorNode .key [i]      = i / 4;
  interpolatorNode .keyValue [i] = new X3D .SFRotation (0, 1, 0, Math .PI * i / 2);
}

scene .rootNodes .push (timeSensorNode, interpolatorNode);

// Routes

scene .addRoute (timeSensorNode,   "fraction_changed", interpolatorNode, "set_fraction");
scene .addRoute (interpolatorNode, "value_changed",    transformNode,    "set_rotation");
</script>
<!-- x3d-canvas element comes here: -->
<x3d-canvas></x3d-canvas>
```

## License

X_ITE is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License version 3](LICENSE.md) only, as published by the Free Software Foundation.

## See Also

* [x3d-tidy](https://www.npmjs.com/package/x3d-tidy) — X3D converter, beautifier and minimizer
* [x3d-image](https://www.npmjs.com/package/x3d-image) — render image files from X3D
* [sunrize](https://www.npmjs.com/package/sunrize) — a multi-platform X3D editor
