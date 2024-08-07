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
import X3DNode              from "../Core/X3DNode.js";
import X3DTransformNode     from "../Grouping/X3DTransformNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function HAnimJoint (executionContext)
{
   X3DTransformNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimJoint);

   this .addChildObjects (X3DConstants .outputOnly, "displacements",       new Fields .SFTime (),
                          X3DConstants .outputOnly, "displacementWeights", new Fields .SFTime ());

   this .setAllowedTypes (X3DConstants .HAnimJoint,
                          X3DConstants .HAnimSegment,
                          X3DConstants .HAnimSite);

   this .displacerNodes  = [ ];
   this .modelViewMatrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (HAnimJoint .prototype, X3DTransformNode .prototype),
{
   initialize ()
   {
      X3DTransformNode .prototype .initialize .call (this);

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
         const displacerNode = X3DCast (X3DConstants .HAnimDisplacer, node);

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

      if (type === TraverseType .DISPLAY)
         this .modelViewMatrix .assign (modelViewMatrix .get ());

      X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse (type, renderObject)
   {
      if (type === TraverseType .DISPLAY)
         this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());

      X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);
   },
});

Object .defineProperties (HAnimJoint, X3DNode .getStaticProperties ("HAnimJoint", "HAnim", 1, "children", "3.0"));

Object .defineProperties (HAnimJoint,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "llimit",           new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ulimit",           new Fields .MFFloat (0, 0, 0)),
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
      enumerable: true,
   },
});

export default HAnimJoint;
