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

import X3DParser from "./X3DParser.js";
import Color3    from "../../standard/Math/Numbers/Color3.js";

// http://paulbourke.net/dataformats/stl/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 * Parser
 */

function STLBParser (scene)
{
   X3DParser .call (this, scene);
}

Object .assign (Object .setPrototypeOf (STLBParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "ARRAY_BUFFER";
   },
   setInput (input)
   {
      this .arrayBuffer = input;
      this .dataView    = new DataView (input);
   },
   isValid ()
   {
      if (!(this .arrayBuffer instanceof ArrayBuffer))
         return false;

      if (this .dataView .byteLength < 84)
         return false;

      const
         numFaces   = this .dataView .getUint32 (80, true),
         byteLength = numFaces * 50 + 84;

      return byteLength === this .dataView .byteLength;
   },
   parseIntoScene (resolve, reject)
   {
      this .stl ()
         .then (resolve)
         .catch (reject);
   },
   async stl ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("STL");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      // Create nodes.

      this .material   = scene .createNode ("Material");
      this .appearance = scene .createNode ("Appearance");

      this .material .diffuseColor = Color3 .White;
      this .appearance .material   = this .material;

      // Parse scene.

      this .shape ();

      return this .getScene ();
   },
   shape ()
   {
      const
         scene      = this .getExecutionContext (),
         shape      = scene .createNode ("Shape"),
         geometry   = scene .createNode ("TriangleSet"),
         normal     = scene .createNode ("Normal"),
         coordinate = scene .createNode ("Coordinate"),
         dataView   = this .dataView,
         byteLength = this .dataView .byteLength,
         vector     = [ ],
         point      = [ ];

      for (let i = 84; i < byteLength; i += 50)
      {
         for (let f = 0; f < 3; ++ f)
            vector .push (dataView .getFloat32 (i + f * 4, true));

         for (let f = 3; f < 12; ++ f)
            point .push (dataView .getFloat32 (i + f * 4, true));
      }

      shape .appearance         = this .appearance;
      shape .geometry           = geometry;
      geometry .normalPerVertex = false;
      geometry .normal          = normal;
      geometry .coord           = coordinate;
      normal .vector            = vector;
      coordinate .point         = point;

      scene .getRootNodes () .push (shape);
   },
});

export default STLBParser;
