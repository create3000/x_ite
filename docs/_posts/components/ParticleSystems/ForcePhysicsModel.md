---
title: ForcePhysicsModel
date: 2022-01-07
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

The ForcePhysicsModel node belongs to the **ParticleSystems** component and its default container field is *physics.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + ForcePhysicsModel
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **force** 0 -9.8 0 <small>(∞,∞)</small>

Force field indicates strength and direction of the propelling force on the particles (e.g. default is Earth's gravity).

#### Hints

- Force is specified in force base units (usually newtons). If particles have zero mass, ForcePhysicsModel node has no effect.

## Description

### Hint

- Force may act in any given direction vector at any strength.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/ForcePhysicsModel/ForcePhysicsModel.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ForcePhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ForcePhysicsModel){:target="_blank"}
