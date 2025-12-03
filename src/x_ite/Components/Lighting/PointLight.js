import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLightNode         from "./X3DLightNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

// Shadow map layout
// Compact layout:
//
// xzXZ      Char: Axis
// yyYY      Case: Sign

const orientationMatrices = [
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .X_AXIS,          Vector3 .Z_AXIS)), // left
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .NEGATIVE_X_AXIS, Vector3 .Z_AXIS)), // right
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .NEGATIVE_Z_AXIS, Vector3 .Z_AXIS)), // front
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .Z_AXIS,          Vector3 .Z_AXIS)), // back
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .Y_AXIS,          Vector3 .Z_AXIS)), // bottom
   new Matrix4 () .setRotation (new Rotation4 (Vector3 .NEGATIVE_Y_AXIS, Vector3 .Z_AXIS)), // top
];

const viewports = [
   new Vector4 (0,    0.5, 0.25, 0.5), // left
   new Vector4 (0.5,  0.5, 0.25, 0.5), // right
   new Vector4 (0.75, 0.5, 0.25, 0.5), // front
   new Vector4 (0.25, 0.5, 0.25, 0.5), // back
   new Vector4 (0.0,  0,   0.5,  0.5), // bottom
   new Vector4 (0.5,  0,   0.5,  0.5), // top
];

const PointLights = ObjectCache (PointLightContainer);

function PointLightContainer ()
{
   this .location                      = new Vector3 ();
   this .matrixArray                   = new Float32Array (9);
   this .shadowBuffer                  = null;
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
   this .rotationMatrix                = new Matrix4 ();
   this .textureUnit                   = undefined;
}

Object .assign (PointLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      const shadowMapSize = lightNode .getShadowMapSize ();

      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .groupNode = groupNode;
      this .global    = lightNode .getGlobal ();

      this .matrixArray .set (modelViewMatrix .submatrix .inverse ());

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
         lightNode           = this .lightNode,
         cameraSpaceMatrix   = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix         = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invLightSpaceMatrix = this .invLightSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .IDENTITY);

      invLightSpaceMatrix .translate (lightNode .getLocation ());
      invLightSpaceMatrix .inverse ();

      const shadowMapSize  = lightNode .getShadowMapSize ();

      this .shadowBuffer .bind ();

      for (let i = 0; i < 6; ++ i)
      {
         const
            v                = viewports [i],
            viewport         = this .viewport .set (v [0] * shadowMapSize, v [1] * shadowMapSize, v [2] * shadowMapSize, v [3] * shadowMapSize),
            projectionMatrix = Camera .perspective2 (Algorithm .radians (90), 0.125, 10000, viewport [2], viewport [3], this .projectionMatrix); // Use higher far value for better precision.

         renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
         renderObject .getProjectionMatrix () .push (this .projectionMatrix);
         renderObject .getModelViewMatrix  () .push (orientationMatrices [i]);
         renderObject .getModelViewMatrix  () .multLeft (invLightSpaceMatrix);

         renderObject .render (TraverseType .SHADOW, X3DGroupingNode .prototype .traverse, this .groupNode);

         renderObject .getModelViewMatrix  () .pop ();
         renderObject .getProjectionMatrix () .pop ();
         renderObject .getViewVolumes () .pop ();
      }

      if (!this .global)
         invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix);
   },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (this .lightNode ._location .getValue ()));

      if (!this .shadowBuffer)
         return;

      this .shadowMatrix
         .assign (renderObject .getView () ?.inverse ?? Matrix4 .IDENTITY)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invLightSpaceProjectionMatrix);

      this .shadowMatrixArray .set (this .shadowMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         i        = shaderObject .numLights ++,
         uniforms = shaderObject .x3d_Light [i];

      if (!uniforms)
         return;

      if (this .shadowBuffer)
      {
         const textureUnit = this .global
            ? this .textureUnit ??= this .browser .popTextureUnit ()
            : this .browser .getTextureUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
         gl .uniform1i (uniforms .shadowMap, textureUnit);
      }

      if (shaderObject .hasLight (i, this))
         return;

      const { lightNode, location } = this;

      gl .uniform1i        (uniforms .type,             2);
      gl .uniform3f        (uniforms .color,            ... lightNode .getColor ());
      gl .uniform1f        (uniforms .intensity,        lightNode .getIntensity ());
      gl .uniform1f        (uniforms .ambientIntensity, lightNode .getAmbientIntensity ());
      gl .uniform3fv       (uniforms .attenuation,      lightNode .getAttenuation ());
      gl .uniform3f        (uniforms .location,         ... location);
      gl .uniform1f        (uniforms .radius,           lightNode .getRadius ());
      gl .uniformMatrix3fv (uniforms .matrix, false,    this .matrixArray);

      if (this .shadowBuffer)
      {
         gl .uniform3f        (uniforms .shadowColor,         ... lightNode .getShadowColor ());
         gl .uniform1f        (uniforms .shadowIntensity,     lightNode .getShadowIntensity ());
         gl .uniform1f        (uniforms .shadowBias,          lightNode .getShadowBias ());
         gl .uniformMatrix4fv (uniforms .shadowMatrix, false, this .shadowMatrixArray);
         gl .uniform1i        (uniforms .shadowMapSize,       lightNode .getShadowMapSize ());
      }
      else
      {
         gl .uniform1f (uniforms .shadowIntensity, 0);
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

      PointLights .push (this);
   },
});

function PointLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .PointLight);

   // Units

   this ._location .setUnit ("length");
   this ._radius   .setUnit ("length");

   // Private properties

   this .attenuation = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (PointLight .prototype, X3DLightNode .prototype),
{
   initialize ()
   {
      X3DLightNode .prototype .initialize .call (this);

      this ._attenuation .addInterest ("set_attenuation__", this);

      this .set_attenuation__ ();
   },
   set_attenuation__ ()
   {
      const attenuation = this ._attenuation .getValue ();

      this .attenuation [0] = Math .max (0, attenuation .x);
      this .attenuation [1] = Math .max (0, attenuation .y);
      this .attenuation [2] = Math .max (0, attenuation .z);
   },
   getAttenuation ()
   {
      return this .attenuation;
   },
   getLocation ()
   {
      return this ._location .getValue ();
   },
   getRadius ()
   {
      // Negative values mean infinity.
      return this ._radius .getValue ();
   },
   getLights ()
   {
      return PointLights;
   },
});

Object .defineProperties (PointLight,
{
   ... X3DNode .getStaticProperties ("PointLight", "Lighting", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attenuation",      new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radius",           new Fields .SFFloat (100)),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new Fields .SFColor ()),      // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new Fields .SFFloat (0.005)), // skip test
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new Fields .SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

export default PointLight;
