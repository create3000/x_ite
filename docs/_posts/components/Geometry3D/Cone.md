---
title: Cone
date: 2023-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [Cone, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Cone is a geometry node.

The Cone node belongs to the **Geometry3D** component and requires at least level **1,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Cone
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **side** TRUE

Whether to draw sides (other inside faces are not drawn).

### SFBool [in, out] **bottom** TRUE

Whether to draw *bottom* (other inside faces are not drawn).

### SFFloat [ ] **height** 2 <small>(0,∞)</small>

Size in meters.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFFloat [ ] **bottomRadius** 1 <small>(0,∞)</small>

Size in meters.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side!
- *solid* false not supported in VRML97.

## Advice

### Hints

- [Cone](https://en.wikipedia.org/wiki/Cone)
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry3D/Cone/Cone.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geometry3D/Cone/screenshot.avif" alt="Cone"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry3D/Cone/Cone.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry3D/Cone/Cone.x3d)
{: .example-links }

## See Also

- [X3D Specification of Cone Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cone)
