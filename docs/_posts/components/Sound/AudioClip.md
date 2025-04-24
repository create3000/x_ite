---
title: AudioClip
date: 2023-01-07
nav: components-Sound
categories: [components, Sound]
tags: [AudioClip, Sound]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

AudioClip provides audio data used by parent Sound nodes.

The AudioClip node belongs to the **Sound** component and requires at least support level **1,** its default container field is *source.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + AudioClip (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- SFBool \[in, out\] [load](#sfbool-in-out-load-true)
- MFString \[in, out\] [url](#mfstring-in-out-url---uri)
- SFTime \[in, out\] [autoRefresh](#sftime-in-out-autorefresh-0-0)
- SFTime \[in, out\] [autoRefreshTimeLimit](#sftime-in-out-autorefreshtimelimit-3600-0)
- SFFloat \[in, out\] [gain](#sffloat-in-out-gain-1--)
- SFFloat \[in, out\] [pitch](#sffloat-in-out-pitch-1-0)
- SFBool \[in, out\] [loop](#sfbool-in-out-loop-false)
- SFTime \[in, out\] [startTime](#sftime-in-out-starttime-0--)
- SFTime \[in, out\] [resumeTime](#sftime-in-out-resumetime-0--)
- SFTime \[in, out\] [pauseTime](#sftime-in-out-pausetime-0--)
- SFTime \[in, out\] [stopTime](#sftime-in-out-stoptime-0--)
- SFBool \[out\] [isPaused](#sfbool-out-ispaused)
- SFBool \[out\] [isActive](#sfbool-out-isactive)
- SFTime \[out\] [elapsedTime](#sftime-out-elapsedtime)
- SFTime \[out\] [duration_changed](#sftime-out-duration_changed)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of sound file or stream. Support for .wav format is required, .midi format is recommended, other formats are optional.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks. "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFFloat [in, out] **pitch** 1 <small>(0,∞)</small>

Multiplier for the rate at which sampled sound is played. Changing *pitch* also changes playback speed.

#### Hint

- Changing the *pitch* field does not trigger a duration_changed event. Playback interval may vary but duration of the original media data remains unmodified.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when *loop*=true, repeat only once when *loop*=false.

### SFTime [in, out] **startTime** 0 <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **resumeTime** 0 <small>(-∞,∞)</small>

When *resumeTime* becomes \<= time now, isPaused becomes false and AudioClip becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>

When time now \>= *pauseTime*, isPaused becomes true and AudioClip becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

### SFTime [in, out] **stopTime** 0 <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

#### Warnings

- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_cycleInterval and set_startTime events.
- An active [TimeSensor](/x_ite/components/time/timesensor/) node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**

*isPaused* true/false events are sent when AudioClip is paused/resumed.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**

Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **duration_changed**

*duration_changed* is length of time in seconds for one cycle of media stream.

#### Hints

- *duration_changed* is an SFTime duration interval, normally nonnegative, and not an absolute clock time.
- Changing the pitch field does not trigger a *duration_changed* event. Playback interval may vary but duration of the original media data remains unmodified.

#### Warnings

- Duration value of -1 implies that media data has not yet loaded or is unavailable for some reason.
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Supported File Formats

Any audio file format supported by the web browser, but at least:

| Encoding | File Extension | MIME Type  |
|----------|----------------|------------|
| MP3      | .mp3           | audio/mp3  |
| WAV      | .wav           | audio/wav  |
| OGG      | .oga, .ogg     | audio/ogg  |

## Advice

### Hints

- Add a parent [Sound](/x_ite/components/sound/sound/) node first.
- Utilize DEF/USE references for multiple copies of a single AudioClip sound file in order to avoid multiple-download delays, reduce memory requirements, and maintain synchronization.
- Authors can provide multiple audio formats for the same audio track, with each source address listed separately in the url field.
- Player support for .wav format is required, .midi format is recommended, other formats are optional.
- [X3D Scene Authoring Hints:Audio](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Audio)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Sound/AudioClip/AudioClip.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Sound/AudioClip/screenshot.avif" alt="AudioClip"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Sound/AudioClip/AudioClip.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Sound/AudioClip/AudioClip.x3d)
{: .example-links }

## See Also

- [X3D Specification of AudioClip Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#AudioClip)
