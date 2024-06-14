// Type definitions for X3D
// Project: X_ITE
// Definitions by: Glen Whitney <https://github.com/gwhitney>, Holger Seelig <https://github.com/create3000>

// Handle both importing via UMD and modules:
export default X3D;
export = X3D;

declare const X3D: X3D;

/**
 * Namespace for all X3D objects.
 */
interface X3D
{
   /**
    * There is the X3D object which is globally available, it expects one function handler that is called when the browsers (\<x3d-canvas\> elements) are ready, and a second function handler, that is called if an error occurred. These two arguments are optional. The return value of the X3D function is a Promise, which can be used instead of the arguments.
    */
   (callback?: () => void, fallback?: (error: Error) => void): Promise <void>;

   /**
    * In X_ITE's case, the `X3D` function object is the main entry function. If you need to use another JavaScript library alongside X_ITE, return control of the `X3D` function object back to the other library with a call to `X3D .noConflict ()`. Old references of `X3D` function object are saved during X_ITE initialization; `X3D .noConflict ()` simply restores them. The return value is the `X3D` function object itself.
    */
   noConflict (): X3D;
   /**
    * Creates a new x3d-canvas DOM element, initializes it and returns it. Throws an exception if the browser object cannot be created.
    */
   createBrowser (): X3DCanvasElement;
   /**
    * The selector argument must be a string containing a valid CSS selector expression to match elements against, or a valid X3DCanvasElement. If no selector was given, »x3d-canvas« is used as selector string. The return value is the appropriate X3DBrowser object.
    */
   getBrowser (selector?: string | X3DCanvasElement): X3DBrowser;

   readonly X3DConstants: X3DConstants;
   readonly X3DBrowser: typeof X3DBrowser;
   readonly X3DExecutionContext: typeof X3DExecutionContext;
   readonly X3DScene: typeof X3DScene;
   readonly ComponentInfo: typeof ComponentInfo;
   readonly ComponentInfoArray: typeof ComponentInfoArray;
   readonly ProfileInfo: typeof ProfileInfo;
   readonly ProfileInfoArray: typeof ProfileInfoArray;
   readonly UnitInfo: typeof UnitInfo;
   readonly UnitInfoArray: typeof UnitInfoArray;
   readonly ExternProtoDeclarationArray: typeof ExternProtoDeclarationArray;
   readonly ProtoDeclarationArray: typeof ProtoDeclarationArray;
   readonly X3DExternProtoDeclaration: typeof X3DExternProtoDeclaration;
   readonly X3DProtoDeclaration: typeof X3DProtoDeclaration;
   readonly NamedNodesArray: typeof NamedNodesArray;
   readonly ImportedNodesArray: typeof ImportedNodesArray;
   readonly X3DImportedNode: typeof X3DImportedNode;
   readonly ExportedNodesArray: typeof ExportedNodesArray;
   readonly X3DExportedNode: typeof X3DExportedNode;
   readonly RouteArray: typeof RouteArray;
   readonly X3DRoute: typeof X3DRoute;

   readonly X3DFieldDefinition: typeof X3DFieldDefinition;
   readonly FieldDefinitionArray: typeof FieldDefinitionArray;

   readonly X3DField: typeof X3DField;
   readonly X3DArrayField: typeof X3DArrayField;

   // SF* fields

   readonly SFBool: typeof SFBool;
   readonly SFColor: typeof SFColor;
   readonly SFColorRGBA: typeof SFColorRGBA;
   readonly SFDouble: typeof SFDouble;
   readonly SFFloat: typeof SFFloat;
   readonly SFImage: typeof SFImage;
   readonly SFInt32: typeof SFInt32;
   readonly SFMatrix3d: typeof SFMatrix3d;
   readonly SFMatrix3f: typeof SFMatrix3f;
   readonly SFMatrix4d: typeof SFMatrix4d;
   readonly SFMatrix4f: typeof SFMatrix4f;
   readonly SFNode: typeof SFNode;
   readonly SFRotation: typeof SFRotation;
   readonly SFString: typeof SFString;
   readonly SFTime: typeof SFTime;
   readonly SFVec2d: typeof SFVec2d;
   readonly SFVec2f: typeof SFVec2f;
   readonly SFVec3d: typeof SFVec3d;
   readonly SFVec3f: typeof SFVec3f;
   readonly SFVec4d: typeof SFVec4d;
   readonly SFVec4f: typeof SFVec4f;

   // MF* fields

   readonly MFBool: typeof MFBool;
   readonly MFColor: typeof MFColor;
   readonly MFColorRGBA: typeof MFColorRGBA;
   readonly MFDouble: typeof MFDouble;
   readonly MFFloat: typeof MFFloat;
   readonly MFImage: typeof MFImage;
   readonly MFInt32: typeof MFInt32;
   readonly MFMatrix3d: typeof MFMatrix3d;
   readonly MFMatrix3f: typeof MFMatrix3f;
   readonly MFMatrix4d: typeof MFMatrix4d;
   readonly MFMatrix4f: typeof MFMatrix4f;
   readonly MFNode: typeof MFNode;
   readonly MFRotation: typeof MFRotation;
   readonly MFString: typeof MFString;
   readonly MFTime: typeof MFTime;
   readonly MFVec2d: typeof MFVec2d;
   readonly MFVec2f: typeof MFVec2f;
   readonly MFVec3d: typeof MFVec3d;
   readonly MFVec3f: typeof MFVec3f;
   readonly MFVec4d: typeof MFVec4d;
   readonly MFVec4f: typeof MFVec4f;
}

/**
 * The X3DCanvasElement, \<x3d-canvas\>, is the main element that displays the X3D content. It defines some functions to be used with this object.
 */
declare class X3DCanvasElement extends HTMLElement
{
   /**
    * A reference to the X3DBrowser object that is associated with this element.
    */
   readonly browser: X3DBrowser;

   /**
    * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream.
    */
   captureStream (frameRate?: number): MediaStream;
   /**
    * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob.
    */
   toBlob (callback: (blob: Blob) => void, type?: string, quality?: number): void;
   /**
    * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL.
    */
   toDataURL (type?: string, encoderOptions?: number): string;
}

/**
 * This section lists the methods available in the *browser* object, which allows scripts to get and set browser information.
 */
declare class X3DBrowser
{
   /**
    * A browser-implementation specific string describing the browser.
    */
   readonly name: string;
   /**
    * A browser-implementation specific string describing the browser version.
    */
   readonly version: string;
   /**
    * If provided, the URL to the entity that wrote this browser.
    */
   readonly providerURL: string;
   /**
    * The current speed of the avatar in m/s.
    */
   readonly currentSpeed: number;
   /**
    * The current frame rate in frames per second.
    */
   readonly currentFrameRate: number;
   /**
    * A user-defined String which can be read and written.
    */
   description: string;
   /**
    * Returns the list of all profiles that are supported by this browser.
    */
   readonly supportedProfiles: ProfileInfoArray;
   /**
    * Returns a list of all components that are supported by this browser.
    */
   readonly supportedComponents: ComponentInfoArray;
   /**
    * Returns a list of all concrete node classes that are supported by this browser.
    */
   readonly concreteNodes: ConcreteNodesArray;
   /**
    * Returns a list of all abstract node classes that are supported by this browser.
    */
   readonly abstractNodes: AbstractNodesArray;
   /**
    * Returns a list of all field type classes that are supported by this browser.
    */
   readonly fieldTypes: FieldTypesArray;
   /**
    * A String value containing the URL against which relative URLs are resolved. By default, this is the address of the web page itself. Although this feature is rarely needed, it can be useful when loading a `data:` or `blob:` URL with `Browser.loadURL`, or when using `Browser.createX3DFromString`. The value of *baseURL* will only be used with the external browser.
    */
   baseURL: string;
   /**
    * The real type of this class is dependent on whether the user code is inside a prototype instance or not. If the user code is inside a prototype instance the property represent an X3DExecutionContext otherwise it represent an X3DScene.
    */
   readonly currentScene: X3DScene;
   /**
    * Returns a reference to the corresponding X3DCanvasElement.
    */
   readonly element: X3DCanvasElement;
   /**
    * Replace the current world with this new scene that has been loaded or constructed from somewhere. A Promise is returned that will be resolved when the scene is completely loaded.
    */
   replaceWorld (scene: X3DScene): Promise <void>;
   /**
    * The string may be any valid X3D content in any language supported by the browser implementation. If the browser does not support the content encoding the appropriate exception will be thrown.
    */
   createX3DFromString (x3dSyntax: string): Promise <X3DScene>;
   /**
    * Parse the passed URL into an X3D scene and return a Promise that resolves to an X3DScene object.
    */
   createX3DFromURL (url: MFString): Promise <X3DScene>;
   /**
    * Parse the passed URL into an X3D scene. When complete send the passed event to the passed node. The event is a string with the name of an MFNode inputOnly field of the passed node.
    */
   createX3DFromURL (url: MFString, node: SFNode, fieldName: string): void;
   /**
    * Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return. The return value is a Promise object, that is resolved when the new scene is loaded.
    */
   loadURL (url: MFString, parameter?: MFString): Promise <void>;
   /**
    * Imports an X3D XML DOM document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.
    */
   importDocument (dom: HTMLElement | string): Promise <X3DScene>;
   /**
    * Imports an X3D JSON document or fragment, converts it, and returns a Promise that resolves to an X3DScene object.
    */
   importJS (json: string | JSONObject): Promise <X3DScene>;
   /**
    * Returns a browser property with the corresponding *name*.
    */
   getBrowserProperty (name: BrowserProperty): boolean;
   /**
    * Returns a browser option with the corresponding *name*.
    */
   getBrowserOption <T extends keyof BrowserOption> (name: T): BrowserOption [T];
   /**
    * Sets a browser option with the corresponding *name* to the given value.
    */
   setBrowserOption <T extends keyof BrowserOption> (name: T, value: BrowserOption [T]): void;
   /**
    * Returns a rendering property with the corresponding *name*.
    */
   getRenderingProperty <T extends keyof RenderingProperty> (name: T): RenderingProperty [T];
   getContextMenu (): ContextMenu;
   /**
    * Adds a browser *callback* function associated with *key,* where *key* can be of any type. The callback function is called when a browser event has been occurred. If *event* is omitted, the callback function is added to all events. The signature of the callback function is `function (event)`, where event can be any value listed below:
    *
    * - X3DConstants .CONNECTION_ERROR
    * - X3DConstants .BROWSER_EVENT
    * - X3DConstants .INITIALIZED_EVENT
    * - X3DConstants .SHUTDOWN_EVENT
    * - X3DConstants .INITIALIZED_ERROR
    */
   addBrowserCallback (key: any, callback?: (event: number) => void): void;
   addBrowserCallback (key: any, event: number, callback?: (event: number) => void): void;
   /**
    * Removes a browser callback function associated with *key* and *event*. If *event* is omitted, all callback associated whit key are removed.
    */
   removeBrowserCallback (key: any, event?: number): void;
   /**
    * Modifies the current view to show the entire visible scene within *transitionTime* seconds. If *layerNode* is omitted, the active layer is used.
    */
   viewAll (layer?: SFNode, transitionTime?: number): void;
   /**
    * Changes the bound viewpoint node to the next viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.
    */
   nextViewpoint (layer?: SFNode): void;
   /**
    * Changes the bound viewpoint node to the previous viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.
    */
   previousViewpoint (layer?: SFNode): void;
   /**
    * Changes the bound viewpoint node to the first viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.
    */
   firstViewpoint (layer?: SFNode): void;
   /**
    * Changes the bound viewpoint node to the last viewpoint in the list of user viewpoints of *layerNode*. If *layerNode* is omitted, the active layer is used.
    */
   lastViewpoint (layer?: SFNode): void;
   /**
    * Changes the bound viewpoint node to the viewpoint named *name*. The viewpoint must be available in *layerNode*. If *layerNode* is omitted, the active layer is used.
    */
   changeViewpoint (name: string): void;
   changeViewpoint (layer: SFNode, name: string): void;
   /**
    * Prints *args* to the browser's console without a newline character. Successive calls to this function append the descriptions on the same line. The output is the implicit call to the object's `toString ()` function.
    */
   print (... args: any []): void;
   /**
    * Prints *args* to the browser’s console, inserting a newline character after the output. Successive calls to this function will result in each output presented on separate lines. The output is the implicit call to the object’s `toString ()` function.
    */
   printLn (... args: any []): void;
   /**
    * Returns the X3D VRML-encoded string of current scene that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    */
   toVRMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D XML-encoded string of current scene that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    *
    * For *options* see `X3DScene.toVRMLString`.
    */
   toXMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D JSON-encoded string of current scene that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    *
    * For *options* see `X3DScene.toVRMLString`.
    */
   toJSONString (options?: ToStringOptions): string;
   /**
    * Disposes this object.
    */
   dispose (): void;

   // VRML methods

   /**
    * A browser-implementation specific string describing the browser.
    */
   getName (): string;
   /**
    * A browser-implementation specific string describing the browser version.
    */
   getVersion (): string;
   /**
    * The current speed of the avatar in m/s.
    */
   getCurrentSpeed (): number;
   /**
    * The current frame rate in frames per second.
    */
   getCurrentFrameRate (): number;
   /**
    * A string containing the URL of this execution context.
    */
   getWorldURL (): string;
   /**
    * Replace the current world with this new nodes that has been loaded or constructed from somewhere.
    */
   replaceWorld (nodes: MFNode): Promise <void>;
   /**
    * The string may be any valid VRML content.
    */
   createVrmlFromString (vrmlSyntax: string): MFNode;
   /**
    * Parse the passed URL into an VRML scene. When complete send the passed event to the passed node. The event is a string with the name of an MFNode inputOnly field of the passed node.
    */
   createVrmlFromURL (url: MFString, node: SFNode, fieldName: string): void;
   /**
    * Add a route from the passed *sourceField* to the passed *destinationField*.
    */
   addRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   /**
    * Remove the route between the passed *sourceField* and passed *destinationField*, if one exists.
    */
   deleteRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   /**
    * Load the passed URL, using the passed parameter string to possibly redirect it to another frame. If the destination is the frame containing the current scene, this method may never return.
    */
   loadURL (url: MFString, parameter?: MFString): void;
   /**
    * A user-defined String.
    */
   setDescription (description: string): void;
}

type JSONValue =
   | string
   | number
   | boolean
   | null
   | JSONValue []
   | { [key: string]: JSONValue }

interface JSONObject
{
   [k: string]: JSONValue;
}

type BrowserProperty = "ABSTRACT_NODES"
   | "CONCRETE NODES"
   | "EXTERNAL_INTERACTIONS"
   | "PROTOTYPE_CREATE"
   | "DOM_IMPORT"
   | "XML_ENCODING"
   | "CLASSIC_VRML_ENCODING"
   | "BINARY_ENCODING";

type BrowserOption = {
   Antialiased:                  boolean,
   Dashboard:                    boolean,
   Rubberband:                   boolean,
   EnableInlineViewpoints:       boolean,
   MotionBlur:                   boolean,
   PrimitiveQuality:             QualityLevels,
   QualityWhenMoving:            QualityLevels | "SAME",
   Shading:	                     ShadingTypes,
   SplashScreen:                 boolean,
   TextureQuality:               QualityLevels,
   AutoUpdate:                   boolean,
   Cache:                        boolean,
   ContentScale:                 number,
   ContextMenu:                  boolean,
   Debug:                        boolean,
   Gravity:                      number,
   LogarithmicDepthBuffer:       boolean,
   Multisampling:                number,
   Notifications:                boolean,
   OrderIndependentTransparency: boolean,
   StraightenHorizon:            boolean,
   Timings:                      boolean,
}

type QualityLevels = "LOW" | "MEDIUM" | "HIGH";
type ShadingTypes = "POINT" | "WIREFRAME" | "FLAT" | "GOURAUD" | "PHONG";

type RenderingProperty = {
   Shading:	               ShadingTypes,
   MaxTextureSize:         number,
   TextureUnits:           number,
   MaxLights:              number,
   Antialiased:            boolean,
   ColorDepth:             number,
   TextureMemory:          number,
   ContentScale:           number,
   MaxSamples:             number,
   Multisampling:          number,
   LogarithmicDepthBuffer: boolean,
}

declare class ContextMenu
{
   getUserMenu (): UserMenuCallback;
   setUserMenu (cb: UserMenuCallback): void;
}

type ContextMenuOptions = {
   selector: string,
   items: UserMenuItems,
   appendTo?: string | HTMLElement,
   triggers: string,
   hideOnSecondTrigger?: boolean,
   selectableSubMenu?: boolean,
   reposition?: boolean,
   delay?: number,
   autoHide?: boolean,
   zindex?: number | (($trigger: string, options: ContextMenuOptions) => number)
   className?: string,
   classNames?: Record <string, string>,
   animation?: {duration: number, show: string, hide: string},
   events?: Record <string, (options: ContextMenuOptions) => boolean>,
   position?: (options: unknown, x?: number|string, y?: number|string) => void,
   determinePosition?: (menu: unknown) => void,
   callback?: MenuCallback,
   build?: ($triggerElement: unknown, e: Event) => ContextMenuOptions,
   itemClickEvent?: string,
};

type UserMenuCallback = (browser: X3DBrowser) => UserMenuItems;
type UserMenuItems = Record <string, UserMenuItem>;
type MenuCallback = (itemKey: string, options: ContextMenuOptions, event: Event) => (boolean | void);
type MenuIconCallback = (options: ContextMenuOptions, $itemElement: HTMLElement, itemKey: string, item: unknown) => string;
type MenuBoolCallback = (itemKey: string, options: ContextMenuOptions) => boolean;
type UserMenuItem = {
   name: string,
   isHtmlName?: boolean,
   callback: MenuCallback,
   className?: string,
   icon?: string | MenuIconCallback,
   disabled?: boolean | MenuBoolCallback,
   visible?: boolean | MenuBoolCallback,
   type?: string,
   events?: Record <string, unknown>,
   value?: string,
   selected?: boolean | string,
   radio?: string,
   options?: Record <string|number, string>,
   height?: number,
   items?: UserMenuItems,
   accesskey?: string,
   dataAttr?: Record <string, string>,
};

/**
 * A scene is an extension of the execution context services with additional services provided.
 */
declare class X3DScene extends X3DExecutionContext
{
   /**
    * When used inside a prototype instance, this property is not writable. The MFNode object instance is also not be writable. When used anywhere else, it is writable.
    */
   rootNodes: MFNode;
   /**
    * A reference to the ExportedNodesArray object used by this execution context. This property is read only.
    */
   readonly exportedNodes: ExportedNodesArray;

   /**
    * Returns the metadata values array associated with *name*.
    */
   getMetaData (name: string): string [];
   /**
    * Creates or updates the metadata with *name* and *value.*
    */
   setMetaData (name: string, value: string | string []): void;
   /**
    * Adds the metadata with *name* and *value.*
    */
   addMetaData (name: string, value: string): void;
   /**
    * Removes the metadata *name.*
    */
   removeMetaData (name: string): void;
   /**
    * Adds *node* to the list of root nodes. If the node already exists, the function silently returns.
    */
   addRootNode (node: SFNode): void;
   /**
    * Removes *node* from the list of root nodes.
    */
   removeRootNode (node: SFNode): void;
   /**
    * Returns a reference to the node with the exported name *exportedName.* If no exported node *exportedName* is found an exception is thrown.
    */
   getExportedNode (exportedName: string): SFNode;
   /**
    * Creates the exported node *exportedName.*
    */
   addExportedNode (exportedName: string, node: SFNode): void;
   /**
    * Creates or updates the exported node *exportedName.*
    */
   updateExportedNode (exportedName: string, node: SFNode): void;
   /**
    * Removes the exported node *exportedName.*
    */
   removeExportedNode (exportedName: string): void;
   /**
    * Returns the X3D VRML-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    *
    * #### Options
    *
    * An object with one or more of these properties:
    *
    * - **style:** String, output style, one of: **"TIDY"**, "COMPACT", "SMALL", "CLEAN"
    * - **indent:** String, initial indent, default: ""
    * - **precision:** Integer, float precision, default: 7
    * - **doublePrecision:** Integer, double precision, default: 15
    * - **html:** Boolean, HTML style, default: false
    * - **closingTags:** Boolean, use closing tags, default: false
    */
   toVRMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D XML-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    *
    * For *options* see `X3DScene.toVRMLString`.
    */
   toXMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D JSON-encoded string that, if parsed as the value of `createX3DFromString ()` of X3DBrowser, produce this scene.
    *
    * For *options* see `X3DScene.toVRMLString`.
    */
   toJSONString (options?: ToStringOptions): string;
   /**
    * Disposes this object.
    */
   dispose (): void;
}

/**
 * This section lists the methods available in the X3DExecutionContext object, which allows scripts to get access to the scene graph.
 */
declare class X3DExecutionContext
{
   /**
    * The string represent the basic specification version used by the parsed file in decimal format. For example, a scene conforming to this specification returns a value such as "4.0". This property is read only.
    */
   readonly specificationVersion: string;
   /**
    * The encoding is represented as a string that describes the data encoding used. Valid values are "ASCII", "VRML", "XML", "BINARY", "SCRIPTED", "BIFS", "NONE". This property is read only.
    */
   readonly encoding: "ASCII" | "VRML" | "XML" | "JSON" | "BINARY" | "SCRIPTED" | "BIFS" | "NONE" | "GLTF" | "OBJ" | "STL" | "PLY" | "SVG";
   /**
    * A reference to the ProfileInfo object used by this execution context. This property is read only.
    */
   readonly profile: ProfileInfo | null;
   /**
    * A reference to the ComponentInfoArray object used by this execution context. This property is read only.
    */
   readonly components: ComponentInfoArray;
   /**
    * A string containing the URL of this execution context. This property is read only.
    */
   readonly worldURL: string;
   /**
    * A string containing the URL against which relative URLs are resolved. This property is read only.
    */
   readonly baseURL: string;
   /**
    * A reference to the UnitInfoArray object used by this execution context. This property is read only.
    */
   readonly units: UnitInfoArray;
   /**
    * A reference to the NamedNodesArray object used by this execution context. This property is read only.
    */
   readonly namedNodes: NamedNodesArray;
   /**
    * A reference to the ImportedNodesArray object used by this execution context. This property is read only.
    */
   readonly importedNodes: ImportedNodesArray;
   /**
    * When used inside a prototype instance, this property is not writable. The MFNode object instance is also not be writable. When used anywhere else, it is writable.
    */
   readonly rootNodes: MFNode;
   /**
    * A reference to the ProtoDeclarationArray object used by this execution context. This property is read only.
    */
   readonly protos: ProtoDeclarationArray;
   /**
    * A reference to the ExternProtoDeclarationArray object used by this execution context. This property is read only.
    */
   readonly externprotos: ExternProtoDeclarationArray;
   /**
    * A reference to the RouteArray object used by this execution context. This property is read only.
    */
   readonly routes: RouteArray;

   /**
    * Creates a new default instance of the node given by the *typeName* string containing the name of an X3D node type.
    */
   createNode <T extends keyof ConcreteNodeTypes> (typeName: T): ConcreteNodeTypes [T];
   /**
    * Creates a new default instance of the prototype given by the *protoName* string containing the name of an prototype or extern prototype of this execution context.
    */
   createProto (protoName: string): X3DPrototypeInstanceProxy;
   /**
    * Returns a reference to the named node named by the string *name.* If no named node with the name *name* exists an exception is throw.
    */
   getNamedNode (name: string): SFNode;
   /**
    * Creates the named node referenced by *name.* This will give *node* a new name.
    */
   addNamedNode (name: string, node: SFNode): void;
   /**
    * Creates or updates the named node referenced by *name.* This will give *node* a new name.
    */
   updateNamedNode (name: string, node: SFNode): void;
   /**
    * Removes the named node *name.*
    */
   removeNamedNode (name: string): void;
   /**
    * Returns a reference to the imported node named by the string *importedName.* If no imported node with the imported name *importedName* exists an exception is throw.
    */
   getImportedNode (importedName: string): SFNode;
   /**
    * Creates the imported node *importedName.* If not *importedName* is given *exportedName* is used as imported name. The node to import must be an exported node named by *exportedName* in *inlineNode.*
    */
   addImportedNode (inlineNode: SFNode, exportedName: string, importedName?: string): void;
   /**
    * Creates or updates the imported node *importedName.* If not *importedName* is given *exportedName* is used as imported name. The node to import must be an exported node named by *exportedName* in *inlineNode.*
    */
   updateImportedNode (inlineNode: SFNode, exportedName: string, importedName?: string): void;
   /**
    * Removes the imported node *importedName.*
    */
   removeImportedNode (importedName: string): void;
   /**
    * Add a route from the passed *sourceField* to the passed *destinationField.* The return value is an X3DRoute object.
    */
   addRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): X3DRoute;
   /**
    * Remove the route if it is connected.
    */
   deleteRoute (route: X3DRoute): void;
   /**
    * Remove the route between the passed *sourceField* and passed *destinationField*, if one exists.
    */
   deleteRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
}

/**
 * ConcreteNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *concreteNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ConcreteNodesArray extends X3DInfoArray <X3DConcreteNode> { }

/**
 * The X3DConcreteNode interface defines an interface for concrete node types, it extends the X3DAbstractNode interface. The object consists solely of read-only properties. It does not define any additional functions.
 */
interface X3DConcreteNode extends X3DAbstractNode
{
   /**
    * The default container field name for this node. This property is read only.
    */
   static readonly containerField: string;
   /**
    * Returns an array with two strings defining the first version and last version where this node is specified. This property is read only.
    */
   static readonly specificationRange:
   {
      readonly from: string,
      readonly to: string,
   };
   /**
    * Returns a list of fields defined for the SFNode object.
    */
   static readonly fieldDefinitions: FieldDefinitionArray;
}

/**
 * AbstractNodesArray is an object that represents an array of classes derived from X3DNode. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *abstractNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class AbstractNodesArray extends X3DInfoArray <X3DAbstractNode> { }

/**
 * The X3DAbstractNode interface defines an interface for concrete node types. The object consists solely of read-only properties. It does not define any additional functions.
 */
interface X3DAbstractNode
{
   /**
    * The node type name for this class. This property is read only.
    */
   static readonly typeName: string;
   /**
    * Returns an object with two properties *name* and *level* which can be used to get a ComponentInfo object from the X3D browser. This property is read only.
    */
   static readonly componentInfo:
   {
      readonly name: string,
      readonly level: number,
   };
}

/**
 * FieldTypesArray is an object that represents an array of classes derived from X3DField. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *FieldTypesArray*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class FieldTypesArray extends X3DInfoArray <X3DField> { }

/**
 * ProfileInfoArray is an object that represents an array of ProfileInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *profileInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ProfileInfoArray extends X3DInfoArray <ProfileInfo> { }

/**
 * This object stores information about a particular X3D profile.
 */
declare class ProfileInfo
{
   /**
    * A string of the formal name of this profile. This property is read only.
    */
   readonly name: string;
   /**
    * A generic, freeform title string provided by the browser manufacturer. This property is read only.
    */
   readonly title: string;
   /**
    * If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.
    */
   readonly providerURL: string;
   /**
    * An ComponentInfoArray object of the ComponentInfo object instances that make up this profile. This property is read only.
    */
   readonly components: ComponentInfoArray
}

/**
 * ComponentInfoArray is an object that represents an array of ComponentInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *componentInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ComponentInfoArray extends X3DInfoArray <ComponentInfo> { }

/**
 * The ComponentInfo object stores information about a particular X3D component. The object consists solely of read-only properties. It does not define any additional functions.
 */
declare class ComponentInfo
{
   /**
    * A string of the formal name of this profile. This property is read only.
    */
   readonly name: string;
   /**
    * A number of the level of support of this instance. This property is read only.
    */
   readonly level: number;
   /**
    * A generic, freeform title string provided by the browser manufacturer. This property is read only.
    */
   readonly title: string;
   /**
    * If provided, the URL to the entity that wrote this component. This assumes that extensions to the browser may not necessarily be provided by the browser writer's themselves. This property is read only.
    */
   readonly providerURL: string;
}

/**
 * UnitInfoArray is an object that represents an array of UnitInfo objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *unitInfoArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class UnitInfoArray extends X3DInfoArray <UnitInfo> { }

/**
 * The UnitInfo object stores information about a particular unit declaration. The object consists solely of read-only properties. It does not define any additional functions.
 */
declare class UnitInfo
{
   /**
    * The category of default unit being modified as defined in the table. This property is read only.
    */
   readonly category: string;
   /**
    * A string of the name assigned to the new default unit. This property is read only.
    */
   readonly name: string;
   /**
    * The double-precision number needed to convert from the new default unit to the initial default unit. This property is read only.
    */
   readonly conversionFactor: number;
}

/**
 * NamedNodesArray is an object that represents an array of SFNode objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *namedNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class NamedNodesArray extends X3DInfoArray <SFNode> { }

/**
 * ImportedNodesArray is an object that represents an array of X3DImportedNode objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *importedNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ImportedNodesArray extends X3DInfoArray <X3DImportedNode> { }

/**
 * The X3DImportedNode object stores information about a particular import declaration. The object consists solely of read-only properties. It does not define any additional functions.
 */
class X3DImportedNode
{
   /**
    * The SFNode object of the Inline node. This property is read only.
    */
   readonly inlineNode: SFNode;
   /**
    * A string of the exported name. This property is read only.
    */
   readonly exportedName: string;
   /**
    * The SFNode object of the exported node. This property is read only.
    */
   readonly exportedNode: SFNode;
   /**
    * A string of the imported name. This property is read only.
    */
   readonly importedName: string;
}

/**
 * ExportedNodesArray is an object that represents an array of X3DExportedNode objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *exportedNodesArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ExportedNodesArray extends X3DInfoArray <X3DExportedNode> { }

/**
 * The X3DExportedNode object stores information about a particular export declaration. The object consists solely of read-only properties. It does not define any additional functions.
 */
class X3DExportedNode
{
   /**
    * A string of the exported name. This property is read only.
    */
   readonly exportedName: string;
   /**
    * The SFNode object of the corresponding node. This property is read only.
    */
   readonly localNode: SFNode;
}

/**
 * ProtoDeclarationArray is an object that represents an array of X3DProtoDeclaration objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *protoDeclarationArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ProtoDeclarationArray extends X3DInfoArray <X3DProtoDeclaration> { }

/**
 * A PROTO declaration is represented by the X3DProtoDeclaration object. This object can only be fetched using the X3DExecutionContext object.
 */
declare class X3DProtoDeclaration
{
   /**
    * A string of the declared name of this prototype. This property is read only.
    */
   readonly name: string;
   /**
    * A reference to FieldDefinitionArray of all the fields defined for this prototype. This property is read only.
    */
   readonly fields: FieldDefinitionArray;
   /**
    * Always has the value of false. This property is read only.
    */
   readonly isExternProto: false;

   /**
    * Creates a new default instance of the prototype.
    */
   newInstance (): X3DPrototypeInstanceProxy;
   /**
    * Returns the X3D VRML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toVRMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D XML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toXMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D JSON-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toJSONString (options?: ToStringOptions): string;
}

/**
 * ExternProtoDeclarationArray is an object that represents an array of X3DExternProtoDeclaration objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *externProtoDeclarationArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class ExternProtoDeclarationArray extends X3DInfoArray <X3DExternProtoDeclaration> { }

/**
 * An EXTERNPROTO declaration is represented by the X3DExternProtoDeclaration object. EXTERNPROTO declarations can only be fetched using the X3DExecutionContext object.
 */
declare class X3DExternProtoDeclaration
{
   /**
    * A string of the declared name of this extern prototype. This property is read only.
    */
   readonly name: string;
   /**
    * A reference to FieldDefinitionArray of all the fields defined for this extern prototype. This property is read only.
    */
   readonly fields: FieldDefinitionArray;
   /**
    * A MFString array of all the URI's defined for this extern prototype. This property is read only.
    */
   readonly urls: MFString;
   /**
    * Always has the value of true. This property is read only.
    */
   readonly isExternProto: true;
   /**
    * The value is one of the *_STATE* properties defined in the X3DConstants object. This property is read only.
    */
   readonly loadState: number;

   /**
    * Creates a new default instance of the extern prototype.
    */
   newInstance (): X3DPrototypeInstanceProxy;
   /**
    * Triggers the loading of the extern prototype. It returns a Promise that is resolved when the extern prototype is completely loaded and all instances are updated.
    */
   loadNow (): Promise <void>;
   /**
    * Returns the X3D VRML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toVRMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D XML-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toXMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D JSON-encoded string that, if parsed as the value of createX3DFromString () of X3DBrowser, produce this prototype.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toJSONString (options?: ToStringOptions): string;
}

/**
 * RouteArray is an object that represents an array of X3DRoute objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *routeArrayName*[*index*], where *index* is an integer-valued expression with 0\<=*index*\<length and length is the number of elements in the array).
 */
declare class RouteArray extends X3DInfoArray <X3DRoute> { }

/**
 * Routes are represented by the X3DRoute object. Routes can only be created through calls to the addRoute () function of X3DExecutionContext.
 */
declare class X3DRoute
{
   /**
    * A reference to the node that is the source of this route.
    */
   readonly sourceNode: SFNode;
   /**
    * A string of the name of the field in the source node.
    */
   readonly sourceField: string;
   /**
    * A reference to the node that is the destination of this route.
    */
   readonly destinationNode: SFNode;
   /**
    * A string of the name of the field in the destination node.
    */
   readonly destinationField: string;
}

declare class X3DInfoArray <T>
{
   [Symbol .iterator](): IterableIterator <T>;
   readonly [index: number]: T;
   readonly length: number;
}

/**
 * The X3DConstants object is used to define constants values used throughout this language binding. Each property is defined as a numeric, read-only value. The individual values are not specified; these are implementation-dependent. These constants can be used anywhere that a service request wishes to return some fixed value such as if or switch statements. The list of known values are defined in the table below.
 *
 * The X3DConstants object is unique in ECMAScript in that there is exactly one globally available instance of the object, named X3DConstants. Properties can be accessed using the syntax X3DConstants.\<property-name\>.
 *
 * The object consists solely of read-only properties. It does not define any additional functions.
 */
interface X3DConstants
{
   // Browser Event Constants

   readonly CONNECTION_ERROR: number;
   readonly BROWSER_EVENT: number;
   readonly INITIALIZED_EVENT: number;
   readonly SHUTDOWN_EVENT: number;
   readonly INITIALIZED_ERROR: number;

   // Load State Constants

