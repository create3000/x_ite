---
title: Supported Nodes
nav: main
categories: []
tags: [supported, nodes]
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

X\_ITE has achieved the [X3D Immersive Profile](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/immersive.html) support (which matches the VRML97 palette) verified by the X3D consortium at [web3d.org](https://www.web3d.org).

## Supported Components

This section documents all of supported nodes by X\_ITE.

X\_ITE supports a limited set of nodes defined by the X3D specification. There are currently 223 of 236 nodes (94 %) implemented. The implementation of these nodes is complete in that that the nodes will support all the required fields and features for that implementation unless otherwise stated.

### CADGeometry

- [CADAssembly](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADAssembly)
- [CADFace](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADFace)
- [CADLayer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADLayer)
- [CADPart](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADPart)
- [IndexedQuadSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#IndexedQuadSet)
- [QuadSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#QuadSet)

### Core

- [MetadataBoolean](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataBoolean)
- [MetadataDouble](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataDouble)
- [MetadataFloat](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataFloat)
- [MetadataInteger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataInteger)
- [MetadataSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataSet)
- [MetadataString](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataString)
- [WorldInfo](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#WorldInfo)

### CubeMapTexturing

- [ComposedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#ComposedCubeMapTexture)
- [GeneratedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#GeneratedCubeMapTexture)
- [ImageCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#ImageCubeMapTexture)

### EnvironmentalEffects

- [Background](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#Background)
- [Fog](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#Fog)
- [FogCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#FogCoordinate)
- [LocalFog](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#LocalFog)
- [TextureBackground](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#TextureBackground)

### EnvironmentalSensor

- [ProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#ProximitySensor)
- [TransformSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#TransformSensor)
- [VisibilitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#VisibilitySensor)

### EventUtilities

- [BooleanFilter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanFilter)
- [BooleanSequencer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanSequencer)
- [BooleanToggle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanToggle)
- [BooleanTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanTrigger)
- [IntegerSequencer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#IntegerSequencer)
- [IntegerTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#IntegerTrigger)
- [TimeTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#TimeTrigger)

### Followers

- [ColorChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ColorChaser)
- [ColorDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ColorDamper)
- [CoordinateChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#CoordinateChaser)
- [CoordinateDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#CoordinateDamper)
- [OrientationChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#OrientationChaser)
- [OrientationDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#OrientationDamper)
- [PositionChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionChaser)
- [PositionChaser2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionChaser2D)
- [PositionDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionDamper)
- [PositionDamper2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionDamper2D)
- [ScalarChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ScalarChaser)
- [ScalarDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ScalarDamper)
- [TexCoordChaser2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#TexCoordChaser2D)
- [TexCoordDamper2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#TexCoordDamper2D)

### Geometry2D

- [Arc2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Arc2D)
- [ArcClose2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#ArcClose2D)
- [Circle2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Circle2D)
- [Disk2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Disk2D)
- [Polyline2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Polyline2D)
- [Polypoint2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Polypoint2D)
- [Rectangle2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Rectangle2D)
- [TriangleSet2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#TriangleSet2D)

### Geometry3D

- [Box](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Box)
- [Cone](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cone)
- [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cylinder)
- [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid)
- [Extrusion](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Extrusion)
- [IndexedFaceSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#IndexedFaceSet)
- [Sphere](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Sphere)

### Geospatial

- [GeoCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoCoordinate)
- [GeoElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoElevationGrid)
- [GeoLOD](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoLOD)
- [GeoLocation](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoLocation)
- [GeoMetadata](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoMetadata)
- [GeoOrigin](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoOrigin)
- [GeoPositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoPositionInterpolator)
- [GeoProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoProximitySensor)
- [GeoTouchSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoTouchSensor)
- [GeoTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoTransform)
- [GeoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoViewpoint)

### Grouping

- [Group](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Group)
- [StaticGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#StaticGroup)
- [Switch](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Switch)
- [Transform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Transform)

### H-Anim

- [HAnimDisplacer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimDisplacer)
- [HAnimHumanoid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimHumanoid)
- [HAnimJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimJoint)
- [HAnimSegment](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimSegment)
- [HAnimSite](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimSite)

### Interpolation

- [ColorInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#ColorInterpolator)
- [CoordinateInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#CoordinateInterpolator)
- [CoordinateInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#CoordinateInterpolator2D)
- [EaseInEaseOut](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#EaseInEaseOut)
- [NormalInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#NormalInterpolator)
- [OrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#OrientationInterpolator)
- [PositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#PositionInterpolator)
- [PositionInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#PositionInterpolator2D)
- [ScalarInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#ScalarInterpolator)
- [SplinePositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplinePositionInterpolator)
- [SplinePositionInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplinePositionInterpolator2D)
- [SplineScalarInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplineScalarInterpolator)
- [SquadOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SquadOrientationInterpolator)

### KeyDeviceSensor

- [KeySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/keyboard.html#KeySensor)
- [StringSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/keyboard.html#StringSensor)

### Layering

- [Layer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#Layer)
- [LayerSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#LayerSet)
- [Viewport](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#Viewport)

### Layout

- [Layout](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#Layout)
- [LayoutGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#LayoutGroup)
- [LayoutLayer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#LayoutLayer)
- [ScreenFontStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#ScreenFontStyle)
- [ScreenGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#ScreenGroup)

### Lighting

- [DirectionalLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#DirectionalLight)
- [PointLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#PointLight)
- [SpotLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#SpotLight)

### Navigation

- [Billboard](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Billboard)
- [Collision](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Collision)
- [LOD](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#LOD)
- [NavigationInfo](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#NavigationInfo)
- [OrthoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#OrthoViewpoint)
- [Viewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Viewpoint)
- [ViewpointGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#ViewpointGroup)

### Networking

- [Anchor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#Anchor)
- [Inline](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#Inline)
- [LoadSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#LoadSensor)

### NURBS

- [ContourPolyline2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#ContourPolyline2D)
- [CoordinateDouble](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#CoordinateDouble)
- [NurbsCurve](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsCurve)
- [NurbsCurve2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsCurve2D)
- [NurbsOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsOrientationInterpolator)
- [NurbsPatchSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsPatchSurface)
- [NurbsPositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsPositionInterpolator)
- [NurbsSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSet)
- [NurbsSurfaceInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSurfaceInterpolator)
- [NurbsSweptSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSweptSurface)
- [NurbsSwungSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSwungSurface)
- [NurbsTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsTextureCoordinate)

### ParticleSystems

- [BoundedPhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#BoundedPhysicsModel)
- [ConeEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ConeEmitter)
- [ExplosionEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ExplosionEmitter)
- [ForcePhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ForcePhysicsModel)
- [ParticleSystem](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ParticleSystem)
- [PointEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#PointEmitter)
- [PolylineEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#PolylineEmitter)
- [SurfaceEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#SurfaceEmitter)
- [VolumeEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#VolumeEmitter)
- [WindPhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#WindPhysicsModel)

### Picking

- [LinePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#LinePickSensor)
- [PickableGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PickableGroup)
- [PointPickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PointPickSensor)
- [PrimitivePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PrimitivePickSensor)
- [VolumePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#VolumePickSensor)

### PointingDeviceSensor

- [CylinderSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#CylinderSensor)
- [PlaneSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#PlaneSensor)
- [SphereSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#SphereSensor)
- [TouchSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#TouchSensor)

### ProjectiveTextureMapping

- [TextureProjectorParallel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/projectivetexturemapping.html#TextureProjectorParallel)
- [TextureProjectorPerspective](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/projectivetexturemapping.html#TextureProjectorPerspective)

### Rendering

- [ClipPlane](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#ClipPlane)
- [Color](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Color)
- [ColorRGBA](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#ColorRGBA)
- [Coordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Coordinate)
- [IndexedLineSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedLineSet)
- [IndexedTriangleFanSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleFanSet)
- [IndexedTriangleSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleSet)
- [IndexedTriangleStripSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleStripSet)
- [LineSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#LineSet)
- [Normal](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Normal)
- [PointSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#PointSet)
- [TriangleFanSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleFanSet)
- [TriangleSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleSet)
- [TriangleStripSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleStripSet)

### RigidBodyCollection

- [BallJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#BallJoint)
- [CollidableOffset](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollidableOffset)
- [CollidableShape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollidableShape)
- [CollisionCollection](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionCollection)
- [CollisionSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionSensor)
- [CollisionSpace](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionSpace)
- [Contact](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#Contact)
- [DoubleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#DoubleAxisHingeJoint)
- [RigidBody](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#RigidBody)
- [RigidBodyCollection](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#RigidBodyCollection)
- [SingleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#SingleAxisHingeJoint)
- [SliderJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#SliderJoint)

### Scripting

- [Script](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/scripting.html#Script)

### Shaders

- [ComposedShader](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ComposedShader)
- [FloatVertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#FloatVertexAttribute)
- [Matrix3VertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#Matrix3VertexAttribute)
- [Matrix4VertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#Matrix4VertexAttribute)
- [ShaderPart](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ShaderPart)

### Shape

- [Appearance](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Appearance)
- [FillProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#FillProperties)
- [LineProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#LineProperties)
- [Material](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Material)
- [PhysicalMaterial](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#PhysicalMaterial)
- [PointProperties](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#PointProperties)
- [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape)
- [TwoSidedMaterial](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#TwoSidedMaterial)
- [UnlitMaterial](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#UnlitMaterial)

### Sound

- [AudioClip](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/sound.html#AudioClip)
- [Sound](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/sound.html#Sound)

### Text

- [FontStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#FontStyle)
- [Text](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#Text)

### Texturing

- [ImageTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#ImageTexture)
- [MovieTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MovieTexture)
- [MultiTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTexture)
- [MultiTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTextureCoordinate)
- [MultiTextureTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTextureTransform)
- [PixelTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#PixelTexture)
- [TextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureCoordinate)
- [TextureCoordinateGenerator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureCoordinateGenerator)
- [TextureProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureProperties)
- [TextureTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureTransform)

### Texturing3D

- [ComposedTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#ComposedTexture3D)
- [ImageTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#ImageTexture3D)
- [PixelTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#PixelTexture3D)
- [TextureCoordinate3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureCoordinate3D)
- [TextureCoordinate4D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureCoordinate4D)
- [TextureTransform3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureTransform3D)
- [TextureTransformMatrix3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureTransformMatrix3D)

### Time

- [TimeSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/time.html#TimeSensor)

### VolumeRendering

- [BlendedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#BlendedVolumeStyle)
- [BoundaryEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#BoundaryEnhancementVolumeStyle)
- [CartoonVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#CartoonVolumeStyle)
- [ComposedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ComposedVolumeStyle)
- [EdgeEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#EdgeEnhancementVolumeStyle)
- [IsoSurfaceVolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#IsoSurfaceVolumeData)
- [OpacityMapVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#OpacityMapVolumeStyle)
- [ProjectionVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ProjectionVolumeStyle)
- [SegmentedVolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#SegmentedVolumeData)
- [ShadedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ShadedVolumeStyle)
- [SilhouetteEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#SilhouetteEnhancementVolumeStyle)
- [ToneMappedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ToneMappedVolumeStyle)
- [VolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#VolumeData)

### X\_ITE

- BlendMode
