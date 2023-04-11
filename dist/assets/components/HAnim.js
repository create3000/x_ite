/* X_ITE v8.6.15 */(() => { // webpackBootstrap
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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Rendering/X3DGeometricPropertyNode\")"
const X3DGeometricPropertyNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Rendering/X3DGeometricPropertyNode");
var X3DGeometricPropertyNode_default = /*#__PURE__*/__webpack_require__.n(X3DGeometricPropertyNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Namespace");
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

HAnimDisplacer .prototype = Object .assign (Object .create ((X3DGeometricPropertyNode_default()).prototype),
{
   constructor: HAnimDisplacer,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",   new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "name",          new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "coordIndex",    new (Fields_default()).MFInt32 ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weight",        new (Fields_default()).SFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "displacements", new (Fields_default()).MFVec3f ()),
   ]),
   getTypeName: function ()
   {
      return "HAnimDisplacer";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "displacers";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
});

const __default__ = HAnimDisplacer;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimDisplacer", __default__);
/* harmony default export */ const HAnim_HAnimDisplacer = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/Group\")"
const Group_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Grouping/Group");
var Group_default = /*#__PURE__*/__webpack_require__.n(Group_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/Transform\")"
const Transform_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Grouping/Transform");
var Transform_default = /*#__PURE__*/__webpack_require__.n(Transform_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DBoundedObject\")"
const X3DBoundedObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Grouping/X3DBoundedObject");
var X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(X3DBoundedObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Rendering/TraverseType");
var TraverseType_default = /*#__PURE__*/__webpack_require__.n(TraverseType_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
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

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
   this ._bboxSize    .setUnit ("length");
   this ._bboxCenter  .setUnit ("length");

   this .skeletonNode   = new (Group_default()) (executionContext);
   this .viewpointsNode = new (Group_default()) (executionContext);
   this .skinNode       = new (Group_default()) (executionContext);
   this .transformNode  = new (Transform_default()) (executionContext);
   this .jointNodes     = [ ];
   this .skinNormalNode = null;
   this .skinCoordNode  = null;
   this .restNormalNode = null;
   this .restCoordNode  = null;
   this .changed        = false;
}

HAnimHumanoid .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
   (X3DBoundedObject_default()).prototype,
{
   constructor: HAnimHumanoid,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",              new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",           new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",                  new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "version",               new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "info",                  new (Fields_default()).MFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "translation",           new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rotation",              new (Fields_default()).SFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scale",                 new (Fields_default()).SFVec3f (1, 1, 1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scaleOrientation",      new (Fields_default()).SFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "center",                new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingPositions", new (Fields_default()).MFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingRotations", new (Fields_default()).MFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "jointBindingScales",    new (Fields_default()).MFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "motionsEnabled",        new (Fields_default()).MFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "loa",                   new (Fields_default()).SFInt32 (-1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skeletalConfiguration", new (Fields_default()).SFString ("BASIC")),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",               new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",              new (Fields_default()).SFVec3f (-1, -1, -1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",            new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skeleton",              new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "viewpoints",            new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "sites",                 new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "segments",              new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "joints",                new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "motions",               new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinBindingNormal",     new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinBindingCoord",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinNormal",            new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skinCoord",             new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "skin",                  new (Fields_default()).MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "HAnimHumanoid";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);
      X3DBoundedObject_default().prototype.initialize.call (this);

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
      this ._visible          .addFieldInterest (this .transformNode ._visible);
      this ._bboxDisplay      .addFieldInterest (this .transformNode ._bboxDisplay);
      this ._bboxSize         .addFieldInterest (this .transformNode ._bboxSize);
      this ._bboxCenter       .addFieldInterest (this .transformNode ._bboxCenter);

      this .transformNode ._translation      = this ._translation;
      this .transformNode ._rotation         = this ._rotation;
      this .transformNode ._scale            = this ._scale;
      this .transformNode ._scaleOrientation = this ._scaleOrientation;
      this .transformNode ._center           = this ._center;
      this .transformNode ._visible          = this ._visible;
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

      // Skinning

      this ._joints     .addInterest ("set_joints__",     this);
      this ._skinNormal .addInterest ("set_skinNormal__", this);
      this ._skinCoord  .addInterest ("set_skinCoord__",  this);

      this .set_joints__ ();
      this .set_skinNormal__ ();
      this .set_skinCoord__ ();
   },
   getBBox: function (bbox, shadows)
   {
      return this .transformNode .getBBox (bbox, shadows);
   },
   set_joints__: function ()
   {
      const jointNodes = this .jointNodes;

      for (const jointNode of jointNodes)
         jointNode .removeInterest ("set_joint__", this);

      jointNodes .length = 0;

      for (const node of this ._joints)
      {
         const jointNode = X3DCast_default() ((X3DConstants_default()).HAnimJoint, node);

         if (jointNode)
            jointNodes .push (jointNode);
      }

      for (const jointNode of jointNodes)
         jointNode .addInterest ("set_joint__", this);

      this .set_joint__ ();
   },
   set_joint__: function ()
   {
      this .changed = true;
   },
   set_skinNormal__: function ()
   {
      this .restNormalNode = null;

      this .skinNormalNode = X3DCast_default() ((X3DConstants_default()).X3DNormalNode, this ._skinNormal);

      if (this .skinNormalNode)
         this .restNormalNode = this .skinNormalNode .copy ();

      this .changed = true;
   },
   set_skinCoord__: function ()
   {
      this .restCoordNode = null;

      this .skinCoordNode = X3DCast_default() ((X3DConstants_default()).X3DCoordinateNode, this ._skinCoord);

      if (this .skinCoordNode)
      {
         this .restCoordNode = this .skinCoordNode .copy ();

         delete this .skinning;
      }
      else
      {
         this .skinning = Function .prototype
      }

      this .changed = true;
   },
   traverse: function (type, renderObject)
   {
      this .transformNode .traverse (type, renderObject);

      this .skinning (type, renderObject);
   },
   skinning: (function ()
   {
      const
         invModelMatrix = new (Matrix4_default()) (),
         vector         = new (Vector3_default()) (0, 0, 0),
         rest           = new (Vector3_default()) (0, 0, 0),
         skin           = new (Vector3_default()) (0, 0, 0),
         point          = new (Vector3_default()) (0, 0, 0);

      return function (type, renderObject)
      {
         if (type !== (TraverseType_default()).CAMERA)
            return;

         if (!this .changed)
            return;

         this .changed = false;

         const
            jointNodes     = this .jointNodes,
            skinNormalNode = this .skinNormalNode,
            skinCoordNode  = this .skinCoordNode,
            restNormalNode = this .restNormalNode,
            restCoordNode  = this .restCoordNode;

         // Reset skin normals and coords.

         if (skinNormalNode)
            skinNormalNode ._vector .assign (restNormalNode ._vector);

         skinCoordNode ._point .assign (restCoordNode ._point);

         // Determine inverse model matrix of humanoid.

         invModelMatrix .assign (this .transformNode .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ()) .inverse ();

         // Apply joint transformations.

         for (const jointNode of jointNodes)
         {
            const
               skinCoordIndexLength = jointNode ._skinCoordIndex .length,
               jointMatrix          = jointNode .getModelMatrix () .multRight (invModelMatrix),
               displacerNodes       = jointNode .getDisplacers ();

            for (const displacerNode of displacerNodes)
            {
               const
                  coordIndex          = displacerNode ._coordIndex .getValue (),
                  coordIndexLength    = displacerNode ._coordIndex .length,
                  weight              = displacerNode ._weight .getValue (),
                  displacements       = displacerNode ._displacements .getValue (),
                  displacementsLength = displacerNode ._displacements .length;

               for (let i = 0; i < coordIndexLength; ++ i)
               {
                  const
                     i3           = i * 3,
                     index        = coordIndex [i],
                     displacement = i < displacementsLength ? point .set (displacements [i3], displacements [i3 + 1], displacements [i3 + 2]) : point .assign ((Vector3_default()).Zero);

                  skinCoordNode .get1Point (index, skin);
                  jointMatrix .multDirMatrix (displacement) .multiply (weight) .add (skin);
                  skinCoordNode .set1Point (index, displacement);
               }
            }

            const
               normalMatrix          = skinNormalNode ? jointMatrix .submatrix .transpose () .inverse () : null,
               skinCoordIndex        = jointNode ._skinCoordIndex .getValue (),
               skinCoordWeight       = jointNode ._skinCoordWeight .getValue (),
               skinCoordWeightLength = jointNode ._skinCoordWeight .length;

            for (let i = 0; i < skinCoordIndexLength; ++ i)
            {
               const
                  index  = skinCoordIndex [i],
                  weight = i < skinCoordWeightLength ? skinCoordWeight [i] : 1;

               if (skinNormalNode)
               {
                  rest .assign (restNormalNode .get1Vector (index, vector));
                  skinNormalNode .get1Vector (index, skin);
                  normalMatrix .multVecMatrix (vector) .subtract (rest) .multiply (weight) .add (skin);
                  skinNormalNode .set1Vector (index, vector);
                  // Should the normals be normalized at end, or let it the shader do?
               }

               //skin += (rest * J - rest) * weight
               rest .assign (restCoordNode .get1Point (index, point));
               skinCoordNode .get1Point (index, skin);
               jointMatrix .multVecMatrix (point) .subtract (rest) .multiply (weight) .add (skin);
               skinCoordNode .set1Point (index, point);
            }
         }
      };
   })(),
   toVRMLStream: function (generator)
   {
      if (this .skinCoordNode)
         this .skinCoordNode ._point = this .restCoordNode ._point;

      if (this .skinNormalNode)
         this .skinNormalNode ._vector = this .restNormalNode ._vector;

      X3DChildNode_default().prototype.toVRMLStream.call (this, generator);
   },
   toXMLStream: function (generator)
   {
      if (this .skinCoordNode)
         this .skinCoordNode ._point = this .restCoordNode ._point;

      if (this .skinNormalNode)
         this .skinNormalNode ._vector = this .restNormalNode ._vector;

      X3DChildNode_default().prototype.toXMLStream.call (this, generator);
   },
   toJSONStream: function (generator)
   {
      if (this .skinCoordNode)
         this .skinCoordNode ._point = this .restCoordNode ._point;

      if (this .skinNormalNode)
         this .skinNormalNode ._vector = this .restNormalNode ._vector;

      X3DChildNode_default().prototype.toJSONStream.call (this, generator);
   },
   dispose: function ()
   {
      X3DBoundedObject_default().prototype.dispose.call (this);
      X3DChildNode_default().prototype.dispose.call (this);
   },
});

const HAnimHumanoid_default_ = HAnimHumanoid;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimHumanoid", HAnimHumanoid_default_);
/* harmony default export */ const HAnim_HAnimHumanoid = (HAnimHumanoid_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DTransformNode\")"
const X3DTransformNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Grouping/X3DTransformNode");
var X3DTransformNode_default = /*#__PURE__*/__webpack_require__.n(X3DTransformNode_namespaceObject);
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

   this .setAllowedTypes ((X3DConstants_default()).HAnimJoint,
                          (X3DConstants_default()).HAnimSegment,
                          (X3DConstants_default()).HAnimSite);

   this .displacerNodes = [ ];
   this .modelMatrix    = new (Matrix4_default()) ();
}

HAnimJoint .prototype = Object .assign (Object .create ((X3DTransformNode_default()).prototype),
{
   constructor: HAnimJoint,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",         new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",      new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "name",             new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "translation",      new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rotation",         new (Fields_default()).SFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scale",            new (Fields_default()).SFVec3f (1, 1, 1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "scaleOrientation", new (Fields_default()).SFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "center",           new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "llimit",           new (Fields_default()).MFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "ulimit",           new (Fields_default()).MFFloat ()),
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
   getTypeName: function ()
   {
      return "HAnimJoint";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DTransformNode_default().prototype.initialize.call (this);

      this ._skinCoordIndex .addInterest ("set_skinCoordIndex__", this);
      this ._displacers     .addInterest ("set_displacers__",     this);

      this .set_displacers__ ();
   },
   setCameraObject: function (value)
   {
      X3DTransformNode_default().prototype.setCameraObject.call (this, value || !! this ._skinCoordIndex .length);
   },
   getModelMatrix: function ()
   {
      return this .modelMatrix;
   },
   getDisplacers: function ()
   {
      return this .displacerNodes;
   },
   set_skinCoordIndex__: function ()
   {
      this .set_cameraObjects__ ();
   },
   set_displacers__: function ()
   {
      const displacerNodes = this .displacerNodes;

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = X3DCast_default() ((X3DConstants_default()).HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }
   },
   traverse: function traverse (type, renderObject)
   {
      if (type === (TraverseType_default()).CAMERA)
      {
         if (this ._skinCoordIndex .length)
            this .modelMatrix .assign (this .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ());
      }

      X3DTransformNode_default().prototype.traverse.call (this, type, renderObject);
   },
   groupTraverse: function (type, renderObject)
   {
      if (type === (TraverseType_default()).CAMERA)
      {
         if (this ._skinCoordIndex .length)
            this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
      }

      X3DTransformNode_default().prototype.groupTraverse.call (this, type, renderObject);
   },
});

const HAnimJoint_default_ = HAnimJoint;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimJoint", HAnimJoint_default_);
/* harmony default export */ const HAnim_HAnimJoint = (HAnimJoint_default_);
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
}

HAnimMotion .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: HAnimMotion,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",        new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",     new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",         new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "next",            new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "previous",        new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameDuration",   new (Fields_default()).SFTime (0.1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameIncrement",  new (Fields_default()).SFInt32 (1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "frameIndex",      new (Fields_default()).SFInt32 (0)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "loop",            new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "channels",        new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "channelsEnabled", new (Fields_default()).MFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "joints",          new (Fields_default()).MFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "loa",             new (Fields_default()).SFInt32 (-1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "startFrame",      new (Fields_default()).SFInt32 ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "endFrame",        new (Fields_default()).SFInt32 ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "values",          new (Fields_default()).MFFloat ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "cycleTime",       new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "elapsedTime",     new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "frameCount",      new (Fields_default()).SFInt32 ()),
   ]),
   getTypeName: function ()
   {
      return "HAnimMotion";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["4.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);
   },
});

