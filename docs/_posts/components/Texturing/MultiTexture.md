---
title: MultiTexture
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [MultiTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MultiTexture applies several individual textures to a 3D object to achieve a more complex visual effect. MultiTexture contains multiple ImageTexture, MovieTexture and PixelTexture nodes. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) values in range [0.0, 1.0] for opposite corners of the image.

The MultiTexture node belongs to the **Texturing** component and its default container field is *texture.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + MultiTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

The color field defines the RGB base values for mode operations.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **alpha** 1 <small>[0,1]</small>

The alpha field defines the alpha (1-transparency) base value for mode operations.

### MFString [in, out] **mode** [ ]

Mode field indicates the type of blending operation, both for color and for alpha channel.

#### Hints

Include the same number of mode values as textures, otherwise the default value MODULATE is added for each remaining stage. See X3D Specification [Table 18.3 Multitexture modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-MultitextureModes){:target="_blank"} for further details.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFString [in, out] **source** [ ]

Source field determines whether each image source is treated as DIFFUSE, SPECULAR or a multiplicative FACTOR. Empty string value "" indicates that no source modifier is applied for that stage.

#### Hints

Include the same number of source values as textures, otherwise the default of no source interpretation is applied for each remaining stage. See X3D Specification [Table 18.4 Values for the source field](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-ValuesForSourceField){:target="_blank"} for further details.

### MFString [in, out] **function** [ ]

Function operators COMPLEMENT or ALPHAREPLICATE can be applied after the mode blending operation. Empty string value "" indicates that no function operation is applied for that stage.

#### Hints

Include the same number of function values as textures, otherwise the default of no function operation is applied for each remaining stage. See X3D Specification [Table 18.5 Values for the function field](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-ValuesForFunctionField){:target="_blank"} for further details.

### MFNode [in, out] **texture** [ ] <small>[X3DTextureNode]</small>

Input/Output field texture.

## Description

### Hint

- Insert Shape and Appearance nodes before adding texture.
- Add a default BlendMode node to Appearance if the resulting image is transparent.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing/MultiTexture/MultiTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of MultiTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MultiTexture){:target="_blank"}
