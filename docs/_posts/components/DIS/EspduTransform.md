---
title: EspduTransform
date: 2022-01-07
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

The EspduTransform node belongs to the **DIS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + EspduTransform (X3DSensorNode)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables the sensor node.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ]

Input/Output field children.

### SFBool [out] **isActive**

Have we received a network update recently?

### SFFloat [in] **set_articulationParameterValue0** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue1** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue2** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue3** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue4** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue5** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue6** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFFloat [in] **set_articulationParameterValue7** <small>(-∞,∞)</small>

Set element of user-defined payload array.

### SFString [in, out] **address** "localhost"

Multicast network address, or else "localhost"

### SFInt32 [in, out] **applicationID** 1 <small>[0,65535]</small>

Simulation/exercise applicationID is unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **articulationParameterCount** <small>[0,78]</small>

Number of articulated parameters attached to this entity state PDU.

### MFInt32 [in, out] **articulationParameterDesignatorArray** [ ] <small>[0,255]</small>

Array of designators for each articulated parameter.

### MFInt32 [in, out] **articulationParameterChangeIndicatorArray** [ ] <small>[0,255]</small>

Array of change counters, each incremented when an articulated parameter is updated.#IMPLIED]

### MFInt32 [in, out] **articulationParameterIdPartAttachedToArray** [ ] <small>[0,65535]</small>

Array of ID parts that each articulated parameter is attached to.

### MFInt32 [in, out] **articulationParameterTypeArray** [ ]

Array of type enumerations for each articulated parameter element.

### MFFloat [in, out] **articulationParameterArray** [ ] <small>(-∞,∞)</small>

Information required for representation of the entity's visual appearance and position of its articulated parts.

#### Hint

- Renamed as Variable Parameter in IEEE DIS 2012 revised standard.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFInt32 [in, out] **collisionType** <small>[0,255]</small>

Enumeration for type of collision: ELASTIC or INELASTIC.

### SFInt32 [in, out] **deadReckoning** <small>[0,255]</small>

Dead reckoning algorithm being used to project position/orientation with velocities/accelerations.

### SFVec3f [in, out] **detonationLocation** 0 0 0 <small>(-∞,∞)</small>

World coordinates for detonationLocation

### SFVec3f [in, out] **detonationRelativeLocation** 0 0 0 <small>(-∞,∞)</small>

Relative coordinates for detonation location

### SFInt32 [in, out] **detonationResult** <small>[0,255]</small>

Enumeration for type of detonation and result that occurred., if any.

### SFInt32 [in, out] **entityCategory** <small>[0,255]</small>

Enumerations value for main category that describes the entity, semantics of each code varies according to domain. See DIS Enumerations values.

### SFInt32 [in, out] **entityCountry** <small>[0,65535]</small>

Enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [in, out] **entityDomain** <small>[0,255]</small>

Enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [in, out] **entityExtra** <small>[0,255]</small>

Any extra information required to describe a particular entity. The contents of this field shall depend on the type of entity represented.

### SFInt32 [in, out] **entityID** <small>[0,65535]</small>

Simulation/exercise entityID is a unique ID for a single entity within that application.

### SFInt32 [in, out] **entityKind** <small>[0,255]</small>

Enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [in, out] **entitySpecific** <small>[0,255]</small>

Specific information about an entity based on the Subcategory field. See DIS Enumerations values.

### SFInt32 [in, out] **entitySubCategory** <small>[0,255]</small>

Enumerations value for particular subcategory to which an entity belongs based on the Category field. See DIS Enumerations values.

### SFInt32 [in, out] **eventApplicationID** 1 <small>[0,65535]</small>

Simulation/exercise eventApplicationID is unique for events generated from application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **eventEntityID** <small>[0,65535]</small>

For a given event, simulation/exercise entityID is a unique ID for a single entity within that application.

### SFInt32 [in, out] **eventNumber** <small>[0,65355]</small>

Sequential number of each event issued by an application.

#### Warning

- Reuse of numbers may be necessary during long simulation exercises.

### SFInt32 [in, out] **eventSiteID** <small>[0,65535]</small>

Simulation/exercise siteID of the participating LAN or organization.

### SFBool [in, out] **fired1** FALSE

Has the primary weapon (Fire PDU) been fired?

### SFBool [in, out] **fired2** FALSE

Has the secondary weapon (Fire PDU) been fired?

