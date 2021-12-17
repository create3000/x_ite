X\_ITE v4.7.0 Released
=======================

*Leipzig, 5th December 2021*: This release implements some of the new X3Dv4 features. X3Dv4 Draft is available at <https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/Architecture.html>.

This release also increased pure rendering speed (without routing and scripting) of up to 30%, that is a huge amount, especially when there are many nodes (300 and more).
{% capture notice-text %}
New Features
--------------------------

- Added X3DLightNode.shadows field.
- Updated range of X3DLightNode.intensity.
- Added X3DShapeNode.castShadow field.
- Added Appearance.alphaMode and Apprearance.alphaCutoff field.
- Added X3DBoundedBox.visible and X3DBoundedBox.bboxDisplay field.
- Updated access type of WorldInfo.title and WorldInfo.info field to match X3Dv4.
- Add context menu "Show World Info" menu item, if an WorldInfo node exists.
{% endcapture %}
<div class="notice--info">{{ notice-text | markdownify }}</div>

{% capture notice-text %}
Bug fixes
--------------------------

- Changed Extrusion SCPyAxis calculation.
{% endcapture %}
<div class="notice--info">{{ notice-text | markdownify }}</div>

X\_ITE v4.6.24 Released
=======================

*Leipzig, 12th November 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Fixed TransformSensor handling.
- Fixed X3DBindableNode handling when child of a Switch or LOD node.

X\_ITE v4.6.23 Released
=======================

*Leipzig, 31st October 2021*: Updated dependencies and reduced file size a tiny bit and X3DExecutionContext.updateImportedNode only updated the node associated with imported name, this enables X_ITE to import a node twice.

X\_ITE v4.6.22 Released
=======================

*Leipzig, 2nd July 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Changed ComposedCubMapTexture field names.
- Modified finiteRotationAxis default value.
- Improved loading of X3DBackgroundNode nodes and ComposedCubeMap nodes.

X\_ITE v4.6.21 Released
=======================

*Leipzig, 30th June 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Hide Shape node of GeneratedCubeMapTexture when generating texture itself.

X\_ITE v4.6.20 Released
=======================

*Leipzig, 15th June 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Fixed bug in X3DBrowser.importDocument and X3DBrowser.importJS.

X\_ITE v4.6.19 Released
=======================

*Leipzig, 27th May 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Fixed handling of negative radius values in Disk2D.
- Fixed handling of caps of Extrusion in rare cases.
- Use negated normal for back faces in TextureCoordinateGenerator.

X\_ITE v4.6.18 Released
=======================

*Leipzig, 13th April 2021*: This release is a bug fix release.

Bug fixes
--------------------------

- Fixed bug with pointing device when padding is applied to X3DCanvas.

X\_ITE v4.6.17 Released
=======================

*Leipzig, 22nd December 2020*: This release is a bug fix release. It fixed a minor bug in X3DViewpointNode when the viewpoint is animated.

Bug fixes
--------------------------

- Fixed a bug in X3DViepointNode when the viewpoint is animated.

X\_ITE v4.6.15 Released
=======================

*Leipzig, 24th October 2020*: This release fixes a bug with OrthoViewpoint which has encountered in the last release, and some other bugs.

Bug fixes and enhancements
--------------------------

- Fixed OrthoViewpoint.
- Fixed Layout component level.
- Fixed shader select.
- Implemented shader _activate_ field.

X\_ITE v4.6.14 Released
=======================

*Leipzig, 24th October 2020*: This release fixes some subtle bug in XML parser when parsing fieldValue element of proto instance.

Bug fixes and enhancements
--------------------------

- Fixed XML parser parse MFNode fieldValue element.

X\_ITE v4.6.12 released
=======================

*Leipzig, 15th October 2020*: With this release we could fix a lot of small but critical bugs and also had some optimizations for you and better support for macOS.

Bug fixes and enhancements
--------------------------

