---
title: TextureProjector
date: 2023-01-31
nav: components-TextureProjector
categories: [components, TextureProjector]
tags: [TextureProjector, TextureProjector]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

TextureProjector ...

The TextureProjector node belongs to the **TextureProjector** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &#38; for & ampersand character, or &#34; for " quotation-mark character).

### SFBool [in, out] **on** TRUE

Enables/disables this texture projection source.

### SFBool [in, out] **global** TRUE

Global texture projection illuminates all objects within their volume of influence. Scoped texture projection (*global* false) only illuminates objects within the same transformation hierarchy.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

Position of center of texture projection relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>

Direction for projection.

### SFVec3f [in, out] **upVector** 0 0 1 <small>(-∞,∞)</small>

*upVector* describes the roll of the camera by saying which direction is up for the camera's orientation.

### SFFloat [in, out] **fieldOfView** π/4 <small>(0,π)</small>

Preferred minimum viewing angle for this projection in radians, providing minimum height or minimum width (whichever is smaller). Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Warning

- This field differs for TextureProjectorParallel and TextureProjector.

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>

Minimum distance necessary for texture display.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>

Maximum distance necessary for texture display.

### SFFloat [out] **aspectRatio**

*aspectRatio* is the ratio of width and height that is projected.

### SFNode [in, out] **texture** NULL <small>[X3DTexture2DNode]</small>

Single contained *texture* node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.

#### Hints

- If *texture* node is NULL or unspecified, corresponding Shape geometry for this Appearance is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images){:target="_blank"}
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html){:target="_blank"}
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texture3D.html){:target="_blank"}

## External Links

- [X3D Specification of TextureProjector](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/textureprojector.html#TextureProjector){:target="_blank"}
