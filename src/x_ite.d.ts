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

}

/** Analyser provides real-time frequency and time-domain analysis information, without any change to the input. */
interface AnalyserProxy extends X3DSoundProcessingNodeProxy
{

}

/** Anchor is a Grouping node that can contain most nodes. */
interface AnchorProxy extends X3DGroupingNodeProxy, X3DUrlObjectProxy
{

}

/** Appearance specifies the visual properties of geometry by containing the Material, ImageTexture/MovieTexture/PixelTexture, FillProperties, LineProperties, programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) and TextureTransform nodes. */
interface AppearanceProxy extends X3DAppearanceNodeProxy
{

}

/** Arc2D is a line-based geometry node that defines a linear circular arc with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface Arc2DProxy extends X3DGeometryNodeProxy
{

}

/** ArcClose2D is a polygonal geometry node that defines a linear circular arc, closed by PIE or CHORD line segments, with center (0,0) in X-Y plane, with angles measured starting at positive x-axis and sweeping towards positive y-axis. */
interface ArcClose2DProxy extends X3DGeometryNodeProxy
{

}

/** AudioClip provides audio data used by parent Sound nodes. */
interface AudioClipProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{

}

/** AudioDestination node represents the final audio destination and is what user ultimately hears, typically from the speakers of user device. */
interface AudioDestinationProxy extends X3DSoundDestinationNodeProxy
{

}

/** Background simulates ground and sky, using vertical arrays of wraparound color values. */
interface BackgroundProxy extends X3DBackgroundNodeProxy
{

}

/** BallJoint represents an unconstrained joint between two bodies that pivot about a common anchor point. */
interface BallJointProxy extends X3DRigidJointNodeProxy
{

}

/** Billboard is a Grouping node that can contain most nodes. */
interface BillboardProxy extends X3DGroupingNodeProxy
{

}

/** BiquadFilter node is an AudioNode processor implementing common low-order filters. */
interface BiquadFilterProxy extends X3DSoundProcessingNodeProxy
{

}

/** BlendedVolumeStyle combines rendering of two voxel data sets into one by blending voxel values. */
interface BlendedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** BooleanFilter selectively passes true, false or negated events. */
interface BooleanFilterProxy extends X3DChildNodeProxy
{

}

/** BooleanSequencer generates periodic discrete Boolean values. */
interface BooleanSequencerProxy extends X3DSequencerNodeProxy
{

}

/** BooleanToggle maintains state and negates output when a true input is provided. */
interface BooleanToggleProxy extends X3DChildNodeProxy
{

}

/** BooleanTrigger converts time events to boolean true events. */
interface BooleanTriggerProxy extends X3DTriggerNodeProxy
{

}

/** BoundaryEnhancementVolumeStyle provides boundary enhancement for the volume rendering style. */
interface BoundaryEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** BoundedPhysicsModel provides user-defined geometrical boundaries for particle motion. */
interface BoundedPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{

}

/** Box is a geometry node specifying a rectangular cuboid. */
interface BoxProxy extends X3DGeometryNodeProxy
{

}

/** BufferAudioSource node represents a memory-resident audio asset that can contain one or more channels. */
interface BufferAudioSourceProxy extends X3DSoundSourceNodeProxy, X3DUrlObjectProxy
{

}

/** CADAssembly holds a set of Computer-Aided Design (CAD) assemblies or parts grouped together. */
interface CADAssemblyProxy extends X3DGroupingNodeProxy, X3DProductStructureChildNodeProxy
{

}

/** CADFace holds geometry representing one face in a Computer-Aided Design (CAD) CADPart. */
interface CADFaceProxy extends X3DProductStructureChildNodeProxy, X3DBoundedObjectProxy
{

}

/** CADLayer nodes define a hierarchy that shows layer structure for a Computer-Aided Design (CAD) model. */
interface CADLayerProxy extends X3DGroupingNodeProxy
{

}

/** CADPart is an atomic part that defines both coordinate-system location and the faces that constitute a part in a Computer-Aided Design (CAD) model. */
interface CADPartProxy extends X3DProductStructureChildNodeProxy, X3DGroupingNodeProxy
{

}

/** CartoonVolumeStyle generates cartoon-style non-photorealistic rendering of associated volumetric data. */
interface CartoonVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** ChannelMerger unites different input channels into a single output channel. */
interface ChannelMergerProxy extends X3DSoundChannelNodeProxy
{

}

/** ChannelSelector selects a single channel output from all input channels. */
interface ChannelSelectorProxy extends X3DSoundChannelNodeProxy
{

}

/** ChannelSplitter separates the different channels of a single audio source into a set of monophonic output channels. */
interface ChannelSplitterProxy extends X3DSoundChannelNodeProxy
{

}

/** Circle2D is a geometry node that defines a linear X-Y circle with center (0,0) in X-Y plane. */
interface Circle2DProxy extends X3DGeometryNodeProxy
{

}

/** ClipPlane specifies a single plane equation used to clip (i. */
interface ClipPlaneProxy extends X3DChildNodeProxy
{

}

/** CollidableOffset repositions geometry relative to center of owning body. */
interface CollidableOffsetProxy extends X3DNBodyCollidableNodeProxy
{

}

/** CollidableShape connects the collision detection system, the rigid body model, and the renderable scene graph. */
interface CollidableShapeProxy extends X3DNBodyCollidableNodeProxy
{

}

/** Collision detects camera-to-object contact using current view and NavigationInfo avatarSize. */
interface CollisionProxy extends X3DGroupingNodeProxy, X3DSensorNodeProxy
{

}

/** CollisionCollection holds a collection of objects that can be managed as a single entity for resolution of inter-object collisions. */
interface CollisionCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** CollisionSensor generates collision-detection events. */
interface CollisionSensorProxy extends X3DSensorNodeProxy
{

}

/** CollisionSpace holds collection of objects considered together for resolution of inter-object collisions. */
interface CollisionSpaceProxy extends X3DNBodyCollisionSpaceNodeProxy
{

}

/** Color node defines a set of RGB color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorProxy extends X3DColorNodeProxy
{

}

/** ColorChaser generates a series of SFColor values that progressively change from initial value to destination value. */
interface ColorChaserProxy extends X3DChaserNodeProxy
{

}

/** ColorDamper generates a series of RGB color values that progressively change from initial value to destination value. */
interface ColorDamperProxy extends X3DDamperNodeProxy
{

}

/** ColorInterpolator generates a range of color values. */
interface ColorInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** ColorRGBA node defines a set of RGBA color values that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface ColorRGBAProxy extends X3DColorNodeProxy
{

}

/** ComposedCubeMapTexture is a texture node that defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes. */
interface ComposedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{

}

/** ComposedShader can contain field declarations, but no CDATA section of plain-text source code, since programs are composed from child ShaderPart nodes. */
interface ComposedShaderProxy extends X3DShaderNodeProxy, X3DProgrammableShaderObjectProxy
{

}

