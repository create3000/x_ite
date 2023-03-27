---
title: Extrusion
date: 2022-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [Extrusion, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Extrusion is a geometry node stretching a 2D cross section along a 3D-spine path in the local coordinate system. Scaling/rotating cross-sections can produce a variety of shapes.

The Extrusion node belongs to the **Geometry3D** component and its default container field is *geometry.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Extrusion
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec2f [in] **set_crossSection** <small>(-∞,∞)</small>

An ordered set of 2D points drawing a piecewise-linear curve and forming a planar series of connected vertices. This provides a silhouette of the outer surface.

#### Warning

- Match clockwise/counterclockwise or impossible/inverted geometry can result!

### MFRotation [in] **set_orientation** <small>[-1,1] or (-∞,∞)</small>

Orientation is a list of axis-angle orientation 4-tuples applied at each spine-aligned cross-section plane.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

### MFVec2f [in] **set_scale** <small>(0,∞)</small>

Scale is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

#### Warning

- Zero or negative scale values not allowed.

### MFVec3f [in] **set_spine** <small>(-∞,∞)</small>

Spine is a list of 3D points for a piecewise-linear curve forming a series of connected vertices, open or closed. This is the path along which the crossSection is extruded.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

### SFBool [ ] **beginCap** TRUE

Whether beginning cap is drawn (similar to Cylinder top cap).

#### Warning

- Cannot be changed after initial creation.

### SFBool [ ] **endCap** TRUE

Whether end cap is drawn (similar to Cylinder end cap).

#### Warning

- Cannot be changed after initial creation.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* = counterclockwise: ordering of vertex-coordinates orientation.

#### Hint

- *ccw* false can reverse solid (backface culling) and normal-vector orientation.

### SFBool [ ] **convex** TRUE

Whether all polygons in a shape are convex (true), or possibly concave (false). A convex polygon is planar, does not intersect itself, and has all interior angles \< 180 degrees.

#### Warning

- Concave geometry may be invisible default convex=true.

### SFFloat [ ] **creaseAngle** 0 <small>[0,∞)</small>

*creaseAngle* defines angle (in radians) where adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than creaseAngle, smooth shading is rendered across the shared line segment.

#### Hint

- CreaseAngle=0 means render all edges sharply, creaseAngle=3.14159 means render all edges smoothly.

### MFVec2f [ ] **crossSection** [ 1 1, 1 -1, -1 -1, -1 1, 1 1 ] <small>(-∞,∞)</small>

An ordered set of 2D points drawing a piecewise-linear curve and forming a planar series of connected vertices. This provides a silhouette of the outer surface.

#### Warning

- Match clockwise/counterclockwise or impossible/inverted geometry can result!

### MFRotation [ ] **orientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

*orientation* is a list of axis-angle orientation 4-tuples applied at each spine-aligned cross-section plane.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

### MFVec2f [ ] **scale** 1 1 <small>(0,∞)</small>

*scale* is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

#### Warning

- Zero or negative scale values not allowed.

### MFVec3f [ ] **spine** [ 0 0 0, 0 1 0 ] <small>(-∞,∞)</small>

*spine* is a list of 3D points for a piecewise-linear curve forming a series of connected vertices, open or closed. This is the path along which the crossSection is extruded.

#### Hint

- Number of spine points, scale values and orientation values must be the same.

## Description

### Hint

- Insert a Shape node before adding geometry or Appearance.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry3D/Extrusion/Extrusion.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Extrusion](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Extrusion){:target="_blank"}
