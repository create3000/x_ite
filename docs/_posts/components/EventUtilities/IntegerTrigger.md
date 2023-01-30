---
title: IntegerTrigger
date: 2022-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [IntegerTrigger, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IntegerTrigger converts boolean true or time input events to an integer value (for example, when animating whichChoice in a Switch node).

The IntegerTrigger node belongs to the **EventUtilities** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTriggerNode
      + IntegerTrigger
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_boolean**

If set_boolean input is true, trigger output of integer value.

### SFInt32 [in, out] **integerKey** -1 <small>(-∞,∞)</small>

IntegerKey is value for output when triggered.

### SFInt32 [out] **triggerValue**

TriggerValue provides integer event output matching integerKey when true set_boolean received.

## External Links

- [X3D Specification of IntegerTrigger](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#IntegerTrigger){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
