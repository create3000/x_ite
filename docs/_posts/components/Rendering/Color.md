---
title: Color
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Color, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Color node defines a set of RGB color values that apply either to a sibling Coordinate or CoordinateDouble node, or else to a parent ElevationGrid node. Color is only used by ElevationGrid, IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes.

The Color node belongs to the **Rendering** component and requires at least level **1,** its default container field is *color.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DColorNode
      + Color
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFColor [in, out] **color** [ ] <small>[0,1]</small>

The *color* field defines an array of 3-tuple RGB colors.

## Advice

### Hints

- Colors are often controlled by [Material](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/material/) instead.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Rendering/Color/Color.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Rendering/Color/screenshot.avif" alt="Color"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Rendering/Color/Color.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/Color/Color.x3d)
{: .example-links }

## See Also

- [X3D Specification of Color Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Color)
