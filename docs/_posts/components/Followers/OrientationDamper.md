---
title: OrientationDamper
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [OrientationDamper, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

OrientationDamper generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value.

The OrientationDamper node belongs to the [Followers](/x_ite/components/overview/#followers) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + OrientationDamper
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFRotation | [in] | [set_value](#fields-set_value) |  |
| SFRotation | [in] | [set_destination](#fields-set_destination) |  |
| SFRotation | [ ] | [initialValue](#fields-initialValue) | 0 1 0 0  |
| SFRotation | [ ] | [initialDestination](#fields-initialDestination) | 0 1 0 0  |
| SFInt32 | [ ] | [order](#fields-order) | 3  |
| SFTime | [in, out] | [tau](#fields-tau) | 0.3  |
| SFFloat | [in, out] | [tolerance](#fields-tolerance) | -1  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFRotation | [out] | [value_changed](#fields-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFRotation [in] **set_value** <small>[-1,1] or (-∞,∞)</small>
{: #fields-set_value }

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFRotation [in] **set_destination** <small>[-1,1] or (-∞,∞)</small>
{: #fields-set_destination }

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### SFRotation [ ] **initialValue** 0 1 0 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-initialValue }

Initial starting value for this node.

### SFRotation [ ] **initialDestination** 0 1 0 0 <small>[-1,1] or (-∞,∞)</small>
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

### SFRotation [out] **value_changed**
{: #fields-value_changed }

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to a \<[Transform](/x_ite/components/grouping/transform/)\> node's rotation field, for example.

## See Also

- [X3D Specification of OrientationDamper Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#OrientationDamper)
