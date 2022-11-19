---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
---
# XHTML DOM Integration

## Overview

XHTML DOM integration allows you to integrate 3D content seamlessly into your web page, with just a JavaScript file included the scene can be written directly into the XHTML or HTML markup.

Andreas Plesch wrote a nice plug-in for X3D HTML DOM integration. This enables JavaScript authors to use X3D content as if it would be HTML.It links the X3D DOM nodes to the X3D scene graph and thereby allows for control of the X3D scene using regular DOM manipulation methods. **HTML DOM integration is available by default now.**

### Reference

The complete documentation can be found at [https://github.com/andreasplesch/x_ite_dom#x_ite_dom](https://github.com/andreasplesch/x_ite_dom#x_ite_dom).

## How use the Plug-In with X\_ITE

Create an HTML or XHTML page and save it, include the »x_ite.min.js«. Now, X3D content can directly be written within the \<x3d-canvas\> element and regular DOM manipulation methods can be used to manipulate the scene graph. This gives X3D authors the ability to combine HTML with X3D. The example below will show a simple Box node in the \<x3d-canvas\> element.

### Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <script src="https://create3000.github.io/code/x_ite/latest/x_ite.min.js"></script>
    <style type="text/css">
x3d-canvas {
  width: 768px;
  height: 432px;
}
    </style>
  </head>
  <body>
    <x3d-canvas>
      <X3D>
         <Scene>
            <Shape>
               <Appearance>
                  <Material></Material>
               </Appearance>
               <Box></Box>
            </Shape>
         </Scene>
      </X3D>
    </x3d-canvas>
  </body>
</html>
```
