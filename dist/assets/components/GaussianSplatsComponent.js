/* X_ITE v15.1.8 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/GaussianSplats/X3DGaussianSplatsNode.js





function X3DGaussianSplatsNode (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DGaussianSplatsNode);
}

Object .assign (Object .setPrototypeOf (X3DGaussianSplatsNode .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);
   },
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DGaussianSplatsNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DGaussianSplatsNode", "GaussianSplats", 1));

const __default__ = X3DGaussianSplatsNode;
;

/* harmony default export */ const GaussianSplats_X3DGaussianSplatsNode = (external_X_ITE_X3D_Namespace_default().add ("X3DGaussianSplatsNode", __default__));
;// external "__X_ITE_X3D__ .X3DShapeNode"
const external_X_ITE_X3D_X3DShapeNode_namespaceObject = __X_ITE_X3D__ .X3DShapeNode;
var external_X_ITE_X3D_X3DShapeNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DShapeNode_namespaceObject);
;// external "__X_ITE_X3D__ .URLs"
const external_X_ITE_X3D_URLs_namespaceObject = __X_ITE_X3D__ .URLs;
var external_X_ITE_X3D_URLs_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_URLs_namespaceObject);
;// external "__X_ITE_X3D__ .GeometryContext"
const external_X_ITE_X3D_GeometryContext_namespaceObject = __X_ITE_X3D__ .GeometryContext;
var external_X_ITE_X3D_GeometryContext_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GeometryContext_namespaceObject);
;// external "__X_ITE_X3D__ .GeometryType"
const external_X_ITE_X3D_GeometryType_namespaceObject = __X_ITE_X3D__ .GeometryType;
var external_X_ITE_X3D_GeometryType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GeometryType_namespaceObject);
;// external "__X_ITE_X3D__ .AlphaMode"
const external_X_ITE_X3D_AlphaMode_namespaceObject = __X_ITE_X3D__ .AlphaMode;
var external_X_ITE_X3D_AlphaMode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_AlphaMode_namespaceObject);
;// external "__X_ITE_X3D__ .VertexArray"
const external_X_ITE_X3D_VertexArray_namespaceObject = __X_ITE_X3D__ .VertexArray;
var external_X_ITE_X3D_VertexArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_VertexArray_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .ShaderRegistry"
const external_X_ITE_X3D_ShaderRegistry_namespaceObject = __X_ITE_X3D__ .ShaderRegistry;
var external_X_ITE_X3D_ShaderRegistry_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ShaderRegistry_namespaceObject);
;// ./src/x_ite/Browser/GaussianSplats/GaussianSplats.vs.js

// https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/59f5f77e3ddbac3ed9db93ec2cfe99ed6c5d121d/cuda_rasterizer/forward.cu
// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/vertexShaderSource.glsl

