---
title: PrimitivePickSensor
date: 2022-01-07
nav: components-Picking
categories: [components, Picking]
tags: [PrimitivePickSensor, Picking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PrimitivePickSensor tests picking intersections using one of the basic primitive shapes specified in the pickingGeometry field [Cone|Cylinder|Sphere|Box] against the pickTarget geometry.

The PrimitivePickSensor node belongs to the **Picking** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPickSensorNode
        + PrimitivePickSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [out] **isActive**

*isActive* indicates when the intersecting object is picked by the picking geometry. Output event isActive=true gets sent once a picked item is found. Output event isActive=false gets sent once no picked item is found.

### MFString [in, out] **objectType** "ALL" <small>["ALL","NONE","TERRAIN",...]</small>

The objectType field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances.

#### Hints

- Authors may define any value for objectType. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFNode [in, out] **pickingGeometry** NULL <small>[Cone|Cylinder|Sphere|Box]</small>

*pickingGeometry* specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.

### MFNode [in, out] **pickTarget** [ ] <small>[X3DGroupingNode|X3DShapeNode|Inline]</small>

*pickTarget* specifies the list of nodes against which picking operations are performed. All nodes declared in this field and their descendents are evaluated for intersections.

### MFNode [out] **pickedGeometry**

Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.

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

## Description

### Example

- A Cylinder without end caps is still treated as an enclosed Cylinder.

### Hints

- Sorting is defined based on the primitive type as follows. For Cone, the closest picked primitive is defined to be that closest to the vertex point. For Cylinder, Box, and Sphere, the closest picked primitive is defined to be that closest to the center.
- Picking is performed between rendered frames of the event model. An author sets up the picking request in one frame by placing a LinePickSensor in the desired location. At the start of the next frame, any picking intersections are reported by the pick sensor.
- Picking notification is performed at the start of the frame for all enabled pick sensors once all other sensors are processed.
- Box, Cone, Cylinder or Sphere can be used for pickingGeometry node.

### Warnings

- Boolean fields used to control visibility of primitive pickingGeometry subsections are ignored when evaluating picking intersections.
- Order of contained nodes is significant, single pickingGeometry node must precede pickTarget node array.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Picking/PrimitivePickSensor/PrimitivePickSensor.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of PrimitivePickSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/picking.html#PrimitivePickSensor){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
- A Cylinder without end caps is still treated as an enclosed Cylinder.
