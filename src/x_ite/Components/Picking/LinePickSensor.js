import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DPickSensorNode    from "./X3DPickSensorNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import IntersectionType     from "../../Browser/Picking/IntersectionType.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import Line3                from "../../../standard/Math/Geometry/Line3.js";

function LinePickSensor (executionContext)
{
   X3DPickSensorNode .call (this, executionContext);

   this .addType (X3DConstants .LinePickSensor);
}

Object .assign (Object .setPrototypeOf (LinePickSensor .prototype, X3DPickSensorNode .prototype),
{
   initialize ()
   {
      X3DPickSensorNode .prototype .initialize .call (this);

      this ._pickingGeometry .addInterest ("set_pickingGeometry__", this);

      this .set_pickingGeometry__ ();
   },
   set_pickingGeometry__ ()
   {
      this .pickingGeometryNode = null;

      try
      {
         const
            node = this ._pickingGeometry .getValue () .getInnerNode (),
            type = node .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .IndexedLineSet:
               case X3DConstants .LineSet:
               {
                  this .pickingGeometryNode = node;
                  break;
               }
               default:
                  continue;
            }
         }
      }
      catch
      { }
   },
   process: (() =>
   {
      const
         pickingBBox             = new Box3 (),
         targetBBox              = new Box3 (),
         pickingCenter           = new Vector3 (),
         targetCenter            = new Vector3 (),
         matrix                  = new Matrix4 (),
         point1                  = new Vector3 (),
         point2                  = new Vector3 (),
         line                    = new Line3 (),
         a                       = new Vector3 (),
         b                       = new Vector3 (),
         intersections           = [ ],
         texCoord                = new Vector3 (),
         pickedTextureCoordinate = new Fields .MFVec3f (),
         pickedNormal            = new Fields .MFVec3f (),
         pickedPoint             = new Fields .MFVec3f ();

      return function ()
      {
         if (this .pickingGeometryNode)
         {
            const
               modelMatrices = this .getModelMatrices (),
               targets       = this .getTargets ();

            switch (this .getIntersectionType ())
            {
               case IntersectionType .BOUNDS:
               {
                  // Intersect bboxes.

                  for (const modelMatrix of modelMatrices)
                  {
                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (const target of targets)
                     {
                        targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);

                        if (pickingBBox .intersectsBox (targetBBox))
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  break;
               }
               case IntersectionType .GEOMETRY:
               {
                  // Intersect geometry.

                  for (const modelMatrix of modelMatrices)
                  {
                     pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);

                     for (const target of targets)
                     {
                        const
                           geometryNode = target .geometryNode,
                           vertices     = this .pickingGeometryNode .getVertices (),
                           numVertices  = vertices .length;

                        targetBBox .assign (geometryNode .getBBox ()) .multRight (target .modelMatrix);
                        matrix .assign (target .modelMatrix) .inverse () .multLeft (modelMatrix);

                        for (let v = 0; v < numVertices; v += 8)
                        {
                           matrix .multVecMatrix (point1 .set (vertices [v + 0], vertices [v + 1], vertices [v + 2]));
                           matrix .multVecMatrix (point2 .set (vertices [v + 4], vertices [v + 5], vertices [v + 6]));
                           line .setPoints (point1, point2);

                           intersections .length = 0;

                           if (geometryNode .intersectsLine (line, intersections))
                           {
                              for (const intersection of intersections)
                              {
                                 // Test if intersection.point is between point1 and point2.

                                 a .assign (intersection .point) .subtract (point1);
                                 b .assign (intersection .point) .subtract (point2);

                                 const
                                    c = a .add (b) .norm (),
                                    s = point1 .distance (point2);

                                 if (c <= s)
                                    target .intersections .push (intersection);
                              }
                           }
                        }

                        if (target .intersections .length)
                        {
                           pickingCenter .assign (pickingBBox .center);
                           targetCenter  .assign (targetBBox .center);

                           target .intersected = true;
                           target .distance    = pickingCenter .distance (targetCenter);
                        }
                     }
                  }

                  // Send events.

                  const
                     pickedGeometries = this .getPickedGeometries (),
                     active           = !! pickedGeometries .length;

                  pickedGeometries .assign (pickedGeometries .filter (node => node));

                  if (active !== this ._isActive .getValue ())
                     this ._isActive = active;

                  if (!this ._pickedGeometry .equals (pickedGeometries))
                     this ._pickedGeometry = pickedGeometries;

                  const pickedTargets = this .getPickedTargets ();

                  pickedTextureCoordinate .length = 0;
                  pickedNormal            .length = 0;
                  pickedPoint             .length = 0;

                  for (const pickedTarget of pickedTargets)
                  {
                     const pickedIntersections = pickedTarget .intersections;

                     for (const intersection of pickedIntersections)
                     {
                        const t = intersection .texCoord;

                        texCoord .set (t .x, t .y, t .z) .divide (t .w);

                        pickedTextureCoordinate .push (texCoord);
                        pickedNormal            .push (intersection .normal);
                        pickedPoint             .push (intersection .point);
                     }
                  }

                  if (!this ._pickedTextureCoordinate .equals (pickedTextureCoordinate))
                     this ._pickedTextureCoordinate = pickedTextureCoordinate;

                  if (!this ._pickedNormal .equals (pickedNormal))
                     this ._pickedNormal = pickedNormal;

                  if (!this ._pickedPoint .equals (pickedPoint))
                     this ._pickedPoint = pickedPoint;

                  break;
               }
            }
         }

         X3DPickSensorNode .prototype .process .call (this);
      };
   })(),
});

