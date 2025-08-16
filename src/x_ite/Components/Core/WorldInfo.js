import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInfoNode          from "./X3DInfoNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function WorldInfo (executionContext)
{
   X3DInfoNode .call (this, executionContext);

   this .addType (X3DConstants .WorldInfo);
}

Object .assign (Object .setPrototypeOf (WorldInfo .prototype, X3DInfoNode .prototype),
{
   initialize ()
   {
      X3DInfoNode .prototype .initialize .call (this);

      if (this .isLive ())
         this .getExecutionContext () .addWorldInfo (this);
   },
   setLive (value)
   {
      if (!!value .valueOf () === this .isLive ())
         return;

      X3DInfoNode .prototype .setLive .call (this, value);

      if (this .isLive ())
         this .getExecutionContext () .addWorldInfo (this);
      else
         this .getExecutionContext () .removeWorldInfo (this);
   },
});

Object .defineProperties (WorldInfo,
{
   ... X3DNode .getStaticProperties ("WorldInfo", "Core", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "title",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "info",     new Fields .MFString ()),
      ]),
      enumerable: true,
   },
});

export default WorldInfo;
