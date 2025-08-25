import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Sphere (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Sphere);

   // Units

   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Sphere .prototype, X3DGeometryNode .prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getSphereOptions ());
   },
   build ()
   {
      const
         options     = this .getBrowser () .getSphereOptions (),
         geometry    = options .getGeometry (),
         radius      = Math .abs (this ._radius .getValue ()),
         vertexArray = this .getVertices ();

      this .getMultiTexCoords () .push (... geometry .getMultiTexCoords ());
      this .getTangents () .assign (geometry .getTangents ());
      this .getNormals ()  .assign (geometry .getNormals ());

      if (radius === 1)
      {
         vertexArray .assign (geometry .getVertices ());
      }
      else
      {
         const defaultVertices = geometry .getVertices ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius * defaultVertices [i],
                               radius * defaultVertices [i + 1],
                               radius * defaultVertices [i + 2],
                               1);
         }
      }

      this .getMin () .set (-radius, -radius, -radius);
      this .getMax () .set ( radius,  radius,  radius);

      this .setSolid (this ._solid .getValue ());
   },
});

Object .defineProperties (Sphere,
{
   ... X3DNode .getStaticProperties ("Sphere", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default Sphere;
