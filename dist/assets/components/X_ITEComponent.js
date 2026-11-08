/* X_ITE v16.7.1 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
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
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .GLTFPointerAliases"
const external_X_ITE_X3D_GLTFPointerAliases_namespaceObject = __X_ITE_X3D__ .GLTFPointerAliases;
var external_X_ITE_X3D_GLTFPointerAliases_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GLTFPointerAliases_namespaceObject);
;// ./node_modules/gl-matrix/esm/common.js
/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var ANGLE_ORDER = "zyx";

/**
 * Symmetric round
 * see https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 *
 * @param {Number} a value to round
 */
function round(a) {
  if (a >= 0) return Math.round(a);
  return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
}

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
var radian = 180 / Math.PI;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Convert Radian To Degree
 *
 * @param {Number} a Angle in Radians
 */
function toDegree(a) {
  return a * radian;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a          The first number to test.
 * @param {Number} b          The second number to test.
 * @param {Number} tolerance  Absolute or relative tolerance (default glMatrix.EPSILON)
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EPSILON;
  return Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
}
;// ./node_modules/gl-matrix/esm/mat3.js
/* unused harmony import specifier */ var glMatrix;


/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
      a02 = a[2],
      a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3 | null} out, or null if source matrix is not invertible
 */
function invert(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  var a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  var a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  var a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  var a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */
function mat3_determinant(a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  var a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  var a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  var a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  var a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  var b00 = b[0],
    b01 = b[1],
    b02 = b[2];
  var b10 = b[3],
    b11 = b[4],
    b12 = b[5];
  var b20 = b[6],
    b21 = b[7],
    b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a10 = a[3],
    a11 = a[4],
    a12 = a[5],
    a20 = a[6],
    a21 = a[7],
    a22 = a[8],
    x = v[0],
    y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a10 = a[3],
    a11 = a[4],
    a12 = a[5],
    a20 = a[6],
    a21 = a[7],
    a22 = a[8],
    s = Math.sin(rad),
    c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0],
    y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
    c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
function fromQuat(out, q) {
  var x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
function normalFromMat4(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  var a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  var a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  var a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8]);
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function mat3_equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5],
    a6 = a[6],
    a7 = a[7],
    a8 = a[8];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
var mul = (/* unused pure expression or super */ null && (multiply));

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
var sub = (/* unused pure expression or super */ null && (subtract));
;// ./node_modules/gl-matrix/esm/vec3.js
/* unused harmony import specifier */ var vec3_glMatrix;


