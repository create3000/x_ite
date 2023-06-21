---
title: GeoTransform
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoTransform, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoTransform is a Grouping node that can contain most nodes. GeoTransform translates, orients and scales GeoCoordinate geometry within the local world coordinate system. GeoTransform coordinate system X-Z plane is tangent to ellipsoid of local spatial reference frame.

The GeoTransform node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + GeoTransform
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position (x, y, z in meters) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Orientation (axis, angle in radians) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFNode [ ] **geoOrigin** NULL <small>[GeoOrigin] (deprecated)</small>

Field geoOrigin.

### MFString [ ] **geoSystem** [ "GD", "WE" ]

Field geoSystem.

### SFVec3d [in, out] **geoCenter** 0 0 0 <small>(-∞,∞)</small>

Input/Output field geoCenter.

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

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hints

- +Y axis is up.
- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Geospatial' level='2'/>`

### Warning

- Avoid having GeoLocation or GeoTransform as a parent of ancestor node, since multiple geospatial transformations then occur with unpredictable results.

## External Links

- [X3D Specification of GeoTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoTransform){:target="_blank"}
