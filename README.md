# [X_ITE](https://create3000.github.io/x_ite/) — X_ITE X3D Browser

## Introduction

X_ITE is an X3D JavaScript WebGL browser. It is a full standard X3D WebGL browser for all major web browsers, which also can be used as a VRML viewer.

🚀 For more information and live preview please have a look at the [Home Page](https://create3000.github.io/x_ite/).

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
```

## NPM Usage

```sh
$ npm install x_ite
```

It can be used in [Electron](https://www.electronjs.org) apps in the **renderer process** like this:

```js
const X3D = require ("x_ite")
```

Make sure that contextIsolation is set to **false** when creating a BrowserWindow instance.

## License

X_ITE is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License version 3](LICENSE.md) only, as published by the Free Software Foundation.
