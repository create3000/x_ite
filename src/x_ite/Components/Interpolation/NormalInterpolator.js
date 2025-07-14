import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function NormalInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .NormalInterpolator);
}

Object .assign (Object .setPrototypeOf (NormalInterpolator .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      this .set_fraction__ ();
   },
   interpolate: (() =>
   {
      const
         keyValue0 = new Vector3 (),
         keyValue1 = new Vector3 ();

      return function (index0, index1, weight)
      {
         const keyValue = this ._keyValue .getValue ();

         let size = this ._key .length > 1 ? Math .floor (this ._keyValue .length / this ._key .length) : 0;

         this ._value_changed .length = size;

         const value_changed = this ._value_changed .getValue ();

         index0 *= size;
         index1  = index0 + size;

         index0 *= 3;
         index1 *= 3;
         size   *= 3;

         for (let i0 = 0; i0 < size; i0 += 3)
         {
            try
            {
               const
                  i1 = i0 + 1,
                  i2 = i0 + 2;

               keyValue0 .set (keyValue [index0 + i0], keyValue [index0 + i1], keyValue [index0 + i2]);
               keyValue1 .set (keyValue [index1 + i0], keyValue [index1 + i1], keyValue [index1 + i2]);

               const value = Algorithm .simpleSlerp (keyValue0, keyValue1, weight);

               value_changed [i0] = value [0];
               value_changed [i1] = value [1];
               value_changed [i2] = value [2];
            }
            catch (error)
            {
               //console .log (error);
            }
         }

         this ._value_changed .addEvent ();
      };
   })(),
});

Object .defineProperties (NormalInterpolator,
{
   ... X3DNode .getStaticProperties ("NormalInterpolator", "Interpolation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default NormalInterpolator;
