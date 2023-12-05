// Type definitions for X3D
// Project: X_ITE
// Definitions by: Glen Whitney <https://github.com/gwhitney>, Holger Seelig <https://github.com/create3000>

// Handle both importing via UMD and modules:
export default X3D;
export = X3D;

declare const X3D: X3D;

interface X3D
{
   (callback?: () => void, fallback?: (error: Error) => void): Promise <void>;

   noConflict (): X3D;
   createBrowser (): X3DCanvasElement;
   getBrowser (via?: string | X3DCanvasElement): X3DBrowser;

   X3DConstants: X3DConstants;

   SFBool: typeof SFBool;
   SFColor: typeof SFColor;
   SFColorRGBA: typeof SFColorRGBA;
   SFDouble: typeof SFDouble;
   SFFloat: typeof SFFloat;
   SFImage: typeof SFImage;
   SFInt32: typeof SFInt32;
   SFMatrix3d: typeof SFMatrix3;
   SFMatrix3f: typeof SFMatrix3;
   SFMatrix4d: typeof SFMatrix4;
   SFMatrix4f: typeof SFMatrix4;
   // SFNode: typeof SFNode;
   SFRotation: typeof SFRotation;
   SFString: typeof SFString;
   SFTime: typeof SFTime;
   SFVec2d: typeof SFVec2;
   SFVec2f: typeof SFVec2;
   SFVec3d: typeof SFVec3;
   SFVec3f: typeof SFVec3;
   SFVec4d: typeof SFVec4;
   SFVec4f: typeof SFVec4;

   // X3DArrayField:
   MFBool: typeof X3DArrayField <boolean>;
   MFColor: typeof X3DArrayField <SFColor>;
   MFColorRGBA: typeof X3DArrayField <SFColorRGBA>;
   MFDouble: typeof X3DArrayField <number>;
   MFFloat: typeof X3DArrayField <number>;
   MFImage: typeof X3DArrayField <SFImage>;
   MFInt32: typeof X3DArrayField <number>;
   MFMatrix3d: typeof X3DArrayField <SFMatrix3>;
   MFMatrix3f: typeof X3DArrayField <SFMatrix3>;
   MFMatrix4d: typeof X3DArrayField <SFMatrix4>;
   MFMatrix4f: typeof X3DArrayField <SFMatrix4>;
   MFNode: typeof X3DArrayField <SFNode>;
   MFRotation: typeof X3DArrayField <SFRotation>;
   MFString: typeof X3DArrayField <string>;
   MFTime: typeof X3DArrayField <SFTime>;
   MFVec2d: typeof X3DArrayField <SFVec2>;
   MFVec2f: typeof X3DArrayField <SFVec2>;
   MFVec3d: typeof X3DArrayField <SFVec3>;
   MFVec3f: typeof X3DArrayField <SFVec3>;
   MFVec4d: typeof X3DArrayField <SFVec4>;
   MFVec4f: typeof X3DArrayField <SFVec4>;
}

interface X3DCanvasElement extends HTMLElement
{
   readonly browser: X3DBrowser;
}

type JSONValue =
   | string
   | number
   | boolean
   | null
   | JSONValue []
   | {[key: string]: JSONValue}

interface JSONObject
{
   [k: string]: JSONValue
}

type BrowserProperty = "ABSTRACT_NODES"
   | "CONCRETE_NODES"
   | "EXTERNAL_INTERACTIONS"
   | "PROTOTYPE_CREATE"
   | "DOM_IMPORT"
   | "XML_ENCODING"
   | "CLASSIC_VRML_ENCODING"
   | "BINARY_ENCOIDING";

type QualityLevels = "LOW" | "MEDIUM" | "HIGH";
type BrowserOption = {
   Antialiased:                  boolean,
   Dashboard:                    boolean,
   Rubberband:                   boolean,
   EnableInlineViewpoints:       boolean,
   MotionBlur:                   boolean,
   PrimitiveQuality:             QualityLevels,
   QualityWhenMoving:            QualityLevels | "SAME",
   Shading:	                     "POINT" | "WIREFRAME" | "FLAT" | "GOURAUD" | "PHONG",
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
   Timings:                      boolean
}

type RenderingProperty = {
   Shading:	               BrowserOption ["Shading"],
   MaxTextureSize:         number,
   TextureUnits:           number,
   MaxLights:              number,
   Antialiased:            boolean,
   ColorDepth:             number,
   TextureMemory:          number,
   ContentScale:           number,
   MaxSamples:             number,
   Multisampling:          number,
   LogarithmicDepthBuffer: boolean
}

type BrowserCallback = (event: number) => void; // event is a Browser Event Constant

interface X3DBrowser
{
   name: string;
   version: string;
   providerURL: string;
   currentSpeed: number;
   currentFrameRate: number;
   description: string;
   readonly supportedComponents: ComponentInfoArray;
   readonly supportedProfiles: ProfileInfoArray;
   baseURL: string;
   currentScene: X3DScene;

   replaceWorld (scene: X3DScene): Promise <void>;
   createX3DFromString (x3dSyntax: string): Promise <X3DScene>;
   createX3DFromURL (url: X3DArrayField <string>): Promise <X3DScene>;
   createX3DFromURL (url: X3DArrayField <string>, node: SFNode, fieldName: string): void;
   loadURL (url: X3DArrayField <string>, parameter?: X3DArrayField <string>): Promise <void>;
   importDocument (dom: HTMLElement | string): Promise <X3DScene>;
   importJS (json: string | JSONObject): Promise <X3DScene>;
   getBrowserProperty (prop: BrowserProperty): boolean;
   getBrowserOption <T extends keyof BrowserOption> (name: T): BrowserOption [T];
   setBrowserOption <T extends keyof BrowserOption> (name: T, value: BrowserOption [T]): void;
   getRenderingProperty <T extends keyof RenderingProperty> (name: T): RenderingProperty [T];
   getContextMenu (): ContextMenu;
   addBrowserCallback (key: unknown, cb?: BrowserCallback): void;
   addBrowserCallback (key: unknown, event: number, cb?: BrowserCallback): void;
   removeBrowserCallback (key: unknown, event?: number): void;
   viewAll (layer?: SFNode, transitionTime?: number): void;
   nextViewpoint (layer?: SFNode): void;
   previousViewpoint (layer?: SFNode): void;
   firstViewpoint (layer?: SFNode): void;
   lastViewpoint (layer?: SFNode): void;
   changeViewpoint (name: string): void;
   changeViewpoint (layer: SFNode, name: string): void;
   print (thing: unknown): void;
   printLn (thing: unknown): void;

   // VRML methods
   getName (): string;
   getVersion (): string;
   getCurrentSpeed (): number;
   getCurrentFrameRate (): number;
   getWorldURL (): string;
   replaceWorld (nodes: X3DArrayField <SFNode>): string;
   createVrmlFromString (vrmlSyntax: string): X3DArrayField <SFNode>;
   createVrmlFromURL (url: X3DArrayField <string>, node: SFNode, fieldName: string): void;
   addRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   deleteRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   loadURL (url: X3DArrayField <string>, parameter?: X3DArrayField <string>): void;
   setDescription (description: string): void;
}

type X3DInfoArray <T> = {[index: number]: T, length: number}

type ComponentInfoArray = X3DInfoArray <ComponentInfo>;
interface ComponentInfo
{
   readonly name: string;
   readonly level: number;
   readonly title: string;
   readonly providerURL: string;
}

type ProfileInfoArray = X3DInfoArray <ProfileInfo>;
interface ProfileInfo
{
   readonly name: string;
   readonly title: string;
   readonly providerURL: string;
   readonly components: ComponentInfoArray
}

type JQueryCtxMenuOpts = {
   selector: string,
   items: UserMenuItems,
   appendTo?: string | HTMLElement,
   triggers: string,
   hideOnSecondTrigger?: boolean,
   selectableSubMenu?: boolean,
   reposition?: boolean,
   delay?: number,
   autoHide?: boolean,
   zindex?: number | (($trigger: string, opt: JQueryCtxMenuOpts) => number)
   className?: string,
   classNames?: Record <string, string>,
   animation?: {duration: number, show: string, hide: string},
   events?: Record <string, (opt: JQueryCtxMenuOpts) => boolean>,
   position?: (opt: unknown, x?: number|string, y?: number|string) => void,
   determinePosition?: (menu: unknown) => void,
   callback?: MenuCallback,
   build?: ($triggerElement: unknown, e: Event) => JQueryCtxMenuOpts,
   itemClickEvent?: string
}

