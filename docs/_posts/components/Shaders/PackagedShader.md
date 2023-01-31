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

### MFString [in, out] **url** [ ] <small>[URI]</small>

Input/Output field url.

### SFBool [in] **activate**

Activate forces the shader to activate the contained objects.

### SFBool [out] **isSelected**

IsSelected indicates this shader instance is selected for use by browser

### SFBool [out] **isValid**

IsValid indicates whether current shader objects can be run as a shader program.

### SFString [ ] **language** "" <small>["Cg"|"GLSL"|"HLSL"|...]</small>

The language field indicates to the X3D player which shading language is used. The language field may be used to optionally determine the language type if no MIME-type information is available.

#### Hint

Recognized values include "CG" "GLSL" "HLSL" "FX"

#### See Also

- [Relates to Internationalization (i18n)](https://www.w3.org/standards/webdesign/i18n){:target="_blank"}

## Description

### Hint

- PackagedShader contains IS/connect and field definitions.

Warning
-------

- PackagedShader can contain field declarations, but no CDATA section of plain-text source code.

## External Links

- [X3D Specification of PackagedShader](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#PackagedShader){:target="_blank"}
