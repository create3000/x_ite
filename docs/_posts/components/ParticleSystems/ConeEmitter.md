---
title: ConeEmitter
date: 2022-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [ConeEmitter, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ConeEmitter generates all available particles from a specific point in space. Particles are emitted from the single point specified by the position field emanating in a direction randomly distributed within the cone specified by the angle and direction fields.

The ConeEmitter node belongs to the **ParticleSystems** component and its default container field is *emitter.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticleEmitterNode
    + ConeEmitter
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **on** TRUE

Enables/disables production of particles from this emitter node. If operating when turned off, existing particles complete their rendering process.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>

Point from which particles emanate.

### SFVec3f [in, out] **direction** 0 1 0 <small>(-∞,∞)</small>

Initial *direction* from which particles emanate.

### SFFloat [in, out] **angle** π/4 <small>[0,π]</small>

Cone boundary for random distribution of particles about initial direction.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian){:target="_blank"}

### SFFloat [in, out] **speed** 0 <small>[0,∞)</small>

Initial linear *speed* (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **variation** 0.25 <small>[0,∞)</small>

Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of possible initial values possible.

#### Hint

- *variation* of zero does not allow any randomness.

### SFFloat [ ] **mass** 0 <small>[0,∞)</small>

Basic *mass* of each particle, defined in *mass* base units (default is kilograms).

#### Hints

- *mass* is needed if gravity or other force-related calculations are performed on a per-particle basis.
- Https://en.wikipedia.org/wiki/Kilogram
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/concepts.html#Standardunitscoordinates){:target="_blank"}

### SFFloat [ ] **surfaceArea** 0 <small>[0,∞)</small>

Particle surface area in area base units (default is meters squared). Surface area is used for calculations such as wind effects per particle.

#### Hints

- *surfaceArea* value represents average frontal area presented to the wind.
- Assumes spherical model for each particle (i.e., surface area is the same regardless of direction).

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/ConeEmitter/ConeEmitter.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of ConeEmitter](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ConeEmitter){:target="_blank"}
