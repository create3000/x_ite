---
title: Delay
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [Delay, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

Delay ...

The Delay node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFFloat [in, out] **gain** <small></small>

### SFTime [in, out] **delayTime** <small></small>

### SFTime [in, out] **maxDelayTime** <small></small>

### SFTime [in, out] **tailTime** <small></small>

### SFInt32 [out] **channelCount**

### SFString [in, out] **channelCountMode** <small></small>

### SFString [in, out] **channelInterpretation** <small></small>

### SFTime [in, out] **startTime** <small>(-∞,∞)</small>

### SFTime [in, out] **resumeTime** <small>(-∞,∞)</small>

### SFTime [in, out] **pauseTime** <small>(-∞,∞)</small>

### SFTime [in, out] **stopTime** <small>(-∞,∞)</small>

### SFBool [out] **isPaused**

### SFBool [out] **isActive**

### SFTime [out] **elapsedTime**

### MFNode [in, out] **children** <small></small>

## External Links

- [X3D Specification of Delay](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#Delay){:target="_blank"}
