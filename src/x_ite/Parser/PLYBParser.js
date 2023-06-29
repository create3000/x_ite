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

import PLYParser from "./PLYParser.js";

function PLYBParser (scene)
{
   PLYParser .call (this, scene);
}

Object .assign (Object .setPrototypeOf (PLYBParser .prototype, PLYParser .prototype),
{
   getEncoding ()
   {
      return ["ARRAY_BUFFER", "STRING"];
   },
   setInput (inputs)
   {
      this .arrayBuffer  = inputs [0];
      this .dataView     = new DataView (this .arrayBuffer);
      this .input        = inputs [1];
      this .magic        = this .input .match (/^ply\r?\nformat (binary_little_endian|binary_big_endian) 1.0/);
      this .littleEndian = this .magic [1] === "binary_little_endian";
   },
   isValid ()
   {
      if (!(this .arrayBuffer instanceof ArrayBuffer))
         return false;

      return !! this .magic;
   },
   async parseVertices (element)
   {
      const
         scene      = this .getScene (),
         colors     = [ ],
         texCoord   = scene .createNode ("TextureCoordinate"),
         texCoords  = [ ],
         normal     = scene .createNode ("Normal"),
         normals    = [ ],
         coord      = scene .createNode ("Coordinate"),
         points     = [ ],
         attributes = new Map ();

      const { count, properties } = element;

      for (const { name } of properties)
      {
         if (name .match (/^(?:red|green|blue|alpha|r|g|b|a|s|t|u|v|nx|ny|nz|x|y|z)$/))
            continue;

         attributes .set (name, [ ]);
      }

      for (let i = 0; i < count; ++ i)
      {
         let r = 1, g = 1, b = 1, a = 1;
         let s = 0, t = 0;
         let nx = 0, ny = 0, nz = 0;
         let x = 0, y = 0, z = 0;

         this .whitespaces ();

         for (const { value, name, type } of properties)
         {
            if (!value .call (this))
               throw new Error (`Couldn't parse value for property ${name}.`);

            switch (name)
            {
               default: attributes .get (name) .push (this .value); break;
               case "red":   case "r": r = this .convertColor (this .value, type); break;
               case "green": case "g": g = this .convertColor (this .value, type); break;
               case "blue":  case "b": b = this .convertColor (this .value, type); break;
               case "alpha": case "a": a = this .convertColor (this .value, type); break;
               case "s": case "u": s = this .value; break;
               case "t": case "v": t = this .value; break;
               case "nx": nx = this .value; break;
               case "ny": ny = this .value; break;
               case "nz": nz = this .value; break;
               case "x": x = this .value; break;
               case "y": y = this .value; break;
               case "z": z = this .value; break;
            }
         }

         if (properties .colors)
            colors .push (r, g, b, a);

         if (properties .texCoords)
            texCoords .push (s, t);

         if (properties .normals)
            normals .push (nx, ny, nz);

         points .push (x, y, z);
      }

      // Attributes

      if (attributes .size)
      {
         scene .addComponent (this .getBrowser () .getComponent ("Shaders", 1));

         await this .loadComponents ();

         for (const [name, value] of attributes)
         {
            const floatVertexAttribute = scene .createNode ("FloatVertexAttribute");

            floatVertexAttribute .name          = name;
            floatVertexAttribute .numComponents = 1;
            floatVertexAttribute .value         = value;

            this .attrib .push (floatVertexAttribute);
         }
      }

      // Geometric properties

      const
         alpha = colors .some ((v, i) => i % 4 === 3 && v < 1),
         color = scene .createNode (alpha ? "ColorRGBA" : "Color");

      color    .color  = alpha ? colors : colors .filter ((v, i) => i % 4 !== 3);
      texCoord .point  = texCoords;
      normal   .vector = normals;
      coord    .point  = points;

      this .color    = colors    .length ? color    : null;
      this .texCoord = texCoords .length ? texCoord : null;
      this .normal   = normals   .length ? normal   : null;
      this .coord    = coord;
   },
   parseFaces (element)
   {
      const
         scene      = this .getScene (),
         geometry   = scene .createNode ("IndexedFaceSet"),
         coordIndex = geometry .coordIndex;

      const { count, properties } = element;

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { count, value, name } of properties)
         {
            if (!count .call (this))
               throw new Error (`Couldn't parse property count for ${name}.`);

            const length = this .value;

            for (let i = 0; i < length; ++ i)
            {
               if (!value .call (this))
                  throw new Error (`Couldn't parse a property value for ${name}.`);

               coordIndex .push (this .value);
            }

            coordIndex .push (-1);
         }
      }

      this .geometry = geometry;
   },
   parseUnknown (element)
   {
      this .whitespaces ();

      const { count } = element;

      for (let i = 0; i < count; ++ i)
         Grammar .line .parse (this);
   },
});

export default PLYBParser;
