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

The Inline node belongs to the **Networking** component and its container field is *children.* It is available since X3D version 3.0 or later.

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

### SFBool [in, out] **load** TRUE

Load=true means load immediately, load=false means defer loading or unload contained scene.

#### Hint

Use LoadSensor to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Address of X3D world to load into current scene.

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

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
