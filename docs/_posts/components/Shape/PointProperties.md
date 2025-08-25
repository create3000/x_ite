---
title: PointProperties
date: 2023-01-07
nav: components-Shape
categories: [components, Shape]
tags: [PointProperties, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PointProperties allows precise fine-grained control over the rendering style of PointSet node points inside the same Shape.

The PointProperties node belongs to the [Shape](/x_ite/components/overview/#shape) component and requires at least support level **5,** its default container field is *pointProperties.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + PointProperties
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [pointSizeScaleFactor](#fields-pointSizeScaleFactor) | 1  |
| SFFloat | [in, out] | [pointSizeMinValue](#fields-pointSizeMinValue) | 1  |
| SFFloat | [in, out] | [pointSizeMaxValue](#fields-pointSizeMaxValue) | 1  |
| SFVec3f | [in, out] | [attenuation](#fields-attenuation) | 1 0 0  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **pointSizeScaleFactor** 1 <small>(1,∞)</small>
{: #fields-pointSizeScaleFactor }

Nominal rendered point size is a browser-dependent minimum renderable point size, which is then multiplied by an additional *pointSizeScaleFactor* (which is greater than or equal to 1).

#### Hint

- Additional sizing modifications are determined by pointSizeMinValue, pointSizeMaxValue, and attenuation array.

### SFFloat [in, out] **pointSizeMinValue** 1 <small>[0,∞)</small>
{: #fields-pointSizeMinValue }

*pointSizeMinValue* is minimum allowed scaling factor on nominal browser point scaling.

#### Warning

- Maintain *pointSizeMinValue* \<= pointSizeMaxValue.

### SFFloat [in, out] **pointSizeMaxValue** 1 <small>(0,∞)</small>
{: #fields-pointSizeMaxValue }

*pointSizeMaxValue* is maximum allowed scaling factor on nominal browser point scaling.

#### Warning

- Maintain pointSizeMinValue \<= *pointSizeMaxValue*.

### SFVec3f [in, out] **attenuation** 1 0 0 <small>(0,∞)</small>
{: #fields-attenuation }

Are set to default values if undefined. Together these parameters define *attenuation* factor 1/(a + b×r + c×r^2) where r is the distance from observer position (current viewpoint) to each point.

#### Hint

- Nominal point size is multiplied by *attenuation* factor and then clipped to a minimum value of pointSizeMinValue × minimum renderable point size, then clipped to maximum size of pointSizeMaxValue × minimum renderable point size.

## Advice

### Hints

- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- When an X3DTextureNode is defined in the same [Appearance](/x_ite/components/shape/appearance/) instance as PointProperties node, the points of a [PointSet](/x_ite/components/rendering/pointset/) shall be displayed as point sprites using the given texture(s).

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Shape' level='5'/>`

## See Also

- [X3D Specification of PointProperties Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#LineProperties)
