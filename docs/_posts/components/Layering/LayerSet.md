---
title: LayerSet
date: 2023-01-07
nav: components-Layering
categories: [components, Layering]
tags: [LayerSet, Layering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LayerSet defines a list of layers and a rendering order. The rendering order is specified by the order field.

The LayerSet node belongs to the **Layering** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + LayerSet
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFInt32 | [in, out] | [activeLayer](#fields-activeLayer) | 0  |
| MFInt32 | [in, out] | [order](#fields-order) | [ 0 ] |
| MFNode | [in, out] | [layers](#fields-layers) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [in, out] **activeLayer** 0 <small>(0,∞)</small>
{: #fields-activeLayer }

*activeLayer* field specifies the layer in which navigation takes place.

#### Hint

- Nodes that are not part of a layer are considered to be in layer 0.

### MFInt32 [in, out] **order** [ 0 ] <small>(0,∞)</small>
{: #fields-order }

The *order* list defines the *order* in which layers are rendered. Each value corresponds to the ordinals of the layers.

#### Hint

- The *order* list may contain repetitions of ordinal values, in which case the layer is rendered again.

#### Warnings

- If *order* contains number values that are not ordinals assigned to layers, such numbers are ignored.
- Layers that are not included in the *order* list are not rendered.

### MFNode [in, out] **layers** [ ] <small>[X3DLayerNode]</small>
{: #fields-layers }

The *layers* list defines a list of [Layer](/x_ite/components/layering/layer/) nodes that contain the constituent parts of the scene. Each layer is assigned an ordinal number depending on its position in this contained list of nodes.

#### Hints

- Ordinal values start with the numeral 1 representing the first item in the list.
- Nodes that are not part of a layer are considered to be in layer 0.

## Advice

### Hints

- The layer first specified in the order field is the first layer rendered and appears below any other layers. The layer last specified in the order field is the last layer rendered and correspondingly appears on top of all other layers.
- [X3D Architecture 35.2.1 Overview of layering](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/layering.html#OverviewOfLayering)

### Warning

- Only one LayerSet node is allowed in a scene, and it shall be a root node at the top of the scene graph.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Layering/LayerSet/screenshot.avif" alt="LayerSet"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d)
{: .example-links }

## See Also

- [X3D Specification of LayerSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layering.html#LayerSet)
