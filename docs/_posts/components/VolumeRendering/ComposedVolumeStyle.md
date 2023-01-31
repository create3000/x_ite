---
title: ComposedVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ComposedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedVolumeStyle allows compositing multiple rendering styles into single rendering pass.

The ComposedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ComposedVolumeStyle
```

## Fields

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in, out] **renderStyle** [ ] <small>[X3DComposableVolumeRenderStyleNode]</small>

Input/Output field renderStyle.

## Description

### Hint

- Contains multiple RenderStyle nodes.

## External Links

- [X3D Specification of ComposedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ComposedVolumeStyle){:target="_blank"}
