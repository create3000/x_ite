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

import Expressions from "../../Parser/Expressions.js";
import $           from "../../../lib/jquery.js";

// Grammar

const Grammar = Expressions ({
   NRRD: /^NRRD(\d+)\n/gy,
   field: /([\w\s]+):\s*(.+?)\n/gy,
   comment: /#[^\n]*\n/gy,
   newLine: /\n/gy,
   data: /(.*)$/sgy,
});

// Parser

function NRRDParser ()
{
   this .fieldFunction = new Map ([
      ["type",      this .getType],
      ["encoding",  this .getEncoding],
      ["dimension", this .getDimension],
      ["sizes",     this .getSizes],
      ["endian",    this .getEndian],
   ]);
}

Object .assign (NRRDParser .prototype,
{
   parse (input)
   {
      this .setInput (input);

      if (this .getNRRD ())
      {
         this .getFields ();
         this .getData ();
      }

      return this .nrrd;
   },
   setInput (value)
   {
      this .dataView     = new DataView (value);
      this .input        = $.decodeText (value);
      this .lastIndex    = 0;
      this .nrrd         = { };
      this .littleEndian = true;
   },
   getNRRD ()
   {
      if (Grammar .NRRD .parse (this))
      {
         this .nrrd .nrrd    = true;
         this .nrrd .version = parseInt (this .result [1]);
         return true;
      }

      this .nrrd .nrrd = false;
      return false;
   },
   getFields ()
   {
      while (Grammar .comment .parse (this))
         ;

      while (Grammar .field .parse (this))
      {
         const
            key   = this .result [1] .toLowerCase (),
            value = this .result [2] .trim () .toLowerCase (),
            fun   = this .fieldFunction .get (key);

         if (fun)
            fun .call (this, value);

         while (Grammar .comment .parse (this))
            ;
      }
   },
   getType: (function ()
   {
      const types = new Map ([
         ["signed char",        ["signed char", 1]],
         ["int8",               ["signed char", 1]],
         ["int8_t",             ["signed char", 1]],
         ["uchar",              ["unsigned char", 1]],
         ["unsigned char",      ["unsigned char", 1]],
         ["uint8",              ["unsigned char", 1]],
         ["uint8_t",            ["unsigned char", 1]],
         ["short",              ["signed short", 2]],
         ["short int",          ["signed short", 2]],
         ["signed short",       ["signed short", 2]],
         ["signed short int",   ["signed short", 2]],
         ["int16",              ["signed short", 2]],
         ["int16_t",            ["signed short", 2]],
         ["ushort",             ["unsigned short", 2]],
         ["unsigned short",     ["unsigned short", 2]],
         ["unsigned short int", ["unsigned short", 2]],
         ["uint16",             ["unsigned short", 2]],
         ["uint16_t",           ["unsigned short", 2]],
         ["int",                ["signed int", 4]],
         ["signed int",         ["signed int", 4]],
         ["int32",              ["signed int", 4]],
         ["int32_t",            ["signed int", 4]],
         ["uint",               ["unsigned int", 4]],
         ["unsigned int",       ["unsigned int", 4]],
         ["uint32",             ["unsigned int", 4]],
         ["uint32_t",           ["unsigned int", 4]],
         ["float",              ["float", 4]],
         ["double",             ["double", 8]],
      ]);

      return function (value)
      {
         const type = types .get (value);

         if (type === undefined)
            throw new Error ("Unsupported NRRD type '" + value + "'.");

         this .byteType = type [0];
         this .bytes    = type [1];
      };
   })(),
   getEncoding: (function ()
   {
      const encodings = new Map ([
         ["ascii", "ascii"],
         ["txt",   "ascii"],
         ["text",  "ascii"],
         ["raw",   "raw"],
         ["hex",   "hex"],
         ["gz",    "gzip"],
         ["gzip",  "gzip"],
      ]);

      return function (value)
      {
         const encoding = encodings .get (value);

         if (encoding === undefined)
            throw new Error ("Unsupported NRRD encoding '" + value + "'.");

         this .encoding = encoding;
      };
   })(),
   getDimension (value)
   {
      const result = value .match (/(\d+)/);

      if (result)
      {
         const value = parseInt (result [1]);

         switch (value)
         {
            case 1:
            case 2:
            case 3:
            case 4:
               this .dimension = value;
               return;
         }
      }

      throw new Error ("Unsupported NRRD dimension '" + result [1] + "', must be 1, 2, 3, or 4.");
   },
   getSizes (value)
   {
      const
         num   = /\s*(\d+)/gy,
         sizes = [ ];

      let result;

      while (result = num .exec (value))
      {
         sizes .push (parseInt (result [1]));
      }

      switch (sizes .length)
      {
         case 1:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = 1;
            this .nrrd .depth      = 1;
            return;
         }
         case 2:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = sizes [1];
            this .nrrd .depth      = 1;
            return;
         }
         case 3:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = sizes [1];
            this .nrrd .depth      = sizes [2];
            return;
         }
         case 4:
         {
            this .nrrd .components = sizes [0];
            this .nrrd .width      = sizes [1];
            this .nrrd .height     = sizes [2];
            this .nrrd .depth      = sizes [3];
            return;
         }
         default:
            throw new Error ("Unsupported NRRD sizes.");
      }
   },
   getEndian (value)
   {
      if (value === "little")
      {
         this .littleEndian = true;
         return;
      }

      if (value === "big")
      {
         this .littleEndian = false;
         return;
      }

      throw new Error ("Unsupported NRRD endian, must be either 'little' or 'big'.");
   },
   getData ()
   {
      switch (this .encoding)
      {
         case "ascii":
         {
            this .ascii ();
            break;
         }
         case "raw":
         {
            this .raw ();
            break;
         }
         case "hex":
         {
            this .hex ();
            break;
         }
         case "gzip":
         {
            this .gzip ();
            break;
         }
      }
   },
   ascii ()
   {
      const
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      if (!Grammar .data .parse (this))
         return;

      const
         numbers    = this .result [1] .trim () .split (/\s+/),
         numNumbers = numbers .length;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (let i = 0; i < numNumbers; ++ i)
               data [i] = parseInt (numbers [i]);

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            for (let i = 0; i < numNumbers; ++ i)
               data [i] = parseInt (numbers [i]) / 256;

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            for (let i = 0; i < numNumbers; ++ i)
               data [i] = parseInt (numbers [i]) / 16777216;

            return;
         }
         case "float":
         {
            for (let i = 0; i < numNumbers; ++ i)
               data [i] = parseFloat (numbers [i]) / 256;

            return;
         }
         case "double":
         {
            for (let i = 0; i < numNumbers; ++ i)
               data [i] = parseFloat (numbers [i]) / 16777216;

            return;
         }
      }
   },
   raw ()
   {
      const
         dataView   = this .dataView,
         byteLength = dataView .byteLength,
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         length     = dataLength * this .bytes,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (let i = byteLength - length, d = 0; i < byteLength; ++ i, ++ d)
               data [d] = dataView .getUint8 (i);

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            for (let i = byteLength - length, d = 0; i < byteLength; i += 2, ++ d)
               data [d] = dataView .getUint16 (i, this .littleEndian) / 256;

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            for (let i = byteLength - length, d = 0; i < byteLength; i += 4, ++ d)
               data [d] = dataView .getUint32 (i, this .littleEndian) / 16777216;

            return;
         }
         case "float":
         {
            for (let i = byteLength - length, d = 0; i < byteLength; i += 4, ++ d)
               data [d] = dataView .getFloat32 (i, this .littleEndian) / 256;

            return;
         }
         case "double":
         {
            for (let i = byteLength - length, d = 0; i < byteLength; i += 8, ++ d)
               data [d] = dataView .getFloat64 (i, this .littleEndian) / 16777216;

            return;
         }
      }
   },
   hex ()
   {
      if (Grammar .data .parse (this))
      {
         const match = this .result [1] .match (/([0-9a-fA-F]{2})/g);

         if (match)
         {
            const array = Uint8Array .from (match, value => parseInt (value, 16));

            this .dataView = new DataView (array .buffer);

            this .raw ();
            return;
         }
      }

      throw new Error ("Invalid NRRD data.");
   },
   gzip ()
   {
      try
      {
         if (!Grammar .newLine .parse (this))
            throw new Error ("Invalid NRRD data.");

         const
            input       = this .dataView .buffer .slice (this .lastIndex),
            arrayBuffer = $.ungzip (input);

         this .dataView = new DataView (arrayBuffer);

         this .raw ();
      }
      catch (error)
      {
         throw new Error (`Invalid NRRD data: ${error}.`);
      }
   },
});

export default NRRDParser;
