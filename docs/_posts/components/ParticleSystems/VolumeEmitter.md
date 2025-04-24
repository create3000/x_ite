---
title: VolumeEmitter
date: 2023-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [VolumeEmitter, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

VolumeEmitter emits particles from a random position confined within the given closed geometry volume.

The VolumeEmitter node belongs to the **ParticleSystems** component and requires at least support level **2,** its default container field is *emitter.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticleEmitterNode
    + VolumeEmitter
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- MFInt32 \[in\] [set_coordIndex](#mfint32-in-set_coordindex-0-or--1)
- SFBool \[in, out\] [on](#sfbool-in-out-on-true)
- SFBool \[ \] [internal](#sfbool---internal-true)
- SFVec3f \[in, out\] [direction](#sfvec3f-in-out-direction-0-1-0--)
- SFFloat \[in, out\] [speed](#sffloat-in-out-speed-0-0)
- SFFloat \[in, out\] [variation](#sffloat-in-out-variation-025-0)
- SFFloat \[in, out\] [mass](#sffloat-in-out-mass-0-0)
- SFFloat \[in, out\] [surfaceArea](#sffloat-in-out-surfacearea-0-0)
- MFInt32 \[ \] [coordIndex](#mfint32---coordindex--1-0-or--1)
- SFNode \[in, out\] [coord](#sfnode-in-out-coord-null-x3dcoordinatenode)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>

Input field *set_coordIndex*.

### SFBool [in, out] **on** TRUE

Enables/disables production of particles from this emitter node. If operating when turned off, existing particles complete their rendering process.

### SFBool [ ] **internal** TRUE

TODO, X3D specification is undefined.

### SFVec3f [in, out] **direction** 0 1 0 <small>(-∞,∞)</small>

Initial *direction* from which particles emanate.

### SFFloat [in, out] **speed** 0 <small>[0,∞)</small>

Initial linear *speed* (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **variation** 0.25 <small>[0,∞)</small>

Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of possible initial values possible.

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

### MFInt32 [ ] **coordIndex** -1 <small>[0,∞) or -1</small>

*coordIndex* indices are applied to contained [Coordinate](/x_ite/components/rendering/coordinate/) values in order to define randomly generated initial geometry of the particles.

#### Warning

- *coordIndex* is required in order to connect contained coordinate point values.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Coordinates for the geometry used as the emitting volume.

## Advice

### Hint

- Otherwise, a VolumeEmitter node acts like a [PolylineEmitter](/x_ite/components/particlesystems/polylineemitter/) node.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/VolumeEmitter.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/screenshot.avif" alt="VolumeEmitter"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/VolumeEmitter.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/VolumeEmitter/VolumeEmitter.x3d)
{: .example-links }

## See Also

- [X3D Specification of VolumeEmitter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#VolumeEmitter)
