#version 300 es
precision highp float;

uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_ProjectionMatrix;
in vec4 x3d_Vertex;

vec4 ftransform() {
	return vec4 (x3d_ProjectionMatrix*x3d_ModelViewMatrix*x3d_Vertex);
}
#define gl_ModelViewProjectionMatrix (x3d_ProjectionMatrix*x3d_ModelViewMatrix)
#define HEADLIGHT_LIGHT (MAX_LIGHTS-1)
#define gl_NormalMatrix x3d_NormalMatrix
#define gl_ProjectionMatrix x3d_ProjectionMatrix
#define gl_ModelViewMatrix x3d_ModelViewMatrix
#define gl_Vertex x3d_Vertex
#define gl_Normal x3d_Normal
#define gl_LightSource x3d_LightSource

in vec3 position;
in vec3 normal;
in vec2 texcoord;

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;
uniform float a;
uniform float b;
uniform float c;
uniform float d;
uniform float tdelta;
uniform float pdelta;

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
     
vec3 rose(vec3 p) {
     float rho = a + b * cos(c * p.y + tdelta) * cos(d * p.z + pdelta);
     float x = rho * cos(p.z) * cos(p.y);
     float z = rho * cos(p.z) * sin(p.y);
     float y = rho * sin(p.z);
     return vec3(x, y, z);
}

vec3 rose_normal(vec3 p) {
     /* convert cartesian position to spherical coordinates */
     vec3 base = cart2sphere(p);
     /* add a little to phi */
     vec3 td = base + vec3(0.0, 0.0001, 0.0);
     /* add a little to theta */
     vec3 pd = base + vec3(0.0, 0.0, 0.0001);

     /* convert back to cartesian coordinates */
     vec3 br = rose(base);
     vec3 bt = rose(td);
     vec3 bp = rose(pd);

     return normalize(cross(bt - br, bp - br));
}

vec4 rose_position(vec3 p) {
	return vec4(rose(cart2sphere(p)), 1.0);
	/*return vec4(position, 1.0);*/
}

void main()
{
    mat3 mvm3=mat3(
	gl_ModelViewMatrix[0].x,
	gl_ModelViewMatrix[0].y,
	gl_ModelViewMatrix[0].z,
	gl_ModelViewMatrix[1].x,
	gl_ModelViewMatrix[1].y,
	gl_ModelViewMatrix[1].z,
	gl_ModelViewMatrix[2].x,
	gl_ModelViewMatrix[2].y,
	gl_ModelViewMatrix[2].z
    );
    gl_Position = gl_ModelViewProjectionMatrix * rose_position(position);

    vec3 fragNormal = mvm3*rose_normal(position);
    vec3 incident = normalize((gl_ModelViewMatrix * rose_position(position)).xyz);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
