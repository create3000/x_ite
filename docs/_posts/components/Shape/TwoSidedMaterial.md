---
title: TwoSidedMaterial
date: 2022-01-07
nav: components-Shape
categories: [components, Shape]
tags: [TwoSidedMaterial, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TwoSidedMaterial specifies surface rendering properties for associated geometry nodes, for outer (front) and inner (back) sides of polygons. Material attributes are used by the X3D lighting equations during rendering.

The TwoSidedMaterial node belongs to the **Shape** component and its default container field is *material.* It is available since X3D version 3.2 or later.

>Deprecated: This node is deprecated since X3D version 4.0. Future versions of the standard may remove this node.
{: .prompt-danger }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + TwoSidedMaterial
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **separateBackColor** FALSE

*separateBackColor* determines whether separate Material values are used for back faces.

#### Warning

- Backface Material values are ignored unless you set separateBackColor='true'

### SFFloat [in, out] **ambientIntensity** 0.2 <small>[0,1]</small>

How much ambient omnidirectional light is reflected from all light sources. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFColor [in, out] **diffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>

How much direct, angle-dependent light is reflected from all light sources.

#### Hints

- Only emissiveColor affects IndexedLineSet, LineSet and PointSet. If a texture is present the diffuseColor is always multiplied with the texture color, in contrast to the specification. Set diffuseColor to (1 1 1) to get maximum texture color intensity.

### SFColor [in, out] **specularColor** 0 0 0 <small>[0,1]</small>

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off. Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout. Only emissiveColor affects IndexedLineSet, LineSet and PointSet.

#### Warning

- Bright emissiveColor values can wash out other colors and some textures.

### SFFloat [in, out] **shininess** 0.2 <small>[0,1]</small>

Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque.

#### Interchange profile hint:

Transparency < .5 opaque, transparency > .5 transparent.

#### Hint

- If a texture is present the transparency is always multiplied with the texture's transparency, in contrast to the specification. Set transparency to (0) to get a full opaque texture color.

### SFFloat [in, out] **backAmbientIntensity** 0.2 <small>[0,1]</small>

How much ambient omnidirectional light is reflected from all light sources. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFColor [in, out] **backDiffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>

How much direct, angle-dependent light is reflected from all light sources.

#### Hints

- Only emissiveColor affects IndexedLineSet, LineSet and PointSet. If a texture is present the diffuseColor is always multiplied with the texture color, in contrast to the specification. Set diffuseColor to (1 1 1) to get maximum texture color intensity.

### SFColor [in, out] **backSpecularColor** 0 0 0 <small>[0,1]</small>

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFColor [in, out] **backEmissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off. Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout. Only emissiveColor affects IndexedLineSet, LineSet and PointSet.

#### Warning

- Bright emissiveColor values can wash out other colors and some textures.

### SFFloat [in, out] **backShininess** 0.2 <small>[0,1]</small>

Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFFloat [in, out] **backTransparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque.

#### Interchange profile hint

Transparency < .5 opaque, transparency > .5 transparent.

#### Hint

- If a texture is present the transparency is always multiplied with the texture's transparency, in contrast to the specification. Set transparency to (0) to get a full opaque texture color.

## Description

### Hints

- Include `<component name='Shape' level='4'/>`
- Insert Shape and Appearance nodes before adding material.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/TwoSidedMaterial.x3d"></x3d-canvas>

## External Links

- [X3D Specification of TwoSidedMaterial](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#TwoSidedMaterial){:target="_blank"}
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}
