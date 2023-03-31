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
import X3DConstants        from "../Base/X3DConstants.js";

const
   SFMatrix3d = SFMatrix3 .SFMatrix3d,
   SFMatrix3f = SFMatrix3 .SFMatrix3f,
   SFMatrix4d = SFMatrix4 .SFMatrix4d,
   SFMatrix4f = SFMatrix4 .SFMatrix4f,
   SFVec2d    = SFVec2 .SFVec2d,
   SFVec2f    = SFVec2 .SFVec2f,
   SFVec3d    = SFVec3 .SFVec3d,
   SFVec3f    = SFVec3 .SFVec3f,
   SFVec4d    = SFVec4 .SFVec4d,
   SFVec4f    = SFVec4 .SFVec4f;

/*
 *  MFNode
 */

const _cloneCount = Symbol ();

function MFNode (value)
{
   return X3DObjectArrayField .call (this, arguments);
}

MFNode .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
{
   constructor: MFNode,
   [_cloneCount]: 0,
   getSingleType: function ()
   {
      return SFNode;
   },
   getValueType: function ()
   {
      return SFNode;
   },
   getArrayType: function ()
   {
      return Array;
   },
   getComponents: function ()
   {
      return 1;
   },
   getTypeName: function ()
   {
      return "MFNode";
   },
   getType: function ()
   {
      return X3DConstants .MFNode;
   },
   copy: function (instance)
   {
      if (instance)
      {
         const copy = new MFNode ();

         for (const node of this .getValue ())
            copy .push (node .copy (instance));

         copy .setModificationTime (0);

         return copy;
      }
      else
      {
         return X3DObjectArrayField .prototype .copy .call (this);
      }
   },
   addCloneCount: function (count)
   {
      const target = this .getTarget ();

      target [_cloneCount] += count;

      for (const element of target .getValue ())
         element .addCloneCount (count);
   },
   removeCloneCount: function (count)
   {
      const target = this .getTarget ();

      target [_cloneCount] -= count;

      for (const element of target .getValue ())
         element .removeCloneCount (count);
   },
   addChildObject: function (value)
   {
      const target = this .getTarget ();

      X3DObjectArrayField .prototype .addChildObject .call (target, value);

      value .addCloneCount (target [_cloneCount]);
   },
   removeChildObject: function (value)
   {
      const target = this .getTarget ();

      X3DObjectArrayField .prototype .removeChildObject .call (target, value);

      value .removeCloneCount (target [_cloneCount]);
   },
   toStream: function (generator)
   {
      const
         target = this .getTarget (),
         array  = target .getValue ();

      switch (array .length)
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
            generator .PushUnitCategory (target .getUnit ());

            array [0] .toStream (generator);

            generator .PopUnitCategory ();
            break;
         }
         default:
         {
            generator .PushUnitCategory (target .getUnit ());

            generator .string += "[";
            generator .string += generator .TidyBreak ();
            generator .IncIndent ();

            for (let i = 0, length = array .length; i < length; ++ i)
            {
               generator .string += generator .Indent ();
               array [i] .toStream (generator);
               generator .string += generator .TidyBreak ();
            }

            generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += "]";

            generator .PopUnitCategory ();
            break;
         }
      }
   },
   toVRMLString: function ()
   {
      const target = this .getTarget ();

      target .addCloneCount (1);

      const string = X3DObjectArrayField .prototype .toVRMLString .call (target);

      target .removeCloneCount (1);

      return string;
   },
   toVRMLStream: function (generator)
   {
      const
         target = this .getTarget (),
         array  = target .getValue ();

      switch (array .length)
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
               generator .string += generator .TidyBreak ();
            }

            generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += "]";

            generator .LeaveScope ();
            break;
         }
      }
   },
   toXMLString: function ()
   {
      const target = this .getTarget ();

      target .addCloneCount (1);

      const string = X3DObjectArrayField .prototype .toXMLString .call (target);

      target .removeCloneCount (1);

      return string;
   },
   toXMLStream: function (generator)
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

               generator .string += "/>";
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
         }

         generator .LeaveScope ();
      }
   },
   toJSONStream: function (generator)
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
   dispose: function ()
   {
      const target = this .getTarget ();

      target .resize (0);

      X3DObjectArrayField .prototype .dispose .call (target);
   },
});

for (const key of Reflect .ownKeys (MFNode .prototype))
   Object .defineProperty (MFNode .prototype, key, { enumerable: false });

function MFString (value)
{
   return X3DObjectArrayField .call (this, arguments);
}

MFString .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
{
   constructor: MFString,
   getValueType: function ()
   {
      return String;
   },
   getSingleType: function ()
   {
      return SFString;
   },
   getArrayType: function ()
   {
      return Array;
   },
   getComponents: function ()
   {
      return 1;
   },
   getTypeName: function ()
   {
      return "MFString";
   },
   getType: function ()
   {
      return X3DConstants .MFString;
   },
   toXMLStream: function (generator)
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
            value [i] .toXMLStream (generator);
            generator .string += "\"";
            generator .string += generator .Comma ();
            generator .string += generator .TidySpace ();
         }

         generator .string += "\"";
         value .at (-1) .toXMLStream (generator);
         generator .string += "\"";
      }
   },
});

