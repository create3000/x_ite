---
title: Glossary
date: 2022-11-28
nav: main
categories: []
tags: [Glossary]
---
## Overview

X3D technologies contain long lists of jargon and abbreviations that are used in documentation and coding. This glossary provides definitions of words and abbreviations you need to know to successfully understand and build for the web.

## A

API
: Application Programming Interface. X3D includes a set of browser API function calls that provide an interface for controlling viewpoints, backgrounds, navigation information, and more.

attenuate
: To become less intense; to become fainter. The PointLight and SpotLight nodes have *attenuation* fields that allow you to specify how the light drops off as distance from the light source increases.

authoring tool
: A software application, such as [Sunrize](/sunrize/), used by content creators to build X3D worlds. The application has a graphical user interface so that the scene designer does not, in most cases, need to work directly with the X3D file.

avatar
: Geometry within the scene that represents the user. The location of the avatar corresponds to the user's viewing position.

AVIF
: AVIF (AV1 Image File Format) is a modern, highly efficient image format based on the AV1 video codec, designed for superior compression while maintaining high image quality. It supports HDR, transparency, animation, and wide color gamuts, making it a strong alternative to JPEG, PNG, and WebP. AVIF offers better compression efficiency than JPEG and WebP, leading to smaller file sizes with improved visual fidelity, and is widely supported by modern web browsers and software.

## B

backface culling
: Process of eliminating the polygonal faces whose normals point away from the viewer. These faces don't need to be drawn because they aren't visible.

behaviors
: A general term for the ability in X3D to animate objects an to specify interactions among objects through output events, input events, routes, sensors, and scripts. Behaviors enable an author to specify how an object acts and reacts, not just how it looks.

billboard
: The Billboard node, which usually contains a 2D surface that rotates around a specified axis so that it always faces the viewpoint. This node commonly uses 2D textures as a substitute for more complex 3D objects to improve performance. The Billboard node can also specify screen-aligned objects.

bind
: To activate a Background, Viewpoint, or NavigationInfo node (referred to as *bindable* nodes). To specify a new bindable node, use the *bind* event with value TRUE. Only one bindable node of each type can be bound at a time. The browser maintains a stack for each type of bindable node.

bindings
: A library of API function calls that use a particular programming language.

Boolean
: A value that is either TRUE or FALSE.

bounding box
: The smallest rectangular box that encloses a graphical object.

## C

clamping
: Limiting values to a certain range; in texture mapping, indicates that a texture should not be repeated. When a texture is clamped, the last row of pixels is repeated as much as necessary to fill the face of an object.

clones
: Multiple references to the same node within a file. A name for the node is defined with DEF. Subsequent references to the same node refer to it through the word USE plus the name of the node. Changes to the named node are reflected in all clones of that node.

collision proxy
: A simplified geometry used in place of the actual geometry to speed up collision testing.

coplanar
: Existing in the same plane. A set of points if a single plane passes through all of them.

crease angle
: A tolerance angle, in radians, that determines whether edges should be faceted or smooth-shaded. If the angle between the normals for two adjacent faces is less than or equal to the specified value for the *creaseAngle* field of certain geometry nodes, the edge between the two faces is smooth-shaded. If the angle between the normals for two adjacent faces is greater than the specified *creaseAngle*, the edge between the two adjacent faces is faceted.

culling
: Selecting objects to be ignored during rendering. Most browsers cull the view before they draw anything in the scene so that they don't waste time computing information about objects that aren't currently in view.

cumulative
: Adding the the previous value. In X3D, transformations accumulate from parent to child (that is, they add to each other).

## D

default
: Build-in value used when you do not explicitly specify a value.

drag sensor
: Sensor that generates events when the user moves a pointing device while holding down the device's button.

## E

event
: An indication that something has happened. Outgoing events send their values to incoming events, which receive values. The connection between two events is called a *route*.

## F

flat shading
: The simplest shading algorithm, called flat shading, consists of using an illumination model to determine the corresponding intensity value for the incident light, then shade the entire polygon according to this value. Flat shading is also known as constant shading or constant intensity shading. Its main advantage is that it is easy it implement. Flat shading produces satisfactory results under the following conditions: 1. The subject is illuminated by ambient light and there are no surface textures or shadows. 2. In the case of curved objects, when the surface changes gradually and the light source and viewer are far from the surface. 3. In general, when there are large numbers of plane surfaces. Figure shows three cases of flat shading of a conical surface. The more polygons, the better the rendering. With ﬂat shading, each triangle of a mesh is filled with a single color.

