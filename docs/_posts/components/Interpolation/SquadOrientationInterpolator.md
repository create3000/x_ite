---
title: SquadOrientationInterpolator
date: 2022-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [SquadOrientationInterpolator, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SquadOrientationInterpolator performs non-linear interpolation among paired lists of rotation values to produce an SFRotation value_changed output event.

The SquadOrientationInterpolator node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + SquadOrientationInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input key for corresponding use of keyValue, keyVelocity values for output computation.

### SFBool [in, out] **closed** FALSE

Input/Output field closed.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for nonlinear-interpolation function time intervals, in increasing order and corresponding to keyValue, keyVelocity array values.

#### Warning

- Number of keys must match number of keyValues!

### MFRotation [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for nonlinear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyValues!

### SFRotation [out] **value_changed**

Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.

## Description

### Hints

- Squad is an acronym for Spherical Cubic Interpolation.
- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- Include `<component name='Interpolation' level='5'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/SquadOrientationInterpolator.x3d"></x3d-canvas>

## External Links

- [X3D Specification of SquadOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#SquadOrientationInterpolator){:target="_blank"}
