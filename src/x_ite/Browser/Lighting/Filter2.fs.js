import ToneMapping2 from "../../../assets/shaders/webgl2/pbr/ToneMapping2.glsl.js";
import Distribution from "./Distribution.js";

export default /* glsl */ `#version 300 es
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/2ae24a17aa5f65604b8cdb9f5c8029f7b3347cf4/source/shaders/ibl_filtering.frag
// https://github.com/KhronosGroup/glTF-Sample-Environments

precision highp float;
precision highp int;
precision highp samplerCube;

${ToneMapping2 ()}

${Object .entries (Distribution) .map (([name, value]) => `#define X3D_${name} ${value}`) .join ("\n")}

const float M_PI = 3.1415926535897932384626433832795;

uniform samplerCube x3d_TextureEXT;
uniform int         x3d_TextureSizeEXT;
uniform bool        x3d_TextureLinearEXT;
uniform int         x3d_CurrentFaceEXT;
uniform int         x3d_DistributionEXT;
uniform int         x3d_SampleCountEXT;
uniform float       x3d_RoughnessEXT;
uniform float       x3d_LodBiasEXT;
uniform float       x3d_IntensityEXT;

in vec2 texCoord; // [-1,1]
out vec4 x3d_FragColor;

// Hemisphere Sample

// TBN generates a tangent bitangent normal coordinate frame from the normal
// (the normal must be normalized)
mat3
generateTBN (const in vec3 normal)
{
   vec3 bitangent = vec3 (0.0, 1.0, 0.0);

   float NdotUp  = dot (normal, vec3 (0.0, 1.0, 0.0));
   float epsilon = 0.0000001;

   if (1.0 - abs (NdotUp) <= epsilon)
   {
      // Sampling +Y or -Y, so we need a more robust bitangent.
      if (NdotUp > 0.0)
         bitangent = vec3 (0.0, 0.0, 1.0);
      else
         bitangent = vec3 (0.0, 0.0, -1.0);
   }

   vec3 tangent = normalize (cross (bitangent, normal));

   bitangent = cross (normal, tangent);

   return mat3 (tangent, bitangent, normal);
}

struct MicrofacetDistributionSample
{
   float pdf;
   float cosTheta;
   float sinTheta;
   float phi;
};

// Hammersley Points on the Hemisphere
// CC BY 3.0 (Holger Dammertz)
// http://holger.dammertz.org/stuff/notes_HammersleyOnHemisphere.html
// with adapted interface
float
radicalInverse_VdC (in uint bits)
{
   bits = (bits << 16u) | (bits >> 16u);
   bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
   bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
   bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
   bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);

   return float (bits) * 2.3283064365386963e-10; // / 0x100000000
}

// hammersley2d describes a sequence of points in the 2d unit square [0,1)^2
// that can be used for quasi Monte Carlo integration
vec2
hammersley2d (const in int i, const in int N)
{
   return vec2 (float (i) /float (N), radicalInverse_VdC (uint (i)));
}

MicrofacetDistributionSample
Lambertian (const in vec2 xi, const in float roughness)
{
   MicrofacetDistributionSample lambertian;

   // Cosine weighted hemisphere sampling
   // http://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/2D_Sampling_with_Multidimensional_Transformations.html#Cosine-WeightedHemisphereSampling
   lambertian .cosTheta = sqrt (1.0 - xi .y);
   lambertian .sinTheta = sqrt (xi .y); // equivalent to sqrt(1.0 - cosTheta*cosTheta);
   lambertian .phi      = 2.0 * M_PI * xi .x;

   lambertian .pdf = lambertian .cosTheta / M_PI; // evaluation for solid angle, therefore drop the sinTheta

   return lambertian;
}

float
saturate (const in float v)
{
   return clamp (v, 0.0, 1.0);
}

float
D_GGX (const in float NdotH, const in float roughness)
{
   float a = NdotH * roughness;
   float k = roughness / (1.0 - NdotH * NdotH + a * a);

   return k * k * (1.0 / M_PI);
}

