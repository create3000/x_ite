---
title: GeoViewpoint
date: 2023-01-07
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

The GeoViewpoint node belongs to the **Geospatial** component and requires at least level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

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

### SFBool [in] **set_bind**

*set_bind* true makes this node active, *set_bind* false makes this node inactive.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of this node.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFVec3d [in, out] **position** 0 0 100000 <small>(-∞,∞)</small>

*position* relative to local georeferenced coordinate system, in proper format.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>(-∞,∞) or -1 1</small>

Rotation of [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/), relative to default -Z axis direction in local coordinate system.

#### Hint

- This is *orientation* change from default direction along the (minus) -Z axis. +Y axis is the up vector for the local area (the normal to the tangent plane on the ellipsoid), -Z points towards the north pole, and +X is east 1 0 0 -1.570796 always looks down.

#### Warning

- For VR/AR/MR/XR users wearing a head-mounted display (HMD), animating this field may induce motion sickness.

### SFVec3d [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>

*centerOfRotation* specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### SFFloat [in, out] **fieldOfView** π/4 <small>(0,π)</small>

Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller). Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>

*nearDistance* defines minimum clipping plane distance necessary for object display.

#### Hints

- Overrides bound [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) avatarSize value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))

#### Warning

- *nearDistance* must be less than farDistance.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>

*farDistance* defines maximum clipping plane distance allowed for object display.

#### Hints

- Overrides bound [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) visibilityLimit value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))

#### Warning

- NearDistance must be less than *farDistance*.

### SFBool [in, out] **viewAll** FALSE

[Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) is automatically adjusted to view all visible geometry. Typically centerOfRotation is shifted to center of current bounding box and view is zoomed in or out until all visible objects are viewed.

#### Hints

- No collision detection or proximity sensing occurs when zooming.
- When the value of the *viewAll* field is changed from TRUE to FALSE, no change in the current view occurs.

#### Warning

- If needed, near and far clipping planes shall be adjusted to allow viewing the entire scene.

### SFBool [in, out] **jump** TRUE

Whether to transition instantly by jumping, or else smoothly animate to this [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/).

### SFBool [in, out] **retainUserOffsets** FALSE

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFFloat [ ] **speedFactor** 1 <small>[0,∞)</small>

*speedFactor* is a multiplier to modify the original elevation-based speed that is set automatically by the browser.

#### Hint

- *speedFactor* is a relative value and not an absolute speed as defined by [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/).

### SFBool [out] **isBound**

Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**

Event sent reporting timestamp when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **navigationInfo** NULL <small>[NavigationInfo]</small>

The *navigationInfo* field defines a dedicated [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) node for this X3DViewpointNode. The specified [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) node receives a set_bind TRUE event at the time when the parent node is bound and receives a set_bind FALSE at the time when the parent node is unbound.

#### Hint

- Allows simple integration of custom navigation associated with each [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) according to user needs at that location.

## Advice

### Hints

- Alternatively can use [GeoLocation](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geolocation/) or [GeoTransform](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geotransform/) as parent of a [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) node to orient geospatial views.
- Include `<component name='Geospatial' level='1'/>`
- When a GeoViewpoint node is bound, it also overrides the currently bound [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) node in the scene and controls user navigation for smoother geospatial interaction.
- [Background](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/background/), [Fog](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/fog/), GeoViewpoint, [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/texturebackground/) and [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- GeoViewpoint [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/) and [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Regardless of viewpoint jump value at bind time, the relative viewing transformation between user's view and defined position/orientation is stored for later use when un-jumping (returning to the viewpoint when subsequent viewpoint is unbound).
- Customizable design pattern for dedicated [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/)/[NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) pair: \<[Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) DEF='SpecialView'/\> \<[NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) DEF='SpecialNav'/\> \<ROUTE fromNode='SpecialView' fromField='isBound' toNode='SpecialNav' toField='set_bind'/\>
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints)

### Warnings

- Results are undefined if a bindable node ([Background](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/background/), [Fog](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/lod/) or [Switch](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/grouping/switch/). Avoid this authoring pattern.
- Do not include GeoViewpoint [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/) or [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) as a child of [LOD](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/lod/) or [Switch](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/grouping/switch/), instead use [ViewpointGroup](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpointgroup/) as parent to constrain location proximity where the viewpoint is available to user.
- GeoViewpoint navType and headlight fields were removed as part of X3D version 3.3, authors can instead use a [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/) node for those fields in prior X3D versions 3.0, 3.1 or 3.2. Upgrading such legacy scenes to version 3.3 or greater is preferred and recommended.
- Avoid having [GeoLocation](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geolocation/) or [GeoTransform](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geotransform/) as a parent or ancestor node of GeoViewpoint, since multiple geospatial transformations then occur with unpredictable results.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/GeoViewpoint.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/screenshot.avif" alt="GeoViewpoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/GeoViewpoint.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Geospatial/GeoViewpoint/GeoViewpoint.x3d)
{: .example-links }

## See Also

- [X3D Specification of GeoViewpoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoViewpoint)
