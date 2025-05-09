---
title: BufferAudioSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [BufferAudioSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

BufferAudioSource node represents a memory-resident audio asset that can contain one or more channels. Typically the length of the Pulse Coded Modulation (PCM) data is expected to be fairly short (usually somewhat less than a minute).

The BufferAudioSource node belongs to the [Sound](/x_ite/components/overview/#sound) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + BufferAudioSource (X3DUrlObject)*
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
| SFInt32 | [in, out] | [numberOfChannels](#fields-numberOfChannels) | 0  |
| SFFloat | [in, out] | [sampleRate](#fields-sampleRate) | 0  |
| SFInt32 | [in, out] | [bufferLength](#fields-bufferLength) |  |
| MFFloat | [in, out] | [buffer](#fields-buffer) | [ ] |
| SFTime | [out] | [bufferDuration](#fields-bufferDuration) | 0  |
| SFFloat | [in, out] | [gain](#fields-gain) | 1  |
| SFFloat | [in, out] | [detune](#fields-detune) | 0  |
| SFFloat | [in, out] | [playbackRate](#fields-playbackRate) | 1  |
| SFTime | [in, out] | [loopStart](#fields-loopStart) | 0  |
| SFTime | [in, out] | [loopEnd](#fields-loopEnd) | 0  |
| SFInt32 | [in, out] | [channelCount](#fields-channelCount) |  |
| SFString | [in, out] | [channelCountMode](#fields-channelCountMode) | "MAX"  |
| SFString | [in, out] | [channelInterpretation](#fields-channelInterpretation) | "SPEAKERS"  |
| SFBool | [in, out] | [loop](#fields-loop) | FALSE |
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

### SFBool [in, out] **load** TRUE
{: #fields-load }

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>
{: #fields-url }

Location and filename of sound file. Support for .wav format is required, .midi format is recommended, other formats are optional.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks. "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>
{: #fields-autoRefresh }

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>
{: #fields-autoRefreshTimeLimit }

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFInt32 [in, out] **numberOfChannels** 0 <small>[0,∞)</small>
{: #fields-numberOfChannels }

*numberOfChannels* is number of audio channels found in this buffer source.

### SFFloat [in, out] **sampleRate** 0 <small>[0,∞)</small>
{: #fields-sampleRate }

*sampleRate* field is sample-frames per second.

#### Hints

- Sample-rate converters (variable speed processors) are not supported in real-time processing.
- Nyquist frequency is half this *sampleRate* value.
- [Wikipedia Nyquist frequency](https://en.wikipedia.org/wiki/Nyquist_frequency)

### SFInt32 [in, out] **bufferLength**
{: #fields-bufferLength }

*bufferLength* is length of buffer field in sample-frames.

### MFFloat [in, out] **buffer** [ ] <small>[−1,1]</small>
{: #fields-buffer }

*buffer* is a memory-resident audio asset that can contain one or more channels. *buffer* data format is non-interleaved 32-bit floating-point linear PCM values with a normal range of [−1,1], but values are not limited to this range.

#### Hint

- [Wikipedia Pulse-Code Modulation (PCM)](https://en.wikipedia.org/wiki/Pulse-code_modulation)

### SFTime [out] **bufferDuration** 0 <small>[0,∞)</small>
{: #fields-bufferDuration }

*bufferDuration* is duration in seconds to use from buffer field.

#### Hint

- Duration is a nonnegative SFTime duration interval, not an absolute clock time.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #fields-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFFloat [in, out] **detune** 0 <small>[0,∞)</small>
{: #fields-detune }

The *detune* field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.

#### Hint

- ComputedPlaybackRate(t) = playbackRate(t) * pow(2, *detune*(t) / 1200)

### SFFloat [in, out] **playbackRate** 1 <small>(-∞,∞)</small>
{: #fields-playbackRate }

*playbackRate* field is speed at which to render the audio stream, and forms a compound field together with detune field

#### Hint

- Negative values play in reverse.

### SFTime [in, out] **loopStart** 0 <small>[0,∞)</small>
{: #fields-loopStart }

*loopStart* field is optional playhead position where looping begins if loop=true. If *loopStart* is greater than duration of buffer, looping starts at buffer end.

#### Hint

- *loopStart* represents a nonnegative SFTime duration interval, not an absolute clock time.

### SFTime [in, out] **loopEnd** 0 <small>[0,∞)</small>
{: #fields-loopEnd }

*loopEnd* field is optional playhead position where looping ends if loop=true. If *loopEnd* value is zero, or if *loopEnd* is greater than duration of buffer, looping ends at buffer end.

#### Hint

- *loopEnd* represents a nonnegative SFTime duration interval, not an absolute clock time.

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

### SFBool [in, out] **loop** FALSE
{: #fields-loop }

Repeat indefinitely when *loop*=true, repeat only once when *loop*=false.

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

## Supported File Formats

Any audio file format supported by the web browser, but at least:

| Encoding | File Extension | MIME Type  |
|----------|----------------|------------|
| MP3      | .mp3           | audio/mp3  |
| WAV      | .wav           | audio/wav  |
| OGG      | .oga, .ogg     | audio/ogg  |

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#AudioBufferSourceNode)

### Warning

- For longer sounds, such as music soundtracks, streaming such as [StreamAudioSource](/x_ite/components/sound/streamaudiosource/) should be used.

## See Also

- [X3D Specification of BufferAudioSource Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BufferAudioSource)
