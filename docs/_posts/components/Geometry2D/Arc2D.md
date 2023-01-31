---
title: Arc2D
date: 2022-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Arc2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Arc2D is a geometry node that defines a linear circular arc with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis.

The Arc2D node belongs to the **Geometry2D** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Arc2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [ ] **startAngle** 0 <small>[-2π,2π]</small>

Arc extends from startAngle counterclockwise to endAngle, in radians.

#### Warning

Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFFloat [ ] **endAngle** π/2 <small>[-2π,2π]</small>

Arc extends from startAngle counterclockwise to endAngle, in radians.

#### Warning

Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFFloat [ ] **radius** 1 <small>(0,∞)</small>

Circle radius, of which the arc is a portion.

#### Warning

Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Geometry2D' level='2'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Arc2D/Arc2D.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Arc2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Arc2D){:target="_blank"}
