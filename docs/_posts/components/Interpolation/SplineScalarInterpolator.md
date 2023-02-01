---
title: SplineScalarInterpolator
date: 2022-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [SplineScalarInterpolator, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SplineScalarInterpolator performs non-linear interpolation among paired lists of float values and velocities to produce an SFFloat value_changed output event.

The SplineScalarInterpolator node belongs to the **Interpolation** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + SplineScalarInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

Set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.

### SFBool [in, out] **closed** FALSE

Whether or not the curve is closed (i.e. matching end values), with continuous velocity vectors as the interpolator transitions from the last key to the first key.

#### Warnings

- If velocity vectors at first and last keys are specified, the closed field is ignored. If keyValues at first and last key are not identical, the closed field is ignored.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for nonlinear-interpolation function time intervals, in increasing order and corresponding to keyValue, keyVelocity array values.

#### Warning

- Number of keys must match number of keyValues!

### MFFloat [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for nonlinear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyValues!

### MFFloat [in, out] **keyVelocity** [ ] <small>(-∞,∞)</small>

Output values for nonlinear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyVelocity values!

### SFBool [in, out] **normalizeVelocity** FALSE

NormalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.

#### See Also

- [X3D 19.2.3 Non-linear interpolation](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/interpolators.html#NonlinearInterpolation){:target="_blank"}

### SFFloat [out] **value_changed**

Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- Include `<component name='Interpolation' level='4'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Interpolation/SplineScalarInterpolator/SplineScalarInterpolator.x3d"></x3d-canvas>

<table class="x3d-widgets"><tbody><tr><td><input id="key-velocity" type="checkbox" value="true"></input><label for="key-velocity">Key Velocity</label></td><td><input id="normalize-velocity" type="checkbox" value="true"></input><label for="normalize-velocity">Normalize Key Velocity
</label></td></tr></tbody></table>

- [/c3-source-example]

## See Also

- [ScalarInterpolator](/x_ite/components/interpolation/scalarinterpolator)

## External Links

- [X3D Specification of SplineScalarInterpolator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#SplineScalarInterpolator){:target="_blank"}
