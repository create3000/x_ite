# [X_ITE](https://create3000.github.io/x_ite/) — X_ITE X3D Browser

[![npm Version](https://badgen.net/npm/v/x_ite)](https://www.npmjs.com/package/x_ite)
[![Build Size](https://badgen.net/bundlephobia/minzip/x_ite)](https://bundlephobia.com/package/x_ite)
[![jsDelivr Hits](https://badgen.net/jsdelivr/hits/npm/x_ite)](https://www.jsdelivr.com/package/npm/x_ite)
[![npm Downloads](https://badgen.net/npm/dm/x_ite)](https://npmtrends.com/x_ite)
[![DeepScan grade](https://deepscan.io/api/teams/23540/projects/26814/branches/855447/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23540&pid=26814&bid=855447)

## Introduction

X_ITE is a X3D JavaScript WebGL browser. It is a full standard X3D WebGL browser for all major web browsers, which can also be used as a VRML viewer.

🚀 For more information and a live preview, please visit our [home page](https://create3000.github.io/x_ite/).

## Quick Links

* [Getting Started](https://create3000.github.io/x_ite/)
* [Supported Nodes](https://create3000.github.io/x_ite/supported-nodes)
* [Accessing the External Browser](https://create3000.github.io/x_ite/accessing-the-external-browser)
* [DOM Integration](https://create3000.github.io/x_ite/dom-integration)
* [Custom Shaders](https://create3000.github.io/x_ite/custom-shaders)

## GitHub CDN

GitCDN serves raw files directly from GitHub with proper Content-Type headers and a super fast CDN!

### Latest Stable Version

If you are a developer or you always wanna be up to date:

```html
<script src="https://create3000.github.io/code/x_ite/latest/x_ite.min.js"></script>
<!-- or as ES module for use in scripts -->
<script type="module">
import X3D from "https://create3000.github.io/code/x_ite/latest/x_ite.min.mjs";
</script>
```

>**Info:** It is no longer necessary to include the CSS file.

## Usage

This script initializes an X3D canvas, configuring it to include a scene, a camera, and a geometric cube with default material properties. Subsequently, it proceeds to animate the cube's rotation within the scene, ensuring the camera captures the dynamic action.

```html
<script src="https://create3000.github.io/code/x_ite/latest/x_ite.min.js"></script>
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
          rotation='0 1 0 220.572020530701'>
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

## NPM Usage

```sh
$ npm install x_ite
```

Maybe you are curious now [how to use X_ITE with Electron](https://create3000.github.io/x_ite/how-to-use-x-ite-with-electron)?

## Funding

X_ITE needs your support. If you become a [Patreon](https://patreon.com/X_ITE), we can improve X_ITE even better.

## License

X_ITE is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License version 3](LICENSE.md) only, as published by the Free Software Foundation.

## See Also

* [x3d-tidy](https://www.npmjs.com/package/x3d-tidy) — X3D converter, beautifier and minimizer
* [x3d-image](https://www.npmjs.com/package/x3d-image) — render image files from X3D
* [sunrize](https://www.npmjs.com/package/sunrize) — a multi-platform X3D editor
