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

import SFBool              from "./SFBool.js";
import SFColor             from "./SFColor.js";
import SFColorRGBA         from "./SFColorRGBA.js";
import SFDouble            from "./SFDouble.js";
import SFFloat             from "./SFFloat.js";
import SFImage             from "./SFImage.js";
import SFInt32             from "./SFInt32.js";
import SFMatrix3           from "./SFMatrix3.js";
import SFMatrix4           from "./SFMatrix4.js";
import SFNode              from "./SFNode.js";
import SFRotation          from "./SFRotation.js";
import SFString            from "./SFString.js";
import SFTime              from "./SFTime.js";
import SFVec2              from "./SFVec2.js";
import SFVec3              from "./SFVec3.js";
import SFVec4              from "./SFVec4.js";
import X3DObjectArrayField from "../Base/X3DObjectArrayField.js";
import X3DTypedArrayField  from "../Base/X3DTypedArrayField.js";

const
   { SFMatrix3d, SFMatrix3f } = SFMatrix3,
   { SFMatrix4d, SFMatrix4f } = SFMatrix4,
   { SFVec2d, SFVec2f }       = SFVec2,
   { SFVec3d, SFVec3f }       = SFVec3,
   { SFVec4d, SFVec4f }       = SFVec4;

/*
 *  MFNode
 */

function MFNode (... args)
{
   return X3DObjectArrayField .call (this, args);
}

