import Fields         from "../../Fields.js";
import X3DBaseNode    from "../../Base/X3DBaseNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import IndexedLineSet from "../../Components/Rendering/IndexedLineSet.js";
import Coordinate     from "../../Components/Rendering/Coordinate.js";
import Complex        from "../../../standard/Math/Numbers/Complex.js";

function Circle2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))
}

Object .assign (Object .setPrototypeOf (Circle2DOptions .prototype, X3DBaseNode .prototype),
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
   createCoordIndex ()
   {
      const
         dimension  = this ._dimension .getValue (),
         coordIndex = this .geometry ._coordIndex;

      for (let n = 0; n < dimension; ++ n)
         coordIndex .push (n);

      coordIndex .push (0, -1);
   },
   createPoints ()
   {
      const
         dimension = this ._dimension .getValue (),
         angle     = Math .PI * 2 / dimension,
         point     = this .geometry ._coord .getValue () ._point;

      for (let n = 0; n < dimension; ++ n)
      {
         const p = Complex .Polar (1, angle * n);

         point .push (new Fields .SFVec3f (p .real, p .imag, 0));
      }
   },
   build ()
   {
      this .geometry         = new IndexedLineSet (this .getExecutionContext ());
      this .geometry ._coord = new Coordinate (this .getExecutionContext ());

      this .createCoordIndex ();
      this .createPoints ();

      const
         geometry = this .geometry,
         coord    = this .geometry ._coord .getValue ();

      coord    .setup ();
      geometry .setup ();
   },
   eventsProcessed ()
   {
      this .geometry = null;
   },
});

Object .defineProperties (Circle2DOptions,
{
   typeName:
   {
      value: "Circle2DOptions",
      enumerable: true,
   },
});

export default Circle2DOptions;
