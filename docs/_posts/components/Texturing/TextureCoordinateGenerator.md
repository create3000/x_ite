---
title: TextureCoordinateGenerator
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [TextureCoordinateGenerator, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureCoordinateGenerator computes 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces).

The TextureCoordinateGenerator node belongs to the **Texturing** component and requires at least support level **2,** its default container field is *texCoord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + X3DSingleTextureCoordinateNode
        + TextureCoordinateGenerator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **mapping** ""

The *mapping* label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node *mapping* validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFString [in, out] **mode** "SPHERE" <small>["SPHERE"|"CAMERASPACENORMAL"|"CAMERASPACEPOSITION"|"CAMERASPACEREFLECTIONVECTOR"|"SPHERE-LOCAL"|"COORD"|"COORD-EYE"|"NOISE"|"NOISE-EYE"|"SPHERE-REFLECT"|"SPHERE-REFLECT-LOCAL"]</small>

Parameter field defines the algorithm used to compute texture coordinates.

#### Hint

- [X3D Architecture Table 18.6 Texture coordinate generation modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-Texturecoordgeneration) for further details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFFloat [in, out] **parameter** [ ]

*parameter* array contains scale and translation (x y z) values for Perlin NOISE mode, *parameter*[0] contains index of refraction for SPHERE-REFLECT mode, *parameter*[0] contains index of refraction and *parameter*[1 to 3] contains the eye point in local coordinates for SPHERE-REFLECT-LOCAL mode.

## Advice

### Hints

- Add [Shape](/x_ite/components/shape/shape/) and then polygonal/planar geometry before adding TextureCoordinateGenerator.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Texturing component Figure 18.1, Texture map coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#f-TextureMapCoordSystem)

## See Also

- [X3D Specification of TextureCoordinateGenerator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureCoordinateGenerator)
