precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 t;

void main()
{
    mat4 jwc_ModelViewMatrix = modelViewMatrix;
    mat4 jwc_ModelViewProjectionMatrix = modelViewProjectionMatrix;
    mat3 mvm3=mat3(
	jwc_ModelViewMatrix[0].x,
	jwc_ModelViewMatrix[0].y,
	jwc_ModelViewMatrix[0].z,
	jwc_ModelViewMatrix[1].x,
	jwc_ModelViewMatrix[1].y,
	jwc_ModelViewMatrix[1].z,
	jwc_ModelViewMatrix[2].x,
	jwc_ModelViewMatrix[2].y,
	jwc_ModelViewMatrix[2].z
    );

    vec3 fragNormal = mvm3*normal;
    gl_Position = jwc_ModelViewProjectionMatrix * vec4(position, 1.0);
    vec3 incident = normalize((jwc_ModelViewMatrix * vec4(position, 1.0)).xyz);
    t = reflect(incident, fragNormal)*mvm3;
}
