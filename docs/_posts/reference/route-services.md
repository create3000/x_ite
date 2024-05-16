---
title: Route Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Route, Services, Authoring, Interface]
---
## X3DRoute

Routes are represented by the X3DRoute object. Routes can only be created through calls to the addRoute () function of X3DExecutionContext.

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **sourceNode**

A reference to the node that is the source of this route.

#### **sourceField**

A string of the name of the field in the source node.

#### **destinationNode**

A reference to the node that is the destination of this route.

#### **destinationField**

A string of the name of the field in the destination node.

### Methods

None.

## RouteArray

RouteArray is an object that represents an array of X3DRoute objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *routeArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method\(s\)

None. This object cannot be instantiated by the user.

### Properties

#### **length**

An integer containing the number of elements in the array. This property is read only.

### Methods

None
