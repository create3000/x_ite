---
title: CoordinateDouble
date: 2022-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [CoordinateDouble, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CoordinateDouble builds geometry by defining a set of 3D coordinate triplet values. CoordinateDouble is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle\* and IndexedTriangle\* nodes. CoordinateDouble is also used by NurbsPositionInterpolator and NurbsOrientationInterpolator.

The CoordinateDouble node belongs to the **NURBS** component and its container field is *coord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + CoordinateDouble
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec3d [in, out] **point** [ ] <small>(-∞,∞)</small>

Point contains a set of 3D coordinate triplet values.

## Description

Warning
-------

- CoordinateDouble requires NURBS component level 1, otherwise Full profile.

## External Links

- [X3D Specification of CoordinateDouble](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#CoordinateDouble){:target="_blank"}
