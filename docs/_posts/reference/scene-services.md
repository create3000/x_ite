---
title: Scene Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Scene, Services, Authoring, Interface]
---
## X3DExecutionContext

This section lists the methods available in the X3DExecutionContext object, which allows scripts to get access to the scene graph.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **specificationVersion**: string

The string represent the basic specification version used by the parsed file in decimal format. For example, a scene conforming to this specification returns a value such as "4.0". This property is read only.

#### **encoding**: string

The encoding is represented as a string that describes the data encoding used. Valid values are "ASCII", "VRML", "XML", "BINARY", "SCRIPTED", "BIFS", "NONE". This property is read only.

#### **profile**: ProfileInfo | null

A reference to the ProfileInfo object used by this execution context. A value of `null` implies profile `Full`.  This property is read only.

#### **components**: ComponentInfoArray

A reference to the ComponentInfoArray object used by this execution context. This property is read only.

#### **worldURL**: string

A string containing the URL of this execution context. This property is read only.

#### **baseURL**: string

A string containing the URL against which relative URLs are resolved. This property is read only.

#### **units**: UnitInfoArray

A reference to the UnitInfoArray object used by this execution context. This property is read only.

#### **namedNodes**: NamedNodesArray

A reference to the NamedNodesArray object used by this execution context. This property is read only.

#### **importedNodes**: ImportedNodesArray

A reference to the ImportedNodesArray object used by this execution context. This property is read only.

#### **rootNodes**: MFNode

When used inside a prototype instance, this property is not writable. The MFNode object instance is also not be writable. When used anywhere else, it is writable.

#### **protos**: ProtoDeclarationArray

A reference to the ProtoDeclarationArray object used by this execution context. This property is read only.

#### **externprotos**: ExternProtoDeclarationArray

A reference to the ExternProtoDeclarationArray object used by this execution context. This property is read only.

#### **routes**: RouteArray

A reference to the RouteArray object used by this execution context. This property is read only.

### Methods

#### **createNode** (*typeName: string*): SFNode

Creates a new default instance of the node given by the *typeName* string containing the name of an X3D node type.

#### **createProto** (*protoName: string*): SFNode

Creates a new default instance of the prototype given by the *protoName* string containing the name of an prototype or extern prototype of this execution context.

#### **getNamedNode** (*name: string*): SFNode

Returns a reference to the named node named by the string *name.* If no named node with the name *name* exists an exception is throw.

#### **addNamedNode** (*name: string, node: SFNode*): void

Creates the named node referenced by *name.* This will give *node* a new name.

#### **updateNamedNode** (*name: string, node: SFNode*): void

Creates or updates the named node referenced by *name.* This will give *node* a new name.

#### **removeNamedNode** (*name: string*): void

Removes the named node *name.*

#### **getImportedNode** (*importedName: string*): SFNode

Returns a reference to the imported node named by the string *importedName.* If no imported node with the imported name *importedName* exists an exception is throw.

#### **addImportedNode** (*inlineNode: SFNode, exportedName: string, importedName: string*): void

Creates the imported node *importedName.* If not *importedName* is given *exportedName* is used as imported name. The node to import must be an exported node named by *exportedName* in *inlineNode.*

#### **updateImportedNode**  (*inlineNode: SFNode, exportedName: string, importedName: string*): void

Creates or updates the imported node *importedName.* If not *importedName* is given *exportedName* is used as imported name. The node to import must be an exported node named by *exportedName* in *inlineNode.*

#### **removeImportedNode** (*importedName: string*): void

Removes the imported node *importedName.*

#### **addRoute** (*sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string*): X3DRoute

Add a route from the passed *sourceField* to the passed *destinationField.* The return value is an X3DRoute object.

#### **deleteRoute** (*route: X3DRoute*): void

Remove the route if it is connected.

#### **deleteRoute** (*sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string*): void

Remove the route between the passed *sourceField* and passed *destinationField*, if one exists.

## X3DScene

A scene is an extension of the execution context services with additional services provided.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **exportedNodes**: ExportedNodesArray

A reference to the ExportedNodesArray object used by this execution context. This property is read only.

### Methods

#### **setProfile** (*profile: ProfileInfo*): void

Replaces the profile of this scene by the given *profile*. A profile of `null` is equivalent to a 'Full' profile.

#### **addComponent** (*component: ComponentInfo*): void

Adds the *component* to the list of components.

#### **updateComponent** (*component: ComponentInfo*): void

Updates the *component*.

#### **removeComponent** (*name: string*): void

Removes the component with the given *name*.

#### **updateUnit** (*category: string, name: string, conversionFactor: number*): void

Updates the *name* and the *conversion factor* of the unit specified by *category*.

#### **getUnit** (*category: string*): UnitInfo

Returns the UnitInfo object with the given *category*.

#### **getMetaData** (*name: string*): string []