Object .assign (Object .setPrototypeOf (MFNode .prototype, X3DObjectArrayField .prototype),
{
   getSingleType ()
   {
      return SFNode;
   },
   copy (instance)
   {
      if (instance)
      {
         const copy = new MFNode ();

         for (const node of this .getValue ())
            copy .push (node .copy (instance));

         return copy;
      }
      else
      {
         return X3DObjectArrayField .prototype .copy .call (this);
      }
   },
   toStream (generator)
   {
      const
         target = this .getTarget (),
         array  = target .getValue (),
         length = array .length;

      switch (length)
      {
         case 0:
         {
            generator .string += "[";
            generator .string += generator .TidySpace ();
            generator .string += "]";
            break;
         }
         case 1:
         {
            array [0] .toStream (generator);
            break;
         }
         default:
         {
            generator .string += "[";
            generator .string += generator .TidyBreak ();
            generator .IncIndent ();

            for (let i = 0; i < length; ++ i)
            {
               generator .string += generator .Indent ();
               array [i] .toStream (generator);
               generator .string += generator .string .at (-1) === "}" ? generator .TidyBreak () : generator .Break ();
            }

            generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += "]";
            break;
         }
      }
   },
   toVRMLStream (generator)
   {
      const
         target = this .getTarget (),
         array  = target .getValue (),
         length = array .length;

      switch (length)
      {
         case 0:
         {
            generator .string += "[";
            generator .string += generator .TidySpace ();
            generator .string += "]";
            break;
         }
         case 1:
         {
            generator .EnterScope ();

            array [0] .toVRMLStream (generator);

            generator .LeaveScope ();
            break;
         }
         default:
         {
            generator .EnterScope ();

            generator .string += "[";
            generator .string += generator .TidyBreak ();
            generator .IncIndent ();

            for (const element of array)
            {
               generator .string += generator .Indent ();
               element .toVRMLStream (generator);
               generator .string += generator .string .at (-1) === "}" ? generator .TidyBreak () : generator .Break ();
            }

            generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += "]";

            generator .LeaveScope ();
            break;
         }
      }
   },
   toXMLStream (generator)
   {
      const
         target = this .getTarget (),
         length = target .length;

      if (length)
      {
         generator .EnterScope ();

         const array = target .getValue ();

         for (let i = 0, n = length - 1; i < n; ++ i)
         {
            const node = array [i] .getValue ();

            if (node)
            {
               node .toXMLStream (generator);
               generator .string += generator .TidyBreak ();
            }
            else
            {
               generator .string += generator .Indent ();
               generator .string += "<";
               generator .string += "NULL";

               const containerField = generator .ContainerField ();

               if (containerField)
               {
                  generator .string += generator .Space ();
                  generator .string += "containerField='";
                  generator .string += generator .XMLEncode (containerField .getName ());
                  generator .string += "'";
               }

               generator .string += generator .closingTags ? "></NULL>" : "/>";
               generator .string += generator .TidyBreak ();
            }
         }

         const node = array .at (-1) .getValue ();

         if (node)
         {
            node .toXMLStream (generator);
         }
         else
         {
            generator .string += generator .Indent ();
            generator .string += "<";
            generator .string += "NULL";

            const containerField = generator .ContainerField ();

            if (containerField)
            {
               generator .string += generator .Space ();
               generator .string += "containerField='";
               generator .string += generator .XMLEncode (containerField .getName ());
               generator .string += "'";
            }

            generator .string += generator .closingTags ? "></NULL>" : "/>";
         }

         generator .LeaveScope ();
      }
   },
   toJSONStream (generator)
   {
      const
         target = this .getTarget (),
         length = target .length;

      if (length)
      {
         const array = target .getValue ();

         generator .EnterScope ();

         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         for (let i = 0, n = length - 1; i < n; ++ i)
         {
            generator .string += generator .Indent ();

            if (array [i])
               array [i] .toJSONStreamValue (generator);
            else
               generator .string += 'null';

            generator .string += ',';
            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .Indent ();

         if (array .at (-1))
            array .at (-1) .toJSONStreamValue (generator);
         else
            generator .string += 'null';

         generator .string += generator .TidyBreak ();
         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';

         generator .LeaveScope ();
      }
      else
      {
         generator .string += '[';
         generator .string += generator .TidySpace ();
         generator .string += ']';
      }
   },
   dispose ()
   {
      const target = this .getTarget ();

      target .resize (0, undefined, false);
      target .processInterests ();

      X3DObjectArrayField .prototype .dispose .call (target);
   },
});

for (const key of Object .keys (MFNode .prototype))
   Object .defineProperty (MFNode .prototype, key, { enumerable: false });

Object .defineProperties (MFNode,
{
   typeName:
   {
      value: "MFNode",
      enumerable: true,
   },
});

function MFString (... args)
{
   return X3DObjectArrayField .call (this, args);
}

Object .assign (Object .setPrototypeOf (MFString .prototype, X3DObjectArrayField .prototype),
{
   getSingleType ()
   {
      return SFString;
   },
   toXMLStream (generator, sourceText = false)
   {
      const
         target = this .getTarget (),
         length = target .length;

      if (length)
      {
         const value = target .getValue ();

         for (let i = 0, n = length - 1; i < n; ++ i)
         {
            generator .string += "\"";
            value [i] .toXMLStream (generator, sourceText);
            generator .string += "\"";
            generator .string += generator .Comma ();
            generator .string += generator .TidySpace ();
         }

         generator .string += "\"";
         value .at (-1) .toXMLStream (generator, sourceText);
         generator .string += "\"";
      }
   },
});

for (const key of Object .keys (MFString .prototype))
   Object .defineProperty (MFString .prototype, key, { enumerable: false });

Object .defineProperties (MFString,
{
   typeName:
   {
      value: "MFString",
      enumerable: true,
   },
});

/**
 * MFImage
 */

function MFImage (... args)
{
   return X3DObjectArrayField .call (this, args);
}

Object .assign (Object .setPrototypeOf (MFImage .prototype, X3DObjectArrayField .prototype),
{
   getSingleType ()
   {
      return SFImage;
   },
});

for (const key of Object .keys (MFImage .prototype))
   Object .defineProperty (MFImage .prototype, key, { enumerable: false });

Object .defineProperties (MFImage,
{
   typeName:
   {
      value: "MFImage",
      enumerable: true,
   },
});

function TypedArrayTemplate (TypeName, SingleType, ValueType, ArrayType, Components)
{
   function ArrayField (... args)
   {
      return X3DTypedArrayField .call (this, args);
   }

   Object .assign (Object .setPrototypeOf (ArrayField .prototype, X3DTypedArrayField .prototype),
   {
      getSingleType ()
      {
         return SingleType;
      },
      getValueType ()
      {
         return ValueType;
      },
      getArrayType ()
      {
         return ArrayType;
      },
      getComponents ()
      {
         return Components;
      },
   });

   for (const key of Object .keys (ArrayField .prototype))
      Object .defineProperty (ArrayField .prototype, key, { enumerable: false });

   Object .defineProperties (ArrayField,
   {
      typeName:
      {
         value: TypeName,
         enumerable: true,
      },
   });

   return ArrayField;
}

const Value = value => value;

const ArrayFields =
{
   MFBool:      TypedArrayTemplate ("MFBool",      SFBool,      Boolean,     Uint8Array,   1),
   MFColor:     TypedArrayTemplate ("MFColor",     SFColor,     SFColor,     Float32Array, 3),
   MFColorRGBA: TypedArrayTemplate ("MFColorRGBA", SFColorRGBA, SFColorRGBA, Float32Array, 4),
   MFDouble:    TypedArrayTemplate ("MFDouble",    SFDouble,    Value,       Float64Array, 1),
   MFFloat:     TypedArrayTemplate ("MFFloat",     SFFloat,     Value,       Float32Array, 1),
   MFImage:     MFImage,
   MFInt32:     TypedArrayTemplate ("MFInt32",     SFInt32,     Value,       Int32Array,   1),
   MFMatrix3d:  TypedArrayTemplate ("MFMatrix3d",  SFMatrix3d,  SFMatrix3d,  Float64Array, 9),
   MFMatrix3f:  TypedArrayTemplate ("MFMatrix3f",  SFMatrix3f,  SFMatrix3f,  Float32Array, 9),
   MFMatrix4d:  TypedArrayTemplate ("MFMatrix4d",  SFMatrix4d,  SFMatrix4d,  Float64Array, 16),
   MFMatrix4f:  TypedArrayTemplate ("MFMatrix4f",  SFMatrix4f,  SFMatrix4f,  Float32Array, 16),
   MFNode:      MFNode,
   MFRotation:  TypedArrayTemplate ("MFRotation",  SFRotation,  SFRotation,  Float64Array, 4),
   MFString:    MFString,
   MFTime:      TypedArrayTemplate ("MFTime",      SFTime,      Value,       Float64Array, 1),
   MFVec2d:     TypedArrayTemplate ("MFVec2d",     SFVec2d,     SFVec2d,     Float64Array, 2),
   MFVec2f:     TypedArrayTemplate ("MFVec2f",     SFVec2f,     SFVec2f,     Float32Array, 2),
   MFVec3d:     TypedArrayTemplate ("MFVec3d",     SFVec3d,     SFVec3d,     Float64Array, 3),
   MFVec3f:     TypedArrayTemplate ("MFVec3f",     SFVec3f,     SFVec3f,     Float32Array, 3),
   MFVec4d:     TypedArrayTemplate ("MFVec4d",     SFVec4d,     SFVec4d,     Float64Array, 4),
   MFVec4f:     TypedArrayTemplate ("MFVec4f",     SFVec4f,     SFVec4f,     Float32Array, 4),
};

export default ArrayFields;
