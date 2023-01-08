---
title: Features
date: 2022-11-28
nav: main
categories: []
tags: [Features]
---
## Overview

X_ITE is a fast, small, and feature-rich JavaScript library for displaying and executing X3D files. It makes things like WebGL programming, document access and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

X_ITE is freely downloadable for any usage and licensed under the GPL3. You can use them for commercial and noncommercial purposes.

Runs completely standalone, ie. there are no other library dependencies. You just need to include x_ite.js into your HTML page.

Competitive performance for most frequently used functions and nodes. All function within X_ITE are optimized to give your the best performance that JavaScript can offer.

The X_ITE package is optimized in size with Terser to achieve the smallest size we can reach. **X_ITE has only 265kB in size minified and compressed.**

X_ITE is designed for optimal performance with event driven programming. The flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other scripts.

All code is held by CREATE3000 and all contributors are selected and all contributions become verified.

## Core Features

Although WebGL acts behind the scenes you do not need any special knowledge about that. There are many of ready to use [X3D nodes](supported-nodes) that will make life easier. X_ITE provides comprehensive X3D support, which is complete and standard compliant.

X_ITE comes with a high performance JavaScript rendering engine, ie. developers may be completely free of worry about performance optimizations in their code.

We offer full [X3D ECMAScript](reference/ecmascript-object-and-function-definitions) support to give you the best scripting tools you can get.

X3D comes with a fixed set of objects, called *nodes,* which will cover most of your needs. But it's creators have also planned ahead, knowing that you'll sometimes have to create your own objects. The prototyping feature lets you create complex objects that you can reuse, changing certain characteristics of the objects when desired.

X_ITE works seamlessly together with Titania. There is a X_ITE Compatibility Mode in Titania that makes that everything looks equal both in Titania and X_ITE, additionally scripts, and shaders provide the same functionality.

There is excellent build in support for Gouraud and Phong shading. Gouraud and Phong shading are the most popular shading algorithm in use today. This methods were developed by Henri Gouraud and Phong Bui-Toung. If the build in shading methods are not enough for you there is support for [Custom Shaders](custom-shaders). Don't bother about *uniform variables, shader compilation, and texture loading.* With the Composed Shader node it is easy to write to your own shader even if you are a beginner, but it is also all there for professionals. There is a standardized shader API similar to GLSL that makes it easy to convert your existing shaders. The build in shaders support eight simultaneous local lights for each Shape node, Color node attached to a geometry is supported. There is smooth texture mapping adjustable with TextureProperties node and normals can be auto generated depending on *creaseAngle* if you wish smooth shading.

Complex routing graphs can be created. The event model of X3D allows the creation of connections between fields (routes) and event are propagated along those connections. The behavior graph collects all of these field connections. It can be changed dynamically by rerouting, adding or breaking connections. Events are injected into the system and propagated through the behavior graph in a well defined order.

Collision detection is also considered, it is unbreakable. In virtual reality environments, collision detection is a algorithm that determines how close a user is to a real physical objects and will stop their movement before colliding with the object. If you wish there is terrain following support. Terrain following works by determining the floor under the avatar and let him go over plains and mountains. Use the NavigationInfo node to enable it.

To add special effects and environment sound to your scenes there is support for MovieTexture and Sound node with a standardized set of functions. These are easy to use. They use HTML5 \<video\> and \<audio\> elements internally, you don't need to worry about it.

You can create text quick and easy. Use the Text node which can load remote font files in TrueType and OpenType format but there are also build in fonts.

If this is not enough for you have a look at [Supported Nodes](supported-nodes) there's sure to be something there for you.

## Code Features

X_ITE provides meaningful error messages for syntax and scripting problems if you use a Script node. The output goes to the developer console of your browser.

We don't uses browser-sniffing. We keep the code consistent that makes our life easier.

We use npm's package management now, npm is **the** package manager for JavaScript. That makes it easy for us to keep the code base up to date.
