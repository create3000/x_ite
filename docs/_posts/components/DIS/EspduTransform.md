---
title: EspduTransform
date: 2023-01-07
nav: components-DIS
categories: [components, DIS]
tags: [EspduTransform, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

EspduTransform is a networked Transform node that can contain most nodes. If activated, EspduTransform can send or receive Entity State Protocol Data Unit (PDU) packets, also integrating functionality for the following DIS PDUs: EntityStatePdu, CollisionPdu, DetonatePdu, FirePdu, CreateEntity and RemoveEntity PDUs.

The EspduTransform node belongs to the **DIS** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + EspduTransform (X3DSensorNode)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [description](#field-description) | "" |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| MFNode | [in] | [addChildren](#field-addChildren) |  |
| MFNode | [in] | [removeChildren](#field-removeChildren) |  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
| SFBool | [out] | [isActive](#field-isActive) |  |
| SFFloat | [in] | [set_articulationParameterValue0](#field-set_articulationParameterValue0) |  |
| SFFloat | [in] | [set_articulationParameterValue1](#field-set_articulationParameterValue1) |  |
| SFFloat | [in] | [set_articulationParameterValue2](#field-set_articulationParameterValue2) |  |
| SFFloat | [in] | [set_articulationParameterValue3](#field-set_articulationParameterValue3) |  |
| SFFloat | [in] | [set_articulationParameterValue4](#field-set_articulationParameterValue4) |  |
| SFFloat | [in] | [set_articulationParameterValue5](#field-set_articulationParameterValue5) |  |
| SFFloat | [in] | [set_articulationParameterValue6](#field-set_articulationParameterValue6) |  |
| SFFloat | [in] | [set_articulationParameterValue7](#field-set_articulationParameterValue7) |  |
| SFString | [in, out] | [address](#field-address) | "localhost" |
| SFInt32 | [in, out] | [applicationID](#field-applicationID) | 0  |
| SFInt32 | [in, out] | [articulationParameterCount](#field-articulationParameterCount) | 0  |
| MFInt32 | [in, out] | [articulationParameterDesignatorArray](#field-articulationParameterDesignatorArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterChangeIndicatorArray](#field-articulationParameterChangeIndicatorArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterIdPartAttachedToArray](#field-articulationParameterIdPartAttachedToArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterTypeArray](#field-articulationParameterTypeArray) | [ ] |
| MFFloat | [in, out] | [articulationParameterArray](#field-articulationParameterArray) | [ ] |
| SFVec3f | [in, out] | [center](#field-center) | 0 0 0  |
| SFInt32 | [in, out] | [collisionType](#field-collisionType) | 0  |
| SFInt32 | [in, out] | [deadReckoning](#field-deadReckoning) | 0  |
| SFVec3f | [in, out] | [detonationLocation](#field-detonationLocation) | 0 0 0  |
| SFVec3f | [in, out] | [detonationRelativeLocation](#field-detonationRelativeLocation) | 0 0 0  |
| SFInt32 | [in, out] | [detonationResult](#field-detonationResult) | 0  |
| SFInt32 | [in, out] | [entityCategory](#field-entityCategory) | 0  |
| SFInt32 | [in, out] | [entityCountry](#field-entityCountry) | 0  |
| SFInt32 | [in, out] | [entityDomain](#field-entityDomain) | 0  |
| SFInt32 | [in, out] | [entityExtra](#field-entityExtra) | 0  |
| SFInt32 | [in, out] | [entityID](#field-entityID) | 0  |
| SFInt32 | [in, out] | [entityKind](#field-entityKind) | 0  |
| SFInt32 | [in, out] | [entitySpecific](#field-entitySpecific) | 0  |
| SFInt32 | [in, out] | [entitySubcategory](#field-entitySubcategory) | 0  |
| SFInt32 | [in, out] | [eventApplicationID](#field-eventApplicationID) | 0  |
| SFInt32 | [in, out] | [eventEntityID](#field-eventEntityID) | 0  |
| SFInt32 | [in, out] | [eventNumber](#field-eventNumber) | 0  |
| SFInt32 | [in, out] | [eventSiteID](#field-eventSiteID) | 0  |
| SFBool | [in, out] | [fired1](#field-fired1) | FALSE |
| SFBool | [in, out] | [fired2](#field-fired2) | FALSE |
| SFInt32 | [in, out] | [fireMissionIndex](#field-fireMissionIndex) | 0  |
| SFFloat | [in, out] | [firingRange](#field-firingRange) | 0  |
| SFInt32 | [in, out] | [firingRate](#field-firingRate) | 0  |
| SFInt32 | [in, out] | [forceID](#field-forceID) | 0  |
| SFInt32 | [in, out] | [fuse](#field-fuse) | 0  |
| SFVec3f | [in, out] | [linearVelocity](#field-linearVelocity) | 0 0 0  |
| SFVec3f | [in, out] | [linearAcceleration](#field-linearAcceleration) | 0 0 0  |
| SFString | [in, out] | [marking](#field-marking) | "" |
| SFString | [in, out] | [multicastRelayHost](#field-multicastRelayHost) | "" |
| SFInt32 | [in, out] | [multicastRelayPort](#field-multicastRelayPort) | 0  |
| SFInt32 | [in, out] | [munitionApplicationID](#field-munitionApplicationID) | 0  |
| SFVec3f | [in, out] | [munitionEndPoint](#field-munitionEndPoint) | 0 0 0  |
| SFInt32 | [in, out] | [munitionEntityID](#field-munitionEntityID) | 0  |
| SFInt32 | [in, out] | [munitionQuantity](#field-munitionQuantity) | 0  |
| SFInt32 | [in, out] | [munitionSiteID](#field-munitionSiteID) | 0  |
| SFVec3f | [in, out] | [munitionStartPoint](#field-munitionStartPoint) | 0 0 0  |
| SFString | [in, out] | [networkMode](#field-networkMode) | "standAlone"  |
| SFInt32 | [in, out] | [port](#field-port) | 0  |
| SFTime | [in, out] | [readInterval](#field-readInterval) | 0 |
| SFRotation | [in, out] | [rotation](#field-rotation) | 0 0 1 0  |
| SFVec3f | [in, out] | [scale](#field-scale) | 1 1 1  |
| SFRotation | [in, out] | [scaleOrientation](#field-scaleOrientation) | 0 0 1 0  |
| SFInt32 | [in, out] | [siteID](#field-siteID) | 0  |
| SFVec3f | [in, out] | [translation](#field-translation) | 0 0 0  |
| SFInt32 | [in, out] | [warhead](#field-warhead) | 0  |
| SFTime | [in, out] | [writeInterval](#field-writeInterval) | 1  |
| SFFloat | [out] | [articulationParameterValue0_changed](#field-articulationParameterValue0_changed) |  |
| SFFloat | [out] | [articulationParameterValue1_changed](#field-articulationParameterValue1_changed) |  |
| SFFloat | [out] | [articulationParameterValue2_changed](#field-articulationParameterValue2_changed) |  |
| SFFloat | [out] | [articulationParameterValue3_changed](#field-articulationParameterValue3_changed) |  |
| SFFloat | [out] | [articulationParameterValue4_changed](#field-articulationParameterValue4_changed) |  |
| SFFloat | [out] | [articulationParameterValue5_changed](#field-articulationParameterValue5_changed) |  |
| SFFloat | [out] | [articulationParameterValue6_changed](#field-articulationParameterValue6_changed) |  |
| SFFloat | [out] | [articulationParameterValue7_changed](#field-articulationParameterValue7_changed) |  |
| SFTime | [out] | [collideTime](#field-collideTime) |  |
| SFTime | [out] | [detonateTime](#field-detonateTime) |  |
| SFTime | [out] | [firedTime](#field-firedTime) |  |
| SFBool | [out] | [isCollided](#field-isCollided) |  |
| SFBool | [out] | [isDetonated](#field-isDetonated) |  |
| SFBool | [out] | [isNetworkReader](#field-isNetworkReader) |  |
| SFBool | [out] | [isNetworkWriter](#field-isNetworkWriter) |  |
| SFBool | [out] | [isRtpHeaderHeard](#field-isRtpHeaderHeard) |  |
| SFBool | [out] | [isStandAlone](#field-isStandAlone) |  |
| SFTime | [out] | [timestamp](#field-timestamp) |  |
| SFBool | [in, out] | [rtpHeaderExpected](#field-rtpHeaderExpected) | FALSE |
| SFVec3d | [in, out] | [geoCoords](#field-geoCoords) | 0 0 0  |
| MFString | [ ] | [geoSystem](#field-geoSystem) | [ "GD", "WE" ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #field-description }

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables the sensor node.

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

### MFNode [in] **addChildren**
{: #field-addChildren }

Input field *addChildren*.

### MFNode [in] **removeChildren**
{: #field-removeChildren }

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>
{: #field-children }

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

### SFBool [out] **isActive**
{: #field-isActive }

Have we received a network update recently?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [in] **set_articulationParameterValue0** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue0 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue1** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue1 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue2** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue2 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue3** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue3 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue4** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue4 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue5** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue5 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue6** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue6 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue7** <small>(-∞,∞)</small>
{: #field-set_articulationParameterValue7 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **address** "localhost"
{: #field-address }

Multicast network *address*, or else 'localhost'; Example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #field-applicationID }

Simulation/exercise *applicationID* is unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### SFInt32 [in, out] **articulationParameterCount** 0 <small>[0,78]</small>
{: #field-articulationParameterCount }

Number of articulated parameters attached to this entity state PDU.

### MFInt32 [in, out] **articulationParameterDesignatorArray** [ ] <small>[0,255]</small>
{: #field-articulationParameterDesignatorArray }

Array of designators for each articulated parameter.

### MFInt32 [in, out] **articulationParameterChangeIndicatorArray** [ ] <small>[0,255]</small>
{: #field-articulationParameterChangeIndicatorArray }

Array of change counters, each incremented when an articulated parameter is updated.#IMPLIED]

### MFInt32 [in, out] **articulationParameterIdPartAttachedToArray** [ ] <small>[0,65535]</small>
{: #field-articulationParameterIdPartAttachedToArray }

Array of ID parts that each articulated parameter is attached to.

### MFInt32 [in, out] **articulationParameterTypeArray** [ ]
{: #field-articulationParameterTypeArray }

Array of type enumerations for each articulated parameter element.

### MFFloat [in, out] **articulationParameterArray** [ ] <small>(-∞,∞)</small>
{: #field-articulationParameterArray }

Information required for representation of the entity's visual appearance and position of its articulated parts.

#### Hint

- Renamed as Variable Parameter in IEEE DIS 2012 revised standard.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>
{: #field-center }

Translation offset from origin of local coordinate system.

### SFInt32 [in, out] **collisionType** 0 <small>[0,255]</small>
{: #field-collisionType }

Integer enumeration for type of collision: ELASTIC or INELASTIC.

### SFInt32 [in, out] **deadReckoning** 0 <small>[0,255]</small>
{: #field-deadReckoning }

Dead reckoning algorithm being used to project position/orientation with velocities/accelerations.

### SFVec3f [in, out] **detonationLocation** 0 0 0 <small>(-∞,∞)</small>
{: #field-detonationLocation }

World coordinates for *detonationLocation*

### SFVec3f [in, out] **detonationRelativeLocation** 0 0 0 <small>(-∞,∞)</small>
{: #field-detonationRelativeLocation }

Relative coordinates for detonation location

### SFInt32 [in, out] **detonationResult** 0 <small>[0,255]</small>
{: #field-detonationResult }

Integer enumeration for type of detonation and result that occurred., if any.

### SFInt32 [in, out] **entityCategory** 0 <small>[0,255]</small>
{: #field-entityCategory }

Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain. See DIS Enumerations values.

### SFInt32 [in, out] **entityCountry** 0 <small>[0,65535]</small>
{: #field-entityCountry }

Integer enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [in, out] **entityDomain** 0 <small>[0,255]</small>
{: #field-entityDomain }

Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [in, out] **entityExtra** 0 <small>[0,255]</small>
{: #field-entityExtra }

Any extra information required to describe a particular entity. The contents of this field shall depend on the type of entity represented.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>
{: #field-entityID }

Simulation/exercise *entityID* is a unique ID for a single entity within that application.

### SFInt32 [in, out] **entityKind** 0 <small>[0,255]</small>
{: #field-entityKind }

Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [in, out] **entitySpecific** 0 <small>[0,255]</small>
{: #field-entitySpecific }

Specific information about an entity based on the Subcategory field. See DIS Enumerations values.

### SFInt32 [in, out] **entitySubcategory** 0 <small>[0,255]</small>
{: #field-entitySubcategory }

Integer enumerations value for particular subcategory to which an entity belongs based on the category field. See DIS Enumerations values.

### SFInt32 [in, out] **eventApplicationID** 0 <small>[0,65535]</small>
{: #field-eventApplicationID }

Simulation/exercise *eventApplicationID* is unique for events generated from application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **eventEntityID** 0 <small>[0,65535]</small>
{: #field-eventEntityID }

For a given event, simulation/exercise entityID is a unique ID for a single entity within that application.

### SFInt32 [in, out] **eventNumber** 0 <small>[0,65355]</small>
{: #field-eventNumber }

Sequential number of each event issued by an application.

#### Warning

- Reuse of numbers may be necessary during long simulation exercises.

### SFInt32 [in, out] **eventSiteID** 0 <small>[0,65535]</small>
{: #field-eventSiteID }

Simulation/exercise siteID of the participating LAN or organization.

### SFBool [in, out] **fired1** FALSE
{: #field-fired1 }

Has the primary weapon (Fire PDU) been fired?

### SFBool [in, out] **fired2** FALSE
{: #field-fired2 }

Has the secondary weapon (Fire PDU) been fired?

### SFInt32 [in, out] **fireMissionIndex** 0 <small>[0,65535]</small>
{: #field-fireMissionIndex }

Input/Output field *fireMissionIndex*.

### SFFloat [in, out] **firingRange** 0 <small>(0,∞)</small>
{: #field-firingRange }

Range (three dimension, straight-line distance) that the firing entity's fire control system has assumed for computing the fire control solution if a weapon and if the value is known

### SFInt32 [in, out] **firingRate** 0 <small>[0,65535]</small>
{: #field-firingRate }

Rate at which munitions are fired.

### SFInt32 [in, out] **forceID** 0 <small>[0,255]</small>
{: #field-forceID }

*forceID* determines the team membership of the issuing entity, and whether FRIENDLY OPPOSING or NEUTRAL or OTHER.

### SFInt32 [in, out] **fuse** 0 <small>[0,65535]</small>
{: #field-fuse }

Integer enumerations value for type of *fuse* on the munition.

### SFVec3f [in, out] **linearVelocity** 0 0 0 <small>(-∞,∞)</small>
{: #field-linearVelocity }

Velocity of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFVec3f [in, out] **linearAcceleration** 0 0 0 <small>(-∞,∞)</small>
{: #field-linearAcceleration }

Acceleration of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFString [in, out] **marking** ""
{: #field-marking }

Maximum of 11 characters for simple entity label.

### SFString [in, out] **multicastRelayHost** ""
{: #field-multicastRelayHost }

Fallback server address if multicast not available locally. Example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort** 0 <small>[0,65535]</small>
{: #field-multicastRelayPort }

Fallback server port if multicast not available locally. Example: 8010.

### SFInt32 [in, out] **munitionApplicationID** 0 <small>[0,65535]</small>
{: #field-munitionApplicationID }

*munitionApplicationID*, unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFVec3f [in, out] **munitionEndPoint** 0 0 0 <small>(-∞,∞)</small>
{: #field-munitionEndPoint }

Final point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFInt32 [in, out] **munitionEntityID** 0 <small>[0,65535]</small>
{: #field-munitionEntityID }

*munitionEntityID* is unique ID for entity firing munition within that application.

### SFInt32 [in, out] **munitionQuantity** 0 <small>[0,65535]</small>
{: #field-munitionQuantity }

Quantity of munitions fired.

### SFInt32 [in, out] **munitionSiteID** 0 <small>[0,65535]</small>
{: #field-munitionSiteID }

Munition siteID of the participating LAN or organization.

### SFVec3f [in, out] **munitionStartPoint** 0 0 0 <small>(-∞,∞)</small>
{: #field-munitionStartPoint }

Initial point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>
{: #field-networkMode }

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.
- Network activity may have associated security issues.

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>
{: #field-port }

Network connection *port* number (EXAMPLE 3000) for sending or receiving DIS messages. Example: 3000.

### SFTime [in, out] **readInterval** 0.1 <small>[0,∞)</small>
{: #field-readInterval }

Seconds between read updates, 0 means no reading.

#### Hint

- *readInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #field-rotation }

Orientation of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>
{: #field-scale }

Non-uniform x-y-z *scale* of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #field-scaleOrientation }

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #field-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>
{: #field-translation }

Position of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFInt32 [in, out] **warhead** 0 <small>[0,65535]</small>
{: #field-warhead }

Integer enumerations value for type of *warhead* on the munition.

### SFTime [in, out] **writeInterval** 1 <small>[0,∞)</small>
{: #field-writeInterval }

Seconds between write updates, 0 means no writing (sending).

#### Hint

- *writeInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFFloat [out] **articulationParameterValue0_changed**
{: #field-articulationParameterValue0_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue1_changed**
{: #field-articulationParameterValue1_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue2_changed**
{: #field-articulationParameterValue2_changed }

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue3_changed**
{: #field-articulationParameterValue3_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue4_changed**
{: #field-articulationParameterValue4_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue5_changed**
{: #field-articulationParameterValue5_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue6_changed**
{: #field-articulationParameterValue6_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue7_changed**
{: #field-articulationParameterValue7_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **collideTime**
{: #field-collideTime }

When were we collided with?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **detonateTime**
{: #field-detonateTime }

When were we detonated?

### SFTime [out] **firedTime**
{: #field-firedTime }

When did we shoot a weapon (Fire PDU)?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isCollided**
{: #field-isCollided }

Has a matching CollisionPDU reported a collision?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isDetonated**
{: #field-isDetonated }

Has a matching DetonationPDU reported a detonation?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isNetworkReader**
{: #field-isNetworkReader }

Whether networkMode='remote' (listen to network as copy of remote entity).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isNetworkWriter**
{: #field-isNetworkWriter }

Whether networkMode='master' (output to network as master entity at writeInterval).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isRtpHeaderHeard**
{: #field-isRtpHeaderHeard }

Whether incoming DIS packets have an RTP header prepended.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isStandAlone**
{: #field-isStandAlone }

Whether networkMode='local' (ignore network but still respond to local events).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **timestamp**
{: #field-timestamp }

DIS *timestamp* received from latest PDU update, converted to X3D SFTime units.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [in, out] **rtpHeaderExpected** FALSE
{: #field-rtpHeaderExpected }

Whether RTP headers are prepended to DIS PDUs.

### SFVec3d [in, out] **geoCoords** 0 0 0 <small>(-∞,∞)</small>
{: #field-geoCoords }

Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

### MFString [ ] **geoSystem** [ "GD", "WE" ]
{: #field-geoSystem }

Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM). Supported values: "GD" "UTM" or "GC" followed by additional quoted string parameters as appropriate for the type.

#### Hints

- [X3D Architecture 25.2.2 Spatial reference frames](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Spatialreferenceframes)
- [X3D Architecture 25.2.4 Specifying geospatial coordinates](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/geospatial.html#Specifyinggeospatialcoords)
- [UTM is Universal Transverse Mercator coordinate system](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)

#### Warning

- Deprecated values are GDC (replaced by GD) and GCC (replaced by GC).

## Advice

### Hints

- These PDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='DIS' level='1'/>`

## See Also

- [X3D Specification of EspduTransform Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#EspduTransform)
