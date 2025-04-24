---
title: SignalPdu
date: 2023-01-07
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

The SignalPdu node belongs to the **DIS** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + SignalPdu (X3DBoundedObject)*
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
| SFInt32 | [in, out] | [applicationID](#field-applicationID) | 0  |
| MFInt32 | [in, out] | [data](#field-data) | [ ] |
| SFInt32 | [in, out] | [dataLength](#field-dataLength) | 0  |
| SFInt32 | [in, out] | [encodingScheme](#field-encodingScheme) | 0  |
| SFInt32 | [in, out] | [entityID](#field-entityID) | 0  |
| SFString | [in, out] | [multicastRelayHost](#field-multicastRelayHost) | "" |
| SFInt32 | [in, out] | [multicastRelayPort](#field-multicastRelayPort) |  |
| SFString | [in, out] | [networkMode](#field-networkMode) | "standAlone"  |
| SFInt32 | [in, out] | [port](#field-port) | 0  |
| SFInt32 | [in, out] | [radioID](#field-radioID) | 0  |
| SFTime | [in, out] | [readInterval](#field-readInterval) | 0 |
| SFBool | [in, out] | [rtpHeaderExpected](#field-rtpHeaderExpected) | FALSE |
| SFInt32 | [in, out] | [sampleRate](#field-sampleRate) | 0  |
| SFInt32 | [in, out] | [samples](#field-samples) | 0  |
| SFInt32 | [in, out] | [siteID](#field-siteID) | 0  |
| SFInt32 | [in, out] | [tdlType](#field-tdlType) | 0  |
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

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #field-applicationID }

Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### MFInt32 [in, out] **data** [ ] <small>[0,255]</small>
{: #field-data }

Holds audio or digital *data* conveyed by the radio transmission. Interpretation of the field depends on values of encodingScheme and tdlType fields.

### SFInt32 [in, out] **dataLength** 0 <small>[0,65535]</small>
{: #field-dataLength }

Number of bits of digital voice audio or digital data being sent in the Signal PDU. If the Encoding Class is database index, then *dataLength* field is set to 96.

### SFInt32 [in, out] **encodingScheme** 0 <small>[0,65535]</small>
{: #field-encodingScheme }

Designates both Encoding Class and Encoding Type. Encoding Class enumerated value (2 most significant bits): 0 = Encoded Voice; 1 = Raw Binary Data; 2 = Application-Specific Data; 3 = Database Index. Encoding Type enumerated value (14 least significant bits): 1 = 8-bit mu-law; 2 = CVSD per MIL-STD-188-113; 3 = ADPCM per CCITT G.721; 4 = 16-bit linear PCM; 5 = 8-bit linear PCM; 6 = Vector Quantization.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>
{: #field-entityID }

EntityID unique ID for entity within that application.

### SFString [in, out] **multicastRelayHost** ""
{: #field-multicastRelayHost }

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort**
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

### SFInt32 [in, out] **radioID** 0 <small>[0,65535]</small>
{: #field-radioID }

Identifies a particular radio within a given entity.

### SFTime [in, out] **readInterval** 0.1 <small>(0,∞)</small>
{: #field-readInterval }

Seconds between read updates, 0 means no reading.

#### Hint

- *readInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFBool [in, out] **rtpHeaderExpected** FALSE
{: #field-rtpHeaderExpected }

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **sampleRate** 0 <small>[0,65535]</small>
{: #field-sampleRate }

*sampleRate* gives either (1) sample rate in samples per second if Encoding Class is encoded audio, or (2) data rate in bits per second for data transmissions. If Encoding Class is database index, *sampleRate* is set to zero.

#### Hint

- [Wikipedia Nyquist frequency](https://en.wikipedia.org/wiki/Nyquist_frequency)

### SFInt32 [in, out] **samples** 0 <small>[0,65535]</small>
{: #field-samples }

Number of *samples* in the PDU if the Encoding Class is encoded voice, otherwise the field is set to zero.

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #field-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### SFInt32 [in, out] **tdlType** 0 <small>[0,65535]</small>
{: #field-tdlType }

Tactical Data Link (TDL) type as an enumerated value when the Encoding Class is voice, raw binary, application-specific, or database index representation of a TDL message.

### SFInt32 [in, out] **whichGeometry** 1 <small>[-1,∞)</small>
{: #field-whichGeometry }

Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.

### SFTime [in, out] **writeInterval** 1 <small>(0,∞)</small>
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

- SignalPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='DIS' level='1'/>`

## See Also

- [X3D Specification of SignalPdu Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#SignalPdu)
