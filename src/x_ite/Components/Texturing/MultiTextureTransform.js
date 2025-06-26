import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureTransformNode from "./X3DTextureTransformNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import X3DCast                 from "../../Base/X3DCast.js";

function MultiTextureTransform (executionContext)
{
   X3DTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .MultiTextureTransform);

   const browser = this .getBrowser ();

   this .maxTextureTransforms  = browser .getMaxTextureTransforms ();
   this .textureTransformNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MultiTextureTransform .prototype, X3DTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DTextureTransformNode .prototype .initialize .call (this);

      this ._textureTransform .addInterest ("set_textureTransform__", this);

      this .set_textureTransform__ ();
   },
   set_textureTransform__ ()
   {
      const textureTransformNodes = this .textureTransformNodes;

      textureTransformNodes .length = 0;

      for (const node of this ._textureTransform)
      {
         const textureTransformNode = X3DCast (X3DConstants .X3DSingleTextureTransformNode, node);

         if (textureTransformNode)
            textureTransformNodes .push (textureTransformNode);
      }

      if (!textureTransformNodes .length)
         textureTransformNodes .push (this .getBrowser () .getDefaultTextureTransform ());
   },
   getCount ()
   {
      return Math .min (this .maxTextureTransforms, this .textureTransformNodes .length);
   },
   getTextureTransformMapping (textureTransformMapping)
   {
      const
         textureTransformNodes = this .textureTransformNodes,
         length                = Math .min (this .maxTextureTransforms, textureTransformNodes .length);

      for (let i = 0; i < length; ++ i)
         textureTransformNodes [i] .getTextureTransformMapping (textureTransformMapping, i);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         textureTransformNodes = this .textureTransformNodes,
         length                = Math .min (this .maxTextureTransforms, textureTransformNodes .length);

      for (let i = 0; i < length; ++ i)
         textureTransformNodes [i] .setShaderUniforms (gl, shaderObject, i);
   },
   transformPoint (texCoord)
   {
      return this .textureTransformNodes [0] .transformPoint (texCoord);
   },
});

Object .defineProperties (MultiTextureTransform,
{
   ... X3DNode .getStaticProperties ("MultiTextureTransform", "Texturing", 2, "textureTransform", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "textureTransform", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MultiTextureTransform;
