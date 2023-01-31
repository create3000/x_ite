---
title: BufferAudioSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [BufferAudioSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

BufferAudioSource ...

The BufferAudioSource node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** <small></small>

### SFString [in, out] **description** <small></small>

### SFBool [in, out] **enabled** <small></small>

### SFBool [in, out] **load** <small></small>

### MFString [in, out] **url** <small></small>

### SFTime [in, out] **autoRefresh** <small></small>

### SFTime [in, out] **autoRefreshTimeLimit** <small></small>

### SFFloat [in, out] **gain** <small></small>

### MFFloat [in, out] **buffer** <small></small>

### SFFloat [in, out] **detune** <small></small>

### SFTime [in, out] **bufferDuration** <small></small>

### SFTime [in, out] **loopStart** <small></small>

### SFTime [in, out] **loopEnd** <small></small>

### SFInt32 [in, out] **numberOfChannels** <small></small>

### SFFloat [in, out] **playbackRate** <small></small>

### SFFloat [in, out] **sampleRate** <small></small>

### SFInt32 [out] **bufferLength** <small></small>

### SFInt32 [out] **channelCount** <small></small>

### SFString [in, out] **channelCountMode** <small></small>

### SFString [in, out] **channelInterpretation** <small></small>

### SFBool [in, out] **loop** <small></small>

### SFTime [in, out] **startTime** <small></small>

### SFTime [in, out] **resumeTime** <small></small>

### SFTime [in, out] **pauseTime** <small></small>

### SFTime [in, out] **stopTime** <small></small>

### SFBool [out] **isPaused** <small></small>

### SFBool [out] **isActive** <small></small>

### SFTime [out] **elapsedTime** <small></small>

## External Links

- [X3D Specification of BufferAudioSource](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BufferAudioSource){:target="_blank"}