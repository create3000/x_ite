---
title: WindPhysicsModel
date: 2023-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [WindPhysicsModel, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

WindPhysicsModel applies a wind effect to the particles. The wind includes a random variation factor to model gustiness.

The WindPhysicsModel node belongs to the **ParticleSystems** component and requires at least level **1,** its default container field is *physics.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + WindPhysicsModel
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **direction** 1 0 0 <small>(-∞,∞)</small>

*direction* in which wind is travelling in the form of a normalized, unit vector.

### SFFloat [in, out] **speed** 0.1 <small>[0,∞)</small>

Initial linear *speed* (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **gustiness** 0.1 <small>[0,∞)</small>

*gustiness* specifies how much wind speed varies from the average speed.

#### Hint

- Wind speed variation is calculated once per frame and applied equally to all particles.

### SFFloat [in, out] **turbulence** 0 <small>[0,1]</small>

*turbulence* field specifies how much the wind acts directly in line with the direction, and how much variation is applied in directions other than the wind direction.

#### Hint

- This is determined per-particle to model how each is effected by *turbulence*.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/WindPhysicsModel/WindPhysicsModel.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/WindPhysicsModel/WindPhysicsModel.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/WindPhysicsModel/WindPhysicsModel.x3d)
{: .example-links }

## See Also

- [X3D Specification of WindPhysicsModel Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#WindPhysicsModel){:target="_blank"}
