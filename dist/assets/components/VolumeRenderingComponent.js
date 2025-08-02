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
;// external "__X_ITE_X3D__ .PixelTexture"
const external_X_ITE_X3D_PixelTexture_namespaceObject = __X_ITE_X3D__ .PixelTexture;
var external_X_ITE_X3D_PixelTexture_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_PixelTexture_namespaceObject);
;// external "__X_ITE_X3D__ .TextureProperties"
const external_X_ITE_X3D_TextureProperties_namespaceObject = __X_ITE_X3D__ .TextureProperties;
var external_X_ITE_X3D_TextureProperties_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextureProperties_namespaceObject);
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
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode.js



function X3DVolumeRenderStyleNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DVolumeRenderStyleNode);

   this .volumeDataNodes = new Set ();
}

Object .assign (Object .setPrototypeOf (X3DVolumeRenderStyleNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   addShaderFields (shaderNode)
   { },
   getDefines ()
   { },
   getUniformsText ()
   {
      return "";
   },
   getFunctionsText ()
   {
      return "";
   },
   getVolumeData ()
   {
      return this .volumeDataNodes;
   },
   addVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .add (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .delete (volumeDataNode);
   },
   getNormalText (surfaceNormalsNode)
   {
      let string = "";

      if (surfaceNormalsNode)
      {
         string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec3 n = texture (surfaceNormals_" + this .getId () + ", texCoord) .xyz * 2.0 - 1.0;\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }
      else
      {
         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         string += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         string += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         string += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         string += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         string += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         string += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         string += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }

      return string;
   },
});

Object .defineProperties (X3DVolumeRenderStyleNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DVolumeRenderStyleNode", "VolumeRendering", 1));

const __default__ = X3DVolumeRenderStyleNode;
;

/* harmony default export */ const VolumeRendering_X3DVolumeRenderStyleNode = (external_X_ITE_X3D_Namespace_default().add ("X3DVolumeRenderStyleNode", __default__));
;// ./src/x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode.js




function X3DComposableVolumeRenderStyleNode (executionContext)
{
   VolumeRendering_X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DComposableVolumeRenderStyleNode);
}

Object .setPrototypeOf (X3DComposableVolumeRenderStyleNode .prototype, VolumeRendering_X3DVolumeRenderStyleNode .prototype);

Object .defineProperties (X3DComposableVolumeRenderStyleNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DComposableVolumeRenderStyleNode", "VolumeRendering", 1));

const X3DComposableVolumeRenderStyleNode_default_ = X3DComposableVolumeRenderStyleNode;
;

/* harmony default export */ const VolumeRendering_X3DComposableVolumeRenderStyleNode = (external_X_ITE_X3D_Namespace_default().add ("X3DComposableVolumeRenderStyleNode", X3DComposableVolumeRenderStyleNode_default_));
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// ./src/x_ite/Components/VolumeRendering/OpacityMapVolumeStyle.js








function OpacityMapVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).OpacityMapVolumeStyle);
}

Object .assign (Object .setPrototypeOf (OpacityMapVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._transferFunction .addInterest ("set_transferFunction__", this);

      this .set_transferFunction__ ();
   },
   set_transferFunction__ ()
   {
      this .transferFunctionNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture2DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = this .getBrowser () .getDefaultTransferFunction ();
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transferFunction_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .transferFunctionNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// OpacityMapVolumeStyle\n";
      string += "\n";

      if (this .transferFunctionNode .getType () .includes ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture2DNode))
      {
         string += "uniform sampler2D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rg);\n";
         string += "}\n";
      }
      else
      {
         string += "uniform sampler3D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rgb);\n";
         string += "}\n";
      }

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // OpacityMapVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getOpacityMapStyle_" + this .getId () + " (textureColor);\n";

      return string;
   },
});

