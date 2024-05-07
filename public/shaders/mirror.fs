precision highp float;

uniform samplerCube cube;

varying vec3 t;

void main()
{
    gl_FragColor = textureCube(cube, t);
}