const vs = () => /* glsl */ `#version 300 es
precision highp int;precision highp float;precision highp sampler2D;precision highp sampler2DArray;uniform ivec4 x3d_Viewport;uniform mat4 x3d_ProjectionMatrix;uniform mat4 x3d_ModelViewMatrix;
#if defined(X3D_XR_SESSION)
uniform mat4 x3d_EyeMatrix;
#endif
uniform vec2 x3d_FocalLength;uniform sampler2D x3d_PositionsTexture;uniform sampler2D x3d_ScalesTexture;uniform mediump sampler2D x3d_OrientationsTexture;uniform mediump sampler2D x3d_OpacitiesTexture;
#if!defined(X3D_POINTING_PASS)&&!defined(X3D_DEPTH_PASS)
uniform mediump sampler2DArray x3d_SphericalHarmonicsTexture;
#endif
in vec4 x3d_Vertex;in uint x3d_SplatIndex;out vec4 color;out vec2 coordXY;out vec3 conic;
#if defined(X3D_CLIP_PLANES)||defined(X3D_FOG)||defined(X3D_POINTING_PASS)
out vec3 vertex;
#endif
#if defined(X3D_POINTING_PASS)
out vec2 texCoord;
#endif
#include<Fog>
#include<Logarithmic>
const float SPLAT_SIGMA=3.;const float SH_C0=.28209479177387814;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
const float SH_C1_0=-.4886025119029199;const float SH_C1_1=.4886025119029199;const float SH_C1_2=-.4886025119029199;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
const float SH_C2_0=1.0925484305920792;const float SH_C2_1=-1.0925484305920792;const float SH_C2_2=.31539156525252005;const float SH_C2_3=-1.0925484305920792;const float SH_C2_4=.5462742152960396;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
const float SH_C3_0=-.5900435899266435;const float SH_C3_1=2.890611442640554;const float SH_C3_2=-.4570457994644658;const float SH_C3_3=.3731763325901154;const float SH_C3_4=-.4570457994644658;const float SH_C3_5=1.445305721320277;const float SH_C3_6=-.5900435899266435;
#endif
#endif
#endif
mat3 computeCov3D(const in vec4 rotation,const in vec3 scale){float qx=rotation.x;float qy=rotation.y;float qz=rotation.z;float qw=-rotation.w;float yy=qy*qy;float zz=qz*qz;float xy=qx*qy;float zw=qz*qw;float xz=qx*qz;float yw=qy*qw;float xx=qx*qx;float yz=qy*qz;float xw=qx*qw;mat3 R=mat3(1.-2.*(yy+zz),2.*(xy+zw),2.*(xz-yw),2.*(xy-zw),1.-2.*(zz+xx),2.*(yz+xw),2.*(xz+yw),2.*(yz-xw),1.-2.*(yy+xx));mat3 S=mat3(scale.x,0.,0.,0.,scale.y,0.,0.,0.,scale.z);mat3 M=S*R;mat3 Sigma=transpose(M)*M;return Sigma;}vec3 computeCov2D(const in vec3 viewSplatCenter,const in mat3 cov3D){float x=viewSplatCenter.x;float y=viewSplatCenter.y;float z=viewSplatCenter.z;float zz=z*z;mat3 J=mat3(x3d_FocalLength.x/z,0.,-(x3d_FocalLength.x*x)/zz,0.,x3d_FocalLength.y/z,-(x3d_FocalLength.y*y)/zz,0.,0.,0.);mat3 W=transpose(mat3(x3d_ModelViewMatrix));mat3 T=W*J;mat3 cov=transpose(T)*cov3D*T;cov[0][0]+=.3;cov[1][1]+=.3;return vec3(cov[0][0],cov[0][1],cov[1][1]);}
#if!defined(X3D_POINTING_PASS)&&!defined(X3D_DEPTH_PASS)
vec3 computeColorFromSH(const in ivec2 texelCoord,const in vec3 splatCenter){vec3 sh0=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,0),0).rgb;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
vec3 sh1_0=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,1),0).rgb;vec3 sh1_1=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,2),0).rgb;vec3 sh1_2=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,3),0).rgb;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
vec3 sh2_0=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,4),0).rgb;vec3 sh2_1=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,5),0).rgb;vec3 sh2_2=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,6),0).rgb;vec3 sh2_3=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,7),0).rgb;vec3 sh2_4=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,8),0).rgb;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
vec3 sh3_0=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,9),0).rgb;vec3 sh3_1=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,10),0).rgb;vec3 sh3_2=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,11),0).rgb;vec3 sh3_3=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,12),0).rgb;vec3 sh3_4=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,13),0).rgb;vec3 sh3_5=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,14),0).rgb;vec3 sh3_6=texelFetch(x3d_SphericalHarmonicsTexture,ivec3(texelCoord,15),0).rgb;
#endif
#endif
#endif
vec3 color=sh0*SH_C0;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
vec3 x3d_Camera=inverse(x3d_ModelViewMatrix)[3].xyz;vec3 viewDir=normalize(splatCenter-x3d_Camera);float x=viewDir.x;float y=viewDir.y;float z=viewDir.z;color+=SH_C1_1*(-y*sh1_0+z*sh1_1-x*sh1_2);
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
float xx=x*x;float yy=y*y;float zz=z*z;float xy=x*y;float yz=y*z;float xz=x*z;color+=SH_C2_0*xy*sh2_0+SH_C2_1*yz*sh2_1+SH_C2_2*(2.*zz-xx-yy)*sh2_2+SH_C2_3*xz*sh2_3+SH_C2_4*(xx-yy)*sh2_4;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
color+=SH_C3_0*y*(3.*xx-yy)*sh3_0+SH_C3_1*xy*z*sh3_1+SH_C3_2*y*(4.*zz-xx-yy)*sh3_2+SH_C3_3*z*(2.*zz-3.*xx-3.*yy)*sh3_3+SH_C3_4*x*(4.*zz-xx-yy)*sh3_4+SH_C3_5*z*(xx-yy)*sh3_5+SH_C3_6*x*(xx-3.*yy)*sh3_6;
#endif
#endif
#endif
color+=.5;return color;}
#endif
void main(){uint textureWidth=uint(textureSize(x3d_PositionsTexture,0).x);ivec2 texelCoord=ivec2(x3d_SplatIndex % textureWidth,x3d_SplatIndex/textureWidth);vec3 splatCenter=texelFetch(x3d_PositionsTexture,texelCoord,0).xyz;vec4 viewSplatCenter=x3d_ModelViewMatrix*vec4(splatCenter,1.);
#if defined(X3D_XR_SESSION)
viewSplatCenter=x3d_EyeMatrix*viewSplatCenter;
#endif
vec4 clipSplatCenter=x3d_ProjectionMatrix*viewSplatCenter;clipSplatCenter/=clipSplatCenter.w;if(any(greaterThan(abs(clipSplatCenter.xyz),vec3(1.3)))){gl_Position=vec4(0.,0.,2.,1.);return;}vec4 splatOrientation=texelFetch(x3d_OrientationsTexture,texelCoord,0);vec3 splatScale=texelFetch(x3d_ScalesTexture,texelCoord,0).xyz;float opacity=texelFetch(x3d_OpacitiesTexture,texelCoord,0).r;mat3 cov3d=computeCov3D(normalize(splatOrientation),splatScale);vec3 cov2d=computeCov2D(viewSplatCenter.xyz/viewSplatCenter.w,cov3d);float a=cov2d.x;float b=cov2d.y;float c=cov2d.z;float det=a*c-b*b;if(det==0.){gl_Position=vec4(0.,0.,2.,1.);return;}conic=vec3(c,-b,a)/det;vec2 quadPixelSize=SPLAT_SIGMA*sqrt(vec2(a,c));vec2 quadNdcSize=quadPixelSize/vec2(x3d_Viewport.zw)*2.;clipSplatCenter.xy+=x3d_Vertex.xy*quadNdcSize;float minScreen=float(min(x3d_Viewport.z,x3d_Viewport.w));float maxQuadSize=max(quadPixelSize.x,quadPixelSize.y);if(maxQuadSize>minScreen){gl_Position=vec4(0.,0.,2.,1.);return;}coordXY=x3d_Vertex.xy*quadPixelSize;gl_Position=clipSplatCenter;
#if defined(X3D_CLIP_PLANES)||defined(X3D_FOG)||defined(X3D_POINTING_PASS)
vec4 invClipSplatCenter=inverse(x3d_ProjectionMatrix)*clipSplatCenter;vertex=invClipSplatCenter.xyz/invClipSplatCenter.w;
#endif
#if defined(X3D_POINTING_PASS)
texCoord=(x3d_Vertex.xy+1.)/2.;
#endif
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
logarithmic(gl_Position);
#endif
#if defined(X3D_POINTING_PASS)||defined(X3D_DEPTH_PASS)
color=vec4(vec3(0),opacity);
#else
color=vec4(computeColorFromSH(texelCoord,splatCenter),opacity);
#endif
#if defined(X3D_FOG)&&defined(X3D_FOG_COORDS)
fog();
#endif
}`

