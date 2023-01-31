---
title: CollisionCollection
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollisionCollection, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollisionCollection holds a collection of objects that can be managed as a single entity for resolution of inter-object collisions.

The CollisionCollection node belongs to the **RigidBodyPhysics** component and its default container field is *collider.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + CollisionCollection
```

## Fields

### SFNode [in, out] **metadata** NULL

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFString [in, out] **appliedParameters** "BOUNCE"

Default global parameters for collision outputs of rigid body physics system. Contact node can override parent CollisionCollection node. Selectable values for array: "BOUNCE" "USER_FRICTION" "FRICTION_COEFFICIENT-2" "ERROR_REDUCTION" "CONSTANT_FORCE" "SPEED-1" "SPEED-2" "SLIP-1" "SLIP-2".

#### Hint

BOUNCE: bounce value is used; USER_FRICTION: apply user-supplied value; FRICTION_COEFFICIENT-2: apply frictionCoefficients values; ERROR_REDUCTION: apply softnessErrorCorrection value; CONSTANT_FORCE: apply softnessConstantForceMix value; SPEED-1: apply first component of surfaceSpeed array; SPEED-2: apply second component of surfaceSpeed array; SLIP-1: apply first component of slipFactors array; SLIP-2: apply second component of slipFactors array.

### SFFloat [in, out] **bounce** <small>[0,1]</small>

Bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).

### SFFloat [in, out] **minBounceSpeed** 0.1

MinBounceSpeed m/s needed to bounce.

### SFVec2f [in, out] **frictionCoefficients** 0 0

FrictionCoefficients used for computing surface drag.

### SFVec2f [in, out] **surfaceSpeed** 0 0

SurfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.

### SFVec2f [in, out] **slipFactors** 0 0

SlipFactors used for computing surface drag.

### SFFloat [in, out] **softnessConstantForceMix** 0.0001

SoftnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.

### SFFloat [in, out] **softnessErrorCorrection** 0.8

SoftnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).

### MFNode [in, out] **collidables** [ ] <small>[X3DNBodyCollisionSpaceNode,</small>

Input/Output field collidables.

## Description

### Hint

- Contains an array of CollisionSpace, CollidableShape or CollidableOffset nodes (containerField='collidables').

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollisionCollection/CollisionCollection.x3d"></x3d-canvas>

## External Links

- [X3D Specification of CollisionCollection](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionCollection){:target="_blank"}
