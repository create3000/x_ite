---
title: Basic Nodes
date: 2022-11-28
nav: tutorials-basic
categories: [Tutorials]
tags: [Basic, Nodes]
---
## Overview

X3D is capable of representing static and animated objects and it can have hyperlinks to other media such as sound, movies, and image. X\_ITE is a browsers for X3D and available for many different platforms as well as [Sunrize](/sunrize/) is an authoring tools for the creation X3D files. For programmers there is an JavaScript API interface to access X3D nodes and commonly used 3D application programmer interface features.

## Let The Games Begin…

A X3D file has four basic elements:

1. A header which tells the browser that the file is X3D and which version also. A header line is mandatory.
2. Comments are preceded by a #.
3. Nodes: Most everything else are nodes. Nodes generally contain:
  1. The type of node (required). Nodes always are in Capital letters.
  2. A set of curly braces {.....} (required)
  3. A number of fields, all or some of which are optional. Note that there is no mandatory ordering of fields.
  4. Fields which that can have multiple values require braces \[...\]. Fields always start with lowerCase letters.
4. Routes: Theses are connections between field where events are send. Events are generated from output fields (if it changes) and received by input fields.

Here is a typical X3D Classic Encoded file with a single node:

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <PlaneSensor DEF='Sensor'
        offset='0 2 0'/>
    <Transform DEF='XForm'
        translation='0 2 0'>
      <Shape>
        <Sphere/>
      </Shape>
    </Transform>
    <ROUTE fromNode='Sensor' fromField='translation_changed' toNode='XForm' toField='set_translation'/>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

# A sample file with a simple scene

DEF Sensor PlaneSensor {
  offset 0 2 0
}

DEF XForm Transform {
  translation 0 2 0
  children [
    Shape {
      geometry Sphere {}
    }
  ]
}

# Make a connection between the PlaneSensor and the Transform

ROUTE Sensor.translation_changed TO XForm.set_translation
```

Be careful! X3D is a case sensitive language.

## Key Concept

Now we can start to add information to the file. The first node to deal with is the [WorldInfo](/x_ite/components/core/worldinfo/) node. This node contains general information about the world, such as a *title* for the world. [WorldInfo](/x_ite/components/core/worldinfo/) can also contain an *info* field, which contain other information about the file such as copyright information. You can put what you like in it. A sample [WorldInfo](/x_ite/components/core/worldinfo/) node is shown below:

### XML Encoding

```x3d
<WorldInfo
    title='Tutorial'
    info='"Basic Nodes", "https://create3000.github.io/x_ite/"'/>
```

### Classic VRML Encoding

```vrml
WorldInfo {
 title "Tutorial"
 info [
   "Basic Nodes"
   "https://create3000.github.io/x_ite/"
  ]
}
```

You can have multiple strings in the *info* field, by putting them all inside square brackets. The *title* must not have square brackets, as it is only a single string.

## Shape

A [Shape](/x_ite/components/shape/shape/) node is the node to specify material and geometry properties. We add a Shape node to the world now, as shown below.

### XML Encoding

```x3d
<Shape>
  <Appearance>
    <Material/>
  </Appearance>
  <Box/>
</Shape>
```

### Classic VRML Encoding

```vrml
Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Box { }
}
```

## Geometry Nodes

There are a lot geometry nodes defined in X3D. The basic geometry nodes are:

- [Box](/x_ite/components/geometry3d/box/)
- [Cone](/x_ite/components/geometry3d/cone/)
- [Cylinder](/x_ite/components/geometry3d/cylinder/)
- [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/)
- [Extrusion](/x_ite/components/geometry3d/extrusion/)
- [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/)
- [Sphere](/x_ite/components/geometry3d/sphere/)
- [Text](/x_ite/components/text/text/)

The most important to define various geometries is probably the [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) node.

## Transform

In order to make our world any use at all, we need to be able to transform objects. X3D has three types of transformations we can apply to objects. These are *translation, rotation, and scale.* These are used in a [Transform](/x_ite/components/grouping/transform/) node. A Transform node doesn't have to have all three in it. You can just have a *rotation,* for instance. The transformations within a Transform apply to the children of the node. This is called nesting, where a node can have any number of child nodes. The syntax for this is shown in the example below, along with the syntax for a Transform node.

### XML Encoding

```x3d
<Transform
    translation='1 1 1'
    rotation='0 1 0 0.78'
    scale='2 1 2'/>
  <Shape USE='House'/>
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  translation 1 1 1
  rotation 0 1 0 0.78
  scale 2 1 2
  children [
    USE House
  ]
}
```

A Transform node can have another Transform nested inside it as a child, which allows you to do sequences of transformations. Remember, the order of transformations matters. A rotation followed by a translation is not the same as a translation followed by a rotation. Within a single Transform node, the transformations are carried out in strict order: scale, then rotate, the translate. So, if you want a translation followed by a rotation, you need to nest Transform nodes inside one another.

## Anchor

In X3D, you navigate between pages the same way as in HTML. You have an object that, when the user clicks on it, links to another page. Exactly what you're all used to. In X3D, this is done with the [Anchor](/x_ite/components/networking/anchor/) node.

### XML Encoding

```x3d
<Anchor
    url='"next-page.html"'
    description='Look forward'>
  <Transform USE='ButtonWithText'/>
