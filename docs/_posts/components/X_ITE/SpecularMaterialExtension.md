---
title: SpecularMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [SpecularMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

SpecularMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The SpecularMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + SpecularMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [specular](#fields-specular) | 1  |
| SFString | [in, out] | [specularTextureMapping](#fields-specularTextureMapping) | "" |
| SFNode | [in, out] | [specularTexture](#fields-specularTexture) | NULL  |
| SFColor | [in, out] | [specularColor](#fields-specularColor) | 1 1 1  |
| SFString | [in, out] | [specularColorTextureMapping](#fields-specularColorTextureMapping) | "" |
| SFNode | [in, out] | [specularColorTexture](#fields-specularColorTexture) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **specular** 1 <small>[0,∞)</small>
{: #fields-specular }

The strength of the specular reflection.

### SFString [in, out] **specularTextureMapping** ""
{: #fields-specularTextureMapping }

Input/Output field *specularTextureMapping*.

### SFNode [in, out] **specularTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-specularTexture }

 texture that defines the strength of the specular reflection, stored in the alpha (A) channel. This will be multiplied by specularFactor.

### SFColor [in, out] **specularColor** 1 1 1 <small>[0,∞)</small>
{: #fields-specularColor }

The F0 color of the specular reflection (linear RGB).

### SFString [in, out] **specularColorTextureMapping** ""
{: #fields-specularColorTextureMapping }

Input/Output field *specularColorTextureMapping*.

### SFNode [in, out] **specularColorTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-specularColorTexture }

A texture that defines the F0 color of the specular reflection, stored in the RGB channels and encoded in sRGB. This texture will be multiplied by specularColorFactor.

## Example

- [View »Specular Silk Pouf« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=SpecularSilkPouf)

## See Also

- [Khronos glTF Specification of the KHR_materials_specular Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular)
