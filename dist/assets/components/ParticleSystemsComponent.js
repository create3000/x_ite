/* X_ITE v10.5.3 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-10.5.3")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 254:
/***/ ((module) => {

module.exports = __X_ITE_X3D__ .jquery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .GeometryTypes"
const external_X_ITE_X3D_GeometryTypes_namespaceObject = __X_ITE_X3D__ .GeometryTypes;
var external_X_ITE_X3D_GeometryTypes_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GeometryTypes_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Line3.glsl.js
const __default__ = /* glsl */ `
#if defined(X3D_BOUNDED_VOLUME)||defined(X3D_VOLUME_EMITTER)
struct Line3{vec3 point;vec3 direction;};bool intersects(const in Line3 line,const in vec3 a,const in vec3 b,const in vec3 c,out vec3 r){vec3 edge1=b-a;vec3 edge2=c-a;vec3 pvec=cross(line.direction,edge2);float det=dot(edge1,pvec);if(det==0.0)return false;float inv_det=1.0/det;vec3 tvec=line.point-a;float u=dot(tvec,pvec)*inv_det;if(u<0.0||u>1.0)return false;vec3 qvec=cross(tvec,edge1);float v=dot(line.direction,qvec)*inv_det;if(v<0.0||u+v>1.0)return false;r=vec3(u,v,1.0-u-v);return true;}
#endif
`
;

/* harmony default export */ const Line3_glsl = (external_X_ITE_X3D_Namespace_default().add ("Line3.glsl", __default__));
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Plane3.glsl.js
const Plane3_glsl_default_ = /* glsl */ `
#if defined(X3D_BOUNDED_VOLUME)||defined(X3D_VOLUME_EMITTER)
struct Plane3{vec3 normal;float distanceFromOrigin;};Plane3 plane3(const in vec3 point,const in vec3 normal){return Plane3(normal,dot(normal,point));}float plane_distance(const in Plane3 plane,const in vec3 point){return dot(point,plane.normal)-plane.distanceFromOrigin;}bool intersects(const in Plane3 plane,const in Line3 line,out vec3 point){float theta=dot(line.direction,plane.normal);if(theta==0.0)return false;float t=(plane.distanceFromOrigin-dot(plane.normal,line.point))/theta;point=line.point+line.direction*t;return true;}void sort(inout vec4 points[ARRAY_SIZE],const in int count,const in Plane3 plane){const float shrink=1.0/1.3;int gap=count;bool exchanged=true;while(exchanged){gap=int(float(gap)*shrink);if(gap<=1){exchanged=false;gap=1;}for(int i=0,l=count-gap;i<l;++i){int j=gap+i;if(plane_distance(plane,points[i].xyz)>plane_distance(plane,points[j].xyz)){vec4 tmp1=points[i];points[i]=points[j];points[j]=tmp1;exchanged=true;}}}}int min_index(const in vec4 points[ARRAY_SIZE],const in int count,const in float value,const in Plane3 plane){int index=-1;float dist=1000000.0;for(int i=0;i<count;++i){float d=plane_distance(plane,points[i].xyz);if(d>=value&&d<dist){dist=d;index=i;}}return index;}
#endif
`
;

/* harmony default export */ const Plane3_glsl = (external_X_ITE_X3D_Namespace_default().add ("Plane3.glsl", Plane3_glsl_default_));
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Box3.glsl.js
const Box3_glsl_default_ = /* glsl */ `
#if defined(X3D_VOLUME_EMITTER)||defined(X3D_BOUNDED_VOLUME)
bool intersects(const in vec3 min,const in vec3 max,const in Line3 line){vec3 intersection;if(intersects(plane3(max,vec3(0.0,0.0,1.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xy,max.xy),vec4(min.xy,intersection.xy))))return true;}if(intersects(plane3(min,vec3(0.0,0.0,-1.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xy,max.xy),vec4(min.xy,intersection.xy))))return true;}if(intersects(plane3(max,vec3(0.0,1.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xz,max.xz),vec4(min.xz,intersection.xz))))return true;}if(intersects(plane3(min,vec3(0.0,-1.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xz,max.xz),vec4(min.xz,intersection.xz))))return true;}if(intersects(plane3(max,vec3(1.0,0.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.yz,max.yz),vec4(min.yz,intersection.yz))))return true;}return false;}
#endif
`
;

/* harmony default export */ const Box3_glsl = (external_X_ITE_X3D_Namespace_default().add ("Box3.glsl", Box3_glsl_default_));
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/BVH.glsl.js
const BVH_glsl_default_ = /* glsl */ `
#if defined(X3D_VOLUME_EMITTER)||defined(X3D_BOUNDED_VOLUME)
#define BVH_NODE 0
#define BVH_TRIANGLE 1
#define BVH_STACK_SIZE 32
int bvhNodeIndex=0;void setBVHIndex(const in int index){bvhNodeIndex=index;}int getBVHRoot(const in sampler2D volume,const in int hierarchyIndex,const in int rootIndex){return int(texelFetch(volume,rootIndex,0).x)+hierarchyIndex;}int getBVHType(const in sampler2D volume){return int(texelFetch(volume,bvhNodeIndex,0).x);}vec3 getBVHMin(const in sampler2D volume){return texelFetch(volume,bvhNodeIndex+1,0).xyz;}vec3 getBVHMax(const in sampler2D volume){return texelFetch(volume,bvhNodeIndex+2,0).xyz;}int getBVHLeft(const in sampler2D volume,const in int hierarchyIndex){return int(texelFetch(volume,bvhNodeIndex,0).y)+hierarchyIndex;}int getBVHRight(const in sampler2D volume,const in int hierarchyIndex){return int(texelFetch(volume,bvhNodeIndex,0).z)+hierarchyIndex;}int getBVHTriangle(const in sampler2D volume){return int(texelFetch(volume,bvhNodeIndex,0).y);}
#if defined(X3D_VOLUME_EMITTER)
int getIntersections(const in sampler2D volume,const in int verticesIndex,const in int hierarchyIndex,const in int rootIndex,const in Line3 line,out vec4 points[ARRAY_SIZE]){int current=getBVHRoot(volume,hierarchyIndex,rootIndex);int count=0;int stackIndex=-1;int stack[BVH_STACK_SIZE];while(stackIndex>=0||current>=0){if(current>=0){setBVHIndex(current);if(getBVHType(volume)==BVH_NODE){if(intersects(getBVHMin(volume),getBVHMax(volume),line)){stack[++stackIndex]=current;current=getBVHLeft(volume,hierarchyIndex);}else{current=-1;}}else{int t=getBVHTriangle(volume);int v=verticesIndex+t;vec3 r=vec3(0.0);vec3 a=texelFetch(volume,v,0).xyz;vec3 b=texelFetch(volume,v+1,0).xyz;vec3 c=texelFetch(volume,v+2,0).xyz;if(intersects(line,a,b,c,r))points[count++]=vec4(r.z*a+r.x*b+r.y*c,1.0);current=-1;}}else{setBVHIndex(stack[stackIndex--]);current=getBVHRight(volume,hierarchyIndex);}}return count;}
#endif
#if defined(X3D_BOUNDED_VOLUME)
int getIntersections(const in sampler2D volume,const in int verticesIndex,const in int normalsIndex,const in int hierarchyIndex,const in int rootIndex,const in Line3 line,out vec4 points[ARRAY_SIZE],out vec3 normals[ARRAY_SIZE]){int current=getBVHRoot(volume,hierarchyIndex,rootIndex);int count=0;int stackIndex=-1;int stack[BVH_STACK_SIZE];while(stackIndex>=0||current>=0){if(current>=0){setBVHIndex(current);if(getBVHType(volume)==BVH_NODE){if(intersects(getBVHMin(volume),getBVHMax(volume),line)){stack[++stackIndex]=current;current=getBVHLeft(volume,hierarchyIndex);}else{current=-1;}}else{int t=getBVHTriangle(volume);int v=verticesIndex+t;vec3 r=vec3(0.0);vec3 a=texelFetch(volume,v,0).xyz;vec3 b=texelFetch(volume,v+1,0).xyz;vec3 c=texelFetch(volume,v+2,0).xyz;if(intersects(line,a,b,c,r)){points[count]=vec4(r.z*a+r.x*b+r.y*c,1.0);int n=normalsIndex+t;vec3 n0=texelFetch(volume,n,0).xyz;vec3 n1=texelFetch(volume,n+1,0).xyz;vec3 n2=texelFetch(volume,n+2,0).xyz;normals[count]=r.z*n0+r.x*n1+r.y*n2;++count;}current=-1;}}else{setBVHIndex(stack[stackIndex--]);current=getBVHRight(volume,hierarchyIndex);}}return count;}
#endif
#endif
`
;

/* harmony default export */ const BVH_glsl = (external_X_ITE_X3D_Namespace_default().add ("BVH.glsl", BVH_glsl_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/X3DParticleEmitterNode.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function X3DParticleEmitterNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DParticleEmitterNode);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "bbox_changed", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   this ._speed       .setUnit ("speed");
   this ._mass        .setUnit ("mass");
   this ._surfaceArea .setUnit ("area");

   this .defines   = [ ];
   this .samplers  = [ ];
   this .uniforms  = new Map ();
   this .callbacks = [ ];
   this .functions = [ ];
   this .programs  = new Map ();
}

Object .assign (Object .setPrototypeOf (X3DParticleEmitterNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DNode_default().prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      // Create program.

      this .transformFeedback = gl .createTransformFeedback ();

      // Initialize fields.

      this ._on          .addInterest ("set_on__",          this);
      this ._speed       .addInterest ("set_speed__",       this);
      this ._variation   .addInterest ("set_variation__",   this);
      this ._mass        .addInterest ("set_mass__",        this);
      this ._surfaceArea .addInterest ("set_surfaceArea__", this);

      this .addSampler ("forces");
      this .addSampler ("boundedVolume");
      this .addSampler ("colorRamp");
      this .addSampler ("texCoordRamp");

      this .addUniform ("speed",     "uniform float speed;");
      this .addUniform ("variation", "uniform float variation;");

      this .addCallback (this .set_speed__);
      this .addCallback (this .set_variation__);

      this .addFunction (Line3_glsl);
      this .addFunction (Plane3_glsl);
      this .addFunction (Box3_glsl);
      this .addFunction (BVH_glsl);

      this .set_on__ ();
      this .set_mass__ ();
      this .set_surfaceArea__ ();
   },
   isExplosive ()
   {
      return false;
   },
   getMass ()
   {
      return this .mass;
   },
   getSurfaceArea ()
   {
      return this .surfaceArea;
   },
   set_on__ ()
   {
      this .on = this ._on .getValue ();
   },
   set_speed__ ()
   {
      this .setUniform ("uniform1f", "speed", Math .max (this ._speed .getValue (), 0));
   },
   set_variation__ ()
   {
      this .setUniform ("uniform1f", "variation", Math .max (this ._variation .getValue (), 0));
   },
   set_mass__ ()
   {
      this .mass = Math .max (this ._mass .getValue (), 0);
   },
   set_surfaceArea__ ()
   {
      this .surfaceArea = Math .max (this ._surfaceArea .getValue (), 0);
   },
   getRandomValue (min, max)
   {
      return Math .random () * (max - min) + min;
   },
   getRandomNormal (normal)
   {
      const
         theta = this .getRandomValue (-1, 1) * Math .PI,
         cphi  = this .getRandomValue (-1, 1),
         phi   = Math .acos (cphi),
         r     = Math .sin (phi);

      return normal .set (Math .sin (theta) * r,
                          Math .cos (theta) * r,
                          cphi);
   },
   animate (particleSystem, deltaTime)
   {
      const
         browser        = this .getBrowser (),
         gl             = browser .getContext (),
         program        = this .getProgram (particleSystem),
         inputParticles = particleSystem .inputParticles;

      // Start

      gl .useProgram (program);

      // Uniforms

      gl .uniform1i (program .randomSeed,        Math .random () * 0xffffffff);
      gl .uniform1f (program .particleLifetime,  particleSystem .particleLifetime);
      gl .uniform1f (program .lifetimeVariation, particleSystem .lifetimeVariation);
      gl .uniform1f (program .deltaTime,         deltaTime);
      gl .uniform2f (program .particleSize,      particleSystem ._particleSize .x, particleSystem ._particleSize .y);

      // Forces

      if (particleSystem .numForces)
      {
         gl .activeTexture (gl .TEXTURE0 + program .forcesTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .forcesTexture);
      }

      // Bounded Physics

      if (particleSystem .boundedHierarchyRoot > -1)
      {
         gl .uniform1i (program .boundedVerticesIndex,  particleSystem .boundedVerticesIndex);
         gl .uniform1i (program .boundedNormalsIndex,   particleSystem .boundedNormalsIndex);
         gl .uniform1i (program .boundedHierarchyIndex, particleSystem .boundedHierarchyIndex);
         gl .uniform1i (program .boundedHierarchyRoot,  particleSystem .boundedHierarchyRoot);

         gl .activeTexture (gl .TEXTURE0 + program .boundedVolumeTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .boundedTexture);
      }

      // Colors

      if (particleSystem .numColors)
      {
         gl .activeTexture (gl .TEXTURE0 + program .colorRampTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .colorRampTexture);
      }

      // TexCoords

      if (particleSystem .numTexCoords)
      {
         gl .uniform1i (program .texCoordCount, particleSystem .texCoordCount);

         gl .activeTexture (gl .TEXTURE0 + program .texCoordRampTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .texCoordRampTexture);
      }

      // Other textures

      this .activateTextures (gl, program);

      // Input attributes

      if (inputParticles .vertexArrayObject .enable (program))
      {
         const { particlesStride, particleOffsets } = particleSystem;

         for (const [i, attribute] of program .inputs)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, inputParticles);
            gl .enableVertexAttribArray (attribute);
            gl .vertexAttribPointer (attribute, 4, gl .FLOAT, false, particlesStride, particleOffsets [i]);
         }
      }

      // Transform particles.

      gl .bindFramebuffer (gl .FRAMEBUFFER, browser .getDefaultFrameBuffer ()); // Prevent texture feedback loop error, see NYC in Firefox.
      gl .bindBuffer (gl .ARRAY_BUFFER, null);
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, this .transformFeedback);
      gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, particleSystem .outputParticles);
      gl .enable (gl .RASTERIZER_DISCARD);
      gl .beginTransformFeedback (gl .POINTS);
      gl .drawArrays (gl .POINTS, 0, particleSystem .numParticles);
      gl .endTransformFeedback ();
      gl .disable (gl .RASTERIZER_DISCARD);
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

      // DEBUG

      // const data = new Float32Array (particleSystem .numParticles * (particleSystem .particlesStride / 4));
      // gl .bindBuffer (gl .ARRAY_BUFFER, particleSystem .outputParticles);
      // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
      // console .log (data .slice (0, particleSystem .particlesStride / 4));
   },
   addDefine (define)
   {
      this .defines .push (define);
   },
   addSampler (name)
   {
      this .samplers .push (name);
   },
   addUniform (name, uniform)
   {
      this .uniforms .set (name, uniform);
   },
   setUniform (func, name, value1, value2, value3)
   {
      const gl = this .getBrowser () .getContext ();

      for (const program of this .programs .values ())
      {
         gl .useProgram (program);
         gl [func] (program [name], value1, value2, value3);
      }
   },
   addCallback (callback)
   {
      this .callbacks .push (callback);
   },
   addFunction (func)
   {
      this .functions .push (func);
   },
   getProgram (particleSystem)
   {
      const { geometryType, createParticles, numColors, numTexCoords, numForces, boundedHierarchyRoot } = particleSystem;

      let key = "";

      key += geometryType;
      key += createParticles && this .on ? 1 : 0;
      key += ".";
      key += numColors
      key += ".";
      key += numTexCoords;
      key += ".";
      key += numForces
      key += ".";
      key += boundedHierarchyRoot;

      return this .programs .get (key) ??
         this .createProgram (key, particleSystem);
   },
   createProgram (key, particleSystem)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         defines = this .defines .slice ();

      defines .push (`#define X3D_GEOMETRY_TYPE ${particleSystem .geometryType}`)
      defines .push (`${particleSystem .createParticles && this .on ? "#define X3D_CREATE_PARTICLES" : ""}`);
      defines .push (`#define X3D_NUM_COLORS ${particleSystem .numColors}`);
      defines .push (`#define X3D_NUM_TEX_COORDS ${particleSystem .numTexCoords}`);
      defines .push (`#define X3D_NUM_FORCES ${particleSystem .numForces}`);
      defines .push (`${particleSystem .boundedHierarchyRoot > -1 ? "#define X3D_BOUNDED_VOLUME" : ""}`);

      const vertexShaderSource = /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
