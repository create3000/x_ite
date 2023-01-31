---
title: GeoOrigin
date: 2022-01-07
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

GeoOrigin specifies a local coordinate system for increased geographic precision.

The GeoOrigin node belongs to the **Geospatial** component and its default container field is *geoOrigin.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + GeoOrigin
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Warning

Deprecated values are GDC (use GD) and GCC (use GC).

#### See Also

- [See X3D Specification 25.2.2 Spatial reference frames](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#Spatialreferenceframes){:target="_blank"}
- [See X3D Specification 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#Specifyinggeospatialcoords){:target="_blank"}
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system){:target="_blank"}

### SFVec3d [in, out] **geoCoords** 0 0 0 <small>(-∞,∞)</small>

Input/Output field geoCoords.

### SFBool [ ] **rotateYUp** FALSE

Whether to rotate coordinates of nodes using this GeoOrigin so that local-up direction aligns with VRML Y axis rotateYUp false means local up-direction is relative to planet surface rotateYUp true allows proper operation of NavigationInfo modes FLY, WALK.

## Description

### Hints

- Only one coordinate system allowed per scene thus USE-ing only one GeoOrigin node per scene is recommended.
- Include `<component name='Geospatial' level='1'/>`
- GeoOrigin is likely to be restored in X3D v4.0 for special use on devices with limited floating-point resolution.

Warning
-------

- GeoOrigin is deprecated and discouraged (but nevertheless allowed) in X3D v3.3.

## External Links

- [X3D Specification of GeoOrigin](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoOrigin){:target="_blank"}
