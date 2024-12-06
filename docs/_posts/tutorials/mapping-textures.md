---
title: Mapping Textures
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Mapping, Textures]
---
## Motivation

You can model every tiny texture detail of a world using a vast number of colored faces:

- Takes a long time to write the X3D
- Takes a long time to draw

Use a trick instead:

- Take a picture of the real thing
- Paste that picture on the shape, like sticking on a decal

This technique is called Texture Mapping

## Using image textures

Image texture:

- Uses a single image from a file in one of these formats:

|      |                                                                                                                              |
|------|------------------------------------------------------------------------------------------------------------------------------|
| GIF  | 8-bit lossless compressed images 1 transparency color                                                                        |
| JPEG | Usually a poor choice for texture mapping 8-bit thru 24-bit lossy compressed images No transparency support                  |
| PNG  | An adequate choice for texture mapping 8-bit thru 24-bit lossless compressed images 8-bit transparency per pixel Best choice |

## Using pixel textures

Pixel texture:

- A single image, given in the VRML file itself
- The image is encoded using hex
  - Up to 10 bytes per pixel
  - Very inefficient
  - Only useful for very small textures
  - Stripes
  - Checkerboard patterns

## Using movie textures

Movie texture:

- A movie from an MP4 file
- The movie plays back on the textured shape

## Syntax: Appearance

An [Appearance](/x_ite/components/shape/appearance/) node describes overall shape appearance:

- *texture* - texture source

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material ... />
    <ImageTexture ... />
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
  }
  geometry ...
}
```

## Syntax: ImageTexture

An [ImageTexture](/x_ite/components/texturing/imagetexture/) node selects a texture image for texture mapping:

- *url* - texture image file URL

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material/>
    <ImageTexture
        url='"wood.jpg"'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { }
    texture ImageTexture {
      url "wood.jpg"
    }
  }
  geometry ...
}
```

## Syntax: PixelTexture

A [PixelTexture](/x_ite/components/texturing/pixeltexture/) node specifies texture image pixels for texture mapping:

- *image* - texture image pixels
- Image data - width, height, bytes/pixel, pixel values

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material/>
    <PixelTexture
        image='2 1 3
          0xFFFF00 0xFF0000'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { }
    texture PixelTexture {
      image 2 1 3
        0xFFFF00 0xFF0000
    }
  }
  geometry ...
}
```

## Syntax: MovieTexture

A [MovieTexture](/x_ite/components/texturing/movietexture/) node selects a texture movie for texture mapping:

- *url* - texture movie file URL
- When to play the movie, and how quickly (like a TimeSensor node)

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material/>
    <MovieTexture
        url='"movie.mp4"'
        loop='true'
        speed='1.0'
        startTime='0.0'
        stopTime='0.0'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { }
    texture MovieTexture {
      url "movie.mp4"
      loop TRUE
      speed 1.0
      startTime 0.0
      stopTime 0.0
    }
  }
  geometry ...
}
```

## Using materials with textures

- Color textures override the color in a [Material](/x_ite/components/shape/material/) node
- Grayscale textures multiply with the Material node color
  - Good for colorizing grayscale textures
- If there is no Material node, the texture is applied emissively

## Using transparent textures

Texture images can include color and transparency values for each pixel:

- Pixel transparency is also known as alpha

Pixel transparency enables you to make parts of a shape transparent:

- Windows, grillwork, holes
- Trees, clouds

## Summary

- A texture is like a decal pasted to a shape
- Specify the texture using an [ImageTexture](/x_ite/components/texturing/imagetexture/), [PixelTexture](/x_ite/components/texturing/pixeltexture/), or [MovieTexture](/x_ite/components/texturing/movietexture/) node in an [Appearance](/x_ite/components/shape/appearance/) node
- Color textures override material, grayscale textures multiply
- Textures with transparency create holes
