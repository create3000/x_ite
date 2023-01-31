---
title: MovieTexture
date: 2022-01-07
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

MovieTexture applies a 2D movie image to surface geometry, or provides audio for a Sound node. First define as texture, then USE as Sound source to see it/hear it/save memory. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) values in range [0.0, 1.0] for opposite corners of the image.

The MovieTexture node belongs to the **Texturing** component and its default container field is *texture.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DTexture2DNode
        + MovieTexture (X3DSoundSourceNode, X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hint

Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of movie file or stream. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFFloat [in, out] **speed** 1 <small>(-∞,∞)</small>

Factor for how fast the movie (or soundtrack) is played.

#### Hints

A MovieTexture node shall display frame 0 if speed = 0. A negative speed value sets the movie to play in reverse.

### SFFloat [in, out] **pitch** 1 <small>(0,∞)</small>

Input/Output field pitch.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when loop=true, repeat only once when loop=false.

### SFTime [in, out] **startTime** <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

Usually receives a ROUTEd time value.

### SFTime [in, out] **resumeTime** <small>(-∞,∞)</small>

When resumeTime becomes `<= time now, isPaused becomes false and MovieTexture becomes active. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

Usually receives a ROUTEd time value.

#### Warning

Not supported in VRML97.

### SFTime [in, out] **pauseTime** <small>(-∞,∞)</small>

When time now >`= pauseTime, isPaused becomes true and MovieTexture becomes paused. Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

Usually receives a ROUTEd time value.

#### Warning

Not supported in VRML97.

### SFTime [in, out] **stopTime** <small>(-∞,∞)</small>

Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.

#### Hint

Usually receives a ROUTEd time value.

#### Warnings

An active TimeSensor node ignores set_cycleInterval and set_startTime events. An active TimeSensor node ignores set_stopTime event values less than or equal to startTime.

### SFBool [out] **isPaused**

IsPaused true/false events are sent when MovieTexture is paused/resumed.

#### Warning

Not supported in VRML97.

### SFBool [out] **isActive**

IsActive true/false events are sent when playback starts/stops.

### SFTime [out] **elapsedTime**

Current elapsed time since MovieTexture activated/running, cumulative in seconds, and not counting any paused time.

#### Warning

Not supported in VRML97.

### SFTime [out] **duration_changed**

Length of time in seconds for one cycle of movie.

### SFBool [ ] **repeatS** TRUE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** TRUE

Whether to vertically repeat texture along T axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## Description

### Hints

- Texture width and height must be power of two.
- Can contain a single TextureProperties node.
- Insert Shape and Appearance nodes before adding texture.
- Provide a Viewpoint that allows a clear view of the MovieTexture so that users can easily see all details.
- Utilize DEF/USE references for multiple copies of a single MovieTexture video file in order to avoid multiple-download delays, reduce memory requirements, and maintain synchronization.
- Authors can provide multiple video formats for the same video track, with each source address listed separately in the url field.
- Player support for MPEG-1 video format is required, other formats are optional.
- The underlying `<video/>` element can be accessed via movieTexture.getValue().getElement().

Warning
-------

- MovieTexture has containerField='texture' when parent is an Appearance node, otherwise containerField='source' when parent is a Sound node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing/MovieTexture/MovieTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of MovieTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MovieTexture){:target="_blank"}
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images){:target="_blank"}
