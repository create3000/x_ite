---
title: HAnimPose
date: 2023-01-31
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimPose, HAnim]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

An HAnimPose node supports...

The HAnimPose node belongs to the [HAnim](/x_ite/components/overview/#hanim) component and requires at least support level **2,** its default container field is *poses.* It is available from X3D version 4.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + HAnimPose
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFString | [in, out] | [name](#fields-name) | "" |
| SFInt32 | [in, out] | [loa](#fields-loa) | -1  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFFloat | [in, out] | [transitionDuration](#fields-transitionDuration) | 0  |
| SFBool | [in] | [resetAllJoints](#fields-resetAllJoints) |  |
| SFBool | [in] | [commencePose](#fields-commencePose) |  |
| SFTime | [in] | [set_startTime](#fields-set_startTime) |  |
| SFFloat | [in] | [set_fraction](#fields-set_fraction) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| MFNode | [in, out] | [poseJoints](#fields-poseJoints) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""
{: #fields-name }

Unique *name* attribute must be defined so that [HAnimMotion](/x_ite/components/hanim/hanimmotion/) node can be identified at run time for animation purposes.

### SFInt32 [in, out] **loa** -1 <small>[-1,4]</small>
{: #fields-loa }

Level Of Articulation 0..4 indicates complexity and detail of joints for given humanoid skeletal hierarchy.

#### Hints

- *loa* value of -1 indicates that no LOA conformance is provided.
- [Humanoid Animation (HAnim) Specification, Part 1 Architecture, 4.8.4 Levels of articulation](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#LevelsOfArticulation)

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFFloat [in, out] **transitionDuration** 0 <small>(0,∞)</small>
{: #fields-transitionDuration }

Input/Output field *transitionDuration*.

### SFBool [in] **resetAllJoints**
{: #fields-resetAllJoints }

Input field *resetAllJoints*.

### SFBool [in] **commencePose**
{: #fields-commencePose }

Input field *commencePose*.

### SFTime [in] **set_startTime**
{: #fields-set_startTime }

Input field *set_startTime*.

### SFFloat [in] **set_fraction**
{: #fields-set_fraction }

Input field *set_fraction*.

### SFBool [out] **isActive**
{: #fields-isActive }

Output field *isActive*.

### MFNode [in, out] **poseJoints** [ ] <small>[HAnimJoint]</small>
{: #fields-poseJoints }

Input/Output field *poseJoints*.

###  [] **resetOtherJoints** FALSE
{: #fields-resetOtherJoints }

Input/Output field *resetOtherJoints*.

## See Also

- [X3D Specification of HAnimPose Node](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Part01/components/hanim.html#HAnimPose)