/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function vec3_create() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function vec3_clone(a) {
  var out = new vec3_glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function vec3_length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function vec3_fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */
function vec3_copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function vec3_set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function vec3_add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function vec3_subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function vec3_multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * symmetric round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */
function vec3_round(out, a) {
  out[0] = vec3_glMatrix.round(a[0]);
  out[1] = vec3_glMatrix.round(a[1]);
  out[2] = vec3_glMatrix.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function vec3_scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function vec3_dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var ax = a[0],
    ay = a[1],
    az = a[2];
  var bx = b[0],
    by = b[1],
    bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a spherical linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function slerp(out, a, b, t) {
  var angle = Math.acos(Math.min(Math.max(vec3_dot(a, b), -1), 1));
  var sinTotal = Math.sin(angle);
  var ratioA = Math.sin((1 - t) * angle) / sinTotal;
  var ratioB = Math.sin(t * angle) / sinTotal;
  out[0] = ratioA * a[0] + ratioB * b[0];
  out[1] = ratioA * a[1] + ratioB * b[1];
  out[2] = ratioA * a[2] + ratioB * b[2];
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale === undefined ? 1.0 : scale;
  var r = vec3_glMatrix.RANDOM() * 2.0 * Math.PI;
  var z = vec3_glMatrix.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
    y = a[1],
    z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
    y = a[1],
    z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q normalized quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // Fast Vector Rotation using Quaternions by Robert Eisele
  // https://raw.org/proof/vector-rotation-using-quaternions/

  var qx = q[0],
    qy = q[1],
    qz = q[2],
    qw = q[3];
  var vx = a[0],
    vy = a[1],
    vz = a[2];

  // t = q x v
  var tx = qy * vz - qz * vy;
  var ty = qz * vx - qx * vz;
  var tz = qx * vy - qy * vx;

  // t = 2t
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;

  // v + w t + q x t
  out[0] = vx + qw * tx + qy * tz - qz * ty;
  out[1] = vy + qw * ty + qz * tx - qx * tz;
  out[2] = vz + qw * tz + qx * ty - qy * tx;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */
function rotateX(out, a, b, rad) {
  var p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */
function rotateY(out, a, b, rad) {
  var p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */
function rotateZ(out, a, b, rad) {
  var p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var ax = a[0],
    ay = a[1],
    az = a[2],
    bx = b[0],
    by = b[1],
    bz = b[2],
    mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)),
    cosine = mag && vec3_dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */
function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function vec3_str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function vec3_exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function vec3_equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2];
  return Math.abs(a0 - b0) <= vec3_glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= vec3_glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= vec3_glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
var vec3_sub = (/* unused pure expression or super */ null && (vec3_subtract));

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
var vec3_mul = (/* unused pure expression or super */ null && (vec3_multiply));

/**
 * Alias for {@link vec3.divide}
 * @function
 */
var div = (/* unused pure expression or super */ null && (divide));

/**
 * Alias for {@link vec3.distance}
 * @function
 */
var dist = (/* unused pure expression or super */ null && (distance));

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
var sqrDist = (/* unused pure expression or super */ null && (squaredDistance));

/**
 * Alias for {@link vec3.length}
 * @function
 */
var len = vec3_length;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
var sqrLen = (/* unused pure expression or super */ null && (squaredLength));

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = function () {
  var vec = vec3_create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();
;// ./node_modules/gl-matrix/esm/vec4.js
/* unused harmony import specifier */ var vec4_glMatrix;


/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function vec4_create() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function vec4_clone(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function vec4_fromValues(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */
function vec4_copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function vec4_set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */
function vec4_ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */
function vec4_floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
function vec4_max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * symmetric round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */
function vec4_round(out, a) {
  out[0] = vec4_glMatrix.round(a[0]);
  out[1] = vec4_glMatrix.round(a[1]);
  out[2] = vec4_glMatrix.round(a[2]);
  out[3] = vec4_glMatrix.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function vec4_scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function vec4_scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */
function vec4_distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function vec4_squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function vec4_length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function vec4_squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */
function vec4_negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */
function vec4_inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */
function vec4_normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} out the receiving vector
 * @param {ReadonlyVec4} u the first vector
 * @param {ReadonlyVec4} v the second vector
 * @param {ReadonlyVec4} w the third vector
 * @returns {vec4} result
 */
function vec4_cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
    B = v[0] * w[2] - v[2] * w[0],
    C = v[0] * w[3] - v[3] * w[0],
    D = v[1] * w[2] - v[2] * w[1],
    E = v[1] * w[3] - v[3] * w[1],
    F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */
function vec4_lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {vec4} out
 */
function vec4_random(out, scale) {
  scale = scale === undefined ? 1.0 : scale;

  // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;
  var v1, v2, v3, v4;
  var s1, s2;
  var rand;
  rand = vec4_glMatrix.RANDOM();
  v1 = rand * 2 - 1;
  v2 = (4 * vec4_glMatrix.RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s1 = v1 * v1 + v2 * v2;
  rand = vec4_glMatrix.RANDOM();
  v3 = rand * 2 - 1;
  v4 = (4 * vec4_glMatrix.RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
  s2 = v3 * v3 + v4 * v4;
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */
function vec4_transformMat4(out, a, m) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q normalized quaternion to transform with
 * @returns {vec4} out
 */
function vec4_transformQuat(out, a, q) {
  // Fast Vector Rotation using Quaternions by Robert Eisele
  // https://raw.org/proof/vector-rotation-using-quaternions/

  var qx = q[0],
    qy = q[1],
    qz = q[2],
    qw = q[3];
  var vx = a[0],
    vy = a[1],
    vz = a[2];

  // t = q x v
  var tx = qy * vz - qz * vy;
  var ty = qz * vx - qx * vz;
  var tz = qx * vy - qy * vx;

  // t = 2t
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;

  // v + w t + q x t
  out[0] = vx + qw * tx + qy * tz - qz * ty;
  out[1] = vy + qw * ty + qz * tx - qx * tz;
  out[2] = vz + qw * tz + qx * ty - qy * tx;
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */
function vec4_zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function vec4_str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function vec4_exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function vec4_equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  return Math.abs(a0 - b0) <= vec4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= vec4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= vec4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= vec4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
var vec4_sub = (/* unused pure expression or super */ null && (vec4_subtract));

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
var vec4_mul = (/* unused pure expression or super */ null && (vec4_multiply));

/**
 * Alias for {@link vec4.divide}
 * @function
 */
var vec4_div = (/* unused pure expression or super */ null && (vec4_divide));

/**
 * Alias for {@link vec4.distance}
 * @function
 */
var vec4_dist = (/* unused pure expression or super */ null && (vec4_distance));

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
var vec4_sqrDist = (/* unused pure expression or super */ null && (vec4_squaredDistance));

/**
 * Alias for {@link vec4.length}
 * @function
 */
var vec4_len = (/* unused pure expression or super */ null && (vec4_length));

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
var vec4_sqrLen = (/* unused pure expression or super */ null && (vec4_squaredLength));

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var vec4_forEach = function () {
  var vec = vec4_create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();
;// ./node_modules/gl-matrix/esm/quat.js
/* unused harmony import specifier */ var quat_glMatrix;
/* unused harmony import specifier */ var vec4;





/**
 * Quaternion in the format XYZW
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function quat_create() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function quat_identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);
  if (s > quat_glMatrix.EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */
function getAngle(a, b) {
  var dotproduct = quat_dot(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */
function quat_multiply(out, a, b) {
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  var bx = b[0],
    by = b[1],
    bz = b[2],
    bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function quat_rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  var bx = Math.sin(rad),
    bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function quat_rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  var by = Math.sin(rad),
    bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function quat_rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  var bz = Math.sin(rad),
    bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  var x = a[0],
    y = a[1],
    z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */
function exp(out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}

/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */
function ln(out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}

/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */
function pow(out, a, b) {
  ln(out, a);
  quat_scale(out, out, b);
  exp(out, out);
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
function quat_slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  var bx = b[0],
    by = b[1],
    bz = b[2],
    bw = b[3];
  var omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}

/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function quat_random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = quat_glMatrix.RANDOM();
  var u2 = quat_glMatrix.RANDOM();
  var u3 = quat_glMatrix.RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */
function quat_invert(out, a) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x Angle to rotate around X axis in degrees.
 * @param {Number} y Angle to rotate around Y axis in degrees.
 * @param {Number} z Angle to rotate around Z axis in degrees.
 * @param {'xyz'|'xzy'|'yxz'|'yzx'|'zxy'|'zyx'} order Intrinsic order for conversion, default is zyx.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
  var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : quat_glMatrix.ANGLE_ORDER;
  var halfToRad = Math.PI / 360;
  x *= halfToRad;
  z *= halfToRad;
  y *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  switch (order) {
    case "xyz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "xzy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yxz":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    case "yzx":
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zxy":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;
    case "zyx":
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
    default:
      throw new Error('Unknown angle order ' + order);
  }
  return out;
}

/**
 * Returns a string representation of a quaternion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function quat_str(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
var quat_clone = vec4_clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
var quat_fromValues = vec4_fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the source quaternion
 * @returns {quat} out
 * @function
 */
var quat_copy = vec4_copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
var quat_set = vec4_set;

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */
var quat_add = vec4_add;

/**
 * Alias for {@link quat.multiply}
 * @function
 */
var quat_mul = quat_multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
var quat_scale = vec4_scale;

/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
var quat_dot = dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */
var quat_lerp = vec4_lerp;

/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */
var quat_length = vec4_length;

/**
 * Alias for {@link quat.length}
 * @function
 */
var quat_len = (/* unused pure expression or super */ null && (quat_length));

/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
var quat_squaredLength = vec4_squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
var quat_sqrLen = (/* unused pure expression or super */ null && (quat_squaredLength));

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
var quat_normalize = vec4_normalize;

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat} a The first quaternion.
 * @param {ReadonlyQuat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
var quat_exactEquals = vec4_exactEquals;

/**
 * Returns whether or not the quaternions point approximately to the same direction.
 *
 * Both quaternions are assumed to be unit length.
 *
 * @param {ReadonlyQuat} a The first unit quaternion.
 * @param {ReadonlyQuat} b The second unit quaternion.
 * @returns {Boolean} True if the quaternions are equal, false otherwise.
 */
function quat_equals(a, b) {
  return Math.abs(vec4.dot(a, b)) >= 1 - quat_glMatrix.EPSILON;
}

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */
var rotationTo = function () {
  var tmpvec3 = vec3_create();
  var xUnitVec3 = vec3_fromValues(1, 0, 0);
  var yUnitVec3 = vec3_fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot = vec3_dot(a, b);
    if (dot < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return quat_normalize(out, out);
    }
  };
}();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
var sqlerp = function () {
  var temp1 = quat_create();
  var temp2 = quat_create();
  return function (out, a, b, c, d, t) {
    quat_slerp(temp1, a, d, t);
    quat_slerp(temp2, b, c, t);
    quat_slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
var setAxes = function () {
  var matr = create();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return quat_normalize(out, fromMat3(out, matr));
  };
}();
;// ./node_modules/gl-matrix/esm/mat4.js
/* unused harmony import specifier */ var mat4_glMatrix;


/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function mat4_create() {
  var out = new mat4_glMatrix.ARRAY_TYPE(16);
  if (mat4_glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function mat4_clone(a) {
  var out = new mat4_glMatrix.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */
function mat4_copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function mat4_fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new mat4_glMatrix.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function mat4_set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function mat4_identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */
function mat4_transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    var a12 = a[6],
      a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4 | null} out, or null if source matrix is not invertible
 */
function mat4_invert(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  var a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  var a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  var a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */
function mat4_adjoint(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  var a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  var a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  var a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  out[0] = a11 * b11 - a12 * b10 + a13 * b09;
  out[1] = a02 * b10 - a01 * b11 - a03 * b09;
  out[2] = a31 * b05 - a32 * b04 + a33 * b03;
  out[3] = a22 * b04 - a21 * b05 - a23 * b03;
  out[4] = a12 * b08 - a10 * b11 - a13 * b07;
  out[5] = a00 * b11 - a02 * b08 + a03 * b07;
  out[6] = a32 * b02 - a30 * b05 - a33 * b01;
  out[7] = a20 * b05 - a22 * b02 + a23 * b01;
  out[8] = a10 * b10 - a11 * b08 + a13 * b06;
  out[9] = a01 * b08 - a00 * b10 - a03 * b06;
  out[10] = a30 * b04 - a31 * b02 + a33 * b00;
  out[11] = a21 * b02 - a20 * b04 - a23 * b00;
  out[12] = a11 * b07 - a10 * b09 - a12 * b06;
  out[13] = a00 * b09 - a01 * b07 + a02 * b06;
  out[14] = a31 * b01 - a30 * b03 - a32 * b00;
  out[15] = a20 * b03 - a21 * b01 + a22 * b00;
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */
function mat4_determinant(a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  var a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  var a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  var a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];
  var b0 = a00 * a11 - a01 * a10;
  var b1 = a00 * a12 - a02 * a10;
  var b2 = a01 * a12 - a02 * a11;
  var b3 = a20 * a31 - a21 * a30;
  var b4 = a20 * a32 - a22 * a30;
  var b5 = a21 * a32 - a22 * a31;
  var b6 = a00 * b5 - a01 * b4 + a02 * b3;
  var b7 = a10 * b5 - a11 * b4 + a12 * b3;
  var b8 = a20 * b2 - a21 * b1 + a22 * b0;
  var b9 = a30 * b2 - a31 * b1 + a32 * b0;

  // Calculate the determinant
  return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */
function mat4_multiply(out, a, b) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  var a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  var a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  var a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  // Cache only the current line of the second matrix
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */
function mat4_translate(out, a, v) {
  var x = v[0],
    y = v[1],
    z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function mat4_scale(out, a, v) {
  var x = v[0],
    y = v[1],
    z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function mat4_rotate(out, a, rad, axis) {
  var x = axis[0],
    y = axis[1],
    z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len < mat4_glMatrix.EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function mat4_rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function mat4_rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function mat4_rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */
function mat4_fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */
function mat4_fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function mat4_fromRotation(out, rad, axis) {
  var x = axis[0],
    y = axis[1],
    z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s, c, t;
  if (len < mat4_glMatrix.EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *     let quatMat = mat4.create();
 *     mat4.fromQuat(quatMat, quat);
 *     mat4.multiply(dest, dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */
function fromQuat2(out, a) {
  var translation = new mat4_glMatrix.ARRAY_TYPE(3);
  var bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  //Only scale if it makes sense
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion parameter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  var scaling = new mat4_glMatrix.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}

/**
 * Decomposes a transformation matrix into its rotation, translation
 * and scale components. Returns only the rotation component
 * @param  {quat} out_r Quaternion to receive the rotation component
 * @param  {vec3} out_t Vector to receive the translation vector
 * @param  {vec3} out_s Vector to receive the scaling factor
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @returns {quat} out_r
 */
function decompose(out_r, out_t, out_s, mat) {
  out_t[0] = mat[12];
  out_t[1] = mat[13];
  out_t[2] = mat[14];
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  var is1 = 1 / out_s[0];
  var is2 = 1 / out_s[1];
  var is3 = 1 / out_s[2];
  var sm11 = m11 * is1;
  var sm12 = m12 * is2;
  var sm13 = m13 * is3;
  var sm21 = m21 * is1;
  var sm22 = m22 * is2;
  var sm23 = m23 * is3;
  var sm31 = m31 * is1;
  var sm32 = m32 * is2;
  var sm33 = m33 * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out_r[3] = 0.25 * S;
    out_r[0] = (sm23 - sm32) / S;
    out_r[1] = (sm31 - sm13) / S;
    out_r[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out_r[3] = (sm23 - sm32) / S;
    out_r[0] = 0.25 * S;
    out_r[1] = (sm12 + sm21) / S;
    out_r[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out_r[3] = (sm31 - sm13) / S;
    out_r[0] = (sm12 + sm21) / S;
    out_r[1] = 0.25 * S;
    out_r[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out_r[3] = (sm12 - sm21) / S;
    out_r[0] = (sm31 + sm13) / S;
    out_r[1] = (sm23 + sm32) / S;
    out_r[2] = 0.25 * S;
  }
  return out_r;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *     let quatMat = mat4.create();
 *     mat4.fromQuat(quatMat, quat);
 *     mat4.multiply(dest, dest, quatMat);
 *     mat4.scale(dest, dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *     mat4.translate(dest, dest, origin);
 *     let quatMat = mat4.create();
 *     mat4.fromQuat(quatMat, quat);
 *     mat4.multiply(dest, dest, quatMat);
 *     mat4.scale(dest, dest, scale)
 *     mat4.translate(dest, dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function mat4_fromQuat(out, q) {
  var x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    var nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

/**
 * Alias for {@link mat4.perspectiveNO}
 * @function
 */
var perspective = (/* unused pure expression or super */ null && (perspectiveNO));

/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    var nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Alias for {@link mat4.orthoNO}
 * @function
 */
var ortho = (/* unused pure expression or super */ null && (orthoNO));

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < mat4_glMatrix.EPSILON && Math.abs(eyey - centery) < mat4_glMatrix.EPSILON && Math.abs(eyez - centerz) < mat4_glMatrix.EPSILON) {
    return mat4_identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} target Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  var eyex = eye[0],
    eyey = eye[1],
    eyez = eye[2],
    upx = up[0],
    upy = up[1],
    upz = up[2];
  var z0 = eyex - target[0],
    z1 = eyey - target[1],
    z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  var x0 = upy * z2 - upz * z1,
    x1 = upz * z0 - upx * z2,
    x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}

/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function mat4_str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function mat4_frob(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]);
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */
function mat4_add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */
function mat4_subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function mat4_multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function mat4_multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function mat4_exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function mat4_equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var a4 = a[4],
    a5 = a[5],
    a6 = a[6],
    a7 = a[7];
  var a8 = a[8],
    a9 = a[9],
    a10 = a[10],
    a11 = a[11];
  var a12 = a[12],
    a13 = a[13],
    a14 = a[14],
    a15 = a[15];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  var b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7];
  var b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11];
  var b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];
  return Math.abs(a0 - b0) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= mat4_glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
var mat4_mul = (/* unused pure expression or super */ null && (mat4_multiply));

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
var mat4_sub = (/* unused pure expression or super */ null && (mat4_subtract));
;// ./node_modules/gl-matrix/esm/mat2.js
/* unused harmony import specifier */ var mat2_glMatrix;


/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function mat2_create() {
  var out = new mat2_glMatrix.ARRAY_TYPE(4);
  if (mat2_glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
function mat2_clone(a) {
  var out = new mat2_glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */
function mat2_copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function mat2_identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function mat2_fromValues(m00, m01, m10, m11) {
  var out = new mat2_glMatrix.ARRAY_TYPE(4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function mat2_set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */
function mat2_transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }
  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2 | null} out, or null if source matrix is not invertible
 */
function mat2_invert(out, a) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];

  // Calculate the determinant
  var det = a0 * a3 - a2 * a1;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */
function mat2_adjoint(out, a) {
  // Caching this value is necessary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {ReadonlyMat2} a the source matrix
 * @returns {Number} determinant of a
 */
function mat2_determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */
function mat2_multiply(out, a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function mat2_rotate(out, a, rad) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function mat2_scale(out, a, v) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var v0 = v[0],
    v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function mat2_fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2} out
 */
function mat2_fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {ReadonlyMat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function mat2_str(a) {
  return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function mat2_frob(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {ReadonlyMat2} L the lower triangular matrix
 * @param {ReadonlyMat2} D the diagonal matrix
 * @param {ReadonlyMat2} U the upper triangular matrix
 * @param {ReadonlyMat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */
function mat2_add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */
function mat2_subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function mat2_exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function mat2_equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  var b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  return Math.abs(a0 - b0) <= mat2_glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= mat2_glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= mat2_glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= mat2_glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function mat2_multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function mat2_multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
var mat2_mul = (/* unused pure expression or super */ null && (mat2_multiply));

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
var mat2_sub = (/* unused pure expression or super */ null && (mat2_subtract));
;// ./node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js


/** Pre-resolve standard data edges into cached closures, without generated source. */
function compileValueOutputs(engine, nodes, standard, types) {
  const outputs = [];
  const signatures = types.map(t => t.signature),
    index = name => signatures.indexOf(name);
  const supported = type => /^(bool|int|float(?:[234](?:x[234])?)?)$/.test(signatures[type] ?? "");
  const scalar = (v, type) => signatures[type] === "bool" ? v === true || v === "true" : Number(v);
  const parse = (v, type) => ["int", "float", "bool"].includes(signatures[type]) ? scalar(v?.[0] ?? (signatures[type] === "float" ? NaN : signatures[type] === "bool" ? false : 0), type) : v ?? Array(Number(signatures[type].slice(5).split("x").reduce((n, v) => n * Number(v), 1))).fill(NaN);
  const read = cell => {
    if (cell.version !== Infinity && cell.version !== engine.valueEvaluationEpoch) {
      cell.value = cell.evaluate();
      cell.version = engine.valueEvaluationEpoch;
    }
    return cell.value;
  };
  const input = value => {
    if (!value) return undefined;
    if (value.node !== undefined) return outputs[Number(value.node)]?.[value.socket ?? "value"];
    const type = value.type;
    if (type === undefined || !supported(type)) return undefined;
    // Keep main's live-literal semantics when an editor changes value[0] or replaces the array.
    return {
      type,
      get value() {
        return parse(value.value, type);
      },
      version: Infinity,
      evaluate: () => parse(value.value, type)
    };
  };
  for (const [id, node] of nodes) {
    outputs[id] = {};
    const op = node.declaration.op;
    if (node.declaration.extension || node.constructor !== standard.get(op)) continue;
    let type = -1,
      evaluate;
    const a = input(node.values.a),
      b = input(node.values.b),
      kind = a ? signatures[a.type] : undefined;
    const numeric = a && ["float", "int"].includes(kind),
      matching = a && b && a.type === b.type;
    const av = a?.version === Infinity ? () => a.value : () => read(a),
      bv = b?.version === Infinity ? () => b.value : () => read(b);
    if (op === "variable/get") {
      const variable = engine.variables[node.configuration.variable?.value?.[0]];
      if (!variable) continue;
      type = variable.type;
      if (!supported(type)) continue;
      evaluate = signatures[type] === "bool" ? () => scalar(variable.value?.[0], type) : ["int", "float"].includes(signatures[type]) ? () => Number(variable.value?.[0]) : () => variable.value;
    } else if (op === "pointer/get") {
      type = node.configuration.type?.value?.[0];
      if (!supported(type)) continue;
      evaluate = () => {
        const result = node.processNode()?.value;
        if (!result) throw new Error("Missing pointer output");
        return parse(result.value, type);
      };
    } else if (/^math\/extract[234](?:x[234])?$/.test(op) && a && kind === "float" + op.slice(12)) {
      const count = Number(op.slice(12).split("x").reduce((n, v) => n * Number(v), 1));
      for (let j = 0; j < count; j++) outputs[id][String(j)] = {
        type: index("float"),
        value: 0,
        version: -1,
        evaluate: () => {
          engine.processNodeStarted(node);
          return av()[j];
        }
      };
      continue;
    } else if (/^math\/combine[234](?:x[234])?$/.test(op)) {
      const shape = op.slice(12),
        count = Number(shape.split("x").reduce((n, v) => n * Number(v), 1));
      const parts = Array.from({
        length: count
      }, (_, j) => input(node.values[String.fromCharCode(97 + j)]));
      if (parts.some(v => !v || signatures[v.type] !== "float")) continue;
      type = index("float" + shape);
      evaluate = () => parts.map(v => Number(read(v)));
    } else if (op === "math/select") {
      const condition = input(node.values.condition);
      if (!matching || signatures[condition?.type ?? -1] !== "bool") continue;
      type = a.type;
      evaluate = () => read(condition) ? av() : bv();
    } else if (op === "math/switch") {
      const fallback = input(node.values.default),
        selection = input(node.values.selection),
        cases = node.configuration.cases?.value ?? [];
      if (!fallback || signatures[selection?.type ?? -1] !== "int" || !cases.every(n => typeof n === "number" && n === (n | 0))) continue;
      const options = new Map();
      let valid = true;
      for (const n of cases) {
        const choice = input(node.values[String(n)]);
        if (!choice || choice.type !== fallback.type) {
          valid = false;
          break;
        }
        options.set(n, choice);
      }
      if (!valid) continue;
      type = fallback.type;
      evaluate = () => read(options.get(Number(read(selection))) ?? fallback);
    } else if (op.startsWith("type/") && a) {
      const conversions = {
        "type/floatToInt": ["float", "int", v => Number(v) | 0],
        "type/intToFloat": ["int", "float", Number],
        "type/boolToFloat": ["bool", "float", Number],
        "type/boolToInt": ["bool", "int", Number],
        "type/floatToBool": ["float", "bool", Boolean],
        "type/intToBool": ["int", "bool", Boolean]
      };
      const conversion = conversions[op];
      if (!conversion || kind !== conversion[0]) continue;
      type = index(conversion[1]);
      evaluate = () => conversion[2](av());
    } else if (op === "math/not" && a && ["int", "bool"].includes(kind)) {
      type = a.type;
      evaluate = kind === "bool" ? () => !av() : () => ~Number(av());
    } else if (matching && ["math/eq", "math/lt", "math/le", "math/gt", "math/ge"].includes(op)) {
      if (!["float", "int", "bool"].includes(kind) || op !== "math/eq" && !numeric) continue;
      type = index("bool");
      switch (op) {
        case "math/eq":
          evaluate = () => av() === bv();
          break;
        case "math/lt":
          evaluate = () => Number(av()) < Number(bv());
          break;
        case "math/le":
          evaluate = () => Number(av()) <= Number(bv());
          break;
        case "math/gt":
          evaluate = () => Number(av()) > Number(bv());
          break;
        case "math/ge":
          evaluate = () => Number(av()) >= Number(bv());
      }
    } else if (matching && ["math/and", "math/or", "math/xor", "math/lsl", "math/asr"].includes(op) && ["bool", "int"].includes(kind)) {
      type = a.type;
      if (kind === "bool") {
        if (op === "math/and") evaluate = () => {
          const x = av(),
            y = bv();
          return Boolean(x && y);
        };else if (op === "math/or") evaluate = () => {
          const x = av(),
            y = bv();
          return Boolean(x || y);
        };else if (op === "math/xor") evaluate = () => av() !== bv();
      } else switch (op) {
        case "math/and":
          evaluate = () => Number(av()) & Number(bv());
          break;
        case "math/or":
          evaluate = () => Number(av()) | Number(bv());
          break;
        case "math/xor":
          evaluate = () => Number(av()) ^ Number(bv());
          break;
        case "math/lsl":
          evaluate = () => Number(av()) << Number(bv());
          break;
        case "math/asr":
          evaluate = () => Number(av()) >> Number(bv());
          break;
      }
    } else if (matching && numeric) {
      type = a.type;
      const wrap = v => kind === "int" ? v | 0 : v;
      switch (op) {
        case "math/add":
          evaluate = () => wrap(Number(av()) + Number(bv()));
          break;
        case "math/sub":
          evaluate = () => wrap(Number(av()) - Number(bv()));
          break;
        case "math/mul":
          evaluate = kind === "int" ? () => Math.imul(Number(av()), Number(bv())) : () => Number(av()) * Number(bv());
          break;
        case "math/div":
          evaluate = () => wrap(Number(av()) / Number(bv()));
          break;
        case "math/rem":
          evaluate = () => wrap(Number(av()) % Number(bv()));
          break;
      }
    } else if (a && kind === "float") {
      type = a.type;
      if (op === "math/floor") evaluate = () => Math.floor(Number(av()));else if (op === "math/trunc") evaluate = () => Math.trunc(Number(av()));
    }
    if (evaluate && type >= 0) {
      const calculate = evaluate;
      outputs[id].value = {
        type,
        value: 0,
        version: -1,
        evaluate: () => {
          if (op !== "pointer/get") engine.processNodeStarted(node);
          return calculate();
        }
      };
    }
  }
  return outputs;
}

/** Pre-bind common synchronous control nodes; custom/opaque inputs retain the interpreter. */
function compileControlNodes(engine, nodes, standard, outputs, types) {
  const reader = v => {
    if (!v) return undefined;
    if (v.node !== undefined) {
      const cell = outputs[Number(v.node)]?.[v.socket ?? "value"];
      if (!cell) return undefined;
      return () => {
        if (cell.version !== Infinity && cell.version !== engine.valueEvaluationEpoch) {
          cell.value = cell.evaluate();
          cell.version = engine.valueEvaluationEpoch;
        }
        return cell.value;
      };
    }
    const name = types[v.type]?.signature;
    if (!name || !/^(bool|int|float(?:[234](?:x[234])?)?)$/.test(name)) return undefined;
    const value = v.value ?? (name === "bool" ? [false] : name === "int" ? [0] : Array(name === "float" ? 1 : Number(name.slice(5).split("x").reduce((n, v) => n * Number(v), 1))).fill(NaN));
    return () => {
      const current = v.value ?? value;
      return ["int", "float"].includes(name) ? Number(current[0]) : name === "bool" ? current[0] === true || current[0] === "true" : current;
    };
  };
  for (const node of nodes.values()) {
    const op = node.declaration.op;
    if (node.declaration.extension || node.constructor !== standard.get(op)) continue;
    const flow = socket => {
      const edge = node.flows[socket],
        target = edge ? nodes.get(Number(edge.node)) : undefined;
      if (!edge || !target || !target.INPUT_FLOWS.includes(edge.socket ?? "in")) return () => {/*no-op*/};
      return () => {
        engine.processExecutingNextNode(edge);
        target.processNode(edge.socket);
      };
    };
    if (op === "variable/set") {
      const ids = node.configuration.variables.value.map(Number),
        getters = ids.map(id => reader(node.values[String(id)]));
      if (getters.some(v => !v)) continue;
      const variables = ids.map(id => engine.variables[id]),
        values = [],
        next = flow("out");
      node.processNode = () => {
        engine.clearValueEvaluationCache();
        for (let j = 0; j < getters.length; j++) values[j] = getters[j]();
        engine.processNodeStarted(node);
        for (let j = 0; j < ids.length; j++) {
          engine.clearVariableInterpolation(ids[j]);
          const v = values[j];
          variables[j].value = Array.isArray(v) ? v : [v];
        }
        next();
      };
    } else if (op === "flow/branch") {
      const condition = reader(node.values.condition);
      if (!condition) continue;
      const yes = flow("true"),
        no = flow("false");
      node.processNode = () => {
        engine.clearValueEvaluationCache();
        const c = condition();
        engine.processNodeStarted(node);
        if (c) yes();else no();
      };
    } else if (op === "flow/sequence") {
      const flows = Object.keys(node.flows).sort().map(flow);
      node.processNode = () => {
        engine.clearValueEvaluationCache();
        engine.processNodeStarted(node);
        for (const activate of flows) activate();
      };
    }
  }
  // Recover constant decision tables from balanced standard branch trees.
  // Debug/custom execution hooks use the original per-node path.
  for (const root of nodes.values()) {
    if (root.declaration.op !== "flow/branch" || root.constructor !== standard.get("flow/branch")) continue;
    const first = root.values.condition,
      comparison = first?.node === undefined ? undefined : nodes.get(Number(first.node));
    if (!comparison || !["math/lt", "math/eq"].includes(comparison.declaration.op)) continue;
    const selection = comparison.values.a,
      getSelection = reader(selection);
    if (!getSelection || selection?.node === undefined) continue;
    const equal = v => v?.node === selection.node && (v?.socket ?? "value") === (selection.socket ?? "value");
    let size = 0;
    const active = new Set();
    const build = n => {
      if (active.has(n.index) || n.declaration.extension || n.constructor !== standard.get("flow/branch")) return undefined;
      const source = n.values.condition?.node,
        c = source === undefined ? undefined : nodes.get(Number(source));
      if (!c || !outputs[c.index]?.value || c.declaration.extension || c.constructor !== standard.get(c.declaration.op) || !["math/lt", "math/eq"].includes(c.declaration.op) || !equal(c.values.a) || c.values.b?.type === undefined || types[c.values.b.type]?.signature !== "int" || c.values.b.node !== undefined || c.values.b.value?.length !== 1) return undefined;
      active.add(n.index);
      size++;
      const edge = socket => {
        const f = n.flows[socket],
          target = f ? nodes.get(Number(f.node)) : undefined;
        if (!f || !target || !target.INPUT_FLOWS.includes(f.socket ?? "in")) return () => {/*no-op*/};
        return build(target) ?? (() => {
          engine.processExecutingNextNode(f);
          target.processNode(f.socket);
        });
      };
      const result = {
        op: c.declaration.op,
        get limit() {
          return Number(c.values.b.value?.[0]);
        },
        yes: edge("true"),
        no: edge("false")
      };
      active.delete(n.index);
      return result;
    };
    const tree = build(root);
    if (!tree || size < 3) continue;
    const fallback = root.processNode.bind(root);
    root.processNode = socket => {
      if (engine.hasExecutionHooks()) {
        fallback(socket);
        return;
      }
      engine.clearValueEvaluationCache();
      const selected = Number(getSelection());
      let current = tree;
      while (typeof current !== "function") current = (current.op === "math/lt" ? selected < current.limit : selected === current.limit) ? current.yes : current.no;
      current();
    };
  }
}

var TrieNodeType = /*#__PURE__*/function (TrieNodeType) {
  TrieNodeType[TrieNodeType["ROOT"] = 0] = "ROOT";
  TrieNodeType[TrieNodeType["STRING"] = 1] = "STRING";
  TrieNodeType[TrieNodeType["INDEX"] = 2] = "INDEX";
  return TrieNodeType;
}(TrieNodeType || {});
class TrieNode {
  children;
  isEndOfPath;
  trieNodeType;
  setterCallback;
  getterCallback;
  typeName;
  readOnly;
  // the single numeric child; its key is the exclusive upper bound of the indices it matches
  indexKey;
  indexBound;
  constructor(type) {
    this.children = new Map();
    this.isEndOfPath = false;
    this.trieNodeType = type;
    this.readOnly = false;
    this.indexKey = undefined;
    this.indexBound = 0;
  }
  getValue(path) {
    return this.getterCallback?.(path);
  }
  setValue(path, value) {
    this.setterCallback?.(path, value);
  }
}
class JsonPtrTrie {
  root;
  constructor() {
    this.root = new TrieNode(TrieNodeType.ROOT);
  }

  /**
   * Adds a path to the JSON Pointer Trie along with getter and setter callbacks.
   * @param path - The JSON Pointer path to add.
   * @param getterCallback - A callback function to get the value at the specified path.
   * @param setterCallback - A callback function to set the value at the specified path.
   */
  addPath(path, getterCallback, setterCallback, typeName, readOnly) {
    const pathPieces = path.split('/');
    let currentNode = this.root;
    for (let i = 0; i < pathPieces.length; i++) {
      const pathPiece = pathPieces[i];
      if (!currentNode.children.has(pathPiece)) {
        let nodeToSet;
        if (isNaN(Number(pathPiece))) {
          nodeToSet = new TrieNode(TrieNodeType.STRING);
        } else {
          // a numeric segment re-keys the existing index child instead of adding a second one
          if (currentNode.indexKey === undefined) {
            nodeToSet = new TrieNode(TrieNodeType.INDEX);
          } else {
            nodeToSet = currentNode.children.get(currentNode.indexKey);
            currentNode.children.delete(currentNode.indexKey);
          }
          currentNode.indexKey = pathPiece;
          currentNode.indexBound = Number(pathPiece);
        }
        currentNode.children.set(pathPiece, nodeToSet);
      }
      currentNode = currentNode.children.get(pathPiece);
    }
    currentNode.isEndOfPath = true;
    currentNode.getterCallback = getterCallback;
    currentNode.setterCallback = setterCallback;
    currentNode.typeName = typeName;
    currentNode.readOnly = readOnly;
  }
  removePath(path) {
    const pathPieces = path.split('/');
    let currentNode = this.root;
    for (let i = 0; i < pathPieces.length - 1; i++) {
      const pathPiece = pathPieces[i];
      const child = currentNode.children.get(pathPiece);
      if (!child) {
        return;
      }
      currentNode = child;
    }
    const lastPiece = pathPieces[pathPieces.length - 1];
    currentNode.children.delete(lastPiece);
    if (currentNode.indexKey === lastPiece) {
      currentNode.indexKey = undefined;
      currentNode.indexBound = 0;
    }
  }

  /** The registered entry for a JSON pointer, or undefined if the path is not a registered pointer. */
  resolve(path) {
    const node = this.traversePath(path);
    return node !== undefined && node.isEndOfPath ? node : undefined;
  }

  /**
   * Checks if a given JSON Pointer path is valid within the Trie.
   * @param path - The JSON Pointer path to validate.
   * @returns `true` if the path is valid, `false` otherwise.
   */
  isPathValid(path) {
    return this.resolve(path) !== undefined;
  }
  isReadOnly(path) {
    return this.resolve(path)?.readOnly ?? false;
  }

  /**
   * Retrieves the value at a specified JSON Pointer path.
   * @param path - The JSON Pointer path to retrieve the value from.
   * @returns The value at the specified path.
   */
  getPathValue(path) {
    return this.resolve(path)?.getValue(path);
  }
  getPathTypeName(path) {
    return this.resolve(path)?.typeName;
  }

  /**
   * Sets the value at a specified JSON Pointer path.
   * @param path - The JSON Pointer path to set the value for.
   * @param value - The value to set at the specified path.
   */
  setPathValue(path, value) {
    return this.resolve(path)?.setValue(path, value);
  }

  /**
   * Returns all registered paths exactly as they were added to the trie.
   */
  getRegisteredPaths() {
    const paths = [];
    const walk = (node, segments) => {
      if (node.isEndOfPath) {
        paths.push(segments.join("/"));
      }
      for (const [segment, child] of node.children.entries()) {
        walk(child, [...segments, segment]);
      }
    };
    walk(this.root, []);
    return paths.sort();
  }
  traversePath(path) {
    const pathPieces = path.split('/');
    let currentNode = this.root;
    for (let i = 0; i < pathPieces.length; i++) {
      const pathPiece = pathPieces[i];
      let child = currentNode.children.get(pathPiece);
      if (child === undefined) {
        // a numeric piece matches the index child when 0 <= piece < its key
        const index = Number(pathPiece);
        if (isNaN(index) || currentNode.indexKey === undefined || index >= currentNode.indexBound || index < 0) {
          return undefined;
        }
        child = currentNode.children.get(currentNode.indexKey);
      }
      currentNode = child;
    }
    return currentNode;
  }
}

/** Tracks which node instances are NoOpNode, without BehaveEngineNode needing to import NoOp.ts (avoids a circular import, since NoOp.ts extends BehaveEngineNode). */
const noOpNodes = new WeakSet();
function registerNoOpNode(node) {
  noOpNodes.add(node);
}
function isNoOpNode(node) {
  return noOpNodes.has(node);
}

// JSON Pointer Template parsing and effective pointer generation (KHR_interactivity, Object Model Access)

const decodeJsonPointerToken = token => token.replace(/~1/g, "/").replace(/~0/g, "~");
const hasTemplateDelimiter = value => ["[", "]", "{", "}"].some(delimiter => value.includes(delimiter));
const isValidJsonPointer = path => {
  return (path === "" || path.startsWith("/")) && !/(^|[^~])~([^01]|$)/.test(path);
};
const hasOddDelimiterRun = (segment, delimiter) => {
  const escapedDelimiter = delimiter.replace(/[[\]{}]/g, "\\$&");
  return (segment.match(new RegExp(`${escapedDelimiter}+`, "g")) ?? []).some(run => run.length % 2 === 1);
};

// spec: a segment is a parameter if it starts with a single "[" (index) or "{" (ref); doubled brackets are literals
const segmentParameterKind = segment => {
  if (segment[0] === "[" && segment[1] !== "[") return "index";
  if (segment[0] === "{" && segment[1] !== "{") return "ref";
  return undefined;
};
const parsePathTemplate = path => {
  const sockets = [];
  const seenSocketIds = new Set();
  if (!isValidJsonPointer(path)) {
    return {
      valid: false,
      sockets: []
    };
  }
  for (const segment of path.split("/")) {
    if (segment === "[" || segment === "{") {
      return {
        valid: false,
        sockets: []
      };
    }
    const kind = segmentParameterKind(segment);
    if (kind === undefined) {
      if (hasOddDelimiterRun(segment, "[") || hasOddDelimiterRun(segment, "]") || hasOddDelimiterRun(segment, "{") || hasOddDelimiterRun(segment, "}")) {
        return {
          valid: false,
          sockets: []
        };
      }
      continue;
    }
    const encodedId = segment.slice(1, -1);
    if (!segment.endsWith(kind === "index" ? "]" : "}") || encodedId.length === 0 || hasTemplateDelimiter(encodedId)) {
      return {
        valid: false,
        sockets: []
      };
    }
    const id = decodeJsonPointerToken(encodedId);
    if (seenSocketIds.has(id)) {
      return {
        valid: false,
        sockets: []
      };
    }
    seenSocketIds.add(id);
    sockets.push({
      id,
      kind
    });
  }
  return {
    valid: true,
    sockets
  };
};

/** Literal text (doubled brackets already collapsed) alternating with parameter sockets. */

/** Splits a valid template once so effective pointers can be generated without re-parsing it. */
const compilePathTemplate = path => {
  const parts = [];
  let literal = "";
  path.split("/").forEach((segment, i) => {
    if (i > 0) {
      literal += "/";
    }
    const kind = segmentParameterKind(segment);
    if (kind === undefined) {
      literal += segment.replace(/\[\[/g, "[").replace(/]]/g, "]").replace(/{{/g, "{").replace(/}}/g, "}");
      return;
    }
    parts.push(literal, {
      id: decodeJsonPointerToken(segment.slice(1, -1)),
      kind
    });
    literal = "";
  });
  parts.push(literal);
  return parts;
};
const fillPathTemplate = (template, resolve) => {
  let path = "";
  for (const part of template) {
    path += typeof part === "string" ? part : resolve(part);
  }
  return path;
};

// type names per graph `types` array, shared by all nodes of a graph
const typeNameCache = new WeakMap();
const typeSignatureName = type => type?.signature === "custom" && type?.extensions ? Object.keys(type.extensions)[0] : type.signature;
const LITERAL_INPUT = 0;
const CONNECTED_INPUT = 1;
const DEFAULT_INPUT = 2;

// an input socket resolved on first evaluation; reused while the node still holds the same socket object

const warnIfSingleElementArray = val => {
  if (Array.isArray(val) && val.length === 1) {
    console.error("This should not happen – an array with a single value was returned");
  }
};
class BehaveEngineNode {
  REQUIRED_VALUES = {};
  REQUIRED_CONFIGURATIONS = {};
  // input flow socket ids of the operation; empty for value and event operations
  INPUT_FLOWS = [];
  index;
  name;
  world;
  graphEngine;
  idToBehaviourNodeMap;
  flows;
  values;
  outValues;
  declaration;
  variables;
  types;
  events;
  configuration;
  addEventToWorkQueue;
  // all outputs of the last processNode() pull, valid while the engine's evaluation epoch is unchanged
  outputCache;
  outputCacheEpoch = -1;
  typeNameList;
  typeNameSource;
  preparedInputs;
  requiredValueKeys;
  requiredValueKeysSource;
  compiledPointer;
  compiledPointerSource;
  constructor(props) {
    const {
      index,
      flows,
      values,
      idToBehaviourNodeMap,
      graphEngine,
      variables,
      events,
      types,
      configuration,
      addEventToWorkQueue,
      declaration
    } = props;
    this.index = index;
    this.idToBehaviourNodeMap = idToBehaviourNodeMap;
    this.graphEngine = graphEngine;
    this.variables = variables;
    this.types = types;
    this.events = events;
    this.values = values;
    this.flows = flows;
    this.configuration = configuration;
    this.outValues = {};
    this.addEventToWorkQueue = flow => {
      const nextNode = flow?.node === undefined ? undefined : this.idToBehaviourNodeMap.get(Number(flow.node));
      if (nextNode !== undefined && !nextNode.INPUT_FLOWS.includes(flow.socket ?? "in")) {
        return;
      }
      addEventToWorkQueue(flow);
    };
    this.declaration = declaration;
  }

  /**
   * Initializes and returns a new BehaveEngineNode instance.
   * @param props - The properties and settings for the BehaveEngineNode.
   * @returns A new BehaveEngineNode instance.
   */
  static init(props) {
    return new this(props);
  }

  /**
   * Processes the node and its associated flow.
   * @param flowSocket - The socket associated with the flow (optional).
   */
  processNode(flowSocket) {
    if (this.flows !== undefined && this.flows.out !== undefined) {
      this.processFlow(this.flows.out);
    }
  }

  /**
   * Processes a specific flow associated with this node.
   * @param flow - The flow object to be processed.
   */
  processFlow(flow) {
    if (flow === undefined || flow.node === undefined) {
      return;
    }
    const nextNode = this.idToBehaviourNodeMap.get(Number(flow.node));
    // spec: a flow to an input socket the target does not have is unconnected
    if (nextNode === undefined || !nextNode.INPUT_FLOWS.includes(flow.socket ?? "in")) {
      return;
    }
    this.graphEngine.processExecutingNextNode(flow);
    nextNode.processNode(flow.socket);
  }

  /**
   * Validates the presence of required values.
   * @param values - An object containing values to be validated.
   * @throws An error if a required value is missing.
   */
  validateValues(values) {
    Object.keys(this.REQUIRED_VALUES).forEach(requiredValue => {
      if (values == null || values[requiredValue] == null) {
        const err = `Required Value ${requiredValue} is missing for ${this.name}`;
        console.error(err);
        throw new Error(err);
      }
    });
  }

  /**
   * Validates the presence of required configurations.
   * @param configurations - An object containing configurations to be validated.
   * @throws An error if a required configuration is missing.
   */
  validateConfigurations(configurations) {
    let isMissingConfigs = false;
    Object.entries(this.REQUIRED_CONFIGURATIONS).forEach(([key, value]) => {
      if (configurations[key] == null) {
        if (value.defaultValue == null) {
          const err = `Required Configuration ${key} is missing and there is no default value provided for ${this.name}`;
          console.error(err);
          throw new Error(err);
        } else {
          configurations[key] = {
            value: value.defaultValue
          };
          isMissingConfigs = true;
        }
      }
    });
    if (isMissingConfigs) {
      Object.entries(this.REQUIRED_CONFIGURATIONS).forEach(([key, value]) => {
        configurations[key] = {
          value: value.defaultValue
        };
      });
    }

    // spec: value validation (type, range, allowed values) is done by each node, which falls back to its default configuration
  }

  /**
   * Evaluates all values based on their definitions.
   * @param vals - An array of value names to be evaluated.
   * @returns An object containing the evaluated values.
   */
  evaluateAllValues(vals) {
    const res = {};
    for (let i = 0; i < vals.length; i++) {
      res[vals[i]] = this.evaluateValue(vals[i], this.values[vals[i]]);
    }
    return res;
  }

  /** evaluateAllValues over the keys of REQUIRED_VALUES. */
  evaluateRequiredValues() {
    if (this.requiredValueKeysSource !== this.REQUIRED_VALUES) {
      this.requiredValueKeys = Object.keys(this.REQUIRED_VALUES);
      this.requiredValueKeysSource = this.REQUIRED_VALUES;
    }
    return this.evaluateAllValues(this.requiredValueKeys);
  }
  evaluateValue(key, val) {
    if (val === undefined) {
      throw new Error(`Value ${key} is missing for ${this.name}`);
    }
    let input = this.preparedInputs === undefined ? undefined : this.preparedInputs.get(key);
    if (input === undefined || input.source !== val || input.kind === LITERAL_INPUT && (val.value !== input.rawValue || !Object.is(val.value[0], input.rawFirst) || val.type !== input.rawType)) {
      input = this.prepareInput(key, val);
      if (input === undefined) {
        return undefined;
      }
    }
    if (input.kind === LITERAL_INPUT) {
      return input.parsed;
    }
    if (input.kind === CONNECTED_INPUT) {
      const compiled = this.graphEngine.getCompiledOutput(input.node.index, input.socket);
      if (compiled !== undefined) {
        input.source.type = compiled.type;
        return compiled.value;
      }
      const output = this.pullOutput(input.node, input.socket);
      const type = output.type;
      input.source.type = type;
      if (type !== input.typeIndex) {
        input.typeIndex = type;
        input.typeName = this.getType(type);
        const result = this.parseType(input.typeName, output.value);
        warnIfSingleElementArray(result);
        return result;
      }
      return this.parseType(input.typeName, output.value);
    }
    // spec: neither value nor node -> type-default value
    return this.parseType(input.typeName, this.getDefaultValueForType(input.typeName));
  }
  prepareInput(key, val) {
    let input;
    if (val.value != null) {
      const typeName = this.getType(val.type);
      const parsed = this.parseType(typeName, val.value);
      warnIfSingleElementArray(parsed);
      input = {
        source: val,
        kind: LITERAL_INPUT,
        rawValue: val.value,
        rawFirst: val.value[0],
        rawType: val.type,
        parsed,
        typeIndex: val.type,
        typeName,
        node: undefined,
        socket: ""
      };
    } else if (val.node != null) {
      // evaluation writes the resolved type into the socket; write into a copy, not the caller's object
      const source = {
        ...val
      };
      this.values[key] = source;
      const node = this.idToBehaviourNodeMap.get(Number(val.node));
      input = {
        source,
        kind: CONNECTED_INPUT,
        rawValue: undefined,
        rawFirst: undefined,
        rawType: undefined,
        parsed: undefined,
        typeIndex: undefined,
        typeName: "",
        node,
        socket: val.socket
      };
    } else if (val.type != null) {
      input = {
        source: val,
        kind: DEFAULT_INPUT,
        rawValue: undefined,
        rawFirst: undefined,
        rawType: undefined,
        parsed: undefined,
        typeIndex: val.type,
        typeName: this.getType(val.type),
        node: undefined,
        socket: ""
      };
    } else {
      return undefined;
    }
    if (this.preparedInputs === undefined) {
      this.preparedInputs = new Map();
    }
    this.preparedInputs.set(key, input);
    return input;
  }

  // output of another node's socket: this epoch's cached result, then its stored outValues, else process it
  pullOutput(dependentNode, socket) {
    if (dependentNode.outputCacheEpoch === this.graphEngine.valueEvaluationEpoch) {
      const cached = dependentNode.outputCache[socket];
      if (cached !== undefined) {
        return cached;
      }
    }
    const stored = dependentNode.outValues === undefined ? undefined : dependentNode.outValues[socket];
    if (stored !== undefined) {
      return stored;
    }
    const outputs = dependentNode.processNode();
    if (outputs === undefined || outputs[socket] === undefined) {
      if (isNoOpNode(dependentNode)) {
        throw new Error(`"${this.name}" depends on output socket "${socket}" of "${dependentNode.name}", which does not execute or produce output because this tool does not implement its operation.`);
      }
      throw new Error(`Output socket ${socket} is missing on ${dependentNode.name}`);
    }
    dependentNode.outputCache = outputs;
    dependentNode.outputCacheEpoch = this.graphEngine.valueEvaluationEpoch;
    return outputs[socket];
  }

  /**
   * Evaluates all configurations based on their definitions.
   * @param configs - An array of configuration names to be evaluated.
   * @returns An object containing the evaluated configuration values.
   */
  evaluateAllConfigurations(configs) {
    const res = {};
    for (let i = 0; i < configs.length; i++) {
      res[configs[i]] = this.evaluateConfiguration(this.configuration[configs[i]]);
    }
    return res;
  }
  typeNames() {
    let names = this.typeNameList;
    if (names === undefined || this.typeNameSource !== this.types || names.length !== this.types.length) {
      names = typeNameCache.get(this.types);
      if (names === undefined || names.length !== this.types.length) {
        names = this.types.map(typeSignatureName);
        typeNameCache.set(this.types, names);
      }
      this.typeNameList = names;
      this.typeNameSource = this.types;
    }
    return names;
  }
  getType(id) {
    const name = this.typeNames()[id];
    if (name === undefined) {
      console.log(id);
      console.log(this.types);
      return typeSignatureName(this.types[id]);
    }
    return name;
  }
  getTypeIndex(name) {
    return this.typeNames().indexOf(name);
  }
  getDefaultValueForType(type) {
    switch (type) {
      case "ref":
        return [null];
      case "bool":
        return [false];
      case "int":
        return [0];
      case "float":
        return [NaN];
      case "float2":
        return [NaN, NaN];
      case "float3":
        return [NaN, NaN, NaN];
      case "float4":
      case "float2x2":
        return [NaN, NaN, NaN, NaN];
      case "float3x3":
        return [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
      case "float4x4":
        return [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
      default:
        console.error(`No default value for type ${type} returning NaN which is probably not valid`);
        return [NaN];
    }
  }
  parseType(type, val) {
    const scalarValue = Array.isArray(val) ? val[0] : val;
    switch (type) {
      case "bool":
        return scalarValue === "true" || scalarValue === true;
      case "int":
        return Number(scalarValue);
      case "float":
        return Number(scalarValue);
      case "float2":
        return val;
      case "float3":
        return val;
      case "float4":
        return val;
      case "float4x4":
        return val;
      case "ref":
        // spec: a ref literal that cannot be resolved is a null reference; "" is the document root, never an object
        return scalarValue === "" ? null : scalarValue;
      default:
        return val;
    }
  }
  evaluateConfiguration(configuration) {
    return configuration.value;
  }

  // Resolve a "#/..."-style JSON pointer ref down to its trailing id.
  resolveRef = ref => {
    if (ref == null || ref === "") {
      return -1;
    }
    // last non-empty "/" segment
    const str = String(ref);
    let end = str.length;
    while (end > 0 && str.charCodeAt(end - 1) === 47) {
      end--;
    }
    return end === 0 ? -1 : Number(str.slice(str.lastIndexOf("/", end - 1) + 1, end));
  };
  populatePath(path, refs, indices) {
    if (this.compiledPointerSource !== path) {
      this.compiledPointer = compilePathTemplate(path);
      this.compiledPointerSource = path;
    }
    const template = this.compiledPointer;
    if (template.length === 1) {
      return template[0];
    }
    return fillPathTemplate(template, ({
      id,
      kind
    }) => {
      if (kind === "index") {
        return String(indices[id]);
      }
      const index = this.resolveRef(refs[id]);
      if (index === -1) {
        throw new Error(`Invalid reference value for ${id}: ${refs[id]}`);
      }
      return index.toString();
    });
  }

  // spec pointer/set + pointer/interpolate steps 2-4: negative index, null ref, unresolvable,
  // type mismatch or immutable property -> undefined (caller activates err)
  resolveWritablePointer(pointer, refs, indices, typeName) {
    for (const id in indices) {
      if (Number(indices[id]) < 0) {
        return undefined;
      }
    }
    for (const id in refs) {
      if (this.resolveRef(refs[id]) === -1) {
        return undefined;
      }
    }
    const path = this.populatePath(pointer, refs, indices);
    const entry = this.graphEngine.resolveJsonPtr(path);
    if (entry === undefined || entry.typeName !== typeName || entry.readOnly) {
      return undefined;
    }
    return {
      path,
      entry
    };
  }
  parsePathRefVariables(path) {
    return this.parsePathTemplateSockets(path, "ref");
  }
  parsePathIndexVariables(path) {
    return this.parsePathTemplateSockets(path, "index");
  }

  // spec: an invalid pointer template makes the node invalid and the graph must be rejected
  parsePathTemplateSockets(path, kind) {
    const {
      valid,
      sockets
    } = parsePathTemplate(path);
    if (!valid) {
      throw new Error(`Invalid JSON pointer template: ${path}`);
    }
    return sockets.filter(socket => socket.kind === kind).map(socket => socket.id);
  }
}

class OnStartNode extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "OnStart";
    this.outValues.event = {
      value: [`/extensions/KHR_interactivity/events/${this.events.length}`],
      type: this.getTypeIndex('ref')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return super.processNode(flowSocket);
  }
}

class OnTickNode extends BehaveEngineNode {
  _startTime = NaN;
  _lastTickTime = NaN;
  _floatTypeIndex = -1;
  _refTypeIndex = -1;
  constructor(props) {
    super(props);
    this.name = "OnTick";
    this._floatTypeIndex = this.getTypeIndex('float');
    this._refTypeIndex = this.getTypeIndex('ref');
    this.outValues.event = {
      value: [`/extensions/KHR_interactivity/events/${this.events.length + 1}`],
      type: this._refTypeIndex
    };
    this.outValues.timeSinceStart = {
      value: [NaN],
      type: this._floatTypeIndex
    };
    this.outValues.timeSinceLastTick = {
      value: [NaN],
      type: this._floatTypeIndex
    };
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    const tickTime = this.graphEngine.lastTickTime / 1000;
    if (isNaN(this._startTime)) {
      this.outValues.timeSinceStart = {
        value: [0],
        type: this._floatTypeIndex
      };
      this.outValues.timeSinceLastTick = {
        value: [NaN],
        type: this._floatTypeIndex
      };
      this._startTime = tickTime;
    } else {
      this.outValues.timeSinceStart = {
        value: [tickTime - this._startTime],
        type: this._floatTypeIndex
      };
      this.outValues.timeSinceLastTick = {
        value: [tickTime - this._lastTickTime],
        type: this._floatTypeIndex
      };
    }
    this._lastTickTime = tickTime;
    return super.processNode(flowSocket);
  }
}

class Branch extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    condition: {}
  };
  constructor(props) {
    super(props);
    this.name = "Branch";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      condition
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    if (typeof condition === "boolean" ? condition : JSON.parse(condition)) {
      if (this.flows.true != null) {
        this.processFlow(this.flows.true);
      }
    } else {
      if (this.flows.false != null) {
        this.processFlow(this.flows.false);
      }
    }
  }
}

class DoN extends BehaveEngineNode {
  INPUT_FLOWS = ["in", "reset"];
  REQUIRED_VALUES = {
    n: {}
  };
  _currentCount;
  constructor(props) {
    super(props);
    this.name = "DoN";
    this.validateValues(this.values);
    this._currentCount = 0;
    this.outValues.currentCount = {
      value: [this._currentCount],
      type: this.getTypeIndex('int')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      n
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    if (flowSocket === "reset") {
      this._currentCount = 0;
      this.outValues.currentCount = {
        value: [this._currentCount],
        type: this.getTypeIndex('int')
      };
      return;
    }
    if (this._currentCount >= Number(n)) {
      return;
    }
    this._currentCount++;
    this.outValues.currentCount = {
      value: [this._currentCount],
      type: this.getTypeIndex('int')
    };
    super.processNode(flowSocket);
  }
}

class ForLoop extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    initialIndex: {
      defaultValue: [0]
    }
  };
  REQUIRED_VALUES = {
    startIndex: {},
    endIndex: {}
  };
  _initialIndex;
  constructor(props) {
    super(props);
    this.name = "ForLoop";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      initialIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    // spec: initialIndex must be an int32, otherwise the default configuration (0) is used
    const init = initialIndex?.[0];
    this._initialIndex = init === (init | 0) ? init : 0;
    this.outValues.index = {
      value: [this._initialIndex],
      type: this.getTypeIndex('int')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      startIndex
    } = this.evaluateAllValues(["startIndex"]);
    this.graphEngine.processNodeStarted(this);
    // spec: index = startIndex, then re-evaluate endIndex before each iteration; index is never forced to endIndex
    let index = Number(startIndex);
    const intType = this.getTypeIndex('int');
    this.outValues.index = {
      value: [index],
      type: intType
    };
    const evaluateEndIndex = () => {
      this.graphEngine.clearValueEvaluationCache();
      return Number(this.evaluateAllValues(["endIndex"]).endIndex);
    };
    while (index < evaluateEndIndex()) {
      if (this.flows.loopBody != null) {
        this.processFlow(this.flows.loopBody);
      }
      index++;
      this.outValues.index = {
        value: [index],
        type: intType
      };
    }
    if (this.flows.completed != null) {
      this.processFlow(this.flows.completed);
    }
  }
}

class MultiGate extends BehaveEngineNode {
  INPUT_FLOWS = ["in", "reset"];
  REQUIRED_CONFIGURATIONS = {
    isRandom: {
      defaultValue: [false]
    },
    isLoop: {
      defaultValue: [false]
    }
  };
  _numberOutputFlows;
  _currentIndex;
  _isRandom;
  _isLoop;
  _orderedOutFlows;
  _unSeenOutIndexes;
  constructor(props) {
    super(props);
    this.name = "MultiGate";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      isRandom,
      isLoop
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._numberOutputFlows = Object.keys(this.flows).length;
    // spec: if any configuration value is invalid, the node uses the default configuration
    const isValid = typeof isRandom?.[0] === "boolean" && typeof isLoop?.[0] === "boolean";
    this._isRandom = isValid ? isRandom[0] : false;
    this._isLoop = isValid ? isLoop[0] : false;
    this._orderedOutFlows = Object.keys(this.flows).sort();
    this._unSeenOutIndexes = Array(this._numberOutputFlows).fill(0).map((_, index) => index);
    this._currentIndex = this._isRandom ? Math.floor(Math.random() * this._unSeenOutIndexes.length) : 0;
    this.outValues.lastIndex = {
      value: [-1],
      type: this.getTypeIndex('int')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    this.graphEngine.processNodeStarted(this);
    if (flowSocket === "reset") {
      this._currentIndex = this._isRandom ? Math.floor(Math.random() * this._unSeenOutIndexes.length) : 0;
      this._unSeenOutIndexes = Array(this._numberOutputFlows).fill(0).map((_, index) => index);
      this.outValues.lastIndex = {
        value: [-1],
        type: this.getTypeIndex('int')
      };
      return;
    }
    if (this._unSeenOutIndexes.length === 0) {
      return;
    }
    const currentFlowName = this._orderedOutFlows[this._unSeenOutIndexes[this._currentIndex]];
    this.outValues.lastIndex = {
      value: [this._unSeenOutIndexes[this._currentIndex]],
      type: this.getTypeIndex('int')
    };
    this.processFlow(this.flows[currentFlowName]);
    this._unSeenOutIndexes.splice(this._currentIndex, 1);
    if (this._unSeenOutIndexes.length === 0) {
      if (this._isLoop) {
        this._unSeenOutIndexes = Array(this._numberOutputFlows).fill(0).map((_, index) => index);
      } else {
        return;
      }
    }
    if (this._isRandom) {
      this._currentIndex = Math.floor(Math.random() * this._unSeenOutIndexes.length);
    } else {
      this._currentIndex = this._currentIndex % this._unSeenOutIndexes.length;
    }
  }
}

class Sequence extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  _numberOutputFlows;
  constructor(props) {
    super(props);
    this.name = "Sequence";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    this._numberOutputFlows = Object.keys(this.flows).length;
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    this.graphEngine.processNodeStarted(this);
    const flows = Object.keys(this.flows).sort();
    for (let i = 0; i < flows.length; i++) {
      const flow = this.flows[flows[i]];
      if (!flow) continue;
      this.processFlow(flow);
    }
  }
}

class Switch extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    cases: {
      defaultValue: []
    }
  };
  REQUIRED_VALUES = {
    selection: {}
  };
  _cases;
  constructor(props) {
    super(props);
    this.name = "Switch";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      cases
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    // spec: non-int32 cases -> default configuration (no cases); duplicate cases are ignored
    const isValid = Array.isArray(cases) && cases.every(c => c === (c | 0));
    this._cases = isValid ? [...new Set(cases)] : [];
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.clearValueEvaluationCache();
    const {
      selection
    } = this.evaluateRequiredValues();
    // spec: only configured cases route to their flow; anything else takes the default flow
    const selected = this._cases.includes(Number(selection)) ? this.flows[String(selection)] : this.flows.default;
    if (selected != null) {
      this.processFlow(selected);
    }
  }
}

class Throttle extends BehaveEngineNode {
  INPUT_FLOWS = ["in", "reset"];
  REQUIRED_VALUES = {
    duration: {}
  };
  _lastRemainingTime;
  _lastSuccessfulCall;
  constructor(props) {
    super(props);
    this.name = "Throttle";
    this.validateValues(this.values);
    this._lastRemainingTime = NaN;
    this.outValues.lastRemainingTime = {
      value: [NaN],
      type: this.getTypeIndex('float')
    };
    this._lastSuccessfulCall = 0;
  }
  processNode(flowSocket) {
    if (flowSocket === "reset") {
      this._lastRemainingTime = NaN;
      this.outValues.lastRemainingTime = {
        value: [NaN],
        type: this.getTypeIndex('float')
      };
      return;
    }
    this.graphEngine.clearValueEvaluationCache();
    const {
      duration
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    if (isNaN(duration) || !isFinite(duration) || duration < 0) {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
    } else {
      const now = this.graphEngine.lastTickTime;
      if (!isNaN(this._lastRemainingTime)) {
        const timeSinceLastCall = now - this._lastSuccessfulCall;
        if (timeSinceLastCall < duration * 1000) {
          // throttle
          this._lastRemainingTime = duration - timeSinceLastCall / 1000;
          this.outValues.lastRemainingTime = {
            value: [duration - timeSinceLastCall / 1000],
            type: this.getTypeIndex('float')
          };
          return;
        }
      }
      this._lastRemainingTime = 0;
      this.outValues.lastRemainingTime = {
        value: [0],
        type: this.getTypeIndex('float')
      };
      this._lastSuccessfulCall = now;
      super.processNode(flowSocket);
    }
  }
}

class WaitAll extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    inputFlows: {
      defaultValue: [0]
    }
  };
  _lockedFlows;
  _numberInputFlows;
  constructor(props) {
    super(props);
    this.name = "WaitAll";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      inputFlows
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    // spec: inputFlows must be an integer in [0, 64], otherwise the default configuration (0) is used
    const count = inputFlows?.[0];
    this._numberInputFlows = Number.isInteger(count) && count >= 0 && count <= 64 ? count : 0;
    this._lockedFlows = [...Array(this._numberInputFlows).keys()];
    // spec: numbered input flows "0".."n-1" plus reset; there is no "in"
    this.INPUT_FLOWS = [...this._lockedFlows.map(String), "reset"];
    this.outValues.remainingInputs = {
      value: [this._lockedFlows.length],
      type: this.getTypeIndex('int')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    this.graphEngine.processNodeStarted(this);
    if (flowSocket === "reset") {
      this._lockedFlows = [...Array(this._numberInputFlows).keys()];
      this.outValues.remainingInputs = {
        value: [this._lockedFlows.length],
        type: this.getTypeIndex('int')
      };
      return;
    }
    const flowIndexToRemove = this._lockedFlows.findIndex(flow => flow === Number(flowSocket));
    if (flowIndexToRemove !== -1) {
      this._lockedFlows.splice(flowIndexToRemove, 1);
    }
    this.outValues.remainingInputs = {
      value: [this._lockedFlows.length],
      type: this.getTypeIndex('int')
    };
    if (this._lockedFlows.length === 0) {
      if (this.flows.completed != null) {
        this.processFlow(this.flows.completed);
      }
    } else {
      if (this.flows.out != null) {
        this.processFlow(this.flows.out);
      }
    }
  }
}

class WhileLoop extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    condition: {}
  };
  constructor(props) {
    super(props);
    this.name = "WhileLoop";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.clearValueEvaluationCache();
    let condition = this.evaluateRequiredValues().condition;
    while (condition) {
      if (this.flows.loopBody != null) {
        this.processFlow(this.flows.loopBody);
      }
      this.graphEngine.clearValueEvaluationCache();
      condition = this.evaluateRequiredValues().condition;
    }
    if (this.flows.completed != null) {
      this.processFlow(this.flows.completed);
    }
  }
}

class PointerGet extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    pointer: {},
    type: {}
  };
  _pointer;
  _refs;
  _indices;
  _typeIndex;
  constructor(props) {
    super(props);
    this.name = "PointerGet";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      pointer,
      type
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._pointer = pointer[0];
    this._typeIndex = type[0];
    this._refs = this.parsePathRefVariables(this._pointer);
    this._indices = this.parsePathIndexVariables(this._pointer);
  }
  processNode(flowSocket) {
    const configValues = this.evaluateAllValues(this._refs);
    const configIndices = this.evaluateAllValues(this._indices);
    const populatedPath = this.populatePath(this._pointer, configValues, configIndices);
    this.graphEngine.processNodeStarted(this);
    const pointer = this.graphEngine.resolveJsonPtr(populatedPath);
    if (pointer !== undefined) {
      const configuredTypeName = this.getType(this._typeIndex);
      if (pointer.typeName !== configuredTypeName) {
        return {
          'value': {
            value: this.getDefaultValueForType(configuredTypeName),
            type: this._typeIndex
          },
          'isValid': {
            value: [false],
            type: this.getTypeIndex('bool')
          }
        };
      }
      const value = pointer.getValue(populatedPath);
      if (value !== undefined) {
        return {
          'value': {
            value,
            type: this._typeIndex
          },
          'isValid': {
            value: [true],
            type: this.getTypeIndex('bool')
          }
        };
      } else {
        return {
          'value': {
            value: this.getDefaultValueForType(configuredTypeName),
            type: this._typeIndex
          },
          'isValid': {
            value: [false],
            type: this.getTypeIndex('bool')
          }
        };
      }
    } else {
      const typeName = this.getType(this._typeIndex);
      return {
        'value': {
          value: this.getDefaultValueForType(typeName),
          type: this._typeIndex
        },
        'isValid': {
          value: [false],
          type: this.getTypeIndex('bool')
        }
      };
    }
  }
}

class PointerSet extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    pointer: {},
    type: {}
  };
  REQUIRED_VALUES = {
    value: {}
  };
  _pointer;
  _refs;
  _indices;
  _typeIndex;
  constructor(props) {
    super(props);
    this.name = "PointerSet";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      pointer,
      type
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._pointer = pointer[0];
    this._typeIndex = type[0];
    this._refs = this.parsePathRefVariables(this._pointer);
    this._indices = this.parsePathIndexVariables(this._pointer);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const configValues = this.evaluateAllValues(this._refs);
    const configIndices = this.evaluateAllValues(this._indices);
    const requiredValues = this.evaluateRequiredValues();
    const targetValue = requiredValues.value;
    this.graphEngine.processNodeStarted(this);
    const pointer = this.resolveWritablePointer(this._pointer, configValues, configIndices, this.getType(this._typeIndex));
    if (pointer === undefined) {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
      return;
    }
    this.graphEngine.clearPointerInterpolation(pointer.path);
    pointer.entry.setValue(pointer.path, targetValue);
    super.processNode(flowSocket);
  }
}

let InteractivityValueType = /*#__PURE__*/(/* unused pure expression or super */ null && (function (InteractivityValueType) {
  InteractivityValueType["INT"] = "int";
  InteractivityValueType["BOOLEAN"] = "bool";
  InteractivityValueType["FLOAT"] = "float";
  InteractivityValueType["FLOAT2"] = "float2";
  InteractivityValueType["FLOAT3"] = "float3";
  InteractivityValueType["FLOAT4"] = "float4";
  InteractivityValueType["FLOAT2X2"] = "float2x2";
  InteractivityValueType["FLOAT3X3"] = "float3x3";
  InteractivityValueType["FLOAT4X4"] = "float4x4";
  InteractivityValueType["CUSTOM"] = "custom";
  InteractivityValueType["REF"] = "ref";
  return InteractivityValueType;
}({})));
/**
 * Event-bus channel for a custom event. Events with an `id` use it (external dispatchers address
 * them by id); id-less events are internal-only, so they get an index-keyed channel that can't
 * collide with an id.
 */
const getCustomEventChannel = (event, index) => event?.id ? `KHR_INTERACTIVITY:${event.id}` : `KHR_INTERACTIVITY_INTERNAL:${index}`;
let InteractivityConfigurationValueType = /*#__PURE__*/(/* unused pure expression or super */ null && (function (InteractivityConfigurationValueType) {
  InteractivityConfigurationValueType["INT"] = "int";
  InteractivityConfigurationValueType["BOOLEAN"] = "bool";
  InteractivityConfigurationValueType["INT_ARR"] = "int[]";
  InteractivityConfigurationValueType["STRING"] = "string";
  return InteractivityConfigurationValueType;
}({})));

// copy of a default output, so a consumer mutating a received value cannot change the default
const copyOutput = output => ({
  value: Array.isArray(output.value) ? output.value.slice() : output.value,
  type: output.type
});
class Receive extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    event: {}
  };
  _defaultValues = {};
  // declared event values: type index as declared and its resolved type name
  _valueTypes = new Map();
  _event;
  _eventRefOutput;
  constructor(props) {
    super(props);
    this.name = "CustomEventReceiveNode";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      event
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._event = event[0];
    this._eventRefOutput = {
      value: [`/extensions/KHR_interactivity/events/${this._event + 2}`],
      type: this.getTypeIndex('ref')
    };
    this.setUpEventListener();
  }
  setUpEventListener() {
    const {
      event
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    const customEventDesc = this.events[event[0]];
    const defaultValues = {};
    Object.entries(customEventDesc.values ?? {}).forEach(([key, value]) => {
      const typeName = this.getType(value.type);
      let defaultVal = this.getDefaultValueForType(typeName);
      if (value.value) {
        // if there is a given default value in the CE then use that
        defaultVal = value.value;
      }
      defaultValues[key] = {
        value: defaultVal,
        type: value.type
      };
      this._valueTypes.set(key, {
        type: value.type,
        typeName
      });
    });
    defaultValues.event = this._eventRefOutput;
    this._defaultValues = defaultValues;
    this.outValues = this.defaultOutputs({});
    this.graphEngine.addCustomEventListener(getCustomEventChannel(customEventDesc, event[0]), e => {
      if (this.graphEngine.isEventPropagationCancelled(this._eventRefOutput.value[0])) {
        return;
      }
      this.graphEngine.processNodeStarted(this);
      const ce = e.detail;
      // values missing from the event fall back to their defaults
      const outValues = this.defaultOutputs(ce);
      for (const ceKey in ce) {
        const declared = this._valueTypes.get(ceKey);
        if (declared === undefined) {
          throw new Error(`Event value ${ceKey} is not declared on event ${customEventDesc.name ?? customEventDesc.id ?? `#${event[0]}`}`);
        }
        outValues[ceKey] = {
          value: this.parseType(declared.typeName, [ce[ceKey]]),
          type: declared.type
        };
      }
      this.outValues = outValues;
      super.processNode();
    });
  }
  defaultOutputs(provided) {
    const outputs = {};
    for (const key in this._defaultValues) {
      if (!(key in provided)) {
        outputs[key] = copyOutput(this._defaultValues[key]);
      }
    }
    return outputs;
  }
  parseType(type, val) {
    switch (type) {
      case "bool":
        return [JSON.parse(val[0]) === true];
      case "int":
        return [Number(val[0])];
      case "float":
        return [Number(val[0])];
      case "float2":
        return this.parseMaybeJSON(val[0]);
      case "float3":
        return this.parseMaybeJSON(val[0]);
      case "float4":
        return this.parseMaybeJSON(val[0]);
      case "float2x2":
        return this.parseMaybeJSON(val[0]);
      case "float3x3":
        return this.parseMaybeJSON(val[0]);
      case "float4x4":
        return this.parseMaybeJSON(val[0]);
      default:
        return val;
    }
  }
  parseMaybeJSON(input) {
    try {
      let inputCopy = input;
      if (typeof input === "string") {
        inputCopy = JSON.parse(input);
      }

      // Create copy of array, otherwise use JSON.parse for copying objects.
      // This avoids issues with Float32Array that are parsed incorrectly via the JSON functions.
      if (inputCopy.slice) {
        inputCopy = inputCopy.slice(0);
      } else {
        inputCopy = JSON.parse(JSON.stringify(inputCopy));
      }
      return inputCopy;
    } catch (e) {
      throw new Error("Error while parsing JSON in event/receive");
    }
  }
}

class Send extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    event: {}
  };
  _event;
  _valueKeys;
  constructor(props) {
    super(props);
    this.name = "Send";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      event
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._event = event[0];
  }
  processNode(flowSocket) {
    const customEventDesc = this.events[this._event];
    this.graphEngine.clearValueEvaluationCache();
    if (this._valueKeys === undefined) {
      this._valueKeys = Object.keys(customEventDesc.values ?? {});
    }
    const vals = this.evaluateAllValues(this._valueKeys);
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.dispatchCustomEvent(getCustomEventChannel(customEventDesc, this._event), vals);
    super.processNode(flowSocket);
  }
}

class VariableGet extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    variable: {}
  };
  _variable;
  constructor(props) {
    super(props);
    this.name = "VariableGetNode";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      variable
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._variable = variable[0];
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    const variable = this.variables[this._variable];
    return {
      value: {
        value: variable.value,
        type: variable.type
      }
    };
  }
}

class VariableSet extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    variables: {}
  };
  _variables;
  _variableKeys;
  constructor(props) {
    super(props);
    this.name = "VariableSet";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      variables
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    if (typeof variables[0] === "string") {
      this._variables = JSON.parse(variables);
    } else {
      this._variables = variables;
    }
    if (!Array.isArray(this._variables)) {
      this._variables = [this._variables];
    }
    this._variableKeys = this._variables.map(variable => variable.toString());
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const vals = this.evaluateAllValues(this._variableKeys);
    this.graphEngine.processNodeStarted(this);
    for (const variableId of this._variables) {
      this.graphEngine.clearVariableInterpolation(variableId);
      const value = vals[variableId.toString()];
      if (Array.isArray(value)) {
        this.variables[variableId].value = value;
      } else {
        this.variables[variableId].value = [value];
      }
    }
    super.processNode(flowSocket);
  }
}

class AbsoluteValue extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "AbsoluteValueNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "int":
        val = [Math.abs(a) | 0];
        break;
      case "float":
        val = [Math.abs(a)];
        break;
      case "float2":
        val = [Math.abs(a[0]), Math.abs(a[1])];
        break;
      case "float3":
        val = [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])];
        break;
      case "float4":
        val = [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3])];
        break;
      case "float2x2":
        val = [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3])];
        break;
      case "float3x3":
        val = [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3]), Math.abs(a[4]), Math.abs(a[5]), Math.abs(a[6]), Math.abs(a[7]), Math.abs(a[8])];
        break;
      case "float4x4":
        val = [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2]), Math.abs(a[3]), Math.abs(a[4]), Math.abs(a[5]), Math.abs(a[6]), Math.abs(a[7]), Math.abs(a[8]), Math.abs(a[9]), Math.abs(a[10]), Math.abs(a[11]), Math.abs(a[12]), Math.abs(a[13]), Math.abs(a[14]), Math.abs(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Euler extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "EulerNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        value: [Math.E],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Pi extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "PiNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        value: [Math.PI],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Tau extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "TauNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        value: [2 * Math.PI],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Sign extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "SignNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "int":
      case "float":
        val = [Math.sign(a)];
        break;
      case "float2":
        val = [Math.sign(a[0]), Math.sign(a[1])];
        break;
      case "float3":
        val = [Math.sign(a[0]), Math.sign(a[1]), Math.sign(a[2])];
        break;
      case "float4":
        val = [Math.sign(a[0]), Math.sign(a[1]), Math.sign(a[2]), Math.sign(a[3])];
        break;
      case "float2x2":
        val = [Math.sign(a[0]), Math.sign(a[1]), Math.sign(a[2]), Math.sign(a[3])];
        break;
      case "float3x3":
        val = [Math.sign(a[0]), Math.sign(a[1]), Math.sign(a[2]), Math.sign(a[3]), Math.sign(a[4]), Math.sign(a[5]), Math.sign(a[6]), Math.sign(a[7]), Math.sign(a[8])];
        break;
      case "float4x4":
        val = [Math.sign(a[0]), Math.sign(a[1]), Math.sign(a[2]), Math.sign(a[3]), Math.sign(a[4]), Math.sign(a[5]), Math.sign(a[6]), Math.sign(a[7]), Math.sign(a[8]), Math.sign(a[9]), Math.sign(a[10]), Math.sign(a[11]), Math.sign(a[12]), Math.sign(a[13]), Math.sign(a[14]), Math.sign(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Truncate extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "TruncateNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.trunc(a)];
        break;
      case "float2":
        val = [Math.trunc(a[0]), Math.trunc(a[1])];
        break;
      case "float3":
        val = [Math.trunc(a[0]), Math.trunc(a[1]), Math.trunc(a[2])];
        break;
      case "float4":
        val = [Math.trunc(a[0]), Math.trunc(a[1]), Math.trunc(a[2]), Math.trunc(a[3])];
        break;
      case "float2x2":
        val = [Math.trunc(a[0]), Math.trunc(a[1]), Math.trunc(a[2]), Math.trunc(a[3])];
        break;
      case "float3x3":
        val = [Math.trunc(a[0]), Math.trunc(a[1]), Math.trunc(a[2]), Math.trunc(a[3]), Math.trunc(a[4]), Math.trunc(a[5]), Math.trunc(a[6]), Math.trunc(a[7]), Math.trunc(a[8])];
        break;
      case "float4x4":
        val = [Math.trunc(a[0]), Math.trunc(a[1]), Math.trunc(a[2]), Math.trunc(a[3]), Math.trunc(a[4]), Math.trunc(a[5]), Math.trunc(a[6]), Math.trunc(a[7]), Math.trunc(a[8]), Math.trunc(a[9]), Math.trunc(a[10]), Math.trunc(a[11]), Math.trunc(a[12]), Math.trunc(a[13]), Math.trunc(a[14]), Math.trunc(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Floor extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "FloorNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.floor(a)];
        break;
      case "float2":
        val = [Math.floor(a[0]), Math.floor(a[1])];
        break;
      case "float3":
        val = [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2])];
        break;
      case "float4":
        val = [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3])];
        break;
      case "float2x2":
        val = [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3])];
        break;
      case "float3x3":
        val = [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3]), Math.floor(a[4]), Math.floor(a[5]), Math.floor(a[6]), Math.floor(a[7]), Math.floor(a[8])];
        break;
      case "float4x4":
        val = [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2]), Math.floor(a[3]), Math.floor(a[4]), Math.floor(a[5]), Math.floor(a[6]), Math.floor(a[7]), Math.floor(a[8]), Math.floor(a[9]), Math.floor(a[10]), Math.floor(a[11]), Math.floor(a[12]), Math.floor(a[13]), Math.floor(a[14]), Math.floor(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Ceil extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CeilNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.ceil(a)];
        break;
      case "float2":
        val = [Math.ceil(a[0]), Math.ceil(a[1])];
        break;
      case "float3":
        val = [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2])];
        break;
      case "float4":
        val = [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3])];
        break;
      case "float2x2":
        val = [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3])];
        break;
      case "float3x3":
        val = [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3]), Math.ceil(a[4]), Math.ceil(a[5]), Math.ceil(a[6]), Math.ceil(a[7]), Math.ceil(a[8])];
        break;
      case "float4x4":
        val = [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2]), Math.ceil(a[3]), Math.ceil(a[4]), Math.ceil(a[5]), Math.ceil(a[6]), Math.ceil(a[7]), Math.ceil(a[8]), Math.ceil(a[9]), Math.ceil(a[10]), Math.ceil(a[11]), Math.ceil(a[12]), Math.ceil(a[13]), Math.ceil(a[14]), Math.ceil(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Round extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "RoundNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [round(a)];
        break;
      case "float2":
        val = [round(a[0]), round(a[1])];
        break;
      case "float3":
        val = [round(a[0]), round(a[1]), round(a[2])];
        break;
      case "float4":
        val = [round(a[0]), round(a[1]), round(a[2]), round(a[3])];
        break;
      case "float2x2":
        val = [round(a[0]), round(a[1]), round(a[2]), round(a[3])];
        break;
      case "float3x3":
        val = [round(a[0]), round(a[1]), round(a[2]), round(a[3]), round(a[4]), round(a[5]), round(a[6]), round(a[7]), round(a[8])];
        break;
      case "float4x4":
        val = [round(a[0]), round(a[1]), round(a[2]), round(a[3]), round(a[4]), round(a[5]), round(a[6]), round(a[7]), round(a[8]), round(a[9]), round(a[10]), round(a[11]), round(a[12]), round(a[13]), round(a[14]), round(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    function round(a) {
      return a < 0 ? -Math.round(-a) : Math.round(a);
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Negate extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "NegateNode";
    this.validateValues(this.values);
  }
  negate(a) {
    return -a | 0;
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "int":
        val = [-a | 0];
        break;
      case "float":
        val = [a * -1];
        break;
      case "float2":
        val = [a[0] * -1, a[1] * -1];
        break;
      case "float3":
        val = [a[0] * -1, a[1] * -1, a[2] * -1];
        break;
      case "float4":
        val = [a[0] * -1, a[1] * -1, a[2] * -1, a[3] * -1];
        break;
      case "float2x2":
        val = [a[0] * -1, a[1] * -1, a[2] * -1, a[3] * -1];
        break;
      case "float3x3":
        val = [a[0] * -1, a[1] * -1, a[2] * -1, a[3] * -1, a[4] * -1, a[5] * -1, a[6] * -1, a[7] * -1, a[8] * -1];
        break;
      case "float4x4":
        val = [a[0] * -1, a[1] * -1, a[2] * -1, a[3] * -1, a[4] * -1, a[5] * -1, a[6] * -1, a[7] * -1, a[8] * -1, a[9] * -1, a[10] * -1, a[11] * -1, a[12] * -1, a[13] * -1, a[14] * -1, a[15] * -1];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Add extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "AddNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
        val = [a + b | 0];
        break;
      case "float":
        val = [a + b];
        break;
      case "float2":
        val = [a[0] + b[0], a[1] + b[1]];
        break;
      case "float3":
        val = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
        break;
      case "float4":
        val = [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
        break;
      case "float2x2":
        val = [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
        break;
      case "float3x3":
        val = [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4], a[5] + b[5], a[6] + b[6], a[7] + b[7], a[8] + b[8]];
        break;
      case "float4x4":
        val = [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4], a[5] + b[5], a[6] + b[6], a[7] + b[7], a[8] + b[8], a[9] + b[9], a[10] + b[10], a[11] + b[11], a[12] + b[12], a[13] + b[13], a[14] + b[14], a[15] + b[15]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Subtract extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "SubtractNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
        val = [a - b | 0];
        break;
      case "float":
        val = [a - b];
        break;
      case "float2":
        val = [a[0] - b[0], a[1] - b[1]];
        break;
      case "float3":
        val = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
        break;
      case "float4":
        val = [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
        break;
      case "float2x2":
        val = [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
        break;
      case "float3x3":
        val = [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3], a[4] - b[4], a[5] - b[5], a[6] - b[6], a[7] - b[7], a[8] - b[8]];
        break;
      case "float4x4":
        val = [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3], a[4] - b[4], a[5] - b[5], a[6] - b[6], a[7] - b[7], a[8] - b[8], a[9] - b[9], a[10] - b[10], a[11] - b[11], a[12] - b[12], a[13] - b[13], a[14] - b[14], a[15] - b[15]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Multiply extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "MultiplyNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
        val = [Math.imul(a, b)];
        break;
      case "float":
        val = [a * b];
        break;
      case "float2":
        val = [a[0] * b[0], a[1] * b[1]];
        break;
      case "float3":
        val = [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
        break;
      case "float4":
        val = [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]];
        break;
      case "float2x2":
        val = [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3]];
        break;
      case "float3x3":
        val = [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3], a[4] * b[4], a[5] * b[5], a[6] * b[6], a[7] * b[7], a[8] * b[8]];
        break;
      case "float4x4":
        val = [a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3], a[4] * b[4], a[5] * b[5], a[6] * b[6], a[7] * b[7], a[8] * b[8], a[9] * b[9], a[10] * b[10], a[11] * b[11], a[12] * b[12], a[13] * b[13], a[14] * b[14], a[15] * b[15]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Divide extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "DivideNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
        val = [a / b | 0];
        break;
      case "float":
        val = [a / b];
        break;
      case "float2":
        val = [a[0] / b[0], a[1] / b[1]];
        break;
      case "float3":
        val = [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
        break;
      case "float4":
        val = [a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3]];
        break;
      case "float2x2":
        val = [a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3]];
        break;
      case "float3x3":
        val = [a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3], a[4] / b[4], a[5] / b[5], a[6] / b[6], a[7] / b[7], a[8] / b[8]];
        break;
      case "float4x4":
        val = [a[0] / b[0], a[1] / b[1], a[2] / b[2], a[3] / b[3], a[4] / b[4], a[5] / b[5], a[6] / b[6], a[7] / b[7], a[8] / b[8], a[9] / b[9], a[10] / b[10], a[11] / b[11], a[12] / b[12], a[13] / b[13], a[14] / b[14], a[15] / b[15]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Remainder extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "RemainderNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
        val = [a % b | 0];
        break;
      case "float":
        val = [a % b];
        break;
      case "float2":
        val = [a[0] % b[0], a[1] % b[1]];
        break;
      case "float3":
        val = [a[0] % b[0], a[1] % b[1], a[2] % b[2]];
        break;
      case "float4":
        val = [a[0] % b[0], a[1] % b[1], a[2] % b[2], a[3] % b[3]];
        break;
      case "float2x2":
        val = [a[0] % b[0], a[1] % b[1], a[2] % b[2], a[3] % b[3]];
        break;
      case "float3x3":
        val = [a[0] % b[0], a[1] % b[1], a[2] % b[2], a[3] % b[3], a[4] % b[4], a[5] % b[5], a[6] % b[6], a[7] % b[7], a[8] % b[8]];
        break;
      case "float4x4":
        val = [a[0] % b[0], a[1] % b[1], a[2] % b[2], a[3] % b[3], a[4] % b[4], a[5] % b[5], a[6] % b[6], a[7] % b[7], a[8] % b[8], a[9] % b[9], a[10] % b[10], a[11] % b[11], a[12] % b[12], a[13] % b[13], a[14] % b[14], a[15] % b[15]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Min extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "MinNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = [Math.min(a, b)];
        break;
      case "float2":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
        break;
      case "float3":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2])];
        break;
      case "float4":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
        break;
      case "float2x2":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
        break;
      case "float3x3":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3]), Math.min(a[4], b[4]), Math.min(a[5], b[5]), Math.min(a[6], b[6]), Math.min(a[7], b[7]), Math.min(a[8], b[8])];
        break;
      case "float4x4":
        val = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3]), Math.min(a[4], b[4]), Math.min(a[5], b[5]), Math.min(a[6], b[6]), Math.min(a[7], b[7]), Math.min(a[8], b[8]), Math.min(a[9], b[9]), Math.min(a[10], b[10]), Math.min(a[11], b[11]), Math.min(a[12], b[12]), Math.min(a[13], b[13]), Math.min(a[14], b[14]), Math.min(a[15], b[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Max extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "MaxNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = [Math.max(a, b)];
        break;
      case "float2":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
        break;
      case "float3":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2])];
        break;
      case "float4":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
        break;
      case "float2x2":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
        break;
      case "float3x3":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3]), Math.max(a[4], b[4]), Math.max(a[5], b[5]), Math.max(a[6], b[6]), Math.max(a[7], b[7]), Math.max(a[8], b[8])];
        break;
      case "float4x4":
        val = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3]), Math.max(a[4], b[4]), Math.max(a[5], b[5]), Math.max(a[6], b[6]), Math.max(a[7], b[7]), Math.max(a[8], b[8]), Math.max(a[9], b[9]), Math.max(a[10], b[10]), Math.max(a[11], b[11]), Math.max(a[12], b[12]), Math.max(a[13], b[13]), Math.max(a[14], b[14]), Math.max(a[15], b[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Mix extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "MixNode";
    this.validateValues(this.values);
  }
  mix = (a, b, t) => {
    return a + t * (b - a);
  };
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float":
        val = [this.mix(a, b, c)];
        break;
      case "float2":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1])];
        break;
      case "float3":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1]), this.mix(a[2], b[2], c[2])];
        break;
      case "float4":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1]), this.mix(a[2], b[2], c[2]), this.mix(a[3], b[3], c[3])];
        break;
      case "float2x2":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1]), this.mix(a[2], b[2], c[2]), this.mix(a[3], b[3], c[3])];
        break;
      case "float3x3":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1]), this.mix(a[2], b[2], c[2]), this.mix(a[3], b[3], c[3]), this.mix(a[4], b[4], c[4]), this.mix(a[5], b[5], c[5]), this.mix(a[6], b[6], c[6]), this.mix(a[7], b[7], c[7]), this.mix(a[8], b[8], c[8])];
        break;
      case "float4x4":
        val = [this.mix(a[0], b[0], c[0]), this.mix(a[1], b[1], c[1]), this.mix(a[2], b[2], c[2]), this.mix(a[3], b[3], c[3]), this.mix(a[4], b[4], c[4]), this.mix(a[5], b[5], c[5]), this.mix(a[6], b[6], c[6]), this.mix(a[7], b[7], c[7]), this.mix(a[8], b[8], c[8]), this.mix(a[9], b[9], c[9]), this.mix(a[10], b[10], c[10]), this.mix(a[11], b[11], c[11]), this.mix(a[12], b[12], c[12]), this.mix(a[13], b[13], c[13]), this.mix(a[14], b[14], c[14]), this.mix(a[15], b[15], c[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Saturate extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "SaturateNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.min(Math.max(a, 0.0), 1.0)];
        break;
      case "float2":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0)];
        break;
      case "float3":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0), Math.min(Math.max(a[2], 0.0), 1.0)];
        break;
      case "float4":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0), Math.min(Math.max(a[2], 0.0), 1.0), Math.min(Math.max(a[3], 0.0), 1.0)];
        break;
      case "float2x2":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0), Math.min(Math.max(a[2], 0.0), 1.0), Math.min(Math.max(a[3], 0.0), 1.0)];
        break;
      case "float3x3":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0), Math.min(Math.max(a[2], 0.0), 1.0), Math.min(Math.max(a[3], 0.0), 1.0), Math.min(Math.max(a[4], 0.0), 1.0), Math.min(Math.max(a[5], 0.0), 1.0), Math.min(Math.max(a[6], 0.0), 1.0), Math.min(Math.max(a[7], 0.0), 1.0), Math.min(Math.max(a[8], 0.0), 1.0)];
        break;
      case "float4x4":
        val = [Math.min(Math.max(a[0], 0.0), 1.0), Math.min(Math.max(a[1], 0.0), 1.0), Math.min(Math.max(a[2], 0.0), 1.0), Math.min(Math.max(a[3], 0.0), 1.0), Math.min(Math.max(a[4], 0.0), 1.0), Math.min(Math.max(a[5], 0.0), 1.0), Math.min(Math.max(a[6], 0.0), 1.0), Math.min(Math.max(a[7], 0.0), 1.0), Math.min(Math.max(a[8], 0.0), 1.0), Math.min(Math.max(a[9], 0.0), 1.0), Math.min(Math.max(a[10], 0.0), 1.0), Math.min(Math.max(a[11], 0.0), 1.0), Math.min(Math.max(a[12], 0.0), 1.0), Math.min(Math.max(a[13], 0.0), 1.0), Math.min(Math.max(a[14], 0.0), 1.0), Math.min(Math.max(a[15], 0.0), 1.0)];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Clamp extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "ClampNode";
    this.validateValues(this.values);
  }
  clamp(a, b, c) {
    return Math.min(Math.max(a, Math.min(b, c)), Math.max(b, c));
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const typeIndexC = this.values['c'].type;
    const typeC = this.getType(typeIndexC);
    if (typeA !== typeB || typeB !== typeC) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = [this.clamp(a, b, c)];
        break;
      case "float2":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1])];
        break;
      case "float3":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1]), this.clamp(a[2], b[2], c[2])];
        break;
      case "float4":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1]), this.clamp(a[2], b[2], c[2]), this.clamp(a[3], b[3], c[3])];
        break;
      case "float2x2":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1]), this.clamp(a[2], b[2], c[2]), this.clamp(a[3], b[3], c[3])];
        break;
      case "float3x3":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1]), this.clamp(a[2], b[2], c[2]), this.clamp(a[3], b[3], c[3]), this.clamp(a[4], b[4], c[4]), this.clamp(a[5], b[5], c[5]), this.clamp(a[6], b[6], c[6]), this.clamp(a[7], b[7], c[7]), this.clamp(a[8], b[8], c[8])];
        break;
      case "float4x4":
        val = [this.clamp(a[0], b[0], c[0]), this.clamp(a[1], b[1], c[1]), this.clamp(a[2], b[2], c[2]), this.clamp(a[3], b[3], c[3]), this.clamp(a[4], b[4], c[4]), this.clamp(a[5], b[5], c[5]), this.clamp(a[6], b[6], c[6]), this.clamp(a[7], b[7], c[7]), this.clamp(a[8], b[8], c[8]), this.clamp(a[9], b[9], c[9]), this.clamp(a[10], b[10], c[10]), this.clamp(a[11], b[11], c[11]), this.clamp(a[12], b[12], c[12]), this.clamp(a[13], b[13], c[13]), this.clamp(a[14], b[14], c[14]), this.clamp(a[15], b[15], c[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class DegreeToRadians extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "DegreeToRadiansNode";
    this.validateValues(this.values);
  }
  degreeToRadians(a) {
    return a * Math.PI / 180;
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [this.degreeToRadians(a)];
        break;
      case "float2":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1])];
        break;
      case "float3":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1]), this.degreeToRadians(a[2])];
        break;
      case "float4":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1]), this.degreeToRadians(a[2]), this.degreeToRadians(a[3])];
        break;
      case "float2x2":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1]), this.degreeToRadians(a[2]), this.degreeToRadians(a[3])];
        break;
      case "float3x3":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1]), this.degreeToRadians(a[2]), this.degreeToRadians(a[3]), this.degreeToRadians(a[4]), this.degreeToRadians(a[5]), this.degreeToRadians(a[6]), this.degreeToRadians(a[7]), this.degreeToRadians(a[8])];
        break;
      case "float4x4":
        val = [this.degreeToRadians(a[0]), this.degreeToRadians(a[1]), this.degreeToRadians(a[2]), this.degreeToRadians(a[3]), this.degreeToRadians(a[4]), this.degreeToRadians(a[5]), this.degreeToRadians(a[6]), this.degreeToRadians(a[7]), this.degreeToRadians(a[8]), this.degreeToRadians(a[9]), this.degreeToRadians(a[10]), this.degreeToRadians(a[11]), this.degreeToRadians(a[12]), this.degreeToRadians(a[13]), this.degreeToRadians(a[14]), this.degreeToRadians(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class RadiansToDegrees extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "RadiansToDegreesNode";
    this.validateValues(this.values);
  }
  radiansToDegrees(a) {
    return a * 180 / Math.PI;
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [this.radiansToDegrees(a)];
        break;
      case "float2":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1])];
        break;
      case "float3":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1]), this.radiansToDegrees(a[2])];
        break;
      case "float4":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1]), this.radiansToDegrees(a[2]), this.radiansToDegrees(a[3])];
        break;
      case "float2x2":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1]), this.radiansToDegrees(a[2]), this.radiansToDegrees(a[3])];
        break;
      case "float3x3":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1]), this.radiansToDegrees(a[2]), this.radiansToDegrees(a[3]), this.radiansToDegrees(a[4]), this.radiansToDegrees(a[5]), this.radiansToDegrees(a[6]), this.radiansToDegrees(a[7]), this.radiansToDegrees(a[8])];
        break;
      case "float4x4":
        val = [this.radiansToDegrees(a[0]), this.radiansToDegrees(a[1]), this.radiansToDegrees(a[2]), this.radiansToDegrees(a[3]), this.radiansToDegrees(a[4]), this.radiansToDegrees(a[5]), this.radiansToDegrees(a[6]), this.radiansToDegrees(a[7]), this.radiansToDegrees(a[8]), this.radiansToDegrees(a[9]), this.radiansToDegrees(a[10]), this.radiansToDegrees(a[11]), this.radiansToDegrees(a[12]), this.radiansToDegrees(a[13]), this.radiansToDegrees(a[14]), this.radiansToDegrees(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Sine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "SineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.sin(a)];
        break;
      case "float2":
        val = [Math.sin(a[0]), Math.sin(a[1])];
        break;
      case "float3":
        val = [Math.sin(a[0]), Math.sin(a[1]), Math.sin(a[2])];
        break;
      case "float4":
        val = [Math.sin(a[0]), Math.sin(a[1]), Math.sin(a[2]), Math.sin(a[3])];
        break;
      case "float2x2":
        val = [Math.sin(a[0]), Math.sin(a[1]), Math.sin(a[2]), Math.sin(a[3])];
        break;
      case "float3x3":
        val = [Math.sin(a[0]), Math.sin(a[1]), Math.sin(a[2]), Math.sin(a[3]), Math.sin(a[4]), Math.sin(a[5]), Math.sin(a[6]), Math.sin(a[7]), Math.sin(a[8])];
        break;
      case "float4x4":
        val = [Math.sin(a[0]), Math.sin(a[1]), Math.sin(a[2]), Math.sin(a[3]), Math.sin(a[4]), Math.sin(a[5]), Math.sin(a[6]), Math.sin(a[7]), Math.sin(a[8]), Math.sin(a[9]), Math.sin(a[10]), Math.sin(a[11]), Math.sin(a[12]), Math.sin(a[13]), Math.sin(a[14]), Math.sin(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Cosine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CosineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.cos(a)];
        break;
      case "float2":
        val = [Math.cos(a[0]), Math.cos(a[1])];
        break;
      case "float3":
        val = [Math.cos(a[0]), Math.cos(a[1]), Math.cos(a[2])];
        break;
      case "float4":
        val = [Math.cos(a[0]), Math.cos(a[1]), Math.cos(a[2]), Math.cos(a[3])];
        break;
      case "float2x2":
        val = [Math.cos(a[0]), Math.cos(a[1]), Math.cos(a[2]), Math.cos(a[3])];
        break;
      case "float3x3":
        val = [Math.cos(a[0]), Math.cos(a[1]), Math.cos(a[2]), Math.cos(a[3]), Math.cos(a[4]), Math.cos(a[5]), Math.cos(a[6]), Math.cos(a[7]), Math.cos(a[8])];
        break;
      case "float4x4":
        val = [Math.cos(a[0]), Math.cos(a[1]), Math.cos(a[2]), Math.cos(a[3]), Math.cos(a[4]), Math.cos(a[5]), Math.cos(a[6]), Math.cos(a[7]), Math.cos(a[8]), Math.cos(a[9]), Math.cos(a[10]), Math.cos(a[11]), Math.cos(a[12]), Math.cos(a[13]), Math.cos(a[14]), Math.cos(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Tangent extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "TangentNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.tan(a)];
        break;
      case "float2":
        val = [Math.tan(a[0]), Math.tan(a[1])];
        break;
      case "float3":
        val = [Math.tan(a[0]), Math.tan(a[1]), Math.tan(a[2])];
        break;
      case "float4":
        val = [Math.tan(a[0]), Math.tan(a[1]), Math.tan(a[2]), Math.tan(a[3])];
        break;
      case "float2x2":
        val = [Math.tan(a[0]), Math.tan(a[1]), Math.tan(a[2]), Math.tan(a[3])];
        break;
      case "float3x3":
        val = [Math.tan(a[0]), Math.tan(a[1]), Math.tan(a[2]), Math.tan(a[3]), Math.tan(a[4]), Math.tan(a[5]), Math.tan(a[6]), Math.tan(a[7]), Math.tan(a[8]), Math.tan(a[12]), Math.tan(a[13]), Math.tan(a[14])];
        break;
      case "float4x4":
        val = [Math.tan(a[0]), Math.tan(a[1]), Math.tan(a[2]), Math.tan(a[3]), Math.tan(a[4]), Math.tan(a[5]), Math.tan(a[6]), Math.tan(a[7]), Math.tan(a[8]), Math.tan(a[9]), Math.tan(a[10]), Math.tan(a[11]), Math.tan(a[12]), Math.tan(a[13]), Math.tan(a[14]), Math.tan(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Arcsine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "ArcsineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.asin(a)];
        break;
      case "float2":
        val = [Math.asin(a[0]), Math.asin(a[1])];
        break;
      case "float3":
        val = [Math.asin(a[0]), Math.asin(a[1]), Math.asin(a[2])];
        break;
      case "float4":
        val = [Math.asin(a[0]), Math.asin(a[1]), Math.asin(a[2]), Math.asin(a[3])];
        break;
      case "float2x2":
        val = [Math.asin(a[0]), Math.asin(a[1]), Math.asin(a[2]), Math.asin(a[3])];
        break;
      case "float3x3":
        val = [Math.asin(a[0]), Math.asin(a[1]), Math.asin(a[2]), Math.asin(a[3]), Math.asin(a[4]), Math.asin(a[5]), Math.asin(a[6]), Math.asin(a[7]), Math.asin(a[8])];
        break;
      case "float4x4":
        val = [Math.asin(a[0]), Math.asin(a[1]), Math.asin(a[2]), Math.asin(a[3]), Math.asin(a[4]), Math.asin(a[5]), Math.asin(a[6]), Math.asin(a[7]), Math.asin(a[8]), Math.asin(a[9]), Math.asin(a[10]), Math.asin(a[11]), Math.asin(a[12]), Math.asin(a[13]), Math.asin(a[14]), Math.asin(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Arccosine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "ArccosineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.acos(a)];
        break;
      case "float2":
        val = [Math.acos(a[0]), Math.acos(a[1])];
        break;
      case "float3":
        val = [Math.acos(a[0]), Math.acos(a[1]), Math.acos(a[2])];
        break;
      case "float4":
        val = [Math.acos(a[0]), Math.acos(a[1]), Math.acos(a[2]), Math.acos(a[3])];
        break;
      case "float2x2":
        val = [Math.acos(a[0]), Math.acos(a[1]), Math.acos(a[2]), Math.acos(a[3])];
        break;
      case "float3x3":
        val = [Math.acos(a[0]), Math.acos(a[1]), Math.acos(a[2]), Math.acos(a[3]), Math.acos(a[4]), Math.acos(a[5]), Math.acos(a[6]), Math.acos(a[7]), Math.acos(a[8])];
        break;
      case "float4x4":
        val = [Math.acos(a[0]), Math.acos(a[1]), Math.acos(a[2]), Math.acos(a[3]), Math.acos(a[4]), Math.acos(a[5]), Math.acos(a[6]), Math.acos(a[7]), Math.acos(a[8]), Math.acos(a[9]), Math.acos(a[10]), Math.acos(a[11]), Math.acos(a[12]), Math.acos(a[13]), Math.acos(a[14]), Math.acos(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Arctangent extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "ArctangentNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.atan(a)];
        break;
      case "float2":
        val = [Math.atan(a[0]), Math.atan(a[1])];
        break;
      case "float3":
        val = [Math.atan(a[0]), Math.atan(a[1]), Math.atan(a[2])];
        break;
      case "float4":
        val = [Math.atan(a[0]), Math.atan(a[1]), Math.atan(a[2]), Math.atan(a[3])];
        break;
      case "float2x2":
        val = [Math.atan(a[0]), Math.atan(a[1]), Math.atan(a[2]), Math.atan(a[3])];
        break;
      case "float3x3":
        val = [Math.atan(a[0]), Math.atan(a[1]), Math.atan(a[2]), Math.atan(a[3]), Math.atan(a[4]), Math.atan(a[5]), Math.atan(a[6]), Math.atan(a[7]), Math.atan(a[8])];
        break;
      case "float4x4":
        val = [Math.atan(a[0]), Math.atan(a[1]), Math.atan(a[2]), Math.atan(a[3]), Math.atan(a[4]), Math.atan(a[5]), Math.atan(a[6]), Math.atan(a[7]), Math.atan(a[8]), Math.atan(a[9]), Math.atan(a[10]), Math.atan(a[11]), Math.atan(a[12]), Math.atan(a[13]), Math.atan(a[14]), Math.atan(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Arctangent2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "Arctangent2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeAIndex = this.values['a'].type;
    const typeA = this.getType(typeAIndex);
    const typeBIndex = this.values['b'].type;
    const typeB = this.getType(typeBIndex);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float":
        val = [Math.atan2(a, b)];
        break;
      case "float2":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1])];
        break;
      case "float3":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1]), Math.atan2(a[2], b[2])];
        break;
      case "float4":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1]), Math.atan2(a[2], b[2]), Math.atan2(a[3], b[3])];
        break;
      case "float2x2":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1]), Math.atan2(a[2], b[2]), Math.atan2(a[3], b[3])];
        break;
      case "float3x3":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1]), Math.atan2(a[2], b[2]), Math.atan2(a[3], b[3]), Math.atan2(a[4], b[4]), Math.atan2(a[5], b[5]), Math.atan2(a[6], b[6]), Math.atan2(a[7], b[7]), Math.atan2(a[8], b[8])];
        break;
      case "float4x4":
        val = [Math.atan2(a[0], b[0]), Math.atan2(a[1], b[1]), Math.atan2(a[2], b[2]), Math.atan2(a[3], b[3]), Math.atan2(a[4], b[4]), Math.atan2(a[5], b[5]), Math.atan2(a[6], b[6]), Math.atan2(a[7], b[7]), Math.atan2(a[8], b[8]), Math.atan2(a[9], b[9]), Math.atan2(a[10], b[10]), Math.atan2(a[11], b[11]), Math.atan2(a[12], b[12]), Math.atan2(a[13], b[13]), Math.atan2(a[14], b[14]), Math.atan2(a[15], b[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeAIndex
      }
    };
  }
}

