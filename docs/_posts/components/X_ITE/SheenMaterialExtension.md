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

The SheenMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

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
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFColor | [in, out] | [sheenColor](#fields-sheenColor) | 0 0 0  |
| SFString | [in, out] | [sheenColorTextureMapping](#fields-sheenColorTextureMapping) | "" |
| SFNode | [in, out] | [sheenColorTexture](#fields-sheenColorTexture) | NULL  |
| SFFloat | [in, out] | [sheenRoughness](#fields-sheenRoughness) | 0  |
| SFString | [in, out] | [sheenRoughnessTextureMapping](#fields-sheenRoughnessTextureMapping) | "" |
| SFNode | [in, out] | [sheenRoughnessTexture](#fields-sheenRoughnessTexture) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColor [in, out] **sheenColor** 0 0 0 <small>[0,1]</small>
{: #fields-sheenColor }

The sheen color in linear space.

### SFString [in, out] **sheenColorTextureMapping** ""
{: #fields-sheenColorTextureMapping }

Input/Output field *sheenColorTextureMapping*.

### SFNode [in, out] **sheenColorTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-sheenColorTexture }

The sheen color (RGB). The sheen color is in sRGB transfer function.

### SFFloat [in, out] **sheenRoughness** 0 <small>[0,∞)</small>
{: #fields-sheenRoughness }

The sheen roughness.

### SFString [in, out] **sheenRoughnessTextureMapping** ""
{: #fields-sheenRoughnessTextureMapping }

Input/Output field *sheenRoughnessTextureMapping*.

### SFNode [in, out] **sheenRoughnessTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-sheenRoughnessTexture }

The sheen roughness (Alpha) texture.

## Example

- [View »Sheen Cloth« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=SheenCloth)

## See Also

- [Khronos glTF Specification of the KHR_materials_sheen Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen)
