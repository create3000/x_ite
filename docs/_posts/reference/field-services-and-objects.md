---
title: Field Services and Objects
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Field, Services, Objects, Authoring, Interface]
---
## X3DFieldDefinition

The X3DFieldDefinition object represents all of the descriptive properties of a single field of a node.

### Instance Creation Method(s)

None.

### Properties

#### **accessType**: number

Value from the [X3DConstants](/x_ite/reference/constants-services/#access-type-constants) object describing the accessType (e.g., `X3DConstants.inputOnly`). This property is read only.

#### **dataType**: number

Value from [X3DConstants](/x_ite/reference/constants-services/#field-type-constants) object describing the field's data type (e.g., `X3DConstants.SFBool`). This property is read only.

#### **name**: string

A string of the field name (e.g., `"children"`). This property is read only.

#### **value**: boolean | number | string | null | X3DField

The default value for this field. This property is read only.

#### **appInfo**: string

Short description or purpose of the field. This property is read only.

#### **documentation**: string

A string containing the documentation of this field. This property is read only.

### Methods

None.

## FieldDefinitionArray

FieldDefinitionArray is an object that represents an array of X3DFieldDefinition objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `fieldDefinitionArrayName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## Field Hierarchy

```
+ X3DField
  + SFColor
  + SFColorRGBA
  + SFImage
  + SFMatrix3d
  + SFMatrix3f
  + SFMatrix4d
  + SFMatrix4f
  + SFNode
  + SFRotation
  + SFVec2d
  + SFVec2f
  + SFVec3d
  + SFVec3f
  + SFVec4d
  + SFVec4f
  |
  + X3DArrayField
    + MFBool
    + MFColor
    + MFColorRGBA
    + MFDouble
    + MFFloat
    + MFImage
    + MFInt32
    + MFMatrix3d
    + MFMatrix3f
    + MFMatrix4d
    + MFMatrix4f
    + MFNode
    + MFRotation
    + MFString
    + MFVec2d
    + MFVec2f
    + MFVec3d
    + MFVec3f
    + MFVec4d
    + MFVec4f
```

## X3DField

The X3DField object is the base object of all SF* field and X3DArrayField.

### Instance Creation Method(s)

None

### Properties

None

### Methods

#### **getType** (): number

Returns one of the **Field Type Constants** from [X3DConstants](/x_ite/reference/constants-services/#field-type-constants) object.

#### **getTypeName** (): string

Returns the field type name.

#### **copy** (): X3DField

Returns a copy of this X3DField.

#### **equals** (*field: X3DField*): boolean

Returns true if the passed SF* or MF* *field* of the same type is equals to this object, otherwise false.

<!--
#### **addFieldCallback** (*key: any, callback: (value: any) => void*): void

Adds a field callback function, if external browser interface is used. *key* is a custom key of any type associated with the *callback*, this key can later be used to remove the callback. The callback is called when the field has been changed.

The callback has a signature of `function (value)`, where value is the current value of the field.

#### **removeFieldCallback** (*key: any*): void

Removes a field callback function associated with *key*.
-->

#### **dispose** (): void

Disposes this X3DField. The object can then no longer be used.

## SFColor Object

The SFColor object corresponds to an X3D SFColor field.

### Instance Creation Method(s)

#### *sfColorObjectName* = new **SFColor** ()

A new color initialized with zero values is created and returned.

#### *sfColorObjectName* = new **SFColor** (*r: number, g: number, b: number*)

*r, g,* and *b* are scalar values with the red, green, and blue values of the color in the range [0,1].

### Iterator

The `[@@iterator]()` method of SFColor instances implements the iterable protocol and allows SFColor objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFColor (... color); // Copy using spread syntax.
```

### Properties

Each component of the color can be accessed using the `r`, `g` and `b` properties or using the standard C-style dereferencing operator (e.g. `sfColorObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<3).

#### **r**: number
{: .writable }

Red component of the color.

#### **g**: number
{: .writable }

Green component of the color.

#### **b**: number
{: .writable }

Blue component of the color.

### Methods

#### **getHSV** (): Array

Return an array with the components of the color's HSV value.

<x3d-script-area title="X3D ECMAScript Demo: SFColor getHSV">
<pre>
const color = new SFColor (0, 0.5, 1);

print (color);
print (color .getHSV ());
// Expected output: 0 0.5 1
// Expected output: 3.665191429188092,1,1
</pre>
</x3d-script-area>

#### **setHSV** (*h: number, s: number, v: number*): void

Sets a HSV color value; *h* is the hue, *s* is the saturation and *v* is the value component of the HSV color.

The saturation and value component must be in the range [0,1], and the hue component must be in the range [0,2π].

#### **linearToSRGB** (): SFColor

Returns a SFColor object whose value is converted to sRGB color space.

#### **sRGBToLinear** (): SFColor

Returns a SFColor object whose value is converted to linear color space.

#### **lerp** (*destination: SFColor, t: number*): SFColor

Linearly interpolates in HSV space between source color and destination color by an amount of t.

## SFColorRGBA Object

The SFColorRGBA object corresponds to an X3D SFColorRGBA field.

### Instance Creation Method(s)

#### *sfColorRGBAObjectName* = new **SFColorRGBA** ()

A new color initialized with zero values is created and returned.

#### *sfColorRGBAObjectName* = new **SFColorRGBA** (*r: number, g: number, b: number, a: number*)

*r, g, b* and *a* are scalar values with the red, green and blue values of the color in the range [0,1].

### Iterator

The `[@@iterator]()` method of SFColorRGBA instances implements the iterable protocol and allows SFColorRGBA objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFColorRGBA (... color); // Copy using spread syntax.
```

### Properties

Each component of the color can be accessed using the `r`, `g`, `b` and `a` properties or using the standard C-style dereferencing operator (e.g. `sfColorRGBAObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<4).

#### **r**: number
{: .writable }

Red component of the color.

#### **g**: number
{: .writable }

Green component of the color.

#### **b**: number
{: .writable }

Blue component of the color.

#### **a**: number
{: .writable }

Alpha component of the color.

### Methods

#### **getHSVA** (): Array

Return an array with the components of the color's HSVA value.

#### **setHSVA** (*h: number, s: number, v: number, a: number*): void

Sets a HSVA color value; *h* is the hue, *s* is the saturation, *v* is the value and *a* is the alpha component of the HSVA color.

The saturation, value and alpha component must be in the range [0,1], and the hue component must be in the range [0,2π].

#### **linearToSRGB** (): SFColorRGBA

Returns a SFColorRGBA object whose value is converted to sRGB color space.

#### **sRGBToLinear** (): SFColorRGBA

Returns a SFColorRGBA object whose value is converted to linear color space.

#### **lerp** (*destination: SFColorRGBA, t: number*): SFColorRGBA

Linearly interpolates in HSVA space between source color and destination color by an amount of t.

## SFImage Object

The SFImage object corresponds to an X3D SFImage field.

### Instance Creation Method(s)

#### *sfImageObjectName* = new **SFImage** ()

A new image initialized with zero values is created and returned.

#### *sfImageObjectName* = new **SFImage** (*width: number, height: number, components: number, array?: MFInt32*)

*width* is the width in pixels of the image.
*height* is the height in pixels of the image.
*components* are the number of components of the image (0-4).
*array* is a optional MFInt32 array with pixel data.

### Iterator

The `[@@iterator]()` method of SFImage instances implements the iterable protocol and allows SFImage objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFImage (... image); // Copy using spread syntax.
```

### Properties

#### **width**: number
{: .writable }

Width of the image in pixels.

#### **height**: number
{: .writable }

Height of the image in pixels.

#### **comp**: number
{: .writable }

Number of components.

#### **array**: MFInt32
{: .writable }

A MFInt32 array corresponding to the pixels of the image.

### Methods

None

## SFMatrix3d/SFMatrix3f Object

The SFMatrix3d/f object provides many useful methods for performing manipulations on 3×3 matrices.

### Instance Creation Method(s)

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** ()

A new matrix initialized with the identity matrix is created and returned.

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*r1: SFVec3d/f, r2: SFVec3d/f, r3: SFVec3d/f*)

A new matrix initialized with the vectors in *r1* through *r3* of type SFVec3d/f is created and returned.

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*f11: number, f12: number, f13: number, f21: number, f22: number, f23: number, f31: number, f32: number, f33: number*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

### Iterator

The `[@@iterator]()` method of SFMatrix3d/f instances implements the iterable protocol and allows SFMatrix3d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFMatrix3d (... matrix); // Copy using spread syntax.
```

### Properties

Individual elements of the object can be referenced using the standard C-style dereferencing operator (e.g. `sfMatrix3d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<9).

### Methods

#### **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*): void

Sets the SFMatrix3d/f to the passed values. *translation* is an SFVec2d/f object, *rotation* is a Number, *scaleFactor* is a SFVec2d/f object, *scaleOrientation* is a Number and *center* is a SFVec2d/f object.

Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### **getTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*): void

Decomposes the SFMatrix3d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects*. rotation* is a SFVec3d/f, where x and y are the complex value of the rotation and z is the rotation angle in radians. The other types of the parameters are the same as in **setTransform**.

Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

A center of any value can be specified around which the rotation and scaling will take place.

#### **determinant** (): number

Returns the determinant of this object's matrix.

#### **inverse** (): SFMatrix3d/f

Returns a SFMatrix whose value is the inverse of this object.

#### **transpose** (): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the transpose of this object.

#### **multLeft** (*matrix: SFMatrix3d/f*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the left.

#### **multRight** (*matrix: SFMatrix3d/f*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the right.

#### **multVecMatrix** (*vec: SFVec2d/f*): SFVec2d/f

Returns a SFVec2d/f whose value is the object multiplied by the passed row vector.

#### **multVecMatrix** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.

#### **multMatrixVec** (*vec: SFVec2d/f*): SFVec2d/f

Returns a SFVec2d/f whose value is the object multiplied by the passed column vector.

#### **multMatrixVec** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.

#### **multDirMatrix** (*vec: SFVec2d/f*): SFVec2d/f

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed row vector.

#### **multMatrixDir** (*vec: SFVec2d/f*): SFVec2d/f

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed column vector.

#### **translate** (*translation: SFVec2d/f*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object translated by the passed *translation* on the left.

#### **rotate** (*rotation: number*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object rotated by the passed *rotation* (in radians) on the left.

#### **scale** (*scale: SFVec2d/f*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object scaled by the passed *scale* on the left.

#### **skewX** (*angle: number*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object skewed by the passed *angle* (in radians) on the left.

#### **skewY** (*angle: number*): SFMatrix3d/f

Returns a SFMatrix3d/f whose value is the object skewed by the passed *angle* (in radians) on the left.

## SFMatrix4d/SFMatrix4f Object

The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices.

### Instance Creation Method(s)

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** ()

A new matrix initialized with the identity matrix is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*r1: SFVec4d/f, r2: SFVec4d/f, r3: SFVec4d/f, r4: SFVec4d/f*)

A new matrix initialized with the vectors in *r1* through *r4* of type SFVec4d/f is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*f11: number, f12: number, f13: number, f14: number, f21: number, f22: number, f23: number, f24: number, f31: number, f32: number, f33: number, f34: number, f41: number, f42: number, f43: number, f44: number*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

### Iterator

The `[@@iterator]()` method of SFMatrix4d/f instances implements the iterable protocol and allows SFMatrix4d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFMatrix4d (... matrix); // Copy using spread syntax.
```

### Properties

Individual elements of the object can be referenced using the standard C-style dereferencing operator (e.g. `sfMatrix4d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<16).

