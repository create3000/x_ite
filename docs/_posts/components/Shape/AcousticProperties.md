---
title: AcousticProperties
date: 2023-01-31
nav: components-Shape
categories: [components, Shape]
tags: [AcousticProperties, Shape]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

AcousticProperties ...

The AcousticProperties node belongs to the **Shape** component and its default container field is *AcousticProperties.* It is available since X3D version 4.0 or later.

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

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTexture loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### SFBool [in, out] **enabled** <small></small>

### SFFloat [in, out] **absorption** 0 <small></small>

### SFFloat [in, out] **refraction** 0 <small></small>

### SFFloat [in, out] **diffuse** 0 <small></small>

### SFFloat [in, out] **specular** 0 <small></small>

## External Links

- [X3D Specification of AcousticProperties](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#AcousticProperties){:target="_blank"}
