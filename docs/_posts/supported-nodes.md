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

- [cadassembly](components/cadgeometry/cadassembly)
- [cadface](components/cadgeometry/cadface)
- [cadlayer](components/cadgeometry/cadlayer)
- [cadpart](components/cadgeometry/cadpart)
- [indexedquadset](components/cadgeometry/indexedquadset)
- [quadset](components/cadgeometry/quadset)

### Core

- [metadataboolean](components/core/metadataboolean)
- [metadatadouble](components/core/metadatadouble)
- [metadatafloat](components/core/metadatafloat)
- [metadatainteger](components/core/metadatainteger)
- [metadataset](components/core/metadataset)
- [metadatastring](components/core/metadatastring)
- [worldinfo](components/core/worldinfo)

### CubeMapTexturing

- [composedcubemaptexture](components/cubemaptexturing/composedcubemaptexture)
- [generatedcubemaptexture](components/cubemaptexturing/generatedcubemaptexture)
- [imagecubemaptexture](components/cubemaptexturing/imagecubemaptexture)

### EnvironmentalEffects

- [background](components/environmentaleffects/background)
- [fog](components/environmentaleffects/fog)
- [fogcoordinate](components/environmentaleffects/fogcoordinate)
- [localfog](components/environmentaleffects/localfog)
- [texturebackground](components/environmentaleffects/texturebackground)

### EnvironmentalSensor

- [proximitysensor](components/environmentalsensor/proximitysensor)
- [transformsensor](components/environmentalsensor/transformsensor)
- [visibilitysensor](components/environmentalsensor/visibilitysensor)

### EventUtilities

- [booleanfilter](components/eventutilities/booleanfilter)
- [booleansequencer](components/eventutilities/booleansequencer)
- [booleantoggle](components/eventutilities/booleantoggle)
- [booleantrigger](components/eventutilities/booleantrigger)
- [integersequencer](components/eventutilities/integersequencer)
- [integertrigger](components/eventutilities/integertrigger)
- [timetrigger](components/eventutilities/timetrigger)

### Followers

- [colorchaser](components/followers/colorchaser)
- [colordamper](components/followers/colordamper)
- [coordinatechaser](components/followers/coordinatechaser)
- [coordinatedamper](components/followers/coordinatedamper)
- [orientationchaser](components/followers/orientationchaser)
- [orientationdamper](components/followers/orientationdamper)
- [positionchaser](components/followers/positionchaser)
- [positionchaser2d](components/followers/positionchaser2d)
- [positiondamper](components/followers/positiondamper)
- [positiondamper2d](components/followers/positiondamper2d)
- [scalarchaser](components/followers/scalarchaser)
- [scalardamper](components/followers/scalardamper)
- [texcoordchaser2d](components/followers/texcoordchaser2d)
- [texcoorddamper2d](components/followers/texcoorddamper2d)

### Geometry2D

- [arc2d](components/geometry2d/arc2d)
- [arcclose2d](components/geometry2d/arcclose2d)
- [circle2d](components/geometry2d/circle2d)
- [disk2d](components/geometry2d/disk2d)
- [polyline2d](components/geometry2d/polyline2d)
- [polypoint2d](components/geometry2d/polypoint2d)
- [rectangle2d](components/geometry2d/rectangle2d)
- [triangleset2d](components/geometry2d/triangleset2d)

### Geometry3D

- [box](components/geometry3d/box)
- [cone](components/geometry3d/cone)
- [cylinder](components/geometry3d/cylinder)
- [elevationgrid](components/geometry3d/elevationgrid)
- [extrusion](components/geometry3d/extrusion)
- [indexedfaceset](components/geometry3d/indexedfaceset)
- [sphere](components/geometry3d/sphere)

### Geospatial

- [geocoordinate](components/geospatial/geocoordinate)
- [geoelevationgrid](components/geospatial/geoelevationgrid)
- [geolod](components/geospatial/geolod)
- [geolocation](components/geospatial/geolocation)
- [geometadata](components/geospatial/geometadata)
- [geoorigin](components/geospatial/geoorigin)
- [geopositioninterpolator](components/geospatial/geopositioninterpolator)
- [geoproximitysensor](components/geospatial/geoproximitysensor)
- [geotouchsensor](components/geospatial/geotouchsensor)
- [geotransform](components/geospatial/geotransform)
- [geoviewpoint](components/geospatial/geoviewpoint)

### Grouping

- [group](components/grouping/group)
- [staticgroup](components/grouping/staticgroup)
- [switch](components/grouping/switch)
- [transform](components/grouping/transform)

### H-Anim

- [hanimdisplacer](components/hanim/hanimdisplacer)
- [hanimhumanoid](components/hanim/hanimhumanoid)
- [hanimjoint](components/hanim/hanimjoint)
- [hanimsegment](components/hanim/hanimsegment)
- [hanimsite](components/hanim/hanimsite)

