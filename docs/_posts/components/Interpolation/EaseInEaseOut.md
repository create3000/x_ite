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

EaseInEaseOut enables gradual animation transitions by modifying TimeSensor fraction outputs. Output values are modified fractions. Authors can ROUTE value_changed output events to an interpolator, a sequencer, or another SFFloat attribute.

The EaseInEaseOut node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + EaseInEaseOut
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input *fraction* for computation of corresponding easeInEaseOut output value, modifiedFraction_changed.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to easeInEaseOut array.

#### Hints

- Number of keys must be one more than the number of easeInEaseOut values!
- Typical interval for values in *key* array is within range of 0 to 1, but larger intervals can be defined with arbitrary bounds.

#### Warning

- Values in *key* array shall be monotonically non-decreasing, meaning that each value is greater than or equal to the preceding value.

### MFVec2f [in, out] **easeInEaseOut** [ ] <small>(-∞,∞)</small>

Array of paired values for easeOut fraction and easeIn fraction within each key interval.

#### Hint

- Number of *easeInEaseOut* values must be one less than the number of keys.

### SFFloat [out] **modifiedFraction_changed**

Interpolated output value determined by current key time, corresponding easeInEaseOut smoothing intervals, and corresponding key pair.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisEaseInEaseOutDEF.set_fraction
- Typical output connection is ROUTE thisEaseInEaseOutDEF.modifiedFraction_changed TO someDestinationNodeDEF.set_fraction.
- Include `<component name='Interpolation' level='3'/>`

## External Links

- [X3D Specification of EaseInEaseOut](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#EaseInEaseOut){:target="_blank"}
