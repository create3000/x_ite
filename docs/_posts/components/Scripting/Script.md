---
title: Script
date: 2022-01-07
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

Script provides programmed behavior for a scene. Define the script interface with `<field>` elements. Scripting code is embedded in a child CDATA node or (deprecated) in the url field. Optionally supported programming languages: ECMAScript (JavaScript) and (via url to a myNode.class file) Java.

The Script node belongs to the **Scripting** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DScriptNode (X3DURLObject)*
      + Script
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Points to a script file url. Also (as deprecated alternative to CDATA block) can contain ecmascript: source as a quoted SFString within the url array.

#### Hint

If Script contains both external url reference and internal CDATA source then external url takes precedence, but will fall back to contained CDATA source if no external script is found.

#### Warnings

Do not use the ecmascript: protocol prefix within external script files. Replace javascript: or vrmlscript: protocol prefix with ecmascript: for source code embedded within an X3D scene.

#### See Also

- [ECMAScript is the ISO standard version of JavaScript.](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#JavaScript){:target="_blank"}
- [VrmlScript was a subset of JavaScript originally proposed for use with VRML 97.](https://www.bitmanagement.com/developer/spec/vrmlscript/vrmlscript.html){:target="_blank"}
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFBool [ ] **directOutput** FALSE

Set directOutput true if Script has field reference(s) of type SFNode/MFNode, and also uses direct access to modify attributes of a referenced node in the Scene.

#### Hints

Set directOutput true if Script dynamically establishes or breaks ROUTEs. DirectOutput is a browser hint to avoid overoptimizing referenced nodes, since the Script may change their attribute values without ROUTEd events. DirectOutput false means Script cannot modify referenced nodes or change ROUTEs.

### SFBool [ ] **mustEvaluate** FALSE

If mustEvaluate false, then browser may delay sending input events to Script until outputs are needed. If mustEvaluate true, then Script must receive input events immediately without browser delays.

#### Hint

Set mustEvaluate true when sending/receiving values via the network.

## Description

### Hints

- Insert a CDATA node to contain source code embedded within an X3D scene.
- CDATA blocks can protect literal characters (such as &amp; < and >) in source code from unintended escape-character modifications by XML parsers.

## External Links

- [X3D Specification of Script](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/scripting.html#Script){:target="_blank"}
- [X3D Scene Authoring Hints, Scripts](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Scripts){:target="_blank"}