${defines .join ("\n")}
uniform int randomSeed;uniform float particleLifetime;uniform float lifetimeVariation;uniform float deltaTime;uniform vec2 particleSize;
#if X3D_NUM_FORCES>0
uniform sampler2D forces;
#endif
#if defined(X3D_BOUNDED_VOLUME)
uniform int boundedVerticesIndex;uniform int boundedNormalsIndex;uniform int boundedHierarchyIndex;uniform int boundedHierarchyRoot;uniform sampler2D boundedVolume;
#endif
#if X3D_NUM_COLORS>0
uniform sampler2D colorRamp;
#endif
#if X3D_NUM_TEX_COORDS>0
uniform int texCoordCount;uniform sampler2D texCoordRamp;
#endif
${Array .from (this .uniforms .values ()) .join ("\n")}
in vec4 input0;in vec4 input2;in vec4 input6;out vec4 output0;out vec4 output1;out vec4 output2;out vec4 output3;out vec4 output4;out vec4 output5;out vec4 output6;
${Object .entries ((external_X_ITE_X3D_GeometryTypes_default())) .map (([k, v]) => `#define ${k} ${v}`) .join ("\n")}
const int ARRAY_SIZE=32;const float M_PI=3.14159265359;uniform float NaN;vec4 texelFetch(const in sampler2D sampler,const in int index,const in int lod){int x=textureSize(sampler,lod).x;ivec2 p=ivec2(index % x,index/x);vec4 t=texelFetch(sampler,p,lod);return t;}vec3 save_normalize(const in vec3 vector){float l=length(vector);if(l==0.0)return vec3(0.0);return vector/l;}vec4 Quaternion(const in vec3 fromVector,const in vec3 toVector){vec3 from=save_normalize(fromVector);vec3 to=save_normalize(toVector);float cos_angle=dot(from,to);vec3 cross_vec=cross(from,to);float cross_len=length(cross_vec);if(cross_len==0.0){if(cos_angle>0.0){return vec4(0.0,0.0,0.0,1.0);}else{vec3 t=cross(from,vec3(1.0,0.0,0.0));if(dot(t,t)==0.0)t=cross(from,vec3(0.0,1.0,0.0));t=save_normalize(t);return vec4(t,0.0);}}else{float s=sqrt(abs(1.0-cos_angle)*0.5);cross_vec=save_normalize(cross_vec);return vec4(cross_vec*s,sqrt(abs(1.0+cos_angle)*0.5));}}vec3 multVecQuat(const in vec3 v,const in vec4 q){float a=q.w*q.w-q.x*q.x-q.y*q.y-q.z*q.z;float b=2.0*(v.x*q.x+v.y*q.y+v.z*q.z);float c=2.0*q.w;vec3 r=a*v.xyz+b*q.xyz+c*(q.yzx*v.zxy-q.zxy*v.yzx);return r;}mat3 Matrix3(const in vec4 quaternion){float x=quaternion.x;float y=quaternion.y;float z=quaternion.z;float w=quaternion.w;float A=y*y;float B=z*z;float C=x*y;float D=z*w;float E=z*x;float F=y*w;float G=x*x;float H=y*z;float I=x*w;return mat3(1.0-2.0*(A+B),2.0*(C+D),2.0*(E-F),2.0*(C-D),1.0-2.0*(B+G),2.0*(H+I),2.0*(E+F),2.0*(H-I),1.0-2.0*(A+G));}uint seed=1u;void srand(const in int value){seed=uint(value);}float random(){seed=seed*1103515245u+12345u;return float(seed)/4294967295.0;}float getRandomValue(const in float min,const in float max){return min+random()*(max-min);}float getRandomLifetime(){float v=particleLifetime*lifetimeVariation;float min_=max(0.0,particleLifetime-v);float max_=particleLifetime+v;return getRandomValue(min_,max_);}float getRandomSpeed(){float v=speed*variation;float min_=max(0.0,speed-v);float max_=speed+v;return getRandomValue(min_,max_);}vec3 getRandomNormal(){float theta=getRandomValue(-M_PI,M_PI);float cphi=getRandomValue(-1.0,1.0);float r=sqrt(1.0-cphi*cphi);return vec3(sin(theta)*r,cos(theta)*r,cphi);}vec3 getRandomNormalWithAngle(const in float angle){float theta=getRandomValue(-M_PI,M_PI);float cphi=getRandomValue(cos(angle),1.0);float r=sqrt(1.0-cphi*cphi);return vec3(sin(theta)*r,cos(theta)*r,cphi);}vec3 getRandomNormalWithDirectionAndAngle(const in vec3 direction,const in float angle){vec4 rotation=Quaternion(vec3(0.0,0.0,1.0),direction);vec3 normal=getRandomNormalWithAngle(angle);return multVecQuat(normal,rotation);}vec3 getRandomSurfaceNormal(const in vec3 direction){float theta=getRandomValue(-M_PI,M_PI);float cphi=pow(random(),1.0/3.0);float r=sqrt(1.0-cphi*cphi);vec3 normal=vec3(sin(theta)*r,cos(theta)*r,cphi);vec4 rotation=Quaternion(vec3(0.0,0.0,1.0),direction);return multVecQuat(normal,rotation);}vec3 getRandomSphericalVelocity(){vec3 normal=getRandomNormal();float speed=getRandomSpeed();return normal*speed;}int upperBound(const in sampler2D sampler,in int count,const in float value){int first=0;int step=0;while(count>0){int index=first;step=count>>1;index+=step;if(value<texelFetch(sampler,index,0).x){count=step;}else{first=++index;count-=step+1;}}return first;}
#if X3D_NUM_COLORS>0||defined(X3D_POLYLINE_EMITTER)||defined(X3D_SURFACE_EMITTER)||defined(X3D_VOLUME_EMITTER)
void interpolate(const in sampler2D sampler,const in int count,const in float fraction,out int index0,out int index1,out float weight){if(count==1||fraction<=texelFetch(sampler,0,0).x){index0=0;index1=0;weight=0.0;}else if(fraction>=texelFetch(sampler,count-1,0).x){index0=count-2;index1=count-1;weight=1.0;}else{int index=upperBound(sampler,count,fraction);if(index<count){index1=index;index0=index-1;float key0=texelFetch(sampler,index0,0).x;float key1=texelFetch(sampler,index1,0).x;weight=clamp((fraction-key0)/(key1-key0),0.0,1.0);}else{index0=0;index1=0;weight=0.0;}}}
#endif
#if X3D_NUM_TEX_COORDS>0
void interpolate(const in sampler2D sampler,const in int count,const in float fraction,out int index0){if(count==1||fraction<=texelFetch(sampler,0,0).x){index0=0;}else if(fraction>=texelFetch(sampler,count-1,0).x){index0=count-2;}else{int index=upperBound(sampler,count,fraction);if(index<count)index0=index-1;else index0=0;}}
#endif
#if defined(X3D_SURFACE_EMITTER)||defined(X3D_VOLUME_EMITTER)
vec3 getRandomBarycentricCoord(){float u=random();float v=random();if(u+v>1.0){u=1.0-u;v=1.0-v;}float t=1.0-u-v;return vec3(t,u,v);}void getRandomPointOnSurface(const in sampler2D surface,const in int verticesIndex,const in int normalsIndex,out vec4 position,out vec3 normal){float lastAreaSoFar=texelFetch(surface,verticesIndex-1,0).x;float fraction=random()*lastAreaSoFar;int index0;int index1;int index2;float weight;interpolate(surface,verticesIndex,fraction,index0,index1,weight);index0*=3;index1=index0+1;index2=index0+2;vec4 vertex0=texelFetch(surface,verticesIndex+index0,0);vec4 vertex1=texelFetch(surface,verticesIndex+index1,0);vec4 vertex2=texelFetch(surface,verticesIndex+index2,0);vec3 normal0=texelFetch(surface,normalsIndex+index0,0).xyz;vec3 normal1=texelFetch(surface,normalsIndex+index1,0).xyz;vec3 normal2=texelFetch(surface,normalsIndex+index2,0).xyz;vec3 r=getRandomBarycentricCoord();position=r.z*vertex0+r.x*vertex1+r.y*vertex2;normal=save_normalize(r.z*normal0+r.x*normal1+r.y*normal2);}
#endif
${this .functions .join ("\n")}
#if X3D_NUM_COLORS>0
vec4 getColor(const in float lifetime,const in float elapsedTime){float fraction=elapsedTime/lifetime;int index0;int index1;float weight;interpolate(colorRamp,X3D_NUM_COLORS,fraction,index0,index1,weight);vec4 color0=texelFetch(colorRamp,X3D_NUM_COLORS+index0,0);vec4 color1=texelFetch(colorRamp,X3D_NUM_COLORS+index1,0);return mix(color0,color1,weight);}
#else
#define getColor(lifetime,elapsedTime)(vec4(1.0))
#endif
#if defined(X3D_BOUNDED_VOLUME)
void bounce(const in float deltaTime,const in vec4 fromPosition,inout vec4 toPosition,inout vec3 velocity){Line3 line=Line3(fromPosition.xyz,save_normalize(velocity));vec4 points[ARRAY_SIZE];vec3 normals[ARRAY_SIZE];int numIntersections=getIntersections(boundedVolume,boundedVerticesIndex,boundedNormalsIndex,boundedHierarchyIndex,boundedHierarchyRoot,line,points,normals);if(numIntersections==0)return;Plane3 plane1=plane3(line.point,line.direction);int index=min_index(points,numIntersections,0.0,plane1);if(index==-1)return;vec3 point=points[index].xyz;vec3 normal=save_normalize(normals[index]);Plane3 plane2=plane3(point,normal);if(sign(plane_distance(plane2,fromPosition.xyz))==sign(plane_distance(plane2,toPosition.xyz)))return;float damping=length(normals[index]);velocity=reflect(velocity,normal);toPosition=vec4(point+save_normalize(velocity)*0.0001,1.0);velocity*=damping;}
#endif
#if X3D_NUM_TEX_COORDS>0
int getTexCoordIndex0(const in float lifetime,const in float elapsedTime){float fraction=elapsedTime/lifetime;int index0=0;interpolate(texCoordRamp,X3D_NUM_TEX_COORDS,fraction,index0);return X3D_NUM_TEX_COORDS+index0*texCoordCount;}
#else
#define getTexCoordIndex0(lifetime,elapsedTime)(-1)
#endif
void main(){int life=int(input0[0]);float lifetime=input0[1];float elapsedTime=input0[2]+deltaTime;srand((gl_VertexID+randomSeed)*randomSeed);if(elapsedTime>lifetime){lifetime=getRandomLifetime();elapsedTime=0.0;output0=vec4(max(life+1,1),lifetime,elapsedTime,getTexCoordIndex0(lifetime,elapsedTime));
#if defined(X3D_CREATE_PARTICLES)
output1=getColor(lifetime,elapsedTime);output2=vec4(getRandomVelocity(),0.0);output6=getRandomPosition();
#else
output1=vec4(0.0);output2=vec4(0.0);output6=vec4(NaN);
#endif
}else{vec3 velocity=input2.xyz;vec4 position=input6;
#if X3D_NUM_FORCES>0
for(int i=0;i<X3D_NUM_FORCES;++i){vec4 force=texelFetch(forces,i,0);float turbulence=force.w;vec3 normal=getRandomNormalWithDirectionAndAngle(force.xyz,turbulence);float speed=length(force.xyz);velocity+=normal*speed;}
#endif
position.xyz+=velocity*deltaTime;
#if defined(X3D_BOUNDED_VOLUME)
bounce(deltaTime,input6,position,velocity);
#endif
output0=vec4(life,lifetime,elapsedTime,getTexCoordIndex0(lifetime,elapsedTime));output1=getColor(lifetime,elapsedTime);output2=vec4(velocity,0.0);output6=position;}
#if X3D_GEOMETRY_TYPE==POINT||X3D_GEOMETRY_TYPE==SPRITE||X3D_GEOMETRY_TYPE==GEOMETRY
output3=vec4(1.0,0.0,0.0,0.0);output4=vec4(0.0,1.0,0.0,0.0);output5=vec4(0.0,0.0,1.0,0.0);
#elif X3D_GEOMETRY_TYPE==LINE
mat3 m=Matrix3(Quaternion(vec3(0.0,0.0,1.0),output2.xyz));output3=vec4(m[0],0.0);output4=vec4(m[1],0.0);output5=vec4(m[2],0.0);
#else
output3=vec4(particleSize.x,0.0,0.0,0.0);output4=vec4(0.0,particleSize.y,0.0,0.0);output5=vec4(0.0,0.0,1.0,0.0);
#endif
}`

      const fragmentShaderSource = /* glsl */ `#version 300 es
