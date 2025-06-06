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

The VolumeScatterMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

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
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFColor | [in, out] | [multiscatterColor](#fields-multiscatterColor) | 0 0 0  |
| SFFloat | [in, out] | [scatterAnisotropy](#fields-scatterAnisotropy) | 0  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColor [in, out] **multiscatterColor** 0 0 0 <small>[0,1]</small>
{: #fields-multiscatterColor }

The multi-scatter albedo.

### SFFloat [in, out] **scatterAnisotropy** 0 <small>(-1,1)</small>
{: #fields-scatterAnisotropy }

The anisotropy of scatter events. Range is (-1, 1).

## Example

- [View »Scattering Skull« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=ScatteringSkull)

## See Also

- [Khronos glTF Specification of the KHR_materials_volume_scatter Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume_scatter)
- [Dassault Systemes glTF Specification of the KHR_materials_volume_scatter Extension](https://github.com/DassaultSystemes-Technology/glTF/tree/KHR_materials_volume_scatter/extensions/2.0/Khronos/KHR_materials_volume_scatter)
