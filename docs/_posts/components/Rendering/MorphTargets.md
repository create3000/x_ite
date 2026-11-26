---
title: MorphTarget
date: 2026-11-26
nav: components-Rendering
categories: [components, Rendering]
tags: [MorphTargets, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

**MorphTargets** node defines a morph target for a morph animation. It is used in conjunction with [MorphTarget](/x_ite/components/rendering/morphtarget/) node to define a morph animation.

The **MorphTargets** node belongs to the [Rendering](/x_ite/components/overview/#rendering) component and requires at least support level **5,** its default container field is *targets.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + MorphTargets
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| MFFloat | [in, out] | [weights](#fields-weights) | [ ] |
| MFNode | [in, out] | [targets](#fields-targets) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFFloat [in, out] **weights** [ ] <small>(-∞,∞)</small>
{: #fields-weights }

Input/Output field *weights*.

### MFNode [in, out] **targets** [ ] <small>[MorphTarget]</small>
{: #fields-targets }

Input/Output field *targets*.

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [MorphTarget](/x_ite/components/rendering/morphtarget/)
