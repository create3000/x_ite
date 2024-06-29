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

#### **accessType**

Value from the [X3DConstants](/x_ite/reference/constants-services/#access-type-constants) object describing the accessType (e.g., "X3DConstants.inputOnly"). This property is read only.

#### **dataType**

Value from [X3DConstants](/x_ite/reference/constants-services/#field-type-constants) object describing the field's data type (e.g., "X3DConstants.SFBool"). This property is read only.

#### **name**

A string of the field name (e.g., "children"). This property is read only.

### Methods

None.

## FieldDefinitionArray

FieldDefinitionArray is an object that represents an array of X3DFieldDefinition objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *fieldDefinitionArrayName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**

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

#### Number **getType** ()

Returns one of the **Field Type Constants** from [X3DConstants](/x_ite/reference/constants-services/#field-type-constants) object.

#### String **getTypeName** ()

Returns the field type name.

#### X3DField **copy** ()

Returns a copy of this X3DField.

#### Boolean **equals** (*field*)

Returns true if the passed SF* or MF* *field* of the same type is equals to this object, otherwise false.

#### void **addFieldCallback** (*key, callback*)

Adds a field callback function, if external browser interface is used. *Key* is a custom key of any type associated with the *callback*. The callback is called when the field has been changed.

The callback has a signature of `function (value)`, where value is the current value of the field.

#### void **removeFieldCallback** (*key*)

Removes a field callback function associated with *key*.

## SFColor Object

The SFColor object corresponds to an X3D SFColor field. All properties are accessed using the syntax *sfColorObjectName.\<property\>*, where *sfColorObjectName* is an instance of a SFColor object. All methods are invoked using the syntax *sfColorObjectName.method (\<argument-list\>)*, where *sfColorObjectName* is an instance of a SFColor object.

### Instance Creation Method(s)

#### *sfColorObjectName* = new **SFColor** ()

A new color initialized with zero values is created and returned.

#### *sfColorObjectName* = new **SFColor** (*r, g, b*)

*r, g,* and *b* are scalar values with the red, green, and blue values of the color in the range 0–1.

### Iterator

The `[@@iterator]()` method of SFColor instances implements the iterable protocol and allows SFColor objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFColor (... color); // Copy using spread syntax.
```

### Properties

#### **r**

Red component of the color.

#### **g**

Green component of the color.

#### **b**

Blue component of the color.

### Methods

#### Array **getHSV** ()

Return an array with the components of the color's HSV value.

#### void **setHSV** (*h, s, v*)

Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.

The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.

### SFColor **linearToSRGB** ()

Return this color converted to linear color space.

### SFColor **sRGBToLinear** ()

Returns this color converted to linear color space.

#### SFColor **lerp** (*destination, t*)

Linearly interpolates in HSV space between source color and destination color by an amount of t.

## SFColorRGBA Object

The SFColorRGBA object corresponds to an X3D SFColorRGBA field. All properties are accessed using the syntax *sfColorRGBAObjectName.\<property\>*, where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object. All methods are invoked using the syntax *sfColorRGBAObjectName.method (\<argument-list\>)*, where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object.

### Instance Creation Method(s)

#### *sfColorRGBAObjectName* = new **SFColorRGBA** ()

A new color initialized with zero values is created and returned.

#### *sfColorRGBAObjectName* = new **SFColorRGBA** (*r, g, b, a*)

*r, g, b* and *a* are scalar values with the red, green and blue values of the color in the range 0–1.

### Iterator

The `[@@iterator]()` method of SFColorRGBA instances implements the iterable protocol and allows SFColorRGBA objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFColorRGBA (... color); // Copy using spread syntax.
```

### Properties

#### **r**

Red component of the color.

#### **g**

Green component of the color.

#### **b**

Blue component of the color.

#### **a**

Alpha component of the color.

### Methods

#### Array **getHSVA** ()

Return an array with the components of the color's HSVA value.

#### void **setHSVA** (*h, s, v, a*)

Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.

The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.

### SFColorRGBA **linearToSRGB** ()

Return this color converted to linear color space.

### SFColorRGBA **sRGBToLinear** ()

Returns this color converted to linear color space.

#### SFColorRGBA **lerp** (*destination, t*)

Linearly interpolates in HSVA space between source color and destination color by an amount of t.

## SFImage Object

The SFImage object corresponds to an X3D SFImage field.

### Instance Creation Method(s)

#### *sfImageObjectName* = new **SFImage** ()

A new image initialized with zero values is created and returned.

#### *sfImageObjectName* = new **SFImage** (*width, height, components[, MFInt32 array]*)

*width* is the width in pixels of the image.
*height* is the height in pixels of the image.
*components* are the number of components of the image (0-4).
*array* is a MFInt32 array with pixel data.

### Iterator

The `[@@iterator]()` method of SFImage instances implements the iterable protocol and allows SFImage objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFImage (... image); // Copy using spread syntax.
```

### Properties

#### **width**

Width of the image in pixels.

#### **height**

Height of the image in pixels.

#### **comp**

Number of components.

#### **array**

A MFInt32 array corresponding to the pixels of the image.

### Methods

None

## SFMatrix3d/SFMatrix3f Object

The SFMatrix3d/f object provides many useful methods for performing manipulations on 3×3 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix3d/fObjectName[0], ..., sflMatrixObjectName[8]*).

### Instance Creation Method(s)

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** ()

A new matrix initialized with the identity matrix is created and returned.

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*r1, r2, r3*)

A new matrix initialized with the vectors in *r1* through *r3* of type SFVec3d/f is created and returned.

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*f11, f12, f13, f21, f22, f23, f31, f32, f33*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

### Iterator

The `[@@iterator]()` method of SFMatrix3d/f instances implements the iterable protocol and allows SFMatrix3d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFMatrix3d (... matrix); // Copy using spread syntax.
```

### Properties

None

### Methods

#### void **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Sets the SFMatrix3d/f to the passed values. *translation* is an SFVec2d/f object, *rotation* is a Number, *scaleFactor* is a SFVec2d/f object, *scaleOrientation* is a Number and *center* is a SFVec2d/f object.

Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### void **getTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Decomposes the SFMatrix3d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects*. rotation* is a SFVec3d/f, where x and y are the complex value of the rotation and z is the rotation angle in radians. The other types of the parameters are the same as in **setTransform**.

Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

A center of any value can be specified around which the rotation and scaling will take place.

#### Number **determinant** ()

Returns the determinant of this object's matrix.

#### SFMatrix3d/f **inverse** ()

Returns a SFMatrix whose value is the inverse of this object.

#### SFMatrix3d/f **transpose** ()

Returns a SFMatrix3d/f whose value is the transpose of this object.

#### SFMatrix3d/f **multLeft** (*SFMatrix3d/f matrix*)

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the left.

#### SFMatrix3d/f **multRight** (*SFMatrix3d/f matrix*)

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the right.

#### SFVec2d/f **multVecMatrix** (*SFVec2d/f vec*)

Returns a SFVec2d/f whose value is the object multiplied by the passed row vector.

#### SFVec3d/f **multVecMatrix** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.

#### SFVec2d/f **multMatrixVec** (*SFVec2d/f vec*)

Returns a SFVec2d/f whose value is the object multiplied by the passed column vector.

#### SFVec3d/f **multMatrixVec** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.

#### SFVec2d/f **multDirMatrix** (*SFVec2d/f vec*)

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed row vector.

#### SFVec2d/f **multMatrixDir** (*SFVec2d/f vec*)

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed column vector.

## SFMatrix4d/SFMatrix4f Object

The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix4d/fObjectName[0], ..., sflMatrixObjectName[15]*).

### Instance Creation Method(s)

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** ()

A new matrix initialized with the identity matrix is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*r1, r2, r3, r4*)

A new matrix initialized with the vectors in *r1* through *r4* of type SFVec4d/f is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*f11, f12, f13, f14, f21, f22, f23, f24, f31, f32, f33, f34, f41, f42, f43, f44*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

### Iterator

The `[@@iterator]()` method of SFMatrix4d/f instances implements the iterable protocol and allows SFMatrix4d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFMatrix4d (... matrix); // Copy using spread syntax.
```

### Properties

None

### Methods

#### void **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Sets the SFMatrix4d/f to the passed values. *translation* is an SFVec3d/f object, *rotation* is a SFRotation object, *scaleFactor* is a SFVec3d/f object, *scaleOrientation* is a SFRotation object and *center* is a SFVec3d/f object.

Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### void **getTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Decomposes the SFMatrix4d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects. The types of the parameters are the same as in **setTransform**.

Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

A center of any value can be specified around which the rotation and scaling will take place.

#### Number **determinant** ()

Returns the determinant of this object's matrix.

#### SFMatrix4d/f **inverse** ()

Returns a SFMatrix whose value is the inverse of this object.

#### SFMatrix4d/f **transpose** ()

Returns a SFMatrix4d/f whose value is the transpose of this object.

#### SFMatrix4d/f **multLeft** (*SFMatrix4d/f matrix*)

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the left.

#### SFMatrix4d/f **multRight** (*SFMatrix4d/f matrix*)

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the right.

#### SFVec3d/f **multVecMatrix** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.

#### SFVec4d/f **multVecMatrix** (*SFVec4d/f vec*)

Returns a SFVec4d/f whose value is the object multiplied by the passed row vector.

#### SFVec3d/f **multMatrixVec** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.

#### SFVec4d/f **multMatrixVec** (*SFVec4d/f vec*)

Returns a SFVec4d/f whose value is the object multiplied by the passed column vector.

#### SFVec3d/f **multDirMatrix** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed row vector.

#### SFVec3d/f **multMatrixDir** (*SFVec3d/f vec*)

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed column vector.

## SFNode Object

The SFNode object corresponds to an X3D SFNode field.

### Instance Creation Method(s)

#### *sfNodeObjectName* = new **SFNode** (*vrmlSyntax*)

*vrmlSyntax* is a UTF-8 string containing the definition of an X3D node.

This constructor is only available inside Script nodes. If the specification version is greater than 2.0, SFNode will throw an error when instantiated directly, use [X3DExecutionContext.createNode](/x_ite/reference/scene-services/#sfnode-createnode-string-typename) or [X3DExecutionContext.createProto](/x_ite/reference/scene-services/#sfnode-createproto-string-protoname) instead.

### Properties

Each node may assign values to its inputOnly fields and obtain the last output values of its outputOnly fields using the *sfNodeObjectName.fieldName* syntax. The *directOutput* field of the corresponding Script node must then be set to TRUE.

### Methods

#### X3DFieldDefinition **getFieldDefinition** (*name*)

Returns the corresponding X3DFieldDefinition object associated with *name*.

#### FieldDefinitionArray **getFieldDefinitions** ()

Returns a list of fields defined for the SFNode object.

#### X3DField **getField** (*name*)

Returns the corresponding X3DField object associated with *name*.

#### String **getNodeName** ()

Returns the node name.

#### Array\<Number\> **getNodeType** ()

Returns, in the array, a list of constant values that indicate node types as provided in the X3DConstants object.

See [Concrete Node Types](/x_ite/reference/constants-services/#concrete-node-types) and [Abstract Node Types](/x_ite/reference/constants-services/#abstract-node-types).

#### String **getNodeTypeName** ()

Returns the node type name.

#### String **toVRMLString** (\[options\])

Returns the X3D VRML-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

#### String **toXMLString** (\[options\])

Returns the X3D XML-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

#### String **toJSONString** (\[options\])

Returns the X3D JSON-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

## SFRotation Object

The SFRotation object corresponds to an X3D SFRotation field.

### Instance Creation Method(s)

#### *sfRotationObjectName* = new **SFRotation** ()

A new rotation initialized with the identity rotation is created and returned.

#### *sfRotationObjectName* = new **SFRotation** (*x, y, z, angle*)

*x*, *y*, and *z* are the axis of the rotation.
*angle* is the angle of the rotation (in radians). All values are scalar.

#### *sfRotationObjectName* = new **SFRotation** (*axis, angle*)

*axis* is a SFVec3d/f object whose value is the axis of rotation.
*angle* is the scalar angle of the rotation (in radians).

#### *sfRotationObjectName* = new **SFRotation** (*fromVector, toVector*)

*fromVector* and *toVector* are SFVec3d/f valued objects. These vectors are normalized and the rotation value that would rotate from the *fromVector* to the *toVector* is stored in the object.

#### *sfRotationObjectName* = new **SFRotation** (*matrix*)

*matrix* is an SFMatrix3d/f rotation matrix object whose value is converted into an SFRotation object.

### Iterator

The `[@@iterator]()` method of SFRotation instances implements the iterable protocol and allows SFRotation objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFRotation (... rotation); // Copy using spread syntax.
```

### Properties

#### **x**

Returns the first value of the axis vector.

#### **y**

Returns the second value of the axis vector.

#### **z**

Returns the third value of the axis vector

#### **angle**

A number corresponding to the angle of the rotation (in radians).

### Methods

#### Number **getAxis** ()

Returns the axis of rotation as an SFVec3f object.

#### SFMatrix3f **getMatrix** ()

Returns the rotation matrix as an SFMatrix3f object.

#### SFRotation **inverse** ()

Returns a SFRotation object whose value is the inverse of this object's rotation.

#### SFRotation **multiply** *(rotation*)

Returns an SFRotation whose value is the object multiplied by the passed SFRotation.

#### SFVec3f **multVec** (*vec*)

Returns a SFVec3f whose value is the SFVec3f *vec* multiplied by the matrix corresponding to this object's rotation.

#### void **setAxis** (*vec*)

Set the axis of rotation to the vector passed in *vec*.

#### void **setMatrix** (*matrix*)

Set the value of this rotation to the rotation matrix passed in *matrix*.

#### SFRotation **slerp** (*destRotation, t*)

Returns a SFRotation whose value is the spherical linear interpolation between this object's rotation and *destRotation* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's rotation. For *t* = 1, the value is *destRotation*.

#### SFRotation **straighten** (*upVector = new SFVec3f (0, 1, 0)*)

Straightens the rotation so that the x-axis of the resulting rotation is parallel to the plane spawned by upVector. The default  value for *upVector* is the y-axis.

## SFVec2d/SFVec2f Object

The SFVec2d/f object corresponds to an X3D SFVec2d/f field. Each component of the vector can be accessed using the x and y properties or using C-style array dereferencing (i.e. *sfVec2d/fObjectName[0]* or *sfVec2d/fObjectName[1]).*

### Instance Creation Method(s)

#### *sfVec2d/fObjectName* = new **SFVec2d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec2d/fObjectName* = new **SFVec2d/f** (*x, y*)

Constructs a SFVec2d/f from *x* and *y*, where *x* and *y* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec2d/f instances implements the iterable protocol and allows SFVec2d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec2d (... vector); // Copy using spread syntax.
```

### Properties

#### **x**

Returns the first value of the vector.

#### **y**

Returns the second value of the vector.

### Methods

#### SFVec2d/f **abs** ()

Returns an SFVec2d/f whose value is the componentwise absolute value of the object.

#### SFVec2d/f **add** (*other*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f added, componentwise, to the object.

#### Number **distance** (*other*)

Returns the distance of this vector to SFVec2d/f *other*.

#### SFVec2d/f **divide** (*denominator*)

Returns an SFVec2d/f whose value is the object divided by the passed numeric value.

#### SFVec2d/f **divVec** (*other*)

Returns an SFVec2d/f whose value is the object divided, componentwise, by the passed SFVec2d/f *other*.

#### Number **dot** (*other*)

Returns the dot product of this vector and SFVec2d/f *other*.

#### SFVec2d/f **inverse** ()

Returns an SFVec2d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec2d/f **lerp** (*destination, t*)

Returns a SFVec2d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

#### SFVec2d/f **min** (*other*)

Returns an SFVec2d/f whose value is the componentwise minimum of the passed SFVec2d/f and the object.

#### SFVec2d/f **max** (*other*)

Returns an SFVec2d/f whose value is the componentwise maximum of the passed SFVec2d/f and the object.

#### SFVec2d/f **multiply** (*factor*)

Returns an SFVec2d/f whose value is the object multiplied by the passed numeric value.

#### SFVec2d/f **multVec** (*other*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f multiplied, componentwise, with the object.

#### SFVec2d/f **negate** ()

Returns an SFVec2d/f whose value is the componentwise negation of the object.

#### SFVec2d/f **normalize** ()

Returns an SFVec2d/f of object converted to unit length.

#### SFVec2d/f **subtract** (*other*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f subtracted, componentwise, from the object.

## SFVec3d/SFVec3f Object

The SFVec3d/f object corresponds to an X3D SFVec3d/f field. Each component of the vector can be accessed using the x, y, and z properties or using C-style array dereferencing (i.e. *sfVec3d/fObjectName[0], sfVec3d/fObjectName[1]* or *sfVec3d/fObjectName[2]).*

### Instance Creation Method(s)

#### *sfVec3d/fObjectName* = new **SFVec3d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec3d/fObjectName* = new **SFVec3d/f** (*x, y, z*)

Constructs a SFVec3d/f from *x*, *y* and *z*, where *x*, *y* and *z* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec3d/f instances implements the iterable protocol and allows SFVec3d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec3d (... vector); // Copy using spread syntax.
```

### Properties

#### **x**

Returns the first value of the vector.

#### **y**

Returns the second value of the vector.

#### **z**

Returns the third value of the vector.

### Methods

#### SFVec3d/f **abs** ()

Returns an SFVec3d/f whose value is the componentwise absolute value of the object.

#### SFVec3d/f **add** (*other*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f added, componentwise, to the object.

#### SFVec3d/f **cross** (*other*)

Returns the cross product of the object and the passed SFVec3d/f *other*.

#### Number **distance** (*other*)

Returns the distance of this vector to SFVec3d/f *other*.

#### SFVec3d/f **divide** (*denominator*)

Returns an SFVec3d/f whose value is the object divided by the passed numeric value.

#### SFVec3d/f **divVec** (*other*)

Returns an SFVec3d/f whose value is the object divided, componentwise, by the passed SFVec3d/f *other*.

#### Number **dot** (*other*)

Returns the dot product of this vector and SFVec3d/f *other*.

#### SFVec3d/f **inverse** ()

Returns an SFVec3d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec3d/f **lerp** (*destination, t*)

Returns a SFVec3d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

#### SFVec3d/f **min** (*other*)

Returns an SFVec3d/f whose value is the componentwise minimum of the passed SFVec3d/f and the object.

#### SFVec3d/f **max** (*other*)

Returns an SFVec3d/f whose value is the componentwise maximum of the passed SFVec3d/f and the object.

#### SFVec3d/f **multiply** (*factor*)

Returns an SFVec3d/f whose value is the object multiplied by the passed numeric value.

#### SFVec3d/f **multVec** (*other*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f multiplied, componentwise, with the object.

#### SFVec3d/f **negate** ()

Returns an SFVec3d/f whose value is the componentwise negation of the object.

#### SFVec3d/f **normalize** ()

Returns an SFVec3d/f of object converted to unit length

#### SFVec3d/f **subtract** (*other*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f subtracted, componentwise, from the object.

## SFVec4d/SFVec4d/f Object

The SFVec4d/f object corresponds to an X3D SFVec4d/f field. Each component of the vector can be accessed using the x, y, z and w properties or using C-style array dereferencing (i.e. *sfVec4d/fObjectName[0], sfVec4d/fObjectName[1], sfVec4d/fObjectName[2]* or *sfVec4d/fObjectName[3]).*

### Instance Creation Method(s)

#### *sfVec4d/fObjectName* = new **SFVec4d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec4d/fObjectName* = new **SFVec4d/f** (*number1, number2, number3, number4*)

Constructs a SFVec4d/f from *x*, *y*, *z* and *w*, where *x*, *y*, *z* and *w* are scalar expressions.

### Iterator

The `[@@iterator]()` method of SFVec4d/f instances implements the iterable protocol and allows SFVec4d/f objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the properties of the object in order.

```js
const copy = new SFVec4d (... vector); // Copy using spread syntax.
```

### Properties

#### **x**

Returns the first value of the vector.

#### **y**

Returns the second value of the vector.

#### **z**

Returns the third value of the vector.

#### **w**

Returns the fourth value of the vector.

### Methods

#### SFVec4d/f **abs** ()

Returns an SFVec4d/f whose value is the componentwise absolute value of the object.

#### SFVec4d/f **add** (*other*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f added, componentwise, to the object.

#### Number **distance** (*other*)

Returns the distance of this vector to SFVec4d/f *other*.

#### SFVec4d/f **divide** (*denominator*)

Returns an SFVec4d/f whose value is the object divided by the passed numeric value.

#### SFVec4d/f **divVec** (*other*)

Returns an SFVec4d/f whose value is the object divided, componentwise, by the passed SFVec4d/f *other*.

#### Number **dot** (*other*)

Returns the dot product of this vector and SFVec4d/f *other*.

#### SFVec4d/f **inverse** ()

Returns an SFVec4d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec4d/f **lerp** (*destination, t*)

Returns a SFVec4d/f whose value is the linear interpolation between this object's vector and *destination* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destination*.

#### SFVec4d/f **min** (*other*)

Returns an SFVec4d/f whose value is the componentwise minimum of the passed SFVec4d/f and the object.

#### SFVec4d/f **max** (*other*)

Returns an SFVec4d/f whose value is the componentwise maximum of the passed SFVec4d/f and the object.

#### SFVec4d/f **multiply** (*factor*)

Returns an SFVec4d/f whose value is the object multiplied by the passed numeric value.

#### SFVec4d/f **multVec** (*other*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f multiplied, componentwise, with the object.

#### SFVec4d/f **negate** ()

Returns an SFVec4d/f whose value is the componentwise negation of the object.

#### SFVec4d/f **normalize** ()

Returns an SFVec4d/f of object converted to unit length.

#### SFVec4d/f **subtract** (*other*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f subtracted, componentwise, from the object.

## X3DArrayField

The X3DArrayField object is the base object of all MF* objects. It is used to store a one-dimensional array of the corresponding SF* objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. X3D*ArrayFieldObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.0.

### Instance Creation Method(s)

None

### Iterator

The `[@@iterator]()` method of X3DArrayField instances implements the iterable protocol and allows X3DArrayField objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a iterator object that yields the elements of the array in order.

```js
const copy = new MFBool (... array); // Copy using spread syntax.
```

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### Boolean **equals** (*array*)

Returns true if the passed MF* *array* of the same type is equals to this object, otherwise false.

#### Other Array functions

Common Array functions like `at`, `entries`, `every`, `fill`, `filter`, `find`, `findIndex`, `findLast`, `findLastIndex`, `forEach`, `includes`, `indexOf`, `join`, `keys`, `lastIndexOf`, `map`, `pop`, `push`, `reduce`, `reduceRight`, `reverse`, `shift`, `slice`, `some`, `sort`, `splice`, `toReversed`, `toSorted`, `toSpliced`, `unshift`, `values`, `with` are also available.

## MFBool Object

The MFBool object corresponds to an X3D MFBool field. It is used to store a one-dimensional array of SFBool objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfBoolObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `false`.

### Instance Creation Method(s)

#### *mfBoolObjectName* = new **MFBool** (*[boolean, boolean...]*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFColor/MFColorRGBA Object

The MFColor/MFColorRGBA object corresponds to an X3D MFColor/MFColorRGBA field. It is used to store a one-dimensional array of SFColor/SFColorRGBA objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfColorObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index* length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFColor (0, 0, 0)` or `SFColorRGBA (0, 0, 0, 0)`.

### Instance Creation Method(s)

#### *mfColorObjectName* = new **MFColor/MFColorRGBA** (*[SFColor/SFColorRGBA, SFColor/SFColorRGBA, ...]*)

The creation method can be passed 0 or more SFColor/SFColorRGBA-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Common Methods

### Methods

None

## MFDouble/MFFloat Object

The MFDouble/MFFloat object corresponds to an X3D MFDouble/MFFloat field. It is used to store a one-dimensional array of SFFloat objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfFloatObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `0.0`.

### Instance Creation Method(s)

#### *mfFloat/DoubleObjectName* = new **MFDouble/MFFloat** (*[number, number...]*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFImage Object

The MFImage object corresponds to an X3D MFImage field. It is used to store a one-dimensional array of SFImage objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfImageObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFImage (0, 0, 0)`.

### Instance Creation Method(s)

#### *mfImageObjectName* = new **MFImage** (*[SFImage, SFImage, ...]*)

The creation method can be passed 0 or more SFImage-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFInt32 Object

The MFInt32 object corresponds to an X3D MFInt32 field. It is used to store a one-dimensional array of SFInt32 objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfInt32ObjectName*[*index]*, where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `0`.

### Instance Creation Method(s)

#### *mfInt32ObjectName* = new **MFInt32** (*[number, number, ...]*)

The creation method can be passed 0 or more integer-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFMatrix3d/MFMatrix3d/f Object

The MFMatrix3d/f object corresponds to an X3D MFMatrix3d/f field. It is used to store a one-dimensional array of SFMatrix3d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfMatrix3d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the identity matrix.

### Instance Creation Method(s)

#### *mfMatrix3d/fObjectName* = new **MFMatrix3d/f** (*[SFMatrix3d/f, SFMatrix3d/f, ...]*)

The creation method can be passed 0 or more SFMatrix3d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFMatrix4d/MFMatrix4f Object

The MFMatrix4d/f object corresponds to an X3D MFMatrix4d/f field. It is used to store a one-dimensional array of SFMatrix4d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfMatrix4d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the identity matrix.

### Instance Creation Method(s)

#### *mfMatrix4d/fObjectName* = new **MFMatrix4d/f** (*[SFMatrix4d/f, SFMatrix4d/f, ...]*)

The creation method can be passed 0 or more SFMatrix4d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFNode Object

The MFNode object corresponds to an X3D MFNode field. It is used to store a one-dimensional array of SFNode objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfNodeObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to NULL.

### Instance Creation Method(s)

#### *mfNodeObjectName* = new **MFNode** (*[SFNode, SFNode, ...]*)

The creation method can be passed 0 or more SFNode-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### String **toVRMLString** (\[options\])

Returns the X3D VRML-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

#### String **toXMLString** (\[options\])

Returns the X3D XML-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

#### String **toJSONString** (\[options\])

Returns the X3D JSON-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](/x_ite/reference/scene-services/#string-tovrmlstring-options).

## MFRotation Object

The MFRotation object corresponds to an X3D MFRotation field. It is used to store a one-dimensional array of SFRotation objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfRotationObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFRotation (0, 0, 1, 0)`.

### Instance Creation Method(s)

#### *mfRotationObjectName* = new **MFRotation** (*[SFRotation, SFRotation, ...]*)

The creation method can be passed 0 or more SFRotation-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFString Object

The MFString object corresponds to an X3D MFString field. It is used to store a one-dimensional array of String objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfStringObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the empty string.

### Instance Creation Method(s)

#### *mfStringObjectName* = new **MFString** (*[string, string, ...]*)

The creation method can be passed 0 or more string-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFTime Object

The MFTime object corresponds to an X3D MFTime field. It is used to store a one-dimensional array of SFTime objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfTimeObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `0.0`.

### Instance Creation Method(s)

#### *mfTimeObjectName* = new **MFTime** (*[string, string, ...]*)

The creation method can be passed 0 or more string-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec2d/MFVec2f Object

The MFVec2d/f object corresponds to an X3D MFVec2d/f field. It is used to store a one-dimensional array of SFVec2d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec2d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec2d/f (0, 0)`.

### Instance Creation Method(s)

#### *mfVec2d/fObjectName* = new **MFVec2d/f** (*[SFVec2d/f, SFVec2d/f, ...]*)

The creation method can be passed 0 or more SFVec2d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec3d/MFVec3d/f Object

The MFVec3d/f object corresponds to an X3D MFVec3d/f field. It is used to store a one-dimensional array of SFVec3d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec3d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec3d/f (0, 0, 0)`.

### Instance Creation Method(s)

#### *mfVec3d/fObjectName* = new **MFVec3d/f** (*[SFVec3d/f, SFVec3d/f, ...]*)

The creation method can be passed 0 or more SFVec3d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec4d/MFVec4f Object

The MFVec4d/f object corresponds to an X3D MFVec4d/f field. It is used to store a one-dimensional array of SFVec4d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec4d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to `SFVec4d/f (0, 0, 0, 0)`.

### Instance Creation Method(s)

#### *mfVec4d/fObjectName* = new **MFVec4d/f** (*[SFVec4d/f, SFVec4d/f, ...]*)

The creation method can be passed 0 or more SFVec4d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None