/** ComposedTexture3D defines a 3D image-based texture map as a collection of 2D texture sources at various depths. */
interface ComposedTexture3DProxy extends X3DTexture3DNodeProxy
{

}

/** ComposedVolumeStyle allows compositing multiple rendering styles into single rendering pass. */
interface ComposedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** Cone is a geometry node. */
interface ConeProxy extends X3DGeometryNodeProxy
{

}

/** ConeEmitter generates all available particles from a specific point in space. */
interface ConeEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** Contact nodes are produced as output events when two collidable objects or spaces make contact. */
interface ContactProxy extends X3DNodeProxy
{

}

/** Contour2D groups a set of curve segments into a composite contour. */
interface Contour2DProxy extends X3DNodeProxy
{

}

/** ContourPolyline2D defines a linear curve segment as part of a trimming contour in the u-v domain of a NURBS surface. */
interface ContourPolyline2DProxy extends X3DNurbsControlCurveNodeProxy
{

}

/** Convolver performs a linear convolution on a given AudioBuffer, often used to achieve a reverberation effect. */
interface ConvolverProxy extends X3DSoundProcessingNodeProxy
{

}

/** Coordinate builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateProxy extends X3DCoordinateNodeProxy
{

}

/** CoordinateChaser generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateChaserProxy extends X3DChaserNodeProxy
{

}

/** CoordinateDamper generates a series of coordinate arrays that progressively change from initial value to destination value. */
interface CoordinateDamperProxy extends X3DDamperNodeProxy
{

}

/** CoordinateDouble builds geometry by defining a set of 3D coordinate (triplet) point values. */
interface CoordinateDoubleProxy extends X3DCoordinateNodeProxy
{

}

/** CoordinateInterpolator linearly interpolates among a list of 3-tuple MFVec3f arrays, producing a single MFVec3f array that is fractional average between two nearest arrays in the list. */
interface CoordinateInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** CoordinateInterpolator2D generates a series of SFVec2f or MFVec2f 2-tuple float values. */
interface CoordinateInterpolator2DProxy extends X3DInterpolatorNodeProxy
{

}

/** Cylinder is a geometry node. */
interface CylinderProxy extends X3DGeometryNodeProxy
{

}

/** CylinderSensor converts pointer motion (for example, a mouse or wand) into rotation values using an invisible cylinder aligned with local Y-axis. */
interface CylinderSensorProxy extends X3DDragSensorNodeProxy
{

}

/** Delay causes a time delay between the arrival of input data and subsequent propagation to the output. */
interface DelayProxy extends X3DSoundProcessingNodeProxy
{

}

/** DirectionalLight might not be scoped by parent Group or Transform at levels 1 or 2. */
interface DirectionalLightProxy extends X3DLightNodeProxy
{

}

/** DISEntityManager notifies a scene when new DIS ESPDU entities arrive or current entities leave. */
interface DISEntityManagerProxy extends X3DChildNodeProxy
{

}

/** DISEntityTypeMapping provides a best-match mapping from DIS ESPDU entity type information to a specific X3D model, thus providing a visual and behavioral representation that best matches the entity type. */
interface DISEntityTypeMappingProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{

}

/** Disk2D is a geometry node that defines a filled (or partially filled) planar circle with center (0,0). */
interface Disk2DProxy extends X3DGeometryNodeProxy
{

}

/** DoubleAxisHingeJoint has two independent axes located around a common anchor point. */
interface DoubleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{

}

/** DynamicsCompressor node implements a dynamics compression effect, lowering volume of loudest parts of signal and raising volume of softest parts. */
interface DynamicsCompressorProxy extends X3DSoundProcessingNodeProxy
{

}

/** EaseInEaseOut enables gradual animation transitions by modifying TimeSensor fraction outputs. */
interface EaseInEaseOutProxy extends X3DChildNodeProxy
{

}

/** EdgeEnhancementVolumeStyle specifies edge enhancement for the volume rendering style. */
interface EdgeEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** ElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface ElevationGridProxy extends X3DGeometryNodeProxy
{

}

/** EspduTransform is a networked Transform node that can contain most nodes. */
interface EspduTransformProxy extends X3DGroupingNodeProxy, X3DNetworkSensorNodeProxy
{

}

/** ExplosionEmitter generates all particles from a specific point in space at the initial time enabled. */
interface ExplosionEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** Extrusion is a geometry node that sequentially stretches a 2D cross section along a 3D-spine path in the local coordinate system, creating an outer hull. */
interface ExtrusionProxy extends X3DGeometryNodeProxy
{

}

/** FillProperties indicates whether appearance is filled or hatched for associated geometry nodes inside the same Shape. */
interface FillPropertiesProxy extends X3DAppearanceChildNodeProxy
{

}

/** FloatVertexAttribute defines a set of per-vertex single-precision floating-point attributes. */
interface FloatVertexAttributeProxy extends X3DVertexAttributeNodeProxy
{

}

/** Fog simulates atmospheric effects by blending distant objects with fog color. */
interface FogProxy extends X3DBindableNodeProxy, X3DFogObjectProxy
{

}

/** FogCoordinate defines a set of explicit fog depths on a per-vertex basis, overriding Fog visibilityRange. */
interface FogCoordinateProxy extends X3DGeometricPropertyNodeProxy
{

}

/** FontStyle is an X3DFontStyleNode that defines the size, family, justification, and other styles used by Text nodes. */
interface FontStyleProxy extends X3DFontStyleNodeProxy
{

}

/** ForcePhysicsModel applies a constant force value to the particles. */
interface ForcePhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{

}

/** The Gain node amplifies or deamplifies the input signal. */
interface GainProxy extends X3DSoundProcessingNodeProxy
{

}

/** GeneratedCubeMapTexture is a texture node that defines a cubic environment map that sources its data from internally generated images. */
interface GeneratedCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy
{

}

/** GeoCoordinate builds geometry as a set of geographic 3D coordinates. */
interface GeoCoordinateProxy extends X3DCoordinateNodeProxy
{

}

/** GeoElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. */
interface GeoElevationGridProxy extends X3DGeometryNodeProxy
{

}

/** GeoLocation positions a regular X3D model onto earth's surface. */
interface GeoLocationProxy extends X3DGroupingNodeProxy
{

}

/** Note that MFNode rootNode field can contain multiple nodes and has accessType inputOutput. Meanwhile MFNode children field is outputOnly, unlike other X3DGroupingNode exemplars. */
interface GeoLODProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** GeoMetadata includes a generic subset of metadata about the geographic data. */
interface GeoMetadataProxy extends X3DInfoNodeProxy, X3DUrlObjectProxy
{

}

/** GeoOrigin is deprecated and discouraged (but nevertheless allowed) in X3D version 3.3. GeoOrigin is restored in X3D version 4.0 for special use on devices with limited floating-point resolution. */
interface GeoOriginProxy extends X3DNodeProxy
{

}