- Better control of navigation with mouse and trackpad on macOS and tablet devices.
- Fixed examine viewer rotation when multiple layer with viewport are present.
- Emulate middle mouse button when pressing Alt/Option key.
- Fixed bug in IndexedTriangleFanSet.
- Updated Shape component to level 5.
- Fix bug in rotation axis/angle calculation.
- Very small optimization of transparent shapes.
- Reworked bindable nodes bind handling.

X\_ITE v4.6.11 released
=======================

*Leipzig, 22nd August 2020*: With this release we introduce our new web site, it is now hosted on GitHub and has a clean and slick layout now. We also moved the code hosting to create3000.github.io, so make sure to update your X\_ITE urls for CSS and JavaScript.

Bug fixes
---------

- Updated dependencies.
- Fixed bug with Geometry2D in Safari.
- Fixed Background rendering on iOS Safari.
- Fixed bug with sound loading on iOS Safari.

X\_ITE v4.6.10 released
=======================

*Leipzig, 21st March 2020*: This is primarily a bug fix release.

Bug fixes
---------

- Fixed CSS.

X\_ITE v4.6.9 released
======================

*Leipzig, 30th November 2019*: Fixed bugs.

Bug fixes
---------

- Added missing fields for HTML/DOM support.
- Fixed projective texture mapping in conjunction with generated cube map.

X\_ITE v4.6.8 released
======================

*Leipzig, 20th November 2019*: With this version we implement the TextureProjectorParallel and TextureProjectorPerspective node, from the upcoming X3D V4 standard, which will be available next year. We also have now better hardware support, we made *maxLights* and *maxTextures* dynamic, depending on the hardware of the user's system, this gives better support of older hardware and mobile systems.

New features
------------

- Implemented TextureProjectorParallel.
- Implemented TextureProjectorPerspective.

Bug fixes
---------

- Fixed special case in TimeSensor when *cycleInterval* is 0.

X\_ITE v4.6.7 released
======================

*Leipzig, 10th November 2019*: With this version we implement the PointProperties node, the first node from the upcoming X3D V4 standard, which will be available next year.

New features
------------

- Implemented PointProperties node.

X\_ITE v4.6.6 released
======================

*Leipzig, 4th November 2019*: This is primarily a bug fix release.

Bug fixes
---------

- Fixed texture 3d orientation.

X\_ITE v4.6.4 released
======================

*Leipzig, 2nd November 2019*: This is primarily a bug fix release.

New features
------------

- Updated external library dependencies.
- Improved Gouraud and Phong shader.
- Implemented DICOM image parser for ImageTexture3D.
- Support for X3DTexture3DNode in OpacityMapVolumeStyle node's *transferFunction* field.
- Implemented Script node *shutdown* function.

Bug fixes
---------

- Fixed bug in Script node in rare cases.

X\_ITE v4.6.3 released
======================

*Leipzig, 26th October 2019*: This is primarily a bug fix release.

New features
------------

- Support for NRRD types signed/unsigned byte, signed/unsigned short, signed/unsigned int, float, and double.
- Implemented NRRD ASCII, RAW, HEX, and GZIP encoding.

Bug fixes
---------

- Fixed CylinderSensor minAngle/maxAngle handling.
- Fixed wrong SilhouetteEnhancementVolumeStyle rendering in rare cases.
- Fixed wrong BoundaryEnhancementVolumeStyle rendering.
- Fixed Background rendering on mobile devices.

X\_ITE v4.6.2 released
======================

*Leipzig, 20th October 2019*: With this release we implement full support for VolumeRendering component and full support for Texturing3D component, ie. we switch to WebGL 2 with this release, if available.

New features
------------

- Basic support for VolumeRendering component.
- Full support for Texturing3D component.

Bug fixes
---------

- Fixed missing Browser properties *supportedProfiles* and *supportedComponents*.
- Optimized NURBS weight handling when no weights present.
- Fixed bug in TextureTransformMatrix3D.
- Fixed double load of URL in some cases of X3DUrlObject nodes.

X\_ITE v4.5.14 released
=======================

