---
title: GaussianSplats
date: 2023-01-07
nav: components-X_ITE
categories: [components, X_ITE]
tags: [GaussianSplats, X_ITE]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

The GaussianSplats node adds basic support for storing 3D Gaussian splats in X3D files.

The GaussianSplats node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and its default container field is *children.* It is available in X_ITE.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DChildNode
      + GaussianSplats (*X3DBoundedObject)
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_gaussian_splatting Extension](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md)
