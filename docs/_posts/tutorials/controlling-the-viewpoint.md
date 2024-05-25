---
title: Controlling the Viewpoint
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Controlling, Viewpoint]
---
## Motivation

- By default, the viewer enters a world at (0.0, 0.0, 10.0)
- You can provide your own preferred view points
  - Select the entry point position
  - Select favorite views for the viewer
  - Name the views for a browser menu

## Creating viewpoints

- Viewpoints specify a desired location, an orientation, and a camera field of view lens angle
- Viewpoints can be transformed using a Transform node
- The first viewpoint found in a file is the entry point

## Syntax: Viewpoint

A [Viewpoint](/x_ite/components/navigation/viewpoint/) node specifies a named viewing location:

- *position* and *orientation* - viewing location
- *fieldOfView* - camera lens angle
- *description* - description for viewpoint menu

### XML Encoding

```xml
<Viewpoint
    position='0.0 0.0 10.0'
    orientation='0.0 0.0 1.0 0.0'
    fieldOfView='0.785'
    description='Entry View'/>
```

### Classic Encoding

```vrml
Viewpoint {
  position  0.0 0.0 10.0
  orientation 0.0 0.0 1.0 0.0
  fieldOfView 0.785
  description "Entry View"
}
```

## Summary

- Specify favorite viewpoints in [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes
- The first viewpoint in the file is the entry viewpoint
