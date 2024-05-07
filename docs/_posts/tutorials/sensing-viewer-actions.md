---
title: Sensing Viewer Actions
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Sensing, Viewer, Actions]
---
## Motivation

You can sense when the viewer's cursor:

- Is over a shape
- Has touched a shape
- Is dragging atop a shape

What can you do:

- You can trigger animations on a viewer's touch
- You can enable the viewer to move and rotate shapes

## Using action sensors

There are four main action sensor types:

- [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) senses touch
- [SphereSensor](/x_ite/components/pointingdevicesensor/spheresensor/) senses drags
- [CylinderSensor](/x_ite/components/pointingdevicesensor/cylindersensor/) senses drags
- [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) senses drags

The [Anchor](/x_ite/components/networking/anchor/) node is a special-purpose action sensor with a built-in response.

## Sensing shapes

- All action sensors sense all shapes in the same group
- Sensors trigger when the viewer's cursor touches a sensed shape

## Syntax: TouchSensor

A [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) node senses the cursor's touch:

- *isOver* - send true/false when cursor over/not over
- *isActive* - send true/false when mouse button pressed/released
- *touchTime* - send time when mouse button released

### XML Encoding

```xml
<Transform>
  <TouchSensor DEF='Touched'/>
  <Shape><!-- ... --></Shape>
  <!-- ... -->
</Transform>
```

### Classic Encoding

```js
Transform {
  children [
    DEF Touched TouchSensor { }
    Shape { ... }
    ...
  ]
}
```

## A sample use of a TouchSensor node

### XML Encoding

```xml
<TouchSensor DEF='Touch'/>

<TimeSensor DEF='Timer1' ... />

<OrientationInterpolator DEF='Rot1' ... />

<Transform DEF='Frame1'
  <Shape><!-- ... --></Shape>
</Transform>

<ROUTE fromNode='Touch' fromField='touchTime' toNode='Timer1' toField='set_startTime'/>
<ROUTE fromNode='Timer1' fromField='fraction_changed' toNode='Rot1' toField='set_fraction'/>
<ROUTE fromNode='Rot1' fromField='value_changed' toNode='Frame1' toField='set_rotation'/>
```

### Classic Encoding

```js
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

## Syntax: SphereSensor

A [SphereSensor](/x_ite/components/pointingdevicesensor/spheresensor/) node senses a cursor drag and generates rotations as if rotating a ball:

- *isActive* - sends true/false when mouse button pressed/released
- *rotation\_changed* - sends rotation during a drag

### XML Encoding

```xml
<Transform>
  <SphereSensor DEF='Rotator'/>
  <Transform DEF='RotateMe'><!-- ... --></Transform>
</Transform>
<ROUTE fromNode='Rotator' fromField='rotation_changed' toNode='RotateMe' toField='set_rotation'/>
```

### Classic Encoding

```js
Transform {
  children [
    DEF Rotator  SphereSensor { }
    DEF RotateMe Transform { ... }
  ]
}
ROUTE Rotator.rotation_changed TO RotateMe.set_rotation
```

## Syntax: CylinderSensor

A [CylinderSensor](/x_ite/components/pointingdevicesensor/cylindersensor/) node senses a cursor drag and generates rotations as if rotating a cylinder:

- *isActive* - sends true/false when mouse button pressed/released
- *rotation\_changed* - sends rotation during a drag

### XML Encoding

```xml
<Transform>
  <CylinderSensor DEF='Rotator'/>
  <Transform DEF='RotateMe'><!-- ... --></Transform>
</Transform>
<ROUTE fromNode='Rotator' fromField='rotation_changed' toNode='RotateMe' toField='set_rotation'/>
```

### Classic Encoding

```js
Transform {
  children [
    DEF Rotator  CylinderSensor { }
    DEF RotateMe Transform { ... }
  ]
}
ROUTE Rotator.rotation_changed TO RotateMe.set_rotation
```

## Syntax: PlaneSensor

A [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) node senses a cursor drag and generates translations as if sliding on a plane:

- *isActive* - sends true/false when mouse button pressed/released
- *translation\_changed* - sends translations during a drag

### XML Encoding

```xml
<Transform>
  <PlaneSensor DEF='Mover'/>
  <Transform DEF='MoveMe'><!-- ... --></Transform>
</Transform>
<ROUTE fromNode='Mover' fromField='translation_changed' toNode='MoveMe' toField='set_translation'/>
```

### Classic Encoding

```js
Transform {
  children [
    DEF Mover  PlaneSensor { }
    DEF MoveMe Transform { ... }
  ]
}
ROUTE Mover.translation_changed TO MoveMe.set_translation
```

## Using multiple sensors

Multiple sensors can sense the same shape but ...

If sensors are in the same group:

- They all respond

If sensors are at different depths in the hierarchy:

- The deepest sensor responds
- The other sensors do not respond

## Summary

Action sensors sense when the viewer's cursor:

- is over a shape
- has touched a shape
- is dragging atop a shape

Sensors convert viewer actions into events to:

- Start and stop animations
- Orient shapes
- Position shapes
