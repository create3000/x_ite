---
title: UnlitMaterialExtension
date: 2024-06-19
nav: components-X_ITE
categories: [components, X_ITE]
tags: [UnlitMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

UnlitMaterialExtension is an extension for [PhysicalMaterial](../../shape/physicalmaterial/) node and [SpecularGlossinessMaterial](../specularglossinessmaterial/) node.

The UnlitMaterialExtension node belongs to the **X_ITE** component and requires at least level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + UnlitMaterialExtension
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

## See Also

- [Khronos Specification of KHR_materials_unlit Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit){:target="_blank"}