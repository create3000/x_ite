/* X_ITE v11.6.6 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.6.6")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
;// external "__X_ITE_X3D__ .X3DGeometricPropertyNode"
const external_X_ITE_X3D_X3DGeometricPropertyNode_namespaceObject = __X_ITE_X3D__ .X3DGeometricPropertyNode;
var external_X_ITE_X3D_X3DGeometricPropertyNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGeometricPropertyNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/HAnim/HAnimDisplacer.js







function HAnimDisplacer (executionContext)
{
   external_X_ITE_X3D_X3DGeometricPropertyNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimDisplacer);

   // Units

   this ._displacements .setUnit ("length");
}

Object .setPrototypeOf (HAnimDisplacer .prototype, (external_X_ITE_X3D_X3DGeometricPropertyNode_default()).prototype);

Object .defineProperties (HAnimDisplacer,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimDisplacer", "HAnim", 1, "displacers", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "description",   new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "name",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weight",        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "coordIndex",    new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "displacements", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
      ]),
      enumerable: true,
   },
});

const __default__ = HAnimDisplacer;
;

/* harmony default export */ const HAnim_HAnimDisplacer = (external_X_ITE_X3D_Namespace_default().add ("HAnimDisplacer", __default__));
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .Group"
const external_X_ITE_X3D_Group_namespaceObject = __X_ITE_X3D__ .Group;
var external_X_ITE_X3D_Group_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Group_namespaceObject);
;// external "__X_ITE_X3D__ .Transform"
const external_X_ITE_X3D_Transform_namespaceObject = __X_ITE_X3D__ .Transform;
var external_X_ITE_X3D_Transform_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Transform_namespaceObject);
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// external "__X_ITE_X3D__ .ShaderRegistry"
const external_X_ITE_X3D_ShaderRegistry_namespaceObject = __X_ITE_X3D__ .ShaderRegistry;
var external_X_ITE_X3D_ShaderRegistry_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ShaderRegistry_namespaceObject);
;// ./src/assets/shaders/webgl2/common/Skin2.glsl.js
const Skin2_glsl_default_ = () => /* glsl */ `
#if defined(X3D_SKINNING)
in float x3d_CoordIndex;
#if X3D_NUM_JOINT_SETS>0
uniform sampler2D x3d_JointsTexture;
#endif
#if X3D_NUM_DISPLACEMENTS>0
uniform sampler2D x3d_DisplacementsTexture;uniform sampler2D x3d_DisplacementWeightsTexture;
#endif
#if X3D_NUM_JOINT_SETS>0||X3D_NUM_DISPLACEMENTS>0
uniform sampler2D x3d_JointMatricesTexture;
#endif
#if X3D_NUM_JOINT_SETS>0
mat4 getJointMatrix(const in int joint){vec4 a=texelFetch(x3d_JointMatricesTexture,joint*8,0);vec4 b=texelFetch(x3d_JointMatricesTexture,joint*8+1,0);vec4 c=texelFetch(x3d_JointMatricesTexture,joint*8+2,0);vec4 d=texelFetch(x3d_JointMatricesTexture,joint*8+3,0);return mat4(a,b,c,d);}
#if defined(X3D_NORMALS)
mat3 getJointNormalMatrix(const in int joint){vec4 a=texelFetch(x3d_JointMatricesTexture,joint*8+4,0);vec4 b=texelFetch(x3d_JointMatricesTexture,joint*8+5,0);vec4 c=texelFetch(x3d_JointMatricesTexture,joint*8+6,0);return mat3(a.xyz,vec3(a.w,b.xy),vec3(b.zw,c.x));}
#endif
#endif
#if X3D_NUM_DISPLACEMENTS>0
mat3 getDisplacementJointMatrix(const in int joint){vec4 a=texelFetch(x3d_JointMatricesTexture,joint*8,0);vec4 b=texelFetch(x3d_JointMatricesTexture,joint*8+1,0);vec4 c=texelFetch(x3d_JointMatricesTexture,joint*8+2,0);return mat3(a.xyz,b.xyz,c.xyz);}
#endif
#if defined(X3D_NORMALS)
vec3 skinNormal=vec3(0);
#if defined(X3D_TANGENTS)
vec3 skinTangent=vec3(0);
#endif
#define getSkinNormal(normal)(skinNormal)
#if defined(X3D_TANGENTS)
#define getSkinTangent(tangent)(skinTangent)
#endif
#else
#define getSkinNormal(normal)(normal)
#define getSkinTangent(tangent)(tangent)
#endif
vec4 getSkinVertex(const in vec4 vertex,const in vec3 normal,const in vec3 tangent){int coordIndex=int(x3d_CoordIndex);vec4 skin=vertex;
#if defined(X3D_NORMALS)
skinNormal=normal;
#if defined(X3D_TANGENTS)
skinTangent=tangent;
#endif
#endif
#if X3D_NUM_DISPLACEMENTS>0
{int coordIndexD=coordIndex*(X3D_NUM_DISPLACEMENTS*2);for(int i=0;i<X3D_NUM_DISPLACEMENTS;++i){int index=coordIndexD+i*2;vec4 displacement=texelFetch(x3d_DisplacementsTexture,index,0);int weightIndex=int(texelFetch(x3d_DisplacementsTexture,index+1,0).x);float weight=texelFetch(x3d_DisplacementWeightsTexture,weightIndex,0).x;skin.xyz+=getDisplacementJointMatrix(int(displacement.w))*(displacement.xyz*weight);}}
#endif
#if X3D_NUM_JOINT_SETS>0
{int coordIndexJ=coordIndex*(X3D_NUM_JOINT_SETS*2);for(int i=0;i<X3D_NUM_JOINT_SETS;++i){int index=coordIndexJ+i;ivec4 joints=ivec4(texelFetch(x3d_JointsTexture,index,0));vec4 weights=texelFetch(x3d_JointsTexture,index+X3D_NUM_JOINT_SETS,0);for(int i=0;i<4;++i){int joint=joints[i];float weight=weights[i];skin+=(getJointMatrix(joint)*vertex-vertex)*weight;
#if defined(X3D_NORMALS)
mat3 jointNormalMatrix=getJointNormalMatrix(joint);skinNormal+=(jointNormalMatrix*normal-normal)*weight;
#if defined(X3D_TANGENTS)
skinTangent+=(jointNormalMatrix*tangent-tangent)*weight;
#endif
#endif
}}}
#endif
return skin;}
#endif
`
;

