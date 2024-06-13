---
title: PixelTexture3D
date: 2023-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [PixelTexture3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PixelTexture3D defines a 3D image-based texture map as an explicit array of pixel values (image field).

The PixelTexture3D node belongs to the **Texturing3D** component and requires at least level **1,** its default container field is *texture.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture3DNode
          + PixelTexture3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### MFInt32 [in, out] **image** [ 0, 0, 0, 0 ]

*image* describes raw data for this 3D texture: number of components to the *image* [0,4], width, height and depth of the texture, followed by (width x height x depth) pixel values.

#### Warning

- The order of initial values in [PixelTexture](/x_ite/components/texturing/pixeltexture/) and PixelTexture3D *image* arrays are different.

### SFBool [ ] **repeatS** FALSE

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** FALSE

Whether to repeat texture along T axis vertically from top to bottom.

### SFBool [ ] **repeatR** FALSE

Whether to repeat texture along R axis from front to back.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Advice

### Hints

- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [X3D Architecture 33.2.2 3D texturing concepts](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/texture3D.html#3DTextureconcepts){:target="_blank"}

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Texturing3D' level='1'/>`

## See Also

- [X3D Specification of PixelTexture3D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#PixelTexture3D){:target="_blank"}
