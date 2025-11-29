import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLightNode         from "./X3DLightNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Distribution         from "../../Browser/Lighting/Distribution.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const EnvironmentLights = ObjectCache (EnvironmentLightContainer);

function EnvironmentLightContainer ()
{
   this .modelViewMatrix = new MatrixStack (Matrix4);
   this .rotation        = new Rotation4 ();
   this .rotationMatrix  = new Float32Array (9);
}

Object .assign (EnvironmentLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
   },
   renderShadowMap (renderObject)
   { },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .get (null, this .rotation);

      this .rotation
         .multLeft (this .lightNode ._rotation .getValue ())
         .inverse ()
         .getMatrix (this .rotationMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         i        = shaderObject .numEnvironmentLights ++,
         uniforms = shaderObject .x3d_EnvironmentLight [i];

      if (!uniforms)
         return;

      const
         { browser, lightNode, global } = this,
         diffuseTexture  = lightNode .getDiffuseTexture (),
         specularTexture = lightNode .getSpecularTexture (),
         GGXLUTTexture   = browser .getLibraryTexture ("lut_ggx.png");

      const diffuseTextureUnit = global
         ? this .diffuseTextureUnit ??= browser .popTextureUnit ()
         : browser .getTextureUnit ();

      const specularTextureUnit = global
         ? this .specularTextureUnit ??= browser .popTextureUnit ()
         : browser .getTextureUnit ();

      const GGXLUTTextureUnit = global
         ? this .GGXLUTTextureUnit ??= browser .popTextureUnit ()
         : browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + diffuseTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, diffuseTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (uniforms .diffuseTexture, diffuseTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + specularTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, specularTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (uniforms .specularTexture, specularTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + GGXLUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, GGXLUTTexture .getTexture ());
      gl .uniform1i (uniforms .GGXLUTTexture, GGXLUTTextureUnit);

      if (uniforms .sheenTexture)
      {
         const
            sheenTexture      = lightNode .getSheenTexture (),
            charlieLUTTexture = browser .getLibraryTexture ("lut_charlie.png");

         const sheenTextureUnit = global
            ? this .sheenTextureUnit ??= browser .popTextureUnit ()
            : browser .getTextureUnit ();

         const charlieLUTTextureUnit = global
            ? this .charlieLUTTextureUnit ??= browser .popTextureUnit ()
            : browser .getTextureUnit ();

         gl .activeTexture (gl .TEXTURE0 + sheenTextureUnit);
         gl .bindTexture (gl .TEXTURE_CUBE_MAP, sheenTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
         gl .uniform1i (uniforms .sheenTexture, sheenTextureUnit);

         gl .activeTexture (gl .TEXTURE0 + charlieLUTTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, charlieLUTTexture .getTexture ());
         gl .uniform1i (uniforms .charlieLUTTexture, charlieLUTTextureUnit);
      }

      if (shaderObject .hasEnvironmentLight (i, this))
         return;

      const color = lightNode .getColor ();

      gl .uniform3f        (uniforms .color,                 ... color);
      gl .uniform1f        (uniforms .intensity,             lightNode .getIntensity ());
      gl .uniformMatrix3fv (uniforms .rotation, false,       this .rotationMatrix);
      gl .uniform1i        (uniforms .diffuseTextureLevels,  diffuseTexture ?.getLevels () ?? 0);
      gl .uniform1i        (uniforms .specularTextureLevels, specularTexture ?.getLevels () ?? 0);

      if (uniforms .sheenTexture)
      {
         const sheenTexture = lightNode .getSheenTexture ();

         gl .uniform1i (uniforms .sheenTextureLevels, sheenTexture ?.getLevels () ?? 0);
      }
   },
   dispose ()
   {
      const { global } = this;

      if (global)
      {
         const { browser } = this;

         browser .pushTextureUnit (this .diffuseTextureUnit);
         browser .pushTextureUnit (this .specularTextureUnit);
         browser .pushTextureUnit (this .sheenTextureUnit);
         browser .pushTextureUnit (this .GGXLUTTextureUnit);
         browser .pushTextureUnit (this .charlieLUTTextureUnit);

         this .diffuseTextureUnit    = undefined;
         this .specularTextureUnit   = undefined;
         this .sheenTextureUnit      = undefined;
         this .GGXLUTTextureUnit     = undefined;
         this .charlieLUTTextureUnit = undefined;
      }

      this .modelViewMatrix .clear ();

      // Return container

      EnvironmentLights .push (this);
   },
});

function EnvironmentLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .EnvironmentLight);
}

