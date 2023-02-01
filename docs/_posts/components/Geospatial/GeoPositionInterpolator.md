---
title: GeoPositionInterpolator
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoPositionInterpolator, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoPositionInterpolator animates objects within a geographic coordinate system. GeoPositionInterpolator can contain a GeoOrigin node.

The GeoPositionInterpolator node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + GeoPositionInterpolator
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

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

*set_fraction* selects input key for corresponding keyValue output.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>

Definition parameters for linear-interpolation function time intervals, in increasing order and corresponding to keyValues.

#### Warning

- Number of keys must match number of keyValues!

### MFVec3d [in, out] **keyValue** [ ]

Output values for linear interpolation, each corresponding to time-fraction keys.

#### Warning

- Number of keys must match number of keyValues!

### SFVec3d [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

### SFVec3d [out] **geovalue_changed**

Interpolated coordinate in the geographic coordinate system specified by geoSystem

#### Hint

- Include `<component name='Geospatial' level='1'/>`

## Description

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- Include `<component name='Geospatial' level='1'/>`

## External Links

- [X3D Specification of GeoPositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoPositionInterpolator){:target="_blank"}
