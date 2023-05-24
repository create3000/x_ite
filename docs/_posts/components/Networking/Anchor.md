---
title: Anchor
date: 2022-01-07
nav: components-Networking
categories: [components, Networking]
tags: [Anchor, Networking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Anchor is a Grouping node that can contain most nodes. When the user selects any of the geometry contained by the Anchor node, it jumps to another viewpoint or loads content (such as X3D, an image or HTML) specified by the url field. Loaded content completely replaces current content, if parameter is same window.

The Anchor node belongs to the **Networking** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode (X3DBoundedObject)*
      + Anchor (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided text tooltip that tells users the expected action of this node.

#### Hint

- Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTextureAtlas loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Address of replacement world or #ViewpointDEFName, activated by clicking Anchor geometry.

#### Hints

- Jump to a world's internal viewpoint by appending viewpoint name (e.g. #ViewpointName, someOtherCoolWorld.x3d#GrandTour). Jump to a local viewpoint by only using viewpoint name (e.g. #GrandTour). MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Pop up a new window with url value as follows: "JavaScript:window.open('popup.html','popup','width=240,height=240');location.href='HelloWorld.x3d'"

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### MFString [in, out] **parameter** [ ]

If provided, parameter tells the X3D player where to to redirect the loaded url.

#### Hints

- Set parameter value as target=\_blank to load the target url into a new browser frame. Set parameter value as target=frame_name to load target url into another browser frame. MFString arrays can have multiple values, so separate each individual string by quote marks. "https://www.web3d.org" "https://www.web3d.org/about" "etc." Interchange profile hint: this field may be ignored, applying the default value regardless.

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

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hint

- Insert a Shape node before adding geometry or Appearance.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Networking/Anchor/Anchor.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of Anchor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#Anchor){:target="_blank"}
- [See X3D Specification 20.2.1 Overview of pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#OverviewOfPointingDeviceSensors){:target="_blank"}
- [See X3D Specification 20.2.3 Activating and manipulating pointing device sensors](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/pointingDeviceSensor.html#Activatingandmanipulating){:target="_blank"}
