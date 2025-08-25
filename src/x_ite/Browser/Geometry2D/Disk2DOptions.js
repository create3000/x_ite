import Fields          from "../../Fields.js";
import X3DBaseNode     from "../../Base/X3DBaseNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import X3DGeometryNode from "../../Components/Rendering/X3DGeometryNode.js";
import Complex         from "../../../standard/Math/Numbers/Complex.js";

function Disk2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))

   this .diskTexCoords = X3DGeometryNode .createArray ();
   this .diskNormals   = X3DGeometryNode .createArray ();
   this .diskVertices  = X3DGeometryNode .createArray ();
}

Object .assign (Object .setPrototypeOf (Disk2DOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getDiskTexCoords ()
   {
      if (!this .diskTexCoords .length)
         this .build ();

      return this .diskTexCoords;
   },
   getDiskNormals ()
   {
      if (!this .diskNormals .length)
         this .build ();

      return this .diskNormals;
   },
   getDiskVertices ()
   {
      if (!this .diskVertices .length)
         this .build ();

      return this .diskVertices;
   },
   build: (() =>
   {
      const
         half      = new Complex (0.5, 0.5),
         texCoord1 = new Complex (),
         texCoord2 = new Complex (),
         point1    = new Complex (),
         point2    = new Complex ();

      return function ()
      {
         const
            dimension     = this ._dimension .getValue (),
            angle         = Math .PI * 2 / dimension,
            diskTexCoords = this .diskTexCoords,
            diskNormals   = this .diskNormals,
            diskVertices  = this .diskVertices;

         for (let n = 0; n < dimension; ++ n)
         {
            const
               theta1 = angle * n,
               theta2 = angle * (n + 1);

            texCoord1 .setPolar (0.5, theta1) .add (half);
            texCoord2 .setPolar (0.5, theta2) .add (half);
            point1    .setPolar (1, theta1);
            point2    .setPolar (1, theta2);

            // Disk

            diskTexCoords .push (0.5, 0.5, 0, 1,
                                 texCoord1 .real, texCoord1 .imag, 0, 1,
                                 texCoord2 .real, texCoord2 .imag, 0, 1);

            diskNormals .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

            diskVertices .push (0, 0, 0, 1,
                                point1 .real, point1 .imag, 0, 1,
                                point2 .real, point2 .imag, 0, 1);
         }

         diskTexCoords  .shrinkToFit ();
         diskNormals    .shrinkToFit ();
         diskVertices   .shrinkToFit ();
      };
   })(),
   eventsProcessed ()
   {
      this .diskTexCoords .length = 0;
      this .diskNormals   .length = 0;
      this .diskVertices  .length = 0;
   },
});

Object .defineProperties (Disk2DOptions,
{
   typeName:
   {
      value: "Disk2DOptions",
      enumerable: true,
   },
});

export default Disk2DOptions;
