import SFScalar            from "./SFScalar.js";
import SFColor             from "./SFColor.js";
import SFColorRGBA         from "./SFColorRGBA.js";
import SFImage             from "./SFImage.js";
import SFMatrix3           from "./SFMatrix3.js";
import SFMatrix4           from "./SFMatrix4.js";
import SFNode              from "./SFNode.js";
import SFRotation          from "./SFRotation.js";
import SFVec2              from "./SFVec2.js";
import SFVec3              from "./SFVec3.js";
import SFVec4              from "./SFVec4.js";
import X3DObjectArrayField from "../Base/X3DObjectArrayField.js";
import X3DTypedArrayField  from "../Base/X3DTypedArrayField.js";
import Matrix3             from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4             from "../../standard/Math/Numbers/Matrix4.js";
import Rotation4           from "../../standard/Math/Numbers/Rotation4.js";
import Vector4             from "../../standard/Math/Numbers/Vector4.js";

const
   { SFBool, SFDouble, SFFloat, SFInt32, SFString, SFTime } = SFScalar,
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

      target .resize (0, undefined, true);
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

function TypedArrayTemplate (TypeName, SingleType, ValueType, ArrayType, Components, singleValue)
{
   function ArrayField (... args)
   {
      return X3DTypedArrayField .call (this, args);
   }

   Object .assign (Object .setPrototypeOf (ArrayField .prototype, X3DTypedArrayField .prototype),
   {
      getSingleValue ()
      {
         return singleValue;
      },
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
   MFMatrix3d:  TypedArrayTemplate ("MFMatrix3d",  SFMatrix3d,  SFMatrix3d,  Float64Array, 9,  Matrix3 .Identity),
   MFMatrix3f:  TypedArrayTemplate ("MFMatrix3f",  SFMatrix3f,  SFMatrix3f,  Float32Array, 9,  Matrix3 .Identity),
   MFMatrix4d:  TypedArrayTemplate ("MFMatrix4d",  SFMatrix4d,  SFMatrix4d,  Float64Array, 16, Matrix4 .Identity),
   MFMatrix4f:  TypedArrayTemplate ("MFMatrix4f",  SFMatrix4f,  SFMatrix4f,  Float32Array, 16, Matrix4 .Identity),
   MFNode:      MFNode,
   MFRotation:  TypedArrayTemplate ("MFRotation",  SFRotation,  SFRotation,  Float64Array, 4,  Rotation4 .Identity),
   MFString:    MFString,
   MFTime:      TypedArrayTemplate ("MFTime",      SFTime,      Value,       Float64Array, 1,  -1),
   MFVec2d:     TypedArrayTemplate ("MFVec2d",     SFVec2d,     SFVec2d,     Float64Array, 2),
   MFVec2f:     TypedArrayTemplate ("MFVec2f",     SFVec2f,     SFVec2f,     Float32Array, 2),
   MFVec3d:     TypedArrayTemplate ("MFVec3d",     SFVec3d,     SFVec3d,     Float64Array, 3),
   MFVec3f:     TypedArrayTemplate ("MFVec3f",     SFVec3f,     SFVec3f,     Float32Array, 3),
   MFVec4d:     TypedArrayTemplate ("MFVec4d",     SFVec4d,     SFVec4d,     Float64Array, 4,  Vector4 .wAxis),
   MFVec4f:     TypedArrayTemplate ("MFVec4f",     SFVec4f,     SFVec4f,     Float32Array, 4,  Vector4 .wAxis),
};

export default ArrayFields;
