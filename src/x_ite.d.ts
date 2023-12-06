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

   readonly X3DConstants: X3DConstants,
   readonly X3DBrowser: typeof X3DBrowser,
   readonly X3DExecutionContext: typeof X3DExecutionContext,
   readonly X3DScene: typeof X3DScene,
   readonly ComponentInfo: typeof ComponentInfo,
   readonly ComponentInfoArray: typeof ComponentInfoArray,
   readonly ProfileInfo: typeof ProfileInfo,
   readonly ProfileInfoArray: typeof ProfileInfoArray,
   readonly UnitInfo: typeof UnitInfo,
   readonly UnitInfoArray: typeof UnitInfoArray,
   readonly ExternProtoDeclarationArray: typeof ExternProtoDeclarationArray,
   readonly ProtoDeclarationArray: typeof ProtoDeclarationArray,
   readonly X3DExternProtoDeclaration: typeof X3DExternProtoDeclaration,
   readonly X3DProtoDeclaration: typeof X3DProtoDeclaration,
   readonly RouteArray: typeof RouteArray,
   readonly X3DRoute: typeof X3DRoute,

   readonly X3DFieldDefinition: typeof X3DFieldDefinition,
   readonly FieldDefinitionArray: typeof FieldDefinitionArray,

   readonly X3DField: typeof X3DField,
   readonly X3DArrayField: typeof X3DArrayField,

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

declare class X3DCanvasElement extends HTMLElement
{
   readonly browser: X3DBrowser;

   captureStream (frameRate?: number): MediaStream;
   toBlob (callback: (blob: Blob) => void, type?: string, quality?: number): void;
   toDataURL (type?: string, encoderOptions?: number): string;
}

declare class X3DBrowser
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
   getBrowserProperty (name: BrowserProperty): boolean;
   getBrowserOption <T extends keyof BrowserOption> (name: T): BrowserOption [T];
   setBrowserOption <T extends keyof BrowserOption> (name: T, value: BrowserOption [T]): void;
   getRenderingProperty <T extends keyof RenderingProperty> (name: T): RenderingProperty [T];
   getContextMenu (): ContextMenu;
   addBrowserCallback (key: any, callback?: (event: number) => void): void;
   addBrowserCallback (key: any, event: number, callback?: (event: number) => void): void;
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

type JSONValue =
   | string
   | number
   | boolean
   | null
   | JSONValue []
   | { [key: string]: JSONValue }

interface JSONObject
{
   [k: string]: JSONValue,
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
}

type UserMenuCallback = () => UserMenuItems
type UserMenuItems = Record <string, UserMenuItem>
type MenuCallback = (itemKey: string, options: ContextMenuOptions, event: Event) => (boolean | void)
type MenuIconCallback = (options: ContextMenuOptions, $itemElement: HTMLElement, itemKey: string, item: unknown) => string
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
   dataAttr?: Record <string, string>,
}

declare class X3DScene extends X3DExecutionContext
{
   rootNodes: MFNode;

   getMetaData (name: string): string [];
   setMetaData (name: string, value: string | string []): void;
   addMetaData (name: string, value: string): void;
   removeMetaData (name: string): void;
   addRootNode (node: SFNode): void;
   removeRootNode (node: SFNode): void;
   getExportedNode (exportedName: string): SFNode;
   addExportedNode (exportedName: string, node: SFNode): void;
   updateExportedNode (exportedName: string, node: SFNode): void;
   removeExportedNode (exportedName: string): void;
}

declare class X3DExecutionContext
{
   readonly specificationVersion: string;
   readonly encoding: "ASCII" | "VRML" | "XML" | "JSON" | "BINARY" | "SCRIPTED" | "BIFS" | "NONE" | "GLTF" | "OBJ" | "STL" | "PLY" | "SVG";
   readonly profile: ProfileInfo | null;
   readonly components: ComponentInfoArray;
   readonly worldURL: string;
   readonly baseURL: string;
   readonly units: UnitInfoArray;
   readonly rootNodes: MFNode;
   readonly protos: ProtoDeclarationArray;
   readonly externprotos: ExternProtoDeclarationArray;
   readonly routes: RouteArray;

   createNode <T extends keyof ConcreteNodesType> (typeName: T): ConcreteNodesType [T];
   createProto (protoName: string): SFNode;
   getNamedNode (name: string): SFNode;
   addNamedNode (name: string, node: SFNode): void;
   updateNamedNode (name: string, node: SFNode): void;
   removeNamedNode (name: string): void;
   getImportedNode (importedName: string): SFNode;
   addImportedNode (inlineNode: SFNode, exportedName: string, importedName?: string): void;
   updateImportedNode (inlineNode: SFNode, exportedName: string, importedName?: string): void;
   removeImportedNode (importedName: string): void;
   addRoute (sourceNode: SFNode, sourceField: string, destinationNode: SFNode, destinationField: string): X3DRoute;
   deleteRoute (route: X3DRoute): void;

   toVRMLString (options?: ToStringOptions): string;
   toXMLString (options?: ToStringOptions): string;
   toJSONString (options?: ToStringOptions): string;
}

declare class ProfileInfoArray extends X3DInfoArray <ProfileInfo> { }

declare class ProfileInfo
{
   readonly name: string;
   readonly title: string;
   readonly providerURL: string;
   readonly components: ComponentInfoArray
}

declare class ComponentInfoArray extends X3DInfoArray <ComponentInfo> { }

declare class ComponentInfo
{
   readonly name: string;
   readonly level: number;
   readonly title: string;
   readonly providerURL: string;
}

declare class UnitInfoArray extends X3DInfoArray <UnitInfo> { }

declare class UnitInfo
{
   readonly category: string;
   readonly name: string;
   readonly conversionFactor: number;
}

declare class ProtoDeclarationArray extends X3DInfoArray <X3DProtoDeclaration> { }

declare class X3DProtoDeclaration
{
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   readonly isExternProto: false;

   newInstance (): SFNode;
   toVRMLString (options?: ToStringOptions): string;
   toXMLString (options?: ToStringOptions): string;
   toJSONString (options?: ToStringOptions): string;
}

declare class ExternProtoDeclarationArray extends X3DInfoArray <X3DExternProtoDeclaration> { }

declare class X3DExternProtoDeclaration
{
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   readonly urls: MFString;
   readonly isExternProto: false;
   readonly loadState: number;

   newInstance (): SFNode;
   loadNow (): Promise <void>;
   toVRMLString (options?: ToStringOptions): string;
   toXMLString (options?: ToStringOptions): string;
   toJSONString (options?: ToStringOptions): string;
}

declare class RouteArray extends X3DInfoArray <X3DRoute> { }

declare class X3DRoute
{
   readonly sourceNode: SFNode;
   readonly sourceField: string;
   readonly destinationNode: SFNode;
   readonly destinationField: string;
}

declare class X3DInfoArray <T>
{
   [index: number]: T;
   length: number;
}

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
   readonly DirectionalLight: number;
   readonly DISEntityManager: number;
   readonly DISEntityTypeMapping: number;
   readonly Disk2D: number;
   readonly DoubleAxisHingeJoint: number;
   readonly DynamicsCompressor: number;
   readonly EaseInEaseOut: number;
   readonly EdgeEnhancementVolumeStyle: number;
   readonly ElevationGrid: number;
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
   readonly ProtoInstance: number;
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

declare class FieldDefinitionArray extends X3DInfoArray <X3DFieldDefinition> { }

declare class X3DFieldDefinition
{
   readonly accessType: number;
   readonly dataType: string;
   readonly name: string;
   readonly value: X3DField;
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

declare class SFBool extends X3DField
{
   static readonly typeName: "SFBool";

   constructor ();
   constructor (value: boolean);

   valueOf (): boolean;
}

declare class SFColor extends X3DField
{
   static readonly typeName: "SFColor";

   constructor ();
   constructor (r: number, g: number, b: number);

   r: number;
   g: number;
   b: number;

   [index: number]: number;

   getHSV (): number [];
   setHSV (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColor;
}

declare class SFColorRGBA extends X3DField
{
   static readonly typeName: "SFColorRGBA";

   constructor ();
   constructor (r: number, g: number, b: number, a: number);

   r: number;
   g: number;
   b: number;
   a: number;

   [index: number]: number;

   getHSVA (): number [];
   setHSVA (h: number, s: number, v: number): void;
   lerp (destination: SFColor, t: number): SFColorRGBA;
}

declare class SFDouble extends X3DField
{
   static readonly typeName: "SFDouble";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

declare class SFFloat extends X3DField
{
   static readonly typeName: "SFFloat";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

declare class SFImage extends X3DField
{
   static readonly typeName: "SFImage";

   constructor ();
   constructor (width: number, height: number, components: number, array: MFInt32);

   x: number;
   y: number;
   width: number;
   height: number;
   comp: number;
   array: MFInt32;
}

declare class SFInt32 extends X3DField
{
   static readonly typeName: "SFInt32";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

declare class SFMatrix3 extends X3DField
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
   multVecMatrix <T extends SFVec2d | SFVec2f> (row: T): T;
   multVecMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   multMatrixVec <T extends SFVec2d | SFVec2f> (col: T): T;
   multMatrixVec <T extends SFVec3d | SFVec3f> (col: T): T;
   multDirMatrix <T extends SFVec2d | SFVec2f> (row: T): T;
   multMatrixDir <T extends SFVec2d | SFVec2f> (col: T): T;
}

declare class SFMatrix3d extends SFMatrix3
{
   static readonly typeName: "SFMatrix3d";
}

declare class SFMatrix3f extends SFMatrix3
{
   static readonly typeName: "SFMatrix3f";
}

declare class SFMatrix4 extends X3DField
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
   multVecMatrix <T extends SFVec4d | SFVec4f> (row: T): T;
   multVecMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   multMatrixVec <T extends SFVec4d | SFVec4f> (col: T): T;
   multMatrixVec <T extends SFVec3d | SFVec3f> (col: T): T;
   multDirMatrix <T extends SFVec3d | SFVec3f> (row: T): T;
   multMatrixDir <T extends SFVec3d | SFVec3f> (col: T): T;
}

declare class SFMatrix4d extends SFMatrix4
{
   static readonly typeName: "SFMatrix4d";
}

declare class SFMatrix4f extends SFMatrix4
{
   static readonly typeName: "SFMatrix4f";
}

declare class SFNode extends X3DField
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
   toVRMLString (options?: ToStringOptions): string;
   toXMLString (options?: ToStringOptions): string;
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

declare class SFRotation extends X3DField
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
   multVec <T extends SFVec3d | SFVec3f> (vector: T): T;
   setAxis (axis: SFVec3): void;
   setMatrix (matrix: SFMatrix3): void;
   slerp (destination: SFRotation, t: number): SFRotation;
}

declare class SFString extends X3DField
{
   static readonly typeName: "SFString";

   constructor ();
   constructor (value: string);

   length: number;

   valueOf (): string;
}

declare class SFTime extends X3DField
{
   static readonly typeName: "SFTime";

   constructor ();
   constructor (value: number);

   valueOf (): number;
}

declare class SFVec2 extends X3DField
{
   constructor ();
   constructor (x: number, y: number);

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

declare class SFVec2d extends SFVec2
{
   static readonly typeName: "SFVec2d";
}

declare class SFVec2f extends SFVec2
{
   static readonly typeName: "SFVec2f";
}

declare class SFVec3 extends X3DField
{
   constructor ();
   constructor (x: number, y: number, z: number);

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

declare class SFVec3d extends SFVec3
{
   static readonly typeName: "SFVec3d";
}

declare class SFVec3f extends SFVec3
{
   static readonly typeName: "SFVec3f";
}

declare class SFVec4 extends X3DField
{
   constructor ();
   constructor (x: number, y: number, z: number, w: number);

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

declare class SFVec4d extends SFVec4
{
   static readonly typeName: "SFVec4d";
}

declare class SFVec4f extends SFVec4
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

declare class MFNode <T extends SFNode = SFNode> extends X3DArrayField <T>
{
   static readonly typeName: "MFNode";
}

declare class MFRotation extends X3DArrayField <SFRotation>
{
   static readonly typeName: "MFRotation";
}

declare class MFString extends X3DArrayField <string>
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

/** AcousticProperties specifies the interaction of sound waves with characteristics of geometric objects in the scene. */
interface AcousticPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * specifies the sound absorption coefficient of a surface, meaning the ratio of sound intensity not reflected by a surface.
   *
   * Access type is 'inputOutput'.
   */
   absorption: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * diffuse coefficient of sound reflection indicates how much of the incident sound energy is reflected back in multiple directions.
   *
   * Access type is 'inputOutput'.
   */
   diffuse: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * sound refraction coefficient of a medium, which determines change in propagation direction of sound wave when obliquely crossing boundary between two mediums where its speed is different.
   *
   * Access type is 'inputOutput'.
   */
   refraction: number,
   /**
   * specular coefficient of sound reflection striking a plane surface, directly reflected back into space, where angle of reflection equals angle of incidence.
   *
   * Access type is 'inputOutput'.
   */
   specular: number,
}

/** Analyser provides real-time frequency and time-domain analysis information, without any change to the input. */
interface AnalyserProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * fftSize represents size of Fast Fourier Transform (FFT) used to determine frequency domain.
   *
   * Access type is 'inputOutput'.
   */
   fftSize: number,
   /**
   * frequencyBinCount is half of fftSize and generally equates to number of data values available for the visualization.
   *
   * Access type is 'inputOutput'.
   */
   frequencyBinCount: number,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * maxDecibels represents maximum power value in scaling range for FFT analysis data.
   *
   * Access type is 'inputOutput'.
   */
   maxDecibels: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minDecibels represents minimum power value in scaling range for FFT analysis data.
   *
   * Access type is 'inputOutput'.
   */
   minDecibels: number,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * smoothingTimeConstant represents averaging constant during last analysis frame.
   *
   * Access type is 'inputOutput'.
   */
   smoothingTimeConstant: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** Anchor is a Grouping node that can contain most nodes. */
interface AnchorProxy extends X3DGroupingNodeProxy, X3DUrlObjectProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * The [autoRefresh field has no effect, Anchor operation is only triggered by user selection.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * The [autoRefreshTimeLimit field has no effect, Anchor operation is only triggered by user selection.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * The load field has no effect, Anchor operation is only triggered by user selection.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If provided, parameter tells the X3D player where to to redirect the loaded url.
   *
   * Access type is 'inputOutput'.
   */
   parameter: MFString,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Address of replacement world, or #ViewpointDEFName within the current scene, or alternate Web resource, activated by the user selecting Shape geometry within the Anchor children nodes.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Appearance specifies the visual properties of geometry by containing the Material, ImageTexture/MovieTexture/PixelTexture, FillProperties, LineProperties, programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) and TextureTransform nodes. */
interface AppearanceProxy extends X3DAppearanceNodeProxy
{
   /**
   * Single contained acousticProperties node that can specify additional acoustic attributes applied to associated surface geometry.
   *
   * Access type is 'inputOutput'.
   */
   acousticProperties: AcousticPropertiesProxy,
   /**
   * Threshold value used for pixel rendering either transparent or opaque, used when alphaMode="MASK".
   *
   * Access type is 'inputOutput'.
   */
   alphaCutoff: number,
   /**
   * Provides options for control of alpha transparency handling for textures.
   *
   * Access type is 'inputOutput'.
   */
   alphaMode: string,
   /**
   * Access type is 'inputOutput'.
   */
   backMaterial: X3DMaterialNodeProxy,
   /**
   * Single contained FillProperties node that can specify additional visual attributes applied to polygonal areas of corresponding geometry, on top of whatever other appearance is already defined.
   *
   * Access type is 'inputOutput'.
   */
   fillProperties: FillPropertiesProxy,
   /**
   * Single contained LineProperties node that can specify additional visual attributes applied to corresponding line geometry.
   *
   * Access type is 'inputOutput'.
   */
   lineProperties: LinePropertiesProxy,
   /**
   * Single contained Material node that can specify visual attributes for lighting response (color types, transparency, etc.
   *
   * Access type is 'inputOutput'.
   */
   material: X3DMaterialNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained PointProperties node that can specify additional visual attributes applied to corresponding point geometry.
   *
   * Access type is 'inputOutput'.
   */
   pointProperties: PointPropertiesProxy,
   /**
   * Zero or more contained programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) that specify, in order of preference, author-programmed rendering characteristics.
   *
   * Access type is 'inputOutput'.
   */
   shaders: MFNode <X3DShaderNodeProxy>,
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * Access type is 'inputOutput'.
   */
   texture: X3DTextureNodeProxy,
   /**
   * Single contained TextureTransform node that defines 2D transformation applied to texture coordinates.
   *
   * Access type is 'inputOutput'.
   */
   textureTransform: X3DTextureTransformNodeProxy,
}

/** Arc2D is a line-based geometry node that defines a linear circular arc with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface Arc2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * Access type is 'initializeOnly'.
   */
   endAngle: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * circle radius, of which the arc is a portion.
   *
   * Access type is 'initializeOnly'.
   */
   radius: number,
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * Access type is 'initializeOnly'.
   */
   startAngle: number,
}

/** ArcClose2D is a polygonal geometry node that defines a linear circular arc, closed by PIE or CHORD line segments, with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface ArcClose2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Defines whether pair of line segments connect to center (PIE), or single line-segment chord connects arc endpoints (CHORD).
   *
   * Access type is 'initializeOnly'.
   */
   closureType: string,
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * Access type is 'initializeOnly'.
   */
   endAngle: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * circle radius, of which the arc is a portion.
   *
   * Access type is 'initializeOnly'.
   */
   radius: number,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Arc extends from startAngle counterclockwise to endAngle, in radians.
   *
   * Access type is 'initializeOnly'.
   */
   startAngle: number,
}

/** AudioClip provides audio data used by parent Sound nodes. */
interface AudioClipProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * or -1.
   *
   * Access type is 'outputOnly'.
   */
   readonly duration_changed: number,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * Access type is 'inputOutput'.
   */
   loop: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * Multiplier for the rate at which sampled sound is played.
   *
   * Access type is 'inputOutput'.
   */
   pitch: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Location and filename of sound file or stream.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** AudioDestination node represents the final audio destination and is what user ultimately hears, typically from the speakers of user device. */
interface AudioDestinationProxy extends X3DSoundDestinationNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * [maxChannelCount.
   *
   * Access type is 'inputOutput'.
   */
   maxChannelCount: number,
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * Access type is 'inputOutput'.
   */
   mediaDeviceID: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Background simulates ground and sky, using vertical arrays of wraparound color values. */
interface BackgroundProxy extends X3DBackgroundNodeProxy
{
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   backUrl: MFString,
   /**
   * event sent when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   bottomUrl: MFString,
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   frontUrl: MFString,
   /**
   * The angle array values increase from 0.
   *
   * Access type is 'inputOutput'.
   */
   groundAngle: MFFloat,
   /**
   * Color of the ground at the various angles on the ground partial sphere.
   *
   * Access type is 'inputOutput'.
   */
   groundColor: MFColor,
   /**
   * event true sent when node becomes active, event false sent when unbound by another node.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   leftUrl: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   rightUrl: MFString,
   /**
   * Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * The angle array values increase from 0.
   *
   * Access type is 'inputOutput'.
   */
   skyAngle: MFFloat,
   /**
   * Color of the sky at various angles on the sky sphere.
   *
   * Access type is 'inputOutput'.
   */
   skyColor: MFColor,
   /**
   * Image background panorama between ground/sky backdrop and scene's geometry.
   *
   * Access type is 'inputOutput'.
   */
   topUrl: MFString,
   /**
   * how "clear" the background is, allows underlying page to show through: 1.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** BallJoint represents an unconstrained joint between two bodies that pivot about a common anchor point. */
interface BallJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   anchorPoint: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1AnchorPoint: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2AnchorPoint: SFVec3f,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Billboard is a Grouping node that can contain most nodes. */
interface BillboardProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * axisOfRotation direction is relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   axisOfRotation: SFVec3f,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** BiquadFilter node is an AudioNode processor implementing common low-order filters. */
interface BiquadFilterProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * The detune field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.
   *
   * Access type is 'inputOutput'.
   */
   detune: number,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * frequency at which the BiquadFilterNode operates, in Hz.
   *
   * Access type is 'inputOutput'.
   */
   frequency: number,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * qualityFactor is Quality Factor (Q) of the respective filter algorithm.
   *
   * Access type is 'inputOutput'.
   */
   qualityFactor: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
   /**
   * type selects which BiquadFilter algorithm is used.
   *
   * Access type is 'inputOutput'.
   */
   type: string,
}

/** BlendedVolumeStyle combines rendering of two voxel data sets into one by blending voxel values. */
interface BlendedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained X3DComposableVolumeRenderStyleNode node that defines specific rendering technique for data in the voxels field, and the result is blended with parent VolumeData or SegmentedVoliumeData node.
   *
   * Access type is 'inputOutput'.
   */
   renderStyle: X3DComposableVolumeRenderStyleNodeProxy,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides second set of raw voxel information utilized by corresponding rendering styles.
   *
   * Access type is 'inputOutput'.
   */
   voxels: X3DTexture3DNodeProxy,
   /**
   * weightConstant1 is used when weightFunction1=CONSTANT.
   *
   * Access type is 'inputOutput'.
   */
   weightConstant1: number,
   /**
   * weightConstant2 is used when weightFunction2=CONSTANT.
   *
   * Access type is 'inputOutput'.
   */
   weightConstant2: number,
   /**
   * specifies 2D textures used to determine weight values when weight function is set to TABLE.
   *
   * Access type is 'inputOutput'.
   */
   weightFunction1: string,
   /**
   * specifies 2D textures used to determine weight values when weight function is set to TABLE.
   *
   * Access type is 'inputOutput'.
   */
   weightFunction2: string,
   /**
   * The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE".
   *
   * Access type is 'inputOutput'.
   */
   weightTransferFunction1: X3DTexture2DNodeProxy,
   /**
   * The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE".
   *
   * Access type is 'inputOutput'.
   */
   weightTransferFunction2: X3DTexture2DNodeProxy,
}

/** BooleanFilter selectively passes true, false or negated events. */
interface BooleanFilterProxy extends X3DChildNodeProxy
{
   /**
   * inputFalse only passes a false value, which occurs when set_boolean is false.
   *
   * Access type is 'outputOnly'.
   */
   readonly inputFalse: boolean,
   /**
   * inputNegate is an output event that provides an opposite value by negating set_boolean input.
   *
   * Access type is 'outputOnly'.
   */
   readonly inputNegate: boolean,
   /**
   * inputTrue only passes a true value, which occurs when set_boolean input is true.
   *
   * Access type is 'outputOnly'.
   */
   readonly inputTrue: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_boolean is the input value to be filtered.
   *
   * Access type is 'inputOnly'.
   */
   set_boolean: boolean,
}

/** BooleanSequencer generates periodic discrete Boolean values. */
interface BooleanSequencerProxy extends X3DSequencerNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear sequencing, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFBool,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Send next output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * Access type is 'inputOnly'.
   */
   next: boolean,
   /**
   * Send previous output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * Access type is 'inputOnly'.
   */
   previous: boolean,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Single intermittent output value determined by current key time and corresponding keyValue entry.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: boolean,
}

/** BooleanToggle maintains state and negates output when a true input is provided. */
interface BooleanToggleProxy extends X3DChildNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If input event set_boolean is true, flip state by negating current value of the toggle field Hint: for logical consistency, input event set_boolean false has no effect (under review as part of Mantis issue 519).
   *
   * Access type is 'inputOnly'.
   */
   set_boolean: boolean,
   /**
   * Persistent state value that gets toggled or reset.
   *
   * Access type is 'inputOutput'.
   */
   toggle: boolean,
}

/** BooleanTrigger converts time events to boolean true events. */
interface BooleanTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_triggerTime provides input time event, typical event sent is TouchSensor touchTime.
   *
   * Access type is 'inputOnly'.
   */
   set_triggerTime: number,
   /**
   * triggerTrue outputs a true value whenever a triggerTime event is received.
   *
   * Access type is 'outputOnly'.
   */
   readonly triggerTrue: boolean,
}

/** BoundaryEnhancementVolumeStyle provides boundary enhancement for the volume rendering style. */
interface BoundaryEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * boundaryOpacity k_gs is the factored amount of the gradient enhancement to use.
   *
   * Access type is 'inputOutput'.
   */
   boundaryOpacity: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * opacityFactor k_ge is the power function to control the slope of the opacity curve to highlight the set of data.
   *
   * Access type is 'inputOutput'.
   */
   opacityFactor: number,
   /**
   * retainedOpacity k_gc is the amount of initial opacity to mix into the output.
   *
   * Access type is 'inputOutput'.
   */
   retainedOpacity: number,
}

/** BoundedPhysicsModel provides user-defined geometrical boundaries for particle motion. */
interface BoundedPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Single contained geometry node provides the geometry used for each particle when the parent ParticleSystem node has geometryType=GEOMETRY.
   *
   * Access type is 'inputOutput'.
   */
   geometry: X3DGeometryNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Box is a geometry node specifying a rectangular cuboid. */
interface BoxProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * size x y z in meters.
   *
   * Access type is 'initializeOnly'.
   */
   size: SFVec3f,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
}

/** BufferAudioSource node represents a memory-resident audio asset that can contain one or more channels. */
interface BufferAudioSourceProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * buffer is a memory-resident audio asset that can contain one or more channels.
   *
   * Access type is 'inputOutput'.
   */
   buffer: MFFloat,
   /**
   * bufferDuration is duration in seconds to use from buffer field.
   *
   * Access type is 'inputOutput'.
   */
   bufferDuration: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly bufferlength: number,
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * The detune field forms a compound field together with playbackRate that together determine a computedPlaybackRate value.
   *
   * Access type is 'inputOutput'.
   */
   detune: number,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly length: number,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * Access type is 'inputOutput'.
   */
   loop: boolean,
   /**
   * loopEnd field is optional playhead position where looping ends if loop=true.
   *
   * Access type is 'inputOutput'.
   */
   loopEnd: number,
   /**
   * loopStart field is optional playhead position where looping begins if loop=true.
   *
   * Access type is 'inputOutput'.
   */
   loopStart: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * numberOfChannels is number of audio channels found in this buffer source.
   *
   * Access type is 'inputOutput'.
   */
   numberOfChannels: number,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * playbackRate field is speed at which to render the audio stream, and forms a compound field together with detune field Hint: negative values play in reverse.
   *
   * Access type is 'inputOutput'.
   */
   playbackRate: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * sampleRate field is sample-frames per second.
   *
   * Access type is 'inputOutput'.
   */
   sampleRate: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Location and filename of sound file.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** CADAssembly holds a set of Computer-Aided Design (CAD) assemblies or parts grouped together. */
