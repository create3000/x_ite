---
title: HAnimHumanoid
date: 2023-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimHumanoid, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

The HAnimHumanoid node is used to: (a) store references to the joints, segments, sites, skeleton, optional skin, and fixed viewpoints, (b) serve as a container for the entire humanoid, (c) provide a convenient way of moving the humanoid through its environment, and (d) store human-readable metadata such as name, version, author, copyright, age, gender and other information. HAnimHumanoid contains a skeleton consisting of HAnimJoint, HAnimSegment and HAnimSite nodes. HAnimHumanoid can also contain an optional skin consisting of an IndexedFaceSet mesh with corresponding skinCoord Coordinate or CoordinateDouble vertices and skinNormal Normal vectors.

The HAnimHumanoid node belongs to the **HAnim** component and requires at least level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + HAnimHumanoid (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFString [in, out] **version** "2.0"

HAnimHumanoid *version*, where allowed value is 2.0 for final ISO 19774 *version* 2019.

#### Hint

- Default HAnimHumanoid *version* is 1.0 for X3D *version* 3, and HAnimHumanoid required *version* is 2.0 for X3D *version* 4.

#### Warnings

- No other values are allowed for strict validation.
- Prior developmental versions of HAnim nodes, such as *version* 1 of standardized ISO 19774 *version* 2006, might not validate correctly due to small changes in the contained-node content model, so conversion of such models is recommended.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""

Unique *name* attribute must be defined so that each HAnimHumanoid node in a scene can be identified at run time for animation purposes.

#### Hints

- This same *name* is a required *name* prefix for all other HAnim nodes within the HAnimHumanoid, if more than one humanoid appears within a scene file.
- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions){:target="_blank"}
- [HAnim2 Names HAnim1 Alias Tables](https://www.web3d.org/x3d/content/examples/HumanoidAnimation/HAnim2NameHAnim1AliasTables.txt){:target="_blank"}

#### Warning

- *name* field is not included if this instance is a USE node, in order to avoid potential mismatches.

### MFString [in, out] **info** [ ]

Contains metadata keyword=value pairs, where approved keyword terms are humanoidVersion authorName authorEmail copyright creationDate usageRestrictions age gender height and weight.

#### Hints

- Height and weight are in base units (typically meters), hanimVersion is for author use and separate from HAnimHumanoid version field.
- Alternate metadata keywords are also allowed.

### SFString [in, out] **skeletalConfiguration** "BASIC"

Models sharing a common skeletal configuration can share animations and binding poses.

#### Hint

- [A value of 'BASIC' conforms to restrictive skeletal model in X3D Humanoid Animation (HAnim) Specification, Part 1 Architecture, 4.8 Modelling of humanoids](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#ModellingOfHumanoids){:target="_blank"}

### SFInt32 [in, out] **loa** -1 <small>[-1,∞)</small>

Level Of Articulation 0..4 indicates complexity and detail of joints for given humanoid skeletal hierarchy.

#### Hints

- *loa* value of -1 indicates that no LOA conformance is provided.
- [Humanoid Animation (HAnim) Specification, Part 1 Architecture, 4.8.4 Levels of articulation](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#LevelsOfArticulation){:target="_blank"}

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position of children relative to local coordinate system.

#### Hint

- Since default pose faces along +Z axis, -x values are right side and +x values are left side within HAnimHumanoid.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Orientation of children relative to local coordinate system.

#### Warning

- Default pose is typically empty (or an identity *rotation*) to avoid distorted body animations.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z *scale* of child coordinate system, adjusted by center and scaleOrientation.

#### Warning

- HAnimHumanoid *scale* values must be positive.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#X3DBoundedObject

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#X3DBoundedObject

### MFNode [in, out] **skeleton** [ ] <small>[HAnimJoint, HAnimSite]</small>

List of top-level [HAnimJoint](/x_ite/components/hanim/hanimjoint/) and [HAnimSite](/x_ite/components/hanim/hanimsite/) nodes that create the *skeleton* model. The *skeleton* field contains the humanoid_root Joint object, and thus the entire hierarchy of [HAnimJoint](/x_ite/components/hanim/hanimjoint/)/[HAnimSegment](/x_ite/components/hanim/hanimsegment/) nodes making up the articulated *skeleton* model.

#### Hints

- Typically contains [HAnimJoint](/x_ite/components/hanim/hanimjoint/) with name='humanoid_root'.
- Immediate children in the *skeleton* field can also include top-level [HAnimSite](/x_ite/components/hanim/hanimsite/) node declarations, which are landmarks for the overall humanoid figure that are not affected by [HAnimJoint](/x_ite/components/hanim/hanimjoint/) movement.

#### Warning

- Top-level [HAnimJoint](/x_ite/components/hanim/hanimjoint/) and [HAnimSite](/x_ite/components/hanim/hanimsite/) nodes must include `containerField='skeleton'` for proper validation and operation.

### MFNode [in, out] **viewpoints** [ ] <small>[HAnimSite]</small>

List of [HAnimSite](/x_ite/components/hanim/hanimsite/) nodes containing [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes that appear in the skeleton model, usually as USE node references. The *viewpoints* field contains zero or more special [HAnimSite](/x_ite/components/hanim/hanimsite/) nodes that are only affected by HAnimHumanoid transformations (and no [HAnimJoint](/x_ite/components/hanim/hanimjoint/) transformations). Each [HAnimSite](/x_ite/components/hanim/hanimsite/) can contain a [Viewpoint](/x_ite/components/navigation/viewpoint/) as virtual camera in the HAnimHumanoid reference frame (such as viewing the face or profile of the human figure).

#### Hints

- The viewpoint field has different functionality than the joints, segments and sites fields.
- The *viewpoints* field connects internal Site nodes that in turn hold relative [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes, such as `<[HAnimSite](/x_ite/components/hanim/hanimsite/) USE='ObserveFaceSite_view' containerField='viewpoints'/>` which has corresponding counterpart nodes `<[HAnimSite](/x_ite/components/hanim/hanimsite/) DEF='ObserveFaceSite_view' name='ObserveFaceSite_view' containerField='children'>` `<[Viewpoint](/x_ite/components/navigation/viewpoint/) description='look at me!'/>` \</[HAnimSite](/x_ite/components/hanim/hanimsite/)\>.

#### Warnings

- These are actual node declarations, not USE nodes.
- Top-level [HAnimSite](/x_ite/components/hanim/hanimsite/) nodes (in turn containing [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes) must include `containerField='viewpoints'` for proper validation and operation.

### MFNode [in, out] **sites** [ ] <small>[HAnimSite]</small>

*sites* field contains a list of USE references for all [HAnimSite](/x_ite/components/hanim/hanimsite/) node instances found within the preceding skeleton hierarchy.

#### Hints

- Order is irrelevant since names are contained in the original DEF objects.
- These USE nodes can be utilized by inverse kinematics (IK) and animation engines.

#### Warnings

- The number of contained `<[HAnimSite](/x_ite/components/hanim/hanimsite/) USE='*' containerField='sites, skeleton or viewpoints'/>` nodes at top level of HAnimHumanoid needs to match the number of corresponding [HAnimSite](/x_ite/components/hanim/hanimsite/) node instances found within the preceding skeleton hierarchy.
- Top-level [HAnimSite](/x_ite/components/hanim/hanimsite/) USE nodes must include `containerField='sites'` for proper validation and operation.

### MFNode [in, out] **segments** [ ] <small>[HAnimSegment]</small>

The *segments* field contains a list of USE references for all [HAnimSegment](/x_ite/components/hanim/hanimsegment/) node instances found within the preceding skeleton hierarchy.

#### Hints

- Order is irrelevant since names are contained in the original DEF objects.
- These USE nodes can be utilized by inverse kinematics (IK) and animation engines.

#### Warnings

- The number of contained `<[HAnimSegment](/x_ite/components/hanim/hanimsegment/) USE='*' containerField='segments'/>` nodes at top level of HAnimHumanoid needs to match the number of corresponding [HAnimSegment](/x_ite/components/hanim/hanimsegment/) node instances found within the preceding skeleton hierarchy.
- Top-level [HAnimSegment](/x_ite/components/hanim/hanimsegment/) USE nodes must include `containerField='segments'` for proper validation and operation.

### MFBool [in, out] **motionsEnabled** [ ]

Array of boolean values corresponding to [HAnimMotion](/x_ite/components/hanim/hanimmotion/) nodes indicating which can animate the HAnimHumanoid.

### MFNode [in, out] **motions** [ ] <small>[HAnimMotion]</small>

Contains any [HAnimMotion](/x_ite/components/hanim/hanimmotion/) nodes that can animate the HAnimHumanoid.

### MFVec3f [in, out] **jointBindingPositions** [ ] <small>(-∞,∞)</small>

Specifies an array of position values for each [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node in the joints field, in order, corresponding to each binding pose.

#### Hint

- If only one value is provided, it is provided to each Joint equivalently.

#### Warning

- Not used when skeletalConfiguration='BASIC'.

### MFRotation [in, out] **jointBindingRotations** [ ] <small>(-∞,∞) or [-1,1]</small>

Specifies an array of rotation values for each [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node in the joints field, in order, corresponding to each binding pose.

#### Hint

- If only one value is provided, it is provided to each Joint equivalently.

#### Warning

- Not used when skeletalConfiguration='BASIC'.

### MFVec3f [in, out] **jointBindingScales** [ ] <small>(-∞,∞)</small>

Specifies an array of scale values for each [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node in the joints field, in order, corresponding to each binding pose.

#### Hint

- If only one value is provided, it is provided to each Joint equivalently.

#### Warning

- Not used when skeletalConfiguration='BASIC'.

### MFNode [in, out] **joints** [ ] <small>[HAnimJoint]</small>

The *joints* field contains a list of USE references for all [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node instances found within the preceding skeleton hierarchy.

#### Hints

- Order is irrelevant since names are contained in the original DEF objects.
- These USE nodes can be utilized by inverse kinematics (IK) and animation engines.

#### Warnings

- The number of contained `<[HAnimJoint](/x_ite/components/hanim/hanimjoint/) USE='*' containerField='joints'/>` nodes at top level of HAnimHumanoid needs to match the number of corresponding [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node instances found within the preceding skeleton hierarchy.
- Top-level [HAnimJoint](/x_ite/components/hanim/hanimjoint/) USE nodes must include `containerField='joints'` for proper validation and operation.

### SFNode [in, out] **skinBindingNormals** NULL <small>[X3DNormalNode]</small>

Array of [Normal](/x_ite/components/rendering/normal/) nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.

#### Warnings

- Index values for HAnimHumanoid skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.
- Top-level [Normal](/x_ite/components/rendering/normal/) nodes must include `containerField='skinBindingNormals'` for proper validation and operation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='2'/>`
- For X3D3 HAnim1, spelling of component name is 'H-Anim' (including hyphen).
- Not used when skeletalConfiguration='BASIC'.

### SFNode [in, out] **skinBindingCoords** NULL <small>[X3DCoordinateNode]</small>

Array of [Coordinate](/x_ite/components/rendering/coordinate/) nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.

#### Hint

- A single node is used so that coordIndex references are consistent for all references to these coordinates.

#### Warnings

- Index values for HAnimHumanoid skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.
- Top-level [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) nodes must include `containerField='skinBindingCoords'` for proper validation and operation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='2'/>`
- For X3D3 HAnim1, spelling of component name is 'H-Anim' (including hyphen).
- Not used when skeletalConfiguration='BASIC'.

### SFNode [in, out] **skinNormal** NULL <small>[X3DNormalNode]</small>

Single [Normal](/x_ite/components/rendering/normal/) node utilized by indexed mesh definitions for skin. The *skinNormal* field contains a single sequence of normal values, used by internal HAnimHumanoid mechanisms to create appropriate surface deformations as well as by the indexed face set definitions within the skin field that perform the actual rendering of surface geometry.

#### Warnings

- Index values for HAnimHumanoid skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and *skinNormal* nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.
- Top-level [Normal](/x_ite/components/rendering/normal/) node must include `containerField='skinNormal'` for proper validation and operation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='2'/>`
- For X3D3 HAnim1, spelling of component name is 'H-Anim' (including hyphen).

### SFNode [in, out] **skinCoord** NULL <small>[X3DCoordinateNode]</small>

[Coordinate](/x_ite/components/rendering/coordinate/) node utilized by indexed mesh definitions for skin. The *skinCoord* field contains a single sequence of points, used by internal HAnimHumanoid mechanisms to create appropriate surface deformations as well as by the indexed face set definitions within the skin field that perform the actual rendering of surface geometry.

#### Hint

- A single node is used so that coordIndex references are consistent for all references to these coordinates.

#### Warnings

- Index values for HAnimHumanoid skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), *skinCoord* and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.
- Top-level [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node must include `containerField='skinCoord'` for proper validation and operation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='2'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen)

### MFNode [in, out] **skin** [ ] <small>[X3DChildNode]</small>

List of one or more indexed mesh definitions (such as [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/)) that utilize skinCoord point and skinNormal normal data.

#### Hint

- Put *skin* node first and provide DEF label to simplify USE node usage within the skeleton hierarchy.

#### Warnings

- Index values for HAnimHumanoid *skin* [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper *skin* animation.
- Top-level node must include `containerField='skin'` for proper validation and operation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='2'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen)

## Advice

### Hints

- MFNode arrays for the joints, segments, sites, and viewpoints fields provide lists for all HAnim nodes found in the skeleton hierarchy and thus only contain USE node references.
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774/V2.0){:target="_blank"}
- [HAnim Specification part 1, Humanoid](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/ObjectInterfaces.html#Humanoid){:target="_blank"}
- [HAnim Specification part 2, clause 6.4 Extended definition of Humanoid object](https://www.web3d.org/documents/specifications/19774/V2.0/MotionDataAnimation/MotionNodes.html#HumanoidObjectExtension){:target="_blank"}
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/HumanoidAnimation.pdf){:target="_blank"}

### Warnings

- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='1'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen)

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/HAnimHumanoid.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/HAnimHumanoid.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/HAnimHumanoid.x3d)
{: .example-links }

## See Also

- [X3D Specification of HAnimHumanoid Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimHumanoid){:target="_blank"}
