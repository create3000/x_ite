vec4
texelFetch (const in sampler2D sampler, const in int index, const in int lod)
{
   int   x = textureSize (sampler, lod) .x;
   ivec2 p = ivec2 (index % x, index / x);
   vec4  t = texelFetch (sampler, p, lod);

   return t;
}

int
upperBound (const in sampler2D sampler, in int count, const in float value)
{
   int first = 0;
   int step  = 0;

   while (count > 0)
   {
      int index = first;

      step = count >> 1;

      index += step;

      if (value < texelFetch (sampler, index, 0) .x)
      {
         count = step;
      }
      else
      {
         first  = ++ index;
         count -= step + 1;
      }
   }

   return first;
}

void
interpolate (const in sampler2D sampler, const in int count, const in float fraction, out int index0)
{
   // Determine index0.

   if (count == 1 || fraction <= texelFetch (sampler, 0, 0) .x)
   {
      index0 = 0;
   }
   else if (fraction >= texelFetch (sampler, count - 1, 0) .x)
   {
      index0 = count - 2;
   }
   else
   {
      int index = upperBound (sampler, count, fraction);

      if (index < count)
         index0 = index - 1;
      else
         index0 = 0;
   }
}

vec4
getTexCoord (const in int i, const in int factor, const in float lifetime, const in float elapsedTime, const in vec4 defaultTexCoord)
{
   if (numTexCoords == 0)
   {
      return defaultTexCoord;
   }
   else
   {
      float fraction = elapsedTime / lifetime;
      int   index0   = 0;

      interpolate (texCoordRamp, numTexCoords, fraction, index0);

      return texelFetch (texCoordRamp, numTexCoords + index0 * factor + i, 0);
   }
}
