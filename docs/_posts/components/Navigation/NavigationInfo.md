---
title: NavigationInfo
date: 2023-01-07
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

The NavigationInfo node belongs to the **Navigation** component and requires at least level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + NavigationInfo
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_bind**

Receiving event *set_bind*=true activates and binds this node at the top of the binding stack. Receiving event *set_bind*=false deactivates and unbinds this node from the top of the binding stack. Thus setting *set_bind* to true/false will enable/disable the effect of this node.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFString [in, out] **type** [ "EXAMINE", "ANY" ] <small>["EXAMINE", "WALK", "FLY", "PLANE_create3000.github.io", "LOOKAT", "EXPLORE", "ANY", "NONE"]</small>

Enter one or more quoted SFString values: "EXAMINE" "WALK" "FLY" "LOOKAT" "EXPLORE" "ANY" "NONE".

#### Hints

- For inspection of simple objects, usability often improves with *type*="EXAMINE" "ANY".
- Types WALK and FLY force strict camera-to-object collision detection.
- See [Collision](/x_ite/components/navigation/collision/) node for further details on camera-to-object collision detection.
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." ] Interchange profile
- This field may be ignored, applying the default value regardless.

### MFFloat [in, out] **avatarSize** [ 0.25, 1.6, 0.75 ] <small>[0,∞)</small>

*avatarSize* triplet values define three separate parameters: (a) collisionDistance between user and geometry, i.e. near clipping plane of view frustrum, default 0.25m, (b) viewer height above terrain, default 1.6m, and (c) tallest height viewer can WALK over, default 0.75m.

#### Hints

- X3D specification recommends that browsers set near clipping plane to one-half of *avatarSize*.CollisionDistance value.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics)) Interchange profile
- This field may be ignored, applying the default value regardless.
- Transformation hierarchy of currently bound [Viewpoint](/x_ite/components/navigation/viewpoint/) node scales *avatarSize*, but translations and rotations have no effect.
- Content must be visible to be collidable and to be pickable.

#### Warnings

- Important design thumbrule is to keep (visibilityLimit / *avatarSize*.CollisionDistance) \< 10,000 to avoid aliasing artifacts (i.e. polygon "tearing").
- Data type is MFFloat rather than SFVec3f, be sure that three values are provided in the array since validation tools are typically unable to detect erroneous data prior to run time.

### SFFloat [in, out] **speed** 1 <small>[0,∞)</small>

Default rate at which viewer travels through scene, meters/second.

#### Hint

- This field may be ignored, applying the default value regardless.

#### Warning

- Default 1 m/s usually seems slow for ordinary navigation. Interchange profile

### SFBool [in, out] **headlight** TRUE

Enable/disable directional light that always points in the direction the user is looking.

### SFFloat [in, out] **visibilityLimit** 0 <small>[0,∞)</small>

Geometry beyond the *visibilityLimit* may not be rendered (far clipping plane of the view frustrum).

#### Hints

- *visibilityLimit*=0.0 indicates an infinite visibility limit (no far clipping plane).
- Set *visibilityLimit* to appropriate positive value in meters to define far culling plane of view frustum.
- X3D specification recommends that browsers set near clipping plane to one-half of avatarSize.CollisionDistance value.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics)) Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Important design thumbrule is to keep (*visibilityLimit* / avatarSize.CollisionDistance) \< 10,000 to avoid aliasing artifacts (i.e. polygon "tearing").

### MFString [in, out] **transitionType** "LINEAR" <small>["TELEPORT"|"LINEAR"|"ANIMATE"]</small>

Camera transition between viewpoints. Enter one or more quoted SFString values: "ANIMATE" "TELEPORT" "LINEAR".

#### Hint

- "ANIMATE" behavior is browser-specific, "TELEPORT" is immediate, and "LINEAR" may proceed directly through intervening objects.

### SFTime [in, out] **transitionTime** 1 <small>[0,∞)</small>

*transitionTime* defines the expected duration of viewpoint transition in seconds.

#### Hints

- If transitionType is "ANIMATE", *transitionTime* provides browser-dependent animation parameters. Interchange profile
- This field may be ignored, applying the default value regardless.

### SFBool [out] **transitionComplete**

Event signaling viewpoint transition complete. Interchange profile

#### Hint

- This field may be ignored.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

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

## Advice

### Hints

- For inspection of simple objects, usability often improves with type="EXAMINE" "ANY"
- [Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), NavigationInfo, [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) and [Viewpoint](/x_ite/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- NavigationInfo types '"WALK" "FLY"' support camera-to-object collision detection.
- Regardless of viewpoint jump value at bind time, the relative viewing transformation between user's view and defined position/orientation is stored for later use when un-jumping (returning to the viewpoint when subsequent viewpoint is unbound).
- Customizable design pattern for dedicated [Viewpoint](/x_ite/components/navigation/viewpoint/)/NavigationInfo pair: \<[Viewpoint](/x_ite/components/navigation/viewpoint/) DEF='SpecialView'/\> \<NavigationInfo DEF='SpecialNav'/\> \<ROUTE fromNode='SpecialView' fromField='isBound' toNode='SpecialNav' toField='set_bind'/\>
- [X3D Scene Authoring Hints, Viewpoints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Viewpoints)

### Warning

- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), NavigationInfo, [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Navigation/NavigationInfo/NavigationInfo.x3d" update="auto" xrMovementControl=”VIEWER_POSE”></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Navigation/NavigationInfo/NavigationInfo.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Navigation/NavigationInfo/NavigationInfo.x3d)
{: .example-links }

## See Also

- [X3D Specification of NavigationInfo Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#NavigationInfo)
