---
title: IndexedLineSet
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [IndexedLineSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedLineSet is a geometry node that can contain a Coordinate|CoordinateDouble node and an (optional) Color|ColorRGBA node. Color values or a sibling Material emissiveColor is used to draw lines and points. Lines are not lit, are not texture-mapped, and do not participate in collision detection.

The IndexedLineSet node belongs to the **Rendering** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + IndexedLineSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFInt32 [in] **set_colorIndex** <small>[0,∞) or -1</small>

ColorIndex indices provide order in which colors are applied.

#### Hints

- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions. If rendering Coordinate points originally defined for an IndexedFaceSet, index values may need to repeat initial each initial vertex to close the polygons.

### MFInt32 [in] **set_coordIndex** <small class="small">[0,∞) or -1</small>

CoordIndex indices provide the order in which coordinates are applied to construct each polyline. Order starts at index 0, commas are optional between sets.

#### Hint

- Sentinel value -1 is used to separate indices for each successive polyline.

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or per polyline (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### MFInt32 [ ] **colorIndex** [ ] <small>[0,∞) or -1</small>

*colorIndex* indices provide order in which colors are applied.

#### Hints

- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions. If rendering Coordinate points originally defined for an IndexedFaceSet, index values may need to repeat initial each initial vertex to close the polygons.

### MFInt32 [ ] **coordIndex** [ ] <small>[0,∞) or -1</small>

*coordIndex* indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets, use -1 to separate indices for each polyline.

#### Hint

- If rendering Coordinate points originally defined for an IndexedFaceSet, index values may need to repeat initial each initial vertex to close the polygons.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Input/Output field attrib.

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Input/Output field fogCoord.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Input/Output field color.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Input/Output field coord.

## Description

### Hints

- Use a different color (or emissiveColor) than the background color.
- If rendering Coordinate points originally defined for an IndexedFaceSet, index values may need to repeat each initial vertex to close each polygon outline. Step-wise colors or linear interpolation of colors can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.
- Consider including Fog to provide further depth cueing for IndexedLineSet (ILS).

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of IndexedLineSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#IndexedLineSet){:target="_blank"}