   readonly NOT_STARTED_STATE: number;
   readonly IN_PROGRESS_STATE: number;
   readonly COMPLETE_STATE: number;
   readonly FAILED_STATE: number;

   // Access Type Constants

   readonly initializeOnly: 0b001;
   readonly inputOnly: 0b010;
   readonly outputOnly: 0b100;
   readonly inputOutput: 0b111;

   // Field Type Constants

   readonly SFBool: number;
   readonly SFColor: number;
   readonly SFColorRGBA: number;
   readonly SFDouble: number;
   readonly SFFloat: number;
   readonly SFImage: number;
   readonly SFInt32: number;
   readonly SFMatrix3d: number;
   readonly SFMatrix3f: number;
   readonly SFMatrix4d: number;
   readonly SFMatrix4f: number;
   readonly SFNode: number;
   readonly SFRotation: number;
   readonly SFString: number;
   readonly SFTime: number;
   readonly SFVec2d: number;
   readonly SFVec2f: number;
   readonly SFVec3d: number;
   readonly SFVec3f: number;
   readonly SFVec4d: number;
   readonly SFVec4f: number;

   readonly MFBool: number;
   readonly MFColor: number;
   readonly MFColorRGBA: number;
   readonly MFDouble: number;
   readonly MFFloat: number;
   readonly MFImage: number;
   readonly MFInt32: number;
   readonly MFMatrix3d: number;
   readonly MFMatrix3f: number;
   readonly MFMatrix4d: number;
   readonly MFMatrix4f: number;
   readonly MFNode: number;
   readonly MFRotation: number;
   readonly MFString: number;
   readonly MFTime: number;
   readonly MFVec2d: number;
   readonly MFVec2f: number;
   readonly MFVec3d: number;
   readonly MFVec3f: number;
   readonly MFVec4d: number;
   readonly MFVec4f: number;

   // CONCRETE NODE TYPES CONSTANTS START
   // DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED.

   // Concrete Node Types

   readonly AcousticProperties: number;
   readonly Analyser: number;
   readonly Anchor: number;
   readonly Appearance: number;
   readonly Arc2D: number;
   readonly ArcClose2D: number;
   readonly AudioClip: number;
   readonly AudioDestination: number;
   readonly Background: number;
   readonly BallJoint: number;
   readonly Billboard: number;
   readonly BiquadFilter: number;
   readonly BlendedVolumeStyle: number;
   readonly BlendMode: number;
   readonly BooleanFilter: number;
   readonly BooleanSequencer: number;
   readonly BooleanToggle: number;
   readonly BooleanTrigger: number;
   readonly BoundaryEnhancementVolumeStyle: number;
   readonly BoundedPhysicsModel: number;
   readonly Box: number;
   readonly BufferAudioSource: number;
   readonly CADAssembly: number;
   readonly CADFace: number;
   readonly CADLayer: number;
   readonly CADPart: number;
   readonly CartoonVolumeStyle: number;
   readonly ChannelMerger: number;
   readonly ChannelSelector: number;
   readonly ChannelSplitter: number;
   readonly Circle2D: number;
   readonly ClipPlane: number;
   readonly CollidableOffset: number;
   readonly CollidableShape: number;
   readonly Collision: number;
   readonly CollisionCollection: number;
   readonly CollisionSensor: number;
   readonly CollisionSpace: number;
   readonly Color: number;
   readonly ColorChaser: number;
   readonly ColorDamper: number;
   readonly ColorInterpolator: number;
   readonly ColorRGBA: number;
   readonly ComposedCubeMapTexture: number;
   readonly ComposedShader: number;
   readonly ComposedTexture3D: number;
   readonly ComposedVolumeStyle: number;
   readonly Cone: number;
   readonly ConeEmitter: number;
   readonly Contact: number;
   readonly Contour2D: number;
   readonly ContourPolyline2D: number;
   readonly Convolver: number;
   readonly Coordinate: number;
   readonly CoordinateChaser: number;
   readonly CoordinateDamper: number;
   readonly CoordinateDouble: number;
   readonly CoordinateInterpolator: number;
   readonly CoordinateInterpolator2D: number;
   readonly Cylinder: number;
   readonly CylinderSensor: number;
   readonly Delay: number;
   readonly DepthMode: number;
   readonly DirectionalLight: number;
   readonly DISEntityManager: number;
   readonly DISEntityTypeMapping: number;
   readonly Disk2D: number;
   readonly DoubleAxisHingeJoint: number;
   readonly DynamicsCompressor: number;
   readonly EaseInEaseOut: number;
   readonly EdgeEnhancementVolumeStyle: number;
   readonly ElevationGrid: number;
   readonly EnvironmentLight: number;
   readonly EspduTransform: number;
   readonly ExplosionEmitter: number;
   readonly Extrusion: number;
   readonly FillProperties: number;
   readonly FloatVertexAttribute: number;
   readonly Fog: number;
   readonly FogCoordinate: number;
   readonly FontStyle: number;
   readonly ForcePhysicsModel: number;
   readonly Gain: number;
   readonly GeneratedCubeMapTexture: number;
   readonly GeoCoordinate: number;
   readonly GeoElevationGrid: number;
   readonly GeoLocation: number;
   readonly GeoLOD: number;
   readonly GeoMetadata: number;
   readonly GeoOrigin: number;
   readonly GeoPositionInterpolator: number;
   readonly GeoProximitySensor: number;
   readonly GeoTouchSensor: number;
   readonly GeoTransform: number;
   readonly GeoViewpoint: number;
   readonly Group: number;
   readonly HAnimDisplacer: number;
   readonly HAnimHumanoid: number;
   readonly HAnimJoint: number;
   readonly HAnimMotion: number;
   readonly HAnimSegment: number;
   readonly HAnimSite: number;
   readonly ImageCubeMapTexture: number;
   readonly ImageTexture: number;
   readonly ImageTexture3D: number;
   readonly ImageTextureAtlas: number;
   readonly IndexedFaceSet: number;
   readonly IndexedLineSet: number;
   readonly IndexedQuadSet: number;
   readonly IndexedTriangleFanSet: number;
   readonly IndexedTriangleSet: number;
   readonly IndexedTriangleStripSet: number;
   readonly Inline: number;
   readonly IntegerSequencer: number;
   readonly IntegerTrigger: number;
   readonly IsoSurfaceVolumeData: number;
   readonly KeySensor: number;
   readonly Layer: number;
   readonly LayerSet: number;
   readonly Layout: number;
   readonly LayoutGroup: number;
   readonly LayoutLayer: number;
   readonly LinePickSensor: number;
   readonly LineProperties: number;
   readonly LineSet: number;
   readonly ListenerPointSource: number;
   readonly LoadSensor: number;
   readonly LocalFog: number;
   readonly LOD: number;
   readonly Material: number;
   readonly Matrix3VertexAttribute: number;
   readonly Matrix4VertexAttribute: number;
   readonly MetadataBoolean: number;
   readonly MetadataDouble: number;
   readonly MetadataFloat: number;
   readonly MetadataInteger: number;
   readonly MetadataSet: number;
   readonly MetadataString: number;
   readonly MicrophoneSource: number;
   readonly MotorJoint: number;
   readonly MovieTexture: number;
   readonly MultiTexture: number;
   readonly MultiTextureCoordinate: number;
   readonly MultiTextureTransform: number;
   readonly NavigationInfo: number;
   readonly Normal: number;
   readonly NormalInterpolator: number;
   readonly NurbsCurve: number;
   readonly NurbsCurve2D: number;
   readonly NurbsOrientationInterpolator: number;
   readonly NurbsPatchSurface: number;
   readonly NurbsPositionInterpolator: number;
   readonly NurbsSet: number;
   readonly NurbsSurfaceInterpolator: number;
   readonly NurbsSweptSurface: number;
   readonly NurbsSwungSurface: number;
   readonly NurbsTextureCoordinate: number;
   readonly NurbsTrimmedSurface: number;
   readonly OpacityMapVolumeStyle: number;
   readonly OrientationChaser: number;
   readonly OrientationDamper: number;
   readonly OrientationInterpolator: number;
   readonly OrthoViewpoint: number;
   readonly OscillatorSource: number;
   readonly PackagedShader: number;
   readonly ParticleSystem: number;
   readonly PeriodicWave: number;
   readonly PhysicalMaterial: number;
   readonly PickableGroup: number;
   readonly PixelTexture: number;
   readonly PixelTexture3D: number;
   readonly PlaneSensor: number;
   readonly PointEmitter: number;
   readonly PointLight: number;
   readonly PointPickSensor: number;
   readonly PointProperties: number;
   readonly PointSet: number;
   readonly Polyline2D: number;
   readonly PolylineEmitter: number;
   readonly Polypoint2D: number;
   readonly PositionChaser: number;
   readonly PositionChaser2D: number;
   readonly PositionDamper: number;
   readonly PositionDamper2D: number;
   readonly PositionInterpolator: number;
   readonly PositionInterpolator2D: number;
   readonly PrimitivePickSensor: number;
   readonly ProgramShader: number;
   readonly ProjectionVolumeStyle: number;
   readonly ProximitySensor: number;
   readonly QuadSet: number;
   readonly ReceiverPdu: number;
   readonly Rectangle2D: number;
   readonly RigidBody: number;
   readonly RigidBodyCollection: number;
   readonly ScalarChaser: number;
   readonly ScalarDamper: number;
   readonly ScalarInterpolator: number;
   readonly ScreenFontStyle: number;
   readonly ScreenGroup: number;
   readonly Script: number;
   readonly SegmentedVolumeData: number;
   readonly ShadedVolumeStyle: number;
   readonly ShaderPart: number;
   readonly ShaderProgram: number;
   readonly Shape: number;
   readonly SignalPdu: number;
   readonly SilhouetteEnhancementVolumeStyle: number;
   readonly SingleAxisHingeJoint: number;
   readonly SliderJoint: number;
   readonly Sound: number;
   readonly SpatialSound: number;
   readonly Sphere: number;
   readonly SphereSensor: number;
   readonly SplinePositionInterpolator: number;
   readonly SplinePositionInterpolator2D: number;
   readonly SplineScalarInterpolator: number;
   readonly SpotLight: number;
   readonly SquadOrientationInterpolator: number;
   readonly StaticGroup: number;
   readonly StreamAudioDestination: number;
   readonly StreamAudioSource: number;
   readonly StringSensor: number;
   readonly SurfaceEmitter: number;
   readonly Switch: number;
   readonly Tangent: number;
   readonly TexCoordChaser2D: number;
   readonly TexCoordDamper2D: number;
   readonly Text: number;
   readonly TextureBackground: number;
   readonly TextureCoordinate: number;
   readonly TextureCoordinate3D: number;
   readonly TextureCoordinate4D: number;
   readonly TextureCoordinateGenerator: number;
   readonly TextureProjector: number;
   readonly TextureProjectorParallel: number;
   readonly TextureProperties: number;
   readonly TextureTransform: number;
   readonly TextureTransform3D: number;
   readonly TextureTransformMatrix3D: number;
   readonly TimeSensor: number;
   readonly TimeTrigger: number;
   readonly ToneMappedVolumeStyle: number;
   readonly TouchSensor: number;
   readonly Transform: number;
   readonly TransformSensor: number;
   readonly TransmitterPdu: number;
   readonly TriangleFanSet: number;
   readonly TriangleSet: number;
   readonly TriangleSet2D: number;
   readonly TriangleStripSet: number;
   readonly TwoSidedMaterial: number;
   readonly UniversalJoint: number;
   readonly UnlitMaterial: number;
   readonly Viewpoint: number;
   readonly ViewpointGroup: number;
   readonly Viewport: number;
   readonly VisibilitySensor: number;
   readonly VolumeData: number;
   readonly VolumeEmitter: number;
   readonly VolumePickSensor: number;
   readonly WaveShaper: number;
   readonly WindPhysicsModel: number;
   readonly WorldInfo: number;

   // CONCRETE NODE TYPES CONSTANTS END

   // ABSTRACT NODE TYPES CONSTANTS START
   // DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED.

   // Abstract Node Types

   readonly X3DAppearanceChildNode: number;
   readonly X3DAppearanceNode: number;
   readonly X3DBackgroundNode: number;
   readonly X3DBindableNode: number;
   readonly X3DBoundedObject: number;
   readonly X3DChaserNode: number;
   readonly X3DChildNode: number;
   readonly X3DColorNode: number;
   readonly X3DComposableVolumeRenderStyleNode: number;
   readonly X3DComposedGeometryNode: number;
   readonly X3DCoordinateNode: number;
   readonly X3DDamperNode: number;
   readonly X3DDragSensorNode: number;
   readonly X3DEnvironmentalSensorNode: number;
   readonly X3DEnvironmentTextureNode: number;
   readonly X3DFogObject: number;
   readonly X3DFollowerNode: number;
   readonly X3DFontStyleNode: number;
   readonly X3DGeometricPropertyNode: number;
   readonly X3DGeometryNode: number;
   readonly X3DGroupingNode: number;
   readonly X3DInfoNode: number;
   readonly X3DInterpolatorNode: number;
   readonly X3DKeyDeviceSensorNode: number;
   readonly X3DLayerNode: number;
   readonly X3DLayoutNode: number;
   readonly X3DLightNode: number;
   readonly X3DMaterialNode: number;
   readonly X3DMetadataObject: number;
   readonly X3DNBodyCollidableNode: number;
   readonly X3DNBodyCollisionSpaceNode: number;
   readonly X3DNetworkSensorNode: number;
   readonly X3DNode: number;
   readonly X3DNormalNode: number;
   readonly X3DNurbsControlCurveNode: number;
   readonly X3DNurbsSurfaceGeometryNode: number;
   readonly X3DOneSidedMaterialNode: number;
   readonly X3DParametricGeometryNode: number;
   readonly X3DParticleEmitterNode: number;
   readonly X3DParticlePhysicsModelNode: number;
   readonly X3DPickableObject: number;
   readonly X3DPickSensorNode: number;
   readonly X3DPointingDeviceSensorNode: number;
   readonly X3DProductStructureChildNode: number;
   readonly X3DProgrammableShaderObject: number;
   readonly X3DPrototypeInstance: number;
   readonly X3DRigidJointNode: number;
   readonly X3DScriptNode: number;
   readonly X3DSensorNode: number;
   readonly X3DSequencerNode: number;
   readonly X3DShaderNode: number;
   readonly X3DShapeNode: number;
   readonly X3DSingleTextureCoordinateNode: number;
   readonly X3DSingleTextureNode: number;
   readonly X3DSingleTextureTransformNode: number;
   readonly X3DSoundChannelNode: number;
   readonly X3DSoundDestinationNode: number;
   readonly X3DSoundNode: number;
   readonly X3DSoundProcessingNode: number;
   readonly X3DSoundSourceNode: number;
   readonly X3DStatement: number;
   readonly X3DTexture2DNode: number;
   readonly X3DTexture3DNode: number;
   readonly X3DTextureCoordinateNode: number;
   readonly X3DTextureNode: number;
   readonly X3DTextureProjectorNode: number;
   readonly X3DTextureTransformNode: number;
   readonly X3DTimeDependentNode: number;
   readonly X3DTouchSensorNode: number;
   readonly X3DTriggerNode: number;
   readonly X3DUrlObject: number;
   readonly X3DVertexAttributeNode: number;
   readonly X3DViewpointNode: number;
   readonly X3DViewportNode: number;
   readonly X3DVolumeDataNode: number;
   readonly X3DVolumeRenderStyleNode: number;

   // ABSTRACT NODE TYPES CONSTANTS END
}

/**
 * FieldDefinitionArray is an object that represents an array of X3DFieldDefinition objects. This is a read-only object. Individual elements of the array can be referenced using the standard C-style dereferencing operator (e.g. *fieldDefinitionArrayName*[*index*], where *index* is an integer-valued expression with 0<=*index*<length and length is the number of elements in the array).
 */
declare class FieldDefinitionArray extends X3DInfoArray <X3DFieldDefinition> { }

/**
 * The X3DFieldDefinition object represents all of the descriptive properties of a single field of a node.
 */
declare class X3DFieldDefinition
{
   /**
    * Value from the X3DConstants object describing the accessType (e.g., "X3DConstants.inputOnly"). This property is read only.
    */
   readonly accessType: number;
   /**
    * Value from X3DConstants object describing the field's data type (e.g., "X3DConstants.SFBool"). This property is read only.
    */
   readonly dataType: number;
   /**
    * A string of the field name (e.g., "children"). This property is read only.
    */
   readonly name: string;
   /**
    * A X3DField object holding the default value.
    */
   readonly value: X3DField;
}

/**
 * The X3DField object is the base object of all SF* field and X3DArrayField.
 */
declare class X3DField
{
   /**
    * Returns a copy of this X3DField.
    */
   copy (): this;
   /**
    * Returns true if the passed SF* or MF* *field* of the same type is equals to this object, otherwise false.
    */
   equals (other: this): boolean;
   assign (other: this): void;
   isDefaultValue (): boolean;
   setValue (value: unknown): void;
   getValue (): unknown;
   getType (): number; // one of the Field Type Constants from X3DConstants
   getAccessType (): number; // one of the Access Type Constants
   isInitializable (): boolean;
   isInput (): boolean;
   isOutput (): boolean;
   isReadable (): boolean;
   isWritable (): boolean;
   getUnit (): string;
   hasReferences (): boolean;
   isReference (accessType: number): boolean;
   addReferencesCallback (key: any, callback: () => void): void;
   removeReferencesCallback (key: any): void;
   getReferencesCallbacks (): Map <any, () => void>;
   addFieldInterest (other: this): void;
   removeFieldInterest (other: this): void;
   getFieldInterests (): Set <this>
   addFieldCallback (key: any, callback: (value: unknown) => void): void;
   removeFieldCallback (key: any): void;
   getFieldCallbacks (): Map <any, (value: this) => void>;
   addInputRoute (route: X3DRoute): void;
   removeInputRoute (route: X3DRoute): void;
   getInputRoutes (): Set <X3DRoute>;
   addOutputRoute (route: X3DRoute): void;
   removeOutputRoute (route: X3DRoute): void;
   getOutputRoutes (): Set <X3DRoute>;
   addRouteCallback (key: any, callback: () => void): void;
   removeRouteCallback (key: any): void;
   getRouteCallbacks (): Map <any, () => void>;
   /**
    * Disposes this object.
    */
   dispose (): void;
}

/**
 * The SFBool object corresponds to an X3D SFBool field.
 */
declare class SFBool extends X3DField
{
   static readonly typeName: "SFBool";

   constructor ();
   constructor (value: boolean);

   valueOf (): boolean;
}

/**
 * The SFColor object corresponds to an X3D SFColor field. All properties are accessed using the syntax *sfColorObjectName.\<property\>*, where *sfColorObjectName* is an instance of a SFColor object. All methods are invoked using the syntax *sfColorObjectName.method (\<argument-list\>)*, where *sfColorObjectName* is an instance of a SFColor object.
 */
declare class SFColor extends X3DField
{
   static readonly typeName: "SFColor";

   /**
    * A new color initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * *r, g,* and *b* are scalar values with the red, green, and blue values of the color in the range 0–1.
    */
   constructor (r: number, g: number, b: number);

   /**
    * Red component of the color.
    */
   r: number;
   /**
    * Green component of the color.
    */
   g: number;
   /**
    * Blue component of the color.
    */
   b: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Return an array with the components of the color's HSV value.
    */
   getHSV (): number [];
   /**
    * Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.
    *
    * The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.
    */
   setHSV (h: number, s: number, v: number): void;
   /**
    * Linearly interpolates in HSV space between source color and destination color by an amount of t.
    */
   lerp (destination: SFColor, t: number): SFColor;
}

/**
 * The SFColorRGBA object corresponds to an X3D SFColorRGBA field. All properties are accessed using the syntax *sfColorRGBAObjectName.\<property\>*, where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object. All methods are invoked using the syntax *sfColorRGBAObjectName.method (\<argument-list\>)*, where *sfColorRGBAObjectName* is an instance of a SFColorRGBA object.
 */
declare class SFColorRGBA extends X3DField
{
   static readonly typeName: "SFColorRGBA";

   /**
    * A new color initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * *r, g, b* and *a* are scalar values with the red, green and blue values of the color in the range 0–1.
    */
   constructor (r: number, g: number, b: number, a: number);

   /**
    * Red component of the color.
    */
   r: number;
   /**
    * Green component of the color.
    */
   g: number;
   /**
    * Blue component of the color.
    */
   b: number;
   /**
    * Alpha component of the color.
    */
   a: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Return an array with the components of the color's HSVA value.
    */
   getHSVA (): number [];
   /**
    * Sets a HSV color value; *h* is the hue, *s* is the saturation, *v* is the value and a is the alpha component of the HSV color.
    *
    * The saturation, and value component must be in the range 0–1, and the hue component must be in the range 0–2π.
    */
   setHSVA (h: number, s: number, v: number): void;
   /**
    * Linearly interpolates in HSVA space between source color and destination color by an amount of t.
    */
   lerp (destination: SFColor, t: number): SFColorRGBA;
}

/**
 * The SFDouble object corresponds to an X3D SFDouble field.
 */
declare class SFDouble extends X3DField
{
   static readonly typeName: "SFDouble";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

/**
 * The SFFloat object corresponds to an X3D SFFloat field.
 */
declare class SFFloat extends X3DField
{
   static readonly typeName: "SFFloat";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

/**
 * The SFImage object corresponds to an X3D SFImage field.
 */
declare class SFImage extends X3DField
{
   static readonly typeName: "SFImage";

   /**
    * A new image initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * @param width is the width in pixels of the image.
    * @param height is the height in pixels of the image.
    * @param components are the number of components of the image (0-4).
    * @param array is a MFInt32 array with pixel data.
    */
   constructor (width: number, height: number, components: number, array?: MFInt32);

   /**
    * Width of the image in pixels.
    */
   x: number;
   /**
    * Height of the image in pixels.
    */
   y: number;
   /**
    * Width of the image in pixels.
    */
   width: number;
   /**
    * Height of the image in pixels.
    */
   height: number;
   /**
    * Number of components.
    */
   comp: number;
   /**
    * A MFInt32 array corresponding to the pixels of the image.
    */
   array: MFInt32;

   [Symbol .iterator](): IterableIterator <unknown>;
}

/**
 * The SFInt32 object corresponds to an X3D SFInt32 field.
 */
declare class SFInt32 extends X3DField
{
   static readonly typeName: "SFInt32";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

/**
 * The SFMatrix3d/f object provides many useful methods for performing manipulations on 3×3 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix3d/fObjectName[0], ..., sflMatrixObjectName[8]*).
 */
declare class SFMatrix3 extends X3DField
{
   /**
    * A new matrix initialized with the identity matrix is created and returned.
    */
   constructor ();
   /**
    * A new matrix initialized with the vectors in *r1* through *r3* of type SFVec3d/f is created and returned.
    */
   constructor (r1: SFVec3, r2: SFVec3, r3: SFVec3);
   /**
    * A new matrix initialized with the values in *f11* through *f44* is created and returned.
    */
   constructor (f11: number, f12: number, f13: number,
                f21: number, f22: number, f23: number,
                f31: number, f32: number, f33: number);

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Sets the SFMatrix3d/f to the passed values. *translation* is an SFVec2d/f object, *rotation* is a Number, *scaleFactor* is a SFVec2d/f object, *scaleOrientation* is a Number and *center* is a SFVec2d/f object.
    *
    * Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.
    */
   setTransform (translation: SFVec2, rotation: number, scaleFactor: SFVec2, scaleOrientation: number, center: SFVec2): void;
   /**
    * Decomposes the SFMatrix3d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects*. rotation* is a SFVec3d/f, where x and y are the complex value of the rotation and z is the rotation angle in radians. The other types of the parameters are the same as in **setTransform**.
    *
    * Any of the rightmost parameters can be omitted, or any parameter can be `null`. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.
    *
    * A center of any value can be specified around which the rotation and scaling will take place.
    */
   getTransform (translation: SFVec2, rotation: SFVec3, scaleFactor: SFVec2, scaleOrientation: SFVec3, center: SFVec2): void;
   /**
    * Returns the determinant of this object's matrix.
    */
   determinant (): number;
   /**
    * Returns a SFMatrix whose value is the inverse of this object.
    */
   inverse (): this;
   /**
    * Returns a SFMatrix3d/f whose value is the transpose of this object.
    */
   transpose (): this;
   /**
    * Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the left.
    */
   multLeft (matrix: this): this;
   /**
    * Returns a SFMatrix3d/f whose value is the object multiplied by the passed *matrix* on the right.
    */
   multRight (matrix: this): this;
   /**
    * Returns a SFVec2d/f whose value is the object multiplied by the passed row vector.
    */
   multVecMatrix <T extends SFVec2d | SFVec2f> (row: T): T;
   /**
    * Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.
    */
   multVecMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   /**
    * Returns a SFVec2d/f whose value is the object multiplied by the passed column vector.
    */
   multMatrixVec <T extends SFVec2d | SFVec2f> (col: T): T;
   /**
    * Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.
    */
   multMatrixVec <T extends SFVec3d | SFVec3f> (col: T): T;
   /**
    * Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed row vector.
    */
   multDirMatrix <T extends SFVec2d | SFVec2f> (row: T): T;
   /**
    * Returns a SFVec2d/f whose value is the object's 2×2 submatrix multiplied by the passed column vector.
    */
   multMatrixDir <T extends SFVec2d | SFVec2f> (col: T): T;
}

/**
 * The SFMatrix3d/f object provides many useful methods for performing manipulations on 3×3 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix3d/fObjectName[0], ..., sflMatrixObjectName[8]*).
 */
declare class SFMatrix3d extends SFMatrix3
{
   static readonly typeName: "SFMatrix3d";
}

/**
 * The SFMatrix3d/f object provides many useful methods for performing manipulations on 3×3 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix3d/fObjectName[0], ..., sflMatrixObjectName[8]*).
 */
declare class SFMatrix3f extends SFMatrix3
{
   static readonly typeName: "SFMatrix3f";
}

/**
 * The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix4d/fObjectName[0], ..., sflMatrixObjectName[15]*).
 */
declare class SFMatrix4 extends X3DField
{
   /**
    * A new matrix initialized with the identity matrix is created and returned.
    */
   constructor ();
   /**
    * A new matrix initialized with the vectors in *r1* through *r4* of type SFVec4d/f is created and returned.
    */
   constructor (r1: SFVec4, r2: SFVec4, r3: SFVec4, r4: SFVec4);
   /**
    * A new matrix initialized with the values in *f11* through *f44* is created and returned.
    */
   constructor (f11: number, f12: number, f13: number, f14: number,
                f21: number, f22: number, f23: number, f24: number,
                f31: number, f32: number, f33: number, f34: number,
                f41: number, f42: number, f43: number, f44: number);

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Sets the SFMatrix4d/f to the passed values. *translation* is an SFVec3d/f object, *rotation* is a SFRotation object, *scaleFactor* is a SFVec3d/f object, *scaleOrientation* is a SFRotation object and *center* is a SFVec3d/f object.
    *
    * Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.
    */
   setTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   /**
    * Decomposes the SFMatrix4d/f and returns the components in the passed *translation*, *rotation*, and *scaleFactor* objects. The types of the parameters are the same as in **setTransform**.
    *
    * Any of the rightmost parameters can be omitted. In other words, the method can take from 0 to 5 parameters. For example, you can specify 0 parameters (resulting in a identity matrix), 1 parameter (a translation), 2 parameters (a translation and a rotation), 3 parameters (a translation, rotation and a scaleFactor), etc. Any unspecified parameter is set to its default as specified in the **Transform** node section of the X3D specification.
    *
    * A center of any value can be specified around which the rotation and scaling will take place.
    */
   getTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   /**
    * Returns the determinant of this object's matrix.
    */
   determinant (): number;
   /**
    * Returns a SFMatrix whose value is the inverse of this object.
    */
   inverse (): this;
   /**
    * Returns a SFMatrix4d/f whose value is the transpose of this object.
    */
   transpose (): this;
   /**
    * Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the left.
    */
   multLeft (matrix: this): this;
   /**
    * Returns a SFMatrix4d/f whose value is the object multiplied by the passed *matrix* on the right.
    */
   multRight (matrix: this): this;
   /**
    * Returns a SFVec3d/f whose value is the object multiplied by the passed row vector.
    */
   multVecMatrix <T extends SFVec4d | SFVec4f> (row: T): T;
   /**
    * Returns a SFVec4d/f whose value is the object multiplied by the passed row vector.
    */
   multVecMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   /**
    * Returns a SFVec3d/f whose value is the object multiplied by the passed column vector.
    */
   multMatrixVec <T extends SFVec4d | SFVec4f> (col: T): T;
   /**
    * Returns a SFVec4d/f whose value is the object multiplied by the passed column vector.
    */
   multMatrixVec <T extends SFVec3d | SFVec3f> (col: T): T;
   /**
    * Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed row vector.
    */
   multDirMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   /**
    * Returns a SFVec3d/f whose value is the object's 3×3 submatrix multiplied by the passed column vector.
    */
   multMatrixDir <T extends SFVec3d | SFVec3f> (col: T): T;
}

/**
 * The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix4d/fObjectName[0], ..., sflMatrixObjectName[15]*).
 */
declare class SFMatrix4d extends SFMatrix4
{
   static readonly typeName: "SFMatrix4d";
}

/**
 * The SFMatrix4d/f object provides many useful methods for performing manipulations on 4×4 matrices. Each of element of the matrix can be accessed using C-style array dereferencing (i.e., *sflMatrix4d/fObjectName[0], ..., sflMatrixObjectName[15]*).
 */
declare class SFMatrix4f extends SFMatrix4
{
   static readonly typeName: "SFMatrix4f";
}

/**
 * The SFNode object corresponds to an X3D SFNode field.
 */
declare class SFNode extends X3DField
{
   static readonly typeName: "SFNode";

   /**
    * Adds a field callback function, if external browser interface is used. *Key* is a custom key of any type associated with the *callback*. The callback is called when the field has been changed.
    *
    * The callback has a signature of `function (value)`, where value is the current value of the field.
    */
   addFieldCallback (key: any, callback: (value: this) => void): void;
   /**
    * @deprecated Use `node .getField (name) .addFieldCallback (key, callback)`.
    */
   addFieldCallback (name: string, key: any, callback: (value: unknown) => void): void;
   /**
    * Returns the corresponding X3DFieldDefinition object associated with *name*.
    */
   getFieldDefinition (name: string): X3DFieldDefinition;
   /**
    * Returns a list of fields defined for the SFNode object.
    */
   getFieldDefinitions (): FieldDefinitionArray;
   /**
    * Returns the corresponding X3DField object associated with *name*.
    */
   getField (name: string): X3DField;
   /**
    * Returns the node name.
    */
   getNodeName (): string;
   /**
    * Returns the node display name.
    */
   getNodeDisplayName (): string;
   /**
    * Returns, in the array, a list of constant values that indicate node types as provided in the X3DConstants object.
    */
   getNodeType (): number [];
   /**
    * Returns the node type name.
    */
   getNodeTypeName (): string;
   /**
    * Returns a user-data associated with *key*.
    */
   getNodeUserData (key: any): any;
   /**
    * Removes a field callback function associated with *key*.
    */
   removeFieldCallback (key: any): void;
   /**
    * @deprecated Use `node .getField (name) .removeFieldCallback (key)`.
    */
   removeFieldCallback (name: string, key: any): void;
   /**
    * Removes a user-data associated with *key*.
    */
   removeNodeUserData (key: any): void;
   /**
    * Sets a user-data associated with *key*.
    */
   setNodeUserData (key: any, value: any): void;
   /**
    * Returns the X3D VRML-encoded string that, if parsed as the value of an SFNode field, produce this node.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toVRMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D XML-encoded string that, if parsed as the value of an SFNode field, produce this node.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toXMLString (options?: ToStringOptions): string;
   /**
    * Returns the X3D JSON-encoded string that, if parsed as the value of an SFNode field, produce this node.
    *
    * For options see `X3DScene.toVRMLString`.
    */
   toJSONString (options?: ToStringOptions): string;
}

type ToStringOptions = {
   style?: "TIDY" | "COMPACT" | "SMALL" | "CLEAN",
   indent?: string,
   precision?: number,
   doublePrecision?: number,
   html?: boolean,
   closingTags?: boolean,
}

/**
 * The SFRotation object corresponds to an X3D SFRotation field.
 */
declare class SFRotation extends X3DField
{
   static readonly typeName: "SFRotation";

   /**
    * A new rotation initialized with the identity rotation is created and returned.
    */
   constructor ();
   /**
    * *x*, *y*, and *z* are the axis of the rotation.
    * *angle* is the angle of the rotation (in radians). All values are scalar.
    */
   constructor (x: number, y: number, z: number, angle: number);
   /**
    * *axis* is a SFVec3d/f object whose value is the axis of rotation.
    * *angle* is the scalar angle of the rotation (in radians).
    */
   constructor (axis: SFVec3, angle: number);
   /**
    * *fromVector* and *toVector* are SFVec3d/f valued objects. These vectors are normalized and the rotation value that would rotate from the *fromVector* to the *toVector* is stored in the object.
    */
   constructor (fromVector: SFVec3, toVector: SFVec3);
   /**
    * *matrix* is an SFMatrix3d/f rotation matrix object whose value is converted into an SFRotation object.
    */
   constructor (matrix: SFMatrix3);

   /**
    * Returns the first value of the axis vector.
    */
   x: number;
   /**
    * Returns the second value of the axis vector.
    */
   y: number;
   /**
    * Returns the third value of the axis vector
    */
   z: number;
   /**
    * A number corresponding to the angle of the rotation (in radians).
    */
   angle: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Returns the axis of rotation as an SFVec3f object.
    */
   getAxis (): SFVec3f;
   /**
    * Returns the rotation matrix as an SFMatrix3f object.
    */
   getMatrix (): SFMatrix3f;
   /**
    * Returns a SFRotation object whose value is the inverse of this object's rotation.
    */
   inverse (): SFRotation;
   /**
    * Returns an SFRotation whose value is the object multiplied by the passed SFRotation.
    */
   multiply (rotation: SFRotation): SFRotation;
   /**
    * Returns a SFVec3f whose value is the SFVec3d/f *vec* multiplied by the matrix corresponding to this object's rotation.
    */
   multVec <T extends SFVec3d | SFVec3f> (vector: T): T;
   /**
    * Set the axis of rotation to the vector passed in *vec*.
    */
   setAxis (axis: SFVec3): void;
   /**
    * Set the value of this rotation to the rotation matrix passed in *matrix*.
    */
   setMatrix (matrix: SFMatrix3d | SFMatrix3f): void;
   /**
    * Returns a SFRotation whose value is the spherical linear interpolation between this object's rotation and *destRotation* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's rotation. For *t* = 1, the value is *destRotation*.
    */
   slerp (destination: SFRotation, t: number): SFRotation;
   /**
    * Straightens the rotation so that the x-axis of the resulting rotation is parallel to the plane spawned by upVector. The default  value for *upVector* is the y-axis.
    */
   straighten (upVector?: SFVec3d | SFVec3f): SFRotation;
}

/**
 * The SFString object corresponds to an X3D SFString field.
 */
declare class SFString extends X3DField
{
   static readonly typeName: "SFString";

