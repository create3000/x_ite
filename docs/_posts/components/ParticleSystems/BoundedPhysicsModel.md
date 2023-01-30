---
title: BoundedPhysicsModel
date: 2022-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [BoundedPhysicsModel, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BoundedPhysicsModel provides user-defined geometrical boundaries for particle motion. A child geometry node specifies boundaries that constrain the location of the particles.

The BoundedPhysicsModel node belongs to the **ParticleSystems** component and its container field is *physics.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + BoundedPhysicsModel
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

The geometry node provides the geometry used for each particle when the parent ParticleSystem node has geometryType=GEOMETRY.

#### Hint

Include `<component name='Geospatial' level='1'/>`

## Description

### Hint

- When a particle touches the boundary surface, it is reflected by the geometry (either inside or outside).

## External Links

- [X3D Specification of BoundedPhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#BoundedPhysicsModel){:target="_blank"}
