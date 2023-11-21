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

DepthMode controls how pixels of an objects are drawn. Pixels can be drawn using a function that blends the incoming (source) RGBA values with the RGBA values that are already in the frame buffer (the destination values). DepthMode is an X3DAppearanceChildNode node that handles blend operations.

The DepthMode node belongs to the **X_ITE** component and its default container field is *blendMode.* It is available in Titania and X_ITE.

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

Information about this node can be contained in a [MetadataBoolean](../core/metadataboolean), [MetadataDouble](../core/metadatadouble), [MetadataFloat](../core/metadatafloat), [MetadataInteger](../core/metadatainteger), [MetadataString](../core/metadatastring) or [MetadataSet](../core/metadataset) node.


### SFVec2f [in, out] **polygonOffset** 0 0 <small>(-∞,∞)</small>
### SFBool [in, out] **depthTest** TRUE
### SFString [in, out] **depthFunc** NULL <small>[X3DMetadataObject]</small>
### SFVec2f [in, out] **depthRange** NULL <small>[0,1]</small>
### SFBool [in, out] **depthMask** TRUE

         new X3DFieldDefinition (X3DConstants .inputOutput, "polygonOffset", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthTest",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthFunc",     new Fields .SFString ("LESS_EQUAL")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthRange",    new Fields .SFVec2f (0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthMask",     new Fields .SFBool (true)),

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}
