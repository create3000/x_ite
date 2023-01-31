---
title: HAnimMotion
date: 2023-01-31
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimMotion, HAnim]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

HAnimMotion ...

The HAnimMotion node belongs to the **HAnim** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** <small></small>

### SFBool [undefined] **next** <small></small>

### SFBool [undefined] **previous** <small></small>

### SFTime [in, out] **frameDuration** <small></small>

### SFInt32 [in, out] **frameIncrement** <small></small>

### SFInt32 [in, out] **frameIndex** <small></small>

### SFBool [in, out] **loop** <small></small>

### SFString [in, out] **channels** <small></small>

### MFBool [in, out] **channelsEnabled** <small></small>

### MFString [in, out] **joints** <small></small>

### SFInt32 [in, out] **loa** <small></small>

### SFInt32 [in, out] **startFrame** <small></small>

### SFInt32 [in, out] **endFrame** <small></small>

### MFFloat [in, out] **values** <small></small>

### SFTime [out] **cycleTime** <small></small>

### SFTime [out] **elapsedTime** <small></small>

### SFInt32 [out] **frameCount** <small></small>

## External Links

- [X3D Specification of HAnimMotion](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimMotion){:target="_blank"}
