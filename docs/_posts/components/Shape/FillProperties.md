---
title: FillProperties
date: 2023-01-07
nav: components-Shape
categories: [components, Shape]
tags: [FillProperties, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

FillProperties indicates whether appearance is filled or hatched for associated geometry nodes inside the same Shape. Hatches are applied on top of the already rendered appearance of the node, and are not affected by lighting.

The FillProperties node belongs to the **Shape** component and requires at least support level **3,** its default container field is *fillProperties.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + FillProperties
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [filled](#fields-filled) | TRUE |
| SFBool | [in, out] | [hatched](#fields-hatched) | TRUE |
| SFInt32 | [in, out] | [hatchStyle](#fields-hatchStyle) | 1  |
| SFColor | [in, out] | [hatchColor](#fields-hatchColor) | 1 1 1  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **filled** TRUE
{: #fields-filled }

Whether or not associated geometry is *filled*.

### SFBool [in, out] **hatched** TRUE
{: #fields-hatched }

Whether or not associated geometry is *hatched*.

### SFInt32 [in, out] **hatchStyle** 1 <small>[0,∞)</small>
{: #fields-hatchStyle }

*hatchStyle* selects a hatch pattern from ISO/IEC 9973 International Register of Graphical Items. 1=Horizontal equally spaced parallel lines. 2=Vertical equally spaced parallel lines. 3=Positive slope equally spaced parallel lines. 4=Negative slope equally spaced parallel lines. 5=Horizontal/vertical crosshatch. 6=Positive slope/negative slope crosshatch. 7=(cast iron or malleable iron and general use for all materials). 8=(steel). 9=(bronze, brass, copper, and compositions). 10=(white metal, zinc, lead, babbit, and alloys). 11=(magnesium, aluminum, and aluminum alloys). 12=(rubber, plastic, and electrical insulation). 13=(cork, felt, fabric, leather, and fibre). 14=(thermal insulation). 15=(titanium and refi-actory material). 16=(marble, slate, porcelain, glass, etc.). 17=(earth). 18=(sand). 19=(repeating dot).

#### Hint

- [Detailed descriptions of hatchstyle values are found at the ISO/IEC 9973 International Register of Graphical Items](https://www.iso.org/jtc1/sc24/register)

### SFColor [in, out] **hatchColor** 1 1 1 <small>[0,1]</small>
{: #fields-hatchColor }

[Color](/x_ite/components/rendering/color/) of the hatch pattern.

## Advice

### Hint

- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Shape' level='3'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Shape/FillProperties/FillProperties.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/Shape/FillProperties/screenshot.avif" alt="FillProperties"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Shape/FillProperties/FillProperties.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Shape/FillProperties/FillProperties.x3d)
{: .example-links }

## See Also

- [X3D Specification of FillProperties Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#FillProperties)
