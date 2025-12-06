import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureProjectorNode from "./X3DTextureProjectorNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Camera                  from "../../../standard/Math/Geometry/Camera.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack             from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache             from "../../../standard/Utility/ObjectCache.js";

const TextureProjectorCache = ObjectCache (TextureProjectorContainer);

function TextureProjectorContainer ()
{
   this .projectionMatrix                = new Matrix4 ();
   this .modelViewMatrix                 = new MatrixStack (Matrix4);
   this .modelMatrix                     = new Matrix4 ();
   this .invTextureSpaceMatrix           = new Matrix4 ();
   this .invTextureSpaceProjectionMatrix = new Matrix4 ();
   this .location                        = new Vector3 ();
   this .locationArray                   = new Float32Array (3);
   this .direction                       = new Vector3 ();
   this .rotation                        = new Rotation4 ();
   this .matrix                          = new Matrix4 ();
   this .matrixArray                     = new Float32Array (16);
   this .textureMatrix                   = new Matrix4 ();
}

Object .assign (TextureProjectorContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
      this .textureMatrix .assign (lightNode .getTexture () .getMatrix ());
   },
   renderShadowMap (renderObject)
   {
      const
         lightNode             = this .lightNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrixArray (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .IDENTITY);

      this .rotation .setFromToVec (Vector3 .Z_AXIS, this .direction .assign (lightNode .getDirection ()) .negate ());
      lightNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (lightNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = lightNode .getTexture () .getWidth (),
         height       = lightNode .getTexture () .getHeight (),
         nearDistance = lightNode .getNearDistance (),
         farDistance  = lightNode .getFarDistance (),
         fieldOfView  = lightNode .getFieldOfView ();

      Camera .perspective (fieldOfView, nearDistance, farDistance, width, height, this .projectionMatrix);

      if (!this .global)
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix
         .assign (invTextureSpaceMatrix)
         .multRight (this .projectionMatrix)
         .multRight (lightNode .getBiasMatrix ())
         .multRight (this .textureMatrix);

      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (lightNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setGlobalVariables (renderObject)
   {
      this .matrix
         .assign (renderObject .getView () ?.inverse ?? Matrix4 .IDENTITY)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invTextureSpaceProjectionMatrix);

      this .matrixArray .set (this .matrix);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const
         i        = shaderObject .numTextureProjectors ++,
         uniforms = shaderObject .x3d_TextureProjector [i];

      if (!uniforms)
         return;

      const
         lightNode   = this .lightNode,
         texture     = lightNode .getTexture (),
         textureUnit = this .global
            ? this .textureUnit ??= this .browser .popGlobalTextureUnit ()
            : this .browser .popTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (uniforms .texture, textureUnit);

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         nearParameter = lightNode .getNearParameter (),
         farParameter  = lightNode .getFarParameter ();

      gl .uniform3f        (uniforms .color,         ... lightNode .getColor ());
      gl .uniform1f        (uniforms .intensity,     lightNode .getIntensity ());
      gl .uniform3fv       (uniforms .location,      this .locationArray);
      gl .uniform2f        (uniforms .params,        nearParameter, farParameter);
      gl .uniformMatrix4fv (uniforms .matrix, false, this .matrixArray);
   },
   dispose ()
   {
      if (this .global)
         this .textureUnit = undefined;

      this .modelViewMatrix .clear ();

      TextureProjectorCache .push (this);
   },
});

function TextureProjector (executionContext)
{
   X3DTextureProjectorNode .call (this, executionContext);

   this .addType (X3DConstants .TextureProjector);

   // Units

   this ._fieldOfView .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (TextureProjector .prototype, X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      X3DTextureProjectorNode .prototype .initialize .call (this);
   },
   getFieldOfView ()
   {
      const fov = this ._fieldOfView .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   getLights ()
   {
      return TextureProjectorCache;
   },
});

Object .defineProperties (TextureProjector,
{
   ... X3DNode .getStaticProperties ("TextureProjector", "TextureProjection", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "upVector",         new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fieldOfView",      new Fields .SFFloat (0.785398)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "nearDistance",     new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "farDistance",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "aspectRatio",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",          new Fields .SFNode ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",      new Fields .SFColor ()),      // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity",  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",       new Fields .SFFloat (0.005)), // skip test
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",    new Fields .SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

export default TextureProjector;