   constructor ();
   constructor (value: string);

   length: number;

   valueOf (): string;
}

/**
 * The SFTime object corresponds to an X3D SFTime field.
 */
declare class SFTime extends X3DField
{
   static readonly typeName: "SFTime";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

/**
 * The SFVec2d/f object corresponds to an X3D SFVec2d/f field. Each component of the vector can be accessed using the x and y properties or using C-style array dereferencing (i.e. *sfVec2d/fObjectName[0]* or *sfVec2d/fObjectName[1]).*
 */
declare class SFVec2 extends X3DField
{
   /**
    * A new vector initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * Constructs a SFVec2d/f from *x* and *y*, where *x* and *y* are scalar expressions.
    */
   constructor (x: number, y: number);

   /**
    * Returns the first value of the vector.
    */
   x: number;
   /**
    * Returns the second value of the vector.
    */
   y: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Returns an SFVec2d/f whose value is the componentwise absolute value of the object.
    */
   abs (): this;
   /**
    * Returns an SFVec2d/f whose value is the passed SFVec2d/f added, componentwise, to the object.
    */
   add (other: this): this;
   /**
    * Returns the distance of this vector to SFVec2d/f *other*.
    */
   distance (other: this): number;
   /**
    * Returns an SFVec2d/f whose value is the object divided by the passed numeric value.
    */
   divide (denominator: number): this;
   /**
    * Returns an SFVec2d/f whose value is the object divided, componentwise, by the passed SFVec2d/f *other*.
    */
   divVec (other: this): this;
   /**
    * Returns the dot product of this vector and SFVec2d/f *other*.
    */
   dot (other: this): number;
   /**
    * Returns an SFVec2d/f whose value is the componentwise inverse of the object.
    */
   inverse (): this;
   /**
    * Returns the geometric length of this vector.
    */
   length (): number;
   /**
    * Returns a SFVec2d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.
    */
   lerp (destination: this, t: number): this;
   /**
    * Returns an SFVec2d/f whose value is the componentwise minimum of the passed SFVec2d/f and the object.
    */
   min (other: this): this;
   /**
    * Returns an SFVec2d/f whose value is the componentwise maximum of the passed SFVec2d/f and the object.
    */
   max (other: this): this;
   /**
    * Returns an SFVec2d/f whose value is the object multiplied by the passed numeric value.
    */
   multiply (factor: number): this;
   /**
    * Returns an SFVec2d/f whose value is the passed SFVec2d/f multiplied, componentwise, with the object.
    */
   multVec (other: this): this;
   /**
    * Returns an SFVec2d/f whose value is the componentwise negation of the object.
    */
   negate (): this;
   /**
    * Returns an SFVec2d/f of object converted to unit length.
    */
   normalize (): this;
   /**
    * Returns an SFVec2d/f whose value is the passed SFVec2d/f subtracted, componentwise, from the object.
    */
   subtract (other: this): this;
}

/**
 * The SFVec2d/f object corresponds to an X3D SFVec2d/f field. Each component of the vector can be accessed using the x and y properties or using C-style array dereferencing (i.e. *sfVec2d/fObjectName[0]* or *sfVec2d/fObjectName[1]).*
 */
declare class SFVec2d extends SFVec2
{
   static readonly typeName: "SFVec2d";
}

/**
 * The SFVec2d/f object corresponds to an X3D SFVec2d/f field. Each component of the vector can be accessed using the x and y properties or using C-style array dereferencing (i.e. *sfVec2d/fObjectName[0]* or *sfVec2d/fObjectName[1]).*
 */
declare class SFVec2f extends SFVec2
{
   static readonly typeName: "SFVec2f";
}

/**
 * The SFVec3d/f object corresponds to an X3D SFVec3d/f field. Each component of the vector can be accessed using the x, y, and z properties or using C-style array dereferencing (i.e. *sfVec3d/fObjectName[0], sfVec3d/fObjectName[1]* or *sfVec3d/fObjectName[2]).*
 */
declare class SFVec3 extends X3DField
{
   /**
    * A new vector initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * Constructs a SFVec3d/f from *x*, *y* and *z*, where *x*, *y* and *z* are scalar expressions.
    */
   constructor (x: number, y: number, z: number);

   /**
    * Returns the first value of the vector.
    */
   x: number;
   /**
    * Returns the second value of the vector.
    */
   y: number;
   /**
    * Returns the third value of the vector.
    */
   z: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Returns an SFVec3d/f whose value is the componentwise absolute value of the object.
    */
   abs (): this;
   /**
    * Returns an SFVec3d/f whose value is the passed SFVec3d/f added, componentwise, to the object.
    */
   add (other: this): this;
   /**
    * Returns the cross product of the object and the passed SFVec3d/f *other*.
    */
   cross (other: this): this;
   /**
    * Returns the distance of this vector to SFVec3d/f *other*.
    */
   distance (other: this): number;
   /**
    * Returns an SFVec3d/f whose value is the object divided by the passed numeric value.
    */
   divide (denominator: number): this;
   /**
    * Returns an SFVec3d/f whose value is the object divided, componentwise, by the passed SFVec3d/f *other*.
    */
   divVec (other: this): this;
   /**
    * Returns the dot product of this vector and SFVec3d/f *other*.
    */
   dot (other: this): number;
   /**
    * Returns an SFVec3d/f whose value is the componentwise inverse of the object.
    */
   inverse (): this;
   /**
    * Returns the geometric length of this vector.
    */
   length (): number;
   /**
    * Returns a SFVec3d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.
    */
   lerp (destination: this, t: number): this;
   /**
    * Returns an SFVec3d/f whose value is the componentwise minimum of the passed SFVec3d/f and the object.
    */
   min (other: this): this;
   /**
    * Returns an SFVec3d/f whose value is the componentwise maximum of the passed SFVec3d/f and the object.
    */
   max (other: this): this;
   /**
    * Returns an SFVec3d/f whose value is the object multiplied by the passed numeric value.
    */
   multiply (factor: number): this;
   /**
    * Returns an SFVec3d/f whose value is the passed SFVec3d/f multiplied, componentwise, with the object.
    */
   multVec (other: this): this;
   /**
    * Returns an SFVec3d/f whose value is the componentwise negation of the object.
    */
   negate (): this;
   /**
    * Returns an SFVec3d/f of object converted to unit length.
    */
   normalize (): this;
   /**
    * Returns an SFVec3d/f whose value is the passed SFVec3d/f subtracted, componentwise, from the object.
    */
   subtract (other: this): this;
}

/**
 * The SFVec3d/f object corresponds to an X3D SFVec3d/f field. Each component of the vector can be accessed using the x, y, and z properties or using C-style array dereferencing (i.e. *sfVec3d/fObjectName[0], sfVec3d/fObjectName[1]* or *sfVec3d/fObjectName[2]).*
 */
declare class SFVec3d extends SFVec3
{
   static readonly typeName: "SFVec3d";
}

/**
 * The SFVec3d/f object corresponds to an X3D SFVec3d/f field. Each component of the vector can be accessed using the x, y, and z properties or using C-style array dereferencing (i.e. *sfVec3d/fObjectName[0], sfVec3d/fObjectName[1]* or *sfVec3d/fObjectName[2]).*
 */
declare class SFVec3f extends SFVec3
{
   static readonly typeName: "SFVec3f";
}

/**
 * The SFVec4d/f object corresponds to an X3D SFVec4d/f field. Each component of the vector can be accessed using the x, y, z and w properties or using C-style array dereferencing (i.e. *sfVec4d/fObjectName[0], sfVec4d/fObjectName[1], sfVec4d/fObjectName[2]* or *sfVec4d/fObjectName[3]).*
 */
declare class SFVec4 extends X3DField
{
   /**
    * A new vector initialized with zero values is created and returned.
    */
   constructor ();
   /**
    * Constructs a SFVec4d/f from *x*, *y*, *z* and *w*, where *x*, *y*, *z* and *w* are scalar expressions.
    */
   constructor (x: number, y: number, z: number, w: number);

   /**
    * Returns the first value of the vector.
    */
   x: number;
   /**
    * Returns the second value of the vector.
    */
   y: number;
   /**
    * Returns the third value of the vector.
    */
   z: number;
   /**
    * Returns the fourth value of the vector.
    */
   w: number;

   [Symbol .iterator](): IterableIterator <number>;
   [index: number]: number;

   /**
    * Returns an SFVec4d/f whose value is the componentwise absolute value of the object.
    */
   abs (): this;
   /**
    * Returns an SFVec4d/f whose value is the passed SFVec4d/f added, componentwise, to the object.
    */
   add (other: this): this;
   /**
    * Returns the distance of this vector to SFVec4d/f *other*.
    */
   distance (other: this): number;
   /**
    * Returns an SFVec4d/f whose value is the object divided by the passed numeric value.
    */
   divide (denominator: number): this;
   /**
    * Returns an SFVec4d/f whose value is the object divided, componentwise, by the passed SFVec4d/f *other*.
    */
   divVec (other: this): this;
   /**
    * Returns the dot product of this vector and SFVec4d/f *other*.
    */
   dot (other: this): number;
   /**
    * Returns an SFVec4d/f whose value is the componentwise inverse of the object.
    */
   inverse (): this;
   /**
    * Returns the geometric length of this vector.
    */
   length (): number;
   /**
    * Returns a SFVec4d/f whose value is the linear interpolation between this object's vector and *destVector* at value 0 <= *t* <= 1. For *t* = 0, the value is this object's vector. For *t* = 1, the value is *destVector*.
    */
   lerp (destination: this, t: number): this;
   /**
    * Returns an SFVec4d/f whose value is the componentwise minimum of the passed SFVec4d/f and the object.
    */
   min (other: this): this;
   /**
    * Returns an SFVec4d/f whose value is the componentwise maximum of the passed SFVec4d/f and the object.
    */
   max (other: this): this;
   /**
    * Returns an SFVec4d/f whose value is the object multiplied by the passed numeric value.
    */
   multiply (factor: number): this;
   /**
    * Returns an SFVec4d/f whose value is the passed SFVec4d/f multiplied, componentwise, with the object.
    */
   multVec (other: this): this;
   /**
    * Returns an SFVec4d/f whose value is the componentwise negation of the object.
    */
   negate (): this;
   /**
    * Returns an SFVec4d/f of object converted to unit length.
    */
   normalize (): this;
   /**
    * Returns an SFVec4d/f whose value is the passed SFVec4d/f subtracted, componentwise, from the object.
    */
   subtract (other: this): this;
}

/**
 * The SFVec4d/f object corresponds to an X3D SFVec4d/f field. Each component of the vector can be accessed using the x, y, z and w properties or using C-style array dereferencing (i.e. *sfVec4d/fObjectName[0], sfVec4d/fObjectName[1], sfVec4d/fObjectName[2]* or *sfVec4d/fObjectName[3]).*
 */
declare class SFVec4d extends SFVec4
{
   static readonly typeName: "SFVec4d";
}

/**
 * The SFVec4d/f object corresponds to an X3D SFVec4d/f field. Each component of the vector can be accessed using the x, y, z and w properties or using C-style array dereferencing (i.e. *sfVec4d/fObjectName[0], sfVec4d/fObjectName[1], sfVec4d/fObjectName[2]* or *sfVec4d/fObjectName[3]).*
 */
declare class SFVec4f extends SFVec4
{
   static readonly typeName: "SFVec4f";
}

declare class X3DArrayField <T> extends X3DField
{
   /**
    * The creation method can be passed 0 or more single value expressions to initialize the elements of the array.
    */
   constructor (... elements: T []);

   [Symbol .iterator](): IterableIterator <T>;
   [index: number]: T;
   /**
    * An integer containing the number of elements in the array. Assigning an integer to length changes the number of elements in the array.
    */
   length: number;

   at (index: number): T;
   entries (): IterableIterator <[number, T]>;
   every (predicate: ArrayTest <T>): boolean;
   fill (val: T, start?: number, end?: number): this;
   filter (predicate: ArrayTest <T>): this;
   find (test: ArrayTest <T>): T | undefined;
   findIndex (test: ArrayTest <T>): number;
   findLast (test: ArrayTest <T>): T | undefined;
   findLastIndex (test: ArrayTest <T>): number;
   forEach (action: ArrayAction <T>): void;
   includes (needle: T): boolean;
   indexOf (needle: T): number;
   join (separator?: string): string;
   keys (): number [];
   lastIndexOf (needle: T): number;
   map <U> (f: (element: T, i: number, array: this) => U): this;
   pop (): T;
   push (... elements: T []): number;
   reduce <U> (f: ArrayReducer <T, U>, initial?: U): U;
   reduceRight <U> (f: ArrayReducer <T, U>, initial?: U): U;
   reverse (): this;
   shift (): T;
   slice (start?: number, end?: number): this;
   some (predicate: ArrayTest <T>): boolean;
   sort (comparator?: (a: T, b: T) => number): this;
   splice (start: number, deleteCount: number, ... items: T []) : this;
   toReversed (): this;
   toSorted (comparator?: (a: T, b: T) => number): this;
   toSpliced (start: number, deleteCount: number, ... items: T []) : this;
   unshift (... elements: T []): number;
   values (): IterableIterator <T>;
   with (index: number, value: T): this;
}

type ArrayTest <T> = (element: T, i: number, array: X3DArrayField <T>) => boolean
type ArrayAction <T> = (element: T, i: number, array: X3DArrayField <T>) => void
type ArrayReducer <T, U> = (accum: U, current: T, i: number, array: X3DArrayField <T>) => U

declare class MFBool extends X3DArrayField <boolean>
{
   static readonly typeName: "MFBool";
}

declare class MFColor extends X3DArrayField <SFColor>
{
   static readonly typeName: "MFColor";
}

declare class MFColorRGBA extends X3DArrayField <SFColorRGBA>
{
   static readonly typeName: "MFColorRGBA";
}

declare class MFDouble extends X3DArrayField <number>
{
   static readonly typeName: "MFDouble";
}

declare class MFFloat extends X3DArrayField <number>
{
   static readonly typeName: "MFFloat";
}

declare class MFImage extends X3DArrayField <SFImage>
{
   static readonly typeName: "MFImage";
}

declare class MFInt32 extends X3DArrayField <number>
{
   static readonly typeName: "MFInt32";
}

declare class MFMatrix3d extends X3DArrayField <SFMatrix3d>
{
   static readonly typeName: "MFMatrix3d";
}

declare class MFMatrix3f extends X3DArrayField <SFMatrix3f>
{
   static readonly typeName: "MFMatrix3f";
}

declare class MFMatrix4d extends X3DArrayField <SFMatrix4d>
{
   static readonly typeName: "MFMatrix4d";
}

declare class MFMatrix4f extends X3DArrayField <SFMatrix4f>
{
   static readonly typeName: "MFMatrix4f";
}

declare class MFNode <T extends SFNode | null = SFNode | null> extends X3DArrayField <T>
{
   static readonly typeName: "MFNode";
}

declare class MFRotation extends X3DArrayField <SFRotation>
{
   static readonly typeName: "MFRotation";
}

declare class MFString <T extends string = string> extends X3DArrayField <T>
{
   static readonly typeName: "MFString";
}

declare class MFTime extends X3DArrayField <number>
{
   static readonly typeName: "MFTime";
}

declare class MFVec2d extends X3DArrayField <SFVec2d>
{
   static readonly typeName: "MFVec2d";
}

declare class MFVec2f extends X3DArrayField <SFVec2f>
{
   static readonly typeName: "MFVec2f";
}

declare class MFVec3d extends X3DArrayField <SFVec3d>
{
   static readonly typeName: "MFVec3d";
}

declare class MFVec3f extends X3DArrayField <SFVec3f>
{
   static readonly typeName: "MFVec3f";
}

declare class MFVec4d extends X3DArrayField <SFVec4d>
{
   static readonly typeName: "MFVec4d";
}

declare class MFVec4f extends X3DArrayField <SFVec4f>
{
   static readonly typeName: "MFVec4f";
}

// NODES START
// DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED.

/** AcousticProperties specifies the interaction of sound waves with characteristics of geometric objects in the scene. */
interface AcousticPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * specifies the sound absorption coefficient of a surface, meaning the ratio of sound intensity not reflected by a surface.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   absorption: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * diffuse coefficient of sound reflection indicates how much of the incident sound energy is reflected back in multiple directions.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   diffuse: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * sound refraction coefficient of a medium, which determines change in propagation direction of sound wave when obliquely crossing boundary between two mediums where its speed is different.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   refraction: number;
   /**
   * specular coefficient of sound reflection striking a plane surface, directly reflected back into space, where angle of reflection equals angle of incidence.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   specular: number;
}

/** Analyser provides real-time frequency and time-domain analysis information, without any change to the input. */
interface AnalyserProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * fftSize represents size of Fast Fourier Transform (FFT) used to determine frequency domain.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   fftSize: number;
   /**
   * frequencyBinCount is half of fftSize and generally equates to number of data values available for the visualization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   frequencyBinCount: number;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * maxDecibels represents maximum power value in scaling range for FFT analysis data.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxDecibels: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minDecibels represents minimum power value in scaling range for FFT analysis data.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minDecibels: number;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * smoothingTimeConstant represents averaging constant during last analysis frame.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   smoothingTimeConstant: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** Anchor is a Grouping node that can contain most nodes. */
interface AnchorProxy extends X3DGroupingNodeProxy, X3DUrlObjectProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * The [autoRefresh field has no effect, Anchor operation is only triggered by user selection.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * The [autoRefreshTimeLimit field has no effect, Anchor operation is only triggered by user selection.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * The load field has no effect, Anchor operation is only triggered by user selection.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If provided, parameter tells the X3D player where to to redirect the loaded url.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   parameter: MFString;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Address of replacement world, or #ViewpointDEFName within the current scene, or alternate Web resource, activated by the user selecting Shape geometry within the Anchor children nodes.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Appearance specifies the visual properties of geometry by containing the Material, ImageTexture/MovieTexture/PixelTexture, FillProperties, LineProperties, programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) and TextureTransform nodes. */
interface AppearanceProxy extends X3DAppearanceNodeProxy
{
   /**
   * Single contained acousticProperties node that can specify additional acoustic attributes applied to associated surface geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   acousticProperties: AcousticPropertiesProxy | null;
   /**
   * Threshold value used for pixel rendering either transparent or opaque, used when alphaMode="MASK".
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   alphaCutoff: number;
   /**
   * Provides options for control of alpha transparency handling for textures.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   alphaMode: "AUTO" | "OPAQUE" | "MASK" | "BLEND";
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   backMaterial: X3DMaterialNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   blendMode: BlendModeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   depthMode: DepthModeProxy | null;
   /**
   * Single contained FillProperties node that can specify additional visual attributes applied to polygonal areas of corresponding geometry, on top of whatever other appearance is already defined.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fillProperties: FillPropertiesProxy | null;
   /**
   * Single contained LineProperties node that can specify additional visual attributes applied to corresponding line geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   lineProperties: LinePropertiesProxy | null;
   /**
   * Single contained Material node that can specify visual attributes for lighting response (color types, transparency, etc.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   material: X3DMaterialNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained PointProperties node that can specify additional visual attributes applied to corresponding point geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pointProperties: PointPropertiesProxy | null;
   /**
   * Zero or more contained programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) that specify, in order of preference, author-programmed rendering characteristics.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   shaders: MFNode <X3DShaderNodeProxy>;
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texture: X3DTextureNodeProxy | null;
   /**
   * Single contained TextureTransform node that defines 2D transformation applied to texture coordinates.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   textureTransform: X3DTextureTransformNodeProxy | null;
}

/** Arc2D is a line-based geometry node that defines a linear circular arc with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface Arc2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   endAngle: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * circle radius, of which the arc is a portion.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   radius: number;
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   startAngle: number;
}

/** ArcClose2D is a polygonal geometry node that defines a linear circular arc, closed by PIE or CHORD line segments, with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface ArcClose2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Defines whether pair of line segments connect to center (PIE), or single line-segment chord connects arc endpoints (CHORD).
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   closureType: "PIE" | "CHORD";
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   endAngle: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * circle radius, of which the arc is a portion.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   radius: number;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   startAngle: number;
}

/** AudioClip provides audio data used by parent Sound nodes. */
interface AudioClipProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * or -1.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly duration_changed: number;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   loop: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * Multiplier for the rate at which sampled sound is played.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pitch: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * Location and filename of sound file or stream.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** AudioDestination node represents the final audio destination and is what user ultimately hears, typically from the speakers of user device. */
interface AudioDestinationProxy extends X3DSoundDestinationNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * [maxChannelCount.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   maxChannelCount: number;
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mediaDeviceID: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Background simulates ground and sky, using vertical arrays of wraparound color values. */
interface BackgroundProxy extends X3DBackgroundNodeProxy
{
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   backUrl: MFString;
   /**
   * event sent when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   bottomUrl: MFString;
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   frontUrl: MFString;
   /**
   * The angle array values increase from 0.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   groundAngle: MFFloat;
   /**
   * Color of the ground at the various angles on the ground partial sphere.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   groundColor: MFColor;
   /**
   * event true sent when node becomes active, event false sent when unbound by another node.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   leftUrl: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   rightUrl: MFString;
   /**
   * Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * The angle array values increase from 0.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   skyAngle: MFFloat;
   /**
   * Color of the sky at various angles on the sky sphere.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   skyColor: MFColor;
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   topUrl: MFString;
   /**
   * how "clear" the background is, allows underlying page to show through: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** BallJoint represents an unconstrained joint between two bodies that pivot about a common anchor point. */
interface BallJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   anchorPoint: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1AnchorPoint: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2AnchorPoint: SFVec3f;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Billboard is a Grouping node that can contain most nodes. */
interface BillboardProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * axisOfRotation direction is relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axisOfRotation: SFVec3f;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** BiquadFilter node is an AudioNode processor implementing common low-order filters. */
interface BiquadFilterProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * The detune field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   detune: number;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * frequency at which the BiquadFilterNode operates, in Hz.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   frequency: number;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * qualityFactor is Quality Factor (Q) of the respective filter algorithm.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   qualityFactor: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
   /**
   * type selects which BiquadFilter algorithm is used.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   type: "LOWPASS" | "HIGHPASS" | "BANDPASS" | "LOWSHELF" | "HIGHSHELF" | "PEAKING" | "NOTCH" | "ALLPASS";
}

/** BlendedVolumeStyle combines rendering of two voxel data sets into one by blending voxel values. */
interface BlendedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained X3DComposableVolumeRenderStyleNode node that defines specific rendering technique for data in the voxels field, and the result is blended with parent VolumeData or SegmentedVoliumeData node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   renderStyle: X3DComposableVolumeRenderStyleNodeProxy | null;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides second set of raw voxel information utilized by corresponding rendering styles.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   voxels: X3DTexture3DNodeProxy | null;
   /**
   * weightConstant1 is used when weightFunction1=CONSTANT.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   weightConstant1: number;
   /**
   * weightConstant2 is used when weightFunction2=CONSTANT.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   weightConstant2: number;
   /**
   * specifies 2D textures used to determine weight values when weight function is set to TABLE.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   weightFunction1: "CONSTANT" | "ALPHA1" | "ALPHA2" | "ONE_MINUS_ALPHA1" | "ONE_MINUS_ALPHA2" | "TABLE";
   /**
   * specifies 2D textures used to determine weight values when weight function is set to TABLE.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   weightFunction2: "CONSTANT" | "ALPHA1" | "ALPHA2" | "ONE_MINUS_ALPHA1" | "ONE_MINUS_ALPHA2" | "TABLE";
   /**
   * The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE".
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   weightTransferFunction1: X3DTexture2DNodeProxy | null;
   /**
   * The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE".
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   weightTransferFunction2: X3DTexture2DNodeProxy | null;
}

/** undefined */
interface BlendModeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   alphaEquation: "FUNC_ADD" | "FUNC_SUBTRACT" | "FUNC_REVERSE_SUBTRACT" | "MIN" | "MAX";
   /**
   * This field is of access type 'inputOutput' and type SFColor.
   */
   blendColor: SFColor;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   colorEquation: "FUNC_ADD" | "FUNC_SUBTRACT" | "FUNC_REVERSE_SUBTRACT" | "MIN" | "MAX";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   destinationAlphaFactor: "ZERO" | "ONE" | "SRC_COLOR" | "ONE_MINUS_SRC_COLOR" | "DST_COLOR" | "ONE_MINUS_DST_COLOR" | "SRC_ALPHA" | "ONE_MINUS_SRC_ALPHA" | "DST_ALPHA" | "ONE_MINUS_DST_ALPHA" | "SRC_ALPHA_SATURATE" | "CONSTANT_COLOR" | "ONE_MINUS_CONSTANT_COLOR" | "CONSTANT_ALPHA" | "ONE_MINUS_CONSTANT_ALPHA";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   destinationColorFactor: "ZERO" | "ONE" | "SRC_COLOR" | "ONE_MINUS_SRC_COLOR" | "DST_COLOR" | "ONE_MINUS_DST_COLOR" | "SRC_ALPHA" | "ONE_MINUS_SRC_ALPHA" | "DST_ALPHA" | "ONE_MINUS_DST_ALPHA" | "SRC_ALPHA_SATURATE" | "CONSTANT_COLOR" | "ONE_MINUS_CONSTANT_COLOR" | "CONSTANT_ALPHA" | "ONE_MINUS_CONSTANT_ALPHA";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   sourceAlphaFactor: "ZERO" | "ONE" | "SRC_COLOR" | "ONE_MINUS_SRC_COLOR" | "DST_COLOR" | "ONE_MINUS_DST_COLOR" | "SRC_ALPHA" | "ONE_MINUS_SRC_ALPHA" | "DST_ALPHA" | "ONE_MINUS_DST_ALPHA" | "SRC_ALPHA_SATURATE" | "CONSTANT_COLOR" | "ONE_MINUS_CONSTANT_COLOR" | "CONSTANT_ALPHA" | "ONE_MINUS_CONSTANT_ALPHA";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   sourceColorFactor: "ZERO" | "ONE" | "SRC_COLOR" | "ONE_MINUS_SRC_COLOR" | "DST_COLOR" | "ONE_MINUS_DST_COLOR" | "SRC_ALPHA" | "ONE_MINUS_SRC_ALPHA" | "DST_ALPHA" | "ONE_MINUS_DST_ALPHA" | "SRC_ALPHA_SATURATE" | "CONSTANT_COLOR" | "ONE_MINUS_CONSTANT_COLOR" | "CONSTANT_ALPHA" | "ONE_MINUS_CONSTANT_ALPHA";
}

/** BooleanFilter selectively passes true, false or negated events. */
interface BooleanFilterProxy extends X3DChildNodeProxy
{
   /**
   * inputFalse only passes a false value, which occurs when set_boolean is false.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly inputFalse: boolean;
   /**
   * inputNegate is an output event that provides an opposite value by negating set_boolean input.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly inputNegate: boolean;
   /**
   * inputTrue only passes a true value, which occurs when set_boolean input is true.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly inputTrue: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_boolean is the input value to be filtered.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_boolean: boolean;
}

/** BooleanSequencer generates periodic discrete Boolean values. */
interface BooleanSequencerProxy extends X3DSequencerNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear sequencing, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFBool.
   */
   keyValue: MFBool;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Send next output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   next: boolean;
   /**
   * Send previous output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   previous: boolean;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Single intermittent output value determined by current key time and corresponding keyValue entry.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly value_changed: boolean;
}

/** BooleanToggle maintains state and negates output when a true input is provided. */
interface BooleanToggleProxy extends X3DChildNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If input event set_boolean is true, flip state by negating current value of the toggle field Hint: for logical consistency, input event set_boolean false has no effect (under review as part of Mantis issue 519).
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_boolean: boolean;
   /**
   * Persistent state value that gets toggled or reset.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   toggle: boolean;
}

/** BooleanTrigger converts time events to boolean true events. */
interface BooleanTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_triggerTime provides input time event, typical event sent is TouchSensor touchTime.
   *
   * This field is of access type 'inputOnly' and type SFTime.
   */
   set_triggerTime: number;
   /**
   * triggerTrue outputs a true value whenever a triggerTime event is received.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly triggerTrue: boolean;
}

/** BoundaryEnhancementVolumeStyle provides boundary enhancement for the volume rendering style. */
interface BoundaryEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * boundaryOpacity k_gs is the factored amount of the gradient enhancement to use.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   boundaryOpacity: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * opacityFactor k_ge is the power function to control the slope of the opacity curve to highlight the set of data.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   opacityFactor: number;
   /**
   * retainedOpacity k_gc is the amount of initial opacity to mix into the output.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   retainedOpacity: number;
}

/** BoundedPhysicsModel provides user-defined geometrical boundaries for particle motion. */
interface BoundedPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Single contained geometry node provides the geometry used for each particle when the parent ParticleSystem node has geometryType=GEOMETRY.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry: X3DGeometryNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Box is a geometry node specifying a rectangular cuboid. */
interface BoxProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * size x y z in meters.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   size: SFVec3f;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
}

/** BufferAudioSource node represents a memory-resident audio asset that can contain one or more channels. */
interface BufferAudioSourceProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * buffer is a memory-resident audio asset that can contain one or more channels.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   buffer: MFFloat;
   /**
   * bufferDuration is duration in seconds to use from buffer field.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   bufferDuration: number;
   /**
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly bufferlength: number;
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * The detune field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   detune: number;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly length: number;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   loop: boolean;
   /**
   * loopEnd field is optional playhead position where looping ends if loop=true.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   loopEnd: number;
   /**
   * loopStart field is optional playhead position where looping begins if loop=true.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   loopStart: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * numberOfChannels is number of audio channels found in this buffer source.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   numberOfChannels: number;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * playbackRate field is speed at which to render the audio stream, and forms a compound field together with detune field Hint: negative values play in reverse.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   playbackRate: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * sampleRate field is sample-frames per second.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   sampleRate: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * Location and filename of sound file.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** CADAssembly holds a set of Computer-Aided Design (CAD) assemblies or parts grouped together. */
interface CADAssemblyProxy extends X3DGroupingNodeProxy, X3DProductStructureChildNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Optional name for this particular CAD node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CADFace holds geometry representing one face in a Computer-Aided Design (CAD) CADPart. */
interface CADFaceProxy extends X3DProductStructureChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Optional name for this particular CAD node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Contained Shape for this CADPart.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   shape: ShapeProxy | LODProxy | TransformProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CADLayer nodes define a hierarchy that shows layer structure for a Computer-Aided Design (CAD) model. */
interface CADLayerProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Optional name for this particular CAD node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CADPart is an atomic part that defines both coordinate-system location and the faces that constitute a part in a Computer-Aided Design (CAD) model. */
interface CADPartProxy extends X3DProductStructureChildNodeProxy, X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <CADFaceProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <CADFaceProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Optional name for this particular CAD node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <CADFaceProxy>;
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CartoonVolumeStyle generates cartoon-style non-photorealistic rendering of associated volumetric data. */
interface CartoonVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Number of distinct colors taken from interpolated colors and used to render the object.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   colorSteps: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * orthogonalColor is used for surface normals that are orthogonal (perpendicular) to viewer's current location.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   orthogonalColor: SFColorRGBA;
   /**
   * parallelColor is used for surface normals that are orthogonal to viewer's current location.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   parallelColor: SFColorRGBA;
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   surfaceNormals: X3DTexture3DNodeProxy | null;
}

/** ChannelMerger unites different input channels into a single output channel. */
interface ChannelMergerProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** ChannelSelector selects a single channel output from all input channels. */
interface ChannelSelectorProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * channelSelection is single channel of interest from those provided by input nodes.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   channelSelection: number;
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** ChannelSplitter separates the different channels of a single audio source into a set of monophonic output channels. */
interface ChannelSplitterProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node, making up a section of the audio graph.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The outputs field is a set of output nodes receiving the split channels, and making up a section of the audio graph.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   outputs: MFNode <X3DSoundChannelNodeProxy | X3DSoundProcessingNodeProxy | X3DSoundSourceNodeProxy>;
}

/** Circle2D is a geometry node that defines a linear X-Y circle with center (0,0) in X-Y plane. */
interface Circle2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * circle radius.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   radius: number;
}

/** ClipPlane specifies a single plane equation used to clip (i. */
interface ClipPlaneProxy extends X3DChildNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If (a,b,c,d) is the plane, with the first three components being a normalized vector describing the plane's normal direction (and thus the fourth component d being distance from the origin), a point (x,y,z) is visible to the user, with regards to the clipping plane, if a*x+b*y+c*z+d is greater than 0.
   *
   * This field is of access type 'inputOutput' and type SFVec4f.
   */
   plane: SFVec4f;
}

/** CollidableOffset repositions geometry relative to center of owning body. */
interface CollidableOffsetProxy extends X3DNBodyCollidableNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * The collidable field holds a reference to a single nested item of a collidable scene graph.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   collidable: X3DNBodyCollidableNodeProxy | null;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CollidableShape connects the collision detection system, the rigid body model, and the renderable scene graph. */
interface CollidableShapeProxy extends X3DNBodyCollidableNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * The shape field provides a geometry proxy for specifying which geometry best represents the collidable object.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   shape: ShapeProxy | null;
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Collision detects camera-to-object contact using current view and NavigationInfo avatarSize. */
interface CollisionProxy extends X3DGroupingNodeProxy, X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Time of collision between camera (avatar) and geometry.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly collideTime: number;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables collision detection for children and all descendants.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The proxy node is used as a substitute for Collision children during collision detection, simplifying collision-intersection computations.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   proxy: X3DChildNodeProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CollisionCollection holds a collection of objects that can be managed as a single entity for resolution of inter-object collisions. */
interface CollisionCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Default global parameters for collision outputs of rigid body physics system.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   appliedParameters: MFString <"BOUNCE" | "USER_FRICTION" | "FRICTION_COEFFICIENT-2" | "ERROR_REDUCTION" | "CONSTANT_FORCE" | "SPEED-1" | "SPEED-2" | "SLIP-1" | "SLIP-2">;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   bounce: number;
   /**
   * CollisionCollection node holds a collection of objects in the collidables field that can be managed as a single entity for resolution of inter-object collisions with other groups of collidable objects.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   collidables: MFNode <X3DNBodyCollisionSpaceNodeProxy | X3DNBodyCollidableNodeProxy>;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * frictionCoefficients used for computing surface drag.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   frictionCoefficients: SFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minBounceSpeed m/s needed to bounce.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minBounceSpeed: number;
   /**
   * slipFactors used for computing surface drag.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   slipFactors: SFVec2f;
   /**
   * softnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   softnessConstantForceMix: number;
   /**
   * softnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   softnessErrorCorrection: number;
   /**
   * surfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   surfaceSpeed: SFVec2f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** CollisionSensor generates collision-detection events. */
interface CollisionSensorProxy extends X3DSensorNodeProxy
{
   /**
   * The collider field specifies a CollisionCollection node that holds a collidables field of nodes and spaces that are to be included in collision-detection computations.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   collider: CollisionCollectionProxy | null;
   /**
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly contacts: MFNode <ContactProxy>;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly intersections: MFNode <X3DNBodyCollidableNodeProxy>;
   /**
   * isActive true/false events are sent when sensing starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** CollisionSpace holds collection of objects considered together for resolution of inter-object collisions. */
interface CollisionSpaceProxy extends X3DNBodyCollisionSpaceNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Collection of collidable objects as well as nested CollisionSpace collections.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   collidables: MFNode <X3DNBodyCollisionSpaceNodeProxy | X3DNBodyCollidableNodeProxy>;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * useGeometry indicates whether collision-detection code checks down to level of geometry, or only make approximations using geometry bounds.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   useGeometry: boolean;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Color node defines a set of RGB color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorProxy extends X3DColorNodeProxy
{
   /**
   * The color field defines an array of 3-tuple RGB colors.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   color: MFColor;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** ColorChaser generates a series of SFColor values that progressively change from initial value to destination value. */
interface ColorChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFColor.
   */
   initialDestination: SFColor;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFColor.
   */
   initialValue: SFColor;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFColor.
   */
   set_destination: SFColor;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFColor.
   */
   set_value: SFColor;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFColor.
   */
   readonly value_changed: SFColor;
}

/** ColorDamper generates a series of RGB color values that progressively change from initial value to destination value. */
interface ColorDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFColor.
   */
   initialDestination: SFColor;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFColor.
   */
   initialValue: SFColor;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFColor.
   */
   set_destination: SFColor;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFColor.
   */
   set_value: SFColor;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFColor.
   */
   readonly value_changed: SFColor;
}

/** ColorInterpolator generates a range of color values. */
interface ColorInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   keyValue: MFColor;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFColor.
   */
   readonly value_changed: SFColor;
}

/** ColorRGBA node defines a set of RGBA color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorRGBAProxy extends X3DColorNodeProxy
{
   /**
   * The color field defines an array of 4-tuple RGBA colors.
   *
   * This field is of access type 'inputOutput' and type MFColorRGBA.
   */
   color: MFColorRGBA;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** ComposedCubeMapTexture is a texture node that defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes. */
interface ComposedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   backTexture: X3DTexture2DNodeProxy | null;
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture, other texture nodes).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   bottomTexture: X3DTexture2DNodeProxy | null;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   frontTexture: X3DTexture2DNodeProxy | null;
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodese).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   leftTexture: X3DTexture2DNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   rightTexture: X3DTexture2DNodeProxy | null;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   topTexture: X3DTexture2DNodeProxy | null;
}

/** ComposedShader can contain field declarations, but no CDATA section of plain-text source code, since programs are composed from child ShaderPart nodes. */
interface ComposedShaderProxy extends X3DShaderNodeProxy, X3DProgrammableShaderObjectProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   activate: boolean;
   /**
   * Include a field statement for each field declaration in the ComposedShader node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   field: MFNode <fieldProxy>;
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isSelected: boolean;
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isValid: boolean;
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   language: "Cg" | "GLSL" | "HLSL";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * ComposedShader can contain multiple ShaderPart nodes in the parts field.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   parts: MFNode <ShaderPartProxy>;
}

/** ComposedTexture3D defines a 3D image-based texture map as a collection of 2D texture sources at various depths. */
interface ComposedTexture3DProxy extends X3DTexture3DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatR: boolean;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * collection of 2D texture sources.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   texture: MFNode <X3DTexture2DNodeProxy>;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
}

/** ComposedVolumeStyle allows compositing multiple rendering styles into single rendering pass. */
interface ComposedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * List of contributing rendering style nodes or node references that can be applied to the object.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   renderStyle: MFNode <X3DComposableVolumeRenderStyleNodeProxy>;
}

/** Cone is a geometry node. */
interface ConeProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether to draw bottom (other inside faces are not drawn).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bottom: boolean;
   /**
   * Size in meters.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   bottomRadius: number;
   /**
   * Size in meters.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   height: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to draw sides (other inside faces are not drawn).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   side: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
}

/** ConeEmitter generates all available particles from a specific point in space. */
interface ConeEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Cone boundary for random distribution of particles about initial direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   angle: number;
   /**
   * Initial direction from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Point from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** Contact nodes are produced as output events when two collidable objects or spaces make contact. */
interface ContactProxy extends X3DNodeProxy
{
   /**
   * Default global parameters for collision outputs of rigid body physics system.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   appliedParameters: MFString <"BOUNCE" | "USER_FRICTION" | "FRICTION_COEFFICIENT-2" | "ERROR_REDUCTION" | "CONSTANT_FORCE" | "SPEED-1" | "SPEED-2" | "SLIP-1" | "SLIP-2">;
   /**
   * The body1 and body2 fields specify two top-level nodes that should be evaluated in the physics model as a single set of interactions with respect to each other.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * The body1 and body2 fields specify two top-level nodes that should be evaluated in the physics model as a single set of interactions with respect to each other.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   bounce: number;
   /**
   * contactNormal is unit vector describing normal between two colliding bodies.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   contactNormal: SFVec3f;
   /**
   * depth indicates how deep the current intersection is along normal vector.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   depth: number;
   /**
   * frictionCoefficients used for computing surface drag.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   frictionCoefficients: SFVec2f;
   /**
   * frictionDirection controls friction vector.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   frictionDirection: SFVec3f;
   /**
   * The geometry1 and geometry2 fields specify collision-related information about body1 and body2.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry1: X3DNBodyCollidableNodeProxy | null;
   /**
   * The geometry1 and geometry2 fields specify collision-related information about body1 and body2.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry2: X3DNBodyCollidableNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minBounceSpeed m/s needed to bounce.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minBounceSpeed: number;
   /**
   * position (x, y, z in meters) of exact location of collision.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * slipCoefficients used for computing surface drag.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   slipCoefficients: SFVec2f;
   /**
   * softnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   softnessConstantForceMix: number;
   /**
   * softnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   softnessErrorCorrection: number;
   /**
   * surfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   surfaceSpeed: SFVec2f;
}

/** Contour2D groups a set of curve segments into a composite contour. */
interface Contour2DProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>;
   /**
   * The children form a closed loop with first point of first child repeated as last point of last child, and the last point of a segment repeated as first point of the consecutive one.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>;
}

/** ContourPolyline2D defines a linear curve segment as part of a trimming contour in the u-v domain of a NURBS surface. */
interface ContourPolyline2DProxy extends X3DNurbsControlCurveNodeProxy
{
   /**
   * controlPoint specifies the end points of each segment of the piecewise linear curve.
   *
   * This field is of access type 'inputOutput' and type MFVec2d.
   */
   controlPoint: MFVec2d;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Convolver performs a linear convolution on a given AudioBuffer, often used to achieve a reverberation effect. */
interface ConvolverProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * buffer is a memory-resident audio asset that can contain one or more channels.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   buffer: MFFloat;
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalize controls whether or not the impulse response from the buffer is scaled by an equal-power normalization when the buffer field is set.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   normalize: boolean;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** Coordinate builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateProxy extends X3DCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * point contains a set of 3D coordinate (triplet) point values.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   point: MFVec3f;
}

/** CoordinateChaser generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec3f.
   */
   initialDestination: MFVec3f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec3f.
   */
   initialValue: MFVec3f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec3f.
   */
   set_destination: MFVec3f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec3f.
   */
   set_value: MFVec3f;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly value_changed: MFVec3f;
}

/** CoordinateDamper generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec3f.
   */
   initialDestination: MFVec3f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec3f.
   */
   initialValue: MFVec3f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec3f.
   */
   set_destination: MFVec3f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec3f.
   */
   set_value: MFVec3f;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly value_changed: MFVec3f;
}

