---
title: Script Node Authoring Interface
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Script, Authoring, Interface]
---
## Overview

This is a reference for ECMAScript, a scripting language for X3D Script nodes. ECMAScript grew out of the need for a lightweight script language in X3D. It is a subset of the JavaScript language, with X3D data types supported as JavaScript built-in objects.

ECMAScript has many advantages:

- Scripts can be included in source form, inline rather than in a separate URL.
- All X3D data types are supported directly. Some, like the vector types have built in methods (such as cross product and normalize) to simplify working with them.
- Receiving input events is handled with separate functions to ease development and to speed processing.
- Sending output events is done with simple assignment.
- Scalar data (SFTime, SFInt32, SFFloat, SFBool) can be used directly in expressions. The JavaScript number object converts directly to any of the four scalar data types. For instance, you can add 3 seconds to an SFTime value with *a = time + 3;*
- Constructors are available for most data types to ease creation and conversion of data.
- A full set of JavaScript compatible math, date and string objects is available. The full set of JavaScript string methods and properties are available. Scalar values automatically convert to strings when concatenated. This makes construction of URL's and X3D strings (for use in createX3DFromString) easy.

## Objects and Variables

Data in ECMAScript is represented as objects. The object types correspond to the X3D field types. A variable contains an instance of an object, and can be predefined (appearing in the Script node) or defined locally.

### Values, Names and Literals

A ECMAScript variable holds an instance of an object. If a name is defined as a field or output field of the Script node containing the script then there is a variable with that same name available globally to the script. The type of this variable is always the type of the field or output field. Assignment to this variable converts the expression to its type or generates a run-time error if a conversion is not possible.

The names specified in the declaration of a function (the data value and the timestamp) are local to the function in which they are declared. It is a run-time error to assign to these variables.

Local variables can be created simply by assigning to a name that does not yet exist. Assigning to such a variable causes it take the type of the expression, so these local variables always have the type of the last assignment. Local variables are scoped by the block in which they were first introduced. Once that block is exited, the variable ceases to exist. Variables corresponding to outputOnly fields or initializeOnly fields of the Script node are global in scope.

Variable names must start with the a lowercase character ('a' through 'z'), an uppercase character ('A' through 'Z'), or an underscore ('_'). Subsequent characters can be any of these or a digit ('0' through '9'). Variable names are case sensitive.

