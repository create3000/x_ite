---
title: PositionDamper
date: 2022-01-07
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

The PositionDamper node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + PositionDamper
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in] **set_value**

Set_value resets current value of this node.

### SFVec3f [in] **set_destination**

Set_destination resets destination value of this node.

### SFVec3f [ ] **initialValue** 0 0 0

Initial starting value for this node.

### SFVec3f [ ] **initialDestination** 0 0 0

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

Order defines the number of internal filters (larger means smoother response, longer delay).

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

-1 or [0,+∞) Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

Tau is the exponential-decay time constant for filter response in seconds.

### SFVec3f [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

### SFBool [out] **isActive**

IsActive true/false events are sent when follower-node computation starts/stops.

## Description

### Hint

- value_changed output events can be ROUTEd to a `<Transform>` node's translation field, for example.

## External Links

- [X3D Specification of PositionDamper](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#PositionDamper){:target="_blank"}