### Methods

#### **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*): void

Sets the SFMatrix4d/f to the passed values. *translation* is an SFVec3d/f object, *rotation* is a SFRotation object, *scaleFactor* is a SFVec3d/f object, *scaleOrientation* is a SFRotation object and *center* is a SFVec3d/f object.

Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### **getTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*): void

Decomposes the SFMatrix4d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects. The types of the parameters are the same as in **setTransform**.

Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

A center of any value can be specified around which the rotation and scaling will take place.

#### **determinant** (): number

Returns the determinant of this object's matrix.

#### **inverse** (): SFMatrix4d/f

Returns a SFMatrix whose value is the inverse of this object.

#### **transpose** (): SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the transpose of this object.

#### **multLeft** (*matrix: SFMatrix4d/f*): SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the left.

#### **multRight** (*matrix: SFMatrix4d/f*): SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the right.

#### **multVecMatrix** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.

#### **multVecMatrix** (*SFVec4d/f vec*): SFVec4d/f

Returns a SFVec4d/f whose value is the object multiplied by the passed row vector.

#### **multMatrixVec** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.

#### **multMatrixVec** (*SFVec4d/f vec*): SFVec4d/f

Returns a SFVec4d/f whose value is the object multiplied by the passed column vector.

#### **multDirMatrix** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed row vector.

