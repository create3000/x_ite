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

The IndexedLineSet node belongs to the **Rendering** component and requires at least support level **1,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + IndexedLineSet
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFInt32 | [in] | [set_colorIndex](#fields-set_colorIndex) |  |
| MFInt32 | [in] | [set_coordIndex](#fields-set_coordIndex) |  |
| SFBool | [ ] | [colorPerVertex](#fields-colorPerVertex) | TRUE |
| MFInt32 | [ ] | [colorIndex](#fields-colorIndex) | [ ] |
| MFInt32 | [ ] | [coordIndex](#fields-coordIndex) | [ ] |
| MFNode | [in, out] | [attrib](#fields-attrib) | [ ] |
| SFNode | [in, out] | [fogCoord](#fields-fogCoord) | NULL  |
| SFNode | [in, out] | [color](#fields-color) | NULL  |
| SFNode | [in, out] | [tangent](#fields-tangent) | NULL  |
| SFNode | [in, out] | [normal](#fields-normal) | NULL  |
| SFNode | [in, out] | [coord](#fields-coord) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFInt32 [in] **set_colorIndex** <small>[0,∞) or -1</small>
{: #fields-set_colorIndex }

*colorIndex* values define the order in which [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to polygons (or vertices), interspersed by -1 if colorlPerVertex=true.

#### Hints

- If *colorIndex* array is not provided, then [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are indexed according to the coordIndex field.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions. Omitting duplicative *colorIndex* fields can reduce file size.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>
{: #fields-set_coordIndex }

*coordIndex* indices provide the order in which coordinates are applied to construct each polyline. Order starts at index 0, commas are optional between sets.

#### Hints

- Sentinel value -1 is used to separate indices for each successive polyline.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [ ] **colorPerVertex** TRUE
{: #fields-colorPerVertex }

Whether [Color](/x_ite/components/rendering/color/) node color values are applied to each point vertex (true) or per polyline (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### MFInt32 [ ] **colorIndex** [ ] <small>[0,∞) or -1</small>
{: #fields-colorIndex }

*colorIndex* values define the order in which [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to polygons (or vertices), interspersed by -1 if colorlPerVertex=true.

#### Hints

- If *colorIndex* array is not provided, then [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are indexed according to the coordIndex field. Omitting duplicative *colorIndex* fields can reduce file size.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.
- If rendering [Coordinate](/x_ite/components/rendering/coordinate/) points originally defined for an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), index values may need to repeat initial each initial vertex to close the polygons.

#### Warning

- If child [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](/x_ite/components/shape/appearance/) and material/texture values.

### MFInt32 [ ] **coordIndex** [ ] <small>[0,∞) or -1</small>
{: #fields-coordIndex }

*coordIndex* indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets, use -1 to separate indices for each polyline.

#### Hints

- If rendering [Coordinate](/x_ite/components/rendering/coordinate/) points originally defined for an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), index values may need to repeat initial each initial vertex to close the polygons.
- Sentinel value -1 is used to separate indices for each successive polyline.

#### Warning

- *coordIndex* is required in order to connect contained coordinate point values.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>
{: #fields-attrib }

Single contained [FloatVertexAttribute](/x_ite/components/shaders/floatvertexattribute/) node that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/shaders.html#Pervertexattributes)

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>
{: #fields-fogCoord }

Single contained [FogCoordinate](/x_ite/components/environmentaleffects/fogcoordinate/) node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>
{: #fields-color }

Single contained [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node that can specify *color* values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **tangent** NULL <small>[Tangent]</small> <small class="blue">non-standard</small>
{: #fields-tangent }

Input/Output field *tangent*. If there is no [Tangent](/x_ite/components/rendering/tangent/) node, the MikkTSpace algorithm is used to generate tangent vectors.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>
{: #fields-normal }

Single contained [Normal](/x_ite/components/rendering/normal/) node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. [Normal](/x_ite/components/rendering/normal/) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions. [Normal](/x_ite/components/rendering/normal/) vectors are rapidly computed at run time by GPUs and thus are rarely needed in model files if no special effects are expected.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>
{: #fields-coord }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify a list of vertex values.

## Advice

### Hints

- [Polygonal chain](https://en.wikipedia.org/wiki/Polygonal_chain)
- Either values in a contained [Color](/x_ite/components/rendering/color/) node, or else [Material](/x_ite/components/shape/material/) emissiveColor in corresponding [Appearance](/x_ite/components/shape/appearance/) node, are used for rendering lines and points.
- Adding [LineProperties](/x_ite/components/shape/lineproperties/) to the corresponding [Appearance](/x_ite/components/shape/appearance/) node can modify the rendering style of these lines.
- If rendering [Coordinate](/x_ite/components/rendering/coordinate/) points originally defined for an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), index values may need to repeat each initial vertex to close each polygon outline.
- Step-wise variation or linear interpolation of color values can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.
- Consider including [Fog](/x_ite/components/environmentaleffects/fog/) (with [Fog](/x_ite/components/environmentaleffects/fog/) color matching [Background](/x_ite/components/environmentaleffects/background/) color) to provide further depth cueing for IndexedLineSet (ILS).

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different color (or [Material](/x_ite/components/shape/material/) emissiveColor) than the [Background](/x_ite/components/environmentaleffects/background/) color, otherwise geometry is invisible.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Rendering/IndexedLineSet/screenshot.avif" alt="IndexedLineSet"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/IndexedLineSet/IndexedLineSet.x3d)
{: .example-links }

## See Also

- [X3D Specification of IndexedLineSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#IndexedLineSet)
