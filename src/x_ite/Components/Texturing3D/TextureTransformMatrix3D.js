import Fields                        from "../../Fields.js";
import X3DFieldDefinition            from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray          from "../../Base/FieldDefinitionArray.js";
import X3DNode                       from "../Core/X3DNode.js";
import X3DSingleTextureTransformNode from "../Texturing/X3DSingleTextureTransformNode.js";
import X3DConstants                  from "../../Base/X3DConstants.js";

function TextureTransformMatrix3D (executionContext)
{
   X3DSingleTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .TextureTransformMatrix3D);
}

Object .assign (Object .setPrototypeOf (TextureTransformMatrix3D .prototype, X3DSingleTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureTransformNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed ()
   {
      this .setMatrix (this ._matrix .getValue ());
   },
});

Object .defineProperties (TextureTransformMatrix3D,
{
   ... X3DNode .getStaticProperties ("TextureTransformMatrix3D", "Texturing3D", 1, "textureTransform", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "matrix",   new Fields .SFMatrix4f ()),
      ]),
      enumerable: true,
   },
});

export default TextureTransformMatrix3D;
