---
title: Animating Transforms
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Animating, Transforms]
---
## Motivation

An animation changes something over time:

- position - a car driving
- orientation - an airplane banking
- color - seasons changing

Animation requires control over time:

- When to start and stop
- How fast to go

## Controlling time

- A [TimeSensor](/x_ite/components/time/timesensor/) node is similar to a stop watch
  - You control the start and stop time
- The sensor generates time events while it is running
- To animate, route time events into other nodes

## Using absolute time

- A [TimeSensor](/x_ite/components/time/timesensor/) node generates absolute and fractional time events
- Absolute time events give the wall-clock time
  - Absolute time is measured in seconds since 12:00am January 1, 1970!
  - Useful for triggering events at specific dates and times

## Using fractional time

- Fractional time events give a number from 0.0 to 1.0
  - When the sensor starts, it outputs a 0.0
  - At the end of a cycle, it outputs a 1.0
  - The number of seconds between 0.0 and 1.0 is controlled by the cycle interval
- The sensor can loop forever, or run through only one cycle and stop

## Syntax: TimeSensor

- A [TimeSensor](/x_ite/components/time/timesensor/) node generates events based upon time
  - *startTime* and *stopTime* - when to run
  - *cycleInterval* - how long a cycle is
  - *loop* - whether or not to repeat cycles

### XML Encoding

```xml
<TimeSensor
    cycleInterval='1.0'
    loop='false'
    startTime='0.0'
    stopTime='0.0'/>
```

### Classic VRML Encoding

```vrml
TimeSensor {
  cycleInterval 1.0
  loop FALSE
  startTime 0.0
  stopTime 0.0
}
```

## Using timers

To create a continuously running timer:

- *loop* **TRUE**
- *stopTime* \<= *startTime*

When stop time \<= start time, stop time is ignored

To run until the stop time:

- *loop* **TRUE**
- *stopTime* \> *startTime*

To run one cycle then stop:

- *loop* **FALSE**
- *stopTime* \<= *startTime*

The *set\_startTime* input event:

- Sets when the timer should start

The *set\_stopTime* input event:

- Sets when the timer should stop

## Using timer outputs

The isActive output event:

- Outputs TRUE at timer start
- Outputs FALSE at timer stop

The time output event:

- Outputs the absolute time

The fraction\_changed output event:

- Outputs values from 0.0 to 1.0 during a cycle
- Resets to 0.0 at the start of each cycle

## A sample time sensor

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material DEF='Monolith1Facade'
        diffuseColor='0.2 0.2 0.2'/>
  </Appearance>
  <Box size='2.0 4.0 0.3'/>
</Shape>
<TimeSensor DEF='Monolith1Timer'
    cycleInterval='4.0'
    loop='false'
    startTime='0.0'
    stopTime='0.1'/>

<ROUTE fromNode='Monolith1Touch' fromField='touchTime' toNode='Monolith1Timer' toField='set_startTime'/>
<ROUTE fromNode='Monolith1Timer' fromField='fraction_changed' toNode='Monolith1Facade' toField='set_transparency'/>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material DEF Monolith1Facade Material {
      diffuseColor 0.2 0.2 0.2
    }
  }
  geometry Box { size 2.0 4.0 0.3 }
}
DEF Monolith1Timer TimeSensor {
  cycleInterval 4.0
  loop FALSE
  startTime 0.0
  stopTime  0.1
}

ROUTE Monolith1Touch.touchTime TO Monolith1Timer.set_startTime
ROUTE Monolith1Timer.fraction_changed TO Monolith1Facade.set_transparency
```

## Converting time to position

To animate the position of a shape you provide:

- A list of key positions for a movement path
- A time at which to be at each position

An interpolatorsolator node converts an input time to an output position

- When a time is in between two key positions, the interpolatorsolator computes an intermediate position

## Interpolating positions

Each key position along a path has:

- A key value (such as a position)
- A key fractional time

Interpolation fills in values between your key values:

| Fractional Time | Position      |
|-----------------|---------------|
| 0.0             | 0.0 0.0 0.0   |
| *0.1*           | *0.4 0.1 0.0* |
| *0.2*           | *0.8 0.2 0.0* |
| *...*           | *...*         |
| 0.5             | 4.0 1.0 0.0   |
| *...*           | *...*         |

## Syntax: PositionInterpolator

A [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/) node describes a position path

- *key* - key fractional times
- *keyValue* - key positions

### XML Encoding

```xml
<PositionInterpolator
    key='0.0, ...'
    keyValue='0.0 0.0 0.0, ...'/>
```

### Classic VRML Encoding

```vrml
PositionInterpolator {
  key [ 0.0, ... ]
  keyValue [ 0.0 0.0 0.0, ... ]
}
```

Typically route into a [Transform](/x_ite/components/grouping/transform/) node's *set\_translation* input

## Using position interpolatorsolator inputs and outputs

The *set\_fraction* input:

- Sets the current fractional time along the key path

The *value\_changed* output:

- Outputs the position along the path each time the fraction is set

## A sample using position interpolatorsolators

### XML Encoding

```xml
<Transform DEF='Particle1'
  <Shape><!-- ... --></Shape>
