---
title: What's New
date: 2022-11-28
nav: main
categories: []
tags: [New, Releases]
---
X_ITE follows the [npm version syntax](https://docs.npmjs.com/about-semantic-versioning). Keep this in mind when choosing a version number.

## X_ITE v10.1.0 Released

*Leipzig, 28th July 2024:* This release comes with a new [browser option](/x_ite/reference/browser-services/#browser-options) `TextCompression` which determines how [Text](/x_ite/components/text/text/).*length* and [Text](/x_ite/components/text/text/).*maxExtent* are handled, i.e. either by adjusting char spacing or by scaling. These are the two options suggested by the X3D specification, and we can now offer both to let the user choose which one they want.

We also noticed two problems with text rendering, particularly with vertical text, where the text did not start or end at the origin. Also *maxExtent* is now implemented as specified by X3D.

## X_ITE v10.0.0 Released

*Leipzig, 23rd June 2024:* With this release, all glTF material extensions are now available, i.e. when a glTF file is parsed, these extensions are automatically converted to X3D. There is now an X3D node for each glTF extension. These nodes can also be referenced directly in X3D files. Extensions for glTF materials are converted to the new X3DMaterialExtensionNode nodes, which can be used as a child of [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/) node and the new [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) node. These material nodes now have a new field »extensions« for this purpose. The introduction of the »extensions« field has only a minimal impact and leads to the greatest possible compatibility.

To get an idea of what a great difference these new material extensions make, check out our [glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/). Take some time and look through all the examples. I am sure you will be amazed.

### New Browser Options

There are also new [browser options](/x_ite/reference/browser-services/#browser-options) that are especially made for PhysicalMaterial node and SpecularGlossinessMaterial node.

* New browser option Exposure.
* New browser option ToneMapping.

### Implemented glTF Extensions

All glTF extensions implemented with this version are listed below:

#### X3DOneSidedMaterialNode

* KHR_materials_pbrSpecularGlossiness implemented as [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) node.

#### X3DMaterialExtensionNode

* KHR_materials_anisotropy implemented as [AnisotropyMaterialExtension](/x_ite/components/x-ite/anisotropymaterialextension/) node.
* KHR_materials_clearcoat implemented as [ClearcoatMaterialExtension](/x_ite/components/x-ite/clearcoatmaterialextension/) node.
* KHR_materials_dispersion implemented as [DispersionMaterialExtension](/x_ite/components/x-ite/dispersionmaterialextension/) node.
* KHR_materials_emissive_strength implemented as [EmissiveStrengthMaterialExtension](/x_ite/components/x-ite/emissivestrengthmaterialextension/) node.
* KHR_materials_ior implemented as [IORMaterialExtension](/x_ite/components/x-ite/iormaterialextension/) node.
* KHR_materials_iridescence implemented as [IridescenceMaterialExtension](/x_ite/components/x-ite/iridescencematerialextension/) node.
* KHR_materials_sheen implemented as [SheenMaterialExtension](/x_ite/components/x-ite/sheenmaterialextension/) node.
* KHR_materials_specular implemented as [SpecularMaterialExtension](/x_ite/components/x-ite/specularmaterialextension/) node.
* KHR_materials_transmission implemented as [TransmissionMaterialExtension](/x_ite/components/x-ite/transmissionmaterialextension/) node.
* KHR_materials_volume implemented as [VolumeMaterialExtension](/x_ite/components/x-ite/volumematerialextension/) node.

#### Switch

* KHR_materials_variants implemented as [Switch](/x_ite/components/grouping/switch/) node.

## X_ITE v9.5.2 Released

*Leipzig, 28th April 2024:* Progress continues...

The [InstancedShape](/x_ite/components/x-ite/instancedshape/) node can now be used in conjunction with the [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) node and this is now also possible with the [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) node.

I have created two examples here to show the potential of this connection, both of which can be seen in the X_ITE Playground:

* [Open HAnimInstancedShape in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/HAnim/HAnimInstancedShape/HAnimInstancedShape.x3d)
* [Open HAnimParticleSystem in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/HAnim/HAnimParticleSystem/HAnimParticleSystem.x3d)

In addition to these changes, we have added a »damping« field to BoundedPhysicsModel which makes this possible:

* [Open BoundedPhysicsModel in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.x3d)

Every time a particle collides with the model, the velocity is multiplied by the damping factor, which now makes it possible to create more realistic simulations.

Also, X_ITE can now parse extremely long strings, which is important when using a data URLs. In addition, the [LineProperties](/x_ite/components/shape/lineproperties/) node can now be used with ParticleSystem, which was not possible before.

In the meantime, further improvements have of course been made, but these are not listed here.

## X_ITE v9.2.0 Released

*Leipzig, 7th January 2024:* This release comes with improved handling of imported nodes, they will now also work inside X3DPrototypeInstance nodes.

### New Features

* Imported nodes also work within protos now.

## X_ITE v9.0.0 Released

*Leipzig, 16th October 2023:* We right now released a new version. Unfortunately, in this release images from [ImageTexture](/x_ite/components/texturing/imagetexture/) and [MovieTexture](/x_ite/components/texturing/movietexture/) are now not flipped at the y-axis anymore, this is now done in the shaders. Custom shaders must be adjusted to reflect these changes. This is a breaking change.

### New Features

* Implemented a KTX texture loader for [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/), [ImageTexture](/x_ite/components/texturing/imagetexture/), and [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/).
* [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/) can now load panorama images.
* Basic implementation of [EnvironmentLight](/x_ite/components/lighting/environmentlight/) node.
* ES module version of X_ITE named »x_ite.mjs«.
* Typescript types for IntelliSense.
* PLY 3d format parser.
* [TextureProjection component](/x_ite/components/#textureprojection) is now working.

## X_ITE v8.10.0 Released

*Leipzig, 17th July 2023:* We right now released a new version.

### New Features

* The component/profile messages in the console from HAnim should be gone now.
* HAnimHumanoid is now GPU accelerated, try high poly objects.
* glTF skin object is now completely translated into HAnimHumanoid even with animations.

With the [glTF Sample Viewer](https://create3000.github.io/x_ite/laboratory/gltf-sample-viewer) you can test glTF and HAnimHumanoid if you like. Files of interest are:

#### glTF Random Models

* Animated Bee (lots of joints)

#### glTF Sample Models

* Brain Stem (high poly)
* Cesium man
* Fox
* Recursive Skeletons (stress test)

## X_ITE v8.7.0 Released

*Leipzig, 14th May 2023:* This release comes with a breaking change: `Browser.createX3DFromString` is now asynchronous and returns now a Promise. This ensures that all components are loaded, and all necessary nodes can be provided.

In addition, there is now an [automated test suite](https://github.com/create3000/x_ite-tests), which is being expanded on a daily basis.

### Breaking Changes

- `Browser.createX3DFromString` now returns a Promise.

## X_ITE v8.5.2 Released

*Leipzig, 28th January 2023:* Now, X_ITE has support for SVG as well as STL support. When a scene is parsed you can, instead of a number use special constants like PI or PI3_4.

### New Features

- Added SVG parser.
- Added STL parser.
- Added GLB parser.
- Parse HTML colors and constants like PI or PI1_3.
- Better GZip support.

### Bug Fixes

- Fixed wireframe shading of thick lines.
- Fixed XML MFString parsing.
- Fixed and optimized NRRD parser.
- Fixed XML output of backslash in strings.

## X_ITE v8.5.0 Released

*Leipzig, 23rd January 2023:* With this new version it is now possible to configure antialiasing. Antialiasing can be turned on/off, multisampling and supersampling can now be configured. Additionally glTF files can now be loaded, either directly as source of the \<x3d-canvas\> element or as source of an Inline node, as well as with API methods. The glTF file is internally converted into X3D and then made available to the scene-graph. Also there is a new node ImageTextureAtlas, which makes it easy to load 3D textures.

### New Features

- Added antialiased attribute.
- Added multisampling attribute.
- Added contentScale attribute.
- New browser options and rendering properties.
- Animated GIF support for MovieTexture.
- Added glTF parser.
- Added Wavefront OBJ parser.
- Implemented ImageTextureAtlas node.

### Bug Fixes

- Fixed X3DViewpointNode.viewAll behavior at initialization of world.

## X_ITE v8.4.0 Released

*Leipzig, 3rd January 2023:* We right now released a new version. With this version toJSONString is implemented and available for X3DScene, SFNode, MFNode, X3DProtoDeclaration, and X3DExternProtoDeclaration.

### New Features

- Implemented toJSONString.

## X_ITE v8.3.3 Released

*Leipzig, 31st December 2022:* We right now released a new version.

### New Features

- Added to*String options (scene, style, precision, doublePrecision).
- Added output styles (CLEAN, SMALL, COMPACT, TIDY).
- Prefer PROTO's during parse.
- Collect joint nodes if no provided (HAnim).
- Relaxed VRML parser (parse top level statements in MFNode).
- XML short syntax of prototype instances.

### Bug Fixes

- Fixed bug when floating point numbers are printed.
- Fixed bug when MFImage is printed.
- Fixed component's highest levels.
- Fixed double count of headlight.

## X_ITE v8.3.0 Released

*Leipzig, 14th December 2022:* We right now released a new version.

### New Features

- Use Phong shading as default for version 4.0.
- Implemented X3DViewpointNode *viewAll, nearDistance, farDistance and navigationInfo*.
- Implemented Inline *global* field.
- Implemented point and line geometry *normal* field.
- Added getNodeTypeName to [SFNode](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfnode-object).
- Added vector constructors to [SFMatrix*](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfmatrix3dsfmatrix3f-object).
- Added [SFRotation](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfrotation-object) matrix handling functions.
- Text component is now loaded on demand.

### Bug Fixes

- Fixed bug with GeoViewpoint flickering when just bound.

## X_ITE v8.1.0 Released

*Leipzig, 1st December 2022:* We now have a new website design.

### Bug Fixes

- Fixed Examine Viewer spin behavior.
- Fixed fading of Splash Screen.

## X_ITE v8.0.0 Released

*Leipzig, 24th November 2022*: We finally released the new version 8.0.0.

### New Features

- Now based on native JavaScript module system.
- X_ITE build is now based on WebPack, and a UMD library is build.
- No more injected \<script\> elements in \<header\> element of page.
- x_ite_dom is now an integral part of X_ITE.

### Bug Fixes

- Fixed X3DNode dispose.

## X_ITE v7.0.0 Released

*Leipzig, 13th November 2022*: We finally released the new version 7.0.0. This version comes with a brand new shader system. The default shaders are now highly specialized and therefor very fast. First tests reveal that the shaders are now 2 up to 3 times faster. But this also means that custom shaders may be broken now, because all x3d_Num* variables are now removed. X3D Authors must now hardcode these values into their shaders, or develop an own system.

### New Features

- New shader system.
- X3DVolumeData node now supports visible and bboxDisplay field.
- GeoViewpoint automatically forces logarithmic depth buffer.
- GeoViewpoint can now handle browser option 'StraightenHorizon'.

### Bug Fixes

- Fixed ComposedShader activate field handling.

## X_ITE v6.1.0 Released

*Leipzig, 24th October 2022*: We finally released the new version 6.1.0.

### New Features

- Implemented picking of thick lines and large points with X3DPointingDeviceSensorNode nodes like TouchSensor.
- Added Shading menu if *debug* attribute is 'true'.

### Bug Fixes

- Fixed Disk2D line case rendering.
- Fixed SFImage.toString.
- Fixed CSS.

## X_ITE v6.0.0 Released

*Leipzig, 19th October 2022*: We finally released the new version 6.0.0.

### New Features

- Introducing x3d-canvas element, using JavaScript User-Element syntax.
- New styles for context menu.
- Full support for LineProperties node.
- ParticleSystems are now GPU accelerated.
- Faster picking and other optimizations.

### Bug Fixes

- Fixed bug that browser stop working suddenly.
- Fixed fatal bug when second browser is created programmatically.

## X_ITE v4.7.7 Released

*Leipzig, 30th January 2022*: This release is primarily a bug fix release, but there are also new features.

### New Features

- Output XML or VRML encoding when viewpoint is copied.
- Added browser option "Timings", but removed attribute.
- Return promise from X3D function.

### Bug Fixes

- Prevent accidental navigation when context menu is closed.
- Fixed copy to clipboard of viewpoint when in fullscreen mode.

## X_ITE v4.7.6 Released

*Leipzig, 23th January 2022*: This release implements the new X3Dv4 UnlitMaterial. This also means that the custom shader interface has changed:

- Depreciated x3d_FrontMaterial in favor of x3d_Material uniform.
- Removed x3d_BackMaterial uniform.
- Removed x3d_Lighting uniform.
- Removed x3d_SeparateBackColors uniform.

### New Features

- Added X3DSingleTextureNode class.
- Added X3DSingleTextureTransformNode class.
- Added X3DSingleTextureCoordinateNode class.
- Added UnlitMaterial class.
- Implemented Appearance *backMaterial* field.

### Bug Fixes

- Fixed bug in aliases handling and proto nodes setup.
- Fixed bug in initialization of TextureTransformMatrix3D.
- Fixed wireframe mode for geometry.
- Optimized POINT shading.

## X_ITE v4.7.3 Released

*Leipzig, 16th January 2022*: This release fixes bugs, and a lot of code clean up has been done.

### New Features

- Parse JSON encoding "#sourceCode" objects.
- Use JavaScript URL objects internally now.

## X_ITE v4.7.2 Released

*Leipzig, 7th January 2022*: This release fixes bugs, and a lot of code clean up has been done.

### New Features

- Changed behavior of FLY viewer.
- Added particle uniforms to line geometry.

### Bug Fixes

- Fixes script url determination.
- Fixed bug when particle systems are used.
- Fixed rendering issue of Gouraud and Phong shader in Safari.
- Reduced compile time of Phong shader.
- Fixed bug in live handling.

## X_ITE v4.7.1 Released

*Leipzig, 19th December 2021*: This release fixed a lot of bugs, but also implements new features. Especially MF* fields can now be used within `for of` loops. X3DBindableNode nodes do work now proper when cloned in multiple layers.

### New Features

- Added layerNode argument to `Browser.changeViewpoint([layerNode,] name)`.
- Implemented Symbol.iterator for MF* fields. This enables `for of` loops.
- Improved X3DBindableNode handling when cloned in multiple layers.

### Bug Fixes

- Abort loading if loadURL is called more than once.
- Fixed load count handling.
- Fixed LOD.
- Fixed call outstanding events of inputOutput's of Script node when initialized.
- Preload line shader when WALK/FLY viewer becomes active.
- Prevent bug in Firefox that event loop is broken when pressing special keys. (#86)
- Display submenus of context menu on left side if there is no space on right side. (#86)
- Fixed fatal bug in OrthoViewpoint (#84).
- Fixed bugs in RigidBodyPhysics when nodes are changed.

## X_ITE v4.7.0 Released

*Leipzig, 5th December 2021*: This release implements some of the new X3Dv4 Features. X3Dv4 Draft is available at <https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/Architecture.html>.

This release also increased pure rendering speed (without routing and scripting) of up to 30%, that is a huge amount, especially when there are many nodes (300 and more).

### New Features

- Added X3DLightNode *shadows* field.
- Updated range of X3DLightNode *intensity* field.
- Added X3DShapeNode *castShadow* field.
- Added Appearance *alphaMode* and *alphaCutoff* field.
- Added X3DBoundedBox *visible* and X3DBoundedBox *bboxDisplay* field.
- Updated access type of WorldInfo *title* and *info* field to match X3Dv4.
- Add context menu "Show World Info" menu item, if an WorldInfo node exists.

### Bug Fixes

- Changed Extrusion SCPyAxis calculation.

## X_ITE v4.6.24 Released

*Leipzig, 12th November 2021*: This release is a bug fix release.

### Bug Fixes

- Fixed TransformSensor handling.
- Fixed X3DBindableNode handling when child of a Switch or LOD node.

## X_ITE v4.6.23 Released

*Leipzig, 31st October 2021*: Updated dependencies and reduced file size a tiny bit and X3DExecutionContext.updateImportedNode only updated the node associated with imported name, this enables X_ITE to import a node twice.

## X_ITE v4.6.22 Released

*Leipzig, 2nd July 2021*: This release is a bug fix release.

### Bug Fixes

- Changed ComposedCubMapTexture field names.
- Modified finiteRotationAxis default value.
- Improved loading of X3DBackgroundNode nodes and ComposedCubeMap nodes.

## X_ITE v4.6.21 Released

*Leipzig, 30th June 2021*: This release is a bug fix release.

### Bug Fixes

- Hide Shape node of GeneratedCubeMapTexture when generating texture itself.

## X_ITE v4.6.20 Released

*Leipzig, 15th June 2021*: This release is a bug fix release.

### Bug Fixes

- Fixed bug in X3DBrowser.importDocument and X3DBrowser.importJS.

## X_ITE v4.6.19 Released

*Leipzig, 27th May 2021*: This release is a bug fix release.

### Bug Fixes

- Fixed handling of negative radius values in Disk2D.
- Fixed handling of caps of Extrusion in rare cases.
- Use negated normal for back faces in TextureCoordinateGenerator.

## X_ITE v4.6.18 Released

*Leipzig, 13th April 2021*: This release is a bug fix release.

### Bug Fixes

- Fixed bug with pointing device when padding is applied to X3DCanvas.

## X_ITE v4.6.17 Released

*Leipzig, 22nd December 2020*: This release is a bug fix release. It fixed a minor bug in X3DViewpointNode when the viewpoint is animated.

### Bug Fixes

- Fixed a bug in X3DViewpointNode when the viewpoint is animated.

## X_ITE v4.6.15 Released

*Leipzig, 24th October 2020*: This release fixes a bug with OrthoViewpoint which has encountered in the last release, and some other bugs.

### Bug Fixes and Enhancements

- Fixed OrthoViewpoint.
- Fixed Layout component level.
- Fixed shader select.
- Implemented shader _activate_ field.

## X_ITE v4.6.14 Released

*Leipzig, 24th October 2020*: This release fixes some subtle bug in XML parser when parsing fieldValue element of proto instance.

### Bug Fixes and Enhancements

- Fixed XML parser parse MFNode fieldValue element.

## X_ITE v4.6.12 Released

*Leipzig, 15th October 2020*: With this release we could fix a lot of small but critical bugs and also had some optimizations for you and better support for macOS.

### Bug Fixes and Enhancements

- Better control of navigation with mouse and trackpad on macOS and tablet devices.
- Fixed examine viewer rotation when multiple layer with viewport are present.
- Emulate middle mouse button when pressing Alt/Option key.
- Fixed bug in IndexedTriangleFanSet.
- Updated Shape component to level 5.
- Fix bug in rotation axis/angle calculation.
- Very small optimization of transparent shapes.
- Reworked bindable nodes bind handling.

## X_ITE v4.6.11 Released

*Leipzig, 22nd August 2020*: With this release we introduce our new web site, it is now hosted on GitHub and has a clean and slick layout now. We also moved the code hosting to create3000.github.io, so make sure to update your X_ITE urls for CSS and JavaScript.

### Bug Fixes

- Updated dependencies.
- Fixed bug with Geometry2D in Safari.
- Fixed Background rendering on iOS Safari.
- Fixed bug with sound loading on iOS Safari.

## X_ITE v4.6.10 Released

*Leipzig, 21st March 2020*: This is primarily a bug fix release.

### Bug Fixes

- Fixed CSS.

## X_ITE v4.6.9 Released

*Leipzig, 30th November 2019*: Fixed bugs.

### Bug Fixes

- Added missing fields for HTML/DOM support.
- Fixed projective texture mapping in conjunction with generated cube map.

## X_ITE v4.6.8 Released

*Leipzig, 20th November 2019*: With this version we implement the TextureProjectorParallel and TextureProjectorPerspective node, from the upcoming X3D V4 standard, which will be available next year. We also have now better hardware support, we made *maxLights* and *maxTextures* dynamic, depending on the hardware of the user's system, this gives better support of older hardware and mobile systems.

### New Features

- Implemented TextureProjectorParallel.
- Implemented TextureProjectorPerspective.

### Bug Fixes

- Fixed special case in TimeSensor when *cycleInterval* is 0.

## X_ITE v4.6.7 Released

*Leipzig, 10th November 2019*: With this version we implement the PointProperties node, the first node from the upcoming X3D V4 standard, which will be available next year.

### New Features

- Implemented PointProperties node.

## X_ITE v4.6.6 Released

*Leipzig, 4th November 2019*: This is primarily a bug fix release.

### Bug Fixes

- Fixed texture 3d orientation.

## X_ITE v4.6.4 Released

*Leipzig, 2nd November 2019*: This is primarily a bug fix release.

### New Features

- Updated external library dependencies.
- Improved Gouraud and Phong shader.
- Implemented DICOM image parser for ImageTexture3D.
- Support for X3DTexture3DNode in OpacityMapVolumeStyle node's *transferFunction* field.
- Implemented Script node *shutdown* function.

### Bug Fixes

- Fixed bug in Script node in rare cases.

## X_ITE v4.6.3 Released

*Leipzig, 26th October 2019*: This is primarily a bug fix release.

### New Features

- Support for NRRD types signed/unsigned byte, signed/unsigned short, signed/unsigned int, float, and double.
- Implemented NRRD ASCII, RAW, HEX, and GZIP encoding.

### Bug Fixes

- Fixed CylinderSensor minAngle/maxAngle handling.
- Fixed wrong SilhouetteEnhancementVolumeStyle rendering in rare cases.
- Fixed wrong BoundaryEnhancementVolumeStyle rendering.
- Fixed Background rendering on mobile devices.

## X_ITE v4.6.2 Released

*Leipzig, 20th October 2019*: With this release we implement full support for VolumeRendering component and full support for Texturing3D component, ie. we switch to WebGL 2 with this release, if available.

### New Features

- Basic support for VolumeRendering component.
- Full support for Texturing3D component.

### Bug Fixes

- Fixed missing Browser properties *supportedProfiles* and *supportedComponents*.
- Optimized NURBS weight handling when no weights present.
- Fixed bug in TextureTransformMatrix3D.
- Fixed double load of URL in some cases of X3DUrlObject nodes.

## X_ITE v4.5.14 Released

*Leipzig, 5th October 2019*: This is primarily a bug fix release.

### Bug Fixes

- Better NURBS normals.
- Fixed X3DNurbsSurfaceGeometryNode *closed* field handling.
- Fix NURBS *weight* field handling.

## X_ITE v4.5.12 Released

*Leipzig, 23rd September 2019*: This is primarily a bug fix release.

### Bug Fixes

- Fixed bug in Matrix transpose.
- Better parser errors when node type is not known.

## X_ITE v4.5.10 Released

*Leipzig, 17th July 2019*: This is primarily a bug fix release.

### Bug Fixes

- Fixed sound rendering.

## X_ITE v4.5.9 Released

*Leipzig, 10th July 2019*: This is primarily a bug fix release.

### Bug Fixes

- Fixed bug with browser event handler, for instance »onload«, if jQuery is present.
- Fixed bug with FogCoordinate calculation handling.

## X_ITE v4.5.8 Released

*Leipzig, 3rd July 2019*: Fixed some bugs.

### Bug Fixes

- Fixed bug when parsing Classic VRML Encoded files.

## X_ITE v4.5.7 Released

*Leipzig, 26th June 2019*: We could again fix some bugs which will make X_ITE again more stable. Additionally we removed the non-standard fields from AudioClip and MovieTexture, they are now fully specification conform.

### New Features

- Updated splash screen.

### Bug Fixes

- Fixed TimeSensor wrong *cycleTime* event at startup.
- Fixed BrowserTimings button type.
- Removed non-standard fields from X3DSoundSourceNode nodes.
- Fixed geometry nodes index fields access type.

## X_ITE v4.5.6 Released

*Leipzig, 19th June 2019*: We could optimize CoordinateChaser/Damper and TexCoordChaser2D/Damper2D, which runs now significantly faster.

### New Features

- Optimized CoordinateChaser/Damper and TexCoordChaser2D/Damper2D.

### Bug Fixes

- Fixed bug in TimeSensor *fraction\_changed* calculation if *loop* is true.

## X_ITE v4.5.4 Released

*Leipzig, 9th June 2019:* We could fix some minor bugs.

### New Features

- Added MFNode.toVRML/XMLString.

### Bug Fixes

- Fixed sound playing when Browser.endUpdate was called.
- Fixed Switch node when children are changed.
- Fixed a bug with Inline nodes in conjunction with DOM integration.

## X_ITE v4.5.1 Released

*Leipzig, 20th April 2019:* Although not enable, we are still using WebGL 1 in the official releases, X_ITE is now prepared for WebGL 2. If WebGL 2 becomes more popular we will enabled it, if available, then WebGL 2 is selected, otherwise WebGL 1 to make X_ITE compatible to older browsers.

## X_ITE v4.5.0 Released

*Leipzig, 14th April 2019:* With this version we implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate and also FillProperties is now working.

### New Features

- Implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate.
- Implemented FillProperties.
- Faster startup of browser.
- Better transitions with OrthoViewpoint.

### Bug Fixes

- Fix bug in browser options when switching texture quality.
- Fixed picking and Layout node.
- Fixed bug with composite glyphs in Text node.
- Fixed bug with data URLs.
- Fixed bug in toXMLString and toVRMLString when outputting protos.

## X_ITE v4.4.7 Released

*Leipzig, 3rd April 2019:* This version comes with a fresh implementation of the TextureCoordinateGenerator node and we could make the VisibilitySensor more precise.

### New Features

- Implemented TextureCoordinateGenerator.
- More precise VisibilitySensor.

## X_ITE v4.4.6 Released

*Leipzig, 25th March 2019:* This version comes with the first nodes from the Picking component. We implemented LinePickSensor, PickableGroup, PointPickSensor, PrimitivePickSensor, and VolumePickSensor, which are fully implemented.

### New Features

- Implemented Picking component.

## X_ITE v4.4.5 Released

### Bug Fixes

- Fixed bug in LOD traverse.

## X_ITE v4.4.4 Released

*Leipzig, 18th March 2019:* We finally implemented *toVRMLString* for SFNode, X3DProtoDeclaration, X3DExternProtoDeclaration, and X3DScene. There is a new X3DCanvas attribute *preserveDrawingBuffer,* set this to true if you want to save the image from the canvas.

### New Features

- Implemented toVRMLString.
- New X3DCanvas attribute *preserveDrawingBuffer*.

### Bug Fixes

- Fixed bug in toXMLString of X3DScene.
- Fixed bug when parsing SFMatrix3d/f values.
- Fixed bug when parsing data URLs.
- Fixed shadow handling.
- Fixed bug in MF* fields pop and shift.

## X_ITE v4.4.3 Released

*Leipzig, 11th March 2019:* Fixed a bug in BlendMode and there is a new page where you can online edit the BlendMode.

### Bug Fixes

- Fixed bug in BlendMode.

## X_ITE v4.4.2 Released

*Leipzig, 24th February 2019:* We could fix some small bugs and now the TransformSensor is fully implemented. The version number is now displayed in the Context Menu.

### New Features

- Show version number in context menu.
- Fully implemented TransformSensor.
- Optimized proto instance creation, especially when you use proto instances within another proto.
- Small improvements.

### Bug Fixes

- Fixed GeoLOD when a ProximitySensor or Viewpoint is in the root node or children.
- Fixed fatal bug in IndexedFaceSet if there are degenerated polygons.

## X_ITE v4.4.1 Released

*Leipzig, 24th February 2019:* Fixed some small bugs.

### Bug Fixes

- Fixed Browser.createX3DFromString console output.
- Fixed X3DExternProtoDeclaration, X3DProtoDeclaration, X3DRoute toString output.
- Fixed H-Anim units.

## X_ITE v4.4.0 Released

*Leipzig, 4th February 2019:* Small bug fixes and small optimizations makes this version as stable as ever before. We also could now implement the FogCoordinate node.

### New Features

- Implemented FogCoordinate.

### Bug Fixes

- Pass current time stamp to Script.prepareEvents function.
- X3DConstants have now browser event constants for browser callbacks.

## X_ITE v4.2.17 Released

*Leipzig, 26th January 2019:* With this version we release the first version of the H-Anim component. The H-Anim component is automatically included when a profile or component statement matches »H-Anim«.

### New Features

- Implemented »H-Anim« component.

## X_ITE v4.2.16 Released

*Leipzig, 16th January 2019:* With this version we release the first version of the NURBS component. The NURBS component is automatically included when a profile or component statement matches »NURBS«.

### New Features

- Implemented »NURBS« component.

## X_ITE v4.2.15 Released

*Leipzig, 23th December 2018:* Beside OrthoViewpoint node, the Layout node is now able to handle Viewpoint node and GeoViewpoint node and we could fix again some bugs.

### Bug Fixes

- Implemented Layout for Viewpoint and GeoViewpoint.
- Fixed Browser.getRenderingProperty.
- Fixed logarithmic depth buffer handling.
- Fixed bug in ECMAScript SFVec2/3d handling.
- Fixed bug in XML generator when generating nodes.
- Fixed bug with audio/video playback when url changes.

## X_ITE v4.2.14 Released

*Leipzig, 16th December 2018:* This version implements the StringSensor from the KeyDeviceSensor component and we found a really phat bug in X3DComposedGeometryNode normal generation, which affects TriangleSet, IndexedTriangleSet, QuadSet, and so on. We also tested X_ITE against <https://x3dgraphics.com/examples/X3dForWebAuthors/index.html> and fixed all bugs found.

### New Features

- Implemented StringSensor

### Bug Fixes

- Fixed X3DKeyDeviceSensorNode.enabled field handling.
- Fixed bug with KeySensor.isActive.
- Fixed bug in X3DComposedGeometryNode normal generation.
- Fog.visibilityRange is now affected by scaling.
- SpotLight.radius and PointLight.radius are now affected by scaling.

## X_ITE v4.2.13 Released

*Leipzig, 6th December 2018:* SFVec2f/d, SFVec3f/d, SFVec4f/d have now new functions. These are multVec, divVec, distance, and lerp. Have a look at:

- SFVec2f/d Object
- SFVec3f/d Object
- SFVec4f/d Object

for more information. Additionally we tested X_ITE against <https://www.web3d.org/x3d/content/examples/Basic/index.html> and fixed the bugs we found.

### New Features

- Added new vector functions to SFVec2f/d, SFVec3f/d, SFVec4f/d.

### Bug Fixes

- Fixed progress bar CSS in some cases.
- Fixed X3DBackground rendering if a GeoViewpoint is bound.

## X_ITE v4.2.12 Released

*Leipzig, 4th December 2018:* Fixed a bugs in Text node and BrowserOptions.

### Bug Fixes

- Fixed fatal bug in Text node when vertical text is rendered with empty lines.
- Fixed bug in Text.lineBounds when vertical text is rendered with empty lines.
- Fixed wrong initialization of BrowserOptions.

## X_ITE v4.2.11 Released

*Leipzig, 29th November 2018:* Fixed some bugs.

### New Features

- Small optimizations

### Bug Fixes

- Fixed a bug in event handling.
- Fixed a bug in GeoLOD.
- Fixed fatal bug in ImageCubeMapTexture.

## X_ITE v4.2.10 Released

*Leipzig, 13th November 2018:* We tested X_ITE against <https://www.web3d.org/x3d/content/ConformanceNist/index.html> and fixed the bugs we found.

### Bug Fixes

- Fixed LOD level calculation when range is empty.
- Fixed LocalFog calculation.
- Fixed fog calculation when visibilityRange is 0.
- Disable collision detection when viewpoint transition is active.
- Use specified precision for default struct types in shader source.

## X_ITE v4.2.9 Released

### Bug Fixes

- Switch sounds off when not visible.
- Fixed fatal bug when setting audio/video volume.
- Fixed Sound node volume calculation.
- Better interpolation from saturated color to black, white, or gray.

## X_ITE v4.2.8 Released

*Leipzig, 31th October 2018:* The X3DCanvas element has now the onload, onshutdown, and *onerror* attributes and properties. There is also jQuery support for these event handler when calling jQuery.fn.on and jQuery.fn.off:

```js
const element = $("X3DCanvas");
element .on ("load", function () { console .log ("load, yeah"); });
```

### New Features

- The X3DCanvas element has now the onload, onshutdown, and *onerror* attributes with jQuery support.
- The X3DCanvas element has now the onload, onshutdown, onerror, src, and url properties.
- X_ITE now respects the tabindex setting from the X3DCanvas element.

### Bug Fixes

- Fixed bug in Extrusion orientation handling.
- Better support for Extrusion with coincident spine points.

## X_ITE v4.2.7 Released

*Leipzig, 29th October 2018:* This version fixes some important bugs and makes X_ITE more specification conform.

### Bug Fixes

- Fixed a bug in proto instances loaded from extern prototypes.
- Also parse and output XML IMPORT attribute importedDEF beside old attribute exportedDEF.
- ScreenGroup and ScreenFontStyle are now respecting a scaleOrientation in the transformation hierarchy.
- Fixed normal calculation of bounding boxes, it handles now special cases.

## X_ITE v4.2.6 Released

*Leipzig, 14th October 2018:* With this version, X_ITE includes a new polygon tessellator, ie. X_ITE can better render concave polygons witch also affects polygon font support, which is now even better.

### New Features

- Better polygon support for concave polygons.
- Better polygon font rendering.
- »Straighten Horizon« is now the default for EXAMINE viewer.

### Bug Fixes

- Fixed bug when parsing XML field values.
- Fixed SFRotation handling of un-normalized values.

## X_ITE v4.2.5 Released

*Leipzig, 1st October 2018:* This version fixes loads of bugs and added loads of small Features.

### New Features

- Added »Straighten Horizon« option to context menu when EXAMINE viewer is active.
- Optimized XML parser, it is now up to 60 % faster especially for large geometries.
- Implemented BrowserOption »EnableInlineViewpoints«.
- Published X3DField.add/removeFieldCallback functions.
- Implemented X3DBrowser.add/removeBrowserCallback functions.
- Changed X3DCanvas element focus handling, the element itself is now the focus element.
- New and optimized resize handling of X3DCanvas element.

### Bug Fixes

- Fixed bug of XML output of proto with cloned root nodes.
- Fixed bug when parsing JSON encoded files containing script source code.
- Fixed handling of VRML viewpoints.
- Fixed event breaking rules for script execution.
- Fixed CSS menu handling.
- Fixed access type of *index* field of IndexedTriangleFanSet, IndexedTriangleSet, IndexedTriangleStripSet.
- Fixed bug in proto instance initialization when extern proto is not yet loaded.
- Fixed rendering of PointSet with GeoCoordinate.
- Fixed KeyDeviceSensor in some cases.
- Fixed spinning of viewpoint carries over after viewpoint change.

## X_ITE v4.2.4 Released

*Leipzig, 9th July 2018:* This version is primarily a bug fix version. There are also new examples online for ScalarChaser, and IndexedTriangleFanSet.

### Bug Fixes

- Fixed fatal bug in X3DProgrammableShaderObject.
- Small optimizations in X3DField objects.

## X_ITE v4.2.3 Released

*Leipzig, 7th July 2018:* This version is primarily a bug fix version. There are also new examples online for PointSet, and IndexedLineSet.

### Bug Fixes

- Fixed bug in PROTO setup.
- Small optimizations in X3DArrayField.
- Small optimizations in event handling.
- Fixed bug in name handling when copy node.

## X_ITE v4.2.2 Released

*Leipzig, 23th June 2018:* We are proud to announce that code.create3000.de is now accessible via https.

### New Features

- code.create3000.de is now accessible via https

## X_ITE v4.2.1 Released

*Leipzig, 17th June 2018:* This version is primarily a bug fix version.

### Bug Fixes

- A real depth buffer is now used in shadow calculations.
- Fixed Chrome glitches of X3DBackground node.
- Fixed CSS issue.
- Fixed ImageTexture issue when the texture is reused multiple times.

## X_ITE v4.2.0 Released

DirectionalLight, SpotLight, and PointLight are now able to cast shadows. Let’s details them. A directional light is when light rays are parallel. A bit like when you look at the sun rays on the left. It mostly behaves like a light source very far from us. A spot light is when light rays seems to originate from a single point, and spreads outward in a coned direction, like in a dance club. To enable the shadow casting on a light, just adjust *shadowIntensity* of the light.

```vrml
X3DLightNode {
  ...
  shadowIntensity 0
  shadowColor 0 0 0
  shadowBias 0.005
  shadowMapSize 1024
}
```

You can tune the *shadowIntensity*. It is the intensity of the shadow. 0 means no shadow, 1 means pure black shadow.

![Dynamic Shadows](https://create3000.github.io/media/images/dynamic-shadows.png)

<small>Dynamic shadows in X_ITE</small>

## X_ITE v4.1.7 Released

*Leipzig, 27th May 2018:* This version is primarily a bug fix version.

### Bug Fixes

- Fixed fatal bug in Classic VRML parser.
- Fixed LOD.level\_changed event handling.
- Fixed bug when rendering opaque objects.

## X_ITE v4.1.6 Released

*Leipzig, 24th May 2018:* Thank's to Ammo (Bullet) physics engine we have implemented a lot of new nodes of the RigidBodyPhysics component. Most of the documentation pages of this component have a live example for this node. The component is realized as plug-in which can be include right after the X_ITE.js script tag.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/x_ite.css"/>
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/x_ite.min.js"></script>
<!-- Include the following plug-ins if you wish support for this component -->
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/rigid-body-physics.min.js"></script>
```

### New Features

- RigidBodyPhysics component

## X_ITE v4.1.5 Released

*Leipzig, 14th March 2018:* We finally released version 4.1.5 now. With this version it is now possible to load X3D JSON encoded files. We implemented touch device support for all viewers and nodes derived form X3DPointingDeviceSensorNode and Anchor. This means tablets and smart phones are now fully supported. There are also a lot of other bug fixes.

### New Features

- JSON file loader
- Touch device support for all Viewers and TouchSensor nodes
- Smoother navigation in Examine Viewer and other viewer
- Optimizations in IndexedQuadSet and QuadSet
- Optimized CoordinateInterpolator, NormalInterpolator, and CoordinateInterpolator2D
- Support for more textures for custom shaders
- New »StraightenHorizon« browser option
- Better rendering of Text in some cases

### Bug Fixes

- Less memory footprint
- Fixed IndexedTriangleSet attribute handling
- and more bug fixes

## X_ITE v4.1.4 Released

*Leipzig, 11th January 2018:* We finally released version 4.1.4 now. X_ITE has become a huge change in the shader specification. It is now even more like GLSL. There are new uniform variables *x3d\_LightSourceParameters, x3d\_MaterialParameters,* and *x3d\_FogParameters.* Old shaders are fully compatible with this version, although old shader light and material uniforms are depreciated. For more information have a look at <custom-shaders>.

## X_ITE v4.1.3 Released

*Leipzig, 25th December 2017:* There is now the new BlendMode node in X_ITE available, which gives X3D authors the ability to specify the WebGL blend modes for a node. The node is an X3DAppearance child node and can be assigned the the new *blendMode* field of a Appearance node. Shader authors have now more control over particle systems, there are three new build in variables available in shaders: *x3d\_ParticleId, x3d\_ParticleLife, x3d\_ParticleElapsedTime, x3d\_ParticlePosition.* For more information have a look at <custom-shaders>.

## X_ITE v4.1.2 Released

*Leipzig, 8th December 2017:* Titania supports now the whole ParticleSystem component with the default graphics card driver Nouveau. During the implementation we found some optimization to speed up the ParticleSystem node in X_ITE. Additionally we could fix three bug.

### New Features Bug Fixes

- Small optimizations Bug Fixes in ParticleSystem node.
- Added x3d\_CameraSpaceMatrix to ComposedShader build-in variables.
- Fixed a bug in X3DBackground node when displayed with GeneratedCubeMapTexture node.
- Fixed fatal bug in MFImage.

## X_ITE v4.1.1 Released

*Leipzig, 23rd November 2017:* We fixed a bug in load count handling of the splash screen, ie. if the *splashScreen* attribute of the X3DCanvas element is true, the scene is first displayed if all objects and textures are completely loaded. An examination of the source code has revealed this mistake in the networking nodes.

### New Features Bug Fixes

- Fixed a bug in load count handling of the splash screen

## X_ITE v4.1.0 Released

*Leipzig, 22nd November 2017:* This completely implements the unit statement. Now units are parsed and all field values are converted. Additionally we could optimize X3DGroupingNode.removeChildren. It is now up to 20 % faster, especially if there are many children.

### New Features Bug Fixes

- Fixed bug in CADLayer.addChildren
- Optimized X3DGroupingNode.removeChildren
- Implemented units handling

## Cobweb is now X_ITE

*Leipzig, 23rd August 2017:* Cobweb is now **X_ITE.** We changed its name to X_ITE to better reflect the purpose and design of X3D. Though the project's name may have changed, its programming still includes correctness, usability, flexibility, extensibility, and safety.

X_ITE is now available from our own server at code.create3000.de. Just include the following URL's into your HTML and you are up to date again:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.0.7/dist/x_ite.css"/>
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.0.7/dist/x_ite.min.js"></script>
```

Additionally X_ITE is now available via GitHub CDN and jsDelivr CDN.

### New Features Bug Fixes

- Better font support for polygon text.
- Fixed fog rendering with Gouraud shading in some cases.
- If for any reason Phong shading is not available Gouraud shading is used instead.
- Better mouse wheel reaction in walk viewer.
- The X3DCanvas element can now be styled in IE, this is important if the fallback is visible.
- Fixed font kerning in some cases.
- X3D functions for external browser are now called when scenes are loaded.
- Fixed bug in normalizeVelocity if keyVelocity is 0. See SplineScalarInterpolator.
- Fixed bug with LoadSensor if an X3DUrlObject is created from Script.
- Fixed event processing from ShaderPart url field.
- Fixed BooleanFilter inputFalse output.
- Fixed fog calculation if visibilityRange is 0.
- Changed handling of fallback css attribute display.
- Package is now available via code.create3000.de and jsDelivr.
- npm is now the package management system.

## Cobweb 3.3 Released

*Leipzig, 15th August 2017:* Accessing the external browser has changed a little. The *elements* callback has been removed from the arguments of the callback functions, which are passed to the X3D function. See Accessing the External Browser for further details.

There are new URL's for cobweb.min.js and cobweb.css. Use the following locations now.

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.css"/>
<script src="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.min.js"></script>
```

### New Features Bug Fixes

- Changed external browser access.
- Fixed default values of certain nodes (IntegerTrigger, ArcClose2D, Disk2D, Rectangle2D, TriangleSet2D, GeoViewpoint, DirectionalLight, Viewpoint, ConeEmitter, CylinderSensor).
- X3DCanvas is now transparent on startup until browser is initialized.
- Enable propagate events to HTML browser if in NONE viewer.
- X3DExecutionContext.getImportedNode operates now correct if importedName is undefined.
- SFBool.valueOf return now a native JavaScript value.

## Cobweb 3.2 Released

*Leipzig, 29th April 2017:* The X3DCanvas element becomes a major change in its CSS styles, it is now similar to the HTML5 canvas element a display *inline-block* element instead of *block* with a default width and height of 300 × 150 pixels. Additionally there are four new attributes *splashScreen, notifications, timings,* and *contextMenu*, these attribute are especially useful if the X3DCanvas element is very small. Have a look at »Attributes of the X3DCanvas Element« to see how these attributes work. Additionally we changed the data type mapping of SF/MFRotation in custom shaders from *uniform vec4* quaternion representation to *uniform mat3* 3×3 rotation matrix representation, which are easier to operate with.

### New Features Bug Fixes

- Changed default CSS style display of X3DCanvas element to *inline-block.*
- Changed default width and height of X3DCanvas element to 300 × 150 pixels.
- Added new X3DCanvas attributes *splashScreen,* notifications, timings, contextMenu.
- Implemented JavaScript browser option *SplashScreen.*
- Implemented SFColorRGBA.prototype.set/getHSVA.
- Use *uniform mat3* in custom shaders for SF/MFRotation fields.

## Cobweb 3.1 Released

*Leipzig, 13th April 2017:* We finally released version 3.1 now. This release is a bug fix release and fixes a fatal bug with shader uniform handling. Thanks to Sgeo. Externprotos have now the missing loadNow function implemented, although this function is normally not needed.

## Cobweb 3.0 Released

*Leipzig, 12th April 2017:* We finally released version 3.0 now. All fields derived from X3DArrayField have now two new functions *»push«* and *»unshift«* which operate like the corresponding JavaScript Array functions. All fields derived from X3DField have now a new function *»equals«* which makes it easy to compare two field values. The XMLParser was reworked and is now more secure and several issues are fixed. And last but not least we are proud to announce that prototypes do completely work now with XHTML DOM Integration.

![Mountains Shader Example](https://create3000.github.io/media/images/mountains.jpg)

<small>New Shader Example »Mountains«</small>

### New Features Bug Fixes

- New shader uniform x3d\_ViewportPrototypes do completely work now with DOM Integration.
- Implemented X3DArrayField push and unshift
- Implemented X3DField equals
- Reworked XMLParser
- Fixed ScreenFontStyle text picking
- Fixed issue with touch sensibility of Disk2D
- Fixed an issue of X3DPrototypeInstance in toXMLString

## First Version

The first version of X_ITE was created in April 2015. It was still called Cobweb.
