---
title: Adding Backgrounds
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Background]
---
## Motivation

- Shapes form the foreground of your scene
- You can add a background to provide context

Backgrounds describe:

- Sky and ground colors
- Panorama images of mountains, cities, etc

Backgrounds are faster to draw than if you used shapes to build them.

## Using the background components

A background creates three special shapes:

- A sky sphere
- A ground hemisphere inside the sky sphere
- A panorama box inside the ground hemisphere

How does the background look like:

- The sky sphere and ground hemisphere are shaded with a color gradient.
- The panorama box is texture mapped with six images.
- Transparent parts of the ground hemisphere reveal the sky sphere
- Transparent parts of the panorama box reveal the ground and sky
- The viewer can look up, down, and side-to-side to see different parts of the background
- The viewer can never get closer to the background

## Syntax: Background

A [Background](/x_ite/components/environmentaleffects/background/) node describes background colors;

- *skyColor* and *skyAngle* - sky gradation
- *groundColor* and *groundAngle* - ground gradation

### XML Encoding

```xml
<Background
    skyColor='0.1 0.1 0.0, ...'
    skyAngle='1.309, 1.571, ...'
    groundColor='0.0 0.2 0.7, ...'
    groundAngle='1.309, 1.571, ...'/>
```

### Classic VRML Encoding

```vrml
Background {
  skyColor    [ 0.1 0.1 0.0, ... ]
  skyAngle    [ 1.309, 1.571, ... ]
  groundColor [ 0.0 0.2 0.7, ... ]
  groundAngle [ 1.309, 1.571, ... ]
}
```

## Using sky angles and colors

- The first sky color is at the north pole
- The remaining sky colors are at given sky angles
  - The maximum angle is 180 degrees = 3.1415 radians (π)
- The last color smears on down to the south pole

## Using ground angles and colors

- The first ground color is at the south pole
- The remaining ground colors are at given ground angles
  - The maximum angle is 90 degrees = 1.5708 radians (π/2)
- After the last color, the rest of the hemisphere is transparent

## A sample background

### XML Encoding

```xml
<Background DEF='Summer'
    skyAngle='0.8,
              1.3,
              1.4,
              1.5708'
    skyColor='0.21 0.31 0.59,
              0.33 0.45 0.7,
              0.57 0.66 0.85,
              0.6 0.73 0.89,
              0.7 0.83 0.98'
    groundAngle='0.659972,
                 1.2,
                 1.39912,
                 1.5708'
    groundColor='0.105712 0.156051 0.297,
                 0.187629 0.255857 0.398,
                 0.33604 0.405546 0.542,
                 0.3612 0.469145 0.602,
                 0.39471 0.522059 0.669'/>
```

### Classic VRML Encoding

```vrml
DEF Summer Background {
  skyAngle [
    0.8,
    1.3,
    1.4,
    1.5708
  ]
  skyColor [
    0.21 0.31 0.59,
    0.33 0.45 0.7,
    0.57 0.66 0.85,
    0.6 0.73 0.89,
    0.7 0.83 0.98
  ]
  groundAngle [
    0.659972,
    1.2,
    1.39912,
    1.5708
  ]
  groundColor [
    0.105712 0.156051 0.297,
    0.187629 0.255857 0.398,
    0.33604 0.405546 0.542,
    0.3612 0.469145 0.602,
    0.39471 0.522059 0.669
  ]
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/background1/background1.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/background1/screenshot.png" alt="Background 1"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/background1/background1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/background1/background1.x3dv)
{: .example-links }

## Syntax: Background

A [Background](/x_ite/components/environmentaleffects/background/) node describes background images:

- *frontUrl,* etc - texture image URLs for box

### XML Encoding

```xml
<Background
    ...
    frontUrl='"cloud1s.png"'
    backUrl='"cloud2s.png"'
    leftUrl='"cloud3s.png"'
    rightUrl='"cloud4s.png"'
    topUrl='"sun.png"'
    bottomUrl='"ground.png"'/>
```

### Classic VRML Encoding

```vrml
Background {
  ...
  frontUrl  "cloud1s.png"
  backUrl   "cloud2s.png"
  leftUrl   "cloud3s.png"
  rightUrl  "cloud4s.png"
  topUrl    "sun.png"
  bottomUrl "ground.png"
}
```

## A sample background image

|                                 |                                        |
|---------------------------------|----------------------------------------|
| ![][1]                          | ![][2]                                 |
| Color portion of clouds texture | Transparency portion of clouds texture |

  [1]: https://create3000.github.io/media/tutorials/images/background-cloud1-color.png
  [2]: https://create3000.github.io/media/tutorials/images/background-cloud1-alpha.png

## A sample background

### XML Encoding

```xml
<!-- no top or bottom images -->
<Background DEF='Summer'
    frontUrl='"clouds1.png"'
    backUrl='"clouds2.png"'
    leftUrl='"clouds3.png"'
    rightUrl='"clouds4.png"'
    skyAngle='0.8,
              1.3,
              1.4,
              1.5708'
    skyColor='0.21 0.31 0.59,
              0.33 0.45 0.7,
              0.57 0.66 0.85,
              0.6 0.73 0.89,
              0.7 0.83 0.98'
    groundAngle='0.659972,
                 1.2,
                 1.39912,
                 1.5708'
    groundColor='0.105712 0.156051 0.297,
                 0.187629 0.255857 0.398,
                 0.33604 0.405546 0.542,
                 0.3612 0.469145 0.602,
                 0.39471 0.522059 0.669'/>
```

### Classic VRML Encoding

```vrml
DEF Summer Background {
  frontUrl "clouds1.png"
  backUrl "clouds2.png"
  leftUrl "clouds3.png"
  rightUrl "clouds4.png"
  skyAngle [
    0.8,
    1.3,
    1.4,
    1.5708
  ]
  skyColor [
    0.21 0.31 0.59,
    0.33 0.45 0.7,
    0.57 0.66 0.85,
    0.6 0.73 0.89,
    0.7 0.83 0.98
  ]
  groundAngle [
    0.659972,
    1.2,
    1.39912,
    1.5708
  ]
  groundColor [
    0.105712 0.156051 0.297,
    0.187629 0.255857 0.398,
    0.33604 0.405546 0.542,
    0.3612 0.469145 0.602,
    0.39471 0.522059 0.669
  ]
  # no top or bottom images
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/background2/background2.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/background2/screenshot.png" alt="Background 1"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/background2/background2.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/background2/background2.x3dv)
{: .example-links }

## Summary

Backgrounds describe:

- Ground and sky color gradients on ground hemisphere and sky sphere
- Panorama images on a panorama box

The viewer can look around, but never get closer to the background.