/** CoordinateDouble builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateDoubleProxy extends X3DCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * point contains a set of 3D coordinate (triplet) point values.
   *
   * This field is of access type 'inputOutput' and type MFVec3d.
   */
   point: MFVec3d;
}

/** CoordinateInterpolator linearly interpolates among a list of 3-tuple MFVec3f arrays, producing a single MFVec3f array that is fractional average between two nearest arrays in the list. */
interface CoordinateInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   keyValue: MFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly value_changed: MFVec3f;
}

/** CoordinateInterpolator2D generates a series of SFVec2f or MFVec2f 2-tuple float values. */
interface CoordinateInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   keyValue: MFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type MFVec2f.
   */
   readonly value_changed: MFVec2f;
}

/** Cylinder is a geometry node. */
interface CylinderProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether to draw bottom (inside faces are never drawn).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bottom: boolean;
   /**
   * Size in meters.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   height: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Size in meters.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   radius: number;
   /**
   * Whether to draw sides (inside faces are never drawn).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   side: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Whether to draw top (inside faces are never drawn).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   top: boolean;
}

/** CylinderSensor converts pointer motion (for example, a mouse or wand) into rotation values using an invisible cylinder aligned with local Y-axis. */
interface CylinderSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * determines whether previous offset values are remembered/accumulated.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoOffset: boolean;
   /**
   * axisRotation determines local sensor coordinate system by rotating the local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   axisRotation: SFRotation;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Help decide rotation behavior from initial relative bearing of pointer drag: acute angle whether cylinder sides or end-cap disks of virtual-geometry sensor are used for manipulation.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   diskAngle: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * clamps rotation_changed events within range of min/max values Hint: if minAngle > maxAngle, rotation is not clamped.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxAngle: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * clamps rotation_changed events within range of min/max values Hint: if minAngle > maxAngle, rotation is not clamped.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minAngle: number;
   /**
   * Sends event and remembers last value sensed.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   offset: number;
   /**
   * rotation_changed events equal sum of relative bearing changes plus offset value about Y-axis in local coordinate system.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly rotation_changed: SFRotation;
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly trackPoint_changed: SFVec3f;
}

/** Delay causes a time delay between the arrival of input data and subsequent propagation to the output. */
interface DelayProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * delayTime is duration of delay (in seconds) to apply.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   delayTime: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * maxDelayTime is duration of maximum amount of delay (in seconds) that can be applied.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   maxDelayTime: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** undefined */
interface DepthModeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   depthFunc: "NEVER" | "LESS" | "EQUAL" | "LESS_EQUAL" | "GREATER" | "NOT_EQUAL" | "GREATER_EQUAL" | "ALWAYS";
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   depthMask: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   depthRange: SFVec2f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   depthTest: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   polygonOffset: SFVec2f;
}

/** DirectionalLight might not be scoped by parent Group or Transform at levels 1 or 2. */
interface DirectionalLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * color of light, applied to colors of objects.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Orientation vector of light relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * Brightness of direct emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables this light source.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
}

/** DISEntityManager notifies a scene when new DIS ESPDU entities arrive or current entities leave. */
interface DISEntityManagerProxy extends X3DChildNodeProxy
{
   /**
   * addedEntities array contains any new entities added during the last frame.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly addedEntities: MFNode <EspduTransformProxy>;
   /**
   * Multicast network address, or else 'localhost'.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   address: string;
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   applicationID: number;
   /**
   * mapping field provides a mechanism for automatically creating an X3D model when a new entity arrives over the network.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <DISEntityTypeMappingProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Multicast network port, for example: 3000.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   port: number;
   /**
   * removedEntities output array provides EspduTransform references to any entities removed during last frame, either due to a timeout or from an explicit RemoveEntityPDU action.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly removedEntities: MFNode <EspduTransformProxy>;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   siteID: number;
}

/** DISEntityTypeMapping provides a best-match mapping from DIS ESPDU entity type information to a specific X3D model, thus providing a visual and behavioral representation that best matches the entity type. */
interface DISEntityTypeMappingProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   category: number;
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   country: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   domain: number;
   /**
   * Any extra information required to describe a particular entity.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   extra: number;
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   kind: number;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Specific information about an entity based on the subcategory field.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   specific: number;
   /**
   * Integer enumerations value for particular subcategory to which an entity belongs based on the category field.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   subcategory: number;
   /**
   * Local and/or online addresses of X3D model of interest, for example: "ExtrusionExampleShip.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** Disk2D is a geometry node that defines a filled (or partially filled) planar circle with center (0,0). */
interface Disk2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Inner circle radius, greater than or equal to 0.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   innerRadius: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Outer radius of circle, greater than or equal to inner radius.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   outerRadius: number;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
}

/** DoubleAxisHingeJoint has two independent axes located around a common anchor point. */
interface DoubleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   anchorPoint: SFVec3f;
   /**
   * axis1 defines axis vector of joint connection to body1.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis1: SFVec3f;
   /**
   * axis2 defines axis vector of joint connection to body2.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis2: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1AnchorPoint: SFVec3f;
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1Axis: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2AnchorPoint: SFVec3f;
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2Axis: SFVec3f;
   /**
   * desiredAngularVelocity1 is goal rotation rate for hinge connection to body1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   desiredAngularVelocity1: number;
   /**
   * desiredAngularVelocity2 is goal rotation rate for hinge connection to body2.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   desiredAngularVelocity2: number;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly hinge1Angle: number;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly hinge1AngleRate: number;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly hinge2Angle: number;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly hinge2AngleRate: number;
   /**
   * maxAngle1 is maximum rotation angle for hinge.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxAngle1: number;
   /**
   * maxTorque1 is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxTorque1: number;
   /**
   * maxTorque2 is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity2.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxTorque2: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minAngle1 is minimum rotation angle for hinge.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minAngle1: number;
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1Bounce: number;
   /**
   * stop1ConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1ConstantForceMix: number;
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1ErrorCorrection: number;
   /**
   * suspensionErrorCorrection describes how quickly the system resolves intersection errors due to floating-point inaccuracies.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   suspensionErrorCorrection: number;
   /**
   * suspensionForce describes how quickly the system resolves intersection errors due to floating-point inaccuracies.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   suspensionForce: number;
}

/** DynamicsCompressor node implements a dynamics compression effect, lowering volume of loudest parts of signal and raising volume of softest parts. */
interface DynamicsCompressorProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * The attack field is the duration of time (in seconds) to reduce the gain by 10dB.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   attack: number;
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * knee field contains a decibel value representing range above threshold where the curve smoothly transitions to compressed portion.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   knee: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * ratio field represents amount of input change, in dB, needed for 1 dB change in output.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ratio: number;
   /**
   * reduction field provides amount of gain reduction in dB currently applied by compressor to signal.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly reduction: number;
   /**
   * release field represents amount of time (in seconds) to increase gain by 10dB.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   release: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
   /**
   * threshold field represents decibel value above which compression starts taking effect.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   threshold: number;
}

/** EaseInEaseOut enables gradual animation transitions by modifying TimeSensor fraction outputs. */
interface EaseInEaseOutProxy extends X3DChildNodeProxy
{
   /**
   * Array of paired values for easeOut fraction and easeIn fraction within each key interval.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   easeInEaseOut: MFVec2f;
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to easeInEaseOut array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Interpolated output value determined by current key time, corresponding easeInEaseOut smoothing intervals, and corresponding key pair.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly modifiedFraction_changed: number;
   /**
   * set_fraction selects input fraction for computation of corresponding easeInEaseOut output value, modifiedFraction_changed.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
}

/** EdgeEnhancementVolumeStyle specifies edge enhancement for the volume rendering style. */
interface EdgeEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * color used to highlight edges.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   edgeColor: SFColorRGBA;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * minimum angle (in radians) away from view-direction vector for surface normal before applying enhancement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gradientThreshold: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   surfaceNormals: X3DTexture3DNodeProxy | null;
}

/** ElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface ElevationGridProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color node color values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   creaseAngle: number;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.
   *
   * This field is of access type 'initializeOnly' and type MFFloat.
   */
   height: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.
   *
   * This field is of access type 'inputOnly' and type MFFloat.
   */
   set_height: MFFloat;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | null;
   /**
   * Number of elements in the height array along X direction.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   xDimension: number;
   /**
   * Meters distance between grid-array vertices along X direction.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   xSpacing: number;
   /**
   * Number of elements in the height array along Z direction.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   zDimension: number;
   /**
   * Meters distance between grid-array vertices along Z direction.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   zSpacing: number;
}

/** undefined */
interface EnvironmentLightProxy extends X3DLightNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   diffuseCoefficients: MFFloat;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   diffuseTexture: X3DEnvironmentTextureNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   specularTexture: X3DEnvironmentTextureNodeProxy | null;
}

/** EspduTransform is a networked Transform node that can contain most nodes. */
interface EspduTransformProxy extends X3DGroupingNodeProxy, X3DNetworkSensorNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Multicast network address, or else 'localhost'; Example: 224.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   address: string;
   /**
   * Simulation/exercise applicationID is unique for application at that site.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   applicationID: number;
   /**
   * Information required for representation of the entity's visual appearance and position of its articulated parts.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   articulationParameterArray: MFFloat;
   /**
   * Array of change counters, each incremented when an articulated parameter is updated.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   articulationParameterChangeIndicatorArray: MFInt32;
   /**
   * Number of articulated parameters attached to this entity state PDU.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   articulationParameterCount: number;
   /**
   * Array of designators for each articulated parameter.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   articulationParameterDesignatorArray: MFInt32;
   /**
   * Array of ID parts that each articulated parameter is attached to.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   articulationParameterIdPartAttachedToArray: MFInt32;
   /**
   * Array of type enumerations for each articulated parameter element.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   articulationParameterTypeArray: MFInt32;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue0_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue1_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue2_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue3_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue4_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue5_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue6_changed: number;
   /**
   * Get element of user-defined payload array.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly articulationParameterValue7_changed: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Translation offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * When were we collided with? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly collideTime: number;
   /**
   * Integer enumeration for type of collision: ELASTIC or INELASTIC.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   collisionType: number;
   /**
   * Dead reckoning algorithm being used to project position/orientation with velocities/accelerations.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   deadReckoning: number;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * When were we detonated?.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly detonateTime: number;
   /**
   * World coordinates for detonationLocation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   detonationLocation: SFVec3f;
   /**
   * Relative coordinates for detonation location.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   detonationRelativeLocation: SFVec3f;
   /**
   * Integer enumeration for type of detonation and result that occurred.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   detonationResult: number;
   /**
   * Enables/disables the sensor node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityCategory: number;
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityCountry: number;
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityDomain: number;
   /**
   * Any extra information required to describe a particular entity.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityExtra: number;
   /**
   * Simulation/exercise entityID is a unique ID for a single entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityID: number;
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityKind: number;
   /**
   * Specific information about an entity based on the Subcategory field.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entitySpecific: number;
   /**
   * Integer enumerations value for particular subcategory to which an entity belongs based on the category field.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entitySubcategory: number;
   /**
   * Simulation/exercise eventApplicationID is unique for events generated from application at that site.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   eventApplicationID: number;
   /**
   * For a given event, simulation/exercise entityID is a unique ID for a single entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   eventEntityID: number;
   /**
   * Sequential number of each event issued by an application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   eventNumber: number;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   eventSiteID: number;
   /**
   * Has the primary weapon (Fire PDU) been fired?.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   fired1: boolean;
   /**
   * Has the secondary weapon (Fire PDU) been fired?.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   fired2: boolean;
   /**
   * When did we shoot a weapon (Fire PDU)? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly firedTime: number;
   /**
   * .
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   fireMissionIndex: number;
   /**
   * Range (three dimension, straight-line distance) that the firing entity's fire control system has assumed for computing the fire control solution if a weapon and if the value is known.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   firingRange: number;
   /**
   * Rate at which munitions are fired.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   firingRate: number;
   /**
   * forceID determines the team membership of the issuing entity, and whether FRIENDLY OPPOSING or NEUTRAL or OTHER.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   forceID: number;
   /**
   * Integer enumerations value for type of fuse on the munition.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   fuse: number;
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Have we received a network update recently? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Has a matching CollisionPDU reported a collision? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isCollided: boolean;
   /**
   * Has a matching DetonationPDU reported a detonation? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isDetonated: boolean;
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkReader: boolean;
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkWriter: boolean;
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isRtpHeaderHeard: boolean;
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isStandAlone: boolean;
   /**
   * Acceleration of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   linearAcceleration: SFVec3f;
   /**
   * Velocity of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   linearVelocity: SFVec3f;
   /**
   * Maximum of 11 characters for simple entity label.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   marking: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Fallback server address if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   multicastRelayHost: string;
   /**
   * Fallback server port if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   multicastRelayPort: number;
   /**
   * munitionApplicationID, unique for application at that site.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   munitionApplicationID: number;
   /**
   * Final point of the munition path from firing weapon to detonation or impact, in exercise coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   munitionEndPoint: SFVec3f;
   /**
   * munitionEntityID is unique ID for entity firing munition within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   munitionEntityID: number;
   /**
   * Quantity of munitions fired.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   munitionQuantity: number;
   /**
   * Munition siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   munitionSiteID: number;
   /**
   * Initial point of the munition path from firing weapon to detonation or impact, in exercise coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   munitionStartPoint: SFVec3f;
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   networkMode: "standAlone" | "networkReader" | "networkWriter";
   /**
   * Network connection port number (EXAMPLE 3000) for sending or receiving DIS messages.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   port: number;
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   readInterval: number;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Orientation of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   rtpHeaderExpected: boolean;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue0: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue1: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue2: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue3: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue4: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue5: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue6: number;
   /**
   * Set element of user-defined payload array.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_articulationParameterValue7: number;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   siteID: number;
   /**
   * DIS timestamp received from latest PDU update, converted to X3D SFTime units.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly timestamp: number;
   /**
   * Position of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Integer enumerations value for type of warhead on the munition.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   warhead: number;
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   writeInterval: number;
}

/** ExplosionEmitter generates all particles from a specific point in space at the initial time enabled. */
interface ExplosionEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Point from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** Extrusion is a geometry node that sequentially stretches a 2D cross section along a 3D-spine path in the local coordinate system, creating an outer hull. */
interface ExtrusionProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether beginning cap is drawn (similar to Cylinder top cap).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   beginCap: boolean;
   /**
   * The ccw field indicates counterclockwise ordering of vertex-coordinates orientation.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * The convex field is a hint to renderers whether all polygons in a shape are convex (true), or possibly concave (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   convex: boolean;
   /**
   * creaseAngle defines angle (in radians) where adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   creaseAngle: number;
   /**
   * The crossSection array defines a silhouette outline of the outer Extrusion surface.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   crossSection: MFVec2f;
   /**
   * Whether end cap is drawn (similar to Cylinder bottom cap).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   endCap: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The orientation array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.
   *
   * This field is of access type 'initializeOnly' and type MFRotation.
   */
   orientation: MFRotation;
   /**
   * scale is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   scale: MFVec2f;
   /**
   * The crossSection array defines a silhouette outline of the outer Extrusion surface.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_crossSection: MFVec2f;
   /**
   * The orientation array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.
   *
   * This field is of access type 'inputOnly' and type MFRotation.
   */
   set_orientation: MFRotation;
   /**
   * scale is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_scale: MFVec2f;
   /**
   * The spine array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices.
   *
   * This field is of access type 'inputOnly' and type MFVec3f.
   */
   set_spine: MFVec3f;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * The spine array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices.
   *
   * This field is of access type 'initializeOnly' and type MFVec3f.
   */
   spine: MFVec3f;
}

/** FillProperties indicates whether appearance is filled or hatched for associated geometry nodes inside the same Shape. */
interface FillPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Whether or not associated geometry is filled.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   filled: boolean;
   /**
   * Color of the hatch pattern.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   hatchColor: SFColor;
   /**
   * Whether or not associated geometry is hatched.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   hatched: boolean;
   /**
   * hatchStyle selects a hatch pattern from ISO/IEC 9973 International Register of Graphical Items.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   hatchStyle: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** FloatVertexAttribute defines a set of per-vertex single-precision floating-point attributes. */
interface FloatVertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   name: string;
   /**
   * numComponents specifies how many consecutive floating-point values should be grouped together per vertex.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   numComponents: number;
   /**
   * value specifies an arbitrary collection of floating-point values that will be passed to the shader as per-vertex information.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   value: MFFloat;
}

/** Fog simulates atmospheric effects by blending distant objects with fog color. */
interface FogProxy extends X3DBindableNodeProxy, X3DFogObjectProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * Fog color.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   fogType: "LINEAR" | "EXPONENTIAL";
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Receiving event set_bind=true activates and binds this node at the top of the binding stack.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * Distance in meters where objects are totally obscured by the fog, using local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   visibilityRange: number;
}

/** FogCoordinate defines a set of explicit fog depths on a per-vertex basis, overriding Fog visibilityRange. */
interface FogCoordinateProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * depth contains a set of 3D coordinate (triplet) point values.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   depth: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** FontStyle is an X3DFontStyleNode that defines the size, family, justification, and other styles used by Text nodes. */
interface FontStyleProxy extends X3DFontStyleNodeProxy
{
   /**
   * Array of quoted font family names in preference order, browsers use the first supported family.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   family: MFString <"SANS" | "SERIF" | "TYPEWRITER">;
   /**
   * Whether text direction is horizontal (true) or vertical (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   horizontal: boolean;
   /**
   * The justify field determines horizontal and vertical alignment of text layout, relative to the origin of the object coordinate system.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   justify: MFString <"MIDDLE" | "BEGIN" | "END" | "FIRST">;
   /**
   * Language codes consist of a primary code and a (possibly empty) series of subcodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   language: string;
   /**
   * Whether text direction is left-to-right (true) or right-to-left (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   leftToRight: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Nominal height (in local coordinate system) of text glyphs, also sets default spacing between adjacent lines of text.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   size: number;
   /**
   * Adjustment factor for line spacing between adjacent lines of text.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   spacing: number;
   /**
   * Pick one of four values for text style (PLAIN|BOLD|ITALIC|BOLDITALIC).
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   style: "PLAIN" | "BOLD" | "ITALIC" | "BOLDITALIC";
   /**
   * Whether text direction is top-to-bottom (true) or bottom-to-top (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   topToBottom: boolean;
}

/** ForcePhysicsModel applies a constant force value to the particles. */
interface ForcePhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * force field indicates strength and direction of the propelling force on the particles (for example, default is Earth's gravity).
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   force: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The Gain node amplifies or deamplifies the input signal. */
interface GainProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** GeneratedCubeMapTexture is a texture node that defines a cubic environment map that sources its data from internally generated images. */
interface GeneratedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * size indicates the resolution of the generated images in number of pixels per side.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   size: number;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * update controls regeneration of the texture.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   update: "NONE" | "NEXT_FRAME_ONLY" | "ALWAYS";
}

/** GeoCoordinate builds geometry as a set of geographic 3D coordinates. */
interface GeoCoordinateProxy extends X3DCoordinateNodeProxy
{
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * point contains a set of actual 3D geographic coordinates, provided in geoSystem format can split strings if desired: "x1 y1 z1 x2 y2 z2" or "x1 y1 z1", "x2 y2 z2".
   *
   * This field is of access type 'inputOutput' and type MFVec3d.
   */
   point: MFVec3d;
}

/** GeoElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface GeoElevationGridProxy extends X3DGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color node color values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * This field is of access type 'initializeOnly' and type SFDouble.
   */
   creaseAngle: number;
   /**
   * Geographic coordinate for southwest (lower-left) corner of height dataset.
   *
   * This field is of access type 'initializeOnly' and type SFVec3d.
   */
   geoGridOrigin: SFVec3d;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   height: MFDouble;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.
   *
   * This field is of access type 'inputOnly' and type MFDouble.
   */
   set_height: MFDouble;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | null;
   /**
   * Number of elements in the height array along east-west X direction.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   xDimension: number;
   /**
   * Distance between grid-array vertices along east-west X direction.
   *
   * This field is of access type 'initializeOnly' and type SFDouble.
   */
   xSpacing: number;
   /**
   * Vertical exaggeration of displayed data produced from the height array.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   yScale: number;
   /**
   * Number of elements in the height array along north-south Z direction.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   zDimension: number;
   /**
   * Distance between grid-array vertices along north-south Z direction.
   *
   * This field is of access type 'initializeOnly' and type SFDouble.
   */
   zSpacing: number;
}

/** GeoLocation positions a regular X3D model onto earth's surface. */
interface GeoLocationProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Note that MFNode rootNode field can contain multiple nodes and has accessType inputOutput. Meanwhile MFNode children field is outputOnly, unlike other X3DGroupingNode exemplars. */
interface GeoLODProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Viewer range from geographic-coordinates center triggers quadtree loading/unloading.
   *
   * This field is of access type 'initializeOnly' and type SFVec3d.
   */
   center: SFVec3d;
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   child1Url: MFString;
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   child2Url: MFString;
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   child3Url: MFString;
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   child4Url: MFString;
   /**
   * The outputOnly children field exposes a portion of the scene graph for the currently loaded set of nodes.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly children: MFNode <X3DChildNodeProxy>;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Output event that reports when the new children outputOnly event is generated, with value 0 or 1, where 0 indicates the rootNode field and 1 indicates the nodes specified by the child1Url, child2Url, child3Url, and child4Url fields.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly level_changed: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Viewer range from geographic-coordinates center triggers quadtree loading/unloading.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   range: number;
   /**
   * Geometry for the root tile.
   *
   * This field is of access type 'initializeOnly' and type MFNode.
   */
   rootNode: MFNode <X3DChildNodeProxy>;
   /**
   * url for scene providing geometry for the root tile.
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   rootUrl: MFString;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** GeoMetadata includes a generic subset of metadata about the geographic data. */
interface GeoMetadataProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * DEF list of all nodes that implement this data.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   data: MFNode <X3DNodeProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The summary string array contains a set of keyword/value pairs, with each keyword and its subsequent value contained in separate strings.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   summary: MFString;
   /**
   * Hypertext link to an external, complete metadata description.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** GeoOrigin is deprecated and discouraged (but nevertheless allowed) in X3D version 3.3. GeoOrigin is restored in X3D version 4.0 for special use on devices with limited floating-point resolution. */
interface GeoOriginProxy extends X3DNodeProxy
{
   /**
   * Defines absolute geographic location (and implicit local coordinate frame).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to rotate coordinates of nodes using this GeoOrigin so that local-up direction aligns with VRML Y axis rotateYUp false means local up-direction is relative to planet surface rotateYUp true allows proper operation of NavigationInfo modes FLY, WALK.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   rotateYUp: boolean;
}

/** GeoPositionInterpolator animates objects within a geographic coordinate system. */
interface GeoPositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * interpolated coordinate in the geographic coordinate system specified by geoSystem Hint: X3D for Advanced Modeling (X3D4AM) slideset https://x3dgraphics.
   *
   * This field is of access type 'outputOnly' and type SFVec3d.
   */
   readonly geovalue_changed: SFVec3d;
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3d.
   */
   keyValue: MFVec3d;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
}

/** GeoProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface GeoProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Position offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   center: SFVec3d;
   /**
   * Sends changed centerOfRotation values, likely caused by user interaction.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly centerOfRotation_changed: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Time event generated when user's camera enters the box.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly enterTime: number;
   /**
   * Time event generated when user's camera exits the box.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly exitTime: number;
   /**
   * Position offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCenter: SFVec3d;
   /**
   * Sends geospatial coordinates of viewer's position corresponding to world position returned by position_changed.
   *
   * This field is of access type 'outputOnly' and type SFVec3d.
   */
   readonly geoCoord_changed: SFVec3d;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * isActive true/false events are sent as viewer enters/exits Proximity box.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Sends rotation event relative to center.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly orientation_changed: SFRotation;
   /**
   * Sends translation event relative to center.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly position_changed: SFVec3f;
   /**
   * size of Proximity box around center location, oriented within local transformation frame.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
}

/** GeoTouchSensor returns geographic coordinates for the object being selected. */
interface GeoTouchSensorProxy extends X3DTouchSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (G D), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Output event containing 3D point on surface of underlying geometry, given in GeoTouchSensor's local coordinate system.
   *
   * This field is of access type 'outputOnly' and type SFVec3d.
   */
   readonly hitGeoCoord_changed: SFVec3d;
   /**
   * Output event containing surface normal vector at the hitGeoCoordinate.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly hitNormal_changed: SFVec3f;
   /**
   * Output event containing 3D point on surface of underlying geometry, given in geometry coordinates (not geographic coordinates).
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly hitPoint_changed: SFVec3f;
   /**
   * Output event containing texture coordinates of surface at the hitGeoCoordinate.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly hitTexCoord_changed: SFVec2f;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Is pointing device over sensor's geometry?.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Time event generated when touched.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly touchTime: number;
}

/** GeoTransform is a Grouping node that can contain most nodes. */
interface GeoTransformProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCenter: SFVec3d;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate sys tem before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** GeoViewpoint specifies viewpoints using geographic coordinates. */
interface GeoViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   centerOfRotation: SFVec3d;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   fieldOfView: number;
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   geoOrigin: GeoOriginProxy | null;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Whether to transition instantly by jumping, or else smoothly animate to this Viewpoint.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   jump: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   navigationInfo: NavigationInfoProxy | null;
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * Rotation of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * position relative to local georeferenced coordinate system, in proper format.
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   position: SFVec3d;
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   retainUserOffsets: boolean;
   /**
   * set_bind true makes this node active, set_bind false makes this node inactive.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * speedFactor is a multiplier to modify the original elevation-based speed that is set automatically by the browser.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   speedFactor: number;
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   viewAll: boolean;
}

/** Group is a Grouping node that can contain most nodes. */
interface GroupProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** HAnimDisplacer nodes alter the shape of coordinate-based geometry within parent HAnimJoint or HAnimSegment nodes. */
interface HAnimDisplacerProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Defines index values into the parent HAnimSegment or HAnimBody/HAnimHumanoid coordinate array for the mesh of vertices affected by this HAnimDisplacer.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   coordIndex: MFInt32;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * displacements are a set of SFVec3f values added to neutral/resting position of each of the corresponding HAnimSegment vertices (or HAnimJoint/HAnimHumanoid vertices) referenced by coordIndex field.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   displacements: MFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Unique name attribute must be defined so that HAnimDisplacer node can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: "skull_vertex" | "glabella" | "sellion" | "l_infraorbitale" | "l_tragion" | "l_gonion" | "r_infraorbitale" | "r_tragion" | "r_gonion" | "supramenton" | "cervicale" | "adams_apple" | "suprasternale" | "substernale" | "l_clavicle" | "l_acromion" | "l_axilla_proximal" | "l_axilla_distal" | "l_axilla_posterior_folds" | "r_clavicle" | "r_acromion" | "r_axilla_proximal" | "r_axilla_distal" | "r_axilla_posterior_folds" | "spine_1_middle_back" | "spine_2_lower_back" | "waist_preferred_anterior" | "waist_preferred_posterior" | "l_rib10" | "l_thelion" | "r_rib10" | "r_thelion" | "l_asis" | "l_iliocristale" | "l_psis" | "r_asis" | "r_iliocristale" | "r_psis" | "crotch" | "l_femoral_lateral_epicondyle" | "l_femoral_medial_epicondyle" | "l_suprapatella" | "l_trochanterion" | "r_femoral_lateral_epicondyle" | "r_femoral_medial_epicondyle" | "r_suprapatella" | "r_trochanterion" | "l_tibiale" | "l_medial_malleolus" | "l_lateral_malleolus" | "l_sphyrion" | "r_tibiale" | "r_medial_malleolus" | "r_lateral_malleolus" | "r_sphyrion" | "l_metatarsal_phalanx_1" | "l_metatarsal_phalanx_5" | "l_dactylion" | "l_calcaneus_posterior" | "r_metatarsal_phalanx_1" | "r_metatarsal_phalanx_5" | "r_dactylion" | "r_calcaneus_posterior" | "l_humeral_lateral_epicondyle" | "l_humeral_medial_epicondyle" | "l_olecranon" | "r_humeral_lateral_epicondyle" | "r_humeral_medial_epicondyle" | "r_olecranon" | "l_radiale" | "l_ulnar_styloid" | "l_radial_styloid" | "r_radiale" | "r_ulnar_styloid" | "r_radial_styloid" | "l_metacarpal_phalanx_2" | "l_metacarpal_phalanx_3" | "l_metacarpal_phalanx_5" | "r_metacarpal_phalanx_2" | "r_metacarpal_phalanx_3" | "r_metacarpal_phalanx_5" | "nuchale" | "l_neck_base" | "r_neck_base" | "navel" | "l_ectocanthus" | "r_ectocanthus" | "menton" | "mesosternale" | "opisthocranion" | "l_knee_crease" | "r_knee_crease" | "rear_center_midsagittal_plane" | "buttocks_standing_wall_contact_point" | "l_chest_midsagittal_plane" | "r_chest_midsagittal_plane" | "l_bideltoid" | "r_bideltoid" | "l_carpal_distal_phalanx_1" | "l_carpal_distal_phalanx_2" | "l_carpal_distal_phalanx_3" | "l_carpal_distal_phalanx_4" | "l_carpal_distal_phalanx_5" | "r_carpal_distal_phalanx_1" | "r_carpal_distal_phalanx_2" | "r_carpal_distal_phalanx_3" | "r_carpal_distal_phalanx_4" | "r_carpal_distal_phalanx_5" | "l_tarsal_distal_phalanx_1" | "l_tarsal_distal_phalanx_2" | "l_tarsal_distal_phalanx_3" | "l_tarsal_distal_phalanx_4" | "l_tarsal_distal_phalanx_5" | "r_tarsal_distal_phalanx_1" | "r_tarsal_distal_phalanx_2" | "r_tarsal_distal_phalanx_3" | "r_tarsal_distal_phalanx_4" | "r_tarsal_distal_phalanx_5";
   /**
   * The weigh factor has typical range [0,1] and defines the scale factor applied to displacement values before adding them to neutral vertex positions.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   weight: number;
}

/** The HAnimHumanoid node is used to: (a) store references to the joints, segments, sites, skeleton, optional skin, and fixed viewpoints, (b) serve as a container for the entire humanoid, (c) provide a convenient way of moving the humanoid through its environment, and (d) store human-readable metadata such as name, version, author, copyright, age, gender and other information. */
interface HAnimHumanoidProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Translation offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Contains metadata keyword=value pairs, where approved keyword terms are humanoidVersion authorName authorEmail copyright creationDate usageRestrictions age gender height and weight.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   info: MFString;
   /**
   * Specifies an array of position values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   jointBindingPositions: MFVec3f;
   /**
   * Specifies an array of rotation values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * This field is of access type 'inputOutput' and type MFRotation.
   */
   jointBindingRotations: MFRotation;
   /**
   * Specifies an array of scale values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   jointBindingScales: MFVec3f;
   /**
   * The joints field contains a list of USE references for all HAnimJoint node instances found within the preceding skeleton hierarchy.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   joints: MFNode <HAnimJointProxy>;
   /**
   * Level Of Articulation 0.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   loa: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Contains any HAnimMotion nodes that can animate the HAnimHumanoid.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   motions: MFNode <HAnimMotionProxy>;
   /**
   * Array of boolean values corresponding to HAnimMotion nodes indicating which can animate the HAnimHumanoid.
   *
   * This field is of access type 'inputOutput' and type MFBool.
   */
   motionsEnabled: MFBool;
   /**
   * Unique name attribute must be defined so that each HAnimHumanoid node in a scene can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Orientation of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * The segments field contains a list of USE references for all HAnimSegment node instances found within the preceding skeleton hierarchy.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   segments: MFNode <HAnimSegmentProxy>;
   /**
   * sites field contains a list of USE references for all HAnimSite node instances found within the preceding skeleton hierarchy.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   sites: MFNode <HAnimSiteProxy>;
   /**
   * Models sharing a common skeletal configuration can share animations and binding poses.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   skeletalConfiguration: string;
   /**
   * List of top-level HAnimJoint and HAnimSite nodes that create the skeleton model.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   skeleton: MFNode <HAnimJointProxy | HAnimSiteProxy>;
   /**
   * List of one or more indexed mesh definitions (such as IndexedFaceSet) that utilize skinCoord point and skinNormal normal data.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   skin: MFNode <GroupProxy | TransformProxy | ShapeProxy | IndexedFaceSetProxy>;
   /**
   * Array of Coordinate nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   skinBindingCoords: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Array of Normal nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   skinBindingNormals: X3DNormalNodeProxy | null;
   /**
   * Coordinate node utilized by indexed mesh definitions for skin.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   skinCoord: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Single Normal node utilized by indexed mesh definitions for skin.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   skinNormal: X3DNormalNodeProxy | null;
   /**
   * Position of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * HAnimHumanoid version, where allowed value is 2.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   version: "2.0";
   /**
   * List of HAnimSite nodes containing Viewpoint nodes that appear in the skeleton model, usually as USE node references.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   viewpoints: MFNode <HAnimSiteProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** HAnimJoint node can represent each joint in a body. */
interface HAnimJointProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <HAnimJointProxy | HAnimSegmentProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Translation offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <HAnimJointProxy | HAnimSegmentProxy>;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * the displacers field stores HAnimDisplacer objects for a particular HAnimJoint object.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   displacers: MFNode <HAnimDisplacerProxy>;
   /**
   * Orientation of upper/lower rotation limits, relative to HAnimJoint center.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   limitOrientation: SFRotation;
   /**
   * Lower limit for minimum joint rotation in radians.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   llimit: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Unique name attribute must be defined so that HAnimJoint node can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: "humanoid_root" | "sacroiliac" | "l_hip" | "l_knee" | "l_talocrural" | "l_talocalcaneonavicular" | "l_cuneonavicular_1" | "l_tarsometatarsal_1" | "l_metatarsophalangeal_1" | "l_tarsal_interphalangeal_1" | "l_cuneonavicular_2" | "l_tarsometatarsal_2" | "l_metatarsophalangeal_2" | "l_tarsal_proximal_interphalangeal_2" | "l_tarsal_distal_interphalangeal_2" | "l_cuneonavicular_3" | "l_tarsometatarsal_3" | "l_metatarsophalangeal_3" | "l_tarsal_proximal_interphalangeal_3" | "l_tarsal_distal_interphalangeal_3" | "l_calcaneocuboid" | "l_transversetarsal" | "l_tarsometatarsal_4" | "l_metatarsophalangeal_4" | "l_tarsal_proximal_interphalangeal_4" | "l_tarsal_distal_interphalangeal_4" | "l_tarsometatarsal_5" | "l_metatarsophalangeal_5" | "l_tarsal_proximal_interphalangeal_5" | "l_tarsal_distal_interphalangeal_5" | "r_hip" | "r_knee" | "r_talocrural" | "r_talocalcaneonavicular" | "r_cuneonavicular_1" | "r_tarsometatarsal_1" | "r_metatarsophalangeal_1" | "r_tarsal_interphalangeal_1" | "r_cuneonavicular_2" | "r_tarsometatarsal_2" | "r_metatarsophalangeal_2" | "r_tarsal_proximal_interphalangeal_2" | "r_tarsal_distal_interphalangeal_2" | "r_cuneonavicular_3" | "r_tarsometatarsal_3" | "r_metatarsophalangeal_3" | "r_tarsal_proximal_interphalangeal_3" | "r_tarsal_distal_interphalangeal_3" | "r_calcaneocuboid" | "r_transversetarsal" | "r_tarsometatarsal_4" | "r_metatarsophalangeal_4" | "r_tarsal_proximal_interphalangeal_4" | "r_tarsal_distal_interphalangeal_4" | "r_tarsometatarsal_5" | "r_metatarsophalangeal_5" | "r_tarsal_proximal_interphalangeal_5" | "r_tarsal_distal_interphalangeal_5" | "vl5" | "vl4" | "vl3" | "vl2" | "vl1" | "vt12" | "vt11" | "vt10" | "vt9" | "vt8" | "vt7" | "vt6" | "vt5" | "vt4" | "vt3" | "vt2" | "vt1" | "vc7" | "vc6" | "vc5" | "vc4" | "vc3" | "vc2" | "vc1" | "skullbase" | "l_eyelid_joint" | "r_eyelid_joint" | "l_eyeball_joint" | "r_eyeball_joint" | "l_eyebrow_joint" | "r_eyebrow_joint" | "temporomandibular" | "l_sternoclavicular" | "l_acromioclavicular" | "l_shoulder" | "l_elbow" | "l_radiocarpal" | "l_midcarpal_1" | "l_carpometacarpal_1" | "l_metacarpophalangeal_1" | "l_carpal_interphalangeal_1" | "l_midcarpal_2" | "l_carpometacarpal_2" | "l_metacarpophalangeal_2" | "l_carpal_proximal_interphalangeal_2" | "l_carpal_distal_interphalangeal_2" | "l_midcarpal_3" | "l_carpometacarpal_3" | "l_metacarpophalangeal_3" | "l_carpal_proximal_interphalangeal_3" | "l_carpal_distal_interphalangeal_3" | "l_midcarpal_4_5" | "l_carpometacarpal_4" | "l_metacarpophalangeal_4" | "l_carpal_proximal_interphalangeal_4" | "l_carpal_distal_interphalangeal_4" | "l_carpometacarpal_5" | "l_metacarpophalangeal_5" | "l_carpal_proximal_interphalangeal_5" | "l_carpal_distal_interphalangeal_5" | "r_sternoclavicular" | "r_acromioclavicular" | "r_shoulder" | "r_elbow" | "r_radiocarpal" | "r_midcarpal_1" | "r_carpometacarpal_1" | "r_metacarpophalangeal_1" | "r_carpal_interphalangeal_1" | "r_midcarpal_2" | "r_carpometacarpal_2" | "r_metacarpophalangeal_2" | "r_carpal_proximal_interphalangeal_2" | "r_carpal_distal_interphalangeal_2" | "r_midcarpal_3" | "r_carpometacarpal_3" | "r_metacarpophalangeal_3" | "r_carpal_proximal_interphalangeal_3" | "r_carpal_distal_interphalangeal_3" | "r_midcarpal_4_5" | "r_carpometacarpal_4" | "r_metacarpophalangeal_4" | "r_carpal_proximal_interphalangeal_4" | "r_carpal_distal_interphalangeal_4" | "r_carpometacarpal_5" | "r_metacarpophalangeal_5" | "r_carpal_proximal_interphalangeal_5" | "r_carpal_distal_interphalangeal_5";
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <HAnimJointProxy | HAnimSegmentProxy>;
   /**
   * Orientation of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Coordinate index values referencing which vertices are influenced by the HAnimJoint.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   skinCoordIndex: MFInt32;
   /**
   * Weight deformation values for the corresponding values in the skinCoordIndex field.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   skinCoordWeight: MFFloat;
   /**
   * A scale factor of (1 - stiffness) is applied around the corresponding axis (X, Y, or Z for entries 0, 1 and 2 of the stiffness field).
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   stiffness: MFFloat;
   /**
   * Position of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Upper limit for maximum joint rotation in radians.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   ulimit: MFFloat;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** An HAnimMotion node supports discrete frame-by-frame playback for HAnim motion data animation. */
interface HAnimMotionProxy extends X3DChildNodeProxy
{
   /**
   * list of number of channels for transformation, followed by transformation type of each channel of data.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channels: string;
   /**
   * boolean values for each channel indicating whether enabled.
   *
   * This field is of access type 'inputOutput' and type MFBool.
   */
   channelsEnabled: MFBool;
   /**
   * cycleTime sends a time event at initial starting time and at beginning of each new cycle.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly cycleTime: number;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * elapsedTime is computed elapsed time since the Motion object was activated and running, counting all traversed frames (as if frameIndex equaled 1) and multiplied by frameDuration, cumulative in seconds.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * endFrame indicates final index of animated frame.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   endFrame: number;
   /**
   * frameCount is computed at run time and indicates the total number of frames present in the animation, equaling the number of sets of channel data rows present in the values array.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly frameCount: number;
   /**
   * frameDuration specifies the duration of each frame in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   frameDuration: number;
   /**
   * frameIncrement field controls whether playback direction is forwards or backwards, and also whether frames are skipped (for example, subsampled replay).
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   frameIncrement: number;
   /**
   * frameIndex indicates index of current frame.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   frameIndex: number;
   /**
   * joints field lists names of joints that raw motion data is to be applied to.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   joints: string;
   /**
   * Level Of Articulation 0.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   loa: number;
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   loop: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Unique name attribute must be defined so that HAnimMotion node can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Send next output value in values array, using/updating various frame values as appropriate.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   next: boolean;
   /**
   * Send previous output value in values array, using/updating various frame values as appropriate.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   previous: boolean;
   /**
   * startFrame indicates initial index of animated frame.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   startFrame: number;
   /**
   * values field contains all transformation values, ordered first by frame, then by joint, and then by transformation Sets of floats in the values array matching the order listed in joints and channels fields.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   values: MFFloat;
}

/** HAnimSegment node contains Shape geometry for each body segment, providing a visual representation of the skeleton segment. */
interface HAnimSegmentProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Location within segment of center of mass.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   centerOfMass: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * the coord field is used for HAnimSegment objects that have deformable meshes and shall contain coordinates referenced from the IndexedFaceSet for the paarent HAnimSegment object.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * the displacers field stores HAnimDisplacer objects for a particular HAnimSegment object.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   displacers: MFNode <HAnimDisplacerProxy>;
   /**
   * Total mass of the segment, 0 if not available, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * 3x3 moments of inertia matrix.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   momentsOfInertia: MFFloat;
   /**
   * Unique name attribute must be defined so that HAnimSegment node can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: "sacrum" | "pelvis" | "l_thigh" | "l_calf" | "l_talus" | "l_navicular" | "l_cuneiform_1" | "l_metatarsal_1" | "l_tarsal_proximal_phalanx_1" | "l_tarsal_distal_phalanx_1" | "l_cuneiform_2" | "l_metatarsal_2" | "l_tarsal_proximal_phalanx_2" | "l_tarsal_middle_phalanx_2" | "l_tarsal_distal_phalanx_2" | "l_cuneiform_3" | "l_metatarsal_3" | "l_tarsal_proximal_phalanx_3" | "l_tarsal_middle_phalanx_3" | "l_tarsal_distal_phalanx_3" | "l_calcaneus" | "l_cuboid" | "l_metatarsal_4" | "l_tarsal_proximal_phalanx_4" | "l_tarsal_middle_phalanx_4" | "l_tarsal_distal_phalanx_4" | "l_metatarsal_5" | "l_tarsal_proximal_phalanx_5" | "l_tarsal_middle_phalanx_5" | "l_tarsal_distal_phalanx_5" | "r_thigh" | "r_calf" | "r_talus" | "r_navicular" | "r_cuneiform_1" | "r_metatarsal_1" | "r_tarsal_proximal_phalanx_1" | "r_tarsal_distal_phalanx_1" | "r_cuneiform_2" | "r_metatarsal_2" | "r_tarsal_proximal_phalanx_2" | "r_tarsal_middle_phalanx_2" | "r_tarsal_distal_phalanx_2" | "r_cuneiform_3" | "r_metatarsal_3" | "r_tarsal_proximal_phalanx_3" | "r_tarsal_middle_phalanx_3" | "r_tarsal_distal_phalanx_3" | "r_calcaneus" | "r_cuboid" | "r_metatarsal_4" | "r_tarsal_proximal_phalanx_4" | "r_tarsal_middle_phalanx_4" | "r_tarsal_distal_phalanx_4" | "r_metatarsal_5" | "r_tarsal_proximal_phalanx_5" | "r_tarsal_middle_phalanx_5" | "r_tarsal_distal_phalanx_5" | "l5" | "l4" | "l3" | "l2" | "l1" | "t12" | "t11" | "t10" | "t9" | "t8" | "t7" | "t6" | "t5" | "t4" | "t3" | "t2" | "t1" | "c7" | "c6" | "c5" | "c4" | "c3" | "c2" | "c1" | "skull" | "l_eyelid" | "r_eyelid" | "l_eyeball" | "r_eyeball" | "l_eyebrow" | "r_eyebrow" | "jaw" | "l_clavicle" | "l_scapula" | "l_upperarm" | "l_forearm" | "l_carpal" | "l_trapezium" | "l_metacarpal_1" | "l_carpal_proximal_phalanx_1" | "l_carpal_distal_phalanx_1" | "l_trapezoid" | "l_metacarpal_2" | "l_carpal_proximal_phalanx_2" | "l_carpal_middle_phalanx_2" | "l_carpal_distal_phalanx_2" | "l_capitate" | "l_metacarpal_3" | "l_carpal_proximal_phalanx_3" | "l_carpal_middle_phalanx_3" | "l_carpal_distal_phalanx_3" | "l_hamate" | "l_metacarpal_4" | "l_carpal_proximal_phalanx_4" | "l_carpal_middle_phalanx_4" | "l_carpal_distal_phalanx_4" | "l_metacarpal_5" | "l_carpal_proximal_phalanx_5" | "l_carpal_middle_phalanx_5" | "l_carpal_distal_phalanx_5" | "r_clavicle" | "r_scapula" | "r_upperarm" | "r_forearm" | "r_carpal" | "r_trapezium" | "r_metacarpal_1" | "r_carpal_proximal_phalanx_1" | "r_carpal_distal_phalanx_1" | "r_trapezoid" | "r_metacarpal_2" | "r_carpal_proximal_phalanx_2" | "r_carpal_middle_phalanx_2" | "r_carpal_distal_phalanx_2" | "r_capitate" | "r_metacarpal_3" | "r_carpal_proximal_phalanx_3" | "r_carpal_middle_phalanx_3" | "r_carpal_distal_phalanx_3" | "r_hamate" | "r_metacarpal_4" | "r_carpal_proximal_phalanx_4" | "r_carpal_middle_phalanx_4" | "r_carpal_distal_phalanx_4" | "r_metacarpal_5" | "r_carpal_proximal_phalanx_5" | "r_carpal_middle_phalanx_5" | "r_carpal_distal_phalanx_5";
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** An HAnimSite node serves three purposes: (a) define an "end effector" location which can be used by an inverse kinematics system, (b) define an attachment point for accessories such as jewelry and clothing, and (c) define a location for a Viewpoint virtual camera in the reference frame of an HAnimSegment (such as a view "through the eyes" of the humanoid for use in multi-user worlds). */
interface HAnimSiteProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Default location of this HAnimSite, i.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Unique name attribute must be defined so that HAnimSite node can be identified at run time for animation purposes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: "skull_vertex" | "glabella" | "sellion" | "l_infraorbitale" | "l_tragion" | "l_gonion" | "r_infraorbitale" | "r_tragion" | "r_gonion" | "supramenton" | "cervicale" | "adams_apple" | "suprasternale" | "substernale" | "l_clavicle" | "l_acromion" | "l_axilla_proximal" | "l_axilla_distal" | "l_axilla_posterior_folds" | "r_clavicle" | "r_acromion" | "r_axilla_proximal" | "r_axilla_distal" | "r_axilla_posterior_folds" | "spine_1_middle_back" | "spine_2_lower_back" | "waist_preferred_anterior" | "waist_preferred_posterior" | "l_rib10" | "l_thelion" | "r_rib10" | "r_thelion" | "l_asis" | "l_iliocristale" | "l_psis" | "r_asis" | "r_iliocristale" | "r_psis" | "crotch" | "l_femoral_lateral_epicondyle" | "l_femoral_medial_epicondyle" | "l_suprapatella" | "l_trochanterion" | "r_femoral_lateral_epicondyle" | "r_femoral_medial_epicondyle" | "r_suprapatella" | "r_trochanterion" | "l_tibiale" | "l_medial_malleolus" | "l_lateral_malleolus" | "l_sphyrion" | "r_tibiale" | "r_medial_malleolus" | "r_lateral_malleolus" | "r_sphyrion" | "l_metatarsal_phalanx_1" | "l_metatarsal_phalanx_5" | "l_dactylion" | "l_calcaneus_posterior" | "r_metatarsal_phalanx_1" | "r_metatarsal_phalanx_5" | "r_dactylion" | "r_calcaneus_posterior" | "l_humeral_lateral_epicondyle" | "l_humeral_medial_epicondyle" | "l_olecranon" | "r_humeral_lateral_epicondyle" | "r_humeral_medial_epicondyle" | "r_olecranon" | "l_radiale" | "l_ulnar_styloid" | "l_radial_styloid" | "r_radiale" | "r_ulnar_styloid" | "r_radial_styloid" | "l_metacarpal_phalanx_2" | "l_metacarpal_phalanx_3" | "l_metacarpal_phalanx_5" | "r_metacarpal_phalanx_2" | "r_metacarpal_phalanx_3" | "r_metacarpal_phalanx_5" | "nuchale" | "l_neck_base" | "r_neck_base" | "navel" | "l_ectocanthus" | "r_ectocanthus" | "menton" | "mesosternale" | "opisthocranion" | "l_knee_crease" | "r_knee_crease" | "rear_center_midsagittal_plane" | "buttocks_standing_wall_contact_point" | "l_chest_midsagittal_plane" | "r_chest_midsagittal_plane" | "l_bideltoid" | "r_bideltoid" | "l_carpal_distal_phalanx_1" | "l_carpal_distal_phalanx_2" | "l_carpal_distal_phalanx_3" | "l_carpal_distal_phalanx_4" | "l_carpal_distal_phalanx_5" | "r_carpal_distal_phalanx_1" | "r_carpal_distal_phalanx_2" | "r_carpal_distal_phalanx_3" | "r_carpal_distal_phalanx_4" | "r_carpal_distal_phalanx_5" | "l_tarsal_distal_phalanx_1" | "l_tarsal_distal_phalanx_2" | "l_tarsal_distal_phalanx_3" | "l_tarsal_distal_phalanx_4" | "l_tarsal_distal_phalanx_5" | "r_tarsal_distal_phalanx_1" | "r_tarsal_distal_phalanx_2" | "r_tarsal_distal_phalanx_3" | "r_tarsal_distal_phalanx_4" | "r_tarsal_distal_phalanx_5";
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Orientation of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Position of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** ImageCubeMapTexture is a texture node that defines a cubic environment map source as a single file format that contains multiple images, one for each side. */
interface ImageCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * Location and filename of image.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** ImageTexture maps a 2D-image file onto a geometric shape. */
interface ImageTextureProxy extends X3DTexture2DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * Location and filename of image.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** ImageTexture3D defines a 3D image-based texture map by specifying a single image file that contains complete 3D data. */
interface ImageTexture3DProxy extends X3DTexture3DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatR: boolean;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * Location and filename of image.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** undefined */
interface ImageTextureAtlasProxy extends X3DTexture3DNodeProxy, X3DUrlObjectProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   numberOfSlices: number;
   /**
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   slicesOverX: number;
   /**
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   slicesOverY: number;
}

/** IndexedFaceSet defines polygons using index lists corresponding to vertex coordinates. */
interface IndexedFaceSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   colorIndex: MFInt32;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * The convex field is a hint to renderers whether all polygons in a shape are convex (true), or possibly concave (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   convex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   coordIndex: MFInt32;
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   creaseAngle: number;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * normalIndex values define the order in which normal vectors are applied to polygons (or vertices).
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   normalIndex: MFInt32;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_colorIndex: MFInt32;
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_coordIndex: MFInt32;
   /**
   * normalIndex values define the order in which normal vectors are applied to polygons (or vertices).
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_normalIndex: MFInt32;
   /**
   * List of texture-coordinate indices mapping attached texture to corresponding coordinates.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_texCoordIndex: MFInt32;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
   /**
   * List of texture-coordinate indices mapping attached texture to corresponding coordinates.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   texCoordIndex: MFInt32;
}

/** IndexedLineSet defines polyline segments using index lists corresponding to vertex coordinates. */
interface IndexedLineSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   colorIndex: MFInt32;
   /**
   * Whether Color node color values are applied to each point vertex (true) or per polyline (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   coordIndex: MFInt32;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_colorIndex: MFInt32;
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polyline.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_coordIndex: MFInt32;
}

/** IndexedQuadSet is a geometry node that defines quadrilaterals. */
interface IndexedQuadSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * index values provide order in which coordinates are applied.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   index: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * index values provide order in which coordinates are applied.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_index: MFInt32;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** IndexedTriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * index list specifies triangles by connecting Coordinate vertices, each individual fan separated by -1 sentinel value.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   index: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * index list specifies triangles by connecting Coordinate vertices, each individual fan separated by -1 sentinel value.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_index: MFInt32;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** IndexedTriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * index list specifies triangles by connecting Coordinate vertices.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   index: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * index list specifies triangles by connecting Coordinate vertices.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_index: MFInt32;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** IndexedTriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * index list specifies triangles by connecting Coordinate vertices for each individual strip, separated by -1 sentinel values.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   index: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * index list specifies triangles by connecting Coordinate vertices for each individual strip, separated by -1 sentinel values.
   *
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_index: MFInt32;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** Inline can load another X3D or VRML model into the current scene via url. */
interface InlineProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * The global field controls potential external scoping effects of lights found within an Inline scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Address of X3D world to load Inline with current scene, retrieved either from local system or an online address.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** IntegerSequencer generates periodic discrete integer values. */
interface IntegerSequencerProxy extends X3DSequencerNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear sequencing, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   keyValue: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Send next output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   next: boolean;
   /**
   * Send previous output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   previous: boolean;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Single intermittent output value determined by current key time and corresponding keyValue entry.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly value_changed: number;
}

/** IntegerTrigger converts set_boolean true input events to an integer value (for example, useful when animating whichChoice in a Switch node). */
interface IntegerTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * integerKey is value for output when triggered.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   integerKey: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If input event set_boolean is true, trigger output of integer value.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_boolean: boolean;
   /**
   * triggerValue provides integer event output matching integerKey when true set_boolean received.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly triggerValue: number;
}

/** IsoSurfaceVolumeData displays one or more surfaces extracted from a voxel dataset. */
interface IsoSurfaceVolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * If contourStepSize is non-zero, also render all isosurfaces that are multiples of that step size from initial surface value.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   contourStepSize: number;
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   dimensions: SFVec3f;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides explicit per-voxel gradient direction information for determining surface boundaries, rather than having it implicitly calculated by the implementation.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   gradients: X3DTexture3DNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Multiple contained X3DVolumeRenderStyleNode nodes corresponding to each isosurface that define specific rendering technique for this volumetric object.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   renderStyle: MFNode <X3DVolumeRenderStyleNodeProxy>;
   /**
   * Threshold for gradient magnitude for voxel inolusion in isosurface.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceTolerance: number;
   /**
   * If surfaceValues has one value defined, render corresponding isosurface plus any isosurfaces based on contourStepSize.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   surfaceValues: MFFloat;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   voxels: X3DTexture3DNodeProxy | null;
}

/** KeySensor generates events as the user presses keys on the keyboard. */
interface KeySensorProxy extends X3DKeyDeviceSensorNodeProxy
{
   /**
   * action key press gives following values: HOME=000 END=1001 PGUP=1002 PGDN=1003 UP=1004 DOWN=1005 LEFT=1006 RIGHT=1007 F1.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly actionKeyPress: number;
   /**
   * action key release gives following values: HOME=000 END=1001 PGUP=1002 PGDN=1003 UP=1004 DOWN=1005 LEFT=1006 RIGHT=1007 F1.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly actionKeyRelease: number;
   /**
   * altKey generates true event when pressed, false event when released.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly altKey: boolean;
   /**
   * controlKey generates true event when pressed, false event when released.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly controlKey: boolean;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Events generated when user presses character-producing keys on keyboard produces integer UTF-8 character values.
   *
   * This field is of access type 'outputOnly' and type SFString.
   */
   readonly keyPress: string;
   /**
   * Events generated when user releases character-producing keys on keyboard produces integer UTF-8 character values.
   *
   * This field is of access type 'outputOnly' and type SFString.
   */
   readonly keyRelease: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * shiftKey generates true event when pressed, false event when released.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly shiftKey: boolean;
}

/** Layer contains a list of children nodes that define the contents of the layer. */
interface LayerProxy extends X3DLayerNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Nodes making up this layer.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * pickable determines whether pick traversal is performed for this layer.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   pickable: boolean;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * The viewport field is a single Viewport node that constrains layer output to a sub-region of the render surface.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   viewport: X3DViewportNodeProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** LayerSet defines a list of layers and a rendering order. */
interface LayerSetProxy extends X3DNodeProxy
{
   /**
   * activeLayer field specifies the layer in which navigation takes place.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   activeLayer: number;
   /**
   * The layers list defines a list of Layer nodes that contain the constituent parts of the scene.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   layers: MFNode <X3DLayerNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The order list defines the order in which layers are rendered.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   order: MFInt32;
}

/** Layout node is used as layout field of LayoutLayer and LayoutGroup nodes. */
interface LayoutProxy extends X3DLayoutNodeProxy
{
   /**
   * The align field values align the sized rectangle to an edge or center of the parent rectangle.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   align: MFString <"LEFT" | "BOTTOM" | "CENTER" | "TOP" | "RIGHT">;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The values of the offset field are used to translate the location of this rectangle after the initial alignment.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   offset: MFFloat;
   /**
   * The offsetUnits field values are used to interprete the offset values.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   offsetUnits: MFString <"WORLD" | "FRACTION" | "PIXEL">;
   /**
   * The scaleMode field specifies how the scale of the parent is modified.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   scaleMode: MFString <"NONE" | "FRACTION" | "STRETCH" | "PIXEL">;
   /**
   * The two values in the size field define the width and height of the layout rectangle.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   size: MFFloat;
   /**
   * The sizeUnits field values are used to interprete the offset values.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   sizeUnits: MFString <"WORLD" | "FRACTION" | "PIXEL">;
}

/** LayoutGroup is a Grouping node that can contain most nodes, whose children are related by a common layout within a parent layout. */
interface LayoutGroupProxy extends X3DNodeProxy, X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   layout: X3DLayoutNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * The content of the LayoutGroup is clipped by the specified viewport.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   viewport: X3DViewportNodeProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** LayoutLayer is a Grouping node that can contain most nodes. */
interface LayoutLayerProxy extends X3DLayerNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   layout: X3DLayoutNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * pickable determines whether pick traversal is performed for this layer.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   pickable: boolean;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * The content of the LayoutGroup is clipped by the specified viewport.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   viewport: X3DViewportNodeProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** LinePickSensor uses one or more pickingGeometry line segments to compute intersections with pickTarget shapes. */
interface LinePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   intersectionType: "BOUNDS" | "GEOMETRY";
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * defines whether the intersection test (i.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   matchCriterion: "MATCH_ANY" | "MATCH_EVERY" | "MATCH_ONLY_ONE";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>;
   /**
   * Output event containing surface normal vectors computed by the picking intersection computations.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly pickedNormal: MFVec3f;
   /**
   * Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly pickedPoint: MFVec3f;
   /**
   * Output event containing 3D texture coordinates of surfaces computed by the picking intersection computations.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly pickedTextureCoordinate: MFVec3f;
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pickingGeometry: X3DGeometryNodeProxy | null;
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>;
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   sortOrder: "ANY" | "CLOSEST" | "ALL" | "ALL_SORTED";
}

/** LineProperties allows precise fine-grained control over the rendering style of lines and edges for associated geometry nodes inside the same Shape. */
interface LinePropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Whether or not LineProperties are applied to associated geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   applied: boolean;
   /**
   * linetype selects a line pattern, with solid default if defined value isn't supported.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   linetype: number;
   /**
   * linewidthScaleFactor is a scale factor multiplied by browser-dependent nominal linewidth, mapped to nearest available line width.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   linewidthScaleFactor: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** LineSet is a geometry node that can contain a Coordinate|CoordinateDouble node and optionally a Color|ColorRGBA node. */
interface LineSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * vertexCount describes how many vertices are used in each individual polyline segment from the Coordinate point values.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   vertexCount: MFInt32;
}

/** ListenerPointSource node represents position and orientation of a person listening to virtual sound in the audio scene, and provides single or multiple sound channels as output. */
interface ListenerPointSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * dopplerEnabled enables/disables whether real-time Doppler effects (due to relation motion between sources and listeners) are computed by browser between virtual sound sources and active listening locations, then applied to received frequency at active listening locations.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   dopplerEnabled: boolean;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * The interauralDistance field is.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   interauralDistance: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Rotation (axis, angle in radians) of listening point direction relative to default -Z axis direction in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * If trackCurrentView field is true then position and orientation match avatar's (user's) current view.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   trackCurrentView: boolean;
}

/** LoadSensor generates events as watchList child nodes are either loaded or fail to load. */
interface LoadSensorProxy extends X3DNetworkSensorNodeProxy
{
   /**
   * The children field monitors one or more USE nodes that contain a valid url field.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DUrlObjectProxy>;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * isActive true/false events are sent when sensing starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Notify when all watchList child nodes are loaded, or at least one has failed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isLoaded: boolean;
   /**
   * Time of successful load complete, not sent on failure.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly loadTime: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Sends 0.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly progress: number;
   /**
   * Time in seconds of maximum load duration prior to declaring failure.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   timeOut: number;
}

/** LocalFog simulates atmospheric effects by blending distant objects with fog color. */
interface LocalFogProxy extends X3DChildNodeProxy, X3DFogObjectProxy
{
   /**
   * Fog color.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   fogType: "LINEAR" | "EXPONENTIAL";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Distance in meters where objects are totally obscured by the fog, using local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   visibilityRange: number;
}

/** LOD (Level Of Detail) uses camera-to-object distance to switch among contained child levels. */
interface LODProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Viewpoint distance-measurement offset from origin of local coordinate system, used for LOD node distance calculations.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Whether to perform every range-based transition, regardless of browser optimizations that might otherwise occur.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   forceTransitions: boolean;
   /**
   * Output event that reports current level of LOD children whenever switching occurs.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly level_changed: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Specifies ideal distances at which to switch between levels.
   *
   * This field is of access type 'initializeOnly' and type MFFloat.
   */
   range: MFFloat;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Material specifies surface rendering properties for associated geometry nodes. */
interface MaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * When applying ambientIntensity for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   ambientTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   ambientTextureMapping: string;
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   diffuseColor: SFColor;
   /**
   * When applying diffuseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   diffuseTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   diffuseTextureMapping: string;
   /**
   * how much glowing light is emitted from this object.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   emissiveColor: SFColor;
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   emissiveTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   emissiveTextureMapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   normalScale: number;
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normalTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   normalTextureMapping: string;
   /**
   * occlusionStrength indicates areas of indirect lighting, typically called ambient occlusion.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   occlusionStrength: number;
   /**
   * When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   occlusionTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   occlusionTextureMapping: string;
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shininess: number;
   /**
   * When applying shininess for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   shininessTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   shininessTextureMapping: string;
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   specularColor: SFColor;
   /**
   * When applying specularColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   specularTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   specularTextureMapping: string;
   /**
   * how "clear" an object is: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** Matrix3VertexAttribute defines a set of per-vertex 3x3 matrix attributes. */
interface Matrix3VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   name: string;
   /**
   * value specifies an arbitrary collection of matrix values that will be passed to the shader as per-vertex information.
   *
   * This field is of access type 'inputOutput' and type MFMatrix3f.
   */
   value: MFMatrix3f;
}

/** Matrix4VertexAttribute defines a set of per-vertex 4x4 matrix attributes. */
interface Matrix4VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   name: string;
   /**
   * value specifies an arbitrary collection of matrix values that will be passed to the shader as per-vertex information.
   *
   * This field is of access type 'inputOutput' and type MFMatrix4f.
   */
   value: MFMatrix4f;
}

/** The metadata provided by this node is contained in the Boolean values of the value field. */
interface MetadataBooleanProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * This field is of access type 'inputOutput' and type MFBool.
   */
   value: MFBool;
}

/** The metadata provided by this node is contained in the double-precision floating point numbers of the value field. */
interface MetadataDoubleProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   value: MFDouble;
}

