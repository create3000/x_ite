---
title: PointSet
date: 2023-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [PointSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PointSet is a node that contains a set of colored 3D points, represented by contained Color or ColorRGBA and Coordinate or CoordinateDouble nodes.

The PointSet node belongs to the [Rendering](/x_ite/components/overview/#rendering) component and requires at least support level **1,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + PointSet
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
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

Single contained [Normal](/x_ite/components/rendering/normal/) node that can specify perpendicular vectors for corresponding vertices to support rendering computations.

#### Hint

- Useful for special effects. [Normal](/x_ite/components/rendering/normal/) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions. [Normal](/x_ite/components/rendering/normal/) vectors are rapidly computed at run time by GPUs and thus are rarely needed in model files if no special effects are expected.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>
{: #fields-coord }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify a list of vertex values.

## Advice

### Hints

- [Point (geometry)](https://en.wikipedia.org/wiki/Point_(geometry))
- Either values in a contained [Color](/x_ite/components/rendering/color/) node, or else [Material](/x_ite/components/shape/material/) emissiveColor in corresponding [Appearance](/x_ite/components/shape/appearance/) node, are used for rendering lines and points.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- Each point is displayed independently, no other PointSet attributes for rendering are provided.

### Warning

- Use a different color (or [Material](/x_ite/components/shape/material/) emissiveColor) than the [Background](/x_ite/components/environmentaleffects/background/) color, otherwise geometry is invisible.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Rendering/PointSet/screenshot.avif" alt="PointSet"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d)
{: .example-links }

## See Also

- [X3D Specification of PointSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#PointSet)
