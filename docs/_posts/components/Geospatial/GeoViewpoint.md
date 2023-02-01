---
title: GeoViewpoint
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoViewpoint, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoViewpoint specifies viewpoints using geographic coordinates. GeoViewpoint can contain a GeoOrigin node. Since GeoViewpoint must navigate smoothly inside a curved geographic coordinate system, it includes both Viewpoint and NavigationInfo attributes.

The GeoViewpoint node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DViewpointNode
        + GeoViewpoint
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

### SFBool [in] **set_bind**

Set_bind true makes this node active, set_bind false makes this node inactive.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hints

- Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFVec3d [in, out] **position** 0 0 100000 <small>(-∞,∞)</small>

Position relative to local georeferenced coordinate system, in proper format

### SFRotation [in, out] **orientation** 0 0 1 0 <small>(-∞,∞) or -1 1</small>

Rotation of Viewpoint, relative to default -Z axis direction in local coordinate system.

#### Hint

- This is orientation \_change\_ from default direction (0 0 -1) +Y axis is the up vector for the local area (the normal to the tangent plane on the ellipsoid), -Z points towards the north pole, and +X is east 1 0 0 -1.570796 always looks down.

### SFVec3d [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>

CenterOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### SFFloat [in, out] **fieldOfView** π/4 <small>(0,π)</small>

Preferred minimum viewing angle from this viewpoint in radians. Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

### SFBool [in, out] **jump** TRUE

Whether to transition instantly by jumping, or else smoothly animate to this Viewpoint.

### SFBool [in, out] **retainUserOffsets** FALSE

Input/Output field retainUserOffsets.

### SFFloat [ ] **speedFactor** 1 <small>[0,∞)</small>

SpeedFactor is a multiplier to modify the original elevation-based speed that is set automatically by the browser.

#### Hint

- SpeedFactor is a relative value and not an absolute speed as defined by NavigationInfo.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

## Description

### Hint

- Include `<component name='Geospatial' level='1'/>`

### Warning

- The navType and headlight fields were removed as part of X3D version 3.3, instead use a NavigationInfo node for those fields.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/GeoViewpoint.x3d"></x3d-canvas>

## External Links

- [X3D Specification of GeoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoViewpoint){:target="_blank"}
