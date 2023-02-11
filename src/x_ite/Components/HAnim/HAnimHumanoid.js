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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import Group                from "../Grouping/Group.js";
import Transform            from "../Grouping/Transform.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function HAnimHumanoid (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .HAnimHumanoid);

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
   this ._bboxSize    .setUnit ("length");
   this ._bboxCenter  .setUnit ("length");

   this .skeletonNode   = new Group (executionContext);
   this .viewpointsNode = new Group (executionContext);
   this .skinNode       = new Group (executionContext);
   this .transformNode  = new Transform (executionContext);
   this .jointNodes     = [ ];
   this .skinNormalNode = null;
   this .skinCoordNode  = null;
   this .restNormalNode = null;
   this .restCoordNode  = null;
   this .changed        = false;
}

HAnimHumanoid .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   constructor: HAnimHumanoid,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",              new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",           new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "name",                  new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "version",               new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "info",                  new Fields .MFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",           new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",              new Fields .SFRotation ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",                 new Fields .SFVec3f (1, 1, 1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation",      new Fields .SFRotation ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingPositions", new Fields .MFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingRotations", new Fields .MFRotation ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "jointBindingScales",    new Fields .MFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "motionsEnabled",        new Fields .MFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "loa",                   new Fields .SFInt32 (-1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skeletalConfiguration", new Fields .SFString ("BASIC")),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",               new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",           new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",              new Fields .SFVec3f (-1, -1, -1)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",            new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skeleton",              new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoints",            new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "sites",                 new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "segments",              new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",                new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "motions",               new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skinBindingNormal",     new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skinBindingCoord",      new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skinNormal",            new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoord",             new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "skin",                  new Fields .MFNode ()),
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

      this .skeletonNode   .setAllowedTypes (X3DConstants .HAnimJoint, X3DConstants .HAnimSite);
      this .viewpointsNode .setAllowedTypes (X3DConstants .HAnimSite);

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
         const jointNode = X3DCast (X3DConstants .HAnimJoint, node);

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

      this .skinNormalNode = X3DCast (X3DConstants .X3DNormalNode, this ._skinNormal);

      if (this .skinNormalNode)
         this .restNormalNode = this .skinNormalNode .copy ();

      this .changed = true;
   },
   set_skinCoord__: function ()
   {
      this .restCoordNode = null;

      this .skinCoordNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._skinCoord);

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
         invModelMatrix = new Matrix4 (),
         vector         = new Vector3 (0, 0, 0),
         rest           = new Vector3 (0, 0, 0),
         skin           = new Vector3 (0, 0, 0),
         point          = new Vector3 (0, 0, 0);

      return function (type, renderObject)
      {
         if (type !== TraverseType .CAMERA)
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
                     displacement = i < displacementsLength ? point .set (displacements [i3], displacements [i3 + 1], displacements [i3 + 2]) : point .assign (Vector3 .Zero);

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

      X3DChildNode .prototype .toVRMLStream .call (this, generator);
   },
   toXMLStream: function (generator)
   {
      if (this .skinCoordNode)
         this .skinCoordNode ._point = this .restCoordNode ._point;

      if (this .skinNormalNode)
         this .skinNormalNode ._vector = this .restNormalNode ._vector;

      X3DChildNode .prototype .toXMLStream .call (this, generator);
   },
   toJSONStream: function (generator)
   {
      if (this .skinCoordNode)
         this .skinCoordNode ._point = this .restCoordNode ._point;

      if (this .skinNormalNode)
         this .skinNormalNode ._vector = this .restNormalNode ._vector;

      X3DChildNode .prototype .toJSONStream .call (this, generator);
   },
   dispose: function ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

export default HAnimHumanoid;