class Log extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "LogNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.log(a)];
        break;
      case "float2":
        val = [Math.log(a[0]), Math.log(a[1])];
        break;
      case "float3":
        val = [Math.log(a[0]), Math.log(a[1]), Math.log(a[2])];
        break;
      case "float4":
        val = [Math.log(a[0]), Math.log(a[1]), Math.log(a[2]), Math.log(a[3])];
        break;
      case "float2x2":
        val = [Math.log(a[0]), Math.log(a[1]), Math.log(a[2]), Math.log(a[3])];
        break;
      case "float3x3":
        val = [Math.log(a[0]), Math.log(a[1]), Math.log(a[2]), Math.log(a[3]), Math.log(a[4]), Math.log(a[5]), Math.log(a[6]), Math.log(a[7]), Math.log(a[8])];
        break;
      case "float4x4":
        val = [Math.log(a[0]), Math.log(a[1]), Math.log(a[2]), Math.log(a[3]), Math.log(a[4]), Math.log(a[5]), Math.log(a[6]), Math.log(a[7]), Math.log(a[8]), Math.log(a[9]), Math.log(a[10]), Math.log(a[11]), Math.log(a[12]), Math.log(a[13]), Math.log(a[14]), Math.log(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Log2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Log2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.log2(a)];
        break;
      case "float2":
        val = [Math.log2(a[0]), Math.log2(a[1])];
        break;
      case "float3":
        val = [Math.log2(a[0]), Math.log2(a[1]), Math.log2(a[2])];
        break;
      case "float4":
        val = [Math.log2(a[0]), Math.log2(a[1]), Math.log2(a[2]), Math.log2(a[3])];
        break;
      case "float2x2":
        val = [Math.log2(a[0]), Math.log2(a[1]), Math.log2(a[2]), Math.log2(a[3])];
        break;
      case "float3x3":
        val = [Math.log2(a[0]), Math.log2(a[1]), Math.log2(a[2]), Math.log2(a[3]), Math.log2(a[4]), Math.log2(a[5]), Math.log2(a[6]), Math.log2(a[7]), Math.log2(a[8])];
        break;
      case "float4x4":
        val = [Math.log2(a[0]), Math.log2(a[1]), Math.log2(a[2]), Math.log2(a[3]), Math.log2(a[4]), Math.log2(a[5]), Math.log2(a[6]), Math.log2(a[7]), Math.log2(a[8]), Math.log2(a[9]), Math.log2(a[10]), Math.log2(a[11]), Math.log2(a[12]), Math.log2(a[13]), Math.log2(a[14]), Math.log2(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Log10 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Log10Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.log10(a)];
        break;
      case "float2":
        val = [Math.log10(a[0]), Math.log10(a[1])];
        break;
      case "float3":
        val = [Math.log10(a[0]), Math.log10(a[1]), Math.log10(a[2])];
        break;
      case "float4":
        val = [Math.log10(a[0]), Math.log10(a[1]), Math.log10(a[2]), Math.log10(a[3])];
        break;
      case "float2x2":
        val = [Math.log10(a[0]), Math.log10(a[1]), Math.log10(a[2]), Math.log10(a[3])];
        break;
      case "float3x3":
        val = [Math.log10(a[0]), Math.log10(a[1]), Math.log10(a[2]), Math.log10(a[3]), Math.log10(a[4]), Math.log10(a[5]), Math.log10(a[6]), Math.log10(a[7]), Math.log10(a[8])];
        break;
      case "float4x4":
        val = [Math.log10(a[0]), Math.log10(a[1]), Math.log10(a[2]), Math.log10(a[3]), Math.log10(a[4]), Math.log10(a[5]), Math.log10(a[6]), Math.log10(a[7]), Math.log10(a[8]), Math.log10(a[9]), Math.log10(a[10]), Math.log10(a[11]), Math.log10(a[12]), Math.log10(a[13]), Math.log10(a[14]), Math.log10(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Power extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "PowerNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float":
        val = [Math.pow(a, b)];
        break;
      case "float2":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1])];
        break;
      case "float3":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2])];
        break;
      case "float4":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2]), Math.pow(a[3], b[3])];
        break;
      case "float2x2":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2]), Math.pow(a[3], b[3])];
        break;
      case "float3x3":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2]), Math.pow(a[3], b[3]), Math.pow(a[4], b[4]), Math.pow(a[5], b[5]), Math.pow(a[6], b[6]), Math.pow(a[7], b[7]), Math.pow(a[8], b[8])];
        break;
      case "float4x4":
        val = [Math.pow(a[0], b[0]), Math.pow(a[1], b[1]), Math.pow(a[2], b[2]), Math.pow(a[3], b[3]), Math.pow(a[4], b[4]), Math.pow(a[5], b[5]), Math.pow(a[6], b[6]), Math.pow(a[7], b[7]), Math.pow(a[8], b[8]), Math.pow(a[9], b[9]), Math.pow(a[10], b[10]), Math.pow(a[11], b[11]), Math.pow(a[12], b[12]), Math.pow(a[13], b[13]), Math.pow(a[14], b[14]), Math.pow(a[15], b[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class SquareRoot extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "SquareRootNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.sqrt(a)];
        break;
      case "float2":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1])];
        break;
      case "float3":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1]), Math.sqrt(a[2])];
        break;
      case "float4":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1]), Math.sqrt(a[2]), Math.sqrt(a[3])];
        break;
      case "float2x2":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1]), Math.sqrt(a[2]), Math.sqrt(a[3])];
        break;
      case "float3x3":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1]), Math.sqrt(a[2]), Math.sqrt(a[3]), Math.sqrt(a[4]), Math.sqrt(a[5]), Math.sqrt(a[6]), Math.sqrt(a[7]), Math.sqrt(a[8])];
        break;
      case "float4x4":
        val = [Math.sqrt(a[0]), Math.sqrt(a[1]), Math.sqrt(a[2]), Math.sqrt(a[3]), Math.sqrt(a[4]), Math.sqrt(a[5]), Math.sqrt(a[6]), Math.sqrt(a[7]), Math.sqrt(a[8]), Math.sqrt(a[9]), Math.sqrt(a[10]), Math.sqrt(a[11]), Math.sqrt(a[12]), Math.sqrt(a[13]), Math.sqrt(a[14]), Math.sqrt(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class CubeRoot extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CubeRootNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;

    // MATRIX TO FIX AND ALL REST EXPONENTIAL
    switch (type) {
      case "float":
        val = [Math.cbrt(a)];
        break;
      case "float2":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1])];
        break;
      case "float3":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1]), Math.cbrt(a[2])];
        break;
      case "float4":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1]), Math.cbrt(a[2]), Math.cbrt(a[3])];
        break;
      case "float2x2":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1]), Math.cbrt(a[2]), Math.cbrt(a[3])];
        break;
      case "float3x3":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1]), Math.cbrt(a[2]), Math.cbrt(a[3]), Math.cbrt(a[4]), Math.cbrt(a[5]), Math.cbrt(a[6]), Math.cbrt(a[7]), Math.cbrt(a[8])];
        break;
      case "float4x4":
        val = [Math.cbrt(a[0]), Math.cbrt(a[1]), Math.cbrt(a[2]), Math.cbrt(a[3]), Math.cbrt(a[4]), Math.cbrt(a[5]), Math.cbrt(a[6]), Math.cbrt(a[7]), Math.cbrt(a[8]), Math.cbrt(a[9]), Math.cbrt(a[10]), Math.cbrt(a[11]), Math.cbrt(a[12]), Math.cbrt(a[13]), Math.cbrt(a[14]), Math.cbrt(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Random extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "RandomNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        id: "value",
        value: [Math.random()],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Dot extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "DotNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float2":
        val = a[0] * b[0] + a[1] * b[1];
        break;
      case "float3":
        val = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        break;
      case "float4":
        val = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Cross extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "CrossNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float3":
        val = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Normalize extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "NormalizeNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    let isValid = true;
    switch (type) {
      case "float2":
        // eslint-disable-next-line no-case-declarations
        const length2 = Math.hypot(a[0], a[1]);
        if (length2 === 0 || isNaN(length2) || !isFinite(length2)) {
          val = [0, 0];
          isValid = false;
        } else {
          val = [a[0] / length2, a[1] / length2];
        }
        break;
      case "float3":
        // eslint-disable-next-line no-case-declarations
        const length3 = Math.hypot(a[0], a[1], a[2]);
        if (length3 === 0 || isNaN(length3) || !isFinite(length3)) {
          val = [0, 0, 0];
          isValid = false;
        } else {
          val = [a[0] / length3, a[1] / length3, a[2] / length3];
        }
        break;
      case "float4":
        // eslint-disable-next-line no-case-declarations
        const length4 = Math.hypot(a[0], a[1], a[2], a[3]);
        if (length4 === 0 || isNaN(length4) || !isFinite(length4)) {
          val = [0, 0, 0, 0];
          isValid = false;
        } else {
          val = [a[0] / length4, a[1] / length4, a[2] / length4, a[3] / length4];
        }
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      },
      'isValid': {
        value: isValid,
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class Rotate2D extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    angle: {}
  };
  constructor(props) {
    super(props);
    this.name = "Rotate2DNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      angle
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexAngle = this.values['angle'].type;
    const typeAngle = this.getType(typeIndexAngle);
    if (typeAngle !== "float") {
      throw Error("Invalid type");
    }
    let val;
    switch (typeA) {
      case "float2":
        // eslint-disable-next-line no-case-declarations
        const cosTheta = Math.cos(Number(angle));
        // eslint-disable-next-line no-case-declarations
        const sinTheta = Math.sin(Number(angle));

        // eslint-disable-next-line no-case-declarations
        const rotationMatrix = [[cosTheta, -sinTheta], [sinTheta, cosTheta]];
        val = [a[0] * rotationMatrix[0][0] + a[1] * rotationMatrix[0][1], a[0] * rotationMatrix[1][0] + a[1] * rotationMatrix[1][1]];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Rotate3D extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    rotation: {}
  };
  constructor(props) {
    super(props);
    this.name = "Rotate3DNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      rotation
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexRotation = this.values['rotation'].type;
    const typeRotation = this.getType(typeIndexRotation);
    if (typeA !== "float3") {
      throw Error("a input should be a float3");
    }
    if (typeRotation !== "float4") {
      throw Error("rotation input should be a float4");
    }
    const r = [rotation[0], rotation[1], rotation[2]];
    const rCrossA = this.cross(r, a);
    const rCrossRCrossA = this.cross(r, rCrossA);
    const val = [a[0] + 2 * (rCrossRCrossA[0] + rotation[3] * rCrossA[0]), a[1] + 2 * (rCrossRCrossA[1] + rotation[3] * rCrossA[1]), a[2] + 2 * (rCrossRCrossA[2] + rotation[3] * rCrossA[2])];
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
  cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
}

class VectorLength extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "VectorLengthNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float2":
      case "float3":
      case "float4":
        val = Math.hypot(...a);
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class IsInfNode extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "IsInfNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = Math.abs(Number(a)) === Infinity;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class IsNaNNode extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "IsNaNNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = isNaN(Number(a));
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class LessThanOrEqualTo extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "LessOrEqualToNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = a <= b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class LessThan extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "LessThanNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = a < b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class Equality extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "EqualityNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error(`input types not equivalent: a=${typeA}, b=${typeB}, values=${JSON.stringify(this.values)}`);
    }
    let val;
    switch (typeA) {
      case "bool":
        val = JSON.parse(a) === JSON.parse(b);
        break;
      case "int":
      case "float":
        val = a === b;
        break;
      case "float2":
        val = a[0] === b[0] && a[1] === b[1];
        break;
      case "float3":
        val = a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
        break;
      case "float4":
        val = a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        break;
      case "float2x2":
        val = a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        break;
      case "float3x3":
        val = a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
        break;
      case "float4x4":
        val = a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class GreaterThanOrEqualTo extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "GreaterThanOrEqualToNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = a >= b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        id: "value",
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class GreaterThan extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "GreaterThanNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "int":
      case "float":
        val = a > b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class Inf extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "InfNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        value: [Infinity],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class SetDelay extends BehaveEngineNode {
  INPUT_FLOWS = ["in", "cancel"];
  REQUIRED_VALUES = {
    duration: {}
  };
  _runningDelayIndices;
  constructor(props) {
    super(props);
    this.name = "SetDelay";
    this.validateValues(this.values);
    this._runningDelayIndices = [];
    this.outValues.lastDelay = {
      value: [null],
      type: this.getTypeIndex('ref')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    if (flowSocket === "cancel") {
      this.outValues.lastDelay = {
        value: [null],
        type: this.getTypeIndex('ref')
      };
      for (const delayIndex of this._runningDelayIndices) {
        this.graphEngine.cancelScheduledDelay(delayIndex);
      }
      this._runningDelayIndices = [];
      return;
    }
    this.graphEngine.clearValueEvaluationCache();
    const {
      duration
    } = this.evaluateRequiredValues();

    // Browser and Node timers use signed 32-bit millisecond delays. Larger values
    // otherwise wrap or clamp to a near-immediate activation, contrary to the spec.
    if (isNaN(duration) || !isFinite(duration) || duration < 0 || duration * 1000 > 2147483647) {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
    } else {
      const delayIndex = this.graphEngine.scheduledDelays.length;
      const delayId = setTimeout(() => {
        this.graphEngine.removeScheduledDelay(delayIndex);
        this.addEventToWorkQueue(this.flows.done);
      }, duration * 1000);
      this.graphEngine.pushScheduledDelay(delayId, () => {
        this._runningDelayIndices = this._runningDelayIndices.filter(index => index !== delayIndex);
      });
      this._runningDelayIndices.push(delayIndex);
      this.outValues.lastDelay = {
        value: [`/extensions/KHR_interactivity/delays/${delayIndex}`],
        type: this.getTypeIndex('ref')
      };
      this.processFlow(this.flows.out);
    }
  }
}

class CancelDelay extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    delay: {}
  };
  constructor(props) {
    super(props);
    this.name = "CancelDelay";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      delay
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const delayIndex = this.resolveRef(delay);
    this.graphEngine.cancelScheduledDelay(delayIndex);
    this.processFlow(this.flows.out);
  }
}

class NotANumber extends BehaveEngineNode {
  constructor(props) {
    super(props);
    this.name = "NanNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    return {
      'value': {
        value: [NaN],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Select extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    condition: {}
  };
  constructor(props) {
    super(props);
    this.name = "SelectNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      condition
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    const typeIndexCondition = this.values['condition'].type;
    const typeCondition = this.getType(typeIndexCondition);
    if (typeCondition !== "bool") {
      throw Error("condition has invalid type");
    }
    let val = JSON.parse(condition) ? a : b;
    if (typeA === "int" || typeA === "bool" || typeA === "float") {
      val = [val];
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class BoolToInt extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "BoolToInt";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "bool") {
      throw Error("Invalid type");
    }
    const val = JSON.parse(a) | 0;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class BoolToFloat extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "BoolToFloat";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "bool") {
      throw Error("Invalid type");
    }
    const val = +JSON.parse(a);
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class FloatToBool extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "FloatToBool";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "float") {
      throw Error("Invalid type");
    }
    const val = !!a;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class FloatToInt extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "FloatToInt";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "float") {
      throw Error("Invalid type");
    }
    const val = a | 0;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class IntToBool extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "IntToBool";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "int") {
      throw Error("Invalid type");
    }
    const val = !!a;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class IntToFloat extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "IntToFloat";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "int") {
      throw Error("Invalid type");
    }
    const val = a;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Extract2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float2") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Extract3 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract3Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float3") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      },
      '2': {
        value: [a[2]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Extract4 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract4Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float4") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      },
      '2': {
        value: [a[2]],
        type: this.getTypeIndex("float")
      },
      '3': {
        value: [a[3]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Extract2x2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract2x2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float2x2") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      },
      '2': {
        value: [a[2]],
        type: this.getTypeIndex("float")
      },
      '3': {
        value: [a[3]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Extract3x3 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract3x3Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float3x3") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      },
      '2': {
        value: [a[2]],
        type: this.getTypeIndex("float")
      },
      '3': {
        value: [a[3]],
        type: this.getTypeIndex("float")
      },
      '4': {
        value: [a[4]],
        type: this.getTypeIndex("float")
      },
      '5': {
        value: [a[5]],
        type: this.getTypeIndex("float")
      },
      '6': {
        value: [a[6]],
        type: this.getTypeIndex("float")
      },
      '7': {
        value: [a[7]],
        type: this.getTypeIndex("float")
      },
      '8': {
        value: [a[8]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Extract4x4 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "Extract4x4Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float4x4") {
      throw Error("invalid input type");
    }
    return {
      '0': {
        value: [a[0]],
        type: this.getTypeIndex("float")
      },
      '1': {
        value: [a[1]],
        type: this.getTypeIndex("float")
      },
      '2': {
        value: [a[2]],
        type: this.getTypeIndex("float")
      },
      '3': {
        value: [a[3]],
        type: this.getTypeIndex("float")
      },
      '4': {
        value: [a[4]],
        type: this.getTypeIndex("float")
      },
      '5': {
        value: [a[5]],
        type: this.getTypeIndex("float")
      },
      '6': {
        value: [a[6]],
        type: this.getTypeIndex("float")
      },
      '7': {
        value: [a[7]],
        type: this.getTypeIndex("float")
      },
      '8': {
        value: [a[8]],
        type: this.getTypeIndex("float")
      },
      '9': {
        value: [a[9]],
        type: this.getTypeIndex("float")
      },
      '10': {
        value: [a[10]],
        type: this.getTypeIndex("float")
      },
      '11': {
        value: [a[11]],
        type: this.getTypeIndex("float")
      },
      '12': {
        value: [a[12]],
        type: this.getTypeIndex("float")
      },
      '13': {
        value: [a[13]],
        type: this.getTypeIndex("float")
      },
      '14': {
        value: [a[14]],
        type: this.getTypeIndex("float")
      },
      '15': {
        value: [a[15]],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class Combine2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "float" || typeB !== "float") {
      throw Error("invalid input types");
    }
    return {
      'value': {
        value: [a, b],
        type: this.getTypeIndex("float2")
      }
    };
  }
}

class Combine3 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine3Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const typeIndexC = this.values['c'].type;
    const typeC = this.getType(typeIndexC);
    if (typeA !== "float" || typeB !== "float" || typeC !== "float") {
      throw Error("invalid input types");
    }
    return {
      'value': {
        value: [a, b, c],
        type: this.getTypeIndex("float3")
      }
    };
  }
}

class Combine4 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {},
    d: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine4Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c,
      d
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const typeIndexC = this.values['c'].type;
    const typeC = this.getType(typeIndexC);
    const typeIndexD = this.values['d'].type;
    const typeD = this.getType(typeIndexD);
    if (typeA !== "float" || typeB !== "float" || typeC !== "float" || typeD !== "float") {
      throw Error("invalid input types");
    }
    return {
      'value': {
        value: [a, b, c, d],
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class Combine2x2 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {},
    d: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine2x2Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c,
      d
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const characters = ['a', 'b', 'c', 'd'];
    for (let i = 0; i < characters.length; i++) {
      const typeIndex = this.values[characters[i]].type;
      const typ = this.getType(typeIndex);
      if (typ !== "float") {
        throw Error(`invalid input type for ${characters[i]}`);
      }
    }
    return {
      'value': {
        value: [a, b, c, d],
        type: this.getTypeIndex("float2x2")
      }
    };
  }
}

class Combine3x3 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {},
    d: {},
    e: {},
    f: {},
    g: {},
    h: {},
    i: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine3x3Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    for (let i = 0; i < characters.length; i++) {
      const typeIndex = this.values[characters[i]].type;
      const typ = this.getType(typeIndex);
      if (typ !== "float") {
        throw Error(`invalid input type for ${characters[i]}`);
      }
    }
    return {
      'value': {
        value: [a, b, c, d, e, f, g, h, i],
        type: this.getTypeIndex("float3x3")
      }
    };
  }
}

class Combine4x4 extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {},
    d: {},
    e: {},
    f: {},
    g: {},
    h: {},
    i: {},
    j: {},
    k: {},
    l: {},
    m: {},
    n: {},
    o: {},
    p: {}
  };
  constructor(props) {
    super(props);
    this.name = "Combine4x4Node";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
    for (let i = 0; i < characters.length; i++) {
      const typeIndex = this.values[characters[i]].type;
      const typ = this.getType(typeIndex);
      if (typ !== "float") {
        throw Error(`invalid input type for ${characters[i]}`);
      }
    }
    return {
      'value': {
        value: [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p],
        type: this.getTypeIndex("float4x4")
      }
    };
  }
}

