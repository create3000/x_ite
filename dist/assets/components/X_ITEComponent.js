/* X_ITE v15.1.3 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D")];
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
;// external "__X_ITE_X3D__ .TextureBuffer"
const external_X_ITE_X3D_TextureBuffer_namespaceObject = __X_ITE_X3D__ .TextureBuffer;
var external_X_ITE_X3D_TextureBuffer_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextureBuffer_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Browser/X_ITE/X3DX_ITEContext.js


const
   _transmissionBuffer  = Symbol (),
   _volumeScatterBuffer = Symbol ();

function X3DX_ITEContext () { }

Object .assign (X3DX_ITEContext .prototype,
{
   initialize ()
   {
      this .addTextureBuffer (_transmissionBuffer);
      this .addTextureBuffer (_volumeScatterBuffer);
   },
   getTransmissionBuffer ()
   {
      return this [_transmissionBuffer] ??= new (external_X_ITE_X3D_TextureBuffer_default()) ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
         mipMaps: true,
      });
   },
   getVolumeScatterBuffer ()
   {
      return this [_volumeScatterBuffer] ??= new (external_X_ITE_X3D_TextureBuffer_default()) ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
         float: true,
      });
   },
});

const __default__ = X3DX_ITEContext;
;

/* harmony default export */ const X_ITE_X3DX_ITEContext = (external_X_ITE_X3D_Namespace_default().add ("X3DX_ITEContext", __default__));
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
;// ./src/x_ite/Components/X_ITE/X3DMaterialExtensionNode.js





function X3DMaterialExtensionNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DMaterialExtensionNode);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "renderedTextures", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   // Private properties

   this .textureBits  = new (external_X_ITE_X3D_BitSet_default()) ();
   this .textureNodes = [ ];
}

Object .assign (Object .setPrototypeOf (X3DMaterialExtensionNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   addTexture (index, textureNode)
   {
      // Collect textures.

      this .textureNodes [index] = textureNode;

      this ._renderedTextures = this .getBrowser () .getCurrentTime ();

      // Set texture bits.

      index *= 4;

      this .textureBits .remove (index, 0xf);
      this .textureBits .add (index, textureNode ?.getTextureBits () ?? 0);
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
   getRenderedTextures (renderedTextures)
   {
      for (const textureNode of this .textureNodes)
         textureNode ?.getRenderedTextures (renderedTextures);
   },
});

Object .defineProperties (X3DMaterialExtensionNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DMaterialExtensionNode", "X_ITE", 1));

const X3DMaterialExtensionNode_default_ = X3DMaterialExtensionNode;
;

/* harmony default export */ const X_ITE_X3DMaterialExtensionNode = (external_X_ITE_X3D_Namespace_default().add ("X3DMaterialExtensionNode", X3DMaterialExtensionNode_default_));
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
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
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
      this .anisotropyArray [2] = external_X_ITE_X3D_Algorithm_default().clamp (this ._anisotropyStrength .getValue (), 0, 1);
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

      this .addTexture (0, this .anisotropyTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_AnisotropyEXT, this .anisotropyArray);

      this .anisotropyTextureNode ?.setNamedShaderUniforms (gl,
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

   // Private properties

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
      this .equationTypes .set ("MIN",                   gl .MIN ?? ext ?.MIN_EXT);
      this .equationTypes .set ("MAX",                   gl .MAX ?? ext ?.MAX_EXT);

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
         ?? this .factorTypes .get ("ONE_MINUS_SRC_ALPHA");
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
      this .clearcoat = external_X_ITE_X3D_Algorithm_default().clamp (this ._clearcoat .getValue (), 0, 1);
   },
   set_clearcoatTexture__ ()
   {
      this .clearcoatTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatTexture);

      this .addTexture (0, this .clearcoatTextureNode);
   },
   set_clearcoatRoughness__ ()
   {
      this .clearcoatRoughness = external_X_ITE_X3D_Algorithm_default().clamp (this ._clearcoatRoughness .getValue (), 0, 1);
   },
   set_clearcoatRoughnessTexture__ ()
   {
      this .clearcoatRoughnessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatRoughnessTexture);

      this .addTexture (1, this .clearcoatRoughnessTextureNode);
   },
   set_clearcoatNormalTexture__ ()
   {
      this .clearcoatNormalTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._clearcoatNormalTexture);

      this .addTexture (2, this .clearcoatNormalTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_ClearcoatEXT,          this .clearcoat);
      gl .uniform1f (shaderObject .x3d_ClearcoatRoughnessEXT, this .clearcoatRoughness);

      if (!+this .getTextureBits ())
         return;

      this .clearcoatTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_ClearcoatTextureEXT,
         this ._clearcoatTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_ClearcoatRoughnessTextureEXT,
         this ._clearcoatRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatNormalTextureNode ?.setNamedShaderUniforms (gl,
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

      this .addTexture (0, this .diffuseTransmissionTextureNode);
   },
   set_diffuseTransmissionColor__ ()
   {
      this .diffuseTransmissionColorArray .set (this ._diffuseTransmissionColor .getValue ());
   },
   set_diffuseTransmissionColorTexture__ ()
   {
      this .diffuseTransmissionColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._diffuseTransmissionColorTexture);

      this .addTexture (1, this .diffuseTransmissionColorTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_DiffuseTransmissionEXT,      this .diffuseTransmission);
      gl .uniform3fv (shaderObject .x3d_DiffuseTransmissionColorEXT, this .diffuseTransmissionColorArray);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTransmissionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_DiffuseTransmissionTextureEXT,
         this ._diffuseTransmissionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .diffuseTransmissionColorTextureNode ?.setNamedShaderUniforms (gl,
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
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
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
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
;// ./src/x_ite/Browser/X_ITE/GaussianSplats.vs.js

// https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/59f5f77e3ddbac3ed9db93ec2cfe99ed6c5d121d/cuda_rasterizer/forward.cu
// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/vertexShaderSource.glsl

const vs = () => /* glsl */ `#version 300 es
precision highp int;precision highp float;precision highp sampler2D;precision highp sampler2DArray;uniform ivec4 x3d_Viewport;uniform mat4 x3d_ProjectionMatrix;uniform mat4 x3d_ModelViewMatrix;
#if defined(X3D_XR_SESSION)
uniform mat4 x3d_EyeMatrix;
#endif
uniform vec2 x3d_FocalLength;uniform sampler2D x3d_PositionsTexture;uniform sampler2D x3d_OrientationsTexture;uniform sampler2D x3d_ScalesTexture;uniform mediump sampler2D x3d_OpacitiesTexture;
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
#if!defined(X3D_POINTING_PASS)&&!defined(X3D_DEPTH_PASS)
color=vec4(computeColorFromSH(texelCoord,splatCenter),opacity);
#else
color=vec4(vec3(0),opacity);
#endif
#if defined(X3D_FOG)&&defined(X3D_FOG_COORDS)
fog();
#endif
}`

const GaussianSplats_vs_default_ = vs;
;

/* harmony default export */ const GaussianSplats_vs = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplats.vs", GaussianSplats_vs_default_));
;// ./src/x_ite/Browser/X_ITE/GaussianSplats.fs.js

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
;// ./src/x_ite/Browser/X_ITE/GaussianSplatsShape.js













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

      this .degrees = SH_COEFS .map ((coefs, degree) =>
      {
         // Spherical harmonic degrees MUST NOT be partially defined, that is, either all
         // coefficients for a given degree and all lower degrees MUST be defined or none.
         const filled = Array .from ({ length: coefs }, (_, coef) => this .node .getField (`sphericalHarmonicsDegree${degree}Coef${coef}`) .length) .every (length => length);

         return filled ? 1 : 0;
      });

      key += this .degrees .join ("");

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
            opacities          = new Float32Array (textureSize),
            sphericalHarmonics = new Float32Array (textureSize * 3 * 16);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         // Degree 0,1,2,3

         let offset = 0;

         for (const [degree, coefs] of SH_COEFS .entries ())
         {
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
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureWidth, textureWidth, 0, gl .RGBA, gl .FLOAT, orientations);

         gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, scales);

         gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .R16F, textureWidth, textureWidth, 0, gl .RED, gl .FLOAT, opacities);

         gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);
         gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGB16F, textureWidth, textureWidth, 16, 0, gl .RGB, gl .FLOAT, sphericalHarmonics);
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

      for (const [degree, filled] of this .degrees .entries ())
      {
         if (!filled)
            break;

         options .push (`X3D_GAUSSIAN_SPLATTING_DEGREE_${degree}`);
      }

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
   sortIndices (viewMatrix)
   {
      this .currentModelViewMatrix .set (viewMatrix);

      if (this .sortPending)
         return;

      if (external_X_ITE_X3D_Matrix4_default().prototype .equals .call (this .currentModelViewMatrix, this .sortModelViewMatrix))
         return;

      this .sortModelViewMatrix .set (viewMatrix);

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

/* harmony default export */ const X_ITE_GaussianSplatsShape = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplatsShape", GaussianSplatsShape_default_));
;// ./src/x_ite/Components/X_ITE/GaussianSplats.js









/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function GaussianSplats (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GaussianSplats);

   // Units

   this ._positions .setUnit ("length");

   // Private Properties

   this .shapeNode = new X_ITE_GaussianSplatsShape (executionContext, this);
}

