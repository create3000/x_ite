---
title: UnlitMaterial
date: 2023-01-31
nav: components-Shape
categories: [components, Shape]
tags: [UnlitMaterial, Shape]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

UnlitMaterial ...

The UnlitMaterial node belongs to the **Shape** component and its default container field is *material.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + X3DOneSidedMaterialNode
        + UnlitMaterial
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFColor [in, out] **emissiveColor** 1 1 1 <small>[0,1]</small>

### SFString [in, out] **emissiveTextureMapping** ""

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>

### SFString [in, out] **normalTextureMapping** ""

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

## External Links

- [X3D Specification of UnlitMaterial](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#UnlitMaterial){:target="_blank"}
