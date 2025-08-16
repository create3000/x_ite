---
title: OrthoViewpoint
date: 2023-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [OrthoViewpoint, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

OrthoViewpoint provides an orthographic perspective-free view of a scene from a specific location and direction.

The OrthoViewpoint node belongs to the [Navigation](/x_ite/components/overview/#navigation) component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DViewpointNode
        + OrthoViewpoint
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in] | [set_bind](#fields-set_bind) |  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFVec3f | [in, out] | [position](#fields-position) | 0 0 10  |
| SFRotation | [in, out] | [orientation](#fields-orientation) | 0 0 1 0  |
| SFVec3f | [in, out] | [centerOfRotation](#fields-centerOfRotation) | 0 0 0  |
| MFFloat | [in, out] | [fieldOfView](#fields-fieldOfView) | [ -1, -1, 1, 1 ] |
| SFFloat | [in, out] | [nearDistance](#fields-nearDistance) | -1  |
| SFFloat | [in, out] | [farDistance](#fields-farDistance) | -1  |
| SFBool | [in, out] | [viewAll](#fields-viewAll) | FALSE |
| SFBool | [in, out] | [jump](#fields-jump) | TRUE |
| SFBool | [in, out] | [retainUserOffsets](#fields-retainUserOffsets) | FALSE |
| SFBool | [out] | [isBound](#fields-isBound) |  |
| SFTime | [out] | [bindTime](#fields-bindTime) |  |
| SFNode | [in, out] | [navigationInfo](#fields-navigationInfo) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_bind**
{: #fields-set_bind }

Sending event *set_bind*=true makes this node active. Sending event *set_bind*=false makes this node inactive. Thus setting *set_bind* to true/false will pop/push (enable/disable) this [Viewpoint](/x_ite/components/navigation/viewpoint/).

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **description** ""
{: #fields-description }

[Text](/x_ite/components/text/text/) *description* or navigation hint to describe the significance of this model [Viewpoint](/x_ite/components/navigation/viewpoint/).

#### Hints

- A sequence of good Viewpoints with understandable descriptions can provide a guided tour of a model.
- The currently bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node has a major effect on how a user might change viewing position and orientation after reaching this [Viewpoint](/x_ite/components/navigation/viewpoint/).
- Consider paired [Viewpoint](/x_ite/components/navigation/viewpoint/)/[NavigationInfo](/x_ite/components/navigation/navigationinfo/) node combinations by defining ROUTE connections between corresponding isBound/set_bind fields.
- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

#### Warning

- Without *description*, this OrthoViewpoint is unlikely to appear on browser [Viewpoint](/x_ite/components/navigation/viewpoint/) menus.

### SFVec3f [in, out] **position** 0 0 10 <small>(-∞,∞)</small>
{: #fields-position }

*position* (x, y, z in meters) relative to local coordinate system.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1],(-∞,∞)</small>
{: #fields-orientation }

Rotation (axis, angle in radians) of [Viewpoint](/x_ite/components/navigation/viewpoint/), relative to default -Z axis direction in local coordinate system.

#### Hints

- This is *orientation* change from default direction (0 0 -1) along the -X axis.
- Complex rotations can be accomplished axis-by-axis using parent Transforms.

#### Warning

- For VR/AR/MR/XR users wearing a head-mounted display (HMD), animating this field may induce motion sickness.

### SFVec3f [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-centerOfRotation }

*centerOfRotation* specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### MFFloat [in, out] **fieldOfView** [ -1, -1, 1, 1 ] <small>(-∞,∞)</small>
{: #fields-fieldOfView }

Minimum and maximum extents of view in units of local coordinate system. Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Hints

- Rectangular display width/height = (maxX-minX) / (maxY-minY)
- [See Mantis 1398](https://mantis.web3d.org/view.php?id=1398)

#### Warnings

- Minimum corner values must remain less than maximum corner values.
- If provided, OrthoViewpoint *fieldOfView* has exactly four numeric values, otherwise results are undefined.
- OrthoViewpoint *fieldOfView* has type MFFloat for backwards compatibility (even though SFVec4f is stricter and more correct to prevent modeling errors)

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>
{: #fields-nearDistance }

*nearDistance* defines minimum clipping plane distance necessary for object display.

#### Hints

- Overrides bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) avatarSize value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))

#### Warning

- *nearDistance* must be less than farDistance.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>
{: #fields-farDistance }

*farDistance* defines maximum clipping plane distance allowed for object display.

#### Hints

- Overrides bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) visibilityLimit value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))

#### Warning

- NearDistance must be less than *farDistance*.

### SFBool [in, out] **viewAll** FALSE
{: #fields-viewAll }

[Viewpoint](/x_ite/components/navigation/viewpoint/) is automatically adjusted to view all visible geometry. Typically centerOfRotation is shifted to center of current bounding box and view is zoomed in or out until all visible objects are viewed.

#### Hints

- No collision detection or proximity sensing occurs when zooming.
- When the value of the *viewAll* field is changed from TRUE to FALSE, no change in the current view occurs.

#### Warning

- If needed, near and far clipping planes shall be adjusted to allow viewing the entire scene.

### SFBool [in, out] **jump** TRUE
{: #fields-jump }

Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this [Viewpoint](/x_ite/components/navigation/viewpoint/).

#### Hints

- See [NavigationInfo](/x_ite/components/navigation/navigationinfo/).transitionType for the manner in which animated [Viewpoint](/x_ite/components/navigation/viewpoint/) transistions occur.
- Set *jump*=true for instantaneous camera motion when going to this viewpoint.

#### Warning

- For VR/AR/MR/XR users wearing head-mounted displays, animating transitions between viewpoints may induce motion sickness.

### SFBool [in, out] **retainUserOffsets** FALSE
{: #fields-retainUserOffsets }

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFBool [out] **isBound**
{: #fields-isBound }

Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.

#### Hint

- Paired node operations can be established by connecting set_bind and *isBound* fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**
{: #fields-bindTime }

Event sent reporting timestamp when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **navigationInfo** NULL <small>[NavigationInfo]</small>
{: #fields-navigationInfo }

The *navigationInfo* field defines a dedicated [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node for this X3DViewpointNode. The specified [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node receives a set_bind TRUE event at the time when the parent node is bound and receives a set_bind FALSE at the time when the parent node is unbound.

#### Hint

- Allows simple integration of custom navigation associated with each [Viewpoint](/x_ite/components/navigation/viewpoint/) according to user needs at that location.

## Advice

### Hints

- [Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), OrthoViewpoint, [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) and [Viewpoint](/x_ite/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) OrthoViewpoint and [Viewpoint](/x_ite/components/navigation/viewpoint/) share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Regardless of viewpoint jump value at bind time, the relative viewing transformation between user's view and defined position/orientation is stored for later use when un-jumping (returning to the viewpoint when subsequent viewpoint is unbound).
- Customizable design pattern for dedicated [Viewpoint](/x_ite/components/navigation/viewpoint/)/[NavigationInfo](/x_ite/components/navigation/navigationinfo/) pair: \<[Viewpoint](/x_ite/components/navigation/viewpoint/) DEF='SpecialView'/\> \<[NavigationInfo](/x_ite/components/navigation/navigationinfo/) DEF='SpecialNav'/\> \<ROUTE fromNode='SpecialView' fromField='isBound' toNode='SpecialNav' toField='set_bind'/\>
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints)

### Warnings

- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), OrthoViewpoint, [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.
- Do not include [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) OrthoViewpoint or [Viewpoint](/x_ite/components/navigation/viewpoint/) as a child of [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/), instead use [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/) as parent to constrain location proximity where the viewpoint is available to user.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/screenshot.avif" alt="OrthoViewpoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.x3d)
{: .example-links }

## See Also

- [X3D Specification of OrthoViewpoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#OrthoViewpoint)
