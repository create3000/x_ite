---
title: OrthoViewpoint
date: 2022-01-07
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

The OrthoViewpoint node belongs to the **Navigation** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DViewpointNode
        + OrthoViewpoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in] **set_bind**

Sending event *set_bind*=true makes this node active. Sending event *set_bind*=false makes this node inactive. Thus setting *set_bind* to true/false will pop/push (enable/disable) this Viewpoint.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **description** ""

Text *description* or navigation hint to describe the significance of this model Viewpoint.

#### Hints

- A sequence of good Viewpoints with understandable descriptions can provide a guided tour of a model.
- The currently bound NavigationInfo node has a major effect on how a user might change viewing position and orientation after reaching this Viewpoint.
- Consider paired Viewpoint/NavigationInfo node combinations by defining ROUTE connections between corresponding isBound/set_bind fields.
- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &#38; for & ampersand character, or &#34; for " quotation-mark character).

#### Warning

- Without *description*, this OrthoViewpoint is unlikely to appear on browser Viewpoint menus.

### SFVec3f [in, out] **position** 0 0 10 <small>(-∞,∞)</small>

*position* (x, y, z in meters) relative to local coordinate system.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1],(-∞,∞)</small>

Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.

#### Hints

- This is *orientation* _change_ from default direction (0 0 -1).
- Complex rotations can be accomplished axis-by-axis using parent Transforms.

#### Warning

- For VR/AR/MAR users wearing a head-mounted display (HMD), animating this field may induce motion sickness.

### SFVec3f [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>

*centerOfRotation* specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### MFFloat [in, out] **fieldOfView** [ -1, -1, 1, 1 ] <small>(-∞,∞)</small>

Minimum and maximum extents of view in units of local coordinate system. Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Hints

- Validation type SFVec3f is stricter than specification legacy value in order to detect illegal values.
- Rectangular display width/height = (maxX-minX) / (maxY-minY)

#### Warning

- Minimum corner values must remain less than maximum corner values.

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>

*nearDistance* defines minimum clipping plane distance necessary for object display.

#### Hints

- Overrides bound NavigationInfo avatarSize value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing and Clipping https://en.wikipedia.org/wiki/Clipping_(computer_graphics)){:target="_blank"}

#### Warning

- *nearDistance* must be less than farDistance.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>

*farDistance* defines maximum clipping plane distance allowed for object display.

#### Hints

- Overrides bound NavigationInfo visibilityLimit value, if any.
- Default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing and Clipping https://en.wikipedia.org/wiki/Clipping_(computer_graphics)){:target="_blank"}

#### Warning

- NearDistance must be less than *farDistance*.

### SFBool [in, out] **viewAll** FALSE

Viewpoint is automatically adjusted to view all visible geometry. Typically centerOfRotation is shifted to center of current bounding box and view is zoomed in or out until all visible objects are viewed.

#### Hints

- No collision detection or proximity sensing occurs when zooming.
- When the value of the *viewAll* field is changed from TRUE to FALSE, no change in the current view occurs.

#### Warning

- If needed, near and far clipping planes shall be adjusted to allow viewing the entire scene.

### SFBool [in, out] **jump** TRUE

Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.

#### Hints

- See NavigationInfo.transitionType for the manner in which animated Viewpoint transistions occur.
- Set *jump*=true for instantaneous camera motion when going to this viewpoint.

#### Warning

- For VR/AR/MAR users wearing head-mounted displays, animating transitions between viewpoints may induce motion sickness.

### SFBool [in, out] **retainUserOffsets** FALSE

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFBool [out] **isBound**

Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.

#### Hint

- Paired node operations can be established by connecting set_bind and *isBound* fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**

Event sent reporting timestamp when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **navigationInfo** NULL <small>[NavigationInfo]</small>

The *navigationInfo* field defines a dedicated NavigationInfo node for this X3DViewpointNode. The specified NavigationInfo node receives a set_bind TRUE event at the time when the parent node is bound and receives a set_bind FALSE at the time when the parent node is unbound.

#### Hint

- Allows simple integration of custom navigation associated with each Viewpoint according to user needs at that location.

## Information

### Hints

- Background, Fog, GeoViewpoint, NavigationInfo, OrthoViewpoint, TextureBackground and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- GeoViewpoint OrthoViewpoint and Viewpoint share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Regardless of viewpoint jump value at bind time, the relative viewing transformation between user's view and defined position/orientation is stored for later use when un-jumping (returning to the viewpoint when subsequent viewpoint is unbound).
- Customizable design pattern for dedicated Viewpoint/NavigationInfo pair: <Viewpoint DEF='SpecialView'/> <NavigationInfo DEF='SpecialNav'/> <ROUTE fromNode='SpecialView' fromField='isBound' toNode='SpecialNav' toField='set_bind'/>
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints){:target="_blank"}

### Warnings

- Results are undefined if a bindable node (Background, Fog, NavigationInfo, OrthoViewpoint, TextureBackground, Viewpoint) is a contained descendant node of either LOD or Switch. Avoid this authoring pattern.
- Do not include GeoViewpoint OrthoViewpoint or Viewpoint as a child of LOD or Switch, instead use ViewpointGroup as parent to constrain location proximity where the viewpoint is available to user.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of OrthoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#OrthoViewpoint){:target="_blank"}
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints){:target="_blank"}
