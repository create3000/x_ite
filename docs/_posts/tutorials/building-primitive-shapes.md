---
title: Building Primitive Shapes
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Building, Primitive, Shapes]
---
## Motivation

Shapes are the building blocks of an X3D world. Primitive Shapes are standard building blocks:

- [Box](/x_ite/components/geometry3d/box/)
- [Cone](/x_ite/components/geometry3d/cone/)
- [Cylinder](/x_ite/components/geometry3d/cylinder/)
- [Sphere](/x_ite/components/geometry3d/sphere/)
- [Text](/x_ite/components/text/text/)
- and more from the [CADGeometry](/x_ite/components/overview/#cadgeometry)**,** [Geometry2D](/x_ite/components/overview/#geometry2d)**,** and [Rendering](/x_ite/components/overview/#rendering) component

## Syntax: Shape

- A [Shape](/x_ite/components/shape/shape/) node builds a shape
  - *appearance* - color and texture
  - *geometry* - form, or structure

### XML Encoding

```x3d
<Shape>
  <!-- appearance ... -->
  <!-- geometry ... -->
<Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance ...
  geometry ...
}
```

## Specifying appearance

- [Shape](/x_ite/components/shape/shape/) appearance is described by appearance nodes
- For now, we'll use nodes to create a shaded white appearance:

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { }
  }
  geometry ...
}
```

## Specifying geometry

[Shape](/x_ite/components/shape/shape/) geometry is built with geometry nodes:

### XML Encoding

```x3d
<Box ... />
<Cone ... />
<Cylinder ... />
<Sphere ... />
<Text ... />
```

### Classic VRML Encoding

```vrml
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

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
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

### Classic VRML Encoding

```vrml
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
  <img src="https://create3000.github.io/media/tutorials/scenes/cylinder1/screenshot.avif" alt="Cylinder"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.x3dv)
{: .example-links }

## Building multiple shapes

- Shapes are built centered in the world
- An X3D file can contain multiple shapes
- Shapes overlap when built at the same location

## A sample file with multiple shapes

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
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

### Classic VRML Encoding

```vrml
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
  <img src="https://create3000.github.io/media/tutorials/scenes/multiple-shapes/screenshot.avif" alt="Multiple Shapes"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/multiple-shapes/multiple-shapes.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/multiple-shapes/multiple-shapes.x3dv)
{: .example-links }

## Summary

- Shapes are built using a [Shape](/x_ite/components/shape/shape/) node
- [Shape](/x_ite/components/shape/shape/) geometry is built using geometry nodes, such as [Box](/x_ite/components/geometry3d/box/), [Cone](/x_ite/components/geometry3d/cone/), [Cylinder](/x_ite/components/geometry3d/cylinder/), [Sphere](/x_ite/components/geometry3d/sphere/), and [Text](/x_ite/components/text/text/)
- Text fonts are controlled using a [FontStyle](/x_ite/components/text/fontstyle/) node
