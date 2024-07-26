---
title: Features
date: 2022-11-28
nav: main
categories: []
tags: [Features]
---
## Overview

![JavaScript Logo](/assets/img/features/javascript.png){: .left }
X_ITE is a fast, small, and feature-rich JavaScript library for displaying and executing X3D files, and other formats like VRML, glTF and [more](/x_ite/#supported-file-formats). It makes things like WebGL programming, document access and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

X_ITE is freely downloadable for any usage and licensed under the GPL3. You can use them for commercial and noncommercial purposes.

Runs completely standalone, ie. there are no other library dependencies. You just need to include *x_ite.js* into your HTML page.

Competitive performance for most frequently used functions and nodes. All function within X_ITE are optimized to give your the best performance that JavaScript can offer.

![Terser Logo](/assets/img/features/terser.png){: .left }
The X_ITE package is optimized in size with Terser to achieve the smallest size we can reach. **X_ITE core module has only {{ site.x_ite_compressed_size }}KB in size minified and compressed**, all other modules are loaded on demand.

X_ITE is designed for optimal performance with event driven programming. The flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other scripts.

All code is held by [CREATE3000](https://github.com/create3000) and all contributors are selected and all contributions become verified.

## Core Features

![WebGL Logo](/assets/img/features/webgl.png){: .left }
Although WebGL acts behind the scenes you do not need any special knowledge about that. There are many of ready to use [X3D nodes](/x_ite/supported-nodes/) that will make life easier. X_ITE provides comprehensive X3D support, which is complete and standard compliant.

X_ITE comes with a high performance JavaScript rendering engine, ie. developers may be completely free of worry about performance optimizations in their code.

We offer full [X3D ECMAScript](/x_ite/reference/ecmascript-object-and-function-definitions/) support to give you the best scripting tools you can get.

X3D comes with a fixed set of objects called *nodes* that will cover most of your needs. But its creators also planned ahead, knowing that sometimes you'll need to create your own objects. The prototyping feature lets you create complex objects that you can reuse, changing certain properties of the objects as you go.

>**Tip:** X_ITE works seamlessly with our editor [Sunrize](/sunrize/), because Sunrize is based on X_ITE. This means that everything you create in Sunrize will look exactly the same in X_ITE, including scripts and shaders.
{: .prompt-tip }

![X3D Logo](/assets/img/features/x3d.png){: .left }
There is excellent built-in support for Gouraud and Phong shading, as well as PBR shading. Gouraud and Phong shading is the most popular shading algorithm in use today. These methods were developed by Henri Gouraud and Phong Bui-Toung. If the built-in shading methods are not enough for you, there is support for [custom shaders](/x_ite/custom-shaders/). Don't worry about *uniform variables, shader compilation and texture loading* The [ComposedShader](/x_ite/components/shaders/composedshader/) node makes it easy to write your own shader even if you are a beginner, but there is also everything for professionals. There is a standardized shader API similar to GLSL that makes it easy to convert your existing shaders. The built-in shaders support eight simultaneous local lights for each [Shape](/x_ite/components/shape/shape/) node, color nodes attached to a geometry are supported. There is smooth texture mapping adjustable with [TextureProperties](/x_ite/components/texturing/textureproperties/) node and normals can be automatically generated depending on *creaseAngle* if you want smooth shading.

Complex routing graphs can be created. X3D's event model allows the creation of connections between fields (routes), and events are propagated along these connections. The behavior graph collects all these field connections. It can be changed dynamically by rerouting, adding, or disconnecting connections. Events are injected into the system and propagated through the behavior graph in a well-defined order.

Collision detection is also considered, it is unbreakable. In virtual reality environments, collision detection is an algorithm that determines how close a user is to a real physical object and will stop their movement before colliding with the object. If you want, there is terrain following support. Terrain following works by determining the ground beneath the avatar and letting him walk over plains and mountains. Use the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to enable it.

To add special effects and environment sound to your scenes there is support for MovieTexture and [Sound](/x_ite/components/sound/sound/) node with a standardized set of functions. These are easy to use. They use HTML5 \<video\> and \<audio\> elements internally, you don't need to worry about it.

Create text quickly and easily. Use the [Text](/x_ite/components/text/text/) node, which can load remote font files in TrueType and OpenType format, but there are also built-in fonts.

With [DOM integration](/x_ite/dom-integration/), X3D content can be used as if it were HTML and manipulated using common JavaScript DOM manipulation methods as used to do from X3DOM.

If this is not enough for you have a look at [Supported Nodes](/x_ite/supported-nodes/) there's sure to be something there for you.

## Code Features

X_ITE provides meaningful error messages for syntax and scripting problems if you use a [Script](/x_ite/components/scripting/script/) node. The output goes to the developer console of your browser.

![npm Logo](/assets/img/features/npm.png){: .left }
We use npm's package management now, npm is **the** package manager for JavaScript. That makes it easy for us to keep the code base up to date.

We don't uses browser-sniffing. We keep the code consistent that makes our life easier.
