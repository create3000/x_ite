import Fields            from "../../Fields.js";
import X3DConstants      from "../../Base/X3DConstants.js";
import X3DBaseNode       from "../../Base/X3DBaseNode.js";
import IndexedFaceSet    from "../../Components/Geometry3D/IndexedFaceSet.js";
import Coordinate        from "../../Components/Rendering/Coordinate.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";
import IcoSphere         from "./IcoSphere.js";

function IcoSphereOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "type",  new Fields .SFString ("ICOSAHEDRON"),
                          X3DConstants .inputOutput, "order", new Fields .SFInt32 (2))
}

Object .assign (Object .setPrototypeOf (IcoSphereOptions .prototype, X3DBaseNode .prototype),
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
   build ()
   {
      this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
      this .geometry ._texCoord = new TextureCoordinate (this .getExecutionContext ());
      this .geometry ._coord    = new Coordinate (this .getExecutionContext ());

      const
         icoSphere = new IcoSphere (this ._type .getValue (), this ._order .getValue (), 1),
         geometry  = this .geometry,
         texCoord  = this .geometry ._texCoord .getValue (),
         coord     = this .geometry ._coord .getValue ();

      texCoord ._point = icoSphere .getTexPoint ();
      coord    ._point = icoSphere .getPoint ();

      geometry ._creaseAngle   = Math .PI;
      geometry ._texCoordIndex = icoSphere .getTexCoordIndex ();
      geometry ._coordIndex    = icoSphere .getCoordIndex ();

      texCoord .setup ();
      coord    .setup ();
      geometry .setup ();
   },
   eventsProcessed ()
   {
      this .geometry = null;
   },
});

Object .defineProperties (IcoSphereOptions,
{
   typeName:
   {
      value: "IcoSphereOptions",
      enumerable: true,
   },
});

export default IcoSphereOptions;
