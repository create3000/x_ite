---
title: GeoCoordinate
date: 2022-01-07
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

The GeoCoordinate node belongs to the **Geospatial** component and its default container field is *coord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + GeoCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>

Field geoOrigin.

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Warning

- Deprecated values are GDC (use GD) and GCC (use GC).

#### See Also

- [See X3D Specification 25.2.2 Spatial reference frames](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#Spatialreferenceframes){:target="_blank"}
- [See X3D Specification 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#Specifyinggeospatialcoords){:target="_blank"}
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system){:target="_blank"}

### MFVec3d [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of actual 3D geographic coordinates, provided in geoSystem format can split strings if desired: "x1 y1 z1 x2 y2 z2" or "x1 y1 z1", "x2 y2 z2"

## Description

### Hint

- Include `<component name='Geospatial' level='1'/>`

## External Links

- [X3D Specification of GeoCoordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoCoordinate){:target="_blank"}