const GaussianSplats_vs_default_ = vs;
;

/* harmony default export */ const GaussianSplats_vs = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplats.vs", GaussianSplats_vs_default_));
;// ./src/x_ite/Browser/GaussianSplats/GaussianSplats.fs.js

// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/fragmentShaderSource.glsl

const fs = () => /* glsl */ `#version 300 es
precision highp int;precision highp float;precision highp sampler2D;in vec4 color;in vec2 coordXY;in vec3 conic;
#if defined(X3D_CLIP_PLANES)||defined(X3D_FOG)||defined(X3D_POINTING_PASS)
in vec3 vertex;
#endif
#if defined(X3D_POINTING_PASS)
in vec2 texCoord;
#endif
#if defined(X3D_POINTING_PASS)
uniform float x3d_Id;layout(location=0)out vec4 x3d_FragData0;layout(location=1)out vec4 x3d_FragData1;layout(location=2)out vec4 x3d_FragData2;
#elif defined(X3D_DEPTH_PASS)
uniform int x3d_Id;layout(location=0)out vec4 x3d_FragData0;
#if defined(X3D_NORMAL_BUFFER)
layout(location=1)out vec4 x3d_FragData1;
#endif
#else
#if!defined(X3D_ORDER_INDEPENDENT_TRANSPARENCY)
out vec4 x3d_FragColor;
#endif
#endif
#include<ToneMapping>
#include<ClipPlanes>
#include<Fog>
#include<OIT>
#include<Logarithmic>
void main(){
#if defined(X3D_CLIP_PLANES)
clip();
#endif
float exponent=-.5*(conic.x*coordXY.x*coordXY.x+conic.z*coordXY.y*coordXY.y)-conic.y*coordXY.x*coordXY.y;if(exponent>0.)discard;float alpha=min(.99,exp(exponent)*color.a);if(alpha<1./255.)discard;
#if defined(X3D_POINTING_PASS)
x3d_FragData0=vec4(vertex,x3d_Id);x3d_FragData1=vec4(0.,0.,1.,0.);x3d_FragData2=vec4(texCoord,0.,1.);
#elif defined(X3D_DEPTH_PASS)
#if defined(X3D_NORMAL_BUFFER)
x3d_FragData0=vec4(gl_FragCoord.z,vec3(x3d_Id));x3d_FragData1=vec4(0.,0.,1.,float(gl_FrontFacing));
#else
x3d_FragData0=vec4(vec3(gl_FragCoord.z),1.);
#endif
#else
vec4 finalColor=vec4(color.rgb,alpha);
#if defined(X3D_FOG)
finalColor.rgb=getFogColor(finalColor.rgb);
#endif
finalColor.rgb=toneMap(finalColor.rgb);
#if defined(X3D_ORDER_INDEPENDENT_TRANSPARENCY)
oit(finalColor);
#else
x3d_FragColor=finalColor;
#endif
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
logarithmic();
#endif
#endif
}`

