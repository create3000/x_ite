---
title: ViewpointGroup
date: 2022-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [ViewpointGroup, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ViewpointGroup collects Viewpoint, OrthoViewpoint and other ViewpointGroup nodes for better user-navigation support with a shared description on the viewpoint list.

The ViewpointGroup node belongs to the **Navigation** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + ViewpointGroup
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Text description or navigation hint to identify this ViewpointGroup.

#### Hints

- Use spaces, make descriptions clear and readable. Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

#### Warning

- Without description, this ViewpointGroup is unlikely to appear on browser Viewpoints menu.

### SFBool [in, out] **displayed** TRUE

*displayed* determines whether this ViewpointGroup is displayed in the current viewpoint list.

### SFBool [in, out] **retainUserOffsets** FALSE

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFVec3f [in, out] **size** 0 0 0 <small>(-∞,∞)</small>

*size* of proximity box around center location within which ViewpointGroup is usable and displayed on viewpoint list.

#### Hint

- Size 0 0 0 specifies that ViewpointGroup is always usable and displayable.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

*center* specifies center point of proximity box within which ViewpointGroup is usable and displayed on viewpoint list.

### MFNode [in, out] **children** [ ] <small>[X3DViewpointNode | ViewpointGroup]</small>

Input/Output field children.

## Description

### Hints

- Use ViewpointGroup as parent for Viewpoint and OrthoViewpoint to constrain location proximity where contained viewpoints are available to user.
- ViewpointGroup and OrthoViewpoint require Navigation component level 3, which is higher than CADInterchange profile.
- Viewpoint and ViewpointGroup descriptions together build simple menu/submenu lists for simple user navigation.

## External Links

- [X3D Specification of ViewpointGroup](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#ViewpointGroup){:target="_blank"}
