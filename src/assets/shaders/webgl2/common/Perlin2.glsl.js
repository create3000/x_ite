export default () => /* glsl */ `
//https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

float rand (const in vec2 co) { return fract (sin (dot (co.xy, vec2 (12.9898,78.233))) * 43758.5453); }
float rand (const in vec2 co, const in float l) { return rand (vec2 (rand (co), l)); }
float rand (const in vec2 co, const in float l, const in float t) { return rand (vec2 (rand (co, l), t)); }

float
perlin (const in vec2 p, const in float dim, const in float time)
{
   const float M_PI = 3.14159265358979323846;

   vec2 pos   = floor (p * dim);
   vec2 posx  = pos + vec2 (1.0, 0.0);
   vec2 posy  = pos + vec2 (0.0, 1.0);
   vec2 posxy = pos + vec2 (1.0);

   float c   = rand (pos,   dim, time);
   float cx  = rand (posx,  dim, time);
   float cy  = rand (posy,  dim, time);
   float cxy = rand (posxy, dim, time);

   vec2 d = fract (p * dim);

   d = -0.5 * cos (d * M_PI) + 0.5;

   float ccx    = mix (c,   cx,    d.x);
   float cycxy  = mix (cy,  cxy,   d.x);
   float center = mix (ccx, cycxy, d.y);

   return center * 2.0 - 1.0;
}

vec3
perlin (const in vec3 p)
{
   return vec3 (perlin (p.xy, 1.0, 0.0),
                perlin (p.yz, 1.0, 0.0),
                perlin (p.zx, 1.0, 0.0));
}
`;
