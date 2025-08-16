import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DShapeNode         from "./X3DShapeNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Shape (executionContext)
{
   X3DShapeNode .call (this, executionContext);

   this .addType (X3DConstants .Shape);
}

Object .assign (Object .setPrototypeOf (Shape .prototype, X3DShapeNode .prototype),
{
   getShapeKey ()
   {
      return 0;
   },
   getNumInstances ()
   {
      return 1;
   },
   intersectsBox (box, clipPlanes, modelViewMatrix)
   {
      return this .getGeometry () .intersectsBox (box, clipPlanes, modelViewMatrix);
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      this .getGeometry () .displaySimple (gl, renderContext, shaderNode);
   },
   display (gl, renderContext)
   {
      this .getGeometry () .display (gl, renderContext);
   },
});

Object .defineProperties (Shape,
{
   ... X3DNode .getStaticProperties ("Shape", "Shape", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents", new Fields .SFBool (true)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Shape;
