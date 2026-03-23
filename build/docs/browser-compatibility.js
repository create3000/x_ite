const
   json   = require ("./browser-compatibility.json"),
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

main ();

function main ()
{
   console .log ("Update browser compatibility ...");

   const files = sh ("ls -C1 src/x_ite/Components/**/*.js") .trim () .split ("\n");

   files .forEach (filename => browserCompatibility (filename));
}

function browserCompatibility (js)
{
   const [, component, typeName] = js .match (/([^/]+?)\/([^/]+?)\.js$/);

   if (typeName .startsWith ("X3D"))
      return;

   if (component .includes ("Annotation"))
      return;

   const
      js_f = sh ("cat", js),
      md   = `docs/_posts/components/${component}/${typeName}.md`;

   const map = new Map ([
      [undefined, `<i class="fa-solid fa-circle-question blue" title="Unknown Support"></i>`],
      [true,      `<i class="fa-solid fa-circle-check green" title="Supported"></i>`],
      [false,     `<i class="fa-solid fa-circle-xmark red" title="Not Supported"></i>`],
   ]);

   const
      x_ite    = map .get (js_f .match (/THIS NODE IS NOT SUPPORTED/) ? false : true),
      castle   = map .get (json [typeName] ?.["castle"]),
      freewrl  = map .get (json [typeName] ?.["freewrl"]),
      x3d_edit = map .get (json [typeName] ?.["x3d-edit"]),
      x3dom    = map .get (json [typeName] ?.["x3dom"]);


   if (castle .includes ("blue") || freewrl .includes ("blue") || x3d_edit .includes ("blue") || x3dom .includes ("blue"))
      console .log (component, typeName)

   const replacement = `## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|-------|--------|-------|
| ${castle} | ${freewrl} | ${x_ite} | ${x3d_edit} | ${x3dom} |
{: .browser-compatibility }

## `;

   let md_f = sh ("cat", md);

   md_f = md_f .replace (/## Browser Compatibility.*?##\s/s, replacement);

   fs .writeFileSync (md, md_f);
}

/*
Warp prompt:

Please make a json file from comparison.csv with the following objects "{ "node name": { "x3d-edit", true/false, castle": true/false, "x3dom": true/false, "freewrl": true/false }, "next node name": ... }"
*/

const s = new Set ([
"7",

"Node",
"MetadataDouble",
"MetadataFloat",
"MetadataInteger",
"MetadataSet",
"MetadataString",
"head",
"PROFILE",
"COMPONENT",
"META",
"ROUTE",
"PROTO",
"EXTERNPROTO",
"UNIT",
"8",

"Node",
"TimeSensor",
"9",

"Node",
"Anchor",
"Inline",
"LoadSensor",
"URLs",
"Relative",
"Scripting",
"Browser",
"IMPORT",
"EXPORT",
"10",

"Node",
"Group",
"StaticGroup",
"Switch",
"Transform",
"11",

"Node",
"Color",
"ColorRGBA",
"Coordinate",
"IndexedLineSet",
"IndexedTriangleFanSet",
"IndexedTriangleSet",
"IndexedTriangleStripSet",
"LineSet",
"Normal",
"PointSet",
"TriangleFanSet",
"TriangleSet",
"TriangleStripSet",
"ClipPlane",
"12",

"Node",
"Appearance",
"FillProperties",
"LineProperties",
"PointProperties",
"Material",
"UnlitMaterial",
"PhysicalMaterial",
"Shape",
"TwoSidedMaterial",
"PhysicalMaterial",
"UnlitMaterial",
"AccousticProperties",
"13",

"Node",
"Box",
"Cone",
"Cylinder",
"ElevationGrid",
"Extrusion",
"IndexedFaceSet",
"Sphere",
"Teapot",
"Pyramid",
"14",

"Node",
"Arc2D",
"ArcClose2D",
"Circle2D",
"Disk2D",
"Polyline2D",
"Polypoint2D",
"Rectangle2D",
"TriangleSet2D",
"15",

"Node",
"FontStyle",
"Text",
"16",

"Node",
"AudioClip",
"Sound",
"SpatialSound",
"Analyser",
"AudioDestination",
"BiquadFilter",
"BufferAudioSource",
"ChannelMerger",
"ChannelSelector",
"ChannelSplitter",
"Convolver",
"Delay",
"DynamicsCompressor",
"Gain",
"MicrophoneSource",
"OscillatorSource",
"PeriodicWave",
"StreamAudioDestination",
"StreamAudioSource",
"ListenerPointSource",
"ListenerPoint",
"17",

"Node",
"DirectionalLight",
"EnvironmentLight",
"PointLight",
"SpotLight",
"18",

"Node",
"ImageTexture",
"MovieTexture",
"MultiTexture",
"MultiTextureCoordinate",
"MultiTextureTransform",
"PixelTexture",
"TextureCoordinate",
"TextureCoordinateGenerator",
"TextureTransform",
"TextureProperties",
"19",

"Node",
"ColorInterpolator",
"CoordinateInterpolator",
"CoordinateInterpolator2D",
"NormalInterpolator",
"OrientationInterpolator",
"PositionInterpolator",
"PositionInterpolator2D",
"ScalarInterpolator",
"EaseInEaseOut",
"SplinePositionInterpolator",
"SplinePositionInterpolator2D",
"SplineScalarInterpolator",
"SquadOrientationInterpolator",
"20",

"Node",
"CylinderSensor",
"PlaneSensor",
"SphereSensor",
"TouchSensor",
"LineSensor",
"MultitouchSensor",
"PointSensor",
"21",

"Node",
"KeySensor",
"StringSensor",
"22",

"Node",
"ProximitySensor",
"VisibilitySensor",
"TransformSensor",
"23",

"Node",
"Billboard",
"Collision",
"LOD",
"NavigationInfo",
"Viewpoint",
"OrthoViewpoint",
"ViewpointGroup",
"24",

"Node",
"Background",
"Fog",
"TextureBackground",
"LocalFog",
"FogCoordinate",
"25",

"Node",
"GeoCoordinate",
"GeoElevationGrid",
"GeoLocation",
"GeoLOD",
"GeoMetadata",
"GeoOrigin",
"GeoPositionInterpolator",
"GeoTouchSensor",
"GeoViewpoint",
"GeoProximitySensor",
"GeoTransform",
"26",

"Node",
"HAnimDisplacer",
"HAnimHumanoid",
"HAnimJoint",
"HAnimSegment",
"HAnimSite",
"HAnimMotion",
"HAnimMotionPlay",
"HAnimMotionClip",
"27",

"Node",
"Contour2D",
"ContourPolyline2D",
"NurbsCurve",
"NurbsCurve2D",
"NurbsOrientationInterpolator",
"NurbsPatchSurface",
"NurbsPositionInterpolator",
"NurbsSet",
"NurbsSurfaceInterpolator",
"NurbsSweptSurface",
"NurbsSwungSurface",
"NurbsTextureCoordinate",
"NurbsTrimmedSurface",
"28",

"Node",
"EspduTransform",
"ReceiverPdu",
"SignalPdu",
"TransmitterPdu",
"DISEntityManager",
"DISEntityTypeMapping",
"29",

"Node",
"Script",
"30",

"Node",
"BooleanFilter",
"BooleanSequencer",
"BooleanToggle",
"BooleanTrigger",
"IntegerSequencer",
"IntegerTrigger",
"TimeTrigger",
"31",

"Please",

"Node",
"ComposedShader",
"FloatVertexAttributes",
"Matrix3VertexAttributes",
"Matrix4VertexAttributes",
"PackagedShader",
"ProgramShader",
"ShaderPart",
"ShaderProgram",
"32",

"Node",
"CADAssembly",
"CADFace",
"CADLayer",
"CADPart",
"IndexedQuadSet",
"Quadset",
"33",

"Node",
"ComposedTexture3D",
"ImageTexture3D",
"PixelTexture3D",
"TextureCoordinate3D",
"TextureCoordinate4D",
"TextureTransformMatrix3D",
"TextureTransform3D",
"34",

"Node",
"ComposedCubeMapTexture",
"GeneratedCubeMapTexture",
"ImageCubeMapTexture",
"35",

"Node",
"Layer",
"LayerSet",
"Viewport",
"36",

"Node",
"Layout",
"LayoutGroup",
"LayoutLayer",
"ScreenFontStyle",
"ScreenGroup",
"37",

"Node",
"BallJoint",
"CollidableOffset",
"Collidable",
"CollisionCollection",
"CollisionSensor",
"CollisionSpace",
"Contact",
"DoubleAxisHingeJoint",
"MotorJoint",
"RigidBody",
"RigidBodyCollection",
"SingleAxisHingeJoint",
"SliderJoint",
"UniversalJoint",
"38",

"Node",
"LinePickSensor",
"PickableGroup",
"PickPointSensor",
"PrimitivePockSensor",
"VolumePickSensor",
"39",

"Node",
"ColorChaser",
"ColorDamper",
"CoordinateChaser",
"CoordinateDamper",
"OrientationChaser",
"OrientationDamper",
"PositionChaser",
"PositionChaser2D",
"PositionDamper",
"PositionDamper2D",
"ScalarChaser",
"ScalarDamper",
"TexCoordChaser2D",
"TexCoordDamper2D",
"40",

"Node",
"BoundedPhysicsModel",
"ConeEmitter",
"ExplosionEmitter",
"ForcePhysicsModel",
"ParticleSystem",
"PointEmitter",
"PolylineEmitter",
"SurfaceEmitter",
"VolumeEmitter",
"WindPhysicsModel",
"41",

"Node",
"OpacityMapVolumeStyle",
"VolumeData",
"BoundaryEnhancementVolumeStyle",
"ComposedVolumeStyle",
"EdgeEnhancementVolumeStyle",
"IsoSurfaceVolumeData",
"ProjectionVolumeStyle",
"SegmentedVolumeData",
"SilhouetteEnhancementVolumeStyle",
"ToneMappedVolumeStyle",
"BlendedVolumeStyle",
"CartoonVolumeStyle",
"ShadedVolumeStyle",
"42",

"Node",
"TextureProjector",
"TextureProjectorParallel",
"TextureProjectorPoint",
"43",

"Node",
"MIDIPortSource",
"MIDIFileSource",
"MIDIPortDestination",
"MIDIPrintDestination",
"MIDIFileDestination",
"MIDIOut",
"MIDIn",
"MIDIToneSplitter",
"MIDIToneMerger",
"MIDIConverterIn",
"MIDIConverterOut",
"MIDIAudioSynth",
"SAI",

"Augmented",

"Node",
"CalibratedCameraSensor",
"TrackingSensor",
"BackdropBackground",
"ImageBackdropBackground",
"Viewpoint",

]);

for (const key in json)
{
   json [key] .freewrl = s .has (key);
}
fs .writeFileSync ("browser-compatibility.json", JSON .stringify (json))
