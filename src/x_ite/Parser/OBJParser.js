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
import Vector2   from "../../standard/Math/Numbers/Vector2.js";
import Vector3   from "../../standard/Math/Numbers/Vector3.js";
import DEBUG     from "../DEBUG.js";

/*
 *  Grammar
 */

// Lexical elements
const Grammar =
{
   // General
   whitespaces: /[\x20\n\t\r]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   comment: /#.*?(?=[\n\r])/gy,
   untilEndOfLine: /([^\r\n]+)/gy,

   // Keywords
   mtllib: /\bmtllib\b/gy,
   usemtl: /\busemtl\b/gy,
   newmtl: /\bnewmtl\b/gy,
   Ka: /\bKa\b/gy,
   Kd: /\bKd\b/gy,
   Ks: /\bKs\b/gy,
   Ns: /\bNs\b/gy,
   d: /\bd\b/gy,
   Tr: /\bTr\b/gy,
   illum: /\billum\b/gy,
   map_Kd: /\bmap_Kd\b/gy,
   o: /\bo\b/gy,
   v: /\bv\b/gy,
   vt: /\bvt\b/gy,
   vn: /\bvn\b/gy,
   g: /\bg\b/gy,
   s: /\bs\b/gy,
   off: /\boff\b/gy,
   f: /\bf\b/gy,
   slash: /\//gy,

   // Values
   int32:  /((?:0[xX][\da-fA-F]+)|(?:[+-]?\d+))/gy,
   double: /([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/gy,
};

function parse (parser)
{
   this .lastIndex = parser .lastIndex;

   parser .result = this .exec (parser .input);

   if (parser .result)
   {
      parser .lastIndex = this .lastIndex;
      return true;
   }

   return false;
}

function lookahead (parser)
{
   const
      lastIndex = parser .lastIndex,
      result    = this .parse (parser);

   parser .lastIndex = lastIndex;

   return result;
}

for (const value of Object .values (Grammar))
{
   value .parse     = parse;
   value .lookahead = lookahead;
}

/*
 * Parser
 */

function OBJParser (scene)
{
   X3DParser .call (this, scene);
}

OBJParser .prototype = Object .assign (Object .create (X3DParser .prototype),
{
   constructor: OBJParser,
   getEncoding: function ()
   {
      return "STRING";
   },
   isValid: function ()
   {
      return !! this .input .match (/^(?:\s+|#.*?[\r\n])*\b(?:mtllib|usemtl|newmtl|Ka|Kd|Ks|Ns|d|Tr|illum|map_Kd|o|v|vt|vn|g|s|off|f)\b/s);
   },
   getInput: function ()
   {
      return this .input;
   },
   setInput: function (string)
   {
      this .input = string;
   },
   parseIntoScene: function (success, error)
   {
      const scene = this .getExecutionContext ();

      this .object          = scene .createNode ("Group");
      this .group           = scene .createNode ("Transform");
      this .defaultMaterial = scene .createNode ("Material");
      this .texCoord        = scene .createNode ("TextureCoordinate");
      this .normal          = scene .createNode ("Normal");
      this .coord           = scene .createNode ("Coordinate");
      this .smoothingGroup  = 0;
      this .smoothingGroups = new Map ();
      this .materials       = new Map ();
      this .textures        = new Map ();
      this .point2          = new Vector2 ();
      this .point3          = new Vector3 ();
      this .lastIndex       = 0;

      this .object .children .push (this .group);
      scene .getRootNodes () .push (this .object);

      this .obj ()
         .then (success)
         .catch (error);
   },
   obj: async function ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("OBJ");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      // Parse scene.

      await this .statements ();
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
   whitespacesNoLineTerminator: function ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   statements: async function ()
   {
      while (await this .statement ())
         ;
   },
   statement: async function ()
   {
      if (await this .mtllib ())
         return true;

      if (this .usemtl ())
         return true;

      if (this .o ())
         return true;

      if (this .g ())
         return true;

      if (this .s ())
         return true;

      if (this .vts ())
         return true;

      if (this .vns ())
         return true;

      if (this .vs ())
         return true;

      if (this .fs ())
         return true;

      // Skip empty and unknown lines.

      if (Grammar .untilEndOfLine .parse (this))
         return true;

      return false;
   },
   mtllib: async function ()
   {
      this .comments ();

      if (Grammar .mtllib .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const mtllibs = this .result [1] .trim () .split (/\s+/);

            for (const mtllib of mtllibs)
            {
               const
                  scene  = this .getExecutionContext (),
                  url    = new URL (mtllib, scene .getWorldURL ()),
                  input  = await fetch (url) .then (response => response .text ()),
                  parser = new MaterialParser (scene, input);

               parser .parse ();

					for (const [name, material] of parser .materials)
                  this .materials .set (name, material);

               for (const [name, texture] of parser .textures)
                  this .textures .set (name, texture);
            }
         }

         return true;
      }

      return false;
   },
   usemtl: function ()
   {
      this .comments ();

      if (Grammar .usemtl .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const name = this .sanitizeName (this .result [1]);

            this .material = this .materials .get (name) || this .defaultMaterial;
            this .texture  = this .textures .get (name);
         }

         return true;
      }

      return false;
   },
   o: function ()
   {
      this .comments ();

      if (Grammar .o .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const
               scene = this .getExecutionContext (),
               name  = this .sanitizeName (this .result [1]);

            if (this .group .children .length)
            {
               this .object = scene .createNode("Group");
               this .group  = scene .createNode ("Transform");

               this .object .children .push (this .group);
               scene .getRootNodes () .push (this .object);
            }

            if (name)
               scene .updateNamedNode (this .getUniqueName (name), this .object);
         }

         return true;
      }

      return false;
   },
   g: function ()
   {
      this .comments ();

      if (Grammar .g .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const
               scene = this .getExecutionContext (),
               name  = this .sanitizeName (this .result [1]);

            try
            {
               this .group = scene .getNamedNode (name);
            }
            catch (error)
            {
               if (this .group .children .length)
               {
                  this .group = scene .createNode ("Transform");

                  this .object .children .push (this .group);
               }

               if (name)
                  scene .addNamedNode (scene .getUniqueName (name), this .group);
            }
         }

         return true;
      }

      return false;
   },
   s: function ()
   {
      this .comments ();

      if (Grammar .s .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .off .parse (this))
         {
            this .smoothingGroup = 0;
            return true;
         }

         if (this .int32 ())
         {
            this .smoothingGroup = this .value;
            return true;
         }

         return true;
      }

      return false;
   },
   vts: function ()
   {
      let result = false;

      while (this .vt ())
         result = true;

      return result;
   },
   vt: function ()
   {
      this .comments ();

      if (Grammar .vt .parse (this))
      {
         if (this .vec2 ())
         {
            this .texCoord .point .push (this .point2);

            return true;
         }

         throw new Error ("Expected a texture coodinate.");
      }

      return false;
   },
   vns: function ()
   {
      let result = false;

      while (this .vn ())
         result = true;

      return result;
   },
   vn: function ()
   {
      this .comments ();

      if (Grammar .vn .parse (this))
      {
         if (this .vec3 ())
         {
            this .normal .vector .push (value);

            return true;
         }

         throw new Error ("Expected a normal vector.");
      }

      return false;
   },
   vs: function ()
   {
      let result = false;

      while (this .v ())
         result = true;

      return result;
   },
   v: function ()
   {
      this .comments ();

      if (Grammar .v .parse (this))
      {
         if (this .vec3 ())
         {
            this .coord .point .push (this .point3);

            return true;
         }

         throw new Error ("Expected a vertex coordinate.");
      }

      return false;
   },
   fs: function ()
   {
      this .comments ();

      if (Grammar .f .lookahead (this))
      {
         try
         {
            this .shape    = this .smoothingGroups .get (this .group .getNodeName ()) .get (this .smoothingGroup);
            this .geometry = this .shape .geometry;
         }
         catch (error)
         {
            const
               scene      = this .getExecutionContext (),
               appearance = scene .createNode ("Appearance");

            this .geometry = scene .createNode ("IndexedFaceSet");
            this .shape    = scene .createNode ("Shape");

            appearance .material        = this .material;
            appearance .texture         = this .texture;
            this .geometry .creaseAngle = this .smoothingGroup ? Math .PI : 0;
            this .shape .appearance     = appearance;
            this .shape .geometry       = this .geometry;

            this .group .children .push (this .shape);

            if (!this .smoothingGroups .has (this .group .getNodeName ()))
               this .smoothingGroups .set (this .group .getNodeName (), new Map ());

            this .smoothingGroups .get (this .group .getNodeName ()) .set (this .smoothingGroup, this .shape);
         }

         while (this .f ())
            ;

         if (this .geometry .texCoordIndex .length)
            this .geometry .texCoord = this .texCoord;

         if (this .geometry .normalIndex .length)
            this .geometry .normal = this .normal;

         this .geometry .coord = this .coord;

         return true;
      }

      return false;
   },
   f: function ()
   {
      this .comments ();

      if (Grammar .f .parse (this))
      {
         const
            texCoords = this .geometry .texCoordIndex .length,
            normals   = this .geometry .normalIndex .length;

         while (this .indices ())
            ;

         if (this .geometry .texCoordIndex .length !== texCoords)
            this .geometry .texCoordIndex .push (-1);

         if (this .geometry .normalIndex .length !== normals)
            this .geometry .normalIndex .push (-1);

         this .geometry .coordIndex .push (-1);

         return true;
      }

      return false;
   },
   indices: function ()
   {
      if (this .int32 ())
      {
         this .geometry .coordIndex .push (this .index (this .value, this .coord .point .length));

         if (Grammar .slash .parse (this))
         {
            if (this .int32 ())
            {
               this .geometry .texCoordIndex .push (this .index (this .value, this .texCoord .point .length));
            }

            if (Grammar .slash .parse (this))
            {
               if (this .int32 ())
               {
                  this .geometry .normalIndex .push (this .index (this .value, this .normal .vector .length));
               }
            }
         }

         return true;
      }

      return false;
   },
   index: function (index, length)
   {
      if (index === 0)
         throw new Error ("Invalid index.");

      if (index < 0)
         return length + index;

      return index - 1;
   },
   int32: function ()
   {
      this .whitespaces ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [1]);
         return true;
      }

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

      return false;
   },
   vec2: function ()
   {
      if (this .double ())
      {
         this .point2 .x = this .value;

         if (this .double ())
         {
            this .point2 .y = this .value;

            return true;
         }
      }

      return false;
   },
   vec3: function ()
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

               return true;
            }
         }
      }

      return false;
   },
});

