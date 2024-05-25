---
title: Increasing Rendering Speed
date: 2022-11-28
nav: tutorials-optimize-your-scene
categories: [Tutorials]
tags: [Increasing, Rendering, Speed]
---
## Overivew

Another major concern for scene authors is to ensure that users can navigate smoothly and continuously through the virtual world, with the scene rendering instantly on the screen as the user moves or the scene is displayed. A minimum frame rate (redraw) of 25 frames per second is required to make the X3D world feel interactive, with visual continuity that simulates animations and moving through the real world.

This tutorial describes many ways to author X3D scenes that render more efficiently. By using Inline, Anchor, LOD nodes, polygon reduction, spatial scene organization, and a variety of other methods, you'll learn how to create scenes that the browsers on many platforms can render efficiently. These are the basic techniques for increasing rendering speed.

- Simplify the scene.
- Divide the scene into chunks so that the browser can perform optimizations during rendering. Techniques include spatial organization withing the X3D file, creating nested hierarchies of groups, and using Inline and Anchor nodes.
- Use nodes that facilitate browser optimization, including LOD nodes, performance LOD nodes (without explicit ranges), geometric primitives, and nodes with geometric hints fields.
- Use scripts effectively.

The following sections describe each of these techniques in more detail. Note that these are general guidelines, not absolute rules, since browsers perform different kinds of optimizations, rendering libraries also have different characteristics.

## Simplify the Scene

As a scene author, you'll often constantly need to monitor the tradeoff between visual complexity and performance. Keep in mind that simplifying the scene results in faster rendering and a better experience for visitors to your world, but consider not to overdo optimizations.

### Reduce Polygon Count

The cold, harsh reality is that you have a limited polygon budget for your scene. Many computers cannot handle scenes with more than 2,000,000 polygons and maintain an acceptable interactive frame rate. To appeal to the widest audience, consider this limitation when designing and planning your X3D scene. Wherever possible, try to create models that are visually appealing yet economical in their use of polygons. Sometimes it's more important to convey the »idea« of the object, and less important to use a visually complex object. For example, chairs come in all styles. Do you need an ornate Windsor chair, or could a more streamlined model suffice? Simplifying models and textures in your scene may result in vast performance improvements. Many modeling software provide tools for reducing polygon count of an object.

### Use Textures Instead of Polygons

Effective use of textures can be a relative inexpensive way to add interest and detail to a scene. An image of a sign, textured onto the front of a building, will probably render much more quickly and with more fidelity than a model of the sign's typography that is constructed with hundreds of flat polygons.

### Use Lights Sparingly

Lights are expensive in terms of performance. On most platforms, an X3D file should contain no more than two or three local lights per shape. Placing a directional light under a Transform node with the *global* field set to FALSE localizes the effect of the light.

### Use Fewer Nodes

Use as few nodes as possible to achieve the desired effect. You can hide nodes that are not visible to the user with the Switch node if they are not needed. For geometry nodes that contain a Color field (such as IndexedFaceSet), for example, you could create one Color node defining all the colors in your standard »palette« and then index into individual nodes to select colors form it. Use the DEF/USE syntax to create multiple instances of the same Color node.

## Divide and Conquer

Dividing a large file into smaller chunks can greatly increase rendering speed, since it allows the browser to perform certain optimizations during rendering. Authoring techniques for dividing a large file into smaller pieces include the following:

- Create nested hierarchy of groups
- Arranging objects spatially in the X3D file
- Using Inline Nodes
- Using StaticGroup Nodes
- Using Anchor Nodes

### Create a Nested Hierarchy

The first step in structuring an efficient X3D file is to place each object in its own grouping node (usually Group or Transform). You may already have placed each object in its own group, since [Sunrize](/sunrize/) allows you to create objects individually.

Create hierarchies of objects by nesting groups of objects inside related groups. For example, a large house consist of sides, the staircases, the roof, and so on.

Note that an object can be composed of multiple shapes, and you don't need to put each shape under its own grouping node. Instead, shapes that make up reasonable sized objects should be grouped together under a common grouping node.

**Example:** Creating a hierachy of grouped objects.

### XML Encoding

```xml
<Group DEF='House'>
  <Transform DEF='InsideHouse'>
    <Shape>
      <!-- ... -->
      <!-- Inside the house -->
      <!-- ... -->
    </Shape>
  </Transform>
  <Transform DEF='ExteriorFacade'>
    <Shape>
      <!-- ... -->
      <!-- Exterior facade of the house -->
      <!-- ... -->
    </Shape>
  </Transform>
</Group>
```

### Classic Encoding

```vrml
DEF House Group {
  children [
    DEF InsideHouse Transform {
      children Shape {
        ...
        # Inside the house
        ...
      }
    }
    DEF ExteriorFacade Transform {
      children Shape {
        ...
        # Exterior facade of the house
        ...
      }
    }
  ]
}
```

### Arrange Objects Spatially

As you collect objects into groups, look in relation to each other. Are things close to each other in the scene. In other words, is the X3D file organized spatially. Buildings on the west side of the city should be grouped together. Objects on each face of an individual building should be together, and objects inside each building should be grouped according to their location. Organizing the X3D file spatially helps the browser move through the scene quickly, drawing only the parts that are visible. This is on of the key behind-the-scenes job performed by browser, which uses a feature built into the Group and Transform node.

### Use StaticGroup Nodes

If you know that the children are guaranteed to not change, send events, receive events or contain any USE references outside the StaticGroup, then the browser can optimize this content for faster rendering and less memory usage. For example, the floor or the mountains in a scene will seldom change and is likely to be subject to place it into a StaticGroup node.

### Turn of Collision Detection

One way to reduce the cost of detecting collisions is to set up collision detection only for those objects that a user is likely to try to navigate through. For instance, if you expect users to be »walking« along a floor, it may be a good idea to put the room's ceiling inside a Collision node with the *collide* field set to FALSE.
