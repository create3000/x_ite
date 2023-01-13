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

import X3DParser from "./X3DParser.js";
import Vector3   from "../../standard/Math/Numbers/Vector3.js";
import Rotation4 from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4   from "../../standard/Math/Numbers/Matrix4.js";

function GLTFParser (scene)
{
   X3DParser .call (this, scene);

   this .buffers     = [ ];
   this .bufferViews = [ ];
   this .accessors   = [ ];
   this .materials   = [ ];
   this .nodes       = [ ];
}

GLTFParser .prototype = Object .assign (Object .create (X3DParser .prototype),
{
   constructor: GLTFParser,
   getEncoding: function ()
   {
      return "JSON";
   },
   isValid: (function ()
   {
      const keys = new Set ([
         "asset",
         "buffers",
         "bufferViews",
         "accessors",
         "samplers",
         "images",
         "textures",
         "materials",
         "meshes",
         "nodes",
         "scenes",
         "scene",
         "cameras",
         "animations",
         "skins",
      ]);

      return function ()
      {
         return this .input instanceof Object && Object .keys (this .input) .every (key => keys .has (key));
      };
   })(),
   getInput: function ()
   {
      return this .input;
   },
   setInput: function (json)
   {
      try
      {
         if (typeof json === "string")
            json = JSON .parse (json);

         this .input = json;
      }
      catch (error)
      {
         this .input = undefined;
      }
   },
   parseIntoScene: function (success, error)
   {
      this .rootObject (this .input)
         .then (success)
         .catch (error);
   },
   rootObject: async function (glTF)
   {
      if (!(glTF instanceof Object))
         return;

      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("GLTF");
      scene .setProfile (browser .getProfile ("Interchange"));
      scene .addComponent (browser .getComponent ("Texturing3D", 2));

      await this .loadComponents ();

      // Parse root objects.

      this .assetObject (glTF .asset);

      await this .buffersArray (glTF .buffers);

      this .bufferViewsArray  (glTF .bufferViews);
      this .accessorsArray    (glTF .accessors);
      this .samplersObject    (glTF .samplers);
      this .imagesObject      (glTF .images);
      this .texturesObject    (glTF .textures);
      this .materialsObject   (glTF .materials);
      this .meshesArray       (glTF .meshes);
      this .nodesArray        (glTF .nodes);
      this .scenesArray       (glTF .scenes, glTF .scene);
      this .animationsObject  (glTF .animations);
      this .skinsObject       (glTF .skins);

      return this .getScene ();
   },
   assetObject: function (asset)
   {
      if (!(asset instanceof Object))
         return;

      const
         scene         = this .getScene (),
         worldURL      = scene .getWorldURL (),
         worldInfoNode = scene .createNode ("WorldInfo", false);

      worldInfoNode ._title = decodeURI (new URL (worldURL) .pathname .split ("/") .at (-1) || worldURL);

      for (const [key, value] in Object .entries (asset))
      {
         if (typeof value === "string")
            worldInfoNode ._info .push (`${key}: ${value}`);
      }

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   buffersArray: async function (buffers)
   {
      if (!(buffers instanceof Array))
         return;

      this .buffers = await Promise .all (buffers .map (buffer => this .bufferValue (buffer)));
   },
   bufferValue: function (buffer)
   {
      if (!(buffer instanceof Object))
         return;

      const url = new URL (buffer .uri, this .getScene () .getWorldURL ());

      return fetch (url)
         .then (response => response .blob ())
         .then (blob => blob .arrayBuffer ());
   },
   bufferViewsArray: function (bufferViews)
   {
      if (!(bufferViews instanceof Array))
         return;

      for (const bufferView of bufferViews)
         bufferView .buffer = this .buffers [bufferView .buffer];

      this .bufferViews = bufferViews;
   },
   accessorsArray: function (accessors)
   {
      if (!(accessors instanceof Array))
         return;

      for (const accessor of accessors)
         this .accessorObject (accessor);

      this .accessors = accessors;
   },
   accessorObject: (function ()
   {
      const arrayTypes = new Map ([
         [5120, Int8Array],
         [5121, Uint8Array],
         [5122, Int16Array],
         [5123, Uint16Array],
         [5124, Int32Array],
         [5125, Uint32Array],
         [5126, Float32Array],
      ]);

      const componentSizes = new Map ([
         ["SCALAR", 1],
         ["VEC2",   2],
         ["VEC3",   3],
         ["VEC4",   4],
         ["MAT2",   4],
         ["MAT3",   9],
         ["MAT4",   16],
      ]);

      return function (accessor)
      {
         if (!(accessor instanceof Object))
            return;

         const
            bufferView = this .bufferViews [accessor .bufferView],
            arrayType  = arrayTypes .get (accessor .componentType),
            byteOffset = (accessor .byteOffset || 0) + (bufferView .byteOffset || 0),
            byteStride = bufferView .byteStride,
            components = componentSizes .get (accessor .type),
            length     = (byteStride ? byteStride / arrayType .BYTES_PER_ELEMENT : components) * accessor .count;

         accessor .bufferView = bufferView;
         accessor .array      = new arrayType (bufferView .buffer, byteOffset, length);
         accessor .components = components;
      };
   })(),
   samplersObject: function (samplers)
   {
      if (!(samplers instanceof Object))
         return;
   },
   imagesObject: function (images)
   {
      if (!(images instanceof Object))
         return;
   },
   texturesObject: function (textures)
   {
      if (!(textures instanceof Object))
         return;
   },
   materialsObject: function (materials)
   {
      if (!(materials instanceof Object))
         return;

      this .materials = [ ];
   },
   meshesArray: function (meshes)
   {
      if (!(meshes instanceof Array))
         return;

      for (const mesh of meshes)
         this .meshObject (mesh);

      this .meshes = meshes;
   },
   meshObject: function (mesh)
   {
      if (!(mesh instanceof Object))
         return;

      mesh .shapeNodes = this .primitivesArray (mesh .primitives);
   },
   primitivesArray: function (primitives)
   {
      if (!(primitives instanceof Array))
         return [ ];

      const shapeNodes = [ ];

      for (const primitive of primitives)
         this .primitiveValue (primitive, shapeNodes);

      return shapeNodes;
   },
   primitiveValue: function (primitive, shapeNodes)
   {
      if (!(primitive instanceof Object))
         return;

      this .attributesValue (primitive .attributes);
      this .targetsArray    (primitive .targets);

      primitive .indices   = this .accessors [primitive .indices];
      primitive .material  = this .materials [primitive .material];

      shapeNodes .push (this .createShape (primitive));
   },
   attributesValue: function (attributes)
   {
      if (!(attributes instanceof Object))
         return;

      attributes .TANGENT  = this .accessors [attributes .TANGENT];
      attributes .NORMAL   = this .accessors [attributes .NORMAL];
      attributes .POSITION = this .accessors [attributes .POSITION];

      attributes .TEXCOORD = [ ];
      attributes .COLOR    = [ ];
      attributes .JOINTS   = [ ];
      attributes .WEIGHTS  = [ ];

      for (let i = 0; attributes ["TEXCOORD_" + i] ; ++ i)
         attributes .TEXCOORD .push (this .accessors [attributes ["TEXCOORD_" + i]]);

      for (let i = 0; attributes ["COLOR_" + i] ; ++ i)
         attributes .COLOR .push (this .accessors [attributes ["COLOR_" + i]]);

      for (let i = 0; attributes ["JOINTS_" + i] ; ++ i)
         attributes .JOINTS .push (this .accessors [attributes ["JOINTS_" + i]]);

      for (let i = 0; attributes ["WEIGHTS_" + i] ; ++ i)
         attributes .WEIGHTS .push (this .accessors [attributes ["WEIGHTS_" + i]]);
   },
   targetsArray: function (targets)
   {
      if (!(targets instanceof Array))
         return;
   },
   nodesArray: function (nodes)
   {
      if (!(nodes instanceof Array))
         return;

      this .nodes = nodes;

      for (const node of nodes)
         this .nodeValue1 (node);

      for (const node of nodes)
         this .nodeValue2 (node);
   },
   nodeValue1: function (node)
   {
      if (!(node instanceof Object))
         return;

      // Create Transform.

      const
         scene         = this .getScene (),
         transformNode = scene .createNode ("Transform", false),
         name          = this .sanitizeName (node .name);

      // Name

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), transformNode);

      // Transformation Matrix

      const
         translation      = new Vector3 (0, 0, 0),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1, 1, 1),
         scaleOrientation = new Rotation4 (),
         matrix           = new Matrix4 ();

      if (!this .vectorValue (node .matrix, matrix))
      {
         if (this .vectorValue (node .scale, scale))
            matrix .scale (scale);

         if (this .vectorValue (node .rotation, rotation))
            matrix .rotate (rotation);

         if (this .vectorValue (node .translation, translation))
            matrix .translate (translation);
      }

      matrix .get (translation, rotation, scale, scaleOrientation);

      transformNode ._translation      = translation;
      transformNode ._rotation         = rotation;
      transformNode ._scale            = scale;
      transformNode ._scaleOrientation = scaleOrientation;

      // Add mesh.

      if (Number .isInteger (node .mesh))
      {
         const mesh = this .meshes [node .mesh];

         if (mesh)
            transformNode ._children = mesh .shapeNodes;
      }

      node .transformNode = transformNode;
   },
   nodeValue2: function (node)
   {
      if (!(node instanceof Object))
         return;

      this .nodeChildrenArray (node .children, node .transformNode);

      node .transformNode .setup ();
   },
   nodeChildrenArray: function (children, transformNode)
   {
      if (!(children instanceof Array))
         return;

      for (const index of children)
      {
         const child = this .nodes [index];

         if (child)
            transformNode ._children .push (child .transformNode);
      }
   },
   scenesArray: function (scenes, sceneNumber)
   {
      if (!(scenes instanceof Array))
         return;

      // Root

      const
         scene      = this .getScene (),
         switchNode = scene .createNode ("Switch", false);

      scene .addNamedNode (scene .getUniqueName ("Scenes"), switchNode);

      // Scenes.

      switchNode ._whichChoice = sceneNumber;
      switchNode ._children    = scenes .map (scene => this .sceneObject (scene));

      switchNode .setup ();

      scene .getRootNodes () .push (switchNode);
   },
   sceneObject: function (sceneObject)
   {
      if (!(sceneObject instanceof Object))
         return null;

      const nodes = this .sceneNodesArray (sceneObject .nodes);

      switch (nodes .length)
      {
         case 0:
         {
            return null;
         }
         case 1:
         {
            return nodes [0] .transformNode;
         }
         default:
         {
            const
               scene     = this .getScene (),
               groupNode = scene .createNode ("Group", false),
               name      = this .sanitizeName (sceneObject .name);

            if (name)
               scene .addNamedNode (scene .getUniqueName (name), groupNode);

            groupNode ._children = nodes .map (node => node .transformNode);

            groupNode .setup ();

            return groupNode;
         }
      }
   },
   sceneNodesArray: function (nodes)
   {
      if (!(nodes instanceof Array))
         return [ ];

      return nodes .map (node => this .nodes [node]) .filter (node => node);
   },
   sceneNumber: function (scene)
   {
      if (typeof scene !== "number")
         return;
   },
   animationsObject: function (animations)
   {
      if (!(animations instanceof Object))
         return;
   },
   skinsObject: function (skins)
   {
      if (!(skins instanceof Object))
         return;
   },
   createShape: function (primitive)
   {
      const
         scene          = this .getScene (),
         shapeNode      = scene .createNode ("Shape", false),
         appearanceNode = primitive .appearanceNode || this .createAppearance (),
         geometryNode   = this .createGeometry (primitive);

      shapeNode ._appearance = appearanceNode;
      shapeNode ._geometry   = geometryNode;

      shapeNode .setup ();

      return shapeNode;
   },
   createAppearance: function ()
   {
      const
         scene          = this .getScene (),
         appearanceNode = scene .createNode ("Appearance", false),
         materialNode   = scene .createNode ("Material", false);

      appearanceNode ._material = materialNode;

      materialNode   .setup ();
      appearanceNode .setup ();

      return appearanceNode;
   },
   createGeometry: function (primitive)
   {
      switch (primitive .mode)
      {
         case 0: // POINTS
         {
            return null;
         }
         case 1: // LINES
         {
            return null;
         }
         case 2: // LINE_LOOP
         {
            return null;
         }
         case 3: // LINE_STRIP
         {
            return null;
         }
         default:
         case 4: // TRIANGLES
         {
            if (primitive .indices)
               return this .createIndexedTriangleSet (primitive);

            return this .createTriangleSet (primitive);
         }
         case 5: // TRIANGLE_STRIP
         {
            return null;
         }
         case 6: // TRIANGLE_FAN
         {
            return null;
         }
      }
   },
   createIndexedTriangleSet: function ({ attributes, indices, material })
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("IndexedTriangleSet", false);

      geometryNode ._index    = this .getArray (indices);
      geometryNode ._color    = this .createColor (attributes .COLOR);
      geometryNode ._texCoord = this .createTextureCoordinate (attributes .TEXCOORD);
      geometryNode ._normal   = this .createNormal (attributes .NORMAL);
      geometryNode ._coord    = this .createCoordinate (attributes .POSITION);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._normalPerVertex = geometryNode ._normal;

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleSet: function ({ attributes, material })
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("TriangleSet", false);

      geometryNode ._color    = this .createColor (attributes .COLOR);
      geometryNode ._texCoord = this .createTextureCoordinate (attributes .TEXCOORD);
      geometryNode ._normal   = this .createNormal (attributes .NORMAL);
      geometryNode ._coord    = this .createCoordinate (attributes .POSITION);

      geometryNode ._solid = material ? ! material .doubleSided : true;

      geometryNode .setup ();

      return geometryNode;
   },
   createColor: function (color)
   {
      if (!color)
         return null;

      switch (color .type)
      {
         case "VEC3":
         {
            const
               scene     = this .getScene (),
               colorNode = scene .createNode ("Color", false);

            colorNode ._color = this .getArray (color);

            colorNode .setup ();

            return colorNode;
         }
         case "VEC4":
         {
            const
               scene     = this .getScene (),
               colorNode = scene .createNode ("ColorRGBA", false);

            colorNode ._color = this .getArray (color);

            colorNode .setup ();

            return colorNode;
         }
      }

      return null;
   },
   createTextureCoordinate: function (texCoords)
   {
      switch (texCoords .length)
      {
         case 0:
            return null;
         case 1:
            return null;
         default:
            return null;
      }
   },
   createNormal: function (normal)
   {
      if (!normal || normal .type !== "VEC3")
         return null;

      const
         scene      = this .getScene (),
         normalNode = scene .createNode ("Normal", false);

      normalNode ._vector = this .getArray (normal);

      normalNode .setup ();

      return normalNode;
   },
   createCoordinate: function (position)
   {
      if (!position || position .type !== "VEC3")
         return null;

      const
         scene          = this .getScene (),
         coordinateNode = scene .createNode ("Coordinate", false);

      coordinateNode ._point = this .getArray (position);

      coordinateNode .setup ();

      return coordinateNode;
   },
   getArray: function ({ array, bufferView, components, count })
   {
      const stride = (bufferView .byteStride / array .constructor .BYTES_PER_ELEMENT) || components;

      if (stride === components)
         return array;

      const
         length = count * components,
         result = new (array .constructor) (length);

      for (let i = 0, j = 0; i < length; j += stride)
      {
         for (let c = 0; c < components; ++ c, ++ i)
            result [i] = array [j + c];
      }

      return result;
   },
   vectorValue: function (array, vector)
   {
      if (!(array instanceof Array))
         return;

      vector .set (... array);
   },
});

export default GLTFParser;
