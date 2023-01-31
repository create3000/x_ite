---
title: PositionInterpolator2D
date: 2022-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [PositionInterpolator2D, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PositionInterpolator2D generates a series of SFVec2f values that can be ROUTEd to a SFVec2f attribute.

The PositionInterpolator2D node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + PositionInterpolator2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

Set_fraction selects input key for corresponding keyValue output.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for linear-interpolation function time intervals, in increasing order and corresponding to keyValues.

#### Hints

Number of keyValues must be an integer multiple of the number of keys! KeyValue/key integer multiple defines how many coordinates are sent in value_changed outputOnlys.

### MFVec2f [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for linear interpolation, each corresponding to time-fraction keys.

#### Hints

Number of keyValues must be an integer multiple of the number of keys! KeyValue/key integer multiple defines how many coordinates are sent in value_changed outputOnlys.

### SFVec2f [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

#### Hint

KeyValue/key integer multiple defines how many coordinates are sent in value_changed outputOnlys.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction.
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- Include `<component name='Interpolation' level='3'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/PositionInterpolator2D.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PositionInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#PositionInterpolator2D){:target="_blank"}
