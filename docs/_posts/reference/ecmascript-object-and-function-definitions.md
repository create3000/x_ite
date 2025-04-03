---
title: ECMAScript Object and Function Definitions
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [ECMAScript, Object, Function, Definitions, Authoring, Interface, Overview]
---
## Overview

There are a fixed set of objects in ECMAScript, each of which have a fixed set of properties (i.e. values) and methods (i.e. functions). For all object types except Math, there are functions to create an instance of the object. The supported set of objects are:

* [X3D Object](#x3d-object)
* [X3DCanvasElement](#x3dcanvaselement)
* [Browser Services](/x_ite/reference/browser-services/)
* [Scene Services](/x_ite/reference/scene-services/)
* [Field Services and Objects](/x_ite/reference/field-services-and-objects/)
* [Route Services](/x_ite/reference/route-services/)
* [Prototype Services](/x_ite/reference/prototype-services/)
* [Constants Services](/x_ite/reference/constants-services/)

### See Also

* [Script Node Authoring Interface](/x_ite/reference/script-node-authoring-interface/)

## X3D Object

The X3D object is the starting point for accessing objects and functions of X_ITE:

```js
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.mjs";
```

See [Accessing the External Browser](/x_ite/accessing-the-external-browser/) for how to use the X3D object.

### Properties

The X3D object has several properties, you can use any of the properties below.

#### **X3DConstants**

The X3DConstants object defines values that can be useful for scripting. See also [Constants Services](/x_ite/reference/constants-services/).

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

All X3DFields (SFColor, ..., MFBool, MFColor, and so on). The fields can be created using the object as constructor. If you want to know what fields are available, take a look at [Field Services and Objects](/x_ite/reference/field-services-and-objects/).

>**Note:** Scalar objects like SFBool, SFDouble, SFFloat, SFInt32, SFString, and SFTime have no constructor, just use the built-in JavaScript types Boolean, Number, and String.
{: .prompt-info }

```js
// Create a new translation vector and
// determine the length of this vector.

const
  translation = new X3D .SFVec3f (4, 2, 0),
  length      = translation .length ();
```

### Functions

#### **noConflict** (): X3D

In X_ITE's case, the `X3D` function object is the main entry function. If you need to use another JavaScript library alongside X_ITE, return control of the `X3D` function object back to the other library with a call to `X3D .noConflict ()`. Old references of `X3D` function object are saved during X_ITE initialization; `X3D .noConflict ()` simply restores them. The return value is the `X3D` function object itself.

If for some reason two versions of X_ITE are loaded (which is not recommended), calling `X3D .noConflict ()` from the second version will return the globally scoped `X3D` object to those of the first version.

```html
<script defer src="other_lib.js"></script>
<script defer src="x_ite.js"></script>
<script>
const X_ITE_X3D = X3D .noConflict ();
// Code that uses other library's X3D can follow here.
</script>
```

>**Tip:** If you use the ES6 module version with `import` then you no longer need this function.
{: .prompt-tip }

The following services can be used to establish a session and obtain the X3DBrowser object.

#### **getBrowser** (*selector: string*): X3DBrowser

The *selector* argument must be a string containing a valid CSS selector expression to match elements against. If no selector was given, »x3d-canvas« is used as selector string. The return value is the appropriate X3DBrowser object.

```js
// Obtain X3DBrowser object of first x3d-canvas element.
const Browser = X3D .getBrowser ();
```

#### **getBrowser** (*element: HTMLElement*): X3DBrowser

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

#### **createBrowser** (): X3DCanvasElement

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

## X3DCanvasElement

The X3DCanvasElement, \<x3d-canvas\>, is the main element that displays the X3D content. It defines some functions to be used with this object.

### Instance Creation Method(s)

An \<x3d-canvas\> can be created with the `document.createElement` function to get a reference to an X3DCanvasElement.

```js
const canvas = document .createElement ("x3d-canvas");
```

### Attributes

The X3DCanvasElement defines several attributes [that are documented here](/x_ite/#attributes-of-the-x3d-canvas-element).

### Properties

#### **browser**: X3DBrowser

A reference to the [X3DBrowser](/x_ite/reference/browser-services/#browser-object) object that is associated with this element. This property is read only.

### Methods

#### **captureStream** (*frameRate?: number*): MediaStream

See [HTMLCanvasElement.captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream).

#### **toBlob** (*callback: (blob: Blob) => void, type?: string, quality?: number*): void

See [HTMLCanvasElement.toBlob()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob).

#### **toDataURL** (*type?: string, encoderOptions?: number*): string

See [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).