field
: A data element contained in a node. Each field has a name and a value of a particular type.

field of view
: An angle, in radians, that together with the *orientation* and *position* of the viewpoint determines which parts of the scene are visible in the window at a given time.

flipbook animation
: An animation created by displaying a series of texture maps onto a piece of geometry.

## G

Gouraud shading
: A method of interpolating colors for sophisticated shading of an object. The colors assigned to each vertex are interpolated linearly between the vertices and across each face of the polygon to achieve smooth gradations of color.

## I

index
: A number associated with an element in a list. Indexed lists in X3D start with 0. In an IndexedFaceSet, for example, each vertex has an associated index (the first point listed has the index 0, the second point has index 1, and so on). The faces of the polygon are formed by connecting the indices in the order specified.

interpolator
: A node that uses a mathematical formula to »fill in« the values between two specified values, transitioning smoothly from one to the other. The values can be color, position, size, orientation, or normal values.

## J

JPEG
: Joint Photographic Experts Group. JPEG is a form of lossy image compression designed by this group. X3D browsers must support JPEG compression.

## K

keyframes
: Key poses at particular points in time, used to create an animation sequence. The animation defines the keyframes and then uses interpolators to create in-between values to transition smoothly from one keyframe to the next.

## L

light
: A lighting node (a DirectionalLight, PointLight, or SpotLight node). In X3D, lighting node describes how part of the scene should be lit, but it does not specify geometry for the light itself.

lighting equation
: A formula for calculation how objects are shaded. This equation combines the color of the object with the color of the lights in the scene. It does not compute the shadows that would be cast by opaque objects between the light and the object being lit.

linked
: Also *hyperlinked.* In X3D objects can be linked to other X3D worlds or to HTML documents using the Anchor node. The user clicks a specified piece of geometry to load the new X3D world or the HTML document. Sound an movie files can also be linked.

local coordinate system
: The coordinate system defined by an object's Transform node (but before any of its parent Transform nodes are applied).

LOD
: Level of Detail. An LOD node specifies alternative representations for an object in a scene, with varying level of complexity, and is used to enhance performance.

lossy
: Refers to image compression techniques where some information from the original image is lost during compression. Reconstructing an image that was processed from the original, uncompressed file. By contrast, with *loosless* compression techniques, there is an exact match between the original data and the data reconstructed from the compressed original.

## M

marker
: A screen-aligned icon that is linked to other documents.

MPEG
: Motion Picture Experts Group. MPEG refers to the standard video format designed by this group. X3D browsers must support the MPEG format for movies.

multiple-valued
: A field that can contain more than one value of a particular type. Multiple-valued fields have names begin with MF. SF indicates a single-valued field.

## N

name
: A character string assigned to a node with DEF. Naming a node allows you to refer to the same node multiple times in a file without re-creating the node itself.

nesting
: Adding a node as the child of another node of the same type. For example, Transform nodes can be nested, in which case their transformations have a cumulative effect.

node
: The basic unit of an X3D file. A node contains data for the scene in the form of *fields.* Some nodes also contain *events* (outgoing, incoming, or both).

normal vector
: A directional line perpendicular to a surface, with length 1. A vector starts at the origin and passes through the given point.

## O

origin
: The point (0, 0, 0), where all simple geometry nodes are initially created.

## P

panorama
: Distant scenery, such as mountains and clouds, that does not translate or scale with respect the the viewer. The panorama is specified in the Background node.

performance LOD
: An LOD node that does not specify explicit ranges for use of its *levels.* Instead, the browser chooses the appropriate level to maintain an acceptable interactive frame rate.

Phong shading
: Phong shading refers to an interpolation technique for surface shading in 3D computer graphics. It is also called Phong interpolation or normal-vector interpolation shading. Specifically, it interpolates surface normals across rasterized polygons and computes pixel colors based on the interpolated normals and a reflection model. Phong shading improves upon Gouraud shading and provides a better approximation of the shading of a smooth surface.

