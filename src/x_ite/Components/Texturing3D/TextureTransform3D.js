import Fields                        from "../../Fields.js";
import X3DFieldDefinition            from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray          from "../../Base/FieldDefinitionArray.js";
import X3DNode                       from "../Core/X3DNode.js";
import X3DSingleTextureTransformNode from "../Texturing/X3DSingleTextureTransformNode.js";
import X3DConstants                  from "../../Base/X3DConstants.js";
import Vector3                       from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4                     from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                       from "../../../standard/Math/Numbers/Matrix4.js";

function TextureTransform3D (executionContext)
{
   X3DSingleTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .TextureTransform3D);

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (TextureTransform3D .prototype, X3DSingleTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureTransformNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const vector = new Vector3 ();

      return function ()
      {
         const
            translation = this ._translation .getValue (),
            rotation    = this ._rotation .getValue (),
            scale       = this ._scale .getValue (),
            center      = this ._center .getValue (),
            matrix4     = this .matrix;

         matrix4 .identity ();

         if (!center .equals (Vector3 .Zero))
            matrix4 .translate (vector .assign (center) .negate ());

         if (!scale .equals (Vector3 .One))
            matrix4 .scale (scale);

         if (!rotation .equals (Rotation4 .Identity))
            matrix4 .rotate (rotation);

         if (!center .equals (Vector3 .Zero))
            matrix4 .translate (center);

         if (!translation .equals (Vector3 .Zero))
            matrix4 .translate (translation);

         this .setMatrix (matrix4);
      };
   })(),
});

Object .defineProperties (TextureTransform3D,
{
   ... X3DNode .getStaticProperties ("TextureTransform3D", "Texturing3D", 1, "textureTransform", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default TextureTransform3D;
