---
title: CollisionSensor
date: 2023-01-07
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

The CollisionSensor node belongs to the **RigidBodyPhysics** component and requires at least level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + CollisionSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

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

The *collider* field specifies a [CollisionCollection](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/collisioncollection/) node that holds a collidables field of nodes and spaces that are to be included in collision-detection computations.

## Advice

### Hints

- Contains [CollisionCollection](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/collisioncollection/) node (`containerField='collider').`
- CollisionSensor also has output events: [CollidableOffset](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/collidableoffset/) and [CollidableShape](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/collidableshape/) nodes (`containerField='intersections'),` [Contact](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rigidbodyphysics/contact/) nodes (`containerField='contacts').`
- [Event timing details are explained in X3D Specification 4.4.8.3 Execution model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/concepts.html#ExecutionModel)
- Content must be visible to be collidable and to be pickable.

## See Also

- [X3D Specification of CollisionSensor Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionSensor)
