---
title: ScreenFontStyle
date: 2023-01-07
nav: components-Layout
categories: [components, Layout]
tags: [ScreenFontStyle, Layout]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ScreenFontStyle is an X3DFontStyleNode defines the size, family, justification, and other styles used within a screen layout. ScreenFontStyle renders text so that it appears identical to typical 2D applications by specifying pointSize in points (as in 2D document layout) rather than size in meters. Each glyph of text is rendered as a quadrilateral with a texture applied.

The ScreenFontStyle node belongs to the **Layout** component and requires at least support level **2,** its default container field is *fontStyle.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DFontStyleNode
    + ScreenFontStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [language](#field-language) | "" |
| MFString | [in, out] | [family](#field-family) | "SERIF"  |
| SFString | [in, out] | [style](#field-style) | "PLAIN"  |
| SFFloat | [in, out] | [pointSize](#field-pointSize) | 12  |
| SFFloat | [in, out] | [spacing](#field-spacing) | 1  |
| SFBool | [in, out] | [horizontal](#field-horizontal) | TRUE |
| SFBool | [in, out] | [leftToRight](#field-leftToRight) | TRUE |
| SFBool | [in, out] | [topToBottom](#field-topToBottom) | TRUE |
| MFString | [in, out] | [justify](#field-justify) | "BEGIN"  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **language** ""
{: #field-language }

Language codes consist of a primary code and a (possibly empty) series of subcodes. [ *language*-code = primary-code ( "-" subcode )* ] Two-letter primary codes are reserved for *language* abbreviations. Two-letter primary codes include en (English), fr (French), de (German), it (Italian), nl (Dutch), el (Greek), es (Spanish), pt (Portuguese), ar (Arabic), he (Hebrew), ru (Russian), zh (Chinese), ja (Japanese), hi (Hindi), ur (Urdu), and sa (Sanskrit). Any two-letter subcode is understood to be a country code.

#### Hints

- [See ISO639.2 Codes for the Representation of Names of Languages](https://www.loc.gov/standards/iso639-2/php/code_list.php)
- [See RFC3066 Tags for the Identification of Languages](https://tools.ietf.org/html/rfc3066)
- [See ISO3166 or](https://xml.coverpages.org/languageIdentifiers.html)
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFString [in, out] **family** "SERIF" <small>String or [URI]</small>
{: #field-family }

Array of quoted font *family* names in preference order, browsers use the first supported *family*.

#### Hints

- Example *family* array might be "Times" "SERIF"
- Values with guaranteed support include "SERIF" "SANS" "TYPEWRITER".
- SERIF and SANS are variable-width fonts (for example, Times Roman and Arial).
- TYPEWRITER is a fixed-width font (for example, Courier).
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".
- [See 15.2.2.2 Font *family* and style](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Fontfamilyandstyle) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

#### Warning

- Font *family* support often varies.

### SFString [in, out] **style** "PLAIN" <small>["PLAIN"|"BOLD"|"ITALIC"|"BOLDITALIC"|""]</small>
{: #field-style }

Pick one of four values for text *style* (PLAIN or BOLD or ITALIC or BOLDITALIC).

#### Hints

- [See 15.2.2.2 Font family and *style*](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Fontfamilyandstyle) for details.
- Overlapping functionality with CSS *style* attribute provides a "best of both worlds" approach. The *style* attribute provides an inline block of CSS source for element styling, reserved for use by Cascading Style Sheets (CSS) and XML stylesheets.
- [X3D Architecture Annex L, HTML authoring guidelines, CSS considerations](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/htmlGuidelines.html#CSS)
- [W3C Cascading Style Sheets](https://www.w3.org/Style/CSS)
- [CSS Snapshot](https://www.w3.org/TR/css-2018)
- Https://www.w3.org/TR/css-*style*-attr
- [Wikibooks, XML - Managing Data Exchange/XSLT and Style Sheets](https://en.wikibooks.org/wiki/XML_-_Managing_Data_Exchange/XSLT_and_Style_Sheets)

#### Warnings

- Overloaded name for CSS *style* attribute.
- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [in, out] **pointSize** 12 <small>(0,∞)</small>
{: #field-pointSize }

*pointSize* field specifies the size of text in points. Nominal height (in local coordinate system) of text glyphs, also sets default spacing between adjacent lines of text.

#### Hints

- *pointSize* replaces the size field of the [FontStyle](/x_ite/components/text/fontstyle/) node.
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFFloat [in, out] **spacing** 1 <small>[0,∞)</small>
{: #field-spacing }

Adjustment factor for line *spacing* between adjacent lines of text.

#### Hint

- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **horizontal** TRUE
{: #field-horizontal }

Whether text direction is *horizontal* (true) or vertical (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **leftToRight** TRUE
{: #field-leftToRight }

Whether text direction is left-to-right (true) or right-to-left (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **topToBottom** TRUE
{: #field-topToBottom }

Whether text direction is top-to-bottom (true) or bottom-to-top (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### MFString [in, out] **justify** "BEGIN" <small>["BEGIN", "END", "FIRST", "MIDDLE", ""]</small>
{: #field-justify }

The *justify* field determines horizontal and vertical alignment of text layout, relative to the origin of the object coordinate system.

#### Hints

- Preferred value is usually *justify*=' "MIDDLE" "MIDDLE" ' for centered justification horizontally and vertically.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".
- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

#### Warnings

- Exactly two string values are provided for major and minor axis alignment.
- Do not use illegal values such as LEFT RIGHT TOP BOTTOM or CENTER.

## Supported File Formats

It is possible to specify in the *url* of a [FontLibrary](/x_ite/components/text/fontlibrary/) node one or more URLs of a custom font file of the following types:

| Encoding  | File Extension | MIME Type  |
|-----------|----------------|------------|
| WOFF2     | .woff2         | font/woff2 |
| WOFF      | .woff          | font/woff  |
| Open Type | .otf           | font/otf   |
| True Type | .ttf           | font/ttf   |

## Advice

### Hints

- First add a [Text](/x_ite/components/text/text/) node as a parent.
- [Wikipedia](https://en.wikipedia.org/wiki/Font)
- [Wikipedia](https://en.wikipedia.org/wiki/Typeface)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Layout/ScreenFontStyle/screenshot.avif" alt="ScreenFontStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of ScreenFontStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#ScreenFontStyle)