type UserMenuCallback = () => UserMenuItems
type UserMenuItems = Record <string, UserMenuItem>
type MenuCallback = (itemKey: string, opt: JQueryCtxMenuOpts, event: Event) => (boolean | void)
type MenuIconCallback = (opt: JQueryCtxMenuOpts, $itemElement: HTMLElement,itemKey: string, item: unknown) => string
type MenuBoolCallback = (itemKey: string, opt: JQueryCtxMenuOpts) => boolean
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
   dataAttr?: Record <string, string>
}

interface ContextMenu
{
   getUserMenu (): UserMenuCallback;
   setUserMenu (cb: UserMenuCallback): void;
}

interface X3DScene
{
   readonly specificationVersion: string;
   readonly encoding: "ASCII" | "VRML" | "XML" | "BINARY" | "SCRIPTED" | "BIFS" | "NONE";
   readonly profile: ProfileInfo;
   readonly components: ComponentInfoArray;
   readonly units: UnitInfoArray;
   readonly worldURL: string;
   readonly baseURL: string;
   rootNodes: X3DArrayField <SFNode>;
   readonly protos: ProtoDeclarationArray;
   readonly externprotos: ExternProtoDeclarationArray;
   readonly routes: RouteArray;

   // ExecutionContext methods. I didn"t split these out because I
   // didn"t see a place in the interface where it mattered, but
   // perhaps there should be a base class with just these...
   createNode <T extends keyof SpecializeNodeType> (spec: T): SpecializeNodeType [T];
   createProto (protoName: string): SFNode;
   getNamedNode (name: string): SFNode;
   updateNamedNode (name: string, node: SFNode): void;
   removeNamedNode (name: string): void;
   getImportedNode (importedName: string): SFNode;
   updateImportedNode (
      inlineNode: SFNode, exportedName: string, importedName: string): void;
   removeImportedNode (importedName: string): void;
   addRoute (sourceNode: SFNode, sourceField: string,
            destinationNode: SFNode, destinationField: string): X3DRoute;
   deleteRoute (route: X3DRoute): void;

   // X3DScene methods:
   getMetaData (name: string): string [];
   setMetaData (name: string, value: string | string []): void;
   addMetaData (name: string, value: string): void;
   removeMetaData (name: string): void;
   addRootNode (node: SFNode): void;
   removeRootNode (node: SFNode): void;
   getExportedNode (exportedName: string): SFNode;
   updateExportedNode (exportedName: string, node: SFNode): void;
   removeExportedNode (exportedName: string): void;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type VRMLOptions = {
   style?: string,
   indent?: string,
   precision?: number,
   doublePrecision?: number,
   html?: boolean,
   closingTags?: boolean
}

type UnitInfoArray = X3DInfoArray <UnitInfo>;
interface UnitInfo
{
   readonly category: string;
   readonly name: string;
   readonly conversionFactor: number;
}

type ProtoDeclarationArray = X3DInfoArray <X3DProtoDeclaration>;
interface X3DProtoDeclaration
{
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   isExternProto: false;
   newInstance (): SFNode;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type ExternProtoDeclarationArray = X3DInfoArray <X3DExternProtoDeclaration>;
interface X3DExternProtoDeclaration
{
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   readonly urls: X3DArrayField <string>;
   isExternProto: false;
   readonly loadState: number; // A Load State Constant from X3DConstants
   newInstance (): SFNode;
   loadNow (): Promise <void>;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type RouteArray = X3DInfoArray <X3DRoute>;
interface X3DRoute
{
   sourceNode: SFNode;
   sourceField: string;
   destinationNode: SFNode;
   destinationField: string;
}

// would be better to make these enums...
interface X3DConstants
{
   // Browser Event Constants
   CONNECTION_ERROR: number;
   BROWSER_EVENT: number;
   INITIALIZED_EVENT: number;
   SHUTDOWN_EVENT: number;
   INITIALIZED_ERROR: number;

   // Load State Constants
   NOT_STARTED_STATE: number;
   IN_PROGRESS_STATE: number;
   COMPLETE_STATE: number;
   FAILED_STATE: number;

   // Access Type Constants
   initializeOnly: 0b001;
   inputOnly: 0b010;
   outputOnly: 0b100;
   inputOutput: 0b111;

   // Field Type Constants
   SFBool: number;
   SFColor: number;
   SFColorRGBA: number;
   SFDouble: number;
   SFFloat: number;
   SFImage: number;
   SFInt32: number;
   SFMatrix3d: number;
   SFMatrix3f: number;
   SFMatrix4d: number;
   SFMatrix4f: number;
   SFNode: number;
   SFRotation: number;
   SFString: number;
   SFTime: number;
   SFVec2d: number;
   SFVec2f: number;
   SFVec3d: number;
   SFVec3f: number;
   SFVec4d: number;
   SFVec4f: number;
   MFBool: number;
   MFColor: number;
   MFColorRGBA: number;
   MFDouble: number;
   MFFloat: number;
   MFImage: number;
   MFInt32: number;
   MFMatrix3d: number;
   MFMatrix3f: number;
   MFMatrix4d: number;
   MFMatrix4f: number;
   MFNode: number;
   MFRotation: number;
   MFString: number;
   MFTime: number;
   MFVec2d: number;
   MFVec2f: number;
   MFVec3d: number;
   MFVec3f: number;
   MFVec4d: number;
   MFVec4f: number;

   // Concrete Node Types
   AcousticProperties: number;
   Analyser: number;
   Anchor: number;
   Appearance: number;
   AudioClip: number;
   AudioDestination: number;
   Background: number;
   Billboard: number;
   BiquadFilter: number;
   Box: number;
   BufferAudioSource: number;
   ChannelMerger: number;
   ChannelSelector: number;
   ChannelSplitter: number;
   ClipPlane: number;
   Collision: number;
   Color: number;
   ColorChaser: number;
   ColorDamper: number;
   ColorInterpolator: number;
   ColorRGBA: number;
   ComposedShader: number;
   Cone: number;
   Convolver: number;
   Coordinate: number;
   CoordinateChaser: number;
   CoordinateDamper: number;
   CoordinateInterpolator: number;
   CoordinateInterpolator2D: number;
   Cylinder: number;
   CylinderSensor: number;
   Delay: number;
   DirectionalLight: number;
   DynamicsCompressor: number;
   EaseInEaseOut: number;
   ElevationGrid: number;
   EnvironmentLight: number;
   Extrusion: number;
   FillProperties: number;
   FloatVertexAttribute: number;
   Fog: number;
   FogCoordinate: number;
   FontStyle: number;
   Gain: number;
   Group: number;
   ImageTexture: number;
   IndexedFaceSet: number;
   IndexedLineSet: number;
   IndexedTriangleFanSet: number;
   IndexedTriangleSet: number;
   IndexedTriangleStripSet: number;
   Inline: number;
   LOD: number;
   Layer: number;
   LayerSet: number;
   LineProperties: number;
   LineSet: number;
   ListenerPointSource: number;
   LoadSensor: number;
   LocalFog: number;
   Material: number;
   Matrix3VertexAttribute: number;
   Matrix4VertexAttribute: number;
   MetadataBoolean: number;
   MetadataDouble: number;
   MetadataFloat: number;
   MetadataInteger: number;
   MetadataSet: number;
   MetadataString: number;
   MicrophoneSource: number;
   MovieTexture: number;
   MultiTexture: number;
   MultiTextureCoordinate: number;
   MultiTextureTransform: number;
   NavigationInfo: number;
   Normal: number;
   NormalInterpolator: number;
   OrientationChaser: number;
   OrientationDamper: number;
   OrientationInterpolator: number;
   OrthoViewpoint: number;
   OscillatorSource: number;
   PackagedShader: number;
   PeriodicWave: number;
   PhysicalMaterial: number;
   PixelTexture: number;
   PlaneSensor: number;
   PointLight: number;
   PointProperties: number;
   PointSet: number;
   PositionChaser: number;
   PositionChaser2D: number;
   PositionDamper: number;
   PositionDamper2D: number;
   PositionInterpolator: number;
   PositionInterpolator2D: number;
   ProgramShader: number;
   ProximitySensor: number;
   ScalarChaser: number;
   ScalarDamper: number;
   ScalarInterpolator: number;
   Script: number;
   ShaderPart: number;
   ShaderProgram: number;
   Shape: number;
   Sound: number;
   SpatialSound: number;
   Sphere: number;
   SphereSensor: number;
   SplinePositionInterpolator: number;
   SplinePositionInterpolator2D: number;
   SplineScalarInterpolator: number;
   SpotLight: number;
   SquadOrientationInterpolator: number;
   StaticGroup: number;
   StreamAudioDestination: number;
   StreamAudioSource: number;
   Switch: number;
   TexCoordChaser2D: number;
   TexCoordDamper2D: number;
   Text: number;
   TextureBackground: number;
   TextureCoordinate: number;
   TextureCoordinateGenerator: number;
   TextureProperties: number;
   TextureTransform: number;
   TimeSensor: number;
   TouchSensor: number;
   Transform: number;
   TransformSensor: number;
   TriangleFanSet: number;
   TriangleSet: number;
   TriangleStripSet: number;
   TwoSidedMaterial: number;
   UnlitMaterial: number;
   Viewpoint: number;
   ViewpointGroup: number;
   Viewport: number;
   VisibilitySensor: number;
   VrmlMatrix: number;
   WaveShaper: number;
   WorldInfo: number;

