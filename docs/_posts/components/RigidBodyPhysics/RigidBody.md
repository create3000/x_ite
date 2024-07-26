---
title: RigidBody
date: 2023-01-07
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

RigidBody describes a collection of shapes with a mass distribution that is affected by the physics model. Contains a Sphere, Box, or Cone (`containerField='massDensityModel')` and multiple CollidableOffset or CollidableShape nodes (`containerField='geometry')` for animating collidable geometry.

The RigidBody node belongs to the **RigidBodyPhysics** component and requires at least level **2,** its default container field is *bodies.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + RigidBody
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **fixed** FALSE

*fixed* indicates whether body is able to move.

#### Hint

- *fixed* is useful for indicating objects that do not move: walls, ground, etc.

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

#### Hints

- [Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/concepts.html#Standardunitscoordinates

#### Warning

- *mass* must be greater than 0.

### SFVec3f [in, out] **centerOfMass** 0 0 0 <small>(-∞,∞)</small>

*centerOfMass* defines local center of mass for physics calculations.

### SFNode [in, out] **massDensityModel** NULL <small class="red">not supported</small>

The *massDensityModel* field is used to describe the geometry type and dimensions used to calculate the mass density in the physics model. It is not rendered, nor modified by the physics model.

### SFBool [in, out] **useGlobalGravity** TRUE

*useGlobalGravity* indicates whether this particular body is influenced by parent [RigidBodyCollection](/x_ite/components/rigidbodyphysics/rigidbodycollection/)'s gravity setting.

#### Hint

- Contained sub-bodies are not affected by this setting.

### MFVec3f [in, out] **forces** [ ]

*forces* defines linear force values applied to the object every frame.

### MFVec3f [in, out] **torques** [ ]

*torques* defines rotational force values applied to the object every frame.

### SFMatrix3f [in, out] **inertia** 1 0 0 0 1 0 0 0 1 <small>1 0 0</small>

*inertia* matrix defines a 3x2 *inertia* tensor matrix.

#### Warning

- Only the first 6 values are used.

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

### MFNode [in, out] **geometry** [ ] <small>[X3DNBodyCollidableNode]</small>

The *geometry* field is used to connect the body modelled by the physics engine implementation to the real *geometry* of the scene through the use of collidable nodes. This allows the *geometry* to be connected directly to the physics model as well as collision detection. Collidable nodes have their location set to the same location as the body instance in which they are located.

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

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d)
{: .example-links }

## See Also

- [X3D Specification of RigidBody Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBody)
