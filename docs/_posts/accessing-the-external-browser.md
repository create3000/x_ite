---
title: Accessing the External Browser
date: 2022-11-28
nav: main
categories: []
tags: [Accessing, External, Browser]
---

## Overview

X_ITE is designed to provide access to the internal X3D browser and its contained scene graph via JavaScript, either within an internal X3D Script node or an external HTML script.

If you want combine DOM access with X3D access in your JavaScript functions then you probably want to access the external browser object if you want include an external JavaScript file in your HTML page and you don't wanna do it directly a in Script node.

## Introduction

There is the X3D object which is always available, it expects one function handler that is called when the browsers (\<x3d-canvas\> elements) are ready, and a second function handler, that is called if an error occurred. These two arguments are optional. The return value of the X3D function is a Promise, which can be used instead of the arguments.

```js
Promise<void> X3D ([callback[, errorCallback]]);
```

The callback function is called when the browser is available. The callback function takes no arguments. The error callback is called if an error occurred, it has one argument *error.*

```js
function callback ()
function errorCallback (error)
```

The external browser can be accessed by calling the `X3D .getBrowser (selector)` function, *selector* can be any CSS selector, if you have only one \<x3d-canvas\> element on your page, you can omit the selector argument:

```html
<script>

X3D (function ()
{
  // Now, X3D is ready. We can get access to the browser object.

  const Browser = X3D .getBrowser ();

  Browser .loadURL (new X3D .MFNode ("/path/to/your/world.x3dv"),
                    new X3D .MFNode ());
});

</script>
```

If something went wrong, the error callback is called:

```html
<script>

X3D (function ()
{
  const
    Browser      = X3D .getBrowser (),                         // X3DBrowser object
    currentScene = Browser .currentScene,                      // X3DScene object
    header       = currentScene .getNamedNode ("HeaderText");  // Text node

  // Set string field of Text node to new value.
  header .string [0] = "Welcome to X_ITE!";

  ...
},
function (error)
{
  // Error callback, no browser.
  console .error (error);
});

</script>
```

### Async use of X3D object

```js
async function foo (url)
{
  await X3D ();

  const Browser = X3D .getBrowser ();

  await Browser .loadURL (new MFString (url));

  console .log (`Done loading scene '${Browser .currentScene .worldURL}'.`);
}
```

## X3D Object

### Functions

#### X3D **noConflict** ()

In X_ITE's case, the `X3D` function object is the main entry function. If you need to use another JavaScript library alongside X_ITE, return control of the `X3D` function object back to the other library with a call to `X3D .noConflict ()`. Old references of `X3D` function object are saved during X_ITE initialization; `X3D .noConflict ()` simply restores them. The return value is the `X3D` function object itself.

If for some reason two versions of X_ITE are loaded (which is not recommended), calling `X3D .noConflict ()` from the second version will return the globally scoped `X3D` object to those of the first version.

```html
<script src="other_lib.js"></script>
<script src="x_ite.js"></script>
<script>
const X_ITE_X3D = X3D .noConflict ();
// Code that uses other library's X3D can follow here.
</script>
```

The following services can be used to establish a session and obtain the X3DBrowser object.

#### X3DBrowser **getBrowser** (*[selector : String]*)

The *selector* argument must be a string containing a valid CSS selector expression to match elements against. If no selector was given, »x3d-canvas« is used as selector string. The return value is the appropriate X3DBrowser object.

```js
// Obtain X3DBrowser object of first x3d-canvas element.
const Browser = X3D .getBrowser ();
```

#### X3DBrowser **getBrowser** (*element : Object*)

Given a DOM element that represents a x3d-canvas element, the getBrowser function returns the appropriate X3DBrowser object.

```js
// Query all x3d-canvas elements within the HTML page.
const canvases = document .querySelectorAll ("x3d-canvas");

for (const canvas of canvases)
{
  // Obtain X3DBrowser object of element i.
  const Browser = X3D .getBrowser (canvas);
  ...
}
```

#### Object **createBrowser** ()

Creates a new x3d-canvas DOM element, initializes it and returns it. Throws an exception if the browser object cannot be created.

```js
function addBrowser (parent)
{
   // Create a new x3d-canvas element.
   const canvas = X3D .createBrowser ();

   canvas .setAttribute ("src", "/my/world.x3d");

   parent .appendChild (canvas);
}
```

### Objects

The X3D object has several properties, you can use any of the properties below.

#### **X3DConstants**

