---
title: BlendMode
date: 2023-01-07
nav: components-X_ITE
categories: [components, X_ITE]
tags: [BlendMode, X_ITE]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BlendMode controls how pixels of an objects are drawn. Pixels can be drawn using a function that blends the incoming (source) RGBA values with the RGBA values that are already in the frame buffer (the destination values). BlendMode is an X3DAppearanceChildNode node that handles blend operations.

The BlendMode node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and its default container field is *blendMode.* It is available in X_ITE.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DAppearanceChildNode
      + BlendMode
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFColorRGBA | [in, out] | [blendColor](#fields-blendColor) | 0 0 0 0  |
| SFString | [in, out] | [sourceColorFactor](#fields-sourceColorFactor) | "SRC |
| SFString | [in, out] | [sourceAlphaFactor](#fields-sourceAlphaFactor) | "ONE" |
| SFString | [in, out] | [destinationColorFactor](#fields-destinationColorFactor) | "ONE |
| SFString | [in, out] | [destinationAlphaFactor](#fields-destinationAlphaFactor) | "ONE |
| SFString | [in, out] | [colorEquation](#fields-colorEquation) | "FUNC |
| SFString | [in, out] | [alphaEquation](#fields-alphaEquation) | "FUNC |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColorRGBA [in, out] **blendColor** 0 0 0 0 <small>[0,1]</small>
{: #fields-blendColor }

The *blendColor* may be used to calculate the source and destination blending factors.

### SFString [in, out] **sourceColorFactor** "SRC_ALPHA"
{: #fields-sourceColorFactor }

Specifies how the red, green, and blue source blending factors are computed.

Source and destination parameters must be one of the following symbolic constants:

- ZERO
- ONE
- SRC_COLOR
- ONE_MINUS_SRC_COLOR
- DST_COLOR
- ONE_MINUS_DST_COLOR
- SRC_ALPHA
- ONE_MINUS_SRC_ALPHA
- DST_ALPHA
- ONE_MINUS_DST_ALPHA
- CONSTANT_COLOR
- ONE_MINUS_CONSTANT_COLOR
- CONSTANT_ALPHA
- ONE_MINUS_CONSTANT_ALPHA

### SFString [in, out] **sourceAlphaFactor** "ONE"
{: #fields-sourceAlphaFactor }

Specifies how the alpha source blending factors are computed.

### SFString [in, out] **destinationColorFactor** "ONE_MINUS_SRC_ALPHA"
{: #fields-destinationColorFactor }

Specifies how the red, green, and blue destination blending factors are computed.

### SFString [in, out] **destinationAlphaFactor** "ONE_MINUS_SRC_ALPHA"
{: #fields-destinationAlphaFactor }

Specifies how the alpha destination blending factors are computed.

### SFString [in, out] **colorEquation** "FUNC_ADD"
{: #fields-colorEquation }

Specifies the RGB blend equation, how the red, green, and blue components of the source and destination colors are combined. It must be:

- FUNC_ADD
- FUNC_SUBTRACT
- FUNC_REVERSE_SUBTRACT

### SFString [in, out] **alphaEquation** "FUNC_ADD"
{: #fields-alphaEquation }

Specifies the alpha blend equation, how the alpha component of the source and destination colors are combined. It must be:

- FUNC_ADD
- FUNC_SUBTRACT
- FUNC_REVERSE_SUBTRACT

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/X_ITE/BlendMode/screenshot.avif" alt="BlendMode"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d)
{: .example-links }

## See Also

- [X3D Visual Blend Mode Online Editor](/x_ite/laboratory/x3d-visual-blend-mode-editor/)
