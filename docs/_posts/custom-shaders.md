---
title: Custom Shaders
date: 2022-11-28
nav: main
categories: []
tags: [Custom, Shaders]
---
## Overview

When you display your 3D models with X\_ITE, by default it will use the Gouraud shader. This is a versatile shader that can cover a lot of your rendering needs. If this is not enough there is also a Phong shader available, adjustable with the browser shading option per scripting.

However, you will often want to perform special effects or special cases for your materials. To do this you will need to write a custom shader.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/X3D/WaterQuality/WaterQuality.x3d" update="auto">
  <img src="https://create3000.github.io/media/images/water-quality.png" alt="Shader Example"/>
</x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/X3D/WaterQuality/WaterQuality.zip)

## Shaders and Shader Definition

WebGL uses the GLSL language to write shaders that can be run across all browsers. With X\_ITE you create your own shader using ComposedShader and ShaderPart nodes and than attach the ComposedShader to the *shader* field of an Appearance node and that is a child's play with Titania.

### X3D

```js
#X3D V{{ site.x3d_latest_version }} utf8

DEF Timer TimeSensor {
  loop TRUE
}

Transform {
  children Shape {
    appearance Appearance {
      texture ImageTexture {
        url "image.png"
      }
      shaders DEF Shader ComposedShader {
        inputOnly SFTime set_time
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

ROUTE Timer.elapsedTime TO Shader.set_time
```

Once the X3D is defined we can now write the vertex and the fragment shader source. This is a simple example where a texture is applied to the geometry.

### Vertex Shader

```glsl
#version 300 es

precision mediump float;

uniform mat4 x3d_TextureMatrix [1];
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_ProjectionMatrix;

in vec4 x3d_TexCoord0;
in vec4 x3d_Vertex;

out vec4 texCoord;

void
main ()
{
  texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;

  gl_Position = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_Vertex;
}
```

### Fragment Shader

```glsl
#version 300 es

precision mediump float;

uniform sampler2D x3d_Texture2D [1];

in vec4 texCoord;

out vec4 x3d_FragColor;

void
main ()
{
  x3d_FragColor = texture (x3d_Texture2D [0], vec2 (texCoord .s, 1.0 - texCoord .t));
}
```

## Lighting and Transparency

Lighting is enabled if a Material node is used and some lights are on.

Normally the browser automatically determines the alpha treatment based on material, colors, and images, but you can force a alpha mode by setting the *alphaMode* field of a Appearance node.

## Data Type Mapping

A ComposedShader node provides the capability to define custom fields like the Script node it does, these fields are then mapped to GLSL uniform variables. They are automatically updated and can be of any access type (initializeOnly, inputOnly, outputOnly or inputOutput).

### Node fields

| X3D texture type          | GLSL variable type |
|---------------------------|--------------------|
| X3DTexture2DNode          | sampler2D          |
| X3DTexture3DNode          | sampler3D          |
| X3DEnvironmentTextureNode | samplerCube        |

### X3D field types to GLSL data types

<table>
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

<table>
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
         <td>this is a uniform value for logarithmic depth buffer computed as 1.0 / log2 (farPlane + 1.0).</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
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
         <td>uniform x3d_MaterialParameters</td>
         <td>x3d_Material</td>
         <td>see table »Uniform Struct x3d_MaterialParameters«</td>
      </tr>
      <tr>
         <td colspan="3"><hr/></td>
      </tr>
      <tr>
         <td>uniform sampler2D</td>
         <td>x3d_Texture2D [x3d_MaxTextures]</td>
         <td>texture from Appearance texture field</td>
      </tr>
      <tr>
         <td>uniform samplerCube</td>
         <td>x3d_TextureCube [x3d_MaxTextures]</td>
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
         <td>object's texture transform matrix defined by nodes derived from X3DTextureTransformNode</td>
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
| vec3  | color           |                                                         |
| float | visibilityRange |                                                         |
| mat3  | matrix          | inverse fog space matrix, rotation and scale components |

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

| Type  | Name                 |
|-------|----------------------|
| float | pointSizeScaleFactor |
| float | pointSizeMinValue    |
| float | pointSizeMaxValue    |
| vec3  | pointSizeAttenuation |

### Uniform Struct x3d\_LinePropertiesParameters

| Type      | Name                 |
|-----------|----------------------|
| bool      | applied              |
| int       | linetype             |
| float     | lineStippleScale     |
| sampler2D | texture              |

### Uniform Struct x3d\_FillPropertiesParameters

| Type      | Name       |
|-----------|------------|
| bool      | filled     |
| bool      | hatched    |
| vec3      | hatchColor |
| sampler2D | texture    |

### Uniform Struct x3d\_TextureCoordinateGeneratorParameters

| Type  | Name            |
|-------|-----------------|
| int   | mode            |
| float | parameter \[6\] |

### ParticleSystem

If the shader node is part of a ParticleSystem node the following attributes and uniforms are available.

| Type              | Name                  | Comment                                                                |
|------------------ |---------------------- |------------------------------------------------------------------------|
| attribute vec4    | x3d\_Particle         | vec4 (int life, float lifetime, float elapsedTime, int texCoordIndex0) |
| attribute mat4    | x3d\_ParticleMatrix   | particle matrix, should be multiplied with x3d\_Vertex                 |
| uniform sampler2D | x3d\_TexCoordRamp     | texture coordinate ramp                                                |
| build-in          | gl\_InstanceId        | available                                                              |

## Built-in Constants

Some built-in variables are enumerated and have special values and meanings. The following table list all of them and their corresponding values.

>**Note:** As of version 1.27 these constant are built-in.
{: .prompt-tip }

<table>
   <thead>
      <tr>
         <th>Constant</th>
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
         <td>4</td>
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

To address the issue of the depth not being interpolated in perspectively-correct way, add to the fragment shader:

```glsl
#version 300 es

uniform float x3d_LogarithmicFarValue1_2;

void
main ()
{
   ...
   //https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   gl_FragDepth = log2 (1.0 + 1.0 / gl_FragCoord .w) * x3d_LogarithmicFarFactor1_2;
}
```

>**Note:** Logarithmic depth buffer is automatically enabled if a GeoViewpoint is bound.
{: .prompt-info }

## See Also

- [ComposedShader](components/shaders/composedshader)
- [ShaderPart](components/shaders/shaderpart)
