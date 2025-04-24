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
import Color3       from "../../standard/Math/Numbers/Color3.js";
import DEVELOPMENT  from "../DEVELOPMENT.js";

// http://paulbourke.net/dataformats/obj/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r,]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   comment: /#.*?(?=[\n\r]|$)/gy,
   untilEndOfLine: /[^\r\n]+/gy,

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
   int32:  /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/gy,
   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   constants: /([+-])((?:NAN|INF|INFINITY))/igy,
});

/*
 * Parser
 */

function OBJParser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeEmptyGroups    = true;
   this .combineGroupingNodes = false;

   // Globals

   this .geometryIndices = new Map ();
   this .smoothingGroup  = 0;
   this .smoothingGroups = new Map ();
   this .groups          = new Map ();
   this .materials       = new Map ();
   this .textures        = new Map ();
   this .lastIndex       = 0;
}

Object .assign (Object .setPrototypeOf (OBJParser .prototype, X3DParser .prototype),
   X3DOptimizer .prototype,
{
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   getEncoding ()
   {
      return "STRING";
   },
   setInput (string)
   {
      this .input = string;
   },
   isValid ()
   {
      if (!(typeof this .input === "string"))
         return false;

      return !! this .input .match (/^(?:[\x20\n\t\r]+|#.*?[\r\n])*\b(?:mtllib|usemtl|o|g|s|vt|vn|v|f)\b/);
   },
   parseIntoScene (resolve, reject)
   {
      this .obj ()
         .then (resolve)
         .catch (reject);
   },
   async obj ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("OBJ");
      scene .setProfile (browser .getProfile ("Interchange"));

      await browser .loadComponents (scene);

      // Init nodes.

      this .object          = scene .createNode ("Transform");
      this .group           = scene .createNode ("Group");
      this .defaultMaterial = scene .createNode ("Material");
      this .texCoord        = scene .createNode ("TextureCoordinate");
      this .normal          = scene .createNode ("Normal");
      this .coord           = scene .createNode ("Coordinate");

      this .texCoords = [ ];
      this .normals   = [ ];
      this .vertices  = [ ];

      this .object .children .push (this .group);

      scene .getRootNodes () .push (this .object);

      // Parse scene.

      await this .statements ();

      // Assign indices and points.

      for (const [geometry, indices] of this .geometryIndices)
      {
         geometry .texCoordIndex = indices .texCoordIndex;
         geometry .normalIndex   = indices .normalIndex;
         geometry .coordIndex    = indices .coordIndex;
      }

      this .texCoord .point  = this .texCoords;
      this .normal   .vector = this .normals;
      this .coord    .point  = this .vertices;

      // Finish scene.

      this .optimizeSceneGraph (scene .getRootNodes ());

      return this .getScene ();
   },
   comments ()
   {
      while (this .comment ())
         ;
   },
   comment ()
   {
      this .whitespaces ();

      if (Grammar .comment .parse (this))
         return true;

      return false;
   },
   whitespaces ()
   {
      Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   async statements ()
   {
      while (await this .statement ())
         ;
   },
   async statement ()
   {
      if (await this .mtllibs ())
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
   async mtllibs ()
   {
      this .comments ();

      if (Grammar .mtllib .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const mtllibs = this .result [0] .trim () .split (/\s+/);

            await Promise .all (mtllibs .map (path => this .mtllib (path)));
         }

         return true;
      }

      return false;
   },
   async mtllib (path)
   {
      try
      {
         const
            scene       = this .getExecutionContext (),
            url         = new URL (path, scene .getBaseURL ()),
            response    = await fetch (url),
            arrayBuffer = await response .arrayBuffer (),
            input       = $.decodeText ($.ungzip (arrayBuffer)),
            parser      = new MaterialParser (scene, input);

         parser .parse ();

         for (const [id, material] of parser .materials)
         {
            const name = this .sanitizeName (id);

            if (name)
            {
               scene .addNamedNode (scene .getUniqueName (name), material);
               scene .addExportedNode (scene .getUniqueExportName (name), material);
            }

            this .materials .set (id, material);
         }

         for (const [id, texture] of parser .textures)
         {
            const name = this .sanitizeName (id);

            if (name)
            {
               scene .addNamedNode (scene .getUniqueName (name), texture);
               scene .addExportedNode (scene .getUniqueExportName (name), texture);
            }

            this .textures .set (id, texture);
         }
      }
      catch (error)
      {
         console .warn (error);
      }
   },
   usemtl ()
   {
      this .comments ();

      if (Grammar .usemtl .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const id = this .result [0];

            this .material = this .materials .get (id) || this .defaultMaterial;
            this .texture  = this .textures .get (id);

            const smoothingGroup = this .smoothingGroups .get (this .group .getNodeName ());

            if (smoothingGroup)
               smoothingGroup .delete (this .smoothingGroup);
         }

         return true;
      }

      return false;
   },
   o ()
   {
      this .comments ();

      if (Grammar .o .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const
               scene = this .getExecutionContext (),
               name  = this .sanitizeName (this .result [0]);

            if (this .group .children .length)
            {
               this .object = scene .createNode("Transform");
               this .group  = scene .createNode ("Group");

               this .object .children .push (this .group);
               scene .getRootNodes () .push (this .object);
            }

            if (name && !this .object .getValue () .getName ())
            {
               scene .addNamedNode (scene .getUniqueName (name), this .object);
               scene .addExportedNode (scene .getUniqueExportName (name), this .object);
            }
         }

         return true;
      }

      return false;
   },
   g ()
   {
      this .comments ();

      if (Grammar .g .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const
               scene = this .getExecutionContext (),
               id    = this .result [0],
               name  = this .sanitizeName (id),
               group = this .groups .get (id);

            if (group)
            {
               this .group = group;
            }
            else
            {
               if (this .group .children .length)
               {
                  this .group = scene .createNode ("Group");

                  this .object .children .push (this .group);
               }
            }

            this .groups .set (id, this .group);

            if (name && !this .group .getValue () .getName ())
            {
               scene .addNamedNode (scene .getUniqueName (name), this .group);
               scene .addExportedNode (scene .getUniqueExportName (name), this .group);
            }

            this .smoothingGroup = 0;
         }

         return true;
      }

      return false;
   },
   s ()
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
   vts ()
   {
      const texCoords = this .texCoords;

      let result = false;

      while (this .vt (texCoords))
         result = true;

      return result;
   },
   vt (texCoords)
   {
      this .comments ();

      if (Grammar .vt .parse (this))
      {
         if (this .vec2 (texCoords))
            return true;

         throw new Error ("Expected a texture coordinate.");
      }

      return false;
   },
   vns ()
   {
      const normals = this .normals;

      let result = false;

      while (this .vn (normals))
         result = true;

      return result;
   },
   vn (normals)
   {
      this .comments ();

      if (Grammar .vn .parse (this))
      {
         if (this .vec3 (normals))
            return true;

         throw new Error ("Expected a normal vector.");
      }

      return false;
   },
   vs ()
   {
      const vertices = this .vertices;

      let result = false;

      while (this .v (vertices))
         result = true;

      return result;
   },
   v (vertices)
   {
      this .comments ();

      if (Grammar .v .parse (this))
      {
         if (this .vec3 (vertices))
            return true;

         throw new Error ("Expected a vertex coordinate.");
      }

      return false;
   },
   fs ()
   {
      this .comments ();

      if (Grammar .f .lookahead (this))
      {
         try
         {
            this .shape    = this .smoothingGroups .get (this .group .getNodeName ()) .get (this .smoothingGroup);
            this .geometry = this .shape .geometry;

            const indices = this .geometryIndices .get (this .geometry);

            this .texCoordIndex = indices .texCoordIndex;
            this .normalIndex   = indices .normalIndex;
            this .coordIndex    = indices .coordIndex;
         }
         catch
         {
            const
               scene      = this .getExecutionContext (),
               appearance = scene .createNode ("Appearance");

            this .shape         = scene .createNode ("Shape");
            this .geometry      = scene .createNode ("IndexedFaceSet");
            this .texCoordIndex = [ ];
            this .normalIndex   = [ ];
            this .coordIndex    = [ ];

            this .geometryIndices .set (this .geometry,
            {
               texCoordIndex: this .texCoordIndex,
               normalIndex:   this .normalIndex,
               coordIndex:    this .coordIndex,
            });

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

         if (this .texCoordIndex .length)
            this .geometry .texCoord = this .texCoord;

         if (this .normalIndex .length)
            this .geometry .normal = this .normal;

         this .geometry .coord = this .coord;

         return true;
      }

      return false;
   },
   f ()
   {
      this .comments ();

      if (Grammar .f .parse (this))
      {
         const
            texCoordIndex      = this .texCoordIndex,
            normalIndex        = this .normalIndex,
            coordIndex         = this .coordIndex,
            numTexCoordIndices = texCoordIndex .length,
            numNormalIndices   = normalIndex .length,
            numTexCoords       = this .texCoords .length,
            numNormals         = this .normals .length,
            numCoords          = this .vertices .length;

         while (this .indices (texCoordIndex, normalIndex, coordIndex, numTexCoords, numNormals, numCoords))
            ;

         if (texCoordIndex .length !== numTexCoordIndices)
            texCoordIndex .push (-1);

         if (normalIndex .length !== numNormalIndices)
            normalIndex .push (-1);

         coordIndex .push (-1);

         return true;
      }

      return false;
   },
   indices (texCoordIndex, normalIndex, coordIndex, numTexCoords, numNormals, numCoords)
   {
      if (this .int32 ())
      {
         coordIndex .push (this .index (this .value, numCoords));

         if (Grammar .slash .parse (this))
         {
            if (this .int32 ())
            {
               texCoordIndex .push (this .index (this .value, numTexCoords));
            }

            if (Grammar .slash .parse (this))
            {
               if (this .int32 ())
               {
                  normalIndex .push (this .index (this .value, numNormals));
               }
            }
         }

         return true;
      }

      return false;
   },
   index (index, length)
   {
      if (index === 0)
         throw new Error ("Invalid index.");

      if (index < 0)
         return length + index;

      return index - 1;
   },
   int32 ()
   {
      this .whitespaces ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [0]);

         return true;
      }

      return false;
   },
   double ()
   {
      this .whitespaces ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

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
   vec2 (array)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            array .push (x, y);
            return true;
         }
      }

      return false;
   },
   vec3 (array)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            if (this .double ())
            {
               const z = this .value;

               array .push (x, y, z)
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
   this .color3           = new Color3 ();
   this .id               = "";
}

