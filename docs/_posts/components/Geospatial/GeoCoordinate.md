---
title: GeoCoordinate
date: 2023-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoCoordinate, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoCoordinate builds geometry as a set of geographic 3D coordinates. These are transformed into a geocentric, curved-earth representation. GeoCoordinate is only used by IndexedFaceSet, IndexedLineSet, LineSet and PointSet. GeoCoordinate can contain a GeoOrigin node.

The GeoCoordinate node belongs to the **Geospatial** component and requires at least support level **1,** its default container field is *coord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + GeoCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>

Single contained [GeoOrigin](/x_ite/components/geospatial/geoorigin/) node that can specify a local coordinate frame for extended precision.

#### Hint

- [X3D Architecture 25.2.5 Dealing with high-precision coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#high-precisioncoords)

#### Warning

- XML validation requires placement as first child node following contained metadata nodes (if any).

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Spatialreferenceframes)
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Specifyinggeospatialcoords)
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

### MFVec3d [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of actual 3D geographic coordinates, provided in geoSystem format can split strings if desired: "x1 y1 z1 x2 y2 z2" or "x1 y1 z1", "x2 y2 z2"

## Advice

### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## See Also

- [X3D Specification of GeoCoordinate Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoCoordinate)
