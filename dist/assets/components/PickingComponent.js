/* X_ITE v10.5.15 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-10.5.15")];
/******/ (() => { // webpackBootstrap
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

// UNUSED EXPORTS: default

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DSensorNode"
const external_X_ITE_X3D_X3DSensorNode_namespaceObject = __X_ITE_X3D__ .X3DSensorNode;
var external_X_ITE_X3D_X3DSensorNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DSensorNode_namespaceObject);
;// external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Browser/Picking/MatchCriterion.js
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

let i = 0;

const MatchCriterion =
{
   MATCH_ANY:      i ++,
   MATCH_EVERY:    i ++,
   MATCH_ONLY_ONE: i ++,
};

const __default__ = MatchCriterion;
;

/* harmony default export */ const Picking_MatchCriterion = (external_X_ITE_X3D_Namespace_default().add ("MatchCriterion", __default__));
;// ./src/x_ite/Browser/Picking/IntersectionType.js
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

let IntersectionType_i = 0;

const IntersectionType =
{
   BOUNDS:   IntersectionType_i ++,
   GEOMETRY: IntersectionType_i ++,
};

const IntersectionType_default_ = IntersectionType;
;

/* harmony default export */ const Picking_IntersectionType = (external_X_ITE_X3D_Namespace_default().add ("IntersectionType", IntersectionType_default_));
;// ./src/x_ite/Browser/Picking/SortOrder.js
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

let SortOrder_i = 0;

const SortOrder =
{
   ANY:        SortOrder_i ++,
   CLOSEST:    SortOrder_i ++,
   ALL:        SortOrder_i ++,
   ALL_SORTED: SortOrder_i ++,
};

const SortOrder_default_ = SortOrder;
;

/* harmony default export */ const Picking_SortOrder = (external_X_ITE_X3D_Namespace_default().add ("SortOrder", SortOrder_default_));
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .QuickSort"
const external_X_ITE_X3D_QuickSort_namespaceObject = __X_ITE_X3D__ .QuickSort;
var external_X_ITE_X3D_QuickSort_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_QuickSort_namespaceObject);
;// external "__X_ITE_X3D__ .ObjectCache"
const external_X_ITE_X3D_ObjectCache_namespaceObject = __X_ITE_X3D__ .ObjectCache;
var external_X_ITE_X3D_ObjectCache_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ObjectCache_namespaceObject);
;// ./src/x_ite/Components/Picking/X3DPickSensorNode.js
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













var ModelMatrixCache = external_X_ITE_X3D_ObjectCache_default() ((external_X_ITE_X3D_Matrix4_default()));

function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

function X3DPickSensorNode (executionContext)
{
   external_X_ITE_X3D_X3DSensorNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DPickSensorNode);

   this .objectType          = new Set ();
   this .intersectionType    = Picking_IntersectionType .BOUNDS;
   this .sortOrder           = Picking_SortOrder .CLOSEST;
   this .pickTargetNodes     = new Set ();
   this .modelMatrices       = [ ];
   this .targets             = [ ];
   this .targets .size       = 0;
   this .pickedTargets       = [ ];
   this .pickedTargetsSorter = new (external_X_ITE_X3D_QuickSort_default()) (this .pickedTargets, compareDistance);
   this .pickedGeometries    = new (external_X_ITE_X3D_Fields_default()).MFNode (); // Must be unique for each X3DPickSensorNode.
}