/** The metadata provided by this node is contained in the single-precision floating point numbers of the value field. */
interface MetadataFloatProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   value: MFFloat;
}

/** The metadata provided by this node is contained in the integer numbers of the value field. */
interface MetadataIntegerProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   value: MFInt32;
}

/** The metadata provided by this node is contained in the metadata nodes of the value field. */
interface MetadataSetProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value field provides a list of X3DMetadataObject nodes whose meaning is determined by the name field.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   value: MFNode <X3DMetadataObjectProxy>;
}

/** The metadata provided by this node is contained in the strings of the value field. */
interface MetadataStringProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   value: MFString;
}

/** MicrophoneSource captures input from a physical microphone in the real world. */
interface MicrophoneSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mediaDeviceID: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
}

/** MotorJoint drives relative angular velocities between body1 and body2 within a common reference frame. */
interface MotorJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * autoCalc controls whether user manually provides individual angle rotations each frame (false) or if angle values are automatically calculated by motor implementations (true).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   autoCalc: boolean;
   /**
   * axis1Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis1Angle: number;
   /**
   * axis1Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis1Torque: number;
   /**
   * axis2Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis2Angle: number;
   /**
   * axis2Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis2Torque: number;
   /**
   * axis3Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis3Angle: number;
   /**
   * axis3Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   axis3Torque: number;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * enabledAxes indicates which motor axes are active.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   enabledAxes: number;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * motor1Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor1Angle: number;
   /**
   * motor1AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor1AngleRate: number;
   /**
   * motor1Axis defines axis vector of corresponding motor axis.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   motor1Axis: SFVec3f;
   /**
   * motor2Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor2Angle: number;
   /**
   * motor2AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor2AngleRate: number;
   /**
   * motor2Axis defines axis vector of corresponding motor axis.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   motor2Axis: SFVec3f;
   /**
   * motor3Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor3Angle: number;
   /**
   * motor3AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly motor3AngleRate: number;
   /**
   * motor3Axis defines axis vector of corresponding motor axis.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   motor3Axis: SFVec3f;
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1Bounce: number;
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1ErrorCorrection: number;
   /**
   * stop2Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop2Bounce: number;
   /**
   * stop2ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop2ErrorCorrection: number;
   /**
   * stop3Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop3Bounce: number;
   /**
   * stop3ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop3ErrorCorrection: number;
}

/** MovieTexture applies a 2D movie image to surface geometry, or provides audio for a Sound node. */
interface MovieTextureProxy extends X3DSoundSourceNodeProxy, X3DTexture2DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * or -1.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly duration_changed: number;
   /**
   * Current elapsed time since MovieTexture activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when MovieTexture is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   loop: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and MovieTexture becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * Multiplier for the rate at which sampled sound is played.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pitch: number;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and MovieTexture becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Factor for how fast the movie (or soundtrack) is played.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
   /**
   * Location and filename of movie file or stream.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** MultiTexture applies several individual textures to a single geometry node, enabling a variety of visual effects that include light mapping and environment mapping. */
interface MultiTextureProxy extends X3DTextureNodeProxy
{
   /**
   * The alpha field defines the alpha (1-transparency) base value for mode operations.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   alpha: number;
   /**
   * The color field defines the RGB base values for mode operations.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * function operators COMPLEMENT or ALPHAREPLICATE can be applied after the mode blending operation.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   function: MFString <"COMPLEMENT" | "ALPHAREPLICATE" | "">;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * mode field indicates the type of blending operation, both for color and for alpha channel.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   mode: MFString <"ADD" | "ADDSIGNED" | "ADDSIGNED2X" | "ADDSMOOTH" | "BLENDCURRENTALPHA" | "BLENDDIFFUSEALPHA" | "BLENDFACTORALPHA" | "BLENDTEXTUREALPHA" | "DOTPRODUCT3" | "MODULATE" | "MODULATE2X" | "MODULATE4X" | "MODULATEALPHA_ADDCOLOR" | "MODULATEINVALPHA_ADDCOLOR" | "MODULATEINVCOLOR_ADDALPHA" | "OFF" | "REPLACE" | "SELECTARG1" | "SELECTARG2" | "SUBTRACT">;
   /**
   * source field determines whether each image source is treated as DIFFUSE, SPECULAR or a multiplicative FACTOR.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   source: MFString <"DIFFUSE" | "FACTOR" | "SPECULAR" | "">;
   /**
   * Contained texture nodes (ImageTexture, MovieTexture, PixelTexture) that map image(s) to surface geometry, defining each of the different texture channels.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   texture: MFNode <X3DSingleTextureNodeProxy>;
}

/** MultiTextureCoordinate contains multiple TextureCoordinate or TextureCoordinateGenerator nodes, for use by a parent polygonal geometry node such as IndexedFaceSet or a Triangle* node. */
interface MultiTextureCoordinateProxy extends X3DTextureCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Zero or more contained TextureCoordinate or TextureCoordinateGenerator nodes that specify texture coordinates for the different texture channels, used for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   texCoord: MFNode <X3DSingleTextureCoordinateNodeProxy>;
}

/** MultiTextureTransform contains multiple TextureTransform nodes, each provided for use by corresponding ImageTexture MovieTexture or PixelTexture nodes within a sibling MultiTexture node. */
interface MultiTextureTransformProxy extends X3DTextureTransformNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Zero or more contained TextureTransform nodes, for each of the different texture channels, that define 2D transformation applied to texture coordinates.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   textureTransform: MFNode <X3DSingleTextureTransformNodeProxy>;
}

/** NavigationInfo describes the user's viewing model, user navigation-interaction modalities, and also dimensional characteristics of the user's (typically invisible) avatar. */
interface NavigationInfoProxy extends X3DBindableNodeProxy
{
   /**
   * avatarSize triplet values define three separate parameters: (a) collisionDistance between user and geometry, i.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   avatarSize: MFFloat;
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * Enable/disable directional light that always points in the direction the user is looking.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   headlight: boolean;
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Receiving event set_bind=true activates and binds this node at the top of the binding stack.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * Default rate at which viewer travels through scene, meters/second.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Event signaling viewpoint transition complete.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly transitionComplete: boolean;
   /**
   * transitionTime defines the expected duration of viewpoint transition in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   transitionTime: number;
   /**
   * Camera transition between viewpoints.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   transitionType: MFString <"TELEPORT" | "LINEAR" | "ANIMATE">;
   /**
   * Enter one or more quoted SFString values: "EXAMINE" "WALK" "FLY" "LOOKAT" "EXPLORE" "ANY" "NONE".
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   type: MFString <"ANY" | "WALK" | "EXAMINE" | "FLY" | "LOOKAT" | "NONE" | "EXPLORE" | "PLANE" | "PLANE_create3000.github.io">;
   /**
   * Geometry beyond the visibilityLimit may not be rendered (far clipping plane of the view frustrum).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   visibilityLimit: number;
}

/** Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface NormalProxy extends X3DNormalNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set of unit-length normal vectors, corresponding to indexed polygons or vertices.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   vector: MFVec3f;
}

/** NormalInterpolator generates a series of normal (perpendicular) 3-tuple SFVec3f values. */
interface NormalInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   keyValue: MFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly value_changed: MFVec3f;
}

/** NurbsCurve is a 3D curve analogous to NurbsPatchSurface. */
interface NurbsCurveProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   closed: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   knot: MFDouble;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   tessellation: number;
   /**
   * Vector assigning relative weight value to each control point.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsCurve2D defines a trimming segment that is part of a trimming contour in the u-v domain of a surface. */
interface NurbsCurve2DProxy extends X3DNurbsControlCurveNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   closed: boolean;
   /**
   * controlPoint defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.
   *
   * This field is of access type 'inputOutput' and type MFVec2d.
   */
   controlPoint: MFVec2d;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   knot: MFDouble;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   tessellation: number;
   /**
   * Vector assigning relative weight value to each control point.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsOrientationInterpolator describes a 3D NURBS curve and outputs interpolated orientation values. */
interface NurbsOrientationInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   knot: MFDouble;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   order: number;
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly value_changed: SFRotation;
   /**
   * Output values for computational interpolation, each corresponding to knots.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsPatchSurface defines a contiguous 3D Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsPatchSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained NurbsTextureCoordinate, TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy | null;
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   uClosed: boolean;
   /**
   * Number of control points in u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uDimension: number;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   uKnot: MFDouble;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uOrder: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   uTessellation: number;
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   vClosed: boolean;
   /**
   * Number of control points in v dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vDimension: number;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   vKnot: MFDouble;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vOrder: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   vTessellation: number;
   /**
   * Vector assigning relative weight value to each control point.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsPositionInterpolator describes a 3D NURBS curve and outputs interpolated position values. */
interface NurbsPositionInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   knot: MFDouble;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   order: number;
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsSet collects a set of NurbsSurface nodes into a common group and treats NurbsSurface set as a unit during tessellation, thereby enforcing tessellation continuity along borders. */
interface NurbsSetProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addGeometry: MFNode <X3DParametricGeometryNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * The children form a closed loop with first point of first child repeated as last point of last child, and the last point of a segment repeated as first point of the consecutive one.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   geometry: MFNode <X3DParametricGeometryNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeGeometry: MFNode <X3DParametricGeometryNodeProxy>;
   /**
   * scale for surface tessellation in children NurbsSurface nodes.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tessellationScale: number;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** NurbsSurfaceInterpolator describes a 3D NURBS curve and outputs interpolated position and normal values. */
interface NurbsSurfaceInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly normal_changed: SFVec3f;
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly position_changed: SFVec3f;
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * This field is of access type 'inputOnly' and type SFVec2f.
   */
   set_fraction: SFVec2f;
   /**
   * Number of control points in u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   uKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uOrder: number;
   /**
   * Number of control points in v dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   vKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vOrder: number;
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsSweptSurface uses a trajectoryCurve path to describe a generalized surface that is swept by a crossSectionCurve. */
interface NurbsSweptSurfaceProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * defines cross-section of the surface traced about the trajectoryCurve axis.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   crossSectionCurve: X3DNurbsControlCurveNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * describes the center-line path using a NurbsCurve node, oriented so that it is defined counterclockwise when looking down the −Y axis, thus defining a concept of inside and outside.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   trajectoryCurve: NurbsCurveProxy | null;
}

/** NurbsSwungSurface contains a profileCurve and a trajectoryCurve [X3DNurbsControlCurveNode]. */
interface NurbsSwungSurfaceProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * 2D curve in the yz-plane that describes the cross-sectional shape of the object.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   profileCurve: X3DNurbsControlCurveNodeProxy | null;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * 2D curve in the xz-plane that describes path over which to trace the cross-section.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   trajectoryCurve: X3DNurbsControlCurveNodeProxy | null;
}

/** NurbsTextureCoordinate describes a 3D NURBS surface in the parametric domain of its surface host, specifying mapping of texture onto the surface. */
interface NurbsTextureCoordinateProxy extends X3DNodeProxy
{
   /**
   * controlPoint defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   controlPoint: MFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Number of control points in u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   uKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uOrder: number;
   /**
   * Number of control points in v dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   vKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vOrder: number;
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** NurbsTrimmedSurface generates texture coordinates from a Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsTrimmedSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addTrimmingContour: MFNode <Contour2DProxy>;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeTrimmingContour: MFNode <Contour2DProxy>;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained NurbsTextureCoordinate, TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy | null;
   /**
   * A set of Contour2D nodes are used as trimming loops.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   trimmingContour: MFNode <Contour2DProxy>;
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   uClosed: boolean;
   /**
   * Number of control points in u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   uKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uOrder: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   uTessellation: number;
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   vClosed: boolean;
   /**
   * Number of control points in v dimension.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vDimension: number;
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   vKnot: MFDouble;
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vOrder: number;
   /**
   * hint for surface tessellation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   vTessellation: number;
   /**
   * Vector assigning relative weight value to each control point.
   *
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** OpacityMapVolumeStyle specifies that volumetric data is rendered using opacity mapped to a transfer function texture. */
interface OpacityMapVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The transferFunction field holds a single texture representation in either two or three dimensions that maps the voxel data values to a specific colour output.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   transferFunction: X3DTexture2DNodeProxy | X3DTexture3DNodeProxy | null;
}

/** OrientationChaser generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFRotation.
   */
   initialDestination: SFRotation;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFRotation.
   */
   initialValue: SFRotation;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFRotation.
   */
   set_destination: SFRotation;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFRotation.
   */
   set_value: SFRotation;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly value_changed: SFRotation;
}

/** OrientationDamper generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFRotation.
   */
   initialDestination: SFRotation;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFRotation.
   */
   initialValue: SFRotation;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFRotation.
   */
   set_destination: SFRotation;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFRotation.
   */
   set_value: SFRotation;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly value_changed: SFRotation;
}

/** OrientationInterpolator generates a series of 4-tuple axis-angle SFRotation values. */
interface OrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFRotation.
   */
   keyValue: MFRotation;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly value_changed: SFRotation;
}

/** OrthoViewpoint provides an orthographic perspective-free view of a scene from a specific location and direction. */
interface OrthoViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   centerOfRotation: SFVec3f;
   /**
   * Text description or navigation hint to describe the significance of this model Viewpoint.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * Minimum and maximum extents of view in units of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   fieldOfView: MFFloat;
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   jump: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   navigationInfo: NavigationInfoProxy | null;
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   retainUserOffsets: boolean;
   /**
   * Sending event set_bind=true makes this node active.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   viewAll: boolean;
}

/** OscillatorSource node represents an audio source generating a periodic waveform, providing a constant tone. */
interface OscillatorSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * The detune ffield is an a-rate AudioParam representing detuning of oscillation in cents (though the AudioParam returned is read-only, the value it represents is not).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   detune: number;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The frequency of oscillation in hertz.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   frequency: number;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
}

/** PackagedShader can contain field declarations, but no CDATA section of plain-text source code. */
interface PackagedShaderProxy extends X3DShaderNodeProxy, X3DUrlObjectProxy, X3DProgrammableShaderObjectProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   activate: boolean;
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Include a field statement for each field declaration in the PackagedShader node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   field: MFNode <fieldProxy>;
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isSelected: boolean;
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isValid: boolean;
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   language: "Cg" | "GLSL" | "HLSL";
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * url points to a shader source-code file that may contain a number of shaders and combined effects.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** ParticleSystem specifies a complete particle system. */
interface ParticleSystemProxy extends X3DShapeNodeProxy
{
   /**
   * The appearance field holds an Appearance node that is used for the geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   appearance: X3DAppearanceNodeProxy | null;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * The castShadow field defines whether this Shape casts shadows as produced by lighting nodes.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   castShadow: boolean;
   /**
   * The color field contains Color|ColorRGBA nodes as a series of color values to be used at the given colorKey points in time.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Array of time intervals in seconds, corresponding to particle lifetime, that are used to interpolate color array values.
   *
   * This field is of access type 'initializeOnly' and type MFFloat.
   */
   colorKey: MFFloat;
   /**
   * Enables/disables creation of new particles, while any existing particles remain in existence and continue to animate until the end of their lifetimes.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   createParticles: boolean;
   /**
   * The emitter field specifies the type of emitter geometry and properties that the particles are given for their initial positions.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   emitter: X3DParticleEmitterNodeProxy | null;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Single contained geometry node provides geometry used for each particle when geometryType=GEOMETRY.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry: X3DGeometryNodeProxy | null;
   /**
   * specifies type of geometry used to represent individual particles.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   geometryType: "LINE" | "POINT" | "QUAD" | "SPRITE" | "TRIANGLE" | "GEOMETRY";
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * TODO not properly defined in X3D spedification.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   lifetimeVariation: number;
   /**
   * Maximum number of particles to be generated at one time (subject to player limitations).
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   maxParticles: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * TODO not properly defined in X3D spedification.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   particleLifetime: number;
   /**
   * particleSize describes width and height dimensions for each particle in length base units (default is meters).
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   particleSize: SFVec2f;
   /**
   * After being created, the individual particles are then manipulated according to the physics model(s) specified in the physics field.
   *
   * This field is of access type 'initializeOnly' and type MFNode.
   */
   physics: MFNode <X3DParticlePhysicsModelNodeProxy>;
   /**
   * texture coordinates of the provided texture(s) in the Appearance node, over time.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   texCoord: TextureCoordinateProxy | TextureCoordinateGeneratorProxy | null;
   /**
   * Array of time intervals in seconds, corresponding to particle lifetime, that are used to sequence texCoord array values.
   *
   * This field is of access type 'initializeOnly' and type MFFloat.
   */
   texCoordKey: MFFloat;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** PeriodicWave defines a periodic waveform that can be used to shape the output of an Oscillator. */
interface PeriodicWaveProxy extends X3DSoundNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * imaginary coefficients for defining a waveform.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   optionsImag: MFFloat;
   /**
   * real coefficients for defining a waveform.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   optionsReal: MFFloat;
   /**
   * The type field specifies shape of waveform to play, which can be one of several provided values or else 'custom' to indicate that real and imaginary coefficient arrays define a custom waveform.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   type: "SINE" | "SQUARE" | "SAWTOOTH" | "TRIANGLE" | "CUSTOM";
}

/** PhysicalMaterial specifies surface rendering properties for associated geometry nodes. */
interface PhysicalMaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * similar to diffuseColor, TODO define more precisely.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   baseColor: SFColor;
   /**
   * When applying baseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   baseTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   baseTextureMapping: string;
   /**
   * how much glowing light is emitted from this object.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   emissiveColor: SFColor;
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   emissiveTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   emissiveTextureMapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * metallic is a PBR parameter (TODO elaborate).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   metallic: number;
   /**
   * When applying metallic for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metallicRoughnessTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   metallicRoughnessTextureMapping: string;
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   normalScale: number;
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normalTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   normalTextureMapping: string;
   /**
   * occlusionStrength indicates areas of indirect lighting, typically called ambient occlusion.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   occlusionStrength: number;
   /**
   * When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   occlusionTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   occlusionTextureMapping: string;
   /**
   * roughness is a PBR parameter (TODO elaborate).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   roughness: number;
   /**
   * how "clear" an object is: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** PickableGroup is a Grouping node that can contain most nodes. */
interface PickableGroupProxy extends X3DGroupingNodeProxy, X3DPickableObjectProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * The pickable field determines whether pick traversal is performed on this node or its children.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   pickable: boolean;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** PixelTexture creates a 2D-image texture map using a numeric array of pixel values. */
interface PixelTextureProxy extends X3DTexture2DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Defines image: width, height, number_of_components per each pixel value, and list of pixel_values.
   *
   * This field is of access type 'inputOutput' and type SFImage.
   */
   image: SFImage;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
}

/** PixelTexture3D defines a 3D image-based texture map as an explicit array of pixel values (image field). */
interface PixelTexture3DProxy extends X3DTexture3DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * image describes raw data for this 3D texture: number of components to the image [0,4], width, height and depth of the texture, followed by (width x height x depth) pixel values.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   image: MFInt32;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatR: boolean;
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
}

/** PlaneSensor converts pointing device motion into 2D translation parallel to the local Z=0 plane. */
interface PlaneSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * Determines whether previous offset values are remembered/accumulated.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoOffset: boolean;
   /**
   * axisRotation determines local sensor coordinate system by rotating the local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   axisRotation: SFRotation;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * minPosition and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition < minPosition means no clamping.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   maxPosition: SFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minPosition and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition < minPosition means no clamping.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   minPosition: SFVec2f;
   /**
   * Sends event and remembers last value sensed.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   offset: SFVec3f;
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly trackPoint_changed: SFVec3f;
   /**
   * translation_changed events equal sum of relative translation change plus offset value.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly translation_changed: SFVec3f;
}

/** PointEmitter generates particles from a specific point in space using the specified direction and speed. */
interface PointEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Initial direction from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Point from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface PointLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   attenuation: SFVec3f;
   /**
   * color of light, applied to colors of objects.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * Brightness of direct emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of light relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables this light source.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Maximum effective distance of light relative to local light position, affected by ancestor scaling.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   radius: number;
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
}

/** PointPickSensor tests one or more pickingGeometry points in space as lying inside the provided pickTarget geometry. */
interface PointPickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   intersectionType: "BOUNDS" | "GEOMETRY";
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * defines whether the intersection test (i.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   matchCriterion: "MATCH_ANY" | "MATCH_EVERY" | "MATCH_ONLY_ONE";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>;
   /**
   * Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFVec3f.
   */
   readonly pickedPoint: MFVec3f;
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pickingGeometry: X3DGeometryNodeProxy | null;
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>;
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   sortOrder: "ANY" | "CLOSEST" | "ALL" | "ALL_SORTED";
}

/** PointProperties allows precise fine-grained control over the rendering style of PointSet node points inside the same Shape. */
interface PointPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * attenuation array values [a, b, c] are set to default values if undefined.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   attenuation: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * pointSizeMaxValue is maximum allowed scaling factor on nominal browser point scaling.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pointSizeMaxValue: number;
   /**
   * pointSizeMinValue is minimum allowed scaling factor on nominal browser point scaling.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pointSizeMinValue: number;
   /**
   * Nominal rendered point size is a browser-dependent minimum renderable point size, which is then multiplied by an additional pointSizeScaleFactor (which is greater than or equal to 1).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pointSizeScaleFactor: number;
}

/** PointSet is a node that contains a set of colored 3D points, represented by contained Color|ColorRGBA and Coordinate|CoordinateDouble nodes. */
interface PointSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
}

/** Polyline2D is a geometry node that defines a connected set of vertices in a contiguous set of line segments in X-Y plane. */
interface Polyline2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Coordinates of vertices connected into contiguous Polyline2D.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   lineSegments: MFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** PolylineEmitter emits particles along a single polyline. */
interface PolylineEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Coordinates for the line along which particles are randomly generated.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * coordIndex indices are applied to contained Coordinate values in order to define randomly generated initial geometry of the particles.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   coordIndex: MFInt32;
   /**
   * Initial direction from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_coordIndex: MFInt32;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** Polypoint2D is a geometry node that defines a set of 2D points in X-Y plane. */
interface Polypoint2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * 2D coordinates of vertices.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   point: MFVec2f;
}

/** PositionChaser generates a series of position values that progressively change from initial value to destination value. */
interface PositionChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   initialDestination: SFVec3f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   initialValue: SFVec3f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec3f.
   */
   set_destination: SFVec3f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec3f.
   */
   set_value: SFVec3f;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
}

/** PositionChaser2D generates a series of 2D position values that progressively change from initial value to destination value. */
interface PositionChaser2DProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec2f.
   */
   initialDestination: SFVec2f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec2f.
   */
   initialValue: SFVec2f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec2f.
   */
   set_destination: SFVec2f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec2f.
   */
   set_value: SFVec2f;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly value_changed: SFVec2f;
}

/** PositionDamper generates a series of position values that progressively change from initial value to destination value. */
interface PositionDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   initialDestination: SFVec3f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   initialValue: SFVec3f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec3f.
   */
   set_destination: SFVec3f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec3f.
   */
   set_value: SFVec3f;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
}

/** PositionDamper2D generates a series of 2D floating-point values that progressively change from initial value to destination value. */
interface PositionDamper2DProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec2f.
   */
   initialDestination: SFVec2f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFVec2f.
   */
   initialValue: SFVec2f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec2f.
   */
   set_destination: SFVec2f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFVec2f.
   */
   set_value: SFVec2f;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly value_changed: SFVec2f;
}

/** PositionInterpolator generates a series of 3-tuple SFVec3f values. */
interface PositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   keyValue: MFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
}

/** PositionInterpolator2D generates a series of SFVec2f values. */
interface PositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   keyValue: MFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly value_changed: SFVec2f;
}

/** If a non-uniform scale is applied to the pick sensor, correct results may require level 3 support. */
interface PrimitivePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   intersectionType: "BOUNDS" | "GEOMETRY";
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * defines whether the intersection test (i.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   matchCriterion: "MATCH_ANY" | "MATCH_EVERY" | "MATCH_ONLY_ONE";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>;
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pickingGeometry: X3DGeometryNodeProxy | null;
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>;
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   sortOrder: "ANY" | "CLOSEST" | "ALL" | "ALL_SORTED";
}

/** ProgramShader contains no field declarations and no plain-text source code. */
interface ProgramShaderProxy extends X3DShaderNodeProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   activate: boolean;
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isSelected: boolean;
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isValid: boolean;
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   language: "Cg" | "GLSL" | "HLSL";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * ProgramShader contains zero or more ShaderProgram node instances.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   programs: MFNode <ShaderProgramProxy>;
}

/** ProjectionVolumeStyle uses voxel data to directly generate output color. */
interface ProjectionVolumeStyleProxy extends X3DVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Threshold value used when type=MIN (LMIP) or type=MAX (MIP).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensityThreshold: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If type=MAX then Maximum Intensity Projection (MIP) or Least MIP (LMIP) algorithm is used to generate output color.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   type: "MAX" | "MIN" | "AVERAGE";
}

/** ProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface ProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Position offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Sends changed centerOfRotation values, likely caused by user interaction.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly centerOfRotation_changed: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Time event generated when user's camera enters the box.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly enterTime: number;
   /**
   * Time event generated when user's camera exits the box.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly exitTime: number;
   /**
   * isActive true/false events are sent as viewer enters/exits Proximity box.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Sends rotation event relative to center.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly orientation_changed: SFRotation;
   /**
   * Sends translation event relative to center.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly position_changed: SFVec3f;
   /**
   * size of Proximity box around center location, oriented within local transformation frame.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
}

/** QuadSet is a geometry node that defines quadrilaterals. */
interface QuadSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** ReceiverPdu is a networked Protocol Data Unit (PDU) information node that transmits the state of radio frequency (RF) receivers modeled in a simulation. */
interface ReceiverPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'; Example: 224.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   address: string;
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   applicationID: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables the sensor node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * EntityID unique ID for entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityID: number;
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * confirm whether there has been a recent network update.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkReader: boolean;
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkWriter: boolean;
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isRtpHeaderHeard: boolean;
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isStandAlone: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Fallback server address if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   multicastRelayHost: string;
   /**
   * Fallback server port if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   multicastRelayPort: number;
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   networkMode: "standAlone" | "networkReader" | "networkWriter";
   /**
   * Multicast network port, for example: 3000.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   port: number;
   /**
   * Identifies a particular radio within a given entity.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioID: number;
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   readInterval: number;
   /**
   * receivedPower indicates radio frequency (RF) power received, in units of decibel-milliwatts (dBm), after applying any propagation loss and antenna gain.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   receivedPower: number;
   /**
   * receiverState indicates if receiver is currently idle or busy via one of these enumerated values: 0 = off, 1 = on but not receiving, or 2 = on and receiving.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   receiverState: number;
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   rtpHeaderExpected: boolean;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   siteID: number;
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly timestamp: number;
   /**
   * Simulation/exercise transmitterApplicationID is unique for transmitter application at that site.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   transmitterApplicationID: number;
   /**
   * Simulation/exercise transmitterEntityID is a unique ID for a single entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   transmitterEntityID: number;
   /**
   * Identifies a particular radio within a given entity.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   transmitterRadioID: number;
   /**
   * Simulation/exercise transmitterSiteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   transmitterSiteID: number;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   whichGeometry: number;
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   writeInterval: number;
}

/** Rectangle2D is a geometry node that defines a 2D rectangle in X-Y plane. */
interface Rectangle2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * 2D dimensions of Rectangle2D.
   *
   * This field is of access type 'initializeOnly' and type SFVec2f.
   */
   size: SFVec2f;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
}

/** RigidBody describes a collection of shapes with a mass distribution that is affected by the physics model. */
interface RigidBodyProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * angularDampingFactor automatically damps a portion of body motion over time.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   angularDampingFactor: number;
   /**
   * angularVelocity sets constant velocity value to object every frame, and reports updates by physics model.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   angularVelocity: SFVec3f;
   /**
   * autoDamp enables/disables angularDampingFactor and linearDampingFactor.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoDamp: boolean;
   /**
   * autoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoDisable: boolean;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * centerOfMass defines local center of mass for physics calculations.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   centerOfMass: SFVec3f;
   /**
   * disableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   disableAngularSpeed: number;
   /**
   * disableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   disableLinearSpeed: number;
   /**
   * disableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   disableTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * finiteRotationAxis specifies vector around which the object rotates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   finiteRotationAxis: SFVec3f;
   /**
   * fixed indicates whether body is able to move.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   fixed: boolean;
   /**
   * forces defines linear force values applied to the object every frame.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   forces: MFVec3f;
   /**
   * The geometry field is used to connect the body modelled by the physics engine implementation to the real geometry of the scene through the use of collidable nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   geometry: MFNode <X3DNBodyCollidableNodeProxy>;
   /**
   * inertia matrix defines a 3x2 inertia tensor matrix.
   *
   * This field is of access type 'inputOutput' and type SFMatrix3f.
   */
   inertia: SFMatrix3f;
   /**
   * linearDampingFactor automatically damps a portion of body motion over time.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   linearDampingFactor: number;
   /**
   * linearVelocity sets constant velocity value to object every frame, and reports updates by physics model.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   linearVelocity: SFVec3f;
   /**
   * mass of the body in kilograms.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * The massDensityModel field is used to describe the geometry type and dimensions used to calculate the mass density in the physics model.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   massDensityModel: SphereProxy | BoxProxy | ConeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * orientation sets body direction in world space, then reports physics updates.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * position sets body location in world space, then reports physics updates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * torques defines rotational force values applied to the object every frame.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   torques: MFVec3f;
   /**
   * useFiniteRotation enables/disables higher-resolution, higher-cost computational method for calculating rotations.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   useFiniteRotation: boolean;
   /**
   * useGlobalGravity indicates whether this particular body is influenced by parent RigidBodyCollection's gravity setting.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   useGlobalGravity: boolean;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** RigidBodyCollection represents a system of bodies that interact within a single physics model. */
