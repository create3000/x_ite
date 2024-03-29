# [X_ITE](https://create3000.github.io/x_ite/) — X_ITE X3D Browser

[![NPM Version](https://img.shields.io/npm/v/x_ite)](https://www.npmjs.com/package/x_ite)
[![Build Size](https://badgen.net/bundlephobia/minzip/x_ite)](#)
[![Build Size](https://deno.bundlejs.com/?q=x_ite&badge)](#)
[![NPM Downloads](https://img.shields.io/npm/dw/x_ite)](https://npmtrends.com/x_ite)
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

This code creates a X3D canvas with a scene, a camera, and a geometric cube with default material.

```html
<script src="https://create3000.github.io/code/x_ite/latest/x_ite.min.js"></script>
<x3d-canvas>
  <X3D profile='Interactive' version='4.0'>
    <Scene>
      <Viewpoint
          description='Initial View'></Viewpoint>
      <Transform>
        <Shape>
          <Appearance>
            <Material></Material>
          </Appearance>
          <Box></Box>
        </Shape>
      </Transform>
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
* [x3d-image](https://www.npmjs.com/package/x3d-image) — Render image files from X3D
* [sunrize](https://www.npmjs.com/package/sunrize) — A Multi-Platform X3D Editor
