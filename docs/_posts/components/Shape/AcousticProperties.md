---
title: AcousticProperties
date: 2023-01-31
nav: components-Shape
categories: [components, Shape]
tags: [AcousticProperties, Shape]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

AcousticProperties specifies the interaction of sound waves with characteristics of geometric objects in the scene. Acoustic coefficient values are expected to fully account for physical and structural characteristics of associated geometry such as width, height, thickness, shape, softness and/or hardness, and density variations.

The AcousticProperties node belongs to the **Shape** component and requires at least level **5,** its default container field is *acousticProperties.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + AcousticProperties
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **diffuse** 0 <small>[0,1]</small>

*diffuse* coefficient of sound reflection indicates how much of the incident sound energy is reflected back in multiple directions.

### SFFloat [in, out] **specular** 0 <small>[0,1]</small>

*specular* coefficient of sound reflection striking a plane surface, directly reflected back into space, where angle of reflection equals angle of incidence.

### SFFloat [in, out] **refraction** 0 <small>[0,1]</small>

[Sound](/x_ite/components/sound/sound/) *refraction* coefficient of a medium, which determines change in propagation direction of sound wave when obliquely crossing boundary between two mediums where its speed is different.

#### Hint

- [Relationships described by Snell's Law](https://en.wikipedia.org/wiki/Snell%27s_law)

### SFFloat [in, out] **absorption** 0 <small>[0,1]</small>

Specifies the sound *absorption* coefficient of a surface, meaning the ratio of sound intensity not reflected by a surface.

## Advice

### Hints

- AcousticProperties must have a parent [Appearance](/x_ite/components/shape/appearance/) node, and only affects geometry within the same [Shape](/x_ite/components/shape/shape/).
- Proxy geometry for acoustic response can be far simpler than geometry needed for visual rendering.
- [X3D Architecture Figure 16.2 Sound Propagation Phenomena](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/sound.html#f-SoundPropagationPhenomena

## See Also

- [X3D Specification of AcousticProperties Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#AcousticProperties)
