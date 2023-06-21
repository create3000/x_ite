---
title: BiquadFilter
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [BiquadFilter, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

BiquadFilter ...

The BiquadFilter node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFFloat [in, out] **detune** 0 <small>[0,∞)</small>

### SFFloat [in, out] **frequency** 350 <small>[0,∞)</small>

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

### SFFloat [in, out] **qualityFactor** 1 <small>[0,∞)</small>

### SFTime [in, out] **tailTime** 0 <small>[0,∞)</small>

### SFString [in, out] **type** "LOWPASS" <small>["LOWPASS", "HIGHPASS", "BANDPASS", "LOWSHELF", "HIGHSHELF", "PEAKING", "NOTCH", "ALLPASS"]</small>

### SFInt32 [out] **channelCount**

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>

### SFBool [out] **isPaused**

### SFBool [out] **isActive**

### SFTime [out] **elapsedTime**

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

## External Links

- [X3D Specification of BiquadFilter](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BiquadFilter){:target="_blank"}
