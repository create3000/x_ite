/* X_ITE v9.1.6 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((module) => {

module.exports = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("lib/jquery");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components\")"
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DNode\")"
const X3DNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Core/X3DNode");
var X3DNode_default = /*#__PURE__*/__webpack_require__.n(X3DNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/GeometryTypes.js
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

 let i = 0;

const GeometryTypes = {
   POINT:    i ++,
   LINE:     i ++,
   TRIANGLE: i ++,
   QUAD:     i ++,
   SPRITE:   i ++,
   GEOMETRY: i ++,
};

const __default__ = GeometryTypes;
;

Namespace_default().add ("GeometryTypes", "x_ite/Browser/ParticleSystems/GeometryTypes", __default__);
/* harmony default export */ const ParticleSystems_GeometryTypes = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Line3.glsl.js
const Line3_glsl_default_ = /* glsl */ `struct Line3{vec3 point;vec3 direction;};bool intersects(const in Line3 line,const in vec3 a,const in vec3 b,const in vec3 c,out vec3 r){vec3 edge1=b-a;vec3 edge2=c-a;vec3 pvec=cross(line.direction,edge2);float det=dot(edge1,pvec);if(det==0.0)return false;float inv_det=1.0/det;vec3 tvec=line.point-a;float u=dot(tvec,pvec)*inv_det;if(u<0.0||u>1.0)return false;vec3 qvec=cross(tvec,edge1);float v=dot(line.direction,qvec)*inv_det;if(v<0.0||u+v>1.0)return false;r=vec3(u,v,1.0-u-v);return true;}`
;

Namespace_default().add ("Line3.glsl", "x_ite/Browser/ParticleSystems/Line3.glsl", Line3_glsl_default_);
/* harmony default export */ const Line3_glsl = (Line3_glsl_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Plane3.glsl.js
const Plane3_glsl_default_ = /* glsl */ `struct Plane3{vec3 normal;float distanceFromOrigin;};Plane3 plane3(const in vec3 point,const in vec3 normal){return Plane3(normal,dot(normal,point));}float plane_distance(const in Plane3 plane,const in vec3 point){return dot(point,plane.normal)-plane.distanceFromOrigin;}bool intersects(const in Plane3 plane,const in Line3 line,out vec3 point){float theta=dot(line.direction,plane.normal);if(theta==0.0)return false;float t=(plane.distanceFromOrigin-dot(plane.normal,line.point))/theta;point=line.point+line.direction*t;return true;}void sort(inout vec4 points[ARRAY_SIZE],const in int count,const in Plane3 plane){const float shrink=1.0/1.3;int gap=count;bool exchanged=true;while(exchanged){gap=int(float(gap)*shrink);if(gap<=1){exchanged=false;gap=1;}for(int i=0,l=count-gap;i<l;++i){int j=gap+i;if(plane_distance(plane,points[i].xyz)>plane_distance(plane,points[j].xyz)){vec4 tmp1=points[i];points[i]=points[j];points[j]=tmp1;exchanged=true;}}}}int min_index(const in vec4 points[ARRAY_SIZE],const in int count,const in float value,const in Plane3 plane){int index=-1;float dist=1000000.0;for(int i=0;i<count;++i){float d=plane_distance(plane,points[i].xyz);if(d>=value&&d<dist){dist=d;index=i;}}return index;}`
;

Namespace_default().add ("Plane3.glsl", "x_ite/Browser/ParticleSystems/Plane3.glsl", Plane3_glsl_default_);
/* harmony default export */ const Plane3_glsl = (Plane3_glsl_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/Box3.glsl.js
const Box3_glsl_default_ = /* glsl */ `bool intersects(const in vec3 min,const in vec3 max,const in Line3 line){vec3 intersection;if(intersects(plane3(max,vec3(0.0,0.0,1.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xy,max.xy),vec4(min.xy,intersection.xy))))return true;}if(intersects(plane3(min,vec3(0.0,0.0,-1.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xy,max.xy),vec4(min.xy,intersection.xy))))return true;}if(intersects(plane3(max,vec3(0.0,1.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xz,max.xz),vec4(min.xz,intersection.xz))))return true;}if(intersects(plane3(min,vec3(0.0,-1.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.xz,max.xz),vec4(min.xz,intersection.xz))))return true;}if(intersects(plane3(max,vec3(1.0,0.0,0.0)),line,intersection)){if(all(greaterThanEqual(vec4(intersection.yz,max.yz),vec4(min.yz,intersection.yz))))return true;}return false;}`
;

Namespace_default().add ("Box3.glsl", "x_ite/Browser/ParticleSystems/Box3.glsl", Box3_glsl_default_);
/* harmony default export */ const Box3_glsl = (Box3_glsl_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/ParticleSystems/BVH.glsl.js
const BVH_glsl_default_ = /* glsl */ `#define BVH_NODE 0
#define BVH_TRIANGLE 1
#define BVH_STACK_SIZE 32
int bvhNodeIndex=0;void setBVHIndex(const in int index){bvhNodeIndex=index;}int getBVHRoot(const in sampler2D volume,const in int hierarchyIndex,const in int rootIndex){return int(texelFetch(volume,rootIndex,0).x)+hierarchyIndex;}int getBVHType(const in sampler2D volume){return int(texelFetch(volume,bvhNodeIndex,0).x);}vec3 getBVHMin(const in sampler2D volume){return texelFetch(volume,bvhNodeIndex+1,0).xyz;}vec3 getBVHMax(const in sampler2D volume){return texelFetch(volume,bvhNodeIndex+2,0).xyz;}int getBVHLeft(const in sampler2D volume,const in int hierarchyIndex){return int(texelFetch(volume,bvhNodeIndex,0).y)+hierarchyIndex;}int getBVHRight(const in sampler2D volume,const in int hierarchyIndex){return int(texelFetch(volume,bvhNodeIndex,0).z)+hierarchyIndex;}int getBVHTriangle(const in sampler2D volume){return int(texelFetch(volume,bvhNodeIndex,0).y);}int getIntersections(const in sampler2D volume,const in int verticesIndex,const in int hierarchyIndex,const in int rootIndex,const in Line3 line,out vec4 points[ARRAY_SIZE]){int current=getBVHRoot(volume,hierarchyIndex,rootIndex);int count=0;int stackIndex=-1;int stack[BVH_STACK_SIZE];while(stackIndex>=0||current>=0){if(current>=0){setBVHIndex(current);if(getBVHType(volume)==BVH_NODE){if(intersects(getBVHMin(volume),getBVHMax(volume),line)){stack[++stackIndex]=current;current=getBVHLeft(volume,hierarchyIndex);}else{current=-1;}}else{int t=getBVHTriangle(volume);int v=verticesIndex+t;vec3 r=vec3(0.0);vec3 a=texelFetch(volume,v,0).xyz;vec3 b=texelFetch(volume,v+1,0).xyz;vec3 c=texelFetch(volume,v+2,0).xyz;if(intersects(line,a,b,c,r))points[count++]=vec4(r.z*a+r.x*b+r.y*c,1.0);current=-1;}}else{setBVHIndex(stack[stackIndex--]);current=getBVHRight(volume,hierarchyIndex);}}return count;}int getIntersections(const in sampler2D volume,const in int verticesIndex,const in int normalsIndex,const in int hierarchyIndex,const in int rootIndex,const in Line3 line,out vec4 points[ARRAY_SIZE],out vec3 normals[ARRAY_SIZE]){int current=getBVHRoot(volume,hierarchyIndex,rootIndex);int count=0;int stackIndex=-1;int stack[BVH_STACK_SIZE];while(stackIndex>=0||current>=0){if(current>=0){setBVHIndex(current);if(getBVHType(volume)==BVH_NODE){if(intersects(getBVHMin(volume),getBVHMax(volume),line)){stack[++stackIndex]=current;current=getBVHLeft(volume,hierarchyIndex);}else{current=-1;}}else{int t=getBVHTriangle(volume);int v=verticesIndex+t;vec3 r=vec3(0.0);vec3 a=texelFetch(volume,v,0).xyz;vec3 b=texelFetch(volume,v+1,0).xyz;vec3 c=texelFetch(volume,v+2,0).xyz;if(intersects(line,a,b,c,r)){points[count]=vec4(r.z*a+r.x*b+r.y*c,1.0);int n=normalsIndex+t;vec3 n0=texelFetch(volume,n,0).xyz;vec3 n1=texelFetch(volume,n+1,0).xyz;vec3 n2=texelFetch(volume,n+2,0).xyz;normals[count]=save_normalize(r.z*n0+r.x*n1+r.y*n2);++count;}current=-1;}}else{setBVHIndex(stack[stackIndex--]);current=getBVHRight(volume,hierarchyIndex);}}return count;}`
;

Namespace_default().add ("BVH.glsl", "x_ite/Browser/ParticleSystems/BVH.glsl", BVH_glsl_default_);
/* harmony default export */ const BVH_glsl = (BVH_glsl_default_);
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
   X3DNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DParticleEmitterNode);

   this ._speed       .setUnit ("speed");
   this ._mass        .setUnit ("mass");
   this ._surfaceArea .setUnit ("area");

   this .samplers  = [ ];
   this .uniforms  = { };
   this .functions = [ ];
   this .program   = null;

   this .addSampler ("forces");
   this .addSampler ("boundedVolume");
   this .addSampler ("colorRamp");
   this .addSampler ("texCoordRamp");

   this .addUniform ("speed",     "uniform float speed;");
   this .addUniform ("variation", "uniform float variation;");

   this .addFunction (Line3_glsl);
   this .addFunction (Plane3_glsl);
   this .addFunction (Box3_glsl);
   this .addFunction (BVH_glsl);
}

Object .assign (Object .setPrototypeOf (X3DParticleEmitterNode .prototype, (X3DNode_default()).prototype),
{
   initialize ()
   {
      X3DNode_default().prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      // Create program.

      this .program           = this .createProgram ();
      this .transformFeedback = gl .createTransformFeedback ();

      // Initialize fields.

      this ._on        .addInterest ("set_on__",        this);
      this ._speed     .addInterest ("set_speed__",     this);
      this ._variation .addInterest ("set_variation__", this);
      this ._mass      .addInterest ("set_mass__",      this);

      this .set_on__ ();
      this .set_speed__ ();
      this .set_variation__ ();
      this .set_mass__ ();
   },
   isExplosive ()
   {
      return false;
   },
   getMass ()
   {
      return this .mass;
   },
   set_on__ ()
   {
      this .on = this ._on .getValue ();
   },
   set_speed__ ()
   {
      this .setUniform ("uniform1f", "speed", this ._speed .getValue ());
   },
   set_variation__ ()
   {
      this .setUniform ("uniform1f", "variation", this ._variation .getValue ());
   },
   set_mass__ ()
   {
      this .mass = this ._mass .getValue ();
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
         browser         = this .getBrowser (),
         gl              = browser .getContext (),
         inputParticles  = particleSystem .inputParticles,
         particleStride  = particleSystem .particleStride,
         particleOffsets = particleSystem .particleOffsets,
         program         = this .program;

      // Start

      gl .useProgram (program);

      // Uniforms

      gl .uniform1i (program .randomSeed,        Math .random () * 0xffffffff);
      gl .uniform1i (program .geometryType,      particleSystem .geometryType);
      gl .uniform1i (program .createParticles,   particleSystem .createParticles && this .on);
      gl .uniform1f (program .particleLifetime,  particleSystem .particleLifetime);
      gl .uniform1f (program .lifetimeVariation, particleSystem .lifetimeVariation);
      gl .uniform1f (program .deltaTime,         deltaTime);
      gl .uniform2f (program .particleSize,      particleSystem ._particleSize .x, particleSystem ._particleSize .y);

      // Forces

      gl .uniform1i (program .numForces, particleSystem .numForces);

      if (particleSystem .numForces)
      {
         gl .activeTexture (gl .TEXTURE0 + program .forcesTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .forcesTexture);
      }

      // Bounded Physics

      if (particleSystem .boundedHierarchyRoot < 0)
      {
         gl .uniform1i (program .boundedHierarchyRoot, -1);
      }
      else
      {
         gl .uniform1i (program .boundedVerticesIndex,  particleSystem .boundedVerticesIndex);
         gl .uniform1i (program .boundedNormalsIndex,   particleSystem .boundedNormalsIndex);
         gl .uniform1i (program .boundedHierarchyIndex, particleSystem .boundedHierarchyIndex);
         gl .uniform1i (program .boundedHierarchyRoot,  particleSystem .boundedHierarchyRoot);

         gl .activeTexture (gl .TEXTURE0 + program .boundedVolumeTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .boundedTexture);
      }

      // Colors

      gl .uniform1i (program .numColors, particleSystem .numColors);

      if (particleSystem .numColors)
      {
         gl .activeTexture (gl .TEXTURE0 + program .colorRampTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .colorRampTexture);
      }

      // TexCoords

      gl .uniform1i (program .numTexCoords, particleSystem .numTexCoords);

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
         for (const [i, attribute] of program .inputs)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, inputParticles);
            gl .enableVertexAttribArray (attribute);
            gl .vertexAttribPointer (attribute, 4, gl .FLOAT, false, particleStride, particleOffsets [i]);
         }

         gl .bindBuffer (gl .ARRAY_BUFFER, null);
      }

      // Transform particles.

      gl .bindFramebuffer (gl .FRAMEBUFFER, null); // Prevent texture feedback loop error, see NYC in Firefox.
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, this .transformFeedback);
      gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, particleSystem .outputParticles);
      gl .enable (gl .RASTERIZER_DISCARD);
      gl .beginTransformFeedback (gl .POINTS);
      gl .drawArrays (gl .POINTS, 0, particleSystem .numParticles);
      gl .endTransformFeedback ();
      gl .disable (gl .RASTERIZER_DISCARD);
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

      // DEBUG

      // const data = new Float32Array (particleSystem .numParticles * (particleStride / 4));
      // gl .bindBuffer (gl .ARRAY_BUFFER, particleSystem .outputParticles);
      // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
      // console .log (data .slice (0, particleStride / 4));
   },
   addSampler (name)
   {
      this .samplers .push (name);
   },
   addUniform (name, uniform)
   {
      this .uniforms [name] = uniform;
   },
   setUniform (func, name, value1, value2, value3)
   {
      const
         gl      = this .getBrowser () .getContext (),
         program = this .program;

      gl .useProgram (program);
      gl [func] (program [name], value1, value2, value3);
   },
   addFunction (func)
   {
      this .functions .push (func);
   },
   createProgram ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      const vertexShaderSource = /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler2D;uniform int randomSeed;uniform int geometryType;uniform bool createParticles;uniform float particleLifetime;uniform float lifetimeVariation;uniform float deltaTime;uniform vec2 particleSize;uniform int numForces;uniform sampler2D forces;uniform int boundedVerticesIndex;uniform int boundedNormalsIndex;uniform int boundedHierarchyIndex;uniform int boundedHierarchyRoot;uniform sampler2D boundedVolume;uniform int numColors;uniform sampler2D colorRamp;uniform int texCoordCount;uniform int numTexCoords;uniform sampler2D texCoordRamp;
