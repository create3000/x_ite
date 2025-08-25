import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DNormalNode        from "./X3DNormalNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Normal (executionContext)
{
   X3DNormalNode .call (this, executionContext);

   this .addType (X3DConstants .Normal);
}

Object .assign (Object .setPrototypeOf (Normal .prototype, X3DNormalNode .prototype),
{
   initialize ()
   {
      X3DNormalNode .prototype .initialize .call (this);

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
            i      = (index % this .length) * 3;

         array .push (vector [i], vector [i + 1], vector [i + 2]);
      }
      else
      {
         return array .push (0, 0, 0);
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
            const i = (index % length) * 3;

            array .push (vector [i], vector [i + 1], vector [i + 2]);
         }
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (0, 0, 0);
      }

      return array;
   },
});

Object .defineProperties (Normal,
{
   ... X3DNode .getStaticProperties ("Normal", "Rendering", 2, "normal", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "vector",   new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default Normal;
