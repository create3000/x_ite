precision highp float;

uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main()
{
    vec3 normal = gl_Normal.xyz;
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

    vec3 fragNormal = mvm3*normal;
    gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
    vec3 incident = normalize((gl_ModelViewMatrix * gl_Vertex).xyz);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