interface RigidBodyCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * autoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoDisable: boolean;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Collection of top-level nodes that comprise a set of bodies evaluated as a single set of interactions.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   bodies: MFNode <RigidBodyProxy>;
   /**
   * The collider field associates a collision collection with this rigid body collection allowing seamless updates and integration without the need to use the X3D event model.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   collider: CollisionCollectionProxy | null;
   /**
   * constantForceMix modifies damping calculations by violating normal constraints while applying small, constant forces in those calculations.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   constantForceMix: number;
   /**
   * contactSurfaceThickness defines how far bodies may interpenetrate after a collision, allowing simulation of softer bodies that deform somewhat during collision.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   contactSurfaceThickness: number;
   /**
   * disableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   disableAngularSpeed: number;
   /**
   * disableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   disableLinearSpeed: number;
   /**
   * disableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   disableTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * errorCorrection describes how quickly intersection errors due to floating-point inaccuracies are resolved (0=no correction, 1=all corrected in single step).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   errorCorrection: number;
   /**
   * gravity indicates direction and strength of local gravity vector for this collection of bodies (units m/sec^2).
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   gravity: SFVec3f;
   /**
   * iterations controls number of iterations performed over collectioned joints and bodies during each evaluation.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   iterations: number;
   /**
   * The joints field is used to register all joints between bodies contained in this collection.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   joints: MFNode <X3DRigidJointNodeProxy>;
   /**
   * or -1, maxCorrectionSpeed.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxCorrectionSpeed: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * preferAccuracy provides hint for performance preference: higher accuracy or faster computational speed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   preferAccuracy: boolean;
   /**
   * set_contacts input field for Contact nodes provides per-frame information about contacts between bodies.
   *
   * This field is of access type 'inputOnly' and type MFNode.
   */
   set_contacts: MFNode <ContactProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** ScalarChaser generates a series of single floating-point values that progressively change from initial value to destination value. */
interface ScalarChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   initialDestination: number;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   initialValue: number;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_destination: number;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_value: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly value_changed: number;
}

/** ScalarDamper generates a series of floating-point values that progressively change from initial value to destination value. */
interface ScalarDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   initialDestination: number;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   initialValue: number;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_destination: number;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_value: number;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly value_changed: number;
}

/** ScalarInterpolator generates piecewise-linear SFFloat values. */
interface ScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   keyValue: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly value_changed: number;
}

/** ScreenFontStyle is an X3DFontStyleNode defines the size, family, justification, and other styles used within a screen layout. */
interface ScreenFontStyleProxy extends X3DFontStyleNodeProxy
{
   /**
   * Array of quoted font family names in preference order, browsers use the first supported family.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   family: MFString <"SANS" | "SERIF" | "TYPEWRITER">;
   /**
   * Whether text direction is horizontal (true) or vertical (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   horizontal: boolean;
   /**
   * The justify field determines horizontal and vertical alignment of text layout, relative to the origin of the object coordinate system.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   justify: MFString <"MIDDLE" | "BEGIN" | "END" | "FIRST">;
   /**
   * Language codes consist of a primary code and a (possibly empty) series of subcodes.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   language: string;
   /**
   * Whether text direction is left-to-right (true) or right-to-left (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   leftToRight: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * pointSize field specifies the size of text in points.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   pointSize: number;
   /**
   * Adjustment factor for line spacing between adjacent lines of text.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   spacing: number;
   /**
   * Pick one of four values for text style (PLAIN|BOLD|ITALIC|BOLDITALIC).
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   style: "PLAIN" | "BOLD" | "ITALIC" | "BOLDITALIC";
   /**
   * Whether text direction is top-to-bottom (true) or bottom-to-top (false).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   topToBottom: boolean;
}

/** ScreenGroup is a Grouping node that can contain most nodes. */
interface ScreenGroupProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Script contains author-programmed event behaviors for a scene. */
interface ScriptProxy extends X3DScriptNodeProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Set directOutput true if Script has field reference(s) of type SFNode/MFNode, and also uses direct access to modify attributes of a referenced node in the Scene.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   directOutput: boolean;
   /**
   * Include a field statement for each field declaration in this Script node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   field: MFNode <fieldProxy>;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If mustEvaluate false, then the X3D player may delay sending input events to Script until output events are needed.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   mustEvaluate: boolean;
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   sourceCode: string;
   /**
   * List of address links for runnable script files.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** SegmentedVolumeData displays a segmented voxel dataset with different RenderStyle nodes. */
interface SegmentedVolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   dimensions: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Multiple contained X3DVolumeRenderStyleNode nodes corresponding to each isosurface that define specific rendering technique for this volumetric object.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   renderStyle: MFNode <X3DVolumeRenderStyleNodeProxy>;
   /**
   * Array of boolean values that indicates whether to draw each segment, with indices corresponding to the segment identifier.
   *
   * This field is of access type 'inputOutput' and type MFBool.
   */
   segmentEnabled: MFBool;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) holds component texture that provides corresponding segment identifier.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   segmentIdentifiers: X3DTexture3DNodeProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   voxels: X3DTexture3DNodeProxy | null;
}

/** All fields fully supported except shadows supported with at least Phong shading at level 3. All fields fully supported with at least Phong shading and Henyey-Greenstein phase function, shadows fully supported at level 4. */
interface ShadedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Whether rendering calculates and applies shading effects to visual output.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   lighting: boolean;
   /**
   * Colour and opacity is determined based on whether a value has been specified for the material field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   material: X3DMaterialNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * define scattering model for implementations using global illumination (NONE or Henyey-Greenstein phase function).
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   phaseFunction: "Henyey-Greenstein" | "NONE";
   /**
   * Whether rendering calculates and applies shadows to visual output (using global illumination model).
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   surfaceNormals: X3DTexture3DNodeProxy | null;
}

/** ShaderPart can contain a CDATA section of plain-text source code. */
interface ShaderPartProxy extends X3DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   sourceCode: string;
   /**
   * type indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   type: "VERTEX" | "FRAGMENT";
   /**
   * Location and filename of shader.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** ShaderProgram can contain field declarations and a CDATA section of plain-text source code. */
interface ShaderProgramProxy extends X3DNodeProxy, X3DUrlObjectProxy, X3DProgrammableShaderObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Include a field statement for each field declaration in the ShaderProgram node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   field: MFNode <fieldProxy>;
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   sourceCode: string;
   /**
   * type indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   type: "VERTEX" | "FRAGMENT";
   /**
   * Location and filename of shader.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** Shape can appear under any grouping node. */
interface ShapeProxy extends X3DShapeNodeProxy
{
   /**
   * Single contained Appearance node that can specify visual attributes (such as material, texture, fillProperties and lineProperties) applied to corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   appearance: X3DAppearanceNodeProxy | null;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * castShadow defines whether this Shape casts shadows as produced by lighting nodes.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   castShadow: boolean;
   /**
   * Single contained geometry node that is rendered according to corresponding appearance.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry: X3DGeometryNodeProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** SignalPdu is a networked Protocol Data Unit (PDU) information node that communicates the transmission of voice, audio or other data modeled in a simulation. */
interface SignalPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   address: string;
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   applicationID: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Holds audio or digital data conveyed by the radio transmission.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   data: MFInt32;
   /**
   * number of bits of digital voice audio or digital data being sent in the Signal PDU.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   dataLength: number;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables the sensor node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * designates both Encoding Class and Encoding Type.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   encodingScheme: number;
   /**
   * EntityID unique ID for entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityID: number;
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * confirm whether there has been a recent network update.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkReader: boolean;
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkWriter: boolean;
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isRtpHeaderHeard: boolean;
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isStandAlone: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Fallback server address if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   multicastRelayHost: string;
   /**
   * Fallback server port if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   multicastRelayPort: number;
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   networkMode: "standAlone" | "networkReader" | "networkWriter";
   /**
   * Multicast network port, for example: 3000.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   port: number;
   /**
   * Identifies a particular radio within a given entity.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioID: number;
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   readInterval: number;
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   rtpHeaderExpected: boolean;
   /**
   * sampleRate gives either (1) sample rate in samples per second if Encoding Class is encoded audio, or (2) data rate in bits per second for data transmissions.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   sampleRate: number;
   /**
   * Number of samples in the PDU if the Encoding Class is encoded voice, otherwise the field is set to zero.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   samples: number;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   siteID: number;
   /**
   * Tactical Data Link (TDL) type as an enumerated value when the Encoding Class is voice, raw binary, application-specific, or database index representation of a TDL message.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   tdlType: number;
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly timestamp: number;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   whichGeometry: number;
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   writeInterval: number;
}

/** SilhouetteEnhancementVolumeStyle specifies that volumetric data is rendered with silhouette enhancement. */
interface SilhouetteEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * amount of the silhouette enhancement to use.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   silhouetteBoundaryOpacity: number;
   /**
   * scaling of non-silhouette regions.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   silhouetteRetainedOpacity: number;
   /**
   * power function to control sharpness of the silhouette.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   silhouetteSharpness: number;
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   surfaceNormals: X3DTexture3DNodeProxy | null;
}

/** SingleAxisHingeJoint has single axis about which to rotate, similar to a traditional door hinge. Contains two RigidBody nodes (containerField values body1, body2). */
interface SingleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   anchorPoint: SFVec3f;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly angle: number;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly angleRate: number;
   /**
   * axis defines vector of joint connection between body1 and body2.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1AnchorPoint: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2AnchorPoint: SFVec3f;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * maxAngle is maximum rotation angle for hinge.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxAngle: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minAngle is minimum rotation angle for hinge.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minAngle: number;
   /**
   * stopBounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stopBounce: number;
   /**
   * stopErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stopErrorCorrection: number;
}

/** SliderJoint constrains all movement between body1 and body2 along a single axis. Contains two RigidBody nodes (containerField values body1, body2). */
interface SliderJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * axis is normalized vector specifying direction of motion.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * maxSeparation is maximum separation distance between the two bodies.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxSeparation: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minSeparation is minimum separation distance between the two bodies.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minSeparation: number;
   /**
   * separation indicates final separation distance between the two bodies.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly separation: number;
   /**
   * separationRate indicates change in separation distance over time between the two bodies.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly separationRate: number;
   /**
   * sliderForce value is used to apply a force (specified in force base units) along the axis of the slider in equal and opposite directions to the two bodies.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   sliderForce: number;
   /**
   * stopBounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stopBounce: number;
   /**
   * stopErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stopErrorCorrection: number;
}

/** The Sound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SoundProxy extends X3DSoundNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * direction of sound axis, relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Factor [0,1] adjusting loudness (decibels) of emitted sound.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of sound ellipsoid center, relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * Outer (zero loudness)ellipsoid distance along back direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxBack: number;
   /**
   * Outer (zero loudness)ellipsoid distance along front direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxFront: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Inner (full loudness) ellipsoid distance along back direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minBack: number;
   /**
   * Inner (full loudness) ellipsoid distance along front direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   minFront: number;
   /**
   * Player hint [0,1] if needed to choose which sounds to play.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   priority: number;
   /**
   * sound source for the Sound node, either an AudioClip node or a MovieTexture node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   source: X3DSoundSourceNodeProxy | null;
   /**
   * Whether to spatialize sound playback relative to viewer.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   spatialize: boolean;
}

/** The SpatialSound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SpatialSoundProxy extends X3DSoundNodeProxy
{
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * coneInnerAngle is centered along direction and defines the inner conical volume, inside of which no source gain reduction occurs.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   coneInnerAngle: number;
   /**
   * coneOuterAngle is centered along direction and defines an outer conical volume, within which the sound gain decreases linearly from full gain to coneOuterGain.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   coneOuterAngle: number;
   /**
   * coneOuterGain is minimum gain value found outside coneOuterAngle.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   coneOuterGain: number;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * direction of sound axis, relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * distanceModel determines how field specifies which algorithm to use for sound attenuation, corresponding to distance between an audio source and a listener, as it moves away from the listener.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   distanceModel: "LINEAR" | "INVERSE" | "EXPONENTIAL";
   /**
   * dopplerEnabled enables/disables whether real-time Doppler effects (due to relation motion between sources and listeners) are computed by browser between virtual sound sources and active listening locations, then applied to received frequency at active listening locations.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   dopplerEnabled: boolean;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * enableHRTF enables/disables Head Related Transfer Function (HRTF) auralization, if available.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enableHRTF: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * Factor [0,1] adjusting loudness (decibels) of emitted sound.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of sound ellipsoid center, relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * maxDistance is the maximum distance where sound is renderable between source and listener, after which no reduction in sound volume occurs.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxDistance: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Player hint [0,1] if needed to choose which sounds to play.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   priority: number;
   /**
   * referenceDistance for reducing volume as source moves further from the listener.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   referenceDistance: number;
   /**
   * rolloffFactor indicates how quickly volume is reduced as source moves further from listener.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   rolloffFactor: number;
   /**
   * Whether to spatialize sound playback relative to viewer.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   spatialize: boolean;
}

/** Sphere is a geometry node, representing a perfectly round geometrical object that is the surface of a completely round ball. */
interface SphereProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Size in meters.
   *
   * This field is of access type 'initializeOnly' and type SFFloat.
   */
   radius: number;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
}

/** SphereSensor converts pointing device motion into a spherical rotation about the origin of the local coordinate system. */
interface SphereSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * Determines whether previous offset values are remembered/accumulated.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoOffset: boolean;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Sends event and remembers last value sensed.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   offset: SFRotation;
   /**
   * rotation_changed events equal sum of relative bearing changes plus offset value.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly rotation_changed: SFRotation;
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly trackPoint_changed: SFVec3f;
}

/** SplinePositionInterpolator performs non-linear interpolation among paired lists of 3-tuple values and velocities to produce an SFVec3f value_changed output event. */
interface SplinePositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   closed: boolean;
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   keyValue: MFVec3f;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   keyVelocity: MFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   normalizeVelocity: boolean;
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly value_changed: SFVec3f;
}

/** SplinePositionInterpolator2D performs non-linear interpolation among paired lists of 2-tuple values and velocities to produce an SFVec2f value_changed output event. */
interface SplinePositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   closed: boolean;
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   keyValue: MFVec2f;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   keyVelocity: MFVec2f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   normalizeVelocity: boolean;
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly value_changed: SFVec2f;
}

/** SplineScalarInterpolator performs non-linear interpolation among paired lists of float values and velocities to produce an SFFloat value_changed output event. */
interface SplineScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   closed: boolean;
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   keyValue: MFFloat;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   keyVelocity: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   normalizeVelocity: boolean;
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly value_changed: number;
}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface SpotLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   attenuation: SFVec3f;
   /**
   * Inner conical solid angle (in radians) where light source has uniform full intensity.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   beamWidth: number;
   /**
   * color of light, applied to colors of objects.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Outer conical solid angle (in radians) where light source intensity becomes zero.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   cutOffAngle: number;
   /**
   * Orientation vector of light relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * Brightness of direct emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of light relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables this light source.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Maximum effective distance of light relative to local light position, affected by ancestor scaling.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   radius: number;
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
}

/** SquadOrientationInterpolator performs non-linear interpolation among paired lists of rotation values to produce an SFRotation value_changed output event. */
interface SquadOrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * This field is of access type 'inputOutput' and type MFRotation.
   */
   keyValue: MFRotation;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   normalizeVelocity: boolean;
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly value_changed: SFRotation;
}

/** StaticGroup is similar to Group node but does not allow access to children after creation time. */
interface StaticGroupProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'initializeOnly' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** StreamAudioDestination node represents the final audio destination via a media stream. */
interface StreamAudioDestinationProxy extends X3DSoundDestinationNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mediaDeviceID: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Stream identification TBD Hint: W3C Media Capture and Streams https://www.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   streamIdentifier: string;
}

/** StreamAudioSource operates as an audio source whose media is received from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs. */
interface StreamAudioSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * Stream identification TBD Hint: W3C Media Capture and Streams https://www.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   streamIdentifier: string;
}

/** StringSensor generates events as the user presses keys on the keyboard. */
interface StringSensorProxy extends X3DKeyDeviceSensorNodeProxy
{
   /**
   * If deletionAllowed is true, then previously entered character in enteredText can be removed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   deletionAllowed: boolean;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Events generated as character-producing keys are pressed on keyboard.
   *
   * This field is of access type 'outputOnly' and type SFString.
   */
   readonly enteredText: string;
   /**
   * Events generated when sequence of keystrokes matches keys in terminationText string when this condition occurs, enteredText is moved to finalText and enteredText is set to empty string.
   *
   * This field is of access type 'outputOnly' and type SFString.
   */
   readonly finalText: string;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** SurfaceEmitter generates particles from the surface of an object. */
interface SurfaceEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * The geometry node provides geometry used as the emitting surface.
   *
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   surface: X3DGeometryNodeProxy | null;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** Switch is a Grouping node that only renders one (or zero) child at a time. */
interface SwitchProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Index of active child choice, counting from 0.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   whichChoice: number;
}

/** undefined */
interface TangentProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * A unit XYZ vector defining a tangential direction on the surface.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   vector: MFVec3f;
}

/** TexCoordChaser2D generates a series of single floating-point values that progressively change from initial value to destination value. */
interface TexCoordChaser2DProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   initialDestination: MFVec2f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   initialValue: MFVec2f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_destination: MFVec2f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_value: MFVec2f;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type MFVec2f.
   */
   readonly value_changed: MFVec2f;
}

/** TexCoordDamper2D generates a series of 2D floating-point arrays that progressively change from initial value to destination value. */
interface TexCoordDamper2DProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   initialDestination: MFVec2f;
   /**
   * Initial starting value for this node.
   *
   * This field is of access type 'initializeOnly' and type MFVec2f.
   */
   initialValue: MFVec2f;
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * set_destination resets destination value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_destination: MFVec2f;
   /**
   * set_value resets current value of this node.
   *
   * This field is of access type 'inputOnly' and type MFVec2f.
   */
   set_value: MFVec2f;
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * or -1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * This field is of access type 'outputOnly' and type MFVec2f.
   */
   readonly value_changed: MFVec2f;
}

/** Text is a 2D (flat) geometry node that can contain multiple lines of string values. */
interface TextProxy extends X3DGeometryNodeProxy
{
   /**
   * The fontStyle field can contain a FontStyle or ScreenFontStyle node defining size, family, and style for presented text.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fontStyle: X3DFontStyleNodeProxy | null;
   /**
   * Array of length values for each text string in the local coordinate system.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   length: MFFloat;
   /**
   * Array of 2D bounding box values for each line of text in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFVec2f.
   */
   readonly lineBounds: MFVec2f;
   /**
   * Limits/compresses all text strings if max string length is longer than maxExtent, as measured in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   maxExtent: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * origin of the text local coordinate system, in units of the coordinate system in which the Text node is embedded.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly origin: SFVec3f;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single or multiple string values to present as Text.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   string: MFString;
   /**
   * 2D bounding box value for all lines of text in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly textBounds: SFVec2f;
}

/** TextureBackground simulates ground and sky, using vertical arrays of wraparound color values, TextureBackground can also provide backdrop texture images on all six sides. */
interface TextureBackgroundProxy extends X3DBackgroundNodeProxy
{
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   backTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * event sent when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   bottomTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   frontTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * The angle array values increase from 0.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   groundAngle: MFFloat;
   /**
   * Color of the ground at the various angles on the ground partial sphere.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   groundColor: MFColor;
   /**
   * event true sent when node becomes active, event false sent when unbound by another node.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   leftTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   rightTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * The angle array values increase from 0.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   skyAngle: MFFloat;
   /**
   * Color of the sky at various angles on the sky sphere.
   *
   * This field is of access type 'inputOutput' and type MFColor.
   */
   skyColor: MFColor;
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   topTexture: X3DTexture2DNodeProxy | MultiTextureProxy | null;
   /**
   * transparency applied to texture images, enabling an X3D scene to overlay an HTML page or desktop.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** TextureCoordinate specifies 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * pairs of 2D (s,t) texture coordinates, either in range [0,1] or higher if repeating.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   point: MFVec2f;
}

/** TextureCoordinate3D specifies a set of 3D texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate3DProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * triplets of 3D (s,t,r) texture coordinates, either in range [0,1] or higher if repeating.
   *
   * This field is of access type 'inputOutput' and type MFVec3f.
   */
   point: MFVec3f;
}

/** TextureCoordinate4D specifies a set of 4D (homogeneous 3D) texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate4DProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * 4-tuple values of 4D texture coordinates, either in range [0,1] or higher if repeating.
   *
   * This field is of access type 'inputOutput' and type MFVec4f.
   */
   point: MFVec4f;
}

/** TextureCoordinateGenerator computes 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateGeneratorProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * parameter field defines the algorithm used to compute texture coordinates.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mode: "SPHERE" | "CAMERASPACENORMAL" | "CAMERASPACEPOSITION" | "CAMERASPACEREFLECTIONVECTOR" | "SPHERE-LOCAL" | "COORD" | "COORD-EYE" | "NOISE" | "NOISE-EYE" | "SPHERE-REFLECT" | "SPHERE-REFLECT-LOCAL";
   /**
   * parameter array contains scale and translation (x y z) values for Perlin NOISE mode, parameter[0] contains index of refraction for SPHERE-REFLECT mode, parameter[0] contains index of refraction and parameter[1 to 3] contains the eye point in local coordinates for SPHERE-REFLECT-LOCAL mode.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   parameter: MFFloat;
}

/** TextureProjector is similar to a light that projects a texture into the scene, illuminating geometry that intersects the perspective projection volume. */
interface TextureProjectorProxy extends X3DTextureProjectorNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * aspectRatio is the ratio of width and height that is projected.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly aspectRatio: number;
   /**
   * color of light, applied to colors of objects.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Direction for projection.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * maximum distance necessary for texture display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * Preferred minimum viewing angle for this projection in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   fieldOfView: number;
   /**
   * Global texture projection illuminates all objects within their volume of influence.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * Brightness of direct emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of center of texture projection relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minimum distance necessary for texture display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * Enables/disables this texture projection source.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texture: X3DTexture2DNodeProxy | null;
   /**
   * upVector describes the roll of the camera by saying which direction is up for the camera's orientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   upVector: SFVec3f;
}

/** TextureProjectorParallel is similar to a light that projects a texture into the scene, illuminating geometry that intersects the parallel projection volume. */
interface TextureProjectorParallelProxy extends X3DTextureProjectorNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * aspectRatio is the ratio of width and height that is projected.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly aspectRatio: number;
   /**
   * color of light, applied to colors of objects.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Direction for projection.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * maximum distance necessary for texture display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * Minimum and maximum extents of projection texture in units of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec4f.
   */
   fieldOfView: SFVec4f;
   /**
   * Global texture projection illuminates all objects within their volume of influence.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * Brightness of direct emission from the light.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * Position of center of texture projection relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minimum distance necessary for texture display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * Enables/disables this texture projection source.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texture: X3DTexture2DNodeProxy | null;
}

/** TextureProperties allows precise fine-grained control over application of image textures to geometry. */
interface TexturePropertiesProxy extends X3DNodeProxy
{
   /**
   * anisotropicDegree defines minimum degree of anisotropy to account for in texture filtering (1=no effect for symmetric filtering, otherwise provide higher value).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   anisotropicDegree: number;
   /**
   * borderColor defines border pixel color.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   borderColor: SFColorRGBA;
   /**
   * borderWidth number of pixels for texture border.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   borderWidth: number;
   /**
   * boundaryModeR describes handling of texture-coordinate boundaries.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   boundaryModeR: "CLAMP" | "CLAMP_TO_EDGE" | "CLAMP_TO_BOUNDARY" | "MIRRORED_REPEAT" | "REPEAT";
   /**
   * boundaryModeS describes handling of texture-coordinate boundaries.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   boundaryModeS: "CLAMP" | "CLAMP_TO_EDGE" | "CLAMP_TO_BOUNDARY" | "MIRRORED_REPEAT" | "REPEAT";
   /**
   * boundaryModeT describes handling of texture-coordinate boundaries.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   boundaryModeT: "CLAMP" | "CLAMP_TO_EDGE" | "CLAMP_TO_BOUNDARY" | "MIRRORED_REPEAT" | "REPEAT";
   /**
   * Determines whether MIPMAPs are generated for texture images.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   generateMipMaps: boolean;
   /**
   * magnificationFilter indicates texture filter when image is smaller than screen space representation.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   magnificationFilter: "AVG_PIXEL" | "DEFAULT" | "FASTEST" | "NEAREST_PIXEL" | "NICEST";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * minificationFilter indicates texture filter when image is larger than screen space representation.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   minificationFilter: "AVG_PIXEL" | "AVG_PIXEL_AVG_MIPMAP" | "AVG_PIXEL_NEAREST_MIPMAP" | "DEFAULT" | "FASTEST" | "NEAREST_PIXEL" | "NEAREST_PIXEL_AVG_MIPMAP" | "NEAREST_PIXEL_NEAREST_MIPMAP" | "NICEST";
   /**
   * textureCompression indicates compression algorithm selection mode.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   textureCompression: "DEFAULT" | "FASTEST" | "HIGH" | "LOW" | "MEDIUM" | "NICEST";
   /**
   * texturePriority defines relative priority for this texture when allocating texture memory, an important rendering resource in graphics-card hardware.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   texturePriority: number;
}

/** TextureTransform shifts 2D texture coordinates for positioning, orienting and scaling image textures on geometry. */
interface TextureTransformProxy extends X3DTextureTransformNodeProxy
{
   /**
   * center point in 2D (s,t) texture coordinates for rotation and scaling.
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   center: SFVec2f;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * single rotation angle of texture about center (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   rotation: number;
   /**
   * Non-uniform planar scaling of texture about center (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   scale: SFVec2f;
   /**
   * Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFVec2f.
   */
   translation: SFVec2f;
}

/** TextureTransform3D applies a 3D transformation to texture coordinates. */
interface TextureTransform3DProxy extends X3DTextureTransformNodeProxy
{
   /**
   * center point in 2D (s,t) texture coordinates for rotation and scaling.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * rotation angle of texture about center (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform planar scaling of texture about center (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
}

/** TextureTransformMatrix3D applies a 3D transformation to texture coordinates. */
interface TextureTransformMatrix3DProxy extends X3DTextureTransformNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * matrix is a generalized, unfiltered 4x4 transformation matrix to modify texture (opposite effect appears on geometry).
   *
   * This field is of access type 'inputOutput' and type SFMatrix4f.
   */
   matrix: SFMatrix4f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** TimeSensor continuously generates events as time passes. */
interface TimeSensorProxy extends X3DTimeDependentNodeProxy, X3DSensorNodeProxy
{
   /**
   * cycleInterval is loop duration in seconds.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   cycleInterval: number;
   /**
   * cycleTime sends a time outputOnly at startTime, and also at the beginning of each new cycle (useful for synchronization with other time-based objects).
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly cycleTime: number;
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since TimeSensor activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * fraction_changed continuously sends value in range [0,1] showing time progress in the current cycle.
   *
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly fraction_changed: number;
   /**
   * isActive true/false events are sent when TimeSensor starts/stops running.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when TimeSensor is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   loop: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * When time now >= pauseTime, isPaused becomes true and TimeSensor becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and TimeSensor becomes inactive.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * When time now >= startTime, isActive becomes true and TimeSensor becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * When stopTime becomes <= time now, isActive becomes false and TimeSensor becomes inactive.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * Time continuously sends the absolute time (value 0.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly time: number;
}

/** TimeTrigger converts boolean true events to time events. */
interface TimeTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * If input event set_boolean is true, send output triggerTime event.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_boolean: boolean;
   /**
   * triggerTime is output time event, sent when input event set_boolean is true.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly triggerTime: number;
}

/** ToneMappedVolumeStyle specifies that volumetric data is rendered with Gooch shading model of two-toned warm/cool coloring. */
interface ToneMappedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * coolColor is used for surfaces facing away from the light direction.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   coolColor: SFColorRGBA;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   surfaceNormals: X3DTexture3DNodeProxy | null;
   /**
   * warmColor is used for surfaces facing towards the light.
   *
   * This field is of access type 'inputOutput' and type SFColorRGBA.
   */
   warmColor: SFColorRGBA;
}

/** TouchSensor tracks location and state of the pointing device, detecting when a user points at or selects (activates) geometry. */
interface TouchSensorProxy extends X3DTouchSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * When pointing device selects geometry, send event containing surface normal vector at the hitPoint.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly hitNormal_changed: SFVec3f;
   /**
   * When pointing device selects geometry, send event containing 3D point on surface of underlying geometry, as measured in reference frame for TouchSensor's local coordinate system.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly hitPoint_changed: SFVec3f;
   /**
   * When pointing device selects geometry, send event containing texture coordinates of surface at the hitPoint.
   *
   * This field is of access type 'outputOnly' and type SFVec2f.
   */
   readonly hitTexCoord_changed: SFVec2f;
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Time event generated when sensor is touched by pointing device, and then deselected by the user.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly touchTime: number;
}

/** Transform is a Grouping node that can contain most nodes. */
interface TransformProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   scale: SFVec3f;
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   scaleOrientation: SFRotation;
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** TransformSensor generates output events when its targetObject enters, exits, and moves within a region in space (defined by a box). */
interface TransformSensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Translation offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Time event generated when targetObject enters the box region for sensor.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly enterTime: number;
   /**
   * Time event generated when targetObject exits the box region for sensor.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly exitTime: number;
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Sends rotation event relative to center whenever the target object is contained within the box region and results change.
   *
   * This field is of access type 'outputOnly' and type SFRotation.
   */
   readonly orientation_changed: SFRotation;
   /**
   * Sends translation event relative to center whenever the target object is contained within the box region and results change.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly position_changed: SFVec3f;
   /**
   * size of transformation-traccking box around center location, oriented within local transformation frame.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
   /**
   * targetObject is the movable geometry represented by any valid X3DGroupingNode or X3DShapeNode which may enter or exit the box.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   targetObject: X3DGroupingNodeProxy | X3DShapeNodeProxy | null;
}

/** TransmitterPdu is a networked Protocol Data Unit (PDU) information node that provides detailed information about a radio transmitter modeled in a simulation. */
interface TransmitterPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   address: string;
   /**
   * World coordinates for antenna location.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   antennaLocation: SFVec3f;
   /**
   * .
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   antennaPatternLength: number;
   /**
   * Antenna shape pattern: 0 for omnidirectional, 1 for beam, 2 for spherical harmonic (deprecated), or optional higher value.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   antennaPatternType: number;
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   applicationID: number;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Nonzero value corresponding to the simulated cryptographic key.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   cryptoKeyID: number;
   /**
   * Indicates type of crypto system being used, even if the encryption equipment is not keyed.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   cryptoSystem: number;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables the sensor node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * EntityID unique ID for entity within that application.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   entityID: number;
   /**
   * Transmission frequency in Hz.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   frequency: number;
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * This field is of access type 'inputOutput' and type SFVec3d.
   */
   geoCoords: SFVec3d;
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * This field is of access type 'initializeOnly' and type MFString.
   */
   geoSystem: MFString;
   /**
   * Source of transmission input.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   inputSource: number;
   /**
   * confirm whether there has been a recent network update.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkReader: boolean;
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isNetworkWriter: boolean;
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isRtpHeaderHeard: boolean;
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isStandAlone: boolean;
   /**
   * .
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   lengthOfModulationParameters: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Integer enumeration containing detailed information depending on the major modulation type.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   modulationTypeDetail: number;
   /**
   * Integer enumeration containing major classification of the modulation type.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   modulationTypeMajor: number;
   /**
   * Indicates the spread spectrum technique or combination of spread spectrum techniques in use.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   modulationTypeSpreadSpectrum: number;
   /**
   * Specifies radio system associated with this Transmitter PDU and used to interpret other fields whose values depend on a specific radio system.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   modulationTypeSystem: number;
   /**
   * Fallback server address if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   multicastRelayHost: string;
   /**
   * Fallback server port if multicast not available locally.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   multicastRelayPort: number;
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   networkMode: "standAlone" | "networkReader" | "networkWriter";
   /**
   * Multicast network port, for example: 3000.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   port: number;
   /**
   * Power that radio would be capable of outputting if on and transmitting, independent of actual transmit state of the radio.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   power: number;
   /**
   * Integer enumeration containing EntityType of transmitter radio.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeCategory: number;
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeCountry: number;
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeDomain: number;
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeKind: number;
   /**
   * Integer enumerations value indicating nomenclature (name) for a particular emitter.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeNomenclature: number;
   /**
   * Named equipment version number.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioEntityTypeNomenclatureVersion: number;
   /**
   * Identifies a particular radio within a given entity.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   radioID: number;
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   readInterval: number;
   /**
   * Relative coordinates for antenna location.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   relativeAntennaLocation: SFVec3f;
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   rtpHeaderExpected: boolean;
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   siteID: number;
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly timestamp: number;
   /**
   * Bandwidth of the particular transmitter measured between the half-power (-3 dB) points (this value represents total bandwidth, not the deviation from the center frequency).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transmitFrequencyBandwidth: number;
   /**
   * Specify radio transmission state where enumerations value 0 is for off, value 1 for powered but not transmitting, or value 1 is for powered and transmitting,.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   transmitState: number;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   whichGeometry: number;
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   writeInterval: number;
}

/** TriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * fanCount array provides number of vertices in each fan.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   fanCount: MFInt32;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** TriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** TriangleSet2D is a geometry node that defines a set of filled 2D triangles in X-Y plane. */
interface TriangleSet2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * 2D coordinates of TriangleSet2D vertices.
   *
   * This field is of access type 'inputOutput' and type MFVec2f.
   */
   vertices: MFVec2f;
}

/** TriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * stripCount array provides number of vertices in each strip.
   *
   * This field is of access type 'inputOutput' and type MFInt32.
   */
   stripCount: MFInt32;
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** TwoSidedMaterial specifies surface rendering properties for associated geometry nodes, for outer (front) and inner (back) sides of polygons. */
interface TwoSidedMaterialProxy extends X3DMaterialNodeProxy
{
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   backAmbientIntensity: number;
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   backDiffuseColor: SFColor;
   /**
   * how much glowing light is emitted from this object.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   backEmissiveColor: SFColor;
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   backShininess: number;
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   backSpecularColor: SFColor;
   /**
   * how "clear" an object is: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   backTransparency: number;
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   diffuseColor: SFColor;
   /**
   * how much glowing light is emitted from this object.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   emissiveColor: SFColor;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * separateBackColor determines whether separate Material values are used for back faces.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   separateBackColor: boolean;
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shininess: number;
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   specularColor: SFColor;
   /**
   * how "clear" an object is: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** UniversalJoint is like a BallJoint that constrains an extra degree of rotational freedom. */
interface UniversalJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   anchorPoint: SFVec3f;
   /**
   * axis1 defines axis vector of joint connection to body1.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis1: SFVec3f;
   /**
   * axis2 defines axis vector of joint connection to body2.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   axis2: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1AnchorPoint: SFVec3f;
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body1Axis: SFVec3f;
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2AnchorPoint: SFVec3f;
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly body2Axis: SFVec3f;
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1Bounce: number;
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop1ErrorCorrection: number;
   /**
   * stop2Bounce is velocity factor for bounce back once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop2Bounce: number;
   /**
   * stop2ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   stop2ErrorCorrection: number;
}

/** UnlitMaterial specifies surface rendering properties for associated geometry nodes. */
interface UnlitMaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * how much glowing light is emitted from this object.
   *
   * This field is of access type 'inputOutput' and type SFColor.
   */
   emissiveColor: SFColor;
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   emissiveTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   emissiveTextureMapping: string;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   normalScale: number;
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normalTexture: X3DSingleTextureNodeProxy | null;
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   normalTextureMapping: string;
   /**
   * how "clear" an object is: 1.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** Viewpoint provides a specific location and direction where the user may view the scene. */
interface ViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   centerOfRotation: SFVec3f;
   /**
   * Text description or navigation hint to describe the significance of this model Viewpoint.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   fieldOfView: number;
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   jump: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   navigationInfo: NavigationInfoProxy | null;
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   position: SFVec3f;
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   retainUserOffsets: boolean;
   /**
   * Sending event set_bind=true makes this node active.
   *
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   viewAll: boolean;
}

/** ViewpointGroup can contain Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes for better user-navigation support with a shared description on the viewpoint list. */
interface ViewpointGroupProxy extends X3DChildNodeProxy
{
   /**
   * center specifies center point of proximity box within which ViewpointGroup is usable and displayed on viewpoint list.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * ViewpointGroup contains Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes that each have containerField='children' default value.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DViewpointNodeProxy | ViewpointGroupProxy>;
   /**
   * Text description or navigation hint to identify this ViewpointGroup.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * displayed determines whether this ViewpointGroup is displayed in the current viewpoint list.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   displayed: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   retainUserOffsets: boolean;
   /**
   * size of Proximity box around center location, oriented within local transformation frame, within which ViewpointGroup is usable and displayed on viewpoint list.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
}

/** Viewport is a Grouping node that can contain most nodes. */
interface ViewportProxy extends X3DViewportNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * clipBoundary is specified in fractions of the normal render surface in the sequence left/right/bottom/top.
   *
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   clipBoundary: MFFloat;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** VisibilitySensor detects when user can see a specific object or region as they navigate the world. */
interface VisibilitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Translation offset from origin of local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   center: SFVec3f;
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * Time event generated when user's camera enters visibility region for sensor.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly enterTime: number;
   /**
   * Time event generated when user's camera exits visibility region for sensor.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly exitTime: number;
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * size of visibility box around center location, oriented within local transformation frame.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
}

/** VolumeData displays a simple non-segmented voxel dataset with a single RenderStyle node. */
interface VolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   dimensions: SFVec3f;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Single contained X3DVolumeRenderStyleNode node that defines specific rendering technique for this volumetric object.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   renderStyle: X3DVolumeRenderStyleNodeProxy | null;
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   voxels: X3DTexture3DNodeProxy | null;
}

/** VolumeEmitter emits particles from a random position confined within the given closed geometry volume. */
interface VolumeEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Coordinates for the geometry used as the emitting volume.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * coordIndex indices are applied to contained Coordinate values in order to define randomly generated initial geometry of the particles.
   *
   * This field is of access type 'initializeOnly' and type MFInt32.
   */
   coordIndex: MFInt32;
   /**
   * Initial direction from which particles emanate.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * TODO, X3D specification is undefined.
   *
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   internal: boolean;
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * This field is of access type 'inputOnly' and type MFInt32.
   */
   set_coordIndex: MFInt32;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** VolumePickSensor tests picking intersections using the pickingGeometry against the pickTarget geometry volume. */
interface VolumePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   intersectionType: "BOUNDS" | "GEOMETRY";
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * defines whether the intersection test (i.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   matchCriterion: "MATCH_ANY" | "MATCH_EVERY" | "MATCH_ONLY_ONE";
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>;
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pickingGeometry: X3DGeometryNodeProxy | null;
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>;
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * This field is of access type 'initializeOnly' and type SFString.
   */
   sortOrder: "ANY" | "CLOSEST" | "ALL" | "ALL_SORTED";
}

/** WaveShaper node represents a nonlinear distorter that applies a wave-shaping distortion curve to the signal. */
interface WaveShaperProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>;
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * The oversample field is specifies what type of oversampling (if any) should be used when applying the shaping curve.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   oversample: "NONE" | "2X" | "4X";
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** WindPhysicsModel applies a wind effect to the particles. */
interface WindPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * direction in which wind is travelling in the form of a normalized, unit vector.
   *
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * Enables/disables node operation.
   *
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * gustiness specifies how much wind speed varies from the average speed.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gustiness: number;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * turbulence field specifies how much the wind acts directly in line with the direction, and how much variation is applied in directions other than the wind direction.
   *
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   turbulence: number;
}

/** WorldInfo contains a title and simple persistent metadata information about an X3D scene. This node is strictly for documentation purposes and has no effect on the visual appearance or behaviour of the world. */
interface WorldInfoProxy extends X3DInfoNodeProxy
{
   /**
   * Additional information about this model.
   *
   * This field is of access type 'inputOutput' and type MFString.
   */
   info: MFString;
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * title of this world, placed in window title.
   *
   * This field is of access type 'inputOutput' and type SFString.
   */
   title: string;
}

/** Nodes of this type can be used as child nodes for Appearance. */
interface X3DAppearanceChildNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all Appearance nodes. */
interface X3DAppearanceNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Abstract type from which all backgrounds inherit, also defining a background binding stack. */
interface X3DBackgroundNodeProxy extends X3DBindableNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   groundAngle: MFFloat;
   /**
   * This field is of access type 'inputOutput' and type MFColor.
   */
   groundColor: MFColor;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   skyAngle: MFFloat;
   /**
   * This field is of access type 'inputOutput' and type MFColor.
   */
   skyColor: MFColor;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   transparency: number;
}

/** Bindable nodes implement the binding stack, so that only one of each node type is active at a given time. */
interface X3DBindableNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
}

/** X3DBoundedObject indicates that bounding box values can be provided (or computed) to encompass this node and any children. */
interface X3DBoundedObjectProxy extends SFNode
{
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** The X3DChaserNode abstract node type calculates the output on value_changed as a finite impulse response (FIR) based on the events received on set_destination field. */
interface X3DChaserNodeProxy extends X3DFollowerNodeProxy
{
   /**
   * This field is of access type 'initializeOnly' and type SFTime.
   */
   duration: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** A node that implements X3DChildNode is one of the legal children for a X3DGroupingNode parent. */
interface X3DChildNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for color specifications in X3D. */
interface X3DColorNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DComposableVolumeRenderStyleNode abstract node type is the base type for all node types that allow rendering styles to be sequentially composed together to form a single renderable output. */
interface X3DComposableVolumeRenderStyleNodeProxy extends X3DVolumeRenderStyleNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Composed geometry nodes produce renderable geometry, can contain Color Coordinate Normal TextureCoordinate, and are contained by a Shape node. */
interface X3DComposedGeometryNodeProxy extends X3DGeometryNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type MFNode.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   ccw: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   color: X3DColorNodeProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   colorPerVertex: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   coord: X3DCoordinateNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   fogCoord: FogCoordinateProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   normal: X3DNormalNodeProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   normalPerVertex: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy | null;
}

/** Base type for all coordinate node types in X3D. */
interface X3DCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DDamperNode abstract node type creates an IIR response that approaches the destination value according to the shape of the e-function only asymptotically but very quickly. */
interface X3DDamperNodeProxy extends X3DFollowerNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   order: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tau: number;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   tolerance: number;
}

/** Base type for all drag-style pointing device sensors. */
interface X3DDragSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   autoOffset: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'outputOnly' and type SFVec3f.
   */
   readonly trackPoint_changed: SFVec3f;
}

/** Base type for the environmental sensor nodes ProximitySensor, TransformSensor and VisibilitySensor. */
interface X3DEnvironmentalSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   size: SFVec3f;
}

/** Base type for all nodes that specify cubic environment map sources for texture images. */
interface X3DEnvironmentTextureNodeProxy extends X3DTextureNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Abstract type describing a node that influences the lighting equation through the use of fog semantics. */
interface X3DFogObjectProxy extends SFNode
{
   /**
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   fogType: "LINEAR" | "EXPONENTIAL";
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   visibilityRange: number;
}

/** X3DFollowerNode is the abstract base class for all nodes in the Followers component. */
interface X3DFollowerNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all font style nodes. */
interface X3DFontStyleNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all geometric property node types. */
interface X3DGeometricPropertyNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Geometry nodes produce renderable geometry and are contained by a Shape node. */
interface X3DGeometryNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Grouping nodes can contain other nodes as children, thus making up the backbone of a scene graph. */
interface X3DGroupingNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Base type for all nodes that contain only information without visual semantics. */
interface X3DInfoNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Interpolator nodes are designed for linear keyframed animation. Interpolators are driven by an input key ranging [0..1] and produce corresponding piecewise-linear output functions. */
interface X3DInterpolatorNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
}

/** Base type for all sensor node types that operate using key devices. */
interface X3DKeyDeviceSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DLayerNode abstract node type is the base node type for layer nodes. */
interface X3DLayerNodeProxy extends X3DNodeProxy, X3DPickableObjectProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   pickable: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   viewport: X3DViewportNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** X3DLayoutNode is the base node type for layout nodes. */
interface X3DLayoutNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Light nodes provide illumination for rendering geometry in the scene. Implementing nodes must include a global field with type SFBool and accessType inputOutput. */
interface X3DLightNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
}

/** Base type for all Material nodes. */
interface X3DMaterialNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Each node inheriting the X3DMetadataObject interface contains a single array of strictly typed values: MFBool, MFInt32, MFFloat, MFDouble, MFString, or MFNode, the latter having children that are all Metadata nodes. */
interface X3DMetadataObjectProxy extends SFNode
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   reference: string;
}

/** The X3DNBodyCollidableNode abstract node type represents objects that act as the interface between the rigid body physics, collision geometry proxy, and renderable objects in the scene graph hierarchy. */
interface X3DNBodyCollidableNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   rotation: SFRotation;
   /**
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   translation: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** The X3DNBodyCollisionSpaceNode abstract node type represents objects that act as a self-contained spatial collection of objects that can interact through collision detection routines. */
interface X3DNBodyCollisionSpaceNodeProxy extends X3DNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Base typefor all sensors that generate events based on network activity. */
interface X3DNetworkSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** All instantiable nodes implement X3DNode, which corresponds to SFNode type in the X3D specification. */
interface X3DNodeProxy extends SFNode
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all normal node types in X3D. */
interface X3DNormalNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all nodes that provide control curve information in 2D space. */
interface X3DNurbsControlCurveNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type MFVec2d.
   */
   controlPoint: MFVec2d;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Abstract geometry type for all types of NURBS surfaces. */
interface X3DNurbsSurfaceGeometryNodeProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   solid: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   uClosed: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uDimension: number;
   /**
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   uKnot: MFDouble;
   /**
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   uOrder: number;
   /**
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   uTessellation: number;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   vClosed: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vDimension: number;
   /**
   * This field is of access type 'initializeOnly' and type MFDouble.
   */
   vKnot: MFDouble;
   /**
   * This field is of access type 'initializeOnly' and type SFInt32.
   */
   vOrder: number;
   /**
   * This field is of access type 'inputOutput' and type SFInt32.
   */
   vTessellation: number;
   /**
   * This field is of access type 'inputOutput' and type MFDouble.
   */
   weight: MFDouble;
}

/** Base type for material nodes that describe how the shape looks like from one side. A different number of contanied texture nodes are allowed by each of the implementing nodes. */
interface X3DOneSidedMaterialNodeProxy extends X3DMaterialNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   emissiveTextureMapping: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   normalScale: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   normalTextureMapping: string;
}

/** Base type for all geometry node types that are created parametrically and use control points to describe the final shape of the surface. */
interface X3DParametricGeometryNodeProxy extends X3DGeometryNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DParticleEmitterNode abstract type represents any node that is an emitter of particles. */
interface X3DParticleEmitterNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   mass: number;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   speed: number;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   surfaceArea: number;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   variation: number;
}

/** The X3DParticlePhysicsModelNode abstract type represents any node that applies a form of constraints on the particles after they have been generated. */
interface X3DParticlePhysicsModelNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DPickableObject abstract interface marks a node as being capable of having customized picking performed on its contents or children. */
interface X3DPickableObjectProxy extends SFNode
{
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   pickable: boolean;
}

/** The X3DPickSensorNode abstract node type is the base node type that represents the lowest common denominator of picking capabilities. */
interface X3DPickSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFString.
   */
   intersectionType: "BOUNDS" | "GEOMETRY";
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   matchCriterion: "MATCH_ANY" | "MATCH_EVERY" | "MATCH_ONLY_ONE";
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type MFString.
   */
   objectType: MFString <"ALL" | "NONE" | "TERRAIN">;
   /**
   * This field is of access type 'outputOnly' and type MFNode.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   pickingGeometry: X3DGeometryNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type MFNode.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>;
   /**
   * This field is of access type 'initializeOnly' and type SFString.
   */
   sortOrder: "ANY" | "CLOSEST" | "ALL" | "ALL_SORTED";
}

/** Base type for all pointing device sensors. */
interface X3DPointingDeviceSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type marking nodes that are valid product structure children for the CADGeometry component. */
interface X3DProductStructureChildNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   name: string;
}

/** Base type for all nodes that specify arbitrary fields for interfacing with per-object attribute values. */
interface X3DProgrammableShaderObjectProxy extends SFNode
{

}

/** Base type for all prototype instances. Note that direct children nodes are disallowed, instead let fieldValue with type SFNode/MFNode contain them. Current practice is that, if desired, prototype authors must explicitly add the metadata SFNode field in the ProtoInterface. */
interface X3DPrototypeInstanceProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** The X3DRigidJointNode abstract node type is the base type for all joint types. */
interface X3DRigidJointNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body1: RigidBodyProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   body2: RigidBodyProxy | null;
   /**
   * This field is of access type 'inputOutput' and type MFString.
   */
   forceOutput: MFString <"ALL" | "NONE">;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for scripting nodes (but not shader nodes). */
interface X3DScriptNodeProxy extends X3DChildNodeProxy, X3DUrlObjectProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** Base type for all sensors. */
interface X3DSensorNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type from which all Sequencers are derived. */
interface X3DSequencerNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type MFFloat.
   */
   key: MFFloat;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   next: boolean;
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   previous: boolean;
   /**
   * This field is of access type 'inputOnly' and type SFFloat.
   */
   set_fraction: number;
}

/** Base type for all nodes that specify a programmable shader. */
interface X3DShaderNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   activate: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isSelected: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isValid: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFString.
   */
   language: "Cg" | "GLSL" | "HLSL";
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all Shape nodes. */
interface X3DShapeNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   appearance: X3DAppearanceNodeProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   castShadow: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   geometry: X3DGeometryNodeProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** Base type for all texture coordinate nodes which specify texture coordinates for a single texture. */
interface X3DSingleTextureCoordinateNodeProxy extends X3DTextureCoordinateNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all texture node types that define a single texture. A single texture can be used to influence a parameter of various material nodes in the Shape component, and it can be a child of MultiTexture. */
interface X3DSingleTextureNodeProxy extends X3DTextureNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all texture transform nodes which specify texture coordinate transformation for a single texture. */
interface X3DSingleTextureTransformNodeProxy extends X3DTextureTransformNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   mapping: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundChannelNodeProxy extends X3DSoundNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundDestinationNodeProxy extends X3DSoundNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   mediaDeviceID: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all sound nodes. */
interface X3DSoundNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all sound processing nodes, which are used to enhance audio with filtering, delaying, changing gain, etc. */
interface X3DSoundProcessingNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFInt32.
   */
   readonly channelCount: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelCountMode: "MAX" | "CLAMPED_MAX" | "EXPLICIT";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   channelInterpretation: "SPEAKERS" | "DISCRETE";
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   tailTime: number;
}

/** Nodes implementing X3DSoundSourceNode provide signal inputs to the audio graph. */
interface X3DSoundSourceNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   gain: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
}

/** X3DStatement is a marker interface that identifies statements relating to nonrenderable scene graph structure. X3DStatement does not extend from any other node type since it is not an explicit part of the X3D node interface hierarchy, and DEF/USE is not appropriate for such statements. */
interface X3DStatementProxy extends SFNode
{

}

/** Base type for all nodes which specify 2D sources for texture images. */
interface X3DTexture2DNodeProxy extends X3DSingleTextureNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
}

/** Base type for all nodes that specify 3D sources for texture images. */
interface X3DTexture3DNodeProxy extends X3DTextureNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatR: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatS: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFBool.
   */
   repeatT: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFNode.
   */
   textureProperties: TexturePropertiesProxy | null;
}

/** Base type for all nodes which specify texture coordinates. */
interface X3DTextureCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all nodes which specify sources for texture images. */
interface X3DTextureNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type for all node types that specify texture projector nodes, which provide a form of lighting. */
interface X3DTextureProjectorNodeProxy extends X3DLightNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   ambientIntensity: number;
   /**
   * This field is of access type 'outputOnly' and type SFFloat.
   */
   readonly aspectRatio: number;
   /**
   * This field is of access type 'inputOutput' and type SFColor.
   */
   color: SFColor;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   direction: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   global: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   intensity: number;
   /**
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   location: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   on: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   shadowIntensity: number;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   shadows: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   texture: X3DTexture2DNodeProxy | null;
}

/** Base type for all nodes which specify a transformation of texture coordinates. */
interface X3DTextureTransformNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** Base type from which all time-dependent nodes are derived. */
interface X3DTimeDependentNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly elapsedTime: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isPaused: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   pauseTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   resumeTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   startTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   stopTime: number;
}

/** Base type for all touch-style pointing device sensors. */
interface X3DTouchSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isActive: boolean;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isOver: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly touchTime: number;
}

/** Base type from which all trigger nodes are derived. */
interface X3DTriggerNodeProxy extends X3DChildNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

/** X3DUrlObject indicates that a node has content loaded from a Uniform Resource Locator (URL) and can be tracked via a LoadSensor. Such child nodes have containerField='children' to indicate their relationship to the parent LoadSensor node. */
interface X3DUrlObjectProxy extends SFNode
{
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefresh: number;
   /**
   * This field is of access type 'inputOutput' and type SFTime.
   */
   autoRefreshTimeLimit: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   load: boolean;
   /**
   * This field is of access type 'inputOutput' and type MFString.
   */
   url: MFString;
}

/** Base type for all nodes that specify per-vertex attribute information to the shader. */
interface X3DVertexAttributeNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'initializeOnly' and type SFString.
   */
   name: string;
}

/** Node type X3DViewpointNode defines a specific location in the local coordinate system from which the user may view the scene, and also defines a viewpoint binding stack. */
interface X3DViewpointNodeProxy extends X3DBindableNodeProxy
{
   /**
   * This field is of access type 'outputOnly' and type SFTime.
   */
   readonly bindTime: number;
   /**
   * This field is of access type 'inputOutput' and type SFString.
   */
   description: string;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   farDistance: number;
   /**
   * This field is of access type 'outputOnly' and type SFBool.
   */
   readonly isBound: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   jump: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   navigationInfo: NavigationInfoProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFFloat.
   */
   nearDistance: number;
   /**
   * This field is of access type 'inputOutput' and type SFRotation.
   */
   orientation: SFRotation;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   retainUserOffsets: boolean;
   /**
   * This field is of access type 'inputOnly' and type SFBool.
   */
   set_bind: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   viewAll: boolean;
}

/** The X3DViewportNode abstract node type is the base node type for viewport nodes. */
interface X3DViewportNodeProxy extends X3DGroupingNodeProxy
{
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   addChildren: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type MFNode.
   */
   children: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOnly' and type MFNode.
   */
   removeChildren: MFNode <X3DChildNodeProxy>;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** The X3DVolumeDataNode abstract node type is the base type for all node types that describe volumetric data to be rendered. */
interface X3DVolumeDataNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxCenter: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   bboxDisplay: boolean;
   /**
   * This field is of access type 'initializeOnly' and type SFVec3f.
   */
   bboxSize: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFVec3f.
   */
   dimensions: SFVec3f;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   visible: boolean;
}

/** The X3DVolumeRenderStyleNode abstract node type is the base type for all node types that specify a specific visual rendering style to be used when rendering volume data. */
interface X3DVolumeRenderStyleNodeProxy extends X3DNodeProxy
{
   /**
   * This field is of access type 'inputOutput' and type SFBool.
   */
   enabled: boolean;
   /**
   * This field is of access type 'inputOutput' and type SFNode.
   */
   metadata: X3DMetadataObjectProxy | null;
}

type ConcreteNodeTypes = {
   AcousticProperties: AcousticPropertiesProxy,
   Analyser: AnalyserProxy,
   Anchor: AnchorProxy,
   Appearance: AppearanceProxy,
   Arc2D: Arc2DProxy,
   ArcClose2D: ArcClose2DProxy,
   AudioClip: AudioClipProxy,
   AudioDestination: AudioDestinationProxy,
   Background: BackgroundProxy,
   BallJoint: BallJointProxy,
   Billboard: BillboardProxy,
   BiquadFilter: BiquadFilterProxy,
   BlendedVolumeStyle: BlendedVolumeStyleProxy,
   BlendMode: BlendModeProxy,
   BooleanFilter: BooleanFilterProxy,
   BooleanSequencer: BooleanSequencerProxy,
   BooleanToggle: BooleanToggleProxy,
   BooleanTrigger: BooleanTriggerProxy,
   BoundaryEnhancementVolumeStyle: BoundaryEnhancementVolumeStyleProxy,
   BoundedPhysicsModel: BoundedPhysicsModelProxy,
   Box: BoxProxy,
   BufferAudioSource: BufferAudioSourceProxy,
   CADAssembly: CADAssemblyProxy,
   CADFace: CADFaceProxy,
   CADLayer: CADLayerProxy,
   CADPart: CADPartProxy,
   CartoonVolumeStyle: CartoonVolumeStyleProxy,
   ChannelMerger: ChannelMergerProxy,
   ChannelSelector: ChannelSelectorProxy,
   ChannelSplitter: ChannelSplitterProxy,
   Circle2D: Circle2DProxy,
   ClipPlane: ClipPlaneProxy,
   CollidableOffset: CollidableOffsetProxy,
   CollidableShape: CollidableShapeProxy,
   Collision: CollisionProxy,
   CollisionCollection: CollisionCollectionProxy,
   CollisionSensor: CollisionSensorProxy,
   CollisionSpace: CollisionSpaceProxy,
   Color: ColorProxy,
   ColorChaser: ColorChaserProxy,
   ColorDamper: ColorDamperProxy,
   ColorInterpolator: ColorInterpolatorProxy,
   ColorRGBA: ColorRGBAProxy,
   ComposedCubeMapTexture: ComposedCubeMapTextureProxy,
   ComposedShader: ComposedShaderProxy,
   ComposedTexture3D: ComposedTexture3DProxy,
   ComposedVolumeStyle: ComposedVolumeStyleProxy,
   Cone: ConeProxy,
   ConeEmitter: ConeEmitterProxy,
   Contact: ContactProxy,
   Contour2D: Contour2DProxy,
   ContourPolyline2D: ContourPolyline2DProxy,
   Convolver: ConvolverProxy,
   Coordinate: CoordinateProxy,
   CoordinateChaser: CoordinateChaserProxy,
   CoordinateDamper: CoordinateDamperProxy,
   CoordinateDouble: CoordinateDoubleProxy,
   CoordinateInterpolator: CoordinateInterpolatorProxy,
   CoordinateInterpolator2D: CoordinateInterpolator2DProxy,
   Cylinder: CylinderProxy,
   CylinderSensor: CylinderSensorProxy,
   Delay: DelayProxy,
   DepthMode: DepthModeProxy,
   DirectionalLight: DirectionalLightProxy,
   DISEntityManager: DISEntityManagerProxy,
   DISEntityTypeMapping: DISEntityTypeMappingProxy,
   Disk2D: Disk2DProxy,
   DoubleAxisHingeJoint: DoubleAxisHingeJointProxy,
   DynamicsCompressor: DynamicsCompressorProxy,
   EaseInEaseOut: EaseInEaseOutProxy,
   EdgeEnhancementVolumeStyle: EdgeEnhancementVolumeStyleProxy,
   ElevationGrid: ElevationGridProxy,
   EnvironmentLight: EnvironmentLightProxy,
   EspduTransform: EspduTransformProxy,
   ExplosionEmitter: ExplosionEmitterProxy,
   Extrusion: ExtrusionProxy,
   FillProperties: FillPropertiesProxy,
   FloatVertexAttribute: FloatVertexAttributeProxy,
   Fog: FogProxy,
   FogCoordinate: FogCoordinateProxy,
   FontStyle: FontStyleProxy,
   ForcePhysicsModel: ForcePhysicsModelProxy,
   Gain: GainProxy,
   GeneratedCubeMapTexture: GeneratedCubeMapTextureProxy,
   GeoCoordinate: GeoCoordinateProxy,
   GeoElevationGrid: GeoElevationGridProxy,
   GeoLocation: GeoLocationProxy,
   GeoLOD: GeoLODProxy,
   GeoMetadata: GeoMetadataProxy,
   GeoOrigin: GeoOriginProxy,
   GeoPositionInterpolator: GeoPositionInterpolatorProxy,
   GeoProximitySensor: GeoProximitySensorProxy,
   GeoTouchSensor: GeoTouchSensorProxy,
   GeoTransform: GeoTransformProxy,
   GeoViewpoint: GeoViewpointProxy,
   Group: GroupProxy,
   HAnimDisplacer: HAnimDisplacerProxy,
   HAnimHumanoid: HAnimHumanoidProxy,
   HAnimJoint: HAnimJointProxy,
   HAnimMotion: HAnimMotionProxy,
   HAnimSegment: HAnimSegmentProxy,
   HAnimSite: HAnimSiteProxy,
   ImageCubeMapTexture: ImageCubeMapTextureProxy,
   ImageTexture: ImageTextureProxy,
   ImageTexture3D: ImageTexture3DProxy,
   ImageTextureAtlas: ImageTextureAtlasProxy,
   IndexedFaceSet: IndexedFaceSetProxy,
   IndexedLineSet: IndexedLineSetProxy,
   IndexedQuadSet: IndexedQuadSetProxy,
   IndexedTriangleFanSet: IndexedTriangleFanSetProxy,
   IndexedTriangleSet: IndexedTriangleSetProxy,
   IndexedTriangleStripSet: IndexedTriangleStripSetProxy,
   Inline: InlineProxy,
   IntegerSequencer: IntegerSequencerProxy,
   IntegerTrigger: IntegerTriggerProxy,
   IsoSurfaceVolumeData: IsoSurfaceVolumeDataProxy,
   KeySensor: KeySensorProxy,
   Layer: LayerProxy,
   LayerSet: LayerSetProxy,
   Layout: LayoutProxy,
   LayoutGroup: LayoutGroupProxy,
   LayoutLayer: LayoutLayerProxy,
   LinePickSensor: LinePickSensorProxy,
   LineProperties: LinePropertiesProxy,
   LineSet: LineSetProxy,
   ListenerPointSource: ListenerPointSourceProxy,
   LoadSensor: LoadSensorProxy,
   LocalFog: LocalFogProxy,
   LOD: LODProxy,
   Material: MaterialProxy,
   Matrix3VertexAttribute: Matrix3VertexAttributeProxy,
   Matrix4VertexAttribute: Matrix4VertexAttributeProxy,
   MetadataBoolean: MetadataBooleanProxy,
   MetadataDouble: MetadataDoubleProxy,
   MetadataFloat: MetadataFloatProxy,
   MetadataInteger: MetadataIntegerProxy,
   MetadataSet: MetadataSetProxy,
   MetadataString: MetadataStringProxy,
   MicrophoneSource: MicrophoneSourceProxy,
   MotorJoint: MotorJointProxy,
   MovieTexture: MovieTextureProxy,
   MultiTexture: MultiTextureProxy,
   MultiTextureCoordinate: MultiTextureCoordinateProxy,
   MultiTextureTransform: MultiTextureTransformProxy,
   NavigationInfo: NavigationInfoProxy,
   Normal: NormalProxy,
   NormalInterpolator: NormalInterpolatorProxy,
   NurbsCurve: NurbsCurveProxy,
   NurbsCurve2D: NurbsCurve2DProxy,
   NurbsOrientationInterpolator: NurbsOrientationInterpolatorProxy,
   NurbsPatchSurface: NurbsPatchSurfaceProxy,
   NurbsPositionInterpolator: NurbsPositionInterpolatorProxy,
   NurbsSet: NurbsSetProxy,
   NurbsSurfaceInterpolator: NurbsSurfaceInterpolatorProxy,
   NurbsSweptSurface: NurbsSweptSurfaceProxy,
   NurbsSwungSurface: NurbsSwungSurfaceProxy,
   NurbsTextureCoordinate: NurbsTextureCoordinateProxy,
   NurbsTrimmedSurface: NurbsTrimmedSurfaceProxy,
   OpacityMapVolumeStyle: OpacityMapVolumeStyleProxy,
   OrientationChaser: OrientationChaserProxy,
   OrientationDamper: OrientationDamperProxy,
   OrientationInterpolator: OrientationInterpolatorProxy,
   OrthoViewpoint: OrthoViewpointProxy,
   OscillatorSource: OscillatorSourceProxy,
   PackagedShader: PackagedShaderProxy,
   ParticleSystem: ParticleSystemProxy,
   PeriodicWave: PeriodicWaveProxy,
   PhysicalMaterial: PhysicalMaterialProxy,
   PickableGroup: PickableGroupProxy,
   PixelTexture: PixelTextureProxy,
   PixelTexture3D: PixelTexture3DProxy,
   PlaneSensor: PlaneSensorProxy,
   PointEmitter: PointEmitterProxy,
   PointLight: PointLightProxy,
   PointPickSensor: PointPickSensorProxy,
   PointProperties: PointPropertiesProxy,
   PointSet: PointSetProxy,
   Polyline2D: Polyline2DProxy,
   PolylineEmitter: PolylineEmitterProxy,
   Polypoint2D: Polypoint2DProxy,
   PositionChaser: PositionChaserProxy,
   PositionChaser2D: PositionChaser2DProxy,
   PositionDamper: PositionDamperProxy,
   PositionDamper2D: PositionDamper2DProxy,
   PositionInterpolator: PositionInterpolatorProxy,
   PositionInterpolator2D: PositionInterpolator2DProxy,
   PrimitivePickSensor: PrimitivePickSensorProxy,
   ProgramShader: ProgramShaderProxy,
   ProjectionVolumeStyle: ProjectionVolumeStyleProxy,
   ProximitySensor: ProximitySensorProxy,
   QuadSet: QuadSetProxy,
   ReceiverPdu: ReceiverPduProxy,
   Rectangle2D: Rectangle2DProxy,
   RigidBody: RigidBodyProxy,
   RigidBodyCollection: RigidBodyCollectionProxy,
   ScalarChaser: ScalarChaserProxy,
   ScalarDamper: ScalarDamperProxy,
   ScalarInterpolator: ScalarInterpolatorProxy,
   ScreenFontStyle: ScreenFontStyleProxy,
   ScreenGroup: ScreenGroupProxy,
   Script: ScriptProxy,
   SegmentedVolumeData: SegmentedVolumeDataProxy,
   ShadedVolumeStyle: ShadedVolumeStyleProxy,
   ShaderPart: ShaderPartProxy,
   ShaderProgram: ShaderProgramProxy,
   Shape: ShapeProxy,
   SignalPdu: SignalPduProxy,
   SilhouetteEnhancementVolumeStyle: SilhouetteEnhancementVolumeStyleProxy,
   SingleAxisHingeJoint: SingleAxisHingeJointProxy,
   SliderJoint: SliderJointProxy,
   Sound: SoundProxy,
   SpatialSound: SpatialSoundProxy,
   Sphere: SphereProxy,
   SphereSensor: SphereSensorProxy,
   SplinePositionInterpolator: SplinePositionInterpolatorProxy,
   SplinePositionInterpolator2D: SplinePositionInterpolator2DProxy,
   SplineScalarInterpolator: SplineScalarInterpolatorProxy,
   SpotLight: SpotLightProxy,
   SquadOrientationInterpolator: SquadOrientationInterpolatorProxy,
   StaticGroup: StaticGroupProxy,
   StreamAudioDestination: StreamAudioDestinationProxy,
   StreamAudioSource: StreamAudioSourceProxy,
   StringSensor: StringSensorProxy,
   SurfaceEmitter: SurfaceEmitterProxy,
   Switch: SwitchProxy,
   Tangent: TangentProxy,
   TexCoordChaser2D: TexCoordChaser2DProxy,
   TexCoordDamper2D: TexCoordDamper2DProxy,
   Text: TextProxy,
   TextureBackground: TextureBackgroundProxy,
   TextureCoordinate: TextureCoordinateProxy,
   TextureCoordinate3D: TextureCoordinate3DProxy,
   TextureCoordinate4D: TextureCoordinate4DProxy,
   TextureCoordinateGenerator: TextureCoordinateGeneratorProxy,
   TextureProjector: TextureProjectorProxy,
   TextureProjectorParallel: TextureProjectorParallelProxy,
   TextureProperties: TexturePropertiesProxy,
   TextureTransform: TextureTransformProxy,
   TextureTransform3D: TextureTransform3DProxy,
   TextureTransformMatrix3D: TextureTransformMatrix3DProxy,
   TimeSensor: TimeSensorProxy,
   TimeTrigger: TimeTriggerProxy,
   ToneMappedVolumeStyle: ToneMappedVolumeStyleProxy,
   TouchSensor: TouchSensorProxy,
   Transform: TransformProxy,
   TransformSensor: TransformSensorProxy,
   TransmitterPdu: TransmitterPduProxy,
   TriangleFanSet: TriangleFanSetProxy,
   TriangleSet: TriangleSetProxy,
   TriangleSet2D: TriangleSet2DProxy,
   TriangleStripSet: TriangleStripSetProxy,
   TwoSidedMaterial: TwoSidedMaterialProxy,
   UniversalJoint: UniversalJointProxy,
   UnlitMaterial: UnlitMaterialProxy,
   Viewpoint: ViewpointProxy,
   ViewpointGroup: ViewpointGroupProxy,
   Viewport: ViewportProxy,
   VisibilitySensor: VisibilitySensorProxy,
   VolumeData: VolumeDataProxy,
   VolumeEmitter: VolumeEmitterProxy,
   VolumePickSensor: VolumePickSensorProxy,
   WaveShaper: WaveShaperProxy,
   WindPhysicsModel: WindPhysicsModelProxy,
   WorldInfo: WorldInfoProxy,
}
&
{ [name: string]: X3DNodeProxy } // catch all;

// NODES END
