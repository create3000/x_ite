---
title: LineProperties
date: 2022-01-07
nav: components-Shape
categories: [components, Shape]
tags: [LineProperties, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LineProperties allows fine control over rendering of lines and edges for associated geometry nodes inside the same Shape.

The LineProperties node belongs to the **Shape** component and its container field is *lineProperties.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + LineProperties
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **applied** TRUE

Whether or not LineProperties are applied to associated geometry.

### SFInt32 [in, out] **linetype** 1 <small>[1,∞)</small>

Linetype selects a line pattern, with solid default if defined value isn't supported. Values with guaranteed support are 1 Solid, 2 Dashed, 3 Dotted, 4 Dashed-dotted, 5 Dash-dot-dot. Optionally supported values are 6 single-headed arrow (arrow tip occurs at last point of each individual list of points), 7 single dot, 8 double-headed arrow, 10 chain line, 11 center line, 12 hidden line, 13 phantom line, 14 break line 1, 15 break line 2, 16 User-specified dash pattern.

#### Hint

Detailed descriptions of lineType values are found at the [ISO/IEC International Register of Graphical Items](https://www.iso.org/jtc1/sc24/register){:target="_blank"} (may require login)

### SFFloat [in, out] **linewidthScaleFactor** <small>(-∞,∞)</small>

LinewidthScaleFactor is a scale factor multiplied by browser-dependent nominal linewidth, mapped to nearest available line width. Values zero or less provide minimum available line width.

## Description

### Hints

- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- Include `<component name='Shape' level='2'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shape/LineProperties/LineProperties.x3d"></x3d-canvas>

## External Links

- [X3D Specification of LineProperties](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#LineProperties){:target="_blank"}
