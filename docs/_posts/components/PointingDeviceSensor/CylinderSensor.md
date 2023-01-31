---
title: CylinderSensor
date: 2022-01-07
nav: components-PointingDeviceSensor
categories: [components, PointingDeviceSensor]
tags: [CylinderSensor, PointingDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CylinderSensor converts pointer motion (for example, a mouse or wand) into rotation values using an invisible cylinder aligned with local Y-axis.

The CylinderSensor node belongs to the **PointingDeviceSensor** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPointingDeviceSensorNode
        + X3DDragSensorNode
          + CylinderSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hints

Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFRotation [in, out] **axisRotation** 0 0 1 0

AxisRotation determines local sensor coordinate system by rotating the local coordinate system.

### SFFloat [in, out] **diskAngle** 0.261792 <small>[0,π/2]</small>

Help decide rotation behavior from initial relative bearing of pointer drag: acute angle whether cylinder sides or end-cap disks of virtual-geometry sensor are used for manipulation.

#### Hint

DiskAngle 0 forces disk-like behavior, diskAngle 1.570796 (90 degrees) forces cylinder-like behavior.

### SFFloat [in, out] **minAngle** <small>[-2π,2π]</small>

Clamps rotation_changed events within range of min/max values

#### Hint

If minAngle \> maxAngle, rotation is not clamped.

### SFFloat [in, out] **maxAngle** -1 <small>[-2π,2π]</small>

Clamps rotation_changed events within range of min/max values

#### Hint

If minAngle \> maxAngle, rotation is not clamped.

### SFFloat [in, out] **offset** <small>(-∞,∞)</small>

Sends event and remembers last value sensed.

#### Warning

ROUTE connecting rotation_changed to set_offset creates a self-reinforcing positive feedback loop and results in unmanageable response.

### SFBool [in, out] **autoOffset** TRUE

Determines whether previous offset values are remembered/accumulated.

### SFVec3f [out] **trackPoint_changed**

TrackPoint_changed events give intersection point of bearing with sensor's virtual geometry.

### SFRotation [out] **rotation_changed**

Rotation_changed events equal sum of relative bearing changes plus offset value about Y-axis in local coordinate system.

### SFBool [out] **isOver**

Hover over geometry by aiming the mouse (or pointing device) to generate isOver events. Sensor sends output event isOver=true event when pointing device moves over sensor's geometry, and later sends output event isOver=false event when pointing device moves off.

### SFBool [out] **isActive**

Select geometry by activating the pointing device (e.g. clicking the mouse) to generate isActive events. Output event isActive=true is sent when geometry is selected (e.g. when primary mouse button is pressed), output event isActive=false is sent when geometry is deselected (e.g. when primary mouse button is released).

## Description

### Hints

- This sensor detects user interactions affecting peer nodes and their child geometry.
- Add semi-transparent surrounding geometry to see the effect of the sensor.
- Initial relative bearing of pointer drag determines whether cylinder sides or end-cap disks are used for manipulation.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/PointingDeviceSensor/CylinderSensor/CylinderSensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of CylinderSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#CylinderSensor){:target="_blank"}
- [See X3D Specification 20.2.1 Overview of pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors){:target="_blank"}
- [See X3D Specification 20.2.2 Drag sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#DragSensors){:target="_blank"}
- [See X3D Specification 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating){:target="_blank"}
