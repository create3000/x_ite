---
title: SquadOrientationInterpolator
date: 2023-01-07
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

The SquadOrientationInterpolator node belongs to the **Interpolation** component and requires at least level **5,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + SquadOrientationInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input key for corresponding use of keyValue, keyVelocity values for output computation.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [in, out] **closed** FALSE

Input/Output field *closed*.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.

#### Hint

- Typical interval for values in *key* array is within range of 0 to 1, but larger intervals can be defined with arbitrary bounds.

#### Warnings

- Number of keys must match number of keyValues!
- Values in *key* array shall be monotonically non-decreasing, meaning that each value is greater than or equal to the preceding value.

### MFRotation [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.

#### Warning

- Number of keys must match number of keyValues!

### SFRotation [out] **value_changed**

Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Squad is an acronym for Spherical Cubic Interpolation.
- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Interpolation' level='5'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/SquadOrientationInterpolator.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/screenshot.png" alt="SquadOrientationInterpolator"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/SquadOrientationInterpolator.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Interpolation/SquadOrientationInterpolator/SquadOrientationInterpolator.x3d)
{: .example-links }

## See Also

- [X3D Specification of SquadOrientationInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#SquadOrientationInterpolator)
