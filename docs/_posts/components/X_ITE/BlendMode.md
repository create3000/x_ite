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

The BlendMode node belongs to the **X_ITE** component and its default container field is *blendMode.* It is available in X_ITE.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DAppearanceChildNode
      + BlendMode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](../core/metadataboolean), [MetadataDouble](../core/metadatadouble), [MetadataFloat](../core/metadatafloat), [MetadataInteger](../core/metadatainteger), [MetadataString](../core/metadatastring) or [MetadataSet](../core/metadataset) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFColorRGBA [in, out] **blendColor** 0 0 0 0 <small>[0,1]</small>

The *blendColor* may be used to calculate the source and destination blending factors.

### SFString [in, out] **sourceColorFactor** "SRC_ALPHA"

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

Specifies how the alpha source blending factors are computed.

### SFString [in, out] **destinationColorFactor** "ONE_MINUS_SRC_ALPHA"

Specifies how the red, green, and blue destination blending factors are computed.

### SFString [in, out] **destinationAlphaFactor** "ONE_MINUS_SRC_ALPHA"

Specifies how the alpha destination blending factors are computed.

### SFString [in, out] **colorEquation** "FUNC_ADD"

Specifies the RGB blend equation, how the red, green, and blue components of the source and destination colors are combined. It must be:

- FUNC_ADD
- FUNC_SUBTRACT
- FUNC_REVERSE_SUBTRACT

### SFString [in, out] **alphaEquation** "FUNC_ADD"

Specifies the alpha blend equation, how the alpha component of the source and destination colors are combined. It must be:

- FUNC_ADD
- FUNC_SUBTRACT
- FUNC_REVERSE_SUBTRACT

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d" update="auto"></x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.zip) · [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d)

## See Also

- [X3D Visual Blend Mode Online Editor](/x_ite/laboratory/x3d-visual-blend-mode-editor/)
