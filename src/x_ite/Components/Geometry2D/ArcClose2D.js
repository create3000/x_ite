import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Complex              from "../../../standard/Math/Numbers/Complex.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ArcClose2D (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .ArcClose2D);

   this .setGeometryType (2);

   // Units

   this ._startAngle .setUnit ("angle");
   this ._endAngle   .setUnit ("angle");
   this ._radius     .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ArcClose2D .prototype, X3DGeometryNode .prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getArcClose2DOptions ());
   },
   getSweepAngle ()
   {
      const
         start = Algorithm .interval (this ._startAngle .getValue (), 0, Math .PI * 2),
         end   = Algorithm .interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

      if (start === end)
         return Math .PI * 2;

      const sweepAngle = Math .abs (end - start);

      if (start > end)
         return (Math .PI * 2) - sweepAngle;

      if (! isNaN (sweepAngle))
         return sweepAngle;

      // We must test for NAN, as NAN to int is undefined.
      return 0;
   },
   build: (() =>
   {
      const half = new Complex (0.5, 0.5);

      return function ()
      {
         const
            options       = this .getBrowser () .getArcClose2DOptions (),
            chord         = this ._closureType .getValue () === "CHORD",
            dimension     = options ._dimension .getValue (),
            startAngle    = this ._startAngle .getValue  (),
            radius        = Math .abs (this ._radius .getValue ()),
            sweepAngle    = this .getSweepAngle (),
            steps         = Math .max (4, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
            texCoordArray = this .getTexCoords (),
            normalArray   = this .getNormals (),
            vertexArray   = this .getVertices (),
            texCoords     = [ ],
            points        = [ ];

         this .getMultiTexCoords () .push (texCoordArray);

         const steps_1 = steps - 1;

         for (let n = 0; n < steps; ++ n)
         {
            const
               t     = n / steps_1,
               theta = startAngle + (sweepAngle * t);

            texCoords .push (Complex .Polar (0.5, theta) .add (half));
            points    .push (Complex .Polar (radius, theta));
         }

         if (chord)
         {
            const
               t0 = texCoords [0],
               p0 = points [0];

            for (let i = 1; i < steps_1; ++ i)
            {
               const
                  t1 = texCoords [i],
                  t2 = texCoords [i + 1],
                  p1 = points [i],
                  p2 = points [i + 1];

               texCoordArray .push (t0 .real, t0 .imag, 0, 1,
                                    t1 .real, t1 .imag, 0, 1,
                                    t2 .real, t2 .imag, 0, 1);

               normalArray .push (0, 0, 1,
                                  0, 0, 1,
                                  0, 0, 1);

               vertexArray .push (p0 .real, p0 .imag, 0, 1,
                                  p1 .real, p1 .imag, 0, 1,
                                  p2 .real, p2 .imag, 0, 1);
            }
         }
         else
         {
            for (let i = 0; i < steps_1; ++ i)
            {
               const
                  t1 = texCoords [i],
                  t2 = texCoords [i + 1],
                  p1 = points [i],
                  p2 = points [i + 1];

               texCoordArray .push (0.5, 0.5, 0, 1,
                                    t1 .real, t1 .imag, 0, 1,
                                    t2 .real, t2 .imag, 0, 1);

               normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

               vertexArray .push (0, 0, 0, 1,
                                  p1 .real, p1 .imag, 0, 1,
                                  p2 .real, p2 .imag, 0, 1);
            }
         }

         this .getMin () .set (-radius, -radius, 0);
         this .getMax () .set ( radius,  radius, 0);

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (ArcClose2D,
{
   ... X3DNode .getStaticProperties ("ArcClose2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closureType", new Fields .SFString ("PIE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "startAngle",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endAngle",    new Fields .SFFloat (1.570796)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",      new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",       new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default ArcClose2D;
