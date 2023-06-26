---
title: RigidBodyCollection
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [RigidBodyCollection, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

RigidBodyCollection represents a system of bodies that interact within a single physics model.

The RigidBodyCollection node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available from X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + RigidBodyCollection
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFNode [in] **set_contacts** <small class="red">not supported</small>

*set_contacts* input field for Contact nodes provides per-frame information about *contacts* between bodies.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFVec3f [in, out] **gravity** 0 -9.8 0 <small>(-∞,∞)</small>

*gravity* indicates direction and strength of local *gravity* vector for this collection of bodies (units m/sec^2).

### SFBool [in, out] **preferAccuracy** FALSE

*preferAccuracy* provides hint for performance preference: higher accuracy or faster computational speed.

### SFFloat [in, out] **errorCorrection** 0.8 <small>[0,1]</small> <small class="red">not supported</small>

*errorCorrection* describes how quickly intersection errors due to floating-point inaccuracies are resolved (0=no correction, 1=all corrected in single step).

### SFInt32 [in, out] **iterations** 10 <small>[0,∞)</small>

*iterations* controls number of *iterations* performed over collectioned joints and bodies during each evaluation.

### SFFloat [in, out] **constantForceMix** 0.0001 <small>[0,∞)</small> <small class="red">not supported</small>

*constantForceMix* modifies damping calculations by violating normal constraints while applying small, constant forces in those calculations.

#### Hints

- This allows joints and bodies to be a fraction springy, and helps to eliminate numerical instability.
- Spring-driven or spongy connections can be emulated by combined use of errorCorrection and *constantForceMix*.

### SFFloat [in, out] **maxCorrectionSpeed** -1 <small>[0,∞) or -1</small> <small class="red">not supported</small>

Or -1, *maxCorrectionSpeed* .

### SFFloat [in, out] **contactSurfaceThickness** 0 <small>[0,∞)</small>

*contactSurfaceThickness* defines how far bodies may interpenetrate after a collision, allowing simulation of softer bodies that deform somewhat during collision.

### SFBool [in, out] **autoDisable** FALSE

*autoDisable* toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.

### SFFloat [in, out] **disableTime** 0 <small>[0,∞)</small> <small class="red">not supported</small>

*disableTime* defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hints

- Only activated if autoDisable='true'
- *disableTime* is an SFTime duration interval, not an absolute clock time.

### SFFloat [in, out] **disableLinearSpeed** 0 <small>[0,∞)</small>

*disableLinearSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.

#### Hint

- Only activated if autoDisable='true'

### SFFloat [in, out] **disableAngularSpeed** 0 <small>[0,∞)</small>

*disableAngularSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

- Only activated if autoDisable='true'

### SFNode [ ] **collider** NULL <small>[CollisionCollection]</small>

The *collider* field associates a collision collection with this rigid body collection allowing seamless updates and integration without the need to use the X3D event model.

### MFNode [in, out] **bodies** [ ] <small>[RigidBody]</small>

Collection of top-level nodes that comprise a set of *bodies* evaluated as a single set of interactions.

### MFNode [in, out] **joints** [ ] <small>[X3DRigidJointNode]</small>

The *joints* field is used to register all *joints* between bodies contained in this collection.

#### Warnings

- If a joint is connected between bodies in two different collections, the result is implementation-dependent.
- If a joint instance is registered with more than one collection, the results are implementation dependent.
- Joints not registered with any collection are not evaluated.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of RigidBodyCollection](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBodyCollection){:target="_blank"}
