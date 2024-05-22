---
title: DOM Integration
date: 2022-11-28
nav: main
categories: []
tags: [DOM, Integration, XHTML, HTML]
---
## Overview

DOM integration allows you to integrate 3D content seamlessly into your web page, with just a JavaScript file included, the scene can be written directly into the HTML or XHTML markup and manipulated using common JavaScript DOM manipulation methods.

>**Tip:** If you have an X3D file or a [file that can be loaded by X_ITE](/x_ite/#supported-file-formats), then you can convert this file to an HTML document using our [Online X3D File Format Converter](/x_ite/laboratory/x3d-file-converter/).
{: .prompt-tip }

**HTML DOM integration is now an integral part of X_ITE.**

## How to Use With X_ITE

Create an HTML or XHTML page, and save it and include the »x_ite.min.js«. Now, X3D content can be written directly into the \<x3d-canvas\> element, and regular DOM manipulation methods can be used to manipulate the scene graph, and you can combine HTML with X3D.

The example below shows a simple Box node inside the \<x3d-canvas\> element.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <script src="https://cdn.jsdelivr.net/npm/x_ite@{{ site.x_ite_latest_version }}/dist/x_ite.min.js"></script>
    <style>
x3d-canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 7.8;
}
    </style>
    <script>
window .addEventListener ("load", function ()
{
  const
    touchSensor = document .querySelector ("TouchSensor"),
    hitPoint    = document .querySelector ("#hitPoint");

  touchSensor .addEventListener ("hitPoint_changed", function (event)
  {
    hitPoint .textContent = event .detail .value;
  });
});
    </script>
  </head>
  <body>
    <x3d-canvas>
      <X3D profile='Interactive' version='{{ site.x3d_latest_version }}'>
         <Scene>
            <Background
                skyColor='0.2 0.2 0.2'>
            </Background>
            <Viewpoint
                position='4.75079 5.5764 6.80689'
                orientation='-0.67979594907481 0.70155548858341 0.2137694179717 0.842769006819'>
            </Viewpoint>
            <TouchSensor
                description='Box Geometry'>
            </TouchSensor>
            <Shape>
               <Appearance>
                  <Material
                      diffuseColor='0 0.5 1'>
                    <PixelTexture
                        containerField='diffuseTexture'
                        image='2 2 1 0xff 0x00 0x00 0xff'>
                      <TextureProperties
                          boundaryModeS='CLAMP_TO_EDGE'
                          boundaryModeT='CLAMP_TO_EDGE'>
                      </TextureProperties>
                    </PixelTexture>
                  </Material>
               </Appearance>
               <Box></Box>
            </Shape>
         </Scene>
      </X3D>
    </x3d-canvas>
    <p>TouchSensor.hitPoint_changed: <span id="hitPoint"></span></p>
  </body>
</html>
```

>**Attention:** Make sure you use **closing tags** for all X3D elements. This is necessary because the web browser does not know about X3D elements and therefore does not know if the tag is self-closing unless you are using XHTML.
{: .prompt-danger }

### Example

<iframe src="https://create3000.github.io/media/x_ite/dom-integration/box.html"></iframe>

## Attributes

When you change an attribute of an X3D element, the internal state of the node also changes.

```js
const material = document .querySelector ("Material");

material .setAttribute ("diffuseColor", "1 0 0"); // Set diffuse color to red.
```

## Events

You can add an event listener to any X3D element with the name of the output field you want to listen on. If the field has changed, an event will fire.

Events sent from a node are of type CustomEvent and have the following properties:

```js
CustomEvent: {
  type: string,        // name of field
  target: HTMLElement, // X3D element of node
  detail: {
    node: SFNode,      // node to which the field belongs to
    value: any,        // new value of field
  }
}
```

## Add and Remove Nodes

The contents of the X3D scene can be modified using DOM manipulation methods to change the scene. You can add and remove nodes to create your own scene.

```js
function addBlueBox ()
{
  const
    scene      = document .querySelector ("Scene"),
    transform  = document .createElement ("Transform"),
    shape      = document .createElement ("Shape"),
    appearance = document .createElement ("Appearance"),
    material   = document .createElement ("Material"),
    box        = document .createElement ("Box");

  transform .setAttribute ("id",           "BlueBox");
  transform .setAttribute ("scale",        "3 5 8");
  material  .setAttribute ("diffuseColor", "0 0.5 1")

  transform  .appendChild (shape);
  shape      .appendChild (appearance);
  shape      .appendChild (box);
  appearance .appendChild (material);
  scene      .appendChild (transform);
}

function removeBlueBox ()
{
  const transform = document .querySelector ("#BlueBox");

  transform .remove ();
}
```

## Add and Remove Routes

As well as nodes, routes can also be added and removed using DOM manipulation methods.

```js
function addRoute ()
{
  const
    scene = document .querySelector ("Scene"),
    route = document .createElement ("ROUTE");

  // Connect a TimeSensor node with DEF name »Timer« to a ScalarInterpolator node
  // with DEF name »Interpolator«.

  route .setAttribute ("id",        "route1");
  route .setAttribute ("fromNode",  "Timer");
  route .setAttribute ("fromField", "fraction_changed");
  route .setAttribute ("toNode",    "Interpolator");
  route .setAttribute ("toField",   "set_fraction");

  scene .appendChild (route);
}

function removeRoute ()
{
  const route = document .querySelector ("#route1");

  route .remove ();
}
```

## Inline Nodes

Even the contents of Inline nodes can be accessed and modified. The internal scene of the Inline node is attached to the Inline element as a child each time the Inline node is fully loaded. To check whether an Inline node is loaded, use a LoadSensor node.

```html
<x3d-canvas>
  <X3D profile='Interactive' version='{{ site.x3d_latest_version }}'>
    <Scene>
      <!-- Be aware of the double quotes inside the single quotes of the url attribute, because it is an MFString field. -->
      <Inline DEF='DeerInline'
          url='"Deer.x3d"'>
      </Inline>
      <LoadSensor>
        <Inline USE='DeerInline'></Inline>
      </LoadSensor>
    </Scene>
  </X3D>
</x3d-canvas>
```

Assuming there is a Transform node with the DEF name »Deer« inside the loaded scene »Deer.x3d«, the Transform node can be accessed when the Inline node is loaded. You should listen to the LoadSensor node's *loadTime* or *isLoaded* field to be informed when this happens.

```js
const transform = document .querySelector ("[DEF='DeerInline'] [DEF='Deer']");
```

### Events of Inline Element

Each Inline element sends a `load` or `error` event when the content of the Inline is loaded or fails to load.

```js
const inline = document .querySelector ("[DEF='DeerInline']");

inline .addEventListener ("load", () => console .log ("Deer loaded!"));
```

## Script Element

If you are using an HTML page instead of an XHTML page, you will already have a \<script\> element. To avoid collisions, you need to add a different type. A proper type is `model/x3d+xml`, which prevents the web browser from interpreting the content as JavaScript, and allows X_ITE to take over the content.

```html
<Script type='model/x3d+xml' DEF='ChangeColorScript'>
  <field accessType='inputOnly' type='SFBool' name='set_over'></field>
  <field accessType='outputOnly' type='SFColor' name='diffuseColor_changed'></field>
<![CDATA[ecmascript:
function set_over (value, time)
{
  diffuseColor_changed = value ? new SFColor (1, 0, 0) : new SFColor (0, 0, 1);
}
]]>
</Script>
```
