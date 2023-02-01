---
title: VisibilitySensor
date: 2022-01-07
nav: components-EnvironmentalSensor
categories: [components, EnvironmentalSensor]
tags: [VisibilitySensor, EnvironmentalSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

VisibilitySensor detects when user can see a specific object or region as they navigate the world. The region sensed for visibility to the user is bounded by a rectangular box.

The VisibilitySensor node belongs to the **EnvironmentalSensor** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DEnvironmentalSensorNode
        + VisibilitySensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

*size* of visibility box, measured from center in meters.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFTime [out] **enterTime**

Time event generated when user's camera enters visibility region for sensor.

### SFTime [out] **exitTime**

Time event generated when user's camera exits visibility region for sensor.

### SFBool [out] **isActive**

*isActive* true/false events are sent when triggering the sensor. isActive=true when entering visibility region, isActive=false when exiting visibility region.

## Description

### Hints

- Often used to attract user attention or improve performance.
- This sensor detects user interactions affecting peer nodes and their child geometry.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalSensor/VisibilitySensor/VisibilitySensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of VisibilitySensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalSensor.html#VisibilitySensor){:target="_blank"}
