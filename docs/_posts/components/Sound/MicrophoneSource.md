---
title: MicrophoneSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [MicrophoneSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

MicrophoneSource captures input from a physical microphone in the real world.

The MicrophoneSource node belongs to the **Sound** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + MicrophoneSource
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFString [in, out] **mediaDeviceID** ""

*mediaDeviceID* field provides ID parameter functionality. (TODO experimental)

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>

When *resumeTime* becomes \<= time now, isPaused becomes false and [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>

When time now \>= *pauseTime*, isPaused becomes true and [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/eventutilities/timetrigger/) triggerTime.

#### Warnings

- An active [TimeSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/time/timesensor/) node ignores set_cycleInterval and set_startTime events.
- An active [TimeSensor](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/time/timesensor/) node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**

*isPaused* true/false events are sent when [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) is paused/resumed.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**

Current elapsed time since [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) activated/running, cumulative in seconds, and not counting any paused time.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- [W3C Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams)

### Warning

- Multiple security and privacy condiderations need to be observed.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Sound/MicrophoneSource/MicrophoneSource.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Sound/MicrophoneSource/screenshot.avif" alt="MicrophoneSource"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Sound/MicrophoneSource/MicrophoneSource.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Sound/MicrophoneSource/MicrophoneSource.x3d)
{: .example-links }

## See Also

- [X3D Specification of MicrophoneSource Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#MicrophoneSource)
