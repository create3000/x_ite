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

function GLTFParser (scene)
{
   X3DParser .call (this, scene);
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
      this .nodesObject       (glTF .nodes);
      this .scenesObject      (glTF .scenes);
      this .sceneNumber       (glTF .scene);
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

      for (const key in asset)
         worldInfoNode ._info .push (`${key}: ${asset [key]}`);

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   buffersArray: async function (buffers)
   {
      if (!(buffers instanceof Array))
      {
         this .buffers = [ ];
         return;
      }

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
      {
         this .bufferViews = [ ];
         return;
      }

      for (const bufferView of bufferViews)
         bufferView .buffer = this .buffers [bufferView .buffer];

      this .bufferViews = bufferViews;
   },
   accessorsArray: function (accessors)
   {
      if (!(accessors instanceof Array))
      {
         this .accessors = [ ];
         return;
      }

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

         accessor .array = new arrayType (bufferView .buffer, byteOffset, length);
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

      this .primitivesArray (mesh .primitives);
   },
   primitivesArray: function (primitives)
   {
      if (!(primitives instanceof Array))
         return;

      for (const primitive of primitives)
         this .primitiveValue (primitive);
   },
   primitiveValue: function (primitive)
   {
      if (!(primitive instanceof Object))
         return;

      console .log (primitive);

      // // attributes

      // auto attributes = attributesValue (json_object_object_get (jobj, "attributes"));

      // if (not attributes)
      //    return nullptr;

      // const auto primitive = std::make_shared <Primitive> ();

      // primitive -> attributes = std::move (attributes);

      // // indices

      // int32_t indices = -1;

      // integerValue (json_object_object_get (jobj, "indices"), indices);

      // if (indices > -1 and size_t (indices) < accessors .size ())
      // {
      //    const auto & asseccor = accessors [indices];

      //    if (not asseccor)
      //       return nullptr;

      //    primitive -> indices = asseccor;
      // }

      // // material

      // int32_t material = -1;

      // if (integerValue (json_object_object_get (jobj, "material"), material))
      // {
      //    try
      //    {
      //       primitive -> material = materials .at (material);
      //    }
      //    catch (const std::out_of_range & error)
      //    {
      //       getBrowser () -> getConsole () -> error ("Material with index '", material, "' not found.\n");
      //    }
      // }

      // // mode

      // int32_t mode = 4;

      // integerValue (json_object_object_get (jobj, "mode"), mode);

      // primitive -> mode = mode;

      // // targets

      // primitive -> targets = targetsValue (json_object_object_get (jobj, "targets"));

      // // shapeNode

      // primitive -> shapeNode = createShape (primitive);

   },
   nodesObject: function (nodes)
   {
      if (!(nodes instanceof Object))
         return;
   },
   scenesObject: function (scenes)
   {
      if (!(scenes instanceof Object))
         return;
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
});

export default GLTFParser;
