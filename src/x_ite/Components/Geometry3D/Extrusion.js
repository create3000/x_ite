import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Triangle3            from "../../../standard/Math/Geometry/Triangle3.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Extrusion (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Extrusion);

   // Units

   this ._creaseAngle  .setUnit ("angle");
   this ._crossSection .setUnit ("length");
   this ._spine        .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Extrusion .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._set_crossSection .addFieldInterest (this ._crossSection);
      this ._set_orientation  .addFieldInterest (this ._orientation);
      this ._set_scale        .addFieldInterest (this ._scale);
      this ._set_spine        .addFieldInterest (this ._spine);
   },
   getClosed (array)
   {
      if (!array .length)
         return true;

      const
         first = array .at (0)  .getValue (),
         last  = array .at (-1) .getValue ();

      return first .equals (last);
   },
   createPoints: (() =>
   {
      const scale3 = new Vector3 (1);

      return function ()
      {
         const
            crossSection     = this ._crossSection,
            orientation      = this ._orientation,
            scale            = this ._scale,
            spine            = this ._spine,
            numCrossSections = crossSection .length,
            numOrientations  = orientation .length,
            numScales        = scale .length,
            numSpines        = spine .length,
            points           = [ ];

         // Calculate SCP rotations.

         const rotations = this .createRotations ();

         // Calculate vertices.

         for (let i = 0; i < numSpines; ++ i)
         {
            const matrix = rotations [i];

            if (numOrientations)
               matrix .rotate (orientation [Math .min (i, numOrientations - 1)] .getValue ());

            if (numScales)
            {
               const s = scale [Math .min (i, numScales - 1)] .getValue ();
               matrix .scale (scale3 .set (s .x, 1, s .y));
            }

            for (let cs = 0; cs < numCrossSections; ++ cs)
            {
               const vector = crossSection [cs] .getValue ();
               points .push (matrix .multVecMatrix (new Vector3 (vector .x, 0, vector .y)));
            }
         }

         return points;
      };
   })(),
   createRotations: (() =>
   {
      const rotations = [ ];

      const
         SCPxAxis = new Vector3 (),
         SCPyAxis = new Vector3 (),
         SCPzAxis = new Vector3 ();

      const
         SCPyAxisPrevious = new Vector3 (),
         SCPzAxisPrevious = new Vector3 ();

      const
         vector3  = new Vector3 (),
         rotation = new Rotation4 ();

      return function ()
      {
         // calculate SCP rotations

         const
            spine       = this ._spine,
            numSpines   = spine .length,
            closedSpine = this .getClosed (spine); // Test only for closed spine.

         // Extend or shrink static rotations array:
         for (let i = rotations .length; i < numSpines; ++ i)
            rotations [i] = new Matrix4 ();

         rotations .length = numSpines;

         // SCP axes:
         SCPxAxis .set (0);
         SCPyAxis .set (0);
         SCPzAxis .set (0);

         // SCP for the first point:
         if (closedSpine)
         {
            const s = spine .at (0) .getValue ();

            // Find first defined Y-axis.
            for (let i = 1, length = numSpines - 2; i < length; ++ i)
            {
               SCPyAxis .assign (spine [i] .getValue ()) .subtract (s) .normalize ()
                  .subtract (vector3 .assign (spine [length] .getValue ()) .subtract (s) .normalize ())
                  .normalize ();

               if (!SCPyAxis .equals (Vector3 .Zero))
                  break;
            }

            // Find first defined Z-axis.
            for (let i = 0, length = numSpines - 2; i < length; ++ i)
            {
               SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
                  .cross (vector3 .assign (spine [length] .getValue ()) .subtract (spine [i] .getValue ()))
                  .normalize ();

               if (!SCPzAxis .equals (Vector3 .Zero))
                  break;
            }
         }
         else
         {
            // Find first defined Y-axis.
            for (let i = 0, length = numSpines - 1; i < length; ++ i)
            {
               SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ()) .normalize ();

               if (!SCPyAxis .equals (Vector3 .Zero))
                  break;
            }

            // Find first defined Z-axis.
            for (let i = 1, length = numSpines - 1; i < length; ++ i)
            {
               SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (spine [i] .getValue ())
                  .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (spine [i] .getValue ()))
                  .normalize ();

               if (!SCPzAxis .equals (Vector3 .Zero))
                  break;
            }
         }

         // The entire spine is coincident:
         if (SCPyAxis .equals (Vector3 .Zero))
            SCPyAxis .set (0, 1, 0);

         // The entire spine is collinear:
         if (SCPzAxis .equals (Vector3 .Zero))
            rotation .setFromToVec (Vector3 .yAxis, SCPyAxis) .multVecRot (SCPzAxis .assign (Vector3 .zAxis));

         // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
         SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

         // Get first spine
         const s = spine .at (0) .getValue ();

         rotations [0] .set (... SCPxAxis, 0,
                             ... SCPyAxis, 0,
                             ... SCPzAxis, 0,
                             ... s,        1);

         // For all points other than the first or last:

         SCPyAxisPrevious .assign (SCPyAxis);
         SCPzAxisPrevious .assign (SCPzAxis);

         for (let i = 1, length = numSpines - 1; i < length; ++ i)
         {
            const s = spine [i] .getValue ();

            SCPyAxis .assign (spine [i + 1] .getValue ()) .subtract (s) .normalize ()
               .subtract (vector3 .assign (spine [i - 1] .getValue ()) .subtract (s) .normalize ())
               .normalize ();
            SCPzAxis .assign (spine [i + 1] .getValue ()) .subtract (s)
               .cross (vector3 .assign (spine [i - 1] .getValue ()) .subtract (s))
               .normalize ();

            // Fix edge case.
            // https://www.web3d.org/x3d/content/examples/X3dForAdvancedModeling/GeometricShapes/ExtrusionEdgeCasesIndex.html
            if (SCPyAxisPrevious .dot (SCPyAxis) < 0)
               SCPyAxis .negate ();

            // g.
            if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
               SCPzAxis .negate ();

            // The two points used in computing the Y-axis are coincident.
            if (SCPyAxis .equals (Vector3 .Zero))
               SCPyAxis .assign (SCPyAxisPrevious);
            else
               SCPyAxisPrevious .assign (SCPyAxis);

            // The three points used in computing the Z-axis are collinear.
            if (SCPzAxis .equals (Vector3 .Zero))
               SCPzAxis .assign (SCPzAxisPrevious);
            else
               SCPzAxisPrevious .assign (SCPzAxis);

            // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
            SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

            rotations [i] .set (... SCPxAxis, 0,
                                ... SCPyAxis, 0,
                                ... SCPzAxis, 0,
                                ... s,        1);
         }

         // SCP for the last point
         if (closedSpine)
         {
            // The SCPs for the first and last points are the same.
            rotations [numSpines - 1] .assign (rotations [0]);
         }
         else
         {
            const s = spine .at (-1) .getValue ();

            SCPyAxis .assign (s) .subtract (spine .at (-2) .getValue ()) .normalize ();

            if (numSpines > 2)
            {
               SCPzAxis .assign (s) .subtract (spine .at (-2) .getValue ())
                  .cross (vector3 .assign (spine .at (-3) .getValue ()) .subtract (spine .at (-2) .getValue ()))
                  .normalize ();
            }

            // Fix edge case.
            // https://www.web3d.org/x3d/content/examples/X3dForAdvancedModeling/GeometricShapes/ExtrusionEdgeCasesIndex.html
            if (SCPyAxisPrevious .dot (SCPyAxis) < 0)
               SCPyAxis .negate ();

            // g.
            if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
               SCPzAxis .negate ();

            // The two points used in computing the Y-axis are coincident.
            if (SCPyAxis .equals (Vector3 .Zero))
               SCPyAxis .assign (SCPyAxisPrevious);

            // The three points used in computing the Z-axis are collinear.
            if (SCPzAxis .equals (Vector3 .Zero))
               SCPzAxis .assign (SCPzAxisPrevious);

            // We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
            SCPxAxis .assign (SCPyAxis) .cross (SCPzAxis);

            rotations [numSpines - 1] .set (... SCPxAxis, 0,
                                            ... SCPyAxis, 0,
                                            ... SCPzAxis, 0,
                                            ... s,        1);
         }

         return rotations;
      };
   })(),
   build: (() =>
   {
      const
         min     = new Vector2 (),
         max     = new Vector2 (),
         vector2 = new Vector2 ();

      return function ()
      {
         const
            cw                = !this ._ccw .getValue (),
            crossSection      = this ._crossSection,
            spine             = this ._spine,
            numCrossSections  = crossSection .length,
            numSpines         = spine .length,
            coordIndicesArray = this .getCoordIndices (),
            texCoordArray     = this .getTexCoords ();

         if (numSpines < 2 || numCrossSections < 2)
            return;

         this .getMultiTexCoords () .push (texCoordArray);

         const INDEX = (n, k) => n * numCrossSections + k;

         // Use this to determine if start and end points should be connected.
         const closed = this .getClosed (spine)
            && this .getClosed (this ._orientation)
            && this .getClosed (this ._scale);

         // Use this to determine if normals should be connected.
         const closedSpine = this .getClosed (spine);

         const closedCrossSection = this .getClosed (crossSection);

         // For caps calculation

         min .assign (crossSection [0] .getValue ());
         max .assign (crossSection [0] .getValue ());

         for (let k = 1; k < numCrossSections; ++ k)
         {
            min .min (crossSection [k] .getValue ());
            max .max (crossSection [k] .getValue ());
         }

         const
            capSize      = vector2 .assign (max) .subtract (min),
            capMax       = Math .max (capSize .x, capSize .y),
            numCapPoints = closedCrossSection ? numCrossSections - 1 : numCrossSections;

         // Create

         const
            normalIndex = new Map (),
            normals     = [ ],
            points      = this .createPoints ();

         for (let p = 0, length = points .length; p < length; ++ p)
            normalIndex .set (p, [ ]);

         // Build body.

         const
            normalArray = this .getNormals (),
            vertexArray = this .getVertices ();

         const
            numCrossSection_1 = numCrossSections - 1,
            numSpine_1        = numSpines - 1;

         let
            indexLeftC  = INDEX (0, 0),
            indexRightC = INDEX (0, closedCrossSection ? 0 : numCrossSection_1),
            indexLeftI  = INDEX (0, 0),
            indexRightI = INDEX (0, closedCrossSection ? 0 : numCrossSection_1);

         for (let n = 0; n < numSpine_1; ++ n)
         {
            for (let k = 0; k < numCrossSection_1; ++ k)
            {
               const
                  s1 = closedSpine && n === numSpines - 2 ? 0 : n + 1,
                  n1 = closed && n === numSpines - 2 ? 0 : n + 1,
                  k1 = closedCrossSection && k === numCrossSections - 2 ? 0 : k + 1;

               // k      k+1
               //
               // p4 ----- p3   n+1
               //  |     / |
               //  |   /   |
               //  | /     |
               // p1 ----- p2   n

               let
                  c1 = INDEX (n,  k),  // normal indices
                  c2 = INDEX (n,  k1), // normal indices
                  c3 = INDEX (s1, k1), // normal indices
                  c4 = INDEX (s1, k),  // normal indices
                  i1 = c1,             // point indices
                  i2 = c2,             // point indices
                  i3 = INDEX (n1, k1), // point indices
                  i4 = INDEX (n1, k),  // point indices
                  p1 = points [i1],
                  p2 = points [i2],
                  p3 = points [i3],
                  p4 = points [i4],
                  l1 = p2 .distance (p3) >= 1e-7,
                  l2 = p4 .distance (p1) >= 1e-7;

               const
                  normal1 = Triangle3 .normal (p1, p2, p3, new Vector3 ()),
                  normal2 = Triangle3 .normal (p1, p3, p4, new Vector3 ());

               if (cw)
               {
                  normal1 .negate ();
                  normal2 .negate ();
               }

               // Merge points on the left and right side if spine is coincident for better normal generation.

               if (k === 0)
               {
                  if (l2)
                  {
                     indexLeftC = c1;
                     indexLeftI = i1;
                  }
                  else
                  {
                     c1 = indexLeftC;
                     i1 = indexLeftI;
                     p1 = points [i1];
                  }
               }

               if (k === numCrossSections - 2)
               {
                  if (l1)
                  {
                     indexRightC = c2;
                     indexRightI = i2;
                  }
                  else
                  {
                     c3 = indexRightC;
                     i3 = indexRightI;
                     p3 = points [i3];
                  }
               }

               // If there are coincident spine points then one length can be zero.

               // Triangle one

               if (l1)
               {
                  coordIndicesArray .push (i1, i2, i3);

                  // p1
                  if (l2)
                  {
                     texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
                  }
                  else
                  {
                     // Cone case: ((texCoord1 + texCoord4) / 2)
                     const y = (n / numSpine_1 + (n + 1) / numSpine_1) / 2;

                     texCoordArray .push (k / numCrossSection_1, y, 0, 1);
                  }

                  normalIndex .get (c1) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p1, 1);

                  // p2
                  texCoordArray .push ((k + 1) / numCrossSection_1, n / numSpine_1, 0, 1);
                  normalIndex .get (c2) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p2, 1);

                  // p3
                  texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  normalIndex .get (c3) .push (normals .length);
                  normals .push (normal1);
                  vertexArray .push (... p3, 1);
               }

               // Triangle two

               if (l2)
               {
                  coordIndicesArray .push (i1, i3, i4);

                  // p1
                  texCoordArray .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
                  normalIndex .get (c1) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p1, 1);

                  // p3
                  if (l1)
                  {
                     texCoordArray .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  }
                  else
                  {
                     // Cone case: ((texCoord3 + texCoord2) / 2)
                     const y = ((n + 1) / numSpine_1 + n / numSpine_1) / 2;

                     texCoordArray .push ((k + 1) / numCrossSection_1, y, 0, 1);
                  }

                  normalIndex .get (c3) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p3, 1);

                  // p4
                  texCoordArray .push (k / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
                  normalIndex .get (c4) .push (normals .length);
                  normals .push (normal2);
                  vertexArray .push (... p4, 1);
               }
            }
         }

         // Refine body normals and add them.

         const refinedNormals = this .refineNormals (normalIndex, normals, this ._creaseAngle .getValue ());

         for (const { x, y, z } of refinedNormals)
            normalArray .push (x, y, z);

         // Build caps

         if (capMax && numCapPoints > 2)
         {
            if (this ._beginCap .getValue ())
            {
               const
                  j         = 0, // spine
                  convex    = this ._convex .getValue (),
                  texCoord  = { },
                  polygon   = [ ],
                  triangles = [ ];

               for (let k = 0; k < numCapPoints; ++ k)
               {
                  const
                     index = INDEX (j, numCapPoints - 1 - k),
                     point = points [index] .copy ();

                  point .index     = index;
                  texCoord [index] = crossSection [numCapPoints - 1 - k] .getValue () .copy () .subtract (min) .divide (capMax);
                  polygon .push (convex ? index : point);
               }

               if (convex)
                  Triangle3 .triangulateConvexPolygon (polygon, triangles);

               else
                  Triangle3 .triangulatePolygon (polygon, triangles);

               if (triangles .length >= 3)
               {
                  const normal = Triangle3 .normal (points [triangles [0]],
                                                    points [triangles [1]],
                                                    points [triangles [2]],
                                                    new Vector3 ());

                  if (cw)
                     normal .negate ();

                  this .addCap (texCoordArray, texCoord, normal, points, triangles);
               }
            }

            if (this ._endCap .getValue ())
            {
               const
                  j         = numSpines - 1, // spine
                  convex    = this ._convex .getValue (),
                  texCoord  = { },
                  polygon   = [ ],
                  triangles = [ ];

               for (let k = 0; k < numCapPoints; ++ k)
               {
                  const
                     index = INDEX (j, k),
                     point = points [index] .copy ();

                  point .index     = index;
                  texCoord [index] = crossSection [k] .getValue () .copy () .subtract (min) .divide (capMax);
                  polygon .push (convex ? index : point);
               }

               if (convex)
                  Triangle3 .triangulateConvexPolygon (polygon, triangles);

               else
                  Triangle3 .triangulatePolygon (polygon, triangles);

               if (triangles .length >= 3)
               {
                  const normal = Triangle3 .normal (points [triangles [0]],
                                                    points [triangles [1]],
                                                    points [triangles [2]],
                                                    new Vector3 ());

                  if (cw)
                     normal .negate ();

                  this .addCap (texCoordArray, texCoord, normal, points, triangles);
               }
            }
         }

         this .setSolid (this ._solid .getValue ());
         this .setCCW (this ._ccw .getValue ());
      };
   })(),
   addCap (texCoordArray, texCoord, normal, vertices, triangles)
   {
      const
         coordIndicesArray = this .getCoordIndices (),
         normalArray       = this .getNormals (),
         vertexArray       = this .getVertices (),
         numTriangles      = triangles .length;

      for (let i = 0; i < numTriangles; i += 3)
      {
         const
            i1 = triangles [i],
            i2 = triangles [i + 1],
            i3 = triangles [i + 2],
            p1 = vertices [i1],
            p2 = vertices [i2],
            p3 = vertices [i3],
            t0 = texCoord [i1],
            t1 = texCoord [i2],
            t2 = texCoord [i3];

         coordIndicesArray .push (i1, i2, i3);

         texCoordArray .push (... t0, 0, 1, ... t1, 0, 1, ... t2, 0, 1);
         normalArray   .push (... normal,   ... normal,   ... normal);
         vertexArray   .push (... p1, 1,    ... p2, 1,    ... p3, 1);
      }
   },
});

Object .defineProperties (Extrusion,
{
   ... X3DNode .getStaticProperties ("Extrusion", "Geometry3D", 4, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_crossSection", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_orientation",  new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_scale",        new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_spine",        new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "beginCap",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endCap",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "crossSection",     new Fields .MFVec2f (new Vector2 (1), new Vector2 (1, -1), new Vector2 (-1, -1), new Vector2 (-1, 1), new Vector2 (1))),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "orientation",      new Fields .MFRotation (new Rotation4 ())),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "scale",            new Fields .MFVec2f (new Vector2 (1))),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "spine",            new Fields .MFVec3f (new Vector3 (), new Vector3 (0, 1, 0))),
      ]),
      enumerable: true,
   },
});

export default Extrusion;