/* harmony default export */ const Skin2_glsl = (external_X_ITE_X3D_Namespace_default().add ("Skin2.glsl", Skin2_glsl_default_));
;// ./src/x_ite/Components/HAnim/HAnimHumanoid.js














// Register shaders.




external_X_ITE_X3D_ShaderRegistry_default().addInclude ("Skin", Skin2_glsl);

/**
 * HAnimHumanoid
 */

function HAnimHumanoid (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimHumanoid);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "jointTextures",              new (external_X_ITE_X3D_Fields_default()).SFTime (),
                          (external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacementsTexture",       new (external_X_ITE_X3D_Fields_default()).SFTime (),
                          (external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacementWeightsTexture", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   // Units

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
   this ._bboxSize    .setUnit ("length");
   this ._bboxCenter  .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._version = "";

   // Private properties

   this .skeletonNode         = new (external_X_ITE_X3D_Group_default()) (executionContext);
   this .viewpointsNode       = new (external_X_ITE_X3D_Group_default()) (executionContext);
   this .skinNode             = new Skin (executionContext, this);
   this .transformNode        = new (external_X_ITE_X3D_Transform_default()) (executionContext);
   this .motionNodes          = [ ];
   this .jointNodes           = [ ];
   this .jointBindingMatrices = [ ];
   this .displacementWeights  = [ ];
   this .numJoints            = 0;
   this .numDisplacements     = 0;
   this .update               = new Lock ();
   this .skinning             = Function .prototype;
}

Object .assign (Object .setPrototypeOf (HAnimHumanoid .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);

      // Groups

      this .skeletonNode   .addAllowedTypes ((external_X_ITE_X3D_X3DConstants_default()).HAnimJoint, (external_X_ITE_X3D_X3DConstants_default()).HAnimSite);
      this .viewpointsNode .addAllowedTypes ((external_X_ITE_X3D_X3DConstants_default()).HAnimSite);

      this ._skeleton   .addFieldInterest (this .skeletonNode   ._children);
      this ._viewpoints .addFieldInterest (this .viewpointsNode ._children);
      this ._skin       .addFieldInterest (this .skinNode       ._children);

      this .skeletonNode   ._children = this ._skeleton;
      this .viewpointsNode ._children = this ._viewpoints;
      this .skinNode       ._children = this ._skin;

      this .skeletonNode   .setPrivate (true);
      this .viewpointsNode .setPrivate (true);
      this .skinNode       .setPrivate (true);

      // Transform

      this ._translation      .addFieldInterest (this .transformNode ._translation);
      this ._rotation         .addFieldInterest (this .transformNode ._rotation);
      this ._scale            .addFieldInterest (this .transformNode ._scale);
      this ._scaleOrientation .addFieldInterest (this .transformNode ._scaleOrientation);
      this ._center           .addFieldInterest (this .transformNode ._center);
      this ._bboxDisplay      .addFieldInterest (this .transformNode ._bboxDisplay);
      this ._bboxSize         .addFieldInterest (this .transformNode ._bboxSize);
      this ._bboxCenter       .addFieldInterest (this .transformNode ._bboxCenter);

      this .transformNode ._translation      = this ._translation;
      this .transformNode ._rotation         = this ._rotation;
      this .transformNode ._scale            = this ._scale;
      this .transformNode ._scaleOrientation = this ._scaleOrientation;
      this .transformNode ._center           = this ._center;
      this .transformNode ._bboxDisplay      = this ._bboxDisplay;
      this .transformNode ._bboxSize         = this ._bboxSize;
      this .transformNode ._bboxCenter       = this ._bboxCenter;
      this .transformNode ._children         = [ this .skeletonNode, this .viewpointsNode, this .skinNode ];

      // Setup

      this .skeletonNode   .setup ();
      this .viewpointsNode .setup ();
      this .skinNode       .setup ();
      this .transformNode  .setup ();

      this .connectChildNode (this .transformNode);

      // Textures

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .jointsTexture              = gl .createTexture ();
      this .displacementsTexture       = gl .createTexture ();
      this .displacementWeightsTexture = gl .createTexture ();
      this .jointMatricesTexture       = gl .createTexture ();

      for (const texture of [this .jointsTexture, this .displacementsTexture, this .displacementWeightsTexture, this .jointMatricesTexture])
      {
         gl .bindTexture (gl .TEXTURE_2D, texture);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      }

      // Events

      this ._motionsEnabled             .addInterest ("set_motions__",                    this);
      this ._motions                    .addInterest ("set_motions__",                    this);
      this ._jointBindingPositions      .addInterest ("set_joints__",                     this);
      this ._jointBindingRotations      .addInterest ("set_joints__",                     this);
      this ._jointBindingScales         .addInterest ("set_joints__",                     this);
      this ._joints                     .addInterest ("set_joints__",                     this);
      this ._jointTextures              .addInterest ("set_jointTextures__",              this);
      this ._displacementsTexture       .addInterest ("set_displacementsTexture__",       this);
      this ._displacementWeightsTexture .addInterest ("set_displacementWeightsTexture__", this);
      this ._skinCoord                  .addInterest ("set_skinCoord__",                  this);

      this .set_motions__ ();
      this .set_joints__ ();
      this .set_skinCoord__ ();
   },
   getBBox (bbox, shadows)
   {
      return this .transformNode .getBBox (bbox, shadows);
   },
   getSubBBox (bbox, shadows)
   {
      return this .transformNode .getSubBBox (bbox, shadows);
   },
   getMatrix ()
   {
      return this .transformNode .getMatrix ();
   },
   getHAnimKey ()
   {
      return this .humanoidKey;
   },
   getNumJoints ()
   {
      return this .numJoints;
   },
   getNumDisplacements ()
   {
      return this .numDisplacements;
   },
   set_humanoidKey__ ()
   {
      this .humanoidKey = `[${this .numJoints}.${this .numDisplacements}]`;
   },
   set_motions__ ()
   {
      const
         motionsEnabled = this ._motionsEnabled,
         motionNodes    = this .motionNodes;

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .removeInterest ("set_connectJoints__", this);
         motionNode ._channelsEnabled .removeInterest ("set_connectJoints__", this);
         motionNode ._channels        .removeInterest ("set_connectJoints__", this);
         motionNode ._values          .removeInterest ("set_connectJoints__", this);

         motionNode .disconnectJoints (this .jointNodes);
      }

      motionNodes .length = 0;

      for (const [i, node] of this ._motions .entries ())
      {
         if (i < motionsEnabled .length && !motionsEnabled [i])
            continue;

         const motionNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).HAnimMotion, node);

         if (motionNode)
            motionNodes .push (motionNode);
      }

      for (const motionNode of motionNodes)
      {
         motionNode ._joints          .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channelsEnabled .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._channels        .addInterest ("set_connectJoints__", this, motionNode);
         motionNode ._values          .addInterest ("set_connectJoints__", this, motionNode);

         motionNode .connectJoints (this .jointNodes);
      }
   },
   set_connectJoints__ (motionNode)
   {
      motionNode .disconnectJoints (this .jointNodes);
      motionNode .connectJoints (this .jointNodes);
   },
   set_joints__ ()
   {
      const
         jointNodes               = this .jointNodes,
         jointBindingMatrices     = this .jointBindingMatrices,
         jointBindingPositions    = this ._jointBindingPositions,
         jointBindingRotations    = this ._jointBindingRotations,
         jointBindingScales       = this ._jointBindingScales,
         numJointBindingPositions = jointBindingPositions .length,
         numJointBindingRotations = jointBindingRotations .length,
         numJointBindingScales    = jointBindingScales .length;

      for (const motionNode of this .motionNodes)
         motionNode .disconnectJoints (jointNodes);

      for (const jointNode of jointNodes)
      {
         jointNode .removeInterest ("unlock", this .update);

         jointNode ._skinCoordIndex      .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .removeInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .removeInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      jointNodes           .length = 0;
      jointBindingMatrices .length = 0;

      for (const [i, node] of this ._joints .entries ())
      {
         const jointNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).HAnimJoint, node);

         if (!jointNode)
            continue;

         const
            t = numJointBindingPositions ? jointBindingPositions [Math .min (i, numJointBindingPositions- 1)] .getValue () : null,
            r = numJointBindingRotations ? jointBindingRotations [Math .min (i, numJointBindingRotations - 1)] .getValue () : null,
            s = numJointBindingScales ? jointBindingScales [Math .min (i, numJointBindingScales - 1)] .getValue () : null;

         jointNodes           .push (jointNode);
         jointBindingMatrices .push (new (external_X_ITE_X3D_Matrix4_default()) () .set (t, r, s));
      }

      for (const jointNode of jointNodes)
      {
         jointNode .addInterest ("unlock", this .update);

         jointNode ._skinCoordIndex      .addInterest ("addEvent", this ._jointTextures);
         jointNode ._skinCoordWeight     .addInterest ("addEvent", this ._jointTextures);
         jointNode ._displacements       .addInterest ("addEvent", this ._displacementsTexture);
         jointNode ._displacementWeights .addInterest ("addEvent", this ._displacementWeightsTexture);
      }

      for (const motionNode of this .motionNodes)
         motionNode .connectJoints (jointNodes);

      const size = Math .ceil (Math .sqrt (jointNodes .length * 8));

      this .jointMatricesArray = new Float32Array (size * size * 4),

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   set_jointTextures__ ()
   {
      // Create arrays.

      const
         length  = this .skinCoordNode ?._point .length || 1,
         joints  = Array .from ({ length }, () => [ ]),
         weights = Array .from ({ length }, () => [ ]);

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         const skinCoordWeight = jointNode ._skinCoordWeight .getValue ();

         for (const [i, index] of jointNode ._skinCoordIndex .entries ())
         {
            const weight = skinCoordWeight [i];

            if (weight === 0)
               continue;

            joints  [index] ?.push (joint);
            weights [index] ?.push (weight);
         }
      }

      const
         numJoints   = external_X_ITE_X3D_Algorithm_default().roundToMultiple (joints .reduce ((p, n) => Math .max (p, n .length), 0), 4),
         numJoints2  = numJoints * 2,
         size        = Math .ceil (Math .sqrt (length * numJoints2)) || 1,
         jointsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
      {
         jointsArray .set (joints  [i], i * numJoints2);
         jointsArray .set (weights [i], i * numJoints2 + numJoints);
      }

      this .numJoints = numJoints;

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointsArray);

      // Trigger update.

      this .update .unlock ();
      this .set_humanoidKey__ ();
   },
   set_displacementsTexture__ ()
   {
      // Create array.

      const
         length        = this .skinCoordNode ?._point .length || 1,
         displacements = Array .from ({ length }, () => [ ]);

      let displacer = 0;

      this .displacementWeights .length = 0;

      for (const [joint, jointNode] of this .jointNodes .entries ())
      {
         for (const { _weight, _coordIndex, _displacements } of jointNode .getDisplacers ())
         {
            if (!_coordIndex .length)
               continue;

            // Store reference to weight SFFloat.
            this .displacementWeights .push (_weight, 0, 0, 0);

            for (const [i, index] of _coordIndex .entries ())
               displacements [index] ?.push (... _displacements [i], joint, displacer, 0, 0, 0);

            ++ displacer;
         }
      }

      const
         numDisplacements   = displacements .reduce ((p, n) => Math .max (p, n .length), 0) / 8,
         numElements        = numDisplacements * 8,
         size               = Math .ceil (Math .sqrt (length * numDisplacements * 2)) || 1,
         displacementsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
         displacementsArray .set (displacements [i], i * numElements);

      // Number of displacements per coord index.
      this .numDisplacements = numDisplacements;

      // Upload texture.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, displacementsArray);

      // Weights

      this .displacementWeightsSize  = Math .ceil (Math .sqrt (displacer));
      this .displacementWeightsArray = new Float32Array (this .displacementWeightsSize * this .displacementWeightsSize * 4);

      // Trigger update.

      this .update .unlock ();
      this .set_humanoidKey__ ();
   },
   set_displacementWeightsTexture__ ()
   {
      // Upload texture.

      const
         gl    = this .getBrowser () .getContext (),
         size  = this .displacementWeightsSize,
         array = this .displacementWeightsArray;

      array .set (this .displacementWeights);

      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, array);
   },
   set_skinCoord__ ()
   {
      if (this .skinCoordNode)
      {
         this .skinCoordNode .removeInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this .skinCoordNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).Coordinate, this ._skinCoord)
         ?? external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).CoordinateDouble, this ._skinCoord);

      if (this .skinCoordNode)
      {
         delete this .skinning;

         this .skinCoordNode .addInterest ("addEvent", this ._jointTextures);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementsTexture);
         this .skinCoordNode .addInterest ("addEvent", this ._displacementWeightsTexture);
      }
      else
      {
         this .skinning = Function .prototype;
      }

      this ._jointTextures              .addEvent ();
      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   traverse (type, renderObject)
   {
      const invHumanoidMatrix = renderObject .getInvHumanoidMatrix ();

      invHumanoidMatrix .push (this .transformNode .getMatrix ());
      invHumanoidMatrix .multRight (renderObject .getModelViewMatrix () .get ());
      invHumanoidMatrix .inverse ();

      this .transformNode .traverse (type, renderObject);

      this .skinning (type, renderObject);

      invHumanoidMatrix .pop ();
   },
   skinning (type, renderObject)
   {
      if (type !== (external_X_ITE_X3D_TraverseType_default()).DISPLAY || this .update .lock ())
         return;

      // Create joint matrices.

      const
         invModelViewMatrix   = renderObject .getInvHumanoidMatrix () .get (),
         jointNodes           = this .jointNodes,
         jointNodesLength     = jointNodes .length,
         jointBindingMatrices = this .jointBindingMatrices,
         jointMatricesArray   = this .jointMatricesArray,
         size                 = Math .ceil (Math .sqrt (jointNodesLength * 8));

      for (let i = 0; i < jointNodesLength; ++ i)
      {
         const
            jointNode          = jointNodes [i],
            jointBindingMatrix = jointBindingMatrices [i],
            jointMatrix        = jointNode .getModelViewMatrix () .multRight (invModelViewMatrix) .multLeft (jointBindingMatrix),
            jointNormalMatrix  = jointMatrix .submatrix .transpose () .inverse ();

         jointMatricesArray .set (jointMatrix,       i * 32 + 0);
         jointMatricesArray .set (jointNormalMatrix, i * 32 + 16);
      }

      // Upload textures.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointMatricesArray);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         browser                               = this .getBrowser (),
         jointsTextureTextureUnit              = browser .getTextureUnit (),
         displacementsTextureTextureUnit       = browser .getTextureUnit (),
         displacementWeightsTextureTextureUnit = browser .getTextureUnit (),
         jointMatricesTextureUnit              = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + jointsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointsTexture);
      gl .uniform1i (shaderObject .x3d_JointsTexture, jointsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementsTexture, displacementsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementWeightsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementWeightsTexture, displacementWeightsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + jointMatricesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .uniform1i (shaderObject .x3d_JointMatricesTexture, jointMatricesTextureUnit);
   },
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (HAnimHumanoid,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimHumanoid", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",              new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",           new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",                  new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "info",                  new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "version",               new (external_X_ITE_X3D_Fields_default()).SFString ("2.0")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skeletalConfiguration", new (external_X_ITE_X3D_Fields_default()).SFString ("BASIC")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "loa",                   new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "translation",           new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "rotation",              new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scale",                 new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scaleOrientation",      new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "center",                new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",               new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",           new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",              new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",            new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skeleton",              new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "jointBindingPositions", new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "jointBindingRotations", new (external_X_ITE_X3D_Fields_default()).MFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "jointBindingScales",    new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "joints",                new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "segments",              new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "sites",                 new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "viewpoints",            new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "motionsEnabled",        new (external_X_ITE_X3D_Fields_default()).MFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "motions",               new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinBindingNormals",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinBindingCoords",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinNormal",            new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinCoord",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skin",                  new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

class Skin extends (external_X_ITE_X3D_Group_default())
{
   #humanoidNode;

   constructor (executionContext, humanoidNode)
   {
      super (executionContext);

      this .#humanoidNode = humanoidNode;
   }

   traverse (type, renderObject)
   {
      renderObject .getHAnimNode () .push (this .#humanoidNode);

      super .traverse (type, renderObject);

      renderObject .getHAnimNode () .pop ();
   }
}

class Lock
{
   #locked = true;

   unlock ()
   {
      this .#locked = false;
   }

   lock ()
   {
      const locked = this .#locked;

      this .#locked = true;

      return locked;
   }
}

const HAnimHumanoid_default_ = HAnimHumanoid;
;

/* harmony default export */ const HAnim_HAnimHumanoid = (external_X_ITE_X3D_Namespace_default().add ("HAnimHumanoid", HAnimHumanoid_default_));
;// external "__X_ITE_X3D__ .X3DTransformNode"
const external_X_ITE_X3D_X3DTransformNode_namespaceObject = __X_ITE_X3D__ .X3DTransformNode;
var external_X_ITE_X3D_X3DTransformNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DTransformNode_namespaceObject);
;// ./src/x_ite/Components/HAnim/HAnimJoint.js










function HAnimJoint (executionContext)
{
   external_X_ITE_X3D_X3DTransformNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimJoint);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacements",       new (external_X_ITE_X3D_Fields_default()).SFTime (),
                          (external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacementWeights", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   this .setVisibleObject (true);
   this .addAllowedTypes ((external_X_ITE_X3D_X3DConstants_default()).HAnimJoint, (external_X_ITE_X3D_X3DConstants_default()).HAnimSegment);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .addAllowedTypes ((external_X_ITE_X3D_X3DConstants_default()).HAnimSite);

   // Private properties

   this .displacerNodes  = [ ];
   this .modelViewMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (HAnimJoint .prototype, (external_X_ITE_X3D_X3DTransformNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DTransformNode_default().prototype .initialize .call (this);

      this ._displacers .addInterest ("set_displacers__", this);

      this .set_displacers__ ();
   },
   getModelViewMatrix ()
   {
      return this .modelViewMatrix;
   },
   getDisplacers ()
   {
      return this .displacerNodes;
   },
   set_visibleObjects__ ()
   { },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .removeInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .removeInterest ("addEvent", this ._displacementWeights);
      }

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .addInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .addInterest ("addEvent", this ._displacementWeights);
      }

      this ._displacements       .addEvent ();
      this ._displacementWeights .addEvent ();
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      if (type === (external_X_ITE_X3D_TraverseType_default()).DISPLAY)
         this .modelViewMatrix .assign (modelViewMatrix .get ());

      external_X_ITE_X3D_X3DTransformNode_default().prototype .groupTraverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse (type, renderObject)
   {
      if (type === (external_X_ITE_X3D_TraverseType_default()).DISPLAY)
         this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());

      external_X_ITE_X3D_X3DTransformNode_default().prototype .groupTraverse .call (this, type, renderObject);
   },
});

