---
title: Contact
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [Contact, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Contact nodes are produced as output events when two collidable objects or spaces make contact.

The Contact node belongs to the **RigidBodyPhysics** component and its container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + Contact
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>

Position (x, y, z in meters) of exact location of collision.

### SFVec3f [in, out] **contactNormal** 0 1 0 <small>(-∞,∞)</small>

ContactNormal is unit vector describing normal between two colliding bodies.

### SFFloat [in, out] **depth** <small>(-∞,∞)</small>

Depth indicates how deep the current intersection is along normal vector.

### MFString [in, out] **appliedParameters** "BOUNCE"

Default global parameters for collision outputs of rigid body physics system. Contact node can override parent CollisionCollection node. Selectable values for array: "BOUNCE" "USER_FRICTION" "FRICTION_COEFFICIENT-2" "ERROR_REDUCTION" "CONSTANT_FORCE" "SPEED-1" "SPEED-2" "SLIP-1" "SLIP-2".

#### Hint

BOUNCE: bounce value is used; USER_FRICTION: apply user-supplied value; FRICTION_COEFFICIENT-2: apply frictionCoefficients values; ERROR_REDUCTION: apply softnessErrorCorrection value; CONSTANT_FORCE: apply softnessConstantForceMix value; SPEED-1: apply first component of surfaceSpeed array; SPEED-2: apply second component of surfaceSpeed array; SLIP-1: apply first component of slipFactors array; SLIP-2: apply second component of slipFactors array.

### SFFloat [in, out] **bounce** <small>[0,1]</small>

Bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).

### SFFloat [in, out] **minBounceSpeed**

MinBounceSpeed m/s needed to bounce.

### SFVec3f [in, out] **frictionDirection** 0 1 0 <small>(-∞,∞)</small>

FrictionDirection controls friction vector.

#### Hint

Value of (0 0 0) indicates no friction.

### SFVec2f [in, out] **frictionCoefficients** 0 0 <small>[0,∞)</small>

FrictionCoefficients used for computing surface drag.

### SFVec2f [in, out] **surfaceSpeed** 0 0 <small>(-∞,∞)</small>

SurfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.

### SFVec2f [in, out] **slipCoefficients** 0 0 <small>(-∞,∞)</small>

SlipCoefficients used for computing surface drag.

### SFFloat [in, out] **softnessConstantForceMix** 0.0001 <small>[0,1]</small>

SoftnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.

### SFFloat [in, out] **softnessErrorCorrection** 0.8 <small>[0,1]</small>

SoftnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).

### SFNode [in, out] **geometry1** NULL <small>[X3DNBodyCollidableNode]</small>

Input/Output field geometry1.

### SFNode [in, out] **geometry2** NULL <small>[X3DNBodyCollidableNode]</small>

Input/Output field geometry2.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

Input/Output field body1.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

Input/Output field body2.

## Description

### Hint

- Each Contact node contains two RigidBody (containerField='body1,body2') and two CollidableShape or CollidableOffset nodes (containerField='geometry1,geometry2').

Warning
-------

- Contact nodes are transient and can only occur at run time, not in saved X3D files.

## External Links

- [X3D Specification of Contact](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#Contact){:target="_blank"}