   // Abstract Node Types
   X3DAppearanceChildNode: number;
   X3DAppearanceNode: number;
   X3DBackgroundNode: number;
   X3DBaseNode: number;
   X3DBindableNode: number;
   X3DBoundedObject: number;
   X3DBrowser: number;
   X3DChaserNode: number;
   X3DChildNode: number;
   X3DColorNode: number;
   X3DComposedGeometryNode: number;
   X3DCoordinateNode: number;
   X3DDamperNode: number;
   X3DDragSensorNode: number;
   X3DEnvironmentalSensorNode: number;
   X3DExecutionContext: number;
   X3DExternProtoDeclaration: number;
   X3DFogObject: number;
   X3DFollowerNode: number;
   X3DFontStyleNode: number;
   X3DGeometricPropertyNode: number;
   X3DGeometryNode: number;
   X3DGroupingNode: number;
   X3DInfoNode: number;
   X3DInterpolatorNode: number;
   X3DLayerNode: number;
   X3DLightNode: number;
   X3DLineGeometryNode: number;
   X3DMaterialNode: number;
   X3DMetadataObject: number;
   X3DNetworkSensorNode: number;
   X3DNode: number;
   X3DNormalNode: number;
   X3DOneSidedMaterialNode: number;
   X3DPointingDeviceSensorNode: number;
   X3DProgrammableShaderObject: number;
   X3DProtoDeclaration: number;
   X3DProtoDeclarationNode: number;
   X3DPrototypeInstance: number;
   X3DScene: number;
   X3DScriptNode: number;
   X3DSensorNode: number;
   X3DShaderNode: number;
   X3DShapeNode: number;
   X3DSingleTextureCoordinateNode: number;
   X3DSingleTextureNode: number;
   X3DSingleTextureTransformNode: number;
   X3DSoundChannelNode: number;
   X3DSoundDestinationNode: number;
   X3DSoundNode: number;
   X3DSoundProcessingNode: number;
   X3DSoundSourceNode: number;
   X3DTexture2DNode: number;
   X3DTextureCoordinateNode: number;
   X3DTextureNode: number;
   X3DTextureTransformNode: number;
   X3DTimeDependentNode: number;
   X3DTouchSensorNode: number;
   X3DTransformMatrix3DNode: number;
   X3DTransformNode: number;
   X3DUrlObject: number;
   X3DVertexAttributeNode: number;
   X3DViewpointNode: number;
   X3DViewportNode: number;
   X3DWorld: number;
}

type FieldDefinitionArray = X3DInfoArray <X3DFieldDefinition>;
type X3DFieldDefinition = {
   accessType: number,
   dataType: string,
   name: string,
   value: X3DField
}

type FieldCallback = (value: unknown) => void

declare class X3DField
{
   equals (other: X3DField): boolean;
   assign (other: X3DField): void;
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
   addReferencesCallback (key: unknown, callback: FieldCallback): void;
   removeReferencesCallback (key: unknown): void;
   getReferencesCallbacks (): Map <unknown, FieldCallback>;
   addFieldInterest (other: X3DField): void;
   removeFieldInterest (other: X3DField): void;
   getFieldInterest (): Set <X3DField>
   addFieldCallback (key: unknown, callback: FieldCallback): void;
   removeFieldCallback (key: unknown): void;
   getFieldCallbacks (): Map <unknown, FieldCallback>;
   addInputRoute (route: X3DRoute): void;
   removeInputRoute (route: X3DRoute): void;
   getInputRoutes (): Set <X3DRoute>;
   addOutputRoute (route: X3DRoute): void;
   removeOutputRoute (route: X3DRoute): void;
   getOutputRoutes (): Set <X3DRoute>;
   addRouteCallback (key: unknown, callback: FieldCallback): void;
   removeRouteCallback (key: unknown): void;
   getRouteCallbacks (): Map <unknown, FieldCallback>;
   dispose (): void;
}

class SFBool extends X3DField
{
   static typeName: "SFBool";
   constructor (arg?: unknown);
   copy (): SFBool;
   valueOf (): boolean;
}

class SFColor extends X3DField
{
   static typeName: "SFColor";
   constructor (r?: number, g?: number, b?: number);
   r: number;
   g: number;
   b: number;
   copy (): SFColor;
   getHSV (result: number []): number [];
   setHSV (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColor;
}

class SFColorRGBA extends X3DField
{
   static typeName: "SFColorRGBA";
   constructor (r?: number, g?: number, b?: number, a?: number);
   r: number;
   g: number;
   b: number;
   a: number;
   copy (): SFColorRGBA;
   getHSVA (result: number []): number [];
   setHSVA (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColorRGBA;
}

class SFDouble extends X3DField
{
   static typeName: "SFDouble";
   constructor (arg?: unknown);
   copy (): SFDouble;
   valueOf (): number;
}

class SFFloat extends X3DField
{
   static typeName: "SFFloat";
   constructor (arg?: unknown);
   copy (): SFFloat;
   valueOf (): number;
}

class SFImage extends X3DField
{
   static typeName: "SFImage";
   constructor (width?: number, height?: number, components?: number, array?: X3DArrayField <number>);
   x: number;
   y: number;
   width: number;
   height: number;
   comp: number;
   array: number [];
   copy (): SFImage;
}

class SFInt32 extends X3DField
{
   static typeName: "SFInt32";
   constructor (val?: number);
   copy (): SFInt32;
}

class SFMatrix3 extends X3DField
{
   constructor ();
   constructor (r1: SFVec3, r2: SFVec3, r3: SFVec3);
   constructor (a: number, b: number, c: number,
                d: number, e: number, f: number,
                g: number, h: number, i: number);
   copy (): SFMatrix3;
   setTransform (translation: SFVec2, rotation: number, scaleFactor: SFVec2, scaleOrientation: number, center: SFVec2): void;
   getTransform (translation: SFVec2, rotation: SFDouble, scaleFactor: SFVec2, scaleOrientation: SFDouble, center: SFVec2): void;
   determinant (): number;
   inverse (): SFMatrix3;
   transpose (): SFMatrix3;
   multLeft (A: SFMatrix3): SFMatrix3;
   multRight (B: SFMatrix3): SFMatrix3;
   multVecMatrix (row: SFVec2): SFVec2;
   multVecMatrix (row: SFVec3): SFVec3;
   multMatrixVec (col: SFVec2): SFVec2;
   multMatrixVec (col: SFVec3): SFVec3;
   multDirMatrix (row: SFVec2): SFVec2;
   multMatrixDir (col: SFVec2): SFVec2;
}

class SFMatrix4 extends X3DField
{
   constructor ();
   constructor (r1: SFVec4, r2: SFVec4, r3: SFVec4, r4: SFVec4);
   constructor (a: number, b: number, c: number, d: number,
                e: number, f: number, g: number, h: number,
                i: number, j: number, k: number, l: number,
                m: number, n: number, o: number, p: number);
   copy (): SFMatrix4;
   setTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   getTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   determinant (): number;
   inverse (): SFMatrix4;
   transpose (): SFMatrix4;
   multLeft (A: SFMatrix4): SFMatrix4;
   multRight (B: SFMatrix4): SFMatrix4;
   multVecMatrix (row: SFVec4): SFVec4;
   multVecMatrix (row: SFVec3): SFVec3;
   multMatrixVec (col: SFVec4): SFVec4;
   multMatrixVec (col: SFVec3): SFVec3;
   multDirMatrix (row: SFVec3): SFVec3;
   multMatrixDir (col: SFVec3): SFVec3;
}

interface SFNode extends X3DField
{
   // constructor (vrmlSyntax: string); // throws error, anyway

