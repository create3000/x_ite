---
title: PackagedShader
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [PackagedShader, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PackagedShader describes a single file that may contain a number of shaders and combined effects.

The PackagedShader node belongs to the **Shaders** component and its default container field is *shaders.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DShaderNode
      + PackagedShader (X3DUrlObject, X3DProgrammableShaderObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **load** TRUE

*load*=true means load immediately, load=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when ImageTextureAtlas loading occurs via user interaction, event chains or scripting.
- Use a separate LoadSensor node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

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

### SFBool [in] **activate**

*activate* forces the shader to activate the contained objects.

### SFBool [out] **isSelected**

*isSelected* indicates this shader instance is selected for use by browser

### SFBool [out] **isValid**

*isValid* indicates whether current shader objects can be run as a shader program.

### SFString [ ] **language** "" <small>["Cg"|"GLSL"|"HLSL"|...]</small>

The language field indicates to the X3D player which shading language is used. The language field may be used to optionally determine the language type if no MIME-type information is available.

#### Hint

- Recognized values include "CG" "GLSL" "HLSL" "FX"

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

## Description

### Hint

- PackagedShader contains IS/connect and field definitions.

### Warning

- PackagedShader can contain field declarations, but no CDATA section of plain-text source code.

## External Links

- [X3D Specification of PackagedShader](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#PackagedShader){:target="_blank"}
