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

The RigidBody node belongs to the **RigidBodyPhysics** component and requires at least support level **2,** its default container field is *bodies.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + RigidBody
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFBool | [in, out] | [fixed](#field-fixed) | FALSE |
| SFVec3f | [in, out] | [position](#field-position) | 0 0 0  |
| SFRotation | [in, out] | [orientation](#field-orientation) | 0 0 1 0  |
| SFVec3f | [in, out] | [linearVelocity](#field-linearVelocity) | 0 0 0  |
| SFVec3f | [in, out] | [angularVelocity](#field-angularVelocity) | 0 0 0  |
| SFBool | [in, out] | [useFiniteRotation](#field-useFiniteRotation) | FALSE |
| SFVec3f | [in, out] | [finiteRotationAxis](#field-finiteRotationAxis) | 0 1 0  |
| SFBool | [in, out] | [autoDamp](#field-autoDamp) | FALSE |
| SFFloat | [in, out] | [linearDampingFactor](#field-linearDampingFactor) | 0.001  |
| SFFloat | [in, out] | [angularDampingFactor](#field-angularDampingFactor) | 0.001  |
| SFFloat | [in, out] | [mass](#field-mass) | 1  |
| SFVec3f | [in, out] | [centerOfMass](#field-centerOfMass) | 0 0 0  |
| SFNode | [in, out] | [massDensityModel](#field-massDensityModel) | NULL  |
| SFBool | [in, out] | [useGlobalGravity](#field-useGlobalGravity) | TRUE |
| MFVec3f | [in, out] | [forces](#field-forces) | [ ] |
| MFVec3f | [in, out] | [torques](#field-torques) | [ ] |
| SFMatrix3f | [in, out] | [inertia](#field-inertia) | 1 0 0 0 1 0 0 0 1  |
| SFBool | [in, out] | [autoDisable](#field-autoDisable) | FALSE |
| SFTime | [in, out] | [disableTime](#field-disableTime) | 0  |
| SFFloat | [in, out] | [disableLinearSpeed](#field-disableLinearSpeed) | 0  |
| SFFloat | [in, out] | [disableAngularSpeed](#field-disableAngularSpeed) | 0  |
| MFNode | [in, out] | [geometry](#field-geometry) | [ ] |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables node operation.

### SFBool [in, out] **fixed** FALSE
{: #field-fixed }

*fixed* indicates whether body is able to move.

#### Hint

- *fixed* is useful for indicating objects that do not move: walls, ground, etc.

### SFVec3f [in, out] **position** 0 0 0 <small>(-∞,∞)</small>
{: #field-position }

*position* sets body location in world space, then reports physics updates.

### SFRotation [in, out] **orientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #field-orientation }

*orientation* sets body direction in world space, then reports physics updates.

### SFVec3f [in, out] **linearVelocity** 0 0 0 <small>(-∞,∞)</small>
{: #field-linearVelocity }

*linearVelocity* sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

- Initial value only applied during first frame if forces applied.

#### Warning

- Instantaneous velocity changes may lead to numerical instability.

### SFVec3f [in, out] **angularVelocity** 0 0 0 <small>(-∞,∞)</small>
{: #field-angularVelocity }

*angularVelocity* sets constant velocity value to object every frame, and reports updates by physics model.

#### Hint

- Initial value only applied during first frame if forces applied.

#### Warning

- Instantaneous velocity changes may lead to numerical instability.

### SFBool [in, out] **useFiniteRotation** FALSE
{: #field-useFiniteRotation }

*useFiniteRotation* enables/disables higher-resolution, higher-cost computational method for calculating rotations.

### SFVec3f [in, out] **finiteRotationAxis** 0 1 0 <small>(-∞,∞)</small>
{: #field-finiteRotationAxis }

*finiteRotationAxis* specifies vector around which the object rotates.

### SFBool [in, out] **autoDamp** FALSE
{: #field-autoDamp }

*autoDamp* enables/disables angularDampingFactor and linearDampingFactor.

### SFFloat [in, out] **linearDampingFactor** 0.001 <small>[0,1]</small>
{: #field-linearDampingFactor }

*linearDampingFactor* automatically damps a portion of body motion over time.

### SFFloat [in, out] **angularDampingFactor** 0.001 <small>[0,1]</small>
{: #field-angularDampingFactor }

*angularDampingFactor* automatically damps a portion of body motion over time.

### SFFloat [in, out] **mass** 1 <small>(0,∞)</small>
{: #field-mass }

*mass* of the body in kilograms.

#### Hints

- [Kilogram](https://en.wikipedia.org/wiki/Kilogram)
- [X3D Architecture 4.3.6 Standard units and coordinate system](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#Standardunitscoordinates)

#### Warning

- *mass* must be greater than 0.

### SFVec3f [in, out] **centerOfMass** 0 0 0 <small>(-∞,∞)</small>
{: #field-centerOfMass }

*centerOfMass* defines local center of mass for physics calculations.

### SFNode [in, out] **massDensityModel** NULL <small class="red">not supported</small>
{: #field-massDensityModel }

The *massDensityModel* field is used to describe the geometry type and dimensions used to calculate the mass density in the physics model. It is not rendered, nor modified by the physics model.

### SFBool [in, out] **useGlobalGravity** TRUE
{: #field-useGlobalGravity }

*useGlobalGravity* indicates whether this particular body is influenced by parent [RigidBodyCollection](/x_ite/components/rigidbodyphysics/rigidbodycollection/)'s gravity setting.

#### Hint

- Contained sub-bodies are not affected by this setting.

### MFVec3f [in, out] **forces** [ ]
{: #field-forces }

*forces* defines linear force values applied to the object every frame.

### MFVec3f [in, out] **torques** [ ]
{: #field-torques }

*torques* defines rotational force values applied to the object every frame.

### SFMatrix3f [in, out] **inertia** 1 0 0 0 1 0 0 0 1 <small>1 0 0</small>
{: #field-inertia }

*inertia* matrix defines a 3x2 *inertia* tensor matrix.

#### Warning

- Only the first 6 values are used.

### SFBool [in, out] **autoDisable** FALSE
{: #field-autoDisable }

*autoDisable* toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.

### SFTime [in, out] **disableTime** 0 <small>[0,∞)</small> <small class="red">not supported</small>
{: #field-disableTime }

*disableTime* defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hints

- Only activated if autoDisable='true'
- *disableTime* is an SFTime duration interval, not an absolute clock time.

### SFFloat [in, out] **disableLinearSpeed** 0 <small>[0,∞)</small>
{: #field-disableLinearSpeed }

*disableLinearSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.

#### Hint

- Only activated if autoDisable='true'

### SFFloat [in, out] **disableAngularSpeed** 0 <small>[0,∞)</small>
{: #field-disableAngularSpeed }

*disableAngularSpeed* defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.

#### Hint

- Only activated if autoDisable='true'

### MFNode [in, out] **geometry** [ ] <small>[X3DNBodyCollidableNode]</small>
{: #field-geometry }

The *geometry* field is used to connect the body modelled by the physics engine implementation to the real *geometry* of the scene through the use of collidable nodes. This allows the *geometry* to be connected directly to the physics model as well as collision detection. Collidable nodes have their location set to the same location as the body instance in which they are located.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #field-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #field-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #field-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/screenshot.avif" alt="RigidBody"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/RigidBody/RigidBody.x3d)
{: .example-links }

## See Also

- [X3D Specification of RigidBody Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#RigidBody)
