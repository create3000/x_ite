---
title: LayerSet
date: 2022-01-07
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

The LayerSet node belongs to the **Layering** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + LayerSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFInt32 [in, out] **activeLayer** <small>(0,∞)</small>

ActiveLayer field specifies the layer in which navigation takes place.

#### Hint

- Nodes that are not part of a layer are considered to be in layer 0.

### MFInt32 [in, out] **order** <small>(0,∞)</small>

The order list defines the order in which layers are rendered. Each value corresponds to the ordinals of the layers.

#### Hint

- The order list may contain repetitions of ordinal values, in which case the layer is rendered again.

#### Warnings

- If order contains number values that are not ordinals assigned to layers, such numbers are ignored. Layers that are not included in the order list are not rendered.

### MFNode [in, out] **layers** [ ] <small>[X3DLayerNode]</small>

The layers list defines a list of Layer nodes that contain the constituent parts of the scene. Each layer is assigned an ordinal number depending on its position in this contained list of nodes.

#### Hints

- Ordinal values start with the numeral 1 representing the first item in the list. Nodes that are not part of a layer are considered to be in layer 0.

## Description

### Hint

- The layer first specified in the order field is the first layer rendered and appears below any other layers. The layer last specified in the order field is the last layer rendered and correspondingly appears on top of all other layers.

### Warning

- Only one LayerSet node is allowed in a scene, and it shall be a root node at the top of the scene graph.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Layering/LayerSet/LayerSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of LayerSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layering.html#LayerSet){:target="_blank"}
- [X3D Abstract Specification 35.2.1 Overview of layering](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layering.html#OverviewOfLayering){:target="_blank"}
