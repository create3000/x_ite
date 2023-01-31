---
title: WaveShaper
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [WaveShaper, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

WaveShaper ...

The WaveShaper node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** <small></small>

### SFString [in, out] **description** <small></small>

### SFBool [in, out] **enabled** <small></small>

### SFFloat [in, out] **gain** <small></small>

### MFFloat [in, out] **curve** <small></small>

### SFString [in, out] **oversample** <small></small>

### SFTime [in, out] **tailTime** <small></small>

### SFInt32 [out] **channelCount** <small></small>

### SFString [in, out] **channelCountMode** <small></small>

### SFString [in, out] **channelInterpretation** <small></small>

### SFTime [in, out] **startTime** <small></small>

### SFTime [in, out] **resumeTime** <small></small>

### SFTime [in, out] **pauseTime** <small></small>

### SFTime [in, out] **stopTime** <small></small>

### SFBool [out] **isPaused** <small></small>

### SFBool [out] **isActive** <small></small>

### SFTime [out] **elapsedTime** <small></small>

### MFNode [in, out] **children** <small></small>

## External Links

- [X3D Specification of WaveShaper](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#WaveShaper){:target="_blank"}