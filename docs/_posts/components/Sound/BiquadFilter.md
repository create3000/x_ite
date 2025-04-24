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

The BiquadFilter node belongs to the **Sound** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
   + X3DTimeDependentNode
     + X3DSoundProcessingNode
       + BiquadFilter
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [description](#field-description) | "" |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFFloat | [in, out] | [gain](#field-gain) | 1  |
| SFTime | [in, out] | [tailTime](#field-tailTime) | 0  |
| SFFloat | [in, out] | [detune](#field-detune) | 0  |
| SFString | [in, out] | [type](#field-type) | "LOWPASS"  |
| SFFloat | [in, out] | [frequency](#field-frequency) | 350  |
| SFFloat | [in, out] | [qualityFactor](#field-qualityFactor) | 1  |
| SFInt32 | [in, out] | [channelCount](#field-channelCount) |  |
| SFString | [in, out] | [channelCountMode](#field-channelCountMode) | "MAX"  |
| SFString | [in, out] | [channelInterpretation](#field-channelInterpretation) | "SPEAKERS"  |
| SFTime | [in, out] | [startTime](#field-startTime) | 0  |
| SFTime | [in, out] | [resumeTime](#field-resumeTime) | 0  |
| SFTime | [in, out] | [pauseTime](#field-pauseTime) | 0  |
| SFTime | [in, out] | [stopTime](#field-stopTime) | 0  |
| SFBool | [out] | [isPaused](#field-isPaused) |  |
| SFBool | [out] | [isActive](#field-isActive) |  |
| SFTime | [out] | [elapsedTime](#field-elapsedTime) |  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #field-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables node operation.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #field-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFTime [in, out] **tailTime** 0 <small>[0,∞)</small>
{: #field-tailTime }

*tailTime* is duration of time that a node continues to provide output signal after the input signal becomes silent.

### SFFloat [in, out] **detune** 0 <small>[0,∞)</small>
{: #field-detune }

The *detune* field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.

#### Hint

- ComputedPlaybackRate(t) = playbackRate(t) * pow(2, *detune*(t) / 1200)

### SFString [in, out] **type** "LOWPASS" <small>["LOWPASS", "HIGHPASS", "BANDPASS", "LOWSHELF", "HIGHSHELF", "PEAKING", "NOTCH", "ALLPASS"]</small>
{: #field-type }

*type* selects which BiquadFilter algorithm is used.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#enumdef-biquadfiltertype)

### SFFloat [in, out] **frequency** 350 <small>[0,∞)</small>
{: #field-frequency }

*frequency* at which the BiquadFilterNode operates, in Hz.

#### Hint

- [Wikipedia Hertz](https://en.wikipedia.org/wiki/Hertz)

### SFFloat [in, out] **qualityFactor** 1 <small>[0,∞)</small>
{: #field-qualityFactor }

*qualityFactor* is Quality Factor (Q) of the respective filter algorithm.

#### Hint

- [Wikipedia Q factor](https://en.wikipedia.org/wiki/Q_factor)

### SFInt32 [in, out] **channelCount**
{: #field-channelCount }

*channelCount* reports number of channels provided by input nodes.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>
{: #field-channelCountMode }

*channelCountMode* determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcountmode)

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>
{: #field-channelInterpretation }

*channelInterpretation* determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelinterpretation)

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>
{: #field-startTime }

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>
{: #field-resumeTime }

When *resumeTime* becomes \<= time now, isPaused becomes false and [AudioClip](/x_ite/components/sound/audioclip/) becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>
{: #field-pauseTime }

When time now \>= *pauseTime*, isPaused becomes true and [AudioClip](/x_ite/components/sound/audioclip/) becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>
{: #field-stopTime }

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

#### Warnings

- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_cycleInterval and set_startTime events.
- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**
{: #field-isPaused }

*isPaused* true/false events are sent when [AudioClip](/x_ite/components/sound/audioclip/) is paused/resumed.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**
{: #field-isActive }

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**
{: #field-elapsedTime }

Current elapsed time since [AudioClip](/x_ite/components/sound/audioclip/) activated/running, cumulative in seconds, and not counting any paused time.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>
{: #field-children }

The *children* field specifies audio-graph sound sources providing input signals for this node. If multiple input signals are provided by the inputs *children* field, all channels are mixed together and merged prior to presentation.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

#### Warning

- Contained [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#biquadfilternode)

### Warning

- Contained [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## See Also

- [X3D Specification of BiquadFilter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BiquadFilter)
