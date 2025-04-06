---
title: ViewpointGroup
date: 2023-01-07
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

ViewpointGroup can contain Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes for better user-navigation support with a shared description on the viewpoint list.

The ViewpointGroup node belongs to the **Navigation** component and requires at least level **3,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + ViewpointGroup
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

[Text](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/text/text/) *description* or navigation hint to identify this ViewpointGroup.

#### Hints

- Include space characters since a *description* is not a DEF identifier. Write short phrases that make descriptions clear and readable.
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

#### Warning

- Without *description*, this ViewpointGroup is unlikely to appear on browser [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) menus.

### SFBool [in, out] **displayed** TRUE

*displayed* determines whether this ViewpointGroup is *displayed* in the current viewpoint list.

### SFBool [in, out] **retainUserOffsets** FALSE

Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.

### SFVec3f [in, out] **size** 0 0 0 <small>(-∞,∞)</small>

*size* of Proximity box around center location, oriented within local transformation frame, within which ViewpointGroup is usable and displayed on viewpoint list.

#### Hint

- *size* 0 0 0 specifies that ViewpointGroup is always usable and displayable.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

*center* specifies *center* point of proximity box within which ViewpointGroup is usable and displayed on viewpoint list.

### MFNode [in, out] **children** [ ] <small>[X3DViewpointNode | ViewpointGroup]</small>

ViewpointGroup contains [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [GeoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoviewpoint/) and other ViewpointGroup nodes that each have `containerField='children'` default value.

#### Hints

- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- Use ViewpointGroup as parent for [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [GeoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoviewpoint/) and other ViewpointGroup nodes to constrain location proximity where contained viewpoints are available to user.
- ViewpointGroup and [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/) require Navigation component level 3, which is higher than CADInterchange profile.
- [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) and ViewpointGroup descriptions together build simple menu/submenu lists for simple user navigation. ViewpointGroup is not an X3DGroupingNode, and can only contain a Metadata* node, [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [GeoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoviewpoint/) and other ViewpointGroup nodes.

## See Also

- [X3D Specification of ViewpointGroup Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#ViewpointGroup)