class PointerInterpolate extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    pointer: {},
    type: {}
  };
  REQUIRED_VALUES = {
    value: {},
    duration: {},
    p1: {},
    p2: {}
  };
  _pointer;
  _refs;
  _indices;
  _typeIndex;
  constructor(props) {
    super(props);
    this.name = "PointerInterpolate";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      pointer,
      type
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._pointer = pointer[0];
    this._typeIndex = type[0];
    this._refs = this.parsePathRefVariables(this._pointer);
    this._indices = this.parsePathIndexVariables(this._pointer);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const configVals = this.evaluateAllValues(this._refs);
    const configIndices = this.evaluateAllValues(this._indices);
    const requiredVals = this.evaluateRequiredValues();
    const {
      p1,
      p2
    } = this.evaluateAllValues(["p1", "p2"]);
    const targetValue = requiredVals.value;
    const duration = requiredVals.duration;
    this.graphEngine.processNodeStarted(this);
    const valueType = this.getType(this._typeIndex);
    const pointer = this.resolveWritablePointer(this._pointer, configVals, configIndices, valueType);
    if (pointer === undefined || !isValidInterpolationInput(duration, p1, p2)) {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
      return;
    }
    const initialValue = pointer.entry.getValue(pointer.path);
    this.graphEngine.animateCubicBezier(pointer.path, p1, p2, initialValue, targetValue, duration, valueType, () => {
      if (this.flows.done) {
        this.addEventToWorkQueue(this.flows.done);
      }
    });
    if (this.flows.out) {
      this.processFlow(this.flows.out);
    }
  }
}
function isValidInterpolationInput(duration, p1, p2) {
  const durationValue = Number(duration);
  if (Number.isNaN(durationValue) || !Number.isFinite(durationValue) || durationValue < 0) {
    return false;
  }
  return [p1, p2].every(point => {
    if (!Array.isArray(point) || point.length < 2) {
      return false;
    }
    const x = Number(point[0]);
    const y = Number(point[1]);
    return Number.isFinite(x) && Number.isFinite(y) && x >= 0 && x <= 1;
  });
}

class QuatMul extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatMulNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "float4") {
      throw Error(`a should be of type float4, got ${typeA}`);
    }
    if (typeB !== "float4") {
      throw Error(`b should be of type float4, got ${typeB}`);
    }

    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const quatA = Array(4).fill(0);
    quat_set(quatA, a[0], a[1], a[2], a[3]);
    const quatB = Array(4).fill(0);
    quat_set(quatB, b[0], b[1], b[2], b[3]);
    const result = Array(4).fill(0);
    quat_mul(result, quatA, quatB);
    const val = [result[0], result[1], result[2], result[3]];
    return {
      'value': {
        value: val,
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class QuatConjugate extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatConjugateNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    if (type !== "float4") {
      throw Error(`a should be of type float4, got ${type}`);
    }
    const val = [-a[0], -a[1], -a[2], a[3]];
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class QuatFromAxisAngle extends BehaveEngineNode {
  REQUIRED_VALUES = {
    axis: {},
    angle: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatFromAxisAngleNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      axis,
      angle
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexAxis = this.values['axis'].type;
    const typeAxis = this.getType(typeIndexAxis);
    const typeIndexAngle = this.values['angle'].type;
    const typeAngle = this.getType(typeIndexAngle);
    if (typeAxis !== "float3") {
      throw Error(`axis should be of type float3, got ${typeAxis}`);
    }
    if (typeAngle !== "float") {
      throw Error(`angle should be of type float, got ${typeAngle}`);
    }
    const x = axis[0] * Math.sin(Number(angle) / 2);
    const y = axis[1] * Math.sin(Number(angle) / 2);
    const z = axis[2] * Math.sin(Number(angle) / 2);
    const w = Math.cos(Number(angle) / 2);
    const val = [x, y, z, w];
    return {
      'value': {
        value: val,
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class QuatToAxisAngle extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatToAxisAngleNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float4") {
      throw Error(`a should be of type float4, got ${typeA}`);
    }
    if (this.isCloseTo(a[3], 0)) {
      return {
        'axis': {
          value: [1, 0, 0],
          type: this.getTypeIndex("float3")
        },
        'angle': {
          value: [0],
          type: this.getTypeIndex("float")
        }
      };
    }
    const axisX = a[0] / Math.sqrt(1 - a[3] * a[3]);
    const axisY = a[1] / Math.sqrt(1 - a[3] * a[3]);
    const axisZ = a[2] / Math.sqrt(1 - a[3] * a[3]);
    const angle = 2 * Math.acos(a[3]);
    return {
      'axis': {
        value: [axisX, axisY, axisZ],
        type: this.getTypeIndex("float3")
      },
      'angle': {
        value: [angle],
        type: this.getTypeIndex("float")
      }
    };
  }
  isCloseTo(a, b, epsilon = 1e-6) {
    return Math.abs(a - b) < epsilon;
  }
}

const VALID_ORDERS = ["xyz", "xzy", "yxz", "yzx", "zxy", "zyx"];
class QuatFromAngles extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    order: {
      defaultValue: ["yxz"]
    }
  };
  REQUIRED_VALUES = {
    x: {},
    y: {},
    z: {}
  };
  _order;
  constructor(props) {
    super(props);
    this.name = "QuatFromAnglesNode";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      order
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    // spec: order must be exactly one of the six axis permutations, otherwise the default configuration ("yxz") is used
    const o = order?.[0];
    this._order = typeof o === "string" && VALID_ORDERS.includes(o) ? o : "yxz";
  }
  multiplyQuaternions(q1, q2) {
    const [x1, y1, z1, w1] = q1;
    const [x2, y2, z2, w2] = q2;
    return [x1 * w2 + w1 * x2 + y1 * z2 - z1 * y2, y1 * w2 + w1 * y2 + z1 * x2 - x1 * z2, z1 * w2 + w1 * z2 + x1 * y2 - y1 * x2, w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2];
  }
  processNode(flowSocket) {
    const {
      x,
      y,
      z
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexAngleX = this.values['x'].type;
    const typeAngleX = this.getType(typeIndexAngleX);
    const typeIndexAngleY = this.values['y'].type;
    const typeAngleY = this.getType(typeIndexAngleY);
    const typeIndexAngleZ = this.values['z'].type;
    const typeAngleZ = this.getType(typeIndexAngleZ);
    if (typeAngleX !== "float" || typeAngleY !== "float" || typeAngleZ !== "float") {
      throw Error(`Angles must be of type float.`);
    }

    // 1. Get the validated rotation order
    const order = this._order;

    // 2. Generate elemental quaternions for each axis rotation
    const cx = Math.cos(Number(x) / 2);
    const sx = Math.sin(Number(x) / 2);
    const cy = Math.cos(Number(y) / 2);
    const sy = Math.sin(Number(y) / 2);
    const cz = Math.cos(Number(z) / 2);
    const sz = Math.sin(Number(z) / 2);
    const qX = [sx, 0, 0, cx];
    const qY = [0, sy, 0, cy];
    const qZ = [0, 0, sz, cz];

    // Map characters to their respective quaternions
    const quatMap = {
      x: qX,
      y: qY,
      z: qZ
    };

    // 3. Multiply quaternions in the sequence of the specified intrinsic order (e.g., Y * X * Z)
    const qFirst = quatMap[order[0]];
    const qSecond = quatMap[order[1]];
    const qThird = quatMap[order[2]];
    const tempQuat = this.multiplyQuaternions(qFirst, qSecond);
    const finalQuat = this.multiplyQuaternions(tempQuat, qThird);
    return {
      'value': {
        value: finalQuat,
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class QuatFromDirections extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatFromDirectionsNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "float3") {
      throw Error(`a should be of type float3, got ${typeA}`);
    }
    if (typeB !== "float3") {
      throw Error(`b should be of type float3, got ${typeB}`);
    }
    const c = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    if (this.isCloseTo(c, 1)) {
      return {
        'value': {
          value: [0, 0, 0, 1],
          type: this.getTypeIndex("float4")
        }
      };
    }
    if (this.isCloseTo(c, -1)) {
      // Find a perpendicular vector to a by using cross product with [1,0,0] or [0,1,0]
      let perpendicular;
      if (Math.abs(a[0]) < Math.abs(a[1])) {
        // Cross product with [1,0,0]
        perpendicular = [0, -a[2], a[1]];
      } else {
        // Cross product with [0,1,0]
        perpendicular = [-a[2], 0, a[0]];
      }

      // Normalize the perpendicular vector
      const length = Math.sqrt(perpendicular[0] * perpendicular[0] + perpendicular[1] * perpendicular[1] + perpendicular[2] * perpendicular[2]);
      const x = perpendicular[0] / length;
      const y = perpendicular[1] / length;
      const z = perpendicular[2] / length;
      const w = 0;
      return {
        'value': {
          value: [x, y, z, w],
          type: this.getTypeIndex("float4")
        }
      };
    }
    const aCrossB = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const aCrossBLength = Math.sqrt(aCrossB[0] * aCrossB[0] + aCrossB[1] * aCrossB[1] + aCrossB[2] * aCrossB[2]);
    const aCrossBNormalized = [aCrossB[0] / aCrossBLength, aCrossB[1] / aCrossBLength, aCrossB[2] / aCrossBLength];
    const x = aCrossBNormalized[0] * Math.sqrt(0.5 - 0.5 * c);
    const y = aCrossBNormalized[1] * Math.sqrt(0.5 - 0.5 * c);
    const z = aCrossBNormalized[2] * Math.sqrt(0.5 - 0.5 * c);
    const w = Math.sqrt(0.5 + 0.5 * c);
    return {
      'value': {
        value: [x, y, z, w],
        type: this.getTypeIndex("float4")
      }
    };
  }
  isCloseTo(a, b, epsilon = 1e-6) {
    return Math.abs(a - b) < epsilon;
  }
}

class Not extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "NotNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    let val;
    switch (typeA) {
      case "bool":
        val = !JSON.parse(a);
        break;
      case "int":
        val = ~a;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: typeIndexA
      }
    };
  }
}

class Xor extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "XorNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "bool":
        val = JSON.parse(a) !== JSON.parse(b);
        break;
      case "int":
        val = a ^ b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: typeIndexA
      }
    };
  }
}

class Or extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "OrNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "bool":
        val = JSON.parse(a) || JSON.parse(b);
        break;
      case "int":
        val = a | b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: typeIndexA
      }
    };
  }
}

class And extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "AndNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "bool":
        val = JSON.parse(a) && JSON.parse(b);
        break;
      case "int":
        val = a & b;
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: [val],
        type: typeIndexA
      }
    };
  }
}

class LeftShift extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "LeftShiftNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "int" || typeB !== "int") {
      throw Error("invalid input type");
    }
    const val = a << b;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class RightShift extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "RightShiftNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "int" || typeB !== "int") {
      throw Error("invalid input type");
    }
    const val = a >> b;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class CountLeadingZeros extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CountLeadingZerosNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "int") {
      throw Error("invalid input type");
    }
    const val = Math.clz32(a);
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class CountOneBits extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CountOneBitsNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "int") {
      throw Error("invalid input type");
    }
    let count = 0;
    let tempNumber = a;
    while (tempNumber !== 0) {
      tempNumber = tempNumber & tempNumber - 1;
      count++;
    }
    return {
      'value': {
        value: [count],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class CountTrailingZeros extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "CountTrailingZerosNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "int") {
      throw Error("invalid input type");
    }
    const val = a ? 31 - Math.clz32(a & -a) : 32;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('int')
      }
    };
  }
}