for (const key of Reflect .ownKeys (MFString .prototype))
   Object .defineProperty (MFString .prototype, key, { enumerable: false });

function MFImageTemplate (TypeName, Type, SingleType, ValueType, ArrayType, Components)
{
   function ArrayField (value)
   {
      return X3DObjectArrayField .call (this, arguments);
   }

   ArrayField .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
   {
      constructor: ArrayField,
      getSingleType: function ()
      {
         return SFImage;
      },
      getValueType: function ()
      {
         return SFImage;
      },
      getArrayType: function ()
      {
         return ArrayType;
      },
      getComponents: function ()
      {
         return Components;
      },
      getTypeName: function ()
      {
         return TypeName;
      },
      getType: function ()
      {
         return Type;
      },
   });

   for (const key of Reflect .ownKeys (ArrayField .prototype))
      Object .defineProperty (ArrayField .prototype, key, { enumerable: false });

   return ArrayField;
}

function TypedArrayTemplate (TypeName, Type, SingleType, ValueType, ArrayType, Components)
{
   function ArrayField (value)
   {
      return X3DTypedArrayField .call (this, arguments);
   }

   ArrayField .prototype = Object .assign (Object .create (X3DTypedArrayField .prototype),
   {
      constructor: ArrayField,
      getSingleType: function ()
      {
         return SingleType;
      },
      getValueType: function ()
      {
         return ValueType;
      },
      getArrayType: function ()
      {
         return ArrayType;
      },
      getComponents: function ()
      {
         return Components;
      },
      getTypeName: function ()
      {
         return TypeName;
      },
      getType: function ()
      {
         return Type;
      },
   });

   for (const key of Reflect .ownKeys (ArrayField .prototype))
      Object .defineProperty (ArrayField .prototype, key, { enumerable: false });

   return ArrayField;
}

function Value (value) { return value; }

const ArrayFields =
{
   MFBool:      TypedArrayTemplate ("MFBool",      X3DConstants .MFBool,      SFBool,      Boolean,     Uint8Array,   1),
   MFColor:     TypedArrayTemplate ("MFColor",     X3DConstants .MFColor,     SFColor,     SFColor,     Float32Array, 3),
   MFColorRGBA: TypedArrayTemplate ("MFColorRGBA", X3DConstants .MFColorRGBA, SFColorRGBA, SFColorRGBA, Float32Array, 4),
   MFDouble:    TypedArrayTemplate ("MFDouble",    X3DConstants .MFDouble,    SFDouble,    Value,       Float64Array, 1),
   MFFloat:     TypedArrayTemplate ("MFFloat",     X3DConstants .MFFloat,     SFFloat,     Value,       Float32Array, 1),
   MFImage:     MFImageTemplate    ("MFImage",     X3DConstants .MFImage,     undefined,   undefined,   Array,        1),
   MFInt32:     TypedArrayTemplate ("MFInt32",     X3DConstants .MFInt32,     SFInt32,     Value,       Int32Array,   1),
   MFMatrix3d:  TypedArrayTemplate ("MFMatrix3d",  X3DConstants .MFMatrix3d,  SFMatrix3d,  SFMatrix3d,  Float64Array, 9),
   MFMatrix3f:  TypedArrayTemplate ("MFMatrix3f",  X3DConstants .MFMatrix3f,  SFMatrix3f,  SFMatrix3f,  Float32Array, 9),
   MFMatrix4d:  TypedArrayTemplate ("MFMatrix4d",  X3DConstants .MFMatrix4d,  SFMatrix4d,  SFMatrix4d,  Float64Array, 16),
   MFMatrix4f:  TypedArrayTemplate ("MFMatrix4f",  X3DConstants .MFMatrix4f,  SFMatrix4f,  SFMatrix4f,  Float32Array, 16),
   MFNode:      MFNode,
   MFRotation:  TypedArrayTemplate ("MFRotation",  X3DConstants .MFRotation,  SFRotation,  SFRotation,  Float64Array, 4),
   MFString:    MFString,
   MFTime:      TypedArrayTemplate ("MFTime",      X3DConstants .MFTime,      SFTime,      Value,       Float64Array, 1),
   MFVec2d:     TypedArrayTemplate ("MFVec2d",     X3DConstants .MFVec2d,     SFVec2d,     SFVec2d,     Float64Array, 2),
   MFVec2f:     TypedArrayTemplate ("MFVec2f",     X3DConstants .MFVec2f,     SFVec2f,     SFVec2f,     Float32Array, 2),
   MFVec3d:     TypedArrayTemplate ("MFVec3d",     X3DConstants .MFVec3d,     SFVec3d,     SFVec3d,     Float64Array, 3),
   MFVec3f:     TypedArrayTemplate ("MFVec3f",     X3DConstants .MFVec3f,     SFVec3f,     SFVec3f,     Float32Array, 3),
   MFVec4d:     TypedArrayTemplate ("MFVec4d",     X3DConstants .MFVec4d,     SFVec4d,     SFVec4d,     Float64Array, 4),
   MFVec4f:     TypedArrayTemplate ("MFVec4f",     X3DConstants .MFVec4f,     SFVec4f,     SFVec4f,     Float32Array, 4),
};

export default ArrayFields;