#### **multMatrixDir** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed column vector.

#### **translate** (*translation: SFVec3d/f*):  SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the object translated by the passed *translation* on the left.

#### **rotate** (*rotation: SFRotation*):  SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the object rotated by the passed *rotation* on the left.

#### **scale** (*scale: SFVec3d/f*):  SFMatrix4d/f

Returns a SFMatrix4d/f whose value is the object scaled by the passed *scale* on the left.

## SFNode Object

The SFNode object corresponds to an X3D SFNode field.

### Instance Creation Method(s)

#### *sfNodeObjectName* = new **SFNode** (*vrmlSyntax: string*)

*vrmlSyntax* is a UTF-8 string containing the definition of an X3D node.

>**Attention:** This constructor is only available inside [Script](/x_ite/components/scripting/script/) nodes. If the specification version is greater than **2.0**, SFNode will throw an error when instantiated directly, use [X3DExecutionContext.createNode](/x_ite/reference/scene-services/#createnode-typename-string-sfnode) or [X3DExecutionContext.createProto](/x_ite/reference/scene-services/#createproto-protoname-string-sfnode) instead.
{: .prompt-danger }

### Properties

Each node may be assigned values to its **initializeOnly,** **inputOnly** and **inputOutput** fields and obtain the last output values of its **initializeOnly,** **outputOnly** and **inputOutput** fields using the `sfNodeObjectName.fieldName` syntax. The *directOutput* field of a corresponding [Script](/x_ite/components/scripting/script/) node must then be set to `TRUE`.

When you assign to a field of type `SFBool`, `SFDouble`, `SFFloat`, `SFInt32`, `SFString` or `SFTime` use plain JavaScript types like boolean, number or string, otherwise use the provided X3D field types:

```js
material .diffuseColor = new SFColor (1, 1, 1);
material .transparency = 0.5;
```

### Methods

#### **addFieldCallback** (*key: any, name: string, callback: (value: any) => void*): void

Adds a field callback function, if external browser interface is used. *key* is a custom key of any type associated with the *callback*, this key can later be used to remove the callback. *name* is the name of the field to which the callback should be connected. The callback is called when the field has been changed.

The callback has a signature of `function (value)`, where value is the current value of the field.

```js
visibilitySensor .addFieldCallback ("log", "enterTime", time =>
{
  console .log (`You have entered the world at ${time}.`);
});
```

#### **getFieldDefinition** (*name: string*): X3DFieldDefinition

Returns the corresponding [X3DFieldDefinition](/x_ite/reference/field-services-and-objects/#x3dfielddefinition) object associated with *name*.

#### **getFieldDefinitions** (): FieldDefinitionArray

Returns a list of fields defined for the SFNode object.

#### **getNodeName** (): string

Returns the node name.

#### **getNodeType** (): number []

Returns, in the array, a list of constant values that indicate node types as provided in the [X3DConstants](/x_ite/reference/constants-services/#x3dconstants) object.

See [Concrete Node Types](/x_ite/reference/constants-services/#concrete-node-types) and [Abstract Node Types](/x_ite/reference/constants-services/#abstract-node-types).

#### **getNodeTypeName** (): string

Returns the node type name.

#### **removeFieldCallback** (key: any, name: string): void

Removes a field callback function associated with *key* and *name* from the field.

#### **toVRMLString** (options?: Options): string

Returns the X3D VRML-encoded string that, if parsed as the value of an SFNode field, will produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

#### **toXMLString** (options?: Options): string

Returns the X3D XML-encoded string that, if parsed as the value of an SFNode field, will produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

#### **toJSONString** (options?: Options): string

Returns the X3D JSON-encoded string that, if parsed as the value of an SFNode field, will produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

## SFRotation Object

The SFRotation object corresponds to an X3D SFRotation field.

### Instance Creation Method(s)

#### *sfRotationObjectName* = new **SFRotation** ()

A new rotation initialized with the identity rotation is created and returned.

#### *sfRotationObjectName* = new **SFRotation** (*x: number, y: number, z: number, angle: number*)

*x*, *y*, and *z* are the axis of the rotation.
*angle* is the angle of the rotation (in radians). All values are scalar.

#### *sfRotationObjectName* = new **SFRotation** (*axis: SFVec3d/f, angle: number*)

*axis* is a SFVec3d/f object whose value is the axis of rotation.
*angle* is the scalar angle of the rotation (in radians).

#### *sfRotationObjectName* = new **SFRotation** (*fromVector: SFVec3d/f, toVector: SFVec3d/f*)

*fromVector* and *toVector* are SFVec3d/f valued objects. These vectors are normalized and the rotation value that would rotate from the *fromVector* to the *toVector* is stored in the object.

<x3d-script-area title="X3D ECMAScript Demo: new SFRotation (fromVector, toVector)">
<pre>
const from     = new SFVec3f (0, 0, 1);
const to       = new SFVec3f (1, 0, 0);
const rotation = new SFRotation (from, to);

print (rotation);
// Expected output: 0 1 0 1.5707963267949
</pre>
</x3d-script-area>

#### *sfRotationObjectName* = new **SFRotation** (*matrix: SFMatrix3d/f*)

*matrix* is an SFMatrix3d/f rotation matrix object whose value is converted into an SFRotation object.

### Iterator

The `[@@iterator]()` method of SFRotation instances implements the iterable protocol and allows SFRotation objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFRotation (... rotation); // Copy using spread syntax.
```

### Properties

Each component of the rotation can be accessed using the `x`, `y`, `z` and `angle` properties or using the standard C-style dereferencing operator (e.g. `sfRotationObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<4).

#### **x**: number
{: .writable }

Returns the first value of the axis vector.

#### **y**: number
{: .writable }

Returns the second value of the axis vector.

#### **z**: number
{: .writable }

Returns the third value of the axis vector

#### **angle**: number
{: .writable }

A number corresponding to the angle of the rotation (in radians).

### Methods

#### **getAxis** (): number

Returns the axis of rotation as an SFVec3f object.

#### **getMatrix** (): SFMatrix3f

Returns the rotation matrix as an SFMatrix3f object.

#### **getQuaternion** (): number []

Returns the underlying quaternion as Array with the four values [x, y, z, w].

#### **inverse** (): SFRotation

Returns a SFRotation object whose value is the inverse of this object's rotation.

#### **multiply** *(rotation: SFRotation*): SFRotation

Returns an SFRotation whose value is the object multiplied by the passed SFRotation.

#### **multVec** (*vec: SFVec3d/f*): SFVec3d/f

Returns a SFVec3f whose value is the SFVec3f *vec* multiplied by the matrix corresponding to this object's rotation.

<x3d-script-area title="X3D ECMAScript Demo: SFRotation multVec">
<pre>
const rotation = new SFRotation (0, 1, 0, Math .PI / 2);
const vector   = new SFVec3f (0, 0, 1);

print (rotation);
print (vector);
print (rotation .multVec (vector));
// Expected output: 0 1 0 1.5707963267949
// Expected output: 0 0 1
// Expected output: 1 0 0
</pre>
</x3d-script-area>

#### **setAxis** (*vec: SFVec3d/f*): void

Set the axis of rotation to the vector passed in *vec*.

#### **setMatrix** (*matrix: SFMatrix3d/f*): void

Set the value of this rotation to the rotation matrix passed in *matrix*.

#### **setQuaternion** (*x: number, y: number, z: number, w: number*): void

Set the value of this rotation to the quaternion passed in *x, y, z, w*.

#### **slerp** (*destRotation: SFRotation, t: number*): SFRotation

Returns a SFRotation whose value is the spherical linear interpolation between this object's rotation and *destRotation* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's rotation. For *t* = 1, the value is *destRotation*.

#### **straighten** (*upVector?: SFVec3d/f = new SFVec3f (0, 1, 0)*): SFRotation

Straightens the rotation so that the x-axis of the resulting rotation is parallel to the plane spawned by upVector. The default  value for *upVector* is the y-axis.

## SFVec2d/SFVec2f Object

The SFVec2d/f object corresponds to an X3D SFVec2d/f field.

### Instance Creation Method(s)

#### *sfVec2d/fObjectName* = new **SFVec2d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec2d/fObjectName* = new **SFVec2d/f** (*x: number, y: number*)

Constructs a SFVec2d/f from *x* and *y*, where *x* and *y* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec2d/f instances implements the iterable protocol and allows SFVec2d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec2d (... vector); // Copy using spread syntax.
```

### Properties

Each component of the vector can be accessed using the `x` and `y` properties or using the standard C-style dereferencing operator (e.g. `sfVec2d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<2).

#### **x**: number
{: .writable }

Returns the first value of the vector.

#### **y**: number
{: .writable }

Returns the second value of the vector.

### Methods

#### **abs** (): SFVec2d/f

Returns an SFVec2d/f whose value is the componentwise absolute value of the object.

#### **add** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the passed SFVec2d/f added, componentwise, to the object.

<x3d-script-area title="X3D ECMAScript Demo: SFVec2f add">
<pre>
const a = new SFVec2f (1, 2);
const b = new SFVec2f (2, 3);

print (a);
print (b);
print (a .add (b));
// Expected output: 1 2
// Expected output: 2 3
// Expected output: 3 5
</pre>
</x3d-script-area>

#### **clamp** (*low: SFVec2d/f, high: SFVec2d/f*): SFVec2d/f

Returns the elements of this object constrained to the range *low* to *high*. The returned value is computed as `min(max(x, low), high)`.

#### **distance** (*other: SFVec2d/f*): number

Returns the distance of this vector to SFVec2d/f *other*.

#### **divide** (*denominator*): SFVec2d/f

Returns an SFVec2d/f whose value is the object divided by the passed numeric value.

#### **divVec** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the object divided, componentwise, by the passed SFVec2d/f *other*.

#### **dot** (*other: SFVec2d/f*): number

Returns the dot product of this vector and SFVec2d/f *other*.

#### **inverse** (): SFVec2d/f

Returns an SFVec2d/f whose value is the componentwise inverse of the object.

#### **length** (): number

Returns the geometric length of this vector.

#### **lerp** (*destination:  SFVec2d/f, t: number*): SFVec2d/f

Returns a SFVec2d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

#### **min** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the componentwise minimum of the passed SFVec2d/f and the object.

#### **max** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the componentwise maximum of the passed SFVec2d/f and the object.

#### **multiply** (*factor: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the object multiplied by the passed numeric value.

#### **multVec** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the passed SFVec2d/f multiplied, componentwise, with the object.

#### **negate** (): SFVec2d/f

Returns an SFVec2d/f whose value is the componentwise negation of the object.

#### **normalize** (): SFVec2d/f

Returns an SFVec2d/f of object converted to unit length.

#### **subtract** (*other: SFVec2d/f*): SFVec2d/f

Returns an SFVec2d/f whose value is the passed SFVec2d/f subtracted, componentwise, from the object.

## SFVec3d/SFVec3f Object

The SFVec3d/f object corresponds to an X3D SFVec3d/f field.

### Instance Creation Method(s)

#### *sfVec3d/fObjectName* = new **SFVec3d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec3d/fObjectName* = new **SFVec3d/f** (*x: number, y: number, z: number*)

Constructs a SFVec3d/f from *x*, *y* and *z*, where *x*, *y* and *z* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec3d/f instances implements the iterable protocol and allows SFVec3d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec3d (... vector); // Copy using spread syntax.
```

### Properties

Each component of the vector can be accessed using the `x`, `y` and `z` properties or using the standard C-style dereferencing operator (e.g. `sfVec3d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<3).

#### **x**: number
{: .writable }

Returns the first value of the vector.

#### **y**: number
{: .writable }

Returns the second value of the vector.

#### **z**: number
{: .writable }

Returns the third value of the vector.

### Methods

#### **abs** (): SFVec3d/f

Returns an SFVec3d/f whose value is the componentwise absolute value of the object.

#### **add** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the passed SFVec3d/f added, componentwise, to the object.

#### **clamp** (*low: SFVec3d/f, high: SFVec3d/f*): SFVec3d/f

Returns the elements of this object constrained to the range *low* to *high*. The returned value is computed as `min(max(x, low), high)`.

#### **cross** (*other: SFVec3d/f*): SFVec3d/f

Returns the cross product of the object and the passed SFVec3d/f *other*.

#### **distance** (*other: SFVec3d/f*): number

Returns the distance of this vector to SFVec3d/f *other*.

#### **divide** (*denominator*): SFVec3d/f

Returns an SFVec3d/f whose value is the object divided by the passed numeric value.

#### **divVec** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the object divided, componentwise, by the passed SFVec3d/f *other*.

#### **dot** (*other: SFVec3d/f*): number

Returns the dot product of this vector and SFVec3d/f *other*.

#### **inverse** (): SFVec3d/f

Returns an SFVec3d/f whose value is the componentwise inverse of the object.

#### **length** (): number

Returns the geometric length of this vector.

#### **lerp** (*destination:  SFVec3d/f, t: number*): SFVec3d/f

Returns a SFVec3d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

<x3d-script-area title="X3D ECMAScript Demo: SFVec3f lerp">
<pre>
const a = new SFVec3f (1, 2, 3);
const b = new SFVec3f (2, 3, 4);

print (a);
print (b);
print (a .lerp (b, 0.5));
// Expected output: 1 2 3
// Expected output: 2 3 4
// Expected output: 1.5 2.5 3.5
</pre>
</x3d-script-area>

#### **min** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the componentwise minimum of the passed SFVec3d/f and the object.

#### **max** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the componentwise maximum of the passed SFVec3d/f and the object.

#### **multiply** (*factor: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the object multiplied by the passed numeric value.

#### **multVec** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the passed SFVec3d/f multiplied, componentwise, with the object.

#### **negate** (): SFVec3d/f

Returns an SFVec3d/f whose value is the componentwise negation of the object.

#### **normalize** (): SFVec3d/f

Returns an SFVec3d/f of object converted to unit length

#### **subtract** (*other: SFVec3d/f*): SFVec3d/f

Returns an SFVec3d/f whose value is the passed SFVec3d/f subtracted, componentwise, from the object.

## SFVec4d/SFVec4d/f Object

The SFVec4d/f object corresponds to an X3D SFVec4d/f field.

### Instance Creation Method(s)

#### *sfVec4d/fObjectName* = new **SFVec4d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec4d/fObjectName* = new **SFVec4d/f** (*x: number, y: number, z: number, w: number*)

Constructs a SFVec4d/f from *x*, *y*, *z* and *w*, where *x*, *y*, *z* and *w* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec4d/f instances implements the iterable protocol and allows SFVec4d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec4d (... vector); // Copy using spread syntax.
```

### Properties

Each component of the vector can be accessed using the `x`, `y`, `z` and `w` properties or using the standard C-style dereferencing operator (e.g. `sfVec4d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<4).