Object .defineProperties (HAnimJoint,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimJoint", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",             new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "translation",      new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "rotation",         new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scale",            new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scaleOrientation", new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "center",           new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "llimit",           new (external_X_ITE_X3D_Fields_default()).MFFloat (0, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "ulimit",           new (external_X_ITE_X3D_Fields_default()).MFFloat (0, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "limitOrientation", new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "stiffness",        new (external_X_ITE_X3D_Fields_default()).MFFloat (0, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinCoordIndex",   new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "skinCoordWeight",  new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "displacers",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",      new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",       new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",         new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimJoint_default_ = HAnimJoint;
;

/* harmony default export */ const HAnim_HAnimJoint = (external_X_ITE_X3D_Namespace_default().add ("HAnimJoint", HAnimJoint_default_));
;// external "__X_ITE_X3D__ .TimeSensor"
const external_X_ITE_X3D_TimeSensor_namespaceObject = __X_ITE_X3D__ .TimeSensor;
var external_X_ITE_X3D_TimeSensor_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TimeSensor_namespaceObject);
;// external "__X_ITE_X3D__ .PositionInterpolator"
const external_X_ITE_X3D_PositionInterpolator_namespaceObject = __X_ITE_X3D__ .PositionInterpolator;
var external_X_ITE_X3D_PositionInterpolator_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_PositionInterpolator_namespaceObject);
;// external "__X_ITE_X3D__ .OrientationInterpolator"
const external_X_ITE_X3D_OrientationInterpolator_namespaceObject = __X_ITE_X3D__ .OrientationInterpolator;
var external_X_ITE_X3D_OrientationInterpolator_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_OrientationInterpolator_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// ./src/x_ite/Components/HAnim/HAnimMotion.js













function HAnimMotion (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimMotion);

   this .timeSensor    = new (external_X_ITE_X3D_TimeSensor_default()) (this .getExecutionContext ());
   this .interpolators = [ ];
}

Object .assign (Object .setPrototypeOf (HAnimMotion .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);

      this ._loop .addFieldInterest (this .timeSensor ._loop);

      this .timeSensor ._cycleTime   .addFieldInterest (this ._cycleTime);
      this .timeSensor ._elapsedTime .addFieldInterest (this ._elapsedTime);

      this .timeSensor ._enabled  = false;
      this .timeSensor ._loop     = this ._loop;
      this .timeSensor ._stopTime = 1;

      this .timeSensor .setup ();

      this ._enabled         .addInterest ("set_enabled__",           this);
      this ._joints          .addInterest ("set_joints__",            this);
      this ._channels        .addInterest ("set_interpolators__",     this);
      this ._values          .addInterest ("set_interpolators__",     this);
      this ._next            .addInterest ("set_next_or_previous__",  this,  1);
      this ._previous        .addInterest ("set_next_or_previous__",  this, -1);
      this ._frameIndex      .addInterest ("set_frameIndex__",        this);
      this ._frameDuration   .addInterest ("set_frameDuration__",     this);
      this ._frameIncrement  .addInterest ("set_frameIncrement__",    this);
      this ._startFrame      .addInterest ("set_start_or_endFrame__", this);
      this ._endFrame        .addInterest ("set_start_or_endFrame__", this);

      this .set_enabled__ ();
      this .set_joints__ ();
      this .set_frameIncrement__ ();
      this .set_interpolators__ ();
   },
   connectJoints (jointNodes)
   {
      const
         channelsEnabled = this ._channelsEnabled,
         joints          = this .joints,
         jointsIndex     = this .getJointsIndex (jointNodes);

      // Connect interpolators.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         if (j < channelsEnabled .length && !channelsEnabled [j])
            continue;

         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .addFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .addFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .addFieldInterest (jointNode ._scale);
      }
   },
   disconnectJoints (jointNodes)
   {
      const
         joints      = this .joints,
         jointsIndex = this .getJointsIndex (jointNodes);

      // Disconnect joint nodes.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .removeFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .removeFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .removeFieldInterest (jointNode ._scale);
      }
   },
   getJointsIndex (jointNodes)
   {
      const jointsIndex = new Map (jointNodes .map (jointNode => [jointNode ._name .getValue () .trim (), jointNode]));

      jointsIndex .delete ("IGNORED");
      jointsIndex .set ("HumanoidRoot", jointsIndex .get ("humanoid_root"));

      return jointsIndex;
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .timeSensor ._startTime = Date .now () / 1000;
      else
         this .timeSensor ._stopTime = Date .now () / 1000;
   },
   set_joints__ ()
   {
      this .joints = this ._joints .getValue () .replace (/^[\s,]+|[\s,]+$/sg, "") .split (/[\s,]+/s);

      // Disconnect all joint nodes.

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of this .interpolators)
      {
         positionInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => positionInterpolator ._value_changed .removeFieldInterest (field));

         orientationInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => orientationInterpolator ._value_changed .removeFieldInterest (field));

         scaleInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => scaleInterpolator ._value_changed .removeFieldInterest (field));
      }
   },
   set_interpolators__ ()
   {
      // Disconnect old interpolators.

      const timeSensor = this .timeSensor;

      timeSensor ._fraction_changed .getFieldInterests ()
         .forEach (field => timeSensor ._fraction_changed .removeFieldInterest (field));

      // Create interpolators.

      const channels = this ._channels .getValue ()
         .replace (/^[\s,\d]+|[\s,\d]+$/sg, "")
         .split (/[\s,]+\d+[\s,]+/s)
         .map (string => string .split (/[\s,]+/s));

      const
         values        = this ._values,
         numChannels   = channels .reduce ((v, c) => v + c .length, 0),
         frameCount    = Math .floor (numChannels ? values .length / numChannels : 0),
         types         = new Map (),
         interpolators = Array .from ({length: channels .length}, () => ({ }));

      this .interpolators = interpolators;

      for (let frame = 0, v = 0; frame < frameCount; ++ frame)
      {
         for (const [j, joint] of channels .entries ())
         {
            types .clear ();

            for (const channel of joint)
               types .set (channel, values [v ++]);

            if (types .has ("Xposition") || types .has ("Yposition") || types .has ("Zposition"))
            {
               const interpolator = interpolators [j] .positionInterpolator
                  ?? this .createPositionInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new (external_X_ITE_X3D_Vector3_default()) (types .get ("Xposition") ?? 0,
                                          types .get ("Yposition") ?? 0,
                                          types .get ("Zposition") ?? 0);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xrotation") || types .has ("Yrotation") || types .has ("Zrotation"))
            {
               const interpolator = interpolators [j] .orientationInterpolator
                  ?? this .createOrientationInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = external_X_ITE_X3D_Rotation4_default().fromEuler (external_X_ITE_X3D_Algorithm_default().radians (types .get ("Xrotation") ?? 0),
                                                   external_X_ITE_X3D_Algorithm_default().radians (types .get ("Yrotation") ?? 0),
                                                   external_X_ITE_X3D_Algorithm_default().radians (types .get ("Zrotation") ?? 0));

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xscale") || types .has ("Yscale") || types .has ("Zscale"))
            {
               const interpolator = interpolators [j] .scaleInterpolator
                  ?? this .createScaleInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new (external_X_ITE_X3D_Vector3_default()) (types .get ("Xscale") ?? 1,
                                          types .get ("Yscale") ?? 1,
                                          types .get ("Zscale") ?? 1);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }
         }
      }

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of interpolators)
      {
         positionInterpolator    ?.setup ();
         orientationInterpolator ?.setup ();
         scaleInterpolator       ?.setup ();
      }

      this ._frameIndex = 0;
      this ._startFrame = 0;
      this ._endFrame   = frameCount - 1;
      this ._frameCount = frameCount;

      this .set_frameDuration__ ();
   },
   set_next_or_previous__ (direction, field)
   {
      if (!field .getValue ())
         return;

      const
         fraction       = this .getFraction (),
         frameCount     = this ._frameCount .getValue (),
         frameIncrement = this ._frameIncrement .getValue (),
         frameIndex     = (frameCount > 1 ? Math .floor (fraction * (frameCount - 1)) : 0) + frameIncrement * direction;

      if (frameIndex > this .endFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .startFrame;
      }
      else if (frameIndex < this .startFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .endFrame;
      }
      else
      {
         this ._frameIndex = frameIndex;
      }
   },
   set_frameIndex__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         frameIndex = external_X_ITE_X3D_Algorithm_default().clamp (this ._frameIndex .getValue (), 0, frameCount),
         fraction   = frameCount > 1 ? frameIndex / (frameCount - 1) : 0;

      this .timeSensor ._range [0] = fraction;

      if (this .timeSensor ._isActive .getValue ())
         return;

      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         field .setValue (fraction);
   },
   set_frameDuration__ ()
   {
      const
         frameCount    = this ._frameCount .getValue (),
         frameDuration = Math .max (this ._frameDuration .getValue (), 0);

      this .timeSensor ._cycleInterval = frameCount > 1 ? (frameCount - 1) * frameDuration : 0;
   },
   set_frameIncrement__ ()
   {
      this .timeSensor ._enabled = this ._frameIncrement .getValue ();
   },
   set_start_or_endFrame__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         startFrame = external_X_ITE_X3D_Algorithm_default().clamp (this ._startFrame .getValue (), 0, frameCount),
         endFrame   = external_X_ITE_X3D_Algorithm_default().clamp (this ._endFrame   .getValue (), 0, frameCount);

      this .startFrame             = Math .min (startFrame, endFrame);
      this .endFrame               = Math .max (startFrame, endFrame);
      this .timeSensor ._range [1] = frameCount > 1 ? this .startFrame / (frameCount - 1) : 0;
      this .timeSensor ._range [2] = frameCount > 1 ? this .endFrame   / (frameCount - 1) : 0;
   },
   createPositionInterpolator (interpolators, j)
   {
      return interpolators [j] .positionInterpolator = new (external_X_ITE_X3D_PositionInterpolator_default()) (this .getExecutionContext ());
   },
   createOrientationInterpolator (interpolators, j)
   {
      return interpolators [j] .orientationInterpolator = new (external_X_ITE_X3D_OrientationInterpolator_default()) (this .getExecutionContext ());
   },
   createScaleInterpolator (interpolators, j)
   {
      return interpolators [j] .scaleInterpolator = new (external_X_ITE_X3D_PositionInterpolator_default()) (this .getExecutionContext ());
   },
   getFraction ()
   {
      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         return field .getValue ();

      return 0;
   },
});

