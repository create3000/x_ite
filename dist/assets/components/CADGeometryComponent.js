/* X_ITE v11.6.4 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.6.4")];
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
;// external "__X_ITE_X3D__ .X3DGroupingNode"
const external_X_ITE_X3D_X3DGroupingNode_namespaceObject = __X_ITE_X3D__ .X3DGroupingNode;
var external_X_ITE_X3D_X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGroupingNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/CADGeometry/X3DProductStructureChildNode.js




function X3DProductStructureChildNode (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DProductStructureChildNode);
}

Object .setPrototypeOf (X3DProductStructureChildNode .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype);

Object .defineProperties (X3DProductStructureChildNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DProductStructureChildNode", "CADGeometry", 2));

const __default__ = X3DProductStructureChildNode;
;

/* harmony default export */ const CADGeometry_X3DProductStructureChildNode = (external_X_ITE_X3D_Namespace_default().add ("X3DProductStructureChildNode", __default__));
;// ./src/x_ite/Components/CADGeometry/CADAssembly.js








function CADAssembly (executionContext)
{
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);
   CADGeometry_X3DProductStructureChildNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).CADAssembly);
}

Object .setPrototypeOf (CADAssembly .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype);

Object .defineProperties (CADAssembly,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("CADAssembly", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",           new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const CADAssembly_default_ = CADAssembly;
;

/* harmony default export */ const CADGeometry_CADAssembly = (external_X_ITE_X3D_Namespace_default().add ("CADAssembly", CADAssembly_default_));
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// ./src/x_ite/Components/CADGeometry/CADFace.js










function CADFace (executionContext)
{
   CADGeometry_X3DProductStructureChildNode .call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).CADFace);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).outputOnly, "rebuild", new (external_X_ITE_X3D_Fields_default()).SFTime ());

   this .setBoundedObject (true);
   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);
}

