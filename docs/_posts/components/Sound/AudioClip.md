---
title: AudioClip
date: 2022-01-07
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

The AudioClip node belongs to the **Sound** component and its default container field is *source.* It is available since X3D version 2.0 or later.

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

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hint

- Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTextureAtlas loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of sound file or stream. Support for .wav format is required, .midi format is recommended, other formats are optional.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks. "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

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

### SFFloat [in, out] **pitch** 1 <small>(0,∞)</small>

Multiplier for the rate at which sampled sound is played. Changing pitch also changes playback speed.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when loop=true, repeat only once when loop=false.

### SFTime [in, out] **startTime** <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

### SFTime [in, out] **resumeTime** <small>(-∞,∞)</small>

When resumeTime becomes\<= time now, isPaused becomes false and AudioClip becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

### SFTime [in, out] **pauseTime** <small>(-∞,∞)</small>

When time now \>= pauseTime, isPaused becomes true and AudioClip becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

### SFTime [in, out] **stopTime** <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- Usually receives a ROUTEd time value.

#### Warnings

- An active TimeSensor node ignores set_cycleInterval and set_startTime events. An active TimeSensor node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**

*isPaused* true/false events are sent when AudioClip is paused/resumed.

### SFBool [out] **isActive**

*isActive* true/false events are sent when playback starts/stops.

### SFTime [out] **elapsedTime**

Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.

### SFTime [out] **duration_changed**

*duration_changed* is length of time in seconds for one cycle of audio.

## Description

### Hints

- Add a parent Sound node first.
- Utilize DEF/USE references for multiple copies of a single AudioClip sound file in order to avoid multiple-download delays, reduce memory requirements, and maintain synchronization.
- Authors can provide multiple audio formats for the same audio track, with each source address listed separately in the url field.
- Player support for .wav format is required, .midi format is recommended, other formats are optional.
- The underlying `<audio/>` element can be accessed via audioClip.getValue().getElement().

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Sound/AudioClip/AudioClip.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of AudioClip](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#AudioClip){:target="_blank"}
- [X3D Scene Authoring Hints:Audio](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Audio){:target="_blank"}
