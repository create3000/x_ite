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

The RigidBodyCollection node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + RigidBodyCollection
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFNode [in] **set_contacts**<span class="no"><small class="small"> not supported</small></span>

Set_contacts input field for Contact nodes provides per-frame information about contacts between bodies.

### SFVec3f [in, out] **gravity** 0 -9.8 0

Gravity indicates direction and strength of local gravity vector for this collection of bodies (units m/sec^2).

### SFBool [in, out] **preferAccuracy** FALSE

PreferAccuracy provides hint for performance preference: higher accuracy or faster computational speed.

### SFFloat [in, out] **errorCorrection** 0.8 <small>[0,1] <span class="no">not supported</span></small>

ErrorCorrection describes how quickly intersection errors due to floating-point inaccuracies are resolved (0=no correction, 1=all corrected in single step).

### SFInt32 [in, out] **iterations** 10 <small>[0,∞)</small>

Iterations controls number of iterations performed over collectioned joints and bodies during each evaluation.

### SFFloat [in, out] **constantForceMix** 0.0001 <small>[0,∞) <span class="no">not supported</span></small>

ConstantForceMix modifies damping calculations by violating normal constraints while applying small, constant forces in those calculations.

#### Hints

This allows joints and bodies to be a fraction springy, and helps to eliminate numerical instability. Spring-driven or spongy connections can be emulated by combined use of errorCorrection and constantForceMix.

### SFFloat [in, out] **maxCorrectionSpeed** -1 <small>[0,∞) or -1 <span class="no">not supported</span></small>

Or -1, maxCorrectionSpeed .

### SFFloat [in, out] **contactSurfaceThickness**<small>[0,∞)</small>

ContactSurfaceThickness defines how far bodies may interpenetrate after a collision, allowing simulation of softer bodies that deform somewhat during collision.

### SFBool [in, out] **autoDisable** FALSE

AutoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.

### SFFloat [in, out] **disableTime**<small>[0,∞) <span class="no">not supported</span></small>

DisableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

Only activated if autoDisable='true'

### SFFloat [in, out] **disableLinearSpeed**<small>[0,∞)</small>

DisableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.

#### Hint

Only activated if autoDisable='true'

### SFFloat [in, out] **disableAngularSpeed**<small>[0,∞)</small>

DisableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

Only activated if autoDisable='true'

### SFNode [ ] **collider** NULL <small>[CollisionCollection]</small>

Field collider.

### MFNode [in, out] **bodies** [ ] <small>[RigidBody]</small>

Input/Output field bodies.

### MFNode [in, out] **joints** [ ] <small>[X3DRigidJointNode]</small>

Input/Output field joints.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.x3d"></x3d-canvas>

## External Links

- [X3D Specification of RigidBodyCollection](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBodyCollection){:target="_blank"}
