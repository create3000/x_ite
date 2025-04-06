---
title: GeoOrigin
date: 2023-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoOrigin, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoOrigin specifies local geospatial coordinate system for parent node, enabling increased geographic precision during scene rendering (by mitigating potential floating-point roundoff errors). GeoOrigin can be contained by other Geospatial component nodes, typically via DEF/USE to ensure consistency.

The GeoOrigin node belongs to the **Geospatial** component and requires at least level **1,** its default container field is *geoOrigin.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + GeoOrigin
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Spatialreferenceframes)
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Specifyinggeospatialcoords)
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

### SFVec3d [in, out] **geoCoords** 0 0 0 <small>(-∞,∞)</small>

Defines absolute geographic location (and implicit local coordinate frame).

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

### SFBool [ ] **rotateYUp** FALSE

Whether to rotate coordinates of nodes using this GeoOrigin so that local-up direction aligns with VRML Y axis *rotateYUp* false means local up-direction is relative to planet surface *rotateYUp* true allows proper operation of [NavigationInfo](/x_ite/components/navigation/navigationinfo/) modes FLY, WALK.

## Advice

### Hints

- Only one geospatial coordinate system is allowed per scene, thus DEF-ing and later USE-ing only one GeoOrigin node per scene is recommended.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)
- GeoOrigin is likely to be restored in X3D v4.0 for special use on devices with limited floating-point resolution.
- [X3D Architecture 25.2.5 Dealing with high-precision coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#high-precisioncoords)

### Warnings

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`
- GeoOrigin is deprecated, discouraged and not legal in X3D v3.3. GeoOrigin can be ignored in X3D v3.2 and below.
- XML validation requires placement as first child node following contained metadata nodes (if any).

## See Also

- [X3D Specification of GeoOrigin Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoOrigin)
