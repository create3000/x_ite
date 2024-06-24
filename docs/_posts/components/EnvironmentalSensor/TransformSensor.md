---
title: TransformSensor
date: 2023-01-07
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

The TransformSensor node belongs to the **EnvironmentalSensor** component and requires at least level **3,** its default container field is *children.* It is available from X3D version 3.2 or higher.

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

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

*size* of transformation-traccking box around center location, oriented within local transformation frame.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFTime [out] **enterTime**

Time event generated when targetObject enters the box region for sensor.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **exitTime**

Time event generated when targetObject exits the box region for sensor.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

*isActive* true/false events are sent when triggering the sensor. *isActive*=true when targetObject enters the box region, *isActive*=false when targetObject exits the box region.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **position_changed**

Sends translation event relative to center whenever the target object is contained within the box region and results change.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center whenever the target object is contained within the box region and results change.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **targetObject** NULL <small>[X3DGroupingNode|X3DShapeNode]</small>

*targetObject* is the movable geometry represented by any valid X3DGroupingNode or X3DShapeNode which may enter or exit the box.

## Advice

### Hints

- Each TransformSensor node behaves independently of all other TransformSensor nodes, so that every enabled TransformSensor node affected by targetObject motion sends output events.
- Multiply instanced (DEF/USE) TransformSensor nodes in different locations use the union of all boxes to check for enter and exit, detecting enter and exit for all instances of the box, and sending enter/exit events appropriately. For non-overlapping bounding boxes, position_changed and orientation_changed events are calculated relative to the coordinate system associated with the bounding box in which the proximity was detected.

### Warnings

- Results are undefined if boxes overlap for multiply instanced TransformSensor nodes.
- A TransformSensor node with a zero-volume box (i.e. any size dimension equal to 0.0) cannot generate events, equivalent to enabled=false.
- Unlike [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) nodes, there is no notion of a TransformSensor node lower in the scene graph grabbing events.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/TransformSensor.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/TransformSensor.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/EnvironmentalSensor/TransformSensor/TransformSensor.x3d)
{: .example-links }

## See Also

- [X3D Specification of TransformSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalSensor.html#TransformSensor){:target="_blank"}