Object .assign (Object .setPrototypeOf (CADFace .prototype, CADGeometry_X3DProductStructureChildNode .prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      CADGeometry_X3DProductStructureChildNode .prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);

      this ._rebuild  .addInterest ("set_children__",       this);
      this ._bboxSize .addInterest ("set_boundedObjects__", this);
      this ._shape    .addInterest ("requestRebuild",       this);

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .boundedObject ?.getBBox (bbox, shadows) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   set_children__ ()
   {
      this .setChild (external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DChildNode, this ._shape));
   },
   setChild (childNode)
   {
      // Remove node.

      if (this .childNode)
      {
         const childNode = this .childNode;

         childNode ._isBoundedObject   .removeInterest ("requestRebuild", this);
         childNode ._isPointingObject  .removeInterest ("requestRebuild", this);
         childNode ._isCameraObject    .removeInterest ("requestRebuild", this);
         childNode ._isPickableObject  .removeInterest ("requestRebuild", this);
         childNode ._isCollisionObject .removeInterest ("requestRebuild", this);
         childNode ._isShadowObject    .removeInterest ("requestRebuild", this);
         childNode ._isVisibleObject   .removeInterest ("requestRebuild", this);

         if (external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DBoundedObject, childNode))
         {
            childNode ._display     .removeInterest ("requestRebuild", this);
            childNode ._bboxDisplay .removeInterest ("requestRebuild", this);
         }
      }

      // Clear node.

      this .childNode       = null;
      this .boundedObject   = null;
      this .pointingObject  = null;
      this .cameraObject    = null;
      this .pickableObject  = null;
      this .collisionObject = null;
      this .shadowObject    = null;
      this .visibleObject   = null;
      this .bboxObject      = null;

      // Add node.

      if (childNode)
      {
         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case (external_X_ITE_X3D_X3DConstants_default()).LOD:
               case (external_X_ITE_X3D_X3DConstants_default()).Transform:
               case (external_X_ITE_X3D_X3DConstants_default()).X3DShapeNode:
               {
                  childNode ._isBoundedObject   .addInterest ("requestRebuild", this);
                  childNode ._isPointingObject  .addInterest ("requestRebuild", this);
                  childNode ._isCameraObject    .addInterest ("requestRebuild", this);
                  childNode ._isPickableObject  .addInterest ("requestRebuild", this);
                  childNode ._isCollisionObject .addInterest ("requestRebuild", this);
                  childNode ._isShadowObject    .addInterest ("requestRebuild", this);
                  childNode ._isVisibleObject   .addInterest ("requestRebuild", this);

                  this .childNode = childNode;

                  if (childNode .isVisible ())
                  {
                     if (childNode .isBoundedObject ())
                        this .boundedObject = childNode;

                     if (childNode .isPointingObject ())
                        this .pointingObject = childNode;

                     if (childNode .isCameraObject ())
                        this .cameraObject = childNode;

                     if (childNode .isPickableObject ())
                        this .pickableObject = childNode;

                     if (childNode .isCollisionObject ())
                        this .collisionObject = childNode;

                     if (childNode .isShadowObject ())
                        this .shadowObject = childNode;

                     if (childNode .isVisibleObject ())
                        this .visibleObject = childNode;
                  }

                  if (external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DBoundedObject, childNode))
                  {
                     childNode ._display     .addInterest ("requestRebuild", this);
                     childNode ._bboxDisplay .addInterest ("requestRebuild", this);

                     if (childNode .isBBoxVisible ())
                        this .bboxObject = childNode;
                  }

                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }

      this .set_pointingObjects__ ();
      this .set_cameraObjects__ ();
      this .set_pickableObjects__ ();
      this .set_collisionObjects__ ();
      this .set_shadowObjects__ ();
      this .set_visibleObjects__ ();
      this .set_boundedObjects__ ();
   },
   set_boundedObjects__ ()
   {
      this .setBoundedObject (this .boundedObject || !this .isDefaultBBoxSize ());
   },
   set_pointingObjects__ ()
   {
      this .setPointingObject (this .pointingObject);
   },
   set_cameraObjects__ ()
   {
      this .setCameraObject (this .cameraObject);
   },
   set_pickableObjects__ ()
   {
      this .setPickableObject (this .getTransformSensors () .size || this .pickableObject);
   },
   set_collisionObjects__ ()
   {
      this .setCollisionObject (this .collisionObject);
   },
   set_shadowObjects__ ()
   {
      this .setShadowObject (this .shadowObject);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObject || this .bboxObject);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case (external_X_ITE_X3D_TraverseType_default()).POINTER:
         {
            this .pointingObject ?.traverse (type, renderObject);
            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).PICKING:
         {
            // CADFace can't be pickTarget of a X3DPickSensorNode or TransformSensor,
            // so we do not need to add this node to the pickingHierarchy.

            if (this .getBrowser () .getPickable () .at (-1))
               this .visibleObject ?.traverse (type, renderObject);
            else
               this .pickableObject ?.traverse (type, renderObject);

            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).COLLISION:
         {
            this .collisionObject ?.traverse (type, renderObject);
            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).SHADOW:
         {
            this .shadowObject ?.traverse (type, renderObject);
            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).DISPLAY:
         {
            this .visibleObject ?.traverse    (type, renderObject);
            this .bboxObject    ?.displayBBox (type, renderObject);
            return;
         }
      }
   },
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      CADGeometry_X3DProductStructureChildNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (CADFace,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("CADFace", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",        new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",     new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay", new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",    new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",  new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shape",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const CADFace_default_ = CADFace;
;

/* harmony default export */ const CADGeometry_CADFace = (external_X_ITE_X3D_Namespace_default().add ("CADFace", CADFace_default_));
;// ./src/x_ite/Components/CADGeometry/CADLayer.js







function CADLayer (executionContext)
{
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).CADLayer);
}

Object .setPrototypeOf (CADLayer .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype);

Object .defineProperties (CADLayer,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("CADLayer", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "name",           new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const CADLayer_default_ = CADLayer;
;

/* harmony default export */ const CADGeometry_CADLayer = (external_X_ITE_X3D_Namespace_default().add ("CADLayer", CADLayer_default_));
;// external "__X_ITE_X3D__ .X3DTransformNode"
const external_X_ITE_X3D_X3DTransformNode_namespaceObject = __X_ITE_X3D__ .X3DTransformNode;
var external_X_ITE_X3D_X3DTransformNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DTransformNode_namespaceObject);
;// ./src/x_ite/Components/CADGeometry/CADPart.js








function CADPart (executionContext)
{
   external_X_ITE_X3D_X3DTransformNode_default().call (this, executionContext);
   CADGeometry_X3DProductStructureChildNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).CADPart);
}

Object .setPrototypeOf (CADPart .prototype, (external_X_ITE_X3D_X3DTransformNode_default()).prototype);

