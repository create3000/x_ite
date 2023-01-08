---
title: ECMAScript Object and Function Definitions
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Ecmascript, Object, Function, Definitions]
---
## Overview

There are a fixed set of objects in ECMAScript, each of which have a fixed set of properties (i.e. values) and methods (i.e. functions). For all object types except Math, there are functions to create an instance of the object. The supported set of objects are:

* [Browser Services](browser-services)
* [Scene Services](scene-services)
* [Field Services and Objects](field-services-and-objects)
* [Route Services](route-services)
* [Prototype Services](prototype-services)
* [Constants Services](constants-services)

### parseInt and parseFloat Functions

These 2 functions are provided to convert a String value to an Number value.

#### Number **parseInt** (*s, [radix]*)

Converts the passed String, 's', to an integer valued number, using the optional passed numeric 'radix' as the base. If the radix is omitted base 10 is assumed. Numbers can be in decimal (123), hexadecimal (0x5C) or octal (0177) notation and may be preceded by a minus sign ('-'). Conversion stops at the first unrecognized character. If the string begins with an unrecognized character, 0 is returned.

#### Number **parseFloat** (*s*)

Converts the passed String, 's', to a floating point valued number. Numbers can be in fixed (1.23) or exponential (12E3) notation and both the mantissa and exponent may be preceded by a minus sign ('-'). Conversion stops at the first unrecognized character. If the string begins with an unrecognized character, 0 is returned.

## Math Object

The Math object is unique in ECMAScript in that there is exactly one globally available instance of the object, named Math. Properties can be accessed using the syntax Math.\<property-name\>. Methods can be invoked using the syntax Math.\<function-name\> ( \<argument-list\> ).

### Instance Creation Method\(s\)

None. One global instance of the object is available. The name of the instance is Math.

### Properties

#### **E**

Euler's constant, e, approximately 2.718.

#### **LN10**

Natural logarithm of 10, approximately 2.302.

#### **LN2**

Natural logarithm of 2, approximately 0.693.

#### **PI**

Ratio of the circumference of a circle to its diameter, approximately 3.1415.

#### **SQRT1_2**

Square root of ½, approximately 0.707.

#### **SQRT2**

Square root of 2, approximately 1.414.

### Methods

#### **abs** (*number*)

Returns the absolute value of *number.*

#### **acos** (number)

Returns the arc cosine (in radians) of *number.*

#### **asin** (number)

Returns the arc sine (in radians) of *number.*

#### **atan** (number)

Returns the arc tangent (in radians) of *number.*

#### **ceil** (number)

Returns the least integer greater than or equal to *number.*

#### **cos** (number)

Returns the cosine of *number* where *number* is expressed in radians.

#### **exp** (*number*)

Returns *e,* to the power of *number* (i.e. *e*<sup>*number*</sup>).

#### **floor** (*number*)

Returns the greatest integer less than or equal to its argument.

#### **log** (*number)*

Returns the natural logarithm (base *e*) of *number.*

#### **max** (*number1*, *number2*)

Returns the greater of *number1* and *number2.*

#### **min** (*number1*, *number2*)

Returns the lesser of *number1* and *number2.*

#### **pow** (*base*, *exponent*)

Returns *base* to the *exponent* power (i.e. *base*<sup>*exponent*</sup>).

#### **random** ()

Returns a pseudo-random number between zero and one.

#### **round** (*number*)

Returns the value of *number* rounded to the nearest integer.

#### **sin** (*number*)

Returns the sine of *number* where *number* is expressed in radians.

#### **sqrt** (*number*)

Returns the square root of its argument.

#### **tan** (*number*)

Returns the tangent of *number*, where *number* is expressed in radians.
