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

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/geospatial.html#Spatialreferenceframes){:target="_blank"}
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/geospatial.html#Specifyinggeospatialcoords){:target="_blank"}
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system){:target="_blank"}

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

### SFVec3d [in, out] **geoCoords** 0 0 0 <small>(-∞,∞)</small>

Defines absolute geographic location (and implicit local coordinate frame).

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf){:target="_blank"}

#### Warning

- Requires X3D profile='Full' or else include \<component name='Geospatial' level='1'/\>

### SFBool [ ] **rotateYUp** FALSE

Whether to rotate coordinates of nodes using this GeoOrigin so that local-up direction aligns with VRML Y axis *rotateYUp* false means local up-direction is relative to planet surface *rotateYUp* true allows proper operation of NavigationInfo modes FLY, WALK.

## Description

### Hints

- Only one coordinate system allowed per scene thus USE-ing only one GeoOrigin node per scene is recommended.
- Include `<component name='Geospatial' level='1'/>`
- GeoOrigin is likely to be restored in X3D v4.0 for special use on devices with limited floating-point resolution.

### Warning

- GeoOrigin is deprecated and discouraged (but nevertheless allowed) in X3D v3.3.

## External Links

- [X3D Specification of GeoOrigin](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoOrigin){:target="_blank"}
