import X3DNode              from "../Core/X3DNode.js";
import X3DSingleTextureNode from "../Texturing/X3DSingleTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

function X3DTexture3DNode (executionContext)
{
   X3DSingleTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTexture3DNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_3D;
   this .width  = 0;
   this .height = 0;
   this .depth  = 0;
}

Object .assign (Object .setPrototypeOf (X3DTexture3DNode .prototype, X3DSingleTextureNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureNode .prototype .initialize .call (this);

      this ._repeatS .addInterest ("updateTextureParameters", this);
      this ._repeatT .addInterest ("updateTextureParameters", this);
      this ._repeatR .addInterest ("updateTextureParameters", this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
   },
   getTarget ()
   {
      return this .target;
   },
   getTextureType ()
   {
      return 3;
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
   getDepth ()
   {
      return this .depth;
   },
   setDepth (value)
   {
      this .depth = value;
   },
   clearTexture ()
   {
      const gl = this .getBrowser () .getContext ();

      this .setTextureData (1, 1, 1, false, gl .RGBA, defaultData);
   },
   setTextureData (width, height, depth, transparent, format, data)
   {
      this .width  = width;
      this .height = height;
      this .depth  = depth;

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      const max = gl .getParameter (gl .MAX_3D_TEXTURE_SIZE);

      if (width > max || height > max || depth > max)
      {
         throw new Error (`At least one dimension (${width} × ${height} × ${depth}) is greater than the maximum texture size (${max} px).`);
      }

      // If the texture is updated with different data, it will not display
      // correctly, so we will create a new texture here.
      this .setTexture (gl .createTexture ());

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, format, width, height, depth, 0, format, gl .UNSIGNED_BYTE, data);

      this .setTransparent (transparent);
      this .updateTextureParameters ();
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
                                                                      this ._repeatR .getValue ());
   },
   setShaderUniforms (gl, shaderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .uniform1i (channel .texture3D, textureUnit);
   },
});

Object .defineProperties (X3DTexture3DNode, X3DNode .getStaticProperties ("X3DTexture3DNode", "Texturing3D", 1));

export default X3DTexture3DNode;
