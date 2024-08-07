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
import X3DTextureNode       from "./X3DTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import ModeType             from "../../Browser/Texturing/ModeType.js";
import SourceType           from "../../Browser/Texturing/SourceType.js";
import FunctionType         from "../../Browser/Texturing/FunctionType.js";

function MultiTexture (executionContext)
{
   X3DTextureNode .call (this, executionContext);

   this .addType (X3DConstants .MultiTexture);

   const browser = this .getBrowser ();

   this .maxTextures  = browser .getMaxTextures ()
   this .color        = new Float32Array (4);
   this .modes        = [ ];
   this .alphaModes   = [ ];
   this .sources      = [ ];
   this .functions    = [ ];
   this .textureNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MultiTexture .prototype, X3DTextureNode .prototype),
{
   initialize ()
   {
      X3DTextureNode .prototype .initialize .call (this);

      this ._color    .addInterest ("set_color__",    this);
      this ._alpha    .addInterest ("set_alpha__",    this);
      this ._mode     .addInterest ("set_mode__",     this);
      this ._source   .addInterest ("set_source__",   this);
      this ._function .addInterest ("set_function__", this);
      this ._texture  .addInterest ("set_texture__",  this);

      this .set_color__ ();
      this .set_alpha__ ();
      this .set_mode__ ();
      this .set_source__ ();
      this .set_function__ ();
      this .set_texture__ ();
   },
   getCount ()
   {
      return Math .min (this .maxTextures, this .textureNodes .length);
   },
   getMode (index)
   {
      if (index < this .modes .length)
         return this .modes [index];

      return ModeType .MODULATE;
   },
   getAlphaMode (index)
   {
      if (index < this .alphaModes .length)
         return this .alphaModes [index];

      return ModeType .MODULATE;
   },
   getSource (index)
   {
      if (index < this .sources .length)
         return this .sources [index];

      return SourceType .DEFAULT;
   },
   getFunction (index)
   {
      if (index < this .functions .length)
         return this .functions [index];

      return FunctionType .DEFAULT;
   },
   set_color__ ()
   {
      this .color [0] = this ._color .r;
      this .color [1] = this ._color .g;
      this .color [2] = this ._color .b;
   },
   set_alpha__ ()
   {
      this .color [3] = this ._alpha;
   },
   set_mode__: (() =>
   {
      const modeTypes = new Map ([
         ["REPLACE",                   ModeType .REPLACE],
         ["MODULATE",                  ModeType .MODULATE],
         ["MODULATE2X",                ModeType .MODULATE2X],
         ["MODULATE4X",                ModeType .MODULATE4X],
         ["ADD",                       ModeType .ADD],
         ["ADDSIGNED",                 ModeType .ADDSIGNED],
         ["ADDSIGNED2X",               ModeType .ADDSIGNED2X],
         ["ADDSMOOTH",                 ModeType .ADDSMOOTH],
         ["SUBTRACT",                  ModeType .SUBTRACT],
         ["BLENDDIFFUSEALPHA",         ModeType .BLENDDIFFUSEALPHA],
         ["BLENDTEXTUREALPHA",         ModeType .BLENDTEXTUREALPHA],
         ["BLENDFACTORALPHA",          ModeType .BLENDFACTORALPHA],
         ["BLENDCURRENTALPHA",         ModeType .BLENDCURRENTALPHA],
         ["MODULATEALPHA_ADDCOLOR",    ModeType .MODULATEALPHA_ADDCOLOR],
         ["MODULATEINVALPHA_ADDCOLOR", ModeType .MODULATEINVALPHA_ADDCOLOR],
         ["MODULATEINVCOLOR_ADDALPHA", ModeType .MODULATEINVCOLOR_ADDALPHA],
         ["DOTPRODUCT3",               ModeType .DOTPRODUCT3],
         ["SELECTARG1",                ModeType .SELECTARG1],
         ["SELECTARG2",                ModeType .SELECTARG2],
         ["OFF",                       ModeType .OFF],
      ]);

      return function ()
      {
         this .modes      .length = 0;
         this .alphaModes .length = 0;

         for (const modes of this ._mode)
         {
            const mode = modes .split (",");

            for (let m = 0, l = mode .length; m < l; ++ m)
               mode [m] = mode [m] .trim ();

            if (mode .length === 0)
               mode .push ("MODULATE");

            if (mode .length < 2)
               mode .push (mode [0]);

            // RGB

            const modeType = modeTypes .get (mode [0]);

            if (modeType !== undefined)
               this .modes .push (modeType);
            else
               this .modes .push (ModeType .MODULATE);

            // Alpha

            const alphaModeType = modeTypes .get (mode [1]);

            if (alphaModeType !== undefined)
               this .alphaModes .push (alphaModeType);
            else
               this .alphaModes .push (ModeType .MODULATE);
         }
      };
   })(),
   set_source__: (() =>
   {
      const sourceTypes = new Map ([
         ["DIFFUSE",  SourceType .DIFFUSE],
         ["SPECULAR", SourceType .SPECULAR],
         ["FACTOR",   SourceType .FACTOR],
      ]);

      return function ()
      {
         this .sources .length = 0;

         for (const source of this ._source)
         {
            const sourceType = sourceTypes .get (source);

            if (sourceType !== undefined)
               this .sources .push (sourceType);
            else
               this .sources .push (SourceType .DEFAULT);
         }
      };
   })(),
   set_function__: (() =>
   {
      const functionsTypes = new Map ([
         ["COMPLEMENT",     FunctionType .COMPLEMENT],
         ["ALPHAREPLICATE", FunctionType .ALPHAREPLICATE],
      ]);

      return function ()
      {
         this .functions .length = 0;

         for (const func of this ._function)
         {
            const functionsType = functionsTypes .get (func);

            if (functionsType !== undefined)
               this .functions .push (functionsType);
            else
               this .functions .push (FunctionType .DEFAULT);
         }
      };
   })(),
   set_texture__ ()
   {
      for (const textureNode of this .textureNodes)
         textureNode ._linear .removeInterest ("addNodeEvent", this);

      this .textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast (X3DConstants .X3DSingleTextureNode, node);

         if (textureNode)
            this .textureNodes .push (textureNode);
      }

      for (const textureNode of this .textureNodes)
         textureNode ._linear .addInterest ("addNodeEvent", this);
   },
   updateTextureBits (textureBits)
   {
      const
         maxTextures  = this .maxTextures,
         textureNodes = this .textureNodes,
         channels     = Math .min (maxTextures, textureNodes .length);

      for (let i = 0; i < channels; ++ i)
         textureNodes [i] .updateTextureBits (textureBits, i);

      textureBits .set (maxTextures * 2, 1);
   },
   getShaderOptions (options)
   {
      const
         textureNodes = this .textureNodes,
         channels     = Math .min (this .maxTextures, textureNodes .length);

      for (let i = 0; i < channels; ++ i)
         textureNodes [i] .getShaderOptions (options, i);
   },
   traverse (type, renderObject)
   {
      for (const textureNode of this .textureNodes)
         textureNode .traverse (type, renderObject);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const
         textureNodes = this .textureNodes,
         channels     = Math .min (this .maxTextures, textureNodes .length);

      gl .uniform4fv (shaderObject .x3d_MultiTextureColor, this .color);

      for (let i = 0; i < channels; ++ i)
      {
         textureNodes [i] .setShaderUniforms (gl, shaderObject, renderObject, shaderObject .x3d_Texture [i]);

         gl .uniform1i  (shaderObject .x3d_MultiTextureMode [i],      this .getMode (i));
         gl .uniform1i  (shaderObject .x3d_MultiTextureAlphaMode [i], this .getAlphaMode (i));
         gl .uniform1i  (shaderObject .x3d_MultiTextureSource [i],    this .getSource (i));
         gl .uniform1i  (shaderObject .x3d_MultiTextureFunction [i],  this .getFunction (i));
      }
   },
});

Object .defineProperties (MultiTexture, X3DNode .staticProperties ("MultiTexture", "Texturing", 2, "texture", "3.0"));

Object .defineProperties (MultiTexture,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",       new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "alpha",       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mode",        new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "source",      new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "function",    new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texture",     new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MultiTexture;