const GaussianSplats_fs_default_ = fs;
;

/* harmony default export */ const GaussianSplats_fs = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplats.fs", GaussianSplats_fs_default_));
;// ./src/x_ite/Browser/GaussianSplats/GaussianSplatsShape.js













// Register shaders.





external_X_ITE_X3D_ShaderRegistry_default().addVertexShader   ("GaussianSplats", GaussianSplats_vs);
external_X_ITE_X3D_ShaderRegistry_default().addFragmentShader ("GaussianSplats", GaussianSplats_fs);

// Spherical Harmonics Counts

const SH_COEFS = [1, 3, 5, 7];

// Quad Geometry

// p4 ------ p3
// |       / |
// |     /   |
// |   /     |
// | /       |
// p1 ------ p2

const QuadGeometry = new Float32Array ([
   -1, -1, 0, 1,
    1, -1, 0, 1,
    1,  1, 0, 1,
   -1, -1, 0, 1,
    1,  1, 0, 1,
   -1,  1, 0, 1,
]);

// Special X3DShapeNode for internal use.

function GaussianSplatsShape (executionContext, node)
{
   external_X_ITE_X3D_X3DShapeNode_default().call (this, executionContext);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "rebuild", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   // Private Properties

   this .node                   = node;
   this .shaderCache            = this .getBrowser () .getShaders ();
   this .currentModelViewMatrix = new Float32Array (16);
   this .sortModelViewMatrix    = new Float32Array (16);
   this .clipPlanes             = [ ];
}

