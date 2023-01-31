---
title: ScreenFontStyle
date: 2022-01-07
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

The ScreenFontStyle node belongs to the **Layout** component and its default container field is *fontStyle.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DFontStyleNode
    + ScreenFontStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [ ] **language** ""

Language codes consist of a primary code and a (possibly empty) series of subcodes. [ language-code = primary-code ( "-" subcode )\* ] Two-letter primary codes are reserved for language abbreviations. Two-letter primary codes include en (English), fr (French), de (German), it (Italian), nl (Dutch), el (Greek), es (Spanish), pt (Portuguese), ar (Arabic), he (Hebrew), ru (Russian), zh (Chinese), ja (Japanese), hi (Hindi), ur (Urdu), and sa (Sanskrit). Any two-letter subcode is understood to be a country code.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

#### See Also

- [See ISO639.2 Codes for the Representation of Names of Languages](https://www.loc.gov/standards/iso639-2/php/code_list.php){:target="_blank"}
- [See RFC3066 Tags for the Identification of Languages](https://tools.ietf.org/html/rfc3066){:target="_blank"}
- [See ISO3166 or](http://xml.coverpages.org/languageIdentifiers.html){:target="_blank"}
- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

### MFString [ ] **family** "SERIF"

Array of quoted font family names in preference order, browsers use the first supported family.

#### Hints

Example family array might be "Times" "SERIF" Values with guaranteed support include "SERIF" "SANS" "TYPEWRITER". SERIF and SANS are variable-width fonts (for example, Times Roman and Arial). TYPEWRITER is a fixed-width font (for example, Courier). MFString arrays can have multiple values, so "separate each individual string" "by using quote marks". See [15.2.2.2 Font family and style](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/text.html#Fontfamilyandstyle){:target="_blank"} for details.

#### Warning

Font family support often varies.

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

### SFString [ ] **style** "PLAIN" <small>["PLAIN"|"BOLD"|"ITALIC"|"BOLDITALIC"|""]</small>

Pick one of four values for text style.

#### Hint

See [15.2.2.2 Font family and style](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/text.html#Fontfamilyandstyle){:target="_blank"} for details.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [ ] **pointSize** 12 <small>(0,∞)</small>

PointSize field specifies the size of text in points. Nominal height (in local coordinate system) of text glyphs Also sets default spacing between adjacent lines of text.

#### Hint

PointSize replaces the size field of the FontStyle node.

### SFFloat [ ] **spacing** 1 <small>[0,∞)</small>

Adjustment factor for line spacing between adjacent lines of text.

### SFBool [ ] **horizontal** TRUE

Whether text direction is horizontal (true) or vertical (false).

#### Hint

See [15.2.2.3 Direction and justification](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/text.html#Directionandjustification){:target="_blank"} for details.

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

### SFBool [ ] **leftToRight** TRUE

Field leftToRight.

### SFBool [ ] **topToBottom** TRUE

Whether text direction is top-to-bottom (true) or bottom-to-top (false).

#### Hint

See [15.2.2.3 Direction and justification](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/text.html#Directionandjustification){:target="_blank"} for details.

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

### MFString [ ] **justify** "BEGIN" <small>["BEGIN","END","FIRST","MIDDLE",""]</small>

The justify field determines alignment of the above text layout relative to the origin of the object coordinate system.

#### Hints

Preferred value is usually justify=' "MIDDLE" "MIDDLE" ' for centered justification horizontally and vertically. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks". See [15.2.2.3 Direction and justification](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/text.html#Directionandjustification){:target="_blank"} for details.

#### Warnings

Exactly two string values are provided for major and minor axis alignment. Do not use illegal values such as LEFT RIGHT TOP BOTTOM or CENTER.

## Description

### Hint

- First add a Text node as a parent.

## External Links

- [X3D Specification of ScreenFontStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#ScreenFontStyle){:target="_blank"}
