---
title: Constants Services
date: 2022-11-28
nav: reference
categories: [Reference]
tags: [Constants, Services]
---
## X3DConstants

The X3DConstants object is used to define constants values used throughout this language binding. Each property is defined as a numeric, read-only value. The individual values are not specified; these are implementation-dependent. These constants can be used anywhere that a service request wishes to return some fixed value such as if or switch statements. The list of known values are defined in the table below.

The X3DConstants object is unique in ECMAScript in that there is exactly one globally available instance of the object, named X3DConstants. Properties can be accessed using the syntax X3DConstants.\<property-name\>.

The object consists solely of read-only properties. It does not define any additional functions.

### X3DConstant values

#### Browser Event Constants

- INITIALIZED_EVENT
- SHUTDOWN_EVENT
- CONNECTION_ERROR
- INITIALIZED_ERROR

#### Load State Constants

- NOT_STARTED_STATE
- IN_PROGRESS_STATE
- COMPLETE_STATE
- FAILED_STATE

#### Access Type Constants

- initializeOnly
- inputOnly
- outputOnly
- inputOutput

#### Field Type Constants

- SFBool
- SFColor
- SFColorRGBA
- SFDouble
- SFFloat
- SFImage
- SFInt32
- SFMatrix3d
- SFMatrix3f
- SFMatrix4d
- SFMatrix4f
- SFNode
- SFRotation
- SFString
- SFTime
- SFVec2d
- SFVec2f
- SFVec3d
- SFVec3f
- SFVec4d
- SFVec4f
- SFBool
- MFColor
- MFColorRGBA
- MFDouble
- MFFloat
- MFImage
- MFInt32
- MFMatrix3d
- MFMatrix3f
- MFMatrix4d
- MFMatrix4f
- MFNode
- MFRotation
- MFString
- MFTime
- MFVec2d
- MFVec2f
- MFVec3d
- MFVec3f
- MFVec4d
- MFVec4f

#### Concrete Node Types

All concrete node types from *AcousticProperties, Analyser, …* to *WorldInfo.*

<!-- CONCRETE NODE TYPES START -->
<!-- DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED. -->

- AcousticProperties
- Analyser
- Anchor
- Appearance
- Arc2D
- ArcClose2D
- AudioClip
- AudioDestination
- Background
- BallJoint
- Billboard
- BiquadFilter
- BlendedVolumeStyle
- BlendMode
- BooleanFilter
- BooleanSequencer
- BooleanToggle
- BooleanTrigger
- BoundaryEnhancementVolumeStyle
- BoundedPhysicsModel
- Box
- BufferAudioSource
- CADAssembly
- CADFace
- CADLayer
- CADPart
- CartoonVolumeStyle
- ChannelMerger
- ChannelSelector
- ChannelSplitter
- Circle2D
- ClipPlane
- CollidableOffset
- CollidableShape
- Collision
- CollisionCollection
- CollisionSensor
- CollisionSpace
- Color
- ColorChaser
- ColorDamper
- ColorInterpolator
- ColorRGBA
- ComposedCubeMapTexture
- ComposedShader
- ComposedTexture3D
- ComposedVolumeStyle
- Cone
- ConeEmitter
- Contact
- Contour2D
- ContourPolyline2D
- Convolver
- Coordinate
- CoordinateChaser
- CoordinateDamper
- CoordinateDouble
- CoordinateInterpolator
- CoordinateInterpolator2D
- Cylinder
- CylinderSensor
- Delay
- DepthMode
- DirectionalLight
- DISEntityManager
- DISEntityTypeMapping
- Disk2D
- DoubleAxisHingeJoint
- DynamicsCompressor
- EaseInEaseOut
- EdgeEnhancementVolumeStyle
- ElevationGrid
- EnvironmentLight
- EspduTransform
- ExplosionEmitter
- Extrusion
- FillProperties
- FloatVertexAttribute
- Fog
- FogCoordinate
- FontStyle
- ForcePhysicsModel
- Gain
- GeneratedCubeMapTexture
- GeoCoordinate
- GeoElevationGrid
- GeoLocation
- GeoLOD
- GeoMetadata
- GeoOrigin
- GeoPositionInterpolator
- GeoProximitySensor
- GeoTouchSensor
- GeoTransform
- GeoViewpoint
- Group
- HAnimDisplacer
- HAnimHumanoid
- HAnimJoint
- HAnimMotion
- HAnimSegment
- HAnimSite
- ImageCubeMapTexture
- ImageTexture
- ImageTexture3D
- ImageTextureAtlas
- IndexedFaceSet
- IndexedLineSet
- IndexedQuadSet
- IndexedTriangleFanSet
- IndexedTriangleSet
- IndexedTriangleStripSet
- Inline
- IntegerSequencer
- IntegerTrigger
- IsoSurfaceVolumeData
- KeySensor
- Layer
- LayerSet
- Layout
- LayoutGroup
- LayoutLayer
- LinePickSensor
- LineProperties
- LineSet
- ListenerPointSource
- LoadSensor
- LocalFog
- LOD
- Material
- Matrix3VertexAttribute
- Matrix4VertexAttribute
- MetadataBoolean
- MetadataDouble
- MetadataFloat
- MetadataInteger
- MetadataSet
- MetadataString
- MicrophoneSource
- MotorJoint
- MovieTexture
- MultiTexture
- MultiTextureCoordinate
- MultiTextureTransform
- NavigationInfo
- Normal
- NormalInterpolator
- NurbsCurve
- NurbsCurve2D
- NurbsOrientationInterpolator
- NurbsPatchSurface
- NurbsPositionInterpolator
- NurbsSet
- NurbsSurfaceInterpolator
- NurbsSweptSurface
- NurbsSwungSurface
- NurbsTextureCoordinate
- NurbsTrimmedSurface
- OpacityMapVolumeStyle
- OrientationChaser
- OrientationDamper
- OrientationInterpolator
- OrthoViewpoint
- OscillatorSource
- PackagedShader
- ParticleSystem
- PeriodicWave
- PhysicalMaterial
- PickableGroup
- PixelTexture
- PixelTexture3D
- PlaneSensor
- PointEmitter
- PointLight
- PointPickSensor
- PointProperties
- PointSet
- Polyline2D
- PolylineEmitter
- Polypoint2D
- PositionChaser
- PositionChaser2D
- PositionDamper
- PositionDamper2D
- PositionInterpolator
- PositionInterpolator2D
- PrimitivePickSensor
- ProgramShader
- ProjectionVolumeStyle
- ProximitySensor
- QuadSet
- ReceiverPdu
- Rectangle2D
- RigidBody
- RigidBodyCollection
- ScalarChaser
- ScalarDamper
- ScalarInterpolator
- ScreenFontStyle
- ScreenGroup
- Script
- SegmentedVolumeData
- ShadedVolumeStyle
- ShaderPart
- ShaderProgram
- Shape
- SignalPdu
- SilhouetteEnhancementVolumeStyle
- SingleAxisHingeJoint
- SliderJoint
- Sound
- SpatialSound
- Sphere
- SphereSensor
- SplinePositionInterpolator
- SplinePositionInterpolator2D
- SplineScalarInterpolator
- SpotLight
- SquadOrientationInterpolator
- StaticGroup
- StreamAudioDestination
- StreamAudioSource
- StringSensor
- SurfaceEmitter
- Switch
- TexCoordChaser2D
- TexCoordDamper2D
- Text
- TextureBackground
- TextureCoordinate
- TextureCoordinate3D
- TextureCoordinate4D
- TextureCoordinateGenerator
- TextureProjector
- TextureProjectorParallel
- TextureProperties
- TextureTransform
- TextureTransform3D
- TextureTransformMatrix3D
- TimeSensor
- TimeTrigger
- ToneMappedVolumeStyle
- TouchSensor
- Transform
- TransformSensor
- TransmitterPdu
- TriangleFanSet
- TriangleSet
- TriangleSet2D
- TriangleStripSet
- TwoSidedMaterial
- UniversalJoint
- UnlitMaterial
- Viewpoint
- ViewpointGroup
- Viewport
- VisibilitySensor
- VolumeData
- VolumeEmitter
- VolumePickSensor
- WaveShaper
- WindPhysicsModel
- WorldInfo

