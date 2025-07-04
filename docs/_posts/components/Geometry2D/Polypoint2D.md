---
title: Polypoint2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Polypoint2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Polypoint2D is a geometry node that defines a set of 2D points in X-Y plane.

The Polypoint2D node belongs to the [Geometry2D](/x_ite/components/overview/#geometry2d) component and requires at least support level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Polypoint2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec2f | [in, out] | [point](#fields-point) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec2f [in, out] **point** [ ] <small>(-∞,∞)</small>
{: #fields-point }

2D coordinates of vertices.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

## Advice

### Hint

- [Insert a Shape node before adding geometry or Appearance. Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/Polypoint2D.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/screenshot.avif" alt="Polypoint2D"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/Polypoint2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Polypoint2D/Polypoint2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of Polypoint2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Polypoint2D)
