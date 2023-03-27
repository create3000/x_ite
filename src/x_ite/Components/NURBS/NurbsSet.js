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
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function NurbsSet (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .NurbsSet);

   this .geometryNodes = [ ];
}

NurbsSet .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   constructor: NurbsSet,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellationScale", new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOnly,      "addGeometry",       new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOnly,      "removeGeometry",    new Fields .MFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "NurbsSet";
   },
   getComponentName: function ()
   {
      return "NURBS";
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
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._tessellationScale .addInterest ("set_tessellationScale__", this);
      this ._addGeometry       .addInterest ("set_addGeometry__",       this);
      this ._removeGeometry    .addInterest ("set_removeGeometry__",    this);
      this ._geometry          .addInterest ("set_geometry__",          this);

      this .set_geometry__ ();
   },
   getBBox: function (bbox, shadows)
   {
      // Add bounding boxes

      for (const geometryNode of this .geometryNodes)
         bbox .add (geometryNode .getBBox ());

      return bbox;
   },
   set_tessellationScale__: function ()
   {
      const tessellationScale = Math .max (0, this ._tessellationScale .getValue ());

      for (const geometryNode of this .geometryNodes)
         geometryNode .setTessellationScale (tessellationScale);
   },
   set_addGeometry__: function ()
   {
      this ._addGeometry .setTainted (true);

      this ._addGeometry .erase (remove (this ._addGeometry, 0, this ._addGeometry .length,
                                         this ._geometry,    0, this ._geometry .length),
                                 this ._addGeometry .length);

      for (const geometry of this ._addGeometry)
         this ._geometry .push (geometry);

      this ._addGeometry .length = 0;
      this ._addGeometry .setTainted (false);
   },
   set_removeGeometry__: function ()
   {
      this ._removeGeometry .setTainted (true);

      this ._geometry .erase (remove (this ._geometry,       0, this ._geometry .length,
                                      this ._removeGeometry, 0, this ._removeGeometry .length),
                              this ._geometry .length);

      this ._removeGeometry .length = 0;
      this ._removeGeometry .setTainted (false);
   },
   set_geometry__: function ()
   {
      for (const geometryNode of this .geometryNodes)
         geometryNode .setTessellationScale (1);

      this .geometryNodes .length = 0;

      for (const node of this ._geometry)
      {
         const geometryNode = X3DCast (X3DConstants .X3DNurbsSurfaceGeometryNode, node);

         if (geometryNode)
            this .geometryNodes .push (geometryNode);
      }

      this .set_tessellationScale__ ();
   },
   dispose: function ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

function remove (array, first, last, range, rfirst, rlast)
{
   const set = new Set ();

   for (let i = rfirst; i < rlast; ++ i)
      set .add (range [i]);

   function compare (value) { return set .has (value); }

   return array .remove (first, last, compare);
}

export default NurbsSet;