Object .assign (MaterialParser .prototype,
{
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   parse ()
   {
      try
      {
         this .statements ();
      }
      catch (error)
      {
         if (DEVELOPMENT)
            console .log (error);
      }
   },
   comments ()
   {
      while (this .comment ())
         ;
   },
   comment ()
   {
      this .whitespaces ();

      if (Grammar .comment .parse (this))
         return true;

      return false;
   },
   whitespaces ()
   {
      Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   statements ()
   {
      while (this .statement ())
         ;
   },
   statement ()
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
   newmtl ()
   {
      this .comments ();

      if (Grammar .newmtl .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         this .id = "";

         if (Grammar .untilEndOfLine .parse (this))
         {
            this .id = this .result [0];

            this .material = this .executionContext .createNode ("Material");

            this .materials .set (this .id, this .material);

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   Ka ()
   {
      this .comments ();

      if (Grammar .Ka .parse (this))
      {
         if (this .col3 ())
         {
            const hsv = this .color3 .getHSV ([ ]);

            this .material .ambientIntensity = hsv [2];

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   Kd ()
   {
      this .comments ();

      if (Grammar .Kd .parse (this))
      {
         if (this .col3 ())
         {
            this .material .diffuseColor = this .color3;

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   Ks ()
   {
      this .comments ();

      if (Grammar .Ks .parse (this))
      {
         if (this .col3 ())
         {
            this .material .specularColor = this .color3;

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   Ns ()
   {
      this .comments ();

      if (Grammar .Ns .parse (this))
      {
         if (this .double ())
         {
            this .material .shininess = this .value / 1000;

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   d ()
   {
      this .comments ();

      if (Grammar .d .parse (this))
      {
         if (this .double ())
         {
            this .material .transparency = 1 - this .value;

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   Tr ()
   {
      this .comments ();

      if (Grammar .Tr .parse (this))
      {
         if (this .double ())
         {
            this .material .transparency = this .value;

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   illum ()
   {
      this .comments ();

      if (Grammar .illum .parse (this))
      {
         if (this .int32 ())
         {
            // Don't know what to do with illum value in X3D.
            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   map_Kd ()
   {
      this .comments ();

      if (Grammar .map_Kd .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .untilEndOfLine .parse (this))
         {
            const string = this .result [0];

            if (string .length && this .id .length)
            {
               const paths = string .trim () .split (/\s+/);

               if (paths .length)
               {
                  const
                     scene   = this .executionContext,
                     texture = scene .createNode ("ImageTexture"),
                     path    = paths .at (-1) .replace (/\\/g, "/");

                  texture .url = [path];

                  this .textures .set (this .id, texture);
               }
            }

            return true;
         }

         Grammar .untilEndOfLine .parse (this);

         return true;
      }

      return false;
   },
   int32 ()
   {
      this .whitespaces ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [0]);

         return true;
      }

      return false;
   },
   double ()
   {
      this .whitespaces ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

         return true;
      }

      if (Grammar .constants .parse (this))
      {
         this .value = this .CONSTANTS .get (this .result [2] .toUpperCase ());

         if (this .result [1] === "-")
            this .value = -this .value;

         return true;
      }

      return false;
   },
   col3 ()
   {
      if (this .double ())
      {
         this .color3 .r = this .value;

         if (this .double ())
         {
            this .color3 .g = this .value;

            if (this .double ())
            {
               this .color3 .b = this .value;

               return true;
            }
         }
      }

      return false;
   },
});

export default OBJParser;