interface CADAssemblyProxy extends X3DGroupingNodeProxy, X3DProductStructureChildNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Optional name for this particular CAD node.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CADFace holds geometry representing one face in a Computer-Aided Design (CAD) CADPart. */
interface CADFaceProxy extends X3DProductStructureChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Optional name for this particular CAD node.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Contained Shape for this CADPart.
   *
   * Access type is 'inputOutput'.
   */
   shape: ShapeProxy | LODProxy | TransformProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CADLayer nodes define a hierarchy that shows layer structure for a Computer-Aided Design (CAD) model. */
interface CADLayerProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Optional name for this particular CAD node.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CADPart is an atomic part that defines both coordinate-system location and the faces that constitute a part in a Computer-Aided Design (CAD) model. */
interface CADPartProxy extends X3DProductStructureChildNodeProxy, X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <CADFaceProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <CADFaceProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Optional name for this particular CAD node.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <CADFaceProxy>,
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CartoonVolumeStyle generates cartoon-style non-photorealistic rendering of associated volumetric data. */
interface CartoonVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Number of distinct colors taken from interpolated colors and used to render the object.
   *
   * Access type is 'inputOutput'.
   */
   colorSteps: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * orthogonalColor is used for surface normals that are orthogonal (perpendicular) to viewer's current location.
   *
   * Access type is 'inputOutput'.
   */
   orthogonalColor: SFColorRGBA,
   /**
   * parallelColor is used for surface normals that are orthogonal to viewer's current location.
   *
   * Access type is 'inputOutput'.
   */
   parallelColor: SFColorRGBA,
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * Access type is 'inputOutput'.
   */
   surfaceNormals: X3DTexture3DNodeProxy,
}

/** ChannelMerger unites different input channels into a single output channel. */
interface ChannelMergerProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** ChannelSelector selects a single channel output from all input channels. */
interface ChannelSelectorProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * channelSelection is single channel of interest from those provided by input nodes.
   *
   * Access type is 'inputOutput'.
   */
   channelSelection: number,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** ChannelSplitter separates the different channels of a single audio source into a set of monophonic output channels. */
interface ChannelSplitterProxy extends X3DSoundChannelNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node, making up a section of the audio graph.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The outputs field is a set of output nodes receiving the split channels, and making up a section of the audio graph.
   *
   * Access type is 'inputOutput'.
   */
   outputs: MFNode <X3DSoundChannelNodeProxy | X3DSoundProcessingNodeProxy | X3DSoundSourceNodeProxy>,
}

/** Circle2D is a geometry node that defines a linear X-Y circle with center (0,0) in X-Y plane. */
interface Circle2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * circle radius.
   *
   * Access type is 'initializeOnly'.
   */
   radius: number,
}

/** ClipPlane specifies a single plane equation used to clip (i. */
interface ClipPlaneProxy extends X3DChildNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If (a,b,c,d) is the plane, with the first three components being a normalized vector describing the plane's normal direction (and thus the fourth component d being distance from the origin), a point (x,y,z) is visible to the user, with regards to the clipping plane, if a*x+b*y+c*z+d is greater than 0.
   *
   * Access type is 'inputOutput'.
   */
   plane: SFVec4f,
}

/** CollidableOffset repositions geometry relative to center of owning body. */
interface CollidableOffsetProxy extends X3DNBodyCollidableNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * The collidable field holds a reference to a single nested item of a collidable scene graph.
   *
   * Access type is 'initializeOnly'.
   */
   collidable: X3DNBodyCollidableNodeProxy,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CollidableShape connects the collision detection system, the rigid body model, and the renderable scene graph. */
interface CollidableShapeProxy extends X3DNBodyCollidableNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * The shape field provides a geometry proxy for specifying which geometry best represents the collidable object.
   *
   * Access type is 'initializeOnly'.
   */
   shape: ShapeProxy,
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Collision detects camera-to-object contact using current view and NavigationInfo avatarSize. */
interface CollisionProxy extends X3DGroupingNodeProxy, X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Time of collision between camera (avatar) and geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly collideTime: number,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables collision detection for children and all descendants.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The proxy node is used as a substitute for Collision children during collision detection, simplifying collision-intersection computations.
   *
   * Access type is 'initializeOnly'.
   */
   proxy: X3DChildNodeProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CollisionCollection holds a collection of objects that can be managed as a single entity for resolution of inter-object collisions. */
interface CollisionCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Default global parameters for collision outputs of rigid body physics system.
   *
   * Access type is 'inputOutput'.
   */
   appliedParameters: MFString,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).
   *
   * Access type is 'inputOutput'.
   */
   bounce: number,
   /**
   * CollisionCollection node holds a collection of objects in the collidables field that can be managed as a single entity for resolution of inter-object collisions with other groups of collidable objects.
   *
   * Access type is 'inputOutput'.
   */
   collidables: MFNode <X3DNBodyCollisionSpaceNodeProxy | X3DNBodyCollidableNodeProxy>,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * frictionCoefficients used for computing surface drag.
   *
   * Access type is 'inputOutput'.
   */
   frictionCoefficients: SFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minBounceSpeed m/s needed to bounce.
   *
   * Access type is 'inputOutput'.
   */
   minBounceSpeed: number,
   /**
   * slipFactors used for computing surface drag.
   *
   * Access type is 'inputOutput'.
   */
   slipFactors: SFVec2f,
   /**
   * softnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * Access type is 'inputOutput'.
   */
   softnessConstantForceMix: number,
   /**
   * softnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).
   *
   * Access type is 'inputOutput'.
   */
   softnessErrorCorrection: number,
   /**
   * surfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.
   *
   * Access type is 'inputOutput'.
   */
   surfaceSpeed: SFVec2f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** CollisionSensor generates collision-detection events. */
interface CollisionSensorProxy extends X3DSensorNodeProxy
{
   /**
   * The collider field specifies a CollisionCollection node that holds a collidables field of nodes and spaces that are to be included in collision-detection computations.
   *
   * Access type is 'inputOutput'.
   */
   collider: CollisionCollectionProxy,
   /**
   * Access type is 'outputOnly'.
   */
   readonly contacts: MFNode <ContactProxy>,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly intersections: MFNode <X3DNBodyCollidableNodeProxy>,
   /**
   * isActive true/false events are sent when sensing starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** CollisionSpace holds collection of objects considered together for resolution of inter-object collisions. */
interface CollisionSpaceProxy extends X3DNBodyCollisionSpaceNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Collection of collidable objects as well as nested CollisionSpace collections.
   *
   * Access type is 'inputOutput'.
   */
   collidables: MFNode <X3DNBodyCollisionSpaceNodeProxy | X3DNBodyCollidableNodeProxy>,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * useGeometry indicates whether collision-detection code checks down to level of geometry, or only make approximations using geometry bounds.
   *
   * Access type is 'inputOutput'.
   */
   useGeometry: boolean,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Color node defines a set of RGB color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorProxy extends X3DColorNodeProxy
{
   /**
   * The color field defines an array of 3-tuple RGB colors.
   *
   * Access type is 'inputOutput'.
   */
   color: MFColor,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** ColorChaser generates a series of SFColor values that progressively change from initial value to destination value. */
interface ColorChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFColor,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFColor,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFColor,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFColor,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFColor,
}

/** ColorDamper generates a series of RGB color values that progressively change from initial value to destination value. */
interface ColorDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFColor,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFColor,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFColor,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFColor,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFColor,
}

/** ColorInterpolator generates a range of color values. */
interface ColorInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFColor,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFColor,
}

/** ColorRGBA node defines a set of RGBA color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorRGBAProxy extends X3DColorNodeProxy
{
   /**
   * The color field defines an array of 4-tuple RGBA colors.
   *
   * Access type is 'inputOutput'.
   */
   color: MFColorRGBA,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** ComposedCubeMapTexture is a texture node that defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes. */
interface ComposedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * Access type is 'inputOutput'.
   */
   backTexture: X3DTexture2DNodeProxy,
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture, other texture nodes).
   *
   * Access type is 'inputOutput'.
   */
   bottomTexture: X3DTexture2DNodeProxy,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * Access type is 'inputOutput'.
   */
   frontTexture: X3DTexture2DNodeProxy,
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodese).
   *
   * Access type is 'inputOutput'.
   */
   leftTexture: X3DTexture2DNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * Access type is 'inputOutput'.
   */
   rightTexture: X3DTexture2DNodeProxy,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * Parent ComposedCubeMapTexture element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture, other texture nodes).
   *
   * Access type is 'inputOutput'.
   */
   topTexture: X3DTexture2DNodeProxy,
}

/** ComposedShader can contain field declarations, but no CDATA section of plain-text source code, since programs are composed from child ShaderPart nodes. */
interface ComposedShaderProxy extends X3DShaderNodeProxy, X3DProgrammableShaderObjectProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * Access type is 'inputOnly'.
   */
   activate: boolean,
   /**
   * Include a field statement for each field declaration in the ComposedShader node.
   *
   * Access type is 'inputOutput'.
   */
   field: MFNode <fieldProxy>,
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isSelected: boolean,
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * Access type is 'outputOnly'.
   */
   readonly isValid: boolean,
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * Access type is 'initializeOnly'.
   */
   language: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * ComposedShader can contain multiple ShaderPart nodes in the parts field.
   *
   * Access type is 'inputOutput'.
   */
   parts: MFNode <ShaderPartProxy>,
}

/** ComposedTexture3D defines a 3D image-based texture map as a collection of 2D texture sources at various depths. */
interface ComposedTexture3DProxy extends X3DTexture3DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * Access type is 'initializeOnly'.
   */
   repeatR: boolean,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * collection of 2D texture sources.
   *
   * Access type is 'inputOutput'.
   */
   texture: MFNode <X3DTexture2DNodeProxy>,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
}

/** ComposedVolumeStyle allows compositing multiple rendering styles into single rendering pass. */
interface ComposedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * List of contributing rendering style nodes or node references that can be applied to the object.
   *
   * Access type is 'inputOutput'.
   */
   renderStyle: MFNode <X3DComposableVolumeRenderStyleNodeProxy>,
}

/** Cone is a geometry node. */
interface ConeProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether to draw bottom (other inside faces are not drawn).
   *
   * Access type is 'inputOutput'.
   */
   bottom: boolean,
   /**
   * Size in meters.
   *
   * Access type is 'initializeOnly'.
   */
   bottomRadius: number,
   /**
   * Size in meters.
   *
   * Access type is 'initializeOnly'.
   */
   height: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to draw sides (other inside faces are not drawn).
   *
   * Access type is 'inputOutput'.
   */
   side: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
}

/** ConeEmitter generates all available particles from a specific point in space. */
interface ConeEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Cone boundary for random distribution of particles about initial direction.
   *
   * Access type is 'inputOutput'.
   */
   angle: number,
   /**
   * Initial direction from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Point from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** Contact nodes are produced as output events when two collidable objects or spaces make contact. */
interface ContactProxy extends X3DNodeProxy
{
   /**
   * Default global parameters for collision outputs of rigid body physics system.
   *
   * Access type is 'inputOutput'.
   */
   appliedParameters: MFString,
   /**
   * The body1 and body2 fields specify two top-level nodes that should be evaluated in the physics model as a single set of interactions with respect to each other.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * The body1 and body2 fields specify two top-level nodes that should be evaluated in the physics model as a single set of interactions with respect to each other.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * bounce indicates bounciness (0 = no bounce at all, 1 = maximum bounce).
   *
   * Access type is 'inputOutput'.
   */
   bounce: number,
   /**
   * contactNormal is unit vector describing normal between two colliding bodies.
   *
   * Access type is 'inputOutput'.
   */
   contactNormal: SFVec3f,
   /**
   * depth indicates how deep the current intersection is along normal vector.
   *
   * Access type is 'inputOutput'.
   */
   depth: number,
   /**
   * frictionCoefficients used for computing surface drag.
   *
   * Access type is 'inputOutput'.
   */
   frictionCoefficients: SFVec2f,
   /**
   * frictionDirection controls friction vector.
   *
   * Access type is 'inputOutput'.
   */
   frictionDirection: SFVec3f,
   /**
   * The geometry1 and geometry2 fields specify collision-related information about body1 and body2.
   *
   * Access type is 'inputOutput'.
   */
   geometry1: X3DNBodyCollidableNodeProxy,
   /**
   * The geometry1 and geometry2 fields specify collision-related information about body1 and body2.
   *
   * Access type is 'inputOutput'.
   */
   geometry2: X3DNBodyCollidableNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minBounceSpeed m/s needed to bounce.
   *
   * Access type is 'inputOutput'.
   */
   minBounceSpeed: number,
   /**
   * position (x, y, z in meters) of exact location of collision.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * slipCoefficients used for computing surface drag.
   *
   * Access type is 'inputOutput'.
   */
   slipCoefficients: SFVec2f,
   /**
   * softnessConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * Access type is 'inputOutput'.
   */
   softnessConstantForceMix: number,
   /**
   * softnessErrorCorrection indicates fraction of collision error fixed in a set of evaluations (0 = no error correction, 1 = all errors corrected in single step).
   *
   * Access type is 'inputOutput'.
   */
   softnessErrorCorrection: number,
   /**
   * surfaceSpeed defines speed vectors for computing surface drag, if contact surfaces move independently of bodies.
   *
   * Access type is 'inputOutput'.
   */
   surfaceSpeed: SFVec2f,
}

/** Contour2D groups a set of curve segments into a composite contour. */
interface Contour2DProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>,
   /**
   * The children form a closed loop with first point of first child repeated as last point of last child, and the last point of a segment repeated as first point of the consecutive one.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <NurbsCurve2DProxy | ContourPolyline2DProxy>,
}

/** ContourPolyline2D defines a linear curve segment as part of a trimming contour in the u-v domain of a NURBS surface. */
interface ContourPolyline2DProxy extends X3DNurbsControlCurveNodeProxy
{
   /**
   * controlPoint specifies the end points of each segment of the piecewise linear curve.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: MFVec2d,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Convolver performs a linear convolution on a given AudioBuffer, often used to achieve a reverberation effect. */
interface ConvolverProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * buffer is a memory-resident audio asset that can contain one or more channels.
   *
   * Access type is 'inputOutput'.
   */
   buffer: MFFloat,
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalize controls whether or not the impulse response from the buffer is scaled by an equal-power normalization when the buffer field is set.
   *
   * Access type is 'inputOutput'.
   */
   normalize: boolean,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** Coordinate builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateProxy extends X3DCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * point contains a set of 3D coordinate (triplet) point values.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec3f,
}

/** CoordinateChaser generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: MFVec3f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: MFVec3f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: MFVec3f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: MFVec3f,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec3f,
}

/** CoordinateDamper generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: MFVec3f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: MFVec3f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: MFVec3f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: MFVec3f,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec3f,
}

/** CoordinateDouble builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateDoubleProxy extends X3DCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * point contains a set of 3D coordinate (triplet) point values.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec3d,
}

/** CoordinateInterpolator linearly interpolates among a list of 3-tuple MFVec3f arrays, producing a single MFVec3f array that is fractional average between two nearest arrays in the list. */
interface CoordinateInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec3f,
}

/** CoordinateInterpolator2D generates a series of SFVec2f or MFVec2f 2-tuple float values. */
interface CoordinateInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec2f,
}

/** Cylinder is a geometry node. */
interface CylinderProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether to draw bottom (inside faces are never drawn).
   *
   * Access type is 'inputOutput'.
   */
   bottom: boolean,
   /**
   * Size in meters.
   *
   * Access type is 'initializeOnly'.
   */
   height: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Size in meters.
   *
   * Access type is 'initializeOnly'.
   */
   radius: number,
   /**
   * Whether to draw sides (inside faces are never drawn).
   *
   * Access type is 'inputOutput'.
   */
   side: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Whether to draw top (inside faces are never drawn).
   *
   * Access type is 'inputOutput'.
   */
   top: boolean,
}

/** CylinderSensor converts pointer motion (for example, a mouse or wand) into rotation values using an invisible cylinder aligned with local Y-axis. */
interface CylinderSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * determines whether previous offset values are remembered/accumulated.
   *
   * Access type is 'inputOutput'.
   */
   autoOffset: boolean,
   /**
   * axisRotation determines local sensor coordinate system by rotating the local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   axisRotation: SFRotation,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Help decide rotation behavior from initial relative bearing of pointer drag: acute angle whether cylinder sides or end-cap disks of virtual-geometry sensor are used for manipulation.
   *
   * Access type is 'inputOutput'.
   */
   diskAngle: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * clamps rotation_changed events within range of min/max values Hint: if minAngle > maxAngle, rotation is not clamped.
   *
   * Access type is 'inputOutput'.
   */
   maxAngle: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * clamps rotation_changed events within range of min/max values Hint: if minAngle > maxAngle, rotation is not clamped.
   *
   * Access type is 'inputOutput'.
   */
   minAngle: number,
   /**
   * Sends event and remembers last value sensed.
   *
   * Access type is 'inputOutput'.
   */
   offset: number,
   /**
   * rotation_changed events equal sum of relative bearing changes plus offset value about Y-axis in local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly rotation_changed: SFRotation,
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly trackPoint_changed: SFVec3f,
}

/** Delay causes a time delay between the arrival of input data and subsequent propagation to the output. */
interface DelayProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * delayTime is duration of delay (in seconds) to apply.
   *
   * Access type is 'inputOutput'.
   */
   delayTime: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * maxDelayTime is duration of maximum amount of delay (in seconds) that can be applied.
   *
   * Access type is 'inputOutput'.
   */
   maxDelayTime: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** DirectionalLight might not be scoped by parent Group or Transform at levels 1 or 2. */
interface DirectionalLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * color of light, applied to colors of objects.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Orientation vector of light relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Brightness of direct emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables this light source.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
}

/** DISEntityManager notifies a scene when new DIS ESPDU entities arrive or current entities leave. */
interface DISEntityManagerProxy extends X3DChildNodeProxy
{
   /**
   * addedEntities array contains any new entities added during the last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly addedEntities: MFNode <EspduTransformProxy>,
   /**
   * Multicast network address, or else 'localhost'.
   *
   * Access type is 'inputOutput'.
   */
   address: string,
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * Access type is 'inputOutput'.
   */
   applicationID: number,
   /**
   * mapping field provides a mechanism for automatically creating an X3D model when a new entity arrives over the network.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <DISEntityTypeMappingProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Multicast network port, for example: 3000.
   *
   * Access type is 'inputOutput'.
   */
   port: number,
   /**
   * removedEntities output array provides EspduTransform references to any entities removed during last frame, either due to a timeout or from an explicit RemoveEntityPDU action.
   *
   * Access type is 'outputOnly'.
   */
   readonly removedEntities: MFNode <EspduTransformProxy>,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   siteID: number,
}

/** DISEntityTypeMapping provides a best-match mapping from DIS ESPDU entity type information to a specific X3D model, thus providing a visual and behavioral representation that best matches the entity type. */
interface DISEntityTypeMappingProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain.
   *
   * Access type is 'initializeOnly'.
   */
   category: number,
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * Access type is 'initializeOnly'.
   */
   country: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * Access type is 'initializeOnly'.
   */
   domain: number,
   /**
   * Any extra information required to describe a particular entity.
   *
   * Access type is 'initializeOnly'.
   */
   extra: number,
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * Access type is 'initializeOnly'.
   */
   kind: number,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Specific information about an entity based on the subcategory field.
   *
   * Access type is 'initializeOnly'.
   */
   specific: number,
   /**
   * Integer enumerations value for particular subcategory to which an entity belongs based on the category field.
   *
   * Access type is 'initializeOnly'.
   */
   subcategory: number,
   /**
   * Local and/or online addresses of X3D model of interest, for example: "ExtrusionExampleShip.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** Disk2D is a geometry node that defines a filled (or partially filled) planar circle with center (0,0). */
interface Disk2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Inner circle radius, greater than or equal to 0.
   *
   * Access type is 'initializeOnly'.
   */
   innerRadius: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Outer radius of circle, greater than or equal to inner radius.
   *
   * Access type is 'initializeOnly'.
   */
   outerRadius: number,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
}

/** DoubleAxisHingeJoint has two independent axes located around a common anchor point. */
interface DoubleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   anchorPoint: SFVec3f,
   /**
   * axis1 defines axis vector of joint connection to body1.
   *
   * Access type is 'inputOutput'.
   */
   axis1: SFVec3f,
   /**
   * axis2 defines axis vector of joint connection to body2.
   *
   * Access type is 'inputOutput'.
   */
   axis2: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1AnchorPoint: SFVec3f,
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1Axis: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2AnchorPoint: SFVec3f,
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2Axis: SFVec3f,
   /**
   * desiredAngularVelocity1 is goal rotation rate for hinge connection to body1.
   *
   * Access type is 'inputOutput'.
   */
   desiredAngularVelocity1: number,
   /**
   * desiredAngularVelocity2 is goal rotation rate for hinge connection to body2.
   *
   * Access type is 'inputOutput'.
   */
   desiredAngularVelocity2: number,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * Access type is 'outputOnly'.
   */
   readonly hinge1Angle: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly hinge1AngleRate: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly hinge2Angle: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly hinge2AngleRate: number,
   /**
   * maxAngle1 is maximum rotation angle for hinge.
   *
   * Access type is 'inputOutput'.
   */
   maxAngle1: number,
   /**
   * maxTorque1 is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity1.
   *
   * Access type is 'inputOutput'.
   */
   maxTorque1: number,
   /**
   * maxTorque2 is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity2.
   *
   * Access type is 'inputOutput'.
   */
   maxTorque2: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minAngle1 is minimum rotation angle for hinge.
   *
   * Access type is 'inputOutput'.
   */
   minAngle1: number,
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1Bounce: number,
   /**
   * stop1ConstantForceMix value applies a constant force value to make colliding surfaces appear to be somewhat soft.
   *
   * Access type is 'inputOutput'.
   */
   stop1ConstantForceMix: number,
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1ErrorCorrection: number,
   /**
   * suspensionErrorCorrection describes how quickly the system resolves intersection errors due to floating-point inaccuracies.
   *
   * Access type is 'inputOutput'.
   */
   suspensionErrorCorrection: number,
   /**
   * suspensionForce describes how quickly the system resolves intersection errors due to floating-point inaccuracies.
   *
   * Access type is 'inputOutput'.
   */
   suspensionForce: number,
}

/** DynamicsCompressor node implements a dynamics compression effect, lowering volume of loudest parts of signal and raising volume of softest parts. */
interface DynamicsCompressorProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * The attack field is the duration of time (in seconds) to reduce the gain by 10dB.
   *
   * Access type is 'inputOutput'.
   */
   attack: number,
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * knee field contains a decibel value representing range above threshold where the curve smoothly transitions to compressed portion.
   *
   * Access type is 'inputOutput'.
   */
   knee: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * ratio field represents amount of input change, in dB, needed for 1 dB change in output.
   *
   * Access type is 'inputOutput'.
   */
   ratio: number,
   /**
   * reduction field provides amount of gain reduction in dB currently applied by compressor to signal.
   *
   * Access type is 'outputOnly'.
   */
   readonly reduction: number,
   /**
   * release field represents amount of time (in seconds) to increase gain by 10dB.
   *
   * Access type is 'inputOutput'.
   */
   release: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
   /**
   * threshold field represents decibel value above which compression starts taking effect.
   *
   * Access type is 'inputOutput'.
   */
   threshold: number,
}

/** EaseInEaseOut enables gradual animation transitions by modifying TimeSensor fraction outputs. */
interface EaseInEaseOutProxy extends X3DChildNodeProxy
{
   /**
   * Array of paired values for easeOut fraction and easeIn fraction within each key interval.
   *
   * Access type is 'inputOutput'.
   */
   easeInEaseOut: MFVec2f,
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to easeInEaseOut array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Interpolated output value determined by current key time, corresponding easeInEaseOut smoothing intervals, and corresponding key pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly modifiedFraction_changed: number,
   /**
   * set_fraction selects input fraction for computation of corresponding easeInEaseOut output value, modifiedFraction_changed.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
}

/** EdgeEnhancementVolumeStyle specifies edge enhancement for the volume rendering style. */
interface EdgeEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * color used to highlight edges.
   *
   * Access type is 'inputOutput'.
   */
   edgeColor: SFColorRGBA,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * minimum angle (in radians) away from view-direction vector for surface normal before applying enhancement.
   *
   * Access type is 'inputOutput'.
   */
   gradientThreshold: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * Access type is 'inputOutput'.
   */
   surfaceNormals: X3DTexture3DNodeProxy,
}

/** ElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface ElevationGridProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color node color values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * Access type is 'initializeOnly'.
   */
   creaseAngle: number,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.
   *
   * Access type is 'initializeOnly'.
   */
   height: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.
   *
   * Access type is 'inputOnly'.
   */
   set_height: MFFloat,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy,
   /**
   * Number of elements in the height array along X direction.
   *
   * Access type is 'initializeOnly'.
   */
   xDimension: number,
   /**
   * Meters distance between grid-array vertices along X direction.
   *
   * Access type is 'initializeOnly'.
   */
   xSpacing: number,
   /**
   * Number of elements in the height array along Z direction.
   *
   * Access type is 'initializeOnly'.
   */
   zDimension: number,
   /**
   * Meters distance between grid-array vertices along Z direction.
   *
   * Access type is 'initializeOnly'.
   */
   zSpacing: number,
}

