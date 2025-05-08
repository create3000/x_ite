---
title: Building an X3D World
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Building, World]
---
## X3D file structure

X3D files contain:

- The file header
- Comments - notes to yourself
- Nodes - nuggets of scene information
- Fields - node attributes you can change
- Values - attribute values
- Routes - connections between fields
- more ...

## A sample X3D file

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Interchange' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
  <!-- A Cylinder -->
  <Shape>
    <Appearance>
      <Material/>
    <Appearance>
    <Cylinder
        height='2.0'
        radius='1.5'/>
    </Shape>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

PROFILE Interchange

# A Cylinder
Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Cylinder {
    height 2.0
    radius 1.5
  }
}
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.x3dv">
  <img src="https://create3000.github.io/media/tutorials/scenes/cylinder1/screenshot.avif" alt="Cylinder"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/cylinder1/cylinder1.x3dv)
{: .example-links }

## Understanding the header

**\#X3D V{{ site.x3d_latest_version }} utf8**

- **\#X3D:** File contains X3D text
- **V{{ site.x3d_latest_version }} :** Text conforms to version {{ site.x3d_latest_version }} syntax
- **utf8 :** Text uses UTF8 character set

## Understanding UTF8

- utf8 is an international character set standard
- utf8 stands for:
  - UCS (Universal Character Set) Transformation Format, 8-bit
  - Can encodes up to 2,164,864 characters for many languages
  - ASCII is a subset

## Understanding profiles and components

- **PROFILE Interchange:** File uses nodes from the `Interchange` profile
- Nodes are grouped into components
- Components are grouped into profiles
- Browsers can load components on demand to reduce initial load times and improve performance by only fetching what is necessary when it’s needed
- Additionally add as many **COMPONENT** statements you need

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Interchange' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <head>
    <component name='CubeMapTexturing' level='3'/>
    <component name='Scripting' level='1'/>
  </head>
  <Scene>
    ...
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
PROFILE Interchange

COMPONENT CubeMapTexturing : 3
COMPONENT Scripting : 1
```

What profiles and components are there:

- [Profiles](/x_ite/profiles/overview/)
- [Components](/x_ite/components/overview/)

## Header statements

Always add a **PROFILE** statement. If there is no profile declared, profile **Full** is assumed and all components will be loaded.

There are three header statements:

1. **COMPONENT** statements
2. **UNIT** statements
3. **META** statements

Order of statements is important!

### XML Encoding

```x3d
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 4.0//EN" "https://www.web3d.org/specifications/x3d-4.0.dtd">
<X3D profile='Interchange' version='4.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-4.0.xsd'>
  <head>
    <component name='CubeMapTexturing' level='3'/>
    <component name='Scripting' level='1'/>
    <unit category='angle' name='degree' conversionFactor='0.017453292519943295'/>
    <unit category='length' name='millimetre' conversionFactor='0.001'/>
    <meta name='created' content='Thu, 08 May 2025 14:11:46 GMT'/>
    <meta name='modified' content='Thu, 08 May 2025 14:19:44 GMT'/>
  </head>
  <Scene>
    ...
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

# exactly one profile statement
PROFILE Interchange

# zero or more component statements
COMPONENT Scripting : 1
COMPONENT CubeMapTexturing : 3

# zero or more unit statements
UNIT angle degree 0.017453292519943295
UNIT length millimetre 0.001

# zero or more meta statements
META "created" "Thu, 08 May 2025 14:11:46 GMT"
META "modified" "Thu, 08 May 2025 14:12:13 GMT"

# zero or more proto, node, route, import, export statements
# in arbitrary order
...
```

## Using comments

### XML Encoding

```x3d
<!-- A comment -->
```

- Comments start with `<!--` and must end with `-->`.

### Classic VRML Encoding

```vrml
# A comment

#/* A
  * multi-line
  * comment */#
```

- Comments start with a number-sign `#` and extend to the end of the line.
- Mult-line comments start with `#/*` and must end with `*/#`.

## Using nodes

### XML Encoding

```x3d
<Cylinder/>
```

### Classic VRML Encoding

```vrml
Cylinder {
}
```

- Nodes describe shapes, lights, sounds, etc.
- Every node has:
  - A node type ([Shape](/x_ite/components/shape/shape/), [Cylinder](/x_ite/components/geometry3d/cylinder/), etc.)
  - A pair of curly-braces
  - Zero or more fields inside the curly-braces

## Using node type names

Node type names are case sensitive:

- Each word starts with an upper-case character
- The rest of the word is lower-case

Some examples:

[Appearance](/x_ite/components/shape/appearance/), [Cylinder](/x_ite/components/geometry3d/cylinder/), [Material](/x_ite/components/shape/material/), [Shape](/x_ite/components/shape/shape/)

## Using fields and values

### XML Encoding

```x3d
<Cylinder
    height='2.0'
    radius='1.5'/>
```

### Classic VRML Encoding

```vrml
Cylinder {
  height 2.0
  radius 1.5
}
```

- Fields describe node attributes

Every field has:

- A field name (height, radius, etc.)
- A data type (float, integer, etc.)
- A default value
- Different node types have different fields
- Fields are optional
  - A default value is used if a field is not given
- Fields can be listed in any order
  - The order doesn't affect the node

## Placing nodes

Every node has a »containerField« attribute with a default value, which is different for each node type. You can change the value if needed.

```x3d
<Collision>
  <Shape containerField='proxy'>
    <Box/>
  </Shape>
  <Transform>
    <!-- ... -->
  </Transform>
</Collision>
```

## Summary

- The file header gives the version and encoding
- Nodes describe scene content
- Fields and values specify node attributes
- containerField attribute can be changed.
- Everything is case sensitive