// GGX microfacet distribution
// https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html
// This implementation is based on https://bruop.github.io/ibl/,
//  https://www.tobias-franke.eu/log/2014/03/30/notes_on_importance_sampling.html
// and https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch20.html
MicrofacetDistributionSample
GGX (const in vec2 xi, const in float roughness)
{
   MicrofacetDistributionSample ggx;

   // evaluate sampling equations
   float alpha = roughness * roughness;

   ggx .cosTheta = saturate (sqrt ((1.0 - xi .y) / (1.0 + (alpha * alpha - 1.0) * xi .y)));
   ggx .sinTheta = sqrt (1.0 - ggx .cosTheta * ggx .cosTheta);
   ggx .phi      = 2.0 * M_PI * xi .x;

   // evaluate GGX pdf (for half vector)
   ggx.pdf = D_GGX (ggx .cosTheta, alpha);

   // Apply the Jacobian to obtain a pdf that is parameterized by l
   // see https://bruop.github.io/ibl/
   // Typically you'd have the following:
   // float pdf = D_GGX(NoH, roughness) * NoH / (4.0 * VoH);
   // but since V = N => VoH == NoH
   ggx .pdf /= 4.0;

   return ggx;
}

// NDF
float
D_Charlie (in float sheenRoughness, const in float NdotH)
{
    sheenRoughness = max (sheenRoughness, 0.000001); //clamp (0,1]

    float invR  = 1.0 / sheenRoughness;
    float cos2h = NdotH * NdotH;
    float sin2h = 1.0 - cos2h;

    return (2.0 + invR) * pow (sin2h, invR * 0.5) / (2.0 * M_PI);
}

MicrofacetDistributionSample
Charlie (const in vec2 xi, const in float roughness)
{
    MicrofacetDistributionSample charlie;

    float alpha = roughness * roughness;

    charlie .sinTheta = pow (xi .y, alpha / (2.0 * alpha + 1.0));
    charlie .cosTheta = sqrt (1.0 - charlie .sinTheta * charlie .sinTheta);
    charlie .phi      = 2.0 * M_PI * xi .x;

    // evaluate Charlie pdf (for half vector)
    charlie .pdf = D_Charlie (alpha, charlie .cosTheta);

    // Apply the Jacobian to obtain a pdf that is parameterized by l
    charlie .pdf /= 4.0;

    return charlie;
}

// getImportanceSample returns an importance sample direction with pdf in the .w component
vec4
getImportanceSample (const in int sampleIndex, const in vec3 N, const in float roughness)
{
   // generate a quasi monte carlo point in the unit square [0.1)^2
   vec2 xi = hammersley2d (sampleIndex, x3d_SampleCountEXT);

   MicrofacetDistributionSample importanceSample;

   // generate the points on the hemisphere with a fitting mapping for
   // the distribution (e.g. lambertian uses a cosine importance)
   switch (x3d_DistributionEXT)
   {
      case X3D_LAMBERTIAN:
      {
         importanceSample = Lambertian (xi, roughness);
         break;
      }
      case X3D_GGX:
      {
         // Trowbridge-Reitz / GGX microfacet model (Walter et al)
         // https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html
         importanceSample = GGX (xi, roughness);
         break;
      }
      case X3D_CHARLIE:
      {
         importanceSample = Charlie (xi, roughness);
         break;
      }
   }

   // transform the hemisphere sample to the normal coordinate frame
   // i.e. rotate the hemisphere to the normal direction
   vec3 localSpaceDirection = normalize (vec3 (
      importanceSample .sinTheta * cos (importanceSample .phi),
      importanceSample .sinTheta * sin (importanceSample .phi),
      importanceSample .cosTheta
   ));

   mat3 TBN       = generateTBN (N);
   vec3 direction = TBN * localSpaceDirection;

   return vec4 (direction, importanceSample .pdf);
}

