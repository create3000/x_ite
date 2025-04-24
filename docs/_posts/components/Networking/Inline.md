---
title: Inline
date: 2023-01-07
nav: components-Networking
categories: [components, Networking]
tags: [Inline, Networking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Inline can load another X3D or VRML model into the current scene via url. Inline is an X3DBoundedObject node that has bounding-box dimensions.

The Inline node belongs to the **Networking** component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + Inline (X3DBoundedObject, X3DUrlObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [global](#sfbool-in-out-global-false)
- SFBool \[in, out\] [load](#sfbool-in-out-load-true)
- MFString \[in, out\] [url](#mfstring-in-out-url---uri)
- SFTime \[in, out\] [autoRefresh](#sftime-in-out-autorefresh-0-0)
- SFTime \[in, out\] [autoRefreshTimeLimit](#sftime-in-out-autorefreshtimelimit-3600-0)
- SFBool \[in, out\] [visible](#sfbool-in-out-visible-true)
- SFBool \[in, out\] [bboxDisplay](#sfbool-in-out-bboxdisplay-false)
- SFVec3f \[ \] [bboxSize](#sfvec3f---bboxsize--1--1--1-0-or-1-1-1)
- SFVec3f \[ \] [bboxCenter](#sfvec3f---bboxcenter-0-0-0--)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **global** FALSE

The *global* field controls potential external scoping effects of lights found within an Inline scene. Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Hint

- [X3D Architecture, 17.2.1.2 Scoping of lights](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#ScopingOfLights)

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when Inline loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Address of X3D world to load Inline with current scene, retrieved either from local system or an online address. Browser support for X3D model support can include allowed file formats for XML .x3d, ClassicVRML .x3dv, X3D Binary .x3db, X3D JSON .json, and Virtual Reality Modeling Language (VRML97) .wrl.

#### Hints

- [Support includes .gltf and .glb](https://www.khronos.org/gltf) https://en.wikipedia.org/wiki/glTF
- [Future work planned for PLY form](https://en.wikipedia.org/wiki/PLY_(file_format))
- [Future work planned for STL form](https://en.wikipedia.org/wiki/STL_(file_format))
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warnings

- [GlTF support requires X3D version='4.0' and `profile='Full'` or else `<component name='Networking' level='4'/>` `<component name='Shape' level='4'/>` `<component name='Lighting' level='4'/>`](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/networking.html#t-supportLevels)
- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

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

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

## Supported File Formats

| Encoding         | File Extension | MIME Type       |
|------------------|----------------|-----------------|
| X3D XML          | .x3d, .x3dz    | model/x3d+xml   |
| X3D JSON         | .x3dj, .x3djz  | model/x3d+json  |
| X3D Classic VRML | .x3dv, .x3dvz  | model/x3d+vrml  |
| VRML             | .wrl, .wrz     | model/vrml      |
| glTF             | .gltf, .glb    | model/gltf+json |
| Wavefront OBJ    | .obj           | model/obj       |
| STL              | .stl           | model/stl       |
| PLY              | .ply           | model/ply       |
| SVG Document     | .svg, .svgz    | image/svg+xml   |

>**Tip:** All files can be compressed using GZip compression (usually denoted by a 'z' at the end of the filename suffix). This saves bandwidth and speeds up download time.
{: .prompt-tip }

## Advice

### Hints

- [X3D version='4.0' support includes .gltf and .glb](https://www.khronos.org/gltf) https://en.wikipedia.org/wiki/glTF
- You cannot ROUTE values directly into an Inline node, use IMPORT/EXPORT declarations instead.
- Inline EXPORT example:https://www.web3d.org/x3d/content/examples/Basic/X3dSpecifications/InlineExportIndex.html
- Inline IMPORT example:https://www.web3d.org/x3d/content/examples/Basic/X3dSpecifications/InlineImportIndex.html
- [X3D Scene Authoring Hints, Inlines and Prototypes](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#InlinesPrototypes)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Networking/Inline/Inline.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Networking/Inline/screenshot.avif" alt="Inline"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Networking/Inline/Inline.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Networking/Inline/Inline.x3d)
{: .example-links }

## See Also

- [X3D Specification of Inline Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#Inline)
