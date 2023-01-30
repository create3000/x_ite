---
title: ProximitySensor
date: 2022-01-07
nav: components-EnvironmentalSensor
categories: [components, EnvironmentalSensor]
tags: [ProximitySensor, EnvironmentalSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box).

The ProximitySensor node belongs to the **EnvironmentalSensor** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DEnvironmentalSensorNode
        + ProximitySensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

Size of Proximity box.

#### Hint

Size 0 0 0 is same as enabled false.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Position offset from origin of local coordinate system.

### SFTime [out] **enterTime**

Time event generated when user's camera enters the box.

### SFTime [out] **exitTime**

Time event generated when user's camera exits the box.

### SFBool [out] **isActive**

IsActive true/false events are sent as viewer enters/exits Proximity box. isActive=true when viewer enters Proximity box, isActive=false when viewer exits Proximity box.

### SFVec3f [out] **position_changed**

Sends translation event relative to center.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center.

### SFVec3f [out] **centerOfRotation_changed**

Sends changed centerOfRotation values, likely caused by user interaction.

## Description

### Hints

- Multiple USEd instances are cumulative, but avoid overlaps.
- Can first use Transform to relocate/reorient box.
- Surround entire world to start behaviors once scene is loaded.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalSensor/ProximitySensor/ProximitySensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalSensor.html#ProximitySensor){:target="_blank"}
