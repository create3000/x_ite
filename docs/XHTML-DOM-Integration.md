XHTML DOM Integration
=====================

XHTML DOM integration allows you to integrate 3D content seamlessly into your web page, with just a JavaScript file included the scene can be written directly into the XHTML or HTML markup.

Andreas Plesch wrote a nice plug-in for X3D HTML DOM integration. This enables JavaScript authors to use X3D content as if it would be HTML. *x\_ite\_dom* links the X3D DOM nodes to the X3D scene graph and thereby allows for control of the X3D scene using regular DOM manipulation methods. The »x\_ite\_dom.js« script must be included after X\_ITE, then HTML DOM integration is available.

Reference
---------

The complete documentation can be found at [https://github.com/andreasplesch/x\_ite\_dom](https://github.com/andreasplesch/x_ite_dom).

Example
=======

[![XHTML DOM Example](https://create3000.github.io/media/x_ite/dom-integration/dom.integration.png)](https://create3000.github.io/media/x_ite/dom-integration/dom.integration.xhtml)

[View scene in this window.](https://create3000.github.io/media/x_ite/dom-integration/dom.integration.xhtml)

How use the Plug-In with X\_ITE
===============================

Create an HTML or XHTML page and save it, additionally the »x\_ite\_dom.js« script must be included after the X\_ITE script, then XHTML DOM integration is available. Now, X3D content can directly be written within the X3DCanvas element and regular DOM manipulation methods can be used to manipulate the scene graph. This gives X3D authors the ability to combine HTML with X3D. The »moveHouse« function in the example below demonstrates how to use regular DOM manipulation methods to control the behavior of the X3D content.

Example
-------

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>XHTML DOM access for X_ITE</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" type="text/css" href="https://create3000.github.io/code/x_ite/latest/dist/x_ite.css"/>
    <script type="text/javascript" src="https://create3000.github.io/code/x_ite/latest/dist/x_ite.min.js"></script>
    <script type="text/javascript" src="https://raw.githack.com/andreasplesch/x_ite_dom/master/release/x_ite_dom.1.3.js"></script>
    <style>
X3DCanvas {
   width: 768px;
   height: 432px;
}
    </style>
  </head>
  <body>

    <!-- /* Create a X_ITE browser and define X3D content directly within the element.
         An Inline node is used here to load a complete scene because the scene is
         some way larger. */ -->
    <X3DCanvas>
      <X3D profile='Full' version='3.3' xmlns='http://www.web3d.org/specifications/x3d-namespace'>
        <Scene>
          <Viewpoint position='-2 1 -15' orientation='0 1 0 3.14' description='start'></Viewpoint>
          <NavigationInfo type='"FLY", "ANY"'></NavigationInfo>
          <Inline DEF='ExampleWorld' url='"https://cdn.rawgit.com/create3000/Library/master/Examples/Mushrooms/index.x3d"'></Inline>
        </Scene>
      </X3D>
      <p class="fallback">Your browser may not support all features required by X_ITE!</p>
    </X3DCanvas>

    <!-- /* Define a button that will call the »moveHouse« function on click. */ -->
    <button onclick="moveHouse ()">HTML Button to Move House</button>

    <script type="text/javascript">
function moveHouse ()
{
  // Constants

  const RANGE = 5;

  // Query the Transform with the name »pilzhaus«, get the values of the translation
  // field, apply some random values to the components of the vector and assign this
  // modified value again to the translation field of the Transform node.

  const
    houseTransform = document .querySelector ("[DEF='pilzhaus']"),              // Unique DEF inside inlined inlines.
    translation    = houseTransform .getAttribute ("translation") .split (" "), // Poor man's parse.
    x              = 1.0 * translation [0] + RANGE * (Math .random () - 0.5),
    y              = 1.0 * translation [1],
    z              = 1.0 * translation [2] + RANGE * (Math .random () - 0.5);

  houseTransform .setAttribute ("translation", x + " " + y + " " + z);
}
    </script>
  </body>
</html>
```
