---
title: ListenerPointSource
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [ListenerPointSource, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ListenerPointSource node represents position and orientation of a person listening to virtual sound in the audio scene, and provides single or multiple sound channels as output. Multiple ListenerPointSource nodes can be active for sound processing.

The ListenerPointSource node belongs to the **Sound** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DTimeDependentNode
      + X3DSoundSourceNode
        + ListenerPointSource
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- SFBool \[in, out\] [trackCurrentView](#sfbool-in-out-trackcurrentview-false)
- SFVec3f \[in, out\] [position](#sfvec3f-in-out-position-0-0-0--)
- SFRotation \[in, out\] [orientation](#sfrotation-in-out-orientation-0-0-1-0--1-1-or--)
- SFFloat \[in, out\] [interauralDistance](#sffloat-in-out-interauraldistance-0-0-small-classrednot-supported)
- SFBool \[in, out\] [dopplerEnabled](#sfbool-in-out-dopplerenabled-false-small-classrednot-supported)

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

### SFBool [in, out] **trackCurrentView** FALSE

If *trackCurrentView* field is true then position and orientation match avatar's (user's) current view.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>

*position* (x, y, z in meters) relative to local coordinate system.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Rotation (axis, angle in radians) of listening point direction relative to default -Z axis direction in local coordinate system.

#### Hints

- This is *orientation* change from default direction (0 0 -1) along the -X axis.
- Complex rotations can be accomplished axis-by-axis using parent Transforms.

#### Warning

- For VR/AR/MR/XR users wearing a head-mounted display (HMD), animating this field may induce motion sickness.

### SFFloat [in, out] **interauralDistance** 0 <small>[0,∞)</small> <small class="red">not supported</small>

The *interauralDistance* field is .

### SFBool [in, out] **dopplerEnabled** FALSE <small class="red">not supported</small>

*dopplerEnabled* enables/disables whether real-time Doppler effects (due to relation motion between sources and listeners) are computed by browser between virtual sound sources and active listening locations, then applied to received frequency at active listening locations.

#### Hints

- Functional support requires player support for [Sound](/x_ite/components/sound/sound/) component level 3.
- [Wikipedia Doppler effect](https://en.wikipedia.org/wiki/Doppler_effect)

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#audiolistener)

## See Also

- [X3D Specification of ListenerPointSource Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#ListenerPointSource)
