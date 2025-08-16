---
title: Tangent
date: 2024-06-13
nav: components-Rendering
categories: [components, Rendering]
tags: [Tangent, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Tangent.

The Tangent node belongs to the **Rendering** component and requires at least support level **5,** its default container field is *tangent.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTangentNode
      + Tangent
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFVec4f | [in, out] | [vector](#fields-vector) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFVec4f [in, out] **vector** [ ] <small>[-1,1]</small>
{: #fields-vector }

A unit XYZ vector defining a tangent direction on the surface, and a W component whose sign value (-1 or +1) indicates the handedness of the tangent base.

## See Also

- [X3D Specification of Tangent Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Tangent)
