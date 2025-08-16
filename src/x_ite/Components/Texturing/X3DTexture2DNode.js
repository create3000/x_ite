import X3DNode              from "../Core/X3DNode.js";
import X3DSingleTextureNode from "./X3DSingleTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

function X3DTexture2DNode (executionContext)
{
   X3DSingleTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTexture2DNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_2D;
   this .width  = 0;
   this .height = 0;
}

Object .assign (Object .setPrototypeOf (X3DTexture2DNode .prototype, X3DSingleTextureNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureNode .prototype .initialize .call (this);

      this ._repeatS .addInterest ("updateTextureParameters", this);
      this ._repeatT .addInterest ("updateTextureParameters", this);

      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
      gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
   },
   getTarget ()
   {
      return this .target;
   },
   getWidth ()
   {
      return this .width;
   },
   setWidth (value)
   {
      this .width = value;
   },
   getHeight ()
   {
      return this .height;
   },
   setHeight (value)
   {
      this .height = value;
   },
   clearTexture ()
   {
      this .setTextureData (1, 1, false, false, defaultData);
   },
   getTextureData (texture = this .getTexture (), width = this .getWidth (), height = this .getHeight ())
   {
      const
         gl          = this .getBrowser () .getContext (),
         framebuffer = gl .createFramebuffer (),
         data        = new Uint8Array (width * height * 4);

      gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, texture, 0);
      gl .readPixels (0, 0, width, height, gl .RGBA, gl .UNSIGNED_BYTE, data);
      gl .deleteFramebuffer (framebuffer);

      return data;
   },
   setTextureData (width, height, colorSpaceConversion, transparent, data)
   {
      this .width  = width;
      this .height = height;

      const
         gl  = this .getBrowser () .getContext (),
         max = gl .getParameter (gl .MAX_TEXTURE_SIZE);

      if (width > max || height > max)
      {
         throw new Error (`At least one dimension (${width} × ${height}) is greater than the maximum texture size (${max} px).`);
      }

      gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
      gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, colorSpaceConversion ? gl .BROWSER_DEFAULT_WEBGL : gl .NONE);
      gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);
      gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, gl .BROWSER_DEFAULT_WEBGL);

      this .setTransparent (transparent);
      this .updateTextureParameters ();
      this .addNodeEvent ();
   },
   updateTextureData (data)
   {
      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
      gl .texSubImage2D (gl .TEXTURE_2D, 0, 0, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);

      if (this .texturePropertiesNode ._generateMipMaps .getValue ())
         gl .generateMipmap (gl .TEXTURE_2D);

      this .addNodeEvent ();
   },
   updateTextureParameters ()
   {
      X3DSingleTextureNode .prototype .updateTextureParameters .call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .width,
                                                                      this .height,
                                                                      this ._repeatS .getValue (),
                                                                      this ._repeatT .getValue (),
                                                                      false);
   },
   setShaderUniforms (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
      gl .uniform1i (channel .texture2D, textureUnit);
   },
});

Object .defineProperties (X3DTexture2DNode, X3DNode .getStaticProperties ("X3DTexture2DNode", "Texturing", 1));

export default X3DTexture2DNode;
