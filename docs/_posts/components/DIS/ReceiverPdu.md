---
title: ReceiverPdu
date: 2022-01-07
nav: components-DIS
categories: [components, DIS]
tags: [ReceiverPdu, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ReceiverPdu is a networked Protocol Data Unit (PDU) information node that transmits the state of radio frequency (RF) receivers modeled in a simulation.

The ReceiverPdu node belongs to the **DIS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + ReceiverPdu (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

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

### SFBool [in, out] **enabled** TRUE

Enables/disables the sensor node.

### SFBool [out] **isActive**

Have we had a network update recently?.

### SFString [in, out] **address** "localhost"

Multicast network address, or else "localhost"

### SFInt32 [in, out] **applicationID** 1 <small>[0,65535]</small>

Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **entityID** <small>[0,65535]</small>

*entityID* unique ID for entity within that application.

### SFString [in, out] **multicastRelayHost** ""

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort**

Fallback server port if multicast not available locally. For example: 8010.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values. Network activity may have associated security issues.

### SFInt32 [in, out] **port**

Multicast network port, for example: 62040.

### SFInt32 [in, out] **radioID**

Identifies a particular radio within a given entity.

### SFFloat [in, out] **readInterval** 0.1

Seconds between read updates, 0 means no reading.

### SFFloat [in, out] **receivedPower**

*receivedPower* indicates radio frequency (RF) power received, in units of decibel-milliwatts (dBm), after applying any propagation loss and antenna gain

### SFInt32 [in, out] **receiverState**

*receiverState* indicates if receiver is currently idle or busy via one of these enumerated values: 0 = off, 1 = on but not receiving, or 2 = on and receiving.

### SFBool [in, out] **rtpHeaderExpected** FALSE

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **siteID**

Simulation/exercise siteID of the participating LAN or organization.

### SFInt32 [in, out] **transmitterApplicationID** 1

Simulation/exercise transmitterApplicationID is unique for transmitter application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **transmitterEntityID**

Simulation/exercise transmitterEntityID is a unique ID for a single entity within that application.

### SFInt32 [in, out] **transmitterRadioID**

Identifies a particular radio within a given entity.

### SFInt32 [in, out] **transmitterSiteID**

Simulation/exercise transmitterSiteID of the participating LAN or organization.

### SFInt32 [in, out] **whichGeometry** 1

Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.

### SFFloat [in, out] **writeInterval** 1

Seconds between write updates, 0 means no writing (sending).

### SFBool [out] **isNetworkReader**

Whether networkMode="remote" (listen to network as copy of remote entity)

### SFBool [out] **isNetworkWriter**

Whether networkMode="master" (output to network as master entity at writeInterval)

### SFBool [out] **isRtpHeaderHeard**

Whether incoming DIS packets have an RTP header prepended.

### SFBool [out] **isStandAlone**

Whether networkMode="local" (ignore network but still respond to local events)

### SFTime [out] **timestamp**

DIS timestamp in X3D units (seconds since 1 January 1970).

## Description

### Hints

- ReceiverPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Include `<component name='DIS' level='1'/>`

## External Links

- [X3D Specification of ReceiverPdu](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#ReceiverPdu){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
