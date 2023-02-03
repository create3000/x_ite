---
title: ScalarDamper
date: 2022-01-07
nav: components-Followers
categories: [components, Followers]
tags: [ScalarDamper, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ScalarDamper generates a series of floating-point values that progressively change from initial value to destination value.

The ScalarDamper node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DDamperNode
        + ScalarDamper
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_value**

*set_value* resets current value of this node.

### SFFloat [in] **set_destination**

*set_destination* resets destination value of this node.

### SFFloat [ ] **initialValue**

Initial starting value for this node.

### SFFloat [ ] **initialDestination**

Initial destination value for this node.

### SFInt32 [ ] **order** 3 <small>[0..5]</small>

*order* defines the number of internal filters (larger means smoother response, longer delay).

### SFTime [in, out] **tau** 0.3 <small>[0,∞)</small>

*tau* is the exponential-decay time constant for filter response in seconds.

### SFFloat [in, out] **tolerance** -1 <small>-1 or [0,∞)</small>

-1 or [0,∞) Absolute value for satisfactory completion proximity (-1 lets browser choose).

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

### SFFloat [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to an interpolator node's set_fraction field, for example.

## External Links

- [X3D Specification of ScalarDamper](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#ScalarDamper){:target="_blank"}
