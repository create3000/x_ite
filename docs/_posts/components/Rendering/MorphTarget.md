---
title: MorphTarget
date: 2026-11-26
nav: components-Rendering
categories: [components, Rendering]
tags: [MorphTarget, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

**MorphTarget** node defines a morph target for a morph animation. It is used in conjuction with [MorphTargets](/x_ite/components/rendering/morphtargets/) node to define a morph animation.

The **MorphTarget** node belongs to the [Rendering](/x_ite/components/overview/#rendering) component and requires at least support level **1,** its default container field is *morphTarget.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + MorphTarget
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| MFColor | [in, out] | [color](#fields-color) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFColor [in, out] **color** [ ] <small>[0,1]</small>
{: #fields-color }

The *color* field defines an array of 3-tuple RGB colors.

## Advice

### Hints

- Colors are often controlled by [Material](/x_ite/components/shape/material/) instead.
- [X3D Scene Authoring Hints, **Color**](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> |
{: .browser-compatibility }

## See Also

- [MorphTargets](/x_ite/components/rendering/morphtargets/)
