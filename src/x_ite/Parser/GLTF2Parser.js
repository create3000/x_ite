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
import Fields       from "../Fields.js";
import X3DConstants from "../Base/X3DConstants.js";
import URLs         from "../Browser/Networking/URLs.js";
import Algorithm    from "../../standard/Math/Algorithm.js";
import Vector2      from "../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Quaternion   from "../../standard/Math/Numbers/Quaternion.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Color3       from "../../standard/Math/Numbers/Color3.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";

// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
// https://github.com/KhronosGroup/glTF-Sample-Assets

const SAMPLES_PER_SECOND = 30; // in 1/s

function GLTF2Parser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeEmptyGroups     = true;
   this .combineGroupingNodes  = true;
   this .optimizeInterpolators = true;

   // Globals

   this .extensions              = new Set ();
   this .envLights               = [ ];
   this .lights                  = [ ];
   this .materialVariants        = [ ];
   this .materialVariantNodes    = [ ];
   this .buffers                 = [ ];
   this .bufferViews             = [ ];
   this .accessors               = [ ];
   this .samplers                = [ ];
   this .materials               = [ ];
   this .textureTransformNodes   = [ ];
   this .meshes                  = [ ];
   this .cameras                 = [ ];
   this .nodes                   = [ ];
   this .skins                   = [ ];
   this .joints                  = new Set ();
   this .animationPointerScripts = [ ];
   this .pointerAliases          = new Map ();
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
         "skins",
         "nodes",
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
   async rootObject (glTF)
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
      this .extensionsArray  (glTF .extensionsRequired, this .extensions);
      this .extensionsArray  (glTF .extensionsUsed, this .extensions);
      this .extensionsObject (glTF .extensions);

      await browser .loadComponents (scene);
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
      this .skinsArray      (glTF .skins);
      this .nodesArray      (glTF .nodes);
      this .scenesArray     (glTF .scenes, glTF .scene);
      this .animationsArray (glTF .animations);

      this .viewpointsCenterOfRotation (this .getScene ());
      this .optimizeSceneGraph (this .getScene () .getRootNodes ());

      this .exportGroup ("Viewpoints",        this .cameras);
      this .exportGroup ("EnvironmentLights", this .envLights);
      this .exportGroup ("Lights",            this .lights);
      this .exportGroup ("Animations",        glTF .animations);

      this .materialVariantsSwitch ();

      return this .getScene ();
   },
   assetObject (asset)
   {
      if (!(asset instanceof Object))
         return;

      const
         scene         = this .getScene (),
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
      {
         const url = new URL (worldURL);

         if (url .protocol === "data:")
            worldInfoNode ._title = "glTF Model";
         else
            worldInfoNode ._title = decodeURIComponent (url .pathname .split ("/") .at (-1) || worldURL);
      }

      worldInfoNode .setup ();

      scene .getRootNodes () .push (worldInfoNode);
   },
   extensionsArray (extensions, set)
   {
      if (!(extensions instanceof Array))
         return;

      const
         browser    = this .getBrowser (),
         scene      = this .getScene (),
         components = [ ];

      for (const extension of extensions)
      {
         set .add (extension);

         switch (extension)
         {
            case "EXT_lights_image_based":
            {
               components .push (browser .getComponent ("CubeMapTexturing", 3));
               break;
            }
            // https://github.com/KhronosGroup/glTF/pull/1956
            // case "KHR_lights_environment": // in development
            // {
            //    break;
            // },
            case "EXT_mesh_gpu_instancing":
            case "KHR_materials_pbrSpecularGlossiness":
            case "KHR_materials_anisotropy":
            case "KHR_materials_clearcoat":
            case "KHR_materials_diffuse_transmission":
            case "KHR_materials_dispersion":
            case "KHR_materials_emissive_strength":
            case "KHR_materials_ior":
            case "KHR_materials_iridescence":
            case "KHR_materials_sheen":
            case "KHR_materials_specular":
            case "KHR_materials_transmission":
            case "KHR_materials_volume":
            {
               components .push (browser .getComponent ("X_ITE", 1));
               break;
            }
            case "KHR_texture_transform":
            {
               components .push (browser .getComponent ("Texturing3D", 2));
               components .push (browser .getComponent ("Scripting",   2));
               break;
            }
         }
      }

      for (const component of components)
      {
         if (!scene .hasComponent (component))
            scene .addComponent (component);
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
            case "EXT_lights_image_based":
               this .extLightsImageBasedObject (value);
               break;
            // https://github.com/KhronosGroup/glTF/pull/1956
            // case "KHR_lights_environment": // in development
            //    this .khrLightsEnvironment (value);
            //    break;
            case "KHR_lights_punctual":
               this .khrLightsPunctualObject (value);
               break;
            case "KHR_materials_variants":
               this .khrMaterialsVariantsObjectVariants (value);
               break;
         }
      }
   },
   extLightsImageBasedObject (EXT_lights_image_based)
   {
      if (!(EXT_lights_image_based instanceof Object))
         return;

      this .envLightsArray (EXT_lights_image_based .lights);
   },
   envLightsArray (lights)
   {
      if (!(lights instanceof Array))
         return;

      this .envLights = lights;
   },
   envLightObject (id, light = this .envLights [id])
   {
      if (!(light instanceof Object))
         return null;

      if (light .node)
         return light .node;

      const
         scene      = this .getScene (),
         lightNode  = scene .createNode ("EnvironmentLight", false),
         name       = `EnvironmentLight${id + 1}`,
         quaternion = new Quaternion ();

      scene .addNamedNode    (scene .getUniqueName       (name), lightNode);
      scene .addExportedNode (scene .getUniqueExportName (name), lightNode);

      lightNode ._global    = false;
      lightNode ._intensity = this .numberValue (light .intensity, 1);

      if (this .vectorValue (lightNode .rotation, quaternion))
         lightNode ._rotation = new Rotation4 (0, 0, 1, Math .PI) .multRight (new Rotation4 (quaternion));
      else
         lightNode ._rotation = new Rotation4 (0, 0, 1, Math .PI);

      if (light .irradianceCoefficients instanceof Array)
      {
         for (const irradianceCoefficient of light .irradianceCoefficients)
         {
            if (!(irradianceCoefficient instanceof Array))
               continue;

            lightNode ._diffuseCoefficients .push (... irradianceCoefficient);
         }
      }

      if (light .specularImages instanceof Array)
      {
         const
            specularTextureNode = scene .createNode ("ComposedCubeMapTexture", false),
            baseImages          = light .specularImages [0];

         if (baseImages instanceof Array)
         {
            const faces = ["right", "left", "bottom", "top", "front", "back"];

            for (const [i, image] of baseImages .map (image => this .images [image]) .entries ())
            {
               const
                  textureNode = scene .createNode ("ImageTexture", false),
                  name        = this .sanitizeName (image ?.name);

               if (name)
                  scene .addNamedNode (scene .getUniqueName (name), textureNode);

               textureNode ._description = image ?.name ?? "";
               textureNode ._url         = image ? [image .uri] : [ ];
               textureNode .setup ();

               specularTextureNode [`_${faces [i]}Texture`] = textureNode;
            }

            specularTextureNode .setup ();

            lightNode ._specularTexture = specularTextureNode;
         }
      }

      lightNode .setup ();

      light .pointers = [lightNode];

      return light .node = lightNode;
   },
   khrLightsPunctualObject (KHR_lights_punctual)
   {
      if (!(KHR_lights_punctual instanceof Object))
         return;

      this .lightsArray (KHR_lights_punctual .lights);
   },
   lightsArray (lights)
   {
      if (!(lights instanceof Array))
         return;

      this .lights = lights;
   },
   lightObject (id, light = this .lights [id])
   {
      if (!(light instanceof Object))
         return null;

      if (light .node)
         return light .node;

      const lightNode = this .lightType (light);

      if (!lightNode)
         return null;

      const
         scene = this .getScene (),
         name  = this .sanitizeName (light .name) || `Light${id + 1}`;

      const color = new Color3 (1, 1, 1);

      if (this .vectorValue (light .color, color))
         lightNode ._color = color;

      lightNode ._global    = true;
      lightNode ._intensity = this .numberValue (light .intensity, 1);

      lightNode .setup ();

      scene .addNamedNode    (scene .getUniqueName       (name), lightNode);
      scene .addExportedNode (scene .getUniqueExportName (name), lightNode);

      light .pointers = [lightNode];

      return light .node = lightNode;
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
         scene     = this .getScene (),
         lightNode = scene .createNode ("DirectionalLight", false);

      return lightNode;
   },
   spotLight (light)
   {
      const
         scene     = this .getScene (),
         lightNode = scene .createNode ("SpotLight", false);

      lightNode ._radius      = this .numberValue (light .range, 0) || -1;
      lightNode ._cutOffAngle = this .numberValue (light .outerConeAngle, Math .PI / 4);
      lightNode ._beamWidth   = this .numberValue (light .innerConeAngle, 0);
      lightNode ._attenuation = new Vector3 (0, 0, 1);

      this .addAnimationPointerAlias (lightNode, "range",          "radius");
      this .addAnimationPointerAlias (lightNode, "outerConeAngle", "cutOffAngle");
      this .addAnimationPointerAlias (lightNode, "innerConeAngle", "beamWidth");

      return lightNode;
   },
   pointLight (light)
   {
      const
         scene     = this .getScene (),
         lightNode = scene .createNode ("PointLight", false);

      lightNode ._radius      = this .numberValue (light .range, 0) || -1;
      lightNode ._attenuation = new Vector3 (0, 0, 1);

      this .addAnimationPointerAlias (lightNode, "range", "radius");

      return lightNode;
   },
   khrMaterialsVariantsObjectVariants (KHR_materials_variants)
   {
      if (!(KHR_materials_variants instanceof Object))
         return;

      const variants = KHR_materials_variants .variants;

      if (!(variants instanceof Array))
         return;

      this .materialVariants = variants;
   },
   async buffersArray (buffers)
   {
      if (!(buffers instanceof Array))
         return;

      this .buffers = await Promise .all (buffers .map ((buffer, i) => this .bufferObject (buffer, i)));
   },
   async bufferObject (buffer, i)
   {
      if (!(buffer instanceof Object))
         return;

      if (!buffer .uri)
         return this .buffers [i];

      const
         url         = new URL (buffer .uri, this .getScene () .getBaseURL ()),
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

               let value;

               value = this .denseArray (TypedArray, components, count, stride, array);
               value = this .sparseObject (accessor, components, value);
               value = this .normalizedArray (accessor, value);

               Object .defineProperty (accessor, "array", { value });

               return value;
            },
            configurable: true,
         });
      };
   })(),
   denseArray (TypedArray, components, count, stride, array)
   {
      if (stride === components)
         return array;

      const
         length = count * components,
         dense  = new TypedArray (length);

      for (let i = 0, j = 0; i < length; j += stride)
      {
         for (let c = 0; c < components; ++ c, ++ i)
            dense [i] = array [j + c];
      }

      return dense;
   },
   sparseObject: (() =>
   {
      const TypedArrays = new Map ([
         [5121, Uint8Array],
         [5123, Uint16Array],
         [5125, Uint32Array],
      ]);

      return function ({ sparse }, components, array)
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
   normalizedArray ({ normalized, componentType }, array)
   {
      if (!normalized)
         return array;

      switch (componentType)
      {
         case 5120: // Int8Array
            return Float32Array .from (array, v => Math .max (v / 127, -1));
         case 5121: // Uint8Array
            return Float32Array .from (array, v => v / 255);
         case 5122: // Int16Array
            return Float32Array .from (array, v => Math .max (v / 32767, -1));
         case 5123: // Uint16Array
            return Float32Array .from (array, v => v / 65535);
         case 5124: // Int32Array
            return Float32Array .from (array, v => Math .max (v / 2147483647, -1));
         case 5125: // Uint32Array
            return Float32Array .from (array, v => v / 4294967295);
         case 5126: // Float32Array
            return array;
      }
   },
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
                  scene                 = this .getScene (),
                  texturePropertiesNode = scene .createNode ("TextureProperties", false),
                  name                  = this .sanitizeName (sampler .name);

               if (name)
                  scene .addNamedNode (scene .getUniqueName (name), texturePropertiesNode);

               // minFilter

               const minificationFilter = MinificationFilters .get (sampler .minFilter) ?? ["AVG_PIXEL_AVG_MIPMAP", true];

               texturePropertiesNode ._minificationFilter = minificationFilter [0];
               texturePropertiesNode ._generateMipMaps    = minificationFilter [1];

               // magFilter

               texturePropertiesNode ._magnificationFilter = MagnificationFilters .get (sampler .magFilter) ?? "AVG_PIXEL";

               // boundaryMode

               texturePropertiesNode ._boundaryModeS = BoundaryModes .get (sampler .wrapS) ?? "REPEAT";
               texturePropertiesNode ._boundaryModeT = BoundaryModes .get (sampler .wrapT) ?? "REPEAT";

               // anisotropicDegree

               texturePropertiesNode ._anisotropicDegree = this .getBrowser () .getRenderingProperty ("MaxAnisotropicDegree");

               // setup

               texturePropertiesNode .setup ();

               Object .defineProperty (sampler, "texturePropertiesNode", { value: texturePropertiesNode });

               return texturePropertiesNode;
            },
            configurable: true,
         });
      };
   })(),
   async imagesArray (images)
   {
      if (!(images instanceof Array))
         return;

      this .images = await Promise .all (images .map (image => this .imageObject (image)));
   },
   async imageObject (image)
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

      const images = this .textureImageObject (texture);

      if (!images .length)
         return null;

      if (texture .textureNode)
         return texture .textureNode;

      const
         scene       = this .getScene (),
         textureNode = scene .createNode ("ImageTexture", false),
         name        = this .sanitizeName (texture .name || images [0] .name);

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), textureNode);

      textureNode ._url                  = images .map (image => image .uri);
      textureNode ._colorSpaceConversion = false;

      const sampler = this .samplers [texture .sampler];

      if (sampler instanceof Object)
         textureNode ._textureProperties = sampler .texturePropertiesNode;

      textureNode .setup ();

      return texture .textureNode = textureNode;
   },
   textureImageObject (texture)
   {
      const images = [this .images [texture .source]];

      if (this .extensions .has ("KHR_texture_basisu"))
         images .unshift (this .images [texture .extensions ?.KHR_texture_basisu ?.source]);

      if (this .extensions .has ("EXT_texture_webp"))
         images .unshift (this .images [texture .extensions ?.EXT_texture_webp ?.source]);

      return images .filter (image => image);
   },
   materialsArray (materials)
   {
      if (!(materials instanceof Array))
         return;

      this .materials = materials;
   },
   materialObject ({ material })
   {
      if (!(material instanceof Object))
         return this .getDefaultAppearance ();

      if (material .appearanceNode)
         return material .appearanceNode;

      const texCoordIndices = this .getTexCoordIndices ("", material);

      this .texCoordIndex           = Array .from (texCoordIndices) .reduce ((p, c) => Math .max (p, c), -1);
      this .textureTransformNodes   = [ ];
      this .texCoordMappings        = new Map ();
      this .texCoordOfNode          = new Map ();
      this .texCoordExtensionOfNode = new Map ();
      material .texCoordMappings    = this .texCoordMappings;

      const
         scene          = this .getScene (),
         appearanceNode = scene .createNode ("Appearance", false),
         materialNode   = this .createMaterial (material),
         name           = this .sanitizeName (material .name);

      const emissiveFactor = new Color3 ();

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
            // If there are texture transform nodes, create a TextureTransform node for missing mappings.

            if (this .textureTransformNodes .every (node => node ._mapping !== mapping))
            {
               const textureTransformNode = scene .createNode ("TextureTransform", false);

               textureTransformNode ._mapping        = mapping;
               textureTransformNode ._translation .y = -1;
               textureTransformNode ._scale .y       = -1;

               textureTransformNode .setup ();

               this .textureTransformNodes .push (textureTransformNode);
            }
         }

         this .texCoordMappings .set (mapping, i);
      }

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), appearanceNode);

      appearanceNode ._alphaMode        = this .stringValue (material .alphaMode, "OPAQUE");
      appearanceNode ._alphaCutoff      = this .numberValue (material .alphaCutoff, 0.5);
      appearanceNode ._material         = this .khrMaterialsUnlitObject (material .extensions ?.KHR_materials_unlit, materialNode);
      appearanceNode ._textureTransform = this .createMultiTextureTransform (appearanceNode ._material .getValue ());

      appearanceNode .setup ();

      material .pointers = [appearanceNode, materialNode];

      return material .appearanceNode = appearanceNode;
   },
   getTexCoordIndices (key, object, indices = new Set ())
   {
      if (!(object instanceof Object))
         return indices;

      if (key .endsWith ("Texture") && !object ?.extensions ?.KHR_texture_transform)
         indices .add (object .texCoord || 0);

      for (const [key, value] of Object .entries (object))
         this .getTexCoordIndices (key, value, indices);

      return indices;
   },
   createMaterial (material)
   {
      const materials = [
         this .pbrMetallicRoughnessObject  .bind (this, material .pbrMetallicRoughness),
         this .pbrSpecularGlossinessObject .bind (this, material .extensions ?.KHR_materials_pbrSpecularGlossiness),
         this .pbrMetallicRoughnessObject  .bind (this, { }),
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
         scene        = this .getScene (),
         materialNode = scene .createNode ("PhysicalMaterial", false);

      const
         baseColorFactor = new Color4 (),
         baseColor       = new Color3 ();

      if (this .vectorValue (pbrMetallicRoughness .baseColorFactor, baseColorFactor))
      {
         materialNode ._baseColor    = baseColor .set (... baseColorFactor);
         materialNode ._transparency = 1 - baseColorFactor .a;
      }

      materialNode ._metallic  = this .numberValue (pbrMetallicRoughness .metallicFactor,  1);
      materialNode ._roughness = this .numberValue (pbrMetallicRoughness .roughnessFactor, 1);

      materialNode ._baseTexture                     = this .textureInfo (pbrMetallicRoughness .baseColorTexture);
      materialNode ._baseTextureMapping              = this .textureMapping (pbrMetallicRoughness .baseColorTexture);
      materialNode ._metallicRoughnessTexture        = this .textureInfo (pbrMetallicRoughness .metallicRoughnessTexture);
      materialNode ._metallicRoughnessTextureMapping = this .textureMapping (pbrMetallicRoughness .metallicRoughnessTexture);

      pbrMetallicRoughness .pointers = [materialNode];

      return materialNode;
   },
   pbrSpecularGlossinessObject (pbrSpecularGlossiness)
   {
      if (!(pbrSpecularGlossiness instanceof Object))
         return null;

      const
         scene        = this .getScene (),
         materialNode = scene .createNode ("SpecularGlossinessMaterial", false);

      const
         diffuseFactor  = new Color4 (),
         diffuseColor   = new Color3 (),
         specularFactor = new Color3 ();

      if (this .vectorValue (pbrSpecularGlossiness .diffuseFactor, diffuseFactor))
      {
         materialNode ._diffuseColor = diffuseColor .set (... diffuseFactor);
         materialNode ._transparency = 1 - diffuseFactor .a;
      }

      materialNode ._diffuseTexture        = this .textureInfo (pbrSpecularGlossiness .diffuseTexture);
      materialNode ._diffuseTextureMapping = this .textureMapping (pbrSpecularGlossiness .diffuseTexture);

      if (this .vectorValue (pbrSpecularGlossiness .specularFactor, specularFactor))
         materialNode ._specularColor = specularFactor;
      else
         materialNode ._specularColor = Color3 .White;

      materialNode ._glossiness = this .numberValue (pbrSpecularGlossiness .glossinessFactor, 1);

      materialNode ._specularGlossinessTexture        = this .textureInfo (pbrSpecularGlossiness .specularGlossinessTexture);
      materialNode ._specularGlossinessTextureMapping = this .textureMapping (pbrSpecularGlossiness .specularGlossinessTexture);

      pbrSpecularGlossiness .pointers = [materialNode];

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
            case "KHR_materials_anisotropy":
               this .khrMaterialsAnisotropyObject (value, materialNode);
               break;
            case "KHR_materials_clearcoat":
               this .khrMaterialsClearcoatObject (value, materialNode);
               break;
            case "KHR_materials_diffuse_transmission":
               this .khrMaterialsDiffuseTransmissionObject (value, materialNode);
               break;
            case "KHR_materials_dispersion":
               this .khrMaterialsDispersionObject (value, materialNode);
               break;
            case "KHR_materials_emissive_strength":
               this .khrMaterialsEmissiveStrengthObject (value, materialNode);
               break;
            case "KHR_materials_ior":
               this .khrMaterialsIorStrengthObject (value, materialNode);
               break;
            case "KHR_materials_iridescence":
               this .khrMaterialsIridescenceObject (value, materialNode);
               break;
            case "KHR_materials_sheen":
               this .khrMaterialsSheenObject (value, materialNode);
               break;
            case "KHR_materials_specular":
               this .khrMaterialsSpecularObject (value, materialNode);
               break;
            case "KHR_materials_transmission":
               this .khrMaterialsTransmission (value, materialNode);
               break;
            case "KHR_materials_volume":
               this .khrMaterialsVolumeObject (value, materialNode);
               break;
         }
      }
   },
   khrMaterialsAnisotropyObject (KHR_materials_anisotropy, materialNode)
   {
      if (!(KHR_materials_anisotropy instanceof Object))
         return;

      const extension = this .getScene () .createNode ("AnisotropyMaterialExtension", false);

      extension ._anisotropyStrength       = this .numberValue (KHR_materials_anisotropy .anisotropyStrength, 0);
      extension ._anisotropyRotation       = this .numberValue (KHR_materials_anisotropy .anisotropyRotation, 0);
      extension ._anisotropyTexture        = this .textureInfo (KHR_materials_anisotropy .anisotropyTexture);
      extension ._anisotropyTextureMapping = this .textureMapping (KHR_materials_anisotropy .anisotropyTexture);

      extension .setup ();

      KHR_materials_anisotropy .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsClearcoatObject (KHR_materials_clearcoat, materialNode)
   {
      if (!(KHR_materials_clearcoat instanceof Object))
         return;

      const extension = this .getScene () .createNode ("ClearcoatMaterialExtension", false);

      extension ._clearcoat               = this .numberValue (KHR_materials_clearcoat .clearcoatFactor, 0);
      extension ._clearcoatTexture        = this .textureInfo (KHR_materials_clearcoat .clearcoatTexture);
      extension ._clearcoatTextureMapping = this .textureMapping (KHR_materials_clearcoat .clearcoatTexture);

      extension ._clearcoatRoughness               = this .numberValue (KHR_materials_clearcoat .clearcoatRoughnessFactor, 0);
      extension ._clearcoatRoughnessTexture        = this .textureInfo (KHR_materials_clearcoat .clearcoatRoughnessTexture);
      extension ._clearcoatRoughnessTextureMapping = this .textureMapping (KHR_materials_clearcoat .clearcoatRoughnessTexture);

      extension ._clearcoatNormalTexture        = this .textureInfo (KHR_materials_clearcoat .clearcoatNormalTexture);
      extension ._clearcoatNormalTextureMapping = this .textureMapping (KHR_materials_clearcoat .clearcoatNormalTexture);

      extension .setup ();

      KHR_materials_clearcoat .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsDiffuseTransmissionObject (KHR_materials_diffuse_transmission, materialNode)
   {
      if (!(KHR_materials_diffuse_transmission instanceof Object))
         return;

      const extension = this .getScene () .createNode ("DiffuseTransmissionMaterialExtension", false);

      extension ._diffuseTransmission               = this .numberValue (KHR_materials_diffuse_transmission .diffuseTransmissionFactor, 0);
      extension ._diffuseTransmissionTexture        = this .textureInfo (KHR_materials_diffuse_transmission .diffuseTransmissionTexture);
      extension ._diffuseTransmissionTextureMapping = this .textureMapping (KHR_materials_diffuse_transmission .diffuseTransmissionTexture);

      const diffuseTransmissionColorFactor = new Color3 ();

      if (this .vectorValue (KHR_materials_diffuse_transmission .diffuseTransmissionColorFactor, diffuseTransmissionColorFactor))
         extension ._diffuseTransmissionColor = diffuseTransmissionColorFactor;

      extension ._diffuseTransmissionColorTexture        = this .textureInfo (KHR_materials_diffuse_transmission .diffuseTransmissionColorTexture);
      extension ._diffuseTransmissionColorTextureMapping = this .textureMapping (KHR_materials_diffuse_transmission .diffuseTransmissionColorTexture);

      extension .setup ();

      KHR_materials_diffuse_transmission .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsDispersionObject (KHR_materials_dispersion, materialNode)
   {
      if (!(KHR_materials_dispersion instanceof Object))
         return;

      const extension = this .getScene () .createNode ("DispersionMaterialExtension", false);

      extension ._dispersion = this .numberValue (KHR_materials_dispersion .dispersion, 0);

      extension .setup ();

      KHR_materials_dispersion .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsEmissiveStrengthObject (KHR_materials_emissive_strength, materialNode)
   {
      if (!(KHR_materials_emissive_strength instanceof Object))
         return;

      const extension = this .getScene () .createNode ("EmissiveStrengthMaterialExtension", false);

      extension ._emissiveStrength = this .numberValue (KHR_materials_emissive_strength .emissiveStrength, 1);

      extension .setup ();

      materialNode ._extensions .push (extension);
   },
   khrMaterialsIorStrengthObject (KHR_materials_ior, materialNode)
   {
      const extension = this .getScene () .createNode ("IORMaterialExtension", false);

      extension ._indexOfRefraction = this .numberValue (KHR_materials_ior .ior, 1.5);

      extension .setup ();

      KHR_materials_ior .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsIridescenceObject (KHR_materials_iridescence, materialNode)
   {
      const extension = this .getScene () .createNode ("IridescenceMaterialExtension", false);

      extension ._iridescence                        = this .numberValue (KHR_materials_iridescence .iridescenceFactor, 0);
      extension ._iridescenceTexture                 = this .textureInfo (KHR_materials_iridescence .iridescenceTexture);
      extension ._iridescenceTextureMapping          = this .textureMapping (KHR_materials_iridescence .iridescenceTexture);
      extension ._iridescenceIndexOfRefraction       = this .numberValue (KHR_materials_iridescence .iridescenceIor, 1.3);
      extension ._iridescenceThicknessMinimum        = this .numberValue (KHR_materials_iridescence .iridescenceThicknessMinimum, 100);
      extension ._iridescenceThicknessMaximum        = this .numberValue (KHR_materials_iridescence .iridescenceThicknessMaximum, 400);
      extension ._iridescenceThicknessTexture        = this .textureInfo (KHR_materials_iridescence .iridescenceThicknessTexture);
      extension ._iridescenceThicknessTextureMapping = this .textureMapping (KHR_materials_iridescence .iridescenceThicknessTexture);

      extension .setup ();

      KHR_materials_iridescence .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsSheenObject (KHR_materials_sheen, materialNode)
   {
      if (!(KHR_materials_sheen instanceof Object))
         return;

      const extension = this .getScene () .createNode ("SheenMaterialExtension", false);

      const sheenColorFactor = new Color3 ();

      if (this .vectorValue (KHR_materials_sheen .sheenColorFactor, sheenColorFactor))
         extension ._sheenColor = sheenColorFactor;

      extension ._sheenColorTexture        = this .textureInfo (KHR_materials_sheen .sheenColorTexture);
      extension ._sheenColorTextureMapping = this .textureMapping (KHR_materials_sheen .sheenColorTexture);

      extension ._sheenRoughness               = this .numberValue (KHR_materials_sheen .sheenRoughnessFactor, 0);
      extension ._sheenRoughnessTexture        = this .textureInfo (KHR_materials_sheen .sheenRoughnessTexture);
      extension ._sheenRoughnessTextureMapping = this .textureMapping (KHR_materials_sheen .sheenRoughnessTexture);

      extension .setup ();

      KHR_materials_sheen .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsSpecularObject (KHR_materials_specular, materialNode)
   {
      if (!(KHR_materials_specular instanceof Object))
         return;

      const extension = this .getScene () .createNode ("SpecularMaterialExtension", false);

      extension ._specular               = this .numberValue (KHR_materials_specular .specularFactor, 1);
      extension ._specularTexture        = this .textureInfo (KHR_materials_specular .specularTexture);
      extension ._specularTextureMapping = this .textureMapping (KHR_materials_specular .specularTexture);

      const specularColorFactor = new Color3 ();

      if (this .vectorValue (KHR_materials_specular .specularColorFactor, specularColorFactor))
         extension ._specularColor = specularColorFactor;

      extension ._specularColorTexture        = this .textureInfo (KHR_materials_specular .specularColorTexture);
      extension ._specularColorTextureMapping = this .textureMapping (KHR_materials_specular .specularColorTexture);

      extension .setup ();

      KHR_materials_specular .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsTransmission (KHR_materials_transmission, materialNode)
   {
      if (!(KHR_materials_transmission instanceof Object))
         return;

      const extension = this .getScene () .createNode ("TransmissionMaterialExtension", false);

      extension ._transmission               = this .numberValue (KHR_materials_transmission .transmissionFactor, 0);
      extension ._transmissionTexture        = this .textureInfo (KHR_materials_transmission .transmissionTexture);
      extension ._transmissionTextureMapping = this .textureMapping (KHR_materials_transmission .transmissionTexture);

      extension .setup ();

      KHR_materials_transmission .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsVolumeObject (KHR_materials_volume, materialNode)
   {
      const extension = this .getScene () .createNode ("VolumeMaterialExtension", false);

      extension ._thickness               = this .numberValue (KHR_materials_volume .thicknessFactor, 0);
      extension ._thicknessTexture        = this .textureInfo (KHR_materials_volume .thicknessTexture);
      extension ._thicknessTextureMapping = this .textureMapping (KHR_materials_volume .thicknessTexture);
      extension ._attenuationDistance     = this .numberValue (KHR_materials_volume .attenuationDistance, 1_000_000);

      const attenuationColor = new Color3 ();

      if (this .vectorValue (KHR_materials_volume .attenuationColor, attenuationColor))
         extension ._attenuationColor = attenuationColor;

      extension .setup ();

      KHR_materials_volume .pointers = [extension];

      materialNode ._extensions .push (extension);
   },
   khrMaterialsUnlitObject (KHR_materials_unlit, materialNode)
   {
      if (!KHR_materials_unlit)
         return materialNode;

      const unlitMaterialNode = this .getScene () .createNode ("UnlitMaterial", false);

      unlitMaterialNode ._emissiveColor          = materialNode ._baseColor;
      unlitMaterialNode ._emissiveTextureMapping = materialNode ._baseTextureMapping;
      unlitMaterialNode ._emissiveTexture        = materialNode ._baseTexture;
      unlitMaterialNode ._normalScale            = materialNode ._normalScale;
      unlitMaterialNode ._normalTextureMapping   = materialNode ._normalTextureMapping;
      unlitMaterialNode ._normalTexture          = materialNode ._normalTexture;
      unlitMaterialNode ._transparency           = materialNode ._transparency;

      unlitMaterialNode .setup ();
      this .addAnimationPointerAlias (unlitMaterialNode, "baseColor", "emissiveColor");

      materialNode .dispose ();

      return unlitMaterialNode;
   },
   textureTransformObject (KHR_texture_transform, texCoord)
   {
      if (!(KHR_texture_transform instanceof Object))
         return;

      if (!this .extensions .has ("KHR_texture_transform"))
         return;

      texCoord = KHR_texture_transform .texCoord ?? texCoord;

      // Create matrix.

      const
         translation = new Vector2 (),
         scale       = new Vector2 (1, 1),
         matrix      = new Matrix4 ();

      matrix .scale (new Vector3 (1, -1, 1));
      matrix .translate (new Vector3 (0, -1, 0));

      if (this .vectorValue (KHR_texture_transform .offset, translation))
         matrix .translate (new Vector3 (... translation, 0));

      matrix .rotate (new Rotation4 (0, 0, -1, this .numberValue (KHR_texture_transform .rotation, 0)));

      if (this .vectorValue (KHR_texture_transform .scale, scale))
         matrix .scale (new Vector3 (... scale, 1));

      // Check for existing node.

      const existing = this .textureTransformNodes .find (node => this .texCoordOfNode .get (node) === texCoord && node ._matrix .getValue () .equals (matrix));

      if (existing)
      {
         Object .defineProperty (KHR_texture_transform, "pointers",
         {
            get: () =>
            {
               return this .texCoordExtensionOfNode .get (existing);
            },
            configurable: true,
         });

         return existing ._mapping .getValue ();
      }

      // Create new TextureTransformMatrix3D.

      const
         scene                = this .getScene (),
         textureTransformNode = scene .createNode ("TextureTransformMatrix3D", false),
         mapping              = `TEXCOORD_${this .texCoordIndex + this .textureTransformNodes .length + 1}`;

      textureTransformNode ._mapping = mapping;
      textureTransformNode ._matrix  = matrix;

      textureTransformNode .setup ();

      this .textureTransformNodes .push (textureTransformNode);
      this .texCoordMappings .set (mapping, texCoord);
      this .texCoordOfNode .set (textureTransformNode, texCoord);
      this .texCoordExtensionOfNode .set (textureTransformNode, KHR_texture_transform);

      Object .defineProperty (KHR_texture_transform, "pointers",
      {
         get: () =>
         {
            const scriptNode = scene .createNode ("Script", false);

            scriptNode .addUserDefinedField (X3DConstants .inputOutput, "translation",    new Fields .SFVec2f ());
            scriptNode .addUserDefinedField (X3DConstants .inputOutput, "rotation",       new Fields .SFFloat ());
            scriptNode .addUserDefinedField (X3DConstants .inputOutput, "scale",          new Fields .SFVec2f (1, 1));
            scriptNode .addUserDefinedField (X3DConstants .outputOnly,  "matrix_changed", new Fields .SFMatrix4f ());

            scriptNode ._url = [/* js */ `ecmascript:

const
   flip   = new SFMatrix3f (1, 0, 0, 0, -1, 0, 0, 1, 1),
   matrix = new SFMatrix3f ();

function eventsProcessed ()
{
   matrix .setTransform (translation, -rotation, scale);

   const m = flip .multLeft (matrix);

   matrix_changed [0]  = m [0];
   matrix_changed [1]  = m [1];
   matrix_changed [4]  = m [3];
   matrix_changed [5]  = m [4];
   matrix_changed [12] = m [6];
   matrix_changed [13] = m [7];
}
`];

            scriptNode .setup ();

            scene .addNamedNode (scene .getUniqueName ("TextureTransformAnimationScript"), scriptNode);
            scene .addRoute (scriptNode, "matrix_changed", textureTransformNode, "set_matrix");

            this .addAnimationPointerAlias (scriptNode, "offset", "translation");
            this .animationPointerScripts .push (scriptNode);

            Object .defineProperty (KHR_texture_transform, "pointers", { value: [scriptNode] });

            return [scriptNode];
         },
         configurable: true,
      });

      return mapping;
   },
   meshesArray (meshes)
   {
      if (!(meshes instanceof Array))
         return;

      this .meshes = meshes;
   },
   meshObject (mesh, skin, EXT_mesh_gpu_instancing)
   {
      if (!(mesh instanceof Object))
         return;

      if (mesh .shapeNodes)
      {
         const primitives = mesh .primitives;

         if (!(primitives instanceof Array))
            return mesh .shapeNodes;

         for (const primitive of primitives)
            this .attributesJointsArray (skin, primitive .attributes ?.JOINTS, primitive .attributes ?.WEIGHTS);

         return mesh .shapeNodes;
      }

      const shapeNodes = this .primitivesArray (mesh, skin, EXT_mesh_gpu_instancing);

      // Name Shape nodes.

      const
         scene = this .getScene (),
         name  = this .sanitizeName (mesh .name);

      if (name)
      {
         for (const shapeNode of shapeNodes)
            scene .addNamedNode (scene .getUniqueName (name), shapeNode);
      }

      return mesh .shapeNodes = shapeNodes;
   },
   primitivesArray ({ primitives, weights }, skin, EXT_mesh_gpu_instancing)
   {
      if (!(primitives instanceof Array))
         return [ ];

      const shapeNodes = [ ];

      for (const primitive of primitives)
         this .primitiveObject (primitive, weights, skin, EXT_mesh_gpu_instancing, shapeNodes);

      return shapeNodes;
   },
   primitiveObject (primitive, weights, skin, EXT_mesh_gpu_instancing, shapeNodes)
   {
      if (!(primitive instanceof Object))
         return;

      this .attributesObject (primitive .attributes);
      this .targetsArray     (primitive .targets);

      primitive .indices  = this .accessors [primitive .indices];
      primitive .material = this .materials [primitive .material];

      this .primitiveExtensionsObject (primitive .extensions, primitive);

      const
         shapeNode    = this .createShape (primitive, weights, skin, EXT_mesh_gpu_instancing),
         variantsNode = this .khrMaterialsVariantsExtension (primitive .extensions, shapeNode);

      shapeNodes .push (primitive .shapeNode = variantsNode ?? shapeNode);
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
               this .khrDracoMeshCompressionObject (value, primitive);
               break;
         }
      }
   },
   khrDracoMeshCompressionObject (draco, primitive)
   {
      if (!(draco instanceof Object))
         return;

      if (!this .draco)
         return;

      function indicesCallback (value)
      {
         Object .defineProperty (primitive .indices, "array", { value });
      }

      function attributeCallback (key, value)
      {
         if (attributes [key])
            Object .defineProperty (attributes [key], "array", { value });
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
   async createDraco ()
   {
      if (this .constructor .draco)
      {
         return this .constructor .draco;
      }
      else
      {
         const
            response = await fetch (URLs .getLibraryURL ("draco_decoder_gltf.js")),
            text     = await response .text (),
            draco    = await new Function (text) () ();

         return this .constructor .draco = draco;
      }
   },
   khrMaterialsVariantsExtension (extensions, shapeNode)
   {
      if (!(extensions instanceof Object))
         return;

      return this .khrMaterialsVariantsObjectMappings (extensions .KHR_materials_variants, shapeNode);
   },
   khrMaterialsVariantsObjectMappings (KHR_materials_variants, shapeNode)
   {
      if (!(KHR_materials_variants instanceof Object))
         return;

      const mappings = KHR_materials_variants .mappings;

      if (!(mappings instanceof Array))
         return;

      if (!mappings .length)
         return;

      const
         scene        = this .getScene (),
         variantsNode = scene .createNode ("Switch", false);

      for (const mapping of mappings)
         this .khrMaterialsVariantsObjectMapping (mapping, shapeNode, variantsNode);

      variantsNode ._whichChoice = this .materialVariants .length;

      if (!variantsNode ._children .length)
         return;

      // Last child ist default material.
      variantsNode ._children [this .materialVariants .length] = shapeNode;

      // Fall back to default material if no active variant.
      for (const i of variantsNode ._children .keys ())
      {
         if (!variantsNode ._children [i])
            variantsNode ._children [i] = shapeNode;
      }

      variantsNode .setup ();

      this .materialVariantNodes .push (variantsNode);

      return variantsNode;
   },
   khrMaterialsVariantsObjectMapping (mapping, shapeNode, variantsNode)
   {
      if (!(mapping instanceof Object))
         return;

      mapping .material = this .materials [mapping .material];

      if (!mapping .material)
         return;

      const
         scene          = this .getScene (),
         variantNode    = this .getScene () .createNode ("Shape", false),
         appearanceNode = this .materialObject (mapping),
         variant        = mapping .variants ?.[0] ?? 0,
         name           = this .sanitizeName (this .materialVariants [variant] ?.name ?? "");

      if (name)
         scene .addNamedNode (scene .getUniqueName (name), variantNode);

      variantNode ._appearance = appearanceNode;
      variantNode ._geometry   = shapeNode ._geometry;

      variantNode .setup ();

      variantsNode ._children [variant] = variantNode;
   },
   camerasArray (cameras)
   {
      if (!(cameras instanceof Array))
         return;

      this .cameras = cameras;
   },
   cameraObject (id, camera)
   {
      if (!(camera instanceof Object))
         return null;

      if (camera .node !== undefined)
         return camera .node;

      const viewpointNode = this .cameraType (camera);

      if (!viewpointNode)
         return camera .node = null;

      const
         scene = this .getScene (),
         name  = this .sanitizeName (camera .name);

      // Name

      if (name)
      {
         scene .addNamedNode    (scene .getUniqueName       (name), viewpointNode);
         scene .addExportedNode (scene .getUniqueExportName (name), viewpointNode);
      }

      viewpointNode ._description = this .description (camera .name || `Viewpoint ${id + 1}`);
      viewpointNode ._position    = Vector3 .Zero;

      camera .pointers = [viewpointNode];

      return camera .node = viewpointNode;
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
      if (!(camera instanceof Object))
         return null;

      const
         scene         = this .getScene (),
         viewpointNode = scene .createNode ("OrthoViewpoint", false);

      if (typeof camera .xmag === "number")
      {
         viewpointNode ._fieldOfView [0] = -camera .xmag;
         viewpointNode ._fieldOfView [2] = +camera .xmag;
      }

      if (typeof camera .ymag === "number")
      {
         viewpointNode ._fieldOfView [1] = -camera .ymag;
         viewpointNode ._fieldOfView [3] = +camera .ymag;
      }

      if (typeof camera .znear === "number")
         viewpointNode ._nearDistance = camera .znear;

      if (typeof camera .zfar === "number")
         viewpointNode ._farDistance = camera .zfar;

      viewpointNode .setup ();

      this .addAnimationPointerAlias (viewpointNode, "znear", "nearDistance");
      this .addAnimationPointerAlias (viewpointNode, "zfar",  "farDistance");

      return viewpointNode;
   },
   perspectiveCamera (camera)
   {
      if (!(camera instanceof Object))
         return null;

      const
         scene         = this .getScene (),
         viewpointNode = scene .createNode ("Viewpoint", false);

      if (typeof camera .yfov === "number")
         viewpointNode ._fieldOfView = camera .yfov;

      if (typeof camera .znear === "number")
         viewpointNode ._nearDistance = camera .znear;

      if (typeof camera .zfar === "number")
         viewpointNode ._farDistance = camera .zfar;

      viewpointNode .setup ();

      this .addAnimationPointerAlias (viewpointNode, "yfov",  "fieldOfView");
      this .addAnimationPointerAlias (viewpointNode, "znear", "nearDistance");
      this .addAnimationPointerAlias (viewpointNode, "zfar",  "farDistance");

      return viewpointNode;
   },
   nodesArray (nodes)
   {
      if (!(nodes instanceof Array))
         return;

      this .nodes = nodes .map ((node, index) => this .nodeObject (node, index));

      // 1. Replace skeleton nodes with humanoid.
      // 2. Add children.

      this .nodes .forEach (node => this .nodeSkeleton (node));
      this .nodes .forEach (node => this .nodeChildren (node));
   },
   nodeObject (node, index)
   {
      if (!(node instanceof Object))
         return { };

      if (node .transformNode)
         return node;

      // Create Transform or HAnimJoint.

      const
         scene         = this .getScene (),
         typeName      = this .joints .has (index) ? "HAnimJoint" : "Transform",
         transformNode = scene .createNode (typeName, false);

      node .transformNode = transformNode;

      // Create humanoid.

      const skin = this .skins [node .skin];

      if (skin)
      {
         // Skins can be cloned.

         if (!skin .humanoidNode)
            skin .humanoidNode = scene .createNode ("HAnimHumanoid", false);

         node .humanoidNode = skin .humanoidNode;
      }

      node .childNode = node .humanoidNode ?? node .transformNode;
      node .pointers  = [node .childNode];

      return node;
   },
   nodeSkeleton (node)
   {
      const skin = this .skins [node .skin];

      if (!skin)
         return;

      const
         skeleton     = this .nodes [skin .skeleton],
         humanoidNode = skin .humanoidNode;

      if (!skeleton)
         return;

      skeleton .humanoidNode = humanoidNode;
      skeleton .childNode    = humanoidNode;
   },
   nodeChildren (node)
   {
      const
         scene         = this .getScene (),
         transformNode = node .transformNode,
         name          = this .sanitizeName (node .name);

      // Name

      if (name)
      {
         scene .addNamedNode (scene .getUniqueName (name), transformNode);

         if (transformNode .getTypeName () === "HAnimJoint")
            transformNode ._name = node .name;
      }

      // Set transformation matrix.

      const
         translation      = new Vector3 (),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1, 1, 1),
         scaleOrientation = new Rotation4 (),
         quaternion       = new Quaternion (),
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

      // Add mesh.

      const
         skin                    = this .skins [node .skin],
         EXT_mesh_gpu_instancing = node .extensions ?.EXT_mesh_gpu_instancing,
         shapeNodes              = this .meshObject (this .meshes [node .mesh], skin, EXT_mesh_gpu_instancing);

      // Add camera.

      const viewpointNode = this .cameraObject (node .camera, this .cameras [node .camera]);

      if (viewpointNode)
         transformNode ._children .push (viewpointNode);

      // Add light.

      this .nodeLight (node .extensions ?.KHR_lights_punctual, transformNode);

      // Add children.

      transformNode ._children .push (... this .nodeChildrenArray (node .children));

      // Add Shape nodes.

      if (shapeNodes)
         transformNode ._children .push (... shapeNodes);

      transformNode .setup ();

      // Skin

      if (!skin)
         return;

      const humanoidNode = skin .humanoidNode;

      if (!humanoidNode .isInitialized ())
      {
         const name = this .sanitizeName (skin .name) || transformNode .getName ();

         if (name)
            scene .addNamedNode (scene .getUniqueName (name), humanoidNode);

         humanoidNode ._name                  = skin .name ?? node .name ?? "";
         humanoidNode ._version               = "2.0";
         humanoidNode ._skeletalConfiguration = "GLTF";

         const skeletonNode = this .nodes [skin .skeleton] ?.transformNode;

         if (skeletonNode)
            humanoidNode ._skeleton .push (skeletonNode);

         for (const [i, joint] of skin .joints .entries ())
         {
            const
               jointNode         = this .nodes [joint] ?.transformNode,
               inverseBindMatrix = skin .inverseBindMatrices [i] ?? Matrix4 .Identity;

            if (!jointNode)
               continue;

            inverseBindMatrix .get (translation, rotation, scale);

            humanoidNode ._joints                .push (jointNode);
            humanoidNode ._jointBindingPositions .push (translation);
            humanoidNode ._jointBindingRotations .push (rotation);
            humanoidNode ._jointBindingScales    .push (scale);
         }

         humanoidNode .setup ();
      }

      if (shapeNodes ?.length)
      {
         humanoidNode ._skinNormal = shapeNodes [0] ._geometry .normal;
         humanoidNode ._skinCoord  = shapeNodes [0] ._geometry .coord;
      }

      humanoidNode ._skin .push (transformNode);
   },
   nodeLight (KHR_lights_punctual, transformNode)
   {
      if (!(KHR_lights_punctual instanceof Object))
         return;

      const lightNode = this .lightObject (KHR_lights_punctual .light);

      if (!lightNode)
         return;

      transformNode ._children .push (lightNode);
   },
   nodeChildrenArray (children)
   {
      if (!(children instanceof Array))
         return [ ];

      const nodes = Array .from (new Set (children
         .map (index => this .nodes [index] ?.childNode)
         .filter (node => node)
         .filter (node => node .getTypeName () !== "HAnimHumanoid" || !node .getCloneCount ())
      ));

      return nodes;
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

      const scene = this .getScene ();

      skin .joints              = this .jointsArray (skin .joints);
      skin .skeleton            = skin .skeleton ?? this .skeleton (skin .joints);
      skin .inverseBindMatrices = this .inverseBindMatricesAccessors (this .accessors [skin .inverseBindMatrices]);

      skin .textureCoordinateNode      = scene .createNode ("TextureCoordinate",      false);
      skin .multiTextureCoordinateNode = scene .createNode ("MultiTextureCoordinate", false);
      skin .normalNode                 = scene .createNode ("Normal",                 false);
      skin .coordinateNode             = scene .createNode ("Coordinate",             false);

      skin .textureCoordinateNode ._mapping = "TEXCOORD_0";

      skin .textureCoordinateNode      .setup ();
      skin .multiTextureCoordinateNode .setup ();
      skin .normalNode                 .setup ();
      skin .coordinateNode             .setup ();
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
   scenesArray (scenes, sceneNumber = 0)
   {
      if (!(scenes instanceof Array))
         return;

      const
         scene    = this .getScene (),
         children = scenes .map (scene => this .sceneObject (scene)) .filter (node => node);

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
               scene .getRootNodes () .push (children [0]);
               return;
            }

            // Proceed with next case:
         }
         default:
         {
            // Root

            const switchNode = scene .createNode ("Switch", false);

            scene .addNamedNode    (scene .getUniqueName       ("Scenes"), switchNode);
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
   sceneObject (scene)
   {
      if (!(scene instanceof Object))
         return null;

      const
         lightNode = this .envLightObject (scene .extensions ?.EXT_lights_image_based ?.light),
         nodes     = this .sceneNodesArray (scene .nodes);

      if (lightNode)
         nodes .unshift (lightNode);

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
               scene     = this .getScene (),
               groupNode = scene .createNode ("Group", false),
               name      = this .sanitizeName (scene .name);

            if (name)
               scene .addNamedNode (scene .getUniqueName (name), groupNode);

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
   exportGroup (name, array)
   {
      if (!(array instanceof Array))
         return;

      const nodes = array .map (object => object .node) .filter (node => node);

      if (!nodes .length)
         return;

      const
         scene     = this .getScene (),
         groupNode = scene .createNode ("Group", false);

      scene .addNamedNode    (scene .getUniqueName       (name), groupNode);
      scene .addExportedNode (scene .getUniqueExportName (name), groupNode);

      groupNode ._visible  = false;
      groupNode ._children = nodes;

      groupNode .setup ();

      scene .getRootNodes () .push (groupNode);
   },
   materialVariantsSwitch ()
   {
      if (!this .materialVariantNodes .length)
         return;

      const
         scene      = this .getScene (),
         switchNode = scene .createNode ("Switch", false),
         names      = this .materialVariants .map (object => object .name);

      scene .addNamedNode    (scene .getUniqueName       ("MaterialVariants"), switchNode);
      scene .addExportedNode (scene .getUniqueExportName ("MaterialVariants"), switchNode);

      switchNode ._whichChoice = 0;
      switchNode ._visible     = false;

      switchNode .setup ();

      switchNode .setMetaData ("MaterialVariants/names", new Fields .MFString (... names));

      for (const variantNode of this .materialVariantNodes)
         scene .addRoute (switchNode, "whichChoice", variantNode, "whichChoice");

      scene .getRootNodes () .push (switchNode);
   },
   animationsArray (animations)
   {
      if (!(animations instanceof Array))
         return;

      for (const [i, animation] of animations .entries ())
         this .animationObject (i, animation);
   },
   animationObject (id, animation)
   {
      if (!(animation instanceof Object))
         return null;

      const
         scene          = this .getScene (),
         timeSensorNode = scene .createNode ("TimeSensor", false),
         channelNodes   = this .animationChannelsArray (animation .channels, animation .samplers, timeSensorNode);

      if (!channelNodes .length)
         return;

      const
         groupNode = scene .createNode ("Group", false),
         name      = this .sanitizeName (animation .name);

      scene .addNamedNode (scene .getUniqueName (name || `Animation${id + 1}`), groupNode);
      scene .addNamedNode (scene .getUniqueName (`Timer${id + 1}`), timeSensorNode);
      scene .addExportedNode (scene .getUniqueExportName (name || `Animation${id + 1}`), groupNode);
      scene .addExportedNode (scene .getUniqueExportName (`Timer${id + 1}`), timeSensorNode);

      timeSensorNode ._description = this .description (animation .name) || `Animation ${id + 1}`;
      groupNode ._visible = false;
      groupNode ._children .push (timeSensorNode, ... channelNodes, ... this .animationPointerScripts);

      timeSensorNode .setup ();
      groupNode .setup ();

      this .animationPointerScripts .length = 0;

      animation .node = groupNode;
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

      timeSensorNode ._cycleInterval = cycleInterval;

      return channels
         .flatMap (channel => this .animationChannelObject (channel, samplers, timeSensorNode));
   },
   animationChannelObject (channel, samplers, timeSensorNode)
   {
      if (!(channel instanceof Object))
         return [ ];

      const target = channel .target;

      if (!(target instanceof Object))
         return [ ];

      const node = this .nodes [target .node] ?.transformNode;

      if (!node && target .path !== "pointer")
         return [ ];

      const sampler = samplers [channel .sampler];

      if (!sampler)
         return [ ];

      const input = this .accessors [sampler .input];

      if (!input)
         return [ ];

      if (!input .array .length)
         return [ ];

      const output = this .accessors [sampler .output];

      if (!output)
         return [ ];

      if (!output .array .length)
         return [ ];

      return this .createInterpolator (timeSensorNode, node, target, sampler .interpolation, input .array, output, timeSensorNode ._cycleInterval .getValue ());
   },
   createShape (primitive, weights, skin, EXT_mesh_gpu_instancing)
   {
      const
         scene          = this .getScene (),
         shapeNode      = this .meshInstancing (EXT_mesh_gpu_instancing) ?? scene .createNode ("Shape", false),
         appearanceNode = this .materialObject (primitive),
         geometryNode   = this .createGeometry (primitive, weights, skin);

      shapeNode ._appearance = appearanceNode;
      shapeNode ._geometry   = geometryNode;

      shapeNode .setup ();

      return shapeNode;
   },
   meshInstancing (EXT_mesh_gpu_instancing)
   {
      if (!(EXT_mesh_gpu_instancing instanceof Object))
         return null;

      let
         attributes  = EXT_mesh_gpu_instancing .attributes,
         translation = this .accessors [attributes ?.TRANSLATION],
         rotation    = this .accessors [attributes ?.ROTATION],
         scale       = this .accessors [attributes ?.SCALE],
         count       = Math .max (translation ?.count ?? 0, rotation ?.count ?? 0, scale ?.count ?? 0);

      if (!count)
         return null;

      if (translation ?.type !== "VEC3")
         translation = null;

      if (rotation ?.type !== "VEC4")
         rotation = null;

      if (scale ?.type !== "VEC3")
         scale = null;

      const
         scene              = this .getScene (),
         instancedShapeNode = scene .createNode ("InstancedShape", false),
         translationArray   = translation ?.array,
         rotationArray      = rotation ?.array,
         scaleArray         = scale ?.array;

      if (translationArray)
         instancedShapeNode ._translations = translationArray;

      if (rotationArray)
      {
         const length = rotation .count * 4;

         for (let i = 0; i < length; i += 4)
         {
            instancedShapeNode ._rotations .push (new Rotation4 (new Quaternion (rotationArray [i + 0],
                                                                                 rotationArray [i + 1],
                                                                                 rotationArray [i + 2],
                                                                                 rotationArray [i + 3])));
         }
      }

      if (scaleArray)
         instancedShapeNode ._scales = scaleArray;

      instancedShapeNode .setup ();

      return instancedShapeNode;
   },
   getDefaultAppearance ()
   {
      if (this .defaultAppearance)
         return this .defaultAppearance;

      const
         scene          = this .getScene (),
         appearanceNode = scene .createNode ("Appearance", false),
         materialNode   = scene .createNode ("PhysicalMaterial", false);

      appearanceNode ._alphaMode = "OPAQUE";
      appearanceNode ._material  = materialNode;
      materialNode   ._metallic  = 0;

      materialNode   .setup ();
      appearanceNode .setup ();

      return this .defaultAppearance = appearanceNode;
   },
   hasTextures (materialNode)
   {
      // Test PhysicalMaterial, UnlitMaterial ...

      if (+materialNode .getTextureBits ())
         return true;

      if (materialNode ._extensions ?.some (extension => +extension .getValue () .getTextureBits ()))
         return true;

      return false;
   },
   createMultiTextureTransform (materialNode)
   {
      if (!this .hasTextures (materialNode))
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
               scene                = this .getScene (),
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
               scene                = this .getScene (),
               textureTransformNode = scene .createNode ("MultiTextureTransform", false);

            textureTransformNode ._textureTransform = textureTransformNodes;

            textureTransformNode .setup ();

            return textureTransformNode;
         }
      }
   },
   createGeometry (primitive, weights, skin)
   {
      switch (primitive .mode)
      {
         case 0: // POINTS
         {
            return this .createPointSet (primitive, weights, skin);
         }
         case 1: // LINES
         {
            if (primitive .indices)
               return this .createIndexedLineSet (primitive, weights, skin, 1);

            return this .createLineSet (primitive, weights, skin);
         }
         case 2: // LINE_LOOP
         {
            return this .createIndexedLineSet (primitive, weights, skin, 2);
         }
         case 3: // LINE_STRIP
         {
            return this .createIndexedLineSet (primitive, weights, skin, 3);
         }
         default:
         case 4: // TRIANGLES
         {
            if (primitive .indices)
               return this .createIndexedTriangleSet (primitive, weights, skin);

            return this .createTriangleSet (primitive, weights, skin);
         }
         case 5: // TRIANGLE_STRIP
         {
            if (primitive .indices)
               return this .createIndexedTriangleStripSet (primitive, weights, skin);

            return this .createTriangleStripSet (primitive, weights, skin);
         }
         case 6: // TRIANGLE_FAN
         {
            if (primitive .indices)
               return this .createIndexedTriangleFanSet (primitive, weights, skin);

            return this .createTriangleFanSet (primitive, weights, skin);
         }
      }
   },
   createPointSet ({ attributes, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("PointSet", false);

      geometryNode ._color   = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal  = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent = this .createTangent (attributes .TANGENT);
      geometryNode ._coord   = this .createCoordinate (attributes .POSITION, targets, weights);

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedLineSet ({ attributes, indices, material, targets }, weights, skin, mode)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("IndexedLineSet", false);

      geometryNode ._color   = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal  = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent = this .createTangent (attributes .TANGENT);
      geometryNode ._coord   = this .createCoordinate (attributes .POSITION, targets, weights);

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
   createLineSet ({ attributes, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("LineSet", false);

      geometryNode ._color   = this .createColor (attributes .COLOR [0], material);
      geometryNode ._normal  = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent = this .createTangent (attributes .TANGENT);
      geometryNode ._coord   = this .createCoordinate (attributes .POSITION, targets, weights);

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleSet ({ attributes, indices, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("IndexedTriangleSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleSet ({ attributes, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("TriangleSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createIndexedTriangleStripSet ({ attributes, indices, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("IndexedTriangleStripSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleStripSet ({ attributes, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("TriangleStripSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

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
   createIndexedTriangleFanSet ({ attributes, indices, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("IndexedTriangleFanSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._index           = indices .array;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

      this .attributesJointsArray (skin, attributes .JOINTS, attributes .WEIGHTS);
      this .skinGeometry (skin, geometryNode);

      geometryNode .setup ();

      return geometryNode;
   },
   createTriangleFanSet ({ attributes, material, targets }, weights, skin)
   {
      const
         scene        = this .getScene (),
         geometryNode = scene .createNode ("TriangleFanSet", false);

      geometryNode ._solid           = !material ?.doubleSided;
      geometryNode ._color           = this .createColor (attributes .COLOR [0], material);
      geometryNode ._texCoord        = this .createMultiTextureCoordinate (attributes .TEXCOORD, material);
      geometryNode ._normal          = this .createNormal (attributes .NORMAL, targets, weights);
      geometryNode ._tangent         = this .createTangent (attributes .TANGENT);
      geometryNode ._coord           = this .createCoordinate (attributes .POSITION, targets, weights);
      geometryNode ._normalPerVertex = !! geometryNode ._normal .getValue ();

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
            scene          = this .getScene (),
            appearanceNode = this .materialObject ({ material }),
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
      const
         appearanceNode = this .materialObject ({ material }),
         materialNode   = appearanceNode ._material .getValue ();

      if (!this .hasTextures (materialNode))
         return null;

      if (texCoords .textureCoordinateNode)
         return texCoords .textureCoordinateNode;

      switch (texCoords .length === 1 ? 1 : material .texCoordMappings .size)
      {
         case 0:
         {
            return null;
         }
         case 1:
         {
            return texCoords .textureCoordinateNode = Array .from (material .texCoordMappings .entries (), ([mapping, i]) => this .createTextureCoordinate (texCoords [i], mapping)) [0];
         }
         default:
         {
            const textureCoordinateNodes = Array .from (material .texCoordMappings .entries ())
               .sort ((a, b) => Algorithm .cmp (a [0], b [0]))
               .sort ((a, b) => a [1] - b [1])
               .map (([mapping, i]) => this .createTextureCoordinate (texCoords [i], mapping));

            if (!textureCoordinateNodes .length)
               return null;

            const
               scene                 = this .getScene (),
               textureCoordinateNode = scene .createNode ("MultiTextureCoordinate", false);

            textureCoordinateNode ._texCoord = textureCoordinateNodes;

            textureCoordinateNode .setup ();

            return texCoords .textureCoordinateNode = textureCoordinateNode;
         }
      }
   },
   createTextureCoordinate (texCoord, mapping)
   {
      if (texCoord ?.type !== "VEC2")
         return null;

      if (texCoord [mapping])
         return texCoord [mapping];

      const
         scene                 = this .getScene (),
         textureCoordinateNode = scene .createNode ("TextureCoordinate", false);

      textureCoordinateNode ._mapping = mapping;
      textureCoordinateNode ._point   = texCoord .array;

      textureCoordinateNode .setup ();

      return texCoord [mapping] = textureCoordinateNode;
   },
   createNormal (normal, targets, weights)
   {
      if (normal ?.type !== "VEC3")
         return null;

      if (normal .normalNode)
         return normal .normalNode;

      const
         scene      = this .getScene (),
         normalNode = scene .createNode ("Normal", false);

      normalNode ._vector = normal .array;

      if ((targets instanceof Array) && (weights instanceof Array))
      {
         normal .field = normalNode ._vector .copy ();

         const vectors = this .applyMorphTargets (normalNode ._vector, targets, "NORMAL", weights);

         normalNode ._vector .length = 0;

         for (const vector of vectors)
            normalNode ._vector .push (vector);
      }
      else
      {
         normal .field = normalNode ._vector;
      }

      normalNode .setup ();

      return normal .normalNode = normalNode;
   },
   createTangent (tangent)
   {
      if (tangent ?.type !== "VEC4")
         return null;

      if (tangent .tangentNode)
         return tangent .tangentNode;

      const
         scene       = this .getScene (),
         tangentNode = scene .createNode ("Tangent", false);

      tangentNode ._vector = tangent .array;

      tangentNode .setup ();

      return tangent .tangentNode = tangentNode;
   },
   createCoordinate (position, targets, weights)
   {
      if (position ?.type !== "VEC3")
         return null;

      if (position .coordinateNode)
         return position .coordinateNode;

      const
         scene          = this .getScene (),
         coordinateNode = scene .createNode ("Coordinate", false);

      coordinateNode ._point = position .array;

      if ((targets instanceof Array) && (weights instanceof Array))
      {
         position .field = coordinateNode ._point .copy ();

         const points = this .applyMorphTargets (coordinateNode ._point, targets, "POSITION", weights);

         coordinateNode ._point .length = 0;

         for (const point of points)
            coordinateNode ._point .push (point);
      }
      else
      {
         position .field = coordinateNode ._point;
      }

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
      if (joints ?.type !== "VEC4")
         return;

      if (weights ?.type !== "VEC4")
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
               jointNode = this .nodes [index] ?.transformNode;

            if (!jointNode)
               continue;

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
         skinCoordinateNode    = skin .coordinateNode,
         start                 = skinCoordinateNode ._point .length,
         textureCoordinateNode = geometryNode ._texCoord ?.getValue (),
         normalNode            = geometryNode ._normal ?.getValue (),
         coordinateNode        = geometryNode ._coord ?.getValue ();

      if (geometryNode ._coordIndex)
         geometryNode ._coordIndex = geometryNode ._coordIndex .map (index => index < 0 ? -1 : index + start);

      if (geometryNode ._index)
         geometryNode ._index = geometryNode ._index .map (index => index < 0 ? -1 : index + start);

      if (textureCoordinateNode)
      {
         switch (textureCoordinateNode .getTypeName ())
         {
            case "TextureCoordinate":
            {
               const
                  skinTextureCoordinateNode = skin .textureCoordinateNode,
                  point                     = skinTextureCoordinateNode ._point;

               textureCoordinateNode ._point .forEach ((p, i) => point [i + start] = p);
               geometryNode ._texCoord = skinTextureCoordinateNode;

               break;
            }
            case "MultiTextureCoordinate":
            {
               const skinMultiTextureCoordinateNode = skin .multiTextureCoordinateNode;

               for (const t of textureCoordinateNode ._texCoord)
               {
                  let s = skinMultiTextureCoordinateNode ._texCoord .find (s => s .mapping === t .mapping) ?.getValue ();

                  if (!s)
                  {
                     if (t .mapping === "TEXCOORD_0")
                     {
                        s = skin .textureCoordinateNode;
                     }
                     else
                     {
                        s           = this .getScene () .createNode ("TextureCoordinate", false);
                        s ._mapping = t .mapping;

                        s .setup ();
                     }

                     skinMultiTextureCoordinateNode ._texCoord .push (s);
                  }

                  const point = s ._point;

                  t .point .forEach ((p, i) => point [i + start] = p);
               }

               geometryNode ._texCoord = skinMultiTextureCoordinateNode;
               break;
            }
         }
      }

      if (normalNode)
      {
         const
            skinNormalNode = skin .normalNode,
            vector         = skinNormalNode ._vector;

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
   createInterpolator (timeSensorNode, node, target, interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getScene ();

      switch (target .path)
      {
         case "pointer":
         {
            const [node, field] = this .getAnimationPointer (target .extensions ?.KHR_animation_pointer ?.pointer);

            return this .createAnimationPointerInterpolator (timeSensorNode, node, field, interpolation, times, keyValues, cycleInterval);
         }
         case "translation":
         case "rotation":
         case "scale":
         {
            const field = node .getField (target .path);

            return this .createAnimationPointerInterpolator (timeSensorNode, node, field, interpolation, times, keyValues, cycleInterval);
         }
         case "weights":
         {
            const
               node              = this .nodes [target .node],
               mesh              = this .meshes [node .mesh],
               primitives        = mesh ?.primitives,
               interpolatorNodes = [ ];

            if (!(primitives instanceof Array))
               return null;

            for (const { shapeNode, targets, attributes } of primitives)
            {
               const geometryNode = shapeNode ._geometry .getValue ();

               if (!geometryNode)
                  continue;

               const coordinateInterpolatorNode = this .createArrayInterpolator ("CoordinateInterpolator", interpolation, times, keyValues .array, cycleInterval, targets, attributes, "POSITION");

               if (coordinateInterpolatorNode)
               {
                  interpolatorNodes .push (coordinateInterpolatorNode);

                  scene .addRoute (timeSensorNode, "fraction_changed", coordinateInterpolatorNode, "set_fraction");
                  scene .addRoute (coordinateInterpolatorNode, "value_changed", geometryNode ._coord, "point");
               }

               const normalInterpolatorNode = this .createArrayInterpolator ("NormalInterpolator", interpolation, times, keyValues .array, cycleInterval, targets, attributes, "NORMAL");

               if (normalInterpolatorNode)
               {
                  interpolatorNodes .push (normalInterpolatorNode);

                  scene .addRoute (timeSensorNode, "fraction_changed", normalInterpolatorNode, "set_fraction");
                  scene .addRoute (normalInterpolatorNode, "value_changed", geometryNode ._normal, "vector");
               }
            }

            return interpolatorNodes;
         }
         default:
         {
            return [ ];
         }
      }
   },
   createAnimationPointerInterpolator (timeSensorNode, node, field, interpolation, times, keyValues, cycleInterval)
   {
      if (!(node && field))
         return [ ];

      const scene = this .getScene ();

      switch (field .getType ())
      {
         case X3DConstants .SFColor:
         {
            const interpolatorNodes = [ ];

            switch ((keyValues .array .length / times .length) % 3)
            {
               case 0: // Color3 pointer
               {
                  var colors = keyValues .array;
                  break;
               }
               default: // Color4 pointer
               {
                  var colors         = keyValues .array .filter ((_, i) => i % 4 < 3);
                  var transparencies = keyValues .array .filter ((_, i) => i % 4 === 3);

                  transparencies = transparencies .every (value => value >= 1)
                     ? undefined
                     : transparencies .map (value => 1 - value);

                  break;
               }
            }

            const interpolatorNode = this .createNamedInterpolator ("ColorInterpolator", 3, interpolation, times, colors, cycleInterval);

            scene .addNamedNode (scene .getUniqueName (`${$.toUpperCaseFirst (field .getName ())}Interpolator`), interpolatorNode);

            scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
            scene .addRoute (interpolatorNode, "value_changed", node, field .getName ());

            interpolatorNodes .push (interpolatorNode);

            if (field .getName () .match (/^(?:baseColor|emissiveColor)$/) && transparencies)
            {
               const interpolatorNode = this .createNamedInterpolator ("ScalarInterpolator", 1, interpolation, times, transparencies, cycleInterval);

               scene .addNamedNode (scene .getUniqueName (`TransparencyInterpolator`), interpolatorNode);

               scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
               scene .addRoute (interpolatorNode, "value_changed", node, `transparency`);

               interpolatorNodes .push (interpolatorNode);
            }

            return interpolatorNodes;
         }
         case X3DConstants .SFFloat:
         {
            const interpolatorNode = this .createNamedInterpolator ("ScalarInterpolator", 1, interpolation, times, keyValues .array, cycleInterval);

            scene .addNamedNode (scene .getUniqueName (`${$.toUpperCaseFirst (field .getName ())}Interpolator`), interpolatorNode);

            scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
            scene .addRoute (interpolatorNode, "value_changed", node, field .getName ());

            return interpolatorNode;
         }
         case X3DConstants .SFRotation:
         {
            const interpolatorNode = this .createOrientationInterpolator (interpolation, times, keyValues .array, cycleInterval);

            scene .addNamedNode (scene .getUniqueName (`${$.toUpperCaseFirst (field .getName ())}Interpolator`), interpolatorNode);

            scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
            scene .addRoute (interpolatorNode, "value_changed", node, field .getName ());

            return interpolatorNode;
         }
         case X3DConstants .SFVec2f:
         {
            const interpolatorNode = this .createNamedInterpolator ("PositionInterpolator2D", 2, interpolation, times, keyValues .array, cycleInterval);

            scene .addNamedNode (scene .getUniqueName (`${$.toUpperCaseFirst (field .getName ())}Interpolator`), interpolatorNode);

            scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
            scene .addRoute (interpolatorNode, "value_changed", node, field .getName ());

            return interpolatorNode;
         }
         case X3DConstants .SFVec3f:
         {
            const interpolatorNode = this .createNamedInterpolator ("PositionInterpolator", 3, interpolation, times, keyValues .array, cycleInterval);

            scene .addNamedNode (scene .getUniqueName (`${$.toUpperCaseFirst (field .getName ())}Interpolator`), interpolatorNode);

            scene .addRoute (timeSensorNode, "fraction_changed", interpolatorNode, "set_fraction");
            scene .addRoute (interpolatorNode, "value_changed", node, field .getName ());

            return interpolatorNode;
         }
         default:
         {
            return [ ];
         }
      }
   },
   getAnimationPointer (pointer = "")
   {
      const
         path  = pointer .split ("/") .filter (p => p),
         field = path .pop () .replace (/(?:Factor$)/, "");

      let glTF = this .input;

      for (const property of path)
         glTF = glTF ?.[property];

      return glTF ?.pointers
         ?.map (node => [node, $.try (() => node ?.getField (this .getAnimationPointerAlias (node, field) ?? field))])
         ?.find (([node, field]) => field)
         ?? [ ];
   },
   addAnimationPointerAlias (node, field, alias)
   {
      const key = `${node .getTypeName ()}.${field}`;

      this .pointerAliases .set (key, alias);
   },
   getAnimationPointerAlias (node, field)
   {
      const key = `${node .getTypeName ()}.${field}`;

      return this .pointerAliases .get (key);
   },
   createNamedInterpolator (typeName, components, interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getScene ();

      switch (interpolation)
      {
         case "STEP":
         {
            const
               interpolatorNode = scene .createNode (typeName, false),
               key              = [ ],
               keyValue         = [ ];

            // Key

            key .push (times [0] / cycleInterval);

            for (let i = 1, length = times .length; i < length; ++ i)
               key .push (times [i] / cycleInterval, times [i] / cycleInterval);

            // KeyValue

            for (let c = 0; c < components; ++ c)
               keyValue .push (keyValues [c]);

            for (let i = 0, length = keyValues .length - 3; i < length; i += 3)
            {
               for (let c = 0, lc2 = components * 2; c < lc2; ++ c)
                  keyValue .push (keyValues [i + c]);
            }

            // Finish

            interpolatorNode ._key      = key;
            interpolatorNode ._keyValue = keyValue;

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         default:
         case "LINEAR":
         {
            const interpolatorNode = scene .createNode (typeName, false);

            interpolatorNode ._key      = times .map (t => t / cycleInterval);
            interpolatorNode ._keyValue = keyValues;

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         case "CUBICSPLINE":
         {
            const
               interpolatorNode = scene .createNode (typeName, false),
               key              = [ ],
               keyValue         = [ ],
               vectors          = [ ],
               Vector           = [undefined, Vector2, Vector2, Vector3] [components];

            for (let i = 0, length = keyValues .length; i < length; i += 3)
            {
               vectors .push (new Vector (... keyValues .subarray (i, i + components)));
            }

            const
               length  = Math .floor (times .at (-1) * SAMPLES_PER_SECOND),
               samples = Array .from ({ length: length }, (_, i) => i / (length - 1) * times .at (-1))

            for (const t of samples)
            {
               key      .push (t / cycleInterval);
               keyValue .push (... this .cubicSplineVector (t, times, vectors));
            }

            // Finish

            interpolatorNode ._key      = key;
            interpolatorNode ._keyValue = components === 1 ? keyValue .filter ((_, i) => i % 2 < 1) : keyValue;

            interpolatorNode .setup ();

            return interpolatorNode;
         }
      }
   },
   createOrientationInterpolator (interpolation, times, keyValues, cycleInterval)
   {
      const scene = this .getScene ();

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

            const
               length  = Math .floor (times .at (-1) * SAMPLES_PER_SECOND),
               samples = Array .from ({ length: length }, (_, i) => i / (length - 1) * times .at (-1))

            for (const t of samples)
            {
               const q = this .cubicSplineVector (t, times, quaternions) .normalize ();

               interpolatorNode ._key      .push (t / cycleInterval);
               interpolatorNode ._keyValue .push (new Rotation4 (q));
            }

            interpolatorNode .setup ();

            return interpolatorNode;
         }
      }
   },
   createArrayInterpolator (typeName, interpolation, times, weights, cycleInterval, targets, accessors, key)
   {
      const
         scene    = this .getScene (),
         accessor = accessors [key];

      if (!accessor)
         return null;

      switch (interpolation)
      {
         case "STEP":
         {
            const interpolatorNode = scene .createNode (typeName, false);

            // Key

            interpolatorNode ._key .push (times [0] / cycleInterval);

            for (let i = 1, length = times .length; i < length; ++ i)
               interpolatorNode ._key .push (times [i] / cycleInterval, times [i] / cycleInterval);

            // KeyValue

            const w = Array .from (targets .keys (), i => weights [i]);

            for (const value of this .applyMorphTargets (accessor .field, targets, key, w))
               interpolatorNode ._keyValue .push (value);

            for (let t = 1, length = times .length; t < length; ++ t)
            {
               const
                  w      = Array .from (targets .keys (), i => weights [t * targets .length + i]),
                  values = this .applyMorphTargets (accessor .field, targets, key, w);

               for (const value of values)
                  interpolatorNode ._keyValue .push (value);

               for (const value of values)
                  interpolatorNode ._keyValue .push (value);
            }

            // Finish

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         default:
         case "LINEAR":
         {
            const interpolatorNode = scene .createNode (typeName, false);

            // Key

            interpolatorNode ._key = times .map (t => t / cycleInterval);

            // KeyValue

            for (const t of times .keys ())
            {
               const w = Array .from (targets .keys (), i => weights [t * targets .length + i]);

               for (const value of this .applyMorphTargets (accessor .field, targets, key, w))
                  interpolatorNode ._keyValue .push (value);
            }

            // Finish

            interpolatorNode .setup ();

            return interpolatorNode;
         }
         case "CUBICSPLINE":
         {
            const interpolatorNode = scene .createNode (typeName, false);

            // Key

            const
               length  = Math .floor (times .at (-1) * SAMPLES_PER_SECOND),
               samples = Array .from ({ length: length }, (_, i) => i / (length - 1) * times .at (-1))

            // KeyValue

            for (const t of samples)
            {
               interpolatorNode ._key .push (t / cycleInterval);

               const w = Array .from (targets .keys (), i => this .cubicSplineScalarArray (t, times, weights, targets .length, i));

               for (const value of this .applyMorphTargets (accessor .field, targets, key, w))
                  interpolatorNode ._keyValue .push (value);
            }

            // Finish

            interpolatorNode .setup ();

            return interpolatorNode;
         }
      }
   },
   applyMorphTargets: (function ()
   {
      const value = new Vector3 ();

      return function (array, targets, key, weights)
      {
         const vectors = Array .from (array, v => v .getValue () .copy ());

         for (const [i, target] of targets .entries ())
         {
            const weight = weights [i];

            if (!weight)
               continue;

            const accessor = this .accessors [target [key]];

            if (accessor ?.type !== "VEC3")
               continue;

            const
               array  = accessor .array,
               length = array .length;

            for (let a = 0, p = 0; a < length; a += 3, ++ p)
               vectors [p] .add (value .set (array [a], array [a + 1], array [a + 2]) .multiply (weight));
         }

         return vectors;
      };
   })(),
   cubicSplineVector (time, times, values)
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
   cubicSplineScalarArray (time, times, values, length, i)
   {
      const
         index1 = Algorithm .clamp (Algorithm .upperBound (times, 0, times .length, time), 1, times .length - 1),
         index0 = index1 - 1,
         td     = times [index1] - times [index0],
         t1     = (time - times [index0]) / td,
         t2     = t1 * t1,
         t3     = t2 * t1;

      let
         v0 = values [(index0 + 1) * length + i],
         b0 = values [(index0 + 2) * length + i],
         v1 = values [(index1 + 1) * length + i],
         a1 = values [(index1 + 0) * length + i];

      v0 *= 2 * t3 - 3 * t2 + 1;
      b0 *= td * (t3 - 2 * t2 + t1);
      v1 *= -2 * t3 + 3 * t2;
      a1 *= td * (t3 - t2);

      return v0 + b0 + v1 + a1;
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
   description (string)
   {
      return string ?.replace (/_+/g, " ") .trim () ?? "";
   },
});

export default GLTF2Parser;
