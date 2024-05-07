---
title: Controlling Color on Coordinate-Based Geometry
date: 2022-11-28
nav: tutorials-animation-sensors-and-geometry
categories: [Tutorials]
tags: [Controlling, Color, Coordinate, Geometry]
---
## Motivation

- The [Material](/x_ite/components/shape/material/) node gives an entire shape the same color
- You can provide colors for individual parts of a shape using a [Color](/x_ite/components/rendering/color/) node

## Syntax: Color

A [Color](/x_ite/components/rendering/color/) node contains a list of RGB values (similar to a Coordinate node):

### XML Encoding

```xml
<Color
    color='1.0 0.0 0.0, ...'/>
```

### Classic Encoding

```js
Color {
  color [ 1.0 0.0 0.0, ... ]
}
```

Used as the color field value of [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/), [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [PointSet](/x_ite/components/rendering/pointset/) or [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) nodes.

## Binding colors

- Colors in the Color node override those in the Material node
- You can bind colors
  - To each point, line, or face
  - To each coordinate in a line, or face

## Syntax: PointSet

A [PointSet](/x_ite/components/rendering/pointset/) geometry node creates geometry out of points:

- *color* - provides a list of colors
- Always binds one color to each point, in order

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <PointSet>
    <Color ... />
    <Coordinate ... />
  </PointSet>
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance { ... }
  geometry PointSet {
    color Color { ... }
    coord Coordinate { ... }
  }
}
```

## Syntax: IndexedLineSet

An [IndexedLineSet](/x_ite/components/rendering/indexedlineset/) geometry node creates geometry out of lines:

- *color* - list of colors
- *colorIndex* - selects colors from list
- *colorPerVertex* - control color binding

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <IndexedLineSet
      colorPerVertex='true'
      colorIndex='...'
      coordIndex='...'>
    <Color ... />
    <Coordinate ... />
  </IndexedLineSet>
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance { ... }
  geometry IndexedLineSet {
    colorPerVertex TRUE
    colorIndex [ ... ]
    coordIndex [ ... ]
    color Color { ... }
    coord Coordinate { ... }
  }
}
```

## Controlling color binding for line sets

The *colorPerVertex* field controls how color indexes are used:

- **FALSE:** one color index to each line (ending at -1 coordinate indexes)
- **TRUE:** one color index to each coordinate index of each line (including -1 coordinate indexes)

## Syntax: IndexedFaceSet

An [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) geometry node creates geometry out of faces:

- *color* - list of colors
- *colorIndex* - selects colors from list
- *colorPerVertex* - control color binding

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <IndexedFaceSet
      colorPerVertex='true'
      colorIndex='...'
      coordIndex='...'>
    <Color ... />
    <Coordinate ... />
  </IndexedFaceSet>
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance { ... }
  geometry IndexedFaceSet {
    colorPerVertex TRUE
    colorIndex [ ... ]
    coordIndex [ ... ]
    color Color { ... }
    coord Coordinate { ... }
  }
}
```

## Controlling color binding for face sets

The *colorPerVertex* field controls how color indexes are used (similar to line sets):

- **FALSE:** one color index to each face (ending at -1 coordinate indexes)
- **TRUE:** one color index to each coordinate index of each face (including -1 coordinate indexes)

## Syntax: ElevationGrid

An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) geometry node creates terrains:

- *color* - list of colors
- *colorPerVertex* - control color binding
- Always binds one color to each grid point or square, in order

### XML Encoding

```xml
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      ...
      colorPerVertex='true'
      height='...'>
    <Color ... />
  </ElevationGrid>
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    ...
    colorPerVertex TRUE
    color Color { ... }
    height [ ... ]
  }
}
```

## Controlling color binding for elevation grids

The *colorPerVertex* field controls how color indexes are used (similar to line and face sets):

- **FALSE:** one color to each grid square
- **TRUE:** one color to each height for each grid square

## Summary

The [Color](/x_ite/components/rendering/color/) node lists colors to use for parts of a shape:

- Used as the value of the color field
- Color indexes select colors to use
- Colors override [Material](/x_ite/components/shape/material/) node

The *colorPerVertex* field selects color per line/face/grid square or color per coordinate.