The X3DConstants object defines values that can be useful for scripting. See also [Constants Services](reference/constants-services).

```js
function foo (node)
{
  // Get node type array.

  const types = node .getNodeType () .reverse ();

  // Iterate over node type array in reverse order with
  // concrete node types as first and abstract node
  // types as last index.

  for (const type of types)
  {
    switch (type)
    {
      case X3D .X3DConstants .Transform:
        // node is of type Transform.
        ...
        break;
      case X3D .X3DConstants .X3DLightNode:
        //  node is at least of type X3DLightNode.
        ...
        break;
    }
  }
}
```

#### **X3DFields**

All X3DFields (SFColor, ..., MFBool, MFColor, and so on). The fields can be created using the object as constructor. See also [Field Services and Objects](reference/field-services-and-objects).

>**Note:** Scalar objects like SFBool, SFDouble, SFFloat, SFInt32, SFString, and SFTime have no constructor, just use the built-in JavaScript types Boolean, Number, and String.
{: .prompt-info }

```js
// Create a new translation vector and
// determine the length of this vector.

const
  translation = new X3D .SFVec3f (4, 2, 0),
  length      = translation .length ();
```

## Function Reference

A complete function reference for the X3DBrowser object and all other X3D JavaScript objects can be found in [ECMAScript Object and Function Definitions](reference/ecmascript-object-and-function-definitions).

## Example

<iframe src="https://create3000.github.io/media/x_ite/external-browser/adrenaline.html"></iframe>

Adding HTML controls to your scene is no rocket science. We have added some HTML buttons below the x3d-canvas, which on click call a callback function.

### The JavaScript

```html
<script>
function init ()
{
  const
    Browser = X3D .getBrowser (".browser"),               // Get the browser instance.
    scene   = Browser .currentScene,                      // Get the scene.
    timer   = scene .getNamedNode ("SpinAnimationTimer"); // Get box TouchSensor node.

  // Add field callback to get informed when cycleTime is fired. "time" is an arbitrary
  // string to identify the callback, for instance if you later want to remove the callback.
  timer .addFieldCallback ("cycleTime", "time", function (value)
  {
    console .log ("cycleTime: " + value);
  });

  changeStyle ();
  changeBackground ();
}

function center ()
{
  const Browser = X3D .getBrowser (".browser"); // Get the browser instance.

  Browser .changeViewpoint ("Viewpoint");
}

function changeStyle ()
{
  const
    Browser    = X3D .getBrowser (".browser"),            // Get the browser instance.
    scene      = Browser .currentScene,                   // Get the scene.
    switchNode = scene .getNamedNode ("Adrenaline");      // Get Switch node.

  // Change styles.

  switchNode .whichChoice = parseInt ($("#change-style") .val ());
}

function changeBackground ()
{
  const
    Browser        = X3D .getBrowser (".browser"),            // Get the browser instance.
    scene          = Browser .currentScene,                   // Get the scene.
    backgroundNode = scene .getNamedNode ("Background");      // Get Background node.

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
    Browser = X3D .getBrowser (".browser"),               // Get the browser instance.
    scene   = Browser .currentScene,                      // Get the scene.
    timer   = scene .getNamedNode ("SpinAnimationTimer"); // Get TimeSensor node.

  if (timer .isPaused)
    timer .resumeTime = Date .now () / 1000;
  else
    timer .pauseTime = Date .now () / 1000;
}
</script>
```

### The HTML

```html
<x3d-canvas src="external-browser.x3d" onload="init ()"></x3d-canvas>

<div class="buttons">
  <button id="center" class="button" onclick="center ()">Center</button>
  <select id="change-style" class="button" onchange="changeStyle ()">
    <option value="0">Balls</option>
    <option value="1">Sticks And Balls</option>
    <option value="2">Sticks</option>
    <option value="3">Line</option>
  </select>
  <select id="change-background" class="button" onchange="changeBackground ()">
    <option value="0">White Background</option>
    <option value="1">Black Background</option>
  </select>
  <button id="spin" class="button" onclick="spin ()">Spin</button>
</div>
```

The init function is called when the scene is loaded and installs a field callback that is called when the models are clicked. The various callback functions first obtains the different nodes and then alter a field of the nodes.

### The X3D

The scene defines different named nodes with the »DEF« attribute, which can be accessed later. Download [adrenaline.x3d](https://create3000.github.io/media/x_ite/external-browser/adrenaline.x3d).
