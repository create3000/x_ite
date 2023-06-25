---
title: ShaderProgram
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [ShaderProgram, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ShaderProgram is contained by ProgramShader and provides the source and interface to a self-contained program that occupies one part of the rendering process: either a vertex or fragment shader.

The ShaderProgram node belongs to the **Shaders** component and its default container field is *programs.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + ShaderProgram (X3DUrlObject, X3DProgrammableShaderObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &#38; for & ampersand character, or &#34; for " quotation-mark character).

### SFString [ ] **type** "VERTEX" <small>["VERTEX"|"FRAGMENT"]</small>

*type* indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when Inline loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of shader. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- Embedded ecmascript: source can also be contained in the sourceCode pseudo-field without escape characters, equivalent to last entry in the *url* list, when using other API codebases and file encodings.
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

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

## Description

### Hints

- ShaderProgram contains IS/connect and field definitions.
- ShaderProgram can contain a CDATA section of plain-text source code.

## External Links

- [X3D Specification of ShaderProgram](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#ShaderProgram){:target="_blank"}
