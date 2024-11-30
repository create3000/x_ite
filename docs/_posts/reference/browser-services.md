---
title: Browser Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Browser, Services, Authoring, Interface]
---
## Browser Object

This section lists the methods available in the *browser* object, which allows scripts to get and set browser information.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user. One global instance of the object is available. The name of the instance is Browser.

### Properties

#### **name**: string

A browser-implementation specific string describing the browser. This property is read only.

#### **version**: string

A browser-implementation specific string describing the browser version. This property is read only.

#### **providerURL**: string

If provided, the URL to the entity that wrote this browser. This property is read only.

#### **currentSpeed**: number

The current speed of the avatar in m/s. This property is read only.

#### **currentFrameRate**: number

The current frame rate in frames per second. This property is read only.

#### **description**: string
{: .writable }

A user-defined String which can be read and written.

#### **supportedProfiles**: ProfileInfoArray

Returns the list of all profiles that are supported by this browser. This property is read only.

#### **supportedComponents**: ComponentInfoArray

Returns a list of all components that are supported by this browser. This property is read only.

#### **concreteNodes**: ConcreteNodesArray

Returns a list of all concrete node classes that are supported by this browser. This property is read only.

#### **abstractNodes**: AbstractNodesArray

Returns a list of all abstract node classes that are supported by this browser. This property is read only.

#### **baseURL**: string
{: .writable }

A String value which can be read and written, containing the URL against which relative URLs are resolved. By default, this is the address of the web page itself. Although this feature is rarely needed, it can be useful when loading a `data:` or `blob:` URL with `Browser.loadURL`, or when using `Browser.createX3DFromString`. The value of *baseURL* will only be used with the external browser.

#### **currentScene**: X3DScene | X3DExecutionContext

The real type of this class is dependent on whether the user code is inside a prototype instance or not. If the user code is inside a prototype instance the property represent an X3DExecutionContext otherwise it represent an X3DScene. This property is read only.

#### **activeLayer**: SFNode | null

Returns the active layer, if any. The active layer is the layer on which navigation takes place. This property is read only.

#### **activeNavigationInfo**: SFNode | null

Returns the bound NavigationInfo node in the active layer, if any. This property is read only.

#### **activeViewpoint**: SFNode | null

Returns the bound X3DViewpointNode in the active layer, if any. This property is read only.

#### **element**: X3DCanvasElement

Returns a reference to the corresponding X3DCanvasElement. This property is read only.

### Methods

#### **getSupportedProfile** (*name: string*): ProfileInfo

The `getSupportedProfile` service returns a ProfileInfo object of the named profile from the `supportedProfiles` array. The parameter is the name of a profile from which to fetch the declaration. The browser only returns a ProfileInfo object if it supports the named profile. If it does not support the named profile, an error is thrown.

#### **getSupportedComponent** (*name: string*): ComponentInfo

The `getSupportedComponent` service returns a ComponentInfo object of the named component from the `supportedComponents` array. The parameter is the name of a component from which to fetch the declaration. The browser only returns a ComponentInfo object if it supports the named component. If it does not support the component, an error is thrown.

#### **getProfile** (*name: string*): ProfileInfo

The `getProfile` service returns a ProfileInfo object of the named profile. The parameter is the name of a profile from which to fetch the declaration. The browser only returns a ProfileInfo object if it supports the named profile. If it does not support the named profile, an error is thrown.

#### **getComponent** (*name: string, level?: number*): ComponentInfo

The `getComponent` service returns a ComponentInfo object of the named component. The first parameter is the name of a component and the second the level from which to fetch the declaration. The browser only return a ComponentInfo object if it supports the named component and the requested level. If it does not support the component at the level desired, an error is thrown. If level is omitted, it defaults to the highest supported level of this component.

#### **createScene** (*profile: ProfileInfo, ... components: ComponentInfo []*): X3DScene

The `createScene` service creates a new empty scene that conforms to the given profile and component declarations.

#### **loadComponents** (*... args: Array \<X3DScene | ProfileInfo | ComponentInfoArray | ComponentInfo | string\>*): Promise\<void\> <small class="blue">non standard</small>

