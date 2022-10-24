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


define ('x_ite/Components/HAnim/HAnimDisplacer',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometricPropertyNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometricPropertyNode,
          X3DConstants)
{
"use strict";

   function HAnimDisplacer (executionContext)
   {
      X3DGeometricPropertyNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimDisplacer);

      this ._displacements .setUnit ("length");
   }

   HAnimDisplacer .prototype = Object .assign (Object .create (X3DGeometricPropertyNode .prototype),
   {
      constructor: HAnimDisplacer,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coordIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displacements", new Fields .MFVec3f ()),
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
   });

   return HAnimDisplacer;
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


define ('x_ite/Components/HAnim/HAnimHumanoid',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Grouping/Group",
   "x_ite/Components/Grouping/Transform",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          Group,
          Transform,
          X3DBoundedObject,
          TraverseType,
          X3DConstants,
          X3DCast,
          Matrix4,
          Vector3)
{
"use strict";

   function HAnimHumanoid (executionContext)
   {
      X3DChildNode     .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .HAnimHumanoid);

      this ._translation .setUnit ("length");
      this ._center      .setUnit ("length");
      this ._bboxSize    .setUnit ("length");
      this ._bboxCenter  .setUnit ("length");

      this .viewpointsNode = new Group (executionContext);
      this .skeletonNode   = new Group (executionContext);
      this .skinNode       = new Group (executionContext);
      this .transformNode  = new Transform (executionContext);
      this .jointNodes     = [ ];
      this .skinNormalNode = null;
      this .skinCoordNode  = null;
      this .restNormalNode = null;
      this .restCoordNode  = null;
   }

   HAnimHumanoid .prototype = Object .assign (Object .create (X3DChildNode .prototype),
      X3DBoundedObject .prototype,
   {
      constructor: HAnimHumanoid,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "version",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "info",             new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoints",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sites",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",           new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segments",         new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motions",          new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skeleton",         new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinNormal",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skin",             new Fields .MFNode ()),
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
      initialize: function ()
      {
         X3DChildNode     .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);

         // Groups

         this .viewpointsNode .setAllowedTypes (X3DConstants .HAnimSite);
         this .skeletonNode   .setAllowedTypes (X3DConstants .HAnimJoint, X3DConstants .HAnimSite);

         this ._viewpoints .addFieldInterest (this .viewpointsNode ._children);
         this ._skeleton   .addFieldInterest (this .skeletonNode   ._children);
         this ._skin       .addFieldInterest (this .skinNode       ._children);

         this .viewpointsNode ._children = this ._viewpoints;
         this .skeletonNode   ._children = this ._skeleton;
         this .skinNode       ._children = this ._skin;

         this .viewpointsNode .setPrivate (true);
         this .skeletonNode   .setPrivate (true);
         this .skinNode       .setPrivate (true);

         // Transform

         this ._translation      .addFieldInterest (this .transformNode ._translation);
         this ._rotation         .addFieldInterest (this .transformNode ._rotation);
         this ._scale            .addFieldInterest (this .transformNode ._scale);
         this ._scaleOrientation .addFieldInterest (this .transformNode ._scaleOrientation);
         this ._center           .addFieldInterest (this .transformNode ._center);
         this ._bboxSize         .addFieldInterest (this .transformNode ._bboxSize);
         this ._bboxCenter       .addFieldInterest (this .transformNode ._bboxCenter);

         this .transformNode ._translation      = this ._translation;
         this .transformNode ._rotation         = this ._rotation;
         this .transformNode ._scale            = this ._scale;
         this .transformNode ._scaleOrientation = this ._scaleOrientation;
         this .transformNode ._center           = this ._center;
         this .transformNode ._bboxSize         = this ._bboxSize;
         this .transformNode ._bboxCenter       = this ._bboxCenter;
         this .transformNode ._children         = [ this .viewpointsNode, this .skeletonNode, this .skinNode ];

         this .transformNode ._isCameraObject   .addFieldInterest (this ._isCameraObject);
         this .transformNode ._isPickableObject .addFieldInterest (this ._isPickableObject);

         // Setup

         this .viewpointsNode .setup ();
         this .skeletonNode   .setup ();
         this .skinNode       .setup ();
         this .transformNode  .setup ();

         this .setCameraObject   (this .transformNode .getCameraObject ());
         this .setPickableObject (this .transformNode .getPickableObject ());

         // Skinning

         this ._joints     .addInterest ("set_joints__",     this);
         this ._skinNormal .addInterest ("set_skinNormal__", this);
         this ._skinCoord  .addInterest ("set_skinCoord__",  this);

         this .set_joints__ ();
         this .set_skinNormal__ ();
         this .set_skinCoord__ ();
      },
      getBBox: function (bbox, shadow)
      {
         return this .transformNode .getBBox (bbox, shadow);
      },
      set_joints__: function ()
      {
         var jointNodes = this .jointNodes;

         jointNodes .length = 0;

         for (var i = 0, length = this ._joints .length; i < length; ++ i)
         {
            var jointNode = X3DCast (X3DConstants .HAnimJoint, this ._joints [i]);

            if (jointNode)
               jointNodes .push (jointNode);
         }
      },
      set_skinNormal__: function ()
      {
         this .restNormalNode = null;

         this .skinNormalNode = X3DCast (X3DConstants .X3DNormalNode, this ._skinNormal);

         if (this .skinNormalNode)
            this .restNormalNode = this .skinNormalNode .copy ();
      },
      set_skinCoord__: function ()
      {
         this .restCoordNode = null;

         this .skinCoordNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._skinCoord);

         if (this .skinCoordNode)
            this .restCoordNode = this .skinCoordNode .copy ();
      },
      traverse: function (type, renderObject)
      {
         this .transformNode .traverse (type, renderObject);
         this .skinning (type, renderObject);
      },
      skinning: (function ()
      {
         var
            invModelMatrix = new Matrix4 (),
            vector         = new Vector3 (0, 0, 0),
            rest           = new Vector3 (0, 0, 0),
            skin           = new Vector3 (0, 0, 0),
            point          = new Vector3 (0, 0, 0);

         return function (type, renderObject)
         {
            if (type !== TraverseType .CAMERA)
               return;

            if (! this .skinCoordNode)
               return;

            var
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

            for (var j = 0, jointNodesLength = jointNodes .length; j < jointNodesLength; ++ j)
            {
               var
                  jointNode            = jointNodes [j],
                  skinCoordIndexLength = jointNode ._skinCoordIndex .length;

               if (skinCoordIndexLength === 0)
                  continue;

               var
                  jointMatrix    = jointNode .getModelMatrix () .multRight (invModelMatrix),
                  displacerNodes = jointNode .getDisplacers ();

               for (var d = 0, displacerNodesLength = displacerNodes .length; d < displacerNodesLength; ++ d)
               {
                  var
                     displacerNode       = displacerNodes [d],
                     coordIndex          = displacerNode ._coordIndex .getValue (),
                     coordIndexLength    = displacerNode ._coordIndex .length,
                     weight              = displacerNode ._weight .getValue (),
                     displacements       = displacerNode ._displacements .getValue (),
                     displacementsLength = displacerNode ._displacements .length;

                  for (var i = 0; i < coordIndexLength; ++ i)
                  {
                     var
                        i3           = i * 3,
                        index        = coordIndex [i],
                        displacement = i < displacementsLength ? point .set (displacements [i3], displacements [i3 + 1], displacements [i3 + 2]) : point .assign (Vector3 .Zero);

                     skinCoordNode .get1Point (index, skin);
                     jointMatrix .multDirMatrix (displacement) .multiply (weight) .add (skin);
                     skinCoordNode .set1Point (index, displacement);
                  }
               }

               var
                  normalMatrix          = skinNormalNode ? jointMatrix .submatrix .transpose () .inverse () : null,
                  skinCoordIndex        = jointNode ._skinCoordIndex .getValue (),
                  skinCoordWeight       = jointNode ._skinCoordWeight .getValue (),
                  skinCoordWeightLength = jointNode ._skinCoordWeight .length;

               for (var i = 0; i < skinCoordIndexLength; ++ i)
               {
                  var
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
   });

   return HAnimHumanoid;
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


define ('x_ite/Components/HAnim/HAnimJoint',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DTransformNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformNode,
          TraverseType,
          X3DConstants,
          X3DCast,
          Matrix4)
{
"use strict";

   function HAnimJoint (executionContext)
   {
      X3DTransformNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimJoint);

      this .setAllowedTypes (X3DConstants .HAnimJoint,
                             X3DConstants .HAnimSegment,
                             X3DConstants .HAnimSite);

      this .displacerNodes = [ ];
      this .modelMatrix    = new Matrix4 ();
   }

   HAnimJoint .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
   {
      constructor: HAnimJoint,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "llimit",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ulimit",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "limitOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stiffness",        new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordIndex",   new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordWeight",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
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
      initialize: function ()
      {
         X3DTransformNode .prototype .initialize .call (this);

         this ._displacers .addInterest ("set_displacers__", this);

         this .set_displacers__ ();
      },
      setCameraObject: function (value)
      {
         X3DTransformNode .prototype .setCameraObject .call (this, value || !! this ._skinCoordIndex .length);
      },
      getModelMatrix: function ()
      {
         return this .modelMatrix;
      },
      getDisplacers: function ()
      {
         return this .displacerNodes;
      },
      set_displacers__: function ()
      {
         const displacerNodes = this .displacerNodes;

         displacerNodes .length = 0;

         for (var i = 0, length = this ._displacers .length; i < length; ++ i)
         {
            const displacerNode = X3DCast (X3DConstants .HAnimDisplacer, this ._displacers [i]);

            if (displacerNode)
               displacerNodes .push (displacerNode);
         }
      },
      getTraverse: (function ()
      {
         const base = X3DTransformNode .prototype .getTraverse ();

         function traverse (type, renderObject)
         {
            if (type === TraverseType .CAMERA)
               this .modelMatrix .assign (this .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ());

            base .call (this, type, renderObject);
         }

         return function ()
         {
            if (this ._skinCoordIndex .length)
               return traverse;

            return base;
         };
      })(),
      getGroupTraverse: (function ()
      {
         const base = X3DTransformNode .prototype .getGroupTraverse ();

         function traverse (type, renderObject)
         {
            if (type === TraverseType .CAMERA)
               this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());

            base .call (this, type, renderObject);
         }

         return function ()
         {
            if (this ._skinCoordIndex .length)
               return traverse;

            return base;
         };
      })(),
   });

   return HAnimJoint;
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


define ('x_ite/Components/HAnim/HAnimMotion',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants)
{
"use strict";

   function HAnimMotion (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimMotion);
   }

   HAnimMotion .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: HAnimMotion,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "next",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameDuration",   new Fields .SFTime (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameIncrement",  new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameIndex",      new Fields .SFInt32 (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loop",            new Fields .SFBool (false)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channels",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelsEnabled", new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "joints",          new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loa",             new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "values",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "cycleTime",       new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",     new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "frameCount",      new Fields .SFInt32 ()),
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
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);
      },
   });

   return HAnimMotion;
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


