---
title: TransmissionMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [TransmissionMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

TransmissionMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The TransmissionMaterialExtension node belongs to the **X_ITE** component and requires at least level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + TransmissionMaterialExtension
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **transmission** 0 <small>[0,∞)</small>

The base percentage of light that is transmitted through the surface.

### SFString [in, out] **transmissionTextureMapping** ""

Input/Output field *transmissionTextureMapping*.

### SFNode [in, out] **transmissionTexture** NULL <small>[X3DSingleTextureNode]</small>

A texture that defines the transmission percentage of the surface, stored in the R channel. This will be multiplied by transmissionFactor.

## Example

- [View »Transmission Test« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=TransmissionTest)

## See Also

- [Khronos glTF Specification of the KHR_materials_transmission Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission)
