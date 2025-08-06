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
   ],
   add (name)
   {
      this .names .push (name);
   },
   texture (name, components = "rgba", colorSpace = "")
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

         #if defined (${define}${_EXT}_FLIP_Y)
            vec2 flipY = vec2 (-1.0, 1.0);
         #else
            vec2 flipY = vec2 (1.0, 0.0);
         #endif

         vec3 texCoord = getTexCoord (${name}${EXT} .textureTransformMapping, ${name}${EXT} .textureCoordinateMapping, flipY);

         #if defined (${define}${_EXT}_2D)
            vec4 textureColor = texture (${name}${EXT} .texture2D, texCoord .st);
         #elif defined (${define}${_EXT}_3D)
            vec4 textureColor = texture (${name}${EXT} .texture3D, texCoord);
         #elif defined (${define}${_EXT}_CUBE)
            vec4 textureColor = texture (${name}${EXT} .textureCube, texCoord);
         #endif

         ${type} textureColorComponents = textureColor .${components};

         #if defined (X3D_COLORSPACE_SRGB)
            #if defined (${define}${_EXT}_LINEAR)
               #if ${colorSpace === "sRGB" || colorSpace === "linear" ? 1 : 0}
                  textureColorComponents = linearToSRGB (textureColorComponents);
               #endif
            #endif
         #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
            #if defined (${define}${_EXT}_LINEAR)
               #if ${colorSpace === "sRGB" ? 1 : 0}
                  textureColorComponents = linearToSRGB (textureColorComponents);
               #endif
            #else
               #if ${colorSpace === "linear" ? 1 : 0}
                  textureColorComponents = sRGBToLinear (textureColorComponents);
               #endif
            #endif
         #elif defined (X3D_COLORSPACE_LINEAR)
            #if !defined (${define}${_EXT}_LINEAR)
               #if ${colorSpace === "sRGB" || colorSpace === "linear" ? 1 : 0}
                  textureColorComponents = sRGBToLinear (textureColorComponents);
               #endif
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
            #if defined (${define}_3D)
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
