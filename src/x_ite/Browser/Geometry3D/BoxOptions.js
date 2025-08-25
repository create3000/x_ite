import X3DBaseNode       from "../../Base/X3DBaseNode.js";
import IndexedFaceSet    from "../../Components/Geometry3D/IndexedFaceSet.js";
import Coordinate        from "../../Components/Rendering/Coordinate.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";

function BoxOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);
}

Object .assign (Object .setPrototypeOf (BoxOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);
   },
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

      geometry ._texCoordIndex = [
         0, 1, 2, 3, -1, // front
         0, 1, 2, 3, -1, // back
         0, 1, 2, 3, -1, // left
         0, 1, 2, 3, -1, // right
         0, 1, 2, 3, -1, // top
         0, 1, 2, 3, -1  // bottom
      ];

      geometry ._coordIndex = [
         0, 1, 2, 3, -1, // front
         5, 4, 7, 6, -1, // back
         1, 5, 6, 2, -1, // left
         4, 0, 3, 7, -1, // right
         4, 5, 1, 0, -1, // top
         3, 2, 6, 7, -1  // bottom
      ];

      texCoord ._point = [1, 1, 0, 1, 0, 0, 1, 0];

      coord ._point = [
         1,  1,  1,  -1, 1,  1,  -1, -1,  1,  1, -1,  1,
         1,  1, -1,  -1, 1, -1,  -1, -1, -1,  1, -1, -1,
      ];

      texCoord .setup ();
      coord    .setup ();
      geometry .setup ();

      return this .geometry;
   },
});

Object .defineProperties (BoxOptions,
{
   typeName:
   {
      value: "BoxOptions",
      enumerable: true,
   },
});

export default BoxOptions;
