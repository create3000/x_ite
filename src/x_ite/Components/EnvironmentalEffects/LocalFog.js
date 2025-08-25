import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DFogObject         from "./X3DFogObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LocalFog (executionContext)
{
   X3DChildNode .call (this, executionContext);
   X3DFogObject .call (this, executionContext);

   this .addType (X3DConstants .LocalFog);
}

Object .assign (Object .setPrototypeOf (LocalFog .prototype, X3DChildNode .prototype),
   X3DFogObject .prototype,
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);
      X3DFogObject .prototype .initialize .call (this);
   },
   push (renderObject)
   {
      if (this ._enabled .getValue () && this .getFogType ())
      {
         const fogContainer = this .getFogs () .pop ();

         fogContainer .set (this, renderObject .getModelViewMatrix () .get ());

         renderObject .getLocalFogs () .push (fogContainer);
      }
   },
   pop (renderObject)
   {
      if (this ._enabled .getValue () && this .getFogType ())
         this .getBrowser () .getLocalObjects () .push (renderObject .getLocalFogs () .pop ());
   },
   dispose ()
   {
      X3DFogObject .prototype .dispose .call (this);
      X3DChildNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (LocalFog,
{
   ... X3DNode .getStaticProperties ("LocalFog", "EnvironmentalEffects", 4, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fogType",         new Fields .SFString ("LINEAR")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",           new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityStart", new Fields .SFFloat ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityRange", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default LocalFog;