/** GeoPositionInterpolator animates objects within a geographic coordinate system. */
interface GeoPositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** GeoProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface GeoProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{

}

/** GeoTouchSensor returns geographic coordinates for the object being selected. */
interface GeoTouchSensorProxy extends X3DTouchSensorNodeProxy
{

}

/** GeoTransform is a Grouping node that can contain most nodes. */
interface GeoTransformProxy extends X3DGroupingNodeProxy
{

}

/** GeoViewpoint specifies viewpoints using geographic coordinates. */
interface GeoViewpointProxy extends X3DViewpointNodeProxy
{

}

/** Group is a Grouping node that can contain most nodes. */
interface GroupProxy extends X3DGroupingNodeProxy
{

}

/** HAnimDisplacer nodes alter the shape of coordinate-based geometry within parent HAnimJoint or HAnimSegment nodes. */
interface HAnimDisplacerProxy extends X3DGeometricPropertyNodeProxy
{

}

/** The HAnimHumanoid node is used to: (a) store references to the joints, segments, sites, skeleton, optional skin, and fixed viewpoints, (b) serve as a container for the entire humanoid, (c) provide a convenient way of moving the humanoid through its environment, and (d) store human-readable metadata such as name, version, author, copyright, age, gender and other information. */
interface HAnimHumanoidProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** HAnimJoint node can represent each joint in a body. */
interface HAnimJointProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** An HAnimMotion node supports discrete frame-by-frame playback for HAnim motion data animation. */
interface HAnimMotionProxy extends X3DChildNodeProxy
{

}

/** HAnimSegment node contains Shape geometry for each body segment, providing a visual representation of the skeleton segment. */
interface HAnimSegmentProxy extends X3DGroupingNodeProxy
{

}

/** An HAnimSite node serves three purposes: (a) define an "end effector" location which can be used by an inverse kinematics system, (b) define an attachment point for accessories such as jewelry and clothing, and (c) define a location for a Viewpoint virtual camera in the reference frame of an HAnimSegment (such as a view "through the eyes" of the humanoid for use in multi-user worlds). */
interface HAnimSiteProxy extends X3DGroupingNodeProxy
{

}

/** ImageCubeMapTexture is a texture node that defines a cubic environment map source as a single file format that contains multiple images, one for each side. */
interface ImageCubeMapTextureProxy extends X3DEnvironmentTextureNodeProxy, X3DUrlObjectProxy
{

}

/** ImageTexture maps a 2D-image file onto a geometric shape. */
interface ImageTextureProxy extends X3DTexture2DNodeProxy, X3DUrlObjectProxy
{

}

/** ImageTexture3D defines a 3D image-based texture map by specifying a single image file that contains complete 3D data. */
interface ImageTexture3DProxy extends X3DTexture3DNodeProxy, X3DUrlObjectProxy
{

}

/** IndexedFaceSet defines polygons using index lists corresponding to vertex coordinates. */
interface IndexedFaceSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** IndexedLineSet defines polyline segments using index lists corresponding to vertex coordinates. */
interface IndexedLineSetProxy extends X3DGeometryNodeProxy
{

}

/** IndexedQuadSet is a geometry node that defines quadrilaterals. */
interface IndexedQuadSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** IndexedTriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** IndexedTriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** IndexedTriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface IndexedTriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** Inline can load another X3D or VRML model into the current scene via url. */
interface InlineProxy extends X3DChildNodeProxy
{

}

/** IntegerSequencer generates periodic discrete integer values. */
interface IntegerSequencerProxy extends X3DSequencerNodeProxy
{

}

/** IntegerTrigger converts set_boolean true input events to an integer value (for example, useful when animating whichChoice in a Switch node). */
interface IntegerTriggerProxy extends X3DTriggerNodeProxy
{

}

/** IsoSurfaceVolumeData displays one or more surfaces extracted from a voxel dataset. */
interface IsoSurfaceVolumeDataProxy extends X3DVolumeDataNodeProxy
{

}

/** KeySensor generates events as the user presses keys on the keyboard. */
interface KeySensorProxy extends X3DKeyDeviceSensorNodeProxy
{

}

/** Layer contains a list of children nodes that define the contents of the layer. */
interface LayerProxy extends X3DLayerNodeProxy
{

}

/** LayerSet defines a list of layers and a rendering order. */
interface LayerSetProxy extends X3DNodeProxy
{

}

/** Layout node is used as layout field of LayoutLayer and LayoutGroup nodes. */
interface LayoutProxy extends X3DLayoutNodeProxy
{

}

/** LayoutGroup is a Grouping node that can contain most nodes, whose children are related by a common layout within a parent layout. */
interface LayoutGroupProxy extends X3DNodeProxy, X3DGroupingNodeProxy
{

}

/** LayoutLayer is a Grouping node that can contain most nodes. */
interface LayoutLayerProxy extends X3DLayerNodeProxy
{

}

/** LinePickSensor uses one or more pickingGeometry line segments to compute intersections with pickTarget shapes. */
interface LinePickSensorProxy extends X3DPickSensorNodeProxy
{

}

/** LineProperties allows precise fine-grained control over the rendering style of lines and edges for associated geometry nodes inside the same Shape. */
interface LinePropertiesProxy extends X3DAppearanceChildNodeProxy
{

}

/** LineSet is a geometry node that can contain a Coordinate|CoordinateDouble node and optionally a Color|ColorRGBA node. */
interface LineSetProxy extends X3DGeometryNodeProxy
{

}

/** ListenerPointSource node represents position and orientation of a person listening to virtual sound in the audio scene, and provides single or multiple sound channels as output. */
interface ListenerPointSourceProxy extends X3DSoundSourceNodeProxy
{

}

/** LoadSensor generates events as watchList child nodes are either loaded or fail to load. */
interface LoadSensorProxy extends X3DNetworkSensorNodeProxy
{

}

/** LocalFog simulates atmospheric effects by blending distant objects with fog color. */
interface LocalFogProxy extends X3DChildNodeProxy, X3DFogObjectProxy
{

}

/** LOD (Level Of Detail) uses camera-to-object distance to switch among contained child levels. */
interface LODProxy extends X3DGroupingNodeProxy
{

}

/** Material specifies surface rendering properties for associated geometry nodes. */
interface MaterialProxy extends X3DOneSidedMaterialNodeProxy
{

}

/** Matrix3VertexAttribute defines a set of per-vertex 3x3 matrix attributes. */
interface Matrix3VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{

}

/** Matrix4VertexAttribute defines a set of per-vertex 4x4 matrix attributes. */
interface Matrix4VertexAttributeProxy extends X3DVertexAttributeNodeProxy
{

}

