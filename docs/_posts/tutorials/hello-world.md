---
title: Hello, World!
date: 2022-11-28
nav: tutorials-basic
categories: [Tutorials]
tags: [Hello, World]
redirect_from:
  - /tutorials/Hello,-World!.html
---
## Overview

In this tutorial, you will learn how to create a simple hello world scene with X3D. Firstly, let explains some of the X3D basics.

1. X3D is stands for **E**xtensible **T**hree-**D**imensional.
2. X3D is a text file if when saved as Classic VRML Encoding consists of a set of nodes like (Transform { … }).
3. All of the nodes start with the node type name like Transform follow by a open curly brace »{«. They end with a close curly brace »}«
4. The syntax is just like a command to tell X3D browser (like X\_ITE) what should do.
5. A X3D XML Encoding file must have the extension .x3d or .x3dz. A X3D Classic VRML Encoding file must have .x3dv or .x3dvz as file extension.
6. X3D file is case sensitive. *Transform, transform* or *tRansForm* are not the same.
7. X3D file can be edit with any text editor like GEdit or Emacs for Linux or Unix, Notepad++ or Wordpad for Windows, and Coda or Simple Text for Mac.

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/hello-world1/hello-world1.x3dv" update="auto" xrSessionMode="IMMERSIVE_AR">
  <img src="https://create3000.github.io/media/tutorials/scenes/hello-world1/screenshot.avif" alt="Hello World Image"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/hello-world1/hello-world1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/hello-world1/hello-world1.x3dv)
{: .example-links }

As first a very easy example, we will create a sphere with a texture and a text below the sphere. Let's start with the sphere:

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <Transform>
      <Shape>
        <Sphere/>
      </Shape>
    </Transform>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

Transform {
  children Shape {
    geometry Sphere { }
  }
}
```

The Sphere has a radius field, which is by default 1. The units in X3D are measured in Meters. The Sphere here is a node that is assigned to the *geometry* field of the Shape node. The Shape node has a second field *appearance*, which we will use later for texturing. The Shape node is assigned to the *children* field of the Transform node. The Transform node could have as many children as you want, but this is not always desired. The Transform node has special fields *translation*, *rotation* and *scale* for positioning it's children in space.

Now we have a sphere, but we don't see if it is rotating, let's assign a texture:

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <Transform>
      <Shape>
        <Appearance>
          <ImageTexture
              url='"earth.jpg"'/>
        </Appearance>
        <Sphere/>
      </Shape>
    </Transform>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

Transform {
  children Shape {
    appearance Appearance {
      texture ImageTexture {
        url "earth.jpg"
      }
    }
    geometry Sphere { }
  }
}
```

We take a Appearance node and assign it to the *appearance* field of the Shape node. For the texture we take an ImageTexture node. It would be possible a MovieTexture as texture too. But this later. The ImageTexture has a field *url*. Here we say the ImageTexture should fetch the image from ".earth.png". We could assign multiple urls:

### XML Encoding

```x3d
url='"earth.png", "https://example.com/earth.png"'
```

### Classic VRML Encoding

```vrml
url [
  "earth.png",
  "https://example.com/earth.png"
]
```

If one image from the *url* field is not found or something went wrong the next one is taken.

Now the sphere looks like an earth and you are very curious how the text will be made:

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <Viewpoint
        description='Home'
        position='0 -1.01581 6.02612'
        centerOfRotation='0 -1.01581 0'/>
    <Transform>
      <Shape>
        <Appearance>
          <ImageTexture
              url='"earth.jpg"'/>
        </Appearance>
        <Sphere/>
      </Shape>
    </Transform>
    <Transform
        translation='0 -1.5 0'>
      <Shape>
        <Appearance>
          <Material
              diffuseColor='0 0.5 1'/>
        </Appearance>
        <Text
            string='"Hello", "World!"'>
          <FontStyle
              justify='"MIDDLE", "BEGIN"'/>
        </Text>
      </Shape>
    </Transform>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

Viewpoint {
  description "Home"
  position 0 -1.01581 6.02612
  centerOfRotation 0 -1.01581 0
}

Transform {
  children Shape {
    appearance Appearance {
      texture ImageTexture {
        url "earth.jpg"
      }
    }
    geometry Sphere { }
  }
}

Transform {
  translation 0 -1.5 0
  children Shape {
    appearance Appearance {
      material Material {
        diffuseColor 0 0.5 1
      }
    }
    geometry Text {
      string [ "Hello", "World!" ]
      solid FALSE
      fontStyle FontStyle {
        justify [ "MIDDLE", "BEGIN" ]
      }
    }
  }
}
```

We position the text below the sphere by a translation of about 1 Meter along the y-axis. We want a blue colored text, so we assign a Material node to the *material* field of the Appearance node and set the *diffuseColor* field to 1 0 0. As geometry we take a Text node and set the *string* field to "Hello World!".

### Result

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/hello-world2/hello-world2.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/hello-world2/screenshot.avif" alt="Hello World Image"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/hello-world2/hello-world2.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/hello-world2/hello-world2.x3dv)
{: .example-links }