*Leipzig, 5th October 2019*: This is primarily a bug fix release.

Bug fixes
---------

- Better NURBS normals.
- Fixed X3DNurbsSurfaceGeometryNode *closed* field handling.
- Fix NURBS *weight* field handling.

X\_ITE v4.5.12 released
=======================

*Leipzig, 23rd September 2019*: This is primarily a bug fix release.

Bug fixes
---------

- Fixed bug in Matrix transpose.
- Better parser errors when node type is not known.

X\_ITE v4.5.10 released
=======================

*Leipzig, 17th July 2019*: This is primarily a bug fix release.

Bug fixes
---------

- Fixed sound rendering.

X\_ITE v4.5.9 released
======================

*Leipzig, 10th July 2019*: This is primarily a bug fix release.

Bug fixes
---------

- Fixed bug with browser event handler, for instance »onload«, if jQuery is present.
- Fixed bug with FogCoordinate calculation handling.

X\_ITE v4.5.8 released
======================

*Leipzig, 3rd July 2019*: Fixed some bugs.

Bug fixes
---------

- Fixed bug when parsing Classic VRML Encoded files.

X\_ITE v4.5.7 released
======================

*Leipzig, 26th June 2019*: We could again fix some bugs which will make X\_ITE again more stable. Additionally we removed the non-standard fields from AudioClip and MovieTexture, they are now fully specification conform.

New features
------------

- Updated splash screen.

Bug fixes
---------

- Fixed TimeSensor wrong *cycleTime* event at startup.
- Fixed BrowserTimings button type.
- Removed non-standard fields from X3DSoundSourceNode nodes.
- Fixed geometry nodes index fields access type.

X\_ITE v4.5.6 released
======================

*Leipzig, 19th June 2019*: We could optimize CoordinateChaser/Damper and TexCoordChaser2D/Damper2D, which runs now significantly faster.

New features
------------

- Optimized CoordinateChaser/Damper and TexCoordChaser2D/Damper2D.

Bug fixes
---------

- Fixed bug in TimeSensor *fraction\_changed* calculation if *loop* is true.

X\_ITE v4.5.4 released
======================

*Leipzig, 9th June 2019:* We could fix some minor bugs.

New features
------------

- Added MFNode.toVRML/XMLString.

Bug fixes
---------

- Fixed sound playing when Browser.endUpdate was called.
- Fixed Switch node when children are changed.
- Fixed a bug with Inline nodes in conjunction with XHTML DOM integration.

X\_ITE v4.5.1 released
======================

*Leipzig, 20th April 2019:* Although not enable, we are still using WebGL 1 in the official releases, X\_ITE is now prepared for WebGL 2. If WebGL 2 becomes more popular we will enabled it, if available, then WebGL 2 is selected, otherwise WebGL 1 to make X\_ITE compatible to older browsers.

X\_ITE v4.5.0 released
======================

*Leipzig, 14th April 2019:* With this version we implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate and also FillProperties is now working.

New features
------------

- Implemented MultiTexture, MultiTextureTransform, and MultiTextureCoordinate.
- Implemented FillProperties.
- Faster startup of browser.
- Better transitions with OthoViewpoint.

Bug fixes
---------

- Fix bug in Browser Options when switching texture quality.
- Fixed picking and Layout node.
- Fixed bug with composite glyphs in Text node.
- Fixed bug with data URLs.
- Fixed bug in toXMLString and toVRMLString when outputing protos.

X\_ITE v4.4.7 released
======================

*Leipzig, 3rd April 2019:* This version comes with a fresh implementation of the TextureCoordinateGenerator node and we could make the VisibilitySensor more precise.

New features
------------

- Implemented TextureCoordinateGenerator.
- More precise VisibilitySensor.

X\_ITE v4.4.6 released
======================

*Leipzig, 25th March 2019:* This version comes with the first nodes from the Picking component. We implemented LinePickSensor, PickableGroup, PointPickSensor, PrimitivePickSensor, and VolumePickSensor, which are fully implemented.

