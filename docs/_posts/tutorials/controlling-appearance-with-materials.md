---
title: Controlling Appearance with Materials
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Controlling, Appearance, Materials]
---
## Motivation

The primitive shapes have a default emissive (glowing) white appearance

You can control a shape's

- Shading color
- Glow color
- Transparency
- Shininess
- Ambient intensity

## Syntax: Shape

Recall that [Shape](/x_ite/components/shape/shape/) nodes describe:

- *appearance* - color and texture
- *geometry* - form, or structure

### XML Encoding

```xml
<Shape>
  <!-- appearance ... -->
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance ...
  geometry ...
}
```

## Syntax: Appearance

An [Appearance](/x_ite/components/shape/appearance/) node describes overall shape appearance

- *material* properties - color, transparency, etc.

### XML Encoding

```xml
<Shape>
  <Appearance>
    <!-- material ... -->
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material ...
  }
  geometry ...
}
```

## Syntax: Material

A [Material](/x_ite/components/shape/material/) node controls shape material attributes

- *diffuseColor* - main shading color
- *emissiveColor* - glowing color
- *transparency* - opaque or not

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material
        diffuseColor='0.8 0.8 0.8'
        emissiveColor='0.0 0.0 0.0'
        transparency='0.0'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material Material {
      diffuseColor  0.8 0.8 0.8
      emissiveColor 0.0 0.0 0.0
      transparency  0.0
    }
  }
  geometry ...
}
```

## Specifying colors

Colors specify:

- A mixture of red, green, and blue light
- Values between 0.0 (none) and 1.0 (lots)

| Color  | Red | Green | Blue | Result      |
|--------|-----|-------|------|-------------|
| White  | 1.0 | 1.0   | 1.0  | ![white][]  |
| Red    | 1.0 | 0.0   | 0.0  | ![red][]    |
| Yellow | 1.0 | 1.0   | 0.0  | ![yellow][] |
| Cyan   | 0.0 | 1.0   | 1.0  | ![cyan][]   |
| Brown  | 0.5 | 0.2   | 0    | ![brown][]  |

  [white]: https://via.placeholder.com/15/ffffff/ffffff
  [red]: https://via.placeholder.com/15/ff0000/ff0000
  [yellow]: https://via.placeholder.com/15/fff000/fff000
  [cyan]: https://via.placeholder.com/15/00ffff/00ffff
  [brown]: https://via.placeholder.com/15/692929/692929

## Syntax: Material

A [Material](/x_ite/components/shape/material/) node also controls shape shininess

- *specularColor* - highlightcolor
- *shininess* - highlightsize
- *ambientIntensity* - ambient lighting effects

## A sample world using appearance

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material
        diffuseColor='0.2 0.2 0.2'
        emissiveColor='0.0 0.0 0.8'
        transparency='0.25'/>
  </Appearance>
  <Box
      size='2.0 4.0 0.3'/>
</Shape>
<!-- ... -->
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material Material {
      diffuseColor  0.2 0.2 0.2
      emissiveColor 0.0 0.0 0.8
      transparency  0.25
    }
  }
  geometry Box {
    size 2.0 4.0 0.3
  }
}
...
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/box1/box1.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/box1/screenshot.png" alt="Box 1"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/box1/box1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/box1/box1.x3dv)
{: .example-links }

## Summary

The [Appearance](/x_ite/components/shape/appearance/) node controls overall shape appearance

The [Material](/x_ite/components/shape/material/) node controls overall material properties including:

- Shading color
- Glow color
- Transparency
- Shininess
- Ambient intensity
