---
title: SphereSensor
date: 2023-01-07
nav: components-PointingDeviceSensor
categories: [components, PointingDeviceSensor]
tags: [SphereSensor, PointingDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SphereSensor converts pointing device motion into a spherical rotation about the origin of the local coordinate system.

The SphereSensor node belongs to the **PointingDeviceSensor** component and requires at least support level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPointingDeviceSensorNode
        + X3DDragSensorNode
          + SphereSensor
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- SFBool \[in, out\] [autoOffset](#sfbool-in-out-autooffset-true)
- SFRotation \[in, out\] [offset](#sfrotation-in-out-offset-0-1-0-0--1-1--)
- SFVec3f \[out\] [trackPoint_changed](#sfvec3f-out-trackpoint_changed)
- SFRotation \[out\] [rotation_changed](#sfrotation-out-rotation_changed)
- SFBool \[out\] [isOver](#sfbool-out-isover)
- SFBool \[out\] [isActive](#sfbool-out-isactive)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **autoOffset** TRUE

Determines whether previous offset values are remembered/accumulated.

### SFRotation [in, out] **offset** 0 1 0 0 <small>[-1,1],(-∞,∞)</small>

Sends event and remembers last value sensed.

#### Warning

- ROUTE connecting rotation_changed to set_offset creates a self-reinforcing positive feedback loop and results in unmanageable response.

### SFVec3f [out] **trackPoint_changed**

*trackPoint_changed* events give intersection point of bearing with sensor's virtual geometry.

#### Warnings

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
- *trackPoint_changed* events represent unclamped intersection points on plane surface. Browsers can interpret drags off of the surface in various ways. Note that translation_changed events are clamped by minPosition/maxPosition and thus may be preferable.

### SFRotation [out] **rotation_changed**

*rotation_changed* events equal sum of relative bearing changes plus offset value.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isOver**

Hover over geometry by aiming the mouse (or pointing device) to generate *isOver* events. Sensor sends output event *isOver*=true event when pointing device moves over sensor's geometry, and later sends output event *isOver*=false event when pointing device moves off.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

Select geometry by activating the pointing device (for example, clicking the mouse) to generate *isActive* events. Output event *isActive*=true is sent when geometry is selected (for example, when primary mouse button is pressed), output event *isActive*=false is sent when geometry is deselected (for example, when primary mouse button is released).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- This sensor detects user interactions affecting peer nodes and their child geometry.
- Add semi-transparent surrounding geometry to see the effect of the sensor.
- [X3D Architecture 20.2.1 Overview of pointing device sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors)
- [X3D Architecture 20.2.2 Drag sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#DragSensors)
- [X3D Architecture 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating)

## See Also

- [X3D Specification of SphereSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#SphereSensor)
