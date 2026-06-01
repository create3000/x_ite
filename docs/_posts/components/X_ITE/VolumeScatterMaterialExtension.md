---
title: VolumeScatterMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [VolumeScatterMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

VolumeScatterMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The VolumeScatterMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available in X_ITE.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + VolumeScatterMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| SFFloat | [in, out] | [scatterStrength](#fields-scatterStrength) | 0 |
| SFString | [in, out] | [scatterStrengthTextureMapping](#fields-scatterStrengthTextureMapping) | "" |
| SFNode | [in, out] | [scatterStrengthTexture](#fields-scatterStrengthTexture) | NULL |
| SFFloat | [in, out] | [scatterAnisotropy](#fields-scatterAnisotropy) | 0 |
| SFColor | [in, out] | [multiscatterColor](#fields-multiscatterColor) | 0 0 0 |
| SFString | [in, out] | [multiscatterColorTextureMapping](#fields-multiscatterColorTextureMapping) | "" |
| SFNode | [in, out] | [multiscatterColorTexture](#fields-multiscatterColorTexture) | NULL |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **scatterStrength** 0 <small>[0,1]</small>
{: #fields-scatterStrength }

The strength of the scattering effect. Range is [0, 1]. At 0, scattering is disabled; at 1, scattering is fully applied.

### SFString [in, out] **scatterStrengthTextureMapping** ""
{: #fields-scatterStrengthTextureMapping }

Input/Output field *scatterStrengthTextureMapping*.

### SFNode [in, out] **scatterStrengthTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-scatterStrengthTexture }

A texture that defines the per-texel scatter strength, stored in the alpha (A) channel. Will be multiplied by *scatterStrength*.

### SFFloat [in, out] **scatterAnisotropy** 0 <small>[-1,1]</small>
{: #fields-scatterAnisotropy }

The anisotropy of scatter events. Range is [-1, 1]. Positive values represent forward scattering; negative values represent backward scattering.

### SFColor [in, out] **multiscatterColor** 0 0 0 <small>[0,1]</small>
{: #fields-multiscatterColor }

The multi-scatter color. In volumetric mode, this is the multi-scatter albedo. In thin-walled mode, this is a surface tint applied to transmitted light.

### SFString [in, out] **multiscatterColorTextureMapping** ""
{: #fields-multiscatterColorTextureMapping }

Input/Output field *multiscatterColorTextureMapping*.

### SFNode [in, out] **multiscatterColorTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-multiscatterColorTexture }

A texture that defines the multi-scatter color, stored in the RGB channels and encoded in sRGB. This will be multiplied by the *multiscatterColor*.

## Example

- [View »Scattering Skull« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=ScatteringSkull)

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_materials_volume_scatter Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume_scatter)
- [Dassault Systemes glTF Specification of the KHR_materials_volume_scatter Extension](https://github.com/DassaultSystemes-Technology/glTF/tree/KHR_materials_volume_scatter/extensions/2.0/Khronos/KHR_materials_volume_scatter)
