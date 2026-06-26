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

## Creating Viewpoints

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

## The Jump Field

Basically, if the *jump* field is set to false and the viewpoint receives a *set_bind* event with a value of `true`, the viewpoint is bound. However, the *position* and *orientation* remain the same as the previous bound viewpoint, including any user navigation offsets. This is useful if you want to programme an elevator or train, for example. Imagine a user bound to Viewpoint A enters an elevator. When they enter, they are bound to a new Viewpoint B inside the elevator coordinate system. You can now animate the elevator and the user will move with it. When the lift stops and the user exits, they are bound again to Viewpoint A, which is in the floor coordinate system. If both viewpoints A and B have *jump* set to `false`, you will not recognize any viewpoint change.

If *jump* is set to `true` and the viewpoint receives a *set_bind* event, you will be bound to the viewpoint and the new *position* and *orientation* will take effect. If you are not happy with the transition, set the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) *transitionType* to `TELEPORT`. This will immediately apply the new *position* and *orientation*.

## Summary

- Specify favorite viewpoints in [Viewpoint](/x_ite/components/navigation/viewpoint/) nodes
- The first viewpoint in the file is the entry viewpoint
