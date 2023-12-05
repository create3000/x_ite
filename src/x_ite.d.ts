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
   getBrowser (selector?: string | X3DCanvasElement): X3DBrowser;

   X3DConstants: X3DConstants;

   // SF* fields

   SFBool: typeof SFBool;
   SFColor: typeof SFColor;
   SFColorRGBA: typeof SFColorRGBA;
   SFDouble: typeof SFDouble;
   SFFloat: typeof SFFloat;
   SFImage: typeof SFImage;
   SFInt32: typeof SFInt32;
   SFMatrix3d: typeof SFMatrix3d;
   SFMatrix3f: typeof SFMatrix3f;
   SFMatrix4d: typeof SFMatrix4d;
   SFMatrix4f: typeof SFMatrix4f;
   SFNode: typeof SFNode;
   SFRotation: typeof SFRotation;
   SFString: typeof SFString;
   SFTime: typeof SFTime;
   SFVec2d: typeof SFVec2d;
   SFVec2f: typeof SFVec2f;
   SFVec3d: typeof SFVec3d;
   SFVec3f: typeof SFVec3f;
   SFVec4d: typeof SFVec4d;
   SFVec4f: typeof SFVec4f;

   // MF* fields

   MFBool: typeof MFBool;
   MFColor: typeof MFColor;
   MFColorRGBA: typeof MFColorRGBA;
   MFDouble: typeof MFDouble;
   MFFloat: typeof MFFloat;
   MFImage: typeof MFImage;
   MFInt32: typeof MFInt32;
   MFMatrix3d: typeof MFMatrix3d;
   MFMatrix3f: typeof MFMatrix3f;
   MFMatrix4d: typeof MFMatrix4d;
   MFMatrix4f: typeof MFMatrix4f;
   MFNode: typeof MFNode;
   MFRotation: typeof MFRotation;
   MFString: typeof MFString;
   MFTime: typeof MFTime;
   MFVec2d: typeof MFVec2d;
   MFVec2f: typeof MFVec2f;
   MFVec3d: typeof MFVec3d;
   MFVec3f: typeof MFVec3f;
   MFVec4d: typeof MFVec4d;
   MFVec4f: typeof MFVec4f;
}

interface X3DCanvasElement extends HTMLElement
{
   readonly browser: X3DBrowser;
}

interface X3DBrowser
{
   readonly name: string;
   readonly version: string;
   readonly providerURL: string;
   readonly currentSpeed: number;
   readonly currentFrameRate: number;
   description: string;
   readonly supportedComponents: ComponentInfoArray;
   readonly supportedProfiles: ProfileInfoArray;
   baseURL: string;
   readonly currentScene: X3DScene;

   replaceWorld (scene: X3DScene): Promise <void>;
   createX3DFromString (x3dSyntax: string): Promise <X3DScene>;
   createX3DFromURL (url: MFString): Promise <X3DScene>;
   createX3DFromURL (url: MFString, node: SFNode, fieldName: string): void;
   loadURL (url: MFString, parameter?: MFString): Promise <void>;
   importDocument (dom: HTMLElement | string): Promise <X3DScene>;
   importJS (json: string | JSONObject): Promise <X3DScene>;
   getBrowserProperty (prop: BrowserProperty): boolean;
   getBrowserOption <T extends keyof BrowserOption> (name: T): BrowserOption [T];
   setBrowserOption <T extends keyof BrowserOption> (name: T, value: BrowserOption [T]): void;
   getRenderingProperty <T extends keyof RenderingProperty> (name: T): RenderingProperty [T];
   getContextMenu (): ContextMenu;
   addBrowserCallback (key: any, callback?: BrowserCallback): void;
   addBrowserCallback (key: any, event: number, callback?: BrowserCallback): void;
   removeBrowserCallback (key: any, event?: number): void;
   viewAll (layer?: SFNode, transitionTime?: number): void;
   nextViewpoint (layer?: SFNode): void;
   previousViewpoint (layer?: SFNode): void;
   firstViewpoint (layer?: SFNode): void;
   lastViewpoint (layer?: SFNode): void;
   changeViewpoint (name: string): void;
   changeViewpoint (layer: SFNode, name: string): void;
   print (... args: any []): void;
   printLn (... args: any []): void;

   // VRML methods
   getName (): string;
   getVersion (): string;
   getCurrentSpeed (): number;
   getCurrentFrameRate (): number;
   getWorldURL (): string;
   replaceWorld (nodes: MFNode): string;
   createVrmlFromString (vrmlSyntax: string): MFNode;
   createVrmlFromURL (url: MFString, node: SFNode, fieldName: string): void;
   addRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   deleteRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): void;
   loadURL (url: MFString, parameter?: MFString): void;
   setDescription (description: string): void;
}

