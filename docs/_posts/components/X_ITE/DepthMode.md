---
title: DepthMode
date: 2023-11-21
nav: components-X_ITE
categories: [components, X_ITE]
tags: [DepthMode, X_ITE]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

DepthMode contains parameters that are specific for depth control, like the value used for depth buffer comparisons.

The DepthMode node belongs to the **X_ITE** component and its default container field is *depthMode.* It is available in X_ITE.

>**Info:** Please note that the functionality of this node is still experimental.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DAppearanceChildNode
      + DepthMode
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFVec2f [in, out] **polygonOffset** 0 0 <small>(-∞,∞)</small>

Input/Output field *polygonOffset*.

### SFVec2f [in, out] **depthRange** 0 1 <small>[0,1]</small>

Input/Output field *depthRange*.

### SFBool [in, out] **depthTest** TRUE

Input/Output field *depthTest*.

### SFString [in, out] **depthFunction** "LESS_EQUAL" <small>["NEVER", "LESS", "EQUAL", "LESS_EQUAL", "GREATER", "NOT_EQUAL", "GREATER_EQUAL", "ALWAYS"]</small>

Input/Output field *depthFunction*.

### SFBool [in, out] **depthMask** TRUE

Input/Output field *depthMask*.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.x3d)
{: .example-links }

## See Also

* [Z-buffering](https://en.wikipedia.org/wiki/Z-buffering){:target="_blank"}
