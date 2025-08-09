import X3DNode         from "../Core/X3DNode.js";
import X3DGeometryNode from "./X3DGeometryNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";

function X3DComposedGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .X3DComposedGeometryNode);

   // Private properties

   this .polygons  = [ ];
   this .triangles = [ ];
}

Object .assign (Object .setPrototypeOf (X3DComposedGeometryNode .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._attrib   .addInterest ("set_attrib__",   this);
      this ._fogCoord .addInterest ("set_fogCoord__", this);
      this ._color    .addInterest ("set_color__",    this);
      this ._texCoord .addInterest ("set_texCoord__", this);
      this ._normal   .addInterest ("set_normal__",   this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_tangent__ ();
      this .set_normal__ ();
      this .set_coord__ ();
   },
   checkVertexCount (numVertices, multiplier)
   {
      return numVertices - numVertices % multiplier;
   },
   getPolygonIndex (index)
   {
      return index;
   },
   getTriangleIndex (index)
   {
      return index;
   },
   createPolygons (polygonsSize, polygons = [ ])
   {
      for (let i = 0; i < polygonsSize; ++ i)
         polygons .push (this .getPolygonIndex (i));

      return polygons;
   },
   createTriangles (trianglesSize, triangles = [ ])
   {
      for (let i = 0; i < trianglesSize; ++ i)
         triangles .push (this .getTriangleIndex (i));

      return triangles;
   },
   build (verticesPerPolygon, polygonsSize, verticesPerFace, trianglesSize)
   {
      if (!this .coordNode ?.getSize ())
         return;

      // Set size to a multiple of verticesPerPolygon.

      polygonsSize  = this .checkVertexCount (polygonsSize,  verticesPerPolygon);
      trianglesSize = this .checkVertexCount (trianglesSize, verticesPerFace);

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndicesArray  = this .getCoordIndices (),
         attribNodes        = this .getAttrib (),
         numAttribNodes     = attribNodes .length,
         attribArrays       = this .getAttribs (),
         fogCoordNode       = this .getFogCoord (),
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         tangentNode        = this .getTangent (),
         normalNode         = this .getNormal (),
         coordNode          = this .getCoord (),
         fogDepthArray      = this .getFogDepths (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         tangentArray       = this .getTangents (),
         normalArray        = this .getNormals (),
         vertexArray        = this .getVertices (),
         polygons           = this .createPolygons (polygonsSize, this .polygons),
         triangles          = this .createTriangles (trianglesSize, this .triangles);

      // Init TextureCoordinateNode.

      texCoordNode ?.init (multiTexCoordArray);

      // Fill GeometryNode.

      for (let i = 0; i < trianglesSize; ++ i)
      {
         const
            face  = Math .floor (i / verticesPerFace),
            index = polygons [triangles [i]];

         coordIndicesArray .push (index);

         for (let a = 0; a < numAttribNodes; ++ a)
            attribNodes [a] .addValue (index, attribArrays [a]);

         fogCoordNode ?.addDepth (index, fogDepthArray);

         colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

         texCoordNode ?.addPoint (index, multiTexCoordArray);

         tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);
         normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);

         coordNode .addPoint (index, vertexArray);
      }

      // Autogenerate normal if not specified.

      if (!normalNode)
         this .generateNormals (verticesPerPolygon, polygonsSize, polygons, trianglesSize, triangles);

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());

      // Clear arrays.

      polygons  .length = 0;
      triangles .length = 0;
   },
   generateNormals (verticesPerPolygon, polygonsSize, polygons, trianglesSize, triangles)
   {
      const
         normals     = this .createNormals (verticesPerPolygon, polygonsSize, polygons),
         normalArray = this .getNormals ();

      for (let i = 0; i < trianglesSize; ++ i)
      {
         const { x, y, z } = normals [triangles [i]];

         normalArray .push (x, y, z);
      }
   },
   createNormals (verticesPerPolygon, polygonsSize, polygons = this .createPolygons (polygonsSize))
   {
      // This function is used by Sunrize.

      const normals = this .createFaceNormals (verticesPerPolygon, polygonsSize, polygons);

      if (!this ._normalPerVertex .getValue ())
         return normals;

      const normalIndex = new Map ();

      for (let i = 0; i < polygonsSize; ++ i)
      {
         const index = polygons [i];

         let pointIndex = normalIndex .get (index);

         if (!pointIndex)
            normalIndex .set (index, pointIndex = [ ]);

         pointIndex .push (i);
      }

      return this .refineNormals (normalIndex, normals, Math .PI);
   },
   createFaceNormals (verticesPerPolygon, polygonsSize, polygons = this .createPolygons (polygonsSize))
   {
      // This function is used by Sunrize.

      const
         cw      = !this ._ccw .getValue (),
         coord   = this .coordNode,
         normals = [ ];

      for (let index = 0; index < polygonsSize; index += verticesPerPolygon)
      {
         let normal;

         switch (verticesPerPolygon)
         {
            case 3:
            {
               normal = coord .getNormal (polygons [index],
                                          polygons [index + 1],
                                          polygons [index + 2]);
               break;
            }
            case 4:
            {
               normal = coord .getQuadNormal (polygons [index],
                                              polygons [index + 1],
                                              polygons [index + 2],
                                              polygons [index + 3]);
               break;
            }
            default:
            {
               normal = this .getPolygonNormal (index, verticesPerPolygon, polygons, coord);
               break;
            }
         }

         if (cw)
            normal .negate ();

         for (let n = 0; n < verticesPerPolygon; ++ n)
            normals .push (normal);
      }

      return normals;
   },
   getPolygonNormal: (() =>
   {
      let
         current = new Vector3 (),
         next    = new Vector3 ();

      return function (index, verticesPerPolygon, polygons, coord)
      {
         // Determine polygon normal.
         // We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

         const normal = new Vector3 ();

         coord .get1Point (polygons [index], next);

         for (let i = 0; i < verticesPerPolygon; ++ i)
         {
            const tmp = current;
            current = next;
            next    = tmp;

            coord .get1Point (polygons [index + (i + 1) % verticesPerPolygon], next);

            normal .x += (current .y - next .y) * (current .z + next .z);
            normal .y += (current .z - next .z) * (current .x + next .x);
            normal .z += (current .x - next .x) * (current .y + next .y);
         }

         return normal .normalize ();
      };
   })(),
});

Object .defineProperties (X3DComposedGeometryNode, X3DNode .getStaticProperties ("X3DComposedGeometryNode", "Rendering", 1));

export default X3DComposedGeometryNode;