Object .defineProperties (LinePickSensor,
{
   ... X3DNode .getStaticProperties ("LinePickSensor", "Picking", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",              new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "matchCriterion",          new Fields .SFString ("MATCH_ANY")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType",        new Fields .SFString ("BOUNDS")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",               new Fields .SFString ("CLOSEST")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedTextureCoordinate", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedNormal",            new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",             new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

Object .assign (X3DGeometryNode .prototype,
{
   intersectsLine: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         uvt                = { u: 0, v: 0, t: 0 },
         v0                 = new Vector3 (),
         v1                 = new Vector3 (),
         v2                 = new Vector3 ();

      return function (hitRay, intersections)
      {
         if (!this .intersectsBBox (hitRay))
            return intersections .length;

         // Apply transformations from geometry primitives and Text with ScreenFontStyle.
         hitRay .multLineMatrix (invModelViewMatrix .assign (this .getMatrix ()) .inverse ());

         const
            texCoords   = this .multiTexCoords [0] .getValue (),
            normals     = this .normals .getValue (),
            vertices    = this .vertices .getValue (),
            vertexCount = this .vertexCount;

         for (let i = 0; i < vertexCount; i += 3)
         {
            const i4 = i * 4;

            v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
            v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
            v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

            if (!hitRay .intersectsTriangle (v0, v1, v2, uvt))
               continue;

            // Get barycentric coordinates.

            const { u, v, t } = uvt;

            // Determine vectors for LinePickSensor.

            const point = new Vector3 (u * vertices [i4]     + v * vertices [i4 + 4] + t * vertices [i4 +  8],
                                       u * vertices [i4 + 1] + v * vertices [i4 + 5] + t * vertices [i4 +  9],
                                       u * vertices [i4 + 2] + v * vertices [i4 + 6] + t * vertices [i4 + 10]);

            const texCoord = new Vector4 (u * texCoords [i4]     + v * texCoords [i4 + 4] + t * texCoords [i4 + 8],
                                          u * texCoords [i4 + 1] + v * texCoords [i4 + 5] + t * texCoords [i4 + 9],
                                          u * texCoords [i4 + 2] + v * texCoords [i4 + 6] + t * texCoords [i4 + 10],
                                          u * texCoords [i4 + 3] + v * texCoords [i4 + 7] + t * texCoords [i4 + 11]);

            const i3 = i * 3;

            const normal = new Vector3 (u * normals [i3]     + v * normals [i3 + 3] + t * normals [i3 + 6],
                                          u * normals [i3 + 1] + v * normals [i3 + 4] + t * normals [i3 + 7],
                                          u * normals [i3 + 2] + v * normals [i3 + 5] + t * normals [i3 + 8]);

            intersections .push ({ texCoord, normal, point: this .getMatrix () .multVecMatrix (point) });
         }

         return intersections .length;
      };
   })(),
   intersectsBBox: (() =>
   {
      const intersection = new Vector3 ();

      return function (hitRay)
      {
         const { min, max, planes } = this;

         const
            minX = min .x,
            maxX = max .x,
            minY = min .y,
            maxY = max .y,
            minZ = min .z,
            maxZ = max .z;

         // front
         if (planes [0] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .y >= minY && intersection .y <= maxY)
               return true;
         }

         // back
         if (planes [1] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .y >= minY && intersection .y <= maxY)
               return true;
         }

         // top
         if (planes [2] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         // bottom
         if (planes [3] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         // right
         if (planes [4] .intersectsLine (hitRay, intersection))
         {
            if (intersection .y >= minY && intersection .y <= maxY &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         return false;
      };
   })(),
});

export default LinePickSensor;
