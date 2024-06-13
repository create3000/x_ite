---
title: SheenMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [SheenMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

SheenMaterialExtension.

The SheenMaterialExtension node belongs to the **X_ITE** component and requires at least level **1,** its default container field is *material.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + SheenMaterialExtension
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFColor [in, out] **sheenColor** 0 0 0 <small>[0,1]</small>

Input/Output field *sheenColor*.

### SFString [in, out] **sheenColorTextureMapping** ""

Input/Output field *sheenColorTextureMapping*.

### SFNode [in, out] **sheenColorTexture** NULL <small>[X3DSingleTextureNode]</small>

Input/Output field *sheenColorTexture*.

### SFFloat [in, out] **sheenRoughness** 0 <small>[0,∞)</small>

Input/Output field *sheenRoughness*.

### SFString [in, out] **sheenRoughnessTextureMapping** ""

Input/Output field *sheenRoughnessTextureMapping*.

### SFNode [in, out] **sheenRoughnessTexture** NULL <small>[X3DSingleTextureNode]</small>

Input/Output field *sheenRoughnessTexture*.

## See Also

- [Khronos Specification of KHR_materials_sheen Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen){:target="_blank"}
