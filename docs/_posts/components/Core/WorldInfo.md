---
title: WorldInfo
date: 2023-01-07
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

WorldInfo includes a browser-displayable title and persistent string information about an X3D scene. For X3D4 models, WorldInfo can also contain a single MetadataSet node with further metadata information about the scene.

The WorldInfo node belongs to the **Core** component and requires at least level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInfoNode
      + WorldInfo
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFString [in, out] **title** ""

*title* of this world, placed in window *title*.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### MFString [in, out] **info** [ ]

Additional information about this model.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

## Advice

### Hints

- Comments are not readable when a model file is loaded for viewing, but WorldInfo and Metadata* nodes are persistent and inspectable at run time.
- [WorldInfo is part of Core component and Core profile.](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#t-CoresupportLevels){:target="_blank"}
- [X3D for Web Authors, Chapter 15, Metadata Information](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter15-Metadata/Chapter15-MetadataInformation.html){:target="_blank"}

## See Also

- [X3D Specification of WorldInfo Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/core.html#WorldInfo){:target="_blank"}