Loads all components, external and internal, specified by `args`. If the argument is a `string`, the name of a component must be given.

#### **replaceWorld** (*scene: X3DScene*): Promise\<void\>

Replace the current world with this new scene that has been loaded or constructed from somewhere. A Promise is returned that will be resolved when the scene is completely loaded.

#### **createX3DFromString** (*x3dSyntax: string*): Promise\<X3DScene\>

The string may be any valid X3D content in any language supported by the browser implementation. If the browser does not support the content encoding the appropriate exception will be thrown.

#### **createX3DFromURL** (*url: MFString, node: SFNode, event: string*): void

Parse the passed URL into an X3D scene. When complete send the passed event to the passed node. The event is a string with the name of an MFNode inputOnly field of the passed node.

#### **createX3DFromURL** (*url: MFString*): Promise\<X3DScene\>

Parse the passed URL into an X3D scene and return a Promise that resolves to an X3DScene object.

#### **loadURL** (*url: MFString, parameter?: MFString*): Promise\<void\>

Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return. The return value is a Promise object, that is resolved when the new scene is loaded.

#### **importDocument** (*dom: HTMLElement | string*): Promise\<X3DScene\>

Imports an X3D XML DOM document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.

#### **importJS** (*json: JSONObject | string*): Promise\<X3DScene\>

Imports an X3D JSON document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.

#### **getBrowserProperty** (*name: string*): boolean

Returns a browser property with the corresponding *name*.

##### Browser Properties

<table>
   <thead>
      <tr>
         <th>Name</th>
         <th>Type</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>ABSTRACT_NODES</td>
         <td>Boolean</td>
         <td>The browser implementation supports the ability to describe each node type with interfaces that correspond to the abstract node types as defined in ISO/IEC 19775-1 in addition to the basic requirement to support the X3DBaseNode abstract type. This indicates that the browser supports at least Conformance Level 2.</td>
      </tr>
      <tr>
         <td>CONCRETE_NODES</td>
         <td>Boolean</td>
         <td>The browser implementation supports the ability to describe each node type with interfaces that correspond to the concrete node types as defined in ISO/IEC 19775-1 in addition to the requirement to support all of the abstract types. This indicates that the browser supports at least Conformance Level 3.</td>
      </tr>
      <tr>
         <td>EXTERNAL_INTERACTIONS</td>
         <td>Boolean</td>
         <td>This browser supports the additional services required by external interfaces. A browser provided to user code in internal interactions does not set this property.</td>
      </tr>
      <tr>
         <td>PROTOTYPE_CREATE</td>
         <td>Boolean</td>
         <td>The browser implementation supports the ability to dynamically create PROTO and EXTERNPROTO representations through service requests. The basic service capability only allows the ability to create instances of predefined PROTO structures read from a file format.</td>
      </tr>
      <tr>
         <td>DOM_IMPORT</td>
         <td>Boolean</td>
         <td>The browser implementation supports the importDocument service request.</td>
      </tr>
      <tr>
         <td>XML_ENCODING</td>
         <td>Boolean</td>
         <td>The browser supports XML as a file format encoding.</td>
      </tr>
      <tr>
         <td>CLASSIC_VRML_ENCODING</td>
         <td>Boolean</td>
         <td>The browser supports the Classic VRML encoding.</td>
      </tr>
      <tr>
         <td>BINARY_ENCODING</td>
         <td>Boolean</td>
         <td>The browser supports the binary file format encoding.</td>
      </tr>
   </tbody>
</table>

#### **getBrowserOption** (*name: string*): any

Returns a browser option with the corresponding *name*.

##### Browser Options