Numeric, boolean, and string literals are allowed. Numeric literals can be integers in decimal (417), hex (0x5C), or octal (0177) notation. They can also be floating point numbers in fixed (1.76) or exponential (2.7e-12) notation. All numeric literals are of the number type. Boolean literals can be 'true' or 'false' and have the boolean type. String literals can be any sequence of UTF8 characters enclosed in single quotes ('), and have the type String. Special (non-printable) characters can be included in a string using the following escape sequences:

| Sequence | Meaning                   |
|----------|---------------------------|
| \\"      | double quote              |
| \\\\     | backslash                 |

<!-- Removed these escape sequences:
| \\b      | backspace                 |
| \\f      | form feed                 |
| \\n      | new line                  |
| \\r      | carriage return           |
| \\t      | tab                       |
| \\'      | single quote (apostrophe) |
-->

Here are some examples:

```vrml
Script {
  inputOnly       SFBool  anInputField
  outputOnly      SFInt32 anOutputField
  initializeOnly  SFFloat aField  0
  initializeOnly  SFVec3f aVector 0 0 0

  url "ecmascript:

function anInputField (value, time)
{
  let a = false;

  if (aField === 1.5)
  {
    a = true;   // 'a' contains a boolean
  }

  if (a)
  {
    value = 5;  // ATTENTION, 'value' now contains a number!
  }

  aField = anOutputField;  // SFInt32 converted to SFFloat

  let s = 'Two\\nLines';   // 's' contains a String
  let b = aField;          // 'b' contains a number

  b      = anOutputField;  // 'b' now contains a different number
  aField = aVector;        // ERROR, can't assign SFVec3f to SFFloat!

  const scene = Browser .currentScene; // Get current scene from browser.

  print (scene .rootNodes .length);    // Print number of root nodes.
}"
}
```

### Objects and Fields

For each field and outputOnly fields in the Script node containing the script there is a corresponding global variable with the same name. Field variables are persistent; they keep their last stored value across function calls. Local variables, on the other hand, are destroyed on exit from the block in which they were defined. Local variables defined in the outermost block of a function are destroyed when the function exits so they do not persist across function calls.

OutputOnly fields are very similar to field variables in that their values persist across function calls. But when an assignment is made to an outputOnly fields an event is generated.

Every object has a set of *properties* and *methods*. Properties are names on the object that can be selected (using the '.' operator) then used in an expression or as the target of an expression. Methods are names on the object that can be called (using the function call operator) to perform some operation on the object. For example:

```js
function someFunction ()
{
  let a = new SFColor (0.5, 0.5, 0.5);
  let b = a .r;                        // 'b' contains 0.5
  a .setHSV (0.1, 0.1, 0.1);           // 'a' now contains new properties
}
```

The value *a.r* selects the property which corresponds to the red component of the color. The value *a .setHSV ()* selects the method which sets the color in HSV space.

### Object Construction

For each object type there is a corresponding constructor. Constructors typically take a flexible set of parameters to allow construction of objects with any initial value. MF objects are essentially arrays so they always take 0 or more parameters of the corresponding SF object type. A value of a given data type is created using the *new* keyword with the data type name. For instance:

```js
let a = new SFVec3f (0, 1, 0);   // 'a' has a SFVec3f containing 0, 1, 0
let b = new MFFloat (1, 2, 3, 4) // 'b' has a MFFloat containing 4 floats
```

### Data Conversion

Combining objects of different types in a single expression or assignment statement will often perform implicit type conversion. Rules for this conversion are described in the following table:

<table>
   <thead>
      <tr>
         <th>Type</th>
         <th>Rules</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><b>String</b></td>
         <td>Combining a String with any number or boolean type produces a String.
             Use parseInt () or parseFloat to convert a String to a number.
         </td>
      </tr>
      <tr>
         <td><b>Number and boolean types</b></td>
         <td>Assigning a number or boolean expression to a fixed variable (initializeOnly field, outputOnly fields, or inputOutput fields) of scalar type (SFBool, SFDouble, SFFloat, SFInt32, SFTime) converts to the type of the fixed variable.
         </td>
      </tr>
      <tr>
         <td><b>Vector types</b><br>
            SFColor<br>
            SFColorRGBA<br>
            SFMatrix3d<br>
            SFMatrix3f<br>
            SFMatrix4d<br>
            SFMatrix4f<br>
            SFRotation<br>
            SFVec2d<br>
            SFVec2f<br>
            SFVec3d<br>
            SFVec3f<br>
            SFVec3d<br>
            SFVec4f
         </td>
         <td>Only combine with like types.<br>
             Dereference (foo[1]) produces a value of number type.
         </td>
      </tr>
      <tr>
         <td>SFImage</td>
         <td>Assignment ('=') and selection ('.') are the only allowed operations.<br>
             Can only assign SFImage type.
         </td>
      </tr>
      <tr>
         <td>SFNode</td>
         <td>Assignment ('=') and selection ('.') are the only allowed operations.<br>
             Can only assign SFNode type.
         </td>
      </tr>
      <tr>
         <td><b>MF types</b><br>
            MFBool<br>
            MFColor<br>
            MFColorRGBA<br>
            MFDouble<br>
            MFFloat<br>
            MFImage<br>
            MFInt32<br>
            MFMatrix3d<br>
            MFMatrix3f<br>
            MFMatrix4d<br>
            MFMatrix4f<br>
            MFNode<br>
            MFRotation<br>
            MFString<br>
            MFTime<br>
            MFVec2d<br>
            MFVec2f<br>
            MFVec3d<br>
            MFVec3f<br>
            MFVec4d<br>
            MFVec4f
         </td>
         <td>Only combine with like types.<br>
             Dereference (myArray[3]) produces the corresponding SF type.<br>
             Dereferenced SF types follow same rules as normal SF types.
         </td>
      </tr>
   </tbody>
</table>

### MF Objects

Most SF objects in ECMAScript have a corresponding MF object. An MFObject is essentially an array of objects, with each element of the array having the type of the corresponding SF object. All MF objects have a *length* property which returns or sets the number of elements in the MF object. Array indexes start at 0. If *vecArray* is an MFVec3f object then *vecArray[0]* is the first SFVec3f object in the array.

Dereferencing an MF object creates a new object of the corresponding SF object type with the contents of the dereferenced element. Assigning an SF object to a dereferenced MF object (which must be of the corresponding type) copies the contents of the SF object into the dereferenced element.

## Supported Protocol in the Script Node's *url* Field

The *url* field of the Script node may contain a URL that references ECMAScript code:

```vrml
Script { url "https://example.com/myScript.js" }
```

The *ecmascript:* protocol allows the script to be placed inline as follows:

```vrml
Script {
  url "ecmascript:

function foo () {
  ...
}
  "
}
```

The *url* field may contain multiple URL's and thus reference a remote file or in-line code:

```vrml
Script {
  url [
    "https://example.com/myScript.js",
    "ecmascript: function foo () { ... }"
  ]
}
```

### File Extension

The file extension for ECMAScript source code is **.js**.

### MIME Type

The MIME type for ECMAScript source code is defined as follows:

```
application/javascript
```

## InputOnly/InputOutput Field Handling

Events sent to the Script node are passed to the corresponding ECMAScript function in the script. It is necessary to specify the script in the *url* field of the Script node. The function's name is the same as the `inputOnly` field's name, and for `inputOutput` fields the name is the same as the inputOutput field's name with a `set_` prepended, and this function is passed two arguments, the event value and its timestamp. If there isn't a corresponding ECMAScript function in the script, the browser's behavior is undefined, and the event is probably ignored.

For example, the following Script node has two field, an inputOnly field, and an inputOutput field, named *start* and *duration*:

```vrml
Script {
  inputOnly SFBool start
  inputOutput SFTime duration 10
  url "ecmascript:

function start (value, time)
{
 ...
}

function set_duration (value, time)
{
 ...
}
  "
}
```

In the above example, when the *start* inputOnly field is sent the start () function is executed.

### Parameter Passing and the InputOnly Field Function

When a Script node receives an inputOnly field, a corresponding method in the file specified in the *url* field of the Script node is called, which has two arguments. The value of the inputOnly field is passed as the first argument and timestamp of the inputOnly field is passed as the second argument. The type of the value is the same as the type of the inputOnly field and the type of the timestamp is **SFTime**.

### initialize () Method

Authors may define a function named *initialize* which is called when the corresponding Script node has been loaded and before any events are processed. This can be used to prepare for processing before events are received, such as constructing geometry or initializing external mechanisms.

The *initialize* function takes no parameters. Events generated from it are given the timestamp of when the Script node was loaded.

### prepareEvents () Method

Authors may define a prepareEvents () method that is called only once per frame. prepareEvents () is called before any ROUTE processing and allows a Script to collect any asynchronously generated data, such as input from a network queue or the results of calling field listeners, and generate events to be handled by the browser's normal event processing sequence as if it were a built-in sensor node.

### eventsProcessed () Method

Authors may define a function named *eventsProcessed* which will be called after some set of events has been received. Some implementations will call this function after the return from each inputOnly field function, while others will call it only after processing a number of inputOnly field functions. In the latter case an author can improve performance by placing lengthy processing algorithms which do not need to be executed for every event received into the
*eventsProcessed* function.

**Example:**

The author needs to compute a complex inverse kinematics operation at each time step of an animation sequence. The sequence is single-stepped using a TouchSensor and button geometry. Normally the author would have an inputOnly field function execute whenever the button is pressed. This function would increment the time step then run the inverse kinematics algorithm. But this would execute the complex algorithm at every button press and the user could easily get ahead of the algorithm by clicking on the button rapidly. To solve this the inputOnly field function can be changed to simply increment the time step and the IK algorithm can be moved to an eventsProcessed function. In an efficient implementation the clicks would be queued. When the user clicks quickly the time step would be incremented once for each button click but the complex algorithm will be executed only once. This way the animation sequence will keep up with the user.

The *eventsProcessed* function takes no parameters. Events generated from it are given the timestamp of the last event processed.

### shutdown () Method

Authors may define a function named *shutdown* which is called when the corresponding Script node is deleted or the world containing the Script node is unloaded or replaced by another world. This can be used to send events informing external mechanisms that the Script node is being deleted so they can clean up files, etc.

The *shutdown* function takes no parameters. Events generated from it are given the timestamp of when the Script node was deleted.

## Accessing the Script Directly

Sometimes it is necessary to get access to the corresponding Script node. For this case, there is a special variable *this* in each callback function that holds a SFNode reference to the Script node.

```vrml
DEF Touch TouchSensor { }

Script {
  inputOnly      SFBool set_active
  initializeOnly SFNode touch USE Touch
  url "ecmascript:
...

// Initialize callback.
function initialize ()
{
  // Add route from TouchSensor to this Script.
  const scene = Browser .currentScene;
  const route = scene .addRoute (touch, 'isActive', this, 'set_active');
  print (this .getNodeName ());
}

// Callback for 'inputOnly SFBool set_active'.
function set_active (value, this)
{
  // ...
}
  "
  directOutput TRUE
}
```

## Accessing Fields

The initializeOnly, inputOnly, outputOnly, and inputOutput fields of a Script node are accessible from its ECMAScript functions. As in all other nodes the fields are accessible only within the Script. The Script's inputOnly fields can be routed to and its outputOnly fields can be routed from. Another Script node with a pointer to this node can access its inputOnly fields and outputOnly fields just like any other node.

### Accessing initializeOnly and outputOnly Fields of the Script

Fields defined in the Script node are available to the script by using its name. It's value can be read or written. This value is persistent across function calls. outputOnly fields defined in the script node can also be read. The value is the last value sent.

### Accessing initializeOnly and outputOnly Fields of Other Nodes

The script can access any inputOutput, inputOnly or outputOnly fields of any node to which it has a pointer:

```vrml
DEF SomeNode Transform { }

Script {
  inputOnly      SFVec3f    set_pos
  inputOutput    SFRotation rot
  initializeOnly SFNode     node USE SomeNode
  url "ecmascript:
...

// Callback for 'inputOnly SFVec3f set_pos'.
function set_pos (value)
{
  node .translation = value;
}

// Callback for 'inputOutput SFRotation rot'.
function set_rot (value)
{
  node .rotation = value;
}
  "
  directOutput TRUE
}
```

This sends a set_translation inputOnly field to the Transform node. An inputOnly field on a passed node can appear only on the left side of the assignment. An outputOnly fields or inputOutput field in the passed node can appear only on the right side, which reads the last value sent out. Fields in the passed node cannot be accessed, but inputOutput fields can either send an event to the »set_...« inputOnly field, or read the current value of the »..._changed« outputOnly fields. This follows the routing model of the rest of X3D.

### Sending OutputOnly Fields

Assigning to an outputOnly fields or inputOutput field sends that event at the completion of the currently executing function. This implies that assigning to the outputOnly field or inputOutput field multiple times during one execution of the function still only sends one event and that event is the last value assigned.
