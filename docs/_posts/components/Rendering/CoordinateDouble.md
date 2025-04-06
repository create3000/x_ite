---
title: CoordinateDouble
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [CoordinateDouble, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CoordinateDouble builds geometry by defining a set of 3D coordinate (triplet) point values. CoordinateDouble is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes. CoordinateDouble is also used by NurbsPositionInterpolator and NurbsOrientationInterpolator.

The CoordinateDouble node belongs to the **Rendering** component and requires at least level **1,** its default container field is *coord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + CoordinateDouble
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec3d [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of 3D coordinate (triplet) *point* values.

## Advice

### Warning

- CoordinateDouble requires Rendering component level 1, otherwise Full profile.

## See Also

- [X3D Specification of CoordinateDouble Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#CoordinateDouble)