### Interpolation

- [colorinterpolator](components/interpolation/colorinterpolator)
- [coordinateinterpolator](components/interpolation/coordinateinterpolator)
- [coordinateinterpolator2d](components/interpolation/coordinateinterpolator2d)
- [easeineaseout](components/interpolation/easeineaseout)
- [normalinterpolator](components/interpolation/normalinterpolator)
- [orientationinterpolator](components/interpolation/orientationinterpolator)
- [positioninterpolator](components/interpolation/positioninterpolator)
- [positioninterpolator2d](components/interpolation/positioninterpolator2d)
- [scalarinterpolator](components/interpolation/scalarinterpolator)
- [splinepositioninterpolator](components/interpolation/splinepositioninterpolator)
- [splinepositioninterpolator2d](components/interpolation/splinepositioninterpolator2d)
- [splinescalarinterpolator](components/interpolation/splinescalarinterpolator)
- [squadorientationinterpolator](components/interpolation/squadorientationinterpolator)

### KeyDeviceSensor

- [keysensor](components/keydevicesensor/keysensor)
- [stringsensor](components/keydevicesensor/stringsensor)

### Layering

- [layer](components/layering/layer)
- [layerset](components/layering/layerset)
- [viewport](components/layering/viewport)

### Layout

- [layout](components/layout/layout)
- [layoutgroup](components/layout/layoutgroup)
- [layoutlayer](components/layout/layoutlayer)
- [screenfontstyle](components/layout/screenfontstyle)
- [screengroup](components/layout/screengroup)

### Lighting

- [directionallight](components/lighting/directionallight)
- [pointlight](components/lighting/pointlight)
- [spotlight](components/lighting/spotlight)

### Navigation

- [billboard](components/navigation/billboard)
- [collision](components/navigation/collision)
- [lod](components/navigation/lod)
- [navigationinfo](components/navigation/navigationinfo)
- [orthoviewpoint](components/navigation/orthoviewpoint)
- [viewpoint](components/navigation/viewpoint)
- [viewpointgroup](components/navigation/viewpointgroup)

### Networking

- [anchor](components/networking/anchor)
- [inline](components/networking/inline)
- [loadsensor](components/networking/loadsensor)

### NURBS

- [contourpolyline2d](components/nurbs/contourpolyline2d)
- [coordinatedouble](components/nurbs/coordinatedouble)
- [nurbscurve](components/nurbs/nurbscurve)
- [nurbscurve2d](components/nurbs/nurbscurve2d)
- [nurbsorientationinterpolator](components/nurbs/nurbsorientationinterpolator)
- [nurbspatchsurface](components/nurbs/nurbspatchsurface)
- [nurbspositioninterpolator](components/nurbs/nurbspositioninterpolator)
- [nurbsset](components/nurbs/nurbsset)
- [nurbssurfaceinterpolator](components/nurbs/nurbssurfaceinterpolator)
- [nurbssweptsurface](components/nurbs/nurbssweptsurface)
- [nurbsswungsurface](components/nurbs/nurbsswungsurface)
- [nurbstexturecoordinate](components/nurbs/nurbstexturecoordinate)

### ParticleSystems

- [boundedphysicsmodel](components/particlesystems/boundedphysicsmodel)
- [coneemitter](components/particlesystems/coneemitter)
- [explosionemitter](components/particlesystems/explosionemitter)
- [forcephysicsmodel](components/particlesystems/forcephysicsmodel)
- [particlesystem](components/particlesystems/particlesystem)
- [pointemitter](components/particlesystems/pointemitter)
- [polylineemitter](components/particlesystems/polylineemitter)
- [surfaceemitter](components/particlesystems/surfaceemitter)
- [volumeemitter](components/particlesystems/volumeemitter)
- [windphysicsmodel](components/particlesystems/windphysicsmodel)

### Picking

- [linepicksensor](components/picking/linepicksensor)
- [pickablegroup](components/picking/pickablegroup)
- [pointpicksensor](components/picking/pointpicksensor)
- [primitivepicksensor](components/picking/primitivepicksensor)
- [volumepicksensor](components/picking/volumepicksensor)

### PointingDeviceSensor

- [cylindersensor](components/pointingdevicesensor/cylindersensor)
- [planesensor](components/pointingdevicesensor/planesensor)
- [spheresensor](components/pointingdevicesensor/spheresensor)
- [touchsensor](components/pointingdevicesensor/touchsensor)

### ProjectiveTextureMapping

