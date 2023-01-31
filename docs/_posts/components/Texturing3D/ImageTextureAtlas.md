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

ImageTextureAtlas ...

The ImageTextureAtlas node belongs to the **Texturing3D** component and its default container field is *texture.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **load** TRUE

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

### SFInt32 [in, out] **slicesOverX** 0 <small>[0,∞)</small>

### SFInt32 [in, out] **slicesOverY** 0 <small>[0,∞)</small>

### SFInt32 [in, out] **numberOfSlices** 0 <small>[0,∞)</small>

### SFBool [ ] **repeatS** FALSE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** FALSE

Whether to vertically repeat texture along T axis.

### SFBool [ ] **repeatR** FALSE

Whether to vertically repeat texture along R axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## External Links

- [X3D Specification of ImageTextureAtlas](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing3d.html#ImageTextureAtlas){:target="_blank"}
