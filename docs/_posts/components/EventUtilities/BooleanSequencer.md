---
title: BooleanSequencer
date: 2022-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [BooleanSequencer, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BooleanSequencer generates periodic discrete Boolean values that can be ROUTEd to other Boolean attributes.

The BooleanSequencer node belongs to the **EventUtilities** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSequencerNode
      + BooleanSequencer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction**

Set_fraction selects input key for corresponding keyValue output.

### SFBool [in] **previous**

Send previous output value in keyValue array, and reset internal fraction field to match corresponding value in key array.

#### Hint

- "wrap around" boundary of keyValue array, i.e. continue from first to last if necessary.

### SFBool [in] **next**

Send next output value in keyValue array, and reset internal fraction field to match corresponding value in key array.

#### Hint

- "wrap around" boundary of keyValue array, i.e. continue from last to first if necessary.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for linear-interpolation function time intervals, in increasing order and corresponding to keyValues.

#### Warning

- Number of keys must match number of keyValues!

### MFBool [in, out] **keyValue** [ ] <small>[]</small>

Output values for linear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyValues!

### SFBool [out] **value_changed**

Single intermittent output value determined by current key time and corresponding keyValue pair.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.

## External Links

- [X3D Specification of BooleanSequencer](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanSequencer){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
