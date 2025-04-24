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
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFBool | [in, out] | [visible](#fields-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) | 0 0 0  |
| MFNode | [in] | [addChildren](#fields-addChildren) |  |
| MFNode | [in] | [removeChildren](#fields-removeChildren) |  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFFloat | [in] | [set_articulationParameterValue0](#fields-set_articulationParameterValue0) |  |
| SFFloat | [in] | [set_articulationParameterValue1](#fields-set_articulationParameterValue1) |  |
| SFFloat | [in] | [set_articulationParameterValue2](#fields-set_articulationParameterValue2) |  |
| SFFloat | [in] | [set_articulationParameterValue3](#fields-set_articulationParameterValue3) |  |
| SFFloat | [in] | [set_articulationParameterValue4](#fields-set_articulationParameterValue4) |  |
| SFFloat | [in] | [set_articulationParameterValue5](#fields-set_articulationParameterValue5) |  |
| SFFloat | [in] | [set_articulationParameterValue6](#fields-set_articulationParameterValue6) |  |
| SFFloat | [in] | [set_articulationParameterValue7](#fields-set_articulationParameterValue7) |  |
| SFString | [in, out] | [address](#fields-address) | "localhost" |
| SFInt32 | [in, out] | [applicationID](#fields-applicationID) | 0  |
| SFInt32 | [in, out] | [articulationParameterCount](#fields-articulationParameterCount) | 0  |
| MFInt32 | [in, out] | [articulationParameterDesignatorArray](#fields-articulationParameterDesignatorArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterChangeIndicatorArray](#fields-articulationParameterChangeIndicatorArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterIdPartAttachedToArray](#fields-articulationParameterIdPartAttachedToArray) | [ ] |
| MFInt32 | [in, out] | [articulationParameterTypeArray](#fields-articulationParameterTypeArray) | [ ] |
| MFFloat | [in, out] | [articulationParameterArray](#fields-articulationParameterArray) | [ ] |
| SFVec3f | [in, out] | [center](#fields-center) | 0 0 0  |
| SFInt32 | [in, out] | [collisionType](#fields-collisionType) | 0  |
| SFInt32 | [in, out] | [deadReckoning](#fields-deadReckoning) | 0  |
| SFVec3f | [in, out] | [detonationLocation](#fields-detonationLocation) | 0 0 0  |
| SFVec3f | [in, out] | [detonationRelativeLocation](#fields-detonationRelativeLocation) | 0 0 0  |
| SFInt32 | [in, out] | [detonationResult](#fields-detonationResult) | 0  |
| SFInt32 | [in, out] | [entityCategory](#fields-entityCategory) | 0  |
| SFInt32 | [in, out] | [entityCountry](#fields-entityCountry) | 0  |
| SFInt32 | [in, out] | [entityDomain](#fields-entityDomain) | 0  |
| SFInt32 | [in, out] | [entityExtra](#fields-entityExtra) | 0  |
| SFInt32 | [in, out] | [entityID](#fields-entityID) | 0  |
| SFInt32 | [in, out] | [entityKind](#fields-entityKind) | 0  |
| SFInt32 | [in, out] | [entitySpecific](#fields-entitySpecific) | 0  |
| SFInt32 | [in, out] | [entitySubcategory](#fields-entitySubcategory) | 0  |
| SFInt32 | [in, out] | [eventApplicationID](#fields-eventApplicationID) | 0  |
| SFInt32 | [in, out] | [eventEntityID](#fields-eventEntityID) | 0  |
| SFInt32 | [in, out] | [eventNumber](#fields-eventNumber) | 0  |
| SFInt32 | [in, out] | [eventSiteID](#fields-eventSiteID) | 0  |
| SFBool | [in, out] | [fired1](#fields-fired1) | FALSE |
| SFBool | [in, out] | [fired2](#fields-fired2) | FALSE |
| SFInt32 | [in, out] | [fireMissionIndex](#fields-fireMissionIndex) | 0  |
| SFFloat | [in, out] | [firingRange](#fields-firingRange) | 0  |
| SFInt32 | [in, out] | [firingRate](#fields-firingRate) | 0  |
| SFInt32 | [in, out] | [forceID](#fields-forceID) | 0  |
| SFInt32 | [in, out] | [fuse](#fields-fuse) | 0  |
| SFVec3f | [in, out] | [linearVelocity](#fields-linearVelocity) | 0 0 0  |
| SFVec3f | [in, out] | [linearAcceleration](#fields-linearAcceleration) | 0 0 0  |
| SFString | [in, out] | [marking](#fields-marking) | "" |
| SFString | [in, out] | [multicastRelayHost](#fields-multicastRelayHost) | "" |
| SFInt32 | [in, out] | [multicastRelayPort](#fields-multicastRelayPort) | 0  |
| SFInt32 | [in, out] | [munitionApplicationID](#fields-munitionApplicationID) | 0  |
| SFVec3f | [in, out] | [munitionEndPoint](#fields-munitionEndPoint) | 0 0 0  |
| SFInt32 | [in, out] | [munitionEntityID](#fields-munitionEntityID) | 0  |
| SFInt32 | [in, out] | [munitionQuantity](#fields-munitionQuantity) | 0  |
| SFInt32 | [in, out] | [munitionSiteID](#fields-munitionSiteID) | 0  |
| SFVec3f | [in, out] | [munitionStartPoint](#fields-munitionStartPoint) | 0 0 0  |
| SFString | [in, out] | [networkMode](#fields-networkMode) | "standAlone"  |
| SFInt32 | [in, out] | [port](#fields-port) | 0  |
| SFTime | [in, out] | [readInterval](#fields-readInterval) | 0.1  |
| SFRotation | [in, out] | [rotation](#fields-rotation) | 0 0 1 0  |
| SFVec3f | [in, out] | [scale](#fields-scale) | 1 1 1  |
| SFRotation | [in, out] | [scaleOrientation](#fields-scaleOrientation) | 0 0 1 0  |
| SFInt32 | [in, out] | [siteID](#fields-siteID) | 0  |
| SFVec3f | [in, out] | [translation](#fields-translation) | 0 0 0  |
| SFInt32 | [in, out] | [warhead](#fields-warhead) | 0  |
| SFTime | [in, out] | [writeInterval](#fields-writeInterval) | 1  |
| SFFloat | [out] | [articulationParameterValue0_changed](#fields-articulationParameterValue0_changed) |  |
| SFFloat | [out] | [articulationParameterValue1_changed](#fields-articulationParameterValue1_changed) |  |
| SFFloat | [out] | [articulationParameterValue2_changed](#fields-articulationParameterValue2_changed) |  |
| SFFloat | [out] | [articulationParameterValue3_changed](#fields-articulationParameterValue3_changed) |  |
| SFFloat | [out] | [articulationParameterValue4_changed](#fields-articulationParameterValue4_changed) |  |
| SFFloat | [out] | [articulationParameterValue5_changed](#fields-articulationParameterValue5_changed) |  |
| SFFloat | [out] | [articulationParameterValue6_changed](#fields-articulationParameterValue6_changed) |  |
| SFFloat | [out] | [articulationParameterValue7_changed](#fields-articulationParameterValue7_changed) |  |
| SFTime | [out] | [collideTime](#fields-collideTime) |  |
| SFTime | [out] | [detonateTime](#fields-detonateTime) |  |
| SFTime | [out] | [firedTime](#fields-firedTime) |  |
| SFBool | [out] | [isCollided](#fields-isCollided) |  |
| SFBool | [out] | [isDetonated](#fields-isDetonated) |  |
| SFBool | [out] | [isNetworkReader](#fields-isNetworkReader) |  |
| SFBool | [out] | [isNetworkWriter](#fields-isNetworkWriter) |  |
| SFBool | [out] | [isRtpHeaderHeard](#fields-isRtpHeaderHeard) |  |
| SFBool | [out] | [isStandAlone](#fields-isStandAlone) |  |
| SFTime | [out] | [timestamp](#fields-timestamp) |  |
| SFBool | [in, out] | [rtpHeaderExpected](#fields-rtpHeaderExpected) | FALSE |
| SFVec3d | [in, out] | [geoCoords](#fields-geoCoords) | 0 0 0  |
| MFString | [ ] | [geoSystem](#fields-geoSystem) | [ "GD", "WE" ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables the sensor node.

### SFBool [in, out] **visible** TRUE
{: #fields-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #fields-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #fields-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #fields-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addChildren**
{: #fields-addChildren }

Input field *addChildren*.

### MFNode [in] **removeChildren**
{: #fields-removeChildren }

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>
{: #fields-children }

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

### SFBool [out] **isActive**
{: #fields-isActive }

Have we received a network update recently?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [in] **set_articulationParameterValue0** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue0 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue1** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue1 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue2** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue2 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue3** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue3 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue4** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue4 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue5** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue5 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue6** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue6 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFFloat [in] **set_articulationParameterValue7** <small>(-∞,∞)</small>
{: #fields-set_articulationParameterValue7 }

Set element of user-defined payload array.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFString [in, out] **address** "localhost"
{: #fields-address }

Multicast network *address*, or else 'localhost'; Example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #fields-applicationID }

Simulation/exercise *applicationID* is unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### SFInt32 [in, out] **articulationParameterCount** 0 <small>[0,78]</small>
{: #fields-articulationParameterCount }

Number of articulated parameters attached to this entity state PDU.

### MFInt32 [in, out] **articulationParameterDesignatorArray** [ ] <small>[0,255]</small>
{: #fields-articulationParameterDesignatorArray }

Array of designators for each articulated parameter.

### MFInt32 [in, out] **articulationParameterChangeIndicatorArray** [ ] <small>[0,255]</small>
{: #fields-articulationParameterChangeIndicatorArray }

Array of change counters, each incremented when an articulated parameter is updated.#IMPLIED]

### MFInt32 [in, out] **articulationParameterIdPartAttachedToArray** [ ] <small>[0,65535]</small>
{: #fields-articulationParameterIdPartAttachedToArray }

Array of ID parts that each articulated parameter is attached to.

### MFInt32 [in, out] **articulationParameterTypeArray** [ ]
{: #fields-articulationParameterTypeArray }

Array of type enumerations for each articulated parameter element.

### MFFloat [in, out] **articulationParameterArray** [ ] <small>(-∞,∞)</small>
{: #fields-articulationParameterArray }

Information required for representation of the entity's visual appearance and position of its articulated parts.

#### Hint

- Renamed as Variable Parameter in IEEE DIS 2012 revised standard.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>
{: #fields-center }

Translation offset from origin of local coordinate system.

### SFInt32 [in, out] **collisionType** 0 <small>[0,255]</small>
{: #fields-collisionType }

Integer enumeration for type of collision: ELASTIC or INELASTIC.

### SFInt32 [in, out] **deadReckoning** 0 <small>[0,255]</small>
{: #fields-deadReckoning }

Dead reckoning algorithm being used to project position/orientation with velocities/accelerations.

### SFVec3f [in, out] **detonationLocation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-detonationLocation }

World coordinates for *detonationLocation*

### SFVec3f [in, out] **detonationRelativeLocation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-detonationRelativeLocation }

Relative coordinates for detonation location

### SFInt32 [in, out] **detonationResult** 0 <small>[0,255]</small>
{: #fields-detonationResult }

Integer enumeration for type of detonation and result that occurred., if any.

### SFInt32 [in, out] **entityCategory** 0 <small>[0,255]</small>
{: #fields-entityCategory }

Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain. See DIS Enumerations values.

### SFInt32 [in, out] **entityCountry** 0 <small>[0,65535]</small>
{: #fields-entityCountry }

Integer enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [in, out] **entityDomain** 0 <small>[0,255]</small>
{: #fields-entityDomain }

Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [in, out] **entityExtra** 0 <small>[0,255]</small>
{: #fields-entityExtra }

Any extra information required to describe a particular entity. The contents of this field shall depend on the type of entity represented.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>
{: #fields-entityID }

Simulation/exercise *entityID* is a unique ID for a single entity within that application.

### SFInt32 [in, out] **entityKind** 0 <small>[0,255]</small>
{: #fields-entityKind }

Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [in, out] **entitySpecific** 0 <small>[0,255]</small>
{: #fields-entitySpecific }

Specific information about an entity based on the Subcategory field. See DIS Enumerations values.

### SFInt32 [in, out] **entitySubcategory** 0 <small>[0,255]</small>
{: #fields-entitySubcategory }

Integer enumerations value for particular subcategory to which an entity belongs based on the category field. See DIS Enumerations values.

### SFInt32 [in, out] **eventApplicationID** 0 <small>[0,65535]</small>
{: #fields-eventApplicationID }

Simulation/exercise *eventApplicationID* is unique for events generated from application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **eventEntityID** 0 <small>[0,65535]</small>
{: #fields-eventEntityID }

For a given event, simulation/exercise entityID is a unique ID for a single entity within that application.

### SFInt32 [in, out] **eventNumber** 0 <small>[0,65355]</small>
{: #fields-eventNumber }

Sequential number of each event issued by an application.

#### Warning

- Reuse of numbers may be necessary during long simulation exercises.

### SFInt32 [in, out] **eventSiteID** 0 <small>[0,65535]</small>
{: #fields-eventSiteID }

Simulation/exercise siteID of the participating LAN or organization.

### SFBool [in, out] **fired1** FALSE
{: #fields-fired1 }

Has the primary weapon (Fire PDU) been fired?

### SFBool [in, out] **fired2** FALSE
{: #fields-fired2 }

Has the secondary weapon (Fire PDU) been fired?

### SFInt32 [in, out] **fireMissionIndex** 0 <small>[0,65535]</small>
{: #fields-fireMissionIndex }

Input/Output field *fireMissionIndex*.

### SFFloat [in, out] **firingRange** 0 <small>(0,∞)</small>
{: #fields-firingRange }

Range (three dimension, straight-line distance) that the firing entity's fire control system has assumed for computing the fire control solution if a weapon and if the value is known

### SFInt32 [in, out] **firingRate** 0 <small>[0,65535]</small>
{: #fields-firingRate }

Rate at which munitions are fired.

### SFInt32 [in, out] **forceID** 0 <small>[0,255]</small>
{: #fields-forceID }

*forceID* determines the team membership of the issuing entity, and whether FRIENDLY OPPOSING or NEUTRAL or OTHER.

### SFInt32 [in, out] **fuse** 0 <small>[0,65535]</small>
{: #fields-fuse }

Integer enumerations value for type of *fuse* on the munition.

### SFVec3f [in, out] **linearVelocity** 0 0 0 <small>(-∞,∞)</small>
{: #fields-linearVelocity }

Velocity of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFVec3f [in, out] **linearAcceleration** 0 0 0 <small>(-∞,∞)</small>
{: #fields-linearAcceleration }

Acceleration of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFString [in, out] **marking** ""
{: #fields-marking }

Maximum of 11 characters for simple entity label.

### SFString [in, out] **multicastRelayHost** ""
{: #fields-multicastRelayHost }

Fallback server address if multicast not available locally. Example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort** 0 <small>[0,65535]</small>
{: #fields-multicastRelayPort }

Fallback server port if multicast not available locally. Example: 8010.

### SFInt32 [in, out] **munitionApplicationID** 0 <small>[0,65535]</small>
{: #fields-munitionApplicationID }

*munitionApplicationID*, unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFVec3f [in, out] **munitionEndPoint** 0 0 0 <small>(-∞,∞)</small>
{: #fields-munitionEndPoint }

Final point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFInt32 [in, out] **munitionEntityID** 0 <small>[0,65535]</small>
{: #fields-munitionEntityID }

*munitionEntityID* is unique ID for entity firing munition within that application.

### SFInt32 [in, out] **munitionQuantity** 0 <small>[0,65535]</small>
{: #fields-munitionQuantity }

Quantity of munitions fired.

### SFInt32 [in, out] **munitionSiteID** 0 <small>[0,65535]</small>
{: #fields-munitionSiteID }

Munition siteID of the participating LAN or organization.

### SFVec3f [in, out] **munitionStartPoint** 0 0 0 <small>(-∞,∞)</small>
{: #fields-munitionStartPoint }

Initial point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>
{: #fields-networkMode }

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.
- Network activity may have associated security issues.

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>
{: #fields-port }

Network connection *port* number (EXAMPLE 3000) for sending or receiving DIS messages. Example: 3000.

### SFTime [in, out] **readInterval** 0.1 <small>[0,∞)</small>
{: #fields-readInterval }

Seconds between read updates, 0 means no reading.

#### Hint

- *readInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-rotation }

Orientation of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>
{: #fields-scale }

Non-uniform x-y-z *scale* of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-scaleOrientation }

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #fields-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-translation }

Position of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFInt32 [in, out] **warhead** 0 <small>[0,65535]</small>
{: #fields-warhead }

Integer enumerations value for type of *warhead* on the munition.

### SFTime [in, out] **writeInterval** 1 <small>[0,∞)</small>
{: #fields-writeInterval }

Seconds between write updates, 0 means no writing (sending).

#### Hint

- *writeInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFFloat [out] **articulationParameterValue0_changed**
{: #fields-articulationParameterValue0_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue1_changed**
{: #fields-articulationParameterValue1_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue2_changed**
{: #fields-articulationParameterValue2_changed }

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue3_changed**
{: #fields-articulationParameterValue3_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue4_changed**
{: #fields-articulationParameterValue4_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue5_changed**
{: #fields-articulationParameterValue5_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue6_changed**
{: #fields-articulationParameterValue6_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **articulationParameterValue7_changed**
{: #fields-articulationParameterValue7_changed }

Get element of user-defined payload array.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **collideTime**
{: #fields-collideTime }

When were we collided with?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **detonateTime**
{: #fields-detonateTime }

When were we detonated?

### SFTime [out] **firedTime**
{: #fields-firedTime }

When did we shoot a weapon (Fire PDU)?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isCollided**
{: #fields-isCollided }

Has a matching CollisionPDU reported a collision?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isDetonated**
{: #fields-isDetonated }

Has a matching DetonationPDU reported a detonation?

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isNetworkReader**
{: #fields-isNetworkReader }

Whether networkMode='remote' (listen to network as copy of remote entity).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isNetworkWriter**
{: #fields-isNetworkWriter }

Whether networkMode='master' (output to network as master entity at writeInterval).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isRtpHeaderHeard**
{: #fields-isRtpHeaderHeard }

Whether incoming DIS packets have an RTP header prepended.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [out] **isStandAlone**
{: #fields-isStandAlone }

Whether networkMode='local' (ignore network but still respond to local events).

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **timestamp**
{: #fields-timestamp }

DIS *timestamp* received from latest PDU update, converted to X3D SFTime units.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFBool [in, out] **rtpHeaderExpected** FALSE
{: #fields-rtpHeaderExpected }

Whether RTP headers are prepended to DIS PDUs.

### SFVec3d [in, out] **geoCoords** 0 0 0 <small>(-∞,∞)</small>
{: #fields-geoCoords }

Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).

#### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/GeospatialComponentX3dEarth.pdf)

#### Warning

- Requires X3D `profile='Full'` or else include `<component name='Geospatial' level='1'/>`

### MFString [ ] **geoSystem** [ "GD", "WE" ]
{: #fields-geoSystem }

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
