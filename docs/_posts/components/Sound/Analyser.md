---
title: Analyser
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [Analyser, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

Analyser provides real-time frequency and time-domain analysis information, without any change to the input.

The Analyser node belongs to the [Sound](/x_ite/components/overview/#sound) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
   + X3DTimeDependentNode
     + X3DSoundProcessingNode
       + Analyser
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFInt32 | [in, out] | [fftSize](#fields-fftSize) | 2048  |
| SFFloat | [in, out] | [minDecibels](#fields-minDecibels) | -100  |
| SFFloat | [in, out] | [maxDecibels](#fields-maxDecibels) | -30  |
| SFFloat | [in, out] | [smoothingTimeConstant](#fields-smoothingTimeConstant) | 0.8 |
| SFInt32 | [out] | [frequencyBinCount](#fields-frequencyBinCount) | 1024  |
| MFInt32 | [out] | [byteFrequencyData](#fields-byteFrequencyData) |  |
| MFInt32 | [out] | [byteTimeDomainData](#fields-byteTimeDomainData) |  |
| MFFloat | [out] | [floatFrequencyData](#fields-floatFrequencyData) |  |
| MFFloat | [out] | [floatTimeDomainData](#fields-floatTimeDomainData) |  |
| SFFloat | [in, out] | [gain](#fields-gain) | 1  |
| SFTime | [in, out] | [tailTime](#fields-tailTime) | 0  |
| SFInt32 | [in, out] | [channelCount](#fields-channelCount) |  |
| SFString | [in, out] | [channelCountMode](#fields-channelCountMode) | "MAX"  |
| SFString | [in, out] | [channelInterpretation](#fields-channelInterpretation) | "SPEAKERS"  |
| SFTime | [in, out] | [startTime](#fields-startTime) | 0  |
| SFTime | [in, out] | [resumeTime](#fields-resumeTime) | 0  |
| SFTime | [in, out] | [pauseTime](#fields-pauseTime) | 0  |
| SFTime | [in, out] | [stopTime](#fields-stopTime) | 0  |
| SFBool | [out] | [isPaused](#fields-isPaused) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFTime | [out] | [elapsedTime](#fields-elapsedTime) |  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
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

### SFInt32 [in, out] **fftSize** 2048 <small>[0,∞)</small>
{: #fields-fftSize }

*fftSize* represents size of Fast Fourier [Transform](/x_ite/components/grouping/transform/) (FFT) used to determine frequency domain.

#### Hint

- [Fast Fourier Transform (FFT)](https://en.wikipedia.org/wiki/Fast_Fourier_transform)

### SFFloat [in, out] **minDecibels** -100 <small>(-∞,∞)</small>
{: #fields-minDecibels }

*minDecibels* represents minimum power value in scaling range for FFT analysis data.

### SFFloat [in, out] **maxDecibels** -30 <small>(-∞,∞)</small>
{: #fields-maxDecibels }

*maxDecibels* represents maximum power value in scaling range for FFT analysis data.

### SFFloat [in, out] **smoothingTimeConstant** 0.8<small>[0,∞)</small>
{: #fields-smoothingTimeConstant }

*smoothingTimeConstant* represents averaging constant during last analysis frame.

### SFInt32 [out] **frequencyBinCount** 1024 <small>[0,∞)</small>
{: #fields-frequencyBinCount }

*frequencyBinCount* is half of fftSize and generally equates to number of data values available for the visualization.

### MFInt32 [out] **byteFrequencyData**
{: #fields-byteFrequencyData }

Output field *byteFrequencyData*.

### MFInt32 [out] **byteTimeDomainData**
{: #fields-byteTimeDomainData }

Output field *byteTimeDomainData*.

### MFFloat [out] **floatFrequencyData**
{: #fields-floatFrequencyData }

Output field *floatFrequencyData*.

### MFFloat [out] **floatTimeDomainData**
{: #fields-floatTimeDomainData }

Output field *floatTimeDomainData*.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #fields-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFTime [in, out] **tailTime** 0 <small>[0,∞)</small>
{: #fields-tailTime }

*tailTime* is duration of time that a node continues to provide output signal after the input signal becomes silent.

#### Hint

- *tailTime* always has a value of zero for Analyser.

### SFInt32 [in, out] **channelCount**
{: #fields-channelCount }

*channelCount* reports number of channels provided by input nodes.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>
{: #fields-channelCountMode }

*channelCountMode* determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcountmode)

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>
{: #fields-channelInterpretation }

*channelInterpretation* determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelinterpretation)

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

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>
{: #fields-children }

The *children* field specifies audio-graph sound sources providing input signals for this node. If multiple input signals are provided by the inputs *children* field, all channels are mixed together and merged prior to presentation.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

#### Warning

- Contained [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#analysernode)

## See Also

- [X3D Specification of Analyser Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#Analyser)
