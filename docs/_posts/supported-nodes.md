---
title: Supported Nodes
date: 2022-11-28
nav: main
categories: []
tags: [Supported, Nodes, Components, Profiles]
---
## Overview

X_ITE supports a certain number of X3D nodes. Objects in an X3D scene are also called nodes. These nodes are grouped into components and the components are grouped in profiles. Since these components can be dynamically reloaded as required, it is important to specify a suitable specification version and component/profile statements.

The following lists outlines the profiles and nodes that are supported in X_ITE.

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

X_ITE has achieved the [X3D Immersive Profile](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/immersive.html){:target="_blank"} support (which matches the VRML97 palette) verified by the X3D consortium at [web3d.org](https://www.web3d.org){:target="_blank"}.

## Supported Components

This section documents all of supported nodes by X_ITE.

X_ITE supports a limited set of nodes defined by the X3D specification. There are currently 234 of 263 nodes (89 %) implemented. The implementation of these nodes is complete in that that the nodes will support all the required fields and features for that implementation unless otherwise stated.

### CADGeometry

* [CADAssembly](components/cadgeometry/cadassembly)
* [CADFace](components/cadgeometry/cadface)
* [CADLayer](components/cadgeometry/cadlayer)
* [CADPart](components/cadgeometry/cadpart)
* [IndexedQuadSet](components/cadgeometry/indexedquadset)
* [QuadSet](components/cadgeometry/quadset)

### Core

* [MetadataBoolean](components/core/metadataboolean)
* [MetadataDouble](components/core/metadatadouble)
* [MetadataFloat](components/core/metadatafloat)
* [MetadataInteger](components/core/metadatainteger)
* [MetadataSet](components/core/metadataset)
* [MetadataString](components/core/metadatastring)
* [WorldInfo](components/core/worldinfo)

### CubeMapTexturing

* [ComposedCubeMapTexture](components/cubemaptexturing/composedcubemaptexture)
* [GeneratedCubeMapTexture](components/cubemaptexturing/generatedcubemaptexture)
* [ImageCubeMapTexture](components/cubemaptexturing/imagecubemaptexture)

### EnvironmentalEffects

* [Background](components/environmentaleffects/background)
* [Fog](components/environmentaleffects/fog)
* [FogCoordinate](components/environmentaleffects/fogcoordinate)
* [LocalFog](components/environmentaleffects/localfog)
* [TextureBackground](components/environmentaleffects/texturebackground)

### EnvironmentalSensor

* [ProximitySensor](components/environmentalsensor/proximitysensor)
* [TransformSensor](components/environmentalsensor/transformsensor)
* [VisibilitySensor](components/environmentalsensor/visibilitysensor)

### EventUtilities

* [BooleanFilter](components/eventutilities/booleanfilter)
* [BooleanSequencer](components/eventutilities/booleansequencer)
* [BooleanToggle](components/eventutilities/booleantoggle)
* [BooleanTrigger](components/eventutilities/booleantrigger)
* [IntegerSequencer](components/eventutilities/integersequencer)
* [IntegerTrigger](components/eventutilities/integertrigger)
* [TimeTrigger](components/eventutilities/timetrigger)

### Followers

* [ColorChaser](components/followers/colorchaser)
* [ColorDamper](components/followers/colordamper)
* [CoordinateChaser](components/followers/coordinatechaser)
* [CoordinateDamper](components/followers/coordinatedamper)
* [OrientationChaser](components/followers/orientationchaser)
* [OrientationDamper](components/followers/orientationdamper)
* [PositionChaser](components/followers/positionchaser)
* [PositionChaser2D](components/followers/positionchaser2d)
* [PositionDamper](components/followers/positiondamper)
* [PositionDamper2D](components/followers/positiondamper2d)
* [ScalarChaser](components/followers/scalarchaser)
* [ScalarDamper](components/followers/scalardamper)
* [TexCoordChaser2D](components/followers/texcoordchaser2d)
* [TexCoordDamper2D](components/followers/texcoorddamper2d)

### Geometry2D

* [Arc2D](components/geometry2d/arc2d)
* [ArcClose2D](components/geometry2d/arcclose2d)
* [Circle2D](components/geometry2d/circle2d)
* [Disk2D](components/geometry2d/disk2d)
* [Polyline2D](components/geometry2d/polyline2d)
* [Polypoint2D](components/geometry2d/polypoint2d)
* [Rectangle2D](components/geometry2d/rectangle2d)
* [TriangleSet2D](components/geometry2d/triangleset2d)

### Geometry3D

* [Box](components/geometry3d/box)
* [Cone](components/geometry3d/cone)
* [Cylinder](components/geometry3d/cylinder)
* [ElevationGrid](components/geometry3d/elevationgrid)
* [Extrusion](components/geometry3d/extrusion)
* [IndexedFaceSet](components/geometry3d/indexedfaceset)
* [Sphere](components/geometry3d/sphere)

### Geospatial

* [GeoCoordinate](components/geospatial/geocoordinate)
* [GeoElevationGrid](components/geospatial/geoelevationgrid)
* [GeoLOD](components/geospatial/geolod)
* [GeoLocation](components/geospatial/geolocation)
* [GeoMetadata](components/geospatial/geometadata)
* [GeoOrigin](components/geospatial/geoorigin)
* [GeoPositionInterpolator](components/geospatial/geopositioninterpolator)
* [GeoProximitySensor](components/geospatial/geoproximitysensor)
* [GeoTouchSensor](components/geospatial/geotouchsensor)
* [GeoTransform](components/geospatial/geotransform)
* [GeoViewpoint](components/geospatial/geoviewpoint)

### Grouping

* [Group](components/grouping/group)
* [StaticGroup](components/grouping/staticgroup)
* [Switch](components/grouping/switch)
* [Transform](components/grouping/transform)

### H-Anim

* [HAnimDisplacer](components/hanim/hanimdisplacer)
* [HAnimHumanoid](components/hanim/hanimhumanoid)
* [HAnimJoint](components/hanim/hanimjoint)
* [HAnimSegment](components/hanim/hanimsegment)
* [HAnimSite](components/hanim/hanimsite)

### Interpolation

* [ColorInterpolator](components/interpolation/colorinterpolator)
* [CoordinateInterpolator](components/interpolation/coordinateinterpolator)
* [CoordinateInterpolator2D](components/interpolation/coordinateinterpolator2d)
* [EaseInEaseOut](components/interpolation/easeineaseout)
* [NormalInterpolator](components/interpolation/normalinterpolator)
* [OrientationInterpolator](components/interpolation/orientationinterpolator)
* [PositionInterpolator](components/interpolation/positioninterpolator)
* [PositionInterpolator2D](components/interpolation/positioninterpolator2d)
* [ScalarInterpolator](components/interpolation/scalarinterpolator)
* [SplinePositionInterpolator](components/interpolation/splinepositioninterpolator)
* [SplinePositionInterpolator2D](components/interpolation/splinepositioninterpolator2d)
* [SplineScalarInterpolator](components/interpolation/splinescalarinterpolator)
* [SquadOrientationInterpolator](components/interpolation/squadorientationinterpolator)

### KeyDeviceSensor

* [KeySensor](components/keydevicesensor/keysensor)
* [StringSensor](components/keydevicesensor/stringsensor)

### Layering

* [Layer](components/layering/layer)
* [LayerSet](components/layering/layerset)
* [Viewport](components/layering/viewport)

### Layout

* [Layout](components/layout/layout)
* [LayoutGroup](components/layout/layoutgroup)
* [LayoutLayer](components/layout/layoutlayer)
* [ScreenFontStyle](components/layout/screenfontstyle)
* [ScreenGroup](components/layout/screengroup)

### Lighting

* [DirectionalLight](components/lighting/directionallight)
* [EnvironmentLight](components/Lighting/EnvironmentLight.md)
* [PointLight](components/lighting/pointlight)
* [SpotLight](components/lighting/spotlight)

### Navigation

* [Billboard](components/navigation/billboard)
* [Collision](components/navigation/collision)
* [LOD](components/navigation/lod)
* [NavigationInfo](components/navigation/navigationinfo)
* [OrthoViewpoint](components/navigation/orthoviewpoint)
* [Viewpoint](components/navigation/viewpoint)
* [ViewpointGroup](components/navigation/viewpointgroup)

### Networking

* [Anchor](components/networking/anchor)
* [Inline](components/networking/inline)
* [LoadSensor](components/networking/loadsensor)

### NURBS

* [ContourPolyline2D](components/nurbs/contourpolyline2d)
* [CoordinateDouble](components/nurbs/coordinatedouble)
* [NurbsCurve](components/nurbs/nurbscurve)
* [NurbsCurve2D](components/nurbs/nurbscurve2d)
* [NurbsOrientationInterpolator](components/nurbs/nurbsorientationinterpolator)
* [NurbsPatchSurface](components/nurbs/nurbspatchsurface)
* [NurbsPositionInterpolator](components/nurbs/nurbspositioninterpolator)
* [NurbsSet](components/nurbs/nurbsset)
* [NurbsSurfaceInterpolator](components/nurbs/nurbssurfaceinterpolator)
* [NurbsSweptSurface](components/nurbs/nurbssweptsurface)
* [NurbsSwungSurface](components/nurbs/nurbsswungsurface)
* [NurbsTextureCoordinate](components/nurbs/nurbstexturecoordinate)

### ParticleSystems

* [BoundedPhysicsModel](components/particlesystems/boundedphysicsmodel)
* [ConeEmitter](components/particlesystems/coneemitter)
* [ExplosionEmitter](components/particlesystems/explosionemitter)
* [ForcePhysicsModel](components/particlesystems/forcephysicsmodel)
* [ParticleSystem](components/particlesystems/particlesystem)
* [PointEmitter](components/particlesystems/pointemitter)
* [PolylineEmitter](components/particlesystems/polylineemitter)
* [SurfaceEmitter](components/particlesystems/surfaceemitter)
* [VolumeEmitter](components/particlesystems/volumeemitter)
* [WindPhysicsModel](components/particlesystems/windphysicsmodel)

### Picking

* [LinePickSensor](components/picking/linepicksensor)
* [PickableGroup](components/picking/pickablegroup)
* [PointPickSensor](components/picking/pointpicksensor)
* [PrimitivePickSensor](components/picking/primitivepicksensor)
* [VolumePickSensor](components/picking/volumepicksensor)

### PointingDeviceSensor

* [CylinderSensor](components/pointingdevicesensor/cylindersensor)
* [PlaneSensor](components/pointingdevicesensor/planesensor)
* [SphereSensor](components/pointingdevicesensor/spheresensor)
* [TouchSensor](components/pointingdevicesensor/touchsensor)

### Rendering

* [ClipPlane](components/rendering/clipplane)
* [Color](components/rendering/color)
* [ColorRGBA](components/rendering/colorrgba)
* [Coordinate](components/rendering/coordinate)
* [IndexedLineSet](components/rendering/indexedlineset)
* [IndexedTriangleFanSet](components/rendering/indexedtrianglefanset)
* [IndexedTriangleSet](components/rendering/indexedtriangleset)
* [IndexedTriangleStripSet](components/rendering/indexedtrianglestripset)
* [LineSet](components/rendering/lineset)
* [Normal](components/rendering/normal)
* [PointSet](components/rendering/pointset)
* [TriangleFanSet](components/rendering/trianglefanset)
* [TriangleSet](components/rendering/triangleset)
* [TriangleStripSet](components/rendering/trianglestripset)

### RigidBodyCollection

* [BallJoint](components/rigidbodyphysics/balljoint)
* [CollidableOffset](components/rigidbodyphysics/collidableoffset)
* [CollidableShape](components/rigidbodyphysics/collidableshape)
* [CollisionCollection](components/rigidbodyphysics/collisioncollection)
* [CollisionSensor](components/rigidbodyphysics/collisionsensor)
* [CollisionSpace](components/rigidbodyphysics/collisionspace)
* [Contact](components/rigidbodyphysics/contact)
* [DoubleAxisHingeJoint](components/rigidbodyphysics/doubleaxishingejoint)
* [RigidBody](components/rigidbodyphysics/rigidbody)
* [RigidBodyCollection](components/rigidbodyphysics/rigidbodycollection)
* [SingleAxisHingeJoint](components/rigidbodyphysics/singleaxishingejoint)
* [SliderJoint](components/rigidbodyphysics/sliderjoint)

### Scripting

* [Script](components/scripting/script)

### Shaders

* [ComposedShader](components/shaders/composedshader)
* [FloatVertexAttribute](components/shaders/floatvertexattribute)
* [Matrix3VertexAttribute](components/shaders/matrix3vertexattribute)
* [Matrix4VertexAttribute](components/shaders/matrix4vertexattribute)
* [ShaderPart](components/shaders/shaderpart)

### Shape

* [Appearance](components/shape/appearance)
* [FillProperties](components/shape/fillproperties)
* [LineProperties](components/shape/lineproperties)
* [Material](components/shape/material)
* [PhysicalMaterial](components/shape/physicalmaterial)
* [PointProperties](components/shape/pointproperties)
* [Shape](components/shape/shape)
* [TwoSidedMaterial](components/shape/twosidedmaterial)
* [UnlitMaterial](components/shape/unlitmaterial)

### Sound

* [Analyser](components/sound/analyser)
* [AudioClip](components/sound/audioclip)
* [AudioDestination](components/sound/audiodestination)
* [Gain](components/sound/gain)
* [MicrophoneSource](components/sound/microphonesource)
* [OscillatorSource](components/sound/oscillatorsource)
* [PeriodicWave](components/sound/periodicwave)
* [Sound](components/sound/sound)

### Text

* [FontStyle](components/text/fontstyle)
* [Text](components/text/text)

### TextureProjector

* [TextureProjector](components/textureprojector/textureprojector)
* [TextureProjectorParallel](components/textureprojector/textureprojectorparallel)

### Texturing

* [ImageTexture](components/texturing/imagetexture)
* [MovieTexture](components/texturing/movietexture)
* [MultiTexture](components/texturing/multitexture)
* [MultiTextureCoordinate](components/texturing/multitexturecoordinate)
* [MultiTextureTransform](components/texturing/multitexturetransform)
* [PixelTexture](components/texturing/pixeltexture)
* [TextureCoordinate](components/texturing/texturecoordinate)
* [TextureCoordinateGenerator](components/texturing/texturecoordinategenerator)
* [TextureProperties](components/texturing/textureproperties)
* [TextureTransform](components/texturing/texturetransform)

### Texturing3D

* [ComposedTexture3D](components/texturing3d/composedtexture3d)
* [ImageTexture3D](components/texturing3d/imagetexture3d)
* [ImageTextureAtlas](components/texturing3d/imagetextureatlas)
* [PixelTexture3D](components/texturing3d/pixeltexture3d)
* [TextureCoordinate3D](components/texturing3d/texturecoordinate3d)
* [TextureCoordinate4D](components/texturing3d/texturecoordinate4d)
* [TextureTransform3D](components/texturing3d/texturetransform3d)
* [TextureTransformMatrix3D](components/texturing3d/texturetransformmatrix3d)

### Time

* [TimeSensor](components/time/timesensor)

### VolumeRendering

* [BlendedVolumeStyle](components/volumerendering/blendedvolumestyle)
* [BoundaryEnhancementVolumeStyle](components/volumerendering/boundaryenhancementvolumestyle)
* [CartoonVolumeStyle](components/volumerendering/cartoonvolumestyle)
* [ComposedVolumeStyle](components/volumerendering/composedvolumestyle)
* [EdgeEnhancementVolumeStyle](components/volumerendering/edgeenhancementvolumestyle)
* [IsoSurfaceVolumeData](components/volumerendering/isosurfacevolumedata)
* [OpacityMapVolumeStyle](components/volumerendering/opacitymapvolumestyle)
* [ProjectionVolumeStyle](components/volumerendering/projectionvolumestyle)
* [SegmentedVolumeData](components/volumerendering/segmentedvolumedata)
* [ShadedVolumeStyle](components/volumerendering/shadedvolumestyle)
* [SilhouetteEnhancementVolumeStyle](components/volumerendering/silhouetteenhancementvolumestyle)
* [ToneMappedVolumeStyle](components/volumerendering/tonemappedvolumestyle)
* [VolumeData](components/volumerendering/volumedata)

### X_ITE

* [BlendMode](components/x-ite/blendmode)
