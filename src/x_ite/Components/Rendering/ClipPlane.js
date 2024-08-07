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
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Plane3               from "../../../standard/Math/Geometry/Plane3.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const ClipPlanes = ObjectCache (ClipPlaneContainer);

function ClipPlaneContainer ()
{
   this .plane = new Plane3 (Vector3 .Zero, Vector3 .Zero);
}

Object .assign (ClipPlaneContainer .prototype,
{
   isClipped (point)
   {
      return this .plane .getDistanceToPoint (point) < 0;
   },
   set (clipPlane, modelViewMatrix)
   {
      const
         plane      = this .plane,
         localPlane = clipPlane .plane;

      plane .normal .assign (localPlane);
      plane .distanceFromOrigin = -localPlane .w;

      plane .multRight (modelViewMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         plane  = this .plane,
         normal = plane .normal;

      gl .uniform4f (shaderObject .x3d_ClipPlane [shaderObject .numClipPlanes ++], normal .x, normal .y, normal .z, plane .distanceFromOrigin);
   },
   dispose ()
   {
      ClipPlanes .push (this);
   },
});

function ClipPlane (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .ClipPlane);

   this .enabled = false;
   this .plane   = new Vector4 ();
}

Object .assign (Object .setPrototypeOf (ClipPlane .prototype, X3DChildNode .prototype),
{
   getClipPlaneKey ()
   {
      return 0;
   },
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_enabled__", this);
      this ._plane   .addInterest ("set_enabled__", this);

      this .set_enabled__ ();
   },
   set_enabled__ ()
   {
      this .plane .assign (this ._plane .getValue ());

      this .enabled = this ._enabled .getValue () && ! this .plane .equals (Vector4 .Zero);
   },
   push (renderObject)
   {
      if (this .enabled)
      {
         const clipPlaneContainer = ClipPlanes .pop ();

         clipPlaneContainer .set (this, renderObject .getModelViewMatrix () .get ());

         renderObject .getLocalObjects ()     .push (clipPlaneContainer);
         renderObject .getLocalObjectsKeys () .push (this .getClipPlaneKey ());
      }
   },
   pop (renderObject)
   {
      if (this .enabled)
      {
         this .getBrowser () .getLocalObjects () .push (renderObject .getLocalObjects () .pop ());
         renderObject .getLocalObjectsKeys () .pop ();
      }
   },
});

Object .defineProperties (ClipPlane, X3DNode .getStaticProperties ("ClipPlane", "Rendering", 5, "children", "3.2"));

Object .defineProperties (ClipPlane,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "plane",    new Fields .SFVec4f (0, 1, 0, 0)),
      ]),
      enumerable: true,
   },
});

export default ClipPlane;
