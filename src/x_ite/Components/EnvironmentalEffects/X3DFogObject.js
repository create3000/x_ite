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

import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import ObjectCache  from "../../../standard/Utility/ObjectCache.js";

const Fogs = ObjectCache (FogContainer);

function FogContainer ()
{
   this .fogMatrix = new Float32Array (9);
}

Object .assign (FogContainer .prototype,
{
   set (fogNode, modelViewMatrix)
   {
      this .fogNode = fogNode;

      this .fogMatrix .set (modelViewMatrix .submatrix .inverse ());
   },
   getFogType ()
   {
      return this .fogNode .getFogType ();
   },
   setShaderUniforms (gl, shaderObject)
   {
      if (shaderObject .hasFog (this))
         return;

      const fogNode = this .fogNode;

      gl .uniform3fv       (shaderObject .x3d_FogColor,           fogNode .colorArray);
      gl .uniform1f        (shaderObject .x3d_FogVisibilityRange, fogNode .visibilityRange);
      gl .uniformMatrix3fv (shaderObject .x3d_FogMatrix, false,   this .fogMatrix);
   },
   dispose ()
   {
      Fogs .push (this);
   },
});

function X3DFogObject (executionContext)
{
   this .addType (X3DConstants .X3DFogObject);

   this .addChildObjects (X3DConstants .inputOutput, "hidden", new Fields .SFBool ());

   this ._visibilityRange .setUnit ("length");

   this .colorArray = new Float32Array (3);
}

Object .assign (X3DFogObject .prototype,
{
   initialize ()
   {
      this ._hidden          .addInterest ("set_fogType__",         this);
      this ._fogType         .addInterest ("set_fogType__",         this);
      this ._color           .addInterest ("set_color__",           this);
      this ._visibilityRange .addInterest ("set_visibilityRange__", this);

      this .set_color__ ();
      this .set_visibilityRange__ ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   getFogType ()
   {
      return this .fogType;
   },
   getFogs ()
   {
      return Fogs;
   },
   set_fogType__: (() =>
   {
      const fogTypes = new Map ([
         ["LINEAR",      1],
         ["EXPONENTIAL", 2],
      ]);

      return function ()
      {
         if (this ._hidden .getValue () || this .visibilityRange === 0)
            this .fogType = 0;
         else
            this .fogType = fogTypes .get (this ._fogType .getValue ()) || 1;
      };
   })(),
   set_color__ ()
   {
      const
         color      = this ._color .getValue (),
         colorArray = this .colorArray;

      colorArray [0] = color .r;
      colorArray [1] = color .g;
      colorArray [2] = color .b;
   },
   set_visibilityRange__ ()
   {
      this .visibilityRange = Math .max (0, this ._visibilityRange .getValue ());

      this .set_fogType__ ();
   },
   dispose () { },
});

Object .defineProperties (X3DFogObject, X3DNode .getStaticProperties ("X3DFogObject", "EnvironmentalEffects", 1));

export default X3DFogObject;