New features
------------

- Implemented Picking component.

X\_ITE v4.4.5 released
======================

Bug fixes
---------

- Fixed bug in LOD traverse.

X\_ITE v4.4.4 released
======================

*Leipzig, 18th March 2019:* We finally implemented *toVRMLString* for SFNode, X3DProtoDeclaration, X3DExternProtoDeclaration, and X3DScene. There is a new X3DCanvas attribute *preserveDrawingBuffer,* set this to true if you want to save the image from the canvas.

New features
------------

- Implemented toVRMLString.
- New X3DCanvas attribute preserveDrawingBuffer.

Bug fixes
---------

- Fixed bug in toXMLString of X3DScene.
- Fixed bug when parsing SFMatrix3d/f values.
- Fixed bug when parsing data URLs.
- Fixed shadow handling.
- Fixed bug in MF\* fields pop and shift.

X\_ITE v4.4.3 released
======================

*Leipzig, 11th March 2019:* Fixed a bug in BlendMode and there is a new page where you can online edit the BlendMode.

Bug fixes
---------

- Fixed bug in BlendMode.

X\_ITE v4.4.2 released
======================

*Leipzig, 24th February 2019:* We could fix some small bugs and now the TransformSensor is fully implemented. The version number is now displayed in the Context Menu.

New features
------------

- Show version number in context menu.
- Fully implemented TransformSensor.
- Optimized proto instance creation, especially when you use proto instances within another proto.
- Small improvements.

Bug fixes
---------

- Fixed GeoLOD when a ProximitySensor or Viewpoint is in the root node or children.
- Fixed fatal bug in IndexedFaceSet if there are degenerated polygons.

X\_ITE v4.4.1 released
======================

*Leipzig, 24th February 2019:* Fixed some small bugs.

Bug fixes
---------

- Fixed Browser.createX3DFromString console output.
- Fixed X3DExternProtoDeclaration, X3DProtoDeclaration, X3DRoute toString output.
- Fixed H-Anim units.

X\_ITE v4.4.0 released
======================

*Leipzig, 4th February 2019:* Small bug fixes and small optimizations makes this version as stable as ever before. We also could now implement the FogCoordinate node.

New features
------------

- Implemented FogCoordinate.

Bug fixes
---------

- Pass current time stamp to Script.prepareEvents function.
- X3DConstants have now browser event constants for browser callbacks.

X\_ITE v4.2.17 released
=======================

*Leipzig, 26th January 2019:* With this version we release the first version of the H-Anim component. The H-Anim component is automatically included when a profile or component statement matches »H-Anim«.

New features
------------

- Implemented »H-Anim« component.

X\_ITE v4.2.16 released
=======================

*Leipzig, 16th January 2019:* With this version we release the first version of the NURBS component. The NURBS component is automatically included when a profile or component statement matches »NURBS«.

New features
------------

- Implemented »NURBS« component.

X\_ITE v4.2.15 released
=======================

*Leipzig, 23th December 2018:* Beside OrthoViewpoint node, the Layout node is now able to handle Viewpoint node and GeoViewpoint node and we could fix again some bugs.

Bug fixes
---------

- Implemented Layout for Viewpoint and GeoViewpoint.
- Fixed Browser.getRenderingProperty.
- Fixed logarithmic depth buffer handling.
- Fixed bug in ECMAScript SFVec2/3d handling.
- Fixed bug in XML generator when generating nodes.
- Fixed bug with audio/video playback when url changes.

X\_ITE v4.2.14 released
=======================

*Leipzig, 16th December 2018:* This version implements the StringSensor from the KeyDeviceSensor component and we found a really phat bug in X3DComposedGeometryNode normal generation, which affects TriangleSet, IndexedTriangleSet, QuadSet, and so on. We also tested X\_ITE against <http://x3dgraphics.com/examples/X3dForWebAuthors/index.html/index.html> and fixed all bugs found.

New features
------------

