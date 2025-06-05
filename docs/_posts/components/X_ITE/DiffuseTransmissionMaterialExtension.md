---
title: DiffuseTransmissionMaterialExtension
date: 2024-07-30
nav: components-X_ITE
categories: [components, X_ITE]
tags: [DiffuseTransmissionMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

DiffuseTransmissionMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The DiffuseTransmissionMaterialExtension node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + DiffuseTransmissionMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [diffuseTransmission](#fields-diffuseTransmission) | 0  |
| SFString | [in, out] | [diffuseTransmissionTextureMapping](#fields-diffuseTransmissionTextureMapping) | "" |
| SFNode | [in, out] | [diffuseTransmissionTexture](#fields-diffuseTransmissionTexture) | NULL  |
| SFColor | [in, out] | [diffuseTransmissionColor](#fields-diffuseTransmissionColor) | 1 1 1  |
| SFString | [in, out] | [diffuseTransmissionColorTextureMapping](#fields-diffuseTransmissionColorTextureMapping) | "" |
| SFNode | [in, out] | [diffuseTransmissionColorTexture](#fields-diffuseTransmissionColorTexture) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **diffuseTransmission** 0 <small>[0,∞)</small>
{: #fields-diffuseTransmission }

The percentage of reflected, non-specularly reflected light that is transmitted through the surface via the Lambertian diffuse transmission, i.e., the strength of the diffuse transmission effect.

### SFString [in, out] **diffuseTransmissionTextureMapping** ""
{: #fields-diffuseTransmissionTextureMapping }

Input/Output field *diffuseTransmissionTextureMapping*.

### SFNode [in, out] **diffuseTransmissionTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-diffuseTransmissionTexture }

A texture that defines the strength of the diffuse transmission effect, stored in the alpha (A) channel. Will be multiplied by the diffuseTransmissionFactor.

### SFColor [in, out] **diffuseTransmissionColor** 1 1 1 <small>[0,1]</small>
{: #fields-diffuseTransmissionColor }

The color of the transmitted light.

### SFString [in, out] **diffuseTransmissionColorTextureMapping** ""
{: #fields-diffuseTransmissionColorTextureMapping }

Input/Output field *diffuseTransmissionColorTextureMapping*.

### SFNode [in, out] **diffuseTransmissionColorTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-diffuseTransmissionColorTexture }

A texture that defines the color of the transmitted light, stored in the RGB channels and encoded in sRGB. This texture will be multiplied by diffuseTransmissionColorFactor.

## Example

- [View »Diffuse Transmission Teacup« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=DiffuseTransmissionTeacup)

## See Also

- [Khronos glTF Specification of the KHR_materials_diffuse_transmission Extension](https://github.com/DassaultSystemes-Technology/glTF/blob/KHR_materials_translucency/extensions/2.0/Khronos/KHR_materials_diffuse_transmission/README.md)
