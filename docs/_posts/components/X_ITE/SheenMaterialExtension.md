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

SheenMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The SheenMaterialExtension node belongs to the **X_ITE** component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + SheenMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFColor | \[in, out\] | [sheenColor](#sfcolor-in-out-sheencolor-0-0-0-0-1) | 0 0 0  |
| SFString | \[in, out\] | [sheenColorTextureMapping](#sfstring-in-out-sheencolortexturemapping-) | "" |
| SFNode | \[in, out\] | [sheenColorTexture](#sfnode-in-out-sheencolortexture-null-x3dsingletexturenode) | NULL  |
| SFFloat | \[in, out\] | [sheenRoughness](#sffloat-in-out-sheenroughness-0-0) | 0  |
| SFString | \[in, out\] | [sheenRoughnessTextureMapping](#sfstring-in-out-sheenroughnesstexturemapping-) | "" |
| SFNode | \[in, out\] | [sheenRoughnessTexture](#sfnode-in-out-sheenroughnesstexture-null-x3dsingletexturenode) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColor [in, out] **sheenColor** 0 0 0 <small>[0,1]</small>

The sheen color in linear space.

### SFString [in, out] **sheenColorTextureMapping** ""

Input/Output field *sheenColorTextureMapping*.

### SFNode [in, out] **sheenColorTexture** NULL <small>[X3DSingleTextureNode]</small>

The sheen color (RGB). The sheen color is in sRGB transfer function.

### SFFloat [in, out] **sheenRoughness** 0 <small>[0,∞)</small>

The sheen roughness.

### SFString [in, out] **sheenRoughnessTextureMapping** ""

Input/Output field *sheenRoughnessTextureMapping*.

### SFNode [in, out] **sheenRoughnessTexture** NULL <small>[X3DSingleTextureNode]</small>

The sheen roughness (Alpha) texture.

## Example

- [View »Sheen Cloth« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=SheenCloth)

## See Also

- [Khronos glTF Specification of the KHR_materials_sheen Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen)
