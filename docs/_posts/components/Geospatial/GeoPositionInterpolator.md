---
title: GeoPositionInterpolator
date: 2023-01-07
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

The GeoPositionInterpolator node belongs to the [Geospatial](/x_ite/components/overview/#geospatial) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInterpolatorNode
      + GeoPositionInterpolator
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFNode | [ ] | [geoOrigin](#fields-geoOrigin) | NULL  |
| MFString | [ ] | [geoSystem](#fields-geoSystem) | [ "GD", "WE" ] |
| SFFloat | [in] | [set_fraction](#fields-set_fraction) |  |
| MFFloat | [in, out] | [key](#fields-key) | [ ] |
| MFVec3d | [in, out] | [keyValue](#fields-keyValue) | [ ] |
| SFVec3f | [out] | [value_changed](#fields-value_changed) |  |
| SFVec3d | [out] | [geovalue_changed](#fields-geovalue_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>
{: #fields-geoOrigin }

Single contained [GeoOrigin](/x_ite/components/geospatial/geoorigin/) node that can specify a local coordinate frame for extended precision.

#### Hint

- [X3D Architecture 25.2.5 Dealing with high-precision coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#high-precisioncoords)

#### Warning

- XML validation requires placement as first child node following contained metadata nodes (if any).

### MFString [ ] **geoSystem** [ "GD", "WE" ]
{: #fields-geoSystem }

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Spatialreferenceframes)
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Specifyinggeospatialcoords)
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>
{: #fields-set_fraction }

*set_fraction* selects input key for corresponding keyValue output.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFFloat [in, out] **key** [ ] <small>(-∞,∞)</small>
{: #fields-key }

Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.

#### Hint

- Typical interval for values in *key* array is within range of 0 to 1, but larger intervals can be defined with arbitrary bounds.

#### Warnings

- Number of keys must match number of keyValues!
- Values in *key* array shall be monotonically non-decreasing, meaning that each value is greater than or equal to the preceding value.

### MFVec3d [in, out] **keyValue** [ ]
{: #fields-keyValue }

Output values for linear interpolation, each corresponding to an input-fraction value in the key array.

#### Hint

- [Identical adjacent entries in *keyValue* array have the effect of defining constant-value step functions.](https://en.wikipedia.org/wiki/Step_function)

#### Warning

- Number of keys must match number of keyValues!

### SFVec3f [out] **value_changed**
{: #fields-value_changed }

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

#### Hint

- X3D players might not send unchanging intermediate values, thus avoiding excessive superfluous events that have no effect.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3d [out] **geovalue_changed**
{: #fields-geovalue_changed }

Interpolated coordinate in the geographic coordinate system specified by geoSystem

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warnings

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Typical input connection is ROUTE someTimeSensorDEF.fraction_changed TO thisInterpolatorDEF.set_fraction
- Typical output connection is ROUTE thisInterpolatorDEF.value_changed TO someDestinationNodeDEF.set_someAttribute.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## See Also

- [X3D Specification of GeoPositionInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoPositionInterpolator)
