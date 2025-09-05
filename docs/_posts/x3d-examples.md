---
title: X3D Examples
date: 2025-08-13
nav: main
categories: []
tags: [X3D, Examples]
---

This collection of X3D examples showcases how powerful and flexible the standard can be for creating interactive 3D content on the web. You’ll find demonstrations of core features, including geometry, lighting, animation, prototyping, and scripting, each designed to highlight practical techniques. Whether you’re exploring X3D for learning, prototyping new ideas, or building full applications, these examples provide a solid starting point and inspiration.

## Prototyping

[![Keyboard](https://create3000.github.io/media/x_ite/examples/kbrd/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/kbrd/kbrd.x3d){: .left .w-25 }

**Generating a Keyboard with JavaScript and Prototypes**

In X3D, a virtual keyboard can be dynamically created by defining reusable key shapes as `ProtoDeclare` and instancing them with `ProtoInstance`. JavaScript scripts within the X3D scene can generate and arrange these prototypes programmatically, enabling interactive keyboard layouts.

[![Connectors](https://create3000.github.io/media/x_ite/examples/connectors/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/connectors/connectors.x3d){: .left .w-25 }

**Connect Draggable Nodes with Visual Routes**

In X3D, draggable nodes can be made interactive by using [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) to capture user movements. By connecting these sensors to other nodes with `ROUTE` statements, you can dynamically update positions, orientations, or other properties in real time.

[![Particle Simulation](https://create3000.github.io/media/x_ite/examples/particle-simulation/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/particle-simulation/particle-simulation.x3d){: .left .w-25 }

**Particle Simulation**

In X3D, particle simulations can be built using `ProtoDeclare` to define customizable particle simulations and appearance settings. JavaScript or ECMAScript scripts can control particle behavior over time, enabling dynamic effects like translation, and rotation.

---

## Navigation

[![Keyboard Navigation](https://create3000.github.io/media/x_ite/examples/keyboard-navigation/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/keyboard-navigation/keyboard-navigation.x3d){: .left .w-25 }

**Keyboard Navigation**

In X3D, keyboard navigation can be implemented by using [KeySensor](/x_ite/components/keydevicesensor/keysensor/) nodes to capture user input and control viewpoint movement or scene interactions. This allows users to explore the 3D environment intuitively, similar to navigating in a game or virtual tour.

---

## Effects

[![Clipped Background](https://create3000.github.io/media/x_ite/examples/clipped-background/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/clipped-background/clipped-background.x3d){: .left .w-25 }

**Clipped Background for Day and Night**

In X3D, you can create a clipped background by combining a [Background](/x_ite/components/environmentaleffects/background/) node with geometry and [ClipPlane](/x_ite/components/rendering/clipplane/) nodes to reveal only part of the sky or environment. Switching between different backgrounds for day and night scenes allows you to simulate time-of-day transitions and enhance visual realism.

[![Scrolling Text](https://create3000.github.io/media/x_ite/examples/scrolling-text/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/scrolling-text/scrolling-text.x3d){: .left .w-25 }

**Scrolling Text**

In X3D, scrolling text effects can be achieved by animating the position of text geometry while a [ClipPlane](/x_ite/components/rendering/clipplane/) hides the overflow outside a defined area. Combining [TimeSensor](/x_ite/components/time/timesensor/), [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/), and routing creates smooth, continuous text movement for banners, tickers, or credits.

---

## Shaders

[![Waves](https://create3000.github.io/media/x_ite/examples/waves/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/waves/waves.x3d){: .left .w-25 }

**Waves**

This X3D file simulates ripple waves formed by a falling droplet using sinusoidal displacement, with [InstancedShape](/x_ite/components/x-ite/instancedshape/) employed for efficient geometry reuse and [ComposedShader](/x_ite/components/shaders/composedshader/) for custom shading control. The shader applies a refined color scheme to enhance depth and motion, demonstrating how X3D can realistically and efficiently model natural wave phenomena.

---

## Textures

[![Animated PNG](https://create3000.github.io/media/x_ite/examples/animated-png/screenshot.png)](/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/animated-png/animated-png.x3d){: .left .w-25 }

**Animated PNG**

In X3D, an animated PNG can be displayed using [MovieTexture](/x_ite/components/texturing/movietexture/), allowing frame-by-frame playback directly on 3D geometry. Custom controls implemented with sensors and scripts can start, pause, or resume the animation, giving users interactive control over the playback.