#### **x**: number
{: .writable }

Returns the first value of the vector.

#### **y**: number
{: .writable }

Returns the second value of the vector.

#### **z**: number
{: .writable }

Returns the third value of the vector.

#### **w**: number
{: .writable }

Returns the fourth value of the vector.

### Methods

#### **abs** (): SFVec4d/f

Returns an SFVec4d/f whose value is the componentwise absolute value of the object.

#### **add** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the passed SFVec4d/f added, componentwise, to the object.

#### **clamp** (*low: SFVec4d/f, high: SFVec4d/f*): SFVec4d/f

Returns the elements of this object constrained to the range *low* to *high*. The returned value is computed as `min(max(x, low), high)`.

#### **distance** (*other: SFVec4d/f*): number

Returns the distance of this vector to SFVec4d/f *other*.

#### **divide** (*denominator*): SFVec4d/f

Returns an SFVec4d/f whose value is the object divided by the passed numeric value.

#### **divVec** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the object divided, componentwise, by the passed SFVec4d/f *other*.

#### **dot** (*other: SFVec4d/f*): number

Returns the dot product of this vector and SFVec4d/f *other*.

#### **inverse** (): SFVec4d/f

Returns an SFVec4d/f whose value is the componentwise inverse of the object.

#### **length** (): number