- Implemented StringSensor

Bug fixes
---------

- Fixed X3DKeyDeviceSensorNode.enabled field handling.
- Fixed bug with KeySensor.isActive.
- Fixed bug in X3DComposedGeometryNode normal generation.
- Fog.visibilityRange is now affected by scaling.
- SpotLight.radius and PointLight.radius are now affected by scaling.

X\_ITE v4.2.13 released
=======================

*Leipzig, 6th December 2018:* SFVec2f/d, SFVec3f/d, SFVec4f/d have now new functions. These are multVec, divVec, distance, and lerp. Have a look at:

- SFVec2f/d Object
- SFVec3f/d Object
- SFVec4f/d Object

for more information. Additionally we tested X\_ITE against <http://www.web3d.org/x3d/content/examples/Basic/index.html> and fixed the bugs we found.

New features
------------

- Added new vector functions to SFVec2f/d, SFVec3f/d, SFVec4f/d.

Bug fixes
---------

- Fixed progress bar CSS in some cases.
- Fixed X3DBackground rendering if a GeoViewpoint is bound.

X\_ITE v4.2.12 released
=======================

*Leipzig, 4th December 2018:* Fixed a bugs in Text node and BrowserOptions.

Bug fixes
---------

- Fixed fatal bug in Text node when vertical text is rendered with empty lines.
- Fixed bug in Text.lineBounds when vertical text is rendered with empty lines.
- Fixed wrong initialization of BrowserOptions.

X\_ITE v4.2.11 released
=======================

*Leipzig, 29th November 2018:* Fixed some bugs.

New features
------------

- Small optimizations

Bug fixes
---------

- Fixed a bug in event handling.
- Fixed a bug in GeoLOD.
- Fixed fatal bug in ImageCubeMapTexture.

X\_ITE v4.2.10 released
=======================

*Leipzig, 13th November 2018:* We tested X\_ITE against <http://www.web3d.org/x3d/content/ConformanceNist/index.html> and fixed the bugs we found.

Bug fixes
---------

- Fixed LOD level calculation when range is empty.
- Fixed LocalFog calculation.
- Fixed fog calculation when visibilityRange is 0.
- Disable collision detection when viewpoint transition is active.
- Use specified precision for default struct types in shader source.

X\_ITE v4.2.9 released
======================

Bug fixes
---------

- Switch sounds off when not visible.
- Fixed fatal bug when setting audio/video volume.
- Fixed Sound node volume calculation.
- Better interpolation from saturated color to black, white, or gray.

X\_ITE v4.2.8 released
======================

*Leipzig, 31th Oktober 2018:* The X3DCanvas element has now the onload, onshutdown, and onerror attributes and properties. There is also jQuery support for these event handler when calling jQuery.fn.on and jQuery.fn.off:

```
var element = $("X3DCanvas");
element .on ("load", function () { console .log ("load, yeah"); });
```

New features
------------

- The X3DCanvas element has now the onload, onshutdown, and onerror attributes with jQuery support.
- The X3DCanvas element has now the onload, onshutdown, onerror, src, and url properties.
- X\_ITE now respects the tabindex setting from the X3DCanvas element.

Bug fixes
---------

- Fixed bug in Extrusion orientation handling.
- Better support for Extrusion with coincident spine points.

X\_ITE v4.2.7 released
======================

*Leipzig, 29th Oktober 2018:* This version fixes some important bugs and makes X\_ITE more specification conform.

Bug fixes
---------

- Fixed a bug in proto instances loaded from extern prototypes.
- Also parse and output XML IMPORT attribute importedDEF beside old attribute exportedDEF.
- ScreenGroup and ScreenFontStyle are now respecting a scaleOrientation in the transformation hierarchy.
- Fixed normal calculation of bounding boxes, it handles now special cases.

X\_ITE v4.2.6 released
======================

*Leipzig, 14th Oktober 2018:* With this version, X\_ITE includes a new polygon tessellator, ie. X\_ITE can better render concave polygons witch also affects polygon font support, which is now even better.

