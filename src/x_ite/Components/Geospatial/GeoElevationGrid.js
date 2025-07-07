import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Triangle3            from "../../../standard/Math/Geometry/Triangle3.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function GeoElevationGrid (executionContext)
{
   X3DGeometryNode     .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoElevationGrid);

   // Units

   this ._set_height  .setUnit ("length");
   this ._creaseAngle .setUnit ("angle");
   this ._height      .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoElevationGrid .prototype, X3DGeometryNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DGeometryNode     .prototype .initialize .call (this);
      X3DGeospatialObject .prototype .initialize .call (this);

      this ._set_height .addFieldInterest (this ._height);
      this ._color      .addInterest ("set_color__",    this);
      this ._texCoord   .addInterest ("set_texCoord__", this);
      this ._tangent    .addInterest ("set_tangent__",  this);
      this ._normal     .addInterest ("set_normal__",   this);

      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_tangent__ ();
      this .set_normal__ ();
   },
   set_color__ ()
   {
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent ());
   },
   set_texCoord__ ()
   {
      this .texCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordNode ?.addInterest ("requestRebuild", this);

      this .setTextureCoordinate (this .texCoordNode);
   },
   set_tangent__ ()
   {
      this .tangentNode ?.removeInterest ("requestRebuild", this);

      this .tangentNode = X3DCast (X3DConstants .X3DTangentNode, this ._tangent);

      this .tangentNode ?.addInterest ("requestRebuild", this);
   },
   set_normal__ ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
   },
   getColor ()
   {
      return this .colorNode;
   },
   getTexCoord ()
   {
      return this .texCoordNode;
   },
   getTangent ()
   {
      return this .tangentNode;
   },
   getNormal ()
   {
      return this .normalNode;
   },
   getHeight (index)
   {
      if (index < this ._height .length)
         return this ._height [index] * this ._yScale .getValue ();

      return 0;
   },
   createTexCoords ()
   {
      const
         texCoords  = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
            texCoords .push (new Vector2 (x / xSize, z / zSize));
      }

      return texCoords;
   },
   createNormals (points, coordIndex, creaseAngle)
   {
      const
         cw          = !this ._ccw .getValue (),
         normalIndex = new Map (),
         normals     = [ ];

      for (let p = 0; p < points .length; ++ p)
         normalIndex .set (p, [ ]);

      for (let c = 0; c < coordIndex .length; c += 3)
      {
         const
            c0 = coordIndex [c],
            c1 = coordIndex [c + 1],
            c2 = coordIndex [c + 2];

         normalIndex .get (c0) .push (normals .length);
         normalIndex .get (c1) .push (normals .length + 1);
         normalIndex .get (c2) .push (normals .length + 2);

         const normal = Triangle3 .normal (points [c0], points [c1], points [c2], new Vector3 ());

         if (cw)
            normal .negate ();

         normals .push (normal);
         normals .push (normal);
         normals .push (normal);
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, creaseAngle ?? this ._creaseAngle .getValue ());
   },
   createCoordIndex ()
   {
      // p1 - p4
      //  | \ |
      // p2 - p3

      const
         coordIndex = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zSize; ++ z)
      {
         for (let x = 0; x < xSize; ++ x)
         {
            const
               i1 =       z * xDimension + x,
               i2 = (z + 1) * xDimension + x,
               i3 = (z + 1) * xDimension + (x + 1),
               i4 =       z * xDimension + (x + 1);

            coordIndex .push (i1); // p1
            coordIndex .push (i3); // p3
            coordIndex .push (i2); // p2

            coordIndex .push (i1); // p1
            coordIndex .push (i4); // p4
            coordIndex .push (i3); // p3
         }
      }

      return coordIndex;
   },
   createPoints ()
   {
      const
         points     = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSpacing   = this ._xSpacing .getValue (),
         zSpacing   = this ._zSpacing .getValue ();

      // When the geoSystem is "GD", xSpacing refers to the number of units of longitude in angle base units between
      // adjacent height values and zSpacing refers to the number of units of latitude in angle base units between
      // vertical height values.

      // When the geoSystem is "UTM", xSpacing refers to the number of eastings (length base units) between adjacent
      // height values and zSpacing refers to the number of northings (length base units) between vertical height values.

      if (this .getStandardOrder ())
      {
         for (let z = 0; z < zDimension; ++ z)
         {
            for (let x = 0; x < xDimension; ++ x)
            {
               const point = new Vector3 (zSpacing * z, // latitude, northing
                                          xSpacing * x, // longitude, easting
                                          this .getHeight (x + z * xDimension));

               point .add (this ._geoGridOrigin .getValue ());

               points .push (this .getCoord (point, point));
            }
         }
      }
      else
      {
         for (let z = 0; z < zDimension; ++ z)
         {
            for (let x = 0; x < xDimension; ++ x)
            {
               const point = new Vector3 (xSpacing * x, // longitude, easting
                                          zSpacing * z, // latitude, northing
                                          this .getHeight (x + z * xDimension));

               point .add (this ._geoGridOrigin .getValue ());

               points .push (this .getCoord (point, point));
            }
         }
      }

      return points;
   },
   build ()
   {
      if (this ._xDimension .getValue () < 2 || this ._zDimension .getValue () < 2)
         return;

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this .createCoordIndex (),
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         tangentNode        = this .getTangent (),
         normalNode         = this .getNormal (),
         points             = this .createPoints (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         tangentArray       = this .getTangents (),
         normalArray        = this .getNormals (),
         vertexArray        = this .getVertices ();

      let face = 0;

      // Vertex attribute

      //std::vector <std::vector <float>> attribArrays (attribNodes .size ());

      //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
      //   attribArrays [a] .reserve (coordIndex .size ());

      if (texCoordNode)
      {
         texCoordNode .init (multiTexCoordArray);
      }
      else
      {
         var
            texCoords     = this .createTexCoords (),
            texCoordArray = this .getTexCoords ();

         multiTexCoordArray .push (texCoordArray);
      }

      // Build geometry

      for (let c = 0; c < coordIndex .length; ++ face)
      {
         for (let p = 0; p < 6; ++ p, ++ c)
         {
            const
               index       = coordIndex [c],
               { x, y, z } = points [index];

            //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
            //   attribNodes [a] -> addValue (attribArrays [a], i);

            colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

            if (texCoordNode)
            {
               texCoordNode .addPoint (index, multiTexCoordArray);
            }
            else
            {
               const { x, y } = texCoords [index];

               texCoordArray .push (x, y, 0, 1);
            }

            tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);
            normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);

            vertexArray .push (x, y, z, 1);
         }
      }

      // Add auto-generated normals if needed.

      if (!normalNode)
      {
         const normals = this .createNormals (points, coordIndex);

         for (const { x, y, z } of normals)
            normalArray .push (x, y, z);
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DGeometryNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoElevationGrid,
{
   ... X3DNode .getStaticProperties ("GeoElevationGrid", "Geospatial", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",       new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_height",      new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoGridOrigin",   new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xSpacing",        new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zSpacing",        new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "yScale",          new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",     new Fields .SFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",         new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "height",          new Fields .MFDouble (0, 0)),
      ]),
      enumerable: true,
   },
});

export default GeoElevationGrid;
