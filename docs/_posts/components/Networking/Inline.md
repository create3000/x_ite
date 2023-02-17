---
title: Inline
date: 2022-01-07
nav: components-Networking
categories: [components, Networking]
tags: [Inline, Networking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Inline is a X3DBoundedObject node that can load nodes from another X3D scene via url.

The Inline node belongs to the **Networking** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + Inline (X3DBoundedObject, X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **global** FALSE

The global field controls potential external scoping effects of lights found within an Inline scene. Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Hint

- [X3D Architecture, 17.2.1.2 Scoping of lights](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/lighting.html#ScopingOfLights)

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when Inline loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

#### Hint

- Use LoadSensor to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Address of X3D world to load into current scene.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

## Description

### Hint

- You cannot ROUTE values into an Inline scene, use IMPORT/EXPORT (or ExternProtoDeclare and ProtoInstance) instead.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Networking/Inline/Inline.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Inline](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#Inline){:target="_blank"}
- [X3D Scene Authoring Hints, Inlines and Prototypes](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#InlinesPrototypes){:target="_blank"}
