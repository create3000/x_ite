---
title: Cone
date: 2022-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [Cone, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Cone is a geometry node.

The Cone node belongs to the **Geometry3D** component and its default container field is *geometry.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Cone
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [ ] **side** TRUE

Whether to draw sides (other inside faces are not drawn).

#### Warning

- Cannot be changed after initial creation.

### SFBool [ ] **bottom** TRUE

Whether to draw bottom (other inside faces are not drawn).

#### Warning

- Cannot be changed after initial creation.

### SFFloat [ ] **height** 2 <small>(0,∞)</small>

Size in meters.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFFloat [ ] **bottomRadius** 1 <small>(0,∞)</small>

Size in meters.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, for animation use Transform scale instead.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side! Solid false not supported in VRML97.

## Description

### Hint

- Insert a Shape node before adding geometry or Appearance.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry3D/Cone/Cone.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of Cone](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cone){:target="_blank"}
