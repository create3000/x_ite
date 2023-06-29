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
import Expressions from "./Expressions.js";

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   untilEndOfLine: /([^\r\n]+)/gy,

   // Keywords
   ply: /ply/gy,
   format: /format ascii 1.0/gy,
   comment: /\bcomment\b/gy,
   element: /\belement\b/gy,
   elementType: /\b(vertex|face|edge)\b/gy,
   property: /\bproperty\b/gy,
   propertyList: /\blist\b/gy,
   propertyType: /\b(char|uchar|short|ushort|int|uint|float|double|int8|uint8|int16|uint16|int32|uint32|float32|float64)\b/gy,
   propertyName: /\b(\S+)\b/gy,
   endHeader: /\bend_header\b/gy,

   //property list uchar int vertex_indices

   double: /([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/gy,
   int32:  /((?:0[xX][\da-fA-F]+)|(?:[+-]?\d+))/gy,
});

/*
 * Parser
 */

function PLYAParser (scene)
{
   X3DParser .call (this, scene);

   this .comments = [ ];

   this .typeMapping = new Map ([
      ["char",    this .int32],
      ["uchar",   this .int32],
      ["short",   this .int32],
      ["ushort",  this .int32],
      ["int",     this .int32],
      ["uint",    this .int32],
      ["float",   this .double],
      ["double",  this .double],
      ["int8",    this .int32],
      ["uint8",   this .int32],
      ["int16",   this .int32],
      ["uint16",  this .int32],
      ["int32",   this .int32],
      ["uint32",  this .int32],
      ["float32", this .double],
      ["float64", this .double],
   ]);
}

