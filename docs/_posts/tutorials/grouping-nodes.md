---
title: Grouping Nodes
date: 2022-11-28
nav: tutorials-shapes-geometry-and-appearance
categories: [Tutorials]
tags: [Grouping, Nodes]
---
## Motivation

You can group shapes to compose complex shapes

X3D has several grouping nodes, including:

### XML Encoding

```x3d
<Group><!-- ... --></Group>
<Switch><!-- ... --></Switch>
<Transform><!-- ... --></Transform>
<Billboard><!-- ... --></Billboard>
<Anchor><!-- ... --></Anchor>
<Inline/>
<!-- and more -->
```

### Classic VRML Encoding

```vrml
Group       { ... }
Switch      { ... }
Transform   { ... }
Billboard   { ... }
Anchor      { ... }
Inline      { ... }
and more
```

## Syntax: Group

The [Group](/x_ite/components/grouping/group/) node creates a basic grouping.

- Every child node in the group is displayed.

### XML Encoding

```x3d
<Group>
  <!-- children ... -->
</Group>
```

### Classic VRML Encoding

```vrml
Group {
  children [ ... ]
}
```

## Syntax: Switch

The [Switch](/x_ite/components/grouping/switch/) group node creates a switched group

- Only one child node in the group is displayed
- You select which child
  - Children implicitly numbered from 0
  - A -1 selects no children

### XML Encoding

```x3d
<Switch
    whichChoice='0'>
  <!-- children ... -->
</Switch>
```

### Classic VRML Encoding

```vrml
Switch {
  whichChoice 0
  children [ ... ]
}
```

## Syntax: Transform

The [Transform](/x_ite/components/grouping/transform/) group node creates a group with its own coordinate system.

- Every child node in the group is displayed.

### XML Encoding

```x3d
<Transform
    translation='0.0 0.0 0.0'
    rotation='0.0 1.0 0.0 0.0'
    scale='1.0 1.0 1.0'>
  <!-- children ... -->
</Transform>
```

### Classic VRML Encoding

```vrml
Transform {
  translation 0.0 0.0 0.0
  rotation 0.0 1.0 0.0 0.0
  scale 1.0 1.0 1.0
  children [ ... ]
}
```

## Syntax: Billboard

The [Billboard](/x_ite/components/navigation/billboard/) group node creates a group with a special coordinate system.

- Every child node in the group is displayed.
- The coordinate system is turned to face viewer.

### XML Encoding

```x3d
<Billboard
    axisOfRotation='0.0 1.0 0.0'>
  <!-- children ... -->
</Billboard>
```

### Classic VRML Encoding

```vrml
Billboard {
  axisOfRotation 0.0 1.0 0.0
  children [ ... ]
}
```

## Billboard rotation axes

- A rotation axis defines a pole to rotate round
- Similar to a Transform node's rotation field, but no angle (auto computed)
- A standard rotation axis limits rotation to spin about that axis
- A zero rotation axis enables rotation around any axis

| Rotate about | Axis        |
|--------------|-------------|
| X-Axis       | 1.0 0.0 0.0 |
| Y-Axis       | 0.0 1.0 0.0 |
| Z-Axis       | 0.0 0.0 1.0 |
| Any Axis     | 0.0 0.0 0.0 |

## A sample billboard group

### XML Encoding

```x3d
<!-- Y-axis -->
<Billboard
    axisOfRotation='0.0 1.0 0.0'>
  <Shape><!-- ... --></Shape>
  <Shape><!-- ... --></Shape>
  <Shape><!-- ... --></Shape>
  <!-- ... -->
</Billboard>
```

### Classic VRML Encoding

```vrml
Billboard {
  # Y-axis
  axisOfRotation 0.0 1.0 0.0
  children [
    Shape { ... }
    Shape { ... }
    Shape { ... }
    ...
  ]
}
```

## Syntax: Anchor

An [Anchor](/x_ite/components/networking/anchor/) node creates a group that acts as a clickable anchor

- Every child node in the group is displayed
- Clicking any child follows a URL
- A description names the anchor

### XML Encoding

```x3d
<Anchor
    url='"stairwy.wrl"'
    description='Twisty Stairs'>
  <!-- children ... -->
</Anchor>
```

### Classic VRML Encoding

```vrml
Anchor {
  url "stairwy.wrl"
  description "Twisty Stairs"
  children [ ... ]
}
```

## Syntax: Inline

An [Inline](/x_ite/components/networking/inline/) node creates a special group from another X3D file's contents

- Children read from file selected by a URL
- Every child node in group is displayed

### XML Encoding

```x3d
<Inline
  url='"table.wrl"'/>
```

### Classic VRML Encoding

```vrml
Inline {
  url "table.wrl"
}
```

## Summary

- The [Group](/x_ite/components/grouping/group/) node creates a basic group
- The [Switch](/x_ite/components/grouping/switch/) node creates a group with 1 choice used
- The [Transform](/x_ite/components/grouping/transform/) node creates a group with a new coordinate system
- The [Billboard](/x_ite/components/navigation/billboard/) node creates a group with a coordinate system that rotates to face the viewer
- The [Anchor](/x_ite/components/networking/anchor/) node creates a clickable group
  - Clicking any child in the group loads a URL
- The [Inline](/x_ite/components/networking/inline/) node creates a special group loaded from another X3D file
