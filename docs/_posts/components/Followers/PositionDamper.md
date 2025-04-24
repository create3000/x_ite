---
title: PositionDamper
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [PositionDamper, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PositionDamper generates a series of position values that progressively change from initial value to destination value.

The PositionDamper node belongs to the **Followers** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + PositionDamper
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFVec3f | \[in\] | [set_value](#sfvec3f-in-set_value--) |  |
| SFVec3f | \[in\] | [set_destination](#sfvec3f-in-set_destination--) |  |
| SFVec3f | \[ \] | [initialValue](#sfvec3f---initialvalue-0-0-0--) | 0 0 0  |
| SFVec3f | \[ \] | [initialDestination](#sfvec3f---initialdestination-0-0-0--) | 0 0 0  |
| SFInt32 | \[ \] | [order](#sfint32---order-3-05) | 3  |
| SFFloat | \[in, out\] | [tolerance](#sffloat-in-out-tolerance--1--1-or-0) | -1  |
| SFTime | \[in, out\] | [tau](#sftime-in-out-tau-03-0) | 0 |
| SFVec3f | \[out\] | [value_changed](#sfvec3f-out-value_changed) |  |
| SFBool | \[out\] | [isActive](#sfbool-out-isactive) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec3f [in] **set_value** <small>(-∞,∞)</small>

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFVec3f [in] **set_destination** <small>(-∞,∞)</small>

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### SFVec3f [ ] **initialValue** 0 0 0 <small>(-∞,∞)</small>

Initial starting value for this node.

### SFVec3f [ ] **initialDestination** 0 0 0 <small>(-∞,∞)</small>

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

*tau* is the exponential-decay time constant for filter response in seconds.

### SFVec3f [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to a \<[Transform](/x_ite/components/grouping/transform/)\> node's translation field, for example.

## See Also

- [X3D Specification of PositionDamper Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#PositionDamper)
