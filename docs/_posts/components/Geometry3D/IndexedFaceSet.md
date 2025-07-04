---
title: IndexedFaceSet
date: 2023-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [IndexedFaceSet, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedFaceSet defines polygons using index lists corresponding to vertex coordinates. IndexedFaceSet is a geometry node containing a Coordinate or CoordinateDouble node, and can also contain Color or ColorRGBA, Normal and TextureCoordinate nodes.

The IndexedFaceSet node belongs to the [Geometry3D](/x_ite/components/overview/#geometry3d) component and requires at least support level **2,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + IndexedFaceSet
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFInt32 | [in] | [set_colorIndex](#fields-set_colorIndex) |  |
| MFInt32 | [in] | [set_texCoordIndex](#fields-set_texCoordIndex) |  |
| MFInt32 | [in] | [set_normalIndex](#fields-set_normalIndex) |  |
| MFInt32 | [in] | [set_coordIndex](#fields-set_coordIndex) |  |
| SFBool | [ ] | [solid](#fields-solid) | TRUE |
| SFBool | [ ] | [ccw](#fields-ccw) | TRUE |
| SFBool | [ ] | [convex](#fields-convex) | TRUE |
| SFFloat | [ ] | [creaseAngle](#fields-creaseAngle) | 0  |
| SFBool | [ ] | [colorPerVertex](#fields-colorPerVertex) | TRUE |
| SFBool | [ ] | [normalPerVertex](#fields-normalPerVertex) | TRUE |
| MFInt32 | [ ] | [colorIndex](#fields-colorIndex) | [ ] |
| MFInt32 | [ ] | [texCoordIndex](#fields-texCoordIndex) | [ ] |
| MFInt32 | [ ] | [normalIndex](#fields-normalIndex) | [ ] |
| MFInt32 | [ ] | [coordIndex](#fields-coordIndex) | [ ] |
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

### MFInt32 [in] **set_colorIndex** <small>[0,∞) or -1</small>
{: #fields-set_colorIndex }

*colorIndex* values define the order in which [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to polygons (or vertices), interspersed by -1 if colorlPerVertex=true.

#### Hints

- If *colorIndex* array is not provided, then [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are indexed according to the coordIndex field. Omitting duplicative *colorIndex* fields can reduce file size.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFInt32 [in] **set_texCoordIndex** <small>[-1,∞)</small>
{: #fields-set_texCoordIndex }

List of texture-coordinate indices mapping attached texture to corresponding coordinates.

#### Hints

- Use an authoring tool!
- If *texCoordIndex* array is not provided, then [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/) values are indexed according to the coordIndex field. Omitting duplicative *texCoordIndex* fields can reduce file size.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFInt32 [in] **set_normalIndex** <small>[0,∞) or -1</small>
{: #fields-set_normalIndex }

*normalIndex* values define the order in which normal vectors are applied to polygons (or vertices), interspersed by -1 if normalPerVertex=true.

#### Hints

- This field may be ignored, applying the default value regardless.
- If *normalIndex* array is not provided, then [Normal](/x_ite/components/rendering/normal/) values are indexed according to the coordIndex field. Omitting duplicative *normalIndex* fields can reduce file size.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>
{: #fields-set_coordIndex }

*coordIndex* indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets.

#### Hints

- Sentinel value -1 is used to separate indices for each successive polygon.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

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

### SFBool [ ] **convex** TRUE
{: #fields-convex }

The *convex* field is a hint to renderers whether all polygons in a shape are *convex* (true), or possibly concave (false). A *convex* polygon is planar, does not intersect itself, and has all interior angles \< 180 degrees.

#### Hints

- Concave is the opposite of *convex*. Interchange profile
- Only *convex*=true IndexedFaceSets have guaranteed support.
- Select *convex*=false (i.e. concave) and solid=false (i.e. two-sided display) for greatest visibility of geometry.
- [*convex* polygon](https://en.wikipedia.org/wiki/Convex_polygon)
- [Tessellation](https://en.wikipedia.org/wiki/Tessellation)

#### Warning

- Concave or inverted geometry may be invisible when using default value *convex*=true, since some renderers use more-efficient algorithms to perform tessellation that may inadvertently fail on concave geometry.

### SFFloat [ ] **creaseAngle** 0 <small>[0,∞)</small>
{: #fields-creaseAngle }

*creaseAngle* defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than *creaseAngle*, smooth shading is rendered across the shared line segment. Interchange profile

#### Hints

- Only 0 and π radians supported.
- *creaseAngle*=0 means render all edges sharply, *creaseAngle*=3.14159 means render all edges smoothly.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFBool [ ] **colorPerVertex** TRUE
{: #fields-colorPerVertex }

Whether [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- If child [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](/x_ite/components/shape/appearance/) and material/texture values.

### SFBool [ ] **normalPerVertex** TRUE
{: #fields-normalPerVertex }

Whether [Normal](/x_ite/components/rendering/normal/) node vector values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- If no child [Normal](/x_ite/components/rendering/normal/) node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices.

### MFInt32 [ ] **colorIndex** [ ] <small>[0,∞) or -1</small>
{: #fields-colorIndex }

*colorIndex* values define the order in which [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to polygons (or vertices), interspersed by -1 if colorlPerVertex=true.

#### Hints

- If *colorIndex* array is not provided, then [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are indexed according to the coordIndex field. Omitting duplicative *colorIndex* fields can reduce file size.
- If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.

#### Warning

- If child [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](/x_ite/components/shape/appearance/) and material/texture values.

### MFInt32 [ ] **texCoordIndex** [ ] <small>[-1,∞)</small>
{: #fields-texCoordIndex }

List of texture-coordinate indices mapping attached texture to corresponding coordinates.

#### Hints

- If *texCoordIndex* array is not provided, then [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/) values are indexed according to the coordIndex field. Omitting duplicative *texCoordIndex* fields can reduce file size.
- Use an authoring tool!

### MFInt32 [ ] **normalIndex** [ ] <small>[0,∞) or -1</small>
{: #fields-normalIndex }

*normalIndex* values define the order in which normal vectors are applied to polygons (or vertices), interspersed by -1 if normalPerVertex=true.

#### Hints

- If *normalIndex* array is not provided, then [Normal](/x_ite/components/rendering/normal/) values are indexed according to the coordIndex field. Omitting duplicative *normalIndex* fields can reduce file size.
- If normalPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included.
- If normalPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.
- If no child [Normal](/x_ite/components/rendering/normal/) node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices. Interchange profile
- This field may be ignored, applying the default value regardless.

### MFInt32 [ ] **coordIndex** [ ] <small>[0,∞) or -1</small>
{: #fields-coordIndex }

*coordIndex* indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets.

#### Hint

- Sentinel value -1 is used to separate indices for each successive polygon.

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

- *normal* vectors increase file size, typically doubling geometry definitions. [Normal](/x_ite/components/rendering/normal/) vectors are rapidly computed at run time by GPUs and thus are rarely needed in model files if no special effects are expected. [Normal](/x_ite/components/rendering/normal/) vectors are rapidly computed at run time by GPUs and thus are rarely needed in model files if no special effects are expected.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>
{: #fields-coord }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify a list of vertex values.

## Advice

### Hints

- [Polygon](https://en.wikipedia.org/wiki/Polygon)
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.

### Warnings

- Rendering characteristics are undefined if polygons are not planar.
- Avoid self-intersecting polygon line segments, otherwise defined geometry is irregular and rendering results are undefined.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/IndexedFaceSet.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/screenshot.avif" alt="IndexedFaceSet"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/IndexedFaceSet.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/IndexedFaceSet.x3d)
{: .example-links }

## See Also

- [X3D Specification of IndexedFaceSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#IndexedFaceSet)
