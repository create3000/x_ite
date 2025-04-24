---
title: PackagedShader
date: 2023-01-07
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

PackagedShader contains a url for a single file that may contain a number of shaders and combined effects.

The PackagedShader node belongs to the **Shaders** component and requires at least support level **1,** its default container field is *shaders.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DShaderNode
      + PackagedShader (X3DUrlObject, X3DProgrammableShaderObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in\] [activate](#sfbool-in-activate)
- SFBool \[out\] [isSelected](#sfbool-out-isselected)
- SFBool \[out\] [isValid](#sfbool-out-isvalid)
- SFString \[ \] [language](#sfstring---language--cgglslhlsl)
- SFBool \[in, out\] [load](#sfbool-in-out-load-true)
- MFString \[in, out\] [url](#mfstring-in-out-url---uri)
- SFTime \[in, out\] [autoRefresh](#sftime-in-out-autorefresh-0-0)
- SFTime \[in, out\] [autoRefreshTimeLimit](#sftime-in-out-autorefreshtimelimit-3600-0)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

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

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

*url* points to a shader source-code file that may contain a number of shaders and combined effects.

#### Hint

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

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

## Advice

### Hints

- PackagedShader contains field declarations and then corresponding IS/connect statements (if any).
- Apply default `containerField='shaders'` when parent node is [Appearance](/x_ite/components/shape/appearance/).
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### Warning

- PackagedShader does not contain CDATA section of plain-text source code.

## See Also

- [X3D Specification of PackagedShader Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shaders.html#PackagedShader)
