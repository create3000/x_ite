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

The CollisionSensor node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + CollisionSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [out] **isActive**

*isActive* true/false events are sent when sensing starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFNode [out] **intersections** <small>[X3DNBodyCollidableNode]</small>

Output field *intersections*.

### MFNode [out] **contacts** <small>[Contact]</small>

Output field *contacts*.

### SFNode [in, out] **collider** NULL <small>[CollisionCollection]</small>

The *collider* field specifies a CollisionCollection node that holds a collidables field of nodes and spaces that are to be included in collision-detection computations.

## Information

### Hints

- Contains CollisionCollection node (containerField='collider').
- CollisionSensor also has output events: CollidableOffset and CollidableShape nodes (containerField='intersections'), Contact nodes (containerField='contacts').
- [Event timing details are explained in X3D Specification 4.4.8.3 Execution model](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/concepts.html#ExecutionModel){:target="_blank"}
- Content must be visible to be collidable and to be pickable.

## External Links

- [X3D Specification of CollisionSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionSensor){:target="_blank"}
- [Event timing details are explained in 4.4.8.3 Execution model](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/concepts.html#ExecutionModel){:target="_blank"}
