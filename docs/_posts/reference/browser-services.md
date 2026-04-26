---
title: Browser Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Browser, X3DBrowser, ECMAScript, Javascript, glTF, VRML]
---
## Browser Object

This section lists the methods available in the *browser* object, which allows scripts to get and set browser information.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user. One global instance of the object is available. The name of the instance is Browser.

### Properties

#### **name**: string

A browser-implementation specific string describing the browser. This property is read-only.

#### **version**: string

A browser-implementation specific string describing the browser version. This property is read-only.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser name/version">
<pre>
print (Browser .name);
print (Browser .version);

// Expected output: X_ITE
// Expected output: {{ site.x_ite_latest_version }}
</pre>
</x3d-script-area>

#### **providerURL**: string

If provided, the URL to the entity that wrote this browser. This property is read-only.

#### **currentSpeed**: number

The current speed of the avatar in m/s. This property is read-only.

#### **currentFrameRate**: number

The current frame rate in frames per second. This property is read-only.

#### **description**: string
{: .writable }

A user-defined String which can be read and written.

#### **supportedProfiles**: ProfileInfoArray

Returns the list of all profiles that are supported by this browser. This property is read-only.

#### **supportedComponents**: ComponentInfoArray

Returns a list of all components that are supported by this browser. This property is read-only.

#### **concreteNodes**: ConcreteNodesArray

Returns a list of all concrete node classes that are supported by this browser. This property is read-only.

#### **abstractNodes**: AbstractNodesArray

Returns a list of all abstract node classes that are supported by this browser. This property is read-only.

#### **baseURL**: string
{: .writable }

A String value which can be read and written, containing the URL against which relative URLs are resolved. By default, this is the address of the web page itself. Although this feature is rarely needed, it can be useful when loading a `data:` or `blob:` URL with `Browser.loadURL`, or when using `Browser.createX3DFromString`. The value of *baseURL* will only be used with the external browser.

#### **currentScene**: X3DScene | X3DExecutionContext

The real type of this class is dependent on whether the user code is inside a prototype instance or not. If the user code is inside a prototype instance the property represent an X3DExecutionContext otherwise it represent an X3DScene. This property is read-only.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser currentScene">
<pre>
const node = Browser .currentScene .createNode ("Transform");

Browser .currentScene .rootNodes .push (node);

print (Browser .currentScene .rootNodes .length);
// Expected output: 1
</pre>
</x3d-script-area>

#### **activeLayer**: SFNode | null

Returns the active layer, if any. The active layer is the layer on which navigation takes place. This property is read-only.

#### **activeNavigationInfo**: SFNode | null

Returns the bound NavigationInfo node in the active layer, if any. This property is read-only.

#### **activeViewpoint**: SFNode | null

Returns the bound X3DViewpointNode in the active layer, if any. This property is read-only.

#### **contextMenu**: ContextMenu

Returns a reference to the corresponding ContextMenu. This property is read-only.

#### **element**: X3DCanvasElement

Returns a reference to the corresponding X3DCanvasElement. This property is read-only.

### Methods

#### **getSupportedProfile** (*name: string*): ProfileInfo

The `getSupportedProfile` service returns a ProfileInfo object of the named profile from the `supportedProfiles` array. The parameter is the name of a profile from which to fetch the declaration. The browser only returns a ProfileInfo object if it supports the named profile. If it does not support the named profile, an error is thrown.

* [List of supported profiles](/x_ite/profiles/overview/)

#### **getSupportedComponent** (*name: string*): ComponentInfo

The `getSupportedComponent` service returns a ComponentInfo object of the named component from the `supportedComponents` array. The parameter is the name of a component from which to fetch the declaration. The browser only returns a ComponentInfo object if it supports the named component. If it does not support the component, an error is thrown.

* [List of supported components](/x_ite/components/overview/)

#### **getProfile** (*name: string*): ProfileInfo

The `getProfile` service returns a ProfileInfo object of the named profile. The parameter is the name of a profile from which to fetch the declaration. The browser only returns a ProfileInfo object if it supports the named profile. If it does not support the named profile, an error is thrown.

* [List of supported profiles](/x_ite/profiles/overview/)

#### **getComponent** (*name: string, level?: number*): ComponentInfo

