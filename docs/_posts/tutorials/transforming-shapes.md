---
title: Transforming Shapes
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Transforming, Shapes]
---
## Motivation

- By default, all shapes are built at the center of the world
- A Transform enables you to
  - Position shapes
  - Rotate shapes
  - Scale shapes

## Using coordinate systems

- A X3D file builds components for a world
- A file's world components are built in the file's world coordinate system
- By default, all shapes are built at the origin of the world coordinate system

## Transforming a coordinate system

A transform creates a coordinate system that is

- Positioned
- Rotated
- Scaled

relative to a parent coordinate system

Shapes built in the new coordinate system are positioned, rotated, and scaled along with it

## Syntax: Transform

The [Transform](/x_ite/components/grouping/transform/) group node creates a group with its own coordinate system

- *translation* - position
- *rotation* - orientation
- *scale* - size
- *children* - shapes to build

### XML Encoding

```xml
<Transform
    translation='...'
    rotation='...'
    scale='...'>
  <!-- children -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  translation ...
  rotation ...
  scale ...
  children [ ... ]
}
```

## Including children

The *children* field includes a list of one or more nodes

### XML Encoding

```xml
<Transform ...>
    <Shape><!-- ... --></Shape>
    <Shape><!-- ... --></Shape>
    <Transform><!-- ... --></Transform>
    <!-- # And other child nodes -->
    <!-- ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  ...
  children [
    Shape { ... }
    Shape { ... }
    Transform { ... }
    # And other child nodes
    ...
  ]
}
```

## Translating

Translation positions a coordinate system in X, Y, and Z.

### XML Encoding

```xml
<!-- X Y Z -->
<Transform
    translation='2.0 0.0 0.0'>
  <!-- children ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  # X Y Z
  translation 2.0 0.0 0.0
  children [ ... ]
}
```

## Rotating

Rotation orients a coordinate system about a rotation axis by a rotation angle

- Angles are measured in radians
- radians = degrees / 180.0 \* 3.1415927

### XML Encoding

```xml
<!-- X Y Z Angle -->
<Transform
    rotation='0.0 0.0 1.0 0.52'>
  <!-- children ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  # X Y Z Angle
  rotation 0.0 0.0 1.0 0.52
  children [ ... ]
}
```

## Specifying rotation axes

- A rotation axis defines a pole to rotate around
- Like the Earth's North-South pole

Typical rotations are about the X, Y, or Z axes:

| Rotate about | Axis        |
|--------------|-------------|
| X-Axis       | 1.0 0.0 0.0 |
| Y-Axis       | 0.0 1.0 0.0 |
| Z-Axis       | 0.0 0.0 1.0 |

## Using the Right-Hand Rule

Positive rotations are counter-clockwise

To help remember positive and negative rotation directions:

- Open your hand
- Stick out your thumb
- Aim your thumb in an axis positive direction
- Curl your fingers around the axis
- The curl direction is a positive rotation

## Scaling

Scale grows or shrinks a coordinate system by a scaling factor in X, Y, and Z.

### XML Encoding

```xml
<!-- X Y Z  -->
<Transform
  scale='0.5 0.5 0.5'>
  <!-- children ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  # X Y Z
  scale 0.5 0.5 0.5
  children [ ... ]
}
```

## Scaling, rotating, and translating

Scale, Rotate, and Translate a coordinate system, one after the other.

### XML Encoding

```xml
<Transform
    translation='2.0 0.0 0.0'
    rotation='0.0 0.0 1.0 0.52'
    scale='0.5 0.5 0.5'>
  <!-- children ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  translation 2.0 0.0 0.0
  rotation 0.0 0.0 1.0 0.52
  scale 0.5 0.5 0.5
  children [ ... ]
}
```

Read operations bottom-up:

- The children are scaled, rotated, then translated
- Order is fixed, independent of field order

## A sample transform group

### XML Encoding

```xml
<Transform
    translation='-2.0 3.0 0.0'>
  <Shape>
    <Appearance>
      <Material/>
    </Appearance>
    <Cylinder
        radius='0.3'
        height='6.0'
        top='false'>
  </Shape>
</Transform>
<!-- ... -->
```

### Classic VRML Encoding

```vrml
Transform {
  translation -2.0 3.0 0.0
  children [
    Shape {
      appearance Appearance {
        material Material { }
      }
      geometry Cylinder {
        radius 0.3
        height 6.0
        top FALSE
      }
    }
  ]
}
...
```

## Summary

- All shapes are built in a coordinate system
- The [Transform](/x_ite/components/grouping/transform/) node creates a new coordinate system relative to its parent
- [Transform](/x_ite/components/grouping/transform/) node fields do
  - *translation*
  - *rotation*
  - *scale*
