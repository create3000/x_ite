## Accessing the External Browser

X\_ITE is designed to provide access to the internal X3D browser and its contained scene graph via JavaScript, either within an internal X3D Script node or an external HTML script.

If you want combine DOM access with X3D access in your JavaScript functions then you probably want to access the external browser object if you want include an external JavaScript file in your HTML page and you don't wanna do it directly a in Script node.

## Introduction

There is the X3D object which is always available, it expects at least one function handler that is called when the browsers (&lt;X3DCanvas&gt; elements) are ready, or the second function handler is called if an error occurred.

```js
X3D (callback[, errorCallback]);
```

The callback function is called when the browser is available. The callback function takes no arguments. The error callback is called if an error occurred, it has one argument *error.*

```js
function callback ()
function errorCallback (error)
```

The external browser can be accessed by calling the **X3D.getBrowser(*selector*)** function, *selector* can be any CSS selector:

```html
<script type="text/javascript">

X3D (function ()
{
  // Now, X3D is ready. We can get access to the browser object.

  const Browser = X3D .getBrowser ("X3DCanvas.browser");

  Browser .loadURL (new X3D .MFNode ("/path/to/your/world.x3dv"),
                    new X3D .MFNode ());
});

</script>
```

If something went wrong, the error callback is called:

```html
<script type="text/javascript">

X3D (function ()
{
  const
    Browser      = X3D .getBrowser ("#browser"),               // X3DBrowser object
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

## X3D Object

### Functions

#### X3D **noConflict** ()

In X\_ITE's case, the `X3D` function object is the main entry function. If you need to use another JavaScript library alongside X\_ITE, return control of the `X3D` function object back to the other library with a call to `X3D .noConflict ()`. Old references of `X3D` function object are saved during X\_ITE initialization; `X3D .noConflict ()` simply restores them. The return value is the `X3D` function object itself.

If for some reason two versions of X\_ITE are loaded (which is not recommended), calling `X3D .noConflict ()` from the second version will return the globally scoped `X3D` object to those of the first version.

```html
<script src="other_lib.js"></script>
<script src="x_ite.js"></script>
<script>
const XITE = X3D .noConflict ();
// Code that uses other library's X3D can follow here.
</script>
```

The following services can be used to establish a session and obtain the X3DBrowser object.

#### X3DBrowser **getBrowser** (\[*selector : String\]*)

The *selector* argument must be a string containing a valid CSS selector expression to match elements against. If no selector was given, »X3DCanvas« is used as selector string. The return value is the appropriate X3DBrowser object.

```js
// Obtain X3DBrowser object of X3DCanvas element with id »browser«.
const Browser = X3D .getBrowser ("X3DCanvas#browser");
```

#### X3DBrowser **getBrowser** (*element : Object*)

Given a DOM element that represents a X3DCanvas element, the getBrowser function returns the appropriate X3DBrowser object.

```js
// Query all X3DCanvas elements within the HTML page.
const x3dcanvases = document .querySelectorAll ("X3DCanvas");

for (const x3dcanvase of x3dcanvases)
{
  // Obtain X3DBrowser object of element i.
  const Browser = X3D .getBrowser (x3dcanvase);
  ...
}
```

#### Object **createBrowser** ()

Creates a new X3DCanvas DOM element, initializes it and returns it. Throws an exception if the browser object cannot be created.

```js
function addBrowser (parent)
{
   // Create a new X3DCanvas element.
   const x3dcanvas = X3D .createBrowser ();

   x3dcanvas .setAttribute ("src", "/my/world.x3d");

   parent .appendChild (x3dcanvas);
}
```

### Objects

The X3D object has several properties, you can use any of the properties below.

#### **X3DConstants**

The X3DConstants object defines values that can be useful for scripting.

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

All X3DFields (SFColor, ..., MFBool, MFColor, and so on). The fields can be created using the object as construtor. **Note:** Scalar objects like SFBool, SFDouble, SFFloat, SFInt32, SFString, and SFTime have no constructor, just use the built-in JavaScript types Boolean, Number, and String.

```js
// Create a new translation vector and
// determine the length of this vector.

const
  translation = new X3D .SFVec3f (4, 2, 0),
  length      = translation .length ();
```

## Function Reference

A complete function reference for the X3DBrowser object and all other X3D JavaScript objects can be found [here](/x_ite/ECMAScript-Object-and-Function-Definitions.html).

## Example

[![Adrenaline Molecule in 3D](https://create3000.github.io/media/x_ite/external-browser/external-browser.png)](https://create3000.github.io/media/x_ite/external-browser/external-browser.html)

[View scene in this window.](https://create3000.github.io/media/x_ite/external-browser/external-browser.html)

Adding HTML controls to your scene is no rocket science. We have added some HTML buttons below the X3DCanvas, which on click call a callback function.

### The JavaScript

```js
<script type="text/javascript">
function init ()
{
  const
    Browser = X3D .getBrowser ("X3DCanvas"),              // Get the browser instance.
    scene   = Browser .currentScene,                      // Get the scene.
    timer   = scene .getNamedNode ("SpinAnimationTimer"); // Get box TouchSensor node.

  // Add field callback to get informed when cycleTime is fired. "time" is an arbitrary
  // string to identify the callback, for intance if you later want to remove the callback.
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
<X3DCanvas src="external-browser.x3d" onload="init ()"/>

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
