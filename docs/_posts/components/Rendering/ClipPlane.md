---
title: ClipPlane
date: 2023-01-07
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

The ClipPlane node belongs to the **Rendering** component and requires at least support level **5,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + ClipPlane
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec4f [in, out] **plane** 0 1 0 0 <small>[0,1] or (-∞,∞)</small>

If (a,b,c,d) is the *plane*, with the first three components being a normalized vector describing the *plane*'s normal direction (and thus the fourth component d being distance from the origin), a point (x,y,z) is visible to the user, with regards to the clipping *plane*, if a*x+b*y+c*z+d is greater than 0.

#### Hints

- Negate all *plane* values to reverse which side of *plane* has visibility clipped.
- [*plane*-geometry equations](https://en.wikipedia.org/wiki/Plane_(geometry)#Point-normal_form_and_general_form_of_the_equation_of_a_plane)
- [*plane*-geometry distance to point](https://en.wikipedia.org/wiki/Plane_(geometry)#Distance_from_a_point_to_a_plane)

#### Warning

- (a, b, c) value of (0, 0, 0) is forbidden since the zero vector has ambiguous direction and is thus degenerate, not defining a *plane*.

## Advice

### Hint

- ClipPlane nodes only affect peer and descendant nodes, thus a parent grouping node can limit its effect.

### Warning

- [Requires X3D `profile='Full'` or else include `<component name='Rendering' level='5'/>` Examples: X3D Example Archives, Basic, CAD, Clip Plane Example](https://www.web3d.org/x3d/content/examples/Basic/CAD/ClipPlaneExampleIndex.html)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Rendering/ClipPlane/ClipPlane.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Rendering/ClipPlane/screenshot.avif" alt="ClipPlane"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Rendering/ClipPlane/ClipPlane.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/ClipPlane/ClipPlane.x3d)
{: .example-links }

## See Also

- [X3D Specification of ClipPlane Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#ClipPlane)
