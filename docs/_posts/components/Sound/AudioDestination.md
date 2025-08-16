---
title: AudioDestination
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [AudioDestination, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

AudioDestination node represents the final audio destination and is what user ultimately hears, typically from the speakers of user device. An AudioDestinationNode representing the audio hardware end-point (the normal case) can potentially output more than 2 channels of audio if the audio hardware is multi-channel.

The AudioDestination node belongs to the [Sound](/x_ite/components/overview/#sound) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + X3DSoundDestinationNode
        + AudioDestination
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFFloat | [in, out] | [gain](#fields-gain) | 1  |
| SFString | [in, out] | [mediaDeviceID](#fields-mediaDeviceID) |  |
| SFInt32 | [in, out] | [channelCount](#fields-channelCount) |  |
| SFString | [in, out] | [channelCountMode](#fields-channelCountMode) | "MAX"  |
| SFString | [in, out] | [channelInterpretation](#fields-channelInterpretation) | "SPEAKERS"  |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFInt32 | [out] | [maxChannelCount](#fields-maxChannelCount) | 2  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #fields-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFString [in, out] **mediaDeviceID**
{: #fields-mediaDeviceID }

*mediaDeviceID* field provides ID parameter functionality. (TODO experimental)

### SFInt32 [in, out] **channelCount**
{: #fields-channelCount }

*channelCount* reports number of channels provided by input nodes.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>
{: #fields-channelCountMode }

*channelCountMode* determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcountmode)

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>
{: #fields-channelInterpretation }

*channelInterpretation* determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelinterpretation)

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when playback starts/stops.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFInt32 [out] **maxChannelCount** 2 <small>[0,∞)</small>
{: #fields-maxChannelCount }

[*maxChannelCount*.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>
{: #fields-children }

The *children* field specifies audio-graph sound sources providing input signals for this node. If multiple input signals are provided by the inputs *children* field, all channels are mixed together and merged prior to presentation.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

#### Warning

- Contained [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#AudioDestinationNode)

## See Also

- [X3D Specification of AudioDestination Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#AudioDestination)
