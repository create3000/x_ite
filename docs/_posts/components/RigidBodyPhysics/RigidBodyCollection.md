---
title: RigidBodyCollection
date: 2023-01-07
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

The RigidBodyCollection node belongs to the **RigidBodyPhysics** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + RigidBodyCollection
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFNode [in] **set_contacts** <small class="red">not supported</small>

*set_contacts* input field for [Contact](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/contact/) nodes provides per-frame information about *contacts* between bodies.

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

### SFTime [in, out] **disableTime** 0 <small>[0,∞)</small> <small class="red">not supported</small>

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
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/screenshot.avif" alt="RigidBodyCollection"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBodyCollection/RigidBodyCollection.x3d)
{: .example-links }

## See Also

- [X3D Specification of RigidBodyCollection Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBodyCollection)
