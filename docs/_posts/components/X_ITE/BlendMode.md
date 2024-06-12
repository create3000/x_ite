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

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFColorRGBA [in, out] **blendColor** 0 0 0 0 <small>[0,1]</small>

Input/Output field *blendColor*.

### SFString [in, out] **sourceColorFactor** "SRC_ALPHA"

Input/Output field *sourceColorFactor*.

### SFString [in, out] **sourceAlphaFactor** "ONE"

Input/Output field *sourceAlphaFactor*.

### SFString [in, out] **destinationColorFactor** "ONE_MINUS_SRC_ALPHA"

Input/Output field *destinationColorFactor*.

### SFString [in, out] **destinationAlphaFactor** "ONE_MINUS_SRC_ALPHA"

Input/Output field *destinationAlphaFactor*.

### SFString [in, out] **colorEquation** "FUNC_ADD"

Input/Output field *colorEquation*.

### SFString [in, out] **alphaEquation** "FUNC_ADD"

Input/Output field *alphaEquation*.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/BlendMode/BlendMode.x3d)
{: .example-links }

## See Also

- [X3D Visual Blend Mode Online Editor](/x_ite/laboratory/x3d-visual-blend-mode-editor/)
