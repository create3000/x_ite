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

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFColor [in, out] **emissiveColor** 1 1 1 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- emissiveColors glow even when all lights are off.
- Reset diffuseColor from default (0.8 0.8 0.8) to (0 0 0) to avoid washout.
- Only emissiveColor affects IndexedLineSet, LineSet and PointSet.

#### Warning

- Bright emissiveColor values can wash out other colors and some textures.

### SFString [in, out] **emissiveTextureMapping** ""

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>

### SFString [in, out] **normalTextureMapping** ""

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

## External Links

- [X3D Specification of UnlitMaterial](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#UnlitMaterial){:target="_blank"}
