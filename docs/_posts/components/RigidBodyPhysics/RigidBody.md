---
title: RigidBody
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [RigidBody, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

RigidBody describes a collection of shapes with a mass distribution that is affected by the physics model. Contains a Sphere, Box, or Cone (containerField='massDensityModel') and multiple CollidableOffset or CollidableShape nodes (containerField='geometry') for animating collidable geometry.

The RigidBody node belongs to the **RigidBodyPhysics** component and its default container field is *bodies.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + RigidBody
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **fixed** FALSE

*fixed* indicates whether body is able to move.

#### Hint

- Fixed is useful for indicating objects that do not move: walls, ground, etc.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>

*position* sets body location in world space, then reports physics updates.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

*orientation* sets body direction in world space, then reports physics updates.

### SFVec3f [in, out] **linearVelocity** 0 0 0 <small>(-∞,∞)</small>

*linearVelocity* sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

- Initial value only applied during first frame if forces applied.

#### Warning

- Instantaneous velocity changes may lead to numerical instability.

### SFVec3f [in, out] **angularVelocity** 0 0 0 <small>(-∞,∞)</small>

*angularVelocity* sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

- Initial value only applied during first frame if forces applied.

#### Warning

- Instantaneous velocity changes may lead to numerical instability.

### SFBool [in, out] **useFiniteRotation** FALSE

*useFiniteRotation* enables/disables higher-resolution, higher-cost computational method for calculating rotations.

### SFVec3f [in, out] **finiteRotationAxis** 0 1 0 <small>(-∞,∞)</small>

*finiteRotationAxis* specifies vector around which the object rotates.

### SFBool [in, out] **autoDamp** FALSE

*autoDamp* enables/disables angularDampingFactor and linearDampingFactor.

### SFFloat [in, out] **linearDampingFactor** 0.001 <small>[0,1]</small>

*linearDampingFactor* automatically damps a portion of body motion over time.

### SFFloat [in, out] **angularDampingFactor** 0.001 <small>[0,1]</small>

*angularDampingFactor* automatically damps a portion of body motion over time.

### SFFloat [in, out] **mass** 1 <small>(0,∞)</small>

*mass* of the body in kilograms.

#### Warning

- Mass must be greater than 0.

### SFVec3f [in, out] **centerOfMass** 0 0 0 <small>(-∞,∞)</small>

*centerOfMass* defines local center of mass for physics calculations.

### SFNode [in, out] **massDensityModel** NULL <small class="red">not supported</small>

Input/Output field massDensityModel.

### SFBool [in, out] **useGlobalGravity** TRUE

*useGlobalGravity* indicates whether this particular body is influenced by parent RigidBodyCollection's gravity setting.

#### Hint

- Contained sub-bodies are not affected by this setting.

### MFVec3f [in, out] **forces** [ ]

*forces* defines linear force values applied to the object every frame.

### MFVec3f [in, out] **torques** [ ]

*torques* defines rotational force values applied to the object every frame.

### SFMatrix3f [in, out] **inertia** 1 0 0 0 1 0 0 0 1 <small>1 0 0</small>

*inertia* matrix defines a 3x2 inertia tensor matrix.

#### Warning

- Only the first 6 values are used.

### SFBool [in, out] **autoDisable** FALSE

*autoDisable* toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.

### SFFloat [in, out] **disableTime** 0 <small>[0,∞)</small> <small class="red">not supported</small>

*disableTime* defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

- Only activated if autoDisable='true'

### SFFloat [in, out] **disableLinearSpeed** 0 <small>[0,∞)</small>

*disableLinearSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.

#### Hint

- Only activated if autoDisable='true'

### SFFloat [in, out] **disableAngularSpeed** 0 <small>[0,∞)</small>

*disableAngularSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

- Only activated if autoDisable='true'

### MFNode [in, out] **geometry** [ ] <small>[X3DNBodyCollidableNode]</small>

Input/Output field geometry.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of RigidBody](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBody){:target="_blank"}