Object .assign (Object .setPrototypeOf (GaussianSplats .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);

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
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GaussianSplats,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GaussianSplats", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",                       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "colorSpace",                     new (external_X_ITE_X3D_Fields_default()).SFString ("SRGB_REC709_DISPLAY")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "positions",                      new (external_X_ITE_X3D_Fields_default()).MFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "orientations",                   new (external_X_ITE_X3D_Fields_default()).MFVec4f ()),
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

/* harmony default export */ const X_ITE_GaussianSplats = (external_X_ITE_X3D_Namespace_default().add ("GaussianSplats", GaussianSplats_default_));
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
      const subBBox = new (external_X_ITE_X3D_Box3_default()) ();

      return function ()
      {
         const bbox = this .bbox;

         if (this .isDefaultBBoxSize ())
         {
            if (this .getGeometry ())
            {
               bbox .set ();

               const geometryBBox = this .getGeometry () .getBBox ();

               for (const matrix of this .matrices)
                  bbox .add (subBBox .assign (geometryBBox) .multRight (matrix));
            }
            else
            {
               bbox .set ();
            }
         }
         else
         {
            bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
         }

         this .getBBoxSize ()   .assign (bbox .size);
         this .getBBoxCenter () .assign (bbox .center);
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
         length               = stride * numInstances,
         data                 = new Float32Array (length);

      this .numInstances = numInstances;

      for (let i = 0, o = 0; i < numInstances; ++ i, o += stride)
      {
         const matrix = this .matrices [i] ??= new (external_X_ITE_X3D_Matrix4_default()) ();

         matrix .setTransform (translations      [Math .min (i, numTranslations      - 1)] ?.getValue (),
                               rotations         [Math .min (i, numRotations         - 1)] ?.getValue (),
                               scales            [Math .min (i, numScales            - 1)] ?.getValue (),
                               scaleOrientations [Math .min (i, numScaleOrientations - 1)] ?.getValue (),
                               centers           [Math .min (i, numCenters           - 1)] ?.getValue ());

         data .set (matrix, o);
         data .set (matrix .submatrix .transpose () .inverse (), o + 16);
      }

      this .matrices .length = numInstances;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .instances);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      this .set_bbox__ ();
      this .set_objects__ ();
   },
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
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
;// ./src/assets/shaders/webgl2/pbr/Iridescence2.glsl.js
const Iridescence2_glsl_default_ = () => /* glsl */ `
#if defined(X3D_IRIDESCENCE_MATERIAL_EXT)
const mat3 XYZ_TO_REC709=mat3(3.2404542,-.9692660,.0556434,-1.5371385,1.8760108,-.2040259,-.4985314,.0415560,1.0572252);float sq(const in float v){return v*v;}vec3 sq(const in vec3 v){return v*v;}vec3 Fresnel0ToIor(const in vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1)+sqrtF0)/(vec3(1)-sqrtF0);}vec3 IorToFresnel0(const in vec3 transmittedIor,const in float incidentIor){return sq((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(const in float transmittedIor,const in float incidentIor){return sq((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(const in float OPD,const in vec3 shift){const vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);const vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);const vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);float phase=2.*M_PI*OPD*1.0e-9;vec3 xyz=val*sqrt(2.*M_PI*var)*cos(pos*phase+shift)*exp(-sq(phase)*var);xyz.x+=9.7470e-14*sqrt(2.*M_PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*sq(phase));xyz/=1.0685e-7;vec3 srgb=XYZ_TO_REC709*xyz;return srgb;}vec3 evalIridescence(const in float outsideIOR,const in float eta2,const in float cosTheta1,const in float thinFilmThickness,const in vec3 baseF0){vec3 I;float iridescenceIor=mix(outsideIOR,eta2,smoothstep(0.,.03,thinFilmThickness));float sinTheta2Sq=sq(outsideIOR/iridescenceIor)*(1.-sq(cosTheta1));float cosTheta2Sq=1.-sinTheta2Sq;if(cosTheta2Sq<0.)return vec3(1);float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIor,outsideIOR);float R12=F_Schlick(R0,cosTheta1);float R21=R12;float T121=1.-R12;float phi12=0.;if(iridescenceIor<outsideIOR)phi12=M_PI;float phi21=M_PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.,.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIor);vec3 R23=F_Schlick(R1,cosTheta2);vec3 phi23=vec3(0);if(baseIOR[0]<iridescenceIor)phi23[0]=M_PI;if(baseIOR[1]<iridescenceIor)phi23[1]=M_PI;if(baseIOR[2]<iridescenceIor)phi23[2]=M_PI;float OPD=2.*iridescenceIor*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,.9999);vec3 r123=sqrt(R123);vec3 Rs=sq(T121)*R23/(vec3(1)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0));}
#endif
`
;

