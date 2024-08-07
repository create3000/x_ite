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
import X3DParticlePhysicsModelNode from "./X3DParticlePhysicsModelNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import X3DCast                     from "../../Base/X3DCast.js";

function BoundedPhysicsModel (executionContext)
{
   X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType (X3DConstants .BoundedPhysicsModel);
}

Object .assign (Object .setPrototypeOf (BoundedPhysicsModel .prototype, X3DParticlePhysicsModelNode .prototype),
{
   initialize ()
   {
      X3DParticlePhysicsModelNode .prototype .initialize .call (this);

      this ._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   getBBox ()
   {
      return this .geometryNode ?.getBBox ();
   },
   set_geometry__ ()
   {
      this .geometryNode ?._rebuild .removeInterest ("addNodeEvent", this);

      this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._geometry);

      this .geometryNode ?._rebuild .addInterest ("addNodeEvent", this);
   },
   addGeometry (boundedNormals, boundedVertices)
   {
      if (!this .geometryNode)
         return;

      if (!this ._enabled .getValue ())
         return;

      const
         damping  = this ._damping .getValue (),
         normals  = this .geometryNode .getNormals ()  .getValue (),
         vertices = this .geometryNode .getVertices () .getValue ();

      for (const value of normals)
         boundedNormals .push (value * damping);

      for (const value of vertices)
         boundedVertices .push (value);
   },
});

Object .defineProperties (BoundedPhysicsModel, X3DNode .staticProperties ("BoundedPhysicsModel", "ParticleSystems", 2, "physics", "3.2", "Infinity"));

Object .defineProperties (BoundedPhysicsModel,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "damping",  new Fields .SFFloat (1)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default BoundedPhysicsModel;