${Object .values (this .uniforms) .join ("\n")}
 in vec4 input0;in vec4 input2;in vec4 input6;out vec4 output0;out vec4 output1;out vec4 output2;out vec4 output3;out vec4 output4;out vec4 output5;out vec4 output6;
${Object .entries (ParticleSystems_GeometryTypes) .map (([k, v]) => `#define ${k} ${v}`) .join ("\n")}
 const int ARRAY_SIZE=32;const float M_PI=3.14159265359;uniform float NaN;vec4 texelFetch(const in sampler2D sampler,const in int index,const in int lod){int x=textureSize(sampler,lod).x;ivec2 p=ivec2(index % x,index/x);vec4 t=texelFetch(sampler,p,lod);return t;}vec3 save_normalize(const in vec3 vector){float l=length(vector);if(l==0.0)return vec3(0.0);return vector/l;}vec4 Quaternion(const in vec3 fromVector,const in vec3 toVector){vec3 from=save_normalize(fromVector);vec3 to=save_normalize(toVector);float cos_angle=dot(from,to);vec3 cross_vec=cross(from,to);float cross_len=length(cross_vec);if(cross_len==0.0){if(cos_angle>0.0){return vec4(0.0,0.0,0.0,1.0);}else{vec3 t=cross(from,vec3(1.0,0.0,0.0));if(dot(t,t)==0.0)t=cross(from,vec3(0.0,1.0,0.0));t=save_normalize(t);return vec4(t,0.0);}}else{float s=sqrt(abs(1.0-cos_angle)*0.5);cross_vec=save_normalize(cross_vec);return vec4(cross_vec*s,sqrt(abs(1.0+cos_angle)*0.5));}}vec3 multVecQuat(const in vec3 v,const in vec4 q){float a=q.w*q.w-q.x*q.x-q.y*q.y-q.z*q.z;float b=2.0*(v.x*q.x+v.y*q.y+v.z*q.z);float c=2.0*q.w;vec3 r=a*v.xyz+b*q.xyz+c*(q.yzx*v.zxy-q.zxy*v.yzx);return r;}mat3 Matrix3(const in vec4 quaternion){float x=quaternion.x;float y=quaternion.y;float z=quaternion.z;float w=quaternion.w;float A=y*y;float B=z*z;float C=x*y;float D=z*w;float E=z*x;float F=y*w;float G=x*x;float H=y*z;float I=x*w;return mat3(1.0-2.0*(A+B),2.0*(C+D),2.0*(E-F),2.0*(C-D),1.0-2.0*(B+G),2.0*(H+I),2.0*(E+F),2.0*(H-I),1.0-2.0*(A+G));}uint seed=1u;void srand(const in int value){seed=uint(value);}float random(){seed=seed*1103515245u+12345u;return float(seed)/4294967295.0;}float getRandomValue(const in float min,const in float max){return min+random()*(max-min);}float getRandomLifetime(){float v=particleLifetime*lifetimeVariation;float min_=max(0.0,particleLifetime-v);float max_=particleLifetime+v;return getRandomValue(min_,max_);}float getRandomSpeed(){float v=speed*variation;float min_=max(0.0,speed-v);float max_=speed+v;return getRandomValue(min_,max_);}vec3 getRandomNormal(){float theta=getRandomValue(-M_PI,M_PI);float cphi=getRandomValue(-1.0,1.0);float r=sqrt(1.0-cphi*cphi);return vec3(sin(theta)*r,cos(theta)*r,cphi);}vec3 getRandomNormalWithAngle(const in float angle){float theta=getRandomValue(-M_PI,M_PI);float cphi=getRandomValue(cos(angle),1.0);float r=sqrt(1.0-cphi*cphi);return vec3(sin(theta)*r,cos(theta)*r,cphi);}vec3 getRandomNormalWithDirectionAndAngle(const in vec3 direction,const in float angle){vec4 rotation=Quaternion(vec3(0.0,0.0,1.0),direction);vec3 normal=getRandomNormalWithAngle(angle);return multVecQuat(normal,rotation);}vec3 getRandomSurfaceNormal(const in vec3 direction){float theta=getRandomValue(-M_PI,M_PI);float cphi=pow(random(),1.0/3.0);float r=sqrt(1.0-cphi*cphi);vec3 normal=vec3(sin(theta)*r,cos(theta)*r,cphi);vec4 rotation=Quaternion(vec3(0.0,0.0,1.0),direction);return multVecQuat(normal,rotation);}vec3 getRandomSphericalVelocity(){vec3 normal=getRandomNormal();float speed=getRandomSpeed();return normal*speed;}int upperBound(const in sampler2D sampler,in int count,const in float value){int first=0;int step=0;while(count>0){int index=first;step=count>>1;index+=step;if(value<texelFetch(sampler,index,0).x){count=step;}else{first=++index;count-=step+1;}}return first;}void interpolate(const in sampler2D sampler,const in int count,const in float fraction,out int index0,out int index1,out float weight){if(count==1||fraction<=texelFetch(sampler,0,0).x){index0=0;index1=0;weight=0.0;}else if(fraction>=texelFetch(sampler,count-1,0).x){index0=count-2;index1=count-1;weight=1.0;}else{int index=upperBound(sampler,count,fraction);if(index<count){index1=index;index0=index-1;float key0=texelFetch(sampler,index0,0).x;float key1=texelFetch(sampler,index1,0).x;weight=clamp((fraction-key0)/(key1-key0),0.0,1.0);}else{index0=0;index1=0;weight=0.0;}}}void interpolate(const in sampler2D sampler,const in int count,const in float fraction,out int index0){if(count==1||fraction<=texelFetch(sampler,0,0).x){index0=0;}else if(fraction>=texelFetch(sampler,count-1,0).x){index0=count-2;}else{int index=upperBound(sampler,count,fraction);if(index<count)index0=index-1;else index0=0;}}vec3 getRandomBarycentricCoord(){float u=random();float v=random();if(u+v>1.0){u=1.0-u;v=1.0-v;}float t=1.0-u-v;return vec3(t,u,v);}void getRandomPointOnSurface(const in sampler2D surface,const in int verticesIndex,const in int normalsIndex,out vec4 position,out vec3 normal){float lastAreaSoFar=texelFetch(surface,verticesIndex-1,0).x;float fraction=random()*lastAreaSoFar;int index0;int index1;int index2;float weight;interpolate(surface,verticesIndex,fraction,index0,index1,weight);index0*=3;index1=index0+1;index2=index0+2;vec4 vertex0=texelFetch(surface,verticesIndex+index0,0);vec4 vertex1=texelFetch(surface,verticesIndex+index1,0);vec4 vertex2=texelFetch(surface,verticesIndex+index2,0);vec3 normal0=texelFetch(surface,normalsIndex+index0,0).xyz;vec3 normal1=texelFetch(surface,normalsIndex+index1,0).xyz;vec3 normal2=texelFetch(surface,normalsIndex+index2,0).xyz;vec3 r=getRandomBarycentricCoord();position=r.z*vertex0+r.x*vertex1+r.y*vertex2;normal=save_normalize(r.z*normal0+r.x*normal1+r.y*normal2);}
