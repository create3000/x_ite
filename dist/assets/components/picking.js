(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
	define  = X3D .define,
	require = X3D .require;
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


define ('x_ite/Browser/Picking/MatchCriterion',[],function ()
{
"use strict";

   let i = 0;

   const MatchCriterion =
   {
      MATCH_ANY:      i ++,
      MATCH_EVERY:    i ++,
      MATCH_ONLY_ONE: i ++,
   };

   return MatchCriterion;
});

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


define ('x_ite/Browser/Picking/IntersectionType',[],function ()
{
"use strict";

   let i = 0;

   const IntersectionType =
   {
      BOUNDS:   i ++,
      GEOMETRY: i ++,
   };

   return IntersectionType;
});

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


define ('x_ite/Browser/Picking/SortOrder',[],function ()
{
"use strict";

   let i = 0;

   const SortOrder =
   {
      ANY:        i ++,
      CLOSEST:    i ++,
      ALL:        i ++,
      ALL_SORTED: i ++,
   };

   return SortOrder;
});

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


define ('x_ite/Components/Picking/X3DPickSensorNode',[
   "x_ite/Fields",
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Picking/MatchCriterion",
   "x_ite/Browser/Picking/IntersectionType",
   "x_ite/Browser/Picking/SortOrder",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Algorithms/QuickSort",
   "standard/Utility/ObjectCache",
],
function (Fields,
          X3DSensorNode,
          TraverseType,
          X3DConstants,
          MatchCriterion,
          IntersectionType,
          SortOrder,
          Matrix4,
          QuickSort,
          ObjectCache)
{
"use strict";

   var ModelMatrixCache = ObjectCache (Matrix4);

   function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

   function X3DPickSensorNode (executionContext)
   {
      X3DSensorNode .call (this, executionContext);

      this .addType (X3DConstants .X3DPickSensorNode);

      this .objectType          = new Set ();
      this .intersectionType    = IntersectionType .BOUNDS;
      this .sortOrder           = SortOrder .CLOSEST;
      this .pickTargetNodes     = new Set ();
      this .modelMatrices       = [ ];
      this .targets             = [ ];
      this .targets .size       = 0;
      this .pickedTargets       = [ ];
      this .pickedTargetsSorter = new QuickSort (this .pickedTargets, compareDistance);
      this .pickedGeometries    = new Fields .MFNode (); // Must be unique for each X3DPickSensorNode.
   }

   X3DPickSensorNode .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
   {
      constructor: X3DPickSensorNode,
      initialize: function ()
      {
         this .isLive () .addInterest ("set_live__", this);

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
      getObjectType: function ()
      {
         return this .objectType;
      },
      getMatchCriterion: function ()
      {
         return this .matchCriterion;
      },
      getIntersectionType: function ()
      {
         return this .intersectionType;
      },
      getSortOrder: function ()
      {
         return this .sortOrder;
      },
      getModelMatrices: function ()
      {
         return this .modelMatrices;
      },
      getTargets: function ()
      {
         return this .targets;
      },
      getPickShape: (function ()
      {
         var pickShapes = new WeakMap ();

         return function (geometryNode)
         {
            var pickShape = pickShapes .get (geometryNode);

            if (pickShape !== undefined)
               return pickShape;

            var
               shapeNode           = this .getExecutionContext () .createNode ("Shape",           false),
               collidableShapeNode = this .getExecutionContext () .createNode ("CollidableShape", false);

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
      getPickedGeometries: (function ()
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
               case SortOrder .ANY:
               {
                  pickedTargets .length    = 1;
                  pickedGeometries [0]     = this .getPickedGeometry (pickedTargets [0]);
                  pickedGeometries .length = 1;
                  break;
               }
               case SortOrder .CLOSEST:
               {
                  this .pickedTargetsSorter .sort (0, pickedTargets .length);

                  pickedTargets .length    = 1;
                  pickedGeometries [0]     = this .getPickedGeometry (pickedTargets [0]);
                  pickedGeometries .length = 1;
                  break;
               }
               case SortOrder .ALL:
               {
                  for (var i = 0, length = pickedTargets .length; i < length; ++ i)
                     pickedGeometries [i] = this .getPickedGeometry (pickedTargets [i]);

                  pickedGeometries .length = length;
                  break;
               }
               case SortOrder .ALL_SORTED:
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
      getPickedGeometry: function (target)
      {
         var
            executionContext = this .getExecutionContext (),
            geometryNode     = target .geometryNode;

         if (geometryNode .getExecutionContext () === executionContext)
            return geometryNode;

         var instance = geometryNode .getExecutionContext ();

         if (instance .getType () .indexOf (X3DConstants .X3DPrototypeInstance) !== -1 && instance .getExecutionContext () === executionContext)
            return instance;

         var pickingHierarchy = target .pickingHierarchy;

         for (var i = pickingHierarchy .length - 1; i >= 0; -- i)
         {
            var node = pickingHierarchy [i];

            if (node .getExecutionContext () === executionContext)
               return node;

            var instance = node .getExecutionContext ();

            if (instance .getType () .indexOf (X3DConstants .X3DPrototypeInstance) !== -1 && instance .getExecutionContext () === executionContext)
               return instance;
         }

         return null;
      },
      getPickedTargets: function ()
      {
         return this .pickedTargets;
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue () && this ._enabled .getValue () && ! this .objectType .has ("NONE"))
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
      set_objectType__: function ()
      {
         this .objectType .clear ();

         for (var i = 0, length = this ._objectType .length; i < length; ++ i)
         {
            this .objectType .add (this ._objectType [i]);
         }

         this .set_live__ ();
      },
      set_matchCriterion__: (function ()
      {
         var matchCriterions = new Map ([
            ["MATCH_ANY",      MatchCriterion .MATCH_ANY],
            ["MATCH_EVERY",    MatchCriterion .MATCH_EVERY],
            ["MATCH_ONLY_ONE", MatchCriterion .MATCH_ONLY_ONE],
         ]);

         return function ()
         {
            this .matchCriterion = matchCriterions .get (this ._matchCriterion .getValue ());

            if (this .matchCriterion === undefined)
               this .matchCriterion = MatchCriterionType .MATCH_ANY;
         };
      })(),
      set_intersectionType__: (function ()
      {
         var intersectionTypes = new Map ([
            ["BOUNDS",   IntersectionType .BOUNDS],
            ["GEOMETRY", IntersectionType .GEOMETRY],
         ]);

         return function ()
         {
            this .intersectionType = intersectionTypes .get (this ._intersectionType .getValue ());

            if (this .intersectionType === undefined)
               this .intersectionType = IntersectionType .BOUNDS;
         };
      })(),
      set_sortOrder__: (function ()
      {
         var sortOrders = new Map ([
            ["ANY",        SortOrder .ANY],
            ["CLOSEST",    SortOrder .CLOSEST],
            ["ALL",        SortOrder .ALL],
            ["ALL_SORTED", SortOrder .ALL_SORTED],
         ]);

         return function ()
         {
            this .sortOrder = sortOrders .get (this ._sortOrder .getValue ());

            if (this .sortOrder === undefined)
               this .sortOrder = SortOrder .CLOSEST;
         };
      })(),
      set_pickTarget__: function ()
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
                     case X3DConstants .Inline:
                     case X3DConstants .Shape:
                     case X3DConstants .X3DGroupingNode:
                     {
                        this .pickTargetNodes .add (node);
                        break;
                     }
                     default:
                        continue;
                  }
               }
            }
            catch (error)
            { }
         }
      },
      traverse: function (type, renderObject)
      {
         // X3DPickSensorNode nodes are sorted out and only traversed during PICKING, except if is child of a LOD or Switch node.

         if (type !== TraverseType .PICKING)
            return;

         if (this .getPickableObject ())
            this .modelMatrices .push (ModelMatrixCache .pop () .assign (renderObject .getModelViewMatrix () .get ()));
      },
      collect: function (geometryNode, modelMatrix, pickingHierarchy)
      {
         var pickTargetNodes = this .pickTargetNodes;

         var haveTarget = pickingHierarchy .some (function (node)
         {
            return pickTargetNodes .has (node);
         });

         if (haveTarget)
         {
            var targets = this .targets;

            if (targets .size < targets .length)
            {
               var target = targets [targets .size];
            }
            else
            {
               var target = { modelMatrix: new Matrix4 (), pickingHierarchy: [ ], pickedPoint: [ ], intersections: [ ] };

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
      process: function ()
      {
         var modelMatrices = this .modelMatrices;

         for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
            ModelMatrixCache .push (modelMatrices [m]);

         this .modelMatrices .length = 0;
         this .targets .size         = 0;
      },
   });

   return X3DPickSensorNode;
});

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


define ('x_ite/Components/Picking/LinePickSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Picking/X3DPickSensorNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Picking/IntersectionType",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Box3",
   "standard/Math/Geometry/Line3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPickSensorNode,
          X3DConstants,
          IntersectionType,
          Vector3,
          Matrix4,
          Box3,
          Line3)
{
"use strict";

   function LinePickSensor (executionContext)
   {
      X3DPickSensorNode .call (this, executionContext);

      this .addType (X3DConstants .LinePickSensor);

      this .pickingGeometryNode = null;
   }

   LinePickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
   {
      constructor: LinePickSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",              new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",          new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType",        new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",               new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedTextureCoordinate", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedNormal",            new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",             new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",          new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "LinePickSensor";
      },
      getComponentName: function ()
      {
         return "Picking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DPickSensorNode .prototype .initialize .call (this);

         this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

         this .set_pickingGeometry__ ();
      },
      set_pickingGeometry__: function ()
      {
         this .pickingGeometryNode = null;

         try
         {
            var
               node = this ._pickingGeometry .getValue () .getInnerNode (),
               type = node .getType ();

            for (var t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .IndexedLineSet:
                  case X3DConstants .LineSet:
                  {
                     this .pickingGeometryNode = node;
                     break;
                  }
                  default:
                     continue;
               }
            }
         }
         catch (error)
         { }
      },
      process: (function ()
      {
         var
            pickingBBox             = new Box3 (),
            targetBBox              = new Box3 (),
            pickingCenter           = new Vector3 (0, 0, 0),
            targetCenter            = new Vector3 (0, 0, 0),
            matrix                  = new Matrix4 (),
            point1                  = new Vector3 (0, 0, 0),
            point2                  = new Vector3 (0, 0, 0),
            line                    = new Line3 (Vector3 .Zero, Vector3 .zAxis),
            a                       = new Vector3 (0, 0, 0),
            b                       = new Vector3 (0, 0, 0),
            clipPlanes              = [ ],
            intersections           = [ ],
            texCoord                = new Vector3 (0, 0, 0),
            pickedTextureCoordinate = new Fields .MFVec3f (),
            pickedNormal            = new Fields .MFVec3f (),
            pickedPoint             = new Fields .MFVec3f ();

         return function ()
         {
            if (this .pickingGeometryNode)
            {
               var
                  modelMatrices = this .getModelMatrices (),
                  targets       = this .getTargets ();

               switch (this .getIntersectionType ())
               {
                  case IntersectionType .BOUNDS:
                  {
                     // Intersect bboxes.

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var target = targets [t];

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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
                  case IntersectionType .GEOMETRY:
                  {
                     // Intersect geometry.

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var
                              target       = targets [t],
                              geometryNode = target .geometryNode,
                              vertices     = this .pickingGeometryNode .getVertices ();

                           targetBBox .assign (geometryNode .getBBox ()) .multRight (target .modelMatrix);
                           matrix .assign (target .modelMatrix) .inverse () .multLeft (modelMatrix);

                           for (var v = 0, vLength = vertices .length; v < vLength; v += 8)
                           {
                              matrix .multVecMatrix (point1 .set (vertices [v + 0], vertices [v + 1], vertices [v + 2]));
                              matrix .multVecMatrix (point2 .set (vertices [v + 4], vertices [v + 5], vertices [v + 6]));
                              line .setPoints (point1, point2);

                              intersections .length = 0;

                              if (geometryNode .intersectsLineWithGeometry (line, target .modelMatrix, clipPlanes, intersections))
                              {
                                 for (var i = 0, iLength = intersections .length; i < iLength; ++ i)
                                 {
                                    // Test if intersection.point is between point1 and point2.

                                    var intersection = intersections [i];

                                    a .assign (intersection .point) .subtract (point1);
                                    b .assign (intersection .point) .subtract (point2);

                                    var
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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     var pickedTargets = this .getPickedTargets ();

                     pickedTextureCoordinate .length = 0;
                     pickedNormal            .length = 0;
                     pickedPoint             .length = 0;

                     for (var t = 0, tLength = pickedTargets .length; t < tLength; ++ t)
                     {
                        var pickedIntersections = pickedTargets [t] .intersections;

                        for (var i = 0, iLength = pickedIntersections .length; i < iLength; ++ i)
                        {
                           var
                              intersection = pickedIntersections [i],
                              t            = intersection .texCoord;

                           texCoord .set (t .x, t .y, t .z);

                           pickedTextureCoordinate .push (texCoord);
                           pickedNormal            .push (intersection .normal);
                           pickedPoint             .push (intersection .point);
                        }
                     }

                     if (! this ._pickedTextureCoordinate .equals (pickedTextureCoordinate))
                        this ._pickedTextureCoordinate = pickedTextureCoordinate;

                     if (! this ._pickedNormal .equals (pickedNormal))
                        this ._pickedNormal = pickedNormal;

                     if (! this ._pickedPoint .equals (pickedPoint))
                        this ._pickedPoint = pickedPoint;

                     break;
                  }
               }
            }

            X3DPickSensorNode .prototype .process .call (this);
         };
      })(),
   });

   return LinePickSensor;
});

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


define ('x_ite/Components/Picking/X3DPickableObject',[
   "x_ite/Base/X3DConstants",
],
function (X3DConstants)
{
"use strict";

   function X3DPickableObject (executionContext)
   {
      this .addType (X3DConstants .X3DPickableObject);

      this .objectType = new Set ();
   }

   X3DPickableObject .prototype =
   {
      constructor: X3DPickableObject,
      initialize: function ()
      {
         this ._objectType .addInterest ("set_objectType__", this);

         this .set_objectType__ ();
      },
      getObjectType: function ()
      {
         return this .objectType;
      },
      set_objectType__: function ()
      {
         this .objectType .clear ();

         for (var i = 0, length = this ._objectType .length; i < length; ++ i)
         {
            this .objectType .add (this ._objectType [i]);
         }
      },
   };

   return X3DPickableObject;
});

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


define ('x_ite/Components/Picking/PickableGroup',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Components/Picking/X3DPickableObject",
   "x_ite/Browser/Picking/MatchCriterion",
   "x_ite/Base/X3DConstants",
   "x_ite/Rendering/TraverseType",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DPickableObject,
          MatchCriterion,
          X3DConstants,
          TraverseType)
{
"use strict";

   function PickableGroup (executionContext)
   {
      X3DGroupingNode   .call (this, executionContext);
      X3DPickableObject .call (this, executionContext);

      this .addType (X3DConstants .PickableGroup);
   }

   PickableGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
      X3DPickableObject .prototype,
   {
      constructor: PickableGroup,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickable",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",     new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "PickableGroup";
      },
      getComponentName: function ()
      {
         return "Picking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DGroupingNode   .prototype .initialize .call (this);
         X3DPickableObject .prototype .initialize .call (this);

         this ._pickable .addInterest ("set_pickable__", this);

         this .set_pickable__ ();
      },
      set_pickableObjects__: function ()
      {
         this .set_pickable__ ();
      },
      set_pickable__: function ()
      {
         this .setPickableObject (Boolean (this ._pickable .getValue () || this .getTransformSensors () .size));
      },
      traverse: (function ()
      {
         const pickSensorNodes = new Set ();

         return function (type, renderObject)
         {
            if (type === TraverseType .PICKING)
            {
               if (this ._pickable .getValue ())
               {
                  if (this .getObjectType () .has ("NONE"))
                     return;

                  const
                     browser       = renderObject .getBrowser (),
                     pickableStack = browser .getPickable ();

                  if (this .getObjectType () .has ("ALL"))
                  {
                     pickableStack .push (true);
                     X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
                     pickableStack .pop ();
                  }
                  else
                  {
                     // Filter pick sensors.

                     const pickSensorStack = browser .getPickSensors ();

                     for (const pickSensorNode of pickSensorStack .at (-1))
                     {
                        if (! pickSensorNode .getObjectType () .has ("ALL"))
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
                              case MatchCriterion .MATCH_ANY:
                              {
                                 if (intersection === 0)
                                    continue;

                                 break;
                              }
                              case MatchCriterion .MATCH_EVERY:
                              {
                                 if (intersection !== pickSensor .getObjectType () .size)
                                    continue;

                                 break;
                              }
                              case MatchCriterion .MATCH_ONLY_ONE:
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

                     X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

                     pickSensorStack .pop ();
                     pickableStack   .pop ();

                     pickSensorNodes .clear ();
                  }
               }
            }
            else
            {
               X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
            }
         };
      })(),
   });

   return PickableGroup;
});

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


define ('x_ite/Browser/Picking/VolumePicker',[
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   require .getComponentUrl ("rigid-body-physics"),
],
function (Vector3,
          Rotation4,
          Matrix4,
          RigidBodyPhysics)
{
"use strict";

   const Ammo = RigidBodyPhysics .Ammo;

   function VolumePicker ()
   {
      this .broadphase             = new Ammo .btDbvtBroadphase ();
      this .collisionConfiguration = new Ammo .btDefaultCollisionConfiguration ();
      this .dispatcher             = new Ammo .btCollisionDispatcher (this .collisionConfiguration);
      this .collisionWorld         = new Ammo .btCollisionWorld (this .dispatcher, this .broadphase, this .collisionConfiguration);

      this .compoundShape1         = new Ammo .btCompoundShape ();
      this .motionState1           = new Ammo .btDefaultMotionState ();
      this .constructionInfo1      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState1, this .compoundShape1);
      this .rigidBody1             = new Ammo .btRigidBody (this .constructionInfo1);

      this .compoundShape2         = new Ammo .btCompoundShape ();
      this .motionState2           = new Ammo .btDefaultMotionState ();
      this .constructionInfo2      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState2, this .compoundShape2);
      this .rigidBody2             = new Ammo .btRigidBody (this .constructionInfo2);

      this .collisionWorld .addCollisionObject (this .rigidBody1);
      this .collisionWorld .addCollisionObject (this .rigidBody2);
   }

   VolumePicker .prototype =
   {
      constuctor: VolumePicker,
      setChildShape1: function (matrix, childShape)
      {
         this .setChildShape (this .compoundShape1, matrix, childShape);
      },
      setChildShape2: function (matrix, childShape)
      {
         this .setChildShape (this .compoundShape2, matrix, childShape);
      },
      setChildShape1Components: function (transform, localScaling, childShape)
      {
         this .setChildShapeComponents (this .compoundShape1, transform, localScaling, childShape);
      },
      setChildShape2Components: function (transform, localScaling, childShape)
      {
         this .setChildShapeComponents (this .compoundShape2, transform, localScaling, childShape);
      },
      setChildShape: (function ()
      {
         const
            translation = new Vector3 (0, 0, 0),
            rotation    = new Rotation4 (0, 0, 1, 0),
            scale       = new Vector3 (1, 1, 1),
            s           = new Ammo .btVector3 (0, 0, 0);

         return function (compoundShape, matrix, childShape)
         {
            try
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
            }
            catch (error)
            {
               // matrix .get
            }
         };
      })(),
      setChildShapeComponents: function (compoundShape, transform, localScaling, childShape)
      {
         if (compoundShape .getNumChildShapes ())
            compoundShape .removeChildShapeByIndex (0);

         if (childShape .getNumChildShapes ())
         {
            childShape .setLocalScaling (localScaling);
            compoundShape .addChildShape (transform, childShape);
         }
      },
      contactTest: function ()
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
      getTransform: (function ()
      {
         const
            T = new Ammo .btTransform (),
            o = new Ammo .btVector3 (0, 0, 0),
            m = new Matrix4 ();

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
   };

   return VolumePicker;
});

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


