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
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Bits/X3DCast",
   "x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DCast,
          X3DConstants)
{
"use strict";

   function Text (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .Text);

      this .length_     .setUnit ("length");
      this .maxExtent_  .setUnit ("length");
      this .origin_     .setUnit ("length");
      this .textBounds_ .setUnit ("length");
      this .lineBounds_ .setUnit ("length");
   }

   Text .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: Text,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "string",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "length",     new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxExtent",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "origin",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "textBounds", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "lineBounds", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fontStyle",  new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "Text";
      },
      getComponentName: function ()
      {
         return "Text";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      initialize: function ()
      {
         X3DGeometryNode .prototype .initialize .call (this);

         this .fontStyle_ .addInterest ("set_fontStyle__", this);

         this .set_fontStyle__ ();
      },
      getMatrix: function ()
      {
         return this .textGeometry .getMatrix ();
      },
      getLength: function (index)
      {
         if (index < this .length_ .length)
            return Math .max (0, this .length_ [index]);

         return 0;
      },
      set_live__: function ()
      {
          X3DGeometryNode .prototype .set_live__ .call (this);

         if (this .isLive () .getValue ())
            this .getBrowser () .getBrowserOptions () .PrimitiveQuality_ .addInterest ("requestRebuild", this);
         else
            this .getBrowser () .getBrowserOptions () .PrimitiveQuality_ .removeInterest ("requestRebuild", this);
      },
      set_fontStyle__: function ()
      {
         if (this .fontStyleNode)
            this .fontStyleNode .removeInterest ("requestRebuild", this);

         this .fontStyleNode = X3DCast (X3DConstants .X3DFontStyleNode, this .fontStyle_);

         if (! this .fontStyleNode)
            this .fontStyleNode = this .getBrowser () .getDefaultFontStyle ();

         this .fontStyleNode .addInterest ("requestRebuild", this);

         this .textGeometry = this .fontStyleNode .getTextGeometry (this);

         this .setTransparent (this .textGeometry .getTransparent ());
      },
      build: function ()
      {
         this .textGeometry .update ();
         this .textGeometry .build ();

         this .setSolid (this .solid_ .getValue ());
      },
      traverse: function (type, renderObject)
      {
         try
         {
            this .textGeometry .traverse (type, renderObject);

            X3DGeometryNode .prototype .traverse .call (this, type, renderObject);
         }
         catch (error)
         {
            console .log (error);
         }
      },
      display: function (gl, context)
      {
         try
         {
            this .textGeometry .display (gl, context);

            X3DGeometryNode .prototype .display .call (this, gl, context);
         }
         catch (error)
         {
            console .log (error);
         }
      },
      transformLine: function (line)
      {
         // Apply sceen nodes transformation in place here.
         return this .textGeometry .transformLine (line);
      },
      transformMatrix: function (matrix)
      {
         // Apply sceen nodes transformation in place here.
         return this .textGeometry .transformMatrix (matrix);
      },
   });

   return Text;
});
