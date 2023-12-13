---
title: IndexedLineSet
date: 2023-01-07
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

IndexedLineSet defines polyline segments using index lists corresponding to vertex coordinates. IndexedLineSet is a geometry node that can contain a Coordinate or CoordinateDouble node and optionally a Color or ColorRGBA node.

The IndexedLineSet node belongs to the **Rendering** component and requires at least level **1,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + IndexedLineSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](../core/metadataboolean/), [MetadataDouble](../core/metadatadouble/), [MetadataFloat](../core/metadatafloat/), [MetadataInteger](../core/metadatainteger/), [MetadataString](../core/metadatastring/) or [MetadataSet](../core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### MFInt32 [in] **set_colorIndex** <small>[0,∞) or -1</small>

*colorIndex* values define the order in which [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) values are applied to polygons (or vertices).

#### Hints

- If *colorIndex* array is not provided, then [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) values are indexed according to the coordIndex field.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>

*coordIndex* indices provide the order in which coordinates are applied to construct each polyline. Order starts at index 0, commas are optional between sets.

#### Hints

- Sentinel value -1 is used to separate indices for each successive polyline.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [ ] **colorPerVertex** TRUE

Whether [Color](../rendering/color/) node color values are applied to each point vertex (true) or per polyline (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### MFInt32 [ ] **colorIndex** [ ] <small>[0,∞) or -1</small>

*colorIndex* values define the order in which [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) values are applied to polygons (or vertices).

#### Hints

- If *colorIndex* array is not provided, then [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) values are indexed according to the coordIndex field.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.
- If rendering [Coordinate](../rendering/coordinate/) points originally defined for an [IndexedFaceSet](../geometry3d/indexedfaceset/), index values may need to repeat initial each initial vertex to close the polygons.

#### Warning

- If child [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](../shape/appearance/) and material/texture values.

### MFInt32 [ ] **coordIndex** [ ] <small>[0,∞) or -1</small>

*coordIndex* indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets, use -1 to separate indices for each polyline.

#### Hints

- If rendering [Coordinate](../rendering/coordinate/) points originally defined for an [IndexedFaceSet](../geometry3d/indexedfaceset/), index values may need to repeat initial each initial vertex to close the polygons.
- Sentinel value -1 is used to separate indices for each successive polyline.

#### Warning

- *coordIndex* is required in order to connect contained coordinate point values.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Single contained [FloatVertexAttribute](../shaders/floatvertexattribute/) node that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained [FogCoordinate](../environmentaleffects/fogcoordinate/) node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained [Color](../rendering/color/) or [ColorRGBA](../rendering/colorrgba/) node that can specify *color* values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained [Normal](../rendering/normal/) node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. [Normal](../rendering/normal/) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](../rendering/coordinate/) or [CoordinateDouble](../rendering/coordinatedouble/) node that can specify a list of vertex values.

## Advice

### Hints

- [Polygonal chain](https://en.wikipedia.org/wiki/Polygonal_chain){:target="_blank"}
- Either values in a contained [Color](../rendering/color/) node, or else [Material](../shape/material/) emissiveColor in corresponding [Appearance](../shape/appearance/) node, are used for rendering lines and points.
- Adding [LineProperties](../shape/lineproperties/) to the corresponding [Appearance](../shape/appearance/) node can modify the rendering style of these lines.
- If rendering [Coordinate](../rendering/coordinate/) points originally defined for an [IndexedFaceSet](../geometry3d/indexedfaceset/), index values may need to repeat each initial vertex to close each polygon outline.
- Step-wise variation or linear interpolation of color values can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a [Shape](../shape/shape/) node before adding geometry or [Appearance](../shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.
- Consider including [Fog](../environmentaleffects/fog/) (with [Fog](../environmentaleffects/fog/) color matching [Background](../environmentaleffects/background/) color) to provide further depth cueing for IndexedLineSet (ILS).

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different color (or [Material](../shape/material/) emissiveColor) than the [Background](../environmentaleffects/background/) color, otherwise geometry is invisible.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d)

## See Also

- [X3D Specification of IndexedLineSet node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#IndexedLineSet){:target="_blank"}
