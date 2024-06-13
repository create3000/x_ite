---
title: Rectangle2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Rectangle2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Rectangle2D is a geometry node that defines a 2D rectangle in X-Y plane.

The Rectangle2D node belongs to the **Geometry2D** component and requires at least level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Rectangle2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFVec2f [ ] **size** 2 2 <small>(0,∞)</small>

2D dimensions of Rectangle2D.

#### Hint

- For *size* animation, modify the scale of a parent/ancestor [Transform](/x_ite/components/grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

### SFBool [ ] **solid** FALSE

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

- [Insert a Shape node before adding geometry or Appearance. Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D){:target="_blank"}

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Rectangle2D/Rectangle2D.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry2D/Rectangle2D/Rectangle2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Rectangle2D/Rectangle2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of Rectangle2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Rectangle2D){:target="_blank"}
