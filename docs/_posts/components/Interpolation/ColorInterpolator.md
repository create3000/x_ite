---
title: ColorInterpolator
date: 2023-01-07
nav: components-Interpolation
categories: [components, Interpolation]
tags: [ColorInterpolator, Interpolation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ColorInterpolator generates a range of color values. Authors can ROUTE value_changed output events to various color fields of Material or Color nodes.

The ColorInterpolator node belongs to the **Interpolation** component and requires at least level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + ColorInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input key for corresponding keyValue output.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.

#### Hint

- Typical interval for values in *key* array is within range of 0 to 1, but larger intervals can be defined with arbitrary bounds.

#### Warnings

- Number of keys must match number of keyValues!
- Values in *key* array shall be monotonically non-decreasing, meaning that each value is greater than or equal to the preceding value.

### MFColor [in, out] **keyValue** [ ] <small>[0,1]</small>

Output values for linear interpolation, each corresponding to an input-fraction value in the key array.

#### Hint

- [Identical adjacent entries in *keyValue* array have the effect of defining constant-value step functions.](https://en.wikipedia.org/wiki/Step_function)

#### Warning

- Number of keys must match number of keyValues!

### SFColor [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

#### Hint

- X3D players might not send unchanging intermediate values, thus avoiding excessive superfluous events that have no effect.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction.
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)
- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter07EventAnimationInterpolation)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Interpolation/ColorInterpolator/ColorInterpolator.x3d" update="auto" xrMovementControl=”VIEWER_POSE”></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Interpolation/ColorInterpolator/ColorInterpolator.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Interpolation/ColorInterpolator/ColorInterpolator.x3d)
{: .example-links }

## See Also

- [X3D Specification of ColorInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#ColorInterpolator)
