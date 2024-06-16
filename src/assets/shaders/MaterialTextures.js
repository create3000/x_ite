export default
{
   names: [
      "x3d_AmbientTexture",
      "x3d_DiffuseTexture",
      "x3d_SpecularTexture",
      "x3d_EmissiveTexture",
      "x3d_ShininessTexture",
      "x3d_BaseTexture",
      "x3d_MetallicRoughnessTexture",
      "x3d_OcclusionTexture",
      "x3d_NormalTexture",
      "x3d_AnisotropyTextureEXT",
      "x3d_ClearcoatTextureEXT",
      "x3d_ClearcoatRoughnessTextureEXT",
      "x3d_ClearcoatNormalTextureEXT",
      "x3d_SheenColorTextureEXT",
      "x3d_SheenRoughnessTextureEXT",
      "x3d_SpecularTextureEXT",
      "x3d_SpecularColorTextureEXT",
   ],
   texture (name, components = "rgba", colorspace = "")
   {
      const ext = !!name .match (/EXT$/);

      name = name .replace (/EXT$/, "");

      const
         type   = ["", "float", "vec2", "vec3", "vec4"] [components .length],
         define = name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase (),
          EXT   = ext ?  "EXT" : "",
         _EXT   = ext ? "_EXT" : "";

      return /* glsl */ `

      #if defined (${define}${_EXT})

      uniform ${name}Parameters${EXT} ${name}${EXT};

      ${type}
      get${name .replace (/^x3d_/g, "")}${EXT} ()
      {
         // Get texture color.

         vec3 texCoord = getTexCoord (${name}${EXT} .textureTransformMapping, ${name}${EXT} .textureCoordinateMapping);

         #if defined (${define}${_EXT}_FLIP_Y)
            texCoord .t = 1.0 - texCoord .t;
         #endif

         #if __VERSION__ == 100
            #if defined (${define}${_EXT}_2D)
               vec4 textureColor = texture2D (${name}${EXT} .texture2D, texCoord .st);
            #elif defined (${define}${_EXT}_CUBE)
               vec4 textureColor = textureCube (${name}${EXT} .textureCube, texCoord);
            #endif
         #else
            #if defined (${define}${_EXT}_2D)
               vec4 textureColor = texture (${name}${EXT} .texture2D, texCoord .st);
            #elif defined (${define}${_EXT}_3D)
               vec4 textureColor = texture (${name}${EXT} .texture3D, texCoord);
            #elif defined (${define}${_EXT}_CUBE)
               vec4 textureColor = texture (${name}${EXT} .textureCube, texCoord);
            #endif
         #endif

         ${type} textureColorComponents = textureColor .${components};

         #if defined (${define}${_EXT}_LINEAR)
            #if ${colorspace === "sRGB" ? 1 : 0}
               textureColorComponents = linearTosRGB (textureColorComponents);
            #endif
         #else
            #if ${colorspace === "linear" ? 1 : 0}
               textureColorComponents = sRGBToLinear (textureColorComponents);
            #endif
         #endif

         return textureColorComponents;
      }
      #endif
      `;
   },
   structs ()
   {
      return this .names .map (name =>
      {
         const define = name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase ();

         return /* glsl */ `
         #if defined (${define})
         struct ${name .replace (/(EXT)?$/, "Parameters$1")}
         {
            mediump int         textureTransformMapping;
            mediump int         textureCoordinateMapping;
            #if defined (${define}_2D)
            mediump sampler2D   texture2D;
            #endif
            #if defined (${define}_3D) && __VERSION__ != 100
            mediump sampler3D   texture3D;
            #endif
            #if defined (${define}_CUBE)
            mediump samplerCube textureCube;
            #endif
         };
         #endif

         //uniform x3d_AmbientTextureParameters x3d_AmbientTexture;

         `;
      }) .join ("\n");
   }
};
