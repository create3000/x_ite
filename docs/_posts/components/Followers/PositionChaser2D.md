---
title: PositionChaser2D
date: 2022-01-07
nav: components-Followers
categories: [components, Followers]
tags: [PositionChaser2D, Followers]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PositionChaser2D generates a series of 2D position values that progressively change from initial value to destination value.

The PositionChaser2D node belongs to the **Followers** component and its container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + PositionChaser2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec2f [in] **set_value**

Set_value resets current value of this node.

### SFVec2f [in] **set_destination**

Set_destination resets destination value of this node.

### SFVec2f [ ] **initialValue** 0 0

Initial starting value for this node.

### SFVec2f [ ] **initialDestination** 0 0

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>

Duration is the time interval for filter response in seconds.

### SFBool [out] **isActive**

IsActive true/false events are sent when follower-node computation starts/stops.

### SFVec2f [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to a `<TextureTransform>` node's translation field, for example.

## External Links

- [X3D Specification of PositionChaser2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#PositionChaser2D){:target="_blank"}