   // Each subclass of SFNode for the different node types
   // has various properties, that will be defined for
   // each one below. But as far as I can see, they all have metadata
   // properties:
   metadata: SFNode;

   copy (): SFNode;
   addFieldCallback (key: unknown, callback: FieldCallback): void;
   addFieldCallback (name: string, key: unknown, callback: (value: unknown) => void): void;
   getFieldDefinitions (): FieldDefinitionArray;
   getField (name: string): X3DField;
   getNodeName (): string;
   getNodeDisplayName (): string;
   getNodeType (): number [];
   getNodeTypeName (): string;
   getNodeUserData (key: unknown): unknown;
   removeFieldCallback (key: unknown): void;
   removeFieldCallback (name: string, key: unknown): void;
   removeNodeUserData (key: unknown): void;
   setNodeUserData (key: unknown, data: unknown): unknown;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

class SFRotation extends X3DField
{
   constructor ();
   constructor (x: number, y: number, z: number, angle: number);
   constructor (axis: SFVec3, angle: number);
   constructor (from: SFVec3, to: SFVec3);
   constructor (matrix: SFMatrix3);

   x: number;
   y: number;
   z: number;
   angle: number;

   copy (): SFRotation;

   getAxis (): SFVec3;
   getMatrix (): SFMatrix3;
   inverse (): SFRotation;
   multiply (other: SFRotation): SFRotation;
   multVec (subject: SFVec3): SFVec3;
   setAxis (axis: SFVec3): void;
   setMatrix (matrix: SFMatrix3): void;
   slerp (destination: SFRotation, t: number): SFRotation;
}

class SFString extends X3DField
{
   constructor (arg?: unknown);
   copy (): SFString;
   valueOf (): string;
   length: number;
}

class SFTime extends X3DField
{
   constructor (arg?: unknown);
   copy (): SFTime;
   valueOf (): number;
}

class SFVec2 extends X3DField
{
   constructor (x?: number, y?: number);

   x: number;
   y: number;

   copy (): SFVec2;

   abs (): SFVec2;
   add (other: SFVec2): SFVec2;
   distance (other: SFVec2): number;
   divide (denominator: number): SFVec2;
   divVec (other: SFVec2): SFVec2;
   dot (other: SFVec2): number;
   inverse (): SFVec2;
   length (): number;
   lerp (destination: SFVec2, t: number): SFVec2;
   min (other: SFVec2): SFVec2;
   max (other: SFVec2): SFVec2;
   multiply (factor: number): SFVec2;
   multVec (other: SFVec2): SFVec2;
   negate (): SFVec2;
   normalize (): SFVec2;
   subtract (other: SFVec2): SFVec2;
}

class SFVec3 extends X3DField
{
   constructor (x?: number, y?: number, z?: number);

   x: number;
   y: number;
   z: number;

   copy (): SFVec3;

   abs (): SFVec3;
   add (other: SFVec3): SFVec3;
   cross (other: SFVec3): SFVec3;
   distance (other: SFVec3): number;
   divide (denominator: number): SFVec3;
   divVec (other: SFVec3): SFVec3;
   dot (other: SFVec3): number;
   inverse (): SFVec3;
   length (): number;
   lerp (destination: SFVec3, t: number): SFVec3;
   min (other: SFVec3): SFVec3;
   max (other: SFVec3): SFVec3;
   multiply (factor: number): SFVec3;
   multVec (other: SFVec3): SFVec3;
   negate (): SFVec3;
   normalize (): SFVec3;
   subtract (other: SFVec3): SFVec3;
}

class SFVec4 extends X3DField
{
   constructor (x?: number, y?: number, z?: number, w?: number);

   x: number;
   y: number;
   z: number;
   w: number;

   copy (): SFVec4;

