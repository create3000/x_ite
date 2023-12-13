---
title: Circle2D
date: 2023-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Circle2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Circle2D is a geometry node that defines a linear X-Y circle with center (0,0) in X-Y plane.

The Circle2D node belongs to the **Geometry2D** component and requires at least level **2,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Circle2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](../core/metadataboolean/), [MetadataDouble](../core/metadatadouble/), [MetadataFloat](../core/metadatafloat/), [MetadataInteger](../core/metadatainteger/), [MetadataString](../core/metadatastring/) or [MetadataSet](../core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFFloat [ ] **radius** 1 <small>(0,∞)</small>

Circle *radius*.

#### Hint

- For size animation, modify the scale of a parent/ancestor [Transform](../grouping/transform/) node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

## Advice

### Hint

- Insert a [Shape](../shape/shape/) node before adding geometry or [Appearance](../shape/appearance/).

### Warning

- [Requires X3D `profile='Full'` or else include `<component name='Geometry2D' level='2'/>` Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter10Geometry2D){:target="_blank"}

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Circle2D/Circle2D.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry2D/Circle2D/Circle2D.x3d)

## See Also

- [X3D Specification of Circle2D node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Circle2D){:target="_blank"}
