---
title: StreamAudioSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [StreamAudioSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

StreamAudioSource ...

The StreamAudioSource node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + StreamAudioSource
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

### MFString [in, out] **streamIdentifier** [ ]

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>

### SFBool [out] **isPaused**

### SFBool [out] **isActive**

### SFTime [out] **elapsedTime**

## External Links

- [X3D Specification of StreamAudioSource](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#StreamAudioSource){:target="_blank"}