type BrowserCallback = (event: number) => void; // event is a Browser Event Constant

type JSONValue =
   | string
   | number
   | boolean
   | null
   | JSONValue []
   | { [key: string]: JSONValue }

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
   Timings:                      boolean
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
   LogarithmicDepthBuffer: boolean
}

interface ContextMenu
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
   itemClickEvent?: string
}

type UserMenuCallback = () => UserMenuItems
type UserMenuItems = Record <string, UserMenuItem>
type MenuCallback = (itemKey: string, options: ContextMenuOptions, event: Event) => (boolean | void)
type MenuIconCallback = (options: ContextMenuOptions, $itemElement: HTMLElement,itemKey: string, item: unknown) => string
type MenuBoolCallback = (itemKey: string, options: ContextMenuOptions) => boolean
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

interface X3DScene extends X3DExecutionContext
{
   rootNodes: MFNode;

   getMetaData (name: string): string [];
   setMetaData (name: string, value: string | string []): void;
   addMetaData (name: string, value: string): void;
   removeMetaData (name: string): void;
   addRootNode (node: SFNode): void;
   removeRootNode (node: SFNode): void;
   getExportedNode (exportedName: string): SFNode;
   updateExportedNode (exportedName: string, node: SFNode): void;
   removeExportedNode (exportedName: string): void;
}

interface X3DExecutionContext
{
   readonly specificationVersion: string;
   readonly encoding: "ASCII" | "VRML" | "XML" | "BINARY" | "SCRIPTED" | "BIFS" | "NONE";
   readonly profile: ProfileInfo | null;
   readonly components: ComponentInfoArray;
   readonly worldURL: string;
   readonly baseURL: string;
   readonly units: UnitInfoArray;
   readonly rootNodes: MFNode;
   readonly protos: ProtoDeclarationArray;
   readonly externprotos: ExternProtoDeclarationArray;
   readonly routes: RouteArray;

   createNode <T extends keyof ConcreteNodesType> (spec: T): ConcreteNodesType [T];
   createProto (protoName: string): SFNode;
   getNamedNode (name: string): SFNode;
   updateNamedNode (name: string, node: SFNode): void;
   removeNamedNode (name: string): void;
   getImportedNode (importedName: string): SFNode;
   updateImportedNode (inlineNode: SFNode, exportedName: string, importedName: string): void;
   removeImportedNode (importedName: string): void;
   addRoute (sourceNode: SFNode, sourceField: string,destinationNode: SFNode, destinationField: string): X3DRoute;
   deleteRoute (route: X3DRoute): void;

   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type ProfileInfoArray = X3DInfoArray <ProfileInfo>;

interface ProfileInfo
{
   readonly name: string;
   readonly title: string;
   readonly providerURL: string;
   readonly components: ComponentInfoArray
}

type ComponentInfoArray = X3DInfoArray <ComponentInfo>;

interface ComponentInfo
{
   readonly name: string;
   readonly level: number;
   readonly title: string;
   readonly providerURL: string;
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
   readonly isExternProto: false;

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
   readonly urls: MFString;
   readonly isExternProto: false;
   readonly loadState: number;

   newInstance (): SFNode;
   loadNow (): Promise <void>;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type RouteArray = X3DInfoArray <X3DRoute>;

interface X3DRoute
{
   readonly sourceNode: SFNode;
   readonly sourceField: string;
   readonly destinationNode: SFNode;
   readonly destinationField: string;
}

type X3DInfoArray <T> = {[index: number]: T, length: number}

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

   // Concrete Node Types

