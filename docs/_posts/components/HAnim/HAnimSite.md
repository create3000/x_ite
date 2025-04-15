---
title: HAnimSite
date: 2023-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimSite, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

An HAnimSite node serves three purposes: (a) define an "end effector" location which can be used by an inverse kinematics system, (b) define an attachment point for accessories such as jewelry and clothing, and (c) define a location for a Viewpoint virtual camera in the reference frame of an HAnimSegment (such as a view "through the eyes" of the humanoid for use in multi-user worlds).

The HAnimSite node belongs to the **HAnim** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + HAnimSite
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""

Unique *name* attribute must be defined so that HAnimSite node can be identified at run time for animation purposes.

#### Hints

- HAnimSite names are typically based on feature point names, though other author-defined names are also allowed.
- Https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/FeaturePoints.html
- HAnimSite nodes used as end effectors have '_tip' suffix appended to the *name*.
- HAnimSite nodes containing a [Viewpoint](/x_ite/components/navigation/viewpoint/) location have '_view' suffix appended to the *name*.
- HAnimSite nodes serving other purposes have '_pt' suffix appended to the *name*.
- Additional example *name* bases (such as cervicale l_infraorbitale supramenton etc.) are listed in HAnim Specification.
- [HAnim Specification part 1, LOA-3 default Site object translations](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/BodyDimensionsAndLOAs.html#LOA3DefaultSiteTranslations)
- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions)
- [HAnim2 Names HAnim1 Alias Tables](https://www.web3d.org/x3d/content/examples/HumanoidAnimation/HAnim2NameHAnim1AliasTables.txt)
- Candidate names found in the HAnim Specification are skull_vertex, glabella, sellion, l_infraorbitale, l_tragion, l_gonion, r_infraorbitale, r_tragion, r_gonion, supramenton, cervicale, adams_apple, suprasternale, substernale, l_clavicle, l_acromion, l_axilla_proximal, l_axilla_distal, l_axilla_posterior_folds, r_clavicle, r_acromion, r_axilla_proximal, r_axilla_distal, r_axilla_posterior_folds, spine_1_middle_back, spine_2_lower_back, waist_preferred_anterior, waist_preferred_posterior, l_rib10, l_thelion, r_rib10, r_thelion, l_asis, l_iliocristale, l_psis, r_asis, r_iliocristale, r_psis, crotch, l_femoral_lateral_epicondyle, l_femoral_medial_epicondyle, l_suprapatella, l_trochanterion, r_femoral_lateral_epicondyle, r_femoral_medial_epicondyle, r_suprapatella, r_trochanterion, l_tibiale, l_medial_malleolus, l_lateral_malleolus, l_sphyrion, r_tibiale, r_medial_malleolus, r_lateral_malleolus, r_sphyrion, l_metatarsal_phalanx_1, l_metatarsal_phalanx_5, l_dactylion, l_calcaneus_posterior, r_metatarsal_phalanx_1, r_metatarsal_phalanx_5, r_dactylion, r_calcaneus_posterior, l_humeral_lateral_epicondyle, l_humeral_medial_epicondyle, l_olecranon, r_humeral_lateral_epicondyle, r_humeral_medial_epicondyle, r_olecranon, l_radiale, l_ulnar_styloid, l_radial_styloid, r_radiale, r_ulnar_styloid, r_radial_styloid, l_metacarpal_phalanx_2, l_metacarpal_phalanx_3, l_metacarpal_phalanx_5, r_metacarpal_phalanx_2, r_metacarpal_phalanx_3, r_metacarpal_phalanx_5, nuchale, l_neck_base, r_neck_base, navel, l_ectocanthus, r_ectocanthus, menton, mesosternale, opisthocranion, l_knee_crease, r_knee_crease, rear_center_midsagittal_plane, buttocks_standing_wall_contact_point, l_chest_midsagittal_plane, r_chest_midsagittal_plane, l_bideltoid, r_bideltoid, l_carpal_distal_phalanx_1, l_carpal_distal_phalanx_2, l_carpal_distal_phalanx_3, l_carpal_distal_phalanx_4, l_carpal_distal_phalanx_5, r_carpal_distal_phalanx_1, r_carpal_distal_phalanx_2, r_carpal_distal_phalanx_3, r_carpal_distal_phalanx_4, r_carpal_distal_phalanx_5, l_tarsal_distal_phalanx_1, l_tarsal_distal_phalanx_2, l_tarsal_distal_phalanx_3, l_tarsal_distal_phalanx_4, l_tarsal_distal_phalanx_5, r_tarsal_distal_phalanx_1, r_tarsal_distal_phalanx_2, r_tarsal_distal_phalanx_3, r_tarsal_distal_phalanx_4, r_tarsal_distal_phalanx_5

#### Warnings

- *name* prefix must match ancestor [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) *name* followed by underscore character, if more than one humanoid appears within a scene file. For example, 'Nancy_' prepended before location *name*.
- *name* field is not included if this instance is a USE node, in order to avoid potential mismatches.
- HAnimSite *name* must end in '_tip' or '_view' or '_pt' suffix.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position of children relative to local coordinate system.

#### Hints

- Since default pose faces along +Z axis, -x values are right side and +x values are left side within [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/).
- Center field indicates default origin relative to overall humanoid body and is rarely modified. For HAnimSite animation, ROUTE position-change events to *translation* field instead.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Orientation of children relative to local coordinate system.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z *scale* of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Default location of this HAnimSite, i.e. offset of *center* from origin of local coordinate system.

#### Hint

- *center* field indicates default origin relative to overall humanoid body and is rarely modified. For HAnimSite animation, ROUTE position-change events to translation field instead.

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
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addChildren**

Input field *addChildren*.

### MFNode [in] **removeChildren**

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- HAnimSite nodes are stored as children of an [HAnimSegment](/x_ite/components/hanim/hanimsegment/) node.
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774/V2.0)
- [HAnim Specification part 1, Site](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/ObjectInterfaces.html#Site)
- [HAnim Specification part 1, Annex B, Feature points for the human body](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/FeaturePoints.html)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/HumanoidAnimation.pdf)
- [HAnim2 default values for Joint and Site (feature point) nodes](https://www.web3d.org/x3d/content/examples/HumanoidAnimation/HAnim2DefaultValuesJointsFeaturePoints.txt)

### Warnings

- Ensure that visible HAnimSite locations are not inadvertently obscured by skin animation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='1'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen).
- The number of contained \<HAnimSite USE='*' `containerField='sites,` skeleton or viewpoints'/\> nodes at top level of [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) needs to match the number of corresponding HAnimSite node instances found within the preceding skeleton hierarchy.

## See Also

- [X3D Specification of HAnimSite Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimSite)
