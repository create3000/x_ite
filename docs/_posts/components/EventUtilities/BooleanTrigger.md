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

The BooleanTrigger node belongs to the **EventUtilities** component and its default container field is *children.* It is available from X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTriggerNode
      + BooleanTrigger
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFTime [in] **set_triggerTime** <small>(-∞,∞)</small>

*set_triggerTime* provides input time event, typical event sent is TouchSensor touchTime.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [out] **triggerTrue**

*triggerTrue* outputs a true value whenever a triggerTime event is received.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## External Links

- [X3D Specification of BooleanTrigger](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanTrigger){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
