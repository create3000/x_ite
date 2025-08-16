import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DTextureCoordinateNode from "./X3DTextureCoordinateNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";

function MultiTextureCoordinate (executionContext)
{
   X3DTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .MultiTextureCoordinate);

   const browser = this .getBrowser ();

   this .maxTexCoords           = browser .getMaxTexCoords ();
   this .textureCoordinateNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MultiTextureCoordinate .prototype, X3DTextureCoordinateNode .prototype),
{
   initialize ()
   {
      X3DTextureCoordinateNode .prototype .initialize .call (this);

      this ._texCoord .addInterest ("set_texCoord__", this);

      this .set_texCoord__ ();
   },
   set_texCoord__ ()
   {
      const textureCoordinateNodes = this .textureCoordinateNodes;

      for (const textureCoordinateNode of textureCoordinateNodes)
         textureCoordinateNode .removeInterest ("addNodeEvent", this);

      textureCoordinateNodes .length = 0;

      for (const node of this ._texCoord)
      {
         const textureCoordinateNode = X3DCast (X3DConstants .X3DSingleTextureCoordinateNode, node);

         if (textureCoordinateNode)
            textureCoordinateNodes .push (textureCoordinateNode);
      }

      for (const textureCoordinateNode of textureCoordinateNodes)
         textureCoordinateNode .addInterest ("addNodeEvent", this);
   },
   getCount ()
   {
      return Math .min (this .maxTexCoords, this .textureCoordinateNodes .length);
   },
   init (multiArray)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .init (multiArray);
   },
   addPoint (index, multiArray)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .addPointToChannel (index, multiArray [i]);
   },
   addPoints (array)
   {
      for (const textureCoordinateNode of this .textureCoordinateNodes)
         return textureCoordinateNode .addPoints (array);

      return array;
   },
   getTextureCoordinates ()
   {
      return this .textureCoordinateNodes;
   },
   getTextureCoordinateMapping (textureCoordinateMapping)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .getTextureCoordinateMapping (textureCoordinateMapping, i);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      if (length)
      {
         for (let i = 0; i < length; ++ i)
            textureCoordinateNodes [i] .setShaderUniforms (gl, shaderObject, i);
      }
      else
      {
         this .getBrowser () .getDefaultTextureCoordinate () .setShaderUniforms (gl, shaderObject, 0);
      }
   },
});

Object .defineProperties (MultiTextureCoordinate,
{
   ... X3DNode .getStaticProperties ("MultiTextureCoordinate", "Texturing", 2, "texCoord", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texCoord", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MultiTextureCoordinate;