precision highp float;void main(){}`

      // Vertex shader

      const vertexShader = gl .createShader (gl .VERTEX_SHADER);

      gl .shaderSource (vertexShader, vertexShaderSource);
      gl .compileShader (vertexShader);

      if (!gl .getShaderParameter (vertexShader, gl .COMPILE_STATUS))
         console .error (gl .getShaderInfoLog (vertexShader));

      // Fragment shader

      const fragmentShader = gl .createShader (gl .FRAGMENT_SHADER);

      gl .shaderSource (fragmentShader, fragmentShaderSource);
      gl .compileShader (fragmentShader);

      if (!gl .getShaderParameter (fragmentShader, gl .COMPILE_STATUS))
         console .error (gl .getShaderInfoLog (fragmentShader));

      // Program

      const program = gl .createProgram ();

      gl .attachShader (program, vertexShader);
      gl .attachShader (program, fragmentShader);
      gl .transformFeedbackVaryings (program, Array .from ({length: 7}, (_, i) => "output" + i), gl .INTERLEAVED_ATTRIBS);
      gl .linkProgram (program);

      if (!gl .getProgramParameter (program, gl .LINK_STATUS))
      {
         console .error (`Couldn't initialize particle shader: ${gl .getProgramInfoLog (program)}`);
         // console .error (vertexShaderSource);
      }

      this .programs .set (key, program);

      gl .useProgram (program);

      // Attributes

      program .inputs = [
         [0, gl .getAttribLocation (program, "input0")],
         [2, gl .getAttribLocation (program, "input2")],
         [6, gl .getAttribLocation (program, "input6")],
      ];

      // Uniforms

      program .randomSeed        = gl .getUniformLocation (program, "randomSeed");
      program .particleLifetime  = gl .getUniformLocation (program, "particleLifetime");
      program .lifetimeVariation = gl .getUniformLocation (program, "lifetimeVariation");
      program .deltaTime         = gl .getUniformLocation (program, "deltaTime");
      program .particleSize      = gl .getUniformLocation (program, "particleSize");

      program .forces = gl .getUniformLocation (program, "forces");

      program .boundedVerticesIndex  = gl .getUniformLocation (program, "boundedVerticesIndex");
      program .boundedNormalsIndex   = gl .getUniformLocation (program, "boundedNormalsIndex");
      program .boundedHierarchyIndex = gl .getUniformLocation (program, "boundedHierarchyIndex");
      program .boundedHierarchyRoot  = gl .getUniformLocation (program, "boundedHierarchyRoot");
      program .boundedVolume         = gl .getUniformLocation (program, "boundedVolume");

      program .colorRamp = gl .getUniformLocation (program, "colorRamp");

      program .texCoordCount = gl .getUniformLocation (program, "texCoordCount");
      program .texCoordRamp  = gl .getUniformLocation (program, "texCoordRamp");

      for (const name of this .uniforms .keys ())
         program [name] = gl .getUniformLocation (program, name);

      gl .uniform1f (gl .getUniformLocation (program, "NaN"), NaN);

      // Samplers

      for (const name of this .samplers)
      {
         const location = gl .getUniformLocation (program, name);

         gl .uniform1i (location, program [name + "TextureUnit"] = browser .getTexture2DUnit ());
      }

      browser .resetTextureUnits ();

      // Field uniforms

      for (const callback of this .callbacks)
         callback .call (this);

      // Return

      return program;
   },
   activateTextures ()
   { },
   createTexture ()
   {
      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

      return texture;
   },
   getTexture2DUnit (browser, object, property)
   {
      const textureUnit = object [property];

      if (textureUnit === undefined)
         return object [property] = browser .getTexture2DUnit ();

      return textureUnit;
   },
});

Object .defineProperties (X3DParticleEmitterNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DParticleEmitterNode", "ParticleSystems", 1));

const X3DParticleEmitterNode_default_ = X3DParticleEmitterNode;
;

/* harmony default export */ const ParticleSystems_X3DParticleEmitterNode = (external_X_ITE_X3D_Namespace_default().add ("X3DParticleEmitterNode", X3DParticleEmitterNode_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/PointEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function PointEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).PointEmitter);

   this ._position .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (PointEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position  .addInterest ("set_position__",  this);
      this ._direction .addInterest ("set_direction__", this);

      this .addDefine ("#define X3D_POINT_EMITTER");

      this .addUniform ("position",  "uniform vec3 position;");
      this .addUniform ("direction", "uniform vec3 direction;");

      this .addCallback (this .set_position__);
      this .addCallback (this .set_direction__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
            return getRandomSphericalVelocity ();

         else
            return direction * getRandomSpeed ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this ._position .getValue ());
      };
   })(),
   set_position__ ()
   {
      const { x, y, z } = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", x, y, z);

      this ._bbox_changed .addEvent ();
   },
   set_direction__: (() =>
   {
      const direction = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const { x, y, z } = direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", x, y, z);
      };
   })(),
});

