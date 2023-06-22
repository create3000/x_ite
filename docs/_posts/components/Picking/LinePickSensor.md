---
title: LinePickSensor
date: 2022-01-07
nav: components-Picking
categories: [components, Picking]
tags: [LinePickSensor, Picking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LinePickSensor uses one or more pickingGeometry line segments to compute intersections with pickTarget shapes. As each line intersection generates a known point in space, useful event information is returned including normal, geometry and texCoord values.

The LinePickSensor node belongs to the **Picking** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPickSensorNode
        + LinePickSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFString [in, out] **objectType** "ALL" <small>["ALL","NONE"|"TERRAIN"|...]</small>

The objectType field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances.

#### Hints

- Authors may define any value for objectType. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFString [in, out] **matchCriterion** "MATCH_ANY" <small>["MATCH_ANY"|"MATCH_EVERY"|"MATCH_ONLY_ONE"]</small>

Defines whether the intersection test (i.e. pick) by this X3DPickSensorNode must match one or more objectType. Specifically MATCH_ANY means any match of objectType values is acceptable, MATCH_EVERY means that every objectType value in this node shall match an objectType value in the X3DPickableObject, and MATCH_ONLY_ONE means that one and only one objectType value can match.

### SFString [ ] **intersectionType** "BOUNDS" <small>["GEOMETRY"|"BOUNDS"|...]</small>

*intersectionType* specifies precision of the collision computation.

#### Hint

- IntersectionType constants may be extended by the browser to provide additional options.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [ ] **sortOrder** "CLOSEST" <small>["ANY"|"CLOSEST"|"ALL"|"ALL_SORTED"]</small>

The sortOrder field determines the order provided for picked output events.

#### Hint

- Browser implementations may define additional values and algorithms beyond these four required values.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFBool [out] **isActive**

*isActive* indicates when the intersecting object is picked by the picking geometry. Output event isActive=true gets sent once a picked item is found. Output event isActive=false gets sent once no picked item is found.

### SFNode [in, out] **pickingGeometry** NULL <small>[IndexedLineSet|LineSet]</small>

*pickingGeometry* specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.

### MFNode [in, out] **pickTarget** [ ] <small>[X3DGroupingNode|X3DShapeNode|Inline]</small>

*pickTarget* specifies the list of nodes against which picking operations are performed. All nodes declared in this field and their descendents are evaluated for intersections.

### MFNode [out] **pickedGeometry**

Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.

### MFVec3f [out] **pickedNormal**

Output event containing surface normal vectors computed by the picking intersection computations.

### MFVec3f [out] **pickedPoint**

Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.

### MFVec3f [out] **pickedTextureCoordinate**

Output event containing 3D texture coordinates of surfaces computed by the picking intersection computations. Picked texture coordinates are in three dimensions. If the target texture coordinate has two dimensions, the third coordinate (z component of an SFVec3f) shall be zero.

#### Warning

- If the target object has multiple textures defined, only texture coordinates for the first texture are returned and all other textures are ignored.

## Description

### Hints

- Sort order for line picking is based on each pair of coordinates that defining a line segment, with first declared vertex of the segment defined to be the start of the line to which the intersection points are closest.
- Picking is performed between rendered frames of the event model. An author sets up the picking request in one frame by placing a LinePickSensor in the desired location. At the start of the next frame, any picking intersections are reported by the pick sensor.
- Picking notification is performed at the start of the frame for all enabled pick sensors once all other sensors are processed.
- IndexedLineSet or LineSet can be used for pickingGeometry node.

### Warning

- Order of contained nodes is significant, single pickingGeometry node must precede pickTarget node array.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Picking/LinePickSensor/LinePickSensor.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of LinePickSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/picking.html#LinePickSensor){:target="_blank"}
- [When the picking line segment intersects a coplanar polygon, computed intersection point(s) are illustrated in Figure 38.1](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/picking.html#f-LineIntersection){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
