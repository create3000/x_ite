---
title: BoundedPhysicsModel
date: 2023-01-07
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

The BoundedPhysicsModel node belongs to the **ParticleSystems** component and requires at least support level **2,** its default container field is *physics.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + BoundedPhysicsModel
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in, out\] [enabled](#sfbool-in-out-enabled-true)
- SFFloat \[in, out\] [damping](#sffloat-in-out-damping-1---small-classbluenon-standard)
- SFNode \[in, out\] [geometry](#sfnode-in-out-geometry-null-x3dgeometrynode)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **damping** 1 <small>(-∞,∞)</small> <small class="blue">non-standard</small>

Damping of velocity in the event of a collision.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

Single contained *geometry* node provides the *geometry* used for each particle when the parent [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) node has geometryType=GEOMETRY.

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## Advice

### Hint

- When a particle touches the boundary surface, it is reflected by the geometry (either inside or outside).

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/screenshot.avif" alt="BoundedPhysicsModel"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.x3d)
{: .example-links }

## See Also

- [X3D Specification of BoundedPhysicsModel Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#BoundedPhysicsModel)
