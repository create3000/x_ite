precision highp float;

varying vec3 viewDirection;
varying vec3 normalDirection;
uniform samplerCube cube;

varying vec3 t;
varying vec3 tr;
varying vec3 tg;
varying vec3 tb;
varying float rfac;

void main()
{
    vec3 fragNormal = normalize(normalDirection);
    vec3 reflectedDirection = reflect(viewDirection, fragNormal);
    vec4 reflectedColor = textureCube(cube, reflectedDirection);
    vec4 refractedColor = vec4(1.0);
    refractedColor.r = textureCube(cube, tr).r;
    refractedColor.g = textureCube(cube, tg).g;
    refractedColor.b = textureCube(cube, tb).b;
    /*
    gl_FragColor = reflectedColor;
    */
    gl_FragColor = refractedColor * rfac + reflectedColor * (1.0 - rfac);
}

