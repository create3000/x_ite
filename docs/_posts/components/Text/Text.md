---
title: Text
date: 2023-01-07
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

The Text node belongs to the **Text** component and requires at least level **1,** its default container field is *geometry.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Text
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### MFString [in, out] **string** [ ]

Single or multiple *string* values to present as Text. Each value in the *string* array (including empty strings) gets displayed on a separate line.

#### Hints

- MFString arrays can have multiple values, so separate each individual *string* by quote marks.
- Strings can contain quote marks by first escaping them with a backslash example: "say \"hello\" please"
- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).
- [Relates to Internationalization (i18n)](http://www.w3.org/standards/webdesign/i18n){:target="_blank"} [Example](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter02-GeometryPrimitives/TextIndex.html){:target="_blank"} [Example](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter02-GeometryPrimitives/TextSpecialCharactersIndex.html){:target="_blank"}

### MFFloat [in, out] **length** [ ] <small>[0,∞)</small>

Array of *length* values for each text string in the local coordinate system. Each string is stretched or compressed to fit.

### SFFloat [in, out] **maxExtent** 0 <small>[0,∞)</small>

Limits/compresses all text strings if max string length is longer than *maxExtent*, as measured in local coordinate system.

### SFBool [ ] **solid** FALSE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warnings

- Default value true can completely hide geometry if viewed from wrong side!
- *solid* false not supported in VRML97.

### SFVec3f [out] **origin**

*origin* of the text local coordinate system, in units of the coordinate system in which the Text node is embedded. The value of the *origin* field represents the upper left corner of the textBounds.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec2f [out] **textBounds**

2D bounding box value for all lines of text in the local coordinate system.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFVec2f [out] **lineBounds**

Array of 2D bounding box values for each line of text in the local coordinate system.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **fontStyle** NULL <small>[X3DFontStyleNode]</small>

The *fontStyle* field can contain a [FontStyle](/x_ite/components/text/fontstyle/) or [ScreenFontStyle](/x_ite/components/layout/screenfontstyle/) node defining size, family, and style for presented text.

#### Hint

- [Wikipedia](https://en.wikipedia.org/wiki/Font){:target="_blank"}

## Advice

### Hints

- [String (computer science)](https://en.wikipedia.org/wiki/String_(computer_science)){:target="_blank"}
- Full internationalization (i18n) and localization (l10n) features are available for any written language.
- [Relates to Internationalization (i18n)](http://www.w3.org/standards/webdesign/i18n){:target="_blank"}
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.

### Warning

- Text node requires X3D `profile='Immersive'` or `<component name='Text' level='1'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Text/Text/Text.x3d" update="auto"></x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/Text/Text/Text.zip) · [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Text/Text/Text.x3d)

## See Also

- [X3D Specification of Text node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/text.html#Text){:target="_blank"}
