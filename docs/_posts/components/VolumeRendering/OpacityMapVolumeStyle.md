---
title: OpacityMapVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [OpacityMapVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

OpacityMapVolumeStyle specifies that volumetric data is rendered using opacity mapped to a transfer function texture.

The OpacityMapVolumeStyle node belongs to the **VolumeRendering** component and requires at least support level **1,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + OpacityMapVolumeStyle
```

## Fields

- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFNode \[in, out\] [transferFunction](#sfnode-in-out-transferfunction-null-x3dtexture2dnode-x3dtexture3dnode)
{: .fields }

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFNode [in, out] **transferFunction** NULL <small>[X3DTexture2DNode,X3DTexture3DNode]</small>

The *transferFunction* field holds a single texture representation in either two or three dimensions that maps the voxel data values to a specific colour output. If no value is supplied for this field, the default implementation shall generate a 256x1 alpha-only image that blends from completely transparent at pixel 0 to fully opaque at pixel 255.The texture may be any number of dimensions and any number of components. The voxel values are used as a lookup coordinates into the transfer function texture, where the texel value represents the output colour.

## Advice

### Hint

- Contains a single ImageTexture2D or [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/) node with `containerField='transferFunction'.` Voxel values are used as lookup coordinates into the transfer function texture, where the texel value represents the output color.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## See Also

- [X3D Specification of OpacityMapVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#OpacityMapVolumeStyle)
