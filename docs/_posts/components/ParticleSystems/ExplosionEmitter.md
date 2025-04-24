---
title: ExplosionEmitter
date: 2023-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [ExplosionEmitter, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ExplosionEmitter generates all particles from a specific point in space at the initial time enabled.

The ExplosionEmitter node belongs to the **ParticleSystems** component and requires at least support level **1,** its default container field is *emitter.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticleEmitterNode
    + ExplosionEmitter
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in, out\] [on](#sfbool-in-out-on-true)
- SFVec3f \[in, out\] [position](#sfvec3f-in-out-position-0-0-0--)
- SFFloat \[in, out\] [speed](#sffloat-in-out-speed-0-0)
- SFFloat \[in, out\] [variation](#sffloat-in-out-variation-025-0)
- SFFloat \[in, out\] [mass](#sffloat-in-out-mass-0-0)
- SFFloat \[in, out\] [surfaceArea](#sffloat-in-out-surfacearea-0-0)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **on** TRUE

Enables/disables production of particles from this emitter node. If operating when turned off, existing particles complete their rendering process.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>

Point from which particles emanate.

### SFFloat [in, out] **speed** 0 <small>[0,∞)</small>

Initial linear *speed* (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **variation** 0.25 <small>[0,∞)</small>

Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of initial values possible.

#### Hint

- *variation* of zero does not allow any randomness.

### SFFloat [in, out] **mass** 0 <small>[0,∞)</small>

Basic *mass* of each particle, defined in *mass* base units (default is kilograms).

#### Hints

- *mass* is needed if gravity or other force-related calculations are performed on a per-particle basis.
- [Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#Standardunitscoordinates)

### SFFloat [in, out] **surfaceArea** 0 <small>[0,∞)</small>

Particle surface area in area base units (default is meters squared). Surface area is used for calculations such as wind effects per particle.

#### Hints

- *surfaceArea* value represents average frontal area presented to the wind.
- Assumes spherical model for each particle (i.e., surface area is the same regardless of direction).

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/ExplosionEmitter.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/screenshot.avif" alt="ExplosionEmitter"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/ExplosionEmitter.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/ExplosionEmitter/ExplosionEmitter.x3d)
{: .example-links }

## See Also

- [X3D Specification of ExplosionEmitter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ExplosionEmitter)
