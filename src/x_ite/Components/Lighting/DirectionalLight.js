import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLightNode         from "./X3DLightNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const DirectionalLights = ObjectCache (DirectionalLightContainer);

function DirectionalLightContainer ()
{
   this .direction                     = new Vector3 ();
   this .shadowBuffer                  = null;
   this .bbox                          = new Box3 ();
   this .viewVolume                    = new ViewVolume ();
   this .viewport                      = new Vector4 ();
   this .projectionMatrix              = new Matrix4 ();
   this .modelViewMatrix               = new MatrixStack (Matrix4);
   this .modelMatrix                   = new Matrix4 ();
   this .invLightSpaceMatrix           = new Matrix4 ();
   this .invLightSpaceProjectionMatrix = new Matrix4 ();
   this .shadowMatrix                  = new Matrix4 ();
   this .shadowMatrixArray             = new Float32Array (16);
   this .rotation                      = new Rotation4 ();
   this .textureUnit                   = undefined;
}

Object .assign (DirectionalLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      const shadowMapSize = lightNode .getShadowMapSize ();

      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .groupNode = groupNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);

      // Get shadow buffer from browser.

      if (lightNode .getShadowIntensity () > 0 && shadowMapSize > 0)
      {
         this .shadowBuffer = this .browser .popShadowBuffer (shadowMapSize);

         if (!this .shadowBuffer)
            console .warn ("Couldn't create shadow buffer.");
      }
   },
   renderShadowMap (renderObject)
   {
      if (!this .shadowBuffer)
         return;

      const
         lightNode            = this .lightNode,
         cameraSpaceMatrix    = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix          = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invLightSpaceMatrix  = this .invLightSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .Identity);

      invLightSpaceMatrix .rotate (this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (lightNode .getDirection ()) .negate ()));
      invLightSpaceMatrix .inverse ();

      const
         groupBBox        = this .groupNode .getSubBBox (this .bbox, true), // Group bbox.
         lightBBox        = groupBBox .multRight (invLightSpaceMatrix),     // Group bbox from the perspective of the light.
         shadowMapSize    = lightNode .getShadowMapSize (),
         viewport         = this .viewport .set (0, 0, shadowMapSize, shadowMapSize),
         projectionMatrix = Camera .orthoBox (lightBBox, this .projectionMatrix);

      this .shadowBuffer .bind ();

      renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
      renderObject .getProjectionMatrix () .push (projectionMatrix);
      renderObject .getModelViewMatrix  () .push (invLightSpaceMatrix);

      renderObject .render (TraverseType .SHADOW, X3DGroupingNode .prototype .traverse, this .groupNode);

      renderObject .getModelViewMatrix  () .pop ();
      renderObject .getProjectionMatrix () .pop ();
      renderObject .getViewVolumes      () .pop ();

      if (!this .global)
         invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix) .multRight (projectionMatrix) .multRight (lightNode .getBiasMatrix ());
   },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .multDirMatrix (this .direction .assign (this .lightNode .getDirection ())) .normalize ();

      if (!this .shadowBuffer)
         return;

      this .shadowMatrix
         .assign (renderObject .getView () ?.inverse ?? Matrix4 .Identity)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invLightSpaceProjectionMatrix);

      this .shadowMatrixArray .set (this .shadowMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const i = shaderObject .numLights ++;

      if (this .shadowBuffer)
      {
         const textureUnit = this .global
            ? this .textureUnit ??= this .browser .popTextureUnit ()
            : this .browser .getTextureUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
         gl .uniform1i (shaderObject .x3d_ShadowMap [i], textureUnit);
      }

      if (shaderObject .hasLight (i, this))
         return;

      const
         { lightNode, direction} = this,
         color                   = lightNode .getColor ();

      gl .uniform1i (shaderObject .x3d_LightType [i],             1);
      gl .uniform3f (shaderObject .x3d_LightColor [i],            ... color);
      gl .uniform1f (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
      gl .uniform1f (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
      gl .uniform3f (shaderObject .x3d_LightDirection [i],        ... direction);
      gl .uniform1f (shaderObject .x3d_LightRadius [i],           -1);

      if (this .shadowBuffer)
      {
         const shadowColor = lightNode .getShadowColor ();

         gl .uniform3f        (shaderObject .x3d_ShadowColor [i],         ... shadowColor);
         gl .uniform1f        (shaderObject .x3d_ShadowIntensity [i],     lightNode .getShadowIntensity ());
         gl .uniform1f        (shaderObject .x3d_ShadowBias [i],          lightNode .getShadowBias ());
         gl .uniformMatrix4fv (shaderObject .x3d_ShadowMatrix [i], false, this .shadowMatrixArray);
         gl .uniform1i        (shaderObject .x3d_ShadowMapSize [i],       lightNode .getShadowMapSize ());
      }
      else
      {
         gl .uniform1f (shaderObject .x3d_ShadowIntensity [i], 0);
      }
   },
   dispose ()
   {
      const { shadowBuffer } = this;

      if (shadowBuffer)
      {
         const { browser, global } = this;

         browser .pushShadowBuffer (shadowBuffer);

         this .shadowBuffer = null;

         if (global)
         {
            browser .pushTextureUnit (this .textureUnit);

            this .textureUnit = undefined;
         }
      }

      this .modelViewMatrix .clear ();

      // Return container

      DirectionalLights .push (this);
   },
});

function DirectionalLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .DirectionalLight);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.0)
      this ._global = true;
}

Object .assign (Object .setPrototypeOf (DirectionalLight .prototype, X3DLightNode .prototype),
{
   getLights ()
   {
      return DirectionalLights;
   },
});

Object .defineProperties (DirectionalLight,
{
   ... X3DNode .getStaticProperties ("DirectionalLight", "Lighting", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, -1)),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new Fields .SFColor ()),        // skip test, Color of shadows
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new Fields .SFFloat (1)),       // Intensity of shadow color in the range (0, 1)
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new Fields .SFFloat (0.005)),   // skip test, Bias of the shadow
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new Fields .SFInt32 (1024)),    // skip test, Size of the shadow map in pixels in the range (0, inf).
      ]),
      enumerable: true,
   },
});

export default DirectionalLight;
