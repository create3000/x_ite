/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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

// No support for X3DBindableNode nodes, local lights. X3DLocalFog, local ClipPlane nodes, LOD, Billboard, Switch node.

const
   _pointingShapes  = Symbol (),
   _collisionShapes = Symbol (),
   _shadowShapes    = Symbol (),
   _displayShapes   = Symbol ();

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

      this ._bboxSize   .addFieldInterest (this .groupNode ._bboxSize);
      this ._bboxCenter .addFieldInterest (this .groupNode ._bboxCenter);
      this ._children   .addFieldInterest (this .groupNode ._children);

      this .groupNode ._bboxSize   = this ._bboxSize;
      this .groupNode ._bboxCenter = this ._bboxCenter;
      this .groupNode ._children   = this ._children;
      this .groupNode .setPrivate (true);
      this .groupNode .setup ();

      // Connect after Group setup.
      this .groupNode ._isCameraObject   .addFieldInterest (this ._isCameraObject);
      this .groupNode ._isPickableObject .addFieldInterest (this ._isPickableObject);
      this .groupNode ._children         .addInterest ("set_children__", this);

      this .setCameraObject   (this .groupNode .isCameraObject ());
      this .setPickableObject (this .groupNode .isPickableObject ());

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      return bbox .assign (shadows ? this .shadowBBox : this .bbox);
   },
   set_children__ ()
   {
      this .groupNode .getBBox (this .bbox);
      this .groupNode .getBBox (this .shadowBBox, true);

      this [_pointingShapes]  = null;
      this [_collisionShapes] = null;
      this [_shadowShapes]    = null;
      this [_displayShapes]   = null;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         {
            return;
         }
         case TraverseType .POINTER:
         {
            this .traverseStatics (_pointingShapes, type, renderObject);
            return;
         }
         case TraverseType .COLLISION:
         {
            this .traverseStatics (_collisionShapes, type, renderObject);
            return;
         }
         case TraverseType .SHADOW:
         {
            this .traverseStatics (_shadowShapes, type, renderObject);
            return;
         }
         case TraverseType .DISPLAY:
         {
            this .traverseStatics (_displayShapes, type, renderObject);
            return;
         }
      }
   },
   traverseStatics (staticNodes, type, renderObject)
   {
      this [staticNodes] ??= this .createStaticShapes (staticNodes, type, renderObject);

      for (const shapeNode of this [staticNodes])
         shapeNode .traverse (type, renderObject);
   },
   createStaticShapes: (() =>
   {
      const StaticsIndex = new Map ([
         [_pointingShapes,  ["Pointing"]],
         [_collisionShapes, ["Collision"]],
         [_shadowShapes,    ["Shadow"]],
         [_displayShapes,   ["Opaque", "Transparent", "TransmissionOpaque", "TransmissionTransparent"]],
      ]);

      const viewVolume = new ViewVolume ();

      viewVolume .intersectsSphere = () => true;

      return function (staticNodes, type, renderObject)
      {
         // Traverse Group node to get render contexts.

         const
            browser          = this .getBrowser (),
            viewVolumes      = renderObject .getViewVolumes (),
            viewport         = renderObject .getViewport (),
            projectionMatrix = renderObject .getProjectionMatrix (),
            modelViewMatrix  = renderObject .getModelViewMatrix (),
            Statics          = StaticsIndex .get (staticNodes),
            firstShapes      = Statics .map (Static => renderObject [`getNum${Static}Shapes`] ()),
            renderContexts   = [ ];

         if (browser .getBrowserOption ("Debug"))
            console .info (`Rebuilding StaticGroup "${this .getName () || "unnamed"}".`);

         viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

         modelViewMatrix .push ();
         modelViewMatrix .identity ();

         this .groupNode .traverse (type, renderObject);

         modelViewMatrix .pop ();
         viewVolumes     .pop ();

         for (const [i, Static] of Statics .entries ())
         {
            const
               firstShape = firstShapes [i],
               lastShape  = renderObject [`getNum${Static}Shapes`] (),
               shapes     = renderObject [`get${Static}Shapes`] () .splice (firstShape, lastShape - firstShape);

            renderObject [`setNum${Static}Shapes`] (firstShape);

            if (Static .includes ("Transmission"))
               continue;

            for (const renderContext of shapes)
               renderContexts .push (renderContext);
         }

         // Determine groups that can be combined.
         // TODO: Sort out ParticleSystem nodes.
         // TODO: Sort out TextureCoordinateGenerator nodes.

         const
            groupsIndex  = { },
            singleShapes = [ ];

         for (const renderContext of renderContexts)
         {
            const
               shapeNode      = renderContext .shapeNode,
               appearanceNode = shapeNode .getAppearance (),
               geometryNode   = shapeNode .getGeometry ();

            switch (shapeNode .getShapeKey ())
            {
               case 1:
               case 2:
               case 3:
               {
                  singleShapes .push (renderContext);
                  continue;
               }
            }

            if (this .hasTextureCoordinateGenerator (geometryNode))
            {
               singleShapes .push (renderContext);
               continue;
            }

            let key = "";

            key += appearanceNode .getId ();
            key += ".";
            key += geometryNode .getGeometryType ();
            key += geometryNode .isSolid () ? 1 : 0;
            key += shapeNode .isTransparent () ? 1 : 0;

            const group = groupsIndex [key] ??= [ ];

            group .push (renderContext);
         }

         const groups = Object .values (groupsIndex);

         if (browser .getBrowserOption ("Debug"))
         {
            console .info (`StaticGroup will create ${groups .length + singleShapes .length} static nodes from ${renderContexts .length} nodes.`);
         }

         // Create static shapes.

         return groups .map (group => this .combineShapes (group))
            .concat (singleShapes .map (renderContext => this .normalizeSingleShapes (renderContext)));
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
   combineShapes: (function ()
   {
      const GeometryTypes = [
         PointSet,
         LineSet,
         TriangleSet,
         TriangleSet,
      ];

      return function (group)
      {
         const
            executionContext = this .getExecutionContext (),
            shapeNode        = group [0] .shapeNode,
            geometryNode     = shapeNode .getGeometry (),
            newShapeNode     = shapeNode .copy (executionContext),
            GeometryType     = GeometryTypes [geometryNode .getGeometryType ()],
            newGeometryNode  = new GeometryType (executionContext);

         let numPoints = 0;

         for (const { modelViewMatrix, shapeNode } of group)
         {
            const
               modelMatrix        = new Matrix4 (... modelViewMatrix),
               normalizedGeometry = this .normalizeGeometry (modelMatrix, shapeNode);

            // vertexCount

            if (geometryNode .getGeometryType () === 1)
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

         newGeometryNode ._solid    = geometryNode .isSolid ();
         newShapeNode    ._geometry = newGeometryNode;

         return this .setupStaticShape (newShapeNode);
      };
   })(),
   setupStaticShape (shapeNode)
   {
      const geometryNode = shapeNode ._geometry .getValue ();

      geometryNode ._attrib    .forEach (a => a .getValue () .setup ());
      geometryNode ._fogCoord  .getValue () ?.setup ();
      geometryNode ._color     .getValue () ?.setup ();
      geometryNode ._texCoord ?.texCoord .forEach (tc => tc .getValue () .setup ());
      geometryNode ._texCoord ?.getValue () ?.setup ();
      geometryNode ._tangent   .getValue () ?.setup ();
      geometryNode ._normal    .getValue () ?.setup ();
      geometryNode ._coord     .getValue () ?.setup ();

      geometryNode .setup ();

      shapeNode .setPrivate (true);
      shapeNode .setup ();

      return shapeNode;
   },
   normalizeGeometry: (function ()
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
      ]

      const
         tangent = new Vector4 (),
         normal  = new Vector3 (),
         vertex  = new Vector4 ();

      return function (modelMatrix, shapeNode)
      {
         const
            browser          = this .getBrowser (),
            executionContext = this .getExecutionContext (),
            geometryNode     = shapeNode .getGeometry (),
            newGeometryNode  = new GeometryTypes [geometryNode .getGeometryType ()] (executionContext);

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

         const fogDepths = geometryNode .getFogDepths ();

         if (fogDepths .length)
         {
            const newFogCoordNode = new FogCoordinate (executionContext);

            newFogCoordNode ._depth    = fogDepths .getValue ();
            newGeometryNode ._fogCoord = newFogCoordNode;
         }

         // Color

         const colors = geometryNode .getColors ();

         if (colors .length)
         {
            if (shapeNode .isTransparent ())
            {
               var newColor = new ColorRGBA (executionContext);

               newColor ._color = colors .getValue ();
            }
            else
            {
               var newColor = new Color (executionContext);

               newColor ._color = colors .getValue () .filter ((c, i) => i % 4 < 3);
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
                  TextureCoordinate4D = browser .getConcreteNodes () .get ("TextureCoordinate4D"),
                  newTexCoordNode     = new (TextureCoordinate4D ?? TextureCoordinate) (executionContext),
                  texCoordArray       = texCoords .getValue ();

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
            tangents     = geometryNode .getTangents ();

         if (tangents .length)
         {
            const
               tangentArray   = tangents .getValue (),
               numTangents    = tangentArray .length,
               newTangentNode = new Tangent (executionContext);

            for (let i = 0; i < numTangents; i += 3)
            {
               normal .set (tangentArray [i], tangentArray [i + 1], tangentArray [i + 2]);
               normalMatrix .multVecMatrix (normal);
               newTangentNode ._vector .push (tangent .set (... normal, tangentArray [i + 3]));
            }

            newGeometryNode ._tangent = newTangentNode;
         }

         // Normals

         const normals = geometryNode .getNormals ();

         if (normals .length)
         {
            const
               normalArray   = normals .getValue (),
               numNormals    = normalArray .length,
               newNormalNode = new Normal (executionContext);

            for (let i = 0; i < numNormals; i += 3)
            {
               normal .set (normalArray [i], normalArray [i + 1], normalArray [i + 2]);
               normalMatrix .multVecMatrix (normal);
               newNormalNode ._vector .push (normal);
            }

            newGeometryNode ._normal = newNormalNode;
         }

         // Coordinate

         const
            vertexArray  = geometryNode .getVertices () .getValue (),
            numVertices  = vertexArray .length,
            newCoordNode = new Coordinate (executionContext);

         for (let i = 0; i < numVertices; i += 4)
         {
            vertex .set (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2], vertexArray [i + 3]);
            modelMatrix .multVecMatrix (vertex);
            newCoordNode ._point .push (vertex);
         }

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
   normalizeSingleShapes ({ modelViewMatrix, shapeNode })
   {
      const
         executionContext = this .getExecutionContext (),
         newTransformNode = new Transform (executionContext),
         modelMatrix      = new Matrix4 (... modelViewMatrix);

      const
         t  = new Vector3 (),
         r  = new Rotation4 (),
         s  = new Vector3 (),
         so = new Rotation4 ();

      modelMatrix .get (t, r, s, so);

      newTransformNode ._translation      = t;
      newTransformNode ._rotation         = r;
      newTransformNode ._scale            = s;
      newTransformNode ._scaleOrientation = so;

      newTransformNode ._children .push (shapeNode);

      newTransformNode .setPrivate (true);
      newTransformNode .setup ();

      return newTransformNode;
   },
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
