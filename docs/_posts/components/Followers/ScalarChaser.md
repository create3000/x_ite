---
title: ScalarChaser
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [ScalarChaser, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ScalarChaser generates a series of single floating-point values that progressively change from initial value to destination value.

The ScalarChaser node belongs to the **Followers** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + ScalarChaser
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFFloat | \[in\] | [set_value](#sffloat-in-set_value--) |  |
| SFFloat | \[in\] | [set_destination](#sffloat-in-set_destination--) |  |
| SFFloat | \[ \] | [initialValue](#sffloat---initialvalue-0--) | 0  |
| SFFloat | \[ \] | [initialDestination](#sffloat---initialdestination-0--) | 0  |
| SFTime | \[ \] | [duration](#sftime---duration-1-0) | 1  |
| SFBool | \[out\] | [isActive](#sfbool-out-isactive) |  |
| SFFloat | \[out\] | [value_changed](#sffloat-out-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in] **set_value** <small>(-∞,∞)</small>

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_destination** <small>(-∞,∞)</small>

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### SFFloat [ ] **initialValue** 0 <small>(-∞,∞)</small>

Initial starting value for this node.

### SFFloat [ ] **initialDestination** 0 <small>(-∞,∞)</small>

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>

*duration* is the time interval for filter response in seconds.

#### Hint

- *duration* is a nonnegative SFTime *duration* interval, not an absolute clock time.

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to an interpolator node's set_fraction field, for example.

## Example

<x3d-canvas class="xr-button-tr" src="https://create3000.github.io/media/examples/Followers/ScalarChaser/ScalarChaser.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Followers/ScalarChaser/screenshot.avif" alt="ScalarChaser"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Followers/ScalarChaser/ScalarChaser.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Followers/ScalarChaser/ScalarChaser.x3d)
{: .example-links }

## See Also

- [X3D Specification of ScalarChaser Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#ScalarChaser)
