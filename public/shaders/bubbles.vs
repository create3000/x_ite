precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelViewMatrixInverse;
uniform mat4 normalMatrix;

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
    mat3 mvm3=mat3(
		modelViewMatrix[0].x,
		modelViewMatrix[0].y,
		modelViewMatrix[0].z,
		modelViewMatrix[1].x,
		modelViewMatrix[1].y,
		modelViewMatrix[1].z,
		modelViewMatrix[2].x,
		modelViewMatrix[2].y,
		modelViewMatrix[2].z
    );
    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);

    vec3 fragNormal = mvm3*normal;
    vec3 incident = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
