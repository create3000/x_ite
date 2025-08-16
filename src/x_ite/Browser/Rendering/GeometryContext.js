import X3DGeometryNode from "../../Components/Rendering/X3DGeometryNode.js";
import AlphaMode       from "../Shape/AlphaMode.js";

function GeometryContext (options = { })
{
   Object .assign (this,
   {
      alphaMode: AlphaMode .OPAQUE,
      geometryType: 3,
      hasFogCoords: false,
      colorMaterial: false,
      hasNormals: false,
      hasTangents: false,
      textureNode: null,
      localObjectsKeys: [ ],
      textureCoordinateMapping: new Map (),
      textureCoordinateNode: null,
   },
   options)

   this .updateGeometryKey ();
}

Object .assign (GeometryContext .prototype,
{
   getTextureCoordinateMapping ()
   {
      return this .textureCoordinateMapping;
   },
   getTextureCoordinate ()
   {
      return this .textureCoordinateNode;
   },
   updateGeometryKey: X3DGeometryNode .prototype .updateGeometryKey,
});

export default GeometryContext;
