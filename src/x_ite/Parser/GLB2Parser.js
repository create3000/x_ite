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

import X3DParser   from "./X3DParser.js";
import GLTF2Parser from "./GLTF2Parser.js";

function GLB2Parser (scene)
{
   X3DParser .call (this, scene);

   this .json    = [ ];
   this .buffers = [ ];
}

Object .assign (Object .setPrototypeOf (GLB2Parser .prototype, X3DParser .prototype),
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

      if (this .dataView .byteLength < 12)
         return false;

      if (this .dataView .getUint32 (0, true) !== 0x46546C67)
         return false;

      if (this .dataView .getUint32 (4, true) !== 2)
         return false;

      if (this .dataView .getUint32 (8, true) !== this .dataView .byteLength)
         return false;

      return true;
   },
   parseIntoScene (resolve, reject)
   {
      this .glb ()
         .then (resolve)
         .catch (reject);
   },
   async glb ()
   {
      this .chunks ();

      const parser = new GLTF2Parser (this .getScene ());

      parser .setBuffers (this .buffers);

      for (const json of this .json)
      {
         parser .setInput (json);

         if (!parser .isValid ())
            continue;

         await parser .rootObject (parser .input);
      }

      return this .getScene ();
   },
   chunks ()
   {
      for (let i = 12; i < this .dataView .byteLength;)
      {
         const
            length = this .dataView .getUint32 (i, true),
            type   = this .dataView .getUint32 (i + 4, true);

         i += 8;

         switch (type)
         {
            case 0x4e4f534a: // Structured JSON content
            {
               this .json .push ($.decodeText (this .arrayBuffer .slice (i, i + length)));
               break;
            }
            case 0x004e4942: // Binary buffer
            {
               this .buffers .push (this .arrayBuffer .slice (i, i + length));
               break;
            }
         }

         i += length;
      }

      return this .getScene ();
   },
});

export default GLB2Parser;
