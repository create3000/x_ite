import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DBindableNode      from "../Core/X3DBindableNode.js";
import X3DFogObject         from "./X3DFogObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Fog (executionContext)
{
   X3DBindableNode .call (this, executionContext);
   X3DFogObject    .call (this, executionContext);

   this .addType (X3DConstants .Fog);

   this .modelMatrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Fog .prototype, X3DBindableNode .prototype),
   X3DFogObject .prototype,
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);
      X3DFogObject    .prototype .initialize .call (this);
   },
   getModelMatrix ()
   {
      return this .modelMatrix;
   },
   traverse (type, renderObject)
   {
      renderObject .getLayer () .getFogs () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
   },
   dispose ()
   {
      X3DFogObject    .prototype .dispose .call (this);
      X3DBindableNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (Fog,
{
   ... X3DNode .getStaticProperties ("Fog", "EnvironmentalEffects", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fogType",         new Fields .SFString ("LINEAR")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",           new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityStart", new Fields .SFFloat ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityRange", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",        new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default Fog;
