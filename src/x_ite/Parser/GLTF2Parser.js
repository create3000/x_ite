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

import X3DParser    from "./X3DParser.js";
import X3DOptimizer from "./X3DOptimizer.js";
import Vector2      from "../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Quaternion   from "../../standard/Math/Numbers/Quaternion.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix3      from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Color3       from "../../standard/Math/Numbers/Color3.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";
import Algorithm    from "../../standard/Math/Algorithm.js";
import DEBUG        from "../DEBUG.js"

// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
// https://github.com/KhronosGroup/glTF-Sample-Models

const
   STEP_TIME          = 1e-4, // in seconds
   SAMPLES_PER_SECOND = 30;   // in 1/s

function GLTF2Parser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeGroups         = false;
   this .removeEmptyGroups    = true;
   this .combineGroupingNodes = true;

   // Globals

   this .lights                = [ ];
   this .usedLights            = 0;
   this .buffers               = [ ];
   this .bufferViews           = [ ];
   this .accessors             = [ ];
   this .samplers              = [ ];
   this .materials             = [ ];
   this .textureTransformNodes = new Map ();
   this .cameras               = [ ];
   this .viewpoints            = [ ];
   this .nodes                 = [ ];
   this .animations            = 0;
}

GLTF2Parser .prototype = Object .assign (Object .create (X3DParser .prototype),
   X3DOptimizer .prototype,
{
   constructor: GLTF2Parser,
   getEncoding: function ()
   {
      return "JSON";
   },
   isValid: (function ()
   {
      const keys = new Set ([
         "asset",
         "extra",
         "extensions",
         "extensionsRequired",
         "extensionsUsed",
         "buffers",
         "bufferViews",
         "accessors",
         "samplers",
         "images",
         "textures",
         "materials",
         "meshes",
         "cameras",
         "nodes",
         "scenes",
         "scene",
         "animations",
         "skins",
      ]);

      return function ()
      {
         if (!(this .input instanceof Object))
            return false;

         if (!Object .keys (this .input) .every (key => keys .has (key)))
            return false;

         const asset = this .input .asset;

         if (!(asset instanceof Object && asset .version === "2.0"))
            return false;

         return true;
      };
   })(),
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
   setBuffers: function (buffers)
   {
      this .buffers = buffers;
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

      await this .loadComponents ();

      // Parse root objects.

      this .assetObject      (glTF .asset);
      this .extensionsObject (glTF .extensions);

      await this .buffersArray (glTF .buffers);

      this .bufferViewsArray (glTF .bufferViews);
      this .accessorsArray   (glTF .accessors);
      this .samplersArray    (glTF .samplers);

      await this .imagesArray (glTF .images);

      this .texturesArray   (glTF .textures);
      this .materialsArray  (glTF .materials);
      this .meshesArray     (glTF .meshes);
      this .camerasArray    (glTF .cameras);
      this .nodesArray      (glTF .nodes);
      this .scenesArray     (glTF .scenes, glTF .scene);
      this .animationsArray (glTF .animations);
      this .skinsArray      (glTF .skins);

      this .optimizeSceneGraph (this .getExecutionContext () .getRootNodes ());

      return this .getScene ();
   },
   assetObject: function (asset)
   {
      if (!(asset instanceof Object))
         return;

      const
         scene         = this .getExecutionContext (),
         worldURL      = scene .getWorldURL (),
         worldInfoNode = scene .createNode ("WorldInfo", false);

      for (const [key, value] of Object .entries (asset))
      {
         if (typeof value !== "string")
            continue;

         worldInfoNode ._info .push (`${key}: ${value}`);
      }

      if (asset .extras instanceof Object)
      {
         for (const [key, value] of Object .entries (asset .extras))
         {
            if (typeof value !== "string")
               continue;

            if (key === "title")
               worldInfoNode ._title = value;
            else
               worldInfoNode ._info .push (`${key}: ${value}`);
         }
      }

      worldInfoNode ._info .sort ();

      if (!worldInfoNode ._title .getValue ())
         worldInfoNode ._title = decodeURI (new URL (worldURL) .pathname .split ("/") .at (-1) || worldURL);

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   extensionsObject: function (extensions)
   {
      if (!(extensions instanceof Object))
         return;

      for (const [key, value] of Object .entries (extensions))
      {
         switch (key)
         {
            case "KHR_lights_punctual":
               return this .khrLightsPunctualObject (value);
         }
      }
   },
   khrLightsPunctualObject: function (khrLightsPunctual)
   {
      if (!(khrLightsPunctual instanceof Object))
         return;

      this .lightsArray (khrLightsPunctual .lights);
   },
   lightsArray: function (lights)
   {
      if (!(lights instanceof Array))
         return;

      this .lights = lights;
   },
   lightObject: function (light)
   {
      if (!(light instanceof Object))
         return null;

      const lightNode = this .lightType (light);

      if (!lightNode)
         return null;

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (light .name);

      if (light .color instanceof Array)
         lightNode ._color = new Color3 (... light .color);

      lightNode ._intensity = this .numberValue (light .intensity, 1);

      lightNode .setup ();

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), lightNode);

      return lightNode;
   },
   lightType: function (light)
   {
      switch (light .type)
      {
         case "directional":
            return this .directionalLight (light);
         case "spot":
            return this .spotLight (light);
         case "point":
            return this .pointLight (light);
      }
   },
   directionalLight: function (light)
   {
      const
         scene     = this .getExecutionContext (),
         lightNode = scene .createNode ("DirectionalLight", false);

      return lightNode;
   },
   spotLight: function (light)
   {
      const
         scene     = this .getExecutionContext (),
         lightNode = scene .createNode ("SpotLight", false);

      lightNode ._radius      = this .numberValue (light .range, 0) || 1_000_000_000;
      lightNode ._cutOffAngle = this .numberValue (light .outerConeAngle, Math .PI / 4);
      lightNode ._beamWidth   = this .numberValue (light .innerConeAngle, 0);
      lightNode ._attenuation = new Vector3 (0, 0, 1);

      return lightNode;
   },
   pointLight: function (light)
   {
      const
         scene     = this .getExecutionContext (),
         lightNode = scene .createNode ("PointLight", false);

      lightNode ._radius      = this .numberValue (light .range, 0) || 1_000_000_000;
      lightNode ._attenuation = new Vector3 (0, 0, 1);

      return lightNode;
   },
   buffersArray: async function (buffers)
   {
      if (!(buffers instanceof Array))
         return;

      this .buffers = await Promise .all (buffers .map ((buffer, i) => this .bufferObject (buffer, i)));
   },
   bufferObject: function (buffer, i)
   {
      if (!(buffer instanceof Object))
         return;

      if (!buffer .uri)
         return Promise .resolve (this .buffers [i]);

      const url = new URL (buffer .uri, this .getExecutionContext () .getWorldURL ());

      return fetch (url)
         .then (response => response .blob ())
         .then (blob => blob .arrayBuffer ())
         .then (arrayBuffer => $.ungzip (arrayBuffer));
   },
   bufferViewsArray: function (bufferViews)
   {
      if (!(bufferViews instanceof Array))
         return;

      this .bufferViews = bufferViews;

      for (const bufferView of bufferViews)
         bufferView .buffer = this .bufferViewObject (bufferView);
   },
   bufferViewObject: function (bufferView)
   {
      if (!(bufferView instanceof Object))
         return;

      const buffer = this .buffers [bufferView .buffer];

      if (!buffer)
         return;

      const
         byteOffset = bufferView .byteOffset || 0,
         byteLength = bufferView .byteLength;

      return buffer .slice (byteOffset, byteOffset + byteLength);
   },
   accessorsArray: function (accessors)
   {
      if (!(accessors instanceof Array))
         return;

      this .accessors = accessors;

      for (const accessor of accessors)
         this .accessorObject (accessor);
   },
   accessorObject: (function ()
   {
      const TypedArrays = new Map ([
         [5120, Int8Array],
         [5121, Uint8Array],
         [5122, Int16Array],
         [5123, Uint16Array],
         [5124, Int32Array],
         [5125, Uint32Array],
         [5126, Float32Array],
      ]);

      const Components = new Map ([
         ["SCALAR", 1],
         ["VEC2",   2],
         ["VEC3",   3],
         ["VEC4",   4],
         ["MAT2",   4],
         ["MAT3",   9],
         ["MAT4",   16],
      ]);

      const DefaultBufferView =
      {
         "buffer": new ArrayBuffer (0),
         "byteOffset": 0,
         "byteLength": 0,
      };

      return function (accessor)
      {
         if (!(accessor instanceof Object))
            return;

         Object .defineProperty (accessor, "array",
         {
            get: () =>
            {
               const
                  TypedArray = TypedArrays .get (accessor .componentType),
                  bufferView = this .bufferViews [accessor .bufferView] || DefaultBufferView,
                  byteOffset = accessor .byteOffset || 0,
                  byteStride = bufferView .byteStride || 0,
                  components = Components .get (accessor .type),
                  count      = accessor .count || 0,
                  stride     = byteStride ? byteStride / TypedArray .BYTES_PER_ELEMENT : components,
                  length     = stride * count,
                  array      = new TypedArray (bufferView .buffer, byteOffset, length);

               if (stride === components)
               {
                  Object .defineProperty (accessor, "array", { value: array });

                  return array;
               }
               else
               {
                  const
                     length = count * components,
                     dense  = new TypedArray (length);

                  for (let i = 0, j = 0; i < length; j += stride)
                  {
                     for (let c = 0; c < components; ++ c, ++ i)
                        dense [i] = array [j + c];
                  }

                  Object .defineProperty (accessor, "array", { value: dense });

                  return dense;
               }
            },
            configurable: true,
         });
      };
   })(),
   samplersArray: function (samplers)
   {
      if (!(samplers instanceof Array))
         return;

      this .samplers = samplers;

      for (const sampler of samplers)
         this .samplerObject (sampler);
   },
   samplerObject: (function ()
   {
      const MinificationFilters = new Map ([
         [9728, ["NEAREST_PIXEL",                false]],
         [9729, ["AVG_PIXEL",                    false]],
         [9984, ["NEAREST_PIXEL_NEAREST_MIPMAP", true]],
         [9985, ["AVG_PIXEL_NEAREST_MIPMAP",     true]],
         [9986, ["NEAREST_PIXEL_AVG_MIPMAP",     true]],
         [9987, ["AVG_PIXEL_AVG_MIPMAP",         true]],
      ]);

      const MagnificationFilters = new Map ([
         [9728, "NEAREST_PIXEL"],
         [9729, "AVG_PIXEL"],
      ]);

	   const BoundaryModes = new Map ([
         [33071, "CLAMP_TO_EDGE"],
         [33648, "MIRRORED_REPEAT"],
         [10497, "REPEAT"],
      ]);

      return function (sampler)
      {
         if (!(sampler instanceof Object))
            return;

         Object .defineProperty (sampler, "texturePropertiesNode",
         {
            get: () =>
            {
               const
                  scene                 = this .getExecutionContext (),
                  texturePropertiesNode = scene .createNode ("TextureProperties", false),
                  name                  = this .sanitizeName (sampler .name);

               if (name)
                  scene .addNamedNode (scene .getUniqueName (name), texturePropertiesNode);

               // minFilter

               const minificationFilter = MinificationFilters .get (sampler .minFilter) || ["AVG_PIXEL", false];

               texturePropertiesNode ._minificationFilter = minificationFilter [0];
               texturePropertiesNode ._generateMipMaps    = minificationFilter [1];

               // magFilter

               texturePropertiesNode ._magnificationFilter = MagnificationFilters .get (sampler .magFilter) || "AVG_PIXEL";

               // boundaryMode

               texturePropertiesNode ._boundaryModeS = BoundaryModes .get (sampler .wrapS) || "REPEAT";
               texturePropertiesNode ._boundaryModeT = BoundaryModes .get (sampler .wrapT) || "REPEAT";

               // setup

               texturePropertiesNode .setup ();

               Object .defineProperty (sampler, "texturePropertiesNode", { value: texturePropertiesNode });

               return texturePropertiesNode;
            },
            configurable: true,
         });
      };
   })(),
   imagesArray: async function (images)
   {
      if (!(images instanceof Array))
         return;

      this .images = await Promise .all (images .map (image => this .imageObject (image)));
   },
   imageObject: async function (image)
   {
      if (!(image instanceof Object))
         return;

      if (image .uri)
         return image;

      const bufferView = this .bufferViews [image .bufferView];

      if (!bufferView)
         return image;

      const
         buffer = bufferView .buffer,
         blob   = new Blob ([new Uint8Array (buffer)], { type: image .mimeType }),
         uri    = await this .blobToDataUrl (blob);

      image .uri = uri;

      return image;
   },
   blobToDataUrl: function (blob)
   {
      return new Promise ((resolve, reject) =>
      {
         const fileReader = new FileReader ();

         fileReader .onload  = resolve;
         fileReader .onerror = reject;

         fileReader .readAsDataURL (blob);
      })
      .then (event => event .target .result);
   },
   texturesArray: function (textures)
   {
      if (!(textures instanceof Array))
         return;

      this .textures = textures;
   },
   textureObject: function (texture)
   {
      if (!(texture instanceof Object))
         return;

      const image = this .images [texture .source];

      if (!image)
         return null;

      if (texture .textureNode)
         return texture .textureNode;

      const
         scene       = this .getExecutionContext (),
         textureNode = scene .createNode ("ImageTexture", false),
         name        = this .sanitizeName (texture .name || image .name);

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), textureNode);

      textureNode ._url            = [image .uri];
      textureNode ._flipVertically = true;

      const sampler = this .samplers [texture .sampler];

      if (sampler instanceof Object)
         textureNode ._textureProperties = sampler .texturePropertiesNode;

      textureNode .setup ();

      return texture .textureNode = textureNode;
   },
   materialsArray: function (materials)
   {
      if (!(materials instanceof Array))
         return;

      this .materials = materials;
   },
   materialObject: function (material)
   {
      if (!(material instanceof Object))
         return this .getDefaultAppearance ();

      if (material .appearanceNode)
         return material .appearanceNode;

      if (!(material .extensions instanceof Object))
         material .extensions = { };

      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance", false),
         name           = this .sanitizeName (material .name);

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), appearanceNode);

      appearanceNode ._alphaMode   = material .alphaMode || "OPAQUE";
      appearanceNode ._alphaCutoff = this .numberValue (material .alphaCutoff, 0.5);

      const
         materialNode   = this .materialObjectMaterial (material),
         emissiveFactor = new Color3 (0, 0, 0);

      if (!material .extensions .KHR_materials_unlit)
      {
         if (this .vectorValue (material .emissiveFactor, emissiveFactor))
            materialNode ._emissiveColor = emissiveFactor;

         materialNode ._emissiveTextureMapping = this .textureMapping (material .emissiveTexture);
         materialNode ._emissiveTexture        = this .textureInfo    (material .emissiveTexture);
      }

      this .occlusionTextureInfo (material .occlusionTexture, materialNode);
      this .normalTextureInfo    (material .normalTexture,    materialNode);
      this .materialExtensions   (material .extensions,       materialNode);

      materialNode .setup ();

      appearanceNode ._material         = materialNode;
      appearanceNode ._textureTransform = this .createMultiTextureTransform (materialNode);

      appearanceNode .setup ();

      return material .appearanceNode = appearanceNode;
   },
   materialObjectMaterial: function (material)
   {
      const materials = [
         this .pbrMetallicRoughnessObject .bind (this, material .pbrMetallicRoughness),
         this .pbrSpecularGlossinessObject .bind (this, material .extensions .KHR_materials_pbrSpecularGlossiness),
         this .pbrMetallicRoughnessObject .bind (this, { }),
      ];

      const unlit = material .extensions .KHR_materials_unlit;

      for (const material of materials)
      {
         const materialNode = material (unlit);

         if (materialNode)
            return materialNode;
      }
   },
   pbrMetallicRoughnessObject: function (pbrMetallicRoughness, unlit)
   {
      if (!(pbrMetallicRoughness instanceof Object))
         return null;

      if (unlit)
      {
         const
            scene        = this .getExecutionContext (),
            materialNode = scene .createNode ("PhysicalMaterial", false);

         const
            baseColorFactor = new Color4 (0, 0, 0, 0),
            baseColor       = new Color3 (0, 0, 0);

         materialNode ._baseColor = Color3 .Black;

         if (this .vectorValue (pbrMetallicRoughness .baseColorFactor, baseColorFactor))
         {
            materialNode ._emissiveColor = baseColor .set (... baseColorFactor);
            materialNode ._transparency  = 1 - baseColorFactor .a;
         }
         else
         {
            materialNode ._emissiveColor = Color3 .White;
         }

         materialNode ._emissiveTextureMapping = this .textureMapping (pbrMetallicRoughness .baseColorTexture);
         materialNode ._emissiveTexture        = this .textureInfo    (pbrMetallicRoughness .baseColorTexture);

         return materialNode;
      }
      else
      {
         const
            scene        = this .getExecutionContext (),
            materialNode = scene .createNode ("PhysicalMaterial", false);

         const
            baseColorFactor = new Color4 (0, 0, 0, 0),
            baseColor       = new Color3 (0, 0, 0);

         if (this .vectorValue (pbrMetallicRoughness .baseColorFactor, baseColorFactor))
         {
            materialNode ._baseColor    = baseColor .set (... baseColorFactor);
            materialNode ._transparency = 1 - baseColorFactor .a;
         }

         materialNode ._metallic  = this .numberValue (pbrMetallicRoughness .metallicFactor,  1);
         materialNode ._roughness = this .numberValue (pbrMetallicRoughness .roughnessFactor, 1);

         materialNode ._baseTextureMapping              = this .textureMapping (pbrMetallicRoughness .baseColorTexture);
         materialNode ._baseTexture                     = this .textureInfo    (pbrMetallicRoughness .baseColorTexture);
         materialNode ._metallicRoughnessTextureMapping = this .textureMapping (pbrMetallicRoughness .metallicRoughnessTexture);
         materialNode ._metallicRoughnessTexture        = this .textureInfo    (pbrMetallicRoughness .metallicRoughnessTexture);

         return materialNode;
      }
   },
   pbrSpecularGlossinessObject: function (pbrSpecularGlossiness, unlit)
   {
      if (!(pbrSpecularGlossiness instanceof Object))
         return null;

      if (unlit)
      {
         const
            scene        = this .getExecutionContext (),
            materialNode = scene .createNode ("UnlitMaterial", false);

         const
            diffuseFactor = new Color4 (0, 0, 0, 0),
            diffuseColor  = new Color3 (0, 0, 0);

         if (this .vectorValue (pbrSpecularGlossiness .diffuseFactor, diffuseFactor))
         {
            materialNode ._emissiveColor = diffuseColor .set (... diffuseFactor);
            materialNode ._transparency  = 1 - diffuseFactor .a;
         }

         materialNode ._emissiveTextureMapping = this .textureMapping (pbrSpecularGlossiness .diffuseTexture);
         materialNode ._emissiveTexture        = this .textureInfo    (pbrSpecularGlossiness .diffuseTexture);

         return materialNode;
      }
      else
      {
         const
            scene        = this .getExecutionContext (),
            materialNode = scene .createNode ("Material", false);

         const
            diffuseFactor  = new Color4 (0, 0, 0, 0),
            diffuseColor   = new Color3 (0, 0, 0),
            specularFactor = new Color3 (0, 0, 0);

         if (this .vectorValue (pbrSpecularGlossiness .diffuseFactor, diffuseFactor))
         {
            materialNode ._diffuseColor = diffuseColor .set (... diffuseFactor);
            materialNode ._transparency = 1 - diffuseFactor .a;
         }
         else
         {
            materialNode ._diffuseColor = Color3 .White;
         }

         if (this .vectorValue (pbrSpecularGlossiness .specularFactor, specularFactor))
            materialNode ._specularColor = specularFactor;
         else
            materialNode ._specularColor = Color3 .White;

         materialNode ._shininess = this .numberValue (pbrSpecularGlossiness .glossinessFactor, 1);

         materialNode ._diffuseTextureMapping   = this .textureMapping (pbrSpecularGlossiness .diffuseTexture);
         materialNode ._diffuseTexture          = this .textureInfo    (pbrSpecularGlossiness .diffuseTexture);
         materialNode ._specularTextureMapping  = this .textureMapping (pbrSpecularGlossiness .specularGlossinessTexture);
         materialNode ._specularTexture         = this .textureInfo    (pbrSpecularGlossiness .specularGlossinessTexture);
         materialNode ._shininessTextureMapping = this .textureMapping (pbrSpecularGlossiness .specularGlossinessTexture);
         materialNode ._shininessTexture        = this .textureInfo    (pbrSpecularGlossiness .specularGlossinessTexture);

         return materialNode;
      }
   },
   // gamma: function (color)
   // {
   //    for (let i = 0; i < 3; ++ i)
   //       color [i] = Math .pow (color [i], 1.0 / 2.2);

   //    return color;
   // },
   textureMapping: function (texture)
   {
      if (!(texture instanceof Object))
         return "";

      return "TEXCOORD_" + (texture .texCoord || 0);
   },
   occlusionTextureInfo: function (occlusionTexture, materialNode)
   {
      if (!(occlusionTexture instanceof Object))
         return null;

      materialNode ._occlusionStrength       = this .numberValue (occlusionTexture .strength, 1);
      materialNode ._occlusionTextureMapping = this .textureMapping (occlusionTexture);
      materialNode ._occlusionTexture        = this .textureInfo (occlusionTexture);
   },
   normalTextureInfo: function (normalTexture, materialNode)
   {
      if (!(normalTexture instanceof Object))
         return null;

      materialNode ._normalScale          = this .numberValue (normalTexture .scale, 1);
      materialNode ._normalTextureMapping = this .textureMapping (normalTexture);
      materialNode ._normalTexture        = this .textureInfo (normalTexture);
   },
   textureInfo: function (texture)
   {
      if (!(texture instanceof Object))
         return null;

      if (texture .extensions instanceof Object)
         this .textureTransformObject (texture .extensions .KHR_texture_transform, this .textureMapping (texture));

      return this .textureObject (this .textures [texture .index]);
   },
   materialExtensions: function (extensions, materialNode)
   {
      if (!(extensions instanceof Object))
         return;

      for (const [key, value] of Object .entries (extensions))
      {
         switch (key)
         {
            case "KHR_materials_emissive_strength":
               this .khrMaterialsEmissiveStrengthObject (value, materialNode);
               break;
         }
      }
   },
   khrMaterialsEmissiveStrengthObject: function (KHR_materials_emissive_strength, materialNode)
   {
      if (!(KHR_materials_emissive_strength instanceof Object))
         return;

      materialNode ._emissiveStrength = this .numberValue( KHR_materials_emissive_strength .emissiveStrength, 1);
   },
   textureTransformObject: function (KHR_texture_transform, mapping)
   {
      if (!(KHR_texture_transform instanceof Object))
         return;

      const
         scene                = this .getExecutionContext (),
         textureTransformNode = scene .createNode ("TextureTransform", false);

      const
         translation = new Vector2 (0, 0),
         scale       = new Vector2 (1, 1),
         T           = new Matrix3 (),
         R           = new Matrix3 (),
         S           = new Matrix3 ();

      if (this .vectorValue (KHR_texture_transform .offset, translation))
         T .translate (translation);

      R .rotate (- this .numberValue (KHR_texture_transform .rotation, 0));

      if (this .vectorValue (KHR_texture_transform .scale, scale))
         S .scale (scale);

      T .multLeft (R) .multLeft (S) .multRight (R .multRight (S) .inverse ()) .get (translation);

      textureTransformNode ._mapping     = mapping;
      textureTransformNode ._translation = translation;
      textureTransformNode ._rotation    = - this .numberValue (KHR_texture_transform .rotation, 0);
      textureTransformNode ._scale       = scale;

      textureTransformNode .setup ();

      this .textureTransformNodes .set (mapping, textureTransformNode);
   },
   meshesArray: function (meshes)
   {
      if (!(meshes instanceof Array))
         return;

      this .meshes = meshes;
   },
   meshObject: function (mesh)
   {
      if (!(mesh instanceof Object))
         return;

      if (mesh .shapeNodes)
         return mesh .shapeNodes;

      const shapeNodes = this .primitivesArray (mesh .primitives);

      // Name Shape nodes.

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (mesh .name);

      if (name)
      {
         for (const shapeNode of shapeNodes)
            scene .addNamedNode (scene .getUniqueName (name), shapeNode);
      }

      return mesh .shapeNodes = shapeNodes;
   },
   primitivesArray: function (primitives)
   {
      if (!(primitives instanceof Array))
         return [ ];

      const shapeNodes = [ ];

      for (const primitive of primitives)
         this .primitiveObject (primitive, shapeNodes);

      return shapeNodes;
   },
   primitiveObject: function (primitive, shapeNodes)
   {
      if (!(primitive instanceof Object))
         return;

      this .attributesObject (primitive .attributes);
      this .targetsArray     (primitive .targets);

      primitive .indices  = this .accessors [primitive .indices];
      primitive .material = this .materials [primitive .material];

      shapeNodes .push (this .createShape (primitive));
   },
   attributesObject: function (attributes)
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

      for (let i = 0; Number .isInteger (attributes ["TEXCOORD_" + i]); ++ i)
         attributes .TEXCOORD .push (this .accessors [attributes ["TEXCOORD_" + i]]);

      for (let i = 0; Number .isInteger (attributes ["COLOR_" + i]); ++ i)
         attributes .COLOR .push (this .accessors [attributes ["COLOR_" + i]]);

      for (let i = 0; Number .isInteger (attributes ["JOINTS_" + i]); ++ i)
         attributes .JOINTS .push (this .accessors [attributes ["JOINTS_" + i]]);

      for (let i = 0; Number .isInteger (attributes ["WEIGHTS_" + i]); ++ i)
         attributes .WEIGHTS .push (this .accessors [attributes ["WEIGHTS_" + i]]);
   },
   targetsArray: function (targets)
   {
      if (!(targets instanceof Array))
         return;
   },
   camerasArray: function (cameras)
   {
      if (!(cameras instanceof Array))
         return;

      this .cameras = cameras;
   },
   cameraObject: function (camera)
   {
      if (!(camera instanceof Object))
         return null;

      if (camera .viewpointNode !== undefined)
         return camera .viewpointNode;

      const viewpointNode = this .cameraType (camera);

      if (!viewpointNode)
         return camera .viewpointNode = null;

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (camera .name);

      // Name

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), viewpointNode);

      if (camera .name)
         viewpointNode ._description = camera .name;
      else
         viewpointNode ._description = `Viewpoint ${++ this .viewpoints}`;

      viewpointNode ._position         = Vector3 .Zero;
      viewpointNode ._centerOfRotation = new Vector3 (0, 0, -10);

      return camera .viewpointNode = viewpointNode;
   },
   cameraType: function (camera)
   {
      switch (camera .type)
      {
         case "orthographic":
            return this .orthographicCamera (camera .orthographic);
         case "perspective":
            return this .perspectiveCamera (camera .perspective);
         default:
            return null;
      }
   },
   orthographicCamera: function (camera)
   {
      const
         scene         = this .getExecutionContext (),
         viewpointNode = scene .createNode ("OrthoViewpoint", false);

      if (typeof camera .xmag === "number")
      {
         viewpointNode ._fieldOfView [0] = -camera .xmag / 2;
         viewpointNode ._fieldOfView [2] = +camera .xmag / 2;
      }

      if (typeof camera .ymag === "number")
      {
         viewpointNode ._fieldOfView [1] = -camera .ymag / 2;
         viewpointNode ._fieldOfView [3] = +camera .ymag / 2;
      }

      if (typeof camera .znear === "number")
         viewpointNode ._nearDistance = camera .znear;

      if (typeof camera .zfar === "number")
         viewpointNode ._farDistance = camera .zfar;

      viewpointNode .setup ();

      return viewpointNode;
   },
   perspectiveCamera: function (camera)
   {
      const
         scene         = this .getExecutionContext (),
         viewpointNode = scene .createNode ("Viewpoint", false);

      if (typeof camera .yfov === "number")
         viewpointNode ._fieldOfView = camera .yfov

      if (typeof camera .znear === "number")
         viewpointNode ._nearDistance = camera .znear;

      if (typeof camera .zfar === "number")
         viewpointNode ._farDistance = camera .zfar;

      viewpointNode .setup ();

      return viewpointNode;
   },
   nodesArray: function (nodes)
   {
      if (!(nodes instanceof Array))
         return;

      this .nodes = nodes;
   },
   nodeObject: function (node)
   {
      if (!(node instanceof Object))
         return;

      if (node .childNode !== undefined)
         return node .childNode;

      // Create Transform or HAnimJoint.

      const
         scene         = this .getExecutionContext (),
         transformNode = scene .createNode ("Transform", false),
         name          = this .sanitizeName (node .name);

      // Name

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), transformNode);

      // Set transformation matrix.

      const
         translation      = new Vector3 (0, 0, 0),
         quaternion       = new Quaternion (0, 0, 0, 1),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1, 1, 1),
         scaleOrientation = new Rotation4 (),
         matrix           = new Matrix4 ();

      if (this .vectorValue (node .matrix, matrix))
      {
         matrix .get (translation, rotation, scale, scaleOrientation);

         transformNode ._translation      = translation;
         transformNode ._rotation         = rotation;
         transformNode ._scale            = scale;
         transformNode ._scaleOrientation = scaleOrientation;
      }
      else
      {
         if (this .vectorValue (node .translation, translation))
            transformNode ._translation = translation;

         if (this .vectorValue (node .rotation, quaternion))
            transformNode ._rotation = new Rotation4 (quaternion);

         if (this .vectorValue (node .scale, scale))
            transformNode ._scale = scale;
      }

      // Add camera.

      const viewpointNode = this .cameraObject (this .cameras [node .camera]);

      if (viewpointNode)
         transformNode ._children .push (viewpointNode);

      // Add light.

      this .nodeExtensions (node .extensions, transformNode);

      // Add mesh.

      const mesh = this .meshes [node .mesh];

      if (mesh)
         transformNode ._children .push (... this .meshObject (mesh));

      // Get children.

      transformNode ._children .push (... this .nodeChildrenArray (node .children));

      // Finish.

      transformNode .setup ();

      if (transformNode ._children .length === 0)
         return node .childNode = null;

      return node .childNode = transformNode;
   },
   nodeExtensions: function (extensions, transformNode)
   {
      if (!(extensions instanceof Object))
         return;

      this .nodeLight (extensions .KHR_lights_punctual, transformNode);
   },
   nodeLight: function (khrLightsPunctual, transformNode)
   {
      if (!(khrLightsPunctual instanceof Object))
         return;

      const lightNode = this .lightObject (this .lights [khrLightsPunctual .light]);

      if (!lightNode)
         return;

      ++ this .usedLights;

      transformNode ._children .push (lightNode);
   },
   nodeChildrenArray: function (children)
   {
      if (!(children instanceof Array))
         return [ ];

      return children
         .map (index => this .nodeObject (this .nodes [index], index))
         .filter (node => node);
   },
   scenesArray: function (scenes, sceneNumber)
   {
      if (!(scenes instanceof Array))
         return;

      const
         scene    = this .getExecutionContext (),
         children = scenes .map (scene => this .sceneObject (scene));

      switch (children .length)
      {
         case 0:
         {
            return;
         }
         case 1:
         {
            if (sceneNumber === 0)
            {
               if (this .usedLights)
                  scene .getRootNodes () .push (this .createNavigationInfo ());

               scene .getRootNodes () .push (children [0]);
               return;
            }

            // Proceed with next case:
         }
         default:
         {
            // Root

            if (this .usedLights)
               scene .getRootNodes () .push (this .createNavigationInfo ());

            const switchNode = scene .createNode ("Switch", false);

            scene .addNamedNode (scene .getUniqueName ("Scenes"), switchNode);

            // Scenes.

            switchNode ._whichChoice = sceneNumber;
            switchNode ._children    = children;

            switchNode .setup ();

            scene .getRootNodes () .push (switchNode);

            return;
         }
      }
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
            return nodes [0];
         }
         default:
         {
            const
               scene     = this .getExecutionContext (),
               groupNode = scene .createNode ("Group", false),
               name      = this .sanitizeName (sceneObject .name);

            if (name)
               scene .addNamedNode (scene .getUniqueName (name), groupNode);

            groupNode ._children = nodes;

            groupNode .setup ();

            return groupNode;
         }
      }
   },
   sceneNodesArray: function (nodes)
   {
      return this .nodeChildrenArray (nodes);
   },
   animationsArray: function (animations)
   {
      if (!(animations instanceof Array))
         return;

      const animationNodes = animations
         .map (animation => this .animationObject (animation))
         .filter (node => node);

      if (!animationNodes .length)
         return;

      const
         scene     = this .getExecutionContext (),
         groupNode = scene .createNode ("Group", false);

      scene .addNamedNode (scene .getUniqueName ("Animations"), groupNode);
      scene .addExportedNode ("Animations", groupNode);

      groupNode ._children = animationNodes;

      groupNode .setup ();

      scene .getRootNodes () .push (groupNode);
   },
   animationObject: function (animation)
   {
      if (!(animation instanceof Object))
         return null;

      const
         scene          = this .getExecutionContext (),
         timeSensorNode = scene .createNode ("TimeSensor", false),
         channelNodes   = this .animationChannelsArray (animation .channels, animation .samplers, timeSensorNode);

      if (!channelNodes .length)
         return null;

      const
         groupNode = scene .createNode ("Group", false),
         name      = this .sanitizeName (animation .name);

      ++ this .animations;

      scene .addNamedNode (scene .getUniqueName (name || `Animation${this .animations}`), groupNode);
      scene .addNamedNode (scene .getUniqueName (`Timer${this .animations}`), timeSensorNode);

      timeSensorNode ._description = animation .name || `Animation ${this .animations}`;
      groupNode ._children .push (timeSensorNode, ... channelNodes);

      timeSensorNode .setup ();
      groupNode .setup ();

      return groupNode;
   },
   animationChannelsArray: function (channels, samplers, timeSensorNode)
   {
      if (!(channels instanceof Array))
         return [ ];

      if (!(samplers instanceof Array))
         return [ ];

      const cycleInterval = samplers
         .map (sampler => this .accessors [sampler .input])
         .filter (input => input && input .array .length)
         .reduce ((value, input) => Math .max (value, input .array .at (-1)), 0);

      timeSensorNode ._loop          = DEBUG;
      timeSensorNode ._cycleInterval = cycleInterval;

      return channels
         .map (channel => this .animationChannelObject (channel, samplers, timeSensorNode))
         .filter (node => node);
   },
   animationChannelObject: function (channel, samplers, timeSensorNode)
   {
      if (!(channel instanceof Object))
         return null;

      const target = channel .target;

      if (!(target instanceof Object))
         return null;

      const node = this .nodeObject (this .nodes [target .node]);

      if (!node)
         return null;

      const sampler = samplers [channel .sampler];

      if (!sampler)
         return null;

      const input = this .accessors [sampler .input];

      if (!input)
         return null;

      if (!input .array .length)
         return null;

      const output = this .accessors [sampler .output];

      if (!output)
         return null;

      if (!output .array .length)
         return null;

      const
         scene            = this .getExecutionContext (),
         interpolatorNode = this .createInterpolator (target .path, sampler .interpolation, input .array, output .array, timeSensorNode ._cycleInterval .getValue ());

      if (!interpolatorNode)
         return null;

      scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
      scene .addRoute (interpolatorNode, "value_changed", node, target .path);

      return interpolatorNode;
   },
   skinsArray: function (skins)
   {
      if (!(skins instanceof Array))
         return;
   },
   createNavigationInfo: function ()
   {
      const
         scene              = this .getExecutionContext (),
         navigationInfoNode = scene .createNode ("NavigationInfo", false);

      navigationInfoNode ._headlight = false;

      navigationInfoNode .setup ();

      return navigationInfoNode;
   },
   createShape: function (primitive)
   {
      const
         scene          = this .getExecutionContext (),
         shapeNode      = scene .createNode ("Shape", false),
         appearanceNode = this .materialObject (primitive .material),
         geometryNode   = this .createGeometry (primitive);

      shapeNode ._appearance = appearanceNode;
      shapeNode ._geometry   = geometryNode;

      shapeNode .setup ();

      return shapeNode;
   },
   getDefaultAppearance: function ()
   {
      if (this .defaultAppearance)
         return this .defaultAppearance;

      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance", false),
         materialNode   = scene .createNode ("PhysicalMaterial", false);

      appearanceNode ._alphaMode = "OPAQUE";
      appearanceNode ._material  = materialNode;

      materialNode   .setup ();
      appearanceNode .setup ();

      this .defaultAppearance = appearanceNode;

      return appearanceNode;
   },
   createMultiTextureTransform: function (materialNode)
   {
      if (!+materialNode .getTextureBits ())
         return null;

      const textureTransformNodes = [... this .textureTransformNodes .values ()]
         .sort ((a, b) => Algorithm .cmp (a ._mapping .getValue (), b ._mapping .getValue ()));

      this .textureTransformNodes .clear ();

      switch (textureTransformNodes .length)
      {
         case 0:
         {
            return null;
         }
         case 1:
         {
            return textureTransformNodes [0];
         }
         default:
         {
            const
               scene                = this .getExecutionContext (),
               textureTransformNode = scene .createNode ("MultiTextureTransform", false);

            textureTransformNode ._textureTransform = textureTransformNodes;

            textureTransformNode .setup ();

            return textureTransformNode;
         }
      }
   },
   createGeometry: function (primitive)
   {
      switch (primitive .mode)
      {
         case 0: // POINTS
         {
            return this .createPointSet (primitive);
         }
         case 1: // LINES
         {
            if (primitive .indices)
               return this .createIndexedLineSet (primitive, 1);

            return this .createLineSet (primitive);
         }
         case 2: // LINE_LOOP
         {
            return this .createIndexedLineSet (primitive, 2);
         }
         case 3: // LINE_STRIP
         {
            return this .createIndexedLineSet (primitive, 3);
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
            if (primitive .indices)
               return this .createIndexedTriangleStripSet (primitive);

            return this .createTriangleStripSet (primitive);
         }
         case 6: // TRIANGLE_FAN
         {
            if (primitive .indices)
               return this .createIndexedTriangleFanSet (primitive);

            return this .createTriangleFanSet (primitive);
         }
      }
   },
   createPointSet: function ({ attributes, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("PointSet", false);

      geometryNode ._color  = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal = this .createNormal (attributes .NORMAL);
      geometryNode ._coord  = this .createCoordinate (attributes .POSITION);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedLineSet: function ({ attributes, indices, material }, mode)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedLineSet", false);

      geometryNode ._color  = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal = this .createNormal (attributes .NORMAL);
      geometryNode ._coord  = this .createCoordinate (attributes .POSITION);

      switch (mode)
      {
         case 1: // LINES
         {
            const
               coordIndex = geometryNode ._coordIndex,
               array      = indices .array,
               length     = array .length;

            for (let i = 0; i < length; i += 2)
               coordIndex .push (array [i], array [i + 1], -1);

            break
         }
         case 2: // LINE_LOOP
         {
            const coordIndex = geometryNode ._coordIndex;

            if (indices)
            {
               coordIndex .push (... indices .array);

               if (coordIndex .length)
                  coordIndex .push (coordIndex [0], -1);
            }
            else
            {
               const coord = geometryNode ._coord;

               if (coord && coord .point .length)
                  coordIndex .push (... coord .point .keys (), 0, -1);
            }
            break
         }
         case 3: // LINE_STRIP
         {
            const coordIndex = geometryNode ._coordIndex;

            if (indices)
            {
               coordIndex .push (... indices .array);

               if (coordIndex .length)
                  coordIndex .push (-1);
            }
            else
            {
               const coord = geometryNode ._coord;

               if (coord && coord .point .length)
                  coordIndex .push (... coord .point .keys (), -1);
            }

            break
         }
      }

      geometryNode .setup ();

      return geometryNode;
   },
   createLineSet: function ({ attributes, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("LineSet", false);

      geometryNode ._color  = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal = this .createNormal (attributes .NORMAL);
      geometryNode ._coord  = this .createCoordinate (attributes .POSITION);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleSet: function ({ attributes, indices, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleSet: function ({ attributes, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleStripSet: function ({ attributes, indices, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleStripSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleStripSet: function ({ attributes, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleStripSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      const coord = geometryNode ._coord;

      if (coord)
      {
         if (coord .point .length)
            geometryNode ._stripCount = [coord .point .length];
      }

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleFanSet: function ({ attributes, indices, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleFanSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleFanSet: function ({ attributes, material })
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleFanSet", false);

      geometryNode ._solid           = material ? ! material .doubleSided : true;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      const coord = geometryNode ._coord;

      if (coord)
      {
         if (coord .point .length)
            geometryNode ._fanCount = [coord .point .length];
      }

      geometryNode .setup ();

      return geometryNode;
   },
   createColor: (function ()
   {
      const TypeNames = new Map ([
         ["VEC3", "Color"],
         ["VEC4", "ColorRGBA"],
      ]);

      return function (color, material)
      {
         if (!(color instanceof Object))
            return null;

         const typeName = TypeNames .get (color .type);

         if (!typeName)
            return null;

         if (color .colorNode)
            return color .colorNode;

         const
            scene          = this .getExecutionContext (),
            appearanceNode = this .materialObject (material),
            opaque         = appearanceNode ._alphaMode .getValue () === "OPAQUE",
            colorNode      = scene .createNode (opaque ? "Color" : typeName, false);

         colorNode ._color = opaque && typeName !== "Color"
            ? color .array .filter ((_, i) => (i + 1) % 4)
            : color .array;

         colorNode .setup ();

         return color .colorNode = colorNode;
      };
   })(),
   createMultiTextureCoordinate: function (texCoords, material)
   {
      const appearanceNode = this .materialObject (material);

      if (!+appearanceNode ._material .getValue () .getTextureBits ())
         return null;

      if (texCoords .textureCoordinateNode)
         return texCoords .textureCoordinateNode;

      switch (texCoords .length)
      {
         case 0:
         {
            return null;
         }
         case 1:
         {
            return texCoords .textureCoordinateNode = this .createTextureCoordinate (texCoords [0], 0);
         }
         default:
         {
            const textureCoordinateNodes = texCoords
               .map ((texCoord, i) => this .createTextureCoordinate (texCoord, i))
               .filter (node => node)
               .sort ((a, b) => Algorithm .cmp (a ._mapping .getValue (), b ._mapping .getValue ()));

            if (!textureCoordinateNodes .length)
               return null;

            const
               scene                 = this .getExecutionContext (),
               textureCoordinateNode = scene .createNode ("MultiTextureCoordinate", false);

            textureCoordinateNode ._texCoord = textureCoordinateNodes;

            textureCoordinateNode .setup ();

            return texCoords .textureCoordinateNode = textureCoordinateNode;
         }
      }
   },
   createTextureCoordinate: function (texCoord, mapping)
   {
      if (!(texCoord instanceof Object))
         return null;

      if (texCoord .type !== "VEC2")
         return null;

      if (texCoord .textureCoordinateNode)
         return texCoord .textureCoordinateNode;

      const
         scene                 = this .getExecutionContext (),
         textureCoordinateNode = scene .createNode ("TextureCoordinate", false);

      textureCoordinateNode ._mapping = "TEXCOORD_" + mapping;
      textureCoordinateNode ._point   = texCoord .array;

      textureCoordinateNode .setup ();

      return texCoord .textureCoordinateNode = textureCoordinateNode;
   },
   createNormal: function (normal)
   {
      if (!(normal instanceof Object))
         return null;

      if (normal .type !== "VEC3")
         return null;

      if (normal .normalNode)
         return normal .normalNode;

      const
         scene      = this .getExecutionContext (),
         normalNode = scene .createNode ("Normal", false);

      normalNode ._vector = normal .array;

      normalNode .setup ();

      return normal .normalNode = normalNode;
   },
   createCoordinate: function (position)
   {
      if (!(position instanceof Object))
         return null;

      if (position .type !== "VEC3")
         return null;

      if (position .coordinateNode)
         return position .coordinateNode;

      const
         scene          = this .getExecutionContext (),
         coordinateNode = scene .createNode ("Coordinate", false);

      coordinateNode ._point = position .array;

      coordinateNode .setup ();

      return position .coordinateNode = coordinateNode;
   },
   createInterpolator: function (path, interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getExecutionContext ();

      switch (path)
      {
         case "translation":
         {
            const interpolatorNode = this .createPositionInterpolator (interpolation, times, keyValues, cycleInterval);

            scene .addNamedNode (scene .getUniqueName ("TranslationInterpolator"), interpolatorNode);

            return interpolatorNode;
         }
         case "rotation":
         {
            const interpolatorNode = this .createOrientationInterpolator (interpolation, times, keyValues, cycleInterval);

            scene .addNamedNode (scene .getUniqueName ("RotationInterpolator"), interpolatorNode);

            return interpolatorNode;
         }
         case "scale":
         {
            const interpolatorNode = this .createPositionInterpolator (interpolation, times, keyValues, cycleInterval);

            scene .addNamedNode (scene .getUniqueName ("ScaleInterpolator"), interpolatorNode);

            return interpolatorNode;
         }
         case "weights":
         default:
         {
            return null;
         }
      }
   },
   createPositionInterpolator: function (interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getExecutionContext ();

      switch (interpolation)
      {
         case "STEP":
         {
            const interpolatorNode = scene .createNode ("PositionInterpolator", false);

            // Key

            interpolatorNode ._key .push (times [0] / cycleInterval);

            for (let i = 1, length = times .length; i < length; ++ i)
               interpolatorNode ._key .push ((times [i] - STEP_TIME) / cycleInterval, times [i] / cycleInterval);

            // KeyValue

            interpolatorNode ._keyValue .push (new Vector3 (keyValues [0], keyValues [1], keyValues [2]));

            for (let i = 0, length = keyValues .length - 3; i < length; i += 3)
            {
               interpolatorNode ._keyValue .push (new Vector3 (keyValues [i + 0], keyValues [i + 1], keyValues [i + 2]),
                                                  new Vector3 (keyValues [i + 3], keyValues [i + 4], keyValues [i + 5]));
            }

            // Finish

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         default:
         case "LINEAR":
         {
            const interpolatorNode = scene .createNode ("PositionInterpolator", false);

            interpolatorNode ._key      = times .map (t => t / cycleInterval);
            interpolatorNode ._keyValue = keyValues;

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         case "CUBICSPLINE":
         {
            const
               interpolatorNode = scene .createNode ("PositionInterpolator", false),
               vectors          = [ ];

            for (let i = 0, length = keyValues .length; i < length; i += 3)
            {
               vectors .push (new Vector3 (keyValues [i + 0],
                                           keyValues [i + 1],
                                           keyValues [i + 2]));
            }

            const samples = [... Array (Math .floor (times .at (-1) * SAMPLES_PER_SECOND)) .keys ()]
               .map ((_, i, array) => i / (array .length - 1) * times .at (-1));

            for (const t of samples)
            {
               interpolatorNode ._key      .push (t / cycleInterval);
               interpolatorNode ._keyValue .push (this .cubicSpline (t, times, vectors));
            }

            interpolatorNode .setup ();

            return interpolatorNode;
         }

      }
   },
   createOrientationInterpolator: function (interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getExecutionContext ();

      switch (interpolation)
      {
         case "STEP":
         {
            const interpolatorNode = scene .createNode ("OrientationInterpolator", false);

            // Key

            interpolatorNode ._key .push (times [0] / cycleInterval);

            for (let i = 1, length = times .length; i < length; ++ i)
               interpolatorNode ._key .push ((times [i] - STEP_TIME) / cycleInterval, times [i] / cycleInterval);

            // KeyValue

            interpolatorNode ._keyValue .push (new Rotation4 (new Quaternion (keyValues [0],
                                                                              keyValues [1],
                                                                              keyValues [2],
                                                                              keyValues [3])));

            for (let i = 0, length = keyValues .length - 4; i < length; i += 4)
            {
               interpolatorNode ._keyValue .push (new Rotation4 (new Quaternion (keyValues [i + 0],
                                                                                 keyValues [i + 1],
                                                                                 keyValues [i + 2],
                                                                                 keyValues [i + 3])),
                                                  new Rotation4 (new Quaternion (keyValues [i + 4],
                                                                                 keyValues [i + 5],
                                                                                 keyValues [i + 6],
                                                                                 keyValues [i + 7])));
            }

            // Finish

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         default:
         case "LINEAR":
         {
            const interpolatorNode = scene .createNode ("OrientationInterpolator", false);

            interpolatorNode ._key = times .map (t => t / cycleInterval);

            for (let i = 0, length = keyValues .length; i < length; i += 4)
            {
               interpolatorNode ._keyValue .push (new Rotation4 (new Quaternion (keyValues [i + 0],
                                                                                 keyValues [i + 1],
                                                                                 keyValues [i + 2],
                                                                                 keyValues [i + 3])));
            }

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         case "CUBICSPLINE":
         {
            const
               interpolatorNode = scene .createNode ("OrientationInterpolator", false),
               quaternions      = [ ];

            for (let i = 0, length = keyValues .length; i < length; i += 4)
            {
               quaternions .push (new Quaternion (keyValues [i + 0],
                                                  keyValues [i + 1],
                                                  keyValues [i + 2],
                                                  keyValues [i + 3]));
            }

            const samples = [... Array (Math .floor (times .at (-1) * SAMPLES_PER_SECOND)) .keys ()]
               .map ((_, i, array) => i / (array .length - 1) * times .at (-1));

            for (const t of samples)
            {
               const q = this .cubicSpline (t, times, quaternions) .normalize ();

               interpolatorNode ._key      .push (t / cycleInterval);
               interpolatorNode ._keyValue .push (new Rotation4 (q));
            }

            interpolatorNode .setup ();

            return interpolatorNode;
         }
      }
   },
   cubicSpline: function (time, times, values)
   {
      const
         index1 = Algorithm .clamp (Algorithm .upperBound (times, 0, times .length, time), 1, times .length - 1),
         index0 = index1 - 1,
         td     = times [index1] - times [index0],
         t      = (time - times [index0]) / td,
         t2     = Math .pow (t, 2),
         t3     = Math .pow (t, 3),
         v0     = values [index0 * 3 + 1] .copy (),
         b0     = values [index0 * 3 + 2] .copy (),
         v1     = values [index1 * 3 + 1] .copy (),
         a1     = values [index1 * 3 + 0] .copy ();

      v0 .multiply (2 * t3 - 3 * t2 + 1);
      b0 .multiply (td * (t3 - 2 * t2 + t));
      v1 .multiply (-2 * t3 + 3 * t2);
      a1 .multiply (td * (t3 - t2));

      return v0 .add (b0) .add (v1) .add (a1);
   },
   vectorValue: function (array, vector)
   {
      if (!(array instanceof Array))
         return false;

      if (array .length !== vector .length)
         return false;

      vector .set (... array);

      return true;
   },
   numberValue: function (value, defaultValue)
   {
      if (typeof value !== "number")
         return defaultValue;

      return value;
   },
});

export default GLTF2Parser;
