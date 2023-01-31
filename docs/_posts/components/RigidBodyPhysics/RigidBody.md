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

### SFNode [in, out] **metadata** NULL

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **fixed** FALSE

Fixed indicates whether body is able to move.

#### Hint

Fixed is useful for indicating objects that do not move: walls, ground, etc.

### SFVec3f [in, out] **position** 0 0 0

Position sets body location in world space, then reports physics updates.

### SFRotation [in, out] **orientation** 0 0 1 0

Orientation sets body direction in world space, then reports physics updates.

### SFVec3f [in, out] **linearVelocity** 0 0 0

LinearVelocity sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

Initial value only applied during first frame if forces applied.

#### Warning

Instantaneous velocity changes may lead to numerical instability.

### SFVec3f [in, out] **angularVelocity** 0 0 0 <small>(-∞,∞)</small>

AngularVelocity sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

Initial value only applied during first frame if forces applied.

#### Warning

Instantaneous velocity changes may lead to numerical instability.

### SFBool [in, out] **useFiniteRotation** FALSE

UseFiniteRotation enables/disables higher-resolution, higher-cost computational method for calculating rotations.

### SFVec3f [in, out] **finiteRotationAxis** 0 0 0 <small>[-1,1]</small>

FiniteRotationAxis specifies vector around which the object rotates.

### SFBool [in, out] **autoDamp** FALSE

AutoDamp enables/disables angularDampingFactor and linearDampingFactor.

### SFFloat [in, out] **linearDampingFactor** 0.001

LinearDampingFactor automatically damps a portion of body motion over time.

### SFFloat [in, out] **angularDampingFactor** 0.001 <small>[0,1]</small>

AngularDampingFactor automatically damps a portion of body motion over time.

### SFFloat [in, out] **mass** 1

Mass of the body in kilograms.

#### Warning

Mass must be greater than 0.

### SFMatrix3f [in, out] **inertia** 1 0 0 0 1 0 0 0 1 <small>1 0 0</small>

Inertia matrix defines a 3x2 inertia tensor matrix.

#### Warning

Only the first 6 values are used.

### SFVec3f [in, out] **centerOfMass** 0 0 0 <small>(-∞,∞)</small>

CenterOfMass defines local center of mass for physics calculations.

### SFNode [in, out] **massDensityModel** NULL <small class="small"><span class="no">not supported</span></small>

Input/Output field massDensityModel.

### SFBool [in, out] **useGlobalGravity** TRUE

UseGlobalGravity indicates whether this particular body is influenced by parent RigidBodyCollection's gravity setting.

#### Hint

Contained sub-bodies are not affected by this setting.

### MFVec3f [in, out] **forces** [ ]

Forces defines linear force values applied to the object every frame.

### MFVec3f [in, out] **torques** [ ]

Torques defines rotational force values applied to the object every frame.

### SFBool [in, out] **autoDisable** FALSE

AutoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.

### SFFloat [in, out] **disableTime** <small>[0,∞) <span class="no">not supported</span></small>

DisableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

Only activated if autoDisable='true'

### SFFloat [in, out] **disableLinearSpeed** <small>[0,∞)</small>

DisableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.

#### Hint

Only activated if autoDisable='true'

### SFFloat [in, out] **disableAngularSpeed** <small>[0,∞)</small>

DisableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

Only activated if autoDisable='true'

### MFNode [in, out] **geometry** [ ] <small>[X3DNBodyCollidableNode]</small>

Input/Output field geometry.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d"></x3d-canvas>

## External Links

- [X3D Specification of RigidBody](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBody){:target="_blank"}