Object .assign (Object .setPrototypeOf (X3DPickSensorNode .prototype, (external_X_ITE_X3D_X3DSensorNode_default()).prototype),
{
   initialize ()
   {
      this .getLive () .addInterest ("set_live__", this);

      this ._enabled          .addInterest ("set_live__",             this);
      this ._objectType       .addInterest ("set_objectType__",       this);
      this ._matchCriterion   .addInterest ("set_matchCriterion__",   this);
      this ._intersectionType .addInterest ("set_intersectionType__", this);
      this ._sortOrder        .addInterest ("set_sortOrder__",        this);
      this ._pickTarget       .addInterest ("set_pickTarget__",       this);

      this .set_objectType__ ();
      this .set_matchCriterion__ ();
      this .set_intersectionType__ ();
      this .set_sortOrder__ ();
      this .set_pickTarget__ ();
   },
   getObjectType ()
   {
      return this .objectType;
   },
   getMatchCriterion ()
   {
      return this .matchCriterion;
   },
   getIntersectionType ()
   {
      return this .intersectionType;
   },
   getSortOrder ()
   {
      return this .sortOrder;
   },
   getModelMatrices ()
   {
      return this .modelMatrices;
   },
   getTargets ()
   {
      return this .targets;
   },
   getPickShape: (() =>
   {
      const pickShapes = new WeakMap ();

      return function (geometryNode)
      {
         const pickShape = pickShapes .get (geometryNode);

         if (pickShape !== undefined)
            return pickShape;

         const
            browser             = this .getBrowser (),
            shapeNode           = browser .getPrivateScene () .createNode ("Shape",           false),
            collidableShapeNode = browser .getPrivateScene () .createNode ("CollidableShape", false);

         shapeNode .setPrivate (true);
         collidableShapeNode .setPrivate (true);
         collidableShapeNode .setConvex (true);

         shapeNode ._geometry        = geometryNode;
         collidableShapeNode ._shape = shapeNode;

         shapeNode           .setup ();
         collidableShapeNode .setup ();

         pickShapes .set (geometryNode, collidableShapeNode);

         return collidableShapeNode;
      };
   })(),
   getPickedGeometries: (() =>
   {
      return function ()
      {
         var
            targets          = this .targets,
            numTargets       = targets .size,
            pickedTargets    = this .pickedTargets,
            pickedGeometries = this .pickedGeometries;

         // Filter intersecting targets.

         pickedTargets .length = 0;

         for (var i = 0; i < numTargets; ++ i)
         {
            var target = targets [i];

            if (target .intersected)
               pickedTargets .push (target);
         }

         // No pickedTargets, return.

         if (pickedTargets .length === 0)
         {
            pickedGeometries .length = 0;

            return pickedGeometries;
         }

         // Return sorted pickedTargets.

         switch (this .sortOrder)
         {
            case Picking_SortOrder .ANY:
            {
               pickedTargets .length    = 1;
               pickedGeometries [0]     = this .getPickedGeometry (pickedTargets [0]);
               pickedGeometries .length = 1;
               break;
            }
            case Picking_SortOrder .CLOSEST:
            {
               this .pickedTargetsSorter .sort (0, pickedTargets .length);

               pickedTargets .length    = 1;
               pickedGeometries [0]     = this .getPickedGeometry (pickedTargets [0]);
               pickedGeometries .length = 1;
               break;
            }
            case Picking_SortOrder .ALL:
            {
               for (var i = 0, length = pickedTargets .length; i < length; ++ i)
                  pickedGeometries [i] = this .getPickedGeometry (pickedTargets [i]);

               pickedGeometries .length = length;
               break;
            }
            case Picking_SortOrder .ALL_SORTED:
            {
               this .pickedTargetsSorter .sort (0, pickedTargets .length);

               for (var i = 0, length = pickedTargets .length; i < length; ++ i)
                  pickedGeometries [i] = this .getPickedGeometry (pickedTargets [i]);

               pickedGeometries .length = length;
               break;
            }
         }

         return pickedGeometries;
      };
   })(),
   getPickedGeometry (target)
   {
      var
         executionContext = this .getExecutionContext (),
         geometryNode     = target .geometryNode;

      if (geometryNode .getExecutionContext () === executionContext)
         return geometryNode;

      var instance = geometryNode .getExecutionContext ();

      if (instance .getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).X3DPrototypeInstance) && instance .getExecutionContext () === executionContext)
         return instance;

      var pickingHierarchy = target .pickingHierarchy;

      for (var i = pickingHierarchy .length - 1; i >= 0; -- i)
      {
         var node = pickingHierarchy [i];

         if (node .getExecutionContext () === executionContext)
            return node;

         var instance = node .getExecutionContext ();

         if (instance .getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).X3DPrototypeInstance) && instance .getExecutionContext () === executionContext)
            return instance;
      }

      return null;
   },
   getPickedTargets ()
   {
      return this .pickedTargets;
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue () && ! this .objectType .has ("NONE"))
      {
         this .getBrowser () .addPickSensor (this);
         this .setPickableObject (true);
      }
      else
      {
         this .getBrowser () .removePickSensor (this);
         this .setPickableObject (false);
      }
   },
   set_objectType__ ()
   {
      this .objectType .clear ();

      for (var i = 0, length = this ._objectType .length; i < length; ++ i)
      {
         this .objectType .add (this ._objectType [i]);
      }

      this .set_live__ ();
   },
   set_matchCriterion__: (() =>
   {
      var matchCriterions = new Map ([
         ["MATCH_ANY",      Picking_MatchCriterion .MATCH_ANY],
         ["MATCH_EVERY",    Picking_MatchCriterion .MATCH_EVERY],
         ["MATCH_ONLY_ONE", Picking_MatchCriterion .MATCH_ONLY_ONE],
      ]);

      return function ()
      {
         this .matchCriterion = matchCriterions .get (this ._matchCriterion .getValue ());

         if (this .matchCriterion === undefined)
            this .matchCriterion = MatchCriterionType .MATCH_ANY;
      };
   })(),
   set_intersectionType__: (() =>
   {
      var intersectionTypes = new Map ([
         ["BOUNDS",   Picking_IntersectionType .BOUNDS],
         ["GEOMETRY", Picking_IntersectionType .GEOMETRY],
      ]);

      return function ()
      {
         this .intersectionType = intersectionTypes .get (this ._intersectionType .getValue ());

         if (this .intersectionType === undefined)
            this .intersectionType = Picking_IntersectionType .BOUNDS;
      };
   })(),
   set_sortOrder__: (() =>
   {
      var sortOrders = new Map ([
         ["ANY",        Picking_SortOrder .ANY],
         ["CLOSEST",    Picking_SortOrder .CLOSEST],
         ["ALL",        Picking_SortOrder .ALL],
         ["ALL_SORTED", Picking_SortOrder .ALL_SORTED],
      ]);

      return function ()
      {
         this .sortOrder = sortOrders .get (this ._sortOrder .getValue ());

         if (this .sortOrder === undefined)
            this .sortOrder = Picking_SortOrder .CLOSEST;
      };
   })(),
   set_pickTarget__ ()
   {
      this .pickTargetNodes .clear ();

      for (var i = 0, length = this ._pickTarget .length; i < length; ++ i)
      {
         try
         {
            var
               node = this ._pickTarget [i] .getValue () .getInnerNode (),
               type = node .getType ();

            for (var t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case (external_X_ITE_X3D_X3DConstants_default()).Inline:
                  case (external_X_ITE_X3D_X3DConstants_default()).Shape:
                  case (external_X_ITE_X3D_X3DConstants_default()).X3DGroupingNode:
                  {
                     this .pickTargetNodes .add (node);
                     break;
                  }
                  default:
                     continue;
               }
            }
         }
         catch
         { }
      }
   },
   traverse (type, renderObject)
   {
      // X3DPickSensorNode nodes are sorted out and only traversed during PICKING, except if is child of a LOD or Switch node.

      if (type !== (external_X_ITE_X3D_TraverseType_default()).PICKING)
         return;

      if (this .isPickableObject ())
         this .modelMatrices .push (ModelMatrixCache .pop () .assign (renderObject .getModelViewMatrix () .get ()));
   },
   collect (geometryNode, modelMatrix, pickingHierarchy)
   {
      var pickTargetNodes = this .pickTargetNodes;

      var haveTarget = pickingHierarchy .some (node => pickTargetNodes .has (node));

      if (haveTarget)
      {
         var targets = this .targets;

         if (targets .size < targets .length)
         {
            var target = targets [targets .size];
         }
         else
         {
            var target = { modelMatrix: new (external_X_ITE_X3D_Matrix4_default()) (), pickingHierarchy: [ ], pickedPoint: [ ], intersections: [ ] };

            targets .push (target);
         }

         ++ targets .size;

         target .intersected           = false;
         target .geometryNode          = geometryNode;
         target .pickedPoint .length   = 0;
         target .intersections .length = 0;
         target .modelMatrix .assign (modelMatrix);

         var destPickingHierarchy = target .pickingHierarchy;

         for (var i = 0, length = pickingHierarchy .length; i < length; ++ i)
            destPickingHierarchy [i] = pickingHierarchy [i];

         destPickingHierarchy .length = length;
      }
   },
   process ()
   {
      var modelMatrices = this .modelMatrices;

      for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
         ModelMatrixCache .push (modelMatrices [m]);

      this .modelMatrices .length = 0;
      this .targets .size         = 0;
   },
});

