---
title: Viewpoint
date: 2023-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [Viewpoint, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Viewpoint provides a specific location and direction where the user may view the scene. Viewpoints are the primary way for a user to navigate within a scene, and for an author to show critical aspects of a model. Unless modified by the orientation field, the default direction for a Viewpoint to look is along the -Z axis.

The Viewpoint node belongs to the [Navigation](/x_ite/components/overview/#navigation) component and requires at least support level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DViewpointNode
        + Viewpoint
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
| SFFloat | [in, out] | [fieldOfView](#fields-fieldOfView) | π/4  |
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

Sending event *set_bind*=true makes this node active. Sending event *set_bind*=false makes this node inactive. Thus setting *set_bind* to true/false will pop/push (enable/disable) this Viewpoint.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **description** ""
{: #fields-description }

[Text](/x_ite/components/text/text/) *description* or navigation hint to describe the significance of this model Viewpoint.

#### Hints

- A sequence of good Viewpoints with understandable descriptions can provide a guided tour of a model.
- The currently bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node has a major effect on how a user might change viewing position and orientation after reaching this Viewpoint.
- Consider paired Viewpoint/[NavigationInfo](/x_ite/components/navigation/navigationinfo/) node combinations by defining ROUTE connections between corresponding isBound/set_bind fields.
- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

#### Warning

- Without *description*, this Viewpoint is unlikely to appear on browser Viewpoint menus.

### SFVec3f [in, out] **position** 0 0 10 <small>(-∞,∞)</small>
{: #fields-position }

*position* (x, y, z in meters) relative to local coordinate system.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1],(-∞,∞)</small>
{: #fields-orientation }

Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.

#### Hints

- This is *orientation* change from default direction (0 0 -1) along the -X axis.
- Complex rotations can be accomplished axis-by-axis using parent Transforms.

#### Warning

- For VR/AR/MR/XR users wearing a head-mounted display (HMD), animating this field may induce motion sickness.

### SFVec3f [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-centerOfRotation }

*centerOfRotation* specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### SFFloat [in, out] **fieldOfView** π/4 <small>(0,π)</small>
{: #fields-fieldOfView }

Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller). Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Hints

- Modifying Viewpoint distance to object may be better for zooming.
- This field may be ignored, applying the default value regardless.

#### Warnings

- *fieldOfView* may not be correct for different window sizes and aspect ratios.
- For VR/AR/MR/XR users wearing a head-mounted display (HMD), animating this field may induce motion sickness. Interchange profile

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

Viewpoint is automatically adjusted to view all visible geometry. Typically centerOfRotation is shifted to center of current bounding box and view is zoomed in or out until all visible objects are viewed.

#### Hints

- No collision detection or proximity sensing occurs when zooming.
- When the value of the *viewAll* field is changed from TRUE to FALSE, no change in the current view occurs.

#### Warning

- If needed, near and far clipping planes shall be adjusted to allow viewing the entire scene.

### SFBool [in, out] **jump** TRUE
{: #fields-jump }

Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.

#### Hints

- See [NavigationInfo](/x_ite/components/navigation/navigationinfo/).transitionType for the manner in which animated Viewpoint transistions occur.
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

- Allows simple integration of custom navigation associated with each Viewpoint according to user needs at that location.

## Advice

### Hints

- A sequence of good Viewpoints with understandable descriptions can provide a guided tour of a model.
- The currently bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node has a major effect on how a user might change viewing position and orientation after reaching this Viewpoint.
- Consider paired Viewpoint/[NavigationInfo](/x_ite/components/navigation/navigationinfo/) node combinations by defining ROUTE connections between corresponding isBound/set_bind fields.
- Consider how users might interact with the current X3D model, either standalone or as an [Inline](/x_ite/components/networking/inline/) within a larger parent scene.
- [Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) and Viewpoint share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Regardless of viewpoint jump value at bind time, the relative viewing transformation between user's view and defined position/orientation is stored for later use when un-jumping (returning to the viewpoint when subsequent viewpoint is unbound).
- Customizable design pattern for dedicated Viewpoint/[NavigationInfo](/x_ite/components/navigation/navigationinfo/) pair: \<Viewpoint DEF='SpecialView'/\> \<[NavigationInfo](/x_ite/components/navigation/navigationinfo/) DEF='SpecialNav'/\> \<ROUTE fromNode='SpecialView' fromField='isBound' toNode='SpecialNav' toField='set_bind'/\>
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints)

### Warnings

- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), Viewpoint) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.
- Do not include [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) or Viewpoint as a child of [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/), instead use [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/) as parent to constrain location proximity where the viewpoint is available to user.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Navigation/Viewpoint/Viewpoint.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Navigation/Viewpoint/screenshot.avif" alt="Viewpoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Navigation/Viewpoint/Viewpoint.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Navigation/Viewpoint/Viewpoint.x3d)
{: .example-links }

## See Also

- [X3D Specification of Viewpoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#Viewpoint)
