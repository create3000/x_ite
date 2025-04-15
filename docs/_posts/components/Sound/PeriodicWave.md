---
title: PeriodicWave
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [PeriodicWave, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

PeriodicWave defines a periodic waveform that can be used to shape the output of an Oscillator.#10;

The PeriodicWave node belongs to the **Sound** component and requires at least support level **2,** its default container field is *periodicWave.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + PeriodicWave
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [in, out] **type** "SQUARE" <small>["SINE", "SQUARE", "SAWTOOTH", "TRIANGLE", "CUSTOM"]</small>

The *type* field specifies shape of waveform to play, which can be one of several provided values or else 'custom' to indicate that real and imaginary coefficient arrays define a custom waveform.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dictdef-periodicwaveoptions)

### MFFloat [in, out] **optionsReal** [ ] <small>(-∞,∞)</small>

Real coefficients for defining a waveform.

#### Warning

- Array lengths for *optionsReal* and optionsImag must match.

### MFFloat [in, out] **optionsImag** [ ] <small>(-∞,∞)</small>

Imaginary coefficients for defining a waveform.

#### Warning

- Array lengths for optionsReal and *optionsImag* must match.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#periodicwave)

## See Also

- [X3D Specification of PeriodicWave Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#PeriodicWave)
