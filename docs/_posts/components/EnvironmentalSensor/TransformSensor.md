---
title: TransformSensor
date: 2022-01-07
nav: components-EnvironmentalSensor
categories: [components, EnvironmentalSensor]
tags: [TransformSensor, EnvironmentalSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TransformSensor generates output events when its targetObject enters, exits, and moves within a region in space (defined by a box).

The TransformSensor node belongs to the **EnvironmentalSensor** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DEnvironmentalSensorNode
        + TransformSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

Size of intersection box, measured from center in meters.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFTime [out] **enterTime**

Time event generated when targetObject enters the box region for sensor.

### SFTime [out] **exitTime**

Time event generated when targetObject exits the box region for sensor.

### SFBool [out] **isActive**

IsActive true/false events are sent when triggering the sensor. isActive=true when targetObject enters the box region, isActive=false when targetObject exits the box region.

### SFVec3f [out] **position_changed**

Sends translation event relative to center whenever the target object is contained within the box region and results change.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center whenever the target object is contained within the box region and results change.

### SFNode [in, out] **targetObject** NULL <small>[X3DGroupingNode|X3DShapeNode]</small>

TargetObject is the movable geometry represented by any valid X3DGroupingNode or X3DShapeNode which may enter or exit the box.

## Description

### Hints

- Each TransformSensor node behaves independently of all other TransformSensor nodes, so that every enabled TransformSensor node affected by targetObject motion sends output events.
- Multiply instanced (DEF/USE) TransformSensor nodes in different locations use the union of all boxes to check for enter and exit, detecting enter and exit for all instances of the box, and sending enter/exit events appropriately. For non-overlapping bounding boxes, position_changed and orientation_changed events are calculated relative to the coordinate system associated with the bounding box in which the proximity was detected.

### Warnings

- Results are undefined if boxes overlap for multiply instanced TransformSensor nodes.
- A TransformSensor node with a zero-volume box (i.e. any size dimension equal to 0.0) cannot generate events, equivalent to enabled=false.
- Unlike TouchSensor nodes, there is no notion of a TransformSensor node lower in the scene graph grabbing events.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/TransformSensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of TransformSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalSensor.html#TransformSensor){:target="_blank"}