   abs (): SFVec4;
   add (other: SFVec4): SFVec4;
   distance (other: SFVec4): number;
   divide (denominator: number): SFVec4;
   divVec (other: SFVec4): SFVec4;
   dot (other: SFVec4): number;
   inverse (): SFVec4;
   length (): number;
   lerp (destination: SFVec4, t: number): SFVec4;
   min (other: SFVec4): SFVec4;
   max (other: SFVec4): SFVec4;
   multiply (factor: number): SFVec4;
   multVec (other: SFVec4): SFVec4;
   negate (): SFVec4;
   normalize (): SFVec4;
   subtract (other: SFVec4): SFVec4;
}

type ArrayTest <T> = (elt: T, ix: boolean, arr: X3DArrayField <T>) => boolean
type ArrayAction <T> = (elt: T, ix: boolean, arr: X3DArrayField <T>) => void
type ArrayReducer <T,U> =
   (acc: U, elt: T, ix: number, arr: X3DArrayField <T>) => U
class X3DArrayField <T> extends X3DField
{
   constructor (...elts: T []);
   [index: number]: T;
   length: number;
   at (index: number): T;
   entries (): IterableIterator <[number, T]>;
   every (predicate: ArrayTest <T>): boolean;
   fill (val: T, start?: number, end?: number): X3DArrayField <T>;
   filter (predicate: ArrayTest <T>): X3DArrayField <T>;
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
   map <U> (f: (elt: T, ix: number, arr: X3DArrayField <T>) => U): U [];
   pop (): T;
   push (...elts: T []): number;
   reduce <U> (f: ArrayReducer <T,U>, initial?: U): U;
   reduceRight <U> (f: ArrayReducer <T,U>, initial?: U): U;
   reverse (): X3DArrayField <T>;
   shift (): T;
   slice (start?: number, end?: number): X3DArrayField <T>;
   some (predicate: ArrayTest <T>): boolean;
   sort (comparator?: (a: T, b: T) => number): X3DArrayField <T>;
   splice (start: number, deleteCount: number,
          ...rest: T []) : X3DArrayField <T>;
   toReversed (): X3DArrayField <T>;
   toSorted (comparator?: (a: T, b: T) => number): X3DArrayField <T>;
   toSpliced (start: number, deleteCount: number,
             ...rest: T []) : X3DArrayField <T>;
   unshift (...elts: T []): number;
   values (): IterableIterator <T>;
   with (index: number, value: T): X3DArrayField <T>;
}

interface SFNodeAcousticProperties extends SFNode
{
   description: string;
   enabled: boolean;
   absorption: number;
   refraction: number;
   diffuse: number;
   specular: number;
}

interface SFNodeAnalyser extends SFNode
{
   description: string;
   enabled: boolean;
   gain: number;
   fftSize: number;
   minDecibels: number;
   maxDecibels: number;
   smoothingTimeConstant: number;
   tailTime: SFTime;
}

interface Positioner extends SFNode
{
   visible: boolean;
   bboxDisplay: boolean;
   bboxSize: SFVec3;
   bboxCenter: SFVec3;
}

interface GroupingFields
{
   addChildren: X3DArrayField <SFNode>;
   removeChildren: X3DArrayField <SFNode>;
   children: X3DArrayField <SFNode>;
}

interface X3DGroupingNode extends Positioner, GroupingFields
{ }

interface URLFields
{
   description: string;
   load: boolean;
   url: X3DArrayField <string>;
   autoRefresh: SFTime;
   autoRefreshTimeLimit: SFTime;
}

interface SFNodeAnchor extends X3DGroupingNode
{
   parameter: X3DArrayField <string>;
}

interface SFNodeAppearance extends SFNode
{
   acousticProperties: SFNodeAcousticProperties;
   alphaMode: "AUTO" | "OPAQUE" | "MASK" | "BLEND";
   alphaCutoff: number;
   pointProperties: SFNodePointProperties;
   lineProperties: SFNodeLineProperties;
   fillProperties: SFNodeFillProperties;
   material: SFNodeMaterial;
   backMaterial: SFNodeMaterial;
   texture: SFNode;
   textureTransform: SFNodeTextureTransform;
   shaders: X3DArrayField <SFNode>;
   blendMode: SFNodeBlendMode;
}

interface X3DTimeDependentNode extends SFNode
{
   startTime: SFTime;
   resumeTime: SFTime;
   pauseTime: SFTime;
   stopTime: SFTime;
   isPaused: boolean;
   isActive: boolean;
   elapsedTime: SFTime;
}

interface SFNodeAudioClip extends X3DTimeDependentNode, URLFields
{
   enabled: boolean;
   gain: number;
   pitch: number;
   loop: boolean;
   duration_changed: SFTime;
}

interface ChannelFields extends SFNode
{
   description: string;
   enabled: boolean;
   gain: number;
   channelCount: number;
   channelCountMode: "MAX" | "CLAMPED-MAX" | "EXPLICIT";
   channelInterpretation: "SPEAKERS" | "DISCRETE";
}

interface X3DSoundDestinationNode extends ChannelFields
{
   mediaDeviceId: string;
   isActive: boolean;
   children: X3DArrayField <SFNode>;
}

interface SFNodeAudioDestination extends X3DSoundDestinationNode
{
   maxChannelCount: number;
}

interface X3DBindableNode extends SFNode
{
   set_bind: boolean;
   isBound: boolean;
   bindTime: SFTime;
}

interface X3DBackgroundNode extends X3DBindableNode
{
   skyAngle: X3DArrayField <number>;
   skyColor: X3DArrayField <SFColor>;
   groundAngle: X3DArrayField <number>;
   groundColor: X3DArrayField <SFColor>;
   transparency: number;
}

interface SFNodeBackground extends X3DBackgroundNode
{
   frontUrl: X3DArrayField <string>;
   backUrl: X3DArrayField <string>;
   leftUrl: X3DArrayField <string>;
   rightUrl: X3DArrayField <string>;
   topUrl: X3DArrayField <string>;
   bottomUrl: X3DArrayField <string>;
}

interface SFNodeBillboard extends X3DGroupingNode
{
   axisOfRotation: SFVec3;
}

interface SFNodeBiquadFilter extends X3DTimeDependentNode, ChannelFields
{
   frequency: number;
   detune: number;
   type: "LOWPASS" | "HIGHPASS" | "BANDPASS"
      | "LOWSHELF" | "HIGHSHELF" | "PEAKING" | "NOTCH" |  "ALLPASS";
   qualityFactor: number;
   tailTime: SFTime;
   children: X3DArrayField <SFNode>;
}

type BlendFactor = "ZERO" | "ONE"
   | "SRC_COLOR"      | "ONE_MINUS_SRC_COLOR"
   | "DST_COLOR"      | "ONE_MINUS_DST_COLOR"
   | "SRC_ALPHA"      | "ONE_MINUS_SRC_ALPHA"
   | "DST_ALPHA"      | "ONE_MINUS_DST_ALPHA"
   | "CONSTANT_COLOR" | "ONE_MINUS_CONSTANT_COLOR"
   | "CONSTANT_ALPHA" | "ONE_MINUS_CONSTANT_ALPHA"

type BlendEquation = "FUNC_ADD" | "FUNC_SUBTRACT" | "FUNC_REVERSE_SUBTRACT"

interface SFNodeBlendMode extends SFNode
{
   blendColor: SFColorRGBA;
   sourceColorFactor: BlendFactor;
   sourceAlphaFactor: BlendFactor;
   destinationColorFactor: BlendFactor;
   destinationAlphaFactor: BlendFactor;
   colorEquation: BlendEquation;
   alphaEquation: BlendEquation;
}

interface SFNodeBox extends SFNode
{
   size: SFVec3;
   solid: boolean;
}

interface SFNodeBufferAudioSource
   extends X3DTimeDependentNode, ChannelFields, URLFields
{
      detune: number;
      buffer: X3DArrayField <number>;
      bufferDuration: SFTime;
      bufferLength: number;
      numberOfChannels: number;
      sampleRate: number;
      playbackRate: number;
      loopStart: SFTime;
      loopEnd: SFTime;
      loop: boolean;
   }

interface SFNodeChannelMerger extends ChannelFields
{
   children: X3DArrayField <SFNode>;
}

interface SFNodeChannelSelector extends ChannelFields
{
   channelSelection: number;
   children: X3DArrayField <SFNode>;
}

interface SFNodeChannelSplitter extends ChannelFields
{
   children: X3DArrayField <SFNode>;
   outputs:  X3DArrayField <SFNode>;
}

interface SFNodeClipPlane extends SFNode
{
   enabled: boolean;
   plane: SFVec4;
}

interface SFNodeCollision extends X3DGroupingNode
{
   enabled: boolean;
   isActive: boolean;
   collideTime: SFTime;
   proxy: SFNode;
}

interface SFNodeColor extends SFNode
{
   color: X3DArrayField <SFColor>;
}

interface SFNodeColorRGBA extends SFNode
{
   color: X3DArrayField <SFColorRGBA>;
}

interface X3DChaserNode <T> extends SFNode
{
   set_value: T;
   set_destination: T;
   initialValue: T;
   initialDestination: T;
   duration: SFTime;
   isActive: boolean;
   value_changed: T;
}

interface X3DDamperNode <T> extends SFNode
{
   set_value: T;
   set_destination: T;
   initialValue: T;
   initialDestination: T;
   order: number;
   tau: SFTime;
   tolerance: number;
   isActive: boolean;
   value_changed: T;
}

interface X3DInterpolatorNode <T,V> extends SFNode
{
   set_fraction: number;
   key: X3DArrayField <number>;
   keyValue: X3DArrayField <T>;
   value_changed: V;
}

interface X3DShaderNode extends SFNode
{
   activate: boolean;
   isSelected: boolean;
   isValid: boolean;
   language: string;
}

interface SFNodeComposedShader extends X3DShaderNode
{
   parts: X3DArrayField <SFNodeShaderPart>;
}

interface SFNodeCone extends SFNode
{
   side: boolean;
   bottom: boolean;
   height: number;
   bottomRadius: number;
   solid: boolean;
}

interface SFNodeConvolver extends  X3DTimeDependentNode, ChannelFields
{
   buffer: X3DArrayField <number>;
   normalize: boolean;
   tailTime: SFTime;
   children: X3DArrayField <SFNode>;
}

interface SFNodeCoordinate extends SFNode
{
   point: X3DArrayField <SFVec3>;
}

interface SFNodeCylinder extends SFNode
{
   top: boolean;
   side: boolean;
   bottom: boolean;
   height: number;
   radius: number;
   solid: boolean;
}

interface X3DPointingDeviceSensorNode extends SFNode
{
   description: string;
   enabled: boolean;
   isOver: boolean;
   isActive: boolean;
}

interface X3DDragSensorNode extends X3DPointingDeviceSensorNode
{
   offset: number;
   autoOffset: boolean;
   trackPoint_changed: SFVec3;
}

interface SFNodeCylinderSensor extends X3DDragSensorNode
{
   axisRotation: SFRotation,
   diskAngle: number;
   minAngle: number;
   maxAngle: number;
   rotation_changed: SFRotation;
}

interface SFNodeDelay extends X3DTimeDependentNode, ChannelFields
{
   delayTime: SFTime;
   maxDelayTime: SFTime;
   tailTime: SFTime;
   children: X3DArrayField <SFNode>;
}

interface X3DLightNode extends SFNode
{
   global: boolean;
   on: boolean;
   color: SFColor;
   intensity: number;
   ambientIntensity: number;
   shadows: boolean;
   shadowColor: SFColor;
   shadowIntensity: number;
   shadowBias: number;
   shadowMapSize: number;
}

interface SFNodeDirectionalLight extends X3DLightNode
{
   direction: SFVec3;
}

interface SFNodeDynamicsCompressor
   extends X3DTimeDependentNode, ChannelFields
{
      attack: number;
      knee: number;
      ratio: number;
      reduction: number;
      release: SFTime;
      threshold: number;
      tailTime: SFTime;
      children: X3DArrayField <SFNode>;
   }

interface SFNodeEaseInEaseOut extends SFNode
{
   set_fraction: number;
   key: X3DArrayField <number>;
   easeInEaseOut: X3DArrayField <SFVec2>;
   modifiedFraction_changed: number;
}

interface GeometrySubnodes
{
   attrib: X3DArrayField <SFNodeFloatVertexAttribute>;
   fogCoord: SFNodeFogCoordinate;
   color: SFNodeColor | SFNodeColorRGBA;
   normal: SFNodeNormal;
}

interface SFNodeElevationGrid extends SFNode, GeometrySubnodes
{
   set_height: X3DArrayField <number>;
   xDimension: number;
   zDimension: number;
   xSpacing: number;
   zSpacing: number;
   solid: boolean;
   ccw: boolean;
   creaseAngle: number;
   colorPerVertex: boolean;
   normalPerVertex: boolean;
   texCoord: SFNode;
   height: X3DArrayField <number>;
}

interface SFNodeEnvironmentLight extends X3DLightNode
{
   rotation: SFRotation;
   diffuseCoefficients: X3DArrayField <number>;
   diffuse: SFNode;
   diffuseTexture: SFNode;
   specularTexture: SFNode;
}

interface SFNodeExtrusion extends SFNode
{
   set_crossSection: X3DArrayField <SFVec2>;
   set_orientation: X3DArrayField <SFRotation>;
   set_scale: X3DArrayField <SFVec2>;
   set_spine: X3DArrayField <SFVec3>;
   beginCap: boolean;
   endCap: boolean;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   crossSection: X3DArrayField <SFVec2>;
   orientation: X3DArrayField <SFRotation>;
   scale: X3DArrayField <SFVec2>;
   spine: X3DArrayField <SFVec3>;
}

interface SFNodeFillProperties extends SFNode
{
   filled: boolean;
   hatched: boolean;
   hatchStyle: number;
   hatchColor: SFColor;
}

interface SFNodeFloatVertexAttribute extends SFNode
{
   name: string;
   numComponents: number;
   value: X3DArrayField <number>;
}

interface FogCommon extends SFNode
{
   fogType: "LINEAR" | "EXPONENTIAL";
   color: SFColor;
   visibilityRange: number;
}

interface SFNodeFog extends X3DBindableNode, FogCommon
{ }

interface SFNodeFogCoordinate extends SFNode
{
   depth: X3DArrayField <number>;
}

interface SFNodeFontStyle extends SFNode
{
   language: string;
   family: X3DArrayField <string>;
   style:  "PLAIN" | "BOLD" | "ITALIC" | "BOLDITALIC" | "";
   size: number;
   spacing: number;
   horizontal: boolean;
   leftToRight: boolean;
   topToBottom: boolean;
   justify: X3DArrayField <"BEGIN" | "END" | "FIRST" | "MIDDLE" | "">;
}

interface SFNodeGain extends X3DTimeDependentNode, ChannelFields
{
   tailTime: SFTime;
   children: X3DArrayField <SFNode>;
}

interface Texture2DFields
{
   repeatS: boolean;
   repeatT: boolean;
   textureProperties: SFNodeTextureProperties;
}

interface SFNodeImageTexture extends SFNode, URLFields, Texture2DFields
{ }

interface IndexedColorCoord
{
   set_colorIndex: X3DArrayField <number>;
   set_coordIndex: X3DArrayField <number>;
   colorIndex: X3DArrayField <number>;
   coordIndex: X3DArrayField <number>;
   color: SFNodeColor | SFNodeColorRGBA;
   coord: SFNodeCoordinate;
}

interface SFNodeIndexedFaceSet extends SFNodeIndexedLineSet
{
   set_texCoordIndex: X3DArrayField <number>;
   set_normalIndex: X3DArrayField <number>;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   normalPerVertex: boolean;
   texCoordIndex: X3DArrayField <number>;
   normalIndex: X3DArrayField <number>;
   texCoord: SFNode;
}

interface SFNodeIndexedLineSet
   extends SFNode, GeometrySubnodes, IndexedColorCoord
{
      colorPerVertex: boolean;
}

interface SFNodeTriangleSet extends SFNode, GeometrySubnodes
{
   solid: boolean;
   ccw: boolean;
   colorPerVertex: boolean;
   normalPerVertex: boolean;
   texCoord: SFNode;
   coord: SFNodeCoordinate;
}

interface IndexedTriangles extends SFNodeTriangleSet
{
   set_index: X3DArrayField <number>;
   index: X3DArrayField <number>;
}

interface SFNodeInline extends Positioner, URLFields
{
   global: boolean;
}

interface SFNodeLOD extends X3DGroupingNode
{
   forceTransitions: boolean;
   center: SFVec3;
   range: X3DArrayField <number>;
   level_changed: number;
}

interface SFNodeLayer extends SFNode, GroupingFields
{
   pickable: boolean;
   objectType: X3DArrayField <string>;
   visible: boolean;
   viewport: SFNodeViewport;
}

interface SFNodeLayerSet extends SFNode
{
   activeLayer: number;
   order: X3DArrayField <number>;
   layers: X3DArrayField <SFNodeLayer>;
}

interface SFNodeLineProperties extends SFNode
{
   applied: boolean;
   linetype: number;
   linewidthScaleFactor: number;
}

interface SFNodeLineSet extends SFNode, GeometrySubnodes
{
   vertexCount: X3DArrayField <number>;
   coord: SFNodeCoordinate;
}

interface SFNodeListenerPointSource extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   orientation: SFRotation;
   gain: number;
   dopplerEnabled: boolean;
   interauralDistance: number;
   trackCurrentView: boolean;
}

interface SFNodeLoadSensor extends SFNode
{
   enabled: boolean;
   timeOut: SFTime;
   isActive: boolean;
   isLoaded: boolean;
   progress: number;
   loadTime: SFTime;
   children: X3DArrayField <SFNode>;
}

interface SFNodeLocalFog extends FogCommon
{
   enabled: boolean;
}

interface SFNodeUnlitMaterial extends SFNode
{
   emissiveColor: SFColor;
   emissiveTextureMapping: string;
   emissiveTexture: SFNode;
   normalScale: number;
   normalTextureMapping: string;
   normalTexture: SFNode;
   transparency: number;
}

interface MaterialCommon extends SFNodeUnlitMaterial
{
   occlusionStrength: number;
   occlusionTextureMapping: string;
   occlusionTexture: SFNode;
}

interface SFNodeMaterial extends MaterialCommon
{
   ambientIntensity: number;
   ambientTextureMapping: string;
   ambientTexture: SFNode;
   diffuseColor: SFColor;
   diffuseTextureMapping: string;
   diffuseTexture: SFNode;
   specularColor: SFColor;
   specularTextureMapping: string;
   specularTexture: SFNode;
   shininess: number;
   shininessTextureMapping: string;
   shininessTexture: SFNode;
}

interface SFNodeMatrix3VertexAttribute extends SFNode
{
   name: string;
   value: X3DArrayField <SFMatrix3>;
}

interface SFNodeMatrix4VertexAttribute extends SFNode
{
   name: string;
   value: X3DArrayField <SFMatrix4>;
}

interface X3DMetadataNode extends SFNode
{
   name: string;
   reference: string;
}

interface MetadataInstance <T> extends X3DMetadataNode
{
   value: X3DArrayField <T>;
}

interface SFNodeMicrophoneSource extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   gain: number;
   mediaDeviceId: string;
}

interface SFNodeMovieTexture extends SFNodeAudioClip, Texture2DFields
{
   speed: number;
}

interface SFNodeMultiTexture extends SFNode
{
   description: string;
   color: SFColor;
   alpha: number;
   mode: X3DArrayField <string>;
   source: X3DArrayField <string>;
   function: X3DArrayField <string>;
   texture: X3DArrayField <SFNode>;
}

interface SFNodeMultiTextureCoordinate extends SFNode
{
   texCoord: X3DArrayField <SFNodeTextureCoordinate>;
}

interface SFNodeMultiTextureTransform extends SFNode
{
   textureTransform: X3DArrayField <SFNodeTextureTransform>;
}

interface SFNodeNavigationInfo extends X3DBindableNode
{
   type: X3DArrayField <
      "EXAMINE" | "WALK" | "FLY" | "PLANE" | "PLANE_create3000.github.io"
      | "PLANE_create3000.de" | "LOOKAT" | "EXPLORE" | "ANY" | "NONE">;
   avatarSize: X3DArrayField <number>;
   speed: number;
   headlight: boolean;
   visibilityLimit: number;
   transitionType: X3DArrayField <"TELEPORT" | "LINEAR" | "ANIMATE">;
   transitionTime: SFTime;
   transitionComplete: boolean;
}

interface SFNodeNormal extends SFNode
{
   vector: X3DArrayField <SFVec3>;
}

interface X3DViewpointNode extends X3DBindableNode
{
   description: string;
   position: SFVec3;
   orientation: SFRotation;
   centerOfRotation: SFVec3;
   fieldOfView: number;
   nearDistance: number;
   farDistance: number;
   viewAll: boolean;
   jump: boolean;
   retainUserOffsets: boolean;
   navigationInfo: SFNodeNavigationInfo;
}

interface SFNodeOscillatorSource extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   gain: number;
   frequency: number;
   detune: number;
   periodicWave: SFNodePeriodicWave;
}

interface SFNodePackagedShader extends X3DShaderNode, URLFields
{ }

interface SFNodePeriodicWave extends SFNode
{
   description: string;
   enabled: boolean;
   type: "SINE" | "SQUARE" | "SAWTOOTH" | "TRIANGLE" | "CUSTOM"
   optionsReal: X3DArrayField <number>;
   optionsImag: X3DArrayField <number>;
}

interface SFNodePhysicalMaterial extends MaterialCommon
{
   baseColor: SFColor;
   baseTextureMapping: String;
   baseTexture: SFNode;
   metallic: number;
   roughness: number;
   metallicRoughnessTextureMapping: string;
   metallicRoughnessTexture: SFNode;
}

interface SFNodePixelTexture extends SFNode, Texture2DFields
{
   description: string;
   image: SFImage;
}

interface SFNodePlaneSensor extends X3DDragSensorNode
{
   axisRotation: SFRotation;
   minPosition: SFVec2;
   maxPosition: SFVec2;
   translation_changed: SFVec3;
}

interface SFNodePointLight extends X3DLightNode
{
   attenuation: SFVec3;
   location: SFVec3;
   radius: number;
}

interface SFNodePointProperties extends SFNode
{
   pointSizeScaleFactor: number;
   pointSizeMinValue: number;
   pointSizeMaxValue: number;
   attenuation: SFVec3;
}

interface SFNodePointSet extends SFNode, GeometrySubnodes
{
   coord: SFNodeCoordinate;
}

interface SFNodeProgramShader extends X3DShaderNode
{
   programs: X3DArrayField <SFNodeShaderProgram>
}

interface X3DEnvironmentalSensorNode extends SFNode
{
   enabled: boolean;
   size: SFVec3;
   center: SFVec3;
   enterTime: SFTime;
   exitTime: SFTime;
   isActive: boolean;
}

interface SFNodeProximitySensor extends X3DEnvironmentalSensorNode
{
   position_changed: SFVec3;
   orientation_changed: SFRotation;
   centerOfRotation_changed: SFVec3;
}

interface SFNodeScript extends SFNode, URLFields
{
   directOutput: boolean;
   mustEvaluate: boolean;
}

interface SFNodeShaderPart extends SFNode, URLFields
{
   type: "VERTEX" | "FRAGMENT";
}

type SFNodeShaderProgram = SFNodeShaderPart; // Why are there two node types?

interface SFNodeShape extends Positioner
{
   castShadow: boolean;
   appearance: SFNodeAppearance;
   geometry: SFNode;
}

interface SoundCommon extends SFNode
{
   description: string;
   enabled: boolean;
   spatialize: boolean;
   location: SFVec3;
   direction: SFVec3;
   intensity: number;
   priority: number;
   children: X3DArrayField <SFNode>;
}

interface SFNodeSound extends SFNode
{
   minBack: number;
   minFront: number;
   maxBack: number;
   maxFront: number;
   source: SFNode;
}

interface SFNodeSpatialSound extends SFNode
{
   coneInnerAngle: number;
   coneOuterAngle: number;
   coneOuterGain: number;
   distanceModel: "LINEAR" | "INVERSE" | "EXPONENTIAL";
   dopplerEnabled: boolean;
   enableHRTF: boolean;
   gain: number;
   maxDistance: number;
   referenceDistance: number;
   rolloffFactor: number;
}

interface SFNodeSphere extends SFNode
{
   radius: number;
   solid: boolean;
}

interface SFNodeSphereSensor extends X3DPointingDeviceSensorNode
{
   rotation_changed: SFRotation;
}

interface SplineInterpolator <U> extends X3DInterpolatorNode <U,U> {
   closed: boolean;
   keyVelocity: X3DArrayField <U>;
   normalizeVelocity: boolean;
}

interface SFNodeSpotLight extends SFNodePointLight
{
   direction: SFVec3;
   beamWidth: number;
   cutOffAngle: number;
}

interface SFNodeSquadOrientationInterpolator
   extends X3DInterpolatorNode <SFRotation, SFRotation> {
      closed: boolean;
   }

interface SFNodeStaticGroup extends Positioner
{
   children: X3DArrayField <SFNode>;
}

interface SFNodeStreamAudioDestination extends X3DSoundDestinationNode
{
   streamIdentifier: X3DArrayField <string>;
}

interface SFNodeStreamAudioSource extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   gain: number;
   streamIdentifier: X3DArrayField <string>;
}

interface SFNodeSwitch extends X3DGroupingNode
{
   whichChoice: number;
}

interface SFNodeText extends SFNode
{
   string: X3DArrayField <string>;
   length: X3DArrayField <number>;
   maxExtent: number;
   solid: boolean;
   origin: SFVec3;
   textBounds: SFVec2;
   lineBounds: X3DArrayField <SFVec2>;
   fontStyle: SFNodeFontStyle;
}

interface SFNodeTextureBackground extends X3DBackgroundNode
{
   frontTexture: SFNode;
   backTexture: SFNode;
   leftTexture: SFNode;
   rightTexture: SFNode;
   topTexture: SFNode;
   bottomTexture: SFNode;
}

interface SFNodeTextureCoordinate extends SFNode
{
   mapping: string;
   point: X3DArrayField <SFVec2>;
}

interface SFNodeTextureCoordinateGenerator extends SFNode
{
   mapping: string;
   mode: "SPHERE" | "SPHERE-LOCAL" | "SPHERE-REFLECT" | "SPHERE-REFLECT-LOCAL"
      | "COORD" | "COORD-EYE" | "NOISE" | "NOISE-EYE" | "CAMERASPACENORMAL"
      | "CAMERASPACEPOSITION" | "CAMERASPACEREFLECTIONVECTOR" ;
   parameter: X3DArrayField <number>;
}

interface SFNodeTextureProperties extends SFNode
{
   borderColor: SFColorRGBA;
   borderWidth: number;
   anisotropicDegree: number;
   generateMipMaps: boolean;
   minificationFilter: string;
   magnificationFilter: string;
   boundaryModeS: string;
   boundaryModeT: string;
   boundaryModeR: string;
   textureCompression: string;
   texturePriority: number;
}

interface SFNodeTextureTransform extends SFNode
{
   mapping: string;
   translation: SFVec2;
   rotation: number;
   scale: SFVec2;
   center: SFVec2;
}

interface SFNodeTimeSensor extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   cycleInterval: SFTime;
   loop: boolean;
   cycleTime: SFTime;
   fraction_changed: number;
   time: SFTime;
}

interface SFNodeTouchSensor extends X3DPointingDeviceSensorNode
{
   hitTexCoord_changed: SFVec2;
   hitNormal_changed: SFVec3;
   hitPoint_changed: SFVec3;
   touchTime: SFTime;
}

interface SFNodeTransform extends X3DGroupingNode
{
   translation: SFVec3;
   rotation: SFRotation;
   scale: SFVec3;
   scaleOrientation: SFRotation;
   center: SFVec3;
}

interface SFNodeTransformSensor extends X3DEnvironmentalSensorNode
{
   position_changed: SFVec3;
   orientation_changed: SFRotation;
   targetObject: SFNode;
}

interface SFNodeTriangleFanSet extends SFNodeTriangleSet
{
   fanCount: X3DArrayField <number>;
}

interface SFNodeTriangleStripSet extends SFNodeTriangleSet
{
   stripCount: X3DArrayField <number>;
}

interface SFNodeTwoSidedMaterial extends SFNode
{
   ambientIntensity: number;
   backAmbientIntensity: number;
   backDiffuseColor: SFColor;
   backEmissiveColor: SFColor;
   backShininess: number;
   backSpecularColor: SFColor;
   backTransparency: number;
   diffuseColor: SFColor;
   emissiveColor: SFColor;
   shininess: number;
   separateBackColor: boolean;
   specularColor: SFColor;
   transparency: number;
}

interface SFNodeViewpointGroup extends SFNode
{
   description: string;
   displayed: boolean;
   retainUserOffsets: boolean;
   size: SFVec3;
   center: SFVec3;
   children: X3DArrayField <SFNode>;
}

interface SFNodeViewport extends X3DGroupingNode
{
   clipBoundary: X3DArrayField <number>;
}

interface SFNodeWaveShaper extends X3DTimeDependentNode, ChannelFields
{
   curve: X3DArrayField <number>;
   oversample: "NONE" | "2x" | "4x";
   tailTime: SFTime;
   children: X3DArrayField <SFNode>;
}

interface SFNodeWorldInfo extends SFNode
{
   title: string;
   info: X3DArrayField <string>;
}

type SpecializeNodeType = {
   AcousticProperties: SFNodeAcousticProperties,
   Analyser: SFNodeAnalyser,
   Anchor: SFNodeAnchor,
   Appearance: SFNodeAppearance,
   AudioClip: SFNodeAudioClip,
   AudioDestination: SFNodeAudioDestination,
   Background: SFNodeBackground,
   Billboard: SFNodeBillboard,
   BiquadFilter: SFNodeBiquadFilter,
   BlendMode: SFNodeBlendMode,
   Box: SFNodeBox,
   BufferAudioSource: SFNodeBufferAudioSource,
   ChannelMerger: SFNodeChannelMerger,
   ChannelSelector: SFNodeChannelSelector,
   ChannelSplitter: SFNodeChannelSplitter,
   ClipPlane: SFNodeClipPlane,
   Collision: SFNodeCollision,
   Color: SFNodeColor,
   ColorRGBA: SFNodeColorRGBA,
   ColorChaser: X3DChaserNode <SFColor>,
   ColorDamper: X3DDamperNode <SFColor>,
   ColorInterpolator: X3DInterpolatorNode <SFColor, SFColor>,
   ComposedShader: SFNodeComposedShader,
   Cone: SFNodeCone,
   Convolver: SFNodeConvolver,
   Coordinate: SFNodeCoordinate,
   CoordinateChaser: X3DChaserNode <X3DArrayField <SFVec3>>,
   CoordinateDamper: X3DDamperNode <X3DArrayField <SFVec3>>,
   CoordinateInterpolator: X3DInterpolatorNode <SFVec3, X3DArrayField <SFVec3>>,
   CoordinateInterpolator2D:
      X3DInterpolatorNode <SFVec2, X3DArrayField <SFVec2>>,
   Cylinder: SFNodeCylinder,
   CylinderSensor: SFNodeCylinderSensor,
   Delay: SFNodeDelay,
   DirectionalLight: SFNodeDirectionalLight,
   DynamicsCompressor: SFNodeDynamicsCompressor,
   EaseInEaseOut: SFNodeEaseInEaseOut,
   ElevationGrid: SFNodeElevationGrid,
   EnvironmentLight: SFNodeEnvironmentLight,
   Extrusion: SFNodeExtrusion,
   FillProperties: SFNodeFillProperties,
   FloatVertexAttribute: SFNodeFloatVertexAttribute,
   Fog: SFNodeFog,
   FogCoordinate: SFNodeFogCoordinate,
   FontStyle: SFNodeFontStyle,
   Gain: SFNodeGain,
   Group: X3DGroupingNode,
   ImageTexture: SFNodeImageTexture,
   IndexedFaceSet: SFNodeIndexedFaceSet,
   IndexedLineSet: SFNodeIndexedLineSet,
   IndexedTriangleFanSet: IndexedTriangles,
   IndexedTriangleSet: IndexedTriangles,
   IndexedTriangleStripSet: IndexedTriangles,
   Inline: SFNodeInline,
   LOD: SFNodeLOD,
   Layer: SFNodeLayer,
   LayerSet: SFNodeLayerSet,
   LineProperties: SFNodeLineProperties,
   LineSet: SFNodeLineSet,
   ListenerPointSource: SFNodeListenerPointSource,
   LoadSensor: SFNodeLoadSensor,
   LocalFog: SFNodeLocalFog,
   Material: SFNodeMaterial,
   Matrix3VertexAttribute: SFNodeMatrix3VertexAttribute,
   Matrix4VertexAttribute: SFNodeMatrix4VertexAttribute,
   MetadataBoolean: MetadataInstance <boolean>,
   MetadataDouble: MetadataInstance <number>,
   MetadataFloat: MetadataInstance <number>,
   MetadataInteger: MetadataInstance <number>,
   MetadataSet: MetadataInstance <X3DMetadataNode>,
   MetadataString: MetadataInstance <string>,
   MicrophoneSource: SFNodeMicrophoneSource,
   MovieTexture: SFNodeMovieTexture,
   MultiTexture: SFNodeMultiTexture,
   MultiTextureCoordinate: SFNodeMultiTextureCoordinate,
   MultiTextureTransform: SFNodeMultiTextureTransform,
   NavigationInfo: SFNodeNavigationInfo,
   Normal: SFNodeNormal,
   NormalInterpolator: X3DInterpolatorNode <SFVec3, X3DArrayField <SFVec3>>,
   OrientationChaser: X3DChaserNode <SFRotation>,
   OrientationDamper: X3DDamperNode <SFRotation>,
   OrientationInterpolator: X3DInterpolatorNode <SFRotation, SFRotation>,
   OrthoViewpoint: X3DViewpointNode,
   OscillatorSource: SFNodeOscillatorSource,
   PackagedShader: SFNodePackagedShader,
   PeriodicWave: SFNodePeriodicWave,
   PhysicalMaterial: SFNodePhysicalMaterial,
   PixelTexture: SFNodePixelTexture,
   PlaneSensor: SFNodePlaneSensor,
   PointLight: SFNodePointLight,
   PointProperties: SFNodePointProperties,
   PointSet: SFNodePointSet,
   PositionChaser: X3DChaserNode <SFVec3>,
   PositionChaser2D: X3DChaserNode <SFVec2>,
   PositionDamper: X3DDamperNode <SFVec3>,
   PositionDamper2D: X3DDamperNode <SFVec2>,
   PositionInterpolator: X3DInterpolatorNode <SFVec3, SFVec3>,
   PositionInterpolator2D: X3DInterpolatorNode <SFVec2, SFVec2>,
   ProgramShader: SFNodeProgramShader,
   ProximitySensor: SFNodeProximitySensor,
   ScalarChaser: X3DChaserNode <number>,
   ScalarDamper: X3DDamperNode <number>,
   ScalarInterpolator: X3DInterpolatorNode <number, number>,
   Script: SFNodeScript,
   ShaderPart: SFNodeShaderPart,
   ShaderProgram: SFNodeShaderProgram,
   Shape: SFNodeShape,
   Sound: SFNodeSound,
   SpatialSound: SFNodeSpatialSound,
   Sphere: SFNodeSphere,
   SphereSensor: SFNodeSphereSensor,
   SplinePositionInterpolator: SplineInterpolator <SFVec3>,
   SplinePositionInterpolator2D: SplineInterpolator <SFVec2>,
   SplineScalarInterpolator: SplineInterpolator <number>,
   SpotLight: SFNodePointLight,
   SquadOrientationInterpolator: SFNodeSquadOrientationInterpolator,
   StaticGroup: SFNodeStaticGroup,
   StreamAudioDestination: SFNodeStreamAudioDestination,
   StreamAudioSource: SFNodeStreamAudioSource,
   Switch: SFNodeSwitch,
   TexCoordChaser2D: X3DChaserNode <X3DArrayField <SFVec2>>,
   TexCoordDamper2D: X3DDamperNode <X3DArrayField <SFVec2>>,
   Text: SFNodeText,
   TextureBackground: SFNodeTextureBackground,
   TextureCoordinate: SFNodeTextureCoordinate,
   TextureCoordinateGenerator: SFNodeTextureCoordinateGenerator,
   TextureProperties: SFNodeTextureProperties,
   TextureTransform: SFNodeTextureTransform,
   TimeSensor: SFNodeTimeSensor,
   TouchSensor: SFNodeTouchSensor,
   Transform: SFNodeTransform,
   TransformSensor: SFNodeTransformSensor,
   TriangleFanSet: SFNodeTriangleFanSet,
   TriangleSet: SFNodeTriangleSet,
   TriangleStripSet: SFNodeTriangleStripSet,
   TwoSidedMaterial: SFNodeTwoSidedMaterial,
   UnlitMaterial: SFNodeUnlitMaterial,
   Viewpoint: X3DViewpointNode,
   ViewpointGroup: SFNodeViewpointGroup,
   Viewport: SFNodeViewport,
   VisibilitySensor: X3DEnvironmentalSensorNode,
   WaveShaper: SFNodeWaveShaper,
   WorldInfo: SFNodeWorldInfo,
   [name: string]: SFNode // catchall
}
