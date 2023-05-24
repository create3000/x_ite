---
title: LoadSensor
date: 2022-01-07
nav: components-Networking
categories: [components, Networking]
tags: [LoadSensor, Networking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LoadSensor generates events as watchList child nodes are either loaded or fail to load. Changing watchlist child nodes restarts the LoadSensor.

The LoadSensor node belongs to the **Networking** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DNetworkSensorNode
        + LoadSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFTime [in, out] **timeOut**

Time in seconds of maximum load duration prior to declaring failure. Default value zero means use browser defaults.

### SFBool [out] **isActive**

*isActive* true/false events are sent when sensing starts/stops.

### SFBool [out] **isLoaded**

Notify when all watchList child nodes are loaded, or at least one has failed. Sends true on successfully loading all watchList child nodes. Sends false on timeOut of any watchList child nodes, failure of any watchList child nodes to load, or no local copies available and no network present.

#### Hint

- Use multiple LoadSensor nodes to track multiple loading nodes individually.

### SFFloat [out] **progress**

Sends 0.0 on start and 1.0 on completion. Intermediate values are browser dependent and always increasing (may indicate fraction of bytes, fraction of expected time or another metric).

#### Hint

- Only 0 and 1 events are guaranteed.

### SFTime [out] **loadTime**

Time of successful load complete, not sent on failure.

### MFNode [in, out] **watchList** [ ] <small>[X3DUrlObject]</small>

Input/Output field watchList.

## Description

### Hints

- Use multiple LoadSensor nodes to track multiple loading nodes individually.
- Background is not sensed due to multiple-image ambiguity.
- Use Inline 'load' field to prompt or defer loading.

### Warnings

- WatchList child nodes are not rendered, so normally USE copies of other nodes to sense load status.
- New X3D node, not supported in VRML97.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Networking/LoadSensor/LoadSensor.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of LoadSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#LoadSensor){:target="_blank"}