/** The metadata provided by this node is contained in the Boolean values of the value field. */
interface MetadataBooleanProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** The metadata provided by this node is contained in the double-precision floating point numbers of the value field. */
interface MetadataDoubleProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** The metadata provided by this node is contained in the single-precision floating point numbers of the value field. */
interface MetadataFloatProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** The metadata provided by this node is contained in the integer numbers of the value field. */
interface MetadataIntegerProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** The metadata provided by this node is contained in the metadata nodes of the value field. */
interface MetadataSetProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** The metadata provided by this node is contained in the strings of the value field. */
interface MetadataStringProxy extends X3DNodeProxy, X3DMetadataObjectProxy
{

}

/** MicrophoneSource captures input from a physical microphone in the real world. */
interface MicrophoneSourceProxy extends X3DSoundSourceNodeProxy
{

}

/** MotorJoint drives relative angular velocities between body1 and body2 within a common reference frame. */
interface MotorJointProxy extends X3DRigidJointNodeProxy
{

}

/** MovieTexture applies a 2D movie image to surface geometry, or provides audio for a Sound node. */
interface MovieTextureProxy extends X3DSoundSourceNodeProxy
{

}

/** MultiTexture applies several individual textures to a single geometry node, enabling a variety of visual effects that include light mapping and environment mapping. */
interface MultiTextureProxy extends X3DTextureNodeProxy
{

}

/** MultiTextureCoordinate contains multiple TextureCoordinate or TextureCoordinateGenerator nodes, for use by a parent polygonal geometry node such as IndexedFaceSet or a Triangle* node. */
interface MultiTextureCoordinateProxy extends X3DTextureCoordinateNodeProxy
{

}

/** MultiTextureTransform contains multiple TextureTransform nodes, each provided for use by corresponding ImageTexture MovieTexture or PixelTexture nodes within a sibling MultiTexture node. */
interface MultiTextureTransformProxy extends X3DTextureTransformNodeProxy
{

}

/** NavigationInfo describes the user's viewing model, user navigation-interaction modalities, and also dimensional characteristics of the user's (typically invisible) avatar. */
interface NavigationInfoProxy extends X3DBindableNodeProxy
{

}

/** Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate|CoordinateDouble node, or else to a parent ElevationGrid node. */
interface NormalProxy extends X3DNormalNodeProxy
{

}

/** NormalInterpolator generates a series of normal (perpendicular) 3-tuple SFVec3f values. */
interface NormalInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** NurbsCurve is a 3D curve analogous to NurbsPatchSurface. */
interface NurbsCurveProxy extends X3DParametricGeometryNodeProxy
{

}

/** NurbsCurve2D defines a trimming segment that is part of a trimming contour in the u-v domain of a surface. */
interface NurbsCurve2DProxy extends X3DNurbsControlCurveNodeProxy
{

}

/** NurbsOrientationInterpolator describes a 3D NURBS curve and outputs interpolated orientation values. */
interface NurbsOrientationInterpolatorProxy extends X3DChildNodeProxy
{

}

/** NurbsPatchSurface defines a contiguous 3D Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsPatchSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{

}

/** NurbsPositionInterpolator describes a 3D NURBS curve and outputs interpolated position values. */
interface NurbsPositionInterpolatorProxy extends X3DChildNodeProxy
{

}

/** NurbsSet collects a set of NurbsSurface nodes into a common group and treats NurbsSurface set as a unit during tessellation, thereby enforcing tessellation continuity along borders. */
interface NurbsSetProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** NurbsSurfaceInterpolator describes a 3D NURBS curve and outputs interpolated position and normal values. */
interface NurbsSurfaceInterpolatorProxy extends X3DChildNodeProxy
{

}

/** NurbsSweptSurface uses a trajectoryCurve path to describe a generalized surface that is swept by a crossSectionCurve. */
interface NurbsSweptSurfaceProxy extends X3DParametricGeometryNodeProxy
{

}

/** NurbsSwungSurface contains a profileCurve and a trajectoryCurve [X3DNurbsControlCurveNode]. */
interface NurbsSwungSurfaceProxy extends X3DParametricGeometryNodeProxy
{

}

/** NurbsTextureCoordinate describes a 3D NURBS surface in the parametric domain of its surface host, specifying mapping of texture onto the surface. */
interface NurbsTextureCoordinateProxy extends X3DNodeProxy
{

}

/** NurbsTrimmedSurface generates texture coordinates from a Non-Uniform Rational B-Spline (NURBS) surface. */
interface NurbsTrimmedSurfaceProxy extends X3DNurbsSurfaceGeometryNodeProxy
{

}

/** OpacityMapVolumeStyle specifies that volumetric data is rendered using opacity mapped to a transfer function texture. */
interface OpacityMapVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** OrientationChaser generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationChaserProxy extends X3DChaserNodeProxy
{

}

/** OrientationDamper generates a series of 4-tuple axis-angle SFRotation values that progressively change from initial value to destination value. */
interface OrientationDamperProxy extends X3DDamperNodeProxy
{

}

/** OrientationInterpolator generates a series of 4-tuple axis-angle SFRotation values. */
interface OrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** OrthoViewpoint provides an orthographic perspective-free view of a scene from a specific location and direction. */
interface OrthoViewpointProxy extends X3DViewpointNodeProxy
{

}

/** OscillatorSource node represents an audio source generating a periodic waveform, providing a constant tone. */
interface OscillatorSourceProxy extends X3DSoundSourceNodeProxy
{

}

/** PackagedShader can contain field declarations, but no CDATA section of plain-text source code. */
interface PackagedShaderProxy extends X3DShaderNodeProxy
{

}

/** ParticleSystem specifies a complete particle system. */
interface ParticleSystemProxy extends X3DShapeNodeProxy
{

}

/** PeriodicWave defines a periodic waveform that can be used to shape the output of an Oscillator. */
interface PeriodicWaveProxy extends X3DSoundNodeProxy
{

}

/** PhysicalMaterial specifies surface rendering properties for associated geometry nodes. */
interface PhysicalMaterialProxy extends X3DOneSidedMaterialNodeProxy
{

}

/** PickableGroup is a Grouping node that can contain most nodes. */
interface PickableGroupProxy extends X3DGroupingNodeProxy, X3DPickableObjectProxy
{

}

/** PixelTexture creates a 2D-image texture map using a numeric array of pixel values. */
interface PixelTextureProxy extends X3DTexture2DNodeProxy
{

}

/** PixelTexture3D defines a 3D image-based texture map as an explicit array of pixel values (image field). */
interface PixelTexture3DProxy extends X3DTexture3DNodeProxy
{

}

/** PlaneSensor converts pointing device motion into 2D translation parallel to the local Z=0 plane. */
interface PlaneSensorProxy extends X3DDragSensorNodeProxy
{

}

/** PointEmitter generates particles from a specific point in space using the specified direction and speed. */
interface PointEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface PointLightProxy extends X3DLightNodeProxy
{

}

/** PointPickSensor tests one or more pickingGeometry points in space as lying inside the provided pickTarget geometry. */
interface PointPickSensorProxy extends X3DPickSensorNodeProxy
{

}

