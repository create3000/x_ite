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
  + X3DChildNode
    + HAnimMotion
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

### SFBool [in] **next**

### SFBool [in] **previous**

### SFTime [in, out] **frameDuration** 0.1 <small>(0,∞)</small>

### SFInt32 [in, out] **frameIncrement** 1 <small>(-∞,∞)</small>

### SFInt32 [in, out] **frameIndex** 0 <small>[0,∞)</small>

### SFBool [in, out] **loop** FALSE

### SFString [in, out] **channels** ""

### MFBool [in, out] **channelsEnabled** [ ]

### SFString [in, out] **joints** ""

### SFInt32 [in, out] **loa** -1 <small>[-1,4]</small>

### SFInt32 [in, out] **startFrame** 0 <small>[0,∞)</small>

### SFInt32 [in, out] **endFrame** 0 <small>[0,∞)</small>

### MFFloat [in, out] **values** [ ] <small>(-∞,∞)</small>

### SFTime [out] **cycleTime**

### SFTime [out] **elapsedTime**

### SFInt32 [out] **frameCount**

## External Links

- [X3D Specification of HAnimMotion](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimMotion){:target="_blank"}
