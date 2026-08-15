import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "./X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function IndexedLineSet (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedLineSet);
}

Object .assign (Object .setPrototypeOf (IndexedLineSet .prototype, X3DLineGeometryNode .prototype),
{
   initialize ()
   {
      X3DLineGeometryNode .prototype .initialize .call (this);

      this ._set_colorIndex .addFieldInterest (this ._colorIndex);
      this ._set_coordIndex .addFieldInterest (this ._coordIndex);

      this ._attrib   .addInterest ("set_attrib__",   this);
      this ._fogCoord .addInterest ("set_fogCoord__", this);
      this ._color    .addInterest ("set_color__",    this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._normal   .addInterest ("set_normal__",   this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_tangent__ ();
      this .set_normal__ ();
      this .set_coord__ ();
   },
   getPolylineIndices ()
   {
      const
         coordIndex = this ._coordIndex,
         polylines  = [ ];

      let polyline = [ ];

      if (coordIndex .length)
      {
         const length = coordIndex .length;

         for (let i = 0; i < length; ++ i)
         {
            const index = coordIndex [i];

            if (index >= 0)
               // Add vertex.
               polyline .push (i);

            else
            {
               // Negativ index.
               // Add polylines.
               polylines .push (polyline);

               polyline = [ ];
            }
         }

         if (coordIndex [length - 1] >= 0)
            polylines .push (polyline);
      }

      return polylines;
   },
   build ()
   {
      if (!this .coordNode ?.getSize ())
         return;

      const
         colorIndex        = this ._colorIndex .shrinkToFit (),
         coordIndex        = this ._coordIndex .getValue (),
         polylines         = this .getPolylineIndices (),
         colorPerVertex    = this ._colorPerVertex .getValue (),
         coordIndicesArray = this .getCoordIndices (),
         attribNodes       = this .getAttrib (),
         numAttribNodes    = attribNodes .length,
         attribArrays      = this .getAttribs (),
         fogCoordNode      = this .getFogCoord (),
         colorNode         = this .getColor (),
         tangentNode       = this .getTangent (),
         normalNode        = this .getNormal (),
         coordNode         = this .getCoord (),
         fogDepthArray     = this .getFogDepths (),
         colorArray        = this .getColors (),
         tangentArray      = this .getTangents (),
         normalArray       = this .getNormals (),
         vertexArray       = this .getVertices ();

      // Fill GeometryNode

      let face = 0;

      for (const polyline of polylines)
      {
         // Create two vertices for each line.

         if (polyline .length > 1)
         {
            const l_end = polyline .length - 1;

            for (let line = 0; line < l_end; ++ line)
            {
               const i_end = line + 2;

               for (let l = line; l < i_end; ++ l)
               {
                  const
                     i     = polyline [l],
                     index = coordIndex [i];

                  coordIndicesArray .push (index);

                  for (let a = 0; a < numAttribNodes; ++ a)
                     attribNodes [a] .addValue (index, attribArrays [a]);

                  fogCoordNode ?.addDepth (index, fogDepthArray);
                  colorNode ?.addColor (colorPerVertex ? (colorIndex [i] ?? coordIndex [i]) : (colorIndex [face] ?? face), colorArray);
                  tangentNode ?.addVector (index, tangentArray);
                  normalNode  ?.addVector (index, normalArray);

                  coordNode .addPoint (index, vertexArray);
               }
            }
         }

         ++ face;
      }
   },
});

Object .defineProperties (IndexedLineSet,
{
   ... X3DNode .getStaticProperties ("IndexedLineSet", "Rendering", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_colorIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_coordIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "coordIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",         new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",        new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IndexedLineSet;
