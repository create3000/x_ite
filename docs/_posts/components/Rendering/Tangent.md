---
title: Tangent
date: 2024-06-13
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

Tangent defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate or CoordinateDouble node, or else to a parent ElevationGrid node. Tangent values are perpendicular directions that are used per-polygon or per-vertex when computing lighting and shading for advanced physically based rendering (PBR) effects.

The Tangent node belongs to the [Rendering](/x_ite/components/overview/#rendering) component and requires at least support level **5,** its default container field is *tangent.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTangentNode
      + Tangent
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec4f | [in, out] | [vector](#fields-vector) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec4f [in, out] **vector** [ ] <small>[-1,1]</small>
{: #fields-vector }

Set of x-y-z-w orthogonal *vector* values for a surface, applied either per-vertex or per-face to a mesh. This is an advanced technique for surface shading.

#### Hint

- Values for w are handedness of the tangent base, either +1 or -1. All vertexes of the same triangle must have the same w value for their tangent vectors.

#### Warning

- Unit length means a magnitude of 1.0, so x-y-z normal values of (0,0,0) are invalid.

## Advice

### Hints

- [Normal vectors perpendicular to 3D surface](https://en.wikipedia.org/wiki/Normal_(geometry))
- [Tangent plane](https://en.wikipedia.org/wiki/Tangent)

## See Also

- [X3D Specification of Tangent Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Tangent)
