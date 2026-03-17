import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function RenderedTexture (executionContext)
{
   X3DTexture2DNode .call (this, executionContext);

   this .addType (X3DConstants .RenderedTexture);

   this .addChildObjects (X3DConstants .outputOnly, "loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));
}

Object .assign (Object .setPrototypeOf (RenderedTexture .prototype, X3DTexture2DNode .prototype),
{
   initialize ()
   {
      X3DTexture2DNode .prototype .initialize .call (this);
   },
   getTextureType ()
   {
      return 2;
   },
   checkLoadState ()
   {
      return this ._loadState .getValue ();
   },
});

Object .defineProperties (RenderedTexture,
{
   ... X3DNode .getStaticProperties ("RenderedTexture", "Texturing", 4, "texture", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "update",            new Fields .SFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",        new Fields .MFInt32 (128, 128, 4, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "depthMap",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoint",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default RenderedTexture;
