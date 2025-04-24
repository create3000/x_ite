---
title: LinePickSensor
date: 2023-01-07
nav: components-Picking
categories: [components, Picking]
tags: [LinePickSensor, Picking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LinePickSensor uses one or more pickingGeometry line segments to compute intersections with pickTarget shapes. As each line intersection generates a known point in space, useful event information is returned including normal, geometry and texCoord values.

The LinePickSensor node belongs to the **Picking** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DPickSensorNode
        + LinePickSensor
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- MFString \[in, out\] [objectType](#mfstring-in-out-objecttype-all-all-none-terrain-)
- SFString \[in, out\] [matchCriterion](#sfstring-in-out-matchcriterion-match_any-match_anymatch_everymatch_only_one)
- SFString \[ \] [intersectionType](#sfstring---intersectiontype-bounds-geometrybounds)
- SFString \[ \] [sortOrder](#sfstring---sortorder-closest-anyclosestallall_sorted)
- SFBool \[out\] [isActive](#sfbool-out-isactive)
- MFVec3f \[out\] [pickedTextureCoordinate](#mfvec3f-out-pickedtexturecoordinate)
- MFVec3f \[out\] [pickedNormal](#mfvec3f-out-pickednormal)
- MFVec3f \[out\] [pickedPoint](#mfvec3f-out-pickedpoint)
- SFNode \[in, out\] [pickingGeometry](#sfnode-in-out-pickinggeometry-null-indexedlinesetlineset)
- MFNode \[in, out\] [pickTarget](#mfnode-in-out-picktarget---x3dgroupingnodex3dshapenodeinline)
- MFNode \[out\] [pickedGeometry](#mfnode-out-pickedgeometry)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFString [in, out] **objectType** "ALL" <small>["ALL", "NONE", "TERRAIN", ...]</small>

The *objectType* field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances. Example: labeling a [PickableGroup](/x_ite/components/picking/pickablegroup/) with the *objectType* value "WATER" and then attempting to intersect a pick sensor with *objectType* value "GROUND" fails since the *objectType* values do not match. Example: the special value "ALL" means that each node is available for picking regardless of the type specified by the pick sensor. Example: the special value "NONE" effectively disables all picking for this node and is the equivalent of setting the pickable field of the corresponding [PickableGroup](/x_ite/components/picking/pickablegroup/) to false.

#### Hints

- Authors may define any value for *objectType*.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFString [in, out] **matchCriterion** "MATCH_ANY" <small>["MATCH_ANY"|"MATCH_EVERY"|"MATCH_ONLY_ONE"]</small>

Defines whether the intersection test (i.e. pick) by this X3DPickSensorNode must match one or more objectType. Specifically MATCH_ANY means any match of objectType values is acceptable, MATCH_EVERY means that every objectType value in this node shall match an objectType value in the X3DPickableObject, and MATCH_ONLY_ONE means that one and only one objectType value can match.

### SFString [ ] **intersectionType** "BOUNDS" <small>["GEOMETRY"|"BOUNDS"|...]</small>

*intersectionType* specifies precision of the collision computation.

#### Hint

- *intersectionType* constants may be extended by the browser to provide additional options.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [ ] **sortOrder** "CLOSEST" <small>["ANY"|"CLOSEST"|"ALL"|"ALL_SORTED"]</small>

The *sortOrder* field determines the order provided for picked output events. Example: ANY means any single object that can satisfy picking conditions for this pick sensor. Consistency of results is not guaranteed. Example: ALL means that every object that satisfies the picking conditions for this pick sensor shall be returned. Example: ALL_SORTED means that every object that satisfies the picking conditions for this pick sensor shall be returned with the order of the output fields provided in a distance-sorted order from closest to farthest away. The exact algorithm for sorting is defined by the individual node definitions. Example: CLOSEST means that the closest object by distance that satisfies the conditions of this pick sensor. *The exact algorithm for distance determination shall be defined by individual node definitions*.

#### Hint

- Browser implementations may define additional values and algorithms beyond these four required values.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFBool [out] **isActive**

*isActive* indicates when the intersecting object is picked by the picking geometry. Output event *isActive*=true gets sent once a picked item is found. Output event *isActive*=false gets sent once no picked item is found.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec3f [out] **pickedTextureCoordinate**

Output event containing 3D texture coordinates of surfaces computed by the picking intersection computations. Picked texture coordinates are in three dimensions. If the target texture coordinate has two dimensions, the third coordinate (z component of an SFVec3f) shall be zero.

#### Warnings

- If the target object has multiple textures defined, only texture coordinates for the first texture are returned and all other textures are ignored.
- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec3f [out] **pickedNormal**

Output event containing surface normal vectors computed by the picking intersection computations.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec3f [out] **pickedPoint**

Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **pickingGeometry** NULL <small>[IndexedLineSet|LineSet]</small>

*pickingGeometry* specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.

### MFNode [in, out] **pickTarget** [ ] <small>[X3DGroupingNode|X3DShapeNode|Inline]</small>

*pickTarget* specifies the list of nodes against which picking operations are performed. All nodes declared in this field and their descendents are evaluated for intersections.

### MFNode [out] **pickedGeometry**

Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Sort order for line picking is based on each pair of coordinates that defining a line segment, with first declared vertex of the segment defined to be the start of the line to which the intersection points are closest.
- [When the picking line segment intersects a coplanar polygon, computed intersection point(s) are illustrated in Figure 38.1](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/picking.html#f-LineIntersection)
- Picking is performed between rendered frames of the event model. An author sets up the picking request in one frame by placing a LinePickSensor in the desired location. At the start of the next frame, any picking intersections are reported by the pick sensor.
- Picking notification is performed at the start of the frame for all enabled pick sensors once all other sensors are processed.
- [Event timing details are explained in X3D Specification 4.4.8.3 Execution model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#ExecutionModel)
- [IndexedLineSet](/x_ite/components/rendering/indexedlineset/) or Lineset can be used for pickingGeometry node.

### Warning

- Order of contained nodes is significant, single pickingGeometry node must precede pickTarget node array.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Picking/LinePickSensor/LinePickSensor.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Picking/LinePickSensor/screenshot.avif" alt="LinePickSensor"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Picking/LinePickSensor/LinePickSensor.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Picking/LinePickSensor/LinePickSensor.x3d)
{: .example-links }

## See Also

- [X3D Specification of LinePickSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/picking.html#LinePickSensor)
