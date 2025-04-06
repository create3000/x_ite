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

An HAnimMotion node supports discrete frame-by-frame playback for HAnim motion data animation. Design characteristics include integration with HAnim figure data and HAnimJoint nodes, animation control, and playback of raw motion data.

The HAnimMotion node belongs to the **HAnim** component and requires at least level **2,** its default container field is *motions.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + HAnimMotion
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""

Unique *name* attribute must be defined so that HAnimMotion node can be identified at run time for animation purposes.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFInt32 [in, out] **loa** -1 <small>[-1,4]</small>

Level Of Articulation 0..4 indicates complexity and detail of joints for given humanoid skeletal hierarchy.

#### Hints

- *loa* value of -1 indicates that no LOA conformance is provided.
- [Humanoid Animation (HAnim) Specification, Part 1 Architecture, 4.8.4 Levels of articulation](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#LevelsOfArticulation)

### SFString [in, out] **joints** ""

*joints* field lists names of *joints* that raw motion data is to be applied to. The number and order of the names in the *joints* field shall match the number and order of the channels field information, and the number and order of the sets of values in the values field for each frame of the animation.

#### Hints

- Values are space or comma separated.
- The joint name IGNORED shall be used for channel of motion data that is not used for any joint.

### MFBool [in, out] **channelsEnabled** [ ]

Boolean values for each channel indicating whether enabled.

### SFString [in, out] **channels** ""

List of number of *channels* for transformation, followed by transformation type of each channel of data. Each value is space or comma separated.

#### Hint

- *channels* are enabled by default, unless otherwise indicated by channelsEnabled field.

### MFFloat [in, out] **values** [ ] <small>(-∞,∞)</small>

*values* field contains all transformation *values*, ordered first by frame, then by joint, and then by transformation Sets of floats in the *values* array matching the order listed in joints and channels fields.

### SFBool [in, out] **loop** FALSE

Repeat indefinitely when *loop*=true, repeat only once when *loop*=false.

### SFBool [in] **next**

Send *next* output value in values array, using/updating various frame values as appropriate.

#### Hint

- This input event will "wrap around" boundary of frame array, i.e. continue from endFrame next to startFrame if necessary.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [in] **previous**

Send *previous* output value in values array, using/updating various frame values as appropriate.

#### Hint

- This input event will "wrap around" boundary of frame array, i.e. continue from startFrame next to endFrame if necessary.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFInt32 [in, out] **frameIndex** 0 <small>[0,∞)</small>

*frameIndex* indicates index of current frame. Note that *frameIndex* can be modified whether the Motion node is enabled or not, and becomes effective when the next animation cycle occurs. Thus the *frameIndex* value indicates the frame currently (or next) being processed.

#### Hint

- *frameIndex* starts at 0 and is no greater than (frameCount - 1). Values less than 0 are reset as 0. Values greater or equal to frameCount are stored as (frameCount - 1). Thus the value of *frameIndex* shall be greater than or equal to zero, and less than frameCount.

### SFTime [in, out] **frameDuration** 0.1 <small>(0,∞)</small>

*frameDuration* specifies the duration of each frame in seconds.

### SFInt32 [in, out] **frameIncrement** 1 <small>(-∞,∞)</small>

*frameIncrement* field controls whether playback direction is forwards or backwards, and also whether frames are skipped (for example, subsampled replay). For a single animation step, the next frameIndex value equals (frameIndex + *frameIncrement*) modulo frameCount.

#### Hint

- Note that setting *frameIncrement* to 0 prevents automatic advancement of frameIndex and pauses animation of HAnimMotion node.

### SFInt32 [in, out] **startFrame** 0 <small>[0,∞)</small>

*startFrame* indicates initial index of animated frame. Note that *startFrame* can precede, equal or follow endFrame.

#### Hint

- *startFrame* starts at 0 and is no greater than (frameCount - 1).

### SFInt32 [in, out] **endFrame** 0 <small>[0,∞)</small>

*endFrame* indicates final index of animated frame. Note that *endFrame* can precede, equal or follow *endFrame*. The default *endFrame* value is reset to (frameCount - 1) whenever frameCount is changed.

#### Hint

- *endFrame* starts at 0 and is no greater than (frameCount - 1).

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

*frameCount* is computed at run time and indicates the total number of frames present in the animation, equaling the number of sets of channel data rows present in the values array.

## Advice

### Hints

- [HAnim Specification](https://www.web3d.org/documents/specifications/19774/V2.0)
- HAnim Specification, clause 6.2 Introduction to Motion objectshttps://www.web3d.org/documents/specifications/19774/V2.0/MotionDataAnimation/MotionNodes.html#IntroductionToMotionNodes
- [HAnim Specification part 2, clause 6.6 Example Usage of Motion object](https://www.web3d.org/documents/specifications/19774/V2.0/MotionDataAnimation/MotionNodes.html#MotionObjectExample)

## See Also

- [X3D Specification of HAnimMotion Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimMotion)
