---
title: Controlling Detail
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [Controlling, Detail]
---
## Motivation

The further the viewer can see, the more there is to draw.

If a shape is distant:

- The shape is smaller
- The viewer can't see as much detail
- So ... draw it with less detail

Varying detail with distance reduces upfront download time, and increases drawing speed.

## Creating multiple shape versions

To control detail, model the same shape several times:

- high detail for when the viewer is close up
- medium detail for when the viewer is nearish
- low detail for when the viewer is distant

Usually, two or three different versions is enough, but you can have as many as you want.

## Controlling level of detail

Group the shape versions as levels in an [LOD](/x_ite/components/navigation/lod/) grouping node:

- LOD is short for Level of Detail
- List them from highest to lowest detail

## Syntax: LOD

An [LOD](/x_ite/components/navigation/lod/) grouping node creates a group of shapes describing different levels (versions) of the same shape:

- *center* - the center of the shape
- *range* - a list of level switch ranges
- *children* - a list of shape levels

### XML Encoding

```xml
<LOD
    center='0.0 0.0 0.0'
    range='...'>
  <!-- children ... -->
</LOD>
```

### Classic VRML Encoding

```vrml
LOD {
  center 0.0 0.0 0.0
  range [ ... ]
  children [ ... ]
}
```

## Choosing detail ranges

Use a list of ranges for level switch points:

- If you have 3 levels, you need 2 ranges
- Ranges are hints to the browser

**range \[ 5.0, 10.0 \]**

![lod-level](https://create3000.github.io/media/tutorials/images/lod-level.png)

## Optimizing a shape

Suggested procedure to make different levels (versions):

- Make the high detail shape first
- Copy it to make a medium detail level
- Move the medium detail shape to a desired switch distance
- Delete parts that aren't dominant
- Repeat for a low detail level

Lower detail levels should use simpler geometry, fewer textures, and no text.

## A sample LOD

### XML Encoding

```xml
<LOD
    center='0.0 0.0 0.0'
    range='7.0, 10.0'>
  <Inline
      url='"torch1.x3d"'/>
  <Inline
      url='"torch2.x3d"'/>
  <Inline
      url='"torch3.x3d"'/>
</LOD>
```

### Classic VRML Encoding

```vrml
LOD {
  center 0.0 0.0 0.0
  range [ 7.0, 10.0 ]
  children [
    Inline { url "torch1.x3dv" }
    Inline { url "torch2.x3dv" }
    Inline { url "torch3.x3dv" }
  ]
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/lod/lod.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/lod/screenshot.png" alt="LOD"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/lod/lod.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/lod/lod.x3dv)
{: .example-links }

## Summary

Increase performance by making multiple levels of shapes:

- High detail for close up viewing
- Lower detail for more distant viewing

Group the levels in an [LOD](/x_ite/components/navigation/lod/) node:

- Ordered from high detail to low detail
- Ranges to select switching distances
