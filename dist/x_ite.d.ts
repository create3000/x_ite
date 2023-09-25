declare const X3D: X3D;
export default X3D;
export interface X3D {
   (callback?: () => void, fallback?: (error: Error) => void): Promise<void>;
   createBrowser(): X3DCanvasElement;
   getBrowser(via?: string | X3DCanvasElement): X3DBrowser;
   noConflict(): X3D;
   X3DConstants: X3DConstants;
   SFBool(arg: unknown): boolean;
   // NB. in all of the following `typeof Class` is an expression that
   // extracts the type of the constructor for Class.
   SFColor: typeof SFColor;
   SFColorRGBA: typeof SFColorRGBA;
   // Doubles and floats not different in JavaScript:
   SFDouble: typeof SFDouble;
   SFFloat: typeof SFDouble;

   SFImage: typeof SFImage;
   SFInt32: typeof SFInt32;

   // Doubles and floats same:
   SFMatrix3d: typeof SFMatrix3;
   SFMatrix3f: typeof SFMatrix3;
   SFMatrix4d: typeof SFMatrix4;
   SFMatrix4f: typeof SFMatrix4;

   // SFNode: typeof SFNode; // no working constructors, just one that throws
   SFRotation: typeof SFRotation;
   SFString: typeof SFString;
   SFTime: typeof SFTime;

   // Doubles and floats same:
   SFVec2d: typeof SFVec2;
   SFVec2f: typeof SFVec2;
   SFVec3d: typeof SFVec3;
   SFVec3f: typeof SFVec3;
   SFVec4d: typeof SFVec4;
   SFVec4f: typeof SFVec4;

   // All the array types:
   MFBool: typeof X3DArrayField<boolean>;
   MFColor: typeof X3DArrayField<SFColor>;
   MFColorRGBA: typeof X3DArrayField<SFColorRGBA>;
   MFDouble: typeof X3DArrayField<number>;
   MFFloat: typeof X3DArrayField<number>;
   MFImage: typeof X3DArrayField<SFImage>;
   MFMatrix3d: typeof X3DArrayField<SFMatrix3>;
   MFMatrix3f: typeof X3DArrayField<SFMatrix3>;
   MFMatrix4d:  typeof X3DArrayField<SFMatrix4>;
   MFMatrix4f:  typeof X3DArrayField<SFMatrix4>;
   MFInt32: typeof X3DArrayField<number>;
   MFNode: typeof X3DArrayField<SFNode>;
   MFRotation: typeof X3DArrayField<SFRotation>;
   MFString: typeof X3DArrayField<string>;
   MFTime: typeof X3DArrayField<SFTime>;
   MFVec2d: typeof X3DArrayField<SFVec2>;
   MFVec2f: typeof X3DArrayField<SFVec2>;
   MFVec3d: typeof X3DArrayField<SFVec3>;
   MFVec3f: typeof X3DArrayField<SFVec3>;
   MFVec4d: typeof X3DArrayField<SFVec4>;
   MFVec4f: typeof X3DArrayField<SFVec4>;
}

export interface X3DCanvasElement extends HTMLElement {
   readonly browser: X3DBrowser;
}

type JSONValue =
   | string
   | number
   | boolean
   | null
   | JSONValue[]
   | {[key: string]: JSONValue}

interface JSONObject {
   [k: string]: JSONValue
}

type BrowserProperty = 'ABSTRACT_NODES'
   | 'CONCRETE_NODES'
   | 'EXTERNAL_INTERACTIONS'
   | 'PROTOTYPE_CREATE'
   | 'DOM_IMPORT'
   | 'XML_ENCODING'
   | 'CLASSIC_VRML_ENCODING'
   | 'BINARY_ENCOIDING';

