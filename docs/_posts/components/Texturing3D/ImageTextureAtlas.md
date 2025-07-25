---
title: ImageTextureAtlas
date: 2023-01-31
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [ImageTextureAtlas, Texturing3D]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ImageTextureAtlas defines a 3D image-based texture map by specifying a single image file that contains slices for complete 3D data.

The ImageTextureAtlas node belongs to the **Texturing3D** component and its default container field is *texture.* It is available since X3D version 4.0 or later.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE. This node is available in X_ITE and X3DOM.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture3DNode
          + ImageTextureAtlas (X3DUrlObject)*
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
| SFInt32 | [in, out] | [slicesOverX](#fields-slicesOverX) | 0  |
| SFInt32 | [in, out] | [slicesOverY](#fields-slicesOverY) | 0  |
| SFInt32 | [in, out] | [numberOfSlices](#fields-numberOfSlices) | 0  |
| SFBool | [ ] | [repeatS](#fields-repeatS) | FALSE |
| SFBool | [ ] | [repeatT](#fields-repeatT) | FALSE |
| SFBool | [ ] | [repeatR](#fields-repeatR) | FALSE |
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

### SFInt32 [in, out] **slicesOverX** 0 <small>[0,∞)</small>
{: #fields-slicesOverX }

Number of images in x direction.

### SFInt32 [in, out] **slicesOverY** 0 <small>[0,∞)</small>
{: #fields-slicesOverY }

Number of images in y direction.

### SFInt32 [in, out] **numberOfSlices** 0 <small>[0,∞)</small>
{: #fields-numberOfSlices }

Total number of images.

### SFBool [ ] **repeatS** FALSE
{: #fields-repeatS }

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** FALSE
{: #fields-repeatT }

Whether to repeat texture along T axis vertically from top to bottom.

### SFBool [ ] **repeatR** FALSE
{: #fields-repeatR }

Whether to repeat texture along R axis from front to back.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Supported File Formats

Any image file format supported by the web browser, but at least:

| Encoding | File Extension | MIME Type  | Comment        |
|----------|----------------|------------|----------------|
| PNG      | .png           | image/png  | lossless       |
| AVIF     | .avif          | image/avif | lossless/lossy |
| WebP     | .webp          | image/webp | lossless/lossy |
| JPEG     | .jpeg, .jpg    | image/jpeg | lossy          |
| GIF      | .gif           | image/gif  | lossy          |
| SVG      | .svg           | image/svg  |                |

An example image could look like this:

![image texture atlas](/assets/img/components/scan1.avif){: .normal .w-50 }

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/ImageTextureAtlas.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/screenshot.avif" alt="ImageTextureAtlas"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/ImageTextureAtlas.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing3D/ImageTextureAtlas/ImageTextureAtlas.x3d)
{: .example-links }

## See Also

- [X3D Specification of Texturing3D component](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html)
