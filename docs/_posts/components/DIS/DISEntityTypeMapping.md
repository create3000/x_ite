---
title: DISEntityTypeMapping
date: 2022-01-07
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

The DISEntityTypeMapping node belongs to the **DIS** component and its container field is *mapping.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ DISEntityTypeMapping
```

## Fields

### SFNode [in, out] **metadata** NULL

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **url** [ ]

Name of the X3D model of interest, for example "MyFastBoat.x3d".

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFInt32 [ ] **category**

Enumerations value for main category that describes the entity, semantics of each code varies according to domain. See DIS Enumerations values.

### SFInt32 [ ] **country**

Enumerations value for country to which the design of the entity or its design specification is attributed.

### SFInt32 [ ] **domain**

Enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.

### SFInt32 [ ] **extra**

Any extra information required to describe a particular entity. The contents of this field shall depend on the type of entity represented.

### SFInt32 [ ] **kind**

Enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.

### SFInt32 [ ] **specific**

Specific information about an entity based on the Subcategory field. See DIS Enumerations values.

### SFInt32 [ ] **subcategory**

Field subcategory.

## Description

### Hints

- Values set to zero are wildcards, matching any received value.
- DISEntityTypeMapping is contained by a DISEntityManager node.
- DisEntityManager ESPDU packets use the IEEE Distributed Interactive Simulation (DIS) protocol.
- Include `<component name='DIS' level='2'/>`

## External Links

- [X3D Specification of DISEntityTypeMapping](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/dis.html#DISEntityTypeMapping){:target="_blank"}
- [Savage Developers Guide on DIS](https://savage.nps.edu/Savage/developers.html#DIS){:target="_blank"}
