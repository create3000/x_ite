---
title: ProximitySensor
date: 2023-01-07
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

The ProximitySensor node belongs to the **EnvironmentalSensor** component and its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

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

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

*size* of Proximity box.

#### Hint

- *size* 0 0 0 is same as enabled false.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Position offset from origin of local coordinate system.

### SFTime [out] **enterTime**

Time event generated when user's camera enters the box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **exitTime**

Time event generated when user's camera exits the box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

*isActive* true/false events are sent as viewer enters/exits Proximity box. *isActive*=true when viewer enters Proximity box, *isActive*=false when viewer exits Proximity box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **position_changed**

Sends translation event relative to center.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **centerOfRotation_changed**

Sends changed centerOfRotation values, likely caused by user interaction.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Suggestions

### Hints

- Multiple USEd instances are cumulative, but avoid overlaps.
- Can first use Transform to relocate/reorient box.
- Surround entire world to start behaviors once scene is loaded.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalSensor/ProximitySensor/ProximitySensor.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/EnvironmentalSensor/ProximitySensor/ProximitySensor.x3d)

## See Also

- [X3D Specification of ProximitySensor node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalSensor.html#ProximitySensor){:target="_blank"}
