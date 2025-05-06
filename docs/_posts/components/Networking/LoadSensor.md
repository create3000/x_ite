---
title: LoadSensor
date: 2023-01-07
nav: components-Networking
categories: [components, Networking]
tags: [LoadSensor, Networking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LoadSensor generates events as watchList child nodes are either loaded or fail to load. Changing watchlist child nodes restarts the LoadSensor.

The LoadSensor node belongs to the **Networking** component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + LoadSensor
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFTime | [in, out] | [timeOut](#fields-timeOut) | 0  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFBool | [out] | [isLoaded](#fields-isLoaded) |  |
| SFFloat | [out] | [progress](#fields-progress) |  |
| SFTime | [out] | [loadTime](#fields-loadTime) |  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFTime [in, out] **timeOut** 0 <small>(0,∞)</small>
{: #fields-timeOut }

Time in seconds of maximum load duration prior to declaring failure. Default value zero means use browser defaults.

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when sensing starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isLoaded**
{: #fields-isLoaded }

Notify when all watchList child nodes are loaded, or at least one has failed. Sends true on successfully loading all watchList child nodes. Sends false on timeOut of any watchList child nodes, failure of any watchList child nodes to load, or no local copies available and no network present.

#### Hint

- Use multiple LoadSensor nodes to track multiple loading nodes individually.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **progress**
{: #fields-progress }

Sends 0.0 on start and 1.0 on completion. Intermediate values are browser dependent and always increasing (may indicate fraction of bytes, fraction of expected time or another metric).

#### Hint

- Only 0 and 1 events are guaranteed.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **loadTime**
{: #fields-loadTime }

Time of successful load complete, not sent on failure.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFNode [in, out] **children** [ ] <small>[X3DUrlObject]</small>
{: #fields-children }

The *children* field monitors one or more USE nodes that contain a valid url field.

#### Hints

- If watchList contains multiple USE nodes, output events are only generated when all *children* have loaded successfully or at least one node has failed.
- If individual load status information is desired for different nodes, multiple LoadSensor nodes may be used, each with a single watchList element.
- [Anchor](/x_ite/components/networking/anchor/) nodes can be monitored for binding a target [Viewpoint](/x_ite/components/navigation/viewpoint/), loading a new scene, or loading a new scene in a new window.

#### Warning

- [Field originally named 'watchList' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

## Advice

### Hints

- Use multiple LoadSensor nodes to track multiple loading nodes individually.
- [Background](/x_ite/components/environmentaleffects/background/) node is not sensed by LoadSensor due to node typing and multiple-image ambiguity, alternatively utilize [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) node with multiple [ImageTexture](/x_ite/components/texturing/imagetexture/) nodes each referenced inside LoadSensor.
- Use [Inline](/x_ite/components/networking/inline/) 'load' field to prompt or defer loading.
- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter12EnvironmentSensorSound)

### Warnings

- Children (watchList) child nodes are not rendered, so normally USE copies of other nodes to sense load status.
- New X3D node, not supported in VRML97.
- ['children' field originally named 'watchList' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Networking/LoadSensor/LoadSensor.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/Networking/LoadSensor/screenshot.avif" alt="LoadSensor"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Networking/LoadSensor/LoadSensor.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Networking/LoadSensor/LoadSensor.x3d)
{: .example-links }

## See Also

- [X3D Specification of LoadSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#LoadSensor)
