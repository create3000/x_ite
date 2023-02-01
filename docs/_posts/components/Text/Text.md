---
title: Text
date: 2022-01-07
nav: components-Text
categories: [components, Text]
tags: [Text, Text]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Text is a 2D (flat) geometry node that can contain multiple lines of string values. Layout and styling is controlled by a contained FontStyle node.

The Text node belongs to the **Text** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Text
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **string** [ ]

Single or multiple string values to present as Text. Each value in the string array (including empty strings) gets displayed on a separate line.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks. Strings can contain quote marks by first escaping them with a backslash example: "say "hello" please" Many XML tools substitute XML character references automatically if needed (such as &amp;#38; for &amp; ampersand, or &amp;#34; for " quotation mark).

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

### MFFloat [in, out] **length** [ ] <small>[0,∞)</small>

Array of length values for each text string in the local coordinate system. Each string is stretched or compressed to fit.

### SFFloat [in, out] **maxExtent** 0 <small>[0,∞)</small>

Limits/compresses all text strings if max string length is longer than maxExtent, as measured in local coordinate system.

### SFBool [ ] **solid** FALSE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side! Solid false not supported in VRML97.

### SFVec3f [out] **origin**

Origin of the text local coordinate system, in units of the coordinate system in which the Text node is embedded. The value of the origin field represents the upper left corner of the textBounds.

### SFVec2f [out] **textBounds**

2D bounding box value for all lines of text in the local coordinate system.

### MFVec2f [out] **lineBounds**

Array of 2D bounding box values for each line of text in the local coordinate system.

### SFNode [in, out] **fontStyle** NULL <small>[X3DFontStyleNode]</small>

Input/Output field fontStyle.

## Description

### Hints

- Full internationalization (i18n) and localization (l10n) features are available for any written language.
- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Text/Text/Text.x3d"></x3d-canvas>

## See Also

- [FontStyle](/x_ite/components/text/fontstyle)
- [ScreenFontStyle](/x_ite/components/layout/screenfontstyle)

## External Links

- [X3D Specification of Text](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/text.html#Text){:target="_blank"}
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}