### SFInt32 [in, out] **fireMissionIndex** <small>[0,65535]</small>

Input/Output field fireMissionIndex.

### SFFloat [in, out] **firingRange** 0 <small>(0,∞)</small>

Range (three dimension, straight-line distance) that the firing entity's fire control system has assumed for computing the fire control solution if a weapon and if the value is known

### SFInt32 [in, out] **firingRate** <small>[0,65535]</small>

Rate at which munitions are fired.

### SFInt32 [in, out] **forceID** <small>[0,255]</small>

*forceID* determines the team membership of the issuing entity, and whether FRIENDLY OPPOSING or NEUTRAL or OTHER.

### SFInt32 [in, out] **fuse** <small>[0,65535]</small>

Enumerations value for type of fuse on the munition.

### SFVec3f [in, out] **linearVelocity** 0 0 0 <small>(-∞,∞)</small>

Velocity of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFVec3f [in, out] **linearAcceleration** 0 0 0 <small>(-∞,∞)</small>

Acceleration of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.

### SFString [in, out] **marking** ""

Maximum of 11 characters for simple entity label.

### SFString [in, out] **multicastRelayHost** ""

Fallback server address if multicast not available locally.

### SFInt32 [in, out] **multicastRelayPort**

Fallback server port if multicast not available locally.

### SFInt32 [in, out] **munitionApplicationID** 1 <small>[0,65535]</small>

*munitionApplicationID*, unique for application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFVec3f [in, out] **munitionEndPoint** 0 0 0 <small>(-∞,∞)</small>

Final point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFInt32 [in, out] **munitionEntityID** <small>[0,65535]</small>

*munitionEntityID* is unique ID for entity firing munition within that application.

### SFInt32 [in, out] **munitionQuantity** <small>[0,65535]</small>

Quantity of munitions fired.

### SFInt32 [in, out] **munitionSiteID** <small>[0,65535]</small>

Munition siteID of the participating LAN or organization.

### SFVec3f [in, out] **munitionStartPoint** 0 0 0 <small>(-∞,∞)</small>

Initial point of the munition path from firing weapon to detonation or impact, in exercise coordinates.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values. Network activity may have associated security issues.

### SFInt32 [in, out] **port**

Network connection port number (EXAMPLE 62040) for sending or receiving DIS messages.

### SFTime [in, out] **readInterval** 0.1 <small>[0,∞)</small>

Seconds between read updates, 0 means no reading.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Orientation of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFVec3f [in, out] **scale** 1 1 1

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFInt32 [in, out] **siteID**

Simulation/exercise siteID of the participating LAN or organization.

### SFVec3f [in, out] **translation** 0 0 0

Position of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.

### SFInt32 [in, out] **warhead**

Enumerations value for type of warhead on the munition.

### SFTime [in, out] **writeInterval** 1 <small>[0,∞)</small>

Seconds between write updates, 0 means no writing (sending).

### SFFloat [out] **articulationParameterValue0_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue1_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue2_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue3_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue4_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue5_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue6_changed**

Get element of user-defined payload array.

### SFFloat [out] **articulationParameterValue7_changed**

Get element of user-defined payload array.

### SFTime [out] **collideTime**

When were we collided with?

### SFTime [out] **detonateTime**

When were we detonated?

### SFTime [out] **firedTime**

When did we shoot a weapon (Fire PDU)?

### SFBool [out] **isCollided**

Has a matching CollisionPDU reported a collision?

### SFBool [out] **isDetonated**

Has a matching DetonationPDU reported a detonation?

### SFBool [out] **isNetworkReader**

Whether networkMode="remote" (listen to network as copy of remote entity)

### SFBool [out] **isNetworkWriter**

Whether networkMode="master" (output to network as master entity at writeInterval)

### SFBool [out] **isRtpHeaderHeard**

Whether incoming DIS packets have an RTP header prepended.

### SFBool [out] **isStandAlone**

Whether networkMode="local" (ignore network but still respond to local events)

### SFTime [out] **timestamp**

DIS timestamp in VRML time units from latest update.

### SFBool [ ] **rtpHeaderExpected** FALSE

Whether RTP headers are prepended to DIS PDUs.

## Description

### Hints

- These PDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='DIS' level='1'/>`

## External Links

- [X3D Specification of EspduTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#EspduTransform){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
