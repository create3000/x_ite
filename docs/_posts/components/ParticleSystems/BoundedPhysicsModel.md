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

The BoundedPhysicsModel node belongs to the **ParticleSystems** component and its default container field is *physics.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DParticlePhysicsModelNode
    + BoundedPhysicsModel
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

Single contained *geometry* node provides the *geometry* used for each particle when the parent ParticleSystem node has geometryType=GEOMETRY.

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf){:target="_blank"}

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## Advisories

### Hint

- When a particle touches the boundary surface, it is reflected by the geometry (either inside or outside).

## See Also

- [X3D Specification of BoundedPhysicsModel node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#BoundedPhysicsModel){:target="_blank"}
