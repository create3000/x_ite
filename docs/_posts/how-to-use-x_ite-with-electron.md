---
title: How to Use X_ITE With Electron
date: 2023-09-12
nav: main
categories: []
tags: [Electron]
---
Embarking on your journey into [Electron](https://www.electronjs.org/docs/latest/api/app) app development? It's a great idea to be a bit familiar with Electron before you dive in. This foundational knowledge will help you get started smoothly and make your development process more efficient. Whether you're new to Electron or simply need a refresher, exploring the Electron documentation can be a valuable first step on your path to creating amazing Electron applications.

## What Files Are Needed?

To get started, there are at least 4 files needed to open an Electron window:

* app-folder
  * main.js
  * window.html
  * window.js
  * application.js

Let us now look at the individual files.

### main.js

Main entry point, in this file all begins, we will open a BrowserWindow and reference two other files here.

```js
"use strict";

const
  electron = require ("electron"),
  path     = require ('path');

async function main ()
{
   process .env .ELECTRON_ENABLE_LOGGING = 1;

   await electron .app .whenReady ();

   const window = new electron .BrowserWindow ({
      webPreferences: {
         preload: path .join (__dirname, "window.js"),
         nodeIntegration: true,
         contextIsolation: false,
      },
   });

   window .loadFile (path .join (__dirname, "window.html"));
}

main ();
```

### window.html

This is the HTML page, which will be displayed in your browser window.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body></body>
</html>
```

### window.js

A small wrapper to load application.js.

```js
"use strict";

window .addEventListener ("DOMContentLoaded", () =>
{
   require ("./application");
});
```

### application.js

Your browser window environment, where you can do the magic stuff to bring your app alive.

```js
"use strict";

const X3D = require ("x_ite");

/// Do something with window, document and X3D.

const
  canvas  = document .createElement ("x3d-canvas"),
  browser = canvas .browser;

document .appendChild (canvas);
browser .loadURL (new X3D .MFString ("path/to/world.x3d"));
```
