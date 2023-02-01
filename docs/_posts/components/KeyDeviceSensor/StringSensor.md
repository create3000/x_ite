---
title: StringSensor
date: 2022-01-07
nav: components-KeyDeviceSensor
categories: [components, KeyDeviceSensor]
tags: [StringSensor, KeyDeviceSensor]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

StringSensor generates events as the user presses keys on the keyboard.

The StringSensor node belongs to the **KeyDeviceSensor** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSensorNode
      + X3DKeyDeviceSensorNode
        + StringSensor
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **deletionAllowed** TRUE

If deletionAllowed is true, then previously entered character in enteredText can be removed. If deletionAllowed is false, then characters may only be added to the string.

#### Hint

- Deletion key is typically defined by local system.

### SFString [out] **enteredText**

Events generated as character-producing keys are pressed on keyboard.

### SFString [out] **finalText**

Events generated when sequence of keystrokes matches keys in terminationText string when this condition occurs, enteredText is moved to finalText and enteredText is set to empty string.

#### Hint

- Termination key is typically defined by local system.

### SFBool [out] **isActive**

When the user begins typing, the StringSensor sends an isActive event with value true. When the string is terminated, the StringSensor sends an isActive event with value false.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/KeyDeviceSensor/StringSensor/StringSensor.x3d"></x3d-canvas>

## External Links

- [X3D Specification of StringSensor](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/keyboard.html#StringSensor){:target="_blank"}