Object .assign (Object .setPrototypeOf (GaussianSplatsShape .prototype, (external_X_ITE_X3D_X3DShapeNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DShapeNode_default().prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Quad Geometry

      this .geometryContext   = new (external_X_ITE_X3D_GeometryContext_default()) ();
      this .geometryBuffer    = gl .createBuffer ();
      this .splatsIndexBuffer = gl .createBuffer ();
      this .vertexArrayObject = new (external_X_ITE_X3D_VertexArray_default()) (gl);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

      // Textures

      this .positionsTexture          = this .createTexture ();
      this .orientationsTexture       = this .createTexture ();
      this .scalesTexture             = this .createTexture ();
      this .sphericalHarmonicsTexture = this .createTexture (gl .TEXTURE_2D_ARRAY);
      this .opacitiesTexture          = this .createTexture ();

      this .positionsTextureUnit          = browser .popTextureUnit ();
      this .orientationsTextureUnit       = browser .popTextureUnit ();
      this .scalesTextureUnit             = browser .popTextureUnit ();
      this .sphericalHarmonicsTextureUnit = browser .popTextureUnit ();
      this .opacitiesTextureUnit          = browser .popTextureUnit ();

      browser .resetTextureUnits ();

      // Fields

      this .node ._colorSpace   .addInterest ("set_key__",      this);
      this .node ._positions    .addInterest ("requestRebuild", this);
      this .node ._orientations .addInterest ("requestRebuild", this);
      this .node ._scales       .addInterest ("requestRebuild", this);
      this .node ._opacities    .addInterest ("requestRebuild", this);

      for (const [degree, coefs] of SH_COEFS .entries ())
      {
         for (let coef = 0; coef < coefs; ++ coef)
            this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .addInterest ("requestRebuild", this);
      }

      this ._rebuild .addInterest ("rebuild", this);

      this .rebuild ();
   },
   getShapeKey ()
   {
      return this .key;
   },
   getGeometryContext ()
   {
      return this .geometryContext;
   },
   getGeometryType ()
   {
      return (external_X_ITE_X3D_GeometryType_default()).POINT;
   },
   getNumInstances ()
   {
      return this .numSplats;
   },
   set_key__ ()
   {
      let key = "GS";

      key += this .degrees;

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            key += 1;
            break;
         default: // "SRGB_REC709_DISPLAY"
            key += 0;
            break;
      }

      this .key = key;
   },
   set_bbox__ ()
   {
      const bbox = this .bbox;

      if (this .isDefaultBBoxSize ())
         bbox .setArray (this .node ._positions .shrinkToFit ());
      else
         bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

      this .getBBoxSize ()   .assign (bbox .size);
      this .getBBoxCenter () .assign (bbox .center);
   },
   set_geometry__ ()
   { },
   set_transparent__ ()
   {
      this .setTransparent (true);
      this .setAlphaMode ((external_X_ITE_X3D_AlphaMode_default()).BLEND);
   },
   createTexture (target)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         texture = gl .createTexture ();

      target ??= gl .TEXTURE_2D;

      gl .bindTexture (target, texture);

      gl .texParameteri (target, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      return texture;
   },
   requestRebuild ()
   {
      this ._rebuild = Date .now () / 1000;
   },
   rebuild ()
   {
      const
         browser   = this .getBrowser (),
         gl        = browser .getContext (),
         numSplats = this .node ._positions .length;

      this .numSplats = numSplats;

      // Indices

      gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (Array (numSplats) .keys ()), gl .DYNAMIC_DRAW);

      // Positions

      const textureWidth = Math .ceil (Math .sqrt (numSplats));

      if (textureWidth)
      {
         const
            textureSize        = textureWidth * textureWidth,
            positions          = new Float32Array (textureSize * 3),
            orientations       = new Float32Array (textureSize * 4),
            scales             = new Float32Array (textureSize * 3),
            opacities          = new Float32Array (textureSize);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         // Degrees

         this .degrees = -1;

         for (const [degree, coefs] of SH_COEFS .entries ())
         {
            // Spherical harmonic degrees MUST NOT be partially defined, that is, either all
            // coefficients for a given degree and all lower degrees MUST be defined or none.
            const filled = Array .from ({ length: coefs }, (_, coef) => this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .length) .every (length => length);

            if (!filled)
               break;

            ++ this .degrees;
         }

         // Degree 0,1,2,3

         const
            dimensions         = (this .degrees + 1) ** 2,
            sphericalHarmonics = new Float32Array (textureSize * 3 * dimensions);

         let offset = 0;

         for (const [degree, coefs] of SH_COEFS .entries ())
         {
            if (degree > this .degrees)
               break;

            for (let coef = 0; coef < coefs; ++ coef)
            {
               const value = this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .getValue ();

               sphericalHarmonics .set (value .subarray (0, numSplats * 3), offset);

               offset += textureSize * 3;
            }
         }

         gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, positions);

         gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA16F, textureWidth, textureWidth, 0, gl .RGBA, gl .FLOAT, orientations);

         gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, scales);

         gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .R16F, textureWidth, textureWidth, 0, gl .RED, gl .FLOAT, opacities);

         if (dimensions)
         {
            gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);
            gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGB16F, textureWidth, textureWidth, dimensions, 0, gl .RGB, gl .FLOAT, sphericalHarmonics);
         }
      }

      // Sort Worker

      this .initSortWorker ();

      // Finish

      this .set_key__ ();
      this .set_bbox__ ();
      this .set_objects__ ();
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      // Set uniforms.

      const { renderObject, viewport } = renderContext;
      const projectionMatrixArray = renderObject .getProjectionMatrixArray ();

      gl .uniform4i (shaderNode .x3d_Viewport, ... viewport);

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the
      // framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         projectionMatrixArray [0] * viewport [2] * 0.5,
         projectionMatrixArray [5] * viewport [3] * 0.5);

      // Set textures.

      gl .activeTexture (gl .TEXTURE0 + this .positionsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .orientationsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .scalesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .opacitiesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .UNSIGNED_INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);
   },
   display (gl, renderContext)
   {
      const shaderNode = this .getShader (renderContext);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .hasFog (null);

      // Set uniforms.

      const { renderObject, viewport, modelViewMatrix, localObjects, fogNode } = renderContext;
      const projectionMatrixArray = renderObject .getProjectionMatrixArray ();

      // Sort splats.
      this .sortIndices (modelViewMatrix);

      // Set ClipPlane nodes.

      shaderNode .setClipPlanes (gl, localObjects, renderObject);
      fogNode ?.setShaderUniforms (gl, shaderNode);

      // Set viewport and matrices.

      gl .viewport (... viewport);
      gl .scissor (... viewport);
      gl .uniform4i (shaderNode .x3d_Viewport, ... viewport);
      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the
      // framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         projectionMatrixArray [0] * viewport [2] * 0.5,
         projectionMatrixArray [5] * viewport [3] * 0.5);

      // Set textures.

      gl .activeTexture (gl .TEXTURE0 + this .positionsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .orientationsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .scalesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .opacitiesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .sphericalHarmonicsTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .UNSIGNED_INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      // gl .blendFunc (gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .frontFace (gl .CCW);
      gl .enable (gl .CULL_FACE);

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);

      // gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
   },
   getShader (renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "";

      key += this .key;
      key += renderObject .getRenderKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += localObjectsKeys .join (""); // ClipPlane

      return this .shaderCache .get (key) ?? this .createShader (key, renderContext);
   },
   createShader (key, renderContext)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         options = browser .getDefaultMaterial () .getShaderOptions (this .geometryContext, renderContext)
            .filter (option => !option .startsWith ("X3D_COLORSPACE_"));

      // Color Space

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            options .push ("X3D_COLORSPACE_LINEAR");
            break;
         default: // "SRGB_REC709_DISPLAY"
            options .push ("X3D_COLORSPACE_SRGB");
            break;
      }

      // Spherical Harmonics

      for (let degree = 0; degree <= this .degrees; ++ degree)
         options .push (`X3D_GAUSSIAN_SPLATTING_DEGREE_${degree}`);

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplats",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options,
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_SphericalHarmonicsTexture",
            "x3d_FocalLength",
         ],
      });

      this .shaderCache .set (key, shaderNode);

      // Static Uniforms

      shaderNode .enable (gl);

      gl .uniform1i (shaderNode .x3d_PositionsTexture,          this .positionsTextureUnit);
      gl .uniform1i (shaderNode .x3d_OrientationsTexture,       this .orientationsTextureUnit);
      gl .uniform1i (shaderNode .x3d_ScalesTexture,             this .scalesTextureUnit);
      gl .uniform1i (shaderNode .x3d_OpacitiesTexture,          this .opacitiesTextureUnit);
      gl .uniform1i (shaderNode .x3d_SphericalHarmonicsTexture, this .sphericalHarmonicsTextureUnit);

      return shaderNode;
   },
   createPointingShader (options)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplatsPointing",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options,
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_FocalLength",
         ],
      });

      // Static Uniforms

      shaderNode .enable (gl);

      gl .uniform1i (shaderNode .x3d_PositionsTexture,    this .positionsTextureUnit);
      gl .uniform1i (shaderNode .x3d_OrientationsTexture, this .orientationsTextureUnit);
      gl .uniform1i (shaderNode .x3d_ScalesTexture,       this .scalesTextureUnit);
      gl .uniform1i (shaderNode .x3d_OpacitiesTexture,    this .opacitiesTextureUnit);

      return shaderNode;
   },
   createDepthShader (options)
   {
      return this .createPointingShader (options);
   },
   initSortWorker ()
   {
      if (!this .getBrowser () .getBrowserOption ("LoadUrlObjects"))
         return;

      // Terminate existing worker.

      this .sortWorker ?.terminate ();

      // Load worker.

      const
         content = `import "${external_X_ITE_X3D_URLs_default().getLibraryURL ("mkkellogg-sort.worker.js")}";`,
         url     = URL .createObjectURL (new Blob ([content], { type: "text/javascript" }));

      this .sortWorker = new Worker (url, { type: "module" });

      URL .revokeObjectURL (url);

      // Connect events.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .sortWorker .onmessage = event =>
      {
         // console .log (event .data .type);

         this .sortPending = false;

         switch (event .data .type)
         {
            case "ready":
            {
               this .sortModelViewMatrix .fill (0);
               browser .addBrowserEvent ();
               break;
            }
            case "sorted":
            {
               gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, event .data .indices, gl .DYNAMIC_DRAW);

               browser .addBrowserEvent ();
               break;
            }
            case "error":
            {
               console .error ("Sort worker error:", event .data .message);
               break;
            }
         }
      };

      this .sortWorker .onerror = error =>
      {
         console .error (error);

         this .sortPending = false;
      };

      // Transfer positions buffer to the worker.

      this .sortWorker .postMessage ({
         type: "init",
         positions: this .node ._positions .getValue () .subarray (0, this .numSplats * 3),
         splatCount: this .numSplats,
      });

      this .sortPending = true;
   },
   sortIndices (modelViewMatrix)
   {
      this .currentModelViewMatrix .set (modelViewMatrix);

      if (this .sortPending)
         return;

      if (external_X_ITE_X3D_Matrix4_default().prototype .equals .call (this .currentModelViewMatrix, this .sortModelViewMatrix))
         return;

      this .sortModelViewMatrix .set (modelViewMatrix);

      this .sortWorker ?.postMessage ({
         type: "sort",
         viewMatrix: this .sortModelViewMatrix,
      });

      this .sortPending = true;
   },
});

