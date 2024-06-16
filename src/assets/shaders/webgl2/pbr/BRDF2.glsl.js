export default /* glsl */ `
// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3
F_Schlick (vec3 f0, vec3 f90, float VdotH)
{
   return f0 + (f90 - f0) * pow (clamp (1.0 - VdotH, 0.0, 1.0), 5.0);
}

#if defined (X3D_LIGHTING)

const float M_PI = 3.1415926535897932384626433832795;

// Smith Joint GGX
// Note: Vis = G / (4 * NdotL * NdotV)
// see Eric Heitz. 2014. Understanding the Masking-Shadowing Function in Microfacet-Based BRDFs. Journal of Computer Graphics Techniques, 3
// see Real-Time Rendering. Page 331 to 336.
// see https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/geometricshadowing (specularg)
float
V_GGX (float NdotL, float NdotV, float alphaRoughness)
{
   float alphaRoughnessSq = alphaRoughness * alphaRoughness;

   float GGXV = NdotL * sqrt (NdotV * NdotV * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);
   float GGXL = NdotV * sqrt (NdotL * NdotL * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);

   float GGX = GGXV + GGXL;

   if (GGX > 0.0)
   {
      return 0.5 / GGX;
   }

   return 0.0;
}

// The following equation (s) model the distribution of microfacet normals across the area being drawn (aka D())
// Implementation from "Average Irregularity Representation of a Roughened Surface for Ray Reflection" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.
float
D_GGX (float NdotH, float alphaRoughness)
{
   float alphaRoughnessSq = alphaRoughness * alphaRoughness;
   float f                = (NdotH * NdotH) * (alphaRoughnessSq - 1.0) + 1.0;

   return alphaRoughnessSq / (M_PI * f * f);
}

//https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
vec3
BRDF_lambertian (vec3 f0, vec3 f90, vec3 diffuseColor, float specularWeight, float VdotH)
{
   // see https://seblagarde.wordpress.com/2012/01/08/pi-or-not-to-pi-in-game-lighting-equation/
   return (1.0 - specularWeight * F_Schlick (f0, f90, VdotH)) * (diffuseColor / M_PI);
}

//  https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
vec3
BRDF_specularGGX (vec3 f0, vec3 f90, float alphaRoughness, float specularWeight, float VdotH, float NdotL, float NdotV, float NdotH)
{
   vec3  F   = F_Schlick (f0, f90, VdotH);
   float Vis = V_GGX (NdotL, NdotV, alphaRoughness);
   float D   = D_GGX (NdotH, alphaRoughness);

   return specularWeight * F * Vis * D;
}

#if defined (X3D_ANISOTROPY_MATERIAL_EXT)
// GGX Distribution Anisotropic (Same as Babylon.js)
// https://blog.selfshadow.com/publications/s2012-shading-course/burley/s2012_pbs_disney_brdf_notes_v3.pdf Addenda
float
D_GGX_anisotropic (float NdotH, float TdotH, float BdotH, float anisotropy, float at, float ab)
{
   float a2 = at * ab;
   vec3  f  = vec3 (ab * TdotH, at * BdotH, a2 * NdotH);
   float w2 = a2 / dot (f, f);

   return a2 * w2 * w2 / M_PI;
}

// GGX Mask/Shadowing Anisotropic (Same as Babylon.js - smithVisibility_GGXCorrelated_Anisotropic)
// Heitz http://jcgt.org/published/0003/02/03/paper.pdf
float
V_GGX_anisotropic (float NdotL, float NdotV, float BdotV, float TdotV, float TdotL, float BdotL, float at, float ab)
{
   float GGXV = NdotL * length (vec3 (at * TdotV, ab * BdotV, NdotV));
   float GGXL = NdotV * length (vec3 (at * TdotL, ab * BdotL, NdotL));
   float v    = 0.5 / (GGXV + GGXL);

   return clamp (v, 0.0, 1.0);
}

vec3
BRDF_specularGGXAnisotropy (vec3 f0, vec3 f90, float alphaRoughness, float anisotropy, vec3 n, vec3 v, vec3 l, vec3 h, vec3 t, vec3 b)
{
   // Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
   float at = mix (alphaRoughness, 1.0, anisotropy * anisotropy);
   float ab = clamp (alphaRoughness, 0.001, 1.0);

   float NdotL = clamp (dot (n, l), 0.0, 1.0);
   float NdotH = clamp (dot (n, h), 0.001, 1.0);
   float NdotV = dot (n, v);
   float VdotH = clamp (dot (v, h), 0.0, 1.0);

   float V = V_GGX_anisotropic (NdotL, NdotV, dot (b, v), dot (t, v), dot (t, l), dot (b, l), at, ab);
   float D = D_GGX_anisotropic (NdotH, dot (t, h), dot (b, h), anisotropy, at, ab);

   vec3 F = F_Schlick (f0, f90, VdotH);

   return F * V * D;
}
#endif

#if defined (X3D_SHEEN_MATERIAL_EXT)
float
lambdaSheenNumericHelper (const in float x, const in float alphaG)
{
   float oneMinusAlphaSq = (1.0 - alphaG) * (1.0 - alphaG);

   float a = mix ( 21.5473,  25.3245, oneMinusAlphaSq);
   float b = mix ( 3.82987,  3.32435, oneMinusAlphaSq);
   float c = mix ( 0.19823,  0.16801, oneMinusAlphaSq);
   float d = mix (-1.97760, -1.27393, oneMinusAlphaSq);
   float e = mix (-4.32054, -4.85967, oneMinusAlphaSq);

   return a / (1.0 + b * pow (x, c)) + d * x + e;
}

float
lambdaSheen (const in float cosTheta, const in float alphaG)
{
   if (abs (cosTheta) < 0.5)
      return exp (lambdaSheenNumericHelper (cosTheta, alphaG));
   else
      return exp (2.0 * lambdaSheenNumericHelper (0.5, alphaG) - lambdaSheenNumericHelper (1.0 - cosTheta, alphaG));
}

float
V_Sheen (const in float NdotL, const in float NdotV, in float sheenRoughness)
{
   sheenRoughness = max (sheenRoughness, 0.000001); //clamp (0,1]

   float alphaG = sheenRoughness * sheenRoughness;

   return clamp (1.0 / ((1.0 + lambdaSheen (NdotV, alphaG) + lambdaSheen (NdotL, alphaG)) * (4.0 * NdotV * NdotL)), 0.0, 1.0);
}

//Sheen implementation-------------------------------------------------------------------------------------
// See  https://github.com/sebavan/glTF/tree/KHR_materials_sheen/extensions/2.0/Khronos/KHR_materials_sheen

// Estevez and Kulla http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
float
D_Charlie (in float sheenRoughness, const in float NdotH)
{
    sheenRoughness = max (sheenRoughness, 0.000001); //clamp (0,1]

    float alphaG = sheenRoughness * sheenRoughness;
    float invR   = 1.0 / alphaG;
    float cos2h  = NdotH * NdotH;
    float sin2h  = 1.0 - cos2h;

    return (2.0 + invR) * pow (sin2h, invR * 0.5) / (2.0 * M_PI);
}

vec3
BRDF_specularSheen (const in vec3 sheenColor, const in float sheenRoughness, const in float NdotL, const in float NdotV, const in float NdotH)
{
   float sheenDistribution = D_Charlie (sheenRoughness, NdotH);
   float sheenVisibility   = V_Sheen (NdotL, NdotV, sheenRoughness);

   return sheenColor * sheenDistribution * sheenVisibility;
}
#endif

#endif
`;
