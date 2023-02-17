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

BufferAudioSource ...

The BufferAudioSource node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFString [in, out] **description** ""

### SFBool [in, out] **enabled** <small></small>

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTextureAtlas loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

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

### SFFloat [in, out] **gain** <small></small>

### MFFloat [in, out] **buffer** <small></small>

### SFFloat [in, out] **detune** <small></small>

### SFTime [in, out] **bufferDuration** <small></small>

### SFTime [in, out] **loopStart** <small></small>

### SFTime [in, out] **loopEnd** <small></small>

### SFInt32 [in, out] **numberOfChannels** <small></small>

### SFFloat [in, out] **playbackRate** <small></small>

### SFFloat [in, out] **sampleRate** <small></small>

### SFInt32 [out] **bufferLength** <small></small>

### SFInt32 [out] **channelCount** <small></small>

### SFString [in, out] **channelCountMode** <small></small>

### SFString [in, out] **channelInterpretation** <small></small>

### SFBool [in, out] **loop** <small></small>

### SFTime [in, out] **startTime** <small></small>

### SFTime [in, out] **resumeTime** <small></small>

### SFTime [in, out] **pauseTime** <small></small>

### SFTime [in, out] **stopTime** <small></small>

### SFBool [out] **isPaused** <small></small>

### SFBool [out] **isActive** <small></small>

### SFTime [out] **elapsedTime** <small></small>

## External Links

- [X3D Specification of BufferAudioSource](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#BufferAudioSource){:target="_blank"}
