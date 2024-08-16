---
title: Layout
date: 2023-01-07
nav: components-Layout
categories: [components, Layout]
tags: [Layout, Layout]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Layout node is used as layout field of LayoutLayer and LayoutGroup nodes. Layout provides all parameters required to define the size, location and scale of a 2D rectangular region.

The Layout node belongs to the **Layout** component and requires at least level **1,** its default container field is *layout.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLayoutNode
      + Layout
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFString [in, out] **align** [ "CENTER", "CENTER" ] <small>["LEFT"|"CENTER"|"RIGHT"]</small>

The *align* field values *align* the sized rectangle to an edge or center of the parent rectangle. Two quoted string values are provided. The first value is for horizontal direction (LEFT or CENTER or RIGHT) and the second value is for vertical direction (BOTTOM or CENTER or TOP). Examples: "CENTER" "CENTER" (default value), "LEFT" "TOP" or "RIGHT" "BOTTOM".

#### Hint

- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

#### Warnings

- Two values (or possibly one value) only.
- If the *align* field has only one value, that value shall be "CENTER" and apply both horizontally and vertically.

### MFString [in, out] **offsetUnits** [ "WORLD", "WORLD" ] <small>["WORLD"|"FRACTION"|"PIXEL"]</small>

The *offsetUnits* field values are used to interprete the offset values. Two quoted string values are provided. The first value is for horizontal offset, and the second value is for vertical offset. Examples: "WORLD" "WORLD" (default value), "FRACTION" "FRACTION" or "PIXEL" "PIXEL".

#### Hints

- If the value of the *offsetUnits* field is FRACTION, the size of the corresponding dimension is interpreted as a fraction of the corresponding parent’s dimension.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

#### Warning

- If only one value is provided, it applies equally to horizontal and vertical directions (width and height). More than two values are not allowed.

### MFFloat [in, out] **offset** [ 0, 0 ] <small>(-∞,∞)</small>

The values of the *offset* field are used to translate the location of this rectangle after the initial alignment. The offsetUnits field specifies how to interpret the *offset* field.

#### Warning

- If only one value is provided, it applies equally to horizontal and vertical directions (width and height). More than two values are not allowed.

### MFString [in, out] **sizeUnits** [ "WORLD", "WORLD" ] <small>["WORLD"|"FRACTION"|"PIXEL"]</small>

The *sizeUnits* field values are used to interprete the offset values. Two quoted string values are provided. The first value is for horizontal size, and the second value is for vertical size. Examples: "WORLD" "WORLD" (default value), "FRACTION" "FRACTION" or "PIXEL" "PIXEL".

#### Hints

- If the value of the *sizeUnits* field is FRACTION, the size of the corresponding dimension is interpreted as a fraction of the corresponding parent’s dimension.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

#### Warning

- If only one value is provided, it applies equally to horizontal and vertical directions (width and height). More than two values are not allowed.

### MFFloat [in, out] **size** [ 1, 1 ] <small>(0,∞)</small>

The two values in the *size* field define the width and height of the layout rectangle. The sizeUnits field specifies how to interpret the *size* values.

#### Warning

- If only one value is provided, it applies equally to horizontal and vertical directions (width and height). More than two values are not allowed.

### MFString [in, out] **scaleMode** [ "NONE", "NONE" ] <small>["NONE"|"FRACTION"|"STRETCH"|"PIXEL"]</small>

The *scaleMode* field specifies how the scale of the parent is modified. Two quoted string values are provided. The first value is for horizontal scale and the second value is for vertical scale. Examples: "NONE" "NONE" (default value), "FRACTION" "FRACTION", "STRETCH" "STRETCH" or "PIXEL" "PIXEL".

#### Hints

- A *scaleMode* field value of NONE specifies that the corresponding scale value is not modified. Instead, the scale is inherited from its parent. Since a [LayoutLayer](/x_ite/components/layout/layoutlayer/) node does not have a parent, the value of NONE reverts to FRACTION.
- A *scaleMode* value of FRACTION specifies a scale in the corresponding direction so that one unit is equal to the dimension (width or height) of this rectangle.
- A *scaleMode* value of STRETCH specifies a scale in the corresponding direction such that the resulting scale in the horizontal direction is equal to the scale in the vertical direction, thus producing a uniform scale.
- A value of PIXEL specifies a scale in the corresponding direction such that one unit is equal to one pixel.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

#### Warning

- If only one value is provided, it applies equally to horizontal and vertical directions (width and height). More than two values are not allowed.

## Advice

### Hint

- The align, offset, and offsetUnits fields are used to determine the location of the layout region.

## See Also

- [X3D Specification of Layout Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#Layout)
