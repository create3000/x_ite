precision highp float;

varying vec3 viewDirection;
varying vec3 normalDirection;
uniform samplerCube cube;
uniform vec3 chromaticDispertion;
uniform float bias;
uniform float scale;
uniform float power;

void main()
{
    vec3 fragNormal = normalize(normalDirection);
    vec3 reflectedDirection = reflect(viewDirection, fragNormal);
    
    
    vec3 redDirection = refract(viewDirection, fragNormal, chromaticDispertion.x);
    vec3 greenDirection = refract(viewDirection, fragNormal, chromaticDispertion.y);
    vec3 blueDirection = refract(viewDirection, fragNormal, chromaticDispertion.z);
    float red = textureCube(cube, redDirection).r;
    float green = textureCube(cube, greenDirection).g;
    float blue = textureCube(cube, greenDirection).b;
    
    
    vec4 reflectedColor = textureCube(cube, reflectedDirection);
    gl_FragColor = reflectedColor;
    /*
    vec4 refractedColor = vec4(red, green, blue, 1.0);
    gl_FragColor = refractedColor;
    */
}
