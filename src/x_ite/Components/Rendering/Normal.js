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


define ([
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DNormalNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNormalNode,
          X3DConstants,
          Vector3)
{
"use strict";

   function Normal (executionContext)
   {
      X3DNormalNode .call (this, executionContext);

      this .addType (X3DConstants .Normal);
   }

   Normal .prototype = Object .assign (Object .create (X3DNormalNode .prototype),
   {
      constructor: Normal,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "vector",   new Fields .MFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "Normal";
      },
      getComponentName: function ()
      {
         return "Rendering";
      },
      getContainerField: function ()
      {
         return "normal";
      },
      initialize: function ()
      {
         X3DNormalNode .prototype .initialize .call (this);

         this ._vector .addInterest ("set_vector__", this);

         this .set_vector__ ();
      },
      set_vector__: function ()
      {
         this .vector = this ._vector .getValue ();
         this .length = this ._vector .length;
      },
      set1Vector: function (index, vector)
      {
         this ._vector [index] = vector;
      },
      get1Vector: function (index, result)
      {
         if (index >= 0 && index < this .length)
         {
            const vector = this .vector;

            index *= 3;

            return result .set (vector [index], vector [index + 1], vector [index + 2]);
         }
         else if (index >= 0 && this .length)
         {
            const vector = this .vector;

            index %= this .length;
            index *= 3;

            return result .set (vector [index], vector [index + 1], vector [index + 2]);
         }
         else
         {
            return result .set (0, 0, 0);
         }
      },
      addVector: function (index, array)
      {
         if (index >= 0 && index < this .length)
         {
            const vector = this .vector;

            index *= 3;

            array .push (vector [index], vector [index + 1], vector [index + 2]);
         }
         else if (index >= 0 && this .length)
         {
            const vector = this .vector;

            index %= this .length;
            index *= 3;

            array .push (vector [index], vector [index + 1], vector [index + 2]);
         }
         else
         {
            return array .push (0, 0, 0);
         }
      },
   });

   return Normal;
});
