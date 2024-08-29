---
title: ColorDamper
date: 2023-01-07
nav: components-Followers
categories: [components, Followers]
tags: [ColorDamper, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ColorDamper generates a series of RGB color values that progressively change from initial value to destination value.

The ColorDamper node belongs to the **Followers** component and requires at least level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + ColorDamper
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColor [in] **set_value** <small>[0,1]</small>

*set_value* resets current *value* of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFColor [in] **set_destination** <small>[0,1]</small>

*set_destination* resets *destination* value of this node.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a *destination* for ROUTE events.

### SFColor [ ] **initialValue** 0.8 0.8 0.8 <small>[0,1]</small>

Initial starting value for this node.

### SFColor [ ] **initialDestination** 0.8 0.8 0.8 <small>[0,1]</small>

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

*tau* is the exponential-decay time constant for filter response in seconds.

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFColor [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- ROUTE value_changed output events to one of a \<[Material](/x_ite/components/shape/material/)\> node's color fields, for example.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Followers/ColorDamper/ColorDamper.x3d" update="auto" xrMovementControl=”VIEWER_POSE”></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Followers/ColorDamper/ColorDamper.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Followers/ColorDamper/ColorDamper.x3d)
{: .example-links }

## See Also

- [X3D Specification of ColorDamper Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#ColorDamper)
