---
title: Building Primitive Shapes
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [building, primitive, shapes]
---
## Motivation

Shapes are the building blocks of a X3D world. Primitive Shapes are standard building blocks:

- [Box](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Box){:target="_blank"}
- [Cone](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cone){:target="_blank"}
- [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cylinder){:target="_blank"}
- [Sphere](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Sphere){:target="_blank"}
- [Text](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/text.html#Text){:target="_blank"}
- and more from the [CADGeometry](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html){:target="_blank"}**,** [Geometry2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html){:target="_blank"}**,** and [Rendering](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html){:target="_blank"} component

## Syntax: Shape

- A [Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"} node builds a shape
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

- [Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"} appearance is described by appearance nodes
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

[Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"} geometry is built with geometry nodes:

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
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
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
#X3D V{{ site.x3d_latest_version }} utf8
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

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.x3dv">
  <img src="https://create3000.github.io/media/tutorials/scenes/cylinder1/screenshot.png" alt="Cylinder"/>
</x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.zip)

## Building multiple shapes

- Shapes are built centered in the world
- A X3D file can contain multiple shapes
- Shapes overlap when built at the same location

## A sample file with multiple shapes

### XML Encoding

```xml
<?xml version="1.0" encoding="UTF-8"?>
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
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
#X3D V{{ site.x3d_latest_version }} utf8

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

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/multiple-shapes/multiple-shapes.x3dv">
  <img src="https://create3000.github.io/media/tutorials/scenes/multiple-shapes/screenshot.png" alt="Multiple Shapes"/>
</x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/multiple-shapes.zip)

## Summary

- Shapes are built using a [Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"} node
- [Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"} geometry is built using geometry nodes, such as [Box](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Box){:target="_blank"}, [Cone](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cone){:target="_blank"}, [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Cylinder){:target="_blank"}, [Sphere](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#Sphere){:target="_blank"}, and [Text](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/text.html#Text){:target="_blank"}
- Text fonts are controlled using a [FontStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/text.html#FontStyle){:target="_blank"} node
