---
title: BooleanTrigger
date: 2022-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [BooleanTrigger, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BooleanTrigger converts time events to boolean true events.

The BooleanTrigger node belongs to the **EventUtilities** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTriggerNode
      + BooleanTrigger
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFTime [in] **set_triggerTime**

Set_triggerTime provides input time event, typical event sent is TouchSensor touchTime.

### SFBool [out] **triggerTrue**

TriggerTrue outputs a true value whenever a triggerTime event is received.

## External Links

- [X3D Specification of BooleanTrigger](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanTrigger){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
