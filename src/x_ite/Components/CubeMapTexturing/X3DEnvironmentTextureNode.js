import X3DNode              from "../Core/X3DNode.js";
import X3DSingleTextureNode from "../Texturing/X3DSingleTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function X3DEnvironmentTextureNode (executionContext)
{
   X3DSingleTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DEnvironmentTextureNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_CUBE_MAP;

   this .targets = [
      gl .TEXTURE_CUBE_MAP_POSITIVE_Z, // Front
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, // Back
      gl .TEXTURE_CUBE_MAP_NEGATIVE_X, // Left
      gl .TEXTURE_CUBE_MAP_POSITIVE_X, // Right
      gl .TEXTURE_CUBE_MAP_POSITIVE_Y, // Top
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, // Bottom
   ];

   this .size   = 1;
   this .levels = 0;
}

Object .assign (Object .setPrototypeOf (X3DEnvironmentTextureNode .prototype, X3DSingleTextureNode .prototype),
{
   getTarget ()
   {
      return this .target;
   },
   getTextureType ()
   {
      return 4;
   },
   getTargets ()
   {
      return this .targets;
   },
   getSize ()
   {
      return this .size;
   },
   setSize (value)
   {
      this .size = value;

      // https://stackoverflow.com/a/25640078/1818915
      // The system will automatically clamp the specified parameter appropriately.
      // In GLSL 4 there is a textureQueryLevels function,
      // otherwise: levels = 1 + floor (log2 (size)).
      // We subtract one (1) here, because glsl texture lod starts with 0.
      this .levels = Math .floor (Math .log2 (Math .max (value, 1)));
   },
   getLevels ()
   {
      return this .levels;
   },
   clearTexture: (() =>
   {
      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         this .setSize (1);
         this .setTransparent (false);
         this .updateTextureParameters ();
      };
   })(),
   updateTextureParameters ()
   {
      X3DSingleTextureNode .prototype .updateTextureParameters .call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .size,
                                                                      this .size,
                                                                      false,
                                                                      false,
                                                                      false);
   },
   setShaderUniforms (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
      gl .uniform1i (channel .textureCube, textureUnit);
   },
});

Object .defineProperties (X3DEnvironmentTextureNode, X3DNode .getStaticProperties ("X3DEnvironmentTextureNode", "CubeMapTexturing", 1));

export default X3DEnvironmentTextureNode;
