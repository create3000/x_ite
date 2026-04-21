---
title: RenderedTexture
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [RenderedTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

RenderedTexture is a texture node that renders the view from a local viewpoint or separate scene into an offscreen buffer, producing an image or depth map that can be rendered from model geometry in real time. The output renderings can optionally be saved via the url field as a local file or a stream source. RenderedTexture enables effects such as dynamic reflections, live video screens, or portal views by continuously updating the texture based on the rendered content. RenderedTexture creates a 2D-image texture map using a numeric array of pixel values. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) texture-coordinate values in range [0.0, 1.0] for opposite corners of the image.

The RenderedTexture node belongs to the [Texturing](/x_ite/components/overview/#texturing) component and requires at least support level **4,** its default container field is *texture.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + RenderedTexture (X3DUrlOutputObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFBool | [in, out] | [replaceImage](#fields-replaceImage) | TRUE |
| SFInt32 | [in, out] | [maximumNumberFrames](#fields-maximumNumberFrames) | 1000 |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFString | [in, out] | [update](#fields-update) | "NONE" |
| SFTime | [in, out] | [updateInterval](#fields-updateInterval) | 0.1 |
| MFInt32 | [in, out] | [dimensions](#fields-dimensions) | [ 128, 128, 4 ] |
| SFBool | [in, out] | [depthMap](#fields-depthMap) | FALSE |
| SFBool | [ ] | [repeatS](#fields-repeatS) | TRUE |
| SFBool | [ ] | [repeatT](#fields-repeatT) | TRUE |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFNode | [ ] | [textureProperties](#fields-textureProperties) | NULL |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
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

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFBool [in, out] **replaceImage** TRUE <small class="red">not supported</small>
{: #fields-replaceImage }

Whether only a single updated image file or multiple image files can be saved.

### SFInt32 [in, out] **maximumNumberFrames** 1000 <small>[0,∞)</small>
{: #fields-maximumNumberFrames }

Indicates the maximum number of independent frame files (or movie frames) that can be saved for a single series of image captures. A value of 0 indicates no limit.

### MFString [in, out] **url** [ ] <small class="red">not supported</small>
{: #fields-url }

The *url* field typically defines a relative address to a file name that can be used for storing one or more rendered textures, and can also provide a destination for output of successive image files as a video file or video stream.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warnings

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.
- Direct or indirect recursion by [Inline](/x_ite/components/networking/inline/) and/or ExternProtoDeclare *url* reloading is a security error.

### SFString [in, out] **update** "NONE" <small>["NONE"|"NEXT_FRAME_ONLY"|"ALWAYS"]</small>
{: #fields-update }

*update* controls when the next texture is captured.

#### Warnings

- An object trying to render itself in the scene graph can cause infinite loops.
- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFTime [in, out] **updateInterval** 0.1 <small>[0,∞)</small>
{: #fields-updateInterval }

Indicates time intervals between render captures when the update field is "ALWAYS". A value of 0 indicates full frame rate for render captures.

### MFInt32 [in, out] **dimensions** [ 128, 128, 4 ] <small>[0,∞)</small>
{: #fields-dimensions }

Sets values for width, height, and number of color components [1..4] for the rendered texture.

### SFBool [in, out] **depthMap** FALSE
{: #fields-depthMap }

Indicates that a generated texture contains a depth buffer for the image, instead of a color buffer. Depth maps have a single component in each pixel of the output image.

### SFBool [ ] **repeatS** TRUE
{: #fields-repeatS }

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE
{: #fields-repeatT }

Whether to repeat texture along T axis vertically from top to bottom.

### SFBool [out] **isActive** <small class="red">not supported</small>
{: #fields-isActive }

Provides a TRUE event when the data output process becomes active, and a FALSE event when the data output process is stopped.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Optional single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode|X3DBackgroundNode|Fog|X3DViewpointNode]</small>
{: #fields-children }

The *children* field can include a single specific viewpoint from which to render to texture. If no [Viewpoint](/x_ite/components/navigation/viewpoint/) or [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) is a child node, then the currently bound viewpoint in the scene is used as the perspective point. RenderedTexture can contain a single [Background](/x_ite/components/environmentaleffects/background/) or [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) node, a single [Fog](/x_ite/components/environmentaleffects/fog/) or [LocalFog](/x_ite/components/environmentaleffects/localfog/) node, a single [Viewpoint](/x_ite/components/navigation/viewpoint/) or [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) node, and a single grouping node for the portion of the scene graph to render.

## Advice

### Hints

- If no [Viewpoint](/x_ite/components/navigation/viewpoint/) or [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) is a child node, then the currently bound viewpoint in the scene is used as the perspective point.
- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert parent [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [X3D Scene Authoring Hints, Images and Videos](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- If a texture is opaque, omitting values in the alpha channel can help avoid rendering artifacts related to transparency.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)

### Warnings

- Aggregate file size can grow dramatically.
- See [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/) and [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) for special containerField values.

## Example

<x3d-canvas class="buttons-br" src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/screenshot.avif" alt="RenderedTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d)
{: .example-links }

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> |
{: .browser-compatibility }

## See Also

- [X3D Specification of RenderedTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#RenderedTexture)
