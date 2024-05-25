---
title: Writing Program Scripts with ECMAScript
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [Program, Scripts, ECMAScript, Javascript]
---
## Motivation

A program script implements the [Script](/x_ite/components/scripting/script/) node using values from the interface:

- The script responds to inputs and sends outputs

A program script can be written in JavaScript, ECMAScript, and other languages

- JavaScript is easier to program
- ECMAScript is essentially JavaScript

## Declaring a program script interface

For a JavaScript program script, typically give the script in the Script node's url field:

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
  <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
  <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
  <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
<![CDATA[ecmascript:
...
]]>
</Script>
```

### Classic Encoding

```vrml
DEF Bouncer Script {
  initializeOnly  SFFloat bounceHeight 3.0
  inputOnly       SFFloat set_fraction
  outputOnly      SFVec3f value_changed
  inputOutput     SFBool  enabled TRUE
  url "ecmascript: ..."
}
```

## Initializing a program script

The optional **initialize** function is called when the script is loaded:

```js
function initialize ()
{
   ...
}
```

Initialization occurs when:

- the [Script](/x_ite/components/scripting/script/) node is created (typically when the browser loads the world)

## Shutting down a program script

The optional **shutdown** function is called when the script is unloaded:

```js
function shutdown ()
{
    ...
}
```

Shutdown occurs when:

- the [Script](/x_ite/components/scripting/script/) node is deleted
- the browser loads a new world

## Responding to events

An input function can be declared for each input.

The input function is called each time an event is received, passing the event's:

- value
- time stamp

```js
function set_fraction (value, time)
{
   ...
}
```

## Processing events in JavaScript

If multiple events arrive at once, then multiple input functions are called.

The optional **eventsProcessed** function is called after all (or some) input functions have been called:

```js
function eventsProcessed ()
{
   ...
}
```

## Accessing fields from JavaScript

Each interface field is a ECMAScript variable:

- Read a variable to access the field value
- Write a variable to change the field value

```js
lastval      = bounceHeight; // get field
bounceHeight = newval;       // set field
```

## Accessing outputs from ECMAScript

Each interface output field is a ECMAScript variable

- Read a variable to access the last output field value
- Write a variable to send an event on the output field

```js
if (!enabled)
   return;

lastval           = value_changed [0];  // get last event
value_changed [0] = newval;             // send new event
```

## A sample JavaScript script

Create a Bouncing ball interpolator that computes a gravity-like vertical bouncing motion from a fractional time input.

Nodes needed:

### XML Encoding

```xml
<Transform DEF='Ball'>
  <!-- children ... -->
</Transform>

<TimeSensor DEF='Clock' ... />

<Script DEF='Bouncer ... />
```

### Classic Encoding

```vrml
DEF Ball Transform {
  children [ ... ]
}

DEF Clock TimeSensor {
   ...
}

DEF Bouncer Script {
  ...
}
```

Script fields needed:

- Bounce height

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
  <!-- ... -->
</Script>
```

### Classic Encoding

```vrml
DEF Bouncer Script {
  initializeOnly SFFloat bounceHeight 3.0
  ...
}
```

Inputs and outputs needed:

- Fractional time input
- Position value output
- Enabled input/output

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <!-- ... -->
  <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
  <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
  <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
  <!-- ... -->
</Script>
```

### Classic Encoding

```vrml
DEF Bouncer Script {
  ...
  inputOnly   SFFloat set_fraction
  outputOnly  SFVec3f value_changed
  inputOutput SFBool  enabled TRUE
  ...
}
```

Initialization and shutdown actions needed:

- None - all work done in input function

Event processing actions needed:

- *set\_fraction* input function
- No need for *eventsProcessed* function

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <!-- ... -->
<![CDATA[ecmascript:
function set_fraction (fraction, time)
{
   ...
}
]]>
</Script>
```

### Classic Encoding

```vrml
DEF Bouncer Script {
  ...
  url "ecmascript:
function set_fraction (fraction, time)
{
   ...
}
"
}
```

Calculations needed:

- Compute new ball position
- Send new position event

Use a ball position equation roughly based upon Physics:

- See comments in the X3D file for the derivation of the equation

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
  <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
  <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
  <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