/** PointProperties allows precise fine-grained control over the rendering style of PointSet node points inside the same Shape. */
interface PointPropertiesProxy extends X3DAppearanceChildNodeProxy
{

}

/** PointSet is a node that contains a set of colored 3D points, represented by contained Color|ColorRGBA and Coordinate|CoordinateDouble nodes. */
interface PointSetProxy extends X3DGeometryNodeProxy
{

}

/** Polyline2D is a geometry node that defines a connected set of vertices in a contiguous set of line segments in X-Y plane. */
interface Polyline2DProxy extends X3DGeometryNodeProxy
{

}

/** PolylineEmitter emits particles along a single polyline. */
interface PolylineEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** Polypoint2D is a geometry node that defines a set of 2D points in X-Y plane. */
interface Polypoint2DProxy extends X3DGeometryNodeProxy
{

}

/** PositionChaser generates a series of position values that progressively change from initial value to destination value. */
interface PositionChaserProxy extends X3DChaserNodeProxy
{

}

/** PositionChaser2D generates a series of 2D position values that progressively change from initial value to destination value. */
interface PositionChaser2DProxy extends X3DChaserNodeProxy
{

}

/** PositionDamper generates a series of position values that progressively change from initial value to destination value. */
interface PositionDamperProxy extends X3DDamperNodeProxy
{

}

/** PositionDamper2D generates a series of 2D floating-point values that progressively change from initial value to destination value. */
interface PositionDamper2DProxy extends X3DDamperNodeProxy
{

}

/** PositionInterpolator generates a series of 3-tuple SFVec3f values. */
interface PositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** PositionInterpolator2D generates a series of SFVec2f values. */
interface PositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{

}

/** If a non-uniform scale is applied to the pick sensor, correct results may require level 3 support. */
interface PrimitivePickSensorProxy extends X3DPickSensorNodeProxy
{

}

/** ProgramShader contains no field declarations and no plain-text source code. */
interface ProgramShaderProxy extends X3DShaderNodeProxy
{

}

/** ProjectionVolumeStyle uses voxel data to directly generate output color. */
interface ProjectionVolumeStyleProxy extends X3DVolumeRenderStyleNodeProxy
{

}

/** ProtoInstance can override field default values via fieldValue initializations. Non-recursive nested ProtoInstance and ProtoDeclare statements are allowed within a ProtoDeclare. */
interface ProtoInstanceProxy extends X3DPrototypeInstanceProxy, X3DChildNodeProxy
{

}

/** ProximitySensor generates events when the viewer enters, exits and moves within a region of space (defined by a box). */
interface ProximitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{

}

/** QuadSet is a geometry node that defines quadrilaterals. */
interface QuadSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** ReceiverPdu is a networked Protocol Data Unit (PDU) information node that transmits the state of radio frequency (RF) receivers modeled in a simulation. */
interface ReceiverPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{

}

/** Rectangle2D is a geometry node that defines a 2D rectangle in X-Y plane. */
interface Rectangle2DProxy extends X3DGeometryNodeProxy
{

}

/** RigidBody describes a collection of shapes with a mass distribution that is affected by the physics model. */
interface RigidBodyProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** RigidBodyCollection represents a system of bodies that interact within a single physics model. */
interface RigidBodyCollectionProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** ScalarChaser generates a series of single floating-point values that progressively change from initial value to destination value. */
interface ScalarChaserProxy extends X3DChaserNodeProxy
{

}

/** ScalarDamper generates a series of floating-point values that progressively change from initial value to destination value. */
interface ScalarDamperProxy extends X3DDamperNodeProxy
{

}

/** ScalarInterpolator generates piecewise-linear SFFloat values. */
interface ScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** ScreenFontStyle is an X3DFontStyleNode defines the size, family, justification, and other styles used within a screen layout. */
interface ScreenFontStyleProxy extends X3DFontStyleNodeProxy
{

}

/** ScreenGroup is a Grouping node that can contain most nodes. */
interface ScreenGroupProxy extends X3DGroupingNodeProxy
{

}

/** Script contains author-programmed event behaviors for a scene. */
interface ScriptProxy extends X3DScriptNodeProxy
{

}

/** SegmentedVolumeData displays a segmented voxel dataset with different RenderStyle nodes. */
interface SegmentedVolumeDataProxy extends X3DVolumeDataNodeProxy
{

}

/** All fields fully supported except shadows supported with at least Phong shading at level 3. All fields fully supported with at least Phong shading and Henyey-Greenstein phase function, shadows fully supported at level 4. */
interface ShadedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** ShaderPart can contain a CDATA section of plain-text source code. */
interface ShaderPartProxy extends X3DNodeProxy, X3DUrlObjectProxy
{

}

/** ShaderProgram can contain field declarations and a CDATA section of plain-text source code. */
interface ShaderProgramProxy extends X3DNodeProxy
{

}

/** Shape can appear under any grouping node. */
interface ShapeProxy extends X3DShapeNodeProxy
{

}

/** SignalPdu is a networked Protocol Data Unit (PDU) information node that communicates the transmission of voice, audio or other data modeled in a simulation. */
interface SignalPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{

}

/** SilhouetteEnhancementVolumeStyle specifies that volumetric data is rendered with silhouette enhancement. */
interface SilhouetteEnhancementVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** SingleAxisHingeJoint has single axis about which to rotate, similar to a traditional door hinge. Contains two RigidBody nodes (containerField values body1, body2). */
interface SingleAxisHingeJointProxy extends X3DRigidJointNodeProxy
{

}

/** SliderJoint constrains all movement between body1 and body2 along a single axis. Contains two RigidBody nodes (containerField values body1, body2). */
interface SliderJointProxy extends X3DRigidJointNodeProxy
{

}

/** The Sound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SoundProxy extends X3DSoundNodeProxy
{

}

/** The SpatialSound node controls the 3D spatialization of sound playback by a child AudioClip or MovieTexture node. */
interface SpatialSoundProxy extends X3DSoundNodeProxy
{

}

/** Sphere is a geometry node, representing a perfectly round geometrical object that is the surface of a completely round ball. */
interface SphereProxy extends X3DGeometryNodeProxy
{

}

/** SphereSensor converts pointing device motion into a spherical rotation about the origin of the local coordinate system. */
interface SphereSensorProxy extends X3DDragSensorNodeProxy
{

}

/** SplinePositionInterpolator performs non-linear interpolation among paired lists of 3-tuple values and velocities to produce an SFVec3f value_changed output event. */
interface SplinePositionInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** SplinePositionInterpolator2D performs non-linear interpolation among paired lists of 2-tuple values and velocities to produce an SFVec2f value_changed output event. */
interface SplinePositionInterpolator2DProxy extends X3DInterpolatorNodeProxy
{

}