/** EspduTransform is a networked Transform node that can contain most nodes. */
interface EspduTransformProxy extends X3DGroupingNodeProxy, X3DNetworkSensorNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Multicast network address, or else 'localhost'; Example: 224.
   *
   * Access type is 'inputOutput'.
   */
   address: string,
   /**
   * Simulation/exercise applicationID is unique for application at that site.
   *
   * Access type is 'inputOutput'.
   */
   applicationID: number,
   /**
   * Information required for representation of the entity's visual appearance and position of its articulated parts.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterArray: MFFloat,
   /**
   * Array of change counters, each incremented when an articulated parameter is updated.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterChangeIndicatorArray: MFInt32,
   /**
   * Number of articulated parameters attached to this entity state PDU.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterCount: number,
   /**
   * Array of designators for each articulated parameter.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterDesignatorArray: MFInt32,
   /**
   * Array of ID parts that each articulated parameter is attached to.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterIdPartAttachedToArray: MFInt32,
   /**
   * Array of type enumerations for each articulated parameter element.
   *
   * Access type is 'inputOutput'.
   */
   articulationParameterTypeArray: MFInt32,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue0_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue1_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue2_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue3_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue4_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue5_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue6_changed: number,
   /**
   * Get element of user-defined payload array.
   *
   * Access type is 'outputOnly'.
   */
   readonly articulationParameterValue7_changed: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Translation offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * When were we collided with? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly collideTime: number,
   /**
   * Integer enumeration for type of collision: ELASTIC or INELASTIC.
   *
   * Access type is 'inputOutput'.
   */
   collisionType: number,
   /**
   * Dead reckoning algorithm being used to project position/orientation with velocities/accelerations.
   *
   * Access type is 'inputOutput'.
   */
   deadReckoning: number,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * When were we detonated?.
   *
   * Access type is 'outputOnly'.
   */
   readonly detonateTime: number,
   /**
   * World coordinates for detonationLocation.
   *
   * Access type is 'inputOutput'.
   */
   detonationLocation: SFVec3f,
   /**
   * Relative coordinates for detonation location.
   *
   * Access type is 'inputOutput'.
   */
   detonationRelativeLocation: SFVec3f,
   /**
   * Integer enumeration for type of detonation and result that occurred.
   *
   * Access type is 'inputOutput'.
   */
   detonationResult: number,
   /**
   * Enables/disables the sensor node.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Integer enumerations value for main category that describes the entity, semantics of each code varies according to domain.
   *
   * Access type is 'inputOutput'.
   */
   entityCategory: number,
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * Access type is 'inputOutput'.
   */
   entityCountry: number,
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * Access type is 'inputOutput'.
   */
   entityDomain: number,
   /**
   * Any extra information required to describe a particular entity.
   *
   * Access type is 'inputOutput'.
   */
   entityExtra: number,
   /**
   * Simulation/exercise entityID is a unique ID for a single entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   entityID: number,
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * Access type is 'inputOutput'.
   */
   entityKind: number,
   /**
   * Specific information about an entity based on the Subcategory field.
   *
   * Access type is 'inputOutput'.
   */
   entitySpecific: number,
   /**
   * Integer enumerations value for particular subcategory to which an entity belongs based on the category field.
   *
   * Access type is 'inputOutput'.
   */
   entitySubcategory: number,
   /**
   * Simulation/exercise eventApplicationID is unique for events generated from application at that site.
   *
   * Access type is 'inputOutput'.
   */
   eventApplicationID: number,
   /**
   * For a given event, simulation/exercise entityID is a unique ID for a single entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   eventEntityID: number,
   /**
   * Sequential number of each event issued by an application.
   *
   * Access type is 'inputOutput'.
   */
   eventNumber: number,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   eventSiteID: number,
   /**
   * Has the primary weapon (Fire PDU) been fired?.
   *
   * Access type is 'inputOutput'.
   */
   fired1: boolean,
   /**
   * Has the secondary weapon (Fire PDU) been fired?.
   *
   * Access type is 'inputOutput'.
   */
   fired2: boolean,
   /**
   * When did we shoot a weapon (Fire PDU)? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly firedTime: number,
   /**
   * .
   *
   * Access type is 'inputOutput'.
   */
   fireMissionIndex: number,
   /**
   * Range (three dimension, straight-line distance) that the firing entity's fire control system has assumed for computing the fire control solution if a weapon and if the value is known.
   *
   * Access type is 'inputOutput'.
   */
   firingRange: number,
   /**
   * Rate at which munitions are fired.
   *
   * Access type is 'inputOutput'.
   */
   firingRate: number,
   /**
   * forceID determines the team membership of the issuing entity, and whether FRIENDLY OPPOSING or NEUTRAL or OTHER.
   *
   * Access type is 'inputOutput'.
   */
   forceID: number,
   /**
   * Integer enumerations value for type of fuse on the munition.
   *
   * Access type is 'inputOutput'.
   */
   fuse: number,
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Have we received a network update recently? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Has a matching CollisionPDU reported a collision? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isCollided: boolean,
   /**
   * Has a matching DetonationPDU reported a detonation? Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isDetonated: boolean,
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkReader: boolean,
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkWriter: boolean,
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * Access type is 'outputOnly'.
   */
   readonly isRtpHeaderHeard: boolean,
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * Access type is 'outputOnly'.
   */
   readonly isStandAlone: boolean,
   /**
   * Acceleration of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.
   *
   * Access type is 'inputOutput'.
   */
   linearAcceleration: SFVec3f,
   /**
   * Velocity of the entity relative to the rotating Earth in either world or entity coordinates, depending on the dead reckoning algorithm used.
   *
   * Access type is 'inputOutput'.
   */
   linearVelocity: SFVec3f,
   /**
   * Maximum of 11 characters for simple entity label.
   *
   * Access type is 'inputOutput'.
   */
   marking: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Fallback server address if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayHost: string,
   /**
   * Fallback server port if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayPort: number,
   /**
   * munitionApplicationID, unique for application at that site.
   *
   * Access type is 'inputOutput'.
   */
   munitionApplicationID: number,
   /**
   * Final point of the munition path from firing weapon to detonation or impact, in exercise coordinates.
   *
   * Access type is 'inputOutput'.
   */
   munitionEndPoint: SFVec3f,
   /**
   * munitionEntityID is unique ID for entity firing munition within that application.
   *
   * Access type is 'inputOutput'.
   */
   munitionEntityID: number,
   /**
   * Quantity of munitions fired.
   *
   * Access type is 'inputOutput'.
   */
   munitionQuantity: number,
   /**
   * Munition siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   munitionSiteID: number,
   /**
   * Initial point of the munition path from firing weapon to detonation or impact, in exercise coordinates.
   *
   * Access type is 'inputOutput'.
   */
   munitionStartPoint: SFVec3f,
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * Access type is 'inputOutput'.
   */
   networkMode: string,
   /**
   * Network connection port number (EXAMPLE 3000) for sending or receiving DIS messages.
   *
   * Access type is 'inputOutput'.
   */
   port: number,
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * Access type is 'inputOutput'.
   */
   readInterval: number,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Orientation of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * Access type is 'inputOutput'.
   */
   rtpHeaderExpected: boolean,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue0: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue1: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue2: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue3: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue4: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue5: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue6: number,
   /**
   * Set element of user-defined payload array.
   *
   * Access type is 'inputOnly'.
   */
   set_articulationParameterValue7: number,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   siteID: number,
   /**
   * DIS timestamp received from latest PDU update, converted to X3D SFTime units.
   *
   * Access type is 'outputOnly'.
   */
   readonly timestamp: number,
   /**
   * Position of children relative to local coordinate system, usually read from (or written to) remote, networked EspduTransform nodes.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Integer enumerations value for type of warhead on the munition.
   *
   * Access type is 'inputOutput'.
   */
   warhead: number,
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * Access type is 'inputOutput'.
   */
   writeInterval: number,
}

/** ExplosionEmitter generates all particles from a specific point in space at the initial time enabled. */
interface ExplosionEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Point from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** Extrusion is a geometry node that sequentially stretches a 2D cross section along a 3D-spine path in the local coordinate system, creating an outer hull. */
interface ExtrusionProxy extends X3DGeometryNodeProxy
{
   /**
   * Whether beginning cap is drawn (similar to Cylinder top cap).
   *
   * Access type is 'initializeOnly'.
   */
   beginCap: boolean,
   /**
   * The ccw field indicates counterclockwise ordering of vertex-coordinates orientation.
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * The convex field is a hint to renderers whether all polygons in a shape are convex (true), or possibly concave (false).
   *
   * Access type is 'initializeOnly'.
   */
   convex: boolean,
   /**
   * creaseAngle defines angle (in radians) where adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * Access type is 'initializeOnly'.
   */
   creaseAngle: number,
   /**
   * The crossSection array defines a silhouette outline of the outer Extrusion surface.
   *
   * Access type is 'initializeOnly'.
   */
   crossSection: MFVec2f,
   /**
   * Whether end cap is drawn (similar to Cylinder bottom cap).
   *
   * Access type is 'initializeOnly'.
   */
   endCap: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The orientation array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.
   *
   * Access type is 'initializeOnly'.
   */
   orientation: MFRotation,
   /**
   * scale is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.
   *
   * Access type is 'initializeOnly'.
   */
   scale: MFVec2f,
   /**
   * The crossSection array defines a silhouette outline of the outer Extrusion surface.
   *
   * Access type is 'inputOnly'.
   */
   set_crossSection: MFVec2f,
   /**
   * The orientation array is a list of axis-angle 4-tuple values applied at each spine-aligned cross-section plane.
   *
   * Access type is 'inputOnly'.
   */
   set_orientation: MFRotation,
   /**
   * scale is a list of 2D-scale parameters applied at each spine-aligned cross-section plane.
   *
   * Access type is 'inputOnly'.
   */
   set_scale: MFVec2f,
   /**
   * The spine array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices.
   *
   * Access type is 'inputOnly'.
   */
   set_spine: MFVec3f,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * The spine array defines a center-line sequence of 3D points that define a piecewise-linear curve forming a series of connected vertices.
   *
   * Access type is 'initializeOnly'.
   */
   spine: MFVec3f,
}

/** FillProperties indicates whether appearance is filled or hatched for associated geometry nodes inside the same Shape. */
interface FillPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Whether or not associated geometry is filled.
   *
   * Access type is 'inputOutput'.
   */
   filled: boolean,
   /**
   * Color of the hatch pattern.
   *
   * Access type is 'inputOutput'.
   */
   hatchColor: SFColor,
   /**
   * Whether or not associated geometry is hatched.
   *
   * Access type is 'inputOutput'.
   */
   hatched: boolean,
   /**
   * hatchStyle selects a hatch pattern from ISO/IEC 9973 International Register of Graphical Items.
   *
   * Access type is 'inputOutput'.
   */
   hatchStyle: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** FloatVertexAttribute defines a set of per-vertex single-precision floating-point attributes. */
interface FloatVertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * Access type is 'initializeOnly'.
   */
   name: string,
   /**
   * numComponents specifies how many consecutive floating-point values should be grouped together per vertex.
   *
   * Access type is 'initializeOnly'.
   */
   numComponents: number,
   /**
   * value specifies an arbitrary collection of floating-point values that will be passed to the shader as per-vertex information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFFloat,
}

/** Fog simulates atmospheric effects by blending distant objects with fog color. */
interface FogProxy extends X3DBindableNodeProxy, X3DFogObjectProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Fog color.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.
   *
   * Access type is 'inputOutput'.
   */
   fogType: string,
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Receiving event set_bind=true activates and binds this node at the top of the binding stack.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Distance in meters where objects are totally obscured by the fog, using local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   visibilityRange: number,
}

/** FogCoordinate defines a set of explicit fog depths on a per-vertex basis, overriding Fog visibilityRange. */
interface FogCoordinateProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * depth contains a set of 3D coordinate (triplet) point values.
   *
   * Access type is 'inputOutput'.
   */
   depth: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** FontStyle is an X3DFontStyleNode that defines the size, family, justification, and other styles used by Text nodes. */
interface FontStyleProxy extends X3DFontStyleNodeProxy
{
   /**
   * Array of quoted font family names in preference order, browsers use the first supported family.
   *
   * Access type is 'inputOutput'.
   */
   family: MFString,
   /**
   * Whether text direction is horizontal (true) or vertical (false).
   *
   * Access type is 'inputOutput'.
   */
   horizontal: boolean,
   /**
   * The justify field determines horizontal and vertical alignment of text layout, relative to the origin of the object coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   justify: MFString,
   /**
   * Language codes consist of a primary code and a (possibly empty) series of subcodes.
   *
   * Access type is 'inputOutput'.
   */
   language: string,
   /**
   * Whether text direction is left-to-right (true) or right-to-left (false).
   *
   * Access type is 'inputOutput'.
   */
   leftToRight: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Nominal height (in local coordinate system) of text glyphs, also sets default spacing between adjacent lines of text.
   *
   * Access type is 'inputOutput'.
   */
   size: number,
   /**
   * Adjustment factor for line spacing between adjacent lines of text.
   *
   * Access type is 'inputOutput'.
   */
   spacing: number,
   /**
   * Pick one of four values for text style (PLAIN|BOLD|ITALIC|BOLDITALIC).
   *
   * Access type is 'inputOutput'.
   */
   style: string,
   /**
   * Whether text direction is top-to-bottom (true) or bottom-to-top (false).
   *
   * Access type is 'inputOutput'.
   */
   topToBottom: boolean,
}

/** ForcePhysicsModel applies a constant force value to the particles. */
interface ForcePhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * force field indicates strength and direction of the propelling force on the particles (for example, default is Earth's gravity).
   *
   * Access type is 'inputOutput'.
   */
   force: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The Gain node amplifies or deamplifies the input signal. */
interface GainProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** GeneratedCubeMapTexture is a texture node that defines a cubic environment map that sources its data from internally generated images. */
interface GeneratedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * size indicates the resolution of the generated images in number of pixels per side.
   *
   * Access type is 'initializeOnly'.
   */
   size: number,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * update controls regeneration of the texture.
   *
   * Access type is 'inputOutput'.
   */
   update: string,
}

/** GeoCoordinate builds geometry as a set of geographic 3D coordinates. */
interface GeoCoordinateProxy extends X3DCoordinateNodeProxy
{
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * point contains a set of actual 3D geographic coordinates, provided in geoSystem format can split strings if desired: "x1 y1 z1 x2 y2 z2" or "x1 y1 z1", "x2 y2 z2".
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec3d,
}

/** GeoElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface GeoElevationGridProxy extends X3DGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color node color values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * Access type is 'initializeOnly'.
   */
   creaseAngle: number,
   /**
   * Geographic coordinate for southwest (lower-left) corner of height dataset.
   *
   * Access type is 'initializeOnly'.
   */
   geoGridOrigin: SFVec3d,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.
   *
   * Access type is 'initializeOnly'.
   */
   height: MFDouble,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or per quadrilateral (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Contains xDimension rows * zDimension columns floating-point values for elevation above ellipsoid.
   *
   * Access type is 'inputOnly'.
   */
   set_height: MFDouble,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy,
   /**
   * Number of elements in the height array along east-west X direction.
   *
   * Access type is 'initializeOnly'.
   */
   xDimension: number,
   /**
   * Distance between grid-array vertices along east-west X direction.
   *
   * Access type is 'initializeOnly'.
   */
   xSpacing: number,
   /**
   * Vertical exaggeration of displayed data produced from the height array.
   *
   * Access type is 'inputOutput'.
   */
   yScale: number,
   /**
   * Number of elements in the height array along north-south Z direction.
   *
   * Access type is 'initializeOnly'.
   */
   zDimension: number,
   /**
   * Distance between grid-array vertices along north-south Z direction.
   *
   * Access type is 'initializeOnly'.
   */
   zSpacing: number,
}

/** GeoLocation positions a regular X3D model onto earth's surface. */
interface GeoLocationProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Note that MFNode rootNode field can contain multiple nodes and has accessType inputOutput. Meanwhile MFNode children field is outputOnly, unlike other X3DGroupingNode exemplars. */
interface GeoLODProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Viewer range from geographic-coordinates center triggers quadtree loading/unloading.
   *
   * Access type is 'initializeOnly'.
   */
   center: SFVec3d,
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * Access type is 'initializeOnly'.
   */
   child1Url: MFString,
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * Access type is 'initializeOnly'.
   */
   child2Url: MFString,
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * Access type is 'initializeOnly'.
   */
   child3Url: MFString,
   /**
   * quadtree geometry loaded when viewer is within range.
   *
   * Access type is 'initializeOnly'.
   */
   child4Url: MFString,
   /**
   * The outputOnly children field exposes a portion of the scene graph for the currently loaded set of nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly children: MFNode <X3DChildNodeProxy>,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Output event that reports when the new children outputOnly event is generated, with value 0 or 1, where 0 indicates the rootNode field and 1 indicates the nodes specified by the child1Url, child2Url, child3Url, and child4Url fields.
   *
   * Access type is 'outputOnly'.
   */
   readonly level_changed: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Viewer range from geographic-coordinates center triggers quadtree loading/unloading.
   *
   * Access type is 'initializeOnly'.
   */
   range: number,
   /**
   * Geometry for the root tile.
   *
   * Access type is 'initializeOnly'.
   */
   rootNode: MFNode <X3DChildNodeProxy>,
   /**
   * url for scene providing geometry for the root tile.
   *
   * Access type is 'initializeOnly'.
   */
   rootUrl: MFString,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** GeoMetadata includes a generic subset of metadata about the geographic data. */
interface GeoMetadataProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * DEF list of all nodes that implement this data.
   *
   * Access type is 'inputOutput'.
   */
   data: MFNode <X3DNodeProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The summary string array contains a set of keyword/value pairs, with each keyword and its subsequent value contained in separate strings.
   *
   * Access type is 'inputOutput'.
   */
   summary: MFString,
   /**
   * Hypertext link to an external, complete metadata description.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** GeoOrigin is deprecated and discouraged (but nevertheless allowed) in X3D version 3.3. GeoOrigin is restored in X3D version 4.0 for special use on devices with limited floating-point resolution. */
interface GeoOriginProxy extends X3DNodeProxy
{
   /**
   * Defines absolute geographic location (and implicit local coordinate frame).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to rotate coordinates of nodes using this GeoOrigin so that local-up direction aligns with VRML Y axis rotateYUp false means local up-direction is relative to planet surface rotateYUp true allows proper operation of NavigationInfo modes FLY, WALK.
   *
   * Access type is 'initializeOnly'.
   */
   rotateYUp: boolean,
}

/** GeoPositionInterpolator animates objects within a geographic coordinate system. */
interface GeoPositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * interpolated coordinate in the geographic coordinate system specified by geoSystem Hint: X3D for Advanced Modeling (X3D4AM) slideset https://x3dgraphics.
   *
   * Access type is 'outputOnly'.
   */
   readonly geovalue_changed: SFVec3d,
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec3d,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
}

/** GeoProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface GeoProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Position offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3d,
   /**
   * Sends changed centerOfRotation values, likely caused by user interaction.
   *
   * Access type is 'outputOnly'.
   */
   readonly centerOfRotation_changed: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Time event generated when user's camera enters the box.
   *
   * Access type is 'outputOnly'.
   */
   readonly enterTime: number,
   /**
   * Time event generated when user's camera exits the box.
   *
   * Access type is 'outputOnly'.
   */
   readonly exitTime: number,
   /**
   * Position offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   geoCenter: SFVec3d,
   /**
   * Sends geospatial coordinates of viewer's position corresponding to world position returned by position_changed.
   *
   * Access type is 'outputOnly'.
   */
   readonly geoCoord_changed: SFVec3d,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * isActive true/false events are sent as viewer enters/exits Proximity box.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Sends rotation event relative to center.
   *
   * Access type is 'outputOnly'.
   */
   readonly orientation_changed: SFRotation,
   /**
   * Sends translation event relative to center.
   *
   * Access type is 'outputOnly'.
   */
   readonly position_changed: SFVec3f,
   /**
   * size of Proximity box around center location, oriented within local transformation frame.
   *
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
}

/** GeoTouchSensor returns geographic coordinates for the object being selected. */
interface GeoTouchSensorProxy extends X3DTouchSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (G D), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Output event containing 3D point on surface of underlying geometry, given in GeoTouchSensor's local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitGeoCoord_changed: SFVec3d,
   /**
   * Output event containing surface normal vector at the hitGeoCoordinate.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitNormal_changed: SFVec3f,
   /**
   * Output event containing 3D point on surface of underlying geometry, given in geometry coordinates (not geographic coordinates).
   *
   * Access type is 'outputOnly'.
   */
   readonly hitPoint_changed: SFVec3f,
   /**
   * Output event containing texture coordinates of surface at the hitGeoCoordinate.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitTexCoord_changed: SFVec2f,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Is pointing device over sensor's geometry?.
   *
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Time event generated when touched.
   *
   * Access type is 'outputOnly'.
   */
   readonly touchTime: number,
}

/** GeoTransform is a Grouping node that can contain most nodes. */
interface GeoTransformProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * Access type is 'inputOutput'.
   */
   geoCenter: SFVec3d,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate sys tem before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** GeoViewpoint specifies viewpoints using geographic coordinates. */
interface GeoViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * Access type is 'inputOutput'.
   */
   centerOfRotation: SFVec3d,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * Access type is 'inputOutput'.
   */
   fieldOfView: number,
   /**
   * Single contained GeoOrigin node that can specify a local coordinate frame for extended precision.
   *
   * Access type is 'initializeOnly'.
   */
   geoOrigin: GeoOriginProxy,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Whether to transition instantly by jumping, or else smoothly animate to this Viewpoint.
   *
   * Access type is 'inputOutput'.
   */
   jump: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * Access type is 'inputOutput'.
   */
   navigationInfo: NavigationInfoProxy,
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Rotation of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * position relative to local georeferenced coordinate system, in proper format.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3d,
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * Access type is 'inputOutput'.
   */
   retainUserOffsets: boolean,
   /**
   * set_bind true makes this node active, set_bind false makes this node inactive.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * speedFactor is a multiplier to modify the original elevation-based speed that is set automatically by the browser.
   *
   * Access type is 'initializeOnly'.
   */
   speedFactor: number,
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * Access type is 'inputOutput'.
   */
   viewAll: boolean,
}

/** Group is a Grouping node that can contain most nodes. */
interface GroupProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** HAnimDisplacer nodes alter the shape of coordinate-based geometry within parent HAnimJoint or HAnimSegment nodes. */
interface HAnimDisplacerProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Defines index values into the parent HAnimSegment or HAnimBody/HAnimHumanoid coordinate array for the mesh of vertices affected by this HAnimDisplacer.
   *
   * Access type is 'inputOutput'.
   */
   coordIndex: MFInt32,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * displacements are a set of SFVec3f values added to neutral/resting position of each of the corresponding HAnimSegment vertices (or HAnimJoint/HAnimHumanoid vertices) referenced by coordIndex field.
   *
   * Access type is 'inputOutput'.
   */
   displacements: MFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Unique name attribute must be defined so that HAnimDisplacer node can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * The weigh factor has typical range [0,1] and defines the scale factor applied to displacement values before adding them to neutral vertex positions.
   *
   * Access type is 'inputOutput'.
   */
   weight: number,
}

/** The HAnimHumanoid node is used to: (a) store references to the joints, segments, sites, skeleton, optional skin, and fixed viewpoints, (b) serve as a container for the entire humanoid, (c) provide a convenient way of moving the humanoid through its environment, and (d) store human-readable metadata such as name, version, author, copyright, age, gender and other information. */
interface HAnimHumanoidProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Translation offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Contains metadata keyword=value pairs, where approved keyword terms are humanoidVersion authorName authorEmail copyright creationDate usageRestrictions age gender height and weight.
   *
   * Access type is 'inputOutput'.
   */
   info: MFString,
   /**
   * Specifies an array of position values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * Access type is 'inputOutput'.
   */
   jointBindingPositions: MFVec3f,
   /**
   * Specifies an array of rotation values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * Access type is 'inputOutput'.
   */
   jointBindingRotations: MFRotation,
   /**
   * Specifies an array of scale values for each HAnimJoint node in the joints field, in order, corresponding to each binding pose.
   *
   * Access type is 'inputOutput'.
   */
   jointBindingScales: MFVec3f,
   /**
   * The joints field contains a list of USE references for all HAnimJoint node instances found within the preceding skeleton hierarchy.
   *
   * Access type is 'inputOutput'.
   */
   joints: MFNode <HAnimJointProxy>,
   /**
   * Level Of Articulation 0.
   *
   * Access type is 'inputOutput'.
   */
   loa: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Contains any HAnimMotion nodes that can animate the HAnimHumanoid.
   *
   * Access type is 'inputOutput'.
   */
   motions: MFNode <HAnimMotionProxy>,
   /**
   * Array of boolean values corresponding to HAnimMotion nodes indicating which can animate the HAnimHumanoid.
   *
   * Access type is 'inputOutput'.
   */
   motionsEnabled: MFBool,
   /**
   * Unique name attribute must be defined so that each HAnimHumanoid node in a scene can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Orientation of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * The segments field contains a list of USE references for all HAnimSegment node instances found within the preceding skeleton hierarchy.
   *
   * Access type is 'inputOutput'.
   */
   segments: MFNode <HAnimSegmentProxy>,
   /**
   * sites field contains a list of USE references for all HAnimSite node instances found within the preceding skeleton hierarchy.
   *
   * Access type is 'inputOutput'.
   */
   sites: MFNode <HAnimSiteProxy>,
   /**
   * Models sharing a common skeletal configuration can share animations and binding poses.
   *
   * Access type is 'inputOutput'.
   */
   skeletalConfiguration: string,
   /**
   * List of top-level HAnimJoint and HAnimSite nodes that create the skeleton model.
   *
   * Access type is 'inputOutput'.
   */
   skeleton: MFNode <HAnimJointProxy | HAnimSiteProxy>,
   /**
   * List of one or more indexed mesh definitions (such as IndexedFaceSet) that utilize skinCoord point and skinNormal normal data.
   *
   * Access type is 'inputOutput'.
   */
   skin: MFNode <GroupProxy | TransformProxy | ShapeProxy | IndexedFaceSetProxy>,
   /**
   * Array of Coordinate nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.
   *
   * Access type is 'inputOutput'.
   */
   skinBindingCoords: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Array of Normal nodes to handle non-default source pose so that both skin and skeleton can be in same binding pose.
   *
   * Access type is 'inputOutput'.
   */
   skinBindingNormals: X3DNormalNodeProxy,
   /**
   * Coordinate node utilized by indexed mesh definitions for skin.
   *
   * Access type is 'inputOutput'.
   */
   skinCoord: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Single Normal node utilized by indexed mesh definitions for skin.
   *
   * Access type is 'inputOutput'.
   */
   skinNormal: X3DNormalNodeProxy,
   /**
   * Position of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * HAnimHumanoid version, where allowed value is 2.
   *
   * Access type is 'inputOutput'.
   */
   version: string,
   /**
   * List of HAnimSite nodes containing Viewpoint nodes that appear in the skeleton model, usually as USE node references.
   *
   * Access type is 'inputOutput'.
   */
   viewpoints: MFNode <HAnimSiteProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** HAnimJoint node can represent each joint in a body. */
interface HAnimJointProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <HAnimJointProxy | HAnimSegmentProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Translation offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <HAnimJointProxy | HAnimSegmentProxy>,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * the displacers field stores HAnimDisplacer objects for a particular HAnimJoint object.
   *
   * Access type is 'inputOutput'.
   */
   displacers: MFNode <HAnimDisplacerProxy>,
   /**
   * Orientation of upper/lower rotation limits, relative to HAnimJoint center.
   *
   * Access type is 'inputOutput'.
   */
   limitOrientation: SFRotation,
   /**
   * Lower limit for minimum joint rotation in radians.
   *
   * Access type is 'inputOutput'.
   */
   llimit: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Unique name attribute must be defined so that HAnimJoint node can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <HAnimJointProxy | HAnimSegmentProxy>,
   /**
   * Orientation of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Coordinate index values referencing which vertices are influenced by the HAnimJoint.
   *
   * Access type is 'inputOutput'.
   */
   skinCoordIndex: MFInt32,
   /**
   * Weight deformation values for the corresponding values in the skinCoordIndex field.
   *
   * Access type is 'inputOutput'.
   */
   skinCoordWeight: MFFloat,
   /**
   * A scale factor of (1 - stiffness) is applied around the corresponding axis (X, Y, or Z for entries 0, 1 and 2 of the stiffness field).
   *
   * Access type is 'inputOutput'.
   */
   stiffness: MFFloat,
   /**
   * Position of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Upper limit for maximum joint rotation in radians.
   *
   * Access type is 'inputOutput'.
   */
   ulimit: MFFloat,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** An HAnimMotion node supports discrete frame-by-frame playback for HAnim motion data animation. */