${this .functions .join ("\n")}
 vec4 getColor(const in float lifetime,const in float elapsedTime){if(numColors>0){float fraction=elapsedTime/lifetime;int index0;int index1;float weight;interpolate(colorRamp,numColors,fraction,index0,index1,weight);vec4 color0=texelFetch(colorRamp,numColors+index0,0);vec4 color1=texelFetch(colorRamp,numColors+index1,0);return mix(color0,color1,weight);}else{return vec4(1.0);}}void bounce(const in vec4 fromPosition,inout vec4 toPosition,inout vec3 velocity){if(boundedHierarchyRoot<0)return;Line3 line=Line3(fromPosition.xyz,save_normalize(velocity));vec4 points[ARRAY_SIZE];vec3 normals[ARRAY_SIZE];int numIntersections=getIntersections(boundedVolume,boundedVerticesIndex,boundedNormalsIndex,boundedHierarchyIndex,boundedHierarchyRoot,line,points,normals);if(numIntersections==0)return;Plane3 plane1=plane3(line.point,line.direction);int index=min_index(points,numIntersections,0.0,plane1);if(index==-1)return;Plane3 plane2=plane3(points[index].xyz,normals[index]);if(sign(plane_distance(plane2,fromPosition.xyz))==sign(plane_distance(plane2,toPosition.xyz)))return;velocity=reflect(velocity,normals[index]);toPosition=vec4(points[index].xyz+reflect(points[index].xyz-fromPosition.xyz,normals[index]),1.0);}int getTexCoordIndex0(const in float lifetime,const in float elapsedTime){if(numTexCoords==0){return-1;}else{float fraction=elapsedTime/lifetime;int index0=0;interpolate(texCoordRamp,numTexCoords,fraction,index0);return numTexCoords+index0*texCoordCount;}}void main(){int life=int(input0[0]);float lifetime=input0[1];float elapsedTime=input0[2]+deltaTime;srand((gl_VertexID+randomSeed)*randomSeed);if(elapsedTime>lifetime){lifetime=getRandomLifetime();elapsedTime=0.0;output0=vec4(max(life+1,1),lifetime,elapsedTime,getTexCoordIndex0(lifetime,elapsedTime));if(createParticles){output1=getColor(lifetime,elapsedTime);output2=vec4(getRandomVelocity(),0.0);output6=getRandomPosition();}else{output1=vec4(0.0);output2=vec4(0.0);output6=vec4(NaN);}}else{vec3 velocity=input2.xyz;vec4 position=input6;for(int i=0;i<numForces;++i){vec4 force=texelFetch(forces,i,0);float turbulence=force.w;vec3 normal=getRandomNormalWithDirectionAndAngle(force.xyz,turbulence);float speed=length(force.xyz);velocity+=normal*speed;}position.xyz+=velocity*deltaTime;bounce(input6,position,velocity);output0=vec4(life,lifetime,elapsedTime,getTexCoordIndex0(lifetime,elapsedTime));output1=getColor(lifetime,elapsedTime);output2=vec4(velocity,0.0);output6=position;}switch(geometryType){case POINT:case SPRITE:case GEOMETRY:{output3=vec4(1.0,0.0,0.0,0.0);output4=vec4(0.0,1.0,0.0,0.0);output5=vec4(0.0,0.0,1.0,0.0);break;}case LINE:{mat3 r=Matrix3(Quaternion(vec3(0.0,0.0,1.0),output2.xyz));mat3 s=mat3(1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,particleSize.y);mat3 m=r*s;output3=vec4(m[0],0.0);output4=vec4(m[1],0.0);output5=vec4(m[2],0.0);break;}default:{output3=vec4(particleSize.x,0.0,0.0,0.0);output4=vec4(0.0,particleSize.y,0.0,0.0);output5=vec4(0.0,0.0,1.0,0.0);break;}}}`

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
         console .error ("Couldn't initialize particle shader: " + gl .getProgramInfoLog (program));

      program .inputs = [
         [0, gl .getAttribLocation (program, "input0")],
         [2, gl .getAttribLocation (program, "input2")],
         [6, gl .getAttribLocation (program, "input6")],
      ];

      program .randomSeed        = gl .getUniformLocation (program, "randomSeed");
      program .geometryType      = gl .getUniformLocation (program, "geometryType");
      program .createParticles   = gl .getUniformLocation (program, "createParticles");
      program .particleLifetime  = gl .getUniformLocation (program, "particleLifetime");
      program .lifetimeVariation = gl .getUniformLocation (program, "lifetimeVariation");
      program .deltaTime         = gl .getUniformLocation (program, "deltaTime");
      program .particleSize      = gl .getUniformLocation (program, "particleSize");

      program .numForces = gl .getUniformLocation (program, "numForces");
      program .forces    = gl .getUniformLocation (program, "forces");

      program .boundedVerticesIndex  = gl .getUniformLocation (program, "boundedVerticesIndex");
      program .boundedNormalsIndex   = gl .getUniformLocation (program, "boundedNormalsIndex");
      program .boundedHierarchyIndex = gl .getUniformLocation (program, "boundedHierarchyIndex");
      program .boundedHierarchyRoot  = gl .getUniformLocation (program, "boundedHierarchyRoot");
      program .boundedVolume         = gl .getUniformLocation (program, "boundedVolume");

      program .numColors = gl .getUniformLocation (program, "numColors");
      program .colorRamp = gl .getUniformLocation (program, "colorRamp");

      program .texCoordCount = gl .getUniformLocation (program, "texCoordCount");
      program .numTexCoords  = gl .getUniformLocation (program, "numTexCoords");
      program .texCoordRamp  = gl .getUniformLocation (program, "texCoordRamp");

      for (const name of Object .keys (this .uniforms))
         program [name] = gl .getUniformLocation (program, name);

      program .NaN = gl .getUniformLocation (program, "NaN");

      gl .useProgram (program);

      for (const name of this .samplers)
      {
         const location = gl .getUniformLocation (program, name);

         gl .uniform1i (location, program [name + "TextureUnit"] = browser .getTexture2DUnit ());
      }

      gl .uniform1f (program .NaN, NaN);

      browser .resetTextureUnits ();

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

Object .defineProperties (X3DParticleEmitterNode,
{
   typeName:
   {
      value: "X3DParticleEmitterNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
});

const X3DParticleEmitterNode_default_ = X3DParticleEmitterNode;
;

Namespace_default().add ("X3DParticleEmitterNode", "x_ite/Components/ParticleSystems/X3DParticleEmitterNode", X3DParticleEmitterNode_default_);
/* harmony default export */ const ParticleSystems_X3DParticleEmitterNode = (X3DParticleEmitterNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
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

   this .addType ((X3DConstants_default()).PointEmitter);

   this ._position .setUnit ("length");

   this .addUniform ("position",  "uniform vec3 position;");
   this .addUniform ("direction", "uniform vec3 direction;");

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

      this .set_position__ ();
      this .set_direction__ ();
   },
   set_position__ ()
   {
      const position = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
   },
   set_direction__: (() =>
   {
      const direction = new (Vector3_default()) (0, 0, 0);

      return function ()
      {
         direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
      };
   })(),
});

Object .defineProperties (PointEmitter,
{
   typeName:
   {
      value: "PointEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "on",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "position",    new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "direction",   new (Fields_default()).SFVec3f (0, 1, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "speed",       new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "variation",   new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mass",        new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceArea", new (Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const PointEmitter_default_ = PointEmitter;
;

Namespace_default().add ("PointEmitter", "x_ite/Components/ParticleSystems/PointEmitter", PointEmitter_default_);
/* harmony default export */ const ParticleSystems_PointEmitter = (PointEmitter_default_);
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



const
   _defaultEmitter = Symbol (),
   _depthShader    = Symbol ();

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

Namespace_default().add ("X3DParticleSystemsContext", "x_ite/Browser/ParticleSystems/X3DParticleSystemsContext", X3DParticleSystemsContext_default_);
/* harmony default export */ const ParticleSystems_X3DParticleSystemsContext = (X3DParticleSystemsContext_default_);
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
   X3DNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DParticlePhysicsModelNode);
}

Object .assign (Object .setPrototypeOf (X3DParticlePhysicsModelNode .prototype, (X3DNode_default()).prototype),
{
   addForce ()
   { },
});

Object .defineProperties (X3DParticlePhysicsModelNode,
{
   typeName:
   {
      value: "X3DParticlePhysicsModelNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
});

const X3DParticlePhysicsModelNode_default_ = X3DParticlePhysicsModelNode;
;

Namespace_default().add ("X3DParticlePhysicsModelNode", "x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode", X3DParticlePhysicsModelNode_default_);
/* harmony default export */ const ParticleSystems_X3DParticlePhysicsModelNode = (X3DParticlePhysicsModelNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
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

   this .addType ((X3DConstants_default()).BoundedPhysicsModel);
}

Object .assign (Object .setPrototypeOf (BoundedPhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticlePhysicsModelNode .prototype .initialize .call (this);

      this ._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      if (this .geometryNode)
         this .geometryNode ._rebuild .removeInterest ("addNodeEvent", this);

      this .geometryNode = X3DCast_default() ((X3DConstants_default()).X3DGeometryNode, this ._geometry);

      if (this .geometryNode)
         this .geometryNode ._rebuild .addInterest ("addNodeEvent", this);
   },
   addGeometry (boundedNormals, boundedVertices)
   {
      if (this .geometryNode && this ._enabled .getValue ())
      {
         const
            normals  = this .geometryNode .getNormals ()  .getValue (),
            vertices = this .geometryNode .getVertices () .getValue ();

         for (const value of normals)
            boundedNormals .push (value);

         for (const value of vertices)
            boundedVertices .push (value);
      }
   },
});

Object .defineProperties (BoundedPhysicsModel,
{
   typeName:
   {
      value: "BoundedPhysicsModel",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "physics",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",  new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "geometry", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const BoundedPhysicsModel_default_ = BoundedPhysicsModel;
;

Namespace_default().add ("BoundedPhysicsModel", "x_ite/Components/ParticleSystems/BoundedPhysicsModel", BoundedPhysicsModel_default_);
/* harmony default export */ const ParticleSystems_BoundedPhysicsModel = (BoundedPhysicsModel_default_);
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

   this .addType ((X3DConstants_default()).ConeEmitter);

   this ._position .setUnit ("length");
   this ._angle    .setUnit ("angle");

   this .addUniform ("position",  "uniform vec3  position;");
   this .addUniform ("direction", "uniform vec3  direction;");
   this .addUniform ("angle",     "uniform float angle;");

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

      this .set_position__ ();
      this .set_direction__ ();
      this .set_angle__ ();
   },
   set_position__ ()
   {
      const position = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
   },
   set_direction__ ()
   {
      const direction = this ._direction .getValue ();

      this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
   },
   set_angle__ ()
   {
      this .setUniform ("uniform1f", "angle", this ._angle .getValue ());
   },
});

Object .defineProperties (ConeEmitter,
{
   typeName:
   {
      value: "ConeEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "on",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "position",    new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "direction",   new (Fields_default()).SFVec3f (0, 1, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "angle",       new (Fields_default()).SFFloat (0.785398)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "speed",       new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "variation",   new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mass",        new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceArea", new (Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const ConeEmitter_default_ = ConeEmitter;
;

Namespace_default().add ("ConeEmitter", "x_ite/Components/ParticleSystems/ConeEmitter", ConeEmitter_default_);
/* harmony default export */ const ParticleSystems_ConeEmitter = (ConeEmitter_default_);
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

   this .addType ((X3DConstants_default()).ExplosionEmitter);

   this ._position .setUnit ("length");

   this .addUniform ("position", "uniform vec3 position;");

   this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
   {
      return getRandomSphericalVelocity ();
   }`);

   this .addFunction (/* glsl */ `vec4 getRandomPosition ()
   {
      return vec4 (position, 1.0);
   }`);
}

