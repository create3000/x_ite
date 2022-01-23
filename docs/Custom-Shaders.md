# Custom Shaders

## Overview

When you display your 3D models with X\_ITE, by default it will use the Gouraud shader. This is a versatile shader that can cover a lot of your rendering needs. If this is not enough there is also a Phong shader available, adjustable with the browser shading option per scripting.

However, you will often want to perform special effects or special cases for your materials. To do this you will need to write a custom shader.

## Example

[![Shader Example](https://create3000.github.io/media/images/water-quality.png)](https://create3000.github.io/media/examples/X3D/WaterQuality/example.html)

[View scene in this window.](https://create3000.github.io/media/examples/X3D/WaterQuality/example.html)

## Shaders and Shader Definition

WebGL uses the GLSL language to write shaders that can be run across all browsers. With X\_ITE you create your own shader using ComposedShader and ShaderPart nodes and than attach the ComposedShader to the *shader* field of an Appearance node and that is a child''s play with Titania.

### X3D

```js
#X3D V3.3 utf8

DEF Timer TimeSensor {
  loop TRUE
}

Transform {
  children Shape {
    appearance Appearance {
      material ImageTexture {
        url "image.png"
      }
      shaders DEF Shader ComposedShader {
        inputOnly  SFTime set_time
        language "GLSL"
        parts [
          ShaderPart {
            url "data:x-shader/x-vertex,#version 300 es
// Vertex Shader
...
uniform float set_time
...
"
          }
          ShaderPart {
            type "FRAGMENT"
            url "data:x-shader/x-fragment,#version 300 es
// Fragment Shader
...
"
          }
        ]
      }
    }
    geometry ElevationGrid { }
  }
}

ROUTE Timer.time TO Shader.set_time
```

Once the X3D is defined we can now write the vertex and the fragment shader source. This is a simple example where a texture is applied to the geometry.

### Vertex Shader

```c
#version 300 es

precision mediump float;

uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_ProjectionMatrix;

in vec4 x3d_TexCoord;
in vec4 x3d_Vertex;

out vec4 texCoord;

void
main ()
{
  texCoord = x3d_TextureMatrix [0] * x3d_TexCoord;

  gl_Position = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_Vertex;
}
```

### Fragment Shader

```c
#version 300 es

precision mediump float;

uniform sampler2D x3d_Texture2D [x3d_MaxTextures];

in vec4 texCoord;

out vec4 x3d_FragColor;

void
main ()
{
  x3d_FragColor = texture (x3d_Texture2D [0], vec2 (texCoord));
}
```

## Lighting and Transparency

Lighting is enabled if a Material node is available. If a transparent Material node is attached to the Appearance of the Shape node, the Shape is treated as transparent and thus the shader.

## Data Type Mapping

A ComposedShader node provides the capability to define custom fields like the Script node it does, these fields are then mapped to GLSL uniform variables. They are automatically updated and can be of any access type (initializeOnly, inputOnly, outputOnly or inputOutput).

### Node fields

| X3D texture type          | GLSL variable type |
|---------------------------|--------------------|
| X3DTexture2DNode          | sampler2D          |
| X3DEnvironmentTextureNode | samplerCube        |

### X3D field types to GLSL data types

<table class=" table">
   <thead>
      <tr>
         <th>X3D field type</th>
         <th>GLSL variable type</th>
         <th></th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>SFBool</td>
         <td>bool</td>
         <td></td>
      </tr>
      <tr>
         <td>SFColor</td>
         <td>vec3</td>
         <td></td>
      </tr>
      <tr>
         <td>SFColorRGBA</td>
         <td>vec4</td>
         <td></td>
      </tr>
      <tr>
         <td>SFDouble</td>
         <td>float</td>
         <td></td>
      </tr>
      <tr>
         <td>SFFloat</td>
         <td>float</td>
         <td></td>
      </tr>
      <tr>
         <td>SFImage</td>
         <td>int [ ]</td>
         <td>(width, height, comp, array)</td>
      </tr>
      <tr>
         <td>SFInt32</td>
         <td>int</td>
         <td></td>
      </tr>
      <tr>
         <td>SFMatrix3d</td>
         <td>mat3</td>
         <td></td>
      </tr>
      <tr>
         <td>SFMatrix3f</td>
         <td>mat3</td>
         <td></td>
      </tr>
      <tr>
         <td>SFMatrix4d</td>
         <td>mat4</td>
         <td></td>
      </tr>
      <tr>
         <td>SFMatrix4f</td>
         <td>mat4</td>
         <td></td>
      </tr>
      <tr>
         <td>SFNode</td>
         <td>see node fields table</td>
         <td></td>
      </tr>
      <tr>
         <td>SFRotation</td>
         <td>mat3</td>
         <td>3×3 matrix representation</td>
      </tr>
      <tr>
         <td>SFString</td>
         <td>not supported</td>
         <td></td>
      </tr>
      <tr>
         <td>SFTime</td>
         <td>float</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec2d</td>
         <td>vec2</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec2f</td>
         <td>vec2</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec3d</td>
         <td>vec3</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec3f</td>
         <td>vec3</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec4d</td>
         <td>vec4</td>
         <td></td>
      </tr>
      <tr>
         <td>SFVec4f</td>
         <td>vec4</td>
         <td></td>
      </tr>
      <tr>
         <td colspan="4"><hr/>
         </td>
      </tr>
      <tr>
         <td>MFBool</td>
         <td>bool [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFColor</td>
         <td>vec3 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFColorRGBA</td>
         <td>vec4 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFDouble</td>
         <td>float [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFFloat</td>
         <td>float [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFImage</td>
         <td>int [ ]</td>
         <td>(width, height, comp, array, width ...)</td>
      </tr>
      <tr>
         <td>MFInt32</td>
         <td>int [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFMatrix3d</td>
         <td>mat3 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFMatrix3f</td>
         <td>mat3 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFMatrix4d</td>
         <td>mat4 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFMatrix4f</td>
         <td>mat4 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFNode</td>
         <td>see node fields table</td>
         <td></td>
      </tr>
      <tr>
         <td>MFRotation</td>
         <td>mat3 [ ]</td>
         <td>3×3 matrix representation</td>
      </tr>
      <tr>
         <td>MFString</td>
         <td>not supported</td>
         <td></td>
      </tr>
      <tr>
         <td>MFTime</td>
         <td>float [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec2d</td>
         <td>vec2 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec2f</td>
         <td>vec2 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec3d</td>
         <td>vec3 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec3f</td>
         <td>vec3 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec4d</td>
         <td>vec4 [ ]</td>
         <td></td>
      </tr>
      <tr>
         <td>MFVec4f</td>
         <td>vec4 [ ]</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Built-in Variables

A ComposedShader defines a number of special variables for the various shader stages. These built-in variables have special properties. They are usually for communicating with certain fixed-functionality. By convention, all predefined variables start with »x3d\_«; no user-defined variables may start with this.

<table class=" table">
   <thead>
      <tr>
         <th>Type</th>
         <th>Name</th>
         <th>Comment</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>uniform float</td>
         <td>x3d_LogarithmicFarFactor1_2</td>
         <td>this is a uniform value for logarithmic depth buffer computed as 1.0 / log2 (farplane + 1.0).</td>
      </tr>
      <tr>
         <td>uniform int</td>
         <td>x3d_GeometryType</td>
         <td>x3d_Points, x3d_Lines, x3d_Geometry2D, x3d_Geometry3D</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform int</td>
         <td>x3d_NumClipPlanes</td>
         <td>number of clip planes in x3d_ClipPlane</td>
      </tr>
      <tr>
         <td>uniform vec4</td>
         <td>x3d_ClipPlane [x3d_MaxClipPlanes]</td>
         <td>clip plane array</td>
      </tr>
      <tr>
         <td>uniform x3d_FogParameters</td>
         <td>x3d_Fog</td>
         <td>see table »Uniform Struct x3d_FogParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform int</td>
         <td>x3d_NumLights</td>
         <td>number of lights in x3d_LightSource</td>
      </tr>
      <tr>
         <td>uniform x3d_LightSourceParameters</td>
         <td>x3d_LightSource [x3d_MaxLights]</td>
         <td>see table »Uniform Struct x3d_LightSourceParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform float</td>
         <td>x3d_AlphaCutoff</td>
         <td>alphaCutoff value from Appearance</td>
      </tr>
      <tr>
         <td>uniform x3d_PointPropertiesParameters</td>
         <td>x3d_PointProperties</td>
         <td>see table »Uniform Struct x3d_PointPropertiesParameters«</td>
      </tr>
      <tr>
         <td>uniform x3d_LinePropertiesParameters</td>
         <td>x3d_LineProperties</td>
         <td>see table »Uniform Struct x3d_LinePropertiesParameters«</td>
      </tr>
      <tr>
         <td>uniform x3d_FillPropertiesParameters</td>
         <td>x3d_FillProperties</td>
         <td>see table »Uniform Struct x3d_FillPropertiesParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform bool</td>
         <td>x3d_ColorMaterial</td>
         <td>true if X3DColorNode attached</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform x3d_MaterialParameters</td>
         <td>x3d_Material</td>
         <td>see table »Uniform Struct x3d_MaterialParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform int</td>
         <td>x3d_NumTextures</td>
         <td>number of textures in texture arrays.</td>
      </tr>
      <tr>
         <td>uniform int</td>
         <td>x3d_TextureType [x3d_MaxTextures]</td>
         <td>x3d_TextureType2D, x3d_TextureType3D, x3d_TextureTypeCubeMapTexture</td>
      </tr>
      <tr>
         <td>uniform sampler2D</td>
         <td>x3d_Texture2D [x3d_MaxTextures]</td>
         <td>texture from Appearance texture field</td>
      </tr>
      <tr>
         <td>uniform samplerCube</td>
         <td>x3d_CubeMapTexture [x3d_MaxTextures]</td>
         <td>texture from Appearance texture field</td>
      </tr>
      <tr>
         <td>uniform x3d_TextureCoordinateGeneratorParameters</td>
         <td>x3d_TextureCoordinateGenerator [x3d_MaxTextures]</td>
         <td>see table »Uniform Struct x3d_TextureCoordinateGeneratorParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform ivec4</td>
         <td>x3d_Viewport</td>
         <td>viewport position and size</td>
      </tr>
      <tr>
         <td>uniform mat4</td>
         <td>x3d_ProjectionMatrix</td>
         <td>projection matrix of the camera</td>
      </tr>
      <tr>
         <td>uniform mat4</td>
         <td>x3d_ModelViewMatrix</td>
         <td>this is the product of object's transformation matrix and the inverse x3d_CameraSpaceMatrix</td>
      </tr>
      <tr>
         <td>uniform mat3</td>
         <td>x3d_NormalMatrix</td>
         <td>object's normal matrix; this is the inverse transpose of the 3×3 submatrix of x3d_ModelViewMatrix</td>
      </tr>
      <tr>
         <td>uniform mat4</td>
         <td>x3d_TextureMatrix [x3d_MaxTextures]</td>
         <td>object's texture matrix defined by nodes derived from X3DTextureTransformNode</td>
      </tr>
      <tr>
         <td>uniform mat4</td>
         <td>x3d_CameraSpaceMatrix</td>
         <td>transformation matrix of the camera</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>attribute float</td>
         <td>x3d_FogDepth</td>
         <td>fog depth of the vertex overriding Fog.visibilityRange; available if FogCoordinate is attached</td>
      </tr>
      <tr>
         <td>attribute vec4</td>
         <td>x3d_Color</td>
         <td>color of the vertex; available if X3DColorNode is attached</td>
      </tr>
      <tr>
         <td>attribute vec4</td>
         <td>x3d_TexCoord0</td>
         <td>texture coordinate of the vertex from channel 0</td>
      </tr>
      <tr>
         <td>attribute vec4</td>
         <td>x3d_TexCoord1</td>
         <td>texture coordinate of the vertex from channel 1</td>
      </tr>
      <tr>
         <td>attribute vec3</td>
         <td>x3d_Normal</td>
         <td>normal of the vertex</td>
      </tr>
      <tr>
         <td>attribute vec4</td>
         <td>x3d_Vertex</td>
         <td>vertex coordinate, <b>required</b></td>
      </tr>
   </tbody>
</table>

### Uniform Struct x3d\_FogParameters

| Type  | Name            | Comment                                                 |
|-------|-----------------|---------------------------------------------------------|
| int   | type            | x3d\_LinearFog, x3d\_ExponentialFog                     |
| vec3  | color           |                                                         |
| float | visibilityRange |                                                         |
| mat3  | matrix          | inverse fog space matrix, rotation and scale components |
| bool  | fogCoord        | true if FogCoordinate is attached, otherwise false      |

### Uniform Struct x3d\_LightSourceParameters

| Type  | Name             | Comment                                                   |
|-------|------------------|-----------------------------------------------------------|
| int   | type             | x3d\_DirectionalLight, x3d\_PointLight, x3d\_SpotLight    |
| vec3  | color            |                                                           |
| float | ambientIntensity |                                                           |
| float | intensity        |                                                           |
| vec3  | attenuation      |                                                           |
| vec3  | location         | location of light in view space coordinates               |
| vec3  | direction        |                                                           |
| float | beamWidth        |                                                           |
| float | cutOffAngle      |                                                           |
| float | radius           |                                                           |
| mat3  | matrix           | inverse light space matrix, rotation and scale components |

### Uniform Struct x3d\_MaterialParameters

| Type  | Name             |
|-------|------------------|
| float | ambientIntensity |
| vec3  | diffuseColor     |
| vec3  | specularColor    |
| vec3  | emissiveColor    |
| float | shininess        |
| float | transparency     |

### Uniform Struct x3d\_PointPropertiesParameters

| Type  | Name                 | Comment                                                       |
|-------|----------------------|---------------------------------------------------------------|
| float | pointSizeScaleFactor |                                                               |
| float | pointSizeMinValue    |                                                               |
| float | pointSizeMaxValue    |                                                               |
| vec3  | pointSizeAttenuation |                                                               |
| int   | colorMode            | x3d\_PointColor, x3d\_TextureColor, x3d\_TextureAndPointColor |

### Uniform Struct x3d\_LinePropertiesParameters

| Type      | Name                 |
|-----------|----------------------|
| bool      | applied              |
| float     | linewidthScaleFactor |
| sampler2D | linetype             |

### Uniform Struct x3d\_FillPropertiesParameters

| Type      | Name       |
|-----------|------------|
| bool      | filled     |
| bool      | hatched    |
| vec3      | hatchColor |
| sampler2D | hatchStyle |

### Uniform Struct x3d\_TextureCoordinateGeneratorParameters

| Type  | Name            |
|-------|-----------------|
| int   | mode            |
| float | parameter \[6\] |

### ParticleSystem

If the shader node is part of a ParticleSystem node the following attributes are available if ParticleSystem.*geometryType* is POINT, LINE, TRIANGLE, QUAD, or SPRITE.

| Type            | Name                     | Comment                                                   |
|-----------------|--------------------------|-----------------------------------------------------------|
| attribute float | x3d\_ParticleId          | integer id of the particle                                |
| attribute float | x3d\_ParticleLife        | integer number of current life cycle                      |
| attribute float | x3d\_ParticleElapsedTime | elapsed time normalized in the range \[0, 1\]             |
| attribute vec4  | x3d\_ParticlePosition    | center coordinate of particle, in relation to x3d\_Vertex |

If the ParticleSystem.*geometryType* is GEOMETRY the following uniforms are available.

| Type                            | Name          | Comment                                            |
|---------------------------------|---------------|----------------------------------------------------|
| uniform x3d\_ParticleParameters | x3d\_Particle | See table »Uniform Struct x3d\_ParticleParameters« |

#### Uniform Struct x3d\_ParticleParameters

| Type  | Name        | Comment                                       |
|-------|-------------|-----------------------------------------------|
| int   | id          | integer id of the particle                    |
| int   | life        | integer number of current life                |
| float | elapsedTime | elapsed time normalized in the range \[0, 1\] |

## Built-in Constants

Some built-in variables are enumerated and have special values and meanings. The following table list all of them and their corresponding values. Note: as of version 1.27 these constant are buit-in.

<table class=" table">
   <thead>
      <tr>
         <th>Variable</th>
         <th>Type</th>
         <th>Name</th>
         <th>Value</th>
         <th>Comment</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>X_ITE</td>
         <td></td>
         <td></td>
         <td></td>
         <td>defined</td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td>X3D_LOGARITHMIC_DEPTH_BUFFER</td>
         <td></td>
         <td></td>
         <td></td>
         <td>defined if logarithmic depth buffer is enabled in [browser options](http://create3000.de/users-guide/ecmascript-object-and-function-definitions/browser-services/#browser-object).</td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td>x3d_GeometryType</td>
         <td>int</td>
         <td>x3d_Points</td>
         <td>0</td>
         <td>appears on PointSet and Polypoint2D</td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_Lines</td>
         <td>1</td>
         <td>appears on IndexedLineSet, LineSet and Polyline2D</td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_Geometry2D</td>
         <td>2</td>
         <td>appears on Geometry2D nodes</td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_Geometry3D</td>
         <td>3</td>
         <td>appears on Geometry3D nodes and other 3D nodes</td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td>x3d_ClipPlane</td>
         <td>int</td>
         <td>x3d_MaxClipPlanes</td>
         <td>6</td>
         <td></td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td>x3d_FogType</td>
         <td>int</td>
         <td>x3d_None</td>
         <td>0</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_LinearFog</td>
         <td>1</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_ExponentialFog</td>
         <td>2</td>
         <td></td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_MaxLights</td>
         <td>8</td>
         <td></td>
      </tr>
      <tr>
         <td>x3d_LightType</td>
         <td>int</td>
         <td>x3d_DirectionalLight</td>
         <td>1</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_PointLight</td>
         <td>2</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_SpotLight</td>
         <td>3</td>
         <td></td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_MaxTextures</td>
         <td>2</td>
         <td></td>
      </tr>
      <tr>
         <td>x3d_TextureType</td>
         <td>int</td>
         <td>x3d_TextureType2D</td>
         <td>2</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_TextureType3D</td>
         <td>3</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_TextureTypeCubeMapTexture</td>
         <td>4</td>
         <td></td>
      </tr>
      <tr>
         <td colspan="5"><hr/>
         </td>
      </tr>
      <tr>
         <td>x3d_ColorMode</td>
         <td>int</td>
         <td>x3d_PointColor</td>
         <td>0</td>
         <td>PointProperties colorMode constants</td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_TextureColor</td>
         <td>1</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>int</td>
         <td>x3d_TextureAndPointColor</td>
         <td>2</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Logarithmic Depth Buffer

I assume pretty much every 3D programmer runs into Z-buffer issues sooner or later. Especially when doing planetary rendering; the distant stuff can be a thousand kilometers away but you still would like to see fine details right in front of the camera. First enable the logarithmic depth buffer:

```js
Script {
  url "ecmascript:

function initialize ()
{
  Browser .setBrowserOption ('LogarithmicDepthBuffer', true);
}
"
}
```

To address the issue of the depth not being interpolated in perspectively-correct way, output the following interpolant to the vertex shader:

```c
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif

void
main ()
{
   ...
   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   // Assuming gl_Position was already computed
   depth = 1.0 + gl_Position .w;
   #endif
}
```

and then in the fragment shader add:

```c
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarValue1_2;
varying float depth;
#endif

void
main ()
{
   ...
   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepthEXT = gl_FragCoord .z;
   #endif
}
```

## See Also

- [ComposedShader](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ComposedShader)
- [ShaderPart](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/shaders.html#ShaderPart)
