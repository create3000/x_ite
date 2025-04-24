---
title: Fog
date: 2023-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [Fog, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Fog simulates atmospheric effects by blending distant objects with fog color.

The Fog node belongs to the **EnvironmentalEffects** component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + Fog (X3DFogObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in\] [set_bind](#sfbool-in-set_bind)
- SFString \[in, out\] [fogType](#sfstring-in-out-fogtype-linear-linearexponential)
- SFColor \[in, out\] [color](#sfcolor-in-out-color-1-1-1-0-1)
- SFFloat \[in, out\] [visibilityStart](#sffloat-in-out-visibilitystart-0-0-small-classbluenon-standard)
- SFFloat \[in, out\] [visibilityRange](#sffloat-in-out-visibilityrange-0-0)
- SFBool \[out\] [isBound](#sfbool-out-isbound)
- SFTime \[out\] [bindTime](#sftime-out-bindtime)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_bind**

Receiving event *set_bind*=true activates and binds this node at the top of the binding stack. Receiving event *set_bind*=false deactivates and unbinds this node from the top of the binding stack. Thus setting *set_bind* to true/false will enable/disable the effect of this node.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **fogType** "LINEAR" <small>["LINEAR"|"EXPONENTIAL"]</small>

Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.

#### Hint

- EXPONENTIAL is more natural but also more computationally expensive.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

Fog *color*.

#### Hints

- Match [Background](/x_ite/components/environmentaleffects/background/) *color* to make objects fade away.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **visibilityStart** 0 <small>[0,∞)</small> <small class="blue">non-standard</small>

Distance in meters where objects starts to be obscured by the fog, using local coordinate system.

### SFFloat [in, out] **visibilityRange** 0 <small>[0,∞)</small>

Distance in meters where objects are totally obscured by the fog, using local coordinate system.

#### Hint

- *visibilityRange* 0 disables Fog.

### SFBool [out] **isBound**

Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.

#### Hint

- Paired node operations can be established by connecting set_bind and *isBound* fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**

Event sent reporting timestamp when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- [Background](/x_ite/components/environmentaleffects/background/), Fog, [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) and [Viewpoint](/x_ite/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.

### Warning

- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), Fog, [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.

## Example

<x3d-canvas class="xr-button-tr" src="https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/Fog.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/screenshot.avif" alt="Fog"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/Fog.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/Fog.x3d)
{: .example-links }

## See Also

- [X3D Specification of Fog Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#Fog)
