---
title: Introducing X3D
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Introducing]
---
## What is X3D?

X3D is:

- X3D is an open, extensible 3D graphics standard standardized by the [Web3D® Consortium](https://www.web3d.org), designed for real-time interactive 3D content across platforms and the web
- A simple text language for describing 3-D shapes and interactive environments
- X3D text files use a .x3d, x3dj, x3dv, or .x3db extension
  - .x3d (XML) - save to parse
  - .x3dv (VRML) - easy to learn
  - .x3dj (JSON) - good for scripting
  - .x3db (Binary) - good for large models

>**Note:** All examples are in X3D XML and X3D VRML Classic Encoded file format (.x3d and .x3dv).
{: .prompt-info }

## What do I need to use X3D?

You can view X3D files using an X3D browser:

- An X3D standalone application
- An X3D JavaScript library like X_ITE to display X3D and VRML in a Web browser.

You can view X3D files from your local hard disk, or from the Internet.

## Can an X3D Browser be used as VRML Viewer?

- Yes an X3D browser can be uses as VRML viewer
- Since X3D is the successor of VRML, an X3D browser is also a VRML viewer

## How can X3D be used on a Web page?

- Include the X_ITE Script: Add the `<script>` tag linking to X_ITE in your HTML `<head>` or before the `</body>`.
- Add the `<x3d-canvas>` Element: This custom element acts as the rendering surface for your 3D scene.
- Write Your X3D Scene: Create an X3D file and add a `src` attribute to the `<x3d-canvas>` element, or inside the `<x3d-canvas>`, use `<X3D>` and `<Scene>` tags to define your shapes, appearances, lights, and views.
- Style the Canvas: Use CSS or inline style attributes to set width, height, or layout of your 3D canvas.
- Test in a Browser: Open the HTML file in any modern browser; no plugin needed — X_ITE runs purely in JavaScript and WebGL.

## What do I need to develop in X3D?

You can construct X3D files using:

- A text editor
- A authoring tool
- A 3D modeler and format translator
- A shape generator (like a Python, or Perl script)

## Should I use a text editor?

Pros:

- No new software to buy
- Access to all X3D features
- Detailed control of world efficiency

Cons:

- Hard to author complex 3D shapes
- Requires knowledge of X3D syntax

## Should I use a authoring tool?

Pros:

- Easy 3-D drawing and animating user interface
- Little need to learn X3D syntax

Cons:

- May not support all X3D features
- May not produce most efficient X3D

## Should I use a 3D modeler and format translator?

Pros:

- Very powerful drawing and animating features
- Can make photo-realistic images too

Cons:

- May not support all X3D features
- May not produce most efficient X3D
- Not designed for X3D
- Often a one-way path from 3D modeler into X3D
- Easy to make shapes that are too complex

## Should I use a shape generator?

Pros:

- Easy way to generate complex shapes
- Fractal mountains, logos, etc.
- Generate X3D from PHP scripts
- Common to extend science applications to generate X3D

Cons:

- Only suitable for narrow set of shapes
- Best used with other software
