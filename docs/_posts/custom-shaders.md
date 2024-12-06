---
title: Custom Shaders
date: 2022-11-28
nav: main
categories: []
tags: [Custom, Shaders]
---
## Overview

When you display your 3D models with X_ITE, by default it will use the Gouraud shader. This is a versatile shader that can cover a lot of your rendering needs. If this is not enough there is also a Phong shader available, adjustable with the [browser option](/x_ite/reference/browser-services/#browser-options) »Shading« per scripting.

However, you will often want to perform special effects or special cases for your materials. To do this you will need to write a custom shader.

## Example

<x3d-canvas class="xr-button-cr" src="https://create3000.github.io/media/examples/X3D/WaterQuality/WaterQuality.x3d" update="auto">
  <img src="https://create3000.github.io/media/images/water-quality.png" alt="Shader Example"/>
</x3d-canvas>

[Download ZIP Archive](https://create3000.github.io/media/examples/X3D/WaterQuality/WaterQuality.zip)

## Shaders and Shader Definition

WebGL uses the GLSL language to write shaders that can be run across all browsers. With X_ITE you create your own shader using [ComposedShader](/x_ite/components/shaders/composedshader/) and [ShaderPart](/x_ite/components/shaders/shaderpart/) nodes and than attach the ComposedShader to the *shader* field of an [Appearance](/x_ite/components/shape/appearance/) node and that is a child's play with [Sunrize](/sunrize/).

### XML Encoding

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D {{ site.x3d_latest_version }}/EN" "https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.dtd">
<X3D profile='Interchange' version='{{ site.x3d_latest_version }}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-{{ site.x3d_latest_version }}.xsd'>
  <head>
    <component name='Shaders' level='1'/>
  </head>
  <Scene>
    <Viewpoint
        position='9.279771 8.706816 16.22163'
        orientation='-0.83432609774564 0.526445494105168 0.163569876068002 0.712985187365762'
        centerOfRotation='4.5 0 4.5'/>
    <TimeSensor DEF='Timer'
        loop='true'/>
    <Transform>
      <Shape>
        <Appearance>
          <ImageTexture
              url='"image.png"'/>
          <ComposedShader DEF='Shader'
              language='GLSL'>
            <field accessType='inputOnly' type='SFTime' name='set_time'/>
            <ShaderPart>
<![CDATA[data:x-shader/x-vertex,#version 300 es
// Vertex Shader
...
uniform float set_time; // value from set_time field
...
]]>
            </ShaderPart>
            <ShaderPart
                type='FRAGMENT'>
<![CDATA[data:x-shader/x-fragment,#version 300 es
// Fragment Shader
...
uniform sampler2D x3d_Texture2D [1]; // image from ImageTexture node
...
]]>
            </ShaderPart>
          </ComposedShader>
        </Appearance>
        <ElevationGrid
            xDimension='10'
            zDimension='10'/>
      </Shape>
    </Transform>
    <ROUTE fromNode='Timer' fromField='elapsedTime' toNode='Shader' toField='set_time'/>
  </Scene>
</X3D>
```

### Classic VRML Encoding

```vrml
#X3D V{{ site.x3d_latest_version }} utf8

PROFILE Interchange

COMPONENT Shaders : 1

Viewpoint {
  position 9.279771 8.706816 16.22163
  orientation -0.83432609774564 0.526445494105168 0.163569876068002 0.712985187365762
  centerOfRotation 4.5 0 4.5
}

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
uniform float set_time; // value from set_time field
...
"
          }
          ShaderPart {
            type "FRAGMENT"
            url "data:x-shader/x-fragment,#version 300 es
// Fragment Shader
...
uniform sampler2D x3d_Texture2D [1]; // image from ImageTexture node
...
"
          }
        ]
      }
    }
    geometry ElevationGrid {
      xDimension 10
      zDimension 10
    }
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

Lighting is enabled if a [Material](/x_ite/components/shape/material/) node is used and some lights are on.

Normally the browser automatically determines the alpha treatment based on material, colors, and images, but you can force a alpha mode by setting the *alphaMode* field of a [Appearance](/x_ite/components/shape/appearance/) node.

## Data Type Mapping

A [ComposedShader](/x_ite/components/shaders/composedshader/) node provides the capability to define custom fields like the [Script](/x_ite/components/scripting/script/) node it does, these fields are then mapped to GLSL uniform variables. They are automatically updated and can be of any access type (initializeOnly, inputOnly, outputOnly or inputOutput).

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

