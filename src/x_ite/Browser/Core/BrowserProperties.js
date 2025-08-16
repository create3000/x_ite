import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DBaseNode          from "../../Base/X3DBaseNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

// https://www.web3d.org/documents/specifications/19775-2/V3.3/Part02/servRef.html#getBrowserProperties

function BrowserProperties (executionContext)
{
   X3DBaseNode .call (this, executionContext);
}

Object .setPrototypeOf (BrowserProperties .prototype, X3DBaseNode .prototype);

Object .defineProperties (BrowserProperties,
{
   typeName:
   {
      value: "BrowserProperties",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ABSTRACT_NODES",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "CONCRETE_NODES",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "EXTERNAL_INTERACTIONS", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "PROTOTYPE_CREATE",      new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "DOM_IMPORT",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "XML_ENCODING",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "CLASSIC_VRML_ENCODING", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "BINARY_ENCODING",       new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BrowserProperties;
