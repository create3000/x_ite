import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";

function Rectangle2D (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Rectangle2D);

   this .setGeometryType (2);

   // Units

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Rectangle2D .prototype, X3DGeometryNode .prototype),
{
   build: (() =>
   {
      const defaultSize = new Vector2 (2);

      return function ()
      {
         const
            options     = this .getBrowser () .getRectangle2DOptions (),
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
               defaultVertices = geometry .getVertices ();

            for (let i = 0; i < defaultVertices .length; i += 4)
            {
               vertexArray .push (x * defaultVertices [i],
                                  y * defaultVertices [i + 1],
                                  0,
                                  1);
            }

            this .getMin () .set (-x, -y, 0);
            this .getMax () .set ( x,  y, 0);
         }

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (Rectangle2D,
{
   ... X3DNode .getStaticProperties ("Rectangle2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",     new Fields .SFVec2f (2, 2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default Rectangle2D;
