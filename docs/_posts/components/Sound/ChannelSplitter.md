---
title: ChannelSplitter
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [ChannelSplitter, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ChannelSplitter ...

The ChannelSplitter node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + X3DSoundChannelNode
        + ChannelSplitter
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

### SFInt32 [out] **channelCount**

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

### MFNode [in, out] **outputs** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

## External Links

- [X3D Specification of ChannelSplitter](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#ChannelSplitter){:target="_blank"}
