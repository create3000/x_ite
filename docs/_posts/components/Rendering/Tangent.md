---
title: Tangent
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Tangent, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Tangent defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate or CoordinateDouble node, or else to a parent ElevationGrid node. Tangent values are perpendicular directions that are used per-polygon or per-vertex when computing lighting and shading.

The Tangent node belongs to the **Rendering** component and requires at least level **2,** its default container field is *tangent.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
   + Tangent
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3f [in, out] **vector** [ ] <small>[-1,1]</small>

Set of unit-length normal vectors, corresponding to indexed polygons or vertices.
