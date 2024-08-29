---
title: FloatVertexAttribute
date: 2023-01-07
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

The FloatVertexAttribute node belongs to the **Shaders** component and requires at least level **1,** its default container field is *attrib.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DVertexAttributeNode
      + FloatVertexAttribute
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [ ] **name** ""

Required *name* for this particular VertexAttribute instance.

#### Hints

- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions)

#### Warning

- *name* is not specified if this instance is a USE node.

### SFInt32 [ ] **numComponents** 4 <small>[1..4]</small>

*numComponents* specifies how many consecutive floating-point values should be grouped together per vertex.

#### Hint

- The length of the value field shall be a multiple of *numComponents*.

### MFFloat [in, out] **value** [ ] <small>(-∞,∞)</small>

*value* specifies an arbitrary collection of floating-point values that will be passed to the shader as per-vertex information.

#### Hint

- The length of the *value* field shall be a multiple of numComponents.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/FloatVertexAttribute.x3d" update="auto" xrMovementControl="VIEWER_POSE"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/FloatVertexAttribute.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Shaders/FloatVertexAttribute/FloatVertexAttribute.x3d)
{: .example-links }

## See Also

- [X3D Specification of FloatVertexAttribute Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#FloatVertexAttribute)