/** SplineScalarInterpolator performs non-linear interpolation among paired lists of float values and velocities to produce an SFFloat value_changed output event. */
interface SplineScalarInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** Linear attenuation may occur at level 2, full support at level 3. */
interface SpotLightProxy extends X3DLightNodeProxy
{

}

/** SquadOrientationInterpolator performs non-linear interpolation among paired lists of rotation values to produce an SFRotation value_changed output event. */
interface SquadOrientationInterpolatorProxy extends X3DInterpolatorNodeProxy
{

}

/** StaticGroup is similar to Group node but does not allow access to children after creation time. */
interface StaticGroupProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** StreamAudioDestination node represents the final audio destination via a media stream. */
interface StreamAudioDestinationProxy extends X3DSoundDestinationNodeProxy
{

}

/** StreamAudioSource operates as an audio source whose media is received from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs. */
interface StreamAudioSourceProxy extends X3DSoundSourceNodeProxy
{

}

/** StringSensor generates events as the user presses keys on the keyboard. */
interface StringSensorProxy extends X3DKeyDeviceSensorNodeProxy
{

}

/** SurfaceEmitter generates particles from the surface of an object. */
interface SurfaceEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** Switch is a Grouping node that only renders one (or zero) child at a time. */
interface SwitchProxy extends X3DGroupingNodeProxy
{

}

/** TexCoordChaser2D generates a series of single floating-point values that progressively change from initial value to destination value. */
interface TexCoordChaser2DProxy extends X3DChaserNodeProxy
{

}

/** TexCoordDamper2D generates a series of 2D floating-point arrays that progressively change from initial value to destination value. */
interface TexCoordDamper2DProxy extends X3DDamperNodeProxy
{

}

/** Text is a 2D (flat) geometry node that can contain multiple lines of string values. */
interface TextProxy extends X3DGeometryNodeProxy
{

}

/** TextureBackground simulates ground and sky, using vertical arrays of wraparound color values, TextureBackground can also provide backdrop texture images on all six sides. */
interface TextureBackgroundProxy extends X3DBackgroundNodeProxy
{

}

/** TextureCoordinate specifies 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateProxy extends X3DSingleTextureCoordinateNodeProxy
{

}

/** TextureCoordinate3D specifies a set of 3D texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate3DProxy extends X3DSingleTextureCoordinateNodeProxy
{

}

/** TextureCoordinate4D specifies a set of 4D (homogeneous 3D) texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices. */
interface TextureCoordinate4DProxy extends X3DSingleTextureCoordinateNodeProxy
{

}

/** TextureCoordinateGenerator computes 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to NURBS surfaces). */
interface TextureCoordinateGeneratorProxy extends X3DSingleTextureCoordinateNodeProxy
{

}

/** TextureProjector is similar to a light that projects a texture into the scene, illuminating geometry that intersects the perspective projection volume. */
interface TextureProjectorProxy extends X3DTextureProjectorNodeProxy
{

}

/** TextureProjectorParallel is similar to a light that projects a texture into the scene, illuminating geometry that intersects the parallel projection volume. */
interface TextureProjectorParallelProxy extends X3DTextureProjectorNodeProxy
{

}

/** TextureProperties allows precise fine-grained control over application of image textures to geometry. */
interface TexturePropertiesProxy extends X3DNodeProxy
{

}

/** TextureTransform shifts 2D texture coordinates for positioning, orienting and scaling image textures on geometry. */
interface TextureTransformProxy extends X3DTextureTransformNodeProxy
{

}

/** TextureTransform3D applies a 3D transformation to texture coordinates. */
interface TextureTransform3DProxy extends X3DTextureTransformNodeProxy
{

}

/** TextureTransformMatrix3D applies a 3D transformation to texture coordinates. */
interface TextureTransformMatrix3DProxy extends X3DTextureTransformNodeProxy
{

}

/** TimeSensor continuously generates events as time passes. */
interface TimeSensorProxy extends X3DTimeDependentNodeProxy, X3DSensorNodeProxy
{

}

/** TimeTrigger converts boolean true events to time events. */
interface TimeTriggerProxy extends X3DTriggerNodeProxy
{

}

/** ToneMappedVolumeStyle specifies that volumetric data is rendered with Gooch shading model of two-toned warm/cool coloring. */
interface ToneMappedVolumeStyleProxy extends X3DComposableVolumeRenderStyleNodeProxy
{

}

/** TouchSensor tracks location and state of the pointing device, detecting when a user points at or selects (activates) geometry. */
interface TouchSensorProxy extends X3DTouchSensorNodeProxy
{

}

/** Transform is a Grouping node that can contain most nodes. */
interface TransformProxy extends X3DGroupingNodeProxy
{

}

/** TransformSensor generates output events when its targetObject enters, exits, and moves within a region in space (defined by a box). */
interface TransformSensorProxy extends X3DEnvironmentalSensorNodeProxy
{

}

/** TransmitterPdu is a networked Protocol Data Unit (PDU) information node that provides detailed information about a radio transmitter modeled in a simulation. */
interface TransmitterPduProxy extends X3DNetworkSensorNodeProxy, X3DBoundedObjectProxy
{

}

/** TriangleFanSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleFanSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** TriangleSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** TriangleSet2D is a geometry node that defines a set of filled 2D triangles in X-Y plane. */
interface TriangleSet2DProxy extends X3DGeometryNodeProxy
{

}

/** TriangleStripSet is a geometry node containing a Coordinate|CoordinateDouble node, and can also contain Color|ColorRGBA, Normal and TextureCoordinate nodes. */
interface TriangleStripSetProxy extends X3DComposedGeometryNodeProxy
{

}

/** TwoSidedMaterial specifies surface rendering properties for associated geometry nodes, for outer (front) and inner (back) sides of polygons. */
interface TwoSidedMaterialProxy extends X3DMaterialNodeProxy
{

}

/** UniversalJoint is like a BallJoint that constrains an extra degree of rotational freedom. */
interface UniversalJointProxy extends X3DRigidJointNodeProxy
{

}

/** UnlitMaterial specifies surface rendering properties for associated geometry nodes. */
interface UnlitMaterialProxy extends X3DOneSidedMaterialNodeProxy
{

}

/** Viewpoint provides a specific location and direction where the user may view the scene. */
interface ViewpointProxy extends X3DViewpointNodeProxy
{

}

/** ViewpointGroup can contain Viewpoint, OrthoViewpoint, GeoViewpoint and other ViewpointGroup nodes for better user-navigation support with a shared description on the viewpoint list. */
interface ViewpointGroupProxy extends X3DChildNodeProxy
{

}

/** Viewport is a Grouping node that can contain most nodes. */
interface ViewportProxy extends X3DViewportNodeProxy
{

}

/** VisibilitySensor detects when user can see a specific object or region as they navigate the world. */
interface VisibilitySensorProxy extends X3DEnvironmentalSensorNodeProxy
{

}