const HAnimMotion_default_ = HAnimMotion;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimMotion", HAnimMotion_default_);
/* harmony default export */ const HAnim_HAnimMotion = (HAnimMotion_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DGroupingNode\")"
const X3DGroupingNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.15")] .require ("x_ite/Components/Grouping/X3DGroupingNode");
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

HAnimSegment .prototype = Object .assign (Object .create ((X3DGroupingNode_default()).prototype),
{
   constructor: HAnimSegment,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
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
   getTypeName: function ()
   {
      return "HAnimSegment";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
});

const HAnimSegment_default_ = HAnimSegment;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimSegment", HAnimSegment_default_);
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

HAnimSite .prototype = Object .assign (Object .create ((X3DTransformNode_default()).prototype),
{
   constructor: HAnimSite,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
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
   getTypeName: function ()
   {
      return "HAnimSite";
   },
   getComponentName: function ()
   {
      return "HAnim";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
});

const HAnimSite_default_ = HAnimSite;
;

Namespace_default().set ("x_ite/Components/HAnim/HAnimSite", HAnimSite_default_);
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









Components_default().addComponent ({
   name: "HAnim",
   types:
   {
      HAnimDisplacer: HAnim_HAnimDisplacer,
      HAnimHumanoid:  HAnim_HAnimHumanoid,
      HAnimJoint:     HAnim_HAnimJoint,
      HAnimMotion:    HAnim_HAnimMotion,
      HAnimSegment:   HAnim_HAnimSegment,
      HAnimSite:      HAnim_HAnimSite,
   },
   abstractTypes:
   {
   },
});

const HAnim_default_ = undefined;
;

Namespace_default().set ("assets/components/HAnim", HAnim_default_);
/* harmony default export */ const HAnim = ((/* unused pure expression or super */ null && (HAnim_default_)));
/******/ })()
;