Object .defineProperties (HAnimMotion,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimMotion", "HAnim", 2, "motions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "description",     new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "name",            new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "loa",             new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "joints",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "channelsEnabled", new (external_X_ITE_X3D_Fields_default()).MFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "channels",        new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "values",          new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "loop",            new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "next",            new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "previous",        new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "frameIndex",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "frameDuration",   new (external_X_ITE_X3D_Fields_default()).SFTime (0.1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "frameIncrement",  new (external_X_ITE_X3D_Fields_default()).SFInt32 (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "startFrame",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "endFrame",        new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "cycleTime",       new (external_X_ITE_X3D_Fields_default()).SFTime ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "elapsedTime",     new (external_X_ITE_X3D_Fields_default()).SFTime ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "frameCount",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
      ]),
      enumerable: true,
   },
});

const HAnimMotion_default_ = HAnimMotion;
;

/* harmony default export */ const HAnim_HAnimMotion = (external_X_ITE_X3D_Namespace_default().add ("HAnimMotion", HAnimMotion_default_));
;// external "__X_ITE_X3D__ .X3DGroupingNode"
const external_X_ITE_X3D_X3DGroupingNode_namespaceObject = __X_ITE_X3D__ .X3DGroupingNode;
var external_X_ITE_X3D_X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGroupingNode_namespaceObject);
;// ./src/x_ite/Components/HAnim/HAnimSegment.js