Object .defineProperties (PointEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("PointEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "on",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "position",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "direction",   new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "speed",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "variation",   new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "mass",        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceArea", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const PointEmitter_default_ = PointEmitter;
;

/* harmony default export */ const ParticleSystems_PointEmitter = (external_X_ITE_X3D_Namespace_default().add ("PointEmitter", PointEmitter_default_));
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/X3DParticleSystemsContext.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/



const _defaultEmitter = Symbol ();

function X3DParticleSystemsContext () { }

Object .assign (X3DParticleSystemsContext .prototype,
{
   getDefaultEmitter ()
   {
      this [_defaultEmitter] = new ParticleSystems_PointEmitter (this .getPrivateScene ());
      this [_defaultEmitter] .setPrivate (true);
      this [_defaultEmitter] .setup ();

      this .getDefaultEmitter = function () { return this [_defaultEmitter]; };

      Object .defineProperty (this, "getDefaultEmitter", { enumerable: false });

      return this [_defaultEmitter];
   },
});

const X3DParticleSystemsContext_default_ = X3DParticleSystemsContext;
;

/* harmony default export */ const ParticleSystems_X3DParticleSystemsContext = (external_X_ITE_X3D_Namespace_default().add ("X3DParticleSystemsContext", X3DParticleSystemsContext_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/




function X3DParticlePhysicsModelNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DParticlePhysicsModelNode);
}

Object .assign (Object .setPrototypeOf (X3DParticlePhysicsModelNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   addForce ()
   { },
});

Object .defineProperties (X3DParticlePhysicsModelNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DParticlePhysicsModelNode", "ParticleSystems", 1));

const X3DParticlePhysicsModelNode_default_ = X3DParticlePhysicsModelNode;
;

/* harmony default export */ const ParticleSystems_X3DParticlePhysicsModelNode = (external_X_ITE_X3D_Namespace_default().add ("X3DParticlePhysicsModelNode", X3DParticlePhysicsModelNode_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/BoundedPhysicsModel.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function BoundedPhysicsModel (executionContext)
{
   ParticleSystems_X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).BoundedPhysicsModel);
}

Object .assign (Object .setPrototypeOf (BoundedPhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticlePhysicsModelNode .prototype .initialize .call (this);

      this ._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   getBBox ()
   {
      return this .geometryNode ?.getBBox ();
   },
   set_geometry__ ()
   {
      this .geometryNode ?._rebuild .removeInterest ("addNodeEvent", this);

      this .geometryNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DGeometryNode, this ._geometry);

      this .geometryNode ?._rebuild .addInterest ("addNodeEvent", this);
   },
   addGeometry (boundedNormals, boundedVertices)
   {
      if (!this .geometryNode)
         return;

      if (!this ._enabled .getValue ())
         return;

      const
         damping  = this ._damping .getValue (),
         normals  = this .geometryNode .getNormals ()  .getValue (),
         vertices = this .geometryNode .getVertices () .getValue ();

      for (const value of normals)
         boundedNormals .push (value * damping);

      for (const value of vertices)
         boundedVertices .push (value);
   },
});

Object .defineProperties (BoundedPhysicsModel,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("BoundedPhysicsModel", "ParticleSystems", 2, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "damping",  new (external_X_ITE_X3D_Fields_default()).SFFloat (1)), // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "geometry", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const BoundedPhysicsModel_default_ = BoundedPhysicsModel;
;

/* harmony default export */ const ParticleSystems_BoundedPhysicsModel = (external_X_ITE_X3D_Namespace_default().add ("BoundedPhysicsModel", BoundedPhysicsModel_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/ConeEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function ConeEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ConeEmitter);

   this ._position .setUnit ("length");
   this ._angle    .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (ConeEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position  .addInterest ("set_position__", this);
      this ._direction .addInterest ("set_direction__", this);
      this ._angle     .addInterest ("set_angle__", this);

      this .addDefine ("#define X3D_CONE_EMITTER");

      this .addUniform ("position",  "uniform vec3  position;");
      this .addUniform ("direction", "uniform vec3  direction;");
      this .addUniform ("angle",     "uniform float angle;");

      this .addCallback (this .set_position__);
      this .addCallback (this .set_direction__);
      this .addCallback (this .set_angle__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
         {
            return getRandomSphericalVelocity ();
         }
         else
         {
            vec3  normal = getRandomNormalWithDirectionAndAngle (direction, angle);
            float speed  = getRandomSpeed ();

            return normal * speed;
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this ._position .getValue ());
      };
   })(),
   set_position__ ()
   {
      const { x, y, z } = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", x, y, z );

      this ._bbox_changed .addEvent ();
   },
   set_direction__ ()
   {
      const { x, y, z } = this ._direction .getValue ();

      this .setUniform ("uniform3f", "direction", x, y, z );
   },
   set_angle__ ()
   {
      this .setUniform ("uniform1f", "angle", this ._angle .getValue ());
   },
});

Object .defineProperties (ConeEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ConeEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "on",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "position",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "direction",   new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "angle",       new (external_X_ITE_X3D_Fields_default()).SFFloat (0.785398)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "speed",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "variation",   new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "mass",        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceArea", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const ConeEmitter_default_ = ConeEmitter;
;

/* harmony default export */ const ParticleSystems_ConeEmitter = (external_X_ITE_X3D_Namespace_default().add ("ConeEmitter", ConeEmitter_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/ExplosionEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function ExplosionEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ExplosionEmitter);

   this ._position .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ExplosionEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position .addInterest ("set_position__", this);

      this .addDefine ("#define X3D_EXPLOSION_EMITTER");
      this .addUniform ("position", "uniform vec3 position;");
      this .addCallback (this .set_position__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         return getRandomSphericalVelocity ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this ._position .getValue ());
      };
   })(),
   isExplosive ()
   {
      return true;
   },
   set_position__ ()
   {
      const { x, y, z } = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", x, y, z);

      this ._bbox_changed .addEvent ();
   },
});

Object .defineProperties (ExplosionEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ExplosionEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "on",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "position",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "speed",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "variation",   new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "mass",        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceArea", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const ExplosionEmitter_default_ = ExplosionEmitter;
;

/* harmony default export */ const ParticleSystems_ExplosionEmitter = (external_X_ITE_X3D_Namespace_default().add ("ExplosionEmitter", ExplosionEmitter_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/ForcePhysicsModel.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function ForcePhysicsModel (executionContext)
{
   ParticleSystems_X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ForcePhysicsModel);

   this ._force .setUnit ("force");
}

Object .assign (Object .setPrototypeOf (ForcePhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   addForce: (() =>
   {
      const force = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            forces .set (force .assign (this ._force .getValue ()) .multiply (timeByMass), i * 4);
            forces [i * 4 + 3] = 0;

            return true;
         }
         else
         {
            return false;
         }
     };
   })(),
});

Object .defineProperties (ForcePhysicsModel,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ForcePhysicsModel", "ParticleSystems", 1, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "force",    new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, -9.8, 0)),
      ]),
      enumerable: true,
   },
});

const ForcePhysicsModel_default_ = ForcePhysicsModel;
;

/* harmony default export */ const ParticleSystems_ForcePhysicsModel = (external_X_ITE_X3D_Namespace_default().add ("ForcePhysicsModel", ForcePhysicsModel_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DShapeNode"
const external_X_ITE_X3D_X3DShapeNode_namespaceObject = __X_ITE_X3D__ .X3DShapeNode;
var external_X_ITE_X3D_X3DShapeNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DShapeNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .GeometryContext"
const external_X_ITE_X3D_GeometryContext_namespaceObject = __X_ITE_X3D__ .GeometryContext;
var external_X_ITE_X3D_GeometryContext_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GeometryContext_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .VertexArray"
const external_X_ITE_X3D_VertexArray_namespaceObject = __X_ITE_X3D__ .VertexArray;
var external_X_ITE_X3D_VertexArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_VertexArray_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .AlphaMode"
const external_X_ITE_X3D_AlphaMode_namespaceObject = __X_ITE_X3D__ .AlphaMode;
var external_X_ITE_X3D_AlphaMode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_AlphaMode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .LineSet"
const external_X_ITE_X3D_LineSet_namespaceObject = __X_ITE_X3D__ .LineSet;
var external_X_ITE_X3D_LineSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_LineSet_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Coordinate"
const external_X_ITE_X3D_Coordinate_namespaceObject = __X_ITE_X3D__ .Coordinate;
var external_X_ITE_X3D_Coordinate_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Coordinate_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Matrix3"
const external_X_ITE_X3D_Matrix3_namespaceObject = __X_ITE_X3D__ .Matrix3;
var external_X_ITE_X3D_Matrix3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix3_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Plane3"
const external_X_ITE_X3D_Plane3_namespaceObject = __X_ITE_X3D__ .Plane3;
var external_X_ITE_X3D_Plane3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Plane3_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .QuickSort"
const external_X_ITE_X3D_QuickSort_namespaceObject = __X_ITE_X3D__ .QuickSort;
var external_X_ITE_X3D_QuickSort_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_QuickSort_namespaceObject);
;// CONCATENATED MODULE: ./src/standard/Math/Utility/BVH.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/





const
   v0  = new (external_X_ITE_X3D_Vector3_default()) (),
   v1  = new (external_X_ITE_X3D_Vector3_default()) (),
   v2  = new (external_X_ITE_X3D_Vector3_default()) (),
   uvt = { u: 0, v: 0, t: 0 };

// Box normals for bbox / line intersection.
const boxNormals = [
   new (external_X_ITE_X3D_Vector3_default()) (0,  0,  1), // front
   new (external_X_ITE_X3D_Vector3_default()) (0,  0, -1), // back
   new (external_X_ITE_X3D_Vector3_default()) (0,  1,  0), // top
   new (external_X_ITE_X3D_Vector3_default()) (0, -1,  0), // bottom
   new (external_X_ITE_X3D_Vector3_default()) (1,  0,  0)  // right
   // left: We do not have to test for left.
];

const
   NODE     = 0,
   TRIANGLE = 1;

function SortComparator (vertices, axis)
{
   return function compare (a, b)
   {
       return Math .min (vertices [a + axis], vertices [a + 4 + axis], vertices [a + 8 + axis]) <
              Math .min (vertices [b + axis], vertices [b + 4 + axis], vertices [b + 8 + axis]);
   }
}

function Triangle (tree, triangle)
{
   this .vertices = tree .vertices;
   this .normals  = tree .normals;
   this .triangle = triangle;
   this .i4       = triangle * 12;
   this .i3       = triangle * 9;
}

Object .assign (Triangle .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      const
         vertices = this .vertices,
         normals  = this .normals,
         i4       = this .i4,
         i3       = this .i3;

      v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
      v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
      v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

      if (line .intersectsTriangle (v0, v1, v2, uvt))
      {
         // Get barycentric coordinates.

         const { u, v, t } = uvt;

         // Determine vectors for X3DPointingDeviceSensors.

         const i = intersections .size ++;

         if (i >= intersections .length)
            intersections .push (new (external_X_ITE_X3D_Vector3_default()) ());

         intersections [i] .set (u * vertices [i4]     + v * vertices [i4 + 4] + t * vertices [i4 +  8],
                                 u * vertices [i4 + 1] + v * vertices [i4 + 5] + t * vertices [i4 +  9],
                                 u * vertices [i4 + 2] + v * vertices [i4 + 6] + t * vertices [i4 + 10]);

         if (intersectionNormals)
         {
            if (i >= intersectionNormals .length)
               intersectionNormals .push (new (external_X_ITE_X3D_Vector3_default()) ());

            intersectionNormals [i] .set (u * normals [i3]     + v * normals [i3 + 3] + t * normals [i3 + 6],
                                          u * normals [i3 + 1] + v * normals [i3 + 4] + t * normals [i3 + 7],
                                          u * normals [i3 + 2] + v * normals [i3 + 5] + t * normals [i3 + 8]);
         }
      }
   },
   toArray (array)
   {
      const index = array .length / 4;

      array .push (TRIANGLE, this .triangle * 3, 0, 0);

      return index;
   },
});

function Node (tree, triangles, first, size)
{
   this .min          = new (external_X_ITE_X3D_Vector3_default()) ();
   this .max          = new (external_X_ITE_X3D_Vector3_default()) ();
   this .planes       = [ ];
   this .intersection = new (external_X_ITE_X3D_Vector3_default()) ();

   const
      vertices = tree .vertices,
      min      = this .min,
      max      = this .max,
      last     = first + size;

   let t = triangles [first] * 12;

   // Calculate bbox

   min .set (vertices [t], vertices [t + 1], vertices [t + 2]);
   max .assign (min);

   for (let i = first; i < last; ++ i)
   {
      t = triangles [i] * 12;

      v0 .set (vertices [t],     vertices [t + 1], vertices [t + 2]);
      v1 .set (vertices [t + 4], vertices [t + 5], vertices [t + 6]);
      v2 .set (vertices [t + 8], vertices [t + 9], vertices [t + 10]);

      min .min (v0, v1, v2);
      max .max (v0, v1, v2);
   }

   for (let i = 0; i < 5; ++ i)
      this .planes [i] = new (external_X_ITE_X3D_Plane3_default()) (i % 2 ? min : max, boxNormals [i]);

   // Sort and split array

   if (size > 2)
   {
      // Sort array

      tree .sorter .compare .axis = this .getLongestAxis (min, max);
      tree .sorter .sort (first, last);

      // Split array

      var leftSize = size >>> 1;
   }
   else
      var leftSize = 1;

   // Split array

   const rightSize = size - leftSize;

   // Construct left and right node

   if (leftSize > 1)
      this .left = new Node (tree, triangles, first, leftSize);
   else
      this .left = new Triangle (tree, triangles [first]);

   if (rightSize > 1)
      this .right = new Node (tree, triangles, first + leftSize, rightSize);
   else
      this .right = new Triangle (tree, triangles [first + leftSize]);
}

