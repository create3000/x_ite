---
title: HAnimDisplacer
date: 2022-01-07
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

HAnimDisplacer nodes alter the shape of coordinate-based geometry within parent HAnimSegment or parent HAnimBody/HAnimHumanoid nodes. Displacer effects are scaled by the corresponding weight field.

The HAnimDisplacer node belongs to the **HAnim** component and its default container field is *displacers.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + HAnimDisplacer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **name** ""

Unique name attribute must be defined so that HAnimDisplacer node can be identified at run time for animation purposes.

#### Warning

- Name is not included if this instance is a USE node. Examples: sellion r_infraorbitale etc. as listed in HAnim Specification.

#### See Also

- [HAnim Feature Points](https://www.web3d.org/x3d/content/examples/Basic/HumanoidAnimation/tables/HAnimSurfaceFeaturePoints19774V1.0.txt){:target="_blank"}
- [HAnim Specification, Feature points for the human body](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/FeaturePoints.html){:target="_blank"}

### MFInt32 [in, out] **coordIndex** [ ] <small>[0,∞) or -1</small>

Defines index values into the parent HAnimSegment or HAnimBody/HAnimHumanoid coordinate array for the mesh of vertices affected by this HAnimDisplacer. Values start at index 0.

#### Warning

- -1 sentinel values are not allowed.

### SFFloat [in, out] **weight** 0 <small>(-∞,∞)</small>

The weigh factor has typical range [0,1] and defines the scale factor applied to displacement values before adding them to neutral vertex positions.

#### Hint

- Apply a non-zero weight factor to see the effect of HAnimDisplacer displacements.

### MFVec3f [in, out] **displacements** [ ]

*displacements* are a set of SFVec3f values added to neutral/resting position of each of the corresponding HAnimSegment vertices (or HAnimJoint/HAnimHumanoid vertices) referenced by coordIndex field.

#### Hint

- Individual displacement values are scaled by the weight factor, if present.

## Description

### Example

- In the case of a face, there might be a separate HAnimDisplacer node for each facial expression.

### Hints

- HAnimDisplacer can be used in three different ways: (a) identify vertices corresponding to a particular feature in a parent HAnimSegment node, (b) represent a particular muscular action for a parent HAnimJoint node by displacing corresponding HAnimHumanoid skin vertices in various directions (linearly or radially), or (c) represent a complete configuration of coordinate vertices in a parent HAnimSegment node or parent HAnimJoint/HAnimHumanoid nodes.
- Name suffixes include \_feature, \_action and \_config.
- Multiple HAnimDisplacer nodes must appear consecutively inside parent HAnimSegment.
- Include `<component name='HAnim' level='1'/>`

## External Links

- [X3D Specification of HAnimDisplacer](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimDisplacer){:target="_blank"}
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/HAnimArchitecture.html){:target="_blank"}
- [HAnim Specification, Displacer](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/ObjectInterfaces.html#Displacer){:target="_blank"}
- In the case of a face, there might be a separate HAnimDisplacer node for each facial expression.
