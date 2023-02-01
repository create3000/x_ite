---
title: PhysicalMaterial
date: 2023-01-31
nav: components-Shape
categories: [components, Shape]
tags: [PhysicalMaterial, Shape]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

PhysicalMaterial ...

The PhysicalMaterial node belongs to the **Shape** component and its default container field is *material.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + X3DOneSidedMaterialNode
        + PhysicalMaterial
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFColor [in, out] **baseColor** 1 1 1 <small>[0,1]</small>

### SFString [in, out] **baseTextureMapping** ""

### SFNode [in, out] **baseTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>

### SFString [in, out] **emissiveTextureMapping** ""

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **metallic** 1 <small>[0,1]</small>

### SFFloat [in, out] **roughness** 1 <small>[0,1]</small>

### SFString [in, out] **metallicRoughnessTextureMapping** ""

### SFNode [in, out] **metallicRoughnessTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **occlusionStrength** 1 <small>[0,1]</small>

### SFString [in, out] **occlusionTextureMapping** ""

### SFNode [in, out] **occlusionTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>

### SFString [in, out] **normalTextureMapping** ""

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

## External Links

- [X3D Specification of PhysicalMaterial](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#PhysicalMaterial){:target="_blank"}
