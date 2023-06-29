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
   line: /.*?\r?\n/gy,

   // Keywords
   ply: /ply/gy,
   format: /format ascii 1.0/gy,
   comment: /\bcomment\b/gy,
   element: /\belement\b/gy,
   elementName: /\b(\S+)\b/gy,
   property: /\bproperty\b/gy,
   propertyList: /\blist\b/gy,
   propertyType: /\b(char|uchar|short|ushort|int|uint|float|double|int8|uint8|int16|uint16|int32|uint32|float32|float64)\b/gy,
   propertyName: /\b(\S+)\b/gy,
   endHeader: /\bend_header\b/gy,

   double: /([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/gy,
   int32:  /((?:0[xX][\da-fA-F]+)|(?:[+-]?\d+))/gy,
});

/*
 * Parser
 */

function PLYParser (scene)
{
   X3DParser .call (this, scene);

   this .comments = [ ];
   this .attrib   = [ ];

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

Object .assign (Object .setPrototypeOf (PLYParser .prototype, X3DParser .prototype),
{
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
      await this .processElements (this .header ([ ]))

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

      this .headings (elements);

      const
         scene     = this .getScene (),
         worldInfo = scene .createNode ("WorldInfo");

      worldInfo .title = new URL (scene .worldURL) .pathname .split ('/') .at (-1);
      worldInfo .info  = this .comments;

      scene .rootNodes .push (worldInfo);

      return elements;
   },
   headings (elements)
   {
      while (this .head (elements))
         ;
   },
   head (elements)
   {
      if (this .element (elements))
         return true;

      if (Grammar .endHeader .parse (this))
         return false;

      if (Grammar .untilEndOfLine .parse (this))
         return true;

      return false;
   },
   element (elements)
   {
      this .whitespacesOrComments ();

      if (Grammar .element .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .elementName .parse (this))
         {
            const name = this .result [1];

            if (this .int32 ())
            {
               const element =
               {
                  name: name,
                  count: this .value,
                  properties: [ ],
               };

               this .properties (element .properties);

               elements .push (element);
               return true;
            }
         }
      }

      return false;
   },
   properties (properties)
   {
      while (this .property (properties))
         ;

      properties .colors    = properties .some (p => p .name .match (/^(?:red|green|blue|alpha|r|g|b|a)$/));
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
   async processElements (elements)
   {
      console .log (elements)
      
      for (const element of elements)
         await this .processElement (element);

      if (!this .coord)
         return;

      const
         scene      = this .getScene (),
         shape      = scene .createNode ("Shape"),
         appearance = scene .createNode ("Appearance"),
         material   = scene .createNode (this .geometry ? "Material" : "UnlitMaterial"),
         geometry   = this .geometry ?? scene .createNode ("PointSet");

      if (geometry .getNodeTypeName () !== "PointSet")
      {
         geometry .solid    = false;
         geometry .texCoord = this .texCoord;
      }

      geometry .attrib = this .attrib;
      geometry .color  = this .color;
      geometry .normal = this .normal;
      geometry .coord  = this .coord;

      appearance .material = material;
      shape .appearance    = appearance;
      shape .geometry      = geometry;

      scene .rootNodes .push (shape);
   },
   async processElement (element)
   {
      switch (element .name)
      {
         case "vertex":
            await this .parseVertices (element);
            break;
         case "face":
            this .parseFaces (element);
            break;
         default:
            this .parseUnknown (element);
            break;
      }
   },
});

export default PLYParser;
