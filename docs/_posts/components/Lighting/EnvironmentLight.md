---
title: EnvironmentLight
date: 2023-01-31
nav: components-Lighting
categories: [components, Lighting]
tags: [EnvironmentLight, Lighting]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

EnvironmentLight ...

The EnvironmentLight node belongs to the **Lighting** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

### SFBool [in, out] **global** <small></small>

### SFBool [in, out] **on** <small></small>

### SFColor [in, out] **color** <small></small>

### SFFloat [in, out] **intensity** 0 <small></small>

### SFFloat [in, out] **ambientIntensity** 0 <small></small>

### SFRotation [in, out] **rotation** <small></small>

### MFFloat [in, out] **diffuseCoefficients** <small></small>

### SFNode [in, out] **diffuse** <small></small>

### SFNode [in, out] **diffuseTexture** <small></small>

### SFNode [in, out] **specularTexture** <small></small>

### SFBool [in, out] **shadows** <small></small>

### SFColor [in, out] **shadowColor** <small></small>

### SFFloat [in, out] **shadowIntensity** 0 <small></small>

### SFFloat [in, out] **shadowBias** 0 <small></small>

### SFInt32 [] **shadowMapSize** <small></small>

## External Links

- [X3D Specification of EnvironmentLight](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight){:target="_blank"}
