/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function ComposedVolumeStyle (executionContext)
   {
      X3DComposableVolumeRenderStyleNode .call (this, executionContext);

      this .addType (X3DConstants .ComposedVolumeStyle);

      this .renderStyleNodes = [ ];
   }

   ComposedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
   {
      constructor: ComposedVolumeStyle,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle", new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "ComposedVolumeStyle";
      },
      getComponentName: function ()
      {
         return "VolumeRendering";
      },
      getContainerField: function ()
      {
         return "renderStyle";
      },
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this .renderStyle_ .addInterest ("set_renderStyle__", this);

         this .set_renderStyle__ ();
      },
      addVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addVolumeData (volumeDataNode);
         }
      },
      removeVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeVolumeData (volumeDataNode);
         }
      },
      set_renderStyle__: function ()
      {
         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               renderStyleNode .removeVolumeData (volumeDataNode);
            });
         }

         renderStyleNodes .length = 0;

         for (var i = 0, length = this .renderStyle_ .length; i < length; ++ i)
         {
            var renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this .renderStyle_ [i]);

            if (renderStyleNode)
               renderStyleNodes .push (renderStyleNode);
         }

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               renderStyleNode .addVolumeData (volumeDataNode);
            });
         }
      },
      addShaderFields: function (shaderNode)
      {
         if (! this .enabled_ .getValue ())
            return;

         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            renderStyleNodes [i] .addShaderFields (shaderNode);
      },
      getUniformsText: function ()
      {
         if (! this .enabled_ .getValue ())
            return "";

         var
            renderStyleNodes = this .renderStyleNodes,
            string           = "";

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            string += renderStyleNodes [i] .getUniformsText ();

         string += "\n";
         string += "vec4\n";
         string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
         string += "{\n";

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            string += renderStyleNodes [i] .getFunctionsText ();

         string += "\n";
         string += "	return textureColor;\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this .enabled_ .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// ComposedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
      }
   });

   return ComposedVolumeStyle;
});
