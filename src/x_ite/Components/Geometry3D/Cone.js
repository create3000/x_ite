import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

function Cone (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Cone);

   // Units

   this ._height       .setUnit ("length");
   this ._bottomRadius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Cone .prototype, X3DGeometryNode .prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getConeOptions ());
   },
   build ()
   {
      const
         options       = this .getBrowser () .getConeOptions (),
         height        = Math .abs (this ._height .getValue ()),
         height1_2     = height / 2,
         bottomRadius  = Math .abs (this ._bottomRadius .getValue ()),
         texCoordArray = this .getTexCoords (),
         normalArray   = this .getNormals (),
         vertexArray   = this .getVertices ();

      this .getMultiTexCoords () .push (texCoordArray);

      if (this ._side .getValue ())
      {
         const
            geometry        = options .getSideGeometry (),
            defaultNormals  = geometry .getNormals (),
            defaultVertices = geometry .getVertices (),
            v1              = new Vector3 (),
            rz              = new Rotation4 (1, 0, 0, -Math .atan (bottomRadius / height)),
            rx              = new Rotation4 ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (let i = 0, length = defaultNormals .length; i < length; i += 3)
         {
            v1 .set (defaultNormals [i], 0, defaultNormals [i + 2]),
            rx .setFromToVec (Vector3 .zAxis, v1) .multLeft (rz) .multVecRot (v1 .set (0, 0, 1));

            normalArray .push (... v1);
         }

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      if (this ._bottom .getValue ())
      {
         const
            geometry        = options .getBottomGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      this .setSolid (this ._solid .getValue ());
      this .setExtents ();
   },
   setExtents ()
   {
      const
         bottomRadius = this ._bottomRadius .getValue (),
         y1           = this ._height .getValue () / 2,
         y2           = -y1;

      if (!this ._side .getValue () && !this ._bottom .getValue ())
      {
         this .getMin () .set (0);
         this .getMax () .set (0);
      }
      else if (!this ._side .getValue ())
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y2,  bottomRadius);
      }
      else
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y1, bottomRadius);
      }
   },
});

Object .defineProperties (Cone,
{
   ... X3DNode .getStaticProperties ("Cone", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "side",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bottom",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "height",       new Fields .SFFloat (2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bottomRadius", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default Cone;
