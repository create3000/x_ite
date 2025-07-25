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

IridescenceMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The IridescenceMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + IridescenceMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [iridescence](#fields-iridescence) | 0  |
| SFString | [in, out] | [iridescenceTextureMapping](#fields-iridescenceTextureMapping) | "" |
| SFNode | [in, out] | [iridescenceTexture](#fields-iridescenceTexture) | NULL  |
| SFFloat | [in, out] | [iridescenceIndexOfRefraction](#fields-iridescenceIndexOfRefraction) | 1.3  |
| SFFloat | [in, out] | [iridescenceThicknessMinimum](#fields-iridescenceThicknessMinimum) | 100  |
| SFFloat | [in, out] | [iridescenceThicknessMaximum](#fields-iridescenceThicknessMaximum) | 400  |
| SFString | [in, out] | [iridescenceThicknessTextureMapping](#fields-iridescenceThicknessTextureMapping) | "" |
| SFNode | [in, out] | [iridescenceThicknessTexture](#fields-iridescenceThicknessTexture) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **iridescence** 0 <small>[0,∞)</small>
{: #fields-iridescence }

The iridescence intensity factor.

### SFString [in, out] **iridescenceTextureMapping** ""
{: #fields-iridescenceTextureMapping }

Input/Output field *iridescenceTextureMapping*.

### SFNode [in, out] **iridescenceTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-iridescenceTexture }

The iridescence intensity texture.

### SFFloat [in, out] **iridescenceIndexOfRefraction** 1.3 <small>[1,∞)</small>
{: #fields-iridescenceIndexOfRefraction }

The index of refraction of the dielectric thin-film layer.

### SFFloat [in, out] **iridescenceThicknessMinimum** 100 <small>[0,∞)</small>
{: #fields-iridescenceThicknessMinimum }

The minimum thickness of the thin-film layer given in nanometers.

### SFFloat [in, out] **iridescenceThicknessMaximum** 400 <small>[0,∞)</small>
{: #fields-iridescenceThicknessMaximum }

The maximum thickness of the thin-film layer given in nanometers.

### SFString [in, out] **iridescenceThicknessTextureMapping** ""
{: #fields-iridescenceThicknessTextureMapping }

Input/Output field *iridescenceThicknessTextureMapping*.

### SFNode [in, out] **iridescenceThicknessTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-iridescenceThicknessTexture }

The thickness texture of the thin-film layer.

## Example

- [View »Iridescent Dish With Olives« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=IridescentDishWithOlives)

## See Also

- [Khronos glTF Specification of the KHR_materials_iridescence Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence)
