---
title: ClearcoatMaterialExtension
date: 2024-06-12
nav: components-X_ITE
categories: [components, X_ITE]
tags: [ClearcoatMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ClearcoatMaterialExtension is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../specularglossinessmaterial/) nodes. For this node to have an effect, add an [EnvironmentLight](../../lighting/environmentlight) node.

The ClearcoatMaterialExtension node belongs to the **X_ITE** component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + ClearcoatMaterialExtension
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFFloat \[in, out\] [clearcoat](#sffloat-in-out-clearcoat-0-0)
- SFString \[in, out\] [clearcoatTextureMapping](#sfstring-in-out-clearcoattexturemapping-)
- SFNode \[in, out\] [clearcoatTexture](#sfnode-in-out-clearcoattexture-null-x3dsingletexturenode)
- SFFloat \[in, out\] [clearcoatRoughness](#sffloat-in-out-clearcoatroughness-0-0)
- SFString \[in, out\] [clearcoatRoughnessTextureMapping](#sfstring-in-out-clearcoatroughnesstexturemapping-)
- SFNode \[in, out\] [clearcoatRoughnessTexture](#sfnode-in-out-clearcoatroughnesstexture-null-x3dsingletexturenode)
- SFString \[in, out\] [clearcoatNormalTextureMapping](#sfstring-in-out-clearcoatnormaltexturemapping-)
- SFNode \[in, out\] [clearcoatNormalTexture](#sfnode-in-out-clearcoatnormaltexture-null-x3dsingletexturenode)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **clearcoat** 0 <small>[0,∞)</small>

The clearcoat layer intensity.

### SFString [in, out] **clearcoatTextureMapping** ""

Input/Output field *clearcoatTextureMapping*.

### SFNode [in, out] **clearcoatTexture** NULL <small>[X3DSingleTextureNode]</small>

The clearcoat layer intensity texture.

### SFFloat [in, out] **clearcoatRoughness** 0 <small>[0,∞)</small>

The clearcoat layer roughness.

### SFString [in, out] **clearcoatRoughnessTextureMapping** ""

Input/Output field *clearcoatRoughnessTextureMapping*.

### SFNode [in, out] **clearcoatRoughnessTexture** NULL <small>[X3DSingleTextureNode]</small>

The clearcoat layer roughness texture.

### SFString [in, out] **clearcoatNormalTextureMapping** ""

Input/Output field *clearcoatNormalTextureMapping*.

### SFNode [in, out] **clearcoatNormalTexture** NULL <small>[X3DSingleTextureNode]</small>

The clearcoat normal map texture.

## Example

- [View »Clear Coat Car Paint« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=ClearCoatCarPaint)

## See Also

- [Khronos glTF Specification of the KHR_materials_clearcoat Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat)
