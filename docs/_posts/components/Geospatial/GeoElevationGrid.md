---
title: GeoElevationGrid
date: 2023-01-07
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

The GeoElevationGrid node belongs to the **Geospatial** component and requires at least level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + GeoElevationGrid
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>

Single contained [GeoOrigin](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoorigin/) node that can specify a local coordinate frame for extended precision.

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

### MFDouble [in] **set_height** <small>(-∞,∞)</small>

Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.

#### Hints

- *height* array values are in row-major order from west to east, south to north.
- GeoGridOrigin is in southwest (lower-left) corner of *height* dataset.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFVec3d [ ] **geoGridOrigin** 0 0 0 <small>(-∞,∞)</small>

Geographic coordinate for southwest (lower-left) corner of height dataset.

### SFInt32 [ ] **xDimension** 0 <small>(0,∞)</small>

Number of elements in the height array along east-west X direction.

#### Hint

- Total horizontal x-axis distance equals (*xDimension*-1) * xSpacing.

#### Warning

- *xDimension* \< 2 means that GeoElevationGrid contains no quadrilaterals.

### SFInt32 [ ] **zDimension** 0 <small>(0,∞)</small>

Number of elements in the height array along north-south Z direction.

#### Hint

- Total lateral z-axis distance equals (*zDimension*-1) * zSpacing.

#### Warning

- *zDimension* \< 2 means that GeoElevationGrid contains no quadrilaterals.

### SFDouble [ ] **xSpacing** 1 <small>[0,∞)</small>

Distance between grid-array vertices along east-west X direction.

#### Hints

- When geoSystem is GDC, *xSpacing* is number of degrees of longitude.
- When geoSystem is UTM, *xSpacing* is number of eastings (meters).

### SFDouble [ ] **zSpacing** 1 <small>[0,∞)</small>

Distance between grid-array vertices along north-south Z direction.

#### Hints

- When geoSystem is GDC, *zSpacing* is number of degrees of latitude.
- When geoSystem is UTM, *zSpacing* is number of northings (meters).

### SFFloat [in, out] **yScale** 1 <small>[0,∞)</small>

Vertical exaggeration of displayed data produced from the height array.

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise)

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFDouble [ ] **creaseAngle** 0 <small>[0,∞)</small>

*creaseAngle* defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than *creaseAngle*, smooth shading is rendered across the shared line segment.

#### Hints

- *creaseAngle*=0 means render all edges sharply, *creaseAngle*=3.14159 means render all edges smoothly.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- Note type double, unlike [ElevationGrid](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geometry3d/elevationgrid/) *creaseAngle*.

### SFBool [ ] **colorPerVertex** TRUE

Whether [Color](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/color/) node color values are applied to each point vertex (true) or per quadrilateral (false).

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFBool [ ] **normalPerVertex** TRUE

Whether [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) node vector values are applied to each point vertex (true) or per quadrilateral (false).

#### Hint

- If no child [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) node is provided, the X3D browser shall automatically generate normals, using creaseAngle to determine smoothed shading across shared vertices.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained [Color](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/color/) or [ColorRGBA](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/colorrgba/) node that can specify *color* values applied to corresponding vertices according to colorPerVertex field.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>

Single contained [TextureCoordinate](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/texturecoordinate/), [TextureCoordinateGenerator](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/texturecoordinategenerator/) or [MultiTextureCoordinate](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/multitexturecoordinate/) node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **tangent** NULL <small>[Tangent]</small> <small class="blue">non standard</small>

Input/Output field *tangent*. If there is no [Tangent](/x_ite/components/rendering/tangent/) node, the MikkTSpace algorithm is used to generate tangent vectors.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions. [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) vectors are rapidly computed at run time by GPUs and thus are rarely needed in model files if no special effects are expected.

### MFDouble [ ] **height** [ 0, 0 ] <small>(-∞,∞)</small>

Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.

#### Hints

- *height* array values are in row-major order from west to east, south to north.
- GeoGridOrigin is in southwest (lower-left) corner of *height* dataset.
- Default values do not make sense, this is a specification erratum (Mantis 1447), be sure to change them.
- This field is not accessType inputOutput since X3D browsers might use different underlying geometric representations for high-performance rendering, and so output events are not appropriate.

#### Warning

- *height* array values are not retained or available at run time since a browser is permitted to condense geometry.

## Advice

### Hints

- The height array defines (xDimension-1)*(zDimension-1) quadrilaterals.
- Positive direction for normal of each triangle is on same side of the quadrilateral. Triangles are defined either counterclockwise or clockwise depending on value of ccw field.
- GeoElevationGrid can contain [GeoOrigin](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoorigin/), [Color](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/color/) or [ColorRGBA](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/colorrgba/), [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) and [TextureCoordinate](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/texturing/texturecoordinate/) nodes.
- Insert a [Shape](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/appearance/).
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warnings

- Generated quadrilaterals can be nonplanar. Tessellation splits quadrilaterals into triangles along seam starting at initial vertex of the quadrilateral and proceeding to opposite vertex.
- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`
- Avoid having [GeoLocation](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geolocation/) or [GeoTransform](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geotransform/) as a parent or ancestor node of GeoElevationGrid, since multiple geospatial transformations then occur with unpredictable results.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/GeoElevationGrid.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/screenshot.avif" alt="GeoElevationGrid"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/GeoElevationGrid.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geospatial/GeoElevationGrid/GeoElevationGrid.x3d)
{: .example-links }

## See Also

- [X3D Specification of GeoElevationGrid Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoElevationGrid)