/** VolumeData displays a simple non-segmented voxel dataset with a single RenderStyle node. */
interface VolumeDataProxy extends X3DVolumeDataNodeProxy
{

}

/** VolumeEmitter emits particles from a random position confined within the given closed geometry volume. */
interface VolumeEmitterProxy extends X3DParticleEmitterNodeProxy
{

}

/** VolumePickSensor tests picking intersections using the pickingGeometry against the pickTarget geometry volume. */
interface VolumePickSensorProxy extends X3DPickSensorNodeProxy
{

}

/** WaveShaper node represents a nonlinear distorter that applies a wave-shaping distortion curve to the signal. */
interface WaveShaperProxy extends X3DSoundProcessingNodeProxy
{

}

/** WindPhysicsModel applies a wind effect to the particles. */
interface WindPhysicsModelProxy extends X3DParticlePhysicsModelNodeProxy
{

}

/** WorldInfo contains a title and simple persistent metadata information about an X3D scene. This node is strictly for documentation purposes and has no effect on the visual appearance or behaviour of the world. */
interface WorldInfoProxy extends X3DInfoNodeProxy
{

}

/** Nodes of this type can be used as child nodes for Appearance. */
interface X3DAppearanceChildNodeProxy extends X3DNodeProxy
{

}

/** Base type for all Appearance nodes. */
interface X3DAppearanceNodeProxy extends X3DNodeProxy
{

}

/** Abstract type from which all backgrounds inherit, also defining a background binding stack. */
interface X3DBackgroundNodeProxy extends X3DBindableNodeProxy
{

}

/** Bindable nodes implement the binding stack, so that only one of each node type is active at a given time. */
interface X3DBindableNodeProxy extends X3DChildNodeProxy
{

}

/** X3DBoundedObject indicates that bounding box values can be provided (or computed) to encompass this node and any children. */
interface X3DBoundedObjectProxy
{

}

/** The X3DChaserNode abstract node type calculates the output on value_changed as a finite impulse response (FIR) based on the events received on set_destination field. */
interface X3DChaserNodeProxy extends X3DFollowerNodeProxy
{

}

/** A node that implements X3DChildNode is one of the legal children for a X3DGroupingNode parent. */
interface X3DChildNodeProxy extends X3DNodeProxy
{

}

/** Base type for color specifications in X3D. */
interface X3DColorNodeProxy extends X3DGeometricPropertyNodeProxy
{

}

/** The X3DComposableVolumeRenderStyleNode abstract node type is the base type for all node types that allow rendering styles to be sequentially composed together to form a single renderable output. */
interface X3DComposableVolumeRenderStyleNodeProxy extends X3DVolumeRenderStyleNodeProxy
{

}

/** Composed geometry nodes produce renderable geometry, can contain Color Coordinate Normal TextureCoordinate, and are contained by a Shape node. */
interface X3DComposedGeometryNodeProxy extends X3DGeometryNodeProxy
{

}

/** Base type for all coordinate node types in X3D. */
interface X3DCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{

}

/** The X3DDamperNode abstract node type creates an IIR response that approaches the destination value according to the shape of the e-function only asymptotically but very quickly. */
interface X3DDamperNodeProxy extends X3DFollowerNodeProxy
{

}

/** Base type for all drag-style pointing device sensors. */
interface X3DDragSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{

}

/** Base type for the environmental sensor nodes ProximitySensor, TransformSensor and VisibilitySensor. */
interface X3DEnvironmentalSensorNodeProxy extends X3DSensorNodeProxy
{

}

/** Base type for all nodes that specify cubic environment map sources for texture images. */
interface X3DEnvironmentTextureNodeProxy extends X3DTextureNodeProxy
{

}

/** Abstract type describing a node that influences the lighting equation through the use of fog semantics. */
interface X3DFogObjectProxy
{

}

/** X3DFollowerNode is the abstract base class for all nodes in the Followers component. */
interface X3DFollowerNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all font style nodes. */
interface X3DFontStyleNodeProxy extends X3DNodeProxy
{

}

/** Base type for all geometric property node types. */
interface X3DGeometricPropertyNodeProxy extends X3DNodeProxy
{

}

/** Geometry nodes produce renderable geometry and are contained by a Shape node. */
interface X3DGeometryNodeProxy extends X3DNodeProxy
{

}

/** Grouping nodes can contain other nodes as children, thus making up the backbone of a scene graph. */
interface X3DGroupingNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** Base type for all nodes that contain only information without visual semantics. */
interface X3DInfoNodeProxy extends X3DChildNodeProxy
{

}

/** Interpolator nodes are designed for linear keyframed animation. Interpolators are driven by an input key ranging [0..1] and produce corresponding piecewise-linear output functions. */
interface X3DInterpolatorNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all sensor node types that operate using key devices. */
interface X3DKeyDeviceSensorNodeProxy extends X3DSensorNodeProxy
{

}

/** The X3DLayerNode abstract node type is the base node type for layer nodes. */
interface X3DLayerNodeProxy extends X3DNodeProxy, X3DPickableObjectProxy
{

}

/** X3DLayoutNode is the base node type for layout nodes. */
interface X3DLayoutNodeProxy extends X3DChildNodeProxy
{

}

/** Light nodes provide illumination for rendering geometry in the scene. Implementing nodes must include a global field with type SFBool and accessType inputOutput. */
interface X3DLightNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all Material nodes. */
interface X3DMaterialNodeProxy extends X3DAppearanceChildNodeProxy
{

}

/** Each node inheriting the X3DMetadataObject interface contains a single array of strictly typed values: MFBool, MFInt32, MFFloat, MFDouble, MFString, or MFNode, the latter having children that are all Metadata nodes. */
interface X3DMetadataObjectProxy
{

}

/** The X3DNBodyCollidableNode abstract node type represents objects that act as the interface between the rigid body physics, collision geometry proxy, and renderable objects in the scene graph hierarchy. */
interface X3DNBodyCollidableNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** The X3DNBodyCollisionSpaceNode abstract node type represents objects that act as a self-contained spatial collection of objects that can interact through collision detection routines. */
interface X3DNBodyCollisionSpaceNodeProxy extends X3DNodeProxy, X3DBoundedObjectProxy
{

}

/** Base typefor all sensors that generate events based on network activity. */
interface X3DNetworkSensorNodeProxy extends X3DSensorNodeProxy
{

}

/** All instantiable nodes implement X3DNode, which corresponds to SFNode type in the X3D specification. */
interface X3DNodeProxy extends SFNodeProxy
{

}

/** Base type for all normal node types in X3D. */
interface X3DNormalNodeProxy extends X3DGeometricPropertyNodeProxy
{

}

/** Base type for all nodes that provide control curve information in 2D space. */
interface X3DNurbsControlCurveNodeProxy extends X3DNodeProxy
{

}

/** Abstract geometry type for all types of NURBS surfaces. */
interface X3DNurbsSurfaceGeometryNodeProxy extends X3DParametricGeometryNodeProxy
{

}