interface HAnimMotionProxy extends X3DChildNodeProxy
{
   /**
   * list of number of channels for transformation, followed by transformation type of each channel of data.
   *
   * Access type is 'inputOutput'.
   */
   channels: string,
   /**
   * boolean values for each channel indicating whether enabled.
   *
   * Access type is 'inputOutput'.
   */
   channelsEnabled: MFBool,
   /**
   * cycleTime sends a time event at initial starting time and at beginning of each new cycle.
   *
   * Access type is 'outputOnly'.
   */
   readonly cycleTime: number,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * elapsedTime is computed elapsed time since the Motion object was activated and running, counting all traversed frames (as if frameIndex equaled 1) and multiplied by frameDuration, cumulative in seconds.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * endFrame indicates final index of animated frame.
   *
   * Access type is 'inputOutput'.
   */
   endFrame: number,
   /**
   * frameCount is computed at run time and indicates the total number of frames present in the animation, equaling the number of sets of channel data rows present in the values array.
   *
   * Access type is 'outputOnly'.
   */
   readonly frameCount: number,
   /**
   * frameDuration specifies the duration of each frame in seconds.
   *
   * Access type is 'inputOutput'.
   */
   frameDuration: number,
   /**
   * frameIncrement field controls whether playback direction is forwards or backwards, and also whether frames are skipped (for example, subsampled replay).
   *
   * Access type is 'inputOutput'.
   */
   frameIncrement: number,
   /**
   * frameIndex indicates index of current frame.
   *
   * Access type is 'inputOutput'.
   */
   frameIndex: number,
   /**
   * joints field lists names of joints that raw motion data is to be applied to.
   *
   * Access type is 'inputOutput'.
   */
   joints: string,
   /**
   * Level Of Articulation 0.
   *
   * Access type is 'inputOutput'.
   */
   loa: number,
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * Access type is 'inputOutput'.
   */
   loop: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Unique name attribute must be defined so that HAnimMotion node can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Send next output value in values array, using/updating various frame values as appropriate.
   *
   * Access type is 'inputOnly'.
   */
   next: boolean,
   /**
   * Send previous output value in values array, using/updating various frame values as appropriate.
   *
   * Access type is 'inputOnly'.
   */
   previous: boolean,
   /**
   * startFrame indicates initial index of animated frame.
   *
   * Access type is 'inputOutput'.
   */
   startFrame: number,
   /**
   * values field contains all transformation values, ordered first by frame, then by joint, and then by transformation Sets of floats in the values array matching the order listed in joints and channels fields.
   *
   * Access type is 'inputOutput'.
   */
   values: MFFloat,
}

/** HAnimSegment node contains Shape geometry for each body segment, providing a visual representation of the skeleton segment. */
interface HAnimSegmentProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Location within segment of center of mass.
   *
   * Access type is 'inputOutput'.
   */
   centerOfMass: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * the coord field is used for HAnimSegment objects that have deformable meshes and shall contain coordinates referenced from the IndexedFaceSet for the paarent HAnimSegment object.
   *
   * Access type is 'inputOutput'.
   */
   coord: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * the displacers field stores HAnimDisplacer objects for a particular HAnimSegment object.
   *
   * Access type is 'inputOutput'.
   */
   displacers: MFNode <HAnimDisplacerProxy>,
   /**
   * Total mass of the segment, 0 if not available, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * 3x3 moments of inertia matrix.
   *
   * Access type is 'inputOutput'.
   */
   momentsOfInertia: MFFloat,
   /**
   * Unique name attribute must be defined so that HAnimSegment node can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** An HAnimSite node serves three purposes: (a) define an "end effector" location which can be used by an inverse kinematics system, (b) define an attachment point for accessories such as jewelry and clothing, and (c) define a location for a Viewpoint virtual camera in the reference frame of an HAnimSegment (such as a view "through the eyes" of the humanoid for use in multi-user worlds). */
interface HAnimSiteProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Default location of this HAnimSite, i.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Unique name attribute must be defined so that HAnimSite node can be identified at run time for animation purposes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Orientation of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Position of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** ImageCubeMapTexture is a texture node that defines a cubic environment map source as a single file format that contains multiple images, one for each side. */
interface ImageCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * Location and filename of image.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** ImageTexture maps a 2D-image file onto a geometric shape. */
interface ImageTextureProxy extends X3DTexture2DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * Location and filename of image.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** ImageTexture3D defines a 3D image-based texture map by specifying a single image file that contains complete 3D data. */
interface ImageTexture3DProxy extends X3DTexture3DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * Access type is 'initializeOnly'.
   */
   repeatR: boolean,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * Location and filename of image.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** IndexedFaceSet defines polygons using index lists corresponding to vertex coordinates. */
interface IndexedFaceSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * Access type is 'initializeOnly'.
   */
   colorIndex: MFInt32,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * The convex field is a hint to renderers whether all polygons in a shape are convex (true), or possibly concave (false).
   *
   * Access type is 'initializeOnly'.
   */
   convex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * Access type is 'initializeOnly'.
   */
   coordIndex: MFInt32,
   /**
   * creaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading.
   *
   * Access type is 'initializeOnly'.
   */
   creaseAngle: number,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * normalIndex values define the order in which normal vectors are applied to polygons (or vertices).
   *
   * Access type is 'initializeOnly'.
   */
   normalIndex: MFInt32,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * Access type is 'inputOnly'.
   */
   set_colorIndex: MFInt32,
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * Access type is 'inputOnly'.
   */
   set_coordIndex: MFInt32,
   /**
   * normalIndex values define the order in which normal vectors are applied to polygons (or vertices).
   *
   * Access type is 'inputOnly'.
   */
   set_normalIndex: MFInt32,
   /**
   * List of texture-coordinate indices mapping attached texture to corresponding coordinates.
   *
   * Access type is 'inputOnly'.
   */
   set_texCoordIndex: MFInt32,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
   /**
   * List of texture-coordinate indices mapping attached texture to corresponding coordinates.
   *
   * Access type is 'initializeOnly'.
   */
   texCoordIndex: MFInt32,
}

/** IndexedLineSet defines polyline segments using index lists corresponding to vertex coordinates. */
interface IndexedLineSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * Access type is 'initializeOnly'.
   */
   colorIndex: MFInt32,
   /**
   * Whether Color node color values are applied to each point vertex (true) or per polyline (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polygon face.
   *
   * Access type is 'initializeOnly'.
   */
   coordIndex: MFInt32,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * colorIndex values define the order in which Color|ColorRGBA values are applied to polygons (or vertices).
   *
   * Access type is 'inputOnly'.
   */
   set_colorIndex: MFInt32,
   /**
   * coordIndex indices provide the order in which coordinates are applied to construct each polyline.
   *
   * Access type is 'inputOnly'.
   */
   set_coordIndex: MFInt32,
}

/** IndexedQuadSet is a geometry node that defines quadrilaterals. */
interface IndexedQuadSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * index values provide order in which coordinates are applied.
   *
   * Access type is 'initializeOnly'.
   */
   index: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * index values provide order in which coordinates are applied.
   *
   * Access type is 'inputOnly'.
   */
   set_index: MFInt32,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** IndexedTriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * index list specifies triangles by connecting Coordinate vertices, each individual fan separated by -1 sentinel value.
   *
   * Access type is 'initializeOnly'.
   */
   index: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * index list specifies triangles by connecting Coordinate vertices, each individual fan separated by -1 sentinel value.
   *
   * Access type is 'inputOnly'.
   */
   set_index: MFInt32,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** IndexedTriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * index list specifies triangles by connecting Coordinate vertices.
   *
   * Access type is 'initializeOnly'.
   */
   index: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * index list specifies triangles by connecting Coordinate vertices.
   *
   * Access type is 'inputOnly'.
   */
   set_index: MFInt32,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** IndexedTriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * index list specifies triangles by connecting Coordinate vertices for each individual strip, separated by -1 sentinel values.
   *
   * Access type is 'initializeOnly'.
   */
   index: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * index list specifies triangles by connecting Coordinate vertices for each individual strip, separated by -1 sentinel values.
   *
   * Access type is 'inputOnly'.
   */
   set_index: MFInt32,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** Inline can load another X3D or VRML model into the current scene via url. */
interface InlineProxy extends X3DChildNodeProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * The global field controls potential external scoping effects of lights found within an Inline scene.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Address of X3D world to load Inline with current scene, retrieved either from local system or an online address.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** IntegerSequencer generates periodic discrete integer values. */
interface IntegerSequencerProxy extends X3DSequencerNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear sequencing, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Send next output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * Access type is 'inputOnly'.
   */
   next: boolean,
   /**
   * Send previous output value in keyValue array, and reset internal fraction field to match corresponding value in key array.
   *
   * Access type is 'inputOnly'.
   */
   previous: boolean,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Single intermittent output value determined by current key time and corresponding keyValue entry.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: number,
}

/** IntegerTrigger converts set_boolean true input events to an integer value (for example, useful when animating whichChoice in a Switch node). */
interface IntegerTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * integerKey is value for output when triggered.
   *
   * Access type is 'inputOutput'.
   */
   integerKey: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If input event set_boolean is true, trigger output of integer value.
   *
   * Access type is 'inputOnly'.
   */
   set_boolean: boolean,
   /**
   * triggerValue provides integer event output matching integerKey when true set_boolean received.
   *
   * Access type is 'outputOnly'.
   */
   readonly triggerValue: number,
}

/** IsoSurfaceVolumeData displays one or more surfaces extracted from a voxel dataset. */
interface IsoSurfaceVolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * If contourStepSize is non-zero, also render all isosurfaces that are multiples of that step size from initial surface value.
   *
   * Access type is 'inputOutput'.
   */
   contourStepSize: number,
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   dimensions: SFVec3f,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides explicit per-voxel gradient direction information for determining surface boundaries, rather than having it implicitly calculated by the implementation.
   *
   * Access type is 'inputOutput'.
   */
   gradients: X3DTexture3DNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Multiple contained X3DVolumeRenderStyleNode nodes corresponding to each isosurface that define specific rendering technique for this volumetric object.
   *
   * Access type is 'inputOutput'.
   */
   renderStyle: MFNode <X3DVolumeRenderStyleNodeProxy>,
   /**
   * Threshold for gradient magnitude for voxel inolusion in isosurface.
   *
   * Access type is 'inputOutput'.
   */
   surfaceTolerance: number,
   /**
   * If surfaceValues has one value defined, render corresponding isosurface plus any isosurfaces based on contourStepSize.
   *
   * Access type is 'inputOutput'.
   */
   surfaceValues: MFFloat,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * Access type is 'inputOutput'.
   */
   voxels: X3DTexture3DNodeProxy,
}

/** KeySensor generates events as the user presses keys on the keyboard. */
interface KeySensorProxy extends X3DKeyDeviceSensorNodeProxy
{
   /**
   * action key press gives following values: HOME=000 END=1001 PGUP=1002 PGDN=1003 UP=1004 DOWN=1005 LEFT=1006 RIGHT=1007 F1.
   *
   * Access type is 'outputOnly'.
   */
   readonly actionKeyPress: number,
   /**
   * action key release gives following values: HOME=000 END=1001 PGUP=1002 PGDN=1003 UP=1004 DOWN=1005 LEFT=1006 RIGHT=1007 F1.
   *
   * Access type is 'outputOnly'.
   */
   readonly actionKeyRelease: number,
   /**
   * altKey generates true event when pressed, false event when released.
   *
   * Access type is 'outputOnly'.
   */
   readonly altKey: boolean,
   /**
   * controlKey generates true event when pressed, false event when released.
   *
   * Access type is 'outputOnly'.
   */
   readonly controlKey: boolean,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Events generated when user presses character-producing keys on keyboard produces integer UTF-8 character values.
   *
   * Access type is 'outputOnly'.
   */
   readonly keyPress: string,
   /**
   * Events generated when user releases character-producing keys on keyboard produces integer UTF-8 character values.
   *
   * Access type is 'outputOnly'.
   */
   readonly keyRelease: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * shiftKey generates true event when pressed, false event when released.
   *
   * Access type is 'outputOnly'.
   */
   readonly shiftKey: boolean,
}

/** Layer contains a list of children nodes that define the contents of the layer. */
interface LayerProxy extends X3DLayerNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Nodes making up this layer.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * pickable determines whether pick traversal is performed for this layer.
   *
   * Access type is 'inputOutput'.
   */
   pickable: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * The viewport field is a single Viewport node that constrains layer output to a sub-region of the render surface.
   *
   * Access type is 'inputOutput'.
   */
   viewport: X3DViewportNodeProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** LayerSet defines a list of layers and a rendering order. */
interface LayerSetProxy extends X3DNodeProxy
{
   /**
   * activeLayer field specifies the layer in which navigation takes place.
   *
   * Access type is 'inputOutput'.
   */
   activeLayer: number,
   /**
   * The layers list defines a list of Layer nodes that contain the constituent parts of the scene.
   *
   * Access type is 'inputOutput'.
   */
   layers: MFNode <X3DLayerNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The order list defines the order in which layers are rendered.
   *
   * Access type is 'inputOutput'.
   */
   order: MFInt32,
}

/** Layout node is used as layout field of LayoutLayer and LayoutGroup nodes. */
interface LayoutProxy extends X3DLayoutNodeProxy
{
   /**
   * The align field values align the sized rectangle to an edge or center of the parent rectangle.
   *
   * Access type is 'inputOutput'.
   */
   align: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The values of the offset field are used to translate the location of this rectangle after the initial alignment.
   *
   * Access type is 'inputOutput'.
   */
   offset: MFFloat,
   /**
   * The offsetUnits field values are used to interprete the offset values.
   *
   * Access type is 'inputOutput'.
   */
   offsetUnits: MFString,
   /**
   * The scaleMode field specifies how the scale of the parent is modified.
   *
   * Access type is 'inputOutput'.
   */
   scaleMode: MFString,
   /**
   * The two values in the size field define the width and height of the layout rectangle.
   *
   * Access type is 'inputOutput'.
   */
   size: MFFloat,
   /**
   * The sizeUnits field values are used to interprete the offset values.
   *
   * Access type is 'inputOutput'.
   */
   sizeUnits: MFString,
}

/** LayoutGroup is a Grouping node that can contain most nodes, whose children are related by a common layout within a parent layout. */
interface LayoutGroupProxy extends X3DNodeProxy, X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.
   *
   * Access type is 'inputOutput'.
   */
   layout: X3DLayoutNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * The content of the LayoutGroup is clipped by the specified viewport.
   *
   * Access type is 'inputOutput'.
   */
   viewport: X3DViewportNodeProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** LayoutLayer is a Grouping node that can contain most nodes. */
interface LayoutLayerProxy extends X3DLayerNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.
   *
   * Access type is 'inputOutput'.
   */
   layout: X3DLayoutNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * pickable determines whether pick traversal is performed for this layer.
   *
   * Access type is 'inputOutput'.
   */
   pickable: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * The content of the LayoutGroup is clipped by the specified viewport.
   *
   * Access type is 'inputOutput'.
   */
   viewport: X3DViewportNodeProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** LinePickSensor uses one or more pickingGeometry line segments to compute intersections with pickTarget shapes. */
interface LinePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * Access type is 'initializeOnly'.
   */
   intersectionType: string,
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * defines whether the intersection test (i.
   *
   * Access type is 'inputOutput'.
   */
   matchCriterion: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>,
   /**
   * Output event containing surface normal vectors computed by the picking intersection computations.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedNormal: MFVec3f,
   /**
   * Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedPoint: MFVec3f,
   /**
   * Output event containing 3D texture coordinates of surfaces computed by the picking intersection computations.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedTextureCoordinate: MFVec3f,
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * Access type is 'inputOutput'.
   */
   pickingGeometry: X3DGeometryNodeProxy,
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * Access type is 'inputOutput'.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>,
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * Access type is 'initializeOnly'.
   */
   sortOrder: string,
}

/** LineProperties allows precise fine-grained control over the rendering style of lines and edges for associated geometry nodes inside the same Shape. */
interface LinePropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Whether or not LineProperties are applied to associated geometry.
   *
   * Access type is 'inputOutput'.
   */
   applied: boolean,
   /**
   * linetype selects a line pattern, with solid default if defined value isn't supported.
   *
   * Access type is 'inputOutput'.
   */
   linetype: number,
   /**
   * linewidthScaleFactor is a scale factor multiplied by browser-dependent nominal linewidth, mapped to nearest available line width.
   *
   * Access type is 'inputOutput'.
   */
   linewidthScaleFactor: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** LineSet is a geometry node that can contain a Coordinate|CoordinateDouble node and optionally a Color|ColorRGBA node. */
interface LineSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * vertexCount describes how many vertices are used in each individual polyline segment from the Coordinate point values.
   *
   * Access type is 'inputOutput'.
   */
   vertexCount: MFInt32,
}

/** ListenerPointSource node represents position and orientation of a person listening to virtual sound in the audio scene, and provides single or multiple sound channels as output. */
interface ListenerPointSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * dopplerEnabled enables/disables whether real-time Doppler effects (due to relation motion between sources and listeners) are computed by browser between virtual sound sources and active listening locations, then applied to received frequency at active listening locations.
   *
   * Access type is 'inputOutput'.
   */
   dopplerEnabled: boolean,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * The interauralDistance field is.
   *
   * Access type is 'inputOutput'.
   */
   interauralDistance: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Rotation (axis, angle in radians) of listening point direction relative to default -Z axis direction in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * If trackCurrentView field is true then position and orientation match avatar's (user's) current view.
   *
   * Access type is 'inputOutput'.
   */
   trackCurrentView: boolean,
}

/** LoadSensor generates events as watchList child nodes are either loaded or fail to load. */
interface LoadSensorProxy extends X3DNetworkSensorNodeProxy
{
   /**
   * The children field monitors one or more USE nodes that contain a valid url field.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DUrlObjectProxy>,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * isActive true/false events are sent when sensing starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Notify when all watchList child nodes are loaded, or at least one has failed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isLoaded: boolean,
   /**
   * Time of successful load complete, not sent on failure.
   *
   * Access type is 'outputOnly'.
   */
   readonly loadTime: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Sends 0.
   *
   * Access type is 'outputOnly'.
   */
   readonly progress: number,
   /**
   * Time in seconds of maximum load duration prior to declaring failure.
   *
   * Access type is 'inputOutput'.
   */
   timeOut: number,
}

/** LocalFog simulates atmospheric effects by blending distant objects with fog color. */
interface LocalFogProxy extends X3DChildNodeProxy, X3DFogObjectProxy
{
   /**
   * Fog color.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.
   *
   * Access type is 'inputOutput'.
   */
   fogType: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Distance in meters where objects are totally obscured by the fog, using local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   visibilityRange: number,
}

/** LOD (Level Of Detail) uses camera-to-object distance to switch among contained child levels. */
interface LODProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Viewpoint distance-measurement offset from origin of local coordinate system, used for LOD node distance calculations.
   *
   * Access type is 'initializeOnly'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Whether to perform every range-based transition, regardless of browser optimizations that might otherwise occur.
   *
   * Access type is 'initializeOnly'.
   */
   forceTransitions: boolean,
   /**
   * Output event that reports current level of LOD children whenever switching occurs.
   *
   * Access type is 'outputOnly'.
   */
   readonly level_changed: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Specifies ideal distances at which to switch between levels.
   *
   * Access type is 'initializeOnly'.
   */
   range: MFFloat,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Material specifies surface rendering properties for associated geometry nodes. */
interface MaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * When applying ambientIntensity for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   ambientTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   ambientTextureMapping: string,
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   diffuseColor: SFColor,
   /**
   * When applying diffuseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   diffuseTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   diffuseTextureMapping: string,
   /**
   * how much glowing light is emitted from this object.
   *
   * Access type is 'inputOutput'.
   */
   emissiveColor: SFColor,
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTextureMapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * Access type is 'inputOutput'.
   */
   normalScale: number,
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * Access type is 'inputOutput'.
   */
   normalTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   normalTextureMapping: string,
   /**
   * occlusionStrength indicates areas of indirect lighting, typically called ambient occlusion.
   *
   * Access type is 'inputOutput'.
   */
   occlusionStrength: number,
   /**
   * When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   occlusionTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   occlusionTextureMapping: string,
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * Access type is 'inputOutput'.
   */
   shininess: number,
   /**
   * When applying shininess for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   shininessTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   shininessTextureMapping: string,
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * Access type is 'inputOutput'.
   */
   specularColor: SFColor,
   /**
   * When applying specularColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   specularTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   specularTextureMapping: string,
   /**
   * how "clear" an object is: 1.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** Matrix3VertexAttribute defines a set of per-vertex 3x3 matrix attributes. */
interface Matrix3VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * Access type is 'initializeOnly'.
   */
   name: string,
   /**
   * value specifies an arbitrary collection of matrix values that will be passed to the shader as per-vertex information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFMatrix3f,
}

/** Matrix4VertexAttribute defines a set of per-vertex 4x4 matrix attributes. */
interface Matrix4VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Required name for this particular VertexAttribute instance.
   *
   * Access type is 'initializeOnly'.
   */
   name: string,
   /**
   * value specifies an arbitrary collection of matrix values that will be passed to the shader as per-vertex information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFMatrix4f,
}

/** The metadata provided by this node is contained in the Boolean values of the value field. */
interface MetadataBooleanProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFBool,
}

/** The metadata provided by this node is contained in the double-precision floating point numbers of the value field. */
interface MetadataDoubleProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFDouble,
}

/** The metadata provided by this node is contained in the single-precision floating point numbers of the value field. */
interface MetadataFloatProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFFloat,
}

/** The metadata provided by this node is contained in the integer numbers of the value field. */
interface MetadataIntegerProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFInt32,
}

/** The metadata provided by this node is contained in the metadata nodes of the value field. */
interface MetadataSetProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value field provides a list of X3DMetadataObject nodes whose meaning is determined by the name field.
   *
   * Access type is 'inputOutput'.
   */
   value: MFNode <X3DMetadataObjectProxy>,
}

/** The metadata provided by this node is contained in the strings of the value field. */
interface MetadataStringProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Depending on the metadata vocabulary, the attribute name is usually required for metadata nodes.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Reference to the metadata standard or definition defining this particular metadata value.
   *
   * Access type is 'inputOutput'.
   */
   reference: string,
   /**
   * The value attribute is a strictly typed data array providing relevant metadata information.
   *
   * Access type is 'inputOutput'.
   */
   value: MFString,
}

/** MicrophoneSource captures input from a physical microphone in the real world. */
interface MicrophoneSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * Access type is 'inputOutput'.
   */
   mediaDeviceID: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
}

/** MotorJoint drives relative angular velocities between body1 and body2 within a common reference frame. */
interface MotorJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * autoCalc controls whether user manually provides individual angle rotations each frame (false) or if angle values are automatically calculated by motor implementations (true).
   *
   * Access type is 'initializeOnly'.
   */
   autoCalc: boolean,
   /**
   * axis1Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis1Angle: number,
   /**
   * axis1Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis1Torque: number,
   /**
   * axis2Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis2Angle: number,
   /**
   * axis2Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis2Torque: number,
   /**
   * axis3Angle (radians) is rotation angle for corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis3Angle: number,
   /**
   * axis3Torque is rotational torque applied by corresponding motor axis when in user-calculated mode.
   *
   * Access type is 'inputOutput'.
   */
   axis3Torque: number,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * enabledAxes indicates which motor axes are active.
   *
   * Access type is 'inputOutput'.
   */
   enabledAxes: number,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * motor1Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor1Angle: number,
   /**
   * motor1AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor1AngleRate: number,
   /**
   * motor1Axis defines axis vector of corresponding motor axis.
   *
   * Access type is 'inputOutput'.
   */
   motor1Axis: SFVec3f,
   /**
   * motor2Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor2Angle: number,
   /**
   * motor2AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor2AngleRate: number,
   /**
   * motor2Axis defines axis vector of corresponding motor axis.
   *
   * Access type is 'inputOutput'.
   */
   motor2Axis: SFVec3f,
   /**
   * motor3Angle provides calculated angle of rotation (radians) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor3Angle: number,
   /**
   * motor3AngleRate provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly motor3AngleRate: number,
   /**
   * motor3Axis defines axis vector of corresponding motor axis.
   *
   * Access type is 'inputOutput'.
   */
   motor3Axis: SFVec3f,
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1Bounce: number,
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1ErrorCorrection: number,
   /**
   * stop2Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop2Bounce: number,
   /**
   * stop2ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop2ErrorCorrection: number,
   /**
   * stop3Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop3Bounce: number,
   /**
   * stop3ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop3ErrorCorrection: number,
}

/** MovieTexture applies a 2D movie image to surface geometry, or provides audio for a Sound node. */
interface MovieTextureProxy extends X3DSoundSourceNodeProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * or -1.
   *
   * Access type is 'outputOnly'.
   */
   readonly duration_changed: number,
   /**
   * Current elapsed time since MovieTexture activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when MovieTexture is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * Access type is 'inputOutput'.
   */
   loop: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and MovieTexture becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * Multiplier for the rate at which sampled sound is played.
   *
   * Access type is 'inputOutput'.
   */
   pitch: number,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and MovieTexture becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Factor for how fast the movie (or soundtrack) is played.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
   /**
   * Location and filename of movie file or stream.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** MultiTexture applies several individual textures to a single geometry node, enabling a variety of visual effects that include light mapping and environment mapping. */
interface MultiTextureProxy extends X3DTextureNodeProxy
{
   /**
   * The alpha field defines the alpha (1-transparency) base value for mode operations.
   *
   * Access type is 'inputOutput'.
   */
   alpha: number,
   /**
   * The color field defines the RGB base values for mode operations.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * function operators COMPLEMENT or ALPHAREPLICATE can be applied after the mode blending operation.
   *
   * Access type is 'inputOutput'.
   */
   function: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * mode field indicates the type of blending operation, both for color and for alpha channel.
   *
   * Access type is 'inputOutput'.
   */
   mode: MFString,
   /**
   * source field determines whether each image source is treated as DIFFUSE, SPECULAR or a multiplicative FACTOR.
   *
   * Access type is 'inputOutput'.
   */
   source: MFString,
   /**
   * Contained texture nodes (ImageTexture, MovieTexture, PixelTexture) that map image(s) to surface geometry, defining each of the different texture channels.
   *
   * Access type is 'inputOutput'.
   */
   texture: MFNode <X3DSingleTextureNodeProxy>,
}

/** MultiTextureCoordinate contains multiple TextureCoordinate or TextureCoordinateGenerator nodes, for use by a parent polygonal geometry node such as IndexedFaceSet or a Triangle* node. */
interface MultiTextureCoordinateProxy extends X3DTextureCoordinateNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Zero or more contained TextureCoordinate or TextureCoordinateGenerator nodes that specify texture coordinates for the different texture channels, used for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: MFNode <X3DSingleTextureCoordinateNodeProxy>,
}

