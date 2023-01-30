---
title: ImageTexture3D
date: 2022-01-07
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

The ImageTexture3D node belongs to the **Texturing3D** component and its container field is *texture.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DTexture3DNode
        + ImageTexture3D (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFBool [ ] **repeatS** FALSE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** FALSE

Whether to vertically repeat texture along T axis.

### SFBool [ ] **repeatR** FALSE

Whether to vertically repeat texture along R axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## Description

### Hints

- Can contain a single TextureProperties node.
- Insert Shape and Appearance nodes before adding texture.
- Supported file formats are [NRRD](https://teem.sourceforge.net/nrrd/format.html){:target="_blank"}, and also [DICOM](https://en.wikipedia.org/wiki/DICOM){:target="_blank"}.

Warning
-------

- There are no required file formats. Nevertheless: DDS, DICOM, and/or .vol formats are recommended.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing3D/ImageTexture3D/ImageTexture3D.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ImageTexture3D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#ImageTexture3D){:target="_blank"}
- [See X3D Specification 33.2.2 3D texturing concepts](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#3DTextureconcepts){:target="_blank"}
