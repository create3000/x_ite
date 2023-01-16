---
title: Field Services and Objects
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Field, Services, Objects]
---
## X3DFieldDefinition

The X3DFieldDefinition object represents all of the descriptive properties of a single field of a node.

### Instance Creation Method(s)

None.

### Properties

#### **name**

A string of the field name (e.g., "children"). This property is read only.

#### **accessType**

Value from the X3DConstants object describing the accessType (e.g., "inputOnly"). This property is read only.

#### **dataType**

Value from X3DConstants cobject describing the field's data type (e.g., "SFBool"). This property is read only.

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

#### Boolean **equals** (*field*)

Returns true if the passed SF* or MF* *field* of the same type is equals to this object, otherwise false.

## SFColor Object

The SFColor object corresponds to a X3D SFColor field. All properties are accessed using the syntax *sfColorObjectName.<property>*, where *sfColorObjectName* is an instance of a SFColor object. All methods are invoked using the syntax *sfColorObjectName.method (<argument-list>*), where *sfColorObjectName* is an instance of a SFColor object.

### Instance Creation Method(s)

#### *sfColorObjectName* = new **SFColor** ()

A new color initialized with zero values is created and returned.

#### *sfColorObjectName* = new **SFColor** (*r, g, b*)

*r, g,* and *b* are scalar values with the red, green, and blue values of the color in the range 0–1.

### Properties

#### **r**

Red component of the color.

#### **g**

Green component of the color.

#### **b**

Blue component of the color.

### Methods

#### void **setHSV** (*h, s, v*)

Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.

The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.

#### Array **getHSV** ()

Return an array with the components of the color's HSV value.

#### SFColor **lerp** (*destination, t*)

Linearely interpolate in HSV space between source color and destination color by an amount of t.

## SFColorRGBA Object

The SFColorRGBA object corresponds to a X3D SFColorRGBA field. All properties are accessed using the syntax *sfColorRGBAObjectName.<property>*, where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object. All methods are invoked using the syntax *sfColorRGBAObjectName.method (<argument-list>*), where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object.

### Instance Creation Method(s)

#### *sfColorRGBAObjectName* = new **SFColor** ()

A new color initialized with zero values is created and returned.

#### *sfColorRGBAObjectName* = new **SFColor** (*r, g, b, a*)

*r, g,*  *b* and *a* are scalar values with the red, green and blue values of the color in the range 0–1.

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

#### void **setHSVA** (*h, s, v, a*)

Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.

The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.

#### Array **getHSVA** ()

Return an array with the components of the color's HSVA value.

#### SFColorRGBA **lerp** (*destination, t*)

Linearely interpolate in HSVA space between source color and destination color by an amount of t.

## SFImage Object

The SFImage object corresponds to a X3D SFImage field.

### Instance Creation Method(s)

#### *sfImageObjectName* = new **SFImage** (*width, height, components[, MFInt32 array]*)

*width* is the width in pixels of the image.
*height* is the height in pixels of the image.
*components* are the number of components of the image (0-4).
*array* is a MFInt32 array with pixel data.

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

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*f11, f12, f13, f21, f22, f23, f31, f32, f33*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

#### *sfMatrix3d/fObjectName* = new **SFMatrix3d/f** (*vector0, vector1, vector2*)

A new matrix initialized with the vectors in *vector0* through *vector2* of type SFVec3d/f is created and returned.

### Properties

None

### Methods

#### void **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Sets the SFMatrix3d/f to the passed values. *translation* is an SFVec2d/f object, *rotation* is a Number, *scaleFactor* is a SFVec2d/f object, *scaleOrientation* is a Number and *center* is a SFVec2d/f object. Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### void **getTransform** (*translation*, *rotation*, *scaleFactor*)

Decomposes the SFMatrix3d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects*. rotation* is a SFVec3d/f where x and y are the complex value of the rotation and z is the rotation angle in radians. The other types of the parameters are the same as in **setTransform**. Any projection or shear information in the matrix is ignored.