The `getComponent` service returns a ComponentInfo object of the named component. The first parameter is the name of a component and the second the level from which to fetch the declaration. The browser only return a ComponentInfo object if it supports the named component and the requested level. If it does not support the component at the level desired, an error is thrown. If level is omitted, it defaults to the highest supported level of this component.

* [List of supported components](/x_ite/components/overview/)

#### **createScene** (*profile: ProfileInfo, ... components: ComponentInfo []*): Promise\<X3DScene\>

The `createScene` service creates a new empty scene that conforms to the given profile and component declarations. The Promise resolves when all components are loaded.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser createScene">
<pre>
const profile    = Browser .getProfile ("Interactive");
const components = [Browser .getComponent ("Geometry2D"), Browser .getComponent ("Scripting")];
const scene      = await Browser .createScene (profile, ... components);

print (scene .profile .name);
for (const component of scene .components)
  print (component .name);

// Expected output: Interactive
// Expected output: Geometry2D
// Expected output: Scripting
</pre>
</x3d-script-area>

<!--
#### **loadComponents** (*... args: Array \<X3DScene | ProfileInfo | ComponentInfoArray | ComponentInfo | string\>*): Promise\<void\> <small class="blue">non-standard</small>

Loads all components, external and internal, specified by `args`. If the argument is a `string`, the name of a component must be given.
-->

#### **replaceWorld** (*scene: X3DScene*): Promise\<void\>

Replace the current world with this new scene that has been loaded or constructed from somewhere. A Promise is returned that will be resolved when the scene is completely loaded.

#### **createX3DFromString** (*x3dSyntax: string*): Promise\<X3DScene\>