</Transform>

<TimeSensor DEF='Timer1'
    cycleInterval='12.0'
    loop='true'
    startTime='0.0'
    stopTime='-1.0'/>

<PositionInterpolator DEF='Position1'
    key='0.0, ...'
    keyValue='0.0 0.0 0.0, ...'/>

<ROUTE fromNode='Timer1' fromField='fraction_changed' toNode='Position1' toField='set_fraction'/>
<ROUTE fromNode='Position1' fromField='value_changed' toNode='Particle1' toField='set_translation'/>
```

### Classic VRML Encoding

```vrml
DEF Particle1 Transform {
  children [
    Shape { ... }
  ]
}

DEF Timer1 TimeSensor {
  cycleInterval 12.0
  loop TRUE
  startTime 0.0
  stopTime -1.0
}

DEF Position1 PositionInterpolator {
  key  [ 0.0, ... ]
  keyValue [ 0.0 0.0 0.0, ... ]
}

ROUTE Timer1.fraction_changed TO Position1.set_fraction
ROUTE Position1.value_changed TO Particle1.set_translation
```

## Using other types of interpolatorsolators

|                      |                             |
|----------------------|-----------------------------|
| Animate position     | [PositionInterpolator][]    |
| Animate rotation     | [OrientationInterpolator][] |
| Animate scale        | [PositionInterpolator][]    |
| Animate color        | [ColorInterpolator][]       |
| Animate transparency | [ScalarInterpolator][]      |

  [PositionInterpolator]: https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#PositionInterpolator
  [OrientationInterpolator]: https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#OrientationInterpolator
  [ColorInterpolator]: https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#ColorInterpolator
  [ScalarInterpolator]: https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/interpolators.html#ScalarInterpolator

## Syntax: OrientationInterpolator

A [OrientationInterpolator](/x_ite/components/interpolation/orientationinterpolator/) node describes an orientation path

- *key* - key fractional times
- *keyValue* - key rotations (axis and angle)

### XML Encoding

```xml
<OrientationInterpolator
    key='0.0, ...'
    keyValue='0.0 1.0 0.0 0.0, ...'/>
```

### Classic VRML Encoding

```vrml
OrientationInterpolator {
  key [ 0.0, ... ]
  keyValue [ 0.0 1.0 0.0 0.0, ... ]
}
```

Typically route into a [Transform](/x_ite/components/grouping/transform/) node's *set\_rotation* input

## Syntax: ColorInterpolator

[ColorInterpolator](/x_ite/components/interpolation/colorinterpolator/) node describes a color path

- *key* - key fractional times
- *keyValue* - key colors (red, green, blue)

### XML Encoding

```xml
<ColorInterpolator
    key='0.0, ...'
    keyValue='1.0 1.0 0.0, ...'/>
```

### Classic VRML Encoding

```vrml
ColorInterpolator {
  key [ 0.0, ... ]
  keyValue [ 1.0 1.0 0.0, ... ]
}
```

Typically route into a [Material](/x_ite/components/shape/material/) node's *set\_diffuseColor* or *set\_emissiveColor* inputs

## Syntax: ScalarInterpolator

[ScalarInterpolator](/x_ite/components/interpolation/scalarinterpolator/) node describes a scalar path

- *key* - key fractional times
- *keyValue* - key scalars (used for anything)

### XML Encoding

```xml
<ScalarInterpolator
    key='0.0, ...'
    keyValue='4.5, ...'/>
```

### Classic VRML Encoding

```vrml
ScalarInterpolator {
  key [ 0.0, ... ]
  keyValue [ 4.5, ... ]
}
```

Often route into a [Material](/x_ite/components/shape/material/) node's *set\_transparency* input

## Summary

The [TimeSensor](/x_ite/components/time/timesensor/) node's fields control:

- Timer start and stop times
- The cycle interval
- Whether the timer loops or not

The sensor outputs:

- true/false on *isActive* at start and stop
- absolute time on time while running
- fractional time on *fraction\_changed* while running

Interpolators use key times and values and compute intermediate values

All interpolatorsolators have:

- a *set\_fraction* input to set the fractional time
- a *value\_changed* output to send new values

Some interpolatorsolators are:

- The [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/) node converts times to positions (or scales)
- The [OrientationInterpolator](/x_ite/components/interpolation/orientationinterpolator/) node converts times to rotations
- The [ColorInterpolator](/x_ite/components/interpolation/colorinterpolator/) node converts times to colors
- The [ScalarInterpolator](/x_ite/components/interpolation/scalarinterpolator/) node converts times to scalars (such as transparencies)
