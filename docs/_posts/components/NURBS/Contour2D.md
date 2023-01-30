---
title: Contour2D
date: 2022-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [Contour2D, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Contour2D groups a set of curve segments into a composite contour. The children segments form a closed loop, with first point of first child repeated as last point of last child, and last point of each segment repeated as the first point of the next consecutive segment. The children segments are type NurbsCurve2D or ContourPolyline2D, enumerated in the consecutive order of contour topology.

The Contour2D node belongs to the **NURBS** component and its container field is *trimmingContour.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + Contour2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[NurbsCurve2D|ContourPolyline2D]</small>

Input/Output field children.

## Description

### Hint

- Contour2D is used as the trimmingContour field of the NurbsTrimmedSurface node.

Warning
-------

- Contour2D is not a renderable geometry node.

## External Links

- [X3D Specification of Contour2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#Contour2D){:target="_blank"}
