---
title: ShaderPart
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [ShaderPart, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ShaderPart defines the source for a portion of source code used by a ComposedShader node. The source is not required to be a complete shader for all of the vertex/fragment processing.

The ShaderPart node belongs to the **Shaders** component and its default container field is *parts.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + ShaderPart (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFString [ ] **type** "VERTEX" <small>["VERTEX"|"FRAGMENT"]</small>

*type* indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTextureAtlas loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of shader. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

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

## Description

### Hints

- ShaderPart can contain a CDATA section of plain-text source code.
- ShaderPart subprograms are written in the same language, which is specified in the parent ComposedShader node.

### Warning

- ShaderPart contains no field definitions.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shaders/ShaderPart/ShaderPart.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of ShaderPart](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#ShaderPart){:target="_blank"}
