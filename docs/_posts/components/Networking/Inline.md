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

Inline is an X3DBoundedObject node that can load nodes from another X3D scene via url.

The Inline node belongs to the **Networking** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + Inline (X3DBoundedObject, X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &#38; for & ampersand character, or &#34; for " quotation-mark character).

### SFBool [in, out] **global** FALSE

The *global* field controls potential external scoping effects of lights found within an Inline scene. Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Hint

- [X3D Architecture, 17.2.1.2 Scoping of lights](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/lighting.html#ScopingOfLights){:target="_blank"}

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when Inline loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Address of X3D world to load Inline with current scene, retrieved either from local system or an online address. Browser support for X3D model support can include allowed file formats for XML .x3d, ClassicVRML .x3dv, X3D Binary .x3db, X3D JSON .json, and Virtual Reality Modeling Language (VRML97) .wrl.

#### Hints

- [(X3D version 4.0 draft) support includes .gltf and .glb](https://www.khronos.org/gltf https://en.wikipedia.org/wiki/glTF){:target="_blank"}
- [Future work planned for PLY format](https://en.wikipedia.org/wiki/PLY_(file_format)){:target="_blank"}
- [Future work planned for STL format](https://en.wikipedia.org/wiki/STL_(file_format)){:target="_blank"}
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

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

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/grouping.html#BoundingBoxes){:target="_blank"}
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/grouping.html#X3DBoundedObject){:target="_blank"}

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/grouping.html#BoundingBoxes){:target="_blank"}
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/grouping.html#X3DBoundedObject){:target="_blank"}

## Description

### Hint

- You cannot ROUTE values into an Inline scene, use IMPORT/EXPORT (or ExternProtoDeclare and ProtoInstance) instead.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Networking/Inline/Inline.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of Inline](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#Inline){:target="_blank"}
- [X3D Scene Authoring Hints, Inlines and Prototypes](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#InlinesPrototypes){:target="_blank"}
