---
title: BiquadFilter
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [BiquadFilter, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

BiquadFilter node is an AudioNode processor implementing common low-order filters. Low-order filters are the building blocks of basic tone controls (bass, mid, treble), graphic equalizers, and more advanced filters. Multiple BiquadFilter node filters can be combined to form more complex filters. The filter parameters such as frequency can be changed over time for filter sweeps, etc.

The BiquadFilter node belongs to the **Sound** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
   + X3DTimeDependentNode
     + X3DSoundProcessingNode
       + BiquadFilter
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

### SFTime [in, out] **tailTime** 0 <small>[0,∞)</small>

*tailTime* is duration of time that a node continues to provide output signal after the input signal becomes silent.

### SFFloat [in, out] **detune** 0 <small>[0,∞)</small>

The *detune* field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.

#### Hint

- ComputedPlaybackRate(t) = playbackRate(t) * pow(2, *detune*(t) / 1200)

### SFString [in, out] **type** "LOWPASS" <small>["LOWPASS", "HIGHPASS", "BANDPASS", "LOWSHELF", "HIGHSHELF", "PEAKING", "NOTCH", "ALLPASS"]</small>

*type* selects which BiquadFilter algorithm is used.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#enumdef-biquadfiltertype)

### SFFloat [in, out] **frequency** 350 <small>[0,∞)</small>

*frequency* at which the BiquadFilterNode operates, in Hz.

#### Hint

- [Wikipedia Hertz](https://en.wikipedia.org/wiki/Hertz)

### SFFloat [in, out] **qualityFactor** 1 <small>[0,∞)</small>

*qualityFactor* is Quality Factor (Q) of the respective filter algorithm.

#### Hint

- [Wikipedia Q factor](https://en.wikipedia.org/wiki/Q_factor)

### SFInt32 [in, out] **channelCount**

*channelCount* reports number of channels provided by input nodes.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>

*channelCountMode* determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcountmode)

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>

*channelInterpretation* determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelinterpretation)

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

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

The *children* field specifies audio-graph sound sources providing input signals for this node. If multiple input signals are provided by the inputs *children* field, all channels are mixed together and merged prior to presentation.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

#### Warning

- Contained [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) or [MovieTexture](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#biquadfilternode)

### Warning

- Contained [AudioClip](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/sound/audioclip/) or [MovieTexture](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## See Also

- [X3D Specification of BiquadFilter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BiquadFilter)
