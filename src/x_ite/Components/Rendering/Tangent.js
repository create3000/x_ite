import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function Tangent (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .Tangent);
}

Object .assign (Object .setPrototypeOf (Tangent .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

      this ._vector .addInterest ("set_vector__", this);

      this .set_vector__ ();
   },
   set_vector__ ()
   {
      this .vector = this ._vector .getValue ();
      this .length = this ._vector .length;
   },
   addVector (index, array)
   {
      if (index >= 0 && this .length)
      {
         const
            vector = this .vector,
            i      = (index % this .length) * 4;

         array .push (vector [i], vector [i + 1], vector [i + 2], vector [i + 3]);
      }
      else
      {
         return array .push (1, 0, 0, 1);
      }
   },
   addVectors (array, min = this .length)
   {
      const length = this .length;

      if (length)
      {
         const vector = this .vector;

         for (let index = 0; index < min; ++ index)
         {
            const i = (index % length) * 4;

            array .push (vector [i], vector [i + 1], vector [i + 2], vector [i + 3]);
         }
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (1, 0, 0, 1);
      }

      return array;
   },
});

Object .defineProperties (Tangent,
{
   ... X3DNode .getStaticProperties ("Tangent", "Rendering", 5, "tangent", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "vector",   new Fields .MFVec4f ()),
      ]),
      enumerable: true,
   },
});

export default Tangent;
