---
title: ColorRGBA
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [ColorRGBA, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ColorRGBA node defines a set of RGBA color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. ColorRGBA is only used by ElevationGrid, IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes.

The ColorRGBA node belongs to the **Rendering** component and its default container field is *color.* It is available from X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DColorNode
      + ColorRGBA
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFColorRGBA [in, out] **color** [ ] <small>[0,1]</small>

The *color* field defines an array of 4-tuple RGBA colors.

#### Warning

- ColorRGBA requires Rendering component level 3 (alpha fully supported), Rendering component level 1 (alpha optional), otherwise Full profile.

## Information

### Hints

- Colors are often controlled by Material instead.
- Alpha channel may be ignored under Interchange profile.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### Warning

- ColorRGBA requires Rendering component level 3 (alpha fully supported), Rendering component level 1 (alpha optional), otherwise Full profile.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/ColorRGBA/ColorRGBA.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of ColorRGBA](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#ColorRGBA){:target="_blank"}
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}
