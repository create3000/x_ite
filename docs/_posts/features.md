---
title: Features
date: 2022-11-28
nav: main
categories: []
tags: [Features, glTF]
---
## Overview

![JavaScript Logo](/assets/img/features/javascript.png){: .left .w-25 }
X_ITE is a fast, small, and feature-rich JavaScript library and VRML viewer for displaying and executing X3D files, and other formats like VRML, glTF and [more](/x_ite/#supported-file-formats). It makes things like WebGL programming, document access and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

X_ITE is freely downloadable for any usage and licensed under the GPL3. You can use them for commercial and noncommercial purposes.

Runs completely standalone, ie. there are no other library dependencies. You just need to include *x_ite.js* into your HTML page.

Competitive performance for most frequently used functions and nodes. All function within X_ITE are optimized to give your the best performance that JavaScript can offer.

![Terser Logo](/assets/img/features/terser.png){: .left .w-25 }
The X_ITE package is optimized in size with Terser to achieve the smallest size we can reach. **X_ITE core module has only {{ site.x_ite_compressed_size }}KB in size minified and compressed**, all other modules are loaded on demand.

X_ITE is designed for optimal performance with event driven programming. The flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other scripts.

All code is held by [CREATE3000](https://github.com/create3000) and all contributors are selected and all contributions become verified.

## Core Features

![WebGL Logo](/assets/img/features/webgl.png){: .left .w-25 }
Although WebGL acts behind the scenes you do not need any special knowledge about that. There are many of ready to use [X3D nodes](/x_ite/supported-nodes/) that will make life easier. X_ITE provides comprehensive X3D support, which is complete and standard compliant.

X_ITE comes with a high performance JavaScript rendering engine, ie. developers may be completely free of worry about performance optimizations in their code.

We offer full [X3D ECMAScript](/x_ite/reference/ecmascript-object-and-function-definitions/) support to give you the best scripting tools you can get.

X3D comes with a fixed set of objects called *nodes* that will cover most of your needs. But its creators also planned ahead, knowing that sometimes you'll need to create your own objects. The prototyping feature lets you create complex objects that you can reuse, changing certain properties of the objects as you go.

>**Tip:** X_ITE works seamlessly with our editor [Sunrize](/sunrize/), because Sunrize is based on X_ITE. This means that everything you create in Sunrize will look exactly the same in X_ITE, including scripts and shaders.
{: .prompt-tip }

![X3D Logo](/assets/img/features/x3d.png){: .left .w-25 }
There is excellent built-in support for Gouraud and Phong shading, as well as PBR shading. Gouraud and Phong shading is the most popular shading algorithm in use today. These methods were developed by Henri Gouraud and Phong Bui-Toung. If the built-in shading methods are not enough for you, there is support for [custom shaders](/x_ite/custom-shaders/). Don't worry about *uniform variables, shader compilation and texture loading* The [ComposedShader](/x_ite/components/shaders/composedshader/) node makes it easy to write your own shader even if you are a beginner, but there is also everything for professionals. There is a standardized shader API similar to GLSL that makes it easy to convert your existing shaders. The built-in shaders support eight simultaneous local lights for each [Shape](/x_ite/components/shape/shape/) node, color nodes attached to a geometry are supported. There is smooth texture mapping adjustable with [TextureProperties](/x_ite/components/texturing/textureproperties/) node and normals can be automatically generated depending on *creaseAngle* if you want smooth shading.

Complex routing graphs can be created. X3D's event model allows the creation of connections between fields (routes), and events are propagated along these connections. The behavior graph collects all these field connections. It can be changed dynamically by rerouting, adding, or disconnecting connections. Events are injected into the system and propagated through the behavior graph in a well-defined order.

Collision detection is also considered, it is unbreakable. In virtual reality environments, collision detection is an algorithm that determines how close a user is to a real physical object and will stop their movement before colliding with the object. If you want, there is terrain following support. Terrain following works by determining the ground beneath the avatar and letting him walk over plains and mountains. Use the [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to enable it.

To add special effects and environment sound to your scenes there is support for MovieTexture and [Sound](/x_ite/components/sound/sound/) node with a standardized set of functions. These are easy to use. They use HTML5 \<video\> and \<audio\> elements internally, you don't need to worry about it.

Create text quickly and easily. Use the [Text](/x_ite/components/text/text/) node, which can load remote font files in TrueType and OpenType format, but there are also built-in fonts.

With [DOM integration](/x_ite/dom-integration/), X3D content can be used as if it were HTML and manipulated using common JavaScript DOM manipulation methods as used to do from X3DOM.

If this is not enough for you have a look at [Supported Nodes](/x_ite/supported-nodes/) there's sure to be something there for you.

## Code Features

X_ITE provides meaningful error messages for syntax and scripting problems if you use a [Script](/x_ite/components/scripting/script/) node. The output goes to the developer console of your browser.

![npm Logo](/assets/img/features/npm.png){: .left .w-25 }
We use npm's package management now, npm is **the** package manager for JavaScript. That makes it easy for us to keep the code base up to date.

We don't uses browser-sniffing. We keep the code consistent that makes our life easier.

## glTF Support

In the X_ITE X3D Browser, glTF support is quite solid and integrated, allowing authors to load and render glTF (including .gltf and .glb) assets alongside X3D and VRML content. Internally X_ITE converts imported glTF models into X3D scene graph nodes, so they become part of the interactive X3D scene and can be manipulated just like native X3D content. Recent versions have even expanded this support to include a wide range of glTF material extensions, automatically translating PBR material definitions and KHR_* extensions into corresponding X3D material extension nodes, which enhances visual fidelity and compatibility with modern glTF assets.

### glTF Extensions

X_ITE supports most Khronos extensions and some multi-vendor extensions in the input scenes, with newer extensions added regularly. The following extensions are fully supported:

#### Ratified Khronos Extensions

* KHR_accessor_float64
* [KHR_animation_pointer](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_animation_pointer/README.md)
* [KHR_draco_mesh_compression](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
* [KHR_lights_punctual](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
* [KHR_materials_anisotropy](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_anisotropy/README.md)
* [KHR_materials_clearcoat](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
* KHR_materials_diffuse_transmission
* [KHR_materials_dispersion](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
* [KHR_materials_emissive_strength](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
* [KHR_materials_ior](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
* [KHR_materials_iridescence](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_iridescence/README.md)
* [KHR_materials_pbrSpecularGlossiness](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md)
* [KHR_materials_sheen](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
* [KHR_materials_specular](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
* [KHR_materials_transmission](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
* [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md)
* [KHR_materials_variants](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
* [KHR_materials_volume](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
* KHR_materials_volume_scatter
* [KHR_mesh_quantization](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
* KHR_meshopt_compression
* KHR_node_visibility
* [KHR_texture_basisu](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md)
* [KHR_texture_transform](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_transform/README.md)
* [KHR_xmp_json_ld](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_xmp_json_ld/README.md)

#### Multi-Vendor Extensions

* [EXT_lights_image_based](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_image_based)
* [EXT_mesh_gpu_instancing](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
* [EXT_meshopt_compression](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md)
* [EXT_texture_webp](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_webp/README.md)

Overall, glTF support in the X_ITE X3D Browser enables modern, high-quality 3D assets to be used natively within X3D workflows, bridging contemporary glTF pipelines with standards-based, interactive web 3D.
