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

The LayerSet node belongs to the **Layering** component and requires at least level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + LayerSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFInt32 [in, out] **activeLayer** 0 <small>(0,∞)</small>

*activeLayer* field specifies the layer in which navigation takes place.

#### Hint

- Nodes that are not part of a layer are considered to be in layer 0.

### MFInt32 [in, out] **order** [ 0 ] <small>(0,∞)</small>

The *order* list defines the *order* in which layers are rendered. Each value corresponds to the ordinals of the layers.

#### Hint

- The *order* list may contain repetitions of ordinal values, in which case the layer is rendered again.

#### Warnings

- If *order* contains number values that are not ordinals assigned to layers, such numbers are ignored.
- Layers that are not included in the *order* list are not rendered.

### MFNode [in, out] **layers** [ ] <small>[X3DLayerNode]</small>

The *layers* list defines a list of [Layer](/x_ite/components/layering/layer/) nodes that contain the constituent parts of the scene. Each layer is assigned an ordinal number depending on its position in this contained list of nodes.

#### Hints

- Ordinal values start with the numeral 1 representing the first item in the list.
- Nodes that are not part of a layer are considered to be in layer 0.

## Advice

### Hints

- The layer first specified in the order field is the first layer rendered and appears below any other layers. The layer last specified in the order field is the last layer rendered and correspondingly appears on top of all other layers.
- [X3D Architecture 35.2.1 Overview of layering](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/layering.html#OverviewOfLayering){:target="_blank"}

### Warning

- Only one LayerSet node is allowed in a scene, and it shall be a root node at the top of the scene graph.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d" update="auto"></x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.zip) · [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d)

## See Also

- [X3D Specification of LayerSet node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layering.html#LayerSet){:target="_blank"}