// Mipmap Filtered Samples (GPU Gems 3, 20.4)
// https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-20-gpu-based-importance-sampling
// https://cgg.mff.cuni.cz/~jaroslav/papers/2007-sketch-fis/Final_sap_0073.pdf
float
computeLod (const in float pdf)
{
   // // Solid angle of current sample -- bigger for less likely samples
   // float omegaS = 1.0 / (float(FilterParameters.sampleCoun) * pdf);
   // // Solid angle of texel
   // // note: the factor of 4.0 * UX3D_MATH_PI
   // float omegaP = 4.0 * UX3D_MATH_PI / (6.0 * float(pFilterParameters.width) * float(pFilterParameters.width));
   // // Mip level is determined by the ratio of our sample's solid angle to a texel's solid angle
   // // note that 0.5 * log2 is equivalent to log4
   // float lod = 0.5 * log2(omegaS / omegaP);

   // babylon introduces a factor of K (=4) to the solid angle ratio
   // this helps to avoid undersampling the environment map
   // this does not appear in the original formulation by Jaroslav Krivanek and Mark Colbert
   // log4(4) == 1
   // lod += 1.0;

   // We achieved good results by using the original formulation from Krivanek & Colbert adapted to cubemaps

   // https://cgg.mff.cuni.cz/~jaroslav/papers/2007-sketch-fis/Final_sap_0073.pdf
   float lod = 0.5 * log2 (6.0 * float (x3d_TextureSizeEXT) * float (x3d_TextureSizeEXT) / (float (x3d_SampleCountEXT) * pdf));

   return lod;
}

vec3
filterColor (const in vec3 N)
{
   vec3  color  = vec3 (0.0);
   float weight = 0.0;

   for (int i = 0; i < x3d_SampleCountEXT; ++i)
   {
      vec4 importanceSample = getImportanceSample (i, N, x3d_RoughnessEXT);

      vec3  H   = importanceSample .xyz;
      float pdf = importanceSample .w;

      // mipmap filtered samples (GPU Gems 3, 20.4)
      float lod = computeLod (pdf);

      // apply the bias to the lod
      lod += x3d_LodBiasEXT;

      switch (x3d_DistributionEXT)
      {
         case X3D_LAMBERTIAN:
         {
            // sample lambertian at a lower resolution to avoid fireflies
            vec3 lambertian = textureLod (x3d_TextureEXT, H, lod) .rgb;

            if (!x3d_TextureLinearEXT)
               lambertian = sRGBToLinear (lambertian);

            //// the below operations cancel each other out
            // lambertian *= NdotH; // lamberts law
            // lambertian /= pdf; // invert bias from importance sampling
            // lambertian /= UX3D_MATH_PI; // convert irradiance to radiance https://seblagarde.wordpress.com/2012/01/08/pi-or-not-to-pi-in-game-lighting-equation/

            color += lambertian;
            break;
         }
         case X3D_GGX:
         case X3D_CHARLIE:
         {
            // Note: reflect takes incident vector.
            vec3  V     = N;
            vec3  L     = normalize (reflect (-V, H));
            float NdotL = dot (N, L);

            if (NdotL > 0.0)
            {
               if (x3d_RoughnessEXT == 0.0)
               {
                  // without this the roughness=0 lod is too high
                  lod = x3d_LodBiasEXT;
               }

               vec3 sampleColor = textureLod (x3d_TextureEXT, L, lod) .rgb;

               if (!x3d_TextureLinearEXT)
                  sampleColor = sRGBToLinear (sampleColor);

               color  += sampleColor * NdotL;
               weight += NdotL;
            }

            break;
         }
      }
   }

   // DEBUG:
   // return textureLod (x3d_TextureEXT, N, 0.0) .rgb;

   if(weight != 0.0f)
      color /= weight;
   else
      color /= float (x3d_SampleCountEXT);

   return color * x3d_IntensityEXT;
}

vec3
getNormal (const in int face, const in vec2 t)
{
   float x;
   float y;
   float z;

   switch (face)
   {
      case 0: // front
         x = t .x;
         y = -t .y;
         z = 1.0;
         break;
      case 1: // back
         x = -t .x;
         y = -t .y;
         z = -1.0;
         break;
      case 2: // right
         x = -1.0;
         y = -t .y;
         z = t .x;
         break;
      case 3: // left
         x = 1.0;
         y = -t .y;
         z = -t .x;
         break;
      case 4: // top
         x = t .x;
         y = 1.0;
         z = t .y;
         break;
      case 5: // bottom
         x = t .x;
         y = -1.0;
         z = -t .y;
         break;
   }

   return normalize (vec3 (x, y, z));
}

void
main ()
{
   vec3 normal = getNormal (x3d_CurrentFaceEXT, texCoord);

   x3d_FragColor = vec4 (filterColor (normal), 1.0);
}
`;
