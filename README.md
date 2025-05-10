# [X_ITE](https://create3000.github.io/x_ite/) X3D Browser

[![npm Version](https://badgen.net/npm/v/x_ite)](https://www.npmjs.com/package/x_ite)
[![Build Size](https://create3000.github.io/x_ite/assets/img/badges/compressed.svg)](https://create3000.github.io/x_ite/features/)
[![jsDelivr Hits](https://badgen.net/jsdelivr/hits/npm/x_ite)](https://www.jsdelivr.com/package/npm/x_ite)
[![npm Downloads](https://badgen.net/npm/dm/x_ite)](https://npmtrends.com/x_ite)
[![DeepScan grade](https://deepscan.io/api/teams/23540/projects/26814/branches/855447/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23540&pid=26814&bid=855447)

## Introduction

X_ITE is a comprehensive 3D library entirely written in JavaScript and uses WebGL for 3D rendering. Authors can publish X3D, VRML, glTF and [other 3D file formats](https://create3000.github.io/x_ite/#supported-file-formats) online within an HTML5 page with X_ITE that works with web browsers **without** prior plug-in installation. Since X3D is backwardly compatible, X_ITE can also be used as a VRML viewer.

🚀 For more information and a live preview, please visit our [home page](https://create3000.github.io/x_ite/).

## Funding

X_ITE needs your support. If you become a [Patreon](https://patreon.com/X_ITE), we can improve X_ITE even better, or simply subscribe to receive the latest news.

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
<script defer src="https://cdn.jsdelivr.net/npm/x_ite@11.5.6/dist/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@11.5.6/dist/x_ite.min.mjs";
</script>
```

>**Info:** It is no longer necessary to include the CSS file.

## Get it from NPM

To install, use the following command:

```console
$ npm install x_ite
```

Maybe you are curious now [how to use X_ITE with Electron](https://create3000.github.io/x_ite/how-to-use-x-ite-with-electron)?

Also try [x_ite-node](https://www.npmjs.com/package/x_ite-node), a pure Node.js version, without any dependencies on Electron or any browser. Suitable for just reading 3D files, analyzing, processing and generating X3D.

```console
$ npm install x_ite-node
```

## Usage

This script initializes an X3D canvas within an HTML page, configuring it to contain a scene, a camera and a geometric cube with default material properties. It then animates the rotation of the cube within the scene, ensuring that the camera captures the dynamic action.

### Declarative Syntax

```html
<script defer src="https://cdn.jsdelivr.net/npm/x_ite@11.5.6/dist/x_ite.min.js"></script>
<x3d-canvas update="auto" contentScale="auto">
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
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@11.5.6/dist/x_ite.min.mjs";

const
   browser = X3D .getBrowser (), // Get browser from first x3d-canvas element.
   scene   = await browser .createScene (browser .getProfile ("Interchange"), browser .getComponent ("Interpolation", 1));

// Change browser options:

browser .setBrowserOption ("AutoUpdate",   true);
browser .setBrowserOption ("ContentScale", -1);

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
<x3d-canvas></x3d-canvas>
```

## Contributing

Contributions are always welcome. There is no special form to do this. A good idea is to fork the X_ITE repository and create a separate branch from the `development` branch, make your changes and then make a pull request.

## License

X_ITE is free software and licensed under the [MIT License](LICENSE.md).

## See Also

* [x_ite-node](https://www.npmjs.com/package/x_ite-node) — Pure Node.js version of X_ITE
* [x3d-tidy](https://www.npmjs.com/package/x3d-tidy) — X3D converter, beautifier and minimizer
* [x3d-image](https://www.npmjs.com/package/x3d-image) — render image files from X3D
* [sunrize](https://www.npmjs.com/package/sunrize) — a multi-platform X3D editor
