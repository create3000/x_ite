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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define (function ()
{
"use strict";

	var
		loadState = 0,
		fieldType = 0,
		nodeType  = 0;

	var X3DConstants =
	{
		// Load state

		NOT_STARTED_STATE: loadState ++,
		IN_PROGRESS_STATE: loadState ++,
		COMPLETE_STATE:    loadState ++,
		FAILED_STATE:      loadState ++,

		// Access type

		initializeOnly: parseInt ('001', 2),
		inputOnly:      parseInt ('010', 2),
		outputOnly:     parseInt ('100', 2),
		inputOutput:    parseInt ('111', 2),

		// X3DField

		SFBool:      fieldType ++,
		SFColor:     fieldType ++,
		SFColorRGBA: fieldType ++,
		SFDouble:    fieldType ++,
		SFFloat:     fieldType ++,
		SFImage:     fieldType ++,
		SFInt32:     fieldType ++,
		SFMatrix3d:  fieldType ++,
		SFMatrix3f:  fieldType ++,
		SFMatrix4d:  fieldType ++,
		SFMatrix4f:  fieldType ++,
		SFNode:      fieldType ++,
		SFRotation:  fieldType ++,
		SFString:    fieldType ++,
		SFTime:      fieldType ++,
		SFVec2d:     fieldType ++,
		SFVec2f:     fieldType ++,
		SFVec3d:     fieldType ++,
		SFVec3f:     fieldType ++,
		SFVec4d:     fieldType ++,
		SFVec4f:     fieldType ++,

		VrmlMatrix:  fieldType ++,

		// X3DArrayField

		MFBool:      fieldType ++,
		MFColor:     fieldType ++,
		MFColorRGBA: fieldType ++,
		MFDouble:    fieldType ++,
		MFFloat:     fieldType ++,
		MFImage:     fieldType ++,
		MFInt32:     fieldType ++,
		MFMatrix3d:  fieldType ++,
		MFMatrix3f:  fieldType ++,
		MFMatrix4d:  fieldType ++,
		MFMatrix4f:  fieldType ++,
		MFNode:      fieldType ++,
		MFRotation:  fieldType ++,
		MFString:    fieldType ++,
		MFTime:      fieldType ++,
		MFVec2d:     fieldType ++,
		MFVec2f:     fieldType ++,
		MFVec3d:     fieldType ++,
		MFVec3f:     fieldType ++,
		MFVec4d:     fieldType ++,
		MFVec4f:     fieldType ++,

		// X3DNode
		
		Anchor:                       nodeType ++,
		Appearance:                   nodeType ++,
		Arc2D:                        nodeType ++,
		ArcClose2D:                   nodeType ++,
		AudioClip:                    nodeType ++,
		Background:                   nodeType ++,
		BallJoint:                    nodeType ++,
		Billboard:                    nodeType ++,
		BooleanFilter:                nodeType ++,
		BooleanSequencer:             nodeType ++,
		BooleanToggle:                nodeType ++,
		BooleanTrigger:               nodeType ++,
		BoundedPhysicsModel:          nodeType ++,
		Box:                          nodeType ++,
		CADAssembly:                  nodeType ++,
		CADFace:                      nodeType ++,
		CADLayer:                     nodeType ++,
		CADPart:                      nodeType ++,
		Circle2D:                     nodeType ++,
		ClipPlane:                    nodeType ++,
		CollidableOffset:             nodeType ++,
		CollidableShape:              nodeType ++,
		Collision:                    nodeType ++,
		CollisionCollection:          nodeType ++,
		CollisionSensor:              nodeType ++,
		CollisionSpace:               nodeType ++,
		Color:                        nodeType ++,
		ColorChaser:                  nodeType ++,
		ColorDamper:                  nodeType ++,
		ColorInterpolator:            nodeType ++,
		ColorRGBA:                    nodeType ++,
		ComposedCubeMapTexture:       nodeType ++,
		ComposedShader:               nodeType ++,
		ComposedTexture3D:            nodeType ++,
		Cone:                         nodeType ++,
		ConeEmitter:                  nodeType ++,
		Contact:                      nodeType ++,
		Contour2D:                    nodeType ++,
		ContourPolyline2D:            nodeType ++,
		Coordinate:                   nodeType ++,
		CoordinateChaser:             nodeType ++,
		CoordinateDamper:             nodeType ++,
		CoordinateDouble:             nodeType ++,
		CoordinateInterpolator:       nodeType ++,
		CoordinateInterpolator2D:     nodeType ++,
		Cylinder:                     nodeType ++,
		CylinderSensor:               nodeType ++,
		DISEntityManager:             nodeType ++,
		DISEntityTypeMapping:         nodeType ++,
		DirectionalLight:             nodeType ++,
		Disk2D:                       nodeType ++,
		DoubleAxisHingeJoint:         nodeType ++,
		EaseInEaseOut:                nodeType ++,
		ElevationGrid:                nodeType ++,
		EspduTransform:               nodeType ++,
		ExplosionEmitter:             nodeType ++,
		Extrusion:                    nodeType ++,
		FillProperties:               nodeType ++,
		FloatVertexAttribute:         nodeType ++,
		Fog:                          nodeType ++,
		FogCoordinate:                nodeType ++,
		FontStyle:                    nodeType ++,
		ForcePhysicsModel:            nodeType ++,
		GeneratedCubeMapTexture:      nodeType ++,
		GeoCoordinate:                nodeType ++,
		GeoElevationGrid:             nodeType ++,
		GeoLOD:                       nodeType ++,
		GeoLocation:                  nodeType ++,
		GeoMetadata:                  nodeType ++,
		GeoOrigin:                    nodeType ++,
		GeoPositionInterpolator:      nodeType ++,
		GeoProximitySensor:           nodeType ++,
		GeoTouchSensor:               nodeType ++,
		GeoTransform:                 nodeType ++,
		GeoViewpoint:                 nodeType ++,
		Group:                        nodeType ++,
		HAnimDisplacer:               nodeType ++,
		HAnimHumanoid:                nodeType ++,
		HAnimJoint:                   nodeType ++,
		HAnimSegment:                 nodeType ++,
		HAnimSite:                    nodeType ++,
		ImageCubeMapTexture:          nodeType ++,
		ImageTexture:                 nodeType ++,
		ImageTexture3D:               nodeType ++,
		IndexedFaceSet:               nodeType ++,
		IndexedLineSet:               nodeType ++,
		IndexedQuadSet:               nodeType ++,
		IndexedTriangleFanSet:        nodeType ++,
		IndexedTriangleSet:           nodeType ++,
		IndexedTriangleStripSet:      nodeType ++,
		Inline:                       nodeType ++,
		IntegerSequencer:             nodeType ++,
		IntegerTrigger:               nodeType ++,
		KeySensor:                    nodeType ++,
		LOD:                          nodeType ++,
		Layer:                        nodeType ++,
		LayerSet:                     nodeType ++,
		Layout:                       nodeType ++,
		LayoutGroup:                  nodeType ++,
		LayoutLayer:                  nodeType ++,
		LinePickSensor:               nodeType ++,
		LineProperties:               nodeType ++,
		LineSet:                      nodeType ++,
		LoadSensor:                   nodeType ++,
		LocalFog:                     nodeType ++,
		Material:                     nodeType ++,
		Matrix3VertexAttribute:       nodeType ++,
		Matrix4VertexAttribute:       nodeType ++,
		MetadataBoolean:              nodeType ++,
		MetadataDouble:               nodeType ++,
		MetadataFloat:                nodeType ++,
		MetadataInteger:              nodeType ++,
		MetadataSet:                  nodeType ++,
		MetadataString:               nodeType ++,
		MotorJoint:                   nodeType ++,
		MovieTexture:                 nodeType ++,
		MultiTexture:                 nodeType ++,
		MultiTextureCoordinate:       nodeType ++,
		MultiTextureTransform:        nodeType ++,
		NavigationInfo:               nodeType ++,
		Normal:                       nodeType ++,
		NormalInterpolator:           nodeType ++,
		NurbsCurve:                   nodeType ++,
		NurbsCurve2D:                 nodeType ++,
		NurbsOrientationInterpolator: nodeType ++,
		NurbsPatchSurface:            nodeType ++,
		NurbsPositionInterpolator:    nodeType ++,
		NurbsSet:                     nodeType ++,
		NurbsSurfaceInterpolator:     nodeType ++,
		NurbsSweptSurface:            nodeType ++,
		NurbsSwungSurface:            nodeType ++,
		NurbsTextureCoordinate:       nodeType ++,
		NurbsTrimmedSurface:          nodeType ++,
		OrientationChaser:            nodeType ++,
		OrientationDamper:            nodeType ++,
		OrientationInterpolator:      nodeType ++,
		OrthoViewpoint:               nodeType ++,
		PackagedShader:               nodeType ++,
		ParticleSystem:               nodeType ++,
		PickableGroup:                nodeType ++,
		PixelTexture:                 nodeType ++,
		PixelTexture3D:               nodeType ++,
		PlaneSensor:                  nodeType ++,
		PointEmitter:                 nodeType ++,
		PointLight:                   nodeType ++,
		PointPickSensor:              nodeType ++,
		PointSet:                     nodeType ++,
		Polyline2D:                   nodeType ++,
		PolylineEmitter:              nodeType ++,
		Polypoint2D:                  nodeType ++,
		PositionChaser:               nodeType ++,
		PositionChaser2D:             nodeType ++,
		PositionDamper:               nodeType ++,
		PositionDamper2D:             nodeType ++,
		PositionInterpolator:         nodeType ++,
		PositionInterpolator2D:       nodeType ++,
		PrimitivePickSensor:          nodeType ++,
		ProgramShader:                nodeType ++,
		ProximitySensor:              nodeType ++,
		QuadSet:                      nodeType ++,
		ReceiverPdu:                  nodeType ++,
		Rectangle2D:                  nodeType ++,
		RigidBody:                    nodeType ++,
		RigidBodyCollection:          nodeType ++,
		ScalarChaser:                 nodeType ++,
		ScalarDamper:                 nodeType ++,
		ScalarInterpolator:           nodeType ++,
		ScreenFontStyle:              nodeType ++,
		ScreenGroup:                  nodeType ++,
		Script:                       nodeType ++,
		ShaderPart:                   nodeType ++,
		ShaderProgram:                nodeType ++,
		Shape:                        nodeType ++,
		SignalPdu:                    nodeType ++,
		SingleAxisHingeJoint:         nodeType ++,
		SliderJoint:                  nodeType ++,
		Sound:                        nodeType ++,
		Sphere:                       nodeType ++,
		SphereSensor:                 nodeType ++,
		SplinePositionInterpolator:   nodeType ++,
		SplinePositionInterpolator2D: nodeType ++,
		SplineScalarInterpolator:     nodeType ++,
		SpotLight:                    nodeType ++,
		SquadOrientationInterpolator: nodeType ++,
		StaticGroup:                  nodeType ++,
		StringSensor:                 nodeType ++,
		SurfaceEmitter:               nodeType ++,
		Switch:                       nodeType ++,
		TexCoordChaser2D:             nodeType ++,
		TexCoordDamper2D:             nodeType ++,
		Text:                         nodeType ++,
		TextureBackground:            nodeType ++,
		TextureCoordinate:            nodeType ++,
		TextureCoordinate3D:          nodeType ++,
		TextureCoordinate4D:          nodeType ++,
		TextureCoordinateGenerator:   nodeType ++,
		TextureProperties:            nodeType ++,
		TextureTransform:             nodeType ++,
		TextureTransform3D:           nodeType ++,
		TextureTransformMatrix3D:     nodeType ++,
		TimeSensor:                   nodeType ++,
		TimeTrigger:                  nodeType ++,
		TouchGroup:                   nodeType ++,
		TouchSensor:                  nodeType ++,
		Transform:                    nodeType ++,
		TransformSensor:              nodeType ++,
		TransmitterPdu:               nodeType ++,
		TriangleFanSet:               nodeType ++,
		TriangleSet:                  nodeType ++,
		TriangleSet2D:                nodeType ++,
		TriangleStripSet:             nodeType ++,
		TwoSidedMaterial:             nodeType ++,
		UniversalJoint:               nodeType ++,
		Viewpoint:                    nodeType ++,
		ViewpointGroup:               nodeType ++,
		Viewport:                     nodeType ++,
		VisibilitySensor:             nodeType ++,
		VolumeEmitter:                nodeType ++,
		VolumePickSensor:             nodeType ++,
		WindPhysicsModel:             nodeType ++,
		WorldInfo:                    nodeType ++,

		// Abstract node

		X3DBaseNode:                  nodeType ++,

		X3DAppearanceChildNode:       nodeType ++,
		X3DAppearanceNode:            nodeType ++,
		X3DBackgroundNode:            nodeType ++,
		X3DBindableNode:              nodeType ++,
		X3DBoundedObject:             nodeType ++,
		X3DChaserNode:                nodeType ++,
		X3DChildNode:                 nodeType ++,
		X3DColorNode:                 nodeType ++,
		X3DComposedGeometryNode:      nodeType ++,
		X3DCoordinateNode:            nodeType ++,
		X3DDamperNode:                nodeType ++,
		X3DDragSensorNode:            nodeType ++,
		X3DEnvironmentTextureNode:    nodeType ++,
		X3DEnvironmentalSensorNode:   nodeType ++,
		X3DFogObject:                 nodeType ++,
		X3DFollowerNode:              nodeType ++,
		X3DFontStyleNode:             nodeType ++,
		X3DGeometricPropertyNode:     nodeType ++,
		X3DGeometryNode:              nodeType ++,
		X3DGeospatialObject:          nodeType ++,
		X3DGroupingNode:              nodeType ++,
		X3DInfoNode:                  nodeType ++,
		X3DInterpolatorNode:          nodeType ++,
		X3DKeyDeviceSensorNode:       nodeType ++,
		X3DLayerNode:                 nodeType ++,
		X3DLayoutNode:                nodeType ++,
		X3DLightNode:                 nodeType ++,
		X3DLineGeometryNode:          nodeType ++,
		X3DMaterialNode:              nodeType ++,
		X3DMetadataObject:            nodeType ++,
		X3DNBodyCollidableNode:       nodeType ++,
		X3DNBodyCollisionSpaceNode:   nodeType ++,
		X3DNetworkSensorNode:         nodeType ++,
		X3DNode:                      nodeType ++,
		X3DNormalNode:                nodeType ++,
		X3DNurbsControlCurveNode:     nodeType ++,
		X3DNurbsSurfaceGeometryNode:  nodeType ++,
		X3DParametricGeometryNode:    nodeType ++,
		X3DParticleEmitterNode:       nodeType ++,
		X3DParticlePhysicsModelNode:  nodeType ++,
		X3DPickSensorNode:            nodeType ++,
		X3DPickableObject:            nodeType ++,
		X3DPointingDeviceSensorNode:  nodeType ++,
		X3DProductStructureChildNode: nodeType ++,
		X3DProgrammableShaderObject:  nodeType ++,
		X3DPrototypeInstance:         nodeType ++,
		X3DRigidJointNode:            nodeType ++,
		X3DScriptNode:                nodeType ++,
		X3DSensorNode:                nodeType ++,
		X3DSequencerNode:             nodeType ++,
		X3DShaderNode:                nodeType ++,
		X3DShapeNode:                 nodeType ++,
		X3DSoundNode:                 nodeType ++,
		X3DSoundSourceNode:           nodeType ++,
		X3DTexture2DNode:             nodeType ++,
		X3DTexture3DNode:             nodeType ++,
		X3DTextureCoordinateNode:     nodeType ++,
		X3DTextureNode:               nodeType ++,
		X3DTextureTransformNode:      nodeType ++,
		X3DTimeDependentNode:         nodeType ++,
		X3DTouchSensorNode:           nodeType ++,
		X3DTransformMatrix3DNode:     nodeType ++,
		X3DTransformNode:             nodeType ++,
		X3DTriggerNode:               nodeType ++,
		X3DUrlObject:                 nodeType ++,
		X3DVertexAttributeNode:       nodeType ++,
		X3DViewpointNode:             nodeType ++,
		X3DViewportNode:              nodeType ++,

		X3DProtoDeclarationNode:      nodeType ++,
		X3DProtoDeclaration:          nodeType ++,
		X3DExternProtoDeclaration:    nodeType ++,
	};

	Object .preventExtensions (X3DConstants);
	Object .freeze (X3DConstants);
	Object .seal (X3DConstants);

	return X3DConstants;
});
