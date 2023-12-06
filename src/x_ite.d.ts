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

   readonly X3DAppearanceChildNode: number;
   readonly X3DAppearanceNode: number;
   readonly X3DBackgroundNode: number;
   readonly X3DBindableNode: number;
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
   readonly X3DPickSensorNode: number;
   readonly X3DPointingDeviceSensorNode: number;
   readonly X3DProductStructureChildNode: number;
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

interface AcousticPropertiesProxy
{

}

interface AnalyserProxy
{

}

interface AnchorProxy
{

}

interface AppearanceProxy
{

}

interface Arc2DProxy
{

}

interface ArcClose2DProxy
{

}

interface AudioClipProxy
{

}

interface AudioDestinationProxy
{

}

interface BackgroundProxy
{

}

interface BallJointProxy
{

}

interface BillboardProxy
{

}

interface BiquadFilterProxy
{

}

interface BlendedVolumeStyleProxy
{

}

interface BooleanFilterProxy
{

}

interface BooleanSequencerProxy
{

}

interface BooleanToggleProxy
{

}

interface BooleanTriggerProxy
{

}

interface BoundaryEnhancementVolumeStyleProxy
{

}

interface BoundedPhysicsModelProxy
{

}

interface BoxProxy
{

}

interface BufferAudioSourceProxy
{

}

interface CADAssemblyProxy
{

}

interface CADFaceProxy
{

}

interface CADLayerProxy
{

}

interface CADPartProxy
{

}

interface CartoonVolumeStyleProxy
{

}

interface ChannelMergerProxy
{

}

interface ChannelSelectorProxy
{

}

interface ChannelSplitterProxy
{

}

interface Circle2DProxy
{

}

interface ClipPlaneProxy
{

}

interface CollidableOffsetProxy
{

}

interface CollidableShapeProxy
{

}

interface CollisionProxy
{

}

interface CollisionCollectionProxy
{

}

interface CollisionSensorProxy
{

}

interface CollisionSpaceProxy
{

}

interface ColorProxy
{

}

interface ColorChaserProxy
{

}

interface ColorDamperProxy
{

}

interface ColorInterpolatorProxy
{

}

interface ColorRGBAProxy
{

}

interface ComposedCubeMapTextureProxy
{

}

interface ComposedShaderProxy
{

}

interface ComposedTexture3DProxy
{

}

interface ComposedVolumeStyleProxy
{

}

interface ConeProxy
{

}

interface ConeEmitterProxy
{

}

interface ContactProxy
{

}

interface Contour2DProxy
{

}

interface ContourPolyline2DProxy
{

}

interface ConvolverProxy
{

}

interface CoordinateProxy
{

}

interface CoordinateChaserProxy
{

}

interface CoordinateDamperProxy
{

}

interface CoordinateDoubleProxy
{

}

interface CoordinateInterpolatorProxy
{

}

interface CoordinateInterpolator2DProxy
{

}

interface CylinderProxy
{

}

interface CylinderSensorProxy
{

}

interface DelayProxy
{

}

interface DirectionalLightProxy
{

}

interface DISEntityManagerProxy
{

}

interface DISEntityTypeMappingProxy
{

}

interface Disk2DProxy
{

}

interface DoubleAxisHingeJointProxy
{

}

interface DynamicsCompressorProxy
{

}

interface EaseInEaseOutProxy
{

}

interface EdgeEnhancementVolumeStyleProxy
{

}

interface ElevationGridProxy
{

}

interface EspduTransformProxy
{

}

interface ExplosionEmitterProxy
{

}

interface ExtrusionProxy
{

}

interface FillPropertiesProxy
{

}

interface FloatVertexAttributeProxy
{

}

interface FogProxy
{

}

interface FogCoordinateProxy
{

}

interface FontStyleProxy
{

}

interface ForcePhysicsModelProxy
{

}

interface GainProxy
{

}

interface GeneratedCubeMapTextureProxy
{

}

interface GeoCoordinateProxy
{

}

