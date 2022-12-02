---
title: Supported Nodes
date: 2022-11-28
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

X\_ITE has achieved the [X3D Immersive Profile](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/immersive.html){:target="_blank"} support (which matches the VRML97 palette) verified by the X3D consortium at [web3d.org](https://www.web3d.org){:target="_blank"}.

## Supported Components

This section documents all of supported nodes by X\_ITE.

X\_ITE supports a limited set of nodes defined by the X3D specification. There are currently 223 of 236 nodes (94 %) implemented. The implementation of these nodes is complete in that that the nodes will support all the required fields and features for that implementation unless otherwise stated.

### CADGeometry

- [CADAssembly](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADAssembly){:target="_blank"}
- [CADFace](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADFace){:target="_blank"}
- [CADLayer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADLayer){:target="_blank"}
- [CADPart](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#CADPart){:target="_blank"}
- [IndexedQuadSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#IndexedQuadSet){:target="_blank"}
- [QuadSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/CADGeometry.html#QuadSet){:target="_blank"}

### Core

- [MetadataBoolean](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataBoolean){:target="_blank"}
- [MetadataDouble](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataDouble){:target="_blank"}
- [MetadataFloat](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataFloat){:target="_blank"}
- [MetadataInteger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataInteger){:target="_blank"}
- [MetadataSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataSet){:target="_blank"}
- [MetadataString](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#MetadataString){:target="_blank"}
- [WorldInfo](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#WorldInfo){:target="_blank"}

### CubeMapTexturing

- [ComposedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#ComposedCubeMapTexture){:target="_blank"}
- [GeneratedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#GeneratedCubeMapTexture){:target="_blank"}
- [ImageCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/env_texture.html#ImageCubeMapTexture){:target="_blank"}

### EnvironmentalEffects

- [Background](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#Background){:target="_blank"}
- [Fog](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#Fog){:target="_blank"}
- [FogCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#FogCoordinate){:target="_blank"}
- [LocalFog](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#LocalFog){:target="_blank"}
- [TextureBackground](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/enveffects.html#TextureBackground){:target="_blank"}

### EnvironmentalSensor

- [ProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#ProximitySensor){:target="_blank"}
- [TransformSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#TransformSensor){:target="_blank"}
- [VisibilitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/envsensor.html#VisibilitySensor){:target="_blank"}

### EventUtilities

- [BooleanFilter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanFilter){:target="_blank"}
- [BooleanSequencer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanSequencer){:target="_blank"}
- [BooleanToggle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanToggle){:target="_blank"}
- [BooleanTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#BooleanTrigger){:target="_blank"}
- [IntegerSequencer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#IntegerSequencer){:target="_blank"}
- [IntegerTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#IntegerTrigger){:target="_blank"}
- [TimeTrigger](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/utils.html#TimeTrigger){:target="_blank"}

### Followers

- [ColorChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ColorChaser){:target="_blank"}
- [ColorDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ColorDamper){:target="_blank"}
- [CoordinateChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#CoordinateChaser){:target="_blank"}
- [CoordinateDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#CoordinateDamper){:target="_blank"}
- [OrientationChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#OrientationChaser){:target="_blank"}
- [OrientationDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#OrientationDamper){:target="_blank"}
- [PositionChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionChaser){:target="_blank"}
- [PositionChaser2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionChaser2D){:target="_blank"}
- [PositionDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionDamper){:target="_blank"}
- [PositionDamper2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#PositionDamper2D){:target="_blank"}
- [ScalarChaser](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ScalarChaser){:target="_blank"}
- [ScalarDamper](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#ScalarDamper){:target="_blank"}
- [TexCoordChaser2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#TexCoordChaser2D){:target="_blank"}
- [TexCoordDamper2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/followers.html#TexCoordDamper2D){:target="_blank"}

### Geometry2D

- [Arc2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Arc2D){:target="_blank"}
- [ArcClose2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#ArcClose2D){:target="_blank"}
- [Circle2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Circle2D){:target="_blank"}
- [Disk2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Disk2D){:target="_blank"}
- [Polyline2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Polyline2D){:target="_blank"}
- [Polypoint2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Polypoint2D){:target="_blank"}
- [Rectangle2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#Rectangle2D){:target="_blank"}
- [TriangleSet2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry2D.html#TriangleSet2D){:target="_blank"}

### Geometry3D

- [Box](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Box){:target="_blank"}
- [Cone](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cone){:target="_blank"}
- [Cylinder](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Cylinder){:target="_blank"}
- [ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#ElevationGrid){:target="_blank"}
- [Extrusion](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Extrusion){:target="_blank"}
- [IndexedFaceSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#IndexedFaceSet){:target="_blank"}
- [Sphere](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geometry3D.html#Sphere){:target="_blank"}

### Geospatial

- [GeoCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoCoordinate){:target="_blank"}
- [GeoElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoElevationGrid){:target="_blank"}
- [GeoLOD](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoLOD){:target="_blank"}
- [GeoLocation](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoLocation){:target="_blank"}
- [GeoMetadata](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoMetadata){:target="_blank"}
- [GeoOrigin](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoOrigin){:target="_blank"}
- [GeoPositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoPositionInterpolator){:target="_blank"}
- [GeoProximitySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoProximitySensor){:target="_blank"}
- [GeoTouchSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoTouchSensor){:target="_blank"}
- [GeoTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoTransform){:target="_blank"}
- [GeoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/geodata.html#GeoViewpoint){:target="_blank"}

### Grouping

- [Group](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Group){:target="_blank"}
- [StaticGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#StaticGroup){:target="_blank"}
- [Switch](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Switch){:target="_blank"}
- [Transform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/group.html#Transform){:target="_blank"}

### H-Anim

- [HAnimDisplacer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimDisplacer){:target="_blank"}
- [HAnimHumanoid](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimHumanoid){:target="_blank"}
- [HAnimJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimJoint){:target="_blank"}
- [HAnimSegment](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimSegment){:target="_blank"}
- [HAnimSite](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/hanim.html#HAnimSite){:target="_blank"}

### Interpolation

- [ColorInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#ColorInterpolator){:target="_blank"}
- [CoordinateInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#CoordinateInterpolator){:target="_blank"}
- [CoordinateInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#CoordinateInterpolator2D){:target="_blank"}
- [EaseInEaseOut](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#EaseInEaseOut){:target="_blank"}
- [NormalInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#NormalInterpolator){:target="_blank"}
- [OrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#OrientationInterpolator){:target="_blank"}
- [PositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#PositionInterpolator){:target="_blank"}
- [PositionInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#PositionInterpolator2D){:target="_blank"}
- [ScalarInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#ScalarInterpolator){:target="_blank"}
- [SplinePositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplinePositionInterpolator){:target="_blank"}
- [SplinePositionInterpolator2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplinePositionInterpolator2D){:target="_blank"}
- [SplineScalarInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SplineScalarInterpolator){:target="_blank"}
- [SquadOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/interp.html#SquadOrientationInterpolator){:target="_blank"}

### KeyDeviceSensor

- [KeySensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/keyboard.html#KeySensor){:target="_blank"}
- [StringSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/keyboard.html#StringSensor){:target="_blank"}

### Layering

- [Layer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#Layer){:target="_blank"}
- [LayerSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#LayerSet){:target="_blank"}
- [Viewport](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layering.html#Viewport){:target="_blank"}

### Layout

- [Layout](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#Layout){:target="_blank"}
- [LayoutGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#LayoutGroup){:target="_blank"}
- [LayoutLayer](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#LayoutLayer){:target="_blank"}
- [ScreenFontStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#ScreenFontStyle){:target="_blank"}
- [ScreenGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/layout.html#ScreenGroup){:target="_blank"}

### Lighting

- [DirectionalLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#DirectionalLight){:target="_blank"}
- [PointLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#PointLight){:target="_blank"}
- [SpotLight](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/lighting.html#SpotLight){:target="_blank"}

### Navigation

- [Billboard](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Billboard){:target="_blank"}
- [Collision](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Collision){:target="_blank"}
- [LOD](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#LOD){:target="_blank"}
- [NavigationInfo](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#NavigationInfo){:target="_blank"}
- [OrthoViewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#OrthoViewpoint){:target="_blank"}
- [Viewpoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#Viewpoint){:target="_blank"}
- [ViewpointGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/navigation.html#ViewpointGroup){:target="_blank"}

### Networking

- [Anchor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#Anchor){:target="_blank"}
- [Inline](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#Inline){:target="_blank"}
- [LoadSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/networking.html#LoadSensor){:target="_blank"}

### NURBS

- [ContourPolyline2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#ContourPolyline2D){:target="_blank"}
- [CoordinateDouble](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#CoordinateDouble){:target="_blank"}
- [NurbsCurve](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsCurve){:target="_blank"}
- [NurbsCurve2D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsCurve2D){:target="_blank"}
- [NurbsOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsOrientationInterpolator){:target="_blank"}
- [NurbsPatchSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsPatchSurface){:target="_blank"}
- [NurbsPositionInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsPositionInterpolator){:target="_blank"}
- [NurbsSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSet){:target="_blank"}
- [NurbsSurfaceInterpolator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSurfaceInterpolator){:target="_blank"}
- [NurbsSweptSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSweptSurface){:target="_blank"}
- [NurbsSwungSurface](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsSwungSurface){:target="_blank"}
- [NurbsTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/nurbs.html#NurbsTextureCoordinate){:target="_blank"}

### ParticleSystems

- [BoundedPhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#BoundedPhysicsModel){:target="_blank"}
- [ConeEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ConeEmitter){:target="_blank"}
- [ExplosionEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ExplosionEmitter){:target="_blank"}
- [ForcePhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ForcePhysicsModel){:target="_blank"}
- [ParticleSystem](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#ParticleSystem){:target="_blank"}
- [PointEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#PointEmitter){:target="_blank"}
- [PolylineEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#PolylineEmitter){:target="_blank"}
- [SurfaceEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#SurfaceEmitter){:target="_blank"}
- [VolumeEmitter](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#VolumeEmitter){:target="_blank"}
- [WindPhysicsModel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/particle_systems.html#WindPhysicsModel){:target="_blank"}

### Picking

- [LinePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#LinePickSensor){:target="_blank"}
- [PickableGroup](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PickableGroup){:target="_blank"}
- [PointPickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PointPickSensor){:target="_blank"}
- [PrimitivePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#PrimitivePickSensor){:target="_blank"}
- [VolumePickSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/picking.html#VolumePickSensor){:target="_blank"}

### PointingDeviceSensor

- [CylinderSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#CylinderSensor){:target="_blank"}
- [PlaneSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#PlaneSensor){:target="_blank"}
- [SphereSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#SphereSensor){:target="_blank"}
- [TouchSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/pointingsensor.html#TouchSensor){:target="_blank"}

### ProjectiveTextureMapping

- [TextureProjectorParallel](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/projectivetexturemapping.html#TextureProjectorParallel){:target="_blank"}
- [TextureProjectorPerspective](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/projectivetexturemapping.html#TextureProjectorPerspective){:target="_blank"}

### Rendering

- [ClipPlane](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#ClipPlane){:target="_blank"}
- [Color](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Color){:target="_blank"}
- [ColorRGBA](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#ColorRGBA){:target="_blank"}
- [Coordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Coordinate){:target="_blank"}
- [IndexedLineSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedLineSet){:target="_blank"}
- [IndexedTriangleFanSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleFanSet){:target="_blank"}
- [IndexedTriangleSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleSet){:target="_blank"}
- [IndexedTriangleStripSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#IndexedTriangleStripSet){:target="_blank"}
- [LineSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#LineSet){:target="_blank"}
- [Normal](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#Normal){:target="_blank"}
- [PointSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#PointSet){:target="_blank"}
- [TriangleFanSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleFanSet){:target="_blank"}
- [TriangleSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleSet){:target="_blank"}
- [TriangleStripSet](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rendering.html#TriangleStripSet){:target="_blank"}

### RigidBodyCollection

- [BallJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#BallJoint){:target="_blank"}
- [CollidableOffset](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollidableOffset){:target="_blank"}
- [CollidableShape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollidableShape){:target="_blank"}
- [CollisionCollection](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionCollection){:target="_blank"}
- [CollisionSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionSensor){:target="_blank"}
- [CollisionSpace](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#CollisionSpace){:target="_blank"}
- [Contact](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#Contact){:target="_blank"}
- [DoubleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#DoubleAxisHingeJoint){:target="_blank"}
- [RigidBody](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#RigidBody){:target="_blank"}
- [RigidBodyCollection](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#RigidBodyCollection){:target="_blank"}
- [SingleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#SingleAxisHingeJoint){:target="_blank"}
- [SliderJoint](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/rigid_physics.html#SliderJoint){:target="_blank"}

### Scripting

- [Script](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/scripting.html#Script){:target="_blank"}

### Shaders

- [ComposedShader](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ComposedShader){:target="_blank"}
- [FloatVertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#FloatVertexAttribute){:target="_blank"}
- [Matrix3VertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#Matrix3VertexAttribute){:target="_blank"}
- [Matrix4VertexAttribute](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#Matrix4VertexAttribute){:target="_blank"}
- [ShaderPart](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ShaderPart){:target="_blank"}

### Shape

- [Appearance](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Appearance){:target="_blank"}
- [FillProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#FillProperties){:target="_blank"}
- [LineProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#LineProperties){:target="_blank"}
- [Material](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Material){:target="_blank"}
- [PhysicalMaterial](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#PhysicalMaterial){:target="_blank"}
- [PointProperties](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#PointProperties){:target="_blank"}
- [Shape](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#Shape){:target="_blank"}
- [TwoSidedMaterial](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shape.html#TwoSidedMaterial){:target="_blank"}
- [UnlitMaterial](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shape.html#UnlitMaterial){:target="_blank"}

### Sound

- [AudioClip](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/sound.html#AudioClip){:target="_blank"}
- [Sound](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/sound.html#Sound){:target="_blank"}

### Text

- [FontStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#FontStyle){:target="_blank"}
- [Text](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/text.html#Text){:target="_blank"}

### Texturing

- [ImageTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#ImageTexture){:target="_blank"}
- [MovieTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MovieTexture){:target="_blank"}
- [MultiTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTexture){:target="_blank"}
- [MultiTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTextureCoordinate){:target="_blank"}
- [MultiTextureTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#MultiTextureTransform){:target="_blank"}
- [PixelTexture](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#PixelTexture){:target="_blank"}
- [TextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureCoordinate){:target="_blank"}
- [TextureCoordinateGenerator](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureCoordinateGenerator){:target="_blank"}
- [TextureProperties](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureProperties){:target="_blank"}
- [TextureTransform](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#TextureTransform){:target="_blank"}

### Texturing3D

- [ComposedTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#ComposedTexture3D){:target="_blank"}
- [ImageTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#ImageTexture3D){:target="_blank"}
- [PixelTexture3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#PixelTexture3D){:target="_blank"}
- [TextureCoordinate3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureCoordinate3D){:target="_blank"}
- [TextureCoordinate4D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureCoordinate4D){:target="_blank"}
- [TextureTransform3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureTransform3D){:target="_blank"}
- [TextureTransformMatrix3D](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texture3D.html#TextureTransformMatrix3D){:target="_blank"}

### Time

- [TimeSensor](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/time.html#TimeSensor){:target="_blank"}

### VolumeRendering

- [BlendedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#BlendedVolumeStyle){:target="_blank"}
- [BoundaryEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#BoundaryEnhancementVolumeStyle){:target="_blank"}
- [CartoonVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#CartoonVolumeStyle){:target="_blank"}
- [ComposedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ComposedVolumeStyle){:target="_blank"}
- [EdgeEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#EdgeEnhancementVolumeStyle){:target="_blank"}
- [IsoSurfaceVolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#IsoSurfaceVolumeData){:target="_blank"}
- [OpacityMapVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#OpacityMapVolumeStyle){:target="_blank"}
- [ProjectionVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ProjectionVolumeStyle){:target="_blank"}
- [SegmentedVolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#SegmentedVolumeData){:target="_blank"}
- [ShadedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ShadedVolumeStyle){:target="_blank"}
- [SilhouetteEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#SilhouetteEnhancementVolumeStyle){:target="_blank"}
- [ToneMappedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#ToneMappedVolumeStyle){:target="_blank"}
- [VolumeData](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/volume.html#VolumeData){:target="_blank"}

### X\_ITE

- BlendMode
