---
title: RenderedTexture
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [RenderedTexture, Texturing, VRML]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

A RenderedTexture is a texture node that renders a separate scene or viewpoint into an offscreen buffer, producing an image that can be applied to geometry in real time. It enables effects such as dynamic reflections, live video screens, shadows, or portals by continuously updating the texture based on the rendered content.

The RenderedTexture node belongs to the [Texturing](/x_ite/components/overview/#texturing) component and requires at least support level **4,** its default container field is *texture.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE. This node is available in X_ITE, Castle and X3DOM.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + RenderedTexture
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFString | [in, out] | [update](#fields-update) | "NONE"  |
| MFInt32 | [in, out] | [dimensions](#fields-dimensions) | [ 128, 128, 4, 1, 1 ] |
| SFBool | [in, out] | [depthMap](#fields-depthMap) | FALSE |
| SFNode | [in, out] | [background](#fields-background) | NULL  |
| SFNode | [in, out] | [fog](#fields-fog) | NULL  |
| SFNode | [in, out] | [viewpoint](#fields-viewpoint) | NULL  |
| SFNode | [in, out] | [scene](#fields-scene) | NULL  |
| SFBool | [ ] | [repeatS](#fields-repeatS) | TRUE |
| SFBool | [ ] | [repeatT](#fields-repeatT) | TRUE |
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

### SFString [in, out] **update** "NONE" <small>["NONE"|"NEXT_FRAME_ONLY"|"ALWAYS"]</small>
{: #fields-update }

*update* controls regeneration of the texture.

#### Warnings

- An object trying to render itself in the scene graph can cause infinite loops.
- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFInt32 [in, out] **dimensions** [ 128, 128, 4, 1, 1 ] <small>[0,∞)</small>
{: #fields-dimensions }

Sets the width, height, color components and number of multiple render targets (MRT).

### SFBool [in, out] **depthMap** FALSE
{: #fields-depthMap }

The generated texture will contain the depth buffer of the image (instead of the color buffer as usual).

### SFNode [in, out] **background** NULL <small>[X3DBackgroundNode]</small>
{: #fields-background }

Allows you to specify a background node explicitly, which will then be used during the render-to-texture process. If the value is NULL the currently bound background in the scene is used.

### SFNode [in, out] **fog** NULL <small>[X3DFogObject]</small>
{: #fields-fog }

Allows you to specify a fog node explicitly, which will then be used during the render-to-texture process. If the value is NULL the currently bound fog in the scene is used.

### SFNode [in, out] **viewpoint** NULL <small>[X3DViewpointNode]</small>
{: #fields-viewpoint }

Allows you to explicitly specify a viewpoint node from which to render to texture. If the value is NULL the currently bound viewpoint in the scene is used.

### SFNode [in, out] **scene** NULL <small>[X3DChildNode]</small>
{: #fields-scene }

Sets a separate, potentially independent, sub-scene. If the value is NULL the current scene is used.

### SFBool [ ] **repeatS** TRUE
{: #fields-repeatS }

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE
{: #fields-repeatT }

Whether to repeat texture along T axis vertically from top to bottom.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Optional single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Example

<x3d-canvas class="buttons-br" src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/screenshot.avif" alt="RenderedTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d)
{: .example-links }

## Browser Compatibility

| X_ITE X3D Browser | Castle Game Engine | X3DOM | FreeWRL |
|-------|--------|-------|
| <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-question blue" title="Unknown Supported"></i> | <i class="fa-solid fa-circle-question blue" title="Unknown Supported"></i> | <i class="fa-solid fa-circle-question blue" title="Unknown Supported"></i> |
{: .browser-compatibility }

## See Also

- [X3D Specification of RenderedTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#RenderedTexture)
