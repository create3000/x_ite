---
title: CADFace
date: 2022-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [CADFace, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CADFace holds geometry representing one face in a Computer-Aided Design (CAD) CADPart. CADFace can only contain a single Shape or LOD node (with containerField='shape').

The CADFace node belongs to the **CADGeometry** component and its container field is *children.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DProductStructureChildNode
      + CADFace (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **name** ""

Optional name for this particular CAD node.

#### Warning

Name is not included if this instance is a USE node.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0, ∞) or -1 -1 -1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞, ∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFNode [in, out] **shape** NULL <small>[X3DShapeNode, LOD, Transform]</small>

Input/Output field shape.

## Description

### Hints

- Only zero or one Shape child can be active at one time.
- Include `<component name='CADGeometry' level='2'/>`

## External Links

- [X3D Specification of CADFace](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#CADFace){:target="_blank"}