Object .assign (Node .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      if (this .intersectsBBox (line))
      {
         this .left  .intersectsLine (line, intersections, intersectionNormals);
         this .right .intersectsLine (line, intersections, intersectionNormals);
      }
   },
   intersectsBBox (line)
   {
      const
         planes       = this .planes,
         min          = this .min,
         max          = this .max,
         minX         = min .x,
         maxX         = max .x,
         minY         = min .y,
         maxY         = max .y,
         minZ         = min .z,
         maxZ         = max .z,
         intersection = this .intersection;

      // front
      if (planes [0] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .y >= minY && intersection .y <= maxY)
            return true;
      }

      // back
      if (planes [1] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .y >= minY && intersection .y <= maxY)
            return true;
      }

      // top
      if (planes [2] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      // bottom
      if (planes [3] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      // right
      if (planes [4] .intersectsLine (line, intersection))
      {
         if (intersection .y >= minY && intersection .y <= maxY &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      return false;
   },
   getLongestAxis (min, max)
   {
      const
         x = max .x - min .x,
         y = max .y - min .y,
         z = max .z - min .z;

      if (x < y)
      {
         if (y < z)
            return 2;

         return 1;
      }
      else
      {
         if (x < z)
            return 2;

         return 0;
      }
   },
   toArray (array)
   {
      const
         left  = this .left .toArray (array),
         right = this .right .toArray (array),
         min   = this .min,
         max   = this .max,
         index = array .length / 4;

      array .push (NODE, left, right, 0,
                   min .x, min .y, min .z, 0,
                   max .x, max .y, max .z, 0);

      return index;
   },
});

function BVH (vertices, normals)
{
   const numTriangles = vertices .length / 12;

   this .vertices = vertices;
   this .normals  = normals;

   switch (numTriangles)
   {
      case 0:
      {
         this .root = null;
         break;
      }
      case 1:
      {
         this .root = new Triangle (this, 0);
         break;
      }
      default:
      {
         const triangles = [ ];

         for (let i = 0; i < numTriangles; ++ i)
            triangles .push (i);

         this .sorter = new (external_X_ITE_X3D_QuickSort_default()) (triangles, SortComparator (vertices, 0));
         this .root   = new Node (this, triangles, 0, numTriangles);
         break;
      }
   }
}

Object .assign (BVH .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      intersections .size = 0;

      if (this .root)
      {
         this .root .intersectsLine (line, intersections, intersectionNormals);
         return intersections .size;
      }

      return 0;
   },
   toArray (array)
   {
      if (this .root)
      {
         const root = this .root .toArray (array);

         array .push (root, 0, 0, 0);
      }

      return array;
   },
});

const BVH_default_ = BVH;
;

/* harmony default export */ const Utility_BVH = (external_X_ITE_X3D_Namespace_default().add ("BVH", BVH_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/ParticleSystem.js
/* provided dependency */ var $ = __webpack_require__(254);
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/




















const PointGeometry = new Float32Array ([0, 0, 0, 1]);

// p4 ------ p3
// |       / |
// |     /   |
// |   /     |
// | /       |
// p1 ------ p2

const QuadGeometry = new Float32Array ([
   // TexCoords
   0, 0, 0, 1,
   1, 0, 0, 1,
   1, 1, 0, 1,
   0, 0, 0, 1,
   1, 1, 0, 1,
   0, 1, 0, 1,
   // Normal
   0, 0, 1,
   // Vertices
   -0.5, -0.5, 0, 1,
    0.5, -0.5, 0, 1,
    0.5,  0.5, 0, 1,
   -0.5, -0.5, 0, 1,
    0.5,  0.5, 0, 1,
   -0.5,  0.5, 0, 1,
]);

function ParticleSystem (executionContext)
{
   external_X_ITE_X3D_X3DShapeNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ParticleSystem);

   // Units

   this ._particleSize .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this .addAlias ("colorRamp",    this ._color);
      this .addAlias ("texCoordRamp", this ._texCoord);
   }

   // Private properties

   const browser = this .getBrowser ();

   this .maxParticles             = 0;
   this .numParticles             = 0;
   this .forcePhysicsModelNodes   = [ ];
   this .forces                   = new Float32Array (4);
   this .boundedPhysicsModelNodes = [ ];
   this .boundedNormals           = [ ];
   this .boundedVertices          = [ ];
   this .colorRamp                = new Float32Array ();
   this .texCoordRamp             = new Float32Array ();
   this .geometryContext          = new (external_X_ITE_X3D_GeometryContext_default()) ({ textureCoordinateNode: browser .getDefaultTextureCoordinate () });
   this .creationTime             = 0;
   this .pauseTime                = 0;
   this .deltaTime                = 0;
   this .particlesStride          = Float32Array .BYTES_PER_ELEMENT * 7 * 4; // 7 x vec4
   this .particleOffsets          = Array .from ({length: 7}, (_, i) => Float32Array .BYTES_PER_ELEMENT * 4 * i); // i x vec4
   this .particleOffset           = this .particleOffsets [0];
   this .colorOffset              = this .particleOffsets [1];
   this .velocityOffset           = this .particleOffsets [2];
   this .matrixOffset             = this .particleOffsets [3];
   this .texCoordOffset           = 0;
   this .instancesStride          = this .particlesStride;
}

