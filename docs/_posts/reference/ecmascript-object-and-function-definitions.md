---
title: ECMAScript Object and Function Definitions
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [ECMAScript, Object, Function, Definitions, Authoring, Interface, Overview]
---
## Overview

There are a fixed set of objects in ECMAScript, each of which have a fixed set of properties (i.e. values) and methods (i.e. functions). For all object types except Math, there are functions to create an instance of the object. The supported set of objects are:

* [X3DCanvasElement](#x3dcanvaselement)
* [Browser Services](/x_ite/reference/browser-services/)
* [Scene Services](/x_ite/reference/scene-services/)
* [Field Services and Objects](/x_ite/reference/field-services-and-objects/)
* [Route Services](/x_ite/reference/route-services/)
* [Prototype Services](/x_ite/reference/prototype-services/)
* [Constants Services](/x_ite/reference/constants-services/)
* [Script Node Authoring Interface](/x_ite/reference/script-node-authoring-interface/)

## X3DCanvasElement

The X3DCanvasElement, \<x3d-canvas\>, is the main element that displays the X3D content. It defines some functions to be used with this object.

### Instance Creation Method\(s\)

An \<x3d-canvas\> can be created with the `document.createElement` function to get a reference to an X3DCanvasElement.

```js
const canvas = document .createElement ("x3d-canvas")
```

### Properties

#### **browser**

A reference to the X3DBrowser object that is associated with this element.

### Methods

#### MediaStream **captureStream** (*[Number frameRate]*)

See [HTMLCanvasElement.captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream){:target="_blank"}.

#### void **toBlob** (*Function callback, [String type, Number quality]*)

See [HTMLCanvasElement.toBlob()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob){:target="_blank"}.

#### String **toDataURL** (*[String type, Number encoderOptions]*)

See [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL){:target="_blank"}.
