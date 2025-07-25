/* X_ITE v11.6.1 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.6.1")];
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
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .BitSet"
const external_X_ITE_X3D_BitSet_namespaceObject = __X_ITE_X3D__ .BitSet;
var external_X_ITE_X3D_BitSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_BitSet_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/X_ITE/X3DMaterialExtensionNode.js




function X3DMaterialExtensionNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DMaterialExtensionNode);

   this .textureBits = new (external_X_ITE_X3D_BitSet_default()) ();
}

Object .assign (Object .setPrototypeOf (X3DMaterialExtensionNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   setTexture (index, textureNode)
   {
      index *= 4;

      this .textureBits .remove (index, 0xf);
      this .textureBits .add (index, textureNode ?.getTextureBits () ?? 0);
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
});

Object .defineProperties (X3DMaterialExtensionNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DMaterialExtensionNode", "X_ITE", 1));

const __default__ = X3DMaterialExtensionNode;
;

/* harmony default export */ const X_ITE_X3DMaterialExtensionNode = (external_X_ITE_X3D_Namespace_default().add ("X3DMaterialExtensionNode", __default__));
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// ./src/x_ite/Browser/X_ITE/ExtensionKeys.js
let i = 0;

const ExtensionKeys =
{
   add (name)
   {
      this [name] = i ++;
   },
};

const ExtensionKeys_default_ = ExtensionKeys;
;

/* harmony default export */ const X_ITE_ExtensionKeys = (external_X_ITE_X3D_Namespace_default().add ("ExtensionKeys", ExtensionKeys_default_));
;// external "__X_ITE_X3D__ .MaterialTextures"
const external_X_ITE_X3D_MaterialTextures_namespaceObject = __X_ITE_X3D__ .MaterialTextures;
var external_X_ITE_X3D_MaterialTextures_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_MaterialTextures_namespaceObject);
;// ./src/x_ite/Components/X_ITE/AnisotropyMaterialExtension.js









// Register key.

X_ITE_ExtensionKeys .add ("ANISOTROPY_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_AnisotropyTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function AnisotropyMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).AnisotropyMaterialExtension);

   // Units

   this ._anisotropyRotation .setUnit ("angle");

   // Private properties

   this .anisotropyArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (AnisotropyMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._anisotropyStrength .addInterest ("set_anisotropyStrength__", this);
      this ._anisotropyRotation .addInterest ("set_anisotropyRotation__", this);
      this ._anisotropyTexture  .addInterest ("set_anisotropyTexture__",  this);

      this .set_anisotropyStrength__ ();
      this .set_anisotropyRotation__ ();
      this .set_anisotropyTexture__ ();
   },
   set_anisotropyStrength__ ()
   {
      this .anisotropyArray [2] = Math .max (this ._anisotropyStrength .getValue (), 0);
   },
   set_anisotropyRotation__ ()
   {
      const anisotropyRotation = this ._anisotropyRotation .getValue ();

      this .anisotropyArray [0] = Math .cos (anisotropyRotation);
      this .anisotropyArray [1] = Math .sin (anisotropyRotation);
   },
   set_anisotropyTexture__ ()
   {
      this .anisotropyTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._anisotropyTexture);

      this .setTexture (0, this .anisotropyTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .ANISOTROPY_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_ANISOTROPY_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .anisotropyTextureNode ?.getShaderOptions (options, "ANISOTROPY", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_AnisotropyEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_AnisotropyEXT, this .anisotropyArray);

      this .anisotropyTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_AnisotropyTextureEXT,
         this ._anisotropyTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (AnisotropyMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("AnisotropyMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                 new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "anisotropyStrength",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "anisotropyRotation",       new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "anisotropyTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "anisotropyTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const AnisotropyMaterialExtension_default_ = AnisotropyMaterialExtension;
;

/* harmony default export */ const X_ITE_AnisotropyMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("AnisotropyMaterialExtension", AnisotropyMaterialExtension_default_));
;// external "__X_ITE_X3D__ .X3DAppearanceChildNode"
const external_X_ITE_X3D_X3DAppearanceChildNode_namespaceObject = __X_ITE_X3D__ .X3DAppearanceChildNode;
var external_X_ITE_X3D_X3DAppearanceChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DAppearanceChildNode_namespaceObject);
;// ./src/x_ite/Components/X_ITE/BlendMode.js







/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function BlendMode (executionContext)
{
   external_X_ITE_X3D_X3DAppearanceChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).BlendMode);

   this .factorTypes   = new Map ();
   this .equationTypes = new Map ();
}

Object .assign (Object .setPrototypeOf (BlendMode .prototype, (external_X_ITE_X3D_X3DAppearanceChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DAppearanceChildNode_default().prototype .initialize .call (this);

      const
         gl  = this .getBrowser () .getContext (),
         ext = gl .getExtension ('EXT_blend_minmax');

      this .factorTypes .set ("ZERO",                     gl .ZERO);
      this .factorTypes .set ("ONE",                      gl .ONE);
      this .factorTypes .set ("SRC_COLOR",                gl .SRC_COLOR);
      this .factorTypes .set ("ONE_MINUS_SRC_COLOR",      gl .ONE_MINUS_SRC_COLOR);
      this .factorTypes .set ("DST_COLOR",                gl .DST_COLOR);
      this .factorTypes .set ("ONE_MINUS_DST_COLOR",      gl .ONE_MINUS_DST_COLOR);
      this .factorTypes .set ("SRC_ALPHA",                gl .SRC_ALPHA);
      this .factorTypes .set ("ONE_MINUS_SRC_ALPHA",      gl .ONE_MINUS_SRC_ALPHA);
      this .factorTypes .set ("DST_ALPHA",                gl .DST_ALPHA);
      this .factorTypes .set ("ONE_MINUS_DST_ALPHA",      gl .ONE_MINUS_DST_ALPHA);
      this .factorTypes .set ("SRC_ALPHA_SATURATE",       gl .SRC_ALPHA_SATURATE);
      this .factorTypes .set ("CONSTANT_COLOR",           gl .CONSTANT_COLOR);
      this .factorTypes .set ("ONE_MINUS_CONSTANT_COLOR", gl .ONE_MINUS_CONSTANT_COLOR);
      this .factorTypes .set ("CONSTANT_ALPHA",           gl .CONSTANT_ALPHA);
      this .factorTypes .set ("ONE_MINUS_CONSTANT_ALPHA", gl .ONE_MINUS_CONSTANT_ALPHA);

      this .equationTypes .set ("FUNC_ADD",              gl .FUNC_ADD);
      this .equationTypes .set ("FUNC_SUBTRACT",         gl .FUNC_SUBTRACT);
      this .equationTypes .set ("FUNC_REVERSE_SUBTRACT", gl .FUNC_REVERSE_SUBTRACT);
      this .equationTypes .set ("MIN",                   gl .MIN || (ext && ext .MIN_EXT));
      this .equationTypes .set ("MAX",                   gl .MAX || (ext && ext .MAX_EXT));

      this ._sourceColorFactor      .addInterest ("set_sourceColorFactor__",      this);
      this ._sourceAlphaFactor      .addInterest ("set_sourceAlphaFactor__",      this);
      this ._destinationColorFactor .addInterest ("set_destinationColorFactor__", this);
      this ._destinationAlphaFactor .addInterest ("set_destinationAlphaFactor__", this);
      this ._colorEquation          .addInterest ("set_colorEquation__",          this);
      this ._alphaEquation          .addInterest ("set_alphaEquation__",          this);

      this .set_sourceColorFactor__ ();
      this .set_sourceAlphaFactor__ ();
      this .set_destinationColorFactor__ ();
      this .set_destinationAlphaFactor__ ();
      this .set_colorEquation__ ();
      this .set_alphaEquation__ ();
   },
   set_sourceColorFactor__ ()
   {
      this .sourceColorFactorType = this .factorTypes .get (this ._sourceColorFactor .getValue ())
         ?? this .factorTypes .get ("SRC_ALPHA");
   },
   set_sourceAlphaFactor__ ()
   {
      this .sourceAlphaFactorType = this .factorTypes .get (this ._sourceAlphaFactor .getValue ())
         ?? this .factorTypes .get ("ONE");
   },
   set_destinationColorFactor__ ()
   {
      this .destinationColorFactorType = this .factorTypes .get (this ._destinationColorFactor .getValue ())
         ?? this .factorTypes .get ("ONE_MINUS_SRC_ALPHA");
   },
   set_destinationAlphaFactor__ ()
   {
      this .destinationAlphaFactorType = this .factorTypes .get (this ._destinationAlphaFactor .getValue ())
      ??    this .factorTypes .get ("ONE_MINUS_SRC_ALPHA");
   },
   set_colorEquation__ ()
   {
      this .colorEquationType = this .equationTypes .get (this ._colorEquation .getValue ())
         ?? this .equationTypes .get ("FUNC_ADD");
   },
   set_alphaEquation__ ()
   {
      this .alphaEquationType = this .equationTypes .get (this ._alphaEquation .getValue ())
         ?? this .equationTypes .get ("FUNC_ADD");
   },
   enable (gl)
   {
      const color = this ._blendColor .getValue ();

      gl .blendColor (color .r, color .g, color .b, color .a);
      gl .blendFuncSeparate (this .sourceColorFactorType, this .destinationColorFactorType, this .sourceAlphaFactorType, this .destinationAlphaFactorType);
      gl .blendEquationSeparate (this .colorEquationType, this .alphaEquationType);
   },
   disable (gl)
   {
      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);
   },
});