   readonly AcousticProperties: number;
   readonly Analyser: number;
   readonly Anchor: number;
   readonly Appearance: number;
   readonly AudioClip: number;
   readonly AudioDestination: number;
   readonly Background: number;
   readonly Billboard: number;
   readonly BiquadFilter: number;
   readonly Box: number;
   readonly BufferAudioSource: number;
   readonly ChannelMerger: number;
   readonly ChannelSelector: number;
   readonly ChannelSplitter: number;
   readonly ClipPlane: number;
   readonly Collision: number;
   readonly Color: number;
   readonly ColorChaser: number;
   readonly ColorDamper: number;
   readonly ColorInterpolator: number;
   readonly ColorRGBA: number;
   readonly ComposedShader: number;
   readonly Cone: number;
   readonly Convolver: number;
   readonly Coordinate: number;
   readonly CoordinateChaser: number;
   readonly CoordinateDamper: number;
   readonly CoordinateInterpolator: number;
   readonly CoordinateInterpolator2D: number;
   readonly Cylinder: number;
   readonly CylinderSensor: number;
   readonly Delay: number;
   readonly DirectionalLight: number;
   readonly DynamicsCompressor: number;
   readonly EaseInEaseOut: number;
   readonly ElevationGrid: number;
   readonly EnvironmentLight: number;
   readonly Extrusion: number;
   readonly FillProperties: number;
   readonly FloatVertexAttribute: number;
   readonly Fog: number;
   readonly FogCoordinate: number;
   readonly FontStyle: number;
   readonly Gain: number;
   readonly Group: number;
   readonly ImageTexture: number;
   readonly IndexedFaceSet: number;
   readonly IndexedLineSet: number;
   readonly IndexedTriangleFanSet: number;
   readonly IndexedTriangleSet: number;
   readonly IndexedTriangleStripSet: number;
   readonly Inline: number;
   readonly LOD: number;
   readonly Layer: number;
   readonly LayerSet: number;
   readonly LineProperties: number;
   readonly LineSet: number;
   readonly ListenerPointSource: number;
   readonly LoadSensor: number;
   readonly LocalFog: number;
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
   readonly MovieTexture: number;
   readonly MultiTexture: number;
   readonly MultiTextureCoordinate: number;
   readonly MultiTextureTransform: number;
   readonly NavigationInfo: number;
   readonly Normal: number;
   readonly NormalInterpolator: number;
   readonly OrientationChaser: number;
   readonly OrientationDamper: number;
   readonly OrientationInterpolator: number;
   readonly OrthoViewpoint: number;
   readonly OscillatorSource: number;
   readonly PackagedShader: number;
   readonly PeriodicWave: number;
   readonly PhysicalMaterial: number;
   readonly PixelTexture: number;
   readonly PlaneSensor: number;
   readonly PointLight: number;
   readonly PointProperties: number;
   readonly PointSet: number;
   readonly PositionChaser: number;
   readonly PositionChaser2D: number;
   readonly PositionDamper: number;
   readonly PositionDamper2D: number;
   readonly PositionInterpolator: number;
   readonly PositionInterpolator2D: number;
   readonly ProgramShader: number;
   readonly ProximitySensor: number;
   readonly ScalarChaser: number;
   readonly ScalarDamper: number;
   readonly ScalarInterpolator: number;
   readonly Script: number;
   readonly ShaderPart: number;
   readonly ShaderProgram: number;
   readonly Shape: number;
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
   readonly Switch: number;
   readonly TexCoordChaser2D: number;
   readonly TexCoordDamper2D: number;
   readonly Text: number;
   readonly TextureBackground: number;
   readonly TextureCoordinate: number;
   readonly TextureCoordinateGenerator: number;
   readonly TextureProperties: number;
   readonly TextureTransform: number;
   readonly TimeSensor: number;
   readonly TouchSensor: number;
   readonly Transform: number;
   readonly TransformSensor: number;
   readonly TriangleFanSet: number;
   readonly TriangleSet: number;
   readonly TriangleStripSet: number;
   readonly TwoSidedMaterial: number;
   readonly UnlitMaterial: number;
   readonly Viewpoint: number;
   readonly ViewpointGroup: number;
   readonly Viewport: number;
   readonly VisibilitySensor: number;
   readonly VrmlMatrix: number;
   readonly WaveShaper: number;
   readonly WorldInfo: number;

   // Abstract Node Types