<!-- CONCRETE NODE TYPES END -->

#### Abstract Node Types

All abstract node types from *X3DAppearanceChildNode, X3DAppearanceNode,* … to *X3DVolumeRenderStyleNode.*

<!-- ABSTRACT NODE TYPES START -->
<!-- DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED. -->

- X3DAppearanceChildNode
- X3DAppearanceNode
- X3DBackgroundNode
- X3DBindableNode
- X3DBoundedObject
- X3DChaserNode
- X3DChildNode
- X3DColorNode
- X3DComposableVolumeRenderStyleNode
- X3DComposedGeometryNode
- X3DCoordinateNode
- X3DDamperNode
- X3DDragSensorNode
- X3DEnvironmentalSensorNode
- X3DEnvironmentTextureNode
- X3DFogObject
- X3DFollowerNode
- X3DFontStyleNode
- X3DGeometricPropertyNode
- X3DGeometryNode
- X3DGroupingNode
- X3DInfoNode
- X3DInterpolatorNode
- X3DKeyDeviceSensorNode
- X3DLayerNode
- X3DLayoutNode
- X3DLightNode
- X3DMaterialNode
- X3DMetadataObject
- X3DNBodyCollidableNode
- X3DNBodyCollisionSpaceNode
- X3DNetworkSensorNode
- X3DNode
- X3DNormalNode
- X3DNurbsControlCurveNode
- X3DNurbsSurfaceGeometryNode
- X3DOneSidedMaterialNode
- X3DParametricGeometryNode
- X3DParticleEmitterNode
- X3DParticlePhysicsModelNode
- X3DPickableObject
- X3DPickSensorNode
- X3DPointingDeviceSensorNode
- X3DProductStructureChildNode
- X3DProgrammableShaderObject
- X3DPrototypeInstance
- X3DRigidJointNode
- X3DScriptNode
- X3DSensorNode
- X3DSequencerNode
- X3DShaderNode
- X3DShapeNode
- X3DSingleTextureCoordinateNode
- X3DSingleTextureNode
- X3DSingleTextureTransformNode
- X3DSoundChannelNode
- X3DSoundDestinationNode
- X3DSoundNode
- X3DSoundProcessingNode
- X3DSoundSourceNode
- X3DStatement
- X3DTexture2DNode
- X3DTexture3DNode
- X3DTextureCoordinateNode
- X3DTextureNode
- X3DTextureProjectorNode
- X3DTextureTransformNode
- X3DTimeDependentNode
- X3DTouchSensorNode
- X3DTriggerNode
- X3DUrlObject
- X3DVertexAttributeNode
- X3DViewpointNode
- X3DViewportNode
- X3DVolumeDataNode
- X3DVolumeRenderStyleNode

<!-- ABSTRACT NODE TYPES END -->