Object .assign (Object .setPrototypeOf (EnvironmentLight .prototype, X3DLightNode .prototype),
{
   initialize ()
   {
      X3DLightNode .prototype .initialize .call (this);

      // Preload LUTs.
      this .getBrowser () .getLibraryTexture ("lut_ggx.png");

      this ._diffuseCoefficients .addInterest ("requestGenerateTextures", this);
      this ._diffuseTexture      .addInterest ("set_diffuseTexture__",    this);
      this ._specularTexture     .addInterest ("set_specularTexture__",   this);

      this .set_diffuseTexture__ ();
      this .set_specularTexture__ ();
   },
   getLightKey ()
   {
      return this .lightKey ??= (() =>
      {
         const
            diffuseLinear  = this .getDiffuseTexture ()  ?.isLinear () ? 1 : 0,
            specularLinear = this .getSpecularTexture () ?.isLinear () ? 1 : 0,
            sheenLinear    = this .getSheenTexture ()    ?.isLinear () ? 1 : 0;

         return `[2.${diffuseLinear}.${specularLinear}.${sheenLinear}]`;
      })();
   },
   getDiffuseTexture ()
   {
      return this .diffuseTexture ?? (this .generatedDiffuseTexture ??= (() =>
      {
         if (!this .specularTexture)
            return;

         // Render the texture.

         const browser = this .getBrowser ();

         if (browser .getBrowserOption ("Debug") && this .specularTexture .getSize () > 1)
            console .info ("Generating diffuse texture for EnvironmentLight.");

         return browser .filterEnvironmentTexture ({
            name: "GeneratedDiffuseTexture",
            texture: this .specularTexture,
            distribution: Distribution .LAMBERTIAN,
            sampleCount: 2048,
            roughness: [0],
         });
      })());
   },
   getSpecularTexture ()
   {
      return this .generatedSpecularTexture ??= (() =>
      {
         if (!this .specularTexture)
            return;

         // Render the texture.

         const browser = this .getBrowser ();

         if (browser .getBrowserOption ("Debug") && this .specularTexture .getSize () > 1)
            console .info ("Generating specular texture for EnvironmentLight.");

         const
            levels    = this .specularTexture .getLevels (),
            roughness = Array .from ({ length: levels + 1 }, (_, i) => i / (levels || 1));

         return browser .filterEnvironmentTexture ({
            name: "GeneratedSpecularTexture",
            texture: this .specularTexture,
            distribution: Distribution .GGX,
            sampleCount: 1024,
            roughness,
         });
      })();
   },
   getSheenTexture ()
   {
      return this .generatedSheenTexture ??= (() =>
      {
         if (!this .specularTexture)
            return;

         // Render the texture.

         const browser = this .getBrowser ();

         if (browser .getBrowserOption ("Debug") && this .specularTexture .getSize () > 1)
            console .info ("Generating sheen texture for EnvironmentLight.");

         const
            levels    = this .specularTexture .getLevels (),
            roughness = Array .from ({ length: levels + 1 }, (_, i) => Math .max (i / (levels || 1), 2, 0.000001));

         return browser .filterEnvironmentTexture ({
            name: "GeneratedSheenTexture",
            texture: this .specularTexture,
            distribution: Distribution .CHARLIE,
            sampleCount: 64,
            roughness: roughness,
         });
      })();
   },
   getLights ()
   {
      return EnvironmentLights;
   },
   set_diffuseTexture__ ()
   {
      this .diffuseTexture = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._diffuseTexture);

      this .requestGenerateTextures ();
   },
   set_specularTexture__ ()
   {
      this .specularTexture ?.removeInterest ("requestGenerateTextures", this);

      this .specularTexture = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._specularTexture);

      this .specularTexture ?.addInterest ("requestGenerateTextures", this);

      this .requestGenerateTextures ();
   },
   requestGenerateTextures ()
   {
      this .lightKey                 = undefined;
      this .generatedDiffuseTexture  = null;
      this .generatedSpecularTexture = null;
      this .generatedSheenTexture    = null;
   },
});

Object .defineProperties (EnvironmentLight,
{
   ... X3DNode .getStaticProperties ("EnvironmentLight", "Lighting", 3, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",           new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity",    new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",            new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "diffuseCoefficients", new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "diffuseTexture",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "specularTexture",     new Fields .SFNode ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",         new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",          new Fields .SFFloat (0.005)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",       new Fields .SFInt32 (1024)),
      ]),
      enumerable: true,
   },
});

export default EnvironmentLight;
