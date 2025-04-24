---
title: TexCoordChaser2D
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [TexCoordChaser2D, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TexCoordChaser2D generates a series of single floating-point values that progressively change from initial value to destination value.

The TexCoordChaser2D node belongs to the **Followers** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + TexCoordChaser2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| MFVec2f | [in] | [set_value](#field-set_value) |  |
| MFVec2f | [in] | [set_destination](#field-set_destination) |  |
| MFVec2f | [ ] | [initialValue](#field-initialValue) | [ ] |
| MFVec2f | [ ] | [initialDestination](#field-initialDestination) | [ ] |
| SFTime | [ ] | [duration](#field-duration) | 1  |
| SFBool | [out] | [isActive](#field-isActive) |  |
| MFVec2f | [out] | [value_changed](#field-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec2f [in] **set_value** <small>(-∞,∞)</small>
{: #field-set_value }

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFVec2f [in] **set_destination** <small>(-∞,∞)</small>
{: #field-set_destination }

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### MFVec2f [ ] **initialValue** [ ] <small>(-∞,∞)</small>
{: #field-initialValue }

Initial starting value for this node.

### MFVec2f [ ] **initialDestination** [ ] <small>(-∞,∞)</small>
{: #field-initialDestination }

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>
{: #field-duration }

*duration* is the time interval for filter response in seconds.

#### Hint

- *duration* is a nonnegative SFTime *duration* interval, not an absolute clock time.

### SFBool [out] **isActive**
{: #field-isActive }

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec2f [out] **value_changed**
{: #field-value_changed }

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- ROUTE value_changed output events to a \<[TextureTransform](/x_ite/components/texturing/texturetransform/)\> node's translation field, for example.

## See Also

- [X3D Specification of TexCoordChaser2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#TexCoordChaser2D)