function MaterialParser (scene, input)
{
   this .executionContext = scene;
   this .input            = input;
   this .material         = scene .createNode ("Material");
   this .materials        = new Map ();
   this .textures         = new Map ();
}

MaterialParser .prototype =
{
   parse: function ()
   {
      try
      {
         this .statements ();
      }
      catch (error)
      {
         if (DEBUG)
            console .log (error);
      }
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
   whitespacesNoLineTerminator: function ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   statements: function ()
   {
      while (this .statement ())
		   ;
   },
   statement: function ()
   {
      if (this .newmtl ())
         return true;

      if (this .Ka ())
         return true;

      if (this .Kd ())
         return true;

      if (this .Ks ())
         return true;

      if (this .Ns ())
         return true;

      if (this .d ())
         return true;

      if (this .Tr ())
         return true;

      if (this .illum ())
         return true;

      if (this .map_Kd ())
         return true;

      // Skip empty and unknown lines.

      if (Grammar .untilEndOfLine .parse (this))
         return true;

      return false;
   },
   newmtl: function ()
   {
      return false;
   },
   Ka: function ()
   {
      return false;
   },
   Kd: function ()
   {
      return false;
   },
   Ks: function ()
   {
      return false;
   },
   Ns: function ()
   {
      return false;
   },
   d: function ()
   {
      return false;
   },
   Tr: function ()
   {
      return false;
   },
   illum: function ()
   {
      return false;
   },
   map_Kd: function ()
   {
      return false;
   },
};

export default OBJParser;