Object .defineProperties (BlendMode,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("BlendMode", "X_ITE", 1, "blendMode", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "blendColor",              new (external_X_ITE_X3D_Fields_default()).SFColorRGBA ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sourceColorFactor",       new (external_X_ITE_X3D_Fields_default()).SFString ("SRC_ALPHA")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sourceAlphaFactor",       new (external_X_ITE_X3D_Fields_default()).SFString ("ONE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "destinationColorFactor",  new (external_X_ITE_X3D_Fields_default()).SFString ("ONE_MINUS_SRC_ALPHA")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "destinationAlphaFactor",  new (external_X_ITE_X3D_Fields_default()).SFString ("ONE_MINUS_SRC_ALPHA")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "colorEquation",           new (external_X_ITE_X3D_Fields_default()).SFString ("FUNC_ADD")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "alphaEquation",           new (external_X_ITE_X3D_Fields_default()).SFString ("FUNC_ADD")),
      ]),
      enumerable: true,
   },
});

const BlendMode_default_ = BlendMode;
;

/* harmony default export */ const X_ITE_BlendMode = (external_X_ITE_X3D_Namespace_default().add ("BlendMode", BlendMode_default_));
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// ./src/x_ite/Components/X_ITE/ClearcoatMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("CLEARCOAT_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_ClearcoatTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_ClearcoatRoughnessTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_ClearcoatNormalTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function ClearcoatMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ClearcoatMaterialExtension);
}

