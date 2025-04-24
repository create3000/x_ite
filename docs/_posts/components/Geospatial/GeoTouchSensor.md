---
title: GeoTouchSensor
date: 2023-01-07
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

The GeoTouchSensor node belongs to the **Geospatial** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

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

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFNode | [ ] | [geoOrigin](#fields-geoOrigin) | NULL  |
| MFString | [ ] | [geoSystem](#fields-geoSystem) | [ "GD", "WE" ] |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFVec2f | [out] | [hitTexCoord_changed](#fields-hitTexCoord_changed) |  |
| SFVec3f | [out] | [hitNormal_changed](#fields-hitNormal_changed) |  |
| SFVec3f | [out] | [hitPoint_changed](#fields-hitPoint_changed) |  |
| SFVec3d | [out] | [hitGeoCoord_changed](#fields-hitGeoCoord_changed) |  |
| SFBool | [out] | [isOver](#fields-isOver) |  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFTime | [out] | [touchTime](#fields-touchTime) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of this node.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>
{: #fields-geoOrigin }

Single contained [GeoOrigin](/x_ite/components/geospatial/geoorigin/) node that can specify a local coordinate frame for extended precision.

#### Hint

- [X3D Architecture 25.2.5 Dealing with high-precision coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#high-precisioncoords)

#### Warning

- XML validation requires placement as first child node following contained metadata nodes (if any).

### MFString [ ] **geoSystem** [ "GD", "WE" ]
{: #fields-geoSystem }

Identifies spatial reference frame: Geodetic (G D), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Spatialreferenceframes)
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Specifyinggeospatialcoords)
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFVec2f [out] **hitTexCoord_changed**
{: #fields-hitTexCoord_changed }

Output event containing texture coordinates of surface at the hitGeoCoordinate.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **hitNormal_changed**
{: #fields-hitNormal_changed }

Output event containing surface normal vector at the hitGeoCoordinate.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **hitPoint_changed**
{: #fields-hitPoint_changed }

Output event containing 3D point on surface of underlying geometry, given in geometry coordinates (not geographic coordinates).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3d [out] **hitGeoCoord_changed**
{: #fields-hitGeoCoord_changed }

Output event containing 3D point on surface of underlying geometry, given in GeoTouchSensor's local coordinate system.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isOver**
{: #fields-isOver }

Is pointing device over sensor's geometry?.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isActive**
{: #fields-isActive }

Select geometry by activating the pointing device (for example, clicking the mouse) to generate *isActive* events. Output event *isActive*=true is sent when geometry is selected (for example, when primary mouse button is pressed), output event *isActive*=false is sent when geometry is deselected (for example, when primary mouse button is released).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **touchTime**
{: #fields-touchTime }

Time event generated when touched.

#### Hint

- *touchTime* event is generated when following three conditions are all met: (a) pointing device was pointing towards geometry when initially activated (isActive=true), (b) pointing device is currently pointing towards the geometry (isOver=true), and (c) pointing device selection is deactivated/deselected by user (isActive=false event is also generated).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- This sensor detects user interactions affecting peer nodes and their child geometry.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## See Also

- [X3D Specification of GeoTouchSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoTouchSensor)