<table>
   <thead>
      <tr>
         <th>Name</th>
         <th>Description</th>
         <th>Type / valid range</th>
         <th>Default</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Antialiased</td>
         <td>Render using hardware antialiasing if available.</td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>Dashboard</td>
         <td>Display browser navigation user interface.</td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>Rubberband</td>
         <td>Display a rubberband line when walk or fly.</td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>EnableInlineViewpoints</td>
         <td>Viewpoints from Inline nodes are included in list of viewpoints if made available by the Inline node.</td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>MotionBlur</td>
         <td>Render animations with motion blur.</td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>PrimitiveQuality</td>
         <td>Render quality (tesselation level) for Box, Cone, Cylinder, Sphere.</td>
         <td>LOW, MEDIUM, HIGH</td>
         <td>MEDIUM</td>
      </tr>
      <tr>
         <td>QualityWhenMoving</td>
         <td>Render quality while camera is moving.</td>
         <td>LOW, MEDIUM, HIGH, SAME (as while stationary)</td>
         <td>SAME</td>
      </tr>
      <tr>
         <td>Shading</td>
         <td>Specify shading mode for all objects.</td>
         <td>POINT, WIREFRAME, FLAT, GOURAUD, PHONG</td>
         <td>GOURAUD</td>
      </tr>
      <tr>
         <td>SplashScreen</td>
         <td>Display browser splash screen on startup.</td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>TextureQuality</td>
         <td>Quality of texture map display.</td>
         <td>LOW, MEDIUM, HIGH</td>
         <td>MEDIUM</td>
      </tr>
      <tr>
         <td>AutoUpdate</td>
         <td>Whether the update control of the browser should be done automatically or not. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>Cache</td>
         <td>Whether or not files should be cached. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>ColorSpace</td>
         <td>The color space in which color calculations take place. <small class="blue">non standard</small></td>
         <td>SRGB, LINEAR_WHEN_PHYSICAL_MATERIAL, LINEAR</td>
         <td>LINEAR_WHEN_PHYSICAL_MATERIAL</td>
      </tr>
      <tr>
         <td>ContentScale</td>
         <td>Factor with which the internal canvas size should be scaled. If set to -1, window.devicePixelRatio is used. <small class="blue">non standard</small></td>
         <td>Float</td>
         <td>1</td>
      </tr>
      <tr>
         <td>ContextMenu</td>
         <td>Whether or not the context menu can be displayed. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>Debug</td>
         <td>Whether or not debug message should be printed into the console. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>Exposure</td>
         <td>The exposure of an image describes the amount of light that is captured. This option only works with PhysicalMaterial node and SpecularGlossinessMaterial node. <small class="blue">non standard</small></td>
         <td>Float</td>
         <td>1</td>
      </tr>
      <tr>
         <td>Gravity</td>
         <td>Default is gravity of Earth. <small class="blue">non standard</small></td>
         <td>Float</td>
         <td>9.80665</td>
      </tr>
      <tr>
         <td>LoadUrlObjects</td>
         <td>Wether X3DUrlObject should be loaded. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>LogarithmicDepthBuffer</td>
         <td>Whether to use a logarithmic depth buffer. It may be necessary to use this if dealing with huge differences in scale in a single scene. It is automatically enabled if a GeoViewpoint is bound. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>Multisampling</td>
         <td>Number of samples used for multisampling. <small class="blue">non standard</small></td>
         <td>Integer</td>
         <td>4</td>
      </tr>
      <tr>
         <td>Notifications</td>
         <td>Whether or not notifications should be displayed. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>OrderIndependentTransparency</td>
         <td>Whether to use order independent transparency rendering technique. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>StraightenHorizon</td>
         <td>Whether the Examine Viewer should straighten the horizon when navigating. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>TextCompression</td>
         <td>Controls how Text.<em>length</em> and Text.<em>maxExtent</em> are handled. Either by adjusting char spacing or by scaling text letters. <small class="blue">non standard</small></td>
         <td>CHAR_SPACING, SCALING</td>
         <td>CHAR_SPACING</td>
      </tr>
      <tr>
         <td>Timings</td>
         <td>Whether browser timings should be displayed. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>false</td>
      </tr>
      <tr>
         <td>ToneMapping</td>
         <td>Whether tone mapping should be applied. <small class="blue">non standard</small></td>
         <td>NONE, ACES_NARKOWICZ, ACES_HILL, ACES_HILL_EXPOSURE_BOOST, KHR_PBR_NEUTRAL</td>
         <td>KHR_PBR_NEUTRAL</td>
      </tr>
      <tr>
         <td>XRButton</td>
         <td>Whether to display an XR button in the lower right corner of the canvas. <small class="blue">non standard</small></td>
         <td>Boolean</td>
         <td>true</td>
      </tr>
      <tr>
         <td>XRMovementControl</td>
         <td>When an XR session is active, you can control motion either by using the viewer pose of the VR device or by using the position and orientation of the currently bound viewpoint of the active layer. <small class="blue">non standard</small></td>
         <td>VIEWER_POSE, VIEWPOINT</td>
         <td>VIEWER_POSE</td>
      </tr>
      <tr>
         <td>XRSessionMode</td>
         <td>A String defining the XR session mode. If the value is NONE, no XR button is displayed and all attempts to start a session are ignored. See also <a href="https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#parameters" target="blank">XRSystem.requestSession</a>. <small class="blue">non standard</small></td>
         <td>NONE, IMMERSIVE_AR, IMMERSIVE_VR</td>
         <td>IMMERSIVE_VR</td>
      </tr>
   </tbody>
