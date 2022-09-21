/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Shape/X3DShapeNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/Shape/AlphaMode",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Vector4",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Numbers/Matrix3",
   "standard/Math/Algorithm",
   "standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          TraverseType,
          X3DConstants,
          X3DCast,
          AlphaMode,
          Vector3,
          Vector4,
          Matrix4,
          Matrix3,
          Algorithm,
          BVH)
{
"use strict";

   let i = 0;

   const
      POINT    = i ++,
      LINE     = i ++,
      TRIANGLE = i ++,
      QUAD     = i ++,
      GEOMETRY = i ++,
      SPRITE   = i ++;

   const GeometryTypes = {
      POINT:    POINT,
      LINE:     LINE,
      TRIANGLE: TRIANGLE,
      QUAD:     QUAD,
      GEOMETRY: GEOMETRY,
      SPRITE:   SPRITE,
   };

   function ParticleSystem (executionContext)
   {
      X3DShapeNode .call (this, executionContext);

      this .addType (X3DConstants .ParticleSystem);

      this ._particleSize .setUnit ("length");

      this .inputParticles           = [ ];
      this .outputParticles          = [ ];
      this .maxParticles             = 0;
      this .numParticles             = 0;
      this .particleLifetime         = 0;
      this .lifetimeVariation        = 0;
      this .geometryType             = POINT;
      this .createParticles          = true;
      this .emitterNode              = null;
      this .forcePhysicsModelNodes   = [ ];
      this .numForces                = 0;
      this .forces                   = new Float32Array (4);
      this .forcesTexture            = null;
      this .boundedPhysicsModelNodes = [ ];
      this .boundedNormals           = [ ];
      this .boundedVertices          = [ ];
      this .colorRampNode            = null;
      this .colorRamp                = new Float32Array ();
      this .texCoordRampNode         = null;
      this .texCoordKeys             = [ ];
      this .texCoordRamp             = [ ];
      this .texCoordAnim             = false;
      this .vertexCount              = 0;
      this .shaderNode               = null;
      this .geometryContext          = { };
      this .creationTime             = 0;
      this .pauseTime                = 0;
      this .deltaTime                = 0;
   }

   ParticleSystem .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
   {
      constructor: ParticleSystem,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "createParticles",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geometryType",      new Fields .SFString ("QUAD")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxParticles",      new Fields .SFInt32 (200)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleLifetime",  new Fields .SFFloat (5)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lifetimeVariation", new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleSize",      new Fields .SFVec2f (0.02, 0.02)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "emitter",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "physics",           new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorKey",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorRamp",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordKey",       new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordRamp",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "ParticleSystem";
      },
      getComponentName: function ()
      {
         return "ParticleSystems";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DShapeNode .prototype .initialize .call (this);

         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         if (browser .getContext () .getVersion () < 2)
            return;

         this .isLive () .addInterest ("set_live__", this);

         browser .getBrowserOptions () ._Shading .addInterest ("set_shader__", this);

         this ._enabled           .addInterest ("set_enabled__",           this);
         this ._createParticles   .addInterest ("set_createParticles__",   this);
         this ._geometryType      .addInterest ("set_geometryType__",      this);
         this ._maxParticles      .addInterest ("set_enabled__",           this);
         this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
         this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
         this ._emitter           .addInterest ("set_emitter__",           this);
         this ._physics           .addInterest ("set_physics__",           this);
         this ._colorKey          .addInterest ("set_color__",             this);
         this ._colorRamp         .addInterest ("set_colorRamp__",         this);
         this ._texCoordKey       .addInterest ("set_texCoord__",          this);
         this ._texCoordRamp      .addInterest ("set_texCoordRamp__",      this);

         // Create particles stuff.

         for (let i = 0; i < 4; ++ i)
         {
            this .inputParticles  [i] = gl .createBuffer ();
            this .outputParticles [i] = gl .createBuffer ();
         }

         // Create forces stuff.

         this .forcesTexture                 = this .createTexture ();
         this .colorRampTexture              = this .createTexture ();
         this .boundedVolumeTexture          = this .createTexture ();
         this .boundedVolumeHierarchyTexture = this .createTexture ();

         // Create GL stuff.

         this .geometryParticleBuffer  = gl .createBuffer ();
         this .geometryPositionBuffer  = gl .createBuffer ();
         this .geometryColorBuffer     = gl .createBuffer ();
         this .geometryTexCoordBuffers = new Array (this .getBrowser () .getMaxTextures ()) .fill (gl .createBuffer ());
         this .geometryNormalBuffer    = gl .createBuffer ();
         this .geometryVertexBuffer    = gl .createBuffer ();

         this .transformFeedBack = gl .createTransformFeedback ();

         // Geometry context

         this .geometryContext .fogCoords                = false;
         this .geometryContext .textureCoordinateNode    = browser .getDefaultTextureCoordinate ();
         this .geometryContext .textureCoordinateMapping = new Map ();

         // Init fields.
         // Call order is very important at startup.

         this .set_emitter__ ();
         this .set_enabled__ ();
         this .set_geometryType__ ();
         this .set_createParticles__ ();
         this .set_particleLifetime__ ();
         this .set_lifetimeVariation__ ();
         this .set_physics__ ();
         this .set_colorRamp__ ();
         this .set_texCoordRamp__ ();
      },
      set_bbox__: function ()
      {
         if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
            this .bbox .set ();
         else
            this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

         this .bboxSize   .assign (this .bbox .size);
         this .bboxCenter .assign (this .bbox .center);
      },
      set_transparent__: function ()
      {
         if (this .getAppearance () .getAlphaMode () === AlphaMode .AUTO)
         {
            switch (this .geometryType)
            {
               case POINT:
               {
                  this .setTransparent (true);
                  break;
               }
               default:
               {
                  this .setTransparent (this .getAppearance () .getTransparent () ||
                                        (this .colorRampNode && this .colorRampNode .getTransparent ()) ||
                                        (this .geometryType === GEOMETRY && this .geometryNode && this .geometryNode .getTransparent ()));
                  break;
               }
            }
         }
         else
         {
            this .setTransparent (this .getAppearance () .getTransparent ());
         }
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
         {
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
            {
               this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

               if (this .pauseTime)
               {
                  this .creationTime += performance .now () / 1000 - this .pauseTime;
                  this .pauseTime     = 0;
               }
            }
         }
         else
         {
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
            {
               this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

               if (this .pauseTime === 0)
                  this .pauseTime = performance .now () / 1000;
            }
         }
      },
      set_enabled__: function ()
      {
         if (this ._enabled .getValue () && this ._maxParticles .getValue ())
         {
            if (! this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

                  this .pauseTime = 0;
               }
               else
                  this .pauseTime = performance .now () / 1000;

               this ._isActive = true;
            }
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);
               }

               this ._isActive = false;

               this .numParticles = 0;
            }
         }

         this .set_maxParticles__ ();
      },
      set_createParticles__: function ()
      {
         this .createParticles = this ._createParticles .getValue ();
      },
      set_geometryType__: function ()
      {
         const gl = this .getBrowser () .getContext ();

         // geometryType

         this .geometryType = GeometryTypes [this ._geometryType .getValue ()] || POINT;

         gl .deleteProgram (this .program);

         // Create buffers

         switch (this .geometryType)
         {
            case POINT:
            {
               this .geometryContext .geometryType = 0;

               this .texCoordCount   = 0;
               this .vertexCount     = 1;
               this .texCoordBuffers = null;
               this .normalBuffer    = null;
               this .testWireframe   = false;
               this .primitiveMode   = gl .POINTS;
               this .program         = null;

               break;
            }
            case LINE:
            {
               this .geometryContext .geometryType = 1;

               this .texCoordCount   = 2;
               this .vertexCount     = 2;
               this .particleBuffer  = this .geometryParticleBuffer;
               this .positionBuffer  = this .geometryPositionBuffer;
               this .colorBuffer     = this .geometryColorBuffer;
               this .texCoordBuffers = null;
               this .normalBuffer    = null;
               this .vertexBuffer    = this .geometryVertexBuffer;
               this .testWireframe   = false;
               this .primitiveMode   = gl .LINES;

               this .program = this .createProgram ([
                  "particle",
                  "position",
                  "color",
                  "vertex"
               ],
               /* glsl */ `#version 300 es

               precision highp float;

               uniform float size [2];

               in vec4 input0;
               in vec4 input1;
               in vec4 input2;
               in vec4 input3;

               out vec4 particle;
               out vec4 position;
               out vec4 color;
               out vec4 vertex;

               void
               main ()
               {
                  vec3 normal = normalize (input2 .xyz);

                  particle = input0;
                  position = input3;
                  color    = input1;
                  vertex   = vec4 (position .xyz + normal * size [gl_VertexID % 2], 1.0);
               }
               `);

               this .program .outputs = [
                  this .geometryParticleBuffer,
                  this .geometryPositionBuffer,
                  this .geometryColorBuffer,
                  this .geometryVertexBuffer,
               ];

               this .program .uniforms = {
                  size: {
                     func: "uniform1fv",
                     location: gl .getUniformLocation (this .program, "size"),
                     value: new Float32Array (2),
                  },
               };

               break;
            }
            case TRIANGLE:
            case QUAD:
            case SPRITE:
            {
               // const
               //    texCoordArray = this .texCoordArray,
               //    normalArray   = this .normalArray;

               // for (let i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
               // {
               //    normalArray [i]     = 0;
               //    normalArray [i + 1] = 0;
               //    normalArray [i + 2] = 1;
               // }

               // gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
               // gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

               // for (let i = 0; i < maxParticles; ++ i)
               // {
               //    const i24 = i * 24;

               //    // p4 ------ p3
               //    // |       / |
               //    // |     /   |
               //    // |   /     |
               //    // | /       |
               //    // p1 ------ p2

               //    // p1
               //    texCoordArray [i24]     = texCoordArray [i24 + 12] = 0;
               //    texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = 0;
               //    texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = 0;
               //    texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = 1;

               //    // p2
               //    texCoordArray [i24 + 4] = 1;
               //    texCoordArray [i24 + 5] = 0;
               //    texCoordArray [i24 + 6] = 0;
               //    texCoordArray [i24 + 7] = 1;

               //    // p3
               //    texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = 1;
               //    texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = 1;
               //    texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = 0;
               //    texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = 1;

               //    // p4
               //    texCoordArray [i24 + 20] = 0;
               //    texCoordArray [i24 + 21] = 1;
               //    texCoordArray [i24 + 22] = 0;
               //    texCoordArray [i24 + 23] = 1;
               // }

               // gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
               // gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);

               this .geometryContext .geometryType = 2;

               this .texCoordCount   = 4;
               this .vertexCount     = 6;
               this .particleBuffer  = this .geometryParticleBuffer;
               this .positionBuffer  = this .geometryPositionBuffer;
               this .colorBuffer     = this .geometryColorBuffer;
               this .texCoordBuffers = this .geometryTexCoordBuffers;
               this .normalBuffer    = this .geometryNormalBuffer;
               this .vertexBuffer    = this .geometryVertexBuffer;
               this .testWireframe   = true;
               this .primitiveMode   = gl .TRIANGLES;

               break;
            }
            case GEOMETRY:
            {
               this .texCoordCount = 0;
               this .vertexCount   = 0;
               this .program       = null;
               break;
            }
         }

         this .resizeGeometryBuffers ();

         this .set_shader__ ();
         this .set_transparent__ ();
      },
      set_shader__: function ()
      {
         switch (this .geometryType)
         {
            case POINT:
            {
               this .shaderNode = this .getBrowser () .getPointShader ();
               break;
            }
            case LINE:
            {
               this .shaderNode = this .getBrowser () .getLineShader ();
               break;
            }
            default:
            {
               this .shaderNode = null;
               break;
            }
         }
      },
      set_maxParticles__: function ()
      {
         const
            lastMaxParticles = this .maxParticles,
            lastNumParticles = this .numParticles,
            maxParticles     = Math .max (0, this ._maxParticles .getValue ());

         this .maxParticles = maxParticles;
         this .numParticles = Math .min (this .numParticles, maxParticles);

         if (! this .emitterNode .isExplosive ())
            this .creationTime = performance .now () / 1000;

         this .resizeBuffers (lastMaxParticles, lastNumParticles);
      },
      set_particleLifetime__: function ()
      {
         this .particleLifetime = this ._particleLifetime .getValue ();
      },
      set_lifetimeVariation__: function ()
      {
         this .lifetimeVariation = this ._lifetimeVariation .getValue ();
      },
      set_emitter__: function ()
      {
         this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this ._emitter);

         if (! this .emitterNode)
            this .emitterNode = this .getBrowser () .getDefaultEmitter ();

         this .createParticles = this ._createParticles .getValue ();
      },
      set_physics__: function ()
      {
         const
            physics                  = this ._physics .getValue (),
            forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
            boundedPhysicsModelNodes [i] .removeInterest ("set_boundedPhysics__", this);

         forcePhysicsModelNodes   .length = 0;
         boundedPhysicsModelNodes .length = 0;

         for (let i = 0, length = physics .length; i < length; ++ i)
         {
            try
            {
               const
                  innerNode = physics [i] .getValue () .getInnerNode (),
                  type      = innerNode .getType ();

               for (let t = type .length - 1; t >= 0; -- t)
               {
                  switch (type [t])
                  {
                     case X3DConstants .ForcePhysicsModel:
                     case X3DConstants .WindPhysicsModel:
                     {
                        forcePhysicsModelNodes .push (innerNode);
                        break;
                     }
                     case X3DConstants .BoundedPhysicsModel:
                     {
                        innerNode .addInterest ("set_boundedPhysics__", this);
                        boundedPhysicsModelNodes .push (innerNode);
                        break;
                     }
                     default:
                        continue;
                  }

                  break;
               }
            }
            catch (error)
            { }
         }

         this .set_boundedPhysics__ ();
      },
      set_boundedPhysics__: function ()
      {
         const
            gl                       = this .getBrowser () .getContext (),
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
            boundedNormals           = this .boundedNormals,
            boundedVertices          = this .boundedVertices;

         boundedNormals  .length = 0;
         boundedVertices .length = 0;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
         {
            boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
         }

         // Texture

         const
            numBoundedVertices     = boundedVertices .length / 4,
            numBoundedNormals      = boundedNormals .length / 3,
            boundedVolumeArraySize = Math .ceil (Math .sqrt (numBoundedVertices + numBoundedNormals)),
            boundedVolumeArray     = new Float32Array (boundedVolumeArraySize * boundedVolumeArraySize * 4);

         boundedVolumeArray .set (boundedVertices);

         for (let s = numBoundedVertices * 4, n = 0, l = boundedNormals .length; n < l; s += 4, n += 3)
         {
            boundedVolumeArray [s + 0] = boundedNormals [n + 0];
            boundedVolumeArray [s + 1] = boundedNormals [n + 1];
            boundedVolumeArray [s + 2] = boundedNormals [n + 2];
         }

         this .numBoundedVertices = numBoundedVertices;
         this .numBoundedNormals  = numBoundedNormals;

         gl .bindTexture (gl .TEXTURE_2D, this .boundedVolumeTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedVolumeArraySize, boundedVolumeArraySize, 0, gl .RGBA, gl .FLOAT, boundedVolumeArray);

         // BVH

         const
            boundedVolumeHierarchyArray     = new BVH (boundedVertices, boundedNormals) .toArray ([ ]),
            boundedVolumeHierarchyLength    = boundedVolumeHierarchyArray .length / 4,
            boundedVolumeHierarchyArraySize = Math .ceil (Math .sqrt (boundedVolumeHierarchyLength));

         boundedVolumeHierarchyArray .length = boundedVolumeHierarchyArraySize * boundedVolumeHierarchyArraySize * 4;

         this .boundedVolumeHierarchyLength = boundedVolumeHierarchyLength;

         gl .bindTexture (gl .TEXTURE_2D, this .boundedVolumeHierarchyTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedVolumeHierarchyArraySize, boundedVolumeHierarchyArraySize, 0, gl .RGBA, gl .FLOAT, new Float32Array (boundedVolumeHierarchyArray));
      },
      set_colorRamp__: function ()
      {
         if (this .colorRampNode)
            this .colorRampNode .removeInterest ("set_color__", this);

         this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this ._colorRamp);

         if (this .colorRampNode)
            this .colorRampNode .addInterest ("set_color__", this);

         this .set_color__ ();
         this .set_transparent__ ();
      },
      set_color__: (function ()
      {
         const array = [ ];

         return function ()
         {
            const
               gl           = this .getBrowser () .getContext (),
               colorKey     = this ._colorKey,
               numColors    = colorKey .length,
               textureSize  = Math .ceil (Math .sqrt (numColors * 2));

            let colorRamp = this .colorRamp;

            if (numColors * 4 > colorRamp .length)
               colorRamp = this .colorRamp = new Float32Array (textureSize * textureSize * 4 * 2);

            for (let i = 0; i < numColors; ++ i)
               colorRamp [i * 4] = colorKey [i];

            array .length = 0;

            if (this .colorRampNode)
               colorRamp .set (this .colorRampNode .addColors (array, numColors), numColors * 4);
            else
               colorRamp .fill (1, numColors * 4);

            gl .bindTexture (gl .TEXTURE_2D, this .colorRampTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, colorRamp);

            this .numColors                      = numColors;
            this .geometryContext .colorMaterial = !! (numColors && this .colorRampNode);
         };
      })(),
      set_texCoordRamp__: function ()
      {
         if (this .texCoordRampNode)
            this .texCoordRampNode .removeInterest ("set_texCoord__", this);

         this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoordRamp);

         if (this .texCoordRampNode)
            this .texCoordRampNode .addInterest ("set_texCoord__", this);

         this .set_texCoord__ ();
      },
      set_texCoord__: function ()
      {
         const
            texCoordKey     = this ._texCoordKey,
            numTexCoordKeys = texCoordKey .length,
            texCoordKeys    = this .texCoordKeys,
            texCoordRamp    = this .texCoordRamp;

         for (let i = 0; i < numTexCoordKeys; ++ i)
            texCoordKeys [i] = texCoordKey [i];

         texCoordKeys .length = numTexCoordKeys;

         if (this .texCoordRampNode)
            this .texCoordRampNode .getTexCoord (texCoordRamp);

         for (let i = texCoordRamp .length, length = numTexCoordKeys * this .texCoordCount; i < length; ++ i)
            texCoordRamp [i] = new Vector4 (0, 0, 0, 0);

         texCoordRamp .length = numTexCoordKeys * this .texCoordCount;

         this .texCoordAnim = !! (numTexCoordKeys && this .texCoordRampNode);
      },
      intersectsBox: function (box, clipPlanes)
      {
         // TODO: implement me.
      },
      createProgram: function (varyings, vertexShaderSource)
      {
         const gl = this .getBrowser () .getContext ();

         const fragmentShaderSource = /* glsl */ `#version 300 es

         precision highp float;

         void
         main () { }
         `;

         // Vertex shader

         const vertexShader = gl .createShader (gl .VERTEX_SHADER);

         gl .shaderSource (vertexShader, vertexShaderSource);
         gl .compileShader (vertexShader);

         // Fragment shader

         const fragmentShader = gl .createShader (gl .FRAGMENT_SHADER);

         gl .shaderSource (fragmentShader, fragmentShaderSource);
         gl .compileShader (fragmentShader);

         // Program

         const program = gl .createProgram ();

         gl .attachShader (program, vertexShader);
         gl .attachShader (program, fragmentShader);
         gl .transformFeedbackVaryings (program, varyings, gl .SEPARATE_ATTRIBS);
         gl .linkProgram (program);

         if (!gl .getProgramParameter (program, gl .LINK_STATUS))
            console .error ("Couldn't initialize particle shader: " + gl .getProgramInfoLog (program));

         program .inputs = [
            gl .getAttribLocation (program, "input0"),
            gl .getAttribLocation (program, "input1"),
            gl .getAttribLocation (program, "input2"),
            gl .getAttribLocation (program, "input3"),
         ];

         return program;
      },
      createTexture: function ()
      {
         const
            gl      = this .getBrowser () .getContext (),
            texture = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, texture);

         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 0, 0, 0, gl .RGBA, gl .FLOAT, null);

         return texture;
      },
      resizeBuffers: function (lastMaxParticles, lastNumParticles)
      {
         const
            gl         = this .getBrowser () .getContext (),
            inputData  = new Float32Array (lastNumParticles * 4);

         const outputData = lastNumParticles < this .maxParticles
            ? new Float32Array (this .maxParticles * 4)
            : inputData;

         // Resize input and output buffers.

         for (const buffer of this .outputParticles)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
            gl .getBufferSubData (gl .ARRAY_BUFFER, 0, inputData);

            if (lastNumParticles < this .maxParticles)
               outputData .set (inputData);

            gl .bufferData (gl .ARRAY_BUFFER, outputData, gl .STATIC_DRAW, 0, this .maxParticles * 4);
         }

         for (const buffer of this .inputParticles)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
            gl .bufferData (gl .ARRAY_BUFFER, outputData, gl .STATIC_DRAW, 0, this .maxParticles * 4);
         }

         // Resize geometry buffers.

         this .resizeGeometryBuffers ();
      },
      resizeGeometryBuffers: function ()
      {
         const gl = this .getBrowser () .getContext ();

         const buffers = [
            this .geometryParticleBuffer,
            this .geometryPositionBuffer,
            this .geometryColorBuffer,
            this .geometryTexCoordBuffers [0],
            this .geometryNormalBuffer,
            this .geometryVertexBuffer,
         ];

         const geometryData = new Float32Array (this .maxParticles * this .vertexCount * 4);

         for (const buffer of buffers)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
            gl .bufferData (gl .ARRAY_BUFFER, geometryData, gl .STATIC_DRAW);
         }
      },
      animateParticles: function ()
      {
         const
            browser     = this .getBrowser (),
            gl          = browser .getContext (),
            emitterNode = this .emitterNode;

         // Determine delta time

         const
            DELAY = 15, // Delay in frames when dt fully applies.
            dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

         // let deltaTime is only for the emitter, this.deltaTime is for the forces.
         let deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

         // Determine numParticles

         if (emitterNode .isExplosive ())
         {
            const
               now              = performance .now () / 1000,
               particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

            if (this .numParticles === 0 || now - this .creationTime > particleLifetime)
            {
               this .creationTime    = now;
               this .numParticles    = this .maxParticles;
               this .createParticles = this ._createParticles .getValue ();

               deltaTime = Number .POSITIVE_INFINITY;
            }
            else
               this .createParticles = false;
         }
         else
         {
            if (this .numParticles < this .maxParticles)
            {
               const
                  now          = performance .now () / 1000,
                  newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

               if (newParticles)
                  this .creationTime = now;

               this .numParticles = Math .floor (Math .min (this .maxParticles, this .numParticles + newParticles));
            }
         }

         // Apply forces.

         if (emitterNode .getMass ())
         {
            const forcePhysicsModelNodes = this .forcePhysicsModelNodes;

            let
               numForces  = forcePhysicsModelNodes .length,
               forces     = this .forces,
               timeByMass = deltaTime / emitterNode .getMass ();

            // Collect forces in velocities and collect turbulences.

            if (numForces * 4 > forces .length)
               forces = this .forces = new Float32Array (numForces * 4);

            let disabledForces = 0;

            for (let i = 0; i < numForces; ++ i)
            {
               disabledForces += !forcePhysicsModelNodes [i] .addForce (i - disabledForces, emitterNode, timeByMass, forces);
            }

            this .numForces = numForces -= disabledForces;

            gl .bindTexture (gl .TEXTURE_2D, this .forcesTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, numForces, 1, 0, gl .RGBA, gl .FLOAT, forces);
         }
         else
         {
            this .numForces = 0;
         }

         // Determine particle position, velocity and colors.

         const inputParticles = this .outputParticles;

         this .outputParticles = emitterNode .animate (this, deltaTime);
         this .inputParticles  = inputParticles;

         this .updateGeometry (null);
         browser .addBrowserEvent ();
      },
      updateGeometry: function (modelViewMatrix)
      {
         switch (this .geometryType)
         {
            case POINT:
               if (! modelViewMatrix)
                  this .updatePoint ();
               break;
            case LINE:
               if (! modelViewMatrix)
                  this .updateLine ();
               break;
            case TRIANGLE:
            case QUAD:
            case SPRITE:
               this .updateQuad (modelViewMatrix);
               break;
            case GEOMETRY:
               break;
         }
      },
      updatePoint: function ()
      {
         const outputParticles = this .outputParticles;

         this .particleBuffer = outputParticles [0];
         this .positionBuffer = outputParticles [3];
         this .colorBuffer    = outputParticles [1];
         this .vertexBuffer   = outputParticles [3];
      },
      updateLine: function ()
      {
         const
            gl        = this .getBrowser () .getContext (),
            program   = this .program,
            uniforms  = program .uniforms,
            sizeArray = uniforms .size .value,
            size1_2   = this ._particleSize .y / 2;

         sizeArray [0] = -size1_2;
         sizeArray [1] =  size1_2;

         this .updateBuffers (gl, program, uniforms);
      },
      updateQuad: function (modelViewMatrix)
      {
         // try
         // {
         //    const
         //       gl           = this .getBrowser () .getContext (),
         //       particles    = this .particles,
         //       maxParticles = this .maxParticles,
         //       numParticles = this .numParticles,
         //       normalArray  = this .normalArray,
         //       sx1_2        = this ._particleSize .x / 2,
         //       sy1_2        = this ._particleSize .y / 2;

         //    // Colors

         //    if (! modelViewMatrix) // if called from animateParticles
         //    {
         //       if (this .geometryContext .colorMaterial)
         //       {
         //          for (let i = 0; i < maxParticles; ++ i)
         //          {
         //             const
         //                color = particles [i] .color,
         //                i24   = i * 24;

         //             // p4 ------ p3
         //             // |       / |
         //             // |     /   |
         //             // |   /     |
         //             // | /       |
         //             // p1 ------ p2

         //             // p1, p2, p3; p1, p3, p4
         //             colorArray [i24]     = colorArray [i24 + 4] = colorArray [i24 + 8]  = colorArray [i24 + 12] = colorArray [i24 + 16] = colorArray [i24 + 20] = color .x;
         //             colorArray [i24 + 1] = colorArray [i24 + 5] = colorArray [i24 + 9]  = colorArray [i24 + 13] = colorArray [i24 + 17] = colorArray [i24 + 21] = color .y;
         //             colorArray [i24 + 2] = colorArray [i24 + 6] = colorArray [i24 + 10] = colorArray [i24 + 14] = colorArray [i24 + 18] = colorArray [i24 + 22] = color .z;
         //             colorArray [i24 + 3] = colorArray [i24 + 7] = colorArray [i24 + 11] = colorArray [i24 + 15] = colorArray [i24 + 19] = colorArray [i24 + 23] = color .w;
         //          }

         //          gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
         //          gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
         //       }

         //       if (this .texCoordAnim && this .texCoordArray .length)
         //       {
         //          const
         //             texCoordKeys = this .texCoordKeys,
         //             texCoordRamp = this .texCoordRamp,
         //             length       = texCoordKeys .length;

         //          let index0 = 0;

         //          for (let i = 0; i < maxParticles; ++ i)
         //          {
         //             // Determine index0.

         //             const
         //                particle = particles [i],
         //                fraction = particle .elapsedTime / particle .lifetime;

         //             if (length == 1 || fraction <= texCoordKeys [0])
         //             {
         //                index0 = 0;
         //             }
         //             else if (fraction >= texCoordKeys .at (-1))
         //             {
         //                index0 = length - 2;
         //             }
         //             else
         //             {
         //                const index = Algorithm .upperBound (texCoordKeys, 0, length, fraction, Algorithm .less);

         //                if (index < length)
         //                   index0 = index - 1;
         //                else
         //                   index0 = 0;
         //             }

         //             // Set texCoord.

         //             index0 *= this .texCoordCount;

         //             const
         //                texCoord1 = texCoordRamp [index0],
         //                texCoord2 = texCoordRamp [index0 + 1],
         //                texCoord3 = texCoordRamp [index0 + 2],
         //                texCoord4 = texCoordRamp [index0 + 3],
         //                i24       = i * 24;

         //             // p4 ------ p3
         //             // |       / |
         //             // |     /   |
         //             // |   /     |
         //             // | /       |
         //             // p1 ------ p2

         //             // p1
         //             texCoordArray [i24]     = texCoordArray [i24 + 12] = texCoord1 .x;
         //             texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = texCoord1 .y;
         //             texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = texCoord1 .z;
         //             texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = texCoord1 .w;

         //             // p2
         //             texCoordArray [i24 + 4] = texCoord2 .x;
         //             texCoordArray [i24 + 5] = texCoord2 .y;
         //             texCoordArray [i24 + 6] = texCoord2 .z;
         //             texCoordArray [i24 + 7] = texCoord2 .w;

         //             // p3
         //             texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = texCoord3 .x;
         //             texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = texCoord3 .y;
         //             texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = texCoord3 .z;
         //             texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = texCoord3 .w;

         //             // p4
         //             texCoordArray [i24 + 20] = texCoord4 .x;
         //             texCoordArray [i24 + 21] = texCoord4 .y;
         //             texCoordArray [i24 + 22] = texCoord4 .z;
         //             texCoordArray [i24 + 23] = texCoord4 .w;
         //          }

         //          gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
         //          gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);
         //       }
         //    }

         //    // Vertices

         //    if (this .geometryType === SPRITE)
         //    {
         //       if (modelViewMatrix) // if called from depth or draw
         //       {
         //          // Normals

         //          const rotation = this .getScreenAlignedRotation (modelViewMatrix);

         //          normal
         //             .set (rotation [0], rotation [1], rotation [2])
         //             .cross (vector .set (rotation [3], rotation [4], rotation [5]))
         //             .normalize ();

         //          const
         //             nx = normal .x,
         //             ny = normal .y,
         //             nz = normal .z;

         //          for (let i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
         //          {
         //             normalArray [i]     = nx;
         //             normalArray [i + 1] = ny;
         //             normalArray [i + 2] = nz;
         //          }

         //          gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
         //          gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

         //          // Vertices

         //          s1 .set (-sx1_2, -sy1_2, 0);
         //          s2 .set ( sx1_2, -sy1_2, 0);
         //          s3 .set ( sx1_2,  sy1_2, 0);
         //          s4 .set (-sx1_2,  sy1_2, 0);

         //          rotation .multVecMatrix (s1);
         //          rotation .multVecMatrix (s2);
         //          rotation .multVecMatrix (s3);
         //          rotation .multVecMatrix (s4);

         //          for (let i = 0; i < numParticles; ++ i)
         //          {
         //             const
         //                position    = particles [i] .position,
         //                elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
         //                x           = position .x,
         //                y           = position .y,
         //                z           = position .z,
         //                i6          = i * 6,
         //                i18         = i * 18,
         //                i24         = i * 24;

         //             // p4 ------ p3
         //             // |       / |
         //             // |     /   |
         //             // |   /     |
         //             // | /       |
         //             // p1 ------ p2


         //             positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
         //             positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
         //             positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

         //             elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
         //             lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

         //             // p1
         //             vertexArray [i24]     = vertexArray [i24 + 12] = x + s1 .x;
         //             vertexArray [i24 + 1] = vertexArray [i24 + 13] = y + s1 .y;
         //             vertexArray [i24 + 2] = vertexArray [i24 + 14] = z + s1 .z;

         //             // p2
         //             vertexArray [i24 + 4] = x + s2 .x;
         //             vertexArray [i24 + 5] = y + s2 .y;
         //             vertexArray [i24 + 6] = z + s2 .z;

         //             // p3
         //             vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + s3 .x;
         //             vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + s3 .y;
         //             vertexArray [i24 + 10] = vertexArray [i24 + 18] = z + s3 .z;

         //             // p4
         //             vertexArray [i24 + 20] = x + s4 .x;
         //             vertexArray [i24 + 21] = y + s4 .y;
         //             vertexArray [i24 + 22] = z + s4 .z;
         //          }

         //          gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
         //          gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
         //       }
         //    }
         //    else
         //    {
         //       if (! modelViewMatrix) // if called from animateParticles
         //       {
         //          for (let i = 0; i < numParticles; ++ i)
         //          {
         //             const
         //                position    = particles [i] .position,
         //                elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
         //                x           = position .x,
         //                y           = position .y,
         //                z           = position .z,
         //                i6          = i * 6,
         //                i18         = i * 18,
         //                i24         = i * 24;

         //             // p4 ------ p3
         //             // |       / |
         //             // |     /   |
         //             // |   /     |
         //             // | /       |
         //             // p1 ------ p2

         //             positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
         //             positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
         //             positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

         //             elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
         //             lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

         //             // p1
         //             vertexArray [i24]     = vertexArray [i24 + 12] = x - sx1_2;
         //             vertexArray [i24 + 1] = vertexArray [i24 + 13] = y - sy1_2;
         //             vertexArray [i24 + 2] = vertexArray [i24 + 14] = z;

         //             // p2
         //             vertexArray [i24 + 4] = x + sx1_2;
         //             vertexArray [i24 + 5] = y - sy1_2;
         //             vertexArray [i24 + 6] = z;

         //             // p3
         //             vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + sx1_2;
         //             vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + sy1_2;
         //             vertexArray [i24 + 10] = vertexArray [i24 + 18] = z;

         //             // p4
         //             vertexArray [i24 + 20] = x - sx1_2;
         //             vertexArray [i24 + 21] = y + sy1_2;
         //             vertexArray [i24 + 22] = z;
         //          }

         //          gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
         //          gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
         //       }
         //    }
         // }
         // catch (error)
         // {
         //    console .error (error);
         // }
      },
      updateBuffers: function (gl, program, uniforms)
      {
         const
            outputParticles = this .outputParticles,
            inputs          = program .inputs;

         gl .useProgram (program);

         for (const key in uniforms)
         {
            const { func, location, value } = uniforms [key];

            gl [func] (location, value);
         }

         for (let i = 0; i < 4; ++ i)
         {
            const attribute = inputs [i];

            if (attribute < 0)
               continue;

            gl .enableVertexAttribArray (attribute);
            gl .bindBuffer (gl .ARRAY_BUFFER, outputParticles [i]);
            gl .vertexAttribPointer (attribute, 4, gl .FLOAT, false, 0, 0);
            gl .vertexAttribDivisor (attribute, 1);
         }

         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, this .transformFeedBack);

         for (let i = 0, l = program .outputs .length; i < l; ++ i)
            gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, i, program .outputs [i]);

         gl .bindBuffer (gl .ARRAY_BUFFER, null);
         gl .enable (gl .RASTERIZER_DISCARD);
         gl .beginTransformFeedback (gl .POINTS);
         gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount, this .numParticles);
         gl .endTransformFeedback ();
         gl .disable (gl .RASTERIZER_DISCARD);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

         for (let i = 0; i < 4; ++ i)
         {
            const attribute = inputs [i];

            if (attribute < 0)
               continue;

            gl .vertexAttribDivisor (attribute, 0);
         }

         // const data = new Float32Array (this .maxParticles * this .vertexCount * 4);
         // gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
         // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
         // console .log (data .slice (0, 4));
      },
      traverse: function (type, renderObject)
      {
         if (! this ._isActive .getValue ())
            return;

         switch (type)
         {
            case TraverseType .POINTER:
            {
               break;
            }
            case TraverseType .PICKING:
            {
               break;
            }
            case TraverseType .COLLISION:
            {
               // TODO: to be implemented.
               break;
            }
            case TraverseType .SHADOW:
            {
               if (this ._castShadow .getValue ())
                  renderObject .addDepthShape (this);

               break;
            }
            case TraverseType .DISPLAY:
            {
               if (renderObject .addDisplayShape (this))
                  this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

               break;
            }
         }

         if (this .geometryType === GEOMETRY)
         {
            if (this .getGeometry ())
               this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
         }
      },
      depth: function (gl, context, shaderNode)
      {
         // Update geometry if SPRITE.

         this .updateGeometry (context .modelViewMatrix);

         // Display geometry.

         if (this .geometryType === GEOMETRY)
         {
            const geometryNode = this .getGeometry ();

            if (geometryNode)
               geometryNode .displayParticlesDepth (gl, context, shaderNode, this .outputParticles, this .numParticles);
         }
         else
         {
            if (this .numParticles <= 0)
               return;

            if (shaderNode .getValid ())
            {
               // Setup vertex attributes.

               //shaderNode .enableFloatAttrib (gl, "x3d_ParticleId", this .idBuffer, 1);
               shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

               gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);

               //shaderNode .disableFloatAttrib (gl, "x3d_ParticleId");
            }
         }
      },
      display: function (gl, context)
      {
         try
         {
            if (this .numParticles <= 0)
               return;

            // Update geometry if SPRITE.

            this .updateGeometry (context .modelViewMatrix);

            // Display geometry.

            if (this .geometryType === GEOMETRY)
            {
               const geometryNode = this .getGeometry ();

               if (geometryNode)
                  geometryNode .displayParticles (gl, context, this .outputParticles, this .numParticles);
            }
            else
            {
               const
                  appearanceNode = this .getAppearance (),
                  shaderNode     = appearanceNode .shaderNode || this .shaderNode || appearanceNode .materialNode .getShader (context .browser, context .shadow);

               // Setup shader.

               if (shaderNode .getValid ())
               {
                  context .geometryContext = this .geometryContext;

                  const blendModeNode = appearanceNode .blendModeNode;

                  if (blendModeNode)
                     blendModeNode .enable (gl);

                  shaderNode .enable (gl);
                  shaderNode .setLocalUniforms (gl, context);

                  // Setup vertex attributes.

                  shaderNode .enableFloatAttrib (gl, "x3d_Particle",         this .particleBuffer, 4);
                  shaderNode .enableFloatAttrib (gl, "x3d_ParticlePosition", this .positionBuffer, 4);

                  if (this .geometryContext .colorMaterial)
                     shaderNode .enableColorAttribute (gl, this .colorBuffer);

                  if (this .texCoordBuffers)
                     shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);

                  if (this .normalBuffer)
                     shaderNode .enableNormalAttribute (gl, this .normalBuffer);

                  shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

                  if (shaderNode .wireframe && this .testWireframe)
                  {
                     // Wireframes are always solid so only one drawing call is needed.

                     for (let i = 0, length = this .numParticles * this .vertexCount; i < length; i += 3)
                        gl .drawArrays (shaderNode .primitiveMode, i, 3);
                  }
                  else
                  {
                     const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

                     gl .frontFace (positiveScale ? gl .CCW : gl .CW);
                     gl .enable (gl .CULL_FACE);
                     gl .cullFace (gl .BACK);

                     gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);
                  }

                  shaderNode .disableFloatAttrib (gl, "x3d_Particle");
                  shaderNode .disableFloatAttrib (gl, "x3d_ParticlePosition");

                  shaderNode .disableColorAttribute    (gl);
                  shaderNode .disableTexCoordAttribute (gl);
                  shaderNode .disableNormalAttribute   (gl);

                  if (blendModeNode)
                     blendModeNode .disable (gl);

                  context .geometryContext = null;
               }
            }
         }
         catch (error)
         {
            // Catch error from setLocalUniforms.
            console .error (error);
         }
      },
      getScreenAlignedRotation: (function ()
      {
         const
            invModelViewMatrix = new Matrix4 (),
            billboardToScreen  = new Vector3 (0, 0, 0),
            viewerYAxis        = new Vector3 (0, 0, 0),
            x                  = new Vector3 (0, 0, 0),
            y                  = new Vector3 (0, 0, 0),
            rotation           = new Matrix3 ();

         return function (modelViewMatrix)
         {
            invModelViewMatrix .assign (modelViewMatrix) .inverse ();

            invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .zAxis));
            invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis));

            x .assign (viewerYAxis) .cross (billboardToScreen);
            y .assign (billboardToScreen) .cross (x);
            const z = billboardToScreen;

            // Compose rotation

            x .normalize ();
            y .normalize ();
            z .normalize ();

            return rotation .set (x .x, x .y, x .z,
                                  y .x, y .y, y .z,
                                  z .x, z .y, z .z);
         };
      })(),
   });

   return ParticleSystem;
});