/** MultiTextureTransform contains multiple TextureTransform nodes, each provided for use by corresponding ImageTexture MovieTexture or PixelTexture nodes within a sibling MultiTexture node. */
interface MultiTextureTransformProxy extends X3DTextureTransformNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Zero or more contained TextureTransform nodes, for each of the different texture channels, that define 2D transformation applied to texture coordinates.
   *
   * Access type is 'inputOutput'.
   */
   textureTransform: MFNode <X3DSingleTextureTransformNodeProxy>,
}

/** NavigationInfo describes the user's viewing model, user navigation-interaction modalities, and also dimensional characteristics of the user's (typically invisible) avatar. */
interface NavigationInfoProxy extends X3DBindableNodeProxy
{
   /**
   * avatarSize triplet values define three separate parameters: (a) collisionDistance between user and geometry, i.
   *
   * Access type is 'inputOutput'.
   */
   avatarSize: MFFloat,
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Enable/disable directional light that always points in the direction the user is looking.
   *
   * Access type is 'inputOutput'.
   */
   headlight: boolean,
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Receiving event set_bind=true activates and binds this node at the top of the binding stack.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Default rate at which viewer travels through scene, meters/second.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Event signaling viewpoint transition complete.
   *
   * Access type is 'outputOnly'.
   */
   readonly transitionComplete: boolean,
   /**
   * transitionTime defines the expected duration of viewpoint transition in seconds.
   *
   * Access type is 'inputOutput'.
   */
   transitionTime: number,
   /**
   * Camera transition between viewpoints.
   *
   * Access type is 'inputOutput'.
   */
   transitionType: MFString,
   /**
   * Enter one or more quoted SFString values: "EXAMINE" "WALK" "FLY" "LOOKAT" "EXPLORE" "ANY" "NONE".
   *
   * Access type is 'inputOutput'.
   */
   type: MFString,
   /**
   * Geometry beyond the visibilityLimit may not be rendered (far clipping plane of the view frustrum).
   *
   * Access type is 'inputOutput'.
   */
   visibilityLimit: number,
}

/** Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface NormalProxy extends X3DNormalNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set of unit-length normal vectors, corresponding to indexed polygons or vertices.
   *
   * Access type is 'inputOutput'.
   */
   vector: MFVec3f,
}

/** NormalInterpolator generates a series of normal (perpendicular) 3-tuple SFVec3f values. */
interface NormalInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec3f,
}

/** NurbsCurve is a 3D curve analogous to NurbsPatchSurface. */
interface NurbsCurveProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * Access type is 'initializeOnly'.
   */
   closed: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   knot: MFDouble,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   tessellation: number,
   /**
   * Vector assigning relative weight value to each control point.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsCurve2D defines a trimming segment that is part of a trimming contour in the u-v domain of a surface. */
interface NurbsCurve2DProxy extends X3DNurbsControlCurveNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * Access type is 'initializeOnly'.
   */
   closed: boolean,
   /**
   * controlPoint defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: MFVec2d,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   knot: MFDouble,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   tessellation: number,
   /**
   * Vector assigning relative weight value to each control point.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsOrientationInterpolator describes a 3D NURBS curve and outputs interpolated orientation values. */
interface NurbsOrientationInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'inputOutput'.
   */
   knot: MFDouble,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'inputOutput'.
   */
   order: number,
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFRotation,
   /**
   * Output values for computational interpolation, each corresponding to knots.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsPatchSurface defines a contiguous 3D Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsPatchSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained NurbsTextureCoordinate, TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy,
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uClosed: boolean,
   /**
   * Number of control points in u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uDimension: number,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   uKnot: MFDouble,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   uOrder: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   uTessellation: number,
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vClosed: boolean,
   /**
   * Number of control points in v dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vDimension: number,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   vKnot: MFDouble,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   vOrder: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   vTessellation: number,
   /**
   * Vector assigning relative weight value to each control point.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsPositionInterpolator describes a 3D NURBS curve and outputs interpolated position values. */
interface NurbsPositionInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'inputOutput'.
   */
   knot: MFDouble,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'inputOutput'.
   */
   order: number,
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsSet collects a set of NurbsSurface nodes into a common group and treats NurbsSurface set as a unit during tessellation, thereby enforcing tessellation continuity along borders. */
interface NurbsSetProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addGeometry: MFNode <X3DParametricGeometryNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * The children form a closed loop with first point of first child repeated as last point of last child, and the last point of a segment repeated as first point of the consecutive one.
   *
   * Access type is 'inputOutput'.
   */
   geometry: MFNode <X3DParametricGeometryNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeGeometry: MFNode <X3DParametricGeometryNodeProxy>,
   /**
   * scale for surface tessellation in children NurbsSurface nodes.
   *
   * Access type is 'inputOutput'.
   */
   tessellationScale: number,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** NurbsSurfaceInterpolator describes a 3D NURBS curve and outputs interpolated position and normal values. */
interface NurbsSurfaceInterpolatorProxy extends X3DChildNodeProxy
{
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly normal_changed: SFVec3f,
   /**
   * Computationaly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly position_changed: SFVec3f,
   /**
   * setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: SFVec2f,
   /**
   * Number of control points in u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   uKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   uOrder: number,
   /**
   * Number of control points in v dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   vKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   vOrder: number,
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsSweptSurface uses a trajectoryCurve path to describe a generalized surface that is swept by a crossSectionCurve. */
interface NurbsSweptSurfaceProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * defines cross-section of the surface traced about the trajectoryCurve axis.
   *
   * Access type is 'inputOutput'.
   */
   crossSectionCurve: X3DNurbsControlCurveNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * describes the center-line path using a NurbsCurve node, oriented so that it is defined counterclockwise when looking down the −Y axis, thus defining a concept of inside and outside.
   *
   * Access type is 'inputOutput'.
   */
   trajectoryCurve: NurbsCurveProxy,
}

/** NurbsSwungSurface contains a profileCurve and a trajectoryCurve [X3DNurbsControlCurveNode]. */
interface NurbsSwungSurfaceProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * 2D curve in the yz-plane that describes the cross-sectional shape of the object.
   *
   * Access type is 'inputOutput'.
   */
   profileCurve: X3DNurbsControlCurveNodeProxy,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * 2D curve in the xz-plane that describes path over which to trace the cross-section.
   *
   * Access type is 'inputOutput'.
   */
   trajectoryCurve: X3DNurbsControlCurveNodeProxy,
}

/** NurbsTextureCoordinate describes a 3D NURBS surface in the parametric domain of its surface host, specifying mapping of texture onto the surface. */
interface NurbsTextureCoordinateProxy extends X3DNodeProxy
{
   /**
   * controlPoint defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: MFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Number of control points in u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   uKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   uOrder: number,
   /**
   * Number of control points in v dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   vKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   vOrder: number,
   /**
   * Output values for linear interpolation, each corresponding to knots.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** NurbsTrimmedSurface generates texture coordinates from a Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsTrimmedSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addTrimmingContour: MFNode <Contour2DProxy>,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.
   *
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeTrimmingContour: MFNode <Contour2DProxy>,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained NurbsTextureCoordinate, TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy,
   /**
   * A set of Contour2D nodes are used as trimming loops.
   *
   * Access type is 'inputOutput'.
   */
   trimmingContour: MFNode <Contour2DProxy>,
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uClosed: boolean,
   /**
   * Number of control points in u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   uDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   uKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   uOrder: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   uTessellation: number,
   /**
   * Whether opposite surface sides are closed (seamless) across u dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vClosed: boolean,
   /**
   * Number of control points in v dimension.
   *
   * Access type is 'initializeOnly'.
   */
   vDimension: number,
   /**
   * Knot vector, where size = number of control points + order of curve.
   *
   * Access type is 'initializeOnly'.
   */
   vKnot: MFDouble,
   /**
   * Define order of surface by polynomials of degree = order-1.
   *
   * Access type is 'initializeOnly'.
   */
   vOrder: number,
   /**
   * hint for surface tessellation.
   *
   * Access type is 'inputOutput'.
   */
   vTessellation: number,
   /**
   * Vector assigning relative weight value to each control point.
   *
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** OpacityMapVolumeStyle specifies that volumetric data is rendered using opacity mapped to a transfer function texture. */
interface OpacityMapVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The transferFunction field holds a single texture representation in either two or three dimensions that maps the voxel data values to a specific colour output.
   *
   * Access type is 'inputOutput'.
   */
   transferFunction: X3DTexture2DNodeProxy | X3DTexture3DNodeProxy,
}

/** OrientationChaser generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFRotation,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFRotation,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFRotation,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFRotation,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFRotation,
}

/** OrientationDamper generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFRotation,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFRotation,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFRotation,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFRotation,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFRotation,
}

/** OrientationInterpolator generates a series of 4-tuple axis-angle SFRotation values. */
interface OrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFRotation,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFRotation,
}

/** OrthoViewpoint provides an orthographic perspective-free view of a scene from a specific location and direction. */
interface OrthoViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * Access type is 'inputOutput'.
   */
   centerOfRotation: SFVec3f,
   /**
   * Text description or navigation hint to describe the significance of this model Viewpoint.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Minimum and maximum extents of view in units of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   fieldOfView: MFFloat,
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.
   *
   * Access type is 'inputOutput'.
   */
   jump: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * Access type is 'inputOutput'.
   */
   navigationInfo: NavigationInfoProxy,
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * Access type is 'inputOutput'.
   */
   retainUserOffsets: boolean,
   /**
   * Sending event set_bind=true makes this node active.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * Access type is 'inputOutput'.
   */
   viewAll: boolean,
}

/** OscillatorSource node represents an audio source generating a periodic waveform, providing a constant tone. */
interface OscillatorSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * The detune ffield is an a-rate AudioParam representing detuning of oscillation in cents (though the AudioParam returned is read-only, the value it represents is not).
   *
   * Access type is 'inputOutput'.
   */
   detune: number,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The frequency of oscillation in hertz.
   *
   * Access type is 'inputOutput'.
   */
   frequency: number,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
}

/** PackagedShader can contain field declarations, but no CDATA section of plain-text source code. */
interface PackagedShaderProxy extends X3DShaderNodeProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * Access type is 'inputOnly'.
   */
   activate: boolean,
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Include a field statement for each field declaration in the PackagedShader node.
   *
   * Access type is 'inputOutput'.
   */
   field: MFNode <fieldProxy>,
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isSelected: boolean,
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * Access type is 'outputOnly'.
   */
   readonly isValid: boolean,
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * Access type is 'initializeOnly'.
   */
   language: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * url points to a shader source-code file that may contain a number of shaders and combined effects.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** ParticleSystem specifies a complete particle system. */
interface ParticleSystemProxy extends X3DShapeNodeProxy
{
   /**
   * The appearance field holds an Appearance node that is used for the geometry.
   *
   * Access type is 'inputOutput'.
   */
   appearance: X3DAppearanceNodeProxy,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * The castShadow field defines whether this Shape casts shadows as produced by lighting nodes.
   *
   * Access type is 'inputOutput'.
   */
   castShadow: boolean,
   /**
   * The color field contains Color|ColorRGBA nodes as a series of color values to be used at the given colorKey points in time.
   *
   * Access type is 'initializeOnly'.
   */
   color: X3DColorNodeProxy,
   /**
   * Array of time intervals in seconds, corresponding to particle lifetime, that are used to interpolate color array values.
   *
   * Access type is 'initializeOnly'.
   */
   colorKey: MFFloat,
   /**
   * Enables/disables creation of new particles, while any existing particles remain in existence and continue to animate until the end of their lifetimes.
   *
   * Access type is 'inputOutput'.
   */
   createParticles: boolean,
   /**
   * The emitter field specifies the type of emitter geometry and properties that the particles are given for their initial positions.
   *
   * Access type is 'initializeOnly'.
   */
   emitter: X3DParticleEmitterNodeProxy,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Single contained geometry node provides geometry used for each particle when geometryType=GEOMETRY.
   *
   * Access type is 'inputOutput'.
   */
   geometry: X3DGeometryNodeProxy,
   /**
   * specifies type of geometry used to represent individual particles.
   *
   * Access type is 'initializeOnly'.
   */
   geometryType: string,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * TODO not properly defined in X3D spedification.
   *
   * Access type is 'inputOutput'.
   */
   lifetimeVariation: number,
   /**
   * Maximum number of particles to be generated at one time (subject to player limitations).
   *
   * Access type is 'inputOutput'.
   */
   maxParticles: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * TODO not properly defined in X3D spedification.
   *
   * Access type is 'inputOutput'.
   */
   particleLifetime: number,
   /**
   * particleSize describes width and height dimensions for each particle in length base units (default is meters).
   *
   * Access type is 'inputOutput'.
   */
   particleSize: SFVec2f,
   /**
   * After being created, the individual particles are then manipulated according to the physics model(s) specified in the physics field.
   *
   * Access type is 'initializeOnly'.
   */
   physics: MFNode <X3DParticlePhysicsModelNodeProxy>,
   /**
   * texture coordinates of the provided texture(s) in the Appearance node, over time.
   *
   * Access type is 'initializeOnly'.
   */
   texCoord: TextureCoordinateProxy | TextureCoordinateGeneratorProxy,
   /**
   * Array of time intervals in seconds, corresponding to particle lifetime, that are used to sequence texCoord array values.
   *
   * Access type is 'initializeOnly'.
   */
   texCoordKey: MFFloat,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** PeriodicWave defines a periodic waveform that can be used to shape the output of an Oscillator. */
interface PeriodicWaveProxy extends X3DSoundNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * imaginary coefficients for defining a waveform.
   *
   * Access type is 'inputOutput'.
   */
   optionsImag: MFFloat,
   /**
   * real coefficients for defining a waveform.
   *
   * Access type is 'inputOutput'.
   */
   optionsReal: MFFloat,
   /**
   * The type field specifies shape of waveform to play, which can be one of several provided values or else 'custom' to indicate that real and imaginary coefficient arrays define a custom waveform.
   *
   * Access type is 'inputOutput'.
   */
   type: string,
}

/** PhysicalMaterial specifies surface rendering properties for associated geometry nodes. */
interface PhysicalMaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * similar to diffuseColor, TODO define more precisely.
   *
   * Access type is 'inputOutput'.
   */
   baseColor: SFColor,
   /**
   * When applying baseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   baseTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   baseTextureMapping: string,
   /**
   * how much glowing light is emitted from this object.
   *
   * Access type is 'inputOutput'.
   */
   emissiveColor: SFColor,
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTextureMapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * metallic is a PBR parameter (TODO elaborate).
   *
   * Access type is 'inputOutput'.
   */
   metallic: number,
   /**
   * When applying metallic for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   metallicRoughnessTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   metallicRoughnessTextureMapping: string,
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * Access type is 'inputOutput'.
   */
   normalScale: number,
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * Access type is 'inputOutput'.
   */
   normalTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   normalTextureMapping: string,
   /**
   * occlusionStrength indicates areas of indirect lighting, typically called ambient occlusion.
   *
   * Access type is 'inputOutput'.
   */
   occlusionStrength: number,
   /**
   * When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   occlusionTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   occlusionTextureMapping: string,
   /**
   * roughness is a PBR parameter (TODO elaborate).
   *
   * Access type is 'inputOutput'.
   */
   roughness: number,
   /**
   * how "clear" an object is: 1.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** PickableGroup is a Grouping node that can contain most nodes. */
interface PickableGroupProxy extends X3DGroupingNodeProxy, X3DPickableObjectProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * The pickable field determines whether pick traversal is performed on this node or its children.
   *
   * Access type is 'inputOutput'.
   */
   pickable: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** PixelTexture creates a 2D-image texture map using a numeric array of pixel values. */
interface PixelTextureProxy extends X3DTexture2DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Defines image: width, height, number_of_components per each pixel value, and list of pixel_values.
   *
   * Access type is 'inputOutput'.
   */
   image: SFImage,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
}

/** PixelTexture3D defines a 3D image-based texture map as an explicit array of pixel values (image field). */
interface PixelTexture3DProxy extends X3DTexture3DNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * image describes raw data for this 3D texture: number of components to the image [0,4], width, height and depth of the texture, followed by (width x height x depth) pixel values.
   *
   * Access type is 'inputOutput'.
   */
   image: MFInt32,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether to repeat texture along R axis from front to back.
   *
   * Access type is 'initializeOnly'.
   */
   repeatR: boolean,
   /**
   * Whether to repeat texture along S axis horizontally from left to right.
   *
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Whether to repeat texture along T axis vertically from top to bottom.
   *
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.
   *
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
}

/** PlaneSensor converts pointing device motion into 2D translation parallel to the local Z=0 plane. */
interface PlaneSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * Determines whether previous offset values are remembered/accumulated.
   *
   * Access type is 'inputOutput'.
   */
   autoOffset: boolean,
   /**
   * axisRotation determines local sensor coordinate system by rotating the local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   axisRotation: SFRotation,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * minPosition and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition < minPosition means no clamping.
   *
   * Access type is 'inputOutput'.
   */
   maxPosition: SFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minPosition and maxPosition clamp translations to a range of values measured from origin of Z=0 plane default maxPosition < minPosition means no clamping.
   *
   * Access type is 'inputOutput'.
   */
   minPosition: SFVec2f,
   /**
   * Sends event and remembers last value sensed.
   *
   * Access type is 'inputOutput'.
   */
   offset: SFVec3f,
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly trackPoint_changed: SFVec3f,
   /**
   * translation_changed events equal sum of relative translation change plus offset value.
   *
   * Access type is 'outputOnly'.
   */
   readonly translation_changed: SFVec3f,
}

/** PointEmitter generates particles from a specific point in space using the specified direction and speed. */
interface PointEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Initial direction from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Point from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface PointLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.
   *
   * Access type is 'inputOutput'.
   */
   attenuation: SFVec3f,
   /**
   * color of light, applied to colors of objects.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Brightness of direct emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of light relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables this light source.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Maximum effective distance of light relative to local light position, affected by ancestor scaling.
   *
   * Access type is 'inputOutput'.
   */
   radius: number,
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
}

/** PointPickSensor tests one or more pickingGeometry points in space as lying inside the provided pickTarget geometry. */
interface PointPickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * Access type is 'initializeOnly'.
   */
   intersectionType: string,
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * defines whether the intersection test (i.
   *
   * Access type is 'inputOutput'.
   */
   matchCriterion: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>,
   /**
   * Output event containing 3D points on surface of underlying pickingGeometry computed by the picking intersection computations, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedPoint: MFVec3f,
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * Access type is 'inputOutput'.
   */
   pickingGeometry: X3DGeometryNodeProxy,
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * Access type is 'inputOutput'.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>,
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * Access type is 'initializeOnly'.
   */
   sortOrder: string,
}

/** PointProperties allows precise fine-grained control over the rendering style of PointSet node points inside the same Shape. */
interface PointPropertiesProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * attenuation array values [a, b, c] are set to default values if undefined.
   *
   * Access type is 'inputOutput'.
   */
   attenuation: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * pointSizeMaxValue is maximum allowed scaling factor on nominal browser point scaling.
   *
   * Access type is 'inputOutput'.
   */
   pointSizeMaxValue: number,
   /**
   * pointSizeMinValue is minimum allowed scaling factor on nominal browser point scaling.
   *
   * Access type is 'inputOutput'.
   */
   pointSizeMinValue: number,
   /**
   * Nominal rendered point size is a browser-dependent minimum renderable point size, which is then multiplied by an additional pointSizeScaleFactor (which is greater than or equal to 1).
   *
   * Access type is 'inputOutput'.
   */
   pointSizeScaleFactor: number,
}

/** PointSet is a node that contains a set of colored 3D points, represented by contained Color|ColorRGBA and Coordinate|CoordinateDouble nodes. */
interface PointSetProxy extends X3DGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
}

/** Polyline2D is a geometry node that defines a connected set of vertices in a contiguous set of line segments in X-Y plane. */
interface Polyline2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Coordinates of vertices connected into contiguous Polyline2D.
   *
   * Access type is 'initializeOnly'.
   */
   lineSegments: MFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** PolylineEmitter emits particles along a single polyline. */
interface PolylineEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Coordinates for the line along which particles are randomly generated.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * coordIndex indices are applied to contained Coordinate values in order to define randomly generated initial geometry of the particles.
   *
   * Access type is 'initializeOnly'.
   */
   coordIndex: MFInt32,
   /**
   * Initial direction from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   set_coordIndex: MFInt32,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** Polypoint2D is a geometry node that defines a set of 2D points in X-Y plane. */
interface Polypoint2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * 2D coordinates of vertices.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec2f,
}

/** PositionChaser generates a series of position values that progressively change from initial value to destination value. */
interface PositionChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFVec3f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFVec3f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFVec3f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFVec3f,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
}

/** PositionChaser2D generates a series of 2D position values that progressively change from initial value to destination value. */
interface PositionChaser2DProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFVec2f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFVec2f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFVec2f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFVec2f,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec2f,
}

/** PositionDamper generates a series of position values that progressively change from initial value to destination value. */
interface PositionDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFVec3f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFVec3f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFVec3f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFVec3f,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
}

/** PositionDamper2D generates a series of 2D floating-point values that progressively change from initial value to destination value. */
interface PositionDamper2DProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: SFVec2f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: SFVec2f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: SFVec2f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: SFVec2f,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec2f,
}

/** PositionInterpolator generates a series of 3-tuple SFVec3f values. */
interface PositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
}

/** PositionInterpolator2D generates a series of SFVec2f values. */
interface PositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec2f,
}

/** If a non-uniform scale is applied to the pick sensor, correct results may require level 3 support. */
interface PrimitivePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * Access type is 'initializeOnly'.
   */
   intersectionType: string,
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * defines whether the intersection test (i.
   *
   * Access type is 'inputOutput'.
   */
   matchCriterion: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>,
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * Access type is 'inputOutput'.
   */
   pickingGeometry: X3DGeometryNodeProxy,
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * Access type is 'inputOutput'.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>,
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * Access type is 'initializeOnly'.
   */
   sortOrder: string,
}

/** ProgramShader contains no field declarations and no plain-text source code. */
interface ProgramShaderProxy extends X3DShaderNodeProxy
{
   /**
   * activate forces the shader to activate the contained objects.
   *
   * Access type is 'inputOnly'.
   */
   activate: boolean,
   /**
   * isSelected indicates this shader instance is selected for use by browser Warning: it is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isSelected: boolean,
   /**
   * isValid indicates whether current shader objects can be run as a shader program.
   *
   * Access type is 'outputOnly'.
   */
   readonly isValid: boolean,
   /**
   * The language field indicates to the X3D player which shading language is used.
   *
   * Access type is 'initializeOnly'.
   */
   language: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * ProgramShader contains zero or more ShaderProgram node instances.
   *
   * Access type is 'inputOutput'.
   */
   programs: MFNode <ShaderProgramProxy>,
}

/** ProjectionVolumeStyle uses voxel data to directly generate output color. */
interface ProjectionVolumeStyleProxy extends X3DVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Threshold value used when type=MIN (LMIP) or type=MAX (MIP).
   *
   * Access type is 'inputOutput'.
   */
   intensityThreshold: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If type=MAX then Maximum Intensity Projection (MIP) or Least MIP (LMIP) algorithm is used to generate output color.
   *
   * Access type is 'inputOutput'.
   */
   type: string,
}

/** ProtoInstance can override field default values via fieldValue initializations. Non-recursive nested ProtoInstance and ProtoDeclare statements are allowed within a ProtoDeclare. */
interface ProtoInstanceProxy extends X3DPrototypeInstanceProxy, X3DChildNodeProxy
{
   /**
   * Include fieldValue statements if this ProtoInstance overrides default values in any of the original field declarations.
   *
   * Access type is 'inputOutput'.
   */
   fieldValue: MFNode <fieldValueProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * name of the prototype node being instanced.
   *
   * Access type is 'inputOutput'.
   */
   name: string,
}

/** ProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface ProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Position offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Sends changed centerOfRotation values, likely caused by user interaction.
   *
   * Access type is 'outputOnly'.
   */
   readonly centerOfRotation_changed: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Time event generated when user's camera enters the box.
   *
   * Access type is 'outputOnly'.
   */
   readonly enterTime: number,
   /**
   * Time event generated when user's camera exits the box.
   *
   * Access type is 'outputOnly'.
   */
   readonly exitTime: number,
   /**
   * isActive true/false events are sent as viewer enters/exits Proximity box.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Sends rotation event relative to center.
   *
   * Access type is 'outputOnly'.
   */
   readonly orientation_changed: SFRotation,
   /**
   * Sends translation event relative to center.
   *
   * Access type is 'outputOnly'.
   */
   readonly position_changed: SFVec3f,
   /**
   * size of Proximity box around center location, oriented within local transformation frame.
   *
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
}

/** QuadSet is a geometry node that defines quadrilaterals. */
interface QuadSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** ReceiverPdu is a networked Protocol Data Unit (PDU) information node that transmits the state of radio frequency (RF) receivers modeled in a simulation. */
interface ReceiverPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'; Example: 224.
   *
   * Access type is 'inputOutput'.
   */
   address: string,
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * Access type is 'inputOutput'.
   */
   applicationID: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables the sensor node.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * EntityID unique ID for entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   entityID: number,
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * confirm whether there has been a recent network update.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkReader: boolean,
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkWriter: boolean,
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * Access type is 'outputOnly'.
   */
   readonly isRtpHeaderHeard: boolean,
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * Access type is 'outputOnly'.
   */
   readonly isStandAlone: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Fallback server address if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayHost: string,
   /**
   * Fallback server port if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayPort: number,
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * Access type is 'inputOutput'.
   */
   networkMode: string,
   /**
   * Multicast network port, for example: 3000.
   *
   * Access type is 'inputOutput'.
   */
   port: number,
   /**
   * Identifies a particular radio within a given entity.
   *
   * Access type is 'inputOutput'.
   */
   radioID: number,
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * Access type is 'inputOutput'.
   */
   readInterval: number,
   /**
   * receivedPower indicates radio frequency (RF) power received, in units of decibel-milliwatts (dBm), after applying any propagation loss and antenna gain.
   *
   * Access type is 'inputOutput'.
   */
   receivedPower: number,
   /**
   * receiverState indicates if receiver is currently idle or busy via one of these enumerated values: 0 = off, 1 = on but not receiving, or 2 = on and receiving.
   *
   * Access type is 'inputOutput'.
   */
   receiverState: number,
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * Access type is 'inputOutput'.
   */
   rtpHeaderExpected: boolean,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   siteID: number,
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * Access type is 'outputOnly'.
   */
   readonly timestamp: number,
   /**
   * Simulation/exercise transmitterApplicationID is unique for transmitter application at that site.
   *
   * Access type is 'inputOutput'.
   */
   transmitterApplicationID: number,
   /**
   * Simulation/exercise transmitterEntityID is a unique ID for a single entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   transmitterEntityID: number,
   /**
   * Identifies a particular radio within a given entity.
   *
   * Access type is 'inputOutput'.
   */
   transmitterRadioID: number,
   /**
   * Simulation/exercise transmitterSiteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   transmitterSiteID: number,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * Access type is 'inputOutput'.
   */
   whichGeometry: number,
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * Access type is 'inputOutput'.
   */
   writeInterval: number,
}

