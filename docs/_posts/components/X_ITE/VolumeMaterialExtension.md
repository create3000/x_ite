---
title: VolumeMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [VolumeMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

VolumeMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The VolumeMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + VolumeMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [thickness](#fields-thickness) | 0  |
| SFString | [in, out] | [thicknessTextureMapping](#fields-thicknessTextureMapping) | "" |
| SFNode | [in, out] | [thicknessTexture](#fields-thicknessTexture) | NULL  |
| SFFloat | [in, out] | [attenuationDistance](#fields-attenuationDistance) | 1000000  |
| SFColor | [in, out] | [attenuationColor](#fields-attenuationColor) | 1 1 1  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **thickness** 0 <small>[0,∞)</small>
{: #fields-thickness }

The thickness of the volume beneath the surface. The value is given in the coordinate space of the mesh. If the value is 0 the material is thin-walled. Otherwise the material is a volume boundary. The doubleSided property has no effect on volume boundaries.

### SFString [in, out] **thicknessTextureMapping** ""
{: #fields-thicknessTextureMapping }

Input/Output field *thicknessTextureMapping*.

### SFNode [in, out] **thicknessTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-thicknessTexture }

A texture that defines the thickness, stored in the G channel. This will be multiplied by thicknessFactor.

### SFFloat [in, out] **attenuationDistance** 1000000 <small>[0,∞)</small>
{: #fields-attenuationDistance }

Density of the medium given as the average distance that light travels in the medium before interacting with a particle. The value is given in world space.

### SFColor [in, out] **attenuationColor** 1 1 1 <small>[0,1]</small>
{: #fields-attenuationColor }

The color that white light turns into due to absorption when reaching the attenuation distance.

## Example

- [View »Dragon Attenuation« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=DragonAttenuation)

## See Also

- [Khronos glTF Specification of the KHR_materials_volume Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume)