Object .assign (Object .setPrototypeOf (ClearcoatMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._clearcoat                 .addInterest ("set_clearcoat__",                 this);
      this ._clearcoatTexture          .addInterest ("set_clearcoatTexture__",          this);
      this ._clearcoatRoughness        .addInterest ("set_clearcoatRoughness__",        this);
      this ._clearcoatRoughnessTexture .addInterest ("set_clearcoatRoughnessTexture__", this);
      this ._clearcoatNormalTexture    .addInterest ("set_clearcoatNormalTexture__",    this);

      this .set_clearcoat__ ();
      this .set_clearcoatTexture__ ();
      this .set_clearcoatRoughness__ ();
      this .set_clearcoatRoughnessTexture__ ();
      this .set_clearcoatNormalTexture__ ();
   },
   set_clearcoat__ ()
   {
      this .clearcoat = Math .max (this ._clearcoat .getValue (), 0);
   },
   set_clearcoatTexture__ ()
   {
      this .clearcoatTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatTexture);

      this .setTexture (0, this .clearcoatTextureNode);
   },
   set_clearcoatRoughness__ ()
   {
      this .clearcoatRoughness = external_X_ITE_X3D_Algorithm_default().clamp (this ._clearcoatRoughness .getValue (), 0, 1);
   },
   set_clearcoatRoughnessTexture__ ()
   {
      this .clearcoatRoughnessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatRoughnessTexture);

      this .setTexture (1, this .clearcoatRoughnessTextureNode);
   },
   set_clearcoatNormalTexture__ ()
   {
      this .clearcoatNormalTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatNormalTexture);

      this .setTexture (2, this .clearcoatNormalTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .CLEARCOAT_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_CLEARCOAT_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .clearcoatTextureNode          ?.getShaderOptions (options, "CLEARCOAT",           true);
      this .clearcoatRoughnessTextureNode ?.getShaderOptions (options, "CLEARCOAT_ROUGHNESS", true);
      this .clearcoatNormalTextureNode    ?.getShaderOptions (options, "CLEARCOAT_NORMAL",    true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ClearcoatEXT");
      uniforms .push ("x3d_ClearcoatRoughnessEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_ClearcoatEXT,          this .clearcoat);
      gl .uniform1f (shaderObject .x3d_ClearcoatRoughnessEXT, this .clearcoatRoughness);

      if (!+this .getTextureBits ())
         return;

      this .clearcoatTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatTextureEXT,
         this ._clearcoatTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatRoughnessTextureEXT,
         this ._clearcoatRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatNormalTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatNormalTextureEXT,
         this ._clearcoatNormalTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (ClearcoatMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ClearcoatMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoat",                        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatTextureMapping",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatTexture",                 new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatRoughness",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatRoughnessTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatRoughnessTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatNormalTextureMapping",    new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "clearcoatNormalTexture",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ClearcoatMaterialExtension_default_ = ClearcoatMaterialExtension;
;

/* harmony default export */ const X_ITE_ClearcoatMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("ClearcoatMaterialExtension", ClearcoatMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/DepthMode.js







/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function DepthMode (executionContext)
{
   external_X_ITE_X3D_X3DAppearanceChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).DepthMode);

   this .addAlias ("depthFunc", this ._depthFunction);
}

Object .assign (Object .setPrototypeOf (DepthMode .prototype, (external_X_ITE_X3D_X3DAppearanceChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DAppearanceChildNode_default().prototype .initialize .call (this);

      this ._depthFunction .addInterest ("set_depthFunction__", this);

      this .set_depthFunction__ ();
   },
   set_depthFunction__: (() =>
   {
      const depthFunctions = new Map ([
         ["NEVER",         "NEVER"],
         ["LESS",          "LESS"],
         ["EQUAL",         "EQUAL"],
         ["LESS_EQUAL",    "LEQUAL"],
         ["GREATER",       "GREATER"],
         ["NOT_EQUAL",     "NOTEQUAL"],
         ["GREATER_EQUAL", "GEQUAL"],
         ["ALWAYS",        "ALWAYS"],
      ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         this .depthFunction = gl [depthFunctions .get (this ._depthFunction .getValue ()) ?? "LEQUAL"];
      };
   })(),
   enable (gl)
   {
      this .depthTest      = gl .isEnabled (gl .DEPTH_TEST);
      this .depthWriteMask = gl .getParameter (gl .DEPTH_WRITEMASK);

      gl .enable (gl .POLYGON_OFFSET_FILL);
      gl .polygonOffset (... this ._polygonOffset);

      if (this ._depthTest .getValue ())
         gl .enable (gl .DEPTH_TEST);
      else
         gl .disable (gl .DEPTH_TEST);

      gl .depthFunc (this .depthFunction);
      gl .depthRange (... this ._depthRange .getValue ());
      gl .depthMask (this ._depthMask .getValue ());
   },
   disable (gl)
   {
      gl .disable (gl .POLYGON_OFFSET_FILL);

      if (this .depthTest)
         gl .enable (gl .DEPTH_TEST);
      else
         gl .disable (gl .DEPTH_TEST);

      gl .depthFunc (gl .LEQUAL);
      gl .depthRange (0, 1);
      gl .depthMask (this .depthWriteMask);
   },
});

Object .defineProperties (DepthMode,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("DepthMode", "X_ITE", 1, "depthMode", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "polygonOffset", new (external_X_ITE_X3D_Fields_default()).SFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "depthRange",    new (external_X_ITE_X3D_Fields_default()).SFVec2f (0, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "depthTest",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "depthFunction", new (external_X_ITE_X3D_Fields_default()).SFString ("LESS_EQUAL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "depthMask",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
      ]),
      enumerable: true,
   },
});

const DepthMode_default_ = DepthMode;
;

/* harmony default export */ const X_ITE_DepthMode = (external_X_ITE_X3D_Namespace_default().add ("DepthMode", DepthMode_default_));
;// ./src/x_ite/Components/X_ITE/DiffuseTransmissionMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("DIFFUSE_TRANSMISSION_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_DiffuseTransmissionTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_DiffuseTransmissionColorTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function DiffuseTransmissionMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).DiffuseTransmissionMaterialExtension);

   this .diffuseTransmissionColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (DiffuseTransmissionMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._diffuseTransmission             .addInterest ("set_diffuseTransmission__",             this);
      this ._diffuseTransmissionTexture      .addInterest ("set_diffuseTransmissionTexture__",      this);
      this ._diffuseTransmissionColor        .addInterest ("set_diffuseTransmissionColor__",        this);
      this ._diffuseTransmissionColorTexture .addInterest ("set_diffuseTransmissionColorTexture__", this);

      this .set_diffuseTransmission__ ();
      this .set_diffuseTransmissionTexture__ ();
      this .set_diffuseTransmissionColor__ ();
      this .set_diffuseTransmissionColorTexture__ ();
   },
   set_diffuseTransmission__ ()
   {
      this .diffuseTransmission = external_X_ITE_X3D_Algorithm_default().clamp (this ._diffuseTransmission .getValue (), 0, 1);
   },
   set_diffuseTransmissionTexture__ ()
   {
      this .diffuseTransmissionTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._diffuseTransmissionTexture);

      this .setTexture (0, this .diffuseTransmissionTextureNode);
   },
   set_diffuseTransmissionColor__ ()
   {
      this .diffuseTransmissionColorArray .set (this ._diffuseTransmissionColor .getValue ());
   },
   set_diffuseTransmissionColorTexture__ ()
   {
      this .diffuseTransmissionColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._diffuseTransmissionColorTexture);

      this .setTexture (1, this .diffuseTransmissionColorTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .DIFFUSE_TRANSMISSION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .diffuseTransmissionTextureNode      ?.getShaderOptions (options, "DIFFUSE_TRANSMISSION",       true);
      this .diffuseTransmissionColorTextureNode ?.getShaderOptions (options, "DIFFUSE_TRANSMISSION_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_DiffuseTransmissionEXT");
      uniforms .push ("x3d_DiffuseTransmissionColorEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_DiffuseTransmissionEXT,      this .diffuseTransmission);
      gl .uniform3fv (shaderObject .x3d_DiffuseTransmissionColorEXT, this .diffuseTransmissionColorArray);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTransmissionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTransmissionTextureEXT,
         this ._diffuseTransmissionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .diffuseTransmissionColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTransmissionColorTextureEXT,
         this ._diffuseTransmissionColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (DiffuseTransmissionMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("DiffuseTransmissionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                               new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmission",                    new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmissionTextureMapping",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmissionTexture",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmissionColor",               new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmissionColorTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTransmissionColorTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const DiffuseTransmissionMaterialExtension_default_ = DiffuseTransmissionMaterialExtension;
;

/* harmony default export */ const X_ITE_DiffuseTransmissionMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("DiffuseTransmissionMaterialExtension", DiffuseTransmissionMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/DispersionMaterialExtension.js








// Register key.

X_ITE_ExtensionKeys .add ("DISPERSION_MATERIAL_EXTENSION");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function DispersionMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).DispersionMaterialExtension);
}

Object .assign (Object .setPrototypeOf (DispersionMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._dispersion .addInterest ("set_dispersion__", this);

      this .set_dispersion__ ();
   },
   set_dispersion__ ()
   {
      this .dispersion = Math .max (this ._dispersion .getValue (), 0);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .DISPERSION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_DISPERSION_MATERIAL_EXT");
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_DispersionEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_DispersionEXT, this .dispersion);
   },
});

Object .defineProperties (DispersionMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("DispersionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "dispersion", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const DispersionMaterialExtension_default_ = DispersionMaterialExtension;
;

/* harmony default export */ const X_ITE_DispersionMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("DispersionMaterialExtension", DispersionMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/EmissiveStrengthMaterialExtension.js








// Register key.

X_ITE_ExtensionKeys .add ("EMISSIVE_STRENGTH_MATERIAL_EXTENSION");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function EmissiveStrengthMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).EmissiveStrengthMaterialExtension);
}

Object .assign (Object .setPrototypeOf (EmissiveStrengthMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._emissiveStrength .addInterest ("set_emissiveStrength__", this);

      this .set_emissiveStrength__ ();
   },
   set_emissiveStrength__ ()
   {
      this .emissiveStrength = Math .max (this ._emissiveStrength .getValue (), 0);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .EMISSIVE_STRENGTH_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_EMISSIVE_STRENGTH_MATERIAL_EXT");
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_EmissiveStrengthEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_EmissiveStrengthEXT, this .emissiveStrength);
   },
});

Object .defineProperties (EmissiveStrengthMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("EmissiveStrengthMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "emissiveStrength", new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
      ]),
      enumerable: true,
   },
});

const EmissiveStrengthMaterialExtension_default_ = EmissiveStrengthMaterialExtension;
;

/* harmony default export */ const X_ITE_EmissiveStrengthMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("EmissiveStrengthMaterialExtension", EmissiveStrengthMaterialExtension_default_));
;// external "__X_ITE_X3D__ .X3DShapeNode"
const external_X_ITE_X3D_X3DShapeNode_namespaceObject = __X_ITE_X3D__ .X3DShapeNode;
var external_X_ITE_X3D_X3DShapeNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DShapeNode_namespaceObject);
;// external "__X_ITE_X3D__ .VertexArray"
const external_X_ITE_X3D_VertexArray_namespaceObject = __X_ITE_X3D__ .VertexArray;
var external_X_ITE_X3D_VertexArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_VertexArray_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .Box3"
const external_X_ITE_X3D_Box3_namespaceObject = __X_ITE_X3D__ .Box3;
var external_X_ITE_X3D_Box3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Box3_namespaceObject);
;// ./src/x_ite/Components/X_ITE/InstancedShape.js










