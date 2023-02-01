---
title: TimeSensor
date: 2022-01-07
nav: components-Time
categories: [components, Time]
tags: [TimeSensor, Time]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TimeSensor continuously generates events as time passes. Typical use: ROUTE thisTimeSensor.fraction_changed TO someInterpolator.set_fraction. Interchange profile hint: TimeSensor may be ignored if cycleInterval < 0.01 second.

The TimeSensor node belongs to the **Time** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + TimeSensor (X3DSensorNode)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFTime [in, out] **cycleInterval** 1 <small>(0,∞)</small>

*cycleInterval* is loop duration in seconds. Interchange profile hint: TimeSensor may be ignored if cycleInterval \< 0.01 second.

#### Warning

- An active TimeSensor node ignores set_cycleInterval and set_startTime events.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when loop=true, repeat only once when loop=false.

### SFTime [in, out] **startTime** <small>(-∞,∞)</small>

When time now \>= startTime, isActive becomes true and TimeSensor becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

### SFTime [in, out] **resumeTime**

When *resumeTime* becomes\<= time now, isPaused becomes false and TimeSensor becomes inactive. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

#### Warning

- Not supported in VRML97.

### SFTime [in, out] **pauseTime** <small>(-∞,∞)</small>

When time now \>= *pauseTime*, *isPaused* becomes true and TimeSensor becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

#### Warning

- Not supported in VRML97.

### SFTime [in, out] **stopTime** <small>(-∞,∞)</small>

When stopTime becomes \<= time now, isActive becomes false and TimeSensor becomes inactive. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

#### Warnings

- An active TimeSensor node ignores set_cycleInterval and set_startTime events. An active TimeSensor node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**

*isPaused* true/false events are sent when TimeSensor is paused/resumed.

#### Warning

- Not supported in VRML97.

### SFBool [out] **isActive**

*isActive* true/false events are sent when TimeSensor starts/stops running.

### SFTime [out] **cycleTime**

*cycleTime* sends a time outputOnly at startTime, and also at the beginning of each new cycle (useful for synchronization with other time-based objects).

### SFTime [out] **elapsedTime**

Current elapsed time since TimeSensor activated/running, cumulative in seconds, and not counting any paused time.

#### Warning

- Not supported in VRML97.

### SFFloat [out] **fraction_changed**

*fraction_changed* continuously sends value in range [0,1] showing time progress in the current cycle.

### SFTime [out] **time**

*time* continuously sends the absolute time (since January 1, 1970) for a given simulation tick.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Time/TimeSensor/TimeSensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of TimeSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/time.html#TimeSensor){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