interface GeoElevationGridProxy
{

}

interface GeoLocationProxy
{

}

interface GeoLODProxy
{

}

interface GeoMetadataProxy
{

}

interface GeoOriginProxy
{

}

interface GeoPositionInterpolatorProxy
{

}

interface GeoProximitySensorProxy
{

}

interface GeoTouchSensorProxy
{

}

interface GeoTransformProxy
{

}

interface GeoViewpointProxy
{

}

interface GroupProxy
{

}

interface HAnimDisplacerProxy
{

}

interface HAnimHumanoidProxy
{

}

interface HAnimJointProxy
{

}

interface HAnimMotionProxy
{

}

interface HAnimSegmentProxy
{

}

interface HAnimSiteProxy
{

}

interface ImageCubeMapTextureProxy
{

}

interface ImageTextureProxy
{

}

interface ImageTexture3DProxy
{

}

interface IndexedFaceSetProxy
{

}

interface IndexedLineSetProxy
{

}

interface IndexedQuadSetProxy
{

}

interface IndexedTriangleFanSetProxy
{

}

interface IndexedTriangleSetProxy
{

}

interface IndexedTriangleStripSetProxy
{

}

interface InlineProxy
{

}

interface IntegerSequencerProxy
{

}

interface IntegerTriggerProxy
{

}

interface IsoSurfaceVolumeDataProxy
{

}

interface KeySensorProxy
{

}

interface LayerProxy
{

}

interface LayerSetProxy
{

}

interface LayoutProxy
{

}

interface LayoutGroupProxy
{

}

interface LayoutLayerProxy
{

}

interface LinePickSensorProxy
{

}

interface LinePropertiesProxy
{

}

interface LineSetProxy
{

}

interface ListenerPointSourceProxy
{

}

interface LoadSensorProxy
{

}

interface LocalFogProxy
{

}

interface LODProxy
{

}

interface MaterialProxy
{

}

interface Matrix3VertexAttributeProxy
{

}

interface Matrix4VertexAttributeProxy
{

}

interface MetadataBooleanProxy
{

}

interface MetadataDoubleProxy
{

}

interface MetadataFloatProxy
{

}

interface MetadataIntegerProxy
{

}

interface MetadataSetProxy
{

}

interface MetadataStringProxy
{

}

interface MicrophoneSourceProxy
{

}

interface MotorJointProxy
{

}

interface MovieTextureProxy
{

}

interface MultiTextureProxy
{

}

interface MultiTextureCoordinateProxy
{

}

interface MultiTextureTransformProxy
{

}

interface NavigationInfoProxy
{

}

interface NormalProxy
{

}

interface NormalInterpolatorProxy
{

}

interface NurbsCurveProxy
{

}

interface NurbsCurve2DProxy
{

}

interface NurbsOrientationInterpolatorProxy
{

}

interface NurbsPatchSurfaceProxy
{

}

interface NurbsPositionInterpolatorProxy
{

}

interface NurbsSetProxy
{

}

interface NurbsSurfaceInterpolatorProxy
{

}

interface NurbsSweptSurfaceProxy
{

}

interface NurbsSwungSurfaceProxy
{

}

interface NurbsTextureCoordinateProxy
{

}

interface NurbsTrimmedSurfaceProxy
{

}

interface OpacityMapVolumeStyleProxy
{

}

interface OrientationChaserProxy
{

}

interface OrientationDamperProxy
{

}

interface OrientationInterpolatorProxy
{

}

interface OrthoViewpointProxy
{

}

interface OscillatorSourceProxy
{

}

interface PackagedShaderProxy
{

}

interface ParticleSystemProxy
{

}

interface PeriodicWaveProxy
{

}

interface PhysicalMaterialProxy
{

}

interface PickableGroupProxy
{

}

interface PixelTextureProxy
{

}

interface PixelTexture3DProxy
{

}

interface PlaneSensorProxy
{

}

interface PointEmitterProxy
{

}

