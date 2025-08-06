import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DChildNode               from "../Core/X3DChildNode.js";
import X3DBoundedObject           from "./X3DBoundedObject.js";
import Group                      from "./Group.js";
import Transform                  from "./Transform.js";
import PointSet                   from "../Rendering/PointSet.js";
import LineSet                    from "../Rendering/LineSet.js";
import TriangleSet                from "../Rendering/TriangleSet.js";
import FogCoordinate              from "../EnvironmentalEffects/FogCoordinate.js";
import Tangent                    from "../Rendering/Tangent.js";
import Color                      from "../Rendering/Color.js";
import ColorRGBA                  from "../Rendering/ColorRGBA.js";
import Normal                     from "../Rendering/Normal.js";
import Coordinate                 from "../Rendering/Coordinate.js";
import MultiTextureCoordinate     from "../Texturing/MultiTextureCoordinate.js";
import TextureCoordinate          from "../Texturing/TextureCoordinate.js";
import TextureCoordinateGenerator from "../Texturing/TextureCoordinateGenerator.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import TraverseType               from "../../Rendering/TraverseType.js";
import Algorithm                  from "../../../standard/Math/Algorithm.js";
import Color4                     from "../../../standard/Math/Numbers/Color4.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Vector4                    from "../../../standard/Math/Numbers/Vector4.js";
import Rotation4                  from "../../../standard/Math/Numbers/Rotation4.js";
import Box3                       from "../../../standard/Math/Geometry/Box3.js";
import Matrix4                    from "../../../standard/Math/Numbers/Matrix4.js";
import ViewVolume                 from "../../../standard/Math/Geometry/ViewVolume.js";
import DEVELOPMENT                from "../../DEVELOPMENT.js";

const CLONE_COUNT = 2; // Minimum number of shapes that must be cloned to become an InstancedShape.

// No support for X3DBindableNode nodes, local lights. X3DLocalFog, local ClipPlane nodes, LOD, Billboard node.

function StaticGroup (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .StaticGroup);

   this .groupNode  = new Group (this .getExecutionContext ());
   this .bbox       = new Box3 ();
   this .shadowBBox = new Box3 ();
}

