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

import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DShaderNode               from "./X3DShaderNode.js";
import X3DProgrammableShaderObject from "./X3DProgrammableShaderObject.js";
import LoadSensor                  from "../Networking/LoadSensor.js";
import X3DCast                     from "../../Base/X3DCast.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function ComposedShader (executionContext)
{
   X3DShaderNode               .call (this, executionContext);
   X3DProgrammableShaderObject .call (this, executionContext);

   this .addType (X3DConstants .ComposedShader);

   this .loadSensor                = new LoadSensor (executionContext);
   this .transformFeedbackVaryings = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedShader .prototype, X3DShaderNode .prototype),
   X3DProgrammableShaderObject .prototype,
{
   wireframe: false,
   initialize ()
   {
      X3DShaderNode               .prototype .initialize .call (this);
      X3DProgrammableShaderObject .prototype .initialize .call (this);

      // https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/shaders_glsl.html#relinkingprograms
      this ._activate .addInterest ("set_activate__", this);
      this ._language .addInterest ("set_loaded__",   this);

      this ._parts .addFieldInterest (this .loadSensor ._children);

      this .loadSensor ._isLoaded .addInterest ("connectLoaded", this);
      this .loadSensor ._children = this ._parts;
      this .loadSensor .setPrivate (true);
      this .loadSensor .setup ();

      if (this .loadSensor ._isLoaded .getValue ())
         this .set_loaded__ ();
      else
         this .connectLoaded ();
   },
   connectLoaded ()
   {
      this .loadSensor ._isLoaded .removeInterest ("connectLoaded", this);
      this .loadSensor ._isLoaded .addInterest ("set_loaded__", this);
   },
   addUserDefinedField (accessType, name, field)
   {
      const shaderFields = this .isInitialized () && this .isValid ();

      if (shaderFields)
         this .removeShaderFields ();

      X3DShaderNode .prototype .addUserDefinedField .call (this, accessType, name, field);

      if (shaderFields)
         this .addShaderFields ();
   },
   removeUserDefinedField (name)
   {
      const shaderFields = this .isInitialized () && this .isValid ();

      if (shaderFields)
         this .removeShaderFields ();

      X3DShaderNode .prototype .removeUserDefinedField .call (this, name);

      if (shaderFields)
         this .addShaderFields ();
   },
   setTransformFeedbackVaryings (value)
   {
      this .transformFeedbackVaryings = value;
   },
   getProgram ()
   {
      return this .program;
   },
   set_activate__ ()
   {
      if (!this ._activate .getValue ())
         return;

      this .set_loaded__ ();
   },
   set_loaded__ ()
   {
      if (this .loadSensor ._isLoaded .getValue () && this ._language .getValue () === "GLSL")
      {
         const
            gl      = this .getBrowser () .getContext (),
            program = gl .createProgram ();

         if (this .isValid ())
            this .removeShaderFields ();

         gl .deleteProgram (this .program);

         this .program = program;

         for (const node of this ._parts)
         {
            const partNode = X3DCast (X3DConstants .ShaderPart, node);

            if (partNode ?.getShader ())
               gl .attachShader (program, partNode .getShader ());
         }

         if (this .transformFeedbackVaryings .length)
            gl .transformFeedbackVaryings (program, this .transformFeedbackVaryings, gl .INTERLEAVED_ATTRIBS);

         gl .linkProgram (program);

         if (gl .getProgramParameter (program, gl .LINK_STATUS))
         {
            this .setValid (true);
            this .getDefaultUniformsAndAttributes ();
            this .addShaderFields ();
         }
         else
         {
            this .setValid (false);

            if (this ._parts .length)
            {
               console .warn ("Couldn't initialize " + this .getTypeName () + " '" + this .getName () + "': " + gl .getProgramInfoLog (program));
            }
         }
      }
      else
      {
         this .setValid (false);
      }
   },
   dispose ()
   {
      X3DProgrammableShaderObject .prototype .dispose .call (this);
      X3DShaderNode               .prototype .dispose .call (this);
   },
});

Object .defineProperties (ComposedShader, X3DNode .staticProperties ("ComposedShader", "Shaders", 1, "shaders", "3.0"));

Object .defineProperties (ComposedShader,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "activate",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isSelected", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isValid",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "language",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "parts",      new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedShader;
