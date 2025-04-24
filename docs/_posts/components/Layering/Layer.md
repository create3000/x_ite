---
title: Layer
date: 2023-01-07
nav: components-Layering
categories: [components, Layering]
tags: [Layer, Layering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Layer contains a list of children nodes that define the contents of the layer.

The Layer node belongs to the **Layering** component and requires at least support level **1,** its default container field is *layers.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DLayerNode
    + Layer
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in, out] | [pickable](#field-pickable) | TRUE |
| MFString | [in, out] | [objectType](#field-objectType) | "ALL"  |
| SFBool | [in, out] | [pointerEvents](#field-pointerEvents) | TRUE  |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFNode | [in, out] | [viewport](#field-viewport) | NULL  |
| MFNode | [in] | [addChildren](#field-addChildren) |  |
| MFNode | [in] | [removeChildren](#field-removeChildren) |  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **pickable** TRUE
{: #field-pickable }

*pickable* determines whether pick traversal is performed for this layer.

### MFString [in, out] **objectType** "ALL" <small>["ALL", "NONE", "TERRAIN", ...]</small>
{: #field-objectType }

The *objectType* field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances. Example: labeling a [PickableGroup](/x_ite/components/picking/pickablegroup/) with the *objectType* value "WATER" and then attempting to intersect a pick sensor with *objectType* value "GROUND" fails since the *objectType* values do not match. Example: the special value "ALL" means that each node is available for picking regardless of the type specified by the pick sensor. Example: the special value "NONE" effectively disables all picking for this node and is the equivalent of setting the pickable field to false.

#### Hints

- Authors may define any value for *objectType*.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFBool [in, out] **pointerEvents** TRUE <small class="blue">non-standard</small>
{: #field-pointerEvents }

*pointerEvents* defines whether this Layer becomes target for pointer events.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFNode [in, out] **viewport** NULL <small>[X3DViewportNode]</small>
{: #field-viewport }

The *viewport* field is a single [Viewport](/x_ite/components/layering/viewport/) node that constrains layer output to a sub-region of the render surface.

### MFNode [in] **addChildren**
{: #field-addChildren }

Input field *addChildren*.

### MFNode [in] **removeChildren**
{: #field-removeChildren }

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>
{: #field-children }

Nodes making up this layer.

#### Hints

- No transformations are possible above each [LayerSet](/x_ite/components/layering/layerset/)/Layer combination in the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- No transformations are possible above each [LayerSet](/x_ite/components/layering/layerset/)/Layer combination in the scene graph hierarchy.
- Each Layer node contains its own binding stacks and thus has its own viewpoints and navigation.

## See Also

- [X3D Specification of Layer Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layering.html#Layer)
