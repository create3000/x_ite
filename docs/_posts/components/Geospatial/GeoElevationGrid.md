---
title: GeoElevationGrid
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoElevationGrid, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. Vertices corresponding to GeoElevationGrid height values define quadrilaterals, which are placed above or below a curved geospatial surface using geographic coordinates.

The GeoElevationGrid node belongs to the **Geospatial** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + GeoElevationGrid
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

### SFVec3d [ ] **geoGridOrigin** 0 0 0 <small>(-∞,∞)</small>

Geographic coordinate for southwest (lower-left) corner of height dataset.

### SFInt32 [ ] **xDimension** <small>(0,∞)</small>

Number of elements in the height array along east-west X direction.

#### Hint

- Total horizontal x-axis distance equals (xDimension-1) \* xSpacing.

### SFInt32 [ ] **zDimension** <small>(0,∞)</small>

Number of elements in the height array along north-south Z direction.

#### Hint

- Total lateral z-axis distance equals (zDimension-1) \* zSpacing.

### SFDouble [ ] **xSpacing** 1 <small>[0,∞)</small>

Distance between grid-array vertices along east-west X direction.

#### Hints

- When geoSystem is GDC, xSpacing is number of degrees of longitude. When geoSystem is UTM, xSpacing is number of eastings (meters).

### SFDouble [ ] **zSpacing** 1 <small>[0,∞)</small>

Distance between grid-array vertices along north-south Z direction.

#### Hints

- When geoSystem is GDC, zSpacing is number of degrees of latitude. When geoSystem is UTM, zSpacing is number of northings (meters).

### SFFloat [in, out] **yScale** 1 <small>[0,∞)</small>

Vertical exaggeration of displayed data produced from the height array.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

- *ccw* false can reverse solid (backface culling) and normal-vector orientation.

### SFDouble [ ] **creaseAngle** <small>[0,∞)</small>

*creaseAngle* defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than creaseAngle, smooth shading is rendered across the shared line segment.

#### Hint

- CreaseAngle=0 means render all edges sharply, creaseAngle=3.14159 means render all edges smoothly.

#### Warning

- Note type double, unlike ElevationGrid creaseAngle.

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or per quadrilateral (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [ ] **normalPerVertex** TRUE

Whether Normal node vector values are applied to each vertex (true) or per quadrilateral (false).

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>

Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. Normal vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

### MFDouble [in, out] **height** [ 0, 0 ] <small>(-∞,∞)</small>

Contains xDimension rows \* zDimension columns floating-point values for elevation above ellipsoid.

#### Hints

- Height array values are in row-major order from west to east, south to north. GeoGridOrigin is in southwest (lower-left) corner of height dataset.

## Description

### Hints

- The height array defines (xDimension-1)\*(zDimension-1) quadrilaterals.
- Positive direction for normal of each triangle is on same side of the quadrilateral. Triangles are defined either counterclockwise or clockwise depending on value of ccw field.
- GeoElevationGrid can contain GeoOrigin, Color/ColorRGBA, Normal and TextureCoordinate nodes.
- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Geospatial' level='1'/>`

### Warning

- Generated quadrilaterals can be nonplanar. Tessellation splits quadrilaterals into triangles along seam starting at initial vertex of the quadrilateral and proceeding to opposite vertex.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/GeoElevationGrid.x3d"></x3d-canvas>

## External Links

- [X3D Specification of GeoElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoElevationGrid){:target="_blank"}
