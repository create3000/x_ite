---
title: Disk2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Disk2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Disk2D is a geometry node that defines a filled (or partially filled) planar circle with center (0,0).

The Disk2D node belongs to the **Geometry2D** component and requires at least support level **2,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Disk2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [ ] | [innerRadius](#fields-innerRadius) | 0  |
| SFFloat | [ ] | [outerRadius](#fields-outerRadius) | 1  |
| SFBool | [ ] | [solid](#fields-solid) | FALSE |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [ ] **innerRadius** 0 <small>[0,∞)</small>
{: #fields-innerRadius }

Inner circle radius, greater than or equal to 0.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFFloat [ ] **outerRadius** 1 <small>(0,∞)</small>
{: #fields-outerRadius }

Outer radius of circle, greater than or equal to inner radius.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFBool [ ] **solid** FALSE
{: #fields-solid }

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side!
- *solid* false not supported in VRML97.

## Advice

### Hint

- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

### Warning

- [Requires X3D `profile='Full'` or else include `<component name='Geometry2D' level='2'/>` Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry2D/Disk2D/Disk2D.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/Geometry2D/Disk2D/screenshot.avif" alt="Disk2D"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry2D/Disk2D/Disk2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Disk2D/Disk2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of Disk2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Disk2D)
