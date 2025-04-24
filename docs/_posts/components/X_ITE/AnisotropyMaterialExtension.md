---
title: AnisotropyMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [AnisotropyMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

AnisotropyMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The AnisotropyMaterialExtension node belongs to the **X_ITE** component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + AnisotropyMaterialExtension
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFFloat \[in, out\] [anisotropyStrength](#sffloat-in-out-anisotropystrength-0-0)
- SFFloat \[in, out\] [anisotropyRotation](#sffloat-in-out-anisotropyrotation-0--)
- SFString \[in, out\] [anisotropyTextureMapping](#sfstring-in-out-anisotropytexturemapping-)
- SFNode \[in, out\] [anisotropyTexture](#sfnode-in-out-anisotropytexture-null-x3dsingletexturenode)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **anisotropyStrength** 0 <small>[0,∞)</small>

The anisotropy strength. When the anisotropy texture is present, this value is multiplied by the texture's blue channel.

### SFFloat [in, out] **anisotropyRotation** 0 <small>(-∞,∞)</small>

The rotation of the anisotropy in tangent, bitangent space, measured in radians counter-clockwise from the tangent. When the anisotropy texture is present, this value provides additional rotation to the vectors in the texture.

### SFString [in, out] **anisotropyTextureMapping** ""

Input/Output field *anisotropyTextureMapping*.

### SFNode [in, out] **anisotropyTexture** NULL <small>[X3DSingleTextureNode]</small>

The anisotropy texture. Red and green channels represent the anisotropy direction in tangent, bitangent space to be rotated by the anisotropy rotation. The blue channel contains strength as to be multiplied by the anisotropy strength.

## Example

- [View »Anisotropy Barn Lamp« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=AnisotropyBarnLamp)

## See Also

- [Khronos glTF Specification of the KHR_materials_anisotropy Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy)
