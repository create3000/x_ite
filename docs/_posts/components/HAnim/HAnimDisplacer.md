---
title: HAnimDisplacer
date: 2023-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimDisplacer, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

HAnimDisplacer nodes alter the shape of coordinate-based geometry within parent HAnimJoint or HAnimSegment nodes. Displacer effects are scaled by the corresponding weight field.

The HAnimDisplacer node belongs to the **HAnim** component and requires at least level **1,** its default container field is *displacers.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + HAnimDisplacer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""

Unique *name* attribute must be defined so that HAnimDisplacer node can be identified at run time for animation purposes.

#### Hints

- HAnimDisplacer names are based on feature point names.
- Https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/FeaturePoints.html
- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions)
- [HAnim2 Names HAnim1 Alias Tables](https://www.web3d.org/x3d/content/examples/HumanoidAnimation/HAnim2NameHAnim1AliasTables.txt)

#### Warnings

- Allowed *name* suffixes include _feature, _action and _config.
- *name* prefix must match ancestor [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) *name* followed by underscore character, if more than one humanoid appears within a scene file. For example, 'Nancy_' prepended before location *name*.
- *name* field is not included if this instance is a USE node, in order to avoid potential mismatches.

### SFFloat [in, out] **weight** 0 <small>(-∞,∞)</small>

The weigh factor has typical range [0,1] and defines the scale factor applied to displacement values before adding them to neutral vertex positions.

#### Hint

- Apply a non-zero *weight* factor to see the effect of HAnimDisplacer displacements.

### MFInt32 [in, out] **coordIndex** [ ] <small>[0,∞) or -1</small>

Defines index values into the parent [HAnimSegment](/x_ite/components/hanim/hanimsegment/) or HAnimBody/[HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) coordinate array for the mesh of vertices affected by this HAnimDisplacer. Values start at index 0.

#### Warning

- -1 sentinel values are not allowed.

### MFVec3f [in, out] **displacements** [ ]

*displacements* are a set of SFVec3f values added to neutral/resting position of each of the corresponding [HAnimSegment](/x_ite/components/hanim/hanimsegment/) vertices (or [HAnimJoint](/x_ite/components/hanim/hanimjoint/)/[HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) vertices) referenced by coordIndex field.

#### Hints

- Individual displacement values are scaled by the weight factor, if present.
- Since default pose faces along +Z axis, -x values are right side and +x values are left side within [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/).

## Advice

### Hints

- HAnimDisplacer can be used in three different ways: (a) identify vertices corresponding to a particular feature in a parent [HAnimSegment](/x_ite/components/hanim/hanimsegment/) node, (b) represent a particular muscular action for a parent [HAnimJoint](/x_ite/components/hanim/hanimjoint/) node by displacing corresponding [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) skin vertices in various directions (linearly or radially), or (c) represent a complete configuration of coordinate vertices in parent [HAnimSegment](/x_ite/components/hanim/hanimsegment/) or [HAnimJoint](/x_ite/components/hanim/hanimjoint/) nodes. Example: in the case of a face, there might be a separate HAnimDisplacer node for each facial expression.
- Multiple HAnimDisplacer nodes must appear consecutively inside parent [HAnimSegment](/x_ite/components/hanim/hanimsegment/) for proper content validation in XML encoding.
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774/V2.0)
- [HAnim Specification part 1, Displacer](https://www.web3d.org/documents/specifications/19774/V2.0/Architecture/ObjectInterfaces.html#Displacer)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/HumanoidAnimation.pdf)

### Warnings

- Allowed name suffixes include _feature, _action and _config.
- Index values for [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) skin [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), skinCoord and skinNormal nodes must all be consistently defined together with [HAnimJoint](/x_ite/components/hanim/hanimjoint/) [HAnimSegment](/x_ite/components/hanim/hanimsegment/) and HAnimDisplacer nodes for proper skin animation.
- Requires X3D `profile='Full'` or else include `<component name='HAnim' level='1'/>`
- For X3D3 HAnim1, previous spelling of component name was 'H-Anim' (including hyphen).

## See Also

- [X3D Specification of HAnimDisplacer Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimDisplacer)
