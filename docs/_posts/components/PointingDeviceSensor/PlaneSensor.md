---
title: PlaneSensor
date: 2022-01-07
nav: components-PointingDeviceSensor
categories: [components, PointingDeviceSensor]
tags: [PlaneSensor, PointingDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PlaneSensor converts pointing device motion into 2D translation parallel to the local Z=0 plane.

The PlaneSensor node belongs to the **PointingDeviceSensor** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPointingDeviceSensorNode
        + X3DDragSensorNode
          + PlaneSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hints

- Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFRotation [in, out] **axisRotation** 0 0 1 0

*axisRotation* determines local sensor coordinate system by rotating the local coordinate system.

### SFBool [in, out] **autoOffset** TRUE

Determines whether previous offset values are remembered/accumulated.

### SFVec3f [in, out] **offset** 0 0 0 <small>(-∞,∞)</small>

Sends event and remembers last value sensed.

#### Warning

- ROUTE connecting translation_changed to set_offset creates a self-reinforcing positive feedback loop and results in unmanageable response.

### SFVec2f [in, out] **minPosition** 0 0 <small>(-∞,∞)</small>

*minPosition* and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition \< minPosition means no clamping.

#### Hint

- Create a LineSensor by constraining one axis (minPosition.x=maxPosition.x) or (minPosition.y=maxPosition.y).

### SFVec2f [in, out] **maxPosition** -1 -1 <small>(-∞,∞)</small>

MinPosition and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition \< minPosition means no clamping.

#### Hint

- Create a LineSensor by constraining one axis (minPosition.x=maxPosition.x) or (minPosition.y=maxPosition.y).

### SFVec3f [out] **trackPoint_changed**

*trackPoint_changed* events give intersection point of bearing with sensor's virtual geometry.

### SFVec3f [out] **translation_changed**

*translation_changed* events equal sum of relative translation change plus offset value.

### SFBool [out] **isOver**

Hover over geometry by aiming the mouse (or pointing device) to generate isOver events. Sensor sends output event isOver=true event when pointing device moves over sensor's geometry, and later sends output event isOver=false event when pointing device moves off.

### SFBool [out] **isActive**

Select geometry by activating the pointing device (e.g. clicking the mouse) to generate isActive events. Output event isActive=true is sent when geometry is selected (e.g. when primary mouse button is pressed), output event isActive=false is sent when geometry is deselected (e.g. when primary mouse button is released).

## Description

### Hints

- Create a LineSensor by constraining one axis: (minPosition.x=maxPosition.x) or (minPosition.y=maxPosition.y).
- This sensor detects user interactions affecting peer nodes and their child geometry.
- Add semi-transparent surrounding geometry to see the effect of the sensor.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/PlaneSensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PlaneSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#PlaneSensor){:target="_blank"}
- [See X3D Specification 20.2.1 Overview of pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors){:target="_blank"}
- [See X3D Specification 20.2.2 Drag sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#DragSensors){:target="_blank"}
- [See X3D Specification 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating){:target="_blank"}
