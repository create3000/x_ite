#version 300 es
precision highp float;

uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat3 x3d_NormalMatrix;

in mat4 x3d_ParticleMatrix;
in vec4 x3d_Particle;

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

in vec3 x3d_Normal;
in vec4 x3d_Vertex;

uniform float [6] x3d_ParticleValues;

out vec3 t;
out vec3 tr;
out vec3 tg;
out vec3 tb;
out float rfac;

vec3 cart2sphere(vec3 p) {
     float r = pow(p.x*p.x + p.y*p.y + p.z*p.z, 0.5);
     float theta = acos(p.y/r);
     float phi = atan(p.z, p.x);
     return vec3(r, theta, phi);
}
     
vec3 rose(vec3 p, float[6] values) {
     float a = values[0];
     float b = values[1];
     float c = values[2];
     float d = values[3];
     float tdelta = values[4];
     float pdelta = values[5];

     float rho = a + b * cos(c * p.y + tdelta) * cos(d * p.z + pdelta);
     float x = rho * cos(p.z) * cos(p.y);
     float z = rho * cos(p.z) * sin(p.y);
     float y = rho * sin(p.z);
     return vec3(x, y, z);
}

vec3 rose_normal(vec3 p, float[6] values) {
     /* convert cartesian position to spherical coordinates */
     vec3 base = cart2sphere(p);
     /* add a little to phi */
     vec3 td = base + vec3(0.0, 0.0001, 0.0);
     /* add a little to theta */
     vec3 pd = base + vec3(0.0, 0.0, 0.0001);

     /* convert back to cartesian coordinates */
     vec3 br = rose(base, values);
     vec3 bt = rose(td, values);
     vec3 bp = rose(pd, values);

     return normalize(cross(bt - br, bp - br));
}

vec4 rose_position(vec3 p, float[6] values) {
	return vec4(rose(cart2sphere(p), values), 1.0);
	/*return vec4(position, 1.0);*/
}

void main()
{
  float [6] values = x3d_ParticleValues;
  vec3 position = x3d_Vertex.xyz;

  vec3 fragNormal = normalize(x3d_NormalMatrix*rose_normal(position, values));
  vec3 incident = normalize((x3d_ModelViewMatrix * rose_position(position, values)).xyz);

  t    = reflect (incident, fragNormal) * x3d_NormalMatrix;
  tr   = refract (incident, fragNormal, chromaticDispertion .x) * x3d_NormalMatrix;
  tg   = refract (incident, fragNormal, chromaticDispertion .y) * x3d_NormalMatrix;
  tb   = refract (incident, fragNormal, chromaticDispertion .z) * x3d_NormalMatrix;
  rfac = bias + scale * pow (clamp (0.5 + 0.5 * dot (incident, fragNormal), 0.0, 1.0), power);

  gl_Position = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_ParticleMatrix * rose_position(position, values);
}
