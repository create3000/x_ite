---
title: Supported Nodes
date: 2022-11-28
nav: main
categories: []
tags: [Supported, Nodes, Components, Profiles]
---
## Overview

X_ITE supports a certain number of X3D nodes. Objects in an X3D scene are also called nodes. These nodes are grouped into components and these components are grouped into profiles. As components can be dynamically loaded on demand, it is important to specify an appropriate specification version and component/profile statements.

The following lists outline the profiles and nodes supported in X_ITE.

## Supported Statements

* component
* connect
* EXPORT
* ExternProtoDeclare
* field
* fieldValue
* head
* IMPORT
* IS
* meta
* ProtoBody
* ProtoDeclare
* ProtoInstance
* ProtoInterface
* ROUTE
* Scene
* UNIT
* X3D

## Supported Profiles

X_ITE has achieved the [X3D Immersive profile](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/immersive.html) support (which matches the VRML97 palette) verified by the X3D consortium at [web3d.org](https://www.web3d.org).

Of course, [all other profiles](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/profileIndex.html) can also be used, as a large number of nodes are available.

## Supported Components

This section documents all nodes supported by X_ITE.

X_ITE supports a limited number of nodes defined by the X3D specification. Currently 247 out of 260 nodes (95%) are implemented. The implementation of these nodes is complete in the sense that the nodes support all the fields and functions required for that implementation, unless otherwise specified.

<!--
Missing Nodes:
- 6 DIS
- 2 joints from RigidBodyCollection
- 3 shader nodes from Shaders
- 2 sound nodes
-->

<!-- COMPONENTS BEGIN -->

### CADGeometry

- [CADAssembly](/x_ite/components/cadgeometry/cadassembly/)
- [CADFace](/x_ite/components/cadgeometry/cadface/)
- [CADLayer](/x_ite/components/cadgeometry/cadlayer/)
- [CADPart](/x_ite/components/cadgeometry/cadpart/)
- [IndexedQuadSet](/x_ite/components/cadgeometry/indexedquadset/)
- [QuadSet](/x_ite/components/cadgeometry/quadset/)

### Core

- [MetadataBoolean](/x_ite/components/core/metadataboolean/)
- [MetadataDouble](/x_ite/components/core/metadatadouble/)
- [MetadataFloat](/x_ite/components/core/metadatafloat/)
- [MetadataInteger](/x_ite/components/core/metadatainteger/)
- [MetadataSet](/x_ite/components/core/metadataset/)
- [MetadataString](/x_ite/components/core/metadatastring/)
- [WorldInfo](/x_ite/components/core/worldinfo/)

### CubeMapTexturing

- [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/)
- [GeneratedCubeMapTexture](/x_ite/components/cubemaptexturing/generatedcubemaptexture/)
- [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/)

### DIS


### EnvironmentalEffects

- [Background](/x_ite/components/environmentaleffects/background/)
- [Fog](/x_ite/components/environmentaleffects/fog/)
- [FogCoordinate](/x_ite/components/environmentaleffects/fogcoordinate/)
- [LocalFog](/x_ite/components/environmentaleffects/localfog/)
- [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/)

### EnvironmentalSensor

- [ProximitySensor](/x_ite/components/environmentalsensor/proximitysensor/)
- [TransformSensor](/x_ite/components/environmentalsensor/transformsensor/)
- [VisibilitySensor](/x_ite/components/environmentalsensor/visibilitysensor/)

### EventUtilities

- [BooleanFilter](/x_ite/components/eventutilities/booleanfilter/)
- [BooleanSequencer](/x_ite/components/eventutilities/booleansequencer/)
- [BooleanToggle](/x_ite/components/eventutilities/booleantoggle/)
- [BooleanTrigger](/x_ite/components/eventutilities/booleantrigger/)
- [IntegerSequencer](/x_ite/components/eventutilities/integersequencer/)
- [IntegerTrigger](/x_ite/components/eventutilities/integertrigger/)
- [TimeTrigger](/x_ite/components/eventutilities/timetrigger/)

### Followers

- [ColorChaser](/x_ite/components/followers/colorchaser/)
- [ColorDamper](/x_ite/components/followers/colordamper/)
- [CoordinateChaser](/x_ite/components/followers/coordinatechaser/)
- [CoordinateDamper](/x_ite/components/followers/coordinatedamper/)
- [OrientationChaser](/x_ite/components/followers/orientationchaser/)
- [OrientationDamper](/x_ite/components/followers/orientationdamper/)
- [PositionChaser](/x_ite/components/followers/positionchaser/)
- [PositionChaser2D](/x_ite/components/followers/positionchaser2d/)
- [PositionDamper](/x_ite/components/followers/positiondamper/)
- [PositionDamper2D](/x_ite/components/followers/positiondamper2d/)
- [ScalarChaser](/x_ite/components/followers/scalarchaser/)
- [ScalarDamper](/x_ite/components/followers/scalardamper/)
- [TexCoordChaser2D](/x_ite/components/followers/texcoordchaser2d/)
- [TexCoordDamper2D](/x_ite/components/followers/texcoorddamper2d/)

### Geometry2D

- [Arc2D](/x_ite/components/geometry2d/arc2d/)
- [ArcClose2D](/x_ite/components/geometry2d/arcclose2d/)
- [Circle2D](/x_ite/components/geometry2d/circle2d/)
- [Disk2D](/x_ite/components/geometry2d/disk2d/)
- [Polyline2D](/x_ite/components/geometry2d/polyline2d/)
- [Polypoint2D](/x_ite/components/geometry2d/polypoint2d/)
- [Rectangle2D](/x_ite/components/geometry2d/rectangle2d/)
- [TriangleSet2D](/x_ite/components/geometry2d/triangleset2d/)

### Geometry3D

- [Box](/x_ite/components/geometry3d/box/)
- [Cone](/x_ite/components/geometry3d/cone/)
- [Cylinder](/x_ite/components/geometry3d/cylinder/)
- [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/)
- [Extrusion](/x_ite/components/geometry3d/extrusion/)
- [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/)
- [Sphere](/x_ite/components/geometry3d/sphere/)

### Geospatial

- [GeoCoordinate](/x_ite/components/geospatial/geocoordinate/)
- [GeoElevationGrid](/x_ite/components/geospatial/geoelevationgrid/)
- [GeoLOD](/x_ite/components/geospatial/geolod/)
- [GeoLocation](/x_ite/components/geospatial/geolocation/)
- [GeoMetadata](/x_ite/components/geospatial/geometadata/)
- [GeoOrigin](/x_ite/components/geospatial/geoorigin/)
- [GeoPositionInterpolator](/x_ite/components/geospatial/geopositioninterpolator/)
- [GeoProximitySensor](/x_ite/components/geospatial/geoproximitysensor/)
- [GeoTouchSensor](/x_ite/components/geospatial/geotouchsensor/)
- [GeoTransform](/x_ite/components/geospatial/geotransform/)
- [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/)

### Grouping

- [Group](/x_ite/components/grouping/group/)
- [StaticGroup](/x_ite/components/grouping/staticgroup/)
- [Switch](/x_ite/components/grouping/switch/)
- [Transform](/x_ite/components/grouping/transform/)

### HAnim

- [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/)
- [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/)
- [HAnimJoint](/x_ite/components/hanim/hanimjoint/)
- [HAnimMotion](/x_ite/components/hanim/hanimmotion/)
- [HAnimSegment](/x_ite/components/hanim/hanimsegment/)
- [HAnimSite](/x_ite/components/hanim/hanimsite/)

### Interpolation

- [ColorInterpolator](/x_ite/components/interpolation/colorinterpolator/)
- [CoordinateInterpolator](/x_ite/components/interpolation/coordinateinterpolator/)
- [CoordinateInterpolator2D](/x_ite/components/interpolation/coordinateinterpolator2d/)
- [EaseInEaseOut](/x_ite/components/interpolation/easeineaseout/)
- [NormalInterpolator](/x_ite/components/interpolation/normalinterpolator/)
- [OrientationInterpolator](/x_ite/components/interpolation/orientationinterpolator/)
- [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/)
- [PositionInterpolator2D](/x_ite/components/interpolation/positioninterpolator2d/)
- [ScalarInterpolator](/x_ite/components/interpolation/scalarinterpolator/)
- [SplinePositionInterpolator](/x_ite/components/interpolation/splinepositioninterpolator/)
- [SplinePositionInterpolator2D](/x_ite/components/interpolation/splinepositioninterpolator2d/)
- [SplineScalarInterpolator](/x_ite/components/interpolation/splinescalarinterpolator/)
- [SquadOrientationInterpolator](/x_ite/components/interpolation/squadorientationinterpolator/)

### KeyDeviceSensor

- [KeySensor](/x_ite/components/keydevicesensor/keysensor/)
- [StringSensor](/x_ite/components/keydevicesensor/stringsensor/)

### Layering

- [Layer](/x_ite/components/layering/layer/)
- [LayerSet](/x_ite/components/layering/layerset/)
- [Viewport](/x_ite/components/layering/viewport/)

### Layout

- [Layout](/x_ite/components/layout/layout/)
- [LayoutGroup](/x_ite/components/layout/layoutgroup/)
- [LayoutLayer](/x_ite/components/layout/layoutlayer/)
- [ScreenFontStyle](/x_ite/components/layout/screenfontstyle/)
- [ScreenGroup](/x_ite/components/layout/screengroup/)

### Lighting

- [DirectionalLight](/x_ite/components/lighting/directionallight/)
- [EnvironmentLight](/x_ite/components/lighting/environmentlight/) <small class="blue">experimental</small>
- [PointLight](/x_ite/components/lighting/pointlight/)
- [SpotLight](/x_ite/components/lighting/spotlight/)

### NURBS

- [Contour2D](/x_ite/components/nurbs/contour2d/)
- [ContourPolyline2D](/x_ite/components/nurbs/contourpolyline2d/)
- [NurbsCurve](/x_ite/components/nurbs/nurbscurve/)
- [NurbsCurve2D](/x_ite/components/nurbs/nurbscurve2d/)
- [NurbsOrientationInterpolator](/x_ite/components/nurbs/nurbsorientationinterpolator/)
- [NurbsPatchSurface](/x_ite/components/nurbs/nurbspatchsurface/)
- [NurbsPositionInterpolator](/x_ite/components/nurbs/nurbspositioninterpolator/)
- [NurbsSet](/x_ite/components/nurbs/nurbsset/)
- [NurbsSurfaceInterpolator](/x_ite/components/nurbs/nurbssurfaceinterpolator/)
- [NurbsSweptSurface](/x_ite/components/nurbs/nurbssweptsurface/)
- [NurbsSwungSurface](/x_ite/components/nurbs/nurbsswungsurface/)
- [NurbsTextureCoordinate](/x_ite/components/nurbs/nurbstexturecoordinate/)
- [NurbsTrimmedSurface](/x_ite/components/nurbs/nurbstrimmedsurface/)

### Navigation

- [Billboard](/x_ite/components/navigation/billboard/)
- [Collision](/x_ite/components/navigation/collision/)
- [LOD](/x_ite/components/navigation/lod/)
- [NavigationInfo](/x_ite/components/navigation/navigationinfo/)
- [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/)
- [Viewpoint](/x_ite/components/navigation/viewpoint/)
- [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/)

### Networking

- [Anchor](/x_ite/components/networking/anchor/)
- [Inline](/x_ite/components/networking/inline/)
- [LoadSensor](/x_ite/components/networking/loadsensor/)

### ParticleSystems

- [BoundedPhysicsModel](/x_ite/components/particlesystems/boundedphysicsmodel/)
- [ConeEmitter](/x_ite/components/particlesystems/coneemitter/)
- [ExplosionEmitter](/x_ite/components/particlesystems/explosionemitter/)
- [ForcePhysicsModel](/x_ite/components/particlesystems/forcephysicsmodel/)
- [ParticleSystem](/x_ite/components/particlesystems/particlesystem/)
- [PointEmitter](/x_ite/components/particlesystems/pointemitter/)
- [PolylineEmitter](/x_ite/components/particlesystems/polylineemitter/)
- [SurfaceEmitter](/x_ite/components/particlesystems/surfaceemitter/)
- [VolumeEmitter](/x_ite/components/particlesystems/volumeemitter/)
- [WindPhysicsModel](/x_ite/components/particlesystems/windphysicsmodel/)

### Picking

- [LinePickSensor](/x_ite/components/picking/linepicksensor/)
- [PickableGroup](/x_ite/components/picking/pickablegroup/)
- [PointPickSensor](/x_ite/components/picking/pointpicksensor/)
- [PrimitivePickSensor](/x_ite/components/picking/primitivepicksensor/)
- [VolumePickSensor](/x_ite/components/picking/volumepicksensor/)

### PointingDeviceSensor

- [CylinderSensor](/x_ite/components/pointingdevicesensor/cylindersensor/)
- [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/)
- [SphereSensor](/x_ite/components/pointingdevicesensor/spheresensor/)
- [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/)

### Rendering

- [ClipPlane](/x_ite/components/rendering/clipplane/)
- [Color](/x_ite/components/rendering/color/)
- [ColorRGBA](/x_ite/components/rendering/colorrgba/)
- [Coordinate](/x_ite/components/rendering/coordinate/)
- [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/)
- [IndexedLineSet](/x_ite/components/rendering/indexedlineset/)
- [IndexedTriangleFanSet](/x_ite/components/rendering/indexedtrianglefanset/)
- [IndexedTriangleSet](/x_ite/components/rendering/indexedtriangleset/)
- [IndexedTriangleStripSet](/x_ite/components/rendering/indexedtrianglestripset/)
- [LineSet](/x_ite/components/rendering/lineset/)
- [Normal](/x_ite/components/rendering/normal/)
- [PointSet](/x_ite/components/rendering/pointset/)
- [Tangent](/x_ite/components/rendering/tangent/) <small class="blue">experimental</small>
- [TriangleFanSet](/x_ite/components/rendering/trianglefanset/)
- [TriangleSet](/x_ite/components/rendering/triangleset/)
- [TriangleStripSet](/x_ite/components/rendering/trianglestripset/)

### RigidBodyPhysics

- [BallJoint](/x_ite/components/rigidbodyphysics/balljoint/)
- [CollidableOffset](/x_ite/components/rigidbodyphysics/collidableoffset/)
- [CollidableShape](/x_ite/components/rigidbodyphysics/collidableshape/)
- [CollisionCollection](/x_ite/components/rigidbodyphysics/collisioncollection/)
- [CollisionSensor](/x_ite/components/rigidbodyphysics/collisionsensor/)
- [CollisionSpace](/x_ite/components/rigidbodyphysics/collisionspace/)
- [Contact](/x_ite/components/rigidbodyphysics/contact/)
- [DoubleAxisHingeJoint](/x_ite/components/rigidbodyphysics/doubleaxishingejoint/)
- [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/)
- [RigidBodyCollection](/x_ite/components/rigidbodyphysics/rigidbodycollection/)
- [SingleAxisHingeJoint](/x_ite/components/rigidbodyphysics/singleaxishingejoint/)
- [SliderJoint](/x_ite/components/rigidbodyphysics/sliderjoint/)

### Scripting

- [Script](/x_ite/components/scripting/script/)

### Shaders

- [ComposedShader](/x_ite/components/shaders/composedshader/)
- [FloatVertexAttribute](/x_ite/components/shaders/floatvertexattribute/)
- [Matrix3VertexAttribute](/x_ite/components/shaders/matrix3vertexattribute/)
- [Matrix4VertexAttribute](/x_ite/components/shaders/matrix4vertexattribute/)
- [ShaderPart](/x_ite/components/shaders/shaderpart/)

### Shape

- [AcousticProperties](/x_ite/components/shape/acousticproperties/)
- [Appearance](/x_ite/components/shape/appearance/)
- [FillProperties](/x_ite/components/shape/fillproperties/)
- [LineProperties](/x_ite/components/shape/lineproperties/)
- [Material](/x_ite/components/shape/material/)
- [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/)
- [PointProperties](/x_ite/components/shape/pointproperties/)
- [Shape](/x_ite/components/shape/shape/)
- [TwoSidedMaterial](/x_ite/components/shape/twosidedmaterial/) <small class="yellow">depreciated</small>
- [UnlitMaterial](/x_ite/components/shape/unlitmaterial/)

### Sound

- [Analyser](/x_ite/components/sound/analyser/)
- [AudioClip](/x_ite/components/sound/audioclip/)
- [AudioDestination](/x_ite/components/sound/audiodestination/)
- [BiquadFilter](/x_ite/components/sound/biquadfilter/)
- [BufferAudioSource](/x_ite/components/sound/bufferaudiosource/)
- [ChannelMerger](/x_ite/components/sound/channelmerger/)
- [ChannelSelector](/x_ite/components/sound/channelselector/)
- [ChannelSplitter](/x_ite/components/sound/channelsplitter/)
- [Convolver](/x_ite/components/sound/convolver/)
- [Delay](/x_ite/components/sound/delay/)
- [DynamicsCompressor](/x_ite/components/sound/dynamicscompressor/)
- [Gain](/x_ite/components/sound/gain/)
- [ListenerPointSource](/x_ite/components/sound/listenerpointsource/)
- [MicrophoneSource](/x_ite/components/sound/microphonesource/)
- [OscillatorSource](/x_ite/components/sound/oscillatorsource/)
- [PeriodicWave](/x_ite/components/sound/periodicwave/)
- [Sound](/x_ite/components/sound/sound/)
- [SpatialSound](/x_ite/components/sound/spatialsound/)
- [WaveShaper](/x_ite/components/sound/waveshaper/)

### Text

- [FontStyle](/x_ite/components/text/fontstyle/)
- [Text](/x_ite/components/text/text/)

### TextureProjection

- [TextureProjector](/x_ite/components/textureprojection/textureprojector/)
- [TextureProjectorParallel](/x_ite/components/textureprojection/textureprojectorparallel/)

### Texturing

- [ImageTexture](/x_ite/components/texturing/imagetexture/)
- [MovieTexture](/x_ite/components/texturing/movietexture/)
- [MultiTexture](/x_ite/components/texturing/multitexture/)
- [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/)
- [MultiTextureTransform](/x_ite/components/texturing/multitexturetransform/)
- [PixelTexture](/x_ite/components/texturing/pixeltexture/)
- [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/)
- [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/)
- [TextureProperties](/x_ite/components/texturing/textureproperties/)
- [TextureTransform](/x_ite/components/texturing/texturetransform/)

### Texturing3D

- [ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/)
- [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/)
- [ImageTextureAtlas](/x_ite/components/texturing3d/imagetextureatlas/) <small class="blue">experimental</small>
- [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/)
- [TextureCoordinate3D](/x_ite/components/texturing3d/texturecoordinate3d/)
- [TextureCoordinate4D](/x_ite/components/texturing3d/texturecoordinate4d/)
- [TextureTransform3D](/x_ite/components/texturing3d/texturetransform3d/)
- [TextureTransformMatrix3D](/x_ite/components/texturing3d/texturetransformmatrix3d/)

### Time

- [TimeSensor](/x_ite/components/time/timesensor/)

### VolumeRendering

- [BlendedVolumeStyle](/x_ite/components/volumerendering/blendedvolumestyle/)
- [BoundaryEnhancementVolumeStyle](/x_ite/components/volumerendering/boundaryenhancementvolumestyle/)
- [CartoonVolumeStyle](/x_ite/components/volumerendering/cartoonvolumestyle/)
- [ComposedVolumeStyle](/x_ite/components/volumerendering/composedvolumestyle/)
- [EdgeEnhancementVolumeStyle](/x_ite/components/volumerendering/edgeenhancementvolumestyle/)
- [IsoSurfaceVolumeData](/x_ite/components/volumerendering/isosurfacevolumedata/)
- [OpacityMapVolumeStyle](/x_ite/components/volumerendering/opacitymapvolumestyle/)
- [ProjectionVolumeStyle](/x_ite/components/volumerendering/projectionvolumestyle/)
- [SegmentedVolumeData](/x_ite/components/volumerendering/segmentedvolumedata/)
- [ShadedVolumeStyle](/x_ite/components/volumerendering/shadedvolumestyle/)
- [SilhouetteEnhancementVolumeStyle](/x_ite/components/volumerendering/silhouetteenhancementvolumestyle/)
- [ToneMappedVolumeStyle](/x_ite/components/volumerendering/tonemappedvolumestyle/)
- [VolumeData](/x_ite/components/volumerendering/volumedata/)

### X_ITE

- [AnisotropyMaterialExtension](/x_ite/components/x-ite/anisotropymaterialextension/) <small class="blue">experimental</small>
- [BlendMode](/x_ite/components/x-ite/blendmode/) <small class="blue">experimental</small>
- [ClearcoatMaterialExtension](/x_ite/components/x-ite/clearcoatmaterialextension/) <small class="blue">experimental</small>
- [DepthMode](/x_ite/components/x-ite/depthmode/) <small class="blue">experimental</small>
- [DiffuseTransmissionMaterialExtension](/x_ite/components/x-ite/diffusetransmissionmaterialextension/) <small class="blue">experimental</small>
- [DispersionMaterialExtension](/x_ite/components/x-ite/dispersionmaterialextension/) <small class="blue">experimental</small>
- [EmissiveStrengthMaterialExtension](/x_ite/components/x-ite/emissivestrengthmaterialextension/) <small class="blue">experimental</small>
- [IORMaterialExtension](/x_ite/components/x-ite/iormaterialextension/) <small class="blue">experimental</small>
- [InstancedShape](/x_ite/components/x-ite/instancedshape/) <small class="blue">experimental</small>
- [IridescenceMaterialExtension](/x_ite/components/x-ite/iridescencematerialextension/) <small class="blue">experimental</small>
- [SheenMaterialExtension](/x_ite/components/x-ite/sheenmaterialextension/) <small class="blue">experimental</small>
- [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) <small class="yellow">depreciated</small>
- [SpecularMaterialExtension](/x_ite/components/x-ite/specularmaterialextension/) <small class="blue">experimental</small>
- [TransmissionMaterialExtension](/x_ite/components/x-ite/transmissionmaterialextension/) <small class="blue">experimental</small>
- [VolumeMaterialExtension](/x_ite/components/x-ite/volumematerialextension/) <small class="blue">experimental</small>

<!-- COMPONENTS END -->
