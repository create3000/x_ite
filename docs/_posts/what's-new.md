---
title: What's New
date: 2022-11-28
nav: main
categories: []
tags: [New, Releases]
---
X_ITE follows the [npm version syntax](https://docs.npmjs.com/about-semantic-versioning). Keep this in mind when choosing a version number.

## X_ITE v14.0 Series

*Leipzig, 27th January 2026:* This series of X_ITE comes with experimental support for X3D4.1, meaning that all the new features and nodes ([EnvironmentLight](/x_ite/components/lighting/environmentlight/), [HAnimPose](/x_ite/components/hanim/hanimpose/), [FontLibrary](/x_ite/components/text/fontlibrary/), [Tangent](/x_ite/components/rendering/tangent/)) are available and ready to be tested.

In addition, the glTF parser can now handle [KHR_meshopt_compression](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md). With KHR_meshopt_compression, glTF files can be shrunk up to 1/10 of their size. gltfpack is very well suited for this. Run `npx gltfpack` with options `-cc` and `-tc` and see what happens.

### Notable Changes

- [x] Added experimental support for X3D4.1 standard.
- [x] glTF parser can now handle [KHR_meshopt_compression](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md).
- [x] glTF parser can now handle [EXT_texture_avif](https://gltf-transform.dev/modules/extensions/classes/EXTTextureAVIF).
- [x] glTF parser can now handle [EXT_texture_video](https://github.com/takahirox/EXT_texture_video/README.md).
- [x] Improved Wavefront OBJ parser to handle multi materials and color per vertex.
- [x] Improved STL parser to convert model to X3D coordinate system.
- [x] Improved PLY parser to convert model to X3D coordinate system in some cases.
- [x] [EnvironmentLight](/x_ite/components/lighting/environmentlight/) is now able to handle [GeneratedCubeMapTexture](/x_ite/components/cubemaptexturing/generatedcubemaptexture/) nodes.
- [x] Selecting *Context Menu > World Info* will now also show all metadata.
- [x] Fixed issue with glTF skins when the skeleton is used multiple times.

## X_ITE v12.2 Series

*Leipzig, 7th December 2025:* This update introduces several performance-focused enhancements and new browser-level controls, giving developers finer tuning options for rendering and interaction. It also includes important fixes that improve visual correctness and overall graphics stability.

### Notable Changes

- [x] New [browser option](/x_ite/reference/browser-services/#browser-options) `MaximumFrameRate`.
- [x] New browser function [`setCursors`](/x_ite/reference/browser-services/#setcursors-cursortypes-cursortypes-void-non-standard).
- [x] Optimized texture units handling.
- [x] Fixed a bug when opaque points are rendered.

## X_ITE v12.1 Series

*Leipzig, 28th September 2025:* The X_ITE team proudly announces version 12.1, bringing new features, important fixes, and improved standards support for an even smoother Web3D experience.

### Notable Changes

- [x] The Walk and Fly viewers come now with a new feature »Slide Along Walls« and new [browser option](/x_ite/reference/browser-services/#browser-options) `WallFriction`.
- [x] New glTF extension [KHR_materials_volume_scatter](/x_ite/components/x-ite/volumescattermaterialextension/) implemented.
- [x] If a glTF file with animations is loaded, a new »Animations« menu will appear in the context menu.
- [x] Optimized creation of [HAnimMotion](/x_ite/components/hanim/hanimmotion/) interpolators.
- [x] glTF Parser now supports extension [KHR_node_visibility](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_node_visibility) with animation pointers.
- [x] Bug fixed in [Text](/x_ite/components/text/text/) node with vertical text and *topToBottom* set to `FALSE`.
- [x] Bug fixed in [HAnimMotion](/x_ite/components/hanim/hanimmotion/) node with XYZ rotation order handling.
- [x] Bug fixed when [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) *texCoord* is used.
- [x] Bug fixed when points are rendered on a transparent [Background](/x_ite/components/environmentaleffects/background/).
- [x] Fixed fatal bug in Depth shader when [ClipPlane](/x_ite/components/rendering/clipplane/) nodes are used. This affects shadows and collision detection.
- [x] Correctly handle [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) nodes during collision detection.
- [x] Fixed units of *nearDistance* and *farDistance* fields of X3DViewpointNode and X3DTextureProjectorNode.
- [x] Fixed a visual bug when glTF KHR_materials_transmission is rendered.

## X_ITE v12.0 Series

*Leipzig, 9th August 2025:* This new series 12.0 comes with a breaking change in texture coordinate handling. There was a bug when the texture coordinate of a Geometry2D shape must be flipped for the back face.

There is now a test file that should show both the same image on the front and back face: [texture mapping on a Rectangle2D with TextureTransform](/x_ite/playground/?url=https://create3000.github.io/Library/Tests/Components/Geometry2D/FlipTexture.x3d).

### Breaking Change

- [x] Fixes texture flipping about x-Axis for Geometry2D for [ImageTexture](/x_ite/components/texturing/imagetexture/) and [MovieTexture](/x_ite/components/texturing/movietexture/).

### Notable Changes

- [x] Now, texture transform nodes also affect [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/) node.
- [x] Collision detection is now entirely done by GPU.
- [x] XML and JSON attributes *appinfo* and *documentation* for `ProtoDeclare`, `ExternProtoDeclare` and `field` are no longer ignored.
- [x] glTF Parser now supports extension [KHR_node_visibility](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_node_visibility).
- [x] Bug fixes in several nodes with bounding box calculations.
- [x] Fixes bug with light *attenuation* handling in PBR shader.
- [x] Fixes a bug with some smart-phones that HAnim and ParticleSystem nodes are not working.

## X_ITE v11.6 Series

*Leipzig, 12th July 2025:* This new series 11.6 comes with Animated PNG support for MovieTexture node. The MoveTexture node has been able to handle Animated GIFs for quite a while, and can now also handle Animated PNGs.

For a first impression of how the whole thing looks now, here are two example files to test:

1. [Animated PNG as MovieTexture](/x_ite/playground/?url=https://create3000.github.io/Library/Tests/Components/Texturing/AnimatedPNG.x3d)
2. [Animated GIF as MovieTexture](/x_ite/playground/?url=https://create3000.github.io/Library/Tests/Components/Texturing/AnimatedGIF.x3d)

See also: [MovieTexture supported file formats](/x_ite/components/texturing/movietexture/#supported-file-formats).

### Notable Changes

- [x] This series drops support for WebGL 1, because all known browsers support WebGL 2 now for quite a while.
- [x] [EnvironmentLight](/x_ite/components/lighting/environmentlight/) can now generate a diffuse texture from specular if *diffuseTexture* field is empty.
- [x] Fixes a bug with Mali GPU when some objects are rendered completely black.
- [x] Fixes light calculations for [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/).
- [x] Speed of glTF image loading is now better in some cases.
- [x] Fixes a bug with [Extrusion](/x_ite/components/geometry3d/extrusion/) and closed *spine* when *orientations* are used.

## X_ITE v11.5 Series

*Leipzig, 6th April 2025:* This series comes improvements in [Sunrize](/sunrize/).

### Sunrize

- [x] Objects can now directly be selected in the browser window.
- [x] New Hierarchy buttons »Select parent nodes(s).« and »Select child node(s).« in the Dashboard.
- [x] New »View all objects in active layer.« button in the Dashboard.
- [x] Other bug fixes.

### X_ITE

- [x] New `theme` [attribute](/x_ite/#attributes-of-the-x3d-canvas-element) for the \<x3d-canvas\> element.
- [x] New icon concept for context menu, timings and notifications.
- [x] X3DVolumeDataNode now supports [browser option](/x_ite/reference/browser-services/#browser-options) `QualityWhenMoving`.
- [x] Improved [LineProperties](/x_ite/components/shape/lineproperties/) `linewidthScaleFactor` handling to support a greater range of values.
- [x] Fixed various minor bugs in [MovieTexture](/x_ite/components/texturing/movietexture/).
- [x] Fixed issue with animation getting stuck when in transition, viewAll or lookAt animation.
- [x] Fixed issue with [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) sending »old« *touchTime* values.
- [x] Fixed issue in normal calculations in rare cases.
- [x] Fixed [Switch](/x_ite/components/grouping/switch/) and [LOD](/x_ite/components/navigation/lod/) `addChildren` and `removeChildren` events handling.
- [x] If the *min* package is selected, the correct files are now loaded from the assets folder.
- [x] Fixed fatal bug in PBR shader when [DiffuseTransmissionMaterialExtension](/x_ite/components/x-ite/diffusetransmissionmaterialextension/) and [VolumeMaterialExtension](/x_ite/components/x-ite/volumematerialextension/) are present at the same time.
- [x] Fixed bug when Order Independent Transparency (OIT) and [TransmissionMaterialExtension](/x_ite/components/x-ite/transmissionmaterialextension/) are used together.
- [x] Fixed a bug in PBR shader when points and lines are rendered without normals.
- [x] Other bug fixes.

## X_ITE v11.4 Series

*Leipzig, 23rd March 2025:* This series comes with a lot of small but important changes and features.

- [x] Improved WOFF2 font files handling.
- [x] New dragging cursor when an X3DDragSensorNode is dragged.
- [x] New [Mute](/x_ite/reference/browser-services/#getbrowseroption-name-string-any) browser option.
- [x] Fixed a issue when an X3DBindableNode receives a *set_bind* `FALSE` event.
- [x] Fixed an issue with viewpoint binding at initialization of world and when the viewpoint has received an additional *set_bind* `TRUE` event.
- [x] The pixel data of a [PixelTexture](/x_ite/components/texturing/pixeltexture/) node are now checked for transparent pixels if necessary, to automatically determine alpha mode of [Appearance](/x_ite/components/shape/appearance/) node.

## X_ITE v11.3 Series

*Leipzig, 9th March 2025:* The scene-graph now optimizes itself automatically depending on what nodes are present. If, for example, a Group node contains only invisible nodes such as TimeSensor or ScalarInterpolator, this group is completely optimized away, of course this has no influence on the animation. Not only nodes that are invisible, but also nodes that do not participate in collision or shadow calculation can now be sorted out. This optimization is dynamic and thorough, everything that does not need to be traversed is removed.

- [x] Scene-graph traversal optimizations for improved performance and efficiency in processing scene graphs, resulting in faster rendering and reduced computation overhead.

## X_ITE v11.2 Series

*Leipzig, 16th February 2025:* With this series there is now extended WebXR support. Use your VR glasses with X_ITE and get immersive.

- [x] Basic visualization of the controller (input ray and tracking point)
- [x] X3DPointingDeviceSensorNode support
- [x] Support for WALK, FLY and EXAMINE viewer via controllers and buttons

You can now click and drag [TouchSensor](/x_ite/components/pointingdevicesensor/touchsensor/) and [PlaneSensor](/x_ite/components/pointingdevicesensor/planesensor/) etc. and also get feedback on your controller.

The WALK, FLY and EXAMINE viewer can now be controlled via the buttons and the thumbstick of the controller(s), conveniently when sitting on the couch. Use a [NavigationInfo](/x_ite/components/navigation/navigationinfo/) node to choose a viewer.

## X_ITE v11.0 Series

*Leipzig, 12th December 2024:* Again, these series fixes some long standing issues. There are also some breaking changes.

- [x] `X3DBrowser.createScene` now returns a Promise.
- [x] `X3DBaseNode.setExecutionContext(null)` always connects to browser.
- [x] Default value of `X3DTextureProjectorNode.upVector` is now `0 1 0`.
- [x] Fixed a bug when parsing strings.

## X_ITE v10.5 Series

*Leipzig, 8th September 2024:* These series fixes some long standing issues.

- [x] Improved rendering of opaque points, especially with [PointSet](/x_ite/components/rendering/pointset/).
- [x] Implemented [NurbsTrimmedSurface](/x_ite/components/nurbs/nurbstrimmedsurface/).
- [x] Increased speed when parsing X3D files.
- [x] Improved rendering of thick lines.
- [x] [StaticGroup](/x_ite/components/grouping/staticgroup/) is now doing extensive optimizations.
- [x] [HAnimSegment](/x_ite/components/hanim/hanimsegment/) now handles displacers.
- [x] glTF Parser: Implemented glTF extension [KHR_animation_pointer](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_animation_pointer/README.md).

## X_ITE v10.4 Series

*Leipzig, 27th August 2024:* With this version of X_ITE we have now implemented render optimizations for StaticGroup nodes. A StaticGroup node will now completely remove all transformations and bake them into the geometry. Furthermore, assuming the Appearance node is exactly the same (cloned) and the geometry nodes are compatible, the geometry nodes will be merged into a single one.

This works very well with all geometry types (point, line, 2D, 3D).

A basic test file is also available. This test file will create 10 static nodes from the previous 22 nodes:

- [x] [StaticGroup](/x_ite/playground/?url=https://create3000.github.io/Library/Tests/Components/Grouping/StaticGroup.x3d)

Another test file using an Inline node with a glTF sample (1.5 million triangles). This test file will create 15 static nodes from the previous 49 nodes:

- [x] [StaticGroup with Inline](/x_ite/playground/?url=https://create3000.github.io/Library/Tests/Components/Grouping/StaticGroupWithInline.x3d)

## X_ITE v10.3 Series

*Leipzig, 18th August 2024:* With this release there is now basic WebXR support built directly into X_ITE. If WebXR is possible then a new button (Cardboard Glasses) appears in the lower right corner of the \<x3d-canvas\>. In addition, there is now a new [attribute](/x_ite/#attributes-of-the-x3d-canvas-element) (*xrSessionMode*) and the corresponding [browser option](/x_ite/reference/browser-services/#browser-options) (*XRSessionMode*).

If you don't have a VR headset, there is a browser extension for Chrome and Firefox that emulates a WebXR device:

- [x] [WebXR Emulator for Chrome](https://chromewebstore.google.com/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje)
- [x] [WebXR Emulator for Firefox](https://addons.mozilla.org/de/firefox/addon/webxr-api-emulator/)

## X_ITE v10.2 Series

*Leipzig, 4th August 2024:* This release comes with the following improvements:

- [x] Implemented KHR_materials_diffuse_transmission as [DiffuseTransmissionMaterialExtension](/x_ite/components/x-ite/diffusetransmissionmaterialextension/) node.
- [x] Implemented KHR_mesh_quantization in glTF parser.
- [x] Tangents are now automatically generated using MikkTSpace algorithm, if not present.

## X_ITE v10.1 Series

*Leipzig, 28th July 2024:* This release comes with a new [browser option](/x_ite/reference/browser-services/#browser-options) `TextCompression` which determines how [Text](/x_ite/components/text/text/).*length* and [Text](/x_ite/components/text/text/).*maxExtent* are handled, i.e. either by adjusting char spacing or by scaling. These are the two options suggested by the X3D specification, and we can now offer both to let the user choose which one they want. The option can be changed programmatically via `setBrowserOption` or via a new attribute of the \<x3d-canvas\> element.

We also noticed two problems with text rendering, particularly with vertical text, where the text did not start or end at the origin. Also *maxExtent* is now implemented as specified by X3D.

## X_ITE v10.0 Series

*Leipzig, 23rd June 2024:* With this release, all glTF material extensions are now available, i.e. when a glTF file is parsed, these extensions are automatically converted to X3D. There is now an X3D node for each glTF extension. These nodes can also be referenced directly in X3D files. Extensions for glTF materials are converted to the new X3DMaterialExtensionNode nodes, which can be used as a child of [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/) node and the new [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) node. These material nodes now have a new field »extensions« for this purpose. The introduction of the »extensions« field has only a minimal impact and leads to the greatest possible compatibility.

To get an idea of what a great difference these new material extensions make, check out our [glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/). Take some time and look through all the examples. I am sure you will be amazed.

### New Browser Options

There are also new [browser options](/x_ite/reference/browser-services/#browser-options) that are especially made for PhysicalMaterial node and SpecularGlossinessMaterial node.

- [x] New browser option Exposure.
- [x] New browser option ToneMapping.

### Implemented glTF Extensions

All glTF extensions implemented with this version are listed below:

#### X3DOneSidedMaterialNode

- [x] KHR_materials_pbrSpecularGlossiness implemented as [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) node.

#### X3DMaterialExtensionNode

- [x] KHR_materials_anisotropy implemented as [AnisotropyMaterialExtension](/x_ite/components/x-ite/anisotropymaterialextension/) node.
- [x] KHR_materials_clearcoat implemented as [ClearcoatMaterialExtension](/x_ite/components/x-ite/clearcoatmaterialextension/) node.
- [x] KHR_materials_dispersion implemented as [DispersionMaterialExtension](/x_ite/components/x-ite/dispersionmaterialextension/) node.
- [x] KHR_materials_emissive_strength implemented as [EmissiveStrengthMaterialExtension](/x_ite/components/x-ite/emissivestrengthmaterialextension/) node.
- [x] KHR_materials_ior implemented as [IORMaterialExtension](/x_ite/components/x-ite/iormaterialextension/) node.
- [x] KHR_materials_iridescence implemented as [IridescenceMaterialExtension](/x_ite/components/x-ite/iridescencematerialextension/) node.
- [x] KHR_materials_sheen implemented as [SheenMaterialExtension](/x_ite/components/x-ite/sheenmaterialextension/) node.
- [x] KHR_materials_specular implemented as [SpecularMaterialExtension](/x_ite/components/x-ite/specularmaterialextension/) node.
- [x] KHR_materials_transmission implemented as [TransmissionMaterialExtension](/x_ite/components/x-ite/transmissionmaterialextension/) node.
- [x] KHR_materials_volume implemented as [VolumeMaterialExtension](/x_ite/components/x-ite/volumematerialextension/) node.

#### Switch

- [x] KHR_materials_variants implemented as [Switch](/x_ite/components/grouping/switch/) node.

## X_ITE v9.5.2 Released

*Leipzig, 28th April 2024:* Progress continues...

The [InstancedShape](/x_ite/components/x-ite/instancedshape/) node can now be used in conjunction with the [HAnimHumanoid](/x_ite/components/hanim/hanimhumanoid/) node and this is now also possible with the [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) node.

I have created two examples here to show the potential of this connection, both of which can be seen in the X_ITE Playground:

- [x] [Open HAnimInstancedShape in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/HAnim/HAnimInstancedShape/HAnimInstancedShape.x3d)
- [x] [Open HAnimParticleSystem in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/HAnim/HAnimParticleSystem/HAnimParticleSystem.x3d)

In addition to these changes, we have added a »damping« field to BoundedPhysicsModel which makes this possible:

- [x] [Open BoundedPhysicsModel in Playground.](/x_ite/playground/?url=https://create3000.github.io/media/examples/ParticleSystems/BoundedPhysicsModel/BoundedPhysicsModel.x3d)

Every time a particle collides with the model, the velocity is multiplied by the damping factor, which now makes it possible to create more realistic simulations.

Also, X_ITE can now parse extremely long strings, which is important when using a data URLs. In addition, the [LineProperties](/x_ite/components/shape/lineproperties/) node can now be used with ParticleSystem, which was not possible before.

In the meantime, further improvements have of course been made, but these are not listed here.

## X_ITE v9.2.0 Released

*Leipzig, 7th January 2024:* This release comes with improved handling of imported nodes, they will now also work inside X3DPrototypeInstance nodes.

### New Features

- [x] Imported nodes also work within protos now.

## X_ITE v9.0.0 Released

*Leipzig, 16th October 2023:* We right now released a new version. Unfortunately, in this release images from [ImageTexture](/x_ite/components/texturing/imagetexture/) and [MovieTexture](/x_ite/components/texturing/movietexture/) are now not flipped at the y-axis anymore, this is now done in the shaders. Custom shaders must be adjusted to reflect these changes. This is a breaking change.

### New Features

- [x] Implemented a KTX texture loader for [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/), [ImageTexture](/x_ite/components/texturing/imagetexture/), and [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/).
- [x] [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/) can now load panorama images.
- [x] Basic implementation of [EnvironmentLight](/x_ite/components/lighting/environmentlight/) node.
- [x] ES module version of X_ITE named »x_ite.mjs«.
- [x] Typescript types for IntelliSense.
- [x] PLY 3d format parser.
- [x] [TextureProjection component](/x_ite/components/overview/#textureprojection) is now working.

## X_ITE v8.10.0 Released

*Leipzig, 17th July 2023:* We right now released a new version.

### New Features

- [x] The component/profile messages in the console from HAnim should be gone now.
- [x] HAnimHumanoid is now GPU accelerated, try high poly objects.
- [x] glTF skin object is now completely translated into HAnimHumanoid even with animations.

With the [glTF Sample Viewer](https://create3000.github.io/x_ite/laboratory/gltf-sample-viewer) you can test glTF and HAnimHumanoid if you like. Files of interest are:

#### glTF Random Models

- [x] Animated Bee (lots of joints)

#### glTF Sample Models

- [x] Brain Stem (high poly)
- [x] Cesium man
- [x] Fox
- [x] Recursive Skeletons (stress test)

## X_ITE v8.7.0 Released

*Leipzig, 14th May 2023:* This release comes with a breaking change: `Browser.createX3DFromString` is now asynchronous and returns now a Promise. This ensures that all components are loaded, and all necessary nodes can be provided.

In addition, there is now an [automated test suite](https://github.com/create3000/x_ite-tests), which is being expanded on a daily basis.

### Breaking Changes

- [x] `Browser.createX3DFromString` now returns a Promise.

## X_ITE v8.5.2 Released

*Leipzig, 28th January 2023:* Now, X_ITE has support for SVG as well as STL support. When a scene is parsed you can, instead of a number use special constants like PI or PI3_4.

### New Features

- [x] Added SVG parser.
- [x] Added STL parser.
- [x] Added GLB parser.
- [x] Parse HTML colors and constants like PI or PI1_3.
- [x] Better GZip support.

### Bug Fixes

- [x] Fixed wireframe shading of thick lines.
- [x] Fixed XML MFString parsing.
- [x] Fixed and optimized NRRD parser.
- [x] Fixed XML output of backslash in strings.

## X_ITE v8.5.0 Released

*Leipzig, 23rd January 2023:* With this new version it is now possible to configure antialiasing. Antialiasing can be turned on/off, multisampling and supersampling can now be configured. Additionally glTF files can now be loaded, either directly as source of the \<x3d-canvas\> element or as source of an Inline node, as well as with API methods. The glTF file is internally converted into X3D and then made available to the scene-graph. Also there is a new node ImageTextureAtlas, which makes it easy to load 3D textures.

### New Features

- [x] Added antialiased attribute.
- [x] Added multisampling attribute.
- [x] Added contentScale attribute.
- [x] New browser options and rendering properties.
- [x] Animated GIF support for MovieTexture.
- [x] Added glTF parser.
- [x] Added Wavefront OBJ parser.
- [x] Implemented ImageTextureAtlas node.

### Bug Fixes

- [x] Fixed X3DViewpointNode.viewAll behavior at initialization of world.

## X_ITE v8.4.0 Released

*Leipzig, 3rd January 2023:* We right now released a new version. With this version toJSONString is implemented and available for X3DScene, SFNode, MFNode, X3DProtoDeclaration, and X3DExternProtoDeclaration.

### New Features

- [x] Implemented toJSONString.

## X_ITE v8.3.3 Released

*Leipzig, 31st December 2022:* We right now released a new version.

### New Features

- [x] Added to*String options (scene, style, precision, doublePrecision).
- [x] Added output styles (CLEAN, SMALL, COMPACT, TIDY).
- [x] Prefer PROTO's during parse.
- [x] Collect joint nodes if no provided (HAnim).
- [x] Relaxed VRML parser (parse top level statements in MFNode).
- [x] XML short syntax of prototype instances.

### Bug Fixes

- [x] Fixed bug when floating point numbers are printed.
- [x] Fixed bug when MFImage is printed.
- [x] Fixed component's highest levels.
- [x] Fixed double count of headlight.

## X_ITE v8.3.0 Released

*Leipzig, 14th December 2022:* We right now released a new version.

### New Features

- [x] Use Phong shading as default for version 4.0.
- [x] Implemented X3DViewpointNode *viewAll, nearDistance, farDistance and navigationInfo*.
- [x] Implemented Inline *global* field.
- [x] Implemented point and line geometry *normal* field.
- [x] Added getNodeTypeName to [SFNode](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfnode-object).
- [x] Added vector constructors to [SFMatrix*](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfmatrix3dsfmatrix3f-object).
- [x] Added [SFRotation](https://create3000.github.io/x_ite/reference/field-services-and-objects#sfrotation-object) matrix handling functions.
- [x] Text component is now loaded on demand.

### Bug Fixes

- [x] Fixed bug with GeoViewpoint flickering when just bound.

## X_ITE v8.1.0 Released

*Leipzig, 1st December 2022:* We now have a new website design.

### Bug Fixes

- [x] Fixed Examine Viewer spin behavior.
- [x] Fixed fading of Splash Screen.

## X_ITE v8.0.0 Released

*Leipzig, 24th November 2022*: We finally released the new version 8.0.0.

### New Features

- [x] Now based on native JavaScript module system.
- [x] X_ITE build is now based on WebPack, and a UMD library is build.
- [x] No more injected \<script\> elements in \<header\> element of page.
- [x] x_ite_dom is now an integral part of X_ITE.

### Bug Fixes

- [x] Fixed X3DNode dispose.

## X_ITE v7.0.0 Released

*Leipzig, 13th November 2022*: We finally released the new version 7.0.0. This version comes with a brand new shader system. The default shaders are now highly specialized and therefor very fast. First tests reveal that the shaders are now 2 up to 3 times faster. But this also means that custom shaders may be broken now, because all x3d_Num* variables are now removed. X3D Authors must now hardcode these values into their shaders, or develop an own system.

### New Features

- [x] New shader system.
- [x] X3DVolumeData node now supports visible and bboxDisplay field.
- [x] GeoViewpoint automatically forces logarithmic depth buffer.
- [x] GeoViewpoint can now handle browser option 'StraightenHorizon'.

### Bug Fixes

- [x] Fixed ComposedShader activate field handling.

## X_ITE v6.1.0 Released

*Leipzig, 24th October 2022*: We finally released the new version 6.1.0.

### New Features

- [x] Implemented picking of thick lines and large points with X3DPointingDeviceSensorNode nodes like TouchSensor.
- [x] Added Shading menu if *debug* attribute is 'true'.

### Bug Fixes

- [x] Fixed Disk2D line case rendering.
- [x] Fixed SFImage.toString.
- [x] Fixed CSS.

## X_ITE v6.0.0 Released

*Leipzig, 19th October 2022*: We finally released the new version 6.0.0.

### New Features

- [x] Introducing x3d-canvas element, using JavaScript User-Element syntax.
- [x] New styles for context menu.
- [x] Full support for LineProperties node.
- [x] ParticleSystems are now GPU accelerated.
- [x] Faster picking and other optimizations.

### Bug Fixes

- [x] Fixed bug that browser stop working suddenly.
- [x] Fixed fatal bug when second browser is created programmatically.

## X_ITE v4.7.7 Released

*Leipzig, 30th January 2022*: This release is primarily a bug fix release, but there are also new features.

### New Features

- [x] Output XML or VRML encoding when viewpoint is copied.
- [x] Added browser option "Timings", but removed attribute.
- [x] Return promise from X3D function.

### Bug Fixes

- [x] Prevent accidental navigation when context menu is closed.
- [x] Fixed copy to clipboard of viewpoint when in fullscreen mode.

## X_ITE v4.7.6 Released

*Leipzig, 23th January 2022*: This release implements the new X3Dv4 UnlitMaterial. This also means that the custom shader interface has changed:

- [x] Depreciated x3d_FrontMaterial in favor of x3d_Material uniform.
- [x] Removed x3d_BackMaterial uniform.
- [x] Removed x3d_Lighting uniform.
- [x] Removed x3d_SeparateBackColors uniform.

### New Features

- [x] Added X3DSingleTextureNode class.
- [x] Added X3DSingleTextureTransformNode class.
- [x] Added X3DSingleTextureCoordinateNode class.
- [x] Added UnlitMaterial class.
- [x] Implemented Appearance *backMaterial* field.

### Bug Fixes

- [x] Fixed bug in aliases handling and proto nodes setup.
- [x] Fixed bug in initialization of TextureTransformMatrix3D.
- [x] Fixed wireframe mode for geometry.
- [x] Optimized POINT shading.

## X_ITE v4.7.3 Released

*Leipzig, 16th January 2022*: This release fixes bugs, and a lot of code clean up has been done.

### New Features

- [x] Parse JSON encoding "#sourceCode" objects.
- [x] Use JavaScript URL objects internally now.

## X_ITE v4.7.2 Released

*Leipzig, 7th January 2022*: This release fixes bugs, and a lot of code clean up has been done.

### New Features

- [x] Changed behavior of FLY viewer.
- [x] Added particle uniforms to line geometry.

### Bug Fixes

- [x] Fixes script url determination.
- [x] Fixed bug when particle systems are used.
- [x] Fixed rendering issue of Gouraud and Phong shader in Safari.
- [x] Reduced compile time of Phong shader.
- [x] Fixed bug in live handling.

## X_ITE v4.7.1 Released

*Leipzig, 19th December 2021*: This release fixed a lot of bugs, but also implements new features. Especially MF* fields can now be used within `for of` loops. X3DBindableNode nodes do work now proper when cloned in multiple layers.

### New Features

- [x] Added layerNode argument to `Browser.changeViewpoint([layerNode,] name)`.
- [x] Implemented Symbol.iterator for MF* fields. This enables `for of` loops.
- [x] Improved X3DBindableNode handling when cloned in multiple layers.

### Bug Fixes

- [x] Abort loading if loadURL is called more than once.
- [x] Fixed load count handling.
- [x] Fixed LOD.
- [x] Fixed call outstanding events of inputOutput's of Script node when initialized.
- [x] Preload line shader when WALK/FLY viewer becomes active.
- [x] Prevent bug in Firefox that event loop is broken when pressing special keys. (#86)
- [x] Display submenus of context menu on left side if there is no space on right side. (#86)
- [x] Fixed fatal bug in OrthoViewpoint (#84).
- [x] Fixed bugs in RigidBodyPhysics when nodes are changed.

## X_ITE v4.7.0 Released

*Leipzig, 5th December 2021*: This release implements some of the new X3Dv4 Features. X3Dv4 Draft is available at <https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/Architecture.html>.

This release also increased pure rendering speed (without routing and scripting) of up to 30%, that is a huge amount, especially when there are many nodes (300 and more).

### New Features

- [x] Added X3DLightNode *shadows* field.
- [x] Updated range of X3DLightNode *intensity* field.
- [x] Added X3DShapeNode *castShadow* field.
- [x] Added Appearance *alphaMode* and *alphaCutoff* field.
- [x] Added X3DBoundedBox *visible* and X3DBoundedBox *bboxDisplay* field.
- [x] Updated access type of WorldInfo *title* and *info* field to match X3Dv4.
- [x] Add context menu "Show World Info" menu item, if an WorldInfo node exists.

### Bug Fixes

- [x] Changed Extrusion SCPyAxis calculation.

## X_ITE v4.6.24 Released

*Leipzig, 12th November 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Fixed TransformSensor handling.
- [x] Fixed X3DBindableNode handling when child of a Switch or LOD node.

## X_ITE v4.6.23 Released

*Leipzig, 31st October 2021*: Updated dependencies and reduced file size a tiny bit and X3DExecutionContext.updateImportedNode only updated the node associated with imported name, this enables X_ITE to import a node twice.

## X_ITE v4.6.22 Released

*Leipzig, 2nd July 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Changed ComposedCubMapTexture field names.
- [x] Modified finiteRotationAxis default value.
- [x] Improved loading of X3DBackgroundNode nodes and ComposedCubeMap nodes.

## X_ITE v4.6.21 Released

*Leipzig, 30th June 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Hide Shape node of GeneratedCubeMapTexture when generating texture itself.

## X_ITE v4.6.20 Released

*Leipzig, 15th June 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Fixed bug in X3DBrowser.importDocument and X3DBrowser.importJS.

## X_ITE v4.6.19 Released

*Leipzig, 27th May 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Fixed handling of negative radius values in Disk2D.
- [x] Fixed handling of caps of Extrusion in rare cases.
- [x] Use negated normal for back faces in TextureCoordinateGenerator.

## X_ITE v4.6.18 Released

*Leipzig, 13th April 2021*: This release is a bug fix release.

### Bug Fixes

- [x] Fixed bug with pointing device when padding is applied to X3DCanvas.

## X_ITE v4.6.17 Released

*Leipzig, 22nd December 2020*: This release is a bug fix release. It fixed a minor bug in X3DViewpointNode when the viewpoint is animated.

### Bug Fixes

- [x] Fixed a bug in X3DViewpointNode when the viewpoint is animated.

## X_ITE v4.6.15 Released

*Leipzig, 24th October 2020*: This release fixes a bug with OrthoViewpoint which has encountered in the last release, and some other bugs.

### Bug Fixes and Enhancements

- [x] Fixed OrthoViewpoint.
- [x] Fixed Layout component level.
- [x] Fixed shader select.
- [x] Implemented shader _activate_ field.

## X_ITE v4.6.14 Released

*Leipzig, 24th October 2020*: This release fixes some subtle bug in XML parser when parsing fieldValue element of proto instance.

### Bug Fixes and Enhancements

- [x] Fixed XML parser parse MFNode fieldValue element.

## X_ITE v4.6.12 Released

*Leipzig, 15th October 2020*: With this release we could fix a lot of small but critical bugs and also had some optimizations for you and better support for macOS.

### Bug Fixes and Enhancements

- [x] Better control of navigation with mouse and trackpad on macOS and tablet devices.
- [x] Fixed examine viewer rotation when multiple layer with viewport are present.
- [x] Emulate middle mouse button when pressing <kbd>Alt-or-Option</kbd> key.
- [x] Fixed bug in IndexedTriangleFanSet.
- [x] Updated Shape component to level 5.
- [x] Fix bug in rotation axis/angle calculation.
- [x] Very small optimization of transparent shapes.
- [x] Reworked bindable nodes bind handling.

## X_ITE v4.6.11 Released

*Leipzig, 22nd August 2020*: With this release we introduce our new web site, it is now hosted on GitHub and has a clean and slick layout now. We also moved the code hosting to create3000.github.io, so make sure to update your X_ITE urls for CSS and JavaScript.

### Bug Fixes

- [x] Updated dependencies.
- [x] Fixed bug with Geometry2D in Safari.
- [x] Fixed Background rendering on iOS Safari.
- [x] Fixed bug with sound loading on iOS Safari.

## X_ITE v4.6.10 Released

*Leipzig, 21st March 2020*: This is primarily a bug fix release.

### Bug Fixes

- [x] Fixed CSS.

## X_ITE v4.6.9 Released

*Leipzig, 30th November 2019*: Fixed bugs.

### Bug Fixes

- [x] Added missing fields for HTML/DOM support.
- [x] Fixed projective texture mapping in conjunction with generated cube map.

## X_ITE v4.6.8 Released

*Leipzig, 20th November 2019*: With this version we implement the TextureProjectorParallel and TextureProjectorPerspective node, from the upcoming X3D V4 standard, which will be available next year. We also have now better hardware support, we made *maxLights* and *maxTextures* dynamic, depending on the hardware of the user's system, this gives better support of older hardware and mobile systems.

### New Features

- [x] Implemented TextureProjectorParallel.
- [x] Implemented TextureProjectorPerspective.

### Bug Fixes

- [x] Fixed special case in TimeSensor when *cycleInterval* is 0.

## X_ITE v4.6.7 Released

*Leipzig, 10th November 2019*: With this version we implement the PointProperties node, the first node from the upcoming X3D V4 standard, which will be available next year.

### New Features

- [x] Implemented PointProperties node.

## X_ITE v4.6.6 Released

*Leipzig, 4th November 2019*: This is primarily a bug fix release.

### Bug Fixes

- [x] Fixed texture 3d orientation.

## X_ITE v4.6.4 Released

*Leipzig, 2nd November 2019*: This is primarily a bug fix release.

### New Features

- [x] Updated external library dependencies.
- [x] Improved Gouraud and Phong shader.
- [x] Implemented DICOM image parser for ImageTexture3D.
- [x] Support for X3DTexture3DNode in OpacityMapVolumeStyle node's *transferFunction* field.
- [x] Implemented Script node *shutdown* function.

### Bug Fixes

- [x] Fixed bug in Script node in rare cases.

## X_ITE v4.6.3 Released

*Leipzig, 26th October 2019*: This is primarily a bug fix release.

### New Features

- [x] Support for NRRD types signed/unsigned byte, signed/unsigned short, signed/unsigned int, float, and double.
- [x] Implemented NRRD ASCII, RAW, HEX, and GZIP encoding.

### Bug Fixes

- [x] Fixed CylinderSensor minAngle/maxAngle handling.
- [x] Fixed wrong SilhouetteEnhancementVolumeStyle rendering in rare cases.
- [x] Fixed wrong BoundaryEnhancementVolumeStyle rendering.
- [x] Fixed Background rendering on mobile devices.

## X_ITE v4.6.2 Released

*Leipzig, 20th October 2019*: With this release we implement full support for VolumeRendering component and full support for Texturing3D component, i.e. we switch to WebGL 2 with this release, if available.

### New Features

- [x] Basic support for VolumeRendering component.
- [x] Full support for Texturing3D component.

### Bug Fixes

- [x] Fixed missing Browser properties *supportedProfiles* and *supportedComponents*.
- [x] Optimized NURBS weight handling when no weights present.
- [x] Fixed bug in TextureTransformMatrix3D.
- [x] Fixed double load of URL in some cases of X3DUrlObject nodes.

## X_ITE v4.5.14 Released

*Leipzig, 5th October 2019*: This is primarily a bug fix release.

### Bug Fixes

- [x] Better NURBS normals.
- [x] Fixed X3DNurbsSurfaceGeometryNode *closed* field handling.
- [x] Fix NURBS *weight* field handling.

## X_ITE v4.5.12 Released

*Leipzig, 23rd September 2019*: This is primarily a bug fix release.

### Bug Fixes

- [x] Fixed bug in Matrix transpose.
- [x] Better parser errors when node type is not known.

## X_ITE v4.5.10 Released

*Leipzig, 17th July 2019*: This is primarily a bug fix release.

### Bug Fixes

- [x] Fixed sound rendering.

## X_ITE v4.5.9 Released

*Leipzig, 10th July 2019*: This is primarily a bug fix release.

### Bug Fixes

- [x] Fixed bug with browser event handler, for instance »onload«, if jQuery is present.
- [x] Fixed bug with FogCoordinate calculation handling.

## X_ITE v4.5.8 Released

*Leipzig, 3rd July 2019*: Fixed some bugs.

### Bug Fixes

- [x] Fixed bug when parsing Classic VRML Encoded files.

## X_ITE v4.5.7 Released

*Leipzig, 26th June 2019*: We could again fix some bugs which will make X_ITE again more stable. Additionally we removed the non-standard fields from AudioClip and MovieTexture, they are now fully specification conform.

### New Features

- [x] Updated splash screen.

### Bug Fixes

- [x] Fixed TimeSensor wrong *cycleTime* event at startup.
- [x] Fixed BrowserTimings button type.
- [x] Removed non-standard fields from X3DSoundSourceNode nodes.
- [x] Fixed geometry nodes index fields access type.

## X_ITE v4.5.6 Released

*Leipzig, 19th June 2019*: We could optimize CoordinateChaser/Damper and TexCoordChaser2D/Damper2D, which runs now significantly faster.

### New Features

- [x] Optimized CoordinateChaser/Damper and TexCoordChaser2D/Damper2D.

### Bug Fixes

- [x] Fixed bug in TimeSensor *fraction\_changed* calculation if *loop* is true.

## X_ITE v4.5.4 Released

*Leipzig, 9th June 2019:* We could fix some minor bugs.

### New Features

- [x] Added MFNode.toVRML/XMLString.

### Bug Fixes

- [x] Fixed sound playing when Browser.endUpdate was called.
- [x] Fixed Switch node when children are changed.
- [x] Fixed a bug with Inline nodes in conjunction with DOM integration.

## X_ITE v4.5.1 Released

*Leipzig, 20th April 2019:* Although not enable, we are still using WebGL 1 in the official releases, X_ITE is now prepared for WebGL 2. If WebGL 2 becomes more popular we will enabled it, if available, then WebGL 2 is selected, otherwise WebGL 1 to make X_ITE compatible to older browsers.

## X_ITE v4.5.0 Released

*Leipzig, 14th April 2019:* With this version we implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate and also FillProperties is now working.

### New Features

- [x] Implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate.
- [x] Implemented FillProperties.
- [x] Faster startup of browser.
- [x] Better transitions with OrthoViewpoint.

### Bug Fixes

- [x] Fix bug in browser options when switching texture quality.
- [x] Fixed picking and Layout node.
- [x] Fixed bug with composite glyphs in Text node.
- [x] Fixed bug with data URLs.
- [x] Fixed bug in toXMLString and toVRMLString when outputting protos.

## X_ITE v4.4.7 Released

*Leipzig, 3rd April 2019:* This version comes with a fresh implementation of the TextureCoordinateGenerator node and we could make the VisibilitySensor more precise.

### New Features

- [x] Implemented TextureCoordinateGenerator.
- [x] More precise VisibilitySensor.

## X_ITE v4.4.6 Released

*Leipzig, 25th March 2019:* This version comes with the first nodes from the Picking component. We implemented LinePickSensor, PickableGroup, PointPickSensor, PrimitivePickSensor, and VolumePickSensor, which are fully implemented.

### New Features

- [x] Implemented Picking component.

## X_ITE v4.4.5 Released

### Bug Fixes

- [x] Fixed bug in LOD traverse.

## X_ITE v4.4.4 Released

*Leipzig, 18th March 2019:* We finally implemented *toVRMLString* for SFNode, X3DProtoDeclaration, X3DExternProtoDeclaration, and X3DScene. There is a new X3DCanvas attribute *preserveDrawingBuffer,* set this to true if you want to save the image from the canvas.

### New Features

- [x] Implemented toVRMLString.
- [x] New X3DCanvas attribute *preserveDrawingBuffer*.

### Bug Fixes

- [x] Fixed bug in toXMLString of X3DScene.
- [x] Fixed bug when parsing SFMatrix3d/f values.
- [x] Fixed bug when parsing data URLs.
- [x] Fixed shadow handling.
- [x] Fixed bug in MF* fields pop and shift.

## X_ITE v4.4.3 Released

*Leipzig, 11th March 2019:* Fixed a bug in BlendMode and there is a new page where you can online edit the BlendMode.

### Bug Fixes

- [x] Fixed bug in BlendMode.

## X_ITE v4.4.2 Released

*Leipzig, 24th February 2019:* We could fix some small bugs and now the TransformSensor is fully implemented. The version number is now displayed in the Context Menu.

### New Features

- [x] Show version number in context menu.
- [x] Fully implemented TransformSensor.
- [x] Optimized proto instance creation, especially when you use proto instances within another proto.
- [x] Small improvements.

### Bug Fixes

- [x] Fixed GeoLOD when a ProximitySensor or Viewpoint is in the root node or children.
- [x] Fixed fatal bug in IndexedFaceSet if there are degenerated polygons.

## X_ITE v4.4.1 Released

*Leipzig, 24th February 2019:* Fixed some small bugs.

### Bug Fixes

- [x] Fixed Browser.createX3DFromString console output.
- [x] Fixed X3DExternProtoDeclaration, X3DProtoDeclaration, X3DRoute toString output.
- [x] Fixed H-Anim units.

## X_ITE v4.4.0 Released

*Leipzig, 4th February 2019:* Small bug fixes and small optimizations makes this version as stable as ever before. We also could now implement the FogCoordinate node.

### New Features

- [x] Implemented FogCoordinate.

### Bug Fixes

- [x] Pass current time stamp to Script.prepareEvents function.
- [x] X3DConstants have now browser event constants for browser callbacks.

## X_ITE v4.2.17 Released

*Leipzig, 26th January 2019:* With this version we release the first version of the H-Anim component. The H-Anim component is automatically included when a profile or component statement matches »H-Anim«.

### New Features

- [x] Implemented »H-Anim« component.

## X_ITE v4.2.16 Released

*Leipzig, 16th January 2019:* With this version we release the first version of the NURBS component. The NURBS component is automatically included when a profile or component statement matches »NURBS«.

### New Features

- [x] Implemented »NURBS« component.

## X_ITE v4.2.15 Released

*Leipzig, 23th December 2018:* Beside OrthoViewpoint node, the Layout node is now able to handle Viewpoint node and GeoViewpoint node and we could fix again some bugs.

### Bug Fixes

- [x] Implemented Layout for Viewpoint and GeoViewpoint.
- [x] Fixed Browser.getRenderingProperty.
- [x] Fixed logarithmic depth buffer handling.
- [x] Fixed bug in ECMAScript SFVec2/3d handling.
- [x] Fixed bug in XML generator when generating nodes.
- [x] Fixed bug with audio/video playback when url changes.

## X_ITE v4.2.14 Released

*Leipzig, 16th December 2018:* This version implements the StringSensor from the KeyDeviceSensor component and we found a really phat bug in X3DComposedGeometryNode normal generation, which affects TriangleSet, IndexedTriangleSet, QuadSet, and so on. We also tested X_ITE against <https://x3dgraphics.com/examples/X3dForWebAuthors/index.html> and fixed all bugs found.

### New Features

- [x] Implemented StringSensor

### Bug Fixes

- [x] Fixed X3DKeyDeviceSensorNode.enabled field handling.
- [x] Fixed bug with KeySensor.isActive.
- [x] Fixed bug in X3DComposedGeometryNode normal generation.
- [x] Fog.visibilityRange is now affected by scaling.
- [x] SpotLight.radius and PointLight.radius are now affected by scaling.

## X_ITE v4.2.13 Released

*Leipzig, 6th December 2018:* SFVec2f/d, SFVec3f/d, SFVec4f/d have now new functions. These are multVec, divVec, distance, and lerp. Have a look at:

- [x] SFVec2f/d Object
- [x] SFVec3f/d Object
- [x] SFVec4f/d Object

for more information. Additionally we tested X_ITE against <https://www.web3d.org/x3d/content/examples/Basic/index.html> and fixed the bugs we found.

### New Features

- [x] Added new vector functions to SFVec2f/d, SFVec3f/d, SFVec4f/d.

### Bug Fixes

- [x] Fixed progress bar CSS in some cases.
- [x] Fixed X3DBackground rendering if a GeoViewpoint is bound.

## X_ITE v4.2.12 Released

*Leipzig, 4th December 2018:* Fixed a bugs in Text node and BrowserOptions.

### Bug Fixes

- [x] Fixed fatal bug in Text node when vertical text is rendered with empty lines.
- [x] Fixed bug in Text.lineBounds when vertical text is rendered with empty lines.
- [x] Fixed wrong initialization of BrowserOptions.

## X_ITE v4.2.11 Released

*Leipzig, 29th November 2018:* Fixed some bugs.

### New Features

- [x] Small optimizations

### Bug Fixes

- [x] Fixed a bug in event handling.
- [x] Fixed a bug in GeoLOD.
- [x] Fixed fatal bug in ImageCubeMapTexture.

## X_ITE v4.2.10 Released

*Leipzig, 13th November 2018:* We tested X_ITE against <https://www.web3d.org/x3d/content/ConformanceNist/index.html> and fixed the bugs we found.

### Bug Fixes

- [x] Fixed LOD level calculation when range is empty.
- [x] Fixed LocalFog calculation.
- [x] Fixed fog calculation when visibilityRange is 0.
- [x] Disable collision detection when viewpoint transition is active.
- [x] Use specified precision for default struct types in shader source.

## X_ITE v4.2.9 Released

### Bug Fixes

- [x] Switch sounds off when not visible.
- [x] Fixed fatal bug when setting audio/video volume.
- [x] Fixed Sound node volume calculation.
- [x] Better interpolation from saturated color to black, white, or gray.

## X_ITE v4.2.8 Released

*Leipzig, 31th October 2018:* The X3DCanvas element has now the onload, onshutdown, and *onerror* attributes and properties. There is also jQuery support for these event handler when calling jQuery.fn.on and jQuery.fn.off:

```js
const element = $("X3DCanvas");
element .on ("load", function () { console .log ("load, yeah"); });
```

### New Features

- [x] The X3DCanvas element has now the onload, onshutdown, and *onerror* attributes with jQuery support.
- [x] The X3DCanvas element has now the onload, onshutdown, onerror, src, and url properties.
- [x] X_ITE now respects the tabindex setting from the X3DCanvas element.

### Bug Fixes

- [x] Fixed bug in Extrusion orientation handling.
- [x] Better support for Extrusion with coincident spine points.

## X_ITE v4.2.7 Released

*Leipzig, 29th October 2018:* This version fixes some important bugs and makes X_ITE more specification conform.

### Bug Fixes

- [x] Fixed a bug in proto instances loaded from extern prototypes.
- [x] Also parse and output XML IMPORT attribute importedDEF beside old attribute exportedDEF.
- [x] ScreenGroup and ScreenFontStyle are now respecting a scaleOrientation in the transformation hierarchy.
- [x] Fixed normal calculation of bounding boxes, it handles now special cases.

## X_ITE v4.2.6 Released

*Leipzig, 14th October 2018:* With this version, X_ITE includes a new polygon tessellator, i.e. X_ITE can better render concave polygons witch also affects polygon font support, which is now even better.

### New Features

- [x] Better polygon support for concave polygons.
- [x] Better polygon font rendering.
- [x] »Straighten Horizon« is now the default for EXAMINE viewer.

### Bug Fixes

- [x] Fixed bug when parsing XML field values.
- [x] Fixed SFRotation handling of un-normalized values.

## X_ITE v4.2.5 Released

*Leipzig, 1st October 2018:* This version fixes loads of bugs and added loads of small Features.

### New Features

- [x] Added »Straighten Horizon« option to context menu when EXAMINE viewer is active.
- [x] Optimized XML parser, it is now up to 60 % faster especially for large geometries.
- [x] Implemented BrowserOption »EnableInlineViewpoints«.
- [x] Published X3DField.add/removeFieldCallback functions.
- [x] Implemented X3DBrowser.add/removeBrowserCallback functions.
- [x] Changed X3DCanvas element focus handling, the element itself is now the focus element.
- [x] New and optimized resize handling of X3DCanvas element.

### Bug Fixes

- [x] Fixed bug of XML output of proto with cloned root nodes.
- [x] Fixed bug when parsing JSON encoded files containing script source code.
- [x] Fixed handling of VRML viewpoints.
- [x] Fixed event breaking rules for script execution.
- [x] Fixed CSS menu handling.
- [x] Fixed access type of *index* field of IndexedTriangleFanSet, IndexedTriangleSet, IndexedTriangleStripSet.
- [x] Fixed bug in proto instance initialization when extern proto is not yet loaded.
- [x] Fixed rendering of PointSet with GeoCoordinate.
- [x] Fixed KeyDeviceSensor in some cases.
- [x] Fixed spinning of viewpoint carries over after viewpoint change.

## X_ITE v4.2.4 Released

*Leipzig, 9th July 2018:* This version is primarily a bug fix version. There are also new examples online for ScalarChaser, and IndexedTriangleFanSet.

### Bug Fixes

- [x] Fixed fatal bug in X3DProgrammableShaderObject.
- [x] Small optimizations in X3DField objects.

## X_ITE v4.2.3 Released

*Leipzig, 7th July 2018:* This version is primarily a bug fix version. There are also new examples online for PointSet, and IndexedLineSet.

### Bug Fixes

- [x] Fixed bug in PROTO setup.
- [x] Small optimizations in X3DArrayField.
- [x] Small optimizations in event handling.
- [x] Fixed bug in name handling when copy node.

## X_ITE v4.2.2 Released

*Leipzig, 23th June 2018:* We are proud to announce that code.create3000.de is now accessible via https.

### New Features

- [x] code.create3000.de is now accessible via https

## X_ITE v4.2.1 Released

*Leipzig, 17th June 2018:* This version is primarily a bug fix version.

### Bug Fixes

- [x] A real depth buffer is now used in shadow calculations.
- [x] Fixed Chrome glitches of X3DBackground node.
- [x] Fixed CSS issue.
- [x] Fixed ImageTexture issue when the texture is reused multiple times.

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

- [x] Fixed fatal bug in Classic VRML parser.
- [x] Fixed LOD.level\_changed event handling.
- [x] Fixed bug when rendering opaque objects.

## X_ITE v4.1.6 Released

*Leipzig, 24th May 2018:* Thank's to Ammo (Bullet) physics engine we have implemented a lot of new nodes of the RigidBodyPhysics component. Most of the documentation pages of this component have a live example for this node. The component is realized as plug-in which can be include right after the X_ITE.js script tag.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/x_ite.css"/>
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/x_ite.min.js"></script>
<!-- Include the following plug-ins if you wish support for this component -->
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.1.6/dist/rigid-body-physics.min.js"></script>
```

### New Features

- [x] RigidBodyPhysics component

## X_ITE v4.1.5 Released

*Leipzig, 14th March 2018:* We finally released version 4.1.5 now. With this version it is now possible to load X3D JSON encoded files. We implemented touch device support for all viewers and nodes derived form X3DPointingDeviceSensorNode and Anchor. This means tablets and smart phones are now fully supported. There are also a lot of other bug fixes.

### New Features

- [x] JSON file loader
- [x] Touch device support for all Viewers and TouchSensor nodes
- [x] Smoother navigation in Examine Viewer and other viewer
- [x] Optimizations in IndexedQuadSet and QuadSet
- [x] Optimized CoordinateInterpolator, NormalInterpolator, and CoordinateInterpolator2D
- [x] Support for more textures for custom shaders
- [x] New »StraightenHorizon« browser option
- [x] Better rendering of Text in some cases

### Bug Fixes

- [x] Less memory footprint
- [x] Fixed IndexedTriangleSet attribute handling
- [x] and more bug fixes

## X_ITE v4.1.4 Released

*Leipzig, 11th January 2018:* We finally released version 4.1.4 now. X_ITE has become a huge change in the shader specification. It is now even more like GLSL. There are new uniform variables *x3d\_LightSourceParameters, x3d\_MaterialParameters,* and *x3d\_FogParameters.* Old shaders are fully compatible with this version, although old shader light and material uniforms are deprecated. For more information have a look at <custom-shaders>.

## X_ITE v4.1.3 Released

*Leipzig, 25th December 2017:* There is now the new BlendMode node in X_ITE available, which gives X3D authors the ability to specify the WebGL blend modes for a node. The node is an X3DAppearance child node and can be assigned the the new *blendMode* field of a Appearance node. Shader authors have now more control over particle systems, there are three new build in variables available in shaders: *x3d\_ParticleId, x3d\_ParticleLife, x3d\_ParticleElapsedTime, x3d\_ParticlePosition.* For more information have a look at <custom-shaders>.

## X_ITE v4.1.2 Released

*Leipzig, 8th December 2017:* Titania supports now the whole ParticleSystem component with the default graphics card driver Nouveau. During the implementation we found some optimization to speed up the ParticleSystem node in X_ITE. Additionally we could fix three bug.

### New Features Bug Fixes

- [x] Small optimizations Bug Fixes in ParticleSystem node.
- [x] Added x3d\_CameraSpaceMatrix to ComposedShader build-in variables.
- [x] Fixed a bug in X3DBackground node when displayed with GeneratedCubeMapTexture node.
- [x] Fixed fatal bug in MFImage.

## X_ITE v4.1.1 Released

*Leipzig, 23rd November 2017:* We fixed a bug in load count handling of the splash screen, i.e. if the *splashScreen* attribute of the X3DCanvas element is true, the scene is first displayed if all objects and textures are completely loaded. An examination of the source code has revealed this mistake in the networking nodes.

### New Features Bug Fixes

- [x] Fixed a bug in load count handling of the splash screen

## X_ITE v4.1.0 Released

*Leipzig, 22nd November 2017:* This completely implements the unit statement. Now units are parsed and all field values are converted. Additionally we could optimize X3DGroupingNode.removeChildren. It is now up to 20 % faster, especially if there are many children.

### New Features Bug Fixes

- [x] Fixed bug in CADLayer.addChildren
- [x] Optimized X3DGroupingNode.removeChildren
- [x] Implemented units handling

## Cobweb is now X_ITE

*Leipzig, 23rd August 2017:* Cobweb is now **X_ITE.** We changed its name to X_ITE to better reflect the purpose and design of X3D. Though the project's name may have changed, its programming still includes correctness, usability, flexibility, extensibility, and safety.

X_ITE is now available from our own server at code.create3000.de. Just include the following URL's into your HTML and you are up to date again:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.0.7/dist/x_ite.css"/>
<script src="https://cdn.jsdelivr.net/gh/create3000/x_ite@4.0.7/dist/x_ite.min.js"></script>
```

Additionally X_ITE is now available via GitHub CDN and jsDelivr CDN.

### New Features Bug Fixes

- [x] Better font support for polygon text.
- [x] Fixed fog rendering with Gouraud shading in some cases.
- [x] If for any reason Phong shading is not available Gouraud shading is used instead.
- [x] Better mouse wheel reaction in walk viewer.
- [x] The X3DCanvas element can now be styled in IE, this is important if the fallback is visible.
- [x] Fixed font kerning in some cases.
- [x] X3D functions for external browser are now called when scenes are loaded.
- [x] Fixed bug in normalizeVelocity if keyVelocity is 0. See SplineScalarInterpolator.
- [x] Fixed bug with LoadSensor if an X3DUrlObject is created from Script.
- [x] Fixed event processing from ShaderPart url field.
- [x] Fixed BooleanFilter inputFalse output.
- [x] Fixed fog calculation if visibilityRange is 0.
- [x] Changed handling of fallback css attribute display.
- [x] Package is now available via code.create3000.de and jsDelivr.
- [x] npm is now the package management system.

## Cobweb 3.3 Released

*Leipzig, 15th August 2017:* Accessing the external browser has changed a little. The *elements* callback has been removed from the arguments of the callback functions, which are passed to the X3D function. See Accessing the External Browser for further details.

There are new URL's for cobweb.min.js and cobweb.css. Use the following locations now.

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.css"/>
<script src="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.min.js"></script>
```

### New Features Bug Fixes

- [x] Changed external browser access.
- [x] Fixed default values of certain nodes (IntegerTrigger, ArcClose2D, Disk2D, Rectangle2D, TriangleSet2D, GeoViewpoint, DirectionalLight, Viewpoint, ConeEmitter, CylinderSensor).
- [x] X3DCanvas is now transparent on startup until browser is initialized.
- [x] Enable propagate events to HTML browser if in NONE viewer.
- [x] X3DExecutionContext.getImportedNode operates now correct if importedName is undefined.
- [x] SFBool.valueOf return now a native JavaScript value.

## Cobweb 3.2 Released

*Leipzig, 29th April 2017:* The X3DCanvas element becomes a major change in its CSS styles, it is now similar to the HTML5 canvas element a display *inline-block* element instead of *block* with a default width and height of 300 × 150 pixels. Additionally there are four new attributes *splashScreen, notifications, timings,* and *contextMenu*, these attribute are especially useful if the X3DCanvas element is very small. Have a look at »Attributes of the X3DCanvas Element« to see how these attributes work. Additionally we changed the data type mapping of SF/MFRotation in custom shaders from *uniform vec4* quaternion representation to *uniform mat3* 3×3 rotation matrix representation, which are easier to operate with.

### New Features Bug Fixes

- [x] Changed default CSS style display of X3DCanvas element to *inline-block.*
- [x] Changed default width and height of X3DCanvas element to 300 × 150 pixels.
- [x] Added new X3DCanvas attributes *splashScreen,* notifications, timings, contextMenu.
- [x] Implemented JavaScript browser option *SplashScreen.*
- [x] Implemented SFColorRGBA.prototype.set/getHSVA.
- [x] Use *uniform mat3* in custom shaders for SF/MFRotation fields.

## Cobweb 3.1 Released

*Leipzig, 13th April 2017:* We finally released version 3.1 now. This release is a bug fix release and fixes a fatal bug with shader uniform handling. Thanks to Sgeo. Externprotos have now the missing loadNow function implemented, although this function is normally not needed.

## Cobweb 3.0 Released

*Leipzig, 12th April 2017:* We finally released version 3.0 now. All fields derived from X3DArrayField have now two new functions *»push«* and *»unshift«* which operate like the corresponding JavaScript Array functions. All fields derived from X3DField have now a new function *»equals«* which makes it easy to compare two field values. The XMLParser was reworked and is now more secure and several issues are fixed. And last but not least we are proud to announce that prototypes do completely work now with XHTML DOM Integration.

![Mountains Shader Example](https://create3000.github.io/media/images/mountains.jpg)

<small>New Shader Example »Mountains«</small>

### New Features Bug Fixes

- [x] New shader uniform x3d\_ViewportPrototypes do completely work now with DOM Integration.
- [x] Implemented X3DArrayField push and unshift
- [x] Implemented X3DField equals
- [x] Reworked XMLParser
- [x] Fixed ScreenFontStyle text picking
- [x] Fixed issue with touch sensibility of Disk2D
- [x] Fixed an issue of X3DPrototypeInstance in toXMLString

## First Version

The first version of X_ITE was created in April 2015. It was still called Cobweb.