interface PointLightProxy
{

}

interface PointPickSensorProxy
{

}

interface PointPropertiesProxy
{

}

interface PointSetProxy
{

}

interface Polyline2DProxy
{

}

interface PolylineEmitterProxy
{

}

interface Polypoint2DProxy
{

}

interface PositionChaserProxy
{

}

interface PositionChaser2DProxy
{

}

interface PositionDamperProxy
{

}

interface PositionDamper2DProxy
{

}

interface PositionInterpolatorProxy
{

}

interface PositionInterpolator2DProxy
{

}

interface PrimitivePickSensorProxy
{

}

interface ProgramShaderProxy
{

}

interface ProjectionVolumeStyleProxy
{

}

interface ProtoInstanceProxy
{

}

interface ProximitySensorProxy
{

}

interface QuadSetProxy
{

}

interface ReceiverPduProxy
{

}

interface Rectangle2DProxy
{

}

interface RigidBodyProxy
{

}

interface RigidBodyCollectionProxy
{

}

interface ScalarChaserProxy
{

}

interface ScalarDamperProxy
{

}

interface ScalarInterpolatorProxy
{

}

interface ScreenFontStyleProxy
{

}

interface ScreenGroupProxy
{

}

interface ScriptProxy
{

}

interface SegmentedVolumeDataProxy
{

}

interface ShadedVolumeStyleProxy
{

}

interface ShaderPartProxy
{

}

interface ShaderProgramProxy
{

}

interface ShapeProxy
{

}

interface SignalPduProxy
{

}

interface SilhouetteEnhancementVolumeStyleProxy
{

}

interface SingleAxisHingeJointProxy
{

}

interface SliderJointProxy
{

}

interface SoundProxy
{

}

interface SpatialSoundProxy
{

}

interface SphereProxy
{

}

interface SphereSensorProxy
{

}

interface SplinePositionInterpolatorProxy
{

}

interface SplinePositionInterpolator2DProxy
{

}

interface SplineScalarInterpolatorProxy
{

}

interface SpotLightProxy
{

}

interface SquadOrientationInterpolatorProxy
{

}

interface StaticGroupProxy
{

}

interface StreamAudioDestinationProxy
{

}

interface StreamAudioSourceProxy
{

}

interface StringSensorProxy
{

}

interface SurfaceEmitterProxy
{

}

interface SwitchProxy
{

}

interface TexCoordChaser2DProxy
{

}

interface TexCoordDamper2DProxy
{

}

interface TextProxy
{

}

interface TextureBackgroundProxy
{

}

interface TextureCoordinateProxy
{

}

interface TextureCoordinate3DProxy
{

}

interface TextureCoordinate4DProxy
{

}

interface TextureCoordinateGeneratorProxy
{

}

interface TextureProjectorProxy
{

}

interface TextureProjectorParallelProxy
{

}

interface TexturePropertiesProxy
{

}

interface TextureTransformProxy
{

}

interface TextureTransform3DProxy
{

}

interface TextureTransformMatrix3DProxy
{

}

interface TimeSensorProxy
{

}

interface TimeTriggerProxy
{

}

interface ToneMappedVolumeStyleProxy
{

}

interface TouchSensorProxy
{

}

interface TransformProxy
{

}

interface TransformSensorProxy
{

}

interface TransmitterPduProxy
{

}

interface TriangleFanSetProxy
{

}

interface TriangleSetProxy
{

}

interface TriangleSet2DProxy
{

}

interface TriangleStripSetProxy
{

}

interface TwoSidedMaterialProxy
{

}

interface UniversalJointProxy
{

}

interface UnlitMaterialProxy
{

}

interface ViewpointProxy
{

}

interface ViewpointGroupProxy
{

}

interface ViewportProxy
{

}

interface VisibilitySensorProxy
{

}

interface VolumeDataProxy
{

}

interface VolumeEmitterProxy
{

}

interface VolumePickSensorProxy
{

}

