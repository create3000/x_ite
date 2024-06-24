---
title: Sound
date: 2023-01-07
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

The Sound node belongs to the **Sound** component and requires at least level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + Sound
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [ ] **spatialize** TRUE

Whether to *spatialize* sound playback relative to viewer.

#### Hint

- Only effective within the auralization volume.

### SFFloat [in, out] **intensity** 1 <small>[0,1]</small>

Factor [0,1] adjusting loudness (decibels) of emitted sound.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

Position of sound ellipsoid center, relative to local coordinate system.

#### Hint

- Improve audibility by setting *location*='0 1.6 0' so that center height of sound ellipsoid matches typical [NavigationInfo](/x_ite/components/navigation/navigationinfo/) avatarSize height.

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>

*direction* of sound axis, relative to local coordinate system.

### SFFloat [in, out] **minBack** 1 <small>[0,∞)</small>

Inner (full loudness) ellipsoid distance along back direction.

#### Warning

- Ensure *minBack* \<= maxBack.

### SFFloat [in, out] **minFront** 1 <small>[0,∞)</small>

Inner (full loudness) ellipsoid distance along front direction.

#### Warning

- Ensure *minFront* \<= maxFront.

### SFFloat [in, out] **maxBack** 10 <small>[0,∞)</small>

Outer (zero loudness)ellipsoid distance along back direction.

#### Warning

- Ensure minBack \<= *maxBack*.

### SFFloat [in, out] **maxFront** 10 <small>[0,∞)</small>

Outer (zero loudness)ellipsoid distance along front direction.

#### Warning

- Ensure minFront \<= *maxFront*.

### SFFloat [in, out] **priority** 0 <small>[0,1]</small>

Player hint [0,1] if needed to choose which sounds to play.

### SFNode [in, out] **source** NULL <small>[X3DSoundSourceNode]</small>

Sound *source* for the Sound node, either an [AudioClip](/x_ite/components/sound/audioclip/) node or a [MovieTexture](/x_ite/components/texturing/movietexture/) node.

#### Warning

- If *source* field is not specified, the Sound node does not emit audio.

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>

Input/Output field *children*.

## Advice

### Hints

- If the audio source is stereo or multi-channel, channel separation is retained during playback.
- [X3D Sound component Figure 16.2 Sound Node Geometry](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/sound.html#f-Soundnodegeometry
- [X3D Scene Authoring Hints:Audio](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Audio){:target="_blank"}
- [Wikipedia 3D sound localization](https://en.wikipedia.org/wiki/3D_sound_localization){:target="_blank"}

### Warning

- While providing sounds on the ground plane, ensure that the audible auralization volume is sufficiently elevated to match avatar height.

## See Also

- [X3D Specification of Sound Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#Sound){:target="_blank"}
