/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


import gettext1                               from "../locale/gettext.js";
import shim1                                  from "../shim.js";
import Algorithm1                             from "../standard/Math/Algorithm.js";
import Bezier1                                from "../standard/Math/Algorithms/Bezier.js";
import MergeSort1                             from "../standard/Math/Algorithms/MergeSort.js";
import QuickSort1                             from "../standard/Math/Algorithms/QuickSort.js";
import SAT1                                   from "../standard/Math/Algorithms/SAT.js";
import eigen_decomposition1                   from "../standard/Math/Algorithms/eigen_decomposition.js";
import Box21                                  from "../standard/Math/Geometry/Box2.js";
import Box31                                  from "../standard/Math/Geometry/Box3.js";
import Camera1                                from "../standard/Math/Geometry/Camera.js";
import Cylinder31                             from "../standard/Math/Geometry/Cylinder3.js";
import Line21                                 from "../standard/Math/Geometry/Line2.js";
import Line31                                 from "../standard/Math/Geometry/Line3.js";
import Plane31                                from "../standard/Math/Geometry/Plane3.js";
import Sphere31                               from "../standard/Math/Geometry/Sphere3.js";
import Triangle31                             from "../standard/Math/Geometry/Triangle3.js";
import ViewVolume1                            from "../standard/Math/Geometry/ViewVolume.js";
import Color31                                from "../standard/Math/Numbers/Color3.js";
import Color41                                from "../standard/Math/Numbers/Color4.js";
import Complex1                               from "../standard/Math/Numbers/Complex.js";
import Matrix21                               from "../standard/Math/Numbers/Matrix2.js";
import Matrix31                               from "../standard/Math/Numbers/Matrix3.js";
import Matrix41                               from "../standard/Math/Numbers/Matrix4.js";
import Quaternion1                            from "../standard/Math/Numbers/Quaternion.js";
import Rotation41                             from "../standard/Math/Numbers/Rotation4.js";
import Vector21                               from "../standard/Math/Numbers/Vector2.js";
import Vector31                               from "../standard/Math/Numbers/Vector3.js";
import Vector41                               from "../standard/Math/Numbers/Vector4.js";
import MatrixStack1                           from "../standard/Math/Utility/MatrixStack.js";
import BinaryTransport1                       from "../standard/Networking/BinaryTransport.js";
import MicroTime1                             from "../standard/Time/MicroTime.js";
import BitSet1                                from "../standard/Utility/BitSet.js";
import DataStorage1                           from "../standard/Utility/DataStorage.js";
import MapUtilities1                          from "../standard/Utility/MapUtilities.js";
import ObjectCache1                           from "../standard/Utility/ObjectCache.js";
import Events1                                from "../x_ite/Base/Events.js";
import FieldArray1                            from "../x_ite/Base/FieldArray.js";
import FieldDefinitionArray1                  from "../x_ite/Base/FieldDefinitionArray.js";
import X3DArrayField1                         from "../x_ite/Base/X3DArrayField.js";
import X3DBaseNode1                           from "../x_ite/Base/X3DBaseNode.js";
import X3DCast1                               from "../x_ite/Base/X3DCast.js";
import X3DChildObject1                        from "../x_ite/Base/X3DChildObject.js";
import X3DConstants1                          from "../x_ite/Base/X3DConstants.js";
import X3DEventObject1                        from "../x_ite/Base/X3DEventObject.js";
import X3DField1                              from "../x_ite/Base/X3DField.js";
import X3DFieldDefinition1                    from "../x_ite/Base/X3DFieldDefinition.js";
import X3DInfoArray1                          from "../x_ite/Base/X3DInfoArray.js";
import X3DObject1                             from "../x_ite/Base/X3DObject.js";
import X3DObjectArrayField1                   from "../x_ite/Base/X3DObjectArrayField.js";
import X3DTypedArrayField1                    from "../x_ite/Base/X3DTypedArrayField.js";
import BrowserOptions1                        from "../x_ite/Browser/Core/BrowserOptions.js";
import BrowserProperties1                     from "../x_ite/Browser/Core/BrowserProperties.js";
import BrowserTimings1                        from "../x_ite/Browser/Core/BrowserTimings.js";
import Context1                               from "../x_ite/Browser/Core/Context.js";
import ContextMenu1                           from "../x_ite/Browser/Core/ContextMenu.js";
import Notification1                          from "../x_ite/Browser/Core/Notification.js";
import PrimitiveQuality1                      from "../x_ite/Browser/Core/PrimitiveQuality.js";
import RenderingProperties1                   from "../x_ite/Browser/Core/RenderingProperties.js";
import Shading1                               from "../x_ite/Browser/Core/Shading.js";
import TextureQuality1                        from "../x_ite/Browser/Core/TextureQuality.js";
import X3DCoreContext1                        from "../x_ite/Browser/Core/X3DCoreContext.js";
import X3DEnvironmentalEffectsContext1        from "../x_ite/Browser/EnvironmentalEffects/X3DEnvironmentalEffectsContext.js";
import X3DArrayChaserTemplate1                from "../x_ite/Browser/Followers/X3DArrayChaserTemplate.js";
import X3DArrayFollowerTemplate1              from "../x_ite/Browser/Followers/X3DArrayFollowerTemplate.js";
import BoxOptions1                            from "../x_ite/Browser/Geometry3D/BoxOptions.js";
import ConeOptions1                           from "../x_ite/Browser/Geometry3D/ConeOptions.js";
import CylinderOptions1                       from "../x_ite/Browser/Geometry3D/CylinderOptions.js";
import QuadSphereOptions1                     from "../x_ite/Browser/Geometry3D/QuadSphereOptions.js";
import X3DGeometry3DContext1                  from "../x_ite/Browser/Geometry3D/X3DGeometry3DContext.js";
import X3DGroupingContext1                    from "../x_ite/Browser/Grouping/X3DGroupingContext.js";
import CatmullRomSplineInterpolator1          from "../x_ite/Browser/Interpolation/CatmullRomSplineInterpolator.js";
import CatmullRomSplineInterpolator11         from "../x_ite/Browser/Interpolation/CatmullRomSplineInterpolator1.js";
import CatmullRomSplineInterpolator21         from "../x_ite/Browser/Interpolation/CatmullRomSplineInterpolator2.js";
import CatmullRomSplineInterpolator31         from "../x_ite/Browser/Interpolation/CatmullRomSplineInterpolator3.js";
import CatmullRomSplineInterpolatorTemplate1  from "../x_ite/Browser/Interpolation/CatmullRomSplineInterpolatorTemplate.js";
import SquatInterpolator1                     from "../x_ite/Browser/Interpolation/SquatInterpolator.js";
import X3DLayeringContext1                    from "../x_ite/Browser/Layering/X3DLayeringContext.js";
import X3DLightingContext1                    from "../x_ite/Browser/Lighting/X3DLightingContext.js";
import ExamineViewer1                         from "../x_ite/Browser/Navigation/ExamineViewer.js";
import FlyViewer1                             from "../x_ite/Browser/Navigation/FlyViewer.js";
import LookAtViewer1                          from "../x_ite/Browser/Navigation/LookAtViewer.js";
import NoneViewer1                            from "../x_ite/Browser/Navigation/NoneViewer.js";
import PlaneViewer1                           from "../x_ite/Browser/Navigation/PlaneViewer.js";
import WalkViewer1                            from "../x_ite/Browser/Navigation/WalkViewer.js";
import X3DFlyViewer1                          from "../x_ite/Browser/Navigation/X3DFlyViewer.js";
import X3DNavigationContext1                  from "../x_ite/Browser/Navigation/X3DNavigationContext.js";
import X3DViewer1                             from "../x_ite/Browser/Navigation/X3DViewer.js";
import URLs1                                  from "../x_ite/Browser/Networking/URLs.js";
import X3DNetworkingContext1                  from "../x_ite/Browser/Networking/X3DNetworkingContext.js";
import X3DPickingContext1                     from "../x_ite/Browser/Picking/X3DPickingContext.js";
import PointingDevice1                        from "../x_ite/Browser/PointingDeviceSensor/PointingDevice.js";
import PointingDeviceSensorContainer1         from "../x_ite/Browser/PointingDeviceSensor/PointingDeviceSensorContainer.js";
import X3DPointingDeviceSensorContext1        from "../x_ite/Browser/PointingDeviceSensor/X3DPointingDeviceSensorContext.js";
import GeometryContext1                       from "../x_ite/Browser/Rendering/GeometryContext.js";
import X3DRenderingContext1                   from "../x_ite/Browser/Rendering/X3DRenderingContext.js";
import X3DScriptingContext1                   from "../x_ite/Browser/Scripting/X3DScriptingContext.js";
import ShaderCompiler1                        from "../x_ite/Browser/Shaders/ShaderCompiler.js";
import ShaderSource1                          from "../x_ite/Browser/Shaders/ShaderSource.js";
import Shaders1                               from "../x_ite/Browser/Shaders/Shaders.js";
import X3DShadersContext1                     from "../x_ite/Browser/Shaders/X3DShadersContext.js";
import AlphaMode1                             from "../x_ite/Browser/Shape/AlphaMode.js";
import X3DShapeContext1                       from "../x_ite/Browser/Shape/X3DShapeContext.js";
import X3DSoundContext1                       from "../x_ite/Browser/Sound/X3DSoundContext.js";
import PolygonText1                           from "../x_ite/Browser/Text/PolygonText.js";
import TextAlignment1                         from "../x_ite/Browser/Text/TextAlignment.js";
import X3DTextContext1                        from "../x_ite/Browser/Text/X3DTextContext.js";
import X3DTextGeometry1                       from "../x_ite/Browser/Text/X3DTextGeometry.js";
import FunctionType1                          from "../x_ite/Browser/Texturing/FunctionType.js";
import ModeType1                              from "../x_ite/Browser/Texturing/ModeType.js";
import SourceType1                            from "../x_ite/Browser/Texturing/SourceType.js";
import TextureCoordinateGeneratorModeType1    from "../x_ite/Browser/Texturing/TextureCoordinateGeneratorModeType.js";
import X3DTexturingContext1                   from "../x_ite/Browser/Texturing/X3DTexturingContext.js";
import X3DTimeContext1                        from "../x_ite/Browser/Time/X3DTimeContext.js";
import VERSION1                               from "../x_ite/Browser/VERSION.js";
import X3DBrowser1                            from "../x_ite/Browser/X3DBrowser.js";
import X3DBrowserContext1                     from "../x_ite/Browser/X3DBrowserContext.js";
import Components1                            from "../x_ite/Components.js";
import Core1                                  from "../x_ite/Components/Core.js";
import MetadataBoolean1                       from "../x_ite/Components/Core/MetadataBoolean.js";
import MetadataDouble1                        from "../x_ite/Components/Core/MetadataDouble.js";
import MetadataFloat1                         from "../x_ite/Components/Core/MetadataFloat.js";
import MetadataInteger1                       from "../x_ite/Components/Core/MetadataInteger.js";
import MetadataSet1                           from "../x_ite/Components/Core/MetadataSet.js";
import MetadataString1                        from "../x_ite/Components/Core/MetadataString.js";
import WorldInfo1                             from "../x_ite/Components/Core/WorldInfo.js";
import X3DBindableNode1                       from "../x_ite/Components/Core/X3DBindableNode.js";
import X3DChildNode1                          from "../x_ite/Components/Core/X3DChildNode.js";
import X3DInfoNode1                           from "../x_ite/Components/Core/X3DInfoNode.js";
import X3DMetadataObject1                     from "../x_ite/Components/Core/X3DMetadataObject.js";
import X3DNode1                               from "../x_ite/Components/Core/X3DNode.js";
import X3DPrototypeInstance1                  from "../x_ite/Components/Core/X3DPrototypeInstance.js";
import X3DSensorNode1                         from "../x_ite/Components/Core/X3DSensorNode.js";
import EnvironmentalEffects1                  from "../x_ite/Components/EnvironmentalEffects.js";
import Background1                            from "../x_ite/Components/EnvironmentalEffects/Background.js";
import Fog1                                   from "../x_ite/Components/EnvironmentalEffects/Fog.js";
import FogCoordinate1                         from "../x_ite/Components/EnvironmentalEffects/FogCoordinate.js";
import LocalFog1                              from "../x_ite/Components/EnvironmentalEffects/LocalFog.js";
import TextureBackground1                     from "../x_ite/Components/EnvironmentalEffects/TextureBackground.js";
import X3DBackgroundNode1                     from "../x_ite/Components/EnvironmentalEffects/X3DBackgroundNode.js";
import X3DFogObject1                          from "../x_ite/Components/EnvironmentalEffects/X3DFogObject.js";
import EnvironmentalSensor1                   from "../x_ite/Components/EnvironmentalSensor.js";
import ProximitySensor1                       from "../x_ite/Components/EnvironmentalSensor/ProximitySensor.js";
import TransformSensor1                       from "../x_ite/Components/EnvironmentalSensor/TransformSensor.js";
import VisibilitySensor1                      from "../x_ite/Components/EnvironmentalSensor/VisibilitySensor.js";
import X3DEnvironmentalSensorNode1            from "../x_ite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode.js";
import Followers1                             from "../x_ite/Components/Followers.js";
import ColorChaser1                           from "../x_ite/Components/Followers/ColorChaser.js";
import ColorDamper1                           from "../x_ite/Components/Followers/ColorDamper.js";
import CoordinateChaser1                      from "../x_ite/Components/Followers/CoordinateChaser.js";
import CoordinateDamper1                      from "../x_ite/Components/Followers/CoordinateDamper.js";
import OrientationChaser1                     from "../x_ite/Components/Followers/OrientationChaser.js";
import OrientationDamper1                     from "../x_ite/Components/Followers/OrientationDamper.js";
import PositionChaser1                        from "../x_ite/Components/Followers/PositionChaser.js";
import PositionChaser2D1                      from "../x_ite/Components/Followers/PositionChaser2D.js";
import PositionDamper1                        from "../x_ite/Components/Followers/PositionDamper.js";
import PositionDamper2D1                      from "../x_ite/Components/Followers/PositionDamper2D.js";
import ScalarChaser1                          from "../x_ite/Components/Followers/ScalarChaser.js";
import ScalarDamper1                          from "../x_ite/Components/Followers/ScalarDamper.js";
import TexCoordChaser2D1                      from "../x_ite/Components/Followers/TexCoordChaser2D.js";
import TexCoordDamper2D1                      from "../x_ite/Components/Followers/TexCoordDamper2D.js";
import X3DChaserNode1                         from "../x_ite/Components/Followers/X3DChaserNode.js";
import X3DDamperNode1                         from "../x_ite/Components/Followers/X3DDamperNode.js";
import X3DFollowerNode1                       from "../x_ite/Components/Followers/X3DFollowerNode.js";
import Geometry3D1                            from "../x_ite/Components/Geometry3D.js";
import Box1                                   from "../x_ite/Components/Geometry3D/Box.js";
import Cone1                                  from "../x_ite/Components/Geometry3D/Cone.js";
import Cylinder1                              from "../x_ite/Components/Geometry3D/Cylinder.js";
import ElevationGrid1                         from "../x_ite/Components/Geometry3D/ElevationGrid.js";
import Extrusion1                             from "../x_ite/Components/Geometry3D/Extrusion.js";
import IndexedFaceSet1                        from "../x_ite/Components/Geometry3D/IndexedFaceSet.js";
import Sphere1                                from "../x_ite/Components/Geometry3D/Sphere.js";
import Grouping1                              from "../x_ite/Components/Grouping.js";
import Group1                                 from "../x_ite/Components/Grouping/Group.js";
import StaticGroup1                           from "../x_ite/Components/Grouping/StaticGroup.js";
import Switch1                                from "../x_ite/Components/Grouping/Switch.js";
import Transform1                             from "../x_ite/Components/Grouping/Transform.js";
import X3DBoundedObject1                      from "../x_ite/Components/Grouping/X3DBoundedObject.js";
import X3DGroupingNode1                       from "../x_ite/Components/Grouping/X3DGroupingNode.js";
import X3DTransformMatrix3DNode1              from "../x_ite/Components/Grouping/X3DTransformMatrix3DNode.js";
import X3DTransformNode1                      from "../x_ite/Components/Grouping/X3DTransformNode.js";
import Interpolation1                         from "../x_ite/Components/Interpolation.js";
import ColorInterpolator1                     from "../x_ite/Components/Interpolation/ColorInterpolator.js";
import CoordinateInterpolator1                from "../x_ite/Components/Interpolation/CoordinateInterpolator.js";
import CoordinateInterpolator2D1              from "../x_ite/Components/Interpolation/CoordinateInterpolator2D.js";
import EaseInEaseOut1                         from "../x_ite/Components/Interpolation/EaseInEaseOut.js";
import NormalInterpolator1                    from "../x_ite/Components/Interpolation/NormalInterpolator.js";
import OrientationInterpolator1               from "../x_ite/Components/Interpolation/OrientationInterpolator.js";
import PositionInterpolator1                  from "../x_ite/Components/Interpolation/PositionInterpolator.js";
import PositionInterpolator2D1                from "../x_ite/Components/Interpolation/PositionInterpolator2D.js";
import ScalarInterpolator1                    from "../x_ite/Components/Interpolation/ScalarInterpolator.js";
import SplinePositionInterpolator1            from "../x_ite/Components/Interpolation/SplinePositionInterpolator.js";
import SplinePositionInterpolator2D1          from "../x_ite/Components/Interpolation/SplinePositionInterpolator2D.js";
import SplineScalarInterpolator1              from "../x_ite/Components/Interpolation/SplineScalarInterpolator.js";
import SquadOrientationInterpolator1          from "../x_ite/Components/Interpolation/SquadOrientationInterpolator.js";
import X3DInterpolatorNode1                   from "../x_ite/Components/Interpolation/X3DInterpolatorNode.js";
import Layering1                              from "../x_ite/Components/Layering.js";
import Layer1                                 from "../x_ite/Components/Layering/Layer.js";
import LayerSet1                              from "../x_ite/Components/Layering/LayerSet.js";
import Viewport1                              from "../x_ite/Components/Layering/Viewport.js";
import X3DLayerNode1                          from "../x_ite/Components/Layering/X3DLayerNode.js";
import X3DViewportNode1                       from "../x_ite/Components/Layering/X3DViewportNode.js";
import Lighting1                              from "../x_ite/Components/Lighting.js";
import DirectionalLight1                      from "../x_ite/Components/Lighting/DirectionalLight.js";
import PointLight1                            from "../x_ite/Components/Lighting/PointLight.js";
import SpotLight1                             from "../x_ite/Components/Lighting/SpotLight.js";
import X3DLightNode1                          from "../x_ite/Components/Lighting/X3DLightNode.js";
import Navigation1                            from "../x_ite/Components/Navigation.js";
import Billboard1                             from "../x_ite/Components/Navigation/Billboard.js";
import Collision1                             from "../x_ite/Components/Navigation/Collision.js";
import LOD1                                   from "../x_ite/Components/Navigation/LOD.js";
import NavigationInfo1                        from "../x_ite/Components/Navigation/NavigationInfo.js";
import OrthoViewpoint1                        from "../x_ite/Components/Navigation/OrthoViewpoint.js";
import Viewpoint1                             from "../x_ite/Components/Navigation/Viewpoint.js";
import ViewpointGroup1                        from "../x_ite/Components/Navigation/ViewpointGroup.js";
import X3DViewpointNode1                      from "../x_ite/Components/Navigation/X3DViewpointNode.js";
import Networking1                            from "../x_ite/Components/Networking.js";
import Anchor1                                from "../x_ite/Components/Networking/Anchor.js";
import Inline1                                from "../x_ite/Components/Networking/Inline.js";
import LoadSensor1                            from "../x_ite/Components/Networking/LoadSensor.js";
import X3DNetworkSensorNode1                  from "../x_ite/Components/Networking/X3DNetworkSensorNode.js";
import X3DUrlObject1                          from "../x_ite/Components/Networking/X3DUrlObject.js";
import PointingDeviceSensor1                  from "../x_ite/Components/PointingDeviceSensor.js";
import CylinderSensor1                        from "../x_ite/Components/PointingDeviceSensor/CylinderSensor.js";
import PlaneSensor1                           from "../x_ite/Components/PointingDeviceSensor/PlaneSensor.js";
import SphereSensor1                          from "../x_ite/Components/PointingDeviceSensor/SphereSensor.js";
import TouchSensor1                           from "../x_ite/Components/PointingDeviceSensor/TouchSensor.js";
import X3DDragSensorNode1                     from "../x_ite/Components/PointingDeviceSensor/X3DDragSensorNode.js";
import X3DPointingDeviceSensorNode1           from "../x_ite/Components/PointingDeviceSensor/X3DPointingDeviceSensorNode.js";
import X3DTouchSensorNode1                    from "../x_ite/Components/PointingDeviceSensor/X3DTouchSensorNode.js";
import Rendering1                             from "../x_ite/Components/Rendering.js";
import ClipPlane1                             from "../x_ite/Components/Rendering/ClipPlane.js";
import Color1                                 from "../x_ite/Components/Rendering/Color.js";
import ColorRGBA1                             from "../x_ite/Components/Rendering/ColorRGBA.js";
import Coordinate1                            from "../x_ite/Components/Rendering/Coordinate.js";
import IndexedLineSet1                        from "../x_ite/Components/Rendering/IndexedLineSet.js";
import IndexedTriangleFanSet1                 from "../x_ite/Components/Rendering/IndexedTriangleFanSet.js";
import IndexedTriangleSet1                    from "../x_ite/Components/Rendering/IndexedTriangleSet.js";
import IndexedTriangleStripSet1               from "../x_ite/Components/Rendering/IndexedTriangleStripSet.js";
import LineSet1                               from "../x_ite/Components/Rendering/LineSet.js";
import Normal1                                from "../x_ite/Components/Rendering/Normal.js";
import PointSet1                              from "../x_ite/Components/Rendering/PointSet.js";
import TriangleFanSet1                        from "../x_ite/Components/Rendering/TriangleFanSet.js";
import TriangleSet1                           from "../x_ite/Components/Rendering/TriangleSet.js";
import TriangleStripSet1                      from "../x_ite/Components/Rendering/TriangleStripSet.js";
import X3DColorNode1                          from "../x_ite/Components/Rendering/X3DColorNode.js";
import X3DComposedGeometryNode1               from "../x_ite/Components/Rendering/X3DComposedGeometryNode.js";
import X3DCoordinateNode1                     from "../x_ite/Components/Rendering/X3DCoordinateNode.js";
import X3DGeometricPropertyNode1              from "../x_ite/Components/Rendering/X3DGeometricPropertyNode.js";
import X3DGeometryNode1                       from "../x_ite/Components/Rendering/X3DGeometryNode.js";
import X3DLineGeometryNode1                   from "../x_ite/Components/Rendering/X3DLineGeometryNode.js";
import X3DNormalNode1                         from "../x_ite/Components/Rendering/X3DNormalNode.js";
import X3DPointGeometryNode1                  from "../x_ite/Components/Rendering/X3DPointGeometryNode.js";
import Shaders2                               from "../x_ite/Components/Shaders.js";
import ComposedShader1                        from "../x_ite/Components/Shaders/ComposedShader.js";
import FloatVertexAttribute1                  from "../x_ite/Components/Shaders/FloatVertexAttribute.js";
import Matrix3VertexAttribute1                from "../x_ite/Components/Shaders/Matrix3VertexAttribute.js";
import Matrix4VertexAttribute1                from "../x_ite/Components/Shaders/Matrix4VertexAttribute.js";
import PackagedShader1                        from "../x_ite/Components/Shaders/PackagedShader.js";
import ProgramShader1                         from "../x_ite/Components/Shaders/ProgramShader.js";
import ShaderPart1                            from "../x_ite/Components/Shaders/ShaderPart.js";
import ShaderProgram1                         from "../x_ite/Components/Shaders/ShaderProgram.js";
import X3DProgrammableShaderObject1           from "../x_ite/Components/Shaders/X3DProgrammableShaderObject.js";
import X3DShaderNode1                         from "../x_ite/Components/Shaders/X3DShaderNode.js";
import X3DVertexAttributeNode1                from "../x_ite/Components/Shaders/X3DVertexAttributeNode.js";
import Shape1                                 from "../x_ite/Components/Shape.js";
import AcousticProperties1                    from "../x_ite/Components/Shape/AcousticProperties.js";
import Appearance1                            from "../x_ite/Components/Shape/Appearance.js";
import FillProperties1                        from "../x_ite/Components/Shape/FillProperties.js";
import LineProperties1                        from "../x_ite/Components/Shape/LineProperties.js";
import Material1                              from "../x_ite/Components/Shape/Material.js";
import PhysicalMaterial1                      from "../x_ite/Components/Shape/PhysicalMaterial.js";
import PointProperties1                       from "../x_ite/Components/Shape/PointProperties.js";
import Shape2                                 from "../x_ite/Components/Shape/Shape.js";
import TwoSidedMaterial1                      from "../x_ite/Components/Shape/TwoSidedMaterial.js";
import UnlitMaterial1                         from "../x_ite/Components/Shape/UnlitMaterial.js";
import X3DAppearanceChildNode1                from "../x_ite/Components/Shape/X3DAppearanceChildNode.js";
import X3DAppearanceNode1                     from "../x_ite/Components/Shape/X3DAppearanceNode.js";
import X3DMaterialNode1                       from "../x_ite/Components/Shape/X3DMaterialNode.js";
import X3DOneSidedMaterialNode1               from "../x_ite/Components/Shape/X3DOneSidedMaterialNode.js";
import X3DShapeNode1                          from "../x_ite/Components/Shape/X3DShapeNode.js";
import Sound1                                 from "../x_ite/Components/Sound.js";
import AudioClip1                             from "../x_ite/Components/Sound/AudioClip.js";
import Sound2                                 from "../x_ite/Components/Sound/Sound.js";
import X3DSoundNode1                          from "../x_ite/Components/Sound/X3DSoundNode.js";
import X3DSoundSourceNode1                    from "../x_ite/Components/Sound/X3DSoundSourceNode.js";
import Text1                                  from "../x_ite/Components/Text.js";
import FontStyle1                             from "../x_ite/Components/Text/FontStyle.js";
import Text2                                  from "../x_ite/Components/Text/Text.js";
import X3DFontStyleNode1                      from "../x_ite/Components/Text/X3DFontStyleNode.js";
import Texturing1                             from "../x_ite/Components/Texturing.js";
import ImageTexture1                          from "../x_ite/Components/Texturing/ImageTexture.js";
import MovieTexture1                          from "../x_ite/Components/Texturing/MovieTexture.js";
import MultiTexture1                          from "../x_ite/Components/Texturing/MultiTexture.js";
import MultiTextureCoordinate1                from "../x_ite/Components/Texturing/MultiTextureCoordinate.js";
import MultiTextureTransform1                 from "../x_ite/Components/Texturing/MultiTextureTransform.js";
import PixelTexture1                          from "../x_ite/Components/Texturing/PixelTexture.js";
import TextureCoordinate1                     from "../x_ite/Components/Texturing/TextureCoordinate.js";
import TextureCoordinateGenerator1            from "../x_ite/Components/Texturing/TextureCoordinateGenerator.js";
import TextureProperties1                     from "../x_ite/Components/Texturing/TextureProperties.js";
import TextureTransform1                      from "../x_ite/Components/Texturing/TextureTransform.js";
import X3DSingleTextureCoordinateNode1        from "../x_ite/Components/Texturing/X3DSingleTextureCoordinateNode.js";
import X3DSingleTextureNode1                  from "../x_ite/Components/Texturing/X3DSingleTextureNode.js";
import X3DSingleTextureTransformNode1         from "../x_ite/Components/Texturing/X3DSingleTextureTransformNode.js";
import X3DTexture2DNode1                      from "../x_ite/Components/Texturing/X3DTexture2DNode.js";
import X3DTextureCoordinateNode1              from "../x_ite/Components/Texturing/X3DTextureCoordinateNode.js";
import X3DTextureNode1                        from "../x_ite/Components/Texturing/X3DTextureNode.js";
import X3DTextureTransformNode1               from "../x_ite/Components/Texturing/X3DTextureTransformNode.js";
import Time1                                  from "../x_ite/Components/Time.js";
import TimeSensor1                            from "../x_ite/Components/Time/TimeSensor.js";
import X3DTimeDependentNode1                  from "../x_ite/Components/Time/X3DTimeDependentNode.js";
import ComponentInfo1                         from "../x_ite/Configuration/ComponentInfo.js";
import ComponentInfoArray1                    from "../x_ite/Configuration/ComponentInfoArray.js";
import ProfileInfo1                           from "../x_ite/Configuration/ProfileInfo.js";
import ProfileInfoArray1                      from "../x_ite/Configuration/ProfileInfoArray.js";
import SupportedComponents1                   from "../x_ite/Configuration/SupportedComponents.js";
import SupportedNodes1                        from "../x_ite/Configuration/SupportedNodes.js";
import SupportedProfiles1                     from "../x_ite/Configuration/SupportedProfiles.js";
import UnitInfo1                              from "../x_ite/Configuration/UnitInfo.js";
import UnitInfoArray1                         from "../x_ite/Configuration/UnitInfoArray.js";
import DEBUG1                                 from "../x_ite/DEBUG.js";
import BindableList1                          from "../x_ite/Execution/BindableList.js";
import BindableStack1                         from "../x_ite/Execution/BindableStack.js";
import ExportedNodesArray1                    from "../x_ite/Execution/ExportedNodesArray.js";
import ImportedNodesArray1                    from "../x_ite/Execution/ImportedNodesArray.js";
import NamedNodesArray1                       from "../x_ite/Execution/NamedNodesArray.js";
import Scene1                                 from "../x_ite/Execution/Scene.js";
import X3DExecutionContext1                   from "../x_ite/Execution/X3DExecutionContext.js";
import X3DExportedNode1                       from "../x_ite/Execution/X3DExportedNode.js";
import X3DImportedNode1                       from "../x_ite/Execution/X3DImportedNode.js";
import X3DScene1                              from "../x_ite/Execution/X3DScene.js";
import X3DWorld1                              from "../x_ite/Execution/X3DWorld.js";
import Fallback1                              from "../x_ite/Fallback.js";
import Fields1                                from "../x_ite/Fields.js";
import ArrayFields1                           from "../x_ite/Fields/ArrayFields.js";
import SFBool1                                from "../x_ite/Fields/SFBool.js";
import SFColor1                               from "../x_ite/Fields/SFColor.js";
import SFColorRGBA1                           from "../x_ite/Fields/SFColorRGBA.js";
import SFDouble1                              from "../x_ite/Fields/SFDouble.js";
import SFFloat1                               from "../x_ite/Fields/SFFloat.js";
import SFImage1                               from "../x_ite/Fields/SFImage.js";
import SFInt321                               from "../x_ite/Fields/SFInt32.js";
import SFMatrix31                             from "../x_ite/Fields/SFMatrix3.js";
import SFMatrix41                             from "../x_ite/Fields/SFMatrix4.js";
import SFMatrixPrototypeTemplate1             from "../x_ite/Fields/SFMatrixPrototypeTemplate.js";
import SFNode1                                from "../x_ite/Fields/SFNode.js";
import SFNodeCache1                           from "../x_ite/Fields/SFNodeCache.js";
import SFRotation1                            from "../x_ite/Fields/SFRotation.js";
import SFString1                              from "../x_ite/Fields/SFString.js";
import SFTime1                                from "../x_ite/Fields/SFTime.js";
import SFVec21                                from "../x_ite/Fields/SFVec2.js";
import SFVec31                                from "../x_ite/Fields/SFVec3.js";
import SFVec41                                from "../x_ite/Fields/SFVec4.js";
import SFVecPrototypeTemplate1                from "../x_ite/Fields/SFVecPrototypeTemplate.js";
import FileLoader1                            from "../x_ite/InputOutput/FileLoader.js";
import Generator1                             from "../x_ite/InputOutput/Generator.js";
import GoldenGate1                            from "../x_ite/Parser/GoldenGate.js";
import HTMLSupport1                           from "../x_ite/Parser/HTMLSupport.js";
import JSONParser1                            from "../x_ite/Parser/JSONParser.js";
import VRMLParser1                            from "../x_ite/Parser/VRMLParser.js";
import X3DParser1                             from "../x_ite/Parser/X3DParser.js";
import XMLParser1                             from "../x_ite/Parser/XMLParser.js";
import ExternProtoDeclarationArray1           from "../x_ite/Prototype/ExternProtoDeclarationArray.js";
import ProtoDeclarationArray1                 from "../x_ite/Prototype/ProtoDeclarationArray.js";
import X3DExternProtoDeclaration1             from "../x_ite/Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration1                   from "../x_ite/Prototype/X3DProtoDeclaration.js";
import X3DProtoDeclarationNode1               from "../x_ite/Prototype/X3DProtoDeclarationNode.js";
import DependentRenderer1                     from "../x_ite/Rendering/DependentRenderer.js";
import TextureBuffer1                         from "../x_ite/Rendering/TextureBuffer.js";
import TraverseType1                          from "../x_ite/Rendering/TraverseType.js";
import VertexArray1                           from "../x_ite/Rendering/VertexArray.js";
import X3DRenderObject1                       from "../x_ite/Rendering/X3DRenderObject.js";
import RouteArray1                            from "../x_ite/Routing/RouteArray.js";
import X3DRoute1                              from "../x_ite/Routing/X3DRoute.js";
import X3DRoutingContext1                     from "../x_ite/Routing/X3DRoutingContext.js";

