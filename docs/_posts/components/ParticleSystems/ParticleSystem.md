---
title: ParticleSystem
date: 2022-01-07
nav: components-ParticleSystems
categories: [components, ParticleSystems]
tags: [ParticleSystem, ParticleSystems]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ParticleSystem specifies a complete particle system. It can contain Appearance for particle appearance, a geometry node if gemoetryType='GEOMETRY', a colorRamp Color/ColorRGBA node for changing base color over each particle's lifetime, a texcoordRamp TextureCoordinate node to control texture coordinates of provided texture(s) in the Appearance node over time, a single emitter X3DParticleEmitterNode, and an array of physics X3DParticlePhysicsModelNode nodes.

The ParticleSystem node belongs to the **ParticleSystems** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DShapeNode (X3DBoundedObject)*
      + ParticleSystem
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [ ] **geometryType** "QUAD" <small>["LINE"|"POINT"|"QUAD"|"SPRITE"|"TRIANGLE"|"GEOMETRY"|...]</small>

Field geometryType.

### SFInt32 [in, out] **maxParticles** 200 <small>[0,∞)</small>

Maximum number of particles to be generated at one time (subject to player limitations).

### SFBool [in, out] **createParticles** TRUE

Enables/disables creation of new particles, while any existing particles remain in existence and continue to animate until the end of their lifetimes.

#### Hint

- If no particles are left in scene, system is considered both active and enabled.

### SFFloat [in, out] **particleLifetime** 5 <small>[0,∞)</small>

TODO not properly defined in X3D spedification. Particle animation lifetime in base time units (default is seconds).

### SFFloat [in, out] **lifetimeVariation** 0.25 <small>[0,1]</small>

TODO not properly defined in X3D spedification. Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of initial values possible.

#### Hint

- Variation of zero does not allow any randomness.

### SFVec2f [in, out] **particleSize** 0.02 0.02 <small>[0,∞)</small>

*particleSize* describes width and height dimensions for each particle in length base units (default is meters). Changing this value dynamically will only change new particles created after the change.

#### Hints

- Particles created before this timestamp will remain at the old size. His field only effects particles using LINE, QUAD, SPRITE, and TRIANGLE geometry types.

### SFNode [ ] **emitter** NULL <small>[X3DParticleEmitterNode]</small>

The emitter field specifies the type of emitter geometry and properties that the particles are given for their initial positions.

### MFNode [ ] **physics** [ ] <small>[X3DParticlePhysicsModelNode]</small>

After being created, the individual particles are then manipulated according to the physics model(s) specified in the physics field.

### MFFloat [ ] **colorKey** [ ] <small>[0,∞)</small>

Array of time intervals in seconds, corresponding to particle lifetime, that are used to interpolate colorRamp array values.

#### Hints

- Color values are interpolated in linear Hue Saturation Value (HSV) space, similar to ColorInterpolator node. Color values are defined as per-vertex colour values. Number of colorKey values must match length of the per-vertex colorRamp arrays!

#### Warning

- If an Appearance and Material nodes are provided, those material properties override colorRamp interpolation.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFNode [ ] **colorRamp** NULL <small>[X3DColorNode]</small>

The colorRamp Color/ColorRGBA node holds a series of colour values to be used at the given colorKey points in time.

#### Hints

- Color values are defined as per-vertex colour values. Number of colorKey values must match length of the per-vertex colorRamp arrays!

#### Warning

- If an Appearance and Material nodes are provided, those material properties override colorRamp interpolation.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### MFFloat [ ] **texCoordKey** [ ] <small>[0,∞)</small>

Array of time intervals in seconds, corresponding to particle lifetime, that are used to sequence texCoordRamp array values.

#### Hints

- No interpolation is performed, texture coordinates are simply sequenced in order. Texture-coordinate values map textures to vertices in the geometry. Number of texCoordKey values must match length of the per-vertex texCoordRamp arrays!

### SFNode [ ] **texCoordRamp** NULL <small>[TextureCoordinate]</small>

Texture coordinates of the provided texture(s) in the Appearance node, over time. Particle systems frequently like to change the texture on a particle as it ages, yet there is no good way of accomplishing this through standard interpolators because interpolators have no concept of particle time. This pair of fields hold time-dependent values for the texture coordinates to be applied to the particle. When a particle reaches the next time stamp it moves to the next set of texture coordinates.

#### Hints

- Texture-coordinate values map textures to vertices in the geometry. Number of texCoordKey values must match length of the per-vertex texCoordRamp arrays!

### SFBool [out] **isActive**

*isActive* true/false events are sent when playback starts/stops.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>(0,∞) or -1 -1 -1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFNode [in, out] **appearance** NULL <small>[X3DAppearanceNode]</small>

The appearance field holds an Appearance node that is used for the geometry. All effects, such as material colours and/or multi-textures, are applied to each particle.

#### Hints

- If a texture coordinate ramp and key is supplied with this geometry, it shall be used in preference to any automatic texture coordinate generation. If automatic texture coordinate generation is used, results shall be based on the entire volume that the particles consume, not locally applied to each particle.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

The geometry node provides geometry used for each particle when geometryType=GEOMETRY.

#### Hint

- Include `<component name='Geospatial' level='1'/>`

## Hints

- Always adjust bboxSize and boxCenter properly; bboxSize and bboxCenter cannot be automatically determined so it's up to the author to provide proper values.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/ParticleSystem.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of ParticleSystem](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ParticleSystem){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
- [Wikipedia, particle system](https://en.wikipedia.org/wiki/Particle_system){:target="_blank"}
