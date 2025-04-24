---
title: DISEntityTypeMapping
date: 2023-01-07
nav: components-DIS
categories: [components, DIS]
tags: [DISEntityTypeMapping, DIS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

DISEntityTypeMapping provides a best-match mapping from DIS ESPDU entity type information to a specific X3D model, thus providing a visual and behavioral representation that best matches the entity type. Fields are processed in order: kind, domain, country, category, subcategory, specific, extra.

The DISEntityTypeMapping node belongs to the **DIS** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ DISEntityTypeMapping
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
| SFInt32 | [ ] | [category](#fields-category) | 0  |
| SFInt32 | [ ] | [country](#fields-country) | 0  |
| SFInt32 | [ ] | [domain](#fields-domain) | 0  |
| SFInt32 | [ ] | [extra](#fields-extra) | 0  |
| SFInt32 | [ ] | [kind](#fields-kind) | 0  |
| SFInt32 | [ ] | [specific](#fields-specific) | 0  |
| SFInt32 | [ ] | [subcategory](#fields-subcategory) | 0  |
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

### SFBool [in, out] **load** TRUE
{: #fields-load }

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>
{: #fields-url }

Local and/or online addresses of X3D model of interest, for example: "ExtrusionExampleShip.x3d" "https://www.web3d.org/x3d/content/examples/Basic/course/ExtrusionExampleShip.x3d"

#### Hints

- [See](https://www.web3d.org/x3d/content/examples/Basic/course/ExtrusionExampleShipIndex.html)
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>
{: #fields-autoRefresh }

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>
{: #fields-autoRefreshTimeLimit }

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFInt32 [ ] **category** 0 <small>[0,255]</small>
{: #fields-category }

Integer enumerations value for main *category* that describes the entity, semantics of each code varies according to domain. See DIS Enumerations values.

### SFInt32 [ ] **country** 0 <small>[0,0,65535]</small>
{: #fields-country }

Integer enumerations value for *country* to which the design of the entity or its design specification is attributed.

### SFInt32 [ ] **domain** 0 <small>[0,255]</small>
{: #fields-domain }

Integer enumerations value for *domain* in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [ ] **extra** 0 <small>[0,255]</small>
{: #fields-extra }

Any *extra* information required to describe a particular entity. The contents of this field shall depend on the type of entity represented.

### SFInt32 [ ] **kind** 0 <small>[0,255]</small>
{: #fields-kind }

Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [ ] **specific** 0 <small>[0,255]</small>
{: #fields-specific }

Specific information about an entity based on the subcategory field. See DIS Enumerations values.

### SFInt32 [ ] **subcategory** 0 <small>[0,255]</small>
{: #fields-subcategory }

Integer enumerations value for particular *subcategory* to which an entity belongs based on the category field. See DIS Enumerations values.

## Advice

### Hints

- Values set to zero are wildcards, matching any received value.
- DISEntityTypeMapping is contained by a parent [DISEntityManager](/x_ite/components/dis/disentitymanager/) node.
- DisEntityManager ESPDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/DistributedInteractiveSimulation.pdf)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='DIS' level='2'/>`

## See Also

- [X3D Specification of DISEntityTypeMapping Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#DISEntityTypeMapping)
