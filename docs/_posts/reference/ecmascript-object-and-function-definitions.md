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

See [Accessing the External Browser](/x_ite/accessing-the-external-browser/#x3d-object) for properties and methods of the X3D object.

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
