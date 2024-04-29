---
title: InstancedShape
date: 2023-01-07
nav: components-X_ITE
categories: [components, X_ITE]
tags: [InstancedShape, X_ITE]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

InstancedShape can appear under any grouping node. InstancedShape can contain an Appearance node and a geometry node (for example one of the primitives Box Cone Cylinder Sphere Text, one of ElevationGrid Extrusion IndexedFaceSet IndexedLineSet LineSet PointSet, or one of the other geometry nodes) and this geometry node is instantiated as often as transformations are provided.

The InstancedShape node belongs to the **X_ITE** component and its default container field is *children.* It is available in X_ITE.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DShapeNode
      + InstancedShape
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3f [in, out] **translations** [ ] <small>(-∞,∞)</small>

List of translations, one for each instance.

#### Hint

- If only one value is provided, it is provided to each instance equivalently.

### MFRotation [in, out] **rotations** [ ] <small>(-∞,∞) or [-1,1]</small>

List of rotations, one for each instance.

#### Hint

- If only one value is provided, it is provided to each instance equivalently.

### MFVec3f [in, out] **scales** [ ] <small>(-∞,∞)</small>

List of scales, one for each instance.

#### Hint

- If only one value is provided, it is provided to each instance equivalently.

### SFBool [in, out] **pointerEvents** TRUE <small class="yellow">non standard</small>

*pointerEvents* defines whether this Shape becomes target for pointer events.

### SFBool [in, out] **castShadow** TRUE

*castShadow* defines whether this Shape casts shadows as produced by lighting nodes.

#### Hints

- If the visible field is FALSE, then the Shape does not cast any shadows.
- If prior X3D3 content is loaded into an X3D4 model, then legacy Shape nodes have shadows set to true.

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
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/grouping.html#BoundingBoxes){:target="_blank"}
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/grouping.html#X3DBoundedObject){:target="_blank"}

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/grouping.html#BoundingBoxes){:target="_blank"}
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/grouping.html#X3DBoundedObject){:target="_blank"}

### SFNode [in, out] **appearance** NULL <small>[X3DAppearanceNode]</small>

Single contained [Appearance](/x_ite/components/shape/appearance/) node that can specify visual attributes (such as material, texture, fillProperties and lineProperties) applied to corresponding geometry.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

Single contained *geometry* node that is rendered according to corresponding appearance.

## Advice

### Hints

- [Shape](https://en.wikipedia.org/wiki/Shape){:target="_blank"}
- The Shape design pattern to collect appearance and geometry together is fundamentally the same for many types of 3D graphics software and hardware.
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.
- [X3D Architecture 12.2.1 Shape nodes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/shape.html#Shapenodes){:target="_blank"}
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/lighting.html#Lightingmodel){:target="_blank"}
- Apply `containerField='shape'` if parent node is [CADFace](/x_ite/components/cadgeometry/cadface/).

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/X_ITE/InstancedShape/InstancedShape.x3d" update="auto"></x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/InstancedShape/InstancedShape.zip) · [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/InstancedShape/InstancedShape.x3d)

## See Also

- [X3D Specification of Shape node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"}
