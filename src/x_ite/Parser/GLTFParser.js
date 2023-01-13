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

   this .buffers = [ ];
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
      if (!(obj instanceof Object))
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

      this .assetObject (obj .asset);

      await this .buffersObject (obj .buffers);

      this .bufferViewsObject (obj .bufferViews);
      this .accessorsObject   (obj .accessors);
      this .samplersObject    (obj .samplers);
      this .imagesObject      (obj .images);
      this .texturesObject    (obj .textures);
      this .materialsObject   (obj .materials);
      this .meshesObject      (obj .meshes);
      this .nodesObject       (obj .nodes);
      this .scenesObject      (obj .scenes);
      this .sceneNumber       (obj .scene);
      this .animationsObject  (obj .animations);
      this .skinsObject       (obj .skins);

      return this .getScene ();
   },
   assetObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;

      const
         scene         = this .getScene (),
         worldURL      = scene .getWorldURL (),
         worldInfoNode = scene .createNode ("WorldInfo", false);

      worldInfoNode ._title = decodeURI (new URL (worldURL) .pathname .split ("/") .at (-1) || worldURL);

      for (const key in obj)
         worldInfoNode ._info .push (`${key}: ${obj [key]}`);

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   buffersObject: async function (obj)
   {
      if (!(obj instanceof Array))
         return;

      this .buffers = await Promise .all (obj .map (buffer => this .bufferValue (buffer)));
   },
   bufferValue: function (obj)
   {
      if (!(obj instanceof Object))
         return;

      const url = new URL (obj .uri, this .getScene () .getWorldURL ());

      return fetch (url)
         .then (response => response .blob ())
         .then (blob => blob .arrayBuffer ());
   },
   bufferViewsObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   accessorsObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   samplersObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   imagesObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   texturesObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   materialsObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   meshesObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   nodesObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   scenesObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   sceneNumber: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   animationsObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
   skinsObject: function (obj)
   {
      if (!(obj instanceof Object))
         return;
   },
});

export default GLTFParser;
