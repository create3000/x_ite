---
title: TransmitterPdu
date: 2022-01-07
nav: components-DIS
categories: [components, DIS]
tags: [TransmitterPdu, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TransmitterPdu is a networked Protocol Data Unit (PDU) information node that provides detailed information about a radio transmitter modeled in a simulation.

The TransmitterPdu node belongs to the **DIS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + TransmitterPdu (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

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

Multicast network address, or else "localhost" example: 224.2.181.145.

### SFVec3f [in, out] **antennaLocation** 0 0 0 <small>(-∞,∞)</small>

World coordinates for antenna location.

### SFInt32 [in, out] **antennaPatternLength** <small>[0,65535]</small>

Input/Output field antennaPatternLength.

### SFInt32 [in, out] **antennaPatternType** <small>[0,65535]</small>

Antenna shape pattern: 0 for omnidirectional, 1 for beam, 2 for spherical harmonic (deprecated), or optional higher value

### SFInt32 [in, out] **applicationID** 1 <small>[0,65535]</small>

Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **cryptoKeyID** <small>[0,65535]</small>

Nonzero value corresponding to the simulated cryptographic key. Enumerations value 0 indicates plain (unencrypted) communications.

### SFInt32 [in, out] **cryptoSystem** <small>[0,65535]</small>

Indicates type of crypto system being used, even if the encryption equipment is not keyed. Value 0 for No Encryption Device, higher enumerations values correspond to other specific equipment..

### SFInt32 [in, out] **entityID** <small>[0,65535]</small>

EntityID unique ID for entity within that application.

### SFInt32 [in, out] **frequency**

Transmission frequency in Hz. If the radio is in frequency hopping mode, this field may be set to the center of the frequency hopping band currently in use, or to some other appropriate value.

### SFInt32 [in, out] **inputSource** <small>[0,255]</small>

Source of transmission input. Enumerations value 0 for Other, 1 for Pilot, 2 for Copilot, 3 for First Officer, 4 for Driver, 5 for Loader, 6 for Gunner, 7 for Commander, 8 for Digital Data Device, 9 for Intercom, 10 for Audio Jammer, 11 for Data Jammer, 12 for GPS Jammer, 13 for GPS Meaconer (masking beacon).

### SFInt32 [in, out] **lengthOfModulationParameters** <small>[0,255]</small>

Input/Output field lengthOfModulationParameters.

### SFInt32 [in, out] **modulationTypeDetail** <small>[0,65535]</small>

Enumeration containing detailed information depending on the major modulation type.

### SFInt32 [in, out] **modulationTypeMajor** <small>[0,65535]</small>

Enumeration containing major classification of the modulation type. Enumerations value 0 for No Statement, 1 for Amplitude, 2 for Amplitude and Angle, 3 for Angle, 4 for Combination, 5 for Pulse, 6 for Unmodulated, 7 for Carrier Phase Shift Modulation (CPSM).

### SFInt32 [in, out] **modulationTypeSpreadSpectrum** <small>[0,65535]</small>

Indicates the spread spectrum technique or combination of spread spectrum techniques in use.

### SFInt32 [in, out] **modulationTypeSystem** <small>[0,65535]</small>

Specifies radio system associated with this Transmitter PDU and used to interpret other fields whose values depend on a specific radio system.

### SFString [in, out] **multicastRelayHost** ""

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort**

Fallback server port if multicast not available locally. For example: 8010.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|</small>

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values. Network activity may have associated security issues.

### SFInt32 [in, out] **port**

Multicast network port, for example: 62040.

### SFFloat [in, out] **power**

Power that radio would be capable of outputting if on and transmitting, independent of actual transmit state of the radio.

### SFInt32 [in, out] **radioEntityTypeCategory**

Enumeration containing EntityType of transmitter radio. Enumerations value: 0 for Other, 1 for Generic Radio or Simple Intercom, 2 for HAVE QUICK, 3 for HAVE QUICK II, 4 for HAVE QUICK IIA, 5 for SINCGARS, 6 for CCTT SINCGARS, 7 for EPLRS (Enhanced Position Location Reporting System), 8 for JTIDS/MIDS, 9 for Link 11, 10 for Link 11B, 11 for L-Band SATCOM, 12 for Enhanced SINCGARS 7.3, 13 for Navigation Aid.

### SFInt32 [in, out] **radioEntityTypeCountry**

Enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [in, out] **radioEntityTypeDomain**

Enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [in, out] **radioEntityTypeKind**

Enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [in, out] **radioEntityTypeNomenclature**

Enumerations value indicating nomenclature (name) for a particular emitter. See DIS enumerations reference for value/name pairs.

### SFInt32 [in, out] **radioEntityTypeNomenclatureVersion**

Named equipment version number.

### SFInt32 [in, out] **radioID**

Identifies a particular radio within a given entity.

### SFFloat [in, out] **readInterval** 0.1

Seconds between read updates, 0 means no reading.

### SFVec3f [in, out] **relativeAntennaLocation** 0 0 0

Relative coordinates for antenna location.

### SFBool [in, out] **rtpHeaderExpected** FALSE

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **siteID**

Simulation/exercise siteID of the participating LAN or organization.

### SFFloat [in, out] **transmitFrequencyBandwidth**

Bandwidth of the particular transmitter measured between the half-power (-3 dB) points (this value represents total bandwidth, not the deviation from the center frequency).

### SFInt32 [in, out] **transmitState**

Specify radio transmission state where enumerations value 0 is for off, value 1 for powered but not transmitting, or value 1 is for powered and transmitting,

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

- TransmitterPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Include `<component name='DIS' level='1'/>`

## External Links

- [X3D Specification of TransmitterPdu](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#TransmitterPdu){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
