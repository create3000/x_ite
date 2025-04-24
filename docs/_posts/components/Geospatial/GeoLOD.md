---
title: GeoLOD
date: 2023-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoLOD, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoLOD provides quadtree level-of-detail loading/unloading for multi-resolution terrains. GeoLOD can contain children and GeoOrigin nodes.

The GeoLOD node belongs to the **Geospatial** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + GeoLOD (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFNode \[ \] [geoOrigin](#sfnode---geoorigin-null-geoorigin-deprecated)
- MFString \[ \] [geoSystem](#mfstring---geosystem--gd-we-)
- MFString \[ \] [rootUrl](#mfstring---rooturl---uri)
- MFString \[ \] [child1Url](#mfstring---child1url---uri)
- MFString \[ \] [child2Url](#mfstring---child2url---uri)
- MFString \[ \] [child3Url](#mfstring---child3url---uri)
- MFString \[ \] [child4Url](#mfstring---child4url---uri)
- SFVec3d \[ \] [center](#sfvec3d---center-0-0-0--)
- SFFloat \[ \] [range](#sffloat---range-10-0)
- SFInt32 \[out\] [level_changed](#sfint32-out-level_changed)
- SFBool \[in, out\] [visible](#sfbool-in-out-visible-true)
- SFBool \[in, out\] [bboxDisplay](#sfbool-in-out-bboxdisplay-false)
- SFVec3f \[ \] [bboxSize](#sfvec3f---bboxsize--1--1--1-0-or-1-1-1)
- SFVec3f \[ \] [bboxCenter](#sfvec3f---bboxcenter-0-0-0--)
- MFNode \[ \] [rootNode](#mfnode---rootnode---x3dchildnode)
- MFNode \[out\] [children](#mfnode-out-children)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

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

### MFString [ ] **rootUrl** [ ] <small>[URI]</small>

Url for scene providing geometry for the root tile.

#### Warning

- Either rootNode or *rootUrl* can specify root tile, but specifying both is an error.

### MFString [ ] **child1Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child2Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child3Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child4Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### SFVec3d [ ] **center** 0 0 0 <small>(-∞,∞)</small>

Viewer range from geographic-coordinates *center* triggers quadtree loading/unloading.

### SFFloat [ ] **range** 10 <small>[0,∞)</small>

Viewer *range* from geographic-coordinates center triggers quadtree loading/unloading.

#### Hint

- Not setting *range* values indicates that level switching can be optimized automatically based on performance.

### SFInt32 [out] **level_changed**

Output event that reports when the new children outputOnly event is generated, with value 0 or 1, where 0 indicates the rootNode field and 1 indicates the nodes specified by the child1Url, child2Url, child3Url, and child4Url fields.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [ ] **rootNode** [ ] <small>[X3DChildNode]</small>

Geometry for the root tile.

#### Warning

- Either *rootNode* or rootUrl can specify root tile, but specifying both is an error.

### MFNode [out] **children**

The outputOnly *children* field exposes a portion of the scene graph for the currently loaded set of nodes. The value returned as an event is an MFNode containing the currently selected tile. This will either be the node specified by the rootNode field or the nodes specified by the child1Url, child2Url, child3Url, and child4Url fields. The GeoLOD node shall generate a new *children* output event each time the scene graph is changed (EXAMPLE whenever nodes are loaded or unloaded).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Children nodes expose the scene graph for the currently loaded set of nodes.
- RootNode specifies the geometry of the root tile.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

### Warnings

- Do not use rootUrl and rootNode simultaneously, since each specifies the root tile.
- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`
- Nested [LOD](/x_ite/components/navigation/lod/) (and/or GeoLOD) nodes with overlapping range intervals can lead to unexpected or undefined behavior.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geospatial/GeoLOD/GeoLOD.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geospatial/GeoLOD/screenshot.avif" alt="GeoLOD"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geospatial/GeoLOD/GeoLOD.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geospatial/GeoLOD/GeoLOD.x3d)
{: .example-links }

## See Also

- [X3D Specification of GeoLOD Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoLOD)
