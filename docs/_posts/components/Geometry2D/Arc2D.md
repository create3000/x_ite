---
title: Arc2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Arc2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Arc2D is a line-based geometry node that defines a linear circular arc with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis.

The Arc2D node belongs to the **Geometry2D** component and requires at least support level **2,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Arc2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [ ] | [startAngle](#fields-startAngle) | 0  |
| SFFloat | [ ] | [endAngle](#fields-endAngle) | π/2  |
| SFFloat | [ ] | [radius](#fields-radius) | 1  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [ ] **startAngle** 0 <small>[-2π,2π]</small>
{: #fields-startAngle }

Arc extends from *startAngle* counterclockwise to endAngle, in radians.

#### Hints

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFFloat [ ] **endAngle** π/2 <small>[-2π,2π]</small>
{: #fields-endAngle }

Arc extends from startAngle counterclockwise to *endAngle*, in radians.

#### Hints

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFFloat [ ] **radius** 1 <small>(0,∞)</small>
{: #fields-radius }

Circle *radius*, of which the arc is a portion.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

## Advice

### Hints

- [Material](/x_ite/components/shape/material/) emissiveColor in corresponding [Appearance](/x_ite/components/shape/appearance/) is used for rendering lines.
- Adding [LineProperties](/x_ite/components/shape/lineproperties/) to the corresponding [Appearance](/x_ite/components/shape/appearance/) node can modify the rendering style of these lines.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different [Material](/x_ite/components/shape/material/) emissiveColor than the [Background](/x_ite/components/environmentaleffects/background/) color, otherwise geometry is invisible.
- [Requires X3D `profile='Full'` or else include `<component name='Geometry2D' level='2'/>` Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry2D/Arc2D/Arc2D.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geometry2D/Arc2D/screenshot.avif" alt="Arc2D"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry2D/Arc2D/Arc2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Arc2D/Arc2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of Arc2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Arc2D)
