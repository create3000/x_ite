---
title: GeoLOD
date: 2022-01-07
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

The GeoLOD node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + GeoLOD (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

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

### MFString [ ] **rootUrl** [ ] <small>[URI]</small>

Use either rootNode or rootUrl to specify root geometry, not both.

### MFString [ ] **child1Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child2Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child3Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### MFString [ ] **child4Url** [ ] <small>[URI]</small>

Quadtree geometry loaded when viewer is within range.

### SFVec3d [ ] **center** 0 0 0 <small>(-∞,∞)</small>

Viewer range from geographic-coordinates center triggers quadtree loading/unloading.

### SFFloat [ ] **range** 10 <small>[0,∞)</small>

Viewer range from geographic-coordinates center triggers quadtree loading/unloading.

#### Hint

- Not setting range values indicates that level switching can be optimized automatically based on performance.

### SFInt32 [out] **level_changed**

Output field level_changed.

### MFNode [ ] **rootNode** [ ] <small>[X3DChildNode]</small>

Field rootNode.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [out] **children**

Output field children.

## Description

### Hints

- Children nodes expose the scene graph for the currently loaded set of nodes.
- RootNode specifies the geometry of the root tile.
- Include `<component name='Geospatial' level='1'/>`

### Warning

- Do not use rootUrl and rootNode simultaneously, since each specifies the root tile.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geospatial/GeoLOD/GeoLOD.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of GeoLOD](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoLOD){:target="_blank"}
