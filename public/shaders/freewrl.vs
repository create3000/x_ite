precision highp float;

in vec3 chromaticDispertion;
in float bias;
in float scale;
in float power;

varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main()
{
    vec3 normal = fw_Normal.xyz;
    mat3 mvm3=mat3(
	fw_ModelViewMatrix[0].x,
	fw_ModelViewMatrix[0].y,
	fw_ModelViewMatrix[0].z,
	fw_ModelViewMatrix[1].x,
	fw_ModelViewMatrix[1].y,
	fw_ModelViewMatrix[1].z,
	fw_ModelViewMatrix[2].x,
	fw_ModelViewMatrix[2].y,
	fw_ModelViewMatrix[2].z
    );

    vec3 fragNormal = mvm3*normal;
    gl_Position = fw_ProjectionMatrix * fw_ModelViewMatrix * fw_Vertex;
    vec3 incident = normalize((fw_ModelViewMatrix * fw_Vertex).xyz);
    t = reflect(incident, fragNormal)*mvm3;
    tr = refract(incident, fragNormal, chromaticDispertion.x)*mvm3;
    tg = refract(incident, fragNormal, chromaticDispertion.y)*mvm3;
    tb = refract(incident, fragNormal, chromaticDispertion.z)*mvm3;
    rfac = bias + scale * pow(0.5+0.5*dot(incident, fragNormal), power);
}