function HAnimSegment (executionContext)
{
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimSegment);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacementsTexture",       new (external_X_ITE_X3D_Fields_default()).SFTime (),
                          (external_X_ITE_X3D_X3DConstants_default()).outputOnly, "displacementWeightsTexture", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   // Units

   this ._mass .setUnit ("mass");

   // Private properties

   const size = Math .ceil (Math .sqrt (1 * 8));

   this .numJoints           = 0;
   this .numDisplacements    = 0;
   this .displacerNodes      = [ ];
   this .displacementWeights = [ ];
   this .jointMatricesArray  = new Float32Array (size * size * 4);
}

Object .assign (Object .setPrototypeOf (HAnimSegment .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGroupingNode_default().prototype .initialize .call (this);

      // Textures

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .displacementsTexture       = gl .createTexture ();
      this .displacementWeightsTexture = gl .createTexture ();
      this .jointMatricesTexture       = gl .createTexture ();

      for (const texture of [this .displacementsTexture, this .displacementWeightsTexture, this .jointMatricesTexture])
      {
         gl .bindTexture (gl .TEXTURE_2D, texture);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      }

      // Events

      this ._displacers .addInterest ("set_displacers__", this);
      this ._coord      .addInterest ("set_coord__",      this);

      this ._displacementsTexture       .addInterest ("set_displacementsTexture__",       this);
      this ._displacementWeightsTexture .addInterest ("set_displacementWeightsTexture__", this);

      this .set_displacers__ ();
      this .set_coord__ ();
   },
   getHAnimKey ()
   {
      return this .humanoidKey;
   },
   getNumJoints ()
   {
      return this .numJoints;
   },
   getNumDisplacements ()
   {
      return this .numDisplacements;
   },
   set_humanoidKey__ ()
   {
      this .humanoidKey = `[${this .numJoints}.${this .numDisplacements}]`;
   },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacementsTexture);
         displacerNode ._displacements .removeInterest ("addEvent", this ._displacementsTexture);
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacementWeightsTexture);
         displacerNode ._weight        .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacementsTexture);
         displacerNode ._displacements .addInterest ("addEvent", this ._displacementsTexture);
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacementWeightsTexture);
         displacerNode ._weight        .addInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   set_displacementsTexture__ ()
   {
      // Create array.

      const
         length        = this .coordNode ?._point .length || 1,
         displacements = Array .from ({ length }, () => [ ]);

      let displacer = 0;

      this .displacementWeights .length = 0;

      for (const { _weight, _coordIndex, _displacements } of this .displacerNodes)
      {
         if (!_coordIndex .length)
            continue;

         // Store reference to weight SFFloat.
         this .displacementWeights .push (_weight, 0, 0, 0);

         for (const [i, index] of _coordIndex .entries ())
            displacements [index] ?.push (... _displacements [i], 0, displacer, 0, 0, 0);

         ++ displacer;
      }

      const
         numDisplacements   = displacements .reduce ((p, n) => Math .max (p, n .length), 0) / 8,
         numElements        = numDisplacements * 8,
         size               = Math .ceil (Math .sqrt (length * numDisplacements * 2)) || 1,
         displacementsArray = new Float32Array (size * size * 4);

      for (let i = 0; i < length; ++ i)
         displacementsArray .set (displacements [i], i * numElements);

      // Number of displacements per coord index.
      this .numDisplacements = numDisplacements;

      // Upload texture.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, displacementsArray);

      // Weights

      this .displacementWeightsSize  = Math .ceil (Math .sqrt (displacer));
      this .displacementWeightsArray = new Float32Array (this .displacementWeightsSize * this .displacementWeightsSize * 4);

      // Trigger update.

      this .set_humanoidKey__ ();
   },
   set_displacementWeightsTexture__ ()
   {
      // Upload texture.

      const
         gl    = this .getBrowser () .getContext (),
         size  = this .displacementWeightsSize,
         array = this .displacementWeightsArray;

      array .set (this .displacementWeights);

      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, array);
   },
   set_coord__ ()
   {
      if (this .coordNode)
      {
         this .coordNode .removeInterest ("addEvent", this ._displacementsTexture);
         this .coordNode .removeInterest ("addEvent", this ._displacementWeightsTexture);
      }

      this .coordNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).Coordinate, this ._coord)
         ?? external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).CoordinateDouble, this ._coord);

      if (this .coordNode)
      {
         delete this .skinning;

         this .coordNode .addInterest ("addEvent", this ._displacementsTexture);
         this .coordNode .addInterest ("addEvent", this ._displacementWeightsTexture);
      }
      else
      {
         this .skinning = Function .prototype;
      }

      this ._displacementsTexture       .addEvent ();
      this ._displacementWeightsTexture .addEvent ();
   },
   traverse (type, renderObject)
   {
      if (this .coordNode)
         renderObject .getHAnimNode () .push (this);

      external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

      this .skinning (type, renderObject);

      if (this .coordNode)
         renderObject .getHAnimNode () .pop ();
   },
   skinning: (() =>
   {
      const modelViewMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function (type, renderObject)
      {
         if (type !== (external_X_ITE_X3D_TraverseType_default()).DISPLAY)
            return;

         // Create joint matrices.

         const
            invHumanoidMatrix  = renderObject .getInvHumanoidMatrix () .get (),
            jointMatricesArray = this .jointMatricesArray,
            size               = Math .ceil (Math .sqrt (1 * 8));

         const jointMatrix = modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()) .multRight (invHumanoidMatrix);

         jointMatricesArray .set (jointMatrix, 0);
         // No need for jointNormalMatrix.

         // Upload textures.

         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, size, size, 0, gl .RGBA, gl .FLOAT, jointMatricesArray);
      };
   })(),
   setShaderUniforms (gl, shaderObject)
   {
      const
         browser                               = this .getBrowser (),
         displacementsTextureTextureUnit       = browser .getTextureUnit (),
         displacementWeightsTextureTextureUnit = browser .getTextureUnit (),
         jointMatricesTextureUnit              = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + displacementsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementsTexture, displacementsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + displacementWeightsTextureTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .displacementWeightsTexture);
      gl .uniform1i (shaderObject .x3d_DisplacementWeightsTexture, displacementWeightsTextureTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + jointMatricesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .jointMatricesTexture);
      gl .uniform1i (shaderObject .x3d_JointMatricesTexture, jointMatricesTextureUnit);
   },
});