A [ComposedShader](/x_ite/components/shaders/composedshader/) defines a number of special variables for the various shader stages. These built-in variables have special properties. They are usually for communicating with certain fixed-functionality. By convention, all predefined variables start with »x3d_«; no user-defined variables may start with this.

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
         <td>in float</td>
         <td>x3d_FogDepth</td>
         <td>fog depth of the vertex overriding Fog.visibilityRange; available if FogCoordinate is attached</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_Color</td>
         <td>color of the vertex; available if X3DColorNode is attached</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_TexCoord0</td>
         <td>texture coordinate of the vertex from channel 0</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_TexCoord1</td>
         <td>texture coordinate of the vertex from channel 1</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_TexCoord2</td>
         <td>texture coordinate of the vertex from channel 2</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_TexCoord3</td>
         <td>texture coordinate of the vertex from channel 3</td>
      </tr>
      <tr>
         <td>in vec3</td>
         <td>x3d_Normal</td>
         <td>normal of the vertex</td>
      </tr>
      <tr>
         <td>in vec4</td>
         <td>x3d_Vertex</td>
         <td>vertex coordinate, <b>required</b></td>
      </tr>
   </tbody>
</table>

### Uniform Struct x3d_FogParameters

| Type  | Name            | Comment                                                 |
|-------|-----------------|---------------------------------------------------------|
| vec3  | color           |                                                         |
| float | visibilityRange |                                                         |
| mat3  | matrix          | inverse fog space matrix, rotation and scale components |

### Uniform Struct x3d_LightSourceParameters

| Type  | Name             | Comment                                                   |
|-------|------------------|-----------------------------------------------------------|
| int   | type             | x3d_DirectionalLight, x3d_PointLight, x3d_SpotLight       |
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

### Uniform Struct x3d_MaterialParameters

| Type  | Name             |
|-------|------------------|
| float | ambientIntensity |
| vec3  | diffuseColor     |
| vec3  | specularColor    |
| vec3  | emissiveColor    |
| float | shininess        |
| float | transparency     |

### Uniform Struct x3d_PointPropertiesParameters

| Type  | Name                 |
|-------|----------------------|
| float | pointSizeScaleFactor |
| float | pointSizeMinValue    |
| float | pointSizeMaxValue    |
| vec3  | pointSizeAttenuation |

### Uniform Struct x3d_LinePropertiesParameters

| Type      | Name                 |
|-----------|----------------------|
| bool      | applied              |
| int       | linetype             |
| float     | lineStippleScale     |
| sampler2D | texture              |

### Uniform Struct x3d_FillPropertiesParameters

| Type      | Name       |
|-----------|------------|
| bool      | filled     |
| bool      | hatched    |
| vec3      | hatchColor |
| sampler2D | texture    |

### Uniform Struct x3d_TextureCoordinateGeneratorParameters

| Type  | Name            |
|-------|-----------------|
| int   | mode            |
| float | parameter \[6\] |

### Instancing

#### ParticleSystem

If the shader node is part of a [ParticleSystem](/x_ite/components/particlesystems/particlesystem/) node the following attributes and uniforms are available.

| Type              | Name                  | Comment                                                                |
|-------------------|-----------------------|------------------------------------------------------------------------|
| build-in          | gl_InstanceId         | available                                                              |
| in vec4           | x3d_Particle          | vec4 (int life, float lifetime, float elapsedTime, int texCoordIndex0) |
| in vec3           | x3d_ParticleVelocity  | velocity vector of particle                                            |
| in mat4           | x3d_ParticleMatrix    | particle matrix, should be multiplied with x3d_Vertex                  |
| uniform sampler2D | x3d_TexCoordRamp      | texture coordinate ramp                                                |

#### InstancedShape

If the shader node is part of a [InstancedShape](/x_ite/components/x-ite/instancedshape/) node the following attributes and uniforms are available.

| Type      | Name                     | Comment                                                      |
|-----------|--------------------------|--------------------------------------------------------------|
| build-in  | gl_InstanceId            | available                                                    |
| in mat4   | x3d_InstanceMatrix       | instance matrix, should be multiplied with x3d_Vertex        |
| in mat3   | x3d_InstanceNormalMatrix | instance normal matrix, should be multiplied with x3d_Normal |

## Built-in Constants

Some built-in variables are enumerated and have special values and meanings. The following table list all of them and their corresponding values.

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

```vrml
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

>**Note:** Logarithmic depth buffer is automatically enabled if a [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) node is bound.
{: .prompt-info }

## See Also

- [ComposedShader](/x_ite/components/shaders/composedshader/)
- [ShaderPart](/x_ite/components/shaders/shaderpart/)
