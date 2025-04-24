---
title: FogCoordinate
date: 2023-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [FogCoordinate, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

FogCoordinate defines a set of explicit fog depths on a per-vertex basis, overriding Fog visibilityRange.

The FogCoordinate node belongs to the **EnvironmentalEffects** component and requires at least support level **4,** its default container field is *fogCoord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + FogCoordinate
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| MFFloat | \[in, out\] | [depth](#mffloat-in-out-depth---0-1) | \[ \] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFFloat [in, out] **depth** [ ] <small>[0,1]</small>

*depth* contains a set of 3D coordinate (triplet) point values.

## See Also

- [X3D Specification of FogCoordinate Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#FogCoordinate)