Returns the metadata values array associated with *name*.

#### **setMetaData** (*name: string, value: string*): void

Creates or updates the metadata with *name* and *value.*

#### **setMetaData** (*name: string, values: string []*): void

Creates or updates the metadata with *name* and *values.* There must be at least one value in *values.*

#### **addMetaData** (*name: string, value: string*): void

Adds the metadata with *name* and *value.*

#### **removeMetaData** (*name: string*): void

Removes the metadata *name.*

#### **addRootNode** (*node: SFNode*): void

Adds *node* to the list of root nodes. If the node already exists, the function silently returns.

#### **removeRootNode** (*node: SFNode*): void

Removes *node* from the list of root nodes.

#### **getExportedNode** (*exportedName: string*): SFNode

Returns a reference to the node with the exported name *exportedName.* If no exported node *exportedName* is found an exception is thrown.

#### **addExportedNode** (*exportedName: string, node: SFNode*): void

Creates the exported node *exportedName.*

#### **updateExportedNode** (*exportedName: string, node: SFNode*): void

Creates or updates the exported node *exportedName.*

#### **removeExportedNode** (*exportedName: string*): void

Removes the exported node *exportedName.*

#### **toVRMLString** (options?: Options): string

Returns the X3D VRML-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.

##### Options

An object with one or more of these properties:

* **style:** string, output style, one of: **"TIDY"**, "COMPACT", "SMALL", "CLEAN"
* **indent:** string, initial indent, default: ""
* **precision:** integer, float precision, default: 7
* **doublePrecision:** integer, double precision, default: 15
* **html:** boolean, HTML style, default: false
* **closingTags:** boolean, use closing tags, default: false

#### **toXMLString** (options?: Options): string

Returns the X3D XML-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

#### **toJSONString** (options?: Options): string

Returns the X3D JSON-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

## ProfileInfo

This object stores information about a particular X3D profile.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **name**: string

A string of the formal name of this profile. This property is read only.

#### **title**: string

A generic, freeform title string provided by the browser manufacturer. This property is read only.

#### **providerURL**: string

If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.

#### **components**: ComponentInfoArray

An ComponentInfoArray object of the ComponentInfo object instances that make up this profile. This property is read only.

### Methods

None.

## ComponentInfo

The ComponentInfo object stores information about a particular X3D component. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **name**: string

A string of the formal name of this profile. This property is read only.

#### **level**: number

A number of the level of support of this instance. This property is read only.

#### **title**: string

A generic, freeform title string provided by the browser manufacturer. This property is read only.

#### **providerURL**: string

If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.

### Methods

None.

## UnitInfo

The UnitInfo object stores information about a particular unit declaration. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **category**: string

The category of default unit being modified as defined in the table. This property is read only.

#### Standard units

| Category | Initial base unit |
|----------|-------------------|
| angle    | radian            |
| force    | newton            |
| length   | metre             |
| mass     | kilogram          |

The base unit of time is seconds and cannot be changed.

Additional units, called *derived units* are used in this International Standard. A derived unit depends on the current base units. The value for a derived unit can be calculated using the appropriate formula from the table below.

#### Derived Units

| Category     | Initial base unit         |
|--------------|---------------------------|
| acceleration | length/second<sup>2</sup> |
| angular_rate | angle/second              |
| area         | length<sup>2</sup>        |
| volume       | length<sup>3</sup>        |

The standard color space used by this International Standard is RGB where each color component has the range [0.,1.].

#### **name**: string

A string of the name assigned to the new default unit. This property is read only.

#### **conversionFactor**: number

The double-precision number needed to convert from the new default unit to the initial default unit. This property is read only.

### Methods

None.

## X3DImportedNode

The X3DImportedNode object stores information about a particular import declaration. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **inlineNode**: SFNode

The SFNode object of the Inline node. This property is read only.

#### **exportedName**: string

A string of the exported name. This property is read only.

#### **exportedNode**: SFNode

The SFNode object of the exported node. This property is read only.

#### **importedName**: string

A string of the imported name. This property is read only.

## X3DExportedNode

The X3DExportedNode object stores information about a particular export declaration. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **exportedName**: string

A string of the exported name. This property is read only.

#### **localNode**: SFNode

The SFNode object of the corresponding node. This property is read only.

## ProfileInfoArray

ProfileInfoArray is an object that represents an array of ProfileInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *profileInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## ComponentInfoArray

ComponentInfoArray is an object that represents an array of ComponentInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *componentInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## UnitInfoArray

UnitInfoArray is an object that represents an array of UnitInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *unitInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## ImportedNodesArray

ImportedNodesArray is an object that represents an array of X3DImportedNode objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *importedNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## ExportedNodesArray

ExportedNodesArray is an object that represents an array of X3DExportedNode objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *exportedNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None
