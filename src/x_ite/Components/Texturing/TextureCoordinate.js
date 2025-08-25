import Fields                         from "../../Fields.js";
import X3DFieldDefinition             from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray           from "../../Base/FieldDefinitionArray.js";
import X3DNode                        from "../Core/X3DNode.js";
import X3DSingleTextureCoordinateNode from "./X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";
import Vector2                        from "../../../standard/Math/Numbers/Vector2.js";

function TextureCoordinate (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinate);
}

Object .assign (Object .setPrototypeOf (TextureCoordinate .prototype, X3DSingleTextureCoordinateNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureCoordinateNode .prototype .initialize .call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__ ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   getSize ()
   {
      return this .length;
   },
   get1Point (index, result)
   {
      if (index < this .length)
      {
         const point = this .point;

         index *= 2;

         return result .set (point [index], point [index + 1], 0, 1);
      }
      else
      {
         return result .set (0, 0, 0, 1);
      }
   },
   set1Point: (() =>
   {
      const point = new Vector2 ();

      return function (index, { x, y, w })
      {
         this ._point [index] = point .set (x, y) .divide (w);
      };
   })(),
   addPointToChannel (index, array)
   {
      if (index >= 0 && this .length)
      {
         const
            point = this .point,
            i      = (index % this .length) * 2;

         array .push (point [i], point [i + 1], 0, 1);
      }
      else
      {
         array .push (0, 0, 0, 1);
      }
   },
   addPoints (array)
   {
      const
         point  = this .point,
         length = this .length;

      for (let i = 0, p = 0; i < length; ++ i, p += 2)
         array .push (point [p], point [p + 1], 0, 1);

      return array;
   },
});

Object .defineProperties (TextureCoordinate,
{
   ... X3DNode .getStaticProperties ("TextureCoordinate", "Texturing", 1, "texCoord", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default TextureCoordinate;
