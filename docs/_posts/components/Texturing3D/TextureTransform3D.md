---
title: TextureTransform3D
date: 2023-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [TextureTransform3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureTransform3D applies a 3D transformation to texture coordinates.

The TextureTransform3D node belongs to the **Texturing3D** component and requires at least level **1,** its default container field is *textureTransform.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + X3DSingleTextureTransformNode
        + TextureTransform3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **mapping** ""

The *mapping* label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node *mapping* validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator){:target="_blank"}

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞)</small>

*rotation* angle of texture about center (opposite effect appears on geometry).

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>

Non-uniform planar scaling of texture about center (opposite effect appears on geometry).

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

*center* point in 2D (s,t) texture coordinates for rotation and scaling.

## Advice

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding TextureTransform3D.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping){:target="_blank"}

### Warning

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.

## See Also

- [X3D Specification of TextureTransform3D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureTransform3D){:target="_blank"}
