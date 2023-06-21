---
title: PolylineEmitter
date: 2022-01-07
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

The PolylineEmitter node belongs to the **ParticleSystems** component and its default container field is *emitter.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DParticleEmitterNode
    + PolylineEmitter
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in, out] **direction** 0 1 0 <small>(-∞,∞)</small>

Initial direction from which particles emanate.

### SFFloat [in, out] **speed** 0 <small>[0,∞)</small>

Initial linear speed (default is m/s) imparted to all particles along their direction of movement.

### SFFloat [in, out] **variation** 0.25 <small>[0,∞)</small>

Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of possible initial values possible.

#### Hint

- Variation of zero does not allow any randomness.

### SFFloat [ ] **mass** 0 <small>[0,∞)</small>

Basic mass of each particle in mass base units (default is grams).

#### Hint

- Mass is needed if gravity or other force-related calculations are performed per-particle.

### SFFloat [ ] **surfaceArea** 0 <small>[0,∞)</small>

Particle surface area in area base units (default is meters squared). Surface area is used for calculations such as wind effects per particle.

#### Hints

- SurfaceArea value represents average frontal area presented to the wind. Assumes spherical model for each particle (i.e., surface area is the same regardless of direction).

### MFInt32 [in, out] **coordIndex** -1 <small>[0,∞) or -1</small>

*coordIndex* indices are applied to contained Coordinate values in order to define randomly generated initial geometry of the particles.

#### Warning

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

*coord*inates for the line along which particles are randomly generated.

#### Warning

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.

## Description

### Hint

- If no coordinates are available, PolylineEmitter acts like a point source located at local origin.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/PolylineEmitter/PolylineEmitter.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of PolylineEmitter](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#PolylineEmitter){:target="_blank"}