</table>

#### **setBrowserOption** (*name: string, value: any*): void

Sets a browser option with the corresponding *name* to the given value.

#### **getRenderingProperty** (*name: string*): any

Returns a rendering property with the corresponding *name*.

##### Rendering Properties

<table>
   <thead>
      <tr>
         <th>Name</th>
         <th>Type</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Shading</td>
         <td>POINT, WIREFRAME, FLAT, GOURAUD, PHONG</td>
         <td>The type of shading algorithm in use. Typical values are Flat, Gouraud, Phong, Wireframe, Point.</td>
      </tr>
      <tr>
         <td>MaxTextureSize</td>
         <td>Integer</td>
         <td>The maximum texture size supported.</td>
      </tr>
      <tr>
         <td>TextureUnits</td>
         <td>Integer</td>
         <td>The number of texture units supported for doing multitexture.</td>
      </tr>
      <tr>
         <td>MaxLights</td>
         <td>Integer</td>
         <td>The maximum number of lights supported.</td>
      </tr>
      <tr>
         <td>Antialiased</td>
         <td>Boolean</td>
         <td>True or false if the rendering is currently anti-aliased or not.</td>
      </tr>
      <tr>
         <td>ColorDepth</td>
         <td>Integer</td>
         <td>The number of bits of color depth supported by the screen. Allows for optimized selection of textures, particularly for lower color depth screen capabilities.</td>
      </tr>
      <tr>
         <td>TextureMemory</td>
         <td>Float</td>
         <td>The amount of memory in megabytes available for textures to be placed on the video card.</td>
      </tr>
      <tr>
         <td>ContentScale</td>
         <td>Boolean</td>
         <td>Currently used factor to scale content. <small class="blue">non standard</small></td>
      </tr>
      <tr>
         <td>MaxAnisotropicDegree</td>
         <td>Float</td>
         <td>The maximum number of available anisotropy. <small class="blue">non standard</small></td>
      </tr>
      <tr>
         <td>MaxSamples</td>
         <td>Integer</td>
         <td>The maximum number of samples supported for doing multisampling. <small class="blue">non standard</small></td>
      </tr>
      <tr>
         <td>Multisampling</td>
         <td>Integer</td>
         <td>Number of samples currently used by multisampling. <small class="blue">non standard</small></td>
      </tr>
      <tr>
         <td>LogarithmicDepthBuffer</td>
         <td>Boolean</td>
         <td>True or false if the logarithmic depth buffer is currently enabled or not. <small class="blue">non standard</small></td>
      </tr>
   </tbody>
</table>

#### **addBrowserCallback** (*key: any, [event?: number,] callback: (event: number) => void*): void

