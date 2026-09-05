---
title: RetroreflectionMaterialExtension
date: 2026-09-02
nav: components-X_ITE
categories: [components, X_ITE]
tags: [RetroreflectionMaterialExtension, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

**RetroreflectionMaterialExtension** is an extension for the [PhysicalMaterial](../../shape/physicalmaterial/) node. For this node to have an effect, turn a [EnvironmentLight](../../lighting/environmentlight) **off** and only use other light nodes.

The **RetroreflectionMaterialExtension** node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *extensions.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DMaterialExtensionNode
    + RetroreflectionMaterialExtension
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| SFFloat | [in, out] | [retroreflection](#fields-retroreflection) | 0 |
| SFString | [in, out] | [retroreflectionTextureMapping](#fields-retroreflectionTextureMapping) | "" |
| SFNode | [in, out] | [retroreflectionTexture](#fields-retroreflectionTexture) | NULL |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **retroreflection** 0 <small>[0,1]</small>
{: #fields-retroreflection }

Linear blend between forward microfacet (0.0) and retroreflective microfacet (1.0). Range [0, 1].

### SFString [in, out] **retroreflectionTextureMapping** ""
{: #fields-retroreflectionTextureMapping }

Input/Output field *retroreflectionTextureMapping*.

### SFNode [in, out] **retroreflectionTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-retroreflectionTexture }

Per-texel multiplier for retroreflectionFactor, sampled from the R channel.

## Example

- [View »Traffic Cone« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=TrafficCone)

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_materials_retroreflection Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_retroreflection)
- [Draft of Khronos glTF Specification of the KHR_materials_retroreflection Extension](https://github.com/mklefrancois/glTF/tree/c33751d337d98e2d2b9f48e51cff9efa4d487b8b/extensions/2.0/Khronos/KHR_materials_retroreflection)
