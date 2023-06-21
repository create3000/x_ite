---
title: AudioDestination
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [AudioDestination, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

AudioDestination ...

The AudioDestination node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFFloat [in, out] **gain** <small>(-∞,∞)</small>

### SFInt32 [in, out] **maxChannelCount** <small>[0,∞)</small>

### SFInt32 [out] **channelCount**

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>

### SFString [out] **mediaDeviceID**

### SFBool [out] **isActive**

### MFNode [in, out] **children** <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

## External Links

- [X3D Specification of AudioDestination](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#AudioDestination){:target="_blank"}
