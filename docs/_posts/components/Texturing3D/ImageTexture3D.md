---
title: ImageTexture3D
date: 2023-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [ImageTexture3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ImageTexture3D defines a 3D image-based texture map by specifying a single image file that contains complete 3D data.

The ImageTexture3D node belongs to the **Texturing3D** component and requires at least level **2,** its default container field is *texture.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture3DNode
          + ImageTexture3D (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFBool [ ] **repeatS** FALSE

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** FALSE

Whether to repeat texture along T axis vertically from top to bottom.

### SFBool [ ] **repeatR** FALSE

Whether to repeat texture along R axis from front to back.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Supported File Formats

| Encoding | File Extension  | MIME Type   | Comment             |
|----------|-----------------|-------------|---------------------|
| KTX2     | .ktx2, .ktx2.gz | image/ktx2  | TEXTURE_3D, WebGL 2 |
| DICOM    | .dcm            | image/dicom |                     |
| NRRD     | .nrrd, .nrrd.gz | image/nrrd  |                     |

## Advice

### Hints

- [Microsoft DirectDraw Surface (DDS)](https://docs.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds)
- [Digital Imaging and Communications in Medicine (DICOM)](https://www.dicomstandard.org) Nevertheless DDS, DICOM, NRRD and/or .vol formats are recommended.
- [Nearly Raw Raster Data (NRRD)](https://teem.sourceforge.net/nrrd)
- [Volume data format (VOL)](https://paulbourke.net/dataformats/volumetric)
- [X3D Scene Authoring Hints, Volume Tools and Volumes Visualization](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Volumes)
- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [X3D Architecture 33.2.2 3D texturing concepts](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texture3D.html#3DTextureconcepts)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### Warnings

- There are no required file formats, but at least one of the following formats is recommended for volume support in an X3D browser.
- Requires X3D `profile='Full'` or else include `<component name='Texturing3D' level='2'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/ImageTexture3D.x3d" update="auto" xrMovementControl=”VIEWER_POSE”></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/ImageTexture3D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/ImageTexture3D.x3d)
{: .example-links }

## See Also

- [X3D Specification of ImageTexture3D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#ImageTexture3D)
