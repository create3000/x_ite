import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Circle2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Circle2D);

   // Units

   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Circle2D .prototype, X3DLineGeometryNode .prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getCircle2DOptions ());
   },
   build ()
   {
      const
         options     = this .getBrowser () .getCircle2DOptions (),
         geometry    = options .getGeometry (),
         vertexArray = this .getVertices (),
         radius      = this ._radius .getValue ();

      if (radius === 1)
      {
         vertexArray .assign (geometry .getVertices ());
      }
      else
      {
         const defaultVertices = geometry .getVertices ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
            vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Circle2D,
{
   ... X3DNode .getStaticProperties ("Circle2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
      ]),
      enumerable: true,
   },
});

export default Circle2D;
