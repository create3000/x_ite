---
title: CoordinateDouble
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [CoordinateDouble, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CoordinateDouble builds geometry by defining a set of 3D coordinate (triplet) point values. CoordinateDouble is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes. CoordinateDouble is also used by NurbsPositionInterpolator and NurbsOrientationInterpolator.

The CoordinateDouble node belongs to the **Rendering** component and requires level **1**, its default container field is *coord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + CoordinateDouble
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3d [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of 3D coordinate (triplet) *point* values.

## Advice

### Warning

- CoordinateDouble requires Rendering component level 1, otherwise Full profile.

## See Also

- [X3D Specification of CoordinateDouble node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#CoordinateDouble){:target="_blank"}