   readonly X3DAppearanceChildNode: number;
   readonly X3DAppearanceNode: number;
   readonly X3DBackgroundNode: number;
   readonly X3DBaseNode: number;
   readonly X3DBindableNode: number;
   readonly X3DBoundedObject: number;
   readonly X3DBrowser: number;
   readonly X3DChaserNode: number;
   readonly X3DChildNode: number;
   readonly X3DColorNode: number;
   readonly X3DComposedGeometryNode: number;
   readonly X3DCoordinateNode: number;
   readonly X3DDamperNode: number;
   readonly X3DDragSensorNode: number;
   readonly X3DEnvironmentalSensorNode: number;
   readonly X3DExecutionContext: number;
   readonly X3DExternProtoDeclaration: number;
   readonly X3DFogObject: number;
   readonly X3DFollowerNode: number;
   readonly X3DFontStyleNode: number;
   readonly X3DGeometricPropertyNode: number;
   readonly X3DGeometryNode: number;
   readonly X3DGroupingNode: number;
   readonly X3DInfoNode: number;
   readonly X3DInterpolatorNode: number;
   readonly X3DLayerNode: number;
   readonly X3DLightNode: number;
   readonly X3DLineGeometryNode: number;
   readonly X3DMaterialNode: number;
   readonly X3DMetadataObject: number;
   readonly X3DNetworkSensorNode: number;
   readonly X3DNode: number;
   readonly X3DNormalNode: number;
   readonly X3DOneSidedMaterialNode: number;
   readonly X3DPointingDeviceSensorNode: number;
   readonly X3DProgrammableShaderObject: number;
   readonly X3DProtoDeclaration: number;
   readonly X3DProtoDeclarationNode: number;
   readonly X3DPrototypeInstance: number;
   readonly X3DScene: number;
   readonly X3DScriptNode: number;
   readonly X3DSensorNode: number;
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
   readonly X3DTexture2DNode: number;
   readonly X3DTextureCoordinateNode: number;
   readonly X3DTextureNode: number;
   readonly X3DTextureTransformNode: number;
   readonly X3DTimeDependentNode: number;
   readonly X3DTouchSensorNode: number;
   readonly X3DTransformMatrix3DNode: number;
   readonly X3DTransformNode: number;
   readonly X3DUrlObject: number;
   readonly X3DVertexAttributeNode: number;
   readonly X3DViewpointNode: number;
   readonly X3DViewportNode: number;
   readonly X3DWorld: number;
}

type FieldDefinitionArray = X3DInfoArray <X3DFieldDefinition>;
type X3DFieldDefinition = {
   readonly accessType: number,
   readonly dataType: string,
   readonly name: string,
   readonly value: X3DField
}

declare class X3DField
{
   copy (): this;
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
   addReferencesCallback (key: any, callback: (value: this) => void): void;
   removeReferencesCallback (key: any): void;
   getReferencesCallbacks (): Map <any, (value: this) => void>;
   addFieldInterest (other: this): void;
   removeFieldInterest (other: this): void;
   getFieldInterests (): Set <this>
   addFieldCallback (key: any, callback: (value: this) => void): void;
   removeFieldCallback (key: any): void;
   getFieldCallbacks (): Map <any, (value: this) => void>;
   addInputRoute (route: X3DRoute): void;
   removeInputRoute (route: X3DRoute): void;
   getInputRoutes (): Set <X3DRoute>;
   addOutputRoute (route: X3DRoute): void;
   removeOutputRoute (route: X3DRoute): void;
   getOutputRoutes (): Set <X3DRoute>;
   addRouteCallback (key: any, callback: (value: this) => void): void;
   removeRouteCallback (key: any): void;
   getRouteCallbacks (): Map <any, (value: this) => void>;
   dispose (): void;
}

class SFBool extends X3DField
{
   static readonly typeName: "SFBool";

   constructor (value?: any);

   valueOf (): boolean;
}

class SFColor extends X3DField
{
   static readonly typeName: "SFColor";

   constructor (r?: number, g?: number, b?: number);

   r: number;
   g: number;
   b: number;

   [index: number]: number;

   getHSV (): number [];
   setHSV (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColor;
}

class SFColorRGBA extends X3DField
{
   static readonly typeName: "SFColorRGBA";

   constructor (r?: number, g?: number, b?: number, a?: number);

   r: number;
   g: number;
   b: number;
   a: number;

   [index: number]: number;

   getHSVA (): number [];
   setHSVA (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColorRGBA;
}

class SFDouble extends X3DField
{
   static readonly typeName: "SFDouble";

   constructor (value?: any);

   valueOf (): number;
}

class SFFloat extends X3DField
{
   static readonly typeName: "SFFloat";

   constructor (value?: any);

   valueOf (): number;
}

class SFImage extends X3DField
{
   static readonly typeName: "SFImage";

   constructor (width?: number, height?: number, components?: number, array?: MFInt32);

   x: number;
   y: number;
   width: number;
   height: number;
   comp: number;
   array: MFInt32;
}

class SFInt32 extends X3DField
{
   static readonly typeName: "SFInt32";

   constructor (value?: number);
}

class SFMatrix3 extends X3DField
{
   constructor ();
   constructor (r1: SFVec3, r2: SFVec3, r3: SFVec3);
   constructor (a: number, b: number, c: number,
                d: number, e: number, f: number,
                g: number, h: number, i: number);

   [index: number]: number;

