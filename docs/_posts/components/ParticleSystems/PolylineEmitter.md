---
title: PolylineEmitter
date: 2023-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [PolylineEmitter, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PolylineEmitter emits particles along a single polyline. The coordinates for the line along which particles should be randomly generated are taken from a combination of the coord and coordIndex fields. The starting point for generating particles is randomly distributed along this line and given the initial speed and direction.

The PolylineEmitter node belongs to the **ParticleSystems** component and requires at least support level **1,** its default container field is *emitter.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticleEmitterNode
    + PolylineEmitter
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFInt32 | [in] | [set_coordIndex](#fields-set_coordIndex) |  |
| SFBool | [in, out] | [on](#fields-on) | TRUE |
| SFVec3f | [in, out] | [direction](#fields-direction) | 0 1 0  |
| SFFloat | [in, out] | [speed](#fields-speed) | 0  |
| SFFloat | [in, out] | [variation](#fields-variation) | 0.25  |
| SFFloat | [in, out] | [mass](#fields-mass) | 0  |
| SFFloat | [in, out] | [surfaceArea](#fields-surfaceArea) | 0  |
| MFInt32 | [ ] | [coordIndex](#fields-coordIndex) | -1  |
| SFNode | [in, out] | [coord](#fields-coord) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>
{: #fields-set_coordIndex }

Input field *set_coordIndex*.

### SFBool [in, out] **on** TRUE
{: #fields-on }

Enables/disables production of particles from this emitter node. If operating when turned off, existing particles complete their rendering process.

### SFVec3f [in, out] **direction** 0 1 0 <small>(-∞,∞)</small>
{: #fields-direction }

Initial *direction* from which particles emanate.

### SFFloat [in, out] **speed** 0 <small>[0,∞)</small>
{: #fields-speed }

Initial linear *speed* (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **variation** 0.25 <small>[0,∞)</small>
{: #fields-variation }

Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of possible initial values possible.

#### Hint

- *variation* of zero does not allow any randomness.

### SFFloat [in, out] **mass** 0 <small>[0,∞)</small>
{: #fields-mass }

Basic *mass* of each particle, defined in *mass* base units (default is kilograms).

#### Hints

- *mass* is needed if gravity or other force-related calculations are performed on a per-particle basis.
- [Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#Standardunitscoordinates)

### SFFloat [in, out] **surfaceArea** 0 <small>[0,∞)</small>
{: #fields-surfaceArea }

Particle surface area in area base units (default is meters squared). Surface area is used for calculations such as wind effects per particle.

#### Hints

- *surfaceArea* value represents average frontal area presented to the wind.
- Assumes spherical model for each particle (i.e., surface area is the same regardless of direction).

### MFInt32 [ ] **coordIndex** -1 <small>[0,∞) or -1</small>
{: #fields-coordIndex }

*coordIndex* indices are applied to contained [Coordinate](/x_ite/components/rendering/coordinate/) values in order to define randomly generated initial geometry of the particles.

#### Warnings

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.
- *coordIndex* is required in order to connect contained coordinate point values.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>
{: #fields-coord }

Coordinates for the line along which particles are randomly generated.

#### Warning

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.

## Advice

### Hint

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/PolylineEmitter.x3d" contentScale="auto">
  <img src="https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/screenshot.avif" alt="PolylineEmitter"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/PolylineEmitter.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/PolylineEmitter.x3d)
{: .example-links }

## See Also

- [X3D Specification of PolylineEmitter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#PolylineEmitter)