Object .defineProperties (GaussianSplatsShape,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GaussianSplatsShape", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pointerEvents", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "castShadow",    new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",   new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",      new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "appearance",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geometry",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const GaussianSplatsShape_default_ = GaussianSplatsShape;
;

/* harmony default export */ const GaussianSplats_GaussianSplatsShape = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplatsShape", GaussianSplatsShape_default_));
;// ./src/x_ite/Components/GaussianSplats/GaussianSplats.js








/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function GaussianSplats (executionContext)
{
   GaussianSplats_X3DGaussianSplatsNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GaussianSplats);

   // Units

   this ._positions .setUnit ("length");

   // Private Properties

   this .shapeNode = new GaussianSplats_GaussianSplatsShape (executionContext, this);
}

Object .assign (Object .setPrototypeOf (GaussianSplats .prototype, GaussianSplats_X3DGaussianSplatsNode .prototype),
{
   initialize ()
   {
      GaussianSplats_X3DGaussianSplatsNode .prototype .initialize .call (this);

      this ._pointerEvents .addFieldInterest (this .shapeNode ._pointerEvents);
      this ._castShadow    .addFieldInterest (this .shapeNode ._castShadow);
      this ._hidden        .addFieldInterest (this .shapeNode ._hidden);
      this ._visible       .addFieldInterest (this .shapeNode ._visible);
      this ._bboxDisplay   .addFieldInterest (this .shapeNode ._bboxDisplay);
      this ._bboxSize      .addFieldInterest (this .shapeNode ._bboxSize);
      this ._bboxCenter    .addFieldInterest (this .shapeNode ._bboxCenter);

      this .shapeNode ._pointerEvents = this ._pointerEvents;
      this .shapeNode ._hidden        = this ._hidden;
      this .shapeNode ._visible       = this ._visible;
      this .shapeNode ._bboxDisplay   = this ._bboxDisplay;
      this .shapeNode ._bboxSize      = this ._bboxSize;
      this .shapeNode ._bboxCenter    = this ._bboxCenter;

      this .shapeNode .setup ();
   },
   getInnerNode ()
   {
      return this .shapeNode;
   },
   getBBox (bbox, shadows)
   {
      return this .shapeNode .getBBox (bbox, shadows);
   },
});

