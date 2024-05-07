---
title: Adding Fog
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Fog]
---
## Motivation

Fog increases realism:

- Add fog outside to create hazy worlds
- Add fog inside to create dark dungeons
- Use fog to set a mood

The further the viewer can see, the more you have to model and draw. To reduce development time and drawing time, limit the viewer's sight by using fog.

## Using fog visibility controls

The fog type selects linear or exponential visibility reduction with distance:

- Linear is easier to control
- Exponential is more realistic and »thicker«

The visibility range selects the distance where the fog reaches maximum thickness:

- Fog is »clear« at the viewer, and gradually reduces visibility

## Selecting a fog color

- Fog has a fog color
  - White is typical, but black, red, etc. also possible
- Shapes are faded to the fog color with distance
- The background is unaffected
  - For the best effect, make the background the fog color

## Syntax: Fog

A [Fog](/x_ite/components/environmentaleffects/fog/) node creates colored fog

- *color* - fog color
- *fogType* - **LINEAR** or **EXPONENTIAL**
- *visibilityRange* - maximum visibility limit

### XML Encoding

```xml
<Fog
    color='1.0 1.0 1.0'
    fogType='LINEAR'
    visibilityRange='10.0'/>
```

### Classic Encoding

```js
Fog {
  color 1.0 1.0 1.0
  fogType "LINEAR"
  visibilityRange 10.0
}
```

## Summary

- Fog has a color, a type, and a visibility range
- Fog can be used to set a mood, even indoors

Fog limits the viewer's sight:

- Reduces the amount of the world you have to build
- Reduces the amount of the world that must be drawn
