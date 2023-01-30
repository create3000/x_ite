---
title: Circle2D
date: 2022-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Circle2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Circle2D is a geometry node that defines a linear X-Y circle with center (0,0) in X-Y plane.

The Circle2D node belongs to the **Geometry2D** component and its container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Circle2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [ ] **radius** 1 <small>(0,∞)</small>

Circle radius.

#### Warning

Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Geometry2D' level='2'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Circle2D/Circle2D.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Circle2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Circle2D){:target="_blank"}
