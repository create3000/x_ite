---
title: GeoTouchSensor
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoTouchSensor, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoTouchSensor returns geographic coordinates for the object being selected. GeoTouchSensor can contain a GeoOrigin node.

The GeoTouchSensor node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPointingDeviceSensorNode
        + X3DTouchSensorNode
          + GeoTouchSensor
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

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hints

- Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec2f [out] **hitTexCoord_changed**

Output event containing texture coordinates of surface at the hitGeoCoordinate.

### SFVec3f [out] **hitNormal_changed**

Output event containing surface normal vector at the hitGeoCoordinate.

### SFVec3f [out] **hitPoint_changed**

Output event containing 3D point on surface of underlying geometry, given in geometry coordinates (not geographic coordinates).

### SFVec3d [out] **hitGeoCoord_changed**

Output event containing 3D point on surface of underlying geometry, given in GeoTouchSensor's local coordinate system.

### SFBool [out] **isOver**

Is pointing device over sensor's geometry?.

### SFBool [out] **isActive**

Select geometry by activating the pointing device (e.g. clicking the mouse) to generate isActive events. Output event isActive=true is sent when geometry is selected (e.g. when primary mouse button is pressed), output event isActive=false is sent when geometry is deselected (e.g. when primary mouse button is released).

### SFTime [out] **touchTime**

Time event generated when touched.

#### Hint

- TouchTime event is generated when following three conditions are all met: (a) pointing device was pointing towards geometry when initially activated (isActive=true), (b) pointing device is currently pointing towards the geometry (isOver=true), and (c) pointing device selection is deactivated/deselected by user (isActive=false event is also generated).

## Description

### Hints

- This sensor detects user interactions affecting peer nodes and their child geometry.
- Include `<component name='Geospatial' level='1'/>`

## External Links

- [X3D Specification of GeoTouchSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoTouchSensor){:target="_blank"}
