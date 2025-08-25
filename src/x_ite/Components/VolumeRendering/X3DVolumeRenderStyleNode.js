import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DVolumeRenderStyleNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DVolumeRenderStyleNode);

   this .volumeDataNodes = new Set ();
}

Object .assign (Object .setPrototypeOf (X3DVolumeRenderStyleNode .prototype, X3DNode .prototype),
{
   addShaderFields (shaderNode)
   { },
   getDefines ()
   { },
   getUniformsText ()
   {
      return "";
   },
   getFunctionsText ()
   {
      return "";
   },
   getVolumeData ()
   {
      return this .volumeDataNodes;
   },
   addVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .add (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .delete (volumeDataNode);
   },
   getNormalText (surfaceNormalsNode)
   {
      let string = "";

      if (surfaceNormalsNode)
      {
         string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec3 n = texture (surfaceNormals_" + this .getId () + ", texCoord) .xyz * 2.0 - 1.0;\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }
      else
      {
         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         string += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         string += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         string += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         string += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         string += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         string += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         string += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }

      return string;
   },
});

Object .defineProperties (X3DVolumeRenderStyleNode, X3DNode .getStaticProperties ("X3DVolumeRenderStyleNode", "VolumeRendering", 1));

export default X3DVolumeRenderStyleNode;