</Anchor>
```

### Classic VRML Encoding

```vrml
Anchor {
  url "next-page.html"
  description "Look forward"
  children [
     USE ButtonWithText
  ]
}
```

The Anchor node is activated whenever one of its children is clicked, and opens up the page specified in *url.* The description field is a piece of text that appears somewhere in the browser when the mouse is over the hyperlink, just as in HTML.

There are a couple of extra fields not shown above. One of these is *parameter* field, which can take extra information, such as a window name.

### XML Encoding

```x3d
parameter='"target=_blank"'
```

### Classic VRML Encoding

```vrml
parameter [ "target=_blank" ]
```

## Background

There are two ways we can change the background of our scene. One is to specify colors for the [Background](/x_ite/components/environmentaleffects/background/), and the other is to provide images to be mapped onto the background. Both of these are implemented with the Background node. First of all, I'll describe how to add color to the background of your scene.

### XML Encoding

```x3d
<Background
    skyColor='0.5 0.5 0.5'/>
```

### Classic VRML Encoding

```vrml
Background {
  skyColor [0.5 0.5 0.5]
}
```

This will display a gray background. You can also make the background transparent by setting the *transparency* field to some value.

## Viewpoint

To give the world camera another position or orientation there is a [Viewpoint](/x_ite/components/navigation/viewpoint/) node. The viewpoint node can be placed anywhere within the scene graph.

### XML Encoding

```x3d
<Viewpoint DEF='LookAtHouse'
    position='0 2 10'
    orientation='0 1 0 3.14'/>
```

### Classic VRML Encoding

```vrml
DEF LookAtHouse Viewpoint {
  position 0 2 10
  orientation 0 1 0 3.14
}
```

Beside the Viewpoint node there is also an [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) node to define an orthographic camera.

If you define more than once viewpoint in an X3D file, the first viewpoint defined will be bound if the world is loaded. To bind one of the other viewpoints send a *set\_bind* event with the value TRUE to the viewpoint. You must use a [Script](/x_ite/components/scripting/script/) node for that or use a Anchor node with the name of the viewpoint in the *url* field preceded by '#'.

### XML Encoding

```x3d
<Anchor
    url='"#LookAtHouse"'/>
```

### Classic VRML Encoding

```vrml
Anchor {
  url "#LookAtHouse"
}
```

## Lighting in X3D

The first thing to mention is the way that the X3D lighting model works. All lights have the following fields: *color, ambientIntensity,* and *intensity.* Each light has an intensity, which a value between 0 and 1 corresponding to its brightness. It also has an ambient intensity, also between 0 and 1, which is how much light it contributes to the general ambient light in the scene. Because of this, the more lights in the scene, the brighter the ambient illumination, which makes sense. Ambient light is light that shines on every surface in the scene, simulating light scattered from other objects. Each light also has a *color* field associated with it, which is the color of the light it emits. The direct light emitted by a light source is calculated by *intensity × color.* The ambient light contributed to the scene is *ambientIntensity × color.* Each light source also has an area of effect, so as to keep X3D worlds enclosed and scalable. The method of doing this varies between the different types.

When using Gouraud shading browsers calculate lighting by working it out for each corner of a face, and interpolating the shading between these vertices. By default, X3D worlds will have the user's headlight ON. Remember to turn it off if you feel it necessary. Use a [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to do that.

### XML Encoding

```x3d
<NavigationInfo
    headlight='false'/>
```

### Classic VRML Encoding

```vrml
NavigationInfo {
  headlight FALSE
}
```

There are three different light nodes that can be used within a scene.

- [DirectionalLight](/x_ite/components/lighting/directionallight/)
- [PointLight](/x_ite/components/lighting/pointlight/)
- [SpotLight](/x_ite/components/lighting/spotlight/)

You can place any light node within a grouping node (e.g. [Group](/x_ite/components/grouping/group/), [Transform](/x_ite/components/grouping/transform/), [Switch](/x_ite/components/grouping/switch/)) and set the global field to **FALSE** to define a local light.

## Grouping Nodes

The following nodes are the most important grouping nodes (there are much more in X3D) which means that they can contain other nodes in their children field.

- [Anchor](/x_ite/components/networking/anchor/)
- [Billboard](/x_ite/components/navigation/billboard/)
- [Collision](/x_ite/components/navigation/collision/)
- [Group](/x_ite/components/grouping/group/)
- [LOD](/x_ite/components/navigation/lod/)
- [Switch](/x_ite/components/grouping/switch/)
- [Transform](/x_ite/components/grouping/transform/)
