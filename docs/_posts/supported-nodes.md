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
- [QuadSet](/x_ite/components/cadgeometry/quadset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/cadgeometry/quadset/#example)

### Core

- [MetadataBoolean](/x_ite/components/core/metadataboolean/)
- [MetadataDouble](/x_ite/components/core/metadatadouble/)
- [MetadataFloat](/x_ite/components/core/metadatafloat/)
- [MetadataInteger](/x_ite/components/core/metadatainteger/)
- [MetadataSet](/x_ite/components/core/metadataset/)
- [MetadataString](/x_ite/components/core/metadatastring/)
- [WorldInfo](/x_ite/components/core/worldinfo/)

### CubeMapTexturing

- [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/cubemaptexturing/composedcubemaptexture/#example)
- [GeneratedCubeMapTexture](/x_ite/components/cubemaptexturing/generatedcubemaptexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/cubemaptexturing/generatedcubemaptexture/#example)
- [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/)

### DIS


### EnvironmentalEffects

- [Background](/x_ite/components/environmentaleffects/background/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentaleffects/background/#example)
- [Fog](/x_ite/components/environmentaleffects/fog/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentaleffects/fog/#example)
- [FogCoordinate](/x_ite/components/environmentaleffects/fogcoordinate/)
- [LocalFog](/x_ite/components/environmentaleffects/localfog/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentaleffects/localfog/#example)
- [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentaleffects/texturebackground/#example)

### EnvironmentalSensor

- [ProximitySensor](/x_ite/components/environmentalsensor/proximitysensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentalsensor/proximitysensor/#example)
- [TransformSensor](/x_ite/components/environmentalsensor/transformsensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentalsensor/transformsensor/#example)
- [VisibilitySensor](/x_ite/components/environmentalsensor/visibilitysensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/environmentalsensor/visibilitysensor/#example)

### EventUtilities

- [BooleanFilter](/x_ite/components/eventutilities/booleanfilter/)
- [BooleanSequencer](/x_ite/components/eventutilities/booleansequencer/)
- [BooleanToggle](/x_ite/components/eventutilities/booleantoggle/)
- [BooleanTrigger](/x_ite/components/eventutilities/booleantrigger/)
- [IntegerSequencer](/x_ite/components/eventutilities/integersequencer/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/eventutilities/integersequencer/#example)
- [IntegerTrigger](/x_ite/components/eventutilities/integertrigger/)
- [TimeTrigger](/x_ite/components/eventutilities/timetrigger/)

### Followers

- [ColorChaser](/x_ite/components/followers/colorchaser/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/followers/colorchaser/#example)
- [ColorDamper](/x_ite/components/followers/colordamper/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/followers/colordamper/#example)
- [CoordinateChaser](/x_ite/components/followers/coordinatechaser/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/followers/coordinatechaser/#example)
- [CoordinateDamper](/x_ite/components/followers/coordinatedamper/)
- [OrientationChaser](/x_ite/components/followers/orientationchaser/)
- [OrientationDamper](/x_ite/components/followers/orientationdamper/)
- [PositionChaser](/x_ite/components/followers/positionchaser/)
- [PositionChaser2D](/x_ite/components/followers/positionchaser2d/)
- [PositionDamper](/x_ite/components/followers/positiondamper/)
- [PositionDamper2D](/x_ite/components/followers/positiondamper2d/)
- [ScalarChaser](/x_ite/components/followers/scalarchaser/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/followers/scalarchaser/#example)
- [ScalarDamper](/x_ite/components/followers/scalardamper/)
- [TexCoordChaser2D](/x_ite/components/followers/texcoordchaser2d/)
- [TexCoordDamper2D](/x_ite/components/followers/texcoorddamper2d/)

### Geometry2D

- [Arc2D](/x_ite/components/geometry2d/arc2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/arc2d/#example)
- [ArcClose2D](/x_ite/components/geometry2d/arcclose2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/arcclose2d/#example)
- [Circle2D](/x_ite/components/geometry2d/circle2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/circle2d/#example)
- [Disk2D](/x_ite/components/geometry2d/disk2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/disk2d/#example)
- [Polyline2D](/x_ite/components/geometry2d/polyline2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/polyline2d/#example)
- [Polypoint2D](/x_ite/components/geometry2d/polypoint2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/polypoint2d/#example)
- [Rectangle2D](/x_ite/components/geometry2d/rectangle2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/rectangle2d/#example)
- [TriangleSet2D](/x_ite/components/geometry2d/triangleset2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry2d/triangleset2d/#example)

### Geometry3D

- [Box](/x_ite/components/geometry3d/box/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/box/#example)
- [Cone](/x_ite/components/geometry3d/cone/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/cone/#example)
- [Cylinder](/x_ite/components/geometry3d/cylinder/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/cylinder/#example)
- [ElevationGrid](/x_ite/components/geometry3d/elevationgrid/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/elevationgrid/#example)
- [Extrusion](/x_ite/components/geometry3d/extrusion/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/extrusion/#example)
- [IndexedFaceSet](/x_ite/components/geometry3d/indexedfaceset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/indexedfaceset/#example)
- [Sphere](/x_ite/components/geometry3d/sphere/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geometry3d/sphere/#example)

### Geospatial

- [GeoCoordinate](/x_ite/components/geospatial/geocoordinate/)
- [GeoElevationGrid](/x_ite/components/geospatial/geoelevationgrid/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geospatial/geoelevationgrid/#example)
- [GeoLOD](/x_ite/components/geospatial/geolod/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geospatial/geolod/#example)
- [GeoLocation](/x_ite/components/geospatial/geolocation/)
- [GeoMetadata](/x_ite/components/geospatial/geometadata/)
- [GeoOrigin](/x_ite/components/geospatial/geoorigin/)
- [GeoPositionInterpolator](/x_ite/components/geospatial/geopositioninterpolator/)
- [GeoProximitySensor](/x_ite/components/geospatial/geoproximitysensor/)
- [GeoTouchSensor](/x_ite/components/geospatial/geotouchsensor/)
- [GeoTransform](/x_ite/components/geospatial/geotransform/)
- [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/geospatial/geoviewpoint/#example)

### Grouping

- [Group](/x_ite/components/grouping/group/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/grouping/group/#example)
- [StaticGroup](/x_ite/components/grouping/staticgroup/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/grouping/staticgroup/#example)
- [Switch](/x_ite/components/grouping/switch/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/grouping/switch/#example)
- [Transform](/x_ite/components/grouping/transform/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/grouping/transform/#example)

### HAnim

- [HAnimDisplacer](/x_ite/components/hanim/hanimdisplacer/)
- [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/hanim/hanimhumanoid/#example)
- [HAnimJoint](/x_ite/components/hanim/hanimjoint/)
- [HAnimMotion](/x_ite/components/hanim/hanimmotion/)
- [HAnimSegment](/x_ite/components/hanim/hanimsegment/)
- [HAnimSite](/x_ite/components/hanim/hanimsite/)

### Interpolation

- [ColorInterpolator](/x_ite/components/interpolation/colorinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/colorinterpolator/#example)
- [CoordinateInterpolator](/x_ite/components/interpolation/coordinateinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/coordinateinterpolator/#example)
- [CoordinateInterpolator2D](/x_ite/components/interpolation/coordinateinterpolator2d/)
- [EaseInEaseOut](/x_ite/components/interpolation/easeineaseout/)
- [NormalInterpolator](/x_ite/components/interpolation/normalinterpolator/)
- [OrientationInterpolator](/x_ite/components/interpolation/orientationinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/orientationinterpolator/#example)
- [PositionInterpolator](/x_ite/components/interpolation/positioninterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/positioninterpolator/#example)
- [PositionInterpolator2D](/x_ite/components/interpolation/positioninterpolator2d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/positioninterpolator2d/#example)
- [ScalarInterpolator](/x_ite/components/interpolation/scalarinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/scalarinterpolator/#example)
- [SplinePositionInterpolator](/x_ite/components/interpolation/splinepositioninterpolator/)
- [SplinePositionInterpolator2D](/x_ite/components/interpolation/splinepositioninterpolator2d/)
- [SplineScalarInterpolator](/x_ite/components/interpolation/splinescalarinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/splinescalarinterpolator/#example)
- [SquadOrientationInterpolator](/x_ite/components/interpolation/squadorientationinterpolator/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/interpolation/squadorientationinterpolator/#example)

### KeyDeviceSensor

- [KeySensor](/x_ite/components/keydevicesensor/keysensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/keydevicesensor/keysensor/#example)
- [StringSensor](/x_ite/components/keydevicesensor/stringsensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/keydevicesensor/stringsensor/#example)

### Layering

- [Layer](/x_ite/components/layering/layer/)
- [LayerSet](/x_ite/components/layering/layerset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/layering/layerset/#example)
- [Viewport](/x_ite/components/layering/viewport/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/layering/viewport/#example)

### Layout

- [Layout](/x_ite/components/layout/layout/)
- [LayoutGroup](/x_ite/components/layout/layoutgroup/)
- [LayoutLayer](/x_ite/components/layout/layoutlayer/)
- [ScreenFontStyle](/x_ite/components/layout/screenfontstyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/layout/screenfontstyle/#example)
- [ScreenGroup](/x_ite/components/layout/screengroup/)

### Lighting

- [DirectionalLight](/x_ite/components/lighting/directionallight/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/lighting/directionallight/#example)
- [EnvironmentLight](/x_ite/components/lighting/environmentlight/) <small class="blue">experimental</small>
- [PointLight](/x_ite/components/lighting/pointlight/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/lighting/pointlight/#example)
- [SpotLight](/x_ite/components/lighting/spotlight/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/lighting/spotlight/#example)

### NURBS

- [Contour2D](/x_ite/components/nurbs/contour2d/)
- [ContourPolyline2D](/x_ite/components/nurbs/contourpolyline2d/)
- [NurbsCurve](/x_ite/components/nurbs/nurbscurve/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/nurbs/nurbscurve/#example)
- [NurbsCurve2D](/x_ite/components/nurbs/nurbscurve2d/)
- [NurbsOrientationInterpolator](/x_ite/components/nurbs/nurbsorientationinterpolator/)
- [NurbsPatchSurface](/x_ite/components/nurbs/nurbspatchsurface/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/nurbs/nurbspatchsurface/#example)
- [NurbsPositionInterpolator](/x_ite/components/nurbs/nurbspositioninterpolator/)
- [NurbsSet](/x_ite/components/nurbs/nurbsset/)
- [NurbsSurfaceInterpolator](/x_ite/components/nurbs/nurbssurfaceinterpolator/)
- [NurbsSweptSurface](/x_ite/components/nurbs/nurbssweptsurface/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/nurbs/nurbssweptsurface/#example)
- [NurbsSwungSurface](/x_ite/components/nurbs/nurbsswungsurface/)
- [NurbsTextureCoordinate](/x_ite/components/nurbs/nurbstexturecoordinate/)
- [NurbsTrimmedSurface](/x_ite/components/nurbs/nurbstrimmedsurface/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/nurbs/nurbstrimmedsurface/#example)

### Navigation

- [Billboard](/x_ite/components/navigation/billboard/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/navigation/billboard/#example)
- [Collision](/x_ite/components/navigation/collision/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/navigation/collision/#example)
- [LOD](/x_ite/components/navigation/lod/)
- [NavigationInfo](/x_ite/components/navigation/navigationinfo/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/navigation/navigationinfo/#example)
- [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/navigation/orthoviewpoint/#example)
- [Viewpoint](/x_ite/components/navigation/viewpoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/navigation/viewpoint/#example)
- [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/)

### Networking

- [Anchor](/x_ite/components/networking/anchor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/networking/anchor/#example)
- [Inline](/x_ite/components/networking/inline/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/networking/inline/#example)
- [LoadSensor](/x_ite/components/networking/loadsensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/networking/loadsensor/#example)

### ParticleSystems

- [BoundedPhysicsModel](/x_ite/components/particlesystems/boundedphysicsmodel/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/boundedphysicsmodel/#example)
- [ConeEmitter](/x_ite/components/particlesystems/coneemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/coneemitter/#example)
- [ExplosionEmitter](/x_ite/components/particlesystems/explosionemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/explosionemitter/#example)
- [ForcePhysicsModel](/x_ite/components/particlesystems/forcephysicsmodel/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/forcephysicsmodel/#example)
- [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/particlesystem/#example)
- [PointEmitter](/x_ite/components/particlesystems/pointemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/pointemitter/#example)
- [PolylineEmitter](/x_ite/components/particlesystems/polylineemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/polylineemitter/#example)
- [SurfaceEmitter](/x_ite/components/particlesystems/surfaceemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/surfaceemitter/#example)
- [VolumeEmitter](/x_ite/components/particlesystems/volumeemitter/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/volumeemitter/#example)
- [WindPhysicsModel](/x_ite/components/particlesystems/windphysicsmodel/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/particlesystems/windphysicsmodel/#example)

### Picking

- [LinePickSensor](/x_ite/components/picking/linepicksensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/picking/linepicksensor/#example)
- [PickableGroup](/x_ite/components/picking/pickablegroup/)
- [PointPickSensor](/x_ite/components/picking/pointpicksensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/picking/pointpicksensor/#example)
- [PrimitivePickSensor](/x_ite/components/picking/primitivepicksensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/picking/primitivepicksensor/#example)
- [VolumePickSensor](/x_ite/components/picking/volumepicksensor/)

### PointingDeviceSensor

- [CylinderSensor](/x_ite/components/pointingdevicesensor/cylindersensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/pointingdevicesensor/cylindersensor/#example)
- [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/pointingdevicesensor/planesensor/#example)
- [SphereSensor](/x_ite/components/pointingdevicesensor/spheresensor/)
- [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/pointingdevicesensor/touchsensor/#example)

### Rendering

- [ClipPlane](/x_ite/components/rendering/clipplane/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/clipplane/#example)
- [Color](/x_ite/components/rendering/color/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/color/#example)
- [ColorRGBA](/x_ite/components/rendering/colorrgba/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/colorrgba/#example)
- [Coordinate](/x_ite/components/rendering/coordinate/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/coordinate/#example)
- [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/)
- [IndexedLineSet](/x_ite/components/rendering/indexedlineset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/indexedlineset/#example)
- [IndexedTriangleFanSet](/x_ite/components/rendering/indexedtrianglefanset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/indexedtrianglefanset/#example)
- [IndexedTriangleSet](/x_ite/components/rendering/indexedtriangleset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/indexedtriangleset/#example)
- [IndexedTriangleStripSet](/x_ite/components/rendering/indexedtrianglestripset/)
- [LineSet](/x_ite/components/rendering/lineset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/lineset/#example)
- [Normal](/x_ite/components/rendering/normal/)
- [PointSet](/x_ite/components/rendering/pointset/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rendering/pointset/#example)
- [Tangent](/x_ite/components/rendering/tangent/) <small class="blue">experimental</small>
- [TriangleFanSet](/x_ite/components/rendering/trianglefanset/)
- [TriangleSet](/x_ite/components/rendering/triangleset/)
- [TriangleStripSet](/x_ite/components/rendering/trianglestripset/)

### RigidBodyPhysics

- [BallJoint](/x_ite/components/rigidbodyphysics/balljoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/balljoint/#example)
- [CollidableOffset](/x_ite/components/rigidbodyphysics/collidableoffset/)
- [CollidableShape](/x_ite/components/rigidbodyphysics/collidableshape/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/collidableshape/#example)
- [CollisionCollection](/x_ite/components/rigidbodyphysics/collisioncollection/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/collisioncollection/#example)
- [CollisionSensor](/x_ite/components/rigidbodyphysics/collisionsensor/)
- [CollisionSpace](/x_ite/components/rigidbodyphysics/collisionspace/)
- [Contact](/x_ite/components/rigidbodyphysics/contact/)
- [DoubleAxisHingeJoint](/x_ite/components/rigidbodyphysics/doubleaxishingejoint/)
- [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/rigidbody/#example)
- [RigidBodyCollection](/x_ite/components/rigidbodyphysics/rigidbodycollection/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/rigidbodycollection/#example)
- [SingleAxisHingeJoint](/x_ite/components/rigidbodyphysics/singleaxishingejoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/singleaxishingejoint/#example)
- [SliderJoint](/x_ite/components/rigidbodyphysics/sliderjoint/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/rigidbodyphysics/sliderjoint/#example)

### Scripting

- [Script](/x_ite/components/scripting/script/)

### Shaders

- [ComposedShader](/x_ite/components/shaders/composedshader/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shaders/composedshader/#example)
- [FloatVertexAttribute](/x_ite/components/shaders/floatvertexattribute/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shaders/floatvertexattribute/#example)
- [Matrix3VertexAttribute](/x_ite/components/shaders/matrix3vertexattribute/)
- [Matrix4VertexAttribute](/x_ite/components/shaders/matrix4vertexattribute/)
- [ShaderPart](/x_ite/components/shaders/shaderpart/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shaders/shaderpart/#example)

### Shape

- [AcousticProperties](/x_ite/components/shape/acousticproperties/)
- [Appearance](/x_ite/components/shape/appearance/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shape/appearance/#example)
- [FillProperties](/x_ite/components/shape/fillproperties/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shape/fillproperties/#example)
- [LineProperties](/x_ite/components/shape/lineproperties/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shape/lineproperties/#example)
- [Material](/x_ite/components/shape/material/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shape/material/#example)
- [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/)
- [PointProperties](/x_ite/components/shape/pointproperties/)
- [Shape](/x_ite/components/shape/shape/)
- [TwoSidedMaterial](/x_ite/components/shape/twosidedmaterial/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/shape/twosidedmaterial/#example) <small class="yellow">depreciated</small>
- [UnlitMaterial](/x_ite/components/shape/unlitmaterial/)

### Sound

- [Analyser](/x_ite/components/sound/analyser/)
- [AudioClip](/x_ite/components/sound/audioclip/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/sound/audioclip/#example)
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
- [MicrophoneSource](/x_ite/components/sound/microphonesource/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/sound/microphonesource/#example)
- [OscillatorSource](/x_ite/components/sound/oscillatorsource/)
- [PeriodicWave](/x_ite/components/sound/periodicwave/)
- [Sound](/x_ite/components/sound/sound/)
- [SpatialSound](/x_ite/components/sound/spatialsound/)
- [WaveShaper](/x_ite/components/sound/waveshaper/)

### Text

- [FontStyle](/x_ite/components/text/fontstyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/text/fontstyle/#example)
- [Text](/x_ite/components/text/text/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/text/text/#example)

### TextureProjection

- [TextureProjector](/x_ite/components/textureprojection/textureprojector/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/textureprojection/textureprojector/#example)
- [TextureProjectorParallel](/x_ite/components/textureprojection/textureprojectorparallel/)

### Texturing

- [ImageTexture](/x_ite/components/texturing/imagetexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing/imagetexture/#example)
- [MovieTexture](/x_ite/components/texturing/movietexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing/movietexture/#example)
- [MultiTexture](/x_ite/components/texturing/multitexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing/multitexture/#example)
- [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/)
- [MultiTextureTransform](/x_ite/components/texturing/multitexturetransform/)
- [PixelTexture](/x_ite/components/texturing/pixeltexture/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing/pixeltexture/#example)
- [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/)
- [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/)
- [TextureProperties](/x_ite/components/texturing/textureproperties/)
- [TextureTransform](/x_ite/components/texturing/texturetransform/)

### Texturing3D

- [ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/)
- [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing3d/imagetexture3d/#example)
- [ImageTextureAtlas](/x_ite/components/texturing3d/imagetextureatlas/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/texturing3d/imagetextureatlas/#example) <small class="blue">experimental</small>
- [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/)
- [TextureCoordinate3D](/x_ite/components/texturing3d/texturecoordinate3d/)
- [TextureCoordinate4D](/x_ite/components/texturing3d/texturecoordinate4d/)
- [TextureTransform3D](/x_ite/components/texturing3d/texturetransform3d/)
- [TextureTransformMatrix3D](/x_ite/components/texturing3d/texturetransformmatrix3d/)

### Time

- [TimeSensor](/x_ite/components/time/timesensor/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/time/timesensor/#example)

### VolumeRendering

- [BlendedVolumeStyle](/x_ite/components/volumerendering/blendedvolumestyle/)
- [BoundaryEnhancementVolumeStyle](/x_ite/components/volumerendering/boundaryenhancementvolumestyle/)
- [CartoonVolumeStyle](/x_ite/components/volumerendering/cartoonvolumestyle/)
- [ComposedVolumeStyle](/x_ite/components/volumerendering/composedvolumestyle/)
- [EdgeEnhancementVolumeStyle](/x_ite/components/volumerendering/edgeenhancementvolumestyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/edgeenhancementvolumestyle/#example)
- [IsoSurfaceVolumeData](/x_ite/components/volumerendering/isosurfacevolumedata/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/isosurfacevolumedata/#example)
- [OpacityMapVolumeStyle](/x_ite/components/volumerendering/opacitymapvolumestyle/)
- [ProjectionVolumeStyle](/x_ite/components/volumerendering/projectionvolumestyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/projectionvolumestyle/#example)
- [SegmentedVolumeData](/x_ite/components/volumerendering/segmentedvolumedata/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/segmentedvolumedata/#example)
- [ShadedVolumeStyle](/x_ite/components/volumerendering/shadedvolumestyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/shadedvolumestyle/#example)
- [SilhouetteEnhancementVolumeStyle](/x_ite/components/volumerendering/silhouetteenhancementvolumestyle/)
- [ToneMappedVolumeStyle](/x_ite/components/volumerendering/tonemappedvolumestyle/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/tonemappedvolumestyle/#example)
- [VolumeData](/x_ite/components/volumerendering/volumedata/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/volumerendering/volumedata/#example)

### X_ITE

- [AnisotropyMaterialExtension](/x_ite/components/x-ite/anisotropymaterialextension/) <small class="blue">experimental</small>
- [BlendMode](/x_ite/components/x-ite/blendmode/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/x-ite/blendmode/#example) <small class="blue">experimental</small>
- [ClearcoatMaterialExtension](/x_ite/components/x-ite/clearcoatmaterialextension/) <small class="blue">experimental</small>
- [DepthMode](/x_ite/components/x-ite/depthmode/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/x-ite/depthmode/#example) <small class="blue">experimental</small>
- [DiffuseTransmissionMaterialExtension](/x_ite/components/x-ite/diffusetransmissionmaterialextension/) <small class="blue">experimental</small>
- [DispersionMaterialExtension](/x_ite/components/x-ite/dispersionmaterialextension/) <small class="blue">experimental</small>
- [EmissiveStrengthMaterialExtension](/x_ite/components/x-ite/emissivestrengthmaterialextension/) <small class="blue">experimental</small>
- [IORMaterialExtension](/x_ite/components/x-ite/iormaterialextension/) <small class="blue">experimental</small>
- [InstancedShape](/x_ite/components/x-ite/instancedshape/) [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/x-ite/instancedshape/#example) <small class="blue">experimental</small>
- [IridescenceMaterialExtension](/x_ite/components/x-ite/iridescencematerialextension/) <small class="blue">experimental</small>
- [SheenMaterialExtension](/x_ite/components/x-ite/sheenmaterialextension/) <small class="blue">experimental</small>
- [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) <small class="yellow">depreciated</small>
- [SpecularMaterialExtension](/x_ite/components/x-ite/specularmaterialextension/) <small class="blue">experimental</small>
- [TransmissionMaterialExtension](/x_ite/components/x-ite/transmissionmaterialextension/) <small class="blue">experimental</small>
- [VolumeMaterialExtension](/x_ite/components/x-ite/volumematerialextension/) <small class="blue">experimental</small>

<!-- COMPONENTS END -->