<![CDATA[ecmascript:
function set_fraction (fraction, time)
{
   if (!enabled)
      return;

   var y = 4.0 * bounceHeight * fraction * (1.0 - fraction);

   value_changed [0] = 0.0;
   value_changed [1] = y;
   value_changed [2] = 0.0;
}
]]>
</Script>
```

### Classic Encoding

```vrml
DEF Bouncer Script {
  initializeOnly SFFloat bounceHeight 3
  inputOnly      SFFloat set_fraction
  outputOnly     SFVec3f value_changed
  inputOutput    SFBool  enabled TRUE

  url "ecmascript:
function set_fraction (fraction, time)
{
   if (!enabled)
      return;

   const y = 4.0 * bounceHeight * fraction * (1.0 - fraction);

   value_changed [0] = 0.0;
   value_changed [1] = y;
   value_changed [2] = 0.0;
}
"
}
```

Routes needed:

- Clock into script's *set\_fraction*
- Script's *value\_changed* into transform

### XML Encoding

```xml
<ROUTE fromNode='Clock' fromField='fraction_changed' toNode='Bouncer' toField='set_fraction'/>
<ROUTE fromNode='Bouncer' fromField='value_changed' toNode='Ball' toField='set_translation'/>
```

### Classic Encoding

```vrml
ROUTE Clock.fraction_changed TO Bouncer.set_fraction
ROUTE Bouncer.value_changed  TO Ball.set_translation
```

### XML Encoding

```xml
<?xml version="1.0" encoding="UTF-8"?>
<X3D profile='Full' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <Scene>
    <Transform DEF='Ball'>
      <Shape>
        <Appearance>
          <Material
              ambientIntensity='0.5'
              diffuseColor='1 1 1'
              specularColor='0.7 0.7 0.7'
              shininess='0.4'/>
          <ImageTexture
              url='"beach.jpg"'/>
          <TextureTransform
              scale='2 1'/>
        </Appearance>
        <Sphere/>
      </Shape>
    </Transform>

    <TimeSensor DEF='Clock'
        cycleInterval='2'
        loop='true'
        startTime='1'/>

    <Script DEF='Bouncer'>
      <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
      <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
      <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
      <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
<![CDATA[ecmascript:
function set_fraction (fraction, time)
{
   if (!enabled)
      return;

   var y = 4.0 * bounceHeight * fraction * (1.0 - fraction);

   value_changed [0] = 0.0;
   value_changed [1] = y;
   value_changed [2] = 0.0;
}
]]>
    </Script>

    <ROUTE fromNode='Clock' fromField='fraction_changed' toNode='Bouncer' toField='set_fraction'/>
    <ROUTE fromNode='Bouncer' fromField='value_changed' toNode='Ball' toField='set_translation'/>
  </Scene>
</X3D>
```

### Classic Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

DEF Ball Transform {
  children [
    Shape {
      appearance Appearance {
        material Material {
          ambientIntensity 0.5
          diffuseColor 1.0 1.0 1.0
          specularColor 0.7 0.7 0.7
          shininess 0.4
        }
        texture ImageTexture {
          url "beach.jpg"
        }
        textureTransform TextureTransform {
          scale 2.0 1.0
        }
      }
      geometry Sphere { }
    }
  ]
}

DEF Clock TimeSensor {
  cycleInterval 2.0
  startTime 1.0
  stopTime 0.0
  loop TRUE
}

DEF Bouncer Script {
  initializeOnly  SFFloat bounceHeight 3.0
  inputOnly  SFFloat set_fraction
  outputOnly SFVec3f value_changed
  inputOutput SFBool enabled TRUE

  url "ecmascript:
function set_fraction (fraction, time)
{
   if (!enabled)
      return;

   const y = 4.0 * bounceHeight * fraction * (1.0 - fraction);

   value_changed [0] = 0.0;
   value_changed [1] = y;
   value_changed [2] = 0.0;
}
"
}

ROUTE Clock.fraction_changed TO Bouncer.set_fraction
ROUTE Bouncer.value_changed  TO Ball.set_translation
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/bouncer/bouncer.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/bouncer/screenshot.png" alt="Bouncer"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/bouncer/bouncer.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/bouncer/bouncer.x3dv)
{: .example-links }

## Building user interfaces

Program scripts can be used to help create 3D user interface widgets:

- Toggle buttons
- Radio buttons
- Rotary dials
- Scrollbars
- Text prompts
- Debug message text

## Building a toggle switch

A toggle script turns on at 1st touch, off at 2nd:

- A [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) node can supply touch events

### XML Encoding

```xml
<Script DEF='Toggle'>
  <field accessType='inputOutput' type='SFBool' name='on' value='true'/>
  <field accessType='inputOnly' type='SFBool' name='set_active'/>
  <field accessType='outputOnly' type='SFBool' name='on_changed'/>
