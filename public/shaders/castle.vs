uniform mat4 castle_ModelViewMatrix;
uniform mat4 castle_ProjectionMatrix;
uniform mat3 castle_NormalMatrix;
attribute vec4 castle_Vertex;
attribute vec3 castle_Normal;

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
    vec3 normal = castle_Normal.xyz;
    mat3 mvm3=mat3(
	castle_ModelViewMatrix[0].x,
	castle_ModelViewMatrix[0].y,
	castle_ModelViewMatrix[0].z,
	castle_ModelViewMatrix[1].x,
	castle_ModelViewMatrix[1].y,
	castle_ModelViewMatrix[1].z,
	castle_ModelViewMatrix[2].x,
	castle_ModelViewMatrix[2].y,
	castle_ModelViewMatrix[2].z
    );

    vec3 fragNormal = mvm3*normal;
    gl_Position = castle_ProjectionMatrix * castle_ModelViewMatrix * castle_Vertex;
    vec3 incident = normalize((castle_ModelViewMatrix * castle_Vertex).xyz);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
