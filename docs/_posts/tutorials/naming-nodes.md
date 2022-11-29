---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
---
# Naming Nodes

## Motivation

- If several shapes have the same geometry or appearance, you must use multiple duplicate nodes, one for each use
- Instead, define a name for the first occurrence of a node
- Later, use that name to share the same node in a new context

## Syntax: DEF

The **DEF** syntax gives a name to a node.

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material DEF='RedColor'
        diffuseColor='1.0 0.0 0.0'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material DEF RedColor Material {
      diffuseColor 1.0 0.0 0.0
    }
  }
  geometry ...
}
```

## Using DEF

- **DEF** must be in upper-case
- You can name any node
- Names can be most any sequence of letters and numbers
  - Names must be unique within a file

## Syntax: USE

The **USE** syntax uses a previously named node

### XML Encoding

```xml
<Shape>
  <Appearance>
    <Material USE='RedColor'/>
  </Appearance>
  <!-- geometry ... -->
</Shape>
```

### Classic Encoding

```js
Shape {
  appearance Appearance {
    material USE RedColor
  }
  geometry ...
}
```

## Using USE

- **USE** must be in upper-case
- A re-use of a named node is called an instance
- A named node can have any number of instances
  - Each instance shares the same node description
  - You can only instance names defined in the same file

## Using named nodes

Naming and using nodes:

- Saves typing
- Reduces file size
- Enables rapid changes to shapes with the same attributes
- Speeds browser processing

Names are also necessary for animation ...

## A sample use of node names

### XML Encoding

```xml
<Inline
    url='"table.x3dv"'/>
<Transform
    translation='0.95 0 0'>
  <Inline DEF='Chair'
      url='"chair.x3dv"'/>
</Transform>
<Transform
    translation='-0.95 0 0'
    rotation='0 1 0 3.14'>
  <Inline USE='Chair'/>
</Transform>
<Transform
    translation='0 0 0.95'
    rotation='0 1 0 4.71318530717959'>
  <Inline USE='Chair'/>
</Transform>
<Transform
    translation='0 0 -0.95'
    rotation='0 1 0 1.57'>
  <Inline USE='Chair'/>
</Transform>
```

### Classic Encoding

```js
Inline {
  url "table.x3dv"
}

Transform {
  translation 0.95 0.0 0.0
  children DEF Chair Inline {
    url "chair.x3dv"
  }
}

Transform {
  translation -0.95 0.0 0.0
  rotation 0.0 1.0 0.0 3.14
  children USE Chair
}

Transform {
  translation 0.0 0.0 0.95
  rotation 0.0 1.0 0.0 -1.57
  children USE Chair
}

Transform {
  translation 0.0 0.0 -0.95
  rotation 0.0 1.0 0.0 1.57
  children USE Chair
}
```

[![Dinette](https://create3000.github.io/media/tutorials/scenes/dinette/screenshot.png)](https://create3000.github.io/media/tutorials/scenes/dinette/example.html)

[View scene in this window.](https://create3000.github.io/media/tutorials/scenes/dinette/example.html)

[Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/dinette/dinette.zip)

## Summary

- **DEF** names a node
- **USE** uses a named node