define ('x_ite/Components/HAnim/HAnimSegment',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DConstants)
{
"use strict";

   function HAnimSegment (executionContext)
   {
      X3DGroupingNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimSegment);

      this ._mass .setUnit ("mass");
   }

   HAnimSegment .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
   {
      constructor: HAnimSegment,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfMass",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "momentsOfInertia", new Fields .MFFloat (0, 0, 0, 0, 0, 0, 0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
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
   });

   return HAnimSegment;
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


define ('x_ite/Components/HAnim/HAnimSite',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DTransformNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformNode,
          X3DConstants)
{
"use strict";

   function HAnimSite (executionContext)
   {
      X3DTransformNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimSite);
   }

   HAnimSite .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
   {
      constructor: HAnimSite,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
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
   });

   return HAnimSite;
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


define (require .getComponentUrl ("h-anim"), [
   "x_ite/Components",
   "x_ite/Components/HAnim/HAnimDisplacer",
   "x_ite/Components/HAnim/HAnimHumanoid",
   "x_ite/Components/HAnim/HAnimJoint",
   "x_ite/Components/HAnim/HAnimMotion",
   "x_ite/Components/HAnim/HAnimSegment",
   "x_ite/Components/HAnim/HAnimSite",
],
function (Components,
          HAnimDisplacer,
          HAnimHumanoid,
          HAnimJoint,
          HAnimMotion,
          HAnimSegment,
          HAnimSite)
{
"use strict";

   Components .addComponent ({
      name: "HAnim",
      types:
      {
         HAnimDisplacer: HAnimDisplacer,
         HAnimHumanoid:  HAnimHumanoid,
         HAnimJoint:     HAnimJoint,
         HAnimMotion:    HAnimMotion,
         HAnimSegment:   HAnimSegment,
         HAnimSite:      HAnimSite,
      },
      abstractTypes:
      {
      },
   });
});


})();