- [textureprojector](components//textureprojector)
- [textureprojectorparallel](components//textureprojectorparallel)

### Rendering

- [clipplane](components/rendering/clipplane)
- [color](components/rendering/color)
- [colorrgba](components/rendering/colorrgba)
- [coordinate](components/rendering/coordinate)
- [indexedlineset](components/rendering/indexedlineset)
- [indexedtrianglefanset](components/rendering/indexedtrianglefanset)
- [indexedtriangleset](components/rendering/indexedtriangleset)
- [indexedtrianglestripset](components/rendering/indexedtrianglestripset)
- [lineset](components/rendering/lineset)
- [normal](components/rendering/normal)
- [pointset](components/rendering/pointset)
- [trianglefanset](components/rendering/trianglefanset)
- [triangleset](components/rendering/triangleset)
- [trianglestripset](components/rendering/trianglestripset)

### RigidBodyCollection

- [balljoint](components/rigidbodyphysics/balljoint)
- [collidableoffset](components/rigidbodyphysics/collidableoffset)
- [collidableshape](components/rigidbodyphysics/collidableshape)
- [collisioncollection](components/rigidbodyphysics/collisioncollection)
- [collisionsensor](components/rigidbodyphysics/collisionsensor)
- [collisionspace](components/rigidbodyphysics/collisionspace)
- [contact](components/rigidbodyphysics/contact)
- [doubleaxishingejoint](components/rigidbodyphysics/doubleaxishingejoint)
- [rigidbody](components/rigidbodyphysics/rigidbody)
- [rigidbodycollection](components/rigidbodyphysics/rigidbodycollection)
- [singleaxishingejoint](components/rigidbodyphysics/singleaxishingejoint)
- [sliderjoint](components/rigidbodyphysics/sliderjoint)

### Scripting

- [script](components/scripting/script)

### Shaders

- [composedshader](components/shaders/composedshader)
- [floatvertexattribute](components/shaders/floatvertexattribute)
- [matrix3vertexattribute](components/shaders/matrix3vertexattribute)
- [matrix4vertexattribute](components/shaders/matrix4vertexattribute)
- [shaderpart](components/shaders/shaderpart)

### Shape

- [appearance](components/shape/appearance)
- [fillproperties](components/shape/fillproperties)
- [lineproperties](components/shape/lineproperties)
- [material](components/shape/material)
- [physicalmaterial](components//physicalmaterial)
- [pointproperties](components/shape/pointproperties)
- [shape](components/shape/shape)
- [twosidedmaterial](components/shape/twosidedmaterial)
- [unlitmaterial](components//unlitmaterial)

### Sound

- [audioclip](components/sound/audioclip)
- [sound](components/sound/sound)

### Text

- [fontstyle](components/text/fontstyle)
- [text](components/text/text)

### Texturing

- [imagetexture](components/texturing/imagetexture)
- [movietexture](components/texturing/movietexture)
- [multitexture](components/texturing/multitexture)
- [multitexturecoordinate](components/texturing/multitexturecoordinate)
- [multitexturetransform](components/texturing/multitexturetransform)
- [pixeltexture](components/texturing/pixeltexture)
- [texturecoordinate](components/texturing/texturecoordinate)
- [texturecoordinategenerator](components/texturing/texturecoordinategenerator)
- [textureproperties](components/texturing/textureproperties)
- [texturetransform](components/texturing/texturetransform)

### Texturing3D

- [composedtexture3d](components/texturing3d/composedtexture3d)
- [imagetexture3d](components/texturing3d/imagetexture3d)
- ImageTextureAtlas
- [pixeltexture3d](components/texturing3d/pixeltexture3d)
- [texturecoordinate3d](components/texturing3d/texturecoordinate3d)
- [texturecoordinate4d](components/texturing3d/texturecoordinate4d)
- [texturetransform3d](components/texturing3d/texturetransform3d)
- [texturetransformmatrix3d](components/texturing3d/texturetransformmatrix3d)

### Time

- [timesensor](components/time/timesensor)

### VolumeRendering

- [blendedvolumestyle](components/volumerendering/blendedvolumestyle)
- [boundaryenhancementvolumestyle](components/volumerendering/boundaryenhancementvolumestyle)
- [cartoonvolumestyle](components/volumerendering/cartoonvolumestyle)
- [composedvolumestyle](components/volumerendering/composedvolumestyle)
- [edgeenhancementvolumestyle](components/volumerendering/edgeenhancementvolumestyle)
- [isosurfacevolumedata](components/volumerendering/isosurfacevolumedata)
- [opacitymapvolumestyle](components/volumerendering/opacitymapvolumestyle)
- [projectionvolumestyle](components/volumerendering/projectionvolumestyle)
- [segmentedvolumedata](components/volumerendering/segmentedvolumedata)
- [shadedvolumestyle](components/volumerendering/shadedvolumestyle)
- [silhouetteenhancementvolumestyle](components/volumerendering/silhouetteenhancementvolumestyle)
- [tonemappedvolumestyle](components/volumerendering/tonemappedvolumestyle)
- [volumedata](components/volumerendering/volumedata)

### X\_ITE

- BlendMode