Object .defineProperties (X3DPickSensorNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DPickSensorNode", "Picking", 1));

const X3DPickSensorNode_default_ = X3DPickSensorNode;
;

/* harmony default export */ const Picking_X3DPickSensorNode = (external_X_ITE_X3D_Namespace_default().add ("X3DPickSensorNode", X3DPickSensorNode_default_));
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Box3"
const external_X_ITE_X3D_Box3_namespaceObject = __X_ITE_X3D__ .Box3;
var external_X_ITE_X3D_Box3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Box3_namespaceObject);
;// external "__X_ITE_X3D__ .Line3"
const external_X_ITE_X3D_Line3_namespaceObject = __X_ITE_X3D__ .Line3;
var external_X_ITE_X3D_Line3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Line3_namespaceObject);
;// ./src/x_ite/Components/Picking/LinePickSensor.js
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













function LinePickSensor (executionContext)
{
   Picking_X3DPickSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).LinePickSensor);

   this .pickingGeometryNode = null;
}

Object .assign (Object .setPrototypeOf (LinePickSensor .prototype, Picking_X3DPickSensorNode .prototype),
{
   initialize ()
   {
      Picking_X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode = null;

      try
      {
         const
            node = this ._pickingGeometry .getValue () .getInnerNode (),
            type = node .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case (external_X_ITE_X3D_X3DConstants_default()).IndexedLineSet:
               case (external_X_ITE_X3D_X3DConstants_default()).LineSet:
               {
                  this .pickingGeometryNode = node;
                  break;
               }
               default:
                  continue;
            }
         }
      }
      catch
      { }
   },
   process: (() =>
   {
      const
         pickingBBox             = new (external_X_ITE_X3D_Box3_default()) (),
         targetBBox              = new (external_X_ITE_X3D_Box3_default()) (),
         pickingCenter           = new (external_X_ITE_X3D_Vector3_default()) (),
         targetCenter            = new (external_X_ITE_X3D_Vector3_default()) (),
         matrix                  = new (external_X_ITE_X3D_Matrix4_default()) (),
         point1                  = new (external_X_ITE_X3D_Vector3_default()) (),
         point2                  = new (external_X_ITE_X3D_Vector3_default()) (),
         line                    = new (external_X_ITE_X3D_Line3_default()) ((external_X_ITE_X3D_Vector3_default()).Zero, (external_X_ITE_X3D_Vector3_default()).zAxis),
         a                       = new (external_X_ITE_X3D_Vector3_default()) (),
         b                       = new (external_X_ITE_X3D_Vector3_default()) (),
         clipPlanes              = [ ],
         intersections           = [ ],
         texCoord                = new (external_X_ITE_X3D_Vector3_default()) (),
         pickedTextureCoordinate = new (external_X_ITE_X3D_Fields_default()).MFVec3f (),
         pickedNormal            = new (external_X_ITE_X3D_Fields_default()).MFVec3f (),
         pickedPoint             = new (external_X_ITE_X3D_Fields_default()).MFVec3f ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case Picking_IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const target = targets [t];

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case Picking_IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const
                           target       = targets [t],
                           geometryNode = target .geometryNode,
                           vertices     = this .pickingGeometryNode .getVertices ();

                        targetBBox .assign (geometryNode .getBBox ()) .multRight (target .modelMatrix);
                        matrix .assign (target .modelMatrix) .inverse () .multLeft (modelMatrix);

                        for (let v = 0, vLength = vertices .length; v < vLength; v += 8)
                        {
                           matrix .multVecMatrix (point1 .set (vertices [v + 0], vertices [v + 1], vertices [v + 2]));
                           matrix .multVecMatrix (point2 .set (vertices [v + 4], vertices [v + 5], vertices [v + 6]));
                           line .setPoints (point1, point2);

                           intersections .length = 0;

                           if (geometryNode .intersectsLine (line, target .modelMatrix, clipPlanes, intersections))
                           {
                              for (let i = 0, iLength = intersections .length; i < iLength; ++ i)
                              {
                                 // Test if intersection.point is between point1 and point2.

                                 const intersection = intersections [i];

                                 a .assign (intersection .point) .subtract (point1);
                                 b .assign (intersection .point) .subtract (point2);

                                 const
                                    c = a .add (b) .magnitude (),
                                    s = point1 .distance (point2);

                                 if (c <= s)
                                    target .intersections .push (intersection);
                              }
                           }
                        }

                        if (target .intersections .length)
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  const pickedTargets = this .getPickedTargets ();

                  pickedTextureCoordinate .length = 0;
                  pickedNormal            .length = 0;
                  pickedPoint             .length = 0;

                  for (let t = 0, tLength = pickedTargets .length; t < tLength; ++ t)
                  {
                     const pickedIntersections = pickedTargets [t] .intersections;

                     for (let i = 0, iLength = pickedIntersections .length; i < iLength; ++ i)
                     {
                        const
                           intersection = pickedIntersections [i],
                           t            = intersection .texCoord;

                        texCoord .set (t .x, t .y, t .z);

                        pickedTextureCoordinate .push (texCoord);
                        pickedNormal            .push (intersection .normal);
                        pickedPoint             .push (intersection .point);
                     }
                  }

                  if (!this ._pickedTextureCoordinate .equals (pickedTextureCoordinate))
                     this ._pickedTextureCoordinate = pickedTextureCoordinate;

                  if (!this ._pickedNormal .equals (pickedNormal))
                     this ._pickedNormal = pickedNormal;

                  if (!this ._pickedPoint .equals (pickedPoint))
                     this ._pickedPoint = pickedPoint;

                  break;
               }
            }
         }

         Picking_X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (LinePickSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("LinePickSensor", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",                new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",             new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",                 new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "objectType",              new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "matchCriterion",          new (external_X_ITE_X3D_Fields_default()).SFString ("MATCH_ANY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "intersectionType",        new (external_X_ITE_X3D_Fields_default()).SFString ("BOUNDS")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "sortOrder",               new (external_X_ITE_X3D_Fields_default()).SFString ("CLOSEST")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",                new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedTextureCoordinate", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedNormal",            new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedPoint",             new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickingGeometry",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickTarget",              new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedGeometry",          new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const LinePickSensor_default_ = LinePickSensor;
;

/* harmony default export */ const Picking_LinePickSensor = (external_X_ITE_X3D_Namespace_default().add ("LinePickSensor", LinePickSensor_default_));
;// external "__X_ITE_X3D__ .X3DGroupingNode"
const external_X_ITE_X3D_X3DGroupingNode_namespaceObject = __X_ITE_X3D__ .X3DGroupingNode;
var external_X_ITE_X3D_X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGroupingNode_namespaceObject);
;// ./src/x_ite/Components/Picking/X3DPickableObject.js
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




function X3DPickableObject (executionContext)
{
   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DPickableObject);

   this .objectType = new Set ();
}