Object .assign (Object .setPrototypeOf (ParticleSystem .prototype, (external_X_ITE_X3D_X3DShapeNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DShapeNode_default().prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Check version.

      if (browser .getContext () .getVersion () < 2)
         return;

      // Connect fields.

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled           .addInterest ("set_enabled__",           this);
      this ._geometryType      .addInterest ("set_geometryType__",      this);
      this ._geometryType      .addInterest ("set_texCoord__",          this);
      this ._maxParticles      .addInterest ("set_enabled__",           this);
      this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
      this ._particleLifetime  .addInterest ("set_bbox__",              this);
      this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
      this ._lifetimeVariation .addInterest ("set_bbox__",              this);
      this ._particleSize      .addInterest ("set_particleSize__",      this);
      this ._emitter           .addInterest ("set_emitter__",           this);
      this ._emitter           .addInterest ("set_bbox__",              this);
      this ._physics           .addInterest ("set_physics__",           this);
      this ._colorKey          .addInterest ("set_color__",             this);
      this ._color             .addInterest ("set_colorRamp__",         this);
      this ._texCoordKey       .addInterest ("set_texCoord__",          this);
      this ._texCoord          .addInterest ("set_texCoordRamp__",      this);

      // Create particles stuff.

      this .inputParticles = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
         thickLinesVertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
         lineTrianglesBuffer: gl .createBuffer (),
         numLines: 0,
      });

      this .outputParticles = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
         thickLinesVertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
         lineTrianglesBuffer: gl .createBuffer (),
         numLines: 0,
      });

      // Create forces stuff.

      this .forcesTexture       = this .createTexture ();
      this .boundedTexture      = this .createTexture ();
      this .colorRampTexture    = this .createTexture ();
      this .texCoordRampTexture = this .createTexture ();

      // Create GL stuff.

      this .geometryBuffer  = this .createBuffer ();
      this .texCoordBuffers = new Array (browser .getMaxTexCoords ()) .fill (this .geometryBuffer);

      // Create geometry for LINE geometryType.

      this .lineGeometryNode   = new (external_X_ITE_X3D_LineSet_default()) (this .getExecutionContext ());
      this .lineCoordinateNode = new (external_X_ITE_X3D_Coordinate_default()) (this .getExecutionContext ());

      this .lineCoordinateNode ._point = [0, 0, -0.5,   0, 0, 0.5];

      this .lineGeometryNode ._vertexCount = [2];
      this .lineGeometryNode ._coord       = this .lineCoordinateNode;

      this .lineCoordinateNode .setup ();
      this .lineGeometryNode   .setup ();

      // Init fields.
      // Call order is very important at startup.

      this .set_emitter__ ();
      this .set_enabled__ ();
      this .set_geometryType__ ();
      this .set_particleLifetime__ ();
      this .set_lifetimeVariation__ ();
      this .set_particleSize__ ();
      this .set_physics__ ();
      this .set_colorRamp__ ();
      this .set_texCoordRamp__ ();
      this .set_bbox__ ();
   },
   getShapeKey ()
   {
      return this .numTexCoords ? 2 : 1;
   },
   getGeometryContext ()
   {
      switch (this .geometryType)
      {
         case (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY:
            return this .getGeometry ();
         default:
            return this .geometryContext;
      }
   },
   getGeometryType ()
   {
      return this .geometryType;
   },
   getNumInstances ()
   {
      return this .numParticles;
   },
   getInstances ()
   {
      return this .outputParticles;
   },
   set_bbox__ ()
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
      {
         if (this .boundedPhysicsModelNodes .length)
         {
            this .bbox .set ();

            for (const boundedPhysicsModelNode of this .boundedPhysicsModelNodes)
            {
               const bbox = boundedPhysicsModelNode .getBBox ();

               if (bbox)
                  this .bbox .add (bbox);
            }
         }
         else
         {
            this .emitterNode ?.getBBox (this .bbox, this);
         }
      }
      else
      {
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_transparent__ ()
   {
      const alphaMode = this .appearanceNode .getAlphaMode ();

      if (alphaMode === (external_X_ITE_X3D_AlphaMode_default()).AUTO)
      {
         switch (this .geometryType)
         {
            case (external_X_ITE_X3D_GeometryTypes_default()).POINT:
            {
               this .setTransparent (true);
               break;
            }
            default:
            {
               this .setTransparent (this .getAppearance () .isTransparent () ||
                                     this .colorRampNode ?.isTransparent () ||
                                     (this .geometryType === (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY &&
                                      this .geometryNode ?.isTransparent ()));
               break;
            }
         }

         this .setAlphaMode (this .isTransparent () ? (external_X_ITE_X3D_AlphaMode_default()).BLEND : (external_X_ITE_X3D_AlphaMode_default()).OPAQUE);
      }
      else
      {
         this .setTransparent (alphaMode === (external_X_ITE_X3D_AlphaMode_default()).BLEND);
         this .setAlphaMode (alphaMode);
      }
   },
   set_live__ ()
   {
      if (this .getLive () .getValue ())
      {
         if (this ._isActive .getValue () && this ._maxParticles .getValue ())
         {
            this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

            if (this .pauseTime)
            {
               this .creationTime += Date .now () / 1000 - this .pauseTime;
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
               this .pauseTime = Date .now () / 1000;
         }
      }
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue () && this ._maxParticles .getValue ())
      {
         if (!this ._isActive .getValue ())
         {
            if (this .getLive () .getValue ())
            {
               this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

               this .pauseTime = 0;
            }
            else
            {
               this .pauseTime = Date .now () / 1000;
            }

            this ._isActive = true;

            delete this .traverse;
         }
      }
      else
      {
         if (this ._isActive .getValue ())
         {
            if (this .getLive () .getValue ())
               this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

            this ._isActive = false;

            this .numParticles = 0;
            this .traverse     = Function .prototype;
         }
      }

      this .set_maxParticles__ ();
   },
   set_geometryType__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Get geometryType.

      this .geometryType = $.enum ((external_X_ITE_X3D_GeometryTypes_default()), this ._geometryType .getValue ()) ?? (external_X_ITE_X3D_GeometryTypes_default()).QUAD;

      // Create buffers.

      switch (this .geometryType)
      {
         case (external_X_ITE_X3D_GeometryTypes_default()).POINT:
         {
            this .geometryContext .geometryType = 0;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount  = 0;
            this .vertexCount    = 1;
            this .hasNormals     = false;
            this .verticesOffset = 0;
            this .primitiveMode  = gl .POINTS;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, PointGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).LINE:
         {
            this .geometryContext .geometryType = 1;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount = 0;
            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).TRIANGLE:
         case (external_X_ITE_X3D_GeometryTypes_default()).QUAD:
         case (external_X_ITE_X3D_GeometryTypes_default()).SPRITE:
         {
            this .geometryContext .geometryType = 2;
            this .geometryContext .hasNormals   = true;

            this .texCoordCount   = 4;
            this .vertexCount     = 6;
            this .hasNormals      = true;
            this .texCoordsOffset = 0;
            this .normalOffset    = Float32Array .BYTES_PER_ELEMENT * 24;
            this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 27;
            this .primitiveMode   = gl .TRIANGLES;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY:
         {
            this .texCoordCount = 0;
            break;
         }
      }

      this .geometryContext .updateGeometryKey ();
      this .updateVertexArrays ();

      this .set_transparent__ ();
   },
   set_maxParticles__ ()
   {
      const
         lastNumParticles = this .numParticles,
         maxParticles     = Math .max (0, this ._maxParticles .getValue ());

      this .maxParticles = maxParticles;
      this .numParticles = Math .min (lastNumParticles, maxParticles);

      if (!this .emitterNode .isExplosive ())
         this .creationTime = Date .now () / 1000;

      this .resizeBuffers (lastNumParticles);
      this .updateVertexArrays ();
   },
   set_particleLifetime__ ()
   {
      this .particleLifetime = Math .max (this ._particleLifetime .getValue (), 0);
   },
   set_lifetimeVariation__ ()
   {
      this .lifetimeVariation = Math .max (this ._lifetimeVariation .getValue (), 0);
   },
   set_particleSize__ ()
   {
      this .lineCoordinateNode ._point [0] .z = -this ._particleSize .y / 2;
      this .lineCoordinateNode ._point [1] .z = +this ._particleSize .y / 2;
   },
   set_emitter__ ()
   {
      this .emitterNode ?._bbox_changed .removeInterest ("set_bbox__", this);

      this .emitterNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DParticleEmitterNode, this ._emitter)
         ?? this .getBrowser () .getDefaultEmitter ();

      this .emitterNode ._bbox_changed .addInterest ("set_bbox__", this);
   },
   set_physics__ ()
   {
      const
         physics                  = this ._physics .getValue (),
         forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
         boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

      for (const boundedPhysicsModelNode of boundedPhysicsModelNodes)
      {
         boundedPhysicsModelNode .removeInterest ("set_boundedPhysics__", this);
         boundedPhysicsModelNode .removeInterest ("set_bbox__",           this);
      }

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
                  case (external_X_ITE_X3D_X3DConstants_default()).ForcePhysicsModel:
                  case (external_X_ITE_X3D_X3DConstants_default()).WindPhysicsModel:
                  {
                     forcePhysicsModelNodes .push (innerNode);
                     break;
                  }
                  case (external_X_ITE_X3D_X3DConstants_default()).BoundedPhysicsModel:
                  {
                     boundedPhysicsModelNodes .push (innerNode);
                     break;
                  }
                  default:
                     continue;
               }

               break;
            }
         }
         catch
         { }
      }

      for (const boundedPhysicsModelNode of boundedPhysicsModelNodes)
      {
         boundedPhysicsModelNode .addInterest ("set_boundedPhysics__", this);
         boundedPhysicsModelNode .addInterest ("set_bbox__",           this);
      }

      this .set_boundedPhysics__ ();
   },
   set_boundedPhysics__ ()
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
         boundedHierarchy       = new Utility_BVH (boundedVertices, boundedNormals) .toArray ([ ]),
         numBoundedVertices     = boundedVertices .length / 4,
         numBoundedNormals      = boundedNormals .length / 3,
         boundedHierarchyLength = boundedHierarchy .length / 4,
         boundedArraySize       = Math .ceil (Math .sqrt (numBoundedVertices + numBoundedNormals + boundedHierarchyLength)),
         boundedArray           = new Float32Array (boundedArraySize * boundedArraySize * 4);

      this .boundedVerticesIndex  = 0;
      this .boundedNormalsIndex   = numBoundedVertices;
      this .boundedHierarchyIndex = this .boundedNormalsIndex + numBoundedNormals;
      this .boundedHierarchyRoot  = this .boundedHierarchyIndex + boundedHierarchyLength - 1;

      boundedArray .set (boundedVertices);

      for (let s = this .boundedNormalsIndex * 4, n = 0, l = boundedNormals .length; n < l; s += 4, n += 3)
      {
         boundedArray [s + 0] = boundedNormals [n + 0];
         boundedArray [s + 1] = boundedNormals [n + 1];
         boundedArray [s + 2] = boundedNormals [n + 2];
      }

      boundedArray .set (boundedHierarchy, this .boundedHierarchyIndex * 4);

      if (boundedArraySize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this .boundedTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedArraySize, boundedArraySize, 0, gl .RGBA, gl .FLOAT, boundedArray);
      }
   },
   set_colorRamp__ ()
   {
      if (this .colorRampNode)
         this .colorRampNode .removeInterest ("set_color__", this);

      this .colorRampNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DColorNode, this ._color);

      if (this .colorRampNode)
         this .colorRampNode .addInterest ("set_color__", this);

      this .set_color__ ();
      this .set_transparent__ ();
   },
   set_color__ ()
   {
      const
         gl           = this .getBrowser () .getContext (),
         colorKey     = this ._colorKey,
         numColors    = colorKey .length,
         textureSize  = Math .ceil (Math .sqrt (numColors * 2));

      let colorRamp = this .colorRamp;

      if (textureSize * textureSize * 4 > colorRamp .length)
         colorRamp = this .colorRamp = new Float32Array (textureSize * textureSize * 4);

      for (let i = 0; i < numColors; ++ i)
         colorRamp [i * 4] = colorKey [i];

      if (this .colorRampNode)
         colorRamp .set (this .colorRampNode .addColors ([ ], numColors) .slice (0, numColors * 4), numColors * 4);
      else
         colorRamp .fill (1, numColors * 4);

      if (textureSize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this .colorRampTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, colorRamp);
     }

      this .numColors                      = numColors;
      this .geometryContext .colorMaterial = !! (numColors && this .colorRampNode);

      this .geometryContext .updateGeometryKey ();
      this .updateVertexArrays ();
   },
   set_texCoordRamp__ ()
   {
      if (this .texCoordRampNode)
         this .texCoordRampNode .removeInterest ("set_texCoord__", this);

      this .texCoordRampNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTextureCoordinateNode, this ._texCoord);

      if (this .texCoordRampNode)
         this .texCoordRampNode .addInterest ("set_texCoord__", this);

      this .set_texCoord__ ();
   },
   set_texCoord__ ()
   {
      const
         gl           = this .getBrowser () .getContext (),
         texCoordKey  = this ._texCoordKey,
         numTexCoords = texCoordKey .length,
         textureSize  = Math .ceil (Math .sqrt (numTexCoords + numTexCoords * this .texCoordCount));

      let texCoordRamp = this .texCoordRamp;

      if (textureSize * textureSize * 4 > texCoordRamp .length)
         texCoordRamp = this .texCoordRamp = new Float32Array (textureSize * textureSize * 4);
      else
         texCoordRamp .fill (0);

      for (let i = 0; i < numTexCoords; ++ i)
         texCoordRamp [i * 4] = texCoordKey [i];

      if (this .texCoordRampNode)
         texCoordRamp .set (this .texCoordRampNode .addPoints ([ ]) .slice (0, numTexCoords * this .texCoordCount * 4), numTexCoords * 4);

      if (textureSize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, texCoordRamp);
      }

      this .numTexCoords = this .texCoordRampNode ? numTexCoords : 0;

      this .updateVertexArrays ();
   },
   updateVertexArrays ()
   {
      this .inputParticles  .vertexArrayObject .update ();
      this .outputParticles .vertexArrayObject .update ();

      this .inputParticles  .thickLinesVertexArrayObject .update ();
      this .outputParticles .thickLinesVertexArrayObject .update ();
   },
   createTexture ()
   {
      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

      return texture;
   },
   createBuffer ()
   {
      const
         gl     = this .getBrowser () .getContext (),
         buffer = gl .createBuffer ();

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (), gl .DYNAMIC_DRAW);

      return buffer;
   },
   resizeBuffers (lastNumParticles)
   {
      const
         gl              = this .getBrowser () .getContext (),
         maxParticles    = this .maxParticles,
         particlesStride = this .particlesStride,
         outputParticles = Object .assign (gl .createBuffer (), this .outputParticles),
         data            = new Uint8Array (maxParticles * particlesStride);

      // Resize input buffer.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .inputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      // Resize output buffer.

      gl .bindBuffer (gl .COPY_READ_BUFFER, this .outputParticles);
      gl .bindBuffer (gl .ARRAY_BUFFER, outputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
      gl .copyBufferSubData (gl .COPY_READ_BUFFER, gl .ARRAY_BUFFER, 0, 0, Math .min (maxParticles * particlesStride, lastNumParticles * particlesStride));
      gl .deleteBuffer (this .outputParticles);

      this .outputParticles = outputParticles;
   },
   animateParticles ()
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
            now              = Date .now () / 1000,
            particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

         if (now - this .creationTime > particleLifetime)
         {
            this .creationTime    = now;
            this .numParticles    = this .maxParticles;
            this .createParticles = this ._createParticles .getValue ();

            deltaTime = Number .POSITIVE_INFINITY;
         }
         else
         {
            this .createParticles = false;
         }
      }
      else
      {
         this .createParticles = this ._createParticles .getValue ();

         if (this .numParticles < this .maxParticles)
         {
            const
               now          = Date .now () / 1000,
               newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

            if (newParticles)
               this .creationTime = now;

            this .numParticles = Math .min (this .maxParticles, this .numParticles + newParticles);
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

         if (numForces)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .forcesTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, numForces, 1, 0, gl .RGBA, gl .FLOAT, forces);
         }
      }
      else
      {
         this .numForces = 0;
      }

      // Swap buffers.

      const inputParticles  = this .outputParticles;
      this .outputParticles = this .inputParticles;
      this .inputParticles  = inputParticles;

      // Determine particle position, velocity and colors.

      emitterNode .animate (this, deltaTime);

      browser .addBrowserEvent ();
   },
   updateSprite: (() =>
   {
      const data = new Float32Array (QuadGeometry);

      const quad = [
         new (external_X_ITE_X3D_Vector3_default()) (-0.5, -0.5, 0),
         new (external_X_ITE_X3D_Vector3_default()) ( 0.5, -0.5, 0),
         new (external_X_ITE_X3D_Vector3_default()) ( 0.5,  0.5, 0),
         new (external_X_ITE_X3D_Vector3_default()) (-0.5, -0.5, 0),
         new (external_X_ITE_X3D_Vector3_default()) ( 0.5,  0.5, 0),
         new (external_X_ITE_X3D_Vector3_default()) (-0.5,  0.5, 0),
      ];

      const
         vertex = new (external_X_ITE_X3D_Vector3_default()) (),
         size   = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (gl, rotation)
      {
         // Normal

         for (let i = 0; i < 3; ++ i)
            data [24 + i] = rotation [6 + i];

         // Vertices

         size .set (this ._particleSize .x, this ._particleSize .y, 1);

         for (let i = 0; i < 6; ++ i)
         {
            const index = 27 + i * 4;

            rotation .multVecMatrix (vertex .assign (quad [i]) .multVec (size))

            data [index + 0] = vertex .x;
            data [index + 1] = vertex .y;
            data [index + 2] = vertex .z;
         }

         gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
      };
   })(),
   intersectsBox (box, clipPlanes)
   { },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case (external_X_ITE_X3D_TraverseType_default()).POINTER:
         {
            if (this ._pointerEvents .getValue ())
               renderObject .addPointingShape (this);

            break;
         }
         case (external_X_ITE_X3D_TraverseType_default()).PICKING:
         case (external_X_ITE_X3D_TraverseType_default()).COLLISION:
         {
            break;
         }
         case (external_X_ITE_X3D_TraverseType_default()).SHADOW:
         {
            if (this ._castShadow .getValue ())
               renderObject .addShadowShape (this);

            break;
         }
         case (external_X_ITE_X3D_TraverseType_default()).DISPLAY:
         {
            if (renderObject .addDisplayShape (this))
            {
               // Currently used for GeneratedCubeMapTexture.
               this .getAppearance () .traverse (type, renderObject);
            }

            break;
         }
      }

      if (this .geometryType === (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY)
      {
         // Currently used for ScreenText and Tools.
         this .getGeometry () ?.traverse (type, renderObject);
      }
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      if (!this .numParticles)
         return;

      // Display geometry.

      switch (this .geometryType)
      {
         case (external_X_ITE_X3D_GeometryTypes_default()).LINE:
         {
            this .lineGeometryNode .displaySimpleInstanced (gl, shaderNode, this);
            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY:
         {
            this .getGeometry () ?.displaySimpleInstanced (gl, shaderNode, this);
            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).SPRITE:
         {
            this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
            // [fall trough]
         }
         default:
         {
            const outputParticles = this .outputParticles;

            if (outputParticles .vertexArrayObject .enable (shaderNode .getProgram ()))
            {
               const particlesStride = this .particlesStride;

               shaderNode .enableParticleAttribute       (gl, outputParticles, particlesStride, this .particleOffset, 1);
               shaderNode .enableInstanceMatrixAttribute (gl, outputParticles, particlesStride, this .matrixOffset,   1);
               shaderNode .enableVertexAttribute         (gl, this .geometryBuffer, 0, this .verticesOffset);
            }

            gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);
            break;
         }
      }
   },
   display (gl, renderContext)
   {
      if (!this .numParticles)
         return;

      // Display geometry.

      switch (this .geometryType)
      {
         case (external_X_ITE_X3D_GeometryTypes_default()).LINE:
         {
            this .lineGeometryNode .displayInstanced (gl, renderContext, this);
            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).GEOMETRY:
         {
            this .getGeometry () ?.displayInstanced (gl, renderContext, this);
            break;
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).SPRITE:
         {
            this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
            // [fall trough]
         }
         case (external_X_ITE_X3D_GeometryTypes_default()).QUAD:
         case (external_X_ITE_X3D_GeometryTypes_default()).TRIANGLE:
         {
            const positiveScale = external_X_ITE_X3D_Matrix4_default().prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

            gl .frontFace (positiveScale ? gl .CCW : gl .CW);
            gl .enable (gl .CULL_FACE);

            // [fall trough]
         }
         default:
         {
            const
               browser         = this .getBrowser (),
               appearanceNode  = this .getAppearance (),
               renderModeNodes = appearanceNode .getRenderModes (),
               shaderNode      = appearanceNode .getShader (this .geometryContext, renderContext),
               primitiveMode   = browser .getPrimitiveMode (this .primitiveMode);

            for (const node of renderModeNodes)
               node .enable (gl);

            // Setup shader.

            shaderNode .enable (gl);
            shaderNode .setUniforms (gl, renderContext, this .geometryContext);

            if (this .numTexCoords)
            {
               const textureUnit = browser .getTexture2DUnit ();

               gl .activeTexture (gl .TEXTURE0 + textureUnit);
               gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
               gl .uniform1i (shaderNode .x3d_TexCoordRamp, textureUnit);
            }

            // Setup vertex attributes.

            const outputParticles = this .outputParticles;

            if (outputParticles .vertexArrayObject .enable (shaderNode .getProgram ()))
            {
               const { particlesStride } = this;

               shaderNode .enableParticleAttribute         (gl, outputParticles, particlesStride, this .particleOffset, 1);
               shaderNode .enableParticleVelocityAttribute (gl, outputParticles, particlesStride, this .velocityOffset, 1);
               shaderNode .enableInstanceMatrixAttribute   (gl, outputParticles, particlesStride, this .matrixOffset,   1);

               if (this .geometryContext .colorMaterial)
               {
                  shaderNode .enableColorAttribute (gl, outputParticles, particlesStride, this .colorOffset);
                  shaderNode .colorAttributeDivisor (gl, 1);
               }

               if (this .texCoordCount)
                  shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, this .texCoordOffset);

               if (this .hasNormals)
               {
                  shaderNode .enableNormalAttribute (gl, this .geometryBuffer, 0, this .normalOffset);
                  shaderNode .normalAttributeDivisor (gl, this .maxParticles);
               }

               shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, this .verticesOffset);
            }

            gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, this .numParticles);

            for (const node of renderModeNodes)
               node .disable (gl);

            break;
         }
      }
   },
   getScreenAlignedRotation: (() =>
   {
      const
         invModelViewMatrix = new (external_X_ITE_X3D_Matrix4_default()) (),
         billboardToScreen  = new (external_X_ITE_X3D_Vector3_default()) (),
         viewerYAxis        = new (external_X_ITE_X3D_Vector3_default()) (),
         y                  = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation           = new (external_X_ITE_X3D_Matrix3_default()) (9);

      return function (modelViewMatrix)
      {
         invModelViewMatrix .assign (modelViewMatrix) .inverse ();
         invModelViewMatrix .multDirMatrix (billboardToScreen .assign ((external_X_ITE_X3D_Vector3_default()).zAxis));
         invModelViewMatrix .multDirMatrix (viewerYAxis .assign ((external_X_ITE_X3D_Vector3_default()).yAxis));

         const x = viewerYAxis .cross (billboardToScreen);
         y .assign (billboardToScreen) .cross (x);
         const z = billboardToScreen;

         // Compose rotation matrix.

         x .normalize ();
         y .normalize ();
         z .normalize ();

         rotation .set (x .x, x .y, x .z,
                        y .x, y .y, y .z,
                        z .x, z .y, z .z);

         return rotation;
      };
   })(),
});

