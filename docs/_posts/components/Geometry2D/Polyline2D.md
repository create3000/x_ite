---
title: Polyline2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Polyline2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Polyline2D is a geometry node that defines a connected set of vertices in a contiguous set of line segments in X-Y plane.

The Polyline2D node belongs to the **Geometry2D** component and requires at least support level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Polyline2D
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- MFVec2f \[ \] [lineSegments](#mfvec2f---linesegments----)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec2f [ ] **lineSegments** [ ] <small>(-∞,∞)</small>

Coordinates of vertices connected into contiguous Polyline2D.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

## Advice

### Hints

- [Material](/x_ite/components/shape/material/) emissiveColor in corresponding [Appearance](/x_ite/components/shape/appearance/) is used for rendering lines.
- Adding [LineProperties](/x_ite/components/shape/lineproperties/) to the corresponding [Appearance](/x_ite/components/shape/appearance/) node can modify the rendering style of these lines.
- [Insert a Shape node before adding geometry or Appearance. Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D)

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different [Material](/x_ite/components/shape/material/) emissiveColor than the [Background](/x_ite/components/environmentaleffects/background/) color, otherwise geometry is invisible.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry2D/Polyline2D/Polyline2D.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geometry2D/Polyline2D/screenshot.avif" alt="Polyline2D"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry2D/Polyline2D/Polyline2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Polyline2D/Polyline2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of Polyline2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Polyline2D)