/** Rectangle2D is a geometry node that defines a 2D rectangle in X-Y plane. */
interface Rectangle2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * 2D dimensions of Rectangle2D.
   *
   * Access type is 'initializeOnly'.
   */
   size: SFVec2f,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
}

/** RigidBody describes a collection of shapes with a mass distribution that is affected by the physics model. */
interface RigidBodyProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * angularDampingFactor automatically damps a portion of body motion over time.
   *
   * Access type is 'inputOutput'.
   */
   angularDampingFactor: number,
   /**
   * angularVelocity sets constant velocity value to object every frame, and reports updates by physics model.
   *
   * Access type is 'inputOutput'.
   */
   angularVelocity: SFVec3f,
   /**
   * autoDamp enables/disables angularDampingFactor and linearDampingFactor.
   *
   * Access type is 'inputOutput'.
   */
   autoDamp: boolean,
   /**
   * autoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.
   *
   * Access type is 'inputOutput'.
   */
   autoDisable: boolean,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * centerOfMass defines local center of mass for physics calculations.
   *
   * Access type is 'inputOutput'.
   */
   centerOfMass: SFVec3f,
   /**
   * disableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * Access type is 'inputOutput'.
   */
   disableAngularSpeed: number,
   /**
   * disableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.
   *
   * Access type is 'inputOutput'.
   */
   disableLinearSpeed: number,
   /**
   * disableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * Access type is 'inputOutput'.
   */
   disableTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * finiteRotationAxis specifies vector around which the object rotates.
   *
   * Access type is 'inputOutput'.
   */
   finiteRotationAxis: SFVec3f,
   /**
   * fixed indicates whether body is able to move.
   *
   * Access type is 'inputOutput'.
   */
   fixed: boolean,
   /**
   * forces defines linear force values applied to the object every frame.
   *
   * Access type is 'inputOutput'.
   */
   forces: MFVec3f,
   /**
   * The geometry field is used to connect the body modelled by the physics engine implementation to the real geometry of the scene through the use of collidable nodes.
   *
   * Access type is 'inputOutput'.
   */
   geometry: MFNode <X3DNBodyCollidableNodeProxy>,
   /**
   * inertia matrix defines a 3x2 inertia tensor matrix.
   *
   * Access type is 'inputOutput'.
   */
   inertia: SFMatrix3f,
   /**
   * linearDampingFactor automatically damps a portion of body motion over time.
   *
   * Access type is 'inputOutput'.
   */
   linearDampingFactor: number,
   /**
   * linearVelocity sets constant velocity value to object every frame, and reports updates by physics model.
   *
   * Access type is 'inputOutput'.
   */
   linearVelocity: SFVec3f,
   /**
   * mass of the body in kilograms.
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * The massDensityModel field is used to describe the geometry type and dimensions used to calculate the mass density in the physics model.
   *
   * Access type is 'inputOutput'.
   */
   massDensityModel: SphereProxy | BoxProxy | ConeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * orientation sets body direction in world space, then reports physics updates.
   *
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * position sets body location in world space, then reports physics updates.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * torques defines rotational force values applied to the object every frame.
   *
   * Access type is 'inputOutput'.
   */
   torques: MFVec3f,
   /**
   * useFiniteRotation enables/disables higher-resolution, higher-cost computational method for calculating rotations.
   *
   * Access type is 'inputOutput'.
   */
   useFiniteRotation: boolean,
   /**
   * useGlobalGravity indicates whether this particular body is influenced by parent RigidBodyCollection's gravity setting.
   *
   * Access type is 'inputOutput'.
   */
   useGlobalGravity: boolean,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** RigidBodyCollection represents a system of bodies that interact within a single physics model. */
interface RigidBodyCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * autoDisable toggles operation of disableAngularSpeed, disableLinearSpeed, disableTime.
   *
   * Access type is 'inputOutput'.
   */
   autoDisable: boolean,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Collection of top-level nodes that comprise a set of bodies evaluated as a single set of interactions.
   *
   * Access type is 'inputOutput'.
   */
   bodies: MFNode <RigidBodyProxy>,
   /**
   * The collider field associates a collision collection with this rigid body collection allowing seamless updates and integration without the need to use the X3D event model.
   *
   * Access type is 'initializeOnly'.
   */
   collider: CollisionCollectionProxy,
   /**
   * constantForceMix modifies damping calculations by violating normal constraints while applying small, constant forces in those calculations.
   *
   * Access type is 'inputOutput'.
   */
   constantForceMix: number,
   /**
   * contactSurfaceThickness defines how far bodies may interpenetrate after a collision, allowing simulation of softer bodies that deform somewhat during collision.
   *
   * Access type is 'inputOutput'.
   */
   contactSurfaceThickness: number,
   /**
   * disableAngularSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * Access type is 'inputOutput'.
   */
   disableAngularSpeed: number,
   /**
   * disableLinearSpeed defines lower-limit tolerance value when body is considered at rest and not part of rigid body calculation, reducing numeric instabilitiess.
   *
   * Access type is 'inputOutput'.
   */
   disableLinearSpeed: number,
   /**
   * disableTime defines interval when body becomes at rest and not part of rigid body calculations, reducing numeric instabilities.
   *
   * Access type is 'inputOutput'.
   */
   disableTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * errorCorrection describes how quickly intersection errors due to floating-point inaccuracies are resolved (0=no correction, 1=all corrected in single step).
   *
   * Access type is 'inputOutput'.
   */
   errorCorrection: number,
   /**
   * gravity indicates direction and strength of local gravity vector for this collection of bodies (units m/sec^2).
   *
   * Access type is 'inputOutput'.
   */
   gravity: SFVec3f,
   /**
   * iterations controls number of iterations performed over collectioned joints and bodies during each evaluation.
   *
   * Access type is 'inputOutput'.
   */
   iterations: number,
   /**
   * The joints field is used to register all joints between bodies contained in this collection.
   *
   * Access type is 'inputOutput'.
   */
   joints: MFNode <X3DRigidJointNodeProxy>,
   /**
   * or -1, maxCorrectionSpeed.
   *
   * Access type is 'inputOutput'.
   */
   maxCorrectionSpeed: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * preferAccuracy provides hint for performance preference: higher accuracy or faster computational speed.
   *
   * Access type is 'inputOutput'.
   */
   preferAccuracy: boolean,
   /**
   * set_contacts input field for Contact nodes provides per-frame information about contacts between bodies.
   *
   * Access type is 'inputOnly'.
   */
   set_contacts: MFNode <ContactProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** ScalarChaser generates a series of single floating-point values that progressively change from initial value to destination value. */
interface ScalarChaserProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: number,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: number,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: number,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: number,
}

/** ScalarDamper generates a series of floating-point values that progressively change from initial value to destination value. */
interface ScalarDamperProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: number,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: number,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: number,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: number,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: number,
}

/** ScalarInterpolator generates piecewise-linear SFFloat values. */
interface ScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition values for linear-interpolation function input intervals, listed in non-decreasing order and corresponding to a value in the keyValue array.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for linear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_fraction selects input key for corresponding keyValue output.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Linearly interpolated output value determined by current key time and corresponding keyValue pair.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: number,
}

/** ScreenFontStyle is an X3DFontStyleNode defines the size, family, justification, and other styles used within a screen layout. */
interface ScreenFontStyleProxy extends X3DFontStyleNodeProxy
{
   /**
   * Array of quoted font family names in preference order, browsers use the first supported family.
   *
   * Access type is 'inputOutput'.
   */
   family: MFString,
   /**
   * Whether text direction is horizontal (true) or vertical (false).
   *
   * Access type is 'inputOutput'.
   */
   horizontal: boolean,
   /**
   * The justify field determines horizontal and vertical alignment of text layout, relative to the origin of the object coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   justify: MFString,
   /**
   * Language codes consist of a primary code and a (possibly empty) series of subcodes.
   *
   * Access type is 'inputOutput'.
   */
   language: string,
   /**
   * Whether text direction is left-to-right (true) or right-to-left (false).
   *
   * Access type is 'inputOutput'.
   */
   leftToRight: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * pointSize field specifies the size of text in points.
   *
   * Access type is 'inputOutput'.
   */
   pointSize: number,
   /**
   * Adjustment factor for line spacing between adjacent lines of text.
   *
   * Access type is 'inputOutput'.
   */
   spacing: number,
   /**
   * Pick one of four values for text style (PLAIN|BOLD|ITALIC|BOLDITALIC).
   *
   * Access type is 'inputOutput'.
   */
   style: string,
   /**
   * Whether text direction is top-to-bottom (true) or bottom-to-top (false).
   *
   * Access type is 'inputOutput'.
   */
   topToBottom: boolean,
}

/** ScreenGroup is a Grouping node that can contain most nodes. */
interface ScreenGroupProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Script contains author-programmed event behaviors for a scene. */
interface ScriptProxy extends X3DScriptNodeProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Set directOutput true if Script has field reference(s) of type SFNode/MFNode, and also uses direct access to modify attributes of a referenced node in the Scene.
   *
   * Access type is 'initializeOnly'.
   */
   directOutput: boolean,
   /**
   * Include a field statement for each field declaration in this Script node.
   *
   * Access type is 'inputOutput'.
   */
   field: MFNode <fieldProxy>,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If mustEvaluate false, then the X3D player may delay sending input events to Script until output events are needed.
   *
   * Access type is 'initializeOnly'.
   */
   mustEvaluate: boolean,
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * Access type is 'inputOutput'.
   */
   sourceCode: string,
   /**
   * List of address links for runnable script files.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** SegmentedVolumeData displays a segmented voxel dataset with different RenderStyle nodes. */
interface SegmentedVolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   dimensions: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Multiple contained X3DVolumeRenderStyleNode nodes corresponding to each isosurface that define specific rendering technique for this volumetric object.
   *
   * Access type is 'inputOutput'.
   */
   renderStyle: MFNode <X3DVolumeRenderStyleNodeProxy>,
   /**
   * Array of boolean values that indicates whether to draw each segment, with indices corresponding to the segment identifier.
   *
   * Access type is 'inputOutput'.
   */
   segmentEnabled: MFBool,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) holds component texture that provides corresponding segment identifier.
   *
   * Access type is 'inputOutput'.
   */
   segmentIdentifiers: X3DTexture3DNodeProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * Access type is 'inputOutput'.
   */
   voxels: X3DTexture3DNodeProxy,
}

/** All fields fully supported except shadows supported with at least Phong shading at level 3. All fields fully supported with at least Phong shading and Henyey-Greenstein phase function, shadows fully supported at level 4. */
interface ShadedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Whether rendering calculates and applies shading effects to visual output.
   *
   * Access type is 'inputOutput'.
   */
   lighting: boolean,
   /**
   * Colour and opacity is determined based on whether a value has been specified for the material field.
   *
   * Access type is 'inputOutput'.
   */
   material: X3DMaterialNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * define scattering model for implementations using global illumination (NONE or Henyey-Greenstein phase function).
   *
   * Access type is 'initializeOnly'.
   */
   phaseFunction: string,
   /**
   * Whether rendering calculates and applies shadows to visual output (using global illumination model).
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * Access type is 'inputOutput'.
   */
   surfaceNormals: X3DTexture3DNodeProxy,
}

/** ShaderPart can contain a CDATA section of plain-text source code. */
interface ShaderPartProxy extends X3DNodeProxy, X3DUrlObjectProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * Access type is 'inputOutput'.
   */
   sourceCode: string,
   /**
   * type indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.
   *
   * Access type is 'initializeOnly'.
   */
   type: string,
   /**
   * Location and filename of shader.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** ShaderProgram can contain field declarations and a CDATA section of plain-text source code. */
interface ShaderProgramProxy extends X3DNodeProxy
{
   /**
   * autoRefresh defines interval in seconds before automatic reload of current url asset is performed.
   *
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * autoRefreshTimeLimit defines maximum duration that automatic refresh activity can occur.
   *
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Include a field statement for each field declaration in the ShaderProgram node.
   *
   * Access type is 'inputOutput'.
   */
   field: MFNode <fieldProxy>,
   /**
   * load=true means load immediately, load=false means defer loading or else unload a previously loaded scene.
   *
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Embedded scripting source code can be contained within the parent node as a plain-text CDATA block, without requiring escaping of special characters.
   *
   * Access type is 'inputOutput'.
   */
   sourceCode: string,
   /**
   * type indicates whether this ShaderProgram is a vertex or fragment (pixel) shader.
   *
   * Access type is 'initializeOnly'.
   */
   type: string,
   /**
   * Location and filename of shader.
   *
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** Shape can appear under any grouping node. */
interface ShapeProxy extends X3DShapeNodeProxy
{
   /**
   * Single contained Appearance node that can specify visual attributes (such as material, texture, fillProperties and lineProperties) applied to corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   appearance: X3DAppearanceNodeProxy,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * castShadow defines whether this Shape casts shadows as produced by lighting nodes.
   *
   * Access type is 'inputOutput'.
   */
   castShadow: boolean,
   /**
   * Single contained geometry node that is rendered according to corresponding appearance.
   *
   * Access type is 'inputOutput'.
   */
   geometry: X3DGeometryNodeProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** SignalPdu is a networked Protocol Data Unit (PDU) information node that communicates the transmission of voice, audio or other data modeled in a simulation. */
interface SignalPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'.
   *
   * Access type is 'inputOutput'.
   */
   address: string,
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * Access type is 'inputOutput'.
   */
   applicationID: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Holds audio or digital data conveyed by the radio transmission.
   *
   * Access type is 'inputOutput'.
   */
   data: MFInt32,
   /**
   * number of bits of digital voice audio or digital data being sent in the Signal PDU.
   *
   * Access type is 'inputOutput'.
   */
   dataLength: number,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables the sensor node.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * designates both Encoding Class and Encoding Type.
   *
   * Access type is 'inputOutput'.
   */
   encodingScheme: number,
   /**
   * EntityID unique ID for entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   entityID: number,
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * confirm whether there has been a recent network update.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkReader: boolean,
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkWriter: boolean,
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * Access type is 'outputOnly'.
   */
   readonly isRtpHeaderHeard: boolean,
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * Access type is 'outputOnly'.
   */
   readonly isStandAlone: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Fallback server address if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayHost: string,
   /**
   * Fallback server port if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayPort: number,
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * Access type is 'inputOutput'.
   */
   networkMode: string,
   /**
   * Multicast network port, for example: 3000.
   *
   * Access type is 'inputOutput'.
   */
   port: number,
   /**
   * Identifies a particular radio within a given entity.
   *
   * Access type is 'inputOutput'.
   */
   radioID: number,
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * Access type is 'inputOutput'.
   */
   readInterval: number,
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * Access type is 'inputOutput'.
   */
   rtpHeaderExpected: boolean,
   /**
   * sampleRate gives either (1) sample rate in samples per second if Encoding Class is encoded audio, or (2) data rate in bits per second for data transmissions.
   *
   * Access type is 'inputOutput'.
   */
   sampleRate: number,
   /**
   * Number of samples in the PDU if the Encoding Class is encoded voice, otherwise the field is set to zero.
   *
   * Access type is 'inputOutput'.
   */
   samples: number,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   siteID: number,
   /**
   * Tactical Data Link (TDL) type as an enumerated value when the Encoding Class is voice, raw binary, application-specific, or database index representation of a TDL message.
   *
   * Access type is 'inputOutput'.
   */
   tdlType: number,
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * Access type is 'outputOnly'.
   */
   readonly timestamp: number,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * Access type is 'inputOutput'.
   */
   whichGeometry: number,
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * Access type is 'inputOutput'.
   */
   writeInterval: number,
}

/** SilhouetteEnhancementVolumeStyle specifies that volumetric data is rendered with silhouette enhancement. */
interface SilhouetteEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * amount of the silhouette enhancement to use.
   *
   * Access type is 'inputOutput'.
   */
   silhouetteBoundaryOpacity: number,
   /**
   * scaling of non-silhouette regions.
   *
   * Access type is 'inputOutput'.
   */
   silhouetteRetainedOpacity: number,
   /**
   * power function to control sharpness of the silhouette.
   *
   * Access type is 'inputOutput'.
   */
   silhouetteSharpness: number,
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * Access type is 'inputOutput'.
   */
   surfaceNormals: X3DTexture3DNodeProxy,
}

/** SingleAxisHingeJoint has single axis about which to rotate, similar to a traditional door hinge. Contains two RigidBody nodes (containerField values body1, body2). */
interface SingleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   anchorPoint: SFVec3f,
   /**
   * Access type is 'outputOnly'.
   */
   readonly angle: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly angleRate: number,
   /**
   * axis defines vector of joint connection between body1 and body2.
   *
   * Access type is 'inputOutput'.
   */
   axis: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1AnchorPoint: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2AnchorPoint: SFVec3f,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * maxAngle is maximum rotation angle for hinge.
   *
   * Access type is 'inputOutput'.
   */
   maxAngle: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minAngle is minimum rotation angle for hinge.
   *
   * Access type is 'inputOutput'.
   */
   minAngle: number,
   /**
   * stopBounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stopBounce: number,
   /**
   * stopErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stopErrorCorrection: number,
}

/** SliderJoint constrains all movement between body1 and body2 along a single axis. Contains two RigidBody nodes (containerField values body1, body2). */
interface SliderJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * axis is normalized vector specifying direction of motion.
   *
   * Access type is 'inputOutput'.
   */
   axis: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * maxSeparation is maximum separation distance between the two bodies.
   *
   * Access type is 'inputOutput'.
   */
   maxSeparation: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minSeparation is minimum separation distance between the two bodies.
   *
   * Access type is 'inputOutput'.
   */
   minSeparation: number,
   /**
   * separation indicates final separation distance between the two bodies.
   *
   * Access type is 'outputOnly'.
   */
   readonly separation: number,
   /**
   * separationRate indicates change in separation distance over time between the two bodies.
   *
   * Access type is 'outputOnly'.
   */
   readonly separationRate: number,
   /**
   * sliderForce value is used to apply a force (specified in force base units) along the axis of the slider in equal and opposite directions to the two bodies.
   *
   * Access type is 'inputOutput'.
   */
   sliderForce: number,
   /**
   * stopBounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stopBounce: number,
   /**
   * stopErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stopErrorCorrection: number,
}

/** The Sound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SoundProxy extends X3DSoundNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * direction of sound axis, relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Factor [0,1] adjusting loudness (decibels) of emitted sound.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of sound ellipsoid center, relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Outer (zero loudness)ellipsoid distance along back direction.
   *
   * Access type is 'inputOutput'.
   */
   maxBack: number,
   /**
   * Outer (zero loudness)ellipsoid distance along front direction.
   *
   * Access type is 'inputOutput'.
   */
   maxFront: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Inner (full loudness) ellipsoid distance along back direction.
   *
   * Access type is 'inputOutput'.
   */
   minBack: number,
   /**
   * Inner (full loudness) ellipsoid distance along front direction.
   *
   * Access type is 'inputOutput'.
   */
   minFront: number,
   /**
   * Player hint [0,1] if needed to choose which sounds to play.
   *
   * Access type is 'inputOutput'.
   */
   priority: number,
   /**
   * sound source for the Sound node, either an AudioClip node or a MovieTexture node.
   *
   * Access type is 'inputOutput'.
   */
   source: X3DSoundSourceNodeProxy,
   /**
   * Whether to spatialize sound playback relative to viewer.
   *
   * Access type is 'initializeOnly'.
   */
   spatialize: boolean,
}

/** The SpatialSound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SpatialSoundProxy extends X3DSoundNodeProxy
{
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * coneInnerAngle is centered along direction and defines the inner conical volume, inside of which no source gain reduction occurs.
   *
   * Access type is 'inputOutput'.
   */
   coneInnerAngle: number,
   /**
   * coneOuterAngle is centered along direction and defines an outer conical volume, within which the sound gain decreases linearly from full gain to coneOuterGain.
   *
   * Access type is 'inputOutput'.
   */
   coneOuterAngle: number,
   /**
   * coneOuterGain is minimum gain value found outside coneOuterAngle.
   *
   * Access type is 'inputOutput'.
   */
   coneOuterGain: number,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * direction of sound axis, relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * distanceModel determines how field specifies which algorithm to use for sound attenuation, corresponding to distance between an audio source and a listener, as it moves away from the listener.
   *
   * Access type is 'inputOutput'.
   */
   distanceModel: string,
   /**
   * dopplerEnabled enables/disables whether real-time Doppler effects (due to relation motion between sources and listeners) are computed by browser between virtual sound sources and active listening locations, then applied to received frequency at active listening locations.
   *
   * Access type is 'inputOutput'.
   */
   dopplerEnabled: boolean,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * enableHRTF enables/disables Head Related Transfer Function (HRTF) auralization, if available.
   *
   * Access type is 'inputOutput'.
   */
   enableHRTF: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Factor [0,1] adjusting loudness (decibels) of emitted sound.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of sound ellipsoid center, relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * maxDistance is the maximum distance where sound is renderable between source and listener, after which no reduction in sound volume occurs.
   *
   * Access type is 'inputOutput'.
   */
   maxDistance: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Player hint [0,1] if needed to choose which sounds to play.
   *
   * Access type is 'inputOutput'.
   */
   priority: number,
   /**
   * referenceDistance for reducing volume as source moves further from the listener.
   *
   * Access type is 'inputOutput'.
   */
   referenceDistance: number,
   /**
   * rolloffFactor indicates how quickly volume is reduced as source moves further from listener.
   *
   * Access type is 'inputOutput'.
   */
   rolloffFactor: number,
   /**
   * Whether to spatialize sound playback relative to viewer.
   *
   * Access type is 'initializeOnly'.
   */
   spatialize: boolean,
}

/** Sphere is a geometry node, representing a perfectly round geometrical object that is the surface of a completely round ball. */
interface SphereProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Size in meters.
   *
   * Access type is 'initializeOnly'.
   */
   radius: number,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
}

/** SphereSensor converts pointing device motion into a spherical rotation about the origin of the local coordinate system. */
interface SphereSensorProxy extends X3DDragSensorNodeProxy
{
   /**
   * Determines whether previous offset values are remembered/accumulated.
   *
   * Access type is 'inputOutput'.
   */
   autoOffset: boolean,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Sends event and remembers last value sensed.
   *
   * Access type is 'inputOutput'.
   */
   offset: SFRotation,
   /**
   * rotation_changed events equal sum of relative bearing changes plus offset value.
   *
   * Access type is 'outputOnly'.
   */
   readonly rotation_changed: SFRotation,
   /**
   * trackPoint_changed events give intersection point of bearing with sensor's virtual geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly trackPoint_changed: SFVec3f,
}

/** SplinePositionInterpolator performs non-linear interpolation among paired lists of 3-tuple values and velocities to produce an SFVec3f value_changed output event. */
interface SplinePositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * Access type is 'inputOutput'.
   */
   closed: boolean,
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec3f,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyVelocity: MFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * Access type is 'inputOutput'.
   */
   normalizeVelocity: boolean,
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec3f,
}

/** SplinePositionInterpolator2D performs non-linear interpolation among paired lists of 2-tuple values and velocities to produce an SFVec2f value_changed output event. */
interface SplinePositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * Access type is 'inputOutput'.
   */
   closed: boolean,
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFVec2f,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyVelocity: MFVec2f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * Access type is 'inputOutput'.
   */
   normalizeVelocity: boolean,
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFVec2f,
}

/** SplineScalarInterpolator performs non-linear interpolation among paired lists of float values and velocities to produce an SFFloat value_changed output event. */
interface SplineScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Whether or not the curve is closed (i.
   *
   * Access type is 'inputOutput'.
   */
   closed: boolean,
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFFloat,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyVelocity: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * Access type is 'inputOutput'.
   */
   normalizeVelocity: boolean,
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: number,
}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface SpotLightProxy extends X3DLightNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.
   *
   * Access type is 'inputOutput'.
   */
   attenuation: SFVec3f,
   /**
   * Inner conical solid angle (in radians) where light source has uniform full intensity.
   *
   * Access type is 'inputOutput'.
   */
   beamWidth: number,
   /**
   * color of light, applied to colors of objects.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Outer conical solid angle (in radians) where light source intensity becomes zero.
   *
   * Access type is 'inputOutput'.
   */
   cutOffAngle: number,
   /**
   * Orientation vector of light relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Global lights illuminate all objects within their volume of lighting influence.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Brightness of direct emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of light relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables this light source.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Maximum effective distance of light relative to local light position, affected by ancestor scaling.
   *
   * Access type is 'inputOutput'.
   */
   radius: number,
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
}

/** SquadOrientationInterpolator performs non-linear interpolation among paired lists of rotation values to produce an SFRotation value_changed output event. */
interface SquadOrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{
   /**
   * Definition parameters for nonlinear-interpolation function time intervals, listed in non-decreasing order and corresponding to keyValue, keyVelocity array values.
   *
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Output values for nonlinear interpolation, each corresponding to an input-fraction value in the key array.
   *
   * Access type is 'inputOutput'.
   */
   keyValue: MFRotation,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalizeVelocity field specifies whether the velocity vectors are normalized to produce smooth speed transitions, or transformed into tangency vectors.
   *
   * Access type is 'inputOutput'.
   */
   normalizeVelocity: boolean,
   /**
   * set_fraction selects input key for corresponding use of keyValue, keyVelocity values for output computation.
   *
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
   /**
   * Nonlinearly interpolated output value computed by using current time fraction along with corresponding key, keyValue and keyVelocity values.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: SFRotation,
}

/** StaticGroup is similar to Group node but does not allow access to children after creation time. */
interface StaticGroupProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'initializeOnly'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** StreamAudioDestination node represents the final audio destination via a media stream. */
interface StreamAudioDestinationProxy extends X3DSoundDestinationNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * mediaDeviceID field provides ID parameter functionality.
   *
   * Access type is 'inputOutput'.
   */
   mediaDeviceID: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Stream identification TBD Hint: W3C Media Capture and Streams https://www.
   *
   * Access type is 'inputOutput'.
   */
   streamIdentifier: string,
}

/** StreamAudioSource operates as an audio source whose media is received from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs. */
interface StreamAudioSourceProxy extends X3DSoundSourceNodeProxy
{
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Stream identification TBD Hint: W3C Media Capture and Streams https://www.
   *
   * Access type is 'inputOutput'.
   */
   streamIdentifier: string,
}