class Fraction extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "FractionNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [a - Math.floor(a)];
        break;
      case "float2":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1])];
        break;
      case "float3":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1]), a[2] - Math.floor(a[2])];
        break;
      case "float4":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1]), a[2] - Math.floor(a[2]), a[3] - Math.floor(a[3])];
        break;
      case "float2x2":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1]), a[2] - Math.floor(a[2]), a[3] - Math.floor(a[3])];
        break;
      case "float3x3":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1]), a[2] - Math.floor(a[2]), a[3] - Math.floor(a[3]), a[4] - Math.floor(a[4]), a[5] - Math.floor(a[5]), a[6] - Math.floor(a[6]), a[7] - Math.floor(a[7]), a[8] - Math.floor(a[8])];
        break;
      case "float4x4":
        val = [a[0] - Math.floor(a[0]), a[1] - Math.floor(a[1]), a[2] - Math.floor(a[2]), a[3] - Math.floor(a[3]), a[4] - Math.floor(a[4]), a[5] - Math.floor(a[5]), a[6] - Math.floor(a[6]), a[7] - Math.floor(a[7]), a[8] - Math.floor(a[8]), a[9] - Math.floor(a[9]), a[10] - Math.floor(a[10]), a[11] - Math.floor(a[11]), a[12] - Math.floor(a[12]), a[13] - Math.floor(a[13]), a[14] - Math.floor(a[14]), a[15] - Math.floor(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class HyperbolicSine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "HyperbolicSineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.sinh(a)];
        break;
      case "float2":
        val = [Math.sinh(a[0]), Math.sinh(a[1])];
        break;
      case "float3":
        val = [Math.sinh(a[0]), Math.sinh(a[1]), Math.sinh(a[2])];
        break;
      case "float4":
        val = [Math.sinh(a[0]), Math.sinh(a[1]), Math.sinh(a[2]), Math.sinh(a[3])];
        break;
      case "float2x2":
        val = [Math.sinh(a[0]), Math.sinh(a[1]), Math.sinh(a[2]), Math.sinh(a[3])];
        break;
      case "float3x3":
        val = [Math.sinh(a[0]), Math.sinh(a[1]), Math.sinh(a[2]), Math.sinh(a[3]), Math.sinh(a[4]), Math.sinh(a[5]), Math.sinh(a[6]), Math.sinh(a[7]), Math.sinh(a[8])];
        break;
      case "float4x4":
        val = [Math.sinh(a[0]), Math.sinh(a[1]), Math.sinh(a[2]), Math.sinh(a[3]), Math.sinh(a[4]), Math.sinh(a[5]), Math.sinh(a[6]), Math.sinh(a[7]), Math.sinh(a[8]), Math.sinh(a[9]), Math.sinh(a[10]), Math.sinh(a[11]), Math.sinh(a[12]), Math.sinh(a[13]), Math.sinh(a[14]), Math.sinh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class InverseHyperbolicSine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "InverseHyperbolicSineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.asinh(a)];
        break;
      case "float2":
        val = [Math.asinh(a[0]), Math.asinh(a[1])];
        break;
      case "float3":
        val = [Math.asinh(a[0]), Math.asinh(a[1]), Math.asinh(a[2])];
        break;
      case "float4":
        val = [Math.asinh(a[0]), Math.asinh(a[1]), Math.asinh(a[2]), Math.asinh(a[3])];
        break;
      case "float2x2":
        val = [Math.asinh(a[0]), Math.asinh(a[1]), Math.asinh(a[2]), Math.asinh(a[3])];
        break;
      case "float3x3":
        val = [Math.asinh(a[0]), Math.asinh(a[1]), Math.asinh(a[2]), Math.asinh(a[3]), Math.asinh(a[4]), Math.asinh(a[5]), Math.asinh(a[6]), Math.asinh(a[7]), Math.asinh(a[8])];
        break;
      case "float4x4":
        val = [Math.asinh(a[0]), Math.asinh(a[1]), Math.asinh(a[2]), Math.asinh(a[3]), Math.asinh(a[4]), Math.asinh(a[5]), Math.asinh(a[6]), Math.asinh(a[7]), Math.asinh(a[8]), Math.asinh(a[9]), Math.asinh(a[10]), Math.asinh(a[11]), Math.asinh(a[12]), Math.asinh(a[13]), Math.asinh(a[14]), Math.asinh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class InverseHyperbolicCosine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "InverseHyperbolicCosineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.acosh(a)];
        break;
      case "float2":
        val = [Math.acosh(a[0]), Math.acosh(a[1])];
        break;
      case "float3":
        val = [Math.acosh(a[0]), Math.acosh(a[1]), Math.acosh(a[2])];
        break;
      case "float4":
        val = [Math.acosh(a[0]), Math.acosh(a[1]), Math.acosh(a[2]), Math.acosh(a[3])];
        break;
      case "float2x2":
        val = [Math.acosh(a[0]), Math.acosh(a[1]), Math.acosh(a[2]), Math.acosh(a[3])];
        break;
      case "float3x3":
        val = [Math.acosh(a[0]), Math.acosh(a[1]), Math.acosh(a[2]), Math.acosh(a[3]), Math.acosh(a[4]), Math.acosh(a[5]), Math.acosh(a[6]), Math.acosh(a[7]), Math.acosh(a[8])];
        break;
      case "float4x4":
        val = [Math.acosh(a[0]), Math.acosh(a[1]), Math.acosh(a[2]), Math.acosh(a[3]), Math.acosh(a[4]), Math.acosh(a[5]), Math.acosh(a[6]), Math.acosh(a[7]), Math.acosh(a[8]), Math.acosh(a[9]), Math.acosh(a[10]), Math.acosh(a[11]), Math.acosh(a[12]), Math.acosh(a[13]), Math.acosh(a[14]), Math.acosh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class InverseHyperbolicTangent extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "InverseHyperbolicTangentNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.atanh(a)];
        break;
      case "float2":
        val = [Math.atanh(a[0]), Math.atanh(a[1])];
        break;
      case "float3":
        val = [Math.atanh(a[0]), Math.atanh(a[1]), Math.atanh(a[2])];
        break;
      case "float4":
        val = [Math.atanh(a[0]), Math.atanh(a[1]), Math.atanh(a[2]), Math.atanh(a[3])];
        break;
      case "float2x2":
        val = [Math.atanh(a[0]), Math.atanh(a[1]), Math.atanh(a[2]), Math.atanh(a[3])];
        break;
      case "float3x3":
        val = [Math.atanh(a[0]), Math.atanh(a[1]), Math.atanh(a[2]), Math.atanh(a[3]), Math.atanh(a[4]), Math.atanh(a[5]), Math.atanh(a[6]), Math.atanh(a[7]), Math.atanh(a[8])];
        break;
      case "float4x4":
        val = [Math.atanh(a[0]), Math.atanh(a[1]), Math.atanh(a[2]), Math.atanh(a[3]), Math.atanh(a[4]), Math.atanh(a[5]), Math.atanh(a[6]), Math.atanh(a[7]), Math.atanh(a[8]), Math.atanh(a[9]), Math.atanh(a[10]), Math.atanh(a[11]), Math.atanh(a[12]), Math.atanh(a[13]), Math.atanh(a[14]), Math.atanh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class Exponential extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "ExponentialNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    let val;
    switch (typeA) {
      case "float":
        val = [Math.exp(a)];
        break;
      case "float2":
        val = [Math.exp(a[0]), Math.exp(a[1])];
        break;
      case "float3":
        val = [Math.exp(a[0]), Math.exp(a[1]), Math.exp(a[2])];
        break;
      case "float4":
        val = [Math.exp(a[0]), Math.exp(a[1]), Math.exp(a[2]), Math.exp(a[3])];
        break;
      case "float2x2":
        val = [Math.exp(a[0]), Math.exp(a[1]), Math.exp(a[2]), Math.exp(a[3])];
        break;
      case "float3x3":
        val = [Math.exp(a[0]), Math.exp(a[1]), Math.exp(a[2]), Math.exp(a[3]), Math.exp(a[4]), Math.exp(a[5]), Math.exp(a[6]), Math.exp(a[7]), Math.exp(a[8])];
        break;
      case "float4x4":
        val = [Math.exp(a[0]), Math.exp(a[1]), Math.exp(a[2]), Math.exp(a[3]), Math.exp(a[4]), Math.exp(a[5]), Math.exp(a[6]), Math.exp(a[7]), Math.exp(a[8]), Math.exp(a[9]), Math.exp(a[10]), Math.exp(a[11]), Math.exp(a[12]), Math.exp(a[13]), Math.exp(a[14]), Math.exp(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class HyperbolicCosine extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "HyperbolicCosineNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.cosh(a)];
        break;
      case "float2":
        val = [Math.cosh(a[0]), Math.cosh(a[1])];
        break;
      case "float3":
        val = [Math.cosh(a[0]), Math.cosh(a[1]), Math.cosh(a[2])];
        break;
      case "float4":
        val = [Math.cosh(a[0]), Math.cosh(a[1]), Math.cosh(a[2]), Math.cosh(a[3])];
        break;
      case "float2x2":
        val = [Math.cosh(a[0]), Math.cosh(a[1]), Math.cosh(a[2]), Math.cosh(a[3])];
        break;
      case "float3x3":
        val = [Math.cosh(a[0]), Math.cosh(a[1]), Math.cosh(a[2]), Math.cosh(a[3]), Math.cosh(a[4]), Math.cosh(a[5]), Math.cosh(a[6]), Math.cosh(a[7]), Math.cosh(a[8])];
        break;
      case "float4x4":
        val = [Math.cosh(a[0]), Math.cosh(a[1]), Math.cosh(a[2]), Math.cosh(a[3]), Math.cosh(a[4]), Math.cosh(a[5]), Math.cosh(a[6]), Math.cosh(a[7]), Math.cosh(a[8]), Math.cosh(a[9]), Math.cosh(a[10]), Math.cosh(a[11]), Math.cosh(a[12]), Math.cosh(a[13]), Math.cosh(a[14]), Math.cosh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

class HyperbolicTangent extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "HyperbolicTangentNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let val;
    switch (type) {
      case "float":
        val = [Math.tanh(a)];
        break;
      case "float2":
        val = [Math.tanh(a[0]), Math.tanh(a[1])];
        break;
      case "float3":
        val = [Math.tanh(a[0]), Math.tanh(a[1]), Math.tanh(a[2])];
        break;
      case "float4":
        val = [Math.tanh(a[0]), Math.tanh(a[1]), Math.tanh(a[2]), Math.tanh(a[3])];
        break;
      case "float2x2":
        val = [Math.tanh(a[0]), Math.tanh(a[1]), Math.tanh(a[2]), Math.tanh(a[3])];
        break;
      case "float3x3":
        val = [Math.tanh(a[0]), Math.tanh(a[1]), Math.tanh(a[2]), Math.tanh(a[3]), Math.tanh(a[4]), Math.tanh(a[5]), Math.tanh(a[6]), Math.tanh(a[7]), Math.tanh(a[8])];
        break;
      case "float4x4":
        val = [Math.tanh(a[0]), Math.tanh(a[1]), Math.tanh(a[2]), Math.tanh(a[3]), Math.tanh(a[4]), Math.tanh(a[5]), Math.tanh(a[6]), Math.tanh(a[7]), Math.tanh(a[8]), Math.tanh(a[9]), Math.tanh(a[10]), Math.tanh(a[11]), Math.tanh(a[12]), Math.tanh(a[13]), Math.tanh(a[14]), Math.tanh(a[15])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndex
      }
    };
  }
}

/**
 * Eases a floating-point value from its initial value to its target value over time.
 *
 * @param t - The current progress (between 0 and 1) of the easing animation.
 * @param easingParameters -  parameters used to determine easing function
 * @returns The eased floating-point value at the current progress.
 */

const easeFloat = (t, easingParameters) => {
  if (easingParameters.easingType === 0) {
    // cubic
    return cubicBezierFloat(t, easingParameters.initialValue, easingParameters.targetValue, easingParameters.cp1, easingParameters.cp2);
  } else if (easingParameters.easingType == 2) {
    //linear
    return linearFloat(t, easingParameters.initialValue, easingParameters.targetValue);
  } else {
    return easingParameters.targetValue;
  }
};

/**
 * Eases an array of three floating-point values from their initial values to their target values over time.
 *
 * @param t - The current progress (between 0 and 1) of the easing animation.
 * @param easingParameters -  parameters used to determine easing function
 * @returns An array of eased floating-point values at the current progress.
 */
const easeFloat3 = (t, easingParameters) => {
  if (easingParameters.easingType === 0) {
    //cubic
    return [cubicBezierFloat(t, easingParameters.initialValue[0], easingParameters.targetValue[0], easingParameters.cp1[0], easingParameters.cp2[0]), cubicBezierFloat(t, easingParameters.initialValue[1], easingParameters.targetValue[1], easingParameters.cp1[1], easingParameters.cp2[1]), cubicBezierFloat(t, easingParameters.initialValue[2], easingParameters.targetValue[2], easingParameters.cp1[2], easingParameters.cp2[2])];
  } else if (easingParameters.easingType == 2) {
    //linear
    return [linearFloat(t, easingParameters.initialValue[0], easingParameters.targetValue[0]), linearFloat(t, easingParameters.initialValue[1], easingParameters.targetValue[1]), linearFloat(t, easingParameters.initialValue[2], easingParameters.targetValue[2])];
  } else {
    return [easingParameters.targetValue[0], easingParameters.targetValue[1], easingParameters.targetValue[2]];
  }
};

/**
 * Eases an array of four floating-point values from their initial values to their target values over time.
 *
 * @param t - The current progress (between 0 and 1) of the easing animation.
 * @param easingParameters -  parameters used to determine easing function
 * @returns An array of eased floating-point values at the current progress.
 */
const easeFloat4 = (t, easingParameters) => {
  if (easingParameters.easingType === 0) {
    // cubic
    return [cubicBezierFloat(t, easingParameters.initialValue[0], easingParameters.targetValue[0], easingParameters.cp1[0], easingParameters.cp2[0]), cubicBezierFloat(t, easingParameters.initialValue[1], easingParameters.targetValue[1], easingParameters.cp1[1], easingParameters.cp2[1]), cubicBezierFloat(t, easingParameters.initialValue[2], easingParameters.targetValue[2], easingParameters.cp1[2], easingParameters.cp2[2]), cubicBezierFloat(t, easingParameters.initialValue[3], easingParameters.targetValue[3], easingParameters.cp1[3], easingParameters.cp2[3])];
  } else if (easingParameters.easingType === 1) {
    //slerp
    return slerpFloat4(t, easingParameters.initialValue, easingParameters.targetValue);
  } else if (easingParameters.easingType == 2) {
    //linear
    return [linearFloat(t, easingParameters.initialValue[0], easingParameters.targetValue[0]), linearFloat(t, easingParameters.initialValue[1], easingParameters.targetValue[1]), linearFloat(t, easingParameters.initialValue[2], easingParameters.targetValue[2]), linearFloat(t, easingParameters.initialValue[2], easingParameters.targetValue[3])];
  } else {
    return [easingParameters.targetValue[0], easingParameters.targetValue[1], easingParameters.targetValue[2], easingParameters.targetValue[3]];
  }
};
const slerpFloat4 = (t, initialVal, targetVal) => {
  // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
  const q1 = [initialVal[1], initialVal[2], initialVal[3], initialVal[0]];
  const q2 = [targetVal[1], targetVal[2], targetVal[3], targetVal[0]];
  const outQuat = Array(4).fill(0);
  quat_slerp(outQuat, q1, q2, t);
  return [outQuat[3], outQuat[0], outQuat[1], outQuat[2]];
};
const cubicBezierFloat = (t, initialVal, targetVal, cp1, cp2) => {
  return Math.pow(1 - t, 3) * initialVal + 3 * Math.pow(1 - t, 2) * t * cp1 + 3 * (1 - t) * Math.pow(t, 2) * cp2 + Math.pow(t, 3) * targetVal;
};
const linearFloat = (t, initialVal, targetVal) => {
  return initialVal + (targetVal - initialVal) * t;
};

/**
 * Evaluates the cubic Bézier easing function defined by the implicit end points P0 (0,0) and
 * P3 (1,1) and the control points P1/P2, as required by `variable/interpolate` and
 * `pointer/interpolate` ("construct a cubic Bézier easing function for the [0, 1] input range").
 *
 * This is a function of x, not of the Bézier parameter: the input progress `x` is the elapsed
 * fraction of the duration, and the curve parameter `s` with Bx(s) = x has to be solved for
 * before By(s) can be taken as the output progress. Same definition as CSS `cubic-bezier()`.
 * The spec's requirement that P1.x and P2.x lie within [0, 1] is what makes Bx monotonic and
 * therefore invertible; y is unconstrained, so the result may leave [0, 1] (e.g. "back" curves).
 *
 * @param x - input progress position, expected within [0, 1]
 * @param p1 - control point P1 as [x, y]
 * @param p2 - control point P2 as [x, y]
 * @returns the output progress position used as the interpolation coefficient
 */
const cubicBezierEase = (x, p1, p2) => {
  // polynomial coefficients of B(s) with the implicit end points, per coordinate
  const cx = 3 * p1[0];
  const bx = 3 * (p2[0] - p1[0]) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1[1];
  const by = 3 * (p2[1] - p1[1]) - cy;
  const ay = 1 - cy - by;
  const sampleX = s => ((ax * s + bx) * s + cx) * s;
  const sampleY = s => ((ay * s + by) * s + cy) * s;
  const sampleDerivativeX = s => (3 * ax * s + 2 * bx) * s + cx;
  if (x <= 0) {
    return 0;
  }
  if (x >= 1) {
    return 1;
  }

  // Newton-Raphson from an initial guess of s = x, which converges for most curves
  let s = x;
  for (let i = 0; i < 8; i++) {
    const error = sampleX(s) - x;
    if (Math.abs(error) < 1e-7) {
      return sampleY(s);
    }
    const derivative = sampleDerivativeX(s);
    if (Math.abs(derivative) < 1e-7) {
      break;
    }
    s -= error / derivative;
  }

  // bisection fallback for curves with (near) zero horizontal slope, e.g. p1.x = p2.x = 0
  let low = 0;
  let high = 1;
  s = x;
  while (low < high) {
    const sampled = sampleX(s);
    if (Math.abs(sampled - x) < 1e-7) {
      break;
    }
    if (sampled < x) {
      low = s;
    } else {
      high = s;
    }
    const next = (high + low) / 2;
    if (next === s) {
      break;
    }
    s = next;
  }
  return sampleY(s);
};
const cubicBezier = (t, P0, P1, P2, P3) => {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  const p = {
    x: 0,
    y: 0
  };
  p.x = uuu * P0.x + 3 * uu * t * P1.x + 3 * u * tt * P2.x + ttt * P3.x;
  p.y = uuu * P0.y + 3 * uu * t * P1.y + 3 * u * tt * P2.y + ttt * P3.y;
  return p;
};

class VariableInterpolate extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    variable: {},
    useSlerp: {}
  };
  REQUIRED_VALUES = {
    value: {},
    duration: {},
    p1: {},
    p2: {}
  };
  _variable;
  _useSlerp;
  _valueType;
  constructor(props) {
    super(props);
    this.name = "VariableInterpolate";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      variable,
      useSlerp
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._variable = variable[0];
    this._useSlerp = useSlerp[0];
    this._valueType = this.getType(this.variables[this._variable].type);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      value,
      duration,
      p1,
      p2
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    if (isNaN(duration) || !isFinite(duration) || isNaN(p1[0]) || !isFinite(p1[0]) || isNaN(p1[1]) || !isFinite(p1[1]) || isNaN(p2[0]) || !isFinite(p2[0]) || isNaN(p2[1]) || !isFinite(p2[1]) || duration < 0 || p1[0] < 0 || p1[0] > 1 || p2[0] < 0 || p2[0] > 1) {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
      return;
    }
    this.graphEngine.clearVariableInterpolation(this._variable);

    //set of interpolation
    const callback = () => {
      this.graphEngine.clearVariableInterpolation(this._variable);
      if (this.flows.done) {
        this.addEventToWorkQueue(this.flows.done);
      }
    };
    // variables store every type as a flat component array (float -> [x], float4 -> [x,y,z,w])
    const initialValue = [...this.variables[this._variable].value];
    const targetValue = Array.isArray(value) ? [...value] : [value];
    const startTime = this.graphEngine.lastTickTime;
    const interpolationAction = () => {
      const elapsedDuration = (this.graphEngine.lastTickTime - startTime) / 1000;
      const t = Math.min(elapsedDuration / duration, 1);
      // q is the output progress position: the easing curve evaluated at input progress t
      const q = cubicBezierEase(t, p1, p2);
      if (this._valueType === "float4" && this._useSlerp) {
        this.variables[this._variable].value = slerpFloat4(q, initialValue, targetValue);
      } else {
        this.variables[this._variable].value = targetValue.map((target, i) => linearFloat(q, initialValue[i], target));
      }
      if (elapsedDuration >= duration) {
        this.variables[this._variable].value = targetValue;
        this.graphEngine.clearVariableInterpolation(this._variable);
        callback();
      }
    };
    this.graphEngine.setVariableInterpolationCallback(this._variable, {
      action: interpolationAction
    });
    if (this.flows.out) {
      this.processFlow(this.flows.out);
    }
  }
}

class NoOpNode extends BehaveEngineNode {
  constructor(props) {
    super(props);
    registerNoOpNode(this);
    this.name = `NoOp (unsupported op "${this.declaration.op}")`;
    const outValues = {};
    Object.entries(this.declaration.outputValueSockets || {}).forEach(([key, value]) => {
      const typeName = this.getType(value.type);
      const defaultValue = this.getDefaultValueForType(typeName);
      outValues[key] = {
        value: defaultValue,
        type: value.type
      };
    });
    this.outValues = outValues;
  }
  processNode(flowSocket) {
    this.graphEngine.processNodeStarted(this);
    // no-op
  }
}

const flattenMatrix = matrix => {
  return matrix.flat();
};
const unflattenMatrix = (flatMatrix, dimension) => {
  return flatMatrix.reduce((acc, val, index) => {
    const row = Math.floor(index / dimension);
    const col = index % dimension;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row][col] = val;
    return acc;
  }, []);
};

class MatDecompose extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "MatDecompose";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const validTypePairings = typeA === "float4x4";
    if (!validTypePairings) {
      throw Error("Invalid type for a");
    }
    const result = {
      'translation': {
        value: [0, 0, 0],
        type: this.getTypeIndex("float3")
      },
      'rotation': {
        value: [0, 0, 0, 1],
        type: this.getTypeIndex("float4")
      },
      'scale': {
        value: [1, 1, 1],
        type: this.getTypeIndex("float3")
      }
    };
    const unflattenedA = unflattenMatrix(a, 4);
    result.translation.value = [unflattenedA[3][0], unflattenedA[3][1], unflattenedA[3][2]];
    const s_x = Math.sqrt(unflattenedA[0][0] * unflattenedA[0][0] + unflattenedA[0][1] * unflattenedA[0][1] + unflattenedA[0][2] * unflattenedA[0][2]);
    const s_y = Math.sqrt(unflattenedA[1][0] * unflattenedA[1][0] + unflattenedA[1][1] * unflattenedA[1][1] + unflattenedA[1][2] * unflattenedA[1][2]);
    const s_z = Math.sqrt(unflattenedA[2][0] * unflattenedA[2][0] + unflattenedA[2][1] * unflattenedA[2][1] + unflattenedA[2][2] * unflattenedA[2][2]);
    if (isNaN(s_x) || isNaN(s_y) || isNaN(s_z) || !isFinite(s_x) || !isFinite(s_y) || !isFinite(s_z) || s_x === 0 || s_y === 0 || s_z === 0) {
      result.scale.value = [s_x, s_y, s_z];
      return result;
    }
    const B = [[unflattenedA[0][0] / s_x, unflattenedA[0][1] / s_x, unflattenedA[0][2] / s_x], [unflattenedA[1][0] / s_y, unflattenedA[1][1] / s_y, unflattenedA[1][2] / s_y], [unflattenedA[2][0] / s_z, unflattenedA[2][1] / s_z, unflattenedA[2][2] / s_z]];
    const detB = B[0][0] * (B[1][1] * B[2][2] - B[1][2] * B[2][1]) - B[0][1] * (B[1][0] * B[2][2] - B[1][2] * B[2][0]) + B[0][2] * (B[1][0] * B[2][1] - B[1][1] * B[2][0]);

    // detemine scale signs based on detB sign
    if (detB > 0) {
      result.scale.value = [s_x, s_y, s_z];
    } else {
      result.scale.value = [-s_x, -s_y, -s_z];
      B[0][0] = -B[0][0];
      B[0][1] = -B[0][1];
      B[0][2] = -B[0][2];
      B[1][0] = -B[1][0];
      B[1][1] = -B[1][1];
      B[1][2] = -B[1][2];
      B[2][0] = -B[2][0];
      B[2][1] = -B[2][1];
      B[2][2] = -B[2][2];
    }

    // get rotation from B matrix and turn it into a quaternion
    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const B_matrix = [B[0][0], B[0][1], B[0][2], B[1][0], B[1][1], B[1][2], B[2][0], B[2][1], B[2][2]];
    const rotation = Array(4).fill(0);
    fromMat3(rotation, B_matrix);
    result.rotation.value = [rotation[0], rotation[1], rotation[2], rotation[3]];
    return result;
  }
}

class MatCompose extends BehaveEngineNode {
  REQUIRED_VALUES = {
    translation: {},
    rotation: {},
    scale: {}
  };
  constructor(props) {
    super(props);
    this.name = "MatCompose";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      translation,
      rotation,
      scale
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexTranslation = this.values['translation'].type;
    const typeTranslation = this.getType(typeIndexTranslation);
    const typeIndexRotation = this.values['rotation'].type;
    const typeRotation = this.getType(typeIndexRotation);
    const typeIndexScale = this.values['scale'].type;
    const typeScale = this.getType(typeIndexScale);
    const validTypePairings = typeTranslation === "float3" && typeRotation === "float4" && typeScale === "float3";
    if (!validTypePairings) {
      throw Error("Invalid type pairings");
    }

    // Create matrices for translation, rotation and scale
    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const rotationMatrix = Array(16).fill(0);
    const scaleMatrix = Array(16).fill(0);
    const resultMatrix = Array(16).fill(0);

    // Set up individual transformation matrices
    mat4_fromQuat(rotationMatrix, rotation); // rotation is in xyzw
    mat4_fromScaling(scaleMatrix, scale);

    // Multiply matrices in TRS order (Translation * Rotation * Scale)
    mat4_multiply(resultMatrix, rotationMatrix, scaleMatrix);
    resultMatrix[12] = translation[0];
    resultMatrix[13] = translation[1];
    resultMatrix[14] = translation[2];
    const val = [resultMatrix[0], resultMatrix[1], resultMatrix[2], resultMatrix[3], resultMatrix[4], resultMatrix[5], resultMatrix[6], resultMatrix[7], resultMatrix[8], resultMatrix[9], resultMatrix[10], resultMatrix[11], resultMatrix[12], resultMatrix[13], resultMatrix[14], resultMatrix[15]];
    return {
      'value': {
        value: val,
        type: this.getTypeIndex("float4x4")
      }
    };
  }
}

class MatMul extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "MatMul";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const validTypePairings = typeA === "float4x4" && typeB === "float4x4" || typeA === "float3x3" && typeB === "float3x3" || typeA === "float2x2" && typeB === "float2x2";
    if (!validTypePairings) {
      throw Error("Invalid type pairings");
    }
    if (typeA === "float4x4") {
      // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
      const matA = [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]];
      const matB = [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]];
      const result = Array(16).fill(0);
      mat4_multiply(result, matA, matB);
      return {
        'value': {
          value: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11], result[12], result[13], result[14], result[15]],
          type: typeIndexA
        }
      };
    } else if (typeA === "float3x3") {
      const matA = [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]];
      const matB = [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]];
      const result = Array(9).fill(0);
      multiply(result, matA, matB);
      return {
        'value': {
          value: [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]],
          type: typeIndexA
        }
      };
    } else if (typeA === "float2x2") {
      const matA = [a[0], a[1], a[2], a[3]];
      const matB = [b[0], b[1], b[2], b[3]];
      const result = Array(4).fill(0);
      mat2_multiply(result, matA, matB);
      return {
        'value': {
          value: [result[0], result[1], result[2], result[3]],
          type: typeIndexA
        }
      };
    } else {
      throw Error(`Invalid type ${typeA}`);
    }
  }
}

class MathSwitch extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    cases: {
      defaultValue: []
    }
  };
  REQUIRED_VALUES = {
    default: {},
    selection: {}
  };
  _cases;
  constructor(props) {
    super(props);
    this.name = "MathSwitchNode";
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      cases
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    // spec: non-int32 cases -> default configuration (no cases); duplicate cases are ignored
    const isValid = Array.isArray(cases) && cases.every(c => c === (c | 0));
    this._cases = isValid ? [...new Set(cases)] : [];
  }
  processNode(flowSocket) {
    const evaluatedValues = this.evaluateRequiredValues();
    const defaultSelection = evaluatedValues.default;
    const selection = evaluatedValues.selection;
    this.graphEngine.processNodeStarted(this);
    // ensure all cases are defined
    const caseVals = this.evaluateAllValues(this._cases.map(v => `${v}`));
    for (const [key, caseVal] of Object.entries(caseVals)) {
      if (caseVal === undefined) {
        throw Error(`case value ${key} is undefined`);
      }
    }
    const typeIndexSelection = this.values['selection'].type;
    const typeSelection = this.getType(typeIndexSelection);
    const typeIndexDefault = this.values['default'].type;
    const typeDefault = this.getType(typeIndexDefault);
    if (typeSelection !== 'int') {
      throw Error("selection has invalid type expected int");
    }

    // ensure all cases are of the same type as the default
    for (const [key, caseVal] of Object.entries(caseVals)) {
      const typeIndexCase = this.values[key].type;
      const typeCase = this.getType(typeIndexCase);
      if (typeCase !== typeDefault) {
        throw Error(`case value ${key} has invalid type, expected ${typeDefault}`);
      }
    }
    const selectionIndex = Number(selection);
    const val = caseVals[`${selectionIndex}`];
    if (val === undefined) {
      const returnVal = Array.isArray(defaultSelection) ? defaultSelection : [defaultSelection];
      return {
        'value': {
          value: returnVal,
          type: typeIndexDefault
        }
      };
    }
    const returnVal = Array.isArray(val) ? val : [val];
    return {
      'value': {
        value: returnVal,
        type: typeIndexDefault
      }
    };
  }
}

class Inverse extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "InverseNode";
    this.validateValues(this.values);
  }
  static createZeroMatrix(size) {
    return Array(size * size).fill(0);
  }
  static invert4x4(matrix) {
    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const colMajor = matrix;
    const determinant = mat4_determinant(colMajor);
    if (!Number.isFinite(determinant) || determinant === 0) {
      return {
        value: this.createZeroMatrix(4),
        isValid: false
      };
    }
    const result = Array(16).fill(0);
    const success = mat4_invert(result, colMajor);
    if (!success) {
      return {
        value: this.createZeroMatrix(4),
        isValid: false
      };
    }
    return {
      value: Array.from(result),
      isValid: true
    };
  }
  static invert3x3(matrix) {
    const colMajor = matrix;
    const determinant = mat3_determinant(colMajor);
    if (!Number.isFinite(determinant) || determinant === 0) {
      return {
        value: this.createZeroMatrix(3),
        isValid: false
      };
    }
    const result = Array(9).fill(0);
    const success = invert(result, colMajor);
    if (!success) {
      return {
        value: this.createZeroMatrix(3),
        isValid: false
      };
    }
    return {
      value: Array.from(result),
      isValid: true
    };
  }
  static invert2x2(matrix) {
    const colMajor = matrix;
    const determinant = mat2_determinant(colMajor);
    if (!Number.isFinite(determinant) || determinant === 0) {
      return {
        value: this.createZeroMatrix(2),
        isValid: false
      };
    }
    const result = Array(4).fill(0);
    const success = mat2_invert(result, colMajor);
    if (!success) {
      return {
        value: this.createZeroMatrix(2),
        isValid: false
      };
    }
    return {
      value: Array.from(result),
      isValid: true
    };
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndex = this.values['a'].type;
    const type = this.getType(typeIndex);
    let result;
    switch (type) {
      case "float4x4":
        result = Inverse.invert4x4(a);
        break;
      case "float3x3":
        result = Inverse.invert3x3(a);
        break;
      case "float2x2":
        result = Inverse.invert2x2(a);
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: result.value,
        type: typeIndex
      },
      'isValid': {
        value: result.isValid,
        type: this.getTypeIndex('bool')
      }
    };
  }
}

// debug/log message template parsing and effective message generation (KHR_interactivity, Debug Output Operations)

/** Spec state machine; returns undefined when the template is syntactically invalid. */
const parseMessageTemplate = message => {
  const parameters = [];
  let state = 0;
  let paramStart = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (char === "{") {
      if (state === 0) {
        state = 1;
      } else if (state === 1) {
        state = 0;
      } else {
        return undefined;
      }
    } else if (char === "}") {
      if (state === 0) {
        state = 3;
      } else if (state === 3) {
        state = 0;
      } else if (state === 2) {
        parameters.push({
          id: message.slice(paramStart + 1, i),
          start: paramStart,
          end: i
        });
        state = 0;
      } else {
        return undefined;
      }
    } else if (state === 1) {
      paramStart = i - 1;
      state = 2;
    } else if (state === 3) {
      return undefined;
    }
  }
  return state === 0 ? parameters : undefined;
};

/** Substitute parameters (right to left) with their string forms, then collapse doubled brackets. */
const populateMessageTemplate = (message, parameters, toString) => {
  let result = message;
  for (const parameter of [...parameters].sort((a, b) => b.start - a.start)) {
    const text = toString(parameter.id).replace(/{/g, "{{").replace(/}/g, "}}");
    result = result.slice(0, parameter.start) + text + result.slice(parameter.end + 1);
  }
  return result.replace(/{{/g, "{").replace(/}}/g, "}");
};

class DebugLog extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_CONFIGURATIONS = {
    message: {
      defaultValue: [""]
    },
    severity: {
      defaultValue: [0]
    }
  };
  _message;
  _severity;
  _parameters;
  _socketIds;
  constructor(props) {
    super(props);
    this.name = "DebugLog";
    this.validateConfigurations(this.configuration);
    const {
      message,
      severity
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    const parameters = typeof message?.[0] === "string" ? parseMessageTemplate(message[0]) : undefined;
    const severityValue = severity?.[0];
    // spec: a non-string/invalid message or a non-int32 severity selects the default configuration
    if (parameters === undefined || typeof severityValue !== "number" || severityValue !== (severityValue | 0)) {
      this._message = "";
      this._severity = 0;
      this._parameters = [];
    } else {
      this._message = message[0];
      this._severity = severityValue;
      this._parameters = parameters;
    }
    this._socketIds = [...new Set(this._parameters.map(parameter => parameter.id))];

    // spec: a node missing a template parameter socket is invalid and the graph must be rejected
    const missing = this._socketIds.filter(id => this.values[id] === undefined);
    if (missing.length > 0) {
      throw new Error(`debug/log node ${this.index} is missing input value socket(s) ${missing.map(id => `"${id}"`).join(", ")} required by its message template`);
    }
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();

    // spec: all input values are evaluated, including extra sockets not used by the template
    const values = this.evaluateAllValues(Object.keys(this.values));
    const populatedTemplate = populateMessageTemplate(this._message, this._parameters, id => formatValue(values[id], this.getType(this.values[id].type)));
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.processDebugLog(this, populatedTemplate, this._severity);
    super.processNode(flowSocket);
  }
}
function formatValue(value, typeName) {
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  switch (typeName) {
    case "bool":
    case "int":
    case "float":
      return value.toString();
    case "float2":
      return `[${value[0]}, ${value[1]}]`;
    case "float3":
      return `[${value[0]}, ${value[1]}, ${value[2]}]`;
    case "float4":
      return `[${value[0]}, ${value[1]}, ${value[2]}, ${value[3]}]`;
    case "float2x2":
      return `[
                [${value[0]}, ${value[1]}],
                [${value[2]}, ${value[3]}]
            ]`;
    case "float3x3":
      return `[
                [${value[0]}, ${value[1]}, ${value[2]}],
                [${value[3]}, ${value[4]}, ${value[5]}],
                [${value[6]}, ${value[7]}, ${value[8]}]
            ]`;
    case "float4x4":
      return `[
                [${value[0]}, ${value[1]}, ${value[2]}, ${value[3]}],
                [${value[4]}, ${value[5]}, ${value[6]}, ${value[7]}],
                [${value[8]}, ${value[9]}, ${value[10]}, ${value[11]}],
                [${value[12]}, ${value[13]}, ${value[14]}, ${value[15]}]
            ]`;
    default:
      return value.toString();
  }
}

class QuatAngleBetween extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatAngleBetweenNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== "float4") {
      throw Error(`a should be of type float4, got ${typeA}`);
    }
    if (typeB !== "float4") {
      throw Error(`b should be of type float4, got ${typeB}`);
    }
    const dotProduct = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    const angle = 2 * Math.acos(dotProduct);
    return {
      'value': {
        value: [angle],
        type: this.getTypeIndex("float")
      }
    };
  }
}

class QuatSlerp extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatSlerpNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const typeIndexC = this.values['c'].type;
    const typeC = this.getType(typeIndexC);
    if (typeA !== "float4") {
      throw Error(`a should be of type float4, got ${typeA}`);
    }
    if (typeB !== "float4") {
      throw Error(`b should be of type float4, got ${typeB}`);
    }
    if (typeC !== "float") {
      throw Error(`c should be of type float, got ${typeC}`);
    }

    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const quatA = Array(4).fill(0);
    quat_set(quatA, a[0], a[1], a[2], a[3]);
    const quatB = Array(4).fill(0);
    quat_set(quatB, b[0], b[1], b[2], b[3]);
    const result = Array(4).fill(0);
    const t = Number(c);
    quat_slerp(result, quatA, quatB, t);
    const val = [result[0], result[1], result[2], result[3]];
    return {
      'value': {
        value: val,
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class QuatFromUpForward extends BehaveEngineNode {
  REQUIRED_VALUES = {
    up: {},
    forward: {}
  };
  constructor(props) {
    super(props);
    this.name = "QuatFromUpForwardNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      up,
      forward
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexUp = this.values['up'].type;
    const typeUp = this.getType(typeIndexUp);
    const typeIndexForward = this.values['forward'].type;
    const typeForward = this.getType(typeIndexForward);
    if (typeUp !== "float3") {
      throw Error(`up should be of type float3, got ${typeUp}`);
    }
    if (typeForward !== "float3") {
      throw Error(`forward should be of type float3, got ${typeForward}`);
    }

    // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
    const fwd = [forward[0], forward[1], forward[2]];
    const upVec = [up[0], up[1], up[2]];
    const right = Array(3).fill(0);
    cross(right, upVec, fwd);
    if (len(right) < 1e-6) {
      // If up and forward are colinear, choose auxiliary axis least aligned with forward
      const ax = Math.abs(fwd[0]);
      const ay = Math.abs(fwd[1]);
      const az = Math.abs(fwd[2]);
      let arbitrary;
      if (ax <= ay && ax <= az) {
        arbitrary = [1, 0, 0];
      } else if (ay <= ax && ay <= az) {
        arbitrary = [0, 1, 0];
      } else {
        arbitrary = [0, 0, 1];
      }
      cross(right, arbitrary, fwd);
    }
    normalize(right, right);
    const trueUp = Array(3).fill(0);
    cross(trueUp, fwd, right);
    const m = Array(9).fill(0);
    // Set columns of rotation matrix: right, up, forward
    m[0] = right[0];
    m[1] = right[1];
    m[2] = right[2];
    m[3] = trueUp[0];
    m[4] = trueUp[1];
    m[5] = trueUp[2];
    m[6] = fwd[0];
    m[7] = fwd[1];
    m[8] = fwd[2];
    const outQ = Array(4).fill(0);
    fromMat3(outQ, m);
    quat_normalize(outQ, outQ);
    const val = [outQ[0], outQ[1], outQ[2], outQ[3]];
    return {
      'value': {
        value: val,
        type: this.getTypeIndex("float4")
      }
    };
  }
}

class Determinant extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "DeterminantNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float4x4" && typeA !== "float3x3" && typeA !== "float2x2") {
      throw Error("Invalid type");
    }
    let val;
    let unflattenedA;
    switch (typeA) {
      case "float4x4":
        unflattenedA = unflattenMatrix(a, 4);
        val = unflattenedA[0][0] * (unflattenedA[1][1] * (unflattenedA[2][2] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][2]) - unflattenedA[1][2] * (unflattenedA[2][1] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][1]) + unflattenedA[1][3] * (unflattenedA[2][1] * unflattenedA[3][2] - unflattenedA[2][2] * unflattenedA[3][1])) - unflattenedA[0][1] * (unflattenedA[1][0] * (unflattenedA[2][2] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][2]) - unflattenedA[1][2] * (unflattenedA[2][0] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][0]) + unflattenedA[1][3] * (unflattenedA[2][0] * unflattenedA[3][2] - unflattenedA[2][2] * unflattenedA[3][0])) + unflattenedA[0][2] * (unflattenedA[1][0] * (unflattenedA[2][1] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][1]) - unflattenedA[1][1] * (unflattenedA[2][0] * unflattenedA[3][3] - unflattenedA[2][3] * unflattenedA[3][0]) + unflattenedA[1][3] * (unflattenedA[2][0] * unflattenedA[3][1] - unflattenedA[2][1] * unflattenedA[3][0])) - unflattenedA[0][3] * (unflattenedA[1][0] * (unflattenedA[2][1] * unflattenedA[3][2] - unflattenedA[2][2] * unflattenedA[3][1]) - unflattenedA[1][1] * (unflattenedA[2][0] * unflattenedA[3][2] - unflattenedA[2][2] * unflattenedA[3][0]) + unflattenedA[1][2] * (unflattenedA[2][0] * unflattenedA[3][1] - unflattenedA[2][1] * unflattenedA[3][0]));
        break;
      case "float3x3":
        unflattenedA = unflattenMatrix(a, 3);
        val = unflattenedA[0][0] * (unflattenedA[1][1] * unflattenedA[2][2] - unflattenedA[1][2] * unflattenedA[2][1]) - unflattenedA[0][1] * (unflattenedA[1][0] * unflattenedA[2][2] - unflattenedA[1][2] * unflattenedA[2][0]) + unflattenedA[0][2] * (unflattenedA[1][0] * unflattenedA[2][1] - unflattenedA[1][1] * unflattenedA[2][0]);
        break;
      case "float2x2":
        unflattenedA = unflattenMatrix(a, 2);
        val = unflattenedA[0][0] * unflattenedA[1][1] - unflattenedA[0][1] * unflattenedA[1][0];
        break;
    }
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('float')
      }
    };
  }
}

class Transform extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "TransformNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);

    // MATRIX TO FIX
    const validTypePairings = typeA === "float4" && typeB === "float4x4" || typeA === "float3" && typeB === "float3x3" || typeA === "float2" && typeB === "float2x2";
    if (!validTypePairings) {
      throw Error("Invalid type pairings");
    }
    const dimension = Number(typeA.charAt(typeA.length - 1));
    const val = [];
    for (let row = 0; row < dimension; row++) {
      let sum = 0;
      for (let col = 0; col < dimension; col++) {
        sum += b[col * dimension + row] * a[col];
      }
      val.push(sum);
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

class Transpose extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {}
  };
  constructor(props) {
    super(props);
    this.name = "TransposeNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    if (typeA !== "float4x4" && typeA !== "float3x3" && typeA !== "float2x2") {
      throw Error("Invalid type");
    }
    const dimension = Number(typeA.charAt(typeA.length - 1));
    const val = [];
    const unflattenedA = unflattenMatrix(a, dimension);
    for (let col = 0; col < dimension; col++) {
      val.push([]);
      for (let row = 0; row < dimension; row++) {
        val[col].push(unflattenedA[row][col]);
      }
    }
    const flattenedVal = flattenMatrix(val);
    return {
      'value': {
        value: flattenedVal,
        type: typeIndexA
      }
    };
  }
}

class RefEquality extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "RefEquality";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error(`input types not equivalent: a=${typeA}, b=${typeB}, values=${JSON.stringify(this.values)}`);
    }
    if (typeA !== "ref") {
      throw Error(`input types not ref: a=${typeA}, b=${typeB}, values=${JSON.stringify(this.values)}`);
    }
    const val = a === b;
    return {
      'value': {
        value: [val],
        type: this.getTypeIndex('bool')
      }
    };
  }
}

class EventStopPropagation extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    stopImmediate: {},
    event: {}
  };
  constructor(props) {
    super(props);
    this.name = 'EventStopPropagation';
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      stopImmediate,
      event
    } = this.evaluateRequiredValues();
    if (stopImmediate) {
      this.graphEngine.propagationCancelled.add(event);
    } else {
      this.graphEngine.propagationCancelledPending.add(event);
    }
    super.processNode(flowSocket);
  }
}

