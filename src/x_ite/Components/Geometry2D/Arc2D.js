import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Complex              from "../../../standard/Math/Numbers/Complex.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function Arc2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Arc2D);

   // Units

   this ._startAngle .setUnit ("angle");
   this ._endAngle   .setUnit ("angle");
   this ._radius     .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Arc2D .prototype, X3DLineGeometryNode .prototype),
{
   set_live__ ()
   {
      this .connectOptions (this .getBrowser () .getArc2DOptions ());
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
   build ()
   {
      const
         options     = this .getBrowser () .getArc2DOptions (),
         dimension   = options ._dimension .getValue (),
         startAngle  = this ._startAngle .getValue  (),
         radius      = Math .abs (this ._radius .getValue ()),
         sweepAngle  = this .getSweepAngle (),
         steps       = Math .max (3, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
         vertexArray = this .getVertices ();

      for (let n = 0; n < steps; ++ n)
      {
         const
            t1     = n / steps,
            theta1 = startAngle + (sweepAngle * t1),
            point1 = Complex .Polar (radius, theta1),
            t2     = (n + 1) / steps,
            theta2 = startAngle + (sweepAngle * t2),
            point2 = Complex .Polar (radius, theta2);

         vertexArray .push (point1 .real, point1 .imag, 0, 1);
         vertexArray .push (point2 .real, point2 .imag, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Arc2D,
{
   ... X3DNode .getStaticProperties ("Arc2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "startAngle", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endAngle",   new Fields .SFFloat (1.570796)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",     new Fields .SFFloat (1)),
      ]),
      enumerable: true,
   },
});

export default Arc2D;
