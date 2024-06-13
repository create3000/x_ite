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

The Tangent node belongs to the **Rendering** component and requires at least level **5,** its default container field is *tangent.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
   + Tangent
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3f [in, out] **vector** [ ] <small>[-1,1]</small>

A unit XYZ vector defining a tangential direction on the surface.

## See Also

- [X3D Specification of Tangent Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Tangent){:target="_blank"}
