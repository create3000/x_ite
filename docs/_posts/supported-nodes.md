---
title: Supported Nodes
date: 2022-11-28
nav: main
categories: []
tags: [Supported, Nodes, Components, Profiles]
---
## Overview

X\_ITE supports a certain number of X3D nodes. Objects in a X3D scene are also called nodes. These nodes are grouped into components and the components are grouped in profiles.

The following lists outlines the profiles and nodes that are supported in X\_ITE.

## Supported Statements

- component
- connect
- EXPORT
- ExternProtoDeclare
- field
- fieldValue
- head
- IMPORT
- IS
- meta
- ProtoBody
- ProtoDeclare
- ProtoInstance
- ProtoInterface
- ROUTE
- Scene
- UNIT
- X3D

## Supported Profiles

X\_ITE has achieved the [X3D Immersive Profile](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/immersive.html){:target="_blank"} support (which matches the VRML97 palette) verified by the X3D consortium at [web3d.org](https://www.web3d.org){:target="_blank"}.

## Supported Components

This section documents all of supported nodes by X\_ITE.

X\_ITE supports a limited set of nodes defined by the X3D specification. There are currently 223 of 236 nodes (94 %) implemented. The implementation of these nodes is complete in that that the nodes will support all the required fields and features for that implementation unless otherwise stated.

### CADGeometry

- [CADAssembly](components/CADGeometry/CADAssembly)
- [CADFace](components/CADGeometry/CADFace)
- [CADLayer](components/CADGeometry/CADLayer)
- [CADPart](components/CADGeometry/CADPart)
- [IndexedQuadSet](components/CADGeometry/IndexedQuadSet)
- [QuadSet](components/CADGeometry/QuadSet)

### Core

- [MetadataBoolean](components/Core/MetadataBoolean)
- [MetadataDouble](components/Core/MetadataDouble)
- [MetadataFloat](components/Core/MetadataFloat)
- [MetadataInteger](components/Core/MetadataInteger)
- [MetadataSet](components/Core/MetadataSet)
- [MetadataString](components/Core/MetadataString)
- [WorldInfo](components/Core/WorldInfo)

### CubeMapTexturing

- [ComposedCubeMapTexture](components/CubeMapTexturing/ComposedCubeMapTexture)
- [GeneratedCubeMapTexture](components/CubeMapTexturing/GeneratedCubeMapTexture)
- [ImageCubeMapTexture](components/CubeMapTexturing/ImageCubeMapTexture)

### EnvironmentalEffects

- [Background](components/EnvironmentalEffects/Background)
- [Fog](components/EnvironmentalEffects/Fog)
- [FogCoordinate](components/EnvironmentalEffects/FogCoordinate)
- [LocalFog](components/EnvironmentalEffects/LocalFog)
- [TextureBackground](components/EnvironmentalEffects/TextureBackground)

### EnvironmentalSensor

- [ProximitySensor](components/EnvironmentalSensor/ProximitySensor)
- [TransformSensor](components/EnvironmentalSensor/TransformSensor)
- [VisibilitySensor](components/EnvironmentalSensor/VisibilitySensor)

### EventUtilities

- [BooleanFilter](components/EventUtilities/BooleanFilter)
- [BooleanSequencer](components/EventUtilities/BooleanSequencer)
- [BooleanToggle](components/EventUtilities/BooleanToggle)
- [BooleanTrigger](components/EventUtilities/BooleanTrigger)
- [IntegerSequencer](components/EventUtilities/IntegerSequencer)
- [IntegerTrigger](components/EventUtilities/IntegerTrigger)
- [TimeTrigger](components/EventUtilities/TimeTrigger)

### Followers

- [ColorChaser](components/Followers/ColorChaser)
- [ColorDamper](components/Followers/ColorDamper)
- [CoordinateChaser](components/Followers/CoordinateChaser)
- [CoordinateDamper](components/Followers/CoordinateDamper)
- [OrientationChaser](components/Followers/OrientationChaser)
- [OrientationDamper](components/Followers/OrientationDamper)
- [PositionChaser](components/Followers/PositionChaser)
- [PositionChaser2D](components/Followers/PositionChaser2D)
- [PositionDamper](components/Followers/PositionDamper)
- [PositionDamper2D](components/Followers/PositionDamper2D)
- [ScalarChaser](components/Followers/ScalarChaser)
- [ScalarDamper](components/Followers/ScalarDamper)
- [TexCoordChaser2D](components/Followers/TexCoordChaser2D)
- [TexCoordDamper2D](components/Followers/TexCoordDamper2D)

### Geometry2D

- [Arc2D](components/Geometry2D/Arc2D)
- [ArcClose2D](components/Geometry2D/ArcClose2D)
- [Circle2D](components/Geometry2D/Circle2D)
- [Disk2D](components/Geometry2D/Disk2D)
- [Polyline2D](components/Geometry2D/Polyline2D)
- [Polypoint2D](components/Geometry2D/Polypoint2D)
- [Rectangle2D](components/Geometry2D/Rectangle2D)
- [TriangleSet2D](components/Geometry2D/TriangleSet2D)

### Geometry3D

- [Box](components/Geometry3D/Box)
- [Cone](components/Geometry3D/Cone)
- [Cylinder](components/Geometry3D/Cylinder)
- [ElevationGrid](components/Geometry3D/ElevationGrid)
- [Extrusion](components/Geometry3D/Extrusion)
- [IndexedFaceSet](components/Geometry3D/IndexedFaceSet)
- [Sphere](components/Geometry3D/Sphere)

### Geospatial

- [GeoCoordinate](components/Geospatial/GeoCoordinate)
- [GeoElevationGrid](components/Geospatial/GeoElevationGrid)
- [GeoLOD](components/Geospatial/GeoLOD)
- [GeoLocation](components/Geospatial/GeoLocation)
- [GeoMetadata](components/Geospatial/GeoMetadata)
- [GeoOrigin](components/Geospatial/GeoOrigin)
- [GeoPositionInterpolator](components/Geospatial/GeoPositionInterpolator)
- [GeoProximitySensor](components/Geospatial/GeoProximitySensor)
- [GeoTouchSensor](components/Geospatial/GeoTouchSensor)
- [GeoTransform](components/Geospatial/GeoTransform)
- [GeoViewpoint](components/Geospatial/GeoViewpoint)

### Grouping

- [Group](components/Grouping/Group)
- [StaticGroup](components/Grouping/StaticGroup)
- [Switch](components/Grouping/Switch)
- [Transform](components/Grouping/Transform)

### H-Anim

- [HAnimDisplacer](components/HAnim/HAnimDisplacer)
- [HAnimHumanoid](components/HAnim/HAnimHumanoid)
- [HAnimJoint](components/HAnim/HAnimJoint)
- [HAnimSegment](components/HAnim/HAnimSegment)
- [HAnimSite](components/HAnim/HAnimSite)

### Interpolation

- [ColorInterpolator](components/Interpolation/ColorInterpolator)
- [CoordinateInterpolator](components/Interpolation/CoordinateInterpolator)
- [CoordinateInterpolator2D](components/Interpolation/CoordinateInterpolator2D)
- [EaseInEaseOut](components/Interpolation/EaseInEaseOut)
- [NormalInterpolator](components/Interpolation/NormalInterpolator)
- [OrientationInterpolator](components/Interpolation/OrientationInterpolator)
- [PositionInterpolator](components/Interpolation/PositionInterpolator)
- [PositionInterpolator2D](components/Interpolation/PositionInterpolator2D)
- [ScalarInterpolator](components/Interpolation/ScalarInterpolator)
- [SplinePositionInterpolator](components/Interpolation/SplinePositionInterpolator)
- [SplinePositionInterpolator2D](components/Interpolation/SplinePositionInterpolator2D)
- [SplineScalarInterpolator](components/Interpolation/SplineScalarInterpolator)
- [SquadOrientationInterpolator](components/Interpolation/SquadOrientationInterpolator)

### KeyDeviceSensor

- [KeySensor](components/KeyDeviceSensor/KeySensor)
- [StringSensor](components/KeyDeviceSensor/StringSensor)

### Layering

- [Layer](components/Layering/Layer)
- [LayerSet](components/Layering/LayerSet)
- [Viewport](components/Layering/Viewport)

### Layout

- [Layout](components/Layout/Layout)
- [LayoutGroup](components/Layout/LayoutGroup)
- [LayoutLayer](components/Layout/LayoutLayer)
- [ScreenFontStyle](components/Layout/ScreenFontStyle)
- [ScreenGroup](components/Layout/ScreenGroup)

### Lighting

- [DirectionalLight](components/Lighting/DirectionalLight)
- [PointLight](components/Lighting/PointLight)
- [SpotLight](components/Lighting/SpotLight)

### Navigation

- [Billboard](components/Navigation/Billboard)
- [Collision](components/Navigation/Collision)
- [LOD](components/Navigation/LOD)
- [NavigationInfo](components/Navigation/NavigationInfo)
- [OrthoViewpoint](components/Navigation/OrthoViewpoint)
- [Viewpoint](components/Navigation/Viewpoint)
- [ViewpointGroup](components/Navigation/ViewpointGroup)

### Networking

- [Anchor](components/Networking/Anchor)
- [Inline](components/Networking/Inline)
- [LoadSensor](components/Networking/LoadSensor)

### NURBS

- [ContourPolyline2D](components/NURBS/ContourPolyline2D)
- [CoordinateDouble](components/NURBS/CoordinateDouble)
- [NurbsCurve](components/NURBS/NurbsCurve)
- [NurbsCurve2D](components/NURBS/NurbsCurve2D)
- [NurbsOrientationInterpolator](components/NURBS/NurbsOrientationInterpolator)
- [NurbsPatchSurface](components/NURBS/NurbsPatchSurface)
- [NurbsPositionInterpolator](components/NURBS/NurbsPositionInterpolator)
- [NurbsSet](components/NURBS/NurbsSet)
- [NurbsSurfaceInterpolator](components/NURBS/NurbsSurfaceInterpolator)
- [NurbsSweptSurface](components/NURBS/NurbsSweptSurface)
- [NurbsSwungSurface](components/NURBS/NurbsSwungSurface)
- [NurbsTextureCoordinate](components/NURBS/NurbsTextureCoordinate)

### ParticleSystems

- [BoundedPhysicsModel](components/ParticleSystems/BoundedPhysicsModel)
- [ConeEmitter](components/ParticleSystems/ConeEmitter)
- [ExplosionEmitter](components/ParticleSystems/ExplosionEmitter)
- [ForcePhysicsModel](components/ParticleSystems/ForcePhysicsModel)
- [ParticleSystem](components/ParticleSystems/ParticleSystem)
- [PointEmitter](components/ParticleSystems/PointEmitter)
- [PolylineEmitter](components/ParticleSystems/PolylineEmitter)
- [SurfaceEmitter](components/ParticleSystems/SurfaceEmitter)
- [VolumeEmitter](components/ParticleSystems/VolumeEmitter)
- [WindPhysicsModel](components/ParticleSystems/WindPhysicsModel)

### Picking

- [LinePickSensor](components/Picking/LinePickSensor)
- [PickableGroup](components/Picking/PickableGroup)
- [PointPickSensor](components/Picking/PointPickSensor)
- [PrimitivePickSensor](components/Picking/PrimitivePickSensor)
- [VolumePickSensor](components/Picking/VolumePickSensor)

### PointingDeviceSensor

- [CylinderSensor](components/PointingDeviceSensor/CylinderSensor)
- [PlaneSensor](components/PointingDeviceSensor/PlaneSensor)
- [SphereSensor](components/PointingDeviceSensor/SphereSensor)
- [TouchSensor](components/PointingDeviceSensor/TouchSensor)

### ProjectiveTextureMapping

- [TextureProjector](components//TextureProjector)
- [TextureProjectorParallel](components//TextureProjectorParallel)

### Rendering

- [ClipPlane](components/Rendering/ClipPlane)
- [Color](components/Rendering/Color)
- [ColorRGBA](components/Rendering/ColorRGBA)
- [Coordinate](components/Rendering/Coordinate)
- [IndexedLineSet](components/Rendering/IndexedLineSet)
- [IndexedTriangleFanSet](components/Rendering/IndexedTriangleFanSet)
- [IndexedTriangleSet](components/Rendering/IndexedTriangleSet)
- [IndexedTriangleStripSet](components/Rendering/IndexedTriangleStripSet)
- [LineSet](components/Rendering/LineSet)
- [Normal](components/Rendering/Normal)
- [PointSet](components/Rendering/PointSet)
- [TriangleFanSet](components/Rendering/TriangleFanSet)
- [TriangleSet](components/Rendering/TriangleSet)
- [TriangleStripSet](components/Rendering/TriangleStripSet)

### RigidBodyCollection

- [BallJoint](components/RigidBodyPhysics/BallJoint)
- [CollidableOffset](components/RigidBodyPhysics/CollidableOffset)
- [CollidableShape](components/RigidBodyPhysics/CollidableShape)
- [CollisionCollection](components/RigidBodyPhysics/CollisionCollection)
- [CollisionSensor](components/RigidBodyPhysics/CollisionSensor)
- [CollisionSpace](components/RigidBodyPhysics/CollisionSpace)
- [Contact](components/RigidBodyPhysics/Contact)
- [DoubleAxisHingeJoint](components/RigidBodyPhysics/DoubleAxisHingeJoint)
- [RigidBody](components/RigidBodyPhysics/RigidBody)
- [RigidBodyCollection](components/RigidBodyPhysics/RigidBodyCollection)
- [SingleAxisHingeJoint](components/RigidBodyPhysics/SingleAxisHingeJoint)
- [SliderJoint](components/RigidBodyPhysics/SliderJoint)

### Scripting

- [Script](components/Scripting/Script)

### Shaders

- [ComposedShader](components/Shaders/ComposedShader)
- [FloatVertexAttribute](components/Shaders/FloatVertexAttribute)
- [Matrix3VertexAttribute](components/Shaders/Matrix3VertexAttribute)
- [Matrix4VertexAttribute](components/Shaders/Matrix4VertexAttribute)
- [ShaderPart](components/Shaders/ShaderPart)

### Shape

- [Appearance](components/Shape/Appearance)
- [FillProperties](components/Shape/FillProperties)
- [LineProperties](components/Shape/LineProperties)
- [Material](components/Shape/Material)
- [PhysicalMaterial](components//PhysicalMaterial)
- [PointProperties](components/Shape/PointProperties)
- [Shape](components/Shape/Shape)
- [TwoSidedMaterial](components/Shape/TwoSidedMaterial)
- [UnlitMaterial](components//UnlitMaterial)

### Sound

- [AudioClip](components/Sound/AudioClip)
- [Sound](components/Sound/Sound)

### Text

- [FontStyle](components/Text/FontStyle)
- [Text](components/Text/Text)

### Texturing

- [ImageTexture](components/Texturing/ImageTexture)
- [MovieTexture](components/Texturing/MovieTexture)
- [MultiTexture](components/Texturing/MultiTexture)
- [MultiTextureCoordinate](components/Texturing/MultiTextureCoordinate)
- [MultiTextureTransform](components/Texturing/MultiTextureTransform)
- [PixelTexture](components/Texturing/PixelTexture)
- [TextureCoordinate](components/Texturing/TextureCoordinate)
- [TextureCoordinateGenerator](components/Texturing/TextureCoordinateGenerator)
- [TextureProperties](components/Texturing/TextureProperties)
- [TextureTransform](components/Texturing/TextureTransform)

### Texturing3D

- [ComposedTexture3D](components/Texturing3D/ComposedTexture3D)
- [ImageTexture3D](components/Texturing3D/ImageTexture3D)
- ImageTextureAtlas
- [PixelTexture3D](components/Texturing3D/PixelTexture3D)
- [TextureCoordinate3D](components/Texturing3D/TextureCoordinate3D)
- [TextureCoordinate4D](components/Texturing3D/TextureCoordinate4D)
- [TextureTransform3D](components/Texturing3D/TextureTransform3D)
- [TextureTransformMatrix3D](components/Texturing3D/TextureTransformMatrix3D)

### Time

- [TimeSensor](components/Time/TimeSensor)

### VolumeRendering

- [BlendedVolumeStyle](components/VolumeRendering/BlendedVolumeStyle)
- [BoundaryEnhancementVolumeStyle](components/VolumeRendering/BoundaryEnhancementVolumeStyle)
- [CartoonVolumeStyle](components/VolumeRendering/CartoonVolumeStyle)
- [ComposedVolumeStyle](components/VolumeRendering/ComposedVolumeStyle)
- [EdgeEnhancementVolumeStyle](components/VolumeRendering/EdgeEnhancementVolumeStyle)
- [IsoSurfaceVolumeData](components/VolumeRendering/IsoSurfaceVolumeData)
- [OpacityMapVolumeStyle](components/VolumeRendering/OpacityMapVolumeStyle)
- [ProjectionVolumeStyle](components/VolumeRendering/ProjectionVolumeStyle)
- [SegmentedVolumeData](components/VolumeRendering/SegmentedVolumeData)
- [ShadedVolumeStyle](components/VolumeRendering/ShadedVolumeStyle)
- [SilhouetteEnhancementVolumeStyle](components/VolumeRendering/SilhouetteEnhancementVolumeStyle)
- [ToneMappedVolumeStyle](components/VolumeRendering/ToneMappedVolumeStyle)
- [VolumeData](components/VolumeRendering/VolumeData)

### X\_ITE

- BlendMode
