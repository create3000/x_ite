export default () => /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/iridescence.glsl

#if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
// XYZ to sRGB color space
const mat3 XYZ_TO_REC709 = mat3 (
     3.2404542, -0.9692660,  0.0556434,
    -1.5371385,  1.8760108, -0.2040259,
    -0.4985314,  0.0415560,  1.0572252
);

float
sq (const in float v)
{
    return v * v;
}

vec3
sq (const in vec3 v)
{
    return v * v;
}

// Assume air interface for top
// Note: We don't handle the case fresnel0 == 1
vec3
Fresnel0ToIor (const in vec3 fresnel0)
{
    vec3 sqrtF0 = sqrt (fresnel0);

    return (vec3 (1.0) + sqrtF0) / (vec3 (1.0) - sqrtF0);
}

// Conversion FO/IOR
vec3
IorToFresnel0 (const in vec3 transmittedIor, const in float incidentIor)
{
    return sq ((transmittedIor - vec3 (incidentIor)) / (transmittedIor + vec3 (incidentIor)));
}

// ior is a value between 1.0 and 3.0. 1.0 is air interface
float
IorToFresnel0 (const in float transmittedIor, const in float incidentIor)
{
    return sq ((transmittedIor - incidentIor) / (transmittedIor + incidentIor));
}

// Fresnel equations for dielectric/dielectric interfaces.
// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
// Evaluation XYZ sensitivity curves in Fourier space
vec3
evalSensitivity (const in float OPD, const in vec3 shift)
{
    float phase = 2.0 * M_PI * OPD * 1.0e-9;
    vec3  val   = vec3 (5.4856e-13, 4.4201e-13, 5.2481e-13);
    vec3  pos   = vec3 (1.6810e+06, 1.7953e+06, 2.2084e+06);
    vec3  var   = vec3 (4.3278e+09, 9.3046e+09, 6.6121e+09);

    vec3 xyz = val * sqrt (2.0 * M_PI * var) * cos (pos * phase + shift) * exp (-sq (phase) * var);

    xyz.x += 9.7470e-14 * sqrt (2.0 * M_PI * 4.5282e+09) * cos (2.2399e+06 * phase + shift [0]) * exp (-4.5282e+09 * sq (phase));
    xyz   /= 1.0685e-7;

    vec3 srgb = XYZ_TO_REC709 * xyz;

    return srgb;
}

vec3
evalIridescence (const in float outsideIOR, const in float eta2, const in float cosTheta1, const in float thinFilmThickness, const in vec3 baseF0)
{
    vec3 I;

    // Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
    float iridescenceIor = mix (outsideIOR, eta2, smoothstep (0.0, 0.03, thinFilmThickness));
    // Evaluate the cosTheta on the base layer (Snell law)
    float sinTheta2Sq = sq (outsideIOR / iridescenceIor) * (1.0 - sq (cosTheta1));

    // Handle TIR:
    float cosTheta2Sq = 1.0 - sinTheta2Sq;

    if (cosTheta2Sq < 0.0)
        return vec3 (1.0);

    float cosTheta2 = sqrt (cosTheta2Sq);

    // First interface
    float R0    = IorToFresnel0 (iridescenceIor, outsideIOR);
    float R12   = F_Schlick (R0, cosTheta1);
    float R21   = R12;
    float T121  = 1.0 - R12;
    float phi12 = 0.0;

    if (iridescenceIor < outsideIOR)
        phi12 = M_PI;

    float phi21 = M_PI - phi12;

    // Second interface
    vec3 baseIOR = Fresnel0ToIor (clamp (baseF0, 0.0, 0.9999)); // guard against 1.0
    vec3 R1      = IorToFresnel0 (baseIOR, iridescenceIor);
    vec3 R23     = F_Schlick (R1, cosTheta2);
    vec3 phi23   = vec3 (0.0);

    if (baseIOR [0] < iridescenceIor) phi23 [0] = M_PI;
    if (baseIOR [1] < iridescenceIor) phi23 [1] = M_PI;
    if (baseIOR [2] < iridescenceIor) phi23 [2] = M_PI;

    // Phase shift
    float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
    vec3  phi = vec3 (phi21) + phi23;

    // Compound terms
    vec3 R123 = clamp (R12 * R23, 1e-5, 0.9999);
    vec3 r123 = sqrt (R123);
    vec3 Rs   = sq (T121) * R23 / (vec3 (1.0) - R123);

    // Reflectance term for m = 0 (DC term amplitude)
    vec3 C0 = R12 + Rs;

    I = C0;

    // Reflectance term for m > 0 (pairs of diracs)
    vec3 Cm = Rs - T121;

    for (int m = 1; m <= 2; ++ m)
    {
        Cm *= r123;

        vec3 Sm = 2.0 * evalSensitivity (float (m) * OPD, float (m) * phi);

        I += Cm * Sm;
    }

    // Since out of gamut colors might be produced, negative color values are clamped to 0.
    return max (I, vec3 (0.0));
}
#endif
`;
