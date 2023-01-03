---
title: Scene Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [scene, services]
---
## X3DExecutionContext

This section lists the methods available in the X3DExecutionContext object, which allows scripts to get access to the scene graph.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **specificationVersion**

The string represent the basic specification version used by the parsed file in decimal format. For example, a scene conforming to this specification returns a value such as "4.0". This property is read only.

#### **encoding**

Category Initial base unit
The encoding is represented as a string that describes the data encoding used. Valid values are "ASCII", "VRML", "XML", "BINARY", "SCRIPTED", "BIFS", "NONE". This property is read only.

#### **profile**

A reference to the ProfileInfo object used by this execution context. This property is read only.

#### **components**

A reference to the ComponentInfoArray object used by this execution context. This property is read only.

#### **units**

A reference to the UnitInfoArray object used by this execution context. This property is read only.

#### **worldURL**

A string containing the URL of this execution context. This property is read only.

#### **rootNodes**

When used inside a prototype instance, this property is not writable. The MFNode object instance is also not be writable. When used anywhere else, it is writable.

#### **protos**

A reference to the ProtoDeclarationArray object used by this execution context. This property is read only.

#### **externprotos**

A reference to the ExternProtoDeclarationArray object used by this execution context. This property is read only.

#### **routes**

A reference to the RouteArray object used by this execution context. This property is read only.

### Methods

#### SFNode **createNode** (*String typeName*)

Creates a new default instance of the node given by the *typeName* string containing the name of an X3D node type.

#### SFNode **createProto** (*String protoName*)

Creates a new default instance of the prototype given by the *protoName* string containing the name of an prototype or extern prototype of this execution context.

#### SFNode **getNamedNode** (*String name*)

Returns a reference to the named node named by the string *name.* If no named node with the name *name* exists an exception is throw.

#### void **updateNamedNode** (*String name, SFNode node*)

Creates or updates the named node referenced by *name.* This will give *node* a new name.

#### void **removeNamedNode** (*String name*)

Removes the named node *name.*

#### SFNode **getImportedNode** (*String importedName*)

Returns a reference to the imported node named by the string *importedName.* If no imported node with the imported name *importedName* exists an exception is throw.

#### void **updateImportedNode** (*SFNode inlineNode, String exportedName, String importedName*)

Creates or updates the imported node *importedName.* If not *importedName* is given *exportedName* is used as imported name. The node to import must be an exported node named by *exportedName* in *inlineNode.*

#### void **removeImportedNode** (*String importedName*)

Removes the imported node *importedName.*

#### X3DRoute **addRoute** (*SFNode sourceNode, String sourceField, SFNode destinationNode, String destinationField*)

Add a route from the passed *sourceField* to the passed *destinationField.* The return value is a X3DRoute object.

#### void **deleteRoute** (*X3DRoute route*)

Remove the route if it is connected.

## X3DScene

A scene is an extension of the execution context services with additional services provided.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

None.

### Methods

#### String **getMetaData** (*String name*)

Returns the metadata value associated with *name.*

#### void **setMetaData** (*String name, String value*)

Creates or updates the metadata with *name* and *value.*

#### void **removeMetaData** (*String name*)

Removes the metadata *name.*

#### void **addRootNode** (*SFNode node*)

Adds *node* to the list of root nodes. If the node already exists, the function silently returns.

#### void **removeRootNode** (*SFNode node*)

Removes *node* from the list of root nodes.

#### SFNode **getExportedNode** (*String exportedName*)

Returns a reference to the node with the exported name *exportedName.* If no exported node *exportedName* is found an exception is thrown.

#### void **updateExportedNode** (*String exportedName, SFNode node*)

Creates or updates the exported node *exportedName.*

#### void **removeExportedNode** (*String exportedName*)

Removes the exported node *exportedName.*

#### String **toVRMLString** (\[options\])

Returns the X3D VRML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this scene.

##### Options

An object with one or more of these properties:

* **style:** string, output style, one of: **"TIDY"**, "COMPACT", "SMALL", "CLEAN"
* **precision:** integer, float precision, default: 6
* **doublePrecision:** integer, double precision, default: 14

#### String **toXMLString** (\[options\])

Returns the X3D XML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this scene.

For options see toVRMLString.

#### String **toJSONString** (\[options\])

Returns the X3D JSON-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this scene.

For options see toVRMLString.

## ProfileInfo

This object stores information about a particular X3D profile.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **name**

A string of the formal name of this profile. This property is read only.

#### **level**

A number of the level of support of this instance. This property is read only.

#### **title**

A generic, freeform title string provided by the browser manufacturer. This property is read only.

#### **providerUrl**

If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.

#### **components**

An ComponentInfoArray object of the ComponentInfo object instances that make up this profile. This property is read only.

### Methods

None.

## ComponentInfo

The ComponentInfo object stores information about a particular X3D component. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **name**

A string of the formal name of this profile. This property is read only.

#### **level**

A number of the level of support of this instance. This property is read only.

#### **title**

A generic, freeform title string provided by the browser manufacturer. This property is read only.

#### **providerUrl**

If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.

### Methods

None.

## UnitInfo

The UnitInfo object stores information about a particular unit declaration. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **category**

The category of default unit being modified as defined in the table. This property is read only.

#### Standard units

<table style="height: 210px;" width="466">
   <thead>
      <tr>
         <th style="width: 229.833px;">Category</th>
         <th style="width: 384.167px;">Initial base unit</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td style="width: 229.833px;">angle</td>
         <td style="width: 384.167px;">radian</td>
      </tr>
      <tr>
         <td style="width: 229.833px;">force</td>
         <td style="width: 384.167px;">newton</td>
      </tr>
      <tr>
         <td style="width: 229.833px;">length</td>
         <td style="width: 384.167px;">metre</td>
      </tr>
      <tr>
         <td style="width: 229.833px;">mass</td>
         <td style="width: 384.167px;">kilogram</td>
      </tr>
   </tbody>
</table>

The base unit of time is seconds and cannot be changed.

Additional units, called *derived units* are used in this International Standard. A derived unit depends on the current base units. The value for a derived unit can be calculated using the appropriate formula from the table below.

#### Derived Units

<table>
   <thead>
      <tr>
         <th>Category</th>
         <th>Initial base unit</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>acceleration</td>
         <td>length/second<sup>2</sup></td>
      </tr>
      <tr>
         <td>angular_rate</td>
         <td>angle/second</td>
      </tr>
      <tr>
         <td>area</td>
         <td>length<sup>2</sup></td>
      </tr>
      <tr>
         <td>speed</td>
         <td>length/second</td>
      </tr>
      <tr>
         <td>volume</td>
         <td>length<sup>3</sup></td>
      </tr>
   </tbody>
</table>

The standard color space used by this International Standard is RGB where each color component has the range [0.,1.].

#### **name**

A string of the name assigned to the new default unit. This property is read only.

#### **conversionFactor**

The double-precision number needed to convert from the new default unit to the initial default unit. This property is read only.

### Methods

None.

## ProfileInfoArray

ProfileInfoArray is an object that represents an array of ProfileInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *profileInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **length**

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## ComponentInfoArray

ComponentInfoArray is an object that represents an array of ComponentInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *componentInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **length**

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## UnitInfoArray

UnitInfoArray is an object that represents an array of UnitInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *unitInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **length**

An integer containing the number of elements in the array. This property is read only.

### Methods

None
