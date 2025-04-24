---
title: Normal
date: 2023-01-07
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

Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate or CoordinateDouble node, or else to a parent ElevationGrid node. Normal values are perpendicular directions that are used per-polygon or per-vertex when computing lighting and shading.

The Normal node belongs to the **Rendering** component and requires at least support level **2,** its default container field is *normal.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DNormalNode
      + Normal
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec3f | [in, out] | [vector](#fields-vector) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec3f [in, out] **vector** [ ] <small>[-1,1]</small>
{: #fields-vector }

Set of unit-length normal vectors, corresponding to indexed polygons or vertices.

#### Warning

- Unit length means a magnitude of 1.0, so normal values of (0,0,0) are invalid.

## Advice

### Hints

- Normal values are typically only calculated or applied once, during initial loading of model geometry.
- Custom Normal values can produce special effects.
- If no child Normal node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices.
- Computation of normal values is performed quite quickly on modern 3D graphics hardware, often with no perceptible delay.
- [Normal vectors perpendicular to 3D surface](https://en.wikipedia.org/wiki/Normal_(geometry))

### Warning

- Adding normal values to a model might significantly increase file size. Testing can help determine proper tradeoffs between file size, network transmission delays and initial rendering speed.

## See Also

- [X3D Specification of Normal Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Normal)