/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function InstancedShape (executionContext)
{
   external_X_ITE_X3D_X3DShapeNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).InstancedShape);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "matrices", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   // Units

   this ._translations .setUnit ("length");
   this ._centers      .setUnit ("length");

   // Private properties

   this .numInstances       = 0;
   this .instancesStride    = Float32Array .BYTES_PER_ELEMENT * (16 + 9); // mat4 + mat3
   this .matrixOffset       = 0;
   this .normalMatrixOffset = Float32Array .BYTES_PER_ELEMENT * 16;
   this .matrices           = [ ];
}

Object .assign (Object .setPrototypeOf (InstancedShape .prototype, (external_X_ITE_X3D_X3DShapeNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DShapeNode_default().prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .instances = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
         thickLinesVertexArrayObject: new (external_X_ITE_X3D_VertexArray_default()) (gl),
      });

      this ._translations      .addInterest ("set_transform__", this);
      this ._rotations         .addInterest ("set_transform__", this);
      this ._scales            .addInterest ("set_transform__", this);
      this ._scaleOrientations .addInterest ("set_transform__", this);
      this ._centers           .addInterest ("set_transform__", this);
      this ._matrices          .addInterest ("set_matrices__",  this);

      this .set_matrices__ ();
   },
   getShapeKey ()
   {
      return 3;
   },
   getNumInstances ()
   {
      return this .numInstances;
   },
   getInstances ()
   {
      return this .instances;
   },
   set_bbox__: (() =>
   {
      const bbox = new (external_X_ITE_X3D_Box3_default()) ();

      return function ()
      {
         if (this .isDefaultBBoxSize ())
         {
            if (this .getGeometry ())
            {
               this .bbox .set ();

               const geometryBBox = this .getGeometry () .getBBox ();

               for (const matrix of this .matrices)
                  this .bbox .add (bbox .assign (geometryBBox) .multRight (matrix));
            }
            else
            {
               this .bbox .set ();
            }
         }
         else
         {
            this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
         }

         this .getBBoxSize ()   .assign (this .bbox .size);
         this .getBBoxCenter () .assign (this .bbox .center);
      };
   })(),
   set_transform__ ()
   {
      this ._matrices = this .getBrowser () .getCurrentTime ();
   },
   set_matrices__ ()
   {
      const
         browser              = this .getBrowser (),
         gl                   = browser .getContext (),
         translations         = this ._translations,
         rotations            = this ._rotations,
         scales               = this ._scales,
         scaleOrientations    = this ._scaleOrientations,
         centers              = this ._centers,
         numTranslations      = translations .length,
         numRotations         = rotations .length,
         numScales            = scales .length,
         numScaleOrientations = scaleOrientations .length,
         numCenters           = centers .length,
         numInstances         = Math .max (numTranslations, numRotations, numScales, numScaleOrientations, numCenters),
         stride               = this .instancesStride / Float32Array .BYTES_PER_ELEMENT,
         length               = this .instancesStride * numInstances,
         data                 = new Float32Array (length);

      this .numInstances = numInstances;

      for (let i = 0, o = 0; i < numInstances; ++ i, o += stride)
      {
         const matrix = this .matrices [i] ??= new (external_X_ITE_X3D_Matrix4_default()) ();

         matrix .set (numTranslations      ? translations      [Math .min (i, numTranslations      - 1)] .getValue () : null,
                      numRotations         ? rotations         [Math .min (i, numRotations         - 1)] .getValue () : null,
                      numScales            ? scales            [Math .min (i, numScales            - 1)] .getValue () : null,
                      numScaleOrientations ? scaleOrientations [Math .min (i, numScaleOrientations - 1)] .getValue () : null,
                      numCenters           ? centers           [Math .min (i, numCenters           - 1)] .getValue () : null);

         data .set (matrix, o);
         data .set (matrix .submatrix .transpose () .inverse (), o + 16);
      }

      this .matrices .length = numInstances;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .instances);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      this .set_bbox__ ();
      this .set_objects__ ();
   },
   intersectsBox (box, clipPlanes, modelViewMatrix)
   { },
   displaySimple (gl, renderContext, shaderNode)
   {
      this .getGeometry () .displaySimpleInstanced (gl, shaderNode, this);
   },
   display (gl, renderContext)
   {
      this .getGeometry () .displayInstanced (gl, renderContext, this);
   },
});

Object .defineProperties (InstancedShape,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("InstancedShape", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "translations",      new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "rotations",         new (external_X_ITE_X3D_Fields_default()).MFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scales",            new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scaleOrientations", new (external_X_ITE_X3D_Fields_default()).MFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "centers",           new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "pointerEvents",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
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

const InstancedShape_default_ = InstancedShape;
;

/* harmony default export */ const X_ITE_InstancedShape = (external_X_ITE_X3D_Namespace_default().add ("InstancedShape", InstancedShape_default_));
;// ./src/x_ite/Components/X_ITE/IORMaterialExtension.js








// Register key.

X_ITE_ExtensionKeys .add ("IOR_MATERIAL_EXTENSION");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function IORMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).IORMaterialExtension);
}

Object .assign (Object .setPrototypeOf (IORMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._indexOfRefraction .addInterest ("set_indexOfRefraction__", this);

      this .set_indexOfRefraction__ ();
   },
   set_indexOfRefraction__ ()
   {
      this .indexOfRefraction = Math .max (this ._indexOfRefraction .getValue (), 1);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .IOR_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_IOR_MATERIAL_EXT");
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_IorEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_IorEXT, this .indexOfRefraction);
   },
});

Object .defineProperties (IORMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("IORMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "indexOfRefraction", new (external_X_ITE_X3D_Fields_default()).SFFloat (1.5)),
      ]),
      enumerable: true,
   },
});

const IORMaterialExtension_default_ = IORMaterialExtension;
;

/* harmony default export */ const X_ITE_IORMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("IORMaterialExtension", IORMaterialExtension_default_));
;// external "__X_ITE_X3D__ .ShaderRegistry"
const external_X_ITE_X3D_ShaderRegistry_namespaceObject = __X_ITE_X3D__ .ShaderRegistry;
var external_X_ITE_X3D_ShaderRegistry_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ShaderRegistry_namespaceObject);
;// ./src/assets/shaders/webgl2/pbr/Iridescence2.glsl.js
const Iridescence2_glsl_default_ = () => /* glsl */ `
#if defined(X3D_IRIDESCENCE_MATERIAL_EXT)
const mat3 XYZ_TO_REC709=mat3(3.2404542,-.9692660,.0556434,-1.5371385,1.8760108,-.2040259,-.4985314,.0415560,1.0572252);float sq(const in float v){return v*v;}vec3 sq(const in vec3 v){return v*v;}vec3 Fresnel0ToIor(const in vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1)+sqrtF0)/(vec3(1)-sqrtF0);}vec3 IorToFresnel0(const in vec3 transmittedIor,const in float incidentIor){return sq((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(const in float transmittedIor,const in float incidentIor){return sq((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(const in float OPD,const in vec3 shift){float phase=2.*M_PI*OPD*1.0e-9;vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.*M_PI*var)*cos(pos*phase+shift)*exp(-sq(phase)*var);xyz.x+=9.7470e-14*sqrt(2.*M_PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*sq(phase));xyz/=1.0685e-7;vec3 srgb=XYZ_TO_REC709*xyz;return srgb;}vec3 evalIridescence(const in float outsideIOR,const in float eta2,const in float cosTheta1,const in float thinFilmThickness,const in vec3 baseF0){vec3 I;float iridescenceIor=mix(outsideIOR,eta2,smoothstep(0.,.03,thinFilmThickness));float sinTheta2Sq=sq(outsideIOR/iridescenceIor)*(1.-sq(cosTheta1));float cosTheta2Sq=1.-sinTheta2Sq;if(cosTheta2Sq<0.)return vec3(1);float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIor,outsideIOR);float R12=F_Schlick(R0,cosTheta1);float R21=R12;float T121=1.-R12;float phi12=0.;if(iridescenceIor<outsideIOR)phi12=M_PI;float phi21=M_PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.,.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIor);vec3 R23=F_Schlick(R1,cosTheta2);vec3 phi23=vec3(0);if(baseIOR[0]<iridescenceIor)phi23[0]=M_PI;if(baseIOR[1]<iridescenceIor)phi23[1]=M_PI;if(baseIOR[2]<iridescenceIor)phi23[2]=M_PI;float OPD=2.*iridescenceIor*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,.9999);vec3 r123=sqrt(R123);vec3 Rs=sq(T121)*R23/(vec3(1)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0));}
#endif
`
;

