import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DColorNode         from "./X3DColorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Color (executionContext)
{
   X3DColorNode .call (this, executionContext);

   this .addType (X3DConstants .Color);
}

Object .assign (Object .setPrototypeOf (Color .prototype, X3DColorNode .prototype),
{
   initialize ()
   {
      X3DColorNode .prototype .initialize .call (this);

      this ._color .addInterest ("set_color__", this);

      this .set_color__ ();
   },
   set_color__ ()
   {
      this .color  = this ._color .getValue ();
      this .length = this ._color .length;
   },
   addColor (index, array)
   {
      if (index >= 0 && this .length)
      {
         const
            color = this .color,
            i     = (index % this .length) * 3;

         return array .push (color [i], color [i + 1], color [i + 2], 1);
      }
      else
      {
         array .push (1, 1, 1, 1);
      }
   },
   addColors (array, min = this .length)
   {
      const length = this .length;

      if (length)
      {
         const color = this .color;

         for (let index = 0; index < min; ++ index)
         {
            const i = (index % length) * 3;

            array .push (color [i], color [i + 1], color [i + 2], 1);
         }
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (1, 1, 1, 1);
      }

      return array;
   },
});

Object .defineProperties (Color,
{
   ... X3DNode .getStaticProperties ("Color", "Rendering", 1, "color", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",    new Fields .MFColor ()),
      ]),
      enumerable: true,
   },
});

export default Color;
