---
title: ComposedCubeMapTexture
date: 2023-01-07
nav: components-CubeMapTexturing
categories: [components, CubeMapTexturing]
tags: [ComposedCubeMapTexture, CubeMapTexturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedCubeMapTexture is a texture node that defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes.

The ComposedCubeMapTexture node belongs to the **CubeMapTexturing** component and requires at least support level **1,** its default container field is *texture.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + ComposedCubeMapTexture
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFNode | [in, out] | [frontTexture](#fields-frontTexture) | NULL  |
| SFNode | [in, out] | [backTexture](#fields-backTexture) | NULL  |
| SFNode | [in, out] | [leftTexture](#fields-leftTexture) | NULL  |
| SFNode | [in, out] | [rightTexture](#fields-rightTexture) | NULL  |
| SFNode | [in, out] | [topTexture](#fields-topTexture) | NULL  |
| SFNode | [in, out] | [bottomTexture](#fields-bottomTexture) | NULL  |
| SFNode | [ ] | [textureProperties](#fields-textureProperties) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFNode [in, out] **frontTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-frontTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/), other texture nodes).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'front' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [in, out] **backTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-backTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/), other texture nodes).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'back' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [in, out] **leftTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-leftTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/), other texture nodese).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'left' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [in, out] **rightTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-rightTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/), other texture nodes).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'right' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [in, out] **topTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-topTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/), other texture nodes).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'top' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [in, out] **bottomTexture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-bottomTexture }

Parent ComposedCubeMapTexture element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/), other texture nodes).

#### Warnings

- Each child image node must have a different containerField value.
- [Field originally named 'bottom' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

#### Warning

- [TextureProperties](/x_ite/components/texturing/textureproperties/) must follow other textures in order to meet XML validation requirements.

## Advice

### Hint

- 0..6 child image nodes are allowed ([ImageTexture](/x_ite/components/texturing/imagetexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/)) with corresponding containerField values: front back left right top bottom.

### Warnings

- Each of the child [ImageTexture](/x_ite/components/texturing/imagetexture/) or [PixelTexture](/x_ite/components/texturing/pixeltexture/) nodes must have unique containerField values for backTexture, bottomTexture, frontTexture, leftTexture, rightTexture, or topTexture.
- Fields originally named back, bottom, front, left, right, or top in X3Dv3.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/screenshot.avif" alt="ComposedCubeMapTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of ComposedCubeMapTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#ComposedCubeMapTexture)
