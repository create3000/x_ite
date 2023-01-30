---
title: TouchSensor
date: 2022-01-07
nav: components-PointingDeviceSensor
categories: [components, PointingDeviceSensor]
tags: [TouchSensor, PointingDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TouchSensor tracks location and state of the pointing device, detecting when a user points at or selects (activates) geometry.

The TouchSensor node belongs to the **PointingDeviceSensor** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPointingDeviceSensorNode
        + X3DTouchSensorNode
          + TouchSensor
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

### SFVec2f [out] **hitTexCoord_changed**

When pointing device selects geometry, send event containing texture coordinates of surface at the hitPoint.

### SFVec3f [out] **hitNormal_changed**

When pointing device selects geometry, send event containing surface normal vector at the hitPoint.

### SFVec3f [out] **hitPoint_changed**

When pointing device selects geometry, send event containing 3D point on surface of underlying geometry, as measured in reference frame for TouchSensor's local coordinate system.

### SFBool [out] **isOver**

Hover over geometry by aiming the mouse (or pointing device) to generate isOver events. Sensor sends output event isOver=true event when pointing device moves over sensor's geometry, and later sends output event isOver=false event when pointing device moves off.

### SFBool [out] **isActive**

Select geometry by activating the pointing device (e.g. clicking the mouse) to generate isActive events. Output event isActive=true is sent when pointing device selection is activated, output event isActive=false is sent when pointing device is deselected.

### SFTime [out] **touchTime**

Time event generated when sensor is touched by pointing device, and then deselected by the user.

#### Hint

TouchTime event is generated when following three conditions are all met: (a) pointing device was pointing towards geometry when initially activated (isActive=true), (b) pointing device is currently pointing towards the geometry (isOver=true), and (c) pointing device selection is deactivated/deselected by user (isActive=false event is also generated).

## Description

### Hint

- This sensor detects user interactions affecting peer nodes and their child geometry.

## External Links

- [X3D Specification of TouchSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#TouchSensor){:target="_blank"}
- [See X3D Specification 20.2.1 Overview of pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors){:target="_blank"}
- [See X3D Specification 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating){:target="_blank"}
