---
title: Coordinate
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Coordinate, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Coordinate builds geometry by defining a set of 3D coordinate (triplet) point values. Coordinate is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes. Coordinate is also used by HAnimHumanoid, HAnimSegment, and various Nurbs nodes.

The Coordinate node belongs to the **Rendering** component and requires at least support level **1,** its default container field is *coord.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + Coordinate
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| MFVec3f | \[in, out\] | [point](#mfvec3f-in-out-point----) | \[ \] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec3f [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of 3D coordinate (triplet) *point* values.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Rendering/Coordinate/screenshot.avif" alt="Coordinate"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.x3d)
{: .example-links }

## See Also

- [X3D Specification of Coordinate Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Coordinate)
