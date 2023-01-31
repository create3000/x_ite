---
title: FogCoordinate
date: 2022-01-07
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

The FogCoordinate node belongs to the **EnvironmentalEffects** component and its default container field is *fogCoord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + FogCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFFloat [in, out] **depth** [ ] <small>[0,1]</small>

Depth contains a set depth values.

## External Links

- [X3D Specification of FogCoordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#FogCoordinate){:target="_blank"}
