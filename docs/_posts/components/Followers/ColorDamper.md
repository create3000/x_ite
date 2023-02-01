---
title: ColorDamper
date: 2022-01-07
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

The ColorDamper node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.2 or later.

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

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFColor [in] **set_value**

*set_value* resets current value of this node.

### SFColor [in] **set_destination**

*set_destination* resets destination value of this node.

### SFColor [ ] **initialValue** 0.8 0.8 0.8 <small>[0,1]</small>

Initial starting value for this node.

### SFColor [ ] **initialDestination** 0.8 0.8 0.8 <small>[0,1]</small>

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

*tau* is the exponential-decay time constant for filter response in seconds.

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

-1 or [0,+∞) Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

### SFColor [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to one of a `<Material>` node's color fields, for example.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Followers/ColorDamper/ColorDamper.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ColorDamper](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#ColorDamper){:target="_blank"}
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}
