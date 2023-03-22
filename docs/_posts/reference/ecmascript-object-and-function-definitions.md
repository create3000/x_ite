---
title: ECMAScript Object and Function Definitions
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Ecmascript, Object, Function, Definitions]
---
## Overview

There are a fixed set of objects in ECMAScript, each of which have a fixed set of properties (i.e. values) and methods (i.e. functions). For all object types except Math, there are functions to create an instance of the object. The supported set of objects are:

* [X3DCanvasElement](#X3DCanvasElement)
* [Browser Services](browser-services)
* [Scene Services](scene-services)
* [Field Services and Objects](field-services-and-objects)
* [Route Services](route-services)
* [Prototype Services](prototype-services)
* [Constants Services](constants-services)

## X3DCanvasElement

The X3DCanvasElement, \<x3d-canvas\>, is the main element that displays the X3D content. It defines some functions to be used with this object.

### Instance Creation Method\(s\)

An \<x3d-canvas\> can be created with the `document.createElement' function to get a reference to an X3DCanvasElement.

```js
const canvas = document .createElement ("x3d-canvas")
```

### Properties

#### **browser**

A reference to the X3DBrowser object that is associated with this element.

### Methods

#### MediaStream **captureStream** (*[Number frameRate]*) <small><span class="yellow">non standard</span></small>

See [HTMLCanvasElement.captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream){:target="_blank"}.

#### Blob **toBlob** (*Function callback, [String type, Number quality]*) <small><span class="yellow">non standard</span></small>

See [HTMLCanvasElement.toBlob()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob){:target="_blank"}.

#### String **toDataURL** (*[String type, Number encoderOptions]*) <small><span class="yellow">non standard</span></small>

See [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL){:target="_blank"}.