Object .assign (X3DPickableObject .prototype,
{
   initialize ()
   {
      this ._objectType .addInterest ("set_objectType__", this);

      this .set_objectType__ ();
   },
   getObjectType ()
   {
      return this .objectType;
   },
   set_objectType__ ()
   {
      this .objectType .clear ();

      for (var i = 0, length = this ._objectType .length; i < length; ++ i)
      {
         this .objectType .add (this ._objectType [i]);
      }
   },
   dispose () { },
});

Object .defineProperties (X3DPickableObject, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DPickableObject", "Picking", 1));

const X3DPickableObject_default_ = X3DPickableObject;
;

/* harmony default export */ const Picking_X3DPickableObject = (external_X_ITE_X3D_Namespace_default().add ("X3DPickableObject", X3DPickableObject_default_));
;// ./src/x_ite/Components/Picking/PickableGroup.js
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











function PickableGroup (executionContext)
{
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);
   Picking_X3DPickableObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).PickableGroup);

   this .pickSensorNodes = new Set ();
}

Object .assign (Object .setPrototypeOf (PickableGroup .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype),
   Picking_X3DPickableObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGroupingNode_default().prototype .initialize .call (this);
      Picking_X3DPickableObject .prototype .initialize .call (this);

      this ._pickable .addInterest ("set_pickable__", this);

      this .set_pickable__ ();
   },
   set_pickableObjects__ ()
   {
      this .set_pickable__ ();
   },
   set_pickable__ ()
   {
      this .setPickableObject (this ._pickable .getValue () || this .getTransformSensors () .size);
   },
   traverse (type, renderObject)
   {
      if (type === (external_X_ITE_X3D_TraverseType_default()).PICKING)
      {
         if (this ._pickable .getValue ())
         {
            if (this .getObjectType () .has ("NONE"))
               return;

            const
               browser       = this .getBrowser (),
               pickableStack = browser .getPickable ();

            if (this .getObjectType () .has ("ALL"))
            {
               pickableStack .push (true);
               external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);
               pickableStack .pop ();
            }
            else
            {
               // Filter pick sensors.

               const
                  pickSensorNodes = this .pickSensorNodes,
                  pickSensorStack = browser .getPickSensors ();

               for (const pickSensorNode of pickSensorStack .at (-1))
               {
                  if (!pickSensorNode .getObjectType () .has ("ALL"))
                  {
                     let intersection = 0;

                     for (const objectType of this .getObjectType ())
                     {
                        if (pickSensorNode .getObjectType () .has (objectType))
                        {
                           ++ intersection;
                           break;
                        }
                     }

                     switch (pickSensorNode .getMatchCriterion ())
                     {
                        case Picking_MatchCriterion .MATCH_ANY:
                        {
                           if (intersection === 0)
                              continue;

                           break;
                        }
                        case Picking_MatchCriterion .MATCH_EVERY:
                        {
                           if (intersection !== pickSensor .getObjectType () .size)
                              continue;

                           break;
                        }
                        case Picking_MatchCriterion .MATCH_ONLY_ONE:
                        {
                           if (intersection !== 1)
                              continue;

                           break;
                        }
                     }
                  }

                  pickSensorNodes .add (pickSensorNode);
               }

               pickableStack   .push (true);
               pickSensorStack .push (pickSensorNodes);

               external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

               pickSensorStack .pop ();
               pickableStack   .pop ();

               pickSensorNodes .clear ();
            }
         }
      }
      else
      {
         external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);
      }
   },
   dispose ()
   {
      Picking_X3DPickableObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DGroupingNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (PickableGroup,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("PickableGroup", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",    new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickable",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "objectType",     new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const PickableGroup_default_ = PickableGroup;
;

/* harmony default export */ const Picking_PickableGroup = (external_X_ITE_X3D_Namespace_default().add ("PickableGroup", PickableGroup_default_));
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .AmmoClass"
const external_X_ITE_X3D_AmmoClass_namespaceObject = __X_ITE_X3D__ .AmmoClass;
var external_X_ITE_X3D_AmmoClass_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_AmmoClass_namespaceObject);
;// ./src/x_ite/Browser/Picking/VolumePicker.js
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






function VolumePicker ()
{
   this .broadphase             = new (external_X_ITE_X3D_AmmoClass_default()).btDbvtBroadphase ();
   this .collisionConfiguration = new (external_X_ITE_X3D_AmmoClass_default()).btDefaultCollisionConfiguration ();
   this .dispatcher             = new (external_X_ITE_X3D_AmmoClass_default()).btCollisionDispatcher (this .collisionConfiguration);
   this .collisionWorld         = new (external_X_ITE_X3D_AmmoClass_default()).btCollisionWorld (this .dispatcher, this .broadphase, this .collisionConfiguration);

   this .compoundShape1         = new (external_X_ITE_X3D_AmmoClass_default()).btCompoundShape ();
   this .motionState1           = new (external_X_ITE_X3D_AmmoClass_default()).btDefaultMotionState ();
   this .constructionInfo1      = new (external_X_ITE_X3D_AmmoClass_default()).btRigidBodyConstructionInfo (0, this .motionState1, this .compoundShape1);
   this .rigidBody1             = new (external_X_ITE_X3D_AmmoClass_default()).btRigidBody (this .constructionInfo1);

   this .compoundShape2         = new (external_X_ITE_X3D_AmmoClass_default()).btCompoundShape ();
   this .motionState2           = new (external_X_ITE_X3D_AmmoClass_default()).btDefaultMotionState ();
   this .constructionInfo2      = new (external_X_ITE_X3D_AmmoClass_default()).btRigidBodyConstructionInfo (0, this .motionState2, this .compoundShape2);
   this .rigidBody2             = new (external_X_ITE_X3D_AmmoClass_default()).btRigidBody (this .constructionInfo2);

   this .collisionWorld .addCollisionObject (this .rigidBody1);
   this .collisionWorld .addCollisionObject (this .rigidBody2);
}

Object .assign (VolumePicker .prototype,
{
   constuctor: VolumePicker,
   setChildShape1 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape1, matrix, childShape);
   },
   setChildShape2 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape2, matrix, childShape);
   },
   setChildShape1Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape1, transform, localScaling, childShape);
   },
   setChildShape2Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape2, transform, localScaling, childShape);
   },
   setChildShape: (() =>
   {
      const
         translation = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation    = new (external_X_ITE_X3D_Rotation4_default()) (),
         scale       = new (external_X_ITE_X3D_Vector3_default()) (1, 1, 1),
         s           = new (external_X_ITE_X3D_AmmoClass_default()).btVector3 (0, 0, 0);

      return function (compoundShape, matrix, childShape)
      {
         if (compoundShape .getNumChildShapes ())
            compoundShape .removeChildShapeByIndex (0);

         if (childShape .getNumChildShapes ())
         {
            matrix .get (translation, rotation, scale);

            s .setValue (scale .x, scale .y, scale .z);

            childShape .setLocalScaling (s);
            compoundShape .addChildShape (this .getTransform (translation, rotation), childShape);
         }
      };
   })(),
   setChildShapeComponents (compoundShape, transform, localScaling, childShape)
   {
      if (compoundShape .getNumChildShapes ())
         compoundShape .removeChildShapeByIndex (0);

      if (childShape .getNumChildShapes ())
      {
         childShape .setLocalScaling (localScaling);
         compoundShape .addChildShape (transform, childShape);
      }
   },
   contactTest ()
   {
      this .collisionWorld .performDiscreteCollisionDetection ();

      const numManifolds = this .dispatcher .getNumManifolds ();

      for (let i = 0; i < numManifolds; ++ i)
      {
         const
            contactManifold = this .dispatcher .getManifoldByIndexInternal (i),
            numContacts     = contactManifold .getNumContacts ();

         for (let j = 0; j < numContacts; ++ j)
         {
            const pt = contactManifold .getContactPoint (j);

            if (pt .getDistance () <= 0)
               return true;
         }
      }

      return false;
   },
   getTransform: (() =>
   {
      const
         T = new (external_X_ITE_X3D_AmmoClass_default()).btTransform (),
         o = new (external_X_ITE_X3D_AmmoClass_default()).btVector3 (0, 0, 0),
         m = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function (translation, rotation, transform)
      {
         const t = transform || T;

         m .set (translation, rotation);

         o .setValue (m [12], m [13], m [14]);

         t .getBasis () .setValue (m [0], m [4], m [8],
                                   m [1], m [5], m [9],
                                   m [2], m [6], m [10]);

         t .setOrigin (o);

         return t;
      };
   })(),
});

