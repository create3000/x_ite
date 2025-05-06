---
title: CoordinateChaser
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [CoordinateChaser, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CoordinateChaser generates a series of coordinate arrays that progressively change from initial value to destination value.

The CoordinateChaser node belongs to the **Followers** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + CoordinateChaser
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec3f | [in] | [set_value](#fields-set_value) |  |
| MFVec3f | [in] | [set_destination](#fields-set_destination) |  |
| MFVec3f | [ ] | [initialValue](#fields-initialValue) | 0 0 0  |
| MFVec3f | [ ] | [initialDestination](#fields-initialDestination) | 0 0 0  |
| SFTime | [ ] | [duration](#fields-duration) | 1  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| MFVec3f | [out] | [value_changed](#fields-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec3f [in] **set_value** <small>(-∞,∞)</small>
{: #fields-set_value }

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFVec3f [in] **set_destination** <small>(-∞,∞)</small>
{: #fields-set_destination }

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### MFVec3f [ ] **initialValue** 0 0 0 <small>(-∞,∞)</small>
{: #fields-initialValue }

Initial starting value for this node.

### MFVec3f [ ] **initialDestination** 0 0 0 <small>(-∞,∞)</small>
{: #fields-initialDestination }

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>
{: #fields-duration }

*duration* is the time interval for filter response in seconds.

#### Hint

- *duration* is a nonnegative SFTime *duration* interval, not an absolute clock time.

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec3f [out] **value_changed**
{: #fields-value_changed }

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to a \<[Coordinate](/x_ite/components/rendering/coordinate/)\> node's point field, for example.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Followers/CoordinateChaser/CoordinateChaser.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/Followers/CoordinateChaser/screenshot.avif" alt="CoordinateChaser"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Followers/CoordinateChaser/CoordinateChaser.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Followers/CoordinateChaser/CoordinateChaser.x3d)
{: .example-links }

## See Also

- [X3D Specification of CoordinateChaser Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#CoordinateChaser)
