---
title: How to Navigate in a Scene
date: 2023-09-05
nav: tutorials-basic
categories: [Tutorials]
tags: [Navigate, Scene]
---
There are various types of viewers available to navigate in an X3D scene to move around quickly and efficiently in a scene. These can be set in the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node *type* field.

Each of them allow you to navigate in a scene in a different manner:

![examine](https://create3000.github.io/media/tutorials/images/examine.png){: .normal }
Examine Viewer

![walk](https://create3000.github.io/media/tutorials/images/walk.png){: .normal }
Walk Viewer

![fly](https://create3000.github.io/media/tutorials/images/fly.png){: .normal }
Fly Viewer

![plane](https://create3000.github.io/media/tutorials/images/plane.png){: .normal }
Plane Viewer

![lookat](https://create3000.github.io/media/tutorials/images/lookat.png){: .normal }
Look At Viewer

![none](https://create3000.github.io/media/tutorials/images/none.png){: .normal }
None Viewer

You can choose a viewer from the available viewers in the viewer menu of the context menu. Not all viewers have to be available at the same time. **Note:** This is controlled by the X3D author by setting the *type* field of a [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node.

>**Tip:** Holding the *Shift+CmdOrCtrl*-key overrides any [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) that the pointer may be over and forces the pointing device to function as the viewpoint navigation tool; i.e., drag operations cause rotation, click operations cause center of rotation point selection.
{: .prompt-tip }

## Examine Viewer

The Examine Viewer uses a virtual sphere metaphor — the scene is contained inside a sphere that the camera moves around:

![virtual sphere](https://create3000.github.io/media/tutorials/images/virtual-sphere.png){: .normal .w-50 }

As a result, it seems like the Examine Viewer treats all the objects in your scene as a single, grouped object.

>**Tricks:**
- You can spin the camera around an object when in examine mode by dragging and letting go. Click in the scene to stop the spin.
- Double click an object to move quickly toward it. Double click again to seek toward a different object or point.
{: .prompt-tip }

### Viewer Controls

- **Rotate:** Drag while holding down the left mouse button to rotate the scene.
- **Pan:** Drag while holding down the middle mouse button (or scroll wheel) to move the scene. Alternatively hold down the *Alt* or *Option*-key and drag to move the scene.
- **Zoom:** Scroll the mouse wheel to move closer or farther away.

When using the Examine Viewer you will notice, that the horizon is always horizontal. You can disable this behavior in the context menu under "Straighten Horizon", when disabled there are no such constrains and navigation feels more freely. There is also a [browser option](/x_ite/reference/browser-services/#browser-options) "StraightenHorizon" which can be read and written.

## Walk Viewer

The other viewer, called the Walk Viewer, lets you navigate through a scene by moving the camera using a walking or driving metaphor. For example, use the Walk Viewer to look at architectural models from the inside, or to walk between buildings or across landscapes.

**Tips:**

- Turn on the rubberband in the context menu under *Display Rubberband*. This is a navigation aid that let you show how fast you are moving and in which direction.
- Hold down the *Shift*-key while moving to go a little faster.

### Viewer Controls

- **Go:** is the default Movement control. Click in the scene and hold down the left mouse button and then drag the pointer in the scene window to move in the world. Drag up to go forward, drag down to go backward, drag left to turn left, and drag right to turn right. Go turns your view in the direction of travel. Hold down *Shift*-key to go faster.
- **Slide:** click and hold down the middle mouse button (or scroll wheel) and then drag to jump straight up or down, or to slide right or left. Slide does not turn your view in the direction of travel. Hold down the *Shift*-key to slide faster. Alternatively hold down the *Alt* or *Option*-key and drag to slide.
- **Tilt:** scroll your mouse wheel to look up and down without moving.
- **Free Tilt:** You can enable free tilt by hold down the *CmdOrCtrl*-key and then drag to look up and down or from side to side without moving.

>**Note:** Gravity is always enabled when in Walk Viewer mode. Put a floor under the viewer to prevent falling down.
{: .prompt-info }

## Fly Viewer

The Fly Viewer work the same way like the Walk Viewer except gravity is always turned off and sliding up and down is enabled.

See Walk Viewer to learn how movement is controlled.

>**Note:** The author of the X3D world determines whether collision with objects is enabled.
{: .prompt-info }

## Plane Viewer

The Plane Viewer is useful especially for 2D scenes and in conjunction with the [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) node.

### Viewer Controls

- **Pan:** Drag while holding down the middle mouse button (or scroll wheel) to move the scene. Alternatively hold down the *Alt* or *Option*-key and drag to move the scene.
- **Zoom:** Scroll the mouse wheel to move closer or farther away.

An X3D author can enable the Plane Viewer by setting the *type* field of the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to "PLANE_create3000.github.io" or "PLANE".

## None Viewer

The None Viewer disables all navigation controls. No user movement is possible. An X3D author can enable the None Viewer by setting the *type* field of the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to "NONE".

## Look At Viewer

The Look At Viewer is used to explore a scene by navigating to a particular object. Selecting an object with the Look At Viewer:

- Moves the viewpoint directly to a convenient viewing distance from the center of the selected object, with the viewpoint orientation set to aim the view at the center of the object.
- Sets the center of rotation in the currently bound Viewpoint node to the center of the selected object.