interface WaveShaperProxy
{

}

interface WindPhysicsModelProxy
{

}

interface WorldInfoProxy
{

}

interface X3DAppearanceChildNodeProxy
{

}

interface X3DAppearanceNodeProxy
{

}

interface X3DBackgroundNodeProxy
{

}

interface X3DBindableNodeProxy
{

}

interface X3DChaserNodeProxy
{

}

interface X3DChildNodeProxy
{

}

interface X3DColorNodeProxy
{

}

interface X3DComposableVolumeRenderStyleNodeProxy
{

}

interface X3DComposedGeometryNodeProxy
{

}

interface X3DCoordinateNodeProxy
{

}

interface X3DDamperNodeProxy
{

}

interface X3DDragSensorNodeProxy
{

}

interface X3DEnvironmentalSensorNodeProxy
{

}

interface X3DEnvironmentTextureNodeProxy
{

}

interface X3DFollowerNodeProxy
{

}

interface X3DFontStyleNodeProxy
{

}

interface X3DGeometricPropertyNodeProxy
{

}

interface X3DGeometryNodeProxy
{

}

interface X3DGroupingNodeProxy
{

}

interface X3DInfoNodeProxy
{

}

interface X3DInterpolatorNodeProxy
{

}

interface X3DKeyDeviceSensorNodeProxy
{

}

interface X3DLayerNodeProxy
{

}

interface X3DLayoutNodeProxy
{

}

interface X3DLightNodeProxy
{

}

interface X3DMaterialNodeProxy
{

}

interface X3DNBodyCollidableNodeProxy
{

}

interface X3DNBodyCollisionSpaceNodeProxy
{

}

interface X3DNetworkSensorNodeProxy
{

}

interface X3DNodeProxy
{

}

interface X3DNormalNodeProxy
{

}

interface X3DNurbsControlCurveNodeProxy
{

}

interface X3DNurbsSurfaceGeometryNodeProxy
{

}

interface X3DOneSidedMaterialNodeProxy
{

}

interface X3DParametricGeometryNodeProxy
{

}

interface X3DParticleEmitterNodeProxy
{

}

interface X3DParticlePhysicsModelNodeProxy
{

}

interface X3DPickSensorNodeProxy
{

}

interface X3DPointingDeviceSensorNodeProxy
{

}

interface X3DProductStructureChildNodeProxy
{

}

interface X3DPrototypeInstanceProxy
{

}

interface X3DRigidJointNodeProxy
{

}

interface X3DScriptNodeProxy
{

}

interface X3DSensorNodeProxy
{

}

interface X3DSequencerNodeProxy
{

}

interface X3DShaderNodeProxy
{

}

interface X3DShapeNodeProxy
{

}

interface X3DSingleTextureCoordinateNodeProxy
{

}

interface X3DSingleTextureNodeProxy
{

}

interface X3DSingleTextureTransformNodeProxy
{

}

interface X3DSoundChannelNodeProxy
{

}

interface X3DSoundDestinationNodeProxy
{

}

interface X3DSoundNodeProxy
{

}

interface X3DSoundProcessingNodeProxy
{

}

interface X3DSoundSourceNodeProxy
{

}

interface X3DStatementProxy
{

}

interface X3DTexture2DNodeProxy
{

}

interface X3DTexture3DNodeProxy
{

}

interface X3DTextureCoordinateNodeProxy
{

}

interface X3DTextureNodeProxy
{

}

interface X3DTextureProjectorNodeProxy
{

}

interface X3DTextureTransformNodeProxy
{

}

interface X3DTimeDependentNodeProxy
{

}

interface X3DTouchSensorNodeProxy
{

}

interface X3DTriggerNodeProxy
{

}

interface X3DVertexAttributeNodeProxy
{

}

interface X3DViewpointNodeProxy
{

}

interface X3DViewportNodeProxy
{

}

interface X3DVolumeDataNodeProxy
{

}

interface X3DVolumeRenderStyleNodeProxy
{

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
