---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
---
# Building Elevation Grids

## Motivation

- Building terrains is very common
  - Hills, valleys, mountains
  - Other tricky uses...
- You can build a terrain using an [IndexedFaceSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#IndexedFaceSet) node
- You can build terrains more efficiently using an [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid) node

## Syntax: ElevationGrid

An [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid) geometry node creates terrains:

- *xDimension* and *zDimension* - grid size
- *xSpacing* and *zSpacing* - row and column distances

### XML Encoding

```xml
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

### Classic Encoding

```js
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

An [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid) geometry node creates terrains:

- *height* - elevations at grid points

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      ...
      height='0.0, -0.5, 0.0,
              0.2,  4.0, 0.0'/>
</Shape>
```

### Classic Encoding

```js
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

An [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid) geometry node creates terrains

- *solid* - shape is solid
- *ccw* - faces are counter-clockwise

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      solid='true'
      ccw='true'
      ... />
</Shape>
```

### Classic Encoding

```js
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

```xml
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

### Classic Encoding

```js
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

[![Elevation Grid](https://create3000.github.io/media/tutorials/scenes/elevation-grid/screenshot.png)](https://create3000.github.io/media/tutorials/scenes/elevation-grid/example.html)

[View scene in this window.](https://create3000.github.io/media/tutorials/scenes/elevation-grid/example.html)

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/elevation-grid/elevation-grid.zip)

## Summary

- An [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid) node efficiently creates a terrain
- Grid size is specified in the *xDimension* and *zDimension* fields
- Grid spacing is specified in the *xSpacing* and *zSpacing* field
- Elevations at each grid point are specified in the *height* field
