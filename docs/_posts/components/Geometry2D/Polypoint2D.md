---
title: Polypoint2D
date: 2022-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Polypoint2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Polypoint2D is a geometry node that defines a set of 2D points in X-Y plane.

The Polypoint2D node belongs to the **Geometry2D** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Polypoint2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec2f [in, out] **point** [ ] <small>(-∞,∞)</small>

2D coordinates of vertices.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

## Description

### Hint

- Insert a Shape node before adding geometry or Appearance.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/Polypoint2D.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Polypoint2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Polypoint2D){:target="_blank"}