   setTransform (translation: SFVec2, rotation: number, scaleFactor: SFVec2, scaleOrientation: number, center: SFVec2): void;
   getTransform (translation: SFVec2, rotation: SFVec3, scaleFactor: SFVec2, scaleOrientation: SFVec3, center: SFVec2): void;
   determinant (): number;
   inverse (): this;
   transpose (): this;
   multLeft (matrix: this): this;
   multRight (matrix: this): this;
   multVecMatrix <T = SFVec2d | SFVec2f> (row: T): T;
   multVecMatrix <T = SFVec3d | SFVec3f> (row: T): T;
   multMatrixVec <T = SFVec2d | SFVec2f> (col: T): T;
   multMatrixVec <T = SFVec3d | SFVec3f> (col: T): T;
   multDirMatrix <T = SFVec2d | SFVec2f> (row: T): T;
   multMatrixDir <T = SFVec2d | SFVec2f> (col: T): T;
}

class SFMatrix3d extends SFMatrix3
{
   static readonly typeName: "SFMatrix3d";
}

class SFMatrix3f extends SFMatrix3
{
   static readonly typeName: "SFMatrix3f";
}

class SFMatrix4 extends X3DField
{
   constructor ();
   constructor (r1: SFVec4, r2: SFVec4, r3: SFVec4, r4: SFVec4);
   constructor (a: number, b: number, c: number, d: number,
                e: number, f: number, g: number, h: number,
                i: number, j: number, k: number, l: number,
                m: number, n: number, o: number, p: number);

   [index: number]: number;

   setTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   getTransform (translation: SFVec3, rotation: SFRotation, scaleFactor: SFVec3, scaleOrientation: SFRotation, center: SFVec3): void;
   determinant (): number;
   inverse (): this;
   transpose (): this;
   multLeft (matrix: this): this;
   multRight (matrix: this): this;
   multVecMatrix <T = SFVec4d | SFVec4f> (row: T): T;
   multVecMatrix <T = SFVec3d | SFVec3f> (row: T): T;
   multMatrixVec <T = SFVec4d | SFVec4f> (col: T): T;
   multMatrixVec <T = SFVec3d | SFVec3f> (col: T): T;
   multDirMatrix <T = SFVec3d | SFVec3f> (row: T): T;
   multMatrixDir <T = SFVec3d | SFVec3f> (col: T): T;
}

class SFMatrix4d extends SFMatrix4
{
   static readonly typeName: "SFMatrix4d";
}

class SFMatrix4f extends SFMatrix4
{
   static readonly typeName: "SFMatrix4f";
}

class SFNode <T extends X3DNode = X3DNode> extends X3DField
{
   static readonly typeName: "SFNode";

   metadata: SFNode;

   addFieldCallback (key: any, callback: (value: this) => void): void;
   /**
    * @deprecated Use `node .getField (name) .addFieldCallback (key, callback)`.
    */
   addFieldCallback (name: string, key: any, callback: (value: X3DField) => void): void;
   getFieldDefinitions (): FieldDefinitionArray;
   getField (name: string): X3DField;
   getNodeName (): string;
   getNodeDisplayName (): string;
   getNodeType (): number [];
   getNodeTypeName (): string;
   getNodeUserData (key: any): any;
   removeFieldCallback (key: any): void;
   removeFieldCallback (name: string, key: any): void;
   removeNodeUserData (key: any): void;
   setNodeUserData (key: any, value: any): void;
   toVRMLString (options?: VRMLOptions): string;
   toXMLString (options?: VRMLOptions): string;
   toJSONString (options?: VRMLOptions): string;
}

type VRMLOptions = {
   style?: "TIDY" | "COMPACT" | "SMALL" | "CLEAN",
   indent?: string,
   precision?: number,
   doublePrecision?: number,
   html?: boolean,
   closingTags?: boolean,
}

class SFRotation extends X3DField
{
   static readonly typeName: "SFRotation";

   constructor ();
   constructor (x: number, y: number, z: number, angle: number);
   constructor (axis: SFVec3, angle: number);
   constructor (from: SFVec3, to: SFVec3);
   constructor (matrix: SFMatrix3);

   x: number;
   y: number;
   z: number;
   angle: number;

   [index: number]: number;

   getAxis (): SFVec3f;
   getMatrix (): SFMatrix3f;
   inverse (): SFRotation;
   multiply (rotation: SFRotation): SFRotation;
   multVec <T = SFVec3d | SFVec3f> (vector: T): T;
   setAxis (axis: SFVec3): void;
   setMatrix (matrix: SFMatrix3): void;
   slerp (destination: SFRotation, t: number): SFRotation;
}

class SFString extends X3DField
{
   static readonly typeName: "SFString";

   constructor (value?: any);

   valueOf (): string;
   length: number;
}

class SFTime extends X3DField
{
   static readonly typeName: "SFTime";