/* harmony default export */ const Iridescence2_glsl = (external_X_ITE_X3D_Namespace_default().add ("Iridescence2.glsl", Iridescence2_glsl_default_));
;// ./src/x_ite/Components/X_ITE/IridescenceMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("IRIDESCENCE_MATERIAL_EXTENSION");

// Register shaders.




external_X_ITE_X3D_ShaderRegistry_default().addIncludeFile ("Iridescence", Iridescence2_glsl);

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
      this .iridescence = external_X_ITE_X3D_Algorithm_default().clamp (this ._iridescence .getValue (), 0, 1);
   },
   set_iridescenceTexture__ ()
   {
      this .iridescenceTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._iridescenceTexture);

      this .addTexture (0, this .iridescenceTextureNode);
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

      this .addTexture (1, this .iridescenceThicknessTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_IridescenceEXT,                  this .iridescence);
      gl .uniform1f (shaderObject .x3d_IridescenceIndexOfRefractionEXT, this .iridescenceIndexOfRefraction);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMinimumEXT,  this .iridescenceThicknessMinimum);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMaximumEXT,  this .iridescenceThicknessMaximum);

      if (!+this .getTextureBits ())
         return;

      this .iridescenceTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_IridescenceTextureEXT,
         this ._iridescenceTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .iridescenceThicknessTextureNode ?.setNamedShaderUniforms (gl,
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

      this .addTexture (0, this .sheenColorTextureNode);
   },
   set_sheenRoughness__ ()
   {
      this .sheenRoughness = external_X_ITE_X3D_Algorithm_default().clamp (this ._sheenRoughness .getValue (), 0, 1);
   },
   set_sheenRoughnessTexture__ ()
   {
      this .sheenRoughnessTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._sheenRoughnessTexture);

      this .addTexture (1, this .sheenRoughnessTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_SheenColorEXT,     this .sheenColorArray);
      gl .uniform1f  (shaderObject .x3d_SheenRoughnessEXT, this .sheenRoughness);

      const
         browser              = this .getBrowser (),
         sheenELUTTexture     = browser .getLibraryTexture ("lut_sheen_E.png"),
         sheenELUTTextureUnit = browser .popTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + sheenELUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, sheenELUTTexture .getTexture ());
      gl .uniform1i (shaderObject .x3d_SheenELUTTextureEXT, sheenELUTTextureUnit);

      if (!+this .getTextureBits ())
         return;

      this .sheenColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SheenColorTextureEXT,
         this ._sheenColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .sheenRoughnessTextureNode ?.setNamedShaderUniforms (gl,
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
#include<Fragment>
#include<Shadow>
#if defined(X3D_LIGHTING)
uniform x3d_LightSourceParameters x3d_LightSource[X3D_NUM_LIGHTS];
#endif
uniform x3d_PhysicalMaterialParameters x3d_Material;
#include<BRDF>
#include<MaterialInfo>
#include<Punctual>
#include<IBL>
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
info.perceptualRoughness=1.-glossiness;info.f0_dielectric=min(specular,vec3(1));return info;}vec4 getMaterialColor(const in vec4 fragCoord){vec4 baseColor=getBaseColor();
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
return vec4(color,baseColor.a);}`
;

/* harmony default export */ const SpecularGlossiness2_glsl = (external_X_ITE_X3D_Namespace_default().add ("SpecularGlossiness2.glsl", SpecularGlossiness2_glsl_default_));
;// ./src/assets/shaders/webgl2/SpecularGlossiness2.fs.js
const SpecularGlossiness2_fs_default_ = () => /* glsl */ `#version 300 es
precision highp int;precision highp float;precision highp sampler2D;precision highp sampler3D;precision highp samplerCube;
#include<SpecularGlossiness>
`
;

/* harmony default export */ const SpecularGlossiness2_fs = (external_X_ITE_X3D_Namespace_default().add ("SpecularGlossiness2.fs", SpecularGlossiness2_fs_default_));
;// ./src/x_ite/Components/X_ITE/SpecularGlossinessMaterial.js









// Register shaders.





external_X_ITE_X3D_ShaderRegistry_default().addIncludeFile    ("SpecularGlossiness", SpecularGlossiness2_glsl);
external_X_ITE_X3D_ShaderRegistry_default().addFragmentShader ("SpecularGlossiness", SpecularGlossiness2_fs);

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_SpecularGlossinessTexture");

/**
 * THIS NODE IS DEPRECIATED SINCE X3D VERSION 4.0.
 */

function SpecularGlossinessMaterial (executionContext)
{
   console .warn ("SpecularGlossinessMaterial is deprecated, please use PhysicalMaterial instead.");

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
   isPhysical ()
   {
      return true;
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
         this .diffuseTextureNode ._transparent .removeInterest ("set_transparent__", this);
         this .diffuseTextureNode ._linear      .removeInterest ("addTexture",        this);
      }

      this .diffuseTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._diffuseTexture);

      if (this .diffuseTextureNode)
      {
         this .diffuseTextureNode ._transparent .addInterest ("set_transparent__", this);
         this .diffuseTextureNode ._linear      .addInterest ("addTexture",        this, index, this .diffuseTextureNode);
      }

      this .addTexture (index, this .diffuseTextureNode);
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

      this .addTexture (this .getTextureIndices () .SPECULAR_GLOSSINESS_TEXTURE, this .specularGlossinessTextureNode);
   },
   set_occlusionStrength__ ()
   {
      this .occlusionStrength = external_X_ITE_X3D_Algorithm_default().clamp (this ._occlusionStrength .getValue (), 0, 1);
   },
   set_occlusionTexture__ ()
   {
      this .occlusionTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._occlusionTexture);

      this .addTexture (this .getTextureIndices () .OCCLUSION_TEXTURE, this .occlusionTextureNode);
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

      const shaderNode = browser .createShader ({
         name: "SpecularGlossiness",
         vertexShader: "Default",
         fragmentShader: "SpecularGlossiness",
         options,
      });

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      external_X_ITE_X3D_X3DOneSidedMaterialNode_default().prototype .setShaderUniforms .call (this, gl, shaderObject, textureTransformMapping, textureCoordinateMapping);

      gl .uniform3fv (shaderObject .x3d_DiffuseColor,  this .diffuseColorArray);
      gl .uniform3fv (shaderObject .x3d_SpecularColor, this .specularColorArray);
      gl .uniform1f  (shaderObject .x3d_Glossiness,    this .glossiness);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_DiffuseTexture,
         this ._diffuseTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularGlossinessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SpecularGlossinessTexture,
         this ._specularGlossinessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .occlusionTextureNode)
      {
         gl .uniform1f (shaderObject .x3d_OcclusionStrength, this .occlusionStrength);

         this .occlusionTextureNode .setNamedShaderUniforms (gl,
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
      this ._specularStrength     .addInterest ("set_specularStrength__",     this);
      this ._specularColorTexture .addInterest ("set_specularColorTexture__", this);

      this .set_specular__ ();
      this .set_specularTexture__ ();
      this .set_specularColor__ ();
      this .set_specularStrength__ ();
      this .set_specularColorTexture__ ();
   },
   set_specular__ ()
   {
      this .specular = external_X_ITE_X3D_Algorithm_default().clamp (this ._specular .getValue (), 0, 1);
   },
   set_specularTexture__ ()
   {
      this .specularTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._specularTexture);

      this .addTexture (0, this .specularTextureNode);
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_specularStrength__ ()
   {
      this .specularStrength = Math .max (this ._specularStrength .getValue (), 0);
   },
   set_specularColorTexture__ ()
   {
      this .specularColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._specularColorTexture);

      this .addTexture (1, this .specularColorTextureNode);
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
      uniforms .push ("x3d_SpecularStrengthEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_SpecularEXT,         this .specular);
      gl .uniform3fv (shaderObject .x3d_SpecularColorEXT,    this .specularColorArray);
      gl .uniform1f  (shaderObject .x3d_SpecularStrengthEXT, this .specularStrength);

      if (!+this .getTextureBits ())
         return;

      this .specularTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SpecularTextureEXT,
         this ._specularTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularColorTextureNode ?.setNamedShaderUniforms (gl,
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
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularStrength",            new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
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

      this .addTexture (0, this .transmissionTextureNode);
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      // These shapes must not be rendered during transmission pass!

      const
         browser                   = this .getBrowser (),
         transmissionBuffer        = browser .getTransmissionBuffer (),
         transmissionUnit          = browser .popTextureUnit (),
         transmissionBufferTexture = transmissionBuffer .getColorTexture ();

      gl .uniform1f (shaderObject .x3d_TransmissionEXT, this .transmission);

      gl .activeTexture (gl .TEXTURE0 + transmissionUnit);
      gl .bindTexture (gl .TEXTURE_2D, transmissionBufferTexture);
      gl .uniform1i (shaderObject .x3d_TransmissionSamplerEXT, transmissionUnit);

      this .transmissionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_TransmissionTextureEXT,
         this ._transmissionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
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

      this .addTexture (0, this .thicknessTextureNode);
   },
   set_attenuationDistance__ ()
   {
      const attenuationDistance = this ._attenuationDistance .getValue ();

      this .attenuationDistance = attenuationDistance ? Math .max (attenuationDistance, 0) : 1_000_000;
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
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_ThicknessEXT,           this .thickness);
      gl .uniform1f  (shaderObject .x3d_AttenuationDistanceEXT, this .attenuationDistance);
      gl .uniform3fv (shaderObject .x3d_AttenuationColorEXT,    this .attenuationColorArray);

      this .thicknessTextureNode ?.setNamedShaderUniforms (gl,
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
;// ./src/x_ite/Browser/X_ITE/ScatterSamples.js
class ScatterSamples
{
   static SCATTER_SAMPLES_COUNT = 55; // Number of samples for the Burley diffusion profile.

   static
   {
      const [scatterSamples, minRadius] = this .#computeScatterSamples ();

      this .SCATTER_SAMPLES    = scatterSamples;
      this .SCATTER_MIN_RADIUS = minRadius;
   }

   /**
    * Using blender implementation of Burley diffusion profile.
    */
   static #computeScatterSamples ()
   {
      // Precompute sample position with white albedo.
      const d = this .#burleySetup (1, 1);

      const randU = 0.5; // Random value between 0 and 1, fixed here for determinism.
      const randV = 0.5;

      // Find minimum radius that we can represent because we are only sampling the largest radius.
      let min_radius = 1;

      const goldenAngle  = Math .PI * (3 - Math .sqrt (5));
      const uniformArray = [ ];

      for (let i = 0; i < this .SCATTER_SAMPLES_COUNT; ++ i)
      {
         const theta = goldenAngle * i + Math .PI * 2 * randU;
         const x     = (randV + i) / this .SCATTER_SAMPLES_COUNT;
         const r     = this .#burleySample (d, x);

         min_radius = Math .min (min_radius, r);

         uniformArray .push (theta, r, 1 / this .#burleyPdf (d, r));
      }

      // Avoid float imprecision.
      min_radius = Math .max (min_radius, 0.00001);

      return [new Float32Array (uniformArray), min_radius];
   }

   static #burleySample (d, xRand)
   {
      xRand *= 0.9963790093708328;

      const tolerance         = 1e-6;
      const maxIterationCount = 10;

      let r;

      if (xRand <= 0.9)
         r = Math .exp (xRand * xRand * 2.4) - 1;
      else
         r = 15;

      // Solve against scaled radius.
      for (let i = 0; i < maxIterationCount; ++ i)
      {
         const exp_r_3 = Math .exp (-r / 3);
         const exp_r   = exp_r_3 * exp_r_3 * exp_r_3;
         const f       = 1 - 0.25 * exp_r - 0.75 * exp_r_3 - xRand;
         const f_      = 0.25 * exp_r + 0.25 * exp_r_3;

         if (Math .abs (f) < tolerance || f_ === 0)
            break;

         r = r - f / f_;
         r = Math .max (r, 0);
      }

      return r * d;
   }

   static #burleyEval (d, r)
   {
      if (r >= 16 * d)
         return 0;

      const exp_r_3_d = Math .exp (-r / (3 * d));
      const exp_r_d   = exp_r_3_d * exp_r_3_d * exp_r_3_d;

      return (exp_r_d + exp_r_3_d) / (8 * Math .PI * d);
   }

   static #burleyPdf (d, r)
   {
      return this .#burleyEval (d, r) / 0.9963790093708328;
   }

   static #burleySetup (radius, albedo)
   {
      const m_1_pi = 0.318309886183790671538;
      const s      = 1.9 - albedo + 3.5 * ((albedo - 0.8) * (albedo - 0.8));
      const l      = 0.25 * m_1_pi * radius;

      return l / s;
   }
}

const ScatterSamples_default_ = ScatterSamples;
;

/* harmony default export */ const X_ITE_ScatterSamples = (external_X_ITE_X3D_Namespace_default().add ("ScatterSamples", ScatterSamples_default_));
;// ./src/assets/shaders/webgl2/pbr/Scatter2.glsl.js
const Scatter2_glsl_default_ = () => /* glsl */ `
uniform float x3d_ScatterMaterialIdEXT;vec4 getMaterialColor(const in vec4 fragCoord){vec4 baseColor=getBaseColor();
#if defined(X3D_TEXTURE_PROJECTION)
baseColor.rgb*=getTextureProjectorColor();
#endif
vec3 frontColor=vec3(0);vec3 v=normalize(-vertex);
#if defined(X3D_USE_IBL)||defined(X3D_LIGHTING)
NormalInfo normalInfo=getNormalInfo(x3d_Material.normalScale);vec3 n=normalInfo.n;float NdotV=clamp(dot(n,v),0.,1.);
#endif
MaterialInfo materialInfo;materialInfo.baseColor=baseColor.rgb;materialInfo.ior=1.5;materialInfo.f0_dielectric=vec3(.04);materialInfo.specularWeight=1.;materialInfo.f90=vec3(1);materialInfo.f90_dielectric=materialInfo.f90;
#if defined(X3D_IOR_MATERIAL_EXT)
materialInfo=getIorInfo(materialInfo);
#endif
#if defined(X3D_MATERIAL_METALLIC_ROUGHNESS)
materialInfo=getMetallicRoughnessInfo(materialInfo);
#endif
#if defined(X3D_SHEEN_MATERIAL_EXT)
materialInfo=getSheenInfo(materialInfo);
#endif
#if defined(X3D_SPECULAR_MATERIAL_EXT)
materialInfo=getSpecularInfo(materialInfo);
#endif
#if defined(X3D_TRANSMISSION_MATERIAL_EXT)
materialInfo=getTransmissionInfo(materialInfo);
#endif
#if defined(X3D_VOLUME_MATERIAL_EXT)
materialInfo=getVolumeInfo(materialInfo);
#endif
#if defined(X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
materialInfo=getDiffuseTransmissionInfo(materialInfo);
#endif
#if defined(X3D_VOLUME_SCATTER_MATERIAL_EXT)
materialInfo=getVolumeScatterInfo(materialInfo);vec3 singleScatter=multiToSingleScatter(materialInfo.multiscatterColor);
#endif
materialInfo.perceptualRoughness=clamp(materialInfo.perceptualRoughness,0.,1.);materialInfo.alphaRoughness=materialInfo.perceptualRoughness*materialInfo.perceptualRoughness;vec3 f_specular_dielectric=vec3(0);vec3 f_diffuse=vec3(0);vec3 f_dielectric_brdf_ibl=vec3(0);float albedoSheenScaling=1.;float diffuseTransmissionThickness=1.;
#if defined(X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
#if defined(X3D_VOLUME_MATERIAL_EXT)
diffuseTransmissionThickness=materialInfo.thickness*(length(x3d_ModelViewMatrix[0].xyz)+length(x3d_ModelViewMatrix[1].xyz)+length(x3d_ModelViewMatrix[2].xyz))/3.;
#endif
#endif
#if defined(X3D_USE_IBL)||defined(X3D_TRANSMISSION_MATERIAL_EXT)
#if defined(X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
f_diffuse=getDiffuseLight(n)*materialInfo.diffuseTransmissionColorFactor*singleScatter;vec3 diffuseTransmissionIBL=getDiffuseLight(-n)*materialInfo.diffuseTransmissionColorFactor;
#if defined(X3D_VOLUME_MATERIAL_EXT)
diffuseTransmissionIBL=applyVolumeAttenuation(diffuseTransmissionIBL,diffuseTransmissionThickness,materialInfo.attenuationColor,materialInfo.attenuationDistance);
#endif
f_diffuse+=diffuseTransmissionIBL*(1.-singleScatter)*singleScatter;f_diffuse*=materialInfo.diffuseTransmissionFactor;
#endif
#if defined(X3D_SHEEN_MATERIAL_EXT)
albedoSheenScaling=1.-max3(materialInfo.sheenColorFactor)*albedoSheenScalingLUT(NdotV,materialInfo.sheenRoughnessFactor);
#endif
#if defined(X3D_USE_IBL)
vec3 f_dielectric_fresnel_ibl=getIBLGGXFresnel(n,v,materialInfo.perceptualRoughness,materialInfo.f0_dielectric,materialInfo.specularWeight);frontColor+=mix(f_diffuse,f_specular_dielectric,f_dielectric_fresnel_ibl)*albedoSheenScaling;
#endif
#endif
#if defined(X3D_LIGHTING)
for(int i=0;i<X3D_NUM_LIGHTS;++i){x3d_LightSourceParameters light=x3d_LightSource[i];vec3 pointToLight;float distanceToLight;if(light.type!=x3d_DirectionalLight){pointToLight=light.location-vertex;distanceToLight=length(light.matrix*pointToLight);}else{pointToLight=-light.direction;distanceToLight=-1.;}if(distanceToLight<=light.radius||light.radius<0.){vec3 l=normalize(pointToLight);vec3 h=normalize(l+v);float NdotL=clamp(dot(n,l),0.,1.);float VdotH=clamp(dot(v,h),0.,1.);vec3 dielectric_fresnel=F_Schlick(materialInfo.f0_dielectric*materialInfo.specularWeight,materialInfo.f90_dielectric,abs(VdotH));vec3 l_diffuse=vec3(0);vec3 l_specular_dielectric=vec3(0);vec3 l_dielectric_brdf=vec3(0);
#if defined(X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
vec3 lightIntensity=getLightIntensity(light,l,distanceToLight);l_diffuse=lightIntensity*NdotL*BRDF_lambertian(materialInfo.diffuseTransmissionColorFactor)*singleScatter;if(dot(n,l)<0.){float diffuseNdotL=clamp(dot(-n,l),0.,1.);vec3 diffuse_btdf=lightIntensity*diffuseNdotL*BRDF_lambertian(materialInfo.diffuseTransmissionColorFactor);vec3 l_mirror=normalize(reflect(l,n));float diffuseVdotH=clamp(dot(v,normalize(l_mirror+v)),0.,1.);dielectric_fresnel=F_Schlick(materialInfo.f0_dielectric*materialInfo.specularWeight,materialInfo.f90_dielectric,abs(diffuseVdotH));
#if defined(X3D_VOLUME_MATERIAL_EXT)
diffuse_btdf=applyVolumeAttenuation(diffuse_btdf,diffuseTransmissionThickness,materialInfo.attenuationColor,materialInfo.attenuationDistance);
#endif
l_diffuse+=diffuse_btdf*(1.-singleScatter)*singleScatter;}l_diffuse*=materialInfo.diffuseTransmissionFactor;
#endif
#if defined(X3D_SHEEN_MATERIAL_EXT)
albedoSheenScaling=min(1.-max3(materialInfo.sheenColorFactor)*albedoSheenScalingLUT(NdotV,materialInfo.sheenRoughnessFactor),1.-max3(materialInfo.sheenColorFactor)*albedoSheenScalingLUT(NdotL,materialInfo.sheenRoughnessFactor));
#endif
l_dielectric_brdf=mix(l_diffuse,l_specular_dielectric,dielectric_fresnel);frontColor+=l_dielectric_brdf*albedoSheenScaling;}}
#endif
return vec4(frontColor,x3d_ScatterMaterialIdEXT);}`
;

/* harmony default export */ const Scatter2_glsl = (external_X_ITE_X3D_Namespace_default().add ("Scatter2.glsl", Scatter2_glsl_default_));
;// ./src/assets/shaders/webgl2/pbr/SubsurfaceScattering2.glsl.js
const SubsurfaceScattering2_glsl_default_ = () => /* glsl */ `
#if defined(X3D_VOLUME_SCATTER_MATERIAL_EXT)
vec3 multiToSingleScatter(const in vec3 multiscatterColor){vec3 s=4.09712+4.20863*multiscatterColor-sqrt(9.59217+(41.6808+17.7126*multiscatterColor)*multiscatterColor);return 1.-s*s;}
#if!defined(X3D_VOLUME_SCATTER_PASS)
uniform float x3d_ScatterAnisotropyEXT;uniform vec3 x3d_ScatterSamplesEXT[X3D_SCATTER_SAMPLES_COUNT_EXT];uniform float x3d_ScatterMinRadiusEXT;uniform sampler2D x3d_ScatterSamplerEXT;uniform sampler2D x3d_ScatterDepthSamplerEXT;const float M_1_PI=1./M_PI;vec3 burley_setup(const in vec3 radius,const in vec3 albedo){vec3 a=albedo-.8;vec3 s=1.9-albedo+3.5*(a*a);vec3 l=.25*M_1_PI*radius;return l/s;}vec3 burley_eval(const in vec3 d,const in float r){vec3 exp_r_3_d=exp(-r/(3.*d));vec3 exp_r_d=exp_r_3_d*exp_r_3_d*exp_r_3_d;return(exp_r_d+exp_r_3_d)/(4.*d);}vec3 getSubsurfaceScattering(const in vec3 vertex,const in mat4 projectionMatrix,const in float attenuationDistance,const in vec3 diffuseColor,const in vec3 multiscatterColor,const in vec4 fragCoord){vec3 scatterDistance=attenuationDistance*multiscatterColor;float maxColor=max3(scatterDistance);vec3 vMaxColor=max(vec3(maxColor),vec3(.00001));vec2 texelSize=1./vec2(x3d_Viewport.zw);mat4 invProjectionMatrix=inverse(projectionMatrix);vec2 uv=fragCoord.xy*texelSize;vec4 centerSample=textureLod(x3d_ScatterSamplerEXT,uv,0.);float centerDepth=textureLod(x3d_ScatterDepthSamplerEXT,uv,0.).r;centerDepth=centerDepth*2.-1.;vec2 clipUV=uv*2.-1.;vec4 clipSpacePosition=vec4(clipUV.xy,centerDepth,1.);vec4 upos=invProjectionMatrix*clipSpacePosition;vec3 fragViewPosition=upos.xyz/upos.w;upos=invProjectionMatrix*vec4(clipUV.x+texelSize.x,clipUV.y,centerDepth,1.);vec3 offsetViewPosition=upos.xyz/upos.w;float mPerPixel=distance(fragViewPosition,offsetViewPosition);float maxRadiusPixels=maxColor/mPerPixel;if(maxRadiusPixels<=1.)return centerSample.rgb;centerDepth=fragViewPosition.z;vec3 totalWeight=vec3(0);vec3 totalDiffuse=vec3(0);vec3 clampedScatterDistance=max(vec3(x3d_ScatterMinRadiusEXT),scatterDistance/maxColor)*maxColor;vec3 d=burley_setup(clampedScatterDistance,vec3(1));for(int i=0;i<X3D_SCATTER_SAMPLES_COUNT_EXT;++i){vec3 scatterSample=x3d_ScatterSamplesEXT[i];float fabAngle=scatterSample.x;float r=scatterSample.y*maxRadiusPixels*texelSize.x;float rcpPdf=scatterSample.z;vec2 sampleCoords=vec2(cos(fabAngle),sin(fabAngle))*r;vec2 sampleUV=uv+sampleCoords;vec4 textureSample=textureLod(x3d_ScatterSamplerEXT,sampleUV,0.);if(centerSample.w!=textureSample.w)continue;float sampleDepth=textureLod(x3d_ScatterDepthSamplerEXT,sampleUV,0.).r;sampleDepth=sampleDepth*2.-1.;vec2 sampleClipUV=sampleUV*2.-1.;vec4 sampleUpos=invProjectionMatrix*vec4(sampleClipUV.xy,sampleDepth,1.);vec3 sampleViewPosition=sampleUpos.xyz/sampleUpos.w;float sampleDistance=distance(sampleViewPosition,fragViewPosition);vec3 weight=burley_eval(d,sampleDistance)*rcpPdf;totalWeight+=weight;totalDiffuse+=weight*textureSample.rgb;}totalWeight=max(totalWeight,vec3(.0001));return totalDiffuse/totalWeight*diffuseColor;}
#endif
#endif
`
;

/* harmony default export */ const SubsurfaceScattering2_glsl = (external_X_ITE_X3D_Namespace_default().add ("SubsurfaceScattering2.glsl", SubsurfaceScattering2_glsl_default_));
;// ./src/x_ite/Components/X_ITE/VolumeScatterMaterialExtension.js











// Register key.

X_ITE_ExtensionKeys .add ("VOLUME_SCATTER_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_MultiscatterColorTextureEXT");

// Register shaders.





external_X_ITE_X3D_ShaderRegistry_default().addIncludeFile ("Scatter",              Scatter2_glsl);
external_X_ITE_X3D_ShaderRegistry_default().addIncludeFile ("SubsurfaceScattering", SubsurfaceScattering2_glsl);

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function VolumeScatterMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).VolumeScatterMaterialExtension);

   // Private properties

   this .multiscatterColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (VolumeScatterMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._scatterStrength          .addInterest ("set_scatterStrength__",          this);
      this ._scatterStrengthTexture   .addInterest ("set_scatterStrengthTexture__",   this);
      this ._scatterAnisotropy        .addInterest ("set_scatterAnisotropy__",        this);
      this ._multiscatterColor        .addInterest ("set_multiscatterColor__",        this);
      this ._multiscatterColorTexture .addInterest ("set_multiscatterColorTexture__", this);

      this .set_scatterStrength__ ();
      this .set_scatterStrengthTexture__ ();
      this .set_scatterAnisotropy__ ();
      this .set_multiscatterColor__ ();
      this .set_multiscatterColorTexture__ ();
   },
   set_scatterStrength__ ()
   {
      this .scatterStrength = external_X_ITE_X3D_Algorithm_default().clamp (this ._scatterStrength .getValue (), 0, 1);
   },
   set_scatterStrengthTexture__ ()
   {
      this .scatterStrengthTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._scatterStrengthTexture);

      this .addTexture (0, this .scatterStrengthTextureNode);
   },
   set_scatterAnisotropy__ ()
   {
      this .scatterAnisotropy = external_X_ITE_X3D_Algorithm_default().clamp (this ._scatterAnisotropy .getValue (), -1, 1);
   },
   set_multiscatterColor__ ()
   {
      this .multiscatterColorArray .set (this ._multiscatterColor .getValue ());
   },
   set_multiscatterColorTexture__ ()
   {
      this .multiscatterColorTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._multiscatterColorTexture);

      this .addTexture (1, this .multiscatterColorTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .VOLUME_SCATTER_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");
      options .push (`X3D_SCATTER_SAMPLES_COUNT_EXT ${X_ITE_ScatterSamples .SCATTER_SAMPLES_COUNT}`);

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .scatterStrengthTextureNode   ?.getShaderOptions (options, "SCATTER_STRENGTH",   true);
      this .multiscatterColorTextureNode ?.getShaderOptions (options, "MULTISCATTER_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ScatterMaterialIdEXT");
      uniforms .push ("x3d_ScatterStrengthEXT");
      uniforms .push ("x3d_ScatterAnisotropyEXT");
      uniforms .push ("x3d_MultiscatterColorEXT");
      uniforms .push ("x3d_ScatterSamplesEXT");
      uniforms .push ("x3d_ScatterMinRadiusEXT");
      uniforms .push ("x3d_ScatterSamplerEXT");
      uniforms .push ("x3d_ScatterDepthSamplerEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      const browser = this .getBrowser ();

      this .scatterStrengthTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_ScatterStrengthTextureEXT,
         this ._scatterStrengthTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .multiscatterColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_MultiscatterColorTextureEXT,
         this ._multiscatterColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (shaderObject .volumeScatterPass)
      {
         gl .uniform1f  (shaderObject .x3d_ScatterMaterialIdEXT, browser .getShapeId ());
         gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
         return;
      }

      gl .uniform1f  (shaderObject .x3d_ScatterStrengthEXT,   this .scatterStrength);
      gl .uniform1f  (shaderObject .x3d_ScatterAnisotropyEXT, this .scatterAnisotropy);
      gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
      gl .uniform3fv (shaderObject .x3d_ScatterSamplesEXT,    X_ITE_ScatterSamples .SCATTER_SAMPLES);
      gl .uniform1f  (shaderObject .x3d_ScatterMinRadiusEXT,  X_ITE_ScatterSamples .SCATTER_MIN_RADIUS);

      // Set scatter framebuffer textures.

      const
         scatterSampleBuffer       = browser .getVolumeScatterBuffer (),
         scatterSampleUnit         = browser .popTextureUnit (),
         scatterDepthSampleUnit    = browser .popTextureUnit (),
         scatterSampleTexture      = scatterSampleBuffer .getColorTexture (),
         scatterDepthSampleTexture = scatterSampleBuffer .getDepthTexture ();

      gl .activeTexture (gl .TEXTURE0 + scatterSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterSamplerEXT, scatterSampleUnit);

      gl .activeTexture (gl .TEXTURE0 + scatterDepthSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterDepthSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterDepthSamplerEXT, scatterDepthSampleUnit);
   },
});

Object .defineProperties (VolumeScatterMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("VolumeScatterMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "scatterStrength",                 new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "scatterStrengthTextureMapping",   new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "scatterStrengthTexture",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "scatterAnisotropy",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "multiscatterColor",               new (external_X_ITE_X3D_Fields_default()).SFColor ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "multiscatterColorTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "multiscatterColorTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumeScatterMaterialExtension_default_ = VolumeScatterMaterialExtension;
;

/* harmony default export */ const X_ITE_VolumeScatterMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("VolumeScatterMaterialExtension", VolumeScatterMaterialExtension_default_));
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
      X_ITE_GaussianSplats,
      X_ITE_InstancedShape,
      X_ITE_IORMaterialExtension,
      X_ITE_IridescenceMaterialExtension,
      X_ITE_SheenMaterialExtension,
      X_ITE_SpecularGlossinessMaterial,
      X_ITE_SpecularMaterialExtension,
      X_ITE_TransmissionMaterialExtension,
      X_ITE_VolumeMaterialExtension,
      X_ITE_VolumeScatterMaterialExtension,
   ],
   abstractNodes:
   [
      X_ITE_X3DMaterialExtensionNode,
   ],
   browserContext: X_ITE_X3DX_ITEContext,
});

const X_ITEComponent_default_ = undefined;
;

/* harmony default export */ const X_ITEComponent = (external_X_ITE_X3D_Namespace_default().add ("X_ITEComponent", X_ITEComponent_default_));
/******/ })()
;