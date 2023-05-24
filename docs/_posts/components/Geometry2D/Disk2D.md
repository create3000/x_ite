---
title: Disk2D
date: 2022-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Disk2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Disk2D is a geometry node that defines a filled (or partially filled) planar circle with center (0,0).

The Disk2D node belongs to the **Geometry2D** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Disk2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [ ] **innerRadius** 0 <small>[0,∞)</small>

Inner circle radius, greater than or equal to 0.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFFloat [ ] **outerRadius** 1 <small>(0,∞)</small>

Outer radius of circle, greater than or equal to inner radius.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFBool [ ] **solid** FALSE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side! Solid false not supported in VRML97.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Geometry2D' level='2'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Disk2D/Disk2D.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of Disk2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Disk2D){:target="_blank"}
