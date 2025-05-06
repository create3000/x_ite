---
title: Improving Performance
date: 2022-11-28
nav: tutorials-optimize-your-scene
categories: [Tutorials]
tags: [Improving, Performance]
---
## Overview

By this time, you may have spend weeks creating complex and interesting X3D scenes. You've refined the models until they're lifelike and perfected their colors and texturing. You've experimented with lighting, and now you're ready to share your creation with the world.

One problem: It takes a long time to download your scene. Another problem: Even on a high-powered computer, navigating through your scene is cumbersome and painful. You move the mouse and it seems to take minutes for the scene to catch up.

This tutorial describes how to optimize your X3D files to decrease download time and increase rendering speed. Once you're familiar with the process, you should incorporate many of these tips in the initial planning and creation of your X3D scenes. If possible, view your world using X\_ITE and see how performance and rendering vary on different platforms. [Sunrize](/sunrize/) provides tools for implementing some of these optimizations. Others require human inspection and judgment and the creation of additional models for your scene. In all cases, knowledge of these techniques can help you create X3D worlds that are usable and easy to explore as well as visually compelling.

This tutorial is divided into two parts:

- Reducing file size (to speed up transmission time)
- Increasing rendering speed, with the goal of achieving a minimum frame rate of 25 frames per second, which is the frame rate required to simulate the visual continuity of moving through the real world

## Reducing File Size

The larger the file size, the more time required to transmit it over the World Wide Web. If it takes too long to fetch the data for your scene, many users lose patience and move on to another site. The moral of the story is: Reduce file size when you can. Techniques for making files smaller include the following:

- Cloning objects
- Using prototypes
- Using Text nodes
- Using space-efficient geometry nodes
- Relying on automatic normals
- Eliminating white spaces
- Rounding floating point numbers
- Compress files

The following sections describe each of these techniques in more detail.

## Use Cloned Objects

If the same object is used more than once in the scene, it's most efficient to give the object a name the first time it's used (with DEF) and then refer to the object by name (with USE) in subsequent uses. For example, if you use a tree more then once you can define them in this manner. The tree if it has a reasonable size can be represented as Inline node. Here is an example of defining a tree and then using that object at another place with a simple translation.

**Example:** Using multiple instances of the same object.

### XML Encoding

```x3d
<Transform DEF='Tree1'>
  <Inline DEF='Tree'
      url='"tree.x3d"'/>
</Transform>
<Transform DEF='Tree2'
    translation='10 0 8'>
  <Inline USE='Tree'/>
</Transform>
```

### Classic VRML Encoding

```vrml
DEF Tree1 Transform {
  children DEF Tree Inline {
    url "tree.x3d"
  }
}
DEF Tree2 Transform {
  translation 10 0 8
  children USE Tree
}
```

## Use Prototypes

Prototyping objects that are used frequently with a few modifications is another way to reduce file size. As with DEF/USE, the object is defined once, and only the public interface that changes needs to be specified. In addition, because prototypes expose which parts of the scene hierarchy are changeable, the browser is free to optimize the parts that remain the same.

**Example:** Defining a prototype.

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <ProtoDeclare name='BooleanSwitch'>
      <ProtoInterface>
        <field accessType='inputOutput' type='SFBool' name='whichChoice'/>
        <field accessType='initializeOnly' type='SFVec3f' name='bboxSize' value='-1 -1 -1'/>
        <field accessType='initializeOnly' type='SFVec3f' name='bboxCenter'/>
        <field accessType='inputOnly' type='MFNode' name='addChildren'/>
        <field accessType='inputOnly' type='MFNode' name='removeChildren'/>
        <field accessType='inputOutput' type='MFNode' name='children'/>
      </ProtoInterface>
      <ProtoBody>
        <Switch DEF='Switch'
            whichChoice='0'>
          <IS>
            <connect nodeField='bboxSize' protoField='bboxSize'/>
            <connect nodeField='bboxCenter' protoField='bboxCenter'/>
            <connect nodeField='addChildren' protoField='addChildren'/>
            <connect nodeField='removeChildren' protoField='removeChildren'/>
            <connect nodeField='children' protoField='children'/>
          </IS>
        </Switch>
        <Script
            directOutput='true'>
          <field accessType='inputOutput' type='SFBool' name='whichChoice'/>
          <field accessType='initializeOnly' type='SFNode' name='group'>
            <Switch USE='Switch'/>
          </field>
          <IS>
            <connect nodeField='whichChoice' protoField='whichChoice'/>
          </IS>
