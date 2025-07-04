---
title: QuadSet
date: 2023-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [QuadSet, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

QuadSet is a geometry node that defines planar quadrilaterals. QuadSet contains a Coordinate or CoordinateDouble node, and can also contain Color or ColorRGBA, Normal and TextureCoordinate nodes.

The QuadSet node belongs to the [CADGeometry](/x_ite/components/overview/#cadgeometry) component and requires at least support level **1,** its default container field is *geometry.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + QuadSet
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [ ] | [solid](#fields-solid) | TRUE |
| SFBool | [ ] | [ccw](#fields-ccw) | TRUE |
| SFBool | [ ] | [colorPerVertex](#fields-colorPerVertex) | TRUE |
| SFBool | [ ] | [normalPerVertex](#fields-normalPerVertex) | TRUE |
| MFNode | [in, out] | [attrib](#fields-attrib) | [ ] |
| SFNode | [in, out] | [fogCoord](#fields-fogCoord) | NULL  |
| SFNode | [in, out] | [color](#fields-color) | NULL  |
| SFNode | [in, out] | [texCoord](#fields-texCoord) | NULL  |
| SFNode | [in, out] | [tangent](#fields-tangent) | NULL  |
| SFNode | [in, out] | [normal](#fields-normal) | NULL  |
| SFNode | [in, out] | [coord](#fields-coord) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [ ] **solid** TRUE
{: #fields-solid }

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE
{: #fields-ccw }

*ccw* defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise)

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFBool [ ] **colorPerVertex** TRUE
{: #fields-colorPerVertex }

Whether [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warnings

- The provided value of QuadSet *colorPerVertex* field is ignored and always treated as true.
- If child [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](/x_ite/components/shape/appearance/) and material/texture values.

### SFBool [ ] **normalPerVertex** TRUE
{: #fields-normalPerVertex }

Whether [Normal](/x_ite/components/rendering/normal/) node vector values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- If no child [Normal](/x_ite/components/rendering/normal/) node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices.

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

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>
{: #fields-texCoord }

Single contained [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/), [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/) or [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/) node that can specify coordinates for texture mapping onto corresponding geometry.

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

- [Quadrilateral](https://en.wikipedia.org/wiki/Quadrilateral)
- [Color](/x_ite/components/rendering/color/), normal and texCoord values are applied in the same order as coord values.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/ComputerAidedDesignInterchangeProfile.pdf)

### Warnings

- Requires X3D `profile='Full'` or else include `<component name='CADGeometry' level='1'/>`
- Rendering characteristics are undefined if polygons are not planar.
- Avoid self-intersecting polygon line segments, otherwise defined geometry is irregular and rendering results are undefined.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/CADGeometry/QuadSet/QuadSet.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/CADGeometry/QuadSet/screenshot.avif" alt="QuadSet"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/CADGeometry/QuadSet/QuadSet.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/CADGeometry/QuadSet/QuadSet.x3d)
{: .example-links }

## See Also

- [X3D Specification of QuadSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#QuadSet)
