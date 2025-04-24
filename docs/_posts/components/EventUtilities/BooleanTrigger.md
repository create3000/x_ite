---
title: BooleanTrigger
date: 2023-01-07
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

The BooleanTrigger node belongs to the **EventUtilities** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTriggerNode
      + BooleanTrigger
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFTime \[in\] [set_triggerTime](#sftime-in-set_triggertime--)
- SFBool \[out\] [triggerTrue](#sfbool-out-triggertrue)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFTime [in] **set_triggerTime** <small>(-∞,∞)</small>

*set_triggerTime* provides input time event, typical event sent is [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [out] **triggerTrue**

*triggerTrue* outputs a true value whenever a triggerTime event is received.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting)
- [X3D Event-Utility Node Diagrams](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf)

## See Also

- [X3D Specification of BooleanTrigger Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanTrigger)
