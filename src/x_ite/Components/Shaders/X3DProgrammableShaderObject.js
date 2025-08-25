import X3DNode          from "../Core/X3DNode.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import X3DCast          from "../../Base/X3DCast.js";
import Matrix3          from "../../../standard/Math/Numbers/Matrix3.js";
import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

const _uniformLocation = Symbol .for ("X_ITE.X3DField.uniformLocation");

function X3DProgrammableShaderObject (executionContext)
{
   this .addType (X3DConstants .X3DProgrammableShaderObject);

   this .uniformNames = [ ];

   this .x3d_ClipPlane                           = [ ];
   this .x3d_LightType                           = [ ];
   this .x3d_LightOn                             = [ ];
   this .x3d_LightColor                          = [ ];
   this .x3d_LightIntensity                      = [ ];
   this .x3d_LightAmbientIntensity               = [ ];
   this .x3d_LightAttenuation                    = [ ];
   this .x3d_LightLocation                       = [ ];
   this .x3d_LightDirection                      = [ ];
   this .x3d_LightBeamWidth                      = [ ];
   this .x3d_LightCutOffAngle                    = [ ];
   this .x3d_LightRadius                         = [ ];
   this .x3d_LightMatrix                         = [ ];
   this .x3d_ShadowIntensity                     = [ ];
   this .x3d_ShadowColor                         = [ ];
   this .x3d_ShadowBias                          = [ ];
   this .x3d_ShadowMatrix                        = [ ];
   this .x3d_ShadowMapSize                       = [ ];
   this .x3d_ShadowMap                           = [ ];
   this .x3d_Texture                             = [ ];
   this .x3d_MultiTextureMode                    = [ ];
   this .x3d_MultiTextureAlphaMode               = [ ];
   this .x3d_MultiTextureSource                  = [ ];
   this .x3d_MultiTextureFunction                = [ ];
   this .x3d_TextureCoordinateGeneratorMode      = [ ];
   this .x3d_TextureCoordinateGeneratorParameter = [ ];
   this .x3d_TextureProjectorColor               = [ ];
   this .x3d_TextureProjectorIntensity           = [ ];
   this .x3d_TextureProjectorLocation            = [ ];
   this .x3d_TextureProjectorParams              = [ ];
   this .x3d_TextureProjectorTexture             = [ ];
   this .x3d_TextureProjectorMatrix              = [ ];
   this .x3d_TexCoord                            = [ ];
   this .x3d_TextureMatrix                       = [ ];

   this .fogNode                    = null;
   this .numClipPlanes              = 0;
   this .numEnvironmentLights       = 0;
   this .environmentLightNodes      = [ ];
   this .numLights                  = 0;
   this .lightNodes                 = [ ];
   this .numTextureProjectors       = 0;
   this .textureProjectorNodes      = [ ];
   this .textures                   = new Set ();
}