Object .assign (Object .setPrototypeOf (PLYAParser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "STRING";
   },
   setInput (input)
   {
      this .input = input;
   },
   isValid ()
   {
      return this .input .match (/^ply\r?\nformat ascii 1.0/);
   },
   parseIntoScene (resolve, reject)
   {
      this .ply ()
         .then (resolve)
         .catch (reject);
   },
   ply: async function ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("PLY");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      const elements = [ ];

      this .header (elements);
      this .processElements (elements)

      // Create nodes.

      return this .getScene ();
   },
   whitespacesOrComments ()
   {
      while (this .whitespaces () || this .comment ())
         ;
   },
   whitespaces ()
   {
      return Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   comment ()
   {
      if (Grammar .comment .parse (this) && Grammar .untilEndOfLine .parse (this))
      {
         this .comments .push (this .result [1] .trim ());
         return true;
      }

      return false;
   },
   double ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [1]);

         return true;
      }

      return false;
   },
   int32 ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [1]);

         return true;
      }

      return false;
   },
   convertColor (value, type)
   {
      switch (type)
      {
         case "uchar":
         case "uint8":
            return value / 0xff;
         case "ushort":
         case "uint16":
            return value / 0xfffff;
         case "uint":
         case "uint32":
            return value / 0xffffffff;
         case "float":
         case "float32":
         case "double":
         case "float64":
            return value;
      }
   },
   header (elements)
   {
      Grammar .ply .parse (this);
      Grammar .whitespaces .parse (this);
      Grammar .format .parse (this);

      this .elements (elements);

      Grammar .whitespaces .parse (this);
      Grammar .endHeader .parse (this);

      const
         scene     = this .getExecutionContext (),
         worldInfo = scene .createNode ("WorldInfo");

      worldInfo .title = new URL (scene .worldURL) .pathname .split ('/') .at (-1);
      worldInfo .info  = this .comments;

      scene .rootNodes .push (worldInfo);
   },
   elements (elements)
   {
      while (this .element (elements))
         ;
   },
   element (elements)
   {
      this .whitespacesOrComments ();

      if (Grammar .element .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .elementType .parse (this))
         {
            const type = this .result [1];

            if (this .int32 ())
            {
               const element =
               {
                  type: type,
                  count: this .value,
                  properties: [ ],
               };

               this .properties (element .properties);

               elements .push (element);
               return true;
            }
         }

         return true;
      }

      return false;
   },
   properties (properties)
   {
      while (this .property (properties))
         ;

      properties .colors    = properties .some (p => p .name .match (/^(?:red|green|blue)$/));
      properties .texCoords = properties .some (p => p .name .match (/^(?:s|t|u|v)$/));
      properties .normals   = properties .some (p => p .name .match (/^(?:nx|ny|nz)$/));
   },
   property (properties)
   {
      this .whitespacesOrComments ();

      if (Grammar .property .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .propertyType .parse (this))
         {
            const
               type  = this .result [1],
               value = this .typeMapping .get (type);

            this .whitespacesNoLineTerminator ();

            if (Grammar .propertyName .parse (this))
            {
               const name = this .result [1];

               properties .push ({ type, value, name });
               return true;
            }
         }

         if (Grammar .propertyList .parse (this))
         {
            this .whitespacesNoLineTerminator ();

            if (Grammar .propertyType .parse (this))
            {
               const count = this .typeMapping .get (this .result [1]);

               this .whitespacesNoLineTerminator ();

               if (Grammar .propertyType .parse (this))
               {
                  const
                     type  = this .result [1],
                     value = this .typeMapping .get (type);

                  this .whitespacesNoLineTerminator ();

                  if (Grammar .propertyName .parse (this))
                  {
                     const name = this .result [1];

                     properties .push ({ count, type, value, name });
                     return true;
                  }
               }
            }
         }
      }

      return false;
   },
   processElements (elements)
   {
      for (const element of elements)
         this .processElement (element);

      if (!this .coord)
         return;

      const
         scene      = this .getExecutionContext (),
         shape      = scene .createNode ("Shape"),
         appearance = scene .createNode ("Appearance"),
         material   = scene .createNode ("Material"),
         geometry   = this .geometry ?? scene .createNode ("PointSet");

      geometry .solid    = false;
      geometry .color    = this .color;
      geometry .texCoord = this .texCoord;
      geometry .normal   = this .normal;
      geometry .coord    = this .coord;

      appearance .material = material;
      shape .appearance    = appearance;
      shape .geometry      = this .geometry;

      scene .rootNodes .push (shape);
   },
   processElement (element)
   {
      switch (element .type)
      {
         case "vertex":
            this .parseVertices (element);
            break;
         case "face":
            this .parseFaces (element);
            break;
      }
   },
   parseVertices (element)
   {
      const
         scene     = this .getExecutionContext (),
         color     = scene .createNode ("Color"),
         colors    = [ ],
         texCoord  = scene .createNode ("TextureCoordinate"),
         texCoords = [ ],
         normal    = scene .createNode ("Normal"),
         normals   = [ ],
         coord     = scene .createNode ("Coordinate"),
         points    = [ ];

      const { count, properties } = element;

      for (let i = 0; i < count; ++ i)
      {
         let r = 1, g = 1, b = 1;
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
               case "red":   r = this .convertColor (this .value, type); break;
               case "green": g = this .convertColor (this .value, type); break;
               case "blue":  b = this .convertColor (this .value, type); break;
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
            colors .push (r, g, b);

         if (properties .texCoords)
            texCoords .push (s, t);

         if (properties .normals)
            normals .push (nx, ny, nz);

         points .push (x, y, z);
      }

      color .color    = colors;
      texCoord .point = texCoords;
      normal .vector  = normals;
      coord .point    = points;

      this .color    = colors .length  ? color : null;
      this .texCoord = texCoords .length ? texCoord : null;
      this .normal   = normals .length ? normal : null;
      this .coord    = coord;
   },
   parseFaces (element)
   {
      const
         scene      = this .getExecutionContext (),
         geometry   = scene .createNode ("IndexedFaceSet"),
         coordIndex = geometry .coordIndex;

      const { count, properties } = element;

      for (let i = 0; i < count; ++ i)
      {
         this .whitespaces ();

         for (const { count, value } of properties)
         {
            if (!count .call (this))
               throw new Error (`Couldn't parse property count for ${property .name}.`);

            const length = this .value;

            for (let i = 0; i < length; ++ i)
            {
               if (!value .call (this))
                  throw new Error (`Couldn't parse a property value for ${property .name}.`);

               coordIndex .push (this .value);
            }

            coordIndex .push (-1);
         }
      }

      this .geometry = geometry;
   },
});

export default PLYAParser;