Object .assign (Object .setPrototypeOf (ExplosionEmitter .prototype, ParticleSystems_X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      ParticleSystems_X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position .addInterest ("set_position__", this);

      this .set_position__ ();
   },
   isExplosive ()
   {
      return true;
   },
   set_position__ ()
   {
      const position = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
   },
});

Object .defineProperties (ExplosionEmitter,
{
   typeName:
   {
      value: "ExplosionEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "on",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "position",    new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "speed",       new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "variation",   new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mass",        new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceArea", new (Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const ExplosionEmitter_default_ = ExplosionEmitter;
;

Namespace_default().add ("ExplosionEmitter", "x_ite/Components/ParticleSystems/ExplosionEmitter", ExplosionEmitter_default_);
/* harmony default export */ const ParticleSystems_ExplosionEmitter = (ExplosionEmitter_default_);
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

   this .addType ((X3DConstants_default()).ForcePhysicsModel);

   this ._force .setUnit ("force");
}

Object .assign (Object .setPrototypeOf (ForcePhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   addForce: (() =>
   {
      const force = new (Vector3_default()) (0, 0, 0);

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
   typeName:
   {
      value: "ForcePhysicsModel",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "physics",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",  new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "force",    new (Fields_default()).SFVec3f (0, -9.8, 0)),
      ]),
      enumerable: true,
   },
});

const ForcePhysicsModel_default_ = ForcePhysicsModel;
;

Namespace_default().add ("ForcePhysicsModel", "x_ite/Components/ParticleSystems/ForcePhysicsModel", ForcePhysicsModel_default_);
/* harmony default export */ const ParticleSystems_ForcePhysicsModel = (ForcePhysicsModel_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Shape/X3DShapeNode\")"
const X3DShapeNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Shape/X3DShapeNode");
var X3DShapeNode_default = /*#__PURE__*/__webpack_require__.n(X3DShapeNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Rendering/GeometryContext\")"
const GeometryContext_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Browser/Rendering/GeometryContext");
var GeometryContext_default = /*#__PURE__*/__webpack_require__.n(GeometryContext_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/VertexArray\")"
const VertexArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/VertexArray");
var VertexArray_default = /*#__PURE__*/__webpack_require__.n(VertexArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/TraverseType");
var TraverseType_default = /*#__PURE__*/__webpack_require__.n(TraverseType_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Shape/AlphaMode\")"
const AlphaMode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Browser/Shape/AlphaMode");
var AlphaMode_default = /*#__PURE__*/__webpack_require__.n(AlphaMode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix3\")"
const Matrix3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix3");
var Matrix3_default = /*#__PURE__*/__webpack_require__.n(Matrix3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Plane3\")"
const Plane3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/Plane3");
var Plane3_default = /*#__PURE__*/__webpack_require__.n(Plane3_namespaceObject);
;// CONCATENATED MODULE: ./src/standard/Math/Algorithms/QuickSort.js
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

function QuickSort (array, compare)
{
   this .array = array;

   if (compare)
      this .compare = compare;
}

Object .assign (QuickSort .prototype,
{
   compare (lhs, rhs)
   {
      return lhs < rhs;
   },
   sort (first, last)
   {
      if (last - first > 1)
         this .quicksort (first, last - 1);
   },
   quicksort (lo, hi)
   {
      let
         i = lo,
         j = hi;

      const { array, compare } = this;

      // Vergleichs­element x
      const x = array [(lo + hi) >>> 1];

      for (;;)
      {
         while (compare (array [i], x)) ++ i;
         while (compare (x, array [j])) -- j;

         if (i < j)
         {
            // Exchange

            const t = array [i];
            array [i] = array [j];
            array [j] = t;

            i ++; j --;
         }
         else
         {
            if (i === j) ++ i, -- j;
            break;
         }
      }

      // Rekursion
      if (lo < j) this .quicksort (lo, j);
      if (i < hi) this .quicksort (i, hi);
   },
});

const QuickSort_default_ = QuickSort;
;

Namespace_default().add ("QuickSort", "standard/Math/Algorithms/QuickSort", QuickSort_default_);
/* harmony default export */ const Algorithms_QuickSort = (QuickSort_default_);
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
   v0  = new (Vector3_default()) (0, 0, 0),
   v1  = new (Vector3_default()) (0, 0, 0),
   v2  = new (Vector3_default()) (0, 0, 0),
   uvt = { u: 0, v: 0, t: 0 };

// Box normals for bbox / line intersection.
const boxNormals = [
   new (Vector3_default()) (0,  0,  1), // front
   new (Vector3_default()) (0,  0, -1), // back
   new (Vector3_default()) (0,  1,  0), // top
   new (Vector3_default()) (0, -1,  0), // bottom
   new (Vector3_default()) (1,  0,  0)  // right
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

         const
            u = uvt .u,
            v = uvt .v,
            t = 1 - u - v;

         // Determine vectors for X3DPointingDeviceSensors.

         const i = intersections .size ++;

         if (i >= intersections .length)
            intersections .push (new (Vector3_default()) (0, 0, 0));

         intersections [i] .set (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
                                 t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
                                 t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

         if (intersectionNormals)
         {
            if (i >= intersectionNormals .length)
               intersectionNormals .push (new (Vector3_default()) (0, 0, 0));

            intersectionNormals [i] .set (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
                                          t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
                                          t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);
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
   this .min          = new (Vector3_default()) (0, 0, 0);
   this .max          = new (Vector3_default()) (0, 0, 0);
   this .planes       = [ ];
   this .intersection = new (Vector3_default()) (0, 0, 0);

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
      this .planes [i] = new (Plane3_default()) (i % 2 ? min : max, boxNormals [i]);

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

         this .sorter = new Algorithms_QuickSort (triangles, SortComparator (vertices, 0));
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

Namespace_default().add ("BVH", "standard/Math/Utility/BVH", BVH_default_);
/* harmony default export */ const Utility_BVH = (BVH_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/ParticleSystems/ParticleSystem.js
/* provided dependency */ var $ = __webpack_require__(355);
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

const LineGeometry = new Float32Array ([
   // TexCoords
   0, 0, 0, 1,
   1, 0, 0, 1,
   // Vertices
   0, 0, -0.5, 1,
   0, 0,  0.5, 1,
]);

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
   X3DShapeNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ParticleSystem);

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
   this .geometryContext          = new (GeometryContext_default()) ({ textureCoordinateNode: browser .getDefaultTextureCoordinate () });
   this .creationTime             = 0;
   this .pauseTime                = 0;
   this .deltaTime                = 0;
   this .particleStride           = Float32Array .BYTES_PER_ELEMENT * 7 * 4; // 7 x vec4
   this .particleOffsets          = Array .from ({length: 7}, (_, i) => Float32Array .BYTES_PER_ELEMENT * 4 * i); // i x vec4
   this .particleOffset           = this .particleOffsets [0];
   this .colorOffset              = this .particleOffsets [1];
   this .matrixOffset             = this .particleOffsets [3];
   this .texCoordOffset           = 0;
}

Object .assign (Object .setPrototypeOf (ParticleSystem .prototype, (X3DShapeNode_default()).prototype),
{
   initialize ()
   {
      X3DShapeNode_default().prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Check version.

      if (browser .getContext () .getVersion () < 2)
         return;

      // Connect fields.

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled           .addInterest ("set_enabled__",           this);
      this ._createParticles   .addInterest ("set_createParticles__",   this);
      this ._geometryType      .addInterest ("set_geometryType__",      this);
      this ._geometryType      .addInterest ("set_texCoord__",          this);
      this ._maxParticles      .addInterest ("set_enabled__",           this);
      this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
      this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
      this ._emitter           .addInterest ("set_emitter__",           this);
      this ._physics           .addInterest ("set_physics__",           this);
      this ._colorKey          .addInterest ("set_color__",             this);
      this ._color             .addInterest ("set_colorRamp__",         this);
      this ._texCoordKey       .addInterest ("set_texCoord__",          this);
      this ._texCoord          .addInterest ("set_texCoordRamp__",      this);

      // Create particles stuff.

      this .inputParticles  = this .createBuffer ();
      this .outputParticles = this .createBuffer ();

      this .inputParticles  .vertexArrayObject = new (VertexArray_default()) (gl);
      this .outputParticles .vertexArrayObject = new (VertexArray_default()) (gl);

      // Create forces stuff.

      this .forcesTexture       = this .createTexture ();
      this .boundedTexture      = this .createTexture ();
      this .colorRampTexture    = this .createTexture ();
      this .texCoordRampTexture = this .createTexture ();

      // Create GL stuff.

      this .geometryBuffer  = this .createBuffer ();
      this .texCoordBuffers = new Array (browser .getMaxTexCoords ()) .fill (this .geometryBuffer);

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
   getShapeKey ()
   {
      return this .numTexCoords ? 2 : 1;
   },
   getGeometryContext ()
   {
      switch (this .geometryType)
      {
         case ParticleSystems_GeometryTypes .GEOMETRY:
            return this .getGeometry ();
         default:
            return this .geometryContext;
      }
   },
   set_bbox__ ()
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         this .bbox .set ();
      else
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_transparent__ ()
   {
      const alphaMode = this .appearanceNode .getAlphaMode ();

      if (alphaMode === (AlphaMode_default()).AUTO)
      {
         switch (this .geometryType)
         {
            case ParticleSystems_GeometryTypes .POINT:
            {
               this .setTransparent (true);
               break;
            }
            default:
            {
               this .setTransparent (!!(this .getAppearance () .isTransparent () ||
                                        this .colorRampNode ?.isTransparent () ||
                                        (this .geometryType === ParticleSystems_GeometryTypes .GEOMETRY &&
                                         this .geometryNode ?.isTransparent ())));
               break;
            }
         }

         this .setAlphaMode (this .isTransparent () ? (AlphaMode_default()).BLEND : (AlphaMode_default()).OPAQUE);
      }
      else
      {
         this .setTransparent (alphaMode === (AlphaMode_default()).BLEND);
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
         if (! this ._isActive .getValue ())
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
   set_createParticles__ ()
   {
      this .createParticles = this ._createParticles .getValue ();
   },
   set_geometryType__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Get geometryType.

      this .geometryType = $.enum (ParticleSystems_GeometryTypes, this ._geometryType .getValue (), ParticleSystems_GeometryTypes .QUAD);

      // Create buffers.

      switch (this .geometryType)
      {
         case ParticleSystems_GeometryTypes .POINT:
         {
            this .geometryContext .geometryType = 0;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount = 0;
            this .vertexCount    = 1;
            this .hasNormals     = false;
            this .verticesOffset = 0;
            this .primitiveMode  = gl .POINTS;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, PointGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case ParticleSystems_GeometryTypes .LINE:
         {
            this .geometryContext .geometryType = 1;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount   = 2;
            this .vertexCount     = 2;
            this .hasNormals      = false;
            this .texCoordsOffset = 0;
            this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 8;
            this .primitiveMode   = gl .LINES;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, LineGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case ParticleSystems_GeometryTypes .TRIANGLE:
         case ParticleSystems_GeometryTypes .QUAD:
         case ParticleSystems_GeometryTypes .SPRITE:
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
         case ParticleSystems_GeometryTypes .GEOMETRY:
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

      if (! this .emitterNode .isExplosive ())
         this .creationTime = Date .now () / 1000;

      this .resizeBuffers (lastNumParticles);
      this .updateVertexArrays ();
   },
   set_particleLifetime__ ()
   {
      this .particleLifetime = this ._particleLifetime .getValue ();
   },
   set_lifetimeVariation__ ()
   {
      this .lifetimeVariation = this ._lifetimeVariation .getValue ();
   },
   set_emitter__ ()
   {
      this .emitterNode = X3DCast_default() ((X3DConstants_default()).X3DParticleEmitterNode, this ._emitter);

      if (! this .emitterNode)
         this .emitterNode = this .getBrowser () .getDefaultEmitter ();

      this .createParticles = this ._createParticles .getValue ();
   },
   set_physics__ ()
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
                  case (X3DConstants_default()).ForcePhysicsModel:
                  case (X3DConstants_default()).WindPhysicsModel:
                  {
                     forcePhysicsModelNodes .push (innerNode);
                     break;
                  }
                  case (X3DConstants_default()).BoundedPhysicsModel:
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
         catch
         { }
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

      this .colorRampNode = X3DCast_default() ((X3DConstants_default()).X3DColorNode, this ._color);

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

      this .texCoordRampNode = X3DCast_default() ((X3DConstants_default()).X3DTextureCoordinateNode, this ._texCoord);

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
      this .inputParticles  .vertexArrayObject  .update ();
      this .outputParticles .vertexArrayObject  .update ();
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
         particleStride  = this .particleStride,
         outputParticles = Object .assign (gl .createBuffer (), this .outputParticles),
         data            = new Uint8Array (maxParticles * particleStride);

      // Resize input buffer.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .inputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      // Resize output buffer.

      gl .bindBuffer (gl .COPY_READ_BUFFER, this .outputParticles);
      gl .bindBuffer (gl .ARRAY_BUFFER, outputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
      gl .copyBufferSubData (gl .COPY_READ_BUFFER, gl .ARRAY_BUFFER, 0, 0, Math .min (maxParticles * particleStride, lastNumParticles * particleStride));
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
            disabledForces += ! forcePhysicsModelNodes [i] .addForce (i - disabledForces, emitterNode, timeByMass, forces);
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
         new (Vector3_default()) (-0.5, -0.5, 0),
         new (Vector3_default()) ( 0.5, -0.5, 0),
         new (Vector3_default()) ( 0.5,  0.5, 0),
         new (Vector3_default()) (-0.5, -0.5, 0),
         new (Vector3_default()) ( 0.5,  0.5, 0),
         new (Vector3_default()) (-0.5,  0.5, 0),
      ];

      const
         vertex = new (Vector3_default()) (0, 0, 0),
         size   = new (Vector3_default()) (0, 0, 0);

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
         case (TraverseType_default()).POINTER:
         {
            renderObject .addPointingShape (this);
            break;
         }
         case (TraverseType_default()).PICKING:
         case (TraverseType_default()).COLLISION:
         {
            break;
         }
         case (TraverseType_default()).SHADOW:
         {
            if (this ._castShadow .getValue ())
               renderObject .addShadowShape (this);

            break;
         }
         case (TraverseType_default()).DISPLAY:
         {
            if (renderObject .addDisplayShape (this))
               this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

            break;
         }
      }

      if (this .geometryType === ParticleSystems_GeometryTypes .GEOMETRY)
      {
         if (this .getGeometry ())
            this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
      }
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      if (this .numParticles)
      {
         // Display geometry.

         switch (this .geometryType)
         {
            case ParticleSystems_GeometryTypes .GEOMETRY:
            {
               this .getGeometry () ?.displaySimpleParticles (gl, shaderNode, this);
               break;
            }
            case ParticleSystems_GeometryTypes .SPRITE:
            {
               this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
               // [fall trough]
            }
            default:
            {
               const outputParticles = this .outputParticles;

               if (outputParticles .vertexArrayObject .enable (shaderNode .getProgram ()))
               {
                  const particleStride = this .particleStride;

                  shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
                  shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);
                  shaderNode .enableVertexAttribute         (gl, this .geometryBuffer, 0, this .verticesOffset);
               }

               gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);
               break;
            }
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
         case ParticleSystems_GeometryTypes .GEOMETRY:
         {
            this .getGeometry () ?.displayParticles (gl, renderContext, this);
            break;
         }
         case ParticleSystems_GeometryTypes .SPRITE:
         {
            this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
            // [fall trough]
         }
         case ParticleSystems_GeometryTypes .QUAD:
         case ParticleSystems_GeometryTypes .TRIANGLE:
         {
            const positiveScale = Matrix4_default().prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

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
            shaderNode .setUniforms (gl, this .geometryContext, renderContext);

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
               const particleStride = this .particleStride;

               shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
               shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);

               if (this .geometryContext .colorMaterial)
               {
                  shaderNode .enableColorAttribute (gl, outputParticles, particleStride, this .colorOffset);
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
         invModelViewMatrix = new (Matrix4_default()) (),
         billboardToScreen  = new (Vector3_default()) (0, 0, 0),
         viewerYAxis        = new (Vector3_default()) (0, 0, 0),
         y                  = new (Vector3_default()) (0, 0, 0),
         rotation           = new (Matrix3_default()) (9);

      return function (modelViewMatrix)
      {
         invModelViewMatrix .assign (modelViewMatrix) .inverse ();
         invModelViewMatrix .multDirMatrix (billboardToScreen .assign ((Vector3_default()).zAxis));
         invModelViewMatrix .multDirMatrix (viewerYAxis .assign ((Vector3_default()).yAxis));

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
   typeName:
   {
      value: "ParticleSystem",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "enabled",           new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "createParticles",   new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "geometryType",      new (Fields_default()).SFString ("QUAD")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "maxParticles",      new (Fields_default()).SFInt32 (200)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "particleLifetime",  new (Fields_default()).SFFloat (5)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "lifetimeVariation", new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "particleSize",      new (Fields_default()).SFVec2f (0.02, 0.02)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "emitter",           new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "physics",           new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "colorKey",          new (Fields_default()).MFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "color",             new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "texCoordKey",       new (Fields_default()).MFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "texCoord",          new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,     "isActive",          new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",           new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "castShadow",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",       new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",          new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",        new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "appearance",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "geometry",          new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ParticleSystem_default_ = ParticleSystem;
;

Namespace_default().add ("ParticleSystem", "x_ite/Components/ParticleSystems/ParticleSystem", ParticleSystem_default_);
/* harmony default export */ const ParticleSystems_ParticleSystem = (ParticleSystem_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Rendering/IndexedLineSet\")"
const IndexedLineSet_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Rendering/IndexedLineSet");
var IndexedLineSet_default = /*#__PURE__*/__webpack_require__.n(IndexedLineSet_namespaceObject);
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

   this .addType ((X3DConstants_default()).PolylineEmitter);

   this .polylinesNode  = new (IndexedLineSet_default()) (executionContext);
   this .polylinesArray = new Float32Array ();

   this .addSampler ("polylines");

   this .addUniform ("direction",     "uniform vec3 direction;");
   this .addUniform ("verticesIndex", "uniform int verticesIndex;");
   this .addUniform ("polylines",     "uniform sampler2D polylines;");

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

      this .polylinesNode ._rebuild .addInterest ("set_polyline", this);
      this .polylinesNode .setPrivate (true);
      this .polylinesNode .setup ();

      this .set_direction__ ();
      this .set_polyline ();
   },
   set_direction__: (() =>
   {
      const direction = new (Vector3_default()) (0, 0, 0);

      return function ()
      {
         direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
      };
   })(),
   set_polyline: (() =>
   {
      const
         vertex1 = new (Vector3_default()) (0, 0, 0),
         vertex2 = new (Vector3_default()) (0, 0, 0);

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

         this .setUniform ("uniform1i", "verticesIndex", numVertices ? verticesIndex : -1);

         if (polylineArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, polylineArraySize, polylineArraySize, 0, gl .RGBA, gl .FLOAT, polylinesArray);
         }
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
   typeName:
   {
      value: "PolylineEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "set_coordIndex", new (Fields_default()).MFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "on",             new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "direction",      new (Fields_default()).SFVec3f (0, 1, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "speed",          new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "variation",      new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "mass",           new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceArea",    new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "coordIndex",     new (Fields_default()).MFInt32 (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "coord",          new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const PolylineEmitter_default_ = PolylineEmitter;
;

Namespace_default().add ("PolylineEmitter", "x_ite/Components/ParticleSystems/PolylineEmitter", PolylineEmitter_default_);
/* harmony default export */ const ParticleSystems_PolylineEmitter = (PolylineEmitter_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Triangle3\")"
const Triangle3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/Triangle3");
var Triangle3_default = /*#__PURE__*/__webpack_require__.n(Triangle3_namespaceObject);
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

   this .addType ((X3DConstants_default()).SurfaceEmitter);

   this .surfaceNode  = null;
   this .surfaceArray = new Float32Array ();

   this .addSampler ("surface");

   this .addUniform ("solid",         "uniform bool solid;");
   this .addUniform ("verticesIndex", "uniform int verticesIndex;");
   this .addUniform ("normalsIndex",  "uniform int normalsIndex;");
   this .addUniform ("surface",       "uniform sampler2D surface;");

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

      this .set_surface__ ();
   },
   set_surface__ ()
   {
      if (this .surfaceNode)
      {
         this .surfaceNode ._solid   .removeInterest ("set_solid__",    this);
         this .surfaceNode ._rebuild .removeInterest ("set_geometry__", this);
      }

      this .surfaceNode = X3DCast_default() ((X3DConstants_default()).X3DGeometryNode, this ._surface);

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
      if (this .surfaceNode)
         this .setUniform ("uniform1i", "solid", this .surfaceNode ._solid .getValue ());
   },
   set_geometry__: (() =>
   {
      const
         vertex1  = new (Vector3_default()) (0, 0, 0),
         vertex2  = new (Vector3_default()) (0, 0, 0),
         vertex3  = new (Vector3_default()) (0, 0, 0);

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

               surfaceArray [i / 3 + 4] = areaSoFar += Triangle3_default().area (vertex1, vertex2, vertex3);
            }

            surfaceArray .set (vertices, verticesIndex * 4);

            for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
            {
               surfaceArray [s + 0] = normals [n + 0];
               surfaceArray [s + 1] = normals [n + 1];
               surfaceArray [s + 2] = normals [n + 2];
            }

            this .setUniform ("uniform1i", "verticesIndex", numVertices ? verticesIndex : -1);
            this .setUniform ("uniform1i", "normalsIndex",  numVertices ? normalsIndex  : -1);

            if (surfaceArraySize)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, surfaceArraySize, surfaceArraySize, 0, gl .RGBA, gl .FLOAT, surfaceArray);
            }
         }
         else
         {
            this .setUniform ("uniform1i", "verticesIndex", -1);
            this .setUniform ("uniform1i", "normalsIndex",  -1);
         }
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
   typeName:
   {
      value: "SurfaceEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "on",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "speed",       new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "variation",   new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "mass",        new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceArea", new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "surface",     new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SurfaceEmitter_default_ = SurfaceEmitter;
;

Namespace_default().add ("SurfaceEmitter", "x_ite/Components/ParticleSystems/SurfaceEmitter", SurfaceEmitter_default_);
/* harmony default export */ const ParticleSystems_SurfaceEmitter = (SurfaceEmitter_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Geometry3D/IndexedFaceSet\")"
const IndexedFaceSet_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Geometry3D/IndexedFaceSet");
var IndexedFaceSet_default = /*#__PURE__*/__webpack_require__.n(IndexedFaceSet_namespaceObject);
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

   this .addType ((X3DConstants_default()).VolumeEmitter);

   this .volumeNode  = new (IndexedFaceSet_default()) (executionContext);
   this .volumeArray = new Float32Array ();

   this .addSampler ("volume");

   this .addUniform ("direction",      "uniform vec3 direction;");
   this .addUniform ("verticesIndex",  "uniform int verticesIndex;");
   this .addUniform ("normalsIndex",   "uniform int normalsIndex;");
   this .addUniform ("hierarchyIndex", "uniform int hierarchyIndex;");
   this .addUniform ("hierarchyRoot",  "uniform int hierarchyRoot;");
   this .addUniform ("volume",         "uniform sampler2D volume;");

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

      this .volumeNode ._rebuild .addInterest ("set_geometry__", this);
      this .volumeNode .setPrivate (true);
      this .volumeNode .setup ();

      this .set_direction__ ();
      this .set_geometry__ ();
   },
   set_direction__: (() =>
   {
      const direction = new (Vector3_default()) (0, 0, 0);

      return function ()
      {
         direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
      };
   })(),
   set_geometry__: (() =>
   {
      const
         vertex1 = new (Vector3_default()) (0, 0, 0),
         vertex2 = new (Vector3_default()) (0, 0, 0),
         vertex3 = new (Vector3_default()) (0, 0, 0);

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

            volumeArray [i / 3 + 4] = areaSoFar += Triangle3_default().area (vertex1, vertex2, vertex3);
         }

         volumeArray .set (vertices, verticesIndex * 4);

         for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
         {
            volumeArray [s + 0] = normals [n + 0];
            volumeArray [s + 1] = normals [n + 1];
            volumeArray [s + 2] = normals [n + 2];
         }

         volumeArray .set (hierarchy, hierarchyIndex * 4);

         this .setUniform ("uniform1i", "verticesIndex",  verticesIndex);
         this .setUniform ("uniform1i", "normalsIndex",   normalsIndex);
         this .setUniform ("uniform1i", "hierarchyIndex", hierarchyIndex);
         this .setUniform ("uniform1i", "hierarchyRoot",  hierarchyIndex + hierarchyLength - 1);

         if (volumeArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, volumeArraySize, volumeArraySize, 0, gl .RGBA, gl .FLOAT, volumeArray);
         }
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
   typeName:
   {
      value: "VolumeEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "set_coordIndex", new (Fields_default()).MFInt32 ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "on",             new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "internal",       new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "direction",      new (Fields_default()).SFVec3f (0, 1, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "speed",          new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "variation",      new (Fields_default()).SFFloat (0.25)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "mass",           new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceArea",    new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "coordIndex",     new (Fields_default()).MFInt32 (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "coord",          new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumeEmitter_default_ = VolumeEmitter;
;

Namespace_default().add ("VolumeEmitter", "x_ite/Components/ParticleSystems/VolumeEmitter", VolumeEmitter_default_);
/* harmony default export */ const ParticleSystems_VolumeEmitter = (VolumeEmitter_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Algorithm");
var Algorithm_default = /*#__PURE__*/__webpack_require__.n(Algorithm_namespaceObject);
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

   this .addType ((X3DConstants_default()).WindPhysicsModel);

   // Units

   this ._speed .setUnit ("speed");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._direction = new (Vector3_default()) (0, 0, 0);
}

Object .assign (Object .setPrototypeOf (WindPhysicsModel .prototype, ParticleSystems_X3DParticlePhysicsModelNode .prototype),
{
   getRandomSpeed (emitterNode)
   {
      const
         speed     = Math .max (0, this ._speed .getValue ()),
         variation = speed * Math .max (0, this ._gustiness .getValue ());

      return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
   },
   addForce: (() =>
   {
      const force = new (Vector3_default()) (0, 0, 0);

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            const
               surfaceArea = emitterNode ._surfaceArea .getValue (),
               speed       = this .getRandomSpeed (emitterNode),
               pressure    = 10 ** (2 * Math .log (speed)) * 0.64615;

            if (this ._direction .getValue () .equals ((Vector3_default()).Zero))
               emitterNode .getRandomNormal (force);
            else
               force .assign (this ._direction .getValue ()) .normalize ();

            forces .set (force .multiply (surfaceArea * pressure * timeByMass), i * 4);
            forces [i * 4 + 3] = Math .PI * Algorithm_default().clamp (this ._turbulence .getValue (), 0, 1);

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
   typeName:
   {
      value: "WindPhysicsModel",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "physics",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",   new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",    new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "direction",  new (Fields_default()).SFVec3f (1, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "speed",      new (Fields_default()).SFFloat (0.1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "gustiness",  new (Fields_default()).SFFloat (0.1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "turbulence", new (Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const WindPhysicsModel_default_ = WindPhysicsModel;
;

Namespace_default().add ("WindPhysicsModel", "x_ite/Components/ParticleSystems/WindPhysicsModel", WindPhysicsModel_default_);
/* harmony default export */ const ParticleSystems_WindPhysicsModel = (WindPhysicsModel_default_);
;// CONCATENATED MODULE: ./src/assets/components/ParticleSystems.js
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
















Components_default().add ({
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

const ParticleSystems_default_ = undefined;
;

Namespace_default().add ("ParticleSystems", "assets/components/ParticleSystems", ParticleSystems_default_);
/* harmony default export */ const ParticleSystems = ((/* unused pure expression or super */ null && (ParticleSystems_default_)));
})();

/******/ })()
;