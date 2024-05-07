---
title: Creating New Node Types
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [Creating, Node, Types]
---
## Motivation

You can create new node types that encapsulate:

- Shapes
- Sensors
- Interpolators
- Scripts
- anything else ...

This creates high-level nodes:

- Robots, menus, new shapes, etc.

## Syntax: PROTO

A PROTO statement declares a new node type (a prototype):

- name - the new node type name
- fields, inputs, and outputs - interface to the prototype

### XML Encoding

```xml
<ProtoDeclare name='BouncingBall'>
  <ProtoInterface>
    <field accessType='inputOutput' type='SFTime' name='cycleInterval' value='1'/>
    <field accessType='inputOutput' type='SFFloat' name='bounceHeight' value='1'/>
  </ProtoInterface>
  <ProtoBody>
    <!-- ... -->
  </ProtoBody>
</ProtoDeclare>
```

### Classic Encoding

```js
PROTO BouncingBall [
  inputOutput SFTime  cycleInterval 1.0
  inputOutput SFFloat bounceHeight  1.0
]
{
  ...
}
```

## Defining prototype bodies

**PROTO** defines:

- body - nodes and routes for the new node type

### XML Encoding

```xml
<ProtoDeclare name='BouncingBall'>
  <ProtoInterface>
    <!-- ... -->
  </ProtoInterface>
  <ProtoBody>
    <Transform>
      <!-- children ... -->
    </Transform>
  </ProtoBody>
</ProtoDeclare>
```

### Classic Encoding

```js
PROTO BouncingBall [
  ...
]
{
  Transform {
    children [ ... ]
  }
  ROUTE ...
}
```

## Syntax: IS

The IS syntax connects a prototype interface field, input, or output to the body:

- Like an assignment statement
- Assigns interface field or input to body
- Assigns body outputs to interface

Interface items connected by IS need not have the same name as an item in the body, but often do:

### XML Encoding

```xml
<ProtoDeclare name='BouncingBall'>
  <ProtoInterface>
    <field accessType='inputOutput' type='SFTime' name='cycleInterval' value='1'/>
    <field accessType='inputOutput' type='SFFloat' name='bounceHeight' value='1'/>
  </ProtoInterface>
  <ProtoBody>
    <!-- ... -->
    <TimeSensor DEF='Clock' ... >
      <IS>
        <connect nodeField='cycleInterval' protoField='cycleInterval'/>
        <!-- ... -->
      </IS>
    </TimeSensor>
    <!-- ... -->
  </ProtoBody>
</ProtoDeclare>
```

### Classic Encoding

```js
PROTO BouncingBall [
  inputOutput SFTime  cycleInterval 1.0
  inputOutput SFFloat bounceHeight  1.0
]
{
  ...
  DEF Clock TimeSensor {
    cycleInterval IS cycleInterval
    ...
  }
  ...
}
```

## Using IS

May **IS** to ...

| Interface      | initializeOnly | inputOnly | outputOnly | inputOutput |
|----------------|----------------|-----------|------------|-------------|
| initializeOnly | yes            | no        | no         | yes         |
| inputOnly      | no             | yes       | no         | yes         |
| outputOnly     | no             | no        | yes        | yes         |
| inputOutput    | no             | no        | no         | yes         |

## Using prototyped nodes

The new node type can be used like any other type.

### XML Encoding

```xml
<!-- Official Syntax -->
<ProtoInstance name='BouncingBall'>
  <fieldValue name='cycleInterval' value='2'/>
  <fieldValue name='bounceHeight' value='3'/>
</ProtoInstance>
<!-- Short Syntax -->
<BouncingBall
    cycleInterval='2'
    bounceHeight='3'/>
```

### Classic Encoding

```js
BouncingBall {
  cycleInterval 2.0
  bounceHeight  3.0
}
```

## Controlling usage rules

Recall that node use must be appropriate for the context:

