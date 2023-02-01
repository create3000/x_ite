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

WorldInfo contains a title and persistent documentation or simple metadata information about an X3D scene.

The WorldInfo node belongs to the **Core** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInfoNode
      + WorldInfo
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [ ] **title** ""

Title of this world, placed in window title.

#### Hint

- Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

### MFString [ ] **info** [ ]

Additional information about this world.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

## External Links

- [X3D Specification of WorldInfo](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/core.html#WorldInfo){:target="_blank"}
- [X3D for Web Authors, Chapter 15, Metadata Information](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter15-Metadata/Chapter15-MetadataInformation.html){:target="_blank"}
