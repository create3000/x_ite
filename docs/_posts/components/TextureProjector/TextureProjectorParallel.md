---
title: TextureProjectorParallel
date: 2023-01-31
nav: components-TextureProjector
categories: [components, TextureProjector]
tags: [TextureProjectorParallel, TextureProjector]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

TextureProjectorParallel ...

The TextureProjectorParallel node belongs to the **TextureProjector** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **on** TRUE

### SFBool [in, out] **global** TRUE

### SFVec3f [in, out] **location** <small></small>

### SFVec3f [in, out] **direction** <small></small>

### SFVec3f [in, out] **upVector** <small></small>

### SFFloat [in, out] **nearDistance** 0 <small>-1 or (0,∞)</small>

### SFFloat [in, out] **farDistance** 0 <small>-1 or (0,∞)</small>

### SFFloat [out] **aspectRatio**

### SFNode [in, out] **texture** <small></small>

## External Links

- [X3D Specification of TextureProjectorParallel](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/textureprojector.html#TextureProjectorParallel){:target="_blank"}
