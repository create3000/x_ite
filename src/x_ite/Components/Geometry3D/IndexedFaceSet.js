import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "../Rendering/X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Triangle3               from "../../../standard/Math/Geometry/Triangle3.js";

function IndexedFaceSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedFaceSet);

   // Units

   this ._creaseAngle .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (IndexedFaceSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._set_colorIndex    .addFieldInterest (this ._colorIndex);
      this ._set_texCoordIndex .addFieldInterest (this ._texCoordIndex);
      this ._set_normalIndex   .addFieldInterest (this ._normalIndex);
      this ._set_coordIndex    .addFieldInterest (this ._coordIndex);
   },
   getTexCoordPerVertexIndex (index)
   {
      if (index < this ._texCoordIndex .length)
         return this ._texCoordIndex [index];

      return this ._coordIndex [index];
   },
   getColorPerVertexIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return this ._coordIndex [index];
   },
   getColorPerFaceIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return index;
   },
   getNormalPerVertexIndex (index)
   {
      if (index < this ._normalIndex .length)
         return this ._normalIndex [index];

      return this ._coordIndex [index];
   },
   getNormalPerFaceIndex (index)
   {
      if (index < this ._normalIndex .length)
         return this ._normalIndex [index];

      return index;
   },
   build ()
   {
      // Triangulate

      const polygons = this .triangulate ();

      // Build arrays

      if (polygons .length === 0)
         return;

      // Fill GeometryNode

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this ._coordIndex .getValue (),
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
         vertexArray        = this .getVertices ();

      texCoordNode ?.init (multiTexCoordArray);

      for (const { triangles, face } of polygons)
      {
         for (const i of triangles)
         {
            const index = coordIndex [i];

            coordIndicesArray .push (index);

            for (let a = 0; a < numAttribNodes; ++ a)
               attribNodes [a] .addValue (index, attribArrays [a]);

            fogCoordNode ?.addDepth (index, fogDepthArray);

            colorNode ?.addColor (colorPerVertex ? this .getColorPerVertexIndex (i) : this .getColorPerFaceIndex (face), colorArray);

            texCoordNode ?.addPoint (this .getTexCoordPerVertexIndex (i), multiTexCoordArray);

            tangentNode ?.addVector (normalPerVertex ? this .getNormalPerVertexIndex (i) : this .getNormalPerFaceIndex (face), tangentArray);
            normalNode  ?.addVector (normalPerVertex ? this .getNormalPerVertexIndex (i) : this .getNormalPerFaceIndex (face), normalArray);

            coordNode .addPoint (index, vertexArray);
         }
      }

      // Autogenerate normals if not specified.

      if (!normalNode)
         this .generateNormals (polygons);

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
   triangulate ()
   {
      const
         convex      = this ._convex .getValue (),
         coordLength = this ._coordIndex .length,
         polygons    = [ ];

      if (!this .getCoord ())
         return polygons;

      // Add -1 (polygon end marker) to coordIndex if not present.
      if (coordLength && this ._coordIndex .at (-1) > -1)
         this ._coordIndex .push (-1);

      if (coordLength)
      {
         const
            coordIndex  = this ._coordIndex .getValue (),
            coordLength = this ._coordIndex .length;

         // Construct triangle array and determine the number of used points.

         for (let i = 0, face = 0, vertices = [ ]; i < coordLength; ++ i)
         {
            const index = coordIndex [i];

            if (index > -1)
            {
               // Add vertex index.
               vertices .push (i);
            }
            else
            {
               // Negative index.

               switch (vertices .length)
               {
                  case 0:
                  case 1:
                  case 2:
                  {
                     vertices .length = 0;
                     break;
                  }
                  case 3:
                  {
                     // Add polygon with one triangle.
                     polygons .push ({ vertices: vertices, triangles: vertices, face: face });
                     vertices = [ ];
                     break;
                  }
                  default:
                  {
                     // Triangulate polygon.

                     const
                        triangles = [ ],
                        polygon   = { vertices: vertices, triangles: triangles, face: face };

                     if (convex)
                        Triangle3 .triangulateConvexPolygon (vertices, triangles);
                     else
                        this .triangulatePolygon (vertices, triangles);

                     if (triangles .length < 3)
                     {
                        vertices .length = 0;
                     }
                     else
                     {
                        polygons .push (polygon);
                        vertices = [ ];
                     }

                     break;
                  }
               }

               ++ face;
            }
         }
      }

      return polygons;
   },
   triangulatePolygon: (() =>
   {
      const polygon = [ ];

      return function (vertices, triangles)
      {
         const
            coordIndex = this ._coordIndex .getValue (),
            coord      = this .getCoord (),
            length     = vertices .length;

         for (let i = polygon .length; i < length; ++ i)
            polygon .push (new Vector3 ());

         for (let i = 0; i < length; ++ i)
         {
            const
               index = vertices [i],
               point = polygon [i];

            point .index = index;

            coord .get1Point (coordIndex [index], point);
         }

         polygon .length = length;

         Triangle3 .triangulatePolygon (polygon, triangles);
      };
   })(),
   generateNormals (polygons)
   {
      const
         normals     = this .createNormals (polygons),
         normalArray = this .getNormals ();

      for (const { triangles } of polygons)
      {
         for (const i of triangles)
            normalArray .push (... normals [i]);
      }
   },
   createNormals (polygons)
   {
      const
         cw          = !this ._ccw .getValue (),
         coordIndex  = this ._coordIndex .getValue (),
         coord       = this .getCoord (),
         normalIndex = new Map (),
         normals     = [ ];

      for (const { vertices } of polygons)
      {
         const length = vertices .length;

         let normal;

         switch (length)
         {
            case 3:
            {
               normal = coord .getNormal (coordIndex [vertices [0]],
                                          coordIndex [vertices [1]],
                                        coordIndex [vertices [2]]);
               break;
            }
            case 4:
            {
               normal = coord .getQuadNormal (coordIndex [vertices [0]],
                                              coordIndex [vertices [1]],
                                              coordIndex [vertices [2]],
                                              coordIndex [vertices [3]]);
               break;
            }
            default:
            {
               normal = this .getPolygonNormal (vertices, coordIndex, coord);
               break;
            }
         }

         if (cw)
            normal .negate ();

         // Add a normal index for each point.

         for (const index of vertices)
         {
            const point = coordIndex [index];

            let pointNormals = normalIndex .get (point);

            if (!pointNormals)
               normalIndex .set (point, pointNormals = [ ]);

            pointNormals .push (index);

            // Add this normal for each vertex.

            normals [index] = normal;
         }
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, this ._creaseAngle .getValue ());
   },
   getPolygonNormal: (() =>
   {
      let
         current = new Vector3 (),
         next    = new Vector3 ();

      return function (vertices, coordIndex, coord)
      {
         // Determine polygon normal.
         // We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

         const normal = new Vector3 ();

         coord .get1Point (coordIndex [vertices [0]], next);

         for (let i = 0, length = vertices .length; i < length; ++ i)
         {
            const tmp = current;
            current = next;
            next    = tmp;

            coord .get1Point (coordIndex [vertices [(i + 1) % length]], next);

            normal .x += (current .y - next .y) * (current .z + next .z);
            normal .y += (current .z - next .z) * (current .x + next .x);
            normal .z += (current .x - next .x) * (current .y + next .y);
         }

         return normal .normalize ();
      };
   })(),
});

Object .defineProperties (IndexedFaceSet,
{
   ... X3DNode .getStaticProperties ("IndexedFaceSet", "Geometry3D", 2, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_colorIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_texCoordIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_normalIndex",   new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_coordIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorIndex",        new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalIndex",       new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "coordIndex",        new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",           new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",             new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IndexedFaceSet;
