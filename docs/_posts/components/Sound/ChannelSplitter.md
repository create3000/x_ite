---
title: ChannelSplitter
date: 2023-01-31
nav: components-Sound
categories: [components, Sound]
tags: [ChannelSplitter, Sound]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

ChannelSplitter separates the different channels of a single audio source into a set of monophonic output channels.

The ChannelSplitter node belongs to the **Sound** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DSoundNode
      + X3DSoundChannelNode
        + ChannelSplitter
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFString | [in, out] | [description](#field-description) | "" |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFFloat | [in, out] | [gain](#field-gain) | 1  |
| SFInt32 | [in, out] | [channelCount](#field-channelCount) |  |
| SFString | [in, out] | [channelCountMode](#field-channelCountMode) | "MAX"  |
| SFString | [in, out] | [channelInterpretation](#field-channelInterpretation) | "SPEAKERS"  |
| MFNode | [in, out] | [children](#field-children) | [ ] |
| MFNode | [in, out] | [outputs](#field-outputs) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #field-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables node operation.

### SFFloat [in, out] **gain** 1 <small>(-∞,∞)</small>
{: #field-gain }

The *gain* field is a factor that represents the amount of linear amplification to apply to the output of the node.

#### Hint

- Negative *gain* factors negate the input signal.

#### Warning

- Decibel values shall not be used.

### SFInt32 [in, out] **channelCount**
{: #field-channelCount }

*channelCount* reports number of channels provided by input nodes.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcount)

### SFString [in, out] **channelCountMode** "MAX" <small>["MAX", "CLAMPED-MAX", "EXPLICIT"]</small>
{: #field-channelCountMode }

*channelCountMode* determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelcountmode)

### SFString [in, out] **channelInterpretation** "SPEAKERS" <small>["SPEAKERS", "DISCRETE"]</small>
{: #field-channelInterpretation }

*channelInterpretation* determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.

#### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#dom-audionode-channelinterpretation)

### MFNode [in, out] **children** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>
{: #field-children }

The *children* field specifies audio-graph sound sources providing input signals for this node, making up a section of the audio graph. If multiple input signals are provided by the inputs *children* field, all channels are mixed together and merged prior to presentation.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

#### Warning

- Contained [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) nodes must have `containerField='children'` to override otherwise-incorrect defaults.

### MFNode [in, out] **outputs** [ ] <small>[X3DSoundChannelNode,X3DSoundProcessingNode,X3DSoundSourceNode]</small>
{: #field-outputs }

The *outputs* field is a set of output nodes receiving the split channels, and making up a section of the audio graph.

#### Hint

- Can be original (DEF) or referenced (USE) nodes.

## Advice

### Hint

- [W3C Web Audio API](https://www.w3.org/TR/webaudio/#channelsplitternode)

## See Also

- [X3D Specification of ChannelSplitter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/sound.html#ChannelSplitter)