Adds a browser *callback* function associated with *key,* where *key* can be of any type. The callback function is called when a browser event has been occurred. If *event* is omitted, the callback function is added to all events. The signature of the callback function is `function (event)`, where event is one of the **Browser Event Constants** defined in the [X3DConstants](/x_ite/reference/constants-services/#browser-event-constants) object:

| Event                           | Description                           |
|---------------------------------|---------------------------------------|
| X3DConstants .CONNECTION_ERROR  | Fired when scene could not be loaded. |
| X3DConstants .BROWSER_EVENT     | not used                              |
| X3DConstants .INITIALIZED_EVENT | Fired after scene is loaded.          |
| X3DConstants .SHUTDOWN_EVENT    | Fired before scene is unloaded.       |
| X3DConstants .INITIALIZED_ERROR | not used                              |

#### **removeBrowserCallback** (*key: any, event?: number*): void

Removes a browser callback function associated with *key* and *event*. If *event* is omitted, all callbacks associated with key will be removed.

#### **viewAll** (*[layer?: SFNode,] transitionTime?: number = 1*): void <small><span class="blue">non standard</span></small>

Modifies the current view to show the entire visible scene within *transitionTime* seconds. If *layerNode* is omitted, the active layer is used.

#### **nextViewpoint** (*layerNode?: SFNode*): void

Changes the bound viewpoint node to the next viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.

#### **previousViewpoint** (*layerNode?: SFNode*): void

Changes the bound viewpoint node to the previous viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.

#### **firstViewpoint** (*layerNode?: SFNode*): void

Changes the bound viewpoint node to the first viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.

#### **lastViewpoint**(*layerNode?: SFNode*): void

Changes the bound viewpoint node to the last viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.

#### **changeViewpoint** (*[layerNode: SFNode,] name: string*): void

Changes the bound viewpoint node to the viewpoint named *name*. The viewpoint must be available in *layerNode*. If *layerNode* is omitted, the active layer is used.

#### **print** (*... args: any []*): void

Prints *objects* to the browser's console without a newline character. Successive calls to this function append the descriptions on the same line. The output is the implicit call to the object's `toString ()` function.

#### **println** (*... args: any []*): void

Prints *objects* to the browser's console, inserting a newline character after the output. Successive calls to this function will result in each output presented on separate lines. The output is the implicit call to the object's `toString ()` function.

### VRML Methods

To be downward compatible with VRML, the following additional functions are available:

#### **getName** (): string

A browser-implementation specific string describing the browser.

#### **getVersion** (): string

A browser-implementation specific string describing the browser version.

#### **getCurrentSpeed** (): number

The current speed of the avatar in m/s.

#### **getCurrentFrameRate** (): number

The current frame rate in frames per second.

#### **getWorldURL** (): string

A string containing the URL of this execution context.

#### **replaceWorld** (*nodes: MFNode*): void

Replace the current world with this new nodes that has been loaded or constructed from somewhere.

#### **createVrmlFromString** (*vrmlSyntax: string*): MFNode

The string may be any valid VRML content.

#### **createVrmlFromURL** (*url: MFString, node: SFNode, event: string*): void

Parse the passed URL into an VRML scene. When complete send the passed event to the passed node. The event is a string with the name of an MFNode inputOnly field of the passed node.

#### **addRoute** (*sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string*): void

Add a route from the passed *sourceField* to the passed *destinationField*.

#### **deleteRoute** (*sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string*): void

Remove the route between the passed *sourceField* and passed *destinationField*, if one exists.

#### **loadURL** (*url: MFString, parameter?: MFString*): void

Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return.

#### **setDescription** (*description: string*): void

A user-defined String.

## X3DConcreteNode

The X3DConcreteNode interface defines an interface for concrete node types, it extends the X3DAbstractNode interface. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Static Properties

#### **containerField**: string

The default container field name for this node. This property is read only.

#### **specificationRange**: { from: string, to: string }

Returns an object with two strings defining the first version and last version where this node is specified. This property is read only.

#### **fieldDefinitions**: FieldDefinitionArray

Returns a list of fields defined for the SFNode object.

## X3DAbstractNode

The X3DAbstractNode interface defines an interface for concrete node types. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Static Properties

#### **typeName**: string

The node type name for this class. This property is read only.

#### **componentInfo**: { name: string, level: number }

Returns an object with two properties *name* and *level* which can be used to get a ComponentInfo object from the X3D browser. This property is read only.

## ConcreteNodesArray

ConcreteNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *concreteNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None

## AbstractNodesArray

AbstractNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *abstractNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read only.

### Methods

None
