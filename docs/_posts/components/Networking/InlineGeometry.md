---
title: Inline
date: 2023-01-07
nav: components-Networking
categories: [components, Networking]
tags: [InlineGeometry, Networking, VRML, glTF]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

InlineGeometry can load another X3D or VRML model into the current scene via url. InlineGeometry is an X3DBoundedObject node that has bounding-box dimensions.

The InlineGeometry node belongs to the [Networking](/x_ite/components/overview/#networking) component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + InlineGeometry (X3DBoundedObject, X3DUrlObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **load** TRUE
{: #fields-load }

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded asset.

#### Hints

- Allows author to design when Inline loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>
{: #fields-url }

Address of X3D world to load Inline with current scene, retrieved either from local system or an online address. Browser support for X3D model support can include allowed file formats for XML .x3d, ClassicVRML .x3dv, X3D Binary .x3db, X3D JSON .json, and Virtual Reality Modeling Language (VRML97) .wrl.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>
{: #fields-autoRefresh }

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>
{: #fields-autoRefreshTimeLimit }

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

## Supported File Formats

| Encoding         | File Extension | MIME Type       | Comment                                       |
|------------------|----------------|-----------------|-----------------------------------------------|
| X3D XML          | .x3d, .x3dz    | model/x3d+xml   | [X3D Encoding: XML][1]                        |
| X3D JSON         | .x3dj, .x3djz  | model/x3d+json  | [X3D Encoding: JSON][2]                       |
| X3D Classic VRML | .x3dv, .x3dvz  | model/x3d+vrml  | [X3D Encoding: Classic VRML][3]               |
| VRML 2.0         | .wrl, .wrz     | model/vrml      | [VRML Specification][4]                       |
| glTF             | .gltf, .glb    | model/gltf+json | [glTF Support](/x_ite/features/#gltf-support) |
| Wavefront OBJ    | .obj           | model/obj       |                                               |
| STL              | .stl           | model/stl       | ASCII & Binary                                |
| PLY              | .ply           | model/ply       | ASCII & Binary                                |
| SVG Document     | .svg, .svgz    | image/svg+xml   |                                               |

  [1]: https://www.web3d.org/documents/specifications/19776-1/V3.3/index.html
  [2]: https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19776-5v4.0-WD1/Part05/X3D_JSON.html
  [3]: https://www.web3d.org/documents/specifications/19776-2/V3.3/index.html
  [4]: https://www.web3d.org/documents/specifications/14772/V2.0/

>**Tip:** All files can be compressed using GZip compression (usually denoted by a 'z' at the end of the filename suffix). This saves bandwidth and speeds up download time.
{: .prompt-tip }

## See Also

- [X3D Specification of InlineGeometry Node](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Part01/components/networking.html#InlineGeometry)
