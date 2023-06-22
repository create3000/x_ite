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

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_bind**

Sending event set_bind=true makes this node active. Sending event set_bind=false makes this node inactive. Thus setting set_bind to true/false will pop/push (enable/disable) this Viewpoint.

### SFString [in, out] **description** ""

Text description or navigation hint to identify this Viewpoint.

#### Hints

- Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

#### Warning

- Without description, this OrthoViewpoint is unlikely to appear on browser Viewpoints menu.

### SFVec3f [in, out] **position** 0 0 10 <small>(-∞,∞)</small>

*position* (x, y, z in meters) relative to local coordinate system.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1],(-∞,∞)</small>

Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.

#### Hints

- This is orientation \_change\_ from default direction (0 0 -1). Complex rotations can be accomplished axis-by-axis using parent Transforms.

### SFVec3f [in, out] **centerOfRotation** 0 0 0 <small>(-∞,∞)</small>

*centerOfRotation* specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.

### MFFloat [in, out] **fieldOfView** [ -1, -1, 1, 1 ] <small>(-∞,∞)</small>

Minimum and maximum extents of view in units of local coordinate system. Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Hint

- Rectangular display width/height = (maxX-minX) / (maxY-minY)

#### Warning

- Minimum corner must remain less than maximum corner.

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>

nearDistance defines minimum clipping plane distance necessary for object display.

#### Hints

- overrides bound NavigationInfo visibilityLimit value, if any.
- default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing){:target="_blank"} and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics)){:target="_blank"}

#### Warnings

- nearDistance must be less than farDistance.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>

farDistance defines maximum clipping plane distance allowed for object display.

#### Hints

- overrides bound NavigationInfo visibilityLimit value, if any.
- default value -1 means no effect on currently defined view frustum boundaries.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing){:target="_blank"} and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics)){:target="_blank"}

#### Warnings

- nearDistance must be less than farDistance.

### SFBool [in, out] **viewAll** FALSE

Viewpoint is automatically adjusted to view all visible geometry. Typically centerOfRotation is shifted to center of current bounding box and view is zoomed in or out until all visible objects are viewed.

#### Hints

- no collision detection or proximity sensing occurs when zooming.
- when the value of the viewAll field is changed from TRUE to FALSE, no change in the current view occurs.

#### Warning

- if needed, near and far clipping planes shall be adjusted to allow viewing the entire scene.

### SFBool [in, out] **jump** TRUE

Transition instantly by jumping, or smoothly adjust offsets in place when changing to this Viewpoint.

#### Hint

- Set jump=true for smooth camera motion when going to this viewpoint.

### SFBool [in, out] **retainUserOffsets** FALSE

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

### SFNode [in, out] **navigationInfo** NULL <small>[NavigationInfo]</small>

The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode. The specified NavigationInfo node receives a set_bind TRUE event at the time when the parent node is bound and receives a set_bind FALSE at the time when the parent node is unbound.

#### Hint

- Allows simple integration of custom navigation associated with each Viewpoint according to user needs at that location.

## Description

### Hint

- NavigationInfo, Background, TextureBackground, Fog, OrthoViewpoint and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.

### Warning

- Do not include Viewpoint or OrthoViewpoint as a child of LOD or Switch, instead use ViewpointGroup as parent to constrain location proximity where the viewpoint is available to user.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Navigation/OrthoViewpoint/OrthoViewpoint.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of OrthoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#OrthoViewpoint){:target="_blank"}
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints){:target="_blank"}
