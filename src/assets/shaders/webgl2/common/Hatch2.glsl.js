export default () => /* glsl */ `
#if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)

uniform x3d_FillPropertiesParameters x3d_FillProperties;

vec4
getHatchColor (vec4 color)
{
   vec4 finalColor = x3d_FillProperties .filled ? color : vec4 (0.0);

   #if defined (X3D_STYLE_PROPERTIES_TEXTURE)
      vec2 t = gl_FragCoord .xy / (32.0 * x3d_FillProperties .scale);

      #if __VERSION__ == 100
         vec4 hatch = texture2D (x3d_FillProperties .texture, vec2 (t .x, 1.0 - t .y));
      #else
         vec4 hatch = texture (x3d_FillProperties .texture, vec2 (t .x, 1.0 - t .y));
      #endif

      hatch .rgb *= x3d_FillProperties .hatchColor;
      finalColor  = mix (finalColor, hatch, hatch .a);
   #endif

   return finalColor;
}

#endif
`;
