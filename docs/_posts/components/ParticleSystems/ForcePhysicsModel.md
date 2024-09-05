---
title: ForcePhysicsModel
date: 2023-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [ForcePhysicsModel, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ForcePhysicsModel applies a constant force value to the particles.

The ForcePhysicsModel node belongs to the **ParticleSystems** component and requires at least level **1,** its default container field is *physics.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + ForcePhysicsModel
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **force** 0 -9.8 0 <small>(∞,∞)</small>

*force* field indicates strength and direction of the propelling *force* on the particles (for example, default is Earth's gravity).

#### Hints

- If particles have zero mass, ForcePhysicsModel node has no effect.
- *force* is specified in *force* base units (usually newtons, acceleration of one kilogram at rate of one meter per second squared).
- [Https://en.wikipedia.org/wiki/Newton_(unit) and Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#Standardunitscoordinates)

## Advice

### Hint

- Force may act in any given direction vector at any strength.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/ForcePhysicsModel.x3d" contentScale="auto" update="auto" xrMovementControl="VIEWER_POSE"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/ForcePhysicsModel.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/ForcePhysicsModel.x3d)
{: .example-links }

## See Also

- [X3D Specification of ForcePhysicsModel Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ForcePhysicsModel)
