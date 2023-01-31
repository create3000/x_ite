---
title: TimeTrigger
date: 2022-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [TimeTrigger, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TimeTrigger converts boolean true events to time events.

The TimeTrigger node belongs to the **EventUtilities** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTriggerNode
      + TimeTrigger
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_boolean**

If set_boolean input is true, trigger output time value.

### SFTime [out] **triggerTime**

TriggerTime is output time event, sent when set_boolean input is true.

## External Links

- [X3D Specification of TimeTrigger](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#TimeTrigger){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
