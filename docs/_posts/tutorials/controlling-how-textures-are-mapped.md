---
title: Controlling How Textures are Mapped
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Controlling, Textures, Mapped]
---
## Motivation

- By default, an entire texture image is mapped once around the shape
- You can also:
  - Extract only pieces of interest
  - Create repeating patterns

## Working through the texturing process

- Imagine the texture image is a big piece of rubbery cookie dough
- Select a texture image piece
  - Define the shape of a cookie cutter
  - Position and orient the cookie cutter
  - Stamp out a piece of texture dough
- Stretch the rubbery texture cookie to fit a face

## Using texture coordinate system

Texture images (the dough) are in a texture coordinate system:

- **S** - direction is horizontal
- **T** - direction is vertical
- (0,0) at lower-left
- (1,1) at upper-right

## Specifying texture coordinates

Texture coordinates and texture coordinate indexes specify a texture piece shape (the cookie cutter):

|                        | Coordinates                     |
|------------------------|---------------------------------|
| ![Texture Mapping 1][] | 0.0 0.0 1.0 0.0 1.0 1.0 0.0 1.0 |

  [Texture Mapping 1]: https://create3000.github.io/media/tutorials/images/texture-mapping-1.png

## Applying texture transforms

Texture transforms translate, rotate, and scale the texture coordinates (placing the cookie cutter):

|                        |                        |
|------------------------|------------------------|
| ![Texture Mapping 2][] | ![Texture Mapping 3][] |

  [Texture Mapping 2]: https://create3000.github.io/media/tutorials/images/texture-mapping-2.png
  [Texture Mapping 3]: https://create3000.github.io/media/tutorials/images/texture-mapping-3.png

## Texturing a face

Bind the texture to a face (stretch the cookie and stick it):

|               |               |
|---------------|---------------|
| ![Cookie 1][] | ![Cookie 2][] |

  [Cookie 1]: https://create3000.github.io/media/tutorials/images/cookie-1.png
  [Cookie 2]: https://create3000.github.io/media/tutorials/images/cookie-2.png

## Working through the texturing process

- Select piece with texture coordinates and indexes
  - Create a cookie cutter
- Transform the texture coordinates
  - Position and orient the cookie cutter
- Bind the texture to a face
  - Stamp out the texture and stick it on a face
- The process is very similar to creating faces!

## Syntax: TextureCoordinate

A [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/) node contains a list of texture coordinates:

### XML Encoding

```x3d
<TextureCoordinate
    point='0.2 0.2, 0.8 0.2, ...'/>
```

### Classic VRML Encoding

```vrml
TextureCoordinate {
  point [ 0.2 0.2, 0.8 0.2, ... ]
}
```

Used as the *texCoord* field value of [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) or [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) nodes.

## Syntax: IndexedFaceSet

An [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) geometry node creates geometry out of faces:

- texCoord and texCoordIndex - specify texture pieces

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <IndexedFaceSet
      texCoordIndex='...'
      coordIndex='...'>
    <TextureCoordinate ... />
    <Coordinate ... />
  </IndexedFaceSet>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry IndexedFaceSet {
    texCoordIndex [ ... ]
    coordIndex [ ... ]
    texCoord TextureCoordinate { ... }
    coord Coordinate { ... }
  }
}
```

## Syntax: ElevationGrid

An [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) geometry node creates terrains:

- *texCoord* - specify texture pieces
- Automatically generated texture coordinate indexes

### XML Encoding

```x3d
<Shape>
  <Appearance><!-- ... --></Appearance>
  <ElevationGrid
      height='...'>
    <TextureCoordinate ... />
  </ElevationGrid>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance { ... }
  geometry ElevationGrid {
    texCoord TextureCoordinate { ... }
    height [ ... ]
  }
}
```

## Syntax: Appearance

An [Appearance](/x_ite/components/shape/appearance/) node describes overall shape appearance:

- *textureTransform* - transform

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material ... />
    <ImageTexture ... />
    <TextureTransform ... />
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { ... }
    texture ImageTexture { ... }
    textureTransform TextureTransform { ... }
  }
  geometry ...
}
```

## Syntax: TextureTransform

A [TextureTransform](/x_ite/components/texturing/texturetransform/) node transforms texture coordinates:

- *translation* - position
- *rotation* - orientation
- *scale* - size

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material ... />
    <ImageTexture ... />
    <TextureTransform
        translation='0.0 0.0'
        rotation='0.0'
        scale='1.0 1.0'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { ... }
    texture ImageTexture { ... }
    textureTransform TextureTransform {
      translation 0.0 0.0
      rotation    0.0
      scale       1.0 1.0
    }
  }
  geometry ...
}
```

## Scaling, rotating, and translating

Scale, Rotate, and Translate a texture cookie cutter one after the other:

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material ... />
    <ImageTexture ... />
    <TextureTransform
        translation='0.0 0.0'
        rotation='0.785'
        scale='8.5 8.5'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { ... }
    texture ImageTexture { ... }
    textureTransform TextureTransform {
      translation 0.0 0.0
      rotation    0.785
      scale       8.5 8.5
    }
  }
  geometry ...
}
```

Read texture transform operations top-down:

- The cookie cutter is translated, rotated, then scaled
  Order is fixed, independent of field order
- This is the reverse of a Transform node

## Summary

- Texture images are in a texture coordinate system
- Texture coordinates and indexes describe a texture cookie cutter
- Texture transforms translate, rotate, and scale place the cookie cutter
- Texture indexes bind the cut-out cookie texture to a face on a shape
