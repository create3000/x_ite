---
title: FloatVertexAttribute
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [FloatVertexAttribute, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

FloatVertexAttribute defines a set of per-vertex single-precision floating-point attributes.

The FloatVertexAttribute node belongs to the **Shaders** component and its default container field is *attrib.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DVertexAttributeNode
      + FloatVertexAttribute
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [ ] **name** ""

Required *name* for this particular VertexAttribute instance.

#### Hints

- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions){:target="_blank"}

#### Warning

- *name* is not specified if this instance is a USE node.

### SFInt32 [ ] **numComponents** 4 <small>[1..4]</small>

*numComponents* pecifies how many consecutive floating-point values should be grouped together per vertex.

#### Hint

- The length of the value field shall be a multiple of *numComponents*.

### MFFloat [in, out] **value** [ ] <small>(-∞,∞)</small>

*value* specifies an arbitrary collection of floating-point values that will be passed to the shader as per-vertex information.

#### Hint

- The length of the *value* field shall be a multiple of numComponents.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/FloatVertexAttribute.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of FloatVertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#FloatVertexAttribute){:target="_blank"}
