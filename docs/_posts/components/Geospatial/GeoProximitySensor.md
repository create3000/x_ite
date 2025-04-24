---
title: GeoProximitySensor
date: 2023-01-07
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

The GeoProximitySensor node belongs to the **Geospatial** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DEnvironmentalSensorNode
        + GeoProximitySensor
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFString | \[in, out\] | [description](#sfstring-in-out-description-) | "" |
| SFNode | \[ \] | [geoOrigin](#sfnode---geoorigin-null-geoorigin-deprecated) | NULL  |
| MFString | \[ \] | [geoSystem](#mfstring---geosystem--gd-we-) | \[ "GD", "WE" \] |
| SFBool | \[in, out\] | [enabled](#sfbool-in-out-enabled-true) | TRUE |
| SFVec3f | \[in, out\] | [size](#sfvec3f-in-out-size-0-0-0-0) | 0 0 0  |
| SFVec3d | \[in, out\] | [center](#sfvec3d-in-out-center-0-0-0---starting-with-vs-33) | 0 0 0  |
| SFVec3d | \[in, out\] | [geoCenter](#sfvec3d-in-out-geocenter-0-0-0--) | 0 0 0  |
| SFBool | \[out\] | [isActive](#sfbool-out-isactive) |  |
| SFTime | \[out\] | [enterTime](#sftime-out-entertime) |  |
| SFTime | \[out\] | [exitTime](#sftime-out-exittime) |  |
| SFVec3d | \[out\] | [geoCoord_changed](#sfvec3d-out-geocoord_changed) |  |
| SFVec3f | \[out\] | [position_changed](#sfvec3f-out-position_changed) |  |
| SFRotation | \[out\] | [orientation_changed](#sfrotation-out-orientation_changed) |  |
| SFVec3f | \[out\] | [centerOfRotation_changed](#sfvec3f-out-centerofrotation_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

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

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **size** 0 0 0 <small>[0,∞)</small>

*size* of Proximity box around center location, oriented within local transformation frame.

#### Hint

- *size* 0 0 0 is same as enabled false.

### SFVec3d [in, out] **center** 0 0 0 <small>(-∞,∞) (starting with vs. 3.3)</small>

Position offset from origin of local coordinate system.

### SFVec3d [in, out] **geoCenter** 0 0 0 <small>(-∞,∞)</small>

Position offset from origin of local coordinate system.

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

### SFBool [out] **isActive**

*isActive* true/false events are sent as viewer enters/exits Proximity box. *isActive*=true when viewer enters Proximity box, *isActive*=false when viewer exits Proximity box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **enterTime**

Time event generated when user's camera enters the box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **exitTime**

Time event generated when user's camera exits the box.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3d [out] **geoCoord_changed**

Sends geospatial coordinates of viewer's position corresponding to world position returned by position_changed.

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warnings

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **position_changed**

Sends translation event relative to center.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFRotation [out] **orientation_changed**

Sends rotation event relative to center.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **centerOfRotation_changed**

Sends changed centerOfRotation values, likely caused by user interaction.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Multiple USEd instances are cumulative, but avoid overlaps.
- Can first use [GeoTransform](/x_ite/components/geospatial/geotransform/) to relocate/reorient box.
- Surround entire world to start behaviors once scene is loaded.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='2'/>`

## See Also

- [X3D Specification of GeoProximitySensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoProximitySensor)