Object .defineProperties (ParticleSystem,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ParticleSystem", "ParticleSystems", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "createParticles",   new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geometryType",      new (external_X_ITE_X3D_Fields_default()).SFString ("QUAD")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "maxParticles",      new (external_X_ITE_X3D_Fields_default()).SFInt32 (200)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "particleLifetime",  new (external_X_ITE_X3D_Fields_default()).SFFloat (5)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "lifetimeVariation", new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "particleSize",      new (external_X_ITE_X3D_Fields_default()).SFVec2f (0.02, 0.02)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "emitter",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "physics",           new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "colorKey",          new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "color",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "texCoordKey",       new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "texCoord",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",          new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pointerEvents",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)), // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "castShadow",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",          new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",        new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "appearance",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geometry",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ParticleSystem_default_ = ParticleSystem;
;

/* harmony default export */ const ParticleSystems_ParticleSystem = (external_X_ITE_X3D_Namespace_default().add ("ParticleSystem", ParticleSystem_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .IndexedLineSet"
const external_X_ITE_X3D_IndexedLineSet_namespaceObject = __X_ITE_X3D__ .IndexedLineSet;
var external_X_ITE_X3D_IndexedLineSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_IndexedLineSet_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/PolylineEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function PolylineEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).PolylineEmitter);

   this .verticesIndex  = -1;
   this .polylinesNode  = new (external_X_ITE_X3D_IndexedLineSet_default()) (executionContext);
   this .polylinesArray = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (PolylineEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .polylinesTexture = this .createTexture ();

      // Initialize fields.

      this ._direction .addInterest ("set_direction__", this);

      this ._set_coordIndex .addFieldInterest (this ._coordIndex);
      this ._coordIndex     .addFieldInterest (this .polylinesNode ._coordIndex);
      this ._coord          .addFieldInterest (this .polylinesNode ._coord);

      this .polylinesNode ._coordIndex = this ._coordIndex;
      this .polylinesNode ._coord      = this ._coord;

      this .polylinesNode .setPrivate (true);
      this .polylinesNode .setup ();
      this .polylinesNode ._rebuild .addInterest ("set_polylines__", this);

      this .addDefine ("#define X3D_POLYLINE_EMITTER");
      this .addSampler ("polylines");

      this .addUniform ("direction",     "uniform vec3 direction;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("polylines",     "uniform sampler2D polylines;");

      this .addCallback (this .set_direction__);
      this .addCallback (this .set_verticesIndex__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
            return getRandomSphericalVelocity ();

         else
            return direction * getRandomSpeed ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         if (verticesIndex < 0)
         {
            return vec4 (NaN);
         }
         else
         {
            // Determine index0, index1 and weight.

            float lastLengthSoFar = texelFetch (polylines, verticesIndex - 1, 0) .x;
            float fraction        = random () * lastLengthSoFar;

            int   index0 = 0;
            int   index1 = 0;
            float weight = 0.0;

            interpolate (polylines, verticesIndex, fraction, index0, index1, weight);

            // Interpolate and return position.

            index0 *= 2;
            index1  = index0 + 1;

            vec4 vertex0 = texelFetch (polylines, verticesIndex + index0, 0);
            vec4 vertex1 = texelFetch (polylines, verticesIndex + index1, 0);

            return mix (vertex0, vertex1, weight);
         }
      }`);

      this .set_polylines__ ();
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this .polylinesNode .getBBox () .center)
            .add (this .polylinesNode .getBBox ());
      };
   })(),
   set_direction__: (() =>
   {
      const direction = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const { x, y, z } = direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", x, y, z);
      };
   })(),
   set_verticesIndex__ ()
   {
      this .setUniform ("uniform1i", "verticesIndex", this .verticesIndex);
   },
   set_polylines__: (() =>
   {
      const
         vertex1 = new (external_X_ITE_X3D_Vector3_default()) (),
         vertex2 = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const
            gl                = this .getBrowser () .getContext (),
            vertices          = this .polylinesNode .getVertices () .getValue (),
            numVertices       = vertices .length / 4,
            numLengthSoFar    = numVertices / 2 + 1,
            polylineArraySize = Math .ceil (Math .sqrt (numLengthSoFar + numVertices));

         const verticesIndex = numLengthSoFar;

         let polylinesArray = this .polylinesArray;

         if (polylinesArray .length < polylineArraySize * polylineArraySize * 4)
            polylinesArray = this .polylinesArray = new Float32Array (polylineArraySize * polylineArraySize * 4);

         let lengthSoFar = 0;

         for (let i = 0, length = vertices .length; i < length; i += 8)
         {
            vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
            vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

            polylinesArray [i / 2 + 4] = lengthSoFar += vertex2 .subtract (vertex1) .magnitude ();
         }

         polylinesArray .set (vertices, verticesIndex * 4);

         this .verticesIndex = numVertices ? verticesIndex : -1;

         if (polylineArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, polylineArraySize, polylineArraySize, 0, gl .RGBA, gl .FLOAT, polylinesArray);
         }

         this .set_verticesIndex__ ();

         this ._bbox_changed .addEvent ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .polylinesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
   },
});

Object .defineProperties (PolylineEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("PolylineEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_coordIndex", new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "on",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "direction",      new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "speed",          new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "variation",      new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "mass",           new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceArea",    new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "coordIndex",     new (external_X_ITE_X3D_Fields_default()).MFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "coord",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const PolylineEmitter_default_ = PolylineEmitter;
;

/* harmony default export */ const ParticleSystems_PolylineEmitter = (external_X_ITE_X3D_Namespace_default().add ("PolylineEmitter", PolylineEmitter_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Triangle3"
const external_X_ITE_X3D_Triangle3_namespaceObject = __X_ITE_X3D__ .Triangle3;
var external_X_ITE_X3D_Triangle3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Triangle3_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/SurfaceEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function SurfaceEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SurfaceEmitter);

   this .verticesIndex = -1;
   this .normalsIndex  = -1;
   this .surfaceNode   = null;
   this .surfaceArray  = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (SurfaceEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .surfaceTexture = this .createTexture ();

      // Initialize fields.

      this ._surface .addInterest ("set_surface__", this);

      this .addDefine ("#define X3D_SURFACE_EMITTER");
      this .addSampler ("surface");

      this .addUniform ("solid",         "uniform bool solid;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",  "uniform int normalsIndex;");
      this .addUniform ("surface",       "uniform sampler2D surface;");

      this .addCallback (this .set_solid__);
      this .addCallback (this .set_verticesIndex__);
      this .addCallback (this .set_normalsIndex__);

      this .addFunction (/* glsl */ `vec4 position; vec3 getRandomVelocity ()
      {
         if (verticesIndex < 0)
         {
            return vec3 (0.0);
         }
         else
         {
            vec3 normal;

            getRandomPointOnSurface (surface, verticesIndex, normalsIndex, position, normal);

            if (solid == false && random () > 0.5)
               normal = -normal;

            return normal * getRandomSpeed ();
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return verticesIndex < 0 ? vec4 (NaN) : position;
      }`);

      this .set_surface__ ();
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         if (!this .surfaceNode)
            return bbox .set ();

         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this .surfaceNode .getBBox () .center)
            .add (this .surfaceNode .getBBox ());
      };
   })(),
   set_surface__ ()
   {
      if (this .surfaceNode)
      {
         this .surfaceNode ._solid   .removeInterest ("set_solid__",    this);
         this .surfaceNode ._rebuild .removeInterest ("set_geometry__", this);
      }

      this .surfaceNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DGeometryNode, this ._surface);

      if (this .surfaceNode)
      {
         this .surfaceNode ._solid   .addInterest ("set_solid__",    this);
         this .surfaceNode ._rebuild .addInterest ("set_geometry__", this);
      }

      this .set_solid__ ();
      this .set_geometry__ ();
   },
   set_solid__ ()
   {
      this .setUniform ("uniform1i", "solid", this .surfaceNode ?._solid .getValue () ?? true);
   },
   set_verticesIndex__ ()
   {
      this .setUniform ("uniform1i", "verticesIndex", this .verticesIndex);
   },
   set_normalsIndex__ ()
   {
      this .setUniform ("uniform1i", "normalsIndex", this .normalsIndex);
   },
   set_geometry__: (() =>
   {
      const
         vertex1  = new (external_X_ITE_X3D_Vector3_default()) (),
         vertex2  = new (external_X_ITE_X3D_Vector3_default()) (),
         vertex3  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         if (this .surfaceNode)
         {
            const
               vertices         = this .surfaceNode .getVertices () .getValue (),
               normals          = this .surfaceNode .getNormals () .getValue (),
               numVertices      = vertices .length / 4,
               numAreaSoFar     = numVertices / 3 + 1,
               surfaceArraySize = Math .ceil (Math .sqrt (numAreaSoFar + numVertices + numVertices));

            const
               verticesIndex = numAreaSoFar,
               normalsIndex  = verticesIndex + numVertices;

            let surfaceArray = this .surfaceArray;

            if (surfaceArray .length < surfaceArraySize * surfaceArraySize * 4)
               surfaceArray = this .surfaceArray = new Float32Array (surfaceArraySize * surfaceArraySize * 4);

            let areaSoFar = 0;

            for (let i = 0, length = vertices .length; i < length; i += 12)
            {
               vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
               vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
               vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

               surfaceArray [i / 3 + 4] = areaSoFar += external_X_ITE_X3D_Triangle3_default().area (vertex1, vertex2, vertex3);
            }

            surfaceArray .set (vertices, verticesIndex * 4);

            for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
            {
               surfaceArray [s + 0] = normals [n + 0];
               surfaceArray [s + 1] = normals [n + 1];
               surfaceArray [s + 2] = normals [n + 2];
            }

            this .verticesIndex = numVertices ? verticesIndex : -1;
            this .normalsIndex  = numVertices ? normalsIndex  : -1;

            if (surfaceArraySize)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, surfaceArraySize, surfaceArraySize, 0, gl .RGBA, gl .FLOAT, surfaceArray);
            }
         }
         else
         {
            this .verticesIndex = -1;
            this .normalsIndex  = -1;
         }

         this .set_verticesIndex__ ();
         this .set_normalsIndex__ ();

         this ._bbox_changed .addEvent ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .surfaceTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
   },
});

Object .defineProperties (SurfaceEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SurfaceEmitter", "ParticleSystems", 2, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "on",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "speed",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "variation",   new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "mass",        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceArea", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "surface",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SurfaceEmitter_default_ = SurfaceEmitter;
;

/* harmony default export */ const ParticleSystems_SurfaceEmitter = (external_X_ITE_X3D_Namespace_default().add ("SurfaceEmitter", SurfaceEmitter_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .IndexedFaceSet"
const external_X_ITE_X3D_IndexedFaceSet_namespaceObject = __X_ITE_X3D__ .IndexedFaceSet;
var external_X_ITE_X3D_IndexedFaceSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_IndexedFaceSet_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/VolumeEmitter.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/












function VolumeEmitter (executionContext)
{
   ParticleSystems_X3DParticleEmitterNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).VolumeEmitter);

   this .verticesIndex  = -1;
   this .normalsIndex   = -1;
   this .hierarchyIndex = -1;
   this .hierarchyRoot  = -1;
   this .volumeNode     = new (external_X_ITE_X3D_IndexedFaceSet_default()) (executionContext);
   this .volumeArray    = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (VolumeEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .volumeTexture = this .createTexture ();

      // Initialize fields.

      this ._set_coordIndex .addFieldInterest (this ._coordIndex);
      this ._direction .addInterest ("set_direction__", this);

      this ._coordIndex .addFieldInterest (this .volumeNode ._coordIndex);
      this ._coord      .addFieldInterest (this .volumeNode ._coord);

      this .volumeNode ._creaseAngle = Math .PI;
      this .volumeNode ._convex      = false;
      this .volumeNode ._coordIndex  = this ._coordIndex;
      this .volumeNode ._coord       = this ._coord;

      this .volumeNode .setPrivate (true);
      this .volumeNode .setup ();
      this .volumeNode ._rebuild .addInterest ("set_geometry__", this);

      this .addDefine ("#define X3D_VOLUME_EMITTER");
      this .addSampler ("volume");

      this .addUniform ("direction",      "uniform vec3 direction;");
      this .addUniform ("verticesIndex",  "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",   "uniform int normalsIndex;");
      this .addUniform ("hierarchyIndex", "uniform int hierarchyIndex;");
      this .addUniform ("hierarchyRoot",  "uniform int hierarchyRoot;");
      this .addUniform ("volume",         "uniform sampler2D volume;");

      this .addCallback (this .set_direction__);
      this .addCallback (this .set_verticesIndex__);
      this .addCallback (this .set_normalsIndex__);
      this .addCallback (this .set_hierarchyIndex__);
      this .addCallback (this .set_hierarchyRoot__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (hierarchyRoot < 0)
         {
            return vec3 (0.0);
         }
         else
         {
            if (direction == vec3 (0.0))
               return getRandomSphericalVelocity ();

            else
               return direction * getRandomSpeed ();
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         if (hierarchyRoot < 0)
         {
            return vec4 (NaN);
         }
         else
         {
            vec4 point;
            vec3 normal;

            getRandomPointOnSurface (volume, verticesIndex, normalsIndex, point, normal);

            Line3 line = Line3 (point .xyz, getRandomSurfaceNormal (normal));

            vec4 points [ARRAY_SIZE];

            int numIntersections = getIntersections (volume, verticesIndex, hierarchyIndex, hierarchyRoot, line, points);

            numIntersections -= numIntersections % 2; // We need an even count of intersections.

            switch (numIntersections)
            {
               case 0:
                  return vec4 (0.0);
               case 2:
                  break;
               default:
                  sort (points, numIntersections, plane3 (line .point, line .direction));
                  break;
            }

            int index = int (fract (random ()) * float (numIntersections / 2)) * 2; // Select random intersection.

            return mix (points [index], points [index + 1], random ());
         }
      }`);

      this .set_geometry__ ();
   },
   getBBox: (function ()
   {
      const bboxSize = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this .volumeNode .getBBox () .center)
            .add (this .volumeNode .getBBox ());
      };
   })(),
   set_direction__: (() =>
   {
      const direction = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const { x, y, z } = direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", x, y, z);
      };
   })(),
   set_verticesIndex__ ()
   {
      this .setUniform ("uniform1i", "verticesIndex", this .verticesIndex);
   },
   set_normalsIndex__ ()
   {
      this .setUniform ("uniform1i", "normalsIndex", this .normalsIndex);
   },
   set_hierarchyIndex__ ()
   {
      this .setUniform ("uniform1i", "hierarchyIndex", this .hierarchyIndex);
   },
   set_hierarchyRoot__ ()
   {
      this .setUniform ("uniform1i", "hierarchyRoot", this .hierarchyRoot);
   },
   set_geometry__: (() =>
   {
      const
         vertex1 = new (external_X_ITE_X3D_Vector3_default()) (),
         vertex2 = new (external_X_ITE_X3D_Vector3_default()) (),
         vertex3 = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const
            gl              = this .getBrowser () .getContext (),
            vertices        = this .volumeNode .getVertices () .getValue (),
            normals         = this .volumeNode .getNormals () .getValue (),
            hierarchy       = new Utility_BVH (vertices, normals) .toArray ([ ]),
            numVertices     = vertices .length / 4,
            numNormals      = normals .length / 3,
            numAreaSoFar    = numVertices / 3 + 1,
            hierarchyLength = hierarchy .length / 4,
            volumeArraySize = Math .ceil (Math .sqrt (numAreaSoFar + numVertices + numVertices + hierarchyLength));

         const
            verticesIndex  = numAreaSoFar,
            normalsIndex   = verticesIndex + numVertices,
            hierarchyIndex = normalsIndex + numNormals;

         let volumeArray = this .volumeArray;

         if (volumeArray .length < volumeArraySize * volumeArraySize * 4)
            volumeArray = this .volumeArray = new Float32Array (volumeArraySize * volumeArraySize * 4);

         let areaSoFar = 0;

         for (let i = 0, length = vertices .length; i < length; i += 12)
         {
            vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
            vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
            vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

            volumeArray [i / 3 + 4] = areaSoFar += external_X_ITE_X3D_Triangle3_default().area (vertex1, vertex2, vertex3);
         }

         volumeArray .set (vertices, verticesIndex * 4);

         for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
         {
            volumeArray [s + 0] = normals [n + 0];
            volumeArray [s + 1] = normals [n + 1];
            volumeArray [s + 2] = normals [n + 2];
         }

         volumeArray .set (hierarchy, hierarchyIndex * 4);

         this .verticesIndex  = verticesIndex;
         this .normalsIndex   = normalsIndex;
         this .hierarchyIndex = hierarchyIndex;
         this .hierarchyRoot  = hierarchyIndex + hierarchyLength - 1;

         if (volumeArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, volumeArraySize, volumeArraySize, 0, gl .RGBA, gl .FLOAT, volumeArray);
         }

         this .set_verticesIndex__ ();
         this .set_normalsIndex__ ();
         this .set_hierarchyIndex__ ();
         this .set_hierarchyRoot__ ();

         this ._bbox_changed .addEvent ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .volumeTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
   },
});

