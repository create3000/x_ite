---
title: SignalPdu
date: 2022-01-07
nav: components-DIS
categories: [components, DIS]
tags: [SignalPdu, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SignalPdu is a networked Protocol Data Unit (PDU) information node that communicates the transmission of voice, audio or other data modeled in a simulation.

The SignalPdu node belongs to the **DIS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + SignalPdu (X3DBoundedObject)*
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

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFBool [in, out] **enabled** TRUE

Enables/disables the sensor node.

### SFBool [out] **isActive**

Have we had a network update recently?.

### SFString [in, out] **address** "localhost"

Multicast network address, or else "localhost" example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 1 <small>[0,65535]</small>

Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### MFInt32 [in, out] **data** [ ] <small>[0,255]</small>

Holds audio or digital data conveyed by the radio transmission. Interpretation of the field depends on values of encodingScheme and tdlType fields.

### SFInt32 [in, out] **dataLength** 0 <small>[0,65535]</small>

Number of bits of digital voice audio or digital data being sent in the Signal PDU. If the Encoding Class is database index, then dataLength field is set to 96.

### SFInt32 [in, out] **encodingScheme** 0 <small>[0,65535]</small>

Designates both Encoding Class and Encoding Type. Encoding Class enumerated value (2 most significant bits): 0 = Encoded Voice; 1 = Raw Binary Data; 2 = Application-Specific Data; 3 = Database Index. Encoding Type enumerated value (14 least significant bits): 1 = 8-bit mu-law; 2 = CVSD per MIL-STD-188-113; 3 = ADPCM per CCITT G.721; 4 = 16-bit linear PCM; 5 = 8-bit linear PCM; 6 = Vector Quantization.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>

*entityID* unique ID for entity within that application.

### SFString [in, out] **multicastRelayHost** ""

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort**

Fallback server port if multicast not available locally. For example: 8010.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values. Network activity may have associated security issues.

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>

Multicast network port, for example: 62040.

### SFInt32 [in, out] **radioID** 0 <small>[0,65535]</small>

Identifies a particular radio within a given entity.

### SFFloat [in, out] **readInterval** 0.1 <small>(0,∞)</small>

Seconds between read updates, 0 means no reading.

### SFBool [in, out] **rtpHeaderExpected** FALSE

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **sampleRate** 0 <small>[0,65535]</small>

*sampleRate* gives either (1) sample rate in samples per second if Encoding Class is encoded audio, or (2) data rate in bits per second for data transmissions. If Encoding Class is database index, sampleRate is set to zero.

### SFInt32 [in, out] **samples** 0 <small>[0,65535]</small>

Number of samples in the PDU if the Encoding Class is encoded voice, otherwise the field is set to zero.

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>

Simulation/exercise siteID of the participating LAN or organization.

### SFInt32 [in, out] **tdlType** 0 <small>[0,65535]</small>

Tactical Data Link (TDL) type as an enumerated value when the Encoding Class is voice, raw binary, application-specific, or database index representation of a TDL message.

### SFInt32 [in, out] **whichGeometry** 1 <small>[-1,∞)</small>

Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.

### SFFloat [in, out] **writeInterval** 1 <small>(0,∞)</small>

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

- SignalPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Include `<component name='DIS' level='1'/>`

## External Links

- [X3D Specification of SignalPdu](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#SignalPdu){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
