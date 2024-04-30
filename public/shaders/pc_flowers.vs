precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord;

uniform mat4 matrix_viewProjection;
uniform mat4 matrix_view;

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

varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

vec3 cart2sphere(vec3 p) {
     float r = pow(p.x*p.x + p.y*p.y + p.z*p.z, 0.5);
     float theta = acos(p.z/r);
     float phi = atan(p.y, p.x);
     return vec3(r, theta, phi);
}
     
vec3 rose(vec3 p) {
     float rho = a + b * cos(c * p.y + tdelta) * cos(d * p.z + pdelta);
     float x = rho * cos(p.z) * cos(p.y);
     float y = rho * cos(p.z) * sin(p.y);
     float z = rho * sin(p.z);
     return vec3(x, y, z);
}

vec3 rose_normal(vec3 p) {
     /* convert cartesian position to spherical coordinates */
     vec3 base = cart2sphere(p);
     /* add a little to phi */
     vec3 td = base + vec3(0.0, 0.01, 0.0);
     /* add a little to theta */
     vec3 pd = base + vec3(0.0, 0.0, 0.01);

     /* convert back to cartesian coordinates */
     vec3 br = rose(base);
     vec3 bt = rose(td);
     vec3 bp = rose(pd);

     return normalize(cross(bt - br, bp - br));
}

void main()
{
    mat3 mvm3=mat3(
                matrix_view[0].x,
                matrix_view[0].y,
                matrix_view[0].z,
                matrix_view[1].x,
                matrix_view[1].y,
                matrix_view[1].z,
                matrix_view[2].x,
                matrix_view[2].y,
                matrix_view[2].z
    );
    gl_Position = matrix_viewProjection*vec4(rose(cart2sphere(position)), 1.0);
    vec3 incident = normalize((matrix_view * vec4(rose(cart2sphere(position)), 1.0)).xyz);

    vec3 fragNormal = mvm3*rose_normal(position);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;

    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
