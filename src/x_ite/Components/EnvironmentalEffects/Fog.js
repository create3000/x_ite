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
import X3DBindableNode      from "../Core/X3DBindableNode.js";
import X3DFogObject         from "./X3DFogObject.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Fog (executionContext)
{
   X3DBindableNode .call (this, executionContext);
   X3DFogObject    .call (this, executionContext);

   this .addType (X3DConstants .Fog);

   this .modelMatrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Fog .prototype, X3DBindableNode .prototype),
   X3DFogObject .prototype,
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);
      X3DFogObject    .prototype .initialize .call (this);
   },
   getModelMatrix ()
   {
      return this .modelMatrix;
   },
   traverse (type, renderObject)
   {
      if (type !== TraverseType .CAMERA)
         return;

      renderObject .getLayer () .getFogs () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
   },
   dispose ()
   {
      X3DFogObject    .prototype .dispose .call (this);
      X3DBindableNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (Fog,
{
   typeName:
   {
      value: "Fog",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "EnvironmentalEffects", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "2.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fogType",         new Fields .SFString ("LINEAR")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",           new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityRange", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",        new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default Fog;
