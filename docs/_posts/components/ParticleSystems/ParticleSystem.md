---
title: ParticleSystem
date: 2023-01-07
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

ParticleSystem specifies a complete particle system. It can contain Appearance for particle appearance, a geometry node if geometryType='GEOMETRY', a color field with Color or ColorRGBA node for changing base color over each particle's lifetime, a texcoord TextureCoordinate node to control texture coordinates of provided texture(s) in the Appearance node over time, a single emitter X3DParticleEmitterNode, and an array of physics X3DParticlePhysicsModelNode nodes.

The ParticleSystem node belongs to the **ParticleSystems** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 3.2 or higher.

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

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **createParticles** TRUE

Enables/disables creation of new particles, while any existing particles remain in existence and continue to animate until the end of their lifetimes.

#### Hint

- If no particles are left in scene, system is considered both active and enabled.

### SFString [ ] **geometryType** "QUAD" <small>["LINE"|"POINT"|"QUAD"|"SPRITE"|"TRIANGLE"|"GEOMETRY"|...]</small>

Specifies type of geometry used to represent individual particles. Typically, a particle is calculated as point in space at which the geometry is placed. Changing the value of the geometry field or the definition of the geometry node shall be applied during current computation of the next frame to be rendered.

#### Hints

- LINE means that a line is drawn along the particle's current velocity vector, for this frame, centered about the particle's position. The length of the line is specified by the particle's height from the particleSize field value.
- POINT means that a point geometry is rendered at the particle's position.
- QUAD means that a 2D quad is rendered aligned in the local coordinate space of the particle system with the face normal pointing along the positive Z axis. Individual quads are not aligned to the user's eye position but are affected in depth by the physics model. The particle's position is at the center of the quad.
- SPRITE means that a point sprite that uses a 2D point position to locate a screen-aligned quad at the center of the particle's location is rendered.
- TRIANGLE means that a 2D quad is rendered using a pair of triangles aligned in the local coordinate space of the particle system with the face normal pointing along the positive Z axis. Individual triangles are not aligned to the user's eye position, but are affected in depth by the physics model. The particle's position is at the center of the triangle.
- GEOMETRY means that the geometry specified by the geometry field is rendered for each particle using the local coordinate system.
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.
- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

### SFInt32 [in, out] **maxParticles** 200 <small>[0,∞)</small>

Maximum number of particles to be generated at one time (subject to player limitations).

### SFFloat [in, out] **particleLifetime** 5 <small>[0,∞)</small>

TODO not properly defined in X3D specification. Particle animation lifetime in base time units (default is seconds).

### SFFloat [in, out] **lifetimeVariation** 0.25 <small>[0,1]</small>

TODO not properly defined in X3D specification. Multiplier for the randomness used to control the range of possible output values. The bigger the value, the more random the output and the bigger the range of initial values possible.

#### Hint

- Variation of zero does not allow any randomness.

### SFVec2f [in, out] **particleSize** 0.02 0.02 <small>[0,∞)</small>

*particleSize* describes width and height dimensions for each particle in length base units (default is meters). Changing this value dynamically will only change new particles created after the change.

#### Hints

- Particles created before this timestamp will remain at the old size.
- His field only effects particles using LINE, QUAD, SPRITE, and TRIANGLE geometry types.

### SFNode [ ] **emitter** NULL <small>[X3DParticleEmitterNode]</small>

The *emitter* field specifies the type of *emitter* geometry and properties that the particles are given for their initial positions.

### MFNode [ ] **physics** [ ] <small>[X3DParticlePhysicsModelNode]</small>

After being created, the individual particles are then manipulated according to the *physics* model(s) specified in the *physics* field.

### MFFloat [ ] **colorKey** [ ] <small>[0,∞)</small>

Array of time intervals in seconds, corresponding to particle lifetime, that are used to interpolate color array values.

#### Hints

