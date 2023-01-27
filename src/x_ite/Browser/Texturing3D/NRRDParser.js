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

// Grammar

var Grammar =
{
   NRRD: new RegExp ("^NRRD(\\d+)\\n", 'gy'),
   field: new RegExp ("([\\w\\s]+):\\s*(.+?)\\n", 'gy'),
   comment: new RegExp ("#[^\\n]*\\n", 'gy'),
   newLine: new RegExp ("\n", 'gy'),
   data: new RegExp ("(.*)$", 'sgy'),
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

for (var key in Grammar)
   Grammar [key] .parse = parse;

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

NRRDParser .prototype =
{
   parse: function (input)
   {
      this .setInput (new TextDecoder ("ascii") .decode (input));

      if (this .getNRRD ())
      {
         this .getFields ();
         this .getData ();
      }

      return this .nrrd;
   },
   setInput: function (value)
   {
      this .input     = value;
      this .lastIndex = 0;
      this .nrrd      = { };
      this .endian    = "little";
   },
   getNRRD: function ()
   {
      if (Grammar .NRRD .parse (this))
      {
         this .nrrd .nrrd    = true;
         this .nrrd .version = parseInt (this .result [1]);
         this .endian        = this .getEndianess ();
         return true;
      }

      this .nrrd .nrrd = false;
      return false;
   },
   getFields: function ()
   {
      while (Grammar .comment .parse (this))
         ;

      while (Grammar .field .parse (this))
      {
         var
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
      var types = new Map ([
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
         var type = types .get (value);

         if (type === undefined)
            throw new Error ("Unsupported NRRD type '" + value + "'.");

         this .byteType = type [0];
         this .bytes    = type [1];
      };
   })(),
   getEncoding: (function ()
   {
      var encodings = new Map ([
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
         var encoding = encodings .get (value);

         if (encoding === undefined)
            throw new Error ("Unsupported NRRD encoding '" + value + "'.");

         this .encoding = encoding;
      };
   })(),
   getDimension: function (value)
   {
      var
         result    = value .match (/(\d+)/),
         dimension = 0;

      if (result)
      {
         dimension = parseInt (result [1]);

         switch (dimension)
         {
            case 1:
            case 2:
            case 3:
            case 4:
               this .dimension = dimension;
               return;
         }
      }

      throw new Error ("Unsupported NRRD dimension '" + dimension + "', must be 1, 2, 3, or 4.");
   },
   getSizes: function (value)
   {
      var
         num    = new RegExp ("\\s*(\\d+)", 'gy'),
         result = null,
         sizes  = [ ];

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
   getEndian: function (value)
   {
      if (value === 'little' || value === 'big')
      {
         this .endian = value;
         return;
      }

      throw new Error ("Unsupported NRRD endian, must be 'little' or 'big'.");
   },
   getData: function ()
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
            this .rawString (this .input);
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
   ascii: function ()
   {
      const
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      if (! Grammar .data .parse (this))
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
   rawString: function (input)
   {
      var
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         length     = dataLength * this .bytes,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (var i = input .length - length, d = 0; i < input .length; ++ i, ++ d)
               data [d] = input .charCodeAt (i);

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1;
            else
               var e0 = 1, e1 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 2, ++ d)
               data [d] = this .short2byte (input .charCodeAt (i + e0),
                                            input .charCodeAt (i + e1));

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .int2byte (input .charCodeAt (i + e0),
                                          input .charCodeAt (i + e1),
                                          input .charCodeAt (i + e2),
                                          input .charCodeAt (i + e3));

            return;
         }
         case "float":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .float2byte (input .charCodeAt (i + e0),
                                            input .charCodeAt (i + e1),
                                            input .charCodeAt (i + e2),
                                            input .charCodeAt (i + e3));

            return;
         }
         case "double":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3, e4 = 4, e5 = 5, e6 = 6, e7 = 7;
            else
               var e0 = 7, e1 = 6, e2 = 5, e3 = 4, e4 = 3, e5 = 2, e6 = 1, e7 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 8, ++ d)
               data [d] = this .double2byte (input .charCodeAt (i + e0),
                                             input .charCodeAt (i + e1),
                                             input .charCodeAt (i + e2),
                                             input .charCodeAt (i + e3),
                                             input .charCodeAt (i + e4),
                                             input .charCodeAt (i + e5),
                                             input .charCodeAt (i + e6),
                                             input .charCodeAt (i + e7));

            return;
         }
      }
   },
   rawArray: function (input)
   {
      var
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         length     = dataLength * this .bytes,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (var i = input .length - length, d = 0; i < input .length; ++ i, ++ d)
               data [d] = input [i];

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1;
            else
               var e0 = 1, e1 = 0;

               for (var i = input .length - length, d = 0; i < input .length; i += 2, ++ d)
                  data [d] = this .short2byte (input [i + e0],
                                               input [i + e1]);

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .int2byte (input [i + e0],
                                          input [i + e1],
                                          input [i + e2],
                                          input [i + e3]);

            return;
         }
         case "float":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .float2byte (input [i + e0],
                                            input [i + e1],
                                            input [i + e2],
                                            input [i + e3]);

            return;
         }
         case "double":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3, e4 = 4, e5 = 5, e6 = 6, e7 = 7;
            else
               var e0 = 7, e1 = 6, e2 = 5, e3 = 4, e4 = 3, e5 = 2, e6 = 1, e7 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 8, ++ d)
               data [d] = this .double2byte (input [i + e0],
                                             input [i + e1],
                                             input [i + e2],
                                             input [i + e3],
                                             input [i + e4],
                                             input [i + e5],
                                             input [i + e6],
                                             input [i + e7]);

            return;
         }
      }
   },
   hex: function ()
   {
      if (Grammar .data .parse (this))
      {
         var match = this .result [1] .match (/([0-9a-fA-F]{2})/g);

         if (match)
         {
            var raw = match .map (function (value)
            {
               return parseInt (value, 16);
            });

            this .rawArray (raw);
            return;
         }
      }

      throw new Error ("Invalid NRRD data.");
   },
   gzip: function ()
   {
      try
      {
         if (! Grammar .newLine .parse (this))
            throw new Error ("Invalid NRRD data.");

         Grammar .data .parse (this);

         const
            array = this .binaryStringToBuffer (this .result [1]),
            raw   = pako .ungzip (array, { to: "raw" });

         this .rawArray (raw);
      }
      catch (error)
      {
         throw new Error (`Invalid NRRD data: ${error}.`);
      }
   },
   binaryStringToBuffer: function (string)
   {
      const array = new Uint8Array (string .length);

      for (let i = 0, length = string .length; i < length; ++ i)
         array [i] = string .charCodeAt (i);

      return array;
   },
   getEndianess: function ()
   {
      var
         buffer = new ArrayBuffer (4),
         int    = new Uint32Array (buffer),
         bytes  = new Uint8Array (buffer);

      int [0] = 0x01020304;

      if (bytes [0] == 1 && bytes [1] == 2 && bytes [2] == 3 && bytes [3] == 4)
         return 'big';

      if (bytes [0] == 4 && bytes [1] == 3 && bytes [2] == 2 && bytes [3] == 1)
         return 'little';

      throw new Error ("NRRD: unkown system endianess,");
   },
   short2byte: (function ()
   {
      var
         bytes  = new Uint8Array (2),
         number = new Uint16Array (bytes .buffer);

      return function (b0, b1)
      {
         bytes [0] = b0;
         bytes [1] = b1;

         return number [0] / 256;
      };
   })(),
   int2byte: (function ()
   {
      var
         bytes  = new Uint8Array (4),
         number = new Uint32Array (bytes .buffer);

      return function (b0, b1, b2, b3)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;

         return number [0] / 16777216;
      };
   })(),
   float2byte: (function ()
   {
      var
         bytes  = new Uint8Array (4),
         number = new Float32Array (bytes .buffer);

      return function (b0, b1, b2, b3)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;

         return number [0] / 256;
      };
   })(),
   double2byte: (function ()
   {
      var
         bytes  = new Uint8Array (8),
         number = new Float64Array (bytes .buffer);

      return function (b0, b1, b2, b3, b4, b5, b6, b7)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;
         bytes [4] = b4;
         bytes [5] = b5;
         bytes [6] = b6;
         bytes [7] = b7;

         return number [0] / 16777216;
      };
   })(),
};

export default NRRDParser;