   constructor (value?: any);

   valueOf (): number;
}

class SFVec2 extends X3DField
{
   constructor (x?: number, y?: number);

   x: number;
   y: number;

   [index: number]: number;

   abs (): this;
   add (other: this): this;
   distance (other: this): number;
   divide (denominator: number): this;
   divVec (other: this): this;
   dot (other: this): number;
   inverse (): this;
   length (): number;
   lerp (destination: this, t: number): this;
   min (other: this): this;
   max (other: this): this;
   multiply (factor: number): this;
   multVec (other: this): this;
   negate (): this;
   normalize (): this;
   subtract (other: this): this;
}

class SFVec2d extends SFVec2
{
   static readonly typeName: "SFVec2d";
}

class SFVec2f extends SFVec2
{
   static readonly typeName: "SFVec2f";
}

class SFVec3 extends X3DField
{
   constructor (x?: number, y?: number, z?: number);

   x: number;
   y: number;
   z: number;

   [index: number]: number;

   abs (): this;
   add (other: this): this;
   cross (other: this): this;
   distance (other: this): number;
   divide (denominator: number): this;
   divVec (other: this): this;
   dot (other: this): number;
   inverse (): this;
   length (): number;
   lerp (destination: this, t: number): this;
   min (other: this): this;
   max (other: this): this;
   multiply (factor: number): this;
   multVec (other: this): this;
   negate (): this;
   normalize (): this;
   subtract (other: this): this;
}

class SFVec3d extends SFVec3
{
   static readonly typeName: "SFVec3d";
}

class SFVec3f extends SFVec3
{
   static readonly typeName: "SFVec3f";
}

class SFVec4 extends X3DField
{
   constructor (x?: number, y?: number, z?: number, w?: number);

   x: number;
   y: number;
   z: number;
   w: number;

   [index: number]: number;

   abs (): this;
   add (other: this): this;
   distance (other: this): number;
   divide (denominator: number): this;
   divVec (other: this): this;
   dot (other: this): number;
   inverse (): this;
   length (): number;
   lerp (destination: this, t: number): this;
   min (other: this): this;
   max (other: this): this;
   multiply (factor: number): this;
   multVec (other: this): this;
   negate (): this;
   normalize (): this;
   subtract (other: this): this;
}

class SFVec4d extends SFVec4
{
   static readonly typeName: "SFVec4d";
}

class SFVec4f extends SFVec4
{
   static readonly typeName: "SFVec4f";
}

declare class X3DArrayField <T> extends X3DField
{
   constructor (... elements: T []);

