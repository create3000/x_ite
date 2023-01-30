---
title: VolumePickSensor
date: 2022-01-07
nav: components-Picking
categories: [components, Picking]
tags: [VolumePickSensor, Picking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

VolumePickSensor tests picking intersections using the pickingGeometry against the pickTarget geometry volume.

The VolumePickSensor node belongs to the **Picking** component and its container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPickSensorNode
        + VolumePickSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [out] **isActive**

IsActive indicates when the intersecting object is picked by the picking geometry. Output event isActive=true gets sent once a picked item is found. Output event isActive=false gets sent once no picked item is found.

### MFString [in, out] **objectType** "ALL" <small>["ALL","NONE","TERRAIN",...]</small>

The objectType field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances.

#### Hints

Authors may define any value for objectType. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFNode [in, out] **pickingGeometry** NULL <small>[X3DGeometryNode]</small>

PickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.

### MFNode [in, out] **pickTarget** [ ] <small>[X3DGroupingNode|X3DShapeNode|Inline]</small>

PickTarget specifies the list of nodes against which picking operations are performed. All nodes declared in this field and their descendents are evaluated for intersections.

### MFNode [out] **pickedGeometry**

Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.

### SFString [ ] **intersectionType** "BOUNDS" <small>["GEOMETRY"|"BOUNDS"|...]</small>

IntersectionType specifies precision of the collision computation.

#### Hint

IntersectionType constants may be extended by the browser to provide additional options.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [ ] **sortOrder** "CLOSEST" <small>["ANY"|"CLOSEST"|"ALL"|"ALL_SORTED"]</small>

The sortOrder field determines the order provided for picked output events.

#### Hint

Browser implementations may define additional values and algorithms beyond these four required values.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

## Description

### Hints

- Sort order is based on distance between centers of the bounds of the picking geometry and the picked geometry.
- A pick is successful if any vertex of the pickTarget geometry intersects the volume defined by the pickingGeometry.
- Sorting is defined based on distance between the centers of the bounds of the picking geometry and the picked geometry.
- Picking is performed between rendered frames of the event model. An author sets up the picking request in one frame by placing a LinePickSensor in the desired location. At the start of the next frame, any picking intersections are reported by the pick sensor.
- Picking notification is performed at the start of the frame for all enabled pick sensors once all other sensors are processed.
- Any geometry can be used for pickingGeometry node.

Warnings
--------

- PickingGeometry volume is defined by the convex hull of the enclosing planes of the provided X3DGeometryNode. If the provided volume is not manifold, pick results are undefined.
- Order of contained nodes is significant, single pickingGeometry node must precede pickTarget node array.

## External Links

- [X3D Specification of VolumePickSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/picking.html#VolumePickSensor){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
