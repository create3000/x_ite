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

```xml
<WorldInfo
    title='Our Masterpiece'
    info='"License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html"'/>
```

### Classic Encoding

```vrml
WorldInfo {
  title "Our Masterpiece"
  info  [ "License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html" ]
}
```