Object .defineProperties (CADPart,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("CADPart", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
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

const CADPart_default_ = CADPart;
;

/* harmony default export */ const CADGeometry_CADPart = (external_X_ITE_X3D_Namespace_default().add ("CADPart", CADPart_default_));
;// external "__X_ITE_X3D__ .X3DComposedGeometryNode"
const external_X_ITE_X3D_X3DComposedGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DComposedGeometryNode;
var external_X_ITE_X3D_X3DComposedGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DComposedGeometryNode_namespaceObject);
;// ./src/x_ite/Components/CADGeometry/IndexedQuadSet.js







function IndexedQuadSet (executionContext)
{
   external_X_ITE_X3D_X3DComposedGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).IndexedQuadSet);
}

Object .assign (Object .setPrototypeOf (IndexedQuadSet .prototype, (external_X_ITE_X3D_X3DComposedGeometryNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DComposedGeometryNode_default().prototype .initialize .call (this);

      this ._set_index .addFieldInterest (this ._index);
   },
   getTriangleIndex: (() =>
   {
      const triangles = [0, 1, 2,   0, 2, 3];

      return function (i)
      {
         const mod = i % 6;

         return (i - mod) / 6 * 4 + triangles [mod];
      };
   })(),
   getPolygonIndex (i)
   {
      return this ._index [i];
   },
   getVerticesPerPolygon ()
   {
      return 4;
   },
   getNumVertices ()
   {
      return this .checkVertexCount (this ._index .length, 4);
   },
   build ()
   {
      const length = this .getNumVertices ();

      external_X_ITE_X3D_X3DComposedGeometryNode_default().prototype .build .call (this, 4, length, 6, length / 4 * 6);
   },
});

Object .defineProperties (IndexedQuadSet,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("IndexedQuadSet", "CADGeometry", 1, "geometry", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_index",       new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "colorPerVertex",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "normalPerVertex", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "index",           new (external_X_ITE_X3D_Fields_default()).MFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "attrib",          new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fogCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tangent",         new (external_X_ITE_X3D_Fields_default()).SFNode ()), // experimental
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "normal",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "coord",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const IndexedQuadSet_default_ = IndexedQuadSet;
;

/* harmony default export */ const CADGeometry_IndexedQuadSet = (external_X_ITE_X3D_Namespace_default().add ("IndexedQuadSet", IndexedQuadSet_default_));
;// ./src/x_ite/Components/CADGeometry/QuadSet.js







function QuadSet (executionContext)
{
   external_X_ITE_X3D_X3DComposedGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).QuadSet);
}

Object .assign (Object .setPrototypeOf (QuadSet .prototype, (external_X_ITE_X3D_X3DComposedGeometryNode_default()).prototype),
{
   getTriangleIndex: (() =>
   {
      const triangles = [0, 1, 2,   0, 2, 3];

      return function (i)
      {
         const mod = i % 6;

         return (i - mod) / 6 * 4 + triangles [mod];
      };
   })(),
   getVerticesPerPolygon ()
   {
      return 4;
   },
   getNumVertices ()
   {
      return this .checkVertexCount (this .getCoord () ?.getSize () ?? 0, 4);
   },
   build ()
   {
      const length = this .getNumVertices ();

      external_X_ITE_X3D_X3DComposedGeometryNode_default().prototype .build .call (this, 4, length, 6, length / 4 * 6);
   },
   createNormals (verticesPerPolygon, polygonsSize, polygons)
   {
      return this .createFaceNormals (verticesPerPolygon, polygonsSize, polygons);
   },
});

Object .defineProperties (QuadSet,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("QuadSet", "CADGeometry", 1, "geometry", "3.1"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "colorPerVertex",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "normalPerVertex", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "attrib",          new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fogCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tangent",         new (external_X_ITE_X3D_Fields_default()).SFNode ()), // experimental
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "normal",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "coord",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const QuadSet_default_ = QuadSet;
;

/* harmony default export */ const CADGeometry_QuadSet = (external_X_ITE_X3D_Namespace_default().add ("QuadSet", QuadSet_default_));
;// ./src/assets/components/CADGeometryComponent.js









external_X_ITE_X3D_Components_default().add ({
   name: "CADGeometry",
   concreteNodes:
   [
      CADGeometry_CADAssembly,
      CADGeometry_CADFace,
      CADGeometry_CADLayer,
      CADGeometry_CADPart,
      CADGeometry_IndexedQuadSet,
      CADGeometry_QuadSet,
   ],
   abstractNodes:
   [
      CADGeometry_X3DProductStructureChildNode,
   ],
});

const CADGeometryComponent_default_ = undefined;
;

/* harmony default export */ const CADGeometryComponent = (external_X_ITE_X3D_Namespace_default().add ("CADGeometryComponent", CADGeometryComponent_default_));
/******/ })()
;