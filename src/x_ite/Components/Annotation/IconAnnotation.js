import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DAnnotationNode    from "./X3DAnnotationNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function IconAnnotation (executionContext)
{
   X3DAnnotationNode .call (this, executionContext);
   X3DUrlObject      .call (this, executionContext);

   this .addType (X3DConstants .IconAnnotation);
}

Object .assign (Object .setPrototypeOf (IconAnnotation .prototype, X3DAnnotationNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DAnnotationNode .prototype .initialize .call (this);
      X3DUrlObject      .prototype .initialize .call (this);
   },
   async requestImmediateLoad (cache = true)
   { },
   dispose ()
   {
      X3DUrlObject      .prototype .dispose .call (this);
      X3DAnnotationNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (IconAnnotation,
{
   ... X3DNode .getStaticProperties ("IconAnnotation", "Annotation", 1, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "annotationGroupID",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displayPolicy",        new Fields .SFString ("NEVER")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      enumerable: true,
   },
});

export default IconAnnotation;
