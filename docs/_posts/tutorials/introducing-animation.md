---
title: Introducing Animations
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Introducing, Animations]
---
## Motivation

- Nodes like [Billboard](/x_ite/components/navigation/billboard/) and [Anchor](/x_ite/components/networking/anchor/) have built-in behavior
- You can create your own behaviors to make shapes move, rotate, scale, blink, and more
- We need a means to trigger, time, and respond to a sequence of events in order to provide better user/world interactions

## Building animation circuits

Almost every node can be a component in an animation circuit

- Nodes act like virtual electronic parts
- Nodes can send and receive events
- Wired routes connect nodes together

An event is a message sent between nodes

- A data value (such as a translation)
- A time stamp (when did the event get sent)

## Examples

To spin a shape:

- Connect a node that sends rotation events to a [Transform](/x_ite/components/grouping/transform/) node's *rotation* field

To blink a shape:

- Connect a node that sends color events to a [Material](/x_ite/components/shape/material/) node's *diffuseColor* field

## Routing events

To set up an animation circuit, you need three things:

1. A node which sends events
  - The node must be named with **DEF**
2. A node which receives events
  - The node must be named with **DEF**
3. A route connecting them

## Using node inputs and outputs

Every node has fields, inputs, and outputs:

- initializeOnly: A stored value
- inputOnly: An input
- outputOnly: An output

An inputOutput field is a short-hand for a initializeOnly, inputOnly, and outputOnly

## Sample inputs

A [Transform](/x_ite/components/grouping/transform/) node has these input fields:

- *set\_translation*
- *set\_rotation*
- *set\_scale*

A [Material](/x_ite/components/shape/material/) node has these input fields:

- *set\_diffuseColor*
- *set\_emissiveColor*
- *set\_transparency*

## Sample outputs

An [OrientationInterpolator](/x_ite/components/interpolation/orientationinterpolator/) node has this output field:

- *value\_changed* to send rotation values

A [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/) node has this output field:

- *value\_changed* to send position (translation) values

A [TimeSensor](/x_ite/components/time/timesensor/) node has this output field:

- *time* to send time values

## Syntax: ROUTE

A **ROUTE** statement connects two nodes together using

- The sender's node name and output field name
- The receiver's node name and input field name

### XML Encoding

```x3d
<ROUTE fromNode='MySender' fromField='rotation_changed' toNode='MyReceiver' toField='set_rotation'/>
```

### Classic VRML Encoding

```vrml
ROUTE MySender.rotation_changed TO MyReceiver.set_rotation
```

**ROUTE** and **TO** must be in upper-case

## Field data types

Sender and receiver field data types must match!

Data types have names with a standard format, such as:

- **SFString,****SFRotation,** or **MFColor**

| Character | Values                                                                |
|-----------|-----------------------------------------------------------------------|
| 1         | \*\*S:\*\* Single value \*\*M:\*\* Multiple values                    |
| 2         | Always an \*\*F\*\* (for field)                                       |
| remainder | Name of data type, such as \*\*String, Rotation,\*\* or \*\*Color\*\* |

| Data type                | Meaning                                     |
|--------------------------|---------------------------------------------|
| SFBool, MFBool           | Boolean, true or false value                |
| SFColor, MFColor         | RGB color value                             |
| SFColorRGBA, MFColorRGBA | RGBA color value                            |
| SFDouble, MFDouble       | Double precision floating point value       |
| SFFloat, MFFloat         | Floating point value                        |
| SFImage, MFImage         | Image value                                 |
| SFInt32, MFInt32         | Integer value                               |
| SFMatrix3d, MFMatrix3d   | 3×3 matrix value, double precision          |
| SFMatrix3f, MFMatrix3f   | 3×3 matrix value                            |
| SFMatrix4d, MFMatrix4d   | 4×4 matrix value, double precision          |
| SFMatrix4f, MFMatrix4f   | 4×4 matrix value                            |
| SFNode, MFNode           | Node value                                  |
| SFRotation, MFRotation   | Rotation value                              |
| SFString, MFString       | Text string value                           |
| SFTime, MFTime           | Time value                                  |
| SFVec2d, MFVec2d         | XY floating point value, double precision   |
| SFVec2f, MFVec2f         | XY floating point value                     |
| SFVec3d, MFVec3d         | XYZ floating point value, double precision  |
| SFVec3f, MFVec3f         | XYZ floating point value                    |
| SFVec4d, MFVec4d         | XYZW floating point value, double precision |
| SFVec4f, MFVec4f         | XYZW floating point value                   |

## Following naming conventions

Most nodes have inputOutput fields.

If the inputOutput field name is *xxx*, then:

- *set\_xxx* is an input to set the field
- *xxx\_changed* is an output that sends when the field changes
- The *set\_* and *\_changed* sufixes are optional but recommended for clarity

The [Transform](/x_ite/components/grouping/transform/) node has:

- *rotation* field
- *set\_rotation* input
- *rotation\_changed* output

## A sample animation

### XML Encoding

```x3d
<TouchSensor DEF='Touch'/>

<TimeSensor DEF='Timer1' ... />

<OrientationInterpolator DEF='Rot1' ... />

<Transform DEF='Frame1'>
  <Shape><!-- ... --></Shape>
</Transform>

<ROUTE fromNode='Touch' fromField='touchTime' toNode='Timer1' toField='set_startTime'/>
<ROUTE fromNode='Timer1' fromField='fraction_changed' toNode='Rot1' toField='set_fraction'/>
<ROUTE fromNode='Rot1' fromField='value_changed' toNode='Frame1' toField='set_rotation'/>
```

### Classic VRML Encoding

```vrml
DEF Touch TouchSensor { }

DEF Timer1 TimeSensor { ... }

DEF Rot1 OrientationInterpolator { ... }

DEF Frame1 Transform {
  children [
    Shape { ... }
  ]
}

ROUTE Touch.touchTime         TO Timer1.set_startTime
ROUTE Timer1.fraction_changed TO Rot1.set_fraction
ROUTE Rot1.value_changed      TO Frame1.set_rotation
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/touch1/touch1.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/touch1/screenshot.avif" alt="TouchSensor"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/touch1/touch1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/touch1/touch1.x3dv)
{: .example-links }

## Using multiple routes

You can have **fan-out**

- Multiple routes out of the same sender

You can have **fan-in**

- Multiple routes into the same receiver

## Summary

- Connect senders to receivers using routes
- input fields are inputs, and output fields are outputs
- A route names the sender.output, and the receiver.input
  - Data types must match
- You can have multiple routes into or out of a node
