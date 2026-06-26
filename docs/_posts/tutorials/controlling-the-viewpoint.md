---
title: Controlling the Viewpoint
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Viewpoint]
---
## Motivation

- By default, the viewer enters a world at (0, 0, 10)
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

```x3d
<Viewpoint
    position='0 0 10'
    orientation='0 0 1 0'
    fieldOfView='0.785'
    description='Entry View'/>
```

### Classic VRML Encoding

```vrml
Viewpoint {
  position 0 0 10
  orientation 0 0 1 0
  fieldOfView 0.785
  description "Entry View"
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/viewpoint1/viewpoint1.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/viewpoint1/screenshot.avif" alt="Viewpoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/viewpoint1/viewpoint1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/viewpoint1/viewpoint1.x3dv)
{: .example-links }

## The jump Field

Basically, if the *jump* field is `false` and the viewpoint receives a *set_bind* `true` event, the viewpoint is bound, but the position and orientation are the same as the previous bound viewpoint including user navigation offsets. This is useful if you want to program an elevator or train for instance. Imagine a user bound to viewpoint A walks into an elevator, when he enters the elevator, he is bound to a new viewpoint B inside the elevator coordinate system, you can now animate the elevator and the user moves with the elevator. When the elevator stops and the user walks out of the elevator, he is bound again to viewpoint A which is in a floor coordinate system. If both viewpoints A and B have *jump* set to `false`, you will not recognize any viewpoint change.

If *jump* is `true` and the viewpoint receives a *set_bind* `true` event, you will be bound to the viewpoint and the new *position* and *orientation* will come into effect. If you don’t like the transition, set the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) *transitionType* to `TELEPORT`. This will immediately apply the new *position* and *orientation*.

## Summary

- Specify favorite viewpoints in [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes
- The first viewpoint in the file is the entry viewpoint
