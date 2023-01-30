---
title: BooleanFilter
date: 2022-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [BooleanFilter, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BooleanFilter selectively passes true, false or negated events.

The BooleanFilter node belongs to the **EventUtilities** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + BooleanFilter
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_boolean**

Set_boolean is the input value to be filtered.

### SFBool [out] **inputFalse**

InputFalse only passes a false value, which occurs when set_boolean is false.

#### Hint

InputFalse can only provide a value of false.

### SFBool [out] **inputTrue**

InputTrue only passes a true value, which occurs when set_boolean input is true.

#### Hint

InputTrue can only provide a value of true.

### SFBool [out] **inputNegate**

InputNegate provides an opposite value by negating set_boolean input.

## External Links

- [X3D Specification of BooleanFilter](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanFilter){:target="_blank"}
- [Example scenes and authoring assets at](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting){:target="_blank"}
- [X3D Event-Utility Nodes, Field Event Diagrams](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf){:target="_blank"}
