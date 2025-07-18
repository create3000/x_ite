import Fields         from "../../Fields.js";
import X3DNode        from "../Core/X3DNode.js";
import X3DTextureNode from "./X3DTextureNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DCast        from "../../Base/X3DCast.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm      from "../../../standard/Math/Algorithm.js";

function X3DSingleTextureNode (executionContext)
{
   X3DTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureNode);

   this .addChildObjects (X3DConstants .outputOnly, "linear", new Fields .SFBool ())

   this .matrix = new Float32Array (Matrix4 .Identity);
}

Object .assign (Object .setPrototypeOf (X3DSingleTextureNode .prototype, X3DTextureNode .prototype),
{
   initialize ()
   {
      X3DTextureNode .prototype .initialize .call (this);

      this ._textureProperties .addInterest ("set_textureProperties__", this, true);

      const gl = this .getBrowser () .getContext ();

      this .texture = gl .createTexture ();

      this .set_textureProperties__ (false);
   },
   getCount ()
   {
      return 1;
   },
   getTextureTypeString ()
   {
      switch (this .getTextureType ())
      {
         case 1:                // ImageTexture, MovieTexture (flipY)
         case 2: return "2D";   // PixelTexture
         case 3: return "3D";   // X3DTexture3DNode
         case 4: return "CUBE"; // X3DEnvironmentTextureNode
      }
   },
   getTexture ()
   {
      return this .texture;
   },
   setTexture (texture)
   {
      const gl = this .getBrowser () .getContext ();

      gl .deleteTexture (this .texture);

      this .texture = texture;

      this .addNodeEvent ();
   },
   isLinear ()
   {
      return this ._linear .getValue ();
   },
   setLinear (value)
   {
      if (!!value !== this ._linear .getValue ())
         this ._linear = value;
   },
   canMipMaps ()
   {
      return this .mipMaps;
   },
   setMipMaps (value)
   {
      this .mipMaps = value;
   },
   getMatrix ()
   {
      // Normally the identity matrix or a flipY matrix.
      return this .matrix;
   },
   isImageTransparent (data)
   {
      const length = data .length;

      for (let i = 3; i < length; i += 4)
      {
         if (data [i] !== 255)
            return true;
      }

      return false;
   },
   set_textureProperties__ (update)
   {
      if (this .texturePropertiesNode)
         this .texturePropertiesNode .removeInterest ("updateTextureParameters", this);

      this .texturePropertiesNode = X3DCast (X3DConstants .TextureProperties, this ._textureProperties)
         ?? this .getBrowser () .getDefaultTextureProperties ();

      this .texturePropertiesNode .addInterest ("updateTextureParameters", this);

      if (update)
         this .updateTextureParameters ();
   },
   updateTextureParameters (target, haveTextureProperties, textureProperties, width, height, repeatS, repeatT, repeatR)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (target, this .getTexture ());

      if (!haveTextureProperties && Math .max (width, height) < browser .getMinTextureSize ())
      {
         // Don't generate MipMaps.
         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      }
      else if (this .canMipMaps () && textureProperties ._generateMipMaps .getValue ())
      {
         // Can MipMaps and wants MipMaps.
         gl .generateMipmap (target);

         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter ()]);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter ()]);
      }
      else
      {
         // No MipMaps.
         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter (false)]);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter (false)]);
      }

      if (haveTextureProperties)
      {
         gl .texParameteri (target, gl .TEXTURE_WRAP_S, gl [textureProperties .getBoundaryModeS ()]);
         gl .texParameteri (target, gl .TEXTURE_WRAP_T, gl [textureProperties .getBoundaryModeT ()]);
         gl .texParameteri (target, gl .TEXTURE_WRAP_R, gl [textureProperties .getBoundaryModeR ()]);
      }
      else
      {
         gl .texParameteri (target, gl .TEXTURE_WRAP_S, repeatS ? gl .REPEAT : gl .CLAMP_TO_EDGE);
         gl .texParameteri (target, gl .TEXTURE_WRAP_T, repeatT ? gl .REPEAT : gl .CLAMP_TO_EDGE);
         gl .texParameteri (target, gl .TEXTURE_WRAP_R, repeatR ? gl .REPEAT : gl .CLAMP_TO_EDGE);
      }

      //gl .texParameterfv (target, gl .TEXTURE_BORDER_COLOR, textureProperties ._borderColor .getValue ());
      //gl .texParameterf  (target, gl .TEXTURE_PRIORITY,     textureProperties ._texturePriority .getValue ());

      const ext = browser .getAnisotropicExtension ();

      if (ext)
      {
         const max = gl .getParameter (ext .MAX_TEXTURE_MAX_ANISOTROPY_EXT);

         gl .texParameterf (target, ext .TEXTURE_MAX_ANISOTROPY_EXT, Algorithm .clamp (textureProperties ._anisotropicDegree .getValue (), 0, max));
      }
   },
   getTextureBits ()
   {
      return (this .isLinear () << 3) | this .getTextureType ();
   },
   updateTextureBits (textureBits, channel = 0)
   {
      textureBits .add (channel * 4, this .getTextureBits ());
   },
   getShaderOptions (options, name = 0, ext = false)
   {
      if (typeof name === "number")
      {
         options .push (`X3D_TEXTURE${name}_${this .getTextureTypeString ()}`);

         if (this .getTextureType () === 1)
            options .push (`X3D_TEXTURE${name}_FLIP_Y`);

         if (this .isLinear ())
            options .push (`X3D_TEXTURE${name}_LINEAR`);
      }
      else
      {
         ext = ext ? "_EXT" : "";

         options .push (`X3D_${name}_TEXTURE${ext}`, `X3D_${name}_TEXTURE${ext}_${this .getTextureTypeString ()}`);

         if (this .getTextureType () === 1)
            options .push (`X3D_${name}_TEXTURE${ext}_FLIP_Y`);

         if (this .isLinear ())
            options .push (`X3D_${name}_TEXTURE${ext}_LINEAR`);
      }
   },
   setNamedShaderUniforms (gl, shaderObject, renderObject, uniformStruct, mapping, textureTransformMapping, textureCoordinateMapping)
   {
      this .setShaderUniforms (gl, shaderObject, renderObject, uniformStruct);

      gl .uniform1i (uniformStruct .textureTransformMapping,  textureTransformMapping  .get (mapping) ?? 0);
      gl .uniform1i (uniformStruct .textureCoordinateMapping, textureCoordinateMapping .get (mapping) ?? 0);
   },
});

Object .defineProperties (X3DSingleTextureNode, X3DNode .getStaticProperties ("X3DSingleTextureNode", "Texturing", 1));

export default X3DSingleTextureNode;