Object .defineProperties (GaussianSplats,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GaussianSplats", "GaussianSplats", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",                       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "colorSpace",                     new (external_X_ITE_X3D_Fields_default()).SFString ("SRGB_REC709_DISPLAY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "positions",                      new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "orientations",                   new (external_X_ITE_X3D_Fields_default()).MFQuaternion ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scales",                         new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "opacities",                      new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree0Coef0", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree1Coef0", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree1Coef1", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree1Coef2", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree2Coef0", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree2Coef1", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree2Coef2", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree2Coef3", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree2Coef4", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef0", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef1", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef2", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef3", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef4", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef5", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sphericalHarmonicsDegree3Coef6", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pointerEvents",                  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "castShadow",                     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",                        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",                    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",                       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",                     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
      ]),
      enumerable: true,
   },
});

const GaussianSplats_default_ = GaussianSplats;
;

/* harmony default export */ const GaussianSplats_GaussianSplats = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplats", GaussianSplats_default_));
;// ./src/assets/components/GaussianSplatsComponent.js




external_X_ITE_X3D_Components_default().add ({
   name: "Layout",
   concreteNodes:
   [
      GaussianSplats_GaussianSplats,
   ],
   abstractNodes:
   [
      GaussianSplats_X3DGaussianSplatsNode,
   ],
});

const GaussianSplatsComponent_default_ = undefined;
;

/* harmony default export */ const GaussianSplatsComponent = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplatsComponent", GaussianSplatsComponent_default_));
/******/ })()
;