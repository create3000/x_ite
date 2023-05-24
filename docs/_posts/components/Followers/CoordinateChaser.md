---
title: CoordinateChaser
date: 2022-01-07
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

The CoordinateChaser node belongs to the **Followers** component and its default container field is *children.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DFollowerNode
      + X3DChaserNode
        + CoordinateChaser
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec3f [in] **set_value**

*set_value* resets current value of this node.

### MFVec3f [in] **set_destination**

*set_destination* resets destination value of this node.

### MFVec3f [ ] **initialValue** 0 0 0

Initial starting value for this node.

### MFVec3f [ ] **initialDestination** 0 0 0

Initial destination value for this node.

### SFTime [ ] **duration** 1 <small>[0,∞)</small>

*duration* is the time interval for filter response in seconds.

### SFBool [out] **isActive**

*isActive* true/false events are sent when follower-node computation starts/stops.

### MFVec3f [out] **value_changed**

Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.

## Description

### Hint

- value_changed output events can be ROUTEd to a `<Coordinate>` node's point field, for example.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Followers/CoordinateChaser/CoordinateChaser.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of CoordinateChaser](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/followers.html#CoordinateChaser){:target="_blank"}
