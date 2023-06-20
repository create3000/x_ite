---
title: CoordinateDamper
date: 2022-01-07
nav: components-Followers
categories: [components, Followers]
tags: [CoordinateDamper, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CoordinateDamper generates a series of coordinate arrays that progressively change from initial value to destination value.

The CoordinateDamper node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + CoordinateDamper
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec3f [in] **set_value** <small>(-∞,∞)</small>

*set_value* resets current value of this node.

### MFVec3f [in] **set_destination** <small>(-∞,∞)</small>

*set_destination* resets destination value of this node.

### MFVec3f [ ] **initialValue** 0 0 0 <small>(-∞,∞)</small>

Initial starting value for this node.

### MFVec3f [ ] **initialDestination** 0 0 0 <small>(-∞,∞)</small>

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

*tau* is the exponential-decay time constant for filter response in seconds.

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

-1 or [0,∞) Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

### MFVec3f [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to a `<Coordinate>` node's point field, for example.

## External Links

- [X3D Specification of CoordinateDamper](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#CoordinateDamper){:target="_blank"}
