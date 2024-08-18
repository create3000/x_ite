---
title: TextureTransformMatrix3D
date: 2023-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [TextureTransformMatrix3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureTransformMatrix3D applies a 3D transformation to texture coordinates.

The TextureTransformMatrix3D node belongs to the **Texturing3D** component and requires at least level **1,** its default container field is *textureTransform.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + X3DSingleTextureTransformNode
        + TextureTransformMatrix3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **mapping** ""

The *mapping* label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node *mapping* validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFMatrix4f [in, out] **matrix** 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 <small>(-∞,∞)</small>

*matrix* is a generalized, unfiltered 4x4 transformation *matrix* to modify texture (opposite effect appears on geometry).

## Advice

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding TextureTransformMatrix3D.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)

### Warnings

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.
- Requires X3D `profile='Full'` or else include `<component name='Texturing3D' level='1'/>`

## See Also

- [X3D Specification of TextureTransformMatrix3D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureTransformMatrix3D)
