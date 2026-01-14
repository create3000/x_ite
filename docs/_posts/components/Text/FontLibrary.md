---
title: FontLibrary
date: 2023-03-02
nav: components-Text
categories: [components, Text]
tags: [FontLibrary, Text]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

FontLibrary can load additional fonts for use by Text and FontStyle nodes.

The FontLibrary node belongs to the [Text](/x_ite/components/overview/#text) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
    + FontLibrary (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFString | [in, out] | [family](#fields-family) | "" |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [in, out] **family** ""
{: #fields-family }

Array of quoted font *family* names in preference order, browsers use the first supported *family*.

#### Hints

- Example *family* array might be "Times" "SERIF"
- Values with guaranteed support include "SERIF" "SANS" "TYPEWRITER".
- SERIF and SANS are variable-width fonts (for example, Times Roman and Arial).
- TYPEWRITER is a fixed-width font (for example, Courier).
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".
- [See 15.2.2.2 Font *family* and style](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/text.html#Fontfamilyandstyle) for details.
- [Supports supports capabilities for Web Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- AccessType relaxed to inputOutput in order to support animation and user accessibility.

#### Warning

- Font *family* support often varies.

### SFBool [in, out] **load** TRUE
{: #fields-load }

The *load* field has no effect, [Anchor](/x_ite/components/networking/anchor/) operation is only triggered by user selection.

### MFString [in, out] **url** [ ] <small>[URI]</small>
{: #fields-url }

Address of replacement world, or #ViewpointDEFName within the current scene, or alternate Web resource, activated by the user selecting [Shape](/x_ite/components/shape/shape/) geometry within the [Anchor](/x_ite/components/networking/anchor/) children nodes.

#### Hints

- Jump to a world's internal viewpoint by appending viewpoint name (for example, #ViewpointName, someOtherCoolWorld.x3d#GrandTour).
- Jump to a local viewpoint by only using viewpoint name (for example, #GrandTour).
- Binding a different [Viewpoint](/x_ite/components/navigation/viewpoint/) triggers an isBound event that can initiate other user-arrival reactions via event chains to interpolators or scripts.
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- Pop up a new window with *url* value as follows: "JavaScript:window.open('somePage.html','popup','width=240,height=240');location.href='HelloWorld.x3d'"
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>
{: #fields-autoRefresh }

The [*autoRefresh* field has no effect, [Anchor](/x_ite/components/networking/anchor/) operation is only triggered by user selection.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>
{: #fields-autoRefreshTimeLimit }

The [*autoRefreshTimeLimit* field has no effect, [Anchor](/x_ite/components/networking/anchor/) operation is only triggered by user selection.

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

- Full Internationalization (i18n) and Localization (l10n) features are available for any written language.
- [Supports supports capabilities for Web Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n)
- [Wikipedia](https://en.wikipedia.org/wiki/Font)
- [Wikipedia](https://en.wikipedia.org/wiki/Typeface)
- [Open-source font libraries](https://fonts.google.com) and https://fontlibrary.org

## See Also

- [X3D Specification of FontLibrary Node](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Part01/components/text.html#FontLibrary)
