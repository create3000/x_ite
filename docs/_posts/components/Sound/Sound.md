---
title: Sound
date: 2022-01-07
nav: components-Sound
categories: [components, Sound]
tags: [Sound, Sound]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

The Sound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. Sound intensity includes stereo support, varying according to user location and view direction in the scene.

The Sound node belongs to the **Sound** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + Sound
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFFloat [in, out] **intensity** 1 <small>[0,1]</small>

Factor [0,1] adjusting loudness (decibels) of emitted sound.

### SFBool [ ] **spatialize** TRUE

Whether to spatialize sound playback relative to viewer.

#### Hint

- Only effective between minimum and maximum ellipsoids.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

Position of sound center, relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>

*direction* of sound axis, relative to local coordinate system.

### SFFloat [in, out] **minBack** 1 <small>[0,∞)</small>

Inner (full volume) ellipsoid distance along back direction. Ensure minBack \<= maxBack.

### SFFloat [in, out] **minFront** 1 <small>[0,∞)</small>

Inner (full volume) ellipsoid distance along front direction. Ensure minFront \<= maxFront.

### SFFloat [in, out] **maxBack** 10 <small>[0,∞)</small>

Outer (zero volume) ellipsoid distance along back direction. Ensure minBack \<= maxBack.

### SFFloat [in, out] **maxFront** 10 <small>[0,∞)</small>

Outer (zero volume) ellipsoid distance along front direction. Ensure minFront \<= maxFront.

### SFFloat [in, out] **priority** 0 <small>[0,1]</small>

Player hint [0,1] if needed to choose which sounds to play.

### SFNode [in, out] **source** NULL <small>[X3DSoundSourceNode]</small>

Input/Output field source.

## Description

### Hint

- If the audio source is stereo or multi-channel, channel separation is retained during playback.

### Warning

- While providing sounds on the ground plane, ensure that the audible auralization ellipse is sufficiently elevated to match avatar height.

## External Links

- [X3D Specification of Sound](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#Sound){:target="_blank"}
- [X3D Scene Authoring Hints:Audio](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Audio){:target="_blank"}
