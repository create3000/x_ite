---
title: HAnimSegment
date: 2023-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimSegment, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

HAnimSegment node contains Shape geometry for each body segment, providing a visual representation of the skeleton segment. Parent/child translation and rotation relationships are defined in ancestor/descendant HAnimSegment nodes. HAnimSegment contains Coordinate or CoordinateDouble with `containerField='coord',` HAnimDisplacer with `containerField='displacers'` and Shape or grouping nodes with `containerField='children'.`

The HAnimSegment node belongs to the **HAnim** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + HAnimSegment
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [description](#field-description) | "" |
| SFString | [in, out] | [name](#field-name) | "" |
| SFFloat | [in, out] | [mass](#field-mass) | 0  |
| SFVec3f | [in, out] | [centerOfMass](#field-centerOfMass) | 0 0 0  |
| MFFloat | [in, out] | [momentsOfInertia](#field-momentsOfInertia) | [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] |
| MFNode | [in, out] | [displacers](#field-displacers) | [ ] |
| SFNode | [in, out] | [coord](#field-coord) | NULL  |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| MFNode | [in] | [addChildren](#field-addChildren) |  |
| MFNode | [in] | [removeChildren](#field-removeChildren) |  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #field-description }

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""
{: #field-name }

Unique *name* attribute must be defined so that HAnimSegment node can be identified at run time for animation purposes.

#### Hints

- For arbitrary humanoids, HAnimSegment *name* can describe geometry between parent [HAnimJoint](/x_ite/components/hanim/hanimjoint/) and sibling [HAnimJoint](/x_ite/components/hanim/hanimjoint/) nodes (for example LeftHip_to_LeftKnee).
- [HAnim Specification part 1, Humanoid Joint-Segment Hierarchy](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/concepts.html#Hierarchy)
- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions)
- [HAnim2 Names HAnim1 Alias Tables](https://www.web3d.org/x3d/content/examples/HumanoidAnimation/HAnim2NameHAnim1AliasTables.txt)
- Candidate names found in the HAnim Specification are sacrum, pelvis, l_thigh, l_calf, l_talus, l_navicular, l_cuneiform_1, l_metatarsal_1, l_tarsal_proximal_phalanx_1, l_tarsal_distal_phalanx_1, l_cuneiform_2, l_metatarsal_2, l_tarsal_proximal_phalanx_2, l_tarsal_middle_phalanx_2, l_tarsal_distal_phalanx_2, l_cuneiform_3, l_metatarsal_3, l_tarsal_proximal_phalanx_3, l_tarsal_middle_phalanx_3, l_tarsal_distal_phalanx_3, l_calcaneus, l_cuboid, l_metatarsal_4, l_tarsal_proximal_phalanx_4, l_tarsal_middle_phalanx_4, l_tarsal_distal_phalanx_4, l_metatarsal_5, l_tarsal_proximal_phalanx_5, l_tarsal_middle_phalanx_5, l_tarsal_distal_phalanx_5, r_thigh, r_calf, r_talus, r_navicular, r_cuneiform_1, r_metatarsal_1, r_tarsal_proximal_phalanx_1, r_tarsal_distal_phalanx_1, r_cuneiform_2, r_metatarsal_2, r_tarsal_proximal_phalanx_2, r_tarsal_middle_phalanx_2, r_tarsal_distal_phalanx_2, r_cuneiform_3, r_metatarsal_3, r_tarsal_proximal_phalanx_3, r_tarsal_middle_phalanx_3, r_tarsal_distal_phalanx_3, r_calcaneus, r_cuboid, r_metatarsal_4, r_tarsal_proximal_phalanx_4, r_tarsal_middle_phalanx_4, r_tarsal_distal_phalanx_4, r_metatarsal_5, r_tarsal_proximal_phalanx_5, r_tarsal_middle_phalanx_5, r_tarsal_distal_phalanx_5, l5, l4, l3, l2, l1, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t1, c7, c6, c5, c4, c3, c2, c1, skull, l_eyelid, r_eyelid, l_eyeball, r_eyeball, l_eyebrow, r_eyebrow, jaw, l_clavicle, l_scapula, l_upperarm, l_forearm, l_carpal, l_trapezium, l_metacarpal_1, l_carpal_proximal_phalanx_1, l_carpal_distal_phalanx_1, l_trapezoid, l_metacarpal_2, l_carpal_proximal_phalanx_2, l_carpal_middle_phalanx_2, l_carpal_distal_phalanx_2, l_capitate, l_metacarpal_3, l_carpal_proximal_phalanx_3, l_carpal_middle_phalanx_3, l_carpal_distal_phalanx_3, l_hamate, l_metacarpal_4, l_carpal_proximal_phalanx_4, l_carpal_middle_phalanx_4, l_carpal_distal_phalanx_4, l_metacarpal_5, l_carpal_proximal_phalanx_5, l_carpal_middle_phalanx_5, l_carpal_distal_phalanx_5, r_clavicle, r_scapula, r_upperarm, r_forearm, r_carpal, r_trapezium, r_metacarpal_1, r_carpal_proximal_phalanx_1, r_carpal_distal_phalanx_1, r_trapezoid, r_metacarpal_2, r_carpal_proximal_phalanx_2, r_carpal_middle_phalanx_2, r_carpal_distal_phalanx_2, r_capitate, r_metacarpal_3, r_carpal_proximal_phalanx_3, r_carpal_middle_phalanx_3, r_carpal_distal_phalanx_3, r_hamate, r_metacarpal_4, r_carpal_proximal_phalanx_4, r_carpal_middle_phalanx_4, r_carpal_distal_phalanx_4, r_metacarpal_5, r_carpal_proximal_phalanx_5, r_carpal_middle_phalanx_5, r_carpal_distal_phalanx_5

#### Warnings

- *name* prefix must match ancestor [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) *name* followed by underscore character, if more than one humanoid appears within a scene file. For example, 'Nancy_' prepended before location *name*.
- *name* field is not included if this instance is a USE node, in order to avoid potential mismatches. Examples: sacrum pelvis l_thigh l_calf etc. as listed in HAnim Specification.

### SFFloat [in, out] **mass** 0 <small>[0,∞)</small>
{: #field-mass }

Total *mass* of the segment, 0 if not available, defined in *mass* base units (default is kilograms).

#### Hints

- [Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#Standardunitscoordinates)

### SFVec3f [in, out] **centerOfMass** 0 0 0 <small>(-∞,∞)</small>
{: #field-centerOfMass }

Location within segment of center of mass.

### MFFloat [in, out] **momentsOfInertia** [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] <small>[0,∞)</small>
{: #field-momentsOfInertia }

3x3 moments of inertia matrix. default: 0 0 0 0 0 0 0 0 0.

### MFNode [in, out] **displacers** [ ] <small>[HAnimDisplacer]</small>
{: #field-displacers }

The *displacers* field stores [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) objects for a particular HAnimSegment object.

#### Warning

- Index values for [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) HAnimSegment and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>
{: #field-coord }

The *coord* field is used for HAnimSegment objects that have deformable meshes and shall contain coordinates referenced from the [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) for the paarent HAnimSegment object. The coordinates are given the same name as the HAnim Segment object, but with "_coords" appended to the name (for example, "skull_coords").

#### Warning

- Index values for [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) HAnimSegment and [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/) nodes for proper skin animation.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #field-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #field-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #field-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addChildren**
{: #field-addChildren }

Input field *addChildren*.

### MFNode [in] **removeChildren**
{: #field-removeChildren }

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>
{: #field-children }

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- Place any geometry for parent [HAnimJoint](/x_ite/components/hanim/hanimjoint/) within a child [Transform](/x_ite/components/grouping/transform/) having the same translation value as the parent [HAnimJoint](/x_ite/components/hanim/hanimjoint/) center value.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- HAnimSegment displays geometry between parent [HAnimJoint](/x_ite/components/hanim/hanimjoint/) and sibling [HAnimJoint](/x_ite/components/hanim/hanimjoint/) nodes.
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774/V2.0)
- [HAnim Specification part 1, Segment](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/ObjectInterfaces.html#Segment)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/HumanoidAnimation.pdf)

### Warnings

- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='1'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen).
- The number of contained \<HAnimSegment USE='*' `containerField='segments'/>` nodes at top level of [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) needs to match the number of corresponding [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node instances found within the preceding skeleton hierarchy.

## See Also

- [X3D Specification of HAnimSegment Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimSegment)
