---
title: Building Elevation Grids
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Building, Elevation grids]
---
## Motivation

- Building terrains is very common
  - Hills, valleys, mountains
  - Other tricky uses...
- You can build a terrain using an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) node
- You can build terrains more efficiently using an [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) node

## Syntax: ElevationGrid

An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) geometry node creates terrains:

- *xDimension* and *zDimension* - grid size
- *xSpacing* and *zSpacing* - row and column distances

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      xDimension='3'
      zDimension='2'
      xSpacing='1.0'
      zSpacing='1.0'
      ... />
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    xDimension 3
    zDimension 2
    xSpacing   1.0
    zSpacing   1.0
    ...
  }
}
```

An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) geometry node creates terrains:

- *height* - elevations at grid points

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      ...
      height='0.0, -0.5, 0.0,
              0.2,  4.0, 0.0'/>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    ...
    height [
      0.0, -0.5, 0.0,
      0.2,  4.0, 0.0
    ]
  }
}
```

An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) geometry node creates terrains

- *solid* - shape is solid
- *ccw* - faces are counter-clockwise

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      solid='true'
      ccw='true'
      ... />
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    ...
    solid TRUE
    ccw TRUE
  }
}
```

## A sample elevation grid

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      xDimension='9'
      zDimension='9'
      xSpacing='1.0'
      zSpacing='1.0'
      solid='false'
      height='0.0, 0.0, 0.5, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0,
              0.0, 0.0, 0.0, 0.0, 2.5, 0.5, 0.0, 0.0, 0.0,
              0.0, 0.0, 0.5, 0.5, 3.0, 1.0, 0.5, 0.0, 1.0,
              0.0, 0.0, 0.5, 2.0, 4.5, 2.5, 1.0, 1.5, 0.5,
              1.0, 2.5, 3.0, 4.5, 5.5, 3.5, 3.0, 1.0, 0.0,
              0.5, 2.0, 2.0, 2.5, 3.5, 4.0, 2.0, 0.5, 0.0,
              0.0, 0.0, 0.5, 1.5, 1.0, 2.0, 3.0, 1.5, 0.0,
              0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.5, 0.5,
              0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0,'/>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    xDimension 9
    zDimension 9
    xSpacing   1.0
    zSpacing   1.0
    solid FALSE
    height [
      0.0, 0.0, 0.5, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 2.5, 0.5, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.5, 0.5, 3.0, 1.0, 0.5, 0.0, 1.0,
      0.0, 0.0, 0.5, 2.0, 4.5, 2.5, 1.0, 1.5, 0.5,
      1.0, 2.5, 3.0, 4.5, 5.5, 3.5, 3.0, 1.0, 0.0,
      0.5, 2.0, 2.0, 2.5, 3.5, 4.0, 2.0, 0.5, 0.0,
      0.0, 0.0, 0.5, 1.5, 1.0, 2.0, 3.0, 1.5, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 1.5, 0.5,
      0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0,
    ]
  }
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/elevation-grid/elevation-grid.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/elevation-grid/screenshot.png" alt="Elevation Grid"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/elevation-grid/elevation-grid.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/elevation-grid/elevation-grid.x3dv)
{: .example-links }

## Summary

- An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) node efficiently creates a terrain
- Grid size is specified in the *xDimension* and *zDimension* fields
- Grid spacing is specified in the *xSpacing* and *zSpacing* field
- Elevations at each grid point are specified in the *height* field