Object .defineProperties (VolumeEmitter,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("VolumeEmitter", "ParticleSystems", 2, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_coordIndex", new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "on",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "internal",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "direction",      new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "speed",          new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "variation",      new (external_X_ITE_X3D_Fields_default()).SFFloat (0.25)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "mass",           new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceArea",    new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "coordIndex",     new (external_X_ITE_X3D_Fields_default()).MFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "coord",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumeEmitter_default_ = VolumeEmitter;
;

/* harmony default export */ const ParticleSystems_VolumeEmitter = (external_X_ITE_X3D_Namespace_default().add ("VolumeEmitter", VolumeEmitter_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/WindPhysicsModel.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function WindPhysicsModel (executionContext)
{
   ParticleSystems_X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).WindPhysicsModel);

   // Units

   this ._speed .setUnit ("speed");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._direction = new (external_X_ITE_X3D_Vector3_default()) ();
}

Object .assign (Object .setPrototypeOf (WindPhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   getRandomSpeed (emitterNode)
   {
      const
         speed     = Math .max (this ._speed .getValue (), 0),
         variation = speed * Math .max (this ._gustiness .getValue (), 0);

      return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
   },
   addForce: (() =>
   {
      const force = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            const
               surfaceArea = emitterNode .getSurfaceArea (),
               speed       = this .getRandomSpeed (emitterNode),
               pressure    = 10 ** (2 * Math .log (speed)) * 0.64615;

            if (this ._direction .getValue () .equals ((external_X_ITE_X3D_Vector3_default()).Zero))
               emitterNode .getRandomNormal (force);
            else
               force .assign (this ._direction .getValue ()) .normalize ();

            forces .set (force .multiply (surfaceArea * pressure * timeByMass), i * 4);
            forces [i * 4 + 3] = Math .PI * external_X_ITE_X3D_Algorithm_default().clamp (this ._turbulence .getValue (), 0, 1);

            return true;
         }
         else
         {
            return false;
         }
      }
   })(),
});

Object .defineProperties (WindPhysicsModel,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("WindPhysicsModel", "ParticleSystems", 1, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",    new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "direction",  new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "speed",      new (external_X_ITE_X3D_Fields_default()).SFFloat (0.1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "gustiness",  new (external_X_ITE_X3D_Fields_default()).SFFloat (0.1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "turbulence", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const WindPhysicsModel_default_ = WindPhysicsModel;
;

/* harmony default export */ const ParticleSystems_WindPhysicsModel = (external_X_ITE_X3D_Namespace_default().add ("WindPhysicsModel", WindPhysicsModel_default_));
;// CONCATENATED MODULE: ./src/assets/components/ParticleSystemsComponent.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/
















external_X_ITE_X3D_Components_default().add ({
   name: "ParticleSystems",
   concreteNodes:
   [
      ParticleSystems_BoundedPhysicsModel,
      ParticleSystems_ConeEmitter,
      ParticleSystems_ExplosionEmitter,
      ParticleSystems_ForcePhysicsModel,
      ParticleSystems_ParticleSystem,
      ParticleSystems_PointEmitter,
      ParticleSystems_PolylineEmitter,
      ParticleSystems_SurfaceEmitter,
      ParticleSystems_VolumeEmitter,
      ParticleSystems_WindPhysicsModel,
   ],
   abstractNodes:
   [
      ParticleSystems_X3DParticleEmitterNode,
      ParticleSystems_X3DParticlePhysicsModelNode,
   ],
   browserContext: ParticleSystems_X3DParticleSystemsContext,
});

const ParticleSystemsComponent_default_ = undefined;
;

/* harmony default export */ const ParticleSystemsComponent = (external_X_ITE_X3D_Namespace_default().add ("ParticleSystemsComponent", ParticleSystemsComponent_default_));
/******/ })()
;