Object .assign (X3DProgrammableShaderObject .prototype,
{
   initialize ()
   { },
   canUserDefinedFields ()
   {
      return true;
   },
   getUniformNames ()
   {
      return this .uniformNames;
   },
   setUniformNames (value)
   {
      this .uniformNames = value;
   },
   getDefaultUniformsAndAttributes ()
   {
      // Get uniforms and attributes.

      const
         program              = this .getProgram (),
         browser              = this .getBrowser (),
         gl                   = browser .getContext (),
         maxClipPlanes        = browser .getMaxClipPlanes (),
         maxLights            = browser .getMaxLights (),
         maxTextures          = browser .getMaxTextures (),
         maxTextureTransforms = browser .getMaxTextureTransforms (),
         maxTexCoords         = browser .getMaxTexCoords ();

      gl .useProgram (program);

      for (const name of this .uniformNames)
         this [name] = gl .getUniformLocation (program, name);

      /*
       * Uniforms.
       */

      for (let i = 0; i < maxClipPlanes; ++ i)
         this .x3d_ClipPlane [i] = gl .getUniformLocation (program, "x3d_ClipPlane[" + i + "]");

      this .x3d_FogColor           = this .getUniformLocation (gl, program, "x3d_Fog.color",           "x3d_FogColor");
      this .x3d_FogVisibilityStart = this .getUniformLocation (gl, program, "x3d_Fog.visibilityStart", "x3d_FogVisibilityStart");
      this .x3d_FogVisibilityRange = this .getUniformLocation (gl, program, "x3d_Fog.visibilityRange", "x3d_FogVisibilityRange");
      this .x3d_FogMatrix          = this .getUniformLocation (gl, program, "x3d_Fog.matrix",          "x3d_FogMatrix");

      this .x3d_PointPropertiesPointSizeScaleFactor = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeScaleFactor");
      this .x3d_PointPropertiesPointSizeMinValue    = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeMinValue");
      this .x3d_PointPropertiesPointSizeMaxValue    = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeMaxValue");
      this .x3d_PointPropertiesAttenuation          = gl .getUniformLocation (program, "x3d_PointProperties.attenuation");

      this .x3d_LinePropertiesLinetype = gl .getUniformLocation (program, "x3d_LineProperties.linetype");
      this .x3d_LineStippleScale       = gl .getUniformLocation (program, "x3d_LineProperties.lineStippleScale");
      this .x3d_LinePropertiesTexture  = gl .getUniformLocation (program, "x3d_LineProperties.texture");

      this .x3d_FillPropertiesFilled     = gl .getUniformLocation (program, "x3d_FillProperties.filled");
      this .x3d_FillPropertiesHatched    = gl .getUniformLocation (program, "x3d_FillProperties.hatched");
      this .x3d_FillPropertiesHatchColor = gl .getUniformLocation (program, "x3d_FillProperties.hatchColor");
      this .x3d_FillPropertiesTexture    = gl .getUniformLocation (program, "x3d_FillProperties.texture");
      this .x3d_FillPropertiesScale      = gl .getUniformLocation (program, "x3d_FillProperties.scale");

      for (let i = 0; i < maxLights; ++ i)
      {
         this .x3d_LightType [i]             = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].type",             "x3d_LightType[" + i + "]");
         this .x3d_LightColor [i]            = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].color",            "x3d_LightColor[" + i + "]");
         this .x3d_LightAmbientIntensity [i] = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].ambientIntensity", "x3d_LightAmbientIntensity[" + i + "]");
         this .x3d_LightIntensity [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].intensity",        "x3d_LightIntensity[" + i + "]");
         this .x3d_LightAttenuation [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].attenuation",      "x3d_LightAttenuation[" + i + "]");
         this .x3d_LightLocation [i]         = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].location",         "x3d_LightLocation[" + i + "]");
         this .x3d_LightDirection [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].direction",        "x3d_LightDirection[" + i + "]");
         this .x3d_LightBeamWidth [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].beamWidth",        "x3d_LightBeamWidth[" + i + "]");
         this .x3d_LightCutOffAngle [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].cutOffAngle",      "x3d_LightCutOffAngle[" + i + "]");
         this .x3d_LightRadius [i]           = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].radius",           "x3d_LightRadius[" + i + "]");
         this .x3d_LightMatrix [i]           = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].matrix",           "x3d_LightMatrix[" + i + "]");

         this .x3d_ShadowIntensity [i] = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowIntensity");
         this .x3d_ShadowColor [i]     = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowColor");
         this .x3d_ShadowBias [i]      = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowBias");
         this .x3d_ShadowMatrix [i]    = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMatrix");
         this .x3d_ShadowMapSize [i]   = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMapSize");
         this .x3d_ShadowMap [i]       = gl .getUniformLocation (program, "x3d_ShadowMap[" + i + "]");
      }

      this .x3d_EnvironmentLightColor                 = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.color");
      this .x3d_EnvironmentLightIntensity             = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.intensity");
      this .x3d_EnvironmentLightAmbientIntensity      = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.ambientIntensity");
      this .x3d_EnvironmentLightRotation              = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.rotation");
      this .x3d_EnvironmentLightDiffuseTexture        = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.diffuseTexture");
      this .x3d_EnvironmentLightDiffuseTextureLinear  = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.diffuseTextureLinear");
      this .x3d_EnvironmentLightDiffuseTextureLevels  = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.diffuseTextureLevels");
      this .x3d_EnvironmentLightSpecularTexture       = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.specularTexture");
      this .x3d_EnvironmentLightSpecularTextureLinear = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.specularTextureLinear");
      this .x3d_EnvironmentLightSpecularTextureLevels = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.specularTextureLevels");
      this .x3d_EnvironmentLightSheenTexture          = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.sheenTexture");
      this .x3d_EnvironmentLightSheenTextureLinear    = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.sheenTextureLinear");
      this .x3d_EnvironmentLightSheenTextureLevels    = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.sheenTextureLevels");
      this .x3d_EnvironmentLightGGXLUTTexture         = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.GGXLUTTexture");
      this .x3d_EnvironmentLightCharlieLUTTexture     = gl .getUniformLocation (program, "x3d_EnvironmentLightSource.CharlieLUTTexture");

      this .x3d_AmbientIntensity  = this .getUniformLocation (gl, program, "x3d_Material.ambientIntensity", "x3d_FrontMaterial.ambientIntensity");
      this .x3d_DiffuseColor      = this .getUniformLocation (gl, program, "x3d_Material.diffuseColor",     "x3d_FrontMaterial.diffuseColor");
      this .x3d_SpecularColor     = this .getUniformLocation (gl, program, "x3d_Material.specularColor",    "x3d_FrontMaterial.specularColor");
      this .x3d_EmissiveColor     = this .getUniformLocation (gl, program, "x3d_Material.emissiveColor",    "x3d_FrontMaterial.emissiveColor");
      this .x3d_Shininess         = this .getUniformLocation (gl, program, "x3d_Material.shininess",        "x3d_FrontMaterial.shininess");
      this .x3d_BaseColor         = gl .getUniformLocation (program, "x3d_Material.baseColor");
      this .x3d_Metallic          = gl .getUniformLocation (program, "x3d_Material.metallic");
      this .x3d_Roughness         = gl .getUniformLocation (program, "x3d_Material.roughness");
      this .x3d_Glossiness        = gl .getUniformLocation (program, "x3d_Material.glossiness");
      this .x3d_OcclusionStrength = gl .getUniformLocation (program, "x3d_Material.occlusionStrength");
      this .x3d_NormalScale       = gl .getUniformLocation (program, "x3d_Material.normalScale");
      this .x3d_Transparency      = this .getUniformLocation (gl, program, "x3d_Material.transparency",     "x3d_FrontMaterial.transparency");

      const commonUniforms = [
         // Matrices
         "x3d_Viewport",
         "x3d_ProjectionMatrix",
         "x3d_ModelViewMatrix",
         "x3d_EyeMatrix",
         "x3d_NormalMatrix",
         "x3d_ViewMatrix",
         "x3d_CameraSpaceMatrix",
         // ParticleSystem and Skinning
         "x3d_TexCoordRamp",
         "x3d_JointsTexture",
         "x3d_DisplacementsTexture",
         "x3d_DisplacementWeightsTexture",
         "x3d_JointMatricesTexture",
         // Common
         "x3d_Id", // Pointing ID
         "x3d_AlphaCutoff",
         "x3d_Exposure",
         "x3d_LogarithmicFarFactor1_2",
         "x3d_MultiTextureColor",
      ];

      for (const name of commonUniforms)
         this [name] = gl .getUniformLocation (program, name);

      for (const materialTexture of MaterialTextures .names)
      {
         this [materialTexture] = {
            textureTransformMapping:  gl .getUniformLocation (program, materialTexture + ".textureTransformMapping"),
            textureCoordinateMapping: gl .getUniformLocation (program, materialTexture + ".textureCoordinateMapping"),
            texture2D:                gl .getUniformLocation (program, materialTexture + ".texture2D"),
            texture3D:                gl .getUniformLocation (program, materialTexture + ".texture3D"),
            textureCube:              gl .getUniformLocation (program, materialTexture + ".textureCube"),
         };
      }

      this .x3d_TexCoord .length = 0;

      for (let i = 0; i < maxTextures; ++ i)
      {
         this .x3d_Texture [i] = {
            texture2D: gl .getUniformLocation (program, "x3d_Texture2D[" + i + "]"),
            texture3D: gl .getUniformLocation (program, "x3d_Texture3D[" + i + "]"),
            textureCube: this .getUniformLocation (gl, program, "x3d_TextureCube[" + i + "]", "x3d_CubeMapTexture[" + i + "]"),
         }

         this .x3d_MultiTextureMode [i]      = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].mode");
         this .x3d_MultiTextureAlphaMode [i] = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].alphaMode");
         this .x3d_MultiTextureSource [i]    = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].source");
         this .x3d_MultiTextureFunction [i]  = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].function");

         this .x3d_TextureProjectorColor [i]     = gl .getUniformLocation (program, "x3d_TextureProjectorColor[" + i + "]");
         this .x3d_TextureProjectorIntensity [i] = gl .getUniformLocation (program, "x3d_TextureProjectorIntensity[" + i + "]");
         this .x3d_TextureProjectorLocation [i]  = gl .getUniformLocation (program, "x3d_TextureProjectorLocation[" + i + "]");
         this .x3d_TextureProjectorParams [i]    = gl .getUniformLocation (program, "x3d_TextureProjectorParams[" + i + "]");
         this .x3d_TextureProjectorMatrix [i]    = gl .getUniformLocation (program, "x3d_TextureProjectorMatrix[" + i + "]");
         this .x3d_TextureProjectorTexture [i]   = gl .getUniformLocation (program, "x3d_TextureProjectorTexture[" + i + "]");
      }

      for (let i = 0; i < maxTextureTransforms; ++ i)
      {
         const uniform = gl .getUniformLocation (program, "x3d_TextureMatrix[" + i + "]");

         if (uniform === null)
            break;

         this .x3d_TextureMatrix [i] = uniform;
      }

      for (let i = 0; i < maxTexCoords; ++ i)
      {
         this .x3d_TextureCoordinateGeneratorMode [i]      = gl .getUniformLocation (program, "x3d_TextureCoordinateGenerator[" + i + "].mode");
         this .x3d_TextureCoordinateGeneratorParameter [i] = gl .getUniformLocation (program, "x3d_TextureCoordinateGenerator[" + i + "].parameter");

         const x3d_TexCoord = this .getAttribLocation (gl, program, "x3d_TexCoord" + i, i ? "" : "x3d_TexCoord");

         if (x3d_TexCoord !== -1)
            this .x3d_TexCoord .push ([i, x3d_TexCoord]);
      }

      /*
       * Attributes.
       */

      const attributes = [
         "CoordIndex",
         "LineStipple",
         "FogDepth",
         "Color",
         "Normal",
         "Tangent",
         "Vertex",
         "Particle",
         "ParticleVelocity",
         "ParticleMatrix",
         "ParticleNormalMatrix",
         "InstanceMatrix",
         "InstanceNormalMatrix",
      ];

      const attributeMappings = {
         "InstanceMatrix": ["ParticleMatrix"],
         "InstanceNormalMatrix": ["ParticleNormalMatrix"],
      };

      for (const name of attributes)
      {
         let attribute = gl .getAttribLocation (program, `x3d_${name}`);

         for (const alias of attributeMappings [name] ?? [ ])
         {
            if (attribute === -1)
               attribute = gl .getAttribLocation (program, `x3d_${alias}`);
            else
               break;
         }

         this [`x3d_${name}`] = attribute;

         if (attribute < 0)
         {
            this [`enable${name}Attribute`]                       = Function .prototype;
            this [`${$.toLowerCaseFirst (name)}AttributeDivisor`] = Function .prototype;
         }
         else
         {
            delete this [`enable${name}Attribute`];
            delete this [`${$.toLowerCaseFirst (name)}AttributeDivisor`];
         }
      }

      if (this .x3d_TexCoord .length === 0)
      {
         this .enableTexCoordAttribute  = Function .prototype;
         this .texCoordAttributeDivisor = Function .prototype;
      }
      else
      {
         delete this .enableTexCoordAttribute;
         delete this .texCoordAttributeDivisor;
      }

      /*
       * Fill uniforms with defaults.
       */

      gl .uniform1f (this .x3d_Exposure, Math .max (browser .getBrowserOption ("Exposure"), 0));

      {
         const
            texture2DUnit   = browser .getDefaultTexture2DUnit (),
            texture3DUnit   = browser .getDefaultTexture3DUnit (),
            textureCubeUnit = browser .getDefaultTextureCubeUnit ();

         for (const uniform of this .x3d_Texture)
         {
            gl .uniform1i (uniform .texture2D,   texture2DUnit);
            gl .uniform1i (uniform .texture3D,   texture3DUnit);
            gl .uniform1i (uniform .textureCube, textureCubeUnit);
         }
      }

      {
         const texture2DUnit = browser .getDefaultTexture2DUnit ();

         for (const uniform of this .x3d_ShadowMap)
            gl .uniform1i (uniform, texture2DUnit);
      }
   },
   getUniformLocation (gl, program, name, depreciated)
   {
      // Legacy function to get uniform location.

      let location = gl .getUniformLocation (program, name);

      if (location)
         return location;

      // Look for depreciated location.

      if (depreciated)
      {
         location = gl .getUniformLocation (program, depreciated);

         if (location)
         {
            console .warn (this .getTypeName (), this .getName (), "Using uniform location name '" + depreciated + "' is depreciated, use '" + name + "'. See https://create3000.github.io/x_ite/custom-shaders.");
         }

         return location;
      }

      return 0;
   },
   getAttribLocation (gl, program, name, depreciated)
   {
      // Legacy function to get uniform location.

      let location = gl .getAttribLocation (program, name);

      if (location >= 0)
         return location;

      // Look for depreciated location.

      if (depreciated)
      {
         location = gl .getAttribLocation (program, depreciated);

         if (location >= 0)
         {
            console .warn (this .getTypeName (), this .getName (), "Using attribute location name '" + depreciated + "' is depreciated, use '" + name + "'. See https://create3000.github.io/x_ite/custom-shaders.");
         }

         return location;
      }

      return -1;
   },
   addShaderFields ()
   {
      const
         gl      = this .getBrowser () .getContext (),
         program = this .getProgram ();

      gl .useProgram (program);

      this .textures .clear ();

      for (const field of this .getUserDefinedFields ())
      {
         if (field .getAccessType () === X3DConstants .outputOnly)
            continue;

         const location = gl .getUniformLocation (program, field .getName ());

         if (!location)
            continue;

         switch (field .getType ())
         {
            case X3DConstants .SFBool:
            case X3DConstants .SFInt32:
            {
               location .uniform = gl .uniform1i;
               break;
            }
            case X3DConstants .SFDouble:
            case X3DConstants .SFFloat:
            case X3DConstants .SFTime:
            {
               location .uniform = gl .uniform1f;
               break;
            }
            case X3DConstants .SFImage:
            {
               location .array  = new Int32Array (3 + field .array .length);
               location .uniform = gl .uniform1iv;
               break;
            }
            case X3DConstants .SFMatrix3d:
            case X3DConstants .SFMatrix3f:
            case X3DConstants .SFRotation:
            {
               location .array   = new Float32Array (9);
               location .uniform = gl .uniformMatrix3fv;
               break;
            }
            case X3DConstants .SFMatrix4d:
            case X3DConstants .SFMatrix4f:
            {
               location .array   = new Float32Array (16);
               location .uniform = gl .uniformMatrix4fv;
               break;
            }
            case X3DConstants .SFNode:
            {
               break;
            }
            case X3DConstants .SFVec2d:
            case X3DConstants .SFVec2f:
            {
               location .uniform = gl .uniform2f;
               break;
            }
            case X3DConstants .SFColor:
            case X3DConstants .SFVec3d:
            case X3DConstants .SFVec3f:
            {
               location .uniform = gl .uniform3f;
               break;
            }
            case X3DConstants .SFColor:
            case X3DConstants .SFVec3d:
            case X3DConstants .SFVec3f:
            {
               location .uniform = gl .uniform3f;
               break;
            }
            case X3DConstants .SFColorRGBA:
            case X3DConstants .SFVec4d:
            case X3DConstants .SFVec4f:
            {
               location .uniform = gl .uniform4f;
               break;
            }
            case X3DConstants .MFBool:
            case X3DConstants .MFInt32:
            {
               location .array   = new Int32Array (this .getLocationLength (gl, program, field));
               location .uniform = gl .uniform1iv;
               break;
            }
            case X3DConstants .MFFloat:
            case X3DConstants .MFDouble:
            case X3DConstants .MFTime:
            {
               location .array   = new Float32Array (this .getLocationLength (gl, program, field));
               location .uniform = gl .uniform1fv;
               break;
            }
            case X3DConstants .MFImage:
            {
               location .array   = new Int32Array (this .getImagesLength (field));
               location .uniform = gl .uniform1iv;
               break;
            }
            case X3DConstants .MFMatrix3d:
            case X3DConstants .MFMatrix3f:
            case X3DConstants .MFRotation:
            {
               location .array   = new Float32Array (9 * this .getLocationLength (gl, program, field));
               location .uniform = gl .uniformMatrix3fv;
               break;
            }
            case X3DConstants .MFMatrix4d:
            case X3DConstants .MFMatrix4f:
            {
               location .array   = new Float32Array (16 * this .getLocationLength (gl, program, field));
               location .uniform = gl .uniformMatrix4fv;
               break;
            }
            case X3DConstants .MFNode:
            {
               const locations = location .locations = [ ];

               for (let i = 0;; ++ i)
               {
                  const l = gl .getUniformLocation (program, `${field .getName ()}[${i}]`);

                  if (!l)
                     break;

                  locations .push (l);
               }

               break;
            }
            case X3DConstants .MFVec2d:
            case X3DConstants .MFVec2f:
            {
               location .array   = new Float32Array (2 * this .getLocationLength (gl, program, field));
               location .uniform = gl .uniform2fv;
               break;
            }
            case X3DConstants .MFColor:
            case X3DConstants .MFVec3d:
            case X3DConstants .MFVec3f:
            {
               location .array   = new Float32Array (3 * this .getLocationLength (gl, program, field));
               location .uniform = gl .uniform3fv;
               break;
            }
            case X3DConstants .MFColorRGBA:
            case X3DConstants .MFVec4d:
            case X3DConstants .MFVec4f:
            {
               location .array   = new Float32Array (4 * this .getLocationLength (gl, program, field));
               location .uniform = gl .uniform4fv;
               break;
            }
         }

         if (location .array)
            field [_uniformLocation] = location .array .length ? location : null;
         else
            field [_uniformLocation] = location;

         if (!field [_uniformLocation])
            continue;

         field .addInterest ("set_field__", this);

         this .set_field__ (field);
      }
   },
   removeShaderFields ()
   {
      for (const field of this .getUserDefinedFields ())
         field .removeInterest ("set_field__", this);
   },
   set_field__: (() =>
   {
      const rotationMatrix = new Float32Array (9);

      return function (field)
      {
         const
            gl       = this .getBrowser () .getContext (),
            program  = this .getProgram (),
            location = field [_uniformLocation];

         gl .useProgram (program);

         switch (field .getType ())
         {
            case X3DConstants .SFBool:
            case X3DConstants .SFInt32:
            case X3DConstants .SFDouble:
            case X3DConstants .SFFloat:
            case X3DConstants .SFTime:
            {
               location .uniform .call (gl, location, field .getValue ());
               return;
            }
            case X3DConstants .SFImage:
            {
               const { array, uniform } = location;

               let a = 0;

               array [a ++] = field .width;
               array [a ++] = field .height;
               array [a ++] = field .comp;

               for (const pixel of field .array)
                  array [a ++] = pixel;

               uniform .call (gl, location, array);
               return;
            }
            case X3DConstants .SFMatrix3d:
            case X3DConstants .SFMatrix3f:
            case X3DConstants .SFMatrix4d:
            case X3DConstants .SFMatrix4f:
            {
               location .array .set (field .getValue ());
               location .uniform .call (gl, location, false, location .array);
               return;
            }
            case X3DConstants .SFNode:
            {
               const texture = X3DCast (X3DConstants .X3DTextureNode, field);

               if (texture)
               {
                  location .name    = field .getName ();
                  location .texture = texture;

                  this .textures .add (location);
               }
               else
               {
                  this .textures .delete (location);
               }

               return;
            }
            case X3DConstants .SFRotation:
            {
               field .getValue () .getMatrix (location .array);

               location .uniform .call (gl, location, false, location .array);
               return;
            }
            case X3DConstants .SFString:
            {
               return;
            }
            case X3DConstants .SFVec2d:
            case X3DConstants .SFVec2f:
            case X3DConstants .SFColor:
            case X3DConstants .SFVec3d:
            case X3DConstants .SFVec3f:
            case X3DConstants .SFColorRGBA:
            case X3DConstants .SFVec4d:
            case X3DConstants .SFVec4f:
            {
               location .uniform .call (gl, location, ... field .getValue ());
               return;
            }
            case X3DConstants .MFBool:
            case X3DConstants .MFInt32:
            case X3DConstants .MFDouble:
            case X3DConstants .MFFloat:
            case X3DConstants .MFTime:
            {
               const { array, uniform } = location;

               let a = 0;

               for (const value of field)
                  array [a ++] = value;

               array .fill (0, a);

               uniform .call (gl, location, array);
               return;
            }
            case X3DConstants .MFImage:
            {
               const { array, uniform } = location;

               let a = 0;

               for (const image of field)
               {
                  array [a ++] = image .width;
                  array [a ++] = image .height;
                  array [a ++] = image .comp;

                  for (const pixel of image .array)
                     array [a ++] = pixel;
               }

               array .fill (0, a);

               uniform .call (gl, location, array);
               return;
            }
            case X3DConstants .MFMatrix3d:
            case X3DConstants .MFMatrix3f:
            case X3DConstants .MFMatrix4d:
            case X3DConstants .MFMatrix4f:
            {
               const { array, uniform } = location;

               let a = 0;

               for (const matrix of field)
               {
                  for (const element of matrix)
                     array [a ++] = element;
               }

               array .fill (0, a);

               uniform .call (gl, location, false, array);
               return;
            }
            case X3DConstants .MFNode:
            {
               const
                  locations   = location .locations,
                  fieldLength = field .length;

               for (let i = 0; i < fieldLength; ++ i)
               {
                  const texture = X3DCast (X3DConstants .X3DTextureNode, field [i]);

                  if (texture)
                  {
                     locations [i] .name    = field .getName ();
                     locations [i] .texture = texture;

                     this .textures .add (locations [i]);
                  }
                  else
                  {
                     this .textures .delete (locations [i]);
                  }
               }

               return;
            }
            case X3DConstants .MFRotation:
            {
               const { array, uniform } = location;

               let a = 0;

               for (const rotation of field)
               {
                  rotation .getValue () .getMatrix (rotationMatrix);

                  for (const element of rotationMatrix)
                     array [a ++] = element;
               }

               array .fill (0, a);

               uniform .call (gl, location, false, array);
               return;
            }
            case X3DConstants .MFString:
            {
               return;
            }
            case X3DConstants .MFVec2d:
            case X3DConstants .MFVec2f:
            case X3DConstants .MFColor:
            case X3DConstants .MFVec3d:
            case X3DConstants .MFVec3f:
            case X3DConstants .MFColorRGBA:
            case X3DConstants .MFVec4d:
            case X3DConstants .MFVec4f:
            {
               const { array, uniform } = location;

               let a = 0;

               for (const vector of field)
               {
                  for (const element of vector)
                     array [a ++] = element;
               }

               array .fill (0, a);

               uniform .call (gl, location, array);
               return;
            }
         }
      };
   })(),
   getImagesLength (field)
   {
      const images = field .getValue ();

      let length = 3 * images .length;

      for (const image of images)
         length += image .array .length;

      return length;
   },
   getLocationLength (gl, program, field)
   {
      const name = field .getName ();

      for (let i = 0; ; ++ i)
      {
         const location = gl .getUniformLocation (program, `${name}[${i}]`);

         if (!location)
            return i;
      }
   },
   hasFog (fogNode)
   {
      if (this .fogNode === fogNode)
         return true;

      this .fogNode = fogNode;

      return false;
   },
   hasEnvironmentLight (i, lightNode)
   {
      if (this .environmentLightNodes [i] === lightNode)
         return true;

      this .environmentLightNodes [i] = lightNode;

      return false;
   },
   hasLight (i, lightNode)
   {
      if (this .lightNodes [i] === lightNode)
         return true;

      this .lightNodes [i] = lightNode;

      return false;
   },
   hasTextureProjector (i, textureProjectorNode)
   {
      if (this .textureProjectorNodes [i] === textureProjectorNode)
         return true;

      this .textureProjectorNodes [i] = textureProjectorNode;

      return false;
   },
   setClipPlanes (gl, clipPlanes, renderObject)
   {
      this .numClipPlanes = 0;

      for (const clipPlane of clipPlanes)
         clipPlane .setShaderUniforms (gl, this, renderObject);
   },
   setUniforms: (() =>
   {
      const normalMatrix = new Float32Array (9);

      return function (gl, renderContext, geometryContext, front = true)
      {
         const { renderObject, fogNode, appearanceNode, hAnimNode, modelViewMatrix } = renderContext;

         const
            stylePropertiesNode = appearanceNode .getStyleProperties (geometryContext .geometryType),
            materialNode        = front ? appearanceNode .getMaterial () : appearanceNode .getBackMaterial (),
            textureNode         = renderContext .textureNode || appearanceNode .getTexture ();

         // Set global uniforms.

         if (this .renderCount !== renderObject .getRenderCount ())
         {
            this .renderCount = renderObject .getRenderCount ();

            // Set viewport.

            gl .uniform4iv (this .x3d_Viewport, renderObject .getViewportArray ());

            // Set projection matrix.

            gl .uniformMatrix4fv (this .x3d_ProjectionMatrix,  false, renderObject .getProjectionMatrixArray ());
            gl .uniformMatrix4fv (this .x3d_EyeMatrix,         false, renderObject .getEyeMatrixArray ());
            gl .uniformMatrix4fv (this .x3d_ViewMatrix,        false, renderObject .getViewMatrixArray ());
            gl .uniformMatrix4fv (this .x3d_CameraSpaceMatrix, false, renderObject .getCameraSpaceMatrixArray ());

            // Fog

            this .fogNode = null;

            // Set global lights and global texture projectors.

            this .numEnvironmentLights = 0;
            this .numLights            = 0;
            this .numTextureProjectors = 0;

            this .environmentLightNodes .length = 0;
            this .lightNodes .length            = 0;
            this .textureProjectorNodes .length = 0;

            for (const globalLights of renderObject .getGlobalLights ())
               globalLights .setShaderUniforms (gl, this, renderObject);

            this .numGlobalEnvironmentLights = this .numEnvironmentLights;
            this .numGlobalLights            = this .numLights;
            this .numGlobalTextureProjectors = this .numTextureProjectors;

            // Logarithmic depth buffer support

            if (renderObject .getLogarithmicDepthBuffer ())
            {
               const
                  navigationInfoNode = renderObject .getNavigationInfo (),
                  viewpointNode      = renderObject .getViewpoint ();

               gl .uniform1f (this .x3d_LogarithmicFarFactor1_2, 1 / Math .log2 (viewpointNode .getFarDistance (navigationInfoNode) + 1));
            }
         }

         // Model view matrix

         gl .uniformMatrix4fv (this .x3d_ModelViewMatrix, false, modelViewMatrix);

         // Normal matrix

         if (geometryContext .hasNormals)
         {
            normalMatrix [0] = modelViewMatrix [0]; normalMatrix [3] = modelViewMatrix [1]; normalMatrix [6] = modelViewMatrix [ 2];
            normalMatrix [1] = modelViewMatrix [4]; normalMatrix [4] = modelViewMatrix [5]; normalMatrix [7] = modelViewMatrix [ 6];
            normalMatrix [2] = modelViewMatrix [8]; normalMatrix [5] = modelViewMatrix [9]; normalMatrix [8] = modelViewMatrix [10];

            Matrix3 .prototype .inverse .call (normalMatrix);

            gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, normalMatrix);
         }

         // Fog

         fogNode ?.setShaderUniforms (gl, this);

         // Clip planes and local lights

         this .numClipPlanes        = 0;
         this .numEnvironmentLights = this .numGlobalEnvironmentLights;
         this .numLights            = this .numGlobalLights;
         this .numTextureProjectors = this .numGlobalTextureProjectors;

         for (const localObject of renderContext .localObjects)
            localObject .setShaderUniforms (gl, this, renderObject);

         // Alpha

         gl .uniform1f (this .x3d_AlphaCutoff, appearanceNode .getAlphaCutoff ());

         // Style Properties

         stylePropertiesNode ?.setShaderUniforms (gl, this);

         // Material

         materialNode .setShaderUniforms (gl, this, renderObject, appearanceNode .getTextureTransformMapping (), geometryContext .getTextureCoordinateMapping (), front);

         // Texture

         textureNode ?.setShaderUniforms (gl, this, renderObject);

         appearanceNode  .getTextureTransform ()  .setShaderUniforms (gl, this);
         geometryContext .getTextureCoordinate () .setShaderUniforms (gl, this);

         // Skinning

         hAnimNode ?.setShaderUniforms (gl, this);
      };
   })(),
   enable (gl)
   {
      gl .useProgram (this .getProgram ());

      for (const location of this .textures)
      {
         const
            texture     = location .texture,
            textureUnit = this .getBrowser () .getTextureUnit ();

         if (textureUnit === undefined)
         {
            console .warn ("Not enough combined texture units for uniform variable '" + location .name + "' available.");
            return;
         }

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (texture .getTarget (), texture .getTexture ());
         gl .uniform1i (location, textureUnit);
      }
   },
   enableFloatAttrib (gl, name, buffer, components, stride, offset, divisor = 0)
   {
      const location = gl .getAttribLocation (this .getProgram (), name);

      if (location === -1)
         return;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, components, gl .FLOAT, false, stride, offset);
      gl .vertexAttribDivisor (location, divisor);
   },
   enableMatrix3Attrib (gl, name, buffer, stride, offset)
   {
      const location0 = gl .getAttribLocation (this .getProgram (), name);

      if (location0 === -1)
         return;

      stride ||= 36;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

      for (let i = 0; i < 3; ++ i)
      {
         const location = location0 + i;

         gl .enableVertexAttribArray (location);
         gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset + 12 * i);
      }
   },
   enableMatrix4Attrib (gl, name, buffer, stride, offset)
   {
      const location0 = gl .getAttribLocation (this .getProgram (), name);

      if (location0 === -1)
         return;

      stride ||= 64;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

      for (let i = 0; i < 4; ++ i)
      {
         const location = location0 + i;

         gl .enableVertexAttribArray (location);
         gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset + 16 * i);
      }
   },
   enableCoordIndexAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_CoordIndex;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 1, gl .FLOAT, false, stride, offset); // gl .UNSIGNED_INT
   },
   enableLineStippleAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_LineStipple;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset);
   },
   enableFogDepthAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_FogDepth;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 1, gl .FLOAT, false, stride, offset);
   },
   enableColorAttribute (gl, buffer, stride, offset, divisor = 0)
   {
      const location = this .x3d_Color;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset);
      gl .vertexAttribDivisor (location, divisor)
   },
   colorAttributeDivisor (gl, divisor)
   {
      gl .vertexAttribDivisor (this .x3d_Color, divisor);
   },
   enableTexCoordAttribute (gl, buffers, stride, offset)
   {
      for (const [i, location] of this .x3d_TexCoord)
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, buffers [i]);
         gl .enableVertexAttribArray (location);
         gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset);
      }
   },
   texCoordAttributeDivisor (gl, divisor)
   {
      for (const [i, location] of this .x3d_TexCoord)
      {
         gl .vertexAttribDivisor (location, divisor);
      }
   },
   enableNormalAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_Normal;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset);
   },
   normalAttributeDivisor (gl, divisor)
   {
      gl .vertexAttribDivisor (this .x3d_Normal, divisor);
   },
   enableTangentAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_Tangent;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset);
   },
   tangentAttributeDivisor (gl, divisor)
   {
      gl .vertexAttribDivisor (this .x3d_Tangent, divisor);
   },
   enableVertexAttribute (gl, buffer, stride, offset)
   {
      const location = this .x3d_Vertex;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset);
   },
   enableParticleAttribute (gl, buffer, stride, offset, divisor)
   {
      const location = this .x3d_Particle;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset);
      gl .vertexAttribDivisor (location, divisor);
   },
   enableParticleVelocityAttribute (gl, buffer, stride, offset, divisor)
   {
      const location = this .x3d_ParticleVelocity;

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .enableVertexAttribArray (location);
      gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset);
      gl .vertexAttribDivisor (location, divisor);
   },
   enableInstanceMatrixAttribute (gl, buffer, stride, offset, divisor)
   {
      const location0 = this .x3d_InstanceMatrix;

      stride ||= 64; // 4 Bytes * 16

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

      for (let i = 0; i < 4; ++ i)
      {
         const location = location0 + i;

         gl .enableVertexAttribArray (location);
         gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset + 16 * i);
         gl .vertexAttribDivisor (location, divisor);
      }
   },
   enableInstanceNormalMatrixAttribute (gl, buffer, stride, offset, divisor)
   {
      const location0 = this .x3d_InstanceNormalMatrix;

      stride ||= 36; // 4 Bytes * 9

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

      for (let i = 0; i < 3; ++ i)
      {
         const location = location0 + i;

         gl .enableVertexAttribArray (location);
         gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset + 12 * i);
         gl .vertexAttribDivisor (location, divisor);
      }
   },
   // getProgramInfo ()
   // {
   //    function cmp (lhs, rhs) { return lhs < rhs ? -1 : lhs > rhs ? 1 : 0; }

   //    const
   //       program = this .getProgram (),
   //       gl      = this .getBrowser () .getContext ();

   //    const
   //       result = {
   //          attributes: [ ],
   //          uniforms: [ ],
   //          attributeCount: 0,
   //          uniformCount: 0,
   //       },
   //       activeUniforms   = gl .getProgramParameter (program, gl .ACTIVE_UNIFORMS),
   //       activeAttributes = gl .getProgramParameter (program, gl .ACTIVE_ATTRIBUTES);

   //    // Taken from the WebGl spec:
   //    // https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
   //    const enums = {
   //       0x8B50: 'vec2',
   //       0x8B51: 'vec3',
   //       0x8B52: 'vec4',
   //       0x8B53: 'ivec2',
   //       0x8B54: 'ivec3',
   //       0x8B55: 'ivec4',
   //       0x8B56: 'bool',
   //       0x8B57: 'bvec2',
   //       0x8B58: 'bvec3',
   //       0x8B59: 'bvec4',
   //       0x8B5A: 'mat2',
   //       0x8B5B: 'mat3',
   //       0x8B5C: 'mat4',
   //       0x8B5E: 'sampler2D',
   //       0x8B60: 'samplerCube',
   //       0x1400: 'byte',
   //       0x1401: 'ubyte',
   //       0x1402: 'short',
   //       0x1403: 'ushort',
   //       0x1404: 'int',
   //       0x1405: 'uint',
   //       0x1406: 'float',
   //    };

   //    // Loop through active uniforms
   //    for (let i = 0; i < activeUniforms; ++ i)
   //    {
   //       const uniform = gl .getActiveUniform (program, i);
   //       uniform .typeName = enums [uniform.type];
   //       result .uniforms .push (Object .assign ({ }, uniform));
   //       result .uniformCount += uniform .size;
   //    }

   //    // Loop through active attributes
   //    for (let i = 0; i < activeAttributes; ++ i)
   //    {
   //       const attribute = gl .getActiveAttrib (program, i);
   //       attribute .typeName = enums [attribute .type];
   //       result .attributes .push (Object .assign ({ }, attribute));
   //       result .attributeCount += attribute .size;
   //    }

   //    result .uniforms   .sort ((a, b) => cmp (a .name, b .name));
   //    result .attributes .sort ((a, b) => cmp (a .name, b .name));

   //    return result;
   // },
   // printProgramInfo ()
   // {
   //    const programInfo = this .getProgramInfo ();

   //    console .log (this .getName ());
   //    console .table (programInfo .attributes);
   //    console .log (this .getName (), "attributeCount", programInfo .attributeCount);
   //    console .log (this .getName ());
   //    console .table (programInfo .uniforms);
   //    console .log (this .getName (), "uniformCount", programInfo .uniformCount);
   // },
   dispose ()
   { },
});

Object .defineProperties (X3DProgrammableShaderObject, X3DNode .getStaticProperties ("X3DProgrammableShaderObject", "Shaders", 1));

export default X3DProgrammableShaderObject;
