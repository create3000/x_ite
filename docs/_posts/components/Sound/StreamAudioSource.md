---
title: StreamAudioSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [StreamAudioSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

StreamAudioSource operates as an audio source whose media is received from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs. This media source might originate from a remote microphone or sound-processing channed provided by a remote peer on a WebRTC call.\.

The StreamAudioSource node belongs to the [Sound](/x_ite/components/overview/#sound) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + StreamAudioSource
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFFloat | [in, out] | [gain](#fields-gain) | 1  |
| MFString | [in, out] | [streamIdentifier](#fields-streamIdentifier) | [ ] |
| SFTime | [in, out] | [startTime](#fields-startTime) | 0  |
| SFTime | [in, out] | [resumeTime](#fields-resumeTime) | 0  |
| SFTime | [in, out] | [pauseTime](#fields-pauseTime) | 0  |
| SFTime | [in, out] | [stopTime](#fields-stopTime) | 0  |
| SFBool | [out] | [isPaused](#fields-isPaused) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFTime | [out] | [elapsedTime](#fields-elapsedTime) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #fields-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### MFString [in, out] **streamIdentifier** [ ]
{: #fields-streamIdentifier }

Stream identification TBD

#### Hint

- [W3C Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams)

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>
{: #fields-startTime }

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>
{: #fields-resumeTime }

When *resumeTime* becomes \<= time now, isPaused becomes false and [AudioClip](/x_ite/components/sound/audioclip/) becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>
{: #fields-pauseTime }

When time now \>= *pauseTime*, isPaused becomes true and [AudioClip](/x_ite/components/sound/audioclip/) becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>
{: #fields-stopTime }

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

#### Warnings

- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_cycleInterval and set_startTime events.
- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**
{: #fields-isPaused }

*isPaused* true/false events are sent when [AudioClip](/x_ite/components/sound/audioclip/) is paused/resumed.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**
{: #fields-elapsedTime }

Current elapsed time since [AudioClip](/x_ite/components/sound/audioclip/) activated/running, cumulative in seconds, and not counting any paused time.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#mediastreamaudiosourcenode)

## See Also

- [X3D Specification of StreamAudioSource Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#StreamAudioSource)