The string may be any valid X3D content in any language supported by the browser implementation ([Supported File Formats](/x_ite/#supported-file-formats)). If the browser does not support the content encoding the appropriate exception will be thrown.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser createX3DFromString">
<pre>
const scene = await Browser .createX3DFromString (`#X3D V{{ site.x3d_latest_version }} utf8
PROFILE Interchange
Transform { }
Group { }
`);

print (scene .rootNodes .length);
// Expected output: 2
</pre>
</x3d-script-area>

#### **createX3DFromURL** (*url: MFString, node: SFNode, event: string*): void

Parse the passed URL into an X3D scene. When complete send the passed event to the passed node. The event is a string with the name of an MFNode inputOnly field of the passed node. The loaded file can be any of the [Supported File Formats](/x_ite/#supported-file-formats).

#### **createX3DFromURL** (*url: MFString*): Promise\<X3DScene\>

Parse the passed URL into an X3D scene and return a Promise that resolves to an X3DScene object. The loaded file can be any of the [Supported File Formats](/x_ite/#supported-file-formats).

#### **loadURL** (*url: MFString, parameter?: MFString*): Promise\<void\>

Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return. The return value is a Promise object, that is resolved when the new scene is loaded. The loaded file can be any of the [Supported File Formats](/x_ite/#supported-file-formats).

#### **importDocument** (*dom: HTMLElement | string*): Promise\<X3DScene\>

Imports an X3D XML DOM document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.

#### **importJS** (*json: JSONObject | string*): Promise\<X3DScene\>

Imports an X3D JSON document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.

#### **getBrowserProperty** (*name: string*): boolean

Returns a browser property with the corresponding *name*.

##### Browser Properties

| Name | Type | Description |
|------|------|-------------|
| ABSTRACT_NODES | Boolean | The browser implementation supports the ability to describe each node type with interfaces that correspond to the abstract node types as defined in ISO/IEC 19775-1 in addition to the basic requirement to support the X3DBaseNode abstract type. This indicates that the browser supports at least Conformance Level 2. |
| CONCRETE_NODES | Boolean | The browser implementation supports the ability to describe each node type with interfaces that correspond to the concrete node types as defined in ISO/IEC 19775-1 in addition to the requirement to support all of the abstract types. This indicates that the browser supports at least Conformance Level 3. |
| EXTERNAL_INTERACTIONS | Boolean | This browser supports the additional services required by external interfaces. A browser provided to user code in internal interactions does not set this property. |
| PROTOTYPE_CREATE | Boolean | The browser implementation supports the ability to dynamically create PROTO and EXTERNPROTO representations through service requests. The basic service capability only allows the ability to create instances of predefined PROTO structures read from a file format. |
| DOM_IMPORT | Boolean | The browser implementation supports the importDocument service request. |
| XML_ENCODING | Boolean | The browser supports XML as a file format encoding. |
| CLASSIC_VRML_ENCODING | Boolean | The browser supports the Classic VRML encoding. |
| BINARY_ENCODING | Boolean | The browser supports the binary file format encoding. |

#### **getBrowserOption** (*name: string*): any

Returns a browser option with the corresponding *name*.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser getBrowserOption">
<pre>
print (Browser .getBrowserOption ("ColorSpace"));
print (Browser .getBrowserOption ("TextCompression"));

// Expected output: LINEAR_WHEN_PHYSICAL_MATERIAL
// Expected output: CHAR_SPACING
</pre>
</x3d-script-area>

##### Browser Options

| Name | Description | Type / valid range | Default |
|------|-------------|--------------------|---------|
| Antialiased | Render using hardware antialiasing if available. | Boolean | false |
| Dashboard | Display browser navigation user interface. | Boolean | true |
| Rubberband | Display a rubberband line when walk or fly. | Boolean | true |
| EnableInlineViewpoints | Viewpoints from Inline nodes are included in list of viewpoints if made available by the Inline node. | Boolean | true |
| MotionBlur | Render animations with motion blur. | Boolean | false |
| PrimitiveQuality | Render quality (tesselation level) for Box, Cone, Cylinder, Sphere. | LOW, MEDIUM, HIGH | MEDIUM |
| QualityWhenMoving | Render quality while camera is moving. | LOW, MEDIUM, HIGH, SAME (as while stationary) | SAME |
| Shading | Specify shading mode for all objects. | POINT, WIREFRAME, FLAT, GOURAUD, PHONG | GOURAUD |
| SplashScreen | Display browser splash screen on startup. | Boolean | true |
| TextureQuality | Quality of texture map display. | LOW, MEDIUM, HIGH | MEDIUM |
| AutoUpdate | Whether the update control of the browser should be done automatically or not. If true, animations will be disabled if the &lt;x3d-canvas&gt; element is not visible. <small class="blue">non-standard</small> | Boolean | false |
| Cache | Whether or not files should be cached. <small class="blue">non-standard</small> | Boolean | true |
| ColorSpace | The color space in which colors are defined and color calculations take place. <small class="blue">non-standard</small> | SRGB, LINEAR_WHEN_PHYSICAL_MATERIAL, LINEAR | LINEAR_WHEN_PHYSICAL_MATERIAL |
| ContentScale | Factor with which the internal canvas size should be scaled. If set to -1, window.devicePixelRatio is used. <small class="blue">non-standard</small> | Float | 1 |
| ContextMenu | Whether or not the context menu can be displayed. <small class="blue">non-standard</small> | Boolean | true |
| Debug | Whether or not debug message should be printed into the console. <small class="blue">non-standard</small> | Boolean | false |
| DisplayColorSpace | The color space which is used for the framebuffer and when textures are converted. You may want to set the `ColorSpace` option to `LINEAR` if you use `DISPLAY_P3`. <small class="blue">non-standard</small> | SRGB, DISPLAY_P3 | SRGB |
| Exposure | The exposure of an image describes the amount of light that is captured. <small class="blue">non-standard</small> | Float | 1 |
| Gravity | Default is gravity of Earth. <small class="blue">non-standard</small> | Float | 9.80665 |
| LoadUrlObjects | Wether X3DUrlObject nodes should be loaded. <small class="blue">non-standard</small> | Boolean | true |
| LogarithmicDepthBuffer | Whether to use a logarithmic depth buffer. It may be necessary to use this if dealing with huge differences in scale in a single scene. It is automatically enabled if a GeoViewpoint node is bound. <small class="blue">non-standard</small> | Boolean | false |
| MaximumFrameRate | Caps the rendering frequency to reduce CPU usage and improve overall browser responsiveness. Animations will run at this controlled maximum FPS instead of the full device refresh rate. <small class="blue">non-standard</small> | Float | 80 |
| Multisampling | Number of samples used for multisampling. <small class="blue">non-standard</small> | Integer | 4 |
| Mute | Whether to mute all audio. <small class="blue">non-standard</small> | Boolean | false |
| Notifications | Whether or not notifications should be displayed. <small class="blue">non-standard</small> | Boolean | true |
| OrderIndependentTransparency | Whether to use order independent transparency rendering technique. <small class="blue">non-standard</small> | Boolean | false |
| StraightenHorizon | Whether the Examine Viewer should straighten the horizon when navigating. <small class="blue">non-standard</small> | Boolean | true |
| TextCompression | Controls how Text.*length* and Text.*maxExtent* are handled. Either by adjusting char spacing or by scaling text letters. <small class="blue">non-standard</small> | CHAR_SPACING, SCALING | CHAR_SPACING |
| Timings | Whether browser timings should be displayed. <small class="blue">non-standard</small> | Boolean | false |
| ToneMapping | Whether tone mapping should be applied. <small class="blue">non-standard</small> | NONE, ACES_NARKOWICZ, ACES_HILL, ACES_HILL_EXPOSURE_BOOST, KHR_PBR_NEUTRAL | KHR_PBR_NEUTRAL |
| WallFriction | Defines how strongly the avatar resists sliding along walls during collisions, where 0 means no resistance (very slippery) and 1 means maximum resistance (no sliding). <small class="blue">non-standard</small> | Float | 0 |
| XRSessionMode | A String defining the XR session mode. If the value is NONE, no XR button is displayed and all attempts to start a session are ignored. See also [XRSystem.requestSession](https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#parameters). <small class="blue">non-standard</small> | NONE, IMMERSIVE_AR, IMMERSIVE_VR, INLINE | IMMERSIVE_VR |

#### **setBrowserOption** (*name: string, value: any*): void

Sets a browser option with the corresponding *name* to the given value.

<!--
#### **addBrowserOptionCallback** (*key: any, name: string, callback: (value: unknown) => void*): void

Adds a browser option callback function, if external browser interface is used. *key* is a custom key of any type associated with the *callback*, this key can later be used to remove the callback. *name* is the name of the browser option to which the callback should be connected. The callback is called when the property has been changed.

#### **removeBrowserOptionCallback** (*key: any, name: string*): void

Removes a browser option callback function associated with *key* and *name* from the browser option.
-->

#### **getRenderingProperty** (*name: string*): any

Returns a rendering property with the corresponding *name*.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser getRenderingProperty">
<pre>
print (Browser .getRenderingProperty ("Antialiased"));
print (Browser .getRenderingProperty ("ContentScale"));

// Expected output: true
// Expected output: 1
</pre>
</x3d-script-area>

##### Rendering Properties

| Name | Type | Description |
|------|------|-------------|
| Shading | POINT, WIREFRAME, FLAT, GOURAUD, PHONG | The type of shading algorithm in use. Typical values are Flat, Gouraud, Phong, Wireframe, Point. |
| MaxTextureSize | Integer | The maximum texture size supported. |
| TextureUnits | Integer | The number of texture units supported for doing multitexture. |
| MaxLights | Integer | The maximum number of lights supported. |
| Antialiased | Boolean | `true` or `false` if the rendering is currently anti-aliased or not. |
| ColorDepth | Integer | The number of bits of color depth supported by the screen. Allows for optimized selection of textures, particularly for lower color depth screen capabilities. |
| TextureMemory | Float | The amount of memory in megabytes available for textures to be placed on the video card. |
| ContentScale | Boolean | Currently used factor to scale content. <small class="blue">non-standard</small> |
| LogarithmicDepthBuffer | Boolean | `true` or `false` if the logarithmic depth buffer is currently enabled or not. <small class="blue">non-standard</small> |
| MaxAnisotropicDegree | Float | The maximum number of available anisotropy. <small class="blue">non-standard</small> |
| MaxSamples | Integer | The maximum number of samples supported for doing multisampling. <small class="blue">non-standard</small> |
| Multisampling | Integer | Number of samples currently used by multisampling. <small class="blue">non-standard</small> |
| PixelsPerPoint | Float | Number of [pixels](https://developer.mozilla.org/en-US/docs/Glossary/CSS_pixel) per point. <small class="blue">non-standard</small> |
| XRSession | Boolean | `true` if a WebXR session is active, otherwise `false`. <small class="blue">non-standard</small> |

<!--
#### **addRenderingPropertyCallback** (*key: any, name: string, callback: (value: unknown) => void*): void

Adds a rendering property callback function, if external browser interface is used. *key* is a custom key of any type associated with the *callback*, this key can later be used to remove the callback. *name* is the name of the rendering property to which the callback should be connected. The callback is called when the property has been changed.

```js
browser .addRenderingPropertyCallback ("check", "XRSession", value =>
{
   console .log (`User ${value ? "entered" : "leaved"} WebXR.`);
});
```

#### **removeRenderingPropertyCallback** (*key: any, name: string*): void

Removes a rendering property callback function associated with *key* and *name* from the rendering property.
-->

#### **addBrowserCallback** (*key: any, [event?: number,] callback: (event: number) => void*): void

Adds a browser *callback* function associated with *key,* where *key* can be of any type. The callback function is called when a browser event has been occurred. If *event* is omitted, the callback function is added to all events. The signature of the callback function is `function (event)`, where event is one of the **Browser Event Constants** defined in the [X3DConstants](/x_ite/reference/constants-services/#browser-event-constants) object:

| Event                           | Description                           |
|---------------------------------|---------------------------------------|
| X3DConstants .CONNECTION_ERROR  | Fired when WebGL context is lost.     |
| X3DConstants .BROWSER_EVENT     | not used                              |
| X3DConstants .INITIALIZED_EVENT | Fired after scene is loaded.          |
| X3DConstants .SHUTDOWN_EVENT    | Fired before scene is unloaded.       |
| X3DConstants .INITIALIZED_ERROR | Fired when scene could not be loaded. |

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser addBrowserCallback" style="height: 630px">
<pre>
const canvas  = X3D .createBrowser ();
const browser = canvas .browser;

browser .addBrowserCallback ("check", X3D .X3DConstants .INITIALIZED_EVENT, () =>
{
  console .log ("Scene is loaded.");
});

await browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
#X3D V{{ site.x3d_latest_version }} utf8

PROFILE Interchange

Shape {
  appearance Appearance {
    material Material { }
  }
  geometry Box { }
}`));

console .log ("The scene is loaded here as well.");

// Expected output: Scene is loaded.
// Expected output: The scene is loaded here as well.
</pre>
</x3d-script-area>

#### **removeBrowserCallback** (*key: any, event?: number*): void

Removes a browser callback function associated with *key* and *event*. If *event* is omitted, all callbacks associated with key will be removed.

#### **viewAll** (*[layer?: X3DLayerNode,] transitionTime?: number = 1*): void <small class="blue">non-standard</small>

Modifies the current view to show the entire visible scene within *transitionTime* seconds. If *layer* is omitted, the active layer is used.

#### **nextViewpoint** (*layer?: X3DLayerNode*): void

Changes the bound viewpoint node to the next viewpoint in the list of user viewpoints of *layer*. If *layer* is omitted, the active layer is used.

#### **previousViewpoint** (*layer?: X3DLayerNode*): void

Changes the bound viewpoint node to the previous viewpoint in the list of user viewpoints of *layer*. If *layer* is omitted, the active layer is used.

#### **firstViewpoint** (*layer?: X3DLayerNode*): void

Changes the bound viewpoint node to the first viewpoint in the list of user viewpoints of *layer*. If *layer* is omitted, the active layer is used.

#### **lastViewpoint** (*layer?: X3DLayerNode*): void

Changes the bound viewpoint node to the last viewpoint in the list of user viewpoints of *layer*. If *layer* is omitted, the active layer is used.

#### **changeViewpoint** (*[layer: X3DLayerNode,] name: string*): void

Changes the bound viewpoint node to the viewpoint named *name*. The viewpoint must be available in *layer*. If *layer* is omitted, the active layer is used.

#### **setCursors** (*cursorTypes: CursorTypes*): void <small class="blue">non-standard</small>

Changes the default cursor images to the ones specified in *cursorTypes*. You can omit properties if you want to use the default cursor image for this action. The values can be any valid CSS cursor.

The CursorTypes object has the following properties:

```ts
type CursorTypes = {
   DEFAULT: string;
   GRABBING: string;
   MOVE: string;
   POINTER: string;
   WAIT: string;
};
```

##### See Also

* [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor)

#### **constrainTranslation** (*[layer: X3DLayerNode,] translation: SFVec3d | SFVec3f*): SFVec3f <small class="blue">non-standard</small>

Constrains a *translation*, which should be added to the position of the active viewpoint, to a possible value that avatar can move to. If the avatar reaches or intersects with an obstacle the translation is either constrained to slide along the wall or to stop. If *layer* is omitted, the active layer is used.

```js
const constrained = Browser .constrainTranslation (translation);

viewpoint .position = viewpoint .position .add (constrained);
```

#### **getClosestObject** (*[layer: X3DLayerNode,] direction: SFVec3d | SFVec3f*): ClosestObject <small class="blue">non-standard</small>

Returns the closest collidable object when looked in *direction*, measured from the active viewpoint position. The maximum detection radius is `2 * avatarHeight` (where *avatarHeight* is the second value of [NavigationInfo](/x_ite/components/navigation/navigationinfo/) *avatarSize*). Compare *distance* with *collisionRadius* (first value of [NavigationInfo](/x_ite/components/navigation/navigationinfo/) *avatarSize*) to detect if a collision with an object occurs. If *layer* is omitted, the active layer is used.

The return value is an object of type ClosestObject with the following properties:

```ts
type ClosestObject = {
   node: X3DShapeNode | null,
   distance: number,
   normal: SFVec3f | null,
};
```

#### **loseContext** (): void <small class="blue">non-standard</small>

Loses the WebGL context.

#### **beginUpdate** (): void

Start processing events.

#### **endUpdate** (): void

Stop processing events.

#### **print** (*... args: any []*): void

Prints *objects* to the browser's console without a newline character. Successive calls to this function append the descriptions on the same line. The output is the implicit call to the object's `toString ()` function.

#### **println** (*... args: any []*): void

Prints *objects* to the browser's console, inserting a newline character after the output. Successive calls to this function will result in each output presented on separate lines. The output is the implicit call to the object's `toString ()` function.

<x3d-script-area name="X3D ECMAScript Example: X3DBrowser println">
<pre>
Browser .println ("Debug output ...");
Browser .println ("comes here:");
Browser .println (new SFVec3f (1, 2, 3));

// Expected output: Debug output ...
// Expected output: comes here:
// Expected output: 1 2 3
</pre>
</x3d-script-area>

#### **dispose** (): void

Disposes this X3DBrowser. The object can then no longer be used.

### Legacy VRML Methods

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

Add a route in the current scene from the passed *sourceField* to the passed *destinationField*.

#### **deleteRoute** (*sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string*): void

Remove the route in the current scene between the passed *sourceField* and passed *destinationField*, if one exists.

#### **loadURL** (*url: MFString, parameter?: MFString*): void

Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return.

#### **setDescription** (*description: string*): void

A user-defined String.

## X3DConcreteNode

The X3DConcreteNode interface defines an interface for concrete node types, it extends the X3DAbstractNode interface. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Static Properties

#### **typeName**: string

The node type name for this class. This property is read-only.

#### **componentInfo**: { name: string, level: number }

Returns an object with two properties *name* and *level* which can be used to get a ComponentInfo object from the X3D browser. This property is read-only.

#### **containerField**: string

The default container field name for this node. This property is read-only.

#### **specificationRange**: { from: string, to: string }

Returns an object with two strings defining the first version and last version where this node is specified. This property is read-only.

#### **fieldDefinitions**: FieldDefinitionArray

Returns a list of fields defined for the SFNode object.

## X3DAbstractNode

The X3DAbstractNode interface defines an interface for concrete node types. The object consists solely of read-only properties. It does not define any additional functions.

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Static Properties

#### **typeName**: string

The node type name for this class. This property is read-only.

#### **componentInfo**: { name: string, level: number }

Returns an object with two properties *name* and *level* which can be used to get a ComponentInfo object from the X3D browser. This property is read-only.

## ConcreteNodesArray

ConcreteNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *concreteNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Iterator

The `[@@iterator]()` method of ConcreteNodesArray instances implements the iterable protocol and allows ConcreteNodesArray objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns an iterator object that yields the object's properties in order.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read-only.

### Methods

Almost all read-only functions known from JavaScript [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## AbstractNodesArray

AbstractNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *abstractNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).

### Instance Creation Method(s)

None. This object cannot be instantiated by the user.

### Iterator

The `[@@iterator]()` method of AbstractNodesArray instances implements the iterable protocol and allows AbstractNodesArray objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns an iterator object that yields the object's properties in order.

### Properties

#### **length**: number

An integer containing the number of elements in the array. This property is read-only.

### Methods

Almost all read-only functions known from JavaScript [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