New features
------------

- Better polygon support for concave polygons.
- Better polygon font rendering.
- »Straighten Horizon« is now the default for EXAMINE viewer.

Bug fixes
---------

- Fixed bug when parsing XML field values.
- Fixed SFRotation handling of unnormalized values.

X\_ITE v4.2.5 released
======================

*Leipzig, 1st Oktober 2018:* This version fixes loads of bugs and added loads of small features.

New features
------------

- Added »Straighten Horizon« option to context menu when EXAMINE viewer is active.
- Optimized XML parser, it is now up to 60 % faster especially for large geometries.
- Implemented BrowserOption »EnableInlineViewpoints«.
- Published X3DField.add/removeFieldCallback functions.
- Implemented X3DBrowser.add/removeBrowserCallback functions.
- Changed X3DCanvas element focus handling, the element itself is now the focus element.
- New and optimized resize handling of X3DCanvas element.

Bug fixes
---------

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

X\_ITE v4.2.4 released
======================

*Leipzig, 9th July 2018:* This version is primarily a bug fix version. There are also new examples online for ScalarChaser, and IndexedTriangleFanSet.

Bug fixes
---------

- Fixed fatal bug in X3DProgrammableShaderObject.
- Small optimizations in X3DField objects.

X\_ITE v4.2.3 released
======================

*Leipzig, 7th July 2018:* This version is primarily a bug fix version. There are also new examples online for PointSet, and IndexedLineSet.

Bug fixes
---------

- Fixed bug in PROTO setup.
- Small optimizations in X3DArrayField.
- Small optimizations in event handling.
- Fixed bug in name handling when copy node.

X\_ITE v4.2.2 released
======================

*Leipzig, 23th June 2018:* We are proud to announce that code.create3000.de is now accessible via https.

New features
------------

- code.create3000.de is now accessible via https

X\_ITE v4.2.1 released
======================

*Leipzig, 17th June 2018:* This version is primarily a bug fix version.

Bug fixes
---------

- A real depth buffer is now used in shadow calculations.
- Fixed Chrome glitches of X3DBackground node.
- Fixed CSS issue.
- Fixed ImageTexture issue when the texture is reused multiple times.

X\_ITE v4.2.0 released
======================

DirectionalLight, SpotLight, and PointLight are now able to cast shadows. Let’s details them. A directional light is when light rays are parallel. A bit like when you look at the sun rays on the left. It mostly behaves like a light source very far from us. A spot light is when light rays seems to originate from a single point, and spreads outward in a coned direction, like in a dance club. To enable the shadow casting on a light, just adjust *shadowIntensity* of the light.

