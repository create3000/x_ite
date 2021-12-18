# Building Primitive Shapes

## Motivation

Shapes are the building blocks of a X3D world. Primitive Shapes are standard building blocks:

- [Box](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Box)
- [Cone](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cone)
- [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cylinder)
- [Sphere](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Sphere)
- [Text](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#Text)
- and more from the [CADGeometry](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html)**,** [Geometry2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html)**,** and [Rendering](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html) component

## Syntax: Shape

- A [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) node builds a shape
  - *appearance* - color and texture
  - *geometry* - form, or structure

### XML Encoding

```xml
<Shape>
  <!-- appearance ... -->
  <!-- geometry ... -->
<Shape>
```

### Classic Encoding

```js
Shape {
  appearance ...
  geometry ...
}
```

## Specifying appearance

- [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) appearance is described by appearance nodes
- For now, we'll use nodes to create a shaded white appearance:

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material Material { }
  }
  geometry ...
}
```

## Specifying geometry

[Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) geometry is built with geometry nodes:

### XML Encoding

```xml
<Box ... />
<Cone ... />
<Cylinder ... />
<Sphere ... />
<Text ... />
```

### Classic Encoding

```js
Box { ... }
Cone { ... }
Cylinder { ... }
Sphere { ... }
Text { ... }
```

- Geometry node fields control dimensions
  - Dimensions usually in meters, but can be anything

## A sample primitive shape

### XML Encoding

```xml
<?xml version="1.0" encoding="UTF-8"?>

<X3D profile='Full' version='3.3' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-3.3.xsd'>
  <Scene>
    <Shape>
      <Appearance>
        <Material/>
      </Appearance>
      <Cylinder
          radius='1.5'/>
    </Shape>
  </Scene>
</X3D>
```

### Classic Encoding

```js
#X3D V3.3 utf8
# A cylinder
Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Cylinder {
    height 2.0
    radius 1.5
  }
}
```

[![Cylinder](https://create3000.github.io/media/tutorials/scenes/cylinder1/screenshot.png)](https://create3000.github.io/media/tutorials/scenes/cylinder1/example.html)

[View scene in this window.](https://create3000.github.io/media/tutorials/scenes/cylinder1/example.html)

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.zip)

## Building multiple shapes

- Shapes are built centered in the world
- A X3D file can contain multiple shapes
- Shapes overlap when built at the same location

## A sample file with multiple shapes

### XML Encoding

```xml
<?xml version="1.0" encoding="UTF-8"?>

<X3D profile='Full' version='3.3' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-3.3.xsd'>
  <Scene>
    <Shape>
      <Appearance>
        <Material/>
      </Appearance>
      <Box
          size='1 1 1'/>
    </Shape>
    <Shape>
      <Appearance>
        <Material/>
      </Appearance>
      <Sphere
          radius='0.7'/>
    </Shape>
    <!-- ... -->
  </Scene>
</X3D>
```

### Classic Encoding

```js
#X3D V3.3 utf8

Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Box {
    size 1.0 1.0 1.0
  }
}

Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Sphere {
    radius 0.7
  }
}

...
```

[![Multiple Shapes](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/screenshot.png)](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/example.html)

[View scene in this window.](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/example.html)

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/multiple-shapes.zip)

## Summary

- Shapes are built using a [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) node
- [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape) geometry is built using geometry nodes, such as [Box](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Box), [Cone](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cone), [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cylinder), [Sphere](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Sphere), and [Text](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#Text)
- Text fonts are controlled using a [FontStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#FontStyle) node
