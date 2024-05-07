---
title: Introducing Script Use
date: 2022-11-28
nav: tutorials-scripts-and-prototypes
categories: [Tutorials]
tags: [Introducing, Script]
---
## Motivation

Many actions are too complex for animation nodes:

- Computed animation paths (eg. gravity)
- Algorithmic shapes (eg. fractals)
- Collaborative environments (eg. games)

You can create new sensors, interpolators, etc., using program scripts written in:

- JavaScript - easy-to-learn language
- ECMAScript - same as JavaScript

## Syntax: Script

A [Script](/x_ite/components/scripting/script/) node selects a program script to run:

- *url* - choice of program script

### XML Encoding

```xml
<Script DEF='Bouncer'>
<![CDATA[ecmascript:
...
]]>
</Script>

<!-- or -->

<Script DEF='Bouncer'
    url='"bouncer.js"'/>
```

### Classic Encoding

```js
DEF Bouncer Script {
  url "ecmascript: ..."
  #or...
  url "bouncer.js"
}
```

## Defining the program script interface

A Script node also declares the program script interface:

- **initializeOnly, inputOnly, outputOnly, inputOutput** - inputs and outputs
  - Each has a name and data type
  - Fields have an initial value

### XML Encoding

```xml
<Script DEF='Bouncer'>
  <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
  <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
  <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
  <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
</Script>
```

### Classic Encoding

```js
DEF Bouncer Script {
  initializeOnly  SFFloat bounceHeight 3.0
  inputOnly       SFFloat set_fraction
  outputOnly      SFVec3f value_changed
  inputOutput     SFBool  enabled TRUE
}
```

## A sample using a program script

### XML Encoding

```xml
<TimeSensor DEF='Clock' ... />

<Transform DEF='Ball' ... />

<Script DEF='Bouncer'>
  <field accessType='initializeOnly' type='SFFloat' name='bounceHeight' value='3'/>
  <field accessType='inputOnly' type='SFFloat' name='set_fraction'/>
  <field accessType='outputOnly' type='SFVec3f' name='value_changed'/>
  <field accessType='inputOutput' type='SFBool' name='enabled' value='true'/>
<![CDATA[ecmascript:
...
]]>
</Script>

<ROUTE fromNode='Clock' fromField='fraction_changed' toNode='Bouncer' toField='set_fraction'/>
<ROUTE fromNode='Bouncer' fromField='value_changed' toNode='Ball' toField='set_translation'/>
```

### Classic Encoding

```js
DEF Clock TimeSensor { ... }

DEF Ball Transform { ... }

DEF Bouncer Script {
  initializeOnly  SFFloat bounceHeight 3.0
  inputOnly       SFFloat set_fraction
  outputOnly      SFVec3f value_changed
  inputOutput     SFBool  enabled TRUE
  url "ecmascript: ..."
}

ROUTE Clock.fraction_changed TO Bouncer.set_fraction
ROUTE Bouncer.value_changed  TO Ball.set_translation
```

## Summary

The [Script](/x_ite/components/scripting/script/) node selects a program script, specified by a URL.

Program scripts have field and event interface declarations, each with:

- A data type
- A name
- An initial value (fields only)