#### SFMatrix3d/f **inverse** ()

Returns a SFMatrix whose value is the inverse of this object.

#### SFMatrix3d/f **transpose** ()

Returns a SFMatrix3d/f whose value is the transpose of this object.

#### SFMatrix3d/f **multLeft** *(matrix*)

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the left.

#### SFMatrix3d/f **multRight** (*matrix*)

Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the right.

#### SFVec2d/f **multVecMatrix** (*vec*)

Returns a SFVec2d/f whose value is the object multiplied by the passed row vector.

#### SFVec2d/f **multMatrixVec** (*vec*)

Returns a SFVec2d/f whose value is the object multiplied by the passed column vector.

#### SFVec2d/f **multDirMatrix** (*vec*)

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed row vector.

#### SFVec2d/f **multMatrixDir** (*vec*)

Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed column vector.

## SFMatrix4d/SFMatrix4f Object

The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix4d/fObjectName[0], ..., sflMatrixObjectName[15]*).

### Instance Creation Method(s)

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** ()

A new matrix initialized with the identity matrix is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*f11, f12, f13, f14, f21, f22, f23, f24, f31, f32, f33, f34, f41, f42, f43, f44*)

A new matrix initialized with the values in *f11* through *f44* is created and returned.

#### *sfMatrix4d/fObjectName* = new **SFMatrix4d/f** (*vector0, vector1, vector2, vector3*)

A new matrix initialized with the vectors in *vector0* through *vector3* of type SFVec4d/f is created and returned.

### Properties

None

### Methods

#### void **setTransform** (*translation*, *rotation*, *scaleFactor*, *scaleOrientation*, *center*)

Sets the SFMatrix4d/f to the passed values. *translation* is an SFVec3d/f object, *rotation* is a SFRotation object, *scaleFactor* is a SFVec3d/f object, *scaleOrientation* is a SFRotation object and *center* is a SFVec3d/f object. Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.

#### void **getTransform** (*translation*, *rotation*, *scaleFactor*)

Decomposes the SFMatrix4d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects*.* The types of the parameters are the same as in **setTransform**. Any projection or shear information in the matrix is ignored.

#### SFMatrix4d/f **inverse** ()

Returns a SFMatrix whose value is the inverse of this object.

#### SFMatrix4d/f **transpose** ()

Returns a SFMatrix4d/f whose value is the transpose of this object.

#### SFMatrix4d/f **multLeft** *(matrix*)

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the left.

#### SFMatrix4d/f **multRight** (*matrix*)

Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the right.

#### SFVec3d/f **multVecMatrix** (*vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.

#### SFVec3d/f **multMatrixVec** (*vec*)

Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.

#### SFVec3d/f **multDirMatrix** (*vec*)

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed row vector.

#### SFVec3d/f **multMatrixDir** (*vec*)

Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed column vector.

## SFNode Object

The SFNode object corresponds to a X3D SFNode field.

### Instance Creation Method(s)

#### *sfNodeObjectName* = new **SFNode** (*x3dsyntax*)

*x3dsyntax* is a UTF-8 string containing the definition of a X3D node.

### Properties

Each node may assign values to its inputOnly fields and obtain the last output values of its outputOnly fields using the *sfNodeObjectName.fieldName* syntax. The *directOutput* field of the corresponding Script node must then be set to TRUE.

### Methods

#### void **addFieldCallback** (*name, key, callback*)

Adds a field callback function, if external browser interface is used. *Name* is the name of the field. *Key* is a custom key of any type associated with the *callback*. The callback is called when the field has been changed.

The callback has a signature of *function (value),* where value is the current value of the field.

#### FieldDefinitionArray **getFieldDefinitions** ()

Returns a list of fields defined for the SFNode object.

#### String **getNodeName** ()

Returns the node name.

#### Array **getNodeType** ()

Returns, in the array, a list of constant values that indicate node types as provided in the X3DConstants object.

#### String **getNodeTypeName** ()

Returns the node type name.

