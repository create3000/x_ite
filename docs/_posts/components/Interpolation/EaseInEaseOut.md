---
title: EaseInEaseOut
date: 2022-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [EaseInEaseOut, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

EaseInEaseOut enables gradual animation transitions by modifying TimeSensor fraction outputs. Output values are modified fractions that can be ROUTEd to an interpolator, a sequencer, or another SFFloat attribute.

The EaseInEaseOut node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + EaseInEaseOut
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

Set_fraction selects input fraction for computation of corresponding easeInEaseOut output value, modifiedFraction_changed.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for linear-interpolation function time intervals, in increasing order and corresponding to easeInEaseOut array.

#### Hint

Number of keys must be one more than the number of easeInEaseOut values!

### MFVec2f [in, out] **easeInEaseOut** [ ] <small>(-∞,∞)</small>

Array of paired values for easeOut fraction and easeIn fraction within each key interval.

#### Hint

Number of easeInEaseOut values must be one less than the number of keys.

### SFFloat [out] **modifiedFraction_changed**

Interpolated output value determined by current key time, corresponding easeInEaseOut smoothing intervals, and corresponding key pair.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisEaseInEaseOutDEF.set_fraction
- Typical output connection is ROUTE thisEaseInEaseOutDEF.modifiedFraction_changed TO someDestinationNodeDEF.set_fraction.
- Include `<component name='Interpolation' level='3'/>`

## External Links

- [X3D Specification of EaseInEaseOut](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#EaseInEaseOut){:target="_blank"}
