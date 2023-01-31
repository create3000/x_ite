---
title: NavigationInfo
date: 2022-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [NavigationInfo, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NavigationInfo describes the user's viewing model, user navigation-interaction modalities, and also dimensional characteristics of the user's (typically invisible) avatar.

The NavigationInfo node belongs to the **Navigation** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + NavigationInfo
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_bind**

Setting set_bind true makes this node active setting set_bind false makes this node inactive. Thus setting set_bind true/false will pop/push (enable/disable) this node.

### MFString [in, out] **type** [ "EXAMINE", "ANY" ]

Enter one or more quoted SFString values: "EXAMINE" "WALK" "FLY" "LOOKAT" "EXPLORE" "ANY" "NONE".

#### Hints

For inspection of simple objects, usability often improves with type="EXAMINE" "ANY". Types WALK and FLY force strict camera-to-object collision detection. See Collision node for further details on camera-to-object collision detection. MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." ] Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFFloat [in, out] **avatarSize** [ 0.25, 1.6, 0.75 ] <small>[0,∞)</small>

AvatarSize triplet values are: (a) collision distance between user and geometry (near culling plane of the view frustrum) (b) viewer height above terrain (c) tallest height viewer can WALK over.

#### Hint

Keep (visibilityLimit / avatarSize.CollisionDistance) < 10,000 to avoid aliasing artifacts (i.e. polygon "tearing"). Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFFloat [in, out] **speed** 1 <small>[0,∞)</small>

Default rate at which viewer travels through scene, meters/second.

#### Warning

Default 1 m/s usually seems slow for ordinary navigation. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFBool [in, out] **headlight** TRUE

Enable/disable directional light that always points in the direction the user is looking.

### SFFloat [in, out] **visibilityLimit**

Geometry beyond the visibilityLimit may not be rendered (far culling plane of the view frustrum). visibilityLimit=0.0 indicates an infinite visibility limit.

#### Hints

Keep visibilityLimit >= zero. Keep (visibilityLimit / avatarSize.CollisionDistance) \< 10,000 to avoid aliasing artifacts (i.e. polygon "tearing"). Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFString [in, out] **transitionType** "LINEAR" <small>["TELEPORT","LINEAR",</small>

Camera transition between viewpoints. Enter one or more quoted SFString values: "ANIMATE" "TELEPORT" "LINEAR".

#### Hint

"ANIMATE" behavior is browser-specific, "TELEPORT" is immediate, and "LINEAR" may proceed directly through intervening objects.

### SFTime [in, out] **transitionTime** 1 <small>[0, ∞)</small>

Duration of viewpoint transition in seconds.

#### Hint

If transitionType is "ANIMATE", transitionTime provides browser-dependent animation parameters. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFBool [out] **transitionComplete**

Event signaling viewpoint transition complete. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

## Description

### Hints

- For inspection of simple objects, usability often improves with type="EXAMINE" "ANY"
- NavigationInfo, Background, TextureBackground, Fog, OrthoViewpoint and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- NavigationInfo types '"WALK" "FLY"' support camera-to-object collision detection.

Warning
-------

- Results are undefined if a bindable node (Viewpoint, OrthoViewpoint, NavigationInfo, Fog, Background, TextureBackground) is a contained child of LOD or Switch.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Navigation/NavigationInfo/NavigationInfo.x3d"></x3d-canvas>

## External Links

- [X3D Specification of NavigationInfo](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#NavigationInfo){:target="_blank"}
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints){:target="_blank"}
