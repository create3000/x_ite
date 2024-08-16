---
title: Extrusion
date: 2023-01-07
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

Extrusion is a geometry node that sequentially stretches a 2D cross section along a 3D-spine path in the local coordinate system, creating an outer hull. Scaling and rotating the crossSection 2D outline at each control point can modify the outer hull of the Extrusion to produce a wide variety of interesting shapes.

The Extrusion node belongs to the **Geometry3D** component and requires at least level **4,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Extrusion
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec2f [in] **set_crossSection** <small>(-∞,∞)</small>

The *crossSection* array defines a silhouette outline of the outer Extrusion surface. *crossSection* is an ordered set of 2D points that draw a piecewise-linear curve which is extruded to form a series of connected vertices.

#### Hint

- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warnings

- If the order of *crossSection* point definition does not match clockwise/counterclockwise setting of ccw field, then self-intersecting, impossible or inverted geometry can result!
- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFRotation [in] **set_orientation** <small>[-1,1] or (-∞,∞)</small>

The *orientation* array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.

#### Hints

- If the *orientation* array contains a single 4-tuple value, it is applied at all spine-aligned crossSection planes.
- Number of values must all match for 3-tuple spine points, 2-tuple scale values, and 4-tuple *orientation* values.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFVec2f [in] **set_scale** <small>(0,∞)</small>

*scale* is a list of 2D-*scale* parameters applied at each spine-aligned cross-section plane.

#### Hints

- Number of values must all match for 3-tuple spine points, 2-tuple *scale* values, and 4-tuple orientation values.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warnings

- Zero or negative *scale* values not allowed.
- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFVec3f [in] **set_spine** <small>(-∞,∞)</small>

The *spine* array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices. The *spine* is set of points along which a 2D crossSection is extruded, scaled and oriented.

#### Hints

- The *spine* array can be open or closed (closed means that endpoints are coincident).
- Number of values must all match for 3-tuple *spine* points, 2-tuple scale values, and 4-tuple orientation values.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warnings

- Special care is needed if creating loops or spirals since self-intersecting, impossible or inverted geometry can result!
- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [ ] **beginCap** TRUE

Whether beginning cap is drawn (similar to [Cylinder](/x_ite/components/geometry3d/cylinder/) top cap).

#### Warning

- Since this field has accessType initializeOnly, the value cannot be changed after initial creation.

### SFBool [ ] **endCap** TRUE

Whether end cap is drawn (similar to [Cylinder](/x_ite/components/geometry3d/cylinder/) bottom cap).

#### Warning

- Since this field has accessType initializeOnly, the value cannot be changed after initial creation.

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

The *ccw* field indicates counterclockwise ordering of vertex-coordinates orientation.

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise)

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFBool [ ] **convex** TRUE

The *convex* field is a hint to renderers whether all polygons in a shape are *convex* (true), or possibly concave (false). A *convex* polygon is planar, does not intersect itself, and has all interior angles \< 180 degrees.

#### Hints

- Concave is the opposite of *convex*.
- Select *convex*=false (i.e. concave) and solid=false (i.e. two-sided display) for greatest visibility of geometry.
- [*convex* polygon](https://en.wikipedia.org/wiki/Convex_polygon)
- [Tessellation](https://en.wikipedia.org/wiki/Tessellation)

#### Warning

- Concave or inverted geometry may be invisible when using default value *convex*=true, since some renderers use more-efficient algorithms to perform tessellation that may inadvertently fail on concave geometry.

### SFFloat [ ] **creaseAngle** 0 <small>[0,∞)</small>

*creaseAngle* defines angle (in radians) where adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than *creaseAngle*, smooth shading is rendered across the shared line segment.

#### Hints

- *creaseAngle*=0 means render all edges sharply, *creaseAngle*=3.14159 means render all edges smoothly.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### MFVec2f [ ] **crossSection** [ 1 1, 1 -1, -1 -1, -1 1, 1 1 ] <small>(-∞,∞)</small>

The *crossSection* array defines a silhouette outline of the outer Extrusion surface. *crossSection* is an ordered set of 2D points that draw a piecewise-linear curve which is extruded to form a series of connected vertices.

#### Hints

- The *crossSection* array can be open or closed (closed means that endpoints are coincident).
- Number of values must all match for 3-tuple spine points, 2-tuple scale values, and 4-tuple orientation values.

#### Warnings

- If the order of *crossSection* point definition does not match clockwise/counterclockwise setting of ccw field, then self-intersecting, impossible or inverted geometry can result!
- Avoid self-intersecting polygon line segments, otherwise defined geometry is irregular and rendering results are undefined (especially for end caps).

### MFRotation [ ] **orientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

The *orientation* array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.

#### Hints

- If the *orientation* array contains a single 4-tuple value, it is applied at all spine-aligned crossSection planes.
- Number of values must all match for 3-tuple spine points, 2-tuple scale values, and 4-tuple *orientation* values.

### MFVec2f [ ] **scale** 1 1 <small>(0,∞)</small>

*scale* is a list of 2D-*scale* parameters applied at each spine-aligned cross-section plane.

#### Hints

- Number of values must all match for 3-tuple spine points, 2-tuple *scale* values, and 4-tuple orientation values.
- If the *scale* array contains one value, it is applied at all spine-aligned crossSection planes.

#### Warning

- Zero or negative *scale* values not allowed.

### MFVec3f [ ] **spine** [ 0 0 0, 0 1 0 ] <small>(-∞,∞)</small>

The *spine* array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices. The *spine* is set of points along which a 2D crossSection is extruded, scaled and oriented.

#### Hints

- The *spine* array can be open or closed (closed means that endpoints are coincident).
- Number of values must all match for 3-tuple *spine* points, 2-tuple scale values, and 4-tuple orientation values.
- If a *spine* is closed (or nearly closed) then the inner diameter usually needs to be greater than the corresponding crossSection width.

#### Warnings

- Special care is needed if creating loops or spirals since self-intersecting, impossible or inverted geometry can result!
- Ensure that *spine* segments have non-zero length and are not coincident with each other.

## Advice

### Hints

- [Extrusion](https://en.wikipedia.org/wiki/Extrusion)
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

### Warning

- Take care to avoid defining parameter combinations that create self-intersecting, impossible or inverted geometry.

## Example

<x3d-canvas class="br" src="https://create3000.github.io/media/examples/Geometry3D/Extrusion/Extrusion.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry3D/Extrusion/Extrusion.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry3D/Extrusion/Extrusion.x3d)
{: .example-links }

## See Also

- [X3D Specification of Extrusion Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Extrusion)
