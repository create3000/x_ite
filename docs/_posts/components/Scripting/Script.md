---
title: Script
date: 2023-01-07
nav: components-Scripting
categories: [components, Scripting]
tags: [Script, Scripting]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Script contains author-programmed event behaviors for a scene. Define the script input-output event interface by including \<field/\> elements. Scripting code is embedded in a child CDATA node or (deprecated) in the url field. Optionally supported programming languages are ECMAScript (JavaScript) and Java (via url to a myNode.class file).

The Script node belongs to the **Scripting** component and requires at least support level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DScriptNode (X3DURLObject)*
      + Script
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [load](#fields-load) | TRUE |
| MFString | [in, out] | [url](#fields-url) | [ ] |
| SFTime | [in, out] | [autoRefresh](#fields-autoRefresh) | 0  |
| SFTime | [in, out] | [autoRefreshTimeLimit](#fields-autoRefreshTimeLimit) | 3600  |
| SFBool | [ ] | [directOutput](#fields-directOutput) | FALSE |
| SFBool | [ ] | [mustEvaluate](#fields-mustEvaluate) | FALSE |
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

List of address links for runnable script files.

#### Hints

- Embedded ecmascript: source can also be contained in the sourceCode pseudo-field without escape characters, equivalent to last entry in the *url* list, when using other API codebases and file encodings.
- Browsers are not required to support any particular scripting language, but ECMAScript (JavaScript) is widely supported.
- Equivalent script code written in multiple programming languages can be provided for portability, the first runnable version is chosen at run time.
- [X3D Scene Authoring Hints, Scripts](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Scripts)
- If both *url* field and CDATA section are provided simultaneously, the *url* field is processed first. This approach allows utilization of update modifications or live queries in external scripts, while still providing reliable script source as a fallback alternative within the model itself.
- [X3D XML Encoding, 4.3.13 Encapsulating Script node code](https://www.web3d.org/documents/specifications/19776-1/V3.3/Part01/concepts.html#EncapsulatingScriptNodeCode)
- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warnings

- Source code can be placed in *url* attribute but may be unparsable due to escaping of special characters and elimination of line breaks (causing comments to nullify follow-on code). Use contained CDATA section instead for embedding source code.
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

### SFBool [ ] **directOutput** FALSE
{: #fields-directOutput }

Set *directOutput* true if Script has field reference(s) of type SFNode/MFNode, and also uses direct access to modify attributes of a referenced node in the Scene.

#### Hints

- Set *directOutput* true if Script dynamically establishes or breaks ROUTEs.
- *directOutput* is a browser hint to avoid overoptimizing referenced nodes, since a Script might directly change attribute values in referenced SFNode/MFNode fields, without a ROUTE connecting output events.
- *directOutput* false means Script cannot modify referenced nodes or change ROUTEs.

### SFBool [ ] **mustEvaluate** FALSE
{: #fields-mustEvaluate }

If *mustEvaluate* false, then the X3D player may delay sending input events to Script until output events are needed. If *mustEvaluate* true, then Script must receive input events immediately without any event-aggregation delays.

#### Hint

- Set *mustEvaluate* true when sending/receiving values via the network.

## Advice

### Hints

- Insert an XML Character Data (CDATA) block within the Script node to contain source code embedded within an X3D scene, avoiding the need for escape characters.
- A contained XML Character Data (CDATA) block for source code protects whitespace, line breaks, and literal characters (such as &amp; for ampersand character, \< for less-than-sign character, and \> for greater-than-sign character) from unintended escape-character modifications by XML parsers.
- [X3D Scene Authoring Hints, Scripts](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Scripts)
- [Apply `containerField='watchList'` when parent node is LoadSensor.ECMAScript-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm)
- Embedded ecmascript: source can also be contained in the sourceCode pseudo-field without escape characters, equivalent to last entry in the url list, when using other API codebases and file encodings.

### Warning

- Strict order is required for contained constructs: first field declarations (if any), then IS/connect statements (if any), and finally CDATA source-code block.

## See Also

- [X3D Specification of Script Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/scripting.html#Script)
- [Script Node Authoring Interface](/x_ite/reference/script-node-authoring-interface/)