- [Color](/x_ite/components/rendering/color/) values are interpolated in linear Hue Saturation Value (HSV) space, similar to [ColorInterpolator](/x_ite/components/interpolation/colorinterpolator/) node.
- [Color](/x_ite/components/rendering/color/) values are defined as per-vertex color values.
- Number of *colorKey* values must match length of the per-vertex color field array values!
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- If an [Appearance](/x_ite/components/shape/appearance/) and [Material](/x_ite/components/shape/material/) nodes are provided, those material properties override color field interpolation.

### SFNode [ ] **color** NULL <small>[X3DColorNode]</small>

The *color* field contains [Color](/x_ite/components/rendering/color/) or [ColorRGBA](/x_ite/components/rendering/colorrgba/) nodes as a series of *color* values to be used at the given colorKey points in time.

#### Hints

- *color* values are defined as per-vertex *color* values.
- Number of colorKey values must match length of the per-vertex *color* field array values!
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warnings

- [Field originally named 'colorRamp' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)
- If an [Appearance](/x_ite/components/shape/appearance/) and [Material](/x_ite/components/shape/material/) nodes are provided, those material properties override *color* field interpolation.

### MFFloat [ ] **texCoordKey** [ ] <small>[0,∞)</small>

Array of time intervals in seconds, corresponding to particle lifetime, that are used to sequence texCoord array values.

#### Hints

- No interpolation is performed, texture coordinates are simply sequenced in order.
- Texture-coordinate values map textures to vertices in the geometry.
- Number of *texCoordKey* values must match length of the per-vertex texCoord arrays!

### SFNode [ ] **texCoord** NULL <small>[TextureCoordinate]</small>

Texture coordinates of the provided texture(s) in the [Appearance](/x_ite/components/shape/appearance/) node, over time. Particle systems frequently like to change the texture on a particle as it ages, yet there is no good way of accomplishing this through standard interpolators because interpolators have no concept of particle time. This pair of fields hold time-dependent values for the texture coordinates to be applied to the particle. When a particle reaches the next time stamp it moves to the next set of texture coordinates.

#### Hints

- Texture-coordinate values map textures to vertices in the geometry.
- Number of texCoordKey values must match length of the per-vertex *texCoord* arrays!

#### Warning

- [Field originally named 'texCoordRamp' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFBool [out] **isActive**

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [in, out] **pointerEvents** TRUE <small class="blue">non standard</small>

*pointerEvents* defines whether this Shape becomes target for pointer events.

### SFBool [in, out] **castShadow** TRUE

The *castShadow* field defines whether this [Shape](/x_ite/components/shape/shape/) casts shadows as produced by lighting nodes.

#### Hints

- If the visible field is FALSE, then the [Shape](/x_ite/components/shape/shape/) does not cast any shadows, regardless of the *castShadow* value.
- If prior X3D3 content is loaded into an X3D4 model, then legacy [Shape](/x_ite/components/shape/shape/) nodes have shadows set to true.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#X3DBoundedObject

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#X3DBoundedObject

### SFNode [in, out] **appearance** NULL <small>[X3DAppearanceNode]</small>

The *appearance* field holds an [Appearance](/x_ite/components/shape/appearance/) node that is used for the geometry. All effects, such as material colors and/or multi-textures, are applied to each particle.

#### Hints

- If a texture coordinate ramp and key is supplied with this geometry, it shall be used in preference to any automatic texture coordinate generation.
- If automatic texture coordinate generation is used, results shall be based on the entire volume that the particles consume, not locally applied to each particle.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

Single contained *geometry* node provides *geometry* used for each particle when geometryType=GEOMETRY.

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

## Advice

- Always set bboxSize and boxCenter correctly; bboxSize and bboxCenter cannot be determined automatically, so it's up to the author to provide the correct values.

### Hints

- [Event timing details are explained in X3D Specification 4.4.8.3 Execution model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/concepts.html#ExecutionModel
- [Wikipedia, particle system](https://en.wikipedia.org/wiki/Particle_system)

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/ParticleSystem.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/ParticleSystem.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/ParticleSystem/ParticleSystem.x3d)
{: .example-links }

## See Also

- [X3D Specification of ParticleSystem Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/particleSystems.html#ParticleSystem)
