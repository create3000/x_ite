---
title: DISEntityManager
date: 2022-01-07
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

The DISEntityManager node belongs to the **DIS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + DISEntityManager
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **address** "localhost"

Multicast network address, or else "localhost" example: 224.2.181.145.

### SFInt32 [in, out] **applicationID** 1 <small>[0,65535]</small>

Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.

### MFNode [in, out] **mapping** [ ] <small>[DISEntityTypeMapping]</small>

Input/Output field mapping.

### SFInt32 [in, out] **port** <small>[0,65535]</small>

Multicast network port, for example: 62040.

### SFInt32 [in, out] **siteID** <small>[0,65535]</small>

Simulation/exercise siteID of the participating LAN or organization.

### MFNode [out] **addedEntities**

Output field addedEntities.

### MFNode [out] **removedEntities**

Output field removedEntities.

## Description

### Hints

- DISEntityManager contains DISEntityTypeMapping nodes.
- DisEntityManager ESPDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Include `<component name='DIS' level='2'/>`

## External Links

- [X3D Specification of DISEntityManager](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#DISEntityManager){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