Object .defineProperties (OpacityMapVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("OpacityMapVolumeStyle", "VolumeRendering", 1, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transferFunction", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const OpacityMapVolumeStyle_default_ = OpacityMapVolumeStyle;
;

/* harmony default export */ const VolumeRendering_OpacityMapVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("OpacityMapVolumeStyle", OpacityMapVolumeStyle_default_));
;// ./src/x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext.js




const
   _defaultVoxelsNode         = Symbol (),
   _defaultVolumeStyle        = Symbol (),
   _defaultBlendedVolumeStyle = Symbol (),
   _defaultTransferFunction   = Symbol ();

function X3DVolumeRenderingContext () { }

Object .assign (X3DVolumeRenderingContext .prototype,
{
   getDefaultVoxels ()
   {
      return this [_defaultVoxelsNode] ??= (() =>
      {
         const defaultVoxelsNode = this .getPrivateScene () .createNode ("PixelTexture3D", false);

         defaultVoxelsNode ._image = [1, 1, 1, 1, 255];
         defaultVoxelsNode .repeatS = true;
         defaultVoxelsNode .repeatT = true;
         defaultVoxelsNode .repeatR = true;

         defaultVoxelsNode .setup ();

         return defaultVoxelsNode;
      })();
      },
   getDefaultVolumeStyle ()
   {
      return this [_defaultVolumeStyle] ??= (() =>
      {
         const defaultVolumeStyle = new VolumeRendering_OpacityMapVolumeStyle (this .getPrivateScene ());

         defaultVolumeStyle .setup ();

         return defaultVolumeStyle;
      })();
   },
   getDefaultBlendedVolumeStyle ()
   {
      return this [_defaultBlendedVolumeStyle] ??= (() =>
      {
         const defaultBlendedVolumeStyle = new VolumeRendering_OpacityMapVolumeStyle (this .getPrivateScene ());

         defaultBlendedVolumeStyle .setup ();

         return defaultBlendedVolumeStyle;
      })();
   },
   getDefaultTransferFunction ()
   {
      return this [_defaultTransferFunction] ??= (() =>
      {
         const textureProperties = new (external_X_ITE_X3D_TextureProperties_default()) (this .getPrivateScene ());

         textureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         textureProperties ._boundaryModeT       = "REPEAT";
         textureProperties ._magnificationFilter = "DEFAULT";
         textureProperties ._minificationFilter  = "DEFAULT";
         textureProperties ._generateMipMaps     = true;
         textureProperties ._textureCompression  = "DEFAULT";

         textureProperties .setup ();

         const defaultTransferFunction = new (external_X_ITE_X3D_PixelTexture_default()) (this .getPrivateScene ());

         defaultTransferFunction ._textureProperties = textureProperties;
         defaultTransferFunction ._image .width      = 256;
         defaultTransferFunction ._image .height     = 1;
         defaultTransferFunction ._image .comp       = 2;
         defaultTransferFunction ._image .array      = Array .from ({ length: 256 }, (v, i) => (i << 8) | i);

         defaultTransferFunction .setup ();

         return defaultTransferFunction;
      })();
   },
});

const X3DVolumeRenderingContext_default_ = X3DVolumeRenderingContext;
;

/* harmony default export */ const VolumeRendering_X3DVolumeRenderingContext = (external_X_ITE_X3D_Namespace_default().add ("X3DVolumeRenderingContext", X3DVolumeRenderingContext_default_));
;// ./src/x_ite/Components/VolumeRendering/BlendedVolumeStyle.js








function BlendedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).BlendedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BlendedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._weightTransferFunction1 .addInterest ("set_weightTransferFunction1__", this);
      this ._weightTransferFunction2 .addInterest ("set_weightTransferFunction2__", this);
      this ._renderStyle             .addInterest ("set_renderStyle__",             this);
      this ._voxels                  .addInterest ("set_voxels__",                  this);

      this .set_weightTransferFunction1__ ();
      this .set_weightTransferFunction2__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();
   },
   addVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      if (this .renderStyleNode)
         this .renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      if (this .renderStyleNode)
         this .renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_weightTransferFunction1__ ()
   {
      this .weightTransferFunction1Node = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture2DNode, this ._weightTransferFunction1);
   },
   set_weightTransferFunction2__ ()
   {
      this .weightTransferFunction2Node = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture2DNode, this ._weightTransferFunction2);
   },
   set_renderStyle__ ()
   {
      if (this .renderStyleNode)
      {
         this .renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            this .renderStyleNode .removeVolumeData (volumeDataNode);
      }

      this .renderStyleNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DComposableVolumeRenderStyleNode, this ._renderStyle);

      if (this .renderStyleNode)
      {
         this .renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            this .renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._voxels);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightConstant1_" + this .getId (), this ._weightConstant1 .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightConstant2_" + this .getId (), this ._weightConstant2 .copy ());

      if (this .weightTransferFunction1Node)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightTransferFunction1_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .weightTransferFunction1Node));

      if (this .weightTransferFunction2Node)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightTransferFunction2_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .weightTransferFunction2Node));

      if (this .voxelsNode)
      {
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "voxels_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .voxelsNode));
      }

      this .getBrowser () .getDefaultBlendedVolumeStyle () .addShaderFields (shaderNode);

      if (this .renderStyleNode)
         this .renderStyleNode .addShaderFields (shaderNode);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      if (! this .voxelsNode)
         return "";

      let string = "";

      string += "\n";
      string += "// BlendedVolumeStyle\n";
      string += "\n";
      string += "uniform float     weightConstant1_" + this .getId () + ";\n";
      string += "uniform float     weightConstant2_" + this .getId () + ";\n";

      if (this .weightTransferFunction1Node)
         string += "uniform sampler2D weightTransferFunction1_" + this .getId () + ";\n";

      if (this .weightTransferFunction2Node)
         string += "uniform sampler2D weightTransferFunction2_" + this .getId () + ";\n";

      string += "uniform sampler3D voxels_" + this .getId () + ";\n";

      let uniformsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getUniformsText ();

      if (this .renderStyleNode)
         uniformsText += this .renderStyleNode .getUniformsText ();

      uniformsText = uniformsText .replace (/x3d_Texture3D\s*\[0\]/g, "voxels_" + this .getId ());

      string += "\n";
      string += uniformsText;

      string += "\n";
      string += "vec4\n";
      string += "getBlendedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";

      string += "   vec4 blendColor_" + this .getId () + " = texture (voxels_" + this .getId () + ", texCoord);";

      let functionsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getFunctionsText ();

      if (this .renderStyleNode)
         functionsText += this .renderStyleNode .getFunctionsText ();

      functionsText = functionsText .replace (/textureColor/g, "blendColor_" + this .getId ());

      string += "\n";
      string += functionsText;

      switch (this ._weightFunction1 .getValue ())
      {
         default: // CONSTANT
         {
            string += "   float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
            break;
         }
         case "ALPHA0":
         {
            string += "   float w1_" + this .getId () + " = originalColor .a;\n";
            break;
         }
         case "ALPHA1":
         {
            string += "   float w1_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA0":
         {
            string += "   float w1_" + this .getId () + " = 1.0 - originalColor .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA1":
         {
            string += "   float w1_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "TABLE":
         {
            if (this .weightTransferFunction1Node)
            {
               string += "   float w1_" + this .getId () + " = texture (weightTransferFunction1_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
            }
            else
            {
               // Use default CONSTANT value.
               string += "   float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
            }

            break;
         }
      }

      switch (this ._weightFunction2 .getValue ())
      {
         default: // CONSTANT
         {
            string += "   float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
            break;
         }
         case "ALPHA0":
         {
            string += "   float w2_" + this .getId () + " = originalColor .a;\n";
            break;
         }
         case "ALPHA1":
         {
            string += "   float w2_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA0":
         {
            string += "   float w2_" + this .getId () + " = 1.0 - originalColor .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA1":
         {
            string += "   float w2_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "TABLE":
         {
            if (this .weightTransferFunction2Node)
            {
               string += "   float w2_" + this .getId () + " = texture (weightTransferFunction2_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
            }
            else
            {
               // Use default CONSTANT value.
               string += "   float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
            }

            break;
         }
      }

      string += "\n";
      string += "   return clamp (originalColor * w1_" + this .getId () + " + blendColor_" + this .getId () + " * w2_" + this .getId () + ", 0.0, 1.0);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      if (! this .voxelsNode)
         return "";

      let string = "";

      string += "\n";
      string += "   // BlendedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBlendedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BlendedVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("BlendedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",                 new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightConstant1",         new (external_X_ITE_X3D_Fields_default()).SFFloat (0.5)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightConstant2",         new (external_X_ITE_X3D_Fields_default()).SFFloat (0.5)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightFunction1",         new (external_X_ITE_X3D_Fields_default()).SFString ("CONSTANT")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightFunction2",         new (external_X_ITE_X3D_Fields_default()).SFString ("CONSTANT")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightTransferFunction1", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weightTransferFunction2", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "renderStyle",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "voxels",                  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const BlendedVolumeStyle_default_ = BlendedVolumeStyle;
;

/* harmony default export */ const VolumeRendering_BlendedVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("BlendedVolumeStyle", BlendedVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle.js







function BoundaryEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).BoundaryEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BoundaryEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "retainedOpacity_" + this .getId (), this ._retainedOpacity .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "boundaryOpacity_" + this .getId (), this ._boundaryOpacity .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "opacityFactor_"   + this .getId (), this ._opacityFactor   .copy ());
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float retainedOpacity_" + this .getId () + ";\n";
      string += "uniform float boundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float opacityFactor_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getBoundaryEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   float f0 = texture (x3d_Texture3D [0], texCoord) .r;\n";
      string += "   float f1 = texture (x3d_Texture3D [0], texCoord + vec3 (0.0, 0.0, 1.0 / float (textureSize (x3d_Texture3D [0], 0) .z))) .r;\n";
      string += "   float f  = abs (f0 - f1);\n";
      string += "\n";
      string += "   float retainedOpacity = retainedOpacity_" + this .getId () + ";\n";
      string += "   float boundaryOpacity = boundaryOpacity_" + this .getId () + ";\n";
      string += "   float opacityFactor   = opacityFactor_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (retainedOpacity + boundaryOpacity * pow (f, opacityFactor)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBoundaryEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BoundaryEnhancementVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("BoundaryEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "retainedOpacity", new (external_X_ITE_X3D_Fields_default()).SFFloat (0.2)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "boundaryOpacity", new (external_X_ITE_X3D_Fields_default()).SFFloat (0.9)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "opacityFactor",   new (external_X_ITE_X3D_Fields_default()).SFFloat (2)),
      ]),
      enumerable: true,
   },
});

const BoundaryEnhancementVolumeStyle_default_ = BoundaryEnhancementVolumeStyle;
;

/* harmony default export */ const VolumeRendering_BoundaryEnhancementVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("BoundaryEnhancementVolumeStyle", BoundaryEnhancementVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/CartoonVolumeStyle.js








function CartoonVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).CartoonVolumeStyle);
}