type QualityLevels = 'LOW' | 'MEDIUM' | 'HIGH';
type BrowserOption = {
   Antialiased:                  boolean,
   Dashboard:                    boolean,
   Rubberband:                   boolean,
   EnableInlineViewpoints:       boolean,
   MotionBlur:                   boolean,
   PrimitiveQuality:             QualityLevels,
   QualityWhenMoving:            QualityLevels | 'SAME',
   Shading:	                    'POINT' | 'WIREFRAME' | 'FLAT'
                                    | 'GOURAUD' | 'PHONG',
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
export type RenderingProperty = {
   Shading:	              BrowserOption['Shading'],
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

type BrowserCallback = (
   event: number) => void; // event is a Browser Event Constant

export interface X3DBrowser {
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

   replaceWorld(scene: X3DScene): Promise<void>;
   createX3DFromString(x3dSyntax: string): Promise<X3DScene>;
   createX3DFromURL(url: X3DArrayField<string>): Promise<X3DScene>;
   createX3DFromURL(url: X3DArrayField<string>,
                    node: SFNode, fieldName: string): void;
   loadURL(url: X3DArrayField<string>,
           parameter?: X3DArrayField<string>): Promise<void>;
   importDocument(dom: HTMLElement | string): Promise<X3DScene>;
   importJS(json: string | JSONObject): Promise<X3DScene>;
   getBrowserProperty(prop: BrowserProperty): boolean;
   getBrowserOption<T extends keyof BrowserOption>(op: T): BrowserOption[T];
   setBrowserOption<T extends keyof BrowserOption>(
      op: T, value: BrowserOption[T]): void;
   getRenderingProperty<T extends keyof RenderingProperty>(
      prop: T): RenderingProperty[T];
   getContextMenu(): XiteContextMenu;
   addBrowserCallback(key: unknown, cb?: BrowserCallback): void;
   addBrowserCallback(
      key: unknown, event: number, // A Browser Event Constant
      cb?: BrowserCallback): void;
   removeBrowserCallback(key: unknown, event?: number): void;
   viewAll(layer?: SFNode, transitionTime?: number): void;
   nextViewpoint(layer?: SFNode): void;
   previousViewpoint(layer?: SFNode): void;
   firstViewpoint(layer?: SFNode): void;
   lastViewpoint(layer?: SFNode): void;
   changeViewpoint(name: string): void;
   changeViewpoint(layer: SFNode, name: string): void;
   print(thing: unknown): void;
   printLn(thing: unknown): void;
   // VRML methods
   getName(): string;
   getVersion(): string;
   getCurrentSpeed(): number;
   getCurrentFrameRate(): number;
   getWorldURL(): string;
   replaceWorld(nodes: X3DArrayField<SFNode>): string;
   createVrmlFromString(vrmlSyntax: string): X3DArrayField<SFNode>;
   createVrmlFromURL(url: X3DArrayField<string>,
                     node: SFNode, fieldName: string): void;
   addRoute(sourceNode: SFNode, sourceField: string,
            destinationNode: SFNode, destinationField: string): void;
   deleteRoute(sourceNode: SFNode, sourceField: string,
               destinationNode: SFNode, destinationField: string): void;
   loadURL(url: X3DArrayField<string>,
           parameter?: X3DArrayField<string>): void;
   setDescription(description: string): void;
}

type MinimalArray<T> = {[index: number]: T, length: number}

type ComponentInfoArray = MinimalArray<ComponentInfo>;
interface ComponentInfo {
   readonly name: string;
   readonly level: number;
   readonly title: string;
   readonly providerURL: string;
}

type ProfileInfoArray = MinimalArray<ProfileInfo>;
interface ProfileInfo {
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
   classNames?: Record<string, string>,
   animation?: {duration: number, show: string, hide: string},
   events?: Record<string, (opt: JQueryCtxMenuOpts) => boolean>,
   position?: (opt: unknown, x?: number|string, y?: number|string) => void,
   determinePosition?: (menu: unknown) => void,
   callback?: MenuCallback,
   build?: ($triggerElement: unknown, e: Event) => JQueryCtxMenuOpts,
   itemClickEvent?: string
}

type UserMenuCallback = () => UserMenuItems
type UserMenuItems = Record<string, UserMenuItem>
type MenuCallback = (
   itemKey: string, opt: JQueryCtxMenuOpts, event: Event) => (boolean | void)
type MenuIconCallback = (
   opt: JQueryCtxMenuOpts, $itemElement: HTMLElement,
   itemKey: string, item: unknown) => string
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
   events?: Record<string, unknown>,
   value?: string,
   selected?: boolean | string,
   radio?: string,
   options?: Record<string|number, string>,
   height?: number,
   items?: UserMenuItems,
   accesskey?: string,
   dataAttr?: Record<string, string>
}

interface XiteContextMenu {
   getUserMenu(): UserMenuCallback;
   setUserMenu(cb: UserMenuCallback): void;
}

export interface X3DScene {
   readonly specificationVersion: string;
   readonly encoding: 'ASCII' | 'VRML' | 'XML' | 'BINARY'
      | 'SCRIPTED' | 'BIFS' | 'NONE';
   readonly profile: ProfileInfo;
   readonly components: ComponentInfoArray;
   readonly units: UnitInfoArray;
   readonly worldURL: string;
   readonly baseURL: string;
   rootNodes: X3DArrayField<SFNode>;
   readonly protos: ProtoDeclarationArray;
   readonly externprotos: ExternProtoDeclarationArray;
   readonly routes: RouteArray;

   // ExecutionContext methods. I didn't split these out because I
   // didn't see a place in the interface where it mattered, but
   // perhaps there should be a base class with just these...
   createNode<T extends keyof SpecializeNodeType>(
      spec: T): SpecializeNodeType[T];
   createProto(protoName: string): SFNode;
   getNamedNode(name: string): SFNode;
   updateNamedNode(name: string, node: SFNode): void;
   removeNamedNode(name: string): void;
   getImportedNode(importedName: string): SFNode;
   updateImportedNode(
      inlineNode: SFNode, exportedName: string, importedName: string): void;
   removeImportedNode(importedName: string): void;
   addRoute(sourceNode: SFNode, sourceField: string,
            destinationNode: SFNode, destinationField: string): X3DRoute;
   deleteRoute(route: X3DRoute): void;

   // X3DScene methods:
   getMetaData(name: string): string[];
   setMetaData(name: string, value: string | string[]): void;
   addMetaData(name: string, value: string): void;
   removeMetaData(name: string): void;
   addRootNode(node: SFNode): void;
   removeRootNode(node: SFNode): void;
   getExportedNode(exportedName: string): SFNode;
   updateExportedNode(exportedName: string, node: SFNode): void;
   removeExportedNode(exportedName: string): void;
   toVRMLString(options?: VRMLOptions): string;
   toXMLString(options?: VRMLOptions): string;
   toJSONString(options?: VRMLOptions): string;
}

type UnitInfoArray = MinimalArray<UnitInfo>;
interface UnitInfo {
   readonly category: string;
   readonly name: string;
   readonly conversionFactor: number;
}

type ProtoDeclarationArray = MinimalArray<X3DProtoDeclaration>;
export interface X3DProtoDeclaration {
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   isExternProto: false;
   newInstance(): SFNode;
   toVRMLString(options?: VRMLOptions): string;
   toXMLString(options?: VRMLOptions): string;
   toJSONString(options?: VRMLOptions): string;
}

type ExternProtoDeclarationArray = MinimalArray<X3DExternProtoDeclaration>;
export interface X3DExternProtoDeclaration {
   readonly name: string;
   readonly fields: FieldDefinitionArray;
   readonly urls: X3DArrayField<string>;
   isExternProto: false;
   readonly loadState: number; // A Load State Constant from X3DConstants
   newInstance(): SFNode;
   loadNow(): Promise<void>;
   toVRMLString(options?: VRMLOptions): string;
   toXMLString(options?: VRMLOptions): string;
   toJSONString(options?: VRMLOptions): string;
}

type RouteArray = MinimalArray<X3DRoute>;
export interface X3DRoute {
   sourceNode: SFNode;
   sourceField: string;
   destinationNode: SFNode;
   destinationField: string;
}

type FieldCallback = (value: unknown) => void

declare class X3DField {
   equals(other: X3DField): boolean;
   assign(other: X3DField): void;
   setValue(value: unknown): void;
   getValue(): unknown;
   getType(): number; // one of the Field Type Constants from X3DConstants
   getAccessType(): number; // one of the Access Type Constants
   isInitializable(): boolean;
   isInput(): boolean;
   isOutput(): boolean;
   isReadable(): boolean;
   isWritable(): boolean;
   getUnit(): string;
   hasReferences(): boolean;
   isReference(accessType: number): boolean;
   addReferencesCallback(key: unknown, callback: FieldCallback): void;
   removeReferencesCallback(key: unknown): void;
   getReferencesCallbacks(): Map<unknown, FieldCallback>;
   addFieldInterest(other: X3DField): void;
   removeFieldInterest(other: X3DField): void;
   getFieldInterest(): Set<X3DField>
   addFieldCallback(key: unknown, callback: FieldCallback): void;
   removeFieldCallback(key: unknown): void;
   getFieldCallbacks(): Map<unknown, FieldCallback>;
   addInputRoute(route: X3DRoute): void;
   removeInputRoute(route: X3DRoute): void;
   getInputRoutes(): Set<X3DRoute>;
   addOutputRoute(route: X3DRoute): void;
   removeOutputRoute(route: X3DRoute): void;
   getOutputRoutes(): Set<X3DRoute>;
   addRouteCallback(key: unknown, callback: FieldCallback): void;
   removeRouteCallback(key: unknown): void;
   getRouteCallbacks(): Map<unknown, FieldCallback>;
   dispose(): void;
}

export class SFColor extends X3DField {
   constructor(r?: number, g?: number, b?: number);
   r: number;
   g: number;
   b: number;
   copy(): SFColor;
   isDefaultValue(): boolean;
   set(r: number, g: number, b: number): SFColor;
   getHSV(result: number[]): number[];
   setHSV(h: number, s: number, v: number): void;
   lerp(destination: SFColor, t: number): SFColor;
   static typeName: 'SFColor';
}

export class SFColorRGBA extends X3DField {
   constructor(r?: number, g?: number, b?: number, a?: number);
   r: number;
   g: number;
   b: number;
   a: number;
   copy(): SFColorRGBA;
   isDefaultValue(): boolean;
   set(r: number, g: number, b: number): SFColorRGBA;
   getHSVA(result: number[]): number[];
   setHSVA(h: number, s: number, v: number): void;
   lerp(destination: SFColor, t: number): SFColorRGBA;
   static typeName: 'SFColorRGBA';
}

export class SFDouble extends X3DField {
   constructor(arg?: unknown);
   copy(): SFDouble;
   isDefaultValue(): boolean;
   set(arg: unknown): void;
   valueOf(): number;
}

export class SFImage extends X3DField {
   constructor(width?: number, height?: number,
               num_components?: number, array?: number[]);
   x: number;
   y: number;
   width: number;
   height: number;
   comp: number;
   array: number[];
   copy(): SFImage;
   isDefaultValue(): boolean;
   set(other: SFImage): void;
}

export class SFInt32 extends X3DField {
   constructor(val?: number);
   copy(): SFInt32;
   set(val?: number): void;
   valueOf(): number;
}

export class SFMatrix3 extends X3DField {
   constructor();
   constructor(r1: SFVec3, r2: SFVec3, r3: SFVec3);
   constructor(a: number, b: number, c: number,
               d: number, e: number, f: number,
               g: number, h: number, i: number);
   copy(): SFMatrix3;
   isDefaultValue(): boolean;
   set(other: SFMatrix3): void;
   setTransform(translation: SFVec2, rotation: number, scaleFactor: SFVec2,
                scaleOrientation: number, center: SFVec2): void;
   getTransform(translation: SFVec2, rotation: SFDouble, scaleFactor: SFVec2,
                scaleOrientation: SFDouble, center: SFVec2): void;
   determinant(): number;
   inverse(): SFMatrix3;
   transpose(): SFMatrix3;
   multLeft(A: SFMatrix3): SFMatrix3;
   multRight(B: SFMatrix3): SFMatrix3;
   multVecMatrix(row: SFVec2): SFVec2;
   multVecMatrix(row: SFVec3): SFVec3;
   multMatrixVec(col: SFVec2): SFVec2;
   multMatrixVec(col: SFVec3): SFVec3;
   multDirMatrix(row: SFVec2): SFVec2;
   multMatrixDir(col: SFVec2): SFVec2;
}

export class SFMatrix4 extends X3DField {
   constructor();
   constructor(r1: SFVec4, r2: SFVec4, r3: SFVec4, r4: SFVec4);
   constructor(a: number, b: number, c: number, d: number,
               e: number, f: number, g: number, h: number,
               i: number, j: number, k: number, l: number,
               m: number, n: number, o: number, p: number);
   copy(): SFMatrix4;
   isDefaultValue(): boolean;
   set(other: SFMatrix4): void;
   setTransform(translation: SFVec3, rotation: SFRotation,
                scaleFactor: SFVec3, scaleOrientation: SFRotation,
                center: SFVec3): void;
   getTransform(translation: SFVec3, rotation: SFRotation,
                scaleFactor: SFVec3, scaleOrientation: SFRotation,
                center: SFVec3): void;
   determinant(): number;
   inverse(): SFMatrix4;
   transpose(): SFMatrix4;
   multLeft(A: SFMatrix4): SFMatrix4;
   multRight(B: SFMatrix4): SFMatrix4;
   multVecMatrix(row: SFVec4): SFVec4;
   multVecMatrix(row: SFVec3): SFVec3;
   multMatrixVec(col: SFVec4): SFVec4;
   multMatrixVec(col: SFVec3): SFVec3;
   multDirMatrix(row: SFVec3): SFVec3;
   multMatrixDir(col: SFVec3): SFVec3;
}

export interface SFNode extends X3DField {
   // constructor(vrmlSyntax: string); // throws error, anyway

   // Each subclass of SFNode for the different node types
   // has various properties, that will be defined for
   // each one below. But as far as I can see, they all have metadata
   // properties:
   metadata: SFNode;

   copy(instance?: unknown): SFNode; // not sure what argument does...
   isDefaultValue(): boolean;
   set(other: SFNode): void;
   dispose(): void;
   // stupid WET TypeScript won't just overload the base class method:
   addFieldCallback(key: unknown, callback: FieldCallback): void;
   addFieldCallback(name: string, key: unknown,
                    callback: (value: unknown) => void): void;
   getFieldDefinitions(): FieldDefinitionArray;
   getField(name: string): X3DField;
   getNodeName(): string;
   getNodeDisplayName(): string;
   getNodeType(): number[]; // Array of Node Type constants from X3DConstants
   getNodeTypeName(): string;
   getNodeUserData(key: unknown): unknown;
   removeFieldCallback(key: unknown): void;
   removeFieldCallback(name: string, key: unknown): void;
   removeNodeUserData(key: unknown): void;
   setNodeUserData(key: unknown, data: unknown): unknown;
   toVRMLString(options?: VRMLOptions): string;
   toXMLString(options?: VRMLOptions): string;
   toJSONString(options?: VRMLOptions): string;
   valueOf(): unknown; // what is proper type? May depend on what kind...
}

interface SFNodeAcousticProperties extends SFNode {
   description: string;
   enabled: boolean;
   absorption: number;
   refraction: number;
   diffuse: number;
   specular: number;
}

interface SFNodeAnalyser extends SFNode {
   description: string;
   enabled: boolean;
   gain: number;
   fftSize: number;
   minDecibels: number;
   maxDecibels: number;
   smoothingTimeConstant: number;
   tailTime: SFTime;
}

interface Positioner extends SFNode {
   visible: boolean;
   bboxDisplay: boolean;
   bboxSize: SFVec3;
   bboxCenter: SFVec3;
}

interface GroupingFields {
   addChildren: X3DArrayField<SFNode>;
   removeChildren: X3DArrayField<SFNode>;
   children: X3DArrayField<SFNode>;
}

interface X3DGroupingNode extends Positioner, GroupingFields { }

interface URLFields {
   description: string;
   load: boolean;
   url: X3DArrayField<string>;
   autoRefresh: SFTime;
   autoRefreshTimeLimit: SFTime;
}

interface SFNodeAnchor extends X3DGroupingNode {
   parameter: X3DArrayField<string>;
}

interface SFNodeAppearance extends SFNode {
   acousticProperties: SFNodeAcousticProperties;
   alphaMode: 'AUTO' | 'OPAQUE' | 'MASK' | 'BLEND';
   alphaCutoff: number;
   pointProperties: SFNodePointProperties;
   lineProperties: SFNodeLineProperties;
   fillProperties: SFNodeFillProperties;
   material: SFNodeMaterial;
   backMaterial: SFNodeMaterial;
   texture: SFNode;
   textureTransform: SFNodeTextureTransform;
   shaders: X3DArrayField<SFNode>;
   blendMode: SFNodeBlendMode;
}

interface X3DTimeDependentNode extends SFNode {
   startTime: SFTime;
   resumeTime: SFTime;
   pauseTime: SFTime;
   stopTime: SFTime;
   isPaused: boolean;
   isActive: boolean;
   elapsedTime: SFTime;
}

interface SFNodeAudioClip extends X3DTimeDependentNode, URLFields {
   enabled: boolean;
   gain: number;
   pitch: number;
   loop: boolean;
   duration_changed: SFTime;
}

interface ChannelFields extends SFNode {
   description: string;
   enabled: boolean;
   gain: number;
   channelCount: number;
   channelCountMode: 'MAX' | 'CLAMPED-MAX' | 'EXPLICIT';
   channelInterpretation: 'SPEAKERS' | 'DISCRETE';
}

interface X3DSoundDestinationNode extends ChannelFields {
   mediaDeviceId: string;
   isActive: boolean;
   children: X3DArrayField<SFNode>;
}

interface SFNodeAudioDestination extends X3DSoundDestinationNode {
   maxChannelCount: number;
}

interface X3DBindableNode extends SFNode {
   set_bind: boolean;
   isBound: boolean;
   bindTime: SFTime;
}

interface X3DBackgroundNode extends X3DBindableNode {
   skyAngle: X3DArrayField<number>;
   skyColor: X3DArrayField<SFColor>;
   groundAngle: X3DArrayField<number>;
   groundColor: X3DArrayField<SFColor>;
   transparency: number;
}

interface SFNodeBackground extends X3DBackgroundNode {
   frontUrl: X3DArrayField<string>;
   backUrl: X3DArrayField<string>;
   leftUrl: X3DArrayField<string>;
   rightUrl: X3DArrayField<string>;
   topUrl: X3DArrayField<string>;
   bottomUrl: X3DArrayField<string>;
}

interface SFNodeBillboard extends X3DGroupingNode {
   axisOfRotation: SFVec3;
}

interface SFNodeBiquadFilter extends X3DTimeDependentNode, ChannelFields {
   frequency: number;
   detune: number;
   type: 'LOWPASS' | 'HIGHPASS' | 'BANDPASS'
      | 'LOWSHELF' | 'HIGHSHELF' | 'PEAKING' | 'NOTCH' |  'ALLPASS';
   qualityFactor: number;
   tailTime: SFTime;
   children: X3DArrayField<SFNode>;
}

type BlendFactor = 'ZERO' | 'ONE'
   | 'SRC_COLOR'      | 'ONE_MINUS_SRC_COLOR'
   | 'DST_COLOR'      | 'ONE_MINUS_DST_COLOR'
   | 'SRC_ALPHA'      | 'ONE_MINUS_SRC_ALPHA'
   | 'DST_ALPHA'      | 'ONE_MINUS_DST_ALPHA'
   | 'CONSTANT_COLOR' | 'ONE_MINUS_CONSTANT_COLOR'
   | 'CONSTANT_ALPHA' | 'ONE_MINUS_CONSTANT_ALPHA'

type BlendEquation = 'FUNC_ADD' | 'FUNC_SUBTRACT' | 'FUNC_REVERSE_SUBTRACT'

interface SFNodeBlendMode extends SFNode {
   blendColor: SFColorRGBA;
   sourceColorFactor: BlendFactor;
   sourceAlphaFactor: BlendFactor;
   destinationColorFactor: BlendFactor;
   destinationAlphaFactor: BlendFactor;
   colorEquation: BlendEquation;
   alphaEquation: BlendEquation;
}

interface SFNodeBox extends SFNode {
   size: SFVec3;
   solid: boolean;
}

interface SFNodeBufferAudioSource
   extends X3DTimeDependentNode, ChannelFields, URLFields {
      detune: number;
      buffer: X3DArrayField<number>;
      bufferDuration: SFTime;
      bufferLength: number;
      numberOfChannels: number;
      sampleRate: number;
      playbackRate: number;
      loopStart: SFTime;
      loopEnd: SFTime;
      loop: boolean;
   }

interface SFNodeChannelMerger extends ChannelFields {
   children: X3DArrayField<SFNode>;
}

interface SFNodeChannelSelector extends ChannelFields {
   channelSelection: number;
   children: X3DArrayField<SFNode>;
}

interface SFNodeChannelSplitter extends ChannelFields {
   children: X3DArrayField<SFNode>;
   outputs:  X3DArrayField<SFNode>;
}

interface SFNodeClipPlane extends SFNode {
   enabled: boolean;
   plane: SFVec4;
}

interface SFNodeCollision extends X3DGroupingNode {
   enabled: boolean;
   isActive: boolean;
   collideTime: SFTime;
   proxy: SFNode;
}

interface SFNodeColor extends SFNode {
   color: X3DArrayField<SFColor>;
}

interface SFNodeColorRGBA extends SFNode {
   color: X3DArrayField<SFColorRGBA>;
}

interface X3DChaserNode<T> extends SFNode {
   set_value: T;
   set_destination: T;
   initialValue: T;
   initialDestination: T;
   duration: SFTime;
   isActive: boolean;
   value_changed: T;
}

interface X3DDamperNode<T> extends SFNode {
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

interface X3DInterpolatorNode<T,V> extends SFNode {
   set_fraction: number;
   key: X3DArrayField<number>;
   keyValue: X3DArrayField<T>;
   value_changed: V;
}

interface X3DShaderNode extends SFNode {
   activate: boolean;
   isSelected: boolean;
   isValid: boolean;
   language: string;
}

interface SFNodeComposedShader extends X3DShaderNode {
   parts: X3DArrayField<SFNodeShaderPart>;
}

interface SFNodeCone extends SFNode {
   side: boolean;
   bottom: boolean;
   height: number;
   bottomRadius: number;
   solid: boolean;
}

interface SFNodeConvolver extends  X3DTimeDependentNode, ChannelFields {
   buffer: X3DArrayField<number>;
   normalize: boolean;
   tailTime: SFTime;
   children: X3DArrayField<SFNode>;
}

interface SFNodeCoordinate extends SFNode {
   point: X3DArrayField<SFVec3>;
}

interface SFNodeCylinder extends SFNode {
   top: boolean;
   side: boolean;
   bottom: boolean;
   height: number;
   radius: number;
   solid: boolean;
}

interface X3DPointingDeviceSensorNode extends SFNode {
   description: string;
   enabled: boolean;
   isOver: boolean;
   isActive: boolean;
}

interface X3DDragSensorNode extends X3DPointingDeviceSensorNode {
   offset: number;
   autoOffset: boolean;
   trackPoint_changed: SFVec3;
}

interface SFNodeCylinderSensor extends X3DDragSensorNode {
   axisRotation: SFRotation,
   diskAngle: number;
   minAngle: number;
   maxAngle: number;
   rotation_changed: SFRotation;
}

interface SFNodeDelay extends X3DTimeDependentNode, ChannelFields {
   delayTime: SFTime;
   maxDelayTime: SFTime;
   tailTime: SFTime;
   children: X3DArrayField<SFNode>;
}

interface X3DLightNode extends SFNode {
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

interface SFNodeDirectionalLight extends X3DLightNode {
   direction: SFVec3;
}

interface SFNodeDynamicsCompressor
   extends X3DTimeDependentNode, ChannelFields {
      attack: number;
      knee: number;
      ratio: number;
      reduction: number;
      release: SFTime;
      threshold: number;
      tailTime: SFTime;
      children: X3DArrayField<SFNode>;
   }

interface SFNodeEaseInEaseOut extends SFNode {
   set_fraction: number;
   key: X3DArrayField<number>;
   easeInEaseOut: X3DArrayField<SFVec2>;
   modifiedFraction_changed: number;
}

interface GeometrySubnodes {
   attrib: X3DArrayField<SFNodeFloatVertexAttribute>;
   fogCoord: SFNodeFogCoordinate;
   color: SFNodeColor | SFNodeColorRGBA;
   normal: SFNodeNormal;
}

interface SFNodeElevationGrid extends SFNode, GeometrySubnodes {
   set_height: X3DArrayField<number>;
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
   height: X3DArrayField<number>;
}

interface SFNodeEnvironmentLight extends X3DLightNode {
   rotation: SFRotation;
   diffuseCoefficients: X3DArrayField<number>;
   diffuse: SFNode;
   diffuseTexture: SFNode;
   specularTexture: SFNode;
}

interface SFNodeExtrusion extends SFNode {
   set_crossSection: X3DArrayField<SFVec2>;
   set_orientation: X3DArrayField<SFRotation>;
   set_scale: X3DArrayField<SFVec2>;
   set_spine: X3DArrayField<SFVec3>;
   beginCap: boolean;
   endCap: boolean;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   crossSection: X3DArrayField<SFVec2>;
   orientation: X3DArrayField<SFRotation>;
   scale: X3DArrayField<SFVec2>;
   spine: X3DArrayField<SFVec3>;
}

interface SFNodeFillProperties extends SFNode {
   filled: boolean;
   hatched: boolean;
   hatchStyle: number;
   hatchColor: SFColor;
}

interface SFNodeFloatVertexAttribute extends SFNode {
   name: string;
   numComponents: number;
   value: X3DArrayField<number>;
}

interface FogCommon extends SFNode {
   fogType: 'LINEAR' | 'EXPONENTIAL';
   color: SFColor;
   visibilityRange: number;
}

interface SFNodeFog extends X3DBindableNode, FogCommon { }

interface SFNodeFogCoordinate extends SFNode {
   depth: X3DArrayField<number>;
}

interface SFNodeFontStyle extends SFNode {
   language: string;
   family: X3DArrayField<string>;
   style:  'PLAIN' | 'BOLD' | 'ITALIC' | 'BOLDITALIC' | '';
   size: number;
   spacing: number;
   horizontal: boolean;
   leftToRight: boolean;
   topToBottom: boolean;
   justify: X3DArrayField<'BEGIN' | 'END' | 'FIRST' | 'MIDDLE' | ''>;
}

interface SFNodeGain extends X3DTimeDependentNode, ChannelFields {
   tailTime: SFTime;
   children: X3DArrayField<SFNode>;
}

interface Texture2DFields {
   repeatS: boolean;
   repeatT: boolean;
   textureProperties: SFNodeTextureProperties;
}

interface SFNodeImageTexture extends SFNode, URLFields, Texture2DFields { }

interface IndexedColorCoord {
   set_colorIndex: X3DArrayField<number>;
   set_coordIndex: X3DArrayField<number>;
   colorIndex: X3DArrayField<number>;
   coordIndex: X3DArrayField<number>;
   color: SFNodeColor | SFNodeColorRGBA;
   coord: SFNodeCoordinate;
}

interface SFNodeIndexedFaceSet extends SFNodeIndexedLineSet {
   set_texCoordIndex: X3DArrayField<number>;
   set_normalIndex: X3DArrayField<number>;
   solid: boolean;
   ccw: boolean;
   convex: boolean;
   creaseAngle: number;
   normalPerVertex: boolean;
   texCoordIndex: X3DArrayField<number>;
   normalIndex: X3DArrayField<number>;
   texCoord: SFNode;
}

interface SFNodeIndexedLineSet
   extends SFNode, GeometrySubnodes, IndexedColorCoord {
      colorPerVertex: boolean;
}

interface SFNodeTriangleSet extends SFNode, GeometrySubnodes {
   solid: boolean;
   ccw: boolean;
   colorPerVertex: boolean;
   normalPerVertex: boolean;
   texCoord: SFNode;
   coord: SFNodeCoordinate;
}

interface IndexedTriangles extends SFNodeTriangleSet {
   set_index: X3DArrayField<number>;
   index: X3DArrayField<number>;
}

interface SFNodeInline extends Positioner, URLFields {
   global: boolean;
}

interface SFNodeLOD extends X3DGroupingNode {
   forceTransitions: boolean;
   center: SFVec3;
   range: X3DArrayField<number>;
   level_changed: number;
}

interface SFNodeLayer extends SFNode, GroupingFields {
   pickable: boolean;
   objectType: X3DArrayField<string>;
   visible: boolean;
   viewport: SFNodeViewport;
}

interface SFNodeLayerSet extends SFNode {
   activeLayer: number;
   order: X3DArrayField<number>;
   layers: X3DArrayField<SFNodeLayer>;
}

interface SFNodeLineProperties extends SFNode {
   applied: boolean;
   linetype: number;
   linewidthScaleFactor: number;
}

interface SFNodeLineSet extends SFNode, GeometrySubnodes {
   vertexCount: X3DArrayField<number>;
   coord: SFNodeCoordinate;
}

interface SFNodeListenerPointSource extends X3DTimeDependentNode {
   description: string;
   enabled: boolean;
   orientation: SFRotation;
   gain: number;
   dopplerEnabled: boolean;
   interauralDistance: number;
   trackCurrentView: boolean;
}

interface SFNodeLoadSensor extends SFNode {
   enabled: boolean;
   timeOut: SFTime;
   isActive: boolean;
   isLoaded: boolean;
   progress: number;
   loadTime: SFTime;
   children: X3DArrayField<SFNode>;
}

interface SFNodeLocalFog extends FogCommon {
   enabled: boolean;
}

interface SFNodeUnlitMaterial extends SFNode {
   emissiveColor: SFColor;
   emissiveTextureMapping: string;
   emissiveTexture: SFNode;
   normalScale: number;
   normalTextureMapping: string;
   normalTexture: SFNode;
   transparency: number;
}

interface MaterialCommon extends SFNodeUnlitMaterial {
   occlusionStrength: number;
   occlusionTextureMapping: string;
   occlusionTexture: SFNode;
}

interface SFNodeMaterial extends MaterialCommon {
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

interface SFNodeMatrix3VertexAttribute extends SFNode {
   name: string;
   value: X3DArrayField<SFMatrix3>;
}

interface SFNodeMatrix4VertexAttribute extends SFNode {
   name: string;
   value: X3DArrayField<SFMatrix4>;
}

interface X3DMetadataNode extends SFNode {
   name: string;
   reference: string;
}

interface MetadataInstance<T> extends X3DMetadataNode {
   value: X3DArrayField<T>;
}

interface SFNodeMicrophoneSource extends X3DTimeDependentNode {
   description: string;
   enabled: boolean;
   gain: number;
   mediaDeviceId: string;
}

interface SFNodeMovieTexture extends SFNodeAudioClip, Texture2DFields {
   speed: number;
}

interface SFNodeMultiTexture extends SFNode {
   description: string;
   color: SFColor;
   alpha: number;
   mode: X3DArrayField<string>;
   source: X3DArrayField<string>;
   function: X3DArrayField<string>;
   texture: X3DArrayField<SFNode>;
}

interface SFNodeMultiTextureCoordinate extends SFNode {
   texCoord: X3DArrayField<SFNodeTextureCoordinate>;
}

interface SFNodeMultiTextureTransform extends SFNode {
   textureTransform: X3DArrayField<SFNodeTextureTransform>;
}

interface SFNodeNavigationInfo extends X3DBindableNode {
   type: X3DArrayField<
      'EXAMINE' | 'WALK' | 'FLY' | 'PLANE' | 'PLANE_create3000.github.io'
      | 'PLANE_create3000.de' | 'LOOKAT' | 'EXPLORE' | 'ANY' | 'NONE'>;
   avatarSize: X3DArrayField<number>;
   speed: number;
   headlight: boolean;
   visibilityLimit: number;
   transitionType: X3DArrayField<'TELEPORT' | 'LINEAR' | 'ANIMATE'>;
   transitionTime: SFTime;
   transitionComplete: boolean;
}

interface SFNodeNormal extends SFNode {
   vector: X3DArrayField<SFVec3>;
}

interface X3DViewpointNode extends X3DBindableNode {
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

interface SFNodeOscillatorSource extends X3DTimeDependentNode {
   description: string;
   enabled: boolean;
   gain: number;
   frequency: number;
   detune: number;
   periodicWave: SFNodePeriodicWave;
}

interface SFNodePackagedShader extends X3DShaderNode, URLFields { }

interface SFNodePeriodicWave extends SFNode {
   description: string;
   enabled: boolean;
   type: 'SINE' | 'SQUARE' | 'SAWTOOTH' | 'TRIANGLE' | 'CUSTOM'
   optionsReal: X3DArrayField<number>;
   optionsImag: X3DArrayField<number>;
}

interface SFNodePhysicalMaterial extends MaterialCommon {
   baseColor: SFColor;
   baseTextureMapping: String;
   baseTexture: SFNode;
   metallic: number;
   roughness: number;
   metallicRoughnessTextureMapping: string;
   metallicRoughnessTexture: SFNode;
}

interface SFNodePixelTexture extends SFNode, Texture2DFields {
   description: string;
   image: SFImage;
}

interface SFNodePlaneSensor extends X3DDragSensorNode {
   axisRotation: SFRotation;
   minPosition: SFVec2;
   maxPosition: SFVec2;
   translation_changed: SFVec3;
}

interface SFNodePointLight extends X3DLightNode {
   attenuation: SFVec3;
   location: SFVec3;
   radius: number;
}

interface SFNodePointProperties extends SFNode {
   pointSizeScaleFactor: number;
   pointSizeMinValue: number;
   pointSizeMaxValue: number;
   attenuation: SFVec3;
}

interface SFNodePointSet extends SFNode, GeometrySubnodes {
   coord: SFNodeCoordinate;
}

interface SFNodeProgramShader extends X3DShaderNode {
   programs: X3DArrayField<SFNodeShaderProgram>
}

interface X3DEnvironmentalSensorNode extends SFNode {
   enabled: boolean;
   size: SFVec3;
   center: SFVec3;
   enterTime: SFTime;
   exitTime: SFTime;
   isActive: boolean;
}

interface SFNodeProximitySensor extends X3DEnvironmentalSensorNode {
   position_changed: SFVec3;
   orientation_changed: SFRotation;
   centerOfRotation_changed: SFVec3;
}

interface SFNodeScript extends SFNode, URLFields {
   directOutput: boolean;
   mustEvaluate: boolean;
}

interface SFNodeShaderPart extends SFNode, URLFields {
   type: 'VERTEX' | 'FRAGMENT';
}

type SFNodeShaderProgram = SFNodeShaderPart; // Why are there two node types?

interface SFNodeShape extends Positioner {
   castShadow: boolean;
   appearance: SFNodeAppearance;
   geometry: SFNode;
}

interface SoundCommon extends SFNode {
   description: string;
   enabled: boolean;
   spatialize: boolean;
   location: SFVec3;
   direction: SFVec3;
   intensity: number;
   priority: number;
   children: X3DArrayField<SFNode>;
}

interface SFNodeSound extends SFNode {
   minBack: number;
   minFront: number;
   maxBack: number;
   maxFront: number;
   source: SFNode;
}

interface SFNodeSpatialSound extends SFNode {
   coneInnerAngle: number;
   coneOuterAngle: number;
   coneOuterGain: number;
   distanceModel: 'LINEAR' | 'INVERSE' | 'EXPONENTIAL';
   dopplerEnabled: boolean;
   enableHRTF: boolean;
   gain: number;
   maxDistance: number;
   referenceDistance: number;
   rolloffFactor: number;
}

interface SFNodeSphere extends SFNode {
   radius: number;
   solid: boolean;
}

interface SFNodeSphereSensor extends X3DPointingDeviceSensorNode {
   rotation_changed: SFRotation;
}

interface SplineInterpolator<U> extends X3DInterpolatorNode<U,U> {
   closed: boolean;
   keyVelocity: X3DArrayField<U>;
   normalizeVelocity: boolean;
}

interface SFNodeSpotLight extends SFNodePointLight {
   direction: SFVec3;
   beamWidth: number;
   cutOffAngle: number;
}

interface SFNodeSquadOrientationInterpolator
   extends X3DInterpolatorNode<SFRotation, SFRotation> {
      closed: boolean;
   }

interface SFNodeStaticGroup extends Positioner {
   children: X3DArrayField<SFNode>;
}

interface SFNodeStreamAudioDestination extends X3DSoundDestinationNode {
   streamIdentifier: X3DArrayField<string>;
}

interface SFNodeStreamAudioSource extends X3DTimeDependentNode {
   description: string;
   enabled: boolean;
   gain: number;
   streamIdentifier: X3DArrayField<string>;
}

interface SFNodeSwitch extends X3DGroupingNode {
   whichChoice: number;
}

interface SFNodeText extends SFNode {
   string: X3DArrayField<string>;
   length: X3DArrayField<number>;
   maxExtent: number;
   solid: boolean;
   origin: SFVec3;
   textBounds: SFVec2;
   lineBounds: X3DArrayField<SFVec2>;
   fontStyle: SFNodeFontStyle;
}

interface SFNodeTextureBackground extends X3DBackgroundNode {
   frontTexture: SFNode;
   backTexture: SFNode;
   leftTexture: SFNode;
   rightTexture: SFNode;
   topTexture: SFNode;
   bottomTexture: SFNode;
}

interface SFNodeTextureCoordinate extends SFNode {
   mapping: string;
   point: X3DArrayField<SFVec2>;
}

interface SFNodeTextureCoordinateGenerator extends SFNode {
   mapping: string;
   mode: 'SPHERE' | 'SPHERE-LOCAL' | 'SPHERE-REFLECT' | 'SPHERE-REFLECT-LOCAL'
      | 'COORD' | 'COORD-EYE' | 'NOISE' | 'NOISE-EYE' | 'CAMERASPACENORMAL'
      | 'CAMERASPACEPOSITION' | 'CAMERASPACEREFLECTIONVECTOR' ;
   parameter: X3DArrayField<number>;
}

interface SFNodeTextureProperties extends SFNode {
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

interface SFNodeTextureTransform extends SFNode {
   mapping: string;
   translation: SFVec2;
   rotation: number;
   scale: SFVec2;
   center: SFVec2;
}

interface SFNodeTimeSensor extends X3DTimeDependentNode {
   description: string;
   enabled: boolean;
   cycleInterval: SFTime;
   loop: boolean;
   cycleTime: SFTime;
   fraction_changed: number;
   time: SFTime;
}

interface SFNodeTouchSensor extends X3DPointingDeviceSensorNode {
   hitTexCoord_changed: SFVec2;
   hitNormal_changed: SFVec3;
   hitPoint_changed: SFVec3;
   touchTime: SFTime;
}

interface SFNodeTransform extends X3DGroupingNode {
   translation: SFVec3;
   rotation: SFRotation;
   scale: SFVec3;
   scaleOrientation: SFRotation;
   center: SFVec3;
}

interface SFNodeTransformSensor extends X3DEnvironmentalSensorNode {
   position_changed: SFVec3;
   orientation_changed: SFRotation;
   targetObject: SFNode;
}

interface SFNodeTriangleFanSet extends SFNodeTriangleSet {
   fanCount: X3DArrayField<number>;
}

interface SFNodeTriangleStripSet extends SFNodeTriangleSet {
   stripCount: X3DArrayField<number>;
}

interface SFNodeTwoSidedMaterial extends SFNode {
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

interface SFNodeViewpointGroup extends SFNode {
   description: string;
   displayed: boolean;
   retainUserOffsets: boolean;
   size: SFVec3;
   center: SFVec3;
   children: X3DArrayField<SFNode>;
}

interface SFNodeViewport extends X3DGroupingNode {
   clipBoundary: X3DArrayField<number>;
}

interface SFNodeWaveShaper extends X3DTimeDependentNode, ChannelFields {
   curve: X3DArrayField<number>;
   oversample: 'NONE' | '2x' | '4x';
   tailTime: SFTime;
   children: X3DArrayField<SFNode>;
}

interface SFNodeWorldInfo extends SFNode {
   title: string;
   info: X3DArrayField<string>;
}

export type SpecializeNodeType = {
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
   ColorChaser: X3DChaserNode<SFColor>,
   ColorDamper: X3DDamperNode<SFColor>,
   ColorInterpolator: X3DInterpolatorNode<SFColor, SFColor>,
   ComposedShader: SFNodeComposedShader,
   Cone: SFNodeCone,
   Convolver: SFNodeConvolver,
   Coordinate: SFNodeCoordinate,
   CoordinateChaser: X3DChaserNode<X3DArrayField<SFVec3>>,
   CoordinateDamper: X3DDamperNode<X3DArrayField<SFVec3>>,
   CoordinateInterpolator: X3DInterpolatorNode<SFVec3, X3DArrayField<SFVec3>>,
   CoordinateInterpolator2D:
      X3DInterpolatorNode<SFVec2, X3DArrayField<SFVec2>>,
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
   MetadataBoolean: MetadataInstance<boolean>,
   MetadataDouble: MetadataInstance<number>,
   MetadataFloat: MetadataInstance<number>,
   MetadataInteger: MetadataInstance<number>,
   MetadataSet: MetadataInstance<X3DMetadataNode>,
   MetadataString: MetadataInstance<string>,
   MicrophoneSource: SFNodeMicrophoneSource,
   MovieTexture: SFNodeMovieTexture,
   MultiTexture: SFNodeMultiTexture,
   MultiTextureCoordinate: SFNodeMultiTextureCoordinate,
   MultiTextureTransform: SFNodeMultiTextureTransform,
   NavigationInfo: SFNodeNavigationInfo,
   Normal: SFNodeNormal,
   NormalInterpolator: X3DInterpolatorNode<SFVec3, X3DArrayField<SFVec3>>,
   OrientationChaser: X3DChaserNode<SFRotation>,
   OrientationDamper: X3DDamperNode<SFRotation>,
   OrientationInterpolator: X3DInterpolatorNode<SFRotation, SFRotation>,
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
   PositionChaser: X3DChaserNode<SFVec3>,
   PositionChaser2D: X3DChaserNode<SFVec2>,
   PositionDamper: X3DDamperNode<SFVec3>,
   PositionDamper2D: X3DDamperNode<SFVec2>,
   PositionInterpolator: X3DInterpolatorNode<SFVec3, SFVec3>,
   PositionInterpolator2D: X3DInterpolatorNode<SFVec2, SFVec2>,
   ProgramShader: SFNodeProgramShader,
   ProximitySensor: SFNodeProximitySensor,
   ScalarChaser: X3DChaserNode<number>,
   ScalarDamper: X3DDamperNode<number>,
   ScalarInterpolator: X3DInterpolatorNode<number, number>,
   Script: SFNodeScript,
   ShaderPart: SFNodeShaderPart,
   ShaderProgram: SFNodeShaderProgram,
   Shape: SFNodeShape,
   Sound: SFNodeSound,
   SpatialSound: SFNodeSpatialSound,
   Sphere: SFNodeSphere,
   SphereSensor: SFNodeSphereSensor,
   SplinePositionInterpolator: SplineInterpolator<SFVec3>,
   SplinePositionInterpolator2D: SplineInterpolator<SFVec2>,
   SplineScalarInterpolator: SplineInterpolator<number>,
   SpotLight: SFNodePointLight,
   SquadOrientationInterpolator: SFNodeSquadOrientationInterpolator,
   StaticGroup: SFNodeStaticGroup,
   StreamAudioDestination: SFNodeStreamAudioDestination,
   StreamAudioSource: SFNodeStreamAudioSource,
   Switch: SFNodeSwitch,
   TexCoordChaser2D: X3DChaserNode<X3DArrayField<SFVec2>>,
   TexCoordDamper2D: X3DDamperNode<X3DArrayField<SFVec2>>,
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

type FieldDefinitionArray = Map<unknown, X3DFieldDefinition>;
export type X3DFieldDefinition = {
   accessType: number, // that's a guess
   dataType: string,
   name: string,
   value: unknown // I don't think we can do better without parsing the
                  // possible values for dataType...
}
type VRMLOptions = {
   style?: string,
   indent?: string,
   precision?: number,
   doublePrecision?: number,
   html?: boolean,
   closingTags?: boolean
}

export class SFRotation extends X3DField {
   constructor();
   constructor(x: number, y: number, z: number, angle: number);
   constructor(axis: SFVec3, angle: number);
   constructor(from: SFVec3, to: SFVec3);
   constructor(matrix: SFMatrix3);
   x: number;
   y: number;
   z: number;
   angle: number;

   copy(): SFRotation;
   isDefaultValue(): boolean;
   set(other: SFRotation): void;

   getAxis(): SFVec3;
   getMatrix(): SFMatrix3;
   inverse(): SFRotation;
   multiply(other: SFRotation): SFRotation;
   multVec(subject: SFVec3): SFVec3;
   setAxis(axis: SFVec3): void;
   setMatrix(matrix: SFMatrix3): void;
   slerp(destination: SFRotation, t: number): SFRotation;
}

export class SFString extends X3DField {
   constructor(arg?: unknown);
   copy(): SFString;
   isDefaultValue(): boolean;
   set(arg: unknown): void;
   valueOf(): string;
   length: number;
}

export class SFTime extends X3DField {
   constructor(arg?: unknown);
   copy(): SFTime;
   isDefaultValue(): boolean;
   set(arg: unknown): void;
   valueOf(): number; // I think that's the right type...
}

export class SFVec2 extends X3DField {
   constructor(x?: number, y?: number);
   x: number;
   y: number;

   copy(): SFVec2;
   isDefaultValue(): boolean;
   set(other: SFVec2): void;

   abs(): SFVec2;
   add(other: SFVec2): SFVec2;
   distance(other: SFVec2): number;
   divide(denominator: number): SFVec2;
   divVec(other: SFVec2): SFVec2;
   dot(other: SFVec2): number;
   inverse(): SFVec2;
   length(): number;
   lerp(destination: SFVec2, t: number): SFVec2;
   min(other: SFVec2): SFVec2;
   max(other: SFVec2): SFVec2;
   multiply(factor: number): SFVec2;
   multVec(other: SFVec2): SFVec2;
   negate(): SFVec2;
   normalize(): SFVec2;
   subtract(other: SFVec2): SFVec2;
}

export class SFVec3 extends X3DField {
   constructor(x?: number, y?: number, z?: number);
   x: number;
   y: number;
   z: number;

   copy(): SFVec3;
   isDefaultValue(): boolean;
   set(other: SFVec3): void;

   abs(): SFVec3;
   add(other: SFVec3): SFVec3;
   cross(other: SFVec3): SFVec3;
   distance(other: SFVec3): number;
   divide(denominator: number): SFVec3;
   divVec(other: SFVec3): SFVec3;
   dot(other: SFVec3): number;
   inverse(): SFVec3;
   length(): number;
   lerp(destination: SFVec3, t: number): SFVec3;
   min(other: SFVec3): SFVec3;
   max(other: SFVec3): SFVec3;
   multiply(factor: number): SFVec3;
   multVec(other: SFVec3): SFVec3;
   negate(): SFVec3;
   normalize(): SFVec3;
   subtract(other: SFVec3): SFVec3;
}

export class SFVec4 extends X3DField {
   constructor(x?: number, y?: number, z?: number, w?: number);
   x: number;
   y: number;
   z: number;
   w: number;

   copy(): SFVec4;
   isDefaultValue(): boolean;
   set(other: SFVec4): void;

   abs(): SFVec4;
   add(other: SFVec4): SFVec4;
   distance(other: SFVec4): number;
   divide(denominator: number): SFVec4;
   divVec(other: SFVec4): SFVec4;
   dot(other: SFVec4): number;
   inverse(): SFVec4;
   length(): number;
   lerp(destination: SFVec4, t: number): SFVec4;
   min(other: SFVec4): SFVec4;
   max(other: SFVec4): SFVec4;
   multiply(factor: number): SFVec4;
   multVec(other: SFVec4): SFVec4;
   negate(): SFVec4;
   normalize(): SFVec4;
   subtract(other: SFVec4): SFVec4;
}

type ArrayTest<T> = (elt: T, ix: boolean, arr: X3DArrayField<T>) => boolean
type ArrayAction<T> = (elt: T, ix: boolean, arr: X3DArrayField<T>) => void
type ArrayReducer<T,U> =
   (acc: U, elt: T, ix: number, arr: X3DArrayField<T>) => U
export class X3DArrayField<T> extends X3DField {
   constructor(...elts: T[]);
   [index: number]: T;
   length: number;
   at(index: number): T;
   entries(): IterableIterator<[number, T]>;
   every(predicate: ArrayTest<T>): boolean;
   fill(val: T, start?: number, end?: number): X3DArrayField<T>;
   filter(predicate: ArrayTest<T>): X3DArrayField<T>;
   find(test: ArrayTest<T>): T | undefined;
   findIndex(test: ArrayTest<T>): number;
   findLast(test: ArrayTest<T>): T | undefined;
   findLastIndex(test: ArrayTest<T>): number;
   forEach(action: ArrayAction<T>): void;
   includes(needle: T): boolean;
   indexOf(needle: T): number;
   join(separator?: string): string;
   keys(): number[];
   lastIndexOf(needle: T): number;
   map<U>(f: (elt: T, ix: number, arr: X3DArrayField<T>) => U): U[];
   pop(): T;
   push(...elts: T[]): number;
   reduce<U>(f: ArrayReducer<T,U>, initial?: U): U;
   reduceRight<U>(f: ArrayReducer<T,U>, initial?: U): U;
   reverse(): X3DArrayField<T>;
   shift(): T;
   slice(start?: number, end?: number): X3DArrayField<T>;
   some(predicate: ArrayTest<T>): boolean;
   sort(comparator?: (a: T, b: T) => number): X3DArrayField<T>;
   splice(start: number, deleteCount: number,
          ...rest: T[]) : X3DArrayField<T>;
   toReversed(): X3DArrayField<T>;
   toSorted(comparator?: (a: T, b: T) => number): X3DArrayField<T>;
   toSpliced(start: number, deleteCount: number,
             ...rest: T[]) : X3DArrayField<T>;
   unshift(...elts: T[]): number;
   values(): IterableIterator<T>;
   with(index: number, value: T): X3DArrayField<T>;
}

// would be better to make these enums...
export interface X3DConstants {
   // Browser Event Constants
   CONNECTION_ERROR: 0;
   BROWSER_EVENT: 1;
   INITIALIZED_EVENT: 2;
   SHUTDOWN_EVENT: 3;
   INITIALIZED_ERROR: 4;
   // Load State Constants
   NOT_STARTED_STATE: 0;
   IN_PROGRESS_STATE: 1;
   COMPLETE_STATE: 2;
   FAILED_STATE: 3;
   // Access Type Constants
   initializeOnly: 1;
   inputOnly: 2;
   outputOnly: 4;
   inputOutput: 7;
   // Field Type Constants
   SFBool: 0;
   SFColor: 1;
   SFColorRGBA: 2;
   SFDouble: 3;
   SFFloat: 4;
   SFImage: 5;
   SFInt32: 6;
   SFMatrix3d: 7;
   SFMatrix3f: 8;
   SFMatrix4d: 9;
   SFMatrix4f: 10;
   SFNode: 11;
   SFRotation: 12;
   SFString: 13;
   SFTime: 14;
   SFVec2d: 15;
   SFVec2f: 16;
   SFVec3d: 17;
   SFVec3f: 18;
   SFVec4d: 19;
   SFVec4f: 20;
   MFBool: 22;
   MFColor: 23;
   MFColorRGBA: 24;
   MFDouble: 25;
   MFFloat: 26;
   MFImage: 27;
   MFInt32: 28;
   MFMatrix3d: 29;
   MFMatrix3f: 30;
   MFMatrix4d: 31;
   MFMatrix4f: 32;
   MFNode: 33;
   MFRotation: 34;
   MFString: 35;
   MFTime: 36;
   MFVec2d: 37;
   MFVec2f: 38;
   MFVec3d: 39;
   MFVec3f: 40;
   MFVec4d: 41;
   MFVec4f: 42;
   // Concrete Node Types
   AcousticProperties: 140;
   Analyser: 155;
   Anchor: 96;
   Appearance: 141;
   AudioClip: 156;
   AudioDestination: 157;
   Background: 21;
   Billboard: 88;
   BiquadFilter: 158;
   Box: 49;
   BufferAudioSource: 159;
   ChannelMerger: 160;
   ChannelSelector: 161;
   ChannelSplitter: 162;
   ClipPlane: 108;
   Collision: 89;
   Color: 109;
   ColorChaser: 32;
   ColorDamper: 33;
   ColorInterpolator: 64;
   ColorRGBA: 110;
   ComposedShader: 129;
   Cone: 50;
   Convolver: 163;
   Coordinate: 111;
   CoordinateChaser: 34;
   CoordinateDamper: 35;
   CoordinateInterpolator: 65;
   CoordinateInterpolator2D: 66;
   Cylinder: 51;
   CylinderSensor: 101;
   Delay: 164;
   DirectionalLight: 83;
   DynamicsCompressor: 165;
   EaseInEaseOut: 67;
   ElevationGrid: 52;
   EnvironmentLight: 84;
   Extrusion: 53;
   FillProperties: 142;
   FloatVertexAttribute: 130;
   Fog: 22;
   FogCoordinate: 23;
   FontStyle: 203;
   Gain: 166;
   Group: 56;
   ImageTexture: 181;
   IndexedFaceSet: 54;
   IndexedLineSet: 112;
   IndexedTriangleFanSet: 113;
   IndexedTriangleSet: 114;
   IndexedTriangleStripSet: 115;
   Inline: 97;
   LOD: 90;
   Layer: 78;
   LayerSet: 79;
   LineProperties: 143;
   LineSet: 116;
   ListenerPointSource: 167;
   LoadSensor: 98;
   LocalFog: 24;
   Material: 144;
   Matrix3VertexAttribute: 131;
   Matrix4VertexAttribute: 132;
   MetadataBoolean: 7;
   MetadataDouble: 8;
   MetadataFloat: 9;
   MetadataInteger: 10;
   MetadataSet: 11;
   MetadataString: 12;
   MicrophoneSource: 168;
   MovieTexture: 182;
   MultiTexture: 183;
   MultiTextureCoordinate: 184;
   MultiTextureTransform: 185;
   NavigationInfo: 91;
   Normal: 117;
   NormalInterpolator: 68;
   OrientationChaser: 36;
   OrientationDamper: 37;
   OrientationInterpolator: 69;
   OrthoViewpoint: 92;
   OscillatorSource: 169;
   PackagedShader: 133;
   PeriodicWave: 170;
   PhysicalMaterial: 145;
   PixelTexture: 186;
   PlaneSensor: 102;
   PointLight: 85;
   PointProperties: 146;
   PointSet: 118;
   PositionChaser: 38;
   PositionChaser2D: 39;
   PositionDamper: 40;
   PositionDamper2D: 41;
   PositionInterpolator: 70;
   PositionInterpolator2D: 71;
   ProgramShader: 134;
   ProximitySensor: 28;
   ScalarChaser: 42;
   ScalarDamper: 43;
   ScalarInterpolator: 72;
   Script: 201;
   ShaderPart: 135;
   ShaderProgram: 136;
   Shape: 147;
   Sound: 171;
   SpatialSound: 172;
   Sphere: 55;
   SphereSensor: 103;
   SplinePositionInterpolator: 73;
   SplinePositionInterpolator2D: 74;
   SplineScalarInterpolator: 75;
   SpotLight: 86;
   SquadOrientationInterpolator: 76;
   StaticGroup: 57;
   StreamAudioDestination: 173;
   StreamAudioSource: 174;
   Switch: 58;
   TexCoordChaser2D: 44;
   TexCoordDamper2D: 45;
   Text: 204;
   TextureBackground: 25;
   TextureCoordinate: 187;
   TextureCoordinateGenerator: 188;
   TextureProperties: 189;
   TextureTransform: 190;
   TimeSensor: 198;
   TouchSensor: 104;
   Transform: 59;
   TransformSensor: 29;
   TriangleFanSet: 119;
   TriangleSet: 120;
   TriangleStripSet: 121;
   TwoSidedMaterial: 148;
   UnlitMaterial: 149;
   Viewpoint: 93;
   ViewpointGroup: 94;
   Viewport: 80;
   VisibilitySensor: 30;
   VrmlMatrix: 21;
   WaveShaper: 175;
   WorldInfo: 13;
   // Abstract Node Types
   X3DAppearanceChildNode: 150;
   X3DAppearanceNode: 151;
   X3DBackgroundNode: 26;
   X3DBaseNode: 0;
   X3DBindableNode: 14;
   X3DBoundedObject: 60;
   X3DBrowser: 200;
   X3DChaserNode: 46;
   X3DChildNode: 15;
   X3DColorNode: 122;
   X3DComposedGeometryNode: 123;
   X3DCoordinateNode: 124;
   X3DDamperNode: 47;
   X3DDragSensorNode: 105;
   X3DEnvironmentalSensorNode: 31;
   X3DExecutionContext: 5;
   X3DExternProtoDeclaration: 4;
   X3DFogObject: 27;
   X3DFollowerNode: 48;
   X3DFontStyleNode: 205;
   X3DGeometricPropertyNode: 125;
   X3DGeometryNode: 126;
   X3DGroupingNode: 61;
   X3DInfoNode: 16;
   X3DInterpolatorNode: 77;
   X3DLayerNode: 81;
   X3DLightNode: 87;
   X3DLineGeometryNode: 127;
   X3DMaterialNode: 152;
   X3DMetadataObject: 17;
   X3DNetworkSensorNode: 99;
   X3DNode: 18;
   X3DNormalNode: 128;
   X3DOneSidedMaterialNode: 153;
   X3DPointingDeviceSensorNode: 106;
   X3DProgrammableShaderObject: 137;
   X3DProtoDeclaration: 2;
   X3DProtoDeclarationNode: 1;
   X3DPrototypeInstance: 19;
   X3DScene: 6;
   X3DScriptNode: 202;
   X3DSensorNode: 20;
   X3DShaderNode: 138;
   X3DShapeNode: 154;
   X3DSingleTextureCoordinateNode: 191;
   X3DSingleTextureNode: 192;
   X3DSingleTextureTransformNode: 193;
   X3DSoundChannelNode: 176;
   X3DSoundDestinationNode: 177;
   X3DSoundNode: 178;
   X3DSoundProcessingNode: 179;
   X3DSoundSourceNode: 180;
   X3DTexture2DNode: 194;
   X3DTextureCoordinateNode: 195;
   X3DTextureNode: 196;
   X3DTextureTransformNode: 197;
   X3DTimeDependentNode: 199;
   X3DTouchSensorNode: 107;
   X3DTransformMatrix3DNode: 62;
   X3DTransformNode: 63;
   X3DUrlObject: 100;
   X3DVertexAttributeNode: 139;
   X3DViewpointNode: 95;
   X3DViewportNode: 82;
   X3DWorld: 3;
}