   [index: number]: T;
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

class MFBool extends X3DArrayField <boolean>
{
   static readonly typeName: "MFBool";
}

class MFColor extends X3DArrayField <SFColor>
{
   static readonly typeName: "MFColor";
}

class MFColorRGBA extends X3DArrayField <SFColorRGBA>
{
   static readonly typeName: "MFColorRGBA";
}

class MFDouble extends X3DArrayField <number>
{
   static readonly typeName: "MFDouble";
}

class MFFloat extends X3DArrayField <number>
{
   static readonly typeName: "MFFloat";
}

class MFImage extends X3DArrayField <SFImage>
{
   static readonly typeName: "MFImage";
}

class MFInt32 extends X3DArrayField <number>
{
   static readonly typeName: "MFInt32";
}

class MFMatrix3d extends X3DArrayField <SFMatrix3d>
{
   static readonly typeName: "MFMatrix3d";
}

class MFMatrix3f extends X3DArrayField <SFMatrix3f>
{
   static readonly typeName: "MFMatrix3f";
}

class MFMatrix4d extends X3DArrayField <SFMatrix4d>
{
   static readonly typeName: "MFMatrix4d";
}

class MFMatrix4f extends X3DArrayField <SFMatrix4f>
{
   static readonly typeName: "MFMatrix4f";
}

class MFNode <T extends X3DNode = X3DNode> extends X3DArrayField <SFNode <T>>
{
   static readonly typeName: "MFNode";
}

class MFRotation extends X3DArrayField <SFRotation>
{
   static readonly typeName: "MFRotation";
}

class MFString extends X3DArrayField <string>
{
   static readonly typeName: "MFString";
}

class MFTime extends X3DArrayField <number>
{
   static readonly typeName: "MFTime";
}

class MFVec2d extends X3DArrayField <SFVec2d>
{
   static readonly typeName: "MFVec2d";
}

class MFVec2f extends X3DArrayField <SFVec2f>
{
   static readonly typeName: "MFVec2f";
}

class MFVec3d extends X3DArrayField <SFVec3d>
{
   static readonly typeName: "MFVec3d";
}

class MFVec3f extends X3DArrayField <SFVec3f>
{
   static readonly typeName: "MFVec3f";
}

class MFVec4d extends X3DArrayField <SFVec4d>
{
   static readonly typeName: "MFVec4d";
}

class MFVec4f extends X3DArrayField <SFVec4f>
{
   static readonly typeName: "MFVec4f";
}

// CONCRETE_NODES START

interface X3DNode { }

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
   addChildren: MFNode;
   removeChildren: MFNode;
   children: MFNode;
}

interface X3DGroupingNode extends Positioner, GroupingFields
{ }

interface URLFields
{
   description: string;
   load: boolean;
   url: MFString;
   autoRefresh: SFTime;
   autoRefreshTimeLimit: SFTime;
}

interface SFNodeAnchor extends X3DGroupingNode
{
   parameter: MFString;
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
   shaders: MFNode;
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
   children: MFNode;
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
   skyAngle: MFFloat;
   skyColor: MFColor;
   groundAngle: MFFloat;
   groundColor: MFColor;
   transparency: number;
}

interface SFNodeBackground extends X3DBackgroundNode
{
   frontUrl: MFString;
   backUrl: MFString;
   leftUrl: MFString;
   rightUrl: MFString;
   topUrl: MFString;
   bottomUrl: MFString;
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
   children: MFNode;
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

interface SFNodeBufferAudioSource extends X3DTimeDependentNode, ChannelFields, URLFields
{
   detune: number;
   buffer: MFFloat;
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
   children: MFNode;
}

interface SFNodeChannelSelector extends ChannelFields
{
   channelSelection: number;
   children: MFNode;
}

interface SFNodeChannelSplitter extends ChannelFields
{
   children: MFNode;
   outputs:  MFNode;
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
   color: MFColor;
}

interface SFNodeColorRGBA extends SFNode
{
   color: MFColorRGBA;
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

interface X3DInterpolatorNode <T, V> extends SFNode
{
   set_fraction: number;
   key: MFFloat;
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
   buffer: MFFloat;
   normalize: boolean;
   tailTime: SFTime;
   children: MFNode;
}

interface SFNodeCoordinate extends SFNode
{
   point: MFVec3f;
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
   children: MFNode;
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
      children: MFNode;
   }

interface SFNodeEaseInEaseOut extends SFNode
{
   set_fraction: number;
   key: MFFloat;
   easeInEaseOut: MFVec2f;
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
   set_height: MFFloat;
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
   height: MFFloat;
}

interface SFNodeEnvironmentLight extends X3DLightNode
{
   rotation: SFRotation;
   diffuseCoefficients: MFFloat;
   diffuse: SFNode;
   diffuseTexture: SFNode;
   specularTexture: SFNode;
}

interface SFNodeExtrusion extends SFNode
{
   set_crossSection: MFVec2f;
   set_orientation: MFRotation;
   set_scale: MFVec2f;
   set_spine: MFVec3f;
   beginCap: boolean;
   endCap: boolean;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   crossSection: MFVec2f;
   orientation: MFRotation;
   scale: MFVec2f;
   spine: MFVec3f;
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
   value: MFFloat;
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
   depth: MFFloat;
}

interface SFNodeFontStyle extends SFNode
{
   language: string;
   family: MFString;
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
   children: MFNode;
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
   set_colorIndex: MFInt32;
   set_coordIndex: MFInt32;
   colorIndex: MFInt32;
   coordIndex: MFInt32;
   color: SFNodeColor | SFNodeColorRGBA;
   coord: SFNodeCoordinate;
}

interface SFNodeIndexedFaceSet extends SFNodeIndexedLineSet
{
   set_texCoordIndex: MFInt32;
   set_normalIndex: MFInt32;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   normalPerVertex: boolean;
   texCoordIndex: MFInt32;
   normalIndex: MFInt32;
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
   set_index: MFInt32;
   index: MFInt32;
}

interface SFNodeInline extends Positioner, URLFields
{
   global: boolean;
}

interface SFNodeLOD extends X3DGroupingNode
{
   forceTransitions: boolean;
   center: SFVec3;
   range: MFFloat;
   level_changed: number;
}

interface SFNodeLayer extends SFNode, GroupingFields
{
   pickable: boolean;
   objectType: MFString;
   visible: boolean;
   viewport: SFNodeViewport;
}

interface SFNodeLayerSet extends SFNode
{
   activeLayer: number;
   order: MFInt32;
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
   vertexCount: MFInt32;
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
   children: MFNode;
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
   value: MFMatrix3f;
}

interface SFNodeMatrix4VertexAttribute extends SFNode
{
   name: string;
   value: MFMatrix4f;
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
   mode: MFString;
   source: MFString;
   function: MFString;
   texture: MFNode;
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
   type: MFString <"EXAMINE" | "WALK" | "FLY" | "PLANE" | "PLANE_create3000.github.io" | "PLANE_create3000.de" | "LOOKAT" | "EXPLORE" | "ANY" | "NONE">;
   avatarSize: MFFloat;
   speed: number;
   headlight: boolean;
   visibilityLimit: number;
   transitionType: MFString <"TELEPORT" | "LINEAR" | "ANIMATE">;
   transitionTime: SFTime;
   transitionComplete: boolean;
}

interface SFNodeNormal extends SFNode
{
   vector: MFVec3f;
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
   optionsReal: MFFloat;
   optionsImag: MFFloat;
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
   programs: MFNode <SFNodeShaderProgram>
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
   children: MFNode;
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

interface SplineInterpolator <U> extends X3DInterpolatorNode <U, U> {
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
   children: MFNode;
}

interface SFNodeStreamAudioDestination extends X3DSoundDestinationNode
{
   streamIdentifier: MFString;
}

interface SFNodeStreamAudioSource extends X3DTimeDependentNode
{
   description: string;
   enabled: boolean;
   gain: number;
   streamIdentifier: MFString;
}

interface SFNodeSwitch extends X3DGroupingNode
{
   whichChoice: number;
}

interface SFNodeText extends SFNode
{
   string: MFString;
   length: MFFloat;
   maxExtent: number;
   solid: boolean;
   origin: SFVec3;
   textBounds: SFVec2;
   lineBounds: MFVec2f;
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
   point: MFVec2f;
}

interface SFNodeTextureCoordinateGenerator extends SFNode
{
   mapping: string;
   mode: "SPHERE" | "SPHERE-LOCAL" | "SPHERE-REFLECT" | "SPHERE-REFLECT-LOCAL"
      | "COORD" | "COORD-EYE" | "NOISE" | "NOISE-EYE" | "CAMERASPACENORMAL"
      | "CAMERASPACEPOSITION" | "CAMERASPACEREFLECTIONVECTOR" ;
   parameter: MFFloat;
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
   fanCount: MFInt32;
}

interface SFNodeTriangleStripSet extends SFNodeTriangleSet
{
   stripCount: MFInt32;
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
   children: MFNode;
}

interface SFNodeViewport extends X3DGroupingNode
{
   clipBoundary: MFFloat;
}

interface SFNodeWaveShaper extends X3DTimeDependentNode, ChannelFields
{
   curve: MFFloat;
   oversample: "NONE" | "2x" | "4x";
   tailTime: SFTime;
   children: MFNode;
}

interface SFNodeWorldInfo extends SFNode
{
   title: string;
   info: MFString;
}

type ConcreteNodesType = {
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
   CoordinateChaser: X3DChaserNode <MFVec3f>,
   CoordinateDamper: X3DDamperNode <MFVec3f>,
   CoordinateInterpolator: X3DInterpolatorNode <SFVec3f, MFVec3f>,
   CoordinateInterpolator: X3DInterpolatorNode <SFVec2f, MFVec2f>,
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
   NormalInterpolator: X3DInterpolatorNode <SFVec3f, MFVec3f>,
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
   PositionChaser: X3DChaserNode <SFVec3f>,
   PositionChaser2D: X3DChaserNode <SFVec2f>,
   PositionDamper: X3DDamperNode <SFVec3f>,
   PositionDamper2D: X3DDamperNode <SFVec2f>,
   PositionInterpolator: X3DInterpolatorNode <SFVec3f, SFVec3f>,
   PositionInterpolator2D: X3DInterpolatorNode <SFVec2f, SFVec2f>,
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
   SplinePositionInterpolator: SplineInterpolator <SFVec3f>,
   SplinePositionInterpolator2D: SplineInterpolator <SFVec2f>,
   SplineScalarInterpolator: SplineInterpolator <number>,
   SpotLight: SFNodePointLight,
   SquadOrientationInterpolator: SFNodeSquadOrientationInterpolator,
   StaticGroup: SFNodeStaticGroup,
   StreamAudioDestination: SFNodeStreamAudioDestination,
   StreamAudioSource: SFNodeStreamAudioSource,
   Switch: SFNodeSwitch,
   TexCoordChaser2D: X3DChaserNode <MFVec2f>,
   TexCoordDamper2D: X3DDamperNode <MFVec2f>,
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

// CONCRETE_NODES END
