---
title: MetadataString
date: 2022-01-07
nav: components-Core
categories: [components, Core]
tags: [MetadataString, Core]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MetadataString contains a typed list of values providing metadata information about its parent node. Further information about this specific Metadata node may be provided by a single child Metadata node with containerField="metadata".

The MetadataString node belongs to the **Core** component and its default container field is *metadata.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + MetadataString (X3DMetadataObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **name** ""

Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.

#### Warning

Name is not included if this instance is a USE node.

### SFString [in, out] **reference** ""

Reference to the metadata standard or definition defining this particular metadata value.

### MFString [in, out] **value** [ ]

The value attribute is a strictly typed data array providing relevant metadata information.

#### Hint

Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

## Description

### Hints

- Use containerField="value" if the parent node is MetadataSet.
- If a metadata node is needed as a top-level root node for the scene, first insert a parent WorldInfo (or WorldInfo/MetadataSet) to contain it.
- An IS statement precedes any sibling Metadata node, which in turn precedes any other sibling nodes.

## External Links

- [X3D Specification of MetadataString](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/core.html#MetadataString){:target="_blank"}
- [X3D for Web Authors, Chapter 15, Metadata Information](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter15-Metadata/Chapter15-MetadataInformation.html){:target="_blank"}
