---
title: ReceiverPdu
date: 2023-01-07
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

The ReceiverPdu node belongs to the [DIS](/x_ite/components/overview/#dis) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + ReceiverPdu (X3DBoundedObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [visible](#fields-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) | 0 0 0  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFString | [in, out] | [address](#fields-address) | "localhost" |
| SFInt32 | [in, out] | [applicationID](#fields-applicationID) | 0  |
| SFInt32 | [in, out] | [entityID](#fields-entityID) | 0  |
| SFString | [in, out] | [multicastRelayHost](#fields-multicastRelayHost) | "" |
| SFInt32 | [in, out] | [multicastRelayPort](#fields-multicastRelayPort) | 0  |
| SFString | [in, out] | [networkMode](#fields-networkMode) | "standAlone"  |
| SFInt32 | [in, out] | [port](#fields-port) | 0  |
| SFInt32 | [in, out] | [radioID](#fields-radioID) | 0  |
| SFTime | [in, out] | [readInterval](#fields-readInterval) | 0.1  |
| SFFloat | [in, out] | [receivedPower](#fields-receivedPower) | 0  |
| SFInt32 | [in, out] | [receiverState](#fields-receiverState) | 0  |
| SFBool | [in, out] | [rtpHeaderExpected](#fields-rtpHeaderExpected) | FALSE |
| SFInt32 | [in, out] | [siteID](#fields-siteID) | 0  |
| SFInt32 | [in, out] | [transmitterApplicationID](#fields-transmitterApplicationID) | 0  |
| SFInt32 | [in, out] | [transmitterEntityID](#fields-transmitterEntityID) | 0  |
| SFInt32 | [in, out] | [transmitterRadioID](#fields-transmitterRadioID) | 0  |
| SFInt32 | [in, out] | [transmitterSiteID](#fields-transmitterSiteID) | 0  |
| SFInt32 | [in, out] | [whichGeometry](#fields-whichGeometry) | 1  |
| SFTime | [in, out] | [writeInterval](#fields-writeInterval) | 1  |
| SFBool | [out] | [isNetworkReader](#fields-isNetworkReader) |  |
| SFBool | [out] | [isNetworkWriter](#fields-isNetworkWriter) |  |
| SFBool | [out] | [isRtpHeaderHeard](#fields-isRtpHeaderHeard) |  |
| SFBool | [out] | [isStandAlone](#fields-isStandAlone) |  |
| SFTime | [out] | [timestamp](#fields-timestamp) |  |
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

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables the sensor node.

### SFBool [out] **isActive**
{: #fields-isActive }

Confirm whether there has been a recent network update.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFString [in, out] **address** "localhost"
{: #fields-address }

Multicast network *address*, or else 'localhost'; Example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #fields-applicationID }

Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### SFInt32 [in, out] **entityID** 0 <small>[0,65535]</small>
{: #fields-entityID }

EntityID unique ID for entity within that application.

### SFString [in, out] **multicastRelayHost** ""
{: #fields-multicastRelayHost }

Fallback server address if multicast not available locally. For example: track.nps.edu.

### SFInt32 [in, out] **multicastRelayPort** 0 <small>[0,65535]</small>
{: #fields-multicastRelayPort }

Fallback server port if multicast not available locally. For example: 8010.

### SFString [in, out] **networkMode** "standAlone" <small>["standAlone"|"networkReader"|"networkWriter"]</small>
{: #fields-networkMode }

Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network. (1) standAlone: ignore network but still respond to events in local scene. (2) networkReader: listen to network and read PDU packets at readInterval, act as remotely linked copy of entity. (3) networkWriter: send PDU packets to network at writeInterval, act as master entity. Default value "standAlone" ensures that DIS network activation within a scene as networkReader or networkWriter is intentional.

#### Warnings

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.
- Network activity may have associated security issues.

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>
{: #fields-port }

Multicast network *port*, for example: 3000.

### SFInt32 [in, out] **radioID** 0 <small>[0,65535]</small>
{: #fields-radioID }

Identifies a particular radio within a given entity.

### SFTime [in, out] **readInterval** 0.1 <small>(0,∞)</small>
{: #fields-readInterval }

Seconds between read updates, 0 means no reading.

#### Hint

- *readInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

### SFFloat [in, out] **receivedPower** 0 <small>(0,∞)</small>
{: #fields-receivedPower }

*receivedPower* indicates radio frequency (RF) power received, in units of decibel-milliwatts (dBm), after applying any propagation loss and antenna gain

### SFInt32 [in, out] **receiverState** 0 <small>[0,65535]</small>
{: #fields-receiverState }

*receiverState* indicates if receiver is currently idle or busy via one of these enumerated values: 0 = off, 1 = on but not receiving, or 2 = on and receiving.

### SFBool [in, out] **rtpHeaderExpected** FALSE
{: #fields-rtpHeaderExpected }

Whether RTP headers are prepended to DIS PDUs.

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #fields-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### SFInt32 [in, out] **transmitterApplicationID** 0 <small>[0,65535]</small>
{: #fields-transmitterApplicationID }

Simulation/exercise *transmitterApplicationID* is unique for transmitter application at that site. Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### SFInt32 [in, out] **transmitterEntityID** 0 <small>[0,65535]</small>
{: #fields-transmitterEntityID }

Simulation/exercise *transmitterEntityID* is a unique ID for a single entity within that application.

### SFInt32 [in, out] **transmitterRadioID** 0 <small>[0,65535]</small>
{: #fields-transmitterRadioID }

Identifies a particular radio within a given entity.

### SFInt32 [in, out] **transmitterSiteID** 0 <small>[0,65535]</small>
{: #fields-transmitterSiteID }

Simulation/exercise *transmitterSiteID* of the participating LAN or organization.

### SFInt32 [in, out] **whichGeometry** 1 <small>[-1,∞)</small>
{: #fields-whichGeometry }

Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.

### SFTime [in, out] **writeInterval** 1 <small>(0,∞)</small>
{: #fields-writeInterval }

Seconds between write updates, 0 means no writing (sending).

#### Hint

- *writeInterval* is a nonnegative SFTime duration interval, not an absolute clock time.

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

DIS *timestamp* in X3D units (value 0.0 matches 1 January 1970) in seconds.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

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

- ReceiverPdu packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='DIS' level='1'/>`

## See Also

- [X3D Specification of ReceiverPdu Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#ReceiverPdu)
