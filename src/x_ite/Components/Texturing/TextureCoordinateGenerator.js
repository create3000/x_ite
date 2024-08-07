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

import Fields                         from "../../Fields.js";
import X3DFieldDefinition             from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray           from "../../Base/FieldDefinitionArray.js";
import X3DNode                        from "../Core/X3DNode.js";
import X3DSingleTextureCoordinateNode from "./X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";
import ModeType                       from "../../Browser/Texturing/TextureCoordinateGeneratorModeType.js";

function TextureCoordinateGenerator (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinateGenerator);

   this .mode      = ModeType .SPHERE;
   this .parameter = new Float32Array (6);
}

Object .assign (Object .setPrototypeOf (TextureCoordinateGenerator .prototype, X3DSingleTextureCoordinateNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureCoordinateNode .prototype .initialize .call (this);

      this ._mode      .addInterest ("set_mode__",      this);
      this ._parameter .addInterest ("set_parameter__", this);

      this .set_mode__ ();
      this .set_parameter__ ();
   },
   set_mode__: (() =>
   {
      const modes = new Map ([
         ["SPHERE",                      ModeType .SPHERE],
         ["CAMERASPACENORMAL",           ModeType .CAMERASPACENORMAL],
         ["CAMERASPACEPOSITION",         ModeType .CAMERASPACEPOSITION],
         ["CAMERASPACEREFLECTIONVECTOR", ModeType .CAMERASPACEREFLECTIONVECTOR],
         ["SPHERE-LOCAL",                ModeType .SPHERE_LOCAL],
         ["COORD",                       ModeType .COORD],
         ["COORD-EYE",                   ModeType .COORD_EYE],
         ["NOISE",                       ModeType .NOISE],
         ["NOISE-EYE",                   ModeType .NOISE_EYE],
         ["SPHERE-REFLECT",              ModeType .SPHERE_REFLECT],
         ["SPHERE-REFLECT-LOCAL",        ModeType .SPHERE_REFLECT_LOCAL],
      ]);

      return function ()
      {
         this .mode = modes .get (this ._mode .getValue ());

         if (this .mode === undefined)
            this .mode = ModeType .SPHERE;
      };
   })(),
   set_parameter__ ()
   {
      const length = Math .min (this .parameter .length, this ._parameter .length)

      for (let i = 0; i < length; ++ i)
         this .parameter [i] = this ._parameter [i];

      this .parameter .fill (0, length);
   },
   addPointToChannel (index, array)
   {
      array .push (0, 0, 0, 1);
   },
   addPoints (array)
   {
      return array;
   },
   setShaderUniforms (gl, shaderObject, channel = 0)
   {
      gl .uniform1i  (shaderObject .x3d_TextureCoordinateGeneratorMode [channel],      this .mode);
      gl .uniform1fv (shaderObject .x3d_TextureCoordinateGeneratorParameter [channel], this .parameter);
   },
});

Object .defineProperties (TextureCoordinateGenerator,
{
   ... X3DNode .getStaticProperties ("TextureCoordinateGenerator", "Texturing", 2, "texCoord", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mode",      new Fields .SFString ("SPHERE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "parameter", new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default TextureCoordinateGenerator;
