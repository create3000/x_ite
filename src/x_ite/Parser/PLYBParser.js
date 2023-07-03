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

import PLYAParser from "./PLYAParser.js";

function PLYBParser (scene)
{
   PLYAParser .call (this, scene);

   this .typeMapping = new Map ([
      ["char",    this .binaryInt8],
      ["uchar",   this .binaryUint8],
      ["short",   this .binaryInt16],
      ["ushort",  this .binaryUint16],
      ["int",     this .binaryInt32],
      ["uint",    this .binaryUint32],
      ["float",   this .binaryFloat32],
      ["double",  this .binaryFloat64],
      ["int8",    this .binaryInt8],
      ["uint8",   this .binaryUint8],
      ["int16",   this .binaryInt16],
      ["uint16",  this .binaryUint16],
      ["int32",   this .binaryInt32],
      ["uint32",  this .binaryUint32],
      ["float32", this .binaryFloat32],
      ["float64", this .binaryFloat64],
   ]);

   this .binaryInt8    .bytes = 1;
   this .binaryUint8   .bytes = 1;
   this .binaryInt16   .bytes = 2;
   this .binaryUint16  .bytes = 2;
   this .binaryInt32   .bytes = 4;
   this .binaryUint32  .bytes = 4;
   this .binaryFloat32 .bytes = 4;
   this .binaryFloat64 .bytes = 8;
}

Object .assign (Object .setPrototypeOf (PLYBParser .prototype, PLYAParser .prototype),
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
      this .magic        = this .input .match (/^ply\r?\nformat (binary_(?:little|big)_endian) 1.0.*?end_header\r?\n/s);
      this .byteOffset   = this .magic ?.[0] .length;
      this .littleEndian = this .magic ?.[1] === "binary_little_endian";
   },
   isValid ()
   {
      if (!(this .arrayBuffer instanceof ArrayBuffer))
         return false;

      return !! this .magic;
   },
   binaryInt8 ()
   {
      this .value       = this .dataView .getInt8 (this .byteOffset, this .littleEndian);
      this .byteOffset += 1;

      return true;
   },
   binaryUint8 ()
   {
      this .value       = this .dataView .getUint8 (this .byteOffset, this .littleEndian);
      this .byteOffset += 1;

      return true;
   },
   binaryInt16 ()
   {
      this .value       = this .dataView .getInt16 (this .byteOffset, this .littleEndian);
      this .byteOffset += 2;

      return true;
   },
   binaryUint16 ()
   {
      this .value       = this .dataView .getUint16 (this .byteOffset, this .littleEndian);
      this .byteOffset += 2;

      return true;
   },
   binaryInt32 ()
   {
      this .value       = this .dataView .getInt32 (this .byteOffset, this .littleEndian);
      this .byteOffset += 4;

      return true;
   },
   binaryUint32 ()
   {
      this .value       = this .dataView .getUint32 (this .byteOffset, this .littleEndian);
      this .byteOffset += 4;

      return true;
   },
   binaryFloat32 ()
   {
      this .value       = this .dataView .getFloat32 (this .byteOffset, this .littleEndian);
      this .byteOffset += 4;

      return true;
   },
   binaryFloat64 ()
   {
      this .value       = this .dataView .getFloat64 (this .byteOffset, this .littleEndian);
      this .byteOffset += 8;

      return true;
   },
   processElements (elements)
   {
      this .whitespaces = Function .prototype;

      return PLYAParser .prototype .processElements .call (this, elements);
   },
   parseUnknown ({ count, properties })
   {
      for (let i = 0; i < count; ++ i)
      {
         for (const { count, type } of properties)
         {
            if (count)
            {
               count .call (this);

               this .byteOffset += this .value * this .typeMapping .get (type) .bytes;
            }
            else
            {
               this .byteOffset += this .typeMapping .get (type) .bytes;
            }
         }
      }
   },
   // parseUnknown ({ count, properties })
   // {
   //    let string = "";

   //    for (let i = 0; i < count; ++ i)
   //    {
   //       for (const { count, type, value } of properties)
   //       {
   //          if (count === undefined)
   //          {
   //             value .call (this);

   //             string += this .value + " "
   //          }
   //          else
   //          {
   //             count .call (this);

   //             string += this .value + " "

   //             for (let i = 0, l = this .value; i < l; ++ i)
   //             {
   //                value .call (this);

   //                string += this .value + " "
   //             }
   //          }
   //       }

   //       string += "\n"
   //    }

   //    console .log (string .substring (0, 1000))
   // },
});

export default PLYBParser;
