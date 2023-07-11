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
import URLs         from "../Browser/Networking/URLs.js";
import Vector2      from "../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Quaternion   from "../../standard/Math/Numbers/Quaternion.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Color3       from "../../standard/Math/Numbers/Color3.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";
import Algorithm    from "../../standard/Math/Algorithm.js";
import DEVELOPMENT  from "../DEVELOPMENT.js"

// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
// https://github.com/KhronosGroup/glTF-Sample-Models

const SAMPLES_PER_SECOND = 30; // in 1/s

function GLTF2Parser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeGroups         = false;
   this .removeEmptyGroups    = true;
   this .combineGroupingNodes = true;

   // Globals

   this .extensions            = new Set ();
   this .lights                = [ ];
   this .usedLights            = 0;
   this .buffers               = [ ];
   this .bufferViews           = [ ];
   this .accessors             = [ ];
   this .samplers              = [ ];
   this .materials             = [ ];
   this .textureTransformNodes = [ ];
   this .meshes                = [ ];
   this .cameras               = [ ];
   this .viewpoints            = 0;
   this .nodes                 = [ ];
   this .skins                 = [ ];
   this .joints                = new Set ();
   this .skeletons             = new Set ();
   this .animations            = 0;
}

Object .assign (Object .setPrototypeOf (GLTF2Parser .prototype, X3DParser .prototype),
   X3DOptimizer .prototype,
{
   getEncoding ()
   {
      return "JSON";
   },
   setInput (json)
   {
      try
      {
         if (typeof json === "string")
            json = JSON .parse (json);

         this .input = json;
      }
      catch
      {
         this .input = undefined;
      }
   },
   isValid: (() =>
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
         "skins",
         "scenes",
         "scene",
         "animations",
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
   setBuffers (buffers)
   {
      this .buffers = buffers;
   },
   parseIntoScene (resolve, reject)
   {
      this .rootObject (this .input)
         .then (resolve)
         .catch (reject);
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

      if (glTF .skins)
         scene .addComponent (browser .getComponent ("HAnim"));

      // Parse root objects.

      this .assetObject      (glTF .asset);
      this .extensionsArray  (glTF .extensionsUsed, this .extensions);
      this .extensionsArray  (glTF .extensionsRequired, this .extensions);
      this .extensionsObject (glTF .extensions);

      await this .loadComponents ();
      await this .buffersArray (glTF .buffers);

      if (this .extensions .has ("KHR_draco_mesh_compression"))
         this .draco = await this .createDraco ();

      this .bufferViewsArray (glTF .bufferViews);
      this .accessorsArray   (glTF .accessors);
      this .samplersArray    (glTF .samplers);

      await this .imagesArray (glTF .images);

      this .texturesArray   (glTF .textures);
      this .materialsArray  (glTF .materials);
      this .meshesArray     (glTF .meshes);
      this .camerasArray    (glTF .cameras);
      this .nodesArray      (glTF .nodes);
      this .skinsArray      (glTF .skins);
      this .scenesArray     (glTF .scenes, glTF .scene);
      this .animationsArray (glTF .animations);

      //this .optimizeSceneGraph (this .getExecutionContext () .getRootNodes ());

      return this .getScene ();
   },
   assetObject (asset)
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
   extensionsArray (extensions, set)
   {
      if (!(extensions instanceof Array))
         return;

      const
         browser = this .getBrowser (),
         scene   = this .getExecutionContext ();

      for (const extension of extensions)
      {
         set .add (extension);

         switch (extension)
         {
            case "KHR_texture_transform":
               scene .addComponent (browser .getComponent ("Texturing3D", 2));
               break;
         }
      }
   },
   extensionsObject (extensions)
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
   khrLightsPunctualObject (khrLightsPunctual)
   {
      if (!(khrLightsPunctual instanceof Object))
         return;

      this .lightsArray (khrLightsPunctual .lights);
   },
   lightsArray (lights)
   {
      if (!(lights instanceof Array))
         return;

      this .lights = lights;
   },
   lightObject (light)
   {
      if (!(light instanceof Object))
         return null;

      const lightNode = this .lightType (light);

      if (!lightNode)
         return null;

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (light .name);

      const color = new Color3 (1, 1, 1);

      if (this .vectorValue (light .color, color))
         lightNode ._color = color;

      lightNode ._global    = true;
      lightNode ._intensity = this .numberValue (light .intensity, 1);

      lightNode .setup ();

      if (name)
      {
         scene .addNamedNode (scene .getUniqueName (name), lightNode);
         scene .addExportedNode (scene .getUniqueExportName (name), lightNode);
      }

      return lightNode;
   },
   lightType (light)
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
   directionalLight (light)
   {
      const
         scene     = this .getExecutionContext (),
         lightNode = scene .createNode ("DirectionalLight", false);

      return lightNode;
   },
   spotLight (light)
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
   pointLight (light)
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
   bufferObject: async function (buffer, i)
   {
      if (!(buffer instanceof Object))
         return;

      if (!buffer .uri)
         return this .buffers [i];

      const
         url         = new URL (buffer .uri, this .getExecutionContext () .getWorldURL ()),
         response    = await fetch (url),
         blob        = await response .blob (),
         arrayBuffer = await blob .arrayBuffer ();

      return $.ungzip (arrayBuffer);
   },
   bufferViewsArray (bufferViews)
   {
      if (!(bufferViews instanceof Array))
         return;

      this .bufferViews = bufferViews;

      for (const bufferView of bufferViews)
         bufferView .buffer = this .bufferViewObject (bufferView);
   },
   bufferViewObject (bufferView)
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
   accessorsArray (accessors)
   {
      if (!(accessors instanceof Array))
         return;

      this .accessors = accessors;

      for (const accessor of accessors)
         this .accessorObject (accessor);
   },
   accessorObject: (() =>
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
                  bufferView = this .bufferViews [accessor .bufferView || 0],
                  byteOffset = accessor .byteOffset || 0,
                  byteStride = bufferView .byteStride || 0,
                  components = Components .get (accessor .type),
                  count      = accessor .count || 0,
                  stride     = byteStride ? byteStride / TypedArray .BYTES_PER_ELEMENT : components,
                  length     = Math .min (stride * count, (bufferView .byteLength - byteOffset) / TypedArray .BYTES_PER_ELEMENT),
                  array      = new TypedArray (bufferView .buffer, byteOffset, length);

               if (stride === components)
               {
                  const value = this .sparseObject (accessor .sparse, array, components);

                  Object .defineProperty (accessor, "array", { value: value });

                  return value;
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

                  const value = this .sparseObject (accessor .sparse, dense, components);

                  Object .defineProperty (accessor, "array", { value: value });

                  return value;
               }
            },
            configurable: true,
         });
      };
   })(),
   sparseObject: (() =>
   {
      const TypedArrays = new Map ([
         [5121, Uint8Array],
         [5123, Uint16Array],
         [5125, Uint32Array],
      ]);

      return function (sparse, array, components)
      {
         if (!(sparse instanceof Object))
            return array;

         if (!(sparse .indices instanceof Object))
            return array;

         if (!(sparse .values instanceof Object))
            return array;

         const
            IndicesTypedArray = TypedArrays .get (sparse .indices .componentType),
            indicesBufferView = this .bufferViews [sparse .indices .bufferView],
            indicesByteOffset = sparse .indices .byteOffset,
            indices           = new IndicesTypedArray (indicesBufferView .buffer, indicesByteOffset, sparse .count);

         const
            ValuesTypedArray = array .constructor,
            valuesBufferView = this .bufferViews [sparse .values .bufferView],
            valuesByteOffset = sparse .values .byteOffset,
            values           = new ValuesTypedArray (valuesBufferView .buffer, valuesByteOffset, sparse .count * components);

         array = array .slice ();

         let v = 0;

         for (const i of indices)
         {
            for (let c = 0; c < components; ++ c, ++ v)
               array [i * components + c] = values [v];
         }

         return array;
      };
   })(),
   samplersArray (samplers)
   {
      if (!(samplers instanceof Array))
         return;

      this .samplers = samplers;

      for (const sampler of samplers)
         this .samplerObject (sampler);
   },
   samplerObject: (() =>
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
               {
                  scene .addNamedNode (scene .getUniqueName (name), texturePropertiesNode);
                  scene .addExportedNode (scene .getUniqueExportName (name), texturePropertiesNode);
               }

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
   blobToDataUrl (blob)
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
   texturesArray (textures)
   {
      if (!(textures instanceof Array))
         return;

      this .textures = textures;
   },
   textureObject (texture)
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
      {
         scene .addNamedNode (scene .getUniqueName (name), textureNode);
         scene .addExportedNode (scene .getUniqueExportName (name), textureNode);
      }

      textureNode ._url = [image .uri];

      const sampler = this .samplers [texture .sampler];

      if (sampler instanceof Object)
         textureNode ._textureProperties = sampler .texturePropertiesNode;

      textureNode .setup ();

      return texture .textureNode = textureNode;
   },
   materialsArray (materials)
   {
      if (!(materials instanceof Array))
         return;

      this .materials = materials;
   },
   materialObject (material)
   {
      if (!(material instanceof Object))
         return this .getDefaultAppearance ();

      if (material .appearanceNode)
         return material .appearanceNode;

      const texCoordIndices = this .texCoordIndices ("", material);

      this .texCoordIndex         = [... texCoordIndices] .reduce (Math .max, -1);
      this .textureTransformNodes = [ ];
      this .texCoordMappings      = new Map ();
      material .texCoordMappings  = this .texCoordMappings;

      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance", false),
         materialNode   = this .createMaterial (material),
         name           = this .sanitizeName (material .name);

      const emissiveFactor = new Color3 (0, 0, 0);

      if (this .vectorValue (material .emissiveFactor, emissiveFactor))
         materialNode ._emissiveColor = emissiveFactor;

      materialNode ._emissiveTexture        = this .textureInfo    (material .emissiveTexture);
      materialNode ._emissiveTextureMapping = this .textureMapping (material .emissiveTexture);

      this .occlusionTextureInfo (material .occlusionTexture, materialNode);
      this .normalTextureInfo    (material .normalTexture,    materialNode);
      this .materialExtensions   (material .extensions,       materialNode);

      materialNode .setup ();

      for (const i of texCoordIndices)
      {
         const mapping = `TEXCOORD_${i}`;

         if (this .textureTransformNodes .length)
         {
            const textureTransformNode = scene .createNode ("TextureTransform", false);

            textureTransformNode ._mapping        = mapping;
            textureTransformNode ._translation .y = -1;
            textureTransformNode ._scale .y       = -1;

            textureTransformNode .setup ();

            this .textureTransformNodes .push (textureTransformNode);
         }

         this .texCoordMappings .set (mapping, i);
      }

      if (name)
      {
         scene .addNamedNode (scene .getUniqueName (name), appearanceNode);
         scene .addExportedNode (scene .getUniqueExportName (name), appearanceNode);
      }

      appearanceNode ._alphaMode        = this .stringValue (material .alphaMode, "OPAQUE");
      appearanceNode ._alphaCutoff      = this .numberValue (material .alphaCutoff, 0.5);
      appearanceNode ._material         = materialNode;
      appearanceNode ._textureTransform = this .createMultiTextureTransform (materialNode);

      appearanceNode .setup ();

      return material .appearanceNode = appearanceNode;
   },
   texCoordIndices (key, object, indices = new Set ())
   {
      if (!(object instanceof Object))
         return indices;

      if (key .endsWith ("Texture") && !object ?.extensions ?.KHR_texture_transform)
         indices .add (object .texCoord || 0);

      for (const [key, value] of Object .entries (object))
         this .texCoordIndices (key, value, indices);

      return indices;
   },
   createMaterial (material)
   {
      const materials = [
         this .pbrMetallicRoughnessObject .bind (this, material .pbrMetallicRoughness),
         this .pbrSpecularGlossinessObject .bind (this, material .extensions ?.KHR_materials_pbrSpecularGlossiness),
         this .pbrMetallicRoughnessObject .bind (this, { }),
      ];

      for (const material of materials)
      {
         const materialNode = material ();

         if (materialNode)
            return materialNode;
      }
   },
   pbrMetallicRoughnessObject (pbrMetallicRoughness)
   {
      if (!(pbrMetallicRoughness instanceof Object))
         return null;

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

      materialNode ._baseTexture                     = this .textureInfo    (pbrMetallicRoughness .baseColorTexture);
      materialNode ._baseTextureMapping              = this .textureMapping (pbrMetallicRoughness .baseColorTexture);
      materialNode ._metallicRoughnessTexture        = this .textureInfo    (pbrMetallicRoughness .metallicRoughnessTexture);
      materialNode ._metallicRoughnessTextureMapping = this .textureMapping (pbrMetallicRoughness .metallicRoughnessTexture);

      return materialNode;
   },
   pbrSpecularGlossinessObject (pbrSpecularGlossiness)
   {
      if (!(pbrSpecularGlossiness instanceof Object))
         return null;

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

      materialNode ._diffuseTexture          = this .textureInfo    (pbrSpecularGlossiness .diffuseTexture);
      materialNode ._diffuseTextureMapping   = this .textureMapping (pbrSpecularGlossiness .diffuseTexture);
      materialNode ._specularTexture         = this .textureInfo    (pbrSpecularGlossiness .specularGlossinessTexture);
      materialNode ._specularTextureMapping  = this .textureMapping (pbrSpecularGlossiness .specularGlossinessTexture);
      materialNode ._shininessTexture        = this .textureInfo    (pbrSpecularGlossiness .specularGlossinessTexture);
      materialNode ._shininessTextureMapping = this .textureMapping (pbrSpecularGlossiness .specularGlossinessTexture);

      return materialNode;
   },
   occlusionTextureInfo (occlusionTexture, materialNode)
   {
      if (!(occlusionTexture instanceof Object))
         return null;

      materialNode ._occlusionStrength       = this .numberValue (occlusionTexture .strength, 1);
      materialNode ._occlusionTexture        = this .textureInfo (occlusionTexture);
      materialNode ._occlusionTextureMapping = this .textureMapping (occlusionTexture);
   },
   normalTextureInfo (normalTexture, materialNode)
   {
      if (!(normalTexture instanceof Object))
         return null;

      materialNode ._normalScale          = this .numberValue (normalTexture .scale, 1);
      materialNode ._normalTexture        = this .textureInfo (normalTexture);
      materialNode ._normalTextureMapping = this .textureMapping (normalTexture);
   },
   textureInfo (texture)
   {
      if (!(texture instanceof Object))
         return null;

      if (texture .extensions instanceof Object)
         texture .mapping = this .textureTransformObject (texture .extensions .KHR_texture_transform, texture .texCoord || 0);
      else
         texture .mapping = `TEXCOORD_${texture .texCoord || 0}`;

      return this .textureObject (this .textures [texture .index]);
   },
   textureMapping (texture)
   {
      if (!(texture instanceof Object))
         return "";

      return texture .mapping;
   },
   materialExtensions (extensions, materialNode)
   {
      if (!(extensions instanceof Object))
         return;

      for (const [key, value] of Object .entries (extensions))
      {
         switch (key)
         {
            case "KHR_materials_unlit":
               this .khrMaterialsUnlitObject (materialNode);
               break;
            case "KHR_materials_emissive_strength":
               this .khrMaterialsEmissiveStrengthObject (value, materialNode);
               break;
         }
      }
   },
   khrMaterialsUnlitObject (materialNode)
   {
      switch (materialNode .getTypeName ())
      {
         case "PhysicalMaterial":
         {
            materialNode ._emissiveColor          = materialNode ._baseColor;
            materialNode ._emissiveTextureMapping = materialNode ._baseTextureMapping;
            materialNode ._emissiveTexture        = materialNode ._baseTexture;
            materialNode ._baseColor              = Color3 .Black;
            materialNode ._baseTextureMapping     = "";
            materialNode ._baseTexture            = null;
            break;
         }
         case "Material":
         {
            materialNode ._emissiveColor          = materialNode ._diffuseColor;
            materialNode ._emissiveTextureMapping = materialNode ._diffuseTextureMapping;
            materialNode ._emissiveTexture        = materialNode ._diffuseTexture;
            materialNode ._diffuseColor           = Color3 .Black;
            materialNode ._diffuseTextureMapping  = "";
            materialNode ._diffuseTexture         = null;
            break;
         }
      }
   },
   khrMaterialsEmissiveStrengthObject (KHR_materials_emissive_strength, materialNode)
   {
      if (!(KHR_materials_emissive_strength instanceof Object))
         return;

      const emissiveStrength = this .numberValue (KHR_materials_emissive_strength .emissiveStrength, 1);

      materialNode ._emissiveColor .r *= emissiveStrength;
      materialNode ._emissiveColor .g *= emissiveStrength;
      materialNode ._emissiveColor .b *= emissiveStrength;
   },
   textureTransformObject (KHR_texture_transform, texCoord)
   {
      if (!(KHR_texture_transform instanceof Object))
         return;

      if (!this .extensions .has ("KHR_texture_transform"))
         return;

      const
         scene                = this .getExecutionContext (),
         textureTransformNode = scene .createNode ("TextureTransformMatrix3D", false),
         mapping              = `TEXCOORD_${this .texCoordIndex + this .textureTransformNodes .length + 1}`;

      const
         translation = new Vector2 (0, 0),
         scale       = new Vector2 (1, 1),
         matrix      = new Matrix4 ();

      matrix .scale (new Vector3 (1, -1, 1));
      matrix .translate (new Vector3 (0, -1, 0));

      if (this .vectorValue (KHR_texture_transform .offset, translation))
         matrix .translate (new Vector3 (... translation, 0));

      matrix .rotate (new Rotation4 (0, 0, -1, this .numberValue (KHR_texture_transform .rotation, 0)));

      if (this .vectorValue (KHR_texture_transform .scale, scale))
         matrix .scale (new Vector3 (... scale, 1));

      textureTransformNode ._mapping = mapping;
      textureTransformNode ._matrix  = matrix;

      textureTransformNode .setup ();

      this .textureTransformNodes .push (textureTransformNode);
      this .texCoordMappings .set (mapping, KHR_texture_transform .texCoord ?? texCoord);

      return mapping;
   },
   meshesArray (meshes)
   {
      if (!(meshes instanceof Array))
         return;

      this .meshes = meshes;
   },
   meshObject (mesh, skin)
   {
      if (!(mesh instanceof Object))
         return;

      if (mesh .shapeNodes)
         return mesh .shapeNodes;

      if (skin instanceof Object)
      {
         const scene = this .getScene ();

         skin .textureCoordinateNode = scene .createNode ("TextureCoordinate", false);
         skin .normalNode            = scene .createNode ("Normal", false);
         skin .coordinateNode        = scene .createNode ("Coordinate", false);
      }

      const shapeNodes = this .primitivesArray (mesh .primitives, skin);

      // Name Shape nodes.

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (mesh .name);

      if (name)
      {
         for (const shapeNode of shapeNodes)
         {
            scene .addNamedNode (scene .getUniqueName (name), shapeNode);
            scene .addExportedNode (scene .getUniqueExportName (name), shapeNode);
         }
      }

      if (skin instanceof Object)
      {
         skin .textureCoordinateNode .setup ();
         skin .normalNode            .setup ();
         skin .coordinateNode        .setup ();
      }

      return mesh .shapeNodes = shapeNodes;
   },
   primitivesArray (primitives, skin)
   {
      if (!(primitives instanceof Array))
         return [ ];

      const shapeNodes = [ ];

      for (const primitive of primitives)
         this .primitiveObject (primitive, skin, shapeNodes);

      return shapeNodes;
   },
   primitiveObject (primitive, skin, shapeNodes)
   {
      if (!(primitive instanceof Object))
         return;

      this .attributesObject (primitive .attributes);
      this .targetsArray     (primitive .targets);

      primitive .indices  = this .accessors [primitive .indices];
      primitive .material = this .materials [primitive .material];

      this .primitiveExtensionsObject (primitive .extensions, primitive)

      shapeNodes .push (this .createShape (primitive, skin));
   },
   attributesObject (attributes)
   {
      if (!(attributes instanceof Object))
         return;

      for (const key in attributes)
         attributes [key] = this .accessors [attributes [key]];

      attributes .TEXCOORD = [ ];
      attributes .COLOR    = [ ];
      attributes .JOINTS   = [ ];
      attributes .WEIGHTS  = [ ];

      for (let i = 0; attributes ["TEXCOORD_" + i]; ++ i)
         attributes .TEXCOORD .push (attributes ["TEXCOORD_" + i]);

      for (let i = 0; attributes ["COLOR_" + i]; ++ i)
         attributes .COLOR .push (attributes ["COLOR_" + i]);

      for (let i = 0; attributes ["JOINTS_" + i]; ++ i)
         attributes .JOINTS .push (attributes ["JOINTS_" + i]);

      for (let i = 0; attributes ["WEIGHTS_" + i]; ++ i)
         attributes .WEIGHTS .push (attributes ["WEIGHTS_" + i]);
   },
   targetsArray (targets)
   {
      if (!(targets instanceof Array))
         return;
   },
   primitiveExtensionsObject (extensions, primitive)
   {
      if (!(extensions instanceof Object))
         return;

      for (const [key, value] of Object .entries (extensions))
      {
         switch (key)
         {
            case "KHR_draco_mesh_compression":
               return this .khrDracoMeshCompressionObject (value, primitive);
         }
      }
   },
   khrDracoMeshCompressionObject (draco, primitive)
   {
      if (!(draco instanceof Object))
         return;

      if (!this .draco)
         return;

      function indicesCallback (array)
      {
         Object .defineProperty (primitive .indices, "array", { value: array });
      }

      function attributeCallback (key, array)
      {
         if (attributes [key])
            Object .defineProperty (attributes [key], "array", { value: array });
      }

      const
         attributes = primitive .attributes,
         dataView   = new Uint8Array (this .bufferViews [draco .bufferView] .buffer);

      this .dracoDecodeMesh (this .draco, dataView, draco .attributes, indicesCallback, attributeCallback);
   },
   dracoDecodeMesh (draco, dataView, attributes, indicesCallback, attributeCallback)
   {
      const
         buffer  = new draco .DecoderBuffer (),
         decoder = new draco .Decoder ();

      buffer .Init (dataView, dataView .byteLength);

      let geometry, status;

      try
      {
         const type = decoder .GetEncodedGeometryType (buffer);

         switch (type)
         {
            case draco .TRIANGULAR_MESH:
               geometry = new draco .Mesh ();
               status   = decoder .DecodeBufferToMesh (buffer, geometry);
               break;
            case draco .POINT_CLOUD:
               geometry = new draco .PointCloud ();
               status   = decoder .DecodeBufferToPointCloud (buffer, geometry);
               break;
            default:
               throw new Error (`Invalid geometry type ${type}.`);
         }

         if (!status .ok () || !geometry .ptr)
            throw new Error (status .error_msg ());

         if (type === draco .TRIANGULAR_MESH)
         {
            const
               numFaces   = geometry .num_faces (),
               numIndices = numFaces * 3,
               byteLength = numIndices * 4,
               ptr        = draco ._malloc (byteLength);

            try
            {
               const indices = new Uint32Array (numIndices);

               decoder .GetTrianglesUInt32Array (geometry, byteLength, ptr);

               indices .set (new Uint32Array (draco .HEAPF32 .buffer, ptr, numIndices));

               indicesCallback (indices);
            }
            finally
            {
               draco ._free (ptr);
            }
         }

         for (const [key, id] of Object .entries (attributes))
         {
            const
               attribute     = decoder .GetAttributeByUniqueId (geometry, id),
               numComponents = attribute .num_components (),
               numPoints     = geometry .num_points (),
               numValues     = numPoints * numComponents,
               byteLength    = numValues * Float32Array .BYTES_PER_ELEMENT,
               ptr           = draco ._malloc (byteLength);

            try
            {
               const array = new Float32Array (numValues);

               decoder .GetAttributeDataArrayForAllPoints (geometry, attribute, draco .DT_FLOAT32, byteLength, ptr);

               array .set (new Float32Array (draco .HEAPF32 .buffer, ptr, numValues));

               attributeCallback (key, array);
            }
            finally
            {
               draco ._free (ptr);
            }
         }
      }
      finally
      {
         if (geometry)
            draco .destroy (geometry);

         draco .destroy (decoder);
         draco .destroy (buffer);
      }
   },
   createDraco: async function ()
   {
      if (this .constructor .draco)
      {
         return this .constructor .draco;
      }
      else
      {
         const
            response = await fetch (URLs .getLibUrl ("draco_decoder_gltf.js")),
            text     = await response .text (),
            draco    = await new Function (text) () ();

         return this .constructor .draco = draco;
      }
   },
   camerasArray (cameras)
   {
      if (!(cameras instanceof Array))
         return;

      this .cameras = cameras;
   },
   cameraObject (camera)
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
      {
         scene .addNamedNode (scene .getUniqueName (name), viewpointNode);
         scene .addExportedNode (scene .getUniqueExportName (name), viewpointNode);
      }

      if (camera .name)
         viewpointNode ._description = camera .name;
      else
         viewpointNode ._description = `Viewpoint ${++ this .viewpoints}`;

      viewpointNode ._position         = Vector3 .Zero;
      viewpointNode ._centerOfRotation = new Vector3 (0, 0, -10);

      return camera .viewpointNode = viewpointNode;
   },
   cameraType (camera)
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
   orthographicCamera (camera)
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
   perspectiveCamera (camera)
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
   nodesArray (nodes)
   {
      if (!(nodes instanceof Array))
         return;

      this .nodes = nodes;
   },
   nodeObject (node, index)
   {
      if (!(node instanceof Object))
         return;

      if (node .childNode !== undefined)
         return node .childNode;

      // Create Transform or HAnimJoint.

      const
         scene         = this .getExecutionContext (),
         typeName      = this .joints .has (index) ? "HAnimJoint" : "Transform",
         transformNode = scene .createNode (typeName, false),
         name          = this .sanitizeName (node .name);

      // Name

      if (name)
      {
         scene .addNamedNode (scene .getUniqueName (name), transformNode);
         scene .addExportedNode (scene .getUniqueExportName (name), transformNode);

         if (typeName === "HAnimJoint")
            transformNode ._name = node .name;
      }

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
      {
         const
            skin       = this .skins [node .skin],
            shapeNodes = this .meshObject (mesh, skin);

         transformNode ._children .push (... shapeNodes);

         if (skin && shapeNodes .length)
         {
            var humanoidNode = scene .createNode ("HAnimHumanoid", false);

            const name = this .sanitizeName (skin .name);

            if (name)
               scene .addNamedNode (scene .getUniqueName (name), humanoidNode);

            humanoidNode ._name                  = skin .name;
            humanoidNode ._version               = "2.0";
            humanoidNode ._skeletalConfiguration = "NONE";

            const skeletonNode = this .nodeObject (this .nodes [skin .skeleton], skin .skeleton);

            if (skeletonNode)
               humanoidNode ._skeleton .push (skeletonNode);

            for (const [i, joint] of skin .joints .entries ())
            {
               const inverseBindMatrix = skin .inverseBindMatrices [i] ?? Matrix4 .Identity;

               inverseBindMatrix .get (translation, rotation, scale);

               humanoidNode ._joints .push (this .nodeObject (this .nodes [joint], joint));
               humanoidNode ._jointBindingPositions .push (translation);
               humanoidNode ._jointBindingRotations .push (rotation);
               humanoidNode ._jointBindingScales .push (scale);
            }

            humanoidNode ._skinBindingNormal = shapeNodes [0] ._geometry .normal ?.getValue () ?.copy ();
            humanoidNode ._skinBindingCoord  = shapeNodes [0] ._geometry .coord ?.getValue () ?.copy ();
            humanoidNode ._skinNormal        = shapeNodes [0] ._geometry .normal;
            humanoidNode ._skinCoord         = shapeNodes [0] ._geometry .coord;
            humanoidNode ._skin .push (transformNode);

            humanoidNode .setup ();
         }
      }

      // Get children.

      transformNode ._children .push (... this .nodeChildrenArray (node .children));

      // Finish.

      transformNode .setup ();

      if (typeName === "Transform")
      {
         if (!transformNode ._children .length)
            return node .childNode = null;
      }

      return node .childNode = humanoidNode ?? transformNode;
   },
   nodeExtensions (extensions, transformNode)
   {
      if (!(extensions instanceof Object))
         return;

      this .nodeLight (extensions .KHR_lights_punctual, transformNode);
   },
   nodeLight (khrLightsPunctual, transformNode)
   {
      if (!(khrLightsPunctual instanceof Object))
         return;

      const lightNode = this .lightObject (this .lights [khrLightsPunctual .light]);

      if (!lightNode)
         return;

      ++ this .usedLights;

      transformNode ._children .push (lightNode);
   },
   nodeChildrenArray (children)
   {
      if (!(children instanceof Array))
         return [ ];

      return children
         .filter (index => !this .skeletons .has (index))
         .map (index => this .nodeObject (this .nodes [index], index))
         .filter (node => node);
   },
   skinsArray (skins)
   {
      if (!(skins instanceof Array))
         return;

      this .skins = skins;

      for (const skin of skins)
         this .skinObject (skin);
   },
   skinObject: function (skin)
   {
      if (!(skin instanceof Object))
         return;

      skin .joints = this .jointsArray (skin .joints);

      if (skin .skeleton === undefined)
         skin .skeleton = this .skeleton (skin .joints);

      this .skeletons .add (skin .skeleton);

      skin .inverseBindMatrices = this .inverseBindMatricesAccessors (this .accessors [skin .inverseBindMatrices]);
   },
   jointsArray: function (joints)
   {
      if (!(joints instanceof Array))
         return [ ];

      joints .forEach (index => this .joints .add (index));

      return joints;
   },
   skeleton: function (joints)
   {
      const children = new Set (joints
         .map (index => this .nodes [index])
         .filter (node => node instanceof Object)
         .filter (node => node .children instanceof Array)
         .flatMap (node => node .children));

      return joints .filter (index => !children .has (index)) [0];
   },
   inverseBindMatricesAccessors: function (inverseBindMatrices)
   {
      if (!inverseBindMatrices)
         return [ ];

      const
         array    = inverseBindMatrices .array,
         length   = array .length,
         matrices = [ ];

      for (let i = 0; i < length; i += 16)
         matrices .push (new Matrix4 (... array .subarray (i, i + 16)));

      return matrices;
   },
   scenesArray (scenes, sceneNumber)
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
            scene .addExportedNode (scene .getUniqueExportName ("Scenes"), switchNode);

            // Scenes.

            switchNode ._whichChoice = sceneNumber;
            switchNode ._children    = children;

            switchNode .setup ();

            scene .getRootNodes () .push (switchNode);
            return;
         }
      }
   },
   sceneObject (sceneObject)
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
            {
               scene .addNamedNode (scene .getUniqueName (name), groupNode);
               scene .addExportedNode (scene .getUniqueExportName (name), groupNode);
            }

            groupNode ._children = nodes;

            groupNode .setup ();

            return groupNode;
         }
      }
   },
   sceneNodesArray (nodes)
   {
      return this .nodeChildrenArray (nodes);
   },
   animationsArray (animations)
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
      scene .addExportedNode (scene .getUniqueExportName ("Animations"), groupNode);

      groupNode ._children = animationNodes;

      groupNode .setup ();

      scene .getRootNodes () .push (groupNode);
   },
   animationObject (animation)
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
      scene .addExportedNode (scene .getUniqueExportName (name || `Animation${this .animations}`), groupNode);
      scene .addExportedNode (scene .getUniqueExportName (`Timer${this .animations}`), timeSensorNode);

      timeSensorNode ._description = animation .name || `Animation ${this .animations}`;
      groupNode ._children .push (timeSensorNode, ... channelNodes);

      timeSensorNode .setup ();
      groupNode .setup ();

      return groupNode;
   },
   animationChannelsArray (channels, samplers, timeSensorNode)
   {
      if (!(channels instanceof Array))
         return [ ];

      if (!(samplers instanceof Array))
         return [ ];

      const cycleInterval = samplers
         .map (sampler => this .accessors [sampler .input])
         .filter (input => input ?.array .length)
         .reduce ((value, input) => Math .max (value, input .array .at (-1)), 0);

      timeSensorNode ._loop          = DEVELOPMENT;
      timeSensorNode ._cycleInterval = cycleInterval;

      return channels
         .map (channel => this .animationChannelObject (channel, samplers, timeSensorNode))
         .filter (node => node);
   },
   animationChannelObject (channel, samplers, timeSensorNode)
   {
      if (!(channel instanceof Object))
         return null;

      const target = channel .target;

      if (!(target instanceof Object))
         return null;

      const node = this .nodeObject (this .nodes [target .node], target .node);

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
   createNavigationInfo ()
   {
      const
         scene              = this .getExecutionContext (),
         navigationInfoNode = scene .createNode ("NavigationInfo", false);

      navigationInfoNode ._headlight = false;

      navigationInfoNode .setup ();

      return navigationInfoNode;
   },
   createShape (primitive, skin)
   {
      const
         scene          = this .getExecutionContext (),
         shapeNode      = scene .createNode ("Shape", false),
         appearanceNode = this .materialObject (primitive .material),
         geometryNode   = this .createGeometry (primitive, skin);

      shapeNode ._appearance = appearanceNode;
      shapeNode ._geometry   = geometryNode;

      shapeNode .setup ();

      return shapeNode;
   },
   getDefaultAppearance ()
   {
      if (this .defaultAppearance)
         return this .defaultAppearance;

      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance",       false),
         materialNode   = scene .createNode ("PhysicalMaterial", false);

      appearanceNode ._alphaMode = "OPAQUE";
      appearanceNode ._material  = materialNode;

      materialNode   .setup ();
      appearanceNode .setup ();

      this .defaultAppearance = appearanceNode;

      return appearanceNode;
   },
   createMultiTextureTransform (materialNode)
   {
      if (!+materialNode .getTextureBits ())
         return null;

      const textureTransformNodes = this .textureTransformNodes
         .sort ((a, b) => Algorithm .cmp (a ._mapping .getValue (), b ._mapping .getValue ()));

      switch (textureTransformNodes .length)
      {
         case 0:
         {
            if (this .textureTransformNode)
               return this .textureTransformNode;

            const
               scene                = this .getExecutionContext (),
               textureTransformNode = scene .createNode ("TextureTransform", false);

            textureTransformNode ._translation .y = -1;
            textureTransformNode ._scale .y       = -1;

            textureTransformNode .setup ();

            return this .textureTransformNode = textureTransformNode;
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
   createGeometry (primitive, skin)
   {
      switch (primitive .mode)
      {
         case 0: // POINTS
         {
            return this .createPointSet (primitive, skin);
         }
         case 1: // LINES
         {
            if (primitive .indices)
               return this .createIndexedLineSet (primitive, skin, 1);

            return this .createLineSet (primitive, skin);
         }
         case 2: // LINE_LOOP
         {
            return this .createIndexedLineSet (primitive, skin, 2);
         }
         case 3: // LINE_STRIP
         {
            return this .createIndexedLineSet (primitive, skin, 3);
         }
         default:
         case 4: // TRIANGLES
         {
            if (primitive .indices)
               return this .createIndexedTriangleSet (primitive, skin);

            return this .createTriangleSet (primitive, skin);
         }
         case 5: // TRIANGLE_STRIP
         {
            if (primitive .indices)
               return this .createIndexedTriangleStripSet (primitive, skin);

            return this .createTriangleStripSet (primitive, skin);
         }
         case 6: // TRIANGLE_FAN
         {
            if (primitive .indices)
               return this .createIndexedTriangleFanSet (primitive, skin);

            return this .createTriangleFanSet (primitive, skin);
         }
      }
   },
   createPointSet ({ attributes, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("PointSet", false);

      geometryNode ._color  = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal = this .createNormal (attributes .NORMAL);
      geometryNode ._coord  = this .createCoordinate (attributes .POSITION);

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedLineSet ({ attributes, indices, material }, skin, mode)
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

            break;
         }
         case 2: // LINE_LOOP
         {
            const coordIndex = geometryNode ._coordIndex;

            if (indices)
            {
               for (const i of indices .array)
                  coordIndex .push (i);

               if (coordIndex .length)
                  coordIndex .push (coordIndex [0], -1);
            }
            else
            {
               const coord = geometryNode ._coord;

               if (coord ?.point .length)
               {
                  for (const i of coord .point .keys ())
                     coordIndex .push (i);

                  coordIndex .push (0, -1);
               }
            }

            break;
         }
         case 3: // LINE_STRIP
         {
            const coordIndex = geometryNode ._coordIndex;

            if (indices)
            {
               for (const i of indices .array)
                  coordIndex .push (i);

               if (coordIndex .length)
                  coordIndex .push (-1);
            }
            else
            {
               const coord = geometryNode ._coord;

               if (coord ?.point .length)
               {
                  for (const i of coord .point .keys ())
                     coordIndex .push (i);

                  coordIndex .push (-1);
               }
            }

            break;
         }
      }

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createLineSet ({ attributes, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("LineSet", false);

      geometryNode ._color  = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal = this .createNormal (attributes .NORMAL);
      geometryNode ._coord  = this .createCoordinate (attributes .POSITION);

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleSet ({ attributes, indices, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleSet ({ attributes, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleStripSet ({ attributes, indices, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleStripSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleStripSet ({ attributes, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleStripSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
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

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleFanSet ({ attributes, indices, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("IndexedTriangleFanSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION);
      geometryNode ._normalPerVertex = !! geometryNode ._normal;

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleFanSet ({ attributes, material }, skin)
   {
      const
         scene        = this .getExecutionContext (),
         geometryNode = scene .createNode ("TriangleFanSet", false);

      geometryNode ._solid           = material ? !material .doubleSided : true;
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

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createColor: (() =>
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
   createMultiTextureCoordinate (texCoords, material)
   {
      const appearanceNode = this .materialObject (material);

      if (!+appearanceNode ._material .getValue () .getTextureBits ())
         return null;

      if (texCoords .textureCoordinateNode)
         return texCoords .textureCoordinateNode;

      switch (material .texCoordMappings .size)
      {
         case 0:
         {
            return null;
         }
         case 1:
         {
            return texCoords .textureCoordinateNode = [... material .texCoordMappings .entries ()]
               .map (([mapping, i]) => this .createTextureCoordinate (texCoords [i], mapping)) [0];
         }
         default:
         {
            const textureCoordinateNodes = [... material .texCoordMappings .entries ()]
               .map (([mapping, i]) => this .createTextureCoordinate (texCoords [i], mapping))
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
   createTextureCoordinate (texCoord, mapping)
   {
      if (!(texCoord instanceof Object))
         return null;

      if (texCoord .type !== "VEC2")
         return null;

      if (texCoord [mapping])
         return texCoord [mapping];

      const
         scene                 = this .getExecutionContext (),
         textureCoordinateNode = scene .createNode ("TextureCoordinate", false);

      textureCoordinateNode ._mapping = mapping;
      textureCoordinateNode ._point   = texCoord .array;

      textureCoordinateNode .setup ();

      return texCoord [mapping] = textureCoordinateNode;
   },
   createNormal (normal)
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
   createCoordinate (position)
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
   attributesJointsArray: function (skin, joints, weights)
   {
      if (!(skin instanceof Object))
         return;

      if (!(joints instanceof Array))
         return;

      if (!(weights instanceof Array))
         return;

      for (let i = 0, length = joints .length; i < length; ++ i)
         this .attributesJointsObject (skin, joints [i], weights [i]);
   },
   attributesJointsObject: function (skin, joints, weights)
   {
      if (!(joints instanceof Object))
         return;

      if (!(weights instanceof Object))
         return;

      if (joints .type !== "VEC4")
         return;

      if (weights .type !== "VEC4")
         return;

      const
         start        = skin .coordinateNode ._point .length,
         jointsArray  = joints .array,
         weightsArray = weights .array,
         numVertices  = jointsArray .length / 4;

      for (let v = 0; v < numVertices; ++ v)
      {
         for (let i = 0; i < 4; ++ i)
         {
            const w = weightsArray [v * 4 + i];

            if (w === 0)
               continue;

            const
               index     = skin .joints [jointsArray [v * 4 + i]],
               jointNode = this .nodeObject (this .nodes [index], index);

            jointNode ._skinCoordIndex  .push (v + start);
            jointNode ._skinCoordWeight .push (w);
         }
      }
   },
   skinGeometry: function (skin, geometryNode)
   {
      if (!(skin instanceof Object))
         return;

      const
         skinTextureCoordinateNode = skin .textureCoordinateNode,
         skinNormalNode            = skin .normalNode,
         skinCoordinateNode        = skin .coordinateNode,
         start                     = skinCoordinateNode ._point .length,
         textureCoordinateNode     = geometryNode ._texCoord ?.getValue (),
         normalNode                = geometryNode ._normal ?.getValue (),
         coordinateNode            = geometryNode ._coord ?.getValue ();

      if (geometryNode ._coordIndex)
         geometryNode ._coordIndex = geometryNode ._coordIndex .map (index => index < 0 ? -1 : index + start);

      if (geometryNode ._index)
         geometryNode ._index = geometryNode ._index .map (index => index < 0 ? -1 : index + start);

      if (textureCoordinateNode)
      {
         const point = skinTextureCoordinateNode ._point;
         textureCoordinateNode ._point .forEach ((p, i) => point [i + start] = p);
         geometryNode ._texCoord = skinTextureCoordinateNode;
      }

      if (normalNode)
      {
         const vector = skinNormalNode ._vector;
         normalNode ._vector .forEach ((v, i) => vector [i + start] = v);
         geometryNode ._normal = skinNormalNode;
      }

      if (coordinateNode)
      {
         const point = skinCoordinateNode ._point;
         coordinateNode ._point .forEach ((p, i) => point [i + start] = p);
         geometryNode ._coord = skinCoordinateNode;
      }
   },
   createInterpolator (path, interpolation, times, keyValues, cycleInterval)
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
   createPositionInterpolator (interpolation, times, keyValues, cycleInterval)
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
               interpolatorNode ._key .push (times [i] / cycleInterval, times [i] / cycleInterval);

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
   createOrientationInterpolator (interpolation, times, keyValues, cycleInterval)
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
               interpolatorNode ._key .push (times [i] / cycleInterval, times [i] / cycleInterval);

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
   cubicSpline (time, times, values)
   {
      const
         index1 = Algorithm .clamp (Algorithm .upperBound (times, 0, times .length, time), 1, times .length - 1),
         index0 = index1 - 1,
         td     = times [index1] - times [index0],
         t1     = (time - times [index0]) / td,
         t2     = t1 * t1,
         t3     = t2 * t1,
         v0     = values [index0 * 3 + 1] .copy (),
         b0     = values [index0 * 3 + 2] .copy (),
         v1     = values [index1 * 3 + 1] .copy (),
         a1     = values [index1 * 3 + 0] .copy ();

      v0 .multiply (2 * t3 - 3 * t2 + 1);
      b0 .multiply (td * (t3 - 2 * t2 + t1));
      v1 .multiply (-2 * t3 + 3 * t2);
      a1 .multiply (td * (t3 - t2));

      return v0 .add (b0) .add (v1) .add (a1);
   },
   vectorValue (array, vector)
   {
      if (!(array instanceof Array))
         return false;

      if (array .length !== vector .length)
         return false;

      vector .set (... array);

      return true;
   },
   numberValue (value, defaultValue)
   {
      if (typeof value !== "number")
         return defaultValue;

      return value;
   },
   stringValue (value, defaultValue)
   {
      if (typeof value !== "string")
         return defaultValue;

      return value;
   },
});

export default GLTF2Parser;
