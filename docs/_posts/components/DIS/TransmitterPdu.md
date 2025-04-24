---
title: TransmitterPdu
date: 2023-01-07
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

The TransmitterPdu node belongs to the **DIS** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + TransmitterPdu (X3DBoundedObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [description](#field-description) | "" |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFBool | [out] | [isActive](#field-isActive) |  |
| SFString | [in, out] | [address](#field-address) | "localhost" |
| SFVec3f | [in, out] | [antennaLocation](#field-antennaLocation) | 0 0 0  |
| SFInt32 | [in, out] | [antennaPatternLength](#field-antennaPatternLength) | 0  |
| SFInt32 | [in, out] | [antennaPatternType](#field-antennaPatternType) | 0  |
| SFInt32 | [in, out] | [applicationID](#field-applicationID) | 0  |
| SFInt32 | [in, out] | [cryptoKeyID](#field-cryptoKeyID) | 0  |
| SFInt32 | [in, out] | [cryptoSystem](#field-cryptoSystem) | 0  |
| SFInt32 | [in, out] | [entityID](#field-entityID) | 0  |
| SFInt32 | [in, out] | [frequency](#field-frequency) |  |
| SFInt32 | [in, out] | [inputSource](#field-inputSource) | 0  |
| SFInt32 | [in, out] | [lengthOfModulationParameters](#field-lengthOfModulationParameters) | 0  |
| SFInt32 | [in, out] | [modulationTypeDetail](#field-modulationTypeDetail) | 0  |
| SFInt32 | [in, out] | [modulationTypeMajor](#field-modulationTypeMajor) | 0  |
| SFInt32 | [in, out] | [modulationTypeSpreadSpectrum](#field-modulationTypeSpreadSpectrum) | 0  |
| SFInt32 | [in, out] | [modulationTypeSystem](#field-modulationTypeSystem) | 0  |
| SFString | [in, out] | [multicastRelayHost](#field-multicastRelayHost) | "" |
| SFInt32 | [in, out] | [multicastRelayPort](#field-multicastRelayPort) | 0  |
| SFString | [in, out] | [networkMode](#field-networkMode) | "standAlone"  |
| SFInt32 | [in, out] | [port](#field-port) | 0  |
| SFFloat | [in, out] | [power](#field-power) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeCategory](#field-radioEntityTypeCategory) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeCountry](#field-radioEntityTypeCountry) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeDomain](#field-radioEntityTypeDomain) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeKind](#field-radioEntityTypeKind) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeNomenclature](#field-radioEntityTypeNomenclature) | 0  |
| SFInt32 | [in, out] | [radioEntityTypeNomenclatureVersion](#field-radioEntityTypeNomenclatureVersion) | 0  |
| SFInt32 | [in, out] | [radioID](#field-radioID) | 0  |
| SFTime | [in, out] | [readInterval](#field-readInterval) | 0 |
| SFVec3f | [in, out] | [relativeAntennaLocation](#field-relativeAntennaLocation) | 0 0 0  |
| SFBool | [in, out] | [rtpHeaderExpected](#field-rtpHeaderExpected) | FALSE |
| SFInt32 | [in, out] | [siteID](#field-siteID) | 0  |
| SFFloat | [in, out] | [transmitFrequencyBandwidth](#field-transmitFrequencyBandwidth) | 0  |
| SFInt32 | [in, out] | [transmitState](#field-transmitState) | 0  |
| SFInt32 | [in, out] | [whichGeometry](#field-whichGeometry) | 1  |
| SFTime | [in, out] | [writeInterval](#field-writeInterval) | 1  |
| SFBool | [out] | [isNetworkReader](#field-isNetworkReader) |  |
| SFBool | [out] | [isNetworkWriter](#field-isNetworkWriter) |  |
| SFBool | [out] | [isRtpHeaderHeard](#field-isRtpHeaderHeard) |  |
| SFBool | [out] | [isStandAlone](#field-isStandAlone) |  |
| SFTime | [out] | [timestamp](#field-timestamp) |  |
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

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables the sensor node.

### SFBool [out] **isActive**
{: #field-isActive }

Confirm whether there has been a recent network update.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFString [in, out] **address** "localhost"
{: #field-address }

Multicast network *address*, or else 'localhost'. Example: 224.2.181.145.

### SFVec3f [in, out] **antennaLocation** 0 0 0 <small>(-∞,∞)</small>
{: #field-antennaLocation }

World coordinates for antenna location.

### SFInt32 [in, out] **antennaPatternLength** 0 <small>[0,65535]</small>
{: #field-antennaPatternLength }

Input/Output field *antennaPatternLength*.

### SFInt32 [in, out] **antennaPatternType** 0 <small>[0,65535]</small>
{: #field-antennaPatternType }

Antenna shape pattern: 0 for omnidirectional, 1 for beam, 2 for spherical harmonic (deprecated), or optional higher value

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #field-applicationID }

Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### SFInt32 [in, out] **cryptoKeyID** 0 <small>[0,65535]</small>
{: #field-cryptoKeyID }

Nonzero value corresponding to the simulated cryptographic key. Enumerations value 0 indicates plain (unencrypted) communications.

### SFInt32 [in, out] **cryptoSystem** 0 <small>[0,65535]</small>
{: #field-cryptoSystem }

Indicates type of crypto system being used, even if the encryption equipment is not keyed. Value 0 for No Encryption Device, higher enumerations values correspond to other specific equipment.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>
{: #field-entityID }

EntityID unique ID for entity within that application.

### SFInt32 [in, out] **frequency**
{: #field-frequency }

Transmission *frequency* in Hz. If the radio is in *frequency* hopping mode, this field may be set to the center of the *frequency* hopping band currently in use, or to some other appropriate value.

### SFInt32 [in, out] **inputSource** 0 <small>[0,255]</small>
{: #field-inputSource }

Source of transmission input. Enumerations value 0 for Other, 1 for Pilot, 2 for Copilot, 3 for First Officer, 4 for Driver, 5 for Loader, 6 for Gunner, 7 for Commander, 8 for Digital Data Device, 9 for Intercom, 10 for Audio Jammer, 11 for Data Jammer, 12 for GPS Jammer, 13 for GPS Meaconer (masking beacon).

### SFInt32 [in, out] **lengthOfModulationParameters** 0 <small>[0,255]</small>
{: #field-lengthOfModulationParameters }

Input/Output field *lengthOfModulationParameters*.

### SFInt32 [in, out] **modulationTypeDetail** 0 <small>[0,65535]</small>
{: #field-modulationTypeDetail }

Integer enumeration containing detailed information depending on the major modulation type.

### SFInt32 [in, out] **modulationTypeMajor** 0 <small>[0,65535]</small>
{: #field-modulationTypeMajor }

Integer enumeration containing major classification of the modulation type. Enumerations value 0 for No Statement, 1 for Amplitude, 2 for Amplitude and Angle, 3 for Angle, 4 for Combination, 5 for Pulse, 6 for Unmodulated, 7 for Carrier Phase Shift Modulation (CPSM).

### SFInt32 [in, out] **modulationTypeSpreadSpectrum** 0 <small>[0,65535]</small>
{: #field-modulationTypeSpreadSpectrum }

Indicates the spread spectrum technique or combination of spread spectrum techniques in use.

### SFInt32 [in, out] **modulationTypeSystem** 0 <small>[0,65535]</small>
{: #field-modulationTypeSystem }

Specifies radio system associated with this Transmitter PDU and used to interpret other fields whose values depend on a specific radio system.

### SFString [in, out] **multicastRelayHost** ""
{: #field-multicastRelayHost }

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort** 0 <small>[0,65535]</small>
{: #field-multicastRelayPort }

Fallback server port if multicast not available locally. For example: 8010.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>
{: #field-networkMode }

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.
- Network activity may have associated security issues.

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>
{: #field-port }

Multicast network *port*, for example: 3000.

### SFFloat [in, out] **power** 0 <small>(0,∞)</small>
{: #field-power }

Power that radio would be capable of outputting if on and transmitting, independent of actual transmit state of the radio.

### SFInt32 [in, out] **radioEntityTypeCategory** 0 <small>[0,255]</small>
{: #field-radioEntityTypeCategory }

Integer enumeration containing EntityType of transmitter radio. Enumerations value: 0 for Other, 1 for Generic Radio or Simple Intercom, 2 for HAVE QUICK, 3 for HAVE QUICK II, 4 for HAVE QUICK IIA, 5 for SINCGARS, 6 for CCTT SINCGARS, 7 for EPLRS (Enhanced Position Location Reporting System), 8 for JTIDS/MIDS, 9 for Link 11, 10 for Link 11B, 11 for L-Band SATCOM, 12 for Enhanced SINCGARS 7.3, 13 for Navigation Aid.

### SFInt32 [in, out] **radioEntityTypeCountry** 0 <small>[0,65535]</small>
{: #field-radioEntityTypeCountry }

Integer enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [in, out] **radioEntityTypeDomain** 0 <small>[0,255]</small>
{: #field-radioEntityTypeDomain }

Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [in, out] **radioEntityTypeKind** 0 <small>[0,255]</small>
{: #field-radioEntityTypeKind }

Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [in, out] **radioEntityTypeNomenclature** 0 <small>[0,255]</small>
{: #field-radioEntityTypeNomenclature }

Integer enumerations value indicating nomenclature (name) for a particular emitter. See DIS enumerations reference for value/name pairs.

### SFInt32 [in, out] **radioEntityTypeNomenclatureVersion** 0 <small>[0,65535]</small>
{: #field-radioEntityTypeNomenclatureVersion }

Named equipment version number.

### SFInt32 [in, out] **radioID** 0 <small>[0,255]</small>
{: #field-radioID }

Identifies a particular radio within a given entity.

### SFTime [in, out] **readInterval** 0.1 <small>(0,∞)</small>
{: #field-readInterval }

Seconds between read updates, 0 means no reading.

#### Hint

- *readInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFVec3f [in, out] **relativeAntennaLocation** 0 0 0 <small>(-∞,∞)</small>
{: #field-relativeAntennaLocation }

Relative coordinates for antenna location.

### SFBool [in, out] **rtpHeaderExpected** FALSE
{: #field-rtpHeaderExpected }

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #field-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### SFFloat [in, out] **transmitFrequencyBandwidth** 0 <small>(-∞,∞)</small>
{: #field-transmitFrequencyBandwidth }

Bandwidth of the particular transmitter measured between the half-power (-3 dB) points (this value represents total bandwidth, not the deviation from the center frequency).

### SFInt32 [in, out] **transmitState** 0 <small>[0,255]</small>
{: #field-transmitState }

Specify radio transmission state where enumerations value 0 is for off, value 1 for powered but not transmitting, or value 1 is for powered and transmitting,

### SFInt32 [in, out] **whichGeometry** 1 <small>[-1,∞)</small>
{: #field-whichGeometry }

Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.

### SFTime [in, out] **writeInterval** 1 <small>[0,∞)</small>
{: #field-writeInterval }

Seconds between write updates, 0 means no writing (sending).

#### Hint

- *writeInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

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

DIS *timestamp* in X3D units (value 0.0 matches 1 January 1970) in seconds.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

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

- TransmitterPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='DIS' level='1'/>`

## See Also

- [X3D Specification of TransmitterPdu Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#TransmitterPdu)
