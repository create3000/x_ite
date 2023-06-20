---
title: ListenerPointSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [ListenerPointSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ListenerPointSource ...

The ListenerPointSource node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** TRUE

### SFVec3f [in, out] **position** <small></small>

### SFRotation [in, out] **orientation** <small></small>

### SFFloat [in, out] **gain** <small></small>

### SFBool [in, out] **dopplerEnabled** <small></small>

### SFFloat [in, out] **interauralDistance** <small></small>

### SFBool [in, out] **trackCurrentView** <small></small>

### SFTime [in, out] **startTime** <small>(-∞,∞)</small>

### SFTime [in, out] **resumeTime** <small>(-∞,∞)</small>

### SFTime [in, out] **pauseTime** <small>(-∞,∞)</small>

### SFTime [in, out] **stopTime** <small>(-∞,∞)</small>

### SFBool [out] **isPaused**

### SFBool [out] **isActive**

### SFTime [out] **elapsedTime**

## External Links

- [X3D Specification of ListenerPointSource](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#ListenerPointSource){:target="_blank"}
