---
title: PositionInterpolator2D
date: 2023-01-07
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

PositionInterpolator2D generates a series of SFVec2f values. Authors can ROUTE value_changed output events to a SFVec2f attribute.

The PositionInterpolator2D node belongs to the **Interpolation** component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + PositionInterpolator2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFFloat | \[in\] | [set_fraction](#sffloat-in-set_fraction--) |  |
| MFFloat | \[in, out\] | [key](#mffloat-in-out-key----) | \[ \] |
| MFVec2f | \[in, out\] | [keyValue](#mfvec2f-in-out-keyvalue----) | \[ \] |
| SFVec2f | \[out\] | [value_changed](#sfvec2f-out-value_changed) |  |
{: .fields }

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

#### Hints

- Number of keyValues must be an integer multiple of the number of keys!
- KeyValue/*key* integer multiple defines how many coordinates are sent in value_changed outputOnlys.
- Typical interval for values in *key* array is within range of 0 to 1, but larger intervals can be defined with arbitrary bounds.

#### Warning

- Values in *key* array shall be monotonically non-decreasing, meaning that each value is greater than or equal to the preceding value.

### MFVec2f [in, out] **keyValue** [ ] <small>(-∞,∞)</small>

Output values for linear interpolation, each corresponding to an input-fraction value in the key array.

#### Hints

- [Identical adjacent entries in *keyValue* array have the effect of defining constant-value step functions.](https://en.wikipedia.org/wiki/Step_function)
- Number of keyValues must be an integer multiple of the number of keys!
- *keyValue*/key integer multiple defines how many coordinates are sent in value_changed outputOnlys.

### SFVec2f [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

#### Hints

- X3D players might not send unchanging intermediate values, thus avoiding excessive superfluous events that have no effect.
- KeyValue/key integer multiple defines how many coordinates are sent in *value_changed* outputOnlys.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction.
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter07EventAnimationInterpolation)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Interpolation' level='3'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/PositionInterpolator2D.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/screenshot.avif" alt="PositionInterpolator2D"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/PositionInterpolator2D.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Interpolation/PositionInterpolator2D/PositionInterpolator2D.x3d)
{: .example-links }

## See Also

- [X3D Specification of PositionInterpolator2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#PositionInterpolator2D)
