---
title: MovieTexture
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [MovieTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MovieTexture applies a 2D movie image to surface geometry, or provides audio for a Sound node. First define as texture, then USE as Sound source to see it/hear it/save memory. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) texture-coordinate values in range [0.0, 1.0] for opposite corners of the image.

The MovieTexture node belongs to the **Texturing** component and requires at least support level **3,** its default container field is *texture.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + MovieTexture (X3DSoundSourceNode, X3DUrlObject)*
```

\* Derived from multiple interfaces.
{: .small }

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
| SFFloat | [in, out] | [gain](#fields-gain) | 1  |
| SFFloat | [in, out] | [speed](#fields-speed) | 1  |
| SFFloat | [in, out] | [pitch](#fields-pitch) | 1  |
| SFBool | [in, out] | [loop](#fields-loop) | FALSE |
| SFTime | [in, out] | [startTime](#fields-startTime) | 0  |
| SFTime | [in, out] | [resumeTime](#fields-resumeTime) | 0  |
| SFTime | [in, out] | [pauseTime](#fields-pauseTime) | 0  |
| SFTime | [in, out] | [stopTime](#fields-stopTime) | 0  |
| SFBool | [out] | [isPaused](#fields-isPaused) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFTime | [out] | [elapsedTime](#fields-elapsedTime) |  |
| SFTime | [out] | [duration_changed](#fields-duration_changed) |  |
| SFBool | [ ] | [repeatS](#fields-repeatS) | TRUE |
| SFBool | [ ] | [repeatT](#fields-repeatT) | TRUE |
| SFNode | [ ] | [textureProperties](#fields-textureProperties) | NULL  |
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

Location and filename of movie file or stream. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
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

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #fields-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFFloat [in, out] **speed** 1 <small>(-∞,∞)</small>
{: #fields-speed }

Factor for how fast the movie (or soundtrack) is played.

#### Hints

- A MovieTexture node shall display frame 0 if *speed* = 0.
- A negative *speed* value sets the movie to play in reverse.

### SFFloat [in, out] **pitch** 1 <small>(0,∞)</small>
{: #fields-pitch }

Multiplier for the rate at which sampled sound is played. Changing *pitch* also changes playback speed.

#### Hint

- Changing the *pitch* field does not trigger a duration_changed event. Playback interval may vary but duration of the original media data remains unmodified.

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

When *resumeTime* becomes \<= time now, isPaused becomes false and MovieTexture becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

#### Warning

- Not supported in VRML97.

### SFTime [in, out] **pauseTime** 0 <small>(-∞,∞)</small>
{: #fields-pauseTime }

When time now \>= *pauseTime*, isPaused becomes true and MovieTexture becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

- ROUTE a time value matching system clock to this field, such as output event from [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) touchTime or [TimeTrigger](/x_ite/components/eventutilities/timetrigger/) triggerTime.

#### Warning

- Not supported in VRML97.

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

*isPaused* true/false events are sent when MovieTexture is paused/resumed.

#### Warnings

- Not supported in VRML97.
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**
{: #fields-elapsedTime }

Current elapsed time since MovieTexture activated/running, cumulative in seconds, and not counting any paused time.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warnings

- Not supported in VRML97.
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **duration_changed**
{: #fields-duration_changed }

Length of time in seconds for one cycle of media stream.

#### Hints

- *duration_changed* is an SFTime duration interval, normally nonnegative, and not an absolute clock time.
- Changing the pitch field does not trigger a *duration_changed* event. Playback interval may vary but duration of the original media data remains unmodified.

#### Warnings

- Duration value of -1 implies that media data has not yet loaded or is unavailable for some reason.
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [ ] **repeatS** TRUE
{: #fields-repeatS }

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE
{: #fields-repeatT }

Whether to repeat texture along T axis vertically from top to bottom.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Supported File Formats

Any video file format supported by the web browser, but at least:

| Encoding | File Extension | MIME Type  |
|----------|----------------|------------|
| MP4      | .mp4           | video/mp4  |
| WebM     | .webm          | video/webm |
| OGG      | .ogv           | video/ogg  |
| GIF      | .gif           | image/gif  |

## Advice

### Hints

- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- Provide a [Viewpoint](/x_ite/components/navigation/viewpoint/) that allows a clear view of the MovieTexture so that users can easily see all details.
- Utilize DEF/USE references for multiple copies of a single MovieTexture video file in order to avoid multiple-download delays, reduce memory requirements, and maintain synchronization.
- Authors can provide multiple video formats for the same video track, with each source address listed separately in the url field.
- Player support for MPEG-1 video format is required, other formats are optional.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### Warning

- MovieTexture has `containerField='texture'` when parent is an [Appearance](/x_ite/components/shape/appearance/) node, otherwise `containerField='source'` when parent is a [Sound](/x_ite/components/sound/sound/) node.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Texturing/MovieTexture/MovieTexture.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/Texturing/MovieTexture/screenshot.avif" alt="MovieTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/MovieTexture/MovieTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/MovieTexture/MovieTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of MovieTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MovieTexture)
