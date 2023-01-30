---
title: PointProperties
date: 2022-01-07
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

The PointProperties node belongs to the **Shape** component and its container field is *pointProperties.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + PointProperties
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in, out] **pointSizeScaleFactor** 1 (1,∞)

Nominal rendered point size is a browser-dependent minimum renderable point size, which is then multiplied by an additional (greater than or equal to 1.0) pointSizeScaleFactor.

#### Hint

Additional sizing modifications are determined by pointSizeMinValue, pointSizeMaxValue, and pointSizeAttenuation array.

### SFFloat [in, out] **pointSizeMinValue** 1 <small>[0,∞)</small>

PointSizeMinValue is minimum allowed scaling factor on nominal browser point scaling.

#### Warning

Maintain pointSizeMinValue `<= pointSizeMaxValue.

### SFFloat [in, out] **pointSizeMaxValue** 1 <small>(0,∞)</small>

PointSizeMaxValue is maximum allowed scaling factor on nominal browser point scaling

#### Warning

Maintain pointSizeMinValue \<= pointSizeMaxValue.

### MFFloat [in, out] **pointSizeAttenuation** 1 0 0 <small>(0,∞)</small>

PointSizeAttenuation array values [a, b, c] are set to default values if undefined. Together these parameters define attenuation factor 1/(a + b×r + c×r^2) where r is the distance from observer position (current viewpoint) to each point.

#### Hint

Nominal point size is multiplied by attenuation factor and then clipped to a minimum value of pointSizeMinValue × minimum renderable point size, then clipped to maximum size of pointSizeMaxValue × minimum renderable point size.

### SFString [in, out] **colorMode** "TEXTURE_AND_POINT_COLOR" <small>["POINT_COLOR", "TEXTURE_COLOR", "TEXTURE_AND_POINT_COLOR"]</small>

ColorMode has blending effect on the rendering of point sprites, applying supplied color (Color node or Material emissiveColor) and texture color

#### Hint

POINT_COLOR shall display the RGB channels of the color instance defined in X3DMaterialNode or X3DColorNode, and the A channel of the texture if any. If no color is associated to the point, the default RGB color (0, 0, 0) shall be used. TEXTURE_COLOR shall display the original texture with its RGBA channels and regardless to the X3DMaterialNode or X3DColorNode which might be associated to the point set. TEXTURE_AND_POINT_COLOR shall display the RGBA channels of a texture added to the RGB channels of the color defined in X3DMaterialNode or X3DColorNode node, and the A channel of the texture if any. If no color is associated to the point, the result shall be exactly the same as TEXTURE_COLOR.

## Description

### Hints

- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- When an X3DTextureNode is defined in the same Appearance instance as PointProperties node, the points of a PointSet shall be displayed as point sprites using the given texture(s).
- Requires X3D profile='Full' or else include \<component name='Shape' level='5'/>`

## External Links

- [X3D Specification of PointProperties](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#LineProperties){:target="_blank"}
