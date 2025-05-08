---
title: Prototype Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Prototype, Services, Authoring, Interface]
---
## X3DProtoDeclaration

A PROTO declaration is represented by the X3DProtoDeclaration object. This object can only be fetched using the X3DExecutionContext object.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **name**: string

A string of the declared name of this prototype. This property is read only.

#### **fields**: FieldDefinitionArray

A reference to FieldDefinitionArray of all the fields defined for this prototype. This property is read only.

#### **isExternProto**: boolean

Always has the value of false. This property is read only.

### Methods

#### **newInstance** (): SFNode

Creates a new default instance of the prototype.

#### **toVRMLString** (options: Options): string

Returns the X3D VRML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

#### **toXMLString** (options: Options): string

Returns the X3D XML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

#### **toJSONString** (options: Options): string

Returns the X3D JSON-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

## X3DExternProtoDeclaration

An EXTERNPROTO declaration is represented by the X3DExternProtoDeclaration object. EXTERNPROTO declarations can only be fetched using the X3DExecutionContext object.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **name**: string

A string of the declared name of this extern prototype. This property is read only.

#### **fields**: FieldDefinitionArray

A reference to FieldDefinitionArray of all the fields defined for this extern prototype. This property is read only.

#### **urls**: MFString

A MFString array of all the URI's defined for this extern prototype. This property is read only.

#### **isExternProto**: boolean

Always has the value of true. This property is read only.

#### **loadState**: number

The value is one of the *_STATE* properties defined in the [X3DConstants](/x_ite/reference/constants-services/#load-state-constants) object. This property is read only.

### Methods

#### **newInstance** (): SFNode

Creates a new default instance of the extern prototype.

#### **loadNow** (): Promise\<void\>

Triggers the loading of the extern prototype. It returns a Promise that is resolved when the extern prototype is completely loaded and all instances are updated.

#### **toVRMLString** (options: Options): string

Returns the X3D VRML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this extern prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

#### **toXMLString** (options: Options): string

Returns the X3D XML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this extern prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

#### **toJSONString** (options: Options): string

Returns the X3D JSON-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, will produce this extern prototype.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string).

## ProtoDeclarationArray

ProtoDeclarationArray is an object that represents an array of X3DProtoDeclaration objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *protoDeclarationArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## ExternProtoDeclarationArray

ExternProtoDeclarationArray is an object that represents an array of X3DExternProtoDeclaration objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *externProtoDeclarationArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None
