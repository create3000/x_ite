---
title: Build Extruded Shapes
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Build, Extruded, Shapes]
---
## Motivation

Extruded shapes are very common

- Tubes, pipes, bars, vases, donuts
- Other tricky uses...

How can you do it:

- You can build extruded shapes using an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) node.
- You can build extruded shapes more easily and efficiently using an [Extrusion](/x_ite/components/geometry3d/extrusion/) node.

## Creating extruded shapes

Extruded shapes are described by:

- A 2-D cross-section
- A 3-D spine along which to sweep the cross-section

Extruded shapes are like long bubbles created with a bubble wand:

- The bubble wand's outline is the cross-section
- The path along which you swing the wand is the spine

## Syntax: Extrusion

An [Extrusion](/x_ite/components/geometry3d/extrusion/) geometry node creates extruded geometry:

- *crossSection* - 2-D cross-section
- *spine* - 3-D sweep path
- *endCap* and *beginCap* - cap ends

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <Extrusion
      crossSection='...'
      spine='...'
      endCap='true'
      beginCap='true'
      ... />
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry Extrusion {
    crossSection [ ... ]
    spine [ ...  ]
    endCap TRUE
    beginCap TRUE
    ...
  }
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/extrusion1/extrusion1.x3dv">
  <img src="https://create3000.github.io/media/tutorials/scenes/extrusion1/screenshot.avif" alt="Extrusion"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/extrusion1/extrusion1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/extrusion1/extrusion1.x3dv)
{: .example-links }

An [Extrusion](/x_ite/components/geometry3d/extrusion/) geometry node creates extruded geometry:

- *solid* - shape is solid
- *ccw* - faces are counter-clockwise
- *convex* - faces are convex

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <Extrusion
      ...
      solid='true'
      ccw='true'
      convex='true'/>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry Extrusion {
    ...
    solid TRUE
    ccw TRUE
    convex TRUE
  }
}
```

## Squishing and twisting extruded shapes

You can scale the cross-section along the spine:

- Vases, musical instruments
- Surfaces of revolution

You can rotate the cross-section along the spine

- Twisting ribbons

## Syntax: Extrusion

An [Extrusion](/x_ite/components/geometry3d/extrusion/) geometry node creates geometry using:

- *scale* - cross-section scaling per spine point
- *orientation* - cross-section rotation per spine point

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <Extrusion
      ...
      scale='...'
      orientation='...'/>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry Extrusion {
    ...
    scale [ ... ]
    orientation [ ... ]
  }
}
```

## Summary

- An [Extrusion](/x_ite/components/geometry3d/extrusion/) node efficiently creates extruded shapes
- The *crossSection* field specifies the cross-section
- The *spine* field specifies the sweep path
- The *scale* and *orientation* fields specify scaling and rotation at each spine point