<![CDATA[ecmascript:

function initialize ()
{
  set_whichChoice (whichChoice);
}

function set_whichChoice (value)
{
  group .whichChoice = value
}
]]>
        </Script>
      </ProtoBody>
    </ProtoDeclare>
    <TouchSensor DEF='Touch'/>
    <ProtoInstance name='BooleanSwitch' DEF='Button'>
      <fieldValue name='children'>
        <Transform DEF='Normal'>
          <Shape/>
        </Transform>
        <Transform DEF='Highlight'>
          <Shape/>
        </Transform>
      </fieldValue>
    </ProtoInstance>
    <ROUTE fromNode='Touch' fromField='isOver' toNode='Button' toField='set_whichChoice'/>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

PROTO BooleanSwitch [
  inputOutput    SFBool  whichChoice FALSE
  initializeOnly SFVec3f bboxSize -1 -1 -1
  initializeOnly SFVec3f bboxCenter 0 0 0
  inputOnly      MFNode  addChildren
  inputOnly      MFNode  removeChildren
  inputOutput    MFNode  children [ ]
]
{
  DEF Switch Switch {
    whichChoice 0
    bboxSize IS bboxSize
    bboxCenter IS bboxCenter
    addChildren IS addChildren
    removeChildren IS removeChildren
    children IS children
  }

  Script {
    inputOutput    SFBool whichChoice IS whichChoice
    initializeOnly SFNode group USE Switch

    url "ecmascript:

function initialize ()
{
  set_whichChoice (whichChoice);
}

function set_whichChoice (value)
{
  group .whichChoice = value;
}
"
    directOutput TRUE
  }
}

DEF Touch TouchSensor { }

DEF Button BooleanSwitch {
  children [
    DEF Normal Transform {
      children Shape {
        # Attractive shape
      }
    }
    DEF Highlight Transform {
      children Shape {
        # Highlighted shape
      }
    }
  ]
}

ROUTE Touch.isOver TO Button.set_whichChoice
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/boolean-switch/boolean-switch.x3dv">
  <img src="https://create3000.github.io/media/tutorials/scenes/boolean-switch/screenshot.avif" alt="BooleanSwitch"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/boolean-switch/boolean-switch.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/boolean-switch/boolean-switch.x3dv)
{: .example-links }

## Use the Text node

Be sure to use the [Text](/x_ite/components/text/text/) node for text. Some translators convert text to polygons, resulting in very large numbers of polygons for a simple string of text. Using the Text node reduces polygon count and allows the browser to optimize for rendering performance, using cached versions of glyphs.

## Use Space-Efficient Geometry Nodes

Nodes such as [Box](/x_ite/components/geometry3d/box/), [Cone](/x_ite/components/geometry3d/cone/), [Cylinder](/x_ite/components/geometry3d/cylinder/), [Sphere](/x_ite/components/geometry3d/sphere/), [Extrusion](/x_ite/components/geometry3d/extrusion/), and [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) provide a compact way of describing objects with many polygons. Using these nodes saves transmission time. X\_ITE provides optimizations for these shapes.

If your geometry consists only of triangles or quads, you should choose an [IndexedTriangleSet](/x_ite/components/rendering/indexedtriangleset/), [TriangleSet](/x_ite/components/rendering/triangleset/), [IndexedQuadSet](/x_ite/components/cadgeometry/indexedquadset/), or [QuadSet](/x_ite/components/cadgeometry/quadset/) node. These nodes are much more optimal than an [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) node can be.

## Use Automatic Normals

Rely on automatic normal generation when possible instead of supplying your own normals for each shape. Many geometry nodes have a *creaseAngle* field which controls the normal generation.

## Compress Files

Use AVIF, JPEG or PNG format for textures. GIF is also acceptable in some cases.

AVIF (AV1 Image File Format) is a modern image format that uses the AV1 codec for superior compression efficiency while maintaining high visual quality. It supports advanced features like HDR, transparency, and lossless compression, making it ideal for web and multimedia applications. AVIF is designed to compete with formats like JPEG, PNG, and WebP by offering smaller file sizes without significant quality loss.

Use MPEG-4 format for movies and animated textures.

Finally, use with GZip compressed formats (.x3dz, .x3dvz) before you publish them. It's faster to uncompress a file than to transmit a large file over the network. All browsers automatically decompress files. Using GZip can result in up to 10 times reduction in file size. When you compress a file with GZip, white spaces are automatically compacted.
