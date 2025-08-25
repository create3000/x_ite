export default () => /* glsl */ `
#if defined (X3D_CLIP_PLANES)

uniform vec4 x3d_ClipPlane [X3D_NUM_CLIP_PLANES];

void
clip ()
{
   for (int i = 0; i < X3D_NUM_CLIP_PLANES; ++ i)
   {
      if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
         discard;
   }
}

#endif
`;
