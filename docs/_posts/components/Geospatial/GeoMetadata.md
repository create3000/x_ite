---
title: GeoMetadata
date: 2022-01-07
nav: components-Geospatial
categories: [components, Geospatial]
tags: [GeoMetadata, Geospatial]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeoMetadata includes a generic subset of metadata about the geographic data.

The GeoMetadata node belongs to the **Geospatial** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DInfoNode
      + GeoMetadata
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Hypertext link to an external, complete metadata description.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### MFString [in, out] **summary** [ ]

The summary string array contains a set of keyword/value pairs, with each keyword and its subsequent value contained in separate strings.

#### Hints

- Example `<GeoMetadata summary=' "title" "San Francisco, California USA" '/>`. There should always be an even (or zero) number of strings to match key-value pairs.

#### See Also

- [Table 25.5, GeoMetadata keywords and values](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#t-keywordsandvalues){:target="_blank"}

### MFNode [in, out] **data** [ ]

DEF list of all nodes that implement this data. If no specific geospatial nodes are identified, then this GeoMetadata node pertains to entire scene.

## Description

### Hint

- Include `<component name='Geospatial' level='1'/>`

## External Links

- [X3D Specification of GeoMetadata](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geospatial.html#GeoMetadata){:target="_blank"}