<![CDATA[ecmascript:
function set_active (value, time)
{
  if (value == false)
    return;

  if (on == TRUE)
    on = FALSE;
  else
    on = TRUE;

  on_changed = on;
}
]]>
</Script>
```

### Classic Encoding

```vrml
DEF Toggle Script {
  inputOutput  SFBool on TRUE
  inputOnly    SFBool set_active
  outputOnly   SFBool on_changed

  url "ecmascript:
function set_active (value, time)
{
  if (value == false)
    return;

  if (on == TRUE)
    on = FALSE;
  else
    on = TRUE;

  on_changed = on;
}
"
}
```

### Using a toggle switch

Use the toggle switch to make a lamp turn on and off

### XML Encoding

```xml
<TouchSensor DEF='LightSwitch'/>
<SpotLight DEF='LampLight' ... />

<Script DEF='Toggle' ... />

<ROUTE fromNode='LightSwitch' fromField='isActive' toNode='Toggle' toField='set_active'/>
<ROUTE fromNode='Toggle' fromField='on_changed' toNode='LampLight' toField='set_on'/>
```

### Classic Encoding

```vrml
DEF LightSwitch TouchSensor { }
DEF LampLight SpotLight { ... }

DEF Toggle Script { ... }

ROUTE LightSwitch.isActive TO Toggle.set_active
ROUTE Toggle.on_changed    TO LampLight.set_on
```

## Building a color selector

The lamp on and off, but the light bulb doesn't change color!

A color selector script sends an on color on a **TRUE** input, and an off color on a **FALSE** input.

### XML Encoding

```xml
<Script DEF='ColorSelector'>
  <field accessType='initializeOnly' type='SFColor' name='onColor' value='1 1 1'/>
  <field accessType='initializeOnly' type='SFColor' name='offColor'/>
  <field accessType='inputOnly' type='SFBool' name='set_selection'/>
  <field accessType='outputOnly' type='SFColor' name='color_changed'/>
<![CDATA[ecmascript:
function set_selection (value, time)
{
  if (value == true) color_changed = onColor;
  else               color_changed = offColor;
}
]]>
</Script>
```

### Classic Encoding

```vrml
DEF ColorSelector Script {
  initializeOnly  SFColor onColor  1.0 1.0 1.0
  initializeOnly  SFColor offColor 0.0 0.0 0.0
  inputOnly       SFBool  set_selection
  outputOnly      SFColor color_changed

  url "ecmascript:
function set_selection (value, time)
{
  if (value == true) color_changed = onColor;
  else               color_changed = offColor;
}
"
}
```

### Using a color selector

### XML Encoding

```xml
<TouchSensor DEF='LightSwitch'/>
<SpotLight DEF='LampLight' ... />

<Material DEF='BulbMaterial' ... />

<Script DEF='Toggle' ... />

<Script DEF='ColorSelector' ... />

<ROUTE fromNode='LightSwitch' fromField='isActive' toNode='Toggle' toField='set_active'/>
<ROUTE fromNode='Toggle' fromField='on_changed' toNode='LampLight' toField='set_on'/>
<ROUTE fromNode='Toggle' fromField='on_changed' toNode='ColorSelector' toField='set_selection'/>
<ROUTE fromNode='ColorSelector' fromField='color_changed' toNode='BulbMaterial' toField='set_emissiveColor'/>
```

### Classic Encoding

```vrml
DEF LightSwitch TouchSensor { }
DEF LampLight SpotLight { ... }

DEF BulbMaterial Material { ... }

DEF Toggle Script { ... }

DEF ColorSelector Script { ... }

ROUTE LightSwitch.isActive TO Toggle.set_active
ROUTE Toggle.on_changed    TO LampLight.set_on
ROUTE Toggle.on_changed    TO ColorSelector.set_selection
ROUTE ColorSelector.color_changed TO BulbMaterial.set_emissiveColor
```

## Summary

- The **initialize** and **shutdown** functions are called at load and unload
- An input function is called when an event is received
- The **eventsProcessed** function is called after all (or some) events have been received
- Functions can get field values and send event outputs
