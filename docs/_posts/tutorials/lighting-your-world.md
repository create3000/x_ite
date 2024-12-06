---
title: Lighting Your World
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Lighting, World]
---
## Motivation

- By default, you have one light in the scene, attached to your head
- For more realism, you can add multiple lights
  - Suns, light bulbs, candles
  - Flashlights, spotlights, firelight
- Lights can be positioned, oriented, and colored
- Lights do not cast shadows

## Using types of lights

There are three types of X3D lights:

- Point lights - radiate in all directions from a point
- Directional lights - aim in one direction from infinitely far away
- Spot lights - aim in one direction from a point, radiating in a cone

## Using common lighting features

All lights have several common fields:

- *on* - turn it on or off
- *intensity* - control brightness
- *ambientIntensity* - control ambient effect
- *color* - select color

Point lights and spot lights also have:

- *location* - position
- *radius* - maximum lighting distance
- *attenuation* - drop off with distance

Directional lights and spot lights also have:

- *direction* - aim direction

## Syntax: PointLight

A [PointLight](/x_ite/components/lighting/pointlight/) node illuminates radially from a point:

### XML Encoding

```x3d
<PointLight
    location='0.0 0.0 0.0'
    intensity='1.0'
    color='1.0 1.0 1.0'/>
```

### Classic VRML Encoding

```vrml
PointLight {
  location  0.0 0.0 0.0
  intensity 1.0
  color     1.0 1.0 1.0
}
```

## Syntax: DirectionalLight

A [DirectionalLight](/x_ite/components/lighting/directionallight/) node illuminates in one direction from infinitely far away:

### XML Encoding

```x3d
<DirectionalLight
    direction='1.0 0.0 0.0'
    intensity='1.0'
    color='1.0 1.0 1.0'/>
```

### Classic VRML Encoding

```vrml
DirectionalLight {
  direction 1.0 0.0 0.0
  intensity 1.0
  color     1.0 1.0 1.0
}
```

## Syntax: SpotLight

A [SpotLight](/x_ite/components/lighting/spotlight/) node illuminates from a point, in one direction, within a cone:

### XML Encoding

```x3d
<SpotLight
    location='0.0 0.0 0.0'
    direction='1.0 0.0 0.0'
    intensity='1.0'
    color='1.0 1.0 1.0'
    cutOffAngle='0.785'/>
```

### Classic VRML Encoding

```vrml
SpotLight {
  location    0.0 0.0 0.0
  direction   1.0 0.0 0.0
  intensity   1.0
  color       1.0 1.0 1.0
  cutOffAngle 0.785
}
```

- The maximum width of a spot light's cone is controlled by the cutOffAngle field
- An inner cone region with constant brightness is controlled by the beamWidth field

### XML Encoding

```x3d
<SpotLight
    ...
    cutOffAngle='0.785'
    beamWidth='0.52'/>
```

### Classic VRML Encoding

```vrml
SpotLight {
  ...
  cutOffAngle 0.785
  beamWidth   0.52
}
```

## Summary

- There are three types of lights: point, directional, and spot
- All lights have an on/off, intensity, ambient effect, and color
- Point and spot lights have a location, radius, and attenuation
- Directional and spot lights have a direction