#### void **removeFieldCallback** (*name, key*)

Removes a field callback function associated with the parameters *name* and *key*.

#### String **toVRMLString** (\[options\])

Returns the X3D VRML-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

#### String **toXMLString** (\[options\])

Returns the X3D XML-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

#### String **toJSONString** (\[options\])

Returns the X3D JSON-encoded string that, if parsed as the value of an SFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

## SFRotation Object

The SFRotation object corresponds to a X3D SFRotation field.

### Instance Creation Method(s)

#### *sfRotationObjectName* = new **SFRotation** ()

A new rotation initialized with the identity rotation is created and returned.

#### *sfRotationObjectName* = new **SFRotation** (*x, y, z, angle*)

*x*, *y*, and *z* are the axis of the rotation.
*angle* is the angle of the rotation (in radians). All values are scalar.

#### *sfRotationObjectName* = new **SFRotation** (*axis, angle*)

*axis* is a SFVec3f object whose value is the axis of rotation.
*angle* is the scalar angle of the rotation (in radians).

#### *sfRotationObjectName* = new **SFRotation** (*fromVector, toVector*)

*fromVector* and *toVector* are SFVec3f valued objects. These vectors are normalized and the rotation value that would rotate from the
*fromVector* to the *toVector* is stored in the object.

#### *sfRotationObjectName* = new **SFRotation** (*matrix*)

*matrix* is a SFMatrix3f rotation matrix.

### Properties

#### **x**

Returns the first value of the axis vector.

#### **y**

Returns the second value of the axis vector.

#### **z**

Returns the third value of the axis vector

#### **angle**

A SFFloat corresponding to the angle of the rotation (in radians).

### Methods

#### Number **getAxis** ()

Returns the axis of rotation as an SFVec3f object.

#### SFMatrix3f **getMatrix** ()

Returns the rotation matrix as an SFMatrix3f object.

#### SFRotation **inverse** ()

Returns a SFRotation object whose value is the inverse of this object's rotation

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

## SFVec2d/SFVec2f Object

The SFVec2d/f object corresponds to a X3D SFVec2d/f field. Each component of the vector can be accessed using the x and y properties or using C-style array dereferencing (i.e. *sfVec2d/fObjectName[0]* or *sfVec2d/fObjectName[1]).*

### Instance Creation Method(s)

#### *sfVec2d/fObjectName* = new **SFVec2d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec2d/fObjectName* = new **SFVec2d/f** (*number1, number2*)

Where *number1* and *number2* are scalar expressions.

### Properties

#### **x**

Returns the first value of the vector.

#### **y**

Returns the second value of the vector.

### Methods

#### SFVec2d/f **abs** ()

Returns an SFVec2d/f whose value is the componentwise absolute value of the object.

#### SFVec2d/f **add** (*vec*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f added, componentwise, to the object.

#### Number **distance** (*vec*)

Returns the distance of this vector to SFVec2d/f *vec*.

#### SFVec2d/f **divide** (*number*)

Returns an SFVec2d/f whose value is the object divided by the passed numeric value.

#### SFVec2d/f **divVec** (*vec*)

Returns an SFVec2d/f whose value is the object divided, componentwise, by the passed SFVec2d/f *vec*.

#### Number **dot** (*vec*)

Returns the dot product of this vector and SFVec2d/f *vec*.

#### SFVec2d/f **inverse** ()

Returns an SFVec2d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec2d/f **lerp** (*destVector, t*)

Returns a SFVec2d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.

#### SFVec2d/f **min** (*vec*)

Returns an SFVec2d/f whose value is the componentwise minimum of the passed SFVec2d/f and the object.

#### SFVec2d/f **max** (*vec*)

Returns an SFVec2d/f whose value is the componentwise maximum of the passed SFVec2d/f and the object.

#### SFVec2d/f **multiply** (*number*)

Returns an SFVec2d/f whose value is the object multiplied by the passed numeric value.

#### SFVec2d/f **multVec** (*vec*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f multiplied, componentwise, with the object.

