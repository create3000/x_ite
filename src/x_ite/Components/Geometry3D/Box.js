import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function Box (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Box);

   // Units

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Box .prototype, X3DGeometryNode .prototype),
{
   build: (() =>
   {
      const defaultSize = new Vector3 (2);

      return function ()
      {
         const
            options     = this .getBrowser () .getBoxOptions (),
            geometry    = options .getGeometry (),
            size        = this ._size .getValue (),
            vertexArray = this .getVertices ();

         this .getMultiTexCoords () .push (... geometry .getMultiTexCoords ());
         this .getTangents () .assign (geometry .getTangents ());
         this .getNormals ()  .assign (geometry .getNormals ());

         if (size .equals (defaultSize))
         {
            vertexArray .assign (geometry .getVertices ());

            this .getMin () .assign (geometry .getMin ());
            this .getMax () .assign (geometry .getMax ());
         }
         else
         {
            const
               x               = Math .abs (size .x / 2),
               y               = Math .abs (size .y / 2),
               z               = Math .abs (size .z / 2),
               defaultVertices = geometry .getVertices ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
            {
               vertexArray .push (x * defaultVertices [i],
                                  y * defaultVertices [i + 1],
                                  z * defaultVertices [i + 2],
                                  1);
            }

            this .getMin () .set (-x, -y, -z);
            this .getMax () .set ( x,  y,  z);
         }

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (Box,
{
   ... X3DNode .getStaticProperties ("Box", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",     new Fields .SFVec3f (2, 2, 2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default Box;