class SmoothStep extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "SmoothStepNode";
    this.validateValues(this.values);
  }
  saturate = x => {
    return Math.min(Math.max(x, 0), 1);
  };
  smoothStep = (a, b, c) => {
    const lo = Math.min(a, b);
    // spec: no special case for a == b; division yields +-Inf/NaN, which saturate/propagate
    const t = this.saturate((c - lo) / Math.abs(b - a));
    return t * t * (3 - 2 * t);
  };
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    let val;
    switch (typeA) {
      case "float":
        val = [this.smoothStep(a, b, c)];
        break;
      case "float2":
        val = [this.smoothStep(a[0], b[0], c[0]), this.smoothStep(a[1], b[1], c[1])];
        break;
      case "float3":
        val = [this.smoothStep(a[0], b[0], c[0]), this.smoothStep(a[1], b[1], c[1]), this.smoothStep(a[2], b[2], c[2])];
        break;
      case "float4":
        val = [this.smoothStep(a[0], b[0], c[0]), this.smoothStep(a[1], b[1], c[1]), this.smoothStep(a[2], b[2], c[2]), this.smoothStep(a[3], b[3], c[3])];
        break;
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

const THRESHOLD = 1e-6;
class Slerp extends BehaveEngineNode {
  REQUIRED_VALUES = {
    a: {},
    b: {},
    c: {}
  };
  constructor(props) {
    super(props);
    this.name = "SlerpNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      a,
      b,
      c
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexA = this.values['a'].type;
    const typeA = this.getType(typeIndexA);
    const typeIndexB = this.values['b'].type;
    const typeB = this.getType(typeIndexB);
    const typeIndexC = this.values['c'].type;
    const typeC = this.getType(typeIndexC);
    if (typeA !== typeB) {
      throw Error("input types not equivalent");
    }
    if (typeC !== "float") {
      throw Error("c must be of type float");
    }
    const t = Number(c);
    let val;
    switch (typeA) {
      case "float2":
        {
          const lenA = Math.hypot(a[0], a[1]);
          const lenB = Math.hypot(b[0], b[1]);
          if (lenA <= THRESHOLD || lenB <= THRESHOLD) {
            val = [(1 - t) * a[0] + t * b[0], (1 - t) * a[1] + t * b[1]];
            break;
          }
          const ax = a[0] / lenA,
            ay = a[1] / lenA;
          const bx = b[0] / lenB,
            by = b[1] / lenB;
          let theta = Math.acos(Math.min(Math.max(ax * bx + ay * by, -1), 1));
          if (ax * by - ay * bx < 0) {
            theta = -theta;
          }
          const L = (1 - t) * lenA + t * lenB;
          val = [(ax * Math.cos(t * theta) - ay * Math.sin(t * theta)) * L, (ax * Math.sin(t * theta) + ay * Math.cos(t * theta)) * L];
          break;
        }
      case "float3":
        {
          const lenA = Math.hypot(a[0], a[1], a[2]);
          const lenB = Math.hypot(b[0], b[1], b[2]);
          if (lenA <= THRESHOLD || lenB <= THRESHOLD) {
            val = [(1 - t) * a[0] + t * b[0], (1 - t) * a[1] + t * b[1], (1 - t) * a[2] + t * b[2]];
            break;
          }
          const ax = a[0] / lenA,
            ay = a[1] / lenA,
            az = a[2] / lenA;
          const bx = b[0] / lenB,
            by = b[1] / lenB,
            bz = b[2] / lenB;
          const d = Math.min(Math.max(ax * bx + ay * by + az * bz, -1), 1);
          const L = (1 - t) * lenA + t * lenB;
          if (1 - d <= THRESHOLD) {
            // nearly parallel — linear blend
            val = [(1 - t) * a[0] + t * b[0], (1 - t) * a[1] + t * b[1], (1 - t) * a[2] + t * b[2]];
            break;
          }
          // Build rotation quaternion from axis-angle
          let rx, ry, rz;
          if (1 + d <= THRESHOLD) {
            // antiparallel — pick any perpendicular axis
            if (Math.abs(ax) <= Math.abs(ay) && Math.abs(ax) <= Math.abs(az)) {
              const len = Math.hypot(0, -az, ay);
              rx = 0;
              ry = -az / len;
              rz = ay / len;
            } else if (Math.abs(ay) <= Math.abs(az)) {
              const len = Math.hypot(-az, 0, ax);
              rx = -az / len;
              ry = 0;
              rz = ax / len;
            } else {
              const len = Math.hypot(-ay, ax, 0);
              rx = -ay / len;
              ry = ax / len;
              rz = 0;
            }
          } else {
            // normalized cross product of â and b̂
            const cx = ay * bz - az * by;
            const cy = az * bx - ax * bz;
            const cz = ax * by - ay * bx;
            const cLen = Math.hypot(cx, cy, cz);
            rx = cx / cLen;
            ry = cy / cLen;
            rz = cz / cLen;
          }
          const angle = t * Math.acos(d);
          const s = Math.sin(angle / 2);
          const qx = rx * s,
            qy = ry * s,
            qz = rz * s,
            qw = Math.cos(angle / 2);
          // Rotate â by quaternion q
          // plain number arrays: gl-matrix defaults to Float32Array, but spec floats are doubles
          const q = [qx, qy, qz, qw];
          const aVec = [ax, ay, az];
          const rotated = Array(3).fill(0);
          transformQuat(rotated, aVec, q);
          val = [rotated[0] * L, rotated[1] * L, rotated[2] * L];
          break;
        }
      default:
        throw Error("Invalid type");
    }
    return {
      'value': {
        value: val,
        type: typeIndexA
      }
    };
  }
}

// Matrix constants from the OkLab paper (optimized for double-precision)
// Step 1: linear RGB -> LMS
const M1 = [[0.4122214708, 0.5363325363, 0.0514459929], [0.2119034982, 0.6806995451, 0.1073969566], [0.0883024619, 0.2817188376, 0.6299787005]];

// Step 2: LMS^(1/3) -> Lab
const M2 = [[+0.2104542553, +0.7936177850, -0.0040720468], [+1.9779984951, -2.4285922050, +0.4505937099], [+0.0259040371, +0.7827717662, -0.8086757660]];
function cbrt(x) {
  return Math.cbrt(x);
}
class RgbToOkLCh extends BehaveEngineNode {
  REQUIRED_VALUES = {
    r: {},
    g: {},
    b: {}
  };
  constructor(props) {
    super(props);
    this.name = "RgbToOkLChNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      r,
      g,
      b
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexFloat = this.getTypeIndex("float");
    const rv = Number(r);
    const gv = Number(g);
    const bv = Number(b);

    // LMS = M1 * [r, g, b]
    const Lp = M1[0][0] * rv + M1[0][1] * gv + M1[0][2] * bv;
    const Mp = M1[1][0] * rv + M1[1][1] * gv + M1[1][2] * bv;
    const Sp = M1[2][0] * rv + M1[2][1] * gv + M1[2][2] * bv;

    // Lab = M2 * [cbrt(Lp), cbrt(Mp), cbrt(Sp)]
    const cLp = cbrt(Lp);
    const cMp = cbrt(Mp);
    const cSp = cbrt(Sp);
    const L = M2[0][0] * cLp + M2[0][1] * cMp + M2[0][2] * cSp;
    const a = M2[1][0] * cLp + M2[1][1] * cMp + M2[1][2] * cSp;
    const bOk = M2[2][0] * cLp + M2[2][1] * cMp + M2[2][2] * cSp;
    const chroma = Math.sqrt(a * a + bOk * bOk);
    const hue = Math.atan2(bOk, a);
    return {
      'l': {
        value: [L],
        type: typeIndexFloat
      },
      'c': {
        value: [chroma],
        type: typeIndexFloat
      },
      'h': {
        value: [hue],
        type: typeIndexFloat
      }
    };
  }
}

// Matrix constants from the OkLab paper (optimized for double-precision)
// Step 1: Lab -> LMS
const M3 = [[1.0, +0.3963377774, +0.2158037573], [1.0, -0.1055613458, -0.0638541728], [1.0, -0.0894841775, -1.2914855480]];

// Step 2: LMS^3 -> linear RGB
const M4 = [[+4.0767416621, -3.3077115913, +0.2309699292], [-1.2684380046, +2.6097574011, -0.3413193965], [-0.0041960863, -0.7034186147, +1.7076147010]];
class RgbFromOkLCh extends BehaveEngineNode {
  REQUIRED_VALUES = {
    l: {},
    c: {},
    h: {}
  };
  constructor(props) {
    super(props);
    this.name = "RgbFromOkLChNode";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    const {
      l,
      c,
      h
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const typeIndexFloat = this.getTypeIndex("float");
    const L = Number(l);
    const C = Number(c);
    const H = Number(h);
    const aOk = C * Math.cos(H);
    const bOk = C * Math.sin(H);

    // LMS = M3 * [L, a, b]
    const Lp = M3[0][0] * L + M3[0][1] * aOk + M3[0][2] * bOk;
    const Mp = M3[1][0] * L + M3[1][1] * aOk + M3[1][2] * bOk;
    const Sp = M3[2][0] * L + M3[2][1] * aOk + M3[2][2] * bOk;

    // RGB = M4 * [Lp^3, Mp^3, Sp^3]
    const Lp3 = Lp * Lp * Lp;
    const Mp3 = Mp * Mp * Mp;
    const Sp3 = Sp * Sp * Sp;
    const rv = M4[0][0] * Lp3 + M4[0][1] * Mp3 + M4[0][2] * Sp3;
    const gv = M4[1][0] * Lp3 + M4[1][1] * Mp3 + M4[1][2] * Sp3;
    const bv = M4[2][0] * Lp3 + M4[2][1] * Mp3 + M4[2][2] * Sp3;
    return {
      'r': {
        value: [rv],
        type: typeIndexFloat
      },
      'g': {
        value: [gv],
        type: typeIndexFloat
      },
      'b': {
        value: [bv],
        type: typeIndexFloat
      }
    };
  }
}

class OnSelect extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    nodeIndex: {
      defaultValue: [-1]
    }
  };
  _nodeIndex;
  constructor(props) {
    super(props);
    this.name = 'OnSelect';
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      nodeIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._nodeIndex = nodeIndex[0];
    this.outValues.selectionPoint = {
      type: this.getTypeIndex('float3'),
      value: [NaN, NaN, NaN]
    };
    this.outValues.selectionRayOrigin = {
      type: this.getTypeIndex('float3'),
      value: [NaN, NaN, NaN]
    };
    this.outValues.selectedNode = {
      type: this.getTypeIndex('ref'),
      value: [null]
    };
    this.outValues.controllerIndex = {
      type: this.getTypeIndex('int'),
      value: [-1]
    };
    this.outValues.event = {
      type: this.getTypeIndex('ref'),
      value: [null]
    };
    this.setUpOnSelect();
    this.graphEngine.selectNodes.push(this);
  }
  setUpOnSelect() {
    const callback = (selectedNode, controllerIndex, selectionPoint, selectionRayOrigin, event) => {
      this.outValues.selectionPoint = {
        type: this.getTypeIndex('float3'),
        value: selectionPoint ?? [NaN, NaN, NaN]
      };
      this.outValues.selectionRayOrigin = {
        type: this.getTypeIndex('float3'),
        value: selectionRayOrigin ?? [NaN, NaN, NaN]
      };
      this.outValues.selectedNode = {
        type: this.getTypeIndex('ref'),
        value: [selectedNode]
      };
      this.outValues.controllerIndex = {
        type: this.getTypeIndex('int'),
        value: [controllerIndex]
      };
      this.outValues.event = {
        type: this.getTypeIndex('ref'),
        value: [event]
      };
      this.addEventToWorkQueue(this.flows.out);
    };
    this.graphEngine.selectableNodesIndices.set(Number(this._nodeIndex), callback);
  }
}

class AnimationStart extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    animation: {},
    startTime: {},
    endTime: {},
    speed: {}
  };
  constructor(props) {
    super(props);
    this.name = "AnimationStart";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      animation,
      startTime,
      endTime,
      speed
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const animationIndex = this.resolveRef(animation);
    const validAnimation = this.graphEngine.getWorld().animations.length > animationIndex && animationIndex >= 0;
    const validStartTime = !isNaN(startTime) && isFinite(startTime);
    // Infinite end times are valid and represent unbounded playback. Only the start time is
    // required to be finite by the KHR_interactivity animation/start operation.
    const validEndTime = !isNaN(endTime);
    const validSpeed = !isNaN(speed) && isFinite(speed) && speed > 0;
    if (validAnimation && validStartTime && validEndTime && validSpeed) {
      this.graphEngine.animationCompletionCallbacks.set(animationIndex, () => {
        if (this.flows.done) {
          this.addEventToWorkQueue(this.flows.done);
        }
      });
      this.graphEngine.startAnimation(animationIndex, startTime, endTime, speed, () => this.graphEngine.completeAnimation(animationIndex));
      if (this.flows.out) {
        this.processFlow(this.flows.out);
      }
    } else {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
    }
  }
}

class AnimationStop extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    animation: {}
  };
  constructor(props) {
    super(props);
    this.name = "AnimationStop";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      animation
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const animationIndex = this.resolveRef(animation);
    const validAnimation = this.graphEngine.getWorld().animations.length > animationIndex && animationIndex >= 0;
    if (validAnimation) {
      this.graphEngine.animationCompletionCallbacks.delete(animationIndex);
      this.graphEngine.stopAnimation(animationIndex);
      if (this.flows.out) {
        this.processFlow(this.flows.out);
      }
    } else {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
    }
  }
}

class AnimationStopAt extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    animation: {},
    stopTime: {}
  };
  constructor(props) {
    super(props);
    this.name = "AnimationStopAt";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      animation,
      stopTime
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const animationIndex = this.resolveRef(animation);
    const validAnimation = this.graphEngine.getWorld().animations.length > animationIndex && animationIndex >= 0;
    // spec: only NaN is invalid; an out-of-range stop time lets the animation reach its end
    const validStopTime = !isNaN(stopTime);
    if (validAnimation && validStopTime) {
      this.graphEngine.stopAnimationAt(animationIndex, stopTime, () => {
        if (this.flows.done) {
          this.addEventToWorkQueue(this.flows.done);
        }
      });
      if (this.flows.out) {
        this.processFlow(this.flows.out);
      }
    } else {
      if (this.flows.err) {
        this.processFlow(this.flows.err);
      }
    }
  }
}

class OnHoverIn extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    nodeIndex: {
      defaultValue: [-1]
    }
  };
  _nodeIndex;
  constructor(props) {
    super(props);
    this.name = 'OnHoverIn';
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      nodeIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._nodeIndex = Number(nodeIndex[0]);
    this.outValues.hoveredNode = {
      type: this.getTypeIndex('ref'),
      value: [null]
    };
    this.outValues.controllerIndex = {
      type: this.getTypeIndex('int'),
      value: [-1]
    };
    this.outValues.event = {
      type: this.getTypeIndex('ref'),
      value: [this._nodeIndex]
    };
    this.setUpOnHoverIn();
  }
  setUpOnHoverIn() {
    const callback = (selectedNodeRef, controllerIndex, firstCommonHoverNodeIndex) => {
      const hoverInformation = this.graphEngine.hoverableNodesIndices.get(this._nodeIndex);
      if (hoverInformation) {
        this.outValues.hoveredNode = {
          type: this.getTypeIndex('ref'),
          value: [selectedNodeRef ?? null]
        };
        this.outValues.controllerIndex = {
          type: this.getTypeIndex('int'),
          value: [controllerIndex]
        };
        this.addEventToWorkQueue(this.flows.out);
      }
      this.graphEngine.queueFunctionCall(() => {
        // if (!this.graphEngine.propagationCancelled.has(this._nodeIndex)) {
        const parentNodeIndex = this.graphEngine.getParentNodeIndex(this._nodeIndex);
        this.graphEngine.alertOnHoverIn(selectedNodeRef, controllerIndex, parentNodeIndex, firstCommonHoverNodeIndex);
        // }
      });
    };
    const hoverInformation = this.graphEngine.hoverableNodesIndices.get(this._nodeIndex);
    if (hoverInformation) {
      hoverInformation.callbackHoverIn = callback;
    } else {
      this.graphEngine.hoverableNodesIndices.set(this._nodeIndex, {
        callbackHoverIn: callback
      });
    }
  }
}

class OnHoverOut extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    nodeIndex: {
      defaultValue: [-1]
    }
  };
  _nodeIndex;
  constructor(props) {
    super(props);
    this.name = 'OnHoverOut';
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      nodeIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._nodeIndex = Number(nodeIndex[0]);
    this.outValues.hoveredNode = {
      type: this.getTypeIndex('ref'),
      value: [null]
    };
    this.outValues.controllerIndex = {
      type: this.getTypeIndex('int'),
      value: [-1]
    };
    this.outValues.event = {
      type: this.getTypeIndex('ref'),
      value: [this._nodeIndex]
    };
    this.setUpOnHoverOut();
  }
  setUpOnHoverOut() {
    const callback = (selectedNodeRef, controllerIndex, firstCommonHoverNodeIndex) => {
      const hoverInformation = this.graphEngine.hoverableNodesIndices.get(this._nodeIndex);
      if (hoverInformation) {
        this.outValues.hoveredNode = {
          type: this.getTypeIndex('ref'),
          value: [selectedNodeRef ?? null]
        };
        this.outValues.controllerIndex = {
          type: this.getTypeIndex('int'),
          value: [controllerIndex]
        };
        this.addEventToWorkQueue(this.flows.out);
      }
      this.graphEngine.queueFunctionCall(() => {
        // if (!this.graphEngine.propagationCancelled.has(this._nodeIndex)) {
        const parentNodeIndex = this.graphEngine.getParentNodeIndex(this._nodeIndex);
        this.graphEngine.alertOnHoverOut(selectedNodeRef, controllerIndex, parentNodeIndex, firstCommonHoverNodeIndex);
        // }
      });
    };
    const hoverInformation = this.graphEngine.hoverableNodesIndices.get(this._nodeIndex);
    if (hoverInformation) {
      hoverInformation.callbackHoverOut = callback;
    } else {
      this.graphEngine.hoverableNodesIndices.set(this._nodeIndex, {
        callbackHoverOut: callback
      });
    }
  }
}

// Single source of truth for op -> runtime BehaveEngineNode class. registerKnownBehaviorNodes
// iterates this; tools/tests import it to check parity with the authoring palette (tst/opRegistryParity.test.ts).
const behaveEngineNodeRegistry = [["event/onStart", OnStartNode], ["event/onTick", OnTickNode], ["flow/branch", Branch], ["flow/setDelay", SetDelay], ["flow/cancelDelay", CancelDelay], ["flow/doN", DoN], ["flow/for", ForLoop], ["flow/multiGate", MultiGate], ["flow/sequence", Sequence], ["flow/switch", Switch], ["flow/throttle", Throttle], ["flow/waitAll", WaitAll], ["flow/while", WhileLoop], ["pointer/get", PointerGet], ["pointer/set", PointerSet], ["pointer/interpolate", PointerInterpolate], ["math/abs", AbsoluteValue], ["event/receive", Receive], ["event/send", Send], ["variable/get", VariableGet], ["variable/set", VariableSet], ["variable/interpolate", VariableInterpolate], ["math/E", Euler], ["math/Inf", Inf], ["math/NaN", NotANumber], ["math/Pi", Pi], ["math/Tau", Tau], ["math/sign", Sign], ["math/trunc", Truncate], ["math/floor", Floor], ["math/fract", Fraction], ["math/ceil", Ceil], ["math/round", Round], ["math/neg", Negate], ["math/add", Add], ["math/sub", Subtract], ["math/mul", Multiply], ["math/div", Divide], ["math/rem", Remainder], ["math/min", Min], ["math/max", Max], ["math/mix", Mix], ["math/saturate", Saturate], ["math/clamp", Clamp], ["math/smoothStep", SmoothStep], ["math/rad", DegreeToRadians], ["math/deg", RadiansToDegrees], ["math/sin", Sine], ["math/cos", Cosine], ["math/tan", Tangent], ["math/asin", Arcsine], ["math/acos", Arccosine], ["math/atan", Arctangent], ["math/atan2", Arctangent2], ["math/sinh", HyperbolicSine], ["math/cosh", HyperbolicCosine], ["math/tanh", HyperbolicTangent], ["math/asinh", InverseHyperbolicSine], ["math/acosh", InverseHyperbolicCosine], ["math/atanh", InverseHyperbolicTangent], ["math/exp", Exponential], ["math/log", Log], ["math/log2", Log2], ["math/log10", Log10], ["math/pow", Power], ["math/sqrt", SquareRoot], ["math/cbrt", CubeRoot], ["math/random", Random], ["math/lt", LessThan], ["math/le", LessThanOrEqualTo], ["math/eq", Equality], ["math/ge", GreaterThanOrEqualTo], ["math/gt", GreaterThan], ["math/dot", Dot], ["math/cross", Cross], ["math/normalize", Normalize], ["math/rotate2D", Rotate2D], ["math/rotate3D", Rotate3D], ["math/length", VectorLength], ["math/slerp", Slerp], ["math/isInf", IsInfNode], ["math/isNaN", IsNaNNode], ["math/select", Select], ["math/switch", MathSwitch], ["math/extract2", Extract2], ["math/extract3", Extract3], ["math/extract4", Extract4], ["math/extract2x2", Extract2x2], ["math/extract3x3", Extract3x3], ["math/extract4x4", Extract4x4], ["math/combine2", Combine2], ["math/combine3", Combine3], ["math/combine4", Combine4], ["math/combine2x2", Combine2x2], ["math/combine3x3", Combine3x3], ["math/combine4x4", Combine4x4], ["type/boolToInt", BoolToInt], ["type/boolToFloat", BoolToFloat], ["type/floatToBool", FloatToBool], ["type/floatToInt", FloatToInt], ["type/intToBool", IntToBool], ["type/intToFloat", IntToFloat], ["math/not", Not], ["math/xor", Xor], ["math/or", Or], ["math/and", And], ["math/lsl", LeftShift], ["math/asr", RightShift], ["math/clz", CountLeadingZeros], ["math/ctz", CountTrailingZeros], ["math/popcnt", CountOneBits], ["math/quatMul", QuatMul], ["math/quatConjugate", QuatConjugate], ["math/quatFromAxisAngle", QuatFromAxisAngle], ["math/quatAngleBetween", QuatAngleBetween], ["math/quatSlerp", QuatSlerp], ["math/quatToAxisAngle", QuatToAxisAngle], ["math/quatFromDirections", QuatFromDirections], ["math/quatFromUpForward", QuatFromUpForward], ["math/quatFromAngles", QuatFromAngles], ["math/matDecompose", MatDecompose], ["math/matCompose", MatCompose], ["math/determinant", Determinant], ["math/transform", Transform], ["math/transpose", Transpose], ["math/matMul", MatMul], ["math/inverse", Inverse], ["debug/log", DebugLog], ["event/stopPropagation", EventStopPropagation], ["ref/eq", RefEquality], ["math/rgbToOkLCh", RgbToOkLCh], ["math/rgbFromOkLCh", RgbFromOkLCh], ["animation/start", AnimationStart], ["animation/stop", AnimationStop], ["animation/stopAt", AnimationStopAt], ["event/onSelect", OnSelect], ["event/onHoverIn", OnHoverIn], ["event/onHoverOut", OnHoverOut]];

/** The graph failed load-time validation; per the spec it is rejected and never runs. */
class GraphRejectedError extends Error {
  constructor(message) {
    super(message);
    this.name = "GraphRejectedError";
  }
}
const defaultNodeHook = _node => {/*no-op*/};
const defaultFlowHook = _flow => {/*no-op*/};
class BasicBehaveEngine {
  registry;
  executionErrorListener;
  idToBehaviourNodeMap;
  eventBus;
  onTickNodeIndices;
  _lastTickTime;
  _pauseTickTime;
  _pauseDuration;
  _scheduledDelays;
  scheduledDelayOwners = new Map();
  nodes;
  _variables;
  events;
  types;
  jsonPtrTrie;
  _fps;
  // bumped by clearValueEvaluationCache; node output caches from an older epoch are stale
  valueEvaluationEpoch = 0;
  compiledOutputs = [];
  _timerID;
  hoverableNodesIndices;
  selectableNodesIndices;
  selectNodes;
  lastHoveredNodeIndices;
  rigidBodyTriggerNodeIndices;
  propagationCancelled;
  propagationCancelledPending;
  animationCompletionCallbacks;
  constructor(fps, eventBus) {
    this.registry = new Map();
    this.idToBehaviourNodeMap = new Map();
    this.jsonPtrTrie = new JsonPtrTrie();
    this._fps = fps;
    this.onTickNodeIndices = [];
    this._lastTickTime = NaN;
    this._pauseTickTime = NaN;
    this._pauseDuration = 0;
    this.eventBus = eventBus;
    this._variables = [];
    this.events = [];
    this._scheduledDelays = [];
    this.nodes = [];
    this.types = [];
    this._timerID = null;
    this.hoverableNodesIndices = new Map();
    this.lastHoveredNodeIndices = new Map();
    this.selectableNodesIndices = new Map();
    this.selectNodes = [];
    this.rigidBodyTriggerNodeIndices = new Map();
    this.propagationCancelled = new Set();
    this.propagationCancelledPending = new Set();
    this.animationCompletionCallbacks = new Map();
    this.registerKnownBehaviorNodes();
  }
  get lastTickTime() {
    return this._lastTickTime - this._pauseDuration;
  }
  get fps() {
    return this._fps;
  }
  get variables() {
    return this._variables;
  }
  completeAnimation(animationIndex) {
    const callback = this.animationCompletionCallbacks.get(animationIndex);
    callback?.();
    this.animationCompletionCallbacks.delete(animationIndex);
  }
  startAnimation(animationIndex, startTime, endTime, speed, callback) {
    // Implemented by decorators
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stopAnimation(animationIndex) {
    // Implemented by decorators
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stopAnimationAt(animationIndex, stopTime, callback) {
    // Implemented by decorators
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyImpulseToRigidBody(nodeIndex, linearImpulse, angularImpulse) {
    // Implemented by decorators
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyPointImpulseToRigidBody(nodeIndex, impulse, position) {
    // Implemented by decorators
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rayCastRigidBodies(rayStart, rayEnd, collisionFilterIndex) {
    // Implemented by decorators
    return {
      hitNodeIndex: -1,
      hitFraction: undefined,
      hitNormal: undefined
    };
  }
  rigidBodyTriggerEntered(nodeIndex, colliderNodeIndex, motionNodeIndex) {
    const callback = this.rigidBodyTriggerNodeIndices.get(nodeIndex)?.triggerEntered;
    if (callback) {
      callback(colliderNodeIndex, motionNodeIndex);
    }
  }
  rigidBodyTriggerExited(nodeIndex, colliderNodeIndex, motionNodeIndex) {
    const callback = this.rigidBodyTriggerNodeIndices.get(nodeIndex)?.triggerExited;
    if (callback) {
      callback(colliderNodeIndex, motionNodeIndex);
    }
  }
  select(selectedNodeIndex, controllerIndex, selectionPoint, selectionRayOrigin) {
    const onSelectEventIndex = this.events.findIndex(event => event.id === "onSelect");
    const eventRef = `/extensions/KHR_interactivity/events/${onSelectEventIndex}`;
    for (let nodeIndex = selectedNodeIndex;;) {
      this.flushPendingPropagationCancellations();
      if (this.propagationCancelled.has(eventRef)) {
        break;
      }
      const callback = this.selectableNodesIndices.get(nodeIndex);
      if (callback !== undefined) {
        callback(`/nodes/${selectedNodeIndex}`, controllerIndex, selectionPoint, selectionRayOrigin, eventRef);
        return;
      }
      const parent = this.getParentNodeIndex(nodeIndex);
      if (parent === undefined) {
        return;
      }
      nodeIndex = parent;
    }
  }
  hoverOn(nodeIndex, controllerIndex) {
    const lastHoverNodeIndex = this.lastHoveredNodeIndices.get(controllerIndex);
    if (nodeIndex === lastHoverNodeIndex) {
      return;
    }
    const oldHoverIndicies = new Set();
    let firstCommonHoverNodeIndex = undefined;
    if (lastHoverNodeIndex !== undefined && nodeIndex !== undefined) {
      let currentOldHoverNodeIndex = lastHoverNodeIndex;
      while (currentOldHoverNodeIndex !== undefined) {
        oldHoverIndicies.add(currentOldHoverNodeIndex);
        currentOldHoverNodeIndex = this.getParentNodeIndex(currentOldHoverNodeIndex);
      }
      let currentHoverNodeIndex = nodeIndex;
      while (currentHoverNodeIndex !== undefined) {
        if (oldHoverIndicies.has(currentHoverNodeIndex)) {
          firstCommonHoverNodeIndex = currentHoverNodeIndex;
          break;
        }
        currentHoverNodeIndex = this.getParentNodeIndex(currentHoverNodeIndex);
      }
    }
    const lastHoverNodeRef = lastHoverNodeIndex !== undefined ? `/nodes/${lastHoverNodeIndex}` : undefined;
    const newHoverNodeRef = nodeIndex !== undefined ? `/nodes/${nodeIndex}` : undefined;
    this.alertOnHoverOut(lastHoverNodeRef, controllerIndex, lastHoverNodeIndex, firstCommonHoverNodeIndex);
    this.alertOnHoverIn(newHoverNodeRef, controllerIndex, nodeIndex, firstCommonHoverNodeIndex);
    this.lastHoveredNodeIndices.set(controllerIndex, nodeIndex);
  }
  alertOnHoverIn(selectedNodeRef, controllerIndex, currentHoverNodeIndex, firstCommonHoverNodeIndex) {
    while (currentHoverNodeIndex !== undefined && currentHoverNodeIndex !== firstCommonHoverNodeIndex) {
      const hoverInformation = this.hoverableNodesIndices.get(currentHoverNodeIndex);
      if (hoverInformation?.callbackHoverIn !== undefined) {
        hoverInformation.callbackHoverIn(selectedNodeRef, controllerIndex, firstCommonHoverNodeIndex);
        break;
      }
      currentHoverNodeIndex = this.getParentNodeIndex(currentHoverNodeIndex);
    }
  }
  alertOnHoverOut(selectedNodeRef, controllerIndex, currentHoverNodeIndex, firstCommonHoverNodeIndex) {
    while (currentHoverNodeIndex !== undefined && currentHoverNodeIndex !== firstCommonHoverNodeIndex) {
      const hoverInformation = this.hoverableNodesIndices.get(currentHoverNodeIndex);
      if (hoverInformation?.callbackHoverOut !== undefined) {
        hoverInformation.callbackHoverOut(selectedNodeRef, controllerIndex, firstCommonHoverNodeIndex);
        break;
      }
      currentHoverNodeIndex = this.getParentNodeIndex(currentHoverNodeIndex);
    }
  }
  clearScheduledDelays() {
    // actually cancel the pending flow/setDelay timers - dropping the references alone leaves
    // them queued, so their callbacks keep firing after the graph is torn down
    for (let index = 0; index < this._scheduledDelays.length; index++) {
      const delay = this._scheduledDelays[index];
      if (delay !== undefined) {
        clearTimeout(delay);
      }
      this.removeScheduledDelay(index);
    }
    this._scheduledDelays = [];
    this.scheduledDelayOwners.clear();
  }
  dispose = () => {
    if (this._timerID !== null) {
      clearTimeout(this._timerID);
      this._timerID = null;
    }
    this.clearScheduledDelays();
    this.clearEventList();
    this.clearCustomEventListeners();
  };
  get scheduledDelays() {
    return this._scheduledDelays;
  }
  pushScheduledDelay = (delay, removeOwner) => {
    if (removeOwner) this.scheduledDelayOwners.set(this._scheduledDelays.length, removeOwner);
    this.jsonPtrTrie.addPath(`/extensions/KHR_interactivity/delays/${this._scheduledDelays.length}`, () => [delay], () => undefined, "ref", true);
    this._scheduledDelays.push(delay);
  };
  getScheduledDelay = index => {
    if (index >= this._scheduledDelays.length || index < 0) {
      return undefined;
    }
    return this._scheduledDelays[index];
  };
  cancelScheduledDelay = index => {
    const delay = this.getScheduledDelay(index);
    if (delay !== undefined) {
      clearTimeout(delay);
      this.removeScheduledDelay(index);
    }
  };
  removeScheduledDelay = index => {
    this.scheduledDelayOwners.get(index)?.();
    this.scheduledDelayOwners.delete(index);
    if (index >= 0 && index < this._scheduledDelays.length) {
      this.jsonPtrTrie.removePath(`/extensions/KHR_interactivity/delays/${index}`);
      this._scheduledDelays[index] = undefined;
    }
  };
  getEventList = () => {
    return this.eventBus.getEventList();
  };
  clearEventList = () => {
    this.eventBus.clearEventList();
  };
  addEvent = event => {
    this.eventBus.addEvent(event);
  };
  clearValueEvaluationCache = () => {
    this.valueEvaluationEpoch++;
  };
  getCompiledOutput = (node, socket) => {
    const output = this.compiledOutputs[node]?.[socket];
    if (output && output.version !== this.valueEvaluationEpoch) {
      output.value = output.evaluate();
      output.version = this.valueEvaluationEpoch;
    }
    return output;
  };
  registerJsonPointer = (jsonPtr, getterCallback, setterCallback, typeName, readOnly) => {
    this.jsonPtrTrie.addPath(jsonPtr, getterCallback, setterCallback, typeName, readOnly);
  };
  getRegisteredJsonPointers = () => {
    return this.jsonPtrTrie.getRegisteredPaths();
  };

  // object models replace this one lookup; the accessors below all go through it
  resolveJsonPtr = jsonPtr => {
    return this.jsonPtrTrie.resolve(jsonPtr);
  };
  isValidJsonPtr = jsonPtr => {
    return this.resolveJsonPtr(jsonPtr) !== undefined;
  };
  isReadOnly = jsonPtr => {
    return this.resolveJsonPtr(jsonPtr)?.readOnly ?? false;
  };
  getPathValue = path => {
    return this.resolveJsonPtr(path)?.getValue(path);
  };
  getPathTypeName = path => {
    return this.resolveJsonPtr(path)?.typeName;
  };
  setPathValue = (path, value) => {
    this.resolveJsonPtr(path)?.setValue(path, value);
  };
  addCustomEventListener = (name, func) => {
    this.eventBus.addCustomEventListener(name, func);
  };
  dispatchCustomEvent = (name, vals) => {
    this.eventBus.dispatchCustomEvent(name, vals);
  };
  clearCustomEventListeners = () => {
    this.eventBus.clearCustomEventListeners();
  };
  queueFunctionCall = func => {
    this.eventBus.addEvent({
      func
    });
  };
  registerGraphEventPointers = () => {
    const eventCountWithLifecycleEvents = (this.events?.length ?? 0) + 2;
    this.registerJsonPointer(`/extensions/KHR_interactivity/events/${eventCountWithLifecycleEvents}`, path => [path], () => undefined, "ref", true);
  };
  loadBehaveGraph = (behaveGraph, runGraph = true) => {
    const runtimeGraph = cloneGraphData(behaveGraph);
    this.compiledOutputs = [];
    this.clearValueEvaluationCache();
    this.hoverableNodesIndices.clear();
    this.selectableNodesIndices.clear();
    this.lastHoveredNodeIndices.clear();
    this.propagationCancelled.clear();
    this.propagationCancelledPending.clear();
    this._pauseDuration = 0;
    this._pauseTickTime = NaN;
    try {
      this.validateGraph(runtimeGraph);
    } catch (e) {
      throw new GraphRejectedError(`The graph is invalid: ${e instanceof Error ? e.message : e}`);
    }

    // spec: all top-level graph arrays are optional
    this.nodes = runtimeGraph.nodes ?? [];
    this._variables = runtimeGraph.variables ?? [];
    this.events = runtimeGraph.events ?? [];
    this.types = runtimeGraph.types ?? [];
    this.idToBehaviourNodeMap.clear();
    this.registerGraphEventPointers();
    const defaultProps = {
      idToBehaviourNodeMap: this.idToBehaviourNodeMap,
      variables: this._variables,
      events: this.events
    };
    this._variables.forEach(variable => {
      if (variable.value === undefined) {
        // TODO get the default value from the type
        variable.value = [0];
      }
      // sanitize, these need to be arrays
      if (!Array.isArray(variable.value)) {
        variable.value = [variable.value];
      }
    });
    let index = 0;
    this.nodes.forEach(node => {
      const nodeDeclaration = runtimeGraph.declarations[node.declaration];
      if (nodeDeclaration === undefined) {
        throw new GraphRejectedError(`Unrecognized node declaration ${node.declaration} but declerations has ${Object.keys(runtimeGraph.declarations).length} keys`);
      }
      const behaviourNodeProps = {
        ...defaultProps,
        index: index,
        flows: node.flows || {},
        values: node.values || {},
        configuration: node.configuration || {},
        variables: this._variables,
        types: this.types,
        graphEngine: this,
        declaration: nodeDeclaration,
        addEventToWorkQueue: this.addEventToWorkQueue
      };
      const nodeType = nodeDeclaration.op;
      let behaviourNode;
      try {
        if (this.registry.get(nodeType) === undefined) {
          behaviourNode = new NoOpNode(behaviourNodeProps);
        } else {
          behaviourNode = this.registry.get(nodeType).init(behaviourNodeProps);
        }
      } catch (e) {
        // node constructors validate their configuration/sockets; a throw there is a load-time rejection
        throw new GraphRejectedError(`Node ${index} (${nodeType}) is invalid: ${e instanceof Error ? e.message : e}`);
      }
      this.idToBehaviourNodeMap.set(index, behaviourNode);
      index++;
    });
    this.compiledOutputs = compileValueOutputs(this, this.idToBehaviourNodeMap, new Map(behaveEngineNodeRegistry), this.types);
    compileControlNodes(this, this.idToBehaviourNodeMap, new Map(behaveEngineNodeRegistry), this.compiledOutputs, this.types);
    this.onTickNodeIndices = this.nodes.map((node, idx) => runtimeGraph.declarations[node.declaration].op === "event/onTick" ? idx : -1).filter(idx => idx !== -1);
    const onStartIndices = this.nodes.map((node, idx) => runtimeGraph.declarations[node.declaration].op === "event/onStart" ? idx : -1).filter(idx => idx !== -1);
    for (const startNodeIndex of onStartIndices) {
      const startFlow = {
        node: startNodeIndex,
        socket: "start"
      };
      this.addEventToWorkQueue(startFlow);
    }
    if (this._timerID !== null) {
      clearTimeout(this._timerID);
      this._timerID = null;
    }
    if (runGraph) {
      this.executeEventQueue();
    }
  };
  pauseEventQueue = () => {
    this._pauseTickTime = performance.now();
    if (this._timerID !== null) {
      clearTimeout(this._timerID);
      this._timerID = null;
    }
  };
  playEventQueue = () => {
    if (this._timerID === null) {
      this.executeEventQueue();
    }
  };
  processNodeStarted = defaultNodeHook;
  processAddingNodeToQueue = flowBeingAdded => {
    //pass
  };
  processExecutingNextNode = defaultFlowHook;
  hasExecutionHooks = () => this.processNodeStarted !== defaultNodeHook || this.processExecutingNextNode !== defaultFlowHook;
  processDebugLog = (node, message, severity) => {
    if (severity === 0) {
      console.log(`[DebugLog #${node.index}]`, message);
    } else if (severity === 1) {
      console.warn(`[DebugLog #${node.index}]`, message);
    } else if (severity === 2) {
      console.error(`[DebugLog #${node.index}]`, message);
    }
  };
  registerKnownPointers = () => {
    //pass
  };
  getWorld = () => {
    //pass
  };
  getParentNodeIndex = nodeIndex => {
    //pass
    return undefined;
  };
  isSlerpPath = path => {
    if (path.endsWith("rotation")) {
      return true;
    } else {
      return false;
    }
  };
  animateCubicBezier = (path, p1, p2, initialValue, targetValue, duration, valueType, callback) => {
    this.clearPointerInterpolation(path);
    const startTime = this.lastTickTime;
    const action = async () => {
      const elapsedDuration = (this.lastTickTime - startTime) / 1000;
      const t = Math.min(elapsedDuration / duration, 1);
      // q is the output progress position: the easing curve evaluated at input progress t
      const q = cubicBezierEase(t, p1, p2);
      if (valueType === "float3") {
        const value = [linearFloat(q, initialValue[0], targetValue[0]), linearFloat(q, initialValue[1], targetValue[1]), linearFloat(q, initialValue[2], targetValue[2])];
        this.setPathValue(path, value);
      } else if (valueType === "float4") {
        if (this.isSlerpPath(path)) {
          const value = slerpFloat4(q, initialValue, targetValue);
          this.setPathValue(path, value);
        } else {
          const value = [linearFloat(q, initialValue[0], targetValue[0]), linearFloat(q, initialValue[1], targetValue[1]), linearFloat(q, initialValue[2], targetValue[2]), linearFloat(q, initialValue[3], targetValue[3])];
          this.setPathValue(path, value);
        }
      } else if (valueType === "float") {
        const value = [linearFloat(q, initialValue[0], targetValue[0])];
        this.setPathValue(path, value);
      } else if (valueType == "float2") {
        const value = [linearFloat(q, initialValue[0], targetValue[0]), linearFloat(q, initialValue[1], targetValue[1])];
        this.setPathValue(path, value);
      }
      if (elapsedDuration >= duration) {
        this.setPathValue(path, targetValue);
        this.clearPointerInterpolation(path);
        callback();
      }
    };
    this.setPointerInterpolationCallback(path, {
      action: action
    });
  };
  registerKnownBehaviorNodes = () => {
    for (const [op, behaveEngineNode] of behaveEngineNodeRegistry) {
      this.registerBehaveEngineNode(op, behaveEngineNode);
    }
  };
  validateGraph = behaviorGraph => {
    const nodes = behaviorGraph.nodes ?? [];
    let index = 0;
    for (const node of nodes) {
      // for each node, ensure that it's values do not reference a later node
      if (node.values !== undefined) {
        for (const key of Object.keys(node.values)) {
          if (node.values[key].node !== undefined) {
            const referencedNode = Number(node.values[key].node);
            if (referencedNode >= index) {
              const opOf = idx => {
                const declIdx = nodes[idx]?.declaration;
                return behaviorGraph.declarations?.[declIdx]?.op ?? `declaration ${declIdx}`;
              };
              throw Error(`Invalid reference: node ${index} ('${opOf(index)}', socket '${key}') references node ${referencedNode} ('${opOf(referencedNode)}'), but a node may only reference nodes that appear earlier in the array (index < ${index}). Reorder the nodes so that node ${referencedNode} comes before node ${index}.`);
            }
          }
        }
      }
      index++;
    }
  };
  registerBehaveEngineNode = (type, behaviorNode) => {
    if (this.registry.has(type)) {
      console.warn(`Behavior node ${type} is already registered and will be overwritten`);
    }
    this.registry.set(type, behaviorNode);
  };
  addEventToWorkQueue = flow => {
    if (flow === undefined || flow.node === undefined) {
      return;
    }
    const nextNode = this.idToBehaviourNodeMap.get(Number(flow.node));
    if (nextNode === undefined) {
      return;
    }
    this.processAddingNodeToQueue(flow);
    this.eventBus.addEvent({
      behaveNode: nextNode,
      inSocketId: flow.socket
    });
  };
  executeEventQueueTick = () => {
    this.executeEventQueue(true);
  };
  executeEventQueue = (manualStep = false) => {
    // process events in queue
    this._lastTickTime = performance.now();
    if (!isNaN(this._pauseTickTime)) {
      this._pauseDuration += this._lastTickTime - this._pauseTickTime;
      this._pauseTickTime = NaN;
    }
    this.propagationCancelled.clear();
    this.propagationCancelledPending.clear();

    // events queued while processing run on the next tick
    const eventQueue = this.eventBus.getEventList().slice();
    this.eventBus.clearEventList();
    for (let i = 0; i < eventQueue.length; i++) {
      const eventToStart = eventQueue[i];
      if (eventToStart.behaveNode) {
        eventToStart.behaveNode.processNode(eventToStart.inSocketId);
      } else if (eventToStart.func) {
        eventToStart.func();
      }
    }

    // process interpolations
    for (const interpolation of Object.values(this.eventBus.getVariableInterpolationCallbacks())) {
      interpolation.action();
    }
    for (const interpolation of Object.values(this.eventBus.getPointerInterpolationCallbacks())) {
      interpolation.action();
    }

    // process onTick nodes
    for (const onTickNodeIndex of this.onTickNodeIndices) {
      const tickFlow = {
        node: onTickNodeIndex,
        socket: "tick"
      };
      const tickNode = this.idToBehaviourNodeMap.get(Number(tickFlow.node));
      tickNode.processNode();
    }
    if (this._timerID !== null) {
      clearTimeout(this._timerID);
    }
    if (manualStep) {
      return;
    }
    this._timerID = setTimeout(() => {
      try {
        this.executeEventQueue();
      } catch (e) {
        // a throwing node halts the loop; report it instead of failing silently in a timer
        this._timerID = null;
        if (this.executionErrorListener === undefined) {
          throw e;
        }
        this.executionErrorListener(e);
      }
    }, 1000 / this.fps);
  };

  /** Receives runtime errors that stopped the event loop after the initial load. */
  setExecutionErrorListener = listener => {
    this.executionErrorListener = listener;
  };
  flushPendingPropagationCancellations = () => {
    for (const event of this.propagationCancelledPending) {
      this.propagationCancelled.add(event);
    }
    this.propagationCancelledPending.clear();
  };
  setPointerInterpolationCallback(path, action) {
    this.eventBus.setPointerInterpolationCallback(path, action);
  }
  setVariableInterpolationCallback(variable, action) {
    this.eventBus.setVariableInterpolationCallback(variable, action);
  }
  clearPointerInterpolation(path) {
    this.eventBus.clearPointerInterpolation(path);
  }
  clearVariableInterpolation(variable) {
    this.eventBus.clearVariableInterpolation(variable);
  }
  isEventPropagationCancelled(event) {
    return this.propagationCancelled.has(event);
  }
}
function cloneGraphData(value) {
  if (Array.isArray(value)) {
    return value.map(entry => cloneGraphData(entry));
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneGraphData(entry)]));
  }
  return value;
}

class DOMEventBus {
  eventList;
  customEventListeners;
  eventListeners;
  variableInterpolationCallbacks;
  pointerInterpolationCallbacks;
  constructor() {
    this.eventList = [];
    this.customEventListeners = {};
    this.eventListeners = {};
    this.variableInterpolationCallbacks = {};
    this.pointerInterpolationCallbacks = {};
  }
  getEventList = () => {
    return this.eventList;
  };
  clearEventList = () => {
    this.eventList = [];
  };
  addEvent = event => {
    this.eventList.push(event);
  };
  addCustomEventListener = (name, func) => {
    if (!this.customEventListeners[name]) {
      this.customEventListeners[name] = [];
      const eventListener = e => {
        this.customEventListeners[name].forEach(func => {
          this.eventList.push({
            func: () => func(e),
            inSocketId: name
          });
        });
      };
      document.addEventListener(name, eventListener);
      this.eventListeners[name] = eventListener;
    }
    this.customEventListeners[name].push(func);
  };
  dispatchCustomEvent = (name, vals) => {
    const event = new CustomEvent(name, {
      detail: vals
    });
    document.dispatchEvent(event);
  };
  getCustomEventsNames = () => {
    return Object.keys(this.customEventListeners);
  };
  clearCustomEventListeners = () => {
    this.customEventListeners = {};
    Object.keys(this.eventListeners).forEach(name => {
      document.removeEventListener(name, this.eventListeners[name]);
    });
    this.eventListeners = {};
  };
  setVariableInterpolationCallback = (variable, action) => {
    this.variableInterpolationCallbacks[variable] = action;
  };
  clearVariableInterpolation = variable => {
    if (this.variableInterpolationCallbacks[variable] !== undefined) {
      delete this.variableInterpolationCallbacks[variable];
    }
  };
  getVariableInterpolationCallbacks = () => {
    return this.variableInterpolationCallbacks;
  };
  setPointerInterpolationCallback = (pointer, action) => {
    this.pointerInterpolationCallbacks[pointer] = action;
  };
  clearPointerInterpolation = pointer => {
    if (this.pointerInterpolationCallbacks[pointer] !== undefined) {
      delete this.pointerInterpolationCallbacks[pointer];
    }
  };
  getPointerInterpolationCallbacks = () => {
    return this.pointerInterpolationCallbacks;
  };
}

class ApplyImpulse extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    nodeIndex: {},
    linearImpulse: {},
    angularImpulse: {}
  };
  constructor(props) {
    super(props);
    this.name = "ApplyImpulse";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      nodeIndex,
      linearImpulse,
      angularImpulse
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.applyImpulseToRigidBody(nodeIndex, linearImpulse, angularImpulse);
  }
}

