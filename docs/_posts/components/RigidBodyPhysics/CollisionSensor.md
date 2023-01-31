---
title: CollisionSensor
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollisionSensor, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollisionSensor generates collision-detection events.

The CollisionSensor node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + CollisionSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [out] **isActive**

IsActive true/false events are sent when sensing starts/stops.

### MFNode [out] **intersections** <small>[X3DNBodyCollidableNode]</small>

Output field intersections.

### MFNode [out] **contacts**

Output field contacts.

### SFNode [in, out] **collider** NULL <small>[CollisionCollection]</small>

Input/Output field collider.

## Description

### Hints

- Contains CollisionCollection node (containerField='collider').
- CollisionSensor also has output events: CollidableOffset and CollidableShape nodes (containerField='intersections'), Contact nodes (containerField='contacts').

## External Links

- [X3D Specification of CollisionSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionSensor){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
