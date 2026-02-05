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

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

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
         ggxLUTTexture   = browser .getLibraryTexture ("lut_ggx.png");

      const diffuseTextureUnit = global
         ? this .diffuseTextureUnit ??= browser .popGlobalTextureUnit ()
         : browser .popTextureUnit ();

      const specularTextureUnit = global
         ? this .specularTextureUnit ??= browser .popGlobalTextureUnit ()
         : browser .popTextureUnit ();

      const ggxLUTTextureUnit = global
         ? this .ggxLUTTextureUnit ??= browser .popGlobalTextureUnit ()
         : browser .popTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + diffuseTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, diffuseTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (uniforms .diffuseTexture, diffuseTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + specularTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, specularTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (uniforms .specularTexture, specularTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + ggxLUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, ggxLUTTexture .getTexture ());
      gl .uniform1i (uniforms .ggxLUTTexture, ggxLUTTextureUnit);

      if (uniforms .sheenTexture)
      {
         const
            sheenTexture      = lightNode .getSheenTexture (),
            charlieLUTTexture = browser .getLibraryTexture ("lut_charlie.png");

         const sheenTextureUnit = global
            ? this .sheenTextureUnit ??= browser .popGlobalTextureUnit ()
            : browser .popTextureUnit ();

         const charlieLUTTextureUnit = global
            ? this .charlieLUTTextureUnit ??= browser .popGlobalTextureUnit ()
            : browser .popTextureUnit ();

         gl .activeTexture (gl .TEXTURE0 + sheenTextureUnit);
         gl .bindTexture (gl .TEXTURE_CUBE_MAP, sheenTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
         gl .uniform1i (uniforms .sheenTexture, sheenTextureUnit);

         gl .activeTexture (gl .TEXTURE0 + charlieLUTTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, charlieLUTTexture .getTexture ());
         gl .uniform1i (uniforms .charlieLUTTexture, charlieLUTTextureUnit);
      }

      if (shaderObject .hasEnvironmentLight (i, this))
         return;

      gl .uniform3f        (uniforms .color,                 ... lightNode .getColor ());
      gl .uniform1f        (uniforms .intensity,             lightNode .getIntensity ());
      gl .uniformMatrix3fv (uniforms .rotation, false,       this .rotationMatrix);
      gl .uniform1i        (uniforms .diffuseTextureLevels,  diffuseTexture ?.getLevels () ?? 0);
      gl .uniform1i        (uniforms .specularTextureLevels, specularTexture ?.getLevels () ?? 0);

      if (lightNode .traverseSpecular)
         gl .uniform3f (uniforms .flipX, 1, 1, 1);
      else
         gl .uniform3f (uniforms .flipX, -1, 1, 1);

      if (uniforms .sheenTexture)
      {
         const sheenTexture = lightNode .getSheenTexture ();

         gl .uniform1i (uniforms .sheenTextureLevels, sheenTexture ?.getLevels () ?? 0);
      }
   },
   dispose ()
   {
      if (this .global)
      {
         this .diffuseTextureUnit    = undefined;
         this .specularTextureUnit   = undefined;
         this .ggxLUTTextureUnit     = undefined;
         this .sheenTextureUnit      = undefined;
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

         return `[2.${diffuseLinear}.${specularLinear}${sheenLinear}]`;
      })();
   },
   getDiffuseTexture ()
   {
      return this .generatedDiffuseTexture ??= (() =>
      {
         if (!this .diffuseTexture && !this .specularTexture)
            return;

         // Render the texture.

         const browser = this .getBrowser ();

         if (browser .getBrowserOption ("Debug") && this .specularTexture .getSize () > 1)
            console .info ("Generating diffuse texture for EnvironmentLight.");

         return this .cachedDiffuseTexture = browser .filterEnvironmentTexture ({
            name: "GeneratedDiffuseTexture",
            texture: this .diffuseTexture ?? this .specularTexture,
            distribution: this .diffuseTexture ? Distribution .GGX : Distribution .LAMBERTIAN,
            sampleCount: this .diffuseTexture ? 1024 : 2048,
            roughness: [0],
            flipX: this .diffuseTexture ? !this .traverseDiffuse : !this .traverseSpecular,
            cachedNode: this .cachedDiffuseTexture,
         });
      })();
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

         return this .cachedSpecularTexture = browser .filterEnvironmentTexture ({
            name: "GeneratedSpecularTexture",
            texture: this .specularTexture,
            distribution: Distribution .GGX,
            sampleCount: 1024,
            roughness,
            flipX: !this .traverseSpecular,
            cachedNode: this .cachedSpecularTexture,
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

         return this .cachedSheenTexture = browser .filterEnvironmentTexture ({
            name: "GeneratedSheenTexture",
            texture: this .specularTexture,
            distribution: Distribution .CHARLIE,
            sampleCount: 64,
            roughness: roughness,
            flipX: !this .traverseSpecular,
            cachedNode: this .cachedSheenTexture,
         });
      })();
   },
   getLights ()
   {
      return EnvironmentLights;
   },
   set_diffuseTexture__ ()
   {
      this .diffuseTexture  = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._diffuseTexture);
      this .traverseDiffuse = this .diffuseTexture ?.getType () .includes (X3DConstants .GeneratedCubeMapTexture),

      this .set_displayObject__ ();
      this .requestGenerateTextures ();
   },
   set_specularTexture__ ()
   {
      if (this .traverseSpecular)
         this .specularTexture .removeUpdateCallback (this);

      this .specularTexture ?.removeInterest ("requestGenerateTextures", this);

      this .specularTexture  = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._specularTexture);
      this .traverseSpecular = this .specularTexture ?.getType () .includes (X3DConstants .GeneratedCubeMapTexture);

      if (this .traverseSpecular)
         this .specularTexture .addUpdateCallback (this, () => setTimeout (() => this .requestGenerateTextures ()));
      else
         this .specularTexture ?.addInterest ("requestGenerateTextures", this);

      this .set_displayObject__ ();
      this .requestGenerateTextures ();
   },
   set_displayObject__ ()
   {
      this .setVisibleObject (this .traverseDiffuse || this .traverseSpecular);
   },
   requestGenerateTextures ()
   {
      this .lightKey                 = undefined;
      this .generatedDiffuseTexture  = null;
      this .generatedSpecularTexture = null;
      this .generatedSheenTexture    = null;
   },
   traverse (type, renderObject)
   {
      if (!renderObject .isIndependent ())
         return;

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .translate (this ._origin .getValue ());

      if (this .traverseDiffuse && this .diffuseTexture ._update .getValue () !== "NONE")
         this .diffuseTexture .traverse (type, renderObject);

      if (this .traverseSpecular && this .specularTexture ._update .getValue () !== "NONE")
         this .specularTexture .traverse (type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (EnvironmentLight,
{
   // X_ITE introduces this node in 4.0, but X3D specification adds this node in 4.1.
   ... X3DNode .getStaticProperties ("EnvironmentLight", "Lighting", 3, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",           new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity",    new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "origin",              new Fields .SFVec3f ()),
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
