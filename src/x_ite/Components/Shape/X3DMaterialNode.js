import Fields                 from "../../Fields.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import AlphaMode              from "../../Browser/Shape/AlphaMode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import RenderPass             from "../../Rendering/RenderPass.js";
import BitSet                 from "../../../standard/Utility/BitSet.js";

function X3DMaterialNode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DMaterialNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "transmission",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "volumeScatter", new Fields .SFBool ());

   // Private properties

   this .textureBits = new BitSet ();
   this .shaderNodes = this .getBrowser () .getShaders ();
}

Object .assign (Object .setPrototypeOf (X3DMaterialNode .prototype, X3DAppearanceChildNode .prototype),
{
   isPhysical ()
   {
      return false;
   },
   setTransparent (value)
   {
      if (!!value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent ()
   {
      return this ._transparent .getValue ();
   },
   setTransmission (value)
   {
      if (!!value !== this ._transmission .getValue ())
         this ._transmission = value;
   },
   isTransmission ()
   {
      return this ._transmission .getValue ();
   },
   setVolumeScatter (value)
   {
      if (!!value !== this ._volumeScatter .getValue ())
         this ._volumeScatter = value;
   },
   isVolumeScatter ()
   {
      return this ._volumeScatter .getValue ();
   },
   setTexture (index, textureNode)
   {
      index *= 4;

      this .textureBits .remove (index, 0xf);
      this .textureBits .add (index, textureNode ?.getTextureBits () ?? 0);
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
   getShader (geometryContext, renderContext)
   {
      let key = "";

      key += this .textureBits .toString (16);
      key += ".";
      key += this .getMaterialKey ();
      key += geometryContext .geometryKey;

      if (renderContext)
      {
         const { renderObject, shadows, fogNode, shapeNode, appearanceNode, textureNode, hAnimNode, localObjectsKeys } = renderContext;

         key += shapeNode .getAlphaMode ();
         key += renderObject .getRenderKey ();
         key += shadows || renderObject .getGlobalShadow () ? 1 : 0;
         key += fogNode ?.getFogType () ?? 0;
         key += shapeNode .getShapeKey ();
         key += appearanceNode .getStyleProperties (geometryContext .geometryType) ?.getStyleKey () ?? 0;
         key += appearanceNode .getTextureTransformMapping () .size || 1;
         key += geometryContext .textureCoordinateMapping .size || 1;
         key += hAnimNode ?.getHAnimKey () ?? "[]";
         key += localObjectsKeys .sort () .join (""); // ClipPlane, X3DLightNode
         key += ".";
         key += textureNode ? 2 : appearanceNode .getTextureBits () .toString (16);
      }
      else
      {
         // Rubberband, X3DBackgroundNode

         const { renderObject, alphaMode, textureNode, localObjectsKeys } = geometryContext;

         key += alphaMode;
         key += renderObject .getRenderKey ();
         key += "000011[]";
         key += localObjectsKeys .sort () .join (""); // ClipPlane
         key += ".";
         key += textureNode ?.getTextureBits () .toString (16) ?? 0;
      }

      return this .shaderNodes .get (key)
         ?? this .createShader (key, geometryContext, renderContext);
   },
   getShaderOptions (geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = [ ];

      if (browser .getRenderingProperty ("XRSession"))
         options .push ("X3D_XR_SESSION");

      switch (browser .getBrowserOption ("ColorSpace") .toUpperCase ())
      {
         case "SRGB":
            options .push ("X3D_COLORSPACE_SRGB");
            break;
         case "LINEAR":
            options .push ("X3D_COLORSPACE_LINEAR");
            break;
         default: // LINEAR_WHEN_PHYSICAL_MATERIAL
            options .push (this .isPhysical () ? "X3D_COLORSPACE_LINEAR" : "X3D_COLORSPACE_SRGB");
            break;
      }

      switch (browser .getBrowserOption ("ToneMapping") .toUpperCase ())
      {
         default: // NONE
            break;
         case "ACES_NARKOWICZ":
         case "ACES_HILL":
         case "ACES_HILL_EXPOSURE_BOOST":
         case "KHR_PBR_NEUTRAL":
            options .push (`X3D_TONEMAP_${browser .getBrowserOption ("ToneMapping") .toUpperCase ()}`);
            break;
      }

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (geometryContext .hasFogCoords)
         options .push ("X3D_FOG_COORDS");

      if (geometryContext .colorMaterial)
         options .push ("X3D_COLOR_MATERIAL");

      const flat = browser .getRenderingProperty ("Shading") === "FLAT";

      if (geometryContext .hasNormals && !flat)
         options .push ("X3D_NORMALS");

      if (geometryContext .hasTangents)
         options .push ("X3D_TANGENTS");

      if (renderContext)
      {
         const { renderObject, fogNode, shapeNode, appearanceNode, hAnimNode, localObjectsKeys, textureNode } = renderContext;

         this .addRenderOptions (options, renderObject, shapeNode .getAlphaMode ());

         if (renderContext .shadows || renderObject .getGlobalShadows () .at (-1))
            options .push ("X3D_SHADOWS", "X3D_PCF_FILTERING");

         switch (fogNode ?.getFogType ())
         {
            case 1:
               options .push ("X3D_FOG", "X3D_FOG_LINEAR");
               break;
            case 2:
               options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
               break;
         }

         hAnimNode ?.getShaderOptions (options);

         const
            objectsKeys          = localObjectsKeys .concat (renderObject .getGlobalLightsKeys ()),
            numClipPlanes        = objectsKeys .reduce ((a, k) => a + (k === 0), 0),
            numLights            = objectsKeys .reduce ((a, k) => a + (k === 1), 0),
            numEnvironmentLights = objectsKeys .reduce ((a, k) => a + k .toString () .startsWith ("[2"), 0),
            numTextureProjectors = objectsKeys .reduce ((a, k) => a + (k === 3), 0);

         if (numClipPlanes)
         {
            options .push ("X3D_CLIP_PLANES")
            options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
         }

         if (numLights && geometryContext .hasNormals)
         {
            options .push ("X3D_LIGHTING")
            options .push (`X3D_NUM_LIGHTS ${Math .min (numLights, browser .getMaxLights ())}`);
         }

         if (numEnvironmentLights && geometryContext .hasNormals)
         {
            const
               lights    = renderObject .getGlobalLights () .concat (renderContext .localObjects),
               container = lights .findLast (c => c .lightNode .getLightKey () .toString () .startsWith ("[2")),
               lightNode = container .lightNode;

            // Although we count this kind of light here, only one is supported.
            options .push ("X3D_USE_IBL")
            options .push (`X3D_NUM_ENVIRONMENT_LIGHTS ${Math .min (numEnvironmentLights, browser .getMaxLights ())}`);

            if (lightNode .getDiffuseTexture () ?.isLinear ())
               options .push ("X3D_ENVIRONMENT_DIFFUSE_TEXTURE_LINEAR");

            if (lightNode .getSpecularTexture () ?.isLinear ())
               options .push ("X3D_ENVIRONMENT_SPECULAR_TEXTURE_LINEAR");

            if (lightNode .getSheenTexture () ?.isLinear ())
               options .push ("X3D_ENVIRONMENT_SHEEN_TEXTURE_LINEAR");
         }

         if (numTextureProjectors)
         {
            options .push ("X3D_TEXTURE_PROJECTION")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${Math .min (numTextureProjectors, browser .getMaxTextures ())}`);
         }

         if (appearanceNode .getStyleProperties (geometryContext .geometryType))
         {
            options .push ("X3D_STYLE_PROPERTIES");

            if (appearanceNode .getStyleProperties (geometryContext .geometryType) .getStyleKey () > 1)
               options .push ("X3D_STYLE_PROPERTIES_TEXTURE");
         }

         if (+this .textureBits)
            options .push ("X3D_MATERIAL_TEXTURES");

         if (textureNode)
         {
            // ScreenText PixelTexture.

            options .push ("X3D_TEXTURE",
                           "X3D_NUM_TEXTURES 1",
                           "X3D_NUM_TEXTURE_TRANSFORMS 1",
                           "X3D_NUM_TEXTURE_COORDINATES 1");

            textureNode .getShaderOptions (options, 0);
         }
         else
         {
            if (+appearanceNode .getTextureBits () && !this .getBaseTexture ())
            {
               const textureNode = appearanceNode .getTexture ();

               options .push ("X3D_TEXTURE");
               options .push (`X3D_NUM_TEXTURES ${textureNode .getCount ()}`);

               if (textureNode .getType () .includes (X3DConstants .MultiTexture))
                  options .push ("X3D_MULTI_TEXTURING");

               textureNode .getShaderOptions (options);
            }

            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${appearanceNode .getTextureTransformMapping () .size || 1}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${geometryContext .textureCoordinateMapping .size || 1}`);
         }

         switch (shapeNode .getShapeKey ())
         {
            case 1:
               options .push ("X3D_INSTANCING");
               break;
            case 2:
               options .push ("X3D_INSTANCING", "X3D_TEX_COORD_RAMP");
               break;
            case 3:
               options .push ("X3D_INSTANCING", "X3D_INSTANCE_NORMAL");
               break;
         }
      }
      else
      {
         const { renderObject, alphaMode, localObjectsKeys, textureNode } = geometryContext;

         this .addRenderOptions (options, renderObject, alphaMode);

         const numClipPlanes = localObjectsKeys .reduce ((a, k) => a + (k === 0), 0);

         if (numClipPlanes)
         {
            options .push ("X3D_CLIP_PLANES")
            options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
         }

         if (textureNode)
         {
            // X3DBackgroundNode textures

            options .push ("X3D_TEXTURE",
                           "X3D_NUM_TEXTURES 1",
                           "X3D_NUM_TEXTURE_TRANSFORMS 1",
                           "X3D_NUM_TEXTURE_COORDINATES 1");

            textureNode .getShaderOptions (options, 0);
         }
      }

      return options;
   },
   addRenderOptions (options, renderObject, alphaMode)
   {
      switch (renderObject .getRenderPass ())
      {
         case RenderPass .VOLUME_SCATTER_KEY:
         {
            options .push ("X3D_VOLUME_SCATTER_PASS", "X3D_LINEAR_OUTPUT");
            break;
         }
         case RenderPass .TRANSMISSION_KEY:
         {
            options .push ("X3D_TRANSMISSION_PASS", "X3D_LINEAR_OUTPUT");
            break;
         }
      }

      if (renderObject .getLogarithmicDepthBuffer ())
         options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

      switch (alphaMode)
      {
         case AlphaMode .OPAQUE:
         {
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            break;
         }
         case AlphaMode .MASK:
         {
            options .push ("X3D_ALPHA_MODE_MASK");
            break;
         }
         case AlphaMode .BLEND:
         {
            options .push ("X3D_ALPHA_MODE_BLEND");

            if (renderObject .getRenderPass () === RenderPass .RENDER_KEY)
            {
               if (renderObject .getOrderIndependentTransparency ())
                  options .push ("X3D_ORDER_INDEPENDENT_TRANSPARENCY");
            }

            break;
         }
      }
   },
});

Object .defineProperties (X3DMaterialNode, X3DNode .getStaticProperties ("X3DMaterialNode", "Shape", 1));

export default X3DMaterialNode;
