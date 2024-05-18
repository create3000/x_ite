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
import JSONParser  from "./JSONParser.js";
import VRMLParser  from "./VRMLParser.js";
import XMLParser   from "./XMLParser.js";
import GLTF2Parser from "./GLTF2Parser.js";
import GLB2Parser  from "./GLB2Parser.js";
import OBJParser   from "./OBJParser.js";
import STLAParser  from "./STLAParser.js";
import STLBParser  from "./STLBParser.js";
import PLYAParser  from "./PLYAParser.js";
import PLYBParser  from "./PLYBParser.js";
import SVGParser   from "./SVGParser.js";

class GoldenGate extends X3DParser
{
   #inputs = new Map ();

   constructor (scene)
   {
      super (scene);
   }

   static #parsers = [
      SVGParser,
      XMLParser,
      GLTF2Parser,
      GLB2Parser,
      JSONParser,
      VRMLParser,
      OBJParser,
      STLAParser,
      STLBParser,
      PLYAParser,
      PLYBParser,
   ];

   static addParsers (... args)
   {
      this .#parsers .push (... args);
   }

   static removeParsers (... args)
   {
      this .#parsers = this .#parsers .filter (parser => !args .includes (parser));
   }

   static getParsers ()
   {
      return this .#parsers .slice ();
   }

   /**
    * @deprecated Use `GoldenGate.add/remove/getParsers`.
    */
   static get Parser () { return this .#parsers; }

   parseIntoScene (x3dSyntax, resolve, reject)
   {
      for (const Parser of GoldenGate .#parsers)
      {
         try
         {
            const
               parser = new Parser (this .getScene ()),
               input  = this .getInput (parser .getEncoding (), x3dSyntax);

            if (Array .isArray (input) ? input .some (i => i === undefined) : input === undefined)
               continue;

            parser .setInput (input);

            if (!parser .isValid ())
               continue;

            parser .pushExecutionContext (this .getExecutionContext ());
            parser .parseIntoScene (resolve, reject);
            return;
         }
         catch (error)
         {
            if (reject)
               reject (error);
            else
               throw error;

            return;
         }
      }

      if (this .getScene () .worldURL .startsWith ("data:"))
         throw new Error ("Couldn't parse X3D. No suitable file handler found for 'data:' URL.");
      else
         throw new Error (`Couldn't parse X3D. No suitable file handler found for '${this .getScene () .worldURL}'.`);
   }

   getInput (encoding, x3dSyntax)
   {
      if (Array .isArray (encoding))
      {
         return encoding .map (encoding => this .getInput (encoding));
      }
      else
      {
         if (this .#inputs .has (encoding))
            return this .#inputs .get (encoding);

         const input = this .createInput (encoding, x3dSyntax);

         this .#inputs .set (encoding, input);

         return input;
      }
   }

   createInput (encoding, x3dSyntax)
   {
      try
      {
         switch (encoding)
         {
            case "STRING":
               return $.decodeText (x3dSyntax);
            case "XML":
               return $.parseXML (this .getInput ("STRING", x3dSyntax));
            case "JSON":
               return JSON .parse (this .getInput ("STRING", x3dSyntax));
            case "ARRAY_BUFFER":
               return x3dSyntax instanceof ArrayBuffer ? x3dSyntax : undefined;
         }
      }
      catch
      {
         return undefined;
      }
   }
}

export default GoldenGate;
