---
title: BehaviorEngine
date: 2026-11-02
nav: components-X_ITE
categories: [components, X_ITE]
tags: [BehaviorEngine, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

**BehaviorEngine** is an extension for glTF interactive features.

The **BehaviorEngine** node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + BehaviorEngine
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFString | [in, out] | [version](#fields-version) | "2.1" |
| SFInt32 | [in, out] | [graph](#fields-graph) | -1 |
| MFString | [in, out] | [graphs](#fields-graphs) | [ ] |
| MFNode | [in, out] | [animations](#fields-animations) | [ ] |
| MFNode | [in, out] | [nodes](#fields-nodes) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Input/Output field *enabled*.

### SFString [in, out] **version** "2.1"
{: #fields-version }

Input/Output field *version*.

### SFInt32 [in, out] **graph** -1 <small>[-1,∞)</small>
{: #fields-graph }

Input/Output field *graph*.

### MFString [in, out] **graphs** [ ]
{: #fields-graphs }

Input/Output field *graphs*.

### MFNode [in, out] **animations** [ ] <small>[TimeSensor]</small>
{: #fields-animations }

Input/Output field *animations*.

### MFNode [in, out] **nodes** [ ] <small>[X3DNode]</small>
{: #fields-nodes }

Input/Output field *nodes*.

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_interactivity Extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_interactivity)