/** Base type for material nodes that describe how the shape looks like from one side. A different number of contanied texture nodes are allowed by each of the implementing nodes. */
interface X3DOneSidedMaterialNodeProxy extends X3DMaterialNodeProxy
{

}

/** Base type for all geometry node types that are created parametrically and use control points to describe the final shape of the surface. */
interface X3DParametricGeometryNodeProxy extends X3DGeometryNodeProxy
{

}

/** The X3DParticleEmitterNode abstract type represents any node that is an emitter of particles. */
interface X3DParticleEmitterNodeProxy extends X3DNodeProxy
{

}

/** The X3DParticlePhysicsModelNode abstract type represents any node that applies a form of constraints on the particles after they have been generated. */
interface X3DParticlePhysicsModelNodeProxy extends X3DNodeProxy
{

}

/** The X3DPickableObject abstract interface marks a node as being capable of having customized picking performed on its contents or children. */
interface X3DPickableObjectProxy
{

}

/** The X3DPickSensorNode abstract node type is the base node type that represents the lowest common denominator of picking capabilities. */
interface X3DPickSensorNodeProxy extends X3DSensorNodeProxy
{

}

/** Base type for all pointing device sensors. */
interface X3DPointingDeviceSensorNodeProxy extends X3DSensorNodeProxy
{

}

/** Base type marking nodes that are valid product structure children for the CADGeometry component. */
interface X3DProductStructureChildNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all nodes that specify arbitrary fields for interfacing with per-object attribute values. */
interface X3DProgrammableShaderObjectProxy
{

}

/** Base type for all prototype instances. Note that direct children nodes are disallowed, instead let fieldValue with type SFNode/MFNode contain them. Current practice is that, if desired, prototype authors must explicitly add the metadata SFNode field in the ProtoInterface. */
interface X3DPrototypeInstanceProxy extends X3DNodeProxy
{

}

/** The X3DRigidJointNode abstract node type is the base type for all joint types. */
interface X3DRigidJointNodeProxy extends X3DNodeProxy
{

}

/** Base type for scripting nodes (but not shader nodes). */
interface X3DScriptNodeProxy extends X3DChildNodeProxy, X3DUrlObjectProxy
{

}

/** Base type for all sensors. */
interface X3DSensorNodeProxy extends X3DChildNodeProxy
{

}

/** Base type from which all Sequencers are derived. */
interface X3DSequencerNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all nodes that specify a programmable shader. */
interface X3DShaderNodeProxy extends X3DAppearanceChildNodeProxy
{

}

/** Base type for all Shape nodes. */
interface X3DShapeNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** Base type for all texture coordinate nodes which specify texture coordinates for a single texture. */
interface X3DSingleTextureCoordinateNodeProxy extends X3DTextureCoordinateNodeProxy
{

}

/** Base type for all texture node types that define a single texture. A single texture can be used to influence a parameter of various material nodes in the Shape component, and it can be a child of MultiTexture. */
interface X3DSingleTextureNodeProxy extends X3DTextureNodeProxy
{

}

/** Base type for all texture transform nodes which specify texture coordinate transformation for a single texture. */
interface X3DSingleTextureTransformNodeProxy extends X3DTextureTransformNodeProxy
{

}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundChannelNodeProxy extends X3DSoundNodeProxy
{

}

/** Base type for all sound destination nodes, which represent the final destination of an audio signal and are what the user can ultimately hear. */
interface X3DSoundDestinationNodeProxy extends X3DSoundNodeProxy
{

}

/** Base type for all sound nodes. */
interface X3DSoundNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all sound processing nodes, which are used to enhance audio with filtering, delaying, changing gain, etc. */
interface X3DSoundProcessingNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{

}

/** Nodes implementing X3DSoundSourceNode provide signal inputs to the audio graph. */
interface X3DSoundSourceNodeProxy extends X3DTimeDependentNodeProxy, X3DSoundNodeProxy
{

}

/** X3DStatement is a marker interface that identifies statements relating to nonrenderable scene graph structure. X3DStatement does not extend from any other node type since it is not an explicit part of the X3D node interface hierarchy, and DEF/USE is not appropriate for such statements. */
interface X3DStatementProxy
{

}

/** Base type for all nodes which specify 2D sources for texture images. */
interface X3DTexture2DNodeProxy extends X3DSingleTextureNodeProxy
{

}

/** Base type for all nodes that specify 3D sources for texture images. */
interface X3DTexture3DNodeProxy extends X3DTextureNodeProxy
{

}

/** Base type for all nodes which specify texture coordinates. */
interface X3DTextureCoordinateNodeProxy extends X3DGeometricPropertyNodeProxy
{

}

/** Base type for all nodes which specify sources for texture images. */
interface X3DTextureNodeProxy extends X3DAppearanceChildNodeProxy
{

}

/** Base type for all node types that specify texture projector nodes, which provide a form of lighting. */
interface X3DTextureProjectorNodeProxy extends X3DLightNodeProxy
{

}

/** Base type for all nodes which specify a transformation of texture coordinates. */
interface X3DTextureTransformNodeProxy extends X3DAppearanceChildNodeProxy
{

}

/** Base type from which all time-dependent nodes are derived. */
interface X3DTimeDependentNodeProxy extends X3DChildNodeProxy
{

}

/** Base type for all touch-style pointing device sensors. */
interface X3DTouchSensorNodeProxy extends X3DPointingDeviceSensorNodeProxy
{

}

/** Base type from which all trigger nodes are derived. */
interface X3DTriggerNodeProxy extends X3DChildNodeProxy
{

}

/** X3DUrlObject indicates that a node has content loaded from a Uniform Resource Locator (URL) and can be tracked via a LoadSensor. Such child nodes have containerField='children' to indicate their relationship to the parent LoadSensor node. */
interface X3DUrlObjectProxy
{

}

/** Base type for all nodes that specify per-vertex attribute information to the shader. */
interface X3DVertexAttributeNodeProxy extends X3DGeometricPropertyNodeProxy
{

}

/** Node type X3DViewpointNode defines a specific location in the local coordinate system from which the user may view the scene, and also defines a viewpoint binding stack. */
interface X3DViewpointNodeProxy extends X3DBindableNodeProxy
{

}

/** The X3DViewportNode abstract node type is the base node type for viewport nodes. */
interface X3DViewportNodeProxy extends X3DGroupingNodeProxy
{

}

/** The X3DVolumeDataNode abstract node type is the base type for all node types that describe volumetric data to be rendered. */
interface X3DVolumeDataNodeProxy extends X3DChildNodeProxy, X3DBoundedObjectProxy
{

}

/** The X3DVolumeRenderStyleNode abstract node type is the base type for all node types that specify a specific visual rendering style to be used when rendering volume data. */
interface X3DVolumeRenderStyleNodeProxy extends X3DNodeProxy
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
