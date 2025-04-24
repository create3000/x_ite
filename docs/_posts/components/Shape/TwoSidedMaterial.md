---
title: TwoSidedMaterial
date: 2023-01-07
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

The TwoSidedMaterial node belongs to the **Shape** component and requires at least support level **4,** its default container field is *material.* It is available from X3D version 3.2 up to 4.0.

>**Deprecated:** This node is **deprecated** as of X3D version 4.0. Future versions of the standard may remove this node.
{: .prompt-danger }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + TwoSidedMaterial
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in, out\] [separateBackColor](#sfbool-in-out-separatebackcolor-false)
- SFFloat \[in, out\] [ambientIntensity](#sffloat-in-out-ambientintensity-02-0-1)
- SFColor \[in, out\] [diffuseColor](#sfcolor-in-out-diffusecolor-08-08-08-0-1)
- SFColor \[in, out\] [specularColor](#sfcolor-in-out-specularcolor-0-0-0-0-1)
- SFColor \[in, out\] [emissiveColor](#sfcolor-in-out-emissivecolor-0-0-0-0-1)
- SFFloat \[in, out\] [shininess](#sffloat-in-out-shininess-02-0-1)
- SFFloat \[in, out\] [transparency](#sffloat-in-out-transparency-0-0-1)
- SFFloat \[in, out\] [backAmbientIntensity](#sffloat-in-out-backambientintensity-02-0-1)
- SFColor \[in, out\] [backDiffuseColor](#sfcolor-in-out-backdiffusecolor-08-08-08-0-1)
- SFColor \[in, out\] [backSpecularColor](#sfcolor-in-out-backspecularcolor-0-0-0-0-1)
- SFColor \[in, out\] [backEmissiveColor](#sfcolor-in-out-backemissivecolor-0-0-0-0-1)
- SFFloat \[in, out\] [backShininess](#sffloat-in-out-backshininess-02-0-1)
- SFFloat \[in, out\] [backTransparency](#sffloat-in-out-backtransparency-0-0-1)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **separateBackColor** FALSE

*separateBackColor* determines whether separate [Material](/x_ite/components/shape/material/) values are used for back faces.

#### Warning

- Backface [Material](/x_ite/components/shape/material/) values are ignored unless you set *separateBackColor*='true'

### SFFloat [in, out] **ambientIntensity** 0.2 <small>[0,1]</small>

How much ambient omnidirectional light is reflected from all light sources. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFColor [in, out] **diffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>

How much direct, angle-dependent light is reflected from all light sources.

#### Hint

- Only emissiveColor affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

### SFColor [in, out] **specularColor** 0 0 0 <small>[0,1]</small>

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off.
- Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout.
- Only *emissiveColor* affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

#### Warning

- Bright *emissiveColor* values can wash out other colors and some textures.

### SFFloat [in, out] **shininess** 0.2 <small>[0,1]</small>

Lower *shininess* values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile

#### Hint

- *transparency* \< .5 opaque, *transparency* \> .5 transparent.

### SFFloat [in, out] **backAmbientIntensity** 0.2 <small>[0,1]</small>

How much ambient omnidirectional light is reflected from all light sources. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFColor [in, out] **backDiffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>

How much direct, angle-dependent light is reflected from all light sources.

#### Hint

- Only emissiveColor affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

### SFColor [in, out] **backSpecularColor** 0 0 0 <small>[0,1]</small>

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFColor [in, out] **backEmissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off.
- Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout.
- Only emissiveColor affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

#### Warning

- Bright emissiveColor values can wash out other colors and some textures.

### SFFloat [in, out] **backShininess** 0.2 <small>[0,1]</small>

Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFFloat [in, out] **backTransparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile

#### Hint

- Transparency \< .5 opaque, transparency \> .5 transparent.

## Advice

### Hints

- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding material.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)
- [X3D Architecture 12.2.3 Two-sided materials](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/shape.html#TwoSidedMaterials)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)

### Warnings

- Requires X3D `profile='Full'` or else include `<component name='Shape' level='4'/>`
- Corresponding geometry within the parent [Shape](/x_ite/components/shape/shape/) must have solid='false' for two-sided rendering, otherwise no reverse-side back geometry is displayed.
- X3D4 Architecture has deprecated TwoSidedMaterial, preferring use of child backMaterial node in parent [Appearance](/x_ite/components/shape/appearance/).

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/TwoSidedMaterial.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/screenshot.avif" alt="TwoSidedMaterial"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/TwoSidedMaterial.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Shape/TwoSidedMaterial/TwoSidedMaterial.x3d)
{: .example-links }

## See Also

- [X3D Specification of TwoSidedMaterial Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#TwoSidedMaterial)
