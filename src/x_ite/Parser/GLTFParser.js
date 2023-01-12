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
   rootObject: async function (obj)
   {
      if (! this .object (obj))
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

      await this .assetObject       (obj .asset);
      await this .buffersObject     (obj .buffers);
      await this .bufferViewsObject (obj .bufferViews);
      await this .accessorsObject   (obj .accessors);
      await this .samplersObject    (obj .samplers);
      await this .imagesObject      (obj .images);
      await this .texturesObject    (obj .textures);
      await this .materialsObject   (obj .materials);
      await this .meshesObject      (obj .meshes);
      await this .nodesObject       (obj .nodes);
      await this .scenesObject      (obj .scenes);
      await this .sceneNumber       (obj .scene);
      await this .animationsObject  (obj .animations);
      await this .skinsObject       (obj .skins);

      return this .getScene ();
   },
   assetObject: async function (obj)
   {
      if (! this .object (obj))
         return;

      const
         scene         = this .getScene (),
         worldURL      = scene .getWorldURL (),
         worldInfoNode = scene .createNode ("WorldInfo", false);

      worldInfoNode ._title = decodeURI (new URL (worldURL) .pathname .split ("/") .at (-1) || worldURL);

      for (const [key, value] of Object .entries (obj))
         worldInfoNode ._info .push (`${key}: ${this .string (value)}`);

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   buffersObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   bufferViewsObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   accessorsObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   samplersObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   imagesObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   texturesObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   materialsObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   meshesObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   nodesObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   scenesObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   sceneNumber: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   animationsObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   skinsObject: async function (obj)
   {
      if (! this .object (obj))
         return;
   },
   boolean: function (value)
   {
      if (typeof value === "boolean")
         return value;

      throw new Error ("Expected a boolean.");
   },
   number: function (value)
   {
      if (typeof value === "number")
         return value;

      throw new Error ("Expected a number.");
   },
   string: function (value)
   {
      if (typeof value === "string")
         return value;

      throw new Error ("Expected a string.");
   },
   object: function (obj)
   {
      if (obj instanceof Object)
         return true;

      return false;
   },
});

export default GLTFParser;