piecewise linear
: Composed of straight-line segments (as posed to being composed of actual curves). In the Extrusion node, the *crossSection* an *spine* paths are both piecewise linear.

planar
: Indicates that all of a polygon's vertices are in the same plane.

PNG
: Portable Network Graphics Specification. A standard format for lossless bitmapped image files. X3D browsers must support the PNG format.

properties
: Surface attributes of a shape, which include color, smoothness, shininess, and texture. Properties are defined in an Appearance node. Nodes commonly used to specify an object's appearance are Material, ImageTexture, MovieTexture, and PixelTexture.

prototype
: A template for a new node type, which defines the fields and events that form the interface to the node. A prototype is defined as combination of standard (previously defined) nodes.

proxy server
: A computer that routes packets between an internal computer network and the outside world. The proxy server is security measure, since it prevents direct interaction between the internal and external networks.

## R

RGB
: A color system that uses red, green, and blue color components to describe a color.

right-handed
: Used to describe a coordinate system in which if the *+x* axis points to the right, and the *+y* axis points up, the *+z* axis points toward the viewer (out of the screen).

route
: Connection from an outgoing event to an incoming event of the same type.

## S

scene
: The collection of 3D objects defined in an X3D file; also referred to as a *world,* especially if it is large and immersive.

script
: A program, written in a language such as JavaScript, or Java, that is contained in the Script node. A script receives incoming events, process them, and generates outgoing events. It is useful in controlling animations, binding viewpoints, backgrounds, and navigation information, and in manipulating the scene hierarchy.

sensor
: A node that monitors a particular type of event, processes the input, and generates output events. Some sensors process user input from a pointing device such as a mouse, trackball or touch screen, and generate events. Other sensors respond to the passage of time (TimeSensor) and the location of the viewpoint in the scene (ProximitySensor).

server
: A computer connected to the Internet and dedicated to providing data over the Web.

shading
: Shading refers to the application of a reflection model over the surface of an object. To use the lighting and reflectance model to shade facets of a polygonal mesh — that is, to assign intensities to pixels to give the impression of opaque surfaces rather than wireframes.

shape
: The combination of geometry an appearance properties that describe a 3D object in an X3D scene.

siblings
: Nodes that are children of the same parent node.

stack
: A list of nodes, ordered from bottom to top, with the most recently added node on top. The usual analogy is to compare a stack to a nested collection of cafeteria trays in spring-loaded container. When a tray is removed from the top of the stack, the springs at the bottom of the container *pop* the remaining trays up to fill the emptied space. When a tray is added to the top of the stack, the others are *pushed* down.

## T

texture map
: A 2D image that is applied to a surface. Also referred to as a *texture.* It can be an JPEG or PNG format.

transformations
: Geometric changes that affect the coordinate system in which an object is drawn, by translating, rotating, and scaling the coordinates, as well as by changing the center of rotation and scaling for an object and changing the rotational orientation for scaling the object.

translating
: Moving an object in any or all directions (*x, y, z*).

transparency
: Degree to which light passes through an object. Transparency is specified in the Material node. Some textures also contain a transparency element.

## U

UTF-8
: The 8-bit character encoding scheme used by X3D. An acronym within an acronym; 8-bit USC Transformation Format (UTF). USC stands for Universal Coded Character Set. The ISO/IEC 10646 standard specifies the Universal Multiple-Octet Coded Character Set. This character set is used for the representation, transmission, interchange, processing, storage, input, and presentation of the written form of the language of the world, as well as additionally symbols.

## V

vertex-based
: Refers to shapes that are defined as a series of *x, y, z* coordinates, one for each vertex of the polygon. For example, IndexedFaceSet is a vertex-based node.

viewpoint
: The position, orientation, and »lens angle« that defines how the user sees the scene.

## W

white space
: Extra space between characters in the X3D file, created by tabs, spaces, and newlines. Commas are also treated as white space. White space adds to the readability of your files but makes them larger and thus require more transmission time. When you compress a file with *GZip,* unnecessary white space is automatically eliminated.

world coordinate system
: The coordinate system for the entire scene, which is the accumulation of all transformation specified in the scene.