const VolumePicker_default_ = VolumePicker;
;

/* harmony default export */ const Picking_VolumePicker = (external_X_ITE_X3D_Namespace_default().add ("VolumePicker", VolumePicker_default_));
;// ./src/x_ite/Components/Picking/PointPickSensor.js
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















function PointPickSensor (executionContext)
{
   Picking_X3DPickSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).PointPickSensor);

   this .pickingGeometryNode = null;
   this .picker              = new Picking_VolumePicker ();
   this .compoundShapes      = [ ];
}

Object .assign (Object .setPrototypeOf (PointPickSensor .prototype, Picking_X3DPickSensorNode .prototype),
{
   initialize ()
   {
      Picking_X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode ?._rebuild .removeInterest ("set_geometry__", this);

      this .pickingGeometryNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).PointSet, this ._pickingGeometry);

      this .pickingGeometryNode ?._rebuild .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   set_geometry__: (() =>
   {
      const
         defaultScale = new (external_X_ITE_X3D_AmmoClass_default()).btVector3 (1, 1, 1),
         o            = new (external_X_ITE_X3D_AmmoClass_default()).btVector3 (),
         t            = new (external_X_ITE_X3D_AmmoClass_default()).btTransform ();

      return function ()
      {
         const compoundShapes = this .compoundShapes;

         if (this .pickingGeometryNode)
         {
            const coord = this .pickingGeometryNode .getCoord ();

            if (coord)
            {
               const length = coord .getSize ();

               for (let i = 0; i < length; ++ i)
               {
                  if (i < compoundShapes .length)
                  {
                     const
                        compoundShape = compoundShapes [i],
                        point         = coord .get1Point (i, compoundShape .point);

                     o .setValue (point .x, point .y, point .z);
                     t .setOrigin (o);

                     compoundShape .setLocalScaling (defaultScale);
                     compoundShape .updateChildTransform (0, t);
                  }
                  else
                  {
                     const
                        compoundShape = new (external_X_ITE_X3D_AmmoClass_default()).btCompoundShape (),
                        sphereShape   = new (external_X_ITE_X3D_AmmoClass_default()).btSphereShape (0),
                        point         = coord .get1Point (i, new (external_X_ITE_X3D_Vector3_default()) ());

                     compoundShape .point = point;

                     o .setValue (point .x, point .y, point .z);
                     t .setOrigin (o);

                     compoundShape .addChildShape (t, sphereShape);
                     compoundShapes .push (compoundShape);
                  }
               }

               compoundShapes .length = length;
            }
            else
            {
               compoundShapes .length = 0;
            }
         }
         else
         {
            compoundShapes .length = 0;
         }
      };
   })(),
   process: (() =>
   {
      const
         pickingBBox   = new (external_X_ITE_X3D_Box3_default()) (),
         targetBBox    = new (external_X_ITE_X3D_Box3_default()) (),
         pickingCenter = new (external_X_ITE_X3D_Vector3_default()) (),
         targetCenter  = new (external_X_ITE_X3D_Vector3_default()) (),
         transform     = new (external_X_ITE_X3D_AmmoClass_default()).btTransform (),
         localScaling  = new (external_X_ITE_X3D_AmmoClass_default()).btVector3 (),
         translation   = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation      = new (external_X_ITE_X3D_Rotation4_default()) (),
         scale         = new (external_X_ITE_X3D_Vector3_default()) (1, 1, 1),
         pickedPoint   = new (external_X_ITE_X3D_Fields_default()).MFVec3f ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case Picking_IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const target = targets [t];

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case Picking_IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  const
                     picker         = this .picker,
                     compoundShapes = this .compoundShapes;

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     modelMatrix .get (translation, rotation, scale);

                     picker .getTransform (translation, rotation, transform);
                     localScaling .setValue (scale .x, scale .y, scale .z);

                     for (let c = 0, cLength = compoundShapes .length; c < cLength; ++ c)
                     {
                        const compoundShape = compoundShapes [c];

                        picker .setChildShape1Components (transform, localScaling, compoundShape);

                        for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           const
                              target      = targets [t],
                              targetShape = this .getPickShape (target .geometryNode);

                           targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                           picker .setChildShape2 (target .modelMatrix, targetShape .getCompoundShape ());

                           if (picker .contactTest ())
                           {
                              pickingCenter .assign (pickingBBox .center);
                              targetCenter  .assign (targetBBox .center);

                              target .intersected = true;
                              target .distance    = pickingCenter .distance (targetCenter);
                              target .pickedPoint .push (compoundShape .point);
                           }
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  const pickedTargets = this .getPickedTargets ();

                  pickedPoint .length = 0;

                  for (let t = 0, tLength = pickedTargets .length; t < tLength; ++ t)
                  {
                     const pp = pickedTargets [t] .pickedPoint;

                     for (let p = 0, pLength = pp .length; p < pLength; ++ p)
                        pickedPoint .push (pp [p]);
                  }

                  if (!this ._pickedPoint .equals (pickedPoint))
                     this ._pickedPoint = pickedPoint;

                  break;
               }
            }
         }

         Picking_X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (PointPickSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("PointPickSensor", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "objectType",       new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "matchCriterion",   new (external_X_ITE_X3D_Fields_default()).SFString ("MATCH_ANY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "intersectionType", new (external_X_ITE_X3D_Fields_default()).SFString ("BOUNDS")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "sortOrder",        new (external_X_ITE_X3D_Fields_default()).SFString ("CLOSEST")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",         new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedPoint",      new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickingGeometry",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickTarget",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedGeometry",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const PointPickSensor_default_ = PointPickSensor;
;

/* harmony default export */ const Picking_PointPickSensor = (external_X_ITE_X3D_Namespace_default().add ("PointPickSensor", PointPickSensor_default_));
;// ./src/x_ite/Components/Picking/PrimitivePickSensor.js
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












function PrimitivePickSensor (executionContext)
{
   Picking_X3DPickSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).PrimitivePickSensor);

   this .pickingGeometryNode = null;
   this .picker              = new Picking_VolumePicker ();
}

Object .assign (Object .setPrototypeOf (PrimitivePickSensor .prototype, Picking_X3DPickSensorNode .prototype),
{
   initialize ()
   {
      Picking_X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode = null;

      try
      {
         const
            node = this ._pickingGeometry .getValue () .getInnerNode (),
            type = node .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case (external_X_ITE_X3D_X3DConstants_default()).Box:
               case (external_X_ITE_X3D_X3DConstants_default()).Cone:
               case (external_X_ITE_X3D_X3DConstants_default()).Cylinder:
               case (external_X_ITE_X3D_X3DConstants_default()).Sphere:
               {
                  this .pickingGeometryNode = node;
                  break;
               }
               default:
                  continue;
            }
         }
      }
      catch
      { }
   },
   process: (() =>
   {
      const
         pickingBBox   = new (external_X_ITE_X3D_Box3_default()) (),
         targetBBox    = new (external_X_ITE_X3D_Box3_default()) (),
         pickingCenter = new (external_X_ITE_X3D_Vector3_default()) (),
         targetCenter  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case Picking_IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const target = targets [t];

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case Picking_IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  const picker = this .picker;

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const
                        modelMatrix  = modelMatrices [m],
                        pickingShape = this .getPickShape (this .pickingGeometryNode);

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     picker .setChildShape1 (modelMatrix, pickingShape .getCompoundShape ());

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const
                           target      = targets [t],
                           targetShape = this .getPickShape (target .geometryNode);

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        picker .setChildShape2 (target .modelMatrix, targetShape .getCompoundShape ());

                        if (picker .contactTest ())
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
            }
         }

         Picking_X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (PrimitivePickSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("PrimitivePickSensor", "Picking", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "objectType",       new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "matchCriterion",   new (external_X_ITE_X3D_Fields_default()).SFString ("MATCH_ANY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "intersectionType", new (external_X_ITE_X3D_Fields_default()).SFString ("BOUNDS")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "sortOrder",        new (external_X_ITE_X3D_Fields_default()).SFString ("CLOSEST")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",         new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickingGeometry",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickTarget",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedGeometry",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const PrimitivePickSensor_default_ = PrimitivePickSensor;
;

/* harmony default export */ const Picking_PrimitivePickSensor = (external_X_ITE_X3D_Namespace_default().add ("PrimitivePickSensor", PrimitivePickSensor_default_));
;// ./src/x_ite/Components/Picking/VolumePickSensor.js
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













function VolumePickSensor (executionContext)
{
   Picking_X3DPickSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).VolumePickSensor);

   this .pickingGeometryNode = null;
   this .picker              = new Picking_VolumePicker ();
}

Object .assign (Object .setPrototypeOf (VolumePickSensor .prototype, Picking_X3DPickSensorNode .prototype),
{
   initialize ()
   {
      Picking_X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DGeometryNode, this ._pickingGeometry);
   },
   process: (() =>
   {
      const
         pickingBBox   = new (external_X_ITE_X3D_Box3_default()) (),
         targetBBox    = new (external_X_ITE_X3D_Box3_default()) (),
         pickingCenter = new (external_X_ITE_X3D_Vector3_default()) (),
         targetCenter  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case Picking_IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const modelMatrix = modelMatrices [m];

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const target = targets [t];

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case Picking_IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  const picker = this .picker;

                  for (let m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                  {
                     const
                        modelMatrix  = modelMatrices [m],
                        pickingShape = this .getPickShape (this .pickingGeometryNode);

                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     picker .setChildShape1 (modelMatrix, pickingShape .getCompoundShape ());

                     for (let t = 0, tLength = targets .size; t < tLength; ++ t)
                     {
                        const
                           target      = targets [t],
                           targetShape = this .getPickShape (target .geometryNode);

                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        picker .setChildShape2 (target .modelMatrix, targetShape .getCompoundShape ());

                        if (picker .contactTest ())
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
            }
         }

         Picking_X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (VolumePickSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("VolumePickSensor", "Picking", 3, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "objectType",       new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "matchCriterion",   new (external_X_ITE_X3D_Fields_default()).SFString ("MATCH_ANY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "intersectionType", new (external_X_ITE_X3D_Fields_default()).SFString ("BOUNDS")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "sortOrder",        new (external_X_ITE_X3D_Fields_default()).SFString ("CLOSEST")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",         new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickingGeometry",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pickTarget",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "pickedGeometry",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumePickSensor_default_ = VolumePickSensor;
;

/* harmony default export */ const Picking_VolumePickSensor = (external_X_ITE_X3D_Namespace_default().add ("VolumePickSensor", VolumePickSensor_default_));
;// ./src/assets/components/PickingComponent.js
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










external_X_ITE_X3D_Components_default().add ({
   name: "Picking",
   concreteNodes:
   [
      Picking_LinePickSensor,
      Picking_PickableGroup,
      Picking_PointPickSensor,
      Picking_PrimitivePickSensor,
      Picking_VolumePickSensor,
   ],
   abstractNodes:
   [
      Picking_X3DPickSensorNode,
      Picking_X3DPickableObject,
   ],
});

const PickingComponent_default_ = undefined;
;

/* harmony default export */ const PickingComponent = (external_X_ITE_X3D_Namespace_default().add ("PickingComponent", PickingComponent_default_));
/******/ })()
;