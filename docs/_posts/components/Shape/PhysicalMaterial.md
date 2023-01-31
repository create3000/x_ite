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

### SFNode [in, out] **metadata** <small></small>

### SFColor [in, out] **baseColor** <small></small>

### SFString [in, out] **baseTextureMapping** <small></small>

### SFNode [in, out] **baseTexture** <small></small>

### SFColor [in, out] **emissiveColor** <small></small>

### SFString [in, out] **emissiveTextureMapping** <small></small>

### SFNode [in, out] **emissiveTexture** <small></small>

### SFFloat [in, out] **metallic** <small></small>

### SFFloat [in, out] **roughness** <small></small>

### SFString [in, out] **metallicRoughnessTextureMapping** <small></small>

### SFNode [in, out] **metallicRoughnessTexture** <small></small>

### SFFloat [in, out] **occlusionStrength** <small></small>

### SFString [in, out] **occlusionTextureMapping** <small></small>

### SFNode [in, out] **occlusionTexture** <small></small>

### SFFloat [in, out] **normalScale** <small></small>

### SFString [in, out] **normalTextureMapping** <small></small>

### SFNode [in, out] **normalTexture** <small></small>

### SFFloat [in, out] **transparency** <small></small>

## External Links

- [X3D Specification of PhysicalMaterial](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#PhysicalMaterial){:target="_blank"}