class ApplyPointImpulse extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    nodeIndex: {},
    impulse: {},
    position: {}
  };
  constructor(props) {
    super(props);
    this.name = "ApplyPointImpulse";
    this.validateValues(this.values);
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      nodeIndex,
      impulse,
      position
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    this.graphEngine.applyPointImpulseToRigidBody(nodeIndex, impulse, position);
  }
}

class RayCast extends BehaveEngineNode {
  INPUT_FLOWS = ["in"];
  REQUIRED_VALUES = {
    rayStart: {},
    rayEnd: {},
    collisionFilterIndex: {}
  };
  constructor(props) {
    super(props);
    this.name = "RayCast";
    this.validateValues(this.values);
    this.outValues.hitNode = {
      value: [-1],
      type: this.getTypeIndex('ref')
    };
    this.outValues.hitFraction = {
      value: [NaN],
      type: this.getTypeIndex('float')
    };
    this.outValues.hitNormal = {
      value: [NaN, NaN, NaN],
      type: this.getTypeIndex('vec3')
    };
  }
  processNode(flowSocket) {
    this.graphEngine.clearValueEvaluationCache();
    const {
      rayStart,
      rayEnd,
      collisionFilterIndex
    } = this.evaluateRequiredValues();
    this.graphEngine.processNodeStarted(this);
    const hitResult = this.graphEngine.rayCastRigidBodies(rayStart, rayEnd, collisionFilterIndex);
    if (hitResult.hitNodeIndex < 0) {
      this.outValues.hitNode = {
        value: [-1],
        type: this.getTypeIndex('ref')
      };
      this.outValues.hitFraction = {
        value: [NaN],
        type: this.getTypeIndex('float')
      };
      this.outValues.hitNormal = {
        value: [NaN, NaN, NaN],
        type: this.getTypeIndex('vec3')
      };
      if (this.flows.miss) {
        this.processFlow(this.flows.miss);
      }
    } else {
      this.outValues.hitNode = {
        value: [hitResult.hitNodeIndex],
        type: this.getTypeIndex('ref')
      };
      this.outValues.hitFraction = {
        value: [hitResult.hitFraction],
        type: this.getTypeIndex('float')
      };
      this.outValues.hitNormal = {
        value: hitResult.hitNormal,
        type: this.getTypeIndex('vec3')
      };
      if (this.flows.hit) {
        this.processFlow(this.flows.hit);
      }
    }
  }
}

class TriggerEntered extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    nodeIndex: {
      defaultValue: [-1]
    }
  };
  _nodeIndex;
  constructor(props) {
    super(props);
    this.name = 'TriggerEntered';
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      nodeIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._nodeIndex = Number(nodeIndex[0]);
    this.outValues.colliderNode = {
      type: this.getTypeIndex('ref'),
      value: [-1]
    };
    this.outValues.motionNode = {
      type: this.getTypeIndex('ref'),
      value: [-1]
    };
    this.setUpOnTriggerEntered();
  }
  setUpOnTriggerEntered() {
    const callback = (colliderNodeRef, motionNodeRef) => {
      this.outValues.colliderNode = {
        type: this.getTypeIndex('ref'),
        value: [colliderNodeRef]
      };
      this.outValues.motionNode = {
        type: this.getTypeIndex('ref'),
        value: [motionNodeRef ?? -1]
      };
      console.log("TriggerEntered", {
        node: this._nodeIndex,
        outValues: this.outValues
      });
      this.addEventToWorkQueue(this.flows.out);
    };
    const triggerCallbacks = this.graphEngine.rigidBodyTriggerNodeIndices.get(this._nodeIndex);
    if (triggerCallbacks) {
      triggerCallbacks.triggerEntered = callback;
    } else {
      this.graphEngine.rigidBodyTriggerNodeIndices.set(this._nodeIndex, {
        triggerEntered: callback
      });
    }
  }
}

class TriggerExited extends BehaveEngineNode {
  REQUIRED_CONFIGURATIONS = {
    nodeIndex: {
      defaultValue: [-1]
    }
  };
  _nodeIndex;
  constructor(props) {
    super(props);
    this.name = 'TriggerExited';
    this.validateValues(this.values);
    this.validateConfigurations(this.configuration);
    const {
      nodeIndex
    } = this.evaluateAllConfigurations(Object.keys(this.REQUIRED_CONFIGURATIONS));
    this._nodeIndex = Number(nodeIndex[0]);
    this.outValues.colliderNode = {
      type: this.getTypeIndex('ref'),
      value: [-1]
    };
    this.outValues.motionNode = {
      type: this.getTypeIndex('ref'),
      value: [-1]
    };
    this.setUpOnTriggerExited();
  }
  setUpOnTriggerExited() {
    const callback = (colliderNodeRef, motionNodeRef) => {
      this.outValues.colliderNode = {
        type: this.getTypeIndex('ref'),
        value: [colliderNodeRef]
      };
      this.outValues.motionNode = {
        type: this.getTypeIndex('ref'),
        value: [motionNodeRef ?? -1]
      };
      console.log("TriggerExited", {
        node: this._nodeIndex,
        outValues: this.outValues
      });
      this.addEventToWorkQueue(this.flows.out);
    };
    const triggerCallbacks = this.graphEngine.rigidBodyTriggerNodeIndices.get(this._nodeIndex);
    if (triggerCallbacks) {
      triggerCallbacks.triggerExited = callback;
    } else {
      this.graphEngine.rigidBodyTriggerNodeIndices.set(this._nodeIndex, {
        triggerExited: callback
      });
    }
  }
}

class ADecorator {
  behaveEngine;
  constructor(behaveEngine) {
    this.behaveEngine = behaveEngine;
  }
  registerJsonPointer = (jsonPtr, getterCallback, setterCallback, typeName, readOnly) => {
    this.behaveEngine.registerJsonPointer(jsonPtr, getterCallback, setterCallback, typeName, readOnly);
  };

  /**
   * BasicBehaveEngine calls some of its own hooks internally (e.g. `this.getWorld()`,
   * `this.getParentNodeIndex()`) so the decorator's implementation has to be reachable via the
   * wrapped engine's own properties, not just via the decorator instance. Subclasses must call
   * this once, after their own hook fields (getWorld/getParentNodeIndex/startAnimation/
   * stopAnimation/stopAnimationAt) are assigned, to bridge them onto the engine.
   */
  bridgeEngineHooks() {
    this.behaveEngine.getWorld = this.getWorld;
    this.behaveEngine.getParentNodeIndex = this.getParentNodeIndex;
    this.behaveEngine.startAnimation = this.startAnimation;
    this.behaveEngine.stopAnimation = this.stopAnimation;
    this.behaveEngine.stopAnimationAt = this.stopAnimationAt;
  }

