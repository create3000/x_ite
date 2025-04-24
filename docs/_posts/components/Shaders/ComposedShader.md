---
title: ComposedShader
date: 2023-01-07
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

The ComposedShader node belongs to the **Shaders** component and requires at least support level **1,** its default container field is *shaders.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DShaderNode
      + ComposedShader (X3DProgrammableShaderObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in\] [activate](#sfbool-in-activate)
- SFBool \[out\] [isSelected](#sfbool-out-isselected)
- SFBool \[out\] [isValid](#sfbool-out-isvalid)
- SFString \[ \] [language](#sfstring---language--cgglslhlsl)
- MFNode \[in, out\] [parts](#mfnode-in-out-parts---shaderpart)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **activate**

*activate* forces the shader to *activate* the contained objects.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [out] **isSelected**

*isSelected* indicates this shader instance is selected for use by browser

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isValid**

*isValid* indicates whether current shader objects can be run as a shader program.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFString [ ] **language** "" <small>["Cg"|"GLSL"|"HLSL"|...]</small>

The *language* field indicates to the X3D player which shading *language* is used. The *language* field may be used to optionally determine the *language* type if no MIME-type information is available.

#### Hint

- Recognized values include "Cg" "GLSL" "HLSL".

### MFNode [in, out] **parts** [ ] <small>[ShaderPart]</small>

ComposedShader can contain multiple [ShaderPart](/x_ite/components/shaders/shaderpart/) nodes in the *parts* field.

## Advice

### Hints

- ComposedShader contains field declarations and then corresponding IS/connect statements (if any), followed by Metadata* nodes (if any), then \<[ShaderPart](/x_ite/components/shaders/shaderpart/) `containerField='parts'/>` nodes.
- Apply default `containerField='shaders'` when parent node is [Appearance](/x_ite/components/shape/appearance/).

### Warning

- ComposedShader does not contain CDATA section of plain-text source code. All source programs are contained in child [ShaderPart](/x_ite/components/shaders/shaderpart/) nodes.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Shaders/ComposedShader/ComposedShader.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Shaders/ComposedShader/screenshot.avif" alt="ComposedShader"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Shaders/ComposedShader/ComposedShader.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Shaders/ComposedShader/ComposedShader.x3d)
{: .example-links }

## See Also

- [X3D Specification of ComposedShader Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#ComposedShader)