#### SFVec2d/f **negate** ()

Returns an SFVec2d/f whose value is the componentwise negation of the object.

#### SFVec2d/f **normalize** ()

Returns an SFVec2d/f of object converted to unit length.

#### SFVec2d/f **subtract** (*vec*)

Returns an SFVec2d/f whose value is the passed SFVec2d/f subtracted, componentwise, from the object.

## SFVec3d/SFVec3f Object

The SFVec3d/f object corresponds to a X3D SFVec3d/f field. Each component of the vector can be accessed using the x, y, and z properties or using C-style array dereferencing (i.e. *sfVec3d/fObjectName[0], sfVec3d/fObjectName[1]* or *sfVec3d/fObjectName[2]).*

### Instance Creation Method(s)

#### *sfVec3d/fObjectName* = new **SFVec3d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec3d/fObjectName* = new **SFVec3d/f** (*number1, number2, number3*)

Where *number1, number2,* and *number3* are scalar expressions.

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

#### SFVec3d/f **add** (*vec*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f added, componentwise, to the object.

#### SFVec3d/f **cross** (*vec*)

Returns the cross product of the object and the passed SFVec3d/f *vec*.

#### Number **distance** (*vec*)

Returns the distance of this vector to SFVec3d/f *vec*.

#### SFVec3d/f **divide** (*number*)

Returns an SFVec3d/f whose value is the object divided by the passed numeric value.

#### SFVec3d/f **divVec** (*vec*)

Returns an SFVec3d/f whose value is the object divided, componentwise, by the passed SFVec3d/f *vec*.

#### Number **dot** (*vec*)

Returns the dot product of this vector and SFVec3d/f *vec*.

#### SFVec3d/f **inverse** ()

Returns an SFVec3d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec3d/f **lerp** (*destVector, t*)

Returns a SFVec3d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.

#### SFVec3d/f **min** (*vec*)

Returns an SFVec3d/f whose value is the componentwise minimum of the passed SFVec3d/f and the object.

#### SFVec3d/f **max** (*vec*)

Returns an SFVec3d/f whose value is the componentwise maximum of the passed SFVec3d/f and the object.

#### SFVec3d/f **multiply** (*number*)

Returns an SFVec3d/f whose value is the object multiplied by the passed numeric value.

#### SFVec3d/f **multVec** (*vec*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f multiplied, componentwise, with the object.

#### SFVec3d/f **negate** ()

Returns an SFVec3d/f whose value is the componentwise negation of the object.

#### SFVec3d/f **normalize** ()

Returns an SFVec3d/f of object converted to unit length

#### SFVec3d/f **subtract** (*vec*)

Returns an SFVec3d/f whose value is the passed SFVec3d/f subtracted, componentwise, from the object.

## SFVec4d/SFVec4d/f Object

The SFVec4d/f object corresponds to a X3D SFVec4d/f field. Each component of the vector can be accessed using the x, y, z and w properties or using C-style array dereferencing (i.e. *sfVec4d/fObjectName[0], sfVec4d/fObjectName[1], sfVec4d/fObjectName[2]* or *sfVec4d/fObjectName[3]).*

### Instance Creation Method(s)

#### *sfVec4d/fObjectName* = new **SFVec4d/f** ()

A new vector initialized with zero values is created and returned.

#### *sfVec4d/fObjectName* = new **SFVec4d/f** (*number1, number2, number3, number4*)

Where *number1, number2, number3* and *number4* are scalar expressions.

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

#### SFVec4d/f **add** (*vec*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f added, componentwise, to the object.

#### Number **distance** (*vec*)

Returns the distance of this vector to SFVec4d/f *vec*.

#### SFVec4d/f **divide** (*number*)

Returns an SFVec4d/f whose value is the object divided by the passed numeric value.

#### SFVec4d/f **divVec** (*vec*)

Returns an SFVec4d/f whose value is the object divided, componentwise, by the passed SFVec4d/f *vec*.

#### Number **dot** (*vec*)

