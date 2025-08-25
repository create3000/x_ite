---
title: Providing Information About Your World
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [Providing, Information, World]
---
## Motivation

- After you've created a great world, sign it!
- You can provide a title and a description embedded within the file

## Syntax: WorldInfo

A [WorldInfo](/x_ite/components/core/worldinfo/) node provides title and description information for your world:

- *title* - the name for your world
- *info* - any additional information

### XML Encoding

```x3d
<WorldInfo
    title='Our Masterpiece'
    info='"License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html"'/>
```

### Classic VRML Encoding

```vrml
WorldInfo {
  title "Our Masterpiece"
  info  [ "License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html" ]
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/world-info/world-info.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/world-info/screenshot.avif" alt="WorldInfo"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/world-info/world-info.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/world-info/world-info.x3dv)
{: .example-links }
