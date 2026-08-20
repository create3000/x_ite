---
title: Providing Information About Your World
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [WorldInfo]
---
## Motivation

- After you've created a great world, sign it!
- You can provide a title and a description embedded within the file

## Syntax: Metadata

A scene can also contain metadata information, which is a collection of key-value pairs. This information can be used to provide additional context about the scene, such as the author, version, or any other relevant details.

### XML Encoding

```x3d
<X3D ...>
  <head>
    <meta name='title' content='Our Masterpiece'/>
    <meta name='created' content='Thu, 15 Jun 2017 07:19:14 GMT'/>
    <meta name='creator' content='John Doe'/>
    <meta name='generator' content='Sunrize X3D Editor V1.7.1, https://create3000.github.io/sunrize/'/>
    <meta name='modified' content='Sat, 29 Jun 2024 11:35:21 GMT'/>
  </head>
</X3D>
```

### Classic VRML Encoding

```vrml
META "title" "Our Masterpiece"
META "created" "Thu, 15 Jun 2017 07:19:14 GMT"
META "creator" "John Doe"
META "generator" "Sunrize X3D Editor V1.7.1, https://create3000.github.io/sunrize/"
META "modified" "Sat, 29 Jun 2024 11:35:21 GMT"
```

## Syntax: WorldInfo

A [WorldInfo](/x_ite/components/core/worldinfo/) node provides title and description information for your world:

- *title* - the name for your world
- *info* - any additional information

### XML Encoding

```x3d
<WorldInfo
    title='Our Masterpiece'
    info='"License GPLv3, https://www.gnu.org/licenses/gpl-3.en.html"'/>
```

### Classic VRML Encoding

```vrml
WorldInfo {
  title "Our Masterpiece"
  info [ "License GPLv3, https://www.gnu.org/licenses/gpl-3.en.html" ]
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/world-info/world-info.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/world-info/screenshot.avif" alt="WorldInfo"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/world-info/world-info.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/world-info/world-info.x3dv)
{: .example-links }
