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

import X3DParser    from "./X3DParser.js";
import X3DOptimizer from "./X3DOptimizer.js";
import Expressions  from "./Expressions.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";

// http://paulbourke.net/dataformats/obj/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r]+/gy,
   comment: /;.*?(?=[\n\r])/gy,

   // Keywords
   solid: /solid/gy,
   facet: /facet/gy,
   normal: /normal/gy,
   outer: /outer/gy,
   loop: /loop/gy,
   vertex: /vertex/gy,
   endloop: /endloop/gy,
   endfacet: /endfacet/gy,
   endsolid: /endsolid/gy,

   // Values
   name: /(\w+)/gy,
   double: /([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/gy,
   constants: /([+-])((?:NAN|INF|INFINITY))/igy,
});

/*
 * Parser
 */

function STLParser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeGroups         = true;
   this .removeEmptyGroups    = true;
   this .combineGroupingNodes = false;

   // Globals

   this .point3 = new Vector3 (0, 0, 0);
}

STLParser .prototype = Object .assign (Object .create (X3DParser .prototype),
   X3DOptimizer .prototype,
{
   constructor: STLParser,
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   getEncoding: function ()
   {
      return "STRING";
   },
   isValid: function ()
   {
      return !! this .input .match (/^(?:[\x20\n\t\r]+|;.*?[\r\n])*\b(?:solid)\b/);
   },
   setInput: function (string)
   {
      this .input = string;
   },
   parseIntoScene: function (success, error)
   {
      this .stl ()
         .then (success)
         .catch (error);
   },
   stl: async function ()
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

      this .appearance .material = this .material;

      // Parse scene.

      this .statements ();

      //this .optimizeSceneGraph (scene .getRootNodes ());
   },
   comments: function ()
   {
      while (this .comment ())
         ;
   },
   comment: function ()
   {
      this .whitespaces ();

      if (Grammar .comment .parse (this))
         return true;

      return false;
   },
   whitespaces: function ()
   {
      Grammar .whitespaces .parse (this);
   },
   statements: function ()
   {
      while (this .solid ())
         ;
   },
   solid: function ()
   {
      this .comments ();

      if (Grammar .solid .parse (this))
      {
         this .whitespaces ();

         const
            scene      = this .getExecutionContext (),
            shape      = scene .createNode ("Shape"),
            geometry   = scene .createNode ("TriangleSet"),
            normal     = scene .createNode ("Normal"),
            coordinate = scene .createNode ("Coordinate"),
            name       = this .sanitizeName (Grammar .name .parse (this) ? this .result [1] : "");

         this .facets (normal .vector, coordinate .point);

         shape .appearance         = this .appearance;
         shape .geometry           = geometry;
         geometry .normalPerVertex = false;
         geometry .normal          = normal;
         geometry .coord           = coordinate;

         if (name)
            scene .addNamedNode (scene .getUniqueName (name), shape);

         scene .getRootNodes () .push (shape);

         this .comments ();

         if (Grammar .endsolid .parse (this))
            return true;

         console .log ("Expected endsolid statement.");
      }

      return false;
   },
   facets: function (vector, point)
   {
      while (this .facet (vector, point))
         ;
   },
   facet: function (vector, point)
   {
      this .comments ()

      if (Grammar .facet .parse (this))
      {
         if (this .normal (vector))
         {
            if (this .loop (point))
            {
               this .comments ();

               if (Grammar .endfacet .parse (this))
                  return true;

               console .log ("Expected endfacet statement.");
            }
         }
      }

      return false;
   },
   normal: function (vector)
   {
      this .whitespaces ();

      if (Grammar .normal .parse (this))
      {
         if (this .double ())
         {
            this .point3 .x = this .value;

            if (this .double ())
            {
               this .point3 .y = this .value;

               if (this .double ())
               {
                  this .point3 .z = this .value;

                  vector .push (this .point3);

                  return true;
               }
               else
                  console .log ("Expected a double.");
            }
            else
               console .log ("Expected a double.");
         }
         else
            console .log ("Expected a double.");
      }

      return false;
   },
   loop: function (point)
   {
      this .comments ();

      if (Grammar .outer .parse (this))
      {
         this .whitespaces ();

         if (Grammar .loop .parse (this))
         {
            if (this .vertex (point))
            {
               if (this .vertex (point))
               {
                  if (this .vertex (point))
                  {
                     this .comments ();

                     if (Grammar .endloop .parse (this))
                        return true;

                     console .log ("Expected endloop statement.");
                  }
               }
            }
         }
         else
            console .log ("Expected loop statement.");
      }
      else
         console .log ("Expected outer statement.");

      return false;
   },
   vertex: function (point)
   {
      this .comments ();

      if (Grammar .vertex .parse (this))
      {
         if (this .double ())
         {
            this .point3 .x = this .value;

            if (this .double ())
            {
               this .point3 .y = this .value;

               if (this .double ())
               {
                  this .point3 .z = this .value;

                  point .push (this .point3);

                  return true;
               }
               else
                  console .log ("Expected a double.");
            }
            else
               console .log ("Expected a double.");
         }
         else
            console .log ("Expected a double.");
      }
      else
         console .log ("Expected vertex statement.");

      return false;
   },
   double: function ()
   {
      this .whitespaces ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [1]);

         return true;
      }

      if (Grammar .constants .parse (this))
      {
         this .value = this .CONSTANTS .get (this .result [2] .toUpperCase ());

         if (this .result [1] === "-")
            this .value = - this .value;

         return true;
      }

      return false;
   },
});

export default STLParser;
