---
title: GeoLocation
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoLocation, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoLocation positions a regular X3D model onto earth's surface. GeoLocation can contain children and GeoOrigin nodes.

The GeoLocation node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + GeoLocation
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>

Field geoOrigin.

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

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Input/Output field children.

## Description

### Hint

- Include `<component name='Geospatial' level='1'/>`

### Warning

- Avoid having GeoLocation or GeoTransform as a parent of ancestor node, since multiple geospatial transformations then occur with unpredictable results.

## External Links

- [X3D Specification of GeoLocation](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoLocation){:target="_blank"}
