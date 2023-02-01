---
title: PositionInterpolator
date: 2022-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [PositionInterpolator, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PositionInterpolator generates a series of triplet values. Results can be ROUTEd to a `<Transform>` node's 'translation' attribute or another Vector3Float attribute

The PositionInterpolator node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + PositionInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input key for corresponding keyValue output.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for linear-interpolation function time intervals, in increasing order and corresponding to keyValues.

#### Warning

- Number of keys must match number of keyValues!

### MFVec3f [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for linear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyValues!

### SFVec3f [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator/PositionInterpolator.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#PositionInterpolator){:target="_blank"}
