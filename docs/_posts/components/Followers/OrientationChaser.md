---
title: OrientationChaser
date: 2022-01-07
nav: components-Followers
categories: [components, Followers]
tags: [OrientationChaser, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

OrientationChaser generates a series of rotation values that progressively change from initial value to destination value.

The OrientationChaser node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + OrientationChaser
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFRotation [in] **set_value** <small>[-1,1] or (-∞,∞)</small>

*set_value* resets current value of this node.

### SFRotation [in] **set_destination** <small>[-1,1] or (-∞,∞)</small>

*set_destination* resets destination value of this node.

### SFRotation [ ] **initialValue** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Initial starting value for this node.

### SFRotation [ ] **initialDestination** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>

*duration* is the time interval for filter response in seconds.

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

### SFRotation [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to a `<Transform>` node's rotation field, for example.

## External Links

- [X3D Specification of OrientationChaser](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#OrientationChaser){:target="_blank"}
