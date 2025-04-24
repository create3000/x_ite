---
title: DISEntityManager
date: 2023-01-07
nav: components-DIS
categories: [components, DIS]
tags: [DISEntityManager, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

DISEntityManager notifies a scene when new DIS ESPDU entities arrive or current entities leave. DISEntityManager may contain any number of DISEntityTypeMapping nodes that provide a best-match X3D model to incoming entity type values. For each new DIS entity, DISEntityManager thus produces a new EspduTransform node that contains a corresponding X3D model.

The DISEntityManager node belongs to the **DIS** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + DISEntityManager
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [address](#field-address) | "localhost" |
| SFInt32 | [in, out] | [applicationID](#field-applicationID) | 0  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
| SFInt32 | [in, out] | [port](#field-port) | 0  |
| SFInt32 | [in, out] | [siteID](#field-siteID) | 0  |
| MFNode | [out] | [addedEntities](#field-addedEntities) |  |
| MFNode | [out] | [removedEntities](#field-removedEntities) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **address** "localhost"
{: #field-address }

Multicast network *address*, or else 'localhost'. Example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 0 <small>[0,65535]</small>
{: #field-applicationID }

Each simulation application that can respond to simulation management PDUs needs to have a unique *applicationID*.

### MFNode [in, out] **children** [ ] <small>[DISEntityTypeMapping]</small>
{: #field-children }

Mapping field provides a mechanism for automatically creating an X3D model when a new entity arrives over the network. If a new entity matches one of the nodes, an instance of the provided URL is created and added as a child to the [EspduTransform](/x_ite/components/dis/espdutransform/) specified in the addedEntities field.

#### Hint

- Multiple [DISEntityTypeMapping](/x_ite/components/dis/disentitytypemapping/) nodes can be provided in mapping field, best match takes precedence.

#### Warning

- [Field originally named 'mapping' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### SFInt32 [in, out] **port** 0 <small>[0,65535]</small>
{: #field-port }

Multicast network *port*, for example: 3000.

### SFInt32 [in, out] **siteID** 0 <small>[0,65535]</small>
{: #field-siteID }

Simulation/exercise *siteID* of the participating LAN or organization.

### MFNode [out] **addedEntities**
{: #field-addedEntities }

*addedEntities* array contains any new entities added during the last frame.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### MFNode [out] **removedEntities**
{: #field-removedEntities }

*removedEntities* output array provides [EspduTransform](/x_ite/components/dis/espdutransform/) references to any entities removed during last frame, either due to a timeout or from an explicit RemoveEntityPDU action.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- DISEntityManager contains [DISEntityTypeMapping](/x_ite/components/dis/disentitytypemapping/) nodes.
- DisEntityManager ESPDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)

### Warnings

- ['children' field originally named 'mapping' in X3Dv3.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)
- Requires X3D `profile='Full'` or else include `<component name='DIS' level='2'/>`

## See Also

- [X3D Specification of DISEntityManager Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#DISEntityManager)
