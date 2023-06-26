---
title: WorldInfo
date: 2022-01-07
nav: components-Core
categories: [components, Core]
tags: [WorldInfo, Core]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

WorldInfo includes a browsesr-displayable title and persistent string information about an X3D scene. For X3D4 models, WorldInfo can also contain a single MetadataSet node with further metadata information about the scene.

The WorldInfo node belongs to the **Core** component and its default container field is *children.* It is available from X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInfoNode
      + WorldInfo
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [ ] **title** ""

*title* of this world, placed in window *title*.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### MFString [ ] **info** [ ]

Additional information about this model.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

## External Links

- [X3D Specification of WorldInfo](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/core.html#WorldInfo){:target="_blank"}
- [X3D for Web Authors, Chapter 15, Metadata Information](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter15-Metadata/Chapter15-MetadataInformation.html){:target="_blank"}