- A [Shape](/x_ite/components/shape/shape/) node specifies shape, not color
- A [Material](/x_ite/components/shape/material/) node specifies color, not shape
- A [Box](/x_ite/components/geometry3d/box/) node specifies geometry, not shape or color

The context for a new node type depends upon the first node in the **PROTO** body.

For example, if the first node is a geometry node:

- The prototype creates a new geometry node type

The new node type can be used wherever the first node of the prototype body can be used.

- In XML the default value of the »containerField« attribute of a ProtoInstance element is »children«. Change this attribute to whatever value you need.

### XML Encoding

```xml
<Shape>
  <!-- Official Syntax -->
  <ProtoInstance name='Torus' containerField='geometry'>
    <!-- ... -->
  </ProtoInstance>
</Shape>
<Shape>
  <!-- Short Syntax -->
  <Torus containerField='geometry' .../>
</Shape>
```

## A sample prototype use

Create a **BouncingBall** node type that:

- Builds a beachball
  - Creates an animation clock
  - Using a **PROTO** field to select the cycle interval
- Bounces the beachball
  - Using the bouncing ball program script
  - Using a **PROTO** field to select the bounce height

Fields needed:

- Bounce height
- Cycle interval

### XML Encoding

```xml
<ProtoDeclare name='BouncingBall'>
  <ProtoInterface>
    <field accessType='inputOutput' type='SFTime' name='cycleInterval' value='1'/>
    <field accessType='inputOutput' type='SFFloat' name='bounceHeight' value='1'/>
  </ProtoInterface>
  <ProtoBody>
    <!-- ... -->
  </ProtoBody>
</ProtoDeclare>
```

### Classic Encoding

```js
PROTO BouncingBall [
  inputOutput SFTime  cycleInterval 1.0
  inputOutput SFFloat bounceHeight 1.0
]
{
  ...
}
```

Inputs and outputs needed:

- None - a TimeSensor node is built in to the new node

Body needed:

- A ball shape inside a transform
- An animation clock
- A bouncing ball program script
- Routes connecting it all together

### XML Encoding

```xml
<ProtoDeclare name='BouncingBall'>
  <ProtoInterface>
    <!-- ... -->
  </ProtoInterface>
  <ProtoBody>
    <Transform DEF='Ball'>
      <Shape><!-- ... --></Shape>
    </Transform>
    <TimeSensor DEF='Clock' ... />
    <Script DEF='Bouncer' ... />
    <ROUTE ... />
  </ProtoBody>
</ProtoDeclare>
```

### Classic Encoding

```js
PROTO BouncingBall [
  ...
]
{
  DEF Ball Transform {
    children [
      Shape { ... }
    ]
  }
  DEF Clock   TimeSensor { ... }
  DEF Bouncer Script { ... }
  ROUTE ...
}
```

## Changing a prototype

If you change a prototype, all uses of that prototype change as well

- Prototypes enable world modularity
- Large worlds make heavy use of prototypes

For the **BouncingBall** prototype, adding a shadow to the prototype makes all balls have a shadow.

## Syntax: EXTERNPROTO

Prototypes are typically in a separate external file, referenced by an **EXTERNPROTO**

- name, fields, events - as from **PROTO,** minus initial values
- url - the URL of the prototype file
- \#name - name of **PROTO** in file

### XML Encoding

```xml
<ExternProtoDeclare name='BouncingBall' url='"bounce.x3dv#BouncingBall", "bounce.x3d#BouncingBall"'>
  <field accessType='inputOutput' type='SFTime' name='cycleInterval'/>
  <field accessType='inputOutput' type='SFFloat' name='bounceHeight'/>
</ExternProtoDeclare>
```

### Classic Encoding

```js
EXTERNPROTO BouncingBall [
  inputOutput SFTime  cycleInterval
  inputOutput SFFloat bounceHeight
]
[
  "bounce.x3dv#BouncingBall",
  "bounce.x3d#BouncingBall"
]
```

## Summary

- **PROTO** declares a new node type and defines its node body
- **EXTERNPROTO** declares a new node type, specified by URL
