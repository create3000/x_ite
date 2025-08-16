import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DPointGeometryNode from "../Rendering/X3DPointGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Disk2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Disk2D);

   // Units

   this ._innerRadius .setUnit ("length");
   this ._outerRadius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Disk2D .prototype, X3DGeometryNode .prototype),
   X3DLineGeometryNode .prototype,
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getDisk2DOptions ());
   },
   build ()
   {
      const
         browser     = this .getBrowser (),
         gl          = browser .getContext (),
         options     = browser .getDisk2DOptions (),
         innerRadius = Math .min (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ())),
         outerRadius = Math .max (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ())),
         vertexArray = this .getVertices ();

      if (innerRadius === outerRadius)
      {
         // Point

         if (outerRadius === 0)
         {
            vertexArray .push (0, 0, 0, 1);

            this .getMin () .set (0);
            this .getMax () .set (0);

            this .setGeometryType (0);
            this .setPrimitiveMode (gl .POINTS);
            this .setTransparent (true);
            this .setSolid (false);
            this .setBase (X3DPointGeometryNode);
            return;
         }

         // Circle

         const
            options  = this .getBrowser () .getCircle2DOptions (),
            geometry = options .getGeometry ();

         if (outerRadius === 1)
         {
            vertexArray .assign (geometry .getVertices ());
         }
         else
         {
            const defaultVertices = geometry .getVertices ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
               vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
         }

         this .getMin () .set (-outerRadius, -outerRadius, 0);
         this .getMax () .set ( outerRadius,  outerRadius, 0);

         this .setGeometryType (1);
         this .setPrimitiveMode (gl .LINES);
         this .setTransparent (false);
         this .setSolid (false);
         this .setBase (X3DLineGeometryNode);
         return;
      }

      if (innerRadius === 0)
      {
         // Disk

         this .getMultiTexCoords () .push (options .getDiskTexCoords ());
         this .getNormals () .assign (options .getDiskNormals ());

         if (outerRadius === 1)
         {
            vertexArray .assign (options .getDiskVertices ());
         }
         else
         {
            const defaultVertices = options .getDiskVertices () .getValue ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
               vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
         }

         this .getMin () .set (-outerRadius, -outerRadius, 0);
         this .getMax () .set ( outerRadius,  outerRadius, 0);

         this .setGeometryType (2);
         this .setPrimitiveMode (gl .TRIANGLES);
         this .setTransparent (false);
         this .setSolid (this ._solid .getValue ());
         this .setBase (X3DGeometryNode);
         return;
      }

      // Disk with hole

      const
         scale            = innerRadius / outerRadius,
         offset           = (1 - scale) / 2,
         defaultTexCoords = options .getDiskTexCoords () .getValue (),
         defaultVertices  = options .getDiskVertices () .getValue (),
         texCoordArray    = this .getTexCoords (),
         normalArray      = this .getNormals ();

      this .getMultiTexCoords () .push (texCoordArray);

      for (let i = 0, length = defaultVertices .length; i < length; i += 12)
      {
         texCoordArray .push (defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                              defaultTexCoords [i + 4], defaultTexCoords [i + 5], 0, 1,
                              defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,

                              defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                              defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,
                              defaultTexCoords [i + 8] * scale + offset, defaultTexCoords [i + 9] * scale + offset, 0, 1);

         normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1,
                            0, 0, 1,  0, 0, 1,  0, 0, 1);

         vertexArray .push (defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                            defaultVertices [i + 4] * outerRadius, defaultVertices [i + 5] * outerRadius, 0, 1,
                            defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,

                            defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                            defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,
                            defaultVertices [i + 8] * innerRadius, defaultVertices [i + 9] * innerRadius, 0, 1);
      }

      this .getMin () .set (-outerRadius, -outerRadius, 0);
      this .getMax () .set ( outerRadius,  outerRadius, 0);

      this .setGeometryType (2);
      this .setPrimitiveMode (gl .TRIANGLES);
      this .setTransparent (false);
      this .setSolid (this ._solid .getValue ());
      this .setBase (X3DGeometryNode);
   },
   setBase (base)
   {
      this .intersectsLine         = base .prototype .intersectsLine;
      this .intersectsBox          = base .prototype .intersectsBox;
      this .generateTexCoords      = base .prototype .generateTexCoords;
      this .displaySimple          = base .prototype .displaySimple;
      this .display                = base .prototype .display;
      this .displaySimpleInstanced = base .prototype .displaySimpleInstanced;
      this .displayInstanced       = base .prototype .displayInstanced;
   },
   updateRenderFunctions ()
   { },
});

Object .defineProperties (Disk2D,
{
   ... X3DNode .getStaticProperties ("Disk2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "innerRadius", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "outerRadius", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",       new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default Disk2D;