/** StringSensor generates events as the user presses keys on the keyboard. */
interface StringSensorProxy extends X3DKeyDeviceSensorNodeProxy
{
   /**
   * If deletionAllowed is true, then previously entered character in enteredText can be removed.
   *
   * Access type is 'inputOutput'.
   */
   deletionAllowed: boolean,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Events generated as character-producing keys are pressed on keyboard.
   *
   * Access type is 'outputOnly'.
   */
   readonly enteredText: string,
   /**
   * Events generated when sequence of keystrokes matches keys in terminationText string when this condition occurs, enteredText is moved to finalText and enteredText is set to empty string.
   *
   * Access type is 'outputOnly'.
   */
   readonly finalText: string,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** SurfaceEmitter generates particles from the surface of an object. */
interface SurfaceEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * The geometry node provides geometry used as the emitting surface.
   *
   * Access type is 'initializeOnly'.
   */
   surface: X3DGeometryNodeProxy,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** Switch is a Grouping node that only renders one (or zero) child at a time. */
interface SwitchProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Index of active child choice, counting from 0.
   *
   * Access type is 'inputOutput'.
   */
   whichChoice: number,
}

/** TexCoordChaser2D generates a series of single floating-point values that progressively change from initial value to destination value. */
interface TexCoordChaser2DProxy extends X3DChaserNodeProxy
{
   /**
   * duration is the time interval for filter response in seconds.
   *
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: MFVec2f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: MFVec2f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: MFVec2f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: MFVec2f,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec2f,
}

/** TexCoordDamper2D generates a series of 2D floating-point arrays that progressively change from initial value to destination value. */
interface TexCoordDamper2DProxy extends X3DDamperNodeProxy
{
   /**
   * Initial destination value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialDestination: MFVec2f,
   /**
   * Initial starting value for this node.
   *
   * Access type is 'initializeOnly'.
   */
   initialValue: MFVec2f,
   /**
   * isActive true/false events are sent when follower-node computation starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * order defines the number of internal filters (larger means smoother response, longer delay).
   *
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * set_destination resets destination value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_destination: MFVec2f,
   /**
   * set_value resets current value of this node.
   *
   * Access type is 'inputOnly'.
   */
   set_value: MFVec2f,
   /**
   * tau is the exponential-decay time constant for filter response in seconds.
   *
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * or -1.
   *
   * Access type is 'inputOutput'.
   */
   tolerance: number,
   /**
   * Computed output value that approaches within tolerance of destination value, as determined by elapsed time, order and tau.
   *
   * Access type is 'outputOnly'.
   */
   readonly value_changed: MFVec2f,
}

/** Text is a 2D (flat) geometry node that can contain multiple lines of string values. */
interface TextProxy extends X3DGeometryNodeProxy
{
   /**
   * The fontStyle field can contain a FontStyle or ScreenFontStyle node defining size, family, and style for presented text.
   *
   * Access type is 'inputOutput'.
   */
   fontStyle: X3DFontStyleNodeProxy,
   /**
   * Array of length values for each text string in the local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   length: MFFloat,
   /**
   * Array of 2D bounding box values for each line of text in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly lineBounds: MFVec2f,
   /**
   * Limits/compresses all text strings if max string length is longer than maxExtent, as measured in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   maxExtent: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * origin of the text local coordinate system, in units of the coordinate system in which the Text node is embedded.
   *
   * Access type is 'outputOnly'.
   */
   readonly origin: SFVec3f,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single or multiple string values to present as Text.
   *
   * Access type is 'inputOutput'.
   */
   string: MFString,
   /**
   * 2D bounding box value for all lines of text in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly textBounds: SFVec2f,
}

/** TextureBackground simulates ground and sky, using vertical arrays of wraparound color values, TextureBackground can also provide backdrop texture images on all six sides. */
interface TextureBackgroundProxy extends X3DBackgroundNodeProxy
{
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   backTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * event sent when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   bottomTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   frontTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * The angle array values increase from 0.
   *
   * Access type is 'inputOutput'.
   */
   groundAngle: MFFloat,
   /**
   * Color of the ground at the various angles on the ground partial sphere.
   *
   * Access type is 'inputOutput'.
   */
   groundColor: MFColor,
   /**
   * event true sent when node becomes active, event false sent when unbound by another node.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   leftTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   rightTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * The angle array values increase from 0.
   *
   * Access type is 'inputOutput'.
   */
   skyAngle: MFFloat,
   /**
   * Color of the sky at various angles on the sky sphere.
   *
   * Access type is 'inputOutput'.
   */
   skyColor: MFColor,
   /**
   * Parent TextureBackground element can contain up to six image nodes (ImageTexture PixelTexture MovieTexture MultiTexture).
   *
   * Access type is 'inputOutput'.
   */
   topTexture: X3DTexture2DNodeProxy | MultiTextureProxy,
   /**
   * transparency applied to texture images, enabling an X3D scene to overlay an HTML page or desktop.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** TextureCoordinate specifies 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * pairs of 2D (s,t) texture coordinates, either in range [0,1] or higher if repeating.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec2f,
}

/** TextureCoordinate3D specifies a set of 3D texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate3DProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * triplets of 3D (s,t,r) texture coordinates, either in range [0,1] or higher if repeating.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec3f,
}

/** TextureCoordinate4D specifies a set of 4D (homogeneous 3D) texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate4DProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * 4-tuple values of 4D texture coordinates, either in range [0,1] or higher if repeating.
   *
   * Access type is 'inputOutput'.
   */
   point: MFVec4f,
}

/** TextureCoordinateGenerator computes 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateGeneratorProxy extends X3DSingleTextureCoordinateNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * parameter field defines the algorithm used to compute texture coordinates.
   *
   * Access type is 'inputOutput'.
   */
   mode: string,
   /**
   * parameter array contains scale and translation (x y z) values for Perlin NOISE mode, parameter[0] contains index of refraction for SPHERE-REFLECT mode, parameter[0] contains index of refraction and parameter[1 to 3] contains the eye point in local coordinates for SPHERE-REFLECT-LOCAL mode.
   *
   * Access type is 'inputOutput'.
   */
   parameter: MFFloat,
}

/** TextureProjector is similar to a light that projects a texture into the scene, illuminating geometry that intersects the perspective projection volume. */
interface TextureProjectorProxy extends X3DTextureProjectorNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * aspectRatio is the ratio of width and height that is projected.
   *
   * Access type is 'outputOnly'.
   */
   readonly aspectRatio: number,
   /**
   * color of light, applied to colors of objects.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Direction for projection.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * maximum distance necessary for texture display.
   *
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Preferred minimum viewing angle for this projection in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * Access type is 'inputOutput'.
   */
   fieldOfView: number,
   /**
   * Global texture projection illuminates all objects within their volume of influence.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Brightness of direct emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of center of texture projection relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minimum distance necessary for texture display.
   *
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Enables/disables this texture projection source.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * Access type is 'inputOutput'.
   */
   texture: X3DTexture2DNodeProxy,
   /**
   * upVector describes the roll of the camera by saying which direction is up for the camera's orientation.
   *
   * Access type is 'inputOutput'.
   */
   upVector: SFVec3f,
}

/** TextureProjectorParallel is similar to a light that projects a texture into the scene, illuminating geometry that intersects the parallel projection volume. */
interface TextureProjectorParallelProxy extends X3DTextureProjectorNodeProxy
{
   /**
   * Brightness of ambient (nondirectional background) emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * aspectRatio is the ratio of width and height that is projected.
   *
   * Access type is 'outputOnly'.
   */
   readonly aspectRatio: number,
   /**
   * color of light, applied to colors of objects.
   *
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Direction for projection.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * maximum distance necessary for texture display.
   *
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Minimum and maximum extents of projection texture in units of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   fieldOfView: SFVec4f,
   /**
   * Global texture projection illuminates all objects within their volume of influence.
   *
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Brightness of direct emission from the light.
   *
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Position of center of texture projection relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minimum distance necessary for texture display.
   *
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Enables/disables this texture projection source.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * shadowIntensity field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).
   *
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * shadows field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.
   *
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
   /**
   * Single contained texture node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.
   *
   * Access type is 'inputOutput'.
   */
   texture: X3DTexture2DNodeProxy,
}

/** TextureProperties allows precise fine-grained control over application of image textures to geometry. */
interface TexturePropertiesProxy extends X3DNodeProxy
{
   /**
   * anisotropicDegree defines minimum degree of anisotropy to account for in texture filtering (1=no effect for symmetric filtering, otherwise provide higher value).
   *
   * Access type is 'inputOutput'.
   */
   anisotropicDegree: number,
   /**
   * borderColor defines border pixel color.
   *
   * Access type is 'inputOutput'.
   */
   borderColor: SFColorRGBA,
   /**
   * borderWidth number of pixels for texture border.
   *
   * Access type is 'inputOutput'.
   */
   borderWidth: number,
   /**
   * boundaryModeR describes handling of texture-coordinate boundaries.
   *
   * Access type is 'inputOutput'.
   */
   boundaryModeR: string,
   /**
   * boundaryModeS describes handling of texture-coordinate boundaries.
   *
   * Access type is 'inputOutput'.
   */
   boundaryModeS: string,
   /**
   * boundaryModeT describes handling of texture-coordinate boundaries.
   *
   * Access type is 'inputOutput'.
   */
   boundaryModeT: string,
   /**
   * Determines whether MIPMAPs are generated for texture images.
   *
   * Access type is 'initializeOnly'.
   */
   generateMipMaps: boolean,
   /**
   * magnificationFilter indicates texture filter when image is smaller than screen space representation.
   *
   * Access type is 'inputOutput'.
   */
   magnificationFilter: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * minificationFilter indicates texture filter when image is larger than screen space representation.
   *
   * Access type is 'inputOutput'.
   */
   minificationFilter: string,
   /**
   * textureCompression indicates compression algorithm selection mode.
   *
   * Access type is 'inputOutput'.
   */
   textureCompression: string,
   /**
   * texturePriority defines relative priority for this texture when allocating texture memory, an important rendering resource in graphics-card hardware.
   *
   * Access type is 'inputOutput'.
   */
   texturePriority: number,
}

/** TextureTransform shifts 2D texture coordinates for positioning, orienting and scaling image textures on geometry. */
interface TextureTransformProxy extends X3DTextureTransformNodeProxy
{
   /**
   * center point in 2D (s,t) texture coordinates for rotation and scaling.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec2f,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * single rotation angle of texture about center (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   rotation: number,
   /**
   * Non-uniform planar scaling of texture about center (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec2f,
   /**
   * Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec2f,
}

/** TextureTransform3D applies a 3D transformation to texture coordinates. */
interface TextureTransform3DProxy extends X3DTextureTransformNodeProxy
{
   /**
   * center point in 2D (s,t) texture coordinates for rotation and scaling.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * rotation angle of texture about center (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform planar scaling of texture about center (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
}

/** TextureTransformMatrix3D applies a 3D transformation to texture coordinates. */
interface TextureTransformMatrix3DProxy extends X3DTextureTransformNodeProxy
{
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * matrix is a generalized, unfiltered 4x4 transformation matrix to modify texture (opposite effect appears on geometry).
   *
   * Access type is 'inputOutput'.
   */
   matrix: SFMatrix4f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** TimeSensor continuously generates events as time passes. */
interface TimeSensorProxy extends X3DTimeDependentNodeProxy, X3DSensorNodeProxy
{
   /**
   * cycleInterval is loop duration in seconds.
   *
   * Access type is 'inputOutput'.
   */
   cycleInterval: number,
   /**
   * cycleTime sends a time outputOnly at startTime, and also at the beginning of each new cycle (useful for synchronization with other time-based objects).
   *
   * Access type is 'outputOnly'.
   */
   readonly cycleTime: number,
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since TimeSensor activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * fraction_changed continuously sends value in range [0,1] showing time progress in the current cycle.
   *
   * Access type is 'outputOnly'.
   */
   readonly fraction_changed: number,
   /**
   * isActive true/false events are sent when TimeSensor starts/stops running.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when TimeSensor is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Repeat indefinitely when loop=true, repeat only once when loop=false.
   *
   * Access type is 'inputOutput'.
   */
   loop: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * When time now >= pauseTime, isPaused becomes true and TimeSensor becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and TimeSensor becomes inactive.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * When time now >= startTime, isActive becomes true and TimeSensor becomes active.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * When stopTime becomes <= time now, isActive becomes false and TimeSensor becomes inactive.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Time continuously sends the absolute time (value 0.
   *
   * Access type is 'outputOnly'.
   */
   readonly time: number,
}

/** TimeTrigger converts boolean true events to time events. */
interface TimeTriggerProxy extends X3DTriggerNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * If input event set_boolean is true, send output triggerTime event.
   *
   * Access type is 'inputOnly'.
   */
   set_boolean: boolean,
   /**
   * triggerTime is output time event, sent when input event set_boolean is true.
   *
   * Access type is 'outputOnly'.
   */
   readonly triggerTime: number,
}

/** ToneMappedVolumeStyle specifies that volumetric data is rendered with Gooch shading model of two-toned warm/cool coloring. */
interface ToneMappedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{
   /**
   * coolColor is used for surfaces facing away from the light direction.
   *
   * Access type is 'inputOutput'.
   */
   coolColor: SFColorRGBA,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The surfaceNormals field contains a 3D texture with at least three component values.
   *
   * Access type is 'inputOutput'.
   */
   surfaceNormals: X3DTexture3DNodeProxy,
   /**
   * warmColor is used for surfaces facing towards the light.
   *
   * Access type is 'inputOutput'.
   */
   warmColor: SFColorRGBA,
}

/** TouchSensor tracks location and state of the pointing device, detecting when a user points at or selects (activates) geometry. */
interface TouchSensorProxy extends X3DTouchSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of this node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * When pointing device selects geometry, send event containing surface normal vector at the hitPoint.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitNormal_changed: SFVec3f,
   /**
   * When pointing device selects geometry, send event containing 3D point on surface of underlying geometry, as measured in reference frame for TouchSensor's local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitPoint_changed: SFVec3f,
   /**
   * When pointing device selects geometry, send event containing texture coordinates of surface at the hitPoint.
   *
   * Access type is 'outputOnly'.
   */
   readonly hitTexCoord_changed: SFVec2f,
   /**
   * Select geometry by activating the pointing device (for example, clicking the mouse) to generate isActive events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Hover over geometry by aiming the mouse (or pointing device) to generate isOver events.
   *
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Time event generated when sensor is touched by pointing device, and then deselected by the user.
   *
   * Access type is 'outputOnly'.
   */
   readonly touchTime: number,
}

/** Transform is a Grouping node that can contain most nodes. */
interface TransformProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Translation offset from origin of local coordinate system, applied prior to rotation or scaling.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Orientation (axis, angle in radians) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.
   *
   * Access type is 'inputOutput'.
   */
   scale: SFVec3f,
   /**
   * Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).
   *
   * Access type is 'inputOutput'.
   */
   scaleOrientation: SFRotation,
   /**
   * Position (x, y, z in meters) of children relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** TransformSensor generates output events when its targetObject enters, exits, and moves within a region in space (defined by a box). */
interface TransformSensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Translation offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Time event generated when targetObject enters the box region for sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly enterTime: number,
   /**
   * Time event generated when targetObject exits the box region for sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly exitTime: number,
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Sends rotation event relative to center whenever the target object is contained within the box region and results change.
   *
   * Access type is 'outputOnly'.
   */
   readonly orientation_changed: SFRotation,
   /**
   * Sends translation event relative to center whenever the target object is contained within the box region and results change.
   *
   * Access type is 'outputOnly'.
   */
   readonly position_changed: SFVec3f,
   /**
   * size of transformation-traccking box around center location, oriented within local transformation frame.
   *
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
   /**
   * targetObject is the movable geometry represented by any valid X3DGroupingNode or X3DShapeNode which may enter or exit the box.
   *
   * Access type is 'inputOutput'.
   */
   targetObject: X3DGroupingNodeProxy | X3DShapeNodeProxy,
}

/** TransmitterPdu is a networked Protocol Data Unit (PDU) information node that provides detailed information about a radio transmitter modeled in a simulation. */
interface TransmitterPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Multicast network address, or else 'localhost'.
   *
   * Access type is 'inputOutput'.
   */
   address: string,
   /**
   * World coordinates for antenna location.
   *
   * Access type is 'inputOutput'.
   */
   antennaLocation: SFVec3f,
   /**
   * .
   *
   * Access type is 'inputOutput'.
   */
   antennaPatternLength: number,
   /**
   * Antenna shape pattern: 0 for omnidirectional, 1 for beam, 2 for spherical harmonic (deprecated), or optional higher value.
   *
   * Access type is 'inputOutput'.
   */
   antennaPatternType: number,
   /**
   * Each simulation application that can respond to simulation management PDUs needs to have a unique applicationID.
   *
   * Access type is 'inputOutput'.
   */
   applicationID: number,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Nonzero value corresponding to the simulated cryptographic key.
   *
   * Access type is 'inputOutput'.
   */
   cryptoKeyID: number,
   /**
   * Indicates type of crypto system being used, even if the encryption equipment is not keyed.
   *
   * Access type is 'inputOutput'.
   */
   cryptoSystem: number,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables the sensor node.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * EntityID unique ID for entity within that application.
   *
   * Access type is 'inputOutput'.
   */
   entityID: number,
   /**
   * Transmission frequency in Hz.
   *
   * Access type is 'inputOutput'.
   */
   frequency: number,
   /**
   * Geographic location (specified in current geoSystem coordinates) for children geometry (specified in relative coordinate system, in meters).
   *
   * Access type is 'inputOutput'.
   */
   geoCoords: SFVec3d,
   /**
   * Identifies spatial reference frame: Geodetic (GD), Geocentric (GC), Universal Transverse Mercator (UTM).
   *
   * Access type is 'initializeOnly'.
   */
   geoSystem: MFString,
   /**
   * Source of transmission input.
   *
   * Access type is 'inputOutput'.
   */
   inputSource: number,
   /**
   * confirm whether there has been a recent network update.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Whether networkMode='remote' (listen to network as copy of remote entity).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkReader: boolean,
   /**
   * Whether networkMode='master' (output to network as master entity at writeInterval).
   *
   * Access type is 'outputOnly'.
   */
   readonly isNetworkWriter: boolean,
   /**
   * Whether incoming DIS packets have an RTP header prepended.
   *
   * Access type is 'outputOnly'.
   */
   readonly isRtpHeaderHeard: boolean,
   /**
   * Whether networkMode='local' (ignore network but still respond to local events).
   *
   * Access type is 'outputOnly'.
   */
   readonly isStandAlone: boolean,
   /**
   * .
   *
   * Access type is 'inputOutput'.
   */
   lengthOfModulationParameters: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Integer enumeration containing detailed information depending on the major modulation type.
   *
   * Access type is 'inputOutput'.
   */
   modulationTypeDetail: number,
   /**
   * Integer enumeration containing major classification of the modulation type.
   *
   * Access type is 'inputOutput'.
   */
   modulationTypeMajor: number,
   /**
   * Indicates the spread spectrum technique or combination of spread spectrum techniques in use.
   *
   * Access type is 'inputOutput'.
   */
   modulationTypeSpreadSpectrum: number,
   /**
   * Specifies radio system associated with this Transmitter PDU and used to interpret other fields whose values depend on a specific radio system.
   *
   * Access type is 'inputOutput'.
   */
   modulationTypeSystem: number,
   /**
   * Fallback server address if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayHost: string,
   /**
   * Fallback server port if multicast not available locally.
   *
   * Access type is 'inputOutput'.
   */
   multicastRelayPort: number,
   /**
   * Whether this entity is ignoring the network, sending DIS packets to the network, or receiving DIS packets from the network.
   *
   * Access type is 'inputOutput'.
   */
   networkMode: string,
   /**
   * Multicast network port, for example: 3000.
   *
   * Access type is 'inputOutput'.
   */
   port: number,
   /**
   * Power that radio would be capable of outputting if on and transmitting, independent of actual transmit state of the radio.
   *
   * Access type is 'inputOutput'.
   */
   power: number,
   /**
   * Integer enumeration containing EntityType of transmitter radio.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeCategory: number,
   /**
   * Integer enumerations value for country to which the design of the entity or its design specification is attributed.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeCountry: number,
   /**
   * Integer enumerations value for domain in which the entity operates: LAND, AIR, SURFACE, SUBSURFACE, SPACE or OTHER.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeDomain: number,
   /**
   * Integer enumerations value for whether entity is a PLATFORM, MUNITION, LIFE_FORM, ENVIRONMENTAL, CULTURAL_FEATURE, SUPPLY, RADIO, EXPENDABLE, SENSOR_EMITTER or OTHER.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeKind: number,
   /**
   * Integer enumerations value indicating nomenclature (name) for a particular emitter.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeNomenclature: number,
   /**
   * Named equipment version number.
   *
   * Access type is 'inputOutput'.
   */
   radioEntityTypeNomenclatureVersion: number,
   /**
   * Identifies a particular radio within a given entity.
   *
   * Access type is 'inputOutput'.
   */
   radioID: number,
   /**
   * Seconds between read updates, 0 means no reading.
   *
   * Access type is 'inputOutput'.
   */
   readInterval: number,
   /**
   * Relative coordinates for antenna location.
   *
   * Access type is 'inputOutput'.
   */
   relativeAntennaLocation: SFVec3f,
   /**
   * Whether RTP headers are prepended to DIS PDUs.
   *
   * Access type is 'inputOutput'.
   */
   rtpHeaderExpected: boolean,
   /**
   * Simulation/exercise siteID of the participating LAN or organization.
   *
   * Access type is 'inputOutput'.
   */
   siteID: number,
   /**
   * DIS timestamp in X3D units (value 0.
   *
   * Access type is 'outputOnly'.
   */
   readonly timestamp: number,
   /**
   * Bandwidth of the particular transmitter measured between the half-power (-3 dB) points (this value represents total bandwidth, not the deviation from the center frequency).
   *
   * Access type is 'inputOutput'.
   */
   transmitFrequencyBandwidth: number,
   /**
   * Specify radio transmission state where enumerations value 0 is for off, value 1 for powered but not transmitting, or value 1 is for powered and transmitting,.
   *
   * Access type is 'inputOutput'.
   */
   transmitState: number,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Select geometry to render: -1 for no geometry, 0 for text trace, 1 for default geometry, (optional) higher values to render different states.
   *
   * Access type is 'inputOutput'.
   */
   whichGeometry: number,
   /**
   * Seconds between write updates, 0 means no writing (sending).
   *
   * Access type is 'inputOutput'.
   */
   writeInterval: number,
}

/** TriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * fanCount array provides number of vertices in each fan.
   *
   * Access type is 'inputOutput'.
   */
   fanCount: MFInt32,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** TriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** TriangleSet2D is a geometry node that defines a set of filled 2D triangles in X-Y plane. */
interface TriangleSet2DProxy extends X3DGeometryNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * 2D coordinates of TriangleSet2D vertices.
   *
   * Access type is 'inputOutput'.
   */
   vertices: MFVec2f,
}

/** TriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{
   /**
   * Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.
   *
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * ccw defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).
   *
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.
   *
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Whether Color|ColorRGBA values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.
   *
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Whether Normal node vector values are applied to each point vertex (true) or to each polygon face (false).
   *
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).
   *
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * stripCount array provides number of vertices in each strip.
   *
   * Access type is 'inputOutput'.
   */
   stripCount: MFInt32,
   /**
   * Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.
   *
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** TwoSidedMaterial specifies surface rendering properties for associated geometry nodes, for outer (front) and inner (back) sides of polygons. */
interface TwoSidedMaterialProxy extends X3DMaterialNodeProxy
{
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * how much ambient omnidirectional light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   backAmbientIntensity: number,
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   backDiffuseColor: SFColor,
   /**
   * how much glowing light is emitted from this object.
   *
   * Access type is 'inputOutput'.
   */
   backEmissiveColor: SFColor,
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * Access type is 'inputOutput'.
   */
   backShininess: number,
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * Access type is 'inputOutput'.
   */
   backSpecularColor: SFColor,
   /**
   * how "clear" an object is: 1.
   *
   * Access type is 'inputOutput'.
   */
   backTransparency: number,
   /**
   * how much direct, angle-dependent light is reflected from all light sources.
   *
   * Access type is 'inputOutput'.
   */
   diffuseColor: SFColor,
   /**
   * how much glowing light is emitted from this object.
   *
   * Access type is 'inputOutput'.
   */
   emissiveColor: SFColor,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * separateBackColor determines whether separate Material values are used for back faces.
   *
   * Access type is 'inputOutput'.
   */
   separateBackColor: boolean,
   /**
   * Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights.
   *
   * Access type is 'inputOutput'.
   */
   shininess: number,
   /**
   * specular highlights are brightness reflections (example: shiny spots on an apple).
   *
   * Access type is 'inputOutput'.
   */
   specularColor: SFColor,
   /**
   * how "clear" an object is: 1.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** UniversalJoint is like a BallJoint that constrains an extra degree of rotational freedom. */
interface UniversalJointProxy extends X3DRigidJointNodeProxy
{
   /**
   * anchorPoint is joint center, specified in world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   anchorPoint: SFVec3f,
   /**
   * axis1 defines axis vector of joint connection to body1.
   *
   * Access type is 'inputOutput'.
   */
   axis1: SFVec3f,
   /**
   * axis2 defines axis vector of joint connection to body2.
   *
   * Access type is 'inputOutput'.
   */
   axis2: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * body1AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1AnchorPoint: SFVec3f,
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * Access type is 'outputOnly'.
   */
   readonly body1Axis: SFVec3f,
   /**
   * The body1 and body2 fields indicate the two RigidBody nodes connected by this joint.
   *
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * body2AnchorPoint describes anchorPoint position relative to local coordinate reference frame.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2AnchorPoint: SFVec3f,
   /**
   * body1Axis describes report the current location of the anchor point relative to the corresponding body.
   *
   * Access type is 'outputOnly'.
   */
   readonly body2Axis: SFVec3f,
   /**
   * forceOutput controls which output fields are generated for the next frame.
   *
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * stop1Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1Bounce: number,
   /**
   * stop1ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop1ErrorCorrection: number,
   /**
   * stop2Bounce is velocity factor for bounce back once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop2Bounce: number,
   /**
   * stop2ErrorCorrection is fraction of error correction performed during time step once stop point is reached.
   *
   * Access type is 'inputOutput'.
   */
   stop2ErrorCorrection: number,
}

/** UnlitMaterial specifies surface rendering properties for associated geometry nodes. */
interface UnlitMaterialProxy extends X3DOneSidedMaterialNodeProxy
{
   /**
   * how much glowing light is emitted from this object.
   *
   * Access type is 'inputOutput'.
   */
   emissiveColor: SFColor,
   /**
   * When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   emissiveTextureMapping: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.
   *
   * Access type is 'inputOutput'.
   */
   normalScale: number,
   /**
   * When applying normalScale for this material node, the contained texture modulates the texture across the surface.
   *
   * Access type is 'inputOutput'.
   */
   normalTexture: X3DSingleTextureNodeProxy,
   /**
   * The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.
   *
   * Access type is 'inputOutput'.
   */
   normalTextureMapping: string,
   /**
   * how "clear" an object is: 1.
   *
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** Viewpoint provides a specific location and direction where the user may view the scene. */
interface ViewpointProxy extends X3DViewpointNodeProxy
{
   /**
   * Event sent reporting timestamp when node becomes active/inactive.
   *
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * centerOfRotation specifies center point about which to rotate user's eyepoint when in EXAMINE or LOOKAT mode.
   *
   * Access type is 'inputOutput'.
   */
   centerOfRotation: SFVec3f,
   /**
   * Text description or navigation hint to describe the significance of this model Viewpoint.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * farDistance defines maximum clipping plane distance allowed for object display.
   *
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Preferred minimum viewing angle from this viewpoint in radians, providing minimum height or minimum width (whichever is smaller).
   *
   * Access type is 'inputOutput'.
   */
   fieldOfView: number,
   /**
   * Output event true gets sent when node becomes bound and activated, otherwise output event false gets sent when node becomes unbound and deactivated.
   *
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Transition instantly by jumping, otherwise smoothly adjust offsets in place when changing to this Viewpoint.
   *
   * Access type is 'inputOutput'.
   */
   jump: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The navigationInfo field defines a dedicated NavigationInfo node for this X3DViewpointNode.
   *
   * Access type is 'inputOutput'.
   */
   navigationInfo: NavigationInfoProxy,
   /**
   * nearDistance defines minimum clipping plane distance necessary for object display.
   *
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Rotation (axis, angle in radians) of Viewpoint, relative to default -Z axis direction in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * position (x, y, z in meters) relative to local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   position: SFVec3f,
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * Access type is 'inputOutput'.
   */
   retainUserOffsets: boolean,
   /**
   * Sending event set_bind=true makes this node active.
   *
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Viewpoint is automatically adjusted to view all visible geometry.
   *
   * Access type is 'inputOutput'.
   */
   viewAll: boolean,
}

/** ViewpointGroup can contain Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes for better user-navigation support with a shared description on the viewpoint list. */
interface ViewpointGroupProxy extends X3DChildNodeProxy
{
   /**
   * center specifies center point of proximity box within which ViewpointGroup is usable and displayed on viewpoint list.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * ViewpointGroup contains Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes that each have containerField='children' default value.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DViewpointNodeProxy | ViewpointGroupProxy>,
   /**
   * Text description or navigation hint to identify this ViewpointGroup.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * displayed determines whether this ViewpointGroup is displayed in the current viewpoint list.
   *
   * Access type is 'inputOutput'.
   */
   displayed: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Retain (true) or reset to zero (false) any prior user navigation offsets from defined viewpoint position, orientation.
   *
   * Access type is 'inputOutput'.
   */
   retainUserOffsets: boolean,
   /**
   * size of Proximity box around center location, oriented within local transformation frame, within which ViewpointGroup is usable and displayed on viewpoint list.
   *
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
}

/** Viewport is a Grouping node that can contain most nodes. */
interface ViewportProxy extends X3DViewportNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Grouping nodes contain an ordered list of children nodes.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * clipBoundary is specified in fractions of the normal render surface in the sequence left/right/bottom/top.
   *
   * Access type is 'inputOutput'.
   */
   clipBoundary: MFFloat,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** VisibilitySensor detects when user can see a specific object or region as they navigate the world. */
interface VisibilitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{
   /**
   * Translation offset from origin of local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   center: SFVec3f,
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Time event generated when user's camera enters visibility region for sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly enterTime: number,
   /**
   * Time event generated when user's camera exits visibility region for sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly exitTime: number,
   /**
   * isActive true/false events are sent when triggering the sensor.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * size of visibility box around center location, oriented within local transformation frame.
   *
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
}

/** VolumeData displays a simple non-segmented voxel dataset with a single RenderStyle node. */
interface VolumeDataProxy extends X3DVolumeDataNodeProxy
{
   /**
   * Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.
   *
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Whether to display bounding box for associated geometry, aligned with world coordinates.
   *
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost.
   *
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Actual-size X-Y-Z dimensions of volume data in local coordinate system.
   *
   * Access type is 'inputOutput'.
   */
   dimensions: SFVec3f,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Single contained X3DVolumeRenderStyleNode node that defines specific rendering technique for this volumetric object.
   *
   * Access type is 'inputOutput'.
   */
   renderStyle: X3DVolumeRenderStyleNodeProxy,
   /**
   * Whether or not renderable content within this node is visually displayed.
   *
   * Access type is 'inputOutput'.
   */
   visible: boolean,
   /**
   * Single contained X3DTexture3DNode (ComposedTexture3D, ImageTexture3D, PixelTexture3D) that provides raw voxel information utilized by corresponding rendering styles.
   *
   * Access type is 'inputOutput'.
   */
   voxels: X3DTexture3DNodeProxy,
}

/** VolumeEmitter emits particles from a random position confined within the given closed geometry volume. */
interface VolumeEmitterProxy extends X3DParticleEmitterNodeProxy
{
   /**
   * Coordinates for the geometry used as the emitting volume.
   *
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * coordIndex indices are applied to contained Coordinate values in order to define randomly generated initial geometry of the particles.
   *
   * Access type is 'initializeOnly'.
   */
   coordIndex: MFInt32,
   /**
   * Initial direction from which particles emanate.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * TODO, X3D specification is undefined.
   *
   * Access type is 'initializeOnly'.
   */
   internal: boolean,
   /**
   * Basic mass of each particle, defined in mass base units (default is kilograms).
   *
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Enables/disables production of particles from this emitter node.
   *
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   set_coordIndex: MFInt32,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Particle surface area in area base units (default is meters squared).
   *
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Multiplier for the randomness used to control the range of possible output values.
   *
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** VolumePickSensor tests picking intersections using the pickingGeometry against the pickTarget geometry volume. */
interface VolumePickSensorProxy extends X3DPickSensorNodeProxy
{
   /**
   * Author-provided prose that describes intended purpose of the node.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * intersectionType specifies precision of the collision computation.
   *
   * Access type is 'initializeOnly'.
   */
   intersectionType: string,
   /**
   * isActive indicates when the intersecting object is picked by the picking geometry.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * defines whether the intersection test (i.
   *
   * Access type is 'inputOutput'.
   */
   matchCriterion: string,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The objectType field specifies a set of labels used in the picking process.
   *
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Output event containing the node or nodes that have been found to intersect with the picking geometry from the last time this node performed a picking operation, given in the local coordinate system.
   *
   * Access type is 'outputOnly'.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>,
   /**
   * pickingGeometry specifies the exact geometry coordinates that are used to perform the intersection testing of the picking operation.
   *
   * Access type is 'inputOutput'.
   */
   pickingGeometry: X3DGeometryNodeProxy,
   /**
   * pickTarget specifies the list of nodes against which picking operations are performed.
   *
   * Access type is 'inputOutput'.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>,
   /**
   * The sortOrder field determines the order provided for picked output events.
   *
   * Access type is 'initializeOnly'.
   */
   sortOrder: string,
}

/** WaveShaper node represents a nonlinear distorter that applies a wave-shaping distortion curve to the signal. */
interface WaveShaperProxy extends X3DSoundProcessingNodeProxy
{
   /**
   * channelCount reports number of channels provided by input nodes.
   *
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * channelCountMode determines how individual channels are counted when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * channelInterpretation determines how individual channels are treated when up-mixing and down-mixing connections to any inputs.
   *
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * The children field specifies audio-graph sound sources providing input signals for this node.
   *
   * Access type is 'inputOutput'.
   */
   children: MFNode <AnalyserProxy | AudioClipProxy | AudioDestinationProxy | BiquadFilterProxy | BufferAudioSourceProxy | ChannelMergerProxy | ChannelSelectorProxy | ChannelSplitterProxy | ConvolverProxy | DelayProxy | DynamicsCompressorProxy | GainProxy | ListenerPointSourceProxy | MicrophoneSourceProxy | MovieTextureProxy | OscillatorSourceProxy | SoundProxy | SpatialSoundProxy | StreamAudioDestinationProxy | StreamAudioSourceProxy | WaveShaperProxy>,
   /**
   * Author-provided prose that describes intended purpose of the url asset.
   *
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Current elapsed time since AudioClip activated/running, cumulative in seconds, and not counting any paused time.
   *
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * The gain field is a factor that represents the amount of linear amplification to apply to the output of the node.
   *
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * isActive true/false events are sent when playback starts/stops.
   *
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * isPaused true/false events are sent when AudioClip is paused/resumed.
   *
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * The oversample field is specifies what type of oversampling (if any) should be used when applying the shaping curve.
   *
   * Access type is 'inputOutput'.
   */
   oversample: string,
   /**
   * When time now >= pauseTime, isPaused becomes true and AudioClip becomes paused.
   *
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * When resumeTime becomes <= time now, isPaused becomes false and AudioClip becomes active.
   *
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Absolute time: number of seconds since January 1, 1970, 00:00:00 GMT.
   *
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * tailTime is duration of time that a node continues to provide output signal after the input signal becomes silent.
   *
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** WindPhysicsModel applies a wind effect to the particles. */
interface WindPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{
   /**
   * direction in which wind is travelling in the form of a normalized, unit vector.
   *
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Enables/disables node operation.
   *
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * gustiness specifies how much wind speed varies from the average speed.
   *
   * Access type is 'inputOutput'.
   */
   gustiness: number,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Initial linear speed (default is m/s) imparted to all particles along their direction of movement.
   *
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * turbulence field specifies how much the wind acts directly in line with the direction, and how much variation is applied in directions other than the wind direction.
   *
   * Access type is 'inputOutput'.
   */
   turbulence: number,
}

/** WorldInfo contains a title and simple persistent metadata information about an X3D scene. This node is strictly for documentation purposes and has no effect on the visual appearance or behaviour of the world. */
interface WorldInfoProxy extends X3DInfoNodeProxy
{
   /**
   * Additional information about this model.
   *
   * Access type is 'inputOutput'.
   */
   info: MFString,
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * title of this world, placed in window title.
   *
   * Access type is 'inputOutput'.
   */
   title: string,
}

/** Nodes of this type can be used as child nodes for Appearance. */
interface X3DAppearanceChildNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all Appearance nodes. */
interface X3DAppearanceNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Abstract type from which all backgrounds inherit, also defining a background binding stack. */
interface X3DBackgroundNodeProxy extends X3DBindableNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   groundAngle: MFFloat,
   /**
   * Access type is 'inputOutput'.
   */
   groundColor: MFColor,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   skyAngle: MFFloat,
   /**
   * Access type is 'inputOutput'.
   */
   skyColor: MFColor,
   /**
   * Access type is 'inputOutput'.
   */
   transparency: number,
}

/** Bindable nodes implement the binding stack, so that only one of each node type is active at a given time. */
interface X3DBindableNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
}

/** X3DBoundedObject indicates that bounding box values can be provided (or computed) to encompass this node and any children. */
interface X3DBoundedObjectProxy
{
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** The X3DChaserNode abstract node type calculates the output on value_changed as a finite impulse response (FIR) based on the events received on set_destination field. */
interface X3DChaserNodeProxy extends X3DFollowerNodeProxy
{
   /**
   * Access type is 'initializeOnly'.
   */
   duration: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** A node that implements X3DChildNode is one of the legal children for a X3DGroupingNode parent. */
interface X3DChildNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for color specifications in X3D. */
interface X3DColorNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DComposableVolumeRenderStyleNode abstract node type is the base type for all node types that allow rendering styles to be sequentially composed together to form a single renderable output. */
interface X3DComposableVolumeRenderStyleNodeProxy extends X3DVolumeRenderStyleNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Composed geometry nodes produce renderable geometry, can contain Color Coordinate Normal TextureCoordinate, and are contained by a Shape node. */
interface X3DComposedGeometryNodeProxy extends X3DGeometryNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   attrib: MFNode <X3DVertexAttributeNodeProxy>,
   /**
   * Access type is 'initializeOnly'.
   */
   ccw: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   color: X3DColorNodeProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   colorPerVertex: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   coord: X3DCoordinateNodeProxy,
   /**
   * Access type is 'inputOutput'.
   */
   fogCoord: FogCoordinateProxy,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   normal: X3DNormalNodeProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   normalPerVertex: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | MultiTextureCoordinateProxy,
}

/** Base type for all coordinate node types in X3D. */
interface X3DCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DDamperNode abstract node type creates an IIR response that approaches the destination value according to the shape of the e-function only asymptotically but very quickly. */
interface X3DDamperNodeProxy extends X3DFollowerNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   order: number,
   /**
   * Access type is 'inputOutput'.
   */
   tau: number,
   /**
   * Access type is 'inputOutput'.
   */
   tolerance: number,
}

/** Base type for all drag-style pointing device sensors. */
interface X3DDragSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   autoOffset: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'outputOnly'.
   */
   readonly trackPoint_changed: SFVec3f,
}

/** Base type for the environmental sensor nodes ProximitySensor, TransformSensor and VisibilitySensor. */
interface X3DEnvironmentalSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   size: SFVec3f,
}

/** Base type for all nodes that specify cubic environment map sources for texture images. */
interface X3DEnvironmentTextureNodeProxy extends X3DTextureNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Abstract type describing a node that influences the lighting equation through the use of fog semantics. */
interface X3DFogObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Access type is 'inputOutput'.
   */
   fogType: string,
   /**
   * Access type is 'inputOutput'.
   */
   visibilityRange: number,
}

/** X3DFollowerNode is the abstract base class for all nodes in the Followers component. */
interface X3DFollowerNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all font style nodes. */
interface X3DFontStyleNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all geometric property node types. */
interface X3DGeometricPropertyNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Geometry nodes produce renderable geometry and are contained by a Shape node. */
interface X3DGeometryNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Grouping nodes can contain other nodes as children, thus making up the backbone of a scene graph. */
interface X3DGroupingNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Base type for all nodes that contain only information without visual semantics. */
interface X3DInfoNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Interpolator nodes are designed for linear keyframed animation. Interpolators are driven by an input key ranging [0..1] and produce corresponding piecewise-linear output functions. */
interface X3DInterpolatorNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
}

/** Base type for all sensor node types that operate using key devices. */
interface X3DKeyDeviceSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DLayerNode abstract node type is the base node type for layer nodes. */
interface X3DLayerNodeProxy extends X3DNodeProxy, X3DPickableObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Access type is 'inputOutput'.
   */
   pickable: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   viewport: X3DViewportNodeProxy,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** X3DLayoutNode is the base node type for layout nodes. */
interface X3DLayoutNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Light nodes provide illumination for rendering geometry in the scene. Implementing nodes must include a global field with type SFBool and accessType inputOutput. */
interface X3DLightNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
}

/** Base type for all Material nodes. */
interface X3DMaterialNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Each node inheriting the X3DMetadataObject interface contains a single array of strictly typed values: MFBool, MFInt32, MFFloat, MFDouble, MFString, or MFNode, the latter having children that are all Metadata nodes. */
interface X3DMetadataObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   name: string,
   /**
   * Access type is 'inputOutput'.
   */
   reference: string,
}

/** The X3DNBodyCollidableNode abstract node type represents objects that act as the interface between the rigid body physics, collision geometry proxy, and renderable objects in the scene graph hierarchy. */
interface X3DNBodyCollidableNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   rotation: SFRotation,
   /**
   * Access type is 'inputOutput'.
   */
   translation: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** The X3DNBodyCollisionSpaceNode abstract node type represents objects that act as a self-contained spatial collection of objects that can interact through collision detection routines. */
interface X3DNBodyCollisionSpaceNodeProxy extends X3DNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Base typefor all sensors that generate events based on network activity. */
interface X3DNetworkSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** All instantiable nodes implement X3DNode, which corresponds to SFNode type in the X3D specification. */
interface X3DNodeProxy extends SFNodeProxy
{
   /**
   * Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.
   *
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all normal node types in X3D. */
interface X3DNormalNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all nodes that provide control curve information in 2D space. */
interface X3DNurbsControlCurveNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   controlPoint: MFVec2d,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Abstract geometry type for all types of NURBS surfaces. */
interface X3DNurbsSurfaceGeometryNodeProxy extends X3DParametricGeometryNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   controlPoint: CoordinateProxy | CoordinateDoubleProxy,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   solid: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   texCoord: X3DSingleTextureCoordinateNodeProxy | NurbsTextureCoordinateProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   uClosed: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   uDimension: number,
   /**
   * Access type is 'initializeOnly'.
   */
   uKnot: MFDouble,
   /**
   * Access type is 'initializeOnly'.
   */
   uOrder: number,
   /**
   * Access type is 'inputOutput'.
   */
   uTessellation: number,
   /**
   * Access type is 'initializeOnly'.
   */
   vClosed: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   vDimension: number,
   /**
   * Access type is 'initializeOnly'.
   */
   vKnot: MFDouble,
   /**
   * Access type is 'initializeOnly'.
   */
   vOrder: number,
   /**
   * Access type is 'inputOutput'.
   */
   vTessellation: number,
   /**
   * Access type is 'inputOutput'.
   */
   weight: MFDouble,
}

/** Base type for material nodes that describe how the shape looks like from one side. A different number of contanied texture nodes are allowed by each of the implementing nodes. */
interface X3DOneSidedMaterialNodeProxy extends X3DMaterialNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   emissiveTextureMapping: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   normalScale: number,
   /**
   * Access type is 'inputOutput'.
   */
   normalTextureMapping: string,
}

/** Base type for all geometry node types that are created parametrically and use control points to describe the final shape of the surface. */
interface X3DParametricGeometryNodeProxy extends X3DGeometryNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DParticleEmitterNode abstract type represents any node that is an emitter of particles. */
interface X3DParticleEmitterNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   mass: number,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   speed: number,
   /**
   * Access type is 'inputOutput'.
   */
   surfaceArea: number,
   /**
   * Access type is 'inputOutput'.
   */
   variation: number,
}

/** The X3DParticlePhysicsModelNode abstract type represents any node that applies a form of constraints on the particles after they have been generated. */
interface X3DParticlePhysicsModelNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DPickableObject abstract interface marks a node as being capable of having customized picking performed on its contents or children. */
interface X3DPickableObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   pickable: boolean,
}

/** The X3DPickSensorNode abstract node type is the base node type that represents the lowest common denominator of picking capabilities. */
interface X3DPickSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   intersectionType: string,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   matchCriterion: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   objectType: MFString,
   /**
   * Access type is 'outputOnly'.
   */
   readonly pickedGeometry: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   pickingGeometry: X3DGeometryNodeProxy,
   /**
   * Access type is 'inputOutput'.
   */
   pickTarget: MFNode <X3DGroupingNodeProxy | X3DShapeNodeProxy | InlineProxy>,
   /**
   * Access type is 'initializeOnly'.
   */
   sortOrder: string,
}

/** Base type for all pointing device sensors. */
interface X3DPointingDeviceSensorNodeProxy extends X3DSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type marking nodes that are valid product structure children for the CADGeometry component. */
interface X3DProductStructureChildNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   name: string,
}

/** Base type for all nodes that specify arbitrary fields for interfacing with per-object attribute values. */
interface X3DProgrammableShaderObjectProxy
{

}

/** Base type for all prototype instances. Note that direct children nodes are disallowed, instead let fieldValue with type SFNode/MFNode contain them. Current practice is that, if desired, prototype authors must explicitly add the metadata SFNode field in the ProtoInterface. */
interface X3DPrototypeInstanceProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** The X3DRigidJointNode abstract node type is the base type for all joint types. */
interface X3DRigidJointNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   body1: RigidBodyProxy,
   /**
   * Access type is 'inputOutput'.
   */
   body2: RigidBodyProxy,
   /**
   * Access type is 'inputOutput'.
   */
   forceOutput: MFString,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for scripting nodes (but not shader nodes). */
interface X3DScriptNodeProxy extends X3DChildNodeProxy, X3DUrlObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** Base type for all sensors. */
interface X3DSensorNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type from which all Sequencers are derived. */
interface X3DSequencerNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   key: MFFloat,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   next: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   previous: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   set_fraction: number,
}

/** Base type for all nodes that specify a programmable shader. */
interface X3DShaderNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   activate: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isSelected: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isValid: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   language: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all Shape nodes. */
interface X3DShapeNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   appearance: X3DAppearanceNodeProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   castShadow: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   geometry: X3DGeometryNodeProxy,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** Base type for all texture coordinate nodes which specify texture coordinates for a single texture. */
interface X3DSingleTextureCoordinateNodeProxy extends X3DTextureCoordinateNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all texture node types that define a single texture. A single texture can be used to influence a parameter of various material nodes in the Shape component, and it can be a child of MultiTexture. */
interface X3DSingleTextureNodeProxy extends X3DTextureNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all texture transform nodes which specify texture coordinate transformation for a single texture. */
interface X3DSingleTextureTransformNodeProxy extends X3DTextureTransformNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   mapping: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundChannelNodeProxy extends X3DSoundNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundDestinationNodeProxy extends X3DSoundNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   mediaDeviceID: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all sound nodes. */
interface X3DSoundNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all sound processing nodes, which are used to enhance audio with filtering, delaying, changing gain, etc. */
interface X3DSoundProcessingNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly channelCount: number,
   /**
   * Access type is 'inputOutput'.
   */
   channelCountMode: string,
   /**
   * Access type is 'inputOutput'.
   */
   channelInterpretation: string,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   stopTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   tailTime: number,
}

/** Nodes implementing X3DSoundSourceNode provide signal inputs to the audio graph. */
interface X3DSoundSourceNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   gain: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   stopTime: number,
}

/** X3DStatement is a marker interface that identifies statements relating to nonrenderable scene graph structure. X3DStatement does not extend from any other node type since it is not an explicit part of the X3D node interface hierarchy, and DEF/USE is not appropriate for such statements. */
interface X3DStatementProxy
{

}

/** Base type for all nodes which specify 2D sources for texture images. */
interface X3DTexture2DNodeProxy extends X3DSingleTextureNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
}

/** Base type for all nodes that specify 3D sources for texture images. */
interface X3DTexture3DNodeProxy extends X3DTextureNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   repeatR: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   repeatS: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   repeatT: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   textureProperties: TexturePropertiesProxy,
}

/** Base type for all nodes which specify texture coordinates. */
interface X3DTextureCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all nodes which specify sources for texture images. */
interface X3DTextureNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type for all node types that specify texture projector nodes, which provide a form of lighting. */
interface X3DTextureProjectorNodeProxy extends X3DLightNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   ambientIntensity: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly aspectRatio: number,
   /**
   * Access type is 'inputOutput'.
   */
   color: SFColor,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   direction: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Access type is 'inputOutput'.
   */
   global: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   intensity: number,
   /**
   * Access type is 'inputOutput'.
   */
   location: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Access type is 'inputOutput'.
   */
   on: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   shadowIntensity: number,
   /**
   * Access type is 'inputOutput'.
   */
   shadows: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   texture: X3DTexture2DNodeProxy,
}

/** Base type for all nodes which specify a transformation of texture coordinates. */
interface X3DTextureTransformNodeProxy extends X3DAppearanceChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** Base type from which all time-dependent nodes are derived. */
interface X3DTimeDependentNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'outputOnly'.
   */
   readonly elapsedTime: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isPaused: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   pauseTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   resumeTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   startTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   stopTime: number,
}

/** Base type for all touch-style pointing device sensors. */
interface X3DTouchSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isActive: boolean,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isOver: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'outputOnly'.
   */
   readonly touchTime: number,
}

/** Base type from which all trigger nodes are derived. */
interface X3DTriggerNodeProxy extends X3DChildNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

/** X3DUrlObject indicates that a node has content loaded from a Uniform Resource Locator (URL) and can be tracked via a LoadSensor. Such child nodes have containerField='children' to indicate their relationship to the parent LoadSensor node. */
interface X3DUrlObjectProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   autoRefresh: number,
   /**
   * Access type is 'inputOutput'.
   */
   autoRefreshTimeLimit: number,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   load: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   url: MFString,
}

/** Base type for all nodes that specify per-vertex attribute information to the shader. */
interface X3DVertexAttributeNodeProxy extends X3DGeometricPropertyNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'initializeOnly'.
   */
   name: string,
}

/** Node type X3DViewpointNode defines a specific location in the local coordinate system from which the user may view the scene, and also defines a viewpoint binding stack. */
interface X3DViewpointNodeProxy extends X3DBindableNodeProxy
{
   /**
   * Access type is 'outputOnly'.
   */
   readonly bindTime: number,
   /**
   * Access type is 'inputOutput'.
   */
   description: string,
   /**
   * Access type is 'inputOutput'.
   */
   farDistance: number,
   /**
   * Access type is 'outputOnly'.
   */
   readonly isBound: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   jump: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   navigationInfo: NavigationInfoProxy,
   /**
   * Access type is 'inputOutput'.
   */
   nearDistance: number,
   /**
   * Access type is 'inputOutput'.
   */
   orientation: SFRotation,
   /**
   * Access type is 'inputOutput'.
   */
   retainUserOffsets: boolean,
   /**
   * Access type is 'inputOnly'.
   */
   set_bind: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   viewAll: boolean,
}

/** The X3DViewportNode abstract node type is the base node type for viewport nodes. */
interface X3DViewportNodeProxy extends X3DGroupingNodeProxy
{
   /**
   * Access type is 'inputOnly'.
   */
   addChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   children: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOnly'.
   */
   removeChildren: MFNode <X3DChildNodeProxy>,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** The X3DVolumeDataNode abstract node type is the base type for all node types that describe volumetric data to be rendered. */
interface X3DVolumeDataNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{
   /**
   * Access type is 'initializeOnly'.
   */
   bboxCenter: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   bboxDisplay: boolean,
   /**
   * Access type is 'initializeOnly'.
   */
   bboxSize: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   dimensions: SFVec3f,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
   /**
   * Access type is 'inputOutput'.
   */
   visible: boolean,
}

/** The X3DVolumeRenderStyleNode abstract node type is the base type for all node types that specify a specific visual rendering style to be used when rendering volume data. */
interface X3DVolumeRenderStyleNodeProxy extends X3DNodeProxy
{
   /**
   * Access type is 'inputOutput'.
   */
   enabled: boolean,
   /**
   * Access type is 'inputOutput'.
   */
   metadata: X3DMetadataObjectProxy,
}

type ConcreteNodesType = {
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
   DirectionalLight: DirectionalLightProxy,
   DISEntityManager: DISEntityManagerProxy,
   DISEntityTypeMapping: DISEntityTypeMappingProxy,
   Disk2D: Disk2DProxy,
   DoubleAxisHingeJoint: DoubleAxisHingeJointProxy,
   DynamicsCompressor: DynamicsCompressorProxy,
   EaseInEaseOut: EaseInEaseOutProxy,
   EdgeEnhancementVolumeStyle: EdgeEnhancementVolumeStyleProxy,
   ElevationGrid: ElevationGridProxy,
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
   ProtoInstance: ProtoInstanceProxy,
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
{ [name: string]: SFNode } // catch all;

   // NODES END
