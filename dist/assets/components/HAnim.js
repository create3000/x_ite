/* X_ITE v9.1.6 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components\")"
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Rendering/X3DGeometricPropertyNode\")"
const X3DGeometricPropertyNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Rendering/X3DGeometricPropertyNode");
var X3DGeometricPropertyNode_default = /*#__PURE__*/__webpack_require__.n(X3DGeometricPropertyNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimDisplacer.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/







function HAnimDisplacer (executionContext)
{
   X3DGeometricPropertyNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimDisplacer);

   this ._displacements .setUnit ("length");
}

Object .setPrototypeOf (HAnimDisplacer .prototype, (X3DGeometricPropertyNode_default()).prototype);

Object .defineProperties (HAnimDisplacer,
{
   typeName:
   {
      value: "HAnimDisplacer",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "displacers",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",      new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",   new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "name",          new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weight",        new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "coordIndex",    new (Fields_default()).MFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "displacements", new (Fields_default()).MFVec3f ()),
      ]),
      enumerable: true,
   },
});

const __default__ = HAnimDisplacer;
;

Namespace_default().add ("HAnimDisplacer", "x_ite/Components/HAnim/HAnimDisplacer", __default__);
/* harmony default export */ const HAnim_HAnimDisplacer = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/Group\")"
const Group_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/Group");
var Group_default = /*#__PURE__*/__webpack_require__.n(Group_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/Transform\")"
const Transform_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/Transform");
var Transform_default = /*#__PURE__*/__webpack_require__.n(Transform_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DBoundedObject\")"
const X3DBoundedObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/X3DBoundedObject");
var X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(X3DBoundedObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/TraverseType");
var TraverseType_default = /*#__PURE__*/__webpack_require__.n(TraverseType_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Algorithm");
var Algorithm_default = /*#__PURE__*/__webpack_require__.n(Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimHumanoid.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/














function HAnimHumanoid (executionContext)
{
   X3DChildNode_default().call (this, executionContext);
   X3DBoundedObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimHumanoid);

   this .addChildObjects ((X3DConstants_default()).inputOutput, "jointTextures",              new (Fields_default()).SFTime (),
                          (X3DConstants_default()).inputOutput, "displacementsTexture",       new (Fields_default()).SFTime (),
                          (X3DConstants_default()).inputOutput, "displacementWeightsTexture", new (Fields_default()).SFTime ());

   // Units

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
   this ._bboxSize    .setUnit ("length");
   this ._bboxCenter  .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._version = "";

   // Private properties

   this .skeletonNode         = new (Group_default()) (executionContext);
   this .viewpointsNode       = new (Group_default()) (executionContext);
   this .skinNode             = new (Group_default()) (executionContext);
   this .transformNode        = new (Transform_default()) (executionContext);
   this .motionNodes          = [ ];
   this .jointNodes           = [ ];
   this .jointBindingMatrices = [ ];
   this .displacementWeights  = [ ];
   this .numJoints            = 0;
   this .numDisplacements     = 0;
   this .skinCoordNode        = null;
   this .change               = new Lock ();
   this .skinning             = Function .prototype;
}

Object .assign (Object .setPrototypeOf (HAnimHumanoid .prototype, (X3DChildNode_default()).prototype),
   (X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      X3DChildNode_default().prototype .initialize .call (this);
      X3DBoundedObject_default().prototype .initialize .call (this);

      // Groups

      this .skeletonNode   .setAllowedTypes ((X3DConstants_default()).HAnimJoint, (X3DConstants_default()).HAnimSite);
      this .viewpointsNode .setAllowedTypes ((X3DConstants_default()).HAnimSite);

      this ._skeleton   .addFieldInterest (this .skeletonNode   ._children);
      this ._viewpoints .addFieldInterest (this .viewpointsNode ._children);
      this ._skin       .addFieldInterest (this .skinNode       ._children);

      this .skeletonNode   ._children = this ._skeleton;
      this .viewpointsNode ._children = this ._viewpoints;
      this .skinNode       ._children = this ._skin;

      this .skeletonNode   .setPrivate (true);
      this .viewpointsNode .setPrivate (true);
      this .skinNode       .setPrivate (true);

      // Transform

      this ._translation      .addFieldInterest (this .transformNode ._translation);
      this ._rotation         .addFieldInterest (this .transformNode ._rotation);
      this ._scale            .addFieldInterest (this .transformNode ._scale);
      this ._scaleOrientation .addFieldInterest (this .transformNode ._scaleOrientation);
      this ._center           .addFieldInterest (this .transformNode ._center);
      this ._bboxDisplay      .addFieldInterest (this .transformNode ._bboxDisplay);
      this ._bboxSize         .addFieldInterest (this .transformNode ._bboxSize);
      this ._bboxCenter       .addFieldInterest (this .transformNode ._bboxCenter);

      this .transformNode ._translation      = this ._translation;
      this .transformNode ._rotation         = this ._rotation;
      this .transformNode ._scale            = this ._scale;
      this .transformNode ._scaleOrientation = this ._scaleOrientation;
      this .transformNode ._center           = this ._center;
      this .transformNode ._bboxDisplay      = this ._bboxDisplay;
      this .transformNode ._bboxSize         = this ._bboxSize;
      this .transformNode ._bboxCenter       = this ._bboxCenter;
      this .transformNode ._children         = [ this .skeletonNode, this .viewpointsNode, this .skinNode ];

      this .transformNode ._isCameraObject   .addFieldInterest (this ._isCameraObject);
      this .transformNode ._isPickableObject .addFieldInterest (this ._isPickableObject);

      // Setup

      this .skeletonNode   .setup ();
      this .viewpointsNode .setup ();
      this .skinNode       .setup ();
      this .transformNode  .setup ();

      this .setCameraObject   (this .transformNode .isCameraObject ());
      this .setPickableObject (this .transformNode .isPickableObject ());

      // Check WebGL version.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      if (gl .getVersion () === 1)
         return;

      // Prepare skinNode.

      this .skinNode .traverse = function (humanoidNode, type, renderObject)
      {
         renderObject .getHumanoids () .push (humanoidNode);

         Group_default().prototype .traverse .call (this, type, renderObject);

         renderObject .getHumanoids () .pop ();
      }
      .bind (this .skinNode, this);

      // Textures

      this .jointsTexture        = gl .createTexture ();
      this .displacementsTexture = gl .createTexture ();
      this .jointMatricesTexture = gl .createTexture ();

      for (const texture of [this .jointsTexture, this .displacementsTexture, this .jointMatricesTexture])
      {
         gl .bindTexture (gl .TEXTURE_2D, texture);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      }

      // Events

      this ._motionsEnabled             .addInterest ("set_motions__",                    this);
      this ._motions                    .addInterest ("set_motions__",                    this);
      this ._jointBindingPositions      .addInterest ("set_joints__",                     this);
      this ._jointBindingRotations      .addInterest ("set_joints__",                     this);
      this ._jointBindingScales         .addInterest ("set_joints__",                     this);
      this ._joints                     .addInterest ("set_joints__",                     this);
      this ._jointTextures              .addInterest ("set_jointTextures__",              this);
      this ._displacementsTexture       .addInterest ("set_displacementsTexture__",       this);
      this ._displacementWeightsTexture .addInterest ("set_displacementWeightsTexture__", this);
      this ._skinCoord                  .addInterest ("set_skinCoord__",                  this);

      this .set_motions__ ();
      this .set_joints__ ();
      this .set_skinCoord__ ();
   },
   getBBox (bbox, shadows)
   {
      return this .transformNode .getBBox (bbox, shadows);
   },
   getMatrix ()
   {
      return this .transformNode .getMatrix ();
   },
   getHumanoidKey ()
   {
      return this .numJoints + "." + this .numDisplacements;
   },
   getNumJoints ()
   {
      return this .numJoints;
   },
   getNumDisplacements ()
   {
      return this .numDisplacements;
   },
   set_motions__ ()
   {
      const
         motionsEnabled = this ._motionsEnabled,
         motionNodes    = this .motionNodes;

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .removeInterest ("set_connectJoints__", this);
         motionNode ._channelsEnabled .removeInterest ("set_connectJoints__", this);
         motionNode ._channels        .removeInterest ("set_connectJoints__", this);
         motionNode ._values          .removeInterest ("set_connectJoints__", this);

         motionNode .disconnectJoints (this .jointNodes);
      }

      motionNodes .length = 0;

      for (const [i, node] of this ._motions .entries ())
      {
         if (i < motionsEnabled .length && !motionsEnabled [i])
            continue;

         const motionNode = X3DCast_default() ((X3DConstants_default()).HAnimMotion, node);

         if (motionNode)
            motionNodes .push (motionNode);
      }

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channelsEnabled .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channels        .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._values          .addInterest ("set_connectJoints__", this, motionNode);

         motionNode .connectJoints (this .jointNodes);
      }
   },
   set_connectJoints__ (motionNode)
   {
      motionNode .disconnectJoints (this .jointNodes);
      motionNode .connectJoints (this .jointNodes);
   },
   set_joints__ ()
   {
      const
         jointNodes            = this .jointNodes,
         jointBindingMatrices  = this .jointBindingMatrices,
         jointBindingPositions = this ._jointBindingPositions,
         jointBindingRotations = this ._jointBindingRotations,
         jointBindingScales    = this ._jointBindingScales;

      for (const motionNode of this .motionNodes)
         motionNode .disconnectJoints (jointNodes);

      for (const jointNode of jointNodes)
      {
         jointNode .removeInterest ("enable", this .change);

         jointNode ._skinCoordIndex      .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .removeInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      jointNodes           .length = 0;
      jointBindingMatrices .length = 0;

      for (const [i, node] of this ._joints .entries ())
      {
         const jointNode = X3DCast_default() ((X3DConstants_default()).HAnimJoint, node);

         if (!jointNode)
            continue;

         const jointBindingMatrix = new (Matrix4_default()) ();

         if (jointBindingPositions .length)
            jointBindingMatrix .translate (jointBindingPositions [Math .min (i, jointBindingPositions .length - 1)] .getValue ());

         if (jointBindingRotations .length)
            jointBindingMatrix .rotate (jointBindingRotations [Math .min (i, jointBindingRotations .length - 1)] .getValue ());

         if (jointBindingScales .length)
            jointBindingMatrix .scale (jointBindingScales [Math .min (i, jointBindingScales .length - 1)] .getValue ());

         jointNodes           .push (jointNode);
         jointBindingMatrices .push (jointBindingMatrix);
      }

      for (const jointNode of jointNodes)
      {
         jointNode .addInterest ("enable", this .change);

         jointNode ._skinCoordIndex      .addInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .addInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .addInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .addInterest ("addEvent", this ._displacementWeightsTexture);
      }

      for (const motionNode of this .motionNodes)
         motionNode .connectJoints (jointNodes);

      const size = Math .ceil (Math .sqrt (jointNodes .length * 8));

      this .jointMatricesArray = new Float32Array (size * size * 4),

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   set_jointTextures__ ()
   {
      // Create arrays.

      const
         length  = this .skinCoordNode ?._point .length || 1,
         joints  = Array .from ({ length }, () => [ ]),
         weights = Array .from ({ length }, () => [ ]);

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         const skinCoordWeight = jointNode ._skinCoordWeight .getValue ();

         for (const [i, index] of jointNode ._skinCoordIndex .entries ())
         {
            const weight = skinCoordWeight [i];

            if (weight === 0)
               continue;

            joints  [index] ?.push (joint);
            weights [index] ?.push (weight);
         }
      }

      const
         numJoints   = Algorithm_default().roundToMultiple (joints .reduce ((p, n) => Math .max (p, n .length), 0), 4),
         numJoints2  = numJoints * 2,
         size        = Math .ceil (Math .sqrt (length * numJoints2)) || 1,
         jointsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
      {
         jointsArray .set (joints  [i], i * numJoints2);
         jointsArray .set (weights [i], i * numJoints2 + numJoints);
      }

      this .numJoints = numJoints;

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointsArray);

      // Trigger update.

      this .change .enable ();
   },
   set_displacementsTexture__ ()
   {
      // Create array.

      const
         length        = this .skinCoordNode ?._point .length || 1,
         displacements = Array .from ({ length }, () => [ ]);

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         for (const displacerNode of jointNode .getDisplacers ())
         {
            const d = displacerNode ._displacements;

            for (const [i, index] of displacerNode ._coordIndex .entries ())
               displacements [index] ?.push (... d [i], joint);
         }
      }

      const
         numDisplacements   = displacements .reduce ((p, n) => Math .max (p, n .length), 0) / 4,
         numElements        = numDisplacements * 4,
         size               = Algorithm_default().roundToMultiple (Math .ceil (Math .sqrt (length * numDisplacements * 2)) || 1, 2),
         displacementsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
         displacementsArray .set (displacements [i], i * numElements);

      this .numDisplacements = numDisplacements;

      // Upload texture.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, displacementsArray);

      // Weights

      const displacementWeights = this .displacementWeights;

      for (let i = displacementWeights .length; i < length; ++ i)
         displacementWeights [i] = [ ];

      displacementWeights .length = length;

      this .displacementWeightsArray = new Float32Array (size * size * 2);

      // Trigger update.

      this .change .enable ();
   },
   set_displacementWeightsTexture__ ()
   {
      // Create array.

      const
         length              = this .skinCoordNode ?._point .length || 1,
         displacementWeights = this .displacementWeights;

      for (const d of displacementWeights)
         d .length = 0;

      for (const jointNode of this .jointNodes)
      {
         for (const displacerNode of jointNode .getDisplacers ())
         {
            const weight = displacerNode ._weight;

            for (const index of displacerNode ._coordIndex)
               displacementWeights [index] ?.push (weight, 0, 0, 0);
         }
      }

      const
         numDisplacements         = this .numDisplacements,
         numElements              = numDisplacements * 4,
         size                     = Algorithm_default().roundToMultiple (Math .ceil (Math .sqrt (length * numDisplacements * 2)) || 1, 2),
         displacementWeightsArray = this .displacementWeightsArray;

      for (let i = 0; i < length; ++ i)
         displacementWeightsArray .set (displacementWeights [i], i * numElements);

      // Upload texture.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .texSubImage2D (gl .TEXTURE_2D, 0, 0, size / 2, size, size / 2, gl .RGBA, gl .FLOAT, displacementWeightsArray)

      // Trigger update.

      this .change .enable ();
   },
   set_skinCoord__ ()
   {
      if (this .skinCoordNode)
      {
         this .skinCoordNode .removeInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this .skinCoordNode = X3DCast_default() ((X3DConstants_default()).X3DCoordinateNode, this ._skinCoord);

      if (this .skinCoordNode)
      {
         delete this .skinning;

         this .skinCoordNode .addInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementWeightsTexture);
      }
      else
      {
         this .skinning = Function .prototype;
      }

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   traverse (type, renderObject)
   {
      this .transformNode .traverse (type, renderObject);

      this .skinning (type, renderObject);
   },
   skinning: (() =>
   {
      const invModelViewMatrix = new (Matrix4_default()) ();

      return function (type, renderObject)
      {
         if (type !== (TraverseType_default()).DISPLAY || this .change .lock ())
            return;

         // Determine inverse model matrix of humanoid.

         invModelViewMatrix .assign (this .transformNode .getMatrix ())
            .multRight (renderObject .getModelViewMatrix () .get ()) .inverse ();

         // Create joint matrices.

         const
            jointNodes           = this .jointNodes,
            jointNodesLength     = jointNodes .length,
            jointBindingMatrices = this .jointBindingMatrices,
            jointMatricesArray   = this .jointMatricesArray,
            size                 = Math .ceil (Math .sqrt (jointNodesLength * 8));

         for (let i = 0; i < jointNodesLength; ++ i)
         {
            const
               jointNode          = jointNodes [i],
               jointBindingMatrix = jointBindingMatrices [i],
               jointMatrix        = jointNode .getModelViewMatrix () .multRight (invModelViewMatrix) .multLeft (jointBindingMatrix),
               jointNormalMatrix  = jointMatrix .submatrix .transpose () .inverse ();

            jointMatricesArray .set (jointMatrix,       i * 32 + 0);
            jointMatricesArray .set (jointNormalMatrix, i * 32 + 16);
         }

         // Upload textures.

         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointMatricesArray);
      };
   })(),
   setShaderUniforms (gl, shaderObject)
   {
      const
         jointsTextureTextureUnit        = this .getBrowser () .getTexture2DUnit (),
         displacementsTextureTextureUnit = this .getBrowser () .getTexture2DUnit (),
         jointMatricesTextureUnit        = this .getBrowser () .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + jointsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .uniform1i (shaderObject .x3d_JointsTexture, jointsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementsTexture, displacementsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + jointMatricesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .uniform1i (shaderObject .x3d_JointMatricesTexture, jointMatricesTextureUnit);
   },
   dispose ()
   {
      X3DBoundedObject_default().prototype .dispose .call (this);
      X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (HAnimHumanoid,
{
   typeName:
   {
      value: "HAnimHumanoid",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",              new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "version",               new (Fields_default()).SFString ("2.0")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",           new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",                  new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "info",                  new (Fields_default()).MFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skeletalConfiguration", new (Fields_default()).SFString ("BASIC")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "loa",                   new (Fields_default()).SFInt32 (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "translation",           new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rotation",              new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scale",                 new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scaleOrientation",      new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "center",                new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",               new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",           new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",              new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",            new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skeleton",              new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "viewpoints",            new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "sites",                 new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "segments",              new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "motionsEnabled",        new (Fields_default()).MFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "motions",               new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingPositions", new (Fields_default()).MFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingRotations", new (Fields_default()).MFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingScales",    new (Fields_default()).MFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "joints",                new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinBindingNormals",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinBindingCoords",     new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinNormal",            new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinCoord",             new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skin",                  new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

class Lock
{
   #locked = true;

   enable ()
   {
      this .#locked = false;
   }

   lock ()
   {
      const locked = this .#locked;

      this .#locked = true;

      return locked;
   }
}

const HAnimHumanoid_default_ = HAnimHumanoid;
;

Namespace_default().add ("HAnimHumanoid", "x_ite/Components/HAnim/HAnimHumanoid", HAnimHumanoid_default_);
/* harmony default export */ const HAnim_HAnimHumanoid = (HAnimHumanoid_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DTransformNode\")"
const X3DTransformNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/X3DTransformNode");
var X3DTransformNode_default = /*#__PURE__*/__webpack_require__.n(X3DTransformNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimJoint.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function HAnimJoint (executionContext)
{
   X3DTransformNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimJoint);

   this .addChildObjects ((X3DConstants_default()).outputOnly, "displacements",       new (Fields_default()).SFTime (),
                          (X3DConstants_default()).outputOnly, "displacementWeights", new (Fields_default()).SFTime ());

   this .setAllowedTypes ((X3DConstants_default()).HAnimJoint,
                          (X3DConstants_default()).HAnimSegment,
                          (X3DConstants_default()).HAnimSite);

   this .displacerNodes  = [ ];
   this .modelViewMatrix = new (Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (HAnimJoint .prototype, (X3DTransformNode_default()).prototype),
{
   initialize ()
   {
      X3DTransformNode_default().prototype .initialize .call (this);

      this ._displacers .addInterest ("set_displacers__", this);

      this .set_displacers__ ();
   },
   getModelViewMatrix ()
   {
      return this .modelViewMatrix;
   },
   getDisplacers ()
   {
      return this .displacerNodes;
   },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .removeInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .removeInterest ("addEvent", this ._displacementWeights);
      }

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = X3DCast_default() ((X3DConstants_default()).HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .addInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .addInterest ("addEvent", this ._displacementWeights);
      }
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      if (type === (TraverseType_default()).DISPLAY)
         this .modelViewMatrix .assign (modelViewMatrix .get ());

      X3DTransformNode_default().prototype .groupTraverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse (type, renderObject)
   {
      if (type === (TraverseType_default()).DISPLAY)
         this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());

      X3DTransformNode_default().prototype .groupTraverse .call (this, type, renderObject);
   },
});

Object .defineProperties (HAnimJoint,
{
   typeName:
   {
      value: "HAnimJoint",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",      new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",             new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "translation",      new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rotation",         new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scale",            new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scaleOrientation", new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "center",           new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "llimit",           new (Fields_default()).MFFloat (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "ulimit",           new (Fields_default()).MFFloat (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "limitOrientation", new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "stiffness",        new (Fields_default()).MFFloat (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinCoordIndex",   new (Fields_default()).MFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinCoordWeight",  new (Fields_default()).MFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "displacers",       new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",      new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",         new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",       new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",      new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren",   new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",         new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimJoint_default_ = HAnimJoint;
;

Namespace_default().add ("HAnimJoint", "x_ite/Components/HAnim/HAnimJoint", HAnimJoint_default_);
/* harmony default export */ const HAnim_HAnimJoint = (HAnimJoint_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Time/TimeSensor\")"
const TimeSensor_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Time/TimeSensor");
var TimeSensor_default = /*#__PURE__*/__webpack_require__.n(TimeSensor_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Interpolation/PositionInterpolator\")"
const PositionInterpolator_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Interpolation/PositionInterpolator");
var PositionInterpolator_default = /*#__PURE__*/__webpack_require__.n(PositionInterpolator_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Interpolation/OrientationInterpolator\")"
const OrientationInterpolator_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Interpolation/OrientationInterpolator");
var OrientationInterpolator_default = /*#__PURE__*/__webpack_require__.n(OrientationInterpolator_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimMotion.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/













function HAnimMotion (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimMotion);

   this .timeSensor    = new (TimeSensor_default()) (this .getExecutionContext ());
   this .interpolators = [ ];
}

Object .assign (Object .setPrototypeOf (HAnimMotion .prototype, (X3DChildNode_default()).prototype),
{
   initialize ()
   {
      X3DChildNode_default().prototype .initialize .call (this);

      this ._loop .addFieldInterest (this .timeSensor ._loop);

      this .timeSensor ._cycleTime   .addFieldInterest (this ._cycleTime);
      this .timeSensor ._elapsedTime .addFieldInterest (this ._elapsedTime);

      this .timeSensor ._enabled  = false;
      this .timeSensor ._loop     = this ._loop;
      this .timeSensor ._stopTime = 1;

      this .timeSensor .setup ();

      this ._enabled         .addInterest ("set_enabled__",           this);
      this ._joints          .addInterest ("set_joints__",            this);
      this ._channels        .addInterest ("set_interpolators__",     this);
      this ._values          .addInterest ("set_interpolators__",     this);
      this ._next            .addInterest ("set_next_or_previous__",  this,  1);
      this ._previous        .addInterest ("set_next_or_previous__",  this, -1);
      this ._frameIndex      .addInterest ("set_frameIndex__",        this);
      this ._frameDuration   .addInterest ("set_frameDuration__",     this);
      this ._frameIncrement  .addInterest ("set_frameIncrement__",    this);
      this ._startFrame      .addInterest ("set_start_or_endFrame__", this);
      this ._endFrame        .addInterest ("set_start_or_endFrame__", this);

      this .set_enabled__ ();
      this .set_joints__ ();
      this .set_frameIncrement__ ();
      this .set_interpolators__ ();
   },
   connectJoints (jointNodes)
   {
      const
         channelsEnabled = this ._channelsEnabled,
         joints          = this .joints,
         jointsIndex     = this .getJointsIndex (jointNodes);

      // Connect interpolators.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         if (j < channelsEnabled .length && !channelsEnabled [j])
            continue;

         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .addFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .addFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .addFieldInterest (jointNode ._scale);
      }
   },
   disconnectJoints (jointNodes)
   {
      const
         joints      = this .joints,
         jointsIndex = this .getJointsIndex (jointNodes);

      // Disconnect joint nodes.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .removeFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .removeFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .removeFieldInterest (jointNode ._scale);
      }
   },
   getJointsIndex (jointNodes)
   {
      const jointsIndex = new Map (jointNodes .map (jointNode => [jointNode ._name .getValue () .trim (), jointNode]));

      jointsIndex .delete ("IGNORED");
      jointsIndex .set ("HumanoidRoot", jointsIndex .get ("humanoid_root"));

      return jointsIndex;
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .timeSensor ._startTime = Date .now () / 1000;
      else
         this .timeSensor ._stopTime = Date .now () / 1000;
   },
   set_joints__ ()
   {
      this .joints = this ._joints .getValue () .replace (/^[\s,]+|[\s,]+$/sg, "") .split (/[\s,]+/s);

      // Disconnect all joint nodes.

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of this .interpolators)
      {
         positionInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => positionInterpolator ._value_changed .removeFieldInterest (field));

         orientationInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => orientationInterpolator ._value_changed .removeFieldInterest (field));

         scaleInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => scaleInterpolator ._value_changed .removeFieldInterest (field));
      }
   },
   set_interpolators__ ()
   {
      // Disconnect old interpolators.

      const timeSensor = this .timeSensor;

      timeSensor ._fraction_changed .getFieldInterests ()
         .forEach (field => timeSensor ._fraction_changed .removeFieldInterest (field));

      // Create interpolators.

      const channels = this ._channels .getValue ()
         .replace (/^[\s,\d]+|[\s,\d]+$/sg, "")
         .split (/[\s,]+\d+[\s,]+/s)
         .map (string => string .split (/[\s,]+/s));

      const
         values        = this ._values,
         numChannels   = channels .reduce ((v, c) => v + c .length, 0),
         frameCount    = Math .floor (numChannels ? values .length / numChannels : 0),
         types         = new Map (),
         interpolators = Array .from ({length: channels .length}, () => ({ }));

      this .interpolators = interpolators;

      for (let frame = 0, v = 0; frame < frameCount; ++ frame)
      {
         for (const [j, joint] of channels .entries ())
         {
            types .clear ();

            for (const channel of joint)
               types .set (channel, values [v ++]);

            if (types .has ("Xposition") || types .has ("Yposition") || types .has ("Zposition"))
            {
               const interpolator = interpolators [j] .positionInterpolator
                  ?? this .createPositionInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new (Vector3_default()) (types .get ("Xposition") ?? 0,
                                          types .get ("Yposition") ?? 0,
                                          types .get ("Zposition") ?? 0);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xrotation") || types .has ("Yrotation") || types .has ("Zrotation"))
            {
               const interpolator = interpolators [j] .orientationInterpolator
                  ?? this .createOrientationInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = Rotation4_default().fromEuler (Algorithm_default().radians (types .get ("Xrotation") ?? 0),
                                                   Algorithm_default().radians (types .get ("Yrotation") ?? 0),
                                                   Algorithm_default().radians (types .get ("Zrotation") ?? 0));

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xscale") || types .has ("Yscale") || types .has ("Zscale"))
            {
               const interpolator = interpolators [j] .scaleInterpolator
                  ?? this .createScaleInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new (Vector3_default()) (types .get ("Xscale") ?? 1,
                                          types .get ("Yscale") ?? 1,
                                          types .get ("Zscale") ?? 1);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }
         }
      }

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of interpolators)
      {
         positionInterpolator    ?.setup ();
         orientationInterpolator ?.setup ();
         scaleInterpolator       ?.setup ();
      }

      this ._frameIndex = 0;
      this ._startFrame = 0;
      this ._endFrame   = frameCount - 1;
      this ._frameCount = frameCount;

      this .set_frameDuration__ ();
   },
   set_next_or_previous__ (direction, field)
   {
      if (!field .getValue ())
         return;

      const
         fraction       = this .getFraction (),
         frameCount     = this ._frameCount .getValue (),
         frameIncrement = this ._frameIncrement .getValue (),
         frameIndex     = (frameCount > 1 ? Math .floor (fraction * (frameCount - 1)) : 0) + frameIncrement * direction;

      if (frameIndex > this .endFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .startFrame;
      }
      else if (frameIndex < this .startFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .endFrame;
      }
      else
      {
         this ._frameIndex = frameIndex;
      }
   },
   set_frameIndex__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         frameIndex = Algorithm_default().clamp (this ._frameIndex .getValue (), 0, frameCount),
         fraction   = frameCount > 1 ? frameIndex / (frameCount - 1) : 0;

      this .timeSensor ._range [0] = fraction;

      if (this .timeSensor ._isActive .getValue ())
         return;

      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         field .setValue (fraction);
   },
   set_frameDuration__ ()
   {
      const
         frameCount    = this ._frameCount .getValue (),
         frameDuration = Math .max (this ._frameDuration .getValue (), 0);

      this .timeSensor ._cycleInterval = frameCount > 1 ? (frameCount - 1) * frameDuration : 0;
   },
   set_frameIncrement__ ()
   {
      this .timeSensor ._enabled = this ._frameIncrement .getValue ();
   },
   set_start_or_endFrame__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         startFrame = Algorithm_default().clamp (this ._startFrame .getValue (), 0, frameCount),
         endFrame   = Algorithm_default().clamp (this ._endFrame   .getValue (), 0, frameCount);

      this .startFrame             = Math .min (startFrame, endFrame);
      this .endFrame               = Math .max (startFrame, endFrame);
      this .timeSensor ._range [1] = frameCount > 1 ? this .startFrame / (frameCount - 1) : 0;
      this .timeSensor ._range [2] = frameCount > 1 ? this .endFrame   / (frameCount - 1) : 0;
   },
   createPositionInterpolator (interpolators, j)
   {
      return interpolators [j] .positionInterpolator = new (PositionInterpolator_default()) (this .getExecutionContext ());
   },
   createOrientationInterpolator (interpolators, j)
   {
      return interpolators [j] .orientationInterpolator = new (OrientationInterpolator_default()) (this .getExecutionContext ());
   },
   createScaleInterpolator (interpolators, j)
   {
      return interpolators [j] .scaleInterpolator = new (PositionInterpolator_default()) (this .getExecutionContext ());
   },
   getFraction ()
   {
      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         return field .getValue ();

      return 0;
   },
});

Object .defineProperties (HAnimMotion,
{
   typeName:
   {
      value: "HAnimMotion",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "motions",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "4.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",     new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "name",            new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",         new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "loa",             new (Fields_default()).SFInt32 (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "joints",          new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "channelsEnabled", new (Fields_default()).MFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "channels",        new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "values",          new (Fields_default()).MFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "loop",            new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "next",            new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "previous",        new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameIndex",      new (Fields_default()).SFInt32 (0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameDuration",   new (Fields_default()).SFTime (0.1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameIncrement",  new (Fields_default()).SFInt32 (1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "startFrame",      new (Fields_default()).SFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "endFrame",        new (Fields_default()).SFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "cycleTime",       new (Fields_default()).SFTime ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "elapsedTime",     new (Fields_default()).SFTime ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "frameCount",      new (Fields_default()).SFInt32 ()),
      ]),
      enumerable: true,
   },
});

const HAnimMotion_default_ = HAnimMotion;
;

Namespace_default().add ("HAnimMotion", "x_ite/Components/HAnim/HAnimMotion", HAnimMotion_default_);
/* harmony default export */ const HAnim_HAnimMotion = (HAnimMotion_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DGroupingNode\")"
const X3DGroupingNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/X3DGroupingNode");
var X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(X3DGroupingNode_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimSegment.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/







function HAnimSegment (executionContext)
{
   X3DGroupingNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimSegment);

   this ._mass .setUnit ("mass");
}

Object .setPrototypeOf (HAnimSegment .prototype, (X3DGroupingNode_default()).prototype);

Object .defineProperties (HAnimSegment,
{
   typeName:
   {
      value: "HAnimSegment",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",      new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",             new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "mass",             new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "centerOfMass",     new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "momentsOfInertia", new (Fields_default()).MFFloat (0, 0, 0, 0, 0, 0, 0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "displacers",       new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "coord",            new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",      new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",         new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",       new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",      new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren",   new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",         new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimSegment_default_ = HAnimSegment;
;

Namespace_default().add ("HAnimSegment", "x_ite/Components/HAnim/HAnimSegment", HAnimSegment_default_);
/* harmony default export */ const HAnim_HAnimSegment = (HAnimSegment_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/HAnim/HAnimSite.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/







function HAnimSite (executionContext)
{
   X3DTransformNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).HAnimSite);
}

Object .setPrototypeOf (HAnimSite .prototype, (X3DTransformNode_default()).prototype);

Object .defineProperties (HAnimSite,
{
   typeName:
   {
      value: "HAnimSite",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",      new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",             new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "translation",      new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rotation",         new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scale",            new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scaleOrientation", new (Fields_default()).SFRotation ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "center",           new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",      new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",         new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",       new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",      new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren",   new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",         new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimSite_default_ = HAnimSite;
;

Namespace_default().add ("HAnimSite", "x_ite/Components/HAnim/HAnimSite", HAnimSite_default_);
/* harmony default export */ const HAnim_HAnimSite = (HAnimSite_default_);
;// CONCATENATED MODULE: ./src/assets/components/HAnim.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









Components_default().add ({
   name: "HAnim",
   concreteNodes:
   [
      HAnim_HAnimDisplacer,
      HAnim_HAnimHumanoid,
      HAnim_HAnimJoint,
      HAnim_HAnimMotion,
      HAnim_HAnimSegment,
      HAnim_HAnimSite,
   ],
   abstractNodes:
   [
   ],
});

const HAnim_default_ = undefined;
;

Namespace_default().add ("HAnim", "assets/components/HAnim", HAnim_default_);
/* harmony default export */ const HAnim = ((/* unused pure expression or super */ null && (HAnim_default_)));
/******/ })()
;