Returns the geometric length of this vector.

#### **lerp** (*destination:  SFVec4d/f, t: number*): SFVec4d/f

Returns a SFVec4d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

#### **min** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the componentwise minimum of the passed SFVec4d/f and the object.

#### **max** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the componentwise maximum of the passed SFVec4d/f and the object.

#### **multiply** (*factor: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the object multiplied by the passed numeric value.

#### **multVec** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the passed SFVec4d/f multiplied, componentwise, with the object.

#### **negate** (): SFVec4d/f

Returns an SFVec4d/f whose value is the componentwise negation of the object.

#### **normalize** (): SFVec4d/f

Returns an SFVec4d/f of object converted to unit length.

#### **subtract** (*other: SFVec4d/f*): SFVec4d/f

Returns an SFVec4d/f whose value is the passed SFVec4d/f subtracted, componentwise, from the object.

## X3DArrayField

The X3DArrayField object is the base object of all MF* objects. It is used to store a one-dimensional array of the corresponding SF* objects.

### Instance Creation Method(s)

None

### Iterator

The `[@@iterator]()` method of X3DArrayField instances implements the iterable protocol and allows X3DArrayField objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the elements of the array in order.

```js
const copy = new MFBool (... array); // Copy using spread syntax.
```

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `X3DArrayFieldObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.0.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### **equals** (*array: X3DArrayField*): boolean

Returns true if the passed MF* *array* of the same type is equals to this object, otherwise false.

#### Other Array functions

Common Array functions like `at`, `entries`, `every`, `fill`, `filter`, `find`, `findIndex`, `findLast`, `findLastIndex`, `forEach`, `includes`, `indexOf`, `join`, `keys`, `lastIndexOf`, `map`, `pop`, `push`, `reduce`, `reduceRight`, `reverse`, `shift`, `slice`, `some`, `sort`, `splice`, `toReversed`, `toSorted`, `toSpliced`, `unshift`, `values`, `with` are also available.

## MFBool Object

The MFBool object corresponds to an X3D MFBool field. It is used to store a one-dimensional array of SFBool objects.

### Instance Creation Method(s)

#### *mfBoolObjectName* = new **MFBool** (*... values: boolean []*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfBoolObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `false`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFColor/MFColorRGBA Object

The MFColor/MFColorRGBA object corresponds to an X3D MFColor/MFColorRGBA field. It is used to store a one-dimensional array of SFColor/SFColorRGBA objects.

### Instance Creation Method(s)

#### *mfColorObjectName* = new **MFColor/MFColorRGBA** (*... values: SFColor/SFColorRGBA []*)

The creation method can be passed 0 or more SFColor/SFColorRGBA-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfColorObjectName[index]`, where *index* is an integer-valued expression with 0<=*index* length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFColor (0, 0, 0)` or `SFColorRGBA (0, 0, 0, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Common Methods

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFDouble/MFFloat Object

The MFDouble/MFFloat object corresponds to an X3D MFDouble/MFFloat field. It is used to store a one-dimensional array of SFFloat objects.

### Instance Creation Method(s)

#### *mfFloat/DoubleObjectName* = new **MFDouble/MFFloat** (*... values: number []*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfFloatObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `0.0`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFImage Object

The MFImage object corresponds to an X3D MFImage field. It is used to store a one-dimensional array of SFImage objects.

### Instance Creation Method(s)

#### *mfImageObjectName* = new **MFImage** (*... values: SFImage []*)

The creation method can be passed 0 or more SFImage-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfImageObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFImage (0, 0, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFInt32 Object

The MFInt32 object corresponds to an X3D MFInt32 field. It is used to store a one-dimensional array of SFInt32 objects.

### Instance Creation Method(s)

#### *mfInt32ObjectName* = new **MFInt32** (*... values: number []*)

The creation method can be passed 0 or more integer-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfInt32ObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `0`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFMatrix3d/MFMatrix3d/f Object

The MFMatrix3d/f object corresponds to an X3D MFMatrix3d/f field. It is used to store a one-dimensional array of SFMatrix3d/f objects.

### Instance Creation Method(s)

#### *mfMatrix3d/fObjectName* = new **MFMatrix3d/f** (*... values: SFMatrix3d/f []*)

The creation method can be passed 0 or more SFMatrix3d/f-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfMatrix3d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the identity matrix.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFMatrix4d/MFMatrix4f Object

The MFMatrix4d/f object corresponds to an X3D MFMatrix4d/f field. It is used to store a one-dimensional array of SFMatrix4d/f objects.

### Instance Creation Method(s)

#### *mfMatrix4d/fObjectName* = new **MFMatrix4d/f** (*... values: SFMatrix4d/f []*)

The creation method can be passed 0 or more SFMatrix4d/f-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfMatrix4d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the identity matrix.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFNode Object

The MFNode object corresponds to an X3D MFNode field. It is used to store a one-dimensional array of SFNode objects.

### Instance Creation Method(s)

#### *mfNodeObjectName* = new **MFNode** (*... values: SFNode []*)

The creation method can be passed 0 or more SFNode-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfNodeObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `null`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### **toVRMLString** (\[options\]): string <small><span class="blue">non-standard</span></small>

Returns the X3D VRML-encoded string that, if parsed as the value of an MFNode field, will produce these nodes.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

#### **toXMLString** (\[options\]): string <small><span class="blue">non-standard</span></small>

Returns the X3D XML-encoded string that, if parsed as the value of an MFNode field, will produce these nodes.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

#### **toJSONString** (\[options\]): string <small><span class="blue">non-standard</span></small>

Returns the X3D JSON-encoded string that, if parsed as the value of an MFNode field, will produce these nodes.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#tovrmlstring-options-options-string-non-standard).

## MFRotation Object

The MFRotation object corresponds to an X3D MFRotation field. It is used to store a one-dimensional array of SFRotation objects.

### Instance Creation Method(s)

#### *mfRotationObjectName* = new **MFRotation**  (*... values: SFRotation []*)

The creation method can be passed 0 or more SFRotation-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfRotationObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFRotation (0, 0, 1, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFString Object

The MFString object corresponds to an X3D MFString field. It is used to store a one-dimensional array of String objects.

### Instance Creation Method(s)

#### *mfStringObjectName* = new **MFString** (*... values: string []*)

The creation method can be passed 0 or more string-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfStringObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the empty string.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFTime Object

The MFTime object corresponds to an X3D MFTime field. It is used to store a one-dimensional array of SFTime objects.

### Instance Creation Method(s)

#### *mfTimeObjectName* = new **MFTime** (*... values: number []*)

The creation method can be passed 0 or more number-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfTimeObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `-1.0`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFVec2d/MFVec2f Object

The MFVec2d/f object corresponds to an X3D MFVec2d/f field. It is used to store a one-dimensional array of SFVec2d/f objects.

### Instance Creation Method(s)

#### *mfVec2d/fObjectName* = new **MFVec2d/f** (*... values: SFVec2d/f []*)

The creation method can be passed 0 or more SFVec2d/f-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfVec2d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec2d/f (0, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFVec3d/MFVec3d/f Object

The MFVec3d/f object corresponds to an X3D MFVec3d/f field. It is used to store a one-dimensional array of SFVec3d/f objects.

### Instance Creation Method(s)

#### *mfVec3d/fObjectName* = new **MFVec3d/f** (*... values: SFVec3d/f []*)

The creation method can be passed 0 or more SFVec3d/f-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfVec3d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec3d/f (0, 0, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).

## MFVec4d/MFVec4f Object

The MFVec4d/f object corresponds to an X3D MFVec4d/f field. It is used to store a one-dimensional array of SFVec4d/f objects.

### Instance Creation Method(s)

#### *mfVec4d/fObjectName* = new **MFVec4d/f** (*... values: SFVec4d/f []*)

The creation method can be passed 0 or more SFVec4d/f-valued expressions to initialize the elements of the array.

### Properties

Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. `mfVec4d/fObjectName[index]`, where *index* is an integer-valued expression with 0<=*index*\<length and length is the number of elements in the array). Assigning to an element with *index* \> length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec4d/f (0, 0, 0, 0)`.

#### **length**: number

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

See [X3DArrayField](/x_ite/reference/field-services-and-objects/#methods-13).
