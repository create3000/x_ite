---
title: Normal
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Normal, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate/CoordinateDouble node, or else to a parent ElevationGrid node. Normal values are perpendicular directions that are used per-polygon or per-vertex when computing lighting and shading.

The Normal node belongs to the **Rendering** component and its default container field is *normal.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DNormalNode
      + Normal
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3f [in, out] **vector** [ ] <small>[-1,1]</small>

Set of unit-length normal vectors, corresponding to indexed polygons or vertices.

#### Warning

- Unit length means a magnitude of 1.0, so normal values of (0,0,0) are invalid.

## External Links

- [X3D Specification of Normal](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Normal){:target="_blank"}
