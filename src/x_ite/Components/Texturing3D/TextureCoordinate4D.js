import Fields                         from "../../Fields.js";
import X3DFieldDefinition             from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray           from "../../Base/FieldDefinitionArray.js";
import X3DNode                        from "../Core/X3DNode.js";
import X3DSingleTextureCoordinateNode from "../Texturing/X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";

function TextureCoordinate4D (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinate4D);
}

Object .assign (Object .setPrototypeOf (TextureCoordinate4D .prototype, X3DSingleTextureCoordinateNode .prototype),
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

         index *= 4;

         return result .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else
      {
         return result .set (0, 0, 0, 1);
      }
   },
   set1Point (index, point)
   {
      this ._point [index] = point;
   },
   addPointToChannel (index, array)
   {
      if (index >= 0 && this .length)
      {
         const
            point = this .point,
            i     = (index % this .length) * 4;

         array .push (point [i], point [i + 1], point [i + 2], point [i + 3]);
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

      for (let i = 0, p = 0; i < length; ++ i, p += 4)
         array .push (point [p], point [p + 1], point [p + 2], point [p + 3]);

      return array;
   },
});

Object .defineProperties (TextureCoordinate4D,
{
   ... X3DNode .getStaticProperties ("TextureCoordinate4D", "Texturing3D", 1, "texCoord", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec4f ()),
      ]),
      enumerable: true,
   },
});

export default TextureCoordinate4D;
