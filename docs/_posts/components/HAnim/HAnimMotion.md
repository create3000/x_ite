---
title: HAnimMotion
date: 2023-01-31
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimMotion, HAnim]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

An HAnimMotion node supports discrete frame-by-frame playback for H-Anim motion data animation. Design characteristics include integration with HAnim figure data and HAnimJoint nodes, animation control, and playback of raw motion data.

The HAnimMotion node belongs to the **HAnim** component and its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + HAnimMotion
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in] **next**

Send *next* output value in keyValue array, and reset internal fraction field to match corresponding value in key array.

#### Hint

- This input event will "wrap around" boundary of frame array, i.e. continue from endFrame *next* to startFrame if necessary.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [in] **previous**

Send *previous* output value in keyValue array, and reset internal fraction field to match corresponding value in key array.

#### Hint

- This input event will "wrap around" boundary of frame array, i.e. continue from startFrame next to endFrame if necessary.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFTime [in, out] **frameDuration** 0.1 <small>(0,∞)</small>

*frameDuration* specifies the duration of each frame in seconds.

### SFInt32 [in, out] **frameIncrement** 1 <small>(-∞,∞)</small>

*frameIncrement* field controls whether playback direction is forwards or backwards, and also whether frames are skipped (for example, subsampled replay). For a single animation step, the next frameIndex value equals (frameIndex + *frameIncrement*) modulo frameCount.

#### Hint

- Note that setting *frameIncrement* to 0 prevents automatic advancement of frameIndex and pauses animation of HAnimMotion node.

### SFInt32 [in, out] **frameIndex** 0 <small>[0,∞)</small>

*frameIndex* indicates index of current frame. Note that *frameIndex* can be modified whether the Motion node is enabled or not, and becomes effective when the next animation cycle occurs. Thus the *frameIndex* value indicates the frame currently (or next) being processed.

#### Hint

- *frameIndex* starts at 0 and is no greater than (frameCount - 1). Values less than 0 are reset as 0. Values greater or equal to frameCount are stored as (frameCount - 1). Thus the value of *frameIndex* shall be greater than or equal to zero, and less than frameCount.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when *loop*=true, repeat only once when *loop*=false.

### SFString [in, out] **channels** ""

List of number of *channels* for transformation, followed by transformation type of each channel of data. Each value is space or comma separated.

#### Hint

- *channels* are enabled by default, unless otherwise indicated by channelsEnabled field.

### MFBool [in, out] **channelsEnabled** [ ]

Boolean values for each channel indicating whether enabled.

### SFString [in, out] **joints** ""

*joints* field lists names of *joints* that raw motion data is to be applied to. The number and order of the names in the *joints* field shall match the number and order of the channels field information, and the number and order of the sets of values in the values field for each frame of the animation.

#### Hints

- Values are space or comma separated.
- The joint name IGNORED shall be used for channel of motion data that is not used for any joint.

### SFInt32 [in, out] **loa** -1 <small>[-1,4]</small>

Level Of Articulation 0..4 indicates complexity and detail of joints for given humanoid skeletal hierarchy.

#### Hints

- *loa* value of -1 indicates that no LOA conformance is provided.
- [Humanoid Animation (HAnim) Specification, Part 1 Architecture, 4.8.4 Levels of articulation](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#LevelsOfArticulation){:target="_blank"}

### SFInt32 [in, out] **startFrame** 0 <small>[0,∞)</small>

*startFrame* indicates initial index of animated frame. Note that *startFrame* can precede, equal or follow endFrame.

#### Hint

- *startFrame* starts at 0 and is no greater than (frameCount - 1).

### SFInt32 [in, out] **endFrame** 0 <small>[0,∞)</small>

*endFrame* indicates final index of animated frame. Note that *endFrame* can precede, equal or follow *endFrame*. The default *endFrame* value is reset to (frameCount - 1) whenever frameCount is changed.

#### Hint

- *endFrame* starts at 0 and is no greater than (frameCount - 1).

### MFFloat [in, out] **values** [ ] <small>(-∞,∞)</small>

*values* field contains all transformation *values*, ordered first by frame, then by joint, and then by transformation Sets of floats in the *values* array matching the order listed in joints and channels fields.

### SFTime [out] **cycleTime**

*cycleTime* sends a time event at initial starting time and at beginning of each new cycle.

#### Hint

- This event is useful for synchronization with other time-based animation objects.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **elapsedTime**

*elapsedTime* is computed elapsed time since the Motion object was activated and running, counting all traversed frames (as if frameIndex equaled 1) and multiplied by frameDuration, cumulative in seconds.

#### Hint

- *elapsedTime* is a nonnegative SFTime duration interval, not an absolute clock time.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFInt32 [out] **frameCount**

Output field *frameCount*.

## External Links

- [X3D Specification of HAnimMotion](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimMotion){:target="_blank"}
