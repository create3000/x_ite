import Fields            from "../../Fields.js";
import X3DConstants      from "../../Base/X3DConstants.js";
import X3DBaseNode       from "../../Base/X3DBaseNode.js";
import IndexedFaceSet    from "../../Components/Geometry3D/IndexedFaceSet.js";
import Coordinate        from "../../Components/Rendering/Coordinate.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";
import Complex           from "../../../standard/Math/Numbers/Complex.js";
import Vector2           from "../../../standard/Math/Numbers/Vector2.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";

function QuadSphereOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "xDimension", new Fields .SFInt32 (32),
                          X3DConstants .inputOutput, "yDimension", new Fields .SFInt32 (15))
}

Object .assign (Object .setPrototypeOf (QuadSphereOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getGeometry ()
   {
      if (!this .geometry)
         this .build ();

      return this .geometry;
   },
   createTexCoordIndex ()
   {
      const
         xDimension    = this ._xDimension .getValue () + 1,
         yDimension    = this ._yDimension .getValue (),
         texCoordIndex = this .geometry ._texCoordIndex;

      // North pole

      for (let u = 0, uLength = xDimension - 1; u < uLength; ++ u)
      {
         texCoordIndex .push (u);
         texCoordIndex .push (u + xDimension - 1);
         texCoordIndex .push (u + xDimension);
         texCoordIndex .push (-1);
      }

      // Sphere segments

      for (let p = xDimension - 1, v = 0, vLength = yDimension - 3; v < vLength; ++ v, ++ p)
      {
         for (let u = 0, uLength = xDimension - 1; u < uLength; ++ u, ++ p)
         {
            texCoordIndex .push (p);
            texCoordIndex .push (p + xDimension);
            texCoordIndex .push (p + xDimension + 1);
            texCoordIndex .push (p + 1);
            texCoordIndex .push (-1);
         }
      }

      // South pole

      let p = (yDimension - 2) * xDimension - 1;

      for (let u = 0, uLength = xDimension - 1; u < uLength; ++ u, ++ p)
      {
         texCoordIndex .push (p + xDimension);
         texCoordIndex .push (p + 1);
         texCoordIndex .push (p);
         texCoordIndex .push (-1);
      }
   },
   createTexCoord ()
   {
      const
         xDimension = this ._xDimension .getValue () + 1,
         yDimension = this ._yDimension .getValue (),
         point      = this .geometry ._texCoord .getValue () ._point;

      const poleOffset = -0.5 / (xDimension - 1);

      // North pole

      for (let u = 1; u < xDimension; ++ u)
      {
         const x = u / (xDimension - 1) + poleOffset;

         point .push (new Vector2 (x, 1));
      }

      // Sphere segments

      for (let v = 1, vLength = yDimension - 1; v < vLength; ++ v)
      {
         const y = 1 - v / (yDimension - 1);

         for (let u = 0; u < xDimension; ++ u)
         {
            const x = u / (xDimension - 1);

            point .push (new Vector2 (x, y));
         }
      }

      // South pole

      for (let u = 1; u < xDimension; ++ u)
      {
         const x = u / (xDimension - 1) + poleOffset;

         point .push (new Vector2 (x, 0));
      }
   },
   createCoordIndex ()
   {
      const
         xDimension = this ._xDimension .getValue () + 1,
         yDimension = this ._yDimension .getValue (),
         coordIndex = this .geometry ._coordIndex;

      // North pole

      let u = 1;

      for (const uLength = xDimension - 1; u < uLength; ++ u)
      {
         coordIndex .push (0);
         coordIndex .push (u);
         coordIndex .push (u + 1);
         coordIndex .push (-1);
      }

      coordIndex .push (0);
      coordIndex .push (u);
      coordIndex .push (1);
      coordIndex .push (-1);

      // Sphere segments

      let p = 1;

      for (let v = 0, vLength = yDimension - 3; v < vLength; ++ v, ++ p)
      {
         for (let u = 0, uLength = xDimension - 2; u < uLength; ++ u, ++ p)
         {
            coordIndex .push (p);
            coordIndex .push (p + xDimension - 1);
            coordIndex .push (p + xDimension);
            coordIndex .push (p + 1);
            coordIndex .push (-1);
         }

         coordIndex .push (p);
         coordIndex .push (p + xDimension - 1);
         coordIndex .push (p + 1);
         coordIndex .push (p - xDimension + 2);
         coordIndex .push (-1);
      }

      // South pole

      const last = p + xDimension - 1;

      for (let u = 0, uLength = xDimension - 2; u < uLength; ++ u, ++ p)
      {
         coordIndex .push (last);
         coordIndex .push (p + 1);
         coordIndex .push (p);
         coordIndex .push (-1);
      }

      coordIndex .push (last);
      coordIndex .push (last - xDimension + 1);
      coordIndex .push (p);
      coordIndex .push (-1);
   },
   createPoints ()
   {
      const
         xDimension = this ._xDimension .getValue () + 1,
         yDimension = this ._yDimension .getValue (),
         point      = this .geometry ._coord .getValue () ._point;

      // North pole
      point .push (new Vector3 (0, 1, 0));

      // Sphere segments
      for (let v = 1, vLength = yDimension - 1; v < vLength; ++ v)
      {
         const zPlane = Complex .Polar (1, -Math .PI * v / vLength);

         for (let u = 0, uLength = xDimension - 1; u < uLength; ++ u)
         {
            const yPlane = Complex .Polar (zPlane .imag, 2 * Math .PI * u / uLength);

            point .push (new Vector3 (yPlane .imag, zPlane .real, yPlane .real));
         }
      }

      // South pole
      point .push (new Vector3 (0, -1, 0));
   },
   build ()
   {
      this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .geometry ._texCoord = new TextureCoordinate (this .getExecutionContext ());
      this .geometry ._coord    = new Coordinate (this .getExecutionContext ());

      this .createTexCoordIndex ();
      this .createTexCoord ();
      this .createCoordIndex ();
      this .createPoints ();

      const
         geometry = this .geometry,
         texCoord = this .geometry ._texCoord .getValue (),
         coord    = this .geometry ._coord .getValue ();

      geometry ._creaseAngle = Math .PI;

      texCoord .setup ();
      coord    .setup ();
      geometry .setup ();
   },
   eventsProcessed ()
   {
      this .geometry = null;
   },
});

Object .defineProperties (QuadSphereOptions,
{
   typeName:
   {
      value: "QuadSphereOptions",
      enumerable: true,
   },
});

export default QuadSphereOptions;