/* harmony default export */ const Iridescence2_glsl = (external_X_ITE_X3D_Namespace_default().add ("Iridescence2.glsl", Iridescence2_glsl_default_));
;// ./src/x_ite/Components/X_ITE/IridescenceMaterialExtension.js









// Register key.

X_ITE_ExtensionKeys .add ("IRIDESCENCE_MATERIAL_EXTENSION");

// Register shaders.




external_X_ITE_X3D_ShaderRegistry_default().addInclude ("Iridescence", Iridescence2_glsl);

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_IridescenceTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_IridescenceThicknessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function IridescenceMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).IridescenceMaterialExtension);
}

Object .assign (Object .setPrototypeOf (IridescenceMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._iridescence                  .addInterest ("set_iridescence__",                  this);
      this ._iridescenceTexture           .addInterest ("set_iridescenceTexture__",           this);
      this ._iridescenceIndexOfRefraction .addInterest ("set_iridescenceIndexOfRefraction__", this);
      this ._iridescenceThicknessMinimum  .addInterest ("set_iridescenceThicknessMinimum__",  this);
      this ._iridescenceThicknessMaximum  .addInterest ("set_iridescenceThicknessMaximum__",  this);
      this ._iridescenceThicknessTexture  .addInterest ("set_iridescenceThicknessTexture__",  this);

      this .set_iridescence__ ();
      this .set_iridescenceTexture__ ();
      this .set_iridescenceIndexOfRefraction__ ();
      this .set_iridescenceThicknessMinimum__ ();
      this .set_iridescenceThicknessMaximum__ ();
      this .set_iridescenceThicknessTexture__ ();
   },
   set_iridescence__ ()
   {
      this .iridescence = Math .max (this ._iridescence .getValue (), 0);
   },
   set_iridescenceTexture__ ()
   {
      this .iridescenceTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._iridescenceTexture);

      this .setTexture (0, this .iridescenceTextureNode);
   },
   set_iridescenceIndexOfRefraction__ ()
   {
      this .iridescenceIndexOfRefraction = Math .max (this ._iridescenceIndexOfRefraction .getValue (), 1);
   },
   set_iridescenceThicknessMinimum__ ()
   {
      this .iridescenceThicknessMinimum = Math .max (this ._iridescenceThicknessMinimum .getValue (), 0);
   },
   set_iridescenceThicknessMaximum__ ()
   {
      this .iridescenceThicknessMaximum = Math .max (this ._iridescenceThicknessMaximum .getValue (), 0);
   },
   set_iridescenceThicknessTexture__ ()
   {
      this .iridescenceThicknessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._iridescenceThicknessTexture);

      this .setTexture (1, this .iridescenceThicknessTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .IRIDESCENCE_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_IRIDESCENCE_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .iridescenceTextureNode          ?.getShaderOptions (options, "IRIDESCENCE",           true);
      this .iridescenceThicknessTextureNode ?.getShaderOptions (options, "IRIDESCENCE_THICKNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_IridescenceEXT");
      uniforms .push ("x3d_IridescenceIndexOfRefractionEXT");
      uniforms .push ("x3d_IridescenceThicknessMinimumEXT");
      uniforms .push ("x3d_IridescenceThicknessMaximumEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_IridescenceEXT,                  this .iridescence);
      gl .uniform1f (shaderObject .x3d_IridescenceIndexOfRefractionEXT, this .iridescenceIndexOfRefraction);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMinimumEXT,  this .iridescenceThicknessMinimum);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMaximumEXT,  this .iridescenceThicknessMaximum);

      if (!+this .getTextureBits ())
         return;

      this .iridescenceTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_IridescenceTextureEXT,
         this ._iridescenceTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .iridescenceThicknessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_IridescenceThicknessTextureEXT,
         this ._iridescenceThicknessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (IridescenceMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("IridescenceMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescence",                        new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceTextureMapping",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceTexture",                 new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceIndexOfRefraction",       new (external_X_ITE_X3D_Fields_default()).SFFloat (1.3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceThicknessMinimum",        new (external_X_ITE_X3D_Fields_default()).SFFloat (100)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceThicknessMaximum",        new (external_X_ITE_X3D_Fields_default()).SFFloat (400)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceThicknessTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "iridescenceThicknessTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const IridescenceMaterialExtension_default_ = IridescenceMaterialExtension;
;

/* harmony default export */ const X_ITE_IridescenceMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("IridescenceMaterialExtension", IridescenceMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/SheenMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("SHEEN_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SheenColorTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SheenRoughnessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function SheenMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SheenMaterialExtension);

   this .sheenColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SheenMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      // Preload LUTs.
      this .getBrowser () .getLibraryTexture ("lut_charlie.png");
      this .getBrowser () .getLibraryTexture ("lut_sheen_E.png");

      this ._sheenColor            .addInterest ("set_sheenColor__",            this);
      this ._sheenColorTexture     .addInterest ("set_sheenColorTexture__",     this);
      this ._sheenRoughness        .addInterest ("set_sheenRoughness__",        this);
      this ._sheenRoughnessTexture .addInterest ("set_sheenRoughnessTexture__", this);

      this .set_sheenColor__ ();
      this .set_sheenColorTexture__ ();
      this .set_sheenRoughness__ ();
      this .set_sheenRoughnessTexture__ ();
   },
   set_sheenColor__ ()
   {
      this .sheenColorArray .set (this ._sheenColor .getValue ());
   },
   set_sheenColorTexture__ ()
   {
      this .sheenColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._sheenColorTexture);

      this .setTexture (0, this .sheenColorTextureNode);
   },
   set_sheenRoughness__ ()
   {
      this .sheenRoughness = external_X_ITE_X3D_Algorithm_default().clamp (this ._sheenRoughness .getValue (), 0, 1);
   },
   set_sheenRoughnessTexture__ ()
   {
      this .sheenRoughnessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._sheenRoughnessTexture);

      this .setTexture (1, this .sheenRoughnessTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .SHEEN_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SHEEN_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .sheenColorTextureNode     ?.getShaderOptions (options, "SHEEN_COLOR",     true);
      this .sheenRoughnessTextureNode ?.getShaderOptions (options, "SHEEN_ROUGHNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_SheenColorEXT");
      uniforms .push ("x3d_SheenRoughnessEXT");
      uniforms .push ("x3d_SheenELUTTextureEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_SheenColorEXT,     this .sheenColorArray);
      gl .uniform1f  (shaderObject .x3d_SheenRoughnessEXT, this .sheenRoughness);

      const
         browser              = this .getBrowser (),
         SheenELUTTexture     = browser .getLibraryTexture ("lut_sheen_E.png"),
         SheenELUTTextureUnit = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + SheenELUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, SheenELUTTexture .getTexture ());
      gl .uniform1i (shaderObject .x3d_SheenELUTTextureEXT, SheenELUTTextureUnit);

      if (!+this .getTextureBits ())
         return;

      this .sheenColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SheenColorTextureEXT,
         this ._sheenColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .sheenRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SheenRoughnessTextureEXT,
         this ._sheenRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (SheenMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SheenMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenColor",                   new (external_X_ITE_X3D_Fields_default()).SFColor ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenColorTextureMapping",     new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenColorTexture",            new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenRoughness",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenRoughnessTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sheenRoughnessTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SheenMaterialExtension_default_ = SheenMaterialExtension;
;

/* harmony default export */ const X_ITE_SheenMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("SheenMaterialExtension", SheenMaterialExtension_default_));
;// external "__X_ITE_X3D__ .X3DOneSidedMaterialNode"
const external_X_ITE_X3D_X3DOneSidedMaterialNode_namespaceObject = __X_ITE_X3D__ .X3DOneSidedMaterialNode;
var external_X_ITE_X3D_X3DOneSidedMaterialNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DOneSidedMaterialNode_namespaceObject);
;// ./src/assets/shaders/webgl2/pbr/SpecularGlossiness2.glsl.js


const SpecularGlossiness2_glsl_default_ = () => /* glsl */ `
#pragma X3D include "../common/Fragment.glsl"
#pragma X3D include "../common/Shadow.glsl"
#if defined(X3D_LIGHTING)
uniform x3d_LightSourceParameters x3d_LightSource[X3D_NUM_LIGHTS];
#endif
uniform x3d_PhysicalMaterialParameters x3d_Material;
#pragma X3D include "pbr/BRDF.glsl"
#pragma X3D include "pbr/MaterialInfo.glsl"
#pragma X3D include "pbr/Punctual.glsl"
#pragma X3D include "pbr/IBL.glsl"
${external_X_ITE_X3D_MaterialTextures_default().texture ("x3d_DiffuseTexture", "rgba", "linear")}
vec4 getBaseColor(){float alpha=1.-x3d_Material.transparency;vec4 baseColor=vec4(x3d_Material.diffuseColor,alpha);
#if defined(X3D_COLOR_MATERIAL)
baseColor*=color;
#endif
#if defined(X3D_DIFFUSE_TEXTURE)
baseColor*=getDiffuseTexture();
#elif defined(X3D_TEXTURE)
baseColor=getTextureColor(baseColor,vec4(vec3(1),alpha));
#endif
return baseColor;}
${external_X_ITE_X3D_MaterialTextures_default().texture ("x3d_SpecularGlossinessTexture", "rgba", "linear")}
MaterialInfo getSpecularGlossinessInfo(in MaterialInfo info){vec3 specular=x3d_Material.specularColor;float glossiness=x3d_Material.glossiness;
#if defined(X3D_SPECULAR_GLOSSINESS_TEXTURE)
vec4 sgSample=getSpecularGlossinessTexture();glossiness*=sgSample.a;specular*=sgSample.rgb;
#endif
info.perceptualRoughness=1.-glossiness;info.f0_dielectric=min(specular,vec3(1));return info;}vec4 getMaterialColor(){vec4 baseColor=getBaseColor();
#if defined(X3D_TEXTURE_PROJECTION)
baseColor.rgb*=getTextureProjectorColor();
#endif
vec3 color=vec3(0);vec3 v=normalize(-vertex);
#if defined(X3D_USE_IBL)||defined(X3D_LIGHTING)
NormalInfo normalInfo=getNormalInfo(x3d_Material.normalScale);vec3 n=normalInfo.n;float NdotV=clamp(dot(n,v),0.,1.);
#endif
MaterialInfo materialInfo;materialInfo.baseColor=baseColor.rgb;materialInfo.f90_dielectric=vec3(1);materialInfo.metallic=0.;materialInfo=getSpecularGlossinessInfo(materialInfo);materialInfo.perceptualRoughness=clamp(materialInfo.perceptualRoughness,0.,1.);materialInfo.alphaRoughness=materialInfo.perceptualRoughness*materialInfo.perceptualRoughness;vec3 f_emissive=vec3(0);
#if defined(X3D_USE_IBL)
vec3 f_diffuse=getDiffuseLight(n)*baseColor.rgb;vec3 f_specular_dielectric=getIBLRadianceGGX(n,v,materialInfo.perceptualRoughness);vec3 f_dielectric_fresnel_ibl=getIBLGGXFresnel(n,v,materialInfo.perceptualRoughness,materialInfo.f0_dielectric,1.);vec3 f_dielectric_brdf_ibl=mix(f_diffuse,f_specular_dielectric,f_dielectric_fresnel_ibl);color=f_dielectric_brdf_ibl;
#if defined(X3D_OCCLUSION_TEXTURE)
float ao=getOcclusionFactor();color*=1.+x3d_Material.occlusionStrength*(ao-1.);
#endif
#endif
#if defined(X3D_LIGHTING)
for(int i=0;i<X3D_NUM_LIGHTS;++i){x3d_LightSourceParameters light=x3d_LightSource[i];vec3 pointToLight;float distanceToLight;if(light.type!=x3d_DirectionalLight){pointToLight=light.location-vertex;distanceToLight=length(light.matrix*pointToLight);}else{pointToLight=-light.direction;distanceToLight=-1.;}if(distanceToLight<=light.radius||light.radius<0.){vec3 l=normalize(pointToLight);vec3 h=normalize(l+v);float NdotL=clamp(dot(n,l),0.,1.);float NdotV=clamp(dot(n,v),0.,1.);float NdotH=clamp(dot(n,h),0.,1.);float VdotH=clamp(dot(v,h),0.,1.);vec3 dielectric_fresnel=F_Schlick(materialInfo.f0_dielectric,materialInfo.f90_dielectric,abs(VdotH));vec3 lightIntensity=getLightIntensity(light,l,distanceToLight);vec3 intensity=lightIntensity;
#if defined(X3D_SHADOWS)
lightIntensity=mix(lightIntensity,light.shadowColor,getShadowIntensity(i,light));
#endif
vec3 l_diffuse=lightIntensity*NdotL*BRDF_lambertian(baseColor.rgb);vec3 l_specular_dielectric=intensity*NdotL*BRDF_specularGGX(materialInfo.alphaRoughness,NdotL,NdotV,NdotH);vec3 l_dielectric_brdf=mix(l_diffuse,l_specular_dielectric,dielectric_fresnel);color+=l_dielectric_brdf;}}
#endif
f_emissive=getEmissiveColor();
#if defined(X3D_UNLIT_MATERIAL_EXT)
color=baseColor.rgb;
#elif(defined(X3D_GEOMETRY_0D)||defined(X3D_GEOMETRY_1D))&&!defined(X3D_NORMALS)
color=f_emissive+baseColor.rgb;
#else
color=f_emissive+color;
#endif
return vec4(color,baseColor.a);}void main(){fragment_main();}`
;

/* harmony default export */ const SpecularGlossiness2_glsl = (external_X_ITE_X3D_Namespace_default().add ("SpecularGlossiness2.glsl", SpecularGlossiness2_glsl_default_));
;// ./src/assets/shaders/webgl2/SpecularGlossiness2.fs.js
const SpecularGlossiness2_fs_default_ = () => /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler2D;precision highp sampler3D;precision highp samplerCube;
#pragma X3D include "pbr/SpecularGlossiness.glsl"
`
;

/* harmony default export */ const SpecularGlossiness2_fs = (external_X_ITE_X3D_Namespace_default().add ("SpecularGlossiness2.fs", SpecularGlossiness2_fs_default_));
;// ./src/x_ite/Components/X_ITE/SpecularGlossinessMaterial.js









// Register shaders.





external_X_ITE_X3D_ShaderRegistry_default().addInclude  ("SpecularGlossiness", SpecularGlossiness2_glsl);
external_X_ITE_X3D_ShaderRegistry_default().addFragment ("SpecularGlossiness", SpecularGlossiness2_fs);

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SpecularGlossinessTexture");

/**
 * THIS NODE IS DEPRECIATED SINCE X3D VERSION 4.0.
 */

function SpecularGlossinessMaterial (executionContext)
{
   console .warn ("SpecularGlossinessMaterial is depreciated, please use PhysicalMaterial instead.");

   external_X_ITE_X3D_X3DOneSidedMaterialNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SpecularGlossinessMaterial);

   this .diffuseColorArray  = new Float32Array (3);
   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SpecularGlossinessMaterial .prototype, (external_X_ITE_X3D_X3DOneSidedMaterialNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DOneSidedMaterialNode_default().prototype .initialize .call (this);

      this ._diffuseColor              .addInterest ("set_diffuseColor__",              this);
      this ._diffuseTexture            .addInterest ("set_diffuseTexture__",            this);
      this ._diffuseTexture            .addInterest ("set_transparent__",               this);
      this ._specularColor             .addInterest ("set_specularColor__",             this);
      this ._glossiness                .addInterest ("set_glossiness__",                this);
      this ._specularGlossinessTexture .addInterest ("set_specularGlossinessTexture__", this);
      this ._occlusionStrength         .addInterest ("set_occlusionStrength__",         this);
      this ._occlusionTexture          .addInterest ("set_occlusionTexture__",          this);

      this .set_diffuseColor__ ();
      this .set_diffuseTexture__ ();
      this .set_specularColor__ ();
      this .set_glossiness__ ();
      this .set_specularGlossinessTexture__ ();
      this .set_occlusionStrength__ ();
      this .set_occlusionTexture__ ();
      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return 4;
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         DIFFUSE_TEXTURE: i ++,
         SPECULAR_GLOSSINESS_TEXTURE: i ++,
         EMISSIVE_TEXTURE: i ++,
         OCCLUSION_TEXTURE: i ++,
         NORMAL_TEXTURE: i ++,
      };

      return function ()
      {
         return textureIndices;
      };
   })(),
   getBaseTexture ()
   {
      return this .diffuseTextureNode;
   },
   set_diffuseColor__ ()
   {
      this .diffuseColorArray .set (this ._diffuseColor .getValue ());
   },
   set_diffuseTexture__ ()
   {
      const index = this .getTextureIndices () .DIFFUSE_TEXTURE;

      if (this .diffuseTextureNode)
      {
         this .diffuseTextureNode ._transparent .removeInterest ("set_transparent__",  this);
         this .diffuseTextureNode ._linear      .removeInterest (`setTexture${index}`, this);
      }

      this .diffuseTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._diffuseTexture);

      if (this .diffuseTextureNode)
      {
         this .diffuseTextureNode ._transparent .addInterest ("set_transparent__",  this);
         this .diffuseTextureNode ._linear      .addInterest (`setTexture${index}`, this, index, this .diffuseTextureNode);
      }

      this .setTexture (index, this .diffuseTextureNode);
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_glossiness__ ()
   {
      this .glossiness = external_X_ITE_X3D_Algorithm_default().clamp (this ._glossiness .getValue (), 0, 1);
   },
   set_specularGlossinessTexture__ ()
   {
      this .specularGlossinessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._specularGlossinessTexture);

      this .setTexture (this .getTextureIndices () .SPECULAR_GLOSSINESS_TEXTURE, this .specularGlossinessTextureNode);
   },
   set_occlusionStrength__ ()
   {
      this .occlusionStrength = external_X_ITE_X3D_Algorithm_default().clamp (this ._occlusionStrength .getValue (), 0, 1);
   },
   set_occlusionTexture__ ()
   {
      this .occlusionTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._occlusionTexture);

      this .setTexture (this .getTextureIndices () .OCCLUSION_TEXTURE, this .occlusionTextureNode);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = this .getShaderOptions (geometryContext, renderContext);

      options .push ("X3D_PHYSICAL_MATERIAL", "X3D_MATERIAL_SPECULAR_GLOSSINESS");

      if (+this .getTextureBits ())
      {
         this .diffuseTextureNode            ?.getShaderOptions (options, "DIFFUSE");
         this .specularGlossinessTextureNode ?.getShaderOptions (options, "SPECULAR_GLOSSINESS");
         this .occlusionTextureNode          ?.getShaderOptions (options, "OCCLUSION");
      }

      const shaderNode = browser .createShader ("SpecularGlossiness", "Default", "SpecularGlossiness", options);

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      external_X_ITE_X3D_X3DOneSidedMaterialNode_default().prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

      gl .uniform3fv (shaderObject .x3d_DiffuseColor,  this .diffuseColorArray);
      gl .uniform3fv (shaderObject .x3d_SpecularColor, this .specularColorArray);
      gl .uniform1f  (shaderObject .x3d_Glossiness,    this .glossiness);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTexture,
         this ._diffuseTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularGlossinessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SpecularGlossinessTexture,
         this ._specularGlossinessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .occlusionTextureNode)
      {
         gl .uniform1f (shaderObject .x3d_OcclusionStrength, this .occlusionStrength);

         this .occlusionTextureNode .setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_OcclusionTexture,
            this ._occlusionTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      }
   },
});

Object .defineProperties (SpecularGlossinessMaterial,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SpecularGlossinessMaterial", "X_ITE", 1, "material", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseColor",                     new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTextureMapping",            new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseTexture",                   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularColor",                    new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "glossiness",                       new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularGlossinessTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularGlossinessTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "emissiveColor",                    new (external_X_ITE_X3D_Fields_default()).SFColor ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "emissiveTextureMapping",           new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "emissiveTexture",                  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "occlusionStrength",                new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "occlusionTextureMapping",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "occlusionTexture",                 new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "normalScale",                      new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "normalTextureMapping",             new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "normalTexture",                    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transparency",                     new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (SpecularGlossinessMaterial .prototype .getTextureIndices ()))
{
   SpecularGlossinessMaterial .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

const SpecularGlossinessMaterial_default_ = SpecularGlossinessMaterial;
;

/* harmony default export */ const X_ITE_SpecularGlossinessMaterial = (external_X_ITE_X3D_Namespace_default().add ("SpecularGlossinessMaterial", SpecularGlossinessMaterial_default_));
;// ./src/x_ite/Components/X_ITE/SpecularMaterialExtension.js









// Register key.

X_ITE_ExtensionKeys .add ("SPECULAR_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SpecularTextureEXT");
external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SpecularColorTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function SpecularMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SpecularMaterialExtension);

   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SpecularMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._specular             .addInterest ("set_specular__",             this);
      this ._specularTexture      .addInterest ("set_specularTexture__",      this);
      this ._specularColor        .addInterest ("set_specularColor__",        this);
      this ._specularColorTexture .addInterest ("set_specularColorTexture__", this);

      this .set_specular__ ();
      this .set_specularTexture__ ();
      this .set_specularColor__ ();
      this .set_specularColorTexture__ ();
   },
   set_specular__ ()
   {
      this .specular = Math .max (this ._specular .getValue (), 0);
   },
   set_specularTexture__ ()
   {
      this .specularTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._specularTexture);

      this .setTexture (0, this .specularTextureNode);
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_specularColorTexture__ ()
   {
      this .specularColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._specularColorTexture);

      this .setTexture (1, this .specularColorTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .SPECULAR_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SPECULAR_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .specularTextureNode      ?.getShaderOptions (options, "SPECULAR",       true);
      this .specularColorTextureNode ?.getShaderOptions (options, "SPECULAR_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_SpecularEXT");
      uniforms .push ("x3d_SpecularColorEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_SpecularEXT,      this .specular);
      gl .uniform3fv (shaderObject .x3d_SpecularColorEXT, this .specularColorArray);

      if (!+this .getTextureBits ())
         return;

      this .specularTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SpecularTextureEXT,
         this ._specularTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SpecularColorTextureEXT,
         this ._specularColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (SpecularMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SpecularMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specular",                    new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularTextureMapping",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularTexture",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularColor",               new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularColorTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularColorTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SpecularMaterialExtension_default_ = SpecularMaterialExtension;
;

/* harmony default export */ const X_ITE_SpecularMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("SpecularMaterialExtension", SpecularMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/TransmissionMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("TRANSMISSION_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_TransmissionTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function TransmissionMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).TransmissionMaterialExtension);
}

Object .assign (Object .setPrototypeOf (TransmissionMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._transmission        .addInterest ("set_transmission__",        this);
      this ._transmissionTexture .addInterest ("set_transmissionTexture__", this);

      this .set_transmission__ ();
      this .set_transmissionTexture__ ();
   },
   set_transmission__ ()
   {
      this .transmission = external_X_ITE_X3D_Algorithm_default().clamp (this ._transmission .getValue (), 0, 1);
   },
   set_transmissionTexture__ ()
   {
      this .transmissionTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._transmissionTexture);

      this .setTexture (0, this .transmissionTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .TRANSMISSION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_TRANSMISSION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .transmissionTextureNode ?.getShaderOptions (options, "TRANSMISSION", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_TransmissionEXT");
      uniforms .push ("x3d_TransmissionSamplerEXT");
   },
   setShaderUniforms: (() =>
   {
      const zeros = new Float32Array (16);

      return function (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
      {
         const browser = this .getBrowser ();

         gl .uniform1f (shaderObject .x3d_TransmissionEXT, this .transmission);

         // Transmission framebuffer texture

         if (renderObject .isTransmission ())
         {
            var
               transmissionUnit          = browser .getTextureUnit (),
               transmissionBufferTexture = browser .getDefaultTexture2D ();

            // Hide object by using a model view matrix with zeros.
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
         }
         else
         {
            var
               transmissionBuffer        = browser .getTransmissionBuffer (),
               transmissionUnit          = browser .getTextureUnit (),
               transmissionBufferTexture = transmissionBuffer .getColorTexture ();
         }

         gl .activeTexture (gl .TEXTURE0 + transmissionUnit);
         gl .bindTexture (gl .TEXTURE_2D, transmissionBufferTexture);
         gl .uniform1i (shaderObject .x3d_TransmissionSamplerEXT, transmissionUnit);

         if (!+this .getTextureBits ())
            return;

         this .transmissionTextureNode ?.setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_TransmissionTextureEXT,
            this ._transmissionTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      };
   })(),
});

Object .defineProperties (TransmissionMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("TransmissionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transmission",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transmissionTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transmissionTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const TransmissionMaterialExtension_default_ = TransmissionMaterialExtension;
;

/* harmony default export */ const X_ITE_TransmissionMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("TransmissionMaterialExtension", TransmissionMaterialExtension_default_));
;// ./src/x_ite/Components/X_ITE/VolumeMaterialExtension.js









// Register key.

X_ITE_ExtensionKeys .add ("VOLUME_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_ThicknessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function VolumeMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).VolumeMaterialExtension);

   // Units

   this ._thickness           .setUnit ("length");
   this ._attenuationDistance .setUnit ("length");

   // Private properties

   this .attenuationColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (VolumeMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._thickness           .addInterest ("set_thickness__",           this);
      this ._thicknessTexture    .addInterest ("set_thicknessTexture__",    this);
      this ._attenuationDistance .addInterest ("set_attenuationDistance__", this);
      this ._attenuationColor    .addInterest ("set_attenuationColor__",    this);

      this .set_thickness__ ();
      this .set_thicknessTexture__ ();
      this .set_attenuationDistance__ ();
      this .set_attenuationColor__ ();
   },
   set_thickness__ ()
   {
      this .thickness = Math .max (this ._thickness .getValue (), 0);
   },
   set_thicknessTexture__ ()
   {
      this .thicknessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._thicknessTexture);

      this .setTexture (0, this .thicknessTextureNode);
   },
   set_attenuationDistance__ ()
   {
      this .attenuationDistance = Math .max (this ._attenuationDistance .getValue (), 0);
   },
   set_attenuationColor__ ()
   {
      this .attenuationColorArray .set (this ._attenuationColor .getValue ());
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .VOLUME_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_VOLUME_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .thicknessTextureNode ?.getShaderOptions (options, "THICKNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ThicknessEXT");
      uniforms .push ("x3d_AttenuationDistanceEXT");
      uniforms .push ("x3d_AttenuationColorEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_ThicknessEXT,           this .thickness);
      gl .uniform1f  (shaderObject .x3d_AttenuationDistanceEXT, this .attenuationDistance);
      gl .uniform3fv (shaderObject .x3d_AttenuationColorEXT,    this .attenuationColorArray);

      if (!+this .getTextureBits ())
         return;

      this .thicknessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ThicknessTextureEXT,
         this ._thicknessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (VolumeMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("VolumeMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "thickness",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "thicknessTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "thicknessTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "attenuationDistance",     new (external_X_ITE_X3D_Fields_default()).SFFloat (1_000_000)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "attenuationColor",        new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
      ]),
      enumerable: true,
   },
});

const VolumeMaterialExtension_default_ = VolumeMaterialExtension;
;

/* harmony default export */ const X_ITE_VolumeMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("VolumeMaterialExtension", VolumeMaterialExtension_default_));
;// ./src/assets/components/X_ITEComponent.js


















external_X_ITE_X3D_Components_default().add ({
   name: "X_ITE",
   concreteNodes:
   [
      X_ITE_AnisotropyMaterialExtension,
      X_ITE_BlendMode,
      X_ITE_ClearcoatMaterialExtension,
      X_ITE_DepthMode,
      X_ITE_DiffuseTransmissionMaterialExtension,
      X_ITE_DispersionMaterialExtension,
      X_ITE_EmissiveStrengthMaterialExtension,
      X_ITE_InstancedShape,
      X_ITE_IORMaterialExtension,
      X_ITE_IridescenceMaterialExtension,
      X_ITE_SheenMaterialExtension,
      X_ITE_SpecularGlossinessMaterial,
      X_ITE_SpecularMaterialExtension,
      X_ITE_TransmissionMaterialExtension,
      X_ITE_VolumeMaterialExtension,
   ],
   abstractNodes:
   [
      X_ITE_X3DMaterialExtensionNode,
   ],
});

const X_ITEComponent_default_ = undefined;
;

/* harmony default export */ const X_ITEComponent = (external_X_ITE_X3D_Namespace_default().add ("X_ITEComponent", X_ITEComponent_default_));
/******/ })()
;