Returns the dot product of this vector and SFVec4d/f *vec*.

#### SFVec4d/f **inverse** ()

Returns an SFVec4d/f whose value is the componentwise inverse of the object.

#### Number **length** ()

Returns the geometric length of this vector.

#### SFVec4d/f **lerp** (*destVector, t*)

Returns a SFVec4d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.

#### SFVec4d/f **min** (*vec*)

Returns an SFVec4d/f whose value is the componentwise minimum of the passed SFVec4d/f and the object.

#### SFVec4d/f **max** (*vec*)

Returns an SFVec4d/f whose value is the componentwise maximum of the passed SFVec4d/f and the object.

#### SFVec4d/f **multiply** (*number*)

Returns an SFVec4d/f whose value is the object multiplied by the passed numeric value.

#### SFVec4d/f **multVec** (*vec*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f multiplied, componentwise, with the object.

#### SFVec4d/f **negate** ()

Returns an SFVec4d/f whose value is the componentwise negation of the object.

#### SFVec4d/f **normalize** ()

Returns an SFVec4d/f of object converted to unit length.

#### SFVec4d/f **subtract** (*vec*)

Returns an SFVec4d/f whose value is the passed SFVec4d/f subtracted, componentwise, from the object.

## X3DArrayField

The X3DArrayField object is the base object of all MF* objects. It is used to store a one-dimensional array of the corresponding SF* objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. X3D*ArrayFieldObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.0.

### Instance Creation Method(s

None

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### Boolean **equals** (*array*)

Returns true if the passed MF* *array* of the same type is equals to this object, otherwise false.

#### Other Array functions

Common Array functions like `at`, `concat`, `entries`, `every`, `fill`, `filter`, `find`, `findIndex`, `findLast`, `findLastIndex`, `flat`, `flatMap`, `forEach`, `includes`, `indexOf`, `join`, `keys`, `lastIndexOf`, `map`, `pop`, `push`, `reduce`, `reduceRight`, `shift`, `slice`, `some`, `splice`, `unshift`, `values` are also available.

## MFBool Object

The MFBool object corresponds to a X3D MFBool field. It is used to store a one-dimensional array of SFBool objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfBoolObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.0.

### Instance Creation Method(s)

#### *mfBoolObjectName* = new **MFBool** (*[boolean, boolean...]*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFColor/MFColorRGBA Object

The MFColor/MFColorRGBA object corresponds to a X3D MFColor/MFColorRGBA field. It is used to store a one-dimensional array of SFColor/SFColorRGBA objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfColorObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index* length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFColor (0, 0, 0) or SFColorRGBA.

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

The MFDouble/MFFloat object corresponds to a X3D MFDouble/MFFloat field. It is used to store a one-dimensional array of SFFloat objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfFloatObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.0.

### Instance Creation Method(s)

#### *mfFloat/DoubleObjectName* = new **MFDouble/MFFloat** (*[number, number...]*)

The creation method can be passed 0 or more numeric-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFImage Object

The MFImage object corresponds to a X3D MFImage field. It is used to store a one-dimensional array of SFImage objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfImageObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFImage (0,0,0).

### Instance Creation Method(s)

#### *mfImageObjectName* = new **MFImage** (*[SFImage, SFImage, ...]*)

The creation method can be passed 0 or more SFImage-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFInt32 Object

The MFInt32 object corresponds to a X3D MFInt32 field. It is used to store a one-dimensional array of SFInt32 objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfInt32ObjectName*[*index]*, where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to 0.

### Instance Creation Method(s)

#### *mfInt32ObjectName* = new **MFInt32** (*[number, number, ...]*)

The creation method can be passed 0 or more integer-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFMatrix3d/MFMatrix3d/f Object

The MFMatrix3d/f object corresponds to a X3D MFMatrix3d/f field. It is used to store a one-dimensional array of SFMatrix3d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfMatrix3d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to NULL.

### Instance Creation Method(s)

