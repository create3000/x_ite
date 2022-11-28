---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
---
# Controlling Appearance whith Materials

## Motivation

The primitive shapes have a default emissive (glowing) white appearance

You can control a shape's

- Shading color
- Glow color
- Transparency
- Shininess
- Ambient intensity

## Syntax: Shape

Recall that [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) nodes describe:

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

An [Appearance](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Appearance) node describes overall shape appearance

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

A [Material](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Material) node controls shape material attributes

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

  [white]: https://via.placeholder.com/15/ffffff/000000?text=+
  [red]: https://via.placeholder.com/15/ff0000/000000?text=+
  [yellow]: https://via.placeholder.com/15/fff000/000000?text=+
  [cyan]: https://via.placeholder.com/15/00ffff/000000?text=+
  [brown]: https://via.placeholder.com/15/692929/000000?text=+

## Syntax: Material

A [Material](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Material) node also controls shape shininess

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

[![Box1](https://create3000.github.io/media/tutorials/scenes/box1/screenshot.png)](https://create3000.github.io/media/tutorials/scenes/box1/example.html)

[View scene in this window.](https://create3000.github.io/media/tutorials/scenes/box1/example.html)

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/box1/box1.zip)

## Summary

The [Appearance](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Appearance) node controls overall shape appearance

The [Material](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Material) node controls overall material properties including:

- Shading color
- Glow color
- Transparency
- Shininess
- Ambient intensity