```js
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

<small class="small">Dynamic shadows in X\_ITE</small>

X\_ITE v4.1.7 released
======================

*Leipzig, 27th May 2018:* This version is primarily a bug fix version.

Bug fixes
---------

- Fixed fatal bug in Classic VRML parser.
- Fixed LOD.level\_changed event handling.
- Fixed bug when rendering opaque objects.

X\_ITE v4.1.6 released
======================

*Leipzig, 24th May 2018:* Thank's to Ammo (Bullet) physics engine we have implemented a lot of new nodes of the RigidBodyPhysics component. Most of the documentation pages of this component have a live example for this node. The component is realized as plug-in which can be include right after the x\_ite.js script tag.

```html
<link rel="stylesheet" type="text/css" href="http://code.create3000.de/x_ite/4.1.6/dist/x_ite.css"/>
<script type="text/javascript" src="http://code.create3000.de/x_ite/4.1.6/dist/x_ite.min.js"></script>
<!-- Include the following plug-ins if you wish support for this component -->
<script type="text/javascript" src="http://code.create3000.de/x_ite/4.1.6/dist/rigid-body-physics.min.js"></script>
```

New Features
------------

- RigidBodyPhysics component

X\_ITE v4.1.5 released
======================

*Leipzig, 14th March 2018:* We finally released version 4.1.5 now. With this version it is now possible to load X3D JSON encoded files. We implemented touch device support for all viewers and nodes derived form X3DPointingDeviceSensorNode and Anchor. This means tablets and smart phones are now fully supported. There are also a lot of other new features:

New Features
------------

- JSON file loader
- Touch device support for all Viewers and TouchSensor nodes
- Smoother navigation in Examine Viewer and other viewer
- Optimizations in IndexedQuadSet and QuadSet
- Optimized CoordinateInterpolator, NormalInterpolator, and CoordinateInterpolator2D
- Support for more textures for custom shaders
- New »StraigtenHorizon« browser option
- Better rendering of Text in some cases

Bug Fixes
---------

- Less memory footprint
- Fixed IndexedTriangleSet attribute handling
- and more bug fixes

X\_ITE v4.1.4 released
======================

*Leipzig, 11th January 2018:* We finally released version 4.1.4 now. X\_ITE has become a huge change in the shader specification. It is now even more like GLSL. There are new uniform variables *x3d\_LightSourceParameters, x3d\_MaterialParameters,* and *x3d\_FogParameters.* Old shaders are fully compatible with this version, although old shader light and material uniforms are depreciated. For more information have a look at </x_ite/Custom-Shaders.html>.

X\_ITE v4.1.3 released
======================

*Leipzig, 25th December 2017:* There is now the new BlendMode node in X\_ITE available, which gives X3D authors the ability to specify the WebGL blend modes for a node. The node is a X3DAppearance child node and can be assigned the the new *blendMode* field of a Appearance node. Shader authors have now more control over particle systems, there are three new build in variables available in shaders: *x3d\_ParticleId, x3d\_ParticleLife, x3d\_ParticleElapsedTime, x3d\_ParticlePosition.* For more information have a look at </x_ite/Custom-Shaders.html>.

X\_ITE v4.1.2 released
======================

*Leipzig, 8th December 2017:* Titania supports now the whole ParticleSystem component with the default graphics card driver Nouveau. During the implementation we found some optimization to speed up the ParticleSystem node in X\_ITE. Additionally we could fix three bug.

New Features and Bug Fixes
--------------------------

- Small optimizations and bug fixes in ParticleSystem node.
- Added x3d\_CameraSpaceMatrix to ComposedShader build-in variables.
- Fixed a bug in X3DBackground node when displayed with GeneratedCubeMapTexture node.
- Fixed fatal bug in MFImage.

X\_ITE v4.1.1 released
======================

*Leipzig, 23rd November 2017:* We fixed a bug in load count handling of the splash screen, ie. if the *splashScreen* attribute of the X3DCanvas element is true, the scene is first displayed if all objects and textures are completely loaded. An examination of the source code has revealed this mistake in the networking nodes.

New Features and Bug Fixes
--------------------------

- Fixed a bug in load count handling of the splash screen

X\_ITE v4.1.0 released
======================

*Leipzig, 22nd November 2017:* This completely implements the unit statement. Now units are parsed and all field values are converted. Additionally we could optimize X3DGroupingNode.removeChildren. It is now up to 20 % faster, especially if there are many children.

New Features and Bug Fixes
--------------------------

- Fixed bug in CADLayer.addChildren
- Optimized X3DGroupingNode.removeChildren
- Implemented units handling

Cobweb is now X\_ITE
====================

*Leipzig, 23rd August 2017:* Cobweb is now **X\_ITE.** We changed its name to X\_ITE to better reflect the purpose and design of X3D. Though the project's name may have changed, its programming still includes correctness, usability, flexibility, extensibility, and safety.

X\_ITE is now available from our own server at code.create3000.de. Just include the following URL's into your HTML and you are up to date again:

```html
<link rel="stylesheet" type="text/css" href="http://code.create3000.de/x_ite/4.0.7/dist/x_ite.css"/>
<script type="text/javascript" src="http://code.create3000.de/x_ite/4.0.7/dist/x_ite.min.js"></script>
```

Additionally X\_ITE is now available via GitHub CDN and jsDelivr CDN.

New Features and Bug Fixes
--------------------------

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
- NPM is now the package management system.

Cobweb 3.3 Released
===================

*Leipzig, 15th August 2017:* Accessing the external browser has changed a little. The *elements* callback has been removed from the arguments of the callback functions, which are passed to the X3D function. See Accessing the External Browser for further details.

There are new URL's for cobweb.min.js and cobweb.css. Use the following locations now.

```html
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.css"/>
<script type="text/javascript" src="https://cdn.rawgit.com/create3000/cobweb/3.3/dist/cobweb.min.js"></script>
```

Important
---------

If you still use an old stable version from Cobweb you must changed the URL for the stable folder to:

<https://cdn.rawgit.com/create3000/cobweb/releases/>

New Features and Bug Fixes
--------------------------

- Changed external browser access.
- Fixed default values of certain nodes (IntegerTrigger, ArcClose2D, Disk2D, Rectangle2D, TriangleSet2D, GeoViewpoint, DirectionalLight, Viewpoint, ConeEmitter, CylinderSensor).
- X3DCanvas is now transparent on startup until browser is initialized.
- Enable propagate events to HTML browser if in NONE viewer.
- X3DExecutionContext.getImportedNode operates now correct if importedName is undefined.
- SFBool.valueOf return now a native JavaScript value.

Cobweb 3.2 Released
===================

*Leipzig, 29th April 2017:* The X3DCanvas element becomes a major change in its CSS styles, it is now similar to the HTML5 canvas element a display *inline-block* element instead of *block* with a default width and height of 300 × 150 pixels. Additionally there are four new attributes *splashScreen, notifications, timings,* and *contextMenu*, these attribute are especially useful if the X3DCanvas element is very small. Have a look at »Attributes of the X3DCanvas Element« to see how these attributes work. Additionally we changed the data type mapping of SF/MFRotation in custom shaders from *uniform vec4* quaternion representation to *uniform mat3* 3×3 rotation matrix representation, which are easier to operate with.

New Features and Bug Fixes
--------------------------

- Changed default CSS style display of X3DCanvas element to *inline-block.*
- Changed default width and height of X3DCanvas element to 300 × 150 pixels.
- Added new X3DCanvas attributes *splashScreen,* notifications, timings, contextMenu.
- Implemented JavaScript browser option *SplashScreen.*
- Implemented SFColorRGBA.prototype.set/getHSVA.
- Use *uniform mat3* in custom shaders for SF/MFRotation fields.

Cobweb 3.1 Released
===================

*Leipzig, 13th April 2017:* We finally released version 3.1 now. This release is a bug fix release and fixes a fatal bug with shader uniform handling. Thanks to Sgeo. Externprotos have now the missing loadNow function implemented, although this function is normally not needed.

Cobweb 3.0 Released
===================

*Leipzig, 12th April 2017:* We finally released version 3.0 now. All fields derived from X3DArrayField have now two new functions *»push«* and *»unshift«* which operate like the corresponding JavaScript Array functions. All fields derived from X3DField have now a new function *»equals«* which makes it easy to compare two field values. The XMLParser was reworked and is now more secure and several issues are fixed. And last but not least we are proud to announce that prototypes do completely work now with XMTML DOM Integration.

![Mountains Shader Example](https://create3000.github.io/media/images/mountains.jpg)

<small>New Shader Example »Mountains«</small>

New Features and Bug Fixes
--------------------------

- New shader uniform x3d\_ViewportPrototypes do completely work now with XHTML DOM Integration.
- Implemented X3DArrayField push and unshift
- Implemented X3DField equals
- Reworked XMLParser
- Fixed ScreenFontStyle text picking
- Fixed issue with touch sensibility of Disk2D
- Fixed an issue of X3DPrototypeInstance in toXMLString

First Version
=============

The first version of X\_ITE was created in April 2015. It was still called Cobweb.
