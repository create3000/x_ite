---
title: PlaneSensor
date: 2023-01-07
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

The PlaneSensor node belongs to the [PointingDeviceSensor](/x_ite/components/overview/#pointingdevicesensor) component and requires at least support level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

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

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFRotation | [in, out] | [axisRotation](#fields-axisRotation) | 0 0 1 0  |
| SFBool | [in, out] | [autoOffset](#fields-autoOffset) | TRUE |
| SFVec3f | [in, out] | [offset](#fields-offset) | 0 0 0  |
| SFVec2f | [in, out] | [minPosition](#fields-minPosition) | 0 0  |
| SFVec2f | [in, out] | [maxPosition](#fields-maxPosition) | -1 -1  |
| SFVec3f | [out] | [trackPoint_changed](#fields-trackPoint_changed) |  |
| SFVec3f | [out] | [translation_changed](#fields-translation_changed) |  |
| SFBool | [out] | [isOver](#fields-isOver) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of this node.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFRotation [in, out] **axisRotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-axisRotation }

*axisRotation* determines local sensor coordinate system by rotating the local coordinate system.

### SFBool [in, out] **autoOffset** TRUE
{: #fields-autoOffset }

Determines whether previous offset values are remembered/accumulated.

### SFVec3f [in, out] **offset** 0 0 0 <small>(-∞,∞)</small>
{: #fields-offset }

Sends event and remembers last value sensed.

#### Warning

- ROUTE connecting translation_changed to set_offset creates a self-reinforcing positive feedback loop and results in unmanageable response.

### SFVec2f [in, out] **minPosition** 0 0 <small>(-∞,∞)</small>
{: #fields-minPosition }

*minPosition* and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition \< *minPosition* means no clamping.

#### Hint

- Create a LineSensor by constraining one axis (*minPosition*.x=maxPosition.x) or (*minPosition*.y=maxPosition.y).

### SFVec2f [in, out] **maxPosition** -1 -1 <small>(-∞,∞)</small>
{: #fields-maxPosition }

MinPosition and *maxPosition* clamp translations to a range of values measured from origin of Z=0 plane default *maxPosition* \< minPosition means no clamping.

#### Hint

- Create a LineSensor by constraining one axis (minPosition.x=*maxPosition*.x) or (minPosition.y=*maxPosition*.y).

### SFVec3f [out] **trackPoint_changed**
{: #fields-trackPoint_changed }

*trackPoint_changed* events give intersection point of bearing with sensor's virtual geometry.

#### Warnings

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
- *trackPoint_changed* events represent unclamped intersection points on plane surface. Browsers can interpret drags off of the surface in various ways. Note that translation_changed events are clamped by minPosition/maxPosition and thus may be preferable.

### SFVec3f [out] **translation_changed**
{: #fields-translation_changed }

*translation_changed* events equal sum of relative translation change plus offset value.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isOver**
{: #fields-isOver }

Hover over geometry by aiming the mouse (or pointing device) to generate *isOver* events. Sensor sends output event *isOver*=true event when pointing device moves over sensor's geometry, and later sends output event *isOver*=false event when pointing device moves off.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**
{: #fields-isActive }

Select geometry by activating the pointing device (for example, clicking the mouse) to generate *isActive* events. Output event *isActive*=true is sent when geometry is selected (for example, when primary mouse button is pressed), output event *isActive*=false is sent when geometry is deselected (for example, when primary mouse button is released).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Create a LineSensor by constraining one axis: (minPosition.x=maxPosition.x) or (minPosition.y=maxPosition.y).
- This sensor detects user interactions affecting peer nodes and their child geometry.
- Add semi-transparent surrounding geometry to see the effect of the sensor.
- [X3D Architecture 20.2.1 Overview of pointing device sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors)
- [X3D Architecture 20.2.2 Drag sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#DragSensors)
- [X3D Architecture 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating)
- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter08UserInteractivity)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/PlaneSensor.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/screenshot.avif" alt="PlaneSensor"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/PlaneSensor.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/PointingDeviceSensor/PlaneSensor/PlaneSensor.x3d)
{: .example-links }

## See Also

- [X3D Specification of PlaneSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#PlaneSensor)