#### *mfMatrix3d/fObjectName* = new **MFMatrix3d/f** (*[SFMatrix3d/f, SFMatrix3d/f, ...]*)

The creation method can be passed 0 or more SFMatrix3d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFMatrix4d/MFMatrix4f Object

The MFMatrix4d/f object corresponds to a X3D MFMatrix4d/f field. It is used to store a one-dimensional array of SFMatrix4d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfMatrix4d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to NULL.

### Instance Creation Method(s)

#### *mfMatrix4d/fObjectName* = new **MFMatrix4d/f** (*[SFMatrix4d/f, SFMatrix4d/f, ...]*)

The creation method can be passed 0 or more SFMatrix4d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFNode Object

The MFNode object corresponds to a X3D MFNode field. It is used to store a one-dimensional array of SFNode objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfNodeObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to NULL.

### Instance Creation Method(s)

#### *mfNodeObjectName* = new **MFNode** (*[SFNode, SFNode, ...]*)

The creation method can be passed 0 or more SFNode-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

#### String **toVRMLString** (\[options\])

Returns the X3D VRML-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

#### String **toXMLString** (\[options\])

Returns the X3D XML-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

#### String **toJSONString** (\[options\])

Returns the X3D JSON-encoded string that, if parsed as the value of an MFNode field, produce this node.

For options see [X3DScene.toVRMLString](scene-services#string-tovrmlstring-options).

## MFRotation Object

The MFRotation object corresponds to a X3D MFRotation field. It is used to store a one-dimensional array of SFRotation objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfRotationObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFRotation (0, 0, 1, 0).

### Instance Creation Method(s)

#### *mfRotationObjectName* = new **MFRotation** (*[SFRotation, SFRotation, ...]*)

The creation method can be passed 0 or more SFRotation-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFString Object

The MFString object corresponds to a X3D MFString field. It is used to store a one-dimensional array of String objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfStringObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the empty string.

### Instance Creation Method(s)

#### *mfStringObjectName* = new **MFString** (*[string, string, ...]*)

The creation method can be passed 0 or more string-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFTime Object

The MFTime object corresponds to a X3D MFTime field. It is used to store a one-dimensional array of SFTime objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfTimeObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to the empty string.

### Instance Creation Method(s)

#### *mfTimeObjectName* = new **MFTime** (*[string, string, ...]*)

The creation method can be passed 0 or more string-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec2d/MFVec2f Object

The MFVec2d/f object corresponds to a X3D MFVec2d/f field. It is used to store a one-dimensional array of SFVec2d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec2d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFVec2d/f (0, 0).

### Instance Creation Method(s)

#### *mfVec2d/fObjectName* = new **MFVec2d/f** (*[SFVec2d/f, SFVec2d/f, ...]*)

The creation method can be passed 0 or more SFVec2d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec3d/MFVec3d/f Object

The MFVec3d/f object corresponds to a X3D MFVec3d/f field. It is used to store a one-dimensional array of SFVec3d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec3d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFVec3d/f (0, 0, 0).

### Instance Creation Method(s)

#### *mfVec3d/fObjectName* = new **MFVec3d/f** (*[SFVec3d/f, SFVec3d/f, ...]*)

The creation method can be passed 0 or more SFVec3d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None

## MFVec4d/MFVec4f Object

The MFVec4d/f object corresponds to a X3D MFVec4d/f field. It is used to store a one-dimensional array of SFVec4d/f objects. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *mfVec4d/fObjectName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array). Assigning to an element with *index* > length results in the array being dynamically expanded to contain length elements. All elements not explicitly initialized are set to SFVec4d/f (0, 0, 0, 0).

### Instance Creation Method(s)

#### *mfVec4d/fObjectName* = new **MFVec4d/f** (*[SFVec4d/f, SFVec4d/f, ...]*)

The creation method can be passed 0 or more SFVec4d/f-valued expressions to initialize the elements of the array.

### Properties

#### **length**

An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.

### Methods

None
