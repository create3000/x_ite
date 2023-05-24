---
title: KeySensor
date: 2022-01-07
nav: components-KeyDeviceSensor
categories: [components, KeyDeviceSensor]
tags: [KeySensor, KeyDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

KeySensor generates events as the user presses keys on the keyboard. Supports notion of "keyboard focus".

The KeySensor node belongs to the **KeyDeviceSensor** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DKeyDeviceSensorNode
        + KeySensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [out] **controlKey**

*controlKey* generates true event when pressed, false event when released.

### SFBool [out] **shiftKey**

*shiftKey* generates true event when pressed, false event when released.

### SFBool [out] **altKey**

*altKey* generates true event when pressed, false event when released.

### SFInt32 [out] **actionKeyPress**

Action key press gives following values: F1..F12 = 1...12 HOME=13 END=14 PGUP=15 PGDN=16 UP=17 DOWN=18 LEFT=19 RIGHT=20.

### SFInt32 [out] **actionKeyRelease**

Action key release gives following values: F1..F12 = 1...12 HOME=13 END=14 PGUP=15 PGDN=16 UP=17 DOWN=18 LEFT=19 RIGHT=20.

### SFString [out] **keyPress**

Events generated when user presses character-producing keys on keyboard produces integer UTF-8 character values.

### SFString [out] **keyRelease**

Events generated when user releases character-producing keys on keyboard produces integer UTF-8 character values.

### SFBool [out] **isActive**

When a key is pressed, the KeySensor sends an isActive event with value true. Once the key is released, the KeySensor sends an isActive event with value false.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/KeyDeviceSensor/KeySensor/KeySensor.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of KeySensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/keyboard.html#KeySensor){:target="_blank"}