  /** Tears down listeners/observers registered by this decorator. Call before discarding it. */
  dispose() {
    // stop the wrapped engine (kills its tick loop + scheduled delays), which also clears its
    // event queue and custom-event listeners - otherwise the old graph keeps running after a
    // new model/graph replaces this decorator
    this.behaveEngine.dispose();
  }
  registerRigidBodyNodes() {
    this.behaveEngine.registerBehaveEngineNode("rigid_body/applyImpulse", ApplyImpulse);
    this.behaveEngine.registerBehaveEngineNode("rigid_body/applyPointImpulse", ApplyPointImpulse);
    this.behaveEngine.registerBehaveEngineNode("rigid_body/rayCast", RayCast);
    this.behaveEngine.registerBehaveEngineNode("event/rigid_body_triggerEntered", TriggerEntered);
    this.behaveEngine.registerBehaveEngineNode("event/rigid_body_triggerExited", TriggerExited);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyImpulseToRigidBody(nodeIndex, linearImpulse, angularImpulse) {
    // Overwrite with application logic here
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyPointImpulseToRigidBody(nodeIndex, impulse, position) {
    // Overwrite with application logic here
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rayCastRigidBodies(rayStart, rayEnd, collisionFilterIndex) {
    // Overwrite with application logic here
    return {
      hitNodeIndex: -1,
      hitFraction: undefined,
      hitNormal: undefined
    };
  }
  rigidBodyTriggerEntered(nodeIndex, colliderNodeIndex, motionNodeIndex) {
    this.behaveEngine.rigidBodyTriggerEntered(nodeIndex, colliderNodeIndex, motionNodeIndex);
  }
  rigidBodyTriggerExited(nodeIndex, colliderNodeIndex, motionNodeIndex) {
    this.behaveEngine.rigidBodyTriggerExited(nodeIndex, colliderNodeIndex, motionNodeIndex);
  }
  hoverOn(nodeIndex, controllerIndex) {
    this.behaveEngine.hoverOn(nodeIndex, controllerIndex);
  }
  select(selectedNodeIndex, controllerIndex, selectionPoint, selectionRayOrigin) {
    this.behaveEngine.select(selectedNodeIndex, controllerIndex, selectionPoint, selectionRayOrigin);
  }
  getEventList() {
    return this.behaveEngine.getEventList();
  }
  clearEventList() {
    this.behaveEngine.clearEventList();
  }
  addEvent(event) {
    this.behaveEngine.addEvent(event);
  }
  addCustomEventListener(name, func) {
    this.behaveEngine.addCustomEventListener(name, func);
  }
  clearCustomEventListeners() {
    this.behaveEngine.clearCustomEventListeners();
  }
  registerBehaveEngineNode(type, behaveEngineNode) {
    this.behaveEngine.registerBehaveEngineNode(type, behaveEngineNode);
  }
  getRegisteredJsonPointers() {
    return this.behaveEngine.getRegisteredJsonPointers();
  }
  resolveJsonPtr(path) {
    return this.behaveEngine.resolveJsonPtr(path);
  }
  isValidJsonPtr(path) {
    return this.behaveEngine.isValidJsonPtr(path);
  }
  isReadOnly(path) {
    return this.behaveEngine.isReadOnly(path);
  }
  isSlerpPath(path) {
    return this.behaveEngine.isSlerpPath(path);
  }
  animateCubicBezier(path, p1, p2, initialValue, targetValue, duration, valueType, callback) {
    this.behaveEngine.animateCubicBezier(path, p1, p2, initialValue, targetValue, duration, valueType, callback);
  }
  get fps() {
    return this.behaveEngine.fps;
  }
  loadBehaveGraph(behaveGraph, runGraph = true) {
    this.behaveEngine.loadBehaveGraph(behaveGraph, runGraph);
  }
  pauseEventQueue() {
    this.behaveEngine.pauseEventQueue();
  }
  playEventQueue() {
    this.behaveEngine.playEventQueue();
  }
  executeEventQueueTick() {
    this.behaveEngine.executeEventQueueTick();
  }
  setExecutionErrorListener(listener) {
    this.behaveEngine.setExecutionErrorListener?.(listener);
  }
  dispatchCustomEvent(name, vals) {
    this.behaveEngine.dispatchCustomEvent(name, vals);
  }
  setPathValue(path, targetValue) {
    this.behaveEngine.setPathValue(path, targetValue);
  }
  getPathValue(path) {
    return this.behaveEngine.getPathValue(path);
  }
  getPathTypeName(path) {
    return this.behaveEngine.getPathTypeName(path);
  }
  clearValueEvaluationCache() {
    this.behaveEngine.clearValueEvaluationCache();
  }
  setPointerInterpolationCallback(path, action) {
    this.behaveEngine.setPointerInterpolationCallback(path, action);
  }
  clearPointerInterpolation(path) {
    this.behaveEngine.clearPointerInterpolation(path);
  }
  setVariableInterpolationCallback(variable, action) {
    this.behaveEngine.setVariableInterpolationCallback(variable, action);
  }
  clearVariableInterpolation(variable) {
    this.behaveEngine.clearVariableInterpolation(variable);
  }
}

// Generated by scripts/generate-runtime-schema.mjs from Khronos schemas and the operation catalogue.
// Runtime validation rules only; documentation annotations are omitted.
const INTERACTIVITY_SCHEMAS = (/* unused pure expression or super */ null && ({
  "declaration.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "declaration.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFProperty.schema.json"
    }],
    "$defs": {
      "declarationValueSocket": {
        "type": "object",
        "allOf": [{
          "$ref": "glTFProperty.schema.json"
        }],
        "properties": {
          "type": {
            "allOf": [{
              "$ref": "glTFid.schema.json"
            }]
          },
          "extensions": {},
          "extras": {}
        },
        "required": ["type"]
      }
    },
    "properties": {
      "op": {
        "type": "string"
      },
      "inputValueSockets": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/$defs/declarationValueSocket"
        },
        "minProperties": 1
      },
      "outputValueSockets": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/$defs/declarationValueSocket"
        },
        "minProperties": 1
      },
      "extension": {
        "type": "string"
      },
      "extensions": {},
      "extras": {}
    },
    "required": ["op"],
    "dependentRequired": {
      "inputValueSockets": ["extension"],
      "outputValueSockets": ["extension"]
    }
  },
  "event.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "event.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "nameableProperty.KHR_interactivity.schema.json"
    }],
    "properties": {
      "id": {
        "type": "string"
      },
      "values": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "allOf": [{
            "$ref": "glTFProperty.schema.json"
          }],
          "properties": {
            "type": {
              "allOf": [{
                "$ref": "glTFid.schema.json"
              }]
            },
            "value": {
              "type": "array",
              "minItems": 1
            },
            "extensions": {},
            "extras": {}
          },
          "required": ["type"]
        },
        "minProperties": 1,
        "not": {
          "required": ["event"]
        }
      },
      "name": {},
      "extensions": {},
      "extras": {}
    }
  },
  "glTF.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "glTF.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFProperty.schema.json"
    }],
    "properties": {
      "graphs": {
        "type": "array",
        "items": {
          "$ref": "graph.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "graph": {
        "allOf": [{
          "$ref": "glTFid.schema.json"
        }]
      },
      "extensions": {},
      "extras": {}
    },
    "required": ["graphs"]
  },
  "graph.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "graph.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFChildOfRootProperty.schema.json"
    }],
    "properties": {
      "types": {
        "type": "array",
        "items": {
          "$ref": "type.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "variables": {
        "type": "array",
        "items": {
          "$ref": "variable.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "events": {
        "type": "array",
        "items": {
          "$ref": "event.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "declarations": {
        "type": "array",
        "items": {
          "$ref": "declaration.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "nodes": {
        "type": "array",
        "items": {
          "$ref": "node.KHR_interactivity.schema.json"
        },
        "minItems": 1,
        "maxItems": 2147483648
      },
      "name": {},
      "extensions": {},
      "extras": {}
    },
    "dependentRequired": {
      "variables": ["types"],
      "nodes": ["declarations"]
    }
  },
  "nameableProperty.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "nameableProperty.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFProperty.schema.json"
    }],
    "properties": {
      "name": {
        "type": "string"
      }
    }
  },
  "node.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "node.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFProperty.schema.json"
    }],
    "properties": {
      "declaration": {
        "allOf": [{
          "$ref": "glTFid.schema.json"
        }]
      },
      "configuration": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "allOf": [{
            "$ref": "glTFProperty.schema.json"
          }],
          "properties": {
            "value": {
              "type": "array",
              "minItems": 1
            },
            "extensions": {},
            "extras": {}
          }
        },
        "minProperties": 1
      },
      "values": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "allOf": [{
            "$ref": "glTFProperty.schema.json"
          }],
          "properties": {
            "node": {
              "allOf": [{
                "$ref": "glTFid.schema.json"
              }]
            },
            "socket": {
              "type": "string"
            },
            "type": {
              "allOf": [{
                "$ref": "glTFid.schema.json"
              }]
            },
            "value": {
              "type": "array",
              "minItems": 1
            },
            "extensions": {},
            "extras": {}
          },
          "dependentRequired": {
            "socket": ["node"],
            "value": ["type"]
          },
          "not": {
            "required": ["node", "value"]
          },
          "anyOf": [{
            "required": ["type"]
          }, {
            "required": ["node"]
          }]
        },
        "minProperties": 1
      },
      "flows": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "allOf": [{
            "$ref": "glTFProperty.schema.json"
          }],
          "properties": {
            "node": {
              "allOf": [{
                "$ref": "glTFid.schema.json"
              }]
            },
            "socket": {
              "type": "string"
            },
            "extensions": {},
            "extras": {}
          },
          "required": ["node"]
        },
        "minProperties": 1
      },
      "extensions": {},
      "extras": {}
    },
    "required": ["declaration"]
  },
  "type.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "type.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "glTFProperty.schema.json"
    }],
    "properties": {
      "signature": {
        "type": "string",
        "oneOf": [{
          "const": "bool"
        }, {
          "const": "float"
        }, {
          "const": "float2"
        }, {
          "const": "float3"
        }, {
          "const": "float4"
        }, {
          "const": "float2x2"
        }, {
          "const": "float3x3"
        }, {
          "const": "float4x4"
        }, {
          "const": "int"
        }, {
          "const": "ref"
        }, {
          "const": "custom"
        }]
      },
      "extensions": {},
      "extras": {}
    },
    "required": ["signature"]
  },
  "variable.KHR_interactivity.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "variable.KHR_interactivity.schema.json",
    "type": "object",
    "allOf": [{
      "$ref": "nameableProperty.KHR_interactivity.schema.json"
    }],
    "properties": {
      "type": {
        "allOf": [{
          "$ref": "glTFid.schema.json"
        }]
      },
      "value": {
        "type": "array",
        "minItems": 1
      },
      "name": {},
      "extensions": {},
      "extras": {}
    },
    "required": ["type"]
  },
  "glTFProperty.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "glTFProperty.schema.json",
    "type": "object",
    "properties": {
      "extensions": {
        "$ref": "extensions.schema.json"
      },
      "extras": {
        "$ref": "extras.schema.json"
      }
    }
  },
  "glTFChildOfRootProperty.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "glTFChildOfRootProperty.schema.json",
    "type": "object",
    "$ref": "glTFProperty.schema.json",
    "properties": {
      "name": {
        "type": "string"
      }
    }
  },
  "glTFid.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "glTFid.schema.json",
    "type": "integer",
    "minimum": 0
  },
  "extensions.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "extensions.schema.json",
    "type": "object",
    "additionalProperties": {
      "type": "object"
    }
  },
  "extras.schema.json": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "extras.schema.json"
  }
}));
const OPERATION_SCHEMAS = (/* unused pure expression or super */ null && ({
  "math/E": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/Pi": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/Inf": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/NaN": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/Tau": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/abs": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/sign": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/trunc": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/floor": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/ceil": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/round": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/fract": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/neg": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/add": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/sub": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/mul": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/div": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/rem": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/min": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/max": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/clamp": {
    "inputs": {
      "a": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "c": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/saturate": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/mix": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "c": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/smoothStep": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      },
      "b": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      },
      "c": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/eq": {
    "inputs": {
      "a": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/lt": {
    "inputs": {
      "a": {
        "types": ["int", "float"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/le": {
    "inputs": {
      "a": {
        "types": ["int", "float"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/gt": {
    "inputs": {
      "a": {
        "types": ["int", "float"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/ge": {
    "inputs": {
      "a": {
        "types": ["int", "float"],
        "group": "T"
      },
      "b": {
        "types": ["int", "float"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/rad": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/deg": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/sin": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/cos": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/tan": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/asin": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/acos": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/atan": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/atan2": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      },
      "b": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/isNaN": {
    "inputs": {
      "a": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/isInf": {
    "inputs": {
      "a": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "math/select": {
    "inputs": {
      "condition": {
        "types": ["bool"]
      },
      "a": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"],
        "group": "T"
      },
      "b": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"],
        "group": "T"
      }
    }
  },
  "math/switch": {
    "inputs": {
      "default": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"],
        "group": "T"
      },
      "selection": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"],
        "group": "T"
      }
    }
  },
  "math/random": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "event/onStart": {
    "inputs": {},
    "outputs": {
      "event": {
        "types": ["ref"]
      }
    }
  },
  "event/onTick": {
    "inputs": {},
    "outputs": {
      "event": {
        "types": ["ref"]
      },
      "timeSinceStart": {
        "types": ["float"]
      },
      "timeSinceLastTick": {
        "types": ["float"]
      }
    }
  },
  "event/receive": {
    "inputs": {},
    "outputs": {
      "event": {
        "types": ["ref"]
      }
    }
  },
  "event/send": {
    "inputs": {},
    "outputs": {}
  },
  "event/stopPropagation": {
    "inputs": {
      "stopImmediate": {
        "types": ["bool"]
      },
      "event": {
        "types": ["ref"]
      }
    },
    "outputs": {}
  },
  "flow/switch": {
    "inputs": {
      "selection": {
        "types": ["int"]
      }
    },
    "outputs": {}
  },
  "flow/while": {
    "inputs": {
      "condition": {
        "types": ["bool"]
      }
    },
    "outputs": {}
  },
  "flow/doN": {
    "inputs": {
      "n": {
        "types": ["int"]
      }
    },
    "outputs": {
      "currentCount": {
        "types": ["int"]
      }
    }
  },
  "flow/multiGate": {
    "inputs": {},
    "outputs": {
      "lastIndex": {
        "types": ["int"]
      }
    }
  },
  "flow/waitAll": {
    "inputs": {},
    "outputs": {
      "remainingInputs": {
        "types": ["int"]
      }
    }
  },
  "flow/throttle": {
    "inputs": {
      "duration": {
        "types": ["float"]
      }
    },
    "outputs": {
      "lastRemainingTime": {
        "types": ["float"]
      }
    }
  },
  "flow/setDelay": {
    "inputs": {
      "duration": {
        "types": ["float"]
      }
    },
    "outputs": {
      "lastDelay": {
        "types": ["ref"]
      }
    }
  },
  "flow/cancelDelay": {
    "inputs": {
      "delay": {
        "types": ["ref"]
      }
    },
    "outputs": {}
  },
  "flow/branch": {
    "inputs": {
      "condition": {
        "types": ["bool"]
      }
    },
    "outputs": {}
  },
  "flow/for": {
    "inputs": {
      "startIndex": {
        "types": ["int"]
      },
      "endIndex": {
        "types": ["int"]
      }
    },
    "outputs": {
      "index": {
        "types": ["int"]
      }
    }
  },
  "flow/sequence": {
    "inputs": {},
    "outputs": {}
  },
  "variable/set": {
    "inputs": {},
    "outputs": {}
  },
  "variable/get": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"]
      }
    }
  },
  "variable/interpolate": {
    "inputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"]
      },
      "duration": {
        "types": ["float"]
      },
      "p1": {
        "types": ["float2"]
      },
      "p2": {
        "types": ["float2"]
      }
    },
    "outputs": {}
  },
  "math/sinh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/cosh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/tanh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/asinh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/acosh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/atanh": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/exp": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/log": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/log2": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/log10": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/sqrt": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/cbrt": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/pow": {
    "inputs": {
      "a": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      },
      "b": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float", "float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/length": {
    "inputs": {
      "a": {
        "types": ["float2", "float3", "float4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/normalize": {
    "inputs": {
      "a": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      },
      "isValid": {
        "types": ["bool"]
      }
    }
  },
  "math/dot": {
    "inputs": {
      "a": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      },
      "b": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/cross": {
    "inputs": {
      "a": {
        "types": ["float3"]
      },
      "b": {
        "types": ["float3"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float3"]
      }
    }
  },
  "math/slerp": {
    "inputs": {
      "a": {
        "types": ["float2", "float3"],
        "group": "T"
      },
      "b": {
        "types": ["float2", "float3"],
        "group": "T"
      },
      "c": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float2", "float3"],
        "group": "T"
      }
    }
  },
  "math/rotate2D": {
    "inputs": {
      "a": {
        "types": ["float2"]
      },
      "angle": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float2"]
      }
    }
  },
  "math/rotate3D": {
    "inputs": {
      "a": {
        "types": ["float3"]
      },
      "rotation": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float3"]
      }
    }
  },
  "math/transform": {
    "inputs": {
      "a": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      },
      "b": {
        "types": ["float2x2", "float3x3", "float4x4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float2", "float3", "float4"],
        "group": "T"
      }
    }
  },
  "math/transpose": {
    "inputs": {
      "a": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/determinant": {
    "inputs": {
      "a": {
        "types": ["float2x2", "float3x3", "float4x4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/inverse": {
    "inputs": {
      "a": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "isValid": {
        "types": ["bool"]
      }
    }
  },
  "math/matMul": {
    "inputs": {
      "a": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      },
      "b": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["float2x2", "float3x3", "float4x4"],
        "group": "T"
      }
    }
  },
  "math/matCompose": {
    "inputs": {
      "translation": {
        "types": ["float3"]
      },
      "rotation": {
        "types": ["float4"]
      },
      "scale": {
        "types": ["float3"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4x4"]
      }
    }
  },
  "math/matDecompose": {
    "inputs": {
      "a": {
        "types": ["float4x4"]
      }
    },
    "outputs": {
      "translation": {
        "types": ["float3"]
      },
      "rotation": {
        "types": ["float4"]
      },
      "scale": {
        "types": ["float3"]
      }
    }
  },
  "math/combine2": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float2"]
      }
    }
  },
  "math/combine3": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float3"]
      }
    }
  },
  "math/combine4": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "d": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/combine2x2": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "d": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float2x2"]
      }
    }
  },
  "math/combine3x3": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "d": {
        "types": ["float"]
      },
      "e": {
        "types": ["float"]
      },
      "f": {
        "types": ["float"]
      },
      "g": {
        "types": ["float"]
      },
      "h": {
        "types": ["float"]
      },
      "i": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float3x3"]
      }
    }
  },
  "math/combine4x4": {
    "inputs": {
      "a": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "d": {
        "types": ["float"]
      },
      "e": {
        "types": ["float"]
      },
      "f": {
        "types": ["float"]
      },
      "g": {
        "types": ["float"]
      },
      "h": {
        "types": ["float"]
      },
      "i": {
        "types": ["float"]
      },
      "j": {
        "types": ["float"]
      },
      "k": {
        "types": ["float"]
      },
      "l": {
        "types": ["float"]
      },
      "m": {
        "types": ["float"]
      },
      "n": {
        "types": ["float"]
      },
      "o": {
        "types": ["float"]
      },
      "p": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4x4"]
      }
    }
  },
  "math/extract2": {
    "inputs": {
      "a": {
        "types": ["float2"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      }
    }
  },
  "math/extract3": {
    "inputs": {
      "a": {
        "types": ["float3"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      },
      "2": {
        "types": ["float"]
      }
    }
  },
  "math/extract4": {
    "inputs": {
      "a": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      },
      "2": {
        "types": ["float"]
      },
      "3": {
        "types": ["float"]
      }
    }
  },
  "math/extract2x2": {
    "inputs": {
      "a": {
        "types": ["float2x2"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      },
      "2": {
        "types": ["float"]
      },
      "3": {
        "types": ["float"]
      }
    }
  },
  "math/extract3x3": {
    "inputs": {
      "a": {
        "types": ["float3x3"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      },
      "2": {
        "types": ["float"]
      },
      "3": {
        "types": ["float"]
      },
      "4": {
        "types": ["float"]
      },
      "5": {
        "types": ["float"]
      },
      "6": {
        "types": ["float"]
      },
      "7": {
        "types": ["float"]
      },
      "8": {
        "types": ["float"]
      }
    }
  },
  "math/extract4x4": {
    "inputs": {
      "a": {
        "types": ["float4x4"]
      }
    },
    "outputs": {
      "0": {
        "types": ["float"]
      },
      "1": {
        "types": ["float"]
      },
      "2": {
        "types": ["float"]
      },
      "3": {
        "types": ["float"]
      },
      "4": {
        "types": ["float"]
      },
      "5": {
        "types": ["float"]
      },
      "6": {
        "types": ["float"]
      },
      "7": {
        "types": ["float"]
      },
      "8": {
        "types": ["float"]
      },
      "9": {
        "types": ["float"]
      },
      "10": {
        "types": ["float"]
      },
      "11": {
        "types": ["float"]
      },
      "12": {
        "types": ["float"]
      },
      "13": {
        "types": ["float"]
      },
      "14": {
        "types": ["float"]
      },
      "15": {
        "types": ["float"]
      }
    }
  },
  "math/not": {
    "inputs": {
      "a": {
        "types": ["bool", "int"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int"],
        "group": "T"
      }
    }
  },
  "math/and": {
    "inputs": {
      "a": {
        "types": ["bool", "int"],
        "group": "T"
      },
      "b": {
        "types": ["bool", "int"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int"],
        "group": "T"
      }
    }
  },
  "math/or": {
    "inputs": {
      "a": {
        "types": ["bool", "int"],
        "group": "T"
      },
      "b": {
        "types": ["bool", "int"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int"],
        "group": "T"
      }
    }
  },
  "math/xor": {
    "inputs": {
      "a": {
        "types": ["bool", "int"],
        "group": "T"
      },
      "b": {
        "types": ["bool", "int"],
        "group": "T"
      }
    },
    "outputs": {
      "value": {
        "types": ["bool", "int"],
        "group": "T"
      }
    }
  },
  "math/asr": {
    "inputs": {
      "a": {
        "types": ["int"]
      },
      "b": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "math/lsl": {
    "inputs": {
      "a": {
        "types": ["int"]
      },
      "b": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "math/clz": {
    "inputs": {
      "a": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "math/ctz": {
    "inputs": {
      "a": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "math/popcnt": {
    "inputs": {
      "a": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "type/boolToInt": {
    "inputs": {
      "a": {
        "types": ["bool"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "type/boolToFloat": {
    "inputs": {
      "a": {
        "types": ["bool"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "type/intToBool": {
    "inputs": {
      "a": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "type/intToFloat": {
    "inputs": {
      "a": {
        "types": ["int"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "type/floatToBool": {
    "inputs": {
      "a": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  },
  "type/floatToInt": {
    "inputs": {
      "a": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["int"]
      }
    }
  },
  "pointer/set": {
    "inputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"]
      }
    },
    "outputs": {}
  },
  "pointer/get": {
    "inputs": {},
    "outputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"]
      },
      "isValid": {
        "types": ["bool"]
      }
    }
  },
  "pointer/interpolate": {
    "inputs": {
      "value": {
        "types": ["bool", "int", "float", "float2", "float3", "float4", "float2x2", "float3x3", "float4x4", "ref"]
      },
      "duration": {
        "types": ["float"]
      },
      "p1": {
        "types": ["float2"]
      },
      "p2": {
        "types": ["float2"]
      }
    },
    "outputs": {}
  },
  "animation/start": {
    "inputs": {
      "animation": {
        "types": ["ref"]
      },
      "startTime": {
        "types": ["float"]
      },
      "endTime": {
        "types": ["float"]
      },
      "speed": {
        "types": ["float"]
      }
    },
    "outputs": {}
  },
  "animation/stop": {
    "inputs": {
      "animation": {
        "types": ["ref"]
      }
    },
    "outputs": {}
  },
  "animation/stopAt": {
    "inputs": {
      "animation": {
        "types": ["ref"]
      },
      "stopTime": {
        "types": ["float"]
      }
    },
    "outputs": {}
  },
  "event/onSelect": {
    "extension": "KHR_node_selectability",
    "inputs": {},
    "outputs": {
      "selectedNode": {
        "types": ["ref"]
      },
      "controllerIndex": {
        "types": ["int"]
      },
      "selectionPoint": {
        "types": ["float3"]
      },
      "selectionRayOrigin": {
        "types": ["float3"]
      },
      "event": {
        "types": ["ref"]
      }
    }
  },
  "event/onHoverIn": {
    "extension": "KHR_node_hoverability",
    "inputs": {},
    "outputs": {
      "hoveredNode": {
        "types": ["ref"]
      },
      "controllerIndex": {
        "types": ["int"]
      },
      "event": {
        "types": ["ref"]
      }
    }
  },
  "event/onHoverOut": {
    "extension": "KHR_node_hoverability",
    "inputs": {},
    "outputs": {
      "hoveredNode": {
        "types": ["ref"]
      },
      "controllerIndex": {
        "types": ["int"]
      },
      "event": {
        "types": ["ref"]
      }
    }
  },
  "math/quatConjugate": {
    "inputs": {
      "a": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatMul": {
    "inputs": {
      "a": {
        "types": ["float4"]
      },
      "b": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatAngleBetween": {
    "inputs": {
      "a": {
        "types": ["float4"]
      },
      "b": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float"]
      }
    }
  },
  "math/quatFromAxisAngle": {
    "inputs": {
      "axis": {
        "types": ["float3"]
      },
      "angle": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatFromAngles": {
    "inputs": {
      "x": {
        "types": ["float"]
      },
      "y": {
        "types": ["float"]
      },
      "z": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatToAxisAngle": {
    "inputs": {
      "a": {
        "types": ["float4"]
      }
    },
    "outputs": {
      "axis": {
        "types": ["float3"]
      },
      "angle": {
        "types": ["float"]
      }
    }
  },
  "math/quatFromDirections": {
    "inputs": {
      "a": {
        "types": ["float3"]
      },
      "b": {
        "types": ["float3"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatFromUpForward": {
    "inputs": {
      "up": {
        "types": ["float3"]
      },
      "forward": {
        "types": ["float3"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/quatSlerp": {
    "inputs": {
      "a": {
        "types": ["float4"]
      },
      "b": {
        "types": ["float4"]
      },
      "c": {
        "types": ["float"]
      }
    },
    "outputs": {
      "value": {
        "types": ["float4"]
      }
    }
  },
  "math/rgbToOkLCh": {
    "inputs": {
      "r": {
        "types": ["float"]
      },
      "g": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      }
    },
    "outputs": {
      "l": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "h": {
        "types": ["float"]
      }
    }
  },
  "math/rgbFromOkLCh": {
    "inputs": {
      "l": {
        "types": ["float"]
      },
      "c": {
        "types": ["float"]
      },
      "h": {
        "types": ["float"]
      }
    },
    "outputs": {
      "r": {
        "types": ["float"]
      },
      "g": {
        "types": ["float"]
      },
      "b": {
        "types": ["float"]
      }
    }
  },
  "debug/log": {
    "inputs": {},
    "outputs": {}
  },
  "rigid_body/applyImpulse": {
    "extension": "KHR_physics_rigid_bodies",
    "inputs": {
      "nodeIndex": {
        "types": ["int"]
      },
      "linearImpulse": {
        "types": ["float3"]
      },
      "angularImpulse": {
        "types": ["float3"]
      }
    },
    "outputs": {}
  },
  "rigid_body/applyPointImpulse": {
    "extension": "KHR_physics_rigid_bodies",
    "inputs": {
      "nodeIndex": {
        "types": ["int"]
      },
      "impulse": {
        "types": ["float3"]
      },
      "position": {
        "types": ["float3"]
      }
    },
    "outputs": {}
  },
  "rigid_body/rayCast": {
    "extension": "KHR_physics_rigid_bodies",
    "inputs": {
      "rayStart": {
        "types": ["float3"]
      },
      "rayEnd": {
        "types": ["float3"]
      },
      "collisionFilterIndex": {
        "types": ["int"]
      }
    },
    "outputs": {
      "hitNodeIndex": {
        "types": ["int"]
      },
      "hitFraction": {
        "types": ["float"]
      },
      "hitNormal": {
        "types": ["float3"]
      }
    }
  },
  "event/rigid_body_triggerEntered": {
    "extension": "KHR_physics_rigid_bodies",
    "inputs": {},
    "outputs": {
      "colliderNodeIndex": {
        "types": ["int"]
      },
      "motionNodeIndex": {
        "types": ["int"]
      }
    }
  },
  "event/rigid_body_triggerExited": {
    "extension": "KHR_physics_rigid_bodies",
    "inputs": {},
    "outputs": {
      "colliderNodeIndex": {
        "types": ["int"]
      },
      "motionNodeIndex": {
        "types": ["int"]
      }
    }
  },
  "ref/eq": {
    "inputs": {
      "a": {
        "types": ["ref"]
      },
      "b": {
        "types": ["ref"]
      }
    },
    "outputs": {
      "value": {
        "types": ["bool"]
      }
    }
  }
}));

const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
function fail(message) {
  throw new Error(`Invalid KHR_interactivity: ${message}`);
}
const object = value => value !== null && typeof value === "object" && !Array.isArray(value);

// The checked-in Khronos schemas use this subset of JSON Schema 2020-12. Keep the
// validation rules intact so structural validation follows the specification, not fixtures.
function matches(value, schema, root = schema) {
  if (schema === true) return true;
  if (schema === false) return false;
  if (schema.$ref) {
    const [file, fragment] = schema.$ref.split("#");
    const referencedRoot = file ? INTERACTIVITY_SCHEMAS[file] : root;
    if (!referencedRoot) fail(`unresolved schema ${schema.$ref}`);
    const referenced = fragment ? fragment.slice(1).split("/").reduce((node, key) => node[key], referencedRoot) : referencedRoot;
    if (!matches(value, referenced, referencedRoot)) return false;
  }
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some(type => type === "object" ? object(value) : type === "array" ? Array.isArray(value) : type === "integer" ? Number.isInteger(value) : type === "null" ? value === null : typeof value === type)) return false;
  }
  if (own(schema, "const") && value !== schema.const) return false;
  if (schema.enum && !schema.enum.includes(value)) return false;
  if (schema.allOf && !schema.allOf.every(part => matches(value, part, root))) return false;
  if (schema.anyOf && !schema.anyOf.some(part => matches(value, part, root))) return false;
  if (schema.oneOf && schema.oneOf.filter(part => matches(value, part, root)).length !== 1) return false;
  if (schema.not && matches(value, schema.not, root)) return false;
  if (typeof value === "number" && (value < (schema.minimum ?? -Infinity) || value > (schema.maximum ?? Infinity))) return false;
  if (typeof value === "string" && (value.length < (schema.minLength ?? 0) || schema.pattern && !new RegExp(schema.pattern).test(value))) return false;
  if (Array.isArray(value)) {
    if (value.length < (schema.minItems ?? 0) || value.length > (schema.maxItems ?? Infinity)) return false;
    if (schema.items && !value.every(item => matches(item, schema.items, root))) return false;
    if (schema.uniqueItems && new Set(value.map(item => JSON.stringify(item))).size !== value.length) return false;
  }
  if (object(value)) {
    if ((schema.required ?? []).some(key => !own(value, key))) return false;
    if (Object.keys(value).length < (schema.minProperties ?? 0)) return false;
    for (const [key, entry] of Object.entries(value)) {
      if (schema.properties && own(schema.properties, key)) {
        if (!matches(entry, schema.properties[key], root)) return false;
      } else if (schema.additionalProperties !== undefined && !matches(entry, schema.additionalProperties, root)) return false;
      if ((schema.dependentRequired?.[key] ?? []).some(dependency => !own(value, dependency))) return false;
    }
  }
  return true;
}
function validateInteractivityExtension(extension) {
  // Non-default graphs may be invalid without invalidating the default graph.
  if (!object(extension) || !Array.isArray(extension.graphs) || extension.graphs.length === 0) fail("graphs must be a nonempty array");
  const index = extension.graph === undefined ? 0 : extension.graph;
  if (!Number.isInteger(index) || index < 0 || index >= extension.graphs.length) fail("default graph index is out of range");
  validateInteractivityGraph(extension.graphs[index]);
}
function validateInteractivityGraph(graph) {
  if (!matches(graph, INTERACTIVITY_SCHEMAS["graph.KHR_interactivity.schema.json"])) fail("graph does not match the Khronos JSON schema");
  const types = graph.types ?? [];
  const variables = graph.variables ?? [];
  const events = graph.events ?? [];
  const declarations = graph.declarations ?? [];
  const nodes = graph.nodes ?? [];
  const index = (value, length, label) => {
    if (!Number.isInteger(value) || value < 0 || value >= length) fail(`${label} index is out of range`);
    return value;
  };
  const signature = value => types[index(value, types.length, "type")].signature;
  const literal = entry => {
    const type = signature(entry.type);
    if (entry.value === undefined || type === "custom") return type;
    const count = {
      bool: 1,
      int: 1,
      float: 1,
      float2: 2,
      float3: 3,
      float4: 4,
      float2x2: 4,
      float3x3: 9,
      float4x4: 16,
      ref: 1
    };
    if (entry.value.length !== count[type]) fail(`wrong component count for ${type}`);
    for (const value of entry.value) {
      if (type === "bool") {
        if (typeof value !== "boolean") fail("bool value must be boolean");
      } else if (type === "int") {
        if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) fail("int value must be int32");
      } else if (type === "ref") {
        if (value !== null && (typeof value !== "string" || value !== "" && !value.startsWith("/") || /~(?:[^01]|$)/.test(value))) fail("invalid JSON pointer reference");
      } else if (typeof value !== "number" && !["NaN", "Infinity", "-Infinity"].includes(value)) fail("float component must be numeric");
    }
    return type;
  };
  const unique = (values, label) => {
    if (new Set(values).size !== values.length) fail(`duplicate ${label}`);
  };
  unique(types.filter(type => type.signature !== "custom").map(type => type.signature), "type signatures");
  variables.forEach(literal);
  unique(events.filter(event => event.id !== undefined).map(event => event.id), "event ids");
  for (const event of events) for (const [id, value] of Object.entries(event.values ?? {})) {
    if (id === "event") fail("reserved event socket id");
    literal(value);
  }
  unique(declarations.map(declaration => JSON.stringify([declaration.op, declaration.extension ?? ""])), "declarations");
  for (const declaration of declarations) {
    if (!declaration.extension) {
      if (!OPERATION_SCHEMAS[declaration.op] || OPERATION_SCHEMAS[declaration.op].extension) fail(`unknown core operation ${declaration.op}`);
      if (declaration.inputValueSockets || declaration.outputValueSockets) fail("core declaration cannot redefine sockets");
    }
    for (const socket of Object.values(declaration.inputValueSockets ?? {})) literal(socket);
    for (const socket of Object.values(declaration.outputValueSockets ?? {})) literal(socket);
  }
  const outputs = [];
  nodes.forEach((node, nodeIndex) => {
    const declaration = declarations[index(node.declaration, declarations.length, "declaration")];
    const op = declaration.op;
    // Extension operations have exactly the value sockets their declaration defines.
    const spec = declaration.extension ? undefined : OPERATION_SCHEMAS[op];
    const inputs = {};
    for (const [id, source] of Object.entries(node.values ?? {})) {
      if (source.node !== undefined) {
        const ref = index(source.node, nodeIndex, "input node");
        const socket = source.socket ?? "value";
        const type = outputs[ref][socket];
        if (!type) fail(`node ${nodeIndex} input ${id} references output socket ${socket} not defined by node ${ref}`);
        if (source.type !== undefined && signature(source.type) !== type) fail("wired input type does not match output");
        inputs[id] = type;
      } else inputs[id] = literal(source);
    }
    for (const flow of Object.values(node.flows ?? {})) {
      index(flow.node, nodes.length, "flow node");
      if (flow.node <= nodeIndex) fail("output flow must point to a later node");
    }
    const config = key => node.configuration?.[key]?.value;
    const requireType = (key, allowed) => {
      const type = inputs[key];
      if (!type || allowed && !allowed.includes(type)) fail(`invalid or missing ${op} input ${key}`);
      return type;
    };
    const groups = {};
    for (const [key, socket] of Object.entries(spec?.inputs ?? {})) {
      const type = requireType(key, socket.types);
      if (socket.group) {
        if (groups[socket.group] && groups[socket.group] !== type) fail(`inconsistent ${op} type group ${socket.group}`);
        groups[socket.group] = type;
      }
    }
    if (!spec) for (const [key, socket] of Object.entries(declaration.inputValueSockets ?? {})) requireType(key, [signature(socket.type)]);
    const output = {};
    for (const [key, socket] of Object.entries(spec?.outputs ?? {})) output[key] = socket.group ? groups[socket.group] ?? socket.types[0] : socket.types[0];
    if (!spec) for (const [key, socket] of Object.entries(declaration.outputValueSockets ?? {})) output[key] = signature(socket.type);
    if (spec && op.startsWith("variable/")) {
      const ids = op === "variable/set" ? config("variables") : config("variable");
      if (!ids?.length) fail(`missing ${op} variable configuration`);
      for (const id of ids) index(id, variables.length, "variable");
      const type = signature(variables[ids[0]].type);
      if (op === "variable/get") output.value = type;
      if (op === "variable/set") for (const id of ids) requireType(String(id), [signature(variables[id].type)]);
      if (op === "variable/interpolate") {
        requireType("value", [type]);
        if (!type.startsWith("float")) fail("variable interpolation requires a float type");
        const slerp = config("useSlerp");
        if (!slerp || slerp.length !== 1 || typeof slerp[0] !== "boolean" || slerp[0] && type !== "float4") fail("invalid useSlerp");
      }
    }
    if (spec && (op === "event/send" || op === "event/receive")) {
      const id = config("event")?.[0];
      const event = events[index(id, events.length, "event")];
      for (const [key, socket] of Object.entries(event.values ?? {})) {
        if (op === "event/send") requireType(key, [signature(socket.type)]);else output[key] = signature(socket.type);
      }
    }
    if (spec && op.startsWith("pointer/")) {
      const pointer = config("pointer");
      if (!pointer || pointer.length !== 1 || typeof pointer[0] !== "string") fail("invalid pointer configuration");
      const parsed = parsePathTemplate(pointer[0]);
      if (!parsed.valid) fail("invalid pointer template");
      const type = signature(config("type")?.[0]);
      for (const socket of parsed.sockets) {
        if (op === "pointer/set" && socket.id === "value" || op === "pointer/interpolate" && ["value", "duration", "p1", "p2"].includes(socket.id)) fail("reserved pointer socket id");
        requireType(socket.id, [socket.kind === "index" ? "int" : "ref"]);
      }
      if (op === "pointer/get") output.value = type;else requireType("value", [type]);
      if (op === "pointer/interpolate" && !type.startsWith("float")) fail("pointer interpolation requires a float type");
    }
    if (spec && op === "math/switch") {
      const type = requireType("default");
      const cases = config("cases") ?? [];
      // Invalid int32 configurations use the empty default, as in MathSwitch.
      if (cases.every(value => value === (value | 0))) {
        for (const value of new Set(cases)) requireType(String(value), [type]);
      }
      output.value = type;
    }
    if (spec && op === "debug/log") {
      const message = config("message")?.[0];
      if (typeof message === "string") for (const parameter of parseMessageTemplate(message) ?? []) requireType(parameter.id);
    }
    outputs.push(output);
  });
}


//# 

;// external "__X_ITE_X3D__ .Color3"
const external_X_ITE_X3D_Color3_namespaceObject = __X_ITE_X3D__ .Color3;
var external_X_ITE_X3D_Color3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Color3_namespaceObject);
;// external "__X_ITE_X3D__ .Color4"
const external_X_ITE_X3D_Color4_namespaceObject = __X_ITE_X3D__ .Color4;
var external_X_ITE_X3D_Color4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Color4_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix3"
const external_X_ITE_X3D_Matrix3_namespaceObject = __X_ITE_X3D__ .Matrix3;
var external_X_ITE_X3D_Matrix3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix3_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .Quaternion"
const external_X_ITE_X3D_Quaternion_namespaceObject = __X_ITE_X3D__ .Quaternion;
var external_X_ITE_X3D_Quaternion_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Quaternion_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Vector4"
const external_X_ITE_X3D_Vector4_namespaceObject = __X_ITE_X3D__ .Vector4;
var external_X_ITE_X3D_Vector4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector4_namespaceObject);
;// external "__X_ITE_X3D__ .DEVELOPMENT"
const external_X_ITE_X3D_DEVELOPMENT_namespaceObject = __X_ITE_X3D__ .DEVELOPMENT;
var external_X_ITE_X3D_DEVELOPMENT_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_DEVELOPMENT_namespaceObject);
;// ./src/x_ite/Components/X_ITE/BehaviorEngine.js




















const Types = new Map ([
   [(external_X_ITE_X3D_X3DConstants_default()).SFBool,       "bool"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFColor,      "float3"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFColorRGBA,  "float4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFDouble,     "float"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFFloat,      "float"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFInt32,      "int"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFMatrix3d,   "float3x3"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFMatrix3f,   "float3x3"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFMatrix4d,   "float4x4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFMatrix4f,   "float4x4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFQuaternion, "float4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFRotation,   "float4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFTime,       "float"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec2d,      "float2"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec2f,      "float2"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec3d,      "float3"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec3f,      "float3"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec4d,      "float4"],
   [(external_X_ITE_X3D_X3DConstants_default()).SFVec4f,      "float4"],
]);

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function BehaviorEngine (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).BehaviorEngine);

   // Private properties

   this .hoverabilityNodes  = [ ];
   this .selectabilityNodes = [ ];
   this .animations         = [ ];
   this .transformNodes     = new Map ();
   this .parents            = new Map ();
   this .pointers           = new Map ();
   this .cache              = new Map ();
}

Object .assign (Object .setPrototypeOf (BehaviorEngine .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
{
   Color3: new (external_X_ITE_X3D_Color3_default()) (),
   Color4: new (external_X_ITE_X3D_Color4_default()) (),
   Matrix3: new (external_X_ITE_X3D_Matrix3_default()) (),
   Matrix4: new (external_X_ITE_X3D_Matrix4_default()) (),
   Quaternion: new (external_X_ITE_X3D_Quaternion_default()) (),
   Rotation4: new (external_X_ITE_X3D_Rotation4_default()) (),
   Vector2: new (external_X_ITE_X3D_Vector2_default()) (),
   Vector3: new (external_X_ITE_X3D_Vector3_default()) (),
   Vector4: new (external_X_ITE_X3D_Vector4_default()) (),
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);

      // Engine

      this .fps      = 60;
      this .eventBus = new DOMEventBus ();
      this .engine   = new BasicBehaveEngine (this .fps, this .eventBus);

      this .engine .getWorld           = () => this .getWorld ();
      this .engine .startAnimation     = (... args) => this .startAnimation (... args);
      this .engine .stopAnimation      = (... args) => this .stopAnimation (... args);
      this .engine .stopAnimationAt    = (... args) => this .stopAnimationAt (... args);
      this .engine .getParentNodeIndex = (... args) => this .getParentNodeIndex (... args);

      // Events

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled       .addInterest ("set_enabled__",       this);
      this ._graph         .addInterest ("set_graph__",         this);
      this ._graphs        .addInterest ("set_graph__",         this);
      this ._hoverability  .addInterest ("set_hoverability__",  this);
      this ._selectability .addInterest ("set_selectability__", this);
      this ._animations    .addInterest ("set_animations__",    this);
      this ._nodes         .addInterest ("set_nodes__",         this);

      this .set_enabled__ ();
      this .set_hoverability__ ();
      this .set_selectability__ ();
      this .set_animations__ ();
      this .set_nodes__ ();
      this .set_graph__ ();
   },
   set_enabled__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
         this .engine .playEventQueue ();
      else
         this .engine .pauseEventQueue ();
   },
   set_graph__ ()
   {
      try
      {
         const
            graph = this ._graphs [this ._graph .getValue ()],
            run   = this .getLive () .getValue () && this ._enabled .getValue ();

         this .engine .clearEventList ();
         this .engine .clearPointerInterpolation ();
         this .engine .clearVariableInterpolation ();
         this .engine .clearScheduledDelays ();
         this .engine .clearValueEvaluationCache ();

         this .engine .loadBehaveGraph (JSON .parse (graph), run);
      }
      catch (error)
      {
         console .error (new Error (`${this .getTypeName ()}: Couldn't parse graph ${this ._graph}.`, { cause: error }));

         this .engine .loadBehaveGraph ({ }, false);
      }
   },
   set_hoverability__ ()
   {
      for (const hoverabilityNode of this .hoverabilityNodes)
         hoverabilityNode ._isOver .removeInterest ("set_over__", this);

      this .hoverabilityNodes .length = 0;

      for (const node of this ._hoverability)
      {
         const hoverabilityNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).TouchSensor, node);

         if (hoverabilityNode)
            this .hoverabilityNodes .push (hoverabilityNode);
      }

      for (const hoverabilityNode of this .hoverabilityNodes)
      {
         const nodeIndex = +hoverabilityNode .getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

         hoverabilityNode ._isOver .addInterest ("set_over__", this, nodeIndex);
      }
   },
   set_selectability__ ()
   {
      for (const selectabilityNode of this .selectabilityNodes)
         selectabilityNode ._touchTime .removeInterest ("set_touchTime__", this);

      this .selectabilityNodes .length = 0;

      for (const node of this ._selectability)
      {
         const selectabilityNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).TouchSensor, node);

         if (selectabilityNode)
            this .selectabilityNodes .push (selectabilityNode);
      }

      for (const selectabilityNode of this .selectabilityNodes)
      {
         const nodeIndex = +selectabilityNode .getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

         selectabilityNode ._touchTime .addInterest ("set_touchTime__", this, nodeIndex);
      }
   },
   set_animations__ ()
   {
      this .animations .length = 0;

      for (const node of this ._animations)
         this .animations .push (external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).TimeSensor, node) && node);

      // Register JSON Pointers

      this .world = null;

      const numAnimations = this .animations .length;

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}`,
         (pointer) => [pointer],
         Function .prototype,
         "ref",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/isPlaying`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation      = this .animations [animationIndex];

            return [!! animation ?.isActive];
         },
         Function .prototype,
         "bool",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/minTime`,
         () => [0],
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/maxTime`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation      = this .animations [animationIndex];

            return [animation ?.cycleInterval ?? 0];
         },
         Function .prototype,
         "float",
         true
      );

      // The playhead returns a number between 0 and maxTime

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/playhead`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation      = this .animations [animationIndex];

            return [animation ? animation .cycleInterval * animation .fraction_changed : NaN];
         },
         Function .prototype,
         "float",
         true
      );

      // The virtual playhead return the current time on the infinite timeline. Can be negative or larger than maxTime

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/virtualPlayhead`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation      = this .animations [animationIndex],
               browser        = this .getBrowser ();

            return [animation ? browser .getCurrentTime () - animation .startTime : NaN];
         },
         Function .prototype,
         "float",
         true
      );
   },
   set_nodes__ ()
   {
      this .transformNodes .clear ();
      this .parents        .clear ();
      this .pointers       .clear ();
      this .cache          .clear ();

      for (const node of this ._nodes)
      {
         const _node = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNode, node);

         if (!_node)
            continue;

         const matrixNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTransformMatrix3DNode, node);

         if (matrixNode)
         {
            const nodeIndex = +matrixNode .getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

            if (nodeIndex >= 0)
            {
               this .transformNodes .set (nodeIndex, _node);

               for (const child of matrixNode ._children)
               {
                  const childNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTransformMatrix3DNode, child);

                  if (childNode)
                     this .parents .set (childNode, nodeIndex);
               }
            }
         }

         const pointers = _node .getMetaData ("Interactivity/pointer", new (external_X_ITE_X3D_Fields_default()).MFString ());

         for (const pointer of pointers)
            this .pointers .set (pointer, _node);
      }

      // Register material pointers.

      const numMaterials = Array .from (this .pointers .keys (),
            key => key .match (/^\/materials\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the number of material nodes.
      this .engine .registerJsonPointer (
         "/materials.length",
         () => [numMaterials],
         Function .prototype,
         "int",
         true
      );

      // Register meshes pointers.

      const numMeshes = Array .from (this .pointers .keys (),
            key => key .match (/^\/meshes\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      const numPrimitives = Array .from (this .pointers .keys (),
            key => key .match (/^\/meshes\/\d+\/primitives\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the material index of the mesh.
      this .engine .registerJsonPointer (
         `/meshes/${numMeshes}/primitives/${numPrimitives}/material`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  materialNode  = this .pointers .get (pointer),
                  materialIndex = +materialNode .getMetaData ("Interactivity/material", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

               return [`/materials/${materialIndex}`];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // Register node pointers.

      const numNodes = Array .from (this .pointers .keys (),
            key => key .match (/^\/nodes\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the parent node of the node.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/parent`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex       = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  parentNodeIndex = this .getParentNodeIndex (nodeIndex);

               if (parentNodeIndex !== undefined)
                  return [`/nodes/${parentNodeIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // Returns the number of child nodes.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/children.length`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  node      = this .transformNodes .get (nodeIndex);

               const numChildren = node ?._children
                  .reduce ((count, child) => count + !!child ?.getValue () .getType ()
                     .includes ((external_X_ITE_X3D_X3DConstants_default()).X3DTransformMatrix3DNode), 0);

               return [numChildren];
            });
         },
         Function .prototype,
         "int",
         true
      );

      // Returns the child node of the node.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/children/${numNodes}`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  match      = pointer .match (/^\/nodes\/(\d+)\/children\/(\d+)/),
                  nodeIndex  = +match [1],
                  childIndex = +match [2],
                  node       = this .transformNodes .get (nodeIndex);

               const children = node ._children .flatMap (child => child ?.getValue ())
                  .filter (childNode => childNode ?.getType ()
                     .includes ((external_X_ITE_X3D_X3DConstants_default()).X3DTransformMatrix3DNode));

               const
                  childNode      = children [childIndex],
                  childNodeIndex = +childNode ?.getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

               if (childNodeIndex >= 0)
                  return [`/nodes/${childNodeIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/matrix`,
         (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const node = this .pointers .get (pointer);

            return [... node .getMatrix ()];
         },
         Function .prototype,
         "float4x4",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/globalMatrix`,
         (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const
               node      = this .pointers .get (pointer),
               nodeIndex = +node .getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

            return [... this .getModelMatrix (nodeIndex, this .Matrix4 .assign ((external_X_ITE_X3D_Matrix4_default()).IDENTITY))];
         },
         Function .prototype,
         "float4x4",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/mesh`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  node      = this .transformNodes .get (nodeIndex),
                  meshIndex = +node .getMetaData ("Interactivity/mesh", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

               if (meshIndex >= 0)
                  return [`/meshes/${meshIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // // Register pointers for the node weights.

      // this .engine .registerJsonPointer (
      //    `/nodes/${numNodes}/weights.length`,
      //    (pointer) =>
      //    {
      //       return this .cache .getOrInsertComputed (pointer, () =>
      //       {
      //          const
      //             nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
      //             weights   = this .pointers .get (`/nodes/${nodeIndex}/weights`);

      //          return [weights ?._value .length];
      //       });
      //    },
      //    Function .prototype,
      //    "int",
      //    true
      // );

      // this .engine .registerJsonPointer (
      //    `/nodes/${numNodes}/weights`,
      //    (pointer) =>
      //    {
      //       console .log (pointer)
      //    },
      //    (pointer, value) =>
      //    {
      //       console .log (pointer)
      //    },
      //    "float",
      //    false
      // );

      // console .log (this .engine .resolveJsonPtr ("/nodes/947/weights/0") ?.getterCallback ("/nodes/947/weights/0"));

      // Register pointers for the active camera.

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/position`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode)
               return [NaN, NaN, NaN];

            viewpointNode .getCameraSpaceMatrix () .getTransform (this .Vector3);

            return [... this .Vector3];
         },
         Function .prototype,
         "float3",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/rotation`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode)
               return [NaN, NaN, NaN, NaN];

            viewpointNode .getCameraSpaceMatrix () .getTransform (null, this .Rotation4);

            return [... this .Rotation4 .getQuaternion (this .Quaternion)];
         },
         Function .prototype,
         "float4",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/yfov`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getUserFieldOfView ()];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/znear`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getNearDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/zfar`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getFarDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/aspectRatio`,
         () =>
         {
            const layerNode = this .getBrowser () .getActiveLayer ();

            if (!layerNode)
               return [NaN];

            const viewport = layerNode .getViewport () .getRectangle ();

            return [viewport [2] / viewport [3]];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/znear`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getNearDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/zfar`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getFarDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/xmag`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getUserSizeX () / 2];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/ymag`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getUserSizeY () / 2];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/aspectRatio`,
         () =>
         {
            const layerNode = this .getBrowser () .getActiveLayer ();

            if (!layerNode)
               return [NaN];

            const viewport = layerNode .getViewport () .getRectangle ();

            return [viewport [2] / viewport [3]];
         },
         Function .prototype,
         "float",
         true
      );

      // Register common node pointers.

      const nums = {
         materials: numMaterials,
         meshes: numMeshes,
         nodes: numNodes,
      };

      const pointers = new Map (Array .from (this .pointers, ([pointer, node]) =>
      {
         return [
            pointer .replace (/^\/([^/]+)\/\d+\//, (m, p1) => `/${p1}/${nums [p1] ?? 0}/`),
            node,
         ];
      }));

      pointers .delete (`/nodes/${numNodes}/matrix`);
      pointers .delete (`/nodes/${numNodes}/globalMatrix`);

      for (const [pointer, node] of pointers)
         this .registerJsonPointer (pointer, node);

      // DEBUG
      // console .log (this .engine .resolveJsonPtr ("/extensions/KHR_interactivity/activeCamera/perspective/yfov") ?.getterCallback ("/extensions/KHR_interactivity/activeCamera/perspective/yfov"));
   },
   registerJsonPointer (pointer, node)
   {
      // Register getter and setter for the property.

      if (/(?:^\/meshes\/)/ .test (pointer))
         return;

      const
         field     = node .getField (external_X_ITE_X3D_GLTFPointerAliases_default().getAlias (pointer, node)),
         baseColor = external_X_ITE_X3D_GLTFPointerAliases_default().isBaseColor (node, field),
         type      = baseColor ? "float4" : Types .get (field .getType ());

      if (!type)
         return;

      this .engine .registerJsonPointer (
         pointer,
         field .isReadable () ? (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const [baseColor, field, transparency] = this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  node      = this .pointers .get (pointer),
                  field     = node .getField (external_X_ITE_X3D_GLTFPointerAliases_default().getAlias (pointer, node)),
                  baseColor = external_X_ITE_X3D_GLTFPointerAliases_default().isBaseColor (node, field);

               return [baseColor, field, node ._transparency];
            });

            switch (field .getType ())
            {
               case (external_X_ITE_X3D_X3DConstants_default()).SFBool:
               case (external_X_ITE_X3D_X3DConstants_default()).SFDouble:
               case (external_X_ITE_X3D_X3DConstants_default()).SFFloat:
               case (external_X_ITE_X3D_X3DConstants_default()).SFInt32:
               case (external_X_ITE_X3D_X3DConstants_default()).SFTime:
                  return [field .getValue ()];
               case (external_X_ITE_X3D_X3DConstants_default()).SFColor:
                  return baseColor ? [... field, 1 - transparency .getValue ()] : [... field];
               case (external_X_ITE_X3D_X3DConstants_default()).SFRotation:
                  return [... field .getValue () .getQuaternion (this .Quaternion)];
               default:
                  return [... field];
            }
         } : () => [ ],
         field .isWritable () ? (pointer, value) =>
         {
            const [baseColor, field, transparency] = this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  node      = this .pointers .get (pointer),
                  field     = node .getField (external_X_ITE_X3D_GLTFPointerAliases_default().getAlias (pointer, node)),
                  baseColor = external_X_ITE_X3D_GLTFPointerAliases_default().isBaseColor (node, field);

               return [baseColor, field, node ._transparency];
            });

            // if (DEVELOPMENT)
            //    console .log ("set", pointer, field .getName (), value);

            switch (field .getType ())
            {
               case (external_X_ITE_X3D_X3DConstants_default()).SFBool:
               case (external_X_ITE_X3D_X3DConstants_default()).SFDouble:
               case (external_X_ITE_X3D_X3DConstants_default()).SFFloat:
               case (external_X_ITE_X3D_X3DConstants_default()).SFInt32:
               case (external_X_ITE_X3D_X3DConstants_default()).SFTime:
                  field .setValue (value);
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFColor:
               {
                  field .setValue (this .Color3 .set (... value));

                  if (baseColor)
                     transparency .setValue (1 - value [3]);

                  break;
               }
               case (external_X_ITE_X3D_X3DConstants_default()).SFColorRGBA:
                  field .setValue (this .Color4 .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFMatrix3d:
               case (external_X_ITE_X3D_X3DConstants_default()).SFMatrix3f:
                  field .setValue (this .Matrix3 .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFMatrix4d:
               case (external_X_ITE_X3D_X3DConstants_default()).SFMatrix4f:
                  field .setValue (this .Matrix4 .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFQuaternion:
                  field .setValue (this .Quaternion .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFRotation:
                  field .setQuaternion (this .Quaternion .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec2d:
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec2f:
                  field .setValue (this .Vector2 .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec3d:
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec3f:
                  field .setValue (this .Vector3 .set (... value));
                  break;
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec4d:
               case (external_X_ITE_X3D_X3DConstants_default()).SFVec4f:
                  field .setValue (this .Vector4 .set (... value));
                  break;
            }
         } : Function .prototype,
         type,
         !field .isWritable () // read-only
      );
   },
   set_over__ (nodeIndex, over)
   {
      const hit = this .getBrowser () .getHit ();

      this .engine .hoverOn (over .getValue () ? this .getHitNodeIndex (hit, nodeIndex) : undefined);
   },
   set_touchTime__ (nodeIndex)
   {
      const hit = this .getBrowser () .getHit ();

      // Pass nodeIndex, hitPoint and hitRay.point.

      this .engine .select (this .getHitNodeIndex (hit, nodeIndex), 0, [... hit .point], [... hit .ray .point]);

      if ((external_X_ITE_X3D_DEVELOPMENT_default()))
         console .log ("select", nodeIndex, this .getHitNodeIndex (hit, nodeIndex));
   },
   getWorld ()
   {
      return this .world ??= (() =>
      {
         return {
            animations: new Array (this .animations .length),
         };
      })();
   },
   startAnimation (animationIndex, startTime, stopTime, speed, callback)
   {
      const animation = this .animations [animationIndex];

      if (!animation)
         return;

      const
         currentTime = this .getBrowser () .getCurrentTime (),
         key         = Symbol ();

      animation .startTime = currentTime + startTime;
      animation .stopTime  = currentTime + stopTime;

      animation .addFieldCallback (key, "isActive", value =>
      {
         if (value)
            return;

         animation .removeFieldCallback (key, "isActive");
         callback ();
      });
   },
   stopAnimation (animationIndex)
   {
      const animation = this .animations [animationIndex];

      if (!animation)
         return;

      const currentTime = this .getBrowser () .getCurrentTime ();

      animation .stopTime = currentTime;
   },
   stopAnimationAt (animationIndex, stopTime, callback)
   {
      const animation = this .animations [animationIndex];

      if (!animation)
         return;

      const
         currentTime = this .getBrowser () .getCurrentTime (),
         key         = Symbol ();

      animation .stopTime = currentTime + stopTime;

      animation .addFieldCallback (key, "isActive", value =>
      {
         if (value)
            return;

         animation .removeFieldCallback (key, "isActive");
         callback ();
      });
   },
   getHitNodeIndex (hit, nodeIndex)
   {
      const
         shapeParent = hit .shapeParent,
         parentIndex = +shapeParent .getMetaData ("Interactivity/node", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1));

      if (parentIndex >= 0)
         nodeIndex = parentIndex;

      return nodeIndex;
   },
   getParentNodeIndex (nodeIndex)
   {
      return this .parents .get (this .transformNodes .get (nodeIndex));
   },
   getModelMatrix (nodeIndex, modelMatrix)
   {
      let node;

      while ((node = this .transformNodes .get (nodeIndex)))
      {
         modelMatrix .multRight (node .getMatrix ());

         nodeIndex = this .parents .get (node);
      }

      return modelMatrix;
   },
});

Object .defineProperties (BehaviorEngine,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("BehaviorEngine", "X_ITE", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "graph",         new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "graphs",        new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "hoverability",  new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "selectability", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "animations",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "nodes",         new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const BehaviorEngine_default_ = BehaviorEngine;
;

/* harmony default export */ const X_ITE_BehaviorEngine = (external_X_ITE_X3D_Namespace_default().add ("BehaviorEngine", BehaviorEngine_default_));
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
      {
         gl .enable (gl .DEPTH_TEST);
         gl .depthFunc (this .depthFunction);
      }
      else
      {
         gl .disable (gl .DEPTH_TEST);
      }

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
;// external "__X_ITE_X3D__ .X3DShapeNode"
const external_X_ITE_X3D_X3DShapeNode_namespaceObject = __X_ITE_X3D__ .X3DShapeNode;
var external_X_ITE_X3D_X3DShapeNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DShapeNode_namespaceObject);
;// external "__X_ITE_X3D__ .VertexArray"
const external_X_ITE_X3D_VertexArray_namespaceObject = __X_ITE_X3D__ .VertexArray;
var external_X_ITE_X3D_VertexArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_VertexArray_namespaceObject);
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
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("InstancedShape", "X_ITE", 1, "children", "4.0"),
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
;// external "__X_ITE_X3D__ .ShaderRegistry"
const external_X_ITE_X3D_ShaderRegistry_namespaceObject = __X_ITE_X3D__ .ShaderRegistry;
var external_X_ITE_X3D_ShaderRegistry_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ShaderRegistry_namespaceObject);
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
;// ./src/x_ite/Components/X_ITE/RetroreflectionMaterialExtension.js










// Register key.

X_ITE_ExtensionKeys .add ("RETROREFLECTION_MATERIAL_EXTENSION");

// Register textures.



external_X_ITE_X3D_MaterialTextures_default().add ("x3d_RetroreflectionTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function RetroreflectionMaterialExtension (executionContext)
{
   X_ITE_X3DMaterialExtensionNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).RetroreflectionMaterialExtension);
}

Object .assign (Object .setPrototypeOf (RetroreflectionMaterialExtension .prototype, X_ITE_X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X_ITE_X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._retroreflection        .addInterest ("set_retroreflection__",        this);
      this ._retroreflectionTexture .addInterest ("set_retroreflectionTexture__", this);

      this .set_retroreflection__ ();
      this .set_retroreflectionTexture__ ();
   },
   set_retroreflection__ ()
   {
      this .retroreflection = external_X_ITE_X3D_Algorithm_default().clamp (this ._retroreflection .getValue (), 0, 1);
   },
   set_retroreflectionTexture__ ()
   {
      this .retroreflectionTextureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DSingleTextureNode, this ._retroreflectionTexture);

      this .addTexture (0, this .retroreflectionTextureNode);
   },
   getExtensionKey ()
   {
      return X_ITE_ExtensionKeys .RETROREFLECTION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_RETROREFLECTION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .retroreflectionTextureNode ?.getShaderOptions (options, "RETROREFLECTION", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_RetroreflectionEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_RetroreflectionEXT, this .retroreflection);

      this .retroreflectionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_RetroreflectionTextureEXT,
         this ._retroreflectionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (RetroreflectionMaterialExtension,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("RetroreflectionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "retroreflection",               new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "retroreflectionTextureMapping", new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "retroreflectionTexture",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const RetroreflectionMaterialExtension_default_ = RetroreflectionMaterialExtension;
;

/* harmony default export */ const X_ITE_RetroreflectionMaterialExtension = (external_X_ITE_X3D_Namespace_default().add ("RetroreflectionMaterialExtension", RetroreflectionMaterialExtension_default_));
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
 * THIS NODE IS STILL EXPERIMENTAL.
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
      X_ITE_BehaviorEngine,
      X_ITE_BlendMode,
      X_ITE_ClearcoatMaterialExtension,
      X_ITE_DepthMode,
      X_ITE_DiffuseTransmissionMaterialExtension,
      X_ITE_DispersionMaterialExtension,
      X_ITE_EmissiveStrengthMaterialExtension,
      X_ITE_InstancedShape,
      X_ITE_IORMaterialExtension,
      X_ITE_IridescenceMaterialExtension,
      X_ITE_RetroreflectionMaterialExtension,
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