---
title: ProgramShader
date: 2023-01-07
nav: components-Shaders
categories: [components, Shaders]
tags: [ProgramShader, Shaders]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ProgramShader defines a shader that consists of one or more individually programmable, self-contained pieces. ProgramShader contains IS/connect and programs [ShaderProgram] nodes.

The ProgramShader node belongs to the **Shaders** component and requires at least support level **1,** its default container field is *shaders.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DShaderNode
      + ProgramShader
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in] | [activate](#field-activate) |  |
| SFBool | [out] | [isSelected](#field-isSelected) |  |
| SFBool | [out] | [isValid](#field-isValid) |  |
| SFString | [ ] | [language](#field-language) | ""  |
| MFNode | [in, out] | [programs](#field-programs) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **activate**
{: #field-activate }

*activate* forces the shader to *activate* the contained objects.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [out] **isSelected**
{: #field-isSelected }

*isSelected* indicates this shader instance is selected for use by browser

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isValid**
{: #field-isValid }

*isValid* indicates whether current shader objects can be run as a shader program.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFString [ ] **language** "" <small>["Cg"|"GLSL"|"HLSL"|...]</small>
{: #field-language }

The *language* field indicates to the X3D player which shading *language* is used. The *language* field may be used to optionally determine the *language* type if no MIME-type information is available.

#### Hint

- Recognized values include "Cg" "GLSL" "HLSL".

### MFNode [in, out] **programs** [ ] <small>[ShaderProgram]</small>
{: #field-programs }

ProgramShader contains zero or more [ShaderProgram](/x_ite/components/shaders/shaderprogram/) node instances. In general, only two [ShaderProgram](/x_ite/components/shaders/shaderprogram/) instances are needed: one each for vertex and fragment processing.

#### Hint

- Each shader language defines required behavior for processing this field.

## Advice

### Hint

- Apply default `containerField='shaders'` when parent node is [Appearance](/x_ite/components/shape/appearance/).

### Warning

- ProgramShader contains no field declarations and no plain-text CDATA block source code.

## See Also

- [X3D Specification of ProgramShader Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#ProgramShader)