Object .assign (Object .setPrototypeOf (CartoonVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "colorSteps_"      + this .getId (), this ._colorSteps      .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "orthogonalColor_" + this .getId (), this ._orthogonalColor .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "parallelColor_"   + this .getId (), this ._parallelColor   .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_HSV");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// CartoonVolumeStyle\n";
      string += "\n";
      string += "uniform int  colorSteps_" + this .getId () + ";\n";
      string += "uniform vec4 orthogonalColor_" + this .getId () + ";\n";
      string += "uniform vec4 parallelColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getCartoonStyle_" + this .getId () + " (in vec4 originalColor, vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 orthogonalColor = orthogonalColor_" + this .getId () + ";\n";
      string += "   vec4 parallelColor   = parallelColor_" + this .getId () + ";\n";
      string += "   int  colorSteps      = colorSteps_" + this .getId () + ";\n";
      string += "\n";
      string += "   float steps    = clamp (float (colorSteps), 1.0, 64.0);\n";
      string += "   float step     = M_PI / 2.0 / steps;\n";
      string += "   float cosTheta = min (dot (surfaceNormal .xyz, normalize (vertex)), 1.0);\n";
      string += "\n";
      string += "   if (cosTheta < 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   float t             = cos (min (floor (acos (cosTheta) / step) * (steps > 1.0 ? steps / (steps - 1.0) : 1.0), steps) * step);\n";
      string += "   vec3  orthogonalHSV = rgb2hsv (orthogonalColor .rgb);\n";
      string += "   vec3  parallelHSV   = rgb2hsv (parallelColor .rgb);\n";
      string += "\n";
      string += "   return vec4 (hsv2rgb (mix_hsv (orthogonalHSV, parallelHSV, t)), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // CartoonVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getCartoonStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (CartoonVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("CartoonVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "colorSteps",      new (external_X_ITE_X3D_Fields_default()).SFInt32 (4)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "orthogonalColor", new (external_X_ITE_X3D_Fields_default()).SFColorRGBA (1, 1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "parallelColor",   new (external_X_ITE_X3D_Fields_default()).SFColorRGBA (0, 0, 0, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const CartoonVolumeStyle_default_ = CartoonVolumeStyle;
;

/* harmony default export */ const VolumeRendering_CartoonVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("CartoonVolumeStyle", CartoonVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/ComposedVolumeStyle.js








function ComposedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ComposedVolumeStyle);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._renderStyle .addInterest ("set_renderStyle__", this);

      this .set_renderStyle__ ();
   },
   addVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .removeVolumeData (volumeDataNode);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);
   },
   getDefines (defines)
   {
      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .getDefines (defines);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getUniformsText ();

      string += "\n";
      string += "vec4\n";
      string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
      string += "{\n";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getFunctionsText ();

      string += "\n";
      string += "   return textureColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ComposedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   }
});

Object .defineProperties (ComposedVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ComposedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "renderStyle", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const ComposedVolumeStyle_default_ = ComposedVolumeStyle;
;

/* harmony default export */ const VolumeRendering_ComposedVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("ComposedVolumeStyle", ComposedVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle.js








function EdgeEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).EdgeEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (EdgeEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "edgeColor_"         + this .getId (), this ._edgeColor         .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "gradientThreshold_" + this .getId (), this ._gradientThreshold .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform vec4  edgeColor_" + this .getId () + ";\n";
      string += "uniform float gradientThreshold_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getEdgeEnhacementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4  edgeColor         = edgeColor_" + this .getId () + ";\n";
      string += "   float gradientThreshold = gradientThreshold_" + this .getId () + ";\n";
      string += "\n";
      string += "   float angle = abs (dot (surfaceNormal .xyz, normalize (vertex)));\n";
      string += "\n";
      string += "   if (angle >= cos (gradientThreshold))\n";
      string += "      return originalColor;\n";
      string += "   else\n";
      string += "      return vec4 (mix (edgeColor .rgb, originalColor.rgb, angle), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getEdgeEnhacementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (EdgeEnhancementVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("EdgeEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "edgeColor",         new (external_X_ITE_X3D_Fields_default()).SFColorRGBA (0, 0, 0, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "gradientThreshold", new (external_X_ITE_X3D_Fields_default()).SFFloat (0.4)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const EdgeEnhancementVolumeStyle_default_ = EdgeEnhancementVolumeStyle;
;

/* harmony default export */ const VolumeRendering_EdgeEnhancementVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("EdgeEnhancementVolumeStyle", EdgeEnhancementVolumeStyle_default_));
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// external "__X_ITE_X3D__ .TextureQuality"
const external_X_ITE_X3D_TextureQuality_namespaceObject = __X_ITE_X3D__ .TextureQuality;
var external_X_ITE_X3D_TextureQuality_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextureQuality_namespaceObject);
;// external "__X_ITE_X3D__ .UnlitMaterial"
const external_X_ITE_X3D_UnlitMaterial_namespaceObject = __X_ITE_X3D__ .UnlitMaterial;
var external_X_ITE_X3D_UnlitMaterial_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_UnlitMaterial_namespaceObject);
;// ./src/x_ite/Browser/VolumeRendering/VolumeStyle.vs.js
const VolumeStyle_vs_default_ = /* glsl */ `#version 300 es
precision highp float;precision highp int;uniform mat4 x3d_ProjectionMatrix;uniform mat4 x3d_ModelViewMatrix;uniform mat4 x3d_TextureMatrix[1];
#if defined(X3D_XR_SESSION)
uniform mat4 x3d_EyeMatrix;
#endif
in vec4 x3d_TexCoord0;in vec4 x3d_Vertex;out vec3 vertex;out vec4 texCoord;
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
out float depth;
#endif
void main(){vec4 position=x3d_ModelViewMatrix*x3d_Vertex;
#if defined(X3D_XR_SESSION)
position=x3d_EyeMatrix*position;
#endif
vertex=position.xyz;texCoord=x3d_TextureMatrix[0]*x3d_TexCoord0;gl_Position=x3d_ProjectionMatrix*position;
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
depth=1.+gl_Position.w;
#endif
}`
;

