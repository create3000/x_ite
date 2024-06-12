---
title: IridescenceMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [IridescenceMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

IridescenceMaterialExtension.

The IridescenceMaterialExtension node belongs to the **X_ITE** component and requires at least level **1,** its default container field is *material.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + IridescenceMaterialExtension
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFFloat [in, out] **iridescence**

Input/Output field *iridescence*.

### SFString [in, out] **iridescenceTextureMapping**

Input/Output field *iridescenceTextureMapping*.

### SFNode [in, out] **iridescenceTexture**

Input/Output field *iridescenceTexture*.

### SFFloat [in, out] **iridescenceIndexOfRefraction**

Input/Output field *iridescenceIndexOfRefraction*.

### SFFloat [in, out] **iridescenceThicknessMinimum**

Input/Output field *iridescenceThicknessMinimum*.

### SFFloat [in, out] **iridescenceThicknessMaximum**

Input/Output field *iridescenceThicknessMaximum*.

### SFString [in, out] **iridescenceThicknessTextureMapping**

Input/Output field *iridescenceThicknessTextureMapping*.

### SFNode [in, out] **iridescenceThicknessTexture**

Input/Output field *iridescenceThicknessTexture*.

## See Also
