---
title: GeoProximitySensor
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoProximitySensor, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box).

The GeoProximitySensor node belongs to the **Geospatial** component and its container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DEnvironmentalSensorNode
        + GeoProximitySensor
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

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

Size of Proximity box.

#### Hint

Size 0 0 0 is same as enabled false.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞) (starting with vs. 3.3)</small>

(starting with v3.3) Position offset from origin of local coordinate system.

### SFBool [out] **isActive**

IsActive true/false events are sent as viewer enters/exits Proximity box. isActive=true when viewer enters Proximity box, isActive=false when viewer exits Proximity box.

### SFTime [out] **enterTime**

Time event generated when user's camera enters the box.

### SFTime [out] **exitTime**

Time event generated when user's camera exits the box.

### SFVec3d [out] **geoCoord_changed**

Output field geoCoord_changed.

### SFVec3f [out] **position_changed**

Sends translation event relative to center.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center.

### SFVec3f [out] **centerOfRotation_changed**

Sends changed centerOfRotation values, likely caused by user interaction.

## Description

### Hints

- Multiple USEd instances are cumulative, but avoid overlaps.
- Can first use GeoTransform to relocate/reorient box.
- Surround entire world to start behaviors once scene is loaded.
- Include `<component name='Geospatial' level='2'/>`

## External Links

- [X3D Specification of GeoProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoProximitySensor){:target="_blank"}
