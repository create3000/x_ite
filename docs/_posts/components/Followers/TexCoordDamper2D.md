---
title: TexCoordDamper2D
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [TexCoordDamper2D, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TexCoordDamper2D generates a series of 2D floating-point arrays that progressively change from initial value to destination value.

The TexCoordDamper2D node belongs to the [Followers](/x_ite/components/overview/#followers) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + TexCoordDamper2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec2f | [in] | [set_value](#fields-set_value) |  |
| MFVec2f | [in] | [set_destination](#fields-set_destination) |  |
| MFVec2f | [ ] | [initialValue](#fields-initialValue) | [ ] |
| MFVec2f | [ ] | [initialDestination](#fields-initialDestination) | [ ] |
| SFInt32 | [ ] | [order](#fields-order) | 3  |
| SFTime | [in, out] | [tau](#fields-tau) | 0.3  |
| SFFloat | [in, out] | [tolerance](#fields-tolerance) | -1  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| MFVec2f | [out] | [value_changed](#fields-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec2f [in] **set_value** <small>(-∞,∞)</small>
{: #fields-set_value }

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFVec2f [in] **set_destination** <small>(-∞,∞)</small>
{: #fields-set_destination }

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### MFVec2f [ ] **initialValue** [ ] <small>(-∞,∞)</small>
{: #fields-initialValue }

Initial starting value for this node.

### MFVec2f [ ] **initialDestination** [ ] <small>(-∞,∞)</small>
{: #fields-initialDestination }

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>
{: #fields-order }

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>
{: #fields-tau }

*tau* is the exponential-decay time constant for filter response in seconds.

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0..∞]</small>
{: #fields-tolerance }

Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec2f [out] **value_changed**
{: #fields-value_changed }

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to a \<[TextureTransform](/x_ite/components/texturing/texturetransform/)\> node's translation field, for example.

## See Also

- [X3D Specification of TexCoordDamper2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#TexCoordDamper2D)
