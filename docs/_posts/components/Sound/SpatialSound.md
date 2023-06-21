---
title: SpatialSound
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [SpatialSound, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

SpatialSound ...

The SpatialSound node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + SpatialSound
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFBool [ ] **spatialize** TRUE

### SFFloat [in, out] **coneInnerAngle** 6.2832 <small>[0,2π]</small>

### SFFloat [in, out] **coneOuterAngle** 6.2832 <small>[0,2π]</small>

### SFFloat [in, out] **coneOuterGain** 0 <small>(-∞,∞)</small>

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>

### SFString [in, out] **distanceModel** "INVERSE" <small>["LINEAR" "INVERSE" "EXPONENTIAL"]</small>

### SFBool [in, out] **dopplerEnabled** FALSE

### SFBool [in, out] **enableHRTF** FALSE

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

### SFFloat [in, out] **intensity** 1 <small>[0,1]</small>

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

### SFFloat [in, out] **maxDistance** 10000 <small>[0,∞)</small>

### SFFloat [in, out] **priority** 0 <small>[0,1]</small>

### SFFloat [in, out] **referenceDistance** 1 <small>[0,∞)</small>

### SFFloat [in, out] **rolloffFactor** 1 <small>[0,∞)</small>

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

## External Links

- [X3D Specification of SpatialSound](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#SpatialSound){:target="_blank"}