Object .defineProperties (HAnimSegment,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimSegment", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",             new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "mass",             new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "centerOfMass",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "momentsOfInertia", new (external_X_ITE_X3D_Fields_default()).MFFloat (0, 0, 0, 0, 0, 0, 0, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "displacers",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "coord",            new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",      new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",       new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",         new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimSegment_default_ = HAnimSegment;
;

/* harmony default export */ const HAnim_HAnimSegment = (external_X_ITE_X3D_Namespace_default().add ("HAnimSegment", HAnimSegment_default_));
;// ./src/x_ite/Components/HAnim/HAnimSite.js







function HAnimSite (executionContext)
{
   external_X_ITE_X3D_X3DTransformNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).HAnimSite);
}

Object .setPrototypeOf (HAnimSite .prototype, (external_X_ITE_X3D_X3DTransformNode_default()).prototype);

Object .defineProperties (HAnimSite,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("HAnimSite", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",             new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "translation",      new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "rotation",         new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scale",            new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scaleOrientation", new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "center",           new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",      new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",       new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",         new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const HAnimSite_default_ = HAnimSite;
;

/* harmony default export */ const HAnim_HAnimSite = (external_X_ITE_X3D_Namespace_default().add ("HAnimSite", HAnimSite_default_));
;// ./src/assets/components/HAnimComponent.js








external_X_ITE_X3D_Components_default().add ({
   name: "HAnim",
   concreteNodes:
   [
      HAnim_HAnimDisplacer,
      HAnim_HAnimHumanoid,
      HAnim_HAnimJoint,
      HAnim_HAnimMotion,
      HAnim_HAnimSegment,
      HAnim_HAnimSite,
   ],
   abstractNodes:
   [
   ],
});

const HAnimComponent_default_ = undefined;
;

/* harmony default export */ const HAnimComponent = (external_X_ITE_X3D_Namespace_default().add ("HAnimComponent", HAnimComponent_default_));
/******/ })()
;