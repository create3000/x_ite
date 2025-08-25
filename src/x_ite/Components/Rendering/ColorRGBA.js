import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DColorNode         from "./X3DColorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function ColorRGBA (executionContext)
{
   X3DColorNode .call (this, executionContext);

   this .addType (X3DConstants .ColorRGBA);

   this .setTransparent (true);
}

Object .assign (Object .setPrototypeOf (ColorRGBA .prototype, X3DColorNode .prototype),
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
            i     = (index % this .length) * 4;

         return array .push (color [i], color [i + 1], color [i + 2], color [i + 3]);
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
            const i = (index % length) * 4;

            array .push (color [i], color [i + 1], color [i + 2], color [i + 3]);
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

Object .defineProperties (ColorRGBA,
{
   ... X3DNode .getStaticProperties ("ColorRGBA", "Rendering", 1, "color", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",    new Fields .MFColorRGBA ()),
      ]),
      enumerable: true,
   },
});

export default ColorRGBA;
