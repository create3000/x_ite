---
title: ComposedCubeMapTexture
date: 2022-01-07
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

ComposedCubeMapTexture defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes.

The ComposedCubeMapTexture node belongs to the **CubeMapTexturing** component and its default container field is *texture.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + ComposedCubeMapTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFNode [in, out] **front** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

### SFNode [in, out] **back** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

### SFNode [in, out] **left** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

### SFNode [in, out] **right** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

### SFNode [in, out] **top** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

### SFNode [in, out] **bottom** NULL <small>[X3DTexture2DNode]</small>

Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).

#### Warning

- Each child image node must have a different containerField value.
- Field originally named 'back' in X3Dv3. https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges

## Description

### Hint

- 0..6 child image nodes are allowed (ImageTexture MovieTexture PixelTexture) with corresponding containerField values: front back left right top bottom.

### Warning

- Child ImageTexture nodes must have unique containerField values for back, bottom, front, left, right, or top.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ComposedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#ComposedCubeMapTexture){:target="_blank"}