define ('x_ite/Components/Picking/PointPickSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Picking/X3DPickSensorNode",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Picking/IntersectionType",
   "x_ite/Browser/Picking/VolumePicker",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Geometry/Box3",
   require .getComponentUrl ("rigid-body-physics"),
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPickSensorNode,
          X3DCast,
          X3DConstants,
          IntersectionType,
          VolumePicker,
          Vector3,
          Rotation4,
          Box3,
          RigidBodyPhysics)
{
"use strict";

   var Ammo = RigidBodyPhysics .Ammo;

   function PointPickSensor (executionContext)
   {
      X3DPickSensorNode .call (this, executionContext);

      this .addType (X3DConstants .PointPickSensor);

      this .pickingGeometryNode = null;
      this .picker              = new VolumePicker ();
      this .compoundShapes      = [ ];
   }

   PointPickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
   {
      constructor: PointPickSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",       new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",   new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType", new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",        new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "PointPickSensor";
      },
      getComponentName: function ()
      {
         return "Picking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DPickSensorNode .prototype .initialize .call (this);

         this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

         this .set_pickingGeometry__ ();
      },
      set_pickingGeometry__: function ()
      {
         if (this .pickingGeometryNode)
            this .pickingGeometryNode ._rebuild .removeInterest ("set_geometry__", this);

         this .pickingGeometryNode = X3DCast (X3DConstants .PointSet, this ._pickingGeometry);

         if (this .pickingGeometryNode)
            this .pickingGeometryNode ._rebuild .addInterest ("set_geometry__", this);

         this .set_geometry__ ();
      },
      set_geometry__: (function ()
      {
         var
            defaultScale = new Ammo .btVector3 (1, 1, 1),
            o            = new Ammo .btVector3 (),
            t            = new Ammo .btTransform ();

         return function ()
         {
            var compoundShapes = this .compoundShapes;

            if (this .pickingGeometryNode)
            {
               var coord = this .pickingGeometryNode .getCoord ();

               if (coord)
               {
                  for (var i = 0, length = coord .getSize (); i < length; ++ i)
                  {
                     if (i < compoundShapes .length)
                     {
                        var
                           compoundShape = compoundShapes [i],
                           point         = coord .get1Point (i, compoundShape .point);

                        o .setValue (point .x, point .y, point .z);
                        t .setOrigin (o);

                        compoundShape .setLocalScaling (defaultScale);
                        compoundShape .updateChildTransform (0, t);
                     }
                     else
                     {
                        var
                           compoundShape = new Ammo .btCompoundShape (),
                           sphereShape   = new Ammo .btSphereShape (0),
                           point         = coord .get1Point (i, new Vector3 (0, 0, 0));

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
      process: (function ()
      {
         var
            pickingBBox   = new Box3 (),
            targetBBox    = new Box3 (),
            pickingCenter = new Vector3 (0, 0, 0),
            targetCenter  = new Vector3 (0, 0, 0),
            transform     = new Ammo .btTransform (),
            localScaling  = new Ammo .btVector3 (),
            translation   = new Vector3 (0, 0, 0),
            rotation      = new Rotation4 (0, 0, 1, 0),
            scale         = new Vector3 (1, 1, 1),
            pickedPoint   = new Fields .MFVec3f ();

         return function ()
         {
            if (this .pickingGeometryNode)
            {
               var
                  modelMatrices = this .getModelMatrices (),
                  targets       = this .getTargets ();

               switch (this .getIntersectionType ())
               {
                  case IntersectionType .BOUNDS:
                  {
                     // Intersect bboxes.

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var target = targets [t];

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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
                  case IntersectionType .GEOMETRY:
                  {
                     // Intersect geometry.

                     var
                        picker         = this .picker,
                        compoundShapes = this .compoundShapes;

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        modelMatrix .get (translation, rotation, scale);

                        picker .getTransform (translation, rotation, transform);
                        localScaling .setValue (scale .x, scale .y, scale .z);

                        for (var c = 0, cLength = compoundShapes .length; c < cLength; ++ c)
                        {
                           var compoundShape = compoundShapes [c];

                           picker .setChildShape1Components (transform, localScaling, compoundShape);

                           for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                           {
                              var
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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     var pickedTargets = this .getPickedTargets ();

                     pickedPoint .length = 0;

                     for (var t = 0, tLength = pickedTargets .length; t < tLength; ++ t)
                     {
                        var pp = pickedTargets [t] .pickedPoint;

                        for (var p = 0, pLength = pp .length; p < pLength; ++ p)
                           pickedPoint .push (pp [p]);
                     }

                     if (! this ._pickedPoint .equals (pickedPoint))
                        this ._pickedPoint = pickedPoint;

                     break;
                  }
               }
            }

            X3DPickSensorNode .prototype .process .call (this);
         };
      })(),
   });

   return PointPickSensor;
});

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


define ('x_ite/Components/Picking/PrimitivePickSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Picking/X3DPickSensorNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Picking/IntersectionType",
   "x_ite/Browser/Picking/VolumePicker",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPickSensorNode,
          X3DConstants,
          IntersectionType,
          VolumePicker,
          Vector3,
          Box3)
{
"use strict";

   function PrimitivePickSensor (executionContext)
   {
      X3DPickSensorNode .call (this, executionContext);

      this .addType (X3DConstants .PrimitivePickSensor);

      this .pickingGeometryNode = null;
      this .picker              = new VolumePicker ();
   }

   PrimitivePickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
   {
      constructor: PrimitivePickSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",       new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",   new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType", new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",        new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "PrimitivePickSensor";
      },
      getComponentName: function ()
      {
         return "Picking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DPickSensorNode .prototype .initialize .call (this);

         this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

         this .set_pickingGeometry__ ();
      },
      set_pickingGeometry__: function ()
      {
         this .pickingGeometryNode = null;

         try
         {
            var
               node = this ._pickingGeometry .getValue () .getInnerNode (),
               type = node .getType ();

            for (var t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .Box:
                  case X3DConstants .Cone:
                  case X3DConstants .Cylinder:
                  case X3DConstants .Sphere:
                  {
                     this .pickingGeometryNode = node;
                     break;
                  }
                  default:
                     continue;
               }
            }
         }
         catch (error)
         { }
      },
      process: (function ()
      {
         var
            pickingBBox   = new Box3 (),
            targetBBox    = new Box3 (),
            pickingCenter = new Vector3 (0, 0, 0),
            targetCenter  = new Vector3 (0, 0, 0);

         return function ()
         {
            if (this .pickingGeometryNode)
            {
               var
                  modelMatrices = this .getModelMatrices (),
                  targets       = this .getTargets ();

               switch (this .getIntersectionType ())
               {
                  case IntersectionType .BOUNDS:
                  {
                     // Intersect bboxes.

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var target = targets [t];

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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
                  case IntersectionType .GEOMETRY:
                  {
                     // Intersect geometry.

                     var picker = this .picker;

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var
                           modelMatrix  = modelMatrices [m],
                           pickingShape = this .getPickShape (this .pickingGeometryNode);

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        picker .setChildShape1 (modelMatrix, pickingShape .getCompoundShape ());

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var
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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
               }
            }

            X3DPickSensorNode .prototype .process .call (this);
         };
      })(),
   });

   return PrimitivePickSensor;
});

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


define ('x_ite/Components/Picking/VolumePickSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Picking/X3DPickSensorNode",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Picking/IntersectionType",
   "x_ite/Browser/Picking/VolumePicker",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPickSensorNode,
          X3DCast,
          X3DConstants,
          IntersectionType,
          VolumePicker,
          Vector3,
          Box3)
{
"use strict";

   function VolumePickSensor (executionContext)
   {
      X3DPickSensorNode .call (this, executionContext);

      this .addType (X3DConstants .VolumePickSensor);

      this .pickingGeometryNode = null;
      this .picker              = new VolumePicker ();
   }

   VolumePickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
   {
      constructor: VolumePickSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",       new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",   new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType", new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",        new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",   new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "VolumePickSensor";
      },
      getComponentName: function ()
      {
         return "Picking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DPickSensorNode .prototype .initialize .call (this);

         this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

         this .set_pickingGeometry__ ();
      },
      set_pickingGeometry__: function ()
      {
         this .pickingGeometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._pickingGeometry);
      },
      process: (function ()
      {
         var
            pickingBBox   = new Box3 (),
            targetBBox    = new Box3 (),
            pickingCenter = new Vector3 (0, 0, 0),
            targetCenter  = new Vector3 (0, 0, 0);

         return function ()
         {
            if (this .pickingGeometryNode)
            {
               var
                  modelMatrices = this .getModelMatrices (),
                  targets       = this .getTargets ();

               switch (this .getIntersectionType ())
               {
                  case IntersectionType .BOUNDS:
                  {
                     // Intersect bboxes.

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var modelMatrix = modelMatrices [m];

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var target = targets [t];

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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
                  case IntersectionType .GEOMETRY:
                  {
                     // Intersect geometry.

                     var picker = this .picker;

                     for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
                     {
                        var
                           modelMatrix  = modelMatrices [m],
                           pickingShape = this .getPickShape (this .pickingGeometryNode);

                        pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                        picker .setChildShape1 (modelMatrix, pickingShape .getCompoundShape ());

                        for (var t = 0, tLength = targets .size; t < tLength; ++ t)
                        {
                           var
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

                     var
                        pickedGeometries = this .getPickedGeometries (),
                        active           = Boolean (pickedGeometries .length);

                     pickedGeometries .remove (0, pickedGeometries .length, null);

                     if (active !== this ._isActive .getValue ())
                        this ._isActive = active;

                     if (! this ._pickedGeometry .equals (pickedGeometries))
                        this ._pickedGeometry = pickedGeometries;

                     break;
                  }
               }
            }

            X3DPickSensorNode .prototype .process .call (this);
         };
      })(),
   });

   return VolumePickSensor;
});

/*******************************************************************************
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


define (require .getComponentUrl ("picking"), [
   "x_ite/Components",
   "x_ite/Components/Picking/LinePickSensor",
   "x_ite/Components/Picking/PickableGroup",
   "x_ite/Components/Picking/PointPickSensor",
   "x_ite/Components/Picking/PrimitivePickSensor",
   "x_ite/Components/Picking/VolumePickSensor",
   "x_ite/Components/Picking/X3DPickSensorNode",
   "x_ite/Components/Picking/X3DPickableObject",
   require .getComponentUrl ("rigid-body-physics"),
],
function (Components,
          LinePickSensor,
          PickableGroup,
          PointPickSensor,
          PrimitivePickSensor,
          VolumePickSensor,
          X3DPickSensorNode,
          X3DPickableObject)
{
"use strict";

   Components .addComponent ({
      name: "Picking",
      types:
      {
         LinePickSensor:      LinePickSensor,
         PickableGroup:       PickableGroup,
         PointPickSensor:     PointPickSensor,
         PrimitivePickSensor: PrimitivePickSensor,
         VolumePickSensor:    VolumePickSensor,
      },
      abstractTypes:
      {
         X3DPickSensorNode: X3DPickSensorNode,
         X3DPickableObject: X3DPickableObject,
      },
   });
});


})();
