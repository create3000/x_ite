---
title: ComposedShader
date: 2022-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [ComposedShader, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedShader defines a shader where the individual source files are assembled from contained ShaderPart program sections. All access to shading capabilities is defined through a single interface that applies to all parts.

The ComposedShader node belongs to the **Shaders** component and its default container field is *shaders.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DShaderNode
      + ComposedShader (X3DProgrammableShaderObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

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

### MFNode [in, out] **parts** [ ] <small>[ShaderPart]</small>

Input/Output field parts.

## Description

### Hint

- ComposedShader contains field definitions, IS/connect, and `<ShaderPart containerField='parts'/>` nodes.

### Warning

- ComposedShader can contain field declarations, but no CDATA section of plain-text source code. All source programs are contained in child ShaderPart nodes.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shaders/ComposedShader/ComposedShader.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ComposedShader](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#ComposedShader){:target="_blank"}
