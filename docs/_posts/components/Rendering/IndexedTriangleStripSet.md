---
title: IndexedTriangleStripSet
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [IndexedTriangleStripSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedTriangleStripSet is a geometry node containing a Coordinate or CoordinateDouble node, and can also contain Color or ColorRGBA, Normal and TextureCoordinate nodes.

The IndexedTriangleStripSet node belongs to the **Rendering** component and requires at least level **3,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + IndexedTriangleStripSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### MFInt32 [in] **set_index** <small>[0,∞) or −1</small>

*index* list specifies triangles by connecting [Coordinate](/x_ite/components/rendering/coordinate/) vertices for each individual strip, separated by -1 sentinel values.

#### Hint

- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise){:target="_blank"}

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFBool [ ] **colorPerVertex** TRUE

Whether [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

#### Warnings

- The provided value of IndexedTriangleStripSet *colorPerVertex* field is ignored and always treated as true.
- If child [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node is not provided, then geometry is rendered using corresponding [Appearance](/x_ite/components/shape/appearance/) and material/texture values.

### SFBool [ ] **normalPerVertex** TRUE

Whether [Normal](/x_ite/components/rendering/normal/) node vector values are applied to each point vertex (true) or to each polygon face (false).

#### Hint

- If no child [Normal](/x_ite/components/rendering/normal/) node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices.

### MFInt32 [ ] **index** [ ] <small>[0,∞) or −1</small>

*index* list specifies triangles by connecting [Coordinate](/x_ite/components/rendering/coordinate/) vertices for each individual strip, separated by -1 sentinel values.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Single contained [FloatVertexAttribute](/x_ite/components/shaders/floatvertexattribute/) node that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained [FogCoordinate](/x_ite/components/environmentaleffects/fogcoordinate/) node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) node that can specify *color* values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>

Single contained [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/), [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/) or [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/) node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained [Normal](/x_ite/components/rendering/normal/) node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. [Normal](/x_ite/components/rendering/normal/) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify a list of vertex values.

## Advice

### Hints

- [Color](/x_ite/components/rendering/color/), normal and texCoord values are applied in the same order as coord values.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.

## See Also

- [X3D Specification of IndexedTriangleStripSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#IndexedTriangleStripSet){:target="_blank"}
