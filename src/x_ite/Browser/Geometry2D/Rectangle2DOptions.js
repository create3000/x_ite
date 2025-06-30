import X3DBaseNode       from "../../Base/X3DBaseNode.js";
import IndexedFaceSet    from "../../Components/Geometry3D/IndexedFaceSet.js";
import Coordinate        from "../../Components/Rendering/Coordinate.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";

function Rectangle2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);
}

Object .assign (Object .setPrototypeOf (Rectangle2DOptions .prototype, X3DBaseNode .prototype),
{
   getGeometry ()
   {
      if (this .geometry)
         return this .geometry;

      this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .geometry ._texCoord = new TextureCoordinate (this .getExecutionContext ());
      this .geometry ._coord    = new Coordinate (this .getExecutionContext ());

      const
         geometry = this .geometry,
         texCoord = this .geometry ._texCoord .getValue (),
         coord    = this .geometry ._coord .getValue ();

      texCoord ._point = [1, 1, 0, 1, 0, 0, 1, 0];
      coord    ._point = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0];

      geometry ._coordIndex = [0, 1, 2, 3, -1];

      texCoord .setup ();
      coord    .setup ();
      geometry .setup ();

      return this .geometry;
   },
});

Object .defineProperties (Rectangle2DOptions,
{
   typeName:
   {
      value: "Rectangle2DOptions",
      enumerable: true,
   },
});

export default Rectangle2DOptions;
