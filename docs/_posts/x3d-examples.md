---
title: X3D Examples
date: 2025-08-13
nav: main
categories: []
tags: [X3D, Examples]
---

This collection of X3D examples showcases how powerful and flexible the standard can be for creating interactive 3D content on the web. You’ll find demonstrations of core features, including geometry, lighting, animation, prototyping, and scripting, each designed to highlight practical techniques. Whether you’re exploring X3D for learning, prototyping new ideas, or building full applications, these examples provide a solid starting point and inspiration.

## Prototyping

[![Keyboard](https://create3000.github.io/media/x_ite/examples/kbrd/screenshot.png)](https://create3000.github.io/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/kbrd/kbrd.x3d){: .left .w-25 }

**Generating a Keyboard with JavaScript and Prototypes**

In X3D, a virtual keyboard can be dynamically created by defining reusable key shapes as `ProtoDeclare` and instancing them with `ProtoInstance`. JavaScript scripts within the X3D scene can generate and arrange these prototypes programmatically, enabling interactive keyboard layouts.

[![Connectors](https://create3000.github.io/media/x_ite/examples/connectors/screenshot.png)](https://create3000.github.io/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/connectors/connectors.x3d){: .left .w-25 }

**Connecting Draggable Nodes with Routes**

In X3D, draggable nodes can be made interactive by using [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) to capture user movements. By connecting these sensors to other nodes with `ROUTE` statements, you can dynamically update positions, orientations, or other properties in real time.

[![Particle Simulation](https://create3000.github.io/media/x_ite/examples/particle-simulation/screenshot.png)](https://create3000.github.io/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/particle-simulation/particle-simulation.x3d){: .left .w-25 }

**Particle Simulation**

In X3D, particle simulations can be built using `ProtoDeclare` to define customizable particle simulations and appearance settings. JavaScript or ECMAScript scripts can control particle behavior over time, enabling dynamic effects like translation, and rotation.

---

## Effects

[![Clipped Background](https://create3000.github.io/media/x_ite/examples/clipped-background/screenshot.png)](https://create3000.github.io/x_ite/playground/?url=https://create3000.github.io/media/x_ite/examples/clipped-background/clipped-background.x3d){: .left .w-25 }

**Clipped Background for Day and Night**

In X3D, you can create a clipped background by combining a [Background](/x_ite/components/environmentaleffects/background/) node with geometry and [ClipPlane](/x_ite/components/rendering/clipplane/) nodes to reveal only part of the sky or environment. Switching between different backgrounds for day and night scenes allows you to simulate time-of-day transitions and enhance visual realism.