const Namespace = new Map ([
   ["locale/gettext",                                                    gettext1],
   ["shim",                                                              shim1],
   ["standard/Math/Algorithm",                                           Algorithm1],
   ["standard/Math/Algorithms/Bezier",                                   Bezier1],
   ["standard/Math/Algorithms/MergeSort",                                MergeSort1],
   ["standard/Math/Algorithms/QuickSort",                                QuickSort1],
   ["standard/Math/Algorithms/SAT",                                      SAT1],
   ["standard/Math/Algorithms/eigen_decomposition",                      eigen_decomposition1],
   ["standard/Math/Geometry/Box2",                                       Box21],
   ["standard/Math/Geometry/Box3",                                       Box31],
   ["standard/Math/Geometry/Camera",                                     Camera1],
   ["standard/Math/Geometry/Cylinder3",                                  Cylinder31],
   ["standard/Math/Geometry/Line2",                                      Line21],
   ["standard/Math/Geometry/Line3",                                      Line31],
   ["standard/Math/Geometry/Plane3",                                     Plane31],
   ["standard/Math/Geometry/Sphere3",                                    Sphere31],
   ["standard/Math/Geometry/Triangle3",                                  Triangle31],
   ["standard/Math/Geometry/ViewVolume",                                 ViewVolume1],
   ["standard/Math/Numbers/Color3",                                      Color31],
   ["standard/Math/Numbers/Color4",                                      Color41],
   ["standard/Math/Numbers/Complex",                                     Complex1],
   ["standard/Math/Numbers/Matrix2",                                     Matrix21],
   ["standard/Math/Numbers/Matrix3",                                     Matrix31],
   ["standard/Math/Numbers/Matrix4",                                     Matrix41],
   ["standard/Math/Numbers/Quaternion",                                  Quaternion1],
   ["standard/Math/Numbers/Rotation4",                                   Rotation41],
   ["standard/Math/Numbers/Vector2",                                     Vector21],
   ["standard/Math/Numbers/Vector3",                                     Vector31],
   ["standard/Math/Numbers/Vector4",                                     Vector41],
   ["standard/Math/Utility/MatrixStack",                                 MatrixStack1],
   ["standard/Networking/BinaryTransport",                               BinaryTransport1],
   ["standard/Time/MicroTime",                                           MicroTime1],
   ["standard/Utility/BitSet",                                           BitSet1],
   ["standard/Utility/DataStorage",                                      DataStorage1],
   ["standard/Utility/MapUtilities",                                     MapUtilities1],
   ["standard/Utility/ObjectCache",                                      ObjectCache1],
   ["x_ite/Base/Events",                                                 Events1],
   ["x_ite/Base/FieldArray",                                             FieldArray1],
   ["x_ite/Base/FieldDefinitionArray",                                   FieldDefinitionArray1],
   ["x_ite/Base/X3DArrayField",                                          X3DArrayField1],
   ["x_ite/Base/X3DBaseNode",                                            X3DBaseNode1],
   ["x_ite/Base/X3DCast",                                                X3DCast1],
   ["x_ite/Base/X3DChildObject",                                         X3DChildObject1],
   ["x_ite/Base/X3DConstants",                                           X3DConstants1],
   ["x_ite/Base/X3DEventObject",                                         X3DEventObject1],
   ["x_ite/Base/X3DField",                                               X3DField1],
   ["x_ite/Base/X3DFieldDefinition",                                     X3DFieldDefinition1],
   ["x_ite/Base/X3DInfoArray",                                           X3DInfoArray1],
   ["x_ite/Base/X3DObject",                                              X3DObject1],
   ["x_ite/Base/X3DObjectArrayField",                                    X3DObjectArrayField1],
   ["x_ite/Base/X3DTypedArrayField",                                     X3DTypedArrayField1],
   ["x_ite/Browser/Core/BrowserOptions",                                 BrowserOptions1],
   ["x_ite/Browser/Core/BrowserProperties",                              BrowserProperties1],
   ["x_ite/Browser/Core/BrowserTimings",                                 BrowserTimings1],
   ["x_ite/Browser/Core/Context",                                        Context1],
   ["x_ite/Browser/Core/ContextMenu",                                    ContextMenu1],
   ["x_ite/Browser/Core/Notification",                                   Notification1],
   ["x_ite/Browser/Core/PrimitiveQuality",                               PrimitiveQuality1],
   ["x_ite/Browser/Core/RenderingProperties",                            RenderingProperties1],
   ["x_ite/Browser/Core/Shading",                                        Shading1],
   ["x_ite/Browser/Core/TextureQuality",                                 TextureQuality1],
   ["x_ite/Browser/Core/X3DCoreContext",                                 X3DCoreContext1],
   ["x_ite/Browser/EnvironmentalEffects/X3DEnvironmentalEffectsContext", X3DEnvironmentalEffectsContext1],
   ["x_ite/Browser/Followers/X3DArrayChaserTemplate",                    X3DArrayChaserTemplate1],
   ["x_ite/Browser/Followers/X3DArrayFollowerTemplate",                  X3DArrayFollowerTemplate1],
   ["x_ite/Browser/Geometry3D/BoxOptions",                               BoxOptions1],
   ["x_ite/Browser/Geometry3D/ConeOptions",                              ConeOptions1],
   ["x_ite/Browser/Geometry3D/CylinderOptions",                          CylinderOptions1],
   ["x_ite/Browser/Geometry3D/QuadSphereOptions",                        QuadSphereOptions1],
   ["x_ite/Browser/Geometry3D/X3DGeometry3DContext",                     X3DGeometry3DContext1],
   ["x_ite/Browser/Grouping/X3DGroupingContext",                         X3DGroupingContext1],
   ["x_ite/Browser/Interpolation/CatmullRomSplineInterpolator",          CatmullRomSplineInterpolator1],
   ["x_ite/Browser/Interpolation/CatmullRomSplineInterpolator1",         CatmullRomSplineInterpolator11],
   ["x_ite/Browser/Interpolation/CatmullRomSplineInterpolator2",         CatmullRomSplineInterpolator21],
   ["x_ite/Browser/Interpolation/CatmullRomSplineInterpolator3",         CatmullRomSplineInterpolator31],
   ["x_ite/Browser/Interpolation/CatmullRomSplineInterpolatorTemplate",  CatmullRomSplineInterpolatorTemplate1],
   ["x_ite/Browser/Interpolation/SquatInterpolator",                     SquatInterpolator1],
   ["x_ite/Browser/Layering/X3DLayeringContext",                         X3DLayeringContext1],
   ["x_ite/Browser/Lighting/X3DLightingContext",                         X3DLightingContext1],
   ["x_ite/Browser/Navigation/ExamineViewer",                            ExamineViewer1],
   ["x_ite/Browser/Navigation/FlyViewer",                                FlyViewer1],
   ["x_ite/Browser/Navigation/LookAtViewer",                             LookAtViewer1],
   ["x_ite/Browser/Navigation/NoneViewer",                               NoneViewer1],
   ["x_ite/Browser/Navigation/PlaneViewer",                              PlaneViewer1],
   ["x_ite/Browser/Navigation/WalkViewer",                               WalkViewer1],
   ["x_ite/Browser/Navigation/X3DFlyViewer",                             X3DFlyViewer1],
   ["x_ite/Browser/Navigation/X3DNavigationContext",                     X3DNavigationContext1],
   ["x_ite/Browser/Navigation/X3DViewer",                                X3DViewer1],
   ["x_ite/Browser/Networking/URLs",                                     URLs1],
   ["x_ite/Browser/Networking/X3DNetworkingContext",                     X3DNetworkingContext1],
   ["x_ite/Browser/Picking/X3DPickingContext",                           X3DPickingContext1],
   ["x_ite/Browser/PointingDeviceSensor/PointingDevice",                 PointingDevice1],
   ["x_ite/Browser/PointingDeviceSensor/PointingDeviceSensorContainer",  PointingDeviceSensorContainer1],
   ["x_ite/Browser/PointingDeviceSensor/X3DPointingDeviceSensorContext", X3DPointingDeviceSensorContext1],
   ["x_ite/Browser/Rendering/GeometryContext",                           GeometryContext1],
   ["x_ite/Browser/Rendering/X3DRenderingContext",                       X3DRenderingContext1],
   ["x_ite/Browser/Scripting/X3DScriptingContext",                       X3DScriptingContext1],
   ["x_ite/Browser/Shaders/ShaderCompiler",                              ShaderCompiler1],
   ["x_ite/Browser/Shaders/ShaderSource",                                ShaderSource1],
   ["x_ite/Browser/Shaders/Shaders",                                     Shaders1],
   ["x_ite/Browser/Shaders/X3DShadersContext",                           X3DShadersContext1],
   ["x_ite/Browser/Shape/AlphaMode",                                     AlphaMode1],
   ["x_ite/Browser/Shape/X3DShapeContext",                               X3DShapeContext1],
   ["x_ite/Browser/Sound/X3DSoundContext",                               X3DSoundContext1],
   ["x_ite/Browser/Text/PolygonText",                                    PolygonText1],
   ["x_ite/Browser/Text/TextAlignment",                                  TextAlignment1],
   ["x_ite/Browser/Text/X3DTextContext",                                 X3DTextContext1],
   ["x_ite/Browser/Text/X3DTextGeometry",                                X3DTextGeometry1],
   ["x_ite/Browser/Texturing/FunctionType",                              FunctionType1],
   ["x_ite/Browser/Texturing/ModeType",                                  ModeType1],
   ["x_ite/Browser/Texturing/SourceType",                                SourceType1],
   ["x_ite/Browser/Texturing/TextureCoordinateGeneratorModeType",        TextureCoordinateGeneratorModeType1],
   ["x_ite/Browser/Texturing/X3DTexturingContext",                       X3DTexturingContext1],
   ["x_ite/Browser/Time/X3DTimeContext",                                 X3DTimeContext1],
   ["x_ite/Browser/VERSION",                                             VERSION1],
   ["x_ite/Browser/X3DBrowser",                                          X3DBrowser1],
   ["x_ite/Browser/X3DBrowserContext",                                   X3DBrowserContext1],
   ["x_ite/Components",                                                  Components1],
   ["x_ite/Components/Core",                                             Core1],
   ["x_ite/Components/Core/MetadataBoolean",                             MetadataBoolean1],
   ["x_ite/Components/Core/MetadataDouble",                              MetadataDouble1],
   ["x_ite/Components/Core/MetadataFloat",                               MetadataFloat1],
   ["x_ite/Components/Core/MetadataInteger",                             MetadataInteger1],
   ["x_ite/Components/Core/MetadataSet",                                 MetadataSet1],
   ["x_ite/Components/Core/MetadataString",                              MetadataString1],
   ["x_ite/Components/Core/WorldInfo",                                   WorldInfo1],
   ["x_ite/Components/Core/X3DBindableNode",                             X3DBindableNode1],
   ["x_ite/Components/Core/X3DChildNode",                                X3DChildNode1],
   ["x_ite/Components/Core/X3DInfoNode",                                 X3DInfoNode1],
   ["x_ite/Components/Core/X3DMetadataObject",                           X3DMetadataObject1],
   ["x_ite/Components/Core/X3DNode",                                     X3DNode1],
   ["x_ite/Components/Core/X3DPrototypeInstance",                        X3DPrototypeInstance1],
   ["x_ite/Components/Core/X3DSensorNode",                               X3DSensorNode1],
   ["x_ite/Components/EnvironmentalEffects",                             EnvironmentalEffects1],
   ["x_ite/Components/EnvironmentalEffects/Background",                  Background1],
   ["x_ite/Components/EnvironmentalEffects/Fog",                         Fog1],
   ["x_ite/Components/EnvironmentalEffects/FogCoordinate",               FogCoordinate1],
   ["x_ite/Components/EnvironmentalEffects/LocalFog",                    LocalFog1],
   ["x_ite/Components/EnvironmentalEffects/TextureBackground",           TextureBackground1],
   ["x_ite/Components/EnvironmentalEffects/X3DBackgroundNode",           X3DBackgroundNode1],
   ["x_ite/Components/EnvironmentalEffects/X3DFogObject",                X3DFogObject1],
   ["x_ite/Components/EnvironmentalSensor",                              EnvironmentalSensor1],
   ["x_ite/Components/EnvironmentalSensor/ProximitySensor",              ProximitySensor1],
   ["x_ite/Components/EnvironmentalSensor/TransformSensor",              TransformSensor1],
   ["x_ite/Components/EnvironmentalSensor/VisibilitySensor",             VisibilitySensor1],
   ["x_ite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode",   X3DEnvironmentalSensorNode1],
   ["x_ite/Components/Followers",                                        Followers1],
   ["x_ite/Components/Followers/ColorChaser",                            ColorChaser1],
   ["x_ite/Components/Followers/ColorDamper",                            ColorDamper1],
   ["x_ite/Components/Followers/CoordinateChaser",                       CoordinateChaser1],
   ["x_ite/Components/Followers/CoordinateDamper",                       CoordinateDamper1],
   ["x_ite/Components/Followers/OrientationChaser",                      OrientationChaser1],
   ["x_ite/Components/Followers/OrientationDamper",                      OrientationDamper1],
   ["x_ite/Components/Followers/PositionChaser",                         PositionChaser1],
   ["x_ite/Components/Followers/PositionChaser2D",                       PositionChaser2D1],
   ["x_ite/Components/Followers/PositionDamper",                         PositionDamper1],
   ["x_ite/Components/Followers/PositionDamper2D",                       PositionDamper2D1],
   ["x_ite/Components/Followers/ScalarChaser",                           ScalarChaser1],
   ["x_ite/Components/Followers/ScalarDamper",                           ScalarDamper1],
   ["x_ite/Components/Followers/TexCoordChaser2D",                       TexCoordChaser2D1],
   ["x_ite/Components/Followers/TexCoordDamper2D",                       TexCoordDamper2D1],
   ["x_ite/Components/Followers/X3DChaserNode",                          X3DChaserNode1],
   ["x_ite/Components/Followers/X3DDamperNode",                          X3DDamperNode1],
   ["x_ite/Components/Followers/X3DFollowerNode",                        X3DFollowerNode1],
   ["x_ite/Components/Geometry3D",                                       Geometry3D1],
   ["x_ite/Components/Geometry3D/Box",                                   Box1],
   ["x_ite/Components/Geometry3D/Cone",                                  Cone1],
   ["x_ite/Components/Geometry3D/Cylinder",                              Cylinder1],
   ["x_ite/Components/Geometry3D/ElevationGrid",                         ElevationGrid1],
   ["x_ite/Components/Geometry3D/Extrusion",                             Extrusion1],
   ["x_ite/Components/Geometry3D/IndexedFaceSet",                        IndexedFaceSet1],
   ["x_ite/Components/Geometry3D/Sphere",                                Sphere1],
   ["x_ite/Components/Grouping",                                         Grouping1],
   ["x_ite/Components/Grouping/Group",                                   Group1],
   ["x_ite/Components/Grouping/StaticGroup",                             StaticGroup1],
   ["x_ite/Components/Grouping/Switch",                                  Switch1],
   ["x_ite/Components/Grouping/Transform",                               Transform1],
   ["x_ite/Components/Grouping/X3DBoundedObject",                        X3DBoundedObject1],
   ["x_ite/Components/Grouping/X3DGroupingNode",                         X3DGroupingNode1],
   ["x_ite/Components/Grouping/X3DTransformMatrix3DNode",                X3DTransformMatrix3DNode1],
   ["x_ite/Components/Grouping/X3DTransformNode",                        X3DTransformNode1],
   ["x_ite/Components/Interpolation",                                    Interpolation1],
   ["x_ite/Components/Interpolation/ColorInterpolator",                  ColorInterpolator1],
   ["x_ite/Components/Interpolation/CoordinateInterpolator",             CoordinateInterpolator1],
   ["x_ite/Components/Interpolation/CoordinateInterpolator2D",           CoordinateInterpolator2D1],
   ["x_ite/Components/Interpolation/EaseInEaseOut",                      EaseInEaseOut1],
   ["x_ite/Components/Interpolation/NormalInterpolator",                 NormalInterpolator1],
   ["x_ite/Components/Interpolation/OrientationInterpolator",            OrientationInterpolator1],
   ["x_ite/Components/Interpolation/PositionInterpolator",               PositionInterpolator1],
   ["x_ite/Components/Interpolation/PositionInterpolator2D",             PositionInterpolator2D1],
   ["x_ite/Components/Interpolation/ScalarInterpolator",                 ScalarInterpolator1],
   ["x_ite/Components/Interpolation/SplinePositionInterpolator",         SplinePositionInterpolator1],
   ["x_ite/Components/Interpolation/SplinePositionInterpolator2D",       SplinePositionInterpolator2D1],
   ["x_ite/Components/Interpolation/SplineScalarInterpolator",           SplineScalarInterpolator1],
   ["x_ite/Components/Interpolation/SquadOrientationInterpolator",       SquadOrientationInterpolator1],
   ["x_ite/Components/Interpolation/X3DInterpolatorNode",                X3DInterpolatorNode1],
   ["x_ite/Components/Layering",                                         Layering1],
   ["x_ite/Components/Layering/Layer",                                   Layer1],
   ["x_ite/Components/Layering/LayerSet",                                LayerSet1],
   ["x_ite/Components/Layering/Viewport",                                Viewport1],
   ["x_ite/Components/Layering/X3DLayerNode",                            X3DLayerNode1],
   ["x_ite/Components/Layering/X3DViewportNode",                         X3DViewportNode1],
   ["x_ite/Components/Lighting",                                         Lighting1],
   ["x_ite/Components/Lighting/DirectionalLight",                        DirectionalLight1],
   ["x_ite/Components/Lighting/PointLight",                              PointLight1],
   ["x_ite/Components/Lighting/SpotLight",                               SpotLight1],
   ["x_ite/Components/Lighting/X3DLightNode",                            X3DLightNode1],
   ["x_ite/Components/Navigation",                                       Navigation1],
   ["x_ite/Components/Navigation/Billboard",                             Billboard1],
   ["x_ite/Components/Navigation/Collision",                             Collision1],
   ["x_ite/Components/Navigation/LOD",                                   LOD1],
   ["x_ite/Components/Navigation/NavigationInfo",                        NavigationInfo1],
   ["x_ite/Components/Navigation/OrthoViewpoint",                        OrthoViewpoint1],
   ["x_ite/Components/Navigation/Viewpoint",                             Viewpoint1],
   ["x_ite/Components/Navigation/ViewpointGroup",                        ViewpointGroup1],
   ["x_ite/Components/Navigation/X3DViewpointNode",                      X3DViewpointNode1],
   ["x_ite/Components/Networking",                                       Networking1],
   ["x_ite/Components/Networking/Anchor",                                Anchor1],
   ["x_ite/Components/Networking/Inline",                                Inline1],
   ["x_ite/Components/Networking/LoadSensor",                            LoadSensor1],
   ["x_ite/Components/Networking/X3DNetworkSensorNode",                  X3DNetworkSensorNode1],
   ["x_ite/Components/Networking/X3DUrlObject",                          X3DUrlObject1],
   ["x_ite/Components/PointingDeviceSensor",                             PointingDeviceSensor1],
   ["x_ite/Components/PointingDeviceSensor/CylinderSensor",              CylinderSensor1],
   ["x_ite/Components/PointingDeviceSensor/PlaneSensor",                 PlaneSensor1],
   ["x_ite/Components/PointingDeviceSensor/SphereSensor",                SphereSensor1],
   ["x_ite/Components/PointingDeviceSensor/TouchSensor",                 TouchSensor1],
   ["x_ite/Components/PointingDeviceSensor/X3DDragSensorNode",           X3DDragSensorNode1],
   ["x_ite/Components/PointingDeviceSensor/X3DPointingDeviceSensorNode", X3DPointingDeviceSensorNode1],
   ["x_ite/Components/PointingDeviceSensor/X3DTouchSensorNode",          X3DTouchSensorNode1],
   ["x_ite/Components/Rendering",                                        Rendering1],
   ["x_ite/Components/Rendering/ClipPlane",                              ClipPlane1],
   ["x_ite/Components/Rendering/Color",                                  Color1],
   ["x_ite/Components/Rendering/ColorRGBA",                              ColorRGBA1],
   ["x_ite/Components/Rendering/Coordinate",                             Coordinate1],
   ["x_ite/Components/Rendering/IndexedLineSet",                         IndexedLineSet1],
   ["x_ite/Components/Rendering/IndexedTriangleFanSet",                  IndexedTriangleFanSet1],
   ["x_ite/Components/Rendering/IndexedTriangleSet",                     IndexedTriangleSet1],
   ["x_ite/Components/Rendering/IndexedTriangleStripSet",                IndexedTriangleStripSet1],
   ["x_ite/Components/Rendering/LineSet",                                LineSet1],
   ["x_ite/Components/Rendering/Normal",                                 Normal1],
   ["x_ite/Components/Rendering/PointSet",                               PointSet1],
   ["x_ite/Components/Rendering/TriangleFanSet",                         TriangleFanSet1],
   ["x_ite/Components/Rendering/TriangleSet",                            TriangleSet1],
   ["x_ite/Components/Rendering/TriangleStripSet",                       TriangleStripSet1],
   ["x_ite/Components/Rendering/X3DColorNode",                           X3DColorNode1],
   ["x_ite/Components/Rendering/X3DComposedGeometryNode",                X3DComposedGeometryNode1],
   ["x_ite/Components/Rendering/X3DCoordinateNode",                      X3DCoordinateNode1],
   ["x_ite/Components/Rendering/X3DGeometricPropertyNode",               X3DGeometricPropertyNode1],
   ["x_ite/Components/Rendering/X3DGeometryNode",                        X3DGeometryNode1],
   ["x_ite/Components/Rendering/X3DLineGeometryNode",                    X3DLineGeometryNode1],
   ["x_ite/Components/Rendering/X3DNormalNode",                          X3DNormalNode1],
   ["x_ite/Components/Rendering/X3DPointGeometryNode",                   X3DPointGeometryNode1],
   ["x_ite/Components/Shaders",                                          Shaders2],
   ["x_ite/Components/Shaders/ComposedShader",                           ComposedShader1],
   ["x_ite/Components/Shaders/FloatVertexAttribute",                     FloatVertexAttribute1],
   ["x_ite/Components/Shaders/Matrix3VertexAttribute",                   Matrix3VertexAttribute1],
   ["x_ite/Components/Shaders/Matrix4VertexAttribute",                   Matrix4VertexAttribute1],
   ["x_ite/Components/Shaders/PackagedShader",                           PackagedShader1],
   ["x_ite/Components/Shaders/ProgramShader",                            ProgramShader1],
   ["x_ite/Components/Shaders/ShaderPart",                               ShaderPart1],
   ["x_ite/Components/Shaders/ShaderProgram",                            ShaderProgram1],
   ["x_ite/Components/Shaders/X3DProgrammableShaderObject",              X3DProgrammableShaderObject1],
   ["x_ite/Components/Shaders/X3DShaderNode",                            X3DShaderNode1],
   ["x_ite/Components/Shaders/X3DVertexAttributeNode",                   X3DVertexAttributeNode1],
   ["x_ite/Components/Shape",                                            Shape1],
   ["x_ite/Components/Shape/AcousticProperties",                         AcousticProperties1],
   ["x_ite/Components/Shape/Appearance",                                 Appearance1],
   ["x_ite/Components/Shape/FillProperties",                             FillProperties1],
   ["x_ite/Components/Shape/LineProperties",                             LineProperties1],
   ["x_ite/Components/Shape/Material",                                   Material1],
   ["x_ite/Components/Shape/PhysicalMaterial",                           PhysicalMaterial1],
   ["x_ite/Components/Shape/PointProperties",                            PointProperties1],
   ["x_ite/Components/Shape/Shape",                                      Shape2],
   ["x_ite/Components/Shape/TwoSidedMaterial",                           TwoSidedMaterial1],
   ["x_ite/Components/Shape/UnlitMaterial",                              UnlitMaterial1],
   ["x_ite/Components/Shape/X3DAppearanceChildNode",                     X3DAppearanceChildNode1],
   ["x_ite/Components/Shape/X3DAppearanceNode",                          X3DAppearanceNode1],
   ["x_ite/Components/Shape/X3DMaterialNode",                            X3DMaterialNode1],
   ["x_ite/Components/Shape/X3DOneSidedMaterialNode",                    X3DOneSidedMaterialNode1],
   ["x_ite/Components/Shape/X3DShapeNode",                               X3DShapeNode1],
   ["x_ite/Components/Sound",                                            Sound1],
   ["x_ite/Components/Sound/AudioClip",                                  AudioClip1],
   ["x_ite/Components/Sound/Sound",                                      Sound2],
   ["x_ite/Components/Sound/X3DSoundNode",                               X3DSoundNode1],
   ["x_ite/Components/Sound/X3DSoundSourceNode",                         X3DSoundSourceNode1],
   ["x_ite/Components/Text",                                             Text1],
   ["x_ite/Components/Text/FontStyle",                                   FontStyle1],
   ["x_ite/Components/Text/Text",                                        Text2],
   ["x_ite/Components/Text/X3DFontStyleNode",                            X3DFontStyleNode1],
   ["x_ite/Components/Texturing",                                        Texturing1],
   ["x_ite/Components/Texturing/ImageTexture",                           ImageTexture1],
   ["x_ite/Components/Texturing/MovieTexture",                           MovieTexture1],
   ["x_ite/Components/Texturing/MultiTexture",                           MultiTexture1],
   ["x_ite/Components/Texturing/MultiTextureCoordinate",                 MultiTextureCoordinate1],
   ["x_ite/Components/Texturing/MultiTextureTransform",                  MultiTextureTransform1],
   ["x_ite/Components/Texturing/PixelTexture",                           PixelTexture1],
   ["x_ite/Components/Texturing/TextureCoordinate",                      TextureCoordinate1],
   ["x_ite/Components/Texturing/TextureCoordinateGenerator",             TextureCoordinateGenerator1],
   ["x_ite/Components/Texturing/TextureProperties",                      TextureProperties1],
   ["x_ite/Components/Texturing/TextureTransform",                       TextureTransform1],
   ["x_ite/Components/Texturing/X3DSingleTextureCoordinateNode",         X3DSingleTextureCoordinateNode1],
   ["x_ite/Components/Texturing/X3DSingleTextureNode",                   X3DSingleTextureNode1],
   ["x_ite/Components/Texturing/X3DSingleTextureTransformNode",          X3DSingleTextureTransformNode1],
   ["x_ite/Components/Texturing/X3DTexture2DNode",                       X3DTexture2DNode1],
   ["x_ite/Components/Texturing/X3DTextureCoordinateNode",               X3DTextureCoordinateNode1],
   ["x_ite/Components/Texturing/X3DTextureNode",                         X3DTextureNode1],
   ["x_ite/Components/Texturing/X3DTextureTransformNode",                X3DTextureTransformNode1],
   ["x_ite/Components/Time",                                             Time1],
   ["x_ite/Components/Time/TimeSensor",                                  TimeSensor1],
   ["x_ite/Components/Time/X3DTimeDependentNode",                        X3DTimeDependentNode1],
   ["x_ite/Configuration/ComponentInfo",                                 ComponentInfo1],
   ["x_ite/Configuration/ComponentInfoArray",                            ComponentInfoArray1],
   ["x_ite/Configuration/ProfileInfo",                                   ProfileInfo1],
   ["x_ite/Configuration/ProfileInfoArray",                              ProfileInfoArray1],
   ["x_ite/Configuration/SupportedComponents",                           SupportedComponents1],
   ["x_ite/Configuration/SupportedNodes",                                SupportedNodes1],
   ["x_ite/Configuration/SupportedProfiles",                             SupportedProfiles1],
   ["x_ite/Configuration/UnitInfo",                                      UnitInfo1],
   ["x_ite/Configuration/UnitInfoArray",                                 UnitInfoArray1],
   ["x_ite/DEBUG",                                                       DEBUG1],
   ["x_ite/Execution/BindableList",                                      BindableList1],
   ["x_ite/Execution/BindableStack",                                     BindableStack1],
   ["x_ite/Execution/ExportedNodesArray",                                ExportedNodesArray1],
   ["x_ite/Execution/ImportedNodesArray",                                ImportedNodesArray1],
   ["x_ite/Execution/NamedNodesArray",                                   NamedNodesArray1],
   ["x_ite/Execution/Scene",                                             Scene1],
   ["x_ite/Execution/X3DExecutionContext",                               X3DExecutionContext1],
   ["x_ite/Execution/X3DExportedNode",                                   X3DExportedNode1],
   ["x_ite/Execution/X3DImportedNode",                                   X3DImportedNode1],
   ["x_ite/Execution/X3DScene",                                          X3DScene1],
   ["x_ite/Execution/X3DWorld",                                          X3DWorld1],
   ["x_ite/Fallback",                                                    Fallback1],
   ["x_ite/Fields",                                                      Fields1],
   ["x_ite/Fields/ArrayFields",                                          ArrayFields1],
   ["x_ite/Fields/SFBool",                                               SFBool1],
   ["x_ite/Fields/SFColor",                                              SFColor1],
   ["x_ite/Fields/SFColorRGBA",                                          SFColorRGBA1],
   ["x_ite/Fields/SFDouble",                                             SFDouble1],
   ["x_ite/Fields/SFFloat",                                              SFFloat1],
   ["x_ite/Fields/SFImage",                                              SFImage1],
   ["x_ite/Fields/SFInt32",                                              SFInt321],
   ["x_ite/Fields/SFMatrix3",                                            SFMatrix31],
   ["x_ite/Fields/SFMatrix4",                                            SFMatrix41],
   ["x_ite/Fields/SFMatrixPrototypeTemplate",                            SFMatrixPrototypeTemplate1],
   ["x_ite/Fields/SFNode",                                               SFNode1],
   ["x_ite/Fields/SFNodeCache",                                          SFNodeCache1],
   ["x_ite/Fields/SFRotation",                                           SFRotation1],
   ["x_ite/Fields/SFString",                                             SFString1],
   ["x_ite/Fields/SFTime",                                               SFTime1],
   ["x_ite/Fields/SFVec2",                                               SFVec21],
   ["x_ite/Fields/SFVec3",                                               SFVec31],
   ["x_ite/Fields/SFVec4",                                               SFVec41],
   ["x_ite/Fields/SFVecPrototypeTemplate",                               SFVecPrototypeTemplate1],
   ["x_ite/InputOutput/FileLoader",                                      FileLoader1],
   ["x_ite/InputOutput/Generator",                                       Generator1],
   ["x_ite/Parser/GoldenGate",                                           GoldenGate1],
   ["x_ite/Parser/HTMLSupport",                                          HTMLSupport1],
   ["x_ite/Parser/JSONParser",                                           JSONParser1],
   ["x_ite/Parser/VRMLParser",                                           VRMLParser1],
   ["x_ite/Parser/X3DParser",                                            X3DParser1],
   ["x_ite/Parser/XMLParser",                                            XMLParser1],
   ["x_ite/Prototype/ExternProtoDeclarationArray",                       ExternProtoDeclarationArray1],
   ["x_ite/Prototype/ProtoDeclarationArray",                             ProtoDeclarationArray1],
   ["x_ite/Prototype/X3DExternProtoDeclaration",                         X3DExternProtoDeclaration1],
   ["x_ite/Prototype/X3DProtoDeclaration",                               X3DProtoDeclaration1],
   ["x_ite/Prototype/X3DProtoDeclarationNode",                           X3DProtoDeclarationNode1],
   ["x_ite/Rendering/DependentRenderer",                                 DependentRenderer1],
   ["x_ite/Rendering/TextureBuffer",                                     TextureBuffer1],
   ["x_ite/Rendering/TraverseType",                                      TraverseType1],
   ["x_ite/Rendering/VertexArray",                                       VertexArray1],
   ["x_ite/Rendering/X3DRenderObject",                                   X3DRenderObject1],
   ["x_ite/Routing/RouteArray",                                          RouteArray1],
   ["x_ite/Routing/X3DRoute",                                            X3DRoute1],
   ["x_ite/Routing/X3DRoutingContext",                                   X3DRoutingContext1],
]);

export default Namespace;