/* harmony default export */ const VolumeStyle_vs = (external_X_ITE_X3D_Namespace_default().add ("VolumeStyle.vs", VolumeStyle_vs_default_));
;// ./src/x_ite/Browser/VolumeRendering/VolumeStyle.fs.js
const VolumeStyle_fs_default_ = /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler3D;in vec3 vertex;in vec4 texCoord;
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
uniform float x3d_LogarithmicFarFactor1_2;in float depth;
#endif
uniform sampler3D x3d_Texture3D[1];uniform mat3 x3d_TextureNormalMatrix;uniform x3d_LightSourceParameters x3d_LightSource[x3d_MaxLights];const float M_PI=3.141592653589793;const float M_SQRT2=1.4142135623730951;const float M_SQRT1_2=.7071067811865476;
#if defined(X3D_ORDER_INDEPENDENT_TRANSPARENCY)
layout(location=0)out vec4 x3d_FragData0;layout(location=1)out vec4 x3d_FragData1;
#else
out vec4 x3d_FragColor;
#endif
#pragma X3D include "includes/ClipPlanes.glsl"
#pragma X3D include "includes/Fog.glsl"
__VOLUME_STYLES_DEFINES__
#if defined(X3D_HSV)
vec3 rgb2hsv(in vec3 color){float h=0.;float s=0.;float v=0.;float min=min(min(color.r,color.g),color.b);float max=max(max(color.r,color.g),color.b);v=max;float delta=max-min;if(max!=0.&&delta!=0.){s=delta/max;if(color.r==max)h=(color.g-color.b)/delta;else if(color.g==max)h=2.+(color.b-color.r)/delta;else h=4.+(color.r-color.g)/delta;h*=M_PI/3.;if(h<0.)h+=M_PI*2.;}else s=h=0.;return vec3(h,s,v);}vec3 hsv2rgb(in vec3 hsv){float h=hsv[0];float s=clamp(hsv[1],0.,1.);float v=clamp(hsv[2],0.,1.);if(s==0.){return vec3(v,v,v);}else{float w=(h*(180./M_PI))/60.;float i=floor(w);float f=w-i;float p=v*(1.-s);float q=v*(1.-s*f);float t=v*(1.-s*(1.-f));switch(int(i)% 6){case 0:return vec3(v,t,p);case 1:return vec3(q,v,p);case 2:return vec3(p,v,t);case 3:return vec3(p,q,v);case 4:return vec3(t,p,v);default:return vec3(v,p,q);}}return vec3(0);}vec3 mix_hsv(in vec3 a,in vec3 b,in float t){float ha=a[0];float sa=a[1];float va=a[2];float hb=b[0];float sb=b[1];float vb=b[2];if(sa==0.)ha=hb;if(sb==0.)hb=ha;float range=abs(hb-ha);if(range<=M_PI){float h=ha+t*(hb-ha);float s=sa+t*(sb-sa);float v=va+t*(vb-va);return vec3(h,s,v);}float PI2=M_PI*2.;float step=(PI2-range)*t;float h=ha<hb?ha-step:ha+step;if(h<0.)h+=PI2;else if(h>PI2)h-=PI2;float s=sa+t*(sb-sa);float v=va+t*(vb-va);return vec3(h,s,v);}
#endif
#if defined(X3D_PLANE)
struct Plane3{vec3 normal;float distanceFromOrigin;};Plane3 plane3(const in vec3 point,const in vec3 normal){return Plane3(normal,dot(normal,point));}vec3 plane3_perpendicular_vector(const in Plane3 plane,const in vec3 point){return plane.normal*(dot(point,plane.normal)-plane.distanceFromOrigin);}
#endif
#if defined(X3D_SHADING)
float getSpotFactor(const in float cutOffAngle,const in float beamWidth,const in vec3 L,const in vec3 d){float spotAngle=acos(clamp(dot(-L,d),-1.,1.));if(spotAngle>=cutOffAngle)return 0.;else if(spotAngle<=beamWidth)return 1.;return(spotAngle-cutOffAngle)/(beamWidth-cutOffAngle);}
#endif
__VOLUME_STYLES_UNIFORMS__ vec4 getTextureColor(in vec3 texCoord){if(any(greaterThan(abs(texCoord-.5),vec3(.5))))discard;vec4 textureColor=texture(x3d_Texture3D[0],texCoord);__VOLUME_STYLES_FUNCTIONS__ return textureColor;}
#if defined(X3D_ORDER_INDEPENDENT_TRANSPARENCY)
float weight(const in float z,const in float a){return clamp(pow(min(1.,a*10.)+.01,3.)*1e8*pow(1.-z*.9,3.),1e-2,3e3);}
#endif
void main(){
#if defined(X3D_CLIP_PLANES)
clip();
#endif
vec4 finalColor=getTextureColor(texCoord.stp/texCoord.q);
#if defined(X3D_FOG)
finalColor.rgb=getFogColor(finalColor.rgb);
#endif
#if defined(X3D_ORDER_INDEPENDENT_TRANSPARENCY)
float a=finalColor.a;float w=weight(gl_FragCoord.z,a);finalColor.rgb*=a;finalColor*=w;x3d_FragData0=vec4(finalColor.rgb,a);x3d_FragData1=vec4(finalColor.a);
#else
x3d_FragColor=finalColor;
#endif
#if defined(X3D_LOGARITHMIC_DEPTH_BUFFER)
gl_FragDepth=log2(depth)*x3d_LogarithmicFarFactor1_2;
#endif
}`
;

/* harmony default export */ const VolumeStyle_fs = (external_X_ITE_X3D_Namespace_default().add ("VolumeStyle.fs", VolumeStyle_fs_default_));
;// ./src/x_ite/Browser/VolumeRendering/VolumeMaterial.js




function VolumeMaterial (executionContext, volumeDataNode)
{
   external_X_ITE_X3D_UnlitMaterial_default().call (this, executionContext);

   this .volumeDataNode    = volumeDataNode;
   this .volumeShaderNodes = new Map ();
}

Object .assign (Object .setPrototypeOf (VolumeMaterial .prototype, (external_X_ITE_X3D_UnlitMaterial_default()).prototype),
{
   getVolumeShaders ()
   {
      return this .volumeShaderNodes;
   },
   getShader (geometryContext, renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "";

      key += renderObject .getRenderAndGlobalLightsKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += ".";
      key += localObjectsKeys .sort () .join (""); // ClipPlane, X3DLightNode

      return this .volumeShaderNodes .get (key)
         ?? this .createShader (key, geometryContext, renderContext);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = [ ];

      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      const objectsKeys = localObjectsKeys .concat (renderObject .getGlobalLightsKeys ());

      if (browser .getRenderingProperty ("XRSession"))
         options .push ("X3D_XR_SESSION");

      if (renderObject .getLogarithmicDepthBuffer ())
         options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

      if (renderObject .getOrderIndependentTransparency ())
         options .push ("X3D_ORDER_INDEPENDENT_TRANSPARENCY");

      switch (fogNode ?.getFogType ())
      {
         case 1:
            options .push ("X3D_FOG", "X3D_FOG_LINEAR");
            break;
         case 2:
            options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
            break;
      }

      const
         numClipPlanes = objectsKeys .reduce ((a, c) => a + (c === 0), 0),
         numLights     = objectsKeys .reduce ((a, c) => a + (c === 1), 0);

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES")
         options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
      }

      if (numLights)
      {
         options .push ("X3D_LIGHTING")
         options .push (`X3D_NUM_LIGHTS ${Math .min (numLights, browser .getMaxLights ())}`);
      }

      const shaderNode = this .volumeDataNode .createShader (options, VolumeStyle_vs, VolumeStyle_fs);

      this .volumeShaderNodes .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      this .volumeDataNode .setShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (VolumeMaterial,
{
   typeName:
   {
      value: "VolumeMaterial",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "material",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: (external_X_ITE_X3D_UnlitMaterial_default()).fieldDefinitions,
   },
});

const VolumeMaterial_default_ = VolumeMaterial;
;

/* harmony default export */ const VolumeRendering_VolumeMaterial = (external_X_ITE_X3D_Namespace_default().add ("VolumeMaterial", VolumeMaterial_default_));
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// ./src/x_ite/Components/VolumeRendering/X3DVolumeDataNode.js










function X3DVolumeDataNode (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DVolumeDataNode);

   this .setCameraObject (true);

   // Private properties

   const
      browser      = this .getBrowser (),
      privateScene = browser .getPrivateScene ();

   this .groupNode                = privateScene .createNode ("Group",               false);
   this .proximitySensorNode      = privateScene .createNode ("ProximitySensor",     false);
   this .transformNode            = privateScene .createNode ("Transform",           false);
   this .volumeMaterialNode       = new VolumeRendering_VolumeMaterial (privateScene, this);
   this .textureTransformNode     = privateScene .createNode ("TextureTransform3D",  false);
   this .appearanceNode           = privateScene .createNode ("Appearance",          false);
   this .lowShapeNode             = privateScene .createNode ("Shape",               false);
   this .lowGeometryNode          = privateScene .createNode ("QuadSet",             false);
   this .lowTextureCoordinateNode = privateScene .createNode ("TextureCoordinate3D", false);
   this .lowCoordinateNode        = privateScene .createNode ("Coordinate",          false);
   this .hiShapeNode              = privateScene .createNode ("Shape",               false);
   this .hiGeometryNode           = privateScene .createNode ("QuadSet",             false);
   this .hiTextureCoordinateNode  = privateScene .createNode ("TextureCoordinate3D", false);
   this .hiCoordinateNode         = privateScene .createNode ("Coordinate",          false);
   this .textureNormalMatrixArray = new Float32Array (9);
}

Object .assign (Object .setPrototypeOf (X3DVolumeDataNode .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);

      this ._bboxDisplay .addFieldInterest (this .groupNode ._bboxDisplay);

      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .transformNode ._rotation);
      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .textureTransformNode ._rotation);
      this .proximitySensorNode ._isActive .addInterest ("set_active__", this);

      this .groupNode ._children     = [this .proximitySensorNode, this .transformNode];
      this .transformNode ._children = [this .lowShapeNode, this .hiShapeNode];

      this .textureTransformNode ._translation = new (external_X_ITE_X3D_Fields_default()).SFVec3f (0.5, 0.5, 0.5);
      this .textureTransformNode ._center      = new (external_X_ITE_X3D_Fields_default()).SFVec3f (-0.5, -0.5, -0.5);
      this .appearanceNode ._alphaMode         = "BLEND";
      this .appearanceNode ._material          = this .volumeMaterialNode;
      this .appearanceNode ._textureTransform  = this .textureTransformNode;

      this .lowShapeNode ._pointerEvents = false;
      this .lowShapeNode ._castShadow    = false;
      this .lowShapeNode ._visible       = false;
      this .lowShapeNode ._appearance    = this .appearanceNode;
      this .lowShapeNode ._geometry      = this .lowGeometryNode;
      this .lowGeometryNode ._texCoord   = this .lowTextureCoordinateNode;
      this .lowGeometryNode ._coord      = this .lowCoordinateNode;

      this .hiShapeNode ._pointerEvents = false;
      this .hiShapeNode ._castShadow    = false;
      this .hiShapeNode ._visible       = false;
      this .hiShapeNode ._appearance    = this .appearanceNode;
      this .hiShapeNode ._geometry      = this .hiGeometryNode;
      this .hiGeometryNode ._texCoord   = this .hiTextureCoordinateNode;
      this .hiGeometryNode ._coord      = this .hiCoordinateNode;

      this .volumeMaterialNode       .setPrivate (true);
      this .textureTransformNode     .setPrivate (true);
      this .appearanceNode           .setPrivate (true);

      this .lowCoordinateNode        .setPrivate (true);
      this .lowTextureCoordinateNode .setPrivate (true);
      this .lowGeometryNode          .setPrivate (true);
      this .lowShapeNode             .setPrivate (true);

      this .hiCoordinateNode         .setPrivate (true);
      this .hiTextureCoordinateNode  .setPrivate (true);
      this .hiGeometryNode           .setPrivate (true);
      this .hiShapeNode              .setPrivate (true);

      this .transformNode            .setPrivate (true);
      this .proximitySensorNode      .setPrivate (true);
      this .groupNode                .setPrivate (true);

      this .volumeMaterialNode       .setup ();
      this .textureTransformNode     .setup ();
      this .appearanceNode           .setup ();

      this .lowCoordinateNode        .setup ();
      this .lowTextureCoordinateNode .setup ();
      this .lowGeometryNode          .setup ();
      this .lowShapeNode             .setup ();

      this .hiCoordinateNode         .setup ();
      this .hiTextureCoordinateNode  .setup ();
      this .hiGeometryNode           .setup ();
      this .hiShapeNode              .setup ();

      this .transformNode            .setup ();
      this .proximitySensorNode      .setup ();
      this .groupNode                .setup ();

      this .connectChildNode (this .groupNode);

      this .getLive () .addInterest ("set_live__", this, true);

      this ._dimensions          .addInterest ("set_dimensions__",       this);
      this .textureTransformNode .addInterest ("set_textureTransform__", this);

      this .set_live__ (false);
      this .set_dimensions__ ();
      this .set_textureTransform__ ();
      this .set_active__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return bbox .set (this ._dimensions .getValue (), (external_X_ITE_X3D_Vector3_default()).Zero);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getAppearance ()
   {
      return this .appearanceNode;
   },
   updateShader ()
   {
      this .volumeMaterialNode .getVolumeShaders () .clear ();
   },
   addShaderUniformNames (uniformNames)
   {
      uniformNames .push ("x3d_TextureNormalMatrix");
   },
   getNumPlanes (quality)
   {
      switch (quality)
      {
         case (external_X_ITE_X3D_TextureQuality_default()).LOW:
            return 200;
         case (external_X_ITE_X3D_TextureQuality_default()).MEDIUM:
            return 400;
         case (external_X_ITE_X3D_TextureQuality_default()).HIGH:
            return 600;
      }
   },
   getPoints (quality)
   {
      const
         numPlanes = this .getNumPlanes (quality),
         size      = this ._dimensions .getValue () .norm (),
         size1_2   = size / 2,
         points    = [ ];

      for (let i = 0; i < numPlanes; ++ i)
      {
         const z = i / (numPlanes - 1) - 0.5;

         points .push ( size1_2,  size1_2, size * z,
                       -size1_2,  size1_2, size * z,
                       -size1_2, -size1_2, size * z,
                        size1_2, -size1_2, size * z);
      }

      return points;
   },
   set_live__ (rebuild)
   {
      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
      {
         browser .getBrowserOptions () ._TextureQuality    .addInterest ("set_dimensions__", this);
         browser .getBrowserOptions () ._QualityWhenMoving .addInterest ("set_dimensions__", this);

         if (rebuild)
            this .set_dimensions__ ();
      }
      else
      {
         browser .getBrowserOptions () ._TextureQuality    .removeInterest ("set_dimensions__", this);
         browser .getBrowserOptions () ._QualityWhenMoving .removeInterest ("set_dimensions__", this);
      }
   },
   set_dimensions__ ()
   {
      const
         browser = this .getBrowser (),
         quality = browser .getBrowserOptions () .getTextureQuality (),
         moving  = browser .getBrowserOptions () .getQualityWhenMoving () ?? quality;

      this .proximitySensorNode ._size   = new (external_X_ITE_X3D_Vector3_default()) (200 * this ._dimensions .length ());
      this .textureTransformNode ._scale = this ._dimensions .inverse ();

      const hi = this .getPoints (quality);

      this .hiCoordinateNode ._point        = hi;
      this .hiTextureCoordinateNode ._point = hi;

      if (moving === quality)
      {
         this .lowShapeNode ._geometry = this .hiGeometryNode;
      }
      else
      {
         const low = this .getPoints (moving);

         this .lowCoordinateNode ._point        = low;
         this .lowTextureCoordinateNode ._point = low;
         this .lowShapeNode ._geometry          = this .lowGeometryNode;
      }

      this .set_active__ ();
   },
   set_textureTransform__ ()
   {
      this .textureNormalMatrixArray .set (new (external_X_ITE_X3D_Matrix4_default()) (... this .textureTransformNode .getMatrix ()) .submatrix .inverse ());
   },
   set_active__ ()
   {
      const
         browser = this .getBrowser (),
         quality = browser .getBrowserOptions () .getTextureQuality (),
         moving  = browser .getBrowserOptions () .getQualityWhenMoving () ?? quality,
         update  = this .proximitySensorNode ._isActive .getValue () && quality !== moving;

      if (update)
         browser .sensorEvents () .addInterest ("update", this);
      else
         browser .sensorEvents () .removeInterest ("update", this);

      this .lowShapeNode ._visible = !update;
      this .hiShapeNode  ._visible = update;
   },
   update ()
   {
      const
         browser = this .getBrowser (),
         moving  = browser .getCurrentSpeed () > 0 || browser .getViewer () .isActive ();

      if (this .lowShapeNode ._visible .getValue () !== moving)
         this .lowShapeNode ._visible = moving;

      if (this .hiShapeNode ._visible .getValue () !== !moving)
         this .hiShapeNode ._visible = !moving;
   },
   traverse (type, renderObject)
   {
      this .groupNode .traverse (type, renderObject);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniformMatrix3fv (shaderObject .x3d_TextureNormalMatrix, true, this .textureNormalMatrixArray);
   },
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DVolumeDataNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DVolumeDataNode", "VolumeRendering", 1));

const X3DVolumeDataNode_default_ = X3DVolumeDataNode;
;

/* harmony default export */ const VolumeRendering_X3DVolumeDataNode = (external_X_ITE_X3D_Namespace_default().add ("X3DVolumeDataNode", X3DVolumeDataNode_default_));
;// external "__X_ITE_X3D__ .ComposedShader"
const external_X_ITE_X3D_ComposedShader_namespaceObject = __X_ITE_X3D__ .ComposedShader;
var external_X_ITE_X3D_ComposedShader_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ComposedShader_namespaceObject);
;// external "__X_ITE_X3D__ .ShaderPart"
const external_X_ITE_X3D_ShaderPart_namespaceObject = __X_ITE_X3D__ .ShaderPart;
var external_X_ITE_X3D_ShaderPart_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ShaderPart_namespaceObject);
;// ./src/x_ite/Components/VolumeRendering/IsoSurfaceVolumeData.js










function IsoSurfaceVolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).IsoSurfaceVolumeData);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (IsoSurfaceVolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      this ._gradients        .addInterest ("set_gradients__",   this);
      this ._renderStyle      .addInterest ("set_renderStyle__", this);

      this ._contourStepSize  .addInterest ("updateShader", this);
      this ._surfaceValues    .addInterest ("updateShader", this);
      this ._surfaceTolerance .addInterest ("updateShader", this);
      this ._renderStyle      .addInterest ("updateShader", this);

      this .set_gradients__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_gradients__ ()
   {
      this .gradientsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._gradients);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("updateShader", this);
         renderStyleNode .removeVolumeData (this);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("updateShader", this);
         renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating VolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      opacityMapVolumeStyle .getDefines (styleDefines);

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      styleUniforms  += "\n";
      styleUniforms  += "uniform float surfaceValues [" + Math .max (this ._surfaceValues .length, 1)+ "];\n";
      styleUniforms  += "uniform float surfaceTolerance;\n";

      for (const renderStyleNode of this .renderStyleNodes)
      {
         renderStyleNode .getDefines (styleDefines);
         styleUniforms  += renderStyleNode .getUniformsText ();
      }

      styleFunctions += "\n";
      styleFunctions += "   // IsoSurfaceVolumeData\n";
      styleFunctions += "\n";

      if (this .gradientsNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D gradients;\n";

         styleFunctions += "   if (length (texture (gradients, texCoord) .xyz * 2.0 - 1.0) < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }
      else
      {
         styleUniforms += "\n";
         styleUniforms += "vec4\n";
         styleUniforms += "getNormal (in vec3 texCoord)\n";
         styleUniforms += "{\n";
         styleUniforms += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         styleUniforms += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         styleUniforms += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         styleUniforms += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         styleUniforms += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         styleUniforms += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         styleUniforms += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         styleUniforms += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         styleUniforms += "\n";
         styleUniforms += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         styleUniforms += "}\n";

         styleFunctions += "   if (getNormal (texCoord) .w < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }

      styleFunctions += "\n";
      styleFunctions += "   float intensity = textureColor .r;\n";
      styleFunctions += "\n";

      if (this ._surfaceValues .length === 1)
      {
         const contourStepSize = Math .abs (this ._contourStepSize .getValue ());

         if (contourStepSize === 0)
         {
            styleFunctions += "   if (intensity > surfaceValues [0])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [0]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
         else
         {
            const surfaceValues = [ ];

            for (let v = this ._surfaceValues [0] - contourStepSize; v > 0; v -= contourStepSize)
               surfaceValues .unshift (v);

            surfaceValues .push (this ._surfaceValues [0]);

            for (let v = this ._surfaceValues [0] + contourStepSize; v < 1; v += contourStepSize)
               surfaceValues .push (v);

            styleFunctions += "   if (false)\n";
            styleFunctions += "   { }\n";

            for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
            {
               styleFunctions += "   else if (intensity > " + surfaceValues [i] + ")\n";
               styleFunctions += "   {\n";
               styleFunctions += "      textureColor = vec4 (vec3 (" + surfaceValues [i] + "), 1.0);\n";

               if (this .renderStyleNodes .length)
               {
                  styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
               }

               styleFunctions += "   }\n";
            }

            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
      }
      else
      {
         styleFunctions += "   if (false)\n";
         styleFunctions += "   { }\n";

         for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
         {
            styleFunctions += "   else if (intensity > surfaceValues [" + i + "])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [" + i + "]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               const r = Math .min (i, this .renderStyleNodes .length - 1);

               styleFunctions += this .renderStyleNodes [r] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
         }

         styleFunctions += "   else\n";
         styleFunctions += "   {\n";
         styleFunctions += "      discard;\n";
         styleFunctions += "   }\n";
         styleFunctions += "\n";
      }

      fs = fs
         .replace ("__VOLUME_STYLES_DEFINES__",   Array .from (styleDefines) .join ("\n"))
         .replace ("__VOLUME_STYLES_UNIFORMS__",  styleUniforms)
         .replace ("__VOLUME_STYLES_FUNCTIONS__", styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("VolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("VolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (external_X_ITE_X3D_ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("VolumeDataShader");

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceValues",    this ._surfaceValues    .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceTolerance", this ._surfaceTolerance .copy ());

      if (this .gradientsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "gradients", new (external_X_ITE_X3D_Fields_default()).SFNode (this .gradientsNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (IsoSurfaceVolumeData,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("IsoSurfaceVolumeData", "VolumeRendering", 2, "children", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "dimensions",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "contourStepSize",  new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceValues",    new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceTolerance", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",      new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",       new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "renderStyle",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "gradients",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "voxels",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const IsoSurfaceVolumeData_default_ = IsoSurfaceVolumeData;
;

/* harmony default export */ const VolumeRendering_IsoSurfaceVolumeData = (external_X_ITE_X3D_Namespace_default().add ("IsoSurfaceVolumeData", IsoSurfaceVolumeData_default_));
;// ./src/x_ite/Components/VolumeRendering/ProjectionVolumeStyle.js







function ProjectionVolumeStyle (executionContext)
{
   VolumeRendering_X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ProjectionVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ProjectionVolumeStyle .prototype, VolumeRendering_X3DVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "intensityThreshold_" + this .getId (), this ._intensityThreshold .copy ());
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_PLANE");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ProjectionVolumeStyle\n";
      string += "\n";
      string += "uniform float intensityThreshold_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getProjectionStyle_" + this .getId () + "(in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
         case "MIN":
         {
            string += "   float  projectionColor = 1.0;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
      }

      string += "   const  int samples     = 16;\n";
      string += "   vec3   normal          = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0));\n";
      string += "   Plane3 plane           = plane3 (vec3 (0.5), normal);\n";
      string += "   vec3   point           = texCoord + plane3_perpendicular_vector (plane, texCoord);\n";
      string += "   vec3   ray             = point - normal * M_SQRT1_2;\n";
      string += "   vec3   step            = normal * (M_SQRT2 / float (samples));\n";
      string += "   bool   first           = false;\n";
      string += "\n";
      string += "   for (int i = 0; i < samples; ++ i, ray += step)\n";
      string += "   {\n";
      string += "      if (any (greaterThan (abs (ray - 0.5), vec3 (0.5))))\n";
      string += "         continue;\n";
      string += "\n";
      string += "      float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
      string += "\n";

      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity <= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "MIN":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity >= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "      projectionColor += intensity;\n";
            break;
         }
      }

      string += "   }\n";
      string += "\n";

      if (this ._type .getValue () === "AVERAGE")
         string += "   projectionColor /= float (samples);\n";

      string += "   return vec4 (vec3 (projectionColor), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ProjectionVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getProjectionStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ProjectionVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ProjectionVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",            new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "type",               new (external_X_ITE_X3D_Fields_default()).SFString ("MAX")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "intensityThreshold", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
      ]),
      enumerable: true,
   },
});

const ProjectionVolumeStyle_default_ = ProjectionVolumeStyle;
;

/* harmony default export */ const VolumeRendering_ProjectionVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("ProjectionVolumeStyle", ProjectionVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/SegmentedVolumeData.js










function SegmentedVolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SegmentedVolumeData);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (SegmentedVolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      this ._segmentIdentifiers .addInterest ("set_segmentIdentifiers__", this);
      this ._renderStyle        .addInterest ("set_renderStyle__",        this);

      this ._segmentEnabled     .addInterest ("updateShader", this);
      this ._segmentIdentifiers .addInterest ("updateShader", this);
      this ._renderStyle        .addInterest ("updateShader", this);

      this .set_segmentIdentifiers__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   getSegmentEnabled (index)
   {
      return index < this ._segmentEnabled .length ? this ._segmentEnabled [index] : true;
   },
   set_segmentIdentifiers__ ()
   {
      this .segmentIdentifiersNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._segmentIdentifiers);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("updateShader", this);
         renderStyleNode .removeVolumeData (this);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("updateShader", this);
         renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating SegmentedVolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .segmentIdentifiersNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D segmentIdentifiers;\n";
         styleUniforms += "\n";

         styleFunctions += "\n";
         styleFunctions += "   int segment = int (texture (segmentIdentifiers, texCoord) .r * 255.0);\n";
      }
      else
      {
         styleFunctions += "   int segment = 0;\n";
      }

      if (this .renderStyleNodes .length)
      {
         styleFunctions += "\n";
         styleFunctions += "   switch (segment)\n";
         styleFunctions += "   {\n";

         for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
         {
            renderStyleNode .getDefines (styleDefines);

            styleFunctions += "      case " + i + ":\n";
            styleFunctions += "      {\n";

            if (this .getSegmentEnabled (i))
            {
               styleUniforms  += renderStyleNode .getUniformsText (),
               styleFunctions += renderStyleNode .getFunctionsText ();
               styleFunctions += "         break;\n";
            }
            else
            {
               styleFunctions += "         discard;\n";
            }

            styleFunctions += "      }\n";
         }

         styleFunctions += "   }\n";
      }

      fs = fs
         .replace ("__VOLUME_STYLES_DEFINES__",   Array .from (styleDefines) .join ("\n"))
         .replace ("__VOLUME_STYLES_UNIFORMS__",  styleUniforms)
         .replace ("__VOLUME_STYLES_FUNCTIONS__", styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("SegmentedVolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("SegmentedVolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (external_X_ITE_X3D_ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("SegmentedVolumeDataShader");

      if (this .segmentIdentifiersNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "segmentIdentifiers", new (external_X_ITE_X3D_Fields_default()).SFNode (this .segmentIdentifiersNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
      {
         if (this .getSegmentEnabled (i))
            renderStyleNode .addShaderFields (shaderNode);
      }

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (SegmentedVolumeData,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SegmentedVolumeData", "VolumeRendering", 2, "children", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "dimensions",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "segmentEnabled",     new (external_X_ITE_X3D_Fields_default()).MFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",            new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",        new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",           new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",         new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "segmentIdentifiers", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "renderStyle",        new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "voxels",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SegmentedVolumeData_default_ = SegmentedVolumeData;
;

/* harmony default export */ const VolumeRendering_SegmentedVolumeData = (external_X_ITE_X3D_Namespace_default().add ("SegmentedVolumeData", SegmentedVolumeData_default_));
;// ./src/x_ite/Components/VolumeRendering/ShadedVolumeStyle.js








function ShadedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ShadedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ShadedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._material       .addInterest ("set_material__",       this);
      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_material__ ();
      this .set_surfaceNormals__ ();
   },
   set_material__ ()
   {
      if (this .materialNode)
         this .materialNode .removeInterest ("addNodeEvent", this);

      this .materialNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DMaterialNode, this ._material);

      if (this .materialNode)
         this .materialNode .addInterest ("addNodeEvent", this);
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      if (this .materialNode)
      {
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "ambientIntensity_" + this .getId (), this .materialNode ._ambientIntensity .copy ());
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "diffuseColor_"     + this .getId (), this .materialNode ._diffuseColor     .copy ());
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "specularColor_"    + this .getId (), this .materialNode ._specularColor    .copy ());
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "emissiveColor_"    + this .getId (), this .materialNode ._emissiveColor    .copy ());
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "shininess_"        + this .getId (), this .materialNode ._shininess        .copy ());
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "transparency_"     + this .getId (), this .materialNode ._transparency     .copy ());
      }

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_SHADING");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ShadedVolumeStyle\n";
      string += "\n";
      string += "uniform float ambientIntensity_" + this .getId () + ";\n";
      string += "uniform vec3  diffuseColor_" + this .getId () + ";\n";
      string += "uniform vec3  specularColor_" + this .getId () + ";\n";
      string += "uniform vec3  emissiveColor_" + this .getId () + ";\n";
      string += "uniform float shininess_" + this .getId () + ";\n";
      string += "uniform float transparency_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getShadedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 shadedColor   = vec4 (0.0);\n";

      if (this ._lighting .getValue ())
      {
         if (this .materialNode)
         {
            string += "   vec3 diffuseFactor = diffuseColor_" + this .getId () + ";\n";
            string += "   vec3 ambientTerm   = diffuseFactor * ambientIntensity_" + this .getId () + ";\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   vec3 diffuseFactor = originalColor .rgb;\n";
            string += "   vec3 ambientTerm   = vec3 (0.0);\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a;\n";
         }

         string += "\n";
         string += "   vec3 N = surfaceNormal .xyz;\n";
         string += "   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position\n";
         string += "\n";
         string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
         string += "   {\n";
         string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
         string += "\n";
         string += "      vec3  vL = light .location - vertex; // Light to fragment\n";
         string += "      float dL = length (light .matrix * vL);\n";
         string += "      bool  di = light .type == x3d_DirectionalLight;\n";
         string += "\n";
         string += "      if (di || dL <= light .radius)\n";
         string += "      {\n";
         string += "         vec3 d = light .direction;\n";
         string += "         vec3 c = light .attenuation;\n";
         string += "         vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.\n";
         string += "         vec3 H = normalize (L + V);             // Specular term\n";
         string += "\n";
         string += "         float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.\n";
         string += "         vec3  diffuseTerm    = diffuseFactor * lightAngle;\n";
         string += "         float specularFactor = shininess_" + this .getId () + " > 0.0 ? pow (max (dot (N, H), 0.0), shininess_" + this .getId () + " * 128.0) : 1.0;\n";
         string += "         vec3  specularTerm   = light .intensity * specularColor_" + this .getId () + " * specularFactor;\n";
         string += "\n";
         string += "         float attenuationFactor     = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);\n";
         string += "         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;\n";
         string += "         float attenuationSpotFactor = attenuationFactor * spotFactor;\n";
         string += "         vec3  ambientColor          = light .ambientIntensity * ambientTerm;\n";
         string += "         vec3  diffuseSpecularColor  = light .intensity * (diffuseTerm + specularTerm);\n";
         string += "\n";
         string += "         shadedColor .rgb += attenuationSpotFactor * light .color * (ambientColor + diffuseSpecularColor);\n";
         string += "      }\n";
         string += "\n";
         string += "      shadedColor .rgb += emissiveColor_" + this .getId () + ";\n";
         string += "   }\n";
      }
      else
      {
         if (this .materialNode)
         {
            string += "   shadedColor .rgb = diffuseColor_" + this .getId () + ";\n";
            string += "   shadedColor .a   = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   shadedColor = originalColor;\n";
         }
      }

      string += "\n";
      string += "   return shadedColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ShadedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getShadedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ShadedVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ShadedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "lighting",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadows",        new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "phaseFunction",  new (external_X_ITE_X3D_Fields_default()).SFString ("Henyey-Greenstein")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "material",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "surfaceNormals", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ShadedVolumeStyle_default_ = ShadedVolumeStyle;
;

/* harmony default export */ const VolumeRendering_ShadedVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("ShadedVolumeStyle", ShadedVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle.js








function SilhouetteEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).SilhouetteEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (SilhouetteEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteRetainedOpacity_" + this .getId (), this ._silhouetteRetainedOpacity .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteBoundaryOpacity_" + this .getId (), this ._silhouetteBoundaryOpacity .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteSharpness_"       + this .getId (), this ._silhouetteSharpness       .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteSharpness_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getSilhouetteEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "   \n";
      string += "   float silhouetteRetainedOpacity = silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteBoundaryOpacity = silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteSharpness       = silhouetteSharpness_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (silhouetteRetainedOpacity + silhouetteBoundaryOpacity * pow (1.0 - abs (dot (surfaceNormal .xyz, normalize (vertex))), silhouetteSharpness)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getSilhouetteEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (SilhouetteEnhancementVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("SilhouetteEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",                  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",                   new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteRetainedOpacity", new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteBoundaryOpacity", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "silhouetteSharpness",       new (external_X_ITE_X3D_Fields_default()).SFFloat (0.5)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals",            new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SilhouetteEnhancementVolumeStyle_default_ = SilhouetteEnhancementVolumeStyle;
;

/* harmony default export */ const VolumeRendering_SilhouetteEnhancementVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("SilhouetteEnhancementVolumeStyle", SilhouetteEnhancementVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/ToneMappedVolumeStyle.js








function ToneMappedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ToneMappedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ToneMappedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "coolColor_" + this .getId (), this ._coolColor .copy ());
      shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "warmColor_" + this .getId (), this ._warmColor .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (external_X_ITE_X3D_Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ToneMappedVolumeStyle\n";
      string += "\n";
      string += "uniform vec4 coolColor_" + this .getId () + ";\n";
      string += "uniform vec4 warmColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getToneMappedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec3 toneColor = vec3 (0.0);\n";
      string += "   vec3 coolColor = coolColor_" + this .getId () + " .rgb;\n";
      string += "   vec3 warmColor = warmColor_" + this .getId () + " .rgb;\n";
      string += "\n";
      string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
      string += "   {\n";
      string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
      string += "\n";
      string += "      vec3  L           = light .type == x3d_DirectionalLight ? -light .direction : normalize (light .location - vertex);\n";
      string += "      float colorFactor = dot (L, surfaceNormal .xyz) * 0.5 + 0.5;\n";
      string += "\n";
      string += "      toneColor += mix (warmColor .rgb, coolColor .rgb, colorFactor);\n";
      string += "   }\n";
      string += "\n";
      string += "   return vec4 (toneColor, originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ToneMappedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getToneMappedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ToneMappedVolumeStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ToneMappedVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "coolColor",      new (external_X_ITE_X3D_Fields_default()).SFColorRGBA (0, 0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "warmColor",      new (external_X_ITE_X3D_Fields_default()).SFColorRGBA (1, 1, 0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "surfaceNormals", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ToneMappedVolumeStyle_default_ = ToneMappedVolumeStyle;
;

/* harmony default export */ const VolumeRendering_ToneMappedVolumeStyle = (external_X_ITE_X3D_Namespace_default().add ("ToneMappedVolumeStyle", ToneMappedVolumeStyle_default_));
;// ./src/x_ite/Components/VolumeRendering/VolumeData.js










function VolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).VolumeData);
}

Object .assign (Object .setPrototypeOf (VolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      this ._renderStyle .addInterest ("set_renderStyle__", this);
      this ._voxels      .addInterest ("set_voxels__",      this);
      this ._renderStyle .addInterest ("updateShader",      this);

      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_renderStyle__ ()
   {
      if (this .renderStyleNode)
      {
         this .renderStyleNode .removeInterest ("updateShader", this);
         this .renderStyleNode .removeVolumeData (this);
      }

      this .renderStyleNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DVolumeRenderStyleNode, this ._renderStyle);

      if (this .renderStyleNode)
      {
         this .renderStyleNode .addInterest ("updateShader", this);
         this .renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating VolumeData Shader ...");

      const
         opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
         styleDefines          = new Set ();

      opacityMapVolumeStyle .getDefines (styleDefines);

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .renderStyleNode)
      {
         this .renderStyleNode .getDefines (styleDefines);

         styleUniforms  += this .renderStyleNode .getUniformsText (),
         styleFunctions += this .renderStyleNode .getFunctionsText ();
      }

      fs = fs
         .replace ("__VOLUME_STYLES_DEFINES__",   Array .from (styleDefines) .join ("\n"))
         .replace ("__VOLUME_STYLES_UNIFORMS__",  styleUniforms)
         .replace ("__VOLUME_STYLES_FUNCTIONS__", styleFunctions);

      // this .getBrowser () .print (fs);

      const vertexShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("VolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (external_X_ITE_X3D_ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("VolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (external_X_ITE_X3D_ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("VolumeDataShader");

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      this .renderStyleNode ?.addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (VolumeData,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("VolumeData", "VolumeRendering", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "dimensions",  new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay", new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",    new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",  new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "renderStyle", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "voxels",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumeData_default_ = VolumeData;
;

/* harmony default export */ const VolumeRendering_VolumeData = (external_X_ITE_X3D_Namespace_default().add ("VolumeData", VolumeData_default_));
;// ./src/assets/components/VolumeRenderingComponent.js



















external_X_ITE_X3D_Components_default().add ({
   name: "VolumeRendering",
   concreteNodes:
   [
      VolumeRendering_BlendedVolumeStyle,
      VolumeRendering_BoundaryEnhancementVolumeStyle,
      VolumeRendering_CartoonVolumeStyle,
      VolumeRendering_ComposedVolumeStyle,
      VolumeRendering_EdgeEnhancementVolumeStyle,
      VolumeRendering_IsoSurfaceVolumeData,
      VolumeRendering_OpacityMapVolumeStyle,
      VolumeRendering_ProjectionVolumeStyle,
      VolumeRendering_SegmentedVolumeData,
      VolumeRendering_ShadedVolumeStyle,
      VolumeRendering_SilhouetteEnhancementVolumeStyle,
      VolumeRendering_ToneMappedVolumeStyle,
      VolumeRendering_VolumeData,
   ],
   abstractNodes:
   [
      VolumeRendering_X3DComposableVolumeRenderStyleNode,
      VolumeRendering_X3DVolumeDataNode,
      VolumeRendering_X3DVolumeRenderStyleNode,
   ],
   browserContext: VolumeRendering_X3DVolumeRenderingContext,
});

const VolumeRenderingComponent_default_ = undefined;
;

/* harmony default export */ const VolumeRenderingComponent = (external_X_ITE_X3D_Namespace_default().add ("VolumeRenderingComponent", VolumeRenderingComponent_default_));
/******/ })()
;