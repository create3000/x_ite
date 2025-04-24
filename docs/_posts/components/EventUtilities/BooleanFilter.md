---
title: BooleanFilter
date: 2023-01-07
nav: components-EventUtilities
categories: [components, EventUtilities]
tags: [BooleanFilter, EventUtilities]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BooleanFilter selectively passes true, false or negated events.

The BooleanFilter node belongs to the **EventUtilities** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + BooleanFilter
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in] | [set_boolean](#field-set_boolean) |  |
| SFBool | [out] | [inputTrue](#field-inputTrue) |  |
| SFBool | [out] | [inputFalse](#field-inputFalse) |  |
| SFBool | [out] | [inputNegate](#field-inputNegate) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_boolean**
{: #field-set_boolean }

*set_boolean* is the input value to be filtered.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFBool [out] **inputTrue**
{: #field-inputTrue }

*inputTrue* only passes a true value, which occurs when set_boolean input is true.

#### Hint

- *inputTrue* is an output event that can only provide a value of true.

### SFBool [out] **inputFalse**
{: #field-inputFalse }

*inputFalse* only passes a false value, which occurs when set_boolean is false.

#### Hint

- *inputFalse* is an output event that can only provide a value of false.

### SFBool [out] **inputNegate**
{: #field-inputNegate }

*inputNegate* is an output event that provides an opposite value by negating set_boolean input.

## Advice

### Hints

- [Example scenes and authoring assets](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting)
- [X3D Event-Utility Node Diagrams](https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/Chapter09-EventUtilitiesScripting/X3dEventUtilityNodeEventDiagrams.pdf)

## See Also

- [X3D Specification of BooleanFilter Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/eventUtilities.html#BooleanFilter)
