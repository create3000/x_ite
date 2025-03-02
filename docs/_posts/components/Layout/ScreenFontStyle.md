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

The ScreenFontStyle node belongs to the **Layout** component and requires at least level **2,** its default container field is *fontStyle.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DFontStyleNode
    + ScreenFontStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **language** ""

Language codes consist of a primary code and a (possibly empty) series of subcodes. [ *language*-code = primary-code ( "-" subcode )* ] Two-letter primary codes are reserved for *language* abbreviations. Two-letter primary codes include en (English), fr (French), de (German), it (Italian), nl (Dutch), el (Greek), es (Spanish), pt (Portuguese), ar (Arabic), he (Hebrew), ru (Russian), zh (Chinese), ja (Japanese), hi (Hindi), ur (Urdu), and sa (Sanskrit). Any two-letter subcode is understood to be a country code.

#### Hints

- [See ISO639.2 Codes for the Representation of Names of Languages](https://www.loc.gov/standards/iso639-2/php/code_list.php)
- [See RFC3066 Tags for the Identification of Languages](https://tools.ietf.org/html/rfc3066)
- [See ISO3166 or](https://xml.coverpages.org/languageIdentifiers.html)
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of font files. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### MFString [in, out] **family** "SERIF" <small>String or [URI]</small>

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

*pointSize* field specifies the size of text in points. Nominal height (in local coordinate system) of text glyphs, also sets default spacing between adjacent lines of text.

#### Hints

- *pointSize* replaces the size field of the [FontStyle](/x_ite/components/text/fontstyle/) node.
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFFloat [in, out] **spacing** 1 <small>[0,∞)</small>

Adjustment factor for line *spacing* between adjacent lines of text.

#### Hint

- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **horizontal** TRUE

Whether text direction is *horizontal* (true) or vertical (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **leftToRight** TRUE

Whether text direction is left-to-right (true) or right-to-left (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### SFBool [in, out] **topToBottom** TRUE

Whether text direction is top-to-bottom (true) or bottom-to-top (false).

#### Hints

- [See 15.2.2.3 Direction and justification](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Directionandjustification) for details.
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

### MFString [in, out] **justify** "BEGIN" <small>["BEGIN", "END", "FIRST", "MIDDLE", ""]</small>

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

It is possible to specify in the *url* field one or more URLs of a custom font file of the following types:

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
  <img src="https://create3000.github.io/media/examples/Layout/ScreenFontStyle/screenshot.png" alt="ScreenFontStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Layout/ScreenFontStyle/ScreenFontStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of ScreenFontStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#ScreenFontStyle)
