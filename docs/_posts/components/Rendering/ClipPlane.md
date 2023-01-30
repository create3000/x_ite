---
title: ClipPlane
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [ClipPlane, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ClipPlane specifies a single plane equation used to clip (i.e. cull or hide) displayed geometry. The plane field specifies a four-component plane equation that describes both inside and outside half space.

The ClipPlane node belongs to the **Rendering** component and its container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + ClipPlane
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec4f [in, out] **plane** 0 1 0 0 <small>[0,1]</small>

If (a,b,c,d) is the plane, with the first three components being a normalized vector describing the plane's normal direction (and thus the fourth component d being distance from the origin), a point (x,y,z) is visible to the user, with regards to the clipping plane, if a\*x+b\*y+c\*z+d is greater than 0.

#### Hint

Negate all plane values to reverse which side of plane has visibility clipped.

#### Warning

(a, b, c) value of (0, 0, 0) is forbidden since the zero vector has ambiguous direction and is thus degenerate, not defining a plane.

#### See Also

- [Plane-geometry equations](https://en.wikipedia.org/wiki/Plane_(geometry){:target="_blank"}
#Point-normal_form_and_general_form_of_the_equation_of_a_plane) [Plane-geometry distance to point](https://en.wikipedia.org/wiki/Plane_(geometry){:target="_blank"}#Distance_from_a_point_to_a_plane)

## Description

### Hint

- Include `<component name='Rendering' level='5'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/ClipPlane/ClipPlane.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ClipPlane](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#ClipPlane){:target="_blank"}