Object .assign (Object .setPrototypeOf (StaticGroup .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._children .addFieldInterest (this .groupNode ._children);

      this .groupNode ._children = this ._children;
      this .groupNode .setPrivate (true);
      this .groupNode .setup ();

      // Connect after setup for correct order of events.
      this .groupNode ._children .addInterest ("set_children__", this);

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
      {
         if (this .optimizedGroup)
            return bbox .assign (shadows ? this .shadowBBox : this .bbox);

         return this .groupNode .getBBox (bbox, shadows);
      }

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getShapes (shapes, modelMatrix)
   {
      return this .groupNode .getShapes (shapes, modelMatrix);
   },
   set_children__ ()
   {
      if (this .optimizedGroup)
         this .disconnectChildNode (this .optimizedGroup);

      this .connectChildNode (this .groupNode, [TraverseType .CAMERA]);

      this .optimizedGroup = null;
   },
   traverse (type, renderObject)
   {
      if (!this .optimizedGroup)
         this .createStaticShapes ();

      this .optimizedGroup .traverse (type, renderObject);
   },
   async createStaticShapes ()
   {
      // Temporarily assign Group node.

      this .optimizedGroup = this .groupNode;

      // Check if scene is currently loading something.

      const scene = this .getScene ();

      if (scene ._loadCount .getValue ())
      {
         scene ._loadCount .addFieldCallback (this, () =>
         {
            if (scene ._loadCount .getValue ())
               return;

            scene ._loadCount .removeFieldCallback (this);

            this .set_children__ ();
         });
      }
      else
      {
         // Create static shapes.

         this .optimizedGroup = await this .optimizeGroups (this .createGroups ());

         this .disconnectChildNode (this .groupNode);
         this .connectChildNode (this .optimizedGroup, [TraverseType .CAMERA]);

         this .optimizedGroup .getBBox (this .bbox);
         this .optimizedGroup .getBBox (this .shadowBBox, true);
      }
   },
   createGroups: (() =>
   {
      const style = { style: "CLEAN", names: false };

      return function ()
      {
         // Traverse Group node to get render contexts.

         const browser = this .getBrowser ();

         if (browser .getBrowserOption ("Debug"))
            console .info (`Rebuilding StaticGroup "${this .getName () || "unnamed"}".`);

         const shapes = this .groupNode .getShapes ([ ], Matrix4 .Identity);

         // Determine groups that can be combined.
         // Sort out ParticleSystem nodes.
         // Sort out TextureCoordinateGenerator nodes.

         const
            clonesIndex  = new Map (shapes .map (({shapeNode}) => [shapeNode, [ ]])),
            groupsIndex  = { },
            singlesIndex = { };

         for (const context of shapes)
         {
            const
               shapeNode      = context .shapeNode,
               appearanceNode = shapeNode .getAppearance (),
               geometryNode   = shapeNode .getGeometry ();

            if (shapeNode .getType () .includes (X3DConstants .ParticleSystem))
            {
               if (shapeNode ._geometryType .getValue () === "GEOMETRY")
               {
                  if (!geometryNode ?.getVertices () .length)
                     continue;
               }

               if (!shapeNode ._isActive .getValue ())
                  continue;

               if (!shapeNode ._createParticles .getValue ())
                  continue;
            }
            else if (!geometryNode ?.getVertices () .length)
            {
               continue;
            }

            // Sort out ParticleSystem and InstancedShape nodes.
            if (shapeNode .getShapeKey () > 0 || this .hasTextureCoordinateGenerator (geometryNode))
            {
               const group = singlesIndex [context .modelMatrix] ??= [ ];

               group .push (context);
               continue;
            }

            let key = "";

            key += geometryNode .getGeometryType ();
            key += geometryNode .isSolid () ? 1 : 0;
            key += geometryNode .getFogDepths () .length ? 1 : 0;
            key += shapeNode .isTransparent () ? 1 : 0;
            key += shapeNode ._pointerEvents .getValue () ? 1 : 0;
            key += shapeNode ._castShadow .getValue () ? 1 : 0;
            key += shapeNode ._bboxDisplay .getValue () ? 1 : 0;
            key += ".";
            key += appearanceNode .toVRMLString (style);

            const
               clones = clonesIndex .get (shapeNode),
               group  = groupsIndex [key] ??= [ ];

            clones .push (context);
            group  .push (context);
         }

         // Sort out shapes that are not cloned.

         for (const [id, group] of clonesIndex .entries ())
         {
            if (group .length < CLONE_COUNT)
               clonesIndex .delete (id);
         }

         // Create arrays.

         const
            clonesGroups  = Array .from (clonesIndex .values ()),
            combineGroups = Object .values (groupsIndex)
               .map (group => group .filter (({shapeNode}) => !clonesIndex .has (shapeNode)))
               .filter (group => group .length),
            singlesGroups = Object .values (singlesIndex);

         if (browser .getBrowserOption ("Debug"))
         {
            console .info (`StaticGroup will create ${clonesGroups .length + combineGroups .length + singlesGroups .length} static nodes from the previous ${shapes .length} nodes.`);
         }

         return { clonesGroups, combineGroups, singlesGroups };
      };
   })(),
   hasTextureCoordinateGenerator (geometryNode)
   {
      const texCoord = geometryNode ._texCoord ?.getValue ();

      if (texCoord instanceof TextureCoordinateGenerator)
         return true;

      if (texCoord instanceof MultiTextureCoordinate)
      {
         if (texCoord ._texCoord .some (tc => tc .getValue () instanceof TextureCoordinateGenerator))
            return true;
      }

      return false;
   },
   async optimizeGroups ({ clonesGroups, combineGroups, singlesGroups })
   {
      if (clonesGroups .length)
         await this .getBrowser () .loadComponents ("X_ITE");

      // Create static shapes.

      if (DEVELOPMENT)
         console .time ("StaticGroup");

      const visibleNodes = [ ];

      clonesGroups  .forEach (group => this .combineClones (group, visibleNodes));
      combineGroups .forEach (group => this .combineShapes (group, visibleNodes));
      singlesGroups .forEach (group => this .normalizeSingleShapes (group, visibleNodes));

      // Create group of all optimized shapes.

      const optimizedGroup = new Group (this .getExecutionContext ());

      optimizedGroup ._children = visibleNodes;

      optimizedGroup .setPrivate (true);
      optimizedGroup .setup ();

      if (DEVELOPMENT)
         console .timeEnd ("StaticGroup");

      return optimizedGroup;
   },
   combineClones: (() =>
   {
      const
         t  = new Vector3 (),
         r  = new Rotation4 (),
         s  = new Vector3 (),
         so = new Rotation4 ();

      return function (group, visibleNodes)
      {
         const
            browser          = this .getBrowser (),
            executionContext = this .getExecutionContext (),
            InstancedShape   = browser .getConcreteNodes () .get ("InstancedShape"),
            instancedShape   = new InstancedShape (executionContext),
            shapeNode0       = group [0] .shapeNode;

         for (const { modelMatrix } of group)
         {
            modelMatrix .get (t, r, s, so);

            instancedShape ._translations      .push (t);
            instancedShape ._rotations         .push (r);
            instancedShape ._scales            .push (s);
            instancedShape ._scaleOrientations .push (so);
         }

         instancedShape ._pointerEvents = shapeNode0 ._pointerEvents;
         instancedShape ._castShadow    = shapeNode0 ._castShadow;
         instancedShape ._bboxDisplay   = shapeNode0 ._bboxDisplay;
         instancedShape ._appearance    = shapeNode0 ._appearance;
         instancedShape ._geometry      = shapeNode0 ._geometry;

         instancedShape .setPrivate (true);
         instancedShape .setup ();

         visibleNodes .push (instancedShape);
      };
   })(),
   combineShapes (group, visibleNodes)
   {
      const
         executionContext = this .getExecutionContext (),
         shapeNode0       = group [0] .shapeNode,
         newShapeNode     = shapeNode0 .copy (executionContext);

      let
         newGeometryNode = null,
         numPoints       = 0;

      for (const { modelMatrix, shapeNode } of group)
      {
         const normalizedGeometry = this .normalizeGeometry (modelMatrix, shapeNode);

         if (!newGeometryNode)
         {
            newGeometryNode = normalizedGeometry;
            numPoints       = normalizedGeometry ._coord .point .length;
            continue;
         }

         // vertexCount

         if (newGeometryNode .getGeometryType () === 1)
         {
            const vertexCount = newGeometryNode ._vertexCount;

            vertexCount .assign (vertexCount .concat (normalizedGeometry ._vertexCount));
         }

         // Attribute Nodes

         const attrib = newGeometryNode ._attrib;

         for (const node of normalizedGeometry ._attrib)
         {
            const
               normalizedAttrib = node .getValue (),
               name            = normalizedAttrib ._name .getValue ();

            let newAttribNode = attrib .find (a => a .name === name) ?.getValue ();

            if (!newAttribNode)
            {
               newAttribNode = normalizedAttrib .create (executionContext);

               attrib .push (newAttribNode);
            }

            newAttribNode ._name          = normalizedAttrib ._name;
            newAttribNode ._numComponents = normalizedAttrib ._numComponents;

            const
               value         = newAttribNode ._value,
               numComponents = normalizedAttrib ._numComponents ?.getValue () ?? 1;

            if (value .length < numPoints * numComponents)
               value .resize (numPoints * numComponents);

            value .assign (value .concat (normalizedAttrib ._value));
         }

         // FogCoordinate

         const normalizedFogCoord = normalizedGeometry ._fogCoord .getValue ();

         if (normalizedFogCoord ?._depth .length)
         {
            if (!newGeometryNode ._fogCoord .getValue ())
               newGeometryNode ._fogCoord = new FogCoordinate (executionContext);

            const depth = newGeometryNode ._fogCoord .depth;

            if (depth .length < numPoints)
               depth .resize (numPoints);

            depth .assign (depth .concat (normalizedFogCoord ._depth));
         }

         // Color

         const normalizedColor = normalizedGeometry ._color .getValue ();

         if (normalizedColor ?._color .length)
         {
            if (!newGeometryNode ._color .getValue ())
               newGeometryNode ._color = normalizedColor .create (executionContext);

            const color = newGeometryNode ._color .color;

            if (color .length < numPoints)
               color .resize (numPoints, Color4 .White);

            color .assign (color .concat (normalizedColor ._color));
         }

         // TextureCoordinate

         if (newGeometryNode ._texCoord)
         {
            const normalizedTexCoords = normalizedGeometry ._texCoord .getValue ();

            if (!newGeometryNode ._texCoord .getValue ())
               newGeometryNode ._texCoord = new MultiTextureCoordinate (executionContext);

            const texCoords = newGeometryNode ._texCoord .texCoord;

            for (const node of normalizedTexCoords ._texCoord)
            {
               const
                  normalizedTexCoord = node .getValue (),
                  mapping            = normalizedTexCoord ._mapping .getValue ();

               let newTexCoordNode = texCoords .find (tc => tc .mapping === mapping) ?.getValue ();

               if (!newTexCoordNode)
               {
                  newTexCoordNode = normalizedTexCoord .create (executionContext);

                  texCoords .push (newTexCoordNode);
               }

               newTexCoordNode ._mapping = normalizedTexCoord ._mapping;

               const point = newTexCoordNode ._point;

               if (point .length < numPoints)
                  point .resize (numPoints);

               point .assign (point .concat (normalizedTexCoord ._point));
            }
         }

         // Tangent

         const normalizedTangent = normalizedGeometry ._tangent .getValue ();

         if (normalizedTangent ?._vector .length)
         {
            if (!newGeometryNode ._tangent .getValue ())
               newGeometryNode ._tangent = new Tangent (executionContext);

            const vector = newGeometryNode ._tangent .vector;

            if (vector .length < numPoints)
               vector .resize (numPoints);

            vector .assign (vector .concat (normalizedTangent ._vector));
         }

         // Normal

         const normalizedNormal = normalizedGeometry ._normal .getValue ();

         if (normalizedNormal ?._vector .length)
         {
            if (!newGeometryNode ._normal .getValue ())
               newGeometryNode ._normal = new Normal (executionContext);

            const vector = newGeometryNode ._normal .vector;

            if (vector .length < numPoints)
               vector .resize (numPoints);

            vector .assign (vector .concat (normalizedNormal ._vector));
         }

         // Coordinate

         const normalizedCoord = normalizedGeometry ._coord .getValue ();

         if (normalizedCoord ?._point .length)
         {
            if (!newGeometryNode ._coord .getValue ())
               newGeometryNode ._coord = new Coordinate (executionContext);

            const point = newGeometryNode ._coord .point;

            point .assign (point .concat (normalizedCoord ._point));

            numPoints = point .length;
         }
      }

      // Setup X3DGeometryNode node.

      newGeometryNode ._attrib    .forEach (a => a .getValue () .setup ());
      newGeometryNode ._fogCoord  .getValue () ?.setup ();
      newGeometryNode ._color     .getValue () ?.setup ();
      newGeometryNode ._texCoord ?.texCoord .forEach (tc => tc .getValue () .setup ());
      newGeometryNode ._texCoord ?.getValue () ?.setup ();
      newGeometryNode ._tangent   .getValue () ?.setup ();
      newGeometryNode ._normal    .getValue () ?.setup ();
      newGeometryNode ._coord     .getValue () ?.setup ();

      newGeometryNode .setup ();

      // Setup Shape node.

      newShapeNode ._geometry = newGeometryNode;

      newShapeNode .setPrivate (true);
      newShapeNode .setup ();

      visibleNodes .push (newShapeNode);
   },
   normalizeGeometry: (() =>
   {
      const GeometryTypes = [
         PointSet,
         LineSet,
         TriangleSet,
         TriangleSet,
      ];

      const FieldTypes = [
         Fields .MFFloat,
         Fields .MFVec2f,
         Fields .MFVec3f,
         Fields .MFVec4f,
      ];

      const
         tangent = new Vector4 (),
         normal  = new Vector3 (),
         vertex  = new Vector4 (),
         point   = new Vector3 ();

      return function (modelMatrix, shapeNode)
      {
         const
            browser          = this .getBrowser (),
            executionContext = this .getExecutionContext (),
            geometryNode     = shapeNode .getGeometry (),
            GeometryType     = GeometryTypes [geometryNode .getGeometryType ()],
            newGeometryNode  = new GeometryType (executionContext);

         // Attribute Nodes

         const
            attribs     = geometryNode .getAttribs (),
            attribNodes = geometryNode .getAttrib ();

         const newAttribNodes = attribs .map ((attrib, i) =>
         {
            const
               attribNode    = attribNodes [i],
               newAttribNode = attribNode .create (executionContext);

            newAttribNode ._name          = attribNode. _name;
            newAttribNode ._numComponents = attribNode ._numComponents;
            newAttribNode ._value         = attrib .getValue ();

            return newAttribNode;
         });

         newGeometryNode ._attrib = newAttribNodes;

         // FogCoordinate

         const fogDepthArray = geometryNode .getFogDepths () .getValue ();

         if (fogDepthArray .length)
         {
            const newFogCoordNode = new FogCoordinate (executionContext);

            newFogCoordNode ._depth    = fogDepthArray;
            newGeometryNode ._fogCoord = newFogCoordNode;
         }

         // Color

         const colorArray = geometryNode .getColors () .getValue ();

         if (colorArray .length)
         {
            if (shapeNode .isTransparent ())
            {
               var newColor = new ColorRGBA (executionContext);

               newColor ._color = colorArray;
            }
            else
            {
               var newColor = new Color (executionContext);

               newColor ._color = colorArray .filter ((c, i) => i % 4 < 3);
            }

            newGeometryNode ._color = newColor;
         }

         // TextureCoordinate

         if (newGeometryNode ._texCoord)
         {
            const
               textureCoordinateNode = geometryNode .getTextureCoordinate (),
               multiTexCoords        = geometryNode .getMultiTexCoords ();

            const newTexCoordNodes = multiTexCoords .map ((texCoords, i) =>
            {
               const texCoordNode = textureCoordinateNode instanceof MultiTextureCoordinate
                  ? textureCoordinateNode .getTextureCoordinates () [i]
                     ?? this .getBrowser () .getDefaultTextureCoordinate ()
                  : textureCoordinateNode;

               if (texCoordNode instanceof TextureCoordinateGenerator)
                  return texCoordNode .copy (executionContext);

               const
                  texCoordArray       = texCoords .getValue (),
                  TextureCoordinate4D = browser .getConcreteNodes () .get ("TextureCoordinate4D"),
                  newTexCoordNode     = new (TextureCoordinate4D ?? TextureCoordinate) (executionContext);

               newTexCoordNode ._mapping = texCoordNode ._mapping;

               if (TextureCoordinate4D)
                  newTexCoordNode ._point = texCoordArray;
               else
                  newTexCoordNode ._point = texCoordArray .filter ((p, i) => i % 4 < 2);

               return newTexCoordNode;
            });

            const newTexCoordNode = new MultiTextureCoordinate (executionContext);

            newTexCoordNode ._texCoord = newTexCoordNodes;
            newGeometryNode ._texCoord = newTexCoordNode;
         }

         // Tangents

         const
            normalMatrix = modelMatrix .submatrix .inverse () .transpose (),
            tangentArray = geometryNode .getTangents () .getValue ();

         if (tangentArray .length)
         {
            const
               numTangents    = tangentArray .length,
               newTangentNode = new Tangent (executionContext),
               newVectors     = new Float32Array (numTangents);

            for (let i = 0; i < numTangents; i += 4)
            {
               normal .set (tangentArray [i], tangentArray [i + 1], tangentArray [i + 2]);
               normalMatrix .multVecMatrix (normal);
               newVectors .set (tangent .set (normal .x, normal .y, normal .z, tangentArray [i + 3]), i);
            }

            newTangentNode  ._vector  = newVectors;
            newGeometryNode ._tangent = newTangentNode;
         }

         // Normals

         const normalArray = geometryNode .getNormals () .getValue ();

         if (normalArray .length)
         {
            const
               numNormals    = normalArray .length,
               newNormalNode = new Normal (executionContext),
               newVectors    = new Float32Array (numNormals);

            for (let i = 0; i < numNormals; i += 3)
            {
               normal .set (normalArray [i], normalArray [i + 1], normalArray [i + 2]);
               normalMatrix .multVecMatrix (normal);
               newVectors .set (normal, i);
            }

            newNormalNode   ._vector = newVectors;
            newGeometryNode ._normal = newNormalNode;
         }

         // Coordinate

         const
            vertexArray  = geometryNode .getVertices () .getValue (),
            numVertices  = vertexArray .length,
            newCoordNode = new Coordinate (executionContext),
            newPoints    = new Float32Array (numVertices / 4 * 3);

         for (let i = 0, o = 0; i < numVertices; i += 4, o += 3)
         {
            vertex .set (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2], vertexArray [i + 3]);
            modelMatrix .multVecMatrix (vertex);
            newPoints .set (point .assign (vertex) .divide (vertex .w), o);
         }

         newCoordNode    ._point = newPoints;
         newGeometryNode ._coord = newCoordNode;

         // Common fields

         switch (geometryNode .getGeometryType ())
         {
            case 1:
            {
               newGeometryNode ._vertexCount = new Array (numVertices / 8) .fill (2);
               break;
            }
            case 2:
            case 3:
            {
               newGeometryNode .setGeometryType (geometryNode .getGeometryType ());
               newGeometryNode ._solid = geometryNode .isSolid ();

               if (!(geometryNode ._ccw ?.getValue () ?? true))
               {
                  for (const attrib of newGeometryNode ._attrib)
                  {
                     const numComponents = Algorithm .clamp (attrib .numComponents, 1, 4);

                     if (numComponents === 1)
                     {
                        attrib .value .reverse ();
                     }
                     else
                     {
                        const value = new (FieldTypes [numComponents - 1]) ();

                        value .setValue (attrib .value .shrinkToFit ());
                        value .reverse ();

                        attrib .value = value .shrinkToFit ();
                     }
                  }

                  newGeometryNode ._fogCoord .getValue () ?._depth    .reverse ();
                  newGeometryNode ._color    .getValue () ?._color    .reverse ();
                  newGeometryNode ._texCoord .getValue () ?._texCoord .forEach (tc => tc .point .reverse ());
                  newGeometryNode ._tangent  .getValue () ?._vector   .reverse ();
                  newGeometryNode ._normal   .getValue () ?._vector   .reverse ();
                  newGeometryNode ._coord    .getValue () ?._point    .reverse ();
               }

               break;
            }
         }

         return newGeometryNode;
      };
   })(),
   normalizeSingleShapes: (() =>
   {
      const
         t  = new Vector3 (),
         r  = new Rotation4 (),
         s  = new Vector3 (),
         so = new Rotation4 ();

      return function (group, visibleNodes)
      {
         const
            executionContext = this .getExecutionContext (),
            newTransformNode = new Transform (executionContext),
            modelMatrix      = group [0] .modelMatrix;

         modelMatrix .get (t, r, s, so);

         newTransformNode ._translation      = t;
         newTransformNode ._rotation         = r;
         newTransformNode ._scale            = s;
         newTransformNode ._scaleOrientation = so;

         for (const { shapeNode } of group)
            newTransformNode ._children .push (shapeNode);

         newTransformNode .setPrivate (true);
         newTransformNode .setup ();

         visibleNodes .push (newTransformNode);
      };
   })(),
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (StaticGroup,
{
   ... X3DNode .getStaticProperties ("StaticGroup", "Grouping", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "children",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default StaticGroup;
