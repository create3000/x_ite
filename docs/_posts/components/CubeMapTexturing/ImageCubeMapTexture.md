---
title: ImageCubeMapTexture
date: 2023-01-07
nav: components-CubeMapTexturing
categories: [components, CubeMapTexturing]
tags: [ImageCubeMapTexture, CubeMapTexturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ImageCubeMapTexture is a texture node that defines a cubic environment map source as a single file format that contains multiple images, one for each side.

The ImageCubeMapTexture node belongs to the [CubeMapTexturing](/x_ite/components/overview/#cubemaptexturing) component and requires at least support level **2,** its default container field is *texture.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + ImageCubeMapTexture (X3DUrlObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
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

### SFBool [in, out] **load** TRUE
{: #fields-load }

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>
{: #fields-url }

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>
{: #fields-autoRefresh }

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>
{: #fields-autoRefreshTimeLimit }

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Supported File Formats

Any image file format supported by the web browser, but at least:

| Encoding | File Extension  | MIME Type  | Comment                   |
|----------|-----------------|------------|---------------------------|
| PNG      | .png            | image/png  | lossless                  |
| AVIF     | .avif           | image/avif | lossless/lossy            |
| WebP     | .webp           | image/webp | lossless/lossy            |
| JPEG     | .jpeg, .jpg     | image/jpeg | lossy                     |
| GIF      | .gif            | image/gif  | lossy                     |
| SVG      | .svg            | image/svg  |                           |
| KTX2     | .ktx2, .ktx2.gz | image/ktx2 | TEXTURE_CUBE_MAP, WebGL 2 |

Images from PNG to SVG format can be in panorama format or skybox format.

### Panorama Format (Spherical or Equirectangular Projection)

Panorama images must have an exact aspect ratio of 2:1 of width to height.

![Panorama Format](/assets/img/components/helipad.jpg){: .normal .w-50 }

### Skybox Format

Skybox images must have an exact aspect ratio of 4:3 of width to height.

![Skybox Format](/assets/img/components/skybox_texture.jpg){: .normal .w-50 }![Skybox Scheme](/assets/img/components/skybox.svg){: .normal .w-50 }

## Advice

### Hints

- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

## See Also

- [X3D Specification of ImageCubeMapTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#ImageCubeMapTexture)
