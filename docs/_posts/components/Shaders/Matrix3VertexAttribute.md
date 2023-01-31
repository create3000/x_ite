---
title: Matrix3VertexAttribute
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [Matrix3VertexAttribute, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Matrix3VertexAttribute defines a set of per-vertex 3x3 matrix attributes.

The Matrix3VertexAttribute node belongs to the **Shaders** component and its default container field is *attrib.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DVertexAttributeNode
      + Matrix3VertexAttribute
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [ ] **name** ""

Required name for this particular VertexAttribute instance.

#### Warning

Name is not specified if this instance is a USE node.

### MFMatrix3f [in, out] **value** [ ] <small>(-∞,∞)</small>

Value specifies an arbitrary collection of matrix values that will be passed to the shader as per-vertex information.

#### Hint

The length of the value field shall be a multiple of numComponents.

## External Links

- [X3D Specification of Matrix3VertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#Matrix3VertexAttribute){:target="_blank"}
