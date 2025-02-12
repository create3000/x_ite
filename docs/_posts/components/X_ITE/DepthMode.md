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

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
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

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec2f [in, out] **polygonOffset** 0 0 <small>(-∞,∞)</small>

Specifies the scale factors and units to calculate depth values.

The offset is added before the depth test is performed and before the value is written into the depth buffer.

The first value is *factor*, a GLfloat which sets the scale factor for the variable depth offset for each polygon. The default value is 0.

The second value is *units*, a GLfloat which sets the multiplier by which an implementation-specific value is multiplied with to create a constant depth offset. The default value is 0.

### SFVec2f [in, out] **depthRange** 0 1 <small>[0,1]</small>

Specifies the depth range mapping from normalized device coordinates to window or viewport coordinates.

The first value is *zNear*, a GLclampf specifying the mapping of the near clipping plane to window or viewport coordinates. Clamped to the range 0 to 1 and must be less than or equal to zFar. The default value is 0.

The second value is *zFar*, a GLclampf specifying the mapping of the far clipping plane to window or viewport coordinates. Clamped to the range 0 to 1. The default value is 1.

### SFBool [in, out] **depthTest** TRUE

Activates depth comparisons and updates to the depth buffer.

### SFString [in, out] **depthFunction** "LESS_EQUAL" <small>["NEVER", "LESS", "EQUAL", "LESS_EQUAL", "GREATER", "NOT_EQUAL", "GREATER_EQUAL", "ALWAYS"]</small>

Specifies a function that compares incoming pixel depth to the current depth buffer value.

Must be one of the following symbolic constants:

* NEVER
* LESS
* EQUAL
* LESS_EQUAL
* GREATER
* NOT_EQUAL
* GREATER_EQUAL
* ALWAYS

### SFBool [in, out] **depthMask** TRUE

Sets whether writing into the depth buffer is enabled or disabled.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/X_ITE/DepthMode/screenshot.png" alt="DepthMode"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/DepthMode/DepthMode.x3d)
{: .example-links }

## See Also

* [Z-buffering](https://en.wikipedia.org/wiki/Z-